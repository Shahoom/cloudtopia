import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const isAr = locale === 'ar'
    return {
        title: isAr
            ? 'قائمة QR للمطاعم — قوائم رقمية للمطاعم العصرية'
            : 'Restaurant QR Menu — Digital Menus for Modern Dining',
        description: isAr
            ? 'حلول قائمة QR من كلاود توبيا. أنشئ قوائم رقمية تفاعلية جميلة لمطعمك. طلب بدون تلامس وتحديثات فورية وتصميم راقٍ.'
            : 'QR menu solutions by CloudTopia. Create beautiful, interactive digital menus for your restaurant. Contactless ordering, real-time updates, and premium design.',
        openGraph: {
            title: isAr ? 'حلول قائمة QR للمطاعم — كلاود توبيا' : 'Restaurant QR Menu Solutions — CloudTopia',
            description: isAr
                ? 'قوائم رقمية تفاعلية جميلة للمطاعم. طلب بدون تلامس وتحديثات فورية وتصميم راقٍ.'
                : 'Beautiful, interactive digital menus for restaurants. Contactless ordering, real-time updates, and premium design.',
            url: isAr ? 'https://cloudtopia.net/ar/restaurant-qr-menu' : 'https://cloudtopia.net/en/restaurant-qr-menu',
            locale: isAr ? 'ar_SA' : 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: isAr ? 'قائمة QR للمطاعم — كلاود توبيا' : 'CloudTopia QR Menu' }],
        },
        alternates: {
            canonical: isAr ? 'https://cloudtopia.net/ar/restaurant-qr-menu' : 'https://cloudtopia.net/en/restaurant-qr-menu',
            languages: { 'en': 'https://cloudtopia.net/en/restaurant-qr-menu', 'ar': 'https://cloudtopia.net/ar/restaurant-qr-menu', 'x-default': 'https://cloudtopia.net/en/restaurant-qr-menu' },
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
