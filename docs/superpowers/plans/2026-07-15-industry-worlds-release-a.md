# CloudTopia Industry Worlds — Release A Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the generic industry-detail experience with the typed Industry Worlds foundation and three production-ready bilingual pilots—Healthcare, Logistics & Supply Chain, and Restaurants—while preserving the other ten routes through an explicit legacy renderer.

**Architecture:** Keep the existing dynamic route as a thin server orchestrator. A lightweight client-safe manifest owns canonical identity and links; a server-only registry resolves either a reviewed world definition or the parity-preserving legacy view model. Migrated pages render through an HTML-first shell, exhaustive section renderer, CSS theme tokens, and three authored semantic hero scenes. A paired SEO resolver makes metadata, schema, sitemap, and noindex decisions from one effective URL set.

**Tech Stack:** Next.js 16 App Router, React 19 Server Components, TypeScript 6, CSS Modules, existing Lucide/Next primitives, Node test runner with `tsx`, Sharp for generated Open Graph assets, Playwright plus axe for Release A browser gates.

## Global Constraints

- This plan implements **Release A only**. It ships the system foundation and the three approved pilots. Releases B–E remain separate plans.
- Preserve all thirteen canonical slugs and both public locale routes. English remains unprefixed; Arabic remains under `/ar`.
- Preserve the current `/industries` Atlas hub. Do not import, extend, or clean up its stylesheet in this release.
- Preserve the user's dirty worktree. Before every overlapping edit, inspect the existing diff; patch only the needed hunk. Stage new files normally and use `git add -p` for already-modified files. Inspect `git diff --cached` before every commit.
- The locale layout owns the sole `<main>`. Both world and legacy renderers use a `<div>` root and produce exactly one H1.
- Server Components are the default. Do not add page-owned client JavaScript unless a real stateful interaction is approved; the Release A design does not require one.
- Add no runtime dependency, font, WebGL/canvas scene, autoplay media, or continuous animation. CSS motion is transform/opacity only, runs once, and is removed by `prefers-reduced-motion`.
- Do not use `HeroOrbitDeck`, the Atlas scene, generic stock art, dynamic Tailwind color strings, or raster hero photos in migrated worlds. `HeroOrbitDeck` remains only inside the ten-world legacy renderer.
- Do not invent clients, results, timings, savings, certifications, security guarantees, compliance guarantees, “real-time” behavior, or ownership terms. Release A uses annotated operating models and explicit constraints rather than unapproved proof.
- Arabic copy is authored independently in Modern Standard Arabic. Arabic UI has zero tracking, no uppercase/italics, display leading `1.3–1.4`, and body leading `1.8–1.95`. Mixed-direction tokens use `<bdi dir="ltr">` when rendered as a separate node or Unicode FSI/PDI isolation when stored inside a content string.
- The hero, the post-system service bridge, and the final close repeat one consistent primary destination—`/api/whatsapp?locale=${locale}`—with localized industry-specific intent. A secondary CTA resolves a typed most-relevant service target; Release A has no unverified proof CTA.
- A pilot cannot enter the migrated registry until its exact content hash has a named native-Arabic reviewer. Healthcare additionally requires a named sector/claims reviewer. The executor must pause at Task 11 if those approvals are not available.
- Metadata precedence is `SeoOverrides > published Pages SEO > world/legacy default`. A canonical override is adopted only as a valid English/Arabic pair, and the effective pair drives canonical, Open Graph URL, hreflang, schema, robots, and sitemap atomically.
- Existing tests that require old implementation details are replaced only in the same commit that adds equivalent behavioral coverage.
- Every task follows red → green → refactor, gets an independent code review, and is committed before the next task. Critical and important review findings are fixed before continuing.

---

## Required Execution Skills

- `superpowers:test-driven-development` for Tasks 1–13.
- `frontend-design` for Tasks 6–10 and the visual fixes in Task 14.
- `copywriting` for the three bilingual definition drafts and their review packets in Tasks 8–11; use the approved spec and repository company/service facts, never generic marketing filler.
- `build-web-apps:react-best-practices` for every TSX implementation and bundle review.
- `superpowers:requesting-code-review` after every task and at the final gate.
- The browser/audit/debug/verification skills listed explicitly in Task 14.

---

## Release Boundary

Release A migrates:

- `healthcare` → Clinical Pulse / نبض الرعاية
- `logistics-supply-chain` → Flow Control / ضبط التدفق
- `restaurants` → Service Rhythm / إيقاع الخدمة

Release A retains explicit legacy rendering for:

- `fintech`
- `ecommerce-retail`
- `real-estate`
- `education`
- `travel-hospitality`
- `legal-firms`
- `construction`
- `retail`
- `professional-services`
- `government-public-sector`

Release A adopts the manifest in the detail route, Header, Footer, and industry sitemap bridge. Full Atlas/homepage/country/Solution Finder/admin/LLM/MCP/chatbot adoption and removal of the legacy renderer remain Release E.

---

## File Structure and Ownership

### Create

```text
lib/industries/
├── slugs.ts                         # canonical tuple and type guard
├── service-targets.ts               # client-safe canonical service IDs and paths
├── proof-targets.ts                 # client-safe existing project IDs only
├── types.ts                         # page, section, theme, claim, and review contracts
├── manifest.ts                      # 13 lightweight entries; no full prose
├── text.ts                          # mixed-direction token isolation
├── content-hash.ts                  # deterministic locale-content hash
├── validate-industry-pages.ts       # draft and publication invariants
├── legacy-adapter.ts                # pure old-data → legacy view model
├── get-industry-page.ts             # server-only staged resolver
├── resolve-industry-seo.ts          # paired precedence and metadata builder
├── build-industry-schema.ts         # one connected JSON-LD graph
├── sitemap.ts                       # effective industry sitemap entries
├── reviews/
│   └── release-a.ts                 # created only after real review approval
└── definitions/
    ├── registry.ts                  # 3 world definitions + 10 nulls
    ├── healthcare.ts
    ├── logistics-supply-chain.ts
    └── restaurants.ts

components/industry/detail/
├── LegacyIndustryPage.tsx           # bounded parity fallback
├── IndustryPageShell.tsx            # div root, breadcrumbs, rail, schema plumbing
├── IndustryHero.tsx                 # shared hero semantics and CTA hierarchy
├── IndustrySectionRenderer.tsx      # exhaustive server switch
├── IndustryRelatedLinks.tsx         # typed service/industry anchors
├── industry-detail.module.css       # shell and section art direction
├── sections/
│   ├── PressureFieldSection.tsx
│   ├── JourneyMapSection.tsx
│   ├── SystemBlueprintSection.tsx
│   ├── UseCaseSequenceSection.tsx
│   ├── ServiceBridgeSection.tsx
│   ├── EvidenceSection.tsx
│   ├── ConstraintsSection.tsx
│   ├── RegionalFitSection.tsx
│   ├── FaqSection.tsx
│   └── ClosingCtaSection.tsx
└── scenes/
    ├── HeroSceneRenderer.tsx
    ├── HealthcarePulseScene.tsx
    ├── LogisticsFlowScene.tsx
    ├── RestaurantPassScene.tsx
    └── industry-scenes.module.css

scripts/
└── generate-industry-og-assets.ts

playwright.config.ts                 # production-server browser matrix

tests/
├── helpers/register-css-modules.mjs
├── industry-worlds-foundation.test.ts
├── industry-worlds-validation.test.ts
├── industry-worlds-legacy.test.tsx
├── industry-worlds-metadata.test.ts
├── industry-worlds-schema.test.ts
├── industry-worlds-render.test.tsx
├── industry-worlds-pilots.test.ts
├── industry-worlds-assets.test.ts
├── industry-worlds-sitemap.test.ts
├── industry-worlds.browser.spec.ts
└── fixtures/industry-worlds/legacy-parity.json
```

### Modify surgically

- `app/(frontend)/[locale]/industries/[industry]/page.tsx`
- `lib/seo/industries.ts`
- `lib/og/og-image.ts`
- `lib/sitemap-data.ts`
- `components/Header.tsx`
- `components/Footer.tsx`
- `components/home/industryData.ts`
- `app/api/markdown/route.ts`
- `tests/seo-expansion.test.ts`
- `tests/full-site-expansion.test.ts`
- `tests/home-industries-section.test.ts`
- `package.json`
- `package-lock.json`

### Generated assets

```text
public/og/industries/default/en.jpg
public/og/industries/default/ar.jpg
public/og/industries/healthcare/en.jpg
public/og/industries/healthcare/ar.jpg
public/og/industries/logistics-supply-chain/en.jpg
public/og/industries/logistics-supply-chain/ar.jpg
public/og/industries/restaurants/en.jpg
public/og/industries/restaurants/ar.jpg
```

---

### Task 1: Lock Canonical Slugs, Service Targets, and the Lightweight Manifest

**Files:**

- Create: `lib/industries/slugs.ts`
- Create: `lib/industries/service-targets.ts`
- Create: `lib/industries/proof-targets.ts`
- Create: `lib/industries/manifest.ts`
- Create: `tests/industry-worlds-foundation.test.ts`
- Modify: `lib/seo/industries.ts`

**Interfaces:**

- Consumes: `Locale` from `lib/i18n/config.ts` and the current public service routes.
- Produces: `INDUSTRY_SLUGS`, `IndustrySlug`, `isIndustrySlug`, `industryManifest`, `getIndustryManifestEntry`, `CANONICAL_SERVICE_TARGETS`, `CanonicalServiceId`, `PROJECT_IDS`, and `ProjectId`.
- Compatibility: preserves `LocaleKey`, `LocalizedText`, `IndustryData`, `industries`, `industrySlugs`, `getIndustry`, and `localizedValue` from `lib/seo/industries.ts`.

- [ ] **Step 1: Write the failing foundation contract**

```ts
import assert from 'node:assert/strict'
import fs from 'node:fs'
import test from 'node:test'
import { INDUSTRY_SLUGS, isIndustrySlug } from '../lib/industries/slugs.ts'
import { industryManifest } from '../lib/industries/manifest.ts'

test('industry taxonomy is closed and lightweight', () => {
  assert.deepEqual(INDUSTRY_SLUGS, [
    'healthcare', 'fintech', 'ecommerce-retail', 'real-estate', 'education',
    'travel-hospitality', 'restaurants', 'legal-firms', 'construction', 'retail',
    'professional-services', 'logistics-supply-chain', 'government-public-sector',
  ])
  assert.equal(Object.keys(industryManifest).length, 13)
  assert.equal(isIndustrySlug('healthcare'), true)
  assert.equal(isIndustrySlug('unknown-sector'), false)
  for (const slug of INDUSTRY_SLUGS) {
    const item = industryManifest[slug]
    assert.equal(item.slug, slug)
    assert.equal(item.route, `/industries/${slug}`)
    assert.ok(item.label.en && item.label.ar)
    assert.ok(item.navSummary.en && item.navSummary.ar)
    assert.ok(item.serviceIds.length >= 2 && item.serviceIds.length <= 4)
    assert.ok(item.relatedIndustryIds.length >= 2)
    assert.ok(!item.relatedIndustryIds.includes(slug))
  }
})

test('the manifest remains client-safe and prose-free', () => {
  const source = fs.readFileSync('lib/industries/manifest.ts', 'utf8')
  assert.doesNotMatch(source, /server-only/)
  assert.doesNotMatch(source, /definitions\//)
  assert.doesNotMatch(source, /sections\s*:/)
})
```

