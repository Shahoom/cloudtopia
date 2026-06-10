import type { Metadata } from 'next'
import Link from 'next/link'
import {
    ArrowRight,
    Building2,
    CheckCircle2,
    CircleDollarSign,
    FileText,
    Globe2,
    Layers,
    ShieldCheck,
} from 'lucide-react'
import { canonicalUrl, localePath } from '@/lib/i18n/url'

type PageProps = {
    params: Promise<{ locale: string }>
}

const content = {
    en: {
        metaTitle: 'Trust Center — Security, Ownership & Enterprise Delivery',
        metaDescription: 'CloudTopia trust center for enterprise buyers: fixed scope, code ownership, account handoff, bilingual Arabic + English delivery, privacy, security, and procurement-ready project governance.',
        badge: 'Trust center',
        title: 'Enterprise delivery without hidden ownership risk.',
        description: 'CloudTopia helps buyers reduce digital project risk before production starts. We document scope, pricing, account ownership, access, handoff, and support expectations so teams can approve work with fewer unknowns.',
        primaryCta: 'Start a governed intake',
        secondaryCta: 'Compare pricing',
        directTitle: 'What can enterprise buyers verify before choosing CloudTopia?',
        directAnswer: 'Enterprise buyers can verify CloudTopia pricing, project proof, service scope, market readiness, account ownership expectations, and bilingual Arabic plus English delivery before booking a call. The goal is to make procurement, technical review, and stakeholder approval easier before production starts.',
        approachTitle: 'A trust center built around evidence, not promises.',
        approachIntro: 'CloudTopia makes the risky parts of a digital build inspectable before work starts. Buyers can see how ownership, access, launch quality, and support boundaries will be handled instead of relying on vague assurances.',
        approach: [
            {
                title: 'Ownership ledger',
                body: 'We identify who owns the domain, hosting, repository, CMS, analytics, payment gateways, source files, and operational accounts.',
            },
            {
                title: 'Access protocol',
                body: 'We prefer client-owned accounts, role-based invitations, environment separation, and documented handoff over shared personal logins.',
            },
            {
                title: 'Launch evidence',
                body: 'Launch readiness is checked through forms, redirects, metadata, responsive QA, tracking, content review, and structured-data basics.',
            },
            {
                title: 'Support boundaries',
                body: 'The post-launch window, care plan options, and change-request path are visible before production begins.',
            },
        ],
        pillarsTitle: 'Trust pillars',
        pillars: [
            {
                title: 'Scope and pricing clarity',
                description: 'We define deliverables, milestones, revision boundaries, and payment terms before build work begins.',
                icon: CircleDollarSign,
            },
            {
                title: 'Client-owned handoff',
                description: 'Domain, hosting, repository, analytics, payment gateways, and design assets are prepared for client ownership.',
                icon: FileText,
            },
            {
                title: 'Bilingual delivery controls',
                description: 'Arabic RTL and English UX, navigation, content, metadata, and conversion paths are planned together.',
                icon: Globe2,
            },
            {
                title: 'Security-minded implementation',
                description: 'We keep secrets out of source, separate environments, use role-based access, and document operational dependencies.',
                icon: ShieldCheck,
            },
        ],
        governanceTitle: 'How we reduce implementation risk',
        governanceIntro: 'Every serious project needs a visible operating system. These are the controls we use to keep stakeholders aligned from discovery through launch.',
        governance: [
            'Written scope, assumptions, exclusions, and milestone acceptance criteria',
            'Access inventory for domains, hosting, CMS, analytics, email, payment gateways, and third-party tools',
            'Bilingual content plan covering Arabic RTL, English, metadata, form labels, and transactional copy',
            'Launch checklist covering redirects, tracking, SEO basics, backups, security headers, and ownership transfer',
            'Post-launch support window and optional care plan for fixes, updates, monitoring, and iteration',
        ],
        buyerTitle: 'Useful for procurement, founders, and operators',
        buyerCards: [
            {
                title: 'For procurement',
                body: 'Clear package paths, fixed-scope proposal language, payment terms, and deliverable ownership.',
            },
            {
                title: 'For technical reviewers',
                body: 'Stack transparency, access planning, repository handoff, deployment notes, and operational dependencies.',
            },
            {
                title: 'For business teams',
                body: 'Conversion goals, service coverage, regional payment readiness, bilingual content, and measurable next steps.',
            },
        ],
        verificationTitle: 'Buyer verification paths',
        verification: [
            { label: 'Pricing', body: 'Review fixed-scope package paths and payment terms.', href: '/pricing' },
            { label: 'Projects', body: 'See delivery evidence and case-study style project details.', href: '/projects' },
            { label: 'Services', body: 'Map your requirement to the service taxonomy.', href: '/services' },
            { label: 'Markets', body: 'Check regional payment, tax, and language readiness.', href: '/locations' },
            { label: 'Contact', body: 'Send a project brief with scope, market, timeline, and integrations.', href: '/contact' },
        ],
        faqTitle: 'Trust center FAQ',
        faqs: [
            {
                question: 'Who owns the code and accounts after launch?',
                answer: 'The client owns the code, design files, domain, hosting, analytics, and connected third-party accounts at launch unless a different agreement is documented in writing.',
            },
            {
                question: 'How does CloudTopia handle access and credentials?',
                answer: 'Access is planned before implementation. We prefer client-owned accounts, role-based invitations, environment separation, and documented handoff instead of shared personal logins.',
            },
            {
                question: 'Can CloudTopia support Arabic and English review cycles?',
                answer: 'Yes. Arabic RTL and English content, navigation, metadata, forms, and transactional messages are treated as production requirements, not late translation tasks.',
            },
            {
                question: 'What happens after launch?',
                answer: 'Projects include an agreed support window for fixes and small adjustments. Ongoing care plans can cover updates, monitoring, content changes, backups, and iteration.',
            },
        ],
        finalTitle: 'Make the risky parts visible before production starts.',
        finalDescription: 'Send the project scope, target market, systems involved, and timeline. We will reply with practical next steps within one business day.',
    },
    ar: {
        metaTitle: 'مركز الثقة — الأمان والملكية والتنفيذ المؤسسي',
        metaDescription: 'مركز ثقة كلاود توبيا للمشترين المؤسسيين: نطاق ثابت، ملكية الكود، تسليم الحسابات، تنفيذ عربي وإنجليزي، الخصوصية، الأمان، وحوكمة مشروع جاهزة للمشتريات.',
        badge: 'مركز الثقة',
        title: 'تنفيذ مؤسسي بدون مخاطر ملكية مخفية.',
        description: 'تساعد كلاود توبيا المشترين على تقليل مخاطر المشاريع الرقمية قبل بدء الإنتاج. نوثق النطاق والسعر وملكية الحسابات والصلاحيات والتسليم والدعم حتى تتم الموافقة بوضوح أكبر.',
        primaryCta: 'ابدأ استقبالاً منظماً',
        secondaryCta: 'قارن الأسعار',
        directTitle: 'ما الذي يمكن للمشتري المؤسسي التحقق منه قبل اختيار كلاود توبيا؟',
        directAnswer: 'يمكن للمشترين المؤسسيين التحقق من أسعار كلاود توبيا، دليل المشاريع، نطاق الخدمات، جاهزية الأسواق، توقعات ملكية الحسابات، والتنفيذ العربي والإنجليزي قبل حجز مكالمة. الهدف هو تسهيل المشتريات والمراجعة التقنية وموافقة أصحاب القرار قبل بدء الإنتاج.',
        approachTitle: 'مركز ثقة مبني على الأدلة، لا الوعود.',
        approachIntro: 'تجعل كلاود توبيا الأجزاء عالية المخاطر في المشروع الرقمي قابلة للفحص قبل بدء العمل. يستطيع المشتري رؤية طريقة التعامل مع الملكية، الصلاحيات، جودة الإطلاق، وحدود الدعم بدلاً من الاكتفاء بطمأنة عامة.',
        approach: [
            {
                title: 'سجل الملكية',
                body: 'نحدد من يملك النطاق، الاستضافة، المستودع، CMS، التحليلات، بوابات الدفع، ملفات المصدر، والحسابات التشغيلية.',
            },
            {
                title: 'بروتوكول الصلاحيات',
                body: 'نفضل حسابات يملكها العميل، دعوات حسب الدور، فصل البيئات، وتسليم موثق بدلاً من مشاركة حسابات شخصية.',
            },
            {
                title: 'دليل جاهزية الإطلاق',
                body: 'تتم مراجعة النماذج، التحويلات، الميتا، التجاوب، التتبع، المحتوى، وأساسيات البيانات المنظمة قبل الإطلاق.',
            },
            {
                title: 'حدود الدعم',
                body: 'تظهر نافذة دعم ما بعد الإطلاق، خيارات خطة العناية، ومسار طلبات التغيير قبل بدء الإنتاج.',
            },
        ],
        pillarsTitle: 'ركائز الثقة',
        pillars: [
            {
                title: 'وضوح النطاق والسعر',
                description: 'نحدد المخرجات والمراحل وحدود المراجعات وشروط الدفع قبل بدء البناء.',
                icon: CircleDollarSign,
            },
            {
                title: 'تسليم يملكه العميل',
                description: 'نجهز النطاق والاستضافة والمستودع والتحليلات وبوابات الدفع وملفات التصميم لملكية العميل.',
                icon: FileText,
            },
            {
                title: 'ضوابط تنفيذ ثنائية اللغة',
                description: 'نخطط لتجربة العربية RTL والإنجليزية والتنقل والمحتوى والميتا ومسارات التحويل معاً.',
                icon: Globe2,
            },
            {
                title: 'تنفيذ واعٍ بالأمان',
                description: 'نبقي الأسرار خارج الكود، نفصل البيئات، نستخدم صلاحيات حسب الدور، ونوثق الاعتمادات التشغيلية.',
                icon: ShieldCheck,
            },
        ],
        governanceTitle: 'كيف نقلل مخاطر التنفيذ',
        governanceIntro: 'كل مشروع جاد يحتاج نظام تشغيل واضحاً. هذه الضوابط تساعد أصحاب القرار على البقاء متوافقين من الاستكشاف حتى الإطلاق.',
        governance: [
            'نطاق مكتوب، افتراضات، استثناءات، ومعايير قبول لكل مرحلة',
            'جرد صلاحيات للنطاق والاستضافة وCMS والتحليلات والبريد وبوابات الدفع والأدوات الخارجية',
            'خطة محتوى ثنائية اللغة تغطي العربية RTL والإنجليزية والميتا وتسميات النماذج والرسائل',
            'قائمة إطلاق تشمل التحويلات والتتبع وأساسيات SEO والنسخ الاحتياطي وترويسات الأمان ونقل الملكية',
            'نافذة دعم بعد الإطلاق وخطة عناية اختيارية للإصلاحات والتحديثات والمراقبة والتحسين',
        ],
        buyerTitle: 'مفيد للمشتريات والمؤسسين وفرق التشغيل',
        buyerCards: [
            {
                title: 'لفرق المشتريات',
                body: 'مسارات باقات واضحة، لغة عرض ثابت النطاق، شروط دفع، وملكية مخرجات موثقة.',
            },
            {
                title: 'للمراجعين التقنيين',
                body: 'شفافية في التقنية، تخطيط الصلاحيات، تسليم المستودع، ملاحظات النشر، والاعتمادات التشغيلية.',
            },
            {
                title: 'لفرق الأعمال',
                body: 'أهداف تحويل، تغطية خدمات، جاهزية دفع إقليمية، محتوى ثنائي اللغة، وخطوات تالية قابلة للقياس.',
            },
        ],
        verificationTitle: 'مسارات تحقق للمشتري',
        verification: [
            { label: 'الأسعار', body: 'راجع مسارات الباقات ثابتة النطاق وشروط الدفع.', href: '/pricing' },
            { label: 'المشاريع', body: 'شاهد دليل التنفيذ وتفاصيل المشاريع بأسلوب دراسة حالة.', href: '/projects' },
            { label: 'الخدمات', body: 'اربط متطلباتك بخريطة الخدمات.', href: '/services' },
            { label: 'الأسواق', body: 'تحقق من جاهزية الدفع والضريبة واللغة حسب السوق.', href: '/locations' },
            { label: 'التواصل', body: 'أرسل موجز مشروع بالنطاق والسوق والجدول والتكاملات.', href: '/contact' },
        ],
        faqTitle: 'أسئلة مركز الثقة',
        faqs: [
            {
                question: 'من يملك الكود والحسابات بعد الإطلاق؟',
                answer: 'يمتلك العميل الكود وملفات التصميم والنطاق والاستضافة والتحليلات والحسابات الخارجية عند الإطلاق ما لم يتم توثيق اتفاق مختلف كتابياً.',
            },
            {
                question: 'كيف تتعامل كلاود توبيا مع الصلاحيات وكلمات المرور؟',
                answer: 'نخطط للصلاحيات قبل التنفيذ. نفضل حسابات يملكها العميل، دعوات حسب الدور، فصل البيئات، وتسليم موثق بدلاً من مشاركة حسابات شخصية.',
            },
            {
                question: 'هل تدعم كلاود توبيا دورات مراجعة عربية وإنجليزية؟',
                answer: 'نعم. المحتوى العربي RTL والإنجليزي والتنقل والميتا والنماذج والرسائل تُعامل كمتطلبات إنتاجية، لا كمهمة ترجمة متأخرة.',
            },
            {
                question: 'ماذا يحدث بعد الإطلاق؟',
                answer: 'تتضمن المشاريع نافذة دعم متفق عليها للإصلاحات والتعديلات الصغيرة. ويمكن لخطط العناية تغطية التحديثات والمراقبة وتغييرات المحتوى والنسخ الاحتياطي والتحسين.',
            },
        ],
        finalTitle: 'اجعل الأجزاء الخطرة واضحة قبل بدء الإنتاج.',
        finalDescription: 'أرسل نطاق المشروع والسوق المستهدف والأنظمة المعنية والجدول الزمني. سنرد بخطوات عملية خلال يوم عمل واحد.',
    },
}

