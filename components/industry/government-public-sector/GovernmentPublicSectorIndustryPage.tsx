import Image from 'next/image'
import Link from 'next/link'
import {
  Accessibility,
  ArrowUpLeft,
  ArrowUpRight,
  BrainCircuit,
  Bus,
  Check,
  ChevronDown,
  ClipboardCheck,
  Cloud,
  UploadCloud,
  Database,
  FileCheck2,
  Fingerprint,
  FolderCheck,
  GraduationCap,
  HeartPulse,
  Home,
  Landmark,
  Languages,
  LayoutDashboard,
  Leaf,
  Lock,
  MapPin,
  Globe,
  MessageCircle,
  MonitorSmartphone,
  Network,
  RefreshCw,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react'
import type { ComponentType } from 'react'

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

import { GovCounters } from './GovCounters'
import { GovHeroCarousel } from './GovHeroCarousel'
import { GovReveal } from './GovReveal'
import { governmentLandingCopy } from './government-public-sector-content'
import styles from './government-public-sector-industry.module.css'

type GovernmentPublicSectorIndustryPageProps = {
  locale: Locale
  definition: IndustryPageDefinition
  seo: EffectiveIndustrySeo
  schema: unknown
}

type Icon = ComponentType<{ 'aria-hidden'?: boolean }>

function sectionOf<TType extends IndustrySection['type']>(
  sections: readonly IndustrySection[],
  id: string,
  type: TType,
): Extract<IndustrySection, { type: TType }> {
  const section = sections.find((candidate) => candidate.id === id)
  if (!section || section.type !== type) {
    throw new Error(`Government section ${id} must be a ${type}`)
  }
  return section as Extract<IndustrySection, { type: TType }>
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

const CAPABILITY_ICONS: readonly Icon[] = [LayoutDashboard, FolderCheck, Database, Fingerprint]
const DOMAIN_ICONS: readonly Icon[] = [
  ShieldAlert,
  Landmark,
  Bus,
  HeartPulse,
  Home,
  FileCheck2,
  GraduationCap,
  Leaf,
]
const PILLAR_ICONS: readonly Icon[] = [MonitorSmartphone, Network, Cloud]
const ENGAGEMENT_ICONS: readonly Icon[] = [UploadCloud, RefreshCw, BrainCircuit, Lock]
const COMPLIANCE_ICONS: readonly Icon[] = [Accessibility, ShieldCheck, Globe, ClipboardCheck]
const WHY_ICONS: readonly Icon[] = [ShieldCheck, Accessibility, Languages, MapPin]

export function GovernmentPublicSectorIndustryPage({
  locale,
  definition,
  seo,
  schema,
}: GovernmentPublicSectorIndustryPageProps) {
  const direction = localeDirection[locale]
  const page = definition.locales[locale]
  const copy = governmentLandingCopy[locale]
  const services = sectionOf(page.sections, 'gov-service-paths', 'service-bridge')
  const faq = sectionOf(page.sections, 'gov-faq', 'faq')
  const whatsappHref = `/api/whatsapp?locale=${locale}`

  return (
    <div
      className={styles.page}
      dir={direction}
      data-gov-template="whitehall-v1"
      data-industry="government-public-sector"
      data-world={definition.world.id}
      data-locale={locale}
      data-canonical={seo.canonical}
      data-indexable={seo.index ? 'true' : 'false'}
    >
      <a className={styles.skipLink} href="#gov-industry-content">
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

      {/* ---------------------------------------- Hero (owl cross-fade carousel) */}
      <section className={styles.hero} data-gov-hero data-header-theme="dark">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>
              <Landmark aria-hidden="true" />
              {copy.heroKicker}
            </p>
            <h1>{page.hero.h1}</h1>
            <p className={styles.heroIntro}>{page.hero.intro}</p>
            <div className={styles.heroActions}>
              <a className={`${styles.button} ${styles.buttonPrimary}`} href={whatsappHref}>
                <MessageCircle aria-hidden="true" />
                <span>{page.hero.primaryCta.label}</span>
                <ArrowPair locale={locale} />
              </a>
              <a className={`${styles.button} ${styles.buttonSecondary}`} href="#gov-service-paths">
                <span>{copy.heroSecondaryCta}</span>
                <ArrowPair locale={locale} />
              </a>
            </div>
            <ul className={styles.heroTrust}>
              <li className={styles.heroTrustLabel} aria-hidden="true">
                {copy.heroTrustLabel}
              </li>
              {copy.heroTrust.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.heroVisual}>
            <GovHeroCarousel
              slides={copy.heroSlides}
              direction={direction}
              label={copy.carouselLabel}
              prevLabel={copy.carouselPrev}
              nextLabel={copy.carouselNext}
              gotoLabel={copy.carouselGoto}
            />
          </div>
        </div>
      </section>

      <div id="gov-industry-content" className={styles.content} tabIndex={-1}>
        {/* -------------------------------------- Capabilities (activity tiles) */}
        <section className={styles.section}>
          <GovReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.capabilitiesEyebrow}</p>
            <h2>{copy.capabilitiesTitle}</h2>
            <span className={styles.titleShape} aria-hidden="true" />
            <p className={styles.sectionIntro}>{copy.capabilitiesIntro}</p>
          </GovReveal>
          <GovReveal className={styles.capabilitiesBand} variant="up" stagger>
            {copy.capabilities.map((tile, index) => {
              const Glyph = CAPABILITY_ICONS[index] ?? LayoutDashboard
              return (
                <div className={styles.capabilityTile} key={tile.id}>
                  <span className={styles.tileIcon} aria-hidden="true">
                    <Glyph aria-hidden={true} />
                  </span>
                  <h3>{tile.title}</h3>
                  <p>{tile.subtitle}</p>
                </div>
              )
            })}
          </GovReveal>
        </section>

        {/* ------------------------------------ Practice (about split intro) */}
        <section className={`${styles.section} ${styles.sectionGray}`}>
          <div className={styles.practiceGrid}>
            <GovReveal variant="left">
              <p className={styles.eyebrow}>{copy.practiceEyebrow}</p>
              <h2 style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.7rem)', lineHeight: 1.14, marginBlock: '1rem 0' }}>
                {copy.practiceTitle}
              </h2>
              <span className={styles.titleShape} aria-hidden="true" />
              <p className={styles.sectionIntro} style={{ marginBlockStart: '1.25rem' }}>
                {copy.practiceIntro}
              </p>
              <p className={styles.practiceBody}>{copy.practiceBody}</p>
              <div className={styles.practicePoints}>
                {copy.practicePoints.map((point) => (
                  <div className={styles.practicePoint} key={point.id}>
                    <h3>{point.title}</h3>
                    <p>{point.subtitle}</p>
                  </div>
                ))}
              </div>
            </GovReveal>
            <GovReveal variant="right">
              <div className={styles.practicePanel}>
                <Image
                  className={styles.practicePanelImg}
                  src={copy.practicePhoto.image}
                  alt={copy.practicePhoto.alt}
                  width={copy.practicePhoto.width}
                  height={copy.practicePhoto.height}
                  sizes="(max-width: 991px) 92vw, 42vw"
                />
                <span className={styles.practicePanelScrim} aria-hidden="true" />
                <p className={styles.practicePanelEyebrow}>{copy.practicePanelEyebrow}</p>
                <p className={styles.practicePanelStatement}>{copy.practicePanelStatement}</p>
                <p className={styles.practicePanelNote}>{copy.practicePanelNote}</p>
              </div>
            </GovReveal>
          </div>
        </section>

        {/* ------------------------------------ Domains grid (dark, 8 cards) */}
        <section className={styles.sectionDark} data-header-theme="dark">
          <div className={styles.sectionInner}>
            <GovReveal className={styles.sectionHeadingCentered} variant="up">
              <p className={styles.eyebrowLight}>{copy.domainsEyebrow}</p>
              <h2>{copy.domainsTitle}</h2>
              <span className={styles.titleShape} aria-hidden="true" />
              <p className={styles.sectionIntro}>{copy.domainsIntro}</p>
            </GovReveal>
            <GovReveal className={styles.domainsGrid} variant="up" stagger>
              {copy.domains.map((domain, index) => {
                const Glyph = DOMAIN_ICONS[index] ?? ShieldAlert
                return (
                  <div className={styles.domainCard} key={domain.id}>
                    <span className={styles.tileIcon} aria-hidden="true">
                      <Glyph aria-hidden={true} />
                    </span>
                    <h3>{domain.title}</h3>
                    <p>{domain.subtitle}</p>
                  </div>
                )
              })}
            </GovReveal>
          </div>
        </section>

        {/* --------------------------- Engagement capabilities (numbered flip) */}
        <section className={styles.section}>
          <GovReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.engagementEyebrow}</p>
            <h2>{copy.engagementTitle}</h2>
            <span className={styles.titleShape} aria-hidden="true" />
            <p className={styles.sectionIntro}>{copy.engagementIntro}</p>
          </GovReveal>
          <GovReveal className={styles.engagementGrid} variant="up" stagger>
            {copy.engagement.map((item, index) => {
              const Glyph = ENGAGEMENT_ICONS[index] ?? UploadCloud
              return (
                <div className={styles.engagementCard} key={item.id}>
                  <span className={styles.engagementNumber}>
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.tileIcon} aria-hidden="true">
                    <Glyph aria-hidden={true} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              )
            })}
          </GovReveal>
        </section>

        {/* ---------------------- Flagship pillars (explore hover-overlay flip) */}
        <section className={styles.sectionDark} data-header-theme="dark">
          <div className={styles.sectionInner}>
            <GovReveal className={styles.sectionHeadingCentered} variant="up">
              <p className={styles.eyebrowLight}>{copy.pillarsEyebrow}</p>
              <h2>{copy.pillarsTitle}</h2>
              <span className={styles.titleShape} aria-hidden="true" />
              <p className={styles.sectionIntro}>{copy.pillarsIntro}</p>
            </GovReveal>
            <GovReveal className={styles.pillarsGrid} variant="up" stagger>
              {copy.pillars.map((pillar, index) => {
                const Glyph = PILLAR_ICONS[index] ?? MonitorSmartphone
                return (
                  <div className={styles.pillarCard} key={pillar.id}>
                    <span className={styles.tileIcon} aria-hidden="true">
                      <Glyph aria-hidden={true} />
                    </span>
                    <h3>{pillar.title}</h3>
                    <p className={styles.pillarSummary}>{pillar.summary}</p>
                    <p className={styles.pillarPointsLabel}>{copy.pillarPointsLabel}</p>
                    <ul className={styles.pillarPoints}>
                      {pillar.points.map((point) => (
                        <li key={point}>
                          <Check aria-hidden="true" />
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </GovReveal>
          </div>
        </section>

        {/* --------------------------- Citizen-services catalog + red CTA band */}
        <section className={`${styles.section} ${styles.sectionGray}`}>
          <GovReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.catalogEyebrow}</p>
            <h2>{copy.catalogTitle}</h2>
            <span className={styles.titleShape} aria-hidden="true" />
            <p className={styles.sectionIntro}>{copy.catalogIntro}</p>
          </GovReveal>
          <GovReveal className={styles.catalogGrid} variant="up" stagger>
            {copy.catalog.map((item) => (
              <div className={styles.catalogTile} key={item.id}>
                <span className={styles.catalogTileMark} aria-hidden="true">
                  <Check aria-hidden={true} />
                </span>
                <span>{item.label}</span>
              </div>
            ))}
          </GovReveal>
          <GovReveal variant="up">
            <div className={styles.catalogCta}>
              <div>
                <p className={styles.catalogCtaEyebrow}>{copy.catalogCtaEyebrow}</p>
                <h3>{copy.catalogCtaTitle}</h3>
                <p>{copy.catalogCtaText}</p>
              </div>
              <a className={`${styles.button} ${styles.buttonLight}`} href={whatsappHref}>
                <MessageCircle aria-hidden="true" />
                <span>{copy.catalogCtaButton}</span>
                <ArrowPair locale={locale} />
              </a>
            </div>
          </GovReveal>
        </section>

        {/* --------------------------------------- Counter / capability stats */}
        <section className={styles.statsSection}>
          <GovCounters
            stats={copy.stats}
            locale={locale}
            caption={copy.statsLabel}
            note={copy.statsNote}
          />
        </section>

        {/* ------------------------------------ Compliance & certifications */}
        <section className={`${styles.section} ${styles.sectionGray}`}>
          <GovReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.complianceEyebrow}</p>
            <h2>{copy.complianceTitle}</h2>
            <span className={styles.titleShape} aria-hidden="true" />
            <p className={styles.sectionIntro}>{copy.complianceIntro}</p>
          </GovReveal>
          <GovReveal className={styles.cardGrid} variant="up" stagger>
            {copy.compliance.map((item, index) => {
              const Glyph = COMPLIANCE_ICONS[index] ?? ShieldCheck
              return (
                <div className={styles.infoCard} key={item.id}>
                  <span className={styles.tileIcon} aria-hidden="true">
                    <Glyph aria-hidden={true} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
              )
            })}
          </GovReveal>
        </section>

        {/* ----------------------------- Why government teams choose CloudTopia */}
        <section className={styles.section}>
          <GovReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.whyEyebrow}</p>
            <h2>{copy.whyTitle}</h2>
            <span className={styles.titleShape} aria-hidden="true" />
            <p className={styles.sectionIntro}>{copy.whyIntro}</p>
          </GovReveal>
          <GovReveal className={styles.cardGrid} variant="up" stagger>
            {copy.why.map((item, index) => {
              const Glyph = WHY_ICONS[index] ?? ShieldCheck
              return (
                <div className={styles.infoCard} key={item.id}>
                  <span className={styles.tileIcon} aria-hidden="true">
                    <Glyph aria-hidden={true} />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.subtitle}</p>
                </div>
              )
            })}
          </GovReveal>
        </section>

        {/* ------------------------------------------------------- FAQ (grid) */}
        <section className={`${styles.section} ${styles.faqSection}`}>
          <GovReveal className={styles.faqHeading} variant="up">
            <p className={styles.eyebrow}>{copy.faqEyebrow}</p>
            <h2>{faq.title}</h2>
            <span className={styles.titleShape} aria-hidden="true" />
            <p className={styles.sectionIntro}>{faq.intro}</p>
          </GovReveal>
          <div className={styles.faqList}>
            {faq.items.map((item, index) => (
              <details
                className={styles.faqItem}
                name="gov-industry-faq"
                key={item.id}
                open={index === 0}
              >
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

        {/* ------------------ Service paths (repurposed departments grid) */}
        <section className={`${styles.section} ${styles.sectionGray}`} id="gov-service-paths">
          <GovReveal className={styles.sectionHeadingSplit} variant="up">
            <div>
              <p className={styles.eyebrow}>{copy.servicePathsEyebrow}</p>
              <h2>{services.title}</h2>
              <span className={styles.titleShape} aria-hidden="true" />
            </div>
            <p className={styles.sectionIntro}>{services.intro}</p>
          </GovReveal>
          <GovReveal className={styles.servicePathGrid} variant="up" stagger>
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
          </GovReveal>
          <Link
            className={styles.contextualServiceLink}
            href={localePath(locale, CANONICAL_SERVICE_TARGETS['web-applications'])}
          >
            {copy.webAppAction}
            <ArrowPair locale={locale} />
          </Link>
        </section>

        {/* ----------------------------------------------- Full-width CTA */}
        <div className={styles.ctaScrollWrap}>
          <div className={styles.ctaCard}>
            <div className={styles.ctaInner}>
              <p className={styles.eyebrowLight}>{copy.ctaEyebrow}</p>
              <h2>{copy.ctaTitle}</h2>
              <p>{copy.ctaSubtitle}</p>
              <a className={`${styles.button} ${styles.buttonLight}`} href={whatsappHref}>
                <MessageCircle aria-hidden="true" />
                <span>{copy.ctaButton}</span>
                <ArrowPair locale={locale} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
