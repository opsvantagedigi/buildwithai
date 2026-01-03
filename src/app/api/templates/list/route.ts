import { NextResponse } from "next/server";
import { listTemplates } from "@/lib/templates/registry";

export async function GET() {
  const templates = await listTemplates();
  return NextResponse.json({ ok: true, templates });
}
