# Services Redesign — Design Spec

**Date:** 2026-06-30
**Branch:** `redesign/services-listing-menu`
**Status:** Awaiting approval (cut-list in §6 is the key sign-off gate)

---

## 1. Context

CloudTopia is a bilingual (EN/AR, RTL-aware) Next.js + Payload CMS site for a Gulf web/marketing agency. The services area is mid-migration between two taxonomies:

- **Old:** `serviceCategories` in `lib/seo/services.ts` — still feeds the **header mega-menu** and the generic `/services/[slug]` long-tail pages.
- **New (target of this work):** group → pillar → sub-service structure in `lib/services/digital-presence.ts` (+ `business-systems.ts`, `web-applications.ts`), aggregated by `lib/services/structured-catalog.ts`. This powers the `/services` hub and the rich `/services/[slug]` pillar & sub-service pages.

The new structured `/services/[slug]` pages are statically generated but **not in the sitemap** and the branch is **not deployed** — so deletions in this spec carry **no SEO/redirect risk** (verified: `app/sitemap.xml/route.ts` has no structured slugs; `proxy.ts` has no inbound redirects to the deleted pillars). We will still grep `proxy.ts` before deleting, as a safety check.

## 2. Goals (the nine requirements)

**Listing page**
1. Remove the "Explore Digital Presence / Business Systems" featured block on `/services`.
2. Remove the sub-services **dropdown/accordion** (`CategoryExplorer`); show sub-services as **cards inside each pillar's main page**.
3. Every pillar main page must have a sub-services **card section** (using the existing flowing `GlowingEffect` card). Add it where missing.
4. The `/services` hub keeps its look but becomes **big, detailed pillar cards** (grouped by journey group) with **no dropdown**.

**Taxonomy + content (Digital Presence groups in `lib/services/digital-presence.ts`)**
5. Data-driven "projects we did" per page: tag projects → service in the CMS, query by tag with a closest-match fallback so a future project auto-appears.
6. **Get Found** group: delete the **Local SEO & Discoverability** pillar (fold key sub-services into SEO); add **AEO** and **GEO** pillars; "hugely great" design for AEO/GEO + a refreshed SEO page.
7. **Engage & Convert** group: delete **Customer Support Chat Automations** and **Customer Experience Portals**; keep **Social Media Management**.
8. Delete the whole **Grow & Retain** group; move **Content Marketing & Authority** into Engage & Convert. (Per decision: Review & Reputation and Analytics were never live → deleted, not relocated.)
9. Rename **Communication & Engagement** → **Growth & Engagement**.

**Plus (from clarifications):** AEO/GEO have **no sub-services** (pillar pages only); **trim non-necessary sub-services across all Digital Presence pillars** (§6); **keep Arabic in sync** for everything kept/added/renamed/deleted.

## 3. Restructured Digital Presence taxonomy

Final `digitalPresenceGroups` after this work:

```
① The Core Foundation            · "Build owned assets"   (UNCHANGED)
   ├─ Website Development
   ├─ E-Commerce Development
   └─ UI/UX Design & Branding

② Visibility & Discoverability    · "Get found"
   ├─ Search Engine Optimization (SEO)   ← absorbs key Local SEO sub-services
   ├─ Answer Engine Optimization (AEO)   🆕  no sub-services
   └─ Generative Engine Optimization(GEO)🆕  no sub-services
   ✗ Local SEO & Discoverability  (deleted, folded into SEO)

③ Growth & Engagement             · "Engage & convert"   (renamed from "Communication & Engagement")
   ├─ Social Media Management (SMM)
   └─ Content Marketing & Authority      ← moved in from deleted ④
   ✗ Customer Support Chat Automations   (deleted)
   ✗ Customer Experience Portals         (deleted)

✗ ④ Growth & Reputation           (group deleted)
   ✗ Review & Reputation Management      (deleted — never live)
   ✗ Analytics & Performance Reporting   (deleted — never live)
```

