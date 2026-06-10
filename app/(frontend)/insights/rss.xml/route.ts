import { NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// The insights blog was renamed to Articles. This legacy feed now permanently
// redirects to the canonical English Articles feed so subscribers and crawlers
// follow the content to its new home.
export function GET(request: Request) {
  return NextResponse.redirect(new URL('/articles/rss.xml', request.url), 308)
}
