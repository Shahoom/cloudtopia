import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpLeft,
  ArrowUpRight,
  Cable,
  Check,
  ChevronDown,
  ClipboardCheck,
  FileSignature,
  FolderKanban,
  Languages,
  LifeBuoy,
  Lock,
  MessageCircle,
  PencilRuler,
  Receipt,
  Rocket,
  Scale,
  Search,
  ShieldCheck,
  Split,
  type LucideIcon,
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

import { LegalCaseCarousel } from './LegalCaseCarousel'
import { LegalCountUp, LegalStatsBand } from './LegalCounters'
import { LegalHeroParallax } from './LegalHeroParallax'
import { LegalReveal } from './LegalReveal'
import { LegalTabs } from './LegalTabs'
import { legalFirmsLandingCopy } from './legal-firms-content'
import styles from './legal-firms-industry.module.css'

type LegalFirmsIndustryPageProps = {
  locale: Locale
  definition: IndustryPageDefinition
  seo: EffectiveIndustrySeo
  schema: unknown
}

function sectionOf<TType extends IndustrySection['type']>(
  sections: readonly IndustrySection[],
  id: string,
  type: TType,
): Extract<IndustrySection, { type: TType }> {
  const section = sections.find((candidate) => candidate.id === id)
  if (!section || section.type !== type) {
    throw new Error(`Legal-firms section ${id} must be a ${type}`)
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

const VALUE_ICONS: readonly LucideIcon[] = [ShieldCheck, Scale, ClipboardCheck]
const DOMAIN_ICONS: readonly LucideIcon[] = [
  FolderKanban,
  ClipboardCheck,
  FileSignature,
  Lock,
  Receipt,
  ShieldCheck,
]
const WHY_ICONS: readonly LucideIcon[] = [
  ShieldCheck,
  Scale,
  Split,
  Cable,
  LifeBuoy,
  Languages,
]
const STEP_ICONS: readonly LucideIcon[] = [Search, PencilRuler, Rocket]

export function LegalFirmsIndustryPage({
  locale,
  definition,
  seo,
  schema,
}: LegalFirmsIndustryPageProps) {
  const direction = localeDirection[locale]
  const page = definition.locales[locale]
  const copy = legalFirmsLandingCopy[locale]
  const services = sectionOf(page.sections, 'legal-service-paths', 'service-bridge')
  const faq = sectionOf(page.sections, 'legal-faq', 'faq')
  const whatsappHref = `/api/whatsapp?locale=${locale}`

  return (
    <div
      className={styles.page}
      dir={direction}
      data-legal-template="regalis-v1"
      data-industry="legal-firms"
      data-world={definition.world.id}
      data-locale={locale}
      data-canonical={seo.canonical}
      data-indexable={seo.index ? 'true' : 'false'}
    >
      <a className={styles.skipLink} href="#legal-industry-content">
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

      {/* ---------------------------------------------------- Hero (jarallax) */}
      <section className={styles.hero} data-legal-hero data-header-theme="dark">
        <LegalHeroParallax
          src="/images/industries/legal-firms/hero.webp"
          alt={copy.heroImageAlt}
          width={1920}
          height={1080}
        />
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>
              <Scale aria-hidden="true" />
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
              <a className={`${styles.button} ${styles.buttonGhost}`} href="#legal-service-paths">
                <span>{copy.heroSecondaryCta}</span>
                <ArrowPair locale={locale} />
              </a>
            </div>
            <ul className={styles.heroCaps}>
              <li className={styles.heroCapsLabel} aria-hidden="true">
                {copy.heroCapabilitiesLabel}
              </li>
              {copy.heroCapabilities.map((item) => (
                <li key={item}>
                  <Check aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.heroStatCard}>
            <LegalCountUp
              value={copy.heroStatValue}
              suffix={copy.heroStatSuffix}
              locale={locale}
              label={copy.heroStatLabel}
            />
          </div>
        </div>
      </section>

      <div id="legal-industry-content" className={styles.content} tabIndex={-1}>
        {/* ------------------------------------------- Three value cards */}
        <section className={styles.section}>
          <LegalReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.valuesEyebrow}</p>
            <h2>{copy.valuesTitle}</h2>
            <p className={styles.sectionIntro}>{copy.valuesIntro}</p>
          </LegalReveal>
          <LegalReveal className={styles.valueCards} variant="up" stagger>
            {copy.values.map((card, index) => {
              const Icon = VALUE_ICONS[index] ?? ShieldCheck
              return (
                <div className={styles.valueCard} key={card.id}>
                  <span className={styles.valueIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.subtitle}</p>
                </div>
              )
            })}
          </LegalReveal>
        </section>

        {/* ------------------------------- About + Mission/Vision/Values */}
        <section className={`${styles.section} ${styles.sectionGray}`}>
          <div className={styles.aboutGrid}>
            <LegalReveal className={styles.aboutMedia} variant="left">
              <Image
                src="/images/industries/legal-firms/approach_1.webp"
                alt={copy.aboutImageAlt}
                width={1055}
                height={1055}
                sizes="(max-width: 991px) 92vw, 46vw"
              />
              <div className={styles.aboutOverlay}>
                <LegalCountUp
                  value={copy.aboutCounterValue}
                  suffix={copy.aboutCounterSuffix}
                  locale={locale}
                  label={copy.aboutCounterLabel}
                />
              </div>
            </LegalReveal>
            <LegalReveal className={styles.aboutCopy} variant="right">
              <p className={styles.eyebrow}>{copy.aboutEyebrow}</p>
              <h2>{copy.aboutTitle}</h2>
              <p className={styles.sectionIntro}>{copy.aboutIntro}</p>
              <LegalTabs tabs={copy.aboutTabs} tabsLabel={copy.aboutTabsLabel} direction={direction} />
            </LegalReveal>
          </div>
        </section>

        {/* --------------------------------- Solution domains (navy band) */}
        <section className={styles.domainsSection} data-header-theme="dark">
          <div className={styles.domainsInner}>
            <LegalReveal className={styles.domainsHeading} variant="up">
              <p className={styles.eyebrowLight}>{copy.domainsEyebrow}</p>
              <h2>{copy.domainsTitle}</h2>
              <p>{copy.domainsIntro}</p>
              <a className={`${styles.button} ${styles.buttonLight}`} href="#legal-service-paths">
                <span>{copy.domainsCta}</span>
                <ArrowPair locale={locale} />
              </a>
            </LegalReveal>
            <LegalReveal className={styles.domainsGrid} variant="right" stagger>
              {copy.domains.map((domain, index) => {
                const Icon = DOMAIN_ICONS[index] ?? FolderKanban
                return (
                  <div className={styles.domainItem} key={domain.id}>
                    <span className={styles.domainIcon} aria-hidden="true">
                      <Icon />
                    </span>
                    <div>
                      <h3>{domain.title}</h3>
                      <p>{domain.description}</p>
                    </div>
                  </div>
                )
              })}
            </LegalReveal>
          </div>
        </section>

        {/* ------------------------------------------ Capability metrics */}
        <section className={styles.statsSection}>
          <LegalStatsBand
            stats={copy.stats}
            locale={locale}
            caption={copy.statsLabel}
            note={copy.statsNote}
          />
        </section>

        {/* --------------------------- Solution patterns (case carousel) */}
        <section className={styles.section}>
          <LegalReveal className={styles.sectionHeadingSplit} variant="up">
            <div>
              <p className={styles.eyebrow}>{copy.casesEyebrow}</p>
              <h2>{copy.casesTitle}</h2>
            </div>
            <p className={styles.sectionIntro}>{copy.casesIntro}</p>
          </LegalReveal>
          <LegalCaseCarousel
            cards={copy.cases}
            direction={direction}
            regionLabel={copy.casesRegionLabel}
            previousLabel={copy.casesPrev}
            nextLabel={copy.casesNext}
          />
        </section>

        {/* ------------------------------ Delivery process (timeline) */}
        <section className={`${styles.section} ${styles.sectionGray}`}>
          <div className={styles.deliveryGrid}>
            <LegalReveal className={styles.deliveryMedia} variant="left">
              <Image
                src="/images/industries/legal-firms/delivery.webp"
                alt={copy.deliveryImageAlt}
                width={1055}
                height={1055}
                sizes="(max-width: 991px) 92vw, 46vw"
              />
            </LegalReveal>
            <LegalReveal className={styles.deliveryCopy} variant="right">
              <p className={styles.eyebrow}>{copy.deliveryEyebrow}</p>
              <h2>{copy.deliveryTitle}</h2>
              <p className={styles.sectionIntro}>{copy.deliveryIntro}</p>
              <ol className={styles.timeline}>
                {copy.deliverySteps.map((step, index) => {
                  const Icon = STEP_ICONS[index] ?? Search
                  return (
                    <li className={styles.timelineStep} key={step.id}>
                      <span className={styles.timelineIcon} aria-hidden="true">
                        <Icon />
                      </span>
                      <div>
                        <h3>
                          <span className={styles.timelineNum} aria-hidden="true">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          {step.title}
                        </h3>
                        <p>{step.subtitle}</p>
                      </div>
                    </li>
                  )
                })}
              </ol>
            </LegalReveal>
          </div>
        </section>

        {/* ------------------------------------------- Why choose us */}
        <section className={styles.section}>
          <LegalReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.whyEyebrow}</p>
            <h2>{copy.whyTitle}</h2>
            <p className={styles.sectionIntro}>{copy.whyIntro}</p>
          </LegalReveal>
          <LegalReveal className={styles.whyGrid} variant="up" stagger>
            {copy.why.map((feature, index) => {
              const Icon = WHY_ICONS[index] ?? ShieldCheck
              return (
                <div className={styles.whyCard} key={feature.id}>
                  <span className={styles.whyIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <div>
                    <h3>{feature.title}</h3>
                    <p>{feature.subtitle}</p>
                  </div>
                </div>
              )
            })}
          </LegalReveal>
        </section>

        {/* ----------------------------------- Service paths (bridge) */}
        <section className={`${styles.section} ${styles.sectionGray}`} id="legal-service-paths">
          <LegalReveal className={styles.sectionHeadingSplit} variant="up">
            <div>
              <p className={styles.eyebrow}>{copy.servicePathsEyebrow}</p>
              <h2>{services.title}</h2>
            </div>
            <p className={styles.sectionIntro}>{services.intro}</p>
          </LegalReveal>
          <LegalReveal className={styles.servicePathGrid} variant="up" stagger>
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
          </LegalReveal>
          <Link
            className={styles.contextualServiceLink}
            href={localePath(locale, CANONICAL_SERVICE_TARGETS['web-applications'])}
          >
            {copy.legalWebAppAction}
            <ArrowPair locale={locale} />
          </Link>
        </section>

        {/* ----------------------------------------------- FAQ (accordion) */}
        <section className={`${styles.section} ${styles.faqSection}`}>
          <LegalReveal className={styles.faqHeading} variant="up">
            <p className={styles.eyebrow}>{copy.faqEyebrow}</p>
            <h2>{faq.title}</h2>
            <p className={styles.sectionIntro}>{faq.intro}</p>
          </LegalReveal>
          <div className={styles.faqList}>
            {faq.items.map((item, index) => (
              <details
                className={styles.faqItem}
                name="legal-industry-faq"
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

        {/* ------------------------------------------- Closing CTA band */}
        <section className={styles.ctaSection}>
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
        </section>
      </div>
    </div>
  )
}
