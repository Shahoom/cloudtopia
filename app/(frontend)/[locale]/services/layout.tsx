import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { ogImagesFor } from '@/lib/og/og-image'
import { canonicalUrl, buildHreflangMap } from '@/lib/i18n/url'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/services', 'services')
    // Titles trimmed to fit Google's ~60-char SERP display.
    const titles: Record<string, string> = {
        en: 'Services — Web, E-Commerce & Marketing',
        ar: 'خدماتنا — مواقع، تجارة إلكترونية وتسويق',
    }
    const descs: Record<string, string> = {
        en: 'Professional website design, e-commerce stores, CRM systems, social media marketing, booking platforms, and custom web applications. Free consultation available.',
        ar: 'تصميم مواقع احترافي، متاجر إلكترونية، أنظمة CRM، إدارة وسائل التواصل الاجتماعي، منصات حجز، وتطبيقات ويب مخصصة. استشارة مجانية متاحة.',
    }
    const ogTitles: Record<string, string> = {
        en: 'Our Services — CloudTopia',
        ar: 'خدماتنا — كلاود توبيا',
    }
    const ogDescs: Record<string, string> = {
        en: 'Website design, e-commerce stores, CRM systems, social media marketing, booking platforms, and custom web applications.',
        ar: 'تصميم مواقع، متاجر إلكترونية، أنظمة CRM، إدارة وسائل التواصل، منصات حجز، وتطبيقات ويب مخصصة.',
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
            url: canonicalUrl(locale, '/services'),
            locale: ogLocales[locale] || 'en_US',
            images: ogImagesFor({ page: 'services', locale }),
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: canonicalUrl(locale, '/services'),
            languages: buildHreflangMap('/services'),
        },
    }
}

export default async function ServicesLayout({ children, params }: { children: React.ReactNode, params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params
    const l = locale ?? 'en'

    const breadcrumbNames: Record<string, { home: string, services: string }> = {
        en: { home: 'Home', services: 'Services' },
        ar: { home: 'الرئيسية', services: 'خدماتنا' },
    }

    const itemListContent: Record<string, { name: string, desc: string, items: string[] }> = {
        en: {
            name: 'CloudTopia Digital Services',
            desc: 'Comprehensive digital services: website design, e-commerce, marketing, content creation, business systems, and web applications.',
            items: ['Digital Presence', 'Business Systems', 'Web Applications']
        },
        ar: {
            name: 'خدمات كلاود توبيا الرقمية',
            desc: 'خدمات رقمية شاملة: تصميم مواقع، تجارة إلكترونية، تسويq، إنشاء محتوى، أنظمة أعمال، وتطبيقات ويب.',
            items: ['الحضور الرقمي', 'أنظمة الأعمال', 'تطبيقات الويب']
        },
    }

    const b = breadcrumbNames[l] || breadcrumbNames.en
    const i = itemListContent[l] || itemListContent.en

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: b.home, item: canonicalUrl(l, '/') },
                            { '@type': 'ListItem', position: 2, name: b.services, item: canonicalUrl(l, '/services') },
                        ],
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'ItemList',
                        name: i.name,
                        description: i.desc,
                        url: canonicalUrl(l, '/services'),
                        numberOfItems: 3,
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: i.items[0], url: `${canonicalUrl(l, '/services')}#digital-presence` },
                            { '@type': 'ListItem', position: 2, name: i.items[1], url: `${canonicalUrl(l, '/services')}#business-systems` },
                            { '@type': 'ListItem', position: 3, name: i.items[2], url: `${canonicalUrl(l, '/services')}#web-applications` },
                        ],
                    }),
                }}
            />
            {children}
        </>
    )
}
