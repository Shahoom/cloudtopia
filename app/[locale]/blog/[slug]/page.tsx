import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPostSlugs, getAllPosts } from '@/lib/blog'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'
import BlogPostLayout from '@/components/blog/BlogPostLayout'
import BlogPostBody from '@/components/blog/BlogPostBody'

const BASE_URL = 'https://cloudtopia.net'

const OG_LOCALES: Record<string, string> = {
    en: 'en_US',
    ar: 'ar_AE',
    tr: 'tr_TR',
}

interface PostPageProps {
    params: { slug: string; locale: string }
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
    const lang = params.locale || 'en'
    const post = getPostBySlug(params.slug, lang)

    if (!post) {
        return { title: 'Post Not Found' }
    }

    const canonicalUrl = `${BASE_URL}/${lang}/blog/${params.slug}`
    const imageUrl = post.coverImage
        ? `${BASE_URL}${post.coverImage}`
        : `${BASE_URL}/images/og-image.jpg`

    return {
        title: post.title,
        description: post.excerpt,
        robots: {
            index: true,
            follow: true,
        },
        openGraph: {
            type: 'article',
            title: post.title,
            description: post.excerpt,
            url: canonicalUrl,
            siteName: 'Cloudtopia',
            locale: OG_LOCALES[lang] || 'en_US',
            images: [
                {
                    url: imageUrl,
                    width: 1200,
                    height: 630,
                    alt: post.title,
                },
            ],
            publishedTime: post.date,
            authors: [`${BASE_URL}`],
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: [imageUrl],
        },
        alternates: {
            canonical: canonicalUrl,
            languages: {
                en: `${BASE_URL}/en/blog/${params.slug}`,
                ar: `${BASE_URL}/ar/blog/${params.slug}`,
                tr: `${BASE_URL}/tr/blog/${params.slug}`,
                'x-default': `${BASE_URL}/en/blog/${params.slug}`,
            },
        },
    }
}

export async function generateStaticParams() {
    const slugs = getPostSlugs()
    const locales = ['en', 'ar', 'tr']
    const staticParams: { slug: string; locale: string }[] = []

    slugs.forEach(slug => {
        locales.forEach(locale => {
            staticParams.push({ slug, locale })
        })
    })

    return staticParams
}

export default async function PostPage({ params }: PostPageProps) {
    const lang = params.locale || 'en'
    const post = getPostBySlug(params.slug, lang)

    if (!post) {
        notFound()
    }

    const allPosts = getAllPosts(lang)
    const morePosts = allPosts.filter(p => p.slug !== post.slug)

    const dict = await getDictionary(lang as Locale)

    const canonicalUrl = `${BASE_URL}/${lang}/blog/${params.slug}`
    const imageUrl = post.coverImage
        ? `${BASE_URL}${post.coverImage}`
        : `${BASE_URL}/images/og-image.jpg`

    const inLanguage: Record<string, string> = { en: 'en', ar: 'ar', tr: 'tr' }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        datePublished: post.date,
        dateModified: post.date,
        author: {
            '@type': 'Organization',
            name: 'Cloudtopia',
            url: BASE_URL,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Cloudtopia',
            url: BASE_URL,
            logo: {
                '@type': 'ImageObject',
                url: `${BASE_URL}/images/CloudTopia.svg`,
            },
        },
        image: {
            '@type': 'ImageObject',
            url: imageUrl,
            width: 1200,
            height: 630,
        },
        url: canonicalUrl,
        inLanguage: inLanguage[lang] || 'en',
        isPartOf: {
            '@type': 'Blog',
            name: 'Cloudtopia Blog',
            url: `${BASE_URL}/${lang}/blog`,
        },
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BlogPostLayout
                post={post}
                morePosts={morePosts}
                translations={{
                    readingTime: dict.blog.readingTime,
                    publishedOn: dict.blog.publishedOn,
                    backToBlog: dict.blog.backToBlog,
                    tableOfContents: dict.blog.tableOfContents,
                    moreArticles: dict.blog.moreArticles,
                    tags: dict.blog.tags,
                    sharePost: dict.blog.sharePost,
                    readInAnotherLanguage: dict.blog.readInAnotherLanguage,
                    readMore: dict.blog.readMore,
                    onThisPage: dict.blog.onThisPage,
                }}
            >
                <BlogPostBody content={post.content} />
            </BlogPostLayout>
        </>
    )
}
