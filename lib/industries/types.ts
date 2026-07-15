import type { Locale } from '@/lib/i18n/config'
import type { ProjectId } from '@/lib/industries/proof-targets'
import type { CanonicalServiceId } from '@/lib/industries/service-targets'
import type { IndustrySlug } from '@/lib/industries/slugs'

export type IndustrySemanticQuestion =
  | 'sector-promise'
  | 'operating-pressure'
  | 'journey'
  | 'buildable-system'
  | 'evidence-and-constraints'
  | 'regional-delivery'
  | 'decision-close'

export type IndustrySectionType =
  | 'pressure-field'
  | 'journey-map'
  | 'system-blueprint'
  | 'use-case-sequence'
  | 'service-bridge'
  | 'evidence'
  | 'constraints'
  | 'regional-fit'
  | 'faq'
  | 'closing-cta'
  | 'signature'

export const SECTION_VARIANTS = {
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
} as const

export type StandardIndustrySectionType = keyof typeof SECTION_VARIANTS

export type IndustrySectionVariant<
  TType extends StandardIndustrySectionType,
> = (typeof SECTION_VARIANTS)[TType][number]

export type SectionBase<
  TType extends IndustrySectionType,
  TVariant extends string,
> = {
  id: string
  type: TType
  variant: TVariant
  answers: readonly Exclude<IndustrySemanticQuestion, 'sector-promise'>[]
  eyebrow?: string
  title: string
  intro: string
}

export type IndustrySignal = {
  id: string
  label: string
  description: string
}

export type PressureFieldSection = SectionBase<
  'pressure-field',
  IndustrySectionVariant<'pressure-field'>
> & {
  signals: readonly IndustrySignal[]
}

export type IndustryJourneyStage = {
  id: string
  label: string
  description: string
  actor?: string
}

export type IndustryJourneyLane = {
  id: string
  label: string
  stageIds: readonly string[]
}

export type JourneyMapSection = SectionBase<
  'journey-map',
  IndustrySectionVariant<'journey-map'>
> & {
  stages: readonly IndustryJourneyStage[]
  lanes?: readonly IndustryJourneyLane[]
}

export type IndustrySystemLayer = {
  id: string
  label: string
  description: string
  inputs: readonly string[]
  handoff: string
  outcome: string
}

export type SystemBlueprintSection = SectionBase<
  'system-blueprint',
  IndustrySectionVariant<'system-blueprint'>
> & {
  layers: readonly IndustrySystemLayer[]
}

export type IndustryUseCaseStep = {
  id: string
  label: string
  description: string
  owner?: string
}

export type UseCaseSequenceSection = SectionBase<
  'use-case-sequence',
  IndustrySectionVariant<'use-case-sequence'>
> & {
  steps: readonly IndustryUseCaseStep[]
}

export type IndustryServiceAnchor = {
  serviceId: CanonicalServiceId
  label: string
}

export type IndustryRelatedIndustryAnchor = {
  industryId: IndustrySlug
  label: string
}

export type ServiceBridgeSection = SectionBase<
  'service-bridge',
  IndustrySectionVariant<'service-bridge'>
> & {
  serviceIds: readonly CanonicalServiceId[]
  serviceAnchors: readonly IndustryServiceAnchor[]
  relatedIndustryIds: readonly IndustrySlug[]
  industryAnchors: readonly IndustryRelatedIndustryAnchor[]
}

export type IndustryEvidenceApproval = 'approved' | 'rejected' | 'pending'

export type VerifiedProjectEvidenceSection = SectionBase<
  'evidence',
  'verified-project'
> & {
  projectId: ProjectId
  approval: IndustryEvidenceApproval
  provenance: string
}

export type IndustryEvidenceObservation = {
  id: string
  label: string
  description: string
}

export type AnnotatedModelEvidenceSection = SectionBase<
  'evidence',
  'annotated-model'
> & {
  observations: readonly IndustryEvidenceObservation[]
}

export type EvidenceSection =
  | VerifiedProjectEvidenceSection
  | AnnotatedModelEvidenceSection

export type IndustryConstraintItem = {
  id: string
  label: string
  responsibility: string
  dependency: string
  recovery?: string
}

export type ConstraintsSection = SectionBase<
  'constraints',
  IndustrySectionVariant<'constraints'>
> & {
  items: readonly IndustryConstraintItem[]
}

export type IndustryRegionalItem = {
  id: string
  label: string
  description: string
}

export type RegionalFitSection = SectionBase<
  'regional-fit',
  IndustrySectionVariant<'regional-fit'>
> & {
  items: readonly IndustryRegionalItem[]
}

export type IndustryFaqItem = {
  id: string
  question: string
  answer: string
}

export type FaqSection = SectionBase<
  'faq',
  IndustrySectionVariant<'faq'>
