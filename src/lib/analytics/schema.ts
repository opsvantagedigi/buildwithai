// src/lib/analytics/schema.ts

export type AnalyticsEventType =
  | "pageview"
  | "conversion"
  | "funnel_step"
  | "heatmap_click"
  | "heatmap_move"
  | "session_start"
  | "session_end";

export interface BaseAnalyticsEvent {
  id: string;
  siteId: string;
  type: AnalyticsEventType;
  timestamp: number; // ms since epoch
  ipHash?: string; // privacy-preserving unique-ish visitor marker
  userAgent?: string;
  referrer?: string;
  path?: string;
}

/**
 * Simple pageview event
 */
export interface PageviewEvent extends BaseAnalyticsEvent {
  type: "pageview";
}

/**
 * Conversion event – tied to a named goal (e.g. "lead", "signup")
 */
export interface ConversionEvent extends BaseAnalyticsEvent {
  type: "conversion";
  goal: string;
  value?: number;
}

/**
 * Funnel step event – tracks movement through a predefined funnel
 */
export interface FunnelStepEvent extends BaseAnalyticsEvent {
  type: "funnel_step";
  funnelId: string;
  stepId: string;
}

/**
 * Heatmap click / move – stores normalized coordinates for later visualization
 */
export interface HeatmapEvent extends BaseAnalyticsEvent {
  type: "heatmap_click" | "heatmap_move";
  // normalized coordinates 0–1 relative to viewport
  x: number;
  y: number;
}

/**
 * Session start / end – allows later reconstruction of replay streams
 */
export interface SessionEvent extends BaseAnalyticsEvent {
  type: "session_start" | "session_end";
  sessionId: string;
}

/**
 * Union of all raw event types
 */
export type AnalyticsEvent =
  | PageviewEvent
  | ConversionEvent
  | FunnelStepEvent
  | HeatmapEvent
  | SessionEvent;

/**
 * Daily rollup for a site + date.
 * This is what the dashboard will read for fast charts and summaries.
 */
export interface DailyRollup {
  siteId: string;
  date: string; // YYYY-MM-DD
  pageviews: number;
  uniques: number;

  // Simple aggregates for dashboard summaries
  paths: Record<
    string,
    {
      pageviews: number;
    }
  >;

  referrers: Record<
    string,
    {
      pageviews: number;
    }
  >;

  devices: {
    desktop: number;
    mobile: number;
    tablet: number;
    other: number;
  };
}

/**
 * Represent a funnel definition for a site
 * (we'll store minimal definitions to start).
 */
export interface FunnelDefinition {
  id: string;
  siteId: string;
  name: string;
  steps: {
    id: string;
    name: string;
    path?: string;
  }[];
  createdAt: number;
}

/**
 * Simple conversion goal definition
 */
export interface ConversionDefinition {
  id: string;
  siteId: string;
  name: string;
  createdAt: number;
}

/**
 * Lightweight replay metadata (per session)
 * – raw replay events will be stored as generic AnalyticsEvent with sessionId.
 */
export interface SessionReplayMetadata {
  sessionId: string;
  siteId: string;
  startedAt: number;
  endedAt?: number;
  pageviewCount: number;
}
