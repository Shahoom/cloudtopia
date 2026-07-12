# CloudTopia Industry Atlas Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the Signal Wall with a bright editorial Industry Atlas while preserving bilingual SEO and linking every sector to relevant CloudTopia services.

**Architecture:** Keep `IndustriesPageContent` as the server-owned localization boundary. Move sector selection into a URL-aware client experience, replace the hero component, and refit the existing workbench and index components so each remains independently testable.

**Tech Stack:** Next.js App Router, React, TypeScript, Framer Motion, Lucide React, CSS Modules, Node test runner.

## Global Constraints

- Modify only Industries route, content, components, and tests.
- Use CloudTopia eerie navy, indigo, cobalt, sky, white, and controlled coral.
- Use CSS placeholders only; no site photography or new media downloads.
- Preserve semantic controls, RTL, keyboard navigation, reduced motion, metadata, hreflang, and JSON-LD.
- Do not introduce a new dependency, canvas, WebGL, or SVG hero illustration.

---

### Task 1: Define The Atlas Contract

**Files:**
- Modify: `tests/industries-page-redesign.test.ts`

**Interfaces:**
- Consumes: Industries source files.
- Produces: assertions for `IndustryAtlasHero`, URL state, localized visible labels, full-width index rows, safe areas, and the CloudTopia palette.

- [ ] Replace Signal Wall assertions with Atlas assertions.
- [ ] Assert `window.history.pushState` or `replaceState` and `popstate` handling.
- [ ] Assert no `LIVE SIGNAL` or `CT / INDUSTRIES` string exists in visible components.
- [ ] Run `node --test --import tsx tests/industries-page-redesign.test.ts`; expect failure before implementation.

### Task 2: Build URL-Aware Atlas Selection

**Files:**
- Modify: `components/industries/IndustriesExperience.tsx`
- Create: `components/industries/IndustryAtlasHero.tsx`
- Delete: `components/industries/IndustrySignalWall.tsx`

**Interfaces:**
- `IndustriesExperience` owns `selectedSlug`, validates `?industry=<slug>`, responds to `popstate`, and updates the query without scrolling.
- `IndustryAtlasHero` consumes `content`, `locale`, `selected`, `onSelect`, and `reducedMotion`.

- [ ] Read a valid initial query in an effect and select it.
- [ ] Update URL selection through `window.history.pushState`.
- [ ] Implement native buttons with arrow, Home, and End navigation.
- [ ] Render one H1, a full-bleed CSS atlas field, and selected-sector pressure/system/outcome copy.
- [ ] Keep all service and industry destinations as `Link` components.

### Task 3: Recompose Featured Stories And The Complete Index

**Files:**
- Modify: `components/industries/IndustryWorkbench.tsx`
- Modify: `components/industries/IndustriesIndex.tsx`

**Interfaces:**
- Workbench remains a six-tab component and receives the active slug from the shared experience.
- Index renders all 13 industries as semantic full-width articles with real links.

- [ ] Recompose the workbench as an editorial spread with a large sector title, four-step path, and outcome/service rail.
- [ ] Replace atlas cards with numbered rows that reveal an abstract field and supporting content.
- [ ] Remove dashboard terminology and hardcoded English visual labels.

### Task 4: Replace The Page Visual System

**Files:**
- Modify: `components/industries/industries-page.module.css`
- Modify: `app/(frontend)/[locale]/industries/page.tsx`

**Interfaces:**
- Produces every class used by the Atlas hero, featured spread, index rows, capability router, guide, proof, FAQ, and CTA.

- [ ] Replace Signal Wall selectors with Atlas selectors.
- [ ] Build the bright editorial layout using stable grids, logical properties, and safe-area padding.
- [ ] Use only transform and opacity for animation.
- [ ] Preserve 44px targets, focus-visible treatment, Arabic leading, mobile overflow protection, and reduced motion.
- [ ] Update the skip link target to the atlas index.

### Task 5: Verify The Redesign

**Files:**
- Test: `tests/industries-page-redesign.test.ts`
- Test: `tests/seo-expansion.test.ts`

**Interfaces:**
- Consumes the completed page.
- Produces test, build, browser, and route evidence.

- [ ] Run focused tests and `git diff --check`.
- [ ] Run `npm run build`; expect all 348 pages and TypeScript to pass.
- [ ] Check English and Arabic at desktop and 390px mobile.
- [ ] Verify one H1, 13 sector controls, six tabs, zero page overflow, URL state, and RTL keyboard behavior.
- [ ] Verify all 40 English/Arabic industry and linked service routes return HTTP 200.
