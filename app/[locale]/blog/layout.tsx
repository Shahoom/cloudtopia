import type { Metadata } from 'next'
import { ogImagesFor } from '@/lib/og/og-image'
import ReadingProgress from '@/components/blog/ReadingProgress'
import './blog.css'

const titles: Record<string, string> = {
    en: 'Blog — Digital Marketing, Web Design & Tech Insights | CloudTopia',
    ar: 'المدونة — رؤى التسويق الرقمي وتصميم المواقع | كلاود توبيا',
    tr: 'Blog — Dijital Pazarlama, Web Tasarım & Teknoloji | CloudTopia',
}
const descriptions: Record<string, string> = {
    en: 'Expert insights on web design, e-commerce, digital marketing, business systems, and cloud technology — written for Gulf and Arab market businesses.',
    ar: 'رؤى متخصصة في تصميم المواقع والتجارة الإلكترونية والتسويق الرقمي والأنظمة السحابية — مكتوبة لأصحاب الأعمال في الخليج والعالم العربي.',
    tr: 'Web tasarımı, e-ticaret, dijital pazarlama ve bulut teknolojisi hakkında uzman içgörüler — Körfez ve Arap pazarındaki işletmeler için.',
}
const ogLocales: Record<string, string> = { en: 'en_US', ar: 'ar_SA', tr: 'tr_TR' }

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
    const locale = params.locale ?? 'en'
    const title = titles[locale] || titles.en
    const description = descriptions[locale] || descriptions.en

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: `https://cloudtopia.net/${locale}/blog`,
            locale: ogLocales[locale] || 'en_US',
            alternateLocale: Object.values(ogLocales).filter(l => l !== (ogLocales[locale] || 'en_US')),
            siteName: 'CloudTopia',
            type: 'website',
            images: ogImagesFor({ page: 'blog', locale }),
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: ogImagesFor({ page: 'blog', locale }).map(i => i.url),
        },
        alternates: {
            canonical: `https://cloudtopia.net/${locale}/blog`,
            languages: {
                'en': 'https://cloudtopia.net/en/blog',
                'ar': 'https://cloudtopia.net/ar/blog',
                'tr': 'https://cloudtopia.net/tr/blog',
                'x-default': 'https://cloudtopia.net/en/blog',
            },
            // RSS feed discovery — browsers and feed readers will auto-detect this
            // via the rendered <link rel="alternate" type="application/rss+xml"> tag.
            types: {
                'application/rss+xml': `https://cloudtopia.net/${locale}/blog/feed.xml`,
            },
        },
    }
}

export default async function BlogLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Blog',
                        name: 'CloudTopia Blog',
                        description: 'Expert insights on web design, e-commerce, digital marketing, and cloud technology for Gulf and Arab market businesses.',
                        url: 'https://cloudtopia.net/en/blog',
                        publisher: {
                            '@type': 'Organization',
                            name: 'CloudTopia',
                            url: 'https://cloudtopia.net',
                            logo: {
                                '@type': 'ImageObject',
                                url: 'https://cloudtopia.net/favicon.svg',
                            },
                        },
                        inLanguage: ['en-US', 'ar-SA', 'tr-TR'],
                    }),
                }}
            />
            <ReadingProgress />
            {children}
        </>
    )
}
