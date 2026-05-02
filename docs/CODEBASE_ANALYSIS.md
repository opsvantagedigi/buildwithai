# Codebase Analysis: buildwithai

> Generated 2026-05-02. Covers architecture, stack, conventions, strengths, and actionable improvement areas.

---

## 1. Project Overview

**buildwithai** is an AI-native website builder platform. It lets founders describe a site in plain language, then generates, previews, publishes, and monitors that site -- all from a single Next.js application deployed on Vercel.

The product surface includes:

- A cinematic landing page with founder-brief intake
- A drag-and-drop builder UI (block-based, with AI rewrite/generation)
- Domain intelligence (WHOIS/RDAP, DNS diagnostics, SEO scoring, availability checks)
- Publishing pipeline (preview, staging, promote, rollback) backed by Vercel + KV
- Analytics dashboard (traffic graphs, heatmaps, session replay, conversion funnels)
- A GDS (Global Design System) component library with Storybook
- MDX-powered docs site
- Template marketplace (9 verticals: agency, coaching, ecommerce, fitness, etc.)
- Marketing/comparison pages for SEO

---

## 2. Technology Stack

| Layer | Technology | Version |
|---|---|---|
| Framework | Next.js (App Router) | 16.1.1 |
| Language | TypeScript | ^5 |
| Styling | Tailwind CSS v4 via `@tailwindcss/postcss` + custom CSS | ^4.1.18 |
| Fonts | Inter (body), Orbitron (headings) -- Google Fonts via `next/font` | -- |
| KV / Cache | Upstash Redis REST (via `@vercel/kv` adapter) | ^0.1.0 |
| Testing | Vitest + Testing Library + jsdom | ^1.0.0 |
| Linting | ESLint 9 (flat config) + legacy `.eslintrc.cjs` | ^9 |
| Style Lint | Stylelint with Tailwind + order plugins | ^16.26.1 |
| Component Dev | Storybook 7 | ^7.0.0 |
| Docs | MDX via `next-mdx-remote` | ^5.0.0 |
| CI | GitHub Actions (Node 20, `npm ci && build && test`) | -- |
| Deploy | Vercel | -- |

---

## 3. Directory Structure

```
src/
  app/           # Next.js App Router pages + API routes
    api/         # ~30 API route handlers (domain, AI, publish, analytics, debug, kv)
    builder/     # Builder UI pages
    docs/        # MDX docs pages
    templates/   # Per-vertical template pages
    compare/     # SEO comparison pages
    ...
  components/    # React components
    builder/     # Block editor, canvas, sidebar, text/image editors
    gds/         # Design-system primitives (Button, Card, Input, Modal, Tag, Table...)
    landing/     # Landing page sections
    marketing/   # Marketing page sections
    analytics/   # Dashboard widgets
    docs/        # Docs layout/nav
    releases/    # Release list/detail
    domain/      # Domain sidebar
  lib/           # Core business logic
    builder/     # save, load, export, templates, blocks
    publish/     # preview, staging, vercel deploy
    publisher/   # tracking injection + validation
    analytics/   # replay, rollup, schema, store
    sites/       # site registry, settings, getSite
    templates/   # registry, init, blueprints (JSON)
    export/      # full-site export
    kv.ts        # Upstash/Vercel KV adapter
    rate-limit.ts
    rdap.ts, dnsDiagnostics.ts, domainHealth.ts, ...
  data/          # Static data (releases, docs MDX)
  types/         # Shared TypeScript interfaces
  styles/        # Additional CSS
  test/          # Test setup
  templates/     # Template metadata + preview images
  fonts/         # Self-hosted woff2
```

---

## 4. Architecture Highlights

### 4.1 App Router API Surface

The API layer is substantial (~30 route handlers) covering:

- **AI generation**: brand, content, page, section, full-site generation endpoints
- **Domain intelligence**: availability check, DNS lookup, RDAP, pricing, WHOIS, registration (OpenProvider integration)
- **Publishing**: preview, staging, promote, rollback, changelog, release notes, history
- **Analytics**: rollup, replay, conversions, funnels
- **Infrastructure**: KV health, warm, debug, rate-limit probes, cron warm

