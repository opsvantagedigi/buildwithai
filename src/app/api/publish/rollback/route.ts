import { NextResponse } from "next/server";
import { kv } from "@/lib/kv";
import { saveSiteState } from "@/lib/builder/save";
import type { VersionSnapshot } from "@/types/publish";

const VERSION_SNAPSHOT_PREFIX = "buildwithai:site:versions:";
const PUBLISH_HISTORY_PREFIX = "buildwithai:site:publish:history:";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const siteId = body.siteId;
    const version = body.version;

    if (!siteId || !version) {
      return NextResponse.json(
        { error: "Missing siteId or version" },
        { status: 400 }
      );
    }

    const snapshotKey = `${VERSION_SNAPSHOT_PREFIX}${siteId}:${version}`;
    const snapshot = (await kv.get(snapshotKey)) as VersionSnapshot | null;

    if (!snapshot) {
      return NextResponse.json(
        { error: "Snapshot not found for this version" },
        { status: 404 }
      );
    }

    // Restore builder state
    await saveSiteState(siteId, snapshot.state);

    // Append rollback entry to history
    const historyKey = `${PUBLISH_HISTORY_PREFIX}${siteId}`;
    const existingHistory = (await kv.get(historyKey)) as any[] | null;

    const rollbackEntry = {
      version: snapshot.version,
      timestamp: Date.now(),
      url: null,
      rollback: true,
    };

    const nextHistory = Array.isArray(existingHistory)
      ? [...existingHistory, rollbackEntry]
      : [rollbackEntry];

    await kv.set(historyKey, nextHistory);

    return NextResponse.json({
      ok: true,
      restoredVersion: snapshot.version,
      history: nextHistory,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "Unexpected rollback error" },
      { status: 500 }
    );
  }
}
