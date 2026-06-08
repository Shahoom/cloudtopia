import { NextRequest, NextResponse } from 'next/server'

const GCC_COUNTRY_CODES = new Set(['OM', 'SA', 'AE', 'QA', 'KW', 'BH'])

const WHATSAPP_NUMBERS = {
  gcc: '96895886393',
  global: '905011511116',
} as const

const GEO_HEADER_KEYS = [
  'x-vercel-ip-country',
  'cf-ipcountry',
  'cloudfront-viewer-country',
  'x-country-code',
  'x-geo-country',
  'x-appengine-country',
]

export const dynamic = 'force-dynamic'

function getVisitorCountry(request: NextRequest) {
  for (const key of GEO_HEADER_KEYS) {
    const value = request.headers.get(key)?.split(',')[0]?.trim().toUpperCase()
    if (value && value !== 'XX' && value !== 'UNKNOWN') return value
  }

  return null
}

function getWhatsAppMessage(locale: string | null) {
  if (locale === 'ar') {
    return 'مرحباً CloudTopia، أريد استشارة مجانية لمشروع برمجي أو سحابي أو ذكاء اصطناعي.'
  }

  return 'Hello CloudTopia, I want a free consultation for a software, cloud, or AI project.'
}

export function GET(request: NextRequest) {
  const country = getVisitorCountry(request)
  const isGccVisitor = country ? GCC_COUNTRY_CODES.has(country) : false
  const number = isGccVisitor ? WHATSAPP_NUMBERS.gcc : WHATSAPP_NUMBERS.global
  const locale = request.nextUrl.searchParams.get('locale')

  const whatsappUrl = new URL(`https://wa.me/${number}`)
  whatsappUrl.searchParams.set('text', getWhatsAppMessage(locale))

  const response = NextResponse.redirect(whatsappUrl, 307)
  response.headers.set('Cache-Control', 'no-store, max-age=0')
  return response
}
