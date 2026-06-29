# Services Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restructure CloudTopia's Digital Presence services taxonomy (delete 5 pillars, add AEO + GEO, rename a group, trim sub-services), rebuild the `/services` hub as grouped big pillar cards with no dropdown, ensure every pillar page shows its sub-services as glow cards, and make per-page "projects we did" data-driven from the CMS.

**Architecture:** The new taxonomy lives in `lib/services/digital-presence.ts` (single source of truth, EN+AR). Sub-service content is `dp-subs/*.json` → assembled into `digital-presence-subservices.ts` by `scripts/assemble-dp.cjs`; Arabic mirrors in `dp-subs-ar/*.json` / `digital-presence-subservices-ar.ts`. The hub (`ServicesPageClient.tsx`) and the dynamic `/services/[service]` route read this data; the hub already has a grouped-card renderer (`StructuredCategoryGroups`) we switch everything to. Projects come from the Payload `Projects` collection via raw SQL in `lib/cms/content.ts`.

**Tech Stack:** Next.js (App Router), TypeScript, Payload CMS (Postgres), Tailwind, framer-motion. Tests: `node --test` + `tsx`. No deletions need 301s (branch not live, slugs not in sitemap).

---

## Conventions

- **Slugify** (must match `dpSlugify` in `digital-presence-content.ts`): `lower → & to "and" → strip (parens) → non-alnum to "-" → trim dashes`.
- **Build check:** `npm run build` (or faster: `npx tsc --noEmit -p tsconfig.json`).
- **Preview verification:** use the `preview_*` tools (start dev server, snapshot, screenshot). Never ask the user to check manually.
- **Commit** after each task with the message shown.
- Pre-delete safety (run once, expect empty): `grep -nE "local-seo-discoverability|customer-support-automations|customer-experience-portals|review-reputation-management|analytics-performance-reporting" proxy.ts app/sitemap.xml/route.ts`.

---

## Phase 0 — Invariant safety net

### Task 0: Taxonomy invariant test (guards the whole refactor)

**Files:**
- Create: `tests/services-taxonomy.test.ts`

- [ ] **Step 1: Write the test**

```ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { digitalPresenceGroups, digitalPresencePillars } from '../lib/services/digital-presence'
import { dpSubServiceContent, getDigitalPresenceSubServicesByPillar } from '../lib/services/digital-presence-content'

const dpSlugify = (s: string) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/\([^)]*\)/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

test('deleted pillars are gone', () => {
  const slugs = digitalPresencePillars.map((p) => p.slug)
  for (const dead of ['local-seo-discoverability', 'customer-support-automations', 'customer-experience-portals', 'review-reputation-management', 'analytics-performance-reporting']) {
    assert.ok(!slugs.includes(dead), `pillar ${dead} should be deleted`)
  }
})

test('groups are the expected three + journey order', () => {
  const groupSlugs = digitalPresenceGroups.map((g) => g.slug)
  assert.deepEqual(groupSlugs, ['core-foundation', 'visibility-discoverability', 'communication-engagement'])
})

test('Growth & Engagement rename applied', () => {
  const g = digitalPresenceGroups.find((x) => x.slug === 'communication-engagement')!
  assert.equal(g.name.en, 'Growth & Engagement')
  assert.ok(g.pillars.some((p) => p.slug === 'social-media-management'))
  assert.ok(g.pillars.some((p) => p.slug === 'content-marketing-authority'))
})

test('AEO & GEO exist with no sub-services', () => {
  for (const slug of ['answer-engine-optimization', 'generative-engine-optimization']) {
    const p = digitalPresencePillars.find((x) => x.slug === slug)
    assert.ok(p, `${slug} pillar must exist`)
    assert.equal(p!.subServices.length, 0, `${slug} must have no sub-services`)
  }
})

test('every kept DP sub-service has generated content (no dangling names)', () => {
  for (const pillar of digitalPresencePillars) {
    for (const name of pillar.subServices) {
      const slug = dpSlugify(name)
      assert.ok(dpSubServiceContent[slug], `missing content for "${name}" (${slug}) in pillar ${pillar.slug}`)
      assert.equal(dpSubServiceContent[slug].pillarSlug, pillar.slug, `${slug} content.pillarSlug should be ${pillar.slug}`)
    }
  }
})

test('no orphan content points at a deleted/unknown pillar', () => {
  const known = new Set(digitalPresencePillars.map((p) => p.slug))
  for (const s of Object.values(dpSubServiceContent)) {
    assert.ok(known.has(s.pillarSlug), `content ${s.slug} references unknown pillar ${s.pillarSlug}`)
  }
})
```

- [ ] **Step 2: Run it — expect FAIL** (taxonomy not yet changed)

