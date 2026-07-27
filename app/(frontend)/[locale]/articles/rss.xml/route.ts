import { buildInsightsRss } from '@/lib/blog/rss'

export const runtime = 'nodejs'
// Matches the s-maxage below: the feed is regenerated hourly instead of on every
// reader/crawler poll, so a poll costs a CDN hit rather than a function boot.
export const revalidate = 3600

export async function GET(_: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale = 'en' } = await params

  return new Response(await buildInsightsRss(locale), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
