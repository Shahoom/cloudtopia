import Link from 'next/link'
import {
  ArrowUpLeft,
  ArrowUpRight,
  BarChart3,
  Briefcase,
  ChevronDown,
  Clock,
  FileStack,
  MessageCircle,
  ShieldCheck,
  Users,
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

import { ProfessionalServicesCounters } from './ProfessionalServicesCounters'
import { ProfessionalServicesGallery } from './ProfessionalServicesGallery'
import { ProfessionalServicesHero } from './ProfessionalServicesHero'
import { ProfessionalServicesModules } from './ProfessionalServicesModules'
import { ProfessionalServicesPieMetrics } from './ProfessionalServicesPieMetrics'
import { ProfessionalServicesReveal } from './ProfessionalServicesReveal'
import { ProfessionalServicesScrollZoomCta } from './ProfessionalServicesScrollZoomCta'
import { ProfessionalServicesTabs } from './ProfessionalServicesTabs'
import { professionalServicesLandingCopy } from './professional-services-content'
import styles from './professional-services-industry.module.css'

type ProfessionalServicesIndustryPageProps = {
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
    throw new Error(`Professional-services section ${id} must be a ${type}`)
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

const FEATURE_ICONS: readonly LucideIcon[] = [
  Briefcase,
  ShieldCheck,
  FileStack,
  Clock,
  Users,
  BarChart3,
]

export function ProfessionalServicesIndustryPage({
  locale,
  definition,
  seo,
  schema,
}: ProfessionalServicesIndustryPageProps) {
  const direction = localeDirection[locale]
  const page = definition.locales[locale]
  const copy = professionalServicesLandingCopy[locale]
  const services = sectionOf(page.sections, 'professional-services-service-paths', 'service-bridge')
  const faq = sectionOf(page.sections, 'professional-services-faq', 'faq')
  const whatsappHref = `/api/whatsapp?locale=${locale}`

  return (
    <div
      className={styles.page}
      dir={direction}
      data-industry="professional-services"
      data-template="showbiz-v1"
      data-world={definition.world.id}
      data-locale={locale}
      data-canonical={seo.canonical}
      data-indexable={seo.index ? 'true' : 'false'}
    >
      <a className={styles.skipLink} href="#professional-services-content">
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

      {/* ---------------------------------------- Hero (layered parallax) */}
      <section className={styles.hero} data-header-theme="dark">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>
              <Briefcase aria-hidden="true" />
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
              <a
                className={`${styles.button} ${styles.buttonSecondary}`}
                href="#professional-services-service-paths"
              >
                <span>{page.hero.secondaryCta.label}</span>
                <ArrowPair locale={locale} />
              </a>
            </div>
            <ul className={styles.heroTrust}>
              <li className={styles.heroTrustLabel} aria-hidden="true">
                {copy.heroTrustLabel}
              </li>
              {copy.heroTrust.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          <div className={styles.heroVisual}>
            <ProfessionalServicesHero
              slides={copy.heroSlides}
              direction={direction}
              timebarLabel={copy.heroTimebarLabel}
            />
          </div>
        </div>
      </section>

      <div id="professional-services-content" className={styles.content} tabIndex={-1}>
        {/* --------------------------------------- Features (6 capabilities) */}
        <section className={styles.section}>
          <ProfessionalServicesReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.featuresEyebrow}</p>
            <h2>{copy.featuresTitle}</h2>
            <p className={styles.sectionIntro}>{copy.featuresIntro}</p>
          </ProfessionalServicesReveal>
          <ProfessionalServicesReveal className={styles.featureGrid} variant="up" stagger>
            {copy.features.map((feature, index) => {
              const Icon = FEATURE_ICONS[index] ?? Briefcase
              return (
                <div className={styles.featureCard} key={feature.id}>
                  <span className={styles.featureIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{feature.title}</h3>
                  <p>{feature.subtitle}</p>
                </div>
              )
            })}
          </ProfessionalServicesReveal>
        </section>

        {/* ------------------------------------------- Approach (media + copy) */}
        <section className={`${styles.section} ${styles.sectionCream}`}>
          <ProfessionalServicesReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.approachEyebrow}</p>
            <h2>{copy.approachTitle}</h2>
            <p className={styles.sectionIntro}>{copy.approachIntro}</p>
          </ProfessionalServicesReveal>
          {copy.approach.map((block, index) => (
            <ProfessionalServicesReveal
              key={block.id}
              variant={index % 2 === 1 ? 'right' : 'left'}
            >
              <div className={styles.approachRow} data-flip={index % 2 === 1 ? 'true' : 'false'}>
                {/* TODO(imagery-pass): real explainer/office media goes here;
                    rendered as a designed labelled panel, not a placeholder box. */}
                <div
                  className={styles.approachMedia}
                  role="img"
                  aria-label={block.imageAlt}
                >
                  <span className={styles.approachMediaMark} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className={styles.approachCopy}>
                  <span className={styles.approachBadge}>{block.badge}</span>
                  <h3>{block.title}</h3>
                  <p>{block.body}</p>
                </div>
              </div>
            </ProfessionalServicesReveal>
          ))}
        </section>

        {/* ------------------------------------------------- Services grid */}
        <section className={styles.section}>
          <ProfessionalServicesReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.servicesEyebrow}</p>
            <h2>{copy.servicesTitle}</h2>
            <p className={styles.sectionIntro}>{copy.servicesIntro}</p>
          </ProfessionalServicesReveal>
          <ProfessionalServicesReveal className={styles.serviceGrid} variant="up" stagger>
            {copy.services.map((service, index) => (
              <div className={styles.serviceBox} key={service.id}>
                <span className={styles.serviceBoxNum} aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3>{service.title}</h3>
                <p>{service.subtitle}</p>
              </div>
            ))}
          </ProfessionalServicesReveal>
        </section>

        {/* -------------------------------- Capability proficiency (pie rings) */}
        <section className={`${styles.section} ${styles.sectionCream}`}>
          <ProfessionalServicesReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.metricsEyebrow}</p>
            <h2>{copy.metricsTitle}</h2>
            <p className={styles.sectionIntro}>{copy.metricsIntro}</p>
          </ProfessionalServicesReveal>
          <ProfessionalServicesPieMetrics
            metrics={copy.metrics}
            locale={locale}
            regionLabel={copy.metricsRegionLabel}
          />
          <p className={styles.metricsNote}>{copy.metricsNote}</p>
        </section>

        {/* ------------------------------------------ How we work (nav-tabs) */}
        <section className={styles.section}>
          <ProfessionalServicesReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.tabsEyebrow}</p>
            <h2>{copy.tabsTitle}</h2>
            <p className={styles.sectionIntro}>{copy.tabsIntro}</p>
          </ProfessionalServicesReveal>
          <ProfessionalServicesTabs
            tabs={copy.tabs}
            tabsLabel={copy.tabsLabel}
            direction={direction}
          />
        </section>

        {/* --------------------------- Example solution patterns (filterable) */}
        <section className={`${styles.section} ${styles.sectionCream}`}>
          <ProfessionalServicesReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.galleryEyebrow}</p>
            <h2>{copy.galleryTitle}</h2>
            <p className={styles.sectionIntro}>{copy.galleryIntro}</p>
          </ProfessionalServicesReveal>
          <ProfessionalServicesGallery
            filters={copy.galleryFilters}
            patterns={copy.patterns}
            allLabel={copy.galleryAllLabel}
            filterLabel={copy.galleryFilterLabel}
          />
        </section>

        {/* ------------------------------------ Impact stats (count-up band) */}
        <section className={styles.statsSection} data-header-theme="dark">
          <ProfessionalServicesCounters
            stats={copy.stats}
            locale={locale}
            caption={copy.statsLabel}
            note={copy.statsNote}
          />
        </section>

        {/* -------------------------------- Delivery modules (sequence band) */}
        <section className={styles.moduleSection}>
          <div className={styles.moduleInner}>
            <ProfessionalServicesReveal className={styles.moduleCopy} variant="up">
              <p className={styles.eyebrow}>{copy.modulesEyebrow}</p>
              <h2>{copy.modulesTitle}</h2>
              <p className={styles.sectionIntro}>{copy.modulesIntro}</p>
            </ProfessionalServicesReveal>
            <ProfessionalServicesModules
              steps={copy.modules}
              regionLabel={copy.modulesRegionLabel}
            />
          </div>
        </section>

        {/* ------------------------------ Service paths (repurposed grid) */}
        <section className={styles.section} id="professional-services-service-paths">
          <ProfessionalServicesReveal className={styles.sectionHeadingSplit} variant="up">
            <div>
              <p className={styles.eyebrow}>{copy.servicePathsEyebrow}</p>
              <h2>{services.title}</h2>
            </div>
            <p className={styles.sectionIntro}>{services.intro}</p>
          </ProfessionalServicesReveal>
          <ProfessionalServicesReveal className={styles.servicePathGrid} variant="up" stagger>
            {services.serviceAnchors.map((anchor, index) => (
              <Link
                className={styles.servicePathCard}
                href={localePath(locale, CANONICAL_SERVICE_TARGETS[anchor.serviceId])}
                key={anchor.serviceId}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                <h3>{anchor.label}</h3>
                <p>{copy.learnMore}</p>
                <ArrowPair locale={locale} />
              </Link>
            ))}
          </ProfessionalServicesReveal>
          <Link
            className={styles.contextualServiceLink}
            href={localePath(locale, CANONICAL_SERVICE_TARGETS['web-applications'])}
          >
            {copy.webAppAction}
            <ArrowPair locale={locale} />
          </Link>
        </section>

        {/* ------------------------------------------------- FAQ (accordion) */}
        <section className={`${styles.section} ${styles.faqSection} ${styles.sectionCream}`}>
          <ProfessionalServicesReveal className={styles.faqHeading} variant="up">
            <p className={styles.eyebrow}>{copy.faqEyebrow}</p>
            <h2>{faq.title}</h2>
            <p className={styles.sectionIntro}>{faq.intro}</p>
          </ProfessionalServicesReveal>
          <div className={styles.faqList}>
            {faq.items.map((item, index) => (
              <details
                className={styles.faqItem}
                name="professional-services-faq"
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

        {/* ----------------------------- Full-width CTA (scroll-zoom band) */}
        <ProfessionalServicesScrollZoomCta>
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
        </ProfessionalServicesScrollZoomCta>
      </div>
    </div>
  )
}
