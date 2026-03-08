import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const isAr = locale === 'ar'
    return {
        title: isAr
            ? 'إنتاج المحتوى — محتوى رقمي جذاب واستراتيجي'
            : 'Content Creation — Engaging Digital Content & Strategy',
        description: isAr
            ? 'خدمات إنتاج المحتوى الاحترافية من كلاود توبيا. من كتابة المحتوى إلى المحتوى المرئي، نصنع روايات رقمية جذابة تحكي قصة علامتك التجارية.'
            : 'Expert content creation services by CloudTopia. From copywriting to visual content, we craft engaging digital narratives that tell your brand story.',
        openGraph: {
            title: isAr ? 'خدمات إنتاج المحتوى — كلاود توبيا' : 'Content Creation Services — CloudTopia',
            description: isAr
                ? 'إنتاج محتوى احترافي — كتابة محتوى جذاب ومحتوى مرئي وروايات رقمية لعلامتك التجارية.'
                : 'Expert content creation — engaging copywriting, visual content, and digital narratives for your brand.',
            url: isAr ? 'https://cloudtopia.net/ar/content-creation' : 'https://cloudtopia.net/en/content-creation',
            locale: isAr ? 'ar_SA' : 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: isAr ? 'إنتاج المحتوى — كلاود توبيا' : 'CloudTopia Content Creation' }],
        },
        alternates: {
            canonical: isAr ? 'https://cloudtopia.net/ar/content-creation' : 'https://cloudtopia.net/en/content-creation',
            languages: { 'en': 'https://cloudtopia.net/en/content-creation', 'ar': 'https://cloudtopia.net/ar/content-creation', 'x-default': 'https://cloudtopia.net/en/content-creation' },
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
                            { '@type': 'ListItem', position: 3, name: 'Content Creation', item: 'https://cloudtopia.net/content-creation' },
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
                        name: 'Professional Content Creation',
                        description: 'Expert content creation services. From copywriting to visual content, we craft engaging digital narratives that tell your brand story.',
                        url: 'https://cloudtopia.net/content-creation',
                        provider: {
                            '@type': 'Organization',
                            name: 'CloudTopia',
                            url: 'https://cloudtopia.net',
                        },
                        serviceType: 'Content Creation',
                        areaServed: 'Worldwide',
                        hasOfferCatalog: {
                            '@type': 'OfferCatalog',
                            name: 'Content Creation Services',
                            itemListElement: [
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Photography' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Video Production' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Copywriting' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Brand Assets' } },
                            ],
                        },
                    }),
                }}
            />
            {children}
        </>
    )
}
