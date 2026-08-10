# CloudTopia Performance Remediation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Remove the production audit's mobile LCP, bundle, CSS, font, hydration, and long-running animation defects while preserving CloudTopia's current visual design in English and Arabic.

**Architecture:** Keep semantic content server-rendered and isolate animation into small client enhancements. Route data is resolved on the server, only active-locale/client-safe data crosses the RSC boundary, and expensive visual systems activate only after viewport relevance and interaction. Static route entrypoints isolate bespoke industry CSS and sub-service renderer families.

**Tech Stack:** Next.js 16.2 App Router, React 19.2, TypeScript 6, Tailwind CSS 3.4, Framer Motion 12, React Three Fiber 9, Node's built-in test runner, Vercel Agent Browser, PageSpeed Insights.

## Global Constraints

- Preserve existing brand, copy, canonical URLs, metadata, CTA behavior, RTL behavior, and recognizable animation/3D design.
- Do not remove all animation or replace approved page experiences with generic static layouts.
- Do not add a new runtime dependency unless an existing platform API cannot satisfy the requirement.
- Do not call `headers()`, `cookies()`, or `connection()` from the public frontend layout; all public pages must remain statically renderable.
- Do not move the Vercel region or delete public assets in this program.
- A third-party failure must never block content, navigation, or forms.
- Lighthouse scores are reported from three-run medians; a single score is not a deterministic release gate.
- Every task uses a red-green-refactor loop and ends with an independently reviewable commit.

## File and Responsibility Map

- `hooks/useDeferredInteraction.ts`: activates nonessential hero changes only after real input, with a long fallback for noninteractive sessions.
- `lib/performance/animation-policy.ts`: pure activity decision used by tests and animation hooks.
- `hooks/useAnimationActivity.ts`: IntersectionObserver, document visibility, and reduced-motion adapter for visual effects.
- `lib/services/service-category-index.ts`: small bilingual service-category labels safe for Contact and global UI.
- `lib/services/subservice-nav-index.ts`: generated compact bilingual sub-service names/descriptions/hrefs without importing full page copy.
- `scripts/generate-subservice-nav-index.ts`: deterministic generator for the compact navigation index.
- `app/(frontend)/[locale]/industries/_shared/industry-route.tsx`: metadata/schema/render plumbing shared by route-isolated industry entries.
- `app/(frontend)/[locale]/services/_shared/nested-service-route.tsx`: schema/breadcrumb/render plumbing shared by branch-specific nested service routes.
- `tests/performance-images.test.ts`: image, LCP-stability, and preload contracts.
- `tests/performance-data-boundaries.test.ts`: active-locale and compact-content boundary contracts.
- `tests/performance-animation-lifecycle.test.ts`: pure animation policy plus cleanup/visibility source contracts.
- `tests/performance-route-isolation.test.ts`: industry CSS and nested-renderer isolation contracts.
- `tests/performance-global-shell.test.ts`: font, chatbot, Clutch, CSP, DMCA, and WhatsApp prefetch contracts.
- `scripts/measure-route-assets.mjs`: deterministic post-build HTML/CSS/JS/font resource inventory for representative routes.

---

### Task 1: Stable Website Development LCP and responsive hero images

**Files:**
- Create: `hooks/useDeferredInteraction.ts`
- Create: `tests/performance-images.test.ts`
- Modify: `components/ui/text-rotate.tsx`
- Modify: `app/(frontend)/[locale]/services/website-development/WebsiteDesignClient.tsx:1-210`
- Modify: `app/(frontend)/[locale]/services/website-development/page.tsx`

**Interfaces:**
- Produces: `useDeferredInteraction(fallbackMs?: number): boolean`.
- Produces: `TextRotateProps.active?: boolean`; when false, index zero remains stable and no interval exists.
- Consumes: the six existing `/images/services/website-design/*` sources and their measured intrinsic dimensions.

- [ ] **Step 1: Write the failing image/LCP contract**

```ts
// tests/performance-images.test.ts
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = (file: string) => readFileSync(file, 'utf8')

test('website hero uses optimized images and defers rotating LCP text', () => {
  const page = source('app/(frontend)/[locale]/services/website-development/WebsiteDesignClient.tsx')
  assert.match(page, /import Image from ['"]next\/image['"]/)
  assert.match(page, /motion\.create\(Image\)/)
  assert.doesNotMatch(page, /<motion\.img/)
  assert.match(page, /useDeferredInteraction/)
  assert.match(page, /active=\{enhancementsActive\}/)
})

test('TextRotate does not schedule rotation while inactive', () => {
  const rotate = source('components/ui/text-rotate.tsx')
  assert.match(rotate, /active\?: boolean/)
  assert.match(rotate, /if \(!auto \|\| !active\) return/)
})
```

- [ ] **Step 2: Run the focused test and confirm the current implementation fails**

Run: `node --test --import tsx tests/performance-images.test.ts`

Expected: failures for missing `next/image`, `useDeferredInteraction`, and `TextRotate.active`.

- [ ] **Step 3: Implement deferred enhancement activation**

```ts
// hooks/useDeferredInteraction.ts
'use client'

import { useEffect, useState } from 'react'

const EVENTS = ['pointerdown', 'keydown', 'touchstart', 'scroll'] as const

export function useDeferredInteraction(fallbackMs = 30_000): boolean {
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (active) return
    const activate = () => setActive(true)
    for (const event of EVENTS) window.addEventListener(event, activate, { once: true, passive: true })
    const timeout = window.setTimeout(activate, fallbackMs)
    return () => {
      window.clearTimeout(timeout)
      for (const event of EVENTS) window.removeEventListener(event, activate)
    }
  }, [active, fallbackMs])

  return active
}
```

- [ ] **Step 4: Make `TextRotate` stable until activation**

Add `active?: boolean` to `TextRotateProps`, default it to `true`, and change the interval effect to:

```ts
useEffect(() => {
  if (!auto || !active) return
  const intervalId = window.setInterval(next, rotationInterval)
  return () => window.clearInterval(intervalId)
}, [next, rotationInterval, auto, active])
```

- [ ] **Step 5: Replace the five raw hero images with animated Next Images**

