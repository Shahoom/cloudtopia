import type { SubServiceContent } from '@/components/services/SubServicePage'
import type { LocalizedText } from '@/lib/seo/industries'
import { generatedSubServices } from './business-systems-subservices'
import { generatedSubServicesAr } from './business-systems-subservices-ar'
import { subServiceContentArDeep } from './business-systems-subservices-ar-deep'
import { subServiceHref } from './sub-service-routing'

/**
 * Tailored rich content for Business Systems — PILOT.
 *  - richPillarData: full "main page" content per pillar (renders via the
 *    /business-systems-development design through RichPillarPage).
 *  - businessSystemsSubServices: tailored ServiceDetail per sub-service (renders
 *    via the existing rich /services/[slug] detail template).
 *
 * Pilot scope: Custom ERP & CRM pillar + Odoo ERP Implementation sub-service.
 * Once approved, the same shape is filled for the remaining pillars / sub-services.
 */

const BS_IMG = '/images/services/business-systems-development'
const ICON = '/icons/services'

// ─────────────────────────────────────────────────────────────────────────
// Pillar "main page" data (uses the /business-systems-development design)
// ─────────────────────────────────────────────────────────────────────────

// Resolved (single-locale, plain-string) shape consumed by RichPillarPage.
export type RichPillarCard = {
    name: string
    tagline: string
    description: string
    icon: string
    features: string[]
}

export type RichPillarData = {
    slug: string
    hero: { title: string; description: string }
    products: { title: string; thumbnail: string }[]
    solutionsTitle: string
    solutionsSubtitle: string
    cards: RichPillarCard[]
    overview: {
        badge: string
        title: string
        description: string
        metrics: { label: string; value: string }[]
        expertiseTitle: string
        expertiseDescription: string
        expertiseItems: string[]
        processTitle: string
        processSteps: { name: string; detail: string; status: string }[]
        showcase: { src: string; alt: string; caption: string; captionRight: string }
    }
    cta: { title: string; description: string; button: string; explore: string }
}

// ─────────────────────────────────────────────────────────────────────────
// Bilingual SOURCE shape. Same structure as RichPillarData, but every
// user-visible text field is LocalizedText ({ en, ar }). Image/path fields
// (products[].thumbnail, cards[].icon, overview.showcase.src) stay plain string.
// resolveRichPillar() collapses this to RichPillarData for a given locale.
// ─────────────────────────────────────────────────────────────────────────

export type RichPillarCardI18n = {
    name: LocalizedText
    tagline: LocalizedText
    description: LocalizedText
    icon: string
    features: LocalizedText[]
}

export type RichPillarDataI18n = {
    slug: string
    hero: { title: LocalizedText; description: LocalizedText }
    products: { title: LocalizedText; thumbnail: string }[]
    solutionsTitle: LocalizedText
    solutionsSubtitle: LocalizedText
    cards: RichPillarCardI18n[]
    overview: {
        badge: LocalizedText
        title: LocalizedText
        description: LocalizedText
        metrics: { label: LocalizedText; value: LocalizedText }[]
        expertiseTitle: LocalizedText
        expertiseDescription: LocalizedText
        expertiseItems: LocalizedText[]
        processTitle: LocalizedText
        processSteps: { name: LocalizedText; detail: LocalizedText; status: LocalizedText }[]
        showcase: { src: string; alt: LocalizedText; caption: LocalizedText; captionRight: LocalizedText }
    }
    cta: { title: LocalizedText; description: LocalizedText; button: LocalizedText; explore: LocalizedText }
}

/** Pick the right locale string, falling back to English. */
function pick(v: LocalizedText, locale: string): string {
    return (locale === 'ar' ? v.ar || v.en : v.en) ?? ''
}

/**
 * Explicit (field-by-field) mapper from the bilingual source to the plain
 * RichPillarData the page renders. Not a deep walker — every text field is
 * resolved by hand; image/path fields pass through untouched.
 */
export function resolveRichPillar(src: RichPillarDataI18n, locale: string): RichPillarData {
    return {
        slug: src.slug,
        hero: {
            title: pick(src.hero.title, locale),
            description: pick(src.hero.description, locale),
        },
        products: src.products.map((p) => ({ title: pick(p.title, locale), thumbnail: p.thumbnail })),
        solutionsTitle: pick(src.solutionsTitle, locale),
        solutionsSubtitle: pick(src.solutionsSubtitle, locale),
        cards: src.cards.map((c) => ({
            name: pick(c.name, locale),
            tagline: pick(c.tagline, locale),
            description: pick(c.description, locale),
            icon: c.icon,
            features: c.features.map((f) => pick(f, locale)),
        })),
        overview: {
            badge: pick(src.overview.badge, locale),
            title: pick(src.overview.title, locale),
            description: pick(src.overview.description, locale),
            metrics: src.overview.metrics.map((m) => ({ label: pick(m.label, locale), value: pick(m.value, locale) })),
            expertiseTitle: pick(src.overview.expertiseTitle, locale),
            expertiseDescription: pick(src.overview.expertiseDescription, locale),
            expertiseItems: src.overview.expertiseItems.map((i) => pick(i, locale)),
            processTitle: pick(src.overview.processTitle, locale),
            processSteps: src.overview.processSteps.map((s) => ({
                name: pick(s.name, locale),
                detail: pick(s.detail, locale),
                status: pick(s.status, locale),
            })),
            showcase: {
                src: src.overview.showcase.src,
                alt: pick(src.overview.showcase.alt, locale),
                caption: pick(src.overview.showcase.caption, locale),
                captionRight: pick(src.overview.showcase.captionRight, locale),
            },
        },
        cta: {
            title: pick(src.cta.title, locale),
            description: pick(src.cta.description, locale),
            button: pick(src.cta.button, locale),
            explore: pick(src.cta.explore, locale),
        },
    }
}

// Small helper so the source entries stay compact and readable.
const L = (en: string, ar: string): LocalizedText => ({ en, ar })

