import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { buildFAQSchema } from '@/lib/seo/service-faqs'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/seo/schema'

export const businessSystemsSeoFallback = {
    titles: {
        en: 'Custom Business Systems & CRM Development',
        ar: 'تطوير أنظمة أعمال وCRM مخصصة',
    } as Record<string, string>,
    descriptions: {
        en: 'Custom CRM, inventory, POS, HR, and booking systems built for Gulf workflows with bilingual handoff.',
        ar: 'أنظمة CRM ومخزون وPOS وHR وحجوزات مخصصة لسير عمل الخليج مع تسليم ثنائي اللغة.',
    } as Record<string, string>,
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/business-systems-development', 'business-systems-development', {
        title: businessSystemsSeoFallback.titles[locale] || businessSystemsSeoFallback.titles.en,
        description: businessSystemsSeoFallback.descriptions[locale] || businessSystemsSeoFallback.descriptions.en,
    })
}

export default async function ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params
    const faqSchema = await buildFAQSchema('business-systems-development', locale)

    return (
        <>
            <JsonLd
                schema={[
                    buildBreadcrumbSchema(locale, [
                        { name: 'Home', path: '/' },
                        { name: 'Services', path: '/services' },
                        { name: 'Business Systems Development', path: '/business-systems-development' },
                    ]),
                    buildServiceSchema(locale, {
                        name: 'Custom Business Systems Development',
                        description: 'Custom CRM, inventory, POS, HR, and booking systems built around Gulf business workflows.',
                        path: '/business-systems-development',
                        serviceType: 'Business Software Development',
                    }),
                    faqSchema,
                ]}
            />
            {children}
        </>
    )
}
