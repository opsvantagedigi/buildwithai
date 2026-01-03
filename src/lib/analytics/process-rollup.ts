// src/lib/analytics/process-rollup.ts

import type { AnalyticsEvent, DailyRollup } from "./schema";
import { createEmptyRollup, applyEventToRollup } from "./rollup";

/**
 * Process all raw events for a given site + date
 * and return a fully aggregated DailyRollup.
 */
export function processDailyRollup(
  siteId: string,
  date: string,
  events: AnalyticsEvent[]
): DailyRollup {
  let rollup = createEmptyRollup(siteId, date);

  const uniqueVisitors = new Set<string>();

  for (const event of events) {
    // Count uniques
    if (event.ipHash) {
      uniqueVisitors.add(event.ipHash);
    }

    // Apply event to rollup aggregates
    rollup = applyEventToRollup(rollup, event);
  }

  rollup.uniques = uniqueVisitors.size;

  return rollup;
}
