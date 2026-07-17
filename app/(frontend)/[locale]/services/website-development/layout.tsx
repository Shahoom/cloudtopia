import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { buildFAQSchema } from '@/lib/seo/service-faqs'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/seo/schema'
import { websiteDesignSeoFallback } from '@/lib/services/service-page-seo-fallbacks'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/services/website-development', 'website-design', {
        title: websiteDesignSeoFallback.titles[locale] || websiteDesignSeoFallback.titles.en,
        description: websiteDesignSeoFallback.descriptions[locale] || websiteDesignSeoFallback.descriptions.en,
    })
}

export default async function ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params
    const isArabic = locale === 'ar'
    const faqSchema = await buildFAQSchema('website-design', locale)

    return (
        <>
            <JsonLd
                schema={[
                    buildBreadcrumbSchema(locale, [
                        { name: isArabic ? 'الرئيسية' : 'Home', path: '/' },
                        { name: isArabic ? 'الخدمات' : 'Services', path: '/services' },
                        { name: isArabic ? 'تطوير المواقع' : 'Website Development', path: '/services/website-development' },
                    ]),
                    {
                        ...buildServiceSchema(locale, {
                            name: isArabic ? 'تطوير المواقع الإلكترونية' : 'Website Development',
                            description: isArabic
                                ? 'مواقع إلكترونية ثنائية اللغة بالعربية والإنجليزية لشركات الخليج، سريعة الأداء، متقنة الاتجاه من اليمين إلى اليسار، وجاهزة لتصدّر نتائج البحث.'
                                : 'Bilingual Arabic + English websites for Gulf businesses. RTL-correct, SEO-ready, fast.',
                            path: '/services/website-development',
                            serviceType: isArabic ? 'تطوير المواقع' : 'Web Development',
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
