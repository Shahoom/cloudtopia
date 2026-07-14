# CloudTopia Industry Worlds — Master Design Specification

**Date:** 2026-07-15

**Status:** Approved concept; written specification pending review

**Routes:** `/industries/[industry]` and `/ar/industries/[industry]`

**Locales:** English and Arabic

**Program name:** CloudTopia Industry Worlds

**Design maxim:** The Industry Atlas is the map; every detail page is a world.

## 1. Decision Summary

CloudTopia will replace the current generic industry-detail template with one typed, server-rendered landing-page system that supports thirteen deliberately different industry worlds.

The system is unified by a shared semantic grammar, type-safe content contract, page shell, routing, accessibility rules, measurement hooks, and SEO/AEO infrastructure. It is differentiated by each industry's palette, visual motif, hero scene, narrative order, signature section, operating vocabulary, relevant systems, evidence, FAQs, and conversion language.

This is not a page builder and not thirteen disconnected microsites. It is a controlled design system with strong art direction, one named signature composition per world, and a narrow registered escape hatch only when shared primitives cannot express an approved composition.

Implementation is a program rather than one unsafe mega-change:

1. Build the foundation and three contrasting bilingual pilots: Healthcare, Logistics & Supply Chain, and Restaurants.
2. Roll out the regulated and trust-heavy worlds.
3. Roll out the commerce and place-based worlds.
4. Roll out the B2B operating worlds.
5. Complete discovery, SEO/AEO, proof, performance, and visual-regression integration, then retire the legacy fallback.

The complete program is not accepted until all thirteen industries render through the new system in both locales.

## 2. Product Outcome

Each industry page must make a qualified visitor feel, within the first viewport, that CloudTopia understands how that industry actually operates—not merely that CloudTopia can build a website for it.

The pages serve founders, commercial leaders, operations leaders, technical stakeholders, and public-sector decision makers across Oman, Saudi Arabia, the UAE, and the wider Arabic-speaking market. They must help a visitor:

1. Recognize their industry's real pressure and vocabulary immediately.
2. See an end-to-end operating journey rather than a generic service list.
3. Understand which connected digital system CloudTopia could build.
4. Evaluate constraints, integrations, ownership, and delivery fit.
5. Reach a relevant service, adjacent industry, or consultation path with confidence.

The primary conversion is an industry-specific consultation. Secondary conversions are visits to a relevant service page, a verified project, or an adjacent industry page.

## 3. Scope

### In scope

- A typed industry manifest and thirteen code-owned page definitions.
- A shared server-rendered shell and ordered section renderer.
- Thirteen distinctive world themes and hero scenes.
- Native English and Arabic content for every visible section.
- Localized metadata, canonical URLs, hreflang, Open Graph, schema, breadcrumbs, FAQs, and internal links.
- Responsive LTR and RTL layouts.
- A migration bridge from the existing generic detail route.
- Contract, render, route, accessibility, visual, performance, and content-parity tests.
- Lightweight manifest integration with navigation, sitemap, hub, and discovery surfaces.

### Out of scope

- Adding or renaming canonical industry slugs.
- Adding Entertainment or Startups. Startups is a company stage/audience, not an industry in this taxonomy.
- Rebuilding the `/industries` Atlas hub, which is already a separate experience.
- Creating a drag-and-drop Payload page builder.
- Inventing clients, metrics, awards, certifications, integrations, or compliance claims.
- Replacing the global header, footer, contact flow, or service taxonomy.
- WebGL, canvas-heavy scenes, autoplay video, or a new animation dependency.
- Publishing new claims about legal, medical, financial, or government compliance without an approved factual source.

## 4. Canonical Information Architecture

The current subfolder structure is preserved so authority and links remain stable.

```text
Homepage
└── Industries hub (/industries)
    ├── Healthcare (/industries/healthcare)
    ├── FinTech (/industries/fintech)
    ├── E-commerce & Online Retail (/industries/ecommerce-retail)
    ├── Real Estate (/industries/real-estate)
    ├── Education (/industries/education)
    ├── Travel & Hospitality (/industries/travel-hospitality)
    ├── Restaurants (/industries/restaurants)
    ├── Legal Firms (/industries/legal-firms)
    ├── Construction (/industries/construction)
    ├── Retail (/industries/retail)
    ├── Professional Services (/industries/professional-services)
    ├── Logistics & Supply Chain (/industries/logistics-supply-chain)
    └── Government & Public Sector (/industries/government-public-sector)
```

Arabic mirrors the same hierarchy under `/ar`. Every detail page links back to the localized hub, to two to four canonical service pages, and to two genuinely adjacent industries. The hub links to all thirteen worlds. No industry may become an orphan or rely on JavaScript for discovery.

### Taxonomy boundaries

| Slug | Owns | Explicitly does not own |
|---|---|---|
| `healthcare` | Clinics, patient journeys, care communication, clinical/admin workflows | Medical diagnosis or clinical claims |
| `fintech` | Digital financial onboarding, KYC/AML-supporting workflows, transactions, auditability | Claims of regulatory approval or guaranteed compliance |
| `ecommerce-retail` | Online catalog, checkout, payments, shipping, merchandising | In-store operations as the main journey |
| `real-estate` | Property discovery, qualification, viewing, agents, listings, off-plan journeys | Construction project delivery |
| `education` | Enrollment, learning, assessment, certification, learner/admin portals | General professional training marketed as consulting |
| `travel-hospitality` | Discovery, packages, availability, booking, stays, guest communication | Restaurant operations |
| `restaurants` | Menu, reservations, ordering, kitchen/POS flow, branches | Hotels and destination booking |
| `legal-firms` | Practice discovery, confidential intake, matters, documents, status | General professional-services positioning |
| `construction` | Tenders, prequalification, RFIs, submittals, suppliers, milestones | Property sales and listing journeys |
| `retail` | Physical and omnichannel stores, branches, POS, loyalty, click-and-collect | Online-only commerce as the main journey |
| `professional-services` | Expertise packaging, diagnostics, proposals, approvals, client delivery | Legal-matter workflows |
| `logistics-supply-chain` | Orders, warehouse, routing, proof of delivery, exceptions, SLAs | General e-commerce checkout or retail merchandising |
| `government-public-sector` | Eligibility, applications, cases, accessibility, public-service delivery | Unsupported claims of government clients or procurement status |

E-commerce and Retail cross-link because buyer journeys overlap, but their search intent, visual story, systems, and copy remain distinct.

## 5. The Shared Page Grammar

All pages answer the same seven questions. They may change the order and composition, but they may not omit the underlying meaning.

1. **Sector promise:** What better operating reality can CloudTopia help create?
2. **Operating pressure:** What is difficult, fragmented, slow, or opaque today?
3. **Journey:** How do customers, staff, partners, or citizens move through the experience?
4. **Buildable system:** What connected website, portal, commerce, automation, integration, content, or marketing system could solve it?
5. **Evidence and constraints:** What can be shown honestly, and what responsibilities or limitations matter?
6. **Regional delivery:** How do Arabic, RTL, local journeys, ownership, and regional operating needs affect the solution?
7. **Decision close:** What questions remain, and what is the most relevant next step?

