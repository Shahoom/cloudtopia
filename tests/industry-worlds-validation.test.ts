import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import test from 'node:test'
import {
  contentHash,
  manifestContentHash,
} from '../lib/industries/content-hash.ts'
import { industryManifest } from '../lib/industries/manifest.ts'
import {
  DRAFT_INDUSTRY_VALIDATION_CODES,
  INDUSTRY_VALIDATION_CODES,
  IndustryPageValidationError,
  assertValidIndustryPageRegistry,
  validateIndustryPageDefinition,
  validateIndustryPageRegistry,
  type DraftIndustryValidationCode,
  type IndustryValidationCode,
} from '../lib/industries/validate-industry-pages.ts'
import {
  SECTION_VARIANTS,
  rhythmFingerprint,
  type AnnotatedModelEvidenceSection,
  type IndustryClaimSource,
  type IndustryManifestReviewRecord,
  type IndustryPageDefinition,
  type IndustryPageRegistry,
  type IndustryReviewRecord,
  type IndustrySection,
  type IndustryTheme,
  type IndustryValidationOptions,
  type ReviewableIndustryContent,
  type SignatureSection,
} from '../lib/industries/types.ts'
import { isolateLtrToken } from '../lib/industries/text.ts'

function sha256Json(value: unknown): `sha256:${string}` {
  return `sha256:${createHash('sha256').update(JSON.stringify(value)).digest('hex')}`
}

const themeFixture = {
  canvas: '#F3FAF8',
  surface: '#FFFFFF',
  elevatedSurface: '#E4F3F0',
  ink: '#0B2B2A',
  mutedInk: '#355C59',
  accent: '#087F73',
  accentInk: '#FFFFFF',
  signal: '#E86262',
  line: '#5F918A',
  focus: '#E86262',
  displayTreatment: 'clinical',
  radiusMode: 'soft',
  motifDensity: 'quiet',
  sceneTreatment: 'pulse-corridor',
} as const satisfies IndustryTheme

const sectionsFixture = [
  {
    id: 'pressure',
    type: 'pressure-field',
    variant: 'split-signal',
    answers: ['operating-pressure'],
    title: 'Pressure',
    intro: 'The current operating pressure.',
    signals: [{ id: 'access', label: 'Access', description: 'A concrete signal.' }],
  },
  {
    id: 'journey',
    type: 'journey-map',
    variant: 'dual-lane',
    answers: ['journey'],
    title: 'Journey',
    intro: 'The operating journey.',
    stages: [{ id: 'request', label: 'Request', description: 'A request arrives.', actor: 'Customer' }],
    lanes: [{ id: 'customer', label: 'Customer', stageIds: ['request'] }],
  },
  {
    id: 'system',
    type: 'system-blueprint',
    variant: 'stacked-layers',
    answers: ['buildable-system'],
    title: 'System',
    intro: 'A buildable system boundary.',
    layers: [
      {
        id: 'experience',
        label: 'Experience',
        description: 'The public-facing layer.',
        inputs: ['Approved content'],
        handoff: 'Qualified request',
        outcome: 'Clear next step',
      },
      {
        id: 'workflow',
        label: 'Workflow',
        description: 'The operating team accepts the qualified request.',
        inputs: ['Qualified request'],
        handoff: 'Owned work item',
        outcome: 'Visible responsibility',
      },
      {
        id: 'reporting',
        label: 'Reporting',
        description: 'A shared status keeps the next decision visible.',
        inputs: ['Owned work item'],
        handoff: 'Reviewed status',
        outcome: 'Clear follow-up',
      },
    ],
  },
  {
    id: 'sequence',
    type: 'use-case-sequence',
    variant: 'timed-pass',
    answers: [],
    title: 'Sequence',
    intro: 'A concrete operating sequence.',
    steps: [
      { id: 'accept', label: 'Accept', description: 'Accept the request.', owner: 'Operator' },
      { id: 'assign', label: 'Assign', description: 'Assign a responsible owner.', owner: 'Coordinator' },
      { id: 'resolve', label: 'Resolve', description: 'Resolve and record the next step.', owner: 'Specialist' },
    ],
  },
  {
    id: 'services',
    type: 'service-bridge',
    variant: 'capability-stack',
    answers: [],
    title: 'Services',
    intro: 'Canonical service and industry paths.',
    serviceIds: ['website-development', 'web-applications'],
    serviceAnchors: [
      { serviceId: 'website-development', label: 'Website development' },
      { serviceId: 'web-applications', label: 'Web applications' },
    ],
    relatedIndustryIds: ['education', 'government-public-sector'],
    industryAnchors: [
      { industryId: 'education', label: 'Education' },
      { industryId: 'government-public-sector', label: 'Public sector' },
    ],
  },
  {
    id: 'evidence',
    type: 'evidence',
    variant: 'verified-project',
    answers: ['evidence-and-constraints'],
    title: 'Evidence',
    intro: 'Repository-backed evidence.',
    projectId: 'kvaii-logistics',
    approval: 'approved',
    provenance: 'CloudTopia project repository',
  },
  {
    id: 'constraints',
    type: 'constraints',
    variant: 'boundary-map',
    answers: [],
    title: 'Constraints',
    intro: 'Responsibilities remain explicit.',
    items: [{
      id: 'content-owner',
      label: 'Content ownership',
      responsibility: 'Client approves domain copy.',
      dependency: 'Named content owner.',
      recovery: 'Return the item for approval.',
    }],
  },
  {
    id: 'regional',
    type: 'regional-fit',
    variant: 'bilingual-operations',
    answers: ['regional-delivery'],
    title: 'Regional delivery',
    intro: 'Delivery accounts for both languages.',
    items: [{ id: 'language', label: 'Language', description: 'English and Arabic are authored.' }],
  },
  {
    id: 'faq',
    type: 'faq',
    variant: 'editorial-list',
    answers: [],
    title: 'Questions',
    intro: 'Decision questions answered directly.',
    items: [
      { id: 'start', question: 'Where do we begin?', answer: 'Begin with one journey.' },
      { id: 'scope', question: 'What belongs in the first scope?', answer: 'Include the smallest complete handoff.' },
      { id: 'owners', question: 'Who needs to participate?', answer: 'Include the people who own each decision.' },
      { id: 'measure', question: 'How is progress reviewed?', answer: 'Review visible states and agreed outcomes.' },
    ],
  },
  {
    id: 'close',
    type: 'closing-cta',
    variant: 'framed-close',
    answers: ['decision-close'],
    title: 'Plan the next step',
    intro: 'Choose a bounded starting point.',
    decisionCopy: 'Map one journey and its handoffs.',
    primary: { label: 'Map the patient journey', href: '/api/whatsapp?locale=en' },
    secondary: { label: 'Explore web applications', serviceId: 'web-applications' },
  },
] as const satisfies readonly IndustrySection[]

const arabicSectionsFixture = structuredClone(sectionsFixture).map((section) => {
  if (section.type !== 'closing-cta') return section

  return {
    ...section,
    primary: {
      label: 'لنرسم رحلة المريض',
      href: '/api/whatsapp?locale=ar',
    },
  }
}) satisfies readonly IndustrySection[]

