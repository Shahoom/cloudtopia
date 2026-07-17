import type { DPGroup } from './digital-presence'

/**
 * CloudTopia — Web Applications, restructured.
 * Core engineering capabilities (4 focused pillars) + a standalone Media &
 * Streaming page. The old per-industry vertical pillars were removed — the
 * Industries section covers verticals — keeping only Media & Streaming.
 * Category id: 'interactive-web-applications'. Sub-services are listed on each
 * pillar page (no individual sub-pages).
 */

const t = (en: string, ar: string) => ({ en, ar })

/**
 * Dedicated meta descriptions for the web-app pillar pages at
 * /services/web-applications/<pillar> (140–165 chars, EN + AR). Each pillar's
 * `description` below is a short UI card blurb (~50–95 chars) and previously
 * doubled as the meta description — too thin for SERPs. Consumed via
 * `structuredPillarSeoDescription()` in `@/lib/seo/services`.
 */
export const webAppPillarSeoDescriptions: Record<string, { en: string; ar: string }> = {
    'custom-saas-mvp-development': {
        en: 'SaaS and MVP development for startups in the Gulf — multi-tenant architecture, Stripe billing, and a launch-ready product your team fully owns. Free consultation.',
        ar: 'تطوير منصات SaaS ومنتجات MVP للشركات الناشئة في الخليج — بنية متعددة المستأجرين وفوترة Stripe ومنتج جاهز للإطلاق يملكه فريقك بالكامل. استشارة مجانية.',
    },
    'full-stack-web-engineering': {
        en: 'Full-stack web engineering with Next.js, React, Node.js, and Laravel — APIs, integrations, and scalable architecture delivered by one accountable Gulf team.',
        ar: 'هندسة ويب متكاملة بـ Next.js وReact وNode.js وLaravel — واجهات API وتكاملات وبنية قابلة للتوسع من فريق خليجي واحد مسؤول أمامك. استشارة مجانية.',
    },
    'interactive-portals-dashboards': {
        en: 'Client portals, admin dashboards, and data visualization with role-based access — secure, bilingual interfaces your Gulf team and customers actually use.',
        ar: 'بوابات عملاء ولوحات إدارة وتصوير بيانات بصلاحيات حسب الأدوار — واجهات آمنة ثنائية اللغة يستخدمها فريقك وعملاؤك فعلاً في الخليج. استشارة مجانية.',
    },
    'application-modernization-performance': {
        en: 'Web app modernization, security, and maintenance — refactoring, Core Web Vitals optimization, testing, and 24/7 monitoring that keep your platform reliable.',
        ar: 'تحديث تطبيقات الويب وأمانها وصيانتها — إعادة هيكلة وتحسين Core Web Vitals واختبارات آلية ومراقبة على مدار الساعة لتبقى منصتك موثوقة. استشارة مجانية.',
    },
    'media-entertainment-streaming': {
        en: 'VoD, OTT, and live streaming platforms for the Gulf — subscriptions, paywalls, transcoding, CDN delivery, and DRM protection built into one owned platform.',
        ar: 'منصات بث VoD وOTT وبث مباشر للخليج — اشتراكات وجدران دفع وتحويل ترميز وتوصيل CDN وحماية DRM في منصة واحدة تملكها شركتك بالكامل. استشارة مجانية.',
    },
}

