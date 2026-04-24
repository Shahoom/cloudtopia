import type { BlogPostMeta } from '@/lib/blog'
import { GlassBlogCard } from '@/components/ui/glass-blog-card-shadcnui'

interface BlogCardProps {
    post: BlogPostMeta
    translations: {
        readMore: string
        readingTime: string
    }
}

export default function BlogCard({ post, translations }: BlogCardProps) {
    const isRtl = post.lang === 'ar'

    const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(post.author)}&background=6366f1&color=fff&size=200`

    return (
        <GlassBlogCard
            title={post.title}
            excerpt={post.excerpt}
            image={post.coverImage || undefined}
            imageAlt={post.coverImageAlt || post.title}
            author={{
                name: post.author,
                avatar: avatarUrl
            }}
            date={post.date}
            readTime={
                post.readingTime.toString().includes(' ')
                    ? post.readingTime.toString()
                    : `${post.readingTime} ${translations.readingTime}`
            }
            tags={post.tags.slice(0, 2)}
            href={`/${post.lang}/blog/${post.slug}`}
            readMoreText={translations.readMore}
            isRtl={isRtl}
            className="w-full h-full"
        />
    )
}
