import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const titles: Record<string, string> = {
        en: 'Professional Content Creation & Copywriting',
        ar: 'إنشاء المحتوى الاحترافي والكتابة الإبداعية',
        tr: 'Profesyonel İçerik Üretimi & Metin Yazarlığı',
    }
    const descs: Record<string, string> = {
        en: 'SEO-optimized content creation for websites, social media, and marketing.',
        ar: 'إنشاء محتوى محسّن لمحركات البحث للمواقع ووسائل التواصل والتسويق.',
        tr: 'Web siteleri, sosyal medya ve pazarlama için SEO optimize edilmiş içerik üretimi.',
    }
    const ogTitles: Record<string, string> = {
        en: 'Content Creation — CloudTopia',
        ar: 'إنشاء المحتوى — كلاود توبيا',
        tr: 'İçerik Üretimi — CloudTopia',
    }
    const ogDescs: Record<string, string> = {
        en: 'Professional content creation and copywriting services.',
        ar: 'خدمات إنشاء محتوى وكتابة إبداعية احترافية.',
        tr: 'Profesyonel içerik üretimi ve metin yazarlığı hizmetleri.',
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
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: ogTitle }],
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: `https://cloudtopia.net/${locale}/content-creation`,
            languages: { 'en': 'https://cloudtopia.net/en/content-creation', 'ar': 'https://cloudtopia.net/ar/content-creation', 'tr': 'https://cloudtopia.net/tr/content-creation', 'x-default': 'https://cloudtopia.net/en/content-creation' },
        },
    }
}

export default function contentcreationLayout({ children }: { children: React.ReactNode }) {
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
                            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://cloudtopia.net/en/services' },
                            { '@type': 'ListItem', position: 3, name: 'Content Creation', item: 'https://cloudtopia.net/en/content-creation' },
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
                        description: 'SEO-optimized content creation for websites, social media, and marketing.',
                        url: 'https://cloudtopia.net/en/content-creation',
                        provider: {
                            '@type': 'Organization',
                            name: 'CloudTopia',
                            url: 'https://cloudtopia.net',
                        },
                        serviceType: 'Content Marketing',
                        areaServed: 'Worldwide',
                    }),
                }}
            />
            {children}
        </>
    )
}
