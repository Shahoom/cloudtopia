import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { getAllAuthorSlugs } from '@/lib/authors'
import { getAllProjectIds, getAllProjectIdsFromCMS } from '@/lib/projects'
import { locationSlugs } from '@/lib/seo/locations'
import { hasPageOgImage } from '@/lib/og/og-image'
import { BASE_URL, canonicalUrl, buildHreflangMap } from '@/lib/i18n/url'
import { getPublishedCMSPages, pageToSitemapEntry } from '@/lib/cms/content'
import { getBlogSitemapEntries } from '@/lib/blog/data'

export async function buildSitemapEntriesFromCMS(): Promise<MetadataRoute.Sitemap> {
    const pages = await getPublishedCMSPages()
    if (pages.length === 0) return buildSitemapEntries()

    const entries = pages.filter((page: any) => page.slug !== 'blog').map(pageToSitemapEntry)
    const projectIds = await getAllProjectIdsFromCMS()
    const locales = ['en', 'ar', 'tr']
    const lastModified = new Date()

    projectIds.forEach((projectId) => {
        const languages = buildHreflangMap(`/projects/${projectId}`)
        locales.forEach((loc) => {
            entries.push({
                url: canonicalUrl(loc, `/projects/${projectId}`),
                lastModified,
                changeFrequency: 'monthly',
                priority: 0.8,
                alternates: { languages },
            })
        })
    })

    entries.push(...(await getBlogSitemapEntries()))

    return entries
}

