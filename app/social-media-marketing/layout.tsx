import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Social Media Marketing — Growth-Driven Campaigns',
    description: 'Social media marketing services by CloudTopia. Strategic campaigns across all platforms to grow your brand, engage your audience, and drive measurable results.',
    openGraph: {
        title: 'Social Media Marketing — CloudTopia',
        description: 'Strategic social media campaigns to grow your brand, engage your audience, and drive measurable results.',
        url: 'https://cloudtopia.net/social-media-marketing',
        images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'CloudTopia Social Media Marketing' }],
    },
    alternates: {
        canonical: 'https://cloudtopia.net/social-media-marketing',
        languages: { 'en': 'https://cloudtopia.net/social-media-marketing', 'ar': 'https://cloudtopia.net/ar/social-media-marketing' },
    },
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
