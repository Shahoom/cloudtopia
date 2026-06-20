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
