import type { Metadata } from 'next'
import Link from 'next/link'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { ArrowRight, CheckCircle2, CreditCard, MessageCircle, Pencil, Sparkles, Star } from 'lucide-react'
import { canonicalUrl, localePath } from '@/lib/i18n/url'
import { buildOrganizationRef } from '@/lib/seo/schema'
import { ogImagesFor } from '@/lib/og/og-image'
import { CreativePricing, type PricingTier } from '@/components/ui/creative-pricing'

type PageProps = {
    params: Promise<{ locale: string }>
}

type PricingPackage = {
    name: string
    price: string
    badge?: string
    features: string[]
}

type PricingCategory = {
    title: string
    packages: PricingPackage[]
}

type PricingContent = {
    title: string
    lastUpdated: string
    currency: string
    categories: PricingCategory[]
    notes: string[]
    contact: string[]
}

const recommendedBadgeLabels = ['Most Popular', 'Best Value', 'الأكثر طلباً', 'الأفضل قيمة']

const labels = {
    en: {
        eyebrow: 'Packages & scope',
        title: 'Service packages sized for the work you actually need.',
        description: 'Compare fixed-scope paths for websites, stores, systems, apps, cloud, AI, content, social, and QR menus. Every package is quoted to your exact scope — and every inquiry starts with a free consultation and demo preview.',
        popular: 'Recommended',
        notes: 'Commercial notes',
        contactTitle: 'Need a custom quote?',
        contactBody: 'Tell us the scope, market, integrations, and timeline. We will reply with the right package or a custom build estimate.',
        contactCta: 'Request a quote',
        servicesCta: 'Compare services',
        cardCta: 'Request a quote',
        selectorEyebrow: 'Package selector',
        selectorTitle: 'Which package path fits your project?',
        selectorDescription: 'Use this as a quick buying guide before you compare every plan. The right path depends on whether you need a public presence, online sales, internal operations, or ongoing growth.',
        selectorCta: 'Explore path',
        showFullFeaturesLabel: 'Show Full Features',
        decisionGuide: [
            {
                title: 'Launch or rebuild a public website',
                fit: 'Best for company sites, landing pages, service pages, and bilingual Arabic + English presence.',
                path: 'Start with Website Design, then add SEO or content if acquisition matters from day one.',
                href: '/services/website-development/business-website-development',
            },
            {
                title: 'Sell products or accept payments',
                fit: 'Best for stores, checkout, subscriptions, payment gateways, catalogs, and regional commerce.',
                path: 'Start with E-commerce or Payment Gateway Integration depending on whether the storefront already exists.',
                href: '/services/ecommerce-development',
            },
            {
                title: 'Run operations with less manual work',
                fit: 'Best for CRM, inventory, HR, booking, dashboards, portals, and custom business systems.',
                path: 'Start with Custom CRM, Business Automation, or Admin Dashboard when the work happens behind the login.',
                href: '/services/custom-erp-crm-solutions/crm-development',
            },
            {
                title: 'Grow traffic, trust, and conversion',
                fit: 'Best for SEO, conversion optimization, content, brand identity, and social media execution.',
                path: 'Start with SEO, Content, CRO, or Brand Identity after the offer and conversion path are clear.',
                href: '/services/search-engine-optimization',
            },
        ],
        faqTitle: 'Pricing questions buyers ask before booking',
        pricingFaqs: [
            {
                question: 'Can we start with a fixed package and expand later?',
                answer: 'Yes. Most projects start with a fixed package, then move into add-ons, retainers, or custom phases once the first launch is stable.',
            },
            {
                question: 'Do prices include Arabic and English content structure?',
                answer: 'The listed packages include bilingual structure where stated. Larger Arabic + English content production, SEO writing, or translation workflows are scoped separately.',
            },
            {
                question: 'When do we need a custom quote?',
                answer: 'Custom quotes are best for multi-country commerce, complex integrations, internal systems, marketplaces, or projects with unclear data and workflow requirements.',
            },
        ],
    },
    ar: {
        eyebrow: 'الباقات والنطاق',
        title: 'باقات خدمات بحجم العمل الذي تحتاجه فعلاً.',
        description: 'قارن مسارات ثابتة للمواقع، المتاجر، الأنظمة، التطبيقات، السحابة، الذكاء الاصطناعي، المحتوى، السوشيال، وقوائم QR. كل باقة تُسعّر حسب نطاقك بالضبط، ويبدأ كل استفسار باستشارة مجانية ومعاينة ديمو.',
        popular: 'موصى به',
        notes: 'ملاحظات تجارية',
        contactTitle: 'تحتاج عرض سعر مخصص؟',
        contactBody: 'أخبرنا بالنطاق والسوق والتكاملات والجدول الزمني، وسنرسل لك الباقة المناسبة أو تقدير بناء مخصص.',
        contactCta: 'اطلب عرض سعر',
        servicesCta: 'قارن الخدمات',
        cardCta: 'اطلب عرض سعر',
        selectorEyebrow: 'اختيار الباقة',
        selectorTitle: 'أي مسار يناسب مشروعك؟',
        selectorDescription: 'استخدم هذا الدليل السريع قبل مقارنة كل باقة. المسار الصحيح يعتمد على حاجتك: حضور عام، بيع إلكتروني، عمليات داخلية، أو نمو مستمر.',
        selectorCta: 'استكشف المسار',
        showFullFeaturesLabel: 'عرض كل المميزات',
        decisionGuide: [
            {
                title: 'إطلاق أو إعادة بناء موقع عام',
                fit: 'مناسب لمواقع الشركات والصفحات التعريفية وصفحات الخدمات والحضور العربي + الإنجليزي.',
                path: 'ابدأ بتصميم وتطوير المواقع، ثم أضف SEO أو المحتوى إذا كان جذب العملاء مهماً من اليوم الأول.',
                href: '/services/website-development/business-website-development',
            },
            {
                title: 'بيع المنتجات أو قبول المدفوعات',
                fit: 'مناسب للمتاجر والدفع والاشتراكات وبوابات الدفع والكتالوجات والتجارة الإقليمية.',
                path: 'ابدأ بتطوير متجر إلكتروني أو تكامل بوابات الدفع حسب وجود المتجر الحالي.',
                href: '/services/ecommerce-development',
            },
            {
                title: 'تشغيل العمليات بعمل يدوي أقل',
                fit: 'مناسب لـ CRM والمخزون والموارد البشرية والحجوزات ولوحات التحكم وبوابات العملاء.',
                path: 'ابدأ بـ CRM مخصص أو أتمتة الأعمال أو لوحة إدارة عندما يحدث العمل خلف تسجيل الدخول.',
                href: '/services/custom-erp-crm-solutions/crm-development',
            },
            {
                title: 'زيادة الزيارات والثقة والتحويل',
                fit: 'مناسب لـ SEO وتحسين التحويل والمحتوى والهوية وإدارة الشبكات الاجتماعية.',
                path: 'ابدأ بـ SEO أو المحتوى أو CRO أو الهوية بعد وضوح العرض ومسار التحويل.',
                href: '/services/search-engine-optimization',
            },
        ],
        faqTitle: 'أسئلة التسعير التي يسألها المشترون قبل الحجز',
        pricingFaqs: [
            {
                question: 'هل يمكن أن نبدأ بباقة ثابتة ثم نوسّع لاحقاً؟',
                answer: 'نعم. تبدأ معظم المشاريع بباقة ثابتة، ثم تنتقل إلى إضافات أو عقود شهرية أو مراحل مخصصة بعد استقرار الإطلاق الأول.',
            },
            {
                question: 'هل تشمل الأسعار هيكلة محتوى عربي وإنجليزي؟',
                answer: 'تشمل الباقات الهيكلة ثنائية اللغة عندما تكون مذكورة. إنتاج محتوى عربي + إنجليزي واسع أو كتابة SEO أو سير ترجمة مخصص يتم تسعيره منفصلاً.',
            },
            {
                question: 'متى نحتاج عرض سعر مخصص؟',
                answer: 'العروض المخصصة مناسبة للتجارة متعددة الدول، التكاملات المعقدة، الأنظمة الداخلية، الأسواق متعددة البائعين، أو المشاريع ذات بيانات وسير عمل غير واضحين.',
            },
        ],
    },
}

