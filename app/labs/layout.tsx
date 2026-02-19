import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Labs — Innovation & Experimental Prototypes',
    description: 'Explore CloudTopia Labs — our innovation hub for AI, cloud-native, and cutting-edge experimental prototypes. Research and development that pushes boundaries.',
    openGraph: {
        title: 'CloudTopia Labs — Innovation Hub',
        description: 'Our innovation hub for AI, cloud-native, and cutting-edge experimental prototypes.',
        url: 'https://cloudtopia.net/labs',
        images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'CloudTopia Labs' }],
    },
    twitter: {
        title: 'CloudTopia Labs — Innovation Hub',
        description: 'Our innovation hub for AI, cloud-native, and cutting-edge experimental prototypes.',
    },
    alternates: {
        canonical: 'https://cloudtopia.net/labs',
        languages: { 'en': 'https://cloudtopia.net/labs', 'ar': 'https://cloudtopia.net/ar/labs' },
    },
}

export default function LabsLayout({ children }: { children: React.ReactNode }) {
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
                            { '@type': 'ListItem', position: 2, name: 'Labs', item: 'https://cloudtopia.net/labs' },
                        ],
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebPage',
                        name: 'CloudTopia Labs — Innovation Hub',
                        description: 'Our innovation hub for AI, cloud-native, and cutting-edge experimental prototypes.',
                        url: 'https://cloudtopia.net/labs',
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
