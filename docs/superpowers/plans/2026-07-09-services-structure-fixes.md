# Services Structure Fixes Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the services URL architecture canonical by moving Business Systems under `/services`, redirecting legacy website-family URLs, and aligning metadata, sitemap, structured data, and internal links.

**Architecture:** Keep `/services` as the main catalog, with rich category hubs at `/services/web-applications`, `/services/app-development`, and `/services/business-systems-development`. Use `proxy.ts` for one-hop redirects from old URLs, shared helpers/data for canonical paths, and targeted regression tests for the URL decisions.

**Tech Stack:** Next.js App Router, TypeScript, Node test runner, Payload CMS data helpers, `proxy.ts` routing.

## Global Constraints

- English stays unprefixed canonical; Arabic stays under `/ar`.
- Avoid redirect chains; each legacy URL should resolve in one permanent redirect.
- Do not proxy-rewrite guarded structured pillar nested URLs to flat pages.
- Contact CTA behavior is unchanged.
- Use focused tests before production changes.

---

### Task 1: Regression Tests

**Files:**
- Modify: `tests/services-taxonomy.test.ts`

**Interfaces:**
- Consumes: existing catalog exports from `lib/seo/services.ts`, `lib/services/business-systems.ts`, `lib/sitemap-data.ts`.
- Produces: assertions for canonical Business Systems hub, website-orphan exclusion, and structured-data source paths.

- [x] Add failing tests for Business Systems canonical route, orphan sitemap exclusion, and nested JSON-LD source paths.
- [x] Run `node --test --import tsx tests/services-taxonomy.test.ts` and confirm the new tests fail.

### Task 2: Business Systems Hub Move

**Files:**
- Move: `app/(frontend)/[locale]/business-systems-development/` to `app/(frontend)/[locale]/services/business-systems-development/`
- Modify: `proxy.ts`
- Modify: `components/Header.tsx`
- Modify: `app/(frontend)/[locale]/services/ServicesPageClient.tsx`
- Modify: `lib/seo/services.ts`
- Modify: `lib/sitemap-data.ts`

**Interfaces:**
- Produces: canonical hub `/services/business-systems-development`; old `/business-systems-development` redirects to it.

- [x] Move the static route folder.
- [x] Update all internal hub references.
- [x] Add a one-hop proxy redirect for `/business-systems-development`.

### Task 3: Website Orphan Cleanup

**Files:**
- Modify: `proxy.ts`
- Modify: `lib/sitemap-data.ts`
- Modify: `app/(frontend)/[locale]/pricing/page.tsx`
- Modify: `app/(frontend)/[locale]/about/layout.tsx`
- Modify: `public/llms.txt`

**Interfaces:**
- Produces: legacy website-family slugs redirect to canonical pillars and are excluded from sitemap/LLMS.

- [x] Add website-family orphan redirect map.
- [x] Exclude orphan slugs from service sitemap generation.
- [x] Repoint internal links and generated crawler text to canonical URLs.

### Task 4: Nested Metadata and JSON-LD

**Files:**
- Modify: `components/services/WebAppPillarPage.tsx`
- Modify: `app/(frontend)/[locale]/services/[service]/page.tsx`
- Modify: `app/(frontend)/[locale]/services/layout.tsx`

**Interfaces:**
- Produces: canonical schema URLs for nested Web Apps, nested App Development sub-pages, and real services category list URLs.

- [x] Use `/services/web-applications/<slug>` in Web App Service/Breadcrumb JSON-LD.
- [x] Use the computed canonical service path in App Development Service/WebPage/Breadcrumb JSON-LD.
- [x] Replace `/services#category` ItemList URLs with category front doors.

### Task 5: Catalog Alignment and Dead Code

**Files:**
- Modify: `lib/services/business-systems.ts`
- Modify: `components/home/ServicesGrid.tsx`
- Modify: `app/(frontend)/[locale]/services/ServicesPageClient.tsx`
- Modify: `lib/sitemap-data.ts`

**Interfaces:**
- Produces: Business Systems catalog labels match nested sub-service pages; inert legacy arrays are removed.

- [x] Add missing Business Systems sub-service labels or derive counts consistently.
- [x] Remove `_LEGACY_TABS`, `mobileAppServices`, and `webApplicationsServices`.
- [x] Update stale comments around Web Apps sitemap behavior.

### Task 6: Verification

**Files:**
- No edits expected.

**Interfaces:**
- Produces: passing tests plus route-level curl proof.

- [x] Run `node --test --import tsx tests/services-taxonomy.test.ts`.
- [x] Run `npx tsc --noEmit` and record any known stale `.next` validator issue.
- [x] Start/reuse dev server and verify canonical 200/301 behavior with `curl`.