export function buildSitemapEntries(): MetadataRoute.Sitemap {
    const locales = ['en', 'ar', 'tr']
    const routes: Array<{
        path: string
        priority: number
        changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
        ogPage?: string
    }> = [
        { path: '/', priority: 1.0, changeFrequency: 'weekly', ogPage: 'home' },
        { path: '/services', priority: 0.9, changeFrequency: 'monthly', ogPage: 'services' },
        { path: '/pricing', priority: 0.9, changeFrequency: 'weekly', ogPage: 'pricing' },
        { path: '/projects', priority: 0.8, changeFrequency: 'weekly', ogPage: 'projects' },
        { path: '/insights', priority: 0.85, changeFrequency: 'weekly' },
        { path: '/about', priority: 0.7, changeFrequency: 'monthly', ogPage: 'about' },
        { path: '/contact', priority: 0.7, changeFrequency: 'yearly', ogPage: 'contact' },
        { path: '/labs', priority: 0.7, changeFrequency: 'monthly', ogPage: 'labs' },
        { path: '/website-design', priority: 0.8, changeFrequency: 'monthly', ogPage: 'website-design' },
        { path: '/ecommerce-solutions', priority: 0.8, changeFrequency: 'monthly', ogPage: 'ecommerce-solutions' },
        { path: '/business-systems-development', priority: 0.8, changeFrequency: 'monthly', ogPage: 'business-systems-development' },
        { path: '/restaurant-qr-menu', priority: 0.8, changeFrequency: 'monthly', ogPage: 'restaurant-qr-menu' },
        { path: '/content-creation', priority: 0.8, changeFrequency: 'monthly', ogPage: 'content-creation' },
        { path: '/social-media-marketing', priority: 0.8, changeFrequency: 'monthly', ogPage: 'social-media-marketing' },
        { path: '/web-applications', priority: 0.8, changeFrequency: 'monthly', ogPage: 'web-applications' },
        { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
        { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    ]

    const sitemapEntries: MetadataRoute.Sitemap = []
    const dataDriven: Record<string, string> = {
        '/': 'lib/i18n/translations/en.ts',
        '/services': 'lib/i18n/translations/en.ts',
        '/pricing': 'lib/i18n/translations/en.ts',
        '/projects': 'lib/i18n/translations/en.ts',
        '/labs': 'lib/i18n/translations/en.ts',
        '/website-design': 'lib/i18n/translations/en.ts',
        '/ecommerce-solutions': 'lib/i18n/translations/en.ts',
        '/business-systems-development': 'lib/i18n/translations/en.ts',
        '/restaurant-qr-menu': 'lib/i18n/translations/en.ts',
        '/content-creation': 'lib/i18n/translations/en.ts',
        '/social-media-marketing': 'lib/i18n/translations/en.ts',
        '/web-applications': 'lib/i18n/translations/en.ts',
    }

    function getLastModified(routePath: string): Date {
        const dataSource = dataDriven[routePath]
        if (dataSource) {
            try {
                const p = path.join(/*turbopackIgnore: true*/ process.cwd(), dataSource)
                if (fs.existsSync(p)) return fs.statSync(p).mtime
            } catch { /* fall through */ }
        }

        try {
            const filePath =
                routePath === '/'
                    ? path.join(/*turbopackIgnore: true*/ process.cwd(), 'app/(frontend)/[locale]/page.tsx')
                    : path.join(/*turbopackIgnore: true*/ process.cwd(), 'app/(frontend)/[locale]', routePath, 'page.tsx')
            if (fs.existsSync(filePath)) return fs.statSync(filePath).mtime
        } catch { /* fall through */ }

        return new Date()
    }

    routes.forEach((route) => {
        const pathSuffix = route.path === '/' ? '' : route.path
        const languages = buildHreflangMap(pathSuffix || '/')
        const lastModified = getLastModified(route.path)

        locales.forEach((loc) => {
            let images: string[] | undefined
            if (route.ogPage && hasPageOgImage(route.ogPage, loc)) {
                const candidates = [
                    `/og/${route.ogPage}/${loc}.jpg`,
                    `/og/${route.ogPage}/${loc}.png`,
                    `/og/${route.ogPage}/default.jpg`,
                    `/og/${route.ogPage}/default.png`,
                ]
                for (const candidate of candidates) {
                    if (fs.existsSync(path.join(/*turbopackIgnore: true*/ process.cwd(), 'public', candidate.replace(/^\//, '')))) {
                        images = [`${BASE_URL}${candidate}`]
                        break
                    }
                }
            }

            sitemapEntries.push({
                url: canonicalUrl(loc, route.path),
                lastModified,
                changeFrequency: route.changeFrequency,
                priority: route.priority,
                alternates: { languages },
                ...(images && { images }),
            })
        })
    })

    const authorTemplateMtime = getLastModified('/authors/[slug]')
    getAllAuthorSlugs().forEach((authorSlug) => {
        const languages = buildHreflangMap(`/authors/${authorSlug}`)
        locales.forEach((loc) => {
            sitemapEntries.push({
                url: canonicalUrl(loc, `/authors/${authorSlug}`),
                lastModified: authorTemplateMtime,
                changeFrequency: 'monthly',
                priority: 0.6,
                alternates: { languages },
            })
        })
    })

    const projectsDataMtime = getLastModified('/projects')
    getAllProjectIds().forEach((projectId) => {
        const languages = buildHreflangMap(`/projects/${projectId}`)
        locales.forEach((loc) => {
            sitemapEntries.push({
                url: canonicalUrl(loc, `/projects/${projectId}`),
                lastModified: projectsDataMtime,
                changeFrequency: 'monthly',
                priority: 0.8,
                alternates: { languages },
            })
        })
    })

    const locationsDataMtime = (() => {
        try {
            const p = path.join(/*turbopackIgnore: true*/ process.cwd(), 'lib/seo/locations.ts')
            if (fs.existsSync(p)) return fs.statSync(p).mtime
        } catch { /* ignore */ }
        return new Date()
    })()

    locationSlugs.forEach((country) => {
        const languages = buildHreflangMap(`/locations/${country}`)
        locales.forEach((loc) => {
            sitemapEntries.push({
                url: canonicalUrl(loc, `/locations/${country}`),
                lastModified: locationsDataMtime,
                changeFrequency: 'monthly',
                priority: 0.85,
                alternates: { languages },
            })
        })
    })

    return sitemapEntries
}
