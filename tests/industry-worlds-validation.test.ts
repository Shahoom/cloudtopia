import assert from 'node:assert/strict'
import { createHash } from 'node:crypto'
import test from 'node:test'
import {
  contentHash,
  manifestContentHash,
} from '../lib/industries/content-hash.ts'
import { industryManifest } from '../lib/industries/manifest.ts'
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
    layers: [{
      id: 'experience',
      label: 'Experience',
      description: 'The public-facing layer.',
      inputs: ['Approved content'],
      handoff: 'Qualified request',
      outcome: 'Clear next step',
    }],
  },
  {
    id: 'sequence',
    type: 'use-case-sequence',
    variant: 'timed-pass',
    answers: [],
    title: 'Sequence',
    intro: 'A concrete operating sequence.',
    steps: [{ id: 'accept', label: 'Accept', description: 'Accept the request.', owner: 'Operator' }],
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
    items: [{ id: 'start', question: 'Where do we begin?', answer: 'Begin with one journey.' }],
  },
  {
    id: 'close',
    type: 'closing-cta',
    variant: 'framed-close',
    answers: ['decision-close'],
    title: 'Plan the next step',
    intro: 'Choose a bounded starting point.',
    decisionCopy: 'Map one journey and its handoffs.',
    primary: { label: 'Map the journey', href: '/api/whatsapp?locale=en' },
    secondary: { label: 'Explore web applications', serviceId: 'web-applications' },
  },
] as const satisfies readonly IndustrySection[]

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
      sections: sectionsFixture,
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
