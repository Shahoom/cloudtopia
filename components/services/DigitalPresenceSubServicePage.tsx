import Link from 'next/link'
import { ArrowRight, MessageCircle, Search, PenTool, Code2, Rocket, ShieldCheck, Globe, Sparkles, Headphones } from 'lucide-react'
import { HeroGeometric } from '@/components/ui/shape-landing-hero'
import { FeaturesBento, type FeaturesBentoContent } from '@/components/ui/features-bento'
import { FaqAccordion } from '@/components/ui/faq-accordion'
import { localePath } from '@/lib/i18n/url'
import { SubServiceContactHero } from '@/components/services/SubServiceContactHero'
import { getStructuredPillarBySlug } from '@/lib/services/structured-catalog'
import { ProjectsShowcase } from '@/components/ui/projects-showcase'
import { getAllProjects, type Project } from '@/lib/projects'
import { ServiceOverview, ServiceDeliverables, ServiceUseCases } from '@/components/services/SubServiceSections'

export type DPSubServiceContent = {
    slug: string
    service: string
    pillarSlug: string
    pillarName: string
    seo: { title: string; description: string }
    hero: { badge: string; title1: string; title2: string; subtitle: string }
    features: FeaturesBentoContent
    faqs: { question: string; answer: string }[]
}

// Pillars where a website/portfolio showcase is genuinely on-topic, so the
// "Featured work" section only appears where real client work is relevant.
const PORTFOLIO_PILLARS = new Set([
    'website-development',
    'ecommerce-development',
    'ui-ux-design-branding',
])

/**
 * Digital Presence sub-service page — the bespoke "portfolio-website" design:
 * contact hero → geometric hero → bento features → how-we-deliver → why-us →
 * featured work → FAQ → CTA. Mirrors the website-service layout so every DP
 * sub-service shares one richer design with tailored content.
 */
