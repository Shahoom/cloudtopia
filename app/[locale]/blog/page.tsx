import { getAllPosts, getAllTags } from '@/lib/blog'
import { getDictionary } from '@/lib/i18n'
import BlogGrid from '@/components/blog/BlogGrid'
import BlogHeader from '@/components/blog/BlogHeader'
import type { Locale } from '@/lib/i18n/config'

// Metadata for this page is owned by `layout.tsx` to avoid drift —
// it already sets title, description, canonical, hreflang, OG, and Blog schema.

const BASE_URL = 'https://cloudtopia.net'

const BLOG_LABELS: Record<string, { name: string; description: string }> = {
    en: {
        name: 'CloudTopia Blog',
        description: 'Expert guides on web design, e-commerce, AI, and cloud infrastructure for Gulf and Arab market businesses.',
    },
    ar: {
        name: 'مدونة كلاود توبيا',
        description: 'أدلة متخصصة في تصميم المواقع والتجارة الإلكترونية والذكاء الاصطناعي والبنية السحابية للأعمال الخليجية والعربية.',
    },
    tr: {
        name: 'CloudTopia Blog',
        description: 'Körfez ve Arap pazarındaki işletmeler için web tasarım, e-ticaret, yapay zeka ve bulut altyapısı üzerine uzman rehberler.',
    },
}

const BCP47: Record<string, string> = { en: 'en-US', ar: 'ar-SA', tr: 'tr-TR' }

export default async function BlogPage({
    params,
}: {
    params: { locale: string }
}) {
    const lang = params.locale || 'en'
    const posts = getAllPosts(lang)
    const tags = getAllTags(lang)
    const dict = await getDictionary(lang as Locale)

    const labels = BLOG_LABELS[lang] || BLOG_LABELS.en

    // CollectionPage + ItemList schema improves rich discovery for the blog index
    // (Google, Perplexity, ChatGPT all prefer structured lists when surfacing
    // "latest on this blog" style intent).
    const collectionSchema = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: labels.name,
        description: labels.description,
        url: `${BASE_URL}/${lang}/blog`,
        inLanguage: BCP47[lang] || 'en-US',
        isPartOf: {
            '@type': 'WebSite',
            name: 'CloudTopia',
            url: BASE_URL,
        },
        mainEntity: {
            '@type': 'ItemList',
            numberOfItems: posts.length,
            itemListElement: posts.slice(0, 30).map((p, i) => ({
                '@type': 'ListItem',
                position: i + 1,
                url: `${BASE_URL}/${lang}/blog/${encodeURIComponent(p.slug)}`,
                name: p.title,
            })),
        },
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
            />
            <main className="min-h-screen bg-[var(--blog-bg)] w-full text-[var(--blog-text)] font-['Inter']">
                <BlogHeader
                    title={dict.blog.title}
                    subtitle={dict.blog.subtitle}
                    postCount={posts.length}
                    lang={lang as 'en' | 'ar' | 'tr'}
                />

                <section className="w-full max-w-7xl mx-auto px-6 py-14">
                    <BlogGrid
                        posts={posts}
                        tags={tags}
                        translations={{
                            allPosts: dict.blog.allPosts,
                            readMore: dict.blog.readMore,
                            readingTime: dict.blog.readingTime,
                            noPostsFound: dict.blog.noPostsFound,
                        }}
                    />
                </section>
            </main>
        </>
    )
}
