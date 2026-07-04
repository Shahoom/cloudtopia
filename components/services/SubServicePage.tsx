'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, BarChart3, Bot, Building2, Check, Cloud, Database, Layers, MessageCircle, Plug, Settings, Workflow } from 'lucide-react'
import { localePath } from '@/lib/i18n/url'
import { ContactLeadForm } from '@/components/services/ContactLeadForm'
import { ServiceOverview, ServiceUseCases } from '@/components/services/SubServiceSections'
import { ProcessSwitcher, type DeliveryStep } from '@/components/services/ProcessSwitcher'
import { ServiceTechStack, type ServiceTechStackContent } from '@/components/services/ServiceTechStack'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { HorizontalScrollCards, type ScrollCardItem } from '@/components/ui/horizontal-scroll-cards'
import { FeaturesBento, type FeaturesBentoContent } from '@/components/ui/features-bento'
import { FaqAccordion } from '@/components/ui/faq-accordion'

export type SubServiceContent = {
    slug: string
    service: string
    pillarSlug: string
    pillarName: string
    seo: { title: string; description: string }
    hero: { eyebrow: string; title: string; subtitle: string; chips: string[] }
    /** "What we build" cards — each with a few included bullets. */
    deliver: { name: string; description: string; features: string[] }[]
    /** Exactly four outcomes (rendered in the bento). */
    outcomes: { label: string; description: string }[]
    /** Legacy/optional — the delivery section now uses CloudTopia's shared method. */
    process?: { name: string; detail: string; phase: string }[]
    tech?: string[]
    industries: string[]
    faqs: { question: string; answer: string }[]
    /** Optional photos for the process switcher and the "why" bento. */
    processImage?: string
    whyImage?: string
    /** Tailored technology stack (vertical tabs + logo grid). */
    techStack?: ServiceTechStackContent
}

const PROCESS_IMG = '/images/services/business-systems-development/process-team.jpeg'
const WHY_IMG = '/images/services/business-systems-development/why-workspace.webp'

const CARD_ICONS = [Layers, Workflow, Settings, Database, Plug, BarChart3]
const CARD_GRADIENTS = [
    'bg-gradient-to-r from-sky-500 to-indigo-500',
    'bg-gradient-to-r from-emerald-500 to-teal-500',
    'bg-gradient-to-r from-violet-500 to-purple-500',
    'bg-gradient-to-r from-amber-500 to-orange-500',
    'bg-gradient-to-r from-pink-500 to-rose-500',
    'bg-gradient-to-r from-blue-500 to-cyan-500',
]
const TECH_ICON_BG = ['bg-sky-100 text-sky-600', 'bg-violet-100 text-violet-600', 'bg-emerald-100 text-emerald-600', 'bg-amber-100 text-amber-600']
const WHY_BORDER = ['border-l-sky-400', 'border-l-violet-400', 'border-l-emerald-400', 'border-l-amber-400', 'border-l-pink-400', 'border-l-blue-400']

/**
 * Sub-service landing page (Business Systems). Built from the site's own
 * reusable sections on the shared AuroraBackground:
 *   dark contact hero → HorizontalScrollCards (what we build) →
 *   FeaturesBento (outcomes) → ProcessSwitcher (interactive process) →
 *   Next-gen technologies → TechnologyStackSection (homepage tech stacks) →
 *   industries → Why-choose bento → FaqAccordion → CTA.
 */
