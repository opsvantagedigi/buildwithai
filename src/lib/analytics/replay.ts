// src/lib/analytics/replay.ts

import type { AnalyticsEvent, SessionReplayMetadata } from "./schema";

/**
 * Group events by session and sort them into a timeline.
 */
export function reconstructReplay(
  sessionId: string,
  events: AnalyticsEvent[]
): AnalyticsEvent[] {
  const sessionEvents = events.filter(
    (e) => typeof (e as any).sessionId === "string" && (e as any).sessionId === sessionId
  );

  return sessionEvents.sort((a, b) => a.timestamp - b.timestamp);
}

/**
 * Build replay metadata from events.
 */
export function buildReplayMetadata(
  sessionId: string,
  siteId: string,
  events: AnalyticsEvent[]
): SessionReplayMetadata {
  const sessionEvents = events.filter(
    (e) => typeof (e as any).sessionId === "string" && (e as any).sessionId === sessionId
  );

  const startedAt =
    sessionEvents.find((e) => e.type === "session_start")?.timestamp ||
    sessionEvents[0]?.timestamp ||
    Date.now();

  const endedAt =
    sessionEvents.find((e) => e.type === "session_end")?.timestamp ||
    sessionEvents[sessionEvents.length - 1]?.timestamp ||
    startedAt;

  const pageviewCount = sessionEvents.filter((e) => e.type === "pageview").length;

  return {
    sessionId,
    siteId,
    startedAt,
    endedAt,
    pageviewCount,
  };
}