const annotatedEvidenceFixture = {
  id: 'annotated-evidence',
  type: 'evidence',
  variant: 'annotated-model',
  answers: [],
  title: 'Operating observations',
  intro: 'Annotations distinguish the operating model from verified proof.',
  observations: [{ id: 'handoff', label: 'Handoff', description: 'An owner accepts the next step.' }],
} as const satisfies AnnotatedModelEvidenceSection

const signatureFixture = {
  id: 'registered-signature',
  type: 'signature',
  variant: 'registered-composition',
  answers: [],
  title: 'Registered composition',
  intro: 'A typed escape hatch for a separately registered renderer.',
} as const satisfies SignatureSection

const definitionFixture = {
  slug: 'healthcare',
  contentVersion: 'fixture-v1',
  updatedAt: '2026-07-15',
  world: {
    id: 'clinical-pulse',
    theme: themeFixture,
    heroScene: 'healthcare-pulse',
    heroTreatment: 'corridor-split',
    signatureComposition: {
      id: 'continuity-of-care',
      name: { en: 'Continuity of care', ar: 'استمرارية الرعاية' },
      sectionIds: ['journey'],
    },
  },
  assets: [
    { kind: 'authored-scene', id: 'healthcare-pulse' },
    {
      kind: 'og-image',
      locale: 'en',
      publicPath: '/og/industries/healthcare/en.jpg',
      width: 1200,
      height: 630,
    },
  ],
  claims: [],
  locales: {
    en: {
      seo: { title: 'Healthcare systems', description: 'A concrete healthcare system description.' },
      breadcrumbLabel: 'Healthcare',
      hero: {
        worldLabel: 'Clinical Pulse',
        eyebrow: 'Healthcare',
        h1: 'Make the next patient step clear.',
        intro: 'Map one patient journey before choosing the system boundary.',
        primaryCta: { label: 'Map the patient journey', href: '/api/whatsapp?locale=en' },
        secondaryCta: { label: 'Explore web applications', serviceId: 'web-applications' },
        sceneSummary: 'A calm corridor maps the patient and staff handoff.',
        sceneStages: [{ id: 'request', label: 'Request', state: 'Ready' }],
      },
      sections: sectionsFixture,
    },
    ar: {
      seo: { title: 'أنظمة الرعاية الصحية', description: 'وصف واضح لنظام رقمي في قطاع الرعاية الصحية.' },
      breadcrumbLabel: 'الرعاية الصحية',
      hero: {
        worldLabel: 'النبض السريري',
        eyebrow: 'الرعاية الصحية',
        h1: 'اجعل الخطوة التالية للمريض أكثر وضوحاً.',
        intro: 'نرسم رحلة واحدة للمريض قبل تحديد نطاق النظام.',
        primaryCta: { label: 'لنرسم رحلة المريض', href: '/api/whatsapp?locale=ar' },
        secondaryCta: { label: 'استكشف تطبيقات الويب', serviceId: 'web-applications' },
        sceneSummary: 'مسار هادئ يوضح انتقال العمل بين المريض والفريق.',
        sceneStages: [{ id: 'request', label: 'الطلب', state: 'جاهز' }],
      },
      sections: arabicSectionsFixture,
    },
  },
} as const satisfies IndustryPageDefinition

const registryFixture = {
  healthcare: definitionFixture,
  fintech: null,
  'ecommerce-retail': null,
  'real-estate': null,
  education: null,
  'travel-hospitality': null,
  restaurants: null,
  'legal-firms': null,
  construction: null,
  retail: null,
  'professional-services': null,
  'logistics-supply-chain': null,
  'government-public-sector': null,
} as const satisfies IndustryPageRegistry

const reviewFixture = {
  slug: 'healthcare',
  locale: 'ar',
  kind: 'native-arabic',
  reviewer: 'Reviewer',
  reviewedAt: '2026-07-15',
  contentHash: 'sha256:fixture',
} as const satisfies IndustryReviewRecord

const manifestReviewFixture = {
  locale: 'en',
  kind: 'manifest-editorial',
  reviewer: 'Reviewer',
  reviewedAt: '2026-07-15',
  contentHash: 'sha256:fixture',
} as const satisfies IndustryManifestReviewRecord

const claimFixture = {
  id: 'fixture-claim',
  locale: 'both',
  wording: 'A reviewed claim.',
  scope: 'Fixture only.',
  source: 'Fixture source.',
  owner: 'Fixture owner.',
  approval: 'approved',
  reviewedAt: '2026-07-15',
  recheckAt: '2027-07-15',
} as const satisfies IndustryClaimSource

const validationOptionsFixture = {
  mode: 'publication',
  reviews: [reviewFixture],
  manifestReviews: [manifestReviewFixture],
  now: new Date('2026-07-15T00:00:00.000Z'),
  assetExists: (publicPath: string) => publicPath.endsWith('.jpg'),
  allowCustomSignature: false,
} as const satisfies IndustryValidationOptions

const reviewableContentFixture = {
  manifest: { label: 'Healthcare', navSummary: 'Patient journeys and clinic workflows.' },
  page: definitionFixture.locales.en,
} as const satisfies ReviewableIndustryContent

const expectedDraftCodes = [
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
] as const satisfies readonly DraftIndustryValidationCode[]

const expectedCodes = [
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
] as const satisfies readonly IndustryValidationCode[]

type MutableDeep<T> = T extends readonly (infer TItem)[]
  ? MutableDeep<TItem>[]
  : T extends object
    ? { -readonly [TKey in keyof T]: MutableDeep<T[TKey]> }
    : T

type MutableDefinition = MutableDeep<IndustryPageDefinition>
type SectionByType<TType extends IndustrySection['type']> = Extract<
  IndustrySection,
  { type: TType }
>

function cloneDefinition(): MutableDefinition {
  return structuredClone(definitionFixture) as unknown as MutableDefinition
}

function getSection<TType extends IndustrySection['type']>(
  definition: MutableDefinition,
  locale: 'en' | 'ar',
  type: TType,
): MutableDeep<SectionByType<TType>> {
  const section = definition.locales[locale].sections.find(
    (candidate) => candidate.type === type,
  )

  assert.ok(section, `fixture is missing ${locale} ${type}`)
  return section as MutableDeep<SectionByType<TType>>
}

function expectDraftCode(
  code: DraftIndustryValidationCode,
  mutate: (definition: MutableDefinition) => void,
): void {
  const definition = cloneDefinition()
  mutate(definition)

  const result = validateIndustryPageDefinition(
    definition as IndustryPageDefinition,
    { mode: 'draft' },
  )

  assert.equal(result.ok, false, `expected ${code}, received no errors`)
  assert.ok(
    result.errors.some((error) => error.code === code),
    `expected ${code}, received ${result.errors.map((error) => error.code).join(', ')}`,
  )
}

