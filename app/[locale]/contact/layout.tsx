import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const titles: Record<string, string> = {
        en: 'Contact CloudTopia — Get in Touch',
        ar: 'تواصل مع كلاود توبيا',
        tr: 'CloudTopia İletişim — Bize Ulaşın',
    }
    const descs: Record<string, string> = {
        en: 'Contact us for a free consultation. We respond within 24 hours.',
        ar: 'تواصل معنا للحصول على استشارة مجانية. نرد خلال 24 ساعة.',
        tr: 'Ücretsiz danışmanlık için bizimle iletişime geçin. 24 saat içinde yanıt veriyoruz.',
    }
    const ogTitles: Record<string, string> = {
        en: 'Contact — CloudTopia',
        ar: 'التواصل — كلاود توبيا',
        tr: 'İletişim — CloudTopia',
    }
    const ogDescs: Record<string, string> = {
        en: 'Get in touch for a free consultation.',
        ar: 'تواصل معنا للحصول على استشارة مجانية.',
        tr: 'Ücretsiz danışmanlık için bize ulaşın.',
    }
    const ogLocales: Record<string, string> = { en: 'en_US', ar: 'ar_SA', tr: 'tr_TR' }
    const title = titles[locale] || titles.en
    const desc = descs[locale] || descs.en
    const ogTitle = ogTitles[locale] || ogTitles.en
    const ogDesc = ogDescs[locale] || ogDescs.en

    return {
        title,
        description: desc,
        openGraph: {
            title: ogTitle,
            description: ogDesc,
            url: `https://cloudtopia.net/${locale}/contact`,
            locale: ogLocales[locale] || 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: ogTitle }],
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: `https://cloudtopia.net/${locale}/contact`,
            languages: { 'en': 'https://cloudtopia.net/en/contact', 'ar': 'https://cloudtopia.net/ar/contact', 'tr': 'https://cloudtopia.net/tr/contact', 'x-default': 'https://cloudtopia.net/en/contact' },
        },
    }
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
