import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpLeft,
  ArrowUpRight,
  CheckCircle2,
  ChevronDown,
  CircleDot,
  ExternalLink,
  HeartPulse,
  MessageCircle,
  ShieldCheck,
} from 'lucide-react'

import { JsonLd } from '@/components/seo/JsonLd'
import { PageBreadcrumbs } from '@/components/ui/PageBreadcrumbs'
import { localeDirection, type Locale } from '@/lib/i18n/config'
import { localePath } from '@/lib/i18n/url'
import { CANONICAL_SERVICE_TARGETS } from '@/lib/industries/service-targets'
import type { EffectiveIndustrySeo } from '@/lib/industries/resolve-industry-seo'
import type {
  IndustryPageDefinition,
  IndustrySection,
} from '@/lib/industries/types'

import {
  HealthcareCapabilityCarousel,
  type HealthcareCapabilityCard,
} from './HealthcareCapabilityCarousel'
import { healthcareLandingCopy } from './healthcare-content'
import styles from './healthcare-industry.module.css'

type HealthcareIndustryPageProps = {
  locale: Locale
  definition: IndustryPageDefinition
  seo: EffectiveIndustrySeo
  schema: unknown | unknown[]
}

function sectionOf<TType extends IndustrySection['type']>(
  sections: readonly IndustrySection[],
  id: string,
  type: TType,
): Extract<IndustrySection, { type: TType }> {
  const section = sections.find((candidate) => candidate.id === id)
  if (!section || section.type !== type) {
    throw new Error(`Healthcare section ${id} must be a ${type}`)
  }
  return section as Extract<IndustrySection, { type: TType }>
}

function itemById<TItem extends { id: string }>(
  items: readonly TItem[],
  id: string,
  context: string,
): TItem {
  const item = items.find((candidate) => candidate.id === id)
  if (!item) throw new Error(`Healthcare ${context} is missing ${id}`)
  return item
}

function ArrowPair({ locale }: { locale: Locale }) {
  const Arrow = locale === 'ar' ? ArrowUpLeft : ArrowUpRight
  return (
    <span className={styles.arrowPair} aria-hidden="true">
      <Arrow />
      <Arrow />
    </span>
  )
}

