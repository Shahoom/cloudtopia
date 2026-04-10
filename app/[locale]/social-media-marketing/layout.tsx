import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const titles: Record<string, string> = {
        en: 'Social Media Marketing & Management',
        ar: 'تسويق وإدارة وسائل التواصل الاجتماعي',
        tr: 'Sosyal Medya Pazarlama & Yönetim',
    }
    const descs: Record<string, string> = {
        en: 'Strategic social media marketing to grow your brand presence and engagement.',
        ar: 'تسويق استراتيجي عبر وسائل التواصل الاجتماعي لتنمية حضور علامتك التجارية.',
        tr: 'Marka varlığınızı ve etkileşiminizi artırmak için stratejik sosyal medya pazarlama.',
    }
    const ogTitles: Record<string, string> = {
        en: 'Social Media Marketing — CloudTopia',
        ar: 'تسويق وسائل التواصل — كلاود توبيا',
        tr: 'Sosyal Medya Pazarlama — CloudTopia',
    }
    const ogDescs: Record<string, string> = {
        en: 'Professional social media management and advertising.',
        ar: 'إدارة احترافية لوسائل التواصل الاجتماعي والإعلانات.',
        tr: 'Profesyonel sosyal medya yönetimi ve reklam.',
    }
    const ogLocales: Record<string, string> = { en: 'en_US', ar: 'ar_SA', tr: 'tr_TR' }
    const title = titles[locale] || titles.en
    const desc = descs[locale] || descs.en
    const ogTitle = ogTitles[locale] || ogTitles.en
    const ogDesc = ogDescs[locale] || ogDescs.en

    return {
        title,
        description: desc,
        openGraph: {
            title: ogTitle,
            description: ogDesc,
            url: `https://cloudtopia.net/${locale}/social-media-marketing`,
            locale: ogLocales[locale] || 'en_US',
            images: [{ url: '/images/og-image.jpg', width: 1200, height: 630, alt: ogTitle }],
        },
        twitter: { title: ogTitle, description: ogDesc },
        alternates: {
            canonical: `https://cloudtopia.net/${locale}/social-media-marketing`,
            languages: { 'en': 'https://cloudtopia.net/en/social-media-marketing', 'ar': 'https://cloudtopia.net/ar/social-media-marketing', 'tr': 'https://cloudtopia.net/tr/social-media-marketing', 'x-default': 'https://cloudtopia.net/en/social-media-marketing' },
        },
    }
}

export default function socialmediamarketingLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://cloudtopia.net/en' },
                            { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://cloudtopia.net/en/services' },
                            { '@type': 'ListItem', position: 3, name: 'Social Media Marketing', item: 'https://cloudtopia.net/en/social-media-marketing' },
                        ],
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Service',
                        name: 'Social Media Marketing & Management',
                        description: 'Strategic social media marketing to grow your brand presence and engagement.',
                        url: 'https://cloudtopia.net/en/social-media-marketing',
                        provider: {
                            '@type': 'Organization',
                            name: 'CloudTopia',
                            url: 'https://cloudtopia.net',
                        },
                        serviceType: 'Social Media Marketing',
                        areaServed: 'Worldwide',
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: 'How much do social media marketing services cost?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'Our social media marketing packages are customized based on your needs, platforms, and goals. We offer flexible pricing starting from basic management to comprehensive full-service solutions. Contact us for a personalized quote.',
                                },
                            },
                            {
                                '@type': 'Question',
                                name: 'How long does it take to see results from social media marketing?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'While some improvements can be seen within the first month, sustainable growth typically takes 3-6 months of consistent effort. We focus on building genuine engagement and long-term brand awareness rather than quick fixes.',
                                },
                            },
                            {
                                '@type': 'Question',
                                name: 'Which social media platforms should my business be on?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'The right platforms depend on your target audience and business type. We analyze your industry and customer demographics to recommend the most effective platforms for your specific goals.',
                                },
                            },
                            {
                                '@type': 'Question',
                                name: 'Do you create content or do we need to provide it?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text: 'We handle all content creation including graphics, videos, captions, and hashtag research. We work with you to understand your brand voice and create content that authentically represents your business.',
                                },
                            },
                        ],
                    }),
                }}
            />
            {children}
        </>
    )
}