export function SubServicePage({ content, locale }: { content: SubServiceContent; locale: string }) {
    const isAr = locale === 'ar'
    const dir = isAr ? 'rtl' : 'ltr'
    const c = content
    const L = (p: string) => localePath(locale, p)

    const t = isAr
        ? {
            services: 'الخدمات',
            deliver: 'ما الذي نبنيه', deliverSub: 'ما الذي نُعدّه ونطوّره ونربطه من أجلك.',
            outcomes: 'النتائج', process: 'كيف ننفّذ',
            industries: 'القطاعات', industriesHeading: 'قطاعات نخدمها',
            faq: 'أسئلة شائعة', faqSub: 'إجابات سريعة قبل أن تبدأ.',
            ctaTitle: 'لنبنِها معاً', ctaBtn: 'تواصل عبر واتساب', ctaExplore: 'كل الخدمات',
            ctaDesc: 'لنحدد نطاق الحل المناسب لك — باستشارة مجانية ومعاينة قبل أي التزام.',
            book: 'احجز استشارة مجانية', whatsIncluded: 'ما يتضمنه:',
            outHeading: 'ما الذي يتغيّر في عملك', procHeading: 'مسار واضح حتى الإطلاق',
            procSub: 'من أول محادثة إلى نظام يملكه فريقك ويشغّله، خطوة بخطوة.',
            statTitle: 'النظام ملك لك',
            nextGenEyebrow: 'التقنيات', nextGenHeading: 'تقنيات حديثة نبني بها',
            nextGenSub: 'أدوات مثبتة نطبّقها حيث تصنع قيمة حقيقية — لا شعارات.',
            whyEyebrow: 'لماذا كلاود توبيا', whyHeading: 'لماذا تختار كلاود توبيا',
            whyPhotoTitle: 'نظامك، ملك لك', whyPhotoSub: 'مبني في عُمان لمنطقة الخليج — آمن وثنائي اللغة وتملكه بالكامل.',
            askTitle: 'لديك سؤال؟', askSub: 'تحدث مع مختص مباشرة.', ask: 'تواصل معنا',
        }
        : {
            services: 'Services',
            deliver: 'What we build', deliverSub: 'What we set up, build, and connect for you.',
            outcomes: 'Outcomes', process: 'How we deliver',
            industries: 'Industries', industriesHeading: 'Industries we serve',
            faq: 'Frequently asked questions', faqSub: 'Quick answers before you start.',
            ctaTitle: "Let's build it together", ctaBtn: 'Continue on WhatsApp', ctaExplore: 'All services',
            ctaDesc: "Let's scope the right solution for you — with a free consultation and demo preview before you commit.",
            book: 'Book a free consultation', whatsIncluded: "What's included:",
            outHeading: 'What changes in your business', procHeading: 'A clear path to launch',
            procSub: 'From the first conversation to a system your team owns and runs — step by step.',
            statTitle: 'The system is yours',
            nextGenEyebrow: 'Technology', nextGenHeading: 'Next-gen technology we build with',
            nextGenSub: 'Modern, proven tools applied where they create real value — not buzzwords.',
            whyEyebrow: 'Why CloudTopia', whyHeading: 'Why teams choose CloudTopia',
            whyPhotoTitle: 'Your system, owned by you', whyPhotoSub: 'Built in Oman for the GCC — secure, bilingual, and yours to run.',
            askTitle: 'Have a question?', askSub: 'Talk to a specialist directly.', ask: 'Contact us',
        }

    const intro = isAr ? 'مرحباً، أنا مهتم بـ' : "Hi CloudTopia, I'm interested in"
    const waHref = `https://wa.me/96895886393?text=${encodeURIComponent(`${intro}: ${c.service}`)}`

    const buildCards: ScrollCardItem[] = c.deliver.map((d, i) => {
        const Icon = CARD_ICONS[i % CARD_ICONS.length]
        return {
            name: d.name,
            description: d.description,
            features: d.features,
            icon: <Icon className="h-6 w-6 text-[#0284c7]" aria-hidden="true" />,
            gradient: CARD_GRADIENTS[i % CARD_GRADIENTS.length],
            glowColor: 'rgba(2,132,199,0.35)',
        }
    })

    const bento: FeaturesBentoContent = {
        eyebrow: t.outcomes,
        heading: t.outHeading,
        stat: { value: '100%', title: t.statTitle },
        items: c.outcomes.slice(0, 4).map((o) => ({ title: o.label, description: o.description })),
    }

    const nextGen = isAr
        ? [
            { icon: Bot, title: 'الذكاء الاصطناعي', description: 'نوظّف الذكاء الاصطناعي حيث يصنع فرقاً — أتمتة ذكية، واستخراج بيانات ومستندات، وتوقعات، ومساعدون يقلّلون العمل اليدوي.' },
            { icon: Cloud, title: 'السحابة والبنية التحتية', description: 'استضافة سحابية آمنة وقابلة للتوسّع مع نسخ احتياطي ومراقبة والاعتمادية التي يعتمد عليها عملك — في المنطقة التي تحتاجها.' },
            { icon: Workflow, title: 'الأتمتة والتكامل', description: 'نربط أدواتك في تدفّق واحد — واجهات برمجية وأتمتة قائمة على الأحداث تلغي إعادة الإدخال وتُبقي الأنظمة متزامنة.' },
            { icon: BarChart3, title: 'البيانات والتحليلات', description: 'نماذج بيانات نظيفة ولوحات تحكم وتقارير ترى بها ما يحدث فعلاً وتقرّر بأرقام تثق بها.' },
        ]
        : [
            { icon: Bot, title: 'Artificial Intelligence', description: 'AI applied where it earns its place — smart automations, document and data extraction, forecasting, and assistants that cut manual work across your operations.' },
            { icon: Cloud, title: 'Cloud & Infrastructure', description: 'Secure, scalable cloud hosting with backups, monitoring, and the uptime your business depends on — in the region you need.' },
            { icon: Workflow, title: 'Automation & Integration', description: 'Your tools connected into one flow — APIs, webhooks, and event-driven automations that remove re-entry and keep systems in sync.' },
            { icon: BarChart3, title: 'Data & Analytics', description: 'Clean data models, dashboards, and reporting so you can see what is really happening and decide on numbers you trust.' },
        ]

    const why = isAr
        ? [
            { title: 'حل مخصص', description: 'مبني حول سير عملك الفعلي، لا قالب جاهز.' },
            { title: 'ملكية كاملة', description: 'تحصل على الكود والوصول والتوثيق — دون احتكار.' },
            { title: 'تنفيذ ثنائي اللغة', description: 'عربي وإنجليزي بواجهات جاهزة لاتجاه RTL.' },
            { title: 'تكامل عملي', description: 'يرتبط بأنظمتك وأدواتك الحالية بسلاسة.' },
            { title: 'تسليم على مراحل', description: 'مراحل واضحة ومراجعة وضمان جودة قبل الإطلاق.' },
            { title: 'دعم مستمر', description: 'مسار دعم وتطوير بعد الإطلاق يملكه فريقك.' },
        ]
        : [
            { title: 'Built for you', description: 'Designed around your real workflow — not a rigid template.' },
            { title: 'Full ownership', description: 'You get the code, access, and documentation. No lock-in.' },
            { title: 'Bilingual delivery', description: 'Arabic + English with RTL-ready interfaces.' },
            { title: 'Practical integration', description: 'Connects cleanly to your existing tools and systems.' },
            { title: 'Phased delivery', description: 'Clear milestones, review gates, and QA before launch.' },
            { title: 'Ongoing support', description: 'A post-launch support and iteration path your team owns.' },
        ]

    // CloudTopia's delivery method (the agile process documented on the site).
    const delivery: DeliveryStep[] = isAr
        ? [
            { number: '01', title: 'التحديد والتخطيط', duration: '~أسبوع', description: 'نحدد المستخدمين وسير العمل والميزات والمخاطر والتكاملات ومعايير النجاح، ثم نحوّلها إلى قائمة مهام واضحة.', bullets: ['اكتشاف أصحاب المصلحة وسير العمل', 'تحديد نطاق الميزات والتكاملات', 'معايير النجاح وقائمة المهام'] },
            { number: '02', title: 'التصميم والبنية التقنية', duration: '1–2 أسبوع', description: 'نصمم تجربة المستخدم والواجهات وبنية قاعدة البيانات ومعمارية النظام ونقاط التكامل قبل بدء التطوير.', bullets: ['اتجاه التجربة والواجهات', 'نموذج البيانات ومعمارية النظام', 'خطة التكامل والأمان'] },
            { number: '03', title: 'التطوير على مراحل', duration: 'دورات أسبوعين', description: 'نطوّر على دورات قصيرة تشمل العروض والمراجعة والاختبار والتحسين المنظم قبل الانتقال للمرحلة التالية.', bullets: ['عروض عملية كل دورة', 'مراجعتك وملاحظاتك', 'اختبار وتعديلات منظمة'] },
            { number: '04', title: 'الإطلاق والتطوير المستمر', duration: 'مستمر', description: 'نطلق ونراقب ونعالج المشاكل ونحسّن الأداء ونطوّر النظام بناءً على الاستخدام الفعلي.', bullets: ['الإطلاق وترحيل البيانات', 'المراقبة والدعم', 'التحسين مع نموّ عملك'] },
        ]
        : [
            { number: '01', title: 'Define & Plan', duration: '~1 week', description: 'We define users, workflows, features, risks, integrations, and success criteria, then turn them into a clear development backlog.', bullets: ['Stakeholder & workflow discovery', 'Feature & integration scope', 'Success criteria & backlog'] },
            { number: '02', title: 'Design Architecture', duration: '1–2 weeks', description: 'We design user flows, interfaces, the database structure, system architecture, and integration points before any development starts.', bullets: ['UX & interface direction', 'Data model & system architecture', 'Integration & security plan'] },
            { number: '03', title: 'Build in Sprints', duration: '2-week cycles', description: 'We build in short cycles with demos, reviews, testing, and controlled improvements before moving forward — so you always know what is being built.', bullets: ['Working demos each cycle', 'Your review & feedback', 'QA & controlled changes'] },
            { number: '04', title: 'Release & Evolve', duration: 'Continuous', description: 'We launch, migrate your data, monitor, fix issues, improve performance, and evolve the system based on real usage.', bullets: ['Launch & data migration', 'Monitoring & support', 'Iterate as you grow'] },
        ]

    const defaultStack: ServiceTechStackContent = isAr
        ? {
            title: 'التقنيات التي نبني بها نظامك',
            subtitle: 'تقنيات حديثة ومثبتة نختارها لتناسب عملياتك — آمنة، قابلة للصيانة، وتملكها بالكامل.',
            categories: [
                { label: 'المنصّة والأطر', items: [{ name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' }, { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E' }, { name: '.NET', icon: 'https://cdn.simpleicons.org/dotnet/512BD4' }, { name: 'Java', icon: 'https://cdn.simpleicons.org/openjdk/white' }] },
                { label: 'قواعد البيانات', items: [{ name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' }, { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' }, { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/FF4438' }, { name: 'ETL / Migration' }] },
                { label: 'التكاملات والواجهات', items: [{ name: 'REST API' }, { name: 'GraphQL', icon: 'https://cdn.simpleicons.org/graphql/E10098' }, { name: 'Webhooks' }, { name: 'WhatsApp', icon: 'https://cdn.simpleicons.org/whatsapp/25D366' }] },
                { label: 'السحابة و DevOps', items: [{ name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' }, { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonwebservices/white' }, { name: 'Nginx', icon: 'https://cdn.simpleicons.org/nginx/009639' }, { name: 'CI/CD' }] },
                { label: 'الأمان والصلاحيات', items: [{ name: 'صلاحيات حسب الدور' }, { name: '2FA' }, { name: 'سجل تدقيق' }, { name: 'تشفير' }] },
                { label: 'الذكاء والأتمتة', items: [{ name: 'OCR / استخراج' }, { name: 'تنبؤ' }, { name: 'RPA' }, { name: 'مساعدون' }] },
            ],
        }
        : {
            title: 'The stack we build your system on',
            subtitle: 'Proven, modern technology chosen to fit your operations — secure, maintainable, and fully owned by you.',
            categories: [
                { label: 'Platform & Frameworks', items: [{ name: 'Python', icon: 'https://cdn.simpleicons.org/python/3776AB' }, { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/5FA04E' }, { name: '.NET', icon: 'https://cdn.simpleicons.org/dotnet/512BD4' }, { name: 'Java', icon: 'https://cdn.simpleicons.org/openjdk/white' }] },
                { label: 'Database & Data', items: [{ name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1' }, { name: 'MySQL', icon: 'https://cdn.simpleicons.org/mysql/4479A1' }, { name: 'Redis', icon: 'https://cdn.simpleicons.org/redis/FF4438' }, { name: 'ETL / Migration' }] },
                { label: 'Integrations & APIs', items: [{ name: 'REST API' }, { name: 'GraphQL', icon: 'https://cdn.simpleicons.org/graphql/E10098' }, { name: 'Webhooks' }, { name: 'WhatsApp', icon: 'https://cdn.simpleicons.org/whatsapp/25D366' }] },
                { label: 'Cloud & DevOps', items: [{ name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED' }, { name: 'AWS', icon: 'https://cdn.simpleicons.org/amazonwebservices/white' }, { name: 'Nginx', icon: 'https://cdn.simpleicons.org/nginx/009639' }, { name: 'CI/CD' }] },
                { label: 'Security & Access', items: [{ name: 'Role-based access' }, { name: '2FA' }, { name: 'Audit logs' }, { name: 'Encryption' }] },
                { label: 'AI & Automation', items: [{ name: 'OCR / Extraction' }, { name: 'Forecasting' }, { name: 'RPA' }, { name: 'Assistants' }] },
            ],
        }

    return (
        <div dir={dir} className="bg-[#f4f1f8] text-slate-900">
            {/* ── Contact hero (dark, lead capture) ────────────────────── */}
            <section className="relative overflow-hidden bg-[#070b16] text-white">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_12%_0%,rgba(245,158,11,0.12),transparent_60%),radial-gradient(ellipse_60%_60%_at_100%_100%,rgba(56,189,248,0.14),transparent_60%)]" aria-hidden="true" />
                <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:px-8 md:pt-32">
                    <div>
                        <nav className="mb-5 flex items-center gap-1.5 text-xs font-bold text-slate-400" aria-label="Breadcrumb">
                            <Link href={L('/services')} className="transition-colors hover:text-amber-300">{t.services}</Link>
                            <span aria-hidden="true">/</span>
                            <Link href={L(`/services/${c.pillarSlug}`)} className="transition-colors hover:text-amber-300">{c.pillarName}</Link>
                        </nav>
                        <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-400">{c.hero.eyebrow}</p>
                        <h1 className="mt-3 text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl" style={{ textWrap: 'balance' }}>
                            {c.hero.title}
                        </h1>
                        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">{c.hero.subtitle}</p>
                        <div className="mt-7 grid max-w-xl grid-cols-1 gap-2.5 sm:grid-cols-2">
                            {c.hero.chips.map((chip) => (
                                <span key={chip} className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.04] px-3 py-2 text-sm font-semibold text-slate-200">
                                    <Check className="h-4 w-4 shrink-0 text-amber-400" aria-hidden="true" />
                                    {chip}
                                </span>
                            ))}
                        </div>
                    </div>
                    <ContactLeadForm service={c.service} locale={locale} />
                </div>
            </section>

            {/* Plain-language overview */}
            <ServiceOverview service={c.service} pillarName={c.pillarName} locale={locale} />

            {/* ── Aurora-backed content ────────────────────────────────── */}
            <AuroraBackground showRadialGradient className="!h-auto !min-h-0 bg-lavender">
                {/* What we build */}
                <HorizontalScrollCards
                    cards={buildCards}
                    title={t.deliver}
                    subtitle={t.deliverSub}
                    whatsIncludedLabel={t.whatsIncluded}
                    isRTL={isAr}
                    variant="light"
                />

                {/* Outcomes */}
                <FeaturesBento content={bento} dir={dir} />

                {/* Interactive process switcher — CloudTopia delivery method */}
                <ProcessSwitcher
                    steps={delivery}
                    image={c.processImage ?? PROCESS_IMG}
                    eyebrow={t.process}
                    heading={t.procHeading}
                    intro={t.procSub}
                    locale={locale}
                />

                {/* Next-gen technologies */}
                <section dir={dir} className="py-14 md:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto mb-10 max-w-2xl text-center">
                            <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">{t.nextGenEyebrow}</p>
                            <h2 className="text-balance text-3xl font-black tracking-tight text-[#0f172a] sm:text-4xl">{t.nextGenHeading}</h2>
                            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-600 md:text-lg">{t.nextGenSub}</p>
                        </div>
                        <div className="grid gap-5 sm:grid-cols-2">
                            {nextGen.map((tech, i) => (
                                <div key={tech.title} className="flex gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg sm:p-7">
                                    <div className={`inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl ${TECH_ICON_BG[i % TECH_ICON_BG.length]}`}>
                                        <tech.icon className="h-7 w-7" aria-hidden="true" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#0f172a]">{tech.title}</h3>
                                        <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{tech.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Tech stacks — tailored per service */}
                <ServiceTechStack content={c.techStack ?? defaultStack} locale={locale} />

                {/* Industries */}
                <section dir={dir} className="py-12 md:py-16">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto mb-9 max-w-2xl text-center">
                            <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">{t.industries}</p>
                            <h2 className="text-balance text-3xl font-black tracking-tight text-[#0f172a] sm:text-4xl">{t.industriesHeading}</h2>
                        </div>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                            {c.industries.map((ind) => (
                                <div key={ind} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:border-sky-200 hover:shadow-md">
                                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#f4f1f8] text-[#0284c7]">
                                        <Building2 className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    <span className="text-[15px] font-semibold text-slate-700">{ind}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Who it's for / use cases */}
                <ServiceUseCases pillarSlug={c.pillarSlug} service={c.service} locale={locale} />

                {/* Why choose (bento with photo) */}
                <section dir={dir} className="py-14 md:py-20">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="mx-auto mb-10 max-w-2xl text-center">
                            <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">{t.whyEyebrow}</p>
                            <h2 className="text-balance text-3xl font-black tracking-tight text-[#0f172a] sm:text-4xl">{t.whyHeading}</h2>
                        </div>
                        <div className="grid gap-4 md:grid-cols-3">
                            {why.slice(0, 3).map((w, i) => (
                                <WhyCard key={w.title} w={w} i={i} />
                            ))}
                            <WhyCard w={why[3]} i={3} />
                            {/* Photo card (spans 2) */}
                            <div className="relative min-h-[260px] overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-br from-[#0284c7] to-[#4f46e5] md:col-span-2">
                                <Image src={c.whyImage ?? WHY_IMG} alt={t.whyPhotoTitle} fill sizes="(max-width: 768px) 100vw, 700px" className="object-cover" />
                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" aria-hidden="true" />
                                <div className="absolute inset-x-6 bottom-6">
                                    <h3 className="text-2xl font-black text-white sm:text-3xl">{t.whyPhotoTitle}</h3>
                                    <p className="mt-2 max-w-md text-[15px] leading-relaxed text-white/90">{t.whyPhotoSub}</p>
                                </div>
                            </div>
                            {why.slice(4, 6).map((w, i) => (
                                <WhyCard key={w.title} w={w} i={i + 4} />
                            ))}
                            {/* Mini CTA */}
                            <Link
                                href={L('/services')}
                                className="group flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-lg"
                            >
                                <div>
                                    <h3 className="text-base font-bold text-[#0f172a]">{t.askTitle}</h3>
                                    <p className="mt-1.5 text-sm text-slate-500">{t.askSub}</p>
                                </div>
                                <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-[#0284c7]">
                                    {t.ask}
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 rtl:rotate-180" aria-hidden="true" />
                                </span>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* FAQ */}
                <FaqAccordion
                    eyebrow={t.faq}
                    heading={isAr ? 'أسئلة شائعة' : 'Questions, answered'}
                    subheading={t.faqSub}
                    items={c.faqs.map((f) => ({ q: f.question, a: f.answer }))}
                    dir={dir}
                />

                {/* Final CTA */}
                <section dir={dir} className="px-4 pb-20 pt-4 sm:px-6 lg:px-8">
                    <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/60 md:p-12">
                        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-200/40 blur-3xl" aria-hidden="true" />
                        <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-sky-200/40 blur-3xl" aria-hidden="true" />
                        <h2 className="relative text-3xl font-black tracking-tight text-slate-900 md:text-4xl" style={{ textWrap: 'balance' }}>{t.ctaTitle}</h2>
                        <p className="relative mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600">{t.ctaDesc}</p>
                        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                            <a
                                href={waHref}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-8 py-4 text-base font-black text-white shadow-lg shadow-amber-500/25 transition hover:-translate-y-0.5 hover:bg-amber-400 sm:w-auto"
                            >
                                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                                {t.ctaBtn}
                            </a>
                            <Link href={L('/services')} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-4 text-base font-bold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 sm:w-auto">
                                {t.ctaExplore}
                                <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
                            </Link>
                        </div>
                    </div>
                </section>
            </AuroraBackground>
        </div>
    )
}

function WhyCard({ w, i }: { w: { title: string; description: string }; i: number }) {
    return (
        <div className={`rounded-2xl border border-slate-200 border-l-4 ${WHY_BORDER[i % WHY_BORDER.length]} bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}>
            <h3 className="text-lg font-bold text-[#0f172a]">{w.title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{w.description}</p>
        </div>
    )
}
