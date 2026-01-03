// src/app/api/analytics/rollup/route.ts

import { NextResponse } from "next/server";
import { getAnalyticsEventsForDate, saveDailyRollup } from "@/lib/analytics/store";
import { processDailyRollup } from "@/lib/analytics/process-rollup";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const { siteId, date } = body as { siteId?: string; date?: string };

    if (!siteId || !date) {
      return NextResponse.json(
        { error: "Missing siteId or date" },
        { status: 400 }
      );
    }

    const events = await getAnalyticsEventsForDate(siteId, date);
    const rollup = processDailyRollup(siteId, date, events);

    await saveDailyRollup(rollup);

    return NextResponse.json({ rollup }, { status: 200 });
  } catch (err) {
    console.error("Rollup API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
