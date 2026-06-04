import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, CheckCircle2, Layers, Search, ShieldCheck, Workflow } from 'lucide-react'
import { canonicalUrl, localePath } from '@/lib/i18n/url'
import { industries, industrySlugs, localizedValue } from '@/lib/seo/industries'
import { getIndustryVisual } from '@/components/industry/industryVisuals'

type PageProps = {
    params: Promise<{ locale: string }>
}

const labels = {
    en: {
        title: 'Industry Digital Systems',
        description: 'Practical websites, portals, CRM flows, automations, and dashboards for teams that need clearer sales, service, and operations online.',
        badge: 'Industry Playbooks',
        cta: 'Explore industry',
        answerTitle: 'What industries does CloudTopia serve?',
        answer: 'CloudTopia works with healthcare, finance, commerce, real estate, education, hospitality, logistics, and public-sector teams that need websites, portals, custom systems, automations, and bilingual Arabic plus English user journeys.',
        chooseTitle: 'Choose the sector closest to your workflow',
        proofTitle: 'What we look for first',
        proofItems: ['Where inquiries get lost', 'Which system should own the data', 'What needs Arabic and English clarity'],
        serviceLabel: 'Relevant services',
        mapTitle: 'From market problem to build scope',
    },
    ar: {
        title: 'أنظمة رقمية حسب القطاع',
        description: 'مواقع، بوابات، CRM، أتمتة، ولوحات متابعة للفرق التي تريد مبيعات أوضح، خدمة أسرع، وعمليات أهدأ على الإنترنت.',
        badge: 'أدلة القطاعات',
        cta: 'استكشف القطاع',
        answerTitle: 'ما القطاعات التي تخدمها كلاود توبيا؟',
        answer: 'تعمل كلاود توبيا مع قطاعات الرعاية الصحية، التمويل، التجارة، العقار، التعليم، الضيافة، اللوجستيات، والقطاع العام عندما تحتاج إلى موقع، بوابة، نظام مخصص، أتمتة، وتجربة عربية وإنجليزية واضحة.',
        chooseTitle: 'اختر القطاع الأقرب لطريقة عملك',
        proofTitle: 'ما الذي نبحث عنه أولاً؟',
        proofItems: ['أين تضيع الاستفسارات', 'أي نظام يجب أن يملك البيانات', 'ما الذي يحتاج وضوحاً عربياً وإنجليزياً'],
        serviceLabel: 'خدمات مرتبطة',
        mapTitle: 'من مشكلة السوق إلى نطاق التنفيذ',
    },
}

function pageLabels(locale: string) {
    return labels[(locale as keyof typeof labels) || 'en'] || labels.en
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale = 'en' } = await params
    const L = pageLabels(locale)

    return {
        title: `${L.title} | CloudTopia`,
        description: L.description,
        alternates: {
            canonical: canonicalUrl(locale, '/industries'),
            languages: {
                en: canonicalUrl('en', '/industries'),
                ar: canonicalUrl('ar', '/industries'),
                'x-default': canonicalUrl('en', '/industries'),
            },
        },
    }
}