type PilotConfig = {
  slug: 'logistics-supply-chain' | 'restaurants'
  scene: 'logistics-flow' | 'restaurant-pass'
  heroTreatment: 'route-field' | 'editorial-pass'
  signatureId: 'exception-control' | 'the-pass'
  signatureName: Record<'en' | 'ar', string>
  signatureSectionIds: readonly string[]
  relatedIndustryIds: readonly [IndustryPageDefinition['slug'], IndustryPageDefinition['slug']]
  serviceIds: readonly [
    IndustryPageDefinition['locales']['en']['hero']['secondaryCta']['serviceId'],
    IndustryPageDefinition['locales']['en']['hero']['secondaryCta']['serviceId'],
  ]
  displayTreatment: IndustryTheme['displayTreatment']
  radiusMode: IndustryTheme['radiusMode']
  motifDensity: IndustryTheme['motifDensity']
  sceneTreatment: IndustryTheme['sceneTreatment']
  copy: Record<
    'en' | 'ar',
    {
      seoTitle: string
      seoDescription: string
      h1: string
      primaryCta: string
      secondaryCta: string
      faqPrefix: string
    }
  >
}

function makePilotDefinition(config: PilotConfig): IndustryPageDefinition {
  const definition = cloneDefinition()
  definition.slug = config.slug
  definition.contentVersion = `${config.slug}-fixture-v1`
  definition.world.id = `${config.slug}-world`
  definition.world.heroScene = config.scene
  definition.world.heroTreatment = config.heroTreatment
  definition.world.signatureComposition = {
    id: config.signatureId,
    name: { ...config.signatureName },
    sectionIds: [...config.signatureSectionIds],
  }
  definition.world.theme.displayTreatment = config.displayTreatment
  definition.world.theme.radiusMode = config.radiusMode
  definition.world.theme.motifDensity = config.motifDensity
  definition.world.theme.sceneTreatment = config.sceneTreatment

  const scene = definition.assets.find((asset) => asset.kind === 'authored-scene')
  assert.ok(scene && scene.kind === 'authored-scene')
  scene.id = config.scene

  const ogImage = definition.assets.find((asset) => asset.kind === 'og-image')
  assert.ok(ogImage && ogImage.kind === 'og-image')
  ogImage.publicPath = `/og/industries/${config.slug}/en.jpg`

  for (const locale of ['en', 'ar'] as const) {
    const page = definition.locales[locale]
    const copy = config.copy[locale]
    page.seo.title = copy.seoTitle
    page.seo.description = copy.seoDescription
    page.hero.h1 = copy.h1
    page.hero.primaryCta.label = copy.primaryCta
    page.hero.secondaryCta = {
      label: copy.secondaryCta,
      serviceId: config.serviceIds[0],
    }

    const close = getSection(definition, locale, 'closing-cta')
    close.primary.label = copy.primaryCta
    close.secondary = {
      label: copy.secondaryCta,
      serviceId: config.serviceIds[0],
    }

    const bridge = getSection(definition, locale, 'service-bridge')
    bridge.serviceIds = [...config.serviceIds]
    bridge.serviceAnchors = config.serviceIds.map((serviceId, index) => ({
      serviceId,
      label: `${copy.secondaryCta} ${index + 1}`,
    }))
    bridge.relatedIndustryIds = [...config.relatedIndustryIds]
    bridge.industryAnchors = config.relatedIndustryIds.map((industryId, index) => ({
      industryId,
      label: `${config.slug} related ${index + 1}`,
    }))

    const faq = getSection(definition, locale, 'faq')
    faq.items.forEach((item, index) => {
      item.question = `${copy.faqPrefix} ${index + 1}?`
    })
  }

  if (config.slug === 'logistics-supply-chain') {
    for (const locale of ['en', 'ar'] as const) {
      getSection(definition, locale, 'journey-map').variant = 'exception-lane'
      getSection(definition, locale, 'constraints').variant = 'owner-register'
    }
  }

  return definition as IndustryPageDefinition
}

const logisticsFixture = makePilotDefinition({
  slug: 'logistics-supply-chain',
  scene: 'logistics-flow',
  heroTreatment: 'route-field',
  signatureId: 'exception-control',
  signatureName: { en: 'Exception control', ar: 'ضبط الاستثناءات' },
  signatureSectionIds: ['journey', 'constraints'],
  relatedIndustryIds: ['ecommerce-retail', 'retail'],
  serviceIds: ['business-systems-development', 'web-applications'],
  displayTreatment: 'technical',
  radiusMode: 'square',
  motifDensity: 'dense',
  sceneTreatment: 'route-field',
  copy: {
    en: {
      seoTitle: 'Logistics flow systems',
      seoDescription: 'A concrete logistics flow and exception-control description.',
      h1: 'See every handoff from order to delivery proof.',
      primaryCta: 'Map the logistics flow',
      secondaryCta: 'Explore logistics systems',
      faqPrefix: 'Logistics decision question',
    },
    ar: {
      seoTitle: 'أنظمة تدفق الخدمات اللوجستية',
      seoDescription: 'وصف واضح لتدفق الخدمات اللوجستية وضبط الاستثناءات.',
      h1: 'رؤية أوضح لكل خطوة من الطلب إلى إثبات التسليم.',
      primaryCta: 'لنرسم تدفق العمليات',
      secondaryCta: 'استكشف أنظمة الخدمات اللوجستية',
      faqPrefix: 'سؤال قرار لوجستي',
    },
  },
})

const restaurantsFixture = makePilotDefinition({
  slug: 'restaurants',
  scene: 'restaurant-pass',
  heroTreatment: 'editorial-pass',
  signatureId: 'the-pass',
  signatureName: { en: 'The pass', ar: 'خط التمرير' },
  signatureSectionIds: ['sequence'],
  relatedIndustryIds: ['retail', 'travel-hospitality'],
  serviceIds: ['restaurant-qr-menu', 'website-development'],
  displayTreatment: 'editorial',
  radiusMode: 'cut',
  motifDensity: 'medium',
  sceneTreatment: 'service-pass',
  copy: {
    en: {
      seoTitle: 'Restaurant service systems',
      seoDescription: 'A concrete restaurant order and service-pass description.',
      h1: 'Keep every order moving from choice to service.',
      primaryCta: 'Map the restaurant service flow',
      secondaryCta: 'Explore restaurant menu systems',
      faqPrefix: 'Restaurant decision question',
    },
    ar: {
      seoTitle: 'أنظمة تشغيل المطاعم',
      seoDescription: 'وصف واضح لمسار الطلب والخدمة في المطاعم.',
      h1: 'حافظ على تدفق كل طلب من الاختيار إلى التقديم.',
      primaryCta: 'لنرسم مسار خدمة المطعم',
      secondaryCta: 'استكشف أنظمة قوائم المطاعم',
      faqPrefix: 'سؤال قرار للمطعم',
    },
  },
})

const pilotRegistry = {
  ...registryFixture,
  'logistics-supply-chain': logisticsFixture,
  restaurants: restaurantsFixture,
} satisfies IndustryPageRegistry

const pilotDefinitions = [
  definitionFixture,
  logisticsFixture,
  restaurantsFixture,
] as const satisfies readonly IndustryPageDefinition[]

function localizedReviewHash(
  definition: IndustryPageDefinition,
  locale: 'en' | 'ar',
): `sha256:${string}` {
  const entry = industryManifest[definition.slug]

  return contentHash({
    manifest: {
      label: entry.label[locale],
      navSummary: entry.navSummary[locale],
    },
    page: definition.locales[locale],
  })
}

