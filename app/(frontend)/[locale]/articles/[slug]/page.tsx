import type { Metadata } from 'next'
import { serializeJsonLd } from '@/components/seo/JsonLd'
import { notFound } from 'next/navigation'
import { ArticleContent } from '@/components/blog/ArticleContent'
import { ArticleHero } from '@/components/blog/ArticleHero'
import { FAQAccordion } from '@/components/blog/insights/FAQAccordion'
import { ReadingProgress } from '@/components/blog/ReadingProgress'
import { RelatedPosts } from '@/components/blog/RelatedPosts'
import { extractFAQSchemaItems } from '@/lib/blog/intelligence'
import { getArticleToc, getBlogPost, getPreviousNextPosts, getPublishedBlogPosts, getRelatedBlogPosts } from '@/lib/blog/data'
import { buildHreflangMap, canonicalUrl, stripBrandSuffix } from '@/lib/i18n/url'

type PageProps = {
  params: Promise<{ locale: string; slug: string }>
}

// Articles hold no per-request data — the only live value is `viewsCount`, and
// views are recorded client-side by ArticleViewBeacon, so the counter keeps
// working while the page itself is CDN-cached. ISR here instead of
// force-dynamic: each article is rendered once per hour at most rather than on
// every single request, and CMS saves bust it immediately via revalidateCmsTags.
// Keep in sync with CMS_REVALIDATE_SECONDS in lib/cms/cache-policy.ts (that file
// carries the rationale). Next requires this to be a literal, so it cannot
// import the constant; tests/cache-policy.test.ts asserts they match.
export const revalidate = 86400

// Without this, a dynamic segment can't be prerendered and Next falls back to
// rendering it per request — `revalidate` alone does not make it cacheable.
// Enumerating the published slugs per locale is what actually puts articles on
// the CDN. Unknown slugs still render on demand (dynamicParams defaults to true),
// so a post published between builds is not a 404.
export async function generateStaticParams({ params }: { params: { locale: string } }) {
  const posts = await getPublishedBlogPosts(params.locale)
  return posts.map((post) => ({ slug: post.slug }))
}

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

  // Hreflang hardening: only advertise the alternate-locale URL when a twin
  // post is actually published under the SAME slug in the other locale —
  // otherwise the alternate 404s. Single-locale posts advertise self +
  // x-default (pointing at self, the only URL that resolves).
  const otherLocale = locale === 'ar' ? 'en' : 'ar'
  const twinExists = (await getPublishedBlogPosts(otherLocale)).some((p) => p.slug === post.slug)
  const selfUrl = canonicalUrl(locale, `/articles/${post.slug}`)
  const languages = twinExists
    ? buildHreflangMap(`/articles/${post.slug}`)
    : { [locale]: selfUrl, 'x-default': selfUrl }

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
      // Page-level openGraph shallow-merges over the layout's, dropping its
      // og:locale — restate it here. Only claim an alternate locale when the
      // twin post actually exists.
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      ...(twinExists ? { alternateLocale: locale === 'ar' ? 'en_US' : 'ar_SA' } : {}),
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
      languages,
      types: {
        'application/rss+xml': [{ url: canonicalUrl(locale, '/articles/rss.xml'), title: 'CloudTopia Articles' }],
      },
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
  // Article/BlogPosting schema REQUIRES an image. When a post has neither an
  // OG nor a cover image, absoluteUrl() returns undefined and the post ships
  // with no image (silently ineligible for rich results). Fall back to a
  // guaranteed, absolute raster brand asset so `image` is never undefined.
  const image =
    absoluteUrl(post.seo.ogImage?.url || post.coverImage?.url) ||
    'https://cloudtopia.net/images/homepage/clouds.webp'
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
    // Only advertise wordCount once an article has real depth. Emitting
    // wordCount:75 on a post titled "Ultimate Guide" hands crawlers and answer
    // engines an unambiguous thin-content flag — worse than omitting it.
    ...(post.wordCount >= 600 ? { wordCount: post.wordCount } : {}),
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
        url: 'https://cloudtopia.net/images/cloudtopia-logo.png',
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
    <div className="min-h-screen">
      <ReadingProgress />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleSchema) }} />
      {post.seo.breadcrumbSchema !== false && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }} />
      )}
      {faqItems.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: serializeJsonLd({
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
