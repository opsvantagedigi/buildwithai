import { NextResponse } from "next/server";
import { getTemplate } from "@/lib/templates/registry";
import landing from "@/lib/templates/blueprints/landing.json";
import portfolio from "@/lib/templates/blueprints/portfolio.json";
import { saveSite } from "../../../../lib/builder/save";
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

  await saveSite(siteId, blueprint);
  await registerSite(siteId, `New ${templateId} site`);

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  return NextResponse.redirect(`${baseUrl}/builder/site/${siteId}`);
}
