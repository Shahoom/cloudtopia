# CloudTopia Performance Remediation — Design Specification

**Date:** 2026-08-10

**Status:** Visual-preservation approach approved; written-spec review pending

**Production host:** `https://cloudtopia.net`

**Locales:** English and Arabic

## 1. Decision Summary

CloudTopia will remediate the performance problems identified in the 2026-08-10 production audit while preserving the current brand, content, page composition, and recognizable motion language.

The work will optimize how existing experiences load and run rather than replacing them with a visually simpler site. Animated, canvas, WebGL, carousel, and cursor experiences may remain, but they must not block the first meaningful view, run while offscreen, leak across navigation, ignore reduced-motion preferences, or make mobile visitors download desktop-only assets.

The implementation is organized into six independently verifiable workstreams:

1. Stabilize critical mobile LCP and image delivery.
2. Remove route-wide dictionary and service-content bundle leaks.
3. Make animation and WebGL lifecycles bounded and visibility-aware.
4. Isolate industry and service route code and CSS.
5. Reduce global font, homepage, chatbot, third-party, and prefetch overhead.
6. Verify with build checks, focused regression tests, browser QA, bundle measurements, and repeated PageSpeed runs.

## 2. Product Outcome

Visitors should see the intended first viewport quickly on a mid-range mobile connection, retain smooth scrolling and interaction after repeated client-side navigation, and receive only the content, locale, media, CSS, and interactive code needed by the current route.

The current visual identity is binding. Optimization must preserve:

- Existing English and Arabic copy, metadata, routes, and canonical URLs.
- Existing color, typography hierarchy, imagery choices, section order, and CTA behavior.
- Recognizable desktop animation and 3D experiences after they become relevant.
- RTL behavior and content parity.
- Existing analytics intent, consent behavior, forms, navigation, and conversion paths.

## 3. Scope

### In scope

- Homepage, Arabic homepage, Contact, Pricing, article/project detail templates, Restaurant QR Menu, all service templates, all industry templates, and their shared frontend layout.
- Responsive image sizing, Next Image adoption, LCP stability, lazy loading, and preload correction.
- React Server Component/client boundary reduction and narrowly serialized props.
- Active-locale dictionary loading and small navigation/service-name indexes.
- Animation cleanup, viewport/document-visibility pausing, reduced-motion behavior, and mobile guards.
- Route-specific industry CSS and branch-specific service renderers/content.
- Font preload/subset/weight reduction without changing the visible type system.
- CSP, analytics, DMCA, Clutch, chatbot, and WhatsApp-prefetch correctness.
- Focused tests and measurement tooling needed to prevent regressions.

### Out of scope

- Brand redesign, copy rewrite, route rename, taxonomy change, CMS migration, or new product functionality.
- Removing all animation or replacing the approved visual experiences with generic static layouts.
- Moving the Vercel region without real-user evidence showing origin latency is a dominant problem.
- Deleting apparently unused public assets unless source and CMS usage are both proven absent.
- Treating a single Lighthouse score as a deterministic release gate.

## 4. Baseline and Success Criteria

The audit baseline is the 2026-08-10 Lighthouse 13.4.1 mobile sample. The most important results were Website Development LCP 20.6 s, Restaurant QR Menu LCP 20.0 s, Contact LCP 9.4 s, homepage LCP 9.1 s, and Arabic homepage LCP 8.1 s. No sampled URL had CrUX field data.

Acceptance requires all of the following:

1. Production build and TypeScript checks pass, and the worktree contains only intentional changes.
2. The ten audited production archetypes render without blank states, hydration errors, missing images, broken links, console errors introduced by the change, or desktop/mobile/RTL regressions.
3. Website Development no longer transfers original multi-megabyte hero sources for thumbnail-sized cards; Restaurant QR Menu exposes a stable first image in the initial render and does not initially mount the desktop gallery on mobile.
4. Only the active locale dictionary and route-required content cross client boundaries. Small label lookups do not import the full bilingual service corpus.
5. Repeated navigation into and away from Projects and Social Media does not multiply event listeners or animation frames.
6. Canvas and WebGL scenes pause when offscreen or hidden and provide a reduced-motion path while preserving the normal visual experience.
7. An industry detail page no longer receives CSS for every other industry world. A nested service page no longer preloads all renderer branches and content databases.
8. Global font and image preloads are limited to resources required in the first viewport and current locale.
9. Three fresh mobile PageSpeed runs are collected for each critical page and compared by median. The release objective is a material LCP and transfer reduction on every critical page, with no material desktop regression. Scores are reported, not manufactured by removing the approved design.

## 5. Architecture

### 5.1 Critical image and LCP path

Website Development will use responsive `next/image` assets with explicit dimensions or `fill`, accurate `sizes`, optimized thumbnail variants, and a single stable first-frame candidate. The rotating text and nonessential card motion will start only after the initial LCP window or user interaction.

