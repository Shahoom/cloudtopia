import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle2, Globe2, MapPin, MessageCircle, Sparkles } from 'lucide-react'
import {
    countryLandingPages,
    countryWhatsappUrl,
    type CountryLocale,
} from '@/lib/seo/country-landing-pages'
import { ogImagesFor } from '@/lib/og/og-image'

type PageProps = {
    params: Promise<{ locale: string }>
}

function resolveLocale(rawLocale: string): CountryLocale | null {
    if (rawLocale === 'ar' || rawLocale === 'en') return rawLocale
    return null
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { locale: rawLocale } = await params
    const locale = resolveLocale(rawLocale)
    if (!locale) return { title: 'Markets Not Found' }

    const isArabic = locale === 'ar'
    const title = isArabic ? 'أفضل شركة برمجيات في العالم العربي | كلاود توبيا' : 'Best Software Company in the Arab World | CloudTopia'
    const description = isArabic
        ? 'كلاود توبيا شركة برمجيات رائدة في العالم العربي. نبني مواقع ومتاجر إلكترونية وأنظمة CRM وERP وتطبيقات وحلول ذكاء اصطناعي للشركات في الخليج ومصر وبلاد الشام، بخبرة محلية ودعم بالعربية والإنجليزية.'
        : 'CloudTopia is a leading software company across the Arab world. We build websites, online stores, CRM, ERP, web apps, and AI solutions for businesses in the Gulf, Egypt, and the Levant — with local expertise and Arabic + English support.'
    const canonical = isArabic ? 'https://cloudtopia.net/ar/markets' : 'https://cloudtopia.net/markets'
    const images = ogImagesFor({ page: 'markets', locale })

    return {
        title,
        description,
        keywords: isArabic
            ? ['أفضل شركة برمجيات في العالم العربي', 'شركة برمجيات في الخليج', 'تطوير مواقع عربي', 'CRM عربي']
            : ['best software company in the Arab world', 'software company in GCC', 'Arabic web development', 'CRM development GCC'],
        openGraph: {
            title,
            description,
            url: canonical,
            siteName: 'CloudTopia',
            type: 'website',
            images,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: images.map((image) => image.url),
        },
        alternates: {
            canonical,
            languages: {
                en: 'https://cloudtopia.net/markets',
                ar: 'https://cloudtopia.net/ar/markets',
                'x-default': 'https://cloudtopia.net/markets',
            },
        },
    }
}

