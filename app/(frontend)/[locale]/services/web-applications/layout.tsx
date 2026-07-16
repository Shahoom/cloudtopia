import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { buildFAQSchema } from '@/lib/seo/service-faqs'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/seo/schema'
import { webApplicationsSeoFallback } from './seo-fallback'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/services/web-applications', 'web-applications', {
        title: webApplicationsSeoFallback.titles[locale] || webApplicationsSeoFallback.titles.en,
        description: webApplicationsSeoFallback.descriptions[locale] || webApplicationsSeoFallback.descriptions.en,
    })
}

export default async function WebApplicationsLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params
    const faqSchema = await buildFAQSchema('web-applications', locale)

    return (
        <>
            <JsonLd
                schema={[
                    buildBreadcrumbSchema(locale, [
                        { name: 'Home', path: '/' },
                        { name: 'Services', path: '/services' },
                        { name: 'Web Applications', path: '/services/web-applications' },
                    ]),
                    buildServiceSchema(locale, {
                        name: 'Custom Web Applications Development',
                        description: 'Interactive web applications with real-time features, portals, and SaaS platforms.',
                        path: '/services/web-applications',
                        serviceType: 'Web Application Development',
                    }),
                    faqSchema,
                ]}
            />
            {children}
        </>
    )
}
