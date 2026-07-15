import { contentHash, manifestContentHash } from './content-hash'
import { industryManifest } from './manifest'
import { PROJECT_IDS } from './proof-targets'
import { CANONICAL_SERVICE_TARGETS } from './service-targets'
import {
  SECTION_VARIANTS,
  type IndustryPageDefinition,
  type IndustryPageRegistry,
  type IndustryClaimSource,
  type IndustrySection,
  type IndustryTheme,
  type IndustryValidationOptions,
  type LocalizedIndustryPage,
} from './types'

export const DRAFT_INDUSTRY_VALIDATION_CODES = [
  'missing-locale',
  'localized-copy-missing',
  'parity-drift',
  'duplicate-localized-copy',
  'content-too-thin',
  'prohibited-copy',
  'duplicate-section-id',
  'unisolated-ltr-token',
  'semantic-question-missing',
  'semantic-question-duplicate',
  'invalid-variant',
  'release-a-signature-forbidden',
  'signature-composition-invalid',
  'invalid-service-id',
  'invalid-project-id',
  'invalid-related-industry',
  'self-related-industry',
  'cta-drift',
  'missing-theme-token',
  'contrast-failure',
  'faq-count',
  'service-count',
  'claim-source-missing',
] as const

export type DraftIndustryValidationCode =
  (typeof DRAFT_INDUSTRY_VALIDATION_CODES)[number]

export const INDUSTRY_VALIDATION_CODES = [
  'missing-locale',
  'localized-copy-missing',
  'parity-drift',
  'duplicate-localized-copy',
  'content-too-thin',
  'prohibited-copy',
  'duplicate-section-id',
  'unisolated-ltr-token',
  'semantic-question-missing',
  'semantic-question-duplicate',
  'invalid-variant',
  'release-a-signature-forbidden',
  'signature-composition-invalid',
  'invalid-service-id',
  'invalid-project-id',
  'invalid-related-industry',
  'self-related-industry',
  'cta-drift',
  'missing-theme-token',
  'contrast-failure',
  'faq-count',
  'service-count',
  'missing-native-review',
  'missing-sensitive-review',
  'missing-manifest-review',
  'review-hash-mismatch',
  'claim-source-missing',
  'claim-unapproved',
  'claim-expired',
] as const

export type IndustryValidationCode =
  (typeof INDUSTRY_VALIDATION_CODES)[number]

export type IndustryPageValidationIssue = {
  code: IndustryValidationCode
  path: string
  message: string
}

export type IndustryPageValidationResult = {
  ok: boolean
  errors: IndustryPageValidationIssue[]
}

export class IndustryPageValidationError extends Error {
  readonly errors: IndustryPageValidationIssue[]

  constructor(errors: readonly IndustryPageValidationIssue[]) {
    super(
      errors
        .map((issue) => issue.code + ' at ' + issue.path + ': ' + issue.message)
        .join('\n'),
    )
    this.name = 'IndustryPageValidationError'
    this.errors = [...errors]
  }
}

type LocaleKey = 'en' | 'ar'

const LOCALES = ['en', 'ar'] as const
const REQUIRED_SEMANTIC_QUESTIONS = [
  'operating-pressure',
  'journey',
  'buildable-system',
  'evidence-and-constraints',
  'regional-delivery',
  'decision-close',
] as const
const PROTECTED_LTR_TOKENS = ['CRM', 'ERP', 'API', 'POS', 'TMS', 'WMS', 'SLA', 'QR']
const THEME_TOKENS = [
  'canvas',
  'surface',
  'elevatedSurface',
  'ink',
  'mutedInk',
  'accent',
  'accentInk',
  'signal',
  'line',
  'focus',
  'displayTreatment',
  'radiusMode',
  'motifDensity',
  'sceneTreatment',
] as const satisfies readonly (keyof IndustryTheme)[]

function validationResult(
  errors: IndustryPageValidationIssue[],
): IndustryPageValidationResult {
  return errors.length === 0
    ? { ok: true, errors: [] }
    : { ok: false, errors }
}

function collectStrings(value: unknown, strings: string[] = []): string[] {
  if (typeof value === 'string') {
    strings.push(value)
    return strings
  }

  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, strings)
    return strings
  }

  if (value && typeof value === 'object') {
    for (const item of Object.values(value)) collectStrings(item, strings)
  }

  return strings
}