export default async function MarketsPage({ params }: PageProps) {
    const { locale: rawLocale } = await params
    const locale = resolveLocale(rawLocale)
    if (!locale) notFound()

    const isArabic = locale === 'ar'
    const dir = isArabic ? 'rtl' : 'ltr'
    const homeHref = isArabic ? '/ar' : '/'
    const title = isArabic ? 'أسواق كلاود توبيا' : 'CloudTopia Markets'
    const intro = isArabic
        ? 'اختر دولتك لتصل إلى صفحة خدمات مبنية على سعرك المحلي، لغتك، وطريقة تواصل مباشرة مع فريقنا. شريك برمجي واحد، مهيّأ لكل سوق عربي على حدة.'
        : 'Choose your country to reach a services page built around your local pricing, language, and a direct line to our team. One software partner, tuned to each Arab market.'
    const proofItems = isArabic
        ? ['أسعار محلية بعملتك', 'فريق يفهم سوقك المحلي', 'تواصل مباشر وسريع عبر واتساب']
        : ['Local pricing in your currency', 'A team that knows your market', 'Fast, direct WhatsApp contact']

    const itemListSchema = {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        name: title,
        itemListElement: countryLandingPages.map((country, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: isArabic ? country.countryNameArabic : country.countryNameEnglish,
            url: `https://cloudtopia.net${isArabic ? country.arabicUrl : country.englishUrl}`,
        })),
    }
    const organizationSchema = {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'CloudTopia',
        url: 'https://cloudtopia.net',
        sameAs: ['https://instagram.com/thecloudtopia'],
    }
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cloudtopia.net/' },
            { '@type': 'ListItem', position: 2, name: title, item: isArabic ? 'https://cloudtopia.net/ar/markets' : 'https://cloudtopia.net/markets' },
        ],
    }

    return (
        <main dir={dir} className="min-h-screen bg-[#f4f1f8] text-neutral-950">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
            <header className="sticky top-0 z-50 border-b border-neutral-950 bg-[#f4f1f8]/92 backdrop-blur-xl">
                <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
                    <Link href={homeHref} className="flex items-center gap-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500" translate="no">
                        <Image src="/images/CloudTopia.svg" alt="CloudTopia" width={48} height={48} className="h-12 w-12 shrink-0" />
                        {isArabic ? (
                            <span className="flex flex-col leading-none">
                                <span className="font-logo-ar text-2xl font-black">كلاود<span className="text-sky-600">توبيا</span></span>
                                <span className="mt-1 font-tagline-ar text-[11px] tracking-[0.05em] text-neutral-600">تكنولوجيا رقمية وسحابية</span>
                            </span>
                        ) : (
                            <span className="flex flex-col leading-none">
                                <span className="font-logo text-xl font-black">Cloud<span className="text-sky-600">Topia</span></span>
                                <span className="mt-1 text-[9px] font-black uppercase tracking-[0.08em] text-neutral-600">Digital & Cloud Technologies</span>
                            </span>
                        )}
                    </Link>
                    <Link href={homeHref} className="border border-neutral-950 bg-white px-4 py-2 text-sm font-black transition-colors duration-200 hover:bg-neutral-950 hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">
                        {isArabic ? 'العودة إلى الموقع الرئيسي' : 'Back to main site'}
                    </Link>
                </div>
            </header>

            <section className="relative overflow-hidden border-b border-neutral-950 px-4 py-16 sm:px-6 lg:px-8 md:py-24">
                <div className="pointer-events-none absolute inset-0 opacity-[0.16]" style={{ backgroundImage: 'linear-gradient(#0a0a0a 1px, transparent 1px), linear-gradient(90deg, #0a0a0a 1px, transparent 1px)', backgroundSize: '42px 42px' }} />
                <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
                    <div>
                        <div className="mb-5 inline-flex items-center gap-2 border border-neutral-950 bg-white px-4 py-2 text-sm font-black text-neutral-800 shadow-[4px_4px_0_rgba(10,10,10,0.12)]">
                            <Globe2 className="h-4 w-4 text-sky-600" aria-hidden="true" />
                            {isArabic ? 'صفحات الأسواق الرسمية' : 'Official Market Pages'}
                        </div>
                        <h1 className="max-w-4xl text-4xl font-black leading-[1.05] text-neutral-950 text-balance md:text-6xl">{title}</h1>
                        <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-700">{intro}</p>
                    </div>
                    <div className="border border-neutral-950 bg-neutral-950 p-5 text-white shadow-[10px_10px_0_rgba(2,132,199,0.25)]">
                        <p className="text-sm font-black text-sky-300">{isArabic ? 'قبل اختيار الدولة' : 'Before You Pick'}</p>
                        <div className="mt-4 grid gap-3">
                            {proofItems.map((item) => (
                                <div key={item} className="flex items-center gap-2 border border-white/15 bg-white/8 px-3 py-2 text-sm font-bold text-white/82">
                                    <CheckCircle2 className="h-4 w-4 text-sky-300" aria-hidden="true" />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className="px-4 py-14 sm:px-6 lg:px-8 md:py-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 flex flex-col justify-between gap-4 border-b border-neutral-950 pb-5 md:flex-row md:items-end">
                        <div>
                            <div className="mb-3 inline-flex items-center gap-2 bg-neutral-950 px-3 py-1.5 text-xs font-black uppercase tracking-[0.16em] text-white">
                                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                                {isArabic ? 'اختر السوق' : 'Pick a Market'}
                            </div>
                            <h2 className="text-3xl font-black text-neutral-950 md:text-4xl">{isArabic ? 'لكل دولة صفحتها المخصّصة' : 'A dedicated page for every market'}</h2>
                        </div>
                        <p className="max-w-xl text-sm leading-7 text-neutral-600">
                            {isArabic ? 'اختر دولتك لترى الخدمات والأسعار وطريقة التواصل المناسبة لسوقك، بالعملة واللغة التي تعمل بها.' : 'Pick your country to see the services, pricing, and contact options that fit your market — in the currency and language you work in.'}
                        </p>
                    </div>
                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                        {countryLandingPages.map((country, index) => {
                            const content = country.content[locale]
                            const href = isArabic ? country.arabicUrl : country.englishUrl
                            const name = isArabic ? country.countryNameArabic : country.countryNameEnglish
                            return (
                                <Link
                                    key={country.slug}
                                    href={href}
                                    className="group grid min-h-[280px] overflow-hidden border border-neutral-950 bg-white transition-[transform,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-[8px_8px_0_rgba(10,10,10,0.18)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500"
                                >
                                    <div className="relative h-36 border-b border-neutral-950">
                                        <Image
                                            src={country.theme.photo.src}
                                            alt={isArabic ? country.theme.photo.altArabic : country.theme.photo.altEnglish}
                                            fill
                                            sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/55 to-transparent" />
                                        <span className="absolute start-4 top-4 bg-white px-2 py-1 text-[11px] font-black text-neutral-950 tabular-nums">{String(index + 1).padStart(2, '0')}</span>
                                        <span className="absolute bottom-4 end-4 px-3 py-1 text-xs font-black text-white" style={{ backgroundColor: country.theme.primaryAccent }}>{country.currency}</span>
                                    </div>
                                    <div className="grid gap-4 p-5">
                                        <div className="flex items-start justify-between gap-4">
                                            <h2 className="text-2xl font-black text-neutral-950">{name}</h2>
                                            <ArrowRight className={`mt-1 h-5 w-5 shrink-0 transition-transform duration-200 group-hover:translate-x-1 ${isArabic ? 'rotate-180 group-hover:-translate-x-1' : ''}`} aria-hidden="true" />
                                        </div>
                                        <p className="line-clamp-3 text-sm leading-7 text-neutral-600">{content.seoDescription}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {content.secondaryKeywords.slice(0, 2).map((keyword) => (
                                                <span key={keyword} className="border border-neutral-200 bg-[#f4f1f8] px-2.5 py-1 text-[11px] font-bold text-neutral-700">{keyword}</span>
                                            ))}
                                        </div>
                                    </div>
                                </Link>
                            )
                        })}
                    </div>
                </div>
            </section>

            <section className="px-4 pb-20 sm:px-6 lg:px-8">
                <div className="mx-auto grid max-w-7xl gap-4 border border-neutral-950 bg-white p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
                    <div>
                        <div className="mb-3 inline-flex items-center gap-2 text-sm font-black text-sky-700">
                            <Sparkles className="h-4 w-4" aria-hidden="true" />
                            {isArabic ? 'استشارة مجانية' : 'Free Consultation'}
                        </div>
                        <h2 className="text-3xl font-black text-neutral-950">{isArabic ? 'غير متأكد من الصفحة المناسبة؟' : 'Not sure which market page fits?'}</h2>
                        <p className="mt-3 max-w-2xl text-neutral-600">
                            {isArabic ? 'تواصل معنا وسنراجع الدولة، نوع المشروع، واللغة المناسبة ثم نوجهك إلى أفضل صفحة أو نطاق عمل.' : 'Contact us and we will review the country, project type, and language path, then point you to the best page or scope.'}
                        </p>
                    </div>
                    <Link href={countryWhatsappUrl(countryLandingPages[0], locale)} className="inline-flex items-center justify-center gap-2 border border-neutral-950 bg-neutral-950 px-5 py-3 text-sm font-black text-white transition-colors duration-200 hover:bg-sky-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500">
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                        {isArabic ? 'تواصل واتساب' : 'Contact on WhatsApp'}
                    </Link>
                </div>
            </section>
        </main>
    )
}