function makePublicationReviews(
  definitions: readonly IndustryPageDefinition[],
): IndustryReviewRecord[] {
  const reviews: IndustryReviewRecord[] = []

  for (const definition of definitions) {
    reviews.push({
      slug: definition.slug,
      locale: 'en',
      kind: 'editorial',
      reviewer: 'English fixture reviewer',
      reviewedAt: '2026-07-15',
      contentHash: localizedReviewHash(definition, 'en'),
    })
    reviews.push({
      slug: definition.slug,
      locale: 'ar',
      kind: 'native-arabic',
      reviewer: 'Arabic fixture reviewer',
      reviewedAt: '2026-07-15',
      contentHash: localizedReviewHash(definition, 'ar'),
    })

    if (definition.slug === 'healthcare') {
      for (const locale of ['en', 'ar'] as const) {
        reviews.push({
          slug: definition.slug,
          locale,
          kind: 'sensitive-domain',
          reviewer: 'Healthcare fixture reviewer',
          reviewedAt: '2026-07-15',
          contentHash: localizedReviewHash(definition, locale),
        })
      }
    }
  }

  return reviews
}

function makeManifestReviews(): IndustryManifestReviewRecord[] {
  return [
    {
      locale: 'en',
      kind: 'manifest-editorial',
      reviewer: 'Manifest English fixture reviewer',
      reviewedAt: '2026-07-15',
      contentHash: manifestContentHash('en', industryManifest),
    },
    {
      locale: 'ar',
      kind: 'manifest-native-arabic',
      reviewer: 'Manifest Arabic fixture reviewer',
      reviewedAt: '2026-07-15',
      contentHash: manifestContentHash('ar', industryManifest),
    },
  ]
}

function makePublicationOptions(
  definitions: readonly IndustryPageDefinition[] = pilotDefinitions,
): {
  mode: 'publication'
  reviews: IndustryReviewRecord[]
  manifestReviews: IndustryManifestReviewRecord[]
  now: Date
  assetExists: (publicPath: string) => boolean
  allowCustomSignature: false
} {
  return {
    mode: 'publication',
    reviews: makePublicationReviews(definitions),
    manifestReviews: makeManifestReviews(),
    now: new Date('2026-07-15T12:00:00.000Z'),
    assetExists: () => true,
    allowCustomSignature: false,
  }
}

function expectPublicationCode(
  code: IndustryValidationCode,
  definition: IndustryPageDefinition,
  options = makePublicationOptions([definition]),
): void {
  const result = validateIndustryPageDefinition(definition, options)

  assert.equal(result.ok, false, `expected ${code}, received no errors`)
  assert.ok(
    result.errors.some((error) => error.code === code),
    `expected ${code}, received ${result.errors.map((error) => error.code).join(', ')}`,
  )
}

function definitionWithVisibleClaim(): MutableDefinition {
  const definition = cloneDefinition()
  const claim = structuredClone(claimFixture) as MutableDeep<IndustryClaimSource>
  claim.locale = 'en'

  const evidence = getSection(definition, 'en', 'evidence')
  evidence.title = claim.wording
  evidence.intro = claim.scope
  definition.claims.push(claim)

  return definition
}

test('the static world contract accepts every content-bearing section shape', () => {
  assert.deepEqual(SECTION_VARIANTS, {
    'pressure-field': ['split-signal', 'constraints-first', 'dense-ledger'],
    'journey-map': ['linear-route', 'dual-lane', 'exception-lane'],
    'system-blueprint': ['stacked-layers', 'constellation', 'service-line'],
    'use-case-sequence': ['numbered-flow', 'operating-matrix', 'timed-pass'],
    'service-bridge': ['route-links', 'capability-stack'],
    evidence: ['verified-project', 'annotated-model'],
    constraints: ['boundary-map', 'owner-register'],
    'regional-fit': ['bilingual-operations', 'market-path'],
    faq: ['editorial-list', 'grouped-questions'],
    'closing-cta': ['framed-close', 'split-close'],
  })
  assert.equal(registryFixture.healthcare, definitionFixture)
  assert.equal(annotatedEvidenceFixture.variant, 'annotated-model')
  assert.equal(signatureFixture.type, 'signature')
  assert.equal(validationOptionsFixture.reviews[0], reviewFixture)
  assert.equal(claimFixture.approval, 'approved')
  assert.equal(reviewableContentFixture.page, definitionFixture.locales.en)
})

test('rhythmFingerprint follows the exact deterministic recipe order', () => {
  assert.equal(
    rhythmFingerprint(definitionFixture),
    'corridor-split|pressure-field:split-signal|journey-map:dual-lane|system-blueprint:stacked-layers|use-case-sequence:timed-pass|service-bridge:capability-stack|evidence:verified-project|constraints:boundary-map|regional-fit:bilingual-operations|faq:editorial-list|closing-cta:framed-close|continuity-of-care',
  )
})

test('isolateLtrToken wraps content with the exact FSI and PDI code points', () => {
  const isolated = isolateLtrToken('CRM')

  assert.equal(isolated, '\u2068CRM\u2069')
  assert.deepEqual(
    Array.from(isolated, (character) => character.codePointAt(0)),
    [0x2068, 0x43, 0x52, 0x4d, 0x2069],
  )
})

test('contentHash is deterministic and preserves JSON property order', () => {
  const firstHash = contentHash(reviewableContentFixture)
  const equivalentHash = contentHash({
    manifest: {
      label: reviewableContentFixture.manifest.label,
      navSummary: reviewableContentFixture.manifest.navSummary,
    },
    page: reviewableContentFixture.page,
  })
  const reorderedHash = contentHash({
    page: reviewableContentFixture.page,
    manifest: reviewableContentFixture.manifest,
  })

  assert.equal(firstHash, sha256Json(reviewableContentFixture))
  assert.equal(equivalentHash, firstHash)
  assert.notEqual(reorderedHash, firstHash)
  assert.match(firstHash, /^sha256:[a-f0-9]{64}$/)
})

test('manifestContentHash covers all thirteen entries in the selected locale', () => {
  const localizedPacket = (locale: 'en' | 'ar') =>
    Object.values(industryManifest).map(({ slug, label, navSummary }) => ({
      slug,
      label: label[locale],
      navSummary: navSummary[locale],
    }))

  assert.equal(localizedPacket('en').length, 13)
  assert.equal(
    manifestContentHash('en', industryManifest),
    'sha256:becf7d71a4f2ef98cf72c3aa631b4beaac7a330b734915abb1ec6046417ac584',
  )
  assert.equal(
    manifestContentHash('ar', industryManifest),
    'sha256:126ddad77040704b81870293bda13871abb896d761b9be42337066933b338610',
  )
  assert.equal(manifestContentHash('en', industryManifest), sha256Json(localizedPacket('en')))
  assert.equal(manifestContentHash('ar', industryManifest), sha256Json(localizedPacket('ar')))
  assert.notEqual(
    manifestContentHash('en', industryManifest),
    manifestContentHash('ar', industryManifest),
  )
})

