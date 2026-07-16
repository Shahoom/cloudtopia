# Services Branch Merge Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Preserve every intended change on `redesign/services-listing-menu`, remove local-only artifacts, make the committed branch pass its verification gates, and leave it ready for a later fast-forward merge into `main`.

**Architecture:** Package the existing working-tree implementation into three feature commits—service architecture and discovery, Industries atlas, and HASM lead capture—then apply one merge-readiness cleanup commit. The cleanup fixes repository ignore boundaries, React static-component lint failures, Payload admin navigation, line-ending/whitespace failures, and committed WIP artifacts without changing public behavior.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript 6, Payload CMS 3, Node test runner, ESLint 9 flat config, PostgreSQL migrations.

## Global Constraints

- Work on `redesign/services-listing-menu`; do not merge into `main` in this plan.
- Preserve all existing user changes unrelated to temporary `.superpowers` and `.wip-enterprise-lite` artifacts.
- Do not move or rewrite the separate `codex/industry-worlds-release-a` branch.
- English remains unprefixed canonical; Arabic remains under `/ar`.
- Do not weaken HASM CORS, consent, duplicate, rate-limit, or database privilege controls.
- Each commit must stage explicit paths; never use `git add .`.
- Final verification must run from the clean committed branch.

---

### Task 1: Package canonical services and Digital Presence

**Files:**
- Modify: service routes, catalog data, navigation, SEO, sitemap, agent knowledge, crawler inventories, and related regression tests shown by `git status`
- Create: `app/(frontend)/[locale]/services/digital-presence/**`
- Create: `components/services/digital-presence/**`
- Create: `lib/services/digital-presence-landing.ts`
- Create: `lib/services/service-page-seo-fallbacks.ts`
- Test: `tests/digital-presence-landing.test.ts`
- Test: `tests/services-taxonomy.test.ts`
- Test: `tests/ai-chatbot.test.ts`

**Interfaces:**
- Consumes: the structured services catalog and canonical locale helpers.
- Produces: canonical Business Systems and Digital Presence hubs, redirect-only legacy service URLs, synchronized SEO/crawler/assistant discovery, and a bilingual Digital Presence landing page.

- [x] **Step 1: Run the service contract tests**

```bash
node --test --import tsx tests/digital-presence-landing.test.ts tests/services-taxonomy.test.ts tests/ai-chatbot.test.ts tests/country-landing-pages.test.ts tests/full-site-expansion.test.ts tests/seo-expansion.test.ts
```

Expected: PASS on the complete working tree.

- [x] **Step 2: Stage only service/discovery paths**

```bash
git add app components/Header.tsx components/agent components/blog/BusinessProblemSection.tsx components/home/ServicesGrid.tsx components/services data/cloudtopia-ai lib/agent lib/ai-chatbot lib/enterprise-content.ts lib/i18n lib/seo lib/services lib/sitemap-data.ts proxy.ts public/.well-known public/llms.txt scripts/generate-llms.ts tests/ai-chatbot.test.ts tests/blog-intelligence.test.ts tests/country-landing-pages.test.ts tests/digital-presence-landing.test.ts tests/full-site-expansion.test.ts tests/seo-expansion.test.ts tests/services-taxonomy.test.ts docs/superpowers/plans/2026-07-09-services-structure-fixes.md docs/superpowers/plans/2026-07-10-digital-presence-landing.md
git restore --staged 'app/(frontend)/[locale]/industries/page.tsx' components/industries lib/seo/industries-page.ts tests/industries-page-redesign.test.ts app/api/hasm-erp-lead collections/HasmERPLeads.ts components/payload/CommandCenter.tsx lib/hasm-leads lib/cms/admin migrations payload.config.ts .env.example
```

Expected: staged diff contains service architecture, Digital Presence, and synchronized discovery only.

- [x] **Step 3: Commit the service feature**

```bash
git commit -m "feat(services): complete canonical hubs and discovery"
```

### Task 2: Package the Industries atlas landing page

**Files:**
- Modify: `app/(frontend)/[locale]/industries/page.tsx`
- Create: `components/industries/**`
- Create: `lib/seo/industries-page.ts`
- Test: `tests/industries-page-redesign.test.ts`

**Interfaces:**
- Consumes: existing industry SEO data and locale-aware links.
- Produces: the bilingual 13-sector atlas landing experience and its route metadata/schema contract.

- [x] **Step 1: Run the Industries contract test**

```bash
node --test --import tsx tests/industries-page-redesign.test.ts
```

Expected: PASS.

- [x] **Step 2: Stage and commit the atlas**

```bash
git add 'app/(frontend)/[locale]/industries/page.tsx' components/industries lib/seo/industries-page.ts tests/industries-page-redesign.test.ts
git commit -m "feat(industries): add bilingual atlas landing"
```

### Task 3: Package HASM lead capture and security migrations

**Files:**
- Modify: `.env.example`
- Create: `app/api/hasm-erp-lead/route.ts`
- Create: `collections/HasmERPLeads.ts`
- Modify: `components/payload/CommandCenter.tsx`
- Modify: `lib/cms/admin/overview.ts`
- Modify: `lib/cms/admin/types.ts`
- Create: `lib/hasm-leads/validation.ts`
- Modify: `migrations/index.ts`
- Create: `migrations/20260715_120000_add_hasm_erp_leads.ts`
- Create: `migrations/20260715_123000_secure_public_tables.ts`
- Create: `migrations/20260715_124500_secure_legacy_demo_capture.ts`
- Modify: `payload.config.ts`
- Test: `tests/hasm-erp-lead.test.ts`