export const webApplicationsGroups: DPGroup[] = [
    {
        slug: 'core-web-app-development',
        tagline: t('Build & engineer', 'البناء والهندسة'),
        name: t('Core Web App Development', 'تطوير تطبيقات الويب الأساسية'),
        pillars: [
            {
                slug: 'custom-saas-mvp-development',
                name: t('Custom SaaS & MVP Development', 'تطوير SaaS وMVP مخصص'),
                description: t('Launch-ready SaaS products and startup MVPs, multi-tenant and billing-ready.', 'منتجات SaaS وMVP جاهزة للإطلاق، متعددة المستأجرين وجاهزة للفوترة.'),
                icon: '/icons/services/Admin Dashboard.png',
                href: '/services/web-applications/custom-saas-mvp-development',
                subServices: [
                    'Minimum Viable Product (MVP) Development for Startups',
                    'Software-as-a-Service (SaaS) Platform Architecture',
                    'Multi-Tenant Application Architecture',
                    'Subscription-Based Product Development (Stripe Billing)',
                ],
            },
            {
                slug: 'full-stack-web-engineering',
                name: t('Full-Stack Web Engineering', 'هندسة ويب متكاملة'),
                description: t('Front-end and back-end engineering, APIs, and integrations with clean, scalable architecture.', 'هندسة الواجهة الأمامية والخلفية وواجهات API والتكاملات ببنية نظيفة قابلة للتوسّع.'),
                icon: '/icons/services/webapps.png',
                href: '/services/web-applications/full-stack-web-engineering',
                subServices: [
                    'Next.js & React Front-End Engineering',
                    'Node.js, Python & PHP/Laravel Back-End Engineering',
                    'Single & Multi-Page Application Development',
                    'Progressive Web App (PWA) Development',
                    'Database Architecture & Data Modeling',
                    'Custom API, Third-Party Integrations & Payment/SSO Setup',
                ],
            },
            {
                slug: 'interactive-portals-dashboards',
                name: t('Interactive Portals & Dashboards', 'بوابات ولوحات تفاعلية'),
                description: t('Client portals, admin panels, and data dashboards with role-based access.', 'بوابات عملاء ولوحات إدارة وتحليلات بصلاحيات حسب الأدوار.'),
                icon: '/icons/services/Customer Portal.png',
                href: '/services/web-applications/interactive-portals-dashboards',
                subServices: [
                    'Custom Client & Customer Portals',
                    'Admin Dashboards & Control Panels',
                    'Data Visualization & Interactive Charting',
                    'Role-Based Access Control & Permissions',
                    'File Upload & Document Management Modules',
                ],
            },
            {
                slug: 'application-modernization-performance',
                name: t('App Modernization, Security & Maintenance', 'تحديث التطبيقات والأمان والصيانة'),
                description: t('Refactor, secure, test, deploy, and monitor your web apps for the long run.', 'إعادة هيكلة وتأمين واختبار ونشر ومراقبة تطبيقاتك على المدى الطويل.'),
                icon: '/icons/services/Analytics Dashboard.png',
                href: '/services/web-applications/application-modernization-performance',
                subServices: [
                    'Legacy Application Refactoring & Rewrites',
                    'Monolith to Microservices Migration',
                    'Web App Speed & Core Web Vitals Optimization',
                    'End-to-End Automated Testing & QA',
                    'Security Auditing & Vulnerability Patching',
                    'Deployment Pipelines & 24/7 Monitoring',
                ],
            },
        ],
    },
    {
        slug: 'specialized-platforms',
        tagline: t('Specialized', 'متخصص'),
        name: t('Media & Streaming', 'الإعلام والبث'),
        pillars: [
            {
                slug: 'media-entertainment-streaming',
                name: t('Media, Entertainment & Streaming', 'الإعلام والترفيه والبث'),
                description: t('VoD/OTT platforms, live streaming, and creator-monetization web apps.', 'منصات بث ومحتوى عند الطلب وبث مباشر وتطبيقات تحقيق دخل للصنّاع.'),
                icon: '/icons/services/Real-time Chat System.png',
                href: '/services/web-applications/media-entertainment-streaming',
                subServices: [
                    'VoD & OTT Streaming Platforms',
                    'Live Streaming & Events',
                    'Subscriptions, Memberships & Paywalls',
                    'Media Asset Management & Transcoding',
                    'CDN Delivery & DRM Content Protection',
                ],
            },
        ],
    },
]

/**
 * Bilingual (EN/AR) sub-services shown as cards ON each web-app pillar page.
 * This is a PARALLEL source to each pillar's English-only `DPPillar.subServices`
 * (the shared type stays `string[]`) — here every entry carries a natural Gulf
 * MSA translation plus a one-line bilingual `desc`. `media-entertainment-streaming`
 * has an empty `subServices` array upstream, so its entries are authored here
 * directly so the pillar still shows a populated "what we build" section.
 * Resolve with getWebApplicationsSubServicesByPillar(slug, locale).
 */
