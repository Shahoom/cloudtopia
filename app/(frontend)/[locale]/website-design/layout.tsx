import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { buildFAQSchema } from '@/lib/seo/service-faqs'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/seo/schema'

export const websiteDesignSeoFallback = {
    titles: {
        en: 'Website Design & Development in the Gulf',
        ar: 'تصميم وتطوير مواقع الويب في الخليج',
    } as Record<string, string>,
    descriptions: {
        en: 'Bilingual Arabic + English websites for Gulf businesses. Fast, SEO-ready, RTL-correct, and scoped clearly.',
        ar: 'مواقع ويب ثنائية اللغة عربي + إنجليزي لأعمال الخليج. سريعة، جاهزة للسيو، RTL صحيح، وبنطاق واضح.',
    } as Record<string, string>,
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/website-design', 'website-design', {
        title: websiteDesignSeoFallback.titles[locale] || websiteDesignSeoFallback.titles.en,
        description: websiteDesignSeoFallback.descriptions[locale] || websiteDesignSeoFallback.descriptions.en,
    })
}

export default async function ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params
    const faqSchema = await buildFAQSchema('website-design', locale)

    return (
        <>
            <JsonLd
                schema={[
                    buildBreadcrumbSchema(locale, [
                        { name: 'Home', path: '/' },
                        { name: 'Services', path: '/services' },
                        { name: 'Website Design', path: '/website-design' },
                    ]),
                    buildServiceSchema(locale, {
                        name: 'Website Design & Development',
                        description: 'Bilingual Arabic + English websites for Gulf businesses. RTL-correct, SEO-ready, fast.',
                        path: '/website-design',
                        serviceType: 'Web Design',
                    }),
                    faqSchema,
                ]}
            />
            {children}
        </>
    )
}
