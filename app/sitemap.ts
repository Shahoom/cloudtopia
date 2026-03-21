import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { getPostSlugs } from '@/lib/blog'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://cloudtopia.net'
    const locales = ['en', 'ar', 'tr']

    const routes = [
        { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
        { path: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
        { path: '/website-design', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/content-creation', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/social-media-marketing', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/ecommerce-solutions', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/restaurant-qr-menu', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/business-systems-development', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/web-applications', priority: 0.8, changeFrequency: 'monthly' as const },
        { path: '/labs', priority: 0.7, changeFrequency: 'monthly' as const },
        { path: '/projects', priority: 0.8, changeFrequency: 'weekly' as const },
        { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const },
        { path: '/contact', priority: 0.7, changeFrequency: 'yearly' as const },
        { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' as const },
        { path: '/terms', priority: 0.3, changeFrequency: 'yearly' as const },
    ]

    const sitemapEntries: MetadataRoute.Sitemap = []

    // Static routes — one entry per locale with full hreflang alternates
    routes.forEach((route) => {
        const pathSuffix = route.path === '/' ? '' : route.path
        const languages: Record<string, string> = {
            'x-default': `${baseUrl}/en${pathSuffix}`,
        }
        locales.forEach((loc) => {
            languages[loc] = `${baseUrl}/${loc}${pathSuffix}`
        })

        locales.forEach((loc) => {
            let lastModified = new Date()
            try {
                // Check if it's the home page or a subpage
                const routeFile = route.path === '/'
                    ? path.join(process.cwd(), 'app/[locale]/page.tsx')
                    : path.join(process.cwd(), 'app/[locale]', route.path, 'page.tsx')

                if (fs.existsSync(routeFile)) {
                    lastModified = fs.statSync(routeFile).mtime
                }
            } catch (e) {
                // Fallback to now
            }

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
    locales.forEach((loc) => {
        const languages: Record<string, string> = {
            'x-default': `${baseUrl}/en/blog`,
        }
        locales.forEach((l) => {
            languages[l] = `${baseUrl}/${l}/blog`
        })

        sitemapEntries.push({
            url: `${baseUrl}/${loc}/blog`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
            alternates: { languages },
        })
    })

    // Blog posts — routing uses the MDX filename as slug for all locales
    // All three language versions share the same slug (the EN filename).
    const blogSlugs = getPostSlugs()
    blogSlugs.forEach((slug) => {
        const languages: Record<string, string> = {
            'x-default': `${baseUrl}/en/blog/${slug}`,
        }
        locales.forEach((loc) => {
            languages[loc] = `${baseUrl}/${loc}/blog/${slug}`
        })

        locales.forEach((loc) => {
            let lastModified = new Date()
            try {
                const postPath = path.join(process.cwd(), 'blog-posts', loc, `${slug}.mdx`)
                if (fs.existsSync(postPath)) {
                    lastModified = fs.statSync(postPath).mtime
                }
            } catch (e) {
                // Fallback to now
            }

            sitemapEntries.push({
                url: `${baseUrl}/${loc}/blog/${slug}`,
                lastModified,
                changeFrequency: 'monthly',
                priority: 0.8,
                alternates: { languages },
            })
        })
    })

    return sitemapEntries
}
