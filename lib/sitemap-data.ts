import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { getAllAuthorSlugs } from '@/lib/authors'
import { getAllProjectIds, getAllProjectIdsFromCMS } from '@/lib/projects'
import { industrySlugs } from '@/lib/seo/industries'
import { serviceDetailSlugs } from '@/lib/seo/services'
import { countryLandingPages } from '@/lib/seo/country-landing-pages'
import { hasPageOgImage } from '@/lib/og/og-image'
import { BASE_URL, canonicalUrl, buildHreflangMap } from '@/lib/i18n/url'
import { locales } from '@/lib/i18n/config'
import { getPublishedCMSPages, pageToSitemapEntry } from '@/lib/cms/content'
import { getBlogSitemapEntries } from '@/lib/blog/data'

export async function buildSitemapEntriesFromCMS(): Promise<MetadataRoute.Sitemap> {
    const pages = await getPublishedCMSPages()
    if (pages.length === 0) return buildSitemapEntries()

    const supportedLocales = new Set<string>(locales)
    const entries = pages
        .filter((page: any) => supportedLocales.has(page.locale) && !['blog', 'locations'].includes(page.slug))
        .map(pageToSitemapEntry)
    const projectIds = await getAllProjectIdsFromCMS()
    const lastModified = new Date()
    const staticNonCmsRoutes: Array<{
        path: string
        priority: number
        changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
    }> = [
        { path: '/process', priority: 0.76, changeFrequency: 'monthly' },
        { path: '/trust', priority: 0.74, changeFrequency: 'monthly' },
        { path: '/markets', priority: 0.86, changeFrequency: 'monthly' },
    ]

    staticNonCmsRoutes.forEach((route) => {
        const languages = buildHreflangMap(route.path)
        locales.forEach((loc) => {
            const url = canonicalUrl(loc, route.path)
            if (entries.some((entry) => entry.url === url)) return
            entries.push({
                url,
                lastModified,
                changeFrequency: route.changeFrequency,
                priority: route.priority,
                alternates: { languages },
            })
        })
    })

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

    const dynamicMtime = new Date()
    countryLandingPages.forEach((country) => {
        const languages = {
            [country.hreflangEnglish]: `${BASE_URL}${country.englishUrl}`,
            [country.hreflangArabic]: `${BASE_URL}${country.arabicUrl}`,
            'x-default': `${BASE_URL}${country.englishUrl}`,
        }
        entries.push({
            url: `${BASE_URL}${country.englishUrl}`,
            lastModified: dynamicMtime,
            changeFrequency: 'monthly',
            priority: 0.88,
            alternates: { languages },
        })
        entries.push({
            url: `${BASE_URL}${country.arabicUrl}`,
            lastModified: dynamicMtime,
            changeFrequency: 'monthly',
            priority: 0.88,
            alternates: { languages },
        })
    })

    industrySlugs.forEach((industry) => {
        const languages = buildHreflangMap(`/industries/${industry}`)
        locales.forEach((loc) => {
            entries.push({
                url: canonicalUrl(loc, `/industries/${industry}`),
                lastModified: dynamicMtime,
                changeFrequency: 'monthly',
                priority: 0.78,
                alternates: { languages },
            })
        })
    })

    serviceDetailSlugs.forEach((service) => {
        const languages = buildHreflangMap(`/services/${service}`)
        locales.forEach((loc) => {
            entries.push({
                url: canonicalUrl(loc, `/services/${service}`),
                lastModified: dynamicMtime,
                changeFrequency: 'monthly',
                priority: 0.76,
                alternates: { languages },
            })
        })
    })

    return entries
}

export function buildSitemapEntries(): MetadataRoute.Sitemap {
    const routes: Array<{
        path: string
        priority: number
        changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
        ogPage?: string
    }> = [
        { path: '/', priority: 1.0, changeFrequency: 'weekly', ogPage: 'home' },
        { path: '/services', priority: 0.9, changeFrequency: 'monthly', ogPage: 'services' },
        { path: '/industries', priority: 0.86, changeFrequency: 'monthly' },
        { path: '/markets', priority: 0.86, changeFrequency: 'monthly' },
        { path: '/pricing', priority: 0.9, changeFrequency: 'weekly', ogPage: 'pricing' },
        { path: '/projects', priority: 0.8, changeFrequency: 'weekly', ogPage: 'projects' },
        { path: '/articles', priority: 0.85, changeFrequency: 'weekly' },
        { path: '/process', priority: 0.76, changeFrequency: 'monthly' },
        { path: '/trust', priority: 0.74, changeFrequency: 'monthly' },
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

    const countryLandingDataMtime = (() => {
        try {
            const p = path.join(/*turbopackIgnore: true*/ process.cwd(), 'lib/seo/country-landing-pages.ts')
            if (fs.existsSync(p)) return fs.statSync(p).mtime
        } catch { /* ignore */ }
        return new Date()
    })()

    countryLandingPages.forEach((country) => {
        const languages = {
            [country.hreflangEnglish]: `${BASE_URL}${country.englishUrl}`,
            [country.hreflangArabic]: `${BASE_URL}${country.arabicUrl}`,
            'x-default': `${BASE_URL}${country.englishUrl}`,
        }
        sitemapEntries.push({
            url: `${BASE_URL}${country.englishUrl}`,
            lastModified: countryLandingDataMtime,
            changeFrequency: 'monthly',
            priority: 0.88,
            alternates: { languages },
        })
        sitemapEntries.push({
            url: `${BASE_URL}${country.arabicUrl}`,
            lastModified: countryLandingDataMtime,
            changeFrequency: 'monthly',
            priority: 0.88,
            alternates: { languages },
        })
    })

    const industriesDataMtime = (() => {
        try {
            const p = path.join(/*turbopackIgnore: true*/ process.cwd(), 'lib/seo/industries.ts')
            if (fs.existsSync(p)) return fs.statSync(p).mtime
        } catch { /* ignore */ }
        return new Date()
    })()

    industrySlugs.forEach((industry) => {
        const languages = buildHreflangMap(`/industries/${industry}`)
        locales.forEach((loc) => {
            sitemapEntries.push({
                url: canonicalUrl(loc, `/industries/${industry}`),
                lastModified: industriesDataMtime,
                changeFrequency: 'monthly',
                priority: 0.78,
                alternates: { languages },
            })
        })
    })

    const servicesDataMtime = (() => {
        try {
            const p = path.join(/*turbopackIgnore: true*/ process.cwd(), 'lib/seo/services.ts')
            if (fs.existsSync(p)) return fs.statSync(p).mtime
        } catch { /* ignore */ }
        return new Date()
    })()

    serviceDetailSlugs.forEach((service) => {
        const languages = buildHreflangMap(`/services/${service}`)
        locales.forEach((loc) => {
            sitemapEntries.push({
                url: canonicalUrl(loc, `/services/${service}`),
                lastModified: servicesDataMtime,
                changeFrequency: 'monthly',
                priority: 0.76,
                alternates: { languages },
            })
        })
    })

    return sitemapEntries
}