Group `slug` for ③ stays `communication-engagement` (avoids touching every reference); only the display `name` changes to "Growth & Engagement" (EN) / "النمو والتفاعل" (AR). Tagline stays "Engage & convert" / "تفاعل وحوّل".

## 4. Part A — Services listing page (`/services`)

`ServicesPageClient.tsx` (1288 lines) today: hero → **featured "Explore" block** (1024–1051 data, 1120–1150 render) → search + left sidebar of category buttons → right panel that renders `CategoryExplorer` (the accordion) for digital-presence/business-systems, else `StructuredCategoryGroups` → final CTA.

**Changes:**
- **Delete** the featured "Explore" block (`featuredByCategory` + its render) — requirement 1.
- **Replace** the `CategoryExplorer` accordion with **always-visible big pillar cards grouped by journey group**. Each group renders its tagline + name, then a grid of `PillarCard`s (the component already exists at `ServicesPageClient.tsx:881`, currently only used in search). Card = icon, name, description, a few sub-service chips + "+N more", and "Explore service" → `pillar.href`. No expansion, no dropdown — requirements 2 & 4.
- Keep the left category sidebar + search (filtering still works); the right panel now shows grouped pillar cards instead of the accordion.
- `StructuredCategoryGroups` is updated/retired so all structured categories render the same grouped-cards layout (consistent for digital-presence, business-systems, web-apps).

**Net:** the hub is "big cards of main pages, grouped by journey, no dropdown."

## 5. Part B — Sub-services as cards on every pillar page

The flowing card already exists: `SubServiceGlowCard` (wraps `components/ui/glowing-effect`), and `PillarSubServicesGrid` already renders a **data-driven, always-visible** grid of them via `getDigitalPresenceSubServicesByPillar(pillarSlug, locale)`.

**Changes:**
- Ensure **every pillar main page** renders a `PillarSubServicesGrid`-style "Explore [Pillar] services" card section. Audit each pillar page (`/website-development`, `/ecommerce-development`, `/social-media-marketing`, `/content-creation`, `/services/ui-ux-design-branding`, `/services/search-engine-optimization`, business-systems & web-apps pillars) and add the section where missing.
- The `/website-development` page is explicitly called out (req 1.2): confirm it shows its (trimmed) sub-services as glow cards on the page body.
- Pillars with no sub-services (AEO, GEO) render no card section (or a "what we do" capability section instead — see §7).

## 6. Part C — Sub-service cut-list (⚠️ APPROVAL GATE)

Scope: Digital Presence pillars only (Business Systems & Web Apps untouched). "Moderate trim" — remove thin/long-tail/redundant/off-strategy sub-services. **Nothing is deleted until you approve this list.** Each deletion removes: the name in `digital-presence.ts`, the generated EN content (`dp-subs/` → `digital-presence-subservices.ts`), the AR content (`dp-subs-ar/` → `digital-presence-subservices-ar.ts`), and the static param.

### ① Website Development — keep 14, cut 9
**Cut:** Law Firm & Legal, Event & Ticketing, News & Magazine, Non-Profit & NGO, Membership & Subscription, Directory & Listing, Community Forum, Web Accessibility (WCAG) Optimization, Portfolio Website Development.
**Keep:** Corporate, Business, Landing Page, Real Estate, Educational & LMS, Healthcare & Medical, Restaurant & Hospitality, Multilingual & RTL, Headless CMS, Third-Party API Integration, Website Speed & Performance, Website Redesign & Modernization, Website Maintenance & Support, Web Hosting & Security Management.

### ② E-Commerce Development — keep 12, cut 4
**Cut:** BigCommerce Store Development, Magento / Adobe Commerce Development, Dropshipping Store Setup, Subscription Box E-Commerce Setup.
**Keep:** Custom, Shopify, WooCommerce, Headless, Multi-Vendor Marketplace, Redesign & Migration, Payment Gateway Integration, Shipping & Fulfillment Automation, Cart Abandonment Recovery, B2B Wholesale Portal, POS Integration, PIM Setup.

