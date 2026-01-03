# First 30 Days — New Engineer Plan (Copilot-driven)

Purpose
- Accelerate a new engineer to productive, disciplined maintenance of Build With AI.
- Emphasize deterministic publishing, KV-driven storage, and analytics integrity.

Week 0 — Setup (days 0–2)
- Fork/clone repo and install: `npm ci`
- Configure local env: `NEXT_PUBLIC_BASE_URL=http://localhost:3000` and KV creds (Upstash/Vercel KV)
- Run: `npm run dev` and `npm run build` to confirm baseline
- Run: `npx tsx scripts/test-publish.ts <siteId>` (see onboarding SOP)

Week 1 — Read & Validate (days 3–7)
- Read: [ARCHITECTURE_SUMMARY.md](ARCHITECTURE_SUMMARY.md), [COPILOT_RULES.md](COPILOT_RULES.md)
- Run the full build and publish test daily: `npm run build` + `npx tsx scripts/test-publish.ts <siteId>`
- Inspect analytics pipeline: `src/lib/analytics` and `/api/track`
- Make one small, deterministic change (e.g., tweak hero text) and publish — validate snapshot

Week 2 — Small Features (days 8–14)
- Pick a small bug/feature from the backlog that touches publishing or analytics
- Follow the Code Review Checklist (`/COPILOT_CODE_REVIEW_CHECKLIST.md`)
- Create a PR; run build + `scripts/test-publish.ts` in CI

Week 3 — Ownership (days 15–21)
- Own a small vertical (e.g., rollups or replay)
- Add tests or an operational script (similar to `scripts/test-publish.ts`)
- Document invariants in `/ENGINEERING_RITUALS.md`

Week 4 — Deliver & Harden (days 22–30)
- Deliver a feature with end-to-end tests and documented rollback steps
- Run canary publish in staging and validate analytics ingestion and rollup
- Complete a stewardship handoff doc and pair with owner for knowledge transfer

Daily Rituals
- `npm run build` (validate TypeScript)
- `npx tsx scripts/test-publish.ts <siteId>` (validate injection + snapshot)
- Run limited KV queries to inspect analytics keys for today

Success Criteria (30 days)
- Can perform a publish and verify tracking injection end-to-end
- Can author a small, deterministic change and ship it safely
- Understand analytics ingestion → rollup → dashboard flow
