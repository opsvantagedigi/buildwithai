// src/lib/analytics/rollup.ts

import type { AnalyticsEvent, DailyRollup } from "./schema";
import { formatDateUTC } from "./keys";

export function createEmptyRollup(siteId: string, date: string): DailyRollup {
  return {
    siteId,
    date,
    pageviews: 0,
    uniques: 0,
    paths: {},
    referrers: {},
    devices: {
      desktop: 0,
      mobile: 0,
      tablet: 0,
      other: 0,
    },
  };
}

export function detectDevice(userAgent?: string): keyof DailyRollup["devices"] {
  if (!userAgent) return "other";
  const ua = userAgent.toLowerCase();

  if (ua.includes("mobile") && !ua.includes("ipad")) {
    return "mobile";
  }
  if (ua.includes("tablet") || ua.includes("ipad")) {
    return "tablet";
  }
  if (ua.includes("windows") || ua.includes("macintosh") || ua.includes("linux")) {
    return "desktop";
  }

  return "other";
}

/**
 * Update a daily rollup with a single event.
 * This function is pure and can be safely used in batch jobs or on-the-fly.
 */
export function applyEventToRollup(
  rollup: DailyRollup,
  event: AnalyticsEvent
): DailyRollup {
  const date = formatDateUTC(event.timestamp);
  if (date !== rollup.date || event.siteId !== rollup.siteId) {
    // If mismatched, just return the rollup unchanged
    return rollup;
  }

  // Only count pageviews + conversions for now in aggregates
  if (event.type === "pageview" || event.type === "conversion") {
    rollup.pageviews += 1;

    const path = event.path || "/";
    if (!rollup.paths[path]) {
      rollup.paths[path] = { pageviews: 0 };
    }
    rollup.paths[path].pageviews += 1;

    const ref = event.referrer || "direct";
    if (!rollup.referrers[ref]) {
      rollup.referrers[ref] = { pageviews: 0 };
    }
    rollup.referrers[ref].pageviews += 1;

    const device = detectDevice(event.userAgent);
    rollup.devices[device] += 1;
  }

  // Uniques will be handled in a later refinement (e.g. via ipHash bucketing).
  return rollup;
}