### 4.2 KV Adapter

`src/lib/kv.ts` (360 lines) is a hand-rolled Upstash REST wrapper with graceful degradation. It maps multiple env var naming conventions (`UPSTASH_REDIS_REST_*`, `KV_REST_API_*`, write tokens, read-only tokens) and supports a `NO_WRITE_FALLBACK` mode for read-only deployments. This is well-considered for multi-environment support but is complex and would benefit from consolidation.

### 4.3 Builder

The builder is a block-based editor with:
- Canvas rendering
- Block controls (move, delete, duplicate)
- Sidebar for block editing
- AI-powered rewrite and tone selection
- Image upload
- Page navigation for multi-page sites

### 4.4 Security

`next.config.ts` applies a well-structured Content-Security-Policy and standard security headers (X-Frame-Options, X-Content-Type-Options, Referrer-Policy). CSP is relaxed in dev for HMR. MDX support is loaded dynamically to avoid hard failures.

---

## 5. Strengths

1. **Comprehensive feature set** -- The codebase covers the full lifecycle from AI generation through publishing and analytics, which is impressive scope for a single Next.js app.

2. **Graceful KV degradation** -- The KV adapter handles missing credentials, read-only tokens, and multiple env var conventions without crashing. This makes the app resilient across dev, preview, and production environments.

3. **Security headers** -- CSP and security headers are applied globally in `next.config.ts` with appropriate dev/prod toggling.

4. **Design system (GDS)** -- A growing set of GDS primitives (`Button`, `Card`, `Input`, `Modal`, `Tag`, `Table`) with Storybook stories provides a good foundation for UI consistency.

5. **Template marketplace** -- Nine vertical-specific templates with metadata JSON and preview images, plus blueprint JSON for programmatic generation.

6. **CI pipeline** -- GitHub Actions runs build + test on every push/PR, providing basic quality gates.

7. **MDX docs** -- Structured documentation covering builder, AI generation, domains, platform, and GDS topics.

---

## 6. Issues and Improvement Areas

### 6.1 Code Quality

| Issue | Location | Severity |
|---|---|---|
| **Duplicate `"use client"` directive** | `src/app/page.tsx:1-2` | Low |
| **Duplicate `globals.css` import** | `src/app/layout.tsx:1` and `:7` -- `./globals.css` is imported twice | Low |
| **Two ESLint configs** | `.eslintrc.cjs` (legacy) and `eslint.config.js` (flat) coexist -- ESLint 9 will use the flat config and ignore the legacy one, but having both is confusing | Medium |
| **Large KV adapter** | `src/lib/kv.ts` is 360 lines of hand-rolled REST logic with multiple env var fallback chains -- could be simplified with `@upstash/redis` SDK | Medium |
| **No `.env.example`** | README references it but the file does not exist in the repo | Medium |

### 6.2 Testing

| Issue | Severity |
|---|---|
| **Minimal test coverage** -- `src/test/setup.ts` has a single import; only one test file found (`src/app/api/__tests__/api.helpers.test.ts`) | High |
| **CI runs `npm run test` but Vitest likely exits immediately** with near-zero coverage | High |
| **No component tests** for GDS primitives despite Storybook stories existing | Medium |
| **No integration/e2e tests** for the publish pipeline or builder flow | Medium |

### 6.3 Architecture