test('draft validation exposes the exact public code set and accepts the three pilots', () => {
  assert.deepEqual(DRAFT_INDUSTRY_VALIDATION_CODES, expectedDraftCodes)

  for (const definition of [definitionFixture, logisticsFixture, restaurantsFixture]) {
    assert.deepEqual(
      validateIndustryPageDefinition(definition, { mode: 'draft' }),
      { ok: true, errors: [] },
    )
  }

  const registryResult = validateIndustryPageRegistry(pilotRegistry, { mode: 'draft' })
  assert.deepEqual(registryResult, { ok: true, errors: [] })
  assert.doesNotThrow(() => {
    assertValidIndustryPageRegistry(pilotRegistry, { mode: 'draft' })
  })

  const fingerprints = [
    rhythmFingerprint(definitionFixture),
    rhythmFingerprint(logisticsFixture),
    rhythmFingerprint(restaurantsFixture),
  ]
  assert.equal(new Set(fingerprints).size, 3)
  assert.ok(fingerprints.every((fingerprint) => !fingerprint.includes('signature:')))
  assert.deepEqual(fingerprints, [
    'corridor-split|pressure-field:split-signal|journey-map:dual-lane|system-blueprint:stacked-layers|use-case-sequence:timed-pass|service-bridge:capability-stack|evidence:verified-project|constraints:boundary-map|regional-fit:bilingual-operations|faq:editorial-list|closing-cta:framed-close|continuity-of-care',
    'route-field|pressure-field:split-signal|journey-map:exception-lane|system-blueprint:stacked-layers|use-case-sequence:timed-pass|service-bridge:capability-stack|evidence:verified-project|constraints:owner-register|regional-fit:bilingual-operations|faq:editorial-list|closing-cta:framed-close|exception-control',
    'editorial-pass|pressure-field:split-signal|journey-map:dual-lane|system-blueprint:stacked-layers|use-case-sequence:timed-pass|service-bridge:capability-stack|evidence:verified-project|constraints:boundary-map|regional-fit:bilingual-operations|faq:editorial-list|closing-cta:framed-close|the-pass',
  ])
})

test('validation exposes the exact combined draft and publication code set', () => {
  assert.deepEqual(INDUSTRY_VALIDATION_CODES, expectedCodes)
})

test('publication validation accepts exact localized page, manifest, and review hashes', () => {
  const checkedAssets: string[] = []
  const options = makePublicationOptions()
  options.assetExists = (publicPath) => {
    checkedAssets.push(publicPath)
    return true
  }

  for (const review of options.reviews) {
    const definition = pilotDefinitions.find(
      (candidate) => candidate.slug === review.slug,
    )
    assert.ok(definition)
    assert.equal(review.contentHash, localizedReviewHash(definition, review.locale))
  }
  for (const review of options.manifestReviews) {
    assert.equal(
      review.contentHash,
      manifestContentHash(review.locale, industryManifest),
    )
  }

  assert.deepEqual(
    validateIndustryPageRegistry(pilotRegistry, options),
    { ok: true, errors: [] },
  )
  assert.deepEqual(checkedAssets.sort(), [
    '/og/industries/healthcare/en.jpg',
    '/og/industries/logistics-supply-chain/en.jpg',
    '/og/industries/restaurants/en.jpg',
  ])
  assert.doesNotThrow(() => {
    assertValidIndustryPageRegistry(pilotRegistry, makePublicationOptions())
  })
})

test('missing-native-review rejects every published pilot without its Arabic review', () => {
  for (const definition of pilotDefinitions) {
    const options = makePublicationOptions()
    options.reviews = options.reviews.filter(
      (review) =>
        !(
          review.slug === definition.slug &&
          review.locale === 'ar' &&
          review.kind === 'native-arabic'
        ),
    )

    const result = validateIndustryPageRegistry(pilotRegistry, options)
    assert.ok(result.errors.some((error) => error.code === 'missing-native-review'))
    assert.throws(
      () => assertValidIndustryPageRegistry(pilotRegistry, options),
      (error) =>
        error instanceof IndustryPageValidationError &&
        error.errors.some((issue) => issue.code === 'missing-native-review'),
    )
  }
})

test('missing-sensitive-review rejects either Healthcare locale without domain review', () => {
  for (const locale of ['en', 'ar'] as const) {
    const options = makePublicationOptions()
    options.reviews = options.reviews.filter(
      (review) =>
        !(
          review.slug === 'healthcare' &&
          review.locale === locale &&
          review.kind === 'sensitive-domain'
        ),
    )

    const result = validateIndustryPageRegistry(pilotRegistry, options)
    assert.ok(result.errors.some((error) => error.code === 'missing-sensitive-review'))
  }
})

test('missing-manifest-review rejects either incomplete locale review packet', () => {
  for (const locale of ['en', 'ar'] as const) {
    const options = makePublicationOptions()
    options.manifestReviews = options.manifestReviews.filter(
      (review) => review.locale !== locale,
    )

    const result = validateIndustryPageRegistry(pilotRegistry, options)
    assert.ok(result.errors.some((error) => error.code === 'missing-manifest-review'))
  }
})

test('review-hash-mismatch rejects stale page and complete-manifest approvals', () => {
  const stalePageOptions = makePublicationOptions()
  const pageReview = stalePageOptions.reviews.find(
    (review) =>
      review.slug === 'restaurants' &&
      review.locale === 'en' &&
      review.kind === 'editorial',
  )
  assert.ok(pageReview)
  pageReview.contentHash = 'sha256:stale-page-review'

  const staleManifestOptions = makePublicationOptions()
  staleManifestOptions.manifestReviews[0].contentHash =
    'sha256:stale-manifest-review'

  const missingEditorialOptions = makePublicationOptions()
  missingEditorialOptions.reviews = missingEditorialOptions.reviews.filter(
    (review) =>
      !(
        review.slug === 'logistics-supply-chain' &&
        review.locale === 'en' &&
        review.kind === 'editorial'
      ),
  )

  for (const options of [
    stalePageOptions,
    staleManifestOptions,
    missingEditorialOptions,
  ]) {
    const result = validateIndustryPageRegistry(pilotRegistry, options)
    assert.ok(result.errors.some((error) => error.code === 'review-hash-mismatch'))
  }
})

test('publication checks OG path, dimensions, and existence without treating scenes as files', () => {
  const validDefinition = cloneDefinition()
  const checkedAssets: string[] = []
  const validOptions = makePublicationOptions([
    validDefinition as IndustryPageDefinition,
  ])
  validOptions.assetExists = (publicPath) => {
    checkedAssets.push(publicPath)
    return true
  }

  assert.deepEqual(
    validateIndustryPageDefinition(
      validDefinition as IndustryPageDefinition,
      validOptions,
    ),
    { ok: true, errors: [] },
  )
  assert.deepEqual(checkedAssets, ['/og/industries/healthcare/en.jpg'])

  for (const mutate of [
    (definition: MutableDefinition) => {
      const asset = definition.assets.find((candidate) => candidate.kind === 'og-image')
      assert.ok(asset && asset.kind === 'og-image')
      asset.publicPath = '/og/industries/restaurants/en.jpg'
    },
    (definition: MutableDefinition) => {
      const asset = definition.assets.find((candidate) => candidate.kind === 'og-image')
      assert.ok(asset && asset.kind === 'og-image')
      asset.width = 1199 as 1200
    },
  ]) {
    const definition = cloneDefinition()
    mutate(definition)
    expectPublicationCode(
      'invalid-variant',
      definition as IndustryPageDefinition,
    )
  }

  const missingAssetDefinition = cloneDefinition()
  const missingAssetOptions = makePublicationOptions([
    missingAssetDefinition as IndustryPageDefinition,
  ])
  missingAssetOptions.assetExists = () => false
  expectPublicationCode(
    'invalid-variant',
    missingAssetDefinition as IndustryPageDefinition,
    missingAssetOptions,
  )
})

