// src/lib/publisher/validate-tracking.ts

/**
 * Very small validation to assert the injected tracking appears in HTML.
 */
export function validateTracking(html: string): boolean {
  if (!html) return false;
  const hasSiteId = /window\.__SITE_ID__\s*=/.test(html);
  const hasTracker = /<script[^>]+src=["']\/track\.js["'][^>]*>\s*<\/script>/.test(html);
  return Boolean(hasSiteId && hasTracker);
}