**Interfaces:**
- Consumes: Payload server access, client IP extraction, and exact-origin environment configuration.
- Produces: `POST /api/hasm-erp-lead`, an admin-only Payload collection, CRM activity integration, and non-reversible privilege hardening.

- [x] **Step 1: Run the HASM contract test**

```bash
node --test --import tsx tests/hasm-erp-lead.test.ts tests/admin-overview.test.ts
```

Expected: PASS.

- [x] **Step 2: Stage and commit HASM**

```bash
git add .env.example app/api/hasm-erp-lead collections/HasmERPLeads.ts components/payload/CommandCenter.tsx lib/cms/admin/overview.ts lib/cms/admin/types.ts lib/hasm-leads migrations/index.ts migrations/20260715_120000_add_hasm_erp_leads.ts migrations/20260715_123000_secure_public_tables.ts migrations/20260715_124500_secure_legacy_demo_capture.ts payload.config.ts tests/hasm-erp-lead.test.ts
git commit -m "feat(hasm): add secure ERP demo lead capture"
```

### Task 4: Fix repository merge-readiness checks

**Files:**
- Modify: `.gitignore`
- Modify: `eslint.config.mjs`
- Modify: `components/blog/editorial/categoryColor.ts`
- Modify: `components/blog/editorial/TypographicCover.tsx`
- Modify: `components/blog/insights/CategoriesGrid.tsx`
- Modify: `components/enterprise/icon-map.ts`
- Modify: `components/enterprise/EnterpriseLite.tsx`
- Modify: `components/payload/articles/ArticlesWorkspace.tsx`
- Normalize: `components/ui/horizontal-scroll-cards.tsx`
- Normalize: Industries plan/spec Markdown trailing whitespace
- Delete: `.wip-enterprise-lite/app-locale/industries/page.tsx`
- Delete: `.wip-enterprise-lite/app-services/page.tsx`

**Interfaces:**
- Consumes: ESLint flat config and module-level Lucide icon maps.
- Produces: stable icon component selection, Next-aware admin navigation, ignored local worktrees/brainstorm artifacts, and a clean diff check.

- [x] **Step 1: Verify RED checks**

```bash
npx eslint components/blog/editorial/TypographicCover.tsx components/enterprise/EnterpriseLite.tsx components/payload/articles/ArticlesWorkspace.tsx --quiet
git diff --check main..HEAD
```

Expected: ESLint reports static-component and raw-anchor errors; diff check reports CRLF/trailing whitespace.

- [x] **Step 2: Make icon selection statically analyzable**

Export module-level icon maps/keys and select components by direct lookup instead of calling a function that returns a component during render. Preserve the same fallback icons and visual props.

- [x] **Step 3: Use Next Link and ignore generated/local artifacts**

Replace the two admin creation anchors with `Link`; add `.worktrees/**` and `.superpowers/**` ESLint ignores; add `/.superpowers/` and `/.wip-enterprise-lite/` Git ignores.

- [x] **Step 4: Normalize whitespace and remove WIP files**

Normalize `horizontal-scroll-cards.tsx` to LF, remove trailing whitespace from the two Industries documents, ensure one newline at EOF, and delete the two tracked WIP files.

- [x] **Step 5: Verify GREEN checks and commit**

```bash
npm run lint
git diff --check main..HEAD
git add .gitignore eslint.config.mjs components/blog/editorial/categoryColor.ts components/blog/editorial/TypographicCover.tsx components/blog/insights/CategoriesGrid.tsx components/enterprise/icon-map.ts components/enterprise/EnterpriseLite.tsx components/payload/articles/ArticlesWorkspace.tsx components/ui/horizontal-scroll-cards.tsx docs/superpowers/plans/2026-07-12-industries-page-redesign.md docs/superpowers/specs/2026-07-12-industries-page-redesign-design.md .wip-enterprise-lite docs/superpowers/plans/2026-07-16-services-branch-merge-readiness.md
git commit -m "chore: prepare services branch for merge"
```

Expected: lint and diff check PASS.

### Task 5: Verify the clean committed branch

**Files:**
- No edits expected.

**Interfaces:**
- Produces: evidence that the exact committed branch is merge-ready.

- [ ] **Step 1: Verify repository cleanliness**

```bash
git status --short --branch
```

Expected: only `## redesign/services-listing-menu` with no modified or untracked files.

- [ ] **Step 2: Run all tests, generated-content check, TypeScript, lint, and production build**

```bash
npm run test:smoke
node --test --import tsx tests/admin-overview.test.ts tests/ai-chat-flows.test.ts tests/ai-chatbot.test.ts tests/digital-presence-landing.test.ts tests/hasm-erp-lead.test.ts tests/home-industries-section.test.ts tests/industries-page-redesign.test.ts tests/related-projects.test.ts tests/services-taxonomy.test.ts tests/solution-finder-ai.test.ts
npx tsx scripts/generate-llms.ts --check
npx tsc --noEmit
npm run lint
npm run build
git diff --check main..HEAD
```

Expected: every command exits 0.

- [ ] **Step 3: Review commits and stop before merge**

```bash
git log --oneline main..HEAD
git status --short --branch
```

Expected: the feature commits and cleanup commit are present; branch remains checked out and unmerged.
