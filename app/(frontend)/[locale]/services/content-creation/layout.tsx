import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { buildFAQSchema } from '@/lib/seo/service-faqs'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/seo/schema'
import { contentCreationSeoFallback } from '@/lib/services/service-page-seo-fallbacks'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/services/content-creation', 'content-creation', {
        title: contentCreationSeoFallback.titles[locale] || contentCreationSeoFallback.titles.en,
        description: contentCreationSeoFallback.descriptions[locale] || contentCreationSeoFallback.descriptions.en,
    })
}

export default async function ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params
    const isArabic = locale === 'ar'
    const faqSchema = await buildFAQSchema('content-creation', locale)

    return (
        <>
            <JsonLd
                schema={[
                    buildBreadcrumbSchema(locale, [
                        { name: isArabic ? 'الرئيسية' : 'Home', path: '/' },
                        { name: isArabic ? 'الخدمات' : 'Services', path: '/services' },
                        { name: isArabic ? 'صناعة المحتوى' : 'Content Creation', path: '/services/content-creation' },
                    ]),
                    {
                        ...buildServiceSchema(locale, {
                            name: isArabic ? 'صناعة المحتوى وكتابة النصوص التسويقية' : 'Content Creation & Copywriting',
                            description: isArabic
                                ? 'محتوى ثنائي اللغة بالعربية والإنجليزية للعلامات التجارية في الخليج: مقالات ومدونات، نصوص فيديو، ومحتوى مُحسَّن لمحركات البحث.'
                                : 'Bilingual Arabic + English content, blog writing, video scripts, and SEO content for Gulf brands.',
                            path: '/services/content-creation',
                            serviceType: isArabic ? 'التسويق بالمحتوى' : 'Content Marketing',
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
