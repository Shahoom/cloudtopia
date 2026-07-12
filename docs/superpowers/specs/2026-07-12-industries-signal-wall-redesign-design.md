# Industries Signal Wall Redesign

## Goal

Replace the current orbit-based industries page with a memorable bilingual experience that is easy to scan, explains how CloudTopia supports each sector, and feels native in Arabic and English.

## Visual Direction

The page uses a "Signal Studio" system: graphite, crisp white, electric lime, cobalt, and coral. It avoids gradients, glass effects, reused photography, and decorative 3D. Abstract media placeholders provide stable art direction without borrowing existing site imagery.

## First View

The hero is a full-width Industry Signal Wall. Concise copy sits beside thirteen numbered industry channels. Selecting a channel expands its signal, reveals a placeholder visual, and presents the sector pressure, proposed system, outcome, and related services. Motion is based on directional wipes, signal-line travel, staggered entrances, and spring expansion. Mobile uses a horizontal sector rail and one stable detail panel.

## Page Journey

1. Industry Signal Wall for discovery and immediate service routing.
2. Transformation Workbench for six detailed problem-to-outcome stories.
3. Industry Atlas for all thirteen sectors using varied interface diagrams rather than repeated photo cards.
4. Capability Router that maps business needs to CloudTopia services.
5. Regional delivery proof covering Arabic-first UX, integration, ownership, launch, and growth.
6. Crawlable transformation guide, FAQ, and WhatsApp consultation close.

## Arabic

Arabic content is rewritten as natural Gulf-facing Modern Standard Arabic. It avoids literal translation, awkward technical phrasing, and overly long headlines. Arabic layouts use comfortable line height, correct RTL interaction order, and isolated LTR treatment for technical abbreviations where needed.

## Components

- `IndustrySignalWall`: interactive hero and sector selector.
- `IndustryWorkbench`: six featured transformation stories with placeholder diagrams.
- `IndustriesIndex`: complete industry atlas with varied diagram treatments.
- Existing page-level capability, proof, guide, FAQ, and consultation sections receive the new design system.

## Accessibility And Performance

- Semantic buttons and tab patterns retain keyboard navigation and focus visibility.
- Reduced-motion preferences disable nonessential movement.
- No canvas or WebGL dependency is introduced.
- Placeholder visuals are CSS-based and do not trigger image downloads.
- One H1, visible FAQ content, localized metadata, hreflang, and JSON-LD remain intact.

## Verification

- Focused industries and SEO tests.
- TypeScript and production build.
- Desktop and mobile browser checks in English and Arabic.
- RTL keyboard navigation, overflow, broken media, and linked-route checks.