test('publication accepts exact visible claim wording and scope through its recheck date', () => {
  const definition = definitionWithVisibleClaim()
  const claim = definition.claims[0]
  claim.recheckAt = '2026-07-15'

  assert.deepEqual(
    validateIndustryPageDefinition(
      definition as IndustryPageDefinition,
      makePublicationOptions([definition as IndustryPageDefinition]),
    ),
    { ok: true, errors: [] },
  )
})

test('claim-source-missing rejects visible wording, scope, or locale drift', () => {
  for (const mutate of [
    (claim: MutableDeep<IndustryClaimSource>) => {
      claim.wording = 'A differently worded claim.'
    },
    (claim: MutableDeep<IndustryClaimSource>) => {
      claim.scope = 'A different scope.'
    },
    (claim: MutableDeep<IndustryClaimSource>) => {
      claim.locale = 'ar'
    },
  ]) {
    const definition = definitionWithVisibleClaim()
    mutate(definition.claims[0])
    expectPublicationCode(
      'claim-source-missing',
      definition as IndustryPageDefinition,
    )
  }
})

test('claim-unapproved rejects pending and rejected visible source records', () => {
  for (const approval of ['pending', 'rejected'] as const) {
    const definition = definitionWithVisibleClaim()
    definition.claims[0].approval = approval
    expectPublicationCode(
      'claim-unapproved',
      definition as IndustryPageDefinition,
    )
  }
})

test('claim-expired compares recheckAt with the injected publication date', () => {
  const definition = definitionWithVisibleClaim()
  definition.claims[0].recheckAt = '2026-07-14'

  expectPublicationCode(
    'claim-expired',
    definition as IndustryPageDefinition,
    makePublicationOptions([definition as IndustryPageDefinition]),
  )
})

test('claim-source-missing rejects a non-calendar recheck date', () => {
  const definition = definitionWithVisibleClaim()
  definition.claims[0].recheckAt = '2026-02-30'

  expectPublicationCode(
    'claim-source-missing',
    definition as IndustryPageDefinition,
    makePublicationOptions([definition as IndustryPageDefinition]),
  )
})

test('missing-locale rejects a definition without either complete locale object', () => {
  expectDraftCode('missing-locale', (definition) => {
    delete (definition.locales as Partial<MutableDefinition['locales']>).ar
  })
})

test('localized-copy-missing rejects whitespace-only visible copy', () => {
  expectDraftCode('localized-copy-missing', (definition) => {
    definition.locales.en.hero.h1 = '   '
  })
})

test('malformed localized structures return issues instead of throwing', () => {
  const cases: readonly [
    string,
    (definition: MutableDefinition) => void,
  ][] = [
    ['missing H1', (definition) => {
      delete (definition.locales.en.hero as Partial<
        MutableDefinition['locales']['en']['hero']
      >).h1
    }],
    ['missing primary CTA', (definition) => {
      delete (definition.locales.en.hero as Partial<
        MutableDefinition['locales']['en']['hero']
      >).primaryCta
    }],
    ['missing sections array', (definition) => {
      delete (definition.locales.en as Partial<
        MutableDefinition['locales']['en']
      >).sections
    }],
    ['missing section answers', (definition) => {
      delete (definition.locales.en.sections[0] as Partial<
        MutableDefinition['locales']['en']['sections'][number]
      >).answers
    }],
    ['missing journey stages', (definition) => {
      delete (getSection(definition, 'en', 'journey-map') as Partial<
        MutableDeep<SectionByType<'journey-map'>>
      >).stages
    }],
    ['missing layer inputs', (definition) => {
      const layer = getSection(definition, 'en', 'system-blueprint').layers[0]
      delete (layer as Partial<typeof layer>).inputs
    }],
    ['missing service anchors', (definition) => {
      delete (getSection(definition, 'en', 'service-bridge') as Partial<
        MutableDeep<SectionByType<'service-bridge'>>
      >).serviceAnchors
    }],
    ['missing FAQ answer', (definition) => {
      const item = getSection(definition, 'en', 'faq').items[0]
      delete (item as Partial<typeof item>).answer
    }],
    ['non-object section', (definition) => {
      definition.locales.en.sections = [null as never]
    }],
  ]

  for (const [name, mutate] of cases) {
    const definition = cloneDefinition()
    mutate(definition)
    let result: ReturnType<typeof validateIndustryPageDefinition> | undefined

    assert.doesNotThrow(() => {
      result = validateIndustryPageDefinition(
        definition as IndustryPageDefinition,
        { mode: 'draft' },
      )
    }, name)
    assert.ok(
      result?.errors.some((error) => error.code === 'localized-copy-missing'),
      `${name} did not return localized-copy-missing`,
    )
  }
})

test('parity-drift rejects unstable EN and AR semantic IDs', () => {
  expectDraftCode('parity-drift', (definition) => {
    getSection(definition, 'ar', 'journey-map').stages[0].id = 'طلب-مختلف'
  })
})

test('duplicate-localized-copy rejects repeated per-locale registry content', () => {
  const duplicate = cloneDefinition()
  duplicate.slug = 'fintech'
  for (const locale of ['en', 'ar'] as const) {
    const bridge = getSection(duplicate, locale, 'service-bridge')
    bridge.relatedIndustryIds = ['professional-services', 'government-public-sector']
    bridge.industryAnchors = [
      { industryId: 'professional-services', label: 'Professional services' },
      { industryId: 'government-public-sector', label: 'Public sector' },
    ]
  }

  const result = validateIndustryPageRegistry({
    ...registryFixture,
    fintech: duplicate as IndustryPageDefinition,
  }, { mode: 'draft' })

  assert.equal(result.ok, false)
  assert.ok(result.errors.some((error) => error.code === 'duplicate-localized-copy'))
  assert.throws(
    () => assertValidIndustryPageRegistry({
      ...registryFixture,
      fintech: duplicate as IndustryPageDefinition,
    }, { mode: 'draft' }),
    (error) => error instanceof IndustryPageValidationError &&
      error.errors.some((issue) => issue.code === 'duplicate-localized-copy'),
  )
})

test('duplicate-localized-copy rejects repeated FAQ questions inside one locale', () => {
  expectDraftCode('duplicate-localized-copy', (definition) => {
    const faq = getSection(definition, 'en', 'faq')
    faq.items[1].question = faq.items[0].question
  })
})

