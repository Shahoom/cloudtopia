import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { ogImagesFor } from '@/lib/og/og-image'
import { canonicalUrl, buildHreflangMap } from '@/lib/i18n/url'
import { buildFAQSchema } from '@/lib/seo/service-faqs'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/ecommerce-solutions', 'ecommerce-solutions')
    // Titles trimmed to fit Google's ~60-char SERP display.
    const titles: Record<string, string> = {
        en: 'Gulf E-Commerce — Mada, Apple Pay, Tabby, Tamara',
        ar: 'متاجر إلكترونية خليجية — مدى وآبل باي وتابي وتمارا',
    }
    const descs: Record<string, string> = {
        en: 'Online stores with Gulf payment gateways (Mada, Apple Pay, STC Pay, Tabby, Tamara), ZATCA e-invoicing, bilingual checkout. From $599.',
        ar: 'متاجر إلكترونية مع بوابات دفع خليجية (مدى، آبل باي، STC Pay، تابي، تمارا)، فوترة ZATCA، ودفع ثنائي. من 599$.',
    }
    const ogTitles: Record<string, string> = {
        en: 'E-Commerce — CloudTopia',
        ar: 'التجارة الإلكترونية — كلاود توبيا',
    }
    const ogDescs: Record<string, string> = {
        en: 'Enterprise-grade e-commerce solutions for Gulf businesses.',
        ar: 'حلول تجارة إلكترونية على مستوى المؤسسات لأعمال الخليج.',
    }
    const ogLocales: Record<string, string> = { en: 'en_US', ar: 'ar_SA' }
    const title = titles[locale] || titles.en
    const desc = descs[locale] || descs.en
    const ogTitle = ogTitles[locale] || ogTitles.en
    const ogDesc = ogDescs[locale] || ogDescs.en

    return {
        title,
        description: desc,
        openGraph: {
            title: ogTitle,
            description: ogDesc,
            url: canonicalUrl(locale, '/ecommerce-solutions'),
            locale: ogLocales[locale] || 'en_US',
            images: ogImagesFor({ page: 'ecommerce-solutions', locale }),
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: canonicalUrl(locale, '/ecommerce-solutions'),
            languages: buildHreflangMap('/ecommerce-solutions'),
        },
    }
}

export default async function ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params
    const faqSchema = await buildFAQSchema('ecommerce-solutions', locale)

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home', item: canonicalUrl(locale, '/') },
                            { '@type': 'ListItem', position: 2, name: 'Services', item: canonicalUrl(locale, '/services') },
                            { '@type': 'ListItem', position: 3, name: 'E-Commerce Solutions', item: canonicalUrl(locale, '/ecommerce-solutions') },
                        ],
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Service',
                        name: 'E-Commerce Solutions & Online Stores',
                        description: 'Full e-commerce stores with Mada, Apple Pay, STC Pay, Tabby, Tamara, ZATCA e-invoicing, and Arabic + English checkout.',
                        url: canonicalUrl(locale, '/ecommerce-solutions'),
                        provider: { '@type': 'Organization', name: 'CloudTopia', url: 'https://cloudtopia.net' },
                        serviceType: 'E-Commerce Development',
                        areaServed: [
                            { '@type': 'Country', name: 'Saudi Arabia' },
                            { '@type': 'Country', name: 'United Arab Emirates' },
                            { '@type': 'Country', name: 'Kuwait' },
                            { '@type': 'Country', name: 'Qatar' },
                            { '@type': 'Country', name: 'Bahrain' },
                            { '@type': 'Country', name: 'Oman' },
                        ],
                        offers: {
                            '@type': 'AggregateOffer',
                            priceCurrency: 'USD',
                            lowPrice: '1299',
                            highPrice: '3999',
                            offerCount: '3',
                        },
                    }),
                }}
            />
            {faqSchema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                />
            )}
            {children}
        </>
    )
}