This grammar prevents thin programmatic pages. A definition cannot pass validation by changing only an industry name, color, and keyword.

## 6. Experience Architecture

### 6.1 Shared shell

The shared shell owns only the elements that should behave identically:

- A skip target inside the locale layout's existing `main`; the shell itself uses a `div` root and may not create a nested `main`.
- Localized breadcrumbs.
- One H1.
- World label, industry identity, and primary CTA hierarchy.
- A compact, sticky “world coordinates” anchor rail on wide screens and an inline anchor index on small screens. Both follow document order and remain ordinary links without JavaScript.
- Shared primitives and schema plumbing for related services, related industries, FAQ, and the closing conversion frame. The ordered recipe—not the shell—owns their placement, inclusion, and content.
- JSON-LD output that mirrors visible content.
- Theme-token application and locale direction.
- Analytics attributes that identify the industry, locale, section, and CTA.

The shell must not own industry prose, a universal hero layout, a universal card grid, or a generic stock visual.

### 6.2 Ordered recipe

Each definition provides an ordered, discriminated section recipe. Registered types include:

- `pressure-field`
- `journey-map`
- `system-blueprint`
- `use-case-sequence`
- `service-bridge`
- `evidence`
- `constraints`
- `regional-fit`
- `faq`
- `closing-cta`
- `signature`

Each standard type has two or three controlled visual variants. Every world has a named signature **composition**, normally assembled from those shared variants and scene primitives. The `signature` section type is only an escape hatch when the approved composition cannot be expressed faithfully; it requires a slug-registered server component and a focused design review. A page may use at most one. Release A must first prove the shared variants and does not ship a custom signature component. No signature section can bypass heading, reduced-motion, contrast, locale, or content-contract rules.

The initial standard variant set is:

| Section type | Allowed variants |
|---|---|
| `pressure-field` | `split-signal`, `constraints-first`, `dense-ledger` |
| `journey-map` | `linear-route`, `dual-lane`, `exception-lane` |
| `system-blueprint` | `stacked-layers`, `constellation`, `service-line` |
| `use-case-sequence` | `numbered-flow`, `operating-matrix`, `timed-pass` |
| `service-bridge` | `route-links`, `capability-stack` |
| `evidence` | `verified-project`, `annotated-model` |
| `constraints` | `boundary-map`, `owner-register` |
| `regional-fit` | `bilingual-operations`, `market-path` |
| `faq` | `editorial-list`, `grouped-questions` |
| `closing-cta` | `framed-close`, `split-close` |

Release A maps its three named signature compositions entirely to standard variants:

- Healthcare “Continuity of care” = `journey-map:dual-lane`.
- Logistics “Exception control” = `journey-map:exception-lane` + `constraints:owner-register`.
- Restaurants “The pass” = `use-case-sequence:timed-pass`.

The renderer uses a discriminated union and an exhaustive `never` check. Validators require the seven semantic questions to be answered exactly once or by an explicitly declared combined section. Duplicate IDs, absent headings, unlocalized fields, invalid links, invalid assets, and unregistered variants fail tests and the production build.

Every definition also produces a rhythm fingerprint from its hero treatment, ordered `type:variant` sequence, and named signature composition. All thirteen fingerprints must be distinct. A recolored copy with the same fingerprint cannot pass validation or visual review.

### 6.3 Narrative rhythm

The default landing-page argument is:

```text
Promise → recognition → operating journey → system → proof/constraints
        → regional delivery → objection handling → consultation
```

Worlds may move evidence earlier for trust-heavy sectors, or move the journey earlier for experience-heavy sectors. Every section advances one idea. Repeated service-card grids and generic “digital transformation” filler are prohibited.

## 7. Visual Doctrine

This visual doctrine applies to migrated Industry World definitions. The temporary `LegacyIndustryPage` is deliberately exempt from world-scene, rhythm-fingerprint, and new-motion requirements so Release A can preserve fallback parity; it may receive only the documented accessibility/localization/link repairs, may not become the foundation for new work, and is removed at program completion.

The memorable device is a **living operating diagram**: every hero turns the industry's core journey into an authored scene. The scene is not decoration; labels, states, paths, and objects foreshadow the content below.

### Unified DNA

- CloudTopia's precise editorial grid, confident scale, bilingual craft, and fine technical linework.
- A stable spacing and type scale, consistent focus treatment, and a shared CTA hierarchy.
- Small “world coordinate” labels that connect each detail page back to the Atlas.
- Strong dominant color plus one sharp signal color; palettes are not evenly diluted.
- One designed hero scene, one signature composition, and one restrained motion idea per world.
- Intentional asymmetry and overlap on wide screens, with a linear semantic reading order underneath.
- Atmospheric depth through patterns, cropped geometry, controlled gradients, linework, texture, and negative space—not stacks of translucent cards.

### Prohibited patterns

- Using `HeroOrbitDeck` or the current hub's atlas scene as the foundation for any migrated Industry World. Its temporary presence inside the parity-preserving legacy renderer is the sole exemption.
- Purple-gradient-on-white defaults, random glowing blobs, fake dashboards, generic AI illustrations, or stock-photo banners.
- Applying a new color while retaining an identical hero and section order.
- Scroll-jacking, content hidden behind interaction, continuous marquee motion, or layout-shifting animation.
- A universal sea of rounded cards.

### Theme contract

Every world declares semantic tokens rather than styling raw selectors:

```text
canvas, surface, elevatedSurface, ink, mutedInk,
accent, accentInk, signal, line, focus,
displayTreatment, radiusMode, motifDensity, sceneTreatment
```

Button and text combinations must meet WCAG AA. Theme tests verify declared foreground/background pairs; visual review verifies state, focus, and forced-colors behavior.

Tokens are applied through audited CSS custom properties. Dynamic Tailwind color-class construction is prohibited because it is neither statically reliable nor independently contrast-auditable.

## 8. The Thirteen Worlds

The following briefs are binding art and content direction. Headline lines lock voice and promise intent; a native editor may refine wording without changing that intent, and the approved wording is versioned in the definition. Final page definitions must include complete native copy for every section.

### 8.1 Healthcare — Clinical Pulse

