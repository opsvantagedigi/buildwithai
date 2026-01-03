// src/app/api/analytics/replay/route.ts

import { NextResponse } from "next/server";
import { getAnalyticsEventsForDate } from "@/lib/analytics/store";
import { reconstructReplay, buildReplayMetadata } from "@/lib/analytics/replay";
import { aggregateHeatmap } from "@/lib/analytics/heatmap";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const siteId = searchParams.get("siteId");
    const sessionId = searchParams.get("sessionId");
    const date = searchParams.get("date");

    if (!siteId || !sessionId || !date) {
      return NextResponse.json(
        { error: "Missing siteId, sessionId, or date" },
        { status: 400 }
      );
    }

    const events = await getAnalyticsEventsForDate(siteId, date);

    const timeline = reconstructReplay(sessionId, events);
    const metadata = buildReplayMetadata(sessionId, siteId, events);
    const heatmap = aggregateHeatmap(events);

    return NextResponse.json(
      {
        metadata,
        timeline,
        heatmap,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Replay API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
