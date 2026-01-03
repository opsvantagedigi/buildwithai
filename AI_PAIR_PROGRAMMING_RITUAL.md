# AI Pair Programming Ritual (Copilot-driven)

Goal
- Use AI (Copilot) as a disciplined pair that enforces the platform’s deterministic and auditable practices.

Setup
- Ensure Copilot is configured with project custom instructions and repo rules (`COPILOT_RULES.md`).

Session Structure (60–90 minutes)
1. Intent (5 min)
  - Human states the exact goal, constraints, and the `siteId` safety requirement.

2. Explore (10–15 min)
  - Run `npm run build` and `npx tsx scripts/test-publish.ts <siteId>`.
  - Share failing errors or logs with Copilot.

3. Plan (5 min)
  - Copilot proposes a small, testable plan with 2–4 steps.

4. Implement (20–30 min)
  - Generate focused patches with Copilot.
  - Apply changes via `git` and run `npm run build` after each patch.

5. Verify (10–15 min)
  - Run `scripts/test-publish.ts` and a small KV query to confirm analytics keys.

6. Clean-up (5 min)
  - Remove debug logs and ensure tests pass.

Prompt Patterns (examples)
- “Generate a deterministic server-side utility to X; require `siteId`; return pure output string.”
- “Inject tracking using `injectTracking()` before saving snapshot; add validation guard.”

Rules for Copilot Use
- Always require `siteId` for multi-tenant operations.
- Never create client-side publishing logic.
- Keep changes small and runnable; prefer single-purpose patches.

Artifacts to Produce
- Unit-safe patch (single file or clear small set)
- One-line commit message and PR description referencing tests run
- Updated doc line in `/ENGINEERING_RITUALS.md` if pattern is new

Final Ritual
- Merge only after `npm run build` and `npx tsx scripts/test-publish.ts <siteId>` succeed.
