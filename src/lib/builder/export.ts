import { loadSiteState } from "./load";

/**
 * exportSiteToStatic
 *
 * This function wraps your existing load/save logic
 * into a clean, future‑proof static export helper.
 *
 * It returns the exported site state exactly as expected
 * by the publish and promote routes.
 */
export async function exportSiteToStatic(siteId: string) {
  const site = await loadSiteState(siteId);
  if (!site) return null;

  // Your platform already stores the full builder state
  // in KV via saveSite(). For static export, we simply
  // return the site state as-is. Future enhancements
  // (HTML generation, asset bundling, etc.) can plug in here.
  return site;
}
