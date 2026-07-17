import 'server-only'
import { unstable_cache } from 'next/cache'
import type { MetadataRoute } from 'next'
import { isDatabaseConfigured, queryDatabase } from '@/lib/cms/db'
import { buildHreflangMap, canonicalUrl } from '@/lib/i18n/url'
import { coerceLocale } from '@/lib/i18n/config'
import { buildTableOfContents, normalizeMediaUrl } from './utils'
import { localizeCategoryName, localizeTagName } from './taxonomy-i18n'
import { filterAndSortBlogPosts, type BlogSearchSort } from './search'

const CMS_REVALIDATE_SECONDS = 60
const locales = ['en', 'ar'] as const

export type BlogMedia = {
  id: number | null
  url: string
  alt: string
  width?: number | null
  height?: number | null
}

export type BlogCategory = {
  id: number
  locale: string
  name: string
  slug: string
  description: string
  shortDescription: string
  icon: string
  color: string
  order: number
  featured: boolean
  showInNavigation: boolean
  postCount: number
  image?: BlogMedia | null
  seo?: BlogSEO
  categoryCTA?: {
    title?: string
    description?: string
    buttonText?: string
    buttonUrl?: string
  }
  relatedServices?: Array<{ label: string; url: string }>
}

export type BlogTag = {
  id: number
  locale: string
  name: string
  slug: string
  description: string
  color: string
  featured: boolean
  postCount: number
  seo?: {
    metaTitle?: string
    metaDescription?: string
  }
}

export type BlogAuthor = {
  id: number
  slug: string
  name: string
  role: string
  bio: string
  shortBio: string
  email?: string
  linkedinUrl?: string
  xUrl?: string
  websiteUrl?: string
  expertise: string[]
  showProfile: boolean
  image?: BlogMedia | null
  sameAs: string[]
  seo?: BlogSEO
}

export type BlogSEO = {
  metaTitle?: string
  metaDescription?: string
  focusKeyword?: string
  secondaryKeywords?: string
  keywords?: string
  canonicalUrl?: string
  ogTitle?: string
  ogDescription?: string
  noIndex?: boolean
  noFollow?: boolean
  ogImage?: BlogMedia | null
  twitterTitle?: string
  twitterDescription?: string
  twitterImage?: BlogMedia | null
  structuredDataType?: string
  faqSchema?: boolean
  breadcrumbSchema?: boolean
  articleSchema?: boolean
  lastModifiedSchema?: boolean
}

export type BlogSeriesSummary = {
  id: number
  title: string
  slug: string
  description: string
}

export type BlogPostSummary = {
  id: number
  locale: string
  title: string
  slug: string
  subtitle: string
  excerpt: string
  shortExcerpt: string
  coverImage: BlogMedia | null
  featuredImageAlt: string
  category: BlogCategory | null
  tags: BlogTag[]
  author: BlogAuthor | null
  series?: BlogSeriesSummary | null
  featured: boolean
  pinned: boolean
  editorPick: boolean
  trending: boolean
  publishedAt: string
  updatedAt: string
  readingTime: number
  wordCount: number
  viewsCount: number
  uniqueViewsCount: number
  contentScore: number
  seoScore: number
  readabilityScore: number
  difficulty?: string
  contentType?: string
  targetAudience?: string
  serviceFocus?: string
  showCTA: boolean
  ctaTitle?: string
  ctaDescription?: string
  ctaButtonText?: string
  ctaButtonUrl?: string
  secondaryCTAButtonText?: string
  secondaryCTAButtonUrl?: string
  relatedServices?: Array<{ label: string; url: string }>
  seo: BlogSEO
}

export type BlogPost = BlogPostSummary & {
  content: unknown
  contentBlocks: unknown
  tableOfContents: boolean
}

