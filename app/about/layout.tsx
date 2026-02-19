import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'About Us — Our Mission, Vision & Values',
    description: 'Learn about CloudTopia\'s mission to empower businesses with digital and cloud technologies. Discover our vision, values, and expert team serving clients worldwide.',
    openGraph: {
        title: 'About CloudTopia — Digital & Cloud Technologies',
        description: 'Learn about our mission to empower businesses with digital and cloud technologies. Discover our vision, values, and expert team.',
        url: 'https://cloudtopia.net/about',
        images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'About CloudTopia' }],
    },
    twitter: {
        title: 'About CloudTopia',
        description: 'Learn about our mission to empower businesses with digital and cloud technologies.',
    },
    alternates: {
        canonical: 'https://cloudtopia.net/about',
        languages: { 'en': 'https://cloudtopia.net/about', 'ar': 'https://cloudtopia.net/ar/about' },
    },
}

export default function AboutLayout({ children }: { children: React.ReactNode }) {
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
                            { '@type': 'ListItem', position: 2, name: 'About Us', item: 'https://cloudtopia.net/about' },
                        ],
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'AboutPage',
                        name: 'About CloudTopia',
                        description: 'Learn about CloudTopia\'s mission to empower businesses with digital and cloud technologies.',
                        url: 'https://cloudtopia.net/about',
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
