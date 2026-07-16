'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRight,
  Check,
  Link2,
  MapPin,
  Rocket,
  RotateCw,
  SearchCheck,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { localePath } from '@/lib/i18n/url'
import type { DigitalPresenceLandingContent } from '@/lib/services/digital-presence-landing'
import styles from './digital-presence.module.css'

const EASE = [0.22, 1, 0.36, 1] as const
const OUTCOME_ICONS = [Rocket, SearchCheck, MapPin, ArrowUpRight, RotateCw, Link2] as const

function AnimatedHeading({
  id,
  eyebrow,
  title,
  description,
  reduceMotion,
  inverse = false,
}: {
  id: string
  eyebrow: string
  title: string
  description: string
  reduceMotion: boolean
  inverse?: boolean
}) {
  return (
    <motion.div
      className={styles.sectionHeading}
      initial={reduceMotion ? false : { opacity: 0, y: 26 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.65, ease: EASE }}
    >
      <p className={inverse ? styles.eyebrowInverse : styles.eyebrow}>{eyebrow}</p>
      <h2 id={id} className={inverse ? styles.headingInverse : styles.heading}>{title}</h2>
      <p className={inverse ? styles.descriptionInverse : styles.description}>{description}</p>
    </motion.div>
  )
}

export function PresenceConversion({
  content,
  reduceMotion,
}: {
  content: DigitalPresenceLandingContent
  reduceMotion: boolean
}) {
  const locale = content.locale

  return (
    <>
      <section className={styles.connectionSection} aria-labelledby="presence-connection-title">
        <div className={styles.connectionTrack} aria-hidden="true">
          <span /><span /><span /><span /><span />
        </div>
        <div className={styles.sectionInner}>
          <div className={styles.connectionHeader}>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 26 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <p className={styles.eyebrow}>{content.connection.eyebrow}</p>
              <h2 id="presence-connection-title">{content.connection.title}</h2>
            </motion.div>
            <p>{content.connection.description}</p>
          </div>

          <div className={styles.connectionCompare}>
            <motion.article
              className={styles.fragmentedState}
              initial={reduceMotion ? false : { opacity: 0, x: -24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <div className={styles.stateHeader}><span>01</span><strong>{content.connection.beforeLabel}</strong></div>
              <ul>
                {content.connection.before.map((item, index) => (
                  <li key={item}><span>{String(index + 1).padStart(2, '0')}</span>{item}</li>
                ))}
              </ul>
              <div className={styles.fragmentMap} aria-hidden="true">
                <i /><i /><i /><i />
              </div>
            </motion.article>

            <div className={styles.connectionBridge} aria-hidden="true">
              <Link2 />
              <span />
            </div>

            <motion.article
              className={styles.connectedState}
              initial={reduceMotion ? false : { opacity: 0, x: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.65, delay: 0.08, ease: EASE }}
            >
              <div className={styles.stateHeader}><span>02</span><strong>{content.connection.afterLabel}</strong></div>
              <ul>
                {content.connection.after.map((item) => (
                  <li key={item}><Check aria-hidden="true" />{item}</li>
                ))}
              </ul>
              <div className={styles.connectedMap} aria-hidden="true">
                <i /><i /><i /><i /><span />
              </div>
            </motion.article>
          </div>
        </div>
      </section>

      <section className={styles.outcomesSection} aria-labelledby="presence-outcomes-title">
        <div className={styles.sectionInner}>
          <AnimatedHeading
            id="presence-outcomes-title"
            eyebrow={content.outcomesIntro.eyebrow}
            title={content.outcomesIntro.title}
            description={content.outcomesIntro.description}
            reduceMotion={reduceMotion}
          />
          <div className={styles.outcomeGrid}>
            {content.outcomes.map((outcome, index) => {
              const Icon = OUTCOME_ICONS[index] || Check
              return (
                <motion.article
                  key={outcome.number}
                  className={styles.outcomeItem}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5, delay: (index % 3) * 0.07, ease: EASE }}
                >
                  <div className={styles.outcomeTop}><span>{outcome.number}</span><Icon aria-hidden="true" /></div>
                  <h3>{outcome.title}</h3>
                  <p>{outcome.description}</p>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      <section className={styles.processSection} aria-labelledby="presence-process-title" data-header-theme="dark">
        <div className={styles.sectionInner}>
          <AnimatedHeading
            id="presence-process-title"
            eyebrow={content.processIntro.eyebrow}
            title={content.processIntro.title}
            description={content.processIntro.description}
            reduceMotion={reduceMotion}
            inverse
          />
          <ol className={styles.processTimeline}>
            {content.process.map((step, index) => (
              <motion.li
                key={step.number}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.45 }}
                transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }}
              >
                <span className={styles.processNumber}>{step.number}</span>
                <span className={styles.processDot} aria-hidden="true" />
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>

      <section className={styles.audienceSection} aria-labelledby="presence-audience-title">
        <div className={styles.sectionInner}>
          <div className={styles.audienceLayout}>
            <motion.div
              className={styles.audienceHeading}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <p className={styles.eyebrow}>{content.audience.eyebrow}</p>
              <h2 id="presence-audience-title">{content.audience.title}</h2>
              <p>{content.audience.description}</p>
            </motion.div>
            <div className={styles.audienceList}>
              {content.audience.items.map((item, index) => (
                <motion.article
                  key={item.title}
                  initial={reduceMotion ? false : { opacity: 0, x: 20 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.35 }}
                  transition={{ duration: 0.5, delay: index * 0.07, ease: EASE }}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <div><h3>{item.title}</h3><p>{item.description}</p></div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.workSection} aria-labelledby="presence-work-title">
        <div className={styles.sectionInner}>
          <div className={styles.workHeader}>
            <AnimatedHeading
              id="presence-work-title"
              eyebrow={content.work.eyebrow}
              title={content.work.title}
              description={content.work.description}
              reduceMotion={reduceMotion}
            />
            <Link href={localePath(locale, '/projects')} className={styles.secondaryButton}>
              {content.work.viewAll}<ArrowUpRight aria-hidden="true" className={styles.directionalIcon} />
            </Link>
          </div>
          <div className={styles.projectGrid}>
            {content.work.projects.map((project, index) => (
              <motion.article
                key={project.href}
                className={styles.projectItem}
                initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                whileHover={reduceMotion ? undefined : { y: -7 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.55, delay: index * 0.08, ease: EASE }}
              >
                <Link href={localePath(locale, project.href)} aria-label={project.title}>
                  <div className={styles.projectImage}>
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 767px) 94vw, (max-width: 1100px) 48vw, 31vw"
                    />
                  </div>
                  <div className={styles.projectMeta}>
                    <span>{project.category}</span>
                    <h3>{project.title}</h3>
                    <ArrowUpRight aria-hidden="true" className={styles.directionalIcon} />
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
