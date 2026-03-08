import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Contact Us — Get a Free Consultation',
    description: 'Get in touch with CloudTopia for a free consultation. Reach us via email, WhatsApp, or our contact form. We\'re ready to help transform your business digitally.',
    openGraph: {
        title: 'Contact CloudTopia — Start Your Digital Journey',
        description: 'Get in touch for a free consultation. Reach us via email, WhatsApp, or our contact form.',
        url: 'https://cloudtopia.net/contact',
        images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: 'Contact CloudTopia' }],
    },
    twitter: {
        title: 'Contact CloudTopia',
        description: 'Get in touch for a free consultation. Reach us via email, WhatsApp, or our contact form.',
    },
    alternates: {
        canonical: 'https://cloudtopia.net/en/contact',
        languages: { 'en': 'https://cloudtopia.net/en/contact', 'ar': 'https://cloudtopia.net/ar/contact', 'x-default': 'https://cloudtopia.net/en/contact' },
    },
}

export default function ContactLayout({ children }: { children: React.ReactNode }) {
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
                            { '@type': 'ListItem', position: 2, name: 'Contact', item: 'https://cloudtopia.net/contact' },
                        ],
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'ContactPage',
                        name: 'Contact CloudTopia',
                        description: 'Get in touch with CloudTopia for a free consultation.',
                        url: 'https://cloudtopia.net/contact',
                        mainEntity: {
                            '@type': 'Organization',
                            name: 'CloudTopia',
                            url: 'https://cloudtopia.net',
                            email: 'info@cloudtopia.net',
                            telephone: '+90-501-151-11-16',
                        },
                    }),
                }}
            />
            {children}
        </>
    )
}
