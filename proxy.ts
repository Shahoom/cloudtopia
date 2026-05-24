import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'ar', 'tr'] as const
type Locale = (typeof locales)[number]
const defaultLocale: Locale = 'en'

/**
 * Locale architecture: English is unprefixed-canonical.
 *   /            → English (rewritten internally to /en)
 *   /projects    → English (rewritten internally to /en/projects)
 *   /ar/projects → Arabic (passes through to app/[locale]/projects with locale='ar')
 *   /tr/projects → Turkish
 *   /en/projects → 301 redirect to /projects  (migration of old indexed URLs)
 *
 * Invariants:
 *   - At most ONE 301 hop per request. www-strip + trailing-slash strip
 *     + locale-strip are all collapsed into a single Location header so
 *     Google never sees "Page with redirect" chains (see commit 507d968).
 *   - Unprefixed paths are ALWAYS English. Accept-Language sniffing is
 *     deliberately removed; Google was treating the auto-redirect at `/`
 *     as a soft canonical-confusion signal.
 */

function isStaticPath(pathname: string): boolean {
    return (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/admin') ||
        pathname.startsWith('/uploads') ||
        pathname.startsWith('/images') ||
        pathname.startsWith('/_vercel') ||
        pathname.includes('.')
    )
}

export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const host = request.headers.get('host') || ''
    const isWww = host.startsWith('www.')
    const apexHost = isWww ? host.replace(/^www\./, '') : host

    // (A) Static assets, API routes, Vercel internals — strip www only.
    if (isStaticPath(pathname)) {
        if (isWww) {
            const url = request.nextUrl.clone()
            url.host = apexHost
            return NextResponse.redirect(url, { status: 301 })
        }
        return NextResponse.next()
    }

    // Strip trailing slash on non-root paths.
    const cleanPath =
        pathname.length > 1 && pathname.endsWith('/')
            ? pathname.slice(0, -1)
            : pathname

    const seg1 = cleanPath.split('/')[1] // '', 'en', 'ar', 'tr', or something else
    const isEnPrefixed = seg1 === 'en'
    const isNonEnLocale = seg1 === 'ar' || seg1 === 'tr'

    // (D) /en/... — migrate to clean URL. Single 301 combining www-strip,
    // trailing-slash-strip, and locale-strip into one hop.
    if (isEnPrefixed) {
        const stripped = cleanPath === '/en' ? '/' : cleanPath.slice(3)
        const url = request.nextUrl.clone()
        url.host = apexHost
        url.pathname = stripped
        return NextResponse.redirect(url, { status: 301 })
    }

    // (E) /ar/... or /tr/... — pass through. Redirect first if we need
    // to fix www or trailing slash; otherwise serve as-is with x-locale
    // header + NEXT_LOCALE cookie.
    if (isNonEnLocale) {
        if (isWww || cleanPath !== pathname) {
            const url = request.nextUrl.clone()
            url.host = apexHost
            url.pathname = cleanPath
            return NextResponse.redirect(url, { status: 301 })
        }
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('x-locale', seg1)
        const response = NextResponse.next({ request: { headers: requestHeaders } })
        response.cookies.set('NEXT_LOCALE', seg1, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365,
        })
        return response
    }

    // (F) Unprefixed path — English. Redirect first if we need to fix www
    // or trailing slash; otherwise REWRITE (internal, URL bar unchanged)
    // to /en/<path> so app/[locale]/... resolves with params.locale='en'.
    if (isWww || cleanPath !== pathname) {
        const url = request.nextUrl.clone()
        url.host = apexHost
        url.pathname = cleanPath
        return NextResponse.redirect(url, { status: 301 })
    }

    const rewriteTarget = cleanPath === '/' ? '/en' : `/en${cleanPath}`
    const url = request.nextUrl.clone()
    url.pathname = rewriteTarget

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('x-locale', defaultLocale)

    const response = NextResponse.rewrite(url, {
        request: { headers: requestHeaders },
    })
    response.cookies.set('NEXT_LOCALE', defaultLocale, {
        path: '/',
        maxAge: 60 * 60 * 24 * 365,
    })
    return response
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|_vercel|favicon.ico|favicon.svg|icon.svg|images|icon-|apple-touch|manifest).*)',
    ],
}
