# Industries Signal Wall Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the orbit-based industries page with a bilingual Signal Wall, abstract placeholder visuals, varied industry atlas components, and natural Gulf-facing Arabic.

**Architecture:** Keep `IndustriesPageContent` as the localized content boundary and retain the route's metadata/schema ownership. Replace the hero implementation with a semantic interactive wall, refit the workbench and index around CSS-rendered diagrams, and centralize the visual language in the existing page CSS module.

**Tech Stack:** Next.js App Router, React, TypeScript, Framer Motion, Lucide React, CSS Modules, Node test runner.

## Global Constraints

- Use graphite, crisp white, electric lime, cobalt, and coral without gradients.
- Do not reuse any existing site photography; visual media must be CSS placeholder compositions.
- Arabic must read as natural Gulf-facing Modern Standard Arabic and render correctly in RTL.
- Preserve semantic controls, keyboard navigation, reduced-motion support, localized SEO, hreflang, and JSON-LD.
- Do not add a canvas, WebGL, or new runtime dependency.

---

### Task 1: Lock The New Contract With Tests

**Files:**
- Modify: `tests/industries-page-redesign.test.ts`

**Interfaces:**
- Consumes: source files for the industries route and components.
- Produces: assertions for `IndustrySignalWall`, placeholder-only media, Arabic copy quality, RTL styling, and reduced motion.

- [ ] **Step 1: Add failing source-contract assertions**

```ts
assert.match(experienceSource, /IndustrySignalWall/)
assert.doesNotMatch(signalWallSource, /next\/image|<Image/)
assert.match(arabicContent, /نحوّل تحديات قطاعك إلى تجربة رقمية/)
assert.match(styles, /--signal-lime:/)
assert.match(styles, /prefers-reduced-motion/)
```

- [ ] **Step 2: Run the focused test and confirm it fails**

Run: `node --test --import tsx tests/industries-page-redesign.test.ts`
Expected: FAIL because `IndustrySignalWall` and the new design tokens do not exist.

### Task 2: Rewrite The Content Boundary

**Files:**
- Modify: `lib/seo/industries-page.ts`
- Test: `tests/industries-page-redesign.test.ts`

**Interfaces:**
- Consumes: canonical `industrySlugs` and localized industry/service data.
- Produces: `IndustriesPageContent` with concise hero language, natural Arabic, sector signals, and no image dependency in rendered components.

- [ ] **Step 1: Rewrite Arabic page-level copy**

Use short Gulf-facing headlines such as:

```ts
title: 'نفهم تحديات قطاعك، ثم'
accent: 'نبني الحل حولها.'
description: 'نحوّل تحديات قطاعك إلى تجربة رقمية واضحة تربط العميل بالفريق والبيانات، من أول زيارة حتى إنجاز الخدمة.'
```

- [ ] **Step 2: Replace literal technical language**

Use Arabic terms such as `رحلة العميل`, `تدفق العمل`, `لوحة متابعة`, `تكامل الأنظمة`, and `نتيجة قابلة للقياس`. Avoid literal phrases including `القطاع النشط`, `الطباعة`, and `انضمام مالي`.

- [ ] **Step 3: Run the focused content test**

Run: `node --test --import tsx tests/industries-page-redesign.test.ts`
Expected: remaining failures are component/style assertions only.

### Task 3: Build The Industry Signal Wall

**Files:**
- Create: `components/industries/IndustrySignalWall.tsx`
- Modify: `components/industries/IndustriesExperience.tsx`
- Delete: `components/industries/IndustryNetwork.tsx`
- Test: `tests/industries-page-redesign.test.ts`

**Interfaces:**
- Consumes: `content`, `locale`, selected `IndustriesPageItem`, `onSelect`, and reduced-motion preference.
- Produces: a full-width semantic sector selector and selected-sector detail surface.

- [ ] **Step 1: Implement semantic channels**

