import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpLeft,
  ArrowUpRight,
  Check,
  ChevronDown,
  Eye,
  Gauge,
  Landmark,
  Layers,
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

import { FintechCounters } from './FintechCounters'
import { FintechHeroParallax } from './FintechHeroParallax'
import { FintechPricingTabs } from './FintechPricingTabs'
import { FintechReveal } from './FintechReveal'
import { FintechScrollZoomCta } from './FintechScrollZoomCta'
import { FintechWorkflow } from './FintechWorkflow'
import { fintechLandingCopy, type FintechFeatureCard } from './fintech-content'
import styles from './fintech-industry.module.css'

type FintechIndustryPageProps = {
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
    throw new Error(`Fintech section ${id} must be a ${type}`)
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

const VALUE_ICONS = [ShieldCheck, Gauge, Layers, Eye] as const

export function FintechIndustryPage({
  locale,
  definition,
  seo,
  schema,
}: FintechIndustryPageProps) {
  const direction = localeDirection[locale]
  const page = definition.locales[locale]
  const copy = fintechLandingCopy[locale]
  const services = sectionOf(page.sections, 'fintech-service-paths', 'service-bridge')
  const faq = sectionOf(page.sections, 'fintech-faq', 'faq')
  const whatsappHref = `/api/whatsapp?locale=${locale}`

  return (
    <div
      className={styles.page}
      dir={direction}
      data-fintech-template="paynext-v1"
      data-industry="fintech"
      data-world={definition.world.id}
      data-locale={locale}
      data-canonical={seo.canonical}
      data-indexable={seo.index ? 'true' : 'false'}
    >
      <a className={styles.skipLink} href="#fintech-industry-content">
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

      {/* -------------------------------------------------- Hero (parallax) */}
      <section className={styles.hero} data-fintech-hero data-header-theme="dark">
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
              <a className={`${styles.button} ${styles.buttonSecondary}`} href="#fintech-service-paths">
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
            <FintechHeroParallax
              direction={direction}
              large={{
                src: '/images/industries/fintech/hero_lg.webp',
                alt: copy.heroImageAlt,
                width: 450,
                height: 702,
              }}
              small1={{
                src: '/images/industries/fintech/hero_sm_1.webp',
                alt: copy.heroThumbOneAlt,
                width: 259,
                height: 219,
              }}
              small2={{
                src: '/images/industries/fintech/hero_sm_2.webp',
                alt: copy.heroThumbTwoAlt,
                width: 247,
                height: 219,
              }}
            />
          </div>
        </div>
      </section>

      <div id="fintech-industry-content" className={styles.content} tabIndex={-1}>
        {/* --------------------------------------- Services (3-card mosaic) */}
        <section className={styles.section}>
          <FintechReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.servicesEyebrow}</p>
            <h2>{copy.servicesTitle}</h2>
            <p className={styles.sectionIntro}>{copy.servicesIntro}</p>
          </FintechReveal>
          <FintechReveal
            className={`${styles.featureMosaic} ${styles.serviceMosaic}`}
            variant="up"
            stagger
          >
            {copy.services.map((card) => (
              <div className={styles.featureCard} key={card.id}>
                <div className={styles.featureCardText}>
                  <h3>{card.title}</h3>
                  <p>{card.subtitle}</p>
                </div>
                <div className={styles.featureCardThumb}>
                  <Image
                    src={card.image}
                    alt=""
                    width={card.width}
                    height={card.height}
                    sizes="(max-width: 991px) 90vw, 30vw"
                  />
                </div>
              </div>
            ))}
          </FintechReveal>
        </section>

        {/* --------------------------------------- Features (5-card mosaic) */}
        <section className={`${styles.section} ${styles.sectionGray}`}>
          <FintechReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.featuresEyebrow}</p>
            <h2>{copy.featuresTitle}</h2>
            <p className={styles.sectionIntro}>{copy.featuresIntro}</p>
          </FintechReveal>
          <FintechReveal
            className={`${styles.featureMosaic} ${styles.featuresMosaic}`}
            variant="up"
            stagger
          >
            {(copy.features as readonly FintechFeatureCard[]).map((card, index) => {
              const flip = index % 2 === 1
              return (
                <div
                  className={styles.featureCard}
                  data-flip={flip ? 'true' : 'false'}
                  key={card.id}
                >
                  <div className={styles.featureCardText}>
                    <h3>{card.title}</h3>
                    <p>{card.subtitle}</p>
                  </div>
                  {card.layout === 'stack' && card.stack ? (
                    <div className={styles.featureCardStack}>
                      {card.stack.map((strip) => (
                        <div className={styles.featureCardStackItem} key={strip.src}>
                          <Image
                            src={strip.src}
                            alt=""
                            width={strip.width}
                            height={strip.height}
                            sizes="(max-width: 991px) 80vw, 26vw"
                          />
                        </div>
                      ))}
                    </div>
                  ) : card.image ? (
                    <div className={styles.featureCardThumb}>
                      <Image
                        src={card.image}
                        alt=""
                        width={card.width ?? 715}
                        height={card.height ?? 400}
                        sizes="(max-width: 991px) 90vw, 30vw"
                      />
                      {card.layout === 'single-accent' && card.accent ? (
                        <span
                          className={styles.featureAccent}
                          aria-hidden="true"
                          style={{
                            backgroundImage: `url(${card.accent})`,
                            width: card.accentWidth,
                            height: card.accentHeight,
                          }}
                        />
                      ) : null}
                    </div>
                  ) : null}
                </div>
              )
            })}
          </FintechReveal>
        </section>

        {/* ------------------------------- Workflow (sequential highlight) */}
        <section className={styles.workflowSection} data-header-theme="dark">
          <div className={styles.workflowInner}>
            <FintechReveal className={styles.workflowCopy} variant="up">
              <p className={styles.eyebrowLight}>{copy.workflowEyebrow}</p>
              <h2>{copy.workflowTitle}</h2>
              <p>{copy.workflowIntro}</p>
            </FintechReveal>
            <FintechWorkflow steps={copy.steps} regionLabel={copy.workflowRegionLabel} />
          </div>
        </section>

        {/* -------------------------------------- Counter / funfact stats */}
        <section className={styles.statsSection}>
          <FintechCounters
            stats={copy.stats}
            locale={locale}
            caption={copy.statsLabel}
            note={copy.statsNote}
          />
        </section>

        {/* --------------------------------------- Core values (4 cards) */}
        <section className={styles.section}>
          <FintechReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.valuesEyebrow}</p>
            <h2>{copy.valuesTitle}</h2>
            <p className={styles.sectionIntro}>{copy.valuesIntro}</p>
          </FintechReveal>
          <FintechReveal className={styles.valuesGrid} variant="up" stagger>
            {copy.values.map((value, index) => {
              const Icon = VALUE_ICONS[index] ?? ShieldCheck
              return (
                <div className={styles.valueCard} key={value.id}>
                  <span className={styles.valueIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{value.title}</h3>
                  <p>{value.subtitle}</p>
                </div>
              )
            })}
          </FintechReveal>
        </section>

        {/* ---------------------------- Approach (vision/mission blocks) */}
        <section className={`${styles.section} ${styles.sectionGray}`}>
          <FintechReveal variant="up">
            <p className={styles.eyebrow}>{copy.approachEyebrow}</p>
          </FintechReveal>
          {copy.approach.map((block, index) => (
            <FintechReveal key={block.id} variant={index % 2 === 1 ? 'right' : 'left'}>
              <div className={styles.approachRow} data-flip={index % 2 === 1 ? 'true' : 'false'}>
                <div className={styles.approachMedia}>
                  <Image
                    src={block.image}
                    alt={block.imageAlt}
                    width={block.width}
                    height={block.height}
                    sizes="(max-width: 991px) 92vw, 46vw"
                  />
                </div>
                <div className={styles.approachCopy}>
                  <span className={styles.approachBadge}>{block.badge}</span>
                  <h2>{block.title}</h2>
                  <p>{block.body}</p>
                </div>
              </div>
            </FintechReveal>
          ))}
        </section>

        {/* ---------------------------- Pricing / engagement model tabs */}
        <section className={`${styles.section} ${styles.pricingSection} ${styles.sectionGray}`}>
          <FintechReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.pricingEyebrow}</p>
            <h2>{copy.pricingTitle}</h2>
            <p className={styles.sectionIntro}>{copy.pricingIntro}</p>
          </FintechReveal>
          <FintechPricingTabs
            projectLabel={copy.pricingTabProject}
            retainerLabel={copy.pricingTabRetainer}
            projectPlans={copy.pricingProject}
            retainerPlans={copy.pricingRetainer}
            tabsLabel={copy.pricingTabsLabel}
            ctaLabel={copy.pricingCta}
            whatsappHref={whatsappHref}
            direction={direction}
          />
          <p className={styles.pricingFootnote}>{copy.pricingFootnote}</p>
        </section>

        {/* ------------------ Service paths (repurposed insights grid) */}
        <section className={styles.section} id="fintech-service-paths">
          <FintechReveal className={styles.sectionHeadingSplit} variant="up">
            <div>
              <p className={styles.eyebrow}>{copy.servicePathsEyebrow}</p>
              <h2>{services.title}</h2>
            </div>
            <p className={styles.sectionIntro}>{services.intro}</p>
          </FintechReveal>
          <FintechReveal className={styles.servicePathGrid} variant="up" stagger>
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
          </FintechReveal>
          <Link
            className={styles.contextualServiceLink}
            href={localePath(locale, CANONICAL_SERVICE_TARGETS['web-applications'])}
          >
            {copy.fintechWebAppAction}
            <ArrowPair locale={locale} />
          </Link>
        </section>

        {/* ------------------------------------------------- FAQ (grid) */}
        <section className={`${styles.section} ${styles.faqSection}`}>
          <FintechReveal className={styles.faqHeading} variant="up">
            <p className={styles.eyebrow}>{copy.faqEyebrow}</p>
            <h2>{faq.title}</h2>
            <p className={styles.sectionIntro}>{faq.intro}</p>
          </FintechReveal>
          <div className={styles.faqList}>
            {faq.items.map((item, index) => (
              <details
                className={styles.faqItem}
                name="fintech-industry-faq"
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

        {/* ---------------------------- Full-width CTA (scroll-zoom) */}
        <FintechScrollZoomCta>
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
        </FintechScrollZoomCta>
      </div>
    </div>
  )
}
