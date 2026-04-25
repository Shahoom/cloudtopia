import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { getPostSlugs, getPostBySlug } from '@/lib/blog'
import { getAllAuthorSlugs } from '@/lib/authors'
import { getAllProjectIds } from '@/lib/projects'
import { locationSlugs } from '@/lib/seo/locations'
import { hasPageOgImage } from '@/lib/og/og-image'

export function buildSitemapEntries(): MetadataRoute.Sitemap {
    const baseUrl = 'https://cloudtopia.net'
    const locales = ['en', 'ar', 'tr']

    // All static routes with SEO priority/frequency.
    //
    // `ogPage` — folder name under /public/og/ used to look up the per-locale
    // OG image and emit it in the sitemap as <image:image>. Pages explicitly
    // opted out of OG images (about, blog index per user request) leave it
    // unset.
    const routes: Array<{
        path: string
        priority: number
        changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
        ogPage?: string
    }> = [
        { path: '/',                              priority: 1.0, changeFrequency: 'weekly',  ogPage: 'home' },
        { path: '/services',                      priority: 0.9, changeFrequency: 'monthly', ogPage: 'services' },
        { path: '/pricing',                       priority: 0.9, changeFrequency: 'weekly',  ogPage: 'pricing' },
        { path: '/projects',                      priority: 0.8, changeFrequency: 'weekly',  ogPage: 'projects' },
        { path: '/about',                         priority: 0.7, changeFrequency: 'monthly', ogPage: 'about' },
        { path: '/contact',                       priority: 0.7, changeFrequency: 'yearly',  ogPage: 'contact' },
        { path: '/labs',                          priority: 0.7, changeFrequency: 'monthly', ogPage: 'labs' },
        // Service detail pages
        { path: '/website-design',                priority: 0.8, changeFrequency: 'monthly', ogPage: 'website-design' },
        { path: '/ecommerce-solutions',           priority: 0.8, changeFrequency: 'monthly', ogPage: 'ecommerce-solutions' },
        { path: '/business-systems-development',  priority: 0.8, changeFrequency: 'monthly', ogPage: 'business-systems-development' },
        { path: '/restaurant-qr-menu',            priority: 0.8, changeFrequency: 'monthly', ogPage: 'restaurant-qr-menu' },
        { path: '/content-creation',              priority: 0.8, changeFrequency: 'monthly', ogPage: 'content-creation' },
        { path: '/social-media-marketing',        priority: 0.8, changeFrequency: 'monthly', ogPage: 'social-media-marketing' },
        { path: '/web-applications',              priority: 0.8, changeFrequency: 'monthly', ogPage: 'web-applications' },
        // Legal
        { path: '/privacy',                       priority: 0.3, changeFrequency: 'yearly' },
        { path: '/terms',                         priority: 0.3, changeFrequency: 'yearly' },
    ]

    const sitemapEntries: MetadataRoute.Sitemap = []

    // Helper: get last-modified date from file system
    function getLastModified(routePath: string): Date {
        try {
            const filePath = routePath === '/'
                ? path.join(process.cwd(), 'app/[locale]/page.tsx')
                : path.join(process.cwd(), 'app/[locale]', routePath, 'page.tsx')
            if (fs.existsSync(filePath)) {
                return fs.statSync(filePath).mtime
            }
        } catch {
            // fallback
        }
        return new Date()
    }

    // Helper: build full hreflang map for a given path suffix
    function buildLanguages(pathSuffix: string): Record<string, string> {
        const languages: Record<string, string> = {
            'x-default': `${baseUrl}/en${pathSuffix}`,
        }
        locales.forEach((loc) => {
            languages[loc] = `${baseUrl}/${loc}${pathSuffix}`
        })
        return languages
    }

    // Static routes — one entry per locale, with image extension where the
    // page has a real OG image folder (and has not been opted out).
    routes.forEach((route) => {
        const pathSuffix = route.path === '/' ? '' : route.path
        const languages = buildLanguages(pathSuffix)
        const lastModified = getLastModified(route.path)

        locales.forEach((loc) => {
            // Per-locale image lookup: emit /og/<page>/<locale>.jpg (or .png)
            // when it exists; falls back gracefully when only some locales
            // have the image.
            let images: string[] | undefined
            if (route.ogPage && hasPageOgImage(route.ogPage, loc)) {
                // We pick the literal candidate path here rather than going
                // through getOgImage() to avoid the brand-default fallback —
                // sitemap should only declare images that actually exist for
                // the route, not generic brand placeholders.
                const candidates = [
                    `/og/${route.ogPage}/${loc}.jpg`,
                    `/og/${route.ogPage}/${loc}.png`,
                    `/og/${route.ogPage}/default.jpg`,
                    `/og/${route.ogPage}/default.png`,
                ]
                for (const c of candidates) {
                    if (fs.existsSync(path.join(process.cwd(), 'public', c.replace(/^\//, '')))) {
                        images = [`${baseUrl}${c}`]
                        break
                    }
                }
            }

            sitemapEntries.push({
                url: `${baseUrl}/${loc}${pathSuffix}`,
                lastModified,
                changeFrequency: route.changeFrequency,
                priority: route.priority,
                alternates: { languages },
                ...(images && { images }),
            })
        })
    })

    // Blog listing page — one entry per locale.
    // Per user instruction: NO image extension for the blog index.
    const blogLanguages = buildLanguages('/blog')
    locales.forEach((loc) => {
        sitemapEntries.push({
            url: `${baseUrl}/${loc}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
            alternates: { languages: blogLanguages },
        })
    })

    // RSS feeds — one per locale
    const feedLanguages = buildLanguages('/blog/feed.xml')
    locales.forEach((loc) => {
        sitemapEntries.push({
            url: `${baseUrl}/${loc}/blog/feed.xml`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.5,
            alternates: { languages: feedLanguages },
        })
    })

    // Blog posts — locale-aware with cross-locale hreflang
    //
    // We collect every post in every locale and deduplicate by canonical `id`
    // (frontmatter field shared across locale variants of the same article).
    // For each canonical id we emit one URL per locale that has the post,
    // each with a full hreflang alternates map.
    //
    // The previous implementation iterated over `getPostSlugs('en')` and
    // treated each *slug* as if it were the canonical id, which silently
    // dropped every post whose slug ≠ id (i.e. every post with a localized
    // native-script slug + a shared canonical id).
    type LocalePostSummary = {
        loc: string
        slug: string
        updated?: string
        date?: string
        coverImage?: string
        title?: string
    }
    const idToLocalePosts = new Map<string, LocalePostSummary[]>()

    locales.forEach((loc) => {
        const slugs = getPostSlugs(loc)
        slugs.forEach((slug) => {
            const post = getPostBySlug(slug, loc)
            if (!post) return
            const canonicalId = post.id || post.slug
            const arr = idToLocalePosts.get(canonicalId) ?? []
            arr.push({
                loc,
                slug: post.slug,
                updated: post.updated,
                date: post.date,
                coverImage: post.coverImage,
                title: post.title,
            })
            idToLocalePosts.set(canonicalId, arr)
        })
    })

    idToLocalePosts.forEach((entries) => {
        // Build hreflang map for this canonical id
        const languages: Record<string, string> = {}
        const enEntry = entries.find((e) => e.loc === 'en')
        if (enEntry) {
            languages['x-default'] = `${baseUrl}/en/blog/${encodeURIComponent(enEntry.slug)}`
        }
        entries.forEach((e) => {
            languages[e.loc] = `${baseUrl}/${e.loc}/blog/${encodeURIComponent(e.slug)}`
        })

        // Emit one URL entry per locale variant
        entries.forEach((e) => {
            // Prefer explicit frontmatter `updated` (authoritative freshness signal),
            // fall back to `date`, then to file mtime as last resort.
            let lastModified = new Date()
            try {
                if (e.updated) {
                    lastModified = new Date(e.updated)
                } else if (e.date) {
                    lastModified = new Date(e.date)
                } else {
                    const postPath = path.join(process.cwd(), 'blog-posts', e.loc, `${e.slug}.mdx`)
                    if (fs.existsSync(postPath)) {
                        lastModified = fs.statSync(postPath).mtime
                    }
                }
            } catch {
                // fallback
            }

            // Image sitemap extension — surfaces blog covers in Google Images.
            // Image URLs MUST be absolute. Relative paths (legacy posts using
            // /images/blog/...) get prefixed with the canonical base URL;
            // full URLs (Unsplash CDN) pass through.
            const absoluteImage = e.coverImage
                ? (e.coverImage.startsWith('http') ? e.coverImage : `${baseUrl}${e.coverImage}`)
                : undefined

            sitemapEntries.push({
                url: `${baseUrl}/${e.loc}/blog/${encodeURIComponent(e.slug)}`,
                lastModified,
                changeFrequency: 'monthly',
                priority: 0.8,
                alternates: { languages },
                ...(absoluteImage && {
                    images: [absoluteImage],
                }),
            })
        })
    })

    // Author pages — one entry per (locale × author)
    getAllAuthorSlugs().forEach((authorSlug) => {
        const languages = buildLanguages(`/authors/${authorSlug}`)
        locales.forEach((loc) => {
            sitemapEntries.push({
                url: `${baseUrl}/${loc}/authors/${authorSlug}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.6,
                alternates: { languages },
            })
        })
    })

    // Project detail pages — one entry per (locale × project)
    const projectIds = getAllProjectIds()
    projectIds.forEach((pid) => {
        const languages = buildLanguages(`/projects/${pid}`)
        locales.forEach((loc) => {
            sitemapEntries.push({
                url: `${baseUrl}/${loc}/projects/${pid}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.8,
                alternates: { languages },
            })
        })
    })

    // Location landing pages — one entry per (locale × country)
    locationSlugs.forEach((country) => {
        const languages = buildLanguages(`/locations/${country}`)
        locales.forEach((loc) => {
            sitemapEntries.push({
                url: `${baseUrl}/${loc}/locations/${country}`,
                lastModified: new Date(),
                changeFrequency: 'monthly',
                priority: 0.85,
                alternates: { languages },
            })
        })
    })

    return sitemapEntries
}
