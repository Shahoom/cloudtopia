import { buildInsightsRss } from '@/lib/blog/rss'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(_: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale = 'en' } = await params

  return new Response(await buildInsightsRss(locale), {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}
