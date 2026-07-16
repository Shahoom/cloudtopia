import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'
import { getAllProjectIds, getAllProjectIdsFromCMS } from '@/lib/projects'
import {
    buildBaseIndustrySitemapEntries,
    isResolverOwnedIndustryCmsSlug,
} from '@/lib/industries/sitemap'
import { serviceDetailSlugs, getServiceCategory } from '@/lib/seo/services'
import { structuredPillarRoutes } from '@/lib/services/structured-catalog'
import { dpSubServiceSlugs, getDigitalPresenceSubService } from '@/lib/services/digital-presence-content'
import { businessSystemsSubServiceSlugs, getBusinessSystemsSubService } from '@/lib/services/business-systems-content'
import { subServiceHref } from '@/lib/services/sub-service-routing'
import { countryLandingPages } from '@/lib/seo/country-landing-pages'

// DP + BS sub-services now live nested under their parent pillar
// (/services/<parent>/<sub>), so they are emitted separately (see
// nestedSubServicePaths) rather than as flat /services/<slug> URLs.
const subServiceSlugSet = new Set<string>([...dpSubServiceSlugs, ...businessSystemsSubServiceSlugs])
// Web Applications pillars are nested under /services/web-applications/<pillar>.
// Their legacy flat duplicate pages (custom-web-application-development,
// client-portals, …) 301 to the canonical pillar, so they must NOT be emitted.
const webAppPillarSet = new Set<string>(['custom-saas-mvp-development', 'full-stack-web-engineering', 'interactive-portals-dashboards', 'application-modernization-performance', 'media-entertainment-streaming'])
const webAppOrphanSet = new Set<string>(['custom-web-application-development', 'progressive-web-app-development', 'client-portals', 'admin-dashboards', 'booking-platforms', 'internal-business-tools', 'saas-mvp-development'])
const websiteFamilyOrphanSet = new Set<string>(['website-redesign', 'corporate-website-design', 'landing-page-design', 'portfolio-websites', 'educational-website-development', 'restaurant-website-development', 'website-maintenance', 'ecommerce-website-development'])

// Flat /services/<slug> pages that still render after the catalog restructure:
// the old flat catalog (serviceDetailSlugs, minus any that became nested subs)
// PLUS the new structured pillar pages. Deduped so a slug that appears in more
// than one source is emitted once.
const allServiceDetailSlugs: string[] = Array.from(
    new Set<string>([
        ...serviceDetailSlugs.filter((s) => !subServiceSlugSet.has(s) && !webAppOrphanSet.has(s) && !websiteFamilyOrphanSet.has(s)),
        ...structuredPillarRoutes.map((p) => p.slug),
    ]),
)

// Web-app pillar canonical paths are produced by serviceCanonicalPath() below:
// /services/web-applications/<slug>. Keep this empty to avoid duplicate loops.
const webApplicationPillarPaths: string[] = []

// Nested sub-service URLs (/services/<parent>/<sub>) for every DP + BS sub.
const nestedSubServicePaths: string[] = Array.from(
    new Set<string>([
        ...businessSystemsSubServiceSlugs
            .map((slug) => getBusinessSystemsSubService(slug))
            .filter((s): s is NonNullable<typeof s> => Boolean(s))
            .map((s) => subServiceHref(s.pillarSlug, s.slug)),
        ...dpSubServiceSlugs
            .map((slug) => getDigitalPresenceSubService(slug))
            .filter((s): s is NonNullable<typeof s> => Boolean(s))
            .map((s) => subServiceHref(s.pillarSlug, s.slug)),
    ]),
)