Use `const MotionImage = motion.create(Image)`, measured source dimensions, `quality={60}`, and accurate `sizes`. Keep the current CSS classes and motion transitions. The source metadata is:

```ts
const exampleImages = [
  { url: '/images/services/website-design/1.avif', title: 'Website Design Example 1', width: 2564, height: 3205, sizes: '(max-width: 640px) 64px, (max-width: 1024px) 112px, 128px' },
  { url: '/images/services/website-design/2.avif', title: 'Website Design Example 2', width: 2426, height: 1728, sizes: '(max-width: 640px) 160px, (max-width: 1024px) 224px, 240px' },
  { url: '/images/services/website-design/3.avif', title: 'Website Design Example 3', width: 2670, height: 1780, sizes: '(max-width: 640px) 160px, (max-width: 1024px) 240px, 256px' },
  { url: '/images/services/website-design/4.avif', title: 'Website Design Example 4', width: 2436, height: 1921, sizes: '(max-width: 640px) 160px, (max-width: 1024px) 240px, 256px' },
  { url: '/images/services/website-design/5.avif', title: 'Website Design Example 5', width: 2669, height: 1782, sizes: '(max-width: 640px) 176px, (max-width: 1024px) 288px, 320px' },
  { url: '/images/services/website-design/6.jpg', title: 'Website Design Example 6', width: 2560, height: 1708, sizes: '100vw' },
] as const
```

Set `const enhancementsActive = useDeferredInteraction()` and pass `active={enhancementsActive}` to `TextRotate`. Keep the first text visible in server output.

- [ ] **Step 6: Run tests and production-build the focused route**

Run: `node --test --import tsx tests/performance-images.test.ts`

Run: `npm run build`

Expected: both commands exit 0 and the Website Development route is listed as SSG.

- [ ] **Step 7: Commit the Website Development remediation**

```bash
git add hooks/useDeferredInteraction.ts tests/performance-images.test.ts components/ui/text-rotate.tsx 'app/(frontend)/[locale]/services/website-development/WebsiteDesignClient.tsx' 'app/(frontend)/[locale]/services/website-development/page.tsx'
git commit -m "perf: stabilize website development LCP"
```

---

### Task 2: Stable Restaurant QR first render and viewport-correct gallery

**Files:**
- Create: `app/(frontend)/[locale]/restaurant-qr-menu/RestaurantQRHeroGallery.tsx`
- Create: `scripts/normalize-service-images.mjs`
- Modify: `app/(frontend)/[locale]/restaurant-qr-menu/RestaurantQRMenuClient.tsx:1-320`
- Modify in place: `public/images/services/restaurant-qr-menu/4.avif`
- Modify in place: `public/images/services/restaurant-qr-menu/5.avif`
- Modify in place: `public/images/services/restaurant-qr-menu/6.avif`
- Modify: `tests/performance-images.test.ts`

**Interfaces:**
- Consumes: `useDeferredInteraction()` from Task 1.
- Produces: `RestaurantQRHeroGallery({ locale }: { locale: string })`, which renders one optimized stable image before enhancement and only one viewport-specific gallery afterward.

- [ ] **Step 1: Add failing QR contracts**

```ts
test('QR hero has a stable optimized first image and no desktop-first state', () => {
  const client = source('app/(frontend)/[locale]/restaurant-qr-menu/RestaurantQRMenuClient.tsx')
  const gallery = source('app/(frontend)/[locale]/restaurant-qr-menu/RestaurantQRHeroGallery.tsx')
  assert.doesNotMatch(client, /useState<boolean>\(false\)/)
  assert.doesNotMatch(client, /<motion\.img/)
  assert.match(gallery, /import Image from ['"]next\/image['"]/)
  assert.match(gallery, /useDeferredInteraction/)
  assert.match(gallery, /matchMedia\(['"]\(max-width: 767px\)['"]\)/)
  assert.match(gallery, /document\.visibilityState/)
})

test('QR files use the image format declared by their extension', async () => {
  const sharp = (await import('sharp')).default
  for (const file of ['4.avif', '5.avif', '6.avif']) {
    const metadata = await sharp(`public/images/services/restaurant-qr-menu/${file}`).metadata()
    assert.equal(metadata.format, 'heif', file)
  }
})
```

- [ ] **Step 2: Run the test and verify red state**

Run: `node --test --import tsx tests/performance-images.test.ts`

Expected: missing gallery module or assertions fail against the desktop-first implementation.

- [ ] **Step 3: Extract the gallery and preserve the initial frame**

`RestaurantQRHeroGallery` must initially render `/images/services/restaurant-qr-menu/1.webp` through `Image` with `width={1275}`, `height={800}`, `sizes="(max-width: 767px) 90vw, 100vw"`, `quality={65}`, and `fetchPriority="high"`. After `useDeferredInteraction()` returns true, evaluate `matchMedia('(max-width: 767px)')` and mount exactly one of `MobileImageCarousel` or the existing desktop `ContainerScroll` gallery.

- [ ] **Step 4: Normalize mislabeled QR assets without changing public URLs**

Use the installed `sharp` package in `scripts/normalize-service-images.mjs`. Read each source before overwriting, write AVIF quality 60 to a sibling temporary file, then atomically rename it over the explicit target. The three current mismatches are `4.avif` (WebP payload), `5.avif` (PNG payload), and `6.avif` (JPEG payload). Run the script once, inspect dimensions, and commit the normalized assets; the script must refuse any path outside the three-element allowlist.

- [ ] **Step 5: Make carousel timers visibility-safe**

The carousel effect must schedule only while `document.visibilityState === 'visible'`, remove its `visibilitychange` listener, and clear its interval on every cleanup. Use `motion.create(Image)` for changing images with explicit dimensions and `sizes="90vw"`.

- [ ] **Step 6: Remove viewport guessing from the page client**

Delete `isMobile`, its resize effect, and both inline gallery branches from `RestaurantQRMenuClient`. Render `<RestaurantQRHeroGallery locale={locale} />` in the same visual location.

- [ ] **Step 7: Verify the focused tests and build**

Run: `node scripts/normalize-service-images.mjs --check`

Run: `node --test --import tsx tests/performance-images.test.ts`

Run: `npm run build`

