import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Building2, CheckCircle2, HelpCircle, Layers, MessageSquare, ShieldCheck, Sparkles, Workflow } from 'lucide-react'
import { getIndustry, industrySlugs, localizedValue } from '@/lib/seo/industries'
import { canonicalUrl, localePath } from '@/lib/i18n/url'
import { ogImagesFor } from '@/lib/og/og-image'

type PageProps = {
    params: Promise<{ locale: string; industry: string }>
}

const labels = {
    en: {
        badge: 'Industry Playbook',
        problems: 'Problems we solve',
        useCases: 'Use cases we build',
        services: 'Related services',
        why: 'Why CloudTopia',
        faqs: 'Common questions',
        start: 'Start a project',
        servicesCta: 'Explore services',
        readyTitle: 'Ready to shape the right build?',
        readyDesc: 'Send the sector, current workflow, and what needs to improve. We will reply with a practical scope direction.',
        scope: 'Scope Direction',
    },
    ar: {
        badge: 'دليل قطاعي',
        problems: 'المشكلات التي نحلها',
        useCases: 'ما يمكننا بناؤه',
        services: 'الخدمات المرتبطة',
        why: 'لماذا كلاود توبيا',
        faqs: 'أسئلة شائعة',
        start: 'ابدأ مشروعاً',
        servicesCta: 'استكشف الخدمات',
        readyTitle: 'جاهز لتحديد نطاق التنفيذ المناسب؟',
        readyDesc: 'أرسل القطاع، طريقة العمل الحالية، وما تريد تحسينه. سنرد باتجاه عملي للنطاق والخطوات.',
        scope: 'اتجاه النطاق',
    },
}

function pageLabels(locale: string) {
    return labels[(locale as keyof typeof labels) || 'en'] || labels.en
}

export function generateStaticParams() {
    return ['en', 'ar'].flatMap((locale) =>
        industrySlugs.map((industry) => ({
            locale,
            industry,
        })),
    )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale = 'en', industry: industrySlug } = await params
    const industry = getIndustry(industrySlug)
    if (!industry) return { title: 'Industry Not Found' }

    const name = localizedValue(industry.name, locale)
    const title = `${name} Digital Solutions | CloudTopia`
    const description = localizedValue(industry.description, locale)

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: canonicalUrl(locale, `/industries/${industry.slug}`),
            images: ogImagesFor({ page: `industries/${industry.slug}`, locale }),
        },
        alternates: {
            canonical: canonicalUrl(locale, `/industries/${industry.slug}`),
            languages: {
                en: canonicalUrl('en', `/industries/${industry.slug}`),
                ar: canonicalUrl('ar', `/industries/${industry.slug}`),
                'x-default': canonicalUrl('en', `/industries/${industry.slug}`),
            },
        },
    }
}