export type BlogIndexData = {
  posts: BlogPostSummary[]
  featuredPosts: BlogPostSummary[]
  editorsPicks: BlogPostSummary[]
  popularGuides: BlogPostSummary[]
  caseStudies: BlogPostSummary[]
  latestPosts: BlogPostSummary[]
  categories: BlogCategory[]
  tags: BlogTag[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
  search: string
  activeCategory?: string
  activeTag?: string
  activeContentType?: string
  activeServiceFocus?: string
  sort: string
}

type BlogRow = {
  id: number
  locale: string
  title: string
  slug: string
  subtitle?: string | null
  excerpt: string
  short_excerpt?: string | null
  featured: boolean | null
  pinned: boolean | null
  editor_pick?: boolean | null
  trending?: boolean | null
  published_at: string | null
  updated_at: string
  reading_time: string | number | null
  word_count?: string | number | null
  views_count: string | number | null
  unique_views_count?: string | number | null
  content_score?: string | number | null
  seo_score?: string | number | null
  readability_score?: string | number | null
  difficulty?: string | null
  content_type?: string | null
  target_audience?: string | null
  service_focus?: string | null
  featured_image_alt?: string | null
  show_c_t_a?: boolean | null
  cta_title?: string | null
  cta_description?: string | null
  cta_button_text?: string | null
  cta_button_url?: string | null
  secondary_c_t_a_button_text?: string | null
  secondary_c_t_a_button_url?: string | null
  table_of_contents?: boolean | null
  content?: unknown
  content_blocks?: unknown
  seo_meta_title?: string | null
  seo_meta_description?: string | null
  seo_focus_keyword?: string | null
  seo_secondary_keywords?: string | null
  seo_keywords?: string | null
  seo_canonical_url?: string | null
  seo_og_title?: string | null
  seo_og_description?: string | null
  seo_no_index?: boolean | null
  seo_no_follow?: boolean | null
  seo_twitter_title?: string | null
  seo_twitter_description?: string | null
  seo_structured_data_type?: string | null
  seo_faq_schema?: boolean | null
  seo_breadcrumb_schema?: boolean | null
  seo_article_schema?: boolean | null
  seo_last_modified_schema?: boolean | null
  cover_id?: number | null
  cover_url?: string | null
  cover_alt?: string | null
  cover_width?: string | number | null
  cover_height?: string | number | null
  og_image_id?: number | null
  og_image_url?: string | null
  og_image_alt?: string | null
  og_image_width?: string | number | null
  og_image_height?: string | number | null
  twitter_image_id?: number | null
  twitter_image_url?: string | null
  twitter_image_alt?: string | null
  twitter_image_width?: string | number | null
  twitter_image_height?: string | number | null
  category_id?: number | null
  category_locale?: string | null
  category_name?: string | null
  category_slug?: string | null
  category_description?: string | null
  category_short_description?: string | null
  category_icon?: string | null
  category_color?: string | null
  category_order?: string | number | null
  category_featured?: boolean | null
  category_show_in_navigation?: boolean | null
  category_cta_title?: string | null
  category_cta_description?: string | null
  category_cta_button_text?: string | null
  category_cta_button_url?: string | null
  author_id?: number | null
  author_slug?: string | null
  author_name?: string | null
  author_role?: string | null
  author_bio?: string | null
  author_short_bio?: string | null
  author_email?: string | null
  author_linkedin_url?: string | null
  author_x_url?: string | null
  author_website_url?: string | null
  author_show_profile?: boolean | null
  author_image_id?: number | null
  author_image_url?: string | null
  author_image_alt?: string | null
  author_same_as?: unknown
  author_expertise?: unknown
  series_id?: number | null
  series_title?: string | null
  series_slug?: string | null
  series_description?: string | null
  tags?: unknown
  related_services?: unknown
  category_related_services?: unknown
}

function localeColumns(locale: string) {
  const safeLocale = locales.includes(locale as any) ? locale : 'en'
  return {
    role: `role_${safeLocale}`,
    bio: `bio_${safeLocale}`,
  }
}

function numberValue(value: unknown, fallback = 0) {
  const number = Number(value)
  return Number.isFinite(number) ? number : fallback
}

function mediaFromRow(prefix: string, row: Record<string, unknown>): BlogMedia | null {
  const url = normalizeMediaUrl(row[`${prefix}_url`] as string | null | undefined)
  if (!url) return null

  return {
    id: numberValue(row[`${prefix}_id`], 0) || null,
    url,
    alt: String(row[`${prefix}_alt`] || ''),
    width: row[`${prefix}_width`] == null ? null : numberValue(row[`${prefix}_width`]),
    height: row[`${prefix}_height`] == null ? null : numberValue(row[`${prefix}_height`]),
  }
}

function normalizeTags(tags: unknown, postLocale: string): BlogTag[] {
  if (!Array.isArray(tags)) return []

  return tags
    .map((tag: any) => ({
      id: numberValue(tag.id),
      locale: String(tag.locale || 'en'),
      // Tags are English-only rows joined by id; show the Arabic name on
      // Arabic posts (the article-card tag chips).
      name: localizeTagName(String(tag.slug || ''), String(tag.name || ''), postLocale),
      slug: String(tag.slug || ''),
      description: String(tag.description || ''),
      color: String(tag.color || '#0284c7'),
      featured: Boolean(tag.featured),
      postCount: numberValue(tag.postCount),
      seo: {
        metaTitle: tag.seoTitle || undefined,
        metaDescription: tag.seoDescription || undefined,
      },
    }))
    .filter((tag) => tag.id && tag.name && tag.slug)
}

function normalizeRelatedServices(value: unknown): Array<{ label: string; url: string }> {
  if (!Array.isArray(value)) return []
  return value
    .map((item: any) => ({
      label: String(item.label || ''),
      url: String(item.url || ''),
    }))
    .filter((item) => item.label && item.url)
}

function normalizeStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return value.map(String).filter(Boolean)
}

function collectMediaIdsFromBlocks(blocks: unknown): number[] {
  if (!Array.isArray(blocks)) return []
  const ids = new Set<number>()
  for (const block of blocks) {
    if (!block || typeof block !== 'object') continue
    const item = block as Record<string, unknown>
    for (const key of ['image', 'file']) {
      const value = item[key]
      if (typeof value === 'number') ids.add(value)
      if (typeof value === 'string' && /^\d+$/.test(value)) ids.add(Number(value))
    }
  }
  return [...ids]
}

async function hydrateContentBlocks(blocks: unknown): Promise<unknown> {
  if (!Array.isArray(blocks)) return blocks
  const ids = collectMediaIdsFromBlocks(blocks)
  if (ids.length === 0) return blocks

  const rows = await queryDatabase<any>(
    `select id, url, alt, width, height from media where id = any($1::int[])`,
    [ids],
  )
  const media = new Map(rows.map((row) => [numberValue(row.id), row]))

  return blocks.map((block) => {
    if (!block || typeof block !== 'object') return block
    const next = { ...(block as Record<string, unknown>) }
    for (const key of ['image', 'file']) {
      const value = next[key]
      const id = typeof value === 'number' ? value : typeof value === 'string' && /^\d+$/.test(value) ? Number(value) : null
      if (id && media.has(id)) {
        const row = media.get(id)
        next[key] = {
          id,
          url: normalizeMediaUrl(row.url),
          alt: row.alt || '',
          width: row.width == null ? null : numberValue(row.width),
          height: row.height == null ? null : numberValue(row.height),
        }
      }
    }
    return next
  })
}