const richPillarData: Record<string, RichPillarDataI18n> = {
    'ui-ux-design-branding': {
        slug: 'ui-ux-design-branding',
        hero: {
            title: L('UI/UX Design & Brand Identity', 'تصميم واجهات المستخدم والهوية البصرية'),
            description: L(
                'Brand strategy, visual identity, and interface design that make your product feel premium and trustworthy — from logo and design system to pixel-perfect, user-tested screens for web and mobile.',
                'استراتيجية العلامة والهوية البصرية وتصميم الواجهات التي تمنح منتجك إحساساً راقياً وجديراً بالثقة — من الشعار ونظام التصميم إلى شاشات دقيقة ومختبَرة مع المستخدمين للويب والجوال.',
            ),
        },
        products: [
            { title: L('Brand Identity Systems', 'أنظمة الهوية البصرية'), thumbnail: '/images/services/social-media-marketing/brand-identity.avif' },
            { title: L('Logo & Visual Identity', 'الشعار والهوية البصرية'), thumbnail: '/images/services/social-media-marketing/Visual Design.webp' },
            { title: L('Web UI Design', 'تصميم واجهات الويب'), thumbnail: '/images/services/website-design/1.avif' },
            { title: L('App Interface Design', 'تصميم واجهات التطبيقات'), thumbnail: '/images/services/website-design/2.avif' },
            { title: L('Design Systems', 'أنظمة التصميم'), thumbnail: '/images/services/website-design/3.avif' },
            { title: L('Motion & Animation', 'الموشن والأنيميشن'), thumbnail: '/images/services/social-media-marketing/Creative Campaigns.avif' },
            { title: L('Brand Storytelling', 'سرد قصة العلامة'), thumbnail: '/images/services/social-media-marketing/Brand Storytelling.webp' },
            { title: L('Social Media Kits', 'حزم السوشيال ميديا'), thumbnail: '/images/services/social-media-marketing/content production.avif' },
            { title: L('UX Research & Testing', 'أبحاث واختبار تجربة المستخدم'), thumbnail: '/images/services/website-design/4.avif' },
            { title: L('Interactive Prototyping', 'النماذج التفاعلية'), thumbnail: '/images/services/website-design/5.avif' },
        ],
        solutionsTitle: L('What this pillar delivers', 'ما تقدّمه هذه الخدمة'),
        solutionsSubtitle: L('Seven design capabilities that turn a product into a brand people remember and trust.', 'سبع قدرات تصميمية تحوّل المنتج إلى علامة يتذكّرها الناس ويثقون بها.'),
        cards: [
            {
                name: L('Brand Strategy & Positioning', 'استراتيجية العلامة والتموضع'),
                tagline: L('Know why you win', 'اعرف لماذا تفوز'),
                description: L('We define your positioning, personality, and messaging so every design decision has a reason — and your brand stands apart in a crowded Gulf market.', 'نحدّد تموضعك وشخصيتك ورسائلك ليصبح لكل قرار تصميمي سبب — وتتميّز علامتك في سوق خليجي مزدحم.'),
                icon: '/icons/services/Corporate Visual Identity Design.png',
                features: [L('Brand positioning', 'تموضع العلامة'), L('Messaging & tone', 'الرسائل والنبرة'), L('Competitor analysis', 'تحليل المنافسين'), L('Brand guidelines', 'دليل العلامة')],
            },
            {
                name: L('Corporate Rebranding Strategy', 'استراتيجية إعادة تصميم الهوية'),
                tagline: L('Evolve without losing equity', 'تطوّر دون فقدان القيمة'),
                description: L('A structured rebrand that modernizes how you look and feel while protecting the recognition you have already earned — rolled out across every touchpoint.', 'إعادة تصميم منظّمة تُحدِّث شكلك وإحساسك مع الحفاظ على الحضور الذي بنيته — وتُطبَّق عبر كل نقاط التواصل.'),
                icon: '/icons/services/Corporate Visual Identity Design.png',
                features: [L('Brand audit', 'تدقيق العلامة'), L('Visual refresh', 'تحديث بصري'), L('Rollout plan', 'خطة الإطلاق'), L('Asset migration', 'نقل الأصول')],
            },
            {
                name: L('Logo & Visual Identity Design', 'تصميم الشعار والهوية البصرية'),
                tagline: L('A system, not just a logo', 'نظام متكامل لا مجرّد شعار'),
                description: L('A distinctive logo plus the full toolkit — colors, typography, iconography, and usage rules — bilingual for Arabic and English so your brand is consistent everywhere.', 'شعار مميّز مع مجموعة أدوات كاملة — ألوان وخطوط وأيقونات وقواعد استخدام — ثنائية اللغة بالعربية والإنجليزية لتبقى علامتك متّسقة في كل مكان.'),
                icon: '/icons/services/Corporate Visual Identity Design.png',
                features: [L('Logo design', 'تصميم الشعار'), L('Color & type system', 'نظام الألوان والخطوط'), L('Arabic + English lockups', 'صيغ عربية وإنجليزية'), L('Brand asset kit', 'حزمة أصول العلامة')],
            },
            {
                name: L('Motion Graphics & Web Animations', 'الموشن جرافيك وحركات الويب'),
                tagline: L('Bring the brand to life', 'امنح العلامة الحياة'),
                description: L('Purposeful motion — animated logos, micro-interactions, and explainer visuals — that adds polish and guides attention without slowing the experience down.', 'حركة هادفة — شعارات متحرّكة وتفاعلات دقيقة ومرئيات توضيحية — تضيف لمسة راقية وتوجّه الانتباه دون إبطاء التجربة.'),
                icon: '/icons/services/Social Media Management.png',
                features: [L('Animated logo', 'شعار متحرّك'), L('Micro-interactions', 'تفاعلات دقيقة'), L('Explainer motion', 'موشن توضيحي'), L('Lottie / video export', 'تصدير Lottie / فيديو')],
            },
            {
                name: L('UI/UX Design & Testing', 'تصميم واختبار تجربة المستخدم'),
                tagline: L('Designed on evidence', 'تصميم مبني على الدليل'),
                description: L('User flows, wireframes, and high-fidelity interfaces validated with real usability testing — so the product is not just beautiful, it is easy to use and converts.', 'مسارات المستخدم والمخططات والواجهات عالية الدقة، مُتحقَّق منها باختبارات استخدام حقيقية — ليكون المنتج جميلاً وسهل الاستخدام ويحقّق التحويل.'),
                icon: '/icons/services/Website Design & Development.png',
                features: [L('User flows & wireframes', 'مسارات ومخططات'), L('High-fidelity UI', 'واجهات عالية الدقة'), L('Usability testing', 'اختبار قابلية الاستخدام'), L('Accessibility', 'إتاحة الوصول')],
            },
            {
                name: L('Mobile & Web App Interface Design', 'تصميم واجهات تطبيقات الجوال والويب'),
                tagline: L('One system, every screen', 'نظام واحد لكل الشاشات'),
                description: L('Consistent, component-based interface design and a reusable design system that scales across your web app and mobile app — and hands off cleanly to developers.', 'تصميم واجهات متّسق قائم على المكوّنات ونظام تصميم قابل لإعادة الاستخدام يتوسّع عبر تطبيق الويب والجوال — ويُسلَّم للمطوّرين بسلاسة.'),
                icon: '/icons/services/Website Design & Development.png',
                features: [L('Design system', 'نظام تصميم'), L('Component library', 'مكتبة مكوّنات'), L('Responsive layouts', 'تخطيطات متجاوبة'), L('Developer handoff', 'تسليم للمطوّرين')],
            },
            {
                name: L('Social Media Kit & Assets Design', 'تصميم حزمة ومحتوى السوشيال ميديا'),
                tagline: L('Ship-ready, on-brand', 'جاهزة للنشر ومتّسقة مع العلامة'),
                description: L('Templated posts, stories, and ad creatives plus profile assets — all on-brand and bilingual, so your team can publish consistent content fast.', 'قوالب منشورات وستوريز وإعلانات إضافة إلى أصول الحسابات — كلها متّسقة مع العلامة وثنائية اللغة، ليتمكّن فريقك من النشر بسرعة واتساق.'),
                icon: '/icons/services/Social Media Management.png',
                features: [L('Post & story templates', 'قوالب منشورات وستوريز'), L('Ad creative sets', 'حزم إعلانات'), L('Profile assets', 'أصول الحسابات'), L('Bilingual layouts', 'تخطيطات ثنائية اللغة')],
            },
        ],
        overview: {
            badge: L('UI/UX Design & Branding', 'تصميم الواجهات والهوية'),
            title: L('Design that makes people trust you at first glance', 'تصميم يجعل الناس يثقون بك من النظرة الأولى'),
            description: L(
                'Design is how your business earns trust before a word is read. We combine brand strategy, a distinctive visual identity, and evidence-based UI/UX into one system — bilingual, consistent, and built to convert across web, mobile, and social.',
                'التصميم هو الطريقة التي تكسب بها ثقة العميل قبل قراءة أي كلمة. نجمع استراتيجية العلامة وهوية بصرية مميّزة وتجربة استخدام مبنية على الدليل في نظام واحد — ثنائي اللغة ومتّسق ومصمَّم للتحويل عبر الويب والجوال والسوشيال.',
            ),
            metrics: [
                { label: L('Languages designed', 'لغتا التصميم'), value: L('AR + EN', 'عربي + إنجليزي') },
                { label: L('Delivered as', 'يُسلَّم كـ'), value: L('Design system', 'نظام تصميم') },
                { label: L('Validated by', 'مُتحقَّق منه عبر'), value: L('User testing', 'اختبار المستخدم') },
                { label: L('You own', 'تملك'), value: L('Source files', 'الملفات المصدرية') },
            ],
            expertiseTitle: L('Where we go deep', 'أين نتعمّق'),
            expertiseDescription: L('Brand and product design for Gulf businesses that want to look world-class in both Arabic and English.', 'تصميم العلامة والمنتج لشركات الخليج التي تريد مظهراً عالمياً بالعربية والإنجليزية.'),
            expertiseItems: [
                L('Brand strategy & identity systems', 'استراتيجية العلامة وأنظمة الهوية'),
                L('Bilingual (Arabic-first) design', 'تصميم ثنائي اللغة يراعي العربية أولاً'),
                L('Product UI/UX & design systems', 'تصميم واجهات المنتج وأنظمة التصميم'),
                L('Usability testing & accessibility', 'اختبار الاستخدام وإتاحة الوصول'),
                L('Motion & interaction design', 'تصميم الحركة والتفاعل'),
                L('Developer-ready handoff', 'تسليم جاهز للمطوّرين'),
            ],
            processTitle: L('How we deliver', 'كيف نُنجز'),
            processSteps: [
                { name: L('Discover & define', 'اكتشاف وتحديد'), detail: L('We learn your business, audience, and competitors, then define positioning and the design direction.', 'نفهم أعمالك وجمهورك ومنافسيك، ثم نحدّد التموضع واتجاه التصميم.'), status: L('Phase 1', 'المرحلة ١') },
                { name: L('Design & validate', 'تصميم وتحقّق'), detail: L('We design the identity and interfaces, then validate with real users and refine.', 'نصمّم الهوية والواجهات، ثم نتحقّق مع مستخدمين حقيقيين ونحسّن.'), status: L('Phase 2', 'المرحلة ٢') },
                { name: L('System & handoff', 'نظام وتسليم'), detail: L('We package a reusable design system and hand off clean, documented files to your team and developers.', 'نُجهّز نظام تصميم قابلاً لإعادة الاستخدام ونسلّم ملفات نظيفة وموثّقة لفريقك ومطوّريك.'), status: L('Phase 3', 'المرحلة ٣') },
            ],
            showcase: { src: '/images/services/website-design/6.jpg', alt: L('Brand identity and interface design showcase', 'عرض للهوية البصرية وتصميم الواجهات'), caption: L('Identity + interface', 'هوية + واجهة'), captionRight: L('One design system', 'نظام تصميم واحد') },
        },
        cta: {
            title: L('Ready to look world-class?', 'جاهز لتظهر بمستوى عالمي؟'),
            description: L("Let's craft a brand and interface your customers trust on sight — bilingual, distinctive, and built to convert.", 'لنصنع علامة وواجهة يثق بها عملاؤك من النظرة الأولى — ثنائية اللغة ومميّزة ومصمَّمة للتحويل.'),
            button: L('Start Your Project', 'ابدأ مشروعك'),
            explore: L('Explore All Services', 'استكشف كل الخدمات'),
        },
    },
    'custom-erp-crm-solutions': {
        slug: 'custom-erp-crm-solutions',
        hero: {
            title: L('Custom ERP & CRM Solutions', 'حلول ERP وCRM مخصصة'),
            description: L(
                'Core ERP and CRM systems engineered around how your business actually runs — Odoo implementation, sales pipelines, multi-branch control, automated support, and role-based security. Built once, owned forever.',
                'أنظمة ERP وCRM أساسية مصمّمة حول طريقة عمل مؤسستك فعلياً — تطبيق Odoo، وخطوط أنابيب المبيعات، وإدارة الفروع المتعددة، والدعم المؤتمت، والصلاحيات المبنية على الأدوار. تُبنى مرة واحدة، وتملكها إلى الأبد.',
            ),
        },
        products: [
            { title: L('Odoo ERP Implementation', 'تطبيق نظام Odoo ERP'), thumbnail: `${BS_IMG}/1.webp` },
            { title: L('Sales CRM Pipeline', 'خط أنابيب مبيعات CRM'), thumbnail: `${BS_IMG}/CRM System.webp` },
            { title: L('Multi-Branch Operations', 'عمليات متعددة الفروع'), thumbnail: `${BS_IMG}/2.webp` },
            { title: L('Automated Ticketing', 'نظام تذاكر مؤتمت'), thumbnail: `${BS_IMG}/3.webp` },
            { title: L('POS to ERP Sync', 'مزامنة نقاط البيع مع ERP'), thumbnail: `${BS_IMG}/POS System.webp` },
            { title: L('Inventory Control', 'التحكم في المخزون'), thumbnail: `${BS_IMG}/Inventory Management.webp` },
            { title: L('Role-Based Access', 'صلاحيات حسب الدور'), thumbnail: `${BS_IMG}/5.webp` },
            { title: L('Lead Distribution', 'توزيع العملاء المحتملين'), thumbnail: `${BS_IMG}/6.webp` },
            { title: L('Data Migration', 'ترحيل البيانات'), thumbnail: `${BS_IMG}/9.webp` },
            { title: L('E-Commerce Sync', 'مزامنة المتجر الإلكتروني'), thumbnail: `${BS_IMG}/11.avif` },
            { title: L('Booking Operations', 'عمليات الحجز'), thumbnail: `${BS_IMG}/booking system.webp` },
            { title: L('Sales Automation', 'أتمتة المبيعات'), thumbnail: `${BS_IMG}/CRM System.webp` },
            { title: L('Franchise Management', 'إدارة الامتياز التجاري'), thumbnail: `${BS_IMG}/2.webp` },
            { title: L('Support Workflows', 'سير عمل الدعم'), thumbnail: `${BS_IMG}/3.webp` },
            { title: L('Security Policies', 'سياسات الأمان'), thumbnail: `${BS_IMG}/1.webp` },
        ],
        solutionsTitle: L('What this pillar delivers', 'ما يقدّمه هذا النظام'),
        solutionsSubtitle: L(
            'Eight core ERP & CRM capabilities — built, integrated, and owned by your team.',
            'ثماني قدرات أساسية في ERP وCRM — تُبنى وتُدمج ويملكها فريقك.',
        ),
        cards: [
            {
                name: L('Odoo ERP Implementation', 'تطبيق نظام Odoo ERP'),
                tagline: L('Your operations, unified', 'عملياتك في نظام واحد'),
                description: L(
                    'Full Odoo setup, configuration, and customization across sales, inventory, accounting, and HR — tailored to your workflows, not the other way around.',
                    'إعداد وتهيئة وتخصيص كامل لنظام Odoo عبر المبيعات والمخزون والمحاسبة والموارد البشرية — مصمّم ليلائم سير عملك، لا العكس.',
                ),
                icon: `${ICON}/systems.png`,
                features: [
                    L('Module configuration', 'تهيئة الوحدات'),
                    L('Custom workflows', 'سير عمل مخصص'),
                    L('Data migration', 'ترحيل البيانات'),
                    L('Team training', 'تدريب الفريق'),
                ],
            },
            {
                name: L('Sales CRM Pipeline', 'خط أنابيب مبيعات CRM'),
                tagline: L('Close more, lose less', 'أغلق صفقات أكثر واخسر أقل'),
                description: L(
                    'A CRM pipeline architected around your sales motion — stages, automations, reminders, and reporting that keep deals moving.',
                    'خط أنابيب CRM مُصمّم حول دورة مبيعاتك — مراحل وأتمتة وتذكيرات وتقارير تُبقي الصفقات تتحرك.',
                ),
                icon: `${ICON}/CRM System.png`,
                features: [
                    L('Pipeline design', 'تصميم خط الأنابيب'),
                    L('Deal automation', 'أتمتة الصفقات'),
                    L('Activity tracking', 'تتبع الأنشطة'),
                    L('Sales reporting', 'تقارير المبيعات'),
                ],
            },
            {
                name: L('Legacy System Migration', 'ترحيل الأنظمة القديمة'),
                tagline: L('Off the spreadsheets', 'وداعاً لجداول البيانات'),
                description: L(
                    'Move scattered spreadsheets and outdated tools into one clean, structured system — with your history intact and deduplicated.',
                    'انقل جداول البيانات المبعثرة والأدوات القديمة إلى نظام واحد منظّم ونظيف — مع الحفاظ على سجلك كاملاً وخالياً من التكرار.',
                ),
                icon: `${ICON}/Admin Dashboard.png`,
                features: [
                    L('Data cleansing', 'تنقية البيانات'),
                    L('Mapping & import', 'المطابقة والاستيراد'),
                    L('Validation', 'التحقق من الصحة'),
                    L('Zero data loss', 'دون فقدان أي بيانات'),
                ],
            },
            {
                name: L('Lead Management Engine', 'محرك إدارة العملاء المحتملين'),
                tagline: L('Never drop a lead', 'لا تفقد عميلاً محتملاً'),
                description: L(
                    'Centralized capture and rule-based distribution so every lead lands with the right rep, instantly, with full source tracking.',
                    'التقاط مركزي وتوزيع قائم على القواعد بحيث يصل كل عميل محتمل إلى المندوب المناسب فوراً، مع تتبع كامل للمصدر.',
                ),
                icon: `${ICON}/Analytics Dashboard.png`,
                features: [
                    L('Central inbox', 'صندوق وارد مركزي'),
                    L('Auto-routing', 'توجيه تلقائي'),
                    L('Source tracking', 'تتبع المصدر'),
                    L('SLA alerts', 'تنبيهات اتفاقية الخدمة'),
                ],
            },
            {
                name: L('Multi-Branch Operations', 'إدارة الفروع المتعددة'),
                tagline: L('One system, every branch', 'نظام واحد لكل فرع'),
                description: L(
                    'Run multiple branches or franchises from one platform — shared data, per-branch controls, and consolidated reporting.',
                    'أدر فروعاً أو امتيازات متعددة من منصة واحدة — بيانات مشتركة وضوابط لكل فرع وتقارير موحّدة.',
                ),
                icon: `${ICON}/systems.png`,
                features: [
                    L('Branch hierarchy', 'التسلسل الهرمي للفروع'),
                    L('Per-branch roles', 'أدوار لكل فرع'),
                    L('Consolidated KPIs', 'مؤشرات أداء موحّدة'),
                    L('Transfer flows', 'مسارات التحويل بين الفروع'),
                ],
            },
            {
                name: L('Automated Ticketing', 'نظام التذاكر المؤتمت'),
                tagline: L('Support that scales', 'دعم يتوسع مع نموك'),
                description: L(
                    'Customer support and ticketing with automated routing, SLAs, and a knowledge base — wired into your CRM.',
                    'دعم العملاء ونظام تذاكر مع توجيه مؤتمت واتفاقيات مستوى خدمة وقاعدة معرفة — مربوطة بنظام CRM لديك.',
                ),
                icon: `${ICON}/Real-time Chat System.png`,
                features: [
                    L('Ticket routing', 'توجيه التذاكر'),
                    L('SLA tracking', 'تتبع اتفاقية الخدمة'),
                    L('Knowledge base', 'قاعدة المعرفة'),
                    L('CRM linkage', 'الربط مع CRM'),
                ],
            },
            {
                name: L('E-Commerce to ERP Sync', 'مزامنة المتجر الإلكتروني مع ERP'),
                tagline: L('Orders, stock, in sync', 'الطلبات والمخزون متزامنة'),
                description: L(
                    'Two-way sync between your storefront and ERP — orders, inventory, and customers stay aligned across every channel.',
                    'مزامنة ثنائية الاتجاه بين متجرك ونظام ERP — تبقى الطلبات والمخزون والعملاء متوافقة عبر كل قناة.',
                ),
                icon: `${ICON}/E-commerce Solutions.png`,
                features: [
                    L('Order sync', 'مزامنة الطلبات'),
                    L('Live inventory', 'مخزون لحظي'),
                    L('Customer sync', 'مزامنة العملاء'),
                    L('Multi-channel', 'متعدد القنوات'),
                ],
            },
            {
                name: L('Role-Based Access (RBAC)', 'صلاحيات مبنية على الأدوار (RBAC)'),
                tagline: L('The right access, only', 'الصلاحية المناسبة فقط'),
                description: L(
                    'Granular permission matrices and security policies so each person sees and does exactly what their role allows — auditable end to end.',
                    'مصفوفات صلاحيات دقيقة وسياسات أمان بحيث يرى كل شخص ويفعل ما يسمح به دوره تماماً — قابلة للتدقيق من البداية إلى النهاية.',
                ),
                icon: `${ICON}/Customer Portal.png`,
                features: [
                    L('Permission matrix', 'مصفوفة الصلاحيات'),
                    L('Audit logs', 'سجلات التدقيق'),
                    L('Approval gates', 'بوابات الموافقة'),
                    L('Data policies', 'سياسات البيانات'),
                ],
            },
        ],
        overview: {
            badge: L('Custom ERP & CRM Solutions', 'حلول ERP وCRM مخصصة'),
            title: L(
                'ERP & CRM systems built for how your business really runs',
                'أنظمة ERP وCRM مبنية على طريقة عمل مؤسستك الحقيقية',
            ),
            description: L(
                'We design and build core operational systems — Odoo ERP, sales CRM, multi-branch control, and automated support — that cut manual work, connect your data, and stay fully yours to extend. No bloated licences, no vendor lock-in.',
                'نصمم ونبني أنظمة تشغيلية أساسية — Odoo ERP ومبيعات CRM وإدارة الفروع المتعددة والدعم المؤتمت — تقلّل العمل اليدوي وتربط بياناتك وتبقى ملكك بالكامل لتطويرها. دون تراخيص مبالغ فيها ودون احتكار المورّد.',
            ),
            metrics: [
                { label: L('Manual work cut', 'تقليل العمل اليدوي'), value: L('Up to 60%', 'حتى ٦٠٪') },
                { label: L('Branches supported', 'الفروع المدعومة'), value: L('Unlimited', 'غير محدودة') },
                { label: L('Data ownership', 'ملكية البيانات'), value: L('100%', '١٠٠٪') },
                { label: L('Delivery model', 'نموذج التسليم'), value: L('Phased', 'على مراحل') },
            ],
            expertiseTitle: L('Where we go deep', 'أين نتعمّق'),
            expertiseDescription: L(
                'We specialize in ERP and CRM systems that integrate cleanly with your existing tools while staying flexible enough to grow with you.',
                'نتخصص في أنظمة ERP وCRM التي تتكامل بسلاسة مع أدواتك الحالية مع بقائها مرنة بما يكفي لتنمو معك.',
            ),
            expertiseItems: [
                L('Odoo implementation & customization', 'تطبيق وتخصيص Odoo'),
                L('Sales pipeline & lead distribution design', 'تصميم خط المبيعات وتوزيع العملاء المحتملين'),
                L('Multi-branch & franchise architecture', 'هندسة الفروع المتعددة والامتياز التجاري'),
                L('Role-based security & audit trails', 'الأمان المبني على الأدوار ومسارات التدقيق'),
                L('E-commerce ↔ ERP synchronization', 'مزامنة المتجر الإلكتروني مع ERP'),
                L('Legacy migration with zero data loss', 'ترحيل الأنظمة القديمة دون فقدان بيانات'),
            ],
            processTitle: L('How we deliver', 'كيف نُنفّذ'),
            processSteps: [
                {
                    name: L('Discovery & mapping', 'الاكتشاف والتخطيط'),
                    detail: L(
                        'We map your real workflows, data, and roles before a line of config is written.',
                        'نرسم سير عملك وبياناتك وأدوارك الفعلية قبل كتابة سطر واحد من الإعدادات.',
                    ),
                    status: L('Phase 1', 'المرحلة ١'),
                },
                {
                    name: L('Build & integrate', 'البناء والتكامل'),
                    detail: L(
                        'Configuration, customization, migration, and integrations with review gates and QA.',
                        'التهيئة والتخصيص والترحيل والتكاملات مع بوابات مراجعة وضمان جودة.',
                    ),
                    status: L('Phase 2', 'المرحلة ٢'),
                },
                {
                    name: L('Launch & handoff', 'الإطلاق والتسليم'),
                    detail: L(
                        'Training, documentation, access handoff, and a support path your team owns.',
                        'التدريب والتوثيق وتسليم الصلاحيات ومسار دعم يملكه فريقك.',
                    ),
                    status: L('Phase 3', 'المرحلة ٣'),
                },
            ],
            showcase: {
                src: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&q=80',
                alt: L(
                    'ERP and CRM dashboard showing pipelines, inventory, and analytics',
                    'لوحة تحكم ERP وCRM تعرض خطوط الأنابيب والمخزون والتحليلات',
                ),
                caption: L('Unified ERP & CRM', 'ERP وCRM موحّدان'),
                captionRight: L('Real-time operations', 'عمليات لحظية'),
            },
        },
        cta: {
            title: L('Ready to unify your operations?', 'جاهز لتوحيد عملياتك؟'),
            description: L(
                "Let's scope a custom ERP & CRM system around your workflows — with a free consultation and demo preview before you commit.",
                'لنحدّد نطاق نظام ERP وCRM مخصص حول سير عملك — مع استشارة مجانية وعرض تجريبي قبل أن تلتزم.',
            ),
            button: L('Start Your Project', 'ابدأ مشروعك'),
            explore: L('Explore All Services', 'استكشف كل الخدمات'),
        },
    },

    // ─────────────────────────────────────────────────────────────────────
    // Business Management Systems — orders, sales, HR, inventory.
    // Card order by AR-world search demand: inventory → HR → sales → order,
    // then two supporting capability cards (dashboards, integrations).
    // ─────────────────────────────────────────────────────────────────────
    'business-management-systems': {
        slug: 'business-management-systems',
        hero: {
            title: L('Business Management Systems', 'أنظمة إدارة الأعمال'),
            description: L(
                'Focused management systems that run the day-to-day of your business — inventory, HR, sales, and orders — connected into one operational backbone with live dashboards, clear roles, and reports you can trust. Built around your process and fully owned by your team.',
                'أنظمة إدارة مركّزة تُشغّل يوميات مؤسستك — المخزون والموارد البشرية والمبيعات والطلبات — مترابطة في عمود تشغيلي واحد مع لوحات تحكم لحظية وأدوار واضحة وتقارير يمكنك الوثوق بها. مبنية حول عملياتك ويملكها فريقك بالكامل.',
            ),
        },
        products: [
            { title: L('Inventory Management', 'إدارة المخزون'), thumbnail: `${BS_IMG}/Inventory Management.webp` },
            { title: L('HR Management', 'إدارة الموارد البشرية'), thumbnail: `${BS_IMG}/2.webp` },
            { title: L('Sales Management', 'إدارة المبيعات'), thumbnail: `${BS_IMG}/CRM System.webp` },
            { title: L('Order Management', 'إدارة الطلبات'), thumbnail: `${BS_IMG}/1.webp` },
            { title: L('Stock Control', 'ضبط المخزون'), thumbnail: `${BS_IMG}/Inventory Management.webp` },
            { title: L('Warehouse Operations', 'عمليات المستودعات'), thumbnail: `${BS_IMG}/6.webp` },
            { title: L('Employee Records', 'سجلات الموظفين'), thumbnail: `${BS_IMG}/2.webp` },
            { title: L('Payroll & Attendance', 'الرواتب والحضور'), thumbnail: `${BS_IMG}/3.webp` },
            { title: L('Sales Reporting', 'تقارير المبيعات'), thumbnail: `${BS_IMG}/5.webp` },
            { title: L('Order Fulfilment', 'تنفيذ الطلبات'), thumbnail: `${BS_IMG}/9.webp` },
            { title: L('POS Integration', 'تكامل نقاط البيع'), thumbnail: `${BS_IMG}/POS System.webp` },
            { title: L('Live Dashboards', 'لوحات تحكم لحظية'), thumbnail: `${BS_IMG}/11.avif` },
            { title: L('Reorder Automation', 'أتمتة إعادة الطلب'), thumbnail: `${BS_IMG}/Inventory Management.webp` },
            { title: L('Multi-Location Stock', 'مخزون متعدد المواقع'), thumbnail: `${BS_IMG}/6.webp` },
            { title: L('Approval Flows', 'مسارات الموافقة'), thumbnail: `${BS_IMG}/1.webp` },
        ],
        solutionsTitle: L('What this pillar delivers', 'ما يقدّمه هذا النظام'),
        solutionsSubtitle: L(
            'The core management systems your operation runs on — inventory, HR, sales, and orders, plus the dashboards and integrations that tie them together.',
            'أنظمة الإدارة الأساسية التي تُدير عملياتك — المخزون والموارد البشرية والمبيعات والطلبات، إضافةً إلى لوحات التحكم والتكاملات التي تربطها معاً.',
        ),
        cards: [
            {
                name: L('Inventory Management Systems', 'أنظمة إدارة المخزون'),
                tagline: L('Know your stock, always', 'اعرف مخزونك دائماً'),
                description: L(
                    'Real-time stock control across locations — reorder rules, batch and expiry tracking, and stock counts that keep your shelves and your books in agreement.',
                    'ضبط لحظي للمخزون عبر المواقع — قواعد إعادة الطلب وتتبع الدفعات والصلاحية وجرد يبقي رفوفك وسجلاتك متطابقة.',
                ),
                icon: `${ICON}/Inventory Management.png`,
                features: [
                    L('Real-time stock levels', 'مستويات مخزون لحظية'),
                    L('Reorder points', 'نقاط إعادة الطلب'),
                    L('Batch & expiry tracking', 'تتبع الدفعات والصلاحية'),
                    L('Multi-warehouse', 'مستودعات متعددة'),
                ],
            },
            {
                name: L('HR Management Systems', 'أنظمة إدارة الموارد البشرية'),
                tagline: L('Your team, organized', 'فريقك منظّم'),
                description: L(
                    'One place for employee records, attendance, leave, and payroll inputs — with self-service, approvals, and reporting that keep HR accurate and fast.',
                    'مكان واحد لسجلات الموظفين والحضور والإجازات ومدخلات الرواتب — مع خدمة ذاتية وموافقات وتقارير تُبقي الموارد البشرية دقيقة وسريعة.',
                ),
                icon: `${ICON}/HR Management.png`,
                features: [
                    L('Employee records', 'سجلات الموظفين'),
                    L('Attendance & leave', 'الحضور والإجازات'),
                    L('Payroll inputs', 'مدخلات الرواتب'),
                    L('Self-service portal', 'بوابة خدمة ذاتية'),
                ],
            },
            {
                name: L('Sales Management Systems', 'أنظمة إدارة المبيعات'),
                tagline: L('Sell more, track it all', 'بِع أكثر وتتبع كل شيء'),
                description: L(
                    'Quotes, orders, invoices, and targets in one flow — with customer history, pricing rules, and sales reporting that show what is really working.',
                    'عروض الأسعار والطلبات والفواتير والأهداف في مسار واحد — مع سجل العملاء وقواعد التسعير وتقارير مبيعات تُظهر ما ينجح فعلاً.',
                ),
                icon: `${ICON}/CRM System.png`,
                features: [
                    L('Quotes to invoices', 'من العرض إلى الفاتورة'),
                    L('Pricing & discounts', 'التسعير والخصومات'),
                    L('Customer history', 'سجل العملاء'),
                    L('Targets & reporting', 'الأهداف والتقارير'),
                ],
            },
            {
                name: L('Order Management Systems', 'أنظمة إدارة الطلبات'),
                tagline: L('From order to delivery', 'من الطلب إلى التسليم'),
                description: L(
                    'Capture, track, and fulfil orders across channels — with status updates, stock allocation, and delivery workflows that stop orders from slipping through the cracks.',
                    'استقبل الطلبات وتتبعها ونفّذها عبر القنوات — مع تحديثات الحالة وتخصيص المخزون ومسارات التسليم التي تمنع ضياع الطلبات.',
                ),
                icon: `${ICON}/systems.png`,
                features: [
                    L('Omnichannel intake', 'استقبال متعدد القنوات'),
                    L('Stock allocation', 'تخصيص المخزون'),
                    L('Status tracking', 'تتبع الحالة'),
                    L('Delivery workflows', 'مسارات التسليم'),
                ],
            },
            {
                name: L('Dashboards & Reporting', 'لوحات التحكم والتقارير'),
                tagline: L('Decisions on real data', 'قرارات على بيانات حقيقية'),
                description: L(
                    'Live operational dashboards and scheduled reports that pull inventory, sales, HR, and orders into one view — so managers act on facts, not guesswork.',
                    'لوحات تحكم تشغيلية لحظية وتقارير مجدولة تجمع المخزون والمبيعات والموارد البشرية والطلبات في عرض واحد — ليتصرف المديرون بناءً على الحقائق لا التخمين.',
                ),
                icon: `${ICON}/Analytics Dashboard.png`,
                features: [
                    L('Live KPIs', 'مؤشرات أداء لحظية'),
                    L('Scheduled reports', 'تقارير مجدولة'),
                    L('Role-based views', 'عروض حسب الدور'),
                    L('Export & share', 'التصدير والمشاركة'),
                ],
            },
            {
                name: L('Integrations & Automation', 'التكاملات والأتمتة'),
                tagline: L('Connect what you use', 'اربط ما تستخدمه'),
                description: L(
                    'Wire your management systems to POS, accounting, and e-commerce — so data flows once, automatically, without re-keying between tools.',
                    'اربط أنظمة الإدارة لديك بنقاط البيع والمحاسبة والتجارة الإلكترونية — لتتدفق البيانات مرة واحدة تلقائياً دون إعادة إدخال بين الأدوات.',
                ),
                icon: `${ICON}/Admin Dashboard.png`,
                features: [
                    L('POS & accounting sync', 'مزامنة نقاط البيع والمحاسبة'),
                    L('E-commerce link', 'الربط مع المتجر الإلكتروني'),
                    L('Automated workflows', 'مسارات مؤتمتة'),
                    L('Open API', 'واجهة API مفتوحة'),
                ],
            },
        ],
        overview: {
            badge: L('Business Management Systems', 'أنظمة إدارة الأعمال'),
            title: L(
                'One connected backbone for inventory, HR, sales, and orders',
                'عمود تشغيلي واحد مترابط للمخزون والموارد البشرية والمبيعات والطلبات',
            ),
            description: L(
                'We build focused management systems that replace scattered spreadsheets and disconnected apps with one operational backbone — so stock, people, sales, and orders share the same data, the same rules, and the same live view.',
                'نبني أنظمة إدارة مركّزة تستبدل جداول البيانات المبعثرة والتطبيقات المنفصلة بعمود تشغيلي واحد — بحيث يتشارك المخزون والموظفون والمبيعات والطلبات البيانات نفسها والقواعد نفسها والعرض اللحظي نفسه.',
            ),
            metrics: [
                { label: L('Data re-entry cut', 'تقليل إعادة إدخال البيانات'), value: L('Up to 70%', 'حتى ٧٠٪') },
                { label: L('Stock accuracy', 'دقة المخزون'), value: L('Real-time', 'لحظية') },
                { label: L('Locations supported', 'المواقع المدعومة'), value: L('Unlimited', 'غير محدودة') },
                { label: L('Data ownership', 'ملكية البيانات'), value: L('100%', '١٠٠٪') },
            ],
            expertiseTitle: L('Where we go deep', 'أين نتعمّق'),
            expertiseDescription: L(
                'We specialize in management systems that fit how your team already works — clear roles, accurate stock, and reports leaders actually use.',
                'نتخصص في أنظمة الإدارة التي تلائم طريقة عمل فريقك بالفعل — أدوار واضحة ومخزون دقيق وتقارير يستخدمها القادة فعلاً.',
            ),
            expertiseItems: [
                L('Multi-warehouse inventory control', 'ضبط المخزون متعدد المستودعات'),
                L('HR, attendance & payroll inputs', 'الموارد البشرية والحضور ومدخلات الرواتب'),
                L('Sales, quoting & invoicing flows', 'مسارات المبيعات وعروض الأسعار والفوترة'),
                L('Order capture & fulfilment', 'استقبال الطلبات وتنفيذها'),
                L('Operational dashboards & KPIs', 'لوحات التحكم التشغيلية ومؤشرات الأداء'),
                L('POS, accounting & e-commerce integration', 'التكامل مع نقاط البيع والمحاسبة والتجارة الإلكترونية'),
            ],
            processTitle: L('How we deliver', 'كيف نُنفّذ'),
            processSteps: [
                {
                    name: L('Map your operation', 'رسم عملياتك'),
                    detail: L(
                        'We map how stock, people, sales, and orders move today — and where the gaps and double-entry live.',
                        'نرسم كيف يتحرك المخزون والموظفون والمبيعات والطلبات اليوم — وأين تكمن الفجوات والإدخال المزدوج.',
                    ),
                    status: L('Phase 1', 'المرحلة ١'),
                },
                {
                    name: L('Build & connect', 'البناء والربط'),
                    detail: L(
                        'We configure each system, connect them, and migrate your data — with review gates and QA at every step.',
                        'نُهيئ كل نظام ونربطه معاً ونرحّل بياناتك — مع بوابات مراجعة وضمان جودة في كل خطوة.',
                    ),
                    status: L('Phase 2', 'المرحلة ٢'),
                },
                {
                    name: L('Train & hand off', 'التدريب والتسليم'),
                    detail: L(
                        'Your team is trained, documented, and given full ownership — with a support path you control.',
                        'يُدرَّب فريقك ويُوثَّق ويُمنح الملكية الكاملة — مع مسار دعم تتحكم به.',
                    ),
                    status: L('Phase 3', 'المرحلة ٣'),
                },
            ],
            showcase: {
                src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
                alt: L(
                    'Business management dashboard showing inventory, sales, and HR metrics',
                    'لوحة إدارة أعمال تعرض مقاييس المخزون والمبيعات والموارد البشرية',
                ),
                caption: L('Connected operations', 'عمليات مترابطة'),
                captionRight: L('Real-time control', 'تحكم لحظي'),
            },
        },
        cta: {
            title: L('Ready to run your operation from one system?', 'جاهز لإدارة عملياتك من نظام واحد؟'),
            description: L(
                "Let's scope the management systems your business needs — inventory, HR, sales, and orders — with a free consultation and demo preview before you commit.",
                'لنحدّد نطاق أنظمة الإدارة التي يحتاجها عملك — المخزون والموارد البشرية والمبيعات والطلبات — مع استشارة مجانية وعرض تجريبي قبل أن تلتزم.',
            ),
            button: L('Start Your Project', 'ابدأ مشروعك'),
            explore: L('Explore All Services', 'استكشف كل الخدمات'),
        },
    },

    // ─────────────────────────────────────────────────────────────────────
    // Business Process Automation (BPA) — 8 cards ordered by AR search demand
    // per docs/needed-redesign.md §3: workflow → invoicing → WhatsApp-CRM →
    // accounting API → API dev → proposals → follow-up → e-sign.
    // ─────────────────────────────────────────────────────────────────────
    'business-process-automation': {
        slug: 'business-process-automation',
        hero: {
            title: L('Business Process Automation', 'أتمتة عمليات الأعمال'),
            description: L(
                'Stop paying your team to do the same manual steps every day. We automate the workflows that eat your hours — invoicing, WhatsApp-to-CRM lead capture, approvals, proposals, follow-ups, and e-signatures — so work moves itself between your tools, accurately and on time.',
                'توقّف عن دفع أجور فريقك لتكرار الخطوات اليدوية نفسها كل يوم. نُؤتمت المسارات التي تلتهم ساعاتك — الفوترة، واستقطاب العملاء من واتساب إلى CRM، والموافقات، والعروض، والمتابعات، والتوقيع الإلكتروني — لينتقل العمل بنفسه بين أدواتك بدقة وفي الوقت المحدد.',
            ),
        },
        products: [
            { title: L('Workflow Automation', 'أتمتة سير العمل'), thumbnail: `${BS_IMG}/1.webp` },
            { title: L('Automated Invoicing', 'الفوترة المؤتمتة'), thumbnail: `${BS_IMG}/3.webp` },
            { title: L('WhatsApp to CRM', 'واتساب إلى CRM'), thumbnail: `${BS_IMG}/CRM System.webp` },
            { title: L('Accounting Sync', 'مزامنة المحاسبة'), thumbnail: `${BS_IMG}/1.webp` },
            { title: L('API Integration', 'تكامل الـ API'), thumbnail: `${BS_IMG}/11.avif` },
            { title: L('Proposal Automation', 'أتمتة العروض'), thumbnail: `${BS_IMG}/2.webp` },
            { title: L('Sales Follow-Up', 'متابعة المبيعات'), thumbnail: `${BS_IMG}/6.webp` },
            { title: L('E-Signatures', 'التوقيع الإلكتروني'), thumbnail: `${BS_IMG}/5.webp` },
            { title: L('Payment Reminders', 'تذكيرات السداد'), thumbnail: `${BS_IMG}/3.webp` },
            { title: L('PO Approvals', 'اعتماد أوامر الشراء'), thumbnail: `${BS_IMG}/9.webp` },
            { title: L('Employee Onboarding', 'تعيين الموظفين'), thumbnail: `${BS_IMG}/2.webp` },
            { title: L('Quotation Generation', 'توليد عروض الأسعار'), thumbnail: `${BS_IMG}/1.webp` },
            { title: L('Drip Campaigns', 'حملات التنقيط'), thumbnail: `${BS_IMG}/6.webp` },
            { title: L('Contract Management', 'إدارة العقود'), thumbnail: `${BS_IMG}/5.webp` },
            { title: L('Cross-Tool Sync', 'المزامنة بين الأدوات'), thumbnail: `${BS_IMG}/11.avif` },
        ],
        solutionsTitle: L('What this pillar delivers', 'ما يقدّمه هذا النظام'),
        solutionsSubtitle: L(
            'Eight automation workflows — ordered by demand — that remove manual work from the tasks your team repeats every day.',
            'ثمانية مسارات أتمتة — مرتّبة حسب الطلب — تُزيل العمل اليدوي من المهام التي يكرّرها فريقك كل يوم.',
        ),
        cards: [
            {
                name: L('Workflow Automation', 'أتمتة سير العمل'),
                tagline: L('Work that runs itself', 'عمل يُدير نفسه'),
                description: L(
                    'We turn your repeated, multi-step processes into automated workflows — triggers, conditions, and actions that hand tasks between people and systems without anyone chasing them.',
                    'نُحوّل عملياتك المتكررة متعددة الخطوات إلى مسارات مؤتمتة — محفّزات وشروط وإجراءات تُسلّم المهام بين الأشخاص والأنظمة دون أن يلاحقها أحد.',
                ),
                icon: `${ICON}/systems.png`,
                features: [
                    L('Trigger-based rules', 'قواعد قائمة على المحفّزات'),
                    L('Conditional logic', 'منطق شرطي'),
                    L('Task hand-offs', 'تسليم المهام'),
                    L('Error alerts', 'تنبيهات الأخطاء'),
                ],
            },
            {
                name: L('Automated Invoicing & Payment Reminders', 'الفوترة المؤتمتة وتذكيرات السداد'),
                tagline: L('Get paid faster', 'احصل على مستحقاتك أسرع'),
                description: L(
                    'Invoices raised, sent, and chased automatically — with scheduled payment reminders that shorten your collection cycle without an awkward phone call.',
                    'فواتير تُصدر وتُرسل وتُتابَع تلقائياً — مع تذكيرات سداد مجدولة تُقصّر دورة التحصيل دون مكالمة محرجة.',
                ),
                icon: `${ICON}/Payment Integration.png`,
                features: [
                    L('Auto-generated invoices', 'فواتير تُولَّد تلقائياً'),
                    L('Scheduled reminders', 'تذكيرات مجدولة'),
                    L('VAT-ready (OMR)', 'جاهزة لضريبة القيمة المضافة (ريال عماني)'),
                    L('Payment tracking', 'تتبع المدفوعات'),
                ],
            },
            {
                name: L('WhatsApp-to-CRM Lead Capture', 'استقطاب العملاء من واتساب إلى CRM'),
                tagline: L('Never miss a lead', 'لا تفوّت عميلاً محتملاً'),
                description: L(
                    'Every WhatsApp enquiry captured into your CRM and routed to the right rep instantly — no message lost in a personal phone, no lead forgotten.',
                    'كل استفسار على واتساب يُلتقط في نظام CRM ويُوجَّه إلى المندوب المناسب فوراً — دون ضياع رسالة في هاتف شخصي ودون نسيان عميل محتمل.',
                ),
                icon: `${ICON}/Real-time Chat System.png`,
                features: [
                    L('Auto lead capture', 'التقاط تلقائي للعملاء'),
                    L('Instant routing', 'توجيه فوري'),
                    L('Source tagging', 'وسم المصدر'),
                    L('Reply templates', 'قوالب الردود'),
                ],
            },
            {
                name: L('Accounting System Integration', 'تكامل نظام المحاسبة'),
                tagline: L('Books that post themselves', 'دفاتر تُرحّل نفسها'),
                description: L(
                    'Sales, expenses, payroll, and bank feeds wired straight into your accounting software — so entries post themselves, VAT stays clean, and month-end stops being a scramble.',
                    'المبيعات والمصروفات والرواتب وكشوف البنك مربوطة مباشرةً بنظام محاسبتك — لتُرحّل القيود بنفسها وتبقى ضريبة القيمة المضافة نظيفة ويتوقف إغلاق الشهر عن كونه فوضى.',
                ),
                icon: `${ICON}/Admin Dashboard.png`,
                features: [
                    L('Auto-posted entries', 'قيود تُرحّل تلقائياً'),
                    L('Bank feed matching', 'مطابقة كشوف البنك'),
                    L('Clean VAT codes', 'رموز ضريبة نظيفة'),
                    L('Faster month-end', 'إغلاق شهري أسرع'),
                ],
            },
            {
                name: L('Cross-Platform API Integration', 'تكامل الـ API عبر المنصات'),
                tagline: L('Your tools, connected', 'أدواتك مترابطة'),
                description: L(
                    'We connect your website, CRM, and accounting through APIs so data flows once and stays consistent — no exports, no re-keying, no drifting numbers.',
                    'نربط موقعك ونظام CRM والمحاسبة عبر واجهات API لتتدفق البيانات مرة واحدة وتبقى متسقة — دون تصدير ودون إعادة إدخال ودون أرقام متضاربة.',
                ),
                icon: `${ICON}/webapps.png`,
                features: [
                    L('Website ↔ CRM sync', 'مزامنة الموقع مع CRM'),
                    L('Accounting connectors', 'موصّلات المحاسبة'),
                    L('Real-time data flow', 'تدفق بيانات لحظي'),
                    L('Custom API endpoints', 'نقاط API مخصصة'),
                ],
            },
            {
                name: L('Automated Proposals & Quotations', 'العروض وعروض الأسعار المؤتمتة'),
                tagline: L('Quote in minutes', 'اعرض السعر في دقائق'),
                description: L(
                    'Branded proposals and quotations generated from your pricing and templates in a few clicks — accurate, consistent, and out the door while the lead is still warm.',
                    'عروض وعروض أسعار بهوية علامتك تُولَّد من تسعيرك وقوالبك بنقرات قليلة — دقيقة ومتسقة وتصل للعميل بينما لا يزال مهتماً.',
                ),
                icon: `${ICON}/Corporate Visual Identity Design.png`,
                features: [
                    L('Template-driven', 'قائمة على القوالب'),
                    L('Pricing rules', 'قواعد التسعير'),
                    L('PDF generation', 'توليد ملفات PDF'),
                    L('E-approval ready', 'جاهزة للموافقة الإلكترونية'),
                ],
            },
            {
                name: L('Sales Follow-Up & Drip Automation', 'أتمتة متابعة المبيعات وحملات التنقيط'),
                tagline: L('Follow up, automatically', 'تابِع تلقائياً'),
                description: L(
                    'Timed, personalized follow-up sequences across email and WhatsApp that keep prospects engaged — so no deal goes cold because someone forgot to reply.',
                    'تسلسلات متابعة مُوقّتة ومخصصة عبر البريد وواتساب تُبقي العملاء المحتملين متفاعلين — فلا تبرد صفقة لأن أحداً نسي الرد.',
                ),
                icon: `${ICON}/CRM System.png`,
                features: [
                    L('Timed sequences', 'تسلسلات مُوقّتة'),
                    L('Email & WhatsApp', 'البريد وواتساب'),
                    L('Behavior triggers', 'محفّزات سلوكية'),
                    L('Reply detection', 'كشف الردود'),
                ],
            },
            {
                name: L('E-Signature & Contract Management', 'التوقيع الإلكتروني وإدارة العقود'),
                tagline: L('Sign without the paper', 'وقّع دون ورق'),
                description: L(
                    'Send, sign, and store contracts digitally — with legally sound e-signatures, reminders, and a searchable archive that ends the print-sign-scan loop.',
                    'أرسل ووقّع واحفظ العقود رقمياً — بتوقيعات إلكترونية سليمة قانونياً وتذكيرات وأرشيف قابل للبحث يُنهي دورة الطباعة والتوقيع والمسح.',
                ),
                icon: `${ICON}/Customer Portal.png`,
                features: [
                    L('Legally sound e-sign', 'توقيع إلكتروني سليم قانونياً'),
                    L('Signing reminders', 'تذكيرات التوقيع'),
                    L('Searchable archive', 'أرشيف قابل للبحث'),
                    L('Audit trail', 'مسار تدقيق'),
                ],
            },
        ],
        overview: {
            badge: L('Business Process Automation', 'أتمتة عمليات الأعمال'),
            title: L(
                'Automate the busywork that slows your business down',
                'أتمِت الأعمال الروتينية التي تُبطئ مؤسستك',
            ),
            description: L(
                'We map the repetitive, manual steps buried in your day — invoicing, follow-ups, approvals, data entry between tools — and replace them with reliable automations. Your team stops re-keying and chasing, and starts spending time where it actually matters.',
                'نرسم الخطوات اليدوية المتكررة المدفونة في يومك — الفوترة والمتابعات والموافقات وإدخال البيانات بين الأدوات — ونستبدلها بأتمتة موثوقة. يتوقف فريقك عن إعادة الإدخال والملاحقة، ويبدأ بقضاء وقته حيث يهم فعلاً.',
            ),
            metrics: [
                { label: L('Manual hours saved', 'الساعات اليدوية الموفّرة'), value: L('Up to 80%', 'حتى ٨٠٪') },
                { label: L('Faster invoicing', 'فوترة أسرع'), value: L('Same-day', 'في نفس اليوم') },
                { label: L('Lead response', 'الاستجابة للعملاء'), value: L('Instant', 'فورية') },
                { label: L('Tools connected', 'الأدوات المترابطة'), value: L('Any stack', 'أي منظومة') },
            ],
            expertiseTitle: L('Where we go deep', 'أين نتعمّق'),
            expertiseDescription: L(
                'We specialize in automations that connect the tools you already use — CRM, accounting, WhatsApp, and your website — into flows that just work.',
                'نتخصص في الأتمتة التي تربط الأدوات التي تستخدمها بالفعل — CRM والمحاسبة وواتساب وموقعك — في مسارات تعمل ببساطة.',
            ),
            expertiseItems: [
                L('Multi-step workflow automation', 'أتمتة سير العمل متعدد الخطوات'),
                L('Automated invoicing & reminders', 'الفوترة المؤتمتة والتذكيرات'),
                L('WhatsApp-to-CRM lead capture', 'استقطاب العملاء من واتساب إلى CRM'),
                L('Accounting & API integration', 'التكامل مع المحاسبة وواجهات API'),
                L('Proposal & quotation generation', 'توليد العروض وعروض الأسعار'),
                L('E-signature & contract flows', 'مسارات التوقيع الإلكتروني والعقود'),
            ],
            processTitle: L('How we deliver', 'كيف نُنفّذ'),
            processSteps: [
                {
                    name: L('Find the friction', 'تحديد نقاط الاحتكاك'),
                    detail: L(
                        'We shadow your process to find the manual, repeated steps that cost the most time and cause the most errors.',
                        'نتابع عمليتك عن قرب لاكتشاف الخطوات اليدوية المتكررة الأكثر استهلاكاً للوقت والأكثر تسبباً في الأخطاء.',
                    ),
                    status: L('Phase 1', 'المرحلة ١'),
                },
                {
                    name: L('Automate & connect', 'الأتمتة والربط'),
                    detail: L(
                        'We build the automations and connect your tools — tested against real cases with clear fallbacks.',
                        'نبني الأتمتة ونربط أدواتك — مُختبرة على حالات حقيقية مع بدائل واضحة عند الأخطاء.',
                    ),
                    status: L('Phase 2', 'المرحلة ٢'),
                },
                {
                    name: L('Monitor & refine', 'المراقبة والتحسين'),
                    detail: L(
                        'We watch the flows in production, tune them, and hand your team the controls and documentation.',
                        'نراقب المسارات في بيئة التشغيل ونضبطها ونسلّم فريقك أدوات التحكم والتوثيق.',
                    ),
                    status: L('Phase 3', 'المرحلة ٣'),
                },
            ],
            showcase: {
                src: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=1200&q=80',
                alt: L(
                    'Automation workflow connecting CRM, invoicing, and messaging tools',
                    'مسار أتمتة يربط CRM والفوترة وأدوات المراسلة',
                ),
                caption: L('Connected automations', 'أتمتة مترابطة'),
                captionRight: L('Zero manual re-entry', 'دون إعادة إدخال يدوي'),
            },
        },
        cta: {
            title: L('Ready to automate the busywork?', 'جاهز لأتمتة الأعمال الروتينية؟'),
            description: L(
                "Let's map the manual steps costing your team time — and automate them. Free consultation and a demo preview before you commit.",
                'لنرسم الخطوات اليدوية التي تُكلّف فريقك وقتاً — ونُؤتمتها. استشارة مجانية وعرض تجريبي قبل أن تلتزم.',
            ),
            button: L('Start Your Project', 'ابدأ مشروعك'),
            explore: L('Explore All Services', 'استكشف كل الخدمات'),
        },
    },
}

