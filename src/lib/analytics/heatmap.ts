// src/lib/analytics/heatmap.ts

import type { AnalyticsEvent } from "./schema";

/**
 * Heatmap aggregation:
 * We group click/move events by path and bucket them into a grid.
 *
 * Example grid: 20x20 = 400 buckets
 * Each bucket stores a count of events.
 */

export interface HeatmapBucket {
  x: number; // bucket x index
  y: number; // bucket y index
  count: number;
}

export interface HeatmapData {
  path: string;
  width: number;
  height: number;
  buckets: HeatmapBucket[];
}

const GRID_SIZE = 20;

export function aggregateHeatmap(events: AnalyticsEvent[]): HeatmapData[] {
  const byPath: Record<string, { count: number }[][]> = {};

  for (const e of events) {
    if (e.type !== "heatmap_click" && e.type !== "heatmap_move") continue;
    if (typeof e.x !== "number" || typeof e.y !== "number") continue;

    const path = e.path || "/";
    if (!byPath[path]) {
      byPath[path] = Array.from({ length: GRID_SIZE }, () =>
        Array.from({ length: GRID_SIZE }, () => ({ count: 0 }))
      );
    }

    const bx = Math.min(GRID_SIZE - 1, Math.floor(e.x * GRID_SIZE));
    const by = Math.min(GRID_SIZE - 1, Math.floor(e.y * GRID_SIZE));

    byPath[path][bx][by].count += 1;
  }

  return Object.entries(byPath).map(([path, grid]) => ({
    path,
    width: GRID_SIZE,
    height: GRID_SIZE,
    buckets: grid.flatMap((col, x) =>
      col.map((cell, y) => ({
        x,
        y,
        count: cell.count,
      }))
    ),
  }));
}