- [ ] **Step 2: Run the test and verify the new modules are missing**

Run: `node --test --import tsx tests/industry-worlds-foundation.test.ts`
Expected: FAIL with module-not-found for `lib/industries/slugs.ts`.

- [ ] **Step 3: Implement the dependency-free IDs and manifest**

Use this exact public contract:

```ts
export const INDUSTRY_SLUGS = [
  'healthcare', 'fintech', 'ecommerce-retail', 'real-estate', 'education',
  'travel-hospitality', 'restaurants', 'legal-firms', 'construction', 'retail',
  'professional-services', 'logistics-supply-chain', 'government-public-sector',
] as const

export type IndustrySlug = (typeof INDUSTRY_SLUGS)[number]

export function isIndustrySlug(value: unknown): value is IndustrySlug {
  return typeof value === 'string' &&
    (INDUSTRY_SLUGS as readonly string[]).includes(value)
}
```

`CANONICAL_SERVICE_TARGETS` contains exactly these client-safe IDs and routes:

```ts
{
  'digital-presence': '/services/digital-presence',
  'website-development': '/services/website-development',
  'ecommerce-development': '/services/ecommerce-development',
  'web-applications': '/services/web-applications',
  'business-systems-development': '/services/business-systems-development',
  'app-development': '/services/app-development',
  'social-media-marketing': '/services/social-media-marketing',
  'content-creation': '/services/content-creation',
  'restaurant-qr-menu': '/restaurant-qr-menu',
} as const
```

`PROJECT_IDS` contains only these repository-backed candidates and does not imply approval to display any of them:

```ts
export const PROJECT_IDS = [
  'kvaii-logistics',
  'ram-sustainable',
  'artucky-ecommerce',
  'comics-topia',
  'joory-cafe',
  'luxury-world-tourism',
  'dhofar-tourism',
] as const

export type ProjectId = (typeof PROJECT_IDS)[number]
```

The manifest uses this exact shape and explicit records for all thirteen entries:

```ts
export type IndustryManifestEntry = {
  slug: IndustrySlug
  route: `/industries/${IndustrySlug}`
  category: 'regulated-trust' | 'commerce-place' | 'b2b-operating'
  label: Record<Locale, string>
  navSummary: Record<Locale, string>
  serviceIds: readonly CanonicalServiceId[]
  relatedIndustryIds: readonly [IndustrySlug, IndustrySlug, ...IndustrySlug[]]
  discovery: {
    hub: boolean
    header: boolean
    footer: boolean
    sitemap: boolean
  }
}
```

Declare `industryManifest` as an explicit thirteen-key object ending with `as const satisfies Record<IndustrySlug, IndustryManifestEntry>`; the exact slug order, pilot mappings, labels, summaries, categories, and related-industry requirements are fixed by this task and the approved specification.

Use this exact connectivity map:

| Slug | Category | Service IDs | Related industries |
|---|---|---|---|
| `healthcare` | `regulated-trust` | `website-development`, `web-applications`, `business-systems-development`, `content-creation` | `education`, `government-public-sector` |
| `fintech` | `regulated-trust` | `website-development`, `web-applications`, `business-systems-development`, `content-creation` | `professional-services`, `government-public-sector` |
| `ecommerce-retail` | `commerce-place` | `ecommerce-development`, `business-systems-development`, `website-development`, `social-media-marketing` | `retail`, `logistics-supply-chain` |
| `real-estate` | `commerce-place` | `website-development`, `web-applications`, `business-systems-development`, `content-creation` | `construction`, `professional-services` |
| `education` | `regulated-trust` | `web-applications`, `website-development`, `business-systems-development`, `content-creation` | `healthcare`, `government-public-sector` |
| `travel-hospitality` | `commerce-place` | `website-development`, `ecommerce-development`, `web-applications`, `content-creation` | `restaurants`, `real-estate` |
| `restaurants` | `commerce-place` | `restaurant-qr-menu`, `website-development`, `ecommerce-development`, `social-media-marketing` | `retail`, `travel-hospitality` |
| `legal-firms` | `regulated-trust` | `website-development`, `web-applications`, `business-systems-development`, `content-creation` | `professional-services`, `government-public-sector` |
| `construction` | `b2b-operating` | `business-systems-development`, `web-applications`, `website-development`, `content-creation` | `real-estate`, `logistics-supply-chain` |
| `retail` | `commerce-place` | `ecommerce-development`, `business-systems-development`, `web-applications`, `social-media-marketing` | `ecommerce-retail`, `restaurants` |
| `professional-services` | `b2b-operating` | `website-development`, `business-systems-development`, `web-applications`, `content-creation` | `legal-firms`, `construction` |
| `logistics-supply-chain` | `b2b-operating` | `business-systems-development`, `web-applications`, `website-development`, `ecommerce-development` | `ecommerce-retail`, `retail` |
| `government-public-sector` | `regulated-trust` | `web-applications`, `business-systems-development`, `website-development`, `content-creation` | `healthcare`, `education` |

Set `discovery.hub`, `discovery.header`, and `discovery.sitemap` to `true` for all thirteen entries. Preserve the current compact Footer selection by setting `discovery.footer` to `true` only for Healthcare, FinTech, E-commerce & Online Retail, Real Estate, Education, and Travel & Hospitality; all other Footer flags are `false` until the program-wide discovery review.

Use these complete lightweight labels and summaries; do not copy definition prose into the manifest:

| Slug | EN label / summary | AR label / summary |
|---|---|---|
| `healthcare` | Healthcare — Patient journeys, booking, portals, and clinic workflows. | الرعاية الصحية — رحلات المرضى والحجز والبوابات وسير عمل العيادات. |
| `fintech` | FinTech — Onboarding, transaction journeys, trust, and exception workflows. | التقنية المالية — التسجيل والمعاملات ومسارات الثقة والاستثناءات. |
| `ecommerce-retail` | E-commerce & Online Retail — Catalog, checkout, fulfillment, and retention. | التجارة الإلكترونية — الكتالوج والدفع والتنفيذ والاحتفاظ بالعملاء. |
| `real-estate` | Real Estate — Property discovery, qualification, viewing, and agent handoff. | العقارات — اكتشاف العقار والتأهيل والمعاينة وتسليم الفرص للوسطاء. |
| `education` | Education — Enrollment, learning, assessment, and role-based portals. | التعليم — التسجيل والتعلّم والتقييم والبوابات متعددة الأدوار. |
| `travel-hospitality` | Travel & Hospitality — Discovery, booking, stay, and guest communication. | السفر والضيافة — الاكتشاف والحجز والإقامة والتواصل مع الضيوف. |
| `restaurants` | Restaurants — Menus, orders, kitchen handoffs, branches, and loyalty. | المطاعم — القوائم والطلبات وتسليمات المطبخ والفروع والولاء. |
| `legal-firms` | Legal Firms — Practice discovery, confidential intake, matters, and documents. | مكاتب المحاماة — اكتشاف الخبرات والاستقبال السري والقضايا والمستندات. |
| `construction` | Construction — Tenders, RFIs, approvals, suppliers, and milestones. | الإنشاءات — المناقصات وطلبات المعلومات والاعتمادات والموردون والمراحل. |
| `retail` | Retail — Branches, stock, POS, loyalty, and omnichannel service. | التجزئة — الفروع والمخزون ونقاط البيع والولاء والخدمة متعددة القنوات. |
| `professional-services` | Professional Services — Expertise, proposals, delivery, and client reporting. | الخدمات المهنية — الخبرات والعروض والتنفيذ وتقارير العملاء. |
| `logistics-supply-chain` | Logistics & Supply Chain — Orders, warehouse, dispatch, exceptions, and proof. | الخدمات اللوجستية — الطلبات والمستودع والتوزيع والاستثناءات والإثبات. |
| `government-public-sector` | Government & Public Sector — Eligibility, applications, cases, and service status. | الحكومة والقطاع العام — الأهلية والطلبات والمعاملات وحالة الخدمة. |

- [ ] **Step 4: Preserve the legacy-data compatibility surface**

In `lib/seo/industries.ts`, import and re-export the canonical tuple, remove the broad `Record<string, IndustryData>` annotation, and type the existing complete object as `satisfies Record<IndustrySlug, IndustryData>` without changing its record bodies or importing any world definition:

```ts
import { INDUSTRY_SLUGS, type IndustrySlug } from '@/lib/industries/slugs'

export const industrySlugs: readonly IndustrySlug[] = INDUSTRY_SLUGS
```

- [ ] **Step 5: Run focused and compatibility verification**

Run:

```bash
node --test --import tsx tests/industry-worlds-foundation.test.ts tests/seo-expansion.test.ts tests/industries-page-redesign.test.ts
npx tsc --noEmit --incremental false
```

Expected: PASS.

- [ ] **Step 6: Commit only Task 1 hunks**

```bash
git add lib/industries/slugs.ts lib/industries/service-targets.ts lib/industries/proof-targets.ts lib/industries/manifest.ts tests/industry-worlds-foundation.test.ts
git add -p lib/seo/industries.ts
git diff --cached --check
git commit -m "feat(industries): establish canonical world manifest"
```

---

### Task 2: Define the World Contract, Hashing, and Validation Rules

**Files:**

- Create: `lib/industries/types.ts`
- Create: `lib/industries/text.ts`
- Create: `lib/industries/content-hash.ts`
- Create: `lib/industries/validate-industry-pages.ts`
- Create: `tests/industry-worlds-validation.test.ts`

**Interfaces:**

- Consumes: `IndustrySlug`, `CanonicalServiceId`, `ProjectId`, and `Locale`.
- Produces: the discriminated `IndustrySection` union, `IndustryPageDefinition`, `IndustryReviewRecord`, `IndustryManifestReviewRecord`, `IndustryClaimSource`, `isolateLtrToken`, `rhythmFingerprint`, `contentHash`, `manifestContentHash`, `validateIndustryPageDefinition`, and `assertValidIndustryPageRegistry`.

- [ ] **Step 1: Write failing positive and negative validator tests**

Cover these exact failure codes:

```ts
const expectedCodes = [
  'missing-locale', 'localized-copy-missing', 'parity-drift',
  'duplicate-localized-copy', 'content-too-thin', 'prohibited-copy',
  'duplicate-section-id',
  'unisolated-ltr-token',
  'semantic-question-missing', 'semantic-question-duplicate',
  'invalid-variant', 'release-a-signature-forbidden', 'signature-composition-invalid',
  'invalid-service-id', 'invalid-project-id', 'invalid-related-industry', 'self-related-industry',
  'cta-drift',
  'missing-theme-token', 'contrast-failure', 'faq-count', 'service-count',
  'missing-native-review', 'missing-sensitive-review', 'missing-manifest-review',
  'review-hash-mismatch',
  'claim-source-missing', 'claim-unapproved', 'claim-expired',
] as const
```

Also assert that the three approved pilot fingerprints below are distinct and contain no `signature:*` recipe entry.

