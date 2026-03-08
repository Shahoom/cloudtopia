import { headers } from 'next/headers'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
    const locale = headers().get('x-locale') ?? 'en'
    const isAr = locale === 'ar'
    return {
        title: isAr
            ? 'تطوير أنظمة الأعمال — حلول برمجية مخصصة'
            : 'Business Systems Development — Custom Software Solutions',
        description: isAr
            ? 'أنظمة أعمال مخصصة من كلاود توبيا. CRM وERP وإدارة المخزون وأتمتة سير العمل — مبنية للتوسع مع احتياجات عملك.'
            : 'Custom business systems by CloudTopia. CRM, ERP, inventory management, and workflow automation — built to scale with your business needs.',
        openGraph: {
            title: isAr ? 'تطوير أنظمة الأعمال — كلاود توبيا' : 'Business Systems Development — CloudTopia',
            description: isAr
                ? 'CRM وERP مخصص وإدارة المخزون وأتمتة سير العمل — مبنية للتوسع مع أعمالك.'
                : 'Custom CRM, ERP, inventory management, and workflow automation — built to scale with your business.',
            url: isAr ? 'https://cloudtopia.net/ar/business-systems-development' : 'https://cloudtopia.net/en/business-systems-development',
            locale: isAr ? 'ar_SA' : 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: isAr ? 'أنظمة الأعمال — كلاود توبيا' : 'CloudTopia Business Systems' }],
        },
        alternates: {
            canonical: isAr ? 'https://cloudtopia.net/ar/business-systems-development' : 'https://cloudtopia.net/en/business-systems-development',
            languages: { 'en': 'https://cloudtopia.net/en/business-systems-development', 'ar': 'https://cloudtopia.net/ar/business-systems-development', 'x-default': 'https://cloudtopia.net/en/business-systems-development' },
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
                            { '@type': 'ListItem', position: 3, name: 'Business Systems', item: 'https://cloudtopia.net/business-systems-development' },
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
                        name: 'Business Systems Development',
                        description: 'Custom business systems including CRM, ERP, inventory management, HR systems, and workflow automation — built to scale with your business needs.',
                        url: 'https://cloudtopia.net/business-systems-development',
                        provider: {
                            '@type': 'Organization',
                            name: 'CloudTopia',
                            url: 'https://cloudtopia.net',
                        },
                        serviceType: 'Custom Software Development',
                        areaServed: 'Worldwide',
                        hasOfferCatalog: {
                            '@type': 'OfferCatalog',
                            name: 'Business Systems Services',
                            itemListElement: [
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'CRM Systems' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'ERP Solutions' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Inventory Management' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'HR & Employee Management' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Booking & Appointment Systems' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Law Practice Management' } },
                                { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Medical Practice Systems' } },
                            ],
                        },
                    }),
                }}
            />
            {children}
        </>
    )
}