function sectionsFor(page: LocalizedIndustryPage): readonly IndustrySection[] {
  return Array.isArray(page.sections) ? page.sections : []
}

function semanticProjection(value: unknown): unknown {
  if (Array.isArray(value)) {
    const projected = value
      .map((item) => semanticProjection(item))
      .filter((item) => item !== undefined)
    return projected.length > 0 ? projected : undefined
  }

  if (!value || typeof value !== 'object') return undefined

  const projected: Record<string, unknown> = {}
  for (const [key, item] of Object.entries(value)) {
    const isSemanticKey =
      key === 'id' ||
      key === 'type' ||
      key === 'variant' ||
      key === 'answers' ||
      key.endsWith('Id') ||
      key.endsWith('Ids')

    if (isSemanticKey) {
      projected[key] = item
      continue
    }

    const nested = semanticProjection(item)
    if (nested !== undefined) projected[key] = nested
  }

  return Object.keys(projected).length > 0 ? projected : undefined
}

function localizedCopyFingerprint(page: LocalizedIndustryPage): string {
  return JSON.stringify({
    seo: [page.seo?.title, page.seo?.description],
    breadcrumbLabel: page.breadcrumbLabel,
    hero: [
      page.hero?.worldLabel,
      page.hero?.eyebrow,
      page.hero?.h1,
      page.hero?.intro,
      page.hero?.sceneSummary,
    ],
    sections: sectionsFor(page).map((section) => [
      section.type,
      section.title,
      section.intro,
    ]),
  })
}

function normalizeCopy(value: string): string {
  return value.trim().replace(/\s+/gu, ' ').toLocaleLowerCase()
}

function hasBareProtectedLtrToken(value: string): boolean {
  const tokenPattern = new RegExp(
    '\\b(' + PROTECTED_LTR_TOKENS.join('|') + ')\\b',
    'g',
  )

  for (const match of value.matchAll(tokenPattern)) {
    const start = match.index ?? 0
    const end = start + match[0].length
    if (value[start - 1] !== '\u2068' || value[end] !== '\u2069') return true
  }

  return false
}

function hexToRgb(value: unknown): [number, number, number] | null {
  if (typeof value !== 'string') return null

  const match = /^#([0-9a-f]{6})$/iu.exec(value.trim())
  if (!match) return null

  return [
    Number.parseInt(match[1].slice(0, 2), 16),
    Number.parseInt(match[1].slice(2, 4), 16),
    Number.parseInt(match[1].slice(4, 6), 16),
  ]
}

function relativeLuminance(value: unknown): number | null {
  const rgb = hexToRgb(value)
  if (!rgb) return null

  const [red, green, blue] = rgb.map((channel) => {
    const normalized = channel / 255
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4
  })

  return 0.2126 * red + 0.7152 * green + 0.0722 * blue
}

function contrastRatio(foreground: unknown, background: unknown): number {
  const foregroundLuminance = relativeLuminance(foreground)
  const backgroundLuminance = relativeLuminance(background)
  if (foregroundLuminance === null || backgroundLuminance === null) return 0

  const lighter = Math.max(foregroundLuminance, backgroundLuminance)
  const darker = Math.min(foregroundLuminance, backgroundLuminance)
  return (lighter + 0.05) / (darker + 0.05)
}

function referencedServices(page: LocalizedIndustryPage): string[] {
  const serviceIds = [page.hero?.secondaryCta?.serviceId as string]

  for (const section of sectionsFor(page)) {
    if (section.type === 'service-bridge') {
      serviceIds.push(...section.serviceIds)
      serviceIds.push(...section.serviceAnchors.map((anchor) => anchor.serviceId))
    }
    if (section.type === 'closing-cta') {
      serviceIds.push(section.secondary.serviceId)
    }
  }

  return serviceIds.filter((serviceId): serviceId is string => typeof serviceId === 'string')
}

function isCompleteReviewRecord(review: {
  reviewer: string
  reviewedAt: string
  contentHash: string
}): boolean {
  return [review.reviewer, review.reviewedAt, review.contentHash].every(
    (value) => typeof value === 'string' && value.trim().length > 0,
  )
}

