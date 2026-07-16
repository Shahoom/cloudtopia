# Digital Presence Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a production-ready bilingual Lucid Chrome landing page at `/services/digital-presence` that explains CloudTopia's connected Digital Presence offer, links all eight service pillars, and converts visitors through WhatsApp consultation.

**Architecture:** Add a static localized App Router route with server-owned metadata and JSON-LD, a typed bilingual content module, and a focused client landing component split into scene components. Reuse the structured Digital Presence catalog for canonical service links and the existing locale, project, header, footer, and WhatsApp infrastructure.

**Tech Stack:** Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, CSS modules, Framer Motion, Lucide React, Node test runner with `tsx`.

## Global Constraints

- Canonical route is exactly `/services/digital-presence`; English is unprefixed and Arabic is `/ar/services/digital-presence`.
- Use the existing shared Header, Footer, language switcher, and `/api/whatsapp?locale=<locale>` routing.
- Use existing Framer Motion and Lucide packages; add no dependency.
- Keep service names, descriptions, icons, and URLs sourced from `lib/services/digital-presence.ts`.
- Render all SEO copy and service links in initial HTML; client state is interaction-only.
- Use optical white, graphite, cobalt `#175CD3`, cool silver, and a restrained coral signal; use 4-8px radii.
- Respect `prefers-reduced-motion`, RTL, keyboard focus, 44px touch targets, and mobile no-overflow behavior.
- Do not invent prices, analytics, client results, testimonials, offers, or partner claims.
- Do not restructure unrelated service categories or revert existing worktree changes.

---

### Task 1: Add the Route, Content, and SEO Contract Tests

**Files:**
- Create: `tests/digital-presence-landing.test.ts`
- Test: `tests/digital-presence-landing.test.ts`

**Interfaces:**
- Consumes: `digitalPresencePillars` from `lib/services/digital-presence.ts`.
- Produces: a failing contract for `digitalPresenceLanding`, `getDigitalPresenceLanding(locale)`, the static route, schema graph, canonical integration, and navigation updates.

- [ ] **Step 1: Write the failing tests**

```ts
import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { digitalPresencePillars } from '../lib/services/digital-presence'
import { getDigitalPresenceLanding } from '../lib/services/digital-presence-landing'

const ROOT = path.resolve(import.meta.dirname, '..')
const read = (file: string) => fs.readFileSync(path.join(ROOT, file), 'utf8')

test('digital presence landing content is complete in English and Arabic', () => {
  for (const locale of ['en', 'ar'] as const) {
    const content = getDigitalPresenceLanding(locale)
    assert.ok(content.hero.title.length > 20)
    assert.equal(content.services.length, digitalPresencePillars.length)
    assert.equal(content.faqs.length, 6)
  }
})

test('digital presence route owns canonical metadata and structured data', () => {
  const layout = read('app/(frontend)/[locale]/services/digital-presence/layout.tsx')
  const page = read('app/(frontend)/[locale]/services/digital-presence/page.tsx')
  assert.match(layout, /\/services\/digital-presence/)
  assert.match(layout, /buildHreflangMap/)
  for (const type of ['Service', 'WebPage', 'BreadcrumbList', 'ItemList', 'FAQPage']) {
    assert.match(layout, new RegExp(`['\"]@type['\"]:\\s*['\"]${type}`))
  }
  assert.match(page, /DigitalPresenceLanding/)
})

test('all eight canonical pillars are rendered by the landing experience', () => {
  const source = read('components/services/digital-presence/DigitalPresenceLanding.tsx')
  assert.match(source, /content\.services\.map/)
  assert.match(source, /localePath\(locale, service\.href\)/)
  assert.equal(new Set(digitalPresencePillars.map((pillar) => pillar.href)).size, 8)
})