- [ ] **Step 2: Run the validator test and confirm failure**

Run: `node --test --conditions=react-server --import tsx tests/industry-worlds-validation.test.ts`
Expected: FAIL because the contracts and validator do not exist.

- [ ] **Step 3: Implement the exact semantic and visual contract**

The public contract must include these discriminants:

```ts
export type IndustrySemanticQuestion =
  | 'sector-promise'
  | 'operating-pressure'
  | 'journey'
  | 'buildable-system'
  | 'evidence-and-constraints'
  | 'regional-delivery'
  | 'decision-close'

export type IndustrySectionType =
  | 'pressure-field' | 'journey-map' | 'system-blueprint'
  | 'use-case-sequence' | 'service-bridge' | 'evidence'
  | 'constraints' | 'regional-fit' | 'faq' | 'closing-cta' | 'signature'

export const SECTION_VARIANTS = {
  'pressure-field': ['split-signal', 'constraints-first', 'dense-ledger'],
  'journey-map': ['linear-route', 'dual-lane', 'exception-lane'],
  'system-blueprint': ['stacked-layers', 'constellation', 'service-line'],
  'use-case-sequence': ['numbered-flow', 'operating-matrix', 'timed-pass'],
  'service-bridge': ['route-links', 'capability-stack'],
  evidence: ['verified-project', 'annotated-model'],
  constraints: ['boundary-map', 'owner-register'],
  'regional-fit': ['bilingual-operations', 'market-path'],
  faq: ['editorial-list', 'grouped-questions'],
  'closing-cta': ['framed-close', 'split-close'],
} as const
```

Every localized section extends:

```ts
type SectionBase<TType extends IndustrySectionType, TVariant extends string> = {
  id: string
  type: TType
  variant: TVariant
  answers: readonly Exclude<IndustrySemanticQuestion, 'sector-promise'>[]
  eyebrow?: string
  title: string
  intro: string
}
```

The hero owns `sector-promise` exactly once by contract; section `answers` deliberately excludes it. The validator counts the hero plus section answers and requires the seven-question set with no omission or duplicate.

Define content-bearing fields rather than generic blobs:

- pressure: `signals[{id,label,description}]`
- journey: `stages[{id,label,description,actor?}]`, optional `lanes[{id,label,stageIds}]`
- system: `layers[{id,label,description,inputs,handoff,outcome}]`
- use cases: `steps[{id,label,description,owner?}]`
- service bridge: `serviceIds`, localized `serviceAnchors`, `relatedIndustryIds`, localized `industryAnchors`; it reuses the hero's primary CTA rather than duplicating its destination/intent
- evidence: verified `projectId: ProjectId` plus approval/provenance, or annotated `observations`
- constraints: `items[{id,label,responsibility,dependency,recovery?}]`
- regional: `items[{id,label,description}]`
- FAQ: `items[{id,question,answer}]`
- close: `primary`, `secondary`, and concise decision copy

Use these exact supporting contracts:

```ts
export type IndustrySceneId =
  | 'healthcare-pulse'
  | 'logistics-flow'
  | 'restaurant-pass'

export type IndustryAsset =
  | { kind: 'authored-scene'; id: IndustrySceneId }
  | {
      kind: 'og-image'
      locale: Locale
      publicPath: `/og/industries/${string}/${Locale}.jpg`
      width: 1200
      height: 630
    }

export type LocalizedHero = {
  worldLabel: string
  eyebrow: string
  h1: string
  intro: string
  primaryCta: { label: string; href: `/api/whatsapp?locale=${Locale}` }
  secondaryCta: { label: string; serviceId: CanonicalServiceId }
  sceneSummary: string
  sceneStages: readonly { id: string; label: string; state?: string }[]
}

export type LocalizedIndustryPage = {
  seo: { title: string; description: string }
  breadcrumbLabel: string
  hero: LocalizedHero
  sections: readonly IndustrySection[]
}
```

The top-level definition is:

```ts
export type IndustryPageDefinition = {
  slug: IndustrySlug
  contentVersion: string
  updatedAt?: `${number}-${number}-${number}`
  world: {
    id: string
    theme: IndustryTheme
    heroScene: IndustrySceneId
    heroTreatment: 'corridor-split' | 'route-field' | 'editorial-pass'
    signatureComposition: {
      id: string
      name: Record<Locale, string>
      sectionIds: readonly string[]
    }
  }
  assets: readonly IndustryAsset[]
  claims: readonly IndustryClaimSource[]
  locales: Record<Locale, LocalizedIndustryPage>
}
```

`IndustryTheme` contains all fourteen approved tokens: `canvas`, `surface`, `elevatedSurface`, `ink`, `mutedInk`, `accent`, `accentInk`, `signal`, `line`, `focus`, `displayTreatment`, `radiusMode`, `motifDensity`, and `sceneTreatment`. Release A's categorical values are typed exactly as:

```ts
type ReleaseADisplayTreatment = 'clinical' | 'technical' | 'editorial'
type ReleaseARadiusMode = 'soft' | 'square' | 'cut'
type ReleaseAMotifDensity = 'quiet' | 'dense' | 'medium'
type ReleaseASceneTreatment = 'pulse-corridor' | 'route-field' | 'service-pass'
```

The deterministic fingerprint is exactly:

```ts
export function rhythmFingerprint(definition: IndustryPageDefinition): string {
  return [
    definition.world.heroTreatment,
    ...definition.locales.en.sections.map(
      (section) => `${section.type}:${section.variant}`,
    ),
    definition.world.signatureComposition.id,
  ].join('|')
}
```

- [ ] **Step 4: Implement deterministic publication records**

```ts
export type IndustryReviewRecord = {
  slug: IndustrySlug
  locale: Locale
  kind: 'editorial' | 'native-arabic' | 'sensitive-domain'
  reviewer: string
  reviewedAt: `${number}-${number}-${number}`
  contentHash: `sha256:${string}`
}

export type IndustryManifestReviewRecord = {
  locale: Locale
  kind: 'manifest-editorial' | 'manifest-native-arabic'
  reviewer: string
  reviewedAt: `${number}-${number}-${number}`
  contentHash: `sha256:${string}`
}

export type IndustryClaimSource = {
  id: string
  locale: Locale | 'both'
  wording: string
  scope: string
  source: string
  owner: string
  approval: 'approved' | 'rejected' | 'pending'
  reviewedAt: `${number}-${number}-${number}`
  recheckAt: `${number}-${number}-${number}`
}

export type IndustryValidationOptions = {
  mode: 'draft' | 'publication'
  reviews?: readonly IndustryReviewRecord[]
  manifestReviews?: readonly IndustryManifestReviewRecord[]
  now?: Date
  assetExists?: (publicPath: string) => boolean
  allowCustomSignature?: boolean
}

const LTR_ISOLATE = '\u2068'
const POP_DIRECTIONAL_ISOLATE = '\u2069'

export function isolateLtrToken(token: string): string {
  return `${LTR_ISOLATE}${token}${POP_DIRECTIONAL_ISOLATE}`
}

export type ReviewableIndustryContent = {
  manifest: { label: string; navSummary: string }
  page: LocalizedIndustryPage
}

export function contentHash(content: ReviewableIndustryContent): `sha256:${string}` {
  return `sha256:${createHash('sha256').update(JSON.stringify(content)).digest('hex')}`
}

export function manifestContentHash(
  locale: Locale,
  manifest: typeof industryManifest,
): `sha256:${string}`
```

Draft validation checks structure without review records. It requires answer-first hero introductions, three to six concrete blueprint/use-case entries, four to seven FAQs, two to four services, complete nonempty localized fields, stable EN/AR semantic IDs, and—in each locale across definitions—unique SEO titles, descriptions, H1s, FAQ questions, CTA labels, content hashes, and rhythm fingerprints. It enforces the same primary CTA destination/intent in hero, post-system bridge, and final close. It rejects unfinished-copy markers and the generic English fillers “innovative,” “seamless,” “cutting-edge,” and unqualified “digital transformation.” It requires every named signature composition to reference existing recipe IDs and rejects bare Arabic-string occurrences of `CRM`, `ERP`, `API`, `POS`, `TMS`, `WMS`, `SLA`, or `QR`; definitions build those tokens with `isolateLtrToken`. An `authored-scene` asset validates against the registered scene ID and does not require a public raster file; an `og-image` validates path, dimensions, and existence. Publication validation additionally requires the exact hash for the localized manifest label/summary plus page object, Arabic native review for every pilot, sensitive-domain review for both Healthcare locales, and one matching review for each complete EN/AR manifest-copy hash before navigation consumers switch. Only claims whose visible wording and scope exactly match an approved, unexpired source record may render. Contrast validation checks `ink/canvas`, `ink/surface`, `mutedInk/canvas`, `accentInk/accent`, and `focus` against every adjacent declared surface; signal colors are never presumed safe for normal text.

- [ ] **Step 5: Run the full validator matrix**

Run:

```bash
node --test --conditions=react-server --import tsx tests/industry-worlds-validation.test.ts
npx tsc --noEmit --incremental false
```

Expected: PASS.

- [ ] **Step 6: Commit the contract**

```bash
git add lib/industries/types.ts lib/industries/text.ts lib/industries/content-hash.ts lib/industries/validate-industry-pages.ts tests/industry-worlds-validation.test.ts
git diff --cached --check
git commit -m "feat(industries): define world content contracts"
```

---

### Task 3: Extract and Repair the Explicit Legacy Renderer

**Files:**

- Create: `lib/industries/legacy-adapter.ts`
- Create: `components/industry/detail/LegacyIndustryPage.tsx`
- Create: `tests/industry-worlds-legacy.test.tsx`
- Create: `tests/fixtures/industry-worlds/legacy-parity.json`

**Interfaces:**

- Consumes: existing `IndustryData`, visual mapping, countries, localized URL helpers, and `HeroOrbitDeck`.
- Produces: `LegacyIndustryViewModel`, `adaptLegacyIndustry(locale, industry)`, and `<LegacyIndustryPage locale viewModel />`.

- [ ] **Step 1: Capture a failing parity projection before moving JSX**

The fixture stores, for ten fallback slugs × two locales: name, hero title, description, ordered problems, use cases, differentiators, FAQ pairs, service labels/hrefs, market hrefs, and CTA destinations. The focused test must also assert:

```ts
assert.equal((html.match(/<main\b/g) || []).length, 0)
assert.equal((html.match(/<h1\b/g) || []).length, 1)
for (const service of viewModel.services) {
  assert.match(html, new RegExp(`href="${escapeRegExp(service.href)}"`))
}
```

- [ ] **Step 2: Run the test and verify extraction is missing**

Run: `node --test --import tsx tests/industry-worlds-legacy.test.tsx`
Expected: FAIL because the adapter and renderer do not exist.

- [ ] **Step 3: Move the current generic presentation without redesigning it**

Move the current route helpers and body into the two new files. Preserve `HeroOrbitDeck`, current order, old copy, FAQ items, six market links, visuals, and CTA destinations for fallback worlds. Make only these approved repairs:

1. root `<main>` → `<div>`;
2. exposed Home/Industries/Service/schema labels become locale-aware;
3. every configured service becomes a crawlable localized `<Link>`;
4. the component receives already-resolved schema separately and does not own metadata.

