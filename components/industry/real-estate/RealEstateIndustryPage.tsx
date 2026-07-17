import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpLeft,
  ArrowUpRight,
  Building2,
  CalendarCheck,
  Check,
  ChevronDown,
  MapPin,
  MessageCircle,
  PlugZap,
  Search,
  Users,
  Layers,
  PencilRuler,
  Rocket,
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

import { RealEstateCounters } from './RealEstateCounters'
import { RealEstateCurtainImage } from './RealEstateCurtainImage'
import { RealEstateHeroSlider } from './RealEstateHeroSlider'
import { RealEstateReveal } from './RealEstateReveal'
import { RealEstateSolutionTabs } from './RealEstateSolutionTabs'
import { RealEstateSplitHeading } from './RealEstateSplitHeading'
import { RealEstateVerticalSlider } from './RealEstateVerticalSlider'
import { realEstateLandingCopy, type RealEstatePlan } from './real-estate-content'
import styles from './real-estate-industry.module.css'

type RealEstateIndustryPageProps = {
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
    throw new Error(`Real-estate section ${id} must be a ${type}`)
  }
  return section as Extract<IndustrySection, { type: TType }>
}

const CAPABILITY_ICONS: Record<string, LucideIcon> = {
  'listing-search': Search,
  'agent-portals': Users,
  management: Building2,
  'tours-booking': CalendarCheck,
  'map-geo': MapPin,
  integrations: PlugZap,
}

const STEP_ICONS: readonly LucideIcon[] = [Search, PencilRuler, Layers, Rocket]

/** HouseBox theme-btn1 dual-arrow swap. Module-scope so it is not recreated on
 *  every render (which would remount the arrows). */
function ButtonArrows({ direction }: { direction: 'ltr' | 'rtl' }) {
  const Arrow = direction === 'rtl' ? ArrowUpLeft : ArrowUpRight
  return (
    <span className={styles.btnArrows} aria-hidden="true">
      <Arrow className={styles.arrow1} />
      <Arrow className={styles.arrow2} />
    </span>
  )
}