Expected: exit 0; `/[locale]/restaurant-qr-menu` remains SSG.

- [ ] **Step 8: Commit the QR remediation**

```bash
git add 'app/(frontend)/[locale]/restaurant-qr-menu/RestaurantQRHeroGallery.tsx' 'app/(frontend)/[locale]/restaurant-qr-menu/RestaurantQRMenuClient.tsx' scripts/normalize-service-images.mjs public/images/services/restaurant-qr-menu/4.avif public/images/services/restaurant-qr-menu/5.avif public/images/services/restaurant-qr-menu/6.avif tests/performance-images.test.ts
git commit -m "perf: defer QR gallery enhancement"
```

---

### Task 3: Active-locale context, compact service indexes, and Contact bundle repair

**Files:**
- Create: `lib/services/service-category-index.ts`
- Create: `lib/services/subservice-nav-index.ts`
- Create: `scripts/generate-subservice-nav-index.ts`
- Create: `tests/performance-data-boundaries.test.ts`
- Modify: `lib/i18n/LanguageContext.tsx`
- Modify: `lib/seo/services.ts:1-100`
- Modify: `lib/services/pillar-subservices-localized.ts`
- Modify: `components/home/ServicesGrid.tsx`
- Modify: `components/services/DetailedServicesSection.tsx`
- Modify: `app/(frontend)/[locale]/contact/page.tsx`
- Modify: `app/(frontend)/[locale]/contact/ContactClient.tsx`
- Modify: `app/(frontend)/[locale]/HomePageClient.tsx`
- Modify: `app/(frontend)/[locale]/page.tsx`
- Modify: `package.json`

**Interfaces:**
- Produces: `SERVICE_CATEGORY_OPTIONS: readonly { slug: string; name: { en: string; ar: string } }[]`.
- Produces: `getSubserviceNavItems(pillarSlug: string, locale: Locale, limit?: number): readonly SubserviceNavItem[]`.
- Changes: `ContactClient` receives `{ locale, copy, serviceOptions }` rather than a whole-site dictionary.
- Changes: `LanguageProvider.initialDictionary` becomes required and stores one `Translations` value, not `Record<Locale, Translations>`.

- [ ] **Step 1: Write failing data-boundary tests**

```ts
// tests/performance-data-boundaries.test.ts
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { SERVICE_CATEGORY_OPTIONS } from '../lib/services/service-category-index.ts'
import { getSubserviceNavItems } from '../lib/services/subservice-nav-index.ts'

const source = (file: string) => readFileSync(file, 'utf8')

test('LanguageContext ships only its required active dictionary', () => {
  const context = source('lib/i18n/LanguageContext.tsx')
  assert.doesNotMatch(context, /from ['"]\.\/translations\/(en|ar)['"]/)
  assert.doesNotMatch(context, /Record<Locale, Translations>/)
  assert.match(context, /useMemo/)
})

test('Contact imports the compact category index, not SEO content', () => {
  const contact = source('app/(frontend)/[locale]/contact/ContactClient.tsx')
  assert.match(contact, /service-category-index/)
  assert.doesNotMatch(contact, /@\/lib\/seo\/services/)
  assert.doesNotMatch(contact, /pageT \|\| contextT/)
  assert.match(source('app/(frontend)/[locale]/contact/page.tsx'), /copy=\{dictionary\.contact\}/)
  assert.equal(SERVICE_CATEGORY_OPTIONS.length, 7)
})

test('client navigation helpers do not import full content databases', () => {
  for (const file of [
    'lib/services/pillar-subservices-localized.ts',
    'components/home/ServicesGrid.tsx',
    'components/services/DetailedServicesSection.tsx',
  ]) {
    const code = source(file)
    assert.doesNotMatch(code, /business-systems-content|digital-presence-content/)
  }
  assert.ok(getSubserviceNavItems('website-development', 'ar').length > 0)
})

test('homepage does not serialize its full dictionary twice', () => {
  assert.doesNotMatch(source('app/(frontend)/[locale]/page.tsx'), /serverDictionary=/)
  assert.doesNotMatch(source('app/(frontend)/[locale]/HomePageClient.tsx'), /serverDictionary/)
})
```

- [ ] **Step 2: Run the test and verify current imports fail it**

Run: `node --test --import tsx tests/performance-data-boundaries.test.ts`

Expected: module-not-found for the indexes or assertions fail against the current heavy imports.

- [ ] **Step 3: Extract the compact category index**

Move the seven category names into `service-category-index.ts`; import the names from that module in `lib/seo/services.ts` so Contact and SEO share one source. Contact maps the compact constant directly:

```ts
options={SERVICE_CATEGORY_OPTIONS.map(({ slug, name }) => ({
  value: slug,
  label: name[locale === 'ar' ? 'ar' : 'en'],
}))}
```

Change `ContactClient` to accept the exact boundary below. The server page passes `dictionary.contact`, the active locale, and already localized options; the client no longer accepts `t?: any` or falls back to the whole context dictionary.

```ts
type ContactClientProps = {
  locale: Locale
  copy: TranslationDictionary['contact']
  serviceOptions: readonly { value: string; label: string }[]
}
```

- [ ] **Step 4: Generate and consume the sub-service navigation index**

The generator imports the server content sources, emits a sorted TypeScript literal containing only `pillarSlug`, `slug`, `name`, optional one-sentence description, and canonical `href`, and writes `lib/services/subservice-nav-index.ts`. The generated module imports only `type Locale` and exports:

```ts
export type SubserviceNavItem = { slug: string; name: string; description?: string; href: string }
export function getSubserviceNavItems(pillarSlug: string, locale: Locale, limit?: number): readonly SubserviceNavItem[]
```

Add `"generate:service-nav": "node --import tsx scripts/generate-subservice-nav-index.ts"` to `package.json`. Replace the three client-side full-content imports with this index.

- [ ] **Step 5: Remove both-locale runtime imports from LanguageContext**

Use a type-only dictionary definition, initialize one dictionary from the required prop, derive URL locale without a mounted state, update the active dictionary when the prop changes, and memoize the provider value:

