import { buildInsightsRss } from '@/lib/blog/rss'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET() {
  return new Response(await buildInsightsRss('en'), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