- **Localized world label:** “Clinical Pulse” / “نبض الرعاية”.
- **English promise:** “Digital care that moves with the patient.”
- **Arabic promise:** “رعاية رقمية تواكب المريض في كل خطوة.”
- **Palette:** mineral white `#F3FAF8`, clinical teal `#087F73`, deep ink `#0B2B2A`, life-signal coral `#E86262`.
- **Hero scene:** a calm pulse corridor connects discovery, doctor selection, booking, visit, results, and follow-up. Patient and staff paths are visually distinct but converge at care moments.
- **Narrative emphasis:** place trust and access before features; explain the patient journey, then the clinic operating layer.
- **Signature section:** “Continuity of care” pairs the patient-facing timeline with staff roles, notifications, and handoffs.
- **Buildable systems:** bilingual clinic sites, doctor directories, appointment flows, patient portals, CRM-supported follow-up, role-aware operations, and integrations designed around approved access, privacy, and security requirements.
- **Guardrails:** describe privacy, permissions, and data handling as design responsibilities. Never imply diagnosis, medical-device status, or automatic compliance.
- **Recipe:** promise → access and trust pressure → patient journey → continuity signature → clinic system blueprint → privacy/role constraints → regional fit → FAQ → consultation.
- **CTA intent:** “Map your patient journey” / “لنرسم رحلة المريض لديكم”.

### 8.2 FinTech — Trust Ledger

- **Localized world label:** “Trust Ledger” / “سجل الثقة”.
- **English promise:** “Build trust into every financial step.”
- **Arabic promise:** “ابنِ الثقة في كل خطوة مالية.”
- **Palette:** midnight `#071A22`, pale ledger `#F4FBFA`, trust mint `#27C7A8`, transaction cyan `#38BDF8`.
- **Hero scene:** an illuminated ledger records identity, consent, transaction, exception, and audit events along one controlled rail.
- **Narrative emphasis:** begin with trust, evidence, and responsibility; then show onboarding and transaction workflows.
- **Signature section:** “Trust boundary map” separates customer experience, business operations, integration layer, and regulated responsibilities.
- **Buildable systems:** product sites, onboarding portals, KYC/AML-supporting flows, dashboards, exception queues, payment integrations, audit trails, educational content.
- **Guardrails:** use “supports” for compliance-related capabilities. Never claim certification, authorization, approval, guaranteed security, or guaranteed compliance.
- **Recipe:** promise → trust-boundary signature → responsibilities and constraints → onboarding/transaction journey → system blueprint → evidence model → regional fit → FAQ → consultation.
- **CTA intent:** “Map your onboarding and transaction flow” / “لنرسم رحلة العميل من التسجيل إلى المعاملة”.

### 8.3 E-commerce & Online Retail — Catalog Rush

- **Localized world label:** “Catalog Rush” / “حركة الكتالوج”.
- **English promise:** “Turn product discovery into a faster path to purchase.”
- **Arabic promise:** “حوّل اكتشاف المنتجات إلى مسار شراء أسرع.”
- **Palette:** onyx `#121012`, warm white `#FFF8F3`, commerce magenta `#D92D7A`, dispatch amber `#F59E42`.
- **Hero scene:** products move through a kinetic catalog into cart, payment, fulfillment, and retention lanes; Arabic and English catalog states are both visible.
- **Narrative emphasis:** start with discovery and merchandising, then remove checkout and fulfillment friction.
- **Signature section:** “The bilingual product shelf” demonstrates product naming, options, pricing, VAT context, and Arabic QA as a designed system.
- **Buildable systems:** storefronts, catalog/PIM patterns, promotions, GCC payment flows, tax presentation, shipping integrations, order dashboards, lifecycle marketing.
- **Guardrails:** payment, tax, and carrier availability are integration-dependent; never promise a specific provider without validation.
- **Recipe:** promise → catalog journey → bilingual-shelf signature → conversion pressure → commerce blueprint → fulfillment dependencies → regional fit → FAQ → consultation.
- **CTA intent:** “Plan your commerce journey” / “خطّطوا لمسار التجارة الإلكترونية”.

### 8.4 Real Estate — Spatial Registry

- **Localized world label:** “Spatial Registry” / “السجل المكاني”.
- **English promise:** “Move property seekers from interest to viewing with clarity.”
- **Arabic promise:** “رحلة عقارية أوضح من البحث إلى المعاينة.”
- **Palette:** limestone `#F2EFE7`, registry green `#173F35`, copper `#A85E37`, survey blue `#5F7F91`.
- **Hero scene:** a sectional city and floor-plan registry shifts from location to development, unit, qualification, viewing, and agent handoff.
- **Narrative emphasis:** make complex inventory understandable before introducing lead automation.
- **Signature section:** “From plot to prospect” layers map, building, unit, availability, and agent workflow without pretending to provide live inventory unless integrated.
- **Buildable systems:** listing platforms, project sites, off-plan presentations, floor-plan libraries, lead qualification, viewing booking, agent routing, CRM and campaign connections.
- **Guardrails:** availability, pricing, ownership, and regulatory disclosures must come from approved data sources.
- **Recipe:** promise → spatial discovery → property-seeker journey → plot-to-prospect signature → system blueprint → data constraints → regional fit → FAQ → consultation.
- **CTA intent:** “Design your property journey” / “صمّموا رحلة عقارية أوضح”.

### 8.5 Education — Learning Constellation

- **Localized world label:** “Learning Constellation” / “كوكبة التعلّم”.
- **English promise:** “Connect enrollment, learning, and achievement.”
- **Arabic promise:** “اربط التسجيل بالتعلّم والإنجاز.”
- **Palette:** chalk cream `#F8F2DF`, academic navy `#14213D`, sunflower `#D79A18`, constellation blue `#5573C6`.
- **Hero scene:** learner paths form a constellation across discovery, enrollment, classroom, assessment, progress, and certification.
- **Narrative emphasis:** show one continuous learner journey while revealing the different roles behind it.
- **Signature section:** “One journey, many roles” switches semantic layers for learner, instructor, administrator, and guardian without hiding content in tabs.
- **Buildable systems:** institution sites, course discovery, admissions, LMS-connected portals, role dashboards, assessment workflows, certificates, communication and content.
- **Guardrails:** do not claim accreditation, learning outcomes, or integrations without verified evidence.
- **Recipe:** promise → learner journey → many-roles signature → enrollment pressure → learning-system blueprint → evidence/constraints → regional fit → FAQ → consultation.
- **CTA intent:** “Map your learning experience” / “لنرسم تجربة التعلّم لديكم”.

### 8.6 Travel & Hospitality — Guest Journey Atlas

- **Localized world label:** “Guest Journey Atlas” / “أطلس رحلة الضيف”.
- **English promise:** “Connect every guest moment, before and beyond the stay.”
- **Arabic promise:** “اربط كل لحظة في رحلة الضيف قبل الإقامة وما بعدها.”
- **Palette:** sand `#F7F0E3`, ocean `#083A5B`, sunset `#E86F4A`, lagoon `#2F91A5`.
- **Hero scene:** a tidal itinerary crosses inspiration, availability, package, booking, pre-arrival, stay, and return.
- **Narrative emphasis:** lead with desire and confidence, then expose availability, booking, PMS, and communication handoffs.
- **Signature section:** “The guest horizon” shows what the guest sees above the line and what teams coordinate below it.
- **Buildable systems:** destination and property sites, package discovery, booking paths, availability/PMS connections, pre-arrival flows, guest portals, multilingual content and campaigns.
- **Guardrails:** exclude restaurant operations; rates, inventory, and booking claims depend on live integrations.
- **Recipe:** promise → guest journey → horizon signature → confidence/availability pressure → booking blueprint → operational handoffs → regional fit → FAQ → consultation.
- **CTA intent:** “Shape your guest journey” / “صمّموا رحلة ضيوفكم”.

