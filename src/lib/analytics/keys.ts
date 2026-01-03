// src/lib/analytics/keys.ts

/**
 * All analytics keys are namespaced under "analytics"
 *
 * We use a consistent pattern to make querying and debugging easier.
 *
 * Raw events:
 *   analytics:events:{siteId}:{date}:{eventId}
 *
 * Daily rollups:
 *   analytics:rollup:{siteId}:{date}
 *
 * Funnel definitions:
 *   analytics:funnel:def:{siteId}:{funnelId}
 *
 * Conversion definitions:
 *   analytics:conversion:def:{siteId}:{conversionId}
 *
 * Session replay metadata:
 *   analytics:session:meta:{siteId}:{sessionId}
 */

export const ANALYTICS_NAMESPACE = "analytics";

export function eventKey(siteId: string, date: string, eventId: string) {
  return `${ANALYTICS_NAMESPACE}:events:${siteId}:${date}:${eventId}`;
}

export function rollupKey(siteId: string, date: string) {
  return `${ANALYTICS_NAMESPACE}:rollup:${siteId}:${date}`;
}

export function funnelDefinitionKey(siteId: string, funnelId: string) {
  return `${ANALYTICS_NAMESPACE}:funnel:def:${siteId}:${funnelId}`;
}

export function conversionDefinitionKey(siteId: string, conversionId: string) {
  return `${ANALYTICS_NAMESPACE}:conversion:def:${siteId}:${conversionId}`;
}

export function sessionReplayMetadataKey(siteId: string, sessionId: string) {
  return `${ANALYTICS_NAMESPACE}:session:meta:${siteId}:${sessionId}`;
}

/**
 * Utility: format a timestamp into YYYY-MM-DD (UTC)
 */
export function formatDateUTC(timestamp: number): string {
  const d = new Date(timestamp);
  const year = d.getUTCFullYear();
  const month = String(d.getUTCMonth() + 1).padStart(2, "0");
  const day = String(d.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}
