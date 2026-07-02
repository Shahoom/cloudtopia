# (needed redesign)

Pages to redesign **together, section by section** (per owner decision). This is the
running backlog — nothing here is auto-designed; we craft each page's content +
SEO + Arabic collaboratively when we get to it.

Legend for "current template": see `docs/` template catalog. The problem child is
**PillarPage (lean)** — renders a hero + CTA and nothing else for Business-Systems
and Web-App pillars (its sub-service grid only works for Digital Presence).

---

## 1. Web Applications — 5 pillar pages (currently EMPTY / lean PillarPage)

Target design: a **rich, full template** applied to each, then content-crafted per page (SEO + Arabic).
> ⚠️ DECISION when we start: which base template —
> (a) the `/web-applications` hub template (parallax hero → HorizontalScrollCards → HeroModern), or
> (b) the `/services/custom-web-application-development` template (app-window WebAppHero → features → process).
> Owner named both; pick one at design time.

| Page | URL | Current | Target |
|---|---|---|---|
| Custom SaaS & MVP Development | /services/custom-saas-mvp-development | lean PillarPage (empty) | rich, crafted |
| Full-Stack Web Engineering | /services/full-stack-web-engineering | lean PillarPage (empty) | rich, crafted |
| Interactive Portals & Dashboards | /services/interactive-portals-dashboards | lean PillarPage (empty) | rich, crafted |
| App Modernization, Security & Maintenance | /services/application-modernization-performance | lean PillarPage (empty) | rich, crafted |
| Media, Entertainment & Streaming | /services/media-entertainment-streaming | lean PillarPage (empty) | rich, crafted |

Note: `/web-applications` has **no card in the /services hub** — decide if it needs one.

---

## 2. Mobile App Development — 13 pages (currently generic HeroOrbitDeck template)

Each is its own main page (no sub-services). Redesign each section by section.

/services/ios-app-development · /services/android-app-development · /services/cross-platform-app-development ·
/services/flutter-app-development · /services/react-native-app-development · /services/mvp-app-development ·
/services/business-mobile-app-development · /services/customer-app-development · /services/booking-app-development ·
/services/delivery-order-app-development · /services/app-backend-api-development · /services/app-store-launch-support ·
/services/mobile-app-maintenance

---

## 3. Business Systems — pillar pages

**Target template for all: `RichPillarPage`** (the same design as `/services/custom-erp-crm-solutions` — the parallax product hero → scroll cards → HeroModern overview). Each gets **totally different, rich, high-SEO content + perfect Arabic**. Content maps the pillar's sub-services **high → low by Arabic-world search demand** (my proposed order below — adjust at design time).

**Card order on Business Systems (main = first because it's otherwise not visible):**
1. `/business-systems-development` (the standalone hub — same rich design + details, **+ a contact form at the end → CMS leads**)
2. `/services/business-management-systems`
3. `/services/business-process-automation`
4. `/services/custom-erp-crm-solutions`

| Page | URL | Current | Sub-services, ranked by AR search demand (high→low) |
|---|---|---|---|
| Business Management Systems | /services/business-management-systems | lean PillarPage (empty) | أنظمة إدارة المخزون · أنظمة الموارد البشرية · أنظمة إدارة المبيعات · أنظمة إدارة الطلبات (inventory → HR → sales → order) |
| Business Process Automation | /services/business-process-automation | lean PillarPage (empty) | أتمتة سير العمل · أتمتة الفواتير والتذكير بالدفع · ربط واتساب بالـCRM · تكامل أنظمة المحاسبة · تطوير وتكامل API · أتمتة العروض والتسعير · أتمتة متابعة المبيعات · التوقيع الإلكتروني والعقود · أتمتة التعيين والإلحاق · موافقات أوامر الشراء |
| Custom ERP & CRM Solutions | /services/custom-erp-crm-solutions | ✅ RichPillarPage (content polish only) | Odoo ERP · تطوير CRM مخصص · هيكلة خط مبيعات CRM · إدارة وتوزيع العملاء المحتملين · دعم العملاء والتذاكر · ترحيل الأنظمة القديمة · إدارة الفروع المتعددة · مزامنة المتجر مع ERP · صلاحيات RBAC |
| /business-systems-development (hub) | /business-systems-development | rich hub (BusinessSystemsClient) | add contact form → CMS at the end |

---

## Done NOW (mechanical — no design needed) — ✅ ALL COMPLETE
- ✅ Delete `/services/internal-enterprise-applications` (pillar + its sub-services) entirely. — commit `4a3fe1b`
- ✅ Sub-service URLs nested under their parent service: `/services/website-copywriting` → `/services/content-creation/website-copywriting` (all sub-services). Old flat URLs `308 → nested`. — commit `4c82a32`
- ✅ Social Media Management → **Social Media Marketing** (name matches its `/social-media-marketing` link). — commit `4a3fe1b`
