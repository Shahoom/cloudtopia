import { NextRequest, NextResponse } from 'next/server'
import { locales, type Locale } from '@/lib/i18n/config'
import { getSiteData } from '@/lib/cms/site-data'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const requestedLocale = searchParams.get('locale') || 'en'
  const locale = locales.includes(requestedLocale as Locale) ? (requestedLocale as Locale) : 'en'
  const slug = searchParams.get('slug') || '/'
  const data = await getSiteData(locale, slug)

  return NextResponse.json(data, {
    headers: {
      'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=300',
    },
  })
}