Do not “improve” legacy palettes, images, motion, prose, or layout.

- [ ] **Step 4: Verify all twenty fallback renders**

Run:

```bash
node --test --import tsx tests/industry-worlds-legacy.test.tsx
npx tsc --noEmit --incremental false
```

Expected: PASS with fixture equality and only the three permitted deltas.

- [ ] **Step 5: Commit the extraction**

```bash
git add lib/industries/legacy-adapter.ts components/industry/detail/LegacyIndustryPage.tsx tests/industry-worlds-legacy.test.tsx tests/fixtures/industry-worlds/legacy-parity.json
git diff --cached --check
git commit -m "refactor(industries): extract legacy detail renderer"
```

---

### Task 4: Add the Staged Registry and Server Resolver

**Files:**

- Create: `lib/industries/definitions/registry.ts`
- Create: `lib/industries/get-industry-page.ts`
- Modify: `tests/industry-worlds-foundation.test.ts`

**Interfaces:**

- Consumes: canonical slug, world registry, legacy adapter, and old industry records.
- Produces: `IndustryPageRegistry`, `IndustryPageResolution`, and `getIndustryPage(slug)`.

- [ ] **Step 1: Add the failing staged-resolution contract**

Before pilot review, all entries are deliberately `null`; the test asserts every known slug resolves to legacy and an unknown value is rejected before resolution. Task 11 will change the expected count atomically to three worlds and ten legacy pages.

- [ ] **Step 2: Run and confirm the resolver is missing**

Run: `node --test --conditions=react-server --import tsx tests/industry-worlds-foundation.test.ts`
Expected: FAIL.

- [ ] **Step 3: Implement the exact registry boundary**

```ts
export type IndustryPageRegistry = Readonly<
  Record<IndustrySlug, IndustryPageDefinition | null>
>

export type IndustryPageResolution =
  | { kind: 'world'; slug: IndustrySlug; definition: IndustryPageDefinition }
  | { kind: 'legacy'; slug: IndustrySlug; legacy: LegacyIndustryViewModel }

export function getIndustryPage(
  slug: IndustrySlug,
  locale: Locale,
): IndustryPageResolution
```

The initial registry explicitly lists all thirteen keys as `null`. Add `import 'server-only'` to the registry and resolver, never to the client-safe manifest.

- [ ] **Step 4: Run resolver and type tests**

Run: `node --test --conditions=react-server --import tsx tests/industry-worlds-foundation.test.ts && npx tsc --noEmit --incremental false`
Expected: PASS.

- [ ] **Step 5: Commit the staged resolver**

```bash
git add lib/industries/definitions/registry.ts lib/industries/get-industry-page.ts tests/industry-worlds-foundation.test.ts
git diff --cached --check
git commit -m "feat(industries): add staged world resolver"
```

---

### Task 5: Centralize SEO Precedence, Canonical Pairing, and Schema

**Files:**

- Create: `lib/industries/resolve-industry-seo.ts`
- Create: `lib/industries/build-industry-schema.ts`
- Create: `tests/industry-worlds-metadata.test.ts`
- Create: `tests/industry-worlds-schema.test.ts`

**Interfaces:**

- Consumes: `getCMSPage`, `getSeoOverride`, definition/legacy fallback SEO, `canonicalUrl`, `buildHreflangMap`, `stripBrandSuffix`, `ogImagesFor`, and the canonical Organization ID.
- Produces: pure `mergeIndustrySeoPair`, cached `resolveIndustrySeoPair`, `buildIndustryMetadata`, and `buildIndustryJsonLd`.

- [ ] **Step 1: Write the failing precedence and URL-atomicity matrix**

Use pure fixtures for these cases:

1. definition/legacy defaults only;
2. Pages title/description/noindex override;
3. route SEO title/description/robots override;
4. title ending in `| CloudTopia` or `| كلاود توبيا` is normalized;
5. complete EN/AR canonical override updates canonical, OG URL, hreflang, x-default, and schema IDs;
6. one-locale canonical override is rejected and the base pair remains active;
7. a CMS fetch failure falls back to code-owned values;
8. `noIndex` controls both metadata robots and sitemap eligibility;
9. Open Graph and Twitter title/description/image values match the effective locale copy;
10. no metadata builder emits `/en/` canonicals or a `keywords` field.

- [ ] **Step 2: Run focused tests and confirm the resolver is absent**

Run:

```bash
node --test --conditions=react-server --import tsx tests/industry-worlds-metadata.test.ts tests/industry-worlds-schema.test.ts
```

Expected: FAIL.

- [ ] **Step 3: Implement one effective SEO pair**

```ts
export type EffectiveIndustrySeo = {
  locale: Locale
  title: string
  description: string
  canonical: string
  languages: Record<'en' | 'ar' | 'x-default', string>
  index: boolean
  follow: boolean
  ogImages: ReturnType<typeof ogImagesFor>
}

export type ResolvedIndustrySeoPair = Record<Locale, EffectiveIndustrySeo>

export function mergeIndustrySeoPair(
  input: IndustrySeoPairInput,
): ResolvedIndustrySeoPair
```

Load both localized Pages rows and both route overrides together. Resolve text/robots per locale. Resolve canonical URLs as a pair at the highest precedence where **both** locales contain valid absolute HTTPS URLs; otherwise use the canonical base pair. Do not call the existing single-locale `applySeoOverride()` afterward.

Normalize source fields explicitly:

| Source | Accepted fields |
|---|---|
| Definition/legacy | `title`, `description`, page-owned OG image, default `index/follow` |
| Published Pages SEO JSON | `title`, `description`, `canonicalUrl` or `canonical`, `noindex` or `noIndex`, `nofollow` or `noFollow`, `ogImage` |
| SeoOverrides | `metaTitle`, `metaDescription`, `canonicalUrl`, `noIndex`, `noFollow` |

Reject empty values, non-HTTPS canonical values, a canonical on only one locale, and canonical pairs outside the site's allowed `https://cloudtopia.net` origin. Valid paired overrides may change the localized path, but English remains the `x-default`. Apply route title/description/robots fields even when that route's invalid or incomplete canonical field is ignored.

- [ ] **Step 4: Emit one connected localized graph**

```ts
export function buildIndustryJsonLd(input: {
  locale: Locale
  seo: EffectiveIndustrySeo
  name: string
  description: string
  breadcrumbLabels: { home: string; industries: string; current: string }
  services: readonly { id: CanonicalServiceId; label: string; href: string }[]
  faqs: readonly { question: string; answer: string }[]
}): IndustryJsonLdGraph
```

Use stable `${canonical}#webpage`, `#breadcrumbs`, `#service`, and optional `#faq` IDs; connect the graph with `mainEntity`, `breadcrumb`, and `provider: { '@id': ORGANIZATION_ID }`. The Arabic graph uses `الرئيسية`, `القطاعات`, and localized service labels. It must not use a medical/legal/financial/government practitioner type.

- [ ] **Step 5: Run metadata/schema tests and TypeScript**

Run:

```bash
node --test --conditions=react-server --import tsx tests/industry-worlds-metadata.test.ts tests/industry-worlds-schema.test.ts
npx tsc --noEmit --incremental false
```

Expected: PASS.

- [ ] **Step 6: Commit metadata and schema**

```bash
git add lib/industries/resolve-industry-seo.ts lib/industries/build-industry-schema.ts tests/industry-worlds-metadata.test.ts tests/industry-worlds-schema.test.ts
git diff --cached --check
git commit -m "feat(industries): resolve atomic localized SEO"
```

---

### Task 6: Build the Shared World Shell, Theme Bridge, and Hero Scenes

**Files:**

- Create: `components/industry/detail/IndustryPageShell.tsx`
- Create: `components/industry/detail/IndustryHero.tsx`
- Create: `components/industry/detail/IndustryRelatedLinks.tsx`
- Create: `components/industry/detail/industry-detail.module.css`
- Create: `components/industry/detail/scenes/HeroSceneRenderer.tsx`
- Create: `components/industry/detail/scenes/HealthcarePulseScene.tsx`
- Create: `components/industry/detail/scenes/LogisticsFlowScene.tsx`
- Create: `components/industry/detail/scenes/RestaurantPassScene.tsx`
- Create: `components/industry/detail/scenes/industry-scenes.module.css`
- Create: `tests/helpers/register-css-modules.mjs`
- Create: `tests/industry-worlds-render.test.tsx`

**Interfaces:**

- Consumes: reviewed localized page data, theme tokens, manifest links, `PageBreadcrumbs`, `localePath`, and effective SEO/schema.
- Produces: an HTML-first `<IndustryPageShell>`, one `<IndustryHero>`, ordinary coordinate anchors, typed related links, and three semantic scene renderers.

- [ ] **Step 1: Write failing server-rendering and accessibility assertions**

Render a fixture through `renderToStaticMarkup` and assert:

```ts
assert.equal((html.match(/<main\b/g) || []).length, 0)
assert.equal((html.match(/<h1\b/g) || []).length, 1)
assert.match(html, /dir="rtl"/)
assert.match(html, /href="#clinic-system"/)
assert.match(html, /data-industry="healthcare"/)
assert.match(html, /data-locale="ar"/)
assert.match(html, /href="#industry-world-content"/)
assert.match(html, /id="industry-world-content"/)
assert.match(html, /--iw-canvas:/)
assert.match(html, /<figure/)
assert.match(html, /<figcaption/)
```

Source assertions reject `'use client'`, inline `<style>`, dynamic Tailwind color construction, `<canvas>`, `<video>`, and a page-long `data-header-theme="dark"` wrapper.

- [ ] **Step 2: Run the test and verify components are missing**

Run: `node --test --import ./tests/helpers/register-css-modules.mjs --import tsx tests/industry-worlds-render.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Add a test-only CSS-module loader**

Node cannot import CSS Modules directly. Register a synchronous Node 22 loader used only by server-render tests:

```js
import { registerHooks } from 'node:module'

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.endsWith('.css')) {
      return { url: new URL(specifier, context.parentURL).href, shortCircuit: true }
    }
    return nextResolve(specifier, context)
  },
  load(url, context, nextLoad) {
    if (url.endsWith('.css')) {
      return {
        format: 'module',
        source: 'export default new Proxy({}, { get: (_, key) => String(key) })',
        shortCircuit: true,
      }
    }
    return nextLoad(url, context)
  },
})
```

This helper never enters production code.

- [ ] **Step 4: Implement the semantic shell and audited theme bridge**

Use a CSS-properties bridge rather than dynamic classes:

```ts
type IndustryThemeStyle = React.CSSProperties & Record<`--iw-${string}`, string>

export function industryThemeStyle(theme: IndustryTheme): IndustryThemeStyle {
  return {
    '--iw-canvas': theme.canvas,
    '--iw-surface': theme.surface,
    '--iw-surface-raised': theme.elevatedSurface,
    '--iw-ink': theme.ink,
    '--iw-ink-muted': theme.mutedInk,
    '--iw-accent': theme.accent,
    '--iw-accent-ink': theme.accentInk,
    '--iw-signal': theme.signal,
    '--iw-line': theme.line,
    '--iw-focus': theme.focus,
  }
}
```

`IndustryPageShell` owns the `<div dir>`, a localized skip link targeting `#industry-world-content` inside the locale layout's existing main, JSON-LD, localized breadcrumbs, hero, wide-screen sticky coordinate rail, mobile inline index, ordered renderer slot, and analytics data attributes. It does not own industry prose or reorder the recipe. Anchor links use the recipe's stable IDs and remain usable without JavaScript.