export function getRichPillarData(slug: string, locale = 'en'): RichPillarData | null {
    const src = richPillarData[slug]
    return src ? resolveRichPillar(src, locale) : null
}

// ─────────────────────────────────────────────────────────────────────────
// Tailored sub-service pages (SubServicePage template)
// ─────────────────────────────────────────────────────────────────────────

export const subServiceContent: Record<string, SubServiceContent> = {
    ...generatedSubServices,
    'odoo-erp-implementation': {
        slug: 'odoo-erp-implementation',
        service: 'Odoo ERP Implementation',
        pillarSlug: 'custom-erp-crm-solutions',
        pillarName: 'Custom ERP & CRM Solutions',
        seo: {
            title: 'Odoo ERP Implementation, Setup & Customization | CloudTopia',
            description:
                'CloudTopia implements and customizes Odoo ERP around your operations — sales, inventory, accounting, purchasing, and HR in one owned system. Free consultation.',
        },
        hero: {
            eyebrow: 'Custom ERP & CRM',
            title: 'Odoo ERP Implementation, Setup & Customization',
            subtitle:
                'We turn Odoo into a system shaped around how your business actually runs — sales, inventory, accounting, purchasing, and HR connected in one platform you fully own.',
            chips: [
                'Community or Enterprise',
                'Tailored to your workflow',
                'Clean data migration',
                'Custom modules & screens',
                'Third-party integrations',
                'Role-based access',
                'Bilingual (AR + EN)',
                'Full ownership',
            ],
        },
        deliver: [
            {
                name: 'Edition & hosting setup',
                description: 'We pick the right Odoo edition, then install and host it cleanly and securely.',
                features: ['Community or Enterprise — we help you choose', 'Clean, secure install & hosting', 'Staging + production environments', 'Scheduled automated backups'],
            },
            {
                name: 'Module configuration',
                description: 'The modules you actually use, configured to match how you operate.',
                features: ['Sales, CRM & invoicing', 'Inventory with reordering rules', 'Accounting, taxes & VAT-ready', 'Purchase, HR & Manufacturing'],
            },
            {
                name: 'Custom workflows & screens',
                description: 'Tailored fields, screens, and automations — no rigid templates.',
                features: ['Custom fields & screens via Odoo Studio', 'Approval & automation rules', 'Role-based permissions', 'Bilingual AR + EN, RTL-ready'],
            },
            {
                name: 'Data migration',
                description: 'Your history brought into Odoo, cleansed and validated.',
                features: ['Map & cleanse legacy data', 'Customers, products & stock', 'Open balances & history', 'Validated, deduplicated import'],
            },
            {
                name: 'Integrations',
                description: 'Odoo connected to the rest of your stack in one flow.',
                features: ['Payment gateway & bank', 'E-commerce / website sync', 'WhatsApp & email automation', 'REST & XML-RPC APIs'],
            },
            {
                name: 'Access, reports & training',
                description: 'Reporting, permissions, and a team ready to run it.',
                features: ['Automated financial & ops reports', 'Dashboards per role', 'Hands-on team training', 'Documentation & handoff'],
            },
        ],
        outcomes: [
            { label: 'One source of truth', description: 'Sales, stock, and finance aligned in a single system.' },
            { label: 'Less manual work', description: 'Fewer re-entries and reconciliation errors across teams.' },
            { label: 'Clearer reporting', description: 'Faster month-end and real-time operational visibility.' },
            { label: 'You own it', description: 'A maintainable ERP your team controls — no lock-in.' },
        ],
        process: [
            { name: 'Discovery & mapping', detail: 'We map your real workflows, data, and roles before any configuration begins.', phase: 'Discovery' },
            { name: 'Configure & customize', detail: 'Module setup, custom screens, and automations built to your scope, with review gates.', phase: 'Build' },
            { name: 'Migrate & integrate', detail: 'Legacy data imported and validated; integrations connected and tested end to end.', phase: 'Integrate' },
            { name: 'Train & hand off', detail: 'Team training, documentation, access handoff, and a support path you own.', phase: 'Launch' },
        ],
        tech: ['Odoo', 'Odoo Studio', 'PostgreSQL', 'Python', 'XML / QWeb', 'REST & XML-RPC API', 'Docker'],
        industries: ['Retail & wholesale', 'Manufacturing', 'Trading & distribution', 'Services & agencies', 'Construction & contracting', 'Healthcare & clinics'],
        faqs: [
            { question: 'Do you use Odoo Community or Enterprise?', answer: 'Both — we recommend the edition that fits your budget and feature needs. Community keeps licensing free; Enterprise adds Studio, deeper accounting, and official support. We help you choose, and can migrate between them later.' },
            { question: 'Can you migrate our existing data and spreadsheets?', answer: 'Yes. We map, cleanse, deduplicate, and import your customers, products, stock, and history into Odoo with validation so nothing is lost or duplicated.' },
            { question: 'How long does an Odoo implementation take?', answer: 'A focused, single-department setup can launch in a few weeks. Multi-module, multi-branch rollouts are delivered in phases after discovery so each part is tested before the next goes live.' },
            { question: 'Do we own the system after launch?', answer: 'Fully. You receive the server access, database, custom modules, documentation, and training. There is no lock-in — your team can operate and extend it independently.' },
        ],
    },
}