```tsx
<div role="list" className={styles.signalChannels}>
  {content.industries.map((industry, index) => (
    <button
      key={industry.slug}
      type="button"
      aria-pressed={industry.slug === selected.slug}
      onClick={() => onSelect(industry.slug)}
    >
      <span>{String(index + 1).padStart(2, '0')}</span>
      <span>{industry.name}</span>
    </button>
  ))}
</div>
```

- [ ] **Step 2: Render the selected signal detail without images**

Use a CSS placeholder with sector initials, grid cells, signal bars, and status dots. Present pressure, system, outcome, and service links beside it.

- [ ] **Step 3: Wire the experience to `IndustrySignalWall`**

Replace the `IndustryNetwork` import and JSX call while retaining shared selection state with the workbench.

- [ ] **Step 4: Run the focused test**

Run: `node --test --import tsx tests/industries-page-redesign.test.ts`
Expected: signal-wall assertions pass.

### Task 4: Replace Workbench And Atlas Photography

**Files:**
- Modify: `components/industries/IndustryWorkbench.tsx`
- Modify: `components/industries/IndustriesIndex.tsx`
- Test: `tests/industries-page-redesign.test.ts`

**Interfaces:**
- Consumes: existing featured stories and all thirteen industry records.
- Produces: CSS workflow diagrams in the workbench and varied placeholder diagrams in the atlas.

- [ ] **Step 1: Replace workbench image with a workflow stage**

Render four numbered nodes connected by lines, sector initials, and live status labels. Preserve tab keyboard behavior and service links.

- [ ] **Step 2: Vary atlas visuals deterministically**

Select a visual treatment using `index % 4`: bars, grid, timeline, or nodes. Keep the same semantic industry article and localized route.

- [ ] **Step 3: Remove all `next/image` usage from industries components**

Run: `rg -n "next/image|<Image" components/industries`
Expected: no matches.

### Task 5: Apply The Signal Studio System

**Files:**
- Modify: `components/industries/industries-page.module.css`
- Modify: `app/(frontend)/[locale]/industries/page.tsx`

**Interfaces:**
- Consumes: class names emitted by the redesigned components.
- Produces: responsive LTR/RTL layout, channel motion, placeholder diagrams, strong focus states, and consistent page sections.

- [ ] **Step 1: Replace palette tokens**

```css
.page {
  --signal-graphite: #171717;
  --signal-paper: #ffffff;
  --signal-lime: #c7ff2f;
  --signal-cobalt: #2457f5;
  --signal-coral: #ff5c4d;
}
```

- [ ] **Step 2: Build channel and placeholder states**

Use fixed responsive dimensions, borders, transforms, and pseudo-elements. Do not use `linear-gradient`, `radial-gradient`, or photography backgrounds.

- [ ] **Step 3: Tune Arabic rhythm**

Set Arabic headings to `line-height: 1.35`, body copy to `line-height: 1.95`, remove uppercase transforms, and mirror directional layouts with logical properties.

- [ ] **Step 4: Add motion and reduced-motion fallback**

Use opacity, translate, scale, and signal-line animations. Disable animation and smooth scrolling inside `@media (prefers-reduced-motion: reduce)`.

### Task 6: Verify The Complete Page

**Files:**
- Test: `tests/industries-page-redesign.test.ts`
- Test: `tests/seo-expansion.test.ts`

**Interfaces:**
- Consumes: complete implementation.
- Produces: build and browser evidence.

- [ ] **Step 1: Run focused tests and TypeScript**

Run: `node --test --import tsx tests/industries-page-redesign.test.ts tests/seo-expansion.test.ts && npx tsc --noEmit`
Expected: all focused tests pass and TypeScript exits 0.

- [ ] **Step 2: Run production build**

Run: `npm run build`
Expected: build exits 0 and generates the localized industries routes.

- [ ] **Step 3: Verify in the browser**

Check `/industries` and `/ar/industries` at desktop and 390px mobile widths. Confirm one H1, 13 signal channels, 6 tabs, no horizontal overflow, no broken media, correct Arabic line-height, and keyboard selection.

- [ ] **Step 4: Verify all linked routes**

Use `curl` against all thirteen industry links and referenced service links in English and Arabic. Expected: every route returns HTTP 200.
