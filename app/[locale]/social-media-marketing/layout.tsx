import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const isAr = locale === 'ar'
    return {
        title: isAr
            ? 'التسويق عبر وسائل التواصل الاجتماعي — حملات تسويقية فعّالة'
            : 'Social Media Marketing — Growth-Driven Campaigns',
        description: isAr
            ? 'خدمات التسويق عبر وسائل التواصل الاجتماعي من كلاود توبيا. حملات استراتيجية على جميع المنصات لتنمية علامتك التجارية وإشراك جمهورك وتحقيق نتائج قابلة للقياس.'
            : 'Social media marketing services by CloudTopia. Strategic campaigns across all platforms to grow your brand, engage your audience, and drive measurable results.',
        openGraph: {
            title: isAr ? 'التسويق عبر وسائل التواصل الاجتماعي — كلاود توبيا' : 'Social Media Marketing — CloudTopia',
            description: isAr
                ? 'حملات تسويقية استراتيجية على وسائل التواصل الاجتماعي لتنمية علامتك التجارية وإشراك جمهورك وتحقيق نتائج قابلة للقياس.'
                : 'Strategic social media campaigns to grow your brand, engage your audience, and drive measurable results.',
            url: isAr ? 'https://cloudtopia.net/ar/social-media-marketing' : 'https://cloudtopia.net/en/social-media-marketing',
            locale: isAr ? 'ar_SA' : 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: isAr ? 'التسويق عبر وسائل التواصل الاجتماعي — كلاود توبيا' : 'CloudTopia Social Media Marketing' }],
        },
        alternates: {
            canonical: isAr ? 'https://cloudtopia.net/ar/social-media-marketing' : 'https://cloudtopia.net/en/social-media-marketing',
            languages: { 'en': 'https://cloudtopia.net/en/social-media-marketing', 'ar': 'https://cloudtopia.net/ar/social-media-marketing', 'x-default': 'https://cloudtopia.net/en/social-media-marketing' },
        },
    }
}

export default function Layout({ children }: { children: React.ReactNode }) {
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
                            { '@type': 'ListItem', position: 3, name: 'Social Media Marketing', item: 'https://cloudtopia.net/social-media-marketing' },
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
                        name: 'Social Media Marketing',
                        description: 'Strategic social media marketing campaigns across all platforms to grow your brand, engage your audience, and drive measurable results.',
                        url: 'https://cloudtopia.net/social-media-marketing',
                        provider: {
                            '@type': 'Organization',
                            name: 'CloudTopia',
                            url: 'https://cloudtopia.net',
                        },
                        serviceType: 'Social Media Marketing',
                        areaServed: 'Worldwide',
                        hasOfferCatalog: {
                            '@type': 'OfferCatalog',
                            name: 'Social Media Services',
                            itemListElement: [
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Content Strategy' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Community Management' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Paid Advertising' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Analytics & Reporting' } },
                            ],
                        },
                    }),
                }}
            />
            {children}
        </>
    )
}
