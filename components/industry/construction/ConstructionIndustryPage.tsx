import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpLeft,
  ArrowUpRight,
  BarChart3,
  Boxes,
  CalendarClock,
  Check,
  CheckCircle2,
  ChevronDown,
  ClipboardCheck,
  ClipboardList,
  FileStack,
  FileText,
  Gauge,
  HardHat,
  Layers,
  MessageCircle,
  PencilRuler,
  Plug,
  Radio,
  ShieldCheck,
  Smartphone,
  Truck,
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

import { ConstructionHeroPanel } from './ConstructionHeroPanel'
import { ConstructionProjectGrid } from './ConstructionProjectGrid'
import { ConstructionReveal } from './ConstructionReveal'
import { ConstructionScrollZoomCta } from './ConstructionScrollZoomCta'
import { ConstructionValueMetrics } from './ConstructionValueMetrics'
import { constructionLandingCopy } from './construction-content'
import styles from './construction-industry.module.css'

type ConstructionIndustryPageProps = {
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
    throw new Error(`Construction section ${id} must be a ${type}`)
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

function Watermark({ children }: { children: string }) {
  return (
    <span className={styles.watermark} aria-hidden="true">
      {children}
    </span>
  )
}

const SPECIALIZATION_ICONS: readonly LucideIcon[] = [HardHat, PencilRuler, Boxes]
const HIGHLIGHT_ICONS: readonly LucideIcon[] = [Users, FileText, CheckCircle2]
const SERVICE_ICONS: readonly LucideIcon[] = [ClipboardList, Smartphone, FileStack, Plug]
const CAPABILITY_ICONS: readonly LucideIcon[] = [
  Layers,
  BarChart3,
  ShieldCheck,
  Truck,
  CalendarClock,
  Radio,
  FileStack,
  Gauge,
  ClipboardCheck,
]

export function ConstructionIndustryPage({
  locale,
  definition,
  seo,
  schema,
}: ConstructionIndustryPageProps) {
  const direction = localeDirection[locale]
  const page = definition.locales[locale]
  const copy = constructionLandingCopy[locale]
  const services = sectionOf(page.sections, 'construction-service-paths', 'service-bridge')
  const faq = sectionOf(page.sections, 'construction-faq', 'faq')
  const whatsappHref = `/api/whatsapp?locale=${locale}`
  const waitingLabel = locale === 'ar' ? 'بانتظار القرار' : 'Waiting'

  return (
    <div
      className={styles.page}
      dir={direction}
      data-construction-template="shapen-v1"
      data-industry="construction"
      data-world={definition.world.id}
      data-locale={locale}
      data-canonical={seo.canonical}
      data-indexable={seo.index ? 'true' : 'false'}
    >
      <a className={styles.skipLink} href="#construction-industry-content">
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

      {/* -------------------------------------------------- Hero (staggered reveal) */}
      <section className={styles.hero} data-construction-hero data-header-theme="dark">
        <span className={styles.heroBlueprint} aria-hidden="true">
          <Image
            src="/images/industries/construction/blueprint-plan.png"
            alt=""
            fill
            sizes="100vw"
            priority
            style={{ objectFit: 'cover' }}
          />
        </span>
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <p className={styles.heroEyebrow} data-enter="1">
              <HardHat aria-hidden="true" />
              {copy.heroKicker}
            </p>
            <h1 data-enter="2">{page.hero.h1}</h1>
            <p className={styles.heroIntro} data-enter="3">
              {page.hero.intro}
            </p>
            <div className={styles.heroActions} data-enter="4">
              <a className={`${styles.button} ${styles.buttonPrimary}`} href={whatsappHref}>
                <MessageCircle aria-hidden="true" />
                <span>{page.hero.primaryCta.label}</span>
                <ArrowPair locale={locale} />
              </a>
              <a className={`${styles.button} ${styles.buttonGhost}`} href="#construction-service-paths">
                <span>{copy.heroSecondaryCta}</span>
                <ArrowPair locale={locale} />
              </a>
            </div>
            <ul className={styles.heroTrust} data-enter="5">
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

          <div className={styles.heroVisual} data-enter="6">
            <ConstructionHeroPanel
              label={copy.heroSceneLabel}
              caption={copy.heroSceneCaption}
              stages={page.hero.sceneStages}
              waitingLabel={waitingLabel}
            />
          </div>
        </div>
      </section>

      <div id="construction-industry-content" className={styles.content} tabIndex={-1}>
        {/* ---------------------------------------- Specialization (3 domain cards) */}
        <section className={styles.section}>
          <Watermark>{copy.specializationWatermark}</Watermark>
          <ConstructionReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.specializationEyebrow}</p>
            <h2>{copy.specializationTitle}</h2>
            <p className={styles.sectionIntro}>{copy.specializationIntro}</p>
          </ConstructionReveal>
          <ConstructionReveal className={styles.specGrid} variant="up" stagger>
            {copy.specialization.map((card, index) => {
              const Icon = SPECIALIZATION_ICONS[index] ?? HardHat
              return (
                <article className={styles.specCard} key={card.id}>
                  <span className={styles.specIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.subtitle}</p>
                </article>
              )
            })}
          </ConstructionReveal>
        </section>

        {/* ------------------------------------------------ About (dark practice band) */}
        <section className={styles.aboutSection} data-header-theme="dark">
          <Watermark>{copy.aboutWatermark}</Watermark>
          <div className={styles.aboutInner}>
            <ConstructionReveal className={styles.aboutCopy} variant="left">
              <p className={styles.eyebrowLight}>{copy.aboutEyebrow}</p>
              <h2>{copy.aboutTitle}</h2>
              {copy.aboutBody.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className={styles.aboutBody}>
                  {paragraph}
                </p>
              ))}
            </ConstructionReveal>
            <ConstructionReveal className={styles.aboutHighlights} variant="right" stagger>
              {copy.aboutHighlights.map((card, index) => {
                const Icon = HIGHLIGHT_ICONS[index] ?? Users
                return (
                  <div className={styles.aboutHighlight} key={card.id}>
                    <span className={styles.aboutHighlightIcon} aria-hidden="true">
                      <Icon />
                    </span>
                    <div>
                      <h3>{card.title}</h3>
                      <p>{card.subtitle}</p>
                    </div>
                  </div>
                )
              })}
            </ConstructionReveal>
          </div>
        </section>

        {/* ------------------------------ Our Value (counters + animated skill bars) */}
        <section className={`${styles.section} ${styles.sectionGray}`}>
          <Watermark>{copy.valueWatermark}</Watermark>
          <ConstructionReveal className={styles.sectionHeadingSplit} variant="up">
            <div>
              <p className={styles.eyebrow}>{copy.valueEyebrow}</p>
              <h2>{copy.valueTitle}</h2>
            </div>
            <p className={styles.sectionIntro}>{copy.valueIntro}</p>
          </ConstructionReveal>
          <ConstructionReveal variant="up">
            <ConstructionValueMetrics
              locale={locale}
              stats={copy.stats}
              statsNote={copy.statsNote}
              skills={copy.skills}
              skillsLabel={copy.skillsLabel}
              skillsNote={copy.skillsNote}
            />
          </ConstructionReveal>
        </section>

        {/* --------------------------------------- Our Services (4 numbered boxes) */}
        <section className={styles.section}>
          <Watermark>{copy.servicesWatermark}</Watermark>
          <ConstructionReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.servicesEyebrow}</p>
            <h2>{copy.servicesTitle}</h2>
            <p className={styles.sectionIntro}>{copy.servicesIntro}</p>
          </ConstructionReveal>
          <ConstructionReveal className={styles.servicesGrid} variant="up" stagger>
            {copy.services.map((service, index) => {
              const Icon = SERVICE_ICONS[index] ?? ClipboardList
              return (
                <article className={styles.serviceBox} key={service.id}>
                  <span className={styles.serviceNum} aria-hidden="true">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className={styles.serviceBoxIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{service.title}</h3>
                  <p>{service.subtitle}</p>
                </article>
              )
            })}
          </ConstructionReveal>
        </section>

        {/* ------------------------------------------ Capabilities (9 icon tiles) */}
        <section className={`${styles.section} ${styles.sectionGray}`}>
          <ConstructionReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.capabilitiesEyebrow}</p>
            <h2>{copy.capabilitiesTitle}</h2>
            <p className={styles.sectionIntro}>{copy.capabilitiesIntro}</p>
          </ConstructionReveal>
          <ConstructionReveal className={styles.capGrid} variant="up" stagger>
            {copy.capabilities.map((cap, index) => {
              const Icon = CAPABILITY_ICONS[index] ?? Layers
              return (
                <article className={styles.capTile} key={cap.id}>
                  <span className={styles.capIcon} aria-hidden="true">
                    <Icon />
                  </span>
                  <div>
                    <h3>{cap.title}</h3>
                    <p>{cap.subtitle}</p>
                  </div>
                </article>
              )
            })}
          </ConstructionReveal>
        </section>

        {/* ------------------------------------------- Call-Us parallax CTA band */}
        <section className={styles.callUs} aria-labelledby="construction-callus-title">
          <span className={styles.callUsBlueprint} aria-hidden="true">
            <Image
              src="/images/industries/construction/blueprint-building.png"
              alt=""
              width={525}
              height={423}
              sizes="(max-width: 991px) 60vw, 480px"
            />
          </span>
          <div className={styles.callUsInner}>
            <ConstructionReveal variant="up">
              <p className={styles.callUsEyebrow}>{copy.callUsEyebrow}</p>
              <h2 id="construction-callus-title">{copy.callUsTitle}</h2>
              <p className={styles.callUsBody}>{copy.callUsBody}</p>
              <a className={`${styles.button} ${styles.buttonDark}`} href={whatsappHref}>
                <MessageCircle aria-hidden="true" />
                <span>{copy.callUsButton}</span>
                <ArrowPair locale={locale} />
              </a>
            </ConstructionReveal>
          </div>
        </section>

        {/* ------------------------------- Our Project (isotope filterable grid) */}
        <section className={styles.section}>
          <Watermark>{copy.projectsWatermark}</Watermark>
          <ConstructionReveal className={styles.sectionHeadingSplit} variant="up">
            <div>
              <p className={styles.eyebrow}>{copy.projectsEyebrow}</p>
              <h2>{copy.projectsTitle}</h2>
            </div>
            <p className={styles.sectionIntro}>{copy.projectsIntro}</p>
          </ConstructionReveal>
          <ConstructionReveal variant="up">
            <ConstructionProjectGrid
              filters={copy.projectFilters}
              projects={copy.projects}
              filterLabel={copy.projectFilterLabel}
              direction={direction}
            />
            <p className={styles.projectsNote}>{copy.projectsNote}</p>
          </ConstructionReveal>
        </section>

        {/* ---------------------------- Our Mission (engagement areas + aside) */}
        <section className={`${styles.section} ${styles.sectionGray}`}>
          <Watermark>{copy.missionWatermark}</Watermark>
          <ConstructionReveal className={styles.sectionHeadingCentered} variant="up">
            <p className={styles.eyebrow}>{copy.missionEyebrow}</p>
            <h2>{copy.missionTitle}</h2>
            <p className={styles.sectionIntro}>{copy.missionIntro}</p>
          </ConstructionReveal>
          <div className={styles.missionLayout}>
            <ConstructionReveal className={styles.missionAreas} variant="left" stagger>
              {copy.missionAreas.map((area) => (
                <div className={styles.missionArea} key={area.id}>
                  <span className={styles.missionCheck} aria-hidden="true">
                    <Check />
                  </span>
                  <div>
                    <h3>{area.label}</h3>
                    <p>{area.detail}</p>
                  </div>
                </div>
              ))}
            </ConstructionReveal>
            <ConstructionReveal className={styles.missionAside} variant="right">
              <h3>{copy.missionAsideTitle}</h3>
              <p>{copy.missionAsideBody}</p>
              <a className={`${styles.button} ${styles.buttonPrimary} ${styles.buttonBlock}`} href={whatsappHref}>
                <MessageCircle aria-hidden="true" />
                <span>{copy.missionButton}</span>
                <ArrowPair locale={locale} />
              </a>
            </ConstructionReveal>
          </div>
        </section>

        {/* --------------------------- Service paths (repurposed service-bridge) */}
        <section className={styles.section} id="construction-service-paths">
          <ConstructionReveal className={styles.sectionHeadingSplit} variant="up">
            <div>
              <p className={styles.eyebrow}>{copy.servicePathsEyebrow}</p>
              <h2>{services.title}</h2>
            </div>
            <p className={styles.sectionIntro}>{services.intro}</p>
          </ConstructionReveal>
          <ConstructionReveal className={styles.servicePathGrid} variant="up" stagger>
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
          </ConstructionReveal>
          <Link
            className={styles.contextualServiceLink}
            href={localePath(locale, CANONICAL_SERVICE_TARGETS['business-systems-development'])}
          >
            {copy.constructionSystemsAction}
            <ArrowPair locale={locale} />
          </Link>
        </section>

        {/* ------------------------------------------------------- FAQ (grid) */}
        <section className={`${styles.section} ${styles.faqSection}`}>
          <ConstructionReveal className={styles.faqHeading} variant="up">
            <p className={styles.eyebrow}>{copy.faqEyebrow}</p>
            <h2>{faq.title}</h2>
            <p className={styles.sectionIntro}>{faq.intro}</p>
          </ConstructionReveal>
          <div className={styles.faqList}>
            {faq.items.map((item, index) => (
              <details
                className={styles.faqItem}
                name="construction-industry-faq"
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

        {/* --------------------------------- Full-width closing CTA (scroll-zoom) */}
        <ConstructionScrollZoomCta>
          <span className={styles.ctaBlueprint} aria-hidden="true">
            <Image
              src="/images/industries/construction/blueprint-plan.png"
              alt=""
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </span>
          <div className={styles.ctaInner}>
            <p className={styles.eyebrowLight}>{copy.ctaEyebrow}</p>
            <h2>{copy.ctaTitle}</h2>
            <p>{copy.ctaSubtitle}</p>
            <a className={`${styles.button} ${styles.buttonAccent}`} href={whatsappHref}>
              <MessageCircle aria-hidden="true" />
              <span>{copy.ctaButton}</span>
              <ArrowPair locale={locale} />
            </a>
          </div>
        </ConstructionScrollZoomCta>
      </div>
    </div>
  )
}
