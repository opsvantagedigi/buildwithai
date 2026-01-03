// src/lib/analytics/store.ts

import type {
  AnalyticsEvent,
  DailyRollup,
  FunnelDefinition,
  ConversionDefinition,
  SessionReplayMetadata,
} from "./schema";
import {
  eventKey,
  rollupKey,
  funnelDefinitionKey,
  conversionDefinitionKey,
  sessionReplayMetadataKey,
  formatDateUTC,
} from "./keys";

// TODO: Replace this import with your actual KV client helper
// e.g. import { kv } from "@vercel/kv";
// or import { getKv } from "../kv";
import { kv } from "@/lib/kv";

export async function saveAnalyticsEvent(event: AnalyticsEvent): Promise<void> {
  const date = formatDateUTC(event.timestamp);
  const key = eventKey(event.siteId, date, event.id);
  await kv.set(key, event);
}

export async function getAnalyticsEventsForDate(
  siteId: string,
  date: string
): Promise<AnalyticsEvent[]> {
  // Listing keys by prefix isn't supported by every KV backend.
  // We'll return an empty array here as a safe fallback and implement
  // a listing strategy (e.g. keeping an index) when wiring the real KV.
  // TODO: implement prefix listing or maintain a per-date index key.
  return [];
}

export async function saveDailyRollup(rollup: DailyRollup): Promise<void> {
  const key = rollupKey(rollup.siteId, rollup.date);
  await kv.set(key, rollup);
}

export async function getDailyRollup(
  siteId: string,
  date: string
): Promise<DailyRollup | null> {
  const key = rollupKey(siteId, date);
  const data = (await kv.get(key)) as DailyRollup | null;
  return data ?? null;
}

export async function saveFunnelDefinition(
  funnel: FunnelDefinition
): Promise<void> {
  const key = funnelDefinitionKey(funnel.siteId, funnel.id);
  await kv.set(key, funnel);
  // maintain per-site index of funnel ids
  try {
    const indexKey = `analytics:funnel:index:${funnel.siteId}`;
    const existing = (await kv.get(indexKey)) as string[] | null;
    const ids = Array.isArray(existing) ? existing : [];
    if (!ids.includes(funnel.id)) {
      ids.push(funnel.id);
      await kv.set(indexKey, ids);
    }
  } catch (_) {
    // best-effort; ignore if backend doesn't support it
  }
}

export async function getFunnelDefinition(
  siteId: string,
  funnelId: string
): Promise<FunnelDefinition | null> {
  const key = funnelDefinitionKey(siteId, funnelId);
  const data = (await kv.get(key)) as FunnelDefinition | null;
  return data ?? null;
}

export async function listFunnelDefinitions(siteId: string): Promise<FunnelDefinition[]> {
  try {
    const indexKey = `analytics:funnel:index:${siteId}`;
    const ids = (await kv.get(indexKey)) as string[] | null;
    if (!ids || ids.length === 0) return [];
    const results = await Promise.all(ids.map(id => kv.get(funnelDefinitionKey(siteId, id))));
    return (results || []).filter(Boolean) as FunnelDefinition[];
  } catch (_) {
    return [];
  }
}

export async function saveConversionDefinition(
  conversion: ConversionDefinition
): Promise<void> {
  const key = conversionDefinitionKey(conversion.siteId, conversion.id);
  await kv.set(key, conversion);
  // maintain per-site index of conversion ids
  try {
    const indexKey = `analytics:conversion:index:${conversion.siteId}`;
    const existing = (await kv.get(indexKey)) as string[] | null;
    const ids = Array.isArray(existing) ? existing : [];
    if (!ids.includes(conversion.id)) {
      ids.push(conversion.id);
      await kv.set(indexKey, ids);
    }
  } catch (_) {
    // best-effort
  }
}

export async function getConversionDefinition(
  siteId: string,
  conversionId: string
): Promise<ConversionDefinition | null> {
  const key = conversionDefinitionKey(siteId, conversionId);
  const data = (await kv.get(key)) as ConversionDefinition | null;
  return data ?? null;
}

export async function listConversionDefinitions(siteId: string): Promise<ConversionDefinition[]> {
  try {
    const indexKey = `analytics:conversion:index:${siteId}`;
    const ids = (await kv.get(indexKey)) as string[] | null;
    if (!ids || ids.length === 0) return [];
    const results = await Promise.all(ids.map(id => kv.get(conversionDefinitionKey(siteId, id))));
    return (results || []).filter(Boolean) as ConversionDefinition[];
  } catch (_) {
    return [];
  }
}

export async function saveSessionReplayMetadata(
  meta: SessionReplayMetadata
): Promise<void> {
  const key = sessionReplayMetadataKey(meta.siteId, meta.sessionId);
  await kv.set(key, meta);
}

export async function getSessionReplayMetadata(
  siteId: string,
  sessionId: string
): Promise<SessionReplayMetadata | null> {
  const key = sessionReplayMetadataKey(siteId, sessionId);
  const data = (await kv.get(key)) as SessionReplayMetadata | null;
  return data ?? null;
}
