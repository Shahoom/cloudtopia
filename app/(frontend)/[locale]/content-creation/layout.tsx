import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { ogImagesFor } from '@/lib/og/og-image'
import { canonicalUrl, buildHreflangMap } from '@/lib/i18n/url'
import { buildFAQSchema } from '@/lib/seo/service-faqs'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/content-creation', 'content-creation')
    // Titles trimmed for SERP fit; descriptions reflect new pricing ($149/mo).
    const titles: Record<string, string> = {
        en: 'Bilingual Content Creation — Arabic + English',
        ar: 'إنشاء محتوى ثنائي اللغة — عربي وإنجليزي',
        tr: 'İki Dilli İçerik Üretimi — Arapça + İngilizce',
    }
    const descs: Record<string, string> = {
        en: 'Original Arabic + English content: blogs, social, video scripts, newsletters, SEO articles. Native-written, not machine translated. From $149/month.',
        ar: 'محتوى عربي + إنجليزي أصيل: مدوّنات، اجتماعي، سكربتات فيديو، نشرات، مقالات SEO. مكتوب بأقلام أصيلة. من 149$/شهرياً.',
        tr: 'Orijinal Arapça + İngilizce içerik: bloglar, sosyal, video senaryoları, bültenler, SEO. Yerli yazım. $149/ay\'dan.',
    }
    const ogTitles: Record<string, string> = {
        en: 'Content Creation — CloudTopia',
        ar: 'إنشاء المحتوى — كلاود توبيا',
        tr: 'İçerik Üretimi — CloudTopia',
    }
    const ogDescs: Record<string, string> = {
        en: 'Bilingual content creation, copywriting, and SEO writing for Gulf brands.',
        ar: 'إنشاء محتوى ثنائي اللغة، كتابة إبداعية، وكتابة سيو لعلامات الخليج.',
        tr: 'Körfez markaları için iki dilli içerik üretimi, metin yazarlığı ve SEO yazımı.',
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
            url: canonicalUrl(locale, '/content-creation'),
            locale: ogLocales[locale] || 'en_US',
            images: ogImagesFor({ page: 'content-creation', locale }),
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: canonicalUrl(locale, '/content-creation'),
            languages: buildHreflangMap('/content-creation'),
        },
    }
}

export default async function ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params
    const faqSchema = await buildFAQSchema('content-creation', locale)

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
                            { '@type': 'ListItem', position: 3, name: 'Content Creation', item: canonicalUrl(locale, '/content-creation') },
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
                        name: 'Content Creation & Copywriting',
                        description: 'Bilingual Arabic + English content, blog writing, video scripts, and SEO content for Gulf brands.',
                        url: canonicalUrl(locale, '/content-creation'),
                        provider: { '@type': 'Organization', name: 'CloudTopia', url: 'https://cloudtopia.net' },
                        serviceType: 'Content Marketing',
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
                            lowPrice: '499',
                            highPrice: '2499',
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
