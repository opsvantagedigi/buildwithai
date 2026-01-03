import { NextResponse } from "next/server";
import { loadSiteState } from "@/lib/builder/load";
import { exportSiteToStatic } from "@/lib/export/site";
import { triggerVercelPreviewDeploy } from "@/lib/publish/preview";
import { updateSiteTimestamp } from "@/lib/sites/registry";
import { injectTracking } from "@/lib/publisher/inject-tracking";
import { validateTracking } from "@/lib/publisher/validate-tracking";

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

    // Load state and export static site (non-destructive)
    const state = await loadSiteState(siteId);
    if (!state) {
      return NextResponse.json({ error: "No site state found for this siteId" }, { status: 404 });
    }

    const exported = exportSiteToStatic(state);

    // Inject & validate tracking in preview HTML
    const finalHtml = injectTracking(exported.html, siteId);
    if (!validateTracking(finalHtml)) {
      return NextResponse.json({ error: "tracking_validation_failed" }, { status: 422 });
    }

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
