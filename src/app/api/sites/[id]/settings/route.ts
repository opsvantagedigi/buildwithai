import { NextRequest, NextResponse } from "next/server";
import { getSiteSettings, saveSiteSettings } from "@/lib/sites/settings";

export async function GET(req: NextRequest, context: any) {
  const siteId = context?.params?.id;
  const settings = await getSiteSettings(siteId);
  return NextResponse.json({ ok: true, settings });
}

export async function POST(req: NextRequest, context: any) {
  const siteId = context?.params?.id;
  const body = await req.json();

  await saveSiteSettings(siteId, body);

  return NextResponse.json({ ok: true });
}
