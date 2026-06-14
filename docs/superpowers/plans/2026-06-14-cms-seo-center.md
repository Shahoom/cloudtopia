# SEO Control Center (M4) Implementation Plan

> REQUIRED SUB-SKILL: superpowers:executing-plans.

**Goal:** Edit the meta title (tab name) + meta description (+ canonical, noindex/nofollow) for EVERY public route — core pages and programmatic industries/services/locations — from `/admin/seo`, with the values actually applied at render time.

**Architecture:** A new additive `seo_overrides` table (hand-written idempotent migration, `lockDocuments:false`, no relations). A cached resolver `getSeoOverride(locale, path)` (raw SQL via `queryDatabase`, try/catch → null so it's safe before the table exists). It's applied at the two metadata chokepoints: inside `getCMSMetadata` (covers the 15 routes that use it) and via `applySeoOverride(meta, locale, path)` wrapped around the 3 programmatic route metadata functions (industries/[industry], services/[service], locations/[country]). The `/admin/seo` view lists all routes (core list + programmatic slugs from `lib/seo`) and upserts overrides via the REST API.

**Branch:** `feature/cms-foundation`. **Spec:** M4. **Data safety:** additive table only; migration NOT run against prod without explicit go-ahead; resolver degrades to current behavior when no override / table missing.

---

## Tasks

### Task 1: `seo-overrides` collection
- Create `collections/SeoOverrides.ts`: slug `seo-overrides`, `lockDocuments:false`, group `Settings`, access `adminOnly` for write / `() => true` read. Fields: `routePath` (text, required), `locale` (select en|ar, required, default en), `metaTitle` (text), `metaDescription` (textarea), `canonicalUrl` (text), `noIndex` (checkbox), `noFollow` (checkbox). Composite unique index `[routePath, locale]`. afterChange/afterDelete → `revalidateCmsTags(['cms-pages'])`.
- Register in `payload.config.ts` collections array.
- `npx tsc --noEmit`; commit.

### Task 2: migration
- Create `migrations/20260614_120000_add_seo_overrides.ts` (model on `add_contact_inquiries`): enum `enum_seo_overrides_locale (en,ar)`; `create table if not exists seo_overrides (...)`; unique index on `(route_path, locale)`; index on `route_path`. `down` drops table + enum.
- Register in `migrations/index.ts`.
- `npx tsc --noEmit`; commit. (Do NOT run against prod.)

### Task 3: resolver + wiring
- Create `lib/cms/route-seo.ts`: `getSeoOverride(locale, path)` — normalize path, `queryDatabase('select ... from seo_overrides where route_path=$1 and locale=$2 limit 1')`, wrapped in React `cache()` + try/catch → null. `applySeoOverride(base, locale, path)` — merge override into a Next `Metadata` (title.absolute, description, robots, alternates.canonical) when present.
- Modify `lib/cms/metadata.ts`: in `getCMSMetadata`, after building the result, `return applySeoOverride(result, locale, path)`.
- Modify `app/(frontend)/[locale]/industries/[industry]/page.tsx`, `.../services/[service]/page.tsx`, `.../locations/[country]/page.tsx`: wrap the returned metadata in `await applySeoOverride(meta, locale, '<path>')`.
- `npx tsc --noEmit`; commit.

### Task 4: route-manifest endpoint
- Create `lib/cms/admin/route-manifest-endpoint.ts`: `handleRouteManifestEndpoint` — auth; build grouped routes: Core (hardcoded ~20 paths), Industries (`industrySlugs`), Services (`serviceDetailSlugs`), Locations (location slugs); for each return `{ group, path, label }`. Also fetch existing overrides (`payload.find seo-overrides limit 1000`) keyed by `path|locale` so the UI can show current values + "overridden" badge. Return `{ groups, overrides }`.
- Register `POST /api/admin/route-manifest` in `payload.config.ts`.
- `npx tsc --noEmit`; commit.

### Task 5: SEO center UI + registration
- Create `components/payload/seo/api.ts` (fetch manifest; upsert override = find-or-create then PATCH/POST to `/api/seo-overrides`; delete override), `components/payload/seo/SeoControlCenter.tsx` (`'use client'`: EN/AR toggle, search, grouped route list with current tab-title + description + overridden badge, edit drawer with metaTitle [char count + tab preview], metaDescription [char count + snippet preview], canonical, noindex/nofollow, Save/Reset), `components/payload/SeoControlCenterView.tsx` (server wrapper).
- Register view `seoCenter: { Component: '@/components/payload/SeoControlCenterView#SeoControlCenterView', path: '/seo', exact: true }`.
- Add nav link "SEO control center" → `/admin/seo` in `AdminChrome.tsx` (Settings group).
- Add both new components + nothing-else to `app/(payload)/admin/importMap.js`.
- `npm run build`; commit.

### Task 6: verify
- `npm run build` + `npm run test:smoke` (no NEW failures). Resolver returns null safely when table absent (try/catch). Live verify deferred to preview.

## Self-review
- Covers "every page": core via getCMSMetadata, programmatic via applySeoOverride wrap, both reading seo_overrides.
- Articles excluded (own SEO in the workspace) — documented.
- Migration additive + not auto-run on prod here.