function isCompleteClaimSource(claim: IndustryClaimSource): boolean {
  const requiredStrings = [
    claim.id,
    claim.wording,
    claim.scope,
    claim.source,
    claim.owner,
    claim.reviewedAt,
    claim.recheckAt,
  ]

  return (
    requiredStrings.every(
      (value) => typeof value === 'string' && value.trim().length > 0,
    ) &&
    (claim.locale === 'en' ||
      claim.locale === 'ar' ||
      claim.locale === 'both') &&
    (claim.approval === 'approved' ||
      claim.approval === 'rejected' ||
      claim.approval === 'pending')
  )
}

function validateManifestReviews(
  options: IndustryValidationOptions,
): IndustryPageValidationIssue[] {
  if (options.mode !== 'publication') return []

  const errors: IndustryPageValidationIssue[] = []
  const reviews = options.manifestReviews ?? []

  for (const locale of LOCALES) {
    const expectedKind =
      locale === 'en' ? 'manifest-editorial' : 'manifest-native-arabic'
    const expectedHash = manifestContentHash(locale, industryManifest)
    const requiredReviews = reviews.filter(
      (review) => review.locale === locale && review.kind === expectedKind,
    )

    if (requiredReviews.length === 0) {
      errors.push({
        code: 'missing-manifest-review',
        path: 'manifestReviews.' + locale,
        message:
          'Publication requires the complete ' +
          locale +
          ' manifest review.',
      })
    }

    for (const [index, review] of reviews.entries()) {
      if (review.locale !== locale) continue
      if (
        !isCompleteReviewRecord(review) ||
        review.contentHash !== expectedHash
      ) {
        errors.push({
          code: 'review-hash-mismatch',
          path: 'manifestReviews.' + index,
          message:
            'Manifest reviews must match the complete current ' +
            locale +
            ' manifest-copy hash.',
        })
      }
    }
  }

  return errors
}