export default async function IndustryPage({ params }: PageProps) {
    const { locale = 'en', industry: industrySlug } = await params
    const industry = getIndustry(industrySlug)
    if (!industry) notFound()

    const isRTL = locale === 'ar'
    const L = pageLabels(locale)
    const name = localizedValue(industry.name, locale)

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: industry.faqs.map((faq) => ({
            '@type': 'Question',
            name: localizedValue(faq.question, locale),
            acceptedAnswer: {
                '@type': 'Answer',
                text: localizedValue(faq.answer, locale),
            },
        })),
    }

    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `${name} Digital Solutions`,
        provider: { '@type': 'Organization', name: 'CloudTopia', url: 'https://cloudtopia.net' },
        areaServed: ['Gulf region', 'Middle East', 'Global'],
        serviceType: industry.serviceLinks.map((service) => localizedValue(service.label, locale)),
        url: canonicalUrl(locale, `/industries/${industry.slug}`),
    }

    return (
        <main className="relative min-h-screen bg-[#f7f3ea] text-neutral-950" dir={isRTL ? 'rtl' : 'ltr'}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

            <section className="relative overflow-hidden border-b border-neutral-950 px-4 pb-20 pt-32 sm:px-6 lg:px-8 md:pb-28 md:pt-40" data-header-theme="light">
                <div className="pointer-events-none absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'linear-gradient(#0a0a0a 1px, transparent 1px), linear-gradient(90deg, #0a0a0a 1px, transparent 1px)', backgroundSize: '44px 44px' }} />

                <div className="relative mx-auto max-w-7xl">
                    <span className="mb-6 inline-flex items-center gap-2 border border-neutral-950 bg-white px-4 py-2 text-sm font-black text-neutral-900 shadow-[4px_4px_0_rgba(10,10,10,0.12)]">
                        <Building2 className="h-3.5 w-3.5 text-sky-700" aria-hidden="true" />
                        {L.badge}
                    </span>

                    <div className="grid items-end gap-10 lg:grid-cols-[1.12fr_0.88fr]">
                        <div>
                            <h1 className="mb-8 max-w-5xl text-4xl font-black leading-[1.04] text-neutral-950 text-balance md:text-6xl lg:text-7xl">
                                {localizedValue(industry.heroTitle, locale)}
                            </h1>
                            <p className="max-w-3xl text-lg leading-8 text-neutral-700 md:text-xl">
                                {localizedValue(industry.description, locale)}
                            </p>
                        </div>

                        <div className="border border-neutral-950 bg-neutral-950 p-6 text-white shadow-[10px_10px_0_rgba(14,165,233,0.24)]">
                            <div className="mb-5 flex items-center justify-between gap-3 border-b border-white/15 pb-4">
                                <div className="flex items-center gap-3">
                                    <Sparkles className="h-5 w-5 text-sky-300" aria-hidden="true" />
                                    <h2 className="text-xl font-black text-white">{L.services}</h2>
                                </div>
                                <span className="text-xs font-black uppercase tracking-[0.14em] text-white/45">{L.scope}</span>
                            </div>
                            <div className="grid gap-3">
                                {industry.serviceLinks.map((service) => (
                                    <Link
                                        key={service.href}
                                        href={localePath(locale, service.href)}
                                        className="group flex items-center justify-between gap-3 border border-white/15 bg-white/8 px-4 py-3 text-sm font-bold text-white/85 transition-colors duration-200 hover:bg-white hover:text-neutral-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                                    >
                                        {localizedValue(service.label, locale)}
                                        <ArrowRight className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} aria-hidden="true" />
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative px-4 py-16 sm:px-6 lg:px-8 md:py-24">
                <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
                    <div className="border border-neutral-950 bg-white p-8 shadow-[6px_6px_0_rgba(10,10,10,0.08)]">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center bg-neutral-950">
                            <HelpCircle className="h-5 w-5 text-white" aria-hidden="true" />
                        </div>
                        <h2 className="mb-6 text-2xl font-black text-neutral-950 md:text-3xl">{L.problems}</h2>
                        <div className="grid gap-4">
                            {industry.problems.map((problem) => (
                                <div key={problem.en} className="flex gap-3 border-t border-neutral-200 pt-4">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
                                    <p className="leading-8 text-neutral-700">{localizedValue(problem, locale)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border border-neutral-950 bg-[#eef7ff] p-8">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center bg-white text-sky-700">
                            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <h2 className="mb-6 text-2xl font-black text-neutral-950 md:text-3xl">{L.why}</h2>
                        <div className="grid gap-4">
                            {industry.differentiators.map((item) => (
                                <div key={item.en} className="flex gap-3 border-t border-sky-900/15 pt-4">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
                                    <p className="leading-8 text-neutral-700">{localizedValue(item, locale)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative border-y border-neutral-950 bg-white px-4 py-16 sm:px-6 lg:px-8 md:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 max-w-3xl">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center bg-neutral-950">
                            <Layers className="h-5 w-5 text-white" aria-hidden="true" />
                        </div>
                        <h2 className="mb-4 text-3xl font-black text-neutral-950 md:text-4xl">{L.useCases}</h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {industry.useCases.map((useCase, index) => (
                            <article key={useCase.title.en} className="border border-neutral-950 bg-[#f7f3ea] p-7">
                                <div className="mb-5 flex items-center justify-between gap-4">
                                    <Workflow className="h-5 w-5 text-sky-700" aria-hidden="true" />
                                    <span className="text-xs font-black text-neutral-400 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                                </div>
                                <h3 className="mb-3 text-xl font-black text-neutral-950">{localizedValue(useCase.title, locale)}</h3>
                                <p className="leading-8 text-neutral-600">{localizedValue(useCase.description, locale)}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative px-4 py-16 sm:px-6 lg:px-8 md:py-24">
                <div className="mx-auto max-w-4xl">
                    <h2 className="mb-10 text-3xl font-black text-neutral-950 md:text-4xl">{L.faqs}</h2>
                    <div className="space-y-4">
                        {industry.faqs.map((faq) => (
                            <div key={faq.question.en} className="border border-neutral-950 bg-white p-6">
                                <h3 className="mb-3 text-lg font-black text-neutral-950">{localizedValue(faq.question, locale)}</h3>
                                <p className="text-base leading-8 text-neutral-700">{localizedValue(faq.answer, locale)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-neutral-950 px-4 py-16 sm:px-6 lg:px-8 md:py-24" data-header-theme="dark">
                <div className="relative mx-auto grid max-w-7xl gap-8 border border-white/15 bg-white/[0.04] p-7 md:grid-cols-[1fr_auto] md:items-center md:p-9">
                    <div>
                        <div className="mb-4 inline-flex items-center gap-2 text-sm font-black text-sky-300">
                            <MessageSquare className="h-4 w-4" aria-hidden="true" />
                            {name}
                        </div>
                    <h2 className="mb-5 text-3xl font-black text-white md:text-5xl">{L.readyTitle}</h2>
                    <p className="max-w-2xl text-lg leading-8 text-white/75">{L.readyDesc}</p>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                        <Link href={localePath(locale, '/contact')} className="inline-flex items-center justify-center gap-2 border border-white bg-white px-7 py-4 font-black text-neutral-950 transition-colors duration-200 hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300">
                            {L.start}
                            <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
                        </Link>
                        <Link href={localePath(locale, '/services')} className="inline-flex items-center justify-center gap-2 border border-white/25 px-7 py-4 font-black text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300">
                            {L.servicesCta}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
