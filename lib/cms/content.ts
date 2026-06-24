import 'server-only'
import { cache } from 'react'
import type { MetadataRoute } from 'next'
import { unstable_cache } from 'next/cache'
import { coerceLocale, type Locale } from '../i18n/config.ts'
import { ar } from '../i18n/translations/ar.ts'
import { en } from '../i18n/translations/en.ts'
import { canonicalUrl } from '../i18n/url.ts'
import { isDatabaseConfigured, queryDatabase } from './db.ts'
import {
  buildNavigation,
  buildPageSEO,
  buildSiteSettings,
  mergePageIntoDictionary,
  normalizePageSlug,
  publicPathForSlug,
} from './page-structure.ts'
import { composeSiteDesignJSON, flattenSiteDesignRow } from './site-design-structure.ts'

const staticDictionaries = { en, ar }
const CMS_REVALIDATE_SECONDS = 60

export type SiteDesign = {
  key: string
  theme: Record<string, any>
  navigation: Record<string, any>
  editableSections: Record<string, any>
}

export type SiteChrome = {
  dictionary: typeof en
  design: SiteDesign | null
  navigation: Record<string, any>
  settings: Record<string, any>
}

export type CMSProject = {
  id: string
  category: string
  type: string
  featured: boolean
  title: string
  problem: string
  solution: string
  features: string[]
  image: string
  metrics: { label: string; value: string }
  link?: string
  /** ISO timestamps from the projects row, when available (SD-9 dateModified). */
  createdAt?: string
  updatedAt?: string
}

export function getStaticDictionary(locale: Locale) {
  return staticDictionaries[locale] || staticDictionaries.en
}

async function getCMSDictionaryUncached(locale: Locale) {
  locale = coerceLocale(locale)
  const fallback = getStaticDictionary(locale)
  if (!isDatabaseConfigured()) return fallback

  try {
    const rows = await queryDatabase<{ dictionary: typeof en }>(
      'select dictionary from site_content where locale = $1 limit 1',
      [locale],
    )
    return rows[0]?.dictionary || fallback
  } catch {
    return fallback
  }
}

export const getCMSDictionary = unstable_cache(getCMSDictionaryUncached, ['cms-dictionary'], {
  revalidate: CMS_REVALIDATE_SECONDS,
  tags: ['cms-dictionary'],
})

async function getCMSDesignUncached(): Promise<SiteDesign | null> {
  if (!isDatabaseConfigured()) return null

  try {
    const rows = await queryDatabase<{
      brand_logo?: string
      brand_name?: string
      brand_tagline?: string
      colors_background?: string
      colors_dark?: string
      colors_primary?: string
      colors_secondary?: string
      contact_email?: string
      contact_phone?: string
      contact_whatsapp?: string
      cta_href?: string
      cta_label?: string
      editable_sections: Record<string, any>
      footer_copyright?: string
      footer_description?: string
      key: string
      motion_enabled?: boolean
      motion_intensity?: string
      navigation_labels_about?: string
      navigation_labels_blog?: string
      navigation_labels_contact?: string
      navigation_labels_home?: string
      navigation_labels_labs?: string
      navigation_labels_projects?: string
      navigation_labels_services?: string
      navigation: Record<string, any>
      radius_card?: number
      radius_control?: number
      social_github?: string
      social_instagram?: string
      social_whatsapp?: string
      social_x?: string
      theme: Record<string, any>
      typography_body?: string
      typography_heading?: string
      typography_logo?: string
    }>(
      `select
        key, theme, navigation, editable_sections,
        brand_name, brand_tagline, brand_logo,
        colors_dark, colors_primary, colors_secondary, colors_background,
        typography_heading, typography_body, typography_logo,
        radius_card, radius_control, motion_enabled, motion_intensity,
        cta_label, cta_href,
        contact_email, contact_phone, contact_whatsapp,
        social_whatsapp, social_x, social_github, social_instagram,
        navigation_labels_home, navigation_labels_services, navigation_labels_projects, navigation_labels_labs,
        navigation_labels_about, navigation_labels_blog, navigation_labels_contact,
        footer_description, footer_copyright
       from site_design
       where key = $1
       limit 1`,
      ['default'],
    )
    const doc = rows[0] ? composeSiteDesignJSON(flattenSiteDesignRow(rows[0]) || {}) : null
    return doc
      ? {
          key: rows[0].key,
          theme: doc.theme || {},
          navigation: doc.navigation || {},
          editableSections: doc.editableSections || {},
        }
      : null
  } catch {
    return null
  }
}

