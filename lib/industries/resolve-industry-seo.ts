import 'server-only'

import type { Metadata } from 'next'
import { cache } from 'react'
import { getCMSPage } from '@/lib/cms/content'
import { getSeoOverride, type SeoOverride } from '@/lib/cms/route-seo'
import type { Locale } from '@/lib/i18n/config'
import {
  buildHreflangMap,
  canonicalUrl,
  stripBrandSuffix,
} from '@/lib/i18n/url'
import { isIndustrySlug, type IndustrySlug } from '@/lib/industries/slugs'
import { ogImagesFor } from '@/lib/og/og-image'

export type IndustrySeoDefaults = {
  title: string
  description: string
  ogImage?: string
  index?: boolean
  follow?: boolean
}

export type EffectiveIndustrySeo = {
  locale: Locale
  title: string
  description: string
  canonical: string
  languages: Partial<Record<'en' | 'ar' | 'x-default', string>>
  index: boolean
  follow: boolean
  ogImages: ReturnType<typeof ogImagesFor>
}

export type ResolvedIndustrySeoPair = Record<Locale, EffectiveIndustrySeo>

export type IndustrySeoPairInput = {
  slug: IndustrySlug
  defaults: Readonly<Record<Locale, IndustrySeoDefaults>>
  pages?: Partial<Record<Locale, unknown | null>>
  overrides?: Partial<Record<Locale, SeoOverride | null>>
}

type CanonicalField = {
  present: boolean
  value?: string
}

type NormalizedSeoLayer = {
  title?: string
  description?: string
  canonical: CanonicalField
  noIndex?: boolean
  noFollow?: boolean
  ogImage?: string
}

const absentCanonical: CanonicalField = { present: false }

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function nonEmptyString(value: unknown): string | undefined {
  if (typeof value !== 'string') return undefined
  const normalized = value.trim()
  return normalized.length > 0 ? normalized : undefined
}

function normalizedTitle(value: unknown): string | undefined {
  const title = nonEmptyString(value)
  return title ? stripBrandSuffix(title) : undefined
}

function booleanAlias(
  source: Record<string, unknown>,
  aliases: readonly string[],
): boolean | undefined {
  for (const alias of aliases) {
    if (typeof source[alias] === 'boolean') return source[alias]
  }
  return undefined
}

function canonicalField(
  source: Record<string, unknown>,
  aliases: readonly string[],
): CanonicalField {
  for (const alias of aliases) {
    if (!Object.hasOwn(source, alias)) continue
    const value = source[alias]
    if (value === null || value === undefined) continue
    return {
      present: true,
      ...(typeof value === 'string' ? { value } : {}),
    }
  }
  return absentCanonical
}

function normalizePageLayer(page: unknown): NormalizedSeoLayer {
  if (!isRecord(page) || !isRecord(page.seo)) {
    return { canonical: absentCanonical }
  }

  const seo = page.seo
  return {
    title: normalizedTitle(seo.title),
    description: nonEmptyString(seo.description),
    canonical: canonicalField(seo, ['canonicalUrl', 'canonical']),
    noIndex: booleanAlias(seo, ['noindex', 'noIndex']),
    noFollow: booleanAlias(seo, ['nofollow', 'noFollow']),
    ogImage: nonEmptyString(seo.ogImage),
  }
}

function normalizeOverrideLayer(
  override: SeoOverride | null | undefined,
): NormalizedSeoLayer {
  if (!override) return { canonical: absentCanonical }
  const source = override as Record<string, unknown>
  return {
    title: normalizedTitle(override.metaTitle),
    description: nonEmptyString(override.metaDescription),
    canonical: canonicalField(source, ['canonicalUrl']),
    noIndex: typeof override.noIndex === 'boolean' ? override.noIndex : undefined,
    noFollow: typeof override.noFollow === 'boolean' ? override.noFollow : undefined,
  }
}

function requiredText(value: unknown, field: string, locale: Locale): string {
  const normalized = field === 'title'
    ? normalizedTitle(value)
    : nonEmptyString(value)
  if (!normalized) {
    throw new Error(`Missing code-owned industry SEO ${field} for ${locale}`)
  }
  return normalized
}

