import { notFound } from 'next/navigation'
import { getPublishedBlogPosts } from './data'
import { canonicalUrl } from '@/lib/i18n/url'

const SUPPORTED_LOCALES = ['en', 'ar'] as const
type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

function isSupportedLocale(value: string): value is SupportedLocale {
  return (SUPPORTED_LOCALES as readonly string[]).includes(value)
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function buildInsightsRss(locale = 'en') {
  // Guard the enum-typed locale column: an unexpected value (e.g. 'feed.xml')
  // would hit `where p.locale = $1` against a Postgres enum and throw a
  // (swallowed) error, serving an empty feed. Reject anything that is not a
  // real locale with a 404 instead of leaking an empty/erroring feed.
  if (!isSupportedLocale(locale)) {
    notFound()
  }

  const posts = await getPublishedBlogPosts(locale)

  const items = posts
    .slice(0, 30)
    .map((post) => {
      const url = canonicalUrl(locale, `/articles/${post.slug}`)
      return `<item>
  <title>${escapeXml(post.title)}</title>
  <link>${escapeXml(url)}</link>
  <guid>${escapeXml(url)}</guid>
  <description>${escapeXml(post.excerpt)}</description>
  <pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate>
  ${post.category?.name ? `<category>${escapeXml(post.category.name)}</category>` : ''}
</item>`
    })
    .join('\n')

  return `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
<channel>
  <title>CloudTopia Articles</title>
  <link>${escapeXml(canonicalUrl(locale, '/articles'))}</link>
  <description>Ideas, guides, and strategies for websites, systems, AI, and cloud technology.</description>
  <language>${locale}</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
${items}
</channel>
</rss>`
}
