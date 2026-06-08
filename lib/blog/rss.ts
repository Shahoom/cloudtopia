import { getPublishedBlogPosts } from './data'
import { canonicalUrl } from '@/lib/i18n/url'

function escapeXml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function buildInsightsRss(locale = 'en') {
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
