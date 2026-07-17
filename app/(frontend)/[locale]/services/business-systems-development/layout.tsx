import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { buildFAQSchema } from '@/lib/seo/service-faqs'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/seo/schema'
import { businessSystemsSeoFallback } from './seo-fallback'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/services/business-systems-development', 'business-systems-development', {
        title: businessSystemsSeoFallback.titles[locale] || businessSystemsSeoFallback.titles.en,
        description: businessSystemsSeoFallback.descriptions[locale] || businessSystemsSeoFallback.descriptions.en,
    })
}

export default async function BusinessSystemsLayout({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params
    const isArabic = locale === 'ar'
    const faqSchema = await buildFAQSchema('business-systems-development', locale)

    return (
        <>
            <JsonLd
                schema={[
                    buildBreadcrumbSchema(locale, [
                        { name: isArabic ? 'الرئيسية' : 'Home', path: '/' },
                        { name: isArabic ? 'الخدمات' : 'Services', path: '/services' },
                        { name: isArabic ? 'تطوير أنظمة الأعمال' : 'Business Systems Development', path: '/services/business-systems-development' },
                    ]),
                    {
                        ...buildServiceSchema(locale, {
                            name: isArabic ? 'تطوير أنظمة الأعمال المخصصة' : 'Custom Business Systems Development',
                            description: isArabic
                                ? 'أنظمة مخصصة لإدارة علاقات العملاء والمخزون ونقاط البيع والموارد البشرية والحجوزات، مصمّمة حول سير عمل الشركات في الخليج.'
                                : 'Custom CRM, inventory, POS, HR, and booking systems built around Gulf business workflows.',
                            path: '/services/business-systems-development',
                            serviceType: isArabic ? 'تطوير برمجيات الأعمال' : 'Business Software Development',
                        }),
                        inLanguage: isArabic ? 'ar' : 'en',
                    },
                    faqSchema,
                ]}
            />
            {children}
        </>
    )
}
