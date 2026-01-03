import { NextResponse } from "next/server";
import { kv } from "@/lib/kv";

const VERSION_HISTORY_PREFIX = "buildwithai:site:history:";
const VERSION_SNAPSHOT_PREFIX = "buildwithai:site:versions:";

export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  const params = await context.params;
  const siteId = params.id;

  const historyKey = `${VERSION_HISTORY_PREFIX}${siteId}`;
  const history = ((await kv.get(historyKey)) as number[]) ?? [];

  const snapshots = [];

  for (const version of history) {
    const snapshotKey = `${VERSION_SNAPSHOT_PREFIX}${siteId}:${version}`;
    const snapshot = await kv.get(snapshotKey);
    if (snapshot) snapshots.push(snapshot);
  }

  return NextResponse.json({
    ok: true,
    siteId,
    versions: snapshots,
  });
}
