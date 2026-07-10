# Digital Presence Landing Page Design

## Purpose

Create a flagship bilingual landing page at `/services/digital-presence` that makes CloudTopia's Digital Presence offer easy to understand, explore, and buy. The page must explain how website development, e-commerce, branding, search visibility, social media, and content work together, then give visitors two clear next actions:

1. Start a geo-routed WhatsApp consultation.
2. Explore the related service pages.

The page will use the existing CloudTopia header, footer, language switcher, locale routing, WhatsApp endpoint, typography, and service catalog.

## Audience

The primary audience is a business owner or decision-maker in Oman, the GCC, or the wider Arab world who knows their online presence is incomplete or underperforming but may not know which individual service to request. The page should also serve established businesses preparing to rebrand, launch, expand, or improve lead generation.

## Core Message

Digital presence is not a collection of unrelated pages and posts. It is the connected experience a potential customer has while discovering, understanding, trusting, and choosing a business.

English promise: `Digital presence services that make your business impossible to miss.`

Arabic promise: `خدمات حضور رقمي تجعل أعمالك واضحة، موثوقة، وصعبة التجاهل.`

Supporting copy will remain concrete and business-focused. It will avoid inflated claims, invented statistics, jargon-heavy explanations, and generic AI-style phrasing.

## Visual Direction: Lucid Chrome

The approved direction is luminous, technical, and premium rather than dark or poster-like.

- Canvas: optical white and cool mist surfaces.
- Text: graphite and near-black.
- Primary focus: cobalt blue.
- Depth: cool silver and translucent chrome layers.
- Signal accent: restrained coral for a small number of moments.
- Shape language: precise 4-8px radii, crisp borders, large unframed sections, floating interface canvases, and layered project media.
- Typography: the site's existing Hanken Grotesk, Cairo, and IBM Plex Sans Arabic families. Large type is reserved for the hero and major section transitions.
- Imagery: real CloudTopia project and service imagery from the repository, presented as floating browser canvases and campaign frames. Decorative model-authored SVG illustrations will not be introduced.

The page will alternate luminous white, cool grey, cobalt, and graphite section bands so the long experience never becomes visually one-note.

## Motion Direction

Motion explains the connected service system instead of decorating it.

- Hero canvases enter in one orchestrated sequence with subtle depth and parallax.
- The headline reveals by line, with Arabic animation direction mirrored for RTL.
- A scroll-linked journey navigator progresses through Build, Be Found, Engage, and Grow.
- Service rows expand or shift on hover and keyboard focus to reveal a preview and direct link.
- Search, AI-answer, social, and content modules animate through representative states.
- Section transitions use masks, controlled vertical movement, and surface changes.
- Buttons use restrained magnetic movement and clear pressed/focus states.
- Project media uses subtle tilt and depth on pointer devices only.
- Repeated ambient animation is slow, pauseable where necessary, and disabled under `prefers-reduced-motion`.

No animation may delay access to content, create layout shift, trap focus, or make mobile scrolling unstable.

## Page Structure

### 1. Hero

A full-viewport product scene, not a card or split layout. The headline and explanation sit over a field of floating real-work canvases representing website, commerce, search, content, and social media. Primary CTA opens `/api/whatsapp?locale=<locale>`. Secondary CTA scrolls to the service atlas.

### 2. Definition

Explain the difference between merely being online and having a connected digital presence. Use a compact statement followed by plain-language examples of what customers see, understand, trust, and do next.

### 3. Journey Navigator

Present the service model as four business jobs:

- Build: website, e-commerce, brand, and experience foundations.
- Be Found: SEO, AEO, and GEO visibility.
- Engage: social media and useful content.
- Grow: measurement, learning, and continuous improvement across the connected presence.

The fourth stage describes the outcome and operating loop; it does not invent an additional service pillar.

### 4. Interactive Service Atlas

List all eight Digital Presence pillars with human descriptions, icons, localized names, and canonical links from `lib/services/digital-presence.ts`:

- Website Development
- E-Commerce Development
- UI/UX Design & Branding
- Search Engine Optimization
- Answer Engine Optimization
- Generative Engine Optimization
- Social Media Marketing
- Content Marketing & Authority

The atlas must remain usable with keyboard navigation, touch, and reduced motion. All content must be present in server-rendered HTML.

### 5. Foundation Scene

Connect website development, e-commerce, and branding through a layered interface scene. Explain why the website is the owned home, why the buying journey must feel coherent, and why brand and UI create trust. Each mention links to its service page.

### 6. Discoverability Scene

Use an accessible search-and-answer simulation to explain SEO, AEO, and GEO without pretending to be a live search engine. The simulation demonstrates how technical foundations, clear answers, structured content, and external brand signals improve discoverability. Each service has its own canonical link.

### 7. Engagement Scene

Use a kinetic but controlled content wall to connect social strategy, campaigns, articles, copy, and community. Link to Social Media Marketing and Content Creation.

### 8. Connected Package Value

Compare a fragmented presence with a connected one. Show how one strategy, one visual language, shared priorities, and coordinated measurement reduce waste and improve clarity. Avoid unsupported percentage claims.

### 9. Business Outcomes

Explain the practical outcomes:

- Look credible sooner.
- Get discovered more often.
- Explain the offer clearly.
- Generate better inquiries.
- Build a consistent brand.
- Learn what drives action.

### 10. Delivery Process

Present Discover, Position, Build, Launch, and Grow as a scroll-linked timeline. The process should clarify that CloudTopia recommends the right order of work rather than selling every service at once.

### 11. Audience Fit

Show four common situations: launching a business, replacing an outdated presence, entering a new market, and connecting disconnected channels. The UI should help visitors recognize themselves without functioning as a form or quiz.

### 12. Real Work

Use existing CloudTopia project imagery and link to the Projects page. Do not invent client results. Project cards may describe the type of digital presence work shown only when supported by existing project data.

### 13. FAQ

Visible bilingual questions and answers will cover:

- What is included in a Digital Presence package?
- Does a business need every service at once?
- Can CloudTopia improve an existing website or brand?
- How does Arabic and English delivery work?
- How are priorities and results measured?
- How does the WhatsApp consultation work?

### 14. Final Consultation

Close with a direct invitation to explain the business's current situation over WhatsApp. Reassure visitors that CloudTopia will identify what matters first and what can wait. Include a secondary link back to the service atlas.

## Component Architecture

The route will be a static Next.js App Router page under the existing `[locale]` segment.

- The page and route layout own metadata, canonical URLs, hreflang, breadcrumbs, and JSON-LD.
- A typed bilingual content module owns page-specific copy and FAQ content.
- The existing structured Digital Presence catalog remains the source of truth for service names, descriptions, icons, and links.
- A focused client landing component owns motion and interaction while rendering all initial content on the server.
- Large scenes will be split into bounded section components so the landing page does not become one unmaintainable file.
- Shared interaction primitives will cover reveals, section headings, magnetic links, and reduced-motion behavior without adding a new dependency.

Client state will be limited to interaction that genuinely requires it, such as the active journey stage or FAQ state. Content and service routing will not be duplicated in client state.

## SEO and Discoverability

- Canonical route: `/services/digital-presence`.
- Localized English and Arabic title and description.
- Self-referencing canonical plus `en`, `ar`, and `x-default` hreflang URLs.
- One descriptive H1 containing the Digital Presence service topic.
- Logical H2 and H3 hierarchy.
- Internal links to all eight related service pillars using descriptive anchors.
- Breadcrumbs: Home, Services, Digital Presence.
- JSON-LD graph containing `Service`, `WebPage`, `BreadcrumbList`, `ItemList`, and `FAQPage` nodes that match visible content.
- Existing Organization identity referenced by stable `@id` rather than duplicated.
- Route included in sitemap, services navigation, and relevant agent/LLM knowledge surfaces.
- Header Digital Presence category hub updated from `/services` to `/services/digital-presence`.
- No keyword stuffing, fake review markup, fake offers, or claims unsupported by visible content.

## Accessibility and Responsive Behavior

- Semantic sections, headings, links, buttons, lists, and FAQ controls.
- Visible keyboard focus using the page's cobalt focus system.
- Minimum 44px touch targets for interactive controls.
- Sufficient contrast in every theme band.
- Decorative media has empty alternative text; meaningful project media has localized descriptive alt text.
- Animations respect `prefers-reduced-motion` and do not hide content.
- RTL changes layout direction, movement direction, icon orientation, and text alignment without changing information order.
- Mobile uses stable stacked scenes with no horizontal page scroll or hover-only content.
- Floating hero elements are constrained so they never cover the headline or CTAs.

## Performance

- Use existing Framer Motion and Lucide packages; add no animation or UI dependency.
- Keep the route's SEO content server-rendered.
- Use `next/image` with fixed aspect ratios and responsive sizes for project/service media.
- Prioritize only the actual hero LCP image.
- Lazy-load below-the-fold media.
- Avoid continuous React state updates for scroll animation; use transform/opacity animation paths.
- Keep decorative effects CSS-based where practical and disable expensive effects on small screens or reduced-motion devices.

## Testing and Validation

Automated tests will be written before production implementation and will verify:

- The bilingual route exists at the canonical path.
- English and Arabic metadata, canonical URLs, and hreflang values are correct.
- All eight service links resolve to canonical internal routes.
- Header and service navigation use the new Digital Presence hub.
- Sitemap and generated AI/LLM knowledge include the new route.
- JSON-LD types and visible FAQ content stay aligned.
- The page has one H1 and the required semantic section structure.

Final validation will include focused tests, TypeScript, production build, and rendered desktop/mobile checks for English, Arabic RTL, keyboard focus, reduced motion, overflow, overlap, and blank media.

## Non-Goals

- No pricing calculator or fixed package price.
- No new contact form; WhatsApp remains the primary consultation flow.
- No CMS schema migration in this iteration.
- No invented analytics, client results, testimonials, or partner claims.
- No restructuring of unrelated service categories.

## Acceptance Criteria

The work is complete when `/services/digital-presence` is a production-ready bilingual page that uses the shared site chrome, clearly explains the connected offer, links every related service, provides multiple natural WhatsApp conversion points, passes route/SEO/schema tests, and remains polished and usable across desktop, mobile, LTR, RTL, keyboard, and reduced-motion contexts.
