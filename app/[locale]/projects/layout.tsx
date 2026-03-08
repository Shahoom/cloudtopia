import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const isAr = locale === 'ar'
    return {
        title: isAr
            ? 'مشاريعنا — أعمالنا ودراسات الحالة'
            : 'Projects — Our Work & Case Studies',
        description: isAr
            ? 'تصفح محفظة كلاود توبيا: مواقع مخصصة، متاجر إلكترونية، أنظمة CRM، منصات حجز، قوائم QR للمطاعم، وتطبيقات ويب لأعمال حقيقية.'
            : 'Browse CloudTopia\'s portfolio: custom websites, e-commerce stores, CRM systems, booking platforms, restaurant QR menus, and web applications built for real businesses.',
        openGraph: {
            title: isAr ? 'مشاريعنا — محفظة كلاود توبيا' : 'Our Projects — CloudTopia Portfolio',
            description: isAr
                ? 'مواقع مخصصة، متاجر إلكترونية، أنظمة CRM، منصات حجز، وتطبيقات ويب لأعمال حقيقية.'
                : 'Custom websites, e-commerce stores, CRM systems, booking platforms, and web applications built for real businesses.',
            url: isAr ? 'https://cloudtopia.net/ar/projects' : 'https://cloudtopia.net/en/projects',
            locale: isAr ? 'ar_SA' : 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: isAr ? 'محفظة مشاريع كلاود توبيا' : 'CloudTopia Projects Portfolio' }],
        },
        twitter: {
            title: isAr ? 'مشاريعنا — محفظة كلاود توبيا' : 'Our Projects — CloudTopia Portfolio',
            description: isAr
                ? 'مواقع مخصصة، متاجر إلكترونية، أنظمة CRM، وتطبيقات ويب لأعمال حقيقية.'
                : 'Custom websites, e-commerce stores, CRM systems, and web applications for real businesses.',
        },
        alternates: {
            canonical: isAr ? 'https://cloudtopia.net/ar/projects' : 'https://cloudtopia.net/en/projects',
            languages: { 'en': 'https://cloudtopia.net/en/projects', 'ar': 'https://cloudtopia.net/ar/projects', 'x-default': 'https://cloudtopia.net/en/projects' },
        },
    }
}

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
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
                            { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://cloudtopia.net/projects' },
                        ],
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CollectionPage',
                        name: 'CloudTopia Projects Portfolio',
                        description: 'Explore our portfolio of successful digital transformation projects.',
                        url: 'https://cloudtopia.net/projects',
                        mainEntity: {
                            '@type': 'Organization',
                            name: 'CloudTopia',
                            url: 'https://cloudtopia.net',
                        },
                    }),
                }}
            />
            {children}
        </>
    )
}
