# SEO, AEO, and URL Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove confirmed redirect chains, strengthen every indexable taxonomy page, improve weak service metadata and safe trust wording, and stop global pages from preloading homepage/article-only assets without changing any canonical URL.

**Architecture:** A pure canonical redirect resolver will own legacy aliases and locale-aware final destinations while `proxy.ts` retains request/response mechanics. Pure taxonomy and service-metadata helpers will provide testable bilingual copy without coupling tests to database access. Route components consume those helpers, and source-level regression assertions protect layout preload and trust wording behavior.

**Tech Stack:** Next.js 16 App Router and Proxy, TypeScript 6, React 19, Node test runner with `tsx`, Payload CMS data adapters.

## Global Constraints

- Preserve every current canonical URL.
- Do not delete, merge, or rename public content routes.
- Do not add `noindex` to categories, tags, services, articles, projects, industries, or country pages.
- Keep English canonical URLs unprefixed and Arabic canonical URLs under `/ar`.
- Do not modify or stage the user-owned `mockup/` directory.
- Do not invent testimonials, partner status, company history, statistics, or customer outcomes.

---

### Task 1: One-hop canonical redirect resolution

**Files:**
- Create: `lib/seo/canonical-redirects.ts`
- Create: `tests/seo-url-remediation.test.ts`
- Modify: `proxy.ts`
- Modify: `next.config.mjs`

**Interfaces:**
- Produces: `resolveCanonicalRedirect(pathname: string): { locale: 'en' | 'ar'; pathname: string } | null`
- Consumes: normalized request pathname including an optional `/en` or `/ar` prefix.

- [ ] **Step 1: Write the failing redirect tests**

```ts
import assert from 'node:assert/strict'
import test from 'node:test'
import { NextRequest } from 'next/server'
import nextConfig from '../next.config.mjs'
import { proxy } from '../proxy.ts'

test('Next delegates trailing-slash normalization to the proxy', () => {
  assert.equal(nextConfig.skipTrailingSlashRedirect, true)
})

test('legacy client portal URLs redirect directly to the nested canonical pillar', () => {
  const response = proxy(new NextRequest('https://cloudtopia.net/web-applications/client-portals'))
  assert.equal(response.status, 301)
  assert.equal(response.headers.get('location'), 'https://cloudtopia.net/services/web-applications/interactive-portals-dashboards')
})

test('combined www, English prefix, trailing slash, and legacy service slug collapse in one redirect', () => {
  const response = proxy(new NextRequest('https://www.cloudtopia.net/en/website-design/'))
  assert.equal(response.status, 301)
  assert.equal(response.headers.get('location'), 'https://cloudtopia.net/services/website-development')
})

test('Arabic legacy aliases retain the Arabic canonical prefix', () => {
  const response = proxy(new NextRequest('https://www.cloudtopia.net/ar/web-applications/client-portals/'))
  assert.equal(response.status, 301)
  assert.equal(response.headers.get('location'), 'https://cloudtopia.net/ar/services/web-applications/interactive-portals-dashboards')
})
```

- [ ] **Step 2: Run the redirect tests and verify RED**

Run: `node --test --import tsx tests/seo-url-remediation.test.ts`

Expected: the config assertion fails because `skipTrailingSlashRedirect` is absent, and the client-portal assertion fails because the current proxy returns `/services/client-portals`.

- [ ] **Step 3: Implement the canonical resolver and config flag**

```ts
export type CanonicalLocale = 'en' | 'ar'

export function resolveCanonicalRedirect(pathname: string) {
  const cleanPath = pathname.length > 1 && pathname.endsWith('/') ? pathname.slice(0, -1) : pathname
  const match = cleanPath.match(/^\/(en|ar)(\/.*)?$/)
  const locale: CanonicalLocale = match?.[1] === 'ar' ? 'ar' : 'en'
  const basePath = match ? match[2] || '/' : cleanPath
  const destination = resolveLegacyBasePath(basePath)
  if (!destination) return null
  return { locale, pathname: locale === 'ar' ? `/ar${destination}` : destination }
}
```

Move the existing relocated-service, website-family, web-app, and app-development alias data into this resolver. Resolve `WEBAPP_ORPHAN_REDIRECTS` before constructing a destination so `client-portals` maps straight to `interactive-portals-dashboards`. Set `skipTrailingSlashRedirect: true` in `next.config.mjs`. In `proxy.ts`, call the resolver once after static/content-negotiation handling and redirect to its returned final path on the apex host.