function normalizePostRow(row: BlogRow): BlogPostSummary {
  const category =
    row.category_id && row.category_name && row.category_slug
      ? {
          id: numberValue(row.category_id),
          locale: String(row.category_locale || row.locale || 'en'),
          // Categories are English-only and joined by id; show the Arabic name
          // on Arabic posts (the article-card pill + detail hero pill).
          name: localizeCategoryName(row.category_slug, row.category_name, String(row.locale || 'en')),
          slug: row.category_slug,
          description: row.category_description || '',
          shortDescription: row.category_short_description || '',
          icon: row.category_icon || '',
          color: row.category_color || '#0284c7',
          order: numberValue(row.category_order),
          featured: Boolean(row.category_featured),
          showInNavigation: row.category_show_in_navigation !== false,
          postCount: 0,
          image: null,
          categoryCTA: {
            title: row.category_cta_title || undefined,
            description: row.category_cta_description || undefined,
            buttonText: row.category_cta_button_text || undefined,
            buttonUrl: row.category_cta_button_url || undefined,
          },
          relatedServices: normalizeRelatedServices(row.category_related_services),
        }
      : null

  const author =
    row.author_id && row.author_name
      ? {
          id: numberValue(row.author_id),
          slug: row.author_slug || '',
          name: row.author_name,
          role: row.author_role || '',
          bio: row.author_bio || '',
          shortBio: row.author_short_bio || '',
          email: row.author_email || undefined,
          linkedinUrl: row.author_linkedin_url || undefined,
          xUrl: row.author_x_url || undefined,
          websiteUrl: row.author_website_url || undefined,
          expertise: normalizeStringArray(row.author_expertise),
          showProfile: row.author_show_profile !== false,
          image: mediaFromRow('author_image', row as Record<string, unknown>),
          sameAs: Array.isArray(row.author_same_as) ? row.author_same_as.map(String) : [],
        }
      : null

  const series =
    row.series_id && row.series_title && row.series_slug
      ? {
          id: numberValue(row.series_id),
          title: row.series_title,
          slug: row.series_slug,
          description: row.series_description || '',
        }
      : null

  return {
    id: numberValue(row.id),
    locale: row.locale,
    title: row.title,
    slug: row.slug,
    subtitle: row.subtitle || '',
    excerpt: row.excerpt,
    shortExcerpt: row.short_excerpt || '',
    coverImage: mediaFromRow('cover', row as Record<string, unknown>),
    featuredImageAlt: row.featured_image_alt || '',
    category,
    tags: normalizeTags(row.tags, String(row.locale || 'en')),
    author,
    series,
    featured: Boolean(row.featured),
    pinned: Boolean(row.pinned),
    editorPick: Boolean(row.editor_pick),
    trending: Boolean(row.trending),
    publishedAt: row.published_at || row.updated_at,
    updatedAt: row.updated_at,
    readingTime: numberValue(row.reading_time, 1),
    wordCount: numberValue(row.word_count),
    viewsCount: numberValue(row.views_count),
    uniqueViewsCount: numberValue(row.unique_views_count),
    contentScore: numberValue(row.content_score),
    seoScore: numberValue(row.seo_score),
    readabilityScore: numberValue(row.readability_score),
    difficulty: row.difficulty || undefined,
    contentType: row.content_type || undefined,
    targetAudience: row.target_audience || undefined,
    serviceFocus: row.service_focus || undefined,
    showCTA: row.show_c_t_a !== false,
    ctaTitle: row.cta_title || undefined,
    ctaDescription: row.cta_description || undefined,
    ctaButtonText: row.cta_button_text || undefined,
    ctaButtonUrl: row.cta_button_url || undefined,
    secondaryCTAButtonText: row.secondary_c_t_a_button_text || undefined,
    secondaryCTAButtonUrl: row.secondary_c_t_a_button_url || undefined,
    relatedServices: normalizeRelatedServices(row.related_services),
    seo: {
      metaTitle: row.seo_meta_title || undefined,
      metaDescription: row.seo_meta_description || undefined,
      focusKeyword: row.seo_focus_keyword || undefined,
      secondaryKeywords: row.seo_secondary_keywords || undefined,
      keywords: row.seo_keywords || undefined,
      canonicalUrl: row.seo_canonical_url || undefined,
      ogTitle: row.seo_og_title || undefined,
      ogDescription: row.seo_og_description || undefined,
      noIndex: Boolean(row.seo_no_index),
      noFollow: Boolean(row.seo_no_follow),
      ogImage: mediaFromRow('og_image', row as Record<string, unknown>),
      twitterTitle: row.seo_twitter_title || undefined,
      twitterDescription: row.seo_twitter_description || undefined,
      twitterImage: mediaFromRow('twitter_image', row as Record<string, unknown>),
      structuredDataType: row.seo_structured_data_type || undefined,
      faqSchema: row.seo_faq_schema !== false,
      breadcrumbSchema: row.seo_breadcrumb_schema !== false,
      articleSchema: row.seo_article_schema !== false,
      lastModifiedSchema: row.seo_last_modified_schema !== false,
    },
  }
}