- [ ] **Step 5: Implement three authored semantic hero diagrams**

Each scene accepts only localized content:

```ts
export type IndustrySceneProps = {
  locale: Locale
  summary: string
  stages: readonly { id: string; label: string; state?: string }[]
}
```

- Healthcare: two semantic `<ol>` lanes for patient and staff, converging at booking, visit, and follow-up.
- Logistics: an order-to-proof `<ol>` plus a labeled exception branch that visibly rejoins the route.
- Restaurants: a numbered service-pass `<ol>` crossing guest, front-of-house, kitchen, and return/loyalty states; no fabricated minute values.

Every figure has a visible process and a concise figcaption/assistive summary. Mixed-direction tokens render through `<bdi dir="ltr">`.

- [ ] **Step 6: Add final-state CSS, RTL, focus, and forced-colors behavior**

The hero entrance uses one `@keyframes` sequence under 900ms and only `opacity`/`transform`. Add:

```css
@media (prefers-reduced-motion: reduce) {
  .world *, .world *::before, .world *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    scroll-behavior: auto !important;
  }
}

@media (forced-colors: active) {
  .sceneLine, .sceneNode { border-color: CanvasText; }
  .sceneSignal { forced-color-adjust: auto; }
}
```

Use logical properties and semantic order; never reverse the DOM for RTL. Limit dark-theme markers to the hero/section actually behind the sticky header.

- [ ] **Step 7: Run render tests and TypeScript**

Run:

```bash
node --test --import ./tests/helpers/register-css-modules.mjs --import tsx tests/industry-worlds-render.test.tsx
npx tsc --noEmit --incremental false
```

Expected: PASS.

- [ ] **Step 8: Commit the shell and scenes**

```bash
git add components/industry/detail tests/helpers/register-css-modules.mjs tests/industry-worlds-render.test.tsx
git diff --cached --check
git commit -m "feat(industries): build semantic world shell"
```

---

### Task 7: Build the Exhaustive Standard Section Renderer

**Files:**

- Create: `components/industry/detail/IndustrySectionRenderer.tsx`
- Create: `components/industry/detail/sections/PressureFieldSection.tsx`
- Create: `components/industry/detail/sections/JourneyMapSection.tsx`
- Create: `components/industry/detail/sections/SystemBlueprintSection.tsx`
- Create: `components/industry/detail/sections/UseCaseSequenceSection.tsx`
- Create: `components/industry/detail/sections/ServiceBridgeSection.tsx`
- Create: `components/industry/detail/sections/EvidenceSection.tsx`
- Create: `components/industry/detail/sections/ConstraintsSection.tsx`
- Create: `components/industry/detail/sections/RegionalFitSection.tsx`
- Create: `components/industry/detail/sections/FaqSection.tsx`
- Create: `components/industry/detail/sections/ClosingCtaSection.tsx`
- Modify: `components/industry/detail/IndustryPageShell.tsx`
- Modify: `components/industry/detail/industry-detail.module.css`
- Modify: `tests/industry-worlds-render.test.tsx`

**Interfaces:**

- Consumes: one `IndustrySection`, locale, manifest, and analytics context.
- Produces: a semantic section for every registered standard type and an exhaustive `never` guard.

- [ ] **Step 1: Add failing render fixtures for every type and Release A variant**

Render each standard type and assert its section ID, H2, intro, concrete content, and `data-section-type`/`data-section-variant`. Specifically assert FAQ questions/answers are visible HTML, service/industry destinations are real localized anchors, the service bridge repeats the hero's primary destination with `data-cta-location="post-system"`, and closing CTAs expose `data-cta-location` and `data-cta-intent`.

- [ ] **Step 2: Run the focused test and confirm missing renderers**

Run: `node --test --import ./tests/helpers/register-css-modules.mjs --import tsx tests/industry-worlds-render.test.tsx`
Expected: FAIL.

- [ ] **Step 3: Implement one exhaustive server switch**

```tsx
export function IndustrySectionRenderer(props: RendererProps) {
  switch (props.section.type) {
    case 'pressure-field': return <PressureFieldSection {...props} section={props.section} />
    case 'journey-map': return <JourneyMapSection {...props} section={props.section} />
    case 'system-blueprint': return <SystemBlueprintSection {...props} section={props.section} />
    case 'use-case-sequence': return <UseCaseSequenceSection {...props} section={props.section} />
    case 'service-bridge': return <ServiceBridgeSection {...props} section={props.section} />
    case 'evidence': return <EvidenceSection {...props} section={props.section} />
    case 'constraints': return <ConstraintsSection {...props} section={props.section} />
    case 'regional-fit': return <RegionalFitSection {...props} section={props.section} />
    case 'faq': return <FaqSection {...props} section={props.section} />
    case 'closing-cta': return <ClosingCtaSection {...props} section={props.section} />
    case 'signature': return renderRegisteredSignature(props)
    default: return assertNever(props.section)
  }
}
```

The signature registry is empty in Release A; publication validation rejects a pilot recipe containing `type: 'signature'`. The three named signature **compositions** use standard section components only.

- [ ] **Step 4: Art-direct controlled variants without card repetition**

Use `data-section-variant` selectors and the shared tokens. Provide complete Release A treatments for:

- `split-signal`, `dense-ledger`
- `linear-route`, `dual-lane`, `exception-lane`
- `stacked-layers`, `constellation`, `service-line`
- `timed-pass`
- `route-links`, `capability-stack`
- `boundary-map`, `owner-register`
- `bilingual-operations`, `market-path`
- `editorial-list`, `grouped-questions`
- `framed-close`, `split-close`

The remaining approved variants still render correctly through their semantic component, but their distinctive art direction is completed in the release that first uses them. Do not ship a universal rounded-card grid.

- [ ] **Step 5: Verify section semantics and locale behavior**

Run:

```bash
node --test --import ./tests/helpers/register-css-modules.mjs --import tsx tests/industry-worlds-render.test.tsx tests/industry-worlds-validation.test.ts
npx tsc --noEmit --incremental false
```

Expected: PASS.

- [ ] **Step 6: Commit the section system**

```bash
git add components/industry/detail/IndustrySectionRenderer.tsx components/industry/detail/sections components/industry/detail/IndustryPageShell.tsx components/industry/detail/industry-detail.module.css tests/industry-worlds-render.test.tsx
git diff --cached --check
git commit -m "feat(industries): add exhaustive world sections"
```

---

### Task 8: Author and Validate the Healthcare — Clinical Pulse Draft

**Files:**

- Create: `lib/industries/definitions/healthcare.ts`
- Create: `tests/industry-worlds-pilots.test.ts`
- Modify: `components/industry/detail/scenes/HealthcarePulseScene.tsx`
- Modify: `components/industry/detail/scenes/industry-scenes.module.css`
- Modify: `components/industry/detail/industry-detail.module.css`

**Interfaces:**

- Produces: `healthcareDefinition satisfies IndustryPageDefinition`, complete EN/AR draft copy, the `healthcare-pulse` scene, and a valid draft fingerprint.
- Does **not** register or publish the draft yet.

- [ ] **Step 1: Write the failing Healthcare definition contract**

Assert exact palette, promise, CTA, section order, service IDs, related industries, FAQ count 4–7, stable EN/AR section IDs, all seven semantic answers exactly once, no prohibited claims, no `signature` entry, and this fingerprint:

```text
corridor-split|pressure-field:split-signal|journey-map:linear-route|journey-map:dual-lane|system-blueprint:stacked-layers|service-bridge:capability-stack|constraints:boundary-map|regional-fit:bilingual-operations|faq:editorial-list|closing-cta:framed-close|continuity-of-care
```

- [ ] **Step 2: Run the pilot test and verify the definition is missing**

Run: `node --test --conditions=react-server --import tsx tests/industry-worlds-pilots.test.ts`
Expected: FAIL.

- [ ] **Step 3: Author complete native-pair draft content**

Lock these top-level strings:

| Field | English | Arabic |
|---|---|---|
| World label | Clinical Pulse | نبض الرعاية |
| H1/promise | Digital care that moves with the patient. | رعاية رقمية تواكب المريض في كل خطوة. |
| Primary CTA | Map your patient journey | لنرسم رحلة المريض لديكم |
| SEO title | Healthcare Digital Systems for Patient Journeys | حلول رقمية للرعاية الصحية ورحلة المريض |

The hero/final secondary CTA resolves `web-applications` with a localized descriptive label.

Use these stable sections and responsibilities:

| ID | Variant | Purpose |
|---|---|---|
| `health-access-pressure` | `pressure-field:split-signal` | access/trust pressure; answers operating pressure |
| `patient-journey` | `journey-map:linear-route` | discovery → doctor selection → booking → preparation → visit → approved results/instructions → follow-up; answers journey |
| `continuity-of-care` | `journey-map:dual-lane` | patient/staff lanes and handoffs; named signature composition; supporting section |
| `clinic-system` | `system-blueprint:stacked-layers` | public experience, appointment layer, role-aware operations, approved integrations; answers buildable system |
| `healthcare-service-paths` | `service-bridge:capability-stack` | four canonical service anchors and two adjacent industries |
| `privacy-role-boundaries` | `constraints:boundary-map` | permissions, approved access, source-system and clinic responsibilities; answers evidence/constraints |
| `regional-care-delivery` | `regional-fit:bilingual-operations` | Arabic/English service naming, booking instructions, content ownership; answers regional delivery |
| `healthcare-faq` | `faq:editorial-list` | five unique FAQs |
| `healthcare-consultation` | `closing-cta:framed-close` | decision close and consistent WhatsApp/contact actions |

FAQ topics: existing-system integration; no diagnosis or medical advice; privacy/permission ownership; Arabic/English delivery; beginning with one patient journey. Never use “secure,” “compliant,” “real-time,” or an outcome metric without an approved claim source.

- [ ] **Step 4: Finish the calm pulse scene and theme**

Use exactly:

```text
canvas #F3FAF8; surface #FFFFFF; elevated #E4F3F0;
ink #0B2B2A; muted #355C59; accent #087F73;
accentInk #FFFFFF; signal #E86262; line #5F918A; focus #E86262.
```

Coral is a signal/focus color, not normal body text. The scene is spacious, clinical, and calm; convergence moments are perceivable without color alone.
Set `displayTreatment: 'clinical'`, `radiusMode: 'soft'`, `motifDensity: 'quiet'`, and `sceneTreatment: 'pulse-corridor'`.

- [ ] **Step 5: Validate draft, render both locales, and inspect copy uniqueness**

Run:

```bash
node --test --import ./tests/helpers/register-css-modules.mjs --import tsx tests/industry-worlds-pilots.test.ts tests/industry-worlds-render.test.tsx
npx tsc --noEmit --incremental false
```