/**
 * Arabic translations, merged field-by-field over the English entry at the getter
 * (untranslated fields fall back to EN). Built from two layers:
 *   1. generatedSubServicesAr — the seo + hero Arabic (from the i18n pass).
 *   2. subServiceContentArDeep — the deep Arabic (deliver / outcomes / process /
 *      tech / industries / faqs, plus full seo+hero for odoo-erp-implementation),
 *      merged OVER layer 1 so /ar/ sub-service pages are fully Arabic below the
 *      hero instead of falling back to English.
 */
export const subServiceContentAr: Record<string, Partial<SubServiceContent>> = (() => {
    const merged: Record<string, Partial<SubServiceContent>> = { ...generatedSubServicesAr }
    for (const slug of Object.keys(subServiceContentArDeep)) {
        merged[slug] = { ...(merged[slug] || {}), ...subServiceContentArDeep[slug] }
    }
    return merged
})()

export function getBusinessSystemsSubService(slug: string, locale = 'en'): SubServiceContent | null {
    const en = subServiceContent[slug] ?? null
    if (locale !== 'ar') return en
    const ar = subServiceContentAr[slug]
    if (!ar) return en
    if (!en) return ar as SubServiceContent
    return { ...en, ...ar } // Arabic fields override; missing ones fall back to English
}