// Mobile App Development is now the /services/app-development pillar with every
// service nested beneath it. The old flat /services/<slug> URLs 301-redirect,
// so the sitemap must emit the nested canonical paths (and the pillar itself,
// which otherwise would not appear at all).
const mobileSubSlugSet = new Set<string>(
    (getServiceCategory('mobile-app-development')?.services ?? []).map((s) => s.slug),
)
function serviceCanonicalPath(slug: string): string {
    if (slug === 'mobile-app-development') return '/services/app-development'
    if (mobileSubSlugSet.has(slug)) return `/services/app-development/${slug}`
    if (webAppPillarSet.has(slug)) return `/services/web-applications/${slug}`
    return `/services/${slug}`
}

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
        // `labs` is a stale CMS Pages row with no matching route — it 404s, so
        // keep it out of the sitemap alongside the other non-page slugs.
        .filter((page: any) =>
            supportedLocales.has(page.locale) &&
            !['blog', 'locations', 'labs'].includes(page.slug) &&
            !isResolverOwnedIndustryCmsSlug(page.slug),
        )
        .map(pageToSitemapEntry)
    const projectIds = await getAllProjectIdsFromCMS()
    // Stable, recent lastmod for the code-defined data-driven pages. This was
    // `new Date()` per request, which stamped every URL with the fetch time on
    // each crawl and taught Google to distrust the freshness signal. File mtimes
    // are no good either — Vercel's traced source files report a fixed 2018
    // mtime — so use the newest CMS content date: real, recent, and only moves
    // when content actually changes.
    const cmsLatest = entries.reduce((m: Date, e) => {
        const d = e.lastModified ? new Date(e.lastModified) : null
        return d && !isNaN(d.getTime()) && d > m ? d : m
    }, new Date(0))
    const stableLastmod = cmsLatest.getTime() > 0 ? cmsLatest : new Date()
    const lastModified = stableLastmod
    const servicesMtime = stableLastmod
    const countriesMtime = stableLastmod
    // Core static + bespoke service-landing routes that must always be present in
    // the sitemap, regardless of whether a matching CMS Pages row exists. Each is
    // dedup-guarded below so it never duplicates an entry already produced from CMS
    // pages, the article feed, or the data-driven loops further down.
    // (`/articles` is intentionally omitted — getBlogSitemapEntries() emits it.)
    const guaranteedStaticRoutes: Array<{
        path: string
        priority: number
        changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'
    }> = [
        { path: '/', priority: 1.0, changeFrequency: 'weekly' },
        { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
        { path: '/industries', priority: 0.86, changeFrequency: 'monthly' },
        { path: '/markets', priority: 0.86, changeFrequency: 'monthly' },
        { path: '/pricing', priority: 0.9, changeFrequency: 'weekly' },
        { path: '/projects', priority: 0.8, changeFrequency: 'weekly' },
        { path: '/process', priority: 0.76, changeFrequency: 'monthly' },
        { path: '/trust', priority: 0.74, changeFrequency: 'monthly' },
        { path: '/about', priority: 0.7, changeFrequency: 'monthly' },
        { path: '/contact', priority: 0.7, changeFrequency: 'yearly' },
        { path: '/services/digital-presence', priority: 0.86, changeFrequency: 'monthly' },
        { path: '/services/website-development', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/services/ecommerce-development', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/services/business-systems-development', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/restaurant-qr-menu', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/services/content-creation', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/services/social-media-marketing', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/services/web-applications', priority: 0.8, changeFrequency: 'monthly' },
        { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
        { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    ]

    guaranteedStaticRoutes.forEach((route) => {
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

    countryLandingPages.forEach((country) => {
        const languages = {
            [country.hreflangEnglish]: `${BASE_URL}${country.englishUrl}`,
            [country.hreflangArabic]: `${BASE_URL}${country.arabicUrl}`,
            'x-default': `${BASE_URL}${country.englishUrl}`,
        }
        entries.push({
            url: `${BASE_URL}${country.englishUrl}`,
            lastModified: countriesMtime,
            changeFrequency: 'monthly',
            priority: 0.88,
            alternates: { languages },
        })
        entries.push({
            url: `${BASE_URL}${country.arabicUrl}`,
            lastModified: countriesMtime,
            changeFrequency: 'monthly',
            priority: 0.88,
            alternates: { languages },
        })
    })

    entries.push(...buildBaseIndustrySitemapEntries())

    allServiceDetailSlugs.forEach((service) => {
        const languages = buildHreflangMap(serviceCanonicalPath(service))
        locales.forEach((loc) => {
            entries.push({
                url: canonicalUrl(loc, serviceCanonicalPath(service)),
                lastModified: servicesMtime,
                changeFrequency: 'monthly',
                priority: 0.76,
                alternates: { languages },
            })
        })
    })

    // Nested sub-service pages (/services/<parent>/<sub>).
    nestedSubServicePaths.forEach((servicePath) => {
        const languages = buildHreflangMap(servicePath)
        locales.forEach((loc) => {
            entries.push({
                url: canonicalUrl(loc, servicePath),
                lastModified: servicesMtime,
                changeFrequency: 'monthly',
                priority: 0.76,
                alternates: { languages },
            })
        })
    })

    // Legacy placeholder; web-app pillars are emitted through allServiceDetailSlugs.
    webApplicationPillarPaths.forEach((pillarPath) => {
        const languages = buildHreflangMap(pillarPath)
        locales.forEach((loc) => {
            entries.push({
                url: canonicalUrl(loc, pillarPath),
                lastModified: servicesMtime,
                changeFrequency: 'monthly',
                priority: 0.78,
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
        { path: '/services/digital-presence', priority: 0.86, changeFrequency: 'monthly', ogPage: 'digital-presence' },
        { path: '/services/website-development', priority: 0.8, changeFrequency: 'monthly', ogPage: 'website-design' },
        { path: '/services/ecommerce-development', priority: 0.8, changeFrequency: 'monthly', ogPage: 'ecommerce-solutions' },
        { path: '/services/business-systems-development', priority: 0.8, changeFrequency: 'monthly', ogPage: 'business-systems-development' },
        { path: '/restaurant-qr-menu', priority: 0.8, changeFrequency: 'monthly', ogPage: 'restaurant-qr-menu' },
        { path: '/services/content-creation', priority: 0.8, changeFrequency: 'monthly', ogPage: 'content-creation' },
        { path: '/services/social-media-marketing', priority: 0.8, changeFrequency: 'monthly', ogPage: 'social-media-marketing' },
        { path: '/services/web-applications', priority: 0.8, changeFrequency: 'monthly', ogPage: 'web-applications' },
        { path: '/privacy', priority: 0.3, changeFrequency: 'yearly' },
        { path: '/terms', priority: 0.3, changeFrequency: 'yearly' },
    ]

    const sitemapEntries: MetadataRoute.Sitemap = []
    const dataDriven: Record<string, string> = {
        '/': 'i18n/translations/en.ts',
        '/services': 'i18n/translations/en.ts',
        '/pricing': 'i18n/translations/en.ts',
        '/projects': 'i18n/translations/en.ts',
        '/services/digital-presence': 'services/digital-presence-landing.ts',
        '/services/website-development': 'i18n/translations/en.ts',
        '/services/ecommerce-development': 'i18n/translations/en.ts',
        '/services/business-systems-development': 'i18n/translations/en.ts',
        '/restaurant-qr-menu': 'i18n/translations/en.ts',
        '/services/content-creation': 'i18n/translations/en.ts',
        '/services/social-media-marketing': 'i18n/translations/en.ts',
        '/services/web-applications': 'i18n/translations/en.ts',
    }

    function getLastModified(routePath: string): Date {
        const dataSource = dataDriven[routePath]
        if (dataSource) {
            try {
                const p = path.join(process.cwd(), 'lib', dataSource)
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

    sitemapEntries.push(...buildBaseIndustrySitemapEntries())

    const servicesDataMtime = (() => {
        try {
            const p = path.join(/*turbopackIgnore: true*/ process.cwd(), 'lib/seo/services.ts')
            if (fs.existsSync(p)) return fs.statSync(p).mtime
        } catch { /* ignore */ }
        return new Date()
    })()

    allServiceDetailSlugs.forEach((service) => {
        const languages = buildHreflangMap(serviceCanonicalPath(service))
        locales.forEach((loc) => {
            sitemapEntries.push({
                url: canonicalUrl(loc, serviceCanonicalPath(service)),
                lastModified: servicesDataMtime,
                changeFrequency: 'monthly',
                priority: 0.76,
                alternates: { languages },
            })
        })
    })

    // Nested sub-service pages (/services/<parent>/<sub>).
    nestedSubServicePaths.forEach((servicePath) => {
        const languages = buildHreflangMap(servicePath)
        locales.forEach((loc) => {
            sitemapEntries.push({
                url: canonicalUrl(loc, servicePath),
                lastModified: servicesDataMtime,
                changeFrequency: 'monthly',
                priority: 0.76,
                alternates: { languages },
            })
        })
    })

    // Legacy placeholder; web-app pillars are emitted through allServiceDetailSlugs.
    webApplicationPillarPaths.forEach((pillarPath) => {
        const languages = buildHreflangMap(pillarPath)
        locales.forEach((loc) => {
            sitemapEntries.push({
                url: canonicalUrl(loc, pillarPath),
                lastModified: servicesDataMtime,
                changeFrequency: 'monthly',
                priority: 0.78,
                alternates: { languages },
            })
        })
    })

    return sitemapEntries
}
