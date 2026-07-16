# Industries Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `/[locale]/industries` with a bilingual CloudTopia Precision industry network, interactive workbench, complete 13-industry index, substantial SEO content, and validated structured data.

**Architecture:** Keep metadata, JSON-LD, and all crawlable copy in the route server component. Put selection state, keyboard behavior, and Framer Motion transitions in one focused client experience composed from a typed bilingual content module. Reuse `lib/seo/industries.ts` as the canonical source for industry routes and details, and keep visual styling isolated in a page CSS module.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, CSS Modules, Framer Motion, Lucide React, Node test runner with `tsx`.

## Global Constraints

- Preserve the existing 13 canonical industry slugs and localized detail routes.
- English and Arabic must have equivalent visible content, metadata, internal links, and schema.
- Use the CloudTopia Precision palette: `#f7f9fc`, `#ffffff`, `#101828`, `#175cd3`, `#0b3b8f`, `#53b1fd`, `#d0d5dd`, `#eaecf0`, `#f04438`, `#039855`, and `#475467`.
- Use existing Hanken Grotesk, Fraunces, and Arabic font variables; never apply Latin italics to Arabic.
- Do not add a runtime dependency or change the global header/footer.
- Do not invent case studies, customer metrics, certifications, awards, or performance percentages.
- All interaction must work with keyboard, touch, RTL, and `prefers-reduced-motion`.
- All 13 industries and all important SEO content must remain visible and crawlable without client interaction.

---

## File Structure

- Create `lib/seo/industries-page.ts`: typed English/Arabic hub copy, featured story definitions, SEO metadata, FAQs, capability matrix, proof points, and helpers that merge hub copy with canonical industry data.
- Create `components/industries/IndustriesExperience.tsx`: client state, node selection, featured-story selection, keyboard tab behavior, and composition of network/workbench.
- Create `components/industries/IndustryNetwork.tsx`: semantic industry buttons and selected preview.
- Create `components/industries/IndustryWorkbench.tsx`: featured story tabs, stages, image, workflow, services, and CTA.
- Create `components/industries/IndustriesIndex.tsx`: crawlable 13-industry semantic index.
- Create `components/industries/industries-page.module.css`: complete CloudTopia Precision styling, responsive behavior, RTL, focus, and reduced-motion rules.
- Replace `app/(frontend)/[locale]/industries/page.tsx`: metadata, schema graph, server-rendered editorial sections, and component composition.
- Create `tests/industries-page-redesign.test.ts`: content completeness, route/schema ownership, semantic rendering, canonical links, RTL typography, and motion accessibility.

---

### Task 1: Define The Bilingual Page Contract

**Files:**
- Create: `lib/seo/industries-page.ts`
- Create: `tests/industries-page-redesign.test.ts`

**Interfaces:**
- Consumes: `industries`, `industrySlugs`, `localizedValue`, and `IndustryData` from `lib/seo/industries.ts`.
- Produces: `IndustriesPageContent`, `FeaturedIndustryStory`, `getIndustriesPageContent(locale)`, and `getIndustriesPageItems(locale)`.

- [ ] **Step 1: Write the failing content-contract test**

```ts
test('industries hub content is complete in English and Arabic', async () => {
  const modulePath = filePath('lib/seo/industries-page.ts')
  assert.ok(fs.existsSync(modulePath))
  const { getIndustriesPageContent } = await import(pathToFileURL(modulePath).href)

  for (const locale of ['en', 'ar'] as const) {
    const content = getIndustriesPageContent(locale)
    assert.equal(content.locale, locale)
    assert.equal(content.industries.length, 13)
    assert.equal(content.featuredStories.length, 6)
    assert.ok(content.guide.length >= 3)
    assert.ok(content.faqs.length >= 6)
    assert.ok(content.hero.description.length > 120)
  }
})
```

- [ ] **Step 2: Run the test and verify the module is missing**

Run: `node --test --import tsx tests/industries-page-redesign.test.ts`
Expected: FAIL because `lib/seo/industries-page.ts` does not exist.

- [ ] **Step 3: Implement the typed bilingual content module**

Define the public contract:

```ts
export type IndustriesLocale = 'en' | 'ar'

export type FeaturedIndustryStory = {
  slug: string
  image: string
  pressure: string
  workflow: string[]
  system: string
  outcome: string
}

export type IndustriesPageContent = {
  locale: IndustriesLocale
  hero: { eyebrow: string; title: string; accent: string; description: string }
  network: { label: string; coreLabel: string; exploreLabel: string }
  workbench: { eyebrow: string; title: string; description: string; stages: string[] }
  industries: IndustriesPageItem[]
  featuredStories: FeaturedIndustryStory[]
  capabilities: CapabilityRow[]
  guide: GuideSection[]
  proof: ProofItem[]
  faqs: Array<{ question: string; answer: string }>
  cta: { title: string; description: string; primary: string; secondary: string }
}
```

