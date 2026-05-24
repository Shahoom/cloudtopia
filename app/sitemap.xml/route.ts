/**
 * Custom sitemap.xml route handler.
 *
 * Replaces Next.js's auto-generated sitemap (app/sitemap.ts) so we can:
 *   1. Emit <image:image> entries (Google Image discovery)
 *   2. Add the xmlns:image and xmlns:xhtml namespaces
 *   3. Reference an XSL stylesheet for human-readable rendering
 *
 * Sitemap data still comes from app/sitemap.ts (kept as the source of truth);
 * this route just re-encodes it into a richer XML format.
 */

import { buildSitemapEntriesFromCMS } from '@/lib/sitemap-data'

const BASE_URL = 'https://cloudtopia.net'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function escape(s: string): string {
    return s
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;')
}

export async function GET() {
    const entries = await buildSitemapEntriesFromCMS()

    const urls = entries
        .map((entry) => {
            const e = entry as typeof entry & {
                images?: string[]
                alternates?: { languages?: Record<string, string> }
            }
            const loc = escape(e.url)
            const lastmod = e.lastModified
                ? `\n    <lastmod>${
                      e.lastModified instanceof Date
                          ? e.lastModified.toISOString()
                          : new Date(e.lastModified).toISOString()
                  }</lastmod>`
                : ''
            const changefreq = e.changeFrequency
                ? `\n    <changefreq>${e.changeFrequency}</changefreq>`
                : ''
            const priority =
                typeof e.priority === 'number' ? `\n    <priority>${e.priority}</priority>` : ''

            // hreflang alternates
            let alternates = ''
            const langs = e.alternates?.languages
            if (langs) {
                alternates = Object.entries(langs)
                    .filter(([, href]) => typeof href === 'string')
                    .map(
                        ([lang, href]) =>
                            `\n    <xhtml:link rel="alternate" hreflang="${escape(
                                lang,
                            )}" href="${escape(href as string)}" />`,
                    )
                    .join('')
            }

            // Image sitemap extension — surfaces blog covers in Google Images
            // and improves overall discoverability.
            let images = ''
            if (Array.isArray(e.images)) {
                images = e.images
                    .filter((u): u is string => typeof u === 'string' && u.length > 0)
                    .map((u) => `\n    <image:image>\n      <image:loc>${escape(u)}</image:loc>\n    </image:image>`)
                    .join('')
            }

            return `  <url>
    <loc>${loc}</loc>${alternates}${lastmod}${changefreq}${priority}${images}
  </url>`
        })
        .join('\n')

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`

    return new Response(body, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
            'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
        },
    })
}