export const webAppPillarSubServices: Record<string, { en: string; ar: string; desc?: { en: string; ar: string } }[]> = {
    'custom-saas-mvp-development': [
        {
            en: 'Minimum Viable Product (MVP) Development for Startups',
            ar: 'تطوير المنتج الأولي (MVP) للشركات الناشئة',
            desc: {
                en: 'Ship the one core loop that proves value and put it in front of real users fast.',
                ar: 'نطلق الحلقة الأساسية التي تثبت القيمة ونضعها أمام مستخدمين حقيقيين بسرعة.',
            },
        },
        {
            en: 'Software-as-a-Service (SaaS) Platform Architecture',
            ar: 'بنية منصات البرمجيات كخدمة (SaaS)',
            desc: {
                en: 'A clean, service-oriented codebase your v2 and funding round build on, not a rewrite.',
                ar: 'كود نظيف موجّه للخدمات يُبنى عليه إصدارك الثاني وجولة تمويلك، لا إعادة كتابة.',
            },
        },
        {
            en: 'Multi-Tenant Application Architecture',
            ar: 'بنية تطبيقات متعددة المستأجرين',
            desc: {
                en: 'Isolated data and settings per customer or workspace — one platform, many secure accounts.',
                ar: 'بيانات وإعدادات معزولة لكل عميل أو مساحة عمل — منصة واحدة تخدم حسابات كثيرة بأمان.',
            },
        },
        {
            en: 'Subscription-Based Product Development (Stripe Billing)',
            ar: 'تطوير منتجات بنظام الاشتراك (فوترة Stripe)',
            desc: {
                en: 'Plans, free trials, upgrades, and invoices wired in so you charge recurring revenue from launch.',
                ar: 'خطط وتجارب مجانية وترقيات وفواتير مدمجة لتتقاضى إيراداً متكرراً من الإطلاق.',
            },
        },
    ],
    'full-stack-web-engineering': [
        {
            en: 'Next.js & React Front-End Engineering',
            ar: 'هندسة الواجهة الأمامية بـ Next.js وReact',
            desc: {
                en: 'Fast, accessible, bilingual interfaces — server-rendered for SEO and speed.',
                ar: 'واجهات سريعة وسهلة الوصول وثنائية اللغة، مُصيَّرة على الخادم للسيو والسرعة.',
            },
        },
        {
            en: 'Node.js, Python & PHP/Laravel Back-End Engineering',
            ar: 'هندسة الخلفية بـ Node.js وPython وPHP/Laravel',
            desc: {
                en: 'Robust back-ends in the right runtime for the job, with clean, testable business logic.',
                ar: 'خلفيات متينة بالبيئة الأنسب للمهمة، بمنطق أعمال نظيف قابل للاختبار.',
            },
        },
        {
            en: 'Single & Multi-Page Application Development',
            ar: 'تطوير تطبيقات الصفحة الواحدة والمتعددة',
            desc: {
                en: 'SPAs for rich interactivity or MPAs for SEO reach — matched to your goals.',
                ar: 'تطبيقات صفحة واحدة للتفاعل الغني أو متعددة الصفحات لوصول السيو — مطابقة لأهدافك.',
            },
        },
        {
            en: 'Progressive Web App (PWA) Development',
            ar: 'تطوير تطبيقات الويب التقدمية (PWA)',
            desc: {
                en: 'Installable apps that load instantly, work offline, and send push notifications.',
                ar: 'تطبيقات قابلة للتثبيت تحمّل فوراً وتعمل دون إنترنت وترسل إشعارات دفع.',
            },
        },
        {
            en: 'Database Architecture & Data Modeling',
            ar: 'بنية قاعدة البيانات ونمذجة البيانات',
            desc: {
                en: 'Proper schema design and indexing so the app stays fast and consistent as data grows.',
                ar: 'تصميم مخطط وفهرسة سليمين ليبقى التطبيق سريعاً ومتّسقاً مع نمو البيانات.',
            },
        },
        {
            en: 'Custom API, Third-Party Integrations & Payment/SSO Setup',
            ar: 'واجهات API مخصصة وتكاملات طرف ثالث وإعداد الدفع/SSO',
            desc: {
                en: 'REST and GraphQL APIs, payment gateways, and single sign-on connected securely in one place.',
                ar: 'واجهات REST وGraphQL وبوابات دفع وتسجيل دخول موحّد موصولة بأمان في مكان واحد.',
            },
        },
    ],
    'interactive-portals-dashboards': [
        {
            en: 'Custom Client & Customer Portals',
            ar: 'بوابات مخصصة للعملاء والزبائن',
            desc: {
                en: 'Secure, branded spaces where clients track projects, view invoices, and self-serve.',
                ar: 'مساحات آمنة بهويتك يتابع فيها العملاء المشاريع ويرون الفواتير ويخدمون أنفسهم.',
            },
        },
        {
            en: 'Admin Dashboards & Control Panels',
            ar: 'لوحات إدارة ولوحات تحكم',
            desc: {
                en: 'A command center to manage users, content, orders, and operations on one screen you own.',
                ar: 'مركز قيادة لإدارة المستخدمين والمحتوى والطلبات والعمليات على شاشة واحدة تملكها.',
            },
        },
        {
            en: 'Data Visualization & Interactive Charting',
            ar: 'تصوير البيانات والرسوم التفاعلية',
            desc: {
                en: 'Live KPIs, trend lines, and interactive charts with filters and drill-down.',
                ar: 'مؤشرات حية وخطوط اتجاه ورسوم تفاعلية بمرشّحات وتعمّق في التفاصيل.',
            },
        },
        {
            en: 'Role-Based Access Control & Permissions',
            ar: 'صلاحيات وتحكم بالوصول حسب الأدوار',
            desc: {
                en: 'Granular RBAC gives each team and client their own view — nobody sees data they shouldn’t.',
                ar: 'تحكّم دقيق (RBAC) يمنح كل فريق وعميل عرضه الخاص — فلا يرى أحد بيانات لا تخصّه.',
            },
        },
        {
            en: 'File Upload & Document Management Modules',
            ar: 'وحدات رفع الملفات وإدارة المستندات',
            desc: {
                en: 'Upload, version, and share files in a searchable, permissioned document library.',
                ar: 'ارفع وأصدر إصدارات وشارك الملفات في مكتبة مستندات قابلة للبحث ومحكومة الصلاحيات.',
            },
        },
    ],
    'application-modernization-performance': [
        {
            en: 'Legacy Application Refactoring & Rewrites',
            ar: 'إعادة هيكلة وإعادة كتابة التطبيقات القديمة',
            desc: {
                en: 'Untangle brittle code so your app is safe and cheap to evolve again.',
                ar: 'نفكّ الكود الهشّ ليعود تطبيقك آمناً ورخيص التطوير من جديد.',
            },
        },
        {
            en: 'Monolith to Microservices Migration',
            ar: 'الترحيل من نظام متجانس إلى microservices',
            desc: {
                en: 'Break a tangled monolith into well-bounded services so it scales by part, not all at once.',
                ar: 'نقسّم النظام المتجانس المتشابك إلى خدمات محدودة النطاق ليتوسّع بالجزء لا دفعة واحدة.',
            },
        },
        {
            en: 'Web App Speed & Core Web Vitals Optimization',
            ar: 'تحسين سرعة تطبيق الويب وCore Web Vitals',
            desc: {
                en: 'Fix the real bottlenecks — queries, bundles, caching, images — to pass Core Web Vitals.',
                ar: 'نُصلح الاختناقات الحقيقية — الاستعلامات والحزم والتخزين المؤقت والصور — لاجتياز Core Web Vitals.',
            },
        },
        {
            en: 'End-to-End Automated Testing & QA',
            ar: 'اختبار آلي شامل وضمان جودة',
            desc: {
                en: 'Automated tests close the gaps that cause outages, regressions, and broken releases.',
                ar: 'اختبارات آلية تُغلق الفجوات التي تسبّب الأعطال والانحدارات والإصدارات المكسورة.',
            },
        },
        {
            en: 'Security Auditing & Vulnerability Patching',
            ar: 'تدقيق أمني وترقيع الثغرات',
            desc: {
                en: 'Audit, patch known vulnerabilities, and update risky dependencies so the gaps stay closed.',
                ar: 'نُدقّق ونرقّع الثغرات المعروفة ونحدّث الاعتماديات الخطرة لتبقى الفجوات مغلقة.',
            },
        },
        {
            en: 'Deployment Pipelines & 24/7 Monitoring',
            ar: 'خطوط النشر والمراقبة 24/7',
            desc: {
                en: 'CI/CD releases and round-the-clock monitoring catch problems before your users do.',
                ar: 'إصدارات CI/CD ومراقبة على مدار الساعة تلتقط المشكلات قبل مستخدميك.',
            },
        },
    ],
    'media-entertainment-streaming': [
        {
            en: 'VoD & OTT Streaming Platforms',
            ar: 'منصات بث VoD وOTT',
            desc: {
                en: 'On-demand libraries with categories, search, watchlists, and adaptive HLS/DASH playback.',
                ar: 'مكتبات عند الطلب بتصنيفات وبحث وقوائم مشاهدة وتشغيل تكيّفي HLS/DASH.',
            },
        },
        {
            en: 'Live Streaming & Events',
            ar: 'البث المباشر والفعاليات',
            desc: {
                en: 'Low-latency live shows and webinars that scale from hundreds to tens of thousands of viewers.',
                ar: 'برامج وندوات مباشرة بزمن استجابة منخفض تتوسّع من مئات إلى عشرات الآلاف من المشاهدين.',
            },
        },
        {
            en: 'Subscriptions, Memberships & Paywalls',
            ar: 'الاشتراكات والعضويات وجدران الدفع',
            desc: {
                en: 'Recurring plans, tiers, and pay-per-view via Stripe so your audience funds the content.',
                ar: 'خطط متكرّرة وعضويات ودفع لكل مشاهدة عبر Stripe ليموّل جمهورك المحتوى.',
            },
        },
        {
            en: 'Media Asset Management & Transcoding',
            ar: 'إدارة الأصول الإعلامية وتحويل الترميز',
            desc: {
                en: 'Upload, transcode, tag, and organize a growing catalog with metadata and thumbnails.',
                ar: 'ارفع وحوّل الترميز وصنّف ونظّم كتالوجاً متنامياً ببيانات وصفية وصور مصغّرة.',
            },
        },
        {
            en: 'CDN Delivery & DRM Content Protection',
            ar: 'توصيل CDN وحماية المحتوى بـ DRM',
            desc: {
                en: 'Global CDN for fast start times, plus DRM and signed URLs to protect premium content.',
                ar: 'CDN عالمي لأزمنة بدء سريعة، مع DRM وروابط موقّعة لحماية المحتوى المميّز.',
            },
        },
    ],
}