function pageLabels(locale: string) {
    return labels[(locale as keyof typeof labels) || 'en'] || labels.en
}

function readPricingSource(locale: string) {
    const sourceFile = locale === 'ar' ? 'pricing.ar.md' : 'pricing.md'
    return readFileSync(path.join(process.cwd(), 'public', sourceFile), 'utf8')
}

function parsePackageHeading(heading: string): PricingPackage {
    const [namePart, rawPricePart = 'Custom quote'] = heading.split(/\s+\u2014\s+/)
    const badgeMatch = rawPricePart.match(/\u2b50\s*(.+)$/)
    const price = rawPricePart.replace(/\s*\u2b50\s*.+$/, '').trim()

    return {
        name: namePart.trim(),
        price,
        badge: badgeMatch?.[1]?.trim(),
        features: [],
    }
}

function parsePricingMarkdown(source: string): PricingContent {
    const lines = source.split(/\r?\n/).map((line) => line.trim())
    const content: PricingContent = {
        title: 'CloudTopia Service Pricing',
        lastUpdated: '',
        currency: 'USD',
        categories: [],
        notes: [],
        contact: [],
    }

    let currentCategory: PricingCategory | null = null
    let currentPackage: PricingPackage | null = null
    let mode: 'categories' | 'notes' | 'contact' = 'categories'

    for (const line of lines) {
        if (!line || line === '---' || line.startsWith('Full details:')) continue

        if (line.startsWith('# ')) {
            content.title = line.replace(/^#\s+/, '').replace(/\s+\u2014\s+/, ' ')
            continue
        }

        if (line.startsWith('Last updated:')) {
            content.lastUpdated = line.replace('Last updated:', '').trim()
            continue
        }

        if (line.startsWith('Currency:')) {
            content.currency = line.replace('Currency:', '').trim()
            continue
        }

        if (line.startsWith('## ')) {
            const title = line.replace(/^##\s+/, '').trim()
            currentPackage = null

            if (title === 'Add-ons & Notes') {
                mode = 'notes'
                currentCategory = null
                continue
            }

            if (title === 'Contact for Quotes') {
                mode = 'contact'
                currentCategory = null
                continue
            }

            mode = 'categories'
            currentCategory = { title, packages: [] }
            content.categories.push(currentCategory)
            continue
        }

        if (mode === 'categories' && line.startsWith('### ') && currentCategory) {
            currentPackage = parsePackageHeading(line.replace(/^###\s+/, '').trim())
            currentCategory.packages.push(currentPackage)
            continue
        }

        if (line.startsWith('- ')) {
            const item = line.replace(/^-\s+/, '').trim()

            if (mode === 'notes') {
                content.notes.push(item)
            } else if (mode === 'contact') {
                content.contact.push(item)
            } else if (currentPackage) {
                currentPackage.features.push(item)
            }
        }
    }

    return content
}

function expandedPlanFeatures(plan: PricingPackage, _categoryTitle: string, _locale: string) {
    return plan.features
}

function categorySectionId(categoryTitle: string) {
    return categoryTitle
        .toLowerCase()
        .replace(/&/g, 'and')
        .replace(/[^a-z0-9\u0600-\u06ff]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

function tierIcon(index: number) {
    const icons = [
        <Pencil key="pencil" className="h-6 w-6" aria-hidden="true" />,
        <Star key="star" className="h-6 w-6" aria-hidden="true" />,
        <Sparkles key="sparkles" className="h-6 w-6" aria-hidden="true" />,
    ]
    return icons[index % icons.length]
}

function tierColor(index: number): PricingTier['color'] {
    return (['sky', 'amber', 'emerald'] as PricingTier['color'][])[index % 3]
}

function categoryPricingTitle(categoryTitle: string, locale: string) {
    if (locale === 'ar') return `${categoryTitle}: باقات واضحة قابلة للتوسع`
    return `${categoryTitle}: fixed packages, clean scope`
}

function categoryPricingDescription(categoryTitle: string, locale: string) {
    if (locale === 'ar') {
        return `كل باقة في ${categoryTitle} تشمل نطاقاً مكتوباً، مخرجات واضحة، وديمو مجاني قبل التنفيذ حتى تعرف ما الذي سيتم بناؤه.`
    }
    return `Each ${categoryTitle} package includes a written scope, clear deliverables, and a free demo preview before production starts.`
}

import { applySeoOverride } from '@/lib/cms/route-seo'

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale = 'en' } = await params
    const isArabic = locale === 'ar'
    // Enriched past the ~30-char minimum (was a bare "Pricing | CloudTopia") so the
    // title carries intent keywords; the layout template still adds the brand once.
    const title = isArabic ? 'الأسعار والباقات' : 'Pricing & Service Packages'
    const socialTitle = isArabic ? 'الأسعار والباقات | كلاود توبيا' : 'Pricing & Service Packages | CloudTopia'
    const description = isArabic
        ? 'أسعار كلاود توبيا للمواقع، المتاجر، أنظمة CRM وERP، تطبيقات الويب والجوال، السحابة، وأتمتة الذكاء الاصطناعي.'
        : 'CloudTopia pricing for websites, e-commerce, CRM, ERP, web apps, mobile apps, cloud, and AI automation.'

    const meta: Metadata = {
        title,
        description,
        openGraph: {
            title: socialTitle,
            description,
            url: canonicalUrl(locale, '/pricing'),
            siteName: 'CloudTopia',
            type: 'website',
            // Page-level openGraph shallow-merges over the layout's, dropping
            // its og:locale — restate it here.
            locale: locale === 'ar' ? 'ar_SA' : 'en_US',
            alternateLocale: locale === 'ar' ? 'en_US' : 'ar_SA',
            images: ogImagesFor({ page: 'pricing', locale }),
        },
        twitter: {
            title: socialTitle,
            description,
            card: 'summary_large_image',
            images: ogImagesFor({ page: 'pricing', locale }).map((image) => image.url),
        },
        alternates: {
            canonical: canonicalUrl(locale, '/pricing'),
            languages: {
                en: canonicalUrl('en', '/pricing'),
                ar: canonicalUrl('ar', '/pricing'),
                'x-default': canonicalUrl('en', '/pricing'),
            },
        },
    }

    return applySeoOverride(meta, locale, 'pricing')
}

export default async function PricingPage({ params }: PageProps) {
    const { locale = 'en' } = await params
    const L = pageLabels(locale)
    const isRTL = locale === 'ar'
    const pricing = parsePricingMarkdown(readPricingSource(locale))
    const pricingSchema = {
        '@context': 'https://schema.org',
        '@type': 'OfferCatalog',
        name: 'CloudTopia Service Pricing',
        url: canonicalUrl(locale, '/pricing'),
        provider: buildOrganizationRef(),
        itemListElement: pricing.categories.map((category) => ({
            '@type': 'OfferCatalog',
            name: category.title,
            itemListElement: category.packages.map((plan) => {
                // Pricing is now quote-based: the page no longer displays figures,
                // so we intentionally omit priceSpecification — Google requires any
                // schema price to be visible on the page (SD-4).
                return {
                    '@type': 'Offer',
                    name: `${category.title} - ${plan.name}`,
                    description: plan.features.join('; '),
                    availability: 'https://schema.org/InStock',
                    url: canonicalUrl(locale, '/pricing'),
                }
            }),
        })),
    }
    const pricingFaqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: L.pricingFaqs.map((item) => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer,
            },
        })),
    }

    return (
        <main className="relative min-h-screen bg-[#f4f1f8]" dir={isRTL ? 'rtl' : 'ltr'}>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pricingFaqSchema) }} />
            <section className="relative overflow-hidden bg-[#f4f1f8] px-4 pb-16 pt-32 sm:px-6 lg:px-8 md:pb-24 md:pt-40" data-header-theme="light">
                <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_20%,rgba(125,211,252,0.38),transparent_32%),radial-gradient(circle_at_84%_14%,rgba(216,180,254,0.45),transparent_34%),radial-gradient(circle_at_55%_90%,rgba(187,247,208,0.35),transparent_32%)]" />
                <div className="pointer-events-none absolute inset-0 opacity-[0.08]" style={{ backgroundImage: 'linear-gradient(to right,#0f172a 1px,transparent 1px),linear-gradient(to bottom,#0f172a 1px,transparent 1px)', backgroundSize: '56px 56px' }} />
                <div className="relative mx-auto max-w-6xl">
                    <div className="max-w-4xl">
                        <span className="mb-6 inline-flex rotate-[-1deg] items-center gap-2 border-2 border-slate-950 bg-white px-4 py-2 text-sm font-black text-slate-950 shadow-[4px_4px_0px_0px_#0f172a]">
                            <Sparkles className="h-3.5 w-3.5 text-primary-600" />
                            {L.eyebrow}
                        </span>
                        <h1 className="max-w-5xl text-4xl font-black leading-[1.05] tracking-tight text-neutral-950 md:text-6xl lg:text-7xl" style={{ textWrap: 'balance' }}>
                            {L.title}
                        </h1>
                        <p className="mt-7 max-w-3xl text-lg leading-relaxed text-neutral-600 md:text-xl">
                            {L.description}
                        </p>
                    </div>
                </div>
            </section>

            <section className="bg-[#f4f1f8] px-4 py-12 sm:px-6 lg:px-8 md:py-16">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-8 max-w-3xl">
                        <p className="text-sm font-black uppercase tracking-[0.22em] text-primary-700">{L.selectorEyebrow}</p>
                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-neutral-950 md:text-5xl">{L.selectorTitle}</h2>
                        <p className="mt-4 text-lg leading-relaxed text-neutral-600">{L.selectorDescription}</p>
                    </div>
                    <div className="grid gap-4 lg:grid-cols-4">
                        {L.decisionGuide.map((item, index) => {
                            const targetCategory = pricing.categories[Math.min(index, pricing.categories.length - 1)]
                            const categorySectionIdValue = categorySectionId(targetCategory.title)
                            return (
                            <article key={item.title} className="flex h-full flex-col border-2 border-slate-950 bg-white p-6 shadow-[5px_5px_0px_rgba(15,23,42,0.12)]">
                                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full border-2 border-slate-950 bg-sky-100 text-sky-800">
                                    <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
                                </div>
                                <h3 className="text-xl font-black text-neutral-950">{item.title}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.fit}</p>
                                <p className="mt-4 text-sm leading-relaxed font-semibold text-neutral-800">{item.path}</p>
                                <Link
                                    href={`#${categorySectionIdValue}`}
                                    className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-black text-primary-700 hover:text-primary-900"
                                >
                                    {L.selectorCta}
                                    <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} />
                                </Link>
                            </article>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="bg-[#f4f1f8] py-12 md:py-20">
                <div className="space-y-20">
                    {pricing.categories.map((category) => {
                        const categorySectionIdValue = categorySectionId(category.title)
                        const tiers: PricingTier[] = category.packages.map((plan, index) => ({
                            name: plan.name,
                            icon: tierIcon(index),
                            description: plan.badge ? `${plan.badge} · ${category.title}` : category.title,
                            features: expandedPlanFeatures(plan, category.title, locale),
                            popular: Boolean(plan.badge && recommendedBadgeLabels.includes(plan.badge)),
                            color: tierColor(index),
                            href: `/api/whatsapp?locale=${locale}`,
                            ctaLabel: L.cardCta,
                            showFullFeaturesLabel: L.showFullFeaturesLabel,
                        }))

                        return (
                            <CreativePricing
                                key={category.title}
                                id={categorySectionIdValue}
                                tag={category.title}
                                title={categoryPricingTitle(category.title, locale)}
                                description={categoryPricingDescription(category.title, locale)}
                                tiers={tiers}
                                dir={isRTL ? 'rtl' : 'ltr'}
                                className="scroll-mt-28"
                            />
                        )
                    })}
                </div>
            </section>

            <section className="bg-[#f4f1f8] px-4 py-12 sm:px-6 lg:px-8 md:py-20">
                <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[0.85fr_1.15fr]">
                    <div className="border-2 border-slate-950 bg-white p-7 shadow-[6px_6px_0px_rgba(15,23,42,0.12)]">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-slate-950 bg-amber-300 text-slate-950">
                            <CreditCard className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <h2 className="text-3xl font-bold text-neutral-950">{L.notes}</h2>
                        <ul className="mt-6 space-y-3">
                            {pricing.notes.map((note) => (
                                <li key={note} className="flex gap-3 text-neutral-700">
                                    <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-primary-600" aria-hidden="true" />
                                    <span>{note}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-2 border-slate-950 bg-neutral-950 p-7 text-white shadow-[6px_6px_0px_rgba(14,165,233,0.28)]">
                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/30 bg-white/10">
                            <MessageCircle className="h-5 w-5" aria-hidden="true" />
                        </div>
                        <h2 className="text-3xl font-bold">{L.contactTitle}</h2>
                        <p className="mt-4 max-w-2xl text-white/70 leading-relaxed">{L.contactBody}</p>
                        <div className="mt-6 grid gap-2 text-sm text-white/80">
                            {pricing.contact.map((item) => (
                                <p key={item}>{item}</p>
                            ))}
                        </div>
                        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                            <Link
                                href={`/api/whatsapp?locale=${locale}`}
                                className="inline-flex items-center justify-center gap-2 border-2 border-white bg-white px-6 py-3 text-sm font-bold text-neutral-950 transition-colors hover:bg-primary-100"
                            >
                                {L.contactCta}
                                <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
                            </Link>
                            <Link
                                href={localePath(locale, '/services')}
                                className="inline-flex items-center justify-center gap-2 border-2 border-white/30 px-6 py-3 text-sm font-bold text-white transition-colors hover:bg-white/10"
                            >
                                {L.servicesCta}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <section className="bg-[#f4f1f8] px-4 pb-20 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl border-2 border-slate-950 bg-white p-7 shadow-[6px_6px_0px_rgba(15,23,42,0.12)] md:p-10">
                    <h2 className="text-3xl font-bold tracking-tight text-neutral-950 md:text-4xl">{L.faqTitle}</h2>
                    <div className="mt-8 grid gap-5 md:grid-cols-3">
                        {L.pricingFaqs.map((item) => (
                            <article key={item.question} className="border-t border-neutral-200 pt-5">
                                <h3 className="text-lg font-black text-neutral-950">{item.question}</h3>
                                <p className="mt-3 text-sm leading-relaxed text-neutral-600">{item.answer}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    )
}
