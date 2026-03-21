import { Metadata } from 'next'
import { getAllPosts, getAllTags } from '@/lib/blog'
import { getDictionary } from '@/lib/i18n'
import BlogGrid from '@/components/blog/BlogGrid'
import BlogHeader from '@/components/blog/BlogHeader'
import type { Locale } from '@/lib/i18n/config'

const META: Record<string, { title: string; description: string }> = {
    en: {
        title: 'Cloudtopia Blog | Insights & Guides',
        description: 'In-depth guides, strategic thinking, and the latest updates on cloud infrastructure and digital transformation.',
    },
    ar: {
        title: 'مدونة كلاودتوبيا | أدلة ورؤى',
        description: 'أدلة متعمقة، تفكير استراتيجي، وآخر التحديثات حول البنية التحتية السحابية والتحول الرقمي.',
    },
    tr: {
        title: 'Cloudtopia Blog | Rehberler ve Görüşler',
        description: 'Bulut altyapısı ve dijital dönüşüm hakkında derinlemesine rehberler, stratejik düşünceler ve en son güncellemeler.',
    },
}

export async function generateMetadata({
    params,
}: {
    params: { locale: string }
}): Promise<Metadata> {
    const lang = params.locale || 'en'
    const m = META[lang] || META.en
    return { title: m.title, description: m.description }
}

export default async function BlogPage({
    params,
}: {
    params: { locale: string }
}) {
    const lang = params.locale || 'en'
    const posts = getAllPosts(lang)
    const tags = getAllTags(lang)
    const dict = await getDictionary(lang as Locale)

    return (
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
    )
}
