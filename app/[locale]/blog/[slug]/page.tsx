import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPostSlugs, getAllPosts, getSlugById } from '@/lib/blog'
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
    // Decode slug in case it's in Arabic/Turkish
    const decodedSlug = decodeURIComponent(params.slug)
    const post = getPostBySlug(decodedSlug, lang)

    if (!post) {
        return { title: 'Post Not Found' }
    }

    const canonicalUrl = `${BASE_URL}/${lang}/blog/${params.slug}`
    const imageUrl = post.coverImage
        ? `${BASE_URL}${post.coverImage}`
        : `${BASE_URL}/images/og-image.jpg`

    // Generate alternate links for all languages
    const alternateLanguages: Record<string, string> = {}
    const locales = ['en', 'ar', 'tr']

    locales.forEach(loc => {
        const localSlug = getSlugById(post.id, loc)
        if (localSlug) {
            alternateLanguages[loc] = `${BASE_URL}/${loc}/blog/${encodeURIComponent(localSlug)}`
        }
    })

    // Add x-default
    const enSlug = getSlugById(post.id, 'en')
    if (enSlug) {
        alternateLanguages['x-default'] = `${BASE_URL}/en/blog/${encodeURIComponent(enSlug)}`
    }

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
            languages: alternateLanguages,
        },
    }
}

export async function generateStaticParams() {
    const locales = ['en', 'ar', 'tr']
    const staticParams: { slug: string; locale: string }[] = []

    locales.forEach(locale => {
        const slugs = getPostSlugs(locale)
        slugs.forEach(slug => {
            // Encode slug for static params to safe-guard against special characters
            staticParams.push({ slug: encodeURIComponent(slug), locale })
        })
    })

    return staticParams
}

export default async function PostPage({ params }: PostPageProps) {
    const lang = params.locale || 'en'
    const decodedSlug = decodeURIComponent(params.slug)
    const post = getPostBySlug(decodedSlug, lang)

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

    // Generate alternate slugs for the language switcher
    const locales = ['en', 'ar', 'tr']
    const alternateSlugs: Record<string, string> = {}
    locales.forEach((loc: string) => {
        const localSlug = getSlugById(post.id, loc)
        if (localSlug) {
            alternateSlugs[loc] = localSlug
        }
    })

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
                alternateSlugs={alternateSlugs}
            >
                <BlogPostBody content={post.content} />
            </BlogPostLayout>
        </>
    )
}
