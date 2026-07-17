import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { buildFAQSchema } from '@/lib/seo/service-faqs'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/seo/schema'
import { socialMediaSeoFallback } from '@/lib/services/service-page-seo-fallbacks'

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/services/social-media-marketing', 'social-media-marketing', {
        title: socialMediaSeoFallback.titles[locale] || socialMediaSeoFallback.titles.en,
        description: socialMediaSeoFallback.descriptions[locale] || socialMediaSeoFallback.descriptions.en,
    })
}

export default async function ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params
    const isArabic = locale === 'ar'
    const faqSchema = await buildFAQSchema('social-media-marketing', locale)

    return (
        <>
            <JsonLd
                schema={[
                    buildBreadcrumbSchema(locale, [
                        { name: isArabic ? 'الرئيسية' : 'Home', path: '/' },
                        { name: isArabic ? 'الخدمات' : 'Services', path: '/services' },
                        { name: isArabic ? 'التسويق عبر وسائل التواصل الاجتماعي' : 'Social Media Marketing', path: '/services/social-media-marketing' },
                    ]),
                    {
                        ...buildServiceSchema(locale, {
                            name: isArabic ? 'التسويق عبر وسائل التواصل الاجتماعي وإدارة الحسابات' : 'Social Media Marketing & Management',
                            description: isArabic
                                ? 'محتوى عربي أولاً وحملات ممولة موجّهة لجمهور الخليج على تيك توك وسناب شات وإنستغرام وميتا ويوتيوب.'
                                : 'Arabic-first content and paid social for Gulf audiences. TikTok, Snapchat, Instagram, Meta, YouTube.',
                            path: '/services/social-media-marketing',
                            serviceType: isArabic ? 'التسويق عبر وسائل التواصل الاجتماعي' : 'Social Media Marketing',
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