function validateDefinition(
  definition: IndustryPageDefinition,
  options: IndustryValidationOptions,
): IndustryPageValidationIssue[] {
  const errors: IndustryPageValidationIssue[] = []
  const issueKeys = new Set<string>()
  const add = (
    code: IndustryValidationCode,
    path: string,
    message: string,
  ): void => {
    const key = code + '\u0000' + path
    if (issueKeys.has(key)) return
    issueKeys.add(key)
    errors.push({ code, path, message })
  }

  const candidate = definition as unknown as {
    locales?: Partial<Record<LocaleKey, LocalizedIndustryPage>>
    world?: IndustryPageDefinition['world']
    assets?: IndustryPageDefinition['assets']
    claims?: IndustryPageDefinition['claims']
  }
  const locales = candidate.locales ?? {}

  for (const locale of LOCALES) {
    if (!locales[locale] || typeof locales[locale] !== 'object') {
      add(
        'missing-locale',
        'locales.' + locale,
        'A complete localized page is required.',
      )
    }
  }

  for (const locale of LOCALES) {
    const page = locales[locale]
    if (
      page &&
      collectStrings(page).some((value) => value.trim().length === 0)
    ) {
      add(
        'localized-copy-missing',
        'locales.' + locale,
        'Localized visible copy cannot be blank.',
      )
    }
  }

  if (locales.en && locales.ar) {
    const englishProjection = semanticProjection(locales.en)
    const arabicProjection = semanticProjection(locales.ar)
    if (JSON.stringify(englishProjection) !== JSON.stringify(arabicProjection)) {
      add(
        'parity-drift',
        'locales',
        'English and Arabic semantic identifiers must remain aligned.',
      )
    }
  }

  for (const locale of LOCALES) {
    const page = locales[locale]
    if (!page) continue

    const faqQuestions = sectionsFor(page)
      .filter((section) => section.type === 'faq')
      .flatMap((section) => section.items.map((item) => normalizeCopy(item.question)))
    if (new Set(faqQuestions).size !== faqQuestions.length) {
      add(
        'duplicate-localized-copy',
        'locales.' + locale + '.sections.faq',
        'FAQ questions must be unique within a locale.',
      )
    }
  }

  for (const locale of LOCALES) {
    const page = locales[locale]
    if (!page) continue

    if (/[\?\u061f]\s*$/u.test(page.hero?.intro ?? '')) {
      add(
        'content-too-thin',
        'locales.' + locale + '.hero.intro',
        'The hero introduction must answer first.',
      )
    }

    for (const section of sectionsFor(page)) {
      if (
        section.type === 'system-blueprint' &&
        (section.layers.length < 3 || section.layers.length > 6)
      ) {
        add(
          'content-too-thin',
          'locales.' + locale + '.sections.' + section.id + '.layers',
          'A system blueprint requires three to six layers.',
        )
      }
      if (
        section.type === 'use-case-sequence' &&
        (section.steps.length < 3 || section.steps.length > 6)
      ) {
        add(
          'content-too-thin',
          'locales.' + locale + '.sections.' + section.id + '.steps',
          'A use-case sequence requires three to six steps.',
        )
      }
    }
  }

  const prohibitedCopyPattern =
    /\b(?:todo|tbd|fixme|lorem ipsum|innovative|seamless|cutting-edge|digital transformation)\b/iu
  for (const locale of LOCALES) {
    const page = locales[locale]
    if (
      page &&
      collectStrings(page).some((value) => prohibitedCopyPattern.test(value))
    ) {
      add(
        'prohibited-copy',
        'locales.' + locale,
        'Draft copy contains a prohibited placeholder or generic claim.',
      )
    }
  }

  for (const locale of LOCALES) {
    const page = locales[locale]
    if (!page) continue

    const sectionIds = sectionsFor(page).map((section) => section.id)
    if (new Set(sectionIds).size !== sectionIds.length) {
      add(
        'duplicate-section-id',
        'locales.' + locale + '.sections',
        'Section identifiers must be unique within a locale.',
      )
    }
  }

  if (
    locales.ar &&
    collectStrings(locales.ar).some((value) => hasBareProtectedLtrToken(value))
  ) {
    add(
      'unisolated-ltr-token',
      'locales.ar',
      'Protected left-to-right tokens in Arabic copy require FSI/PDI isolation.',
    )
  }

  for (const locale of LOCALES) {
    const page = locales[locale]
    if (!page) continue

    const answerCounts = new Map<string, number>()
    for (const section of sectionsFor(page)) {
      for (const answer of section.answers) {
        answerCounts.set(answer, (answerCounts.get(answer) ?? 0) + 1)
      }
    }

    for (const question of REQUIRED_SEMANTIC_QUESTIONS) {
      if ((answerCounts.get(question) ?? 0) === 0) {
        add(
          'semantic-question-missing',
          'locales.' + locale + '.sections',
          'Every required semantic question must be answered once.',
        )
        break
      }
    }
  }

  for (const locale of LOCALES) {
    const page = locales[locale]
    if (!page) continue

    const answerCounts = new Map<string, number>()
    for (const section of sectionsFor(page)) {
      for (const answer of section.answers) {
        answerCounts.set(answer, (answerCounts.get(answer) ?? 0) + 1)
      }
    }

    if ([...answerCounts.values()].some((count) => count > 1)) {
      add(
        'semantic-question-duplicate',
        'locales.' + locale + '.sections',
        'A semantic question cannot be answered more than once.',
      )
    }
  }

  for (const locale of LOCALES) {
    const page = locales[locale]
    if (!page) continue

    for (const section of sectionsFor(page)) {
      if (section.type === 'signature') continue

      const variants = (
        SECTION_VARIANTS as Record<string, readonly string[]>
      )[section.type]
      if (!variants || !variants.includes(section.variant)) {
        add(
          'invalid-variant',
          'locales.' + locale + '.sections.' + section.id + '.variant',
          'The section variant is not registered for its section type.',
        )
      }
    }
  }

  const authoredScenes = (candidate.assets ?? []).filter(
    (asset) => asset.kind === 'authored-scene',
  )
  if (
    !candidate.world ||
    authoredScenes.length === 0 ||
    authoredScenes.some((asset) => asset.id !== candidate.world?.heroScene)
  ) {
    add(
      'invalid-variant',
      'assets.authored-scene',
      'The authored scene must match the registered hero scene.',
    )
  }

  if (options.mode === 'publication') {
    for (const [index, asset] of (candidate.assets ?? []).entries()) {
      if (asset.kind !== 'og-image') continue

      const expectedPath =
        '/og/industries/' + definition.slug + '/' + asset.locale + '.jpg'
      const hasValidContract =
        LOCALES.includes(asset.locale) &&
        asset.publicPath === expectedPath &&
        asset.width === 1200 &&
        asset.height === 630
      const exists =
        hasValidContract &&
        options.assetExists?.(asset.publicPath) === true

      if (!hasValidContract || !exists) {
        add(
          'invalid-variant',
          'assets.' + index,
          'OG images require the canonical localized path, 1200x630 dimensions, and an existing public file.',
        )
      }
    }
  }

  if (!options.allowCustomSignature) {
    for (const locale of LOCALES) {
      const page = locales[locale]
      if (
        page &&
        sectionsFor(page).some((section) => section.type === 'signature')
      ) {
        add(
          'release-a-signature-forbidden',
          'locales.' + locale + '.sections',
          'Release A does not permit custom signature recipe entries.',
        )
      }
    }
  }

  const signatureSectionIds =
    candidate.world?.signatureComposition?.sectionIds ?? []
  const signatureIdsAreUnique =
    new Set(signatureSectionIds).size === signatureSectionIds.length
  const signatureIdsExist =
    signatureSectionIds.length > 0 &&
    LOCALES.every((locale) => {
      const page = locales[locale]
      if (!page) return false
      const availableIds = new Set(
        sectionsFor(page).map((section) => section.id),
      )
      return signatureSectionIds.every((sectionId) => availableIds.has(sectionId))
    })
  if (!signatureIdsAreUnique || !signatureIdsExist) {
    add(
      'signature-composition-invalid',
      'world.signatureComposition.sectionIds',
      'Signature composition references must be unique existing section IDs.',
    )
  }

  const manifestEntry = industryManifest[definition.slug]
  const allowedServices = new Set<string>(manifestEntry?.serviceIds ?? [])
  const canonicalServices = new Set<string>(
    Object.keys(CANONICAL_SERVICE_TARGETS),
  )
  for (const locale of LOCALES) {
    const page = locales[locale]
    if (
      page &&
      referencedServices(page).some(
        (serviceId) =>
          !canonicalServices.has(serviceId) || !allowedServices.has(serviceId),
      )
    ) {
      add(
        'invalid-service-id',
        'locales.' + locale,
        'Service references must be canonical and allowed by the manifest.',
      )
    }
  }

  const projectIds = new Set<string>(PROJECT_IDS)
  for (const locale of LOCALES) {
    const page = locales[locale]
    if (!page) continue

    if (
      sectionsFor(page).some(
        (section) =>
          section.type === 'evidence' &&
          section.variant === 'verified-project' &&
          !projectIds.has(section.projectId),
      )
    ) {
      add(
        'invalid-project-id',
        'locales.' + locale + '.sections.evidence',
        'Verified project evidence must use a registered project ID.',
      )
    }
  }

  const adjacentIndustries = new Set<string>(
    manifestEntry?.relatedIndustryIds ?? [],
  )
  for (const locale of LOCALES) {
    const page = locales[locale]
    if (!page) continue

    const relatedIds = sectionsFor(page)
      .filter((section) => section.type === 'service-bridge')
      .flatMap((section) => [
        ...section.relatedIndustryIds,
        ...section.industryAnchors.map((anchor) => anchor.industryId),
      ])
    if (relatedIds.some((industryId) => !adjacentIndustries.has(industryId))) {
      add(
        'invalid-related-industry',
        'locales.' + locale + '.sections.service-bridge',
        'Related industries must follow manifest adjacency.',
      )
    }
  }

  for (const locale of LOCALES) {
    const page = locales[locale]
    if (!page) continue

    const relatedIds = sectionsFor(page)
      .filter((section) => section.type === 'service-bridge')
      .flatMap((section) => [
        ...section.relatedIndustryIds,
        ...section.industryAnchors.map((anchor) => anchor.industryId),
      ])
    if (relatedIds.includes(definition.slug)) {
      add(
        'self-related-industry',
        'locales.' + locale + '.sections.service-bridge',
        'An industry page cannot relate to itself.',
      )
    }
  }

  for (const locale of LOCALES) {
    const page = locales[locale]
    if (!page) continue

    const expectedHref = '/api/whatsapp?locale=' + locale
    const closeSections = sectionsFor(page).filter(
      (section) => section.type === 'closing-cta',
    )
    const ctaDrift =
      page.hero.primaryCta.href !== expectedHref ||
      closeSections.some(
        (section) =>
          section.primary.href !== expectedHref ||
          section.primary.label !== page.hero.primaryCta.label ||
          section.secondary.serviceId !== page.hero.secondaryCta.serviceId,
      )

    if (ctaDrift) {
      add(
        'cta-drift',
        'locales.' + locale,
        'Hero and closing calls to action must preserve locale and intent.',
      )
    }
  }

  const theme = candidate.world?.theme as
    | Partial<Record<(typeof THEME_TOKENS)[number], unknown>>
    | undefined
  for (const token of THEME_TOKENS) {
    if (
      !theme ||
      !Object.hasOwn(theme, token) ||
      typeof theme[token] !== 'string' ||
      (theme[token] as string).trim().length === 0
    ) {
      add(
        'missing-theme-token',
        'world.theme.' + token,
        'Every authored theme token is required.',
      )
    }
  }

  if (theme) {
    const textPairs: readonly [unknown, unknown][] = [
      [theme.ink, theme.canvas],
      [theme.ink, theme.surface],
      [theme.ink, theme.elevatedSurface],
      [theme.mutedInk, theme.canvas],
      [theme.accentInk, theme.accent],
    ]
    const textPairFailure = textPairs.some(
      ([foreground, background]) => contrastRatio(foreground, background) < 4.5,
    )
    const adjacentSurfaces = [
      theme.canvas,
      theme.surface,
      theme.elevatedSurface,
    ]
    const compositeFocusFailure = adjacentSurfaces.some(
      (surface) =>
        contrastRatio(theme.focus, surface) < 3 &&
        contrastRatio(theme.ink, surface) < 3,
    )

    if (textPairFailure || compositeFocusFailure) {
      add(
        'contrast-failure',
        'world.theme',
        'Text pairs and the composite focus indicator must meet contrast thresholds.',
      )
    }
  }

  for (const locale of LOCALES) {
    const page = locales[locale]
    if (!page) continue

    for (const section of sectionsFor(page)) {
      if (
        section.type === 'faq' &&
        (section.items.length < 4 || section.items.length > 7)
      ) {
        add(
          'faq-count',
          'locales.' + locale + '.sections.' + section.id + '.items',
          'FAQ sections require four to seven visible questions.',
        )
      }
    }
  }

  for (const locale of LOCALES) {
    const page = locales[locale]
    if (!page) continue

    for (const section of sectionsFor(page)) {
      if (section.type !== 'service-bridge') continue

      const uniqueServices = new Set(section.serviceIds)
      if (
        uniqueServices.size < 2 ||
        uniqueServices.size > 4 ||
        uniqueServices.size !== section.serviceIds.length
      ) {
        add(
          'service-count',
          'locales.' + locale + '.sections.' + section.id + '.serviceIds',
          'Service bridges require two to four unique services.',
        )
      }
    }
  }

  for (const [index, claim] of (candidate.claims ?? []).entries()) {
    if (!isCompleteClaimSource(claim)) {
      add(
        'claim-source-missing',
        'claims.' + index,
        'Draft claim records require complete provenance fields.',
      )
    }
  }

  if (options.mode === 'publication') {
    const now = options.now ?? new Date()
    const reviews = options.reviews ?? []
    const manifestEntry = industryManifest[definition.slug]

    for (const locale of LOCALES) {
      const page = locales[locale]
      if (!page || !manifestEntry) continue

      const expectedHash = contentHash({
        manifest: {
          label: manifestEntry.label[locale],
          navSummary: manifestEntry.navSummary[locale],
        },
        page,
      })
      const localizedReviews = reviews.filter(
        (review) =>
          review.slug === definition.slug && review.locale === locale,
      )
      const requiredKind = locale === 'en' ? 'editorial' : 'native-arabic'
      const requiredReviews = localizedReviews.filter(
        (review) => review.kind === requiredKind,
      )

      if (requiredReviews.length === 0) {
        add(
          locale === 'ar'
            ? 'missing-native-review'
            : 'review-hash-mismatch',
          'reviews.' + locale + '.' + requiredKind,
          locale === 'ar'
            ? 'Publication requires a native-Arabic review for this localized page.'
            : 'Publication requires a complete editorial review matching this localized page.',
        )
      }

      if (
        definition.slug === 'healthcare' &&
        !localizedReviews.some(
          (review) => review.kind === 'sensitive-domain',
        )
      ) {
        add(
          'missing-sensitive-review',
          'reviews.' + locale + '.sensitive-domain',
          'Healthcare publication requires sensitive-domain review in both locales.',
        )
      }

      for (const [index, review] of reviews.entries()) {
        if (
          review.slug !== definition.slug ||
          review.locale !== locale
        ) {
          continue
        }

        if (
          !isCompleteReviewRecord(review) ||
          review.contentHash !== expectedHash
        ) {
          add(
            'review-hash-mismatch',
            'reviews.' + index,
            'Content reviews must match the exact localized manifest fields and page hash.',
          )
        }
      }
    }

    for (const [index, claim] of (candidate.claims ?? []).entries()) {
      if (!isCompleteClaimSource(claim)) continue

      const claimLocales = claim.locale === 'both' ? LOCALES : [claim.locale]
      const visibleClaimMatches = claimLocales.every((locale) => {
        const page = locales[locale]
        if (!page) return false

        const visibleStrings = new Set(collectStrings(page))
        return (
          visibleStrings.has(claim.wording) &&
          visibleStrings.has(claim.scope)
        )
      })

      if (!visibleClaimMatches) {
        add(
          'claim-source-missing',
          'claims.' + index,
          'Visible claim wording, scope, and locale must exactly match its source record.',
        )
      }

      if (claim.approval !== 'approved') {
        add(
          'claim-unapproved',
          'claims.' + index + '.approval',
          'Only approved claim-source records may be published.',
        )
      }

      const recheckDeadline = Date.parse(
        claim.recheckAt + 'T23:59:59.999Z',
      )
      if (Number.isFinite(recheckDeadline) && now.getTime() > recheckDeadline) {
        add(
          'claim-expired',
          'claims.' + index + '.recheckAt',
          'The claim source has passed its required recheck date.',
        )
      }
    }
  }

  return errors
}