Run: `node --test --import tsx tests/services-taxonomy.test.ts`
Expected: failures (deleted pillars still present, group count 4, AEO/GEO missing). This confirms the test is meaningful.

- [ ] **Step 3: Commit**

```bash
git add tests/services-taxonomy.test.ts
git commit -m "test(services): add taxonomy invariant guard for the restructure"
```

---

## Phase 1 — Taxonomy restructure (`lib/services/digital-presence.ts`)

### Task 1: Restructure groups, pillars, and trim sub-service lists

**Files:**
- Modify: `lib/services/digital-presence.ts` (the `digitalPresenceGroups` array, lines 43–315)

- [ ] **Step 1: Group ① `core-foundation` — trim three pillars' `subServices`** to exactly:

`website-development.subServices`:
```ts
[
  'Corporate Website Development', 'Business Website Development', 'Landing Page Development',
  'Real Estate Website Development', 'Educational & LMS Website Development',
  'Healthcare & Medical Website Development', 'Restaurant & Hospitality Website Development',
  'Multilingual & RTL Website Development', 'Headless CMS Implementation', 'Third-Party API Integration',
  'Website Speed & Performance Optimization', 'Website Redesign & Modernization',
  'Website Maintenance & Support', 'Web Hosting & Security Management',
]
```
`ecommerce-development.subServices`:
```ts
[
  'Custom E-Commerce Development', 'Shopify Store Development', 'WooCommerce Store Development',
  'Headless E-Commerce Development', 'Multi-Vendor Marketplace Development',
  'E-Commerce Redesign & Migration', 'Payment Gateway Integration',
  'Shipping & Fulfillment Automation Setup', 'Cart Abandonment Recovery Systems',
  'B2B Wholesale Portal Development', 'POS (Point of Sale) Integration',
  'Product Information Management (PIM) Setup',
]
```
`ui-ux-design-branding.subServices`:
```ts
[
  'Brand Strategy & Positioning', 'Corporate Rebranding Strategy', 'Logo & Visual Identity Design',
  'Brand Guidelines & Brand Book Creation', 'Motion Graphics & Web Animations',
  'UI (User Interface) Design', 'UX (User Experience) Design & Wireframing',
  'UX Audits & Usability Testing', 'Mobile & Web App Interface Design', 'Social Media Kit & Assets Design',
]
```

- [ ] **Step 2: Group ② `visibility-discoverability` — replace its `pillars` array** with SEO (trimmed + 4 absorbed), AEO, GEO. Delete the `local-seo-discoverability` pillar object:

```ts
pillars: [
  {
    slug: 'search-engine-optimization',
    name: t('Search Engine Optimization (SEO)', 'تحسين محركات البحث'),
    description: t('Technical, on-page, and off-page SEO that earns durable organic traffic.', 'SEO تقني وعلى الصفحة وخارجها لجلب زيارات عضوية مستدامة.'),
    icon: '/icons/services/SEO & Search Optimization.png',
    href: '/services/search-engine-optimization',
    subServices: [
      'Technical SEO & Indexing', 'On-Page SEO Optimization', 'Off-Page SEO & Link Building',
      'E-Commerce SEO', 'Local & Global SEO Strategy', 'SEO Audits & Competitor Analysis',
      'Keyword Research & Strategy', 'Multilingual & International SEO', 'Voice Search Optimization',
      'Image & Video SEO',
      // Absorbed from the deleted Local SEO pillar:
      'Google Business Profile Optimization', 'Local Map Ranking Strategies',
      '"Near Me" Search Optimization', 'Franchise & Multi-Location SEO',
    ],
  },
  {
    slug: 'answer-engine-optimization',
    name: t('Answer Engine Optimization (AEO)', 'تحسين محركات الإجابة'),
    description: t('Get cited by AI answer engines — ChatGPT, Perplexity, Google AI Overviews — and own the direct answer to your customers’ questions.', 'كن المصدر الذي تستشهد به محركات الإجابة بالذكاء الاصطناعي — ChatGPT وPerplexity ونظرات Google AI — وامتلك الإجابة المباشرة لأسئلة عملائك.'),
    icon: '/icons/services/SEO & Search Optimization.png',
    href: '/services/answer-engine-optimization',
    subServices: [],
  },
  {
    slug: 'generative-engine-optimization',
    name: t('Generative Engine Optimization (GEO)', 'تحسين المحركات التوليدية'),
    description: t('Optimize your brand to surface inside generative-AI results, so AI assistants recommend you when buyers ask.', 'هيّئ علامتك للظهور داخل نتائج الذكاء الاصطناعي التوليدي، ليُرشّحك المساعدون الأذكياء حين يسأل المشترون.'),
    icon: '/icons/services/SEO & Search Optimization.png',
    href: '/services/generative-engine-optimization',
    subServices: [],
  },
],
```
> Icons reuse the SEO icon for now; replace with `/icons/services/aeo.png` & `/icons/services/geo.png` when assets exist (Task 13).

