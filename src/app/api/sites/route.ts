import { NextResponse } from "next/server";
import { listSites } from "@/lib/sites/registry";

export async function GET() {
  const sites = await listSites();

  return NextResponse.json({
    ok: true,
    sites,
  });
}
