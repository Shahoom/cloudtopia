import type { Metadata } from 'next'
import { ogImagesFor } from '@/lib/og/og-image'
import { buildFAQSchema } from '@/lib/seo/service-faqs'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const titles: Record<string, string> = {
        en: 'Bilingual Content Creation (Arabic + English) for Gulf Brands',
        ar: 'إنشاء محتوى ثنائي اللغة (عربي + إنجليزي) لعلامات الخليج',
        tr: 'Körfez Markaları için İki Dilli (Arapça + İngilizce) İçerik Üretimi',
    }
    const descs: Record<string, string> = {
        en: 'Arabic + English content: blogs, social, video scripts, newsletters, SEO articles. Original writing, not machine translation. From $499/month.',
        ar: 'محتوى عربي + إنجليزي: مدوّنات، تواصل اجتماعي، سكربتات فيديو، نشرات، مقالات سيو. كتابة أصلية، لا ترجمة آلية. من 499$/شهرياً.',
        tr: 'Arapça + İngilizce içerik: bloglar, sosyal, video senaryoları, bültenler, SEO makaleleri. Orijinal yazım, makine çevirisi değil. $499/ay\'dan.',
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
            url: `https://cloudtopia.net/${locale}/content-creation`,
            locale: ogLocales[locale] || 'en_US',
            images: ogImagesFor({ page: 'content-creation', locale }),
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: `https://cloudtopia.net/${locale}/content-creation`,
            languages: { 'en': 'https://cloudtopia.net/en/content-creation', 'ar': 'https://cloudtopia.net/ar/content-creation', 'tr': 'https://cloudtopia.net/tr/content-creation', 'x-default': 'https://cloudtopia.net/en/content-creation' },
        },
    }
}

export default function ContentCreationLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
    const locale = params?.locale ?? 'en'
    const faqSchema = buildFAQSchema('content-creation', locale)

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
                            { '@type': 'ListItem', position: 3, name: 'Content Creation', item: `https://cloudtopia.net/${locale}/content-creation` },
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
                        url: `https://cloudtopia.net/${locale}/content-creation`,
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