- [ ] **Step 3: Group ③ rename + reduce.** Change `communication-engagement`: set `name: t('Growth & Engagement', 'النمو والتفاعل')` (keep `slug: 'communication-engagement'` and `tagline`). Replace its `pillars` with only `social-media-management` (trimmed) and `content-marketing-authority` (moved in). Delete the `customer-support-automations` and `customer-experience-portals` pillar objects.

`social-media-management.subServices`:
```ts
[
  'Social Media Strategy & Planning', 'Social Media Profile Setup', 'Content Calendar Creation',
  'Social Media Copywriting', 'Graphic Design for Social Media',
  'Short-Form Video Editing (Reels, TikTok, Shorts)', 'Community Management & Engagement',
  'Influencer Outreach & Management', 'Social Media Contest & Giveaway Management',
  'LinkedIn B2B Personal Branding', 'Social Media Analytics & Reporting',
]
```
Move the `content-marketing-authority` pillar object (from old group ④) here, trimming its `subServices`:
```ts
{
  slug: 'content-marketing-authority',
  name: t('Content Marketing & Authority', 'تسويق المحتوى وبناء الريادة'),
  description: t('Content that builds authority and feeds every channel and funnel.', 'محتوى يبني الريادة ويغذّي كل قناة ومسار تحويل.'),
  icon: '/icons/services/Professional Content Creation.png',
  href: '/content-creation',
  subServices: [
    'SEO Blog Post & Article Writing', 'Website Copywriting', 'Landing Page Copywriting',
    'Case Study & Portfolio Writing', 'Email Newsletter Copywriting',
    'Press Release (PR) Writing & Distribution', 'Video Scriptwriting',
  ],
},
```

- [ ] **Step 4: Delete group ④** — remove the entire `growth-reputation` group object (Content Marketing already moved; Review & Analytics are dropped).

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit -p tsconfig.json`
Expected: passes (no references to deleted pillar objects inside this file).

- [ ] **Step 6: Commit**

```bash
git add lib/services/digital-presence.ts
git commit -m "feat(services): restructure Digital Presence taxonomy (delete 5 pillars, add AEO+GEO, rename group, trim sub-services)"
```
> The invariant test (Task 0) still fails here — it also checks content, fixed in Phase 2.

---

## Phase 2 — Prune sub-service content + Arabic parity

### Task 2: Reassign the 4 absorbed Local SEO sub-services to SEO

**Files:**
- Modify: `lib/services/dp-subs/google-business-profile-optimization.json`, `local-map-ranking-strategies.json`, `near-me-search-optimization.json`, `franchise-and-multi-location-seo.json`
- Modify (if present): the same four files in `lib/services/dp-subs-ar/`

- [ ] **Step 1: In each of the four JSONs, set** `"pillarSlug": "search-engine-optimization"` and `"pillarName": "Search Engine Optimization (SEO)"`. (Verify the four files exist first: `ls lib/services/dp-subs/ | grep -E "google-business-profile-optimization|local-map-ranking|near-me|franchise"`. If a slug differs, use the actual filename.)

- [ ] **Step 2: Commit**

```bash
git add lib/services/dp-subs lib/services/dp-subs-ar
git commit -m "refactor(services): move key Local SEO sub-services under the SEO pillar"
```

### Task 3: Prune-and-reassemble script (EN + AR), driven by the taxonomy

**Files:**
- Create: `scripts/dp-prune.cjs`

- [ ] **Step 1: Write the prune script** — it derives the kept-slug set from `digital-presence.ts` (single source of truth), deletes orphan JSONs in both locales, regenerates the EN aggregate via the existing assembler, and filters the AR aggregate (so existing AR translations are preserved, only removed entries dropped).

```js
// scripts/dp-prune.cjs — delete DP sub-service content for any slug no longer
// referenced by a pillar in digital-presence.ts, then rebuild the aggregates.
const fs = require('fs')
const { execSync } = require('child_process')

const dpSlugify = (s) =>
  s.toLowerCase().replace(/&/g, 'and').replace(/\([^)]*\)/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '')