async function getPublishedBlogPostsUncached(locale: string): Promise<BlogPostSummary[]> {
  locale = coerceLocale(locale)
  if (!isDatabaseConfigured()) return []

  const columns = localeColumns(locale)

  try {
    const rows = await queryDatabase<BlogRow>(
      `select
        p.id, p.locale, p.title, p.slug, p.subtitle, p.excerpt, p.short_excerpt,
        p.featured, p.pinned, p.editor_pick, p.trending,
        p.published_at, p.updated_at, p.reading_time, p.word_count,
        p.views_count, p.unique_views_count, p.content_score, p.seo_score,
        p.readability_score, p.difficulty::text as difficulty,
        p.content_type::text as content_type, p.target_audience::text as target_audience,
        p.service_focus::text as service_focus, p.featured_image_alt,
        p.show_c_t_a, p.cta_title, p.cta_description, p.cta_button_text,
        p.cta_button_url, p.secondary_c_t_a_button_text, p.secondary_c_t_a_button_url,
        p.seo_meta_title, p.seo_meta_description, p.seo_focus_keyword,
        p.seo_secondary_keywords, p.seo_keywords, p.seo_canonical_url,
        p.seo_og_title, p.seo_og_description, p.seo_no_index, p.seo_no_follow,
        p.seo_twitter_title, p.seo_twitter_description,
        p.seo_structured_data_type::text as seo_structured_data_type,
        p.seo_faq_schema, p.seo_breadcrumb_schema, p.seo_article_schema,
        p.seo_last_modified_schema,
        cover.id as cover_id, cover.url as cover_url, cover.alt as cover_alt,
        cover.width as cover_width, cover.height as cover_height,
        og.id as og_image_id, og.url as og_image_url, og.alt as og_image_alt,
        og.width as og_image_width, og.height as og_image_height,
        twitter.id as twitter_image_id, twitter.url as twitter_image_url,
        twitter.alt as twitter_image_alt, twitter.width as twitter_image_width,
        twitter.height as twitter_image_height,
        c.id as category_id, c.locale as category_locale, c.name as category_name,
        c.slug as category_slug, c.description as category_description,
        c.short_description as category_short_description,
        c.icon as category_icon, c.color as category_color, c."order" as category_order,
        c.featured as category_featured, c.show_in_navigation as category_show_in_navigation,
        c.category_c_t_a_title as category_cta_title,
        c.category_c_t_a_description as category_cta_description,
        c.category_c_t_a_button_text as category_cta_button_text,
        c.category_c_t_a_button_url as category_cta_button_url,
        a.id as author_id, a.slug as author_slug, a.name as author_name,
        a.${columns.role} as author_role, a.${columns.bio} as author_bio,
        a.short_bio as author_short_bio, a.email as author_email,
        a.linkedin_url as author_linkedin_url, a.x_url as author_x_url,
        a.website_url as author_website_url, a.show_profile as author_show_profile,
        author_image.id as author_image_id, author_image.url as author_image_url,
        author_image.alt as author_image_alt,
        s.id as series_id, s.title as series_title, s.slug as series_slug,
        s.description as series_description,
        coalesce(
          jsonb_agg(distinct asa.url) filter (where asa.url is not null),
          '[]'::jsonb
        ) as author_same_as,
        coalesce(
          jsonb_agg(distinct ae.area) filter (where ae.area is not null),
          '[]'::jsonb
        ) as author_expertise,
        coalesce(
          jsonb_agg(
            distinct jsonb_build_object(
              'id', t.id,
              'locale', t.locale,
              'name', t.name,
              'slug', t.slug,
              'description', t.description,
              'color', t.color,
              'featured', t.featured,
              'seoTitle', t.seo_title,
              'seoDescription', t.seo_description
            )
          ) filter (where t.id is not null),
          '[]'::jsonb
        ) as tags,
        coalesce(
          jsonb_agg(distinct jsonb_build_object('label', prs.label, 'url', prs.url))
            filter (where prs.id is not null),
          '[]'::jsonb
        ) as related_services,
        coalesce(
          jsonb_agg(distinct jsonb_build_object('label', crs.label, 'url', crs.url))
            filter (where crs.id is not null),
          '[]'::jsonb
        ) as category_related_services
       from blog_posts p
       left join media cover on cover.id = p.cover_image_id
       left join media og on og.id = p.seo_og_image_id
       left join media twitter on twitter.id = p.seo_twitter_image_id
       left join blog_categories c on c.id = p.category_id
       left join blog_categories_related_services crs on crs._parent_id = c.id
       left join authors a on a.id = p.author_id
       left join media author_image on author_image.id = a.image_id
       left join authors_same_as asa on asa._parent_id = a.id
       left join authors_expertise ae on ae._parent_id = a.id
       left join blog_series s on s.id = p.series_id
       left join blog_posts_related_services prs on prs._parent_id = p.id
       left join blog_posts_rels tag_rel on tag_rel.parent_id = p.id and tag_rel.path = 'tags'
       left join blog_tags t on t.id = tag_rel.blog_tags_id
       where p.status = 'published' and p.locale = $1
       group by
        p.id, cover.id, og.id, twitter.id, c.id, a.id, author_image.id, s.id
       order by p.pinned desc, p.featured desc, p.published_at desc nulls last, p.created_at desc`,
      [locale],
    )
    return rows.map(normalizePostRow)
  } catch (error) {
    console.error('getPublishedBlogPostsUncached Error:', error)
    return []
  }
}

export const getPublishedBlogPosts = unstable_cache(getPublishedBlogPostsUncached, ['cms-blog-posts'], {
  revalidate: CMS_REVALIDATE_SECONDS,
  tags: ['cms-blog'],
})

