import fs from 'fs'
import path from 'path'

/**
 * Per-page, per-locale Open Graph image resolver.
 *
 * Naming convention (always 1200×630 JPG):
 *   public/images/og/<page>-<locale>.jpg
 *
 * Examples:
 *   public/images/og/home-en.jpg
 *   public/images/og/home-ar.jpg
 *   public/images/og/pricing-en.jpg
 *   public/images/og/website-design-en.jpg
 *
 * Fallback chain (first match wins):
 *   1. /images/og/<page>-<locale>.jpg            ← page-specific, locale-specific
 *   2. /images/og/<page>.jpg                     ← page-specific, locale-agnostic
 *   3. /images/og/default-<locale>.jpg           ← brand default, locale-specific
 *   4. /images/og/default.jpg                    ← brand default, locale-agnostic
 *   5. /images/og-image.jpg                      ← legacy fallback (already in repo)
 *
 * This means you can roll out OG images gradually — drop one in for /pricing
 * today, add one for /website-design tomorrow, and pages without a custom
 * image still serve the brand default.
 */

const BASE_URL = 'https://cloudtopia.net'
const PUBLIC_DIR = path.join(process.cwd(), 'public')
const OG_DIR = '/images/og'
const LEGACY_FALLBACK = '/images/og-image.jpg'

/**
 * In-memory cache so we don't fs.statSync on every page render.
 * Cleared on dev hot-reload because the module re-loads.
 */
const existsCache = new Map<string, boolean>()

function publicFileExists(publicPath: string): boolean {
    if (existsCache.has(publicPath)) {
        return existsCache.get(publicPath)!
    }
    const fsPath = path.join(PUBLIC_DIR, publicPath.replace(/^\//, ''))
    const exists = fs.existsSync(fsPath)
    existsCache.set(publicPath, exists)
    return exists
}

export type OgImageInput = {
    page: string // e.g. 'home', 'pricing', 'website-design', 'blog/gulf-payment-gateways-mada-stc-pay-tabby'
    locale: string // 'en' | 'ar' | 'tr'
    /**
     * Absolute URL override — when a page already has a topical image (e.g. blog
     * cover image from Unsplash) and you want to use that instead of looking up
     * a local OG file. Pass it directly and the resolver returns it unchanged.
     */
    override?: string
}

export type OgImageResult = {
    url: string // absolute URL safe to put in OG metadata
    alt: string // suggested alt text
    width: 1200
    height: 630
}

/**
 * Resolve the best-available OG image for a given page + locale.
 *
 * Always returns an absolute URL (Open Graph requires absolute URLs).
 */
export function getOgImage({ page, locale, override }: OgImageInput): OgImageResult {
    // Override path — used by blog posts whose cover image is the OG image
    if (override) {
        const url = override.startsWith('http') ? override : `${BASE_URL}${override}`
        return { url, alt: page, width: 1200, height: 630 }
    }

    const candidates = [
        `${OG_DIR}/${page}-${locale}.jpg`, // most specific
        `${OG_DIR}/${page}-${locale}.png`,
        `${OG_DIR}/${page}.jpg`, // page-specific, locale-agnostic
        `${OG_DIR}/${page}.png`,
        `${OG_DIR}/default-${locale}.jpg`, // brand default, locale-specific
        `${OG_DIR}/default-${locale}.png`,
        `${OG_DIR}/default.jpg`, // brand default
        `${OG_DIR}/default.png`,
        LEGACY_FALLBACK, // existing /images/og-image.jpg
    ]

    for (const candidate of candidates) {
        if (publicFileExists(candidate)) {
            return {
                url: `${BASE_URL}${candidate}`,
                alt: page,
                width: 1200,
                height: 630,
            }
        }
    }

    // Last-resort fallback — should never hit because /images/og-image.jpg
    // already exists in the repo, but kept for safety.
    return {
        url: `${BASE_URL}${LEGACY_FALLBACK}`,
        alt: page,
        width: 1200,
        height: 630,
    }
}

/**
 * Convenience for Next.js metadata. Returns the array shape Next expects.
 */
export function ogImagesFor(input: OgImageInput) {
    const img = getOgImage(input)
    return [
        {
            url: img.url,
            width: img.width,
            height: img.height,
            alt: img.alt,
            type: img.url.endsWith('.png') ? ('image/png' as const) : ('image/jpeg' as const),
        },
    ]
}