Restaurant QR Menu will render a shared, stable first visual that is valid for both server output and hydration. Mobile and desktop interactive galleries will load only after the client knows the viewport and the gallery is near the viewport. Hidden variants must not request their image sets. Carousel advancement begins after the initial content has settled and pauses when hidden.

Below-fold homepage, e-commerce, testimonial, header, footer, and service images will not use `priority`. Raw images will gain intrinsic sizing and responsive optimization where compatible with their animation wrappers.

### 5.2 Client data boundaries

`LanguageContext` will receive one active-locale, client-safe dictionary rather than importing both locale databases. Locale switching continues through localized navigation; it does not require both dictionaries in memory.

Navigation labels, service names, category names, and teaser copy will live in small typed indexes. Detailed bilingual service content remains server-only and only the resolved route content is serialized to a client renderer.

Contact will receive a compact localized list of service options instead of importing the SEO/service content graph. Provider values will be memoized and hydration synchronization will not reset already seeded state.

### 5.3 Homepage and global shell

Semantic homepage content remains server rendered for accessibility and discovery. Interactive behavior is split into small client islands. Expensive visual islands load at viewport proximity; long below-fold sections use rendering containment where appropriate. Dynamic imports are considered successful only when the generated route no longer preloads their chunks immediately.

The chatbot loads on first interaction or deliberate idle/viewport criteria rather than immediately after hydration. Clutch loads near its testimonial section. Analytics integrations use supported Next.js script strategies and a CSP that matches the deliberately enabled providers.

### 5.4 Route isolation

Industry worlds will have route-isolated entry modules so a request for one slug imports only that world's component and stylesheet. Shared metadata, schema, breadcrumbs, and content resolution remain centralized to prevent drift.

Nested service routing will resolve the requested content on the server, load only the selected renderer family, and pass a narrow typed payload to its client island. The canonical slug set and static generation behavior remain unchanged.

### 5.5 Animation lifecycle

Every global listener, timer, observer, texture, canvas, and `requestAnimationFrame` loop must have an owner and an idempotent cleanup path returned directly from its React effect.

Projects `TechCursor`, Social Media trails, particle text, QR carousel, e-commerce gallery, Web Applications globe, and Reveal Wave canvases will:

- Start only when their host is mounted and relevant.
- Pause outside the viewport and while `document.hidden`.
- Cancel frames, timers, listeners, and observers on unmount.
- Avoid React state updates on every animation frame when refs or direct renderer state suffice.
- Respect `prefers-reduced-motion` with a composed static frame.
- Avoid mounting desktop-only effects during the initial mobile render.

### 5.6 Fonts and static delivery

The current typefaces remain visually available, but font declarations and preload behavior become locale-aware. Only required weights/subsets are preloaded; decorative and secondary fonts load on use. Remaining TTF assets used on critical routes are converted to WOFF2 or scoped away from the initial path.

Stable image, OG, partner, and upload asset policies will be reviewed individually. Immutable caching is used only for content-hashed or operationally versioned files.

## 6. Error Handling and Fallbacks

- Optimized images retain meaningful alt text and a reserved aspect ratio. A failed gallery enhancement leaves the stable first image and content usable.
- A failed WebGL or canvas initialization leaves an authored static frame rather than a blank section.
- Motion gating must not hide semantic content or CTA controls.
- Unknown service/industry slugs continue to use the current redirect/not-found behavior.
- Analytics or third-party failure must never block rendering, navigation, or forms.
- Locale data validation fails the build when required client labels are missing.

## 7. Testing and Measurement

Each workstream follows a focused red-green-refactor cycle where automated coverage is practical. Tests will cover:

- Active-locale data selection and compact service/category indexes.
- Route-to-renderer and route-to-industry-entry resolution.
- Animation lifecycle helpers and visibility/reduced-motion state transitions.
- Generated HTML/resource assertions for image priority, font preload, route CSS, and route script leakage.
- Existing unit/integration suites, TypeScript, and a fresh production build.
- Browser QA on desktop, mobile, English, Arabic, repeated client navigation, reduced motion, console health, and representative interactions.
- Before/after bundle and transfer comparison from the production build.
- Three PageSpeed mobile runs per critical URL, using the median for comparison, followed by Vercel Speed Insights monitoring after deployment.

## 8. Delivery Sequence

1. Add measurement/regression checks and fix Website Development and Restaurant QR Menu LCP.
2. Split locale/service data and repair Contact's bundle leak.
3. Fix animation lifecycle leaks and gate offscreen WebGL/canvas work.
4. Isolate industry CSS and nested service renderer branches.
5. Refactor homepage/global shell loading, font preloads, chatbot, Clutch, CSP, analytics, and WhatsApp links.
6. Run the complete verification matrix, resolve regressions, and publish the before/after evidence.

No production deployment, branch push, or destructive asset deletion is part of this implementation unless separately authorized.
