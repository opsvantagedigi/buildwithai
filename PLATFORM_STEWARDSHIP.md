# Platform Stewardship Handbook

Purpose
- Define responsibilities, runbooks, and safe-operational practices for Build With AI platform stewards.

Key Responsibilities
- Ensure deterministic publishing is upheld.
- Ensure analytics pipeline integrity (ingest → rollup → dashboard).
- Maintain KV health and backups.
- Oversee release, promote, rollback workflows.

Operational Runbook (High-level)
1. Pre-release
  - Run `npm run build` locally and in CI.
  - Run `npx tsx scripts/test-publish.ts <siteId>` against staging.
  - Confirm `window.__SITE_ID__` and `/track.js` present in snapshot.

2. Release
  - Trigger `POST /api/publish` (via UI/CI).
  - Confirm deploy hook returns OK and snapshot is stored at `buildwithai:site:html_snapshot:{siteId}:{version}`.
  - Validate analytics ingestion for live traffic.

3. Rollback
  - Use stored snapshots under `buildwithai:site:versions:{siteId}:{version}` to restore state.
  - Promote previous snapshot via `POST /api/publish/promote` or the dedicated rollback route.

4. Incident Response (analytics outage)
  - Check `/api/track` logs and KV writes.
  - Validate that published HTML contains tracking via `scripts/test-publish.ts`.
  - If tracking missing, restore snapshot and re-publish after fix.

Maintenance & Housekeeping
- KV: monitor quotas and latency; rotate credentials if expired.
- Regularly run `scripts/test-publish.ts` on a schedule for smoke-checks.
- Keep `@vercel/kv` and Next.js up to date in a controlled maintenance window.

On-call Playbook
- Pager triggers: 1) /api/track failures 2) rollup job failures 3) publish failures
- First action: run `npm run build` and `npx tsx scripts/test-publish.ts <siteId>` on staging
- Escalation: contact primary owner and provide snapshot keys and recent deploy logs

Documentation Links
- Architecture: [ARCHITECTURE_SUMMARY.md](ARCHITECTURE_SUMMARY.md)
- Rituals: [ENGINEERING_RITUALS.md](ENGINEERING_RITUALS.md)
- Test script: [scripts/test-publish.ts](scripts/test-publish.ts)