test('navigation and discovery surfaces use the new digital presence hub', () => {
  assert.match(read('components/Header.tsx'), /digital-presence[^\n]+hub:\s*['\"]\/services\/digital-presence/)
  assert.match(read('lib/sitemap-data.ts'), /\/services\/digital-presence/)
  assert.match(read('scripts/generate-llms.ts'), /\/services\/digital-presence/)
})

test('motion remains accessible and RTL aware', () => {
  const source = read('components/services/digital-presence/DigitalPresenceLanding.tsx')
  const styles = read('components/services/digital-presence/digital-presence.module.css')
  assert.match(source, /useReducedMotion/)
  assert.match(source, /dir=\{dir\}/)
  assert.match(styles, /prefers-reduced-motion/)
  assert.match(styles, /focus-visible/)
})
```

- [ ] **Step 2: Run the test and verify RED**

Run: `node --test --import tsx tests/digital-presence-landing.test.ts`

Expected: FAIL because `lib/services/digital-presence-landing.ts` and the new route do not exist.

- [ ] **Step 3: Commit the red test only**

```bash
git add tests/digital-presence-landing.test.ts
git commit -m "test: define digital presence landing contract"
```

### Task 2: Build the Typed Bilingual Content and SEO Route

**Files:**
- Create: `lib/services/digital-presence-landing.ts`
- Create: `app/(frontend)/[locale]/services/digital-presence/page.tsx`
- Create: `app/(frontend)/[locale]/services/digital-presence/layout.tsx`
- Modify: `tests/digital-presence-landing.test.ts`

**Interfaces:**
- Consumes: `digitalPresencePillars`, `localizedDP`, `canonicalUrl`, `buildHreflangMap`, `buildOrganizationRef`, and existing locale helpers.
- Produces: `DigitalPresenceLandingContent`, `digitalPresenceLanding`, and `getDigitalPresenceLanding(locale: string): DigitalPresenceLandingContent`.

- [ ] **Step 1: Implement the bilingual content module**

```ts
export type DigitalPresenceLandingContent = {
  locale: 'en' | 'ar'
  hero: { eyebrow: string; title: string; description: string; primaryCta: string; secondaryCta: string }
  services: Array<{ slug: string; name: string; description: string; href: string; icon: string }>
  faqs: Array<{ question: string; answer: string }>
  // Typed copy blocks for definition, journey, scenes, outcomes, process, audience, work, and final CTA.
}

export function getDigitalPresenceLanding(locale: string): DigitalPresenceLandingContent {
  const selected = locale === 'ar' ? digitalPresenceLanding.ar : digitalPresenceLanding.en
  return {
    ...selected,
    services: digitalPresencePillars.map((pillar) => ({
      slug: pillar.slug,
      name: localizedDP(pillar.name, locale),
      description: localizedDP(pillar.description, locale),
      href: pillar.href,
      icon: pillar.icon,
    })),
  }
}
```

- [ ] **Step 2: Implement localized metadata and JSON-LD in the route layout**

```tsx
const PATH = '/services/digital-presence'

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale = 'en' } = await params
  const content = getDigitalPresenceLanding(locale)
  return {
    title: content.seo.title,
    description: content.seo.description,
    alternates: { canonical: canonicalUrl(locale, PATH), languages: buildHreflangMap(PATH) },
    openGraph: { title: content.seo.title, description: content.seo.description, url: canonicalUrl(locale, PATH), type: 'website' },
  }
}
```

Render a single JSON-LD `@graph` containing the visible `Service`, `WebPage`, `BreadcrumbList`, `ItemList`, and `FAQPage` nodes, with `provider` referencing `buildOrganizationRef()` and every service URL built through `canonicalUrl(locale, service.href)`.

- [ ] **Step 3: Implement the server page boundary**

```tsx
export default async function DigitalPresencePage({ params }: PageProps) {
  const { locale = 'en' } = await params
  return <DigitalPresenceLanding content={getDigitalPresenceLanding(locale)} />
}
```

- [ ] **Step 4: Run the focused test**

Run: `node --test --import tsx tests/digital-presence-landing.test.ts`

Expected: FAIL only on the missing landing component, stylesheet, and discovery integrations.

### Task 3: Build the Lucid Chrome Landing Experience

**Files:**
- Create: `components/services/digital-presence/DigitalPresenceLanding.tsx`
- Create: `components/services/digital-presence/PresenceHero.tsx`
- Create: `components/services/digital-presence/PresenceJourney.tsx`
- Create: `components/services/digital-presence/PresenceScenes.tsx`
- Create: `components/services/digital-presence/PresenceConversion.tsx`
- Create: `components/services/digital-presence/digital-presence.module.css`

**Interfaces:**
- Consumes: `DigitalPresenceLandingContent`, `localePath`, Framer Motion, Lucide icons, and existing image assets.
- Produces: `DigitalPresenceLanding({ content }: { content: DigitalPresenceLandingContent })` with semantic, server-renderable sections and accessible interactions.

- [ ] **Step 1: Create shared motion and section primitives**

Use module-level variants and the primitive below so components are not defined inside the page render:

```tsx
function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

- [ ] **Step 2: Build the full-viewport hero**

Render one H1, localized primary and secondary CTAs, and stable floating canvases using existing project/service images. Give every canvas a fixed `aspect-ratio`, use `next/image`, and keep the copy/CTAs above decorative layers on every viewport.

- [ ] **Step 3: Build the journey and interactive service atlas**

Render Build, Be Found, Engage, and Grow as semantic list items. Render services exactly through:

```tsx
{content.services.map((service, index) => (
  <Link key={service.slug} href={localePath(locale, service.href)} className={styles.serviceRow}>
    <span>{String(index + 1).padStart(2, '0')}</span>
    <Image src={service.icon} alt="" width={56} height={56} />
    <span><strong>{service.name}</strong><small>{service.description}</small></span>
    <ArrowUpRight aria-hidden="true" />
  </Link>
))}
```

- [ ] **Step 4: Build the foundation, discoverability, and engagement scenes**

Use semantic links in every service mention. The search and AI-answer UI is explicitly labeled as an explanatory example. The content wall is a presentational group, not an auto-advancing carousel.

