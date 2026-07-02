import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { buildFAQSchema } from '@/lib/seo/service-faqs'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/seo/schema'

export const ecommerceSolutionsSeoFallback = {
    titles: {
        en: 'Gulf E-Commerce — Mada, Apple Pay, Tabby, Tamara',
        ar: 'متاجر إلكترونية خليجية — مدى وآبل باي وتابي وتمارا',
    } as Record<string, string>,
    descriptions: {
        en: 'Online stores with Gulf payment gateways, ZATCA e-invoicing, bilingual checkout, and clear package scope.',
        ar: 'متاجر إلكترونية مع بوابات دفع خليجية، فوترة ZATCA، دفع ثنائي اللغة، ونطاق باقة واضح.',
    } as Record<string, string>,
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/ecommerce-development', 'ecommerce-solutions', {
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
                        { name: 'E-Commerce Solutions', path: '/ecommerce-development' },
                    ]),
                    buildServiceSchema(locale, {
                        name: 'E-Commerce Solutions & Online Stores',
                        description: 'Full e-commerce stores with Mada, Apple Pay, STC Pay, Tabby, Tamara, ZATCA e-invoicing, and Arabic + English checkout.',
                        path: '/ecommerce-development',
                        serviceType: 'E-Commerce Development',
                    }),
                    faqSchema,
                ]}
            />
            {children}
        </>
    )
}