test('registry uniqueness rejects every required locale-scoped repeat', () => {
  const cases: readonly [
    string,
    (definition: MutableDefinition) => void,
  ][] = [
    ['SEO title', (definition) => {
      definition.locales.en.seo.title = definitionFixture.locales.en.seo.title
    }],
    ['SEO description', (definition) => {
      definition.locales.en.seo.description =
        definitionFixture.locales.en.seo.description
    }],
    ['H1', (definition) => {
      definition.locales.en.hero.h1 = definitionFixture.locales.en.hero.h1
    }],
    ['FAQ question', (definition) => {
      getSection(definition, 'en', 'faq').items[0].question =
        getSection(cloneDefinition(), 'en', 'faq').items[0].question
    }],
    ['CTA label', (definition) => {
      const label = definitionFixture.locales.en.hero.primaryCta.label
      definition.locales.en.hero.primaryCta.label = label
      getSection(definition, 'en', 'closing-cta').primary.label = label
    }],
    ['localized content hash', (definition) => {
      Object.assign(definition, structuredClone(definitionFixture))
    }],
    ['rhythm fingerprint', (definition) => {
      definition.world.heroTreatment = definitionFixture.world.heroTreatment
      definition.world.signatureComposition.id =
        definitionFixture.world.signatureComposition.id
      for (const locale of ['en', 'ar'] as const) {
        getSection(definition, locale, 'journey-map').variant = 'dual-lane'
        getSection(definition, locale, 'constraints').variant = 'boundary-map'
      }
    }],
  ]

  for (const [name, mutate] of cases) {
    const definition = structuredClone(
      logisticsFixture,
    ) as unknown as MutableDefinition
    mutate(definition)

    const result = validateIndustryPageRegistry({
      ...pilotRegistry,
      'logistics-supply-chain': definition as IndustryPageDefinition,
    }, { mode: 'draft' })

    assert.ok(
      result.errors.some((error) => error.code === 'duplicate-localized-copy'),
      `${name} repeat was not rejected: ${result.errors.map((error) => error.code).join(', ')}`,
    )
  }
})

test('content-too-thin validates the opening sentence as answer-first', () => {
  for (const intro of [
    'What could we build?',
    'What could we build? Begin with one bounded patient handoff.',
  ]) {
    expectDraftCode('content-too-thin', (definition) => {
      definition.locales.en.hero.intro = intro
    })
  }

  const answerFirst = cloneDefinition()
  answerFirst.locales.en.hero.intro =
    'Begin with one bounded patient handoff. What should follow next?'
  assert.deepEqual(
    validateIndustryPageDefinition(
      answerFirst as IndustryPageDefinition,
      { mode: 'draft' },
    ),
    { ok: true, errors: [] },
  )
})

test('content-too-thin requires three to six blueprint layers', () => {
  expectDraftCode('content-too-thin', (definition) => {
    for (const locale of ['en', 'ar'] as const) {
      getSection(definition, locale, 'system-blueprint').layers.splice(2)
    }
  })
})

test('content-too-thin requires three to six use-case steps', () => {
  expectDraftCode('content-too-thin', (definition) => {
    for (const locale of ['en', 'ar'] as const) {
      getSection(definition, locale, 'use-case-sequence').steps.splice(2)
    }
  })
})

test('prohibited-copy rejects unfinished markers and generic English filler', () => {
  for (const copy of [
    'TODO: replace this sentence.',
    'An innovative operating experience.',
    'A seamless operating experience.',
    'A cutting-edge operating experience.',
    'We deliver digital transformation.',
  ]) {
    expectDraftCode('prohibited-copy', (definition) => {
      definition.locales.en.hero.intro = copy
    })
  }
})

test('prohibited-copy permits qualified digital transformation wording', () => {
  const definition = cloneDefinition()
  definition.locales.en.hero.intro =
    'A digital transformation plan bounded to one patient handoff.'

  assert.deepEqual(
    validateIndustryPageDefinition(
      definition as IndustryPageDefinition,
      { mode: 'draft' },
    ),
    { ok: true, errors: [] },
  )
})

test('duplicate-section-id rejects repeated recipe IDs', () => {
  expectDraftCode('duplicate-section-id', (definition) => {
    definition.locales.en.sections[1].id = definition.locales.en.sections[0].id
  })
})

test('unisolated-ltr-token rejects each bare protected token in Arabic copy', () => {
  for (const token of ['CRM', 'ERP', 'API', 'POS', 'TMS', 'WMS', 'SLA', 'QR']) {
    expectDraftCode('unisolated-ltr-token', (definition) => {
      definition.locales.ar.hero.intro = `نربط ${token} بمسار عمل واضح للفريق.`
    })
  }
})

test('isolated protected tokens remain valid in Arabic copy', () => {
  const definition = cloneDefinition()
  definition.locales.ar.hero.intro =
    `نربط ${isolateLtrToken('CRM')} بمسار عمل واضح للفريق.`

  assert.deepEqual(
    validateIndustryPageDefinition(definition as IndustryPageDefinition, { mode: 'draft' }),
    { ok: true, errors: [] },
  )
})

test('semantic-question-missing rejects an omitted grammar answer', () => {
  expectDraftCode('semantic-question-missing', (definition) => {
    getSection(definition, 'en', 'pressure-field').answers = []
  })
})

test('semantic-question-duplicate rejects a repeated grammar answer', () => {
  expectDraftCode('semantic-question-duplicate', (definition) => {
    getSection(definition, 'en', 'journey-map').answers.push('operating-pressure')
  })
})

test('invalid-variant rejects an unregistered standard recipe variant', () => {
  expectDraftCode('invalid-variant', (definition) => {
    getSection(definition, 'en', 'pressure-field').variant = 'generic-grid' as never
  })
})

test('invalid-variant rejects an authored scene that does not match the registered hero scene', () => {
  expectDraftCode('invalid-variant', (definition) => {
    const scene = definition.assets.find((asset) => asset.kind === 'authored-scene')
    assert.ok(scene && scene.kind === 'authored-scene')
    scene.id = 'logistics-flow'
  })
})

test('draft authored scenes never require a raster existence lookup', () => {
  assert.deepEqual(
    validateIndustryPageDefinition(definitionFixture, {
      mode: 'draft',
      assetExists: () => {
        throw new Error('draft authored scenes must not query the filesystem')
      },
    }),
    { ok: true, errors: [] },
  )
})

test('release-a-signature-forbidden rejects custom signature recipe entries', () => {
  expectDraftCode('release-a-signature-forbidden', (definition) => {
    for (const locale of ['en', 'ar'] as const) {
      definition.locales[locale].sections.push(
        structuredClone(signatureFixture) as unknown as MutableDeep<SignatureSection>,
      )
    }
  })
})

test('signature-composition-invalid rejects missing or duplicate recipe references', () => {
  for (const sectionIds of [['absent-section'], ['journey', 'journey']]) {
    expectDraftCode('signature-composition-invalid', (definition) => {
      definition.world.signatureComposition.sectionIds = sectionIds
    })
  }
})

test('invalid-service-id rejects canonical services outside the industry manifest', () => {
  expectDraftCode('invalid-service-id', (definition) => {
    for (const locale of ['en', 'ar'] as const) {
      const bridge = getSection(definition, locale, 'service-bridge')
      bridge.serviceIds[0] = 'restaurant-qr-menu'
      bridge.serviceAnchors[0].serviceId = 'restaurant-qr-menu'
    }
  })
})

