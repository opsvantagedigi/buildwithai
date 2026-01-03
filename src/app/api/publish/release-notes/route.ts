import { NextResponse } from "next/server";
import { kv } from "@/lib/kv";
import type { VersionSnapshot } from "@/types/publish";

const VERSION_SNAPSHOT_PREFIX = "buildwithai:site:versions:";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const siteId = searchParams.get("siteId");
  const versionParam = searchParams.get("version");

  if (!siteId || !versionParam) {
    return NextResponse.json(
      { error: "Missing siteId or version" },
      { status: 400 }
    );
  }

  const version = Number(versionParam);
  if (!Number.isFinite(version)) {
    return NextResponse.json(
      { error: "Invalid version" },
      { status: 400 }
    );
  }

  const snapshotKey = `${VERSION_SNAPSHOT_PREFIX}${siteId}:${version}`;
  const snapshot = (await kv.get(snapshotKey)) as VersionSnapshot | null;

  if (!snapshot) {
    return NextResponse.json(
      { error: "Snapshot not found" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    ok: true,
    version: snapshot.version,
    timestamp: snapshot.timestamp,
    releaseNotes: snapshot.releaseNotes ?? null,
  });
}
