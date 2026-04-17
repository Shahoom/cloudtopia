import type { Metadata } from 'next'
import { buildFAQSchema } from '@/lib/seo/service-faqs'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const titles: Record<string, string> = {
        en: 'E-Commerce Stores for the Gulf — Mada, Apple Pay, STC Pay, Tabby, Tamara',
        ar: 'متاجر إلكترونية للخليج — مدى، آبل باي، STC Pay، تابي، تمارا',
        tr: 'Körfez için E-Ticaret Mağazaları — Mada, Apple Pay, STC Pay, Tabby, Tamara',
    }
    const descs: Record<string, string> = {
        en: 'Full online stores with Gulf payment gateways (Mada, Apple Pay, STC Pay, Tabby, Tamara), ZATCA e-invoicing, and bilingual checkout. From $1,299.',
        ar: 'متاجر إلكترونية كاملة مع بوابات الدفع الخليجية (مدى، آبل باي، STC Pay، تابي، تمارا)، فوترة إلكترونية ZATCA، ودفع ثنائي اللغة. تبدأ من 1,299$.',
        tr: 'Körfez ödeme ağ geçitleri (Mada, Apple Pay, STC Pay, Tabby, Tamara), ZATCA e-faturalandırma ve iki dilli ödeme ile tam online mağazalar. $1.299\'dan başlar.',
    }
    const ogTitles: Record<string, string> = {
        en: 'E-Commerce — CloudTopia',
        ar: 'التجارة الإلكترونية — كلاود توبيا',
        tr: 'E-Ticaret — CloudTopia',
    }
    const ogDescs: Record<string, string> = {
        en: 'Enterprise-grade e-commerce solutions for Gulf businesses.',
        ar: 'حلول تجارة إلكترونية على مستوى المؤسسات لأعمال الخليج.',
        tr: 'Körfez işletmeleri için kurumsal düzey e-ticaret çözümleri.',
    }
    const ogLocales: Record<string, string> = { en: 'en_US', ar: 'ar_SA', tr: 'tr_TR' }
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
            url: `https://cloudtopia.net/${locale}/ecommerce-solutions`,
            locale: ogLocales[locale] || 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: ogTitle }],
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: `https://cloudtopia.net/${locale}/ecommerce-solutions`,
            languages: { 'en': 'https://cloudtopia.net/en/ecommerce-solutions', 'ar': 'https://cloudtopia.net/ar/ecommerce-solutions', 'tr': 'https://cloudtopia.net/tr/ecommerce-solutions', 'x-default': 'https://cloudtopia.net/en/ecommerce-solutions' },
        },
    }
}

export default function EcommerceSolutionsLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
    const locale = params?.locale ?? 'en'
    const faqSchema = buildFAQSchema('ecommerce-solutions', locale)

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home', item: `https://cloudtopia.net/${locale}` },
                            { '@type': 'ListItem', position: 2, name: 'Services', item: `https://cloudtopia.net/${locale}/services` },
                            { '@type': 'ListItem', position: 3, name: 'E-Commerce Solutions', item: `https://cloudtopia.net/${locale}/ecommerce-solutions` },
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
                        url: `https://cloudtopia.net/${locale}/ecommerce-solutions`,
                        provider: { '@type': 'Organization', name: 'CloudTopia', url: 'https://cloudtopia.net' },
                        serviceType: 'E-Commerce Development',
                        areaServed: [
                            { '@type': 'Country', name: 'Saudi Arabia' },
                            { '@type': 'Country', name: 'United Arab Emirates' },
                            { '@type': 'Country', name: 'Kuwait' },
                            { '@type': 'Country', name: 'Qatar' },
                            { '@type': 'Country', name: 'Bahrain' },
                            { '@type': 'Country', name: 'Oman' },
                            { '@type': 'Country', name: 'Türkiye' },
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
