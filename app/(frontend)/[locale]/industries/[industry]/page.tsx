import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, HelpCircle, Layers, MessageSquare, ShieldCheck, Sparkles, Workflow } from 'lucide-react'
import { getIndustry, industrySlugs, localizedValue } from '@/lib/seo/industries'
import { canonicalUrl, localePath } from '@/lib/i18n/url'
import type { Locale } from '@/lib/i18n/config'
import { ogImagesFor } from '@/lib/og/og-image'
import { getIndustryVisual } from '@/components/industry/industryVisuals'
import { HeroOrbitDeck } from '@/components/ui/hero-modern'
import { countryLandingPages } from '@/lib/seo/country-landing-pages'
import { getCMSPage } from '@/lib/cms/content'
import { JsonLd } from '@/components/seo/JsonLd'
import { PageBreadcrumbs } from '@/components/ui/PageBreadcrumbs'
import { buildBreadcrumbSchema, buildFaqSchema, buildServiceSchema, buildOrganizationRef } from '@/lib/seo/schema'

type PageProps = {
    params: Promise<{ locale: string; industry: string }>
}

const labels = {
    en: {
        badge: 'Industry Playbook',
        problems: 'Problems we solve',
        solution: 'CloudTopia solution',
        useCases: 'Use cases we build',
        services: 'Related services',
        features: 'Digital features',
        benefits: 'Business benefits',
        process: 'Delivery process',
        markets: 'Relevant markets',
        example: 'Example build',
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
        solution: 'حل كلاود توبيا',
        useCases: 'ما يمكننا بناؤه',
        services: 'الخدمات المرتبطة',
        features: 'خصائص رقمية',
        benefits: 'فوائد الأعمال',
        process: 'طريقة التنفيذ',
        markets: 'أسواق مرتبطة',
        example: 'مثال تنفيذ',
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

function industryFeatures(name: string, locale: string) {
    return locale === 'ar'
        ? [
            `صفحات خدمات مخصصة لقطاع ${name}`,
            'نماذج تأهيل تجمع الاحتياج والميزانية والوقت',
            'لوحات متابعة للطلبات والعملاء والمهام',
            'محتوى عربي وإنجليزي مع بنية SEO وأسئلة شائعة',
        ]
        : [
            `${name} service pages shaped around search intent`,
            'Qualification forms for need, budget, timing, and fit',
            'Dashboards for requests, customers, tasks, and reporting',
            'Arabic and English content with SEO structure and FAQs',
        ]
}

function industryBenefits(name: string, locale: string) {
    return locale === 'ar'
        ? [
            `شرح أوضح لعروض ${name}`,
            'طلبات أكثر تأهيلاً وأقل متابعة يدوية',
            'تجربة عميل أفضل بين الموقع والفريق',
            'نظام قابل للتوسع مع CRM وERP والتكاملات',
        ]
        : [
            `Clearer explanation of ${name} offers`,
            'More qualified inquiries with less manual follow-up',
            'Better customer experience between site and team',
            'A scalable base for CRM, ERP, and integrations',
        ]
}

function industryProcess(locale: string) {
    return locale === 'ar'
        ? ['فهم القطاع', 'رسم رحلة العميل', 'تصميم المحتوى والواجهة', 'بناء النظام', 'اختبار وإطلاق', 'تحسين مستمر']
        : ['Sector discovery', 'Customer journey map', 'Content and UX design', 'System build', 'Testing and launch', 'Continuous improvement']
}

function industryHeroImage(slug: string) {
    const images: Record<string, string> = {
        healthcare: '/images/homepage/Healthcare.png',
        fintech: '/images/homepage/Finance.png',
        'ecommerce-retail': '/images/homepage/E-commerce.webp',
        'real-estate': '/images/homepage/Real Estate.webp',
        education: '/images/homepage/Education.png',
        'travel-hospitality': '/images/homepage/Travel.webp',
        restaurants: '/images/homepage/Restaurants.jpg',
        'legal-firms': '/images/homepage/business systems.jpeg',
        construction: '/images/homepage/Logistics.webp',
        retail: '/images/homepage/E-commerce.jpg',
        'professional-services': '/images/homepage/digital presence.png',
        'logistics-supply-chain': '/images/homepage/Logistics.webp',
        'government-public-sector': '/images/homepage/cloud & infrastructure.webp',
    }

    return images[slug] || '/images/homepage/digital presence.png'
}

export function generateStaticParams() {
    return ['en', 'ar'].flatMap((locale) =>
        industrySlugs.map((industry) => ({
            locale,
            industry,
        })),
    )
}

import { applySeoOverride } from '@/lib/cms/route-seo'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale = 'en', industry: industrySlug } = await params
    const industry = getIndustry(industrySlug)
    if (!industry) return { title: 'Industry Not Found' }

    const name = localizedValue(industry.name, locale)
    // Optional CMS override via a Pages row with slug "industries/<slug>" (the
    // seo JSON column is real/migration-backed). Falls back to static copy when
    // no published row exists — getCMSPage already returns null on any DB error.
    const cmsPage = await getCMSPage(locale as Locale, `industries/${industry.slug}`)
    const cmsSeo = (cmsPage?.seo || {}) as Record<string, any>
    const title = (cmsSeo.title as string) || (locale === 'ar'
        ? `حلول ${name} الرقمية`
        : `${name} Digital Solutions`)
    const socialTitle = `${title} | ${locale === 'ar' ? 'كلاود توبيا' : 'CloudTopia'}`
    const description = (cmsSeo.description as string) || localizedValue(industry.description, locale)
    const images = ogImagesFor({ page: `industries/${industry.slug}`, locale })

    const meta: Metadata = {
        title,
        description,
        robots: cmsSeo.noindex ? { index: false, follow: false } : undefined,
        keywords: [
            `${name} CRM`,
            `${name} website development`,
            `${name} automation`,
            `${name} digital solutions`,
            'CloudTopia',
        ],
        openGraph: {
            title: socialTitle,
            description,
            url: canonicalUrl(locale, `/industries/${industry.slug}`),
            siteName: 'CloudTopia',
            type: 'website',
            images,
        },
        twitter: {
            card: 'summary_large_image',
            title: socialTitle,
            description,
            images: images.map((image) => image.url),
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

    return applySeoOverride(meta, locale, `industries/${industry.slug}`)
}

export default async function IndustryPage({ params }: PageProps) {
    const { locale = 'en', industry: industrySlug } = await params
    const industry = getIndustry(industrySlug)
    if (!industry) notFound()

    const isRTL = locale === 'ar'
    const L = pageLabels(locale)
    const name = localizedValue(industry.name, locale)
    const visual = getIndustryVisual(industry.slug)
    const featureItems = industryFeatures(name, locale)
    const benefitItems = industryBenefits(name, locale)
    const processItems = industryProcess(locale)
    const marketLinks = countryLandingPages.slice(0, 6)
    const heroModes = [
        {
            label: L.problems,
            title: L.problems,
            description: isRTL
                ? `نبدأ من مشكلات قطاع ${name} قبل اختيار التقنية أو شكل الصفحة.`
                : `We start with the operating problems inside ${name} before choosing the interface or system shape.`,
            items: industry.problems.map((problem) => localizedValue(problem, locale)).slice(0, 4),
        },
        {
            label: L.solution,
            title: L.solution,
            description: isRTL
                ? `نحوّل احتياج قطاع ${name} إلى صفحات، نماذج، لوحات، وتكاملات عملية قابلة للتسليم.`
                : `We turn ${name} needs into pages, forms, dashboards, and practical integrations that can be delivered and owned.`,
            items: featureItems,
        },
    ]
    const heroProtocols = industry.serviceLinks.slice(0, 4).map((service, index) => ({
        name: localizedValue(service.label, locale),
        detail: index === 0
            ? (isRTL ? 'مسار أولي مناسب لفهم الطلب والفرصة.' : 'A first path for understanding demand and opportunity.')
            : (isRTL ? 'خدمة مرتبطة بمشكلة تشغيل أو نمو داخل القطاع.' : 'A service tied to an operating or growth problem in this sector.'),
        status: L.scope,
    }))
    const heroMetrics = [
        { label: L.services, value: String(industry.serviceLinks.length).padStart(2, '0') },
        { label: L.features, value: String(featureItems.length).padStart(2, '0') },
        { label: L.process, value: String(processItems.length).padStart(2, '0') },
    ]

    const faqItems = industry.faqs.map((faq) => ({
        question: localizedValue(faq.question, locale),
        answer: localizedValue(faq.answer, locale),
    }))

    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: `${name} Digital Solutions`,
        description: localizedValue(industry.description, locale),
        provider: buildOrganizationRef(),
        areaServed: marketLinks.map((country) => ({ '@type': 'Country', name: locale === 'ar' ? country.countryNameArabic : country.countryNameEnglish })),
        serviceType: industry.serviceLinks.map((service) => localizedValue(service.label, locale)),
        url: canonicalUrl(locale, `/industries/${industry.slug}`),
    }

    const webPageSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: `${name} Digital Solutions`,
        description: localizedValue(industry.description, locale),
        url: canonicalUrl(locale, `/industries/${industry.slug}`),
        inLanguage: isRTL ? 'ar' : 'en',
    }

    return (
        <main className="relative min-h-screen bg-[#f4f1f8] text-eerie" dir={isRTL ? 'rtl' : 'ltr'}>
            <JsonLd
                schema={[
                    webPageSchema,
                    serviceSchema,
                    buildFaqSchema(faqItems),
                    buildBreadcrumbSchema(locale, [
                        { name: 'Home', path: '/' },
                        { name: 'Industries', path: '/industries' },
                        { name, path: `/industries/${industry.slug}` },
                    ]),
                ]}
            />

            <div className="mx-auto max-w-7xl px-4 pt-6 sm:px-6 lg:px-8">
                <PageBreadcrumbs
                    locale={locale}
                    items={[
                        { label: isRTL ? 'القطاعات' : 'Industries', href: localePath(locale, '/industries') },
                        { label: name },
                    ]}
                />
            </div>

            <HeroOrbitDeck
                eyebrow={`${L.badge} / ${localizedValue(visual.workflow, locale)}`}
                title={localizedValue(industry.heroTitle, locale)}
                description={localizedValue(industry.description, locale)}
                image={{ src: industryHeroImage(industry.slug), alt: `${name} ${isRTL ? 'صورة قطاعية' : 'industry visual'}` }}
                metrics={heroMetrics}
                modes={heroModes}
                protocols={heroProtocols}
                primaryCta={{ label: L.start, href: localePath(locale, '/contact') }}
                secondaryCta={{ label: L.servicesCta, href: localePath(locale, '/services') }}
                visualCaption={name}
                dir={isRTL ? 'rtl' : 'ltr'}
            />

            <section className="relative px-4 py-16 sm:px-6 lg:px-8 md:py-24">
                <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-2">
                    <div className="rounded-lg border border-eerie/10 bg-white p-8 shadow-sm">
                        <div className={`mb-5 flex h-12 w-12 items-center justify-center rounded-lg ${visual.tint}`}>
                            <HelpCircle className={`h-5 w-5 ${visual.accent}`} aria-hidden="true" />
                        </div>
                        <h2 className="mb-6 text-2xl font-black text-eerie md:text-3xl">{L.problems}</h2>
                        <div className="grid gap-4">
                            {industry.problems.map((problem) => (
                                <div key={problem.en} className="flex gap-3 border-t border-neutral-200 pt-4">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
                                    <p className="leading-8 text-neutral-700">{localizedValue(problem, locale)}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-lg border border-eerie/10 bg-white/72 p-8 backdrop-blur">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-white text-sky-700">
                            <ShieldCheck className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <h2 className="mb-6 text-2xl font-black text-eerie md:text-3xl">{L.why}</h2>
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

            <section className="relative border-y border-eerie/10 bg-white px-4 py-16 sm:px-6 lg:px-8 md:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 grid gap-6 lg:grid-cols-[0.44fr_1fr] lg:items-end">
                        <div>
                            <p className={`mb-3 text-sm font-black uppercase tracking-[0.16em] ${visual.accent}`}>{L.solution}</p>
                            <h2 className="text-3xl font-black leading-tight text-eerie md:text-4xl">{L.features}</h2>
                        </div>
                        <p className="max-w-3xl border-s-4 border-sky-600 bg-[#f4f1f8] px-5 py-4 text-base font-semibold leading-8 text-neutral-700">
                            {isRTL
                                ? `نحوّل احتياج قطاع ${name} إلى صفحات، نماذج، لوحات، وتكاملات عملية تدعم البيع والتشغيل وخدمة العملاء.`
                                : `We turn ${name} needs into pages, forms, dashboards, and practical integrations that support sales, operations, and customer care.`}
                        </p>
                    </div>
                    <div className="grid gap-px border border-eerie bg-eerie md:grid-cols-2 lg:grid-cols-4">
                        {featureItems.map((item, index) => (
                            <article key={item} className="min-h-52 bg-[#f4f1f8] p-6 transition-colors duration-200 hover:bg-white">
                                <div className="mb-8 flex items-center justify-between gap-3">
                                    <Layers className="h-5 w-5 text-sky-700" aria-hidden="true" />
                                    <span className="font-mono text-xs font-black text-neutral-500">{String(index + 1).padStart(2, '0')}</span>
                                </div>
                                <h3 className="text-lg font-black leading-tight text-eerie">{item}</h3>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative px-4 py-16 sm:px-6 lg:px-8 md:py-24">
                <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.92fr_1.08fr]">
                    <div className="border border-eerie/10 bg-white p-8 shadow-sm">
                        <div className={`mb-5 flex h-12 w-12 items-center justify-center border border-eerie/10 ${visual.tint}`}>
                            <Sparkles className={`h-5 w-5 ${visual.accent}`} aria-hidden="true" />
                        </div>
                        <h2 className="mb-6 text-2xl font-black text-eerie md:text-3xl">{L.benefits}</h2>
                        <div className="grid gap-3">
                            {benefitItems.map((item) => (
                                <div key={item} className="flex gap-3 border border-neutral-200 bg-[#f4f1f8] p-4">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-sky-700" aria-hidden="true" />
                                    <p className="text-sm font-semibold leading-7 text-neutral-700">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border border-eerie bg-eerie p-8 text-white">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center border border-white/20 bg-white/10">
                            <Workflow className="h-5 w-5 text-sky-300" aria-hidden="true" />
                        </div>
                        <h2 className="mb-6 text-2xl font-black text-white md:text-3xl">{L.process}</h2>
                        <div className="grid gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-3">
                            {processItems.map((item, index) => (
                                <div key={item} className="min-h-36 bg-white/8 p-4">
                                    <p className="mb-7 font-mono text-xs font-black text-sky-300">{String(index + 1).padStart(2, '0')}</p>
                                    <h3 className="text-base font-black leading-tight text-white">{item}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative border-y border-eerie/10 bg-white px-4 py-16 sm:px-6 lg:px-8 md:py-24">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-10 max-w-3xl">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-lg bg-eerie">
                            <Layers className="h-5 w-5 text-white" aria-hidden="true" />
                        </div>
                        <h2 className="mb-4 text-3xl font-black text-eerie md:text-4xl">{L.useCases}</h2>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                        {industry.useCases.map((useCase, index) => (
                            <article key={useCase.title.en} className="rounded-lg border border-eerie/10 bg-[#f4f1f8] p-7">
                                <div className="mb-5 flex items-center justify-between gap-4">
                                    <Workflow className="h-5 w-5 text-sky-700" aria-hidden="true" />
                                    <span className="text-xs font-black text-neutral-400 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                                </div>
                                <h3 className="mb-3 text-xl font-black text-eerie">{localizedValue(useCase.title, locale)}</h3>
                                <p className="leading-8 text-neutral-600">{localizedValue(useCase.description, locale)}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative px-4 py-16 sm:px-6 lg:px-8 md:py-24">
                <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.42fr_1fr]">
                    <div className="border border-eerie bg-white p-7 shadow-[8px_8px_0_rgba(2,132,199,0.12)]">
                        <div className="mb-4 inline-flex items-center gap-2 text-sm font-black text-sky-700">
                            <Workflow className="h-4 w-4" aria-hidden="true" />
                            {L.example}
                        </div>
                        <h2 className="text-3xl font-black leading-tight text-eerie md:text-4xl">{L.example}</h2>
                        <p className="mt-5 text-base font-semibold leading-8 text-neutral-700">
                            {isRTL
                                ? `مثال عملي لقطاع ${name}: صفحة خدمات مخصصة، نموذج تأهيل، لوحة متابعة، أسئلة شائعة، وربط مع خدمات كلاود توبيا المناسبة دون ادعاء دراسة حالة غير موثقة.`
                                : `Example for ${name}: a focused service page, qualification form, dashboard, FAQ content, and links to relevant CloudTopia services without inventing an unverified case study.`}
                        </p>
                    </div>
                    <div className="grid gap-px border border-eerie bg-eerie sm:grid-cols-2 lg:grid-cols-3">
                        {marketLinks.map((country) => (
                            <Link
                                key={country.slug}
                                href={isRTL ? country.arabicUrl : country.englishUrl}
                                className="group bg-white p-5 transition-colors duration-200 hover:bg-[#f4f1f8] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                            >
                                <p className="mb-3 text-xs font-black uppercase tracking-[0.14em] text-neutral-400">{L.markets}</p>
                                <div className="flex items-center justify-between gap-3">
                                    <h3 className="text-lg font-black text-eerie">{isRTL ? country.countryNameArabic : country.countryNameEnglish}</h3>
                                    <span className="border border-neutral-200 px-2 py-1 text-[11px] font-black text-neutral-600">{country.currency}</span>
                                </div>
                                <p className="mt-3 line-clamp-2 text-xs font-semibold leading-6 text-neutral-600">
                                    {country.content[locale as 'ar' | 'en'].primaryKeyword}
                                </p>
                                <span className="mt-4 inline-flex items-center gap-2 text-sm font-black text-sky-700">
                                    {isRTL ? 'صفحة السوق' : 'Market page'}
                                    <ArrowRight className={`h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} aria-hidden="true" />
                                </span>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative px-4 py-16 sm:px-6 lg:px-8 md:py-24">
                <div className="mx-auto max-w-4xl">
                    <h2 className="mb-10 text-3xl font-black text-eerie md:text-4xl">{L.faqs}</h2>
                    <div className="space-y-4">
                        {industry.faqs.map((faq) => (
                            <div key={faq.question.en} className="rounded-lg border border-eerie/10 bg-white p-6 shadow-sm">
                                <h3 className="mb-3 text-lg font-black text-eerie">{localizedValue(faq.question, locale)}</h3>
                                <p className="text-base leading-8 text-neutral-700">{localizedValue(faq.answer, locale)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative overflow-hidden bg-eerie px-4 py-16 sm:px-6 lg:px-8 md:py-24" data-header-theme="dark">
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
                        <Link href={localePath(locale, '/contact')} className="inline-flex items-center justify-center gap-2 border border-white bg-white px-7 py-4 font-black text-eerie transition-colors duration-200 hover:bg-sky-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300">
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
