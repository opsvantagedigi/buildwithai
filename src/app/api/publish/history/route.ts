import { NextResponse } from "next/server";
import { kv } from "@/lib/kv";
import type { PublishHistory } from "@/types/publish";

const PUBLISH_HISTORY_PREFIX = "buildwithai:site:publish:history:";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const siteId = searchParams.get("siteId");

  if (!siteId) {
    return NextResponse.json(
      { error: "Missing siteId" },
      { status: 400 }
    );
  }

  const key = `${PUBLISH_HISTORY_PREFIX}${siteId}`;
  const history = (await kv.get(key)) as PublishHistory | null;

  return NextResponse.json({
    ok: true,
    history: Array.isArray(history) ? history : [],
  });
}
