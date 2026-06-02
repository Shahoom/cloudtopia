import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight, CheckCircle2, CircleDollarSign, HelpCircle, Layers, Pencil, Rocket, Settings2, ShieldCheck, Sparkles, Star } from 'lucide-react'
import { canonicalUrl, localePath } from '@/lib/i18n/url'
import { ogImagesFor } from '@/lib/og/og-image'
import { getService, getServiceCategory, localizedServiceValue, serviceDetailSlugs } from '@/lib/seo/services'
import { CreativePricing, type PricingTier } from '@/components/ui/creative-pricing'

type PageProps = {
    params: Promise<{ locale: string; service: string }>
}

const labels = {
    en: {
        badge: 'Service detail',
        features: 'What is included',
        outcomes: 'Business outcomes',
        technologies: 'Technology foundation',
        answerTitle: 'Short answer',
        bestFor: 'Best fit',
        deliverables: 'Enterprise deliverables',
        related: 'Related services',
        packages: 'Package path',
        packageTitle: 'Service packages for this work',
        packageDescription: 'Pick the level that matches your scope. Every path starts with a free consultation and a free custom demo preview for your inquiry.',
        packageCta: 'Scope this service',
        process: 'Delivery approach',
        faqs: 'Common questions',
        start: 'Request a proposal',
        pricing: 'Compare pricing',
        allServices: 'All services',
        readyTitle: 'Ready to scope this service?',
        readyDesc: 'We will turn your goals into a clear scope, fixed proposal, and practical delivery plan.',
        processSteps: ['Discovery', 'Design', 'Build', 'Launch & Support'],
        bestForItems: [
            'Teams replacing scattered spreadsheets, manual follow-up, or unclear customer journeys.',
            'Companies that need Arabic and English delivery without losing brand consistency.',
            'Owners who want maintainable systems, clear documentation, and account-level control.',
        ],
        deliverablesItems: [
            { title: 'Scope blueprint', description: 'User journeys, content needs, integrations, acceptance criteria, and launch priorities before development starts.' },
            { title: 'Production build', description: 'Responsive interface, CMS or admin setup where needed, analytics wiring, technical SEO foundations, and launch support.' },
            { title: 'Ownership handoff', description: 'Credential handover, documentation, training, and a support path so your team can operate confidently after launch.' },
        ],
    },
    ar: {
        badge: 'تفاصيل الخدمة',
        features: 'ما الذي يشمله العمل',
        outcomes: 'نتائج الأعمال',
        technologies: 'الأساس التقني',
        answerTitle: 'إجابة مختصرة',
        bestFor: 'الأنسب لـ',
        deliverables: 'مخرجات مؤسسية',
        related: 'خدمات مرتبطة',
        packages: 'مسار الباقات',
        packageTitle: 'باقات خاصة بهذه الخدمة',
        packageDescription: 'اختر المستوى المناسب لنطاقك. كل مسار يبدأ باستشارة مجانية ومعاينة ديمو مجانية حسب طلبك.',
        packageCta: 'حدد نطاق الخدمة',
        process: 'طريقة التنفيذ',
        faqs: 'أسئلة شائعة',
        start: 'اطلب عرضاً',
        pricing: 'قارن الأسعار',
        allServices: 'كل الخدمات',
        readyTitle: 'جاهز لتحديد نطاق هذه الخدمة؟',
        readyDesc: 'سنحول أهدافك إلى نطاق واضح وعرض ثابت وخطة تنفيذ عملية.',
        processSteps: ['اكتشاف', 'تصميم', 'بناء', 'إطلاق ودعم'],
        bestForItems: [
            'فرق تستبدل الجداول والمتابعة اليدوية ورحلات العملاء غير الواضحة.',
            'شركات تحتاج تنفيذاً عربياً وإنجليزياً دون فقدان اتساق العلامة.',
            'ملاك يريدون أنظمة قابلة للصيانة وتوثيقاً واضحاً وتحكماً بالحسابات.',
        ],
        deliverablesItems: [
            { title: 'مخطط نطاق', description: 'رحلات المستخدم، احتياجات المحتوى، التكاملات، معايير القبول، وأولويات الإطلاق قبل بدء التطوير.' },
            { title: 'بناء إنتاجي', description: 'واجهة متجاوبة، إعداد CMS أو لوحة إدارة عند الحاجة، ربط التحليلات، أساسيات SEO التقنية، ودعم الإطلاق.' },
            { title: 'تسليم الملكية', description: 'تسليم الحسابات، التوثيق، التدريب، ومسار دعم حتى يستطيع فريقك التشغيل بثقة بعد الإطلاق.' },
        ],
    },
}

function pageLabels(locale: string) {
    return labels[(locale as keyof typeof labels) || 'en'] || labels.en
}