async function getBlogPostUncached(locale: string, slug: string): Promise<BlogPost | null> {
  locale = coerceLocale(locale)
  if (!isDatabaseConfigured()) return null

  const columns = localeColumns(locale)

  try {
    const rows = await queryDatabase<BlogRow>(
      `select
        p.id, p.locale, p.title, p.slug, p.subtitle, p.excerpt, p.short_excerpt,
        p.content, p.content_blocks, p.featured, p.pinned, p.editor_pick,
        p.trending, p.published_at, p.updated_at, p.reading_time, p.word_count,
        p.views_count, p.unique_views_count, p.content_score, p.seo_score,
        p.readability_score, p.difficulty::text as difficulty,
        p.content_type::text as content_type, p.target_audience::text as target_audience,
        p.service_focus::text as service_focus, p.featured_image_alt,
        p.show_c_t_a, p.cta_title, p.cta_description, p.cta_button_text,
        p.cta_button_url, p.secondary_c_t_a_button_text, p.secondary_c_t_a_button_url,
        p.table_of_contents,
        p.seo_meta_title, p.seo_meta_description, p.seo_focus_keyword,
        p.seo_secondary_keywords, p.seo_keywords, p.seo_canonical_url,
        p.seo_og_title, p.seo_og_description, p.seo_no_index, p.seo_no_follow,
        p.seo_twitter_title, p.seo_twitter_description,
        p.seo_structured_data_type::text as seo_structured_data_type,
        p.seo_faq_schema, p.seo_breadcrumb_schema, p.seo_article_schema,
        p.seo_last_modified_schema,
        cover.id as cover_id, cover.url as cover_url, cover.alt as cover_alt,
        cover.width as cover_width, cover.height as cover_height,
        og.id as og_image_id, og.url as og_image_url, og.alt as og_image_alt,
        og.width as og_image_width, og.height as og_image_height,
        twitter.id as twitter_image_id, twitter.url as twitter_image_url,
        twitter.alt as twitter_image_alt, twitter.width as twitter_image_width,
        twitter.height as twitter_image_height,
        c.id as category_id, c.locale as category_locale, c.name as category_name,
        c.slug as category_slug, c.description as category_description,
        c.short_description as category_short_description,
        c.icon as category_icon, c.color as category_color, c."order" as category_order,
        c.featured as category_featured, c.show_in_navigation as category_show_in_navigation,
        c.category_c_t_a_title as category_cta_title,
        c.category_c_t_a_description as category_cta_description,
        c.category_c_t_a_button_text as category_cta_button_text,
        c.category_c_t_a_button_url as category_cta_button_url,
        a.id as author_id, a.slug as author_slug, a.name as author_name,
        a.${columns.role} as author_role, a.${columns.bio} as author_bio,
        a.short_bio as author_short_bio, a.email as author_email,
        a.linkedin_url as author_linkedin_url, a.x_url as author_x_url,
        a.website_url as author_website_url, a.show_profile as author_show_profile,
        author_image.id as author_image_id, author_image.url as author_image_url,
        author_image.alt as author_image_alt,
        s.id as series_id, s.title as series_title, s.slug as series_slug,
        s.description as series_description,
        coalesce(
          jsonb_agg(distinct asa.url) filter (where asa.url is not null),
          '[]'::jsonb
        ) as author_same_as,
        coalesce(
          jsonb_agg(distinct ae.area) filter (where ae.area is not null),
          '[]'::jsonb
        ) as author_expertise,
        coalesce(
          jsonb_agg(
            distinct jsonb_build_object(
              'id', t.id,
              'locale', t.locale,
              'name', t.name,
              'slug', t.slug,
              'description', t.description,
              'color', t.color,
              'featured', t.featured,
              'seoTitle', t.seo_title,
              'seoDescription', t.seo_description
            )
          ) filter (where t.id is not null),
          '[]'::jsonb
        ) as tags,
        coalesce(
          jsonb_agg(distinct jsonb_build_object('label', prs.label, 'url', prs.url))
            filter (where prs.id is not null),
          '[]'::jsonb
        ) as related_services,
        coalesce(
          jsonb_agg(distinct jsonb_build_object('label', crs.label, 'url', crs.url))
            filter (where crs.id is not null),
          '[]'::jsonb
        ) as category_related_services
       from blog_posts p
       left join media cover on cover.id = p.cover_image_id
       left join media og on og.id = p.seo_og_image_id
       left join media twitter on twitter.id = p.seo_twitter_image_id
       left join blog_categories c on c.id = p.category_id
       left join blog_categories_related_services crs on crs._parent_id = c.id
       left join authors a on a.id = p.author_id
       left join media author_image on author_image.id = a.image_id
       left join authors_same_as asa on asa._parent_id = a.id
       left join authors_expertise ae on ae._parent_id = a.id
       left join blog_series s on s.id = p.series_id
       left join blog_posts_related_services prs on prs._parent_id = p.id
       left join blog_posts_rels tag_rel on tag_rel.parent_id = p.id and tag_rel.path = 'tags'
       left join blog_tags t on t.id = tag_rel.blog_tags_id
       where p.status = 'published' and p.locale = $1 and p.slug = $2
       group by
        p.id, cover.id, og.id, twitter.id, c.id, a.id, author_image.id, s.id
       limit 1`,
      [locale, slug],
    )

    if (!rows[0]) return null
    const contentBlocks = await hydrateContentBlocks(rows[0].content_blocks)
    return {
      ...normalizePostRow(rows[0]),
      content: rows[0].content,
      contentBlocks,
      tableOfContents: rows[0].table_of_contents !== false,
    }
  } catch {
    return null
  }
}

export const getBlogPost = unstable_cache(getBlogPostUncached, ['cms-blog-post'], {
  revalidate: CMS_REVALIDATE_SECONDS,
  tags: ['cms-blog'],
})

