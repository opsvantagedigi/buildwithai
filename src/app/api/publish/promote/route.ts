import { NextResponse } from "next/server";
import { kv } from "@/lib/kv";
import { exportSiteToStatic } from "@/lib/builder/export";
import { generateChangelogWithOllama } from "@/lib/ai/changelog";
import { generateReleaseNotesWithOllama } from "@/lib/ai/releaseNotes";
import { updateSiteTimestamp } from "@/lib/sites/registry";
import type { VersionSnapshot } from "@/types/publish";

const VERSION_HISTORY_PREFIX = "buildwithai:site:history:";
const VERSION_SNAPSHOT_PREFIX = "buildwithai:site:versions:";
const STAGING_PREFIX = "buildwithai:site:staging:";
const PRODUCTION_PREFIX = "buildwithai:site:production:";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const siteId = searchParams.get("siteId");

  if (!siteId) {
    return NextResponse.json(
      { error: "Missing siteId" },
      { status: 400 }
    );
  }

  // Load latest staging metadata
  const stagingKey = `${STAGING_PREFIX}${siteId}`;
  const staging = await kv.get(stagingKey);

  if (!staging) {
    return NextResponse.json(
      { error: "No staging deployment found" },
      { status: 400 }
    );
  }

  // Load version history
  const historyKey = `${VERSION_HISTORY_PREFIX}${siteId}`;
  const history = ((await kv.get(historyKey)) as number[]) ?? [];
  const nextVersion = (history[history.length - 1] ?? 0) + 1;

  // Export static site
  const exported = await exportSiteToStatic(siteId);
  if (!exported) {
    return NextResponse.json(
      { error: "Static export failed" },
      { status: 500 }
    );
  }


  // Generate changelog (use previous snapshot + current snapshot)
  let previousSnapshot: VersionSnapshot | null = null;
  if (history.length > 0) {
    const prevVersion = history[history.length - 1];
    const prevKey = `${VERSION_SNAPSHOT_PREFIX}${siteId}:${prevVersion}`;
    const prev = (await kv.get(prevKey)) as VersionSnapshot | null;
    if (prev && typeof prev === "object") previousSnapshot = prev;
  }

  // Build snapshot (current)
  const snapshot: VersionSnapshot = {
    version: nextVersion,
    timestamp: Date.now(),
    state: exported,
    changelog: null,
    releaseNotes: null,
  };

  const changelog = await generateChangelogWithOllama({
    previous: previousSnapshot,
    current: snapshot,
  });

  snapshot.changelog = changelog ?? null;

  // Save snapshot
  const snapshotKey = `${VERSION_SNAPSHOT_PREFIX}${siteId}:${nextVersion}`;
  await kv.set(snapshotKey, snapshot);

  // Generate release notes
  const releaseNotes = await generateReleaseNotesWithOllama({
    snapshot,
    changelog: snapshot.changelog ?? null,
    productionUrl: staging.url ?? null,
  });

  if (releaseNotes) {
    snapshot.releaseNotes = releaseNotes;
    await kv.set(snapshotKey, snapshot);
  }

  // Update production metadata
  const productionKey = `${PRODUCTION_PREFIX}${siteId}`;
  await kv.set(productionKey, {
    version: nextVersion,
    url: staging.url,
    timestamp: snapshot.timestamp,
  });

  // Update history
  const nextHistory = [...history, nextVersion];
  await kv.set(historyKey, nextHistory);

  // Update dashboard timestamp
  await updateSiteTimestamp(siteId);

  return NextResponse.json({
    ok: true,
    version: nextVersion,
    url: staging.url,
    changelog: snapshot.changelog ?? null,
    releaseNotes: snapshot.releaseNotes ?? null,
  });
}
