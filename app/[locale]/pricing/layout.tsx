import type { Metadata } from 'next'

const titles: Record<string, string> = {
    en: 'Pricing — Transparent Plans for Every Budget | CloudTopia',
    ar: 'الأسعار — خطط شفافة لكل ميزانية | كلاود توبيا',
    tr: 'Fiyatlandırma — Her Bütçeye Şeffaf Planlar | CloudTopia',
}
const descriptions: Record<string, string> = {
    en: 'Transparent, honest pricing for every CloudTopia service — website design, e-commerce, web apps, business systems and digital marketing. Built for Gulf, Turkish and Arab market budgets.',
    ar: 'أسعار شفافة وصادقة لجميع خدمات كلاود توبيا — تصميم المواقع والتجارة الإلكترونية وتطبيقات الويب والأنظمة والتسويق الرقمي. مصممة خصيصاً لأسواق الخليج وتركيا والعالم العربي.',
    tr: 'Her CloudTopia hizmeti için şeffaf, dürüst fiyatlandırma — web tasarımı, e-ticaret, web uygulamaları, iş sistemleri ve dijital pazarlama. Körfez, Türk ve Arap piyasası bütçeleri için tasarlandı.',
}
const ogLocales: Record<string, string> = { en: 'en_US', ar: 'ar_SA', tr: 'tr_TR' }

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
            url: `https://cloudtopia.net/${locale}/pricing`,
            locale: ogLocales[locale] || 'en_US',
            alternateLocale: Object.values(ogLocales).filter(l => l !== (ogLocales[locale] || 'en_US')),
            siteName: 'CloudTopia',
            type: 'website',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: title }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ['/images/og-image.jpg'],
        },
        alternates: {
            canonical: `https://cloudtopia.net/${locale}/pricing`,
            languages: {
                'en': 'https://cloudtopia.net/en/pricing',
                'ar': 'https://cloudtopia.net/ar/pricing',
                'tr': 'https://cloudtopia.net/tr/pricing',
                'x-default': 'https://cloudtopia.net/en/pricing',
            },
        },
    }
}

export default function PricingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cloudtopia.net/en' },
                            { '@type': 'ListItem', position: 2, name: 'Pricing', item: 'https://cloudtopia.net/en/pricing' },
                        ],
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'PriceSpecification',
                        name: 'CloudTopia Service Pricing',
                        description: 'Transparent pricing for website design, e-commerce, CRM, and QR menu services.',
                        url: 'https://cloudtopia.net/en/pricing',
                        provider: {
                            '@type': 'Organization',
                            name: 'CloudTopia',
                            url: 'https://cloudtopia.net',
                        },
                    }),
                }}
            />
            {children}
        </>
    )
}