// Read the kept slugs straight from the source file (no TS import needed).
const src = fs.readFileSync('lib/services/digital-presence.ts', 'utf8')
const names = [...src.matchAll(/subServices:\s*\[([\s\S]*?)\]/g)]
  .flatMap((m) => [...m[1].matchAll(/'([^']+)'|"([^"]+)"/g)].map((x) => x[1] || x[2]))
const keep = new Set(names.map(dpSlugify))
console.log('kept slugs:', keep.size)

for (const dir of ['lib/services/dp-subs', 'lib/services/dp-subs-ar']) {
  if (!fs.existsSync(dir)) continue
  let removed = 0
  for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.json'))) {
    const slug = f.replace('.json', '')
    if (!keep.has(slug)) { fs.unlinkSync(`${dir}/${f}`); removed++ }
  }
  console.log(`${dir}: removed ${removed}`)
}

// EN aggregate: regenerate from remaining JSONs.
execSync('node scripts/assemble-dp.cjs', { stdio: 'inherit' })

// AR aggregate: filter the existing generated record to kept slugs (preserve
// translations; don't regenerate from the sparser dp-subs-ar set).
const arPath = 'lib/services/digital-presence-subservices-ar.ts'
if (fs.existsSync(arPath)) {
  const arSrc = fs.readFileSync(arPath, 'utf8')
  // Find the object literal's `{` AFTER `export const` so a top-of-file
  // `import type { … }` brace doesn't get mistaken for the record start.
  const jsonStart = arSrc.indexOf('{', arSrc.indexOf('export const'))
  const header = arSrc.slice(0, arSrc.indexOf('export const'))
  const exportLine = arSrc.slice(arSrc.indexOf('export const'), jsonStart)
  const rec = JSON.parse(arSrc.slice(jsonStart, arSrc.lastIndexOf('}') + 1))
  let dropped = 0
  for (const k of Object.keys(rec)) if (!keep.has(k)) { delete rec[k]; dropped++ }
  fs.writeFileSync(arPath, header + exportLine + JSON.stringify(rec, null, 2) + '\n')
  console.log(`AR aggregate: dropped ${dropped}, kept ${Object.keys(rec).length}`)
}
```
> If the AR file's prologue differs (e.g. an `import` line), adjust the `header`/`exportLine` split to preserve it. Inspect `head -6 lib/services/digital-presence-subservices-ar.ts` first.

- [ ] **Step 2: Run the prune**

Run: `node scripts/dp-prune.cjs`
Expected: prints kept-slug count (~67), removed counts for both dirs, EN entries assembled, AR dropped/kept counts.

- [ ] **Step 3: Run the invariant test — expect PASS now**

Run: `node --test --import tsx tests/services-taxonomy.test.ts`
Expected: all tests PASS (deleted pillars gone, groups = 3, AEO/GEO empty, every kept sub-service has content, no orphan content).

- [ ] **Step 4: Typecheck + commit**

Run: `npx tsc --noEmit -p tsconfig.json` (expect pass)
```bash
git add scripts/dp-prune.cjs lib/services/dp-subs lib/services/dp-subs-ar lib/services/digital-presence-subservices.ts lib/services/digital-presence-subservices-ar.ts
git commit -m "feat(services): prune trimmed/deleted sub-service content (EN+AR), data-driven from taxonomy"
```

### Task 4: Purge dangling references to deleted slugs across the app

**Files:**
- Modify: `app/(frontend)/[locale]/services/[service]/page.tsx` (the `WEBSITE_PROJECT_IDS`/`WEBAPP_PROJECT_IDS` maps — remove keys for any deleted slug; Phase 6 replaces these anyway)
- Modify: any other file flagged by the grep below

- [ ] **Step 1: Find leftovers**

Run: `grep -rnE "local-seo-discoverability|customer-support-automations|customer-experience-portals|review-reputation-management|analytics-performance-reporting|growth-reputation" app components lib --include=*.ts --include=*.tsx | grep -v digital-presence-subservices`
Expected: a short list. Remove/redirect each reference (e.g. `PORTFOLIO_PILLARS` in `DigitalPresenceSubServicePage.tsx` includes `customer-experience-portals` — drop it).

- [ ] **Step 2: Build + commit**

Run: `npm run build` (expect success)
```bash
git add -A
git commit -m "chore(services): remove dangling references to deleted pillars"
```

---

## Phase 3 — Get Found trio: AEO/GEO pages + SEO refresh

### Task 5: `GetFoundPillarPage` component (shared design for SEO/AEO/GEO)

**Files:**
- Create: `components/services/GetFoundPillarPage.tsx`
- Create: `lib/services/get-found-content.ts` (per-pillar bespoke content, EN+AR)

- [ ] **Step 1: Define the content type + data** in `lib/services/get-found-content.ts`. Shape:

```ts
import type { LocalizedText } from '@/lib/seo/industries'
const t = (en: string, ar: string): LocalizedText => ({ en, ar })

