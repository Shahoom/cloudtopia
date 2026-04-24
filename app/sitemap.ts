import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { getPostSlugs, getSlugById, getPostBySlug } from '@/lib/blog'
import { getAllAuthorSlugs } from '@/lib/authors'
import { getAllProjectIds } from '@/lib/projects'
import { locationSlugs } from '@/lib/seo/locations'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://cloudtopia.net'
    const locales = ['en', 'ar', 'tr']

    // All static routes with SEO priority/frequency
    const routes = [
        { path: '/',                              priority: 1.0, changeFrequency: 'weekly'  as const },
        { path: '/services',                      priority: 0.9, changeFrequency: 'monthly' as const },
        { path: '/pricing',                       priority: 0.9, changeFrequency: 'weekly'  as const },
        { path: '/projects',                      priority: 0.8, changeFrequency: 'weekly'  as const },
        { path: '/about',                         priority: 0.7, changeFrequency: 'monthly' as const },
        { path: '/contact',                       priority: 0.7, changeFrequency: 'yearly'  as const },
        { path: '/labs',                          priority: 0.7, changeFrequency: 'monthly' as const },
        // Service detail pages
        { path: '/website-design',                priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/ecommerce-solutions',           priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/business-systems-development',  priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/restaurant-qr-menu',            priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/content-creation',              priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/social-media-marketing',        priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/web-applications',              priority: 0.8, changeFrequency: 'monthly' as const },
        // Legal
        { path: '/privacy',                       priority: 0.3, changeFrequency: 'yearly'  as const },
        { path: '/terms',                         priority: 0.3, changeFrequency: 'yearly'  as const },
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

    // Static routes — one entry per locale
    routes.forEach((route) => {
        const pathSuffix = route.path === '/' ? '' : route.path
        const languages = buildLanguages(pathSuffix)
        const lastModified = getLastModified(route.path)

        locales.forEach((loc) => {
            sitemapEntries.push({
                url: `${baseUrl}/${loc}${pathSuffix}`,
                lastModified,
                changeFrequency: route.changeFrequency,
                priority: route.priority,
                alternates: { languages },
            })
        })
    })

    // Blog listing page — one entry per locale
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

    // Blog posts — locale-aware with cross-locale hreflang
    const canonicalSlugs = getPostSlugs('en')
    canonicalSlugs.forEach((cid) => {
        const languages: Record<string, string> = {}

        const enSlug = getSlugById(cid, 'en')
        if (enSlug) {
            languages['x-default'] = `${baseUrl}/en/blog/${encodeURIComponent(enSlug)}`
        }

        locales.forEach((loc) => {
            const localSlug = getSlugById(cid, loc)
            if (localSlug) {
                languages[loc] = `${baseUrl}/${loc}/blog/${encodeURIComponent(localSlug)}`
            }
        })

        locales.forEach((loc) => {
            const localSlug = getSlugById(cid, loc)
            if (!localSlug) return

            // Prefer explicit frontmatter `updated` when present (authoritative freshness
            // signal), otherwise fall back to `date`, then file mtime as last resort.
            let lastModified = new Date()
            try {
                const localPost = getPostBySlug(localSlug, loc)
                if (localPost?.updated) {
                    lastModified = new Date(localPost.updated)
                } else if (localPost?.date) {
                    lastModified = new Date(localPost.date)
                } else {
                    const postPath = path.join(process.cwd(), 'blog-posts', loc, `${localSlug}.mdx`)
                    if (fs.existsSync(postPath)) {
                        lastModified = fs.statSync(postPath).mtime
                    }
                }
            } catch {
                // fallback
            }

            sitemapEntries.push({
                url: `${baseUrl}/${loc}/blog/${encodeURIComponent(localSlug)}`,
                lastModified,
                changeFrequency: 'monthly',
                priority: 0.8,
                alternates: { languages },
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
