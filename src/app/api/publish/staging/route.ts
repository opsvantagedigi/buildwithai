import { NextResponse } from "next/server";
import { exportSiteToStatic } from "@/lib/export/site";
import { triggerVercelStagingDeploy } from "@/lib/publish/staging";
import { kv } from "@/lib/kv";

const STAGING_METADATA_PREFIX = "buildwithai:site:staging:";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const siteId = body.siteId;

    if (!siteId) {
      return NextResponse.json(
        { error: "Missing siteId" },
        { status: 400 }
      );
    }

    // Export static site (same as publish, but non-destructive)
    await exportSiteToStatic(siteId);

    // Trigger Vercel staging deploy
    const staging = await triggerVercelStagingDeploy();

    // Save staging metadata (does NOT increment version)
    const metadataKey = `${STAGING_METADATA_PREFIX}${siteId}`;
    const metadata = {
      lastStagedAt: Date.now(),
      lastStagedUrl: staging.url ?? null,
    };

    await kv.set(metadataKey, metadata);

    return NextResponse.json({
      ok: staging.ok,
      stagingUrl: staging.url,
      metadata,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "Unexpected staging error" },
      { status: 500 }
    );
  }
}