### ③ UI/UX Design & Branding — keep 10, cut 4
**Cut:** Business Card & Print Assets Design, Pitch Deck & Presentation Design, Custom Iconography & Illustration, Color Palette & Typography Design.
**Keep:** Brand Strategy & Positioning, Corporate Rebranding, Logo & Visual Identity, Brand Guidelines & Brand Book, Motion Graphics & Web Animations, UI Design, UX Design & Wireframing, UX Audits & Usability Testing, Mobile & Web App Interface Design, Social Media Kit & Assets Design.

### ④ SEO — keep 10 of 12, + absorb 4 from Local SEO (final 14)
**Cut from SEO:** YouTube Channel SEO, App Store Optimization (ASO — belongs to mobile).
**Absorb from deleted Local SEO:** Google Business Profile Optimization, Local Map Ranking Strategies, "Near Me" Search Optimization, Franchise & Multi-Location SEO. (Drop the thin local ones: GBP Setup [merged into Optimization], Local Directory Citations [→ Off-Page], Local Link Building & Digital PR [→ Off-Page].)

### ⑤ Social Media Management — keep 11, cut 6
**Cut (these are really customer-support/automation, belonging to the deleted pillars):** Conversational Marketing & Chat Automation, WhatsApp Business API Integration, WhatsApp Chatbot Automation, AI Voice Assistant Integration, Omnichannel Inbox Setup, Automated Lead Qualification Sequences.
**Keep:** Strategy & Planning, Profile Setup, Content Calendar, Copywriting, Graphic Design, Short-Form Video Editing, Community Management, Influencer Outreach, Contest & Giveaway, LinkedIn B2B Personal Branding, Analytics & Reporting.

### ⑥ Content Marketing & Authority — keep 7, cut 2
**Cut:** Podcast Show Notes & Structuring, Whitepaper & E-Book Creation.
**Keep:** SEO Blog Post & Article Writing, Website Copywriting, Landing Page Copywriting, Case Study & Portfolio Writing, Email Newsletter Copywriting, Press Release Writing & Distribution, Video Scriptwriting.

**Totals:** ~27 sub-services trimmed from survivors + ~31 from deleted pillars (Local SEO 7, Customer Support 2, CX Portals 8, Review 6, Analytics 8). Adjust any line above before implementation.

## 7. Part D — AEO & GEO pillars + SEO refresh (the "Get Found" trio)

New pillars in the `visibility-discoverability` group, **no sub-services**, each a bespoke standalone-quality page at `/services/answer-engine-optimization` and `/services/generative-engine-optimization`.

| | AEO | GEO |
|---|---|---|
| name (EN) | Answer Engine Optimization (AEO) | Generative Engine Optimization (GEO) |
| name (AR) | تحسين محركات الإجابة | تحسين المحركات التوليدية |
| desc (EN) | Get cited by AI answer engines — ChatGPT, Perplexity, Google AI Overviews — and own the direct answer to your customers' questions. | Optimize your brand to surface inside generative-AI results, so AI assistants recommend you when buyers ask. |
| href | `/services/answer-engine-optimization` | `/services/generative-engine-optimization` |
| icon | new `/icons/services/aeo.png` (placeholder until asset) | new `/icons/services/geo.png` |

**"Hugely great" design (shared language across the trio):** a distinctive `data-header-theme="dark"` hero with an animated motif — AEO = a stylized "answer card" being cited by AI logos; GEO = a "generative grid" of brand mentions surfacing. Sections: hero → "the shift" (why AI answers change discovery, with stat callouts) → "what we do" capability bento (replaces the sub-service grid these pillars don't have) → process → FAQ (schema-marked) → contact lead form. Reuse `HeroGeometric`, `FeaturesBento`, `FaqAccordion`, `SubServiceContactHero`, `GlowingEffect`. The existing **SEO** pillar page gets restyled to match the trio so "Get Found" feels like one premium family. *(I'll show a visual mockup of the AEO/GEO hero during review.)*