export function HealthcareIndustryPage({
  locale,
  definition,
  seo,
  schema,
}: HealthcareIndustryPageProps) {
  const direction = localeDirection[locale]
  const page = definition.locales[locale]
  const copy = healthcareLandingCopy[locale]
  const pressure = sectionOf(page.sections, 'health-access-pressure', 'pressure-field')
  const journey = sectionOf(page.sections, 'patient-journey', 'journey-map')
  const continuity = sectionOf(page.sections, 'continuity-of-care', 'journey-map')
  const system = sectionOf(page.sections, 'clinic-system', 'system-blueprint')
  const services = sectionOf(page.sections, 'healthcare-service-paths', 'service-bridge')
  const boundaries = sectionOf(page.sections, 'privacy-role-boundaries', 'constraints')
  const regional = sectionOf(page.sections, 'regional-care-delivery', 'regional-fit')
  const faq = sectionOf(page.sections, 'healthcare-faq', 'faq')
  const consultation = sectionOf(page.sections, 'healthcare-consultation', 'closing-cta')
  const continuityLanes = continuity.lanes
  if (!continuityLanes) {
    throw new Error('Healthcare continuity-of-care requires patient and clinic lanes')
  }
  const capabilityCards: HealthcareCapabilityCard[] = [
    itemById(system.layers, 'public-experience', 'system layer'),
    itemById(system.layers, 'appointment-layer', 'system layer'),
    copy.securePortal,
    itemById(system.layers, 'role-aware-operations', 'system layer'),
    itemById(system.layers, 'approved-integrations', 'system layer'),
    itemById(regional.items, 'content-governance', 'regional item'),
  ].map((card, index) => ({
    id: card.id,
    label: card.label,
    description: card.description,
    marker: String(index + 1).padStart(2, '0'),
  }))

  return (
    <div
      className={styles.page}
      dir={direction}
      data-healthcare-template="prohealth-v1"
      data-industry="healthcare"
      data-world={definition.world.id}
      data-locale={locale}
      data-canonical={seo.canonical}
      data-indexable={seo.index ? 'true' : 'false'}
    >
      <a className={styles.skipLink} href="#healthcare-industry-content">
        {copy.skip}
      </a>
      <JsonLd schema={schema} />

      <div className={styles.breadcrumbFrame}>
        <PageBreadcrumbs
          locale={locale}
          ariaLabel={copy.breadcrumb}
          className={styles.breadcrumb}
          items={[
            { label: copy.industries, href: localePath(locale, '/industries') },
            { label: page.breadcrumbLabel },
          ]}
        />
      </div>

      <section className={styles.hero} data-header-theme="light">
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroParticleOne} aria-hidden="true" />
        <div className={styles.heroParticleTwo} aria-hidden="true" />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>
              <HeartPulse aria-hidden="true" />
              {copy.heroKicker}
            </p>
            <h1>{page.hero.h1}</h1>
            <p className={styles.heroIntro}>{page.hero.intro}</p>
            <div className={styles.heroActions}>
              <a className={`${styles.button} ${styles.buttonPrimary}`} href={page.hero.primaryCta.href}>
                <MessageCircle aria-hidden="true" />
                <span>{page.hero.primaryCta.label}</span>
                <ArrowPair locale={locale} />
              </a>
              <a
                className={`${styles.button} ${styles.buttonSecondary}`}
                href="https://clinic.cloudtopia.net"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>{copy.clinicTopiaAction}</span>
                <ArrowPair locale={locale} />
              </a>
            </div>
          </div>

          <div className={styles.heroVisual}>
            <div className={styles.heroRing} aria-hidden="true" />
            <div className={styles.heroBadge}>
              <span>{copy.heroBadge.value}</span>
              <small>{copy.heroBadge.label}</small>
            </div>
            <Image
              className={`${styles.heroImage} ${styles.heroDoctor}`}
              src="/images/industries/healthcare/hero-doctor.png"
              alt={copy.heroDoctorAlt}
              width={589}
              height={915}
              priority
              sizes="(max-width: 900px) 64vw, 31vw"
            />
            <Image
              className={`${styles.heroImage} ${styles.heroNurse}`}
              src="/images/industries/healthcare/hero-nurse.png"
              alt={copy.heroNurseAlt}
              width={412}
              height={721}
              priority
              sizes="(max-width: 900px) 46vw, 22vw"
            />
          </div>
        </div>
      </section>

      <section className={styles.systemStrip} aria-label={copy.systemStripLabel}>
        {copy.systemStrip.map((item) => (
          <div className={styles.systemStripItem} key={item.value}>
            <span>{item.value}</span>
            <p>{item.label}</p>
          </div>
        ))}
        <a
          className={styles.systemStripAction}
          href="https://clinic.cloudtopia.net"
          target="_blank"
          rel="noopener noreferrer"
          aria-label={copy.clinicTopiaActionLabel}
        >
          <ExternalLink aria-hidden="true" />
        </a>
      </section>

      <div id="healthcare-industry-content" className={styles.content} tabIndex={-1}>
        <section className={styles.principlesSection}>
          <div className={styles.sectionHeadingCentered}>
            <p className={styles.eyebrow}>{copy.principlesEyebrow}</p>
            <h2>{copy.principlesTitle}</h2>
            <p>{copy.principlesIntro}</p>
          </div>
          <div className={styles.principlesGrid}>
            {copy.principles.map((principle, index) => (
              <a
                className={styles.principleCard}
                data-featured={index === 1 ? 'true' : 'false'}
                href={principle.href}
                key={principle.title}
              >
                <span className={styles.principleIcon} aria-hidden="true">
                  {index === 2 ? <ShieldCheck /> : <CircleDot />}
                </span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </a>
            ))}
          </div>
        </section>

        <section className={styles.storySection} id="patient-experience">
          <div className={styles.storyVisual}>
            <div className={styles.storyImageFrame}>
              <Image
                src="/images/industries/healthcare/industry-story.png"
                alt={copy.storyAlt}
                width={865}
                height={741}
                sizes="(max-width: 900px) 92vw, 46vw"
              />
            </div>
            <div className={styles.rotatingSeal} aria-hidden="true">
              <span>{locale === 'ar' ? 'وضوح • ملكية • استمرارية' : 'Clarity • ownership • continuity'}</span>
              <CheckCircle2 />
            </div>
          </div>
          <div className={styles.storyCopy}>
            <p className={styles.eyebrow}>{pressure.eyebrow}</p>
            <h2>{pressure.title}</h2>
            <p className={styles.sectionIntro}>{pressure.intro}</p>
            <ul className={styles.storySignals}>
              {pressure.signals.map((signal) => (
                <li key={signal.id}>
                  <span aria-hidden="true" />
                  <div>
                    <h3>{signal.label}</h3>
                    <p>{signal.description}</p>
                  </div>
                </li>
              ))}
            </ul>
            <a className={styles.textLink} href="#patient-clinic-journey">
              {copy.storyAction}
              <ArrowPair locale={locale} />
            </a>
          </div>
        </section>

        <section className={styles.capabilitiesSection} data-header-theme="dark">
          <div className={styles.capabilitiesInner}>
            <div className={styles.sectionHeadingDark}>
              <p className={styles.eyebrowLight}>{copy.capabilitiesEyebrow}</p>
              <h2>{copy.capabilitiesTitle}</h2>
              <p>{copy.capabilitiesIntro}</p>
            </div>
            <HealthcareCapabilityCarousel
              cards={capabilityCards}
              direction={direction}
              previousLabel={copy.carouselPrevious}
              nextLabel={copy.carouselNext}
            />
          </div>
        </section>

        <section className={styles.clinicTopiaSection}>
          <div className={styles.clinicTopiaCopy}>
            <p className={styles.eyebrow}>{copy.clinicTopiaEyebrow}</p>
            <h2>{copy.clinicTopiaTitle}</h2>
            <p className={styles.sectionIntro}>{copy.clinicTopiaIntro}</p>
            <ul className={styles.productCapabilities}>
              {copy.clinicTopiaCapabilities.map((capability) => (
                <li key={capability}>
                  <CheckCircle2 aria-hidden="true" />
                  {capability}
                </li>
              ))}
            </ul>
            <a
              className={`${styles.button} ${styles.buttonPrimary}`}
              href="https://clinic.cloudtopia.net"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>{copy.clinicTopiaActionLabel}</span>
              <ExternalLink aria-hidden="true" />
              <ArrowPair locale={locale} />
            </a>
          </div>
          <div className={styles.clinicTopiaVisual}>
            <Image
              src="/images/industries/healthcare/clinic-operations.jpeg"
              alt={copy.operationsAlt}
              fill
              sizes="(max-width: 900px) 92vw, 44vw"
            />
            <div className={styles.productDashboard}>
              <div className={styles.dashboardHeader}>
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <span aria-hidden="true" />
                <strong>ClinicTopia</strong>
              </div>
              <div className={styles.dashboardBody}>
                <div>
                  <small>{locale === 'ar' ? 'اليوم' : 'Today'}</small>
                  <strong>{locale === 'ar' ? 'تشغيل العيادة' : 'Clinic operations'}</strong>
                </div>
                <span className={styles.dashboardPulse} aria-hidden="true" />
                <div className={styles.dashboardBars} aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            </div>
            <p className={styles.productBadge}>
              <HeartPulse aria-hidden="true" />
              {copy.clinicTopiaBadge}
            </p>
          </div>
        </section>

        <section className={styles.journeySection} id="patient-clinic-journey">
          <div className={styles.sectionHeadingSplit}>
            <div>
              <p className={styles.eyebrow}>{copy.journeyLabel}</p>
              <h2>{journey.title}</h2>
            </div>
            <p>{continuity.intro}</p>
          </div>
          <div className={styles.journeyLanes}>
            {continuityLanes.map((lane, laneIndex) => (
              <section className={styles.journeyLane} key={lane.id} aria-labelledby={`healthcare-${lane.id}`}>
                <div className={styles.journeyLaneHeading}>
                  <span>{String(laneIndex + 1).padStart(2, '0')}</span>
                  <h3 id={`healthcare-${lane.id}`}>{lane.label}</h3>
                </div>
                <ol>
                  {lane.stageIds.map((stageId, stageIndex) => {
                    const stage = itemById(continuity.stages, stageId, lane.id)
                    return (
                      <li key={stage.id}>
                        <span className={styles.journeyNumber}>{String(stageIndex + 1).padStart(2, '0')}</span>
                        <div className={styles.journeyDot} aria-hidden="true" />
                        <h4>{stage.label}</h4>
                        <p>{stage.description}</p>
                        {stage.actor ? <small>{stage.actor}</small> : null}
                      </li>
                    )
                  })}
                </ol>
              </section>
            ))}
          </div>
        </section>

        <section className={styles.trustSection} id="trust-boundaries">
          <div className={styles.trustHeading}>
            <p className={styles.eyebrow}>{copy.trustLabel}</p>
            <h2>{boundaries.title}</h2>
            <p>{boundaries.intro}</p>
          </div>
          <div className={styles.boundaryGrid}>
            {boundaries.items.map((item, index) => (
              <article key={item.id}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{item.label}</h3>
                <p>{item.responsibility}</p>
                <small>{item.dependency}</small>
              </article>
            ))}
          </div>
          <div className={styles.regionalBand}>
            {regional.items.map((item) => (
              <div key={item.id}>
                <GlobeMark />
                <h3>{item.label}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.servicesSection}>
          <div className={styles.sectionHeadingSplit}>
            <div>
              <p className={styles.eyebrow}>{copy.servicesLabel}</p>
              <h2>{services.title}</h2>
            </div>
            <p>{services.intro}</p>
          </div>
          <div className={styles.serviceGrid}>
            {services.serviceAnchors.map((anchor, index) => (
              <Link
                className={styles.serviceCard}
                href={localePath(locale, CANONICAL_SERVICE_TARGETS[anchor.serviceId])}
                key={anchor.serviceId}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{anchor.label}</h3>
                <p>{copy.learnMore}</p>
                <ArrowPair locale={locale} />
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.consultationSection} data-header-theme="dark">
          <div className={styles.consultationPulse} aria-hidden="true" />
          <div>
            <p className={styles.eyebrowLight}>{copy.consultationLabel}</p>
            <h2>{consultation.title}</h2>
            <p>{consultation.decisionCopy}</p>
          </div>
          <a className={`${styles.button} ${styles.buttonLight}`} href={consultation.primary.href}>
            <MessageCircle aria-hidden="true" />
            <span>{consultation.primary.label}</span>
            <ArrowPair locale={locale} />
          </a>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.faqHeading}>
            <p className={styles.eyebrow}>{copy.faqLabel}</p>
            <h2>{faq.title}</h2>
            <p>{faq.intro}</p>
          </div>
          <div className={styles.faqList}>
            {faq.items.map((item, index) => (
              <details className={styles.faqItem} name="healthcare-industry-faq" key={item.id} open={index === 0}>
                <summary>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item.question}</strong>
                  <ChevronDown aria-hidden="true" />
                </summary>
                <div className={styles.faqAnswer}>
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

function GlobeMark() {
  return (
    <span className={styles.globeMark} aria-hidden="true">
      <span />
      <span />
    </span>
  )
}
