import { getAllPosts } from '@/lib/blog'

const BASE_URL = 'https://cloudtopia.net'

const FEED_META: Record<string, { title: string; description: string; language: string }> = {
    en: {
        title: 'CloudTopia Blog',
        description: 'Expert guides on web design, e-commerce, AI, and cloud infrastructure for Gulf and Arab market businesses.',
        language: 'en-US',
    },
    ar: {
        title: 'مدونة كلاود توبيا',
        description: 'أدلة متخصصة في تصميم المواقع والتجارة الإلكترونية والذكاء الاصطناعي والبنية السحابية للأعمال الخليجية والعربية.',
        language: 'ar-SA',
    },
    tr: {
        title: 'CloudTopia Blog',
        description: 'Körfez ve Arap pazarındaki işletmeler için web tasarım, e-ticaret, yapay zeka ve bulut altyapısı üzerine uzman rehberler.',
        language: 'tr-TR',
    },
}

// Escape XML entities so post titles/descriptions with `&`, `<`, `>`, quotes, etc. stay valid.
function xmlEscape(input: string): string {
    return input
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
}

export async function GET(
    _req: Request,
    { params }: { params: { locale: string } },
) {
    const lang = params.locale || 'en'
    const meta = FEED_META[lang] || FEED_META.en
    const posts = getAllPosts(lang).slice(0, 50)

    const feedUrl = `${BASE_URL}/${lang}/blog/feed.xml`
    const blogUrl = `${BASE_URL}/${lang}/blog`

    const items = posts
        .map((p) => {
            const postUrl = `${BASE_URL}/${lang}/blog/${encodeURIComponent(p.slug)}`
            const pubDate = new Date(p.updated || p.date).toUTCString()
            const categories = (p.tags || [])
                .map((tag) => `      <category>${xmlEscape(tag)}</category>`)
                .join('\n')
            const imageEnclosure = p.coverImage
                ? `      <enclosure url="${xmlEscape(p.coverImage)}" type="image/jpeg" />`
                : ''
            return `    <item>
      <title>${xmlEscape(p.title)}</title>
      <link>${xmlEscape(postUrl)}</link>
      <guid isPermaLink="true">${xmlEscape(postUrl)}</guid>
      <description>${xmlEscape(p.excerpt || '')}</description>
      <pubDate>${pubDate}</pubDate>
      <author>noreply@cloudtopia.net (${xmlEscape(p.author || 'CloudTopia')})</author>
${categories}
${imageEnclosure}
    </item>`
        })
        .join('\n')

    const lastBuildDate = posts.length
        ? new Date(posts[0].updated || posts[0].date).toUTCString()
        : new Date().toUTCString()

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"
  xmlns:atom="http://www.w3.org/2005/Atom"
  xmlns:content="http://purl.org/rss/1.0/modules/content/"
  xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${xmlEscape(meta.title)}</title>
    <link>${xmlEscape(blogUrl)}</link>
    <description>${xmlEscape(meta.description)}</description>
    <language>${meta.language}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${xmlEscape(feedUrl)}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`

    return new Response(body, {
        headers: {
            'Content-Type': 'application/rss+xml; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    })
}

// Statically prerender all three locale feeds at build time.
export async function generateStaticParams() {
    return [{ locale: 'en' }, { locale: 'ar' }, { locale: 'tr' }]
}