### 8.7 Restaurants — Service Rhythm

- **Localized world label:** “Service Rhythm” / “إيقاع الخدمة”.
- **English promise:** “Give every order a smoother rhythm.”
- **Arabic promise:** “امنح كل طلب إيقاعاً أكثر سلاسة.”
- **Palette:** charcoal `#161616`, menu cream `#FFF6E3`, saffron `#E89A13`, tomato `#D94736`.
- **Hero scene:** an energetic service pass sequences menu discovery, reservation, order, kitchen, pickup/table, loyalty, and branch feedback.
- **Narrative emphasis:** open with appetite and speed, then reveal the operational rhythm required to keep promises.
- **Signature section:** “The pass” visualizes front-of-house and back-of-house events on one timed service rail.
- **Buildable systems:** bilingual menus, reservations, ordering, POS/kitchen integrations, branch pages, campaign content, loyalty and feedback flows.
- **Guardrails:** allergen, price, availability, preparation-time, and delivery claims must be supplied and maintained by the operator.
- **Recipe:** promise → menu appetite → service-pass signature → timing/branch pressure → restaurant-system blueprint → operator-owned constraints → regional fit → FAQ → consultation.
- **CTA intent:** “Tune your service journey” / “اضبطوا إيقاع تجربة ضيوفكم”.

### 8.8 Legal Firms — Case Docket

- **Localized world label:** “Case Docket” / “سجل القضية”.
- **English promise:** “Make the first legal conversation clear and confidential.”
- **Arabic promise:** “اجعل أول تواصل قانوني واضحاً وسرياً.”
- **Palette:** parchment `#F4EBDD`, oxblood `#4A1620`, brass `#9B672D`, docket ink `#231C1D`.
- **Hero scene:** a carefully sealed docket moves from practice discovery to conflict check, confidential intake, documents, matter status, and communication.
- **Narrative emphasis:** put confidentiality, boundaries, and qualified intake before convenience claims.
- **Signature section:** “The confidential threshold” distinguishes public information, pre-engagement intake, and authenticated matter communication.
- **Buildable systems:** practice sites, expertise libraries, conflict-check intake, client portals with project-defined access roles, document workflows, matter updates, and CRM-supported relationship management.
- **Guardrails:** no legal advice, outcome promises, attorney-client relationship claims, or security guarantees. Intake wording requires legal review.
- **Recipe:** promise → confidential-threshold signature → qualified-intake journey → practice-system blueprint → confidentiality constraints → approved evidence → regional fit → FAQ → consultation.
- **CTA intent:** “Review your client intake” / “راجعوا مسار استقبال العملاء”.

### 8.9 Construction — Site Sequence

- **Localized world label:** “Site Sequence” / “تسلسل المشروع”.
- **English promise:** “Keep every project decision visible and moving.”
- **Arabic promise:** “مسار واضح لكل قرار في المشروع.”
- **Palette:** concrete `#ECECE8`, blueprint ink `#132A3A`, safety orange `#E96128`, survey blue `#246A9A`.
- **Hero scene:** a blueprint timeline connects prequalification, tender, RFI, submittal, approval, supplier, milestone, and client reporting states.
- **Narrative emphasis:** begin with costly information gaps, then show accountable project handoffs.
- **Signature section:** “Decision latency” makes waiting states, owners, and downstream effects visible without inventing savings figures.
- **Buildable systems:** corporate/project sites, vendor prequalification, tender portals, RFI/submittal workflows, supplier coordination, milestone dashboards, client portals.
- **Guardrails:** project status, safety, certification, and contractual data must be sourced and permissioned; do not imply engineering authority.
- **Recipe:** promise → information-gap pressure → decision-latency signature → project journey → delivery-system blueprint → contractual/data constraints → regional fit → FAQ → consultation.
- **CTA intent:** “Map your project workflow” / “لنرسم سير عمل مشاريعكم”.

### 8.10 Retail — Store Pulse

- **Localized world label:** “Store Pulse” / “نبض المتجر”.
- **English promise:** “Connect the shelf, the branch, and the customer.”
- **Arabic promise:** “اربط الرف والفرع والعميل في تجربة واحدة.”
- **Palette:** ivory `#FCF8F2`, retail plum `#36143F`, signal lime `#A7C92A`, campaign violet `#9B3D91`.
- **Hero scene:** a pulsing store plan connects branches, shelf availability, POS, click-and-collect, loyalty, promotions, and service moments.
- **Narrative emphasis:** lead with the physical customer moment, then show how digital channels and operations support it.
- **Signature section:** “One customer, many shelves” connects in-store, web, campaign, loyalty, and support contexts.
- **Buildable systems:** store locators, branch pages, omnichannel catalogs, POS/stock connections, click-and-collect, loyalty, promotion operations, dashboards and campaigns.
- **Guardrails:** inventory and promotion accuracy depend on source systems and branch discipline. Cross-link online-first needs to E-commerce.
- **Recipe:** promise → store journey → many-shelves signature → branch/stock pressure → omnichannel blueprint → promotion/data constraints → regional fit → adjacent commerce path → FAQ → consultation.
- **CTA intent:** “Connect your store journey” / “اربطوا رحلة متاجركم”.

### 8.11 Professional Services — Expertise Architecture

- **Localized world label:** “Expertise Architecture” / “هندسة الخبرة”.
- **English promise:** “Turn expertise into a clear client journey.”
- **Arabic promise:** “حوّل خبراتكم إلى رحلة عميل واضحة ومفهومة.”
- **Palette:** ivory `#F7F4EC`, ink `#101828`, ultramarine `#1B57D0`, slate signal `#7184B4`.
- **Hero scene:** an architectural framework assembles diagnosis, packaged offer, proposal, approval, delivery, knowledge, and client reporting.
- **Narrative emphasis:** clarify expertise and buying confidence before discussing delivery automation.
- **Signature section:** “The expertise model” turns an intangible service into visible inputs, decisions, deliverables, and client outcomes.
- **Buildable systems:** authority-led sites, service packaging, diagnostic tools, proposal/approval workflows, client portals, knowledge libraries, CRM and reporting.
- **Guardrails:** exclude legal-matter workflows; outcome and ROI claims require project-specific evidence.
- **Recipe:** promise → expertise-model signature → buying-confidence pressure → client journey → delivery-system blueprint → approved evidence → regional fit → FAQ → consultation.
- **CTA intent:** “Structure your client journey” / “نظّموا رحلة عملائكم”.

