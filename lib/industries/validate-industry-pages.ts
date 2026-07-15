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
  rhythmFingerprint,
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
type UnknownRecord = Record<string, unknown>

const LOCALES = ['en', 'ar'] as const
const REQUIRED_SEMANTIC_QUESTIONS = [
  'sector-promise',
  'operating-pressure',
  'journey',
  'buildable-system',
  'evidence-and-constraints',
  'regional-delivery',
  'decision-close',
] as const
const SEMANTIC_QUESTION_SET = new Set<string>(REQUIRED_SEMANTIC_QUESTIONS)
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

function isRecord(value: unknown): value is UnknownRecord {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function hasRequiredStrings(
  value: UnknownRecord,
  keys: readonly string[],
): boolean {
  return keys.every((key) => isNonEmptyString(value[key]))
}

function hasOptionalString(value: UnknownRecord, key: string): boolean {
  return !Object.hasOwn(value, key) || isNonEmptyString(value[key])
}

function isStringArray(
  value: unknown,
  minimumLength = 1,
): value is string[] {
  return (
    Array.isArray(value) &&
    value.length >= minimumLength &&
    value.every(isNonEmptyString)
  )
}

function isRecordArray(
  value: unknown,
  predicate: (item: UnknownRecord) => boolean,
  minimumLength = 1,
): boolean {
  return (
    Array.isArray(value) &&
    value.length >= minimumLength &&
    value.every((item) => isRecord(item) && predicate(item))
  )
}

function identifiersMatchAnchors(
  identifiers: unknown,
  anchors: unknown,
  anchorKey: string,
): boolean {
  if (
    !Array.isArray(identifiers) ||
    !Array.isArray(anchors) ||
    identifiers.length !== anchors.length
  ) {
    return false
  }

  const remaining = new Map<string, number>()
  for (const identifier of identifiers) {
    if (!isNonEmptyString(identifier)) return false
    remaining.set(identifier, (remaining.get(identifier) ?? 0) + 1)
  }

  for (const anchor of anchors) {
    if (!isRecord(anchor) || !isNonEmptyString(anchor[anchorKey])) return false
    const identifier = anchor[anchorKey]
    const count = remaining.get(identifier) ?? 0
    if (count === 0) return false
    remaining.set(identifier, count - 1)
  }

  return [...remaining.values()].every((count) => count === 0)
}

function isIndustrySectionShape(value: unknown): value is IndustrySection {
  if (
    !isRecord(value) ||
    !hasRequiredStrings(value, ['id', 'type', 'variant', 'title', 'intro']) ||
    !hasOptionalString(value, 'eyebrow') ||
    !isStringArray(value.answers, 0)
  ) {
    return false
  }

  switch (value.type) {
    case 'pressure-field':
      return isRecordArray(value.signals, (signal) =>
        hasRequiredStrings(signal, ['id', 'label', 'description']),
      )
    case 'journey-map':
      return (
        isRecordArray(value.stages, (stage) =>
          hasRequiredStrings(stage, ['id', 'label', 'description']) &&
          hasOptionalString(stage, 'actor'),
        ) &&
        (!Object.hasOwn(value, 'lanes') ||
          isRecordArray(value.lanes, (lane) =>
            hasRequiredStrings(lane, ['id', 'label']) &&
            isStringArray(lane.stageIds),
          ))
      )
    case 'system-blueprint':
      return isRecordArray(
        value.layers,
        (layer) =>
          hasRequiredStrings(layer, [
            'id',
            'label',
            'description',
            'handoff',
            'outcome',
          ]) && isStringArray(layer.inputs),
        0,
      )
    case 'use-case-sequence':
      return isRecordArray(
        value.steps,
        (step) =>
          hasRequiredStrings(step, ['id', 'label', 'description']) &&
          hasOptionalString(step, 'owner'),
        0,
      )
    case 'service-bridge':
      return (
        isStringArray(value.serviceIds, 0) &&
        isRecordArray(
          value.serviceAnchors,
          (anchor) => hasRequiredStrings(anchor, ['serviceId', 'label']),
          0,
        ) &&
        identifiersMatchAnchors(
          value.serviceIds,
          value.serviceAnchors,
          'serviceId',
        ) &&
        isStringArray(value.relatedIndustryIds) &&
        isRecordArray(value.industryAnchors, (anchor) =>
          hasRequiredStrings(anchor, ['industryId', 'label']),
        ) &&
        identifiersMatchAnchors(
          value.relatedIndustryIds,
          value.industryAnchors,
          'industryId',
        )
      )
    case 'evidence':
      if (value.variant === 'verified-project') {
        return hasRequiredStrings(value, [
          'projectId',
          'approval',
          'provenance',
        ])
      }
      if (value.variant === 'annotated-model') {
        return isRecordArray(value.observations, (observation) =>
          hasRequiredStrings(observation, ['id', 'label', 'description']),
        )
      }
      return true
    case 'constraints':
      return isRecordArray(value.items, (item) =>
        hasRequiredStrings(item, [
          'id',
          'label',
          'responsibility',
          'dependency',
        ]) && hasOptionalString(item, 'recovery'),
      )
    case 'regional-fit':
      return isRecordArray(value.items, (item) =>
        hasRequiredStrings(item, ['id', 'label', 'description']),
      )
    case 'faq':
      return isRecordArray(
        value.items,
        (item) => hasRequiredStrings(item, ['id', 'question', 'answer']),
        0,
      )
    case 'closing-cta':
      return (
        isNonEmptyString(value.decisionCopy) &&
        isRecord(value.primary) &&
        hasRequiredStrings(value.primary, ['label', 'href']) &&
        isRecord(value.secondary) &&
        hasRequiredStrings(value.secondary, ['label', 'serviceId'])
      )
    case 'signature':
      return true
    default:
      return true
  }
}

function isLocalizedPageShape(
  value: unknown,
): value is LocalizedIndustryPage {
  if (!isRecord(value) || !isRecord(value.seo) || !isRecord(value.hero)) {
    return false
  }

  const hero = value.hero
  return (
    hasRequiredStrings(value.seo, ['title', 'description']) &&
    isNonEmptyString(value.breadcrumbLabel) &&
    hasRequiredStrings(hero, [
      'worldLabel',
      'eyebrow',
      'h1',
      'intro',
      'sceneSummary',
    ]) &&
    isRecord(hero.primaryCta) &&
    hasRequiredStrings(hero.primaryCta, ['label', 'href']) &&
    isRecord(hero.secondaryCta) &&
    hasRequiredStrings(hero.secondaryCta, ['label', 'serviceId']) &&
    isRecordArray(hero.sceneStages, (stage) =>
      hasRequiredStrings(stage, ['id', 'label']) &&
      hasOptionalString(stage, 'state'),
    ) &&
    Array.isArray(value.sections) &&
    value.sections.every(isIndustrySectionShape)
  )
}

function openingSentenceIsQuestion(value: string): boolean {
  const firstBoundary = /[.!?\u061f]/u.exec(value.trim())
  return firstBoundary?.[0] === '?' || firstBoundary?.[0] === '\u061f'
}

function hasUnqualifiedDigitalTransformation(value: string): boolean {
  const phrase = /\bdigital transformation\b/giu

  for (const match of value.matchAll(phrase)) {
    const trailingCopy = value.slice((match.index ?? 0) + match[0].length).trimStart()
    const hasQualifier = /^(?:plan|programme|program|roadmap|scope|work|for|of|in|across|within|focused\s+on|bounded\s+to)\b/iu.test(
      trailingCopy,
    )
    if (!hasQualifier) return true
  }

  return false
}

function calendarDateEnd(value: unknown): number | null {
  if (typeof value !== 'string') return null

  const match = /^(\d{4})-(\d{1,2})-(\d{1,2})$/u.exec(value)
  if (!match) return null

  const year = Number(match[1])
  const month = Number(match[2])
  const day = Number(match[3])
  const date = new Date(0)
  date.setUTCFullYear(year, month - 1, day)
  date.setUTCHours(23, 59, 59, 999)

  return date.getUTCFullYear() === year &&
    date.getUTCMonth() === month - 1 &&
    date.getUTCDate() === day
    ? date.getTime()
    : null
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

function isCompleteClaimSource(
  claim: unknown,
): claim is IndustryClaimSource {
  if (!isRecord(claim)) return false

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
      claim.approval === 'pending') &&
    calendarDateEnd(claim.reviewedAt) !== null &&
    calendarDateEnd(claim.recheckAt) !== null
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
    locales?: unknown
    world?: IndustryPageDefinition['world']
    assets?: unknown
    claims?: unknown
  }
  const rawLocales = isRecord(candidate.locales) ? candidate.locales : {}
  const locales: Partial<Record<LocaleKey, LocalizedIndustryPage>> = {}
  const rawAssets = Array.isArray(candidate.assets) ? candidate.assets : []
  const assets = rawAssets.filter(isRecord) as unknown as Array<
    IndustryPageDefinition['assets'][number]
  >
  const claims = Array.isArray(candidate.claims) ? candidate.claims : []

  for (const locale of LOCALES) {
    const page = rawLocales[locale]
    if (!isRecord(page)) {
      add(
        'missing-locale',
        'locales.' + locale,
        'A complete localized page is required.',
      )
      continue
    }

    if (!isLocalizedPageShape(page)) {
      add(
        'localized-copy-missing',
        'locales.' + locale,
        'Every required localized object, string, and array must be complete.',
      )
      continue
    }

    locales[locale] = page
  }

  if (!Array.isArray(candidate.assets) || assets.length !== rawAssets.length) {
    add(
      'invalid-variant',
      'assets',
      'Assets must use complete authored-scene or OG-image records.',
    )
  }

  if (!Array.isArray(candidate.claims)) {
    add(
      'claim-source-missing',
      'claims',
      'Claim sources must be provided as an array.',
    )
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

    if (openingSentenceIsQuestion(page.hero.intro)) {
      add(
        'content-too-thin',
        'locales.' + locale + '.hero.intro',
        'The hero introduction must answer first.',
      )
    }

    const blueprintSections = sectionsFor(page).filter(
      (section) => section.type === 'system-blueprint',
    )
    if (blueprintSections.length === 0) {
      add(
        'content-too-thin',
        'locales.' + locale + '.sections.system-blueprint',
        'A system blueprint with three to six layers is required.',
      )
    }
    for (const section of blueprintSections) {
      if (section.layers.length < 3 || section.layers.length > 6) {
        add(
          'content-too-thin',
          'locales.' + locale + '.sections.' + section.id + '.layers',
          'A system blueprint requires three to six layers.',
        )
      }
    }

    const journeyMapSections = sectionsFor(page).filter(
      (section) => section.type === 'journey-map',
    )
    const useCaseSections = sectionsFor(page).filter(
      (section) => section.type === 'use-case-sequence',
    )
    if (journeyMapSections.length === 0 && useCaseSections.length === 0) {
      add(
        'content-too-thin',
        'locales.' + locale + '.sections.journey-carrier',
        'A journey map or use-case sequence is required.',
      )
    }
    for (const section of useCaseSections) {
      if (section.steps.length < 3 || section.steps.length > 6) {
        add(
          'content-too-thin',
          'locales.' + locale + '.sections.' + section.id + '.steps',
          'A use-case sequence requires three to six steps.',
        )
      }
    }
  }

  const prohibitedCopyPattern =
    /\b(?:todo|tbd|fixme|lorem ipsum|innovative|seamless|cutting-edge)\b/iu
  for (const locale of LOCALES) {
    const page = locales[locale]
    if (
      page &&
      collectStrings(page).some(
        (value) =>
          prohibitedCopyPattern.test(value) ||
          hasUnqualifiedDigitalTransformation(value),
      )
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

    const answerCounts = new Map<string, number>([['sector-promise', 1]])
    for (const section of sectionsFor(page)) {
      for (const [index, answer] of section.answers.entries()) {
        if (!SEMANTIC_QUESTION_SET.has(answer)) {
          add(
            'invalid-variant',
            'locales.' +
              locale +
              '.sections.' +
              section.id +
              '.answers.' +
              index,
            'Section answers must use a registered semantic question.',
          )
          continue
        }
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

  const authoredScenes = assets.filter(
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
    for (const [index, asset] of assets.entries()) {
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

  const rawSignatureComposition = candidate.world?.signatureComposition
  const signatureComposition = isRecord(rawSignatureComposition)
    ? rawSignatureComposition
    : null
  const signatureName =
    signatureComposition && isRecord(signatureComposition.name)
      ? signatureComposition.name
      : null
  const signatureMetadataIsComplete =
    signatureComposition !== null &&
    isNonEmptyString(signatureComposition.id) &&
    signatureName !== null &&
    LOCALES.every((locale) => isNonEmptyString(signatureName[locale]))
  const rawSignatureSectionIds = signatureComposition?.sectionIds
  const signatureIdsHaveValidShape =
    Array.isArray(rawSignatureSectionIds) &&
    rawSignatureSectionIds.every(isNonEmptyString)
  const signatureSectionIds = signatureIdsHaveValidShape
    ? rawSignatureSectionIds
    : []
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
  if (
    !signatureMetadataIsComplete ||
    !signatureIdsHaveValidShape ||
    !signatureIdsAreUnique ||
    !signatureIdsExist
  ) {
    add(
      'signature-composition-invalid',
      'world.signatureComposition',
      'Signature composition requires an ID, both localized names, and unique existing section IDs.',
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

    const faqSections = sectionsFor(page).filter(
      (section) => section.type === 'faq',
    )
    if (faqSections.length === 0) {
      add(
        'faq-count',
        'locales.' + locale + '.sections.faq',
        'A FAQ section with four to seven visible questions is required.',
      )
    }
    for (const section of faqSections) {
      if (section.items.length < 4 || section.items.length > 7) {
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

    const bridgeSections = sectionsFor(page).filter(
      (section) => section.type === 'service-bridge',
    )
    if (bridgeSections.length === 0) {
      add(
        'service-count',
        'locales.' + locale + '.sections.service-bridge',
        'A service bridge with two to four services is required.',
      )
    }
    for (const section of bridgeSections) {
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

  for (const [index, claim] of claims.entries()) {
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

      for (const [sectionIndex, section] of sectionsFor(page).entries()) {
        if (
          section.type === 'evidence' &&
          section.variant === 'verified-project' &&
          section.approval !== 'approved'
        ) {
          add(
            'claim-unapproved',
            'locales.' + locale + '.sections.' + sectionIndex + '.approval',
            'Only approved verified-project evidence may be published.',
          )
        }
      }

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

    for (const [index, claim] of claims.entries()) {
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

      const recheckDeadline = calendarDateEnd(claim.recheckAt)
      if (recheckDeadline !== null && now.getTime() > recheckDeadline) {
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
  const uniqueValues = new Map<string, string>()
  const registerUniqueValue = (
    field: string,
    locale: LocaleKey,
    value: string,
    slug: string,
    path: string,
  ): void => {
    const key = locale + '\u0000' + field + '\u0000' + value
    const previousSlug = uniqueValues.get(key)
    if (previousSlug && previousSlug !== slug) {
      errors.push({
        code: 'duplicate-localized-copy',
        path,
        message:
          field +
          ' duplicates ' +
          previousSlug +
          ' for locale ' +
          locale +
          '.',
      })
      return
    }

    uniqueValues.set(key, slug)
  }

  for (const slug of Object.keys(industryManifest) as (keyof IndustryPageRegistry)[]) {
    const definition = registry[slug]
    if (!definition) continue

    for (const issue of validateDefinition(definition, options)) {
      errors.push({
        ...issue,
        path: String(slug) + '.' + issue.path,
      })
    }

    const rawDefinition = definition as unknown as {
      locales?: unknown
      world?: unknown
    }
    const locales = isRecord(rawDefinition.locales)
      ? rawDefinition.locales
      : {}
    const world = isRecord(rawDefinition.world) ? rawDefinition.world : null
    const signatureComposition =
      world && isRecord(world.signatureComposition)
        ? world.signatureComposition
        : null
    const englishPage = locales.en
    let definitionRhythm: string | null = null
    if (
      isLocalizedPageShape(englishPage) &&
      world !== null &&
      isNonEmptyString(world.heroTreatment)
    ) {
      definitionRhythm =
        signatureComposition && isNonEmptyString(signatureComposition.id)
          ? rhythmFingerprint(definition)
          : [
              world.heroTreatment,
              ...englishPage.sections.map(
                (section) => `${section.type}:${section.variant}`,
              ),
              '<invalid-signature-id>',
            ].join('|')
    }

    for (const locale of LOCALES) {
      const page = locales[locale]
      if (!isLocalizedPageShape(page)) continue

      const slugPath = String(slug) + '.locales.' + locale
      const copyValues = [
        ['seo-title', page.seo.title, slugPath + '.seo.title'],
        ['seo-description', page.seo.description, slugPath + '.seo.description'],
        ['h1', page.hero.h1, slugPath + '.hero.h1'],
      ] as const
      for (const [field, value, path] of copyValues) {
        registerUniqueValue(
          field,
          locale,
          normalizeCopy(value),
          String(slug),
          path,
        )
      }

      for (const section of sectionsFor(page)) {
        if (section.type === 'faq') {
          for (const [index, item] of section.items.entries()) {
            registerUniqueValue(
              'faq-question',
              locale,
              normalizeCopy(item.question),
              String(slug),
              slugPath + '.sections.' + section.id + '.items.' + index + '.question',
            )
          }
        }
      }

      const closingSections = sectionsFor(page).filter(
        (section) => section.type === 'closing-cta',
      )
      const ctaLabels = [
        page.hero.primaryCta.label,
        page.hero.secondaryCta.label,
        ...closingSections.flatMap((section) => [
          section.primary.label,
          section.secondary.label,
        ]),
      ]
      for (const [index, label] of ctaLabels.entries()) {
        registerUniqueValue(
          'cta-label',
          locale,
          normalizeCopy(label),
          String(slug),
          slugPath + '.ctaLabels.' + index,
        )
      }

      const manifestEntry = industryManifest[definition.slug]
      if (manifestEntry) {
        registerUniqueValue(
          'content-hash',
          locale,
          contentHash({
            manifest: {
              label: manifestEntry.label[locale],
              navSummary: manifestEntry.navSummary[locale],
            },
            page,
          }),
          String(slug),
          slugPath + '.contentHash',
        )
      }

      if (definitionRhythm) {
        registerUniqueValue(
          'rhythm-fingerprint',
          locale,
          definitionRhythm,
          String(slug),
          slugPath + '.rhythmFingerprint',
        )
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