Use `industrySlugs.map` to generate exactly 13 localized `IndustriesPageItem` values from canonical data. Define featured stories for `healthcare`, `fintech`, `ecommerce-retail`, `real-estate`, `logistics-supply-chain`, and `government-public-sector`. Use only existing public image paths from the industry detail-page image map.

- [ ] **Step 4: Run the focused test**

Run: `node --test --import tsx tests/industries-page-redesign.test.ts`
Expected: PASS for the content-contract test.

- [ ] **Step 5: Commit the content contract**

```bash
git add lib/seo/industries-page.ts tests/industries-page-redesign.test.ts
git commit -m "feat(industries): define bilingual hub content"
```

---

### Task 2: Establish Route Metadata And Structured Data

**Files:**
- Modify: `app/(frontend)/[locale]/industries/page.tsx`
- Modify: `tests/industries-page-redesign.test.ts`

**Interfaces:**
- Consumes: `getIndustriesPageContent(locale)` and existing `canonicalUrl`, `localePath`, `JsonLd`, `buildBreadcrumbSchema`, and organization identity helpers.
- Produces: localized metadata and one JSON-LD `@graph` covering `CollectionPage`, `BreadcrumbList`, `ItemList`, and `FAQPage`.

- [ ] **Step 1: Add failing route/SEO assertions**

```ts
test('industries route owns localized metadata and schema', () => {
  const source = read('app/(frontend)/[locale]/industries/page.tsx')
  assert.match(source, /canonicalUrl\(locale, ['"]\/industries['"]\)/)
  assert.match(source, /['"]x-default['"]/)
  assert.match(source, /openGraph/)
  assert.match(source, /twitter/)
  for (const type of ['CollectionPage', 'BreadcrumbList', 'ItemList', 'FAQPage']) {
    assert.match(source, new RegExp(`['"]@type['"]:\\s*['"]${type}`))
  }
})
```

- [ ] **Step 2: Run the focused test and confirm failure**

Run: `node --test --import tsx tests/industries-page-redesign.test.ts`
Expected: FAIL because the route lacks the complete schema graph and social metadata.

- [ ] **Step 3: Replace metadata generation and build the schema graph**

Use localized page content for title, description, and social copy. Build absolute localized industry URLs for all 13 `ItemList` entries. Render through the existing `JsonLd` component. Build FAQ schema only from visible `content.faqs`.

The route must retain `applySeoOverride(meta, locale, 'industries')` after constructing the complete static fallback metadata.

- [ ] **Step 4: Render the server-owned page shell**

The server route resolves locale, loads `IndustriesPageContent`, renders `PageBreadcrumbs`, `IndustriesExperience`, the transformation guide, proof band, visible FAQ `<details>`, and consultation CTA. Use `/api/whatsapp?locale=${locale}` for the primary conversion path and localized `/contact` for the secondary path.

- [ ] **Step 5: Run route/SEO tests and TypeScript**

Run: `node --test --import tsx tests/industries-page-redesign.test.ts && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 6: Commit route SEO**

```bash
git add 'app/(frontend)/[locale]/industries/page.tsx' tests/industries-page-redesign.test.ts
git commit -m "feat(industries): add hub metadata and schema"
```

---

### Task 3: Build The Interactive Industry Network

**Files:**
- Create: `components/industries/IndustriesExperience.tsx`
- Create: `components/industries/IndustryNetwork.tsx`
- Modify: `tests/industries-page-redesign.test.ts`

**Interfaces:**
- Consumes: `IndustriesPageContent`, `IndustriesPageItem`, locale, and `FeaturedIndustryStory`.
- Produces: `<IndustriesExperience content={content} />` and `<IndustryNetwork content={content} selected={selected} onSelect={setSelectedSlug} reducedMotion={shouldReduceMotion} />`.

- [ ] **Step 1: Add failing semantic and accessibility assertions**

```ts
test('industry network uses semantic controls and localized routes', () => {
  const source = read('components/industries/IndustryNetwork.tsx')
  assert.match(source, /<button/)
  assert.match(source, /aria-pressed=/)
  assert.match(source, /localePath\(locale, `\/industries\/\$\{selected\.slug\}`\)/)
  assert.doesNotMatch(source, /<div[^>]+onClick=/)
})
```

- [ ] **Step 2: Run the test and confirm missing components**

Run: `node --test --import tsx tests/industries-page-redesign.test.ts`
Expected: FAIL because the component files do not exist.

- [ ] **Step 3: Implement `IndustryNetwork`**

Render all 13 industries as buttons with `aria-pressed`, stable positions/classes, localized names, and workflow labels. Render a CloudTopia core control as a noninteractive labeled element. Render the selected preview with a real image, description, first problem, representative outcome, and localized detail-page link.

- [ ] **Step 4: Implement client selection state in `IndustriesExperience`**

Initialize `selectedSlug` to `healthcare`. Derive the selected item from `content.industries`. Use `useReducedMotion()` to disable nonessential transitions. Pass locale and selection handlers to the network and workbench.

- [ ] **Step 5: Run tests and TypeScript**

Run: `node --test --import tsx tests/industries-page-redesign.test.ts && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 6: Commit the network experience**

