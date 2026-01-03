import { NextResponse } from "next/server";
import { getTemplate } from "@/lib/templates/registry";
import landing from "@/lib/templates/blueprints/landing.json";
import portfolio from "@/lib/templates/blueprints/portfolio.json";
import { saveSiteState } from "../../../../lib/builder/save";
import { registerSite } from "@/lib/sites/registry";

const BLUEPRINTS: Record<string, any> = {
  landing,
  portfolio,
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const templateId = searchParams.get("templateId");

  if (!templateId || !BLUEPRINTS[templateId]) {
    return NextResponse.json(
      { error: "Invalid templateId" },
      { status: 400 }
    );
  }

  const blueprint = BLUEPRINTS[templateId];

  const siteId = crypto.randomUUID();

  // Create site metadata first, then persist the initial builder state.
  await registerSite(siteId, `New ${templateId} site`);

  // Build a minimal BuilderState from the blueprint so it matches
  // the shape expected by `loadSiteState()` (metadata + pages).
  const pageId = crypto.randomUUID();
  const sections = blueprint?.root?.props?.sections ?? [];
  const blocks = Array.isArray(sections)
    ? sections.map((s: any) => ({ id: crypto.randomUUID(), type: s.type ?? "section", data: s.props ?? {} }))
    : [];

  const pages = [
    {
      id: pageId,
      title: blueprint?.root?.props?.title ?? `Page 1`,
      slug: "home",
      blocks,
    },
  ];

  const initialState = {
    metadata: {
      id: siteId,
      name: `New ${templateId} site`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      version: 1,
    },
    pages,
    activePageId: pageId,
  };

  await saveSiteState(siteId, initialState);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  return NextResponse.redirect(`${baseUrl}/builder/site/${siteId}`);
}
