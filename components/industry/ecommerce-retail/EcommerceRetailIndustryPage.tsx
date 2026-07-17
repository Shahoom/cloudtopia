import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpLeft,
  ArrowUpRight,
  BarChart3,
  Boxes,
  Check,
  ChevronDown,
  CreditCard,
  Gauge,
  LineChart,
  MessageCircle,
  Search,
  ShoppingBag,
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

import { EcommerceCounters } from './EcommerceCounters'
import { EcommerceHeroSlider } from './EcommerceHeroSlider'
import { EcommerceReveal } from './EcommerceReveal'
import { EcommerceStretcher } from './EcommerceStretcher'
import { EcommerceTabsy } from './EcommerceTabsy'
import { ecommerceRetailLandingCopy } from './ecommerce-retail-content'
import styles from './ecommerce-retail-industry.module.css'

type EcommerceRetailIndustryPageProps = {
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
    throw new Error(`E-commerce section ${id} must be a ${type}`)
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

const CAPABILITY_ICONS = [ShoppingBag, Search, CreditCard, Boxes, LineChart, Gauge] as const

export function EcommerceRetailIndustryPage({
  locale,
  definition,
  seo,
  schema,
}: EcommerceRetailIndustryPageProps) {
  const direction = localeDirection[locale]
  const page = definition.locales[locale]
  const copy = ecommerceRetailLandingCopy[locale]
  const services = sectionOf(page.sections, 'ecommerce-service-paths', 'service-bridge')
  const faq = sectionOf(page.sections, 'ecommerce-faq', 'faq')
  const whatsappHref = `/api/whatsapp?locale=${locale}`

  return (
    <div
      className={styles.page}
      dir={direction}
      data-ecommerce-template="lager-v1"
      data-industry="ecommerce-retail"
      data-world={definition.world.id}
      data-locale={locale}
      data-canonical={seo.canonical}
      data-indexable={seo.index ? 'true' : 'false'}
    >
      <a className={styles.skipLink} href="#ecommerce-industry-content">
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

      {/* ------------------------------------------ Hero (owl caption cascade) */}
      <EcommerceHeroSlider
        heading={page.hero.h1}
        slides={copy.heroSlides}
        direction={direction}
        primaryCta={{ label: page.hero.primaryCta.label, href: whatsappHref }}
        secondaryCta={{ label: copy.heroSecondaryCta, href: '#ecommerce-service-paths' }}
        prevLabel={copy.heroPrev}
        nextLabel={copy.heroNext}
        slideLabel={copy.heroSlideLabel}
      />

      <div id="ecommerce-industry-content" className={styles.content} tabIndex={-1}>
        {/* ------------------------------------- Capability band (6 icons) */}
        <section className={styles.section}>
          <EcommerceReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.capabilitiesEyebrow}</p>
            <h2>{copy.capabilitiesTitle}</h2>
            <p className={styles.sectionIntro}>{copy.capabilitiesIntro}</p>
          </EcommerceReveal>
          <EcommerceReveal className={styles.capabilityGrid} variant="up" stagger>
            {copy.capabilities.map((capability, index) => {
              const Icon = CAPABILITY_ICONS[index] ?? ShoppingBag
              return (
                <div className={styles.capabilityTile} key={capability.id}>
                  <span className={styles.capabilityIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <div>
                    <h3>{capability.title}</h3>
                    <p>{capability.subtitle}</p>
                  </div>
                </div>
              )
            })}
          </EcommerceReveal>
        </section>

        {/* ------------------------------- Solution domains (card bloom) */}
        <section className={`${styles.section} ${styles.sectionGray}`}>
          <EcommerceReveal className={styles.sectionHeadingSplit} variant="up">
            <div>
              <p className={styles.eyebrow}>{copy.solutionsEyebrow}</p>
              <h2>{copy.solutionsTitle}</h2>
            </div>
            <p className={styles.sectionIntro}>{copy.solutionsIntro}</p>
          </EcommerceReveal>
          <EcommerceReveal className={styles.solutionGrid} variant="up" stagger>
            {copy.solutions.map((solution, index) => (
              <article className={styles.solutionCard} key={solution.id}>
                <span className={styles.solutionIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className={styles.solutionEyebrow}>{solution.eyebrow}</p>
                <h3>{solution.title}</h3>
                <p className={styles.solutionText}>{solution.subtitle}</p>
                <span className={styles.solutionAction} aria-hidden="true">
                  {copy.solutionAction}
                  <ArrowPair locale={locale} />
                </span>
              </article>
            ))}
          </EcommerceReveal>
        </section>

        {/* ---------------------------- Flagship split panels (2-up lists) */}
        <section className={styles.section}>
          <EcommerceReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.panelsEyebrow}</p>
            <h2>{copy.panelsTitle}</h2>
            <p className={styles.sectionIntro}>{copy.panelsIntro}</p>
          </EcommerceReveal>
          <EcommerceReveal className={styles.panelGrid} variant="up" stagger>
            {copy.panels.map((panel) => (
              <div className={styles.flagPanel} key={panel.id}>
                <div className={styles.flagMedia}>
                  <Image
                    className={styles.flagImg}
                    src={panel.image}
                    alt={panel.imageAlt}
                    width={panel.width}
                    height={panel.height}
                    sizes="(max-width: 991px) 92vw, (max-width: 1400px) 46vw, 648px"
                  />
                </div>
                <div className={styles.flagBody}>
                  <p className={styles.flagEyebrow}>{panel.eyebrow}</p>
                  <h3>{panel.title}</h3>
                  <p className={styles.flagText}>{panel.subtitle}</p>
                  <ul className={styles.flagList}>
                    {panel.items.map((item) => (
                      <li key={item}>
                        <Check aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </EcommerceReveal>
        </section>

        {/* ----------------------------------- Tabsy hover-swap disciplines */}
        <section className={`${styles.section} ${styles.sectionFlush}`}>
          <EcommerceReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.tabsyEyebrow}</p>
            <h2>{copy.tabsyTitle}</h2>
            <p className={styles.sectionIntro}>{copy.tabsyIntro}</p>
          </EcommerceReveal>
          <EcommerceReveal variant="up">
            <EcommerceTabsy
              tabs={copy.tabs}
              hint={copy.tabsyHint}
              regionLabel={copy.tabsyTitle}
            />
          </EcommerceReveal>
        </section>

        {/* --------------------------------- Stretcher hover-accordion */}
        <section className={styles.stretcherSection} data-header-theme="dark">
          <div className={styles.stretcherHead}>
            <EcommerceReveal className={styles.sectionHeadingCentered} variant="up">
              <p className={styles.eyebrowLight}>{copy.stackEyebrow}</p>
              <h2>{copy.stackTitle}</h2>
              <p className={styles.sectionIntroLight}>{copy.stackIntro}</p>
            </EcommerceReveal>
          </div>
          <EcommerceStretcher panels={copy.stackPanels} regionLabel={copy.stackRegionLabel} />
        </section>

        {/* --------------------------------------- Counter / stats band */}
        <section className={styles.statsSection}>
          <EcommerceCounters
            stats={copy.stats}
            locale={locale}
            caption={copy.statsLabel}
            note={copy.statsNote}
          />
        </section>

        {/* --------------------------- Delivery methodology (timeline) */}
        <section className={`${styles.section} ${styles.sectionGray}`}>
          <EcommerceReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.methodologyEyebrow}</p>
            <h2>{copy.methodologyTitle}</h2>
            <p className={styles.sectionIntro}>{copy.methodologyIntro}</p>
          </EcommerceReveal>
          <ol className={styles.timeline}>
            {copy.phases.map((phase, index) => (
              <li className={styles.timelineRow} key={phase.id}>
                <EcommerceReveal variant={index % 2 === 1 ? 'right' : 'left'}>
                  <div className={styles.timelineItem}>
                    <span className={styles.timelineNumber} aria-hidden="true">
                      {phase.number}
                    </span>
                    <div className={styles.timelineText}>
                      <h3>{phase.title}</h3>
                      <p>{phase.body}</p>
                    </div>
                  </div>
                </EcommerceReveal>
              </li>
            ))}
          </ol>
        </section>

        {/* ------------------ Service paths (repurposed insights grid) */}
        <section className={styles.section} id="ecommerce-service-paths">
          <EcommerceReveal className={styles.sectionHeadingSplit} variant="up">
            <div>
              <p className={styles.eyebrow}>{copy.servicePathsEyebrow}</p>
              <h2>{services.title}</h2>
            </div>
            <p className={styles.sectionIntro}>{services.intro}</p>
          </EcommerceReveal>
          <EcommerceReveal className={styles.servicePathGrid} variant="up" stagger>
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
          </EcommerceReveal>
          <Link
            className={styles.contextualServiceLink}
            href={localePath(locale, CANONICAL_SERVICE_TARGETS['ecommerce-development'])}
          >
            {copy.commerceServiceAction}
            <ArrowPair locale={locale} />
          </Link>
        </section>

        {/* ------------------------------------------------- FAQ (grid) */}
        <section className={`${styles.section} ${styles.faqSection}`}>
          <EcommerceReveal className={styles.faqHeading} variant="up">
            <p className={styles.eyebrow}>{copy.faqEyebrow}</p>
            <h2>{faq.title}</h2>
            <p className={styles.sectionIntro}>{faq.intro}</p>
          </EcommerceReveal>
          <div className={styles.faqList}>
            {faq.items.map((item, index) => (
              <details
                className={styles.faqItem}
                name="ecommerce-industry-faq"
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

        {/* --------------------------------- Story / CTA banner */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaCard}>
            <Image
              className={styles.ctaImage}
              src="/images/industries/ecommerce-retail/hero-warm.jpg"
              alt={copy.ctaImageAlt}
              fill
              sizes="(max-width: 1320px) 100vw, 1320px"
            />
            <span className={styles.ctaScrim} aria-hidden="true" />
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