// Per-pillar demand order (high-search/high-priority first). BS slugs were
// hand-assigned, so we list them explicitly here rather than deriving from the
// catalog names. Any sub-service not listed (e.g. absorbed legacy services) is
// appended after these, in its natural order.
const BS_PILLAR_ORDER: Record<string, string[]> = {
    'custom-erp-crm-solutions': [
        'odoo-erp-implementation',
        'sales-crm-pipeline-architecture',
        'legacy-system-migration',
        'lead-management-distribution',
        'multi-branch-operations-management',
        'customer-support-ticketing-systems',
        'ecommerce-erp-synchronization',
        'role-based-access-control',
    ],
    // AR search demand: inventory → HR → sales → order (docs/needed-redesign.md §3).
    'business-management-systems': [
        'inventory-management-systems',
        'hr-management-systems',
        'sales-management-systems',
        'order-management-systems',
    ],
    // AR search demand order per docs/needed-redesign.md §3:
    // workflow → invoicing → WhatsApp-CRM → accounting → API → proposals →
    // follow-up → e-sign → onboarding → PO approvals.
    'business-process-automation': [
        'workflow-automation',
        'automated-invoicing-payment-reminders',
        'whatsapp-crm-lead-capture',
        'accounting-system-integration',
        'cross-platform-api-integration',
        'custom-api-development',
        'automated-proposal-quotation-generation',
        'sales-followup-drip-automation',
        'esignature-contract-management',
        'employee-onboarding-automation',
        'purchase-order-approval-workflows',
    ],
}

/** All sub-services that belong to a pillar, with their slug + display copy. */
export function getBusinessSystemsSubServicesByPillar(
    pillarSlug: string,
    locale = 'en',
): { slug: string; name: string; desc: string; href: string }[] {
    const all = Object.values(subServiceContent).filter((s) => s.pillarSlug === pillarSlug)
    const bySlug = new Map(all.map((s) => [s.slug, s]))
    const ordered: SubServiceContent[] = []
    for (const slug of BS_PILLAR_ORDER[pillarSlug] ?? []) {
        const s = bySlug.get(slug)
        if (s) { ordered.push(s); bySlug.delete(slug) }
    }
    for (const s of bySlug.values()) ordered.push(s) // legacy/absorbed services last
    return ordered.map((s) => {
        const ar = locale === 'ar' ? subServiceContentAr[s.slug] : undefined
        return {
            slug: s.slug,
            name: ar?.hero?.title ?? s.hero.title,
            desc: ar?.hero?.subtitle ?? s.hero.subtitle,
            href: subServiceHref(pillarSlug, s.slug),
        }
    })
}

export const businessSystemsSubServiceSlugs = Object.keys(subServiceContent)