export default async function IndustriesPage({ params }: PageProps) {
    const { locale = 'en' } = await params
    const L = pageLabels(locale)
    const isRTL = locale === 'ar'

    return (
        <main className="relative min-h-screen bg-[#f4f1f8] text-eerie" dir={isRTL ? 'rtl' : 'ltr'}>
            <section className="relative overflow-hidden border-b border-eerie/10 px-4 pb-20 pt-32 sm:px-6 lg:px-8 md:pb-24 md:pt-40" data-header-theme="light">
                <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(#1B1B23 1px, transparent 1px), linear-gradient(90deg, #1B1B23 1px, transparent 1px)', backgroundSize: '44px 44px' }} />
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_10%,rgba(125,211,252,0.24),transparent_30%),radial-gradient(circle_at_84%_12%,rgba(216,180,254,0.28),transparent_34%)]" />
                <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
                    <div>
                    <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-eerie/10 bg-white/86 px-4 py-2 text-sm font-black text-eerie shadow-sm">
                        <Building2 className="h-3.5 w-3.5 text-sky-600" aria-hidden="true" />
                        {L.badge}
                    </span>
                    <h1 className="mb-8 max-w-4xl text-4xl font-black leading-[1.04] text-eerie text-balance md:text-6xl lg:text-7xl">
                        {L.title}
                    </h1>
                    <p className="max-w-3xl text-lg leading-8 text-neutral-700 md:text-xl">
                        {L.description}
                    </p>
                    </div>
                    <div className="rounded-lg border border-eerie/10 bg-eerie p-5 text-white shadow-[10px_10px_0_rgba(14,165,233,0.18)]">
                        <div className="mb-5 flex items-center gap-2 text-sm font-black text-sky-300">
                            <Workflow className="h-4 w-4" aria-hidden="true" />
                            {L.mapTitle}
                        </div>
                        <div className="grid gap-3">
                            {L.proofItems.map((item, index) => (
                                <div key={item} className="grid grid-cols-[2rem_1fr] items-center gap-3 rounded-md border border-white/15 bg-white/8 px-3 py-3">
                                    <span className="text-xs font-black text-white/45 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                                    <p className="text-sm font-bold leading-relaxed text-white/82">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative px-4 py-14 sm:px-6 lg:px-8 md:py-20">
                <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="rounded-lg border border-eerie/10 bg-white p-7 shadow-sm">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-eerie text-white">
                            <Search className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <p className="mb-3 text-sm font-black uppercase tracking-[0.14em] text-sky-700">{L.answerTitle}</p>
                        <p className="text-base leading-8 text-neutral-700 md:text-lg">{L.answer}</p>
                    </div>

                    <div className="rounded-lg border border-eerie/10 bg-white/72 p-7 backdrop-blur">
                        <h2 className="text-2xl font-black text-eerie md:text-3xl">{L.proofTitle}</h2>
                        <div className="mt-6 grid gap-3 sm:grid-cols-3">
                            {L.proofItems.map((item, index) => (
                                <div key={item} className="rounded-lg border border-eerie/10 bg-white p-4">
                                    <p className="mb-3 text-xs font-black text-neutral-400 tabular-nums">{String(index + 1).padStart(2, '0')}</p>
                                    <CheckCircle2 className="mb-3 h-5 w-5 text-sky-700" aria-hidden="true" />
                                    <p className="text-sm font-black leading-snug text-neutral-900">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative px-4 py-20 sm:px-6 lg:px-8 md:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 flex flex-col justify-between gap-4 border-b border-eerie/10 pb-5 md:flex-row md:items-end">
                        <div>
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-eerie">
                            <Layers className="h-5 w-5 text-white" aria-hidden="true" />
                        </div>
                        <h2 className="text-3xl font-black tracking-tight text-eerie text-balance md:text-4xl">{L.chooseTitle}</h2>
                        </div>
                        <p className="max-w-xl text-sm leading-7 text-neutral-600">
                            {isRTL ? 'كل صفحة قطاع تربط المشكلة بالخدمات المناسبة حتى لا تبدأ من قائمة خدمات عامة.' : 'Each industry page connects the real problem to the services that fit, so you do not start from a generic menu.'}
                        </p>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                        {industrySlugs.map((slug, index) => {
                            const industry = industries[slug]
                            const visual = getIndustryVisual(slug)
                            const Icon = visual.icon
                            return (
                                <Link
                                    key={slug}
                                    href={localePath(locale, `/industries/${slug}`)}
                                    className="group grid min-h-[360px] rounded-lg border border-eerie/10 bg-white/86 p-5 shadow-sm backdrop-blur transition-[transform,box-shadow,border-color] duration-200 hover:-translate-y-1 hover:border-primary-300 hover:shadow-xl hover:shadow-primary-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                                >
                                    <div className="mb-5 flex items-start justify-between gap-4">
                                        <div className={`flex h-12 w-12 items-center justify-center rounded-lg border border-eerie/10 ${visual.tint} ${visual.accent}`}>
                                            <Icon className="h-5 w-5" aria-hidden="true" />
                                        </div>
                                        <span className="text-xs font-black text-neutral-400 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                                    </div>
                                    <p className="mb-2 text-[11px] font-black uppercase tracking-[0.16em] text-neutral-400">{localizedValue(visual.workflow, locale)}</p>
                                    <h3 className="mb-3 text-2xl font-black leading-tight text-eerie">{localizedValue(industry.name, locale)}</h3>
                                    <p className="mb-5 line-clamp-3 text-sm leading-7 text-neutral-600">{localizedValue(industry.description, locale)}</p>

                                    <div className="mb-6 border-t border-eerie/10 pt-4">
                                        <p className="mb-2 text-xs font-black uppercase tracking-[0.14em] text-neutral-500">{L.serviceLabel}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {industry.serviceLinks.slice(0, 3).map((service) => (
                                                <span key={service.href} className="rounded-full border border-neutral-200 bg-[#f4f1f8] px-2.5 py-1 text-[11px] font-bold text-neutral-700">
                                                    {localizedValue(service.label, locale)}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="mb-6 grid gap-2">
                                        {industry.problems.slice(0, 2).map((problem) => (
                                            <div key={problem.en} className="flex gap-2 text-sm leading-relaxed text-neutral-600">
                                                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-sky-700" aria-hidden="true" />
                                                <span>{localizedValue(problem, locale)}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <span className="mt-auto inline-flex items-center gap-2 text-sm font-black text-sky-700">
                                        {L.cta}
                                        <ArrowRight className={`h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} aria-hidden="true" />
                                    </span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="relative bg-eerie px-4 py-16 text-white sm:px-6 lg:px-8 md:py-20" data-header-theme="dark">
                <div className="mx-auto grid max-w-7xl gap-4 md:grid-cols-3">
                    {[
                        { value: industrySlugs.length, label: locale === 'ar' ? 'صفحات قطاع مفصلة' : 'Detailed Industry Pages' },
                        { value: 32, label: locale === 'ar' ? 'حالات استخدام قابلة للتنفيذ' : 'Buildable Use Cases' },
                        { value: 3, label: locale === 'ar' ? 'أسئلة قبل تحديد النطاق' : 'Scope Questions First' },
                    ].map((item) => (
                        <div key={item.label} className="border border-white/15 bg-white/[0.04] p-7">
                            <p className="text-4xl font-black text-sky-300 tabular-nums">{item.value}</p>
                            <p className="mt-2 text-sm font-black uppercase tracking-[0.14em] text-white/62">{item.label}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}
