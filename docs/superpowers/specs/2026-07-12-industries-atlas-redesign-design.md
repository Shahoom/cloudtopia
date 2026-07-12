# CloudTopia Industry Atlas Redesign

## Goal

Replace the Industries page's command-center aesthetic with a bright, editorial, bilingual atlas that feels unmistakably CloudTopia and helps visitors move from sector context to relevant services.

## Scope

Only `/industries` and `/ar/industries` change. The homepage, shared header, shared footer, industry detail routes, and service routes remain untouched.

## Direction

The page uses an editorial atlas rather than a dashboard. White and ice-blue surfaces dominate, with eerie navy for typography, CloudTopia indigo and cobalt for navigation and large visual fields, sky for active accents, and coral only for business friction. The page avoids photography, gradients, glass effects, decorative 3D, and repeated card grids.

## First View

The first viewport is a full-bleed typographic canvas, not a split hero or framed card. A large headline, oversized `13`, editorial rules, and an interactive sector index share one composition. Selecting a sector changes an abstract CSS atlas field and a concise pressure/system/outcome caption. The bottom edge reveals the next section on desktop and mobile.

Selection is deep-linkable with `?industry=<slug>`. Loading a valid query selects that sector, selecting a new sector updates the URL without scrolling, and browser history restores the matching sector.

## Page Journey

1. Editorial atlas hero with 13 sector controls and one selected-sector caption.
2. Featured transformation stories presented as a large editorial spread with six accessible tabs and a four-step journey.
3. Complete industry index using full-width numbered rows that expand visually on hover/focus instead of repeated cards.
4. Capability routing section that maps business priorities to relevant CloudTopia services.
5. Regional delivery proof, long-form transformation guide, FAQ, and consultation close.

## Visual Placeholders

Every visual is CSS-rendered: contour lines, coordinates, cropped numerals, timeline marks, route nodes, and modular fields. No existing site image is reused and no new image download is introduced.

## Arabic

Arabic uses the existing natural Gulf-facing content, Arabic-specific headline widths, `1.35` display leading, `1.9–1.95` body leading, and logical properties for mirroring. Visible technical labels are localized or language-neutral; English-only labels such as `LIVE SIGNAL` do not appear on the Arabic page.

## Accessibility And Guidelines

- Native buttons for state and links for navigation.
- Visible focus states and 44px minimum touch targets.
- Arrow, Home, and End keyboard navigation in both directions.
- URL reflects selected state.
- One H1 and hierarchical section headings.
- Reduced-motion fallback disables nonessential transitions.
- Transform and opacity are the only animated properties.
- Long text can wrap without causing horizontal overflow.
- Full-bleed sections account for safe-area insets.

## SEO

Existing localized metadata, canonical URLs, hreflang, CollectionPage, BreadcrumbList, ItemList, and FAQPage JSON-LD remain intact. All 13 industry links and relevant service links remain crawlable.

## Verification

- Focused source and content tests.
- TypeScript and production build.
- English and Arabic desktop/mobile browser checks.
- URL state, keyboard navigation, reduced motion, overflow, headings, and linked routes.
