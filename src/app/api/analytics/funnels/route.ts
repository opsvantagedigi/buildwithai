// src/app/api/analytics/funnels/route.ts

import { NextResponse } from "next/server";
import {
  saveFunnelDefinition,
  getFunnelDefinition,
  listFunnelDefinitions,
} from "@/lib/analytics/store";
import type { FunnelDefinition } from "@/lib/analytics/schema";
import { randomUUID } from "crypto";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get("siteId");

    if (!siteId) {
      return NextResponse.json({ error: "Missing siteId" }, { status: 400 });
    }

    const funnels = await listFunnelDefinitions(siteId);

    return NextResponse.json({ funnels }, { status: 200 });
  } catch (err) {
    console.error("Funnel GET error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { siteId, name, steps } = body as { siteId?: string; name?: string; steps?: any };

    if (!siteId || !name || !Array.isArray(steps)) {
      return NextResponse.json(
        { error: "Missing siteId, name, or steps" },
        { status: 400 }
      );
    }

    const funnel: FunnelDefinition = {
      id: randomUUID(),
      siteId,
      name,
      steps: steps.map((s: any) => ({ id: randomUUID(), name: s.name, path: s.path })),
      createdAt: Date.now(),
    };

    await saveFunnelDefinition(funnel);

    return NextResponse.json({ funnel }, { status: 200 });
  } catch (err) {
    console.error("Funnel POST error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