function exactCanonicalPair(
  layer: Record<Locale, NormalizedSeoLayer>,
  base: Record<Locale, string>,
): boolean {
  return (
    layer.en.canonical.present &&
    layer.ar.canonical.present &&
    layer.en.canonical.value === base.en &&
    layer.ar.canonical.value === base.ar
  )
}

function selectCanonicalPair(
  pages: Record<Locale, NormalizedSeoLayer>,
  overrides: Record<Locale, NormalizedSeoLayer>,
  base: Record<Locale, string>,
): Record<Locale, string> {
  for (const layer of [overrides, pages]) {
    const hasCanonicalField =
      layer.en.canonical.present || layer.ar.canonical.present
    if (!hasCanonicalField) continue

    // A malformed, incomplete, or misplaced higher-precedence canonical field
    // poisons CMS canonical adoption for the whole pair. Text and robots from
    // the same layer are deliberately resolved independently below.
    if (exactCanonicalPair(layer, base)) {
      return {
        en: layer.en.canonical.value as string,
        ar: layer.ar.canonical.value as string,
      }
    }
    return base
  }

  return base
}

export function mergeIndustrySeoPair(
  input: IndustrySeoPairInput,
): ResolvedIndustrySeoPair {
  if (!isIndustrySlug(input.slug)) {
    throw new Error(`Unknown industry slug: ${input.slug}`)
  }

  const path = `/industries/${input.slug}`
  const baseCanonical = {
    en: canonicalUrl('en', path),
    ar: canonicalUrl('ar', path),
  }
  const pages = {
    en: normalizePageLayer(input.pages?.en),
    ar: normalizePageLayer(input.pages?.ar),
  }
  const overrides = {
    en: normalizeOverrideLayer(input.overrides?.en),
    ar: normalizeOverrideLayer(input.overrides?.ar),
  }
  const canonicals = selectCanonicalPair(pages, overrides, baseCanonical)

  const localized = {} as Record<Locale, {
    title: string
    description: string
    noIndex: boolean
    follow: boolean
    ogImage?: string
  }>

  for (const locale of ['en', 'ar'] as const) {
    const fallback = input.defaults[locale]
    const page = pages[locale]
    const override = overrides[locale]
    let noIndex = fallback.index === false
    let follow = fallback.follow !== false

    if (page.noIndex !== undefined) noIndex = page.noIndex
    if (page.noFollow !== undefined) follow = !page.noFollow
    if (override.noIndex !== undefined) noIndex = override.noIndex
    if (override.noFollow !== undefined) follow = !override.noFollow

    localized[locale] = {
      title:
        override.title ??
        page.title ??
        requiredText(fallback.title, 'title', locale),
      description:
        override.description ??
        page.description ??
        requiredText(fallback.description, 'description', locale),
      noIndex,
      follow,
      ogImage: page.ogImage ?? nonEmptyString(fallback.ogImage),
    }
  }

  const pairNoIndex = localized.en.noIndex || localized.ar.noIndex
  const hreflang = buildHreflangMap(path)
  const languages: EffectiveIndustrySeo['languages'] = pairNoIndex
    ? {}
    : {
        en: hreflang.en,
        ar: hreflang.ar,
        'x-default': hreflang['x-default'],
      }

  return {
    en: {
      locale: 'en',
      title: localized.en.title,
      description: localized.en.description,
      canonical: canonicals.en,
      languages: { ...languages },
      index: !pairNoIndex,
      follow: localized.en.follow,
      ogImages: ogImagesFor({
        page: `industries/${input.slug}`,
        locale: 'en',
        override: localized.en.ogImage,
      }),
    },
    ar: {
      locale: 'ar',
      title: localized.ar.title,
      description: localized.ar.description,
      canonical: canonicals.ar,
      languages: { ...languages },
      index: !pairNoIndex,
      follow: localized.ar.follow,
      ogImages: ogImagesFor({
        page: `industries/${input.slug}`,
        locale: 'ar',
        override: localized.ar.ogImage,
      }),
    },
  }
}

async function safelyLoad<T>(load: () => Promise<T>): Promise<T | null> {
  try {
    return await load()
  } catch {
    return null
  }
}

export type IndustrySeoSourceLoaders = {
  getPage: (locale: Locale, path: string) => Promise<unknown | null>
  getOverride: (
    locale: Locale,
    path: string,
  ) => Promise<SeoOverride | null>
}

