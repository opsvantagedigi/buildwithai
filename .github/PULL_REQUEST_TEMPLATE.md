### Summary
- Short description of the change and the high-level goal.

### Phase / Epic
- Phase: [e.g. Phase 2 — Landing Page Implementation]
- Related issue(s): #

### Checklist (required before review)
- [ ] Tests added or existing tests updated
- [ ] CI checks passing (lint, build, discovery-run if applicable)
- [ ] Documentation updated (README, `.env` notes, or relevant docs)
- [ ] Feature flags or config toggles added (if needed)
- [ ] Security review / secrets handled

### Deployment & Verification
- Deploy target: (branch / preview / production)
- Verification steps (copyable):
  1. Run discovery: `scripts/run_site_discovery.ps1 -BaseUrl "https://staging.example.com"`
  2. Confirm KV health: `curl -s $TEST_BASE_URL/api/kv/health | jq .`
  3. Verify publish snapshot exists in KV.

### Observability
- Metrics to watch after deploy:
  - `publish.success_rate`
  - `kv.health.status`
- Logging: reference archived CI log path (if applicable)

### Notes for reviewers
- Any breaking changes?
- Migration steps required?

### Checklist for Maintainers (post-merge)
- [ ] Tag release (if applicable)
- [ ] Update project roadmap / phase tracker
- [ ] Archive discovery logs under `ops/logs/ci/`

---
*Use this template to standardize phase and release PRs.*
