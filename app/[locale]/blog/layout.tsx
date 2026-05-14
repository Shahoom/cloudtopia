import type { Metadata } from 'next'
import { canonicalUrl, buildHreflangMap } from '@/lib/i18n/url'
import ReadingProgress from '@/components/blog/ReadingProgress'
import './blog.css'

// Titles intentionally do NOT include "| CloudTopia" — the root metadata
// template (`'%s | CloudTopia'`) appends it. Including it twice produced
// "... | CloudTopia | CloudTopia" in <title> tags.
const titles: Record<string, string> = {
    en: 'Blog — Web Design, E-commerce & Tech Insights',
    ar: 'المدونة — رؤى تصميم المواقع والتجارة الإلكترونية',
    tr: 'Blog — Web Tasarım, E-Ticaret & Teknoloji',
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

    // Per user instruction: blog index page does NOT emit an OG image.
    // OG images for individual blog posts are set per-post in
    // app/[locale]/blog/[slug]/page.tsx using each post's coverImage.
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url: canonicalUrl(locale, '/blog'),
            locale: ogLocales[locale] || 'en_US',
            alternateLocale: Object.values(ogLocales).filter(l => l !== (ogLocales[locale] || 'en_US')),
            siteName: 'CloudTopia',
            type: 'website',
        },
        twitter: {
            card: 'summary',
            title,
            description,
        },
        alternates: {
            canonical: canonicalUrl(locale, '/blog'),
            languages: buildHreflangMap('/blog'),
            // RSS feed discovery — browsers and feed readers will auto-detect this
            // via the rendered <link rel="alternate" type="application/rss+xml"> tag.
            types: {
                'application/rss+xml': canonicalUrl(locale, '/blog/feed.xml'),
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
                        url: canonicalUrl('en', '/blog'),
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