export type GetFoundContent = {
  slug: string
  hero: { badge: LocalizedText; title: LocalizedText; subtitle: LocalizedText }
  shift: { heading: LocalizedText; body: LocalizedText; stats: { value: string; label: LocalizedText }[] }
  capabilities: { title: LocalizedText; desc: LocalizedText }[]   // replaces the sub-service grid
  process: { name: LocalizedText; detail: LocalizedText }[]
  faqs: { question: LocalizedText; answer: LocalizedText }[]
}

export const getFoundContent: Record<string, GetFoundContent> = {
  'search-engine-optimization': { /* full EN+AR copy — see Step 1a */ },
  'answer-engine-optimization': { /* full EN+AR copy */ },
  'generative-engine-optimization': { /* full EN+AR copy */ },
}
export const getGetFoundContent = (slug: string): GetFoundContent | null => getFoundContent[slug] ?? null
```
Write real bilingual copy for all three (no placeholders): AEO = "own the cited answer in ChatGPT/Perplexity/AI Overviews"; GEO = "be the brand generative engines recommend"; SEO = refreshed organic-search framing. Each: 3 stats, 4–6 capabilities, 4 process steps, 4 FAQs.

- [ ] **Step 2: Build the component** `GetFoundPillarPage.tsx` reusing existing primitives: `SubServiceContactHero` (or `HeroGeometric`) → "the shift" stat band → `FeaturesBento`-style capability grid (wrap each in `GlowingEffect`) → **`PillarSubServicesGrid` when the pillar has sub-services** (so SEO shows its 14 kept sub-services as glow cards; AEO/GEO have none, so it renders nothing) → process steps → `FaqAccordion` → `ContactFast`/lead form. Signature: `export function GetFoundPillarPage({ content, locale }: { content: GetFoundContent; locale: string })` — derive the pillar via `getStructuredPillarBySlug(content.slug)` and pass its slug to `PillarSubServicesGrid`. Honor `dir="rtl"` for Arabic.

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit -p tsconfig.json` — expect pass.

- [ ] **Step 4: Commit**

```bash
git add components/services/GetFoundPillarPage.tsx lib/services/get-found-content.ts
git commit -m "feat(services): add Get Found pillar page (SEO/AEO/GEO bespoke design)"
```

### Task 6: Route AEO/GEO/SEO through the new page

**Files:**
- Modify: `app/(frontend)/[locale]/services/[service]/page.tsx` (the `ServiceDetailPage` branch at line 409–414, and `generateMetadata` pillar branch at 314–330)

- [ ] **Step 1: In `ServiceDetailPage`,** before the existing `getStructuredPillarBySlug` render, branch on Get Found content:

```tsx
const getFound = getGetFoundContent(serviceSlug)
if (getFound) return <GetFoundPillarPage content={getFound} locale={locale} />
```
Add the import: `import { GetFoundPillarPage } from '@/components/services/GetFoundPillarPage'` and `import { getGetFoundContent } from '@/lib/services/get-found-content'`. (Metadata already works via the existing `getStructuredPillarBySlug` branch since AEO/GEO are real pillars — verify title/desc/canonical resolve.)

- [ ] **Step 2: Verify in preview** (start dev server)

Visit `/services/answer-engine-optimization`, `/services/generative-engine-optimization`, `/services/search-engine-optimization` and `/ar/...` equivalents. Use `preview_snapshot` + `preview_screenshot`; confirm RTL on the `/ar/` pages and no console errors (`preview_console_logs`).

- [ ] **Step 3: Commit**

```bash
git add "app/(frontend)/[locale]/services/[service]/page.tsx"
git commit -m "feat(services): render SEO/AEO/GEO via GetFoundPillarPage"
```

---

## Phase 4 — Hub redesign (`ServicesPageClient.tsx`)

### Task 7: Remove the "Explore" featured block

**Files:**
- Modify: `app/(frontend)/[locale]/services/ServicesPageClient.tsx`

- [ ] **Step 1: Delete** the `featuredByCategory` object (lines 1024–1051), the `const featured = …` line (1052), and the entire `{featured && ( … )}` section (1119–1150).

- [ ] **Step 2: Remove now-unused symbols** flagged by typecheck (e.g. `businessSystemsSubServiceSlugs` import if only the block used it). Run `npx tsc --noEmit` and clean up.

- [ ] **Step 3: Commit**

```bash
git add "app/(frontend)/[locale]/services/ServicesPageClient.tsx"
git commit -m "feat(services): remove the Explore Digital Presence/Business Systems hub block"
```

### Task 8: Replace the dropdown accordion with grouped pillar cards