export function RealEstateIndustryPage({
  locale,
  definition,
  seo,
  schema,
}: RealEstateIndustryPageProps) {
  const direction = localeDirection[locale]
  const page = definition.locales[locale]
  const copy = realEstateLandingCopy[locale]
  const services = sectionOf(page.sections, 'real-estate-service-paths', 'service-bridge')
  const faq = sectionOf(page.sections, 'real-estate-faq', 'faq')
  const whatsappHref = `/api/whatsapp?locale=${locale}`
  const Arrow = direction === 'rtl' ? ArrowUpLeft : ArrowUpRight

  return (
    <div
      className={styles.page}
      dir={direction}
      data-real-estate-template="housebox-v1"
      data-industry="real-estate"
      data-world={definition.world.id}
      data-locale={locale}
      data-canonical={seo.canonical}
      data-indexable={seo.index ? 'true' : 'false'}
    >
      <a className={styles.skipLink} href="#real-estate-industry-content">
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

      {/* ------------------------------------------------ Hero (fade slider) */}
      <RealEstateHeroSlider
        slides={copy.heroSlides}
        kicker={copy.heroKicker}
        heading={page.hero.h1}
        intro={page.hero.intro}
        primaryCta={page.hero.primaryCta}
        secondaryCta={{ label: copy.heroSecondaryCta, href: '#real-estate-service-paths' }}
        trustLabel={copy.heroTrustLabel}
        trust={copy.heroTrust}
        sliderLabel={copy.heroSliderLabel}
        prevLabel={copy.heroPrevLabel}
        nextLabel={copy.heroNextLabel}
        direction={direction}
      />

      <div id="real-estate-industry-content" className={styles.content} tabIndex={-1}>
        {/* --------------------------- About + curtain images + CountUp stats */}
        <section className={styles.section}>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutMedia}>
              <RealEstateCurtainImage
                className={styles.aboutImgMain}
                src="/images/industries/real-estate/about_main.png"
                alt={copy.aboutImageMainAlt}
                width={520}
                height={520}
                sizes="(max-width: 991px) 60vw, 26vw"
                dir={direction}
              />
              <RealEstateCurtainImage
                className={styles.aboutImgTall}
                src="/images/industries/real-estate/about_tall.png"
                alt={copy.aboutImageTallAlt}
                width={370}
                height={663}
                sizes="(max-width: 991px) 40vw, 18vw"
                dir={direction}
              />
              <span className={styles.aboutBadge} aria-hidden="true">
                {copy.aboutBadge}
              </span>
            </div>
            <div className={styles.aboutCopy}>
              <p className={styles.eyebrow}>{copy.aboutEyebrow}</p>
              <RealEstateSplitHeading text={copy.aboutTitle} dir={direction} />
              <p className={styles.sectionIntro}>{copy.aboutBody}</p>
              <RealEstateCounters stats={copy.stats} locale={locale} />
              <p className={styles.statsNote}>{copy.statsNote}</p>
              <a className={`${styles.button} ${styles.buttonPrimary}`} href="#real-estate-capabilities">
                <span>{copy.aboutCta}</span>
                <ButtonArrows direction={direction} />
              </a>
            </div>
          </div>
        </section>

        {/* ------------------------------------ Capabilities (what we build) */}
        <section className={`${styles.section} ${styles.sectionTint}`} id="real-estate-capabilities">
          <RealEstateReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.capabilitiesEyebrow}</p>
            <RealEstateSplitHeading text={copy.capabilitiesTitle} dir={direction} />
            <p className={styles.sectionIntro}>{copy.capabilitiesIntro}</p>
          </RealEstateReveal>
          <div className={styles.capabilityGrid}>
            <RealEstateCurtainImage
              className={styles.capabilityMedia}
              src="/images/industries/real-estate/capabilities.png"
              alt={copy.capabilitiesImageAlt}
              width={670}
              height={626}
              sizes="(max-width: 991px) 92vw, 40vw"
              dir={direction}
            />
            <RealEstateReveal className={styles.capabilityCards} variant="up" stagger>
              {copy.capabilities.map((capability) => {
                const Icon = CAPABILITY_ICONS[capability.id] ?? Search
                return (
                  <article className={styles.capabilityCard} key={capability.id}>
                    <span className={styles.capabilityIcon} aria-hidden="true">
                      <Icon />
                    </span>
                    <h3>{capability.title}</h3>
                    <p>{capability.description}</p>
                  </article>
                )
              })}
            </RealEstateReveal>
          </div>
        </section>

        {/* ---------------------------------- Segments (who we build for) */}
        <section className={styles.section}>
          <RealEstateReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.segmentsEyebrow}</p>
            <RealEstateSplitHeading text={copy.segmentsTitle} dir={direction} />
            <p className={styles.sectionIntro}>{copy.segmentsIntro}</p>
          </RealEstateReveal>
          <RealEstateReveal className={styles.segmentGrid} variant="up" stagger>
            {copy.segments.map((segment) => (
              <article className={styles.segmentCard} key={segment.id}>
                <div className={`${styles.segmentMedia} ${styles.imageAnime}`}>
                  <Image
                    src={segment.image}
                    alt=""
                    width={segment.width}
                    height={segment.height}
                    sizes="(max-width: 991px) 92vw, 30vw"
                  />
                  <span className={styles.segmentTag}>{segment.tag}</span>
                </div>
                <div className={styles.segmentBody}>
                  <h3>{segment.title}</h3>
                  <p>{segment.description}</p>
                </div>
              </article>
            ))}
          </RealEstateReveal>
        </section>

        {/* ----------------------------- Solution patterns (tabbed showcase) */}
        <section className={`${styles.section} ${styles.sectionTint}`}>
          <RealEstateReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.solutionsEyebrow}</p>
            <RealEstateSplitHeading text={copy.solutionsTitle} dir={direction} />
            <p className={styles.sectionIntro}>{copy.solutionsIntro}</p>
          </RealEstateReveal>
          <RealEstateSolutionTabs
            tabs={copy.solutions}
            tabsLabel={copy.solutionsTabsLabel}
            tagsLabel={copy.solutionTagsLabel}
            direction={direction}
          />
        </section>

        {/* ------------------------------------- Process (numbered steps) */}
        <section className={styles.section}>
          <RealEstateReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.processEyebrow}</p>
            <RealEstateSplitHeading text={copy.processTitle} dir={direction} />
            <p className={styles.sectionIntro}>{copy.processIntro}</p>
          </RealEstateReveal>
          <RealEstateReveal
            className={styles.processGrid}
            variant="up"
            stagger
            id="real-estate-process"
          >
            <ol className={styles.processList} aria-label={copy.processRegionLabel}>
              {copy.steps.map((step, index) => {
                const Icon = STEP_ICONS[index] ?? Search
                return (
                  <li className={styles.processStep} key={step.id}>
                    <span className={styles.processNumber} aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className={styles.processIcon} aria-hidden="true">
                      <Icon />
                    </span>
                    <h3>{step.title}</h3>
                    <p>{step.description}</p>
                  </li>
                )
              })}
            </ol>
          </RealEstateReveal>
        </section>

        {/* ----------------------- Modules (vertical auto slider + copy) */}
        <section className={`${styles.section} ${styles.sectionDark}`} data-header-theme="dark">
          <div className={styles.modulesGrid}>
            <RealEstateReveal className={styles.modulesCopy} variant="left">
              <p className={styles.eyebrowLight}>{copy.modulesEyebrow}</p>
              <RealEstateSplitHeading text={copy.modulesTitle} dir={direction} className={styles.onDark} />
              <p className={styles.modulesIntro}>{copy.modulesIntro}</p>
            </RealEstateReveal>
            <RealEstateVerticalSlider
              modules={copy.modules}
              regionLabel={copy.modulesRegionLabel}
              prevLabel={copy.modulesPrevLabel}
              nextLabel={copy.modulesNextLabel}
            />
          </div>
        </section>

        {/* ----------------------------- Approach (curtain blocks) */}
        <section className={styles.section}>
          <RealEstateReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.approachEyebrow}</p>
            <RealEstateSplitHeading text={copy.approachTitle} dir={direction} />
          </RealEstateReveal>
          {copy.approach.map((block, index) => (
            <div
              className={styles.approachRow}
              data-flip={index % 2 === 1 ? 'true' : 'false'}
              key={block.id}
            >
              <RealEstateCurtainImage
                className={styles.approachMedia}
                src={block.image}
                alt={block.imageAlt}
                width={block.width}
                height={block.height}
                sizes="(max-width: 991px) 92vw, 46vw"
                dir={direction}
              />
              <div className={styles.approachCopy}>
                <span className={styles.approachBadge}>{block.badge}</span>
                <h3>{block.title}</h3>
                <p>{block.body}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ----------------------------- Pricing (engagement models) */}
        <section className={`${styles.section} ${styles.sectionTint}`}>
          <RealEstateReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.pricingEyebrow}</p>
            <RealEstateSplitHeading text={copy.pricingTitle} dir={direction} />
            <p className={styles.sectionIntro}>{copy.pricingIntro}</p>
          </RealEstateReveal>
          <RealEstateReveal className={styles.pricingGrid} variant="up" stagger>
            {(copy.plans as readonly RealEstatePlan[]).map((plan) => (
              <div
                className={`${styles.priceCard} ${plan.popular ? styles.priceCardPopular : ''}`}
                key={plan.id}
              >
                <div className={styles.priceHead}>
                  <div className={styles.priceHeadTop}>
                    <h3>{plan.plan}</h3>
                    {plan.badge ? <span className={styles.offerBadge}>{plan.badge}</span> : null}
                  </div>
                  <p className={styles.priceMeta}>{plan.meta}</p>
                </div>
                <ul className={styles.priceFeatures}>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <span className={styles.priceFeatureIcon} aria-hidden="true">
                        <Check />
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a className={`${styles.button} ${styles.buttonPrimary} ${styles.priceCta}`} href={whatsappHref}>
                  <span>{copy.pricingCta}</span>
                  <ButtonArrows direction={direction} />
                </a>
              </div>
            ))}
          </RealEstateReveal>
          <p className={styles.pricingFootnote}>{copy.pricingFootnote}</p>
        </section>

        {/* ----------------------- Service paths (service-bridge) */}
        <section className={styles.section} id="real-estate-service-paths">
          <RealEstateReveal className={styles.sectionHeadingSplit} variant="up">
            <div>
              <p className={styles.eyebrow}>{copy.servicePathsEyebrow}</p>
              <RealEstateSplitHeading text={services.title} dir={direction} />
            </div>
            <p className={styles.sectionIntro}>{services.intro}</p>
          </RealEstateReveal>
          <RealEstateReveal className={styles.servicePathGrid} variant="up" stagger>
            {services.serviceAnchors.map((anchor, index) => (
              <Link
                className={styles.serviceCard}
                href={localePath(locale, CANONICAL_SERVICE_TARGETS[anchor.serviceId])}
                key={anchor.serviceId}
              >
                <span className={styles.serviceIndex}>{String(index + 1).padStart(2, '0')}</span>
                <h3>{anchor.label}</h3>
                <p>{copy.learnMore}</p>
                <ButtonArrows direction={direction} />
              </Link>
            ))}
          </RealEstateReveal>
          <div className={styles.relatedRow}>
            <span className={styles.relatedLabel}>{copy.relatedLabel}</span>
            <ul className={styles.relatedList}>
              {services.industryAnchors.map((anchor) => (
                <li key={anchor.industryId}>
                  <Link
                    className={styles.relatedLink}
                    href={localePath(locale, `/industries/${anchor.industryId}`)}
                  >
                    {anchor.label}
                    <Arrow aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* -------------------------------------------------- FAQ (accordion) */}
        <section className={`${styles.section} ${styles.sectionTint}`}>
          <RealEstateReveal className={styles.faqHeading} variant="up">
            <p className={styles.eyebrow}>{copy.faqEyebrow}</p>
            <RealEstateSplitHeading text={faq.title} dir={direction} />
            <p className={styles.sectionIntro}>{faq.intro}</p>
          </RealEstateReveal>
          <div className={styles.faqList}>
            {faq.items.map((item, index) => (
              <details
                className={styles.faqItem}
                name="real-estate-industry-faq"
                key={item.id}
                open={index === 0}
              >
                <summary>
                  <span className={styles.faqIndex}>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item.question}</strong>
                  <ChevronDown className={styles.faqChevron} aria-hidden="true" />
                </summary>
                <div className={styles.faqAnswer}>
                  <p>{item.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ---------------------------------------- CTA band (WhatsApp) */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaBand}>
            <div className={styles.ctaCopy}>
              <p className={styles.eyebrowLight}>{copy.ctaEyebrow}</p>
              <RealEstateSplitHeading text={copy.ctaTitle} dir={direction} className={styles.onDark} />
              <p className={styles.ctaSubtitle}>{copy.ctaSubtitle}</p>
              <a className={`${styles.button} ${styles.buttonLight}`} href={whatsappHref}>
                <MessageCircle aria-hidden="true" />
                <span>{copy.ctaButton}</span>
                <ButtonArrows direction={direction} />
              </a>
            </div>
            <div className={styles.ctaMedia} aria-hidden="true">
              <Image
                src="/images/industries/real-estate/cta_visual.png"
                alt=""
                width={714}
                height={420}
                sizes="(max-width: 991px) 80vw, 34vw"
              />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