- [ ] **Step 4: Run focused tests and verify GREEN**

Run: `node --test --import tsx tests/seo-url-remediation.test.ts`

Expected: all redirect tests pass.

- [ ] **Step 5: Run existing route tests**

Run: `node --test --import tsx tests/full-site-expansion.test.ts tests/country-landing-pages.test.ts tests/services-taxonomy.test.ts`

Expected: all existing route, locale, sitemap, and service-taxonomy tests pass.

### Task 2: Unique, indexable taxonomy landing-page copy

**Files:**
- Create: `lib/blog/taxonomy-seo.ts`
- Create: `tests/blog-taxonomy-seo.test.ts`
- Modify: `app/(frontend)/[locale]/articles/category/[slug]/page.tsx`
- Modify: `app/(frontend)/[locale]/articles/tag/[slug]/page.tsx`

**Interfaces:**
- Produces: `buildCategoryTaxonomyCopy(input)` and `buildTagTaxonomyCopy(input)`, each returning `{ title: string; description: string; intro: string }`.
- Consumes: locale, slug, localized taxonomy name, optional CMS description, and optional CMS SEO fields.

- [ ] **Step 1: Write failing taxonomy-copy tests**

```ts
test('e-commerce category and tag target different intents', () => {
  const category = buildCategoryTaxonomyCopy({ locale: 'en', slug: 'e-commerce', name: 'E-Commerce' })
  const tag = buildTagTaxonomyCopy({ locale: 'en', slug: 'e-commerce', name: 'E-Commerce', postCount: 2 })
  assert.notEqual(category.title, tag.title)
  assert.notEqual(category.description, tag.description)
  assert.match(category.title, /Strategy/)
  assert.match(tag.title, /Guides/)
})

test('taxonomy fallbacks are useful and bilingual', () => {
  const en = buildTagTaxonomyCopy({ locale: 'en', slug: 'shopify', name: 'Shopify', postCount: 1 })
  const ar = buildTagTaxonomyCopy({ locale: 'ar', slug: 'shopify', name: 'شوبيفاي', postCount: 1 })
  assert.ok(en.intro.length >= 120)
  assert.ok(ar.intro.length >= 100)
})
```

- [ ] **Step 2: Run taxonomy tests and verify RED**

Run: `node --test --import tsx tests/blog-taxonomy-seo.test.ts`

Expected: import fails because `lib/blog/taxonomy-seo.ts` does not exist.

- [ ] **Step 3: Implement bilingual taxonomy helpers**

Categories use editorial-topic wording and preserve authored CMS descriptions. Tags use focused resource/implementation wording and include the taxonomy name. Add explicit e-commerce copy:

```ts
const ECOMMERCE_CATEGORY = {
  title: 'E-Commerce Strategy & Growth Articles',
  description: 'E-commerce strategy articles for Gulf businesses covering store planning, payments, conversion, operations, and sustainable online growth.',
}

const ECOMMERCE_TAG = {
  title: 'E-Commerce Development Guides',
  description: 'Focused e-commerce development guides covering platforms, integrations, performance, payments, and practical implementation decisions.',
}
```

Return Arabic equivalents for Arabic routes. Generic fallbacks interpolate the localized taxonomy name and never return count-only intro text.

- [ ] **Step 4: Wire metadata, visible intros, and schema to the helpers**

Use the same helper result for `Metadata`, `CollectionPage.description`, and `SectionMasthead.description`. Remove the category route's `category.seo?.noIndex` robots branch so category pages remain indexable; do not add any replacement robots directive.

- [ ] **Step 5: Run taxonomy and blog tests**

Run: `node --test --import tsx tests/blog-taxonomy-seo.test.ts tests/blog-utils.test.ts tests/blog-intelligence.test.ts tests/blog-search.test.ts`

Expected: all tests pass.

### Task 3: Service SERP metadata and safe trust wording

**Files:**
- Create: `lib/seo/service-metadata.ts`
- Create: `tests/seo-metadata-trust.test.ts`
- Modify: `app/(frontend)/[locale]/services/[service]/page.tsx`
- Modify: `components/home/Testimonials.tsx`
- Modify: `app/(frontend)/layout.tsx`

**Interfaces:**
- Produces: `buildServiceDocumentTitle(serviceName: string, slug: string, locale: string): string`.

- [ ] **Step 1: Write failing metadata and trust tests**