**Files:**
- Modify: `app/(frontend)/[locale]/services/ServicesPageClient.tsx` (render switch lines 1213–1220)

- [ ] **Step 1: Replace** the `CategoryExplorer`-vs-`StructuredCategoryGroups` ternary so ALL structured categories use the grouped-card renderer:

```tsx
{isStructured && !q ? (
  <motion.div key={`grp-${activeCategory}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
    <StructuredCategoryGroups categoryId={activeCategory} locale={locale as string} />
  </motion.div>
) : ( /* unchanged flat/search branch */ )}
```

- [ ] **Step 2: Remove the `CategoryExplorer` import** (line 14) and confirm it's now unused app-wide:

Run: `grep -rn "CategoryExplorer" app components --include=*.tsx`
Expected: only its own definition file. (Deletion of the file happens in Task 14.)

- [ ] **Step 3: Verify in preview**

Reload `/services`; click each category in the sidebar. Confirm: no accordion/dropdown, every pillar shows as an always-visible big card grouped under its journey group (tagline + group name + count), and Digital Presence shows the 3 groups (Core Foundation / Visibility & Discoverability / Growth & Engagement). `preview_screenshot` for the record.

- [ ] **Step 4: Commit**

```bash
git add "app/(frontend)/[locale]/services/ServicesPageClient.tsx"
git commit -m "feat(services): hub shows grouped big pillar cards, no sub-service dropdown"
```

---

## Phase 5 — Sub-service card sections on every pillar page

### Task 9: Audit pillar pages and add the glow-card grid where missing

**Files:**
- Modify: the pillar landing pages that lack a sub-service card section. Pillar hrefs: `/website-development`, `/ecommerce-development`, `/social-media-marketing`, `/content-creation`, `/services/ui-ux-design-branding`, plus Business Systems & Web Apps pillars rendered by `RichPillarPage`/`PillarPage`. (SEO already shows its cards via `GetFoundPillarPage` → `PillarSubServicesGrid` from Task 5; AEO/GEO have no sub-services.)
- Use existing: `components/services/PillarSubServicesGrid.tsx` (data-driven glow-card grid via `getDigitalPresenceSubServicesByPillar`).

- [ ] **Step 1: Inventory** which pillar pages already render `PillarSubServicesGrid` / `SubServicesSection`:

Run: `grep -rln "PillarSubServicesGrid\|SubServicesSection" app components --include=*.tsx`

- [ ] **Step 2: For each pillar page missing it,** insert the section before the page's contact/CTA:

```tsx
import { PillarSubServicesGrid } from '@/components/services/PillarSubServicesGrid'
// …inside the page body, near the end:
<PillarSubServicesGrid pillarSlug="website-development" locale={locale} />
```
Use the correct `pillarSlug` per page. AEO/GEO have empty `subServices`, so `PillarSubServicesGrid` renders nothing there — fine (their capabilities grid covers it). Confirm `/website-development` (requirement 1.2) shows its sub-services as glow cards on the page body.

- [ ] **Step 3: Verify in preview** each modified pillar page (EN + `/ar/`): the glow-card grid renders the (trimmed) sub-services, cards link to `/services/<slug>`, hover glow works. `preview_screenshot`.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat(services): every pillar page shows its sub-services as glow cards"
```

---

## Phase 6 — Data-driven related projects

### Task 10: Add `relatedServiceSlugs` to the Projects collection

**Files:**
- Modify: `collections/Projects.ts` (fields array, after `category` ~line 213)
- Migration: `npm run payload:migrate:create` then `npm run payload:migrate`

- [ ] **Step 1: Add the field** (single text column, comma/space-separated slugs — simplest data-driven shape, no join table):

```ts
{
  name: 'relatedServiceSlugs',
  type: 'text',
  required: false,
  admin: {
    description: 'Comma-separated service/pillar slugs this project showcases (e.g. "website-development, corporate-website-development"). Drives the “Projects we did” section on those service pages.',
  },
},
```

- [ ] **Step 2: Create + run the migration**

Run: `npm run payload:migrate:create -- add_related_service_slugs` then `npm run payload:migrate`
Expected: a new `related_service_slugs` column on `projects`. (If the DB isn't reachable locally, note it and run on next deploy; the SQL in Task 11 uses `coalesce(p.related_service_slugs, '')` so it's null-safe.)

- [ ] **Step 3: Commit**

```bash
git add collections/Projects.ts src/migrations 2>/dev/null; git add -A
git commit -m "feat(cms): add relatedServiceSlugs to Projects for data-driven service matching"
```

### Task 11: Surface the field through the query + types

**Files:**
- Modify: `lib/cms/content.ts` (`getProjectsUncached` SQL ~191–207, `getProjectUncached` SQL, and `normalizeProject`)
- Modify: `lib/projects.ts` (the `Project` type)