### 8.12 Logistics & Supply Chain — Flow Control

- **Localized world label:** “Flow Control” / “ضبط التدفق”.
- **English promise:** “See every handoff from order to proof of delivery.”
- **Arabic promise:** “رؤية أوضح لكل خطوة من الطلب إلى إثبات التسليم.”
- **Palette:** deep route `#08141F`, ice `#F0F8FC`, flow cyan `#10A9B6`, exception amber `#E89B24`.
- **Hero scene:** a live route field moves through order, warehouse, dispatch, route, exception, delivery, and proof, with exception paths visibly breaking and rejoining the flow.
- **Narrative emphasis:** make exceptions and ownership visible early; avoid presenting only the happy path.
- **Signature section:** “Exception control” pairs an operating route with owner, SLA, customer communication, and recovery state.
- **Buildable systems:** customer portals, order visibility, warehouse/TMS/WMS/fleet integrations, dispatch workflows, exception queues, proof of delivery, dashboards and API connections.
- **Guardrails:** live tracking, SLA, route, and carrier claims depend on source-system quality and API access.
- **Recipe:** promise → operating route → exception-control signature → ownership/SLA pressure → flow-system blueprint → integration constraints → regional fit → FAQ → consultation.
- **CTA intent:** “Map your flow and exceptions” / “لنرسم تدفق العمليات والاستثناءات لديكم”.

### 8.13 Government & Public Sector — Public Service Standard

- **Localized world label:** “Public Service Standard” / “معيار الخدمة العامة”.
- **English promise:** “Make public services clearer for people and easier to operate.”
- **Arabic promise:** “اجعل الخدمات العامة أوضح للناس وأسهل في التشغيل.”
- **Palette:** civic white `#F4F8F7`, civic blue `#12304B`, service emerald `#087867`, public-signal blue `#3178C6`.
- **Hero scene:** a calm civic pathway connects eligibility, application, identity/document steps, case ownership, status, communication, and completion.
- **Narrative emphasis:** begin with public clarity, accessibility, and trust; then show case operations and governance boundaries.
- **Signature section:** “The service standard” evaluates clarity, accessibility, status visibility, language, ownership, and assisted-service paths.
- **Buildable systems:** service portals, eligibility guidance, applications, case status, content systems, accessibility improvements, dashboards, integrations and assisted-service tools.
- **Guardrails:** address data residency, security, procurement, accessibility, and policy as requirements to validate. Never imply a government client, mandate, clearance, or guaranteed compliance.
- **Recipe:** promise → public-service standard signature → citizen journey → clarity/access pressure → case-system blueprint → governance constraints → regional fit → FAQ → consultation.
- **CTA intent:** “Review a public service journey” / “راجعوا رحلة إحدى خدماتكم العامة”.

## 9. Content Contract

English and Arabic are paired at section level but authored independently. Equivalent meaning is required; identical sentence structure and word counts are not.

Each localized page must contain:

- Unique SEO title, description, H1, subheadline, and answer-first introduction.
- A sector-specific operating-pressure narrative.
- A named journey with industry-native stages and actors.
- Three to six concrete use cases with relevant inputs, handoffs, and outcomes.
- Two to four canonical service bridges written in sector language.
- Relevant constraints and integration dependencies.
- Regional delivery content that adds information rather than repeating “bilingual”.
- Four to seven unique FAQs.
- Industry-specific primary and secondary CTA copy.
- Descriptive internal-link anchors.

### Writing standard

- Professional, direct, regionally aware, and commercially confident.
- Customer language over CloudTopia jargon.
- Concrete nouns and actions over “innovative”, “seamless”, “cutting-edge”, or generic “digital transformation”.
- Benefits must be tied to a visible workflow or decision.
- One idea per section.
- No unsupported percentages, timelines, savings, rankings, client counts, or superlatives.

### Arabic standard

- Native Modern Standard Arabic with clear Gulf-facing business language; never literal machine translation.
- Natural Arabic headings rather than English syntax written in Arabic words.
- Generous Arabic line height and widths tuned independently from English.
- Technical tokens such as CRM, ERP, API, SaaS, KYC, AML, PMS, POS, TMS, and WMS use `<bdi dir="ltr">` or equivalent Unicode isolation.
- Latin numbers, product names, domains, and mixed-direction punctuation must not reorder visually.
- Arabic UI text uses zero letter spacing, no uppercase or Latin italic treatment, display leading in the `1.3–1.4` range, and body leading in the `1.8–1.95` range unless a documented typeface test supports a more suitable value.
- Every Arabic definition, including the world label, promise, CTA, metadata, scene labels, body, and FAQ, requires independent native editorial review before publication. The release record stores reviewer, review date, locale, and approved content-version hash.
- Healthcare, FinTech, Legal, and Government copy also requires sector/claims review for sensitive wording; native language review alone is not sufficient.

### Proof standard

Proof may appear only when its source is verified in the repository or approved by the business owner. Existing names or project references are candidates, not automatic approval. A definition records proof provenance and approval state; unapproved proof is omitted rather than replaced with a fabricated metric.

When direct proof is unavailable, the page may demonstrate knowledge through a concrete operating model, constraints, sample architecture, or annotated journey. It must not imitate a case study.

Every regulated, quantitative, security, ownership, partnership, certification, accessibility, “real-time”, client, or outcome claim receives a source-register entry with a claim ID, exact wording, scope, source, owner, approval state, review date, and expiry/recheck date. This includes references such as HIPAA, GDPR, PCI DSS, SAMA, NCA, ZATCA, encryption, “100% ownership”, and “fixed price”. Ownership copy excludes third-party licenses/accounts/assets as appropriate; fixed-price copy applies only to an agreed scope and change-control process.

## 10. Technical Architecture

### 10.1 Proposed file boundaries

```text
lib/industries/
├── slugs.ts                       # canonical slug tuple and type guard
├── types.ts                       # manifest, theme, locale, and section contracts
├── manifest.ts                    # lightweight labels, links, relationships, discovery data
├── get-industry-page.ts           # server-only resolver and migration fallback
├── validate-industry-pages.ts     # build/test-time invariants
└── definitions/
    ├── healthcare.ts
    ├── fintech.ts
    ├── ecommerce-retail.ts
    ├── real-estate.ts
    ├── education.ts
    ├── travel-hospitality.ts
    ├── restaurants.ts
    ├── legal-firms.ts
    ├── construction.ts
    ├── retail.ts
    ├── professional-services.ts
    ├── logistics-supply-chain.ts
    └── government-public-sector.ts

components/industry/detail/
├── IndustryPageShell.tsx
├── IndustrySectionRenderer.tsx
├── IndustryHero.tsx
├── IndustryRelatedLinks.tsx
├── industry-detail.module.css
├── sections/                      # standard server-rendered section variants
├── scenes/                        # authored, accessible world scenes
└── client/                        # narrowly scoped optional interactions only
```

