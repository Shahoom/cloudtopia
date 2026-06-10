import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { ArticleContent } from '@/components/blog/ArticleContent'
import { ArticleHero } from '@/components/blog/ArticleHero'
import { FAQAccordion } from '@/components/blog/insights/FAQAccordion'
import { ReadingProgress } from '@/components/blog/ReadingProgress'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { extractFAQSchemaItems } from '@/lib/blog/intelligence'
import { getArticleToc, getBlogPost, getPreviousNextPosts, getRelatedBlogPosts } from '@/lib/blog/data'
import { buildHreflangMap, canonicalUrl, stripBrandSuffix } from '@/lib/i18n/url'

type PageProps = {
  params: Promise<{ locale: string; slug: string }>
}

export const dynamic = 'force-dynamic'

function absoluteUrl(url?: string | null) {
  if (!url) return undefined
  return url.startsWith('http') ? url : canonicalUrl('en', url)
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale = 'en', slug } = await params
  const post = await getBlogPost(locale, slug)
  if (!post) return { title: locale === 'ar' ? 'المقال غير موجود' : 'Article Not Found' }

  const title = post.seo.metaTitle || post.title
  // CMS seo_meta_title already ends with "| CloudTopia"; the [locale]/layout
  // `%s | <brand>` template would then add a second suffix. Strip it for the
  // document <title> ONLY — og:title/twitter:title keep `title` with their
  // single (correct) brand, so social cards are unchanged.
  const documentTitle = stripBrandSuffix(title)
  const description = post.seo.metaDescription || post.excerpt
  const canonical = post.seo.canonicalUrl || canonicalUrl(locale, `/articles/${post.slug}`)
  const ogImage = absoluteUrl(post.seo.ogImage?.url || post.coverImage?.url)
  const twitterImage = absoluteUrl(post.seo.twitterImage?.url || post.seo.ogImage?.url || post.coverImage?.url)

  return {
    title: documentTitle,
    description,
    keywords: post.seo.keywords,
    robots: post.seo.noIndex || post.seo.noFollow ? { index: !post.seo.noIndex, follow: !post.seo.noFollow } : undefined,
    openGraph: {
      title: post.seo.ogTitle || title,
      description: post.seo.ogDescription || description,
      url: canonical,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: post.author?.name ? [post.author.name] : ['CloudTopia'],
      section: post.category?.name,
      tags: post.tags.map((tag) => tag.name),
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: post.coverImage?.alt || post.title }] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo.twitterTitle || title,
      description: post.seo.twitterDescription || description,
      images: twitterImage ? [twitterImage] : undefined,
    },
    alternates: {
      canonical,
      languages: buildHreflangMap(`/articles/${post.slug}`),
    },
  }
}

export default async function ArticleDetailPage({ params }: PageProps) {
  const { locale = 'en', slug } = await params
  const post = await getBlogPost(locale, slug)
  if (!post) notFound()

  const toc = getArticleToc(post)
  const canonical = post.seo.canonicalUrl || canonicalUrl(locale, `/articles/${post.slug}`)
  const relatedPosts = await getRelatedBlogPosts(post)
  const previousNext = await getPreviousNextPosts(post)
  const image = absoluteUrl(post.seo.ogImage?.url || post.coverImage?.url)
  const faqItems = post.seo.faqSchema ? extractFAQSchemaItems(post.contentBlocks) : []

  // SD-2: a real Person author references the #person @id on the canonical
  // /articles/author/<slug> route; the editorial team stays an Organization.
  const authorProfileUrl = post.author?.slug ? canonicalUrl(locale, `/articles/author/${post.author.slug}`) : undefined
  const isPersonAuthor = Boolean(post.author?.slug) && post.author?.slug !== 'editorial-team'

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': post.seo.structuredDataType || 'BlogPosting',
    '@id': `${canonical}#article`,
    headline: post.title,
    description: post.excerpt,
    image,
    inLanguage: locale === 'ar' ? 'ar-SA' : 'en-US',
    ...(post.wordCount > 0 ? { wordCount: post.wordCount } : {}),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: isPersonAuthor
      ? {
          '@type': 'Person',
          '@id': `${authorProfileUrl}#person`,
          name: post.author!.name,
          url: authorProfileUrl,
        }
      : {
          '@type': 'Organization',
          '@id': 'https://cloudtopia.net/#organization',
          name: post.author?.name || 'CloudTopia',
          url: authorProfileUrl || canonicalUrl(locale, '/'),
        },
    publisher: {
      '@type': 'Organization',
      '@id': 'https://cloudtopia.net/#organization',
      name: 'CloudTopia',
      url: 'https://cloudtopia.net',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cloudtopia.net/images/CloudTopia.svg',
      },
    },
    mainEntityOfPage: canonical,
    articleSection: post.category?.name,
    keywords: post.tags.map((tag) => tag.name).join(', '),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'ar' ? 'الرئيسية' : 'Home', item: canonicalUrl(locale, '/') },
      { '@type': 'ListItem', position: 2, name: locale === 'ar' ? 'المقالات' : 'Articles', item: canonicalUrl(locale, '/articles') },
      { '@type': 'ListItem', position: 3, name: post.title, item: canonical },
    ],
  }

  return (
    <div className="min-h-screen bg-[#f4f1f8]">
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      {post.seo.breadcrumbSchema !== false && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      )}
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqItems.map((item) => ({
                '@type': 'Question',
                name: item.question,
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: item.answer,
                },
              })),
            }),
          }}
        />
      )}
      <ArticleHero post={post} locale={locale} />
      <ArticleContent
        post={post}
        locale={locale}
        toc={toc}
        canonical={canonical}
        relatedPosts={relatedPosts}
        previous={previousNext.previous}
        next={previousNext.next}
      />
      {faqItems.length > 0 && <FAQAccordion items={faqItems} locale={locale} />}
      <RelatedPosts posts={relatedPosts} locale={locale} />
    </div>
  )
}
