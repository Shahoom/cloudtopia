import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpLeft,
  ArrowUpRight,
  BookOpenCheck,
  Check,
  ChevronDown,
  GraduationCap,
  Layers,
  Languages,
  MessageCircle,
  Workflow,
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

import { EducationCount } from './EducationCount'
import { EducationHero } from './EducationHero'
import { EducationPricingTabs } from './EducationPricingTabs'
import { EducationReveal } from './EducationReveal'
import { EducationSolutionsSlider } from './EducationSolutionsSlider'
import { EducationTopicGrid } from './EducationTopicGrid'
import { educationLandingCopy, type EducationStatCard } from './education-content'
import styles from './education-industry.module.css'

type EducationIndustryPageProps = {
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
    throw new Error(`Education section ${id} must be a ${type}`)
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

const STAT_ICONS = [Languages, Layers, Workflow, Check] as const

export function EducationIndustryPage({
  locale,
  definition,
  seo,
  schema,
}: EducationIndustryPageProps) {
  const direction = localeDirection[locale]
  const page = definition.locales[locale]
  const copy = educationLandingCopy[locale]
  const services = sectionOf(page.sections, 'education-service-paths', 'service-bridge')
  const faq = sectionOf(page.sections, 'education-faq', 'faq')
  const whatsappHref = `/api/whatsapp?locale=${locale}`

  return (
    <div
      className={styles.page}
      dir={direction}
      data-education-template="learnit-v1"
      data-industry="education"
      data-world={definition.world.id}
      data-locale={locale}
      data-canonical={seo.canonical}
      data-indexable={seo.index ? 'true' : 'false'}
    >
      <a className={styles.skipLink} href="#education-industry-content">
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

      {/* ------------------------------------------------------------- Hero */}
      <section className={styles.hero} data-education-hero>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>
              <GraduationCap aria-hidden="true" />
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
              <a className={`${styles.button} ${styles.buttonSecondary}`} href="#education-service-paths">
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
            <EducationHero
              locale={locale}
              statCards={copy.heroStatCards}
              photoAlt={copy.heroPhotoAlt}
            />
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- Brand marquee */}
      <section className={styles.marquee} aria-label={copy.marqueeLabel}>
        <div className={styles.marqueeViewport}>
          <ul className={styles.marqueeTrack}>
            {copy.marqueeItems.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <ul className={styles.marqueeTrack} aria-hidden="true">
            {copy.marqueeItems.map((item) => (
              <li key={`dup-${item}`}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <div id="education-industry-content" className={styles.content} tabIndex={-1}>
        {/* --------------------------------------------------------- About */}
        <section className={styles.section}>
          <div className={styles.aboutRow}>
            <EducationReveal className={styles.aboutMediaWrap} variant="left">
              {/* Licensed stock photographs — the classroom, and students working together in it. */}
              <div className={styles.aboutMedia}>
                <div className={`${styles.aboutPhoto} ${styles.aboutPhotoMain}`}>
                  <Image
                    className={styles.aboutPhotoImg}
                    src="/images/industries/education/education-2.jpg"
                    alt={copy.aboutPhotoMainAlt}
                    width={1800}
                    height={1200}
                    sizes="(max-width: 991px) 92vw, 34vw"
                  />
                </div>
                <div className={`${styles.aboutPhoto} ${styles.aboutPhotoOffset}`}>
                  <Image
                    className={styles.aboutPhotoImg}
                    src="/images/industries/education/education-3.jpg"
                    alt={copy.aboutPhotoOffsetAlt}
                    width={1800}
                    height={1013}
                    sizes="(max-width: 991px) 84vw, 30vw"
                  />
                </div>
              </div>
              <div className={styles.aboutBadge}>
                <EducationCount
                  className={styles.aboutBadgeValue}
                  value={copy.aboutBadgeValue}
                  suffix={copy.aboutBadgeSuffix}
                  locale={locale}
                />
                <span className={styles.aboutBadgeLabel}>{copy.aboutBadgeLabel}</span>
              </div>
            </EducationReveal>

            <EducationReveal className={styles.aboutCopy} variant="up">
              <p className={styles.eyebrow}>{copy.aboutEyebrow}</p>
              <h2>{copy.aboutTitle}</h2>
              <p className={styles.sectionIntro}>{copy.aboutBody}</p>
              <div className={styles.aboutFeatures}>
                {copy.aboutFeatures.map((feature) => (
                  <div className={styles.aboutFeatureCard} key={feature.id}>
                    <span className={styles.aboutFeatureIcon} aria-hidden="true">
                      <BookOpenCheck />
                    </span>
                    <div>
                      <h3>{feature.title}</h3>
                      <p>{feature.subtitle}</p>
                    </div>
                  </div>
                ))}
              </div>
              <a className={`${styles.button} ${styles.buttonPrimary}`} href={whatsappHref}>
                <MessageCircle aria-hidden="true" />
                <span>{page.hero.primaryCta.label}</span>
                <ArrowPair locale={locale} />
              </a>
            </EducationReveal>
          </div>
        </section>

        {/* ----------------------------------------- Capability domains grid */}
        <section className={`${styles.section} ${styles.sectionGray}`}>
          <EducationReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.topicsEyebrow}</p>
            <h2>{copy.topicsTitle}</h2>
            <p className={styles.sectionIntro}>{copy.topicsIntro}</p>
          </EducationReveal>
          <EducationReveal variant="up">
            <EducationTopicGrid topics={copy.topics} />
          </EducationReveal>
        </section>

        {/* -------------------------------------------- Solution patterns */}
        <section className={styles.section}>
          <EducationReveal className={styles.sectionHeadingSplit} variant="up">
            <div>
              <p className={styles.eyebrow}>{copy.solutionsEyebrow}</p>
              <h2>{copy.solutionsTitle}</h2>
            </div>
            <p className={styles.sectionIntro}>{copy.solutionsIntro}</p>
          </EducationReveal>
          <EducationReveal variant="up">
            <EducationSolutionsSlider
              solutions={copy.solutions}
              includesLabel={copy.solutionsIncludesLabel}
              prevLabel={copy.solutionsPrev}
              nextLabel={copy.solutionsNext}
              direction={direction}
              locale={locale}
            />
          </EducationReveal>
        </section>

        {/* ------------------------------------------------- Fanfact stats */}
        <section className={styles.statsSection}>
          <EducationReveal className={styles.statsBand} variant="up" stagger>
            {(copy.stats as readonly EducationStatCard[]).map((stat, index) => {
              const Icon = STAT_ICONS[index] ?? Layers
              return (
                <div className={styles.statTile} key={stat.id}>
                  <span className={styles.statIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <EducationCount
                    className={styles.statValue}
                    value={stat.value}
                    suffix={stat.suffix}
                    locale={locale}
                  />
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              )
            })}
          </EducationReveal>
          <p className={styles.statsNote}>{copy.statsNote}</p>
        </section>

        {/* --------------------------------------------- Platform preview */}
        <section className={styles.previewSection} data-header-theme="dark">
          {/* Licensed stock photograph behind the band. The scrim after it is not
              decoration — it is what keeps this band's copy above AA once a photo
              is behind it. Worst-case ratios against the photo's brightest pixel,
              so they hold for every crop the band's height can produce:
              h2 10.5:1, intro 7.2:1, eyebrow 5.0:1, figcaption 5.2:1 (needs 4.5).
              Measured at the shipped crop: 12.4 / 8.4 / 6.6 / 5.4. Re-measure
              before weakening `.previewBackdropScrim` or swapping this photo. */}
          <Image
            className={styles.previewBackdrop}
            src="/images/industries/education/education-1.jpg"
            alt={copy.previewPhotoAlt}
            width={1800}
            height={1013}
            sizes="100vw"
          />
          <span className={styles.previewBackdropScrim} aria-hidden="true" />
          <div className={styles.previewInner}>
            <EducationReveal className={styles.previewCopy} variant="up">
              <p className={styles.eyebrowLight}>{copy.previewEyebrow}</p>
              <h2>{copy.previewTitle}</h2>
              <p>{copy.previewIntro}</p>
            </EducationReveal>
            <EducationReveal className={styles.previewFrameWrap} variant="up">
              <figure className={styles.previewFigure}>
                <div className={styles.previewFrame} aria-hidden="true">
                  <span className={styles.previewPulse} />
                  <div className={styles.previewScreen}>
                    <div className={styles.previewScreenBar}>
                      <span /><span /><span />
                    </div>
                    <div className={styles.previewScreenBody}>
                      {copy.previewMockLabels.map((label) => (
                        <div className={styles.previewStat} key={label}>
                          <span className={styles.previewStatDot} />
                          <span className={styles.previewStatLabel}>{label}</span>
                          <span className={styles.previewStatBar}>
                            <span />
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <figcaption className={styles.previewCaption}>{copy.previewCaption}</figcaption>
              </figure>
            </EducationReveal>
          </div>
        </section>

        {/* ------------------------------------------ Engagement models */}
        <section className={`${styles.section} ${styles.pricingSection} ${styles.sectionGray}`}>
          <EducationReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.pricingEyebrow}</p>
            <h2>{copy.pricingTitle}</h2>
            <p className={styles.sectionIntro}>{copy.pricingIntro}</p>
          </EducationReveal>
          <EducationPricingTabs
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

        {/* ---------------------------------------------- Service paths */}
        <section className={styles.section} id="education-service-paths">
          <EducationReveal className={styles.sectionHeadingSplit} variant="up">
            <div>
              <p className={styles.eyebrow}>{copy.servicePathsEyebrow}</p>
              <h2>{services.title}</h2>
            </div>
            <p className={styles.sectionIntro}>{services.intro}</p>
          </EducationReveal>
          <EducationReveal className={styles.servicePathGrid} variant="up" stagger>
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
          </EducationReveal>
          <Link
            className={styles.contextualServiceLink}
            href={localePath(locale, CANONICAL_SERVICE_TARGETS['web-applications'])}
          >
            {copy.educationWebAppAction}
            <ArrowPair locale={locale} />
          </Link>
        </section>

        {/* ------------------------------------------------------- FAQ */}
        <section className={`${styles.section} ${styles.faqSection}`}>
          <EducationReveal className={styles.faqHeading} variant="up">
            <p className={styles.eyebrow}>{copy.faqEyebrow}</p>
            <h2>{faq.title}</h2>
            <p className={styles.sectionIntro}>{faq.intro}</p>
          </EducationReveal>
          <div className={styles.faqList}>
            {faq.items.map((item, index) => (
              <details
                className={styles.faqItem}
                name="education-industry-faq"
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

        {/* ------------------------------------------------- Trial / CTA */}
        <section className={styles.ctaSection} data-header-theme="dark">
          <EducationReveal className={styles.ctaCard} variant="up">
            <p className={styles.eyebrowLight}>{copy.ctaEyebrow}</p>
            <h2>{copy.ctaTitle}</h2>
            <p>{copy.ctaSubtitle}</p>
            <a className={`${styles.button} ${styles.buttonLight}`} href={whatsappHref}>
              <MessageCircle aria-hidden="true" />
              <span>{copy.ctaButton}</span>
              <ArrowPair locale={locale} />
            </a>
          </EducationReveal>
        </section>
      </div>
    </div>
  )
}