```bash
git add components/industries/IndustriesExperience.tsx components/industries/IndustryNetwork.tsx tests/industries-page-redesign.test.ts
git commit -m "feat(industries): build interactive sector network"
```

---

### Task 4: Build The Industry Workbench And Complete Index

**Files:**
- Create: `components/industries/IndustryWorkbench.tsx`
- Create: `components/industries/IndustriesIndex.tsx`
- Modify: `components/industries/IndustriesExperience.tsx`
- Modify: `tests/industries-page-redesign.test.ts`

**Interfaces:**
- Consumes: featured stories, canonical industry items, locale, active slug, and selection callback.
- Produces: keyboard-accessible featured-industry tablist, workflow stage display, service links, and a crawlable 13-item index.

- [ ] **Step 1: Add failing workbench/index assertions**

```ts
test('workbench and index expose all industries and service paths', () => {
  const workbench = read('components/industries/IndustryWorkbench.tsx')
  const index = read('components/industries/IndustriesIndex.tsx')
  assert.match(workbench, /role=["']tablist["']/)
  assert.match(workbench, /Home/)
  assert.match(workbench, /End/)
  assert.match(workbench, /serviceLinks\.map/)
  assert.match(index, /industries\.map/)
  assert.match(index, /localePath\(locale, `\/industries\/\$\{industry\.slug\}`\)/)
})
```

- [ ] **Step 2: Run the focused test and confirm failure**

Run: `node --test --import tsx tests/industries-page-redesign.test.ts`
Expected: FAIL because workbench and index components do not exist.

- [ ] **Step 3: Implement `IndustryWorkbench`**

Use a six-item tablist. Arrow keys move visually left/right and reverse appropriately for RTL. Home and End select the first and last story. The panel renders the active story image, pressure, four workflow steps, system, outcome, localized service links from the canonical industry item, and the localized playbook CTA.

- [ ] **Step 4: Implement `IndustriesIndex`**

Render one semantic `<article>` per industry inside a section with heading and explanation. Include workflow, unique description, two problems, up to three service labels, and a descriptive localized link. Do not hide index copy behind interaction.

- [ ] **Step 5: Compose both components in `IndustriesExperience`**

Keep network and workbench selection synchronized when the selected industry is one of the six featured stories. Selecting a nonfeatured network node updates only the network preview and leaves the workbench on its current featured story.

- [ ] **Step 6: Run tests and TypeScript**

Run: `node --test --import tsx tests/industries-page-redesign.test.ts && npx tsc --noEmit`
Expected: PASS.

- [ ] **Step 7: Commit the workbench and index**

```bash
git add components/industries/IndustryWorkbench.tsx components/industries/IndustriesIndex.tsx components/industries/IndustriesExperience.tsx tests/industries-page-redesign.test.ts
git commit -m "feat(industries): add workbench and full sector index"
```

---

### Task 5: Apply CloudTopia Precision Styling And Motion

**Files:**
- Create: `components/industries/industries-page.module.css`
- Modify: `components/industries/IndustriesExperience.tsx`
- Modify: `components/industries/IndustryNetwork.tsx`
- Modify: `components/industries/IndustryWorkbench.tsx`
- Modify: `components/industries/IndustriesIndex.tsx`
- Modify: `app/(frontend)/[locale]/industries/page.tsx`
- Modify: `tests/industries-page-redesign.test.ts`

**Interfaces:**
- Consumes: semantic class hooks from all page components.
- Produces: stable desktop/mobile layouts, G visual system, RTL typography, focus states, and reduced-motion fallbacks.

