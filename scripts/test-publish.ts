// scripts/test-publish.ts
//
// OpsVantage Digital — Publish Pipeline Validation Script
// --------------------------------------------------------
// This script performs a full publish → snapshot → validation cycle.
// Run with:  npx tsx scripts/test-publish.ts <siteId>
//

import "dotenv/config";
// Use the project's KV adapter so local tests use the same backend configuration
import { kv as appKv } from "../src/lib/kv";

// NOTE: This script no longer starts or waits for a local dev server.
// It targets a deployed environment via TEST_BASE_URL.

// Retry wrapper for KV reads to handle eventual consistency / timing.
async function retryKvGet(key: string, retries = 20, delay = 300) {
  for (let i = 0; i < retries; i++) {
    try {
      const value = await appKv.get(key);
      if (value) return value;
    } catch (_) {
      // ignore and retry
    }
    await new Promise((r) => setTimeout(r, delay));
  }
  throw new Error(`Snapshot not available after ${retries} retries`);
}

async function main() {
  const siteId = process.argv[2];

  if (!siteId) {
    console.error("❌ Missing siteId argument.");
    console.error("Usage: npx tsx scripts/test-publish.ts <siteId>");
    process.exitCode = 1;
    return;
  }

  console.log(`\n🔍 Testing publish pipeline for site: ${siteId}\n`);

  // Use TEST_BASE_URL if provided; otherwise default to production domain.
  const baseUrl =
    process.env.TEST_BASE_URL?.trim() ||
    "https://www.buildwithai.digital";

  console.log("🔗 Using TEST_BASE_URL:", baseUrl);

  // 1. Trigger publish
  console.log("📡 Calling /api/publish ...");

  let publishRes: Response;
  try {
    publishRes = await fetch(`${baseUrl}/api/publish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ siteId }),
  });

  } catch (err) {
    console.error("❌ Failed to call /api/publish:", err);
    process.exitCode = 2;
    return;
  }

  if (!publishRes.ok) {
    console.error("❌ Publish API returned an error:");
    try {
      console.error(await publishRes.text());
    } catch (_) {}
    process.exitCode = 2;
    return;
  }

  const publishData = await publishRes.json();
  console.log("✅ Publish API responded:", publishData);

  // Derive snapshot key from publish metadata
  const version = publishData?.publish?.lastPublishedVersion ?? publishData?.publish?.lastPublishedVersion ?? null;
  if (version == null) {
    console.warn("⚠️ No published version returned; attempting to read latest snapshot without version.");
  }

  // 2. Fetch snapshot from KV
  const snapshotKey = version == null
    ? `buildwithai:site:html_snapshot:${siteId}`
    : `buildwithai:site:html_snapshot:${siteId}:${version}`;

  console.log(`\n📦 Fetching snapshot from KV: ${snapshotKey}`);

  const html = await retryKvGet(snapshotKey);

  if (!html) {
    console.error("❌ No HTML snapshot found in KV for key:", snapshotKey);
    process.exitCode = 3;
    return;
  }

  console.log("✅ Snapshot retrieved.");

  // 3. Validate injection
  console.log("\n🔎 Validating tracking injection...");

  const hasSiteId = html.includes("window.__SITE_ID__");
  const hasTracker = html.includes("/track.js");

  if (!hasSiteId || !hasTracker) {
    console.error("❌ Tracking injection FAILED.");
    console.error("  window.__SITE_ID__ present:", hasSiteId);
    console.error("  /track.js present:", hasTracker);
    process.exitCode = 4;
    return;
  }

  console.log("🎉 SUCCESS — Tracking injection is present and valid.\n");
  console.log("✨ Full publish pipeline validated successfully.\n");
}

main().catch((err) => {
  console.error("❌ Script error:", err);
  process.exitCode = 99;
});