`definitions/*` and the resolver are server-only. Header, Footer, homepage, sitemap, and hub consumers import the lightweight manifest, never the full prose or scene definitions.

### 10.2 Data ownership

- `slugs.ts` is the one canonical list of thirteen route keys.
- `manifest.ts` owns lightweight identity and connectivity: localized label, nav summary, route, category, canonical service IDs, related-industry IDs, and discovery flags.
- Each definition owns art direction, ordered recipe, localized visible copy, metadata, FAQs, proof references, and assets.
- Canonical services, projects, markets, and industries are referenced by typed IDs, never repeated handwritten URLs.
- Existing Payload route-SEO overrides remain optional, validated overrides on top of the code-owned defaults.
- The manifest is declared `as const`; registries and scene maps use `satisfies Record<IndustrySlug, …>` so omissions and stray keys fail type checking.
- Existing `LocalizedText`, `industries`, `industrySlugs`, `getIndustry`, and `localizedValue` consumers receive a compatibility export or adapter until each import is migrated. No big-bang deletion is allowed.

### 10.3 Contract shape

The type-member names below are illustrative; the ownership and server/client boundaries are binding:

```ts
type IndustryPageDefinition = {
  slug: IndustrySlug
  world: {
    id: IndustryWorldId
    theme: IndustryTheme
    heroScene: IndustrySceneId
    signatureSection?: IndustrySignatureId
  }
  assets: IndustryAsset[]
  locales: {
    en: LocalizedIndustryPage
    ar: LocalizedIndustryPage
  }
}

type LocalizedIndustryPage = {
  seo: LocalizedSeo
  breadcrumbLabel: string
  hero: LocalizedHero
  sections: IndustrySection[]
}
```

Recipe entries are content-bearing localized objects. FAQ questions/answers and closing-CTA copy live only in their `faq` and `closing-cta` entries; the shell and schema builder read those entries rather than duplicating top-level fields. Service-bridge and related-industry entries provide localized anchor copy keyed to the manifest's canonical IDs and cannot introduce a route outside that manifest. All localized arrays use stable semantic IDs so parity can be tested without requiring literal translations.

`world.id` is an internal, non-visible identifier. Every `LocalizedHero` contains its own reviewed `worldLabel`; the shell never displays an English internal name as an Arabic fallback.

### 10.4 Data flow

```text
canonical slug + locale
        ↓
lightweight manifest lookup ──→ unknown slug: notFound()
        ↓
server-only page definition resolver
        ↓
definition validator
        ↓
metadata/schema + page shell + ordered section renderer
        ↓
HTML-first localized page; optional isolated client enhancement
```

### 10.5 Routing and migration

- Retain `app/(frontend)/[locale]/industries/[industry]/page.tsx` as a thin route orchestrator.
- `generateStaticParams` emits all thirteen slugs for both supported locales through the project's existing locale routing conventions.
- Unknown slugs call `notFound()`.
- During phased rollout, a known slug without a new definition renders an extracted `LegacyIndustryPage` using the current `IndustryData`; the adapter does not synthesize a fake new-world recipe. It preserves HTTP status, metadata/schema coverage, FAQ data, visible copy, and market links, while intentional baseline repairs remove the nested `main`, localize exposed labels, and render configured service destinations as real anchors.
- A page is considered migrated only when both English and Arabic definitions pass all contracts.
- At final program acceptance every canonical slug must resolve to a new definition; the legacy adapter is then removed.
- Release A sets `dynamicParams = false` after the contract test proves that all thirteen known slugs—including legacy-adapted slugs—are emitted. This does not wait for all worlds to migrate because the taxonomy itself is already closed.

## 11. SEO, AEO, and Discovery

These are high-value persona/industry pages, not mass-generated doorway pages. Each page targets a distinct intent cluster and provides genuinely unique operational value.

### Per-page requirements

- Unique localized title and meta description.
- One descriptive H1 and logical H2/H3 hierarchy.
- Self-referencing canonical URL.
- English, Arabic, and `x-default` hreflang. Public English canonicals are unprefixed; `/en/...` is never emitted as canonical and continues to redirect through the existing routing policy.
- Localized Open Graph/Twitter copy and a valid 1200×630 industry visual.
- Localized image alt/scene summaries and locale-specific intent mapping expressed through useful visible copy, titles, and descriptions. Arabic metadata may not be built by appending English keyword phrases to an Arabic industry name, and the system does not rely on `metadata.keywords` for search visibility.
- Crawlable breadcrumb, hub link, service links, and related-industry links.
- One connected JSON-LD graph with stable page/entity `@id` values and the canonical Organization reference: `WebPage` and `BreadcrumbList`; `Service` and `FAQPage` only where visible content supports them. No industry-business type may imply that CloudTopia practices medicine, law, finance, or government services.
- Schema labels localized consistently. Arabic schema may not emit English “Home”, “Industries”, or “Digital Solutions” labels.
- FAQ schema must be generated from the exact visible FAQ data.
- No review, rating, client, or quantitative schema without verified visible evidence.
- Metadata precedence is explicit: approved `SeoOverrides` > published `Pages` SEO > code-owned world definition. Body content remains code-owned; the hidden `Pages.programmaticLanding` field is not introduced as a second content authority.
- Any canonical override updates canonical, `openGraph.url`, reciprocal hreflang, and `x-default` as one consistent URL set. Titles pass through the site's brand-suffix normalization before the locale layout template is applied.

### Cannibalization boundaries

- Industry pages own “digital solutions/websites/systems for [industry]” and the industry's operating journey.
- Service pages own how CloudTopia delivers a capability.
- Project pages own client-specific evidence.
- Hub pages own comparison and discovery across industries.

Copy and metadata must respect these boundaries. The E-commerce and Retail definitions require especially deliberate keyword separation.

### Discovery integrations

The lightweight manifest eventually supplies:

- Industry Atlas links and labels.
- Header and Footer industry navigation.
- Homepage industry links.
- Country landing-page industry cards, Solution Finder aliases, and the Payload admin route manifest.
- Localized sitemap entries.
- Markdown route output and generated `llms.txt` content.
- Site facts, MCP/agent discovery data, chatbot knowledge, and retrieval records capable of returning the correct localized industry page.

These consumers receive concise approved summaries only, not the full page-definition registry. The homepage may retain its curated ten-slide presentation taxonomy, using a typed target union: `{ kind: 'industry'; slug: IndustrySlug } | { kind: 'hub' }`. Finance, Logistics, E-commerce, and Restaurants map to their explicit canonical slugs; Entertainment and Startups target the hub because they are not canonical industries. Restaurants must link to `/industries/restaurants`. A discovery integration test prevents route, label, and taxonomy drift.

HTML and Markdown discovery share the same slug guard. Unknown industry paths return 404 in both representations rather than generic company content with a successful status. Sitemap `lastModified` uses a definition-specific `updatedAt` or approved content-review date; when neither is known, the field is omitted rather than fabricated.