```ts
type Translations = typeof import('./translations/en').en
const [dictionary, setDictionary] = useState(initialDictionary)

useEffect(() => setDictionary(initialDictionary), [initialDictionary])

const value = useMemo<LanguageContextType>(() => ({
  locale,
  setLocale,
  t: dictionary,
  dir: localeDirection[locale],
  design,
  navigation,
  settings,
}), [locale, setLocale, dictionary, design, navigation, settings])
```

Wrap `setLocale` in `useCallback`; remove the redundant `mounted` and prop-reset effects while retaining document `lang`, `dir`, cookie, localStorage, and CMS theme behavior.

- [ ] **Step 6: Remove the duplicate homepage dictionary prop**

Use context `t` in `HomePageClient`, keep server-only schema/featured extraction in `page.tsx`, and pass only `articlePosts` plus the already filtered project summaries required by client cards. Do not pass `homepageDictionary` into the client a second time.

- [ ] **Step 7: Run generator, tests, smoke suite, and build**

Run: `npm run generate:service-nav`

Run: `node --test --import tsx tests/performance-data-boundaries.test.ts`

Run: `npm run test:smoke`

Run: `npm run build`

Expected: all commands exit 0 and generated index diff is deterministic on a second generator run.

- [ ] **Step 8: Commit compact client data**

```bash
git add package.json scripts/generate-subservice-nav-index.ts lib/services/service-category-index.ts lib/services/subservice-nav-index.ts lib/i18n/LanguageContext.tsx lib/seo/services.ts lib/services/pillar-subservices-localized.ts components/home/ServicesGrid.tsx components/services/DetailedServicesSection.tsx 'app/(frontend)/[locale]/contact/page.tsx' 'app/(frontend)/[locale]/contact/ContactClient.tsx' 'app/(frontend)/[locale]/HomePageClient.tsx' 'app/(frontend)/[locale]/page.tsx' tests/performance-data-boundaries.test.ts
git commit -m "perf: narrow client locale and service data"
```

---

### Task 4: Bounded animation lifecycle for cursor and particle effects

**Files:**
- Create: `lib/performance/animation-policy.ts`
- Create: `lib/performance/animation-runtime.ts`
- Create: `hooks/useAnimationActivity.ts`
- Create: `tests/performance-animation-lifecycle.test.ts`
- Modify: `components/ui/hero-designali.tsx`
- Modify: `app/(frontend)/[locale]/services/social-media-marketing/SocialMediaClient.tsx`
- Modify: `components/ui/tech-cursor.tsx`
- Modify: `app/(frontend)/[locale]/projects/ProjectsPageClient.tsx`
- Modify: `components/ui/interactive-text-particle.tsx`
- Modify: `components/ui/particles.tsx`
- Modify: `components/ui/get-in-touch.tsx`

**Interfaces:**
- Produces: `shouldRunAnimation(signals: AnimationSignals): boolean`.
- Produces: `createFrameLoop(callback, scheduler?)`, an idempotent start/stop/dispose controller with injectable rAF scheduling for tests.
- Produces: `useAnimationActivity<T extends Element>(options?): { ref: RefObject<T | null>; active: boolean; reducedMotion: boolean }`.
- Changes: `renderCanvas(canvas: HTMLCanvasElement, isActive: () => boolean): () => void` returns the complete Social Media cleanup.

- [ ] **Step 1: Write the failing pure policy and source-cleanup tests**

```ts
// tests/performance-animation-lifecycle.test.ts
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { shouldRunAnimation } from '../lib/performance/animation-policy.ts'
import { createFrameLoop } from '../lib/performance/animation-runtime.ts'

test('animation policy requires every activity signal', () => {
  assert.equal(shouldRunAnimation({ enabled: true, inViewport: true, documentVisible: true, reducedMotion: false }), true)
  assert.equal(shouldRunAnimation({ enabled: true, inViewport: false, documentVisible: true, reducedMotion: false }), false)
  assert.equal(shouldRunAnimation({ enabled: true, inViewport: true, documentVisible: false, reducedMotion: false }), false)
  assert.equal(shouldRunAnimation({ enabled: true, inViewport: true, documentVisible: true, reducedMotion: true }), false)
})

test('frame loop owns exactly one scheduled frame and disposes idempotently', () => {
  let nextId = 0
  const queued = new Map<number, FrameRequestCallback>()
  const cancelled: number[] = []
  const loop = createFrameLoop(() => undefined, {
    request: (callback) => (queued.set(++nextId, callback), nextId),
    cancel: (id) => { cancelled.push(id); queued.delete(id) },
  })
  loop.start()
  loop.start()
  assert.equal(queued.size, 1)
  loop.stop()
  assert.deepEqual(cancelled, [1])
  loop.dispose()
  loop.dispose()
  assert.equal(queued.size, 0)
})

test('cursor effects cancel frames and remove listeners directly from effects', () => {
  const tech = readFileSync('components/ui/tech-cursor.tsx', 'utf8')
  const social = readFileSync('components/ui/hero-designali.tsx', 'utf8')
  assert.match(tech, /cancelAnimationFrame/)
  assert.doesNotMatch(tech, /loadImages\(\)\.then\([\s\S]*return \(\) =>/)
  assert.match(social, /return \(\) =>/)
  assert.match(social, /cancelAnimationFrame/)
  assert.doesNotMatch(social, /let ctx: CanvasRenderingContext2D \| null = null/)
})
```

- [ ] **Step 2: Run the test and verify red state**

Run: `node --test --import tsx tests/performance-animation-lifecycle.test.ts`

Expected: missing policy module or cleanup assertions fail.

- [ ] **Step 3: Implement the pure policy and observer hook**

```ts
// lib/performance/animation-policy.ts
export type AnimationSignals = {
  enabled: boolean
  inViewport: boolean
  documentVisible: boolean
  reducedMotion: boolean
}

export const shouldRunAnimation = (s: AnimationSignals) =>
  s.enabled && s.inViewport && s.documentVisible && !s.reducedMotion
```

Implement `createFrameLoop` with the exact public shape below. `start()` is a no-op when already running or disposed; `stop()` cancels the owned ID; `dispose()` calls `stop()` once and permanently disables restart.