| Issue | Severity |
|---|---|
| **Monolithic page component** -- `src/app/page.tsx` is 225 lines of inline JSX in a single `"use client"` component. The landing page sections should be split into separate components (some already exist in `components/landing/` but aren't used on the main page). | Medium |
| **Static HTML in layout** -- `src/app/layout.tsx` has the full header/footer markup inline (~114 lines). The `Header` and `Footer` components in `src/components/` should be used instead. | Medium |
| **No middleware** -- Rate limiting is checked per-route inside API handlers. A Next.js middleware could centralize this. | Low |
| **No error boundaries** -- No `error.tsx` or `not-found.tsx` files found in the app directory for graceful error handling. | Medium |

### 6.4 Styling

| Issue | Severity |
|---|---|
| **Mixed styling approaches** -- Tailwind v4 directives (`@tailwind base/components/utilities`) in `globals.css`, plus extensive custom CSS in `landing.css`, `gds.css`, `docs.css`. The Tailwind directives are v3 syntax; Tailwind v4 uses `@import "tailwindcss"` instead. | Medium |
| **Hard-coded colors** -- `body` background `#0A0F1F` and color `#E6EEF3` are in `globals.css` rather than using Tailwind theme tokens or CSS custom properties, making theming harder. | Low |
| **Duplicate heading font declarations** -- `h1-h3` font-family is set twice in `globals.css` (lines 10-12 and 21-23). | Low |

### 6.5 DevOps / DX

| Issue | Severity |
|---|---|
| **PowerShell-only scripts** -- Most scripts in `scripts/` are `.ps1` files, which limits usability on Linux/macOS and in CI (the CI workflow runs on `ubuntu-latest`). | Medium |
| **No pre-commit hooks** -- No husky/lint-staged config to enforce linting before commits. | Low |
| **Build artifacts checked in** -- `build.log`, `server-err.log`, `server-out.log`, `discovery-output.txt` are in the repo root and should be gitignored. | Low |
| **Vercel env files** -- `.vercel.env` and `.vercel.env.production` are checked in; these should be in `.gitignore` if they contain secrets. | Medium |

---

## 7. Recommended Next Steps (Priority Order)

1. **Increase test coverage** -- Add unit tests for `lib/` modules (KV, rate-limit, domain utilities, builder logic) and component tests for GDS primitives. Target 60%+ line coverage.

2. **Clean up duplicate code** -- Remove duplicate `"use client"` in `page.tsx`, duplicate CSS imports in `layout.tsx`, and consolidate ESLint configs to a single flat config.

3. **Add `.env.example`** -- Document all required/optional environment variables.

4. **Add error boundaries** -- Create `error.tsx`, `not-found.tsx`, and `loading.tsx` in the app directory for graceful error handling and loading states.

5. **Refactor layout** -- Extract inline header/footer markup from `layout.tsx` into the existing `Header` and `Footer` components.

6. **Refactor landing page** -- Use the existing `components/landing/*` components in `page.tsx` instead of the 225-line inline JSX.

7. **Modernize Tailwind** -- Update `globals.css` to use Tailwind v4 import syntax (`@import "tailwindcss"`) and move hard-coded colors into theme tokens.

8. **Add cross-platform scripts** -- Provide bash equivalents for the PowerShell scripts, or migrate to Node.js scripts.

9. **Gitignore cleanup** -- Add `build.log`, `server-*.log`, `discovery-output.txt`, and `.vercel.env*` to `.gitignore`.

10. **Simplify KV adapter** -- Consider replacing the hand-rolled REST wrapper with `@upstash/redis` SDK for reduced maintenance surface.

---

## 8. Dependency Health

| Package | Status | Notes |
|---|---|---|
| `next` 16.1.1 | Current | Using latest major |
| `tailwindcss` ^4.1.18 | Current | v4 with PostCSS plugin |
| `@vercel/kv` ^0.1.0 | Stale | Largely bypassed by the custom REST wrapper in `kv.ts`; consider removing or upgrading |
| `node-fetch` ^2.7.0 | Legacy | Node 18+ has native `fetch`; can likely be removed |
| `tweetsodium` ^0.0.4 | Niche | Used only in `set_github_secrets.js`; consider moving to a dev dependency |
| `vitest` ^1.0.0 | Current | Good choice for Vite-compatible testing |
| `@storybook/react` ^7.0.0 | One major behind | Storybook 8 is current; upgrade when convenient |

---

## 9. File Metrics

| Metric | Count |
|---|---|
| Total page routes (app/) | ~40 |
| API route handlers | ~30 |
| React components | ~60 |
| Library modules (lib/) | ~30 |
| Storybook stories | 7 |
| Test files | 1 |
| Template verticals | 9 |
| MDX doc pages | ~12 |

---

*This analysis is intended as a snapshot to guide prioritization. The codebase has solid foundations; the main gaps are in testing, code deduplication, and developer experience tooling.*