async function getBlogCategoriesUncached(locale: string): Promise<BlogCategory[]> {
  locale = coerceLocale(locale)
  if (!isDatabaseConfigured()) return []

  try {
    const rows = await queryDatabase<any>(
      `select
        c.id, c.locale, c.name, c.slug, c.description, c.short_description,
        c.icon, c.color, c."order", c.featured, c.show_in_navigation,
        c.category_c_t_a_title, c.category_c_t_a_description,
        c.category_c_t_a_button_text, c.category_c_t_a_button_url,
        c.seo_meta_title, c.seo_meta_description, c.seo_keywords,
        c.seo_canonical_url, c.seo_no_index,
        image.id as image_id, image.url as image_url, image.alt as image_alt,
        image.width as image_width, image.height as image_height,
        og.id as og_image_id, og.url as og_image_url, og.alt as og_image_alt,
        count(distinct p.id)::int as post_count,
        coalesce(
          jsonb_agg(distinct jsonb_build_object('label', crs.label, 'url', crs.url))
            filter (where crs.id is not null),
          '[]'::jsonb
        ) as related_services
       from blog_categories c
       left join media image on image.id = c.image_id
       left join media og on og.id = c.seo_og_image_id
       left join blog_categories_related_services crs on crs._parent_id = c.id
       left join blog_posts p on p.category_id = c.id and p.status = 'published' and p.locale::text = $1
       -- Source the canonical (English) category set for every locale — there
       -- are no Arabic category rows, so filtering by $1 returned 0 on /ar and
       -- left the nav/grid empty. Names are localized in code (taxonomy-i18n).
       -- The post-count join above still filters by the requested locale.
       where c.locale::text = 'en'
       group by c.id, image.id, og.id
       order by c."order" asc, c.name asc`,
      [locale],
    )

    return rows.map((row) => ({
      id: numberValue(row.id),
      locale: row.locale,
      name: localizeCategoryName(row.slug, row.name, locale),
      slug: row.slug,
      description: row.description || '',
      shortDescription: row.short_description || '',
      icon: row.icon || '',
      color: row.color || '#0284c7',
      order: numberValue(row.order),
      featured: Boolean(row.featured),
      showInNavigation: row.show_in_navigation !== false,
      postCount: numberValue(row.post_count),
      image: mediaFromRow('image', row),
      categoryCTA: {
        title: row.category_c_t_a_title || undefined,
        description: row.category_c_t_a_description || undefined,
        buttonText: row.category_c_t_a_button_text || undefined,
        buttonUrl: row.category_c_t_a_button_url || undefined,
      },
      relatedServices: normalizeRelatedServices(row.related_services),
      seo: {
        metaTitle: row.seo_meta_title || undefined,
        metaDescription: row.seo_meta_description || undefined,
        keywords: row.seo_keywords || undefined,
        canonicalUrl: row.seo_canonical_url || undefined,
        noIndex: Boolean(row.seo_no_index),
        ogImage: mediaFromRow('og_image', row),
      },
    }))
  } catch {
    return []
  }
}

export const getBlogCategories = unstable_cache(getBlogCategoriesUncached, ['cms-blog-categories'], {
  revalidate: CMS_REVALIDATE_SECONDS,
  tags: ['cms-blog'],
})

async function getBlogTagsUncached(locale: string): Promise<BlogTag[]> {
  locale = coerceLocale(locale)
  if (!isDatabaseConfigured()) return []

  try {
    const rows = await queryDatabase<any>(
      `select
        t.id, t.locale, t.name, t.slug, t.description, t.color, t.featured,
        t.seo_title, t.seo_description,
        count(distinct p.id)::int as post_count
       from blog_tags t
       left join blog_posts_rels rel on rel.blog_tags_id = t.id and rel.path = 'tags'
       left join blog_posts p on p.id = rel.parent_id and p.status = 'published' and p.locale::text = $1
       -- Canonical (English) tag set for every locale; names are localized in
       -- code (taxonomy-i18n). Post counts still filter by the requested locale.
       where t.locale::text = 'en'
       group by t.id
       order by post_count desc, t.name asc`,
      [locale],
    )

    return rows.map((row) => ({
      id: numberValue(row.id),
      locale: row.locale,
      name: localizeTagName(row.slug, row.name, locale),
      slug: row.slug,
      description: row.description || '',
      color: row.color || '#0284c7',
      featured: Boolean(row.featured),
      postCount: numberValue(row.post_count),
      seo: {
        metaTitle: row.seo_title || undefined,
        metaDescription: row.seo_description || undefined,
      },
    }))
  } catch {
    return []
  }
}

export const getBlogTags = unstable_cache(getBlogTagsUncached, ['cms-blog-tags'], {
  revalidate: CMS_REVALIDATE_SECONDS,
  tags: ['cms-blog'],
})

export function filterBlogPosts(
  posts: BlogPostSummary[],
  options: { search?: string; category?: string; tag?: string; contentType?: string; serviceFocus?: string; sort?: BlogSearchSort | string },
) {
  return filterAndSortBlogPosts(posts, options)
}

