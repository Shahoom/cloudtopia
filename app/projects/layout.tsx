import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Projects — Our Work & Case Studies',
    description: 'Explore CloudTopia\'s portfolio of successful projects. From digital presence solutions to complex web applications and business systems — see how we transform businesses.',
    openGraph: {
        title: 'Our Projects — CloudTopia Portfolio',
        description: 'Explore our portfolio of successful projects. From digital presence to complex web applications and business systems.',
        url: 'https://cloudtopia.net/projects',
        images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'CloudTopia Projects Portfolio' }],
    },
    twitter: {
        title: 'Our Projects — CloudTopia Portfolio',
        description: 'Explore our portfolio of successful digital transformation projects.',
    },
    alternates: {
        canonical: 'https://cloudtopia.net/projects',
        languages: { 'en': 'https://cloudtopia.net/projects', 'ar': 'https://cloudtopia.net/ar/projects' },
    },
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