Expected: PASS in draft mode; publication-mode test remains intentionally failing until Task 11 supplies real reviews.

- [ ] **Step 6: Commit the unregistered draft**

```bash
git add lib/industries/definitions/healthcare.ts tests/industry-worlds-pilots.test.ts components/industry/detail/scenes/HealthcarePulseScene.tsx components/industry/detail/scenes/industry-scenes.module.css components/industry/detail/industry-detail.module.css
git diff --cached --check
git commit -m "feat(industries): craft healthcare world draft"
```

---

### Task 9: Author and Validate the Logistics — Flow Control Draft

**Files:**

- Create: `lib/industries/definitions/logistics-supply-chain.ts`
- Modify: `tests/industry-worlds-pilots.test.ts`
- Modify: `components/industry/detail/scenes/LogisticsFlowScene.tsx`
- Modify: `components/industry/detail/scenes/industry-scenes.module.css`
- Modify: `components/industry/detail/industry-detail.module.css`

**Interfaces:**

- Produces: complete EN/AR Logistics draft, exception-aware route scene, owner register, and a unique draft fingerprint.
- Does **not** register or publish the draft yet.

- [ ] **Step 1: Add the failing Logistics contract**

Assert the exact palette, locked promise/CTA, services/adjacency, no fabricated SLA duration or “real-time,” all semantic answers, and fingerprint:

```text
route-field|journey-map:linear-route|journey-map:exception-lane|constraints:owner-register|system-blueprint:constellation|service-bridge:route-links|constraints:boundary-map|regional-fit:market-path|faq:grouped-questions|closing-cta:split-close|exception-control
```

- [ ] **Step 2: Run and confirm the definition is missing**

Run: `node --test --conditions=react-server --import tsx tests/industry-worlds-pilots.test.ts`
Expected: FAIL.

- [ ] **Step 3: Author complete operational copy**

Lock:

| Field | English | Arabic |
|---|---|---|
| World label | Flow Control | ضبط التدفق |
| H1/promise | See every handoff from order to proof of delivery. | رؤية أوضح لكل خطوة من الطلب إلى إثبات التسليم. |
| Primary CTA | Map your flow and exceptions | لنرسم تدفق العمليات والاستثناءات لديكم |
| SEO title | Logistics Systems for Order-to-Delivery Visibility | أنظمة لوجستية من الطلب إلى إثبات التسليم |

The hero/final secondary CTA resolves `business-systems-development` with a localized descriptive label.

Use these stable sections:

| ID | Variant | Purpose |
|---|---|---|
| `operating-route` | `journey-map:linear-route` | order → validation → warehouse → dispatch → route → delivery → proof; answers journey |
| `exception-control` | `journey-map:exception-lane` | stock/address/proof exceptions and recovery; answers operating pressure |
| `exception-owners` | `constraints:owner-register` | owner, operator-defined SLA, customer communication, recovery; answers evidence/constraints |
| `flow-system` | `system-blueprint:constellation` | order visibility, warehouse events, dispatch handoff, exception queue, proof/status reporting; answers buildable system |
| `logistics-service-paths` | `service-bridge:route-links` | four canonical services and E-commerce/Retail adjacency |
| `integration-boundaries` | `constraints:boundary-map` | WMS/TMS/fleet/API/source quality dependencies; supporting section |
| `regional-flow-delivery` | `regional-fit:market-path` | bilingual status language, addresses, handoff ownership; answers regional delivery |
| `logistics-faq` | `faq:grouped-questions` | five unique FAQs |
| `logistics-consultation` | `closing-cta:split-close` | decision close |

Every SLA value is literally described as operator-defined; no minutes, percentages, freshness guarantee, or carrier capability is invented.

- [ ] **Step 4: Finish the route field and exception branch**

Use exactly:

```text
canvas #08141F; surface #0E2735; elevated #143747;
ink #F0F8FC; muted #B8D3DF; accent #10A9B6;
accentInk #08141F; signal #E89B24; line #577482; focus #E89B24.
```

Amber exceptions use icon/label/line-style differences in addition to color. The route mirrors with reading direction but stage numbers remain chronological.
Set `displayTreatment: 'technical'`, `radiusMode: 'square'`, `motifDensity: 'dense'`, and `sceneTreatment: 'route-field'`.

- [ ] **Step 5: Validate and render EN/AR**

Run:

```bash
node --test --import ./tests/helpers/register-css-modules.mjs --import tsx tests/industry-worlds-pilots.test.ts tests/industry-worlds-render.test.tsx
npx tsc --noEmit --incremental false
```

Expected: PASS in draft mode.

- [ ] **Step 6: Commit the unregistered draft**

```bash
git add lib/industries/definitions/logistics-supply-chain.ts tests/industry-worlds-pilots.test.ts components/industry/detail/scenes/LogisticsFlowScene.tsx components/industry/detail/scenes/industry-scenes.module.css components/industry/detail/industry-detail.module.css
git diff --cached --check
git commit -m "feat(industries): craft logistics world draft"
```

---

### Task 10: Author and Validate the Restaurants — Service Rhythm Draft

**Files:**

- Create: `lib/industries/definitions/restaurants.ts`
- Modify: `tests/industry-worlds-pilots.test.ts`
- Modify: `components/industry/detail/scenes/RestaurantPassScene.tsx`
- Modify: `components/industry/detail/scenes/industry-scenes.module.css`
- Modify: `components/industry/detail/industry-detail.module.css`

**Interfaces:**

- Produces: complete EN/AR Restaurants draft, timed pass scene without fake timing claims, and a unique draft fingerprint.
- Does **not** register or publish the draft yet.

- [ ] **Step 1: Add the failing Restaurants contract**

Assert the exact palette, locked promise/CTA, service targets, adjacency, operator-owned constraints, no numeric preparation times, and fingerprint:

```text
editorial-pass|pressure-field:split-signal|use-case-sequence:timed-pass|pressure-field:dense-ledger|system-blueprint:service-line|service-bridge:capability-stack|constraints:boundary-map|regional-fit:bilingual-operations|faq:editorial-list|closing-cta:framed-close|the-pass
```

- [ ] **Step 2: Run and confirm the definition is missing**

Run: `node --test --conditions=react-server --import tsx tests/industry-worlds-pilots.test.ts`
Expected: FAIL.

- [ ] **Step 3: Author complete guest-and-operator copy**

Lock:

| Field | English | Arabic |
|---|---|---|
| World label | Service Rhythm | إيقاع الخدمة |
| H1/promise | Give every order a smoother rhythm. | امنح كل طلب إيقاعاً أكثر سلاسة. |
| Primary CTA | Tune your service journey | اضبطوا إيقاع تجربة ضيوفكم |
| SEO title | Restaurant Digital Systems for Every Order | أنظمة رقمية للمطاعم ولكل طلب |

The hero/final secondary CTA resolves `restaurant-qr-menu` with a localized descriptive label.

Use these stable sections:

| ID | Variant | Purpose |
|---|---|---|
| `menu-appetite` | `pressure-field:split-signal` | discovery, clarity, appetite, and branch context; answers operating pressure |
| `the-pass` | `use-case-sequence:timed-pass` | menu → reservation/order → acceptance/routing → preparation → table/pickup → feedback/loyalty → branch learning; answers journey and names signature composition |
| `timing-branch-pressure` | `pressure-field:dense-ledger` | front/back-of-house handoffs; supporting section |
| `restaurant-system` | `system-blueprint:service-line` | menus/branches, intake, POS/kitchen connection, campaigns, loyalty/feedback; answers buildable system |
| `restaurant-service-paths` | `service-bridge:capability-stack` | QR menu, website, e-commerce, and social anchors; Retail/Hospitality adjacency |
| `operator-owned-boundaries` | `constraints:boundary-map` | allergens, prices, availability, prep-time, provider/API responsibilities; answers evidence/constraints |
| `regional-guest-delivery` | `regional-fit:bilingual-operations` | native menus, mixed tokens, branch content and guest messages; answers regional delivery |
| `restaurants-faq` | `faq:editorial-list` | five unique FAQs |
| `restaurants-consultation` | `closing-cta:framed-close` | decision close |

Use sequence numbers only; do not imply minutes, instant routing, availability accuracy, or POS support without operator/provider validation.

- [ ] **Step 4: Finish the editorial service-pass art direction**

Use exactly:

```text
canvas #161616; surface #211D19; elevated #2E2720;
ink #FFF6E3; muted #D5C9B3; accent #E89A13;
accentInk #161616; signal #D94736; line #756B5C; focus #E89A13.
```

Tomato is a state signal, not normal text. Use sharp menu cuts, ticket-like labels, a strong timed rail, and asymmetry—without turning every item into a rounded card.
Set `displayTreatment: 'editorial'`, `radiusMode: 'cut'`, `motifDensity: 'medium'`, and `sceneTreatment: 'service-pass'`.

- [ ] **Step 5: Validate and render EN/AR**

Run:

```bash
node --test --import ./tests/helpers/register-css-modules.mjs --import tsx tests/industry-worlds-pilots.test.ts tests/industry-worlds-render.test.tsx
npx tsc --noEmit --incremental false
```

Expected: PASS in draft mode.

- [ ] **Step 6: Commit the unregistered draft**

```bash
git add lib/industries/definitions/restaurants.ts tests/industry-worlds-pilots.test.ts components/industry/detail/scenes/RestaurantPassScene.tsx components/industry/detail/scenes/industry-scenes.module.css components/industry/detail/industry-detail.module.css
git diff --cached --check
git commit -m "feat(industries): craft restaurants world draft"
```

---

### Task 11: Complete the Human Editorial Gate and Register the Three Worlds

**Files:**

- Create after approval: `lib/industries/reviews/release-a.ts`
- Create after approval: `scripts/generate-industry-og-assets.ts`
- Create: `tests/industry-worlds-assets.test.ts`
- Generate after approval: eight JPG files under `public/og/industries/`
- Modify after approval: `lib/industries/definitions/registry.ts`
- Modify: `tests/industry-worlds-foundation.test.ts`
- Modify: `tests/industry-worlds-validation.test.ts`
- Modify: `tests/industry-worlds-pilots.test.ts`

**Interfaces:**

- Consumes: final localized objects, deterministic hashes, and real reviewer identities/dates.
- Produces: publication-valid review records and a registry with exactly three world definitions.

- [ ] **Step 1: Generate the exact review packet and hashes**

Run a small read-only `tsx` command or focused test that prints:

1. for each pilot and locale, the manifest label/summary, full visible page copy in document order, and the combined `contentHash({ manifest: localizedManifestFields, page: definition.locales[locale] })`;
2. the complete thirteen-entry English navigation-copy packet plus `manifestContentHash('en', industryManifest)`;
3. the complete thirteen-entry Arabic navigation-copy packet plus `manifestContentHash('ar', industryManifest)`.

Present all eight packets to the user/reviewers. Do not create a review record yet.

- [ ] **Step 2: Pause for explicit human approvals**

Required records:

- Complete manifest EN: editorial reviewer
- Complete manifest AR: native-Arabic reviewer
- Healthcare EN: editorial + sensitive-domain reviewer
- Healthcare AR: native-Arabic + sensitive-domain reviewer
- Logistics EN: editorial reviewer
- Logistics AR: native-Arabic reviewer
- Restaurants EN: editorial reviewer
- Restaurants AR: native-Arabic reviewer

