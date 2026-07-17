import Link from 'next/link'
import {
  ArrowUpLeft,
  ArrowUpRight,
  ChevronDown,
  Gauge,
  Headphones,
  Layers,
  LifeBuoy,
  Lock,
  MessageCircle,
  Truck,
  Zap,
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

import { RestaurantsCapabilityTabs } from './RestaurantsCapabilityTabs'
import { RestaurantsCategorySlider } from './RestaurantsCategorySlider'
import { RestaurantsHero } from './RestaurantsHero'
import { RestaurantsReveal } from './RestaurantsReveal'
import { restaurantsLandingCopy } from './restaurants-content'
import styles from './restaurants-industry.module.css'

type RestaurantsIndustryPageProps = {
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
    throw new Error(`Restaurants section ${id} must be a ${type}`)
  }
  return section as Extract<IndustrySection, { type: TType }>
}

const CHOOSE_ICONS: readonly LucideIcon[] = [Zap, Gauge, Lock, Layers]
const GUARANTEE_ICONS: readonly LucideIcon[] = [Gauge, Truck, Lock, Headphones]
const ABOUT_ICONS: readonly LucideIcon[] = [Layers, LifeBuoy]

export function RestaurantsIndustryPage({
  locale,
  definition,
  seo,
  schema,
}: RestaurantsIndustryPageProps) {
  const direction = localeDirection[locale]
  const page = definition.locales[locale]
  const copy = restaurantsLandingCopy[locale]
  const services = sectionOf(page.sections, 'restaurant-service-paths', 'service-bridge')
  const faq = sectionOf(page.sections, 'restaurants-faq', 'faq')
  const whatsappHref = `/api/whatsapp?locale=${locale}`
  const Arrow = direction === 'rtl' ? ArrowUpLeft : ArrowUpRight

  return (
    <div
      className={styles.page}
      dir={direction}
      data-restaurants-template="foodking-v1"
      data-industry="restaurants"
      data-world={definition.world.id}
      data-locale={locale}
      data-canonical={seo.canonical}
      data-indexable={seo.index ? 'true' : 'false'}
    >
      <a className={styles.skipLink} href="#restaurants-industry-content">
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

      {/* ------------------------------------------------ Hero (fade + replay) */}
      <RestaurantsHero
        direction={direction}
        kicker={copy.heroKicker}
        h1={page.hero.h1}
        intro={page.hero.intro}
        primaryCtaLabel={page.hero.primaryCta.label}
        primaryHref={whatsappHref}
        secondaryCtaLabel={copy.heroSecondaryCta}
        backTitle={copy.heroBackTitle}
        trustLabel={copy.heroTrustLabel}
        trust={copy.heroTrust}
        pillars={copy.heroPillars}
        regionLabel={copy.heroRegionLabel}
        dotLabel={copy.heroDotLabel}
        prevLabel={copy.heroPrev}
        nextLabel={copy.heroNext}
      />

      <div id="restaurants-industry-content" className={styles.content} tabIndex={-1}>
        {/* --------------------------------------------- Capability carousel */}
        <section className={styles.section}>
          <RestaurantsReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.categoryEyebrow}</p>
            <h2 className={styles.sectionTitle}>{copy.categoryTitle}</h2>
            <p className={styles.sectionIntro}>{copy.categoryIntro}</p>
          </RestaurantsReveal>
          <RestaurantsCategorySlider
            items={copy.categories}
            regionLabel={copy.categoryRegionLabel}
            prevLabel={copy.categoryPrev}
            nextLabel={copy.categoryNext}
            direction={direction}
          />
        </section>

        {/* --------------------------------------------------- Why CloudTopia */}
        <section className={`${styles.section} ${styles.sectionCream}`}>
          <RestaurantsReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.chooseEyebrow}</p>
            <h2 className={styles.sectionTitle}>{copy.chooseTitle}</h2>
            <p className={styles.sectionIntro}>{copy.chooseIntro}</p>
          </RestaurantsReveal>
          <RestaurantsReveal className={styles.chooseGrid} variant="up" stagger>
            {copy.choose.map((item, index) => {
              const Icon = CHOOSE_ICONS[index] ?? Zap
              return (
                <div className={styles.chooseCard} key={item.id}>
                  <span className={styles.chooseIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{item.title}</h3>
                  <p>{item.body}</p>
                </div>
              )
            })}
          </RestaurantsReveal>
        </section>

        {/* ----------------------------------------------- About / expertise */}
        <section className={styles.section}>
          <div className={styles.aboutRow}>
            <RestaurantsReveal className={styles.aboutCopy} variant="right">
              <p className={styles.eyebrow}>{copy.aboutEyebrow}</p>
              <h2 className={styles.sectionTitle}>{copy.aboutTitle}</h2>
              <p className={styles.sectionIntro}>{copy.aboutBody}</p>
              <div className={styles.aboutPoints}>
                {copy.aboutPoints.map((point, index) => {
                  const Icon = ABOUT_ICONS[index] ?? Layers
                  return (
                    <div className={styles.aboutPoint} key={point.id}>
                      <span className={styles.aboutPointIcon} aria-hidden="true">
                        <Icon />
                      </span>
                      <div>
                        <h3>{point.title}</h3>
                        <p>{point.body}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </RestaurantsReveal>
            <RestaurantsReveal className={styles.aboutPanel} variant="left">
              <div className={styles.aboutStats}>
                {copy.aboutStats.map((stat) => (
                  <div className={styles.aboutStat} key={stat.id}>
                    <div className={styles.aboutStatValue}>
                      {new Intl.NumberFormat(locale === 'ar' ? 'ar' : 'en').format(stat.value)}
                    </div>
                    <p>{stat.label}</p>
                  </div>
                ))}
              </div>
              <p className={styles.aboutStatsNote}>{copy.aboutStatsNote}</p>
            </RestaurantsReveal>
          </div>
        </section>

        {/* ------------------------------------------------ Capability tabs */}
        <section className={`${styles.section} ${styles.sectionCream}`}>
          <RestaurantsReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.tabsEyebrow}</p>
            <h2 className={styles.sectionTitle}>{copy.tabsTitle}</h2>
            <p className={styles.sectionIntro}>{copy.tabsIntro}</p>
          </RestaurantsReveal>
          <RestaurantsReveal variant="up">
            <RestaurantsCapabilityTabs
              tabs={copy.tabs}
              tabsLabel={copy.tabsLabel}
              direction={direction}
            />
          </RestaurantsReveal>
        </section>

        {/* ---------------------------------------------------- Process steps */}
        <section className={styles.section}>
          <RestaurantsReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.processEyebrow}</p>
            <h2 className={styles.sectionTitle}>{copy.processTitle}</h2>
            <p className={styles.sectionIntro}>{copy.processIntro}</p>
          </RestaurantsReveal>
          <RestaurantsReveal className={styles.stepsGrid} variant="up" stagger>
            {copy.steps.map((step) => (
              <div className={styles.stepCard} key={step.id}>
                <span className={styles.stepNumber} aria-hidden="true">
                  {step.number}
                </span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </div>
            ))}
          </RestaurantsReveal>
        </section>

        {/* -------------------------------------------------- Marquee band */}
        <div className={styles.marquee} role="group" aria-label={copy.marqueeLabel}>
          <div className={styles.marqueeTrack} aria-hidden="true">
            {[0, 1].map((copyIndex) => (
              <ul className={styles.marqueeGroup} key={copyIndex}>
                {copy.marqueeWords.map((word, index) => (
                  <li key={`${copyIndex}-${word}`}>
                    <span data-accent={index % 2 === 0 ? 'true' : 'false'}>{word}</span>
                    <span className={styles.marqueeStar} aria-hidden="true">
                      ✦
                    </span>
                  </li>
                ))}
              </ul>
            ))}
          </div>
          <span className={styles.srOnly}>{copy.marqueeWords.join(', ')}</span>
        </div>

        {/* ------------------------------------------- Guarantees (green band) */}
        <section className={styles.guaranteesSection} data-header-theme="dark">
          <div className={styles.guaranteesInner}>
            <RestaurantsReveal className={styles.guaranteesHead} variant="up">
              <p className={styles.eyebrowLight}>{copy.guaranteesEyebrow}</p>
              <h2>{copy.guaranteesTitle}</h2>
              <p>{copy.guaranteesIntro}</p>
            </RestaurantsReveal>
            <RestaurantsReveal className={styles.guaranteesGrid} variant="up" stagger>
              {copy.guarantees.map((item, index) => {
                const Icon = GUARANTEE_ICONS[index] ?? Gauge
                return (
                  <div className={styles.guaranteeCard} key={item.id}>
                    <span className={styles.guaranteeIcon} aria-hidden="true">
                      <Icon />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                )
              })}
            </RestaurantsReveal>
            <RestaurantsReveal className={styles.supportCard} variant="up">
              <div>
                <h3>{copy.supportTitle}</h3>
                <p>{copy.supportBody}</p>
              </div>
              <a className={`${styles.themeBtn} ${styles.themeBtnLight}`} href={whatsappHref}>
                <span className={styles.themeBtnIcon} aria-hidden="true">
                  <MessageCircle />
                </span>
                <span className={styles.themeBtnText}>{copy.supportCta}</span>
              </a>
            </RestaurantsReveal>
          </div>
        </section>

        {/* ------------------------------------------------- Service paths */}
        <section className={styles.section} id="restaurants-service-paths">
          <RestaurantsReveal className={styles.sectionHeadingSplit} variant="up">
            <div>
              <p className={styles.eyebrow}>{copy.servicePathsEyebrow}</p>
              <h2 className={styles.sectionTitle}>{services.title}</h2>
            </div>
            <p className={styles.sectionIntro}>{services.intro}</p>
          </RestaurantsReveal>
          <RestaurantsReveal className={styles.servicePathGrid} variant="up" stagger>
            {services.serviceAnchors.map((anchor, index) => (
              <Link
                className={styles.serviceCard}
                href={localePath(locale, CANONICAL_SERVICE_TARGETS[anchor.serviceId])}
                key={anchor.serviceId}
              >
                <span className={styles.serviceCardIndex}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{anchor.label}</h3>
                <p>{copy.learnMore}</p>
                <span className={styles.arrowPair} aria-hidden="true">
                  <Arrow />
                  <Arrow />
                </span>
              </Link>
            ))}
          </RestaurantsReveal>
          <Link
            className={styles.contextualServiceLink}
            href={localePath(locale, CANONICAL_SERVICE_TARGETS['restaurant-qr-menu'])}
          >
            {copy.restaurantQrAction}
            <span className={styles.arrowPair} aria-hidden="true">
              <Arrow />
              <Arrow />
            </span>
          </Link>
        </section>

        {/* -------------------------------------------------------- FAQ */}
        <section className={`${styles.section} ${styles.sectionCream} ${styles.faqSection}`}>
          <RestaurantsReveal className={styles.faqHeading} variant="up">
            <p className={styles.eyebrow}>{copy.faqEyebrow}</p>
            <h2 className={styles.sectionTitle}>{faq.title}</h2>
            <p className={styles.sectionIntro}>{faq.intro}</p>
          </RestaurantsReveal>
          <div className={styles.faqList}>
            {faq.items.map((item, index) => (
              <details
                className={styles.faqItem}
                name="restaurants-industry-faq"
                key={item.id}
                open={index === 0}
              >
                <summary>
                  <span className={styles.faqIndex}>{String(index + 1).padStart(2, '0')}</span>
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

        {/* ---------------------------------------------- Closing CTA band */}
        <section className={styles.ctaSection}>
          <RestaurantsReveal className={styles.ctaCard} variant="up">
            <p className={styles.eyebrowLight}>{copy.ctaEyebrow}</p>
            <h2>{copy.ctaTitle}</h2>
            <p>{copy.ctaSubtitle}</p>
            <a className={`${styles.themeBtn} ${styles.themeBtnLight}`} href={whatsappHref}>
              <span className={styles.themeBtnIcon} aria-hidden="true">
                <MessageCircle />
              </span>
              <span className={styles.themeBtnText}>{copy.ctaButton}</span>
            </a>
          </RestaurantsReveal>
        </section>
      </div>
    </div>
  )
}