export const getCMSDesign = unstable_cache(getCMSDesignUncached, ['cms-design'], {
  revalidate: CMS_REVALIDATE_SECONDS,
  tags: ['cms-design'],
})

async function getCMSPageUncached(locale: Locale, slug = '/') {
  locale = coerceLocale(locale)
  if (!isDatabaseConfigured()) return null

  try {
    const rows = await queryDatabase<any>(
      `select
        id, locale, slug, title, status, seo, sections, design, template,
        public_path, hero_badge, hero_title, hero_title_highlight, hero_description,
        hero_primary_label, hero_primary_href, hero_secondary_label, hero_secondary_href,
        cta_label, cta_href, cta_secondary_label, cta_secondary_href,
        editor_notes, updated_at, created_at
       from pages
       where locale = $1 and slug = $2 and status = 'published'
       limit 1`,
      [locale, normalizePageSlug(slug)],
    )
    return rows[0] ? normalizePage(rows[0]) : null
  } catch {
    return null
  }
}

export const getCMSPage = unstable_cache(getCMSPageUncached, ['cms-page'], {
  revalidate: CMS_REVALIDATE_SECONDS,
  tags: ['cms-pages'],
})

async function getProjectsUncached(locale: string): Promise<CMSProject[]> {
  locale = coerceLocale(locale)
  const fallback = getStaticProjects(locale)
  if (!isDatabaseConfigured()) return fallback

  try {
    const rows = await queryDatabase<any>(
      `select
        p.id, p.locale, p.cms_key, p.category, p.type, p.featured, p.title,
        p.problem, p.solution, coalesce(pm.url, p.image) as image, p.metrics_label, p.metrics_value, p.link,
        coalesce(
          jsonb_agg(f.feature order by f._order) filter (where f.feature is not null),
          '[]'::jsonb
        ) as features
       from projects p
       left join projects_features f on f._parent_id = p.id
       left join media pm on pm.id = p.image_media_id
       where p.locale = $1
       group by p.id, p.locale, p.cms_key, p.category, p.type, p.featured, p.title,
         p.problem, p.solution, p.image, pm.url, p.metrics_label, p.metrics_value, p.link, p.created_at
       order by p.created_at asc`,
      [locale],
    )
    const projects = rows.map(normalizeProject).filter(Boolean) as CMSProject[]
    return projects.length > 0 ? projects : fallback
  } catch {
    return fallback
  }
}

export const getProjects = unstable_cache(getProjectsUncached, ['cms-projects'], {
  revalidate: CMS_REVALIDATE_SECONDS,
  tags: ['cms-projects'],
})

const getProjectUncached = async (locale: string, id: string): Promise<CMSProject | null> => {
  locale = coerceLocale(locale)
  if (isDatabaseConfigured()) {
    try {
      const rows = await queryDatabase<any>(
        `select
          p.id, p.locale, p.cms_key, p.category, p.type, p.featured, p.title,
          p.problem, p.solution, coalesce(pm.url, p.image) as image, p.metrics_label, p.metrics_value, p.link,
          p.created_at, p.updated_at,
          coalesce(
            jsonb_agg(f.feature order by f._order) filter (where f.feature is not null),
            '[]'::jsonb
          ) as features
         from projects p
         left join projects_features f on f._parent_id = p.id
         left join media pm on pm.id = p.image_media_id
         where p.locale = $1 and (p.id = $2 or p.cms_key = $3)
         group by p.id, p.locale, p.cms_key, p.category, p.type, p.featured, p.title,
           p.problem, p.solution, p.image, pm.url, p.metrics_label, p.metrics_value, p.link, p.created_at, p.updated_at
         limit 1`,
        [locale, id, `${locale}:${id}`],
      )
      if (rows[0]) return normalizeProject(rows[0]) as CMSProject
    } catch {
      // Static fallback below.
    }
  }

  return getStaticProjects(locale).find((project) => project.id === id) || null
}