function serviceTierIcon(index: number) {
    const icons = [
        <Pencil key="pencil" className="h-6 w-6" aria-hidden="true" />,
        <Star key="star" className="h-6 w-6" aria-hidden="true" />,
        <Sparkles key="sparkles" className="h-6 w-6" aria-hidden="true" />,
    ]
    return icons[index % icons.length]
}

function serviceTierColor(index: number): PricingTier['color'] {
    return (['sky', 'amber', 'emerald'] as PricingTier['color'][])[index % 3]
}

export function generateStaticParams() {
    return ['en', 'ar'].flatMap((locale) =>
        serviceDetailSlugs.map((service) => ({
            locale,
            service,
        })),
    )
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale = 'en', service: serviceSlug } = await params
    const service = getService(serviceSlug)
    if (!service) return { title: 'Service Not Found' }

    const name = localizedServiceValue(service.name, locale)
    const description = localizedServiceValue(service.description, locale)
    const path = `/services/${service.slug}`

    return {
        title: `${name} | CloudTopia Services`,
        description,
        openGraph: {
            title: `${name} | CloudTopia`,
            description,
            url: canonicalUrl(locale, path),
            images: ogImagesFor({ page: `services/${service.slug}`, locale }),
        },
        alternates: {
            canonical: canonicalUrl(locale, path),
            languages: {
                en: canonicalUrl('en', path),
                ar: canonicalUrl('ar', path),
                'x-default': canonicalUrl('en', path),
            },
        },
    }
}