const defaultSourceLoaders: IndustrySeoSourceLoaders = {
  getPage: (locale, path) => getCMSPage(locale, path),
  getOverride: (locale, path) => getSeoOverride(locale, path),
}

export const resolveIndustrySeoPair = cache(async function resolveIndustrySeoPair(
  slug: IndustrySlug,
  defaults: Readonly<Record<Locale, IndustrySeoDefaults>>,
  loaders: IndustrySeoSourceLoaders = defaultSourceLoaders,
): Promise<ResolvedIndustrySeoPair> {
  if (!isIndustrySlug(slug)) {
    throw new Error(`Unknown industry slug: ${slug}`)
  }

  const path = `industries/${slug}`
  const [enPage, arPage, enOverride, arOverride] = await Promise.all([
    safelyLoad(() => loaders.getPage('en', path)),
    safelyLoad(() => loaders.getPage('ar', path)),
    safelyLoad(() => loaders.getOverride('en', path)),
    safelyLoad(() => loaders.getOverride('ar', path)),
  ])

  return mergeIndustrySeoPair({
    slug,
    defaults,
    pages: { en: enPage, ar: arPage },
    overrides: { en: enOverride, ar: arOverride },
  })
})

export function buildIndustryMetadata(seo: EffectiveIndustrySeo): Metadata {
  const locale = seo.locale === 'ar' ? 'ar_SA' : 'en_US'
  const alternateLocale = seo.locale === 'ar' ? 'en_US' : 'ar_SA'

  return {
    title: seo.title,
    description: seo.description,
    robots: { index: seo.index, follow: seo.follow },
    alternates: {
      canonical: seo.canonical,
      languages: seo.languages,
    },
    openGraph: {
      type: 'website',
      siteName: 'CloudTopia',
      title: seo.title,
      description: seo.description,
      url: seo.canonical,
      locale,
      alternateLocale: [alternateLocale],
      images: seo.ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title: seo.title,
      description: seo.description,
      images: seo.ogImages.map((image) => image.url),
    },
  }
}

export type IndustrySeoUniquenessEntry = {
  slug: IndustrySlug
  locale: Locale
  canonical: string
  title: string
  description: string
  h1: string
}

export type IndustrySeoUniquenessField =
  | 'canonical'
  | 'title'
  | 'description'
  | 'h1'

export type IndustrySeoUniquenessIssue = {
  code: 'duplicate-effective-industry-seo'
  field: IndustrySeoUniquenessField
  locale: Locale
  slug: IndustrySlug
  conflictingSlug: IndustrySlug
  value: string
}

export type IndustrySeoUniquenessResult =
  | { ok: true; issues: [] }
  | { ok: false; issues: IndustrySeoUniquenessIssue[] }

function normalizeUniqueValue(value: string): string {
  return value.trim().replace(/\s+/gu, ' ').toLocaleLowerCase()
}

export function validateIndustrySeoEntries(
  entries: readonly IndustrySeoUniquenessEntry[],
): IndustrySeoUniquenessResult {
  const issues: IndustrySeoUniquenessIssue[] = []
  const seen = new Map<string, IndustrySlug>()
  const fields: readonly IndustrySeoUniquenessField[] = [
    'canonical',
    'title',
    'description',
    'h1',
  ]

  for (const entry of entries) {
    for (const field of fields) {
      const key = [entry.locale, field, normalizeUniqueValue(entry[field])].join('\u0000')
      const conflictingSlug = seen.get(key)
      if (conflictingSlug && conflictingSlug !== entry.slug) {
        issues.push({
          code: 'duplicate-effective-industry-seo',
          field,
          locale: entry.locale,
          slug: entry.slug,
          conflictingSlug,
          value: entry[field],
        })
      } else if (!conflictingSlug) {
        seen.set(key, entry.slug)
      }
    }
  }

  return issues.length === 0
    ? { ok: true, issues: [] }
    : { ok: false, issues }
}

export function assertUniqueIndustrySeoEntries(
  entries: readonly IndustrySeoUniquenessEntry[],
): void {
  const result = validateIndustrySeoEntries(entries)
  if (result.ok) return

  throw new Error(
    result.issues
      .map((issue) =>
        `Duplicate effective industry ${issue.field} for ${issue.locale}: ` +
        `${issue.slug} conflicts with ${issue.conflictingSlug}.`,
      )
      .join(' '),
  )
}
