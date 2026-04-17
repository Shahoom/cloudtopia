import type { Metadata } from 'next'
import { buildFAQSchema } from '@/lib/seo/service-faqs'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const titles: Record<string, string> = {
        en: 'Custom Business Systems & CRM Development — Gulf + Global',
        ar: 'تطوير أنظمة الأعمال وCRM المخصصة — الخليج والعالم',
        tr: 'Özel İş Sistemleri ve CRM Geliştirme — Körfez + Global',
    }
    const descs: Record<string, string> = {
        en: 'Custom CRM, inventory, POS, HR, and booking systems built around Gulf business workflows. Bilingual Arabic + English. From $3,999.',
        ar: 'أنظمة CRM، مخزون، POS، HR، وحجوزات مخصصة مبنية حول سير عمل أعمال الخليج. ثنائية اللغة عربي + إنجليزي. تبدأ من 3,999$.',
        tr: 'Körfez iş akışları etrafında inşa edilmiş özel CRM, envanter, POS, İK ve rezervasyon sistemleri. İki dilli Arapça + İngilizce. $3.999\'dan başlar.',
    }
    const ogTitles: Record<string, string> = {
        en: 'Business Systems — CloudTopia',
        ar: 'أنظمة الأعمال — كلاود توبيا',
        tr: 'İş Sistemleri — CloudTopia',
    }
    const ogDescs: Record<string, string> = {
        en: 'Custom CRM, POS, inventory, and HR systems for your business.',
        ar: 'أنظمة CRM وPOS وإدارة المخزون وHR مخصصة لعملك.',
        tr: 'İşletmeniz için özel CRM, POS, envanter ve İK sistemleri.',
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
            url: `https://cloudtopia.net/${locale}/business-systems-development`,
            locale: ogLocales[locale] || 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: ogTitle }],
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: `https://cloudtopia.net/${locale}/business-systems-development`,
            languages: { 'en': 'https://cloudtopia.net/en/business-systems-development', 'ar': 'https://cloudtopia.net/ar/business-systems-development', 'tr': 'https://cloudtopia.net/tr/business-systems-development', 'x-default': 'https://cloudtopia.net/en/business-systems-development' },
        },
    }
}

export default function BusinessSystemsDevelopmentLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
    const locale = params?.locale ?? 'en'
    const faqSchema = buildFAQSchema('business-systems-development', locale)

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
                            { '@type': 'ListItem', position: 3, name: 'Business Systems Development', item: `https://cloudtopia.net/${locale}/business-systems-development` },
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
                        name: 'Custom Business Systems Development',
                        description: 'Custom CRM, inventory, POS, HR, and booking systems built around Gulf business workflows.',
                        url: `https://cloudtopia.net/${locale}/business-systems-development`,
                        provider: { '@type': 'Organization', name: 'CloudTopia', url: 'https://cloudtopia.net' },
                        serviceType: 'Business Software Development',
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
                            lowPrice: '3999',
                            highPrice: '25000',
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
