// src/app/api/track/route.ts

import { NextResponse, NextRequest } from "next/server";
import { randomUUID } from "crypto";
import { saveAnalyticsEvent } from "@/lib/analytics/store";
import type { AnalyticsEvent } from "@/lib/analytics/schema";

// Simple privacy-preserving hash (not cryptographically strong, but enough for uniqueness)
function hashIp(ip: string | null): string | undefined {
  if (!ip) return undefined;
  // Basic hash: not reversible, low collision risk for analytics
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    hash = (hash << 5) - hash + ip.charCodeAt(i);
    hash |= 0;
  }
  return `h${Math.abs(hash)}`;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }

    const {
      siteId,
      type,
      path,
      referrer,
      goal,
      funnelId,
      stepId,
      x,
      y,
      sessionId,
    } = body as Record<string, any>;

    if (!siteId || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const timestamp = Date.now();
    const ip = req.headers.get("x-forwarded-for") || null;
    const ipHash = hashIp(ip);

    const userAgent = req.headers.get("user-agent") || undefined;

    const event: AnalyticsEvent = {
      id: randomUUID(),
      siteId,
      type,
      timestamp,
      ipHash,
      userAgent,
      referrer: referrer || undefined,
      path: path || undefined,
      // Optional fields depending on event type
      goal,
      funnelId,
      stepId,
      x,
      y,
      sessionId,
    } as AnalyticsEvent;

    await saveAnalyticsEvent(event);

    // Return empty 204 for speed
    return new NextResponse(null, { status: 204 });
  } catch (err) {
    console.error("Track API error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