export function validateIndustryPageDefinition(
  definition: IndustryPageDefinition,
  options: IndustryValidationOptions,
): IndustryPageValidationResult {
  return validationResult([
    ...validateDefinition(definition, options),
    ...validateManifestReviews(options),
  ])
}

export function validateIndustryPageRegistry(
  registry: IndustryPageRegistry,
  options: IndustryValidationOptions,
): IndustryPageValidationResult {
  const errors: IndustryPageValidationIssue[] = []
  const fingerprints = new Map<string, string>()

  for (const slug of Object.keys(industryManifest) as (keyof IndustryPageRegistry)[]) {
    const definition = registry[slug]
    if (!definition) continue

    for (const issue of validateDefinition(definition, options)) {
      errors.push({
        ...issue,
        path: String(slug) + '.' + issue.path,
      })
    }

    const locales = (
      definition as unknown as {
        locales?: Partial<Record<LocaleKey, LocalizedIndustryPage>>
      }
    ).locales
    for (const locale of LOCALES) {
      const page = locales?.[locale]
      if (!page) continue

      const fingerprint = locale + '\u0000' + localizedCopyFingerprint(page)
      const previousSlug = fingerprints.get(fingerprint)
      if (previousSlug) {
        errors.push({
          code: 'duplicate-localized-copy',
          path: String(slug) + '.locales.' + locale,
          message:
            'Localized registry copy duplicates ' +
            previousSlug +
            ' for locale ' +
            locale +
            '.',
        })
      } else {
        fingerprints.set(fingerprint, String(slug))
      }
    }
  }

  errors.push(...validateManifestReviews(options))

  return validationResult(errors)
}

export function assertValidIndustryPageRegistry(
  registry: IndustryPageRegistry,
  options: IndustryValidationOptions,
): void {
  const result = validateIndustryPageRegistry(registry, options)
  if (!result.ok) throw new IndustryPageValidationError(result.errors)
}
