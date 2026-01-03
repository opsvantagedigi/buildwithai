import { NextResponse } from "next/server";
import { exportSiteToStatic } from "@/lib/export/site";
import { triggerVercelPreviewDeploy } from "@/lib/publish/preview";
import { updateSiteTimestamp } from "@/lib/sites/registry";

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

    // Trigger Vercel preview deploy
    const preview = await triggerVercelPreviewDeploy();

    await updateSiteTimestamp(siteId);

    return NextResponse.json({
      ok: preview.ok,
      previewUrl: preview.url,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error?.message ?? "Unexpected preview error" },
      { status: 500 }
    );
  }
}
