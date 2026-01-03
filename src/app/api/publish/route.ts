import { NextRequest, NextResponse } from "next/server";
import { loadSiteState } from "@/lib/builder/load";
import { exportSiteToStatic } from "@/lib/export/site";
import { triggerVercelDeploy } from "@/lib/publish/vercel";
import { kv } from "@/lib/kv";
import type { PublishMetadata } from "@/types/publish";
import type { PublishHistory, PublishHistoryEntry } from "@/types/publish";
import type { VersionSnapshot } from "@/types/publish";
import { generateChangelogWithOllama } from "@/lib/ai/changelog";

const PUBLISH_KEY_PREFIX = "buildwithai:site:publish:";
const PUBLISH_HISTORY_PREFIX = "buildwithai:site:publish:history:";
const VERSION_SNAPSHOT_PREFIX = "buildwithai:site:versions:";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const siteId =
      body.siteId ||
      req.nextUrl.searchParams.get("siteId") ||
      undefined;

    if (!siteId) {
      return NextResponse.json(
        { error: "Missing siteId" },
        { status: 400 }
      );
    }

    const state = await loadSiteState(siteId);
    if (!state) {
      return NextResponse.json(
        { error: "No site state found for this siteId" },
        { status: 404 }
      );
    }

    // Export site (currently not uploaded; used for future enhancements)
    const exported = exportSiteToStatic(state);

    // Trigger Vercel Deploy Hook
    const result = await triggerVercelDeploy(siteId, exported);
    if (!result.ok) {
      return NextResponse.json(
        { error: result.error ?? "Failed to trigger deploy" },
        { status: 500 }
      );
    }

    // Save publish metadata
    const key = `${PUBLISH_KEY_PREFIX}${siteId}`;
    const existing = await kv.get(key);

    const metadata: PublishMetadata = {
      siteId,
      lastPublishedAt: Date.now(),
      lastPublishedVersion: state.metadata?.version ?? null,
      lastPublishedUrl: existing?.lastPublishedUrl ?? null,
    };

    await kv.set(key, metadata);

    // Append to publish history
    const historyKey = `${PUBLISH_HISTORY_PREFIX}${siteId}`;
    const existingHistory = (await kv.get(historyKey)) as PublishHistory | null;

    const entry: PublishHistoryEntry = {
      version: state.metadata?.version ?? 1,
      timestamp: Date.now(),
      url: metadata.lastPublishedUrl,
    };

    const nextHistory: PublishHistory = Array.isArray(existingHistory)
      ? [...existingHistory, entry]
      : [entry];

    await kv.set(historyKey, nextHistory);

    // Store version snapshot
    const snapshotKey = `${VERSION_SNAPSHOT_PREFIX}${siteId}:${metadata.lastPublishedVersion}`;
    const baseSnapshot: VersionSnapshot = {
      version: metadata.lastPublishedVersion ?? 1,
      timestamp: metadata.lastPublishedAt ?? Date.now(),
      state,
      changelog: null,
    };

    // Load previous snapshot (for changelog diff)
    let previousSnapshot: VersionSnapshot | null = null;
    if (metadata.lastPublishedVersion && metadata.lastPublishedVersion > 1) {
      const prevKey = `${VERSION_SNAPSHOT_PREFIX}${siteId}:${
        (metadata.lastPublishedVersion as number) - 1
      }`;
      const prev = (await kv.get(prevKey)) as VersionSnapshot | null;
      if (prev && typeof prev === "object") {
        previousSnapshot = prev;
      }
    }

    // Generate changelog with Ollama (best-effort; failures are non-fatal)
    const changelog = await generateChangelogWithOllama({
      previous: previousSnapshot,
      current: baseSnapshot,
    });

    const snapshot: VersionSnapshot = {
      ...baseSnapshot,
      changelog: changelog ?? null,
    };

    await kv.set(snapshotKey, snapshot);

    return NextResponse.json({
      ok: true,
      publish: metadata,
      history: nextHistory,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "Unexpected error in publish API" },
      { status: 500 }
    );
  }
}
