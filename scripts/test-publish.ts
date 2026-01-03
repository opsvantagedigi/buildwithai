// scripts/test-publish.ts
//
// OpsVantage Digital — Publish Pipeline Validation Script
// --------------------------------------------------------
// This script performs a full publish → snapshot → validation cycle.
// Run with:  npx tsx scripts/test-publish.ts <siteId>
//

import "dotenv/config";
import { kv } from "@vercel/kv";

async function main() {
  const siteId = process.argv[2];

  if (!siteId) {
    console.error("❌ Missing siteId argument.");
    console.error("Usage: npx tsx scripts/test-publish.ts <siteId>");
    process.exitCode = 1;
    return;
  }

  console.log(`\n🔍 Testing publish pipeline for site: ${siteId}\n`);

  // 1. Trigger publish
  console.log("📡 Calling /api/publish ...");

  const base = process.env.NEXT_PUBLIC_BASE_URL || process.env.BASE_URL || "http://localhost:3000";

  const publishRes = await fetch(`${base}/api/publish`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ siteId }),
  });

  if (!publishRes.ok) {
    console.error("❌ Publish API returned an error:");
    console.error(await publishRes.text());
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

  const html = await kv.get<string>(snapshotKey);

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
