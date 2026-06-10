import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { buildFAQSchema } from '@/lib/seo/service-faqs'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/seo/schema'

export const socialMediaSeoFallback = {
    titles: {
        en: 'Arabic-First Social Media Marketing for the Gulf',
        ar: 'تسويق وسائل التواصل الاجتماعي بالعربية أولاً للخليج',
    } as Record<string, string>,
    descriptions: {
        en: 'Arabic-first content and paid social for Saudi, UAE, Kuwait, and Gulf audiences across TikTok, Snapchat, Instagram, and Meta.',
        ar: 'محتوى عربي أولاً وإعلانات اجتماعية مدفوعة لجمهور السعودية والإمارات والكويت والخليج عبر تيك توك وسناب شات وإنستاجرام وميتا.',
    } as Record<string, string>,
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/social-media-marketing', 'social-media-marketing', {
        title: socialMediaSeoFallback.titles[locale] || socialMediaSeoFallback.titles.en,
        description: socialMediaSeoFallback.descriptions[locale] || socialMediaSeoFallback.descriptions.en,
    })
}

export default async function ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params
    const faqSchema = await buildFAQSchema('social-media-marketing', locale)

    return (
        <>
            <JsonLd
                schema={[
                    buildBreadcrumbSchema(locale, [
                        { name: 'Home', path: '/' },
                        { name: 'Services', path: '/services' },
                        { name: 'Social Media Marketing', path: '/social-media-marketing' },
                    ]),
                    buildServiceSchema(locale, {
                        name: 'Social Media Marketing & Management',
                        description: 'Arabic-first content and paid social for Gulf audiences. TikTok, Snapchat, Instagram, Meta, YouTube.',
                        path: '/social-media-marketing',
                        serviceType: 'Social Media Marketing',
                    }),
                    faqSchema,
                ]}
            />
            {children}
        </>
    )
}
