import { headers } from 'next/headers'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
    const locale = headers().get('x-locale') ?? 'en'
    const isAr = locale === 'ar'
    return {
        title: isAr
            ? 'خدماتنا — تصميم مواقع، تجارة إلكترونية، تسويق والمزيد'
            : 'Services — Web Design, E-Commerce, Marketing & More',
        description: isAr
            ? 'استكشف خدمات كلاود توبيا الشاملة: تصميم المواقع، حلول التجارة الإلكترونية، التسويق عبر وسائل التواصل الاجتماعي، إنتاج المحتوى، أنظمة الأعمال، تطبيقات الويب، وحلول قائمة QR.'
            : 'Explore CloudTopia\'s comprehensive digital services: website design, e-commerce solutions, social media marketing, content creation, business systems, web applications, and QR menu solutions.',
        openGraph: {
            title: isAr ? 'خدماتنا — كلاود توبيا' : 'Our Services — CloudTopia',
            description: isAr
                ? 'خدمات رقمية شاملة: تصميم المواقع، التجارة الإلكترونية، التسويق، إنتاج المحتوى، أنظمة الأعمال وتطبيقات الويب.'
                : 'Comprehensive digital services: website design, e-commerce, marketing, content creation, business systems, and web applications.',
            url: isAr ? 'https://cloudtopia.net/ar/services' : 'https://cloudtopia.net/en/services',
            locale: isAr ? 'ar_SA' : 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: isAr ? 'خدمات كلاود توبيا' : 'CloudTopia Services' }],
        },
        twitter: {
            title: isAr ? 'خدماتنا — كلاود توبيا' : 'Our Services — CloudTopia',
            description: isAr
                ? 'خدمات رقمية شاملة: تصميم المواقع، التجارة الإلكترونية، التسويق، إنتاج المحتوى، أنظمة الأعمال وتطبيقات الويب.'
                : 'Comprehensive digital services: website design, e-commerce, marketing, content creation, business systems, and web applications.',
        },
        alternates: {
            canonical: isAr ? 'https://cloudtopia.net/ar/services' : 'https://cloudtopia.net/en/services',
            languages: { 'en': 'https://cloudtopia.net/en/services', 'ar': 'https://cloudtopia.net/ar/services', 'x-default': 'https://cloudtopia.net/en/services' },
        },
    }
}

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cloudtopia.net' },
                            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://cloudtopia.net/services' },
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
                        name: 'CloudTopia Digital Services',
                        description: 'Comprehensive digital services: website design, e-commerce, marketing, content creation, business systems, and web applications.',
                        url: 'https://cloudtopia.net/services',
                        numberOfItems: 3,
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Digital Presence', url: 'https://cloudtopia.net/services#digital-presence' },
                            { '@type': 'ListItem', position: 2, name: 'Business Systems', url: 'https://cloudtopia.net/services#business-systems' },
                            { '@type': 'ListItem', position: 3, name: 'Web Applications', url: 'https://cloudtopia.net/services#web-applications' },
                        ],
                    }),
                }}
            />
            {children}
        </>
    )
}
