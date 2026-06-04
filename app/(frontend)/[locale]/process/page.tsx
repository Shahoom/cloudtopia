import type { Metadata } from 'next'
import Link from 'next/link'
import {
    ArrowRight,
    CheckCircle2,
    CircleDollarSign,
    ClipboardCheck,
    Code2,
    Compass,
    FileText,
    Globe2,
    Hammer,
    Layers,
    Palette,
    Rocket,
    ShieldCheck,
} from 'lucide-react'
import { canonicalUrl, localePath } from '@/lib/i18n/url'

type PageProps = {
    params: Promise<{ locale: string }>
}

const content = {
    en: {
        metaTitle: 'Delivery Process — Scope, Build, Launch & Handoff',
        metaDescription: 'CloudTopia delivery process for enterprise buyers: discovery, fixed scope, UX, bilingual content, build, QA, launch, ownership handoff, and post-launch support.',
        badge: 'Delivery process',
        title: 'A fixed-scope path from first brief to owned launch.',
        description: 'CloudTopia turns unclear digital requirements into a governed delivery plan. Every project moves through discovery, UX and content planning, implementation, QA, launch, and handoff so buyers know what is being built, who approves it, and what they own afterward.',
        primaryCta: 'Start project intake',
        secondaryCta: 'Compare pricing',
        directTitle: 'How does CloudTopia deliver digital projects?',
        directAnswer: 'CloudTopia delivers digital projects through a four-stage process: discovery and fixed scope, UX and bilingual content architecture, build and quality assurance, then launch with client-owned handoff. Each stage includes clear outputs, client sign-off, and practical documentation to reduce approval and ownership risk.',
        stepsTitle: 'The four-stage delivery path',
        stepsIntro: 'The exact timeline depends on scope, integrations, content readiness, and review speed. The operating model stays consistent across websites, ecommerce, systems, automation, AI, and cloud projects.',
        steps: [
            {
                title: 'Discovery & scope',
                timeframe: '1-3 business days',
                summary: 'We define goals, audience, market, technical constraints, integrations, content needs, and the acceptance criteria for the project.',
                activities: ['Requirement workshop or written brief review', 'Service fit, market, language, and integration mapping', 'Scope boundaries, assumptions, exclusions, and milestones'],
                signoff: 'Client sign-off: confirmed scope, package path, payment terms, and decision owners.',
                output: 'Scope document',
                icon: Compass,
            },
            {
                title: 'UX, content & architecture',
                timeframe: '3-7 business days',
                summary: 'We map the structure users and search engines need: pages, flows, content, metadata, Arabic RTL, English UX, forms, and conversion paths.',
                activities: ['Sitemap, user journeys, and conversion paths', 'Arabic and English content map with metadata requirements', 'Wireframes, interface direction, and tracking plan'],
                signoff: 'Client sign-off: approved structure, content direction, and critical user flows.',
                output: 'Architecture pack',
                icon: Palette,
            },
            {
                title: 'Build, integrations & QA',
                timeframe: '1-8+ weeks',
                summary: 'We implement the approved scope, connect systems, test responsive behavior, review bilingual content, and prepare launch-critical assets.',
                activities: ['Frontend, backend, CMS, ecommerce, automation, AI, or cloud implementation', 'Payment, analytics, CRM, email, hosting, and third-party integrations', 'Responsive QA, performance checks, forms, redirects, and structured data'],
                signoff: 'Client sign-off: staged build review, issue list, final QA approval, and launch readiness.',
                output: 'Staging build',
                icon: Hammer,
            },
            {
                title: 'Launch, handoff & support',
                timeframe: '2-5 business days',
                summary: 'We launch with a practical checklist, transfer ownership, document the working system, and define the support window or care plan.',
                activities: ['DNS, hosting, deployment, redirects, tracking, backups, and monitoring basics', 'Repository, design files, admin access, credentials inventory, and documentation', 'Post-launch fixes, care plan options, and iteration backlog'],
                signoff: 'Client sign-off: launch confirmation, Handoff pack, and post-launch support expectations.',
                output: 'Owned launch',
                icon: Rocket,
            },
        ],
        governanceTitle: 'Governance buyers can approve',
        governanceIntro: 'Before production starts, we make the high-risk items visible. That keeps procurement, founders, operators, and technical reviewers aligned around the same delivery contract.',
        governance: [
            { title: 'Scope control', body: 'Written deliverables, assumptions, exclusions, dependencies, milestones, and revision boundaries.', icon: FileText },
            { title: 'Commercial clarity', body: 'Fixed-scope package path, payment terms, optional care plan, and change-request handling.', icon: CircleDollarSign },
            { title: 'Access planning', body: 'Domain, hosting, CMS, analytics, email, payment, CRM, and third-party account inventory.', icon: ShieldCheck },
            { title: 'Bilingual readiness', body: 'Arabic RTL and English content, metadata, forms, navigation, and transactional copy planned together.', icon: Globe2 },
            { title: 'Technical QA', body: 'Responsive checks, structured data, tracking, forms, integrations, security basics, and launch checklist.', icon: ClipboardCheck },
            { title: 'Ownership handoff', body: 'Repository, documentation, deployment notes, admin guide, access list, and next-step support options.', icon: Code2 },
        ],
        handoffTitle: 'What you receive at handoff',
        handoffIntro: 'The handoff is designed for ownership, not dependency. Your team should know what was built, how it runs, who has access, and what should happen next.',
        handoff: [
            'Code repository or documented no-code configuration',
            'Hosting, deployment, environment, and backup notes',
            'Analytics, forms, pixels, events, and reporting setup summary',
            'Admin guide for CMS, store, portal, dashboard, or automation workflows',
            'Credential and access inventory for client-owned accounts',
            'Post-launch support window plus optional care plan recommendations',
        ],
        verificationTitle: 'Use the process with the rest of the buying path',
        verification: [
            { label: 'Pricing', body: 'Compare package paths and payment terms before scope is approved.', href: '/pricing' },
            { label: 'Trust center', body: 'Review ownership, security, access, and procurement controls.', href: '/trust' },
            { label: 'Projects', body: 'Check delivery evidence before choosing a project path.', href: '/projects' },
            { label: 'Services', body: 'Map the requirement to a service page and deliverables.', href: '/services' },
            { label: 'Contact', body: 'Send the brief, market, timeline, and required integrations.', href: '/contact' },
        ],
        faqTitle: 'Delivery process FAQ',
        faqs: [
            {
                question: 'How long does a CloudTopia project take?',
                answer: 'Small landing pages and QR menu systems can move quickly when content is ready. Larger websites, ecommerce stores, portals, automations, AI systems, and cloud work usually take longer because integrations, QA, and stakeholder approvals add delivery complexity.',
            },
            {
                question: 'When does the client approve the work?',
                answer: 'Client sign-off happens at the key risk points: scope, structure, staged build review, final QA, and launch. This prevents late surprises and keeps change requests separate from the approved delivery plan.',
            },
            {
                question: 'Who owns the project after launch?',
                answer: 'The client owns the approved deliverables, code, design files, accounts, domain, hosting, analytics, and connected systems unless a different arrangement is documented in writing.',
            },
            {
                question: 'Can Arabic and English be reviewed together?',
                answer: 'Yes. Arabic RTL and English reviews are treated as part of the production process. Content, navigation, forms, metadata, and transactional messages are checked before launch.',
            },
        ],
        finalTitle: 'Turn a rough brief into an approved delivery plan.',
        finalDescription: 'Send the project goal, target market, timeline, current assets, and integrations. We will reply with practical next steps within one business day.',
    },
    ar: {
        metaTitle: 'منهجية التنفيذ — النطاق والبناء والإطلاق والتسليم',
        metaDescription: 'منهجية تنفيذ كلاود توبيا للمشترين المؤسسيين: الاستكشاف، النطاق الثابت، تجربة المستخدم، المحتوى العربي والإنجليزي، البناء، الاختبار، الإطلاق، نقل الملكية، والدعم.',
        badge: 'منهجية التنفيذ',
        title: 'مسار ثابت النطاق من أول موجز إلى إطلاق يملكه العميل.',
        description: 'تحول كلاود توبيا المتطلبات الرقمية غير الواضحة إلى خطة تنفيذ منظمة. يمر كل مشروع عبر الاستكشاف، تخطيط التجربة والمحتوى، التنفيذ، الاختبار، الإطلاق، والتسليم حتى يعرف المشتري ما الذي سيُبنى، ومن يوافق عليه، وما الذي يملكه بعد ذلك.',
        primaryCta: 'ابدأ استقبال المشروع',
        secondaryCta: 'قارن الأسعار',
        directTitle: 'كيف تنفذ كلاود توبيا المشاريع الرقمية؟',
        directAnswer: 'تنفذ كلاود توبيا المشاريع الرقمية عبر أربع مراحل: الاستكشاف والنطاق الثابت، هندسة التجربة والمحتوى ثنائي اللغة، البناء وضمان الجودة، ثم الإطلاق مع تسليم يملكه العميل. تتضمن كل مرحلة مخرجات واضحة، موافقة من العميل، وتوثيقاً عملياً لتقليل مخاطر الموافقة والملكية.',
        stepsTitle: 'مسار التنفيذ من أربع مراحل',
        stepsIntro: 'يعتمد الجدول الفعلي على النطاق والتكاملات وجاهزية المحتوى وسرعة المراجعة. لكن نموذج التشغيل يبقى ثابتاً عبر المواقع والمتاجر والأنظمة والأتمتة والذكاء الاصطناعي والسحابة.',
        steps: [
            {
                title: 'الاستكشاف وتحديد النطاق',
                timeframe: '1-3 أيام عمل',
                summary: 'نحدد الأهداف والجمهور والسوق والقيود التقنية والتكاملات واحتياجات المحتوى ومعايير قبول المشروع.',
                activities: ['ورشة متطلبات أو مراجعة موجز مكتوب', 'ربط الخدمة والسوق واللغة والتكاملات', 'حدود النطاق والافتراضات والاستثناءات والمراحل'],
                signoff: 'موافقة العميل: النطاق المؤكد، مسار الباقة، شروط الدفع، وأصحاب القرار.',
                output: 'وثيقة النطاق',
                icon: Compass,
            },
            {
                title: 'التجربة والمحتوى والهندسة',
                timeframe: '3-7 أيام عمل',
                summary: 'نرسم الهيكل الذي يحتاجه المستخدمون ومحركات البحث: الصفحات، المسارات، المحتوى، الميتا، العربية RTL، التجربة الإنجليزية، النماذج، ومسارات التحويل.',
                activities: ['خريطة الموقع ورحلات المستخدم ومسارات التحويل', 'خطة محتوى عربية وإنجليزية مع متطلبات الميتا', 'وايرفريم واتجاه واجهة وخطة تتبع'],
                signoff: 'موافقة العميل: الهيكل المعتمد، اتجاه المحتوى، والمسارات الحرجة للمستخدم.',
                output: 'حزمة الهندسة',
                icon: Palette,
            },
            {
                title: 'البناء والتكاملات وضمان الجودة',
                timeframe: '1-8+ أسابيع',
                summary: 'ننفذ النطاق المعتمد، نربط الأنظمة، نختبر التجاوب، نراجع المحتوى ثنائي اللغة، ونجهز عناصر الإطلاق المهمة.',
                activities: ['تنفيذ الواجهة والخلفية وCMS والمتجر والأتمتة والذكاء الاصطناعي أو السحابة', 'تكاملات الدفع والتحليلات وCRM والبريد والاستضافة والأدوات الخارجية', 'اختبارات التجاوب والأداء والنماذج والتحويلات والبيانات المنظمة'],
                signoff: 'موافقة العميل: مراجعة نسخة الاختبار، قائمة الملاحظات، الموافقة النهائية، وجاهزية الإطلاق.',
                output: 'نسخة اختبار',
                icon: Hammer,
            },
            {
                title: 'الإطلاق والتسليم والدعم',
                timeframe: '2-5 أيام عمل',
                summary: 'نطلق المشروع بقائمة تحقق عملية، ننقل الملكية، نوثق النظام العامل، ونحدد نافذة الدعم أو خطة العناية.',
                activities: ['DNS والاستضافة والنشر والتحويلات والتتبع والنسخ الاحتياطي وأساسيات المراقبة', 'المستودع وملفات التصميم وصلاحيات الإدارة وجرد الحسابات والتوثيق', 'إصلاحات ما بعد الإطلاق وخيارات العناية وقائمة التحسينات التالية'],
                signoff: 'موافقة العميل: تأكيد الإطلاق، Handoff pack، وتوقعات الدعم بعد الإطلاق.',
                output: 'إطلاق مملوك',
                icon: Rocket,
            },
        ],
        governanceTitle: 'حوكمة يمكن للمشتري اعتمادها',
        governanceIntro: 'قبل بدء الإنتاج، نجعل العناصر عالية المخاطر واضحة. هذا يحافظ على توافق المشتريات والمؤسسين وفرق التشغيل والمراجعين التقنيين حول نفس عقد التنفيذ.',
        governance: [
            { title: 'ضبط النطاق', body: 'مخرجات مكتوبة، افتراضات، استثناءات، اعتماديات، مراحل، وحدود للمراجعات.', icon: FileText },
            { title: 'وضوح تجاري', body: 'مسار باقة ثابت النطاق، شروط دفع، خطة عناية اختيارية، وآلية طلبات التغيير.', icon: CircleDollarSign },
            { title: 'تخطيط الصلاحيات', body: 'جرد للنطاق والاستضافة وCMS والتحليلات والبريد والدفع وCRM والحسابات الخارجية.', icon: ShieldCheck },
            { title: 'جاهزية ثنائية اللغة', body: 'تخطيط العربية RTL والإنجليزية في المحتوى والميتا والنماذج والتنقل والرسائل معاً.', icon: Globe2 },
            { title: 'اختبار تقني', body: 'اختبارات التجاوب والبيانات المنظمة والتتبع والنماذج والتكاملات وأساسيات الأمان وقائمة الإطلاق.', icon: ClipboardCheck },
            { title: 'نقل الملكية', body: 'المستودع، التوثيق، ملاحظات النشر، دليل الإدارة، قائمة الصلاحيات، وخيارات الدعم التالية.', icon: Code2 },
        ],
        handoffTitle: 'ما الذي تستلمه عند التسليم',
        handoffIntro: 'التسليم مصمم للملكية لا للاعتماد الدائم. يجب أن يعرف فريقك ما الذي بُني، كيف يعمل، من يملك الصلاحيات، وما الخطوة التالية.',
        handoff: [
            'مستودع الكود أو توثيق إعدادات no-code',
            'ملاحظات الاستضافة والنشر والبيئات والنسخ الاحتياطي',
            'ملخص إعداد التحليلات والنماذج والبيكسلات والأحداث والتقارير',
            'دليل إدارة لـ CMS أو المتجر أو البوابة أو اللوحة أو الأتمتة',
            'جرد كلمات المرور والصلاحيات للحسابات التي يملكها العميل',
            'نافذة دعم بعد الإطلاق مع توصيات خطة عناية اختيارية',
        ],
        verificationTitle: 'استخدم المنهجية مع بقية مسار الشراء',
        verification: [
            { label: 'الأسعار', body: 'قارن مسارات الباقات وشروط الدفع قبل اعتماد النطاق.', href: '/pricing' },
            { label: 'مركز الثقة', body: 'راجع ضوابط الملكية والأمان والصلاحيات والمشتريات.', href: '/trust' },
            { label: 'المشاريع', body: 'تحقق من دليل التنفيذ قبل اختيار مسار المشروع.', href: '/projects' },
            { label: 'الخدمات', body: 'اربط المتطلبات بصفحة الخدمة والمخرجات.', href: '/services' },
            { label: 'التواصل', body: 'أرسل الموجز والسوق والجدول والتكاملات المطلوبة.', href: '/contact' },
        ],
        faqTitle: 'أسئلة منهجية التنفيذ',
        faqs: [
            {
                question: 'كم يستغرق مشروع كلاود توبيا؟',
                answer: 'يمكن للصفحات الصغيرة وأنظمة QR أن تتحرك بسرعة عندما يكون المحتوى جاهزاً. أما المواقع الأكبر والمتاجر والبوابات والأتمتة وأنظمة الذكاء الاصطناعي والسحابة فتحتاج وقتاً أطول لأن التكاملات والاختبار وموافقات أصحاب القرار تضيف تعقيداً.',
            },
            {
                question: 'متى يوافق العميل على العمل؟',
                answer: 'تتم موافقة العميل عند نقاط المخاطر الأساسية: النطاق، الهيكل، مراجعة نسخة الاختبار، ضمان الجودة النهائي، والإطلاق. هذا يقلل المفاجآت المتأخرة ويفصل طلبات التغيير عن خطة التنفيذ المعتمدة.',
            },
            {
                question: 'من يملك المشروع بعد الإطلاق؟',
                answer: 'يمتلك العميل المخرجات المعتمدة والكود وملفات التصميم والحسابات والنطاق والاستضافة والتحليلات والأنظمة المرتبطة ما لم يتم توثيق ترتيب مختلف كتابياً.',
            },
            {
                question: 'هل يمكن مراجعة العربية والإنجليزية معاً؟',
                answer: 'نعم. تتم مراجعة العربية RTL والإنجليزية كجزء من عملية الإنتاج. يتم فحص المحتوى والتنقل والنماذج والميتا والرسائل قبل الإطلاق.',
            },
        ],
        finalTitle: 'حوّل الموجز الأولي إلى خطة تنفيذ معتمدة.',
        finalDescription: 'أرسل هدف المشروع والسوق المستهدف والجدول والأصول الحالية والتكاملات. سنرد بخطوات عملية خلال يوم عمل واحد.',
    },
}