- [ ] **Step 1: Add the column to both SELECTs** — add `coalesce(p.related_service_slugs, '') as related_service_slugs,` to the select list and to the `group by` in both `getProjectsUncached` and `getProjectUncached`.

- [ ] **Step 2: Map it in `normalizeProject`** (find the function; add): `relatedServiceSlugs: typeof row.related_service_slugs === 'string' ? row.related_service_slugs.split(/[,\s]+/).filter(Boolean) : []`.

- [ ] **Step 3: Extend the `Project` type** in `lib/projects.ts`: add `relatedServiceSlugs?: string[]`. Also update `getStaticProjects` mapping if the static shape needs the field (default `[]`).

- [ ] **Step 4: Typecheck + commit**

Run: `npx tsc --noEmit -p tsconfig.json`
```bash
git add lib/cms/content.ts lib/projects.ts
git commit -m "feat(projects): expose relatedServiceSlugs through CMS query + Project type"
```

### Task 12: `getProjectsForService` helper with fallback chain (TDD)

**Files:**
- Create: `lib/services/related-projects.ts`
- Create: `tests/related-projects.test.ts`
- Modify: `app/(frontend)/[locale]/services/[service]/page.tsx`, `components/services/DigitalPresenceSubServicePage.tsx`

- [ ] **Step 1: Write the failing test**

```ts
import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pickProjectsForService } from '../lib/services/related-projects'

const P = (id: string, rel: string[], featured = false) =>
  ({ id, relatedServiceSlugs: rel, featured, category: '', type: '', title: id, problem: '', solution: '', features: [], image: '', metrics: { label: '', value: '' } } as any)

test('exact sub-service match wins', () => {
  const all = [P('a', ['corporate-website-development']), P('b', ['ecommerce-development'])]
  const r = pickProjectsForService(all, { serviceSlug: 'corporate-website-development', pillarSlug: 'website-development', limit: 6 })
  assert.deepEqual(r.map((p) => p.id), ['a'])
})

test('falls back to pillar when no exact match', () => {
  const all = [P('a', ['website-development']), P('b', ['ecommerce-development'])]
  const r = pickProjectsForService(all, { serviceSlug: 'landing-page-development', pillarSlug: 'website-development', limit: 6 })
  assert.deepEqual(r.map((p) => p.id), ['a'])
})

test('falls back to featured (closest) when nothing matches — never empty', () => {
  const all = [P('a', ['x'], true), P('b', ['y'])]
  const r = pickProjectsForService(all, { serviceSlug: 'nope', pillarSlug: 'also-nope', limit: 6 })
  assert.ok(r.length >= 1)
  assert.equal(r[0].id, 'a')
})
```

- [ ] **Step 2: Run — expect FAIL** (`pickProjectsForService` not defined)

Run: `node --test --import tsx tests/related-projects.test.ts`

- [ ] **Step 3: Implement**

```ts
import type { Project } from '@/lib/projects'

export type ServiceMatch = { serviceSlug: string; pillarSlug?: string; categorySlug?: string; limit?: number }

export function pickProjectsForService(all: Project[], m: ServiceMatch): Project[] {
  const limit = m.limit ?? 6
  const has = (p: Project, slug?: string) => !!slug && (p.relatedServiceSlugs ?? []).includes(slug)
  const exact = all.filter((p) => has(p, m.serviceSlug))
  const byPillar = all.filter((p) => has(p, m.pillarSlug) && !exact.includes(p))
  const byCat = all.filter((p) => has(p, m.categorySlug) && !exact.includes(p) && !byPillar.includes(p))
  const closest = all.filter((p) => p.featured)
  const ordered: Project[] = []
  for (const bucket of [exact, byPillar, byCat, closest, all]) {
    for (const p of bucket) if (!ordered.includes(p)) ordered.push(p)
    if (ordered.length >= limit) break
  }
  return ordered.slice(0, limit)
}

export async function getProjectsForService(locale: string, m: ServiceMatch): Promise<Project[]> {
  const { getAllProjects } = await import('@/lib/projects')
  return pickProjectsForService(await getAllProjects(locale), m)
}
```

- [ ] **Step 4: Run — expect PASS**

Run: `node --test --import tsx tests/related-projects.test.ts`