```ts
export type FrameScheduler = {
  request: (callback: FrameRequestCallback) => number
  cancel: (id: number) => void
}

export type FrameLoop = {
  start(): void
  stop(): void
  dispose(): void
  readonly running: boolean
}

export function createFrameLoop(
  callback: FrameRequestCallback,
  scheduler?: FrameScheduler,
): FrameLoop
```

The hook observes its host with `IntersectionObserver`, subscribes to `visibilitychange` and `matchMedia('(prefers-reduced-motion: reduce)')`, removes every subscription on cleanup, and returns the pure-policy result.

- [ ] **Step 4: Refactor Social Media trails into instance-owned state**

Pass the canvas element directly, keep context/lines/position/frame ID inside `renderCanvas`, use named focus/blur/pointer/resize handlers, cancel the current frame, and remove all document/body/window listeners in the returned cleanup. `SocialMediaClient` returns that cleanup directly from its effect.

- [ ] **Step 5: Fix Projects TechCursor cleanup and mobile activation**

Use an `AbortController` or mounted boolean for asynchronous image loading, keep the rAF ID in the effect, cancel it directly on unmount, and remove resize/mousemove listeners. Do not mount `TechCursor` until a `(min-width: 768px)` media query matches and reduced motion is false.

- [ ] **Step 6: Stop perpetual particle and pointer-driven React updates**

Use refs for transient pointer positions, stop the particle-text frame when no particles remain and the pointer has left, gate both Projects particle canvases with `useAnimationActivity`, and remove the unused mouse-position state/listener from `get-in-touch.tsx`.

- [ ] **Step 7: Run lifecycle tests, smoke tests, and build**

Run: `node --test --import tsx tests/performance-animation-lifecycle.test.ts`

Run: `npm run test:smoke`

Run: `npm run build`

Expected: exit 0.

- [ ] **Step 8: Commit bounded cursor/particle lifecycles**

```bash
git add lib/performance/animation-policy.ts lib/performance/animation-runtime.ts hooks/useAnimationActivity.ts tests/performance-animation-lifecycle.test.ts components/ui/hero-designali.tsx 'app/(frontend)/[locale]/services/social-media-marketing/SocialMediaClient.tsx' components/ui/tech-cursor.tsx 'app/(frontend)/[locale]/projects/ProjectsPageClient.tsx' components/ui/interactive-text-particle.tsx components/ui/particles.tsx components/ui/get-in-touch.tsx
git commit -m "perf: bound cursor and particle lifecycles"
```

---

### Task 5: Visibility-gated WebGL and 3D scenes

**Files:**
- Modify: `components/ui/3d-gallery.tsx`
- Modify: `app/(frontend)/[locale]/services/ecommerce-development/EcommerceSolutionsClient.tsx`
- Modify: `components/ui/reveal-wave-image.tsx`
- Modify: `app/(frontend)/[locale]/services/social-media-marketing/SocialMediaClient.tsx`
- Modify: `app/(frontend)/[locale]/services/web-applications/WebApplicationsClient.tsx`
- Modify: `components/ui/globe-hero.tsx`
- Modify: `tests/performance-animation-lifecycle.test.ts`

**Interfaces:**
- Consumes: `useAnimationActivity()` from Task 4.
- Changes: `InfiniteGallery` and `RevealWaveImage` receive or derive `active` and set React Three Fiber `frameloop` to `always` only while active.

- [ ] **Step 1: Add failing WebGL activity contracts**

```ts
test('WebGL canvases use visibility and reduced-motion activity', () => {
  for (const file of ['components/ui/3d-gallery.tsx', 'components/ui/reveal-wave-image.tsx']) {
    const code = readFileSync(file, 'utf8')
    assert.match(code, /useAnimationActivity/)
    assert.match(code, /frameloop=\{active \? ['"]always['"] : ['"]never['"]\}/)
  }
})

test('3d gallery does not set React state every frame', () => {
  const code = readFileSync('components/ui/3d-gallery.tsx', 'utf8')
  const frameBody = code.match(/useFrame\([\s\S]*?\n\s*}\)/)?.[0] ?? ''
  assert.doesNotMatch(frameBody, /setScroll|setVelocity/)
})
```

- [ ] **Step 2: Run the test and verify red state**

Run: `node --test --import tsx tests/performance-animation-lifecycle.test.ts`

Expected: Canvas activity and state-update assertions fail.

- [ ] **Step 3: Gate e-commerce gallery loading and frames**

Wrap the gallery host with `useAnimationActivity({ rootMargin: '400px' })`. Do not mount the dynamically imported gallery until it has first approached the viewport. Inside `3d-gallery.tsx`, use refs for per-frame scroll/velocity, update React state only when a user-visible discrete value changes, set `frameloop={active ? 'always' : 'never'}`, and render the existing first image as the reduced-motion fallback.

- [ ] **Step 4: Gate Social Media Reveal Wave canvases**

Each instance observes its own host, avoids texture/canvas mounting until near viewport, pauses its Canvas when inactive, and renders the same image through `next/image` for reduced motion or WebGL failure. Six sections retain their current content and composition.

- [ ] **Step 5: Gate the Web Applications globe**

Keep `ssr:false`, but move the dynamic globe behind a near-viewport host. Use a static authored globe frame before activation and `frameloop="demand"` or explicit invalidation if the component only changes in response to interaction.

- [ ] **Step 6: Verify tests and build**

Run: `node --test --import tsx tests/performance-animation-lifecycle.test.ts`

Run: `npm run build`

Expected: exit 0; Three.js stays in a post-hydration chunk and is absent from HTML preload links.

- [ ] **Step 7: Commit WebGL gating**

```bash
git add components/ui/3d-gallery.tsx 'app/(frontend)/[locale]/services/ecommerce-development/EcommerceSolutionsClient.tsx' components/ui/reveal-wave-image.tsx 'app/(frontend)/[locale]/services/social-media-marketing/SocialMediaClient.tsx' 'app/(frontend)/[locale]/services/web-applications/WebApplicationsClient.tsx' tests/performance-animation-lifecycle.test.ts
git commit -m "perf: pause offscreen 3d experiences"
```

---

### Task 6: Route-isolated industry CSS