Each approval must supply the reviewer's real name and review date and must refer to the printed hash. If wording changes, recompute the hash and repeat review. Never invent or infer a reviewer.

- [ ] **Step 3: Write failing publication and asset tests**

Before adding records, assert that `assertValidIndustryPageRegistry` fails with `missing-manifest-review`/`missing-native-review`/`missing-sensitive-review`. Add an asset test requiring all eight approved OG paths to exist, be JPEG, report `width === 1200` and `height === 630` through Sharp, and remain below 250KB. Run both tests and confirm they fail before records/assets exist. After real approvals arrive, add exact assertions that every review hash equals the current content or manifest hash and that exactly three slugs resolve to `world` and ten to `legacy` in both locales.

- [ ] **Step 4: Generate the reviewed localized OG artwork**

`generate-industry-og-assets.ts` reads the reviewed manifest/definitions and produces 1200×630 JPEGs with Sharp. Each pilot uses its world palette and a simplified scene motif. Embed `public/fonts/Changa-VariableFont_wght.ttf` as a data URL in the source SVG for deterministic English/Arabic labels, and use `public/fonts/AgharaProRegular.ttf` only for the Latin CloudTopia wordmark. Defaults use CloudTopia branding and a locale-specific “Industry Worlds” label. Escape all XML text before building the source SVG.

Run: `node --conditions=react-server --import tsx scripts/generate-industry-og-assets.ts`
Expected: eight valid reviewed JPEG files, each below 250KB.

- [ ] **Step 5: Record approvals and register atomically**

`release-a.ts` contains separate `releaseAContentReviews` and `releaseAManifestReviews` arrays populated verbatim from the approvals supplied in Step 2; each ends with the corresponding `satisfies readonly ...ReviewRecord[]` contract. Do not create the file while any reviewer, date, or hash is unknown. Then make the registry explicit:

```ts
export const industryPageRegistry = {
  healthcare: healthcareDefinition,
  fintech: null,
  'ecommerce-retail': null,
  'real-estate': null,
  education: null,
  'travel-hospitality': null,
  restaurants: restaurantsDefinition,
  'legal-firms': null,
  construction: null,
  retail: null,
  'professional-services': null,
  'logistics-supply-chain': logisticsSupplyChainDefinition,
  'government-public-sector': null,
} satisfies IndustryPageRegistry
```

- [ ] **Step 6: Run publication and asset validation**

Run:

```bash
node --test --conditions=react-server --import tsx tests/industry-worlds-foundation.test.ts tests/industry-worlds-validation.test.ts tests/industry-worlds-pilots.test.ts tests/industry-worlds-assets.test.ts
npx tsc --noEmit --incremental false
```

Expected: PASS with three world and ten legacy definitions.

- [ ] **Step 7: Commit the approved release registry and artwork**

```bash
git add lib/industries/reviews/release-a.ts lib/industries/definitions/registry.ts scripts/generate-industry-og-assets.ts tests/industry-worlds-assets.test.ts tests/industry-worlds-foundation.test.ts tests/industry-worlds-validation.test.ts tests/industry-worlds-pilots.test.ts public/og/industries
git diff --cached --check
git commit -m "feat(industries): publish reviewed release A worlds"
```

---

### Task 12: Make the Dynamic Route a Thin, Closed Orchestrator

**Files:**

- Modify: `app/(frontend)/[locale]/industries/[industry]/page.tsx`
- Modify: `tests/seo-expansion.test.ts`
- Modify: `tests/full-site-expansion.test.ts`
- Modify: `tests/industry-worlds-schema.test.ts`

**Interfaces:**

- Consumes: `locales`, `INDUSTRY_SLUGS`, `isIndustrySlug`, resolver, metadata builder, schema builder, `IndustryPageShell`, and `LegacyIndustryPage`.
- Produces: exactly 26 static parameters, `dynamicParams = false`, unknown-slug 404, and a renderer branch with no duplicated business logic.

- [ ] **Step 1: Replace obsolete route-source assertions with failing behavior contracts**

Keep unrelated service/hub assertions. Replace only requirements for `getIndustry`, `industryFeatures`, `HeroOrbitDeck`, and `industryHeroImage` in the route. Test the pure static set from `locales × INDUSTRY_SLUGS`, then source-check the exported route flag:

```ts
const params = locales.flatMap((locale) =>
  INDUSTRY_SLUGS.map((industry) => ({ locale, industry })),
)
assert.equal(params.length, 26)
assert.equal(new Set(params.map(JSON.stringify)).size, 26)
assert.match(routeSource, /export const dynamicParams = false/)
```

Also source-check that the route imports `isIndustrySlug`, `getIndustryPage`, and `buildIndustryMetadata`, and does not contain generic copy arrays or `<main>`.

Extend the schema test to iterate all thirteen slugs in both locales after registry publication. For each of the twenty-six resolutions, parse the connected graph, assert stable effective canonical IDs and the canonical Organization reference, reject prohibited practitioner types, and assert exact equality between graph FAQ/service labels and the renderer's localized visible-data projection.

- [ ] **Step 2: Run the focused route tests and verify failure**

Run: `node --test --conditions=react-server --import tsx tests/seo-expansion.test.ts tests/full-site-expansion.test.ts`
Expected: FAIL because the route is still the 494-line renderer.

- [ ] **Step 3: Reduce the route to orchestration**

The route must expose exactly this static contract:

```ts
export const dynamicParams = false

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    INDUSTRY_SLUGS.map((industry) => ({ locale, industry })),
  )
}
```

Both `generateMetadata` and the page coerce/validate locale, call `notFound()` for an unknown industry, resolve the effective SEO pair, and branch:

```tsx
return resolution.kind === 'world'
  ? <IndustryPageShell locale={locale} definition={resolution.definition} seo={seo} schema={schema} />
  : <LegacyIndustryPage locale={locale} viewModel={resolution.legacy} schema={schema} />
```

Use a conditional server `await import()` for the legacy component inside the legacy branch so migrated pages do not pull its `HeroOrbitDeck` dependency.

- [ ] **Step 4: Verify routing and legacy parity**

Run:

```bash
node --test --import ./tests/helpers/register-css-modules.mjs --import tsx tests/industry-worlds-legacy.test.tsx tests/seo-expansion.test.ts tests/full-site-expansion.test.ts
node --conditions=react-server --test --import tsx tests/industry-worlds-schema.test.ts tests/industry-worlds-metadata.test.ts
npx tsc --noEmit --incremental false
```

Expected: PASS.

- [ ] **Step 5: Commit only the new route/test hunks**

```bash
git add 'app/(frontend)/[locale]/industries/[industry]/page.tsx'
git add -p tests/seo-expansion.test.ts tests/full-site-expansion.test.ts tests/industry-worlds-schema.test.ts
git diff --cached --check
git commit -m "refactor(industries): route worlds through staged renderer"
```

---

### Task 13: Complete OG, Sitemap, Markdown, and Navigation Reliability

**Files:**

- Create: `lib/industries/sitemap.ts`
- Create: `tests/industry-worlds-sitemap.test.ts`
- Modify: `lib/og/og-image.ts`
- Modify: `lib/sitemap-data.ts`
- Modify: `app/api/markdown/route.ts`
- Modify: `components/Header.tsx`
- Modify: `components/Footer.tsx`
- Modify: `components/home/industryData.ts`
- Modify: `tests/industry-worlds-foundation.test.ts`
- Modify: `tests/home-industries-section.test.ts`

**Interfaces:**

- Consumes: effective SEO pairs, manifest records, reviewed dates/content updates, Sharp, pathname, and shared Markdown routing.
- Produces: verified localized OG resolution, atomic sitemap entries, unknown-industry Markdown 404s, reliable sticky-header contrast after client navigation, and a corrected Restaurants homepage link.

- [ ] **Step 1: Write failing asset, sitemap, and discovery tests**

Assert:

- pilot metadata resolves its own localized image/alt text and legacy pages resolve `industries/default/<locale>.jpg` with localized alt text, never nonexistent `/images/og-image.jpg`;
- default sitemap has 26 unique industry entries, reciprocal alternates, and no fabricated `lastModified` for legacy definitions;
- an effective noindex pair removes only the affected canonical entry, and a paired canonical override changes sitemap URLs atomically;
- unknown `/industries/...` Markdown requests return 404, while known paths return the matching localized manifest name, summary, canonical, and service/related links;
- Header's dark-section observer reruns on pathname changes;
- Header and Footer import the lightweight manifest and do not import legacy/full page prose;
- homepage Restaurants targets `/industries/restaurants`.

- [ ] **Step 2: Run the focused tests and verify failure**

Run:

```bash
node --test --conditions=react-server --import tsx tests/industry-worlds-sitemap.test.ts tests/home-industries-section.test.ts
```

Expected: FAIL because the sitemap/fallback integration is missing and the Restaurants target is still Travel.

- [ ] **Step 3: Resolve verified industry OG artwork**

Extend `OgImageInput` with `fallbackPage?: string` and `alt?: string`; industry metadata calls it with `fallbackPage: 'industries/default'` and the localized world/industry label. The function must return no URL unless the selected file actually exists. Pilot metadata selects the reviewed per-world assets generated in Task 11; legacy metadata selects the reviewed localized default.

- [ ] **Step 4: Make sitemap decisions use the effective SEO pair**

Provide both base and resolved APIs:

```ts
export function buildBaseIndustrySitemapEntries(): MetadataRoute.Sitemap

export async function buildIndustrySitemapEntries():
  Promise<MetadataRoute.Sitemap>
```

The base helper emits all indexable manifest routes with canonical alternates. The async helper overlays reviewed definition dates and effective SEO/noindex/canonical pairs. Modify `buildSitemapEntriesFromCMS()` to replace base industry entries with the async result; make the synchronous fallback loop call the base helper. Never use `new Date()` as a content date.

Because `lib/sitemap-data.ts` already contains user changes, patch only the two industry loops and imports, then inspect the complete diff before staging.

- [ ] **Step 5: Guard Markdown and repair navigation details**

- Parse a Markdown request targeting `/industries/<slug>` through `isIndustrySlug`; unknown values return `new Response(..., { status: 404 })`.
- Known values return concise localized manifest identity, canonical URL, relevant services, and adjacent industries. Full definition prose/LLM ingestion remains Release E.
- In Header, key the dark-section observer effect by `usePathname()` and clean up prior observers/listeners on route changes. Mark only intersecting dark sections, not the full page.
- Switch Header and Footer industry navigation to the now-reviewed manifest labels/summaries. Preserve all menu/footer behavior and the user's existing changes; neither component may import `lib/seo/industries.ts` or any definition module afterward.
- Change only the Restaurants `exploreHref` in `components/home/industryData.ts` to `/industries/restaurants`; keep Entertainment and Startups targeting the hub until Release E's typed target-union migration.

- [ ] **Step 6: Verify discovery and integration behavior**

Run:

```bash
node --test --conditions=react-server --import tsx tests/industry-worlds-sitemap.test.ts tests/industry-worlds-metadata.test.ts tests/industry-worlds-foundation.test.ts tests/home-industries-section.test.ts
node --test --import tsx tests/seo-expansion.test.ts tests/full-site-expansion.test.ts
npx tsc --noEmit --incremental false
```

Expected: PASS.

- [ ] **Step 7: Commit only Task 13 output**

```bash
git add lib/industries/sitemap.ts tests/industry-worlds-sitemap.test.ts lib/og/og-image.ts app/api/markdown/route.ts components/home/industryData.ts
git add -p lib/sitemap-data.ts components/Header.tsx components/Footer.tsx tests/industry-worlds-foundation.test.ts tests/home-industries-section.test.ts
git diff --cached --check
git commit -m "feat(industries): complete release A discovery bridge"
```

---

### Task 14: Run Browser, Accessibility, Visual, and Performance Polish

**Files:**

- Create: `playwright.config.ts`
- Create: `tests/industry-worlds.browser.spec.ts`
- Create: six approved desktop visual snapshots beside the browser spec
- Modify: `package.json`
- Modify: `package-lock.json`
- Modify as findings require: Release A world components and CSS only

**Interfaces:**

- Consumes: the production build, all 26 localized routes, six pilot world routes, current Web Interface Guidelines, browser performance entries, and approved visual intent.
- Produces: repeatable Playwright/axe gates, six reviewed visual baselines, measured JavaScript budgets, resolved UI findings, and fresh completion evidence.

**Required skills during execution:** `web-design-guidelines`, `vercel:agent-browser`, `vercel:agent-browser-verify`, `superpowers:systematic-debugging` for any failure, and `superpowers:verification-before-completion` before success claims.

- [ ] **Step 1: Add browser tooling as development-only dependencies**

Run:

```bash
npm install --save-dev @playwright/test @axe-core/playwright agent-browser
npx playwright install chromium
```

Add scripts:

```json
{
  "test:industry-worlds:contracts": "node --conditions=react-server --test --import tsx tests/industry-worlds-assets.test.ts tests/industry-worlds-foundation.test.ts tests/industry-worlds-metadata.test.ts tests/industry-worlds-schema.test.ts tests/industry-worlds-sitemap.test.ts tests/industry-worlds-validation.test.ts tests/industry-worlds-pilots.test.ts",
  "test:industry-worlds:render": "node --test --import ./tests/helpers/register-css-modules.mjs --import tsx tests/industry-worlds-legacy.test.tsx tests/industry-worlds-render.test.tsx",
  "test:industry-worlds": "npm run test:industry-worlds:contracts && npm run test:industry-worlds:render",
  "test:industry-worlds:browser": "playwright test tests/industry-worlds.browser.spec.ts --project=chromium"
}
```

- [ ] **Step 2: Write browser gates before visual fixes**

`playwright.config.ts` runs against a production server and uses a deterministic desktop project. The spec must cover:

- smoke navigation for all 26 localized routes;
- a non-baseline smoke screenshot artifact for every one of those 26 routes, retained with the browser report for review;
- one unknown English and one unknown Arabic industry URL return 404 rather than generic content;
- every route's JSON-LD script parses and every advertised Open Graph image returns HTTP 200 with an image MIME type and 1200×630 dimensions;
- 320, 360, 390, 768, 1024, and 1440 widths for all six pilot locale routes;
- one main, one H1, correct `dir`, no horizontal overflow, and all coordinate/service/industry/CTA anchors visible;
- keyboard focus order and 44×44 minimum primary controls;
- reduced-motion final state and no animation exceeding five seconds;
- forced-colors mode preserves essential boundaries, labels, and focus;
- a JavaScript-disabled context retains the complete pilot argument, links, FAQs, and CTA;
- 200% zoom at a 390px viewport keeps content readable without two-dimensional scrolling;
- no console errors or Next error overlay;
- axe scans for all six pilot locale routes;
- dark Header transition into/out of Logistics and Restaurants after client navigation;
- six full-page 1440px visual baselines: three pilots × two locales;
- JavaScript transfer size no more than 30KB gzip over a shared-layout reference route;
- mobile performance samples for all six pilot locale routes with LCP ≤2.5s, CLS ≤0.1, and INP ≤200ms for the representative lab interaction path;
- no page-owned hero raster and no scene asset beyond the approved budget.

Measure JavaScript in fresh isolated browser contexts by summing `content-length` for successful `script` responses after a cold navigation. Use `/about` as the shared-layout reference and fail a pilot when its cold script total exceeds that reference by more than `30 * 1024` bytes. Record the six totals in the test output so the threshold is reviewable rather than opaque.

Measure the mobile vitals in fresh 390×844 Chromium contexts. Before navigation, install buffered `PerformanceObserver`s with `page.addInitScript` for `largest-contentful-paint`, `layout-shift`, and `event`; group event timings by `interactionId`, then exercise the menu, anchor rail, and CTA keyboard path. Record LCP, cumulative layout shift excluding shifts after recent input, and the worst representative interaction duration for every pilot/locale pair. Fail the stated thresholds. If Chromium does not expose a required entry type, fail with the unsupported capability in the output; any environment-specific exception requires written evidence and may not be silently skipped. This is a deterministic lab gate, not a substitute for later field data.

- [ ] **Step 3: Run the production browser suite and capture failures**

Run:

```bash
npm run build
npm run test:industry-worlds:browser
```

Expected on the first pass: any actual responsive, contrast, focus, RTL, or visual defects fail with screenshots/traces. Do not update snapshots until the rendered design has been inspected.

- [ ] **Step 4: Verify the running app with agent-browser**

After starting the server, run:

```bash
npx agent-browser open http://localhost:3000/industries/healthcare
npx agent-browser wait --load networkidle
npx agent-browser screenshot --annotate
npx agent-browser eval 'document.body.innerText.trim().length > 0 ? "HAS_CONTENT" : "BLANK"'
npx agent-browser eval 'document.querySelector("[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay") ? "ERROR_OVERLAY" : "OK"'
npx agent-browser snapshot -i
```

Repeat direct checks for `/ar/industries/healthcare`, both Logistics routes, and both Restaurants routes, then run `npx agent-browser close`. On failure, capture evidence, diagnose systematically, fix, and re-run; do not exceed two blind retry cycles.

- [ ] **Step 5: Apply the current Web Interface Guidelines review**

Fetch the latest rules from `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`, review `components/industry/detail/**/*.tsx` and both industry CSS modules, and fix every applicable critical/important finding. Record any intentionally inapplicable rule with a one-sentence reason in the task notes.

- [ ] **Step 6: Complete manual bilingual visual polish**

Inspect every pilot at 390 and 1440 in English and Arabic. Confirm:

- Healthcare feels calm, clinical, spacious, and trustworthy;
- Logistics feels dark, technical, dense, and exception-aware;
- Restaurants feels editorial, energetic, tactile, and service-led;
- all three remain recognizably CloudTopia through grid, typography, coordinate labels, linework, CTA hierarchy, and focus behavior;
- Arabic line breaks, mixed tokens, scene chronology, and asymmetry are intentional;
- there is no card sea, clipping, hidden text, awkward empty area, accidental color-only state, or generic hero resemblance.

Fix findings in the owning component/CSS, rerun focused tests after each patch, then update the six approved desktop snapshots.

- [ ] **Step 7: Run the fresh final verification matrix**

Run all commands from a clean process and read their complete output:

```bash
npm run test:industry-worlds
node --test --import tsx tests/seo-expansion.test.ts tests/full-site-expansion.test.ts tests/industries-page-redesign.test.ts tests/home-industries-section.test.ts
npm run test:smoke
npm run lint
npx tsc --noEmit --incremental false
npm run build
npm run test:industry-worlds:browser
git diff --check
```

Expected: zero test failures, zero TypeScript errors, successful production build, no browser/axe/visual failures, and no whitespace errors. If the repository-wide lint has unrelated pre-existing failures, record the exact output and separately run ESLint on every changed TS/TSX file; do not describe the global lint as passing.

- [ ] **Step 8: Request two-stage final review**

Dispatch one reviewer against the approved spec and this plan, and another reviewer for code quality/performance/maintainability. Verify their findings against the actual diff; fix all critical and important findings, rerun the affected tests, then rerun Step 7.

- [ ] **Step 9: Commit browser infrastructure and final polish**

```bash
git add playwright.config.ts tests/industry-worlds.browser.spec.ts package.json package-lock.json
git add tests/industry-worlds.browser.spec.ts-snapshots
git add -p components/industry/detail
git diff --cached --check
git commit -m "test(industries): verify release A world experience"
```

---

## Release A Acceptance Checklist

- [ ] The canonical tuple contains exactly thirteen slugs and emits exactly twenty-six static params.
- [ ] Unknown HTML and Markdown industry paths return 404.
- [ ] Healthcare, Logistics, and Restaurants resolve to `world`; the other ten resolve to `legacy` in both locales.
- [ ] Every pilot has complete independent English/Arabic copy, stable parity IDs, four to seven unique FAQs, two to four service bridges, and two adjacent industries.
- [ ] Every pilot answers all seven semantic questions exactly once and has a unique rhythm fingerprint.
- [ ] No Release A recipe uses a custom `signature` component.
- [ ] Real English/Arabic manifest-copy reviews and all pilot review records match the exact hashes; Healthcare has sensitive-domain approval.
- [ ] No unsupported proof, metric, compliance/security/real-time claim, or fabricated operator timing appears.
- [ ] The locale layout remains the only main landmark; every page has one H1 and logical headings.
- [ ] All service, adjacent-industry, hub, market, and CTA destinations are crawlable localized anchors.
- [ ] Metadata precedence, suffix normalization, canonical pairing, robots, OG URL, schema URL, and sitemap decisions are atomic.
- [ ] JSON-LD is one connected localized graph and FAQ data matches visible content.
- [ ] Eight OG assets are valid 1200×630 JPEGs and resolve over HTTP with image MIME types.
- [ ] Header/Footer use the lightweight manifest and never import world prose or scenes.
- [ ] All twenty legacy locale routes retain parity except the approved main/localization/service-link repairs.
- [ ] Pilot pages add no page-owned client component and stay within the JavaScript/scene budgets.
- [ ] All six pilot locale routes pass the mobile LCP ≤2.5s, CLS ≤0.1, and representative lab INP ≤200ms gates, or carry a documented environment-specific exception with captured evidence.
- [ ] All 26 smoke screenshot artifacts are retained, and pilot browser widths, keyboard, focus, axe, reduced motion, forced colors, RTL, overflow, visual baselines, and dark-header transitions pass.
- [ ] Focused tests, relevant legacy tests, smoke suite, TypeScript, production build, and fresh final browser verification pass.

## Deferred Explicitly to Releases B–E

- The other ten world definitions and scenes.
- Verified client/project proof and quantitative evidence.
- Full Atlas/homepage/country/Solution Finder/admin manifest migration.
- Rich per-world Markdown, generated `llms.txt`, site facts, MCP, chatbot, and retrieval adoption.
- Bespoke localized OG assets for all twenty-six routes.
- Removal of `LegacyIndustryPage`.

No deferred item may be silently added to Release A or used to weaken Release A's three-pilot quality gate.
