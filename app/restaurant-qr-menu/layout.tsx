import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Restaurant QR Menu — Digital Menus for Modern Dining',
    description: 'QR menu solutions by CloudTopia. Create beautiful, interactive digital menus for your restaurant. Contactless ordering, real-time updates, and premium design.',
    openGraph: {
        title: 'Restaurant QR Menu Solutions — CloudTopia',
        description: 'Beautiful, interactive digital menus for restaurants. Contactless ordering, real-time updates, and premium design.',
        url: 'https://cloudtopia.net/restaurant-qr-menu',
        images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'CloudTopia QR Menu' }],
    },
    alternates: {
        canonical: 'https://cloudtopia.net/en/restaurant-qr-menu',
        languages: { 'en': 'https://cloudtopia.net/en/restaurant-qr-menu', 'ar': 'https://cloudtopia.net/ar/restaurant-qr-menu', 'x-default': 'https://cloudtopia.net/en/restaurant-qr-menu' },
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
                            { '@type': 'ListItem', position: 3, name: 'Restaurant QR Menu', item: 'https://cloudtopia.net/restaurant-qr-menu' },
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
                        name: 'Restaurant QR Menu Solutions',
                        description: 'Interactive digital menus with QR codes for modern restaurants and cafes. Contactless ordering, real-time updates, and premium design.',
                        url: 'https://cloudtopia.net/restaurant-qr-menu',
                        provider: {
                            '@type': 'Organization',
                            name: 'CloudTopia',
                            url: 'https://cloudtopia.net',
                        },
                        serviceType: 'Digital Menu Solutions',
                        areaServed: 'Worldwide',
                        hasOfferCatalog: {
                            '@type': 'OfferCatalog',
                            name: 'QR Menu Services',
                            itemListElement: [
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Digital Menu Design' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'QR Code Generation' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Multi-Language Menu Support' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Real-Time Menu Updates' } },
                            ],
                        },
                    }),
                }}
            />
            {children}
        </>
    )
}