**Files:**
- Create: `app/(frontend)/[locale]/industries/_shared/industry-route.tsx`
- Create: one `page.tsx` under each of the 12 bespoke world folders: `construction`, `ecommerce-retail`, `education`, `fintech`, `government-public-sector`, `healthcare`, `legal-firms`, `logistics-supply-chain`, `professional-services`, `real-estate`, `restaurants`, `travel-hospitality`
- Create: `tests/performance-route-isolation.test.ts`
- Modify: `app/(frontend)/[locale]/industries/[industry]/page.tsx`
- Modify: industry metadata tests only where imports move without changing assertions

**Interfaces:**
- Produces: `createIndustryMetadata(slug: IndustrySlug)` and `createIndustryPage(slug: IndustrySlug, WorldPage: ComponentType<WorldPageProps>)`.
- Preserves: metadata, schema, SearchKeywordsSection, publication policy, localized data, and all 26 canonical industry URLs.

- [ ] **Step 1: Write failing route-isolation tests**

```ts
// tests/performance-route-isolation.test.ts
import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'
import { INDUSTRY_SLUGS } from '../lib/industries/slugs.ts'

const bespoke = INDUSTRY_SLUGS.filter((slug) => slug !== 'retail')

test('each bespoke industry owns a static route entry', () => {
  for (const slug of bespoke) {
    const file = `app/(frontend)/[locale]/industries/${slug}/page.tsx`
    assert.equal(existsSync(file), true, file)
    const code = readFileSync(file, 'utf8')
    assert.match(code, new RegExp(`components/industry/${slug.replace('logistics-supply-chain', 'logistics-supply-chain')}`))
  }
})

test('the fallback dynamic route imports no bespoke world', () => {
  const code = readFileSync('app/(frontend)/[locale]/industries/[industry]/page.tsx', 'utf8')
  assert.doesNotMatch(code, /WORLD_COMPONENTS/)
  assert.doesNotMatch(code, /components\/industry\/(healthcare|fintech|construction|education)/)
})
```

- [ ] **Step 2: Run the test and verify missing static entries**

Run: `node --test --import tsx tests/performance-route-isolation.test.ts`

Expected: twelve missing-entry failures and `WORLD_COMPONENTS` failure.

- [ ] **Step 3: Extract shared route resolution and rendering**

Move `seoDefaultsFor`, `publicationSafeSeo`, `resolveRoute`, visible-data helpers, schema construction, and keyword rendering to `_shared/industry-route.tsx`. Export a stable `WorldPageProps` type and factory functions. Do not import any bespoke world component or CSS from the shared module.

- [ ] **Step 4: Create one explicit entry per bespoke world**

Each file imports exactly one world component and the shared factories. Example:

```ts
import { HealthcareIndustryPage } from '@/components/industry/healthcare/HealthcareIndustryPage'
import { createIndustryMetadata, createIndustryPage } from '../_shared/industry-route'

export const generateMetadata = createIndustryMetadata('healthcare')
export default createIndustryPage('healthcare', HealthcareIndustryPage)
```

The dynamic `[industry]` route generates only the non-bespoke `retail` path for both locales and uses the shared fallback renderer.

- [ ] **Step 5: Verify route tests, existing industry suite, and build CSS ownership**

Run: `node --test --import tsx tests/performance-route-isolation.test.ts tests/industry-worlds-foundation.test.ts tests/industry-worlds-metadata.test.ts tests/industry-worlds-render.test.tsx`

Run: `npm run build`

Inspect: healthcare HTML must not link stylesheet filenames referenced only by the other eleven explicit industry entries.

- [ ] **Step 6: Commit industry isolation**

```bash
git add 'app/(frontend)/[locale]/industries' tests/performance-route-isolation.test.ts tests/industry-worlds-metadata.test.ts tests/industry-worlds-render.test.tsx
git commit -m "perf: isolate industry world css"
```

---

### Task 7: Branch-isolated nested service routes

**Files:**
- Create: `app/(frontend)/[locale]/services/_shared/nested-service-route.tsx`
- Create: `app/(frontend)/[locale]/services/_shared/business-nested-page.tsx`
- Create: `app/(frontend)/[locale]/services/_shared/digital-nested-page.tsx`
- Create: `app/(frontend)/[locale]/services/_shared/webapp-nested-page.tsx`
- Create: explicit `[subservice]/page.tsx` route wrappers under `business-process-automation`, `custom-erp-crm-solutions`, `business-management-systems`, `ecommerce-development`, `ui-ux-design-branding`, `website-development`, `content-creation`, `social-media-marketing`, `search-engine-optimization`, and `web-applications`
- Modify: `app/(frontend)/[locale]/services/[service]/[subservice]/page.tsx`
- Modify: `tests/performance-route-isolation.test.ts`
- Modify: `tests/services-taxonomy.test.ts`

**Interfaces:**
- Produces: `createBusinessNestedPage(parent: string)`, `createDigitalNestedPage(parent: string)`, and `createWebappNestedPage()` factories with paired metadata functions.
- Preserves: canonical redirect guards, JSON-LD, breadcrumbs, FAQs, SearchKeywordsSection, static params, and both locales.

- [ ] **Step 1: Add failing nested-route isolation tests**

```ts
test('generic nested route does not import every renderer and content database', () => {
  const code = readFileSync('app/(frontend)/[locale]/services/[service]/[subservice]/page.tsx', 'utf8')
  assert.doesNotMatch(code, /business-systems-content|digital-presence-content|webapp-service-content/)
  assert.doesNotMatch(code, /SubServicePage|DigitalPresenceSubServicePage|WebAppPillarPage/)
})

test('canonical parent routes use branch-specific factories', () => {
  const webapp = readFileSync('app/(frontend)/[locale]/services/web-applications/[subservice]/page.tsx', 'utf8')
  assert.match(webapp, /createWebappNestedPage/)
  assert.doesNotMatch(webapp, /business-systems-content|digital-presence-content/)
})
```

- [ ] **Step 2: Run the test and verify red state**

Run: `node --test --import tsx tests/performance-route-isolation.test.ts`

Expected: current generic route imports all three branches and explicit routes are absent.

- [ ] **Step 3: Extract shared schema and breadcrumb wrapper**

