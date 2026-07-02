import type { WebAppHeroContent } from '@/components/ui/webapp-hero'
import type { WebAppFeaturesContent } from '@/components/ui/webapp-features'
import type { WebAppProcessContent } from '@/components/ui/webapp-process'

export type WebAppLocale = 'en' | 'ar'

export type WebAppServiceContent = {
    hero: Record<WebAppLocale, WebAppHeroContent>
    features: Record<WebAppLocale, WebAppFeaturesContent>
    process: Record<WebAppLocale, WebAppProcessContent>
}

export const webappServiceContent: Record<string, WebAppServiceContent> = {

    // ─────────────────────────────────────────────────────────────
    // 1. Custom Web Application Development
    // ─────────────────────────────────────────────────────────────
    'custom-web-application-development': {
        hero: {
            en: {
                badge: 'Custom Web Apps',
                titleLine1: 'Built Around',
                titleLine2: 'Your Exact Workflow',
                subtitle:
                    'Bespoke web applications designed for how your business actually operates — scalable, fully owned, and built to last.',
                primaryCta: { label: 'Start Your Project', href: '#contact' },
                secondaryCta: { label: 'See Our Work', href: '/projects' },
                card: {
                    windowTitle: 'app.yourcompany.io',
                    metrics: [
                        { label: 'Code Ownership', value: '100%' },
                        { label: 'Uptime SLA', value: '99.9%' },
                        { label: 'Build Timeline', value: '6–10 wks' },
                        { label: 'Support', value: '24 / 7' },
                    ],
                    chartBars: [40, 52, 44, 68, 58, 82, 90],
                },
                techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
            },
            ar: {
                badge: 'تطبيقات ويب مخصصة',
                titleLine1: 'مبنية حول',
                titleLine2: 'سير عملك الفعلي',
                subtitle:
                    'تطبيقات ويب مصممة لكيفية عمل شركتك فعلياً — قابلة للتوسع، تملكها بالكامل، ومبنية لتدوم.',
                primaryCta: { label: 'ابدأ مشروعك', href: '#contact' },
                secondaryCta: { label: 'أعمالنا', href: '/projects' },
                card: {
                    windowTitle: 'app.yourcompany.io',
                    metrics: [
                        { label: 'ملكية الكود', value: '100%' },
                        { label: 'وقت التشغيل', value: '99.9%' },
                        { label: 'وقت البناء', value: '6–10 أسابيع' },
                        { label: 'الدعم', value: '24 / 7' },
                    ],
                    chartBars: [40, 52, 44, 68, 58, 82, 90],
                },
                techStack: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS'],
            },
        },
        features: {
            en: {
                eyebrow: 'What you get',
                heading: 'Software measured for how you actually work',
                subheading: 'No forcing your business into someone else’s template — every screen, rule, and integration is built around your real process.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'Architecture', title: 'Built on your logic', description: 'We model your real workflows first, then build the screens — so the app mirrors how your team already thinks and operates.', statLabel: 'Custom modules', statValue: 'Unlimited' },
                    { id: '02', variant: 'relay', meta: 'Integrations', title: 'Connected to your stack', description: 'Plugs into your CRM, payment gateway, ERP, or any third-party API so data flows in one place instead of five disconnected tools.', statLabel: 'Integrations', statValue: 'Any system' },
                    { id: '03', variant: 'wave', meta: 'Performance', title: 'Fast under real load', description: 'Optimized queries, caching, and a modern framework keep the app snappy whether it’s 10 users or 10,000.', statLabel: 'Target load', statValue: '< 1s' },
                    { id: '04', variant: 'spark', meta: 'Security', title: 'Locked down by default', description: 'Role-based access, encrypted data, audit trails, and secure auth come standard — not as an expensive afterthought.', statLabel: 'Access control', statValue: 'Role-based' },
                    { id: '05', variant: 'loop', meta: 'Ownership', title: 'Yours, completely', description: 'Source code, documentation, and accounts are handed to you at launch. No lock-in, no hostage hosting, no surprises.', statLabel: 'Code handover', statValue: '100%' },
                ],
                metrics: [
                    { label: 'Typical build', value: '6–10 wks' },
                    { label: 'Uptime SLA', value: '99.9%' },
                    { label: 'You own the code', value: '100%' },
                ],
            },
            ar: {
                eyebrow: 'ما الذي تحصل عليه',
                heading: 'برمجيات مفصّلة على طريقة عملك الفعلية',
                subheading: 'لا نجبر عملك على قالب جاهز — كل شاشة وقاعدة وتكامل مبني حول عمليتك الحقيقية.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'البنية', title: 'مبني على منطقك', description: 'نرسم سير عملك الفعلي أولاً، ثم نبني الشاشات — ليعكس التطبيق طريقة تفكير فريقك.', statLabel: 'وحدات مخصصة', statValue: 'غير محدودة' },
                    { id: '02', variant: 'relay', meta: 'التكامل', title: 'متصل بأنظمتك', description: 'يرتبط بـ CRM وبوابة الدفع وERP وأي API آخر لتتدفق البيانات في مكان واحد.', statLabel: 'التكاملات', statValue: 'أي نظام' },
                    { id: '03', variant: 'wave', meta: 'الأداء', title: 'سريع تحت الضغط', description: 'استعلامات محسّنة وتخزين مؤقت وإطار حديث تبقي التطبيق سريعاً سواء 10 أو 10،000 مستخدم.', statLabel: 'زمن التحميل', statValue: '< 1 ثانية' },
                    { id: '04', variant: 'spark', meta: 'الأمان', title: 'محمي بشكل افتراضي', description: 'صلاحيات حسب الدور وتشفير للبيانات وسجلات تدقيق تأتي قياسية وليست إضافة باهظة.', statLabel: 'الصلاحيات', statValue: 'حسب الدور' },
                    { id: '05', variant: 'loop', meta: 'الملكية', title: 'ملكك بالكامل', description: 'الكود المصدري والتوثيق والحسابات تُسلّم لك عند الإطلاق. بلا احتكار ولا مفاجآت.', statLabel: 'تسليم الكود', statValue: '100%' },
                ],
                metrics: [
                    { label: 'مدة البناء', value: '6–10 أسابيع' },
                    { label: 'وقت التشغيل', value: '99.9%' },
                    { label: 'ملكية الكود', value: '100%' },
                ],
            },
        },
        process: {
            en: {
                eyebrow: 'How we build it',
                heading: 'From idea to launched app, without the chaos',
                subheading: 'A clear, fixed-scope path where you always know exactly where things stand.',
                ctaLabel: 'Start your project',
                steps: [
                    { title: 'Discovery & blueprint', description: 'We map your workflows, users, and must-haves, then agree a fixed scope and architecture before a line of code.', duration: 'Week 1' },
                    { title: 'UX & UI design', description: 'We design every screen and flow — bilingual and mobile-first — and you approve the look before we build.', duration: 'Week 2–3' },
                    { title: 'Build & QA', description: 'We develop in reviewable sprints with live previews, testing on real devices and data as we go.', duration: 'Week 3–8' },
                    { title: 'Launch & handover', description: 'We deploy, hand over the full source code and accounts, and stay on for support.', duration: 'Week 8–10' },
                ],
            },
            ar: {
                eyebrow: 'كيف نبنيه',
                heading: 'من الفكرة إلى تطبيق مُطلق، دون فوضى',
                subheading: 'مسار واضح بنطاق ثابت تعرف فيه موقع كل خطوة بدقة.',
                ctaLabel: 'ابدأ مشروعك',
                steps: [
                    { title: 'الاكتشاف والمخطط', description: 'نرسم سير عملك ومستخدميك ومتطلباتك، ثم نتفق على نطاق وبنية ثابتين قبل أي كود.', duration: 'الأسبوع 1' },
                    { title: 'تصميم التجربة والواجهة', description: 'نصمّم كل شاشة ومسار — بلغتين وبواجهة جوال أولاً — وتعتمد المظهر قبل أن نبني.', duration: 'الأسبوع 2–3' },
                    { title: 'البناء والاختبار', description: 'نطوّر في جولات قابلة للمراجعة بمعاينات حية، ونختبر على أجهزة وبيانات حقيقية أثناء العمل.', duration: 'الأسبوع 3–8' },
                    { title: 'الإطلاق والتسليم', description: 'ننشر ونسلّمك الكود المصدري الكامل والحسابات ونبقى للدعم.', duration: 'الأسبوع 8–10' },
                ],
            },
        },
    },

    // ═════════════════════════════════════════════════════════════
    // STRUCTURED PILLARS — Interactive Web Applications catalog
    // (custom-saas-mvp-development, full-stack-web-engineering,
    //  interactive-portals-dashboards, application-modernization-performance,
    //  media-entertainment-streaming). Rendered by WebAppPillarPage.
    // ═════════════════════════════════════════════════════════════

    // ─────────────────────────────────────────────────────────────
    // PILLAR 1 — Custom SaaS & MVP Development
    // ─────────────────────────────────────────────────────────────
    'custom-saas-mvp-development': {
        hero: {
            en: {
                badge: 'SaaS & MVP Development',
                titleLine1: 'From Idea to a',
                titleLine2: 'SaaS Users Pay For',
                subtitle:
                    'Startup MVPs and multi-tenant SaaS platforms — built for validation, wired for subscription billing, and ready to scale from your first paying user to your thousandth.',
                primaryCta: { label: 'Launch My SaaS', href: '/contact' },
                secondaryCta: { label: 'See Our Work', href: '/services' },
                card: {
                    windowTitle: 'app.yoursaas.io',
                    metrics: [
                        { label: 'MVP Timeline', value: '8–12 wks' },
                        { label: 'Auth + Billing', value: 'Built-in' },
                        { label: 'Multi-Tenant', value: 'Native' },
                        { label: 'Monthly Churn', value: '< 5%' },
                    ],
                    chartBars: [16, 26, 38, 52, 63, 79, 95],
                },
                techStack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Prisma', 'AWS'],
            },
            ar: {
                badge: 'تطوير SaaS وMVP',
                titleLine1: 'من فكرة إلى',
                titleLine2: 'SaaS يدفع مقابله المستخدمون',
                subtitle:
                    'منتجات MVP للشركات الناشئة ومنصات SaaS متعددة المستأجرين — مبنية للتحقّق ومجهّزة للفوترة بالاشتراك وجاهزة للتوسّع من أول عميل يدفع إلى الألف.',
                primaryCta: { label: 'أطلق SaaS الخاص بي', href: '/contact' },
                secondaryCta: { label: 'أعمالنا', href: '/services' },
                card: {
                    windowTitle: 'app.yoursaas.io',
                    metrics: [
                        { label: 'مدة الـ MVP', value: '8–12 أسبوعاً' },
                        { label: 'المصادقة والفوترة', value: 'مضمّنة' },
                        { label: 'متعدد المستأجرين', value: 'أصلي' },
                        { label: 'التسرّب الشهري', value: '< 5%' },
                    ],
                    chartBars: [16, 26, 38, 52, 63, 79, 95],
                },
                techStack: ['Next.js', 'TypeScript', 'Stripe', 'PostgreSQL', 'Prisma', 'AWS'],
            },
        },
        features: {
            en: {
                eyebrow: 'What we build',
                heading: 'A production SaaS foundation, not a throwaway demo',
                subheading: 'From startup MVP to multi-tenant platform — the accounts, tenancy, and subscription billing every SaaS reinvents, engineered once and built to last.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'MVP', title: 'MVP built to validate', description: 'We scope your startup to the one core loop that proves value, then ship it to real users fast — momentum and learning over a bloated v1.', statLabel: 'To first users', statValue: '8–12 wks' },
                    { id: '02', variant: 'relay', meta: 'Architecture', title: 'SaaS platform architecture', description: 'A clean, service-oriented codebase with proper data modeling and API design — the foundation your v2, v3, and funding round build on instead of a rewrite.', statLabel: 'Built to scale', statValue: 'Day one' },
                    { id: '03', variant: 'wave', meta: 'Tenancy', title: 'Multi-tenant by design', description: 'Isolated data and configuration per customer, org, or workspace — one platform that serves many accounts securely, the way real SaaS is built.', statLabel: 'Tenant isolation', statValue: 'Native' },
                    { id: '04', variant: 'spark', meta: 'Billing', title: 'Subscription billing wired in', description: 'Stripe plans, free trials, upgrades, proration, and invoices connected from launch, so you charge recurring revenue on day one — not months later.', statLabel: 'Billing', statValue: 'Stripe-ready' },
                    { id: '05', variant: 'loop', meta: 'Conversion', title: 'Designed to convert & retain', description: 'Landing page, onboarding, and pricing are built for sign-ups, with analytics hooks so you can measure activation, churn, and expansion from the start.', statLabel: 'Funnel', statValue: 'End-to-end' },
                ],
                metrics: [
                    { label: 'To first paying users', value: '8–12 wks' },
                    { label: 'Auth + billing', value: 'Included' },
                    { label: 'You own the code', value: '100%' },
                ],
            },
            ar: {
                eyebrow: 'ما الذي نبنيه',
                heading: 'أساس SaaS إنتاجي، لا نموذج يُرمى',
                subheading: 'من MVP لشركة ناشئة إلى منصة متعددة المستأجرين — الحسابات والتعدّد المستأجري والفوترة بالاشتراك التي يعيد كل SaaS اختراعها، مهندَسة مرة واحدة ومبنية لتدوم.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'الـ MVP', title: 'MVP مبني للتحقّق', description: 'نحدّد نطاق مشروعك على الحلقة الأساسية الواحدة التي تثبت القيمة، ثم نطلقها لمستخدمين حقيقيين بسرعة — الزخم والتعلّم قبل إصدار أول متضخّم.', statLabel: 'لأول مستخدم', statValue: '8–12 أسبوعاً' },
                    { id: '02', variant: 'relay', meta: 'البنية', title: 'بنية منصة SaaS', description: 'كود نظيف موجّه للخدمات بنمذجة بيانات وتصميم API سليمين — الأساس الذي يُبنى عليه إصدارك الثاني والثالث وجولة تمويلك بدل إعادة كتابة.', statLabel: 'مبني للتوسّع', statValue: 'من اليوم الأول' },
                    { id: '03', variant: 'wave', meta: 'التعدّد المستأجري', title: 'متعدد المستأجرين بالتصميم', description: 'بيانات وإعدادات معزولة لكل عميل أو مؤسسة أو مساحة عمل — منصة واحدة تخدم حسابات كثيرة بأمان، كما تُبنى منتجات SaaS الحقيقية.', statLabel: 'عزل المستأجرين', statValue: 'أصلي' },
                    { id: '04', variant: 'spark', meta: 'الفوترة', title: 'فوترة اشتراكات مدمجة', description: 'خطط Stripe والتجارب المجانية والترقيات والاحتساب النسبي والفواتير موصولة من الإطلاق، لتتقاضى إيراداً متكرراً من اليوم الأول لا بعد أشهر.', statLabel: 'الفوترة', statValue: 'جاهزة' },
                    { id: '05', variant: 'loop', meta: 'التحويل', title: 'مصمّم للتحويل والاحتفاظ', description: 'صفحة الهبوط والتهيئة والتسعير مبنية للتسجيل، مع تحليلات لتقيس التفعيل والتسرّب والتوسّع منذ البداية.', statLabel: 'القمع', statValue: 'متكامل' },
                ],
                metrics: [
                    { label: 'لأول عميل يدفع', value: '8–12 أسبوعاً' },
                    { label: 'حسابات وفوترة', value: 'مضمّنة' },
                    { label: 'ملكية الكود', value: '100%' },
                ],
            },
        },
        process: {
            en: {
                eyebrow: 'How we build it',
                heading: 'From idea to first paying users, without the guesswork',
                subheading: 'A lean, validation-first path that puts a real, billable SaaS in front of real users fast.',
                ctaLabel: 'Launch my SaaS',
                steps: [
                    { title: 'Scope the core loop', description: 'We strip the idea to the one loop that proves value and agree a fixed MVP scope, tenancy model, and pricing before any code.', duration: 'Week 1' },
                    { title: 'Design for sign-ups', description: 'We design onboarding, the core flow, and the pricing page for conversion — bilingual and mobile-first — and you approve it.', duration: 'Week 1–3' },
                    { title: 'Build with auth & billing', description: 'We build the multi-tenant product with accounts and Stripe subscriptions wired in, tested on real data as we go.', duration: 'Week 3–10' },
                    { title: 'Launch & measure', description: 'We ship to real users with analytics in place, hand over the full source code and accounts, and set you up to iterate.', duration: 'Week 10–12' },
                ],
            },
            ar: {
                eyebrow: 'كيف نبنيه',
                heading: 'من الفكرة لأول عميل يدفع، دون تخمين',
                subheading: 'مسار رشيق يبدأ بالتحقّق ويضع SaaS حقيقياً قابلاً للفوترة أمام مستخدمين حقيقيين بسرعة.',
                ctaLabel: 'أطلق SaaS الخاص بي',
                steps: [
                    { title: 'تحديد الحلقة الأساسية', description: 'نجرّد الفكرة إلى الحلقة التي تثبت القيمة، ونتفق على نطاق MVP ونموذج التعدّد المستأجري والتسعير قبل أي كود.', duration: 'الأسبوع 1' },
                    { title: 'التصميم للتسجيل', description: 'نصمّم التهيئة والمسار الأساسي وصفحة التسعير للتحويل — بلغتين وجوال أولاً — وتعتمدها.', duration: 'الأسبوع 1–3' },
                    { title: 'البناء بالمصادقة والفوترة', description: 'نبني المنتج متعدد المستأجرين بحسابات واشتراكات Stripe مدمجة، ونختبره على بيانات حقيقية أثناء العمل.', duration: 'الأسبوع 3–10' },
                    { title: 'الإطلاق والقياس', description: 'نطلق لمستخدمين حقيقيين بتحليلات جاهزة، ونسلّمك الكود المصدري الكامل والحسابات ونهيّئك للتطوير.', duration: 'الأسبوع 10–12' },
                ],
            },
        },
    },

    // ─────────────────────────────────────────────────────────────
    // PILLAR 2 — Full-Stack Web Engineering
    // ─────────────────────────────────────────────────────────────
    'full-stack-web-engineering': {
        hero: {
            en: {
                badge: 'Full-Stack Web Engineering',
                titleLine1: 'Front-End, Back-End,',
                titleLine2: 'Engineered End to End',
                subtitle:
                    'Next.js and React front-ends on Node, Python, or PHP/Laravel back-ends — SPAs, PWAs, solid database architecture, and the custom APIs, integrations, and SSO that tie it all together.',
                primaryCta: { label: 'Start Your Build', href: '/contact' },
                secondaryCta: { label: 'See Our Work', href: '/services' },
                card: {
                    windowTitle: 'app.yourcompany.io',
                    metrics: [
                        { label: 'Lighthouse', value: '98 / 100' },
                        { label: 'API Uptime', value: '99.9%' },
                        { label: 'Test Coverage', value: 'High' },
                        { label: 'Code Ownership', value: '100%' },
                    ],
                    chartBars: [46, 58, 50, 72, 64, 84, 92],
                },
                techStack: ['React', 'Next.js', 'Node.js', 'Laravel', 'PostgreSQL', 'TypeScript'],
            },
            ar: {
                badge: 'هندسة ويب متكاملة',
                titleLine1: 'الواجهة الأمامية والخلفية،',
                titleLine2: 'هندسة من الطرف إلى الطرف',
                subtitle:
                    'واجهات Next.js وReact على خلفيات Node أو Python أو PHP/Laravel — تطبيقات صفحة واحدة وPWA وبنية قاعدة بيانات متينة وواجهات API والتكاملات وتسجيل الدخول الموحّد (SSO) التي تربطها معاً.',
                primaryCta: { label: 'ابدأ مشروعك', href: '/contact' },
                secondaryCta: { label: 'أعمالنا', href: '/services' },
                card: {
                    windowTitle: 'app.yourcompany.io',
                    metrics: [
                        { label: 'Lighthouse', value: '98 / 100' },
                        { label: 'توفّر الـ API', value: '99.9%' },
                        { label: 'تغطية الاختبار', value: 'عالية' },
                        { label: 'ملكية الكود', value: '100%' },
                    ],
                    chartBars: [46, 58, 50, 72, 64, 84, 92],
                },
                techStack: ['React', 'Next.js', 'Node.js', 'Laravel', 'PostgreSQL', 'TypeScript'],
            },
        },
        features: {
            en: {
                eyebrow: 'What we engineer',
                heading: 'One team for the whole stack, front to back',
                subheading: 'No hand-offs between a front-end shop and a back-end contractor — we design the interface, the server, the database, and the APIs as one coherent system.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'Front-end', title: 'Next.js & React front-ends', description: 'Fast, accessible, bilingual interfaces built with React and Next.js — server-rendered for SEO and speed, whether it’s a marketing site or a complex app UI.', statLabel: 'Core Web Vitals', statValue: 'Green' },
                    { id: '02', variant: 'relay', meta: 'Back-end', title: 'Node, Python & Laravel', description: 'Robust back-ends in the right runtime for the job — Node.js, Python, or PHP/Laravel — with clean, testable business logic you can trust.', statLabel: 'Back-end', statValue: 'Fit for job' },
                    { id: '03', variant: 'wave', meta: 'App type', title: 'SPA, MPA & PWA', description: 'Single-page apps for rich interactivity, multi-page for SEO reach, or installable PWAs that load instantly and work offline — matched to your goals.', statLabel: 'Offline-ready', statValue: 'PWA' },
                    { id: '04', variant: 'spark', meta: 'Data', title: 'Database architecture', description: 'Proper schema design, indexing, and data modeling on PostgreSQL or MySQL — so your app stays fast and consistent as data and load grow.', statLabel: 'Data model', statValue: 'Scalable' },
                    { id: '05', variant: 'loop', meta: 'Integrations', title: 'Custom APIs, integrations & SSO', description: 'REST and GraphQL APIs, third-party integrations, payment gateways, and single sign-on (SSO / OAuth) so your systems and users connect securely in one place.', statLabel: 'Integrations', statValue: 'Any system' },
                ],
                metrics: [
                    { label: 'One accountable team', value: 'Full stack' },
                    { label: 'Uptime SLA', value: '99.9%' },
                    { label: 'You own the code', value: '100%' },
                ],
            },
            ar: {
                eyebrow: 'ما الذي نهندسه',
                heading: 'فريق واحد للحزمة كاملة، من الواجهة إلى الخلفية',
                subheading: 'بلا تسليمات بين شركة واجهة ومقاول خلفية — نصمّم الواجهة والخادم وقاعدة البيانات وواجهات API كنظام واحد متماسك.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'الواجهة الأمامية', title: 'واجهات Next.js وReact', description: 'واجهات سريعة وسهلة الوصول وثنائية اللغة مبنية بـ React وNext.js — مُصيَّرة على الخادم للسيو والسرعة، سواء موقع تسويقي أو واجهة تطبيق معقّد.', statLabel: 'Core Web Vitals', statValue: 'خضراء' },
                    { id: '02', variant: 'relay', meta: 'الخلفية', title: 'Node وPython وLaravel', description: 'خلفيات متينة بالبيئة المناسبة للمهمة — Node.js أو Python أو PHP/Laravel — بمنطق أعمال نظيف قابل للاختبار تثق به.', statLabel: 'الخلفية', statValue: 'مناسبة للمهمة' },
                    { id: '03', variant: 'wave', meta: 'نوع التطبيق', title: 'SPA وMPA وPWA', description: 'تطبيقات صفحة واحدة للتفاعل الغني، أو متعددة الصفحات لوصول السيو، أو PWA قابلة للتثبيت تحمّل فوراً وتعمل دون إنترنت — مطابقة لأهدافك.', statLabel: 'جاهز دون إنترنت', statValue: 'PWA' },
                    { id: '04', variant: 'spark', meta: 'البيانات', title: 'بنية قاعدة البيانات', description: 'تصميم مخطط وفهرسة ونمذجة بيانات سليمة على PostgreSQL أو MySQL — ليبقى تطبيقك سريعاً ومتّسقاً مع نمو البيانات والحِمل.', statLabel: 'نموذج البيانات', statValue: 'قابل للتوسّع' },
                    { id: '05', variant: 'loop', meta: 'التكاملات', title: 'واجهات API وتكاملات وSSO', description: 'واجهات REST وGraphQL وتكاملات طرف ثالث وبوابات دفع وتسجيل دخول موحّد (SSO / OAuth) لتتصل أنظمتك ومستخدموك بأمان في مكان واحد.', statLabel: 'التكاملات', statValue: 'أي نظام' },
                ],
                metrics: [
                    { label: 'فريق واحد مسؤول', value: 'حزمة كاملة' },
                    { label: 'وقت التشغيل', value: '99.9%' },
                    { label: 'ملكية الكود', value: '100%' },
                ],
            },
        },
        process: {
            en: {
                eyebrow: 'How we build it',
                heading: 'From architecture to a launched, well-engineered app',
                subheading: 'A disciplined, review-gated path where the front-end, back-end, and data are designed to fit together.',
                ctaLabel: 'Start your build',
                steps: [
                    { title: 'Architecture & scope', description: 'We choose the right stack, design the data model and API contracts, and agree a fixed scope before development starts.', duration: 'Week 1–2' },
                    { title: 'UX & UI design', description: 'We design every screen and flow — bilingual and mobile-first — and you approve the interface before we build.', duration: 'Week 2–3' },
                    { title: 'Build & integrate', description: 'We engineer the front-end and back-end in reviewable sprints, wiring APIs, integrations, and SSO with tests as we go.', duration: 'Week 3–10' },
                    { title: 'Launch & hand over', description: 'We deploy with a proper pipeline, hand over the full source code and accounts, and stay on for support.', duration: 'Week 10–12' },
                ],
            },
            ar: {
                eyebrow: 'كيف نبنيه',
                heading: 'من البنية إلى تطبيق مُطلق ومُحكم الهندسة',
                subheading: 'مسار منضبط بنقاط مراجعة تُصمَّم فيه الواجهة والخلفية والبيانات لتتلاءم معاً.',
                ctaLabel: 'ابدأ مشروعك',
                steps: [
                    { title: 'البنية والنطاق', description: 'نختار الحزمة المناسبة ونصمّم نموذج البيانات وعقود الـ API، ونتفق على نطاق ثابت قبل بدء التطوير.', duration: 'الأسبوع 1–2' },
                    { title: 'تصميم التجربة والواجهة', description: 'نصمّم كل شاشة ومسار — بلغتين وجوال أولاً — وتعتمد الواجهة قبل أن نبني.', duration: 'الأسبوع 2–3' },
                    { title: 'البناء والتكامل', description: 'نهندس الواجهة والخلفية في جولات قابلة للمراجعة، ونربط واجهات API والتكاملات وSSO مع اختبارات أثناء العمل.', duration: 'الأسبوع 3–10' },
                    { title: 'الإطلاق والتسليم', description: 'ننشر عبر خط أنابيب سليم، ونسلّمك الكود المصدري الكامل والحسابات ونبقى للدعم.', duration: 'الأسبوع 10–12' },
                ],
            },
        },
    },

    // ─────────────────────────────────────────────────────────────
    // PILLAR 3 — Interactive Portals & Dashboards
    // ─────────────────────────────────────────────────────────────
    'interactive-portals-dashboards': {
        hero: {
            en: {
                badge: 'Portals & Dashboards',
                titleLine1: 'Every Stakeholder,',
                titleLine2: 'The Right View',
                subtitle:
                    'Client and customer portals, admin control panels, and data dashboards — with role-based access, live charts, and document management, so everyone sees exactly what they should.',
                primaryCta: { label: 'Build My Portal', href: '/contact' },
                secondaryCta: { label: 'See Our Work', href: '/services' },
                card: {
                    windowTitle: 'portal.yourcompany.io',
                    metrics: [
                        { label: 'Active Users', value: '1,240' },
                        { label: 'Roles & Permissions', value: 'Granular' },
                        { label: 'Docs Managed', value: '3.4k' },
                        { label: 'Data Refresh', value: 'Live' },
                    ],
                    chartBars: [52, 46, 66, 58, 76, 72, 90],
                },
                techStack: ['React', 'Recharts', 'Auth.js', 'PostgreSQL', 'Prisma', 'Vercel'],
            },
            ar: {
                badge: 'البوابات ولوحات التحكم',
                titleLine1: 'لكل معنيّ',
                titleLine2: 'العرض المناسب له',
                subtitle:
                    'بوابات للعملاء ولوحات تحكم إدارية ولوحات بيانات — بصلاحيات حسب الأدوار ورسوم بيانية حية وإدارة مستندات، ليرى كل شخص ما يخصّه بالضبط.',
                primaryCta: { label: 'ابنِ بوابتي', href: '/contact' },
                secondaryCta: { label: 'أعمالنا', href: '/services' },
                card: {
                    windowTitle: 'portal.yourcompany.io',
                    metrics: [
                        { label: 'المستخدمون النشطون', value: '1,240' },
                        { label: 'الأدوار والصلاحيات', value: 'دقيقة' },
                        { label: 'المستندات المُدارة', value: '3.4k' },
                        { label: 'تحديث البيانات', value: 'مباشر' },
                    ],
                    chartBars: [52, 46, 66, 58, 76, 72, 90],
                },
                techStack: ['React', 'Recharts', 'Auth.js', 'PostgreSQL', 'Prisma', 'Vercel'],
            },
        },
        features: {
            en: {
                eyebrow: 'What you get',
                heading: 'Self-serve portals and dashboards that decide for you',
                subheading: 'Replace email chains and exported spreadsheets with one secure space where clients self-serve and your team reads live numbers, each behind the right permissions.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'Portals', title: 'Client & customer portals', description: 'Secure, branded portals where clients track projects, view invoices, and self-serve — replacing scattered email and WhatsApp with one organized home.', statLabel: 'Fewer status emails', statValue: '−70%' },
                    { id: '02', variant: 'relay', meta: 'Admin', title: 'Admin dashboards & control panels', description: 'A command center to manage users, content, orders, and operations — everything your team runs day to day, on one screen you actually own.', statLabel: 'Control', statValue: 'One screen' },
                    { id: '03', variant: 'wave', meta: 'Data viz', title: 'Data visualization & charting', description: 'Live KPIs, trend lines, and interactive charts turn raw rows into decisions your team can act on in seconds — with filters and drill-down.', statLabel: 'Data refresh', statValue: 'Live' },
                    { id: '04', variant: 'spark', meta: 'Access', title: 'Role-based access control', description: 'Granular RBAC gives finance, ops, admins, and clients each their own view and permissions — so nobody sees data they shouldn’t.', statLabel: 'Permissions', statValue: 'Per role' },
                    { id: '05', variant: 'loop', meta: 'Documents', title: 'File & document management', description: 'Upload, organize, version, and share files and documents in a searchable, permissioned library your users can access anytime.', statLabel: 'Document access', statValue: '24 / 7' },
                ],
                metrics: [
                    { label: 'Reporting time', value: '−85%' },
                    { label: 'Access control', value: 'Role-based' },
                    { label: 'Branded experience', value: '100%' },
                ],
            },
            ar: {
                eyebrow: 'ما الذي تحصل عليه',
                heading: 'بوابات ولوحات ذاتية الخدمة تقرّر نيابة عنك',
                subheading: 'استبدل سلاسل البريد والجداول المُصدَّرة بمساحة واحدة آمنة يخدم فيها العملاء أنفسهم ويقرأ فريقك أرقاماً حية، كلٌ خلف الصلاحية المناسبة.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'البوابات', title: 'بوابات العملاء والزبائن', description: 'بوابات آمنة بهويتك يتابع فيها العملاء المشاريع ويرون الفواتير ويخدمون أنفسهم — بدل تشتّت البريد والواتساب في مكان واحد منظّم.', statLabel: 'رسائل متابعة أقل', statValue: '−70%' },
                    { id: '02', variant: 'relay', meta: 'الإدارة', title: 'لوحات إدارة وتحكم', description: 'مركز قيادة لإدارة المستخدمين والمحتوى والطلبات والعمليات — كل ما يديره فريقك يومياً، على شاشة واحدة تملكها فعلاً.', statLabel: 'التحكم', statValue: 'شاشة واحدة' },
                    { id: '03', variant: 'wave', meta: 'تصوير البيانات', title: 'تصوير البيانات والرسوم', description: 'مؤشرات حية وخطوط اتجاه ورسوم تفاعلية تحوّل الصفوف الخام إلى قرارات في ثوانٍ — بمرشّحات وتعمّق.', statLabel: 'تحديث البيانات', statValue: 'مباشر' },
                    { id: '04', variant: 'spark', meta: 'الوصول', title: 'صلاحيات حسب الأدوار', description: 'تحكّم دقيق (RBAC) يمنح المالية والعمليات والمدراء والعملاء كلٌ عرضه وصلاحياته — فلا يرى أحد بيانات لا تخصّه.', statLabel: 'الصلاحيات', statValue: 'حسب الدور' },
                    { id: '05', variant: 'loop', meta: 'المستندات', title: 'إدارة الملفات والمستندات', description: 'ارفع ونظّم وأصدر إصدارات وشارك الملفات والمستندات في مكتبة قابلة للبحث ومحكومة الصلاحيات يصل إليها مستخدموك في أي وقت.', statLabel: 'الوصول للمستندات', statValue: '24 / 7' },
                ],
                metrics: [
                    { label: 'وقت التقارير', value: '−85%' },
                    { label: 'الصلاحيات', value: 'حسب الدور' },
                    { label: 'تجربة بهويتك', value: '100%' },
                ],
            },
        },
        process: {
            en: {
                eyebrow: 'How we build it',
                heading: 'From scattered data to one secure, live workspace',
                subheading: 'A structured path from your stakeholders and access rules to a portal and dashboard your team trusts.',
                ctaLabel: 'Build my portal',
                steps: [
                    { title: 'Map roles & data', description: 'We define who needs to see and do what — clients, admins, teams — and the exact metrics, documents, and access rules that matter.', duration: 'Week 1' },
                    { title: 'Brand & design', description: 'We design the portal, dashboards, and charts in your branding — bilingual and mobile-first — and you approve them.', duration: 'Week 1–3' },
                    { title: 'Build & secure', description: 'We build the views, live data pipelines, RBAC, and file management with encrypted, role-based access, tested end to end.', duration: 'Week 3–7' },
                    { title: 'Launch & onboard', description: 'We go live, hand over the code and accounts, and help you bring your first users and clients on board.', duration: 'Week 7–8' },
                ],
            },
            ar: {
                eyebrow: 'كيف نبنيها',
                heading: 'من بيانات مبعثرة إلى مساحة عمل واحدة آمنة وحية',
                subheading: 'مسار منظّم من معنيّيك وقواعد الوصول إلى بوابة ولوحة تحكم يثق بها فريقك.',
                ctaLabel: 'ابنِ بوابتي',
                steps: [
                    { title: 'رسم الأدوار والبيانات', description: 'نحدّد من يحتاج رؤية وفعل ماذا — عملاء ومدراء وفِرق — والمؤشرات والمستندات وقواعد الوصول المهمة بالضبط.', duration: 'الأسبوع 1' },
                    { title: 'الهوية والتصميم', description: 'نصمّم البوابة واللوحات والرسوم بهويتك — بلغتين وجوال أولاً — وتعتمدها.', duration: 'الأسبوع 1–3' },
                    { title: 'البناء والتأمين', description: 'نبني العروض وخطوط البيانات الحية وصلاحيات RBAC وإدارة الملفات بوصول مشفّر حسب الدور، ونختبرها من البداية للنهاية.', duration: 'الأسبوع 3–7' },
                    { title: 'الإطلاق والتهيئة', description: 'ننشر ونسلّمك الكود والحسابات ونساعدك في إدخال أول مستخدميك وعملائك.', duration: 'الأسبوع 7–8' },
                ],
            },
        },
    },

    // ─────────────────────────────────────────────────────────────
    // PILLAR 4 — App Modernization, Security & Maintenance
    // ─────────────────────────────────────────────────────────────
    'application-modernization-performance': {
        hero: {
            en: {
                badge: 'Modernization & Performance',
                titleLine1: 'Fix, Secure & Speed Up',
                titleLine2: 'The App You Already Have',
                subtitle:
                    'Refactor legacy code, migrate monoliths to microservices, pass Core Web Vitals, add automated testing, patch security holes, and put your app on a proper pipeline with 24/7 monitoring.',
                primaryCta: { label: 'Audit My App', href: '/contact' },
                secondaryCta: { label: 'See Our Work', href: '/services' },
                card: {
                    windowTitle: 'ops.yourcompany.io',
                    metrics: [
                        { label: 'Load Time', value: '−62%' },
                        { label: 'Core Web Vitals', value: 'Passing' },
                        { label: 'Vulns Patched', value: '100%' },
                        { label: 'Monitoring', value: '24 / 7' },
                    ],
                    chartBars: [88, 74, 80, 66, 72, 58, 44],
                },
                techStack: ['TypeScript', 'Docker', 'GitHub Actions', 'Playwright', 'Sentry', 'AWS'],
            },
            ar: {
                badge: 'التحديث والأداء',
                titleLine1: 'أصلح وأمّن وسرّع',
                titleLine2: 'التطبيق الذي تملكه أصلاً',
                subtitle:
                    'إعادة هيكلة الكود القديم، وترحيل الأنظمة المتجانسة إلى microservices، واجتياز Core Web Vitals، وإضافة اختبارات آلية، وترقيع الثغرات الأمنية، ووضع تطبيقك على خط أنابيب سليم بمراقبة 24/7.',
                primaryCta: { label: 'دقّق تطبيقي', href: '/contact' },
                secondaryCta: { label: 'أعمالنا', href: '/services' },
                card: {
                    windowTitle: 'ops.yourcompany.io',
                    metrics: [
                        { label: 'وقت التحميل', value: '−62%' },
                        { label: 'Core Web Vitals', value: 'مجتازة' },
                        { label: 'الثغرات المُرقّعة', value: '100%' },
                        { label: 'المراقبة', value: '24 / 7' },
                    ],
                    chartBars: [88, 74, 80, 66, 72, 58, 44],
                },
                techStack: ['TypeScript', 'Docker', 'GitHub Actions', 'Playwright', 'Sentry', 'AWS'],
            },
        },
        features: {
            en: {
                eyebrow: 'What we fix',
                heading: 'Turn a slow, fragile app into a fast, secure one',
                subheading: 'You don’t always need a rewrite — often you need the right refactor, the right tests, and the right pipeline. We assess honestly and modernize what pays off.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'Refactoring', title: 'Legacy refactoring & rewrites', description: 'We untangle brittle, hard-to-change code — refactoring in place or rewriting the parts that warrant it — so your app is safe and cheap to evolve again.', statLabel: 'Tech debt', statValue: 'Reduced' },
                    { id: '02', variant: 'relay', meta: 'Architecture', title: 'Monolith → microservices', description: 'We break a tangled monolith into well-bounded services where it makes sense, so teams ship independently and the system scales by part, not all at once.', statLabel: 'Scale', statValue: 'By service' },
                    { id: '03', variant: 'wave', meta: 'Performance', title: 'Speed & Core Web Vitals', description: 'We profile and fix the real bottlenecks — queries, bundles, caching, images — to pass Core Web Vitals and give users a genuinely fast experience.', statLabel: 'Load time', statValue: '↓ Sharp' },
                    { id: '04', variant: 'spark', meta: 'Security & QA', title: 'Testing, security audits & patching', description: 'End-to-end automated testing plus security auditing and vulnerability patching close the gaps that cause outages, regressions, and breaches.', statLabel: 'Vulnerabilities', statValue: 'Patched' },
                    { id: '05', variant: 'loop', meta: 'Ops', title: 'Pipelines & 24/7 monitoring', description: 'CI/CD deployment pipelines and 24/7 monitoring mean safe, repeatable releases and alerts that catch problems before your users do.', statLabel: 'Monitoring', statValue: '24 / 7' },
                ],
                metrics: [
                    { label: 'Load time', value: '↓ Sharp' },
                    { label: 'Vulnerabilities', value: 'Patched' },
                    { label: 'Uptime monitoring', value: '24 / 7' },
                ],
            },
            ar: {
                eyebrow: 'ما الذي نُصلحه',
                heading: 'حوّل تطبيقاً بطيئاً هشّاً إلى سريع وآمن',
                subheading: 'لست بحاجة دائماً لإعادة كتابة — غالباً تحتاج إعادة الهيكلة الصحيحة والاختبارات الصحيحة وخط الأنابيب الصحيح. نقيّم بصدق ونحدّث ما يستحق.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'إعادة الهيكلة', title: 'إعادة هيكلة وإعادة كتابة القديم', description: 'نفكّ الكود الهشّ الصعب التغيير — إعادة هيكلة في مكانه أو إعادة كتابة الأجزاء التي تستحق — ليعود تطبيقك آمناً ورخيص التطوير.', statLabel: 'الدين التقني', statValue: 'مُخفَّض' },
                    { id: '02', variant: 'relay', meta: 'البنية', title: 'من متجانس إلى microservices', description: 'نقسّم النظام المتجانس المتشابك إلى خدمات محدودة النطاق حيث يفيد، فتُطلق الفِرق باستقلال ويتوسّع النظام بالجزء لا دفعة واحدة.', statLabel: 'التوسّع', statValue: 'حسب الخدمة' },
                    { id: '03', variant: 'wave', meta: 'الأداء', title: 'السرعة وCore Web Vitals', description: 'نحلّل ونُصلح الاختناقات الحقيقية — الاستعلامات والحزم والتخزين المؤقت والصور — لاجتياز Core Web Vitals ومنح المستخدمين تجربة سريعة فعلاً.', statLabel: 'وقت التحميل', statValue: '↓ حاد' },
                    { id: '04', variant: 'spark', meta: 'الأمان والجودة', title: 'اختبار وتدقيق أمني وترقيع', description: 'اختبارات آلية شاملة مع تدقيق أمني وترقيع للثغرات تُغلق الفجوات التي تسبّب الأعطال والانحدارات والاختراقات.', statLabel: 'الثغرات', statValue: 'مُرقّعة' },
                    { id: '05', variant: 'loop', meta: 'التشغيل', title: 'خطوط أنابيب ومراقبة 24/7', description: 'خطوط نشر CI/CD ومراقبة 24/7 تعني إصدارات آمنة قابلة للتكرار وتنبيهات تلتقط المشكلات قبل مستخدميك.', statLabel: 'المراقبة', statValue: '24 / 7' },
                ],
                metrics: [
                    { label: 'وقت التحميل', value: '↓ حاد' },
                    { label: 'الثغرات', value: 'مُرقّعة' },
                    { label: 'مراقبة التشغيل', value: '24 / 7' },
                ],
            },
        },
        process: {
            en: {
                eyebrow: 'How we work',
                heading: 'From an honest audit to a modern, monitored app',
                subheading: 'We diagnose before we prescribe — then modernize in safe, measurable steps with no big-bang risk.',
                ctaLabel: 'Audit my app',
                steps: [
                    { title: 'Audit & diagnose', description: 'We review the codebase, performance, and security, then report exactly what’s slow, risky, or brittle — and what’s worth fixing.', duration: 'Week 1–2' },
                    { title: 'Prioritize the roadmap', description: 'We agree a phased plan — quick performance and security wins first, deeper refactors and architecture next — with clear scope per step.', duration: 'Week 2' },
                    { title: 'Modernize safely', description: 'We refactor, add automated tests, patch vulnerabilities, and re-architect in reviewable increments so nothing breaks in production.', duration: 'Week 2–10' },
                    { title: 'Pipeline & monitor', description: 'We set up CI/CD deployment and 24/7 monitoring, hand over the code and accounts, and keep watch so issues are caught early.', duration: 'Ongoing' },
                ],
            },
            ar: {
                eyebrow: 'كيف نعمل',
                heading: 'من تدقيق صادق إلى تطبيق حديث ومُراقَب',
                subheading: 'نشخّص قبل أن نصف — ثم نحدّث بخطوات آمنة قابلة للقياس دون مخاطرة الدفعة الواحدة.',
                ctaLabel: 'دقّق تطبيقي',
                steps: [
                    { title: 'التدقيق والتشخيص', description: 'نراجع الكود والأداء والأمان، ثم نبيّن بدقة ما هو بطيء أو خطر أو هشّ — وما يستحق الإصلاح.', duration: 'الأسبوع 1–2' },
                    { title: 'ترتيب خارطة الطريق', description: 'نتفق على خطة مرحلية — مكاسب الأداء والأمان السريعة أولاً، ثم إعادة الهيكلة والبنية الأعمق — بنطاق واضح لكل خطوة.', duration: 'الأسبوع 2' },
                    { title: 'التحديث بأمان', description: 'نعيد الهيكلة ونضيف اختبارات آلية ونرقّع الثغرات ونعيد البناء المعماري بزيادات قابلة للمراجعة فلا ينكسر شيء في الإنتاج.', duration: 'الأسبوع 2–10' },
                    { title: 'خط الأنابيب والمراقبة', description: 'نُعدّ نشر CI/CD ومراقبة 24/7، ونسلّمك الكود والحسابات ونبقى نراقب لتُلتقط المشكلات مبكراً.', duration: 'مستمر' },
                ],
            },
        },
    },

    // ─────────────────────────────────────────────────────────────
    // PILLAR 5 — Media, Entertainment & Streaming
    // ─────────────────────────────────────────────────────────────
    'media-entertainment-streaming': {
        hero: {
            en: {
                badge: 'Media & Streaming',
                titleLine1: 'Streaming Platforms',
                titleLine2: 'Built to Monetize',
                subtitle:
                    'VoD and OTT platforms, live streaming, and creator-monetization apps — with subscriptions and memberships, media asset management, CDN delivery, and DRM to protect your content.',
                primaryCta: { label: 'Build My Platform', href: '/contact' },
                secondaryCta: { label: 'See Our Work', href: '/services' },
                card: {
                    windowTitle: 'stream.yourplatform.io',
                    metrics: [
                        { label: 'Concurrent Viewers', value: '12k' },
                        { label: 'Startup Time', value: '< 2 s' },
                        { label: 'DRM Protected', value: '✓ Yes' },
                        { label: 'CDN Delivery', value: 'Global' },
                    ],
                    chartBars: [40, 56, 50, 70, 66, 86, 96],
                },
                techStack: ['Next.js', 'HLS / DASH', 'Mux', 'Stripe', 'Widevine DRM', 'CloudFront'],
            },
            ar: {
                badge: 'الإعلام والبث',
                titleLine1: 'منصات بث',
                titleLine2: 'مبنية لتحقيق الدخل',
                subtitle:
                    'منصات فيديو عند الطلب (VoD) وبث عبر الإنترنت (OTT) وبث مباشر وتطبيقات تحقيق دخل للصنّاع — باشتراكات وعضويات وإدارة أصول إعلامية وتوصيل عبر CDN وحماية محتوى بـ DRM.',
                primaryCta: { label: 'ابنِ منصتي', href: '/contact' },
                secondaryCta: { label: 'أعمالنا', href: '/services' },
                card: {
                    windowTitle: 'stream.yourplatform.io',
                    metrics: [
                        { label: 'المشاهدون المتزامنون', value: '12k' },
                        { label: 'زمن البدء', value: '< 2 ثانية' },
                        { label: 'محمي بـ DRM', value: '✓ نعم' },
                        { label: 'توصيل CDN', value: 'عالمي' },
                    ],
                    chartBars: [40, 56, 50, 70, 66, 86, 96],
                },
                techStack: ['Next.js', 'HLS / DASH', 'Mux', 'Stripe', 'Widevine DRM', 'CloudFront'],
            },
        },
        features: {
            en: {
                eyebrow: 'What we build',
                heading: 'A streaming product that plays fast and pays',
                subheading: 'From on-demand libraries to live events — smooth adaptive playback, protected content, and the subscription and membership tools that turn viewers into revenue.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'VoD / OTT', title: 'VoD & OTT platforms', description: 'On-demand video libraries with categories, search, watchlists, and adaptive HLS/DASH streaming that plays smoothly on any device and connection.', statLabel: 'Playback', statValue: 'Adaptive' },
                    { id: '02', variant: 'relay', meta: 'Live', title: 'Live streaming', description: 'Low-latency live events, shows, and webinars with chat and scaling that holds up from a hundred viewers to tens of thousands at once.', statLabel: 'Latency', statValue: 'Low' },
                    { id: '03', variant: 'wave', meta: 'Monetization', title: 'Subscriptions & memberships', description: 'Recurring subscriptions, tiered memberships, pay-per-view, and paywalls (Stripe) so your audience directly funds the content they love.', statLabel: 'Revenue', statValue: 'Recurring' },
                    { id: '04', variant: 'spark', meta: 'Media', title: 'Media asset management', description: 'Upload, transcode, tag, and organize a growing media catalog with metadata and thumbnails — a back office built for content at scale.', statLabel: 'Catalog', statValue: 'At scale' },
                    { id: '05', variant: 'loop', meta: 'Delivery & DRM', title: 'CDN delivery & DRM', description: 'Global CDN delivery for fast start times worldwide, plus DRM and signed URLs so your premium content stays protected from piracy.', statLabel: 'Content', statValue: 'Protected' },
                ],
                metrics: [
                    { label: 'Adaptive streaming', value: 'HLS / DASH' },
                    { label: 'Content protection', value: 'DRM' },
                    { label: 'Global delivery', value: 'CDN' },
                ],
            },
            ar: {
                eyebrow: 'ما الذي نبنيه',
                heading: 'منتج بث يعمل بسرعة ويحقّق دخلاً',
                subheading: 'من مكتبات عند الطلب إلى أحداث مباشرة — تشغيل تكيّفي سلس ومحتوى محمي وأدوات الاشتراك والعضوية التي تحوّل المشاهدين إلى إيراد.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'VoD / OTT', title: 'منصات VoD وOTT', description: 'مكتبات فيديو عند الطلب بتصنيفات وبحث وقوائم مشاهدة وبث تكيّفي HLS/DASH يعمل بسلاسة على أي جهاز واتصال.', statLabel: 'التشغيل', statValue: 'تكيّفي' },
                    { id: '02', variant: 'relay', meta: 'المباشر', title: 'البث المباشر', description: 'أحداث وبرامج وندوات مباشرة بزمن استجابة منخفض ودردشة وقابلية توسّع تصمد من مئة مشاهد إلى عشرات الآلاف دفعة واحدة.', statLabel: 'زمن الاستجابة', statValue: 'منخفض' },
                    { id: '03', variant: 'wave', meta: 'تحقيق الدخل', title: 'اشتراكات وعضويات', description: 'اشتراكات متكرّرة وعضويات متدرّجة ودفع لكل مشاهدة وجدران دفع (Stripe) ليموّل جمهورك المحتوى الذي يحبّه مباشرة.', statLabel: 'الإيراد', statValue: 'متكرّر' },
                    { id: '04', variant: 'spark', meta: 'الوسائط', title: 'إدارة الأصول الإعلامية', description: 'ارفع وحوّل الترميز وصنّف ونظّم كتالوجاً إعلامياً متنامياً ببيانات وصفية وصور مصغّرة — مكتب خلفي مبني للمحتوى على نطاق واسع.', statLabel: 'الكتالوج', statValue: 'واسع النطاق' },
                    { id: '05', variant: 'loop', meta: 'التوصيل وDRM', title: 'توصيل CDN وحماية DRM', description: 'توصيل عبر CDN عالمي لأزمنة بدء سريعة حول العالم، مع DRM وروابط موقّعة ليبقى محتواك المميّز محمياً من القرصنة.', statLabel: 'المحتوى', statValue: 'محمي' },
                ],
                metrics: [
                    { label: 'بث تكيّفي', value: 'HLS / DASH' },
                    { label: 'حماية المحتوى', value: 'DRM' },
                    { label: 'توصيل عالمي', value: 'CDN' },
                ],
            },
        },
        process: {
            en: {
                eyebrow: 'How we build it',
                heading: 'From content library to a launched streaming platform',
                subheading: 'A focused path from your catalog and monetization model to a fast, protected, revenue-ready platform.',
                ctaLabel: 'Build my platform',
                steps: [
                    { title: 'Model content & revenue', description: 'We define your catalog, live vs on-demand needs, and how you monetize — subscriptions, memberships, or pay-per-view — as a clear scope.', duration: 'Week 1–2' },
                    { title: 'Design the experience', description: 'We design the browse, player, and paywall flows — bilingual and mobile-first — for smooth discovery and easy sign-up, then you approve.', duration: 'Week 2–3' },
                    { title: 'Build streaming & billing', description: 'We build adaptive playback, live streaming, media management, subscriptions, and DRM, tested across devices and networks.', duration: 'Week 3–12' },
                    { title: 'Launch on a global CDN', description: 'We deploy on a global CDN for fast start times, hand over the full source code and accounts, and stay on for support.', duration: 'Week 12–14' },
                ],
            },
            ar: {
                eyebrow: 'كيف نبنيها',
                heading: 'من مكتبة محتوى إلى منصة بث مُطلقة',
                subheading: 'مسار مركّز من كتالوجك ونموذج تحقيق الدخل إلى منصة سريعة محمية جاهزة للإيراد.',
                ctaLabel: 'ابنِ منصتي',
                steps: [
                    { title: 'نمذجة المحتوى والإيراد', description: 'نحدّد كتالوجك واحتياجات المباشر مقابل عند الطلب وكيف تحقّق الدخل — اشتراكات أو عضويات أو دفع لكل مشاهدة — كنطاق واضح.', duration: 'الأسبوع 1–2' },
                    { title: 'تصميم التجربة', description: 'نصمّم مسارات التصفّح والمشغّل وجدار الدفع — بلغتين وجوال أولاً — لاكتشاف سلس وتسجيل سهل، ثم تعتمدها.', duration: 'الأسبوع 2–3' },
                    { title: 'بناء البث والفوترة', description: 'نبني التشغيل التكيّفي والبث المباشر وإدارة الوسائط والاشتراكات وحماية DRM، ونختبرها عبر الأجهزة والشبكات.', duration: 'الأسبوع 3–12' },
                    { title: 'الإطلاق على CDN عالمي', description: 'ننشر على CDN عالمي لأزمنة بدء سريعة، ونسلّمك الكود المصدري الكامل والحسابات ونبقى للدعم.', duration: 'الأسبوع 12–14' },
                ],
            },
        },
    },

    // ─────────────────────────────────────────────────────────────
    // 2. Client Portals
    // ─────────────────────────────────────────────────────────────
    'client-portals': {
        hero: {
            en: {
                badge: 'Client Portals',
                titleLine1: 'Your Clients,',
                titleLine2: 'Always in the Loop',
                subtitle:
                    'Secure, branded portals where clients track projects, view invoices, download reports, and stay updated — no email chains needed.',
                primaryCta: { label: 'Build My Portal', href: '#contact' },
                secondaryCta: { label: 'See Examples', href: '/projects' },
                card: {
                    windowTitle: 'portal.yourcompany.io',
                    metrics: [
                        { label: 'Active Clients', value: '48' },
                        { label: 'Docs Shared', value: '312' },
                        { label: 'Avg Session', value: '8 min' },
                        { label: 'Client NPS', value: '9.2 / 10' },
                    ],
                    chartBars: [50, 62, 54, 78, 68, 88, 85],
                },
                techStack: ['React', 'Auth.js', 'Prisma', 'Supabase', 'Stripe', 'Vercel'],
            },
            ar: {
                badge: 'بوابات العملاء',
                titleLine1: 'عملاؤك،',
                titleLine2: 'دائماً على اطلاع كامل',
                subtitle:
                    'بوابات آمنة بهوية علامتك التجارية حيث يتابع العملاء المشاريع والفواتير والتقارير — دون مطاردة الرسائل.',
                primaryCta: { label: 'ابنِ بوابتي', href: '#contact' },
                secondaryCta: { label: 'أمثلة', href: '/projects' },
                card: {
                    windowTitle: 'portal.yourcompany.io',
                    metrics: [
                        { label: 'العملاء النشطون', value: '48' },
                        { label: 'المستندات المشتركة', value: '312' },
                        { label: 'متوسط الجلسة', value: '8 دقائق' },
                        { label: 'NPS العملاء', value: '9.2 / 10' },
                    ],
                    chartBars: [50, 62, 54, 78, 68, 88, 85],
                },
                techStack: ['React', 'Auth.js', 'Prisma', 'Supabase', 'Stripe', 'Vercel'],
            },
        },
        features: {
            en: {
                eyebrow: 'Inside the portal',
                heading: 'A self-serve home for every client relationship',
                subheading: 'Replace the back-and-forth of email and WhatsApp with one secure space where clients find everything themselves.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'Access', title: 'Secure client logins', description: 'Each client sees only their own projects, files, and invoices behind encrypted, role-based authentication.', statLabel: 'Per-client view', statValue: 'Isolated' },
                    { id: '02', variant: 'relay', meta: 'Visibility', title: 'Live project status', description: 'Clients track milestones, approvals, and progress in real time — so “any update?” messages simply stop arriving.', statLabel: 'Status updates', statValue: 'Real-time' },
                    { id: '03', variant: 'wave', meta: 'Documents', title: 'Files & invoices in one place', description: 'Contracts, reports, and invoices live in a tidy, searchable history clients can download anytime.', statLabel: 'Document access', statValue: '24 / 7' },
                    { id: '04', variant: 'spark', meta: 'Branding', title: 'Your brand, not ours', description: 'Your logo, colors, and domain throughout — the portal feels like a premium part of your own product.', statLabel: 'White-label', statValue: 'Included' },
                    { id: '05', variant: 'loop', meta: 'Notifications', title: 'Automatic updates', description: 'Email and in-app alerts fire on new files, status changes, and messages so nothing slips through.', statLabel: 'Alerts', statValue: 'Automated' },
                ],
                metrics: [
                    { label: 'Fewer status emails', value: '−70%' },
                    { label: 'Document access', value: '24 / 7' },
                    { label: 'Branded experience', value: '100%' },
                ],
            },
            ar: {
                eyebrow: 'داخل البوابة',
                heading: 'مساحة ذاتية لكل علاقة مع عميل',
                subheading: 'استبدل تبادل الرسائل بمساحة واحدة آمنة يجد فيها العميل كل شيء بنفسه.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'الوصول', title: 'دخول آمن للعملاء', description: 'يرى كل عميل مشاريعه وملفاته وفواتيره فقط خلف مصادقة مشفّرة حسب الدور.', statLabel: 'عرض لكل عميل', statValue: 'منفصل' },
                    { id: '02', variant: 'relay', meta: 'الوضوح', title: 'حالة المشروع مباشرة', description: 'يتابع العملاء المراحل والموافقات والتقدّم آنياً — فتتوقف رسائل «أي تحديث؟».', statLabel: 'التحديثات', statValue: 'فورية' },
                    { id: '03', variant: 'wave', meta: 'المستندات', title: 'الملفات والفواتير معاً', description: 'العقود والتقارير والفواتير في سجل مرتّب قابل للبحث والتنزيل في أي وقت.', statLabel: 'الوصول للمستندات', statValue: '24 / 7' },
                    { id: '04', variant: 'spark', meta: 'الهوية', title: 'علامتك أنت', description: 'شعارك وألوانك ونطاقك في كل مكان — تبدو البوابة جزءاً راقياً من منتجك.', statLabel: 'هوية كاملة', statValue: 'مضمّنة' },
                    { id: '05', variant: 'loop', meta: 'الإشعارات', title: 'تحديثات تلقائية', description: 'تنبيهات بريد وداخل التطبيق عند الملفات الجديدة وتغيّر الحالة فلا يضيع شيء.', statLabel: 'التنبيهات', statValue: 'تلقائية' },
                ],
                metrics: [
                    { label: 'رسائل متابعة أقل', value: '−70%' },
                    { label: 'الوصول للمستندات', value: '24 / 7' },
                    { label: 'تجربة بهويتك', value: '100%' },
                ],
            },
        },
        process: {
            en: {
                eyebrow: 'How we build it',
                heading: 'Your branded portal, live in weeks',
                subheading: 'A focused path from your client workflow to a secure, self-serve space.',
                ctaLabel: 'Build my portal',
                steps: [
                    { title: 'Map the journey', description: 'We define what clients need to see and do — projects, files, invoices, messages — and your access rules.', duration: 'Week 1' },
                    { title: 'Brand & design', description: 'We design the portal in your branding so it feels like a native part of your product, then you approve it.', duration: 'Week 1–2' },
                    { title: 'Build & secure', description: 'We build the logins, roles, and screens with encrypted, role-based access, tested end to end.', duration: 'Week 2–5' },
                    { title: 'Launch & onboard', description: 'We go live, hand over the code and accounts, and help you bring your first clients on board.', duration: 'Week 5–6' },
                ],
            },
            ar: {
                eyebrow: 'كيف نبنيها',
                heading: 'بوابتك بهويتك، جاهزة خلال أسابيع',
                subheading: 'مسار مركّز من سير عمل عملائك إلى مساحة آمنة ذاتية الخدمة.',
                ctaLabel: 'ابنِ بوابتي',
                steps: [
                    { title: 'رسم الرحلة', description: 'نحدّد ما يحتاج العملاء رؤيته وفعله — مشاريع وملفات وفواتير ورسائل — وقواعد وصولك.', duration: 'الأسبوع 1' },
                    { title: 'الهوية والتصميم', description: 'نصمّم البوابة بهويتك لتبدو جزءاً أصيلاً من منتجك، ثم تعتمدها.', duration: 'الأسبوع 1–2' },
                    { title: 'البناء والتأمين', description: 'نبني الدخول والأدوار والشاشات بوصول مشفّر حسب الدور، ونختبرها من البداية للنهاية.', duration: 'الأسبوع 2–5' },
                    { title: 'الإطلاق والتهيئة', description: 'ننشر ونسلّمك الكود والحسابات ونساعدك في إدخال أول عملائك.', duration: 'الأسبوع 5–6' },
                ],
            },
        },
    },

    // ─────────────────────────────────────────────────────────────
    // 3. Admin Dashboards
    // ─────────────────────────────────────────────────────────────
    'admin-dashboards': {
        hero: {
            en: {
                badge: 'Admin Dashboards',
                titleLine1: 'Full Control,',
                titleLine2: 'At a Single Glance',
                subtitle:
                    'Real-time dashboards that turn raw data into decisions — custom-built around your KPIs, your team, and your operations.',
                primaryCta: { label: 'Build My Dashboard', href: '#contact' },
                secondaryCta: { label: 'See Our Work', href: '/projects' },
                card: {
                    windowTitle: 'admin.yourcompany.io',
                    metrics: [
                        { label: 'Revenue (MTD)', value: '$42k' },
                        { label: 'Active Users', value: '1,204' },
                        { label: 'Tasks Done', value: '98%' },
                        { label: 'Open Alerts', value: '0' },
                    ],
                    chartBars: [54, 44, 68, 58, 78, 74, 94],
                },
                techStack: ['React', 'Recharts', 'Supabase', 'PostgreSQL', 'REST API', 'Vercel'],
            },
            ar: {
                badge: 'لوحات التحكم الإدارية',
                titleLine1: 'سيطرة كاملة،',
                titleLine2: 'بنظرة واحدة',
                subtitle:
                    'لوحات بيانات آنية تحوّل الأرقام الخام إلى قرارات — مبنية حول مؤشراتك ومعاملاتك وفريقك.',
                primaryCta: { label: 'ابنِ لوحتي', href: '#contact' },
                secondaryCta: { label: 'أعمالنا', href: '/projects' },
                card: {
                    windowTitle: 'admin.yourcompany.io',
                    metrics: [
                        { label: 'الإيراد (هذا الشهر)', value: '42k$' },
                        { label: 'المستخدمون النشطون', value: '1,204' },
                        { label: 'المهام المنجزة', value: '98%' },
                        { label: 'التنبيهات المفتوحة', value: '0' },
                    ],
                    chartBars: [54, 44, 68, 58, 78, 74, 94],
                },
                techStack: ['React', 'Recharts', 'Supabase', 'PostgreSQL', 'REST API', 'Vercel'],
            },
        },
        features: {
            en: {
                eyebrow: 'On the dashboard',
                heading: 'Every number that matters, on one screen',
                subheading: 'Stop exporting spreadsheets and stitching reports — your live operating picture updates itself.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'Live data', title: 'Real-time KPIs', description: 'Revenue, users, orders, and the metrics you care about refresh automatically — no manual exports, no stale numbers.', statLabel: 'Refresh', statValue: 'Live' },
                    { id: '02', variant: 'relay', meta: 'Charts', title: 'Visual at a glance', description: 'Clean charts and trend lines turn raw rows into decisions your team can act on in seconds.', statLabel: 'Chart types', statValue: 'Tailored' },
                    { id: '03', variant: 'wave', meta: 'Control', title: 'Filter & drill down', description: 'Slice by date, team, region, or product and dive from the big picture straight to the underlying records.', statLabel: 'Drill-down', statValue: 'Any level' },
                    { id: '04', variant: 'spark', meta: 'Alerts', title: 'Know before it’s a problem', description: 'Threshold alerts flag anomalies — low stock, spiking errors, dropping conversion — before they cost you.', statLabel: 'Smart alerts', statValue: 'Built-in' },
                    { id: '05', variant: 'loop', meta: 'Roles', title: 'The right view per role', description: 'Finance, ops, and leadership each get a tailored view with permissions that match their responsibility.', statLabel: 'Role views', statValue: 'Per team' },
                ],
                metrics: [
                    { label: 'Reporting time', value: '−85%' },
                    { label: 'Data freshness', value: 'Live' },
                    { label: 'Tailored views', value: 'Per role' },
                ],
            },
            ar: {
                eyebrow: 'على لوحة التحكم',
                heading: 'كل رقم مهم على شاشة واحدة',
                subheading: 'توقّف عن تصدير الجداول وتجميع التقارير — صورتك التشغيلية تتحدّث تلقائياً.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'بيانات حيّة', title: 'مؤشرات آنية', description: 'الإيراد والمستخدمون والطلبات والمؤشرات التي تهمك تتحدّث تلقائياً — بلا تصدير يدوي.', statLabel: 'التحديث', statValue: 'مباشر' },
                    { id: '02', variant: 'relay', meta: 'الرسوم', title: 'مرئي بلمحة', description: 'رسوم نظيفة وخطوط اتجاه تحوّل الصفوف الخام إلى قرارات في ثوانٍ.', statLabel: 'أنواع الرسوم', statValue: 'مخصصة' },
                    { id: '03', variant: 'wave', meta: 'التحكم', title: 'تصفية وتعمّق', description: 'قسّم حسب التاريخ أو الفريق أو المنطقة وانتقل من الصورة الكبيرة إلى السجل التفصيلي.', statLabel: 'التعمّق', statValue: 'أي مستوى' },
                    { id: '04', variant: 'spark', meta: 'التنبيهات', title: 'اعرف قبل المشكلة', description: 'تنبيهات حدّية ترصد الشذوذ — مخزون منخفض، أخطاء مرتفعة — قبل أن تكلّفك.', statLabel: 'تنبيهات ذكية', statValue: 'مضمّنة' },
                    { id: '05', variant: 'loop', meta: 'الأدوار', title: 'العرض المناسب لكل دور', description: 'المالية والعمليات والإدارة لكلٍ عرضه المخصص بصلاحيات تناسب مسؤوليته.', statLabel: 'عروض الأدوار', statValue: 'لكل فريق' },
                ],
                metrics: [
                    { label: 'وقت التقارير', value: '−85%' },
                    { label: 'حداثة البيانات', value: 'مباشر' },
                    { label: 'عروض مخصصة', value: 'لكل دور' },
                ],
            },
        },
        process: {
            en: {
                eyebrow: 'How we build it',
                heading: 'From scattered data to one clear screen',
                subheading: 'A structured path that turns your sources into decisions you can act on.',
                ctaLabel: 'Build my dashboard',
                steps: [
                    { title: 'Define the KPIs', description: 'We agree the exact metrics, sources, and roles that matter — so the dashboard answers your real questions.', duration: 'Week 1' },
                    { title: 'Connect the data', description: 'We wire up your database, CRM, payments, or APIs into one reliable, live pipeline.', duration: 'Week 1–3' },
                    { title: 'Design & build', description: 'We build the charts, filters, drill-downs, and alerts, with a tailored view per role.', duration: 'Week 2–5' },
                    { title: 'Launch & own it', description: 'We deploy, hand over the code and accounts, and your team starts deciding from live numbers.', duration: 'Week 5–6' },
                ],
            },
            ar: {
                eyebrow: 'كيف نبنيها',
                heading: 'من بيانات مبعثرة إلى شاشة واحدة واضحة',
                subheading: 'مسار منظّم يحوّل مصادرك إلى قرارات قابلة للتنفيذ.',
                ctaLabel: 'ابنِ لوحتي',
                steps: [
                    { title: 'تحديد المؤشرات', description: 'نتفق على المؤشرات والمصادر والأدوار المهمة — لتجيب اللوحة عن أسئلتك الحقيقية.', duration: 'الأسبوع 1' },
                    { title: 'ربط البيانات', description: 'نربط قاعدة بياناتك وCRM والمدفوعات أو واجهات API في خط أنابيب حيّ موثوق.', duration: 'الأسبوع 1–3' },
                    { title: 'التصميم والبناء', description: 'نبني الرسوم والمرشّحات والتعمّق والتنبيهات بعرض مخصص لكل دور.', duration: 'الأسبوع 2–5' },
                    { title: 'الإطلاق والملكية', description: 'ننشر ونسلّمك الكود والحسابات، ويبدأ فريقك القرار من أرقام حية.', duration: 'الأسبوع 5–6' },
                ],
            },
        },
    },

    // ─────────────────────────────────────────────────────────────
    // 4. Booking Platforms
    // ─────────────────────────────────────────────────────────────
    'booking-platforms': {
        hero: {
            en: {
                badge: 'Booking Platforms',
                titleLine1: 'Reservations',
                titleLine2: 'On Autopilot',
                subtitle:
                    'Online booking systems that fill your calendar, send automatic confirmations, and cut no-shows — without a single phone call.',
                primaryCta: { label: 'Build My Booking System', href: '#contact' },
                secondaryCta: { label: 'See Examples', href: '/projects' },
                card: {
                    windowTitle: 'book.yourcompany.io',
                    metrics: [
                        { label: 'Bookings Today', value: '23' },
                        { label: 'Revenue (Week)', value: '$8,400' },
                        { label: 'No-show Rate', value: '2%' },
                        { label: 'Reminders', value: 'Auto' },
                    ],
                    chartBars: [58, 72, 48, 84, 62, 88, 78],
                },
                techStack: ['React', 'FullCalendar', 'Stripe', 'Node.js', 'PostgreSQL', 'Twilio'],
            },
            ar: {
                badge: 'منصات الحجز',
                titleLine1: 'الحجوزات',
                titleLine2: 'على الطيار الآلي',
                subtitle:
                    'أنظمة حجز إلكترونية تملأ تقويمك وترسل التأكيدات تلقائياً وتقلل من حالات عدم الحضور — بلا مكالمات.',
                primaryCta: { label: 'ابنِ نظام حجزي', href: '#contact' },
                secondaryCta: { label: 'أمثلة', href: '/projects' },
                card: {
                    windowTitle: 'book.yourcompany.io',
                    metrics: [
                        { label: 'الحجوزات اليوم', value: '23' },
                        { label: 'الإيراد (الأسبوع)', value: '8,400$' },
                        { label: 'معدل الغياب', value: '2%' },
                        { label: 'التذكيرات', value: 'تلقائية' },
                    ],
                    chartBars: [58, 72, 48, 84, 62, 88, 78],
                },
                techStack: ['React', 'FullCalendar', 'Stripe', 'Node.js', 'PostgreSQL', 'Twilio'],
            },
        },
        features: {
            en: {
                eyebrow: 'How it books',
                heading: 'A booking flow that sells while you sleep',
                subheading: 'Customers reserve, pay, and get reminded automatically — your calendar fills without a single phone call.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'Availability', title: 'Real-time slots', description: 'Live availability updates the instant a slot is taken, so double-bookings are impossible by design.', statLabel: 'Conflicts', statValue: 'Zero' },
                    { id: '02', variant: 'relay', meta: 'Payments', title: 'Pay at booking', description: 'Take deposits or full payment up front with secure checkout — fewer no-shows, money in the bank earlier.', statLabel: 'Online pay', statValue: 'Built-in' },
                    { id: '03', variant: 'wave', meta: 'Reminders', title: 'Automatic reminders', description: 'WhatsApp, SMS, and email reminders go out on schedule, cutting no-shows without staff lifting a finger.', statLabel: 'No-show drop', statValue: 'Major' },
                    { id: '04', variant: 'spark', meta: 'Calendar', title: 'Synced with your team', description: 'Bookings sync to Google Calendar and per-staff schedules so everyone sees the same source of truth.', statLabel: 'Calendar sync', statValue: 'Two-way' },
                    { id: '05', variant: 'loop', meta: 'Control', title: 'Rules your way', description: 'Set buffers, lead times, capacity, and services per resource — the system enforces your policies automatically.', statLabel: 'Booking rules', statValue: 'Custom' },
                ],
                metrics: [
                    { label: 'No-show rate', value: '↓ Low' },
                    { label: 'Booking window', value: '24 / 7' },
                    { label: 'Manual calls', value: 'None' },
                ],
            },
            ar: {
                eyebrow: 'كيف يحجز',
                heading: 'مسار حجز يبيع بينما تنام',
                subheading: 'يحجز العملاء ويدفعون ويُذكَّرون تلقائياً — يمتلئ تقويمك دون مكالمة واحدة.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'التوفّر', title: 'مواعيد آنية', description: 'يتحدّث التوفّر لحظة حجز أي موعد، فالحجز المزدوج مستحيل بالتصميم.', statLabel: 'التعارضات', statValue: 'صفر' },
                    { id: '02', variant: 'relay', meta: 'الدفع', title: 'الدفع عند الحجز', description: 'استلم عربوناً أو كامل المبلغ مسبقاً عبر دفع آمن — غياب أقل ونقد أبكر.', statLabel: 'دفع إلكتروني', statValue: 'مضمّن' },
                    { id: '03', variant: 'wave', meta: 'التذكير', title: 'تذكيرات تلقائية', description: 'تذكيرات واتساب ورسائل وبريد في موعدها تقلّل الغياب دون أي جهد من الموظفين.', statLabel: 'انخفاض الغياب', statValue: 'كبير' },
                    { id: '04', variant: 'spark', meta: 'التقويم', title: 'متزامن مع فريقك', description: 'تتزامن الحجوزات مع تقويم Google وجداول الموظفين فيرى الجميع المصدر نفسه.', statLabel: 'مزامنة التقويم', statValue: 'ثنائية' },
                    { id: '05', variant: 'loop', meta: 'التحكم', title: 'قواعدك أنت', description: 'حدّد الفواصل ومدد الإشعار والسعة والخدمات لكل مورد، والنظام يطبّق سياساتك تلقائياً.', statLabel: 'قواعد الحجز', statValue: 'مخصصة' },
                ],
                metrics: [
                    { label: 'معدل الغياب', value: '↓ منخفض' },
                    { label: 'نافذة الحجز', value: '24 / 7' },
                    { label: 'مكالمات يدوية', value: 'لا شيء' },
                ],
            },
        },
        process: {
            en: {
                eyebrow: 'How we build it',
                heading: 'A booking system that fits your rules',
                subheading: 'From your services and availability to a live, paying booking flow.',
                ctaLabel: 'Build my booking system',
                steps: [
                    { title: 'Map your rules', description: 'We capture your services, durations, staff, capacity, buffers, and payment needs as exact booking rules.', duration: 'Week 1' },
                    { title: 'Design the flow', description: 'We design a fast, friction-free booking flow — bilingual and mobile-first — that you approve before build.', duration: 'Week 1–2' },
                    { title: 'Build & connect', description: 'We build availability, payments, reminders, and two-way calendar sync, tested against real scenarios.', duration: 'Week 2–6' },
                    { title: 'Launch & hand over', description: 'We embed it in your site, go live, and hand over the code and accounts in full.', duration: 'Week 6–8' },
                ],
            },
            ar: {
                eyebrow: 'كيف نبنيه',
                heading: 'نظام حجز يناسب قواعدك',
                subheading: 'من خدماتك وتوفّرك إلى مسار حجز حيّ يستلم المدفوعات.',
                ctaLabel: 'ابنِ نظام حجزي',
                steps: [
                    { title: 'رسم قواعدك', description: 'نلتقط خدماتك ومددها وموظفيك وسعتك والفواصل واحتياجات الدفع كقواعد حجز دقيقة.', duration: 'الأسبوع 1' },
                    { title: 'تصميم المسار', description: 'نصمّم مسار حجز سريعاً بلا احتكاك — بلغتين وجوال أولاً — تعتمده قبل البناء.', duration: 'الأسبوع 1–2' },
                    { title: 'البناء والربط', description: 'نبني التوفّر والمدفوعات والتذكيرات ومزامنة التقويم الثنائية، ونختبرها على سيناريوهات حقيقية.', duration: 'الأسبوع 2–6' },
                    { title: 'الإطلاق والتسليم', description: 'ندمجه في موقعك وننشر ونسلّمك الكود والحسابات كاملة.', duration: 'الأسبوع 6–8' },
                ],
            },
        },
    },

    // ─────────────────────────────────────────────────────────────
    // 5. Internal Business Tools
    // ─────────────────────────────────────────────────────────────
    'internal-business-tools': {
        hero: {
            en: {
                badge: 'Internal Tools',
                titleLine1: 'Workflows That',
                titleLine2: 'Actually Work',
                subtitle:
                    'Replace spreadsheets and repetitive manual tasks with tools your team uses every day — simple, fast, zero training needed.',
                primaryCta: { label: 'Build My Tool', href: '#contact' },
                secondaryCta: { label: 'See Our Work', href: '/projects' },
                card: {
                    windowTitle: 'tools.yourcompany.io',
                    metrics: [
                        { label: 'Processes Automated', value: '12' },
                        { label: 'Hours Saved / Mo', value: '40 h' },
                        { label: 'Team Adoption', value: '94%' },
                        { label: 'Error Reduction', value: '−87%' },
                    ],
                    chartBars: [28, 38, 50, 62, 70, 82, 92],
                },
                techStack: ['React', 'Next.js', 'Prisma', 'PostgreSQL', 'Webhooks', 'Vercel'],
            },
            ar: {
                badge: 'أدوات الأعمال الداخلية',
                titleLine1: 'سير عمل',
                titleLine2: 'يعمل فعلاً',
                subtitle:
                    'استبدل الجداول اليدوية والمهام المتكررة بأدوات يستخدمها فريقك يومياً — بسيطة وسريعة ولا تحتاج تدريباً.',
                primaryCta: { label: 'ابنِ أداتي', href: '#contact' },
                secondaryCta: { label: 'أعمالنا', href: '/projects' },
                card: {
                    windowTitle: 'tools.yourcompany.io',
                    metrics: [
                        { label: 'العمليات المؤتمتة', value: '12' },
                        { label: 'ساعات موفرة/شهر', value: '40 ساعة' },
                        { label: 'تبني الفريق', value: '94%' },
                        { label: 'تقليل الأخطاء', value: '−87%' },
                    ],
                    chartBars: [28, 38, 50, 62, 70, 82, 92],
                },
                techStack: ['React', 'Next.js', 'Prisma', 'PostgreSQL', 'Webhooks', 'Vercel'],
            },
        },
        features: {
            en: {
                eyebrow: 'What it replaces',
                heading: 'The end of “we do that in a spreadsheet”',
                subheading: 'Turn fragile sheets and manual hand-offs into one tool your team actually wants to use.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'Workflow', title: 'Built for one job', description: 'Each tool does exactly what your team needs — no bloat, no 40 unused features, no training marathon.', statLabel: 'Learning curve', statValue: 'Minutes' },
                    { id: '02', variant: 'relay', meta: 'Automation', title: 'Kill the busywork', description: 'Repetitive steps — calculations, status changes, notifications — run automatically so people do real work.', statLabel: 'Manual steps', statValue: 'Removed' },
                    { id: '03', variant: 'wave', meta: 'Data', title: 'One source of truth', description: 'Everyone reads and writes the same live data — no more five conflicting copies of the same sheet.', statLabel: 'Version chaos', statValue: 'Gone' },
                    { id: '04', variant: 'spark', meta: 'Accuracy', title: 'Fewer human errors', description: 'Validation, required fields, and guardrails stop the typos and broken formulas that spreadsheets invite.', statLabel: 'Error rate', statValue: '↓ Sharp' },
                    { id: '05', variant: 'loop', meta: 'Scale', title: 'Grows with you', description: 'Add fields, roles, and steps as the process evolves — the tool keeps up instead of breaking.', statLabel: 'Extensible', statValue: 'Always' },
                ],
                metrics: [
                    { label: 'Hours saved / mo', value: '40+' },
                    { label: 'Fewer errors', value: 'Sharp ↓' },
                    { label: 'Team adoption', value: 'High' },
                ],
            },
            ar: {
                eyebrow: 'ما الذي يستبدله',
                heading: 'نهاية «نفعل ذلك في جدول إكسل»',
                subheading: 'حوّل الجداول الهشّة والتسليمات اليدوية إلى أداة واحدة يرغب فريقك في استخدامها.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'سير العمل', title: 'مبنية لمهمة واحدة', description: 'تفعل كل أداة ما يحتاجه فريقك بالضبط — بلا تضخّم ولا ميزات معطّلة ولا تدريب طويل.', statLabel: 'منحنى التعلّم', statValue: 'دقائق' },
                    { id: '02', variant: 'relay', meta: 'الأتمتة', title: 'أنهِ العمل الممل', description: 'الخطوات المتكررة — الحسابات وتغيّر الحالة والإشعارات — تعمل تلقائياً ليؤدي الناس عملاً حقيقياً.', statLabel: 'خطوات يدوية', statValue: 'محذوفة' },
                    { id: '03', variant: 'wave', meta: 'البيانات', title: 'مصدر واحد للحقيقة', description: 'يقرأ الجميع ويكتب على البيانات الحيّة نفسها — لا خمس نسخ متضاربة من الجدول ذاته.', statLabel: 'فوضى النسخ', statValue: 'انتهت' },
                    { id: '04', variant: 'spark', meta: 'الدقة', title: 'أخطاء بشرية أقل', description: 'التحقق والحقول الإلزامية تمنع الأخطاء والصيغ المكسورة التي تجلبها الجداول.', statLabel: 'معدل الخطأ', statValue: '↓ حاد' },
                    { id: '05', variant: 'loop', meta: 'التوسّع', title: 'تنمو معك', description: 'أضف حقولاً وأدواراً وخطوات مع تطوّر العملية — تواكب الأداة بدل أن تنكسر.', statLabel: 'قابلة للتوسّع', statValue: 'دائماً' },
                ],
                metrics: [
                    { label: 'ساعات موفّرة/شهر', value: '40+' },
                    { label: 'أخطاء أقل', value: '↓ حاد' },
                    { label: 'تبنّي الفريق', value: 'عالٍ' },
                ],
            },
        },
        process: {
            en: {
                eyebrow: 'How we build it',
                heading: 'From messy spreadsheet to a tool you trust',
                subheading: 'A focused path that automates the busywork without disrupting your team.',
                ctaLabel: 'Build my tool',
                steps: [
                    { title: 'Map the workflow', description: 'We shadow how the work happens today — sheets, steps, hand-offs — and pinpoint what to automate.', duration: 'Week 1' },
                    { title: 'Design the tool', description: 'We design the simplest interface that does the job, with the validation and roles your process needs.', duration: 'Week 1–2' },
                    { title: 'Build & migrate', description: 'We build it and move your existing data in, so you start from where you are — not a blank slate.', duration: 'Week 2–5' },
                    { title: 'Roll out & support', description: 'We launch, hand over the code, and support a smooth switch so the team actually adopts it.', duration: 'Week 5–6' },
                ],
            },
            ar: {
                eyebrow: 'كيف نبنيها',
                heading: 'من جدول فوضوي إلى أداة تثق بها',
                subheading: 'مسار مركّز يؤتمت العمل الممل دون تعطيل فريقك.',
                ctaLabel: 'ابنِ أداتي',
                steps: [
                    { title: 'رسم سير العمل', description: 'نراقب كيف يجري العمل اليوم — جداول وخطوات وتسليمات — ونحدّد ما يجب أتمتته.', duration: 'الأسبوع 1' },
                    { title: 'تصميم الأداة', description: 'نصمّم أبسط واجهة تنجز المهمة، بالتحقّق والأدوار التي تحتاجها عمليتك.', duration: 'الأسبوع 1–2' },
                    { title: 'البناء والترحيل', description: 'نبنيها وننقل بياناتك الحالية إليها، فتبدأ من حيث أنت لا من صفحة فارغة.', duration: 'الأسبوع 2–5' },
                    { title: 'الإطلاق والدعم', description: 'ننشر ونسلّمك الكود وندعم انتقالاً سلساً ليتبنّاها الفريق فعلاً.', duration: 'الأسبوع 5–6' },
                ],
            },
        },
    },

    // ─────────────────────────────────────────────────────────────
    // 6. SaaS MVP Development
    // ─────────────────────────────────────────────────────────────
    'saas-mvp-development': {
        hero: {
            en: {
                badge: 'SaaS MVP',
                titleLine1: 'From Idea',
                titleLine2: 'To First Paying Users',
                subtitle:
                    'Launch your SaaS product in weeks, not months — built for growth, designed for conversion, structured for investment.',
                primaryCta: { label: 'Launch My MVP', href: '#contact' },
                secondaryCta: { label: 'See Our Work', href: '/projects' },
                card: {
                    windowTitle: 'app.yourproduct.io',
                    metrics: [
                        { label: 'Launch Timeline', value: '8 wks' },
                        { label: 'Auth + Billing', value: 'Included' },
                        { label: 'Active Trials', value: 'Live' },
                        { label: 'Churn Rate', value: '< 5%' },
                    ],
                    chartBars: [18, 28, 40, 54, 64, 78, 94],
                },
                techStack: ['React', 'Next.js', 'Stripe', 'Supabase', 'TypeScript', 'Vercel'],
            },
            ar: {
                badge: 'SaaS MVP',
                titleLine1: 'من فكرة',
                titleLine2: 'إلى أول عميل يدفع',
                subtitle:
                    'أطلق منتجك SaaS في أسابيع لا أشهر — مبني للنمو، مصمم للتحويل، ومهيأ للاستثمار.',
                primaryCta: { label: 'أطلق MVP الخاص بي', href: '#contact' },
                secondaryCta: { label: 'أعمالنا', href: '/projects' },
                card: {
                    windowTitle: 'app.yourproduct.io',
                    metrics: [
                        { label: 'وقت الإطلاق', value: '8 أسابيع' },
                        { label: 'المصادقة والفوترة', value: 'مضمّنة' },
                        { label: 'التجارب النشطة', value: 'مباشر' },
                        { label: 'معدل التسرب', value: '< 5%' },
                    ],
                    chartBars: [18, 28, 40, 54, 64, 78, 94],
                },
                techStack: ['React', 'Next.js', 'Stripe', 'Supabase', 'TypeScript', 'Vercel'],
            },
        },
        features: {
            en: {
                eyebrow: 'Launch-ready from day one',
                heading: 'Everything a real SaaS needs, built in',
                subheading: 'Not a throwaway prototype — a production foundation you can charge for, raise on, and scale.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'Auth', title: 'Accounts & teams', description: 'Sign-up, login, password reset, and multi-user teams ship on day one — the plumbing every SaaS reinvents, done.', statLabel: 'User system', statValue: 'Included' },
                    { id: '02', variant: 'relay', meta: 'Billing', title: 'Subscriptions that work', description: 'Stripe plans, trials, upgrades, and invoices are wired in so you can take recurring revenue from launch.', statLabel: 'Billing', statValue: 'Stripe-ready' },
                    { id: '03', variant: 'wave', meta: 'Speed', title: 'Weeks, not quarters', description: 'A focused, opinionated build gets your core loop in front of real users fast — momentum beats perfection.', statLabel: 'To first users', statValue: '~8 wks' },
                    { id: '04', variant: 'spark', meta: 'Conversion', title: 'Designed to convert', description: 'Landing page, onboarding, and pricing are built for sign-ups — not just a logged-in app behind a wall.', statLabel: 'Funnel', statValue: 'End-to-end' },
                    { id: '05', variant: 'loop', meta: 'Scale', title: 'Ready to grow', description: 'Clean architecture and analytics hooks mean your v2 features build on the MVP instead of replacing it.', statLabel: 'Foundation', statValue: 'Production' },
                ],
                metrics: [
                    { label: 'To first users', value: '~8 wks' },
                    { label: 'Auth + billing', value: 'Included' },
                    { label: 'Investor-ready', value: 'Yes' },
                ],
            },
            ar: {
                eyebrow: 'جاهز للإطلاق من اليوم الأول',
                heading: 'كل ما يحتاجه SaaS حقيقي، مدمج',
                subheading: 'ليس نموذجاً يُرمى — أساس إنتاجي تستطيع أن تتقاضى عليه وتجمع عليه استثماراً وتوسّعه.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'الحسابات', title: 'حسابات وفِرق', description: 'تسجيل ودخول واستعادة كلمة مرور وفِرق متعددة المستخدمين من اليوم الأول — البنية التي يعيد كل SaaS اختراعها، جاهزة.', statLabel: 'نظام المستخدمين', statValue: 'مضمّن' },
                    { id: '02', variant: 'relay', meta: 'الفوترة', title: 'اشتراكات تعمل', description: 'خطط Stripe والتجارب والترقيات والفواتير مدمجة لتستلم إيراداً متكرراً من الإطلاق.', statLabel: 'الفوترة', statValue: 'جاهزة' },
                    { id: '03', variant: 'wave', meta: 'السرعة', title: 'أسابيع لا أرباع', description: 'بناء مركّز يضع حلقتك الأساسية أمام مستخدمين حقيقيين بسرعة — الزخم يتفوّق على الكمال.', statLabel: 'لأول مستخدم', statValue: '~8 أسابيع' },
                    { id: '04', variant: 'spark', meta: 'التحويل', title: 'مصمّم للتحويل', description: 'صفحة الهبوط والتهيئة والتسعير مبنية للتسجيل — لا مجرد تطبيق خلف جدار.', statLabel: 'القمع', statValue: 'متكامل' },
                    { id: '05', variant: 'loop', meta: 'التوسّع', title: 'جاهز للنمو', description: 'بنية نظيفة وتحليلات تعني أن ميزات الإصدار الثاني تُبنى على الـ MVP لا تستبدله.', statLabel: 'الأساس', statValue: 'إنتاجي' },
                ],
                metrics: [
                    { label: 'لأول مستخدم', value: '~8 أسابيع' },
                    { label: 'حسابات وفوترة', value: 'مضمّنة' },
                    { label: 'جاهز للمستثمر', value: 'نعم' },
                ],
            },
        },
        process: {
            en: {
                eyebrow: 'How we build it',
                heading: 'From idea to first paying users in ~8 weeks',
                subheading: 'A lean, validation-first path that gets a real product in front of real users fast.',
                ctaLabel: 'Launch my MVP',
                steps: [
                    { title: 'Scope the core loop', description: 'We strip the idea to the one loop that proves value, so we build what matters and skip what doesn’t.', duration: 'Week 1' },
                    { title: 'Design the product', description: 'We design onboarding, the core flow, and pricing for conversion — not just a logged-in screen.', duration: 'Week 1–2' },
                    { title: 'Build with auth & billing', description: 'We build the product with accounts and Stripe subscriptions wired in, ready to charge from day one.', duration: 'Week 2–7' },
                    { title: 'Launch & measure', description: 'We ship to real users with analytics in place, hand over the code, and set you up to iterate.', duration: 'Week 7–8' },
                ],
            },
            ar: {
                eyebrow: 'كيف نبنيه',
                heading: 'من الفكرة لأول عميل يدفع خلال ~8 أسابيع',
                subheading: 'مسار رشيق يبدأ بالتحقّق ويضع منتجاً حقيقياً أمام مستخدمين حقيقيين بسرعة.',
                ctaLabel: 'أطلق MVP الخاص بي',
                steps: [
                    { title: 'تحديد الحلقة الأساسية', description: 'نجرّد الفكرة إلى الحلقة الواحدة التي تثبت القيمة، فنبني ما يهم ونتخطّى ما لا يهم.', duration: 'الأسبوع 1' },
                    { title: 'تصميم المنتج', description: 'نصمّم التهيئة والمسار الأساسي والتسعير للتحويل — لا مجرد شاشة بعد الدخول.', duration: 'الأسبوع 1–2' },
                    { title: 'البناء بالحسابات والفوترة', description: 'نبني المنتج بحسابات واشتراكات Stripe جاهزة للتقاضي من اليوم الأول.', duration: 'الأسبوع 2–7' },
                    { title: 'الإطلاق والقياس', description: 'نطلق لمستخدمين حقيقيين بتحليلات جاهزة، ونسلّمك الكود ونهيّئك للتطوير.', duration: 'الأسبوع 7–8' },
                ],
            },
        },
    },

    // ─────────────────────────────────────────────────────────────
    // 7. Progressive Web App Development
    // ─────────────────────────────────────────────────────────────
    'progressive-web-app-development': {
        hero: {
            en: {
                badge: 'Progressive Web Apps',
                titleLine1: 'The Web,',
                titleLine2: 'App-Grade Performance',
                subtitle:
                    'Fast, installable web experiences that load instantly and work offline — built once, running everywhere your users find you.',
                primaryCta: { label: 'Build My PWA', href: '#contact' },
                secondaryCta: { label: 'See Our Work', href: '/projects' },
                card: {
                    windowTitle: 'pwa.yourcompany.io',
                    metrics: [
                        { label: 'Load Time', value: '0.8 s' },
                        { label: 'Lighthouse Score', value: '98 / 100' },
                        { label: 'Offline Mode', value: '✓ Yes' },
                        { label: 'Install Rate', value: '34%' },
                    ],
                    chartBars: [68, 72, 78, 76, 84, 90, 98],
                },
                techStack: ['Next.js', 'Workbox', 'TypeScript', 'IndexedDB', 'Web Push', 'Vercel'],
            },
            ar: {
                badge: 'تطبيقات الويب التقدمية',
                titleLine1: 'الويب،',
                titleLine2: 'بأداء مستوى التطبيق',
                subtitle:
                    'تجارب ويب سريعة وقابلة للتثبيت تحمّل فوراً وتعمل بدون إنترنت — مبنية مرة واحدة، تعمل في كل مكان.',
                primaryCta: { label: 'ابنِ تطبيقي التقدمي', href: '#contact' },
                secondaryCta: { label: 'أعمالنا', href: '/projects' },
                card: {
                    windowTitle: 'pwa.yourcompany.io',
                    metrics: [
                        { label: 'وقت التحميل', value: '0.8 ثانية' },
                        { label: 'درجة Lighthouse', value: '98 / 100' },
                        { label: 'وضع بدون إنترنت', value: '✓ نعم' },
                        { label: 'معدل التثبيت', value: '34%' },
                    ],
                    chartBars: [68, 72, 78, 76, 84, 90, 98],
                },
                techStack: ['Next.js', 'Workbox', 'TypeScript', 'IndexedDB', 'Web Push', 'Vercel'],
            },
        },
        features: {
            en: {
                eyebrow: 'Why a PWA',
                heading: 'App-store quality, without the app store',
                subheading: 'One build that installs to the home screen, loads instantly, and works offline — reachable from any link.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'Speed', title: 'Instant loads', description: 'Smart caching serves the shell immediately, so the app feels native-fast even on shaky mobile connections.', statLabel: 'Load time', statValue: '< 1s' },
                    { id: '02', variant: 'relay', meta: 'Install', title: 'Add to home screen', description: 'Users install straight from the browser — your icon on their phone, no app-store review or 100MB download.', statLabel: 'Install', statValue: 'One tap' },
                    { id: '03', variant: 'wave', meta: 'Offline', title: 'Works without signal', description: 'Service workers keep key screens and data available offline, then sync the moment connection returns.', statLabel: 'Offline mode', statValue: 'Yes' },
                    { id: '04', variant: 'spark', meta: 'Engagement', title: 'Push notifications', description: 'Re-engage users with web push — the retention lever of native apps, without the native overhead.', statLabel: 'Push', statValue: 'Built-in' },
                    { id: '05', variant: 'loop', meta: 'Reach', title: 'One build, everywhere', description: 'iOS, Android, and desktop run the same codebase — no separate apps, no duplicated cost.', statLabel: 'Codebases', statValue: 'Just one' },
                ],
                metrics: [
                    { label: 'Lighthouse', value: '95+' },
                    { label: 'Offline ready', value: 'Yes' },
                    { label: 'Install size', value: 'Tiny' },
                ],
            },
            ar: {
                eyebrow: 'لماذا PWA',
                heading: 'جودة متجر التطبيقات، دون المتجر',
                subheading: 'بناء واحد يُثبّت على الشاشة الرئيسية ويحمّل فوراً ويعمل بلا إنترنت — يُفتح من أي رابط.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'السرعة', title: 'تحميل فوري', description: 'تخزين ذكي يقدّم الواجهة فوراً فيبدو التطبيق بسرعة أصلية حتى على اتصال ضعيف.', statLabel: 'زمن التحميل', statValue: '< 1 ثانية' },
                    { id: '02', variant: 'relay', meta: 'التثبيت', title: 'إضافة للشاشة', description: 'يُثبّت المستخدمون مباشرة من المتصفح — أيقونتك على هاتفهم بلا مراجعة متجر ولا تنزيل ثقيل.', statLabel: 'التثبيت', statValue: 'بنقرة' },
                    { id: '03', variant: 'wave', meta: 'بلا اتصال', title: 'يعمل دون شبكة', description: 'تُبقي عمّال الخدمة الشاشات والبيانات المهمة متاحة دون إنترنت ثم تتزامن فور عودة الاتصال.', statLabel: 'وضع بلا اتصال', statValue: 'نعم' },
                    { id: '04', variant: 'spark', meta: 'التفاعل', title: 'إشعارات الدفع', description: 'أعد إشراك المستخدمين عبر الدفع عبر الويب — رافعة بقاء التطبيقات الأصلية بلا أعبائها.', statLabel: 'الدفع', statValue: 'مضمّن' },
                    { id: '05', variant: 'loop', meta: 'الوصول', title: 'بناء واحد للجميع', description: 'iOS وAndroid وسطح المكتب على الكود نفسه — بلا تطبيقات منفصلة ولا تكلفة مكرّرة.', statLabel: 'قواعد الكود', statValue: 'واحدة' },
                ],
                metrics: [
                    { label: 'Lighthouse', value: '95+' },
                    { label: 'جاهز دون اتصال', value: 'نعم' },
                    { label: 'حجم التثبيت', value: 'صغير' },
                ],
            },
        },
        process: {
            en: {
                eyebrow: 'How we build it',
                heading: 'One build that installs everywhere',
                subheading: 'A clear path to a fast, offline-ready app reachable from any link.',
                ctaLabel: 'Build my PWA',
                steps: [
                    { title: 'Plan & scope', description: 'We define the screens, offline behavior, and install experience your users need, then fix the scope.', duration: 'Week 1' },
                    { title: 'Design app-grade UX', description: 'We design a native-feeling, mobile-first interface — installable and instant — that you sign off.', duration: 'Week 1–2' },
                    { title: 'Build & optimize', description: 'We build with caching, offline support, and push, tuning for top Lighthouse and sub-second loads.', duration: 'Week 2–6' },
                    { title: 'Launch & hand over', description: 'We ship it live, optionally package it for the stores, and hand over the full code and accounts.', duration: 'Week 6–7' },
                ],
            },
            ar: {
                eyebrow: 'كيف نبنيه',
                heading: 'بناء واحد يُثبّت في كل مكان',
                subheading: 'مسار واضح لتطبيق سريع جاهز دون اتصال يُفتح من أي رابط.',
                ctaLabel: 'ابنِ تطبيقي التقدمي',
                steps: [
                    { title: 'التخطيط والنطاق', description: 'نحدّد الشاشات وسلوك عدم الاتصال وتجربة التثبيت التي يحتاجها مستخدموك، ثم نثبّت النطاق.', duration: 'الأسبوع 1' },
                    { title: 'تصميم بمستوى التطبيق', description: 'نصمّم واجهة بإحساس أصلي وجوال أولاً — قابلة للتثبيت وفورية — تعتمدها.', duration: 'الأسبوع 1–2' },
                    { title: 'البناء والتحسين', description: 'نبني بتخزين ودعم عدم اتصال ودفع، ونضبط لأعلى Lighthouse وتحميل دون ثانية.', duration: 'الأسبوع 2–6' },
                    { title: 'الإطلاق والتسليم', description: 'نطلقه حياً، ونغلّفه للمتاجر اختيارياً، ونسلّمك الكود والحسابات كاملة.', duration: 'الأسبوع 6–7' },
                ],
            },
        },
    },

    // ─────────────────────────────────────────────────────────────
    // 8. Mobile App Development (listed under interactive-web-apps)
    // ─────────────────────────────────────────────────────────────
    'mobile-app-development': {
        hero: {
            en: {
                badge: 'Mobile App Development',
                titleLine1: 'iOS & Android,',
                titleLine2: 'Done Right',
                subtitle:
                    'Cross-platform mobile apps your users will love using — fast, polished, and live in both app stores within weeks.',
                primaryCta: { label: 'Start My App', href: '#contact' },
                secondaryCta: { label: 'See Our Work', href: '/projects' },
                card: {
                    windowTitle: 'yourapp — App Store',
                    metrics: [
                        { label: 'Platforms', value: 'iOS + Android' },
                        { label: 'Target Rating', value: '4.8 ★' },
                        { label: 'Launch Timeline', value: '10–14 wks' },
                        { label: 'Shared Codebase', value: '~90%' },
                    ],
                    chartBars: [44, 54, 58, 68, 74, 84, 90],
                },
                techStack: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Supabase', 'App Store'],
            },
            ar: {
                badge: 'تطوير تطبيقات الجوال',
                titleLine1: 'iOS وAndroid،',
                titleLine2: 'بالطريقة الصحيحة',
                subtitle:
                    'تطبيقات جوال متعددة المنصات يستمتع مستخدموك باستخدامها — سريعة ومصقولة ومنشورة على المتجرين.',
                primaryCta: { label: 'ابدأ تطبيقي', href: '#contact' },
                secondaryCta: { label: 'أعمالنا', href: '/projects' },
                card: {
                    windowTitle: 'yourapp — App Store',
                    metrics: [
                        { label: 'المنصات', value: 'iOS + Android' },
                        { label: 'التقييم المستهدف', value: '4.8 ★' },
                        { label: 'وقت الإطلاق', value: '10–14 أسبوع' },
                        { label: 'قاعدة الكود المشتركة', value: '~90%' },
                    ],
                    chartBars: [44, 54, 58, 68, 74, 84, 90],
                },
                techStack: ['React Native', 'Expo', 'TypeScript', 'Firebase', 'Supabase', 'App Store'],
            },
        },
        features: {
            en: {
                eyebrow: 'How we build it',
                heading: 'Both app stores, from one polished codebase',
                subheading: 'A single React Native build ships to iOS and Android — native feel, half the cost, one team.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'Cross-platform', title: 'iOS + Android together', description: 'One shared codebase powers both platforms, so you launch everywhere without paying to build the app twice.', statLabel: 'Shared code', statValue: '~90%' },
                    { id: '02', variant: 'relay', meta: 'Native feel', title: 'Smooth & responsive', description: 'Real native components, gestures, and animations — users can’t tell it isn’t a fully native app, because it feels like one.', statLabel: 'Performance', statValue: 'Native' },
                    { id: '03', variant: 'wave', meta: 'Backend', title: 'Connected & live', description: 'Auth, push notifications, real-time data, and your APIs are wired in so the app does real work, not just demos.', statLabel: 'Backend', statValue: 'Integrated' },
                    { id: '04', variant: 'spark', meta: 'Launch', title: 'Store-ready submission', description: 'We handle the App Store and Google Play setup, assets, and review process so your launch actually goes live.', statLabel: 'Store launch', statValue: 'Handled' },
                    { id: '05', variant: 'loop', meta: 'Updates', title: 'Easy to evolve', description: 'Push updates and new features without a painful rebuild — the app keeps improving after launch day.', statLabel: 'Updates', statValue: 'Fast' },
                ],
                metrics: [
                    { label: 'Shared codebase', value: '~90%' },
                    { label: 'Both platforms', value: 'iOS+Android' },
                    { label: 'To launch', value: '10–14 wks' },
                ],
            },
            ar: {
                eyebrow: 'كيف نبنيه',
                heading: 'كلا المتجرين من كود واحد مصقول',
                subheading: 'بناء React Native واحد يُطلق على iOS وAndroid — إحساس أصلي، نصف التكلفة، فريق واحد.',
                cards: [
                    { id: '01', variant: 'orbit', meta: 'متعدد المنصات', title: 'iOS وAndroid معاً', description: 'كود مشترك واحد يشغّل المنصتين، فتطلق في كل مكان دون دفع تكلفة بناء التطبيق مرتين.', statLabel: 'كود مشترك', statValue: '~90%' },
                    { id: '02', variant: 'relay', meta: 'إحساس أصلي', title: 'سلس وسريع الاستجابة', description: 'مكوّنات وإيماءات وحركات أصلية حقيقية — لا يميّز المستخدم أنه ليس تطبيقاً أصلياً لأنه يشعر كذلك.', statLabel: 'الأداء', statValue: 'أصلي' },
                    { id: '03', variant: 'wave', meta: 'الخلفية', title: 'متصل وحيّ', description: 'مصادقة وإشعارات دفع وبيانات آنية وواجهاتك مدمجة ليؤدي التطبيق عملاً حقيقياً.', statLabel: 'الخلفية', statValue: 'مدمجة' },
                    { id: '04', variant: 'spark', meta: 'الإطلاق', title: 'جاهز للمتجر', description: 'نتولّى إعداد App Store وGoogle Play والأصول وعملية المراجعة ليُطلق تطبيقك فعلاً.', statLabel: 'إطلاق المتجر', statValue: 'متكفّل به' },
                    { id: '05', variant: 'loop', meta: 'التحديثات', title: 'سهل التطوير', description: 'ادفع تحديثات وميزات جديدة دون إعادة بناء مؤلمة — يستمر التطبيق في التحسّن بعد الإطلاق.', statLabel: 'التحديثات', statValue: 'سريعة' },
                ],
                metrics: [
                    { label: 'كود مشترك', value: '~90%' },
                    { label: 'كلا المنصتين', value: 'iOS+Android' },
                    { label: 'للإطلاق', value: '10–14 أسبوع' },
                ],
            },
        },
        process: {
            en: {
                eyebrow: 'How we build it',
                heading: 'From idea to both app stores',
                subheading: 'A clear path to a polished iOS and Android app from one codebase.',
                ctaLabel: 'Start my app',
                steps: [
                    { title: 'Discovery & scope', description: 'We define the features, screens, and backend your app needs, then agree a fixed scope and plan.', duration: 'Week 1–2' },
                    { title: 'Design the experience', description: 'We design a native-feeling, mobile-first interface for both platforms that you approve before build.', duration: 'Week 2–4' },
                    { title: 'Build & test', description: 'We build the cross-platform app and backend, with test builds you run on your own phone each sprint.', duration: 'Week 4–12' },
                    { title: 'Store launch & handover', description: 'We prepare the listings, manage App Store and Google Play review, launch, and hand over the code.', duration: 'Week 12–14' },
                ],
            },
            ar: {
                eyebrow: 'كيف نبنيه',
                heading: 'من الفكرة إلى كلا المتجرين',
                subheading: 'مسار واضح لتطبيق iOS وAndroid مصقول من كود واحد.',
                ctaLabel: 'ابدأ تطبيقي',
                steps: [
                    { title: 'الاكتشاف والنطاق', description: 'نحدّد الميزات والشاشات والخلفية التي يحتاجها تطبيقك، ثم نتفق على نطاق وخطة ثابتين.', duration: 'الأسبوع 1–2' },
                    { title: 'تصميم التجربة', description: 'نصمّم واجهة بإحساس أصلي وجوال أولاً للمنصتين تعتمدها قبل البناء.', duration: 'الأسبوع 2–4' },
                    { title: 'البناء والاختبار', description: 'نبني التطبيق متعدد المنصات والخلفية، بنسخ تجريبية تشغّلها على هاتفك كل جولة.', duration: 'الأسبوع 4–12' },
                    { title: 'إطلاق المتجر والتسليم', description: 'نجهّز القوائم وندير مراجعة App Store وGoogle Play ونطلق ونسلّمك الكود.', duration: 'الأسبوع 12–14' },
                ],
            },
        },
    },
}

export function getWebappServiceContent(slug: string): WebAppServiceContent | null {
    return webappServiceContent[slug] ?? null
}

export function asWebAppLocale(locale: string): WebAppLocale {
    return locale === 'ar' ? 'ar' : 'en'
}
