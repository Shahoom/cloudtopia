'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Compass,
  MessageCircle,
  Sparkles,
} from 'lucide-react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { PageBreadcrumbs } from '@/components/ui/PageBreadcrumbs'
import { localePath } from '@/lib/i18n/url'
import type { DigitalPresenceLandingContent } from '@/lib/services/digital-presence-landing'
import { PresenceScenes } from './PresenceScenes'
import { PresenceConversion } from './PresenceConversion'
import styles from './digital-presence.module.css'

const EASE = [0.22, 1, 0.36, 1] as const

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.65, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  inverse = false,
}: {
  id: string
  eyebrow: string
  title: string
  description: string
  inverse?: boolean
}) {
  return (
    <Reveal className={styles.sectionHeading}>
      <p className={inverse ? styles.eyebrowInverse : styles.eyebrow}>{eyebrow}</p>
      <h2 id={id} className={inverse ? styles.headingInverse : styles.heading}>{title}</h2>
      <p className={inverse ? styles.descriptionInverse : styles.description}>{description}</p>
    </Reveal>
  )
}

export function DigitalPresenceLanding({ content }: { content: DigitalPresenceLandingContent }) {
  const locale = content.locale
  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  const reduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const [activeJourney, setActiveJourney] = useState(0)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const primaryCanvasY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 72])
  const secondaryCanvasY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -52])
  const heroCopyY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 34])
  const whatsappHref = `/api/whatsapp?locale=${locale}`
  const activeStage = content.journey[activeJourney]
  const activeServices = activeStage.serviceSlugs
    .map((slug) => content.services.find((service) => service.slug === slug))
    .filter((service): service is DigitalPresenceLandingContent['services'][number] => Boolean(service))

  return (
    <div className={styles.page} dir={dir}>
      <a href="#digital-presence-content" className={styles.skipLink}>
        {locale === 'ar' ? 'تجاوز إلى المحتوى' : 'Skip to content'}
      </a>
      <section
        id="digital-presence-content"
        ref={heroRef}
        className={styles.hero}
        aria-labelledby="digital-presence-title"
        tabIndex={-1}
      >
        <div className={styles.heroRail} aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className={styles.heroBreadcrumbs}>
          <PageBreadcrumbs
            locale={locale}
            items={[
              { label: locale === 'ar' ? 'الخدمات' : 'Services', href: localePath(locale, '/services') },
              { label: locale === 'ar' ? 'الحضور الرقمي' : 'Digital Presence' },
            ]}
          />
        </div>

        <motion.figure
          className={`${styles.heroCanvas} ${styles.heroCanvasPrimary}`}
          style={reduceMotion ? undefined : { y: primaryCanvasY }}
          initial={reduceMotion ? false : { opacity: 0, x: dir === 'rtl' ? 34 : -34, rotate: -2 }}
          animate={{ opacity: 1, x: 0, rotate: -1 }}
          transition={{ duration: 0.8, delay: 0.25, ease: EASE }}
        >
          <div className={styles.canvasChrome} aria-hidden="true"><span /><span /><span /></div>
          <Image
            src="/images/projects/ramsdgroup.png"
            alt=""
            fill
            priority
            sizes="(max-width: 767px) 42vw, 26vw"
            className={styles.canvasImage}
          />
          <figcaption>{content.hero.canvasLabels[0]}</figcaption>
        </motion.figure>

        <motion.figure
          className={`${styles.heroCanvas} ${styles.heroCanvasCommerce}`}
          style={reduceMotion ? undefined : { y: secondaryCanvasY }}
          initial={reduceMotion ? false : { opacity: 0, x: dir === 'rtl' ? -38 : 38, rotate: 3 }}
          animate={{ opacity: 1, x: 0, rotate: 1.5 }}
          transition={{ duration: 0.8, delay: 0.4, ease: EASE }}
        >
          <div className={styles.canvasChrome} aria-hidden="true"><span /><span /><span /></div>
          <Image
            src="/images/projects/artucky-ecommerce.png"
            alt=""
            fill
            sizes="(max-width: 767px) 38vw, 22vw"
            className={styles.canvasImage}
          />
          <figcaption>{content.hero.canvasLabels[1]}</figcaption>
        </motion.figure>

        <motion.figure
          className={`${styles.heroCanvas} ${styles.heroCanvasSocial}`}
          style={reduceMotion ? undefined : { y: primaryCanvasY }}
          initial={reduceMotion ? false : { opacity: 0, y: 28, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -1.5 }}
          transition={{ duration: 0.8, delay: 0.55, ease: EASE }}
        >
          <div className={styles.canvasChrome} aria-hidden="true"><span /><span /><span /></div>
          <Image
            src="/images/services/social-media-marketing/Social Media Strategy.jpg"
            alt=""
            fill
            sizes="(max-width: 767px) 34vw, 18vw"
            className={styles.canvasImage}
          />
          <figcaption>{content.hero.canvasLabels[2]}</figcaption>
        </motion.figure>

        <motion.div
          className={styles.heroSearchCanvas}
          style={reduceMotion ? undefined : { y: secondaryCanvasY }}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: EASE }}
          aria-hidden="true"
        >
          <div className={styles.searchCanvasTop}>
            <span />
            <span />
            <span />
          </div>
          <div className={styles.searchCanvasField}><Sparkles /><span>{content.hero.canvasLabels[3]}</span></div>
          <div className={styles.searchCanvasLines}><i /><i /><i /></div>
        </motion.div>

        <motion.div className={styles.heroCopy} style={reduceMotion ? undefined : { y: heroCopyY }}>
          <motion.p
            className={styles.heroEyebrow}
            initial={reduceMotion ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            <span aria-hidden="true" />
            {content.hero.eyebrow}
          </motion.p>
          <motion.h1
            id="digital-presence-title"
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.25, ease: EASE }}
          >
            {content.hero.title}
            {' '}
            <strong>{content.hero.accent}</strong>
          </motion.h1>
          <motion.p
            className={styles.heroDescription}
            initial={reduceMotion ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
          >
            {content.hero.description}
          </motion.p>
          <motion.div
            className={styles.heroActions}
            initial={reduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.55, ease: EASE }}
          >
            <a href={whatsappHref} className={styles.primaryButton}>
              <MessageCircle aria-hidden="true" />
              {content.hero.primaryCta}
              <ArrowUpRight aria-hidden="true" className={styles.directionalIcon} />
            </a>
            <a href="#service-atlas" className={styles.secondaryButton}>
              {content.hero.secondaryCta}
              <ArrowDown aria-hidden="true" />
            </a>
          </motion.div>
        </motion.div>

        <div className={styles.heroTicker} aria-label={content.labels.services}>
          <div>
            {[...content.hero.ticker, ...content.hero.ticker].map((item, index) => (
              <span key={`${item}-${index}`}><i aria-hidden="true" />{item}</span>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.definition} aria-labelledby="presence-definition-title" data-header-theme="dark">
        <div className={styles.definitionLead}>
          <Reveal>
            <p className={styles.eyebrowInverse}>{content.definition.eyebrow}</p>
            <h2 id="presence-definition-title">{content.definition.title}</h2>
          </Reveal>
        </div>
        <div className={styles.definitionBody}>
          <Reveal>
            <p className={styles.definitionStatement}>{content.definition.statement}</p>
            <p>{content.definition.description}</p>
          </Reveal>
          <ol className={styles.momentList}>
            {content.definition.moments.map((moment, index) => (
              <motion.li
                key={moment}
                initial={reduceMotion ? false : { opacity: 0, x: dir === 'rtl' ? 18 : -18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
              >
                <span>{String(index + 1).padStart(2, '0')}</span>
                {moment}
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.journeySection} aria-labelledby="presence-journey-title">
        <div className={styles.sectionInner}>
          <SectionHeading
            id="presence-journey-title"
            eyebrow={content.journeyIntro.eyebrow}
            title={content.journeyIntro.title}
            description={content.journeyIntro.description}
          />

          <div className={styles.journeyConsole}>
            <div className={styles.journeyControls} aria-label={content.journeyIntro.title}>
              {content.journey.map((stage, index) => (
                <button
                  key={stage.number}
                  type="button"
                  aria-pressed={activeJourney === index}
                  className={activeJourney === index ? styles.journeyButtonActive : styles.journeyButton}
                  onClick={() => setActiveJourney(index)}
                >
                  <span>{stage.number}</span>
                  <strong>{stage.title}</strong>
                </button>
              ))}
            </div>
            <motion.div
              key={activeStage.number}
              id={`journey-panel-${activeJourney}`}
              role="region"
              aria-label={activeStage.title}
              aria-live="polite"
              className={styles.journeyPanel}
              initial={reduceMotion ? false : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
            >
              <div className={styles.journeyPanelNumber}>{activeStage.number}</div>
              <div>
                <p>{activeStage.description}</p>
                {activeServices.length > 0 ? (
                  <div className={styles.journeyServiceLinks}>
                    {activeServices.map((service) => (
                      <Link key={service.slug} href={localePath(locale, service.href)}>
                        {service.name}<ArrowUpRight aria-hidden="true" className={styles.directionalIcon} />
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className={styles.journeyLearning}>
                    <Compass aria-hidden="true" />
                    <span>{activeStage.title}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section id="service-atlas" className={styles.atlasSection} aria-labelledby="service-atlas-title">
        <div className={styles.sectionInner}>
          <SectionHeading
            id="service-atlas-title"
            eyebrow={content.atlas.eyebrow}
            title={content.atlas.title}
            description={content.atlas.description}
          />
          <div className={styles.serviceAtlas}>
            {content.services.map((service, index) => (
              <motion.div
                key={service.slug}
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: (index % 4) * 0.05, ease: EASE }}
              >
                <Link href={localePath(locale, service.href)} className={styles.serviceRow}>
                  <span className={styles.serviceIndex}>{String(index + 1).padStart(2, '0')}</span>
                  <span className={styles.serviceIcon}>
                    <Image src={service.icon} alt="" width={56} height={56} />
                  </span>
                  <span className={styles.serviceCopy}>
                    <strong>{service.name}</strong>
                    <small>{service.description}</small>
                  </span>
                  <span className={styles.serviceExplore}>
                    <span>{content.atlas.exploreLabel}</span>
                    <ArrowUpRight aria-hidden="true" className={styles.directionalIcon} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <PresenceScenes content={content} reduceMotion={Boolean(reduceMotion)} />
      <PresenceConversion content={content} reduceMotion={Boolean(reduceMotion)} />

      <section className={styles.faqSection} aria-labelledby="presence-faq-title">
        <div className={styles.sectionInner}>
          <SectionHeading
            id="presence-faq-title"
            eyebrow={content.faqIntro.eyebrow}
            title={content.faqIntro.title}
            description={content.faqIntro.description}
          />
          <div className={styles.faqList}>
            {content.faqs.map((faq, index) => (
              <details key={faq.question} className={styles.faqItem}>
                <summary>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{faq.question}</strong>
                  <span className={styles.faqToggle} aria-hidden="true">+</span>
                </summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.finalCta} aria-labelledby="presence-final-title" data-header-theme="dark">
        <div className={styles.finalChrome} aria-hidden="true"><span /><span /><span /><span /></div>
        <Reveal className={styles.finalCtaInner}>
          <p className={styles.eyebrowInverse}>{content.finalCta.eyebrow}</p>
          <h2 id="presence-final-title">{content.finalCta.title}</h2>
          <p>{content.finalCta.description}</p>
          <div className={styles.finalActions}>
            <a href={whatsappHref} className={styles.lightButton}>
              <MessageCircle aria-hidden="true" />
              {content.finalCta.primaryCta}
              <ArrowUpRight aria-hidden="true" className={styles.directionalIcon} />
            </a>
            <a href="#service-atlas" className={styles.ghostLightButton}>
              {content.finalCta.secondaryCta}
              <ArrowUpRight aria-hidden="true" className={styles.directionalIcon} />
            </a>
          </div>
          <p className={styles.finalNote}><Check aria-hidden="true" />{content.finalCta.note}</p>
        </Reveal>
      </section>

    </div>
  )
}