Visible FAQs remain useful for people and semantic reuse, but FAQ markup is not positioned, measured, or sold as a Google rich-result feature. Google stopped showing that feature in May 2026 and removed its documentation in June 2026. Likewise, `llms.txt` is maintained for systems that choose to consume it, not as a Google ranking lever. Search visibility continues to depend on crawlable, indexable HTML, useful text, real links, and structured-data parity. See Google's [Search documentation updates](https://developers.google.com/search/updates) and [generative AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide).

## 12. Conversion Design

Every page has one primary action: discuss the visitor's industry journey with CloudTopia. CTA language names what the visitor receives; generic “Learn more” and “Get started” labels are not used.

The primary CTA appears in the hero, after the system/evidence argument, and in the final close. Repetition uses the same destination and consistent intent. Secondary CTAs route only to the most relevant service or verified proof.

Trust is built through specificity, visible operating understanding, transparent constraints, client ownership, and clear next steps. When no verified testimonial or metric exists, the design does not manufacture social proof or leave an empty logo wall.

Analytics attributes support later experiments without shipping an experiment in the initial implementation:

- Industry and locale.
- CTA location and intent.
- Related-service and related-industry link selections.
- Optional signature-section interaction.

No conversion claim is made until analytics has a valid baseline.

## 13. Accessibility and RTL

The page system enforces:

- Exactly one site-layout `main`, one H1, semantic sections, and logical heading order.
- Skip link and visible keyboard focus.
- Native links for navigation and buttons for state changes.
- Minimum 44×44px interactive targets.
- WCAG AA contrast: normal text at least 4.5:1, large text and essential UI boundaries at least 3:1, and focus indicators at least 3:1 against every adjacent surface.
- No state communicated by color alone.
- Content remains present without JavaScript.
- Reduced-motion mode removes all nonessential movement.
- Forced-colors support for controls and essential diagrams.
- Scene descriptions or hidden summaries when an illustration conveys process information.

RTL is structural, not a CSS flip applied at the end:

- Use logical properties and semantic DOM order.
- Directional arrows mirror only when their meaning is directional; play, external-link, and brand symbols do not.
- Timelines follow the reading direction while chronological stage numbers remain correct.
- Asymmetric desktop compositions collapse to the same meaningful reading order on mobile.
- No DOM reversal, duplicated locale markup, or physical `left`/`right` assumptions for content alignment.

## 14. Motion and Interaction

These rules apply to migrated Industry World definitions; the temporary legacy renderer retains its current motion behavior until that slug migrates, while continuing to honor its existing reduced-motion path.

The default page is a server-rendered document. Visual ambition comes from composition, type, scene art, color, and CSS—not a large client runtime.

- Animate only `transform` and `opacity`; no layout, filter, blur, or paint-heavy animation.
- A world may have one orchestrated hero entrance and one meaningful interactive or scroll response. The entrance runs once and settles within five seconds. No ambient animation runs indefinitely; any user-started continuous process provides visible pause/stop controls.
- Sticky compositions may enhance wide screens only when all content remains in normal semantic flow.
- No animation may move the primary CTA, resize controls, cause cumulative layout shift, or block reading.
- `prefers-reduced-motion: reduce` renders the final readable state immediately.
- Client components are allowed only for a real stateful interaction and must be isolated under `components/industry/detail/client`.
- If an interaction changes content, its active state is programmatic and not color-only; any live-region announcement is a concise status sentence, never an entire replaced article.

## 15. Performance Budget

Budgets apply to migrated Industry World definitions. Legacy fallback routes are measured for regression but are not required to meet new-world asset budgets before their migration release.

- Server Components by default.
- Target no incremental client JavaScript; hard review threshold of 30KB gzip per industry page above the shared site baseline.
- One explicitly sized, priority hero asset. Below-the-fold assets are lazy-loaded.
- Art scenes use optimized SVG/CSS or appropriately sized AVIF/WebP; no unbounded inline-SVG DOM. Responsive scene payload targets are at most 150KB on mobile and 250KB on desktop.
- Define stable media aspect ratios to avoid layout shift.
- Do not import all industry copy or scenes into Header, Footer, homepage, or client bundles.
- Pages use the site's existing optimized English and Arabic families. Worlds vary scale, weight, spacing, and editorial/technical treatment without adding thirteen font downloads; Arabic never inherits Latin case, italics, or tracking treatments.
- Production verification targets LCP ≤2.5s, CLS ≤0.1, and INP ≤200ms under representative mobile conditions; no claim is made from local desktop alone.

## 16. Failure and Fallback Behavior

- Unknown slug: localized not-found route.
- Known but not-yet-migrated slug during rollout: explicit legacy generic renderer.
- Missing English or Arabic page: validation failure; neither locale is marked migrated.
- Invalid theme, contrast pair, asset, section variant, canonical ID, or link: test/build failure.
- Missing optional proof: omit the proof module and rebalance the recipe; never create a placeholder claim.
- Missing optional CMS SEO override or CMS request failure: use the code-owned localized default.
- Missing hero media: render the definition's intentional CSS/SVG fallback with stable dimensions.
- Client enhancement failure: the complete server-rendered journey remains readable and actionable.

## 17. Existing-System Migration Notes

The implementation must deliberately resolve current fragmentation:

- The current detail route is a large generic composition and becomes a thin orchestrator.
- Industry identity is currently repeated across SEO content, hub content, visual maps, navigation, homepage data, sitemap/discovery data, and inline route logic. The lightweight manifest becomes the route-and-label source of truth.
- Existing industry records are too short and structurally generic to serve as final world definitions. They may seed facts but not be mechanically copied.
- Header and Footer must not import full localized page prose.
- Dark world sections expose the existing `data-header-theme="dark"` contract so the shared Header remains legible.
- The existing generic Open Graph fallback must be replaced with a valid localized industry asset or a verified shared fallback.
- Arabic structured-data labels must be localized rather than inheriting English literals.
- Homepage, country landing pages, Solution Finder, Payload's admin route manifest, and discovery links must be aligned through the canonical manifest or a temporary compatibility adapter; any restaurant link pointing to Travel & Hospitality is corrected during discovery integration.
- Existing route SEO overrides, URL localization helpers, breadcrumb components, JSON-LD helpers, schema helpers, and image helpers should be reused where their contracts remain correct.
- The Atlas hub's large stylesheet is not a base for the detail system. Dead hub CSS cleanup is a separate focused maintenance task.

## 18. Testing Strategy

Implementation follows test-driven development. The minimum layers are:

### Definition contracts

- Exactly thirteen canonical slugs.
- Complete English and Arabic data for every migrated definition.
- Stable semantic parity IDs across locales.
- Unique titles, descriptions, H1s, hero promises, FAQs, CTA labels, and content fingerprints.
- Required grammar coverage, allowed variants, at most one signature section.
- Valid themes, assets, service IDs, related industries, proof provenance, and canonical links.
- Claim-source validation fails for a missing record, unapproved or expired record, or visible wording that does not match the approved claim text/scope.
- Native-review records exist for every released Arabic content version; sensitive-sector definitions also carry the required claims/domain approval.