Move `withExtras`, parent labels, JSON-LD construction, and canonical helpers to `_shared/nested-service-route.tsx`. This module imports no content database and no client page renderer.

- [ ] **Step 4: Implement branch factories and explicit parent wrappers**

Business wrappers import only business content plus `SubServicePage`; digital wrappers import only digital content plus `DigitalPresenceSubServicePage`; web-applications imports only webapp content plus `WebAppPillarPage`. Generate each wrapper's params from its branch index, filter to the fixed parent, and keep wrong-parent redirects in the small generic fallback route.

- [ ] **Step 5: Verify canonical route inventory and bundle isolation**

Run: `node --test --import tsx tests/performance-route-isolation.test.ts tests/services-taxonomy.test.ts tests/full-site-expansion.test.ts`

Run: `npm run build`

Inspect: an iOS nested page must not preload the business/digital rich-content chunks; a website sub-service must not preload WebAppPillarPage.

- [ ] **Step 6: Commit nested service isolation**

```bash
git add 'app/(frontend)/[locale]/services' tests/performance-route-isolation.test.ts tests/services-taxonomy.test.ts
git commit -m "perf: isolate nested service renderers"
```

---

### Task 8: Homepage/global shell, fonts, third parties, and prefetch correctness

**Files:**
- Create: `components/performance/ViewportEnhancement.tsx`
- Create: `tests/performance-global-shell.test.ts`
- Modify: `app/(frontend)/[locale]/HomePageClient.tsx`
- Modify: `components/home/ServicesGrid.tsx`
- Modify: `components/home/AiDigitalServices.tsx`
- Modify: `components/home/IndustriesPreview.tsx`
- Modify: `components/solution-finder/SolutionFinder.tsx`
- Modify: `components/home/EnterpriseGrowthCTA.tsx`
- Modify: `components/home/WorkWithSection.tsx`
- Modify: `components/home/TechnologyStackSection.tsx`
- Modify: `components/home/WhyCloudTopia.tsx`
- Modify: `components/home/Testimonials.tsx`
- Modify: `components/home/HowWeWork.tsx`
- Modify: `components/home/FAQ.tsx`
- Modify: `components/home/FinalCTA.tsx`
- Modify: `components/home/ArticlesTeaser.tsx`
- Modify: `app/(frontend)/[locale]/layout.tsx`
- Modify: `components/ai-chatbot/AIChatbotLazy.tsx`
- Modify: `components/home/IndustryCard.tsx`
- Modify: `components/ui/stagger-testimonials.tsx`
- Modify: `components/Header.tsx`
- Modify: `components/Footer.tsx`
- Modify: the `/api/whatsapp` Next Link call sites reported by `rg -l "<Link|/api/whatsapp" app components`, adding `prefetch={false}` only to matching `Link` elements
- Modify: `next.config.mjs`
- Modify: `tests/frontend-preload-scope.test.ts`

**Interfaces:**
- Produces: `ViewportEnhancement({ children, fallback, rootMargin = '600px', requireInteraction = false, minHeight }: { children: ReactNode; fallback: ReactNode; rootMargin?: string; requireInteraction?: boolean; minHeight: number })` for visual-only client islands.
- Changes: secondary font declarations set `preload: false`; only the locale-critical face is applied/preloaded.
- Preserves: semantic homepage HTML, header/footer, analytics intent, Clutch widget, chatbot access, and geo-correct WhatsApp navigation.

- [ ] **Step 1: Write failing global-shell contracts**

```ts
// tests/performance-global-shell.test.ts
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = (file: string) => readFileSync(file, 'utf8')

test('global shell does not preload every locale font', () => {
  const layout = source('app/(frontend)/[locale]/layout.tsx')
  assert.match(layout, /preload: false/)
  assert.doesNotMatch(layout, /subsets: \['latin', 'arabic'\]/)
})

test('chatbot and Clutch require interaction or viewport relevance', () => {
  assert.match(source('components/ai-chatbot/AIChatbotLazy.tsx'), /useDeferredInteraction|ViewportEnhancement/)
  assert.match(source('components/home/Testimonials.tsx'), /IntersectionObserver|useAnimationActivity/)
})

test('WhatsApp Next Links cannot prefetch the redirect endpoint', () => {
  const files = [
    'components/Header.tsx',
    'components/home/FAQ.tsx',
    'components/home/FinalCTA.tsx',
    'components/services/PillarPage.tsx',
    'app/(frontend)/[locale]/process/page.tsx',
    'app/(frontend)/[locale]/trust/page.tsx',
  ]
  for (const file of files) {
    const code = source(file)
    for (const match of code.matchAll(/<Link[\s\S]*?href=\{?`?\/api\/whatsapp[\s\S]*?>/g)) {
      assert.match(match[0], /prefetch=\{false\}/, file)
    }
  }
})

