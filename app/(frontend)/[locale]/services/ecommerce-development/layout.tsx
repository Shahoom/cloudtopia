import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { buildFAQSchema } from '@/lib/seo/service-faqs'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/seo/schema'
import { ecommerceSolutionsSeoFallback } from '@/lib/services/service-page-seo-fallbacks'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/services/ecommerce-development', 'ecommerce-solutions', {
        title: ecommerceSolutionsSeoFallback.titles[locale] || ecommerceSolutionsSeoFallback.titles.en,
        description: ecommerceSolutionsSeoFallback.descriptions[locale] || ecommerceSolutionsSeoFallback.descriptions.en,
    })
}

export default async function ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params
    const faqSchema = await buildFAQSchema('ecommerce-solutions', locale)

    return (
        <>
            <JsonLd
                schema={[
                    buildBreadcrumbSchema(locale, [
                        { name: 'Home', path: '/' },
                        { name: 'Services', path: '/services' },
                        { name: 'E-Commerce Solutions', path: '/services/ecommerce-development' },
                    ]),
                    buildServiceSchema(locale, {
                        name: 'E-Commerce Solutions & Online Stores',
                        description: 'Full e-commerce stores with Mada, Apple Pay, STC Pay, Tabby, Tamara, ZATCA e-invoicing, and Arabic + English checkout.',
                        path: '/services/ecommerce-development',
                        serviceType: 'E-Commerce Development',
                    }),
                    faqSchema,
                ]}
            />
            {children}
        </>
    )
}
