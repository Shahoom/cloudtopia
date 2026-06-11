# AEO Content Upgrade — Commercial Pages (Batch 1)

**Date:** 2026-06-11
**Goal:** Make CloudTopia's top commercial pages *quotable* by AI answer engines (ChatGPT, Perplexity, Google AI Overviews, Gemini) by adding cited statistics, direct-answer blocks, comparison tables, and a credentialed expert — the content signals those engines extract and cite. Foundation (robots, schema, llms.txt) is already done; this is the content layer.

## Non-goals
- No redesign. Add content into existing layouts; match current styling.
- No invented numbers. Every stat traces to a real, fetched source (verified below) or is one of CloudTopia's own published project results.
- Homepage gets a **conservative** treatment only (protect the LCP work + design).
- Articles / off-site presence / Bing-Brave submission are later batches.

## The 4-element pattern (per page)
1. **Cited stat(s)** — 2–3 real figures woven into copy, each with a visible source name + outbound link.
2. **Direct-answer block(s)** — a question-style `<h2>`/`<h3>` + a 40–60 word answer AI can lift; also fed into the page's FAQPage schema.
3. **One comparison table** — semantic `<table>` (AI parses tables well).
4. **Expert trust signal** — visible "Reviewed by Mohamad Shahm, Founder & Lead Engineer" + `Person` schema linked as the Organization's `founder`.

## Verified stats bank (only HIGH-confidence unless labeled)
| Figure | Source | URL | Conf |
|---|---|---|---|
| Saudi e-commerce via Mada SAR 197.4B (~$52.6B) in 2024, +25.8% YoY | SAMA (Saudi Central Bank) via Arab News | arabnews.com/node/2589350 | High |
| 79% of Saudi retail transactions non-cash in 2024 (up from 70%) | SAMA via Arab News | arabnews.com/node/2597120 | High |
| E-commerce to reach 46% of Saudi retail by 2030 (29% of payments in 2024) | Visa RGM, Arab News | arabnews.com/node/2588984 | High |
| GCC e-commerce ~$50B by 2025 | Deloitte | deloitte.com/middle-east (…thriving-e-commerce…) | High |
| Saudi internet penetration 99.0% (33.9M users, 2025) | DataReportal | datareportal.com/reports/digital-2025-saudi-arabia | High |
| Mobile connections 140% (SA) / 202% (UAE) of population | DataReportal | datareportal.com (SA 2025 / UAE 2026) | High |
| Arabic = <3% of online content vs 5% of world population | UN ESCWA | unescwa.org (Digital Arabic Content Award) | High |
| Saudi digital economy = 16.0% of GDP (2024) | GASTAT (official) | stats.gov.sa/en/w/news/150 | High |
| 46.8% of Saudi establishments use cloud; 27.6% use AI (2024) | GASTAT (official) | stats.gov.sa (ICT Access & Usage 2024) | High |
| Saudi cloud market $4.77B (2025) → $11.47B (2031), 15.7% CAGR | Mordor Intelligence | mordorintelligence.com (saudi-arabia-cloud-services) | High |
| UAE cloud market $12.84B → $56.26B (2031), 27.9% CAGR | Mordor Intelligence | mordorintelligence.com (uae-cloud-computing) | High |
| Saudi CRM software $2.0B (2024) → $3.86B (2030), 11.4% CAGR | TechSci Research | techsciresearch.com (…crm-software-market) | High |
| GCC ICT market $139.3B (2025) → $242.1B (2031) | Mordor Intelligence | mordorintelligence.com (gcc-ict-market) | High |
| CRM returns $8.71 per $1 spent (label: 2014 global benchmark) | Nucleus Research | nucleusresearch.com (crm-pays-back-8-71) | Med |

Each stat will be re-verified by fetching its source at build time before it ships.

## CloudTopia's real results (already published on site → safe to feature)
KVAII +180% inquiries · RAM +95% bookings · ARTUCKY 2,420+ customers · Comics Topia 25K readers · Luxury World 850 bookings · Dhofar +150% reach.

## Per-page plan
| Page | Stats | Project proof | Answer blocks | Comparison table |
|---|---|---|---|---|
| **/ecommerce-solutions** | Mada $52.6B/+25.8%; 46% of retail by 2030 | ARTUCKY 2,420+ | "How big is e-commerce in Saudi Arabia?"; "Do I need Mada/Apple Pay?" | Template store vs custom CloudTopia store |
| **/website-design** | Internet 99%; Arabic <3% of content; mobile 140%/202% | KVAII +180%, RAM +95% | "Why a website if I have Instagram?"; "Should my site be Arabic-first?" | Wix/template vs custom CloudTopia site |
| **/business-systems-development** | Cloud $4.77B→$11.47B; 46.8% cloud / 27.6% AI adoption; CRM $2.0B→$3.86B; CRM ROI $8.71/$1* | none published — rely on market stats (add a client result later if you have one) | "CRM vs ERP?"; "Custom build vs off-the-shelf?" | Off-the-shelf SaaS vs custom CloudTopia system |
| **/web-applications** | GCC ICT $139B→$242B; mobile-first | Comics Topia 25K, Luxury World 850 | "Web app vs website?"; "How long to build?" | No-code/template vs custom web app |
| **/services** | Digital economy 16% of GDP; internet 99% | — | "Which service do I need?" | (light: service-category guide) |
| **/** (homepage) | One woven market stat only | — | — | — (Person/founder schema + expert line only) |

## Expert / E-E-A-T
- Visible line on each page: *"Reviewed by **Mohamad Shahm**, Founder & Lead Engineer at CloudTopia."*
- Draft bio (USER TO CONFIRM / add years): *"Mohamad Shahm is the founder and lead engineer of CloudTopia, building software, cloud, and AI systems for businesses across Saudi Arabia, the UAE, and the GCC."*
- `Person` schema node (`@id` `https://cloudtopia.net/#person-mohamad-shahm`): name, jobTitle, worksFor → `#organization`, knowsAbout [software development, cloud, AI, e-commerce, CRM/ERP], sameAs [github.com/Shahoom, x.com/thecloudtopia]. Add `founder` → this Person on the Organization node.

## Technical approach
- **`lib/seo/market-stats.ts`** (new): each stat as `{ value, label, sourceName, sourceUrl, year, locale copy }` — single source of truth, easy to refresh, locale-aware (EN/AR).
- **`lib/seo/expert.ts`** (new): the Mohamad Shahm Person object + a small `<ExpertReviewLine>` component, reused across pages.
- **Stat/answer/table content**: added into each page's client component as new sections, styled to match; bilingual (EN + AR copy).
- **Schema**: extend each page's `generateMetadata`/JSON-LD — feed answer blocks into `buildFaqSchema`, add the `Person` node + `founder` link (reusing the canonical `#organization`).
- **Homepage**: only the Person/founder schema + expert line + one woven stat; no new heavy sections (protect LCP).

## Verification
- Re-fetch every stat's source URL before shipping; drop any that no longer verifies.
- tsc clean; dev render of each page; confirm FAQPage + Person schema validate; confirm no layout/LCP regression (re-check homepage LCP).
- Ship per the usual flow: commit → deploy → live verify.

## Rollout
Batch 1 = the 6 pages above. After approval + live check, Batch 2 = remaining service pages + cornerstone articles (with full Person author bylines).