test('CSP permits exactly the analytics and badge providers rendered by the layout', () => {
  const config = source('next.config.mjs')
  for (const host of ['www.googletagmanager.com', 'connect.facebook.net', 'images.dmca.com']) {
    assert.match(config, new RegExp(host.replaceAll('.', '\\.')))
  }
})
```

- [ ] **Step 2: Run the test and verify red state**

Run: `node --test --import tsx tests/performance-global-shell.test.ts`

Expected: font, lazy enhancement, prefetch, and CSP assertions fail.

- [ ] **Step 3: Make homepage visual islands genuinely deferred**

Keep headings, paragraphs, links, FAQ content, and project/article text server-rendered. Move only canvases, particles, carousels, and other nonsemantic animation behind `ViewportEnhancement`. Apply `content-visibility: auto` and `contain-intrinsic-size: auto 900px` to long below-fold wrappers, overridden by each wrapper's numeric `minHeight`. Remove SSR dynamic imports that still generate immediate script preloads when a server component plus a small client island can express the same section.

- [ ] **Step 4: Correct image preload ownership**

Remove `priority` from below-fold ServicesGrid and AI images, both hidden/visible IndustryCard variants, hidden desktop header icons, testimonial avatars, and the footer DMCA badge. Keep only the actual route hero preload. Give the DMCA image `width={100}` and `height={50}` or equivalent intrinsic HTML dimensions.

- [ ] **Step 5: Scope font preloads without changing typography**

Retain the current CSS variables, but avoid loading both Arabic and Latin subsets/weights eagerly. Set noncritical or locale-specific declarations to `preload: false`, reduce unused weights, and scope Aghara/Talasem/Madani/Changa in `globals.css` to the logo or locale components that actually use them. Remove Changa from the general English fallback chain so its TTF is not part of every first visit. This satisfies the approved “convert or scope away” rule without introducing unreviewed font tooling.

- [ ] **Step 6: Defer chatbot and Clutch without removing them**

Mount the chatbot after the first deliberate interaction or an idle fallback. Load Clutch when the testimonial host approaches the viewport, retain the 40-attempt limit, and remove its script if this component inserted it and later unmounts before initialization.

- [ ] **Step 7: Fix WhatsApp prefetch and CSP correctness**

Add `prefetch={false}` to every Next Link targeting `/api/whatsapp`; ordinary `<a>` elements require no change. Extend `script-src`, `connect-src`, and `img-src` only for the Google Analytics, Meta Pixel, Clutch, DMCA, and Vercel endpoints intentionally used by the source. Keep analytics `afterInteractive`/async and DMCA `lazyOnload`.

- [ ] **Step 8: Run global tests, smoke suite, and build**

Run: `node --test --import tsx tests/performance-global-shell.test.ts tests/frontend-preload-scope.test.ts`

Run: `npm run test:smoke`

Run: `npm run lint`

Run: `npm run build`

Expected: all commands exit 0.

- [ ] **Step 9: Commit global-shell remediation**

```bash
git add components/performance/ViewportEnhancement.tsx tests/performance-global-shell.test.ts tests/frontend-preload-scope.test.ts 'app/(frontend)/[locale]/HomePageClient.tsx' 'app/(frontend)/[locale]/layout.tsx' components/ai-chatbot/AIChatbotLazy.tsx components/home/ServicesGrid.tsx components/home/AiDigitalServices.tsx components/home/IndustriesPreview.tsx components/solution-finder/SolutionFinder.tsx components/home/EnterpriseGrowthCTA.tsx components/home/WorkWithSection.tsx components/home/TechnologyStackSection.tsx components/home/WhyCloudTopia.tsx components/home/Testimonials.tsx components/home/HowWeWork.tsx components/home/FAQ.tsx components/home/FinalCTA.tsx components/home/ArticlesTeaser.tsx components/home/IndustryCard.tsx components/ui/stagger-testimonials.tsx components/Header.tsx components/Footer.tsx next.config.mjs app/globals.css
git commit -m "perf: defer global visual enhancements"
```

---

### Task 9: Repeatable route measurement and full verification

**Files:**
- Create: `scripts/measure-route-assets.mjs`
- Create outside repository: browser screenshots and PageSpeed result notes
- Modify: `package.json`
- Modify: this plan's checkboxes only after commands have actually passed

**Interfaces:**
- Produces: `npm run measure:routes -- <base-url>` printing per-route HTML bytes, linked CSS/JS/font counts, and unique transfer sizes from built or served output.
- Consumes: the ten audited representative URLs and the performance contracts from Tasks 1–8.

- [ ] **Step 1: Write the measurement script contract**

The script accepts a base URL, visits the ten paths, follows same-origin redirects, parses HTML link/script resources, fetches each unique asset with compression, and prints JSON plus a readable table. Paths are `/`, `/ar`, `/services/website-development`, `/projects/lumma-clinics`, `/articles/ai-automation-for-businesses`, `/contact`, `/restaurant-qr-menu`, `/services/app-development/ios-app-development`, `/industries/healthcare`, and `/pricing`.

- [ ] **Step 2: Add the measurement command and run all automated verification**

Add `"measure:routes": "node scripts/measure-route-assets.mjs"`.

Run: `npm run generate:service-nav`

Run: `npm run test:smoke`

Run: `node --test --import tsx tests/performance-images.test.ts tests/performance-data-boundaries.test.ts tests/performance-animation-lifecycle.test.ts tests/performance-route-isolation.test.ts tests/performance-global-shell.test.ts`

Run: `npm run lint`

Run: `npm run build`

Run: `npm start` and, in another command, `npm run measure:routes -- http://127.0.0.1:3000`.

Expected: zero test/lint/build failures; all ten routes return 200; route-specific CSS/JS assertions meet Tasks 1–8.

- [ ] **Step 3: Run browser QA on desktop and mobile**

Verify English and Arabic home, Website Development, QR Menu, Contact, Healthcare, iOS nested service, Projects, Social Media, E-commerce, and Web Applications. For each: confirm page identity, first viewport, no blank/overlay, console health, image loading, CTA navigation, RTL, reduced-motion fallback, and one representative interaction. Navigate repeatedly Projects → another route → Projects and Social Media → another route → Social Media while recording listener/frame behavior.

- [ ] **Step 4: Collect three PageSpeed runs per critical production URL after deployment authorization**

Run mobile PageSpeed three times for `/`, `/ar`, `/services/website-development`, `/contact`, and `/restaurant-qr-menu`; record median Performance, FCP, LCP, TBT, CLS, transfer, and the remaining top opportunities. Run one desktop regression pass for the same URLs.

- [ ] **Step 5: Compare results against the 2026-08-10 baseline**

Report exact before/after medians and bundle/resource deltas. If any critical page has no material LCP/transfer reduction or a material desktop regression, return to the responsible task before claiming completion.

- [ ] **Step 6: Commit measurement tooling and final verified adjustments**

```bash
git add package.json scripts/measure-route-assets.mjs
git commit -m "test: add repeatable route performance measurement"
```

## Plan Self-Review Checklist

- Every in-scope design requirement maps to Tasks 1–9.
- Visual preservation is explicit in every animation/image task.
- Active-locale data, Contact, homepage duplication, industry CSS, nested service JS, fonts, third parties, CSP, WhatsApp, and long-running animation defects each have a failing test before implementation.
- Types and interfaces used by later tasks are defined in earlier tasks.
- Destructive public-asset deletion, deployment, region movement, and branding changes remain outside the plan.
- PageSpeed work is gated on deployment authorization; local/browser/build verification does not pretend to be production PageSpeed evidence.