test('invalid-project-id rejects evidence outside the project registry', () => {
  expectDraftCode('invalid-project-id', (definition) => {
    for (const locale of ['en', 'ar'] as const) {
      const evidence = getSection(definition, locale, 'evidence')
      assert.equal(evidence.variant, 'verified-project')
      evidence.projectId = 'missing-project' as never
    }
  })
})

test('invalid-related-industry rejects relationships outside manifest adjacency', () => {
  expectDraftCode('invalid-related-industry', (definition) => {
    for (const locale of ['en', 'ar'] as const) {
      const bridge = getSection(definition, locale, 'service-bridge')
      bridge.relatedIndustryIds[0] = 'restaurants'
      bridge.industryAnchors[0].industryId = 'restaurants'
    }
  })
})

test('self-related-industry rejects a page linking to its own slug', () => {
  expectDraftCode('self-related-industry', (definition) => {
    for (const locale of ['en', 'ar'] as const) {
      const bridge = getSection(definition, locale, 'service-bridge')
      bridge.relatedIndustryIds[0] = definition.slug
      bridge.industryAnchors[0].industryId = definition.slug
    }
  })
})

test('cta-drift rejects locale destinations or final-close intent changes', () => {
  for (const mutate of [
    (definition: MutableDefinition) => {
      definition.locales.en.hero.primaryCta.href = '/api/whatsapp?locale=ar'
    },
    (definition: MutableDefinition) => {
      getSection(definition, 'en', 'closing-cta').primary.label = 'Start a generic project'
    },
  ]) {
    expectDraftCode('cta-drift', mutate)
  }
})

test('missing-theme-token requires all fourteen authored theme tokens', async (context) => {
  const tokens = [
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

  for (const token of tokens) {
    await context.test(token, () => {
      expectDraftCode('missing-theme-token', (definition) => {
        delete (definition.world.theme as Partial<MutableDeep<IndustryTheme>>)[token]
      })
    })
  }
})

test('contrast-failure checks text pairs and the composite focus indicator', () => {
  for (const mutate of [
    (definition: MutableDefinition) => {
      definition.world.theme.ink = definition.world.theme.canvas
    },
    (definition: MutableDefinition) => {
      definition.world.theme.accentInk = definition.world.theme.accent
    },
    (definition: MutableDefinition) => {
      definition.world.theme.focus = '#F3FAF8'
      definition.world.theme.ink = '#F3FAF8'
    },
  ]) {
    expectDraftCode('contrast-failure', mutate)
  }
})

test('faq-count requires four to seven visible questions', () => {
  expectDraftCode('faq-count', (definition) => {
    for (const locale of ['en', 'ar'] as const) {
      getSection(definition, locale, 'faq').items.splice(3)
    }
  })
})

test('blueprint, FAQ, and service bridge sections cannot be deleted', () => {
  const cases = [
    ['system-blueprint', 'content-too-thin'],
    ['faq', 'faq-count'],
    ['service-bridge', 'service-count'],
  ] as const satisfies readonly [
    IndustrySection['type'],
    DraftIndustryValidationCode,
  ][]

  for (const [type, code] of cases) {
    const definition = cloneDefinition()
    for (const locale of ['en', 'ar'] as const) {
      definition.locales[locale].sections = definition.locales[
        locale
      ].sections.filter((section) => section.type !== type)
    }

    const result = validateIndustryPageDefinition(
      definition as IndustryPageDefinition,
      { mode: 'draft' },
    )
    assert.ok(
      result.errors.some((error) => error.code === code),
      `missing ${type} did not return ${code}: ${result.errors.map((error) => error.code).join(', ')}`,
    )
  }
})

test('a journey-map-only page satisfies the journey carrier requirement', () => {
  const definition = cloneDefinition()
  for (const locale of ['en', 'ar'] as const) {
    definition.locales[locale].sections = definition.locales[
      locale
    ].sections.filter((section) => section.type !== 'use-case-sequence')
  }

  assert.deepEqual(
    validateIndustryPageDefinition(
      definition as IndustryPageDefinition,
      { mode: 'draft' },
    ),
    { ok: true, errors: [] },
  )
})

test('a use-case-only page satisfies the journey carrier requirement', () => {
  const definition = cloneDefinition()
  definition.world.signatureComposition.sectionIds = ['sequence']
  for (const locale of ['en', 'ar'] as const) {
    getSection(definition, locale, 'use-case-sequence').answers = ['journey']
    definition.locales[locale].sections = definition.locales[
      locale
    ].sections.filter((section) => section.type !== 'journey-map')
  }

  assert.deepEqual(
    validateIndustryPageDefinition(
      definition as IndustryPageDefinition,
      { mode: 'draft' },
    ),
    { ok: true, errors: [] },
  )
})

test('content-too-thin rejects a page without either journey carrier', () => {
  const definition = cloneDefinition()
  definition.world.signatureComposition.sectionIds = ['system']
  for (const locale of ['en', 'ar'] as const) {
    definition.locales[locale].sections = definition.locales[
      locale
    ].sections.filter(
      (section) =>
        section.type !== 'journey-map' &&
        section.type !== 'use-case-sequence',
    )
  }

  const result = validateIndustryPageDefinition(
    definition as IndustryPageDefinition,
    { mode: 'draft' },
  )
  assert.ok(
    result.errors.some(
      (error) =>
        error.code === 'content-too-thin' &&
        error.path.endsWith('.sections.journey-carrier'),
    ),
    `missing journey carrier returned ${result.errors.map((error) => `${error.code}:${error.path}`).join(', ')}`,
  )
})

test('service-count requires two to four unique canonical services', () => {
  expectDraftCode('service-count', (definition) => {
    for (const locale of ['en', 'ar'] as const) {
      const bridge = getSection(definition, locale, 'service-bridge')
      bridge.serviceIds.splice(1)
      bridge.serviceAnchors.splice(1)
    }
  })
})

test('claim-source-missing rejects structurally incomplete draft claim records', () => {
  expectDraftCode('claim-source-missing', (definition) => {
    definition.claims.push({
      id: 'draft-claim',
      locale: 'both',
      wording: 'A draft claim with a bounded scope.',
      scope: 'Fixture only.',
      source: 'Fixture source.',
      owner: '',
      approval: 'pending',
      reviewedAt: '2026-07-15',
      recheckAt: '2027-07-15',
    })
  })
})

test('draft validation accepts a complete pending claim without publication approval checks', () => {
  const definition = cloneDefinition()
  definition.claims.push({
    id: 'draft-claim',
    locale: 'both',
    wording: 'A draft claim with a bounded scope.',
    scope: 'Fixture only.',
    source: 'Fixture source.',
    owner: 'Fixture owner.',
    approval: 'pending',
    reviewedAt: '2026-07-15',
    recheckAt: '2027-07-15',
  })

  assert.deepEqual(
    validateIndustryPageDefinition(definition as IndustryPageDefinition, { mode: 'draft' }),
    { ok: true, errors: [] },
  )
})