- [ ] **Step 5: Build package value, outcomes, process, audience, work, FAQ, and final CTA**

Use native `details`/`summary` for the FAQ so content works without JavaScript. The final and mid-page consultation links must point to `/api/whatsapp?locale=${locale}`.

- [ ] **Step 6: Implement the Lucid Chrome stylesheet**

Define local CSS custom properties and responsive constraints:

```css
.page {
  --presence-ink: #101828;
  --presence-cobalt: #175cd3;
  --presence-sky: #53b1fd;
  --presence-canvas: #f7f9fc;
  --presence-chrome: #d0d5dd;
  --presence-signal: #f04438;
  overflow: clip;
  color: var(--presence-ink);
  background: var(--presence-canvas);
}

.page :focus-visible { outline: 3px solid var(--presence-cobalt); outline-offset: 4px; }

@media (prefers-reduced-motion: reduce) {
  .page *, .page *::before, .page *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

- [ ] **Step 7: Run the focused test and TypeScript**

Run: `node --test --import tsx tests/digital-presence-landing.test.ts`

Expected: remaining failures are discovery integration only.

Run: `npx tsc --noEmit`

Expected: PASS.

### Task 4: Integrate Navigation, Sitemap, LLM, and Agent Discovery

**Files:**
- Modify: `components/Header.tsx`
- Modify: `app/(frontend)/[locale]/services/ServicesPageClient.tsx`
- Modify: `lib/sitemap-data.ts`
- Modify: `scripts/generate-llms.ts`
- Modify: `lib/agent/site-facts.ts`
- Modify: `lib/ai-chatbot/siteKnowledge.ts`
- Modify: `data/cloudtopia-ai/cloudtopia-services.md`
- Modify: `public/llms.txt` through the generator
- Modify: `tests/digital-presence-landing.test.ts`

**Interfaces:**
- Consumes: canonical route `/services/digital-presence`.
- Produces: one discoverable category hub across user navigation, search sitemap, generated LLM index, and assistant knowledge.

- [ ] **Step 1: Update header and services-listing category links**

Change the Digital Presence `hub` from `/services` to `/services/digital-presence`. Make the Digital Presence category-level action on the services listing use the same hub without changing pillar URLs.

- [ ] **Step 2: Add the route to both sitemap static-route lists**

Add:

```ts
{ path: '/services/digital-presence', priority: 0.86, changeFrequency: 'monthly' }
```

to the CMS-backed and filesystem-backed guaranteed static route arrays.

- [ ] **Step 3: Add the hub to LLM and agent knowledge**

Add `/services/digital-presence` as the Digital Presence category hub while preserving the eight canonical pillar routes. Regenerate `public/llms.txt` with `npx tsx scripts/generate-llms.ts`.

- [ ] **Step 4: Run focused and taxonomy tests**

Run: `node --test --import tsx tests/digital-presence-landing.test.ts tests/services-taxonomy.test.ts tests/ai-chatbot.test.ts`

Expected: PASS.

Run: `npx tsx scripts/generate-llms.ts --check`

Expected: `public/llms.txt articles section is up to date.`

### Task 5: Audit, Render, and Verify the Complete Page

**Files:**
- Modify as findings require: `components/services/digital-presence/*.tsx`
- Modify as findings require: `components/services/digital-presence/digital-presence.module.css`
- Test: focused tests plus production build.

**Interfaces:**
- Consumes: complete route and UI.
- Produces: verified desktop/mobile English/Arabic experience with no unresolved design-guideline findings.

- [ ] **Step 1: Fetch and apply the current Web Interface Guidelines**

Fetch `https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md`, audit the new route/component/style files, and fix every actionable finding in scope.

- [ ] **Step 2: Run the React best-practices review**

Check direct imports, static JSX hoisting, minimized client props/state, stable component definitions, image sizing, and the absence of continuous React scroll-state updates.

- [ ] **Step 3: Run complete focused verification**

Run: `node --test --import tsx tests/digital-presence-landing.test.ts tests/services-taxonomy.test.ts tests/full-site-expansion.test.ts tests/ai-chatbot.test.ts`

Expected: PASS.

Run: `npx tsc --noEmit`

Expected: PASS.

Run: `npm run build`

Expected: PASS with `/[locale]/services/digital-presence` included in the route output.

- [ ] **Step 4: Start or reuse the dev server and verify rendered behavior**

Verify desktop and mobile for `/services/digital-presence` and `/ar/services/digital-presence`: nonblank hero, shared header/footer, one H1, correct RTL, all images loaded, no horizontal overflow, no overlapping text/controls, functional service links, functional WhatsApp link, keyboard focus, native FAQ behavior, and reduced-motion rendering.

- [ ] **Step 5: Final diff and status review**

Run: `git diff --check`

Expected: no whitespace errors.

Run: `git status --short`

Expected: only the Digital Presence feature files plus the pre-existing services-structure changes remain.
