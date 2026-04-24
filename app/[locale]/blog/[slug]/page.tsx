import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPostBySlug, getPostSlugs, getAllPosts, getSlugById } from '@/lib/blog'
import { getAuthor } from '@/lib/authors'
import { getDictionary } from '@/lib/i18n'
import type { Locale } from '@/lib/i18n/config'
import BlogPostLayout from '@/components/blog/BlogPostLayout'
import BlogPostBody from '@/components/blog/BlogPostBody'
import BlogBreadcrumb from '@/components/blog/BlogBreadcrumb'

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

    const wordCount = (post.content || '').trim().split(/\s+/).length
    const authorSlug = post.authorSlug || 'editorial-team'
    const authorProfile = getAuthor(authorSlug)
    const authorName = authorProfile?.name || post.author || 'CloudTopia Editorial Team'
    const authorUrl = authorProfile
        ? `${BASE_URL}/${lang}/authors/${authorProfile.slug}`
        : `${BASE_URL}/${lang}/about`
    const publishedDate = post.date
    const modifiedDate = post.updated || post.date

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${canonicalUrl}#article`,
        headline: post.title,
        description: post.excerpt,
        datePublished: publishedDate,
        dateModified: modifiedDate,
        author: {
            '@type': 'Person',
            name: authorName,
            url: authorUrl,
            ...(authorProfile?.image && {
                image: `${BASE_URL}${authorProfile.image}`,
            }),
            ...(authorProfile?.knowsAbout && { knowsAbout: authorProfile.knowsAbout }),
            ...(authorProfile?.sameAs && { sameAs: authorProfile.sameAs }),
            worksFor: {
                '@type': 'Organization',
                name: 'CloudTopia',
                url: BASE_URL,
            },
        },
        publisher: {
            '@type': 'Organization',
            name: 'CloudTopia',
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
        mainEntityOfPage: canonicalUrl,
        inLanguage: inLanguage[lang] || 'en',
        keywords: (post.tags || []).join(', '),
        articleSection: post.category || post.tags?.[0] || 'Technology',
        wordCount,
        timeRequired: post.readingTime ? `PT${post.readingTime}M` : undefined,
        isPartOf: {
            '@type': 'Blog',
            name: 'CloudTopia Journal',
            url: `${BASE_URL}/${lang}/blog`,
        },
        about: (post.tags || []).slice(0, 5).map((tag) => ({ '@type': 'Thing', name: tag })),
    }

    // BreadcrumbList schema
    const breadcrumbLabels: Record<string, { home: string; blog: string }> = {
        en: { home: 'Home', blog: 'Blog' },
        ar: { home: 'الرئيسية', blog: 'المدونة' },
        tr: { home: 'Ana Sayfa', blog: 'Blog' },
    }
    const crumbs = breadcrumbLabels[lang] || breadcrumbLabels.en
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            { '@type': 'ListItem', position: 1, name: crumbs.home, item: `${BASE_URL}/${lang}` },
            { '@type': 'ListItem', position: 2, name: crumbs.blog, item: `${BASE_URL}/${lang}/blog` },
            { '@type': 'ListItem', position: 3, name: post.title, item: canonicalUrl },
        ],
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
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <div className="max-w-4xl mx-auto px-4 pt-28 md:pt-32">
                <BlogBreadcrumb
                    locale={lang}
                    items={[
                        { label: crumbs.home, href: `/${lang}` },
                        { label: crumbs.blog, href: `/${lang}/blog` },
                        { label: post.title },
                    ]}
                />
            </div>
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
                <BlogPostBody content={post.content} locale={lang} />
            </BlogPostLayout>
        </>
    )
}
