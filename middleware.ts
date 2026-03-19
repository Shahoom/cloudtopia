import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'ar', 'tr']
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
    const host = request.headers.get('host') || ''

    const isWww = host.startsWith('www.')

    // Skip static files, API routes, and Vercel internal routes
    const isStatic =
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/images') ||
        pathname.startsWith('/_vercel') ||
        pathname.includes('.') // files with extensions

    if (isStatic) {
        if (isWww) {
            const url = request.nextUrl.clone()
            url.host = host.replace(/^www\./, '')
            return NextResponse.redirect(url, { status: 301 })
        }
        return NextResponse.next()
    }

    // Determine all necessary corrections in one pass
    let newHost = isWww ? host.replace(/^www\./, '') : host

    // Strip trailing slash (except for root "/")
    let newPathname = pathname.length > 1 && pathname.endsWith('/')
        ? pathname.slice(0, -1)
        : pathname

    // Check if the (possibly cleaned) pathname already has a locale prefix
    const hasLocale = locales.some(
        locale => newPathname.startsWith(`/${locale}/`) || newPathname === `/${locale}`
    )

    if (!hasLocale) {
        const locale = getLocale(request)
        const pathSuffix = newPathname === '/' ? '' : newPathname
        newPathname = `/${locale}${pathSuffix}`
    }

    // If anything changed, do a single 301 redirect
    if (isWww || newPathname !== pathname) {
        const url = request.nextUrl.clone()
        url.host = newHost
        url.pathname = newPathname
        return NextResponse.redirect(url, { status: 301 })
    }

    // URL is already canonical — set locale cookie and header, then pass through
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

export const config = {
    matcher: [
        // Match all paths except static files and Vercel internals
        '/((?!_next/static|_next/image|_vercel|favicon.ico|favicon.svg|icon.svg|images|icon-|apple-touch|manifest).*)',
    ],
}
