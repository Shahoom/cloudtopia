import { cookies } from 'next/headers'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
    const locale = cookies().get('NEXT_LOCALE')?.value ?? 'en'
    const isAr = locale === 'ar'
    return {
        title: isAr
            ? 'تصميم المواقع — مواقع مذهلة وعصرية ومتجاوبة'
            : 'Website Design — Stunning, Modern & Responsive Websites',
        description: isAr
            ? 'خدمات تصميم المواقع الاحترافية من كلاود توبيا. نصمم مواقع إلكترونية مذهلة ومتجاوبة ومُحسَّنة لمحركات البحث تحوّل الزوار إلى عملاء.'
            : 'Professional website design services by CloudTopia. We create stunning, responsive, and SEO-optimized websites that convert visitors into customers.',
        openGraph: {
            title: isAr ? 'خدمات تصميم المواقع — كلاود توبيا' : 'Website Design Services — CloudTopia',
            description: isAr
                ? 'تصميم مواقع احترافي — مواقع مذهلة ومتجاوبة ومُحسَّنة لمحركات البحث تحوّل الزوار إلى عملاء.'
                : 'Professional website design — stunning, responsive, and SEO-optimized websites that convert visitors into customers.',
            url: isAr ? 'https://cloudtopia.net/ar/website-design' : 'https://cloudtopia.net/en/website-design',
            locale: isAr ? 'ar_SA' : 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: isAr ? 'تصميم المواقع — كلاود توبيا' : 'CloudTopia Website Design' }],
        },
        alternates: {
            canonical: isAr ? 'https://cloudtopia.net/ar/website-design' : 'https://cloudtopia.net/en/website-design',
            languages: { 'en': 'https://cloudtopia.net/en/website-design', 'ar': 'https://cloudtopia.net/ar/website-design', 'x-default': 'https://cloudtopia.net/en/website-design' },
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
                            { '@type': 'ListItem', position: 3, name: 'Website Design', item: 'https://cloudtopia.net/website-design' },
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
                        name: 'Website Design & Development',
                        description: 'Professional website design services. We create stunning, responsive, and SEO-optimized websites that convert visitors into customers.',
                        url: 'https://cloudtopia.net/website-design',
                        provider: {
                            '@type': 'Organization',
                            name: 'CloudTopia',
                            url: 'https://cloudtopia.net',
                        },
                        serviceType: 'Website Design',
                        areaServed: 'Worldwide',
                        hasOfferCatalog: {
                            '@type': 'OfferCatalog',
                            name: 'Website Design Services',
                            itemListElement: [
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Custom Website Design' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mobile-First Development' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'SEO Optimization' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Performance Optimization' } },
                            ],
                        },
                    }),
                }}
            />
            {children}
        </>
    )
}
