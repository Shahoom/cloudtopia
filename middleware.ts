import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'ar']
const defaultLocale = 'en'

function getLocale(request: NextRequest): string {
    // Check for locale in cookie first
    const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value
    if (cookieLocale && locales.includes(cookieLocale)) {
        return cookieLocale
    }

    // Check Accept-Language header
    const acceptLanguage = request.headers.get('accept-language')
    if (acceptLanguage) {
        const preferredLocale = acceptLanguage
            .split(',')
            .map(lang => lang.split(';')[0].trim().substring(0, 2))
            .find(lang => locales.includes(lang))
        if (preferredLocale) {
            return preferredLocale
        }
    }

    return defaultLocale
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // Redirect www to non-www (permanent 301)
    const host = request.headers.get('host') || ''
    if (host.startsWith('www.')) {
        const url = request.nextUrl.clone()
        url.host = host.replace(/^www\./, '')
        return NextResponse.redirect(url, { status: 301 })
    }

    // Skip static files, API routes, and Vercel internal routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/images') ||
        pathname.startsWith('/_vercel') ||
        pathname.includes('.') // files with extensions
    ) {
        return NextResponse.next()
    }

    // Check if the pathname starts with a locale
    const pathnameHasLocale = locales.some(
        locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) {
        // Extract locale and set cookie + header, then pass through
        // With [locale] route segment, Next.js handles the routing natively
        const locale = pathname.split('/')[1]

        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('x-locale', locale)

        const response = NextResponse.next({
            request: { headers: requestHeaders }
        })
        response.cookies.set('NEXT_LOCALE', locale, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365
        })

        return response
    }

    // No locale in URL - redirect to include locale
    // Strip trailing slash on root to avoid /en/ → /en double redirect
    const locale = getLocale(request)
    const cleanPath = pathname === '/' ? '' : pathname
    const newUrl = new URL(`/${locale}${cleanPath}`, request.url)

    return NextResponse.redirect(newUrl, { status: 301 })
}

export const config = {
    matcher: [
        // Match all paths except static files and Vercel internals
        '/((?!_next/static|_next/image|_vercel|favicon.ico|favicon.svg|icon.svg|images|icon-|apple-touch|manifest).*)',
    ],
}
