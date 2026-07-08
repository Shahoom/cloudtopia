# CloudTopia — Services Redesign: Full Handover

You are taking over an in-progress redesign on the branch **`redesign/services-listing-menu`**
(**68 commits ahead of `main`, NOT merged, NOT live**). This document is the complete context
for the services/URL restructure so you can continue without the original chat.

---

## 0. Stack & how to run / verify

- **Next.js 16.2.6**, App Router, **Turbopack** dev server. Payload CMS. TypeScript. Tailwind v3.
- **Bilingual EN + Arabic (RTL).** Brand palette: sky/indigo + lavender.
- Dev server: `npm run dev` (port 3000; ComicsTopia may coexist — never broad-kill node).
- **Turbopack is flaky**: it crashes, and after edits it frequently serves **stale bundles**
  and blank screenshots. When the browser looks wrong, restart the dev server and re-check with
  **server-side `curl`** — curl reflects the real routing/HTML even when the browser is stale.
- Type-check: `npx tsc --noEmit` (ignore the pre-existing `.next/types/validator.ts` error about
  a deleted `web-applications/[pillar]` route — it's a stale generated artifact, clears on a clean build).
- Shell: **quote paths with brackets/parens**, e.g. `"app/(frontend)/[locale]/services/[service]/page.tsx"`.

---

## 1. Locale / URL architecture (in `proxy.ts` — the Next 16 middleware, renamed from middleware)

- **English is unprefixed-canonical**: `/x` internally **rewrites** to `/en/x`. **Arabic is `/ar/x`** (passes through).
- `/en/x` **301s** to `/x`. www-strip + trailing-slash + locale-strip are collapsed into ONE 301 hop
  (never chain redirects — Google's "Page with redirect" trap).
- All cross-namespace 301s live in `proxy.ts`.

---

## 2. Current service catalog & URL scheme (THIS IS THE SOURCE OF TRUTH)

Six categories, surfaced under `/services` (the listing page) and the header mega-menu.

| Category (catalog id) | Hub page | Pillars | Sub-services |
|---|---|---|---|
| **Digital Presence** (`digital-presence`) | `/services` | 8 pillars, **flat** `/services/<slug>` | nested `/services/<pillar>/<sub>` |
| **Business Systems** (`business-systems-development`) | **`/business-systems-development`** (bare) | 3 pillars, **flat** | nested `/services/<pillar>/<sub>` |
| **Web Applications** (`interactive-web-applications`) | **`/services/web-applications`** (moved this session) | 5 pillars, **NESTED** `/services/web-applications/<pillar>` | strings only, no pages (link to pillar) |
| **App Development** (`mobile-app-development`) | `/services/app-development` (pillar page) | — | 13 mobile subs, **NESTED** `/services/app-development/<sub>` |
| **Cloud & Infrastructure** (`cloud-infrastructure`) | `/services` | 10 pillars, **flat** | none |
| **AI Solutions** (`ai-powered-solutions`) | `/services` | 10 pillars, **flat** | none |

- **Digital Presence 8 pillars**: `search-engine-optimization`, `answer-engine-optimization`,
  `generative-engine-optimization`, `website-development`, `ecommerce-development`,
  `social-media-marketing`, `content-creation`, `ui-ux-design-branding`. (SEO/AEO/GEO share the
  `GetFoundPillarPage` template. The first 4 flagships are **static folders** — see §4.)
- **Business Systems 3 pillars**: `business-management-systems`, `business-process-automation`,
  `custom-erp-crm-solutions`.
- **Web Applications 5 pillars**: `custom-saas-mvp-development`, `full-stack-web-engineering`,
  `interactive-portals-dashboards`, `application-modernization-performance`,
  `media-entertainment-streaming`.
- **App Development 13 subs**: ios, android, cross-platform, flutter, react-native, mvp,
  business-mobile, customer, booking, delivery-order, app-backend-api, app-store-launch-support,
  mobile-app-maintenance (each `-app-development` / `-app-...` slug).

> **IMPORTANT — nest-vs-flat has flip-flopped.** The owner first rejected nesting ("keep it flat"),
> then **demanded** it. Only **App Development** and **Web Applications** are nested so far.
> Business Systems / Digital Presence / Cloud / AI are still flat. **Do NOT re-open nest-vs-flat
> unless the owner asks.** If they ask to nest more, reuse the mechanism in §3.

---

## 3. The nesting mechanism (reuse this exact pattern)

To nest a category's pillars under `/services/<hub>/<pillar>`:

1. **Set the catalog pillar `href` to the nested URL** (e.g. in `lib/services/web-applications.ts`).
2. The `[service]` route's **canonical guard** does the rest:
   `app/(frontend)/[locale]/services/[service]/page.tsx:445`
   `if (pillar.href !== \`/services/${serviceSlug}\`) permanentRedirect(pillar.href)` →
   the old flat `/services/<pillar>` **308-redirects** to the nested URL automatically.
3. **Render the nested URL in `[service]/[subservice]/page.tsx`** (NOT via a proxy rewrite).
   For web-apps we added a branch there: `getWebappServiceContent(subservice)` →
   `<WebAppPillarPage>` with a nested canonical + `generateStaticParams`.

   ⚠️ **Do NOT proxy-rewrite nested→flat for guarded pillars** — the canonical guard would fire on
   the flat render and cause a **redirect loop**. Render directly in the nested route instead.
   (App Development's mobile subs are the exception: they DO use a proxy rewrite in `proxy.ts`
   [`APP_SUBS`], because their flat page is the guard-less legacy `ServiceDetail`, not a structured pillar.)
4. **Hub as a static folder**: `app/(frontend)/[locale]/services/web-applications/` (page/layout/client)
   **shadows** the dynamic `[service]` route for the 2-segment `/services/web-applications`, while
   3-segment children fall through to `[service]/[subservice]`. Next resolves by path depth, so a
   static hub folder + the dynamic child route coexist (this is how the 4 flagship folders work).
5. **`proxy.ts`**: 301 the old bare hub and old flat URLs to the new canonical (see the
   `web-applications` block: bare `/web-applications` → `/services/web-applications`;
   `/web-applications/<pillar>` → nested; `WEBAPP_ORPHAN_REDIRECTS` for dead duplicates).
6. **Sitemap** (`lib/sitemap-data.ts`): `serviceCanonicalPath()` maps slugs → canonical nested URLs;
   `webAppPillarSet` / `mobileSubSlugSet` handle the mapping; `webAppOrphanSet` excludes redirected orphans.
7. **Update every internal link** (header mega-menu, `/services` cards, homepage grid, blog,
   solution-finder, enterprise content, translations, industries, `featuredPages`,
   `categoryStandaloneRoutes`).

---

## 4. Key files map

- **Routing dispatch**: `app/(frontend)/[locale]/services/[service]/page.tsx`
  (order: `getGetFoundContent` → `app-development` → `getStructuredPillarBySlug` → canonical guard →
  `RichPillarPage`/`WebAppPillarPage`/`PillarPage` → BS/DP sub 301 → legacy `ServiceDetail`).
- **Nested route**: `app/(frontend)/[locale]/services/[service]/[subservice]/page.tsx`
  (BS subs, DP subs, AND web-app pillars).
- **Static hub/flagship folders** (shadow `[service]`): `services/website-development/`,
  `ecommerce-development/`, `social-media-marketing/`, `content-creation/`, **`web-applications/`**.
- **Catalog**: `lib/services/structured-catalog.ts` (`getStructuredPillars`, `getStructuredGroups`,
  `getStructuredPillarBySlug`, `allStructuredPillars`, `structuredPillarRoutes`, `bespokePillarSlugs`,
  `structuredCatalog`) → composed from `digital-presence.ts`, `web-applications.ts` (`webApplicationsGroups`),
  `legacy-pillars.ts` (`categoryToGroups` → mobile/cloud/ai from `serviceCategories`).
- **`lib/seo/services.ts`**: `serviceGroups` (categorySlug → `[slug, name]` tuples), `serviceCategories`,
  `servicesBySlug`, `serviceDetailSlugs`, `getService`, `getServiceCategory`, `categoryStandaloneRoutes`,
  `featuredPages`, `PILLAR_SEO_OVERRIDES`.
- **Sub-service content (bilingual)**: `lib/services/business-systems-content.ts`
  (`subServiceContent` [EN], `subServiceContentAr` [AR overrides], display name = `hero.title`),
  `digital-presence-content.ts` / `digital-presence-subservices*.ts`,
  `web-applications.ts` (`webAppPillarSubServices` = `Record<pillarSlug, {en,ar,desc?}[]>`).
- **Nested URL helper**: `lib/services/sub-service-routing.ts` (`subServiceHref(pillarSlug, subSlug)`,
  `subServiceParent`, `findSubServiceParent`).
- **Header mega-menu**: `components/Header.tsx` — `SERVICE_CATEGORY_META` (each cat has a `hub` URL +
  `getStructuredPillars(id)` for the pillar list).
- **`/services` listing**: `app/(frontend)/[locale]/services/ServicesPageClient.tsx` — tabbed;
  `CATEGORY_HUB` renders the special "Main hub" card (business-systems, web-apps, app-development);
  structured categories render `getStructuredGroups`; `mobileAppServices`/`webApplicationsServices`
  arrays here are **dead code** (rendering is catalog-driven).
- **Homepage "What We Deliver"**: `components/home/ServicesGrid.tsx` — `SERVICE_TABS_META` + `TABS_DATA`
  = `getStructuredPillars(id).slice(0,8)` **+ `fillerSubCards`** (pads Business Systems / Web Applications
  to 8 with bilingual sub cards). `_LEGACY_TABS` (~430 lines) is **inert/dead — safe to delete**.
- **Sitemap**: `lib/sitemap-data.ts`. **Proxy/redirects**: `proxy.ts`. **i18n url**: `lib/i18n/url.ts`
  (`localePath` — passes `/api/*`, `mailto:`, `tel:`, `#`, external URLs through UN-prefixed).

---

## 5. What was done on this branch (recent → older)

- **`b943314`** Move Web Apps hub to `/services/web-applications` (git-mv folder; `/web-applications`
  301s; swept all links; fixed a bug where `categoryStandaloneRoutes` mapped mobile → `/web-applications`).
  Fill homepage tabs via `fillerSubCards` (BS + Web Apps now 8 cards, bilingual).
- **`66885f1`** Nest the 5 web-app pillars under `/services/web-applications/<pillar>`; 301 flat + 7
  legacy web-app orphans; rebuild homepage web-apps section.
- **`e55c978` / `6e6ef4c`** App Development as a special **"Main hub"** card (matches BS/Web-Apps);
  footer "Contact us" → `/contact`; removed a mismatched "Our work" projects section from the app pillar.
- **`eb86d14`** Link audit: pointed every internal service link at its canonical (killed 301 hops
  + fixed 404s like `/services/seo-optimization` → `/services/search-engine-optimization`,
  `/services/web-applications` [solution-finder] → `/web-applications`).
- **`21868c4`** All contact-CTA **buttons → geo WhatsApp** endpoint `/api/whatsapp?locale=<locale>`
  (GCC→Oman `96895886393`, else→Türkiye `905011511116`). `localePath` patched for `/api/*`.
  Nested all 13 app services under `/services/app-development/<sub>`.
- **`6d93928`…`ca6f0a0`** Renamed Mobile App Development → **App Development** (`/services/app-development`),
  bespoke pillar with a GSAP cinematic hero (`components/ui/cinematic-landing-hero.tsx`;
  taglines/wordmark are `<div>` with inline `font-family: var(--font-poppins)` — single `sr-only` h1 for SEO).
- **`a0f7f58`** Web-app pillars first grouped under `/services/`; **`bf6f77c`** full Arabic for BS subs.

---

## 6. Remaining work / TODO (in priority order)

1. **Website-family orphans (8) — still live at flat URLs, not in `/services` or any pillar:**
   `website-redesign`, `corporate-website-design`, `landing-page-design`, `portfolio-websites`,
   `educational-website-development`, `restaurant-website-development`, `website-maintenance`,
   `ecommerce-website-development`.
   → **301 them to `/services/website-development`** (and `ecommerce-website-development` →
   `/services/ecommerce-development`) via a `proxy.ts` map (same shape as `WEBAPP_ORPHAN_REDIRECTS`).
   → Then grep for any live links to them (`pricing/page.tsx`, `about/layout.tsx` JSON-LD `makesOffer`,
   any homepage remnant) and repoint to the real pillars. `_LEGACY_TABS` links them but is dead code.
   Add them to `webAppOrphanSet`-style exclusion in the sitemap.
2. **Business Systems hub** is still the bare `/business-systems-development` (not under `/services`).
   The owner only asked to move Web Apps. If they want consistency, move it to
   `/services/business-systems-development` using the §3 static-folder pattern.
3. **Delete `_LEGACY_TABS`** in `components/home/ServicesGrid.tsx` (~430 dead lines).
4. **Delete dead arrays** `mobileAppServices` / `webApplicationsServices` in `ServicesPageClient.tsx`
   (the /services page is catalog-driven; these are unused).
5. **Merge to `main`** when the owner signs off (68 commits ahead; working tree should be clean).

---

## 7. Conventions & gotchas

- **Contact CTAs → WhatsApp** (`/api/whatsapp?locale=${locale}`), NOT `/contact`. Kept as `/contact`
  on purpose: the header email/mailto buttons (mailto onClick; `/contact` is a crawler SSR fallback),
  the `sr-only` crawler links, and the **footer "Contact Us"** link (the one place the page is reachable).
- **Bilingual**: `t = (en, ar) => isRTL ? ar : en`. `DPPillar.name`/`description` are `LocalizedText {en,ar}`.
  BS sub display name = `hero.title` (EN in `subServiceContent`, AR in `subServiceContentAr[slug].hero.title`).
  Web-app subs are bilingual in `webAppPillarSubServices`.
- **Canonical guard loop**: never proxy-rewrite a guarded structured pillar's nested URL to its flat page.
- **Static + dynamic route coexistence** resolves by depth (hub folder = 2 seg, `[subservice]` = 3 seg).
- Homepage `ServicesGrid` tabs are **client-rendered** (only the active tab is in SSR; default =
  `digital-presence`). Verify non-default tabs by clicking, or trust the `getStructuredPillars` +
  `fillerSubCards` logic (type-checked).
- Co-author trailer for commits: `Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>`.

---

## 8. Verification recipes (curl — reliable even when Turbopack is stale)

```bash
base=http://localhost:3000
# Web-apps hub + nested pillar + old-URL redirects
curl -s -o /dev/null -w "%{http_code}\n" "$base/services/web-applications"                         # 200
curl -s -o /dev/null -w "%{http_code}\n" "$base/services/web-applications/full-stack-web-engineering"  # 200
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" "$base/web-applications"                   # 301 -> /services/web-applications
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" "$base/services/full-stack-web-engineering"# 308 -> nested
# App Development
curl -s -o /dev/null -w "%{http_code}\n" "$base/services/app-development/ios-app-development"        # 200
curl -s -o /dev/null -w "%{http_code} %{redirect_url}\n" "$base/services/ios-app-development"        # 301 -> nested
# Geo WhatsApp
curl -s -o /dev/null -w "%{redirect_url}\n" -H "x-vercel-ip-country: OM" "$base/api/whatsapp?locale=ar"  # wa.me/96895886393
curl -s -o /dev/null -w "%{redirect_url}\n" -H "x-vercel-ip-country: US" "$base/api/whatsapp?locale=en"  # wa.me/905011511116
# Sitemap: nested only, no flat/orphan
curl -s "$base/sitemap.xml" | grep -c "services/web-applications/"
# Orphan audit: extract literal /services links and test each for 301/308/404
```

**Full-catalog audit** (find any link that redirects or 404s): grep the codebase for literal
`/services/<slug>` strings, `curl` each, and flag non-200s. That's how the 15 orphans + the
redirect-hops were found in `eb86d14`.
