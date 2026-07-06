import type { Metadata } from 'next'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { buildFAQSchema } from '@/lib/seo/service-faqs'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, buildServiceSchema } from '@/lib/seo/schema'

export const contentCreationSeoFallback = {
    titles: {
        en: 'Bilingual Content Creation — Arabic + English',
        ar: 'إنشاء محتوى ثنائي اللغة — عربي وإنجليزي',
    } as Record<string, string>,
    descriptions: {
        en: 'Original Arabic + English content: blogs, social, video scripts, newsletters, and SEO articles. Native-written, not machine translated.',
        ar: 'محتوى عربي + إنجليزي أصيل: مدوّنات، اجتماعي، سكربتات فيديو، نشرات، ومقالات SEO. مكتوب بأقلام أصيلة.',
    } as Record<string, string>,
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale = 'en' } = await params
    return getCMSMetadata(locale, '/services/content-creation', 'content-creation', {
        title: contentCreationSeoFallback.titles[locale] || contentCreationSeoFallback.titles.en,
        description: contentCreationSeoFallback.descriptions[locale] || contentCreationSeoFallback.descriptions.en,
    })
}

export default async function ({ children, params }: { children: React.ReactNode; params: Promise<{ locale: string }> }) {
    const { locale = 'en' } = await params
    const faqSchema = await buildFAQSchema('content-creation', locale)

    return (
        <>
            <JsonLd
                schema={[
                    buildBreadcrumbSchema(locale, [
                        { name: 'Home', path: '/' },
                        { name: 'Services', path: '/services' },
                        { name: 'Content Creation', path: '/services/content-creation' },
                    ]),
                    buildServiceSchema(locale, {
                        name: 'Content Creation & Copywriting',
                        description: 'Bilingual Arabic + English content, blog writing, video scripts, and SEO content for Gulf brands.',
                        path: '/services/content-creation',
                        serviceType: 'Content Marketing',
                    }),
                    faqSchema,
                ]}
            />
            {children}
        </>
    )
}
