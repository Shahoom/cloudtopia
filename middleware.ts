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

    // Skip static files and API routes
    if (
        pathname.startsWith('/_next') ||
        pathname.startsWith('/api') ||
        pathname.startsWith('/images') ||
        pathname.includes('.') // files with extensions
    ) {
        return NextResponse.next()
    }

    // Check if the pathname starts with a locale
    const pathnameHasLocale = locales.some(
        locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
    )

    if (pathnameHasLocale) {
        // Extract the locale from the pathname
        const locale = pathname.split('/')[1]

        // Set the locale cookie for persistence
        const response = NextResponse.next()
        response.cookies.set('NEXT_LOCALE', locale, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365 // 1 year
        })

        // Rewrite to the actual page (without locale prefix)
        const newPathname = pathname.replace(`/${locale}`, '') || '/'
        const newUrl = new URL(newPathname, request.url)

        // Pass the locale as a header so the app can read it
        const rewriteResponse = NextResponse.rewrite(newUrl)
        rewriteResponse.cookies.set('NEXT_LOCALE', locale, {
            path: '/',
            maxAge: 60 * 60 * 24 * 365
        })
        rewriteResponse.headers.set('x-locale', locale)

        return rewriteResponse
    }

    // No locale in URL - redirect to include locale
    const locale = getLocale(request)
    const newUrl = new URL(`/${locale}${pathname}`, request.url)

    return NextResponse.redirect(newUrl)
}

export const config = {
    matcher: [
        // Match all paths except static files
        '/((?!_next/static|_next/image|favicon.ico|images|icon-|apple-touch|manifest).*)',
    ],
}