### Server rendering

- One H1 and one main landmark.
- Correct locale and `dir`.
- No `undefined`, placeholder, or untranslated UI labels.
- Unique section IDs and valid heading hierarchy.
- FAQ/schema equality and schema-visible-content agreement.
- Unknown slugs not found; known staged slugs use the intended renderer.
- Snapshot/behavior parity for the ten Release A fallback worlds: 200 status, effective metadata precedence, localized schema and FAQs, visible legacy content, market links, and configured service anchors. Only the documented baseline repairs may change their output.

### Routes and discovery

- All twenty-six localized routes build and resolve.
- Canonical and hreflang URLs are reciprocal and correct.
- Metadata fixtures exercise every precedence level (`SeoOverrides > Pages > definition`), partial canonical overrides, brand-suffix normalization, effective `noindex`, and rejected incomplete locale pairs. Canonical, Open Graph URL, hreflang, `x-default`, schema URL, robots, and sitemap inclusion must change atomically.
- All twenty-six JSON-LD graphs parse with localized labels, stable `@id` values, the canonical Organization reference, connected graph relationships, visible-content parity, and no prohibited industry-practitioner type.
- Sitemap, Atlas, Header/Footer, homepage, country cards, Solution Finder, admin route manifest, Markdown, `llms.txt`, site facts, MCP, chatbot, and retrieval consume canonical manifest identities or an explicit compatibility alias.
- Generated `llms.txt` contains all thirteen approved English and thirteen Arabic canonical URLs, names, and concise summaries. Site facts, MCP, chatbot, and retrieval tests query every industry and assert the matching slug, locale, content identity, and canonical URL—not merely a manifest import.
- Every configured related service renders as a crawlable anchor; no broken service, proof, or related-industry link exists.
- Sitemap emits each indexable localized canonical exactly once, excludes effective `noindex` pages, carries reciprocal alternates, and uses definition-aware `lastModified` data.
- Every Open Graph URL returns HTTP 200 with an image MIME type.
- Valid English and Arabic Markdown requests return the matching localized industry content and links; unknown industry Markdown requests return 404.

### Browser and accessibility

- Representative widths of 320, 360, 390, 768, 1024, and 1440px in English and Arabic.
- Keyboard-only navigation, visible focus, zoom, reduced motion, and forced-colors checks.
- Automated axe scan plus manual landmark, reading-order, and scene-description review.
- No clipping, overlap, horizontal overflow, unreadable mixed-direction token, or content hidden behind interaction.

### Visual and performance

- Visual regression baselines for each of the thirteen hero scenes and each recipe family in both directions.
- Smoke screenshots for all twenty-six pages.
- Stable media dimensions and no observable layout shift from page-owned components.
- Bundle comparison and production-build verification against the 30KB incremental-JS review threshold and responsive scene-asset budgets.
- Mobile performance verification for LCP ≤2.5s, CLS ≤0.1, and INP ≤200ms, with any environmental exception documented rather than silently waived.

Existing tests that assert obsolete implementation details are replaced atomically in Release A. In particular, requirements for `HeroOrbitDeck`, `industryHeroImage`, or old route-source strings are removed only in the same change that adds behavioral route, registry, metadata, content, and accessibility contracts. Tests are never deleted merely to make a redesign pass.

## 19. Delivery Program

Each release is independently reviewable and keeps all existing routes working.

### Release A — Foundation and pilots

- Canonical slugs, lightweight manifest, types, resolver, validators, shell, renderer, standard sections, theme tokens, migration adapter, and tests.
- Full native English/Arabic definitions and art direction for Healthcare, Logistics & Supply Chain, and Restaurants.
- These pilots intentionally test light/trust, dark/operational, and dark/editorial worlds; calm and energetic motion; simple and exception-heavy journeys; LTR and RTL.
- Browser, accessibility, visual, bundle, metadata, schema, and production-build verification.

### Release B — Regulated and trust-heavy worlds

- FinTech, Legal Firms, Government & Public Sector, and Education.
- Native editorial/legal review gate for sensitive claims and Arabic copy.
- Trust-boundary, confidentiality, public-service, and multi-role section variants.

### Release C — Commerce and place worlds

- E-commerce & Online Retail, Retail, Real Estate, and Travel & Hospitality.
- Explicit search-intent separation between E-commerce and Retail.
- Catalog, store, spatial, and guest-journey scene families.

### Release D — B2B operating worlds

- Construction and Professional Services.
- Decision-latency and expertise-model signature compositions.

### Release E — System completion

- Complete discovery-manifest adoption across Atlas, navigation, homepage, sitemap, Markdown, `llms.txt`, site facts, MCP, and chatbot.
- Verify and attach approved proof only.
- Generate/verify localized Open Graph assets.
- Run all twenty-six route, accessibility, visual-regression, and performance checks.
- Remove the legacy generic adapter when every contract passes.

The implementation plan written after this specification is approved will cover Release A only; this document is Release A's design authority. Releases B–E each receive a focused design addendum, written review checkpoint, and bounded implementation plan before code changes for that release, so copy and visual quality do not collapse under batch size.

## 20. Program Acceptance Criteria

The Industry Worlds program is complete only when:

1. All thirteen canonical industries render through the new system in English and Arabic.
2. Every world is recognizably unique without losing CloudTopia's shared design DNA.
3. Each page contains original, industry-specific, native bilingual content and passes uniqueness contracts.
4. Every page answers all seven semantic questions and has one clear industry-specific conversion path.
5. All visible proof and claims have approved provenance; absent proof is never fabricated.
6. All twenty-six routes have correct metadata, canonical, hreflang, Open Graph, visible-aligned schema, sitemap presence, breadcrumbs, and internal links.
7. Keyboard, screen-reader structure, contrast, reduced motion, RTL, mixed-direction content, responsive behavior, and no-JavaScript reading are verified.
8. The production build, focused tests, broader relevant suite, browser matrix, and visual baselines pass.
9. Page-owned client JavaScript stays within the review threshold or has an explicit, measured exception.
10. The legacy generic detail renderer is removed only after all previous criteria pass.

## 21. Resolved Decisions

- The canonical taxonomy is the existing thirteen slugs.
- E-commerce and Retail remain separate.
- Entertainment and Startups are not added in this program.
- Visible body content and recipes are code-owned. Payload remains an optional validated SEO-metadata override only, not a body-content authority or free-form page builder.
- The page system uses controlled variants plus one registered signature escape hatch per world.
- Healthcare, Logistics & Supply Chain, and Restaurants are the first pilots.
- Arabic is authored natively and reviewed at the same release gate as English.
- Unverified proof is omitted.
- Visual differentiation is achieved through art direction and composition, not thirteen independent runtimes.
