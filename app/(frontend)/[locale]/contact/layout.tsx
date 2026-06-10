import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/seo/schema'

export const contactSeoFallback = {
    titles: {
        en: 'Contact CloudTopia — Get in Touch',
        ar: 'تواصل مع كلاود توبيا',
    } as Record<string, string>,
    descriptions: {
        en: 'Contact us for a free consultation. We respond within 24 hours.',
        ar: 'تواصل معنا للحصول على استشارة مجانية. نرد خلال 24 ساعة.',
    } as Record<string, string>,
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/contact', 'contact', {
        title: contactSeoFallback.titles[locale] || contactSeoFallback.titles.en,
        description: contactSeoFallback.descriptions[locale] || contactSeoFallback.descriptions.en,
    })
}

export default async function ContactLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params
    const breadcrumbNames: Record<string, { home: string; contact: string }> = {
        en: { home: 'Home', contact: 'Contact' },
        ar: { home: 'الرئيسية', contact: 'التواصل' },
    }
    const names = breadcrumbNames[locale] || breadcrumbNames.en

    return (
        <>
            {/*
              SD-3: only the BreadcrumbList lives here. The single ContactPage
              entity (with its richer @graph + FAQPage) is emitted by
              contact/page.tsx so the same URL never renders two conflicting
              ContactPage nodes.
            */}
            <JsonLd
                schema={[
                    buildBreadcrumbSchema(locale, [
                        { name: names.home, path: '/' },
                        { name: names.contact, path: '/contact' },
                    ]),
                ]}
            />
            {children}
        </>
    )
}
