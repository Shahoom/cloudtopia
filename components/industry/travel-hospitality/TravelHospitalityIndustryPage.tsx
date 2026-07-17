import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpLeft,
  ArrowUpRight,
  Building2,
  Cable,
  CalendarCheck,
  Check,
  ChevronDown,
  Cloud,
  CreditCard,
  Languages,
  Map,
  MessageCircle,
  ShieldCheck,
  Share2,
  Smartphone,
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

import { TravelCtaZoom } from './TravelCtaZoom'
import { TravelEngagementTabs } from './TravelEngagementTabs'
import { TravelHero } from './TravelHero'
import { TravelPartnerMarquee } from './TravelPartnerMarquee'
import { TravelReveal } from './TravelReveal'
import { TravelStatsRings } from './TravelStatsRings'
import { TravelVideoLightbox } from './TravelVideoLightbox'
import { travelHospitalityLandingCopy } from './travel-hospitality-content'
import styles from './travel-hospitality-industry.module.css'

type TravelHospitalityIndustryPageProps = {
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
    throw new Error(`Travel & hospitality section ${id} must be a ${type}`)
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

const CAP_ICONS = [
  CalendarCheck,
  Share2,
  Building2,
  Map,
  Smartphone,
  CreditCard,
] as const

const PILLAR_ICONS = [ShieldCheck, Cloud, Cable, Languages] as const

export function TravelHospitalityIndustryPage({
  locale,
  definition,
  seo,
  schema,
}: TravelHospitalityIndustryPageProps) {
  const direction = localeDirection[locale]
  const page = definition.locales[locale]
  const copy = travelHospitalityLandingCopy[locale]
  const services = sectionOf(page.sections, 'travel-service-paths', 'service-bridge')
  const faq = sectionOf(page.sections, 'travel-faq', 'faq')
  const whatsappHref = `/api/whatsapp?locale=${locale}`
  const webAppHref = localePath(locale, CANONICAL_SERVICE_TARGETS['web-applications'])

  return (
    <div
      className={styles.page}
      dir={direction}
      data-travel-template="travelite-v1"
      data-industry="travel-hospitality"
      data-world={definition.world.id}
      data-locale={locale}
      data-canonical={seo.canonical}
      data-indexable={seo.index ? 'true' : 'false'}
    >
      <a className={styles.skipLink} href="#travel-industry-content">
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

      {/* -------------------------------------- Hero (layered parallax) */}
      <TravelHero
        locale={locale}
        direction={direction}
        kicker={copy.heroKicker}
        h1={page.hero.h1}
        intro={page.hero.intro}
        primaryLabel={page.hero.primaryCta.label}
        primaryHref={whatsappHref}
        secondaryLabel={copy.heroSecondaryCta}
        secondaryHref="#travel-service-paths"
        trustLabel={copy.heroTrustLabel}
        trust={copy.heroTrust}
        bgSrc="/images/industries/travel-hospitality/hero_bg.jpg"
        bgAlt={copy.heroBgAlt}
        cards={[
          {
            src: '/images/industries/travel-hospitality/hero_card_1.jpg',
            alt: copy.heroCardAlts[0],
            width: 370,
            height: 297,
          },
          {
            src: '/images/industries/travel-hospitality/hero_card_2.jpg',
            alt: copy.heroCardAlts[1],
            width: 370,
            height: 297,
          },
          {
            src: '/images/industries/travel-hospitality/hero_card_3.jpg',
            alt: copy.heroCardAlts[2],
            width: 370,
            height: 297,
          },
        ]}
      />

      <div id="travel-industry-content" className={styles.content} tabIndex={-1}>
        {/* ------------------------------ Animated capability stats band */}
        <section className={styles.statsSection}>
          <TravelStatsRings
            stats={copy.stats}
            locale={locale}
            caption={copy.statsLabel}
            note={copy.statsNote}
            regionLabel={copy.statsRegionLabel}
          />
        </section>

        {/* ----------------------- Capabilities grid (icon hover overlay) */}
        <section className={`${styles.section} ${styles.sectionTint}`}>
          <TravelReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.capsEyebrow}</p>
            <h2>{copy.capsTitle}</h2>
            <p className={styles.sectionIntro}>{copy.capsIntro}</p>
          </TravelReveal>
          <TravelReveal className={styles.capsGrid} variant="up" stagger>
            {copy.capabilities.map((cap, index) => {
              const Icon = CAP_ICONS[index] ?? CalendarCheck
              return (
                <div className={styles.capCard} key={cap.id}>
                  <span className={styles.capIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{cap.title}</h3>
                  <div className={styles.capOverlay}>
                    <p>{cap.subtitle}</p>
                  </div>
                </div>
              )
            })}
          </TravelReveal>
        </section>

        {/* --------------------------- Why-build pillars (circular icons) */}
        <section className={styles.section}>
          <TravelReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.pillarsEyebrow}</p>
            <h2>{copy.pillarsTitle}</h2>
            <p className={styles.sectionIntro}>{copy.pillarsIntro}</p>
          </TravelReveal>
          <TravelReveal className={styles.pillarsRow} variant="up" stagger>
            {copy.pillars.map((pillar, index) => {
              const Icon = PILLAR_ICONS[index] ?? ShieldCheck
              return (
                <div className={styles.pillar} key={pillar.id}>
                  <span className={styles.pillarIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.subtitle}</p>
                </div>
              )
            })}
          </TravelReveal>
        </section>

        {/* -------------------- Solution modules (hover-card image grid) */}
        <section className={`${styles.section} ${styles.sectionTint}`}>
          <TravelReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.solutionsEyebrow}</p>
            <h2>{copy.solutionsTitle}</h2>
            <p className={styles.sectionIntro}>{copy.solutionsIntro}</p>
          </TravelReveal>
          <TravelReveal className={styles.offerGrid} variant="up" stagger>
            {copy.solutions.map((solution) => (
              <div className={styles.offerCard} key={solution.id}>
                <div className={styles.offerMedia}>
                  <Image
                    src={solution.image}
                    alt={solution.imageAlt}
                    width={solution.width}
                    height={solution.height}
                    sizes="(max-width: 767px) 90vw, (max-width: 991px) 45vw, 23vw"
                  />
                  <span className={styles.offerWash} aria-hidden="true" />
                  <span className={styles.offerTag}>{solution.tag}</span>
                  <Link className={styles.offerBtn} href={webAppHref}>
                    {copy.learnMore}
                    <ArrowPair locale={locale} />
                  </Link>
                </div>
                <div className={styles.offerBody}>
                  <h3>{solution.title}</h3>
                  <p>{solution.subtitle}</p>
                </div>
              </div>
            ))}
          </TravelReveal>
          <Link className={styles.contextualServiceLink} href={webAppHref}>
            {copy.solutionsAction}
            <ArrowPair locale={locale} />
          </Link>
        </section>

        {/* ----------------------- Split "why partner" + video lightbox */}
        <section className={styles.bandSection} data-header-theme="dark">
          <div className={styles.bandInner}>
            <TravelReveal className={styles.bandCopy} variant="left">
              <p className={styles.eyebrowLight}>{copy.bandEyebrow}</p>
              <h2>{copy.bandTitle}</h2>
              <p className={styles.bandIntro}>{copy.bandIntro}</p>
              <ul className={styles.bandPoints}>
                {copy.bandPoints.map((point) => (
                  <li className={styles.bandPoint} key={point.id}>
                    <span className={styles.bandPointIcon} aria-hidden="true">
                      <Check />
                    </span>
                    <div>
                      <h3>{point.title}</h3>
                      <p>{point.subtitle}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </TravelReveal>
            <TravelReveal className={styles.bandMedia} variant="right">
              <TravelVideoLightbox
                posterSrc="/images/industries/travel-hospitality/video_poster.jpg"
                posterAlt={copy.bandVideoPosterAlt}
                posterWidth={800}
                posterHeight={465}
                watchLabel={copy.bandWatchLabel}
                modalTitle={copy.bandModalTitle}
                modalIntro={copy.bandModalIntro}
                closeLabel={copy.bandModalClose}
                steps={copy.bandWalkSteps}
              />
            </TravelReveal>
          </div>
        </section>

        {/* --------------- Reference patterns grid (slide-up captions) */}
        <section className={styles.section}>
          <TravelReveal className={styles.sectionHeadingSplit} variant="up">
            <div>
              <p className={styles.eyebrow}>{copy.patternsEyebrow}</p>
              <h2>{copy.patternsTitle}</h2>
            </div>
            <p className={styles.sectionIntro}>{copy.patternsIntro}</p>
          </TravelReveal>
          <TravelReveal className={styles.destGrid} variant="up" stagger>
            {copy.patterns.map((pattern) => (
              <div className={styles.destCard} key={pattern.id}>
                <Image
                  src={pattern.image}
                  alt={pattern.imageAlt}
                  width={pattern.width}
                  height={pattern.height}
                  sizes="(max-width: 767px) 90vw, (max-width: 991px) 45vw, 23vw"
                />
                <div className={styles.destCaption}>
                  <div className={styles.destCaptionMain}>
                    <h3>{pattern.title}</h3>
                    <span>{pattern.meta}</span>
                  </div>
                  <span className={styles.destChip}>{pattern.chip}</span>
                </div>
              </div>
            ))}
          </TravelReveal>
        </section>

        {/* ------------------------- Approach story + values checklist */}
        <section className={`${styles.section} ${styles.sectionTint}`}>
          <div className={styles.storyRow}>
            <TravelReveal className={styles.storyMedia} variant="left">
              <Image
                src="/images/industries/travel-hospitality/approach_engineering.jpg"
                alt={copy.storyImageAlt}
                width={770}
                height={500}
                sizes="(max-width: 991px) 92vw, 46vw"
              />
            </TravelReveal>
            <TravelReveal className={styles.storyCopy} variant="right">
              <p className={styles.eyebrow}>{copy.storyEyebrow}</p>
              <h2>{copy.storyTitle}</h2>
              <p className={styles.sectionIntro}>{copy.storyBody}</p>
              <p className={styles.storyValuesLabel}>{copy.storyValuesLabel}</p>
              <ul className={styles.checkList}>
                {copy.storyValues.map((value) => (
                  <li key={value}>
                    <span className={styles.checkIcon} aria-hidden="true">
                      <Check />
                    </span>
                    {value}
                  </li>
                ))}
              </ul>
            </TravelReveal>
          </div>
        </section>

        {/* ---------------------------------- Engagement model tabs */}
        <section className={styles.section}>
          <TravelReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.engagementEyebrow}</p>
            <h2>{copy.engagementTitle}</h2>
            <p className={styles.sectionIntro}>{copy.engagementIntro}</p>
          </TravelReveal>
          <TravelEngagementTabs
            projectLabel={copy.engagementTabProject}
            retainerLabel={copy.engagementTabRetainer}
            projectPlans={copy.engagementProject}
            retainerPlans={copy.engagementRetainer}
            tabsLabel={copy.engagementTabsLabel}
            ctaLabel={copy.engagementCta}
            whatsappHref={whatsappHref}
            direction={direction}
          />
          <p className={styles.pricingFootnote}>{copy.engagementFootnote}</p>
        </section>

        {/* ------------------- Service paths (service-bridge link cards) */}
        <section className={`${styles.section} ${styles.sectionTint}`} id="travel-service-paths">
          <TravelReveal className={styles.sectionHeadingSplit} variant="up">
            <div>
              <p className={styles.eyebrow}>{copy.servicePathsEyebrow}</p>
              <h2>{services.title}</h2>
            </div>
            <p className={styles.sectionIntro}>{services.intro}</p>
          </TravelReveal>
          <TravelReveal className={styles.servicePathGrid} variant="up" stagger>
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
          </TravelReveal>
          <Link className={styles.contextualServiceLink} href={webAppHref}>
            {copy.webAppAction}
            <ArrowPair locale={locale} />
          </Link>
        </section>

        {/* -------------------------- Integration marquee (auto-scroll) */}
        <section className={`${styles.section} ${styles.marqueeSection}`}>
          <TravelReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.partnersEyebrow}</p>
            <h2>{copy.partnersTitle}</h2>
          </TravelReveal>
          <TravelPartnerMarquee items={copy.partners} regionLabel={copy.partnersRegionLabel} />
        </section>

        {/* ------------------------------------------------- FAQ (grid) */}
        <section className={`${styles.section} ${styles.faqSection} ${styles.sectionTint}`}>
          <TravelReveal className={styles.faqHeading} variant="up">
            <p className={styles.eyebrow}>{copy.faqEyebrow}</p>
            <h2>{faq.title}</h2>
            <p className={styles.sectionIntro}>{faq.intro}</p>
          </TravelReveal>
          <div className={styles.faqList}>
            {faq.items.map((item, index) => (
              <details
                className={styles.faqItem}
                name="travel-industry-faq"
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

        {/* ---------------------------- Closing CTA (scroll-zoom band) */}
        <TravelCtaZoom>
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
        </TravelCtaZoom>
      </div>
    </div>
  )
}