/**
 * Per-card lucide icon (name → resolved in SubServiceGlowCard's CARD_ICONS).
 * Keyed by the STABLE English card name so it works across locales. Each
 * sub-service gets its OWN meaning-specific glyph instead of the pillar's single
 * shared PNG (which made every card on a page look identical).
 */
const SUBSERVICE_ICON: Record<string, string> = {
    // Custom SaaS & MVP
    'Minimum Viable Product (MVP) Development for Startups': 'Rocket',
    'Software-as-a-Service (SaaS) Platform Architecture': 'Layers',
    'Multi-Tenant Application Architecture': 'Building2',
    'Subscription-Based Product Development (Stripe Billing)': 'CreditCard',
    // Full-Stack Web Engineering
    'Next.js & React Front-End Engineering': 'Code2',
    'Node.js, Python & PHP/Laravel Back-End Engineering': 'Server',
    'Single & Multi-Page Application Development': 'AppWindow',
    'Progressive Web App (PWA) Development': 'Smartphone',
    'Database Architecture & Data Modeling': 'Database',
    'Custom API, Third-Party Integrations & Payment/SSO Setup': 'Webhook',
    // Interactive Portals & Dashboards
    'Custom Client & Customer Portals': 'Users',
    'Admin Dashboards & Control Panels': 'LayoutDashboard',
    'Data Visualization & Interactive Charting': 'BarChart3',
    'Role-Based Access Control & Permissions': 'ShieldCheck',
    'File Upload & Document Management Modules': 'FolderCog',
    // App Modernization, Security & Maintenance
    'Legacy Application Refactoring & Rewrites': 'Recycle',
    'Monolith to Microservices Migration': 'Boxes',
    'Web App Speed & Core Web Vitals Optimization': 'Gauge',
    'End-to-End Automated Testing & QA': 'FlaskConical',
    'Security Auditing & Vulnerability Patching': 'ShieldAlert',
    'Deployment Pipelines & 24/7 Monitoring': 'Activity',
    // Media, Entertainment & Streaming
    'VoD & OTT Streaming Platforms': 'PlayCircle',
    'Live Streaming & Events': 'Radio',
    'Subscriptions, Memberships & Paywalls': 'Ticket',
    'Media Asset Management & Transcoding': 'Film',
    'CDN Delivery & DRM Content Protection': 'Globe',
}

/**
 * Resolve a pillar's bilingual sub-service cards for the given locale.
 * Returns `{ name, desc?, iconName? }` triples; empty array for an unknown slug.
 */
export function getWebApplicationsSubServicesByPillar(
    slug: string,
    locale = 'en',
): { name: string; desc?: string; iconName?: string }[] {
    const entries = webAppPillarSubServices[slug]
    if (!entries) return []
    const loc: 'en' | 'ar' = locale === 'ar' ? 'ar' : 'en'
    return entries.map((e) => ({
        name: e[loc],
        ...(e.desc ? { desc: e.desc[loc] } : {}),
        ...(SUBSERVICE_ICON[e.en] ? { iconName: SUBSERVICE_ICON[e.en] } : {}),
    }))
}
