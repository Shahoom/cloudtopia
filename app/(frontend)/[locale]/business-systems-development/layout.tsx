import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { ogImagesFor } from '@/lib/og/og-image'
import { canonicalUrl, buildHreflangMap } from '@/lib/i18n/url'
import { buildFAQSchema } from '@/lib/seo/service-faqs'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/business-systems-development', 'business-systems-development')
    // Titles trimmed for SERP fit; descriptions reflect new pricing.
    const titles: Record<string, string> = {
        en: 'Custom Business Systems & CRM Development',
        ar: 'تطوير أنظمة أعمال وCRM مخصصة',
        tr: 'Özel İş Sistemleri ve CRM Geliştirme',
    }
    const descs: Record<string, string> = {
        en: 'Custom CRM, inventory, POS, HR, and booking systems built for Gulf workflows. Bilingual Arabic + English. From $1,999.',
        ar: 'أنظمة CRM ومخزون وPOS وHR وحجوزات مخصصة لسير عمل الخليج. ثنائية اللغة عربي + إنجليزي. من 1,999$.',
        tr: 'Körfez iş akışları için özel CRM, envanter, POS, İK ve rezervasyon sistemleri. İki dilli Arapça + İngilizce. $1.999\'dan başlar.',
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
            url: canonicalUrl(locale, '/business-systems-development'),
            locale: ogLocales[locale] || 'en_US',
            images: ogImagesFor({ page: 'business-systems-development', locale }),
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: canonicalUrl(locale, '/business-systems-development'),
            languages: buildHreflangMap('/business-systems-development'),
        },
    }
}

export default async function ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params
    const faqSchema = await buildFAQSchema('business-systems-development', locale)

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
                            { '@type': 'ListItem', position: 3, name: 'Business Systems Development', item: canonicalUrl(locale, '/business-systems-development') },
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
                        url: canonicalUrl(locale, '/business-systems-development'),
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
