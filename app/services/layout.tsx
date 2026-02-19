import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Services — Web Design, E-Commerce, Marketing & More',
    description: 'Explore CloudTopia\'s comprehensive digital services: website design, e-commerce solutions, social media marketing, content creation, business systems, web applications, and QR menu solutions.',
    openGraph: {
        title: 'Our Services — CloudTopia',
        description: 'Comprehensive digital services: website design, e-commerce, marketing, content creation, business systems, and web applications.',
        url: 'https://cloudtopia.net/services',
        images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'CloudTopia Services' }],
    },
    twitter: {
        title: 'Our Services — CloudTopia',
        description: 'Comprehensive digital services: website design, e-commerce, marketing, content creation, business systems, and web applications.',
    },
    alternates: {
        canonical: 'https://cloudtopia.net/services',
        languages: { 'en': 'https://cloudtopia.net/services', 'ar': 'https://cloudtopia.net/ar/services' },
    },
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