export default async function ServiceDetailPage({ params }: PageProps) {
    const { locale = 'en', service: serviceSlug } = await params
    const service = getService(serviceSlug)
    if (!service) notFound()

    const category = getServiceCategory(service.categorySlug)
    const L = pageLabels(locale)
    const isRTL = locale === 'ar'
    const serviceName = localizedServiceValue(service.name, locale)
    const categoryName = category ? localizedServiceValue(category.name, locale) : ''
    const relatedServices = (category?.services || [])
        .filter((candidate) => candidate.slug !== service.slug)
        .slice(0, 4)
    const shortAnswer = isRTL
        ? `${serviceName} من CloudTopia هو مسار تنفيذ محدد النطاق للشركات التي تحتاج نتيجة قابلة للإطلاق، محتوى عربي وإنجليزي، ملكية كاملة، وتكاملات عملية دون حزمة مبالغ فيها.`
        : `${serviceName} from CloudTopia is a scoped delivery path for companies that need a launch-ready outcome, Arabic and English content, full ownership, and practical integrations without an oversized package.`
    const serviceTiers: PricingTier[] = (category?.packageNames || []).map((packageName, index) => {
        const baseFeatures = [
            ...service.features.slice(0, 4),
            ...service.outcomes.slice(0, 2),
            isRTL ? 'استشارة مجانية قبل تحديد النطاق' : 'Free consultation before scope is finalized',
            isRTL ? 'معاينة ديمو مجانية مخصصة حسب طلب الشركة' : 'Free custom demo preview based on the company inquiry',
            isRTL ? 'تسليم الحسابات والتوثيق والملكية' : 'Account, documentation, and ownership handoff',
        ]

        return {
            name: packageName,
            icon: serviceTierIcon(index),
            price: index === 2 ? (isRTL ? 'عرض مخصص' : 'Custom quote') : (isRTL ? 'سعر ثابت' : 'Fixed scope'),
            description: index === 0
                ? (isRTL ? `بداية منظمة لخدمة ${serviceName}` : `A focused starting path for ${serviceName}`)
                : index === 1
                    ? (isRTL ? `مسار أوسع للشركات التي تحتاج تنفيذ ${serviceName} مع ربط وتشغيل` : `A stronger path for companies that need ${serviceName} with integrations and launch support`)
                    : (isRTL ? `تنفيذ مخصص لخدمة ${serviceName} عندما يكون النطاق أكبر أو متعدد الفرق` : `Custom ${serviceName} delivery when the scope is larger or multi-team`),
            features: Array.from(new Set(baseFeatures)).slice(0, 9),
            popular: index === 1,
            color: serviceTierColor(index),
            href: localePath(locale, '/contact'),
            ctaLabel: L.packageCta,
        }
    })

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: service.faqs.map((faq) => ({
            '@type': 'Question',
            name: localizedServiceValue(faq.question, locale),
            acceptedAnswer: {
                '@type': 'Answer',
                text: localizedServiceValue(faq.answer, locale),
            },
        })),
    }

    const serviceSchema = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: serviceName,
        serviceType: categoryName,
        provider: { '@type': 'Organization', name: 'CloudTopia', url: 'https://cloudtopia.net' },
        url: canonicalUrl(locale, `/services/${service.slug}`),
        areaServed: ['Gulf region', 'Middle East', 'Global'],
        offers: category?.packageNames.map((packageName) => ({
            '@type': 'Offer',
            name: packageName,
            availability: 'https://schema.org/InStock',
        })),
    }

    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl(locale, '/') },
            { '@type': 'ListItem', position: 2, name: 'Services', item: canonicalUrl(locale, '/services') },
            { '@type': 'ListItem', position: 3, name: serviceName, item: canonicalUrl(locale, `/services/${service.slug}`) },
        ],
    }

    return (
        <main className="relative min-h-screen bg-lavender" dir={isRTL ? 'rtl' : 'ltr'}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <section className="relative overflow-hidden bg-[#f4f1f8] px-4 pb-20 pt-32 sm:px-6 lg:px-8 md:pb-28 md:pt-40" data-header-theme="light">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_14%,rgba(125,211,252,0.36),transparent_30%),radial-gradient(circle_at_86%_10%,rgba(216,180,254,0.42),transparent_34%),radial-gradient(circle_at_55%_92%,rgba(187,247,208,0.34),transparent_34%)]" />
                <div className="relative max-w-6xl mx-auto">
                    <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-neutral-200 shadow-sm text-sm font-semibold text-neutral-800 mb-6">
                        <Settings2 className="w-3.5 h-3.5 text-primary-600" />
                        {L.badge}
                    </span>
                    <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 items-end">
                        <div>
                            <p className="text-sm font-bold uppercase tracking-wider text-primary-700 mb-4">{categoryName}</p>
                            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-900 leading-[1.05] mb-8">
                                {serviceName}
                            </h1>
                            <p className="text-lg md:text-xl text-neutral-600 leading-relaxed max-w-3xl">
                                {localizedServiceValue(service.description, locale)}
                            </p>
                        </div>

                        <div className="rounded-3xl bg-neutral-950 text-white p-7 border border-white/10 shadow-2xl">
                            <div className="flex items-center gap-3 mb-5">
                                <Rocket className="w-5 h-5 text-cyan-300" />
                                <h2 className="text-xl font-bold">{L.packages}</h2>
                            </div>
                            <div className="grid gap-3">
                                {(category?.packageNames || []).map((packageName) => (
                                    <div key={packageName} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/85">
                                        {packageName}
                                    </div>
                                ))}
                            </div>
                            <Link href={localePath(locale, '/pricing')} className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-neutral-950 transition-colors hover:bg-cyan-100">
                                <CircleDollarSign className="h-4 w-4" />
                                {L.pricing}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative px-4 py-16 sm:px-6 lg:px-8 md:py-20">
                <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                    <div className="rounded-3xl border border-neutral-200 bg-white p-7 shadow-sm">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-neutral-950 text-white">
                            <ShieldCheck className="h-5 w-5" />
                        </div>
                        <p className="mb-3 text-sm font-black uppercase tracking-wider text-primary-700">{L.answerTitle}</p>
                        <h2 className="text-2xl font-bold text-neutral-950 md:text-3xl">{serviceName}</h2>
                        <p className="mt-4 text-base leading-relaxed text-neutral-600">{shortAnswer}</p>
                    </div>

                    <div className="rounded-3xl border border-neutral-200 bg-white/75 p-7">
                        <h2 className="mb-6 text-2xl font-bold text-neutral-950 md:text-3xl">{L.bestFor}</h2>
                        <div className="grid gap-3">
                            {L.bestForItems.map((item) => (
                                <div key={item} className="flex gap-3 rounded-2xl border border-neutral-200 bg-white p-4">
                                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary-600" />
                                    <p className="text-sm leading-relaxed text-neutral-700">{item}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto grid lg:grid-cols-3 gap-6">
                    <div className="rounded-3xl bg-white border border-neutral-200 p-7">
                        <CheckCircle2 className="w-8 h-8 text-primary-600 mb-5" />
                        <h2 className="text-2xl font-bold text-neutral-900 mb-5">{L.features}</h2>
                        <ul className="space-y-3">
                            {service.features.map((feature) => (
                                <li key={feature} className="text-neutral-700 leading-relaxed">{feature}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-3xl bg-white border border-neutral-200 p-7">
                        <Layers className="w-8 h-8 text-secondary-600 mb-5" />
                        <h2 className="text-2xl font-bold text-neutral-900 mb-5">{L.outcomes}</h2>
                        <ul className="space-y-3">
                            {service.outcomes.map((outcome) => (
                                <li key={outcome} className="text-neutral-700 leading-relaxed">{outcome}</li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-3xl bg-white border border-neutral-200 p-7">
                        <Settings2 className="w-8 h-8 text-neutral-900 mb-5" />
                        <h2 className="text-2xl font-bold text-neutral-900 mb-5">{L.technologies}</h2>
                        <div className="flex flex-wrap gap-2">
                            {service.technologies.map((technology) => (
                                <span key={technology} className="rounded-full bg-lavender border border-neutral-200 px-3 py-1 text-sm font-semibold text-neutral-700">
                                    {technology}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="relative bg-white px-4 py-20 sm:px-6 lg:px-8 md:py-28">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-10 max-w-3xl">
                        <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary-100">
                            <Layers className="h-5 w-5 text-primary-700" />
                        </div>
                        <h2 className="text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">{L.deliverables}</h2>
                    </div>
                    <div className="grid gap-5 md:grid-cols-3">
                        {L.deliverablesItems.map((item, index) => (
                            <article key={item.title} className="rounded-3xl border border-neutral-200 bg-lavender p-6">
                                <div className="mb-5 text-sm font-black text-primary-700">{String(index + 1).padStart(2, '0')}</div>
                                <h3 className="text-xl font-bold text-neutral-950">{item.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-10">{L.process}</h2>
                    <div className="grid md:grid-cols-4 gap-4">
                        {L.processSteps.map((step, index) => (
                            <div key={step} className="rounded-3xl bg-lavender border border-neutral-200 p-6">
                                <div className="text-sm font-black text-primary-700 mb-4">{String(index + 1).padStart(2, '0')}</div>
                                <h3 className="text-xl font-bold text-neutral-900">{step}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {relatedServices.length > 0 && (
                <section className="relative px-4 py-20 sm:px-6 lg:px-8 md:py-28">
                    <div className="mx-auto max-w-6xl">
                        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                            <div>
                                <p className="mb-3 text-sm font-black uppercase tracking-wider text-primary-700">{categoryName}</p>
                                <h2 className="text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">{L.related}</h2>
                            </div>
                            <Link href={localePath(locale, '/services')} className="inline-flex items-center gap-2 text-sm font-bold text-primary-700 hover:text-primary-900">
                                {L.allServices}
                                <ArrowUpRight className="h-4 w-4" />
                            </Link>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {relatedServices.map((relatedService) => (
                                <Link
                                    key={relatedService.slug}
                                    href={localePath(locale, `/services/${relatedService.slug}`)}
                                    className="group flex min-h-44 flex-col justify-between rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-neutral-900 hover:shadow-xl"
                                >
                                    <div>
                                        <h3 className="text-lg font-bold text-neutral-950">{localizedServiceValue(relatedService.name, locale)}</h3>
                                        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-neutral-600">{localizedServiceValue(relatedService.description, locale)}</p>
                                    </div>
                                    <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary-700">
                                        {L.start}
                                        <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                                    </span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-3 mb-10">
                        <HelpCircle className="w-6 h-6 text-primary-700" />
                        <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">{L.faqs}</h2>
                    </div>
                    <div className="space-y-4">
                        {service.faqs.map((faq) => (
                            <div key={faq.question.en} className="p-6 rounded-2xl bg-white border border-neutral-200">
                                <h3 className="text-lg font-bold text-neutral-900 mb-3">{localizedServiceValue(faq.question, locale)}</h3>
                                <p className="text-base text-neutral-600 leading-relaxed">{localizedServiceValue(faq.answer, locale)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {serviceTiers.length > 0 && (
                <CreativePricing
                    tag={categoryName || L.packages}
                    title={`${serviceName}: ${L.packageTitle}`}
                    description={L.packageDescription}
                    tiers={serviceTiers}
                    dir={isRTL ? 'rtl' : 'ltr'}
                    className="bg-[#f4f1f8] py-16 md:py-20"
                />
            )}

            <section className="relative py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#0a0a1a] overflow-hidden" data-header-theme="dark">
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{ backgroundImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, rgba(14,165,233,0.18), transparent 60%)' }}
                />
                <div className="relative max-w-3xl mx-auto text-center">
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-5">{L.readyTitle}</h2>
                    <p className="text-lg text-white/75 mb-8">{L.readyDesc}</p>
                    <div className="flex flex-col sm:flex-row justify-center gap-3">
                        <Link href={localePath(locale, '/contact')} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-white text-neutral-900 font-semibold hover:bg-cyan-100 transition-colors">
                            {L.start}
                            <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                        </Link>
                        <Link href={localePath(locale, '/pricing')} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors">
                            <CircleDollarSign className="w-4 h-4" />
                            {L.pricing}
                        </Link>
                        <Link href={localePath(locale, '/services')} className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white font-semibold hover:bg-white/10 transition-colors">
                            {L.allServices}
                        </Link>
                    </div>
                </div>
            </section>
        </main>
    )
}