export async function getBlogIndexData({
  locale,
  page = 1,
  limit = 9,
  search = '',
  category,
  tag,
  contentType,
  serviceFocus,
  sort = 'latest',
}: {
  locale: string
  page?: number
  limit?: number
  search?: string
  category?: string
  tag?: string
  contentType?: string
  serviceFocus?: string
  sort?: BlogSearchSort | string
}): Promise<BlogIndexData> {
  const [allPosts, categories, tags] = await Promise.all([
    getPublishedBlogPosts(locale),
    getBlogCategories(locale),
    getBlogTags(locale),
  ])

  const featuredPosts = filterAndSortBlogPosts(allPosts.filter((post) => post.pinned || post.featured), { sort: 'featured' }).slice(0, 4)
  const editorsPicks = filterAndSortBlogPosts(allPosts.filter((post) => post.editorPick), { sort: 'latest' }).slice(0, 6)
  const popularGuides = filterAndSortBlogPosts(allPosts, { sort: 'popular' })
    .filter((post) => post.contentType === 'guide' || post.trending)
    .slice(0, 5)
  const caseStudies = filterAndSortBlogPosts(allPosts, { contentType: 'case_study', sort: 'latest' }).slice(0, 3)
  const filtered = filterBlogPosts(allPosts, { search, category, tag, contentType, serviceFocus, sort })
  const totalPages = Math.max(1, Math.ceil(filtered.length / limit))
  const safePage = Math.min(Math.max(1, page), totalPages)
  const start = (safePage - 1) * limit

  return {
    posts: allPosts,
    featuredPosts,
    editorsPicks,
    popularGuides,
    caseStudies,
    latestPosts: filtered.slice(start, start + limit),
    categories,
    tags,
    pagination: {
      page: safePage,
      limit,
      total: filtered.length,
      totalPages,
    },
    search,
    activeCategory: category,
    activeTag: tag,
    activeContentType: contentType,
    activeServiceFocus: serviceFocus,
    sort,
  }
}

export async function getRelatedBlogPosts(post: BlogPost, limit = 3): Promise<BlogPostSummary[]> {
  if (!isDatabaseConfigured()) return []

  try {
    const manualRows = await queryDatabase<{ blog_posts_id: number }>(
      `select blog_posts_id from blog_posts_rels
       where parent_id = $1 and path = 'relatedPosts' and blog_posts_id is not null
       order by "order" asc`,
      [post.id],
    )

    const allPosts = await getPublishedBlogPosts(post.locale)
    const manualIds = manualRows.map((row) => row.blog_posts_id)
    const manual = manualIds
      .map((id) => allPosts.find((candidate) => candidate.id === id))
      .filter((candidate): candidate is BlogPostSummary => Boolean(candidate))

    if (manual.length >= limit) return manual.slice(0, limit)

    const categoryMatches = allPosts.filter(
      (candidate) =>
        candidate.id !== post.id &&
        candidate.category?.slug &&
        candidate.category.slug === post.category?.slug &&
        !manual.some((manualPost) => manualPost.id === candidate.id),
    )

    const fallbackPosts = allPosts.filter(
      (candidate) =>
        candidate.id !== post.id &&
        !manual.some((manualPost) => manualPost.id === candidate.id) &&
        !categoryMatches.some((categoryPost) => categoryPost.id === candidate.id),
    )

    return [...manual, ...categoryMatches, ...fallbackPosts].slice(0, limit)
  } catch {
    return []
  }
}

async function getBlogAuthorsUncached(locale: string): Promise<BlogAuthor[]> {
  locale = coerceLocale(locale)
  if (!isDatabaseConfigured()) return []

  const columns = localeColumns(locale)

  try {
    const rows = await queryDatabase<any>(
      `select
        a.id, a.slug, a.name, a.${columns.role} as role, a.${columns.bio} as bio,
        a.short_bio, a.email, a.linkedin_url, a.x_url, a.website_url,
        a.show_profile, a.author_s_e_o_meta_title, a.author_s_e_o_meta_description,
        a.author_s_e_o_no_index,
        image.id as image_id, image.url as image_url, image.alt as image_alt,
        image.width as image_width, image.height as image_height,
        og.id as og_image_id, og.url as og_image_url, og.alt as og_image_alt,
        coalesce(jsonb_agg(distinct asa.url) filter (where asa.url is not null), '[]'::jsonb) as same_as,
        coalesce(jsonb_agg(distinct ae.area) filter (where ae.area is not null), '[]'::jsonb) as expertise
       from authors a
       left join media image on image.id = a.image_id
       left join media og on og.id = a.author_s_e_o_og_image_id
       left join authors_same_as asa on asa._parent_id = a.id
       left join authors_expertise ae on ae._parent_id = a.id
       where a.show_profile is distinct from false
       group by a.id, image.id, og.id
       order by a.name asc`,
      [],
    )

    return rows.map((row) => ({
      id: numberValue(row.id),
      slug: row.slug,
      name: row.name,
      role: row.role || '',
      bio: row.bio || '',
      shortBio: row.short_bio || '',
      email: row.email || undefined,
      linkedinUrl: row.linkedin_url || undefined,
      xUrl: row.x_url || undefined,
      websiteUrl: row.website_url || undefined,
      expertise: normalizeStringArray(row.expertise),
      showProfile: row.show_profile !== false,
      image: mediaFromRow('image', row),
      sameAs: normalizeStringArray(row.same_as),
      seo: {
        metaTitle: row.author_s_e_o_meta_title || undefined,
        metaDescription: row.author_s_e_o_meta_description || undefined,
        noIndex: Boolean(row.author_s_e_o_no_index),
        ogImage: mediaFromRow('og_image', row),
      },
    }))
  } catch {
    return []
  }
}

export const getBlogAuthors = unstable_cache(getBlogAuthorsUncached, ['cms-blog-authors'], {
  revalidate: CMS_REVALIDATE_SECONDS,
  tags: ['cms-blog'],
})

export async function getBlogAuthor(locale: string, slug: string): Promise<BlogAuthor | null> {
  const authors = await getBlogAuthors(locale)
  return authors.find((author) => author.slug === slug) || null
}

export async function getAuthorBlogPosts(locale: string, slug: string): Promise<BlogPostSummary[]> {
  const posts = await getPublishedBlogPosts(locale)
  return posts.filter((post) => post.author?.slug === slug)
}

