import type { Metadata } from 'next'
import { ogImagesFor } from '@/lib/og/og-image'

const titles: Record<string, string> = {
    en: 'Pricing — Transparent Plans from $299 | CloudTopia',
    ar: 'الأسعار — خطط شفافة تبدأ من 299$ | كلاود توبيا',
    tr: 'Fiyatlandırma — $299\'dan Başlayan Şeffaf Planlar | CloudTopia',
}
const descriptions: Record<string, string> = {
    en: 'Transparent pricing for every CloudTopia service — landing pages from $299, websites from $499, e-commerce from $599, and custom systems from $1,999. No hidden fees.',
    ar: 'أسعار شفافة لجميع خدمات كلاود توبيا — صفحات هبوط من 299$، مواقع من 499$، متاجر من 599$، وأنظمة مخصصة من 1,999$. بدون رسوم خفية.',
    tr: 'Tüm CloudTopia hizmetleri için şeffaf fiyatlandırma — açılış sayfaları $299\'dan, web siteleri $499\'dan, e-ticaret $599\'dan ve özel sistemler $1,999\'dan. Gizli ücret yok.',
}

const crumbLabels: Record<string, { home: string; pricing: string }> = {
    en: { home: 'Home', pricing: 'Pricing' },
    ar: { home: 'الرئيسية', pricing: 'الأسعار' },
    tr: { home: 'Ana Sayfa', pricing: 'Fiyatlandırma' },
}

const ogLocales: Record<string, string> = { en: 'en_US', ar: 'ar_SA', tr: 'tr_TR' }
const bcp47: Record<string, string> = { en: 'en-US', ar: 'ar-SA', tr: 'tr-TR' }

const BASE_URL = 'https://cloudtopia.net'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const title = titles[locale] || titles.en
    const description = descriptions[locale] || descriptions.en

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `${BASE_URL}/${locale}/pricing`,
            locale: ogLocales[locale] || 'en_US',
            alternateLocale: Object.values(ogLocales).filter(l => l !== (ogLocales[locale] || 'en_US')),
            siteName: 'CloudTopia',
            type: 'website',
            images: ogImagesFor({ page: 'pricing', locale }),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ogImagesFor({ page: 'pricing', locale }).map(i => i.url),
        },
        alternates: {
            canonical: `${BASE_URL}/${locale}/pricing`,
            languages: {
                'en': `${BASE_URL}/en/pricing`,
                'ar': `${BASE_URL}/ar/pricing`,
                'tr': `${BASE_URL}/tr/pricing`,
                'x-default': `${BASE_URL}/en/pricing`,
            },
        },
    }
}

