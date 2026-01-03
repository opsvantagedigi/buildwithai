// src/app/api/analytics/conversions/route.ts

import { NextResponse } from "next/server";
import {
  saveConversionDefinition,
  getConversionDefinition,
  listConversionDefinitions,
} from "@/lib/analytics/store";
import type { ConversionDefinition } from "@/lib/analytics/schema";
import { randomUUID } from "crypto";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get("siteId");

    if (!siteId) {
      return NextResponse.json({ error: "Missing siteId" }, { status: 400 });
    }

    const conversions = await listConversionDefinitions(siteId);

    return NextResponse.json({ conversions }, { status: 200 });
  } catch (err) {
    console.error("Conversion GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { siteId, name } = body as { siteId?: string; name?: string };

    if (!siteId || !name) {
      return NextResponse.json(
        { error: "Missing siteId or name" },
        { status: 400 }
      );
    }

    const conversion: ConversionDefinition = {
      id: randomUUID(),
      siteId,
      name,
      createdAt: Date.now(),
    };

    await saveConversionDefinition(conversion);

    return NextResponse.json({ conversion }, { status: 200 });
  } catch (err) {
    console.error("Conversion POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