Assert that the five known short English services produce descriptive titles of at least 30 characters, the English/Arabic Clutch labels say “View our Clutch profile” / “ملفنا على Clutch”, and Organization `sameAs` contains the existing Clutch and Goodfirms profile URLs.

- [ ] **Step 2: Run metadata/trust tests and verify RED**

Run: `node --test --import tsx tests/seo-metadata-trust.test.ts`

Expected: helper import fails and the source assertions find the old “Verified reviews” wording.

- [ ] **Step 3: Implement service title overrides**

```ts
const EN_TITLE_OVERRIDES: Record<string, string> = {
  'ai-automation': 'AI Automation Solutions for Business',
  'ai-chatbots': 'AI Chatbot Development for Business',
  'cloud-migration': 'Cloud Migration Services for Business',
  'database-setup': 'Database Setup Services for Business',
  'devops-support': 'DevOps Support Services for Business',
}
```

Arabic keeps the existing localized service-name pattern. All other English services keep `${serviceName} for Business`.

- [ ] **Step 4: Apply neutral trust wording and authoritative profile links**

Change the Clutch label without changing the widget or testimonials. Add `https://clutch.co/profile/cloudtopia-0` and `https://www.goodfirms.co/company/cloudtopia` to Organization `sameAs`. Do not alter the founding year, testimonials, or partner claims without owner confirmation.

- [ ] **Step 5: Run metadata/trust and service tests**

Run: `node --test --import tsx tests/seo-metadata-trust.test.ts tests/full-site-expansion.test.ts tests/services-taxonomy.test.ts`

Expected: all tests pass.

### Task 4: Scope homepage media and editorial fonts

**Files:**
- Create: `tests/frontend-preload-scope.test.ts`
- Modify: `app/(frontend)/layout.tsx`
- Modify: `app/(frontend)/[locale]/page.tsx`
- Modify: `app/(frontend)/[locale]/articles/layout.tsx`

**Interfaces:**
- Root layout provides Cairo, Hanken Grotesk, and IBM Plex Sans Arabic.
- Homepage owns the cloud-image preload.
- Articles layout provides Fraunces and Amiri CSS variables.

- [ ] **Step 1: Write failing source-scope tests**

Read the three layout/page sources and assert that the root layout no longer imports Fraunces or Amiri and does not contain the cloud preload, the homepage contains the cloud preload, and the articles layout imports/applies Fraunces and Amiri variables.

- [ ] **Step 2: Run the preload test and verify RED**

Run: `node --test --import tsx tests/frontend-preload-scope.test.ts`

Expected: assertions fail because all fonts and the cloud preload currently live in the root layout.

- [ ] **Step 3: Move route-specific resources**

Remove Fraunces/Amiri declarations and variables from the root layout. Define them in the articles layout and apply both variables to its `.blog-editorial` wrapper. Render this resource hint as the first child of the localized homepage fragment so React 19 hoists it into `<head>` only for `/` and `/ar`:

```tsx
<link
  rel="preload"
  as="image"
  href="/images/homepage/clouds.webp"
  type="image/webp"
  fetchPriority="high"
/>
```

- [ ] **Step 4: Run preload and rendering tests**

Run: `node --test --import tsx tests/frontend-preload-scope.test.ts tests/full-site-expansion.test.ts`

Expected: tests pass.

### Task 5: Full verification and audit evidence

**Files:**
- Modify: `package.json` only if the new focused tests need to be added to `test:smoke`.

- [ ] **Step 1: Add new regression tests to the smoke command**

Append the four new test files to the existing `node --test --import tsx` test group so CI exercises the remediation.

- [ ] **Step 2: Run focused regression tests**

Run: `node --test --import tsx tests/seo-url-remediation.test.ts tests/blog-taxonomy-seo.test.ts tests/seo-metadata-trust.test.ts tests/frontend-preload-scope.test.ts`

Expected: all new tests pass with zero failures.

- [ ] **Step 3: Run the complete smoke suite**

Run: `npm run test:smoke`

Expected: exit 0 and zero failed tests.

- [ ] **Step 4: Run lint and production build**

Run: `npm run lint`

Expected: exit 0 with no errors.

Run: `npm run build`

Expected: exit 0 and all routes compile.

- [ ] **Step 5: Inspect generated behavior and repository scope**

Run the redirect matrix against the built app or proxy unit surface, inspect generated metadata for category/tag/service examples, run `git diff --check`, and confirm `git status --short` lists only intended remediation files plus the untouched user-owned `mockup/` directory.
