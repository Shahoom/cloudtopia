import { headers } from 'next/headers'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
    const locale = headers().get('x-locale') ?? 'en'
    const isAr = locale === 'ar'
    return {
        title: isAr
            ? 'تواصل معنا — احصل على استشارة مجانية'
            : 'Contact Us — Get a Free Consultation',
        description: isAr
            ? 'تواصل مع كلاود توبيا للحصول على استشارة مجانية. تواصل معنا عبر البريد الإلكتروني أو واتساب أو نموذج التواصل. نحن مستعدون لمساعدتك في تحويل أعمالك رقمياً.'
            : 'Get in touch with CloudTopia for a free consultation. Reach us via email, WhatsApp, or our contact form. We\'re ready to help transform your business digitally.',
        openGraph: {
            title: isAr ? 'تواصل مع كلاود توبيا — ابدأ رحلتك الرقمية' : 'Contact CloudTopia — Start Your Digital Journey',
            description: isAr
                ? 'تواصل معنا للحصول على استشارة مجانية عبر البريد الإلكتروني أو واتساب أو نموذج التواصل.'
                : 'Get in touch for a free consultation. Reach us via email, WhatsApp, or our contact form.',
            url: isAr ? 'https://cloudtopia.net/ar/contact' : 'https://cloudtopia.net/en/contact',
            locale: isAr ? 'ar_SA' : 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: isAr ? 'تواصل مع كلاود توبيا' : 'Contact CloudTopia' }],
        },
        twitter: {
            title: isAr ? 'تواصل مع كلاود توبيا' : 'Contact CloudTopia',
            description: isAr
                ? 'تواصل للحصول على استشارة مجانية عبر البريد الإلكتروني أو واتساب أو نموذج التواصل.'
                : 'Get in touch for a free consultation. Reach us via email, WhatsApp, or our contact form.',
        },
        alternates: {
            canonical: isAr ? 'https://cloudtopia.net/ar/contact' : 'https://cloudtopia.net/en/contact',
            languages: { 'en': 'https://cloudtopia.net/en/contact', 'ar': 'https://cloudtopia.net/ar/contact', 'x-default': 'https://cloudtopia.net/en/contact' },
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
