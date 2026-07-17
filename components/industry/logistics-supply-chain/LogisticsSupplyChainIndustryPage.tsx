import Link from 'next/link'
import {
  ArrowUpLeft,
  ArrowUpRight,
  Boxes,
  Check,
  ChevronDown,
  MessageCircle,
  PackageSearch,
  Radar,
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

import { LogisticsCounters } from './LogisticsCounters'
import { LogisticsFootprintMap } from './LogisticsFootprintMap'
import { LogisticsMagneticButton } from './LogisticsMagneticButton'
import { LogisticsParallaxScene } from './LogisticsParallaxScene'
import { LogisticsPricingTabs } from './LogisticsPricingTabs'
import { LogisticsRadialProgress } from './LogisticsRadialProgress'
import { LogisticsReveal } from './LogisticsReveal'
import { LogisticsServiceTabs } from './LogisticsServiceTabs'
import { LogisticsSplitHeading } from './LogisticsSplitHeading'
import { LogisticsWorkflow } from './LogisticsWorkflow'
import { LOGISTICS_ICONS } from './logistics-icons'
import { logisticsLandingCopy } from './logistics-supply-chain-content'
import styles from './logistics-supply-chain-industry.module.css'

type LogisticsSupplyChainIndustryPageProps = {
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
    throw new Error(`Logistics section ${id} must be a ${type}`)
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

export function LogisticsSupplyChainIndustryPage({
  locale,
  definition,
  seo,
  schema,
}: LogisticsSupplyChainIndustryPageProps) {
  const direction = localeDirection[locale]
  const page = definition.locales[locale]
  const copy = logisticsLandingCopy[locale]
  const services = sectionOf(page.sections, 'logistics-service-paths', 'service-bridge')
  const faq = sectionOf(page.sections, 'logistics-faq', 'faq')
  const whatsappHref = `/api/whatsapp?locale=${locale}`

  return (
    <div
      className={styles.page}
      dir={direction}
      data-logistics-template="logistick-v1"
      data-industry="logistics-supply-chain"
      data-world={definition.world.id}
      data-locale={locale}
      data-canonical={seo.canonical}
      data-indexable={seo.index ? 'true' : 'false'}
    >
      <a className={styles.skipLink} href="#logistics-industry-content">
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

      {/* ------------------------------------------------- Hero (parallax) */}
      <section className={styles.hero} data-header-theme="dark">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow}>
              <Radar aria-hidden="true" />
              {copy.heroKicker}
            </p>
            <LogisticsSplitHeading as="h1" className={styles.heroTitle} text={page.hero.h1} />
            <p className={styles.heroIntro}>{page.hero.intro}</p>
            <div className={styles.heroActions}>
              <LogisticsMagneticButton href={whatsappHref} className={styles.buttonPrimary}>
                <MessageCircle aria-hidden="true" />
                <span>{page.hero.primaryCta.label}</span>
                <ArrowPair locale={locale} />
              </LogisticsMagneticButton>
              <a className={`${styles.button} ${styles.buttonSecondary}`} href="#logistics-service-paths">
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
            <LogisticsParallaxScene
              direction={direction}
              panelLabel={copy.heroPanelLabel}
              summary={copy.heroPanelSummary}
              stages={page.hero.sceneStages}
            />
          </div>
        </div>
      </section>

      <div id="logistics-industry-content" className={styles.content} tabIndex={-1}>
        {/* --------------------------------------- Capability pillars 01–04 */}
        <section className={styles.section}>
          <LogisticsReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.pillarsEyebrow}</p>
            <LogisticsSplitHeading text={copy.pillarsTitle} />
            <p className={styles.sectionIntro}>{copy.pillarsIntro}</p>
          </LogisticsReveal>
          <LogisticsReveal className={styles.pillarGrid} variant="up" stagger>
            {copy.pillars.map((pillar) => {
              const Icon = LOGISTICS_ICONS[pillar.icon]
              return (
                <div className={styles.pillarCard} key={pillar.id}>
                  <span className={styles.pillarIndex} aria-hidden="true">
                    {pillar.index}
                  </span>
                  <span className={styles.pillarIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{pillar.title}</h3>
                  <p>{pillar.subtitle}</p>
                </div>
              )
            })}
          </LogisticsReveal>
        </section>

        {/* --------------------------------------------- About / expertise */}
        <section className={`${styles.section} ${styles.sectionGray}`}>
          <div className={styles.aboutRow}>
            <LogisticsReveal className={styles.aboutMedia} variant="left">
              <div className={styles.aboutPanel}>
                <p className={styles.aboutPanelLabel}>{copy.aboutPanelLabel}</p>
                <ol className={styles.aboutTrack}>
                  {copy.aboutPanelStatuses.map((status) => (
                    <li className={styles.aboutTrackItem} data-done={status.done ? 'true' : 'false'} key={status.id}>
                      <span className={styles.aboutTrackDot} aria-hidden="true">
                        {status.done ? <Check /> : null}
                      </span>
                      <span className={styles.aboutTrackLabel}>{status.label}</span>
                      <span className={styles.aboutTrackState}>{status.state}</span>
                    </li>
                  ))}
                </ol>
                <div className={styles.aboutBadge}>
                  <span className={styles.aboutBadgeValue}>{copy.aboutBadgeValue}</span>
                  <span className={styles.aboutBadgeLabel}>{copy.aboutBadgeLabel}</span>
                </div>
              </div>
            </LogisticsReveal>
            <LogisticsReveal className={styles.aboutCopy} variant="right">
              <p className={styles.eyebrow}>{copy.aboutEyebrow}</p>
              <LogisticsSplitHeading text={copy.aboutTitle} />
              <p className={styles.aboutLead}>{copy.aboutLead}</p>
              <div className={styles.aboutSubFeatures}>
                {copy.aboutSubFeatures.map((feature) => {
                  const Icon = LOGISTICS_ICONS[feature.icon]
                  return (
                    <div className={styles.aboutSubFeature} key={feature.id}>
                      <span className={styles.aboutSubIcon} aria-hidden="true">
                        <Icon />
                      </span>
                      <div>
                        <h3>{feature.title}</h3>
                        <p>{feature.subtitle}</p>
                      </div>
                    </div>
                  )
                })}
              </div>
              <ul className={styles.aboutChecklist}>
                {copy.aboutChecklist.map((item) => (
                  <li key={item}>
                    <span className={styles.aboutCheck} aria-hidden="true">
                      <Check />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <a className={`${styles.button} ${styles.buttonPrimary}`} href={whatsappHref}>
                <MessageCircle aria-hidden="true" />
                <span>{copy.aboutCta}</span>
                <ArrowPair locale={locale} />
              </a>
            </LogisticsReveal>
          </div>
        </section>

        {/* -------------------------------------- Service domain tabs (dark) */}
        <section className={styles.domainSection} data-header-theme="dark">
          <div className={styles.domainInner}>
            <LogisticsReveal className={styles.sectionHeadingCentered} variant="up">
              <p className={styles.eyebrowLight}>{copy.domainsEyebrow}</p>
              <LogisticsSplitHeading className={styles.headingLight} text={copy.domainsTitle} />
              <p className={styles.sectionIntroLight}>{copy.domainsIntro}</p>
            </LogisticsReveal>
            <LogisticsServiceTabs
              domains={copy.domains}
              tabsLabel={copy.domainsTabsLabel}
              leadLabel={copy.domainsLeadLabel}
              direction={direction}
            />
          </div>
        </section>

        {/* ------------------------------------ Stats + radial progress */}
        <section className={styles.section}>
          <div className={styles.metricsRow}>
            <LogisticsReveal variant="left" className={styles.metricsRadial}>
              <LogisticsRadialProgress
                radials={copy.radials}
                locale={locale}
                caption={copy.radialsLabel}
                note={copy.radialsNote}
              />
            </LogisticsReveal>
            <LogisticsReveal variant="right" className={styles.metricsStats}>
              <LogisticsCounters
                stats={copy.stats}
                locale={locale}
                caption={copy.statsLabel}
                note={copy.statsNote}
              />
            </LogisticsReveal>
          </div>
        </section>

        {/* ------------------------------- Workflow (delivery methodology) */}
        <section className={styles.workflowSection} data-header-theme="dark">
          <div className={styles.workflowInner}>
            <LogisticsReveal className={styles.workflowCopy} variant="up">
              <p className={styles.eyebrowLight}>{copy.workflowEyebrow}</p>
              <LogisticsSplitHeading className={styles.headingLight} text={copy.workflowTitle} />
              <p>{copy.workflowIntro}</p>
            </LogisticsReveal>
            <LogisticsWorkflow steps={copy.steps} regionLabel={copy.workflowRegionLabel} />
          </div>
        </section>

        {/* --------------------------------- Why choose (values + guarantees) */}
        <section className={styles.section}>
          <LogisticsReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.valuesEyebrow}</p>
            <LogisticsSplitHeading text={copy.valuesTitle} />
            <p className={styles.sectionIntro}>{copy.valuesIntro}</p>
          </LogisticsReveal>
          <LogisticsReveal className={styles.valuesGrid} variant="up" stagger>
            {copy.values.map((value) => {
              const Icon = LOGISTICS_ICONS[value.icon]
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
          </LogisticsReveal>

          <LogisticsReveal className={styles.guaranteeRow} variant="up" stagger>
            {copy.guarantees.map((guarantee) => {
              const Icon = LOGISTICS_ICONS[guarantee.icon]
              return (
                <div className={styles.guaranteeItem} key={guarantee.id}>
                  <span className={styles.guaranteeIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <div>
                    <h3>{guarantee.title}</h3>
                    <p>{guarantee.subtitle}</p>
                  </div>
                </div>
              )
            })}
          </LogisticsReveal>
        </section>

        {/* --------------------------- Visibility showcase (illustrative UI) */}
        <section className={styles.showcaseSection} data-header-theme="dark">
          <div className={styles.showcaseInner}>
            <LogisticsReveal className={styles.showcaseCopy} variant="left">
              <p className={styles.eyebrowLight}>{copy.showcaseEyebrow}</p>
              <LogisticsSplitHeading className={styles.headingLight} text={copy.showcaseTitle} />
              <p className={styles.showcaseIntro}>{copy.showcaseIntro}</p>
              <ul className={styles.showcaseList}>
                {copy.showcaseCapabilities.map((capability) => {
                  const Icon = LOGISTICS_ICONS[capability.icon]
                  return (
                    <li key={capability.id}>
                      <span className={styles.showcaseListIcon} aria-hidden="true">
                        <Icon />
                      </span>
                      <div>
                        <h3>{capability.title}</h3>
                        <p>{capability.subtitle}</p>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </LogisticsReveal>

            <LogisticsReveal className={styles.showcaseMedia} variant="right">
              <div className={styles.trackCard} role="group" aria-label={copy.showcasePanelLabel}>
                <div className={styles.trackCardHead}>
                  <span className={styles.trackCardBadge}>
                    <PackageSearch aria-hidden="true" />
                    {copy.showcasePanelLabel}
                  </span>
                </div>
                <div className={styles.trackCardMeta}>
                  <div>
                    <span className={styles.trackMetaLabel}>{copy.showcaseShipmentLabel}</span>
                    <span className={styles.trackMetaValue} dir="ltr">{copy.showcaseShipmentId}</span>
                  </div>
                  <div>
                    <span className={styles.trackMetaLabel}>{copy.showcaseEtaLabel}</span>
                    <span className={styles.trackMetaValue}>{copy.showcaseEtaValue}</span>
                  </div>
                </div>
                <ol className={styles.trackTimeline}>
                  {copy.showcaseStatuses.map((status) => (
                    <li className={styles.trackStep} data-done={status.done ? 'true' : 'false'} key={status.id}>
                      <span className={styles.trackStepDot} aria-hidden="true">
                        {status.done ? <Check /> : <Boxes />}
                      </span>
                      <span className={styles.trackStepLabel}>{status.label}</span>
                      <span className={styles.trackStepState}>{status.state}</span>
                    </li>
                  ))}
                </ol>
                <p className={styles.trackNote}>{copy.showcaseNote}</p>
              </div>
            </LogisticsReveal>
          </div>
        </section>

        {/* ------------------------------ Pricing / engagement model tabs */}
        <section className={`${styles.section} ${styles.pricingSection} ${styles.sectionGray}`}>
          <LogisticsReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.pricingEyebrow}</p>
            <LogisticsSplitHeading text={copy.pricingTitle} />
            <p className={styles.sectionIntro}>{copy.pricingIntro}</p>
          </LogisticsReveal>
          <LogisticsPricingTabs
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

        {/* ------------------------------------------- Marquee keyword band */}
        <section className={styles.marqueeSection} aria-label={copy.marqueeLabel}>
          <div className={styles.marqueeTrack}>
            {[0, 1].map((copyIndex) => (
              <ul className={styles.marqueeGroup} aria-hidden={copyIndex === 1} key={copyIndex}>
                {copy.marqueeWords.map((word) => (
                  <li className={styles.marqueeItem} key={`${copyIndex}-${word}`}>
                    <span className={styles.marqueeDot} aria-hidden="true" />
                    {word}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </section>

        {/* ------------------ Service paths (repurposed service-bridge) */}
        <section className={styles.section} id="logistics-service-paths">
          <LogisticsReveal className={styles.sectionHeadingSplit} variant="up">
            <div>
              <p className={styles.eyebrow}>{copy.servicePathsEyebrow}</p>
              <LogisticsSplitHeading text={services.title} />
            </div>
            <p className={styles.sectionIntro}>{services.intro}</p>
          </LogisticsReveal>
          <LogisticsReveal className={styles.servicePathGrid} variant="up" stagger>
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
          </LogisticsReveal>
          <Link
            className={styles.contextualServiceLink}
            href={localePath(locale, CANONICAL_SERVICE_TARGETS['business-systems-development'])}
          >
            {copy.contextualAction}
            <ArrowPair locale={locale} />
          </Link>
        </section>

        {/* ----------------------------- Footprint map + contact */}
        <section className={`${styles.section} ${styles.sectionGray}`}>
          <div className={styles.mapRow}>
            <LogisticsReveal className={styles.mapCopy} variant="left">
              <p className={styles.eyebrow}>{copy.mapEyebrow}</p>
              <LogisticsSplitHeading text={copy.mapTitle} />
              <p className={styles.sectionIntro}>{copy.mapIntro}</p>
              <div className={styles.mapContact}>
                <span className={styles.mapContactLabel}>{copy.mapContactLabel}</span>
                <h3>{copy.mapContactTitle}</h3>
                <p>{copy.mapContactBody}</p>
                <a className={`${styles.button} ${styles.buttonPrimary}`} href={whatsappHref}>
                  <MessageCircle aria-hidden="true" />
                  <span>{copy.mapContactCta}</span>
                  <ArrowPair locale={locale} />
                </a>
              </div>
            </LogisticsReveal>
            <LogisticsReveal className={styles.mapMedia} variant="right">
              <LogisticsFootprintMap regions={copy.regions} canvasLabel={copy.mapCanvasLabel} />
            </LogisticsReveal>
          </div>
        </section>

        {/* ------------------------------------------------- FAQ (grid) */}
        <section className={`${styles.section} ${styles.faqSection}`}>
          <LogisticsReveal className={styles.faqHeading} variant="up">
            <p className={styles.eyebrow}>{copy.faqEyebrow}</p>
            <LogisticsSplitHeading text={faq.title} />
            <p className={styles.sectionIntro}>{faq.intro}</p>
          </LogisticsReveal>
          <div className={styles.faqList}>
            {faq.items.map((item, index) => (
              <details
                className={styles.faqItem}
                name="logistics-industry-faq"
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

        {/* ---------------------------- Contact CTA split (navy + red) */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaSplit}>
            <div className={`${styles.ctaPanel} ${styles.ctaPanelPrimary}`}>
              <p className={styles.eyebrowLight}>{copy.ctaEyebrow}</p>
              <LogisticsSplitHeading className={styles.headingLight} text={copy.ctaTitle} />
              <p>{copy.ctaSubtitle}</p>
              <LogisticsMagneticButton href={whatsappHref} className={styles.buttonLight}>
                <MessageCircle aria-hidden="true" />
                <span>{copy.ctaButton}</span>
                <ArrowPair locale={locale} />
              </LogisticsMagneticButton>
            </div>
            <div className={`${styles.ctaPanel} ${styles.ctaPanelAccent}`}>
              <span className={styles.ctaAccentIcon} aria-hidden="true">
                <MessageCircle />
              </span>
              <h2 className={styles.headingLight}>{copy.ctaSecondaryTitle}</h2>
              <p>{copy.ctaSecondaryNote}</p>
              <a className={`${styles.button} ${styles.buttonLight}`} href={whatsappHref}>
                <span>{copy.ctaSecondaryButton}</span>
                <ArrowPair locale={locale} />
              </a>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
