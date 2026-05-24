import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { ogImagesFor } from '@/lib/og/og-image'
import { canonicalUrl, buildHreflangMap } from '@/lib/i18n/url'
import { buildFAQSchema } from '@/lib/seo/service-faqs'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/social-media-marketing', 'social-media-marketing')
    const titles: Record<string, string> = {
        en: 'Arabic-First Social Media Marketing for the Gulf',
        ar: 'تسويق وسائل التواصل الاجتماعي بالعربية أولاً للخليج',
        tr: 'Körfez için Arapça Öncelikli Sosyal Medya Pazarlama',
    }
    const descs: Record<string, string> = {
        en: 'Arabic-first content and paid social for Saudi, UAE, Kuwait, and Gulf audiences. TikTok, Snapchat, Instagram, Meta. Management from $799/month.',
        ar: 'محتوى عربي أولاً وإعلانات اجتماعية مدفوعة لجمهور السعودية والإمارات والكويت والخليج. تيك توك، سناب شات، إنستاجرام، ميتا. الإدارة من 799$/شهرياً.',
        tr: 'Suudi, BAE, Kuveyt ve Körfez kitleleri için Arapça öncelikli içerik ve ücretli sosyal. TikTok, Snapchat, Instagram, Meta. Yönetim $799/ay\'dan.',
    }
    const ogTitles: Record<string, string> = {
        en: 'Social Media Marketing — CloudTopia',
        ar: 'تسويق وسائل التواصل — كلاود توبيا',
        tr: 'Sosyal Medya Pazarlama — CloudTopia',
    }
    const ogDescs: Record<string, string> = {
        en: 'Professional social media management and advertising for Gulf audiences.',
        ar: 'إدارة احترافية لوسائل التواصل الاجتماعي والإعلانات لجمهور الخليج.',
        tr: 'Körfez kitleleri için profesyonel sosyal medya yönetimi ve reklam.',
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
            url: canonicalUrl(locale, '/social-media-marketing'),
            locale: ogLocales[locale] || 'en_US',
            images: ogImagesFor({ page: 'social-media-marketing', locale }),
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: canonicalUrl(locale, '/social-media-marketing'),
            languages: buildHreflangMap('/social-media-marketing'),
        },
    }
}

export default async function ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params
    const faqSchema = await buildFAQSchema('social-media-marketing', locale)

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
                            { '@type': 'ListItem', position: 3, name: 'Social Media Marketing', item: canonicalUrl(locale, '/social-media-marketing') },
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
                        name: 'Social Media Marketing & Management',
                        description: 'Arabic-first content and paid social for Gulf audiences. TikTok, Snapchat, Instagram, Meta, YouTube.',
                        url: canonicalUrl(locale, '/social-media-marketing'),
                        provider: { '@type': 'Organization', name: 'CloudTopia', url: 'https://cloudtopia.net' },
                        serviceType: 'Social Media Marketing',
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
                            lowPrice: '799',
                            highPrice: '4999',
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
