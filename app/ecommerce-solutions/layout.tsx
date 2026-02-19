import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'E-Commerce Solutions — Online Stores That Convert',
    description: 'E-commerce solutions by CloudTopia. We build powerful online stores with seamless checkout, inventory management, and growth-optimized product pages.',
    openGraph: {
        title: 'E-Commerce Solutions — CloudTopia',
        description: 'Powerful online stores with seamless checkout, inventory management, and growth-optimized product pages.',
        url: 'https://cloudtopia.net/ecommerce-solutions',
        images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'CloudTopia E-Commerce Solutions' }],
    },
    alternates: {
        canonical: 'https://cloudtopia.net/ecommerce-solutions',
        languages: { 'en': 'https://cloudtopia.net/ecommerce-solutions', 'ar': 'https://cloudtopia.net/ar/ecommerce-solutions' },
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
                            { '@type': 'ListItem', position: 3, name: 'E-Commerce Solutions', item: 'https://cloudtopia.net/ecommerce-solutions' },
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
                        name: 'E-Commerce Solutions',
                        description: 'Complete e-commerce solutions to launch and grow your online store with seamless checkout, inventory management, and growth-optimized product pages.',
                        url: 'https://cloudtopia.net/ecommerce-solutions',
                        provider: {
                            '@type': 'Organization',
                            name: 'CloudTopia',
                            url: 'https://cloudtopia.net',
                        },
                        serviceType: 'E-Commerce Development',
                        areaServed: 'Worldwide',
                        hasOfferCatalog: {
                            '@type': 'OfferCatalog',
                            name: 'E-Commerce Services',
                            itemListElement: [
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Product Catalog Setup' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Secure Checkout Integration' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Order Management System' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Shipping Integration' } },
                            ],
                        },
                    }),
                }}
            />
            {children}
        </>
    )
}
