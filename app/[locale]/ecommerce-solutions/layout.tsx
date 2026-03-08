import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const isAr = locale === 'ar'
    return {
        title: isAr
            ? 'حلول التجارة الإلكترونية — متاجر إلكترونية عالية التحويل'
            : 'E-Commerce Solutions — Online Stores That Convert',
        description: isAr
            ? 'حلول التجارة الإلكترونية من كلاود توبيا. نبني متاجر إلكترونية قوية مع دفع سلس وإدارة مخزون وصفحات منتجات مُحسَّنة للنمو.'
            : 'E-commerce solutions by CloudTopia. We build powerful online stores with seamless checkout, inventory management, and growth-optimized product pages.',
        openGraph: {
            title: isAr ? 'حلول التجارة الإلكترونية — كلاود توبيا' : 'E-Commerce Solutions — CloudTopia',
            description: isAr
                ? 'متاجر إلكترونية قوية مع دفع سلس وإدارة مخزون وصفحات منتجات مُحسَّنة للنمو.'
                : 'Powerful online stores with seamless checkout, inventory management, and growth-optimized product pages.',
            url: isAr ? 'https://cloudtopia.net/ar/ecommerce-solutions' : 'https://cloudtopia.net/en/ecommerce-solutions',
            locale: isAr ? 'ar_SA' : 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: isAr ? 'حلول التجارة الإلكترونية — كلاود توبيا' : 'CloudTopia E-Commerce Solutions' }],
        },
        alternates: {
            canonical: isAr ? 'https://cloudtopia.net/ar/ecommerce-solutions' : 'https://cloudtopia.net/en/ecommerce-solutions',
            languages: { 'en': 'https://cloudtopia.net/en/ecommerce-solutions', 'ar': 'https://cloudtopia.net/ar/ecommerce-solutions', 'x-default': 'https://cloudtopia.net/en/ecommerce-solutions' },
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