- [ ] **Step 5: Wire into pages.** In `[service]/page.tsx`, replace the hardcoded `WEBSITE_PROJECT_IDS`/`WEBAPP_PROJECT_IDS` lookups with `getProjectsForService(locale, { serviceSlug: service.slug, pillarSlug: <category-or-pillar> })`. In `DigitalPresenceSubServicePage.tsx`, replace the `PORTFOLIO_PILLARS` + featured/slice logic (lines 54–60) with `await getProjectsForService(locale, { serviceSlug: c.slug, pillarSlug: c.pillarSlug })`. Keep the section hidden only if the helper returns `[]` (it won't, given the `closest`/`all` fallback, unless there are zero projects).

- [ ] **Step 6: Build + verify in preview** — a service page shows the projects section; check console for no errors.

Run: `npm run build`

- [ ] **Step 7: Commit**

```bash
git add lib/services/related-projects.ts tests/related-projects.test.ts "app/(frontend)/[locale]/services/[service]/page.tsx" components/services/DigitalPresenceSubServicePage.tsx
git commit -m "feat(projects): data-driven related projects per service with fallback chain"
```

### Task 12b: Backfill `relatedServiceSlugs` on existing projects

- [ ] **Step 1:** For each existing CMS project, set `relatedServiceSlugs` (via Payload admin or a seed update) using the known mappings already encoded in the old `WEBSITE_PROJECT_IDS`/`WEBAPP_PROJECT_IDS` (e.g. `kvaii-logistics` → `business-website-development, corporate-website-development`; `artucky-ecommerce` → `ecommerce-development`; `joory-cafe` → `restaurant-and-hospitality-website-development`; web-app projects → their web-app pillar). Document the mapping in the commit body.

- [ ] **Step 2: Verify in preview** that each backfilled project appears on the expected service page. Commit any seed-script changes.

---

## Phase 7 — Header reconcile + cleanup + final verification

### Task 13: AEO/GEO icons (optional polish)

- [ ] Add `/public/icons/services/aeo.png` and `geo.png` if assets are available, then point the AEO/GEO pillar `icon` fields at them in `digital-presence.ts`. If no assets, leave the SEO icon and note it. Commit.

### Task 14: Header menu reconcile + dead-code removal

**Files:**
- Modify: `components/Header.tsx`
- Delete: `components/services/CategoryExplorer.tsx` (now unused — confirm via grep first)

- [ ] **Step 1:** In the services mega-menu, ensure no link points to a deleted page; point marketing entries at SEO/AEO/GEO/SMM/Content front-doors. (The menu reads the old `serviceCategories`; full migration is out of scope — just fix dead links.)

- [ ] **Step 2:** Confirm `CategoryExplorer` is unused (`grep -rn CategoryExplorer app components`) and delete the file.

- [ ] **Step 3: Commit**

```bash
git rm components/services/CategoryExplorer.tsx
git add components/Header.tsx
git commit -m "chore(services): reconcile header links, remove unused CategoryExplorer"
```

### Task 15: Full build + smoke + preview sweep

- [ ] **Step 1:** `npm run build` — expect success, no references to deleted slugs.
- [ ] **Step 2:** `node --test --import tsx tests/services-taxonomy.test.ts tests/related-projects.test.ts` — expect PASS.
- [ ] **Step 3:** `npm run test:smoke` — expect existing smoke tests still pass.
- [ ] **Step 4: Preview sweep** (EN + `/ar/`): `/services` (grouped cards, no dropdown, no Explore block), `/services/answer-engine-optimization`, `/services/generative-engine-optimization`, `/services/search-engine-optimization`, `/website-development` (sub-service glow cards), one trimmed pillar, and a service page with related projects. Screenshot each; confirm RTL and no console errors.
- [ ] **Step 5: Final commit** if any fixes were needed.

---

## Self-Review (completed)

- **Spec coverage:** Req1 (remove Explore) → Task 7. Req2 (no dropdown) → Task 8. Req3 (cards on pillar pages) → Task 9. Req4 (big grouped cards) → Task 8. Req5 (data-driven projects) → Tasks 10–12b. Req6 (Get Found: del Local SEO, add AEO/GEO, SEO refresh) → Tasks 1–3, 5–6. Req7 (Engage&Convert keep only SMM) → Task 1. Req8 (delete Grow&Retain, move Content) → Task 1. Req9 (rename → Growth & Engagement) → Task 1. Cut-list → Tasks 1–3. Arabic parity → Tasks 1–3 (AR copy + AR prune). Redirect safety → Conventions + Task 4.
- **Placeholder scan:** content copy for AEO/GEO/SEO (Task 5) and backfill mapping (Task 12b) are authored during execution by design; everything else has concrete code.
- **Type consistency:** `relatedServiceSlugs: string[]` used consistently across collection field (text→split), `Project` type, normalizeProject, and `pickProjectsForService`. `GetFoundContent` shape consistent between data + component. `dpSlugify` identical in test, prune script, and existing `digital-presence-content.ts`.