export async function DigitalPresenceSubServicePage({ content, locale }: { content: DPSubServiceContent; locale: string }) {
    const isAr = locale === 'ar'
    const dir = isAr ? 'rtl' : 'ltr'
    const sl = isAr ? 'ar' : 'en'
    const c = content
    const waText = `${isAr ? 'مرحباً، أنا مهتم بـ' : "Hi CloudTopia, I'm interested in"}: ${c.service}`
    const waHref = `https://wa.me/96895886393?text=${encodeURIComponent(waText)}`

    const pillarHref = getStructuredPillarBySlug(c.pillarSlug)?.href
    // E-commerce & social sub-pages lead with the contact hero only (no second
    // geometric hero); website + other DP pages keep the geometric hero.
    const showGeometricHero = !['ecommerce-development', 'social-media-management'].includes(c.pillarSlug)

    // Featured work — real client projects from the CMS, prioritising featured
    // ones. Only loaded/shown for portfolio-relevant pillars.
    const showWork = PORTFOLIO_PILLARS.has(c.pillarSlug)
    let projects: Project[] = []
    if (showWork) {
        const all = await getAllProjects(locale)
        const featured = all.filter((p) => p.featured)
        projects = (featured.length >= 3 ? featured : all).slice(0, 6)
    }
    const isEcom = c.pillarSlug === 'ecommerce-development'

    const steps = [
        {
            icon: Search,
            title: isAr ? 'الاكتشاف والاستراتيجية' : 'Discovery & strategy',
            desc: isAr ? 'نفهم أهدافك وجمهورك وما يعنيه النجاح بالنسبة لك قبل أي تصميم.' : 'We learn your goals, audience, and what success looks like — before any design.',
        },
        {
            icon: PenTool,
            title: isAr ? 'التصميم' : 'Design',
            desc: isAr ? 'نصمّم الشكل والبنية والرحلة، ونراجعها معك قبل البناء.' : 'We craft the look, structure, and journey — reviewed with you before we build.',
        },
        {
            icon: Code2,
            title: isAr ? 'البناء والربط' : 'Build & integrate',
            desc: isAr ? 'نطوّره بشكل نظيف، ونربط أدواتك، ونختبره على كل جهاز.' : 'We develop it cleanly, connect your tools, and test on every device.',
        },
        {
            icon: Rocket,
            title: isAr ? 'الإطلاق والدعم' : 'Launch & support',
            desc: isAr ? 'ننشره مباشرةً، ونسلّمك الملكية الكاملة، ونبقى في خدمتك.' : 'We go live, hand over full ownership, and stay on call.',
        },
    ]

    const whys = [
        {
            icon: Sparkles,
            title: isAr ? 'مبني حولك' : 'Built around you',
            desc: isAr ? 'لا قوالب جاهزة — كل شيء مصمّم لعلامتك وأهدافك.' : 'No off-the-shelf templates — everything tailored to your brand and goals.',
        },
        {
            icon: ShieldCheck,
            title: isAr ? 'تملكه بالكامل' : 'You own everything',
            desc: isAr ? 'الكود والوصول والملفات ملك لك — بلا قيود أو احتكار.' : 'The code, access, and assets are yours — no lock-in, ever.',
        },
        {
            icon: Globe,
            title: isAr ? 'عربي وإنجليزي' : 'Bilingual AR + EN',
            desc: isAr ? 'جاهز للغتين بدعم كامل للكتابة من اليمين لليسار.' : 'Ready in both languages with full right-to-left support.',
        },
        {
            icon: Headphones,
            title: isAr ? 'استشارة مجانية' : 'Free consultation',
            desc: isAr ? 'نطّلع على احتياجك ونعرض لك نموذجاً قبل أي التزام.' : 'We scope your needs and show you a preview before you commit.',
        },
    ]

    return (
        <div dir={dir}>
            <SubServiceContactHero
                service={c.service}
                pillarName={c.pillarName}
                pillarHref={pillarHref}
                eyebrow={c.hero.badge}
                title={`${c.hero.title1} ${c.hero.title2}`}
                subtitle={c.hero.subtitle}
                locale={locale}
            />
            {showGeometricHero && <HeroGeometric badge={c.hero.badge} title1={c.hero.title1} title2={c.hero.title2} subtitle={c.hero.subtitle} />}

            <ServiceOverview service={c.service} pillarName={c.pillarName} locale={locale} />

            <FeaturesBento content={c.features} dir={dir} />

            <ServiceDeliverables pillarSlug={c.pillarSlug} service={c.service} locale={locale} />

            {/* How we deliver */}
            <section dir={dir} className="bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">
                            {isAr ? 'كيف نعمل' : 'How we deliver'}
                        </p>
                        <h2 className="text-balance text-3xl font-black tracking-tight text-[#0f172a] md:text-4xl">
                            {isAr ? 'مسار واضح من الفكرة إلى الإطلاق' : 'A clear path from idea to launch'}
                        </h2>
                        <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-500">
                            {isAr
                                ? 'عملية شفافة بمراحل ومراجعات واضحة — تعرف دائماً أين وصل مشروعك.'
                                : 'A transparent, milestone-based process with review gates — you always know where your project stands.'}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {steps.map((s, i) => (
                            <div key={s.title} className="relative rounded-2xl border border-slate-200 bg-[#f8fafc] p-6 transition hover:border-amber-300 hover:shadow-lg hover:shadow-slate-200/60">
                                <div className="mb-4 flex items-center justify-between">
                                    <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                                        <s.icon className="h-5 w-5" aria-hidden="true" />
                                    </span>
                                    <span className="text-3xl font-black text-slate-200">{String(i + 1).padStart(2, '0')}</span>
                                </div>
                                <h3 className="text-lg font-black text-[#0f172a]">{s.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-500">{s.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ServiceUseCases pillarSlug={c.pillarSlug} service={c.service} locale={locale} />

            {/* Why CloudTopia */}
            <section dir={dir} className="bg-white px-4 py-16 sm:px-6 md:py-20 lg:px-8">
                <div className="mx-auto max-w-7xl">
                    <div className="mx-auto mb-12 max-w-2xl text-center">
                        <p className="mb-3 text-sm font-black uppercase tracking-[0.18em] text-[#0369a1]">
                            {isAr ? 'لماذا كلاودتوبيا' : 'Why CloudTopia'}
                        </p>
                        <h2 className="text-balance text-3xl font-black tracking-tight text-[#0f172a] md:text-4xl">
                            {isAr ? `لماذا تختارنا لـ ${c.service}` : `Why teams pick us for ${c.service.toLowerCase()}`}
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                        {whys.map((w) => (
                            <div key={w.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-sky-500/10 text-sky-600">
                                    <w.icon className="h-5 w-5" aria-hidden="true" />
                                </span>
                                <h3 className="text-lg font-black text-[#0f172a]">{w.title}</h3>
                                <p className="mt-2 text-sm leading-relaxed text-slate-500">{w.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Featured work — real client projects (portfolio-relevant pillars) */}
            {projects.length > 0 && (
                <ProjectsShowcase
                    projects={projects}
                    locale={sl}
                    dir={dir}
                    projectHref={(id) => localePath(locale, `/projects/${id}`)}
                    heading={isEcom ? (isAr ? 'متاجر أطلقناها' : "Online stores we've launched") : undefined}
                    sub={isEcom ? (isAr ? 'متاجر إلكترونية حقيقية صمّمناها وبنيناها وأطلقناها لعملاء.' : "Real online stores we've designed, built, and launched for clients.") : undefined}
                />
            )}

            {c.faqs.length > 0 && (
                <FaqAccordion
                    eyebrow={isAr ? 'أسئلة شائعة' : 'FAQ'}
                    heading={isAr ? 'أسئلة شائعة' : 'Questions, answered'}
                    items={c.faqs.map((f) => ({ q: f.question, a: f.answer }))}
                    dir={dir}
                />
            )}

            {/* Final CTA */}
            <section dir={dir} className="bg-[#f4f1f8] px-4 pb-20 pt-4 sm:px-6 lg:px-8">
                <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl shadow-slate-200/60 md:p-12">
                    <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-amber-200/40 blur-3xl" aria-hidden="true" />
                    <div className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-sky-200/40 blur-3xl" aria-hidden="true" />
                    <h2 className="relative text-3xl font-black tracking-tight text-slate-900 md:text-4xl" style={{ textWrap: 'balance' }}>
                        {isAr ? 'لنبنِها معاً' : "Let's build it together"}
                    </h2>
                    <p className="relative mx-auto mt-4 max-w-xl text-base leading-relaxed text-slate-600">
                        {isAr
                            ? 'لنحدد النطاق المناسب لك — باستشارة مجانية ومعاينة قبل أي التزام.'
                            : "Let's scope the right solution for you — with a free consultation and a demo preview before you commit."}
                    </p>
                    <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                        <a
                            href={waHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-8 py-4 text-base font-black text-white shadow-lg shadow-amber-500/25 transition hover:-translate-y-0.5 hover:bg-amber-400 sm:w-auto"
                        >
                            <MessageCircle className="h-5 w-5" aria-hidden="true" />
                            {isAr ? 'تواصل عبر واتساب' : 'Continue on WhatsApp'}
                        </a>
                        <Link href={localePath(locale, '/services')} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-8 py-4 text-base font-bold text-slate-800 transition hover:border-slate-400 hover:bg-slate-50 sm:w-auto">
                            {isAr ? 'كل الخدمات' : 'All services'}
                            <ArrowRight className="h-5 w-5 rtl:rotate-180" aria-hidden="true" />
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