// Per-request memoized so generateMetadata and the page body (and any other
// double-callers in the same render) share one DB query instead of two.
export const getProject = cache(getProjectUncached)

async function getCMSServiceFAQsUncached(serviceSlug: string, locale: string) {
  if (!isDatabaseConfigured()) return null

  // Whitelist valid FAQ locale tables to prevent SQL injection from string interpolation.
  const validTables: Record<string, string> = {
    en: 'service_faqs_faqs_en',
    ar: 'service_faqs_faqs_ar',
  }
  const table = validTables[locale]
  if (!table) return null

  try {
    const rows = await queryDatabase<{ a: string; q: string }>(
      `select q, a
       from ${table}
       where _parent_id = (select id from service_faqs where service_slug = $1 limit 1)
       order by _order asc`,
      [serviceSlug],
    )
    return rows.length > 0 ? rows : null
  } catch {
    return null
  }
}

export const getCMSServiceFAQs = unstable_cache(getCMSServiceFAQsUncached, ['cms-service-faqs'], {
  revalidate: CMS_REVALIDATE_SECONDS,
  tags: ['cms-service-faqs'],
})

export async function getSiteChrome(locale: Locale, slug = '/'): Promise<SiteChrome> {
  const [baseDictionary, design, page, projects] = await Promise.all([
    getCMSDictionary(locale),
    getCMSDesign(),
    getCMSPage(locale, slug),
    getProjects(locale),
  ])

  const dictionary = page
    ? mergePageIntoDictionary(baseDictionary, page, projects)
    : ({ ...baseDictionary, projects: { ...(baseDictionary as any).projects, projectCards: projects } } as typeof en)
  const navigation = design?.navigation && Object.keys(design.navigation).length > 0
    ? design.navigation
    : buildNavigation(locale, dictionary)

  return {
    dictionary,
    design,
    navigation,
    settings: buildSiteSettings(dictionary),
  }
}

export async function getPageBundle(locale: Locale, slug = '/') {
  const [baseDictionary, design, page, projects] = await Promise.all([
    getCMSDictionary(locale),
    getCMSDesign(),
    getCMSPage(locale, slug),
    getProjects(locale),
  ])

  const dictionary = page
    ? mergePageIntoDictionary(baseDictionary, page, projects)
    : ({ ...baseDictionary, projects: { ...(baseDictionary as any).projects, projectCards: projects } } as typeof en)
  const navigation = design?.navigation && Object.keys(design.navigation).length > 0
    ? design.navigation
    : buildNavigation(locale, dictionary)

  return {
    dictionary,
    design,
    navigation,
    settings: buildSiteSettings(dictionary),
    page,
    projects,
    seo: page?.seo || buildPageSEO(locale, slug, dictionary),
  }
}

async function getPublishedCMSPagesUncached() {
  if (!isDatabaseConfigured()) return []

  try {
    const rows = await queryDatabase<any>(
      `select id, locale, slug, title, status, seo, sections, design, template, public_path,
        updated_at, created_at
       from pages
       where status = 'published'
       order by slug asc`,
    )
    return rows.map(normalizePage)
  } catch {
    return []
  }
}

export const getPublishedCMSPages = unstable_cache(getPublishedCMSPagesUncached, ['cms-published-pages'], {
  revalidate: CMS_REVALIDATE_SECONDS,
  tags: ['cms-pages'],
})

/**
 * Maps a published CMS page row to a sitemap entry.
 *
 * SEO-3: redirect-only / duplicate slugs (currently `blog` and `locations`,
 * with `articles`/`insights`/`markets` reserved for future CMS pages) are
 * filtered OUT by the caller (lib/sitemap-data.ts) BEFORE this runs, so they
 * never reach here. Keep that exclusion list in sync if new redirect slugs are
 * added.
 */
