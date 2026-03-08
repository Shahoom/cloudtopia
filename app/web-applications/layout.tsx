import { cookies } from 'next/headers'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
    const locale = cookies().get('NEXT_LOCALE')?.value ?? 'en'
    const isAr = locale === 'ar'
    return {
        title: isAr
            ? 'تطبيقات الويب — حلول سحابية مخصصة'
            : 'Web Applications — Custom Cloud-Based Solutions',
        description: isAr
            ? 'تطوير تطبيقات ويب مخصصة من كلاود توبيا. تطبيقات سحابية قابلة للتوسع مع ميزات فورية وتكامل ذكاء اصطناعي وبنية حديثة.'
            : 'Custom web application development by CloudTopia. Scalable, cloud-based applications with real-time features, AI integration, and modern architecture.',
        openGraph: {
            title: isAr ? 'تطبيقات الويب — كلاود توبيا' : 'Web Applications — CloudTopia',
            description: isAr
                ? 'تطبيقات ويب مخصصة وقابلة للتوسع مع ميزات فورية وتكامل ذكاء اصطناعي وبنية سحابية حديثة.'
                : 'Custom, scalable web applications with real-time features, AI integration, and modern cloud architecture.',
            url: isAr ? 'https://cloudtopia.net/ar/web-applications' : 'https://cloudtopia.net/en/web-applications',
            locale: isAr ? 'ar_SA' : 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: isAr ? 'تطبيقات الويب — كلاود توبيا' : 'CloudTopia Web Applications' }],
        },
        alternates: {
            canonical: isAr ? 'https://cloudtopia.net/ar/web-applications' : 'https://cloudtopia.net/en/web-applications',
            languages: { 'en': 'https://cloudtopia.net/en/web-applications', 'ar': 'https://cloudtopia.net/ar/web-applications', 'x-default': 'https://cloudtopia.net/en/web-applications' },
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
