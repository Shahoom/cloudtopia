import fs from 'fs'
import path from 'path'

/**
 * Per-page, per-locale Open Graph image resolver.
 *
 * Convention (1200×630 JPG/PNG):
 *   public/og/<page>/<locale>.jpg
 *
 * Examples:
 *   public/og/home/en.jpg
 *   public/og/home/ar.jpg
 *   public/og/pricing/en.jpg
 *   public/og/services/default.jpg
 *
 * Lookup chain (first match wins):
 *   1. /og/<page>/<locale>.jpg|.png            ← page-specific, locale-specific
 *   2. /og/<page>/default.jpg|.png             ← page-specific, locale fallback
 *   3. /og/default/<locale>.jpg|.png           ← brand default per locale
 *   4. /og/default.jpg|.png                    ← brand default
 *   5. /images/og-image.jpg                    ← legacy fallback
 *
 * To roll out OG images gradually: drop a folder for one page and the rest
 * of the site keeps falling back to the brand default until you ship more.
 *
 * Pages that should NOT emit an OG image (per user request: blog index,
 * about page) pass `omit: true`. The `ogImagesFor` helper then returns an
 * empty array, which Next.js treats as "no OG image".
 */

const BASE_URL = 'https://cloudtopia.net'
const PUBLIC_DIR = path.join(process.cwd(), 'public')
const OG_DIR = '/og'
const LEGACY_FALLBACK = '/images/og-image.jpg'

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
    /** Folder name under /public/og/. e.g. 'home', 'pricing', 'website-design' */
    page: string
    locale: string
    /**
     * Absolute or root-relative URL override. Used by blog posts to use
     * the post's own cover image as the OG image.
     */
    override?: string
    /**
     * If true, the resolver returns null (no OG image emitted). Use for
     * pages explicitly opted out — currently the blog index and about page.
     */
    omit?: boolean
}

export type OgImageResult = {
    url: string
    alt: string
    width: 1200
    height: 630
}

/**
 * Resolve the best-available OG image for a page + locale, or null when
 * the caller passes `omit: true`.
 */
export function getOgImage({
    page,
    locale,
    override,
    omit,
}: OgImageInput): OgImageResult | null {
    if (omit) return null

    if (override) {
        const url = override.startsWith('http') ? override : `${BASE_URL}${override}`
        return { url, alt: page, width: 1200, height: 630 }
    }

    const candidates = [
        `${OG_DIR}/${page}/${locale}.jpg`, // page + locale
        `${OG_DIR}/${page}/${locale}.png`,
        `${OG_DIR}/${page}/default.jpg`, // page locale fallback
        `${OG_DIR}/${page}/default.png`,
        `${OG_DIR}/default/${locale}.jpg`, // brand default per locale
        `${OG_DIR}/default/${locale}.png`,
        `${OG_DIR}/default.jpg`, // brand default
        `${OG_DIR}/default.png`,
        LEGACY_FALLBACK,
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

    return {
        url: `${BASE_URL}${LEGACY_FALLBACK}`,
        alt: page,
        width: 1200,
        height: 630,
    }
}

/**
 * Convenience for Next.js metadata. Returns the array shape Next expects,
 * or an empty array when the page opts out (`omit: true`).
 */
export function ogImagesFor(input: OgImageInput) {
    const img = getOgImage(input)
    if (!img) return []
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

/**
 * True when a page has its own per-page OG image (not falling back to the
 * brand default). Used by the sitemap to decide whether to emit
 * `<image:image>` for static pages.
 */
export function hasPageOgImage(page: string, locale: string = 'en'): boolean {
    return (
        publicFileExists(`${OG_DIR}/${page}/${locale}.jpg`) ||
        publicFileExists(`${OG_DIR}/${page}/${locale}.png`) ||
        publicFileExists(`${OG_DIR}/${page}/default.jpg`) ||
        publicFileExists(`${OG_DIR}/${page}/default.png`)
    )
}