export async function getPreviousNextPosts(post: BlogPost) {
  const allPosts = await getPublishedBlogPosts(post.locale)
  const seriesPosts = post.series?.id ? allPosts.filter((candidate) => candidate.series?.id === post.series?.id) : []
  const posts = filterAndSortBlogPosts(seriesPosts.length > 1 ? seriesPosts : allPosts, { sort: 'latest' })
  const index = posts.findIndex((candidate) => candidate.id === post.id)
  return {
    previous: index >= 0 ? posts[index + 1] || null : null,
    next: index > 0 ? posts[index - 1] || null : null,
  }
}

export function getArticleToc(post: BlogPost) {
  return post.tableOfContents ? buildTableOfContents(post.content) : []
}

export async function getBlogSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const entries: MetadataRoute.Sitemap = []

  const perLocale = await Promise.all(
    locales.map(async (locale) => {
      const [posts, categories, tags, authors] = await Promise.all([
        getPublishedBlogPosts(locale),
        getBlogCategories(locale),
        getBlogTags(locale),
        getBlogAuthors(locale),
      ])
      return { locale, posts, categories, tags, authors }
    }),
  )

  // Taxonomy slugs that actually render per locale (postCount > 0). A
  // category/tag page only earns full reciprocal hreflang alternates when
  // EVERY locale has posts under that slug; otherwise the alternate would
  // point at an empty/404 listing.
  // Post slugs present per locale. Unlike taxonomy pages (which resolve for any
  // locale off the shared English set), a post is a per-locale row — so a slug
  // with no twin in the other locale 404s there, and its sitemap entry must not
  // advertise that locale as an alternate.
  const postSlugsByLocale = new Map(
    perLocale.map(({ locale, posts }) => [locale, new Set(posts.map((p) => p.slug))]),
  )
  const categorySlugsByLocale = new Map(
    perLocale.map(({ locale, categories }) => [
      locale,
      new Set(categories.filter((c) => c.postCount > 0).map((c) => c.slug)),
    ]),
  )
  const tagSlugsByLocale = new Map(
    perLocale.map(({ locale, tags }) => [
      locale,
      new Set(tags.filter((t) => t.postCount > 0).map((t) => t.slug)),
    ]),
  )

  for (const { locale, posts, categories, tags, authors } of perLocale) {
    // Stable lastmod for the listing + taxonomy: the newest post date in this
    // locale, not `new Date()` (which churned the timestamp on every crawl and
    // made Google distrust the freshness signal).
    const newest = posts.reduce((m, p) => {
      const d = p.updatedAt ? new Date(p.updatedAt) : (p.publishedAt ? new Date(p.publishedAt) : null)
      return d && !isNaN(d.getTime()) && d > m ? d : m
    }, new Date(0))
    const freshness = newest.getTime() > 0 ? newest : new Date()

    entries.push({
      url: canonicalUrl(locale, '/articles'),
      lastModified: freshness,
      changeFrequency: 'weekly',
      priority: 0.85,
      alternates: { languages: buildHreflangMap('/articles') },
    })

    posts.forEach((post) => {
      const postPath = `/articles/${post.slug}`
      // Only advertise the other locale when the twin post actually exists,
      // otherwise the alternate points at a 404 (posts are per-locale rows).
      const inAllLocales = locales.every((loc) => postSlugsByLocale.get(loc)?.has(post.slug))
      entries.push({
        url: canonicalUrl(locale, postPath),
        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(post.publishedAt),
        changeFrequency: 'monthly',
        priority: post.pinned || post.featured ? 0.8 : 0.7,
        alternates: {
          languages: inAllLocales
            ? buildHreflangMap(postPath)
            : { [locale]: canonicalUrl(locale, postPath), 'x-default': canonicalUrl(locale, postPath) },
        },
        ...(post.coverImage?.url && {
          images: [post.coverImage.url.startsWith('http') ? post.coverImage.url : canonicalUrl('en', post.coverImage.url)],
        }),
      })
    })

    categories
      .filter((category) => category.postCount > 0)
      .forEach((category) => {
        const taxPath = `/articles/category/${category.slug}`
        // Full reciprocal alternates only when the slug has posts in every
        // locale (matches how posts/authors are emitted); otherwise the page
        // only exists in this locale, so alternate to itself.
        const inAllLocales = locales.every((loc) => categorySlugsByLocale.get(loc)?.has(category.slug))
        entries.push({
          url: canonicalUrl(locale, taxPath),
          lastModified: freshness,
          changeFrequency: 'weekly',
          priority: 0.65,
          alternates: {
            languages: inAllLocales
              ? buildHreflangMap(taxPath)
              : { [locale]: canonicalUrl(locale, taxPath), 'x-default': canonicalUrl(locale, taxPath) },
          },
        })
      })

    tags
      .filter((tag) => tag.postCount > 0)
      .forEach((tag) => {
        const taxPath = `/articles/tag/${tag.slug}`
        const inAllLocales = locales.every((loc) => tagSlugsByLocale.get(loc)?.has(tag.slug))
        entries.push({
          url: canonicalUrl(locale, taxPath),
          lastModified: freshness,
          changeFrequency: 'monthly',
          priority: 0.55,
          alternates: {
            languages: inAllLocales
              ? buildHreflangMap(taxPath)
              : { [locale]: canonicalUrl(locale, taxPath), 'x-default': canonicalUrl(locale, taxPath) },
          },
        })
      })

    authors.forEach((author) => {
      entries.push({
        url: canonicalUrl(locale, `/articles/author/${author.slug}`),
        lastModified: freshness,
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: { languages: buildHreflangMap(`/articles/author/${author.slug}`) },
      })
    })
  }

  return entries
}
