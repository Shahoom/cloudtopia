import type { Locale } from '@/lib/i18n/config'
import type { IndustrySlug } from '@/lib/industries/slugs'
import type {
  AnnotatedModelEvidenceSection,
  EvidenceSection as EvidenceSectionModel,
  IndustrySection,
  LocalizedHero,
  SignatureSection,
  VerifiedProjectEvidenceSection,
} from '@/lib/industries/types'

import { ClosingCtaSection } from './sections/ClosingCtaSection'
import { ConstraintsSection } from './sections/ConstraintsSection'
import { EvidenceSection } from './sections/EvidenceSection'
import { FaqSection } from './sections/FaqSection'
import { JourneyMapSection } from './sections/JourneyMapSection'
import { PressureFieldSection } from './sections/PressureFieldSection'
import { RegionalFitSection } from './sections/RegionalFitSection'
import { ServiceBridgeSection } from './sections/ServiceBridgeSection'
import { SystemBlueprintSection } from './sections/SystemBlueprintSection'
import { UseCaseSequenceSection } from './sections/UseCaseSequenceSection'

export type RendererProps = {
  section: IndustrySection
  locale: Locale
  industrySlug: IndustrySlug
  primaryCta: LocalizedHero['primaryCta']
}

type ApprovedVerifiedProjectEvidenceSection = VerifiedProjectEvidenceSection & {
  approval: 'approved'
}

export type RenderableIndustrySection =
  | Exclude<IndustrySection, EvidenceSectionModel>
  | AnnotatedModelEvidenceSection
  | ApprovedVerifiedProjectEvidenceSection

export type IndustryStandardSectionProps<
  TSection extends RenderableIndustrySection,
> = Omit<RendererProps, 'section'> & {
    section: TSection
  }

export function shouldRenderIndustrySection(
  section: IndustrySection,
): section is RenderableIndustrySection {
  return (
    section.type !== 'evidence' ||
    section.variant !== 'verified-project' ||
    section.approval === 'approved'
  )
}

const RELEASE_A_SIGNATURE_REGISTRY = Object.freeze({})

function renderRegisteredSignature(
  props: IndustryStandardSectionProps<SignatureSection>,
): never {
  void RELEASE_A_SIGNATURE_REGISTRY
  throw new Error(`Unregistered industry signature section: ${props.section.id}`)
}

function assertNever(section: never): never {
  throw new Error(`Unsupported industry section: ${JSON.stringify(section)}`)
}

export function IndustrySectionRenderer(props: RendererProps) {
  if (!shouldRenderIndustrySection(props.section)) return null

  const { industrySlug, locale, primaryCta } = props

  switch (props.section.type) {
    case 'pressure-field':
      return (
        <PressureFieldSection
          section={props.section}
          locale={locale}
          industrySlug={industrySlug}
          primaryCta={primaryCta}
        />
      )
    case 'journey-map':
      return (
        <JourneyMapSection
          section={props.section}
          locale={locale}
          industrySlug={industrySlug}
          primaryCta={primaryCta}
        />
      )
    case 'system-blueprint':
      return (
        <SystemBlueprintSection
          section={props.section}
          locale={locale}
          industrySlug={industrySlug}
          primaryCta={primaryCta}
        />
      )
    case 'use-case-sequence':
      return (
        <UseCaseSequenceSection
          section={props.section}
          locale={locale}
          industrySlug={industrySlug}
          primaryCta={primaryCta}
        />
      )
    case 'service-bridge':
      return (
        <ServiceBridgeSection
          section={props.section}
          locale={locale}
          industrySlug={industrySlug}
          primaryCta={primaryCta}
        />
      )
    case 'evidence':
      return (
        <EvidenceSection
          section={props.section}
          locale={locale}
          industrySlug={industrySlug}
          primaryCta={primaryCta}
        />
      )
    case 'constraints':
      return (
        <ConstraintsSection
          section={props.section}
          locale={locale}
          industrySlug={industrySlug}
          primaryCta={primaryCta}
        />
      )
    case 'regional-fit':
      return (
        <RegionalFitSection
          section={props.section}
          locale={locale}
          industrySlug={industrySlug}
          primaryCta={primaryCta}
        />
      )
    case 'faq':
      return (
        <FaqSection
          section={props.section}
          locale={locale}
          industrySlug={industrySlug}
          primaryCta={primaryCta}
        />
      )
    case 'closing-cta':
      return (
        <ClosingCtaSection
          section={props.section}
          locale={locale}
          industrySlug={industrySlug}
          primaryCta={primaryCta}
        />
      )
    case 'signature':
      return renderRegisteredSignature({
        section: props.section,
        locale,
        industrySlug,
        primaryCta,
      })
    default:
      return assertNever(props.section)
  }
}