function pageContent(locale: string) {
    return content[(locale as keyof typeof content) || 'en'] || content.en
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale = 'en' } = await params
    const L = pageContent(locale)

    return {
        title: `${L.metaTitle} | CloudTopia`,
        description: L.metaDescription,
        alternates: {
            canonical: canonicalUrl(locale, '/process'),
            languages: {
                en: canonicalUrl('en', '/process'),
                ar: canonicalUrl('ar', '/process'),
                'x-default': canonicalUrl('en', '/process'),
            },
        },
        openGraph: {
            title: `${L.metaTitle} | CloudTopia`,
            description: L.metaDescription,
            url: canonicalUrl(locale, '/process'),
        },
    }
}

export default async function ProcessPage({ params }: PageProps) {
    const { locale = 'en' } = await params
    const L = pageContent(locale)
    const isRTL = locale === 'ar'

    const webPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: L.metaTitle,
        description: L.metaDescription,
        url: canonicalUrl(locale, '/process'),
        inLanguage: locale === 'ar' ? 'ar' : 'en',
        isPartOf: { '@type': 'WebSite', name: 'CloudTopia', url: 'https://cloudtopia.net' },
        about: {
            '@type': 'Service',
            name: 'CloudTopia digital project delivery process',
            provider: {
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
        },
    }

    const howToSchema = {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: L.stepsTitle,
        description: L.directAnswer,
        step: L.steps.map((step, index) => ({
            '@type': 'HowToStep',
            position: index + 1,
            name: step.title,
            text: `${step.summary} ${step.signoff}`,
            url: `${canonicalUrl(locale, '/process')}#step-${index + 1}`,
        })),
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

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'CloudTopia', item: canonicalUrl(locale, '/') },
            { '@type': 'ListItem', position: 2, name: L.badge, item: canonicalUrl(locale, '/process') },
        ],
    }

    return (
        <main className="min-h-screen bg-lavender" dir={isRTL ? 'rtl' : 'ltr'}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <section className="relative overflow-hidden bg-neutral-950 px-4 pb-20 pt-32 text-white sm:px-6 lg:px-8 md:pb-28 md:pt-40" data-header-theme="dark">
                <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-amber-200 via-cyan-300 to-emerald-300" />
                <div className="pointer-events-none absolute right-0 top-12 h-[420px] w-[580px] rounded-full bg-emerald-400/12 blur-[130px]" />
                <div className="pointer-events-none absolute bottom-0 left-0 h-[420px] w-[620px] rounded-full bg-cyan-400/14 blur-[140px]" />
                <div className="relative mx-auto max-w-6xl">
                    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-sm font-bold text-cyan-100 backdrop-blur">
                        <Layers className="h-4 w-4" />
                        {L.badge}
                    </span>
                    <div className="mt-8 grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
                        <div>
                            <h1 className="text-4xl font-black leading-[1.02] tracking-tight md:text-6xl lg:text-7xl">
                                {L.title}
                            </h1>
                            <p className="mt-7 max-w-3xl text-lg leading-relaxed text-white/70 md:text-xl">
                                {L.description}
                            </p>
                            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                <Link href={localePath(locale, '/contact')} className="group inline-flex items-center justify-center gap-2 rounded-md bg-white px-6 py-4 text-sm font-black text-neutral-950 transition hover:bg-cyan-100">
                                    {L.primaryCta}
                                    <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                                </Link>
                                <Link href={localePath(locale, '/pricing')} className="inline-flex items-center justify-center rounded-md border border-white/20 px-6 py-4 text-sm font-black text-white transition hover:border-cyan-200 hover:bg-white/10">
                                    {L.secondaryCta}
                                </Link>
                            </div>
                        </div>

                        <div className="rounded-lg border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur">
                            <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">{L.directTitle}</p>
                            <p className="mt-4 text-base leading-relaxed text-white/72">{L.directAnswer}</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-4 py-20 sm:px-6 lg:px-8 md:py-24">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-10 max-w-3xl">
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-primary-700">{L.stepsTitle}</p>
                        <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-5xl">{L.stepsTitle}</h2>
                        <p className="mt-5 text-lg leading-relaxed text-neutral-600">{L.stepsIntro}</p>
                    </div>
                    <div className="grid gap-5">
                        {L.steps.map((step, index) => {
                            const Icon = step.icon
                            return (
                                <article id={`step-${index + 1}`} key={step.title} className="grid gap-5 rounded-lg border border-neutral-200 bg-white p-6 shadow-sm md:grid-cols-[12rem_1fr] md:p-7">
                                    <div className="flex items-start gap-4 md:block">
                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-neutral-950 text-cyan-200">
                                            <Icon className="h-5 w-5" />
                                        </div>
                                        <div className="md:mt-5">
                                            <p className="text-sm font-black text-primary-700">{String(index + 1).padStart(2, '0')}</p>
                                            <p className="mt-1 text-xs font-black uppercase tracking-[0.16em] text-neutral-500">{step.timeframe}</p>
                                            <p className="mt-3 inline-flex rounded-md bg-lavender px-3 py-1 text-xs font-black text-neutral-700">{step.output}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black tracking-tight text-neutral-950">{step.title}</h3>
                                        <p className="mt-3 text-base leading-relaxed text-neutral-600">{step.summary}</p>
                                        <div className="mt-5 grid gap-3 lg:grid-cols-[1fr_0.9fr]">
                                            <div className="grid gap-2">
                                                {step.activities.map((activity) => (
                                                    <div key={activity} className="flex gap-2 rounded-md bg-lavender px-3 py-2">
                                                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
                                                        <p className="text-sm font-semibold leading-relaxed text-neutral-700">{activity}</p>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="rounded-md border border-cyan-200 bg-cyan-50 p-4">
                                                <p className="text-sm font-black text-cyan-900">{step.signoff}</p>
                                            </div>
                                        </div>
                                    </div>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-white px-4 py-20 sm:px-6 lg:px-8 md:py-24">
                <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.88fr_1.12fr]">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-4 py-1.5 text-sm font-bold text-white">
                            <ShieldCheck className="h-4 w-4 text-cyan-300" />
                            {L.governanceTitle}
                        </span>
                        <h2 className="mt-6 text-3xl font-black tracking-tight text-neutral-950 md:text-5xl">{L.governanceTitle}</h2>
                        <p className="mt-5 text-lg leading-relaxed text-neutral-600">{L.governanceIntro}</p>
                    </div>
                    <div className="grid gap-4 sm:grid-cols-2">
                        {L.governance.map((item) => {
                            const Icon = item.icon
                            return (
                                <article key={item.title} className="rounded-lg border border-neutral-200 bg-lavender p-5">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-md bg-white text-primary-700 shadow-sm">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h3 className="mt-4 text-lg font-black text-neutral-950">{item.title}</h3>
                                    <p className="mt-2 text-sm leading-relaxed text-neutral-600">{item.body}</p>
                                </article>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="px-4 py-20 sm:px-6 lg:px-8 md:py-24">
                <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
                    <div>
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-primary-700">{L.handoffTitle}</p>
                        <h2 className="mt-3 text-3xl font-black tracking-tight text-neutral-950 md:text-5xl">{L.handoffTitle}</h2>
                        <p className="mt-5 text-lg leading-relaxed text-neutral-600">{L.handoffIntro}</p>
                    </div>
                    <div className="grid gap-3">
                        {L.handoff.map((item) => (
                            <div key={item} className="flex gap-3 rounded-lg border border-neutral-200 bg-white p-4 shadow-sm">
                                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                                <p className="text-sm font-semibold leading-relaxed text-neutral-700">{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-neutral-950 px-4 py-20 text-white sm:px-6 lg:px-8 md:py-24" data-header-theme="dark">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-10">
                        <p className="text-xs font-black uppercase tracking-[0.22em] text-cyan-200">{L.verificationTitle}</p>
                        <h2 className="mt-3 max-w-4xl text-3xl font-black tracking-tight md:text-5xl">{L.verificationTitle}</h2>
                    </div>
                    <div className="grid gap-4 md:grid-cols-5">
                        {L.verification.map((item) => (
                            <Link key={item.href} href={localePath(locale, item.href)} className="group flex min-h-44 flex-col justify-between rounded-lg border border-white/10 bg-white/[0.05] p-5 transition hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300/10">
                                <div>
                                    <FileText className="h-5 w-5 text-cyan-300" />
                                    <h3 className="mt-4 text-lg font-black">{item.label}</h3>
                                    <p className="mt-2 text-xs leading-relaxed text-white/58">{item.body}</p>
                                </div>
                                <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-cyan-200">
                                    {item.label}
                                    <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="px-4 py-20 sm:px-6 lg:px-8 md:py-24">
                <div className="mx-auto max-w-4xl">
                    <h2 className="text-3xl font-black tracking-tight text-neutral-950 md:text-4xl">{L.faqTitle}</h2>
                    <div className="mt-10 space-y-4">
                        {L.faqs.map((faq) => (
                            <article key={faq.question} className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm">
                                <h3 className="text-lg font-black text-neutral-950">{faq.question}</h3>
                                <p className="mt-3 text-base leading-relaxed text-neutral-600">{faq.answer}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="bg-eerie px-4 py-20 text-white sm:px-6 lg:px-8 md:py-28" data-header-theme="dark">
                <div className="mx-auto max-w-3xl text-center">
                    <h2 className="text-3xl font-black tracking-tight md:text-5xl">{L.finalTitle}</h2>
                    <p className="mt-5 text-lg leading-relaxed text-white/70">{L.finalDescription}</p>
                    <Link href={localePath(locale, '/contact')} className="mt-8 inline-flex items-center justify-center gap-2 rounded-md bg-white px-7 py-4 text-sm font-black text-eerie transition hover:bg-cyan-100">
                        {L.primaryCta}
                        <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </Link>
                </div>
            </section>
        </main>
    )
}
