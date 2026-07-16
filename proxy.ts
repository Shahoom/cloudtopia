import { NextRequest, NextResponse } from 'next/server'
import { getCountryRedirect } from '@/lib/seo/country-redirects'

const locales = ['en', 'ar'] as const
type Locale = (typeof locales)[number]
const defaultLocale: Locale = 'en'

/**
 * Locale architecture: English is unprefixed-canonical.
 *   /            → English (rewritten internally to /en)
 *   /projects    → English (rewritten internally to /en/projects)
 *   /ar/projects → Arabic (passes through to app/[locale]/projects with locale='ar')
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

/**
 * Path prefixes that are framework internals, the API, the CMS admin, or
 * static upload/asset directories. These never participate in locale routing.
 */
const STATIC_PREFIXES = [
    '/_next',
    '/_vercel',
    '/api',
    '/admin',
    '/uploads',
    '/images',
    '/icons',
    '/logos',
    '/og',
    '/fonts',
    // Agent-discovery well-known endpoints (RFC 9727 api-catalog, MCP server
    // card, agent-skills index, etc.). Must bypass locale routing — including
    // the extensionless `/.well-known/api-catalog` — so they resolve to their
    // route handlers / static files instead of being rewritten to `/en/...`.
    '/.well-known',
] as const

/**
 * Exact top-level paths that resolve to a real app route OR a public/ file but
 * carry an extension that ALSO belongs to a locale-prefixed app route. These
 * must pass straight through (NOT be locale-rewritten) and so are allow-listed
 * by exact match rather than by extension.
 *
 * NOTE: `.xml` is deliberately kept OUT of STATIC_EXTENSIONS because it is
 * ambiguous — `/sitemap.xml` is a top-level app route (must pass through),
 * while `/articles/rss.xml` is a `[locale]` app route (MUST be locale-
 * rewritten). Listing `/sitemap.xml` here lets it through while `rss.xml`
 * still flows into the locale logic below.
 */
const STATIC_EXACT_PATHS = new Set<string>([
    '/sitemap.xml',
    '/favicon.ico',
    '/favicon.svg',
    '/icon.svg',
    '/manifest.json',
    '/robots.txt',
    '/llms.txt',
    '/sitemap.xsl',
])

/**
 * Real static-asset extensions served from public/. EXCLUDES `.xml` (see
 * STATIC_EXACT_PATHS) so that app-route feeds under `[locale]` are not
 * mistaken for static files. A path ending in one of these is always a static
 * asset and never an app route, so it is safe to short-circuit.
 */
const STATIC_EXTENSIONS = [
    '.ico',
    '.svg',
    '.png',
    '.jpg',
    '.jpeg',
    '.gif',
    '.webp',
    '.avif',
    '.ttf',
    '.woff',
    '.woff2',
    '.txt',
    '.md',
    '.json',
    '.xsl',
    '.css',
    '.js',
    '.map',
    '.webmanifest',
] as const

function hasStaticExtension(pathname: string): boolean {
    const lower = pathname.toLowerCase()
    return STATIC_EXTENSIONS.some((ext) => lower.endsWith(ext))
}

function isStaticPath(pathname: string): boolean {
    if (STATIC_PREFIXES.some((prefix) => pathname.startsWith(prefix))) {
        return true
    }
    if (STATIC_EXACT_PATHS.has(pathname)) {
        return true
    }
    return hasStaticExtension(pathname)
}

