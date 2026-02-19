import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Web Applications — Custom Cloud-Based Solutions',
    description: 'Custom web application development by CloudTopia. Scalable, cloud-based applications with real-time features, AI integration, and modern architecture.',
    openGraph: {
        title: 'Web Applications — CloudTopia',
        description: 'Custom, scalable web applications with real-time features, AI integration, and modern cloud architecture.',
        url: 'https://cloudtopia.net/web-applications',
        images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'CloudTopia Web Applications' }],
    },
    alternates: {
        canonical: 'https://cloudtopia.net/web-applications',
        languages: { 'en': 'https://cloudtopia.net/web-applications', 'ar': 'https://cloudtopia.net/ar/web-applications' },
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
                            { '@type': 'ListItem', position: 3, name: 'Web Applications', item: 'https://cloudtopia.net/web-applications' },
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
                        name: 'Web Application Development',
                        description: 'Custom web application development. Scalable, cloud-based applications with real-time features, AI integration, and modern architecture.',
                        url: 'https://cloudtopia.net/web-applications',
                        provider: {
                            '@type': 'Organization',
                            name: 'CloudTopia',
                            url: 'https://cloudtopia.net',
                        },
                        serviceType: 'Web Application Development',
                        areaServed: 'Worldwide',
                        hasOfferCatalog: {
                            '@type': 'OfferCatalog',
                            name: 'Web Application Services',
                            itemListElement: [
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SaaS Platforms' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Customer Portals' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Booking Platforms' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile-Responsive Apps (PWA)' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Real-time Chat Systems' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'E-Commerce Platforms' } },
                            ],
                        },
                    }),
                }}
            />
            {children}
        </>
    )
}