function pageContent(locale: string) {
    return content[(locale as keyof typeof content) || 'en'] || content.en
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale = 'en' } = await params
    const L = pageContent(locale)

    return {
        title: L.metaTitle,
        description: L.metaDescription,
        alternates: {
            canonical: canonicalUrl(locale, '/trust'),
            languages: {
                en: canonicalUrl('en', '/trust'),
                ar: canonicalUrl('ar', '/trust'),
                'x-default': canonicalUrl('en', '/trust'),
            },
        },
        openGraph: {
            title: `${L.metaTitle} | CloudTopia`,
            description: L.metaDescription,
            url: canonicalUrl(locale, '/trust'),
        },
    }
}

export default async function TrustPage({ params }: PageProps) {
    const { locale = 'en' } = await params
    const L = pageContent(locale)
    const isRTL = locale === 'ar'

    const webPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: L.metaTitle,
        description: L.metaDescription,
        url: canonicalUrl(locale, '/trust'),
        inLanguage: locale === 'ar' ? 'ar' : 'en',
        isPartOf: { '@type': 'WebSite', name: 'CloudTopia', url: 'https://cloudtopia.net' },
        about: {
            '@type': 'Organization',
            name: 'CloudTopia',
            url: 'https://cloudtopia.net',
            contactPoint: {
                '@type': 'ContactPoint',
                contactType: 'project intake',
                email: 'info@cloudtopia.net',
                availableLanguage: ['English', 'Arabic'],
            },
        },
    }

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: L.faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
    }

    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: L.verificationTitle,
        itemListElement: L.verification.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.label,
            url: canonicalUrl(locale, item.href),
        })),
    }

    return (
        <main className="min-h-screen bg-[#f4f1f8]" dir={isRTL ? 'rtl' : 'ltr'}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />

            <section className="relative overflow-hidden bg-neutral-950 px-4 pb-20 pt-32 text-white sm:px-6 lg:px-8 md:pb-28 md:pt-40" data-header-theme="dark">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-500 via-sky-300 to-sky-600" />
                <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[760px] -translate-x-1/2 rounded-full bg-sky-500/15 blur-[140px]" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.05]" style={{ backgroundImage: 'linear-gradient(to right,#fff 1px,transparent 1px),linear-gradient(to bottom,#fff 1px,transparent 1px)', backgroundSize: '64px 64px' }} aria-hidden="true" />
                <div className="relative mx-auto max-w-6xl">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-sm font-bold text-sky-100 backdrop-blur">
                        <ShieldCheck className="h-4 w-4" />
                        {L.badge}
                    </span>
                    <div className="mt-8 grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
                        <div>
                            <h1 className="text-4xl font-black leading-[1.02] tracking-tight text-white md:text-6xl lg:text-7xl">
                                {L.title}
                            </h1>
                            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">
                                {L.description}
                            </p>
                            <div className="mt-7 flex flex-wrap gap-2.5">
                                {L.pillars.map((pillar) => (
                                    <span key={pillar.title} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.06] px-3.5 py-1.5 text-xs font-bold text-white/80 backdrop-blur">
                                        <CheckCircle2 className="h-3.5 w-3.5 text-sky-300" aria-hidden="true" />
                                        {pillar.title}
                                    </span>
                                ))}
                            </div>
                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <Link href={localePath(locale, '/contact')} className="group inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-4 text-sm font-black text-neutral-950 transition hover:bg-sky-100">
                                    {L.primaryCta}
                                    <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                                </Link>
                                <Link href={localePath(locale, '/pricing')} className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-4 text-sm font-black text-white transition hover:border-sky-200 hover:bg-white/10">
                                    {L.secondaryCta}
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur">
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-200">{L.directTitle}</p>
                            <p className="mt-4 text-base leading-relaxed text-white/72">{L.directAnswer}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[#f4f1f8] px-4 py-20 sm:px-6 lg:px-8 md:py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-10 max-w-3xl">
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-sky-700">{L.pillarsTitle}</p>
                        <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-5xl">{L.pillarsTitle}</h2>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {L.pillars.map((pillar) => {
                            const Icon = pillar.icon
                            return (
                                <article
                                    key={pillar.title}
                                    className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_42px_rgba(27,27,35,0.06)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_rgba(2,132,199,0.12)]"
                                >
                                    <div className="pointer-events-none absolute -end-8 -top-8 h-24 w-24 rounded-full bg-sky-500/[0.06] blur-2xl transition-colors duration-300 group-hover:bg-sky-500/[0.12]" aria-hidden="true" />
                                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-sky-50 text-sky-700 ring-1 ring-sky-100">
                                        <Icon className="h-6 w-6" aria-hidden="true" />
                                    </div>
                                    <h3 className="text-lg font-black leading-tight text-neutral-950">{pillar.title}</h3>
                                    <p className="mt-3 text-sm leading-relaxed text-neutral-600">{pillar.description}</p>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 md:py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-10 grid gap-6 lg:grid-cols-[0.42fr_1fr] lg:items-end">
                        <div>
                            <span className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-4 py-1.5 text-sm font-black text-white">
                                <ShieldCheck className="h-4 w-4 text-sky-200" />
                                {L.badge}
                            </span>
                            <h2 className="mt-6 text-3xl font-black tracking-tight text-neutral-950 md:text-5xl">{L.approachTitle}</h2>
                        </div>
                        <p className="max-w-3xl border-s-4 border-sky-500 bg-[#f4f1f8] px-5 py-4 text-base font-semibold leading-8 text-neutral-700">
                            {L.approachIntro}
                        </p>
                    </div>
                    <div className="grid gap-px border border-neutral-200 bg-neutral-200 md:grid-cols-2 lg:grid-cols-4">
                        {L.approach.map((item, index) => (
                            <article key={item.title} className="min-h-72 bg-white p-6 transition-colors duration-200 hover:bg-[#f4f1f8]/40">
                                <div className="mb-10 flex items-center justify-between gap-3">
                                    <FileText className="h-5 w-5 text-sky-700" />
                                    <span className="font-mono text-xs font-black text-neutral-400">{String(index + 1).padStart(2, '0')}</span>
                                </div>
                                <h3 className="text-xl font-black text-neutral-950">{item.title}</h3>
                                <p className="mt-4 text-sm font-semibold leading-7 text-neutral-600">{item.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-neutral-50/60 border-y border-neutral-200/80 px-4 py-20 sm:px-6 lg:px-8 md:py-24">
                <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr]">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-4 py-1.5 text-sm font-bold text-white">
                            <Building2 className="h-4 w-4 text-sky-300" />
                            {locale === 'ar' ? 'الحوكمة' : 'Governance'}
                        </span>
                        <h2 className="mt-6 text-3xl font-black tracking-tight text-neutral-950 md:text-5xl">
                          {L.governanceTitle}
                        </h2>
                        <p className="mt-5 text-lg leading-relaxed text-neutral-600">{L.governanceIntro}</p>
                    </div>
                    <div className="grid gap-3">
                        {L.governance.map((item) => (
                            <div key={item} className="flex gap-3 rounded-2xl border border-neutral-200/60 bg-white p-4 shadow-sm">
                                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                                <p className="text-sm font-semibold leading-relaxed text-neutral-700">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 md:py-24">
                <div className="mx-auto max-w-6xl">
                    <h2 className="max-w-3xl text-3xl font-black tracking-tight text-neutral-950 md:text-5xl">{L.buyerTitle}</h2>
                    <div className="mt-10 grid gap-4 md:grid-cols-3">
                        {L.buyerCards.map((card) => (
                            <article key={card.title} className="rounded-2xl border border-neutral-200/60 bg-neutral-50/50 p-7 shadow-sm">
                                <h3 className="text-xl font-black text-neutral-950">{card.title}</h3>
                                <p className="mt-4 text-sm leading-relaxed text-neutral-600">{card.body}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-neutral-50/40 border-t border-neutral-200/80 px-4 py-20 sm:px-6 lg:px-8 md:py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
                        <div>
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-primary-700">{L.verificationTitle}</p>
                            <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-5xl">{L.verificationTitle}</h2>
                        </div>
                    </div>
                    <div className="grid gap-4 md:grid-cols-5">
                        {L.verification.map((item) => (
                            <Link key={item.href} href={localePath(locale, item.href)} className="group flex min-h-44 flex-col justify-between rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-primary-500 hover:shadow-lg hover:shadow-sky-950/5">
                                <div>
                                    <FileText className="h-5 w-5 text-primary-600" />
                                    <h3 className="mt-4 text-lg font-black text-neutral-950">{item.label}</h3>
                                    <p className="mt-2 text-xs leading-relaxed text-neutral-600">{item.body}</p>
                                </div>
                                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-primary-700">
                                    {item.label}
                                    <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-white border-t border-neutral-200/80 px-4 py-20 sm:px-6 lg:px-8 md:py-24">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">{L.faqTitle}</h2>
                    <div className="mt-10 space-y-4">
                        {L.faqs.map((faq) => (
                            <article key={faq.question} className="rounded-2xl border border-neutral-200/60 bg-neutral-50/30 p-6 shadow-sm">
                                <h3 className="text-lg font-black text-neutral-950">{faq.question}</h3>
                                <p className="mt-3 text-base leading-relaxed text-neutral-600">{faq.answer}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-neutral-950 px-4 py-20 text-white sm:px-6 lg:px-8 md:py-28" data-header-theme="dark">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">{L.finalTitle}</h2>
                    <p className="mt-5 text-lg leading-relaxed text-white/70">{L.finalDescription}</p>
                    <Link href={localePath(locale, '/contact')} className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-white px-7 py-4 text-sm font-black text-neutral-950 transition hover:bg-sky-100">
                        {L.primaryCta}
                        <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </Link>
                </div>
            </section>
        </main>
    )
}