export function pageToSitemapEntry(page: any): MetadataRoute.Sitemap[number] {
  const slug = normalizePageSlug(page.slug)
  const path = slug === '/' ? '/' : `/${slug}`
  const seo = page.seo || {}
  // SEO-5: the `blog` slug is excluded upstream, so the old
  // `slug === 'blog' ? 0.4 : 0.8` branch was unreachable — simplified to root/non-root.
  return {
    url: canonicalUrl(page.locale, path),
    lastModified: page.updatedAt ? new Date(page.updatedAt) : new Date(),
    changeFrequency: slug === '/' ? 'weekly' : 'monthly',
    priority: slug === '/' ? 1 : 0.8,
    alternates: {
      languages: {
        en: canonicalUrl('en', path),
        ar: canonicalUrl('ar', path),
        'x-default': canonicalUrl('en', path),
      },
    },
    ...(seo.ogImage && { images: [seo.ogImage] }),
  }
}

/**
 * Payload stores upload URLs as `/api/media/file/filename.png` but the files
 * are served from `public/uploads/` → `/uploads/filename.png`. Rewrite the
 * URL so Next.js <Image> can resolve it.
 */
function normalizeMediaUrl(url: string | null | undefined): string {
  if (!url) return ''
  const apiPrefix = '/api/media/file/'
  let res = url
  if (url.startsWith(apiPrefix)) {
    res = '/uploads/' + decodeURIComponent(url.slice(apiPrefix.length))
  }
  try {
    return encodeURI(res)
  } catch {
    return res
  }
}

function normalizeProject(project: any): CMSProject | null {
  if (!project) return null
  const publicId =
    typeof project.cmsKey === 'string' && project.cmsKey.includes(':')
      ? project.cmsKey.split(':').slice(1).join(':')
      : typeof project.cms_key === 'string' && project.cms_key.includes(':')
        ? project.cms_key.split(':').slice(1).join(':')
      : project.id

  return {
    id: publicId,
    category: project.category,
    type: project.type,
    featured: Boolean(project.featured),
    title: project.title,
    problem: project.problem,
    solution: project.solution,
    features: Array.isArray(project.features)
      ? project.features
          .map((item: string | { feature?: string }) => (typeof item === 'string' ? item : item.feature))
          .filter(Boolean)
      : [],
    image: normalizeMediaUrl(project.image),
    metrics: {
      label: project.metrics?.label || project.metrics_label || '',
      value: project.metrics?.value || project.metrics_value || '',
    },
    link: project.link || undefined,
    ...(normalizeTimestamp(project.createdAt ?? project.created_at)
      ? { createdAt: normalizeTimestamp(project.createdAt ?? project.created_at) }
      : {}),
    ...(normalizeTimestamp(project.updatedAt ?? project.updated_at)
      ? { updatedAt: normalizeTimestamp(project.updatedAt ?? project.updated_at) }
      : {}),
  }
}

/** Normalizes a DB timestamp (Date or string) to an ISO string, or undefined. */
function normalizeTimestamp(value: unknown): string | undefined {
  if (!value) return undefined
  if (value instanceof Date) return value.toISOString()
  if (typeof value === 'string') {
    const parsed = new Date(value)
    return Number.isNaN(parsed.getTime()) ? undefined : parsed.toISOString()
  }
  return undefined
}

function getStaticProjects(locale: string): CMSProject[] {
  const dictionary = staticDictionaries[locale as Locale] || staticDictionaries.en
  return ((dictionary as any)?.projects?.projectCards || []) as CMSProject[]
}

function normalizePage(page: any) {
  return {
    id: page.id,
    locale: page.locale,
    slug: page.slug,
    title: page.title,
    status: page.status,
    template: page.template,
    publicPath: page.public_path,
    seo: page.seo || {},
    sections: page.sections || {},
    design: page.design || {},
    hero: {
      badge: page.hero_badge,
      title: page.hero_title,
      titleHighlight: page.hero_title_highlight,
      description: page.hero_description,
      primaryLabel: page.hero_primary_label,
      primaryHref: page.hero_primary_href,
      secondaryLabel: page.hero_secondary_label,
      secondaryHref: page.hero_secondary_href,
    },
    cta: {
      label: page.cta_label,
      href: page.cta_href,
      secondaryLabel: page.cta_secondary_label,
      secondaryHref: page.cta_secondary_href,
    },
    editorNotes: page.editor_notes,
    updatedAt: page.updated_at,
    createdAt: page.created_at,
  }
}