A new `getStructuredPillarBySlug` path renders these via a new `GetFoundPillarPage` component (or extends `PillarPage`), branched in `app/(frontend)/[locale]/services/[service]/page.tsx`.

## 8. Part E — Data-driven related projects (requirement 5)

**Today:** projects live in the Payload `Projects` collection (`collections/Projects.ts`) with a free-text `category` only; per-page relevance is hardcoded in `WEBSITE_PROJECT_IDS` / `WEBAPP_PROJECT_IDS` maps in `[service]/page.tsx`, and `DigitalPresenceSubServicePage` just shows featured/first-6 to 4 hardcoded `PORTFOLIO_PILLARS`.

**New (data-driven):**
1. Add a **`relatedServices`** field to the `Projects` collection — a multi-value list of pillar/sub-service slugs (text array; admin-friendly. Optionally seed from a checklist of known slugs). Keep the existing `category` for the `/projects` filter.
2. Add a helper `getProjectsForService(slug, locale)` in `lib/projects.ts` with a **fallback chain** so no page renders empty:
   `exact sub-service slug → parent pillar slug → group/category → featured projects (closest)`.
3. Replace the hardcoded `WEBSITE_PROJECT_IDS` / `WEBAPP_PROJECT_IDS` / `PORTFOLIO_PILLARS` logic with `getProjectsForService`. Pillar and sub-service pages call it; the "Projects we've delivered" `ProjectsShowcase` renders the result (or hides if truly none and no fallback configured).
4. Result: when you add a project in the CMS and tag its `relatedServices`, it **auto-appears** on the matching service pages — fully data-driven.

Backfill: tag the existing ~13 CMS projects with `relatedServices` so current pages keep their work.

## 9. Part F — Arabic compliance

Every change is mirrored in AR:
- Group rename, AEO/GEO pillar names/descriptions → AR copy in `digital-presence.ts`.
- Kept sub-services → ensure AR exists in `digital-presence-subservices-ar.ts` (`dp-subs-ar/`).
- Deleted sub-services/pillars → remove their AR entries too (no orphans).
- AEO/GEO page bodies → AR strings, RTL verified.
- New CMS `relatedServices` is slug-based (locale-agnostic), so it works for both locales via the existing `getProjects(locale)`.

## 10. Part G — Header / nav reconciliation

The header mega-menu (`components/Header.tsx`) still renders the **old** `serviceCategories`. Out of scope to fully migrate, but we will: (a) ensure the menu's digital-growth/marketing entries point at the surviving pillar front-doors (SEO, AEO, GEO, SMM, Content), and (b) remove any menu links to deleted pages. Full header→structured-catalog migration is noted as a follow-up, not done here.

## 11. SEO & safety
- Pre-delete: grep `proxy.ts` + `app/sitemap.xml/route.ts` to confirm no deleted slug is an inbound redirect target or sitemap entry (expected: none).
- AEO/GEO/SEO pages get canonical + hreflang (matching the existing pillar metadata pattern in `[service]/page.tsx:312`) and FAQ schema.
- `generateStaticParams` updates automatically (it derives from the data); verify no build-time references to deleted slugs remain.

## 12. Testing & verification
- `next build` / typecheck passes (no references to deleted slugs/pillars).
- Preview: `/services` shows grouped big pillar cards, no "Explore" block, no accordion.
- Each surviving pillar page renders its sub-service glow-card section; AEO/GEO render their bespoke pages (EN + AR/RTL).
- A CMS project tagged with `relatedServices` appears on the right page; an untagged page falls back gracefully (no empty section).
- Arabic spot-check on `/ar/services`, `/ar/services/answer-engine-optimization`, and two trimmed pillar pages.

## 13. Open items / risks
- **Cut-list (§6)** needs your line-item approval — biggest irreversible step.
- AEO/GEO **icons** need real assets (placeholders until then).
- `relatedServices` field shape: free text-array vs. a fixed select of known slugs. Recommend a relationship-free **text array seeded from a slug checklist** for CMS usability; confirm during implementation.
- Header full migration deferred (Part G is a partial reconcile).