export function proxy(request: NextRequest) {
    const pathname = request.nextUrl.pathname
    const requestLocale = request.headers.get('x-locale')
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

    // (A.5) Markdown for Agents — content negotiation. When a caller explicitly
    // asks for markdown we serve a markdown view of the page instead of HTML.
    // Real browsers never send `Accept: text/markdown`, so HTML remains the
    // default for humans. Static assets / API / admin already returned above.
    const accept = request.headers.get('accept') || ''
    if (accept.toLowerCase().includes('text/markdown')) {
        const url = request.nextUrl.clone()
        url.pathname = '/api/markdown'
        url.search = ''
        const requestHeaders = new Headers(request.headers)
        requestHeaders.set('x-md-path', pathname)
        return NextResponse.rewrite(url, { request: { headers: requestHeaders } })
    }

    // Strip trailing slash on non-root paths.
    const cleanPath =
        pathname.length > 1 && pathname.endsWith('/')
            ? pathname.slice(0, -1)
            : pathname

    // Pages relocated UNDER /services/ — single 301 to the new canonical URL,
    // any locale. The older renamed slugs (/website-design, /ecommerce-solutions)
    // point DIRECTLY at the final /services/ URL so an old indexed URL is never
    // sent through a redirect chain (Google's "Page with redirect" trap). Keys
    // are locale-agnostic base paths; the /en and /ar prefixes are handled below.
    const RELOCATED_UNDER_SERVICES: Record<string, string> = {
        '/website-design': '/services/website-development',
        '/website-development': '/services/website-development',
        '/ecommerce-solutions': '/services/ecommerce-development',
        '/ecommerce-development': '/services/ecommerce-development',
        '/social-media-marketing': '/services/social-media-marketing',
        '/content-creation': '/services/content-creation',
        '/business-systems-development': '/services/business-systems-development',
    }
    {
        const m = cleanPath.match(/^\/(en|ar)(\/.*)?$/)
        const locPrefix = m ? m[1] : null
        const basePath = m ? (m[2] || '/') : cleanPath
        const dest = RELOCATED_UNDER_SERVICES[basePath]
        if (dest) {
            const url = request.nextUrl.clone()
            url.host = apexHost
            // Arabic keeps its /ar prefix; /en and unprefixed both resolve to the
            // clean (unprefixed) English URL.
            url.pathname = locPrefix === 'ar' ? `/ar${dest}` : dest
            return NextResponse.redirect(url, { status: 301 })
        }
    }

    // Website-family duplicate service URLs are absorbed into the richer
    // Digital Presence pillars. Keep them redirect-only so crawlers see one
    // canonical home per website/e-commerce intent.
    const WEBSITE_FAMILY_ORPHAN_REDIRECTS: Record<string, string> = {
        'website-redesign': '/services/website-development',
        'corporate-website-design': '/services/website-development',
        'landing-page-design': '/services/website-development',
        'portfolio-websites': '/services/website-development',
        'educational-website-development': '/services/website-development',
        'restaurant-website-development': '/services/website-development',
        'website-maintenance': '/services/website-development',
        'ecommerce-website-development': '/services/ecommerce-development',
    }
    {
        const orphan = cleanPath.match(/^(?:\/(en|ar))?\/services\/([a-z0-9-]+)$/)
        const dest = orphan ? WEBSITE_FAMILY_ORPHAN_REDIRECTS[orphan[2]] : null
        if (orphan && dest) {
            const url = request.nextUrl.clone()
            url.host = apexHost
            url.pathname = orphan[1] === 'ar' ? `/ar${dest}` : dest
            return NextResponse.redirect(url, { status: 301 })
        }
    }


    // Web Applications pillars are NESTED at /services/web-applications/<pillar>;
    // the bare /web-applications hub is a real page and stays put. Old
    // /web-applications/<pillar> URLs go straight to the nested pillar (one hop),
    // and the legacy flat duplicate pages 301 to their canonical nested pillar.
    const WEB_APP_PILLARS = [
        'custom-saas-mvp-development', 'full-stack-web-engineering', 'interactive-portals-dashboards',
        'application-modernization-performance', 'media-entertainment-streaming',
    ]
    const WEBAPP_ORPHAN_REDIRECTS: Record<string, string> = {
        'custom-web-application-development': 'full-stack-web-engineering',
        'progressive-web-app-development': 'full-stack-web-engineering',
        'client-portals': 'interactive-portals-dashboards',
        'admin-dashboards': 'interactive-portals-dashboards',
        'booking-platforms': 'interactive-portals-dashboards',
        'internal-business-tools': 'interactive-portals-dashboards',
        'saas-mvp-development': 'custom-saas-mvp-development',
    }
    {
        const bareHub = cleanPath.match(/^(?:\/(en|ar))?\/web-applications$/)
        if (bareHub) {
            const url = request.nextUrl.clone()
            url.host = apexHost
            url.pathname = bareHub[1] === 'ar' ? '/ar/services/web-applications' : '/services/web-applications'
            return NextResponse.redirect(url, { status: 301 })
        }
        const m = cleanPath.match(/^(?:\/(en|ar))?\/web-applications\/([^/]+)$/)
        if (m) {
            const url = request.nextUrl.clone()
            url.host = apexHost
            const dest = WEB_APP_PILLARS.includes(m[2]) ? `/services/web-applications/${m[2]}` : `/services/${m[2]}`
            url.pathname = m[1] === 'ar' ? `/ar${dest}` : dest
            return NextResponse.redirect(url, { status: 301 })
        }
        const orphan = cleanPath.match(/^(?:\/(en|ar))?\/services\/([a-z0-9-]+)$/)
        if (orphan && WEBAPP_ORPHAN_REDIRECTS[orphan[2]]) {
            const url = request.nextUrl.clone()
            url.host = apexHost
            const dest = `/services/web-applications/${WEBAPP_ORPHAN_REDIRECTS[orphan[2]]}`
            url.pathname = orphan[1] === 'ar' ? `/ar${dest}` : dest
            return NextResponse.redirect(url, { status: 301 })
        }
    }

    // App Development sub-services (iOS / Android / Cross-Platform) live NESTED
    // under the pillar: /services/app-development/<sub>. Serve them by rewriting
    // to the existing flat service-detail page, and 301 the old flat URL to the
    // nested one (single hop, any locale).
    {
        const APP_SUBS = [
            'ios-app-development', 'android-app-development', 'cross-platform-app-development',
            'flutter-app-development', 'react-native-app-development', 'mvp-app-development',
            'business-mobile-app-development', 'customer-app-development', 'booking-app-development',
            'delivery-order-app-development', 'app-backend-api-development', 'app-store-launch-support',
            'mobile-app-maintenance',
        ]
        const nested = cleanPath.match(/^(?:\/(en|ar))?\/services\/app-development\/([a-z0-9-]+)$/)
        if (nested && APP_SUBS.includes(nested[2])) {
            const url = request.nextUrl.clone()
            url.pathname = `/${nested[1] || defaultLocale}/services/${nested[2]}`
            const requestHeaders = new Headers(request.headers)
            requestHeaders.set('x-locale', nested[1] || defaultLocale)
            const response = NextResponse.rewrite(url, { request: { headers: requestHeaders } })
            response.cookies.set('NEXT_LOCALE', nested[1] || defaultLocale, { path: '/', maxAge: 60 * 60 * 24 * 365 })
            return response
        }
        const flat = cleanPath.match(/^(?:\/(en|ar))?\/services\/([a-z0-9-]+)$/)
        if (flat && APP_SUBS.includes(flat[2])) {
            const url = request.nextUrl.clone()
            url.host = apexHost
            url.pathname = flat[1] === 'ar' ? `/ar/services/app-development/${flat[2]}` : `/services/app-development/${flat[2]}`
            return NextResponse.redirect(url, { status: 301 })
        }
    }

    const seg1 = cleanPath.split('/')[1] // '', 'en', 'ar', or something else
    const isEnPrefixed = seg1 === 'en'
    const isNonEnLocale = seg1 === 'ar'
    const countryRedirect = getCountryRedirect(cleanPath)

    if (countryRedirect) {
        const url = request.nextUrl.clone()
        url.host = apexHost
        url.pathname = countryRedirect
        return NextResponse.redirect(url, { status: 301 })
    }

    // (D) /en/... — migrate to clean URL. Single 301 combining www-strip,
    // trailing-slash-strip, and locale-strip into one hop.
    if (isEnPrefixed) {
        if (requestLocale === defaultLocale) {
            return NextResponse.next()
        }
        const stripped = cleanPath === '/en' ? '/' : cleanPath.slice(3)
        const url = request.nextUrl.clone()
        url.host = apexHost
        url.pathname = getCountryRedirect(stripped) || stripped
        return NextResponse.redirect(url, { status: 301 })
    }

    // (E) /ar/... — pass through. Redirect first if we need
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