- [ ] **Step 1: Add failing style assertions**

```ts
test('industries styling implements precision palette, RTL leading, and reduced motion', () => {
  const styles = read('components/industries/industries-page.module.css')
  for (const color of ['#f7f9fc', '#101828', '#175cd3', '#53b1fd', '#f04438']) {
    assert.match(styles.toLowerCase(), new RegExp(color))
  }
  assert.match(styles, /\.page\[dir='rtl'\]/)
  assert.match(styles, /prefers-reduced-motion/)
  assert.match(styles, /focus-visible/)
  assert.match(styles, /min-height:\s*44px/)
})
```

- [ ] **Step 2: Run the focused test and confirm failure**

Run: `node --test --import tsx tests/industries-page-redesign.test.ts`
Expected: FAIL because the CSS module does not exist.

- [ ] **Step 3: Implement the page variables and layout**

Define the exact palette variables from Global Constraints. Style the hero as a bright architectural grid with stable network geometry, framed selected preview, technical labels, and restrained shadows. Use a maximum `8px` radius for functional frames. Give network/workbench scenes stable aspect ratios.

- [ ] **Step 4: Implement responsive and RTL behavior**

At tablet/mobile widths, turn the network into a horizontally scrollable node rail plus a full-width selected preview rather than compressing the orbit. Mirror directional controls and alignment with logical CSS properties. Apply Arabic display, heading, card, and copy line heights of at least `1.3`, `1.36`, `1.65`, and `2.0` respectively.

- [ ] **Step 5: Implement motion and accessibility styling**

Add node entrance, connection-path, preview, ticker, and section-reveal classes. Disable continuous animation and shorten transitions inside `@media (prefers-reduced-motion: reduce)`. Ensure fixed dimensions prevent hover and active states from shifting layout.

- [ ] **Step 6: Run tests, TypeScript, and diff checks**

Run: `node --test --import tsx tests/industries-page-redesign.test.ts && npx tsc --noEmit && git diff --check`
Expected: PASS.

- [ ] **Step 7: Commit styling**

```bash
git add components/industries app/'(frontend)'/'[locale]'/industries/page.tsx tests/industries-page-redesign.test.ts
git commit -m "feat(industries): apply precision visual system"
```

---

### Task 6: Verify SEO, Rendering, Accessibility, And Production Build

**Files:**
- Modify only if verification finds a scoped defect in the files from Tasks 1-5.

**Interfaces:**
- Consumes: completed route and test suite.
- Produces: verified English/Arabic desktop/mobile page and documented residual risks.

- [ ] **Step 1: Run focused and relevant repository tests**

Run:

```bash
node --test --import tsx tests/industries-page-redesign.test.ts
npm run test:smoke
```

Expected: focused tests PASS. Record any pre-existing unrelated smoke failure separately rather than modifying unrelated modules.

- [ ] **Step 2: Run static verification**

Run:

```bash
npx tsc --noEmit
git diff --check
npm run build
```

Expected: TypeScript and production build PASS; all localized routes are generated without route/export errors.

- [ ] **Step 3: Start a free local development port**

Run: `npx next dev --webpack --hostname 0.0.0.0 --port 3002`
Expected: server reports Ready and both `/industries` and `/ar/industries` return HTTP 200.

- [ ] **Step 4: Verify desktop English and Arabic in the browser**

At approximately `1440x900`, verify:

- One visible H1
- All 13 network nodes and index items
- Network selection and six workbench tabs
- Keyboard arrows, Home, End, and focus visibility
- Canonical/hreflang and JSON-LD parseability
- No broken images, console errors, overlap, or horizontal overflow
- Arabic RTL alignment and spacious leading

- [ ] **Step 5: Verify mobile English and Arabic**

At approximately `390x844`, verify node rail scrolling, selected preview, workbench controls, index readability, CTA fit, image framing, and zero horizontal page overflow.

- [ ] **Step 6: Verify reduced motion**

Emulate `prefers-reduced-motion: reduce` and verify ticker/path animations stop while selection, links, and all visible content remain functional.

- [ ] **Step 7: Commit any scoped verification fixes**

```bash
git add 'app/(frontend)/[locale]/industries/page.tsx' components/industries lib/seo/industries-page.ts tests/industries-page-redesign.test.ts
git commit -m "fix(industries): resolve final visual verification issues"
```

- [ ] **Step 8: Leave the preview server running and report results**

Report the local URL, focused test result, TypeScript result, production build result, rendered SEO/schema checks, and any unrelated pre-existing suite failure.