> & {
  items: readonly IndustryFaqItem[]
}

export type ClosingCtaSection = SectionBase<
  'closing-cta',
  IndustrySectionVariant<'closing-cta'>
> & {
  decisionCopy: string
  primary: {
    label: string
    href: `/api/whatsapp?locale=${Locale}`
  }
  secondary: {
    label: string
    serviceId: CanonicalServiceId
  }
}

export type SignatureSection = SectionBase<'signature', string>

export type IndustrySection =
  | PressureFieldSection
  | JourneyMapSection
  | SystemBlueprintSection
  | UseCaseSequenceSection
  | ServiceBridgeSection
  | EvidenceSection
  | ConstraintsSection
  | RegionalFitSection
  | FaqSection
  | ClosingCtaSection
  | SignatureSection

export type IndustrySceneId =
  | 'healthcare-pulse'
  | 'logistics-flow'
  | 'restaurant-pass'

export type IndustryAsset =
  | { kind: 'authored-scene'; id: IndustrySceneId }
  | {
      kind: 'og-image'
      locale: Locale
      publicPath: `/og/industries/${string}/${Locale}.jpg`
      width: 1200
      height: 630
    }

export type LocalizedHero = {
  worldLabel: string
  eyebrow: string
  h1: string
  intro: string
  primaryCta: { label: string; href: `/api/whatsapp?locale=${Locale}` }
  secondaryCta: { label: string; serviceId: CanonicalServiceId }
  sceneSummary: string
  sceneStages: readonly { id: string; label: string; state?: string }[]
}

export type LocalizedIndustryPage = {
  seo: { title: string; description: string }
  breadcrumbLabel: string
  hero: LocalizedHero
  sections: readonly IndustrySection[]
}

export type ReleaseADisplayTreatment =
  | 'clinical'
  | 'technical'
  | 'editorial'

export type ReleaseARadiusMode = 'soft' | 'square' | 'cut'

export type ReleaseAMotifDensity = 'quiet' | 'dense' | 'medium'

export type ReleaseASceneTreatment =
  | 'pulse-corridor'
  | 'route-field'
  | 'service-pass'

export type IndustryTheme = {
  canvas: string
  surface: string
  elevatedSurface: string
  ink: string
  mutedInk: string
  accent: string
  accentInk: string
  signal: string
  line: string
  focus: string
  displayTreatment: ReleaseADisplayTreatment
  radiusMode: ReleaseARadiusMode
  motifDensity: ReleaseAMotifDensity
  sceneTreatment: ReleaseASceneTreatment
}

export type IndustryReviewRecord = {
  slug: IndustrySlug
  locale: Locale
  kind: 'editorial' | 'native-arabic' | 'sensitive-domain'
  reviewer: string
  reviewedAt: `${number}-${number}-${number}`
  contentHash: `sha256:${string}`
}

export type IndustryManifestReviewRecord = {
  locale: Locale
  kind: 'manifest-editorial' | 'manifest-native-arabic'
  reviewer: string
  reviewedAt: `${number}-${number}-${number}`
  contentHash: `sha256:${string}`
}

export type IndustryClaimSource = {
  id: string
  locale: Locale | 'both'
  wording: string
  scope: string
  source: string
  owner: string
  approval: 'approved' | 'rejected' | 'pending'
  reviewedAt: `${number}-${number}-${number}`
  recheckAt: `${number}-${number}-${number}`
}

export type IndustryPageDefinition = {
  slug: IndustrySlug
  contentVersion: string
  updatedAt?: `${number}-${number}-${number}`
  world: {
    id: string
    theme: IndustryTheme
    heroScene: IndustrySceneId
    heroTreatment: 'corridor-split' | 'route-field' | 'editorial-pass'
    signatureComposition: {
      id: string
      name: Record<Locale, string>
      sectionIds: readonly string[]
    }
  }
  assets: readonly IndustryAsset[]
  claims: readonly IndustryClaimSource[]
  locales: Record<Locale, LocalizedIndustryPage>
}

export type IndustryValidationOptions = {
  mode: 'draft' | 'publication'
  reviews?: readonly IndustryReviewRecord[]
  manifestReviews?: readonly IndustryManifestReviewRecord[]
  now?: Date
  assetExists?: (publicPath: string) => boolean
  allowCustomSignature?: boolean
}

export type ReviewableIndustryContent = {
  manifest: { label: string; navSummary: string }
  page: LocalizedIndustryPage
}

export type IndustryPageRegistry = Readonly<
  Record<IndustrySlug, IndustryPageDefinition | null>
>

export function rhythmFingerprint(definition: IndustryPageDefinition): string {
  return [
    definition.world.heroTreatment,
    ...definition.locales.en.sections.map(
      (section) => `${section.type}:${section.variant}`,
    ),
    definition.world.signatureComposition.id,
  ].join('|')
}