export default function PricingLayout({
    children,
    params,
}: {
    children: React.ReactNode
    params: { locale: string }
}) {
    const locale = params?.locale || 'en'
    const crumbs = crumbLabels[locale] || crumbLabels.en
    const lang = bcp47[locale] || 'en-US'

    // BreadcrumbList — localized per locale
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: crumbs.home, item: `${BASE_URL}/${locale}` },
            { '@type': 'ListItem', position: 2, name: crumbs.pricing, item: `${BASE_URL}/${locale}/pricing` },
        ],
    }

    // Service + OfferCatalog — represents our pricing catalog in schema.org's native
    // format so Google can surface rich pricing snippets and AI search engines can
    // parse each tier directly from markup.
    const offerCatalog = {
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Digital agency services',
        provider: {
            '@type': 'Organization',
            name: 'CloudTopia',
            url: BASE_URL,
        },
        areaServed: ['SA', 'AE', 'KW', 'QA', 'BH', 'OM', 'TR'],
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'CloudTopia Service Pricing',
            inLanguage: lang,
            itemListElement: [
                // Website Design
                {
                    '@type': 'Offer',
                    name: 'Landing Page',
                    price: '299',
                    priceCurrency: 'USD',
                    category: 'Website Design',
                    url: `${BASE_URL}/${locale}/website-design`,
                },
                {
                    '@type': 'Offer',
                    name: 'Starter Website',
                    price: '499',
                    priceCurrency: 'USD',
                    category: 'Website Design',
                    url: `${BASE_URL}/${locale}/website-design`,
                },
                {
                    '@type': 'Offer',
                    name: 'Professional Website',
                    price: '999',
                    priceCurrency: 'USD',
                    category: 'Website Design',
                    url: `${BASE_URL}/${locale}/website-design`,
                },
                {
                    '@type': 'Offer',
                    name: 'Premium Website',
                    price: '2499',
                    priceCurrency: 'USD',
                    category: 'Website Design',
                    url: `${BASE_URL}/${locale}/website-design`,
                },
                // Ecommerce
                {
                    '@type': 'Offer',
                    name: 'Starter Store',
                    price: '599',
                    priceCurrency: 'USD',
                    category: 'Ecommerce',
                    url: `${BASE_URL}/${locale}/ecommerce-solutions`,
                },
                {
                    '@type': 'Offer',
                    name: 'Growth Store',
                    price: '1299',
                    priceCurrency: 'USD',
                    category: 'Ecommerce',
                    url: `${BASE_URL}/${locale}/ecommerce-solutions`,
                },
                // Business Systems
                {
                    '@type': 'Offer',
                    name: 'Essential Business System',
                    price: '1999',
                    priceCurrency: 'USD',
                    category: 'Business Systems',
                    url: `${BASE_URL}/${locale}/business-systems-development`,
                },
                {
                    '@type': 'Offer',
                    name: 'Advanced Business System',
                    price: '3499',
                    priceCurrency: 'USD',
                    category: 'Business Systems',
                    url: `${BASE_URL}/${locale}/business-systems-development`,
                },
                // Web Apps
                {
                    '@type': 'Offer',
                    name: 'Foundation Web App',
                    price: '999',
                    priceCurrency: 'USD',
                    category: 'Web Applications',
                    url: `${BASE_URL}/${locale}/web-applications`,
                },
                {
                    '@type': 'Offer',
                    name: 'Professional Web App',
                    price: '2499',
                    priceCurrency: 'USD',
                    category: 'Web Applications',
                    url: `${BASE_URL}/${locale}/web-applications`,
                },
                // QR Menu
                {
                    '@type': 'Offer',
                    name: 'Essential QR Menu',
                    price: '249',
                    priceCurrency: 'USD',
                    category: 'QR Menu',
                    url: `${BASE_URL}/${locale}/restaurant-qr-menu`,
                },
                {
                    '@type': 'Offer',
                    name: 'Smart QR Menu',
                    price: '499',
                    priceCurrency: 'USD',
                    category: 'QR Menu',
                    url: `${BASE_URL}/${locale}/restaurant-qr-menu`,
                },
                {
                    '@type': 'Offer',
                    name: 'Full QR Menu System',
                    price: '649',
                    priceCurrency: 'USD',
                    category: 'QR Menu',
                    url: `${BASE_URL}/${locale}/restaurant-qr-menu`,
                },
                // Social Media (monthly)
                {
                    '@type': 'Offer',
                    name: 'Social Media Starter (monthly)',
                    price: '199',
                    priceCurrency: 'USD',
                    category: 'Social Media Marketing',
                    url: `${BASE_URL}/${locale}/social-media-marketing`,
                },
                {
                    '@type': 'Offer',
                    name: 'Social Media Growth (monthly)',
                    price: '449',
                    priceCurrency: 'USD',
                    category: 'Social Media Marketing',
                    url: `${BASE_URL}/${locale}/social-media-marketing`,
                },
                {
                    '@type': 'Offer',
                    name: 'Social Media Scale (monthly)',
                    price: '799',
                    priceCurrency: 'USD',
                    category: 'Social Media Marketing',
                    url: `${BASE_URL}/${locale}/social-media-marketing`,
                },
                // Content
                {
                    '@type': 'Offer',
                    name: 'Content Basic (monthly)',
                    price: '149',
                    priceCurrency: 'USD',
                    category: 'Content Creation',
                    url: `${BASE_URL}/${locale}/content-creation`,
                },
                {
                    '@type': 'Offer',
                    name: 'Content Professional (monthly)',
                    price: '329',
                    priceCurrency: 'USD',
                    category: 'Content Creation',
                    url: `${BASE_URL}/${locale}/content-creation`,
                },
                {
                    '@type': 'Offer',
                    name: 'Content Agency (monthly)',
                    price: '549',
                    priceCurrency: 'USD',
                    category: 'Content Creation',
                    url: `${BASE_URL}/${locale}/content-creation`,
                },
            ],
        },
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalog) }}
            />
            {children}
        </>
    )
}
