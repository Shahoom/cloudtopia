'use client'

import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowUpRight,
  Bot,
  CheckCircle2,
  FileText,
  Globe2,
  Layers,
  MessageSquare,
  Search,
  ShoppingBag,
  Sparkles,
} from 'lucide-react'
import { motion } from 'framer-motion'
import { localePath } from '@/lib/i18n/url'
import type { DigitalPresenceLandingContent } from '@/lib/services/digital-presence-landing'
import styles from './digital-presence.module.css'

const EASE = [0.22, 1, 0.36, 1] as const
const CONTENT_MOMENT_ICONS = [Sparkles, MessageSquare, FileText, Layers] as const

export function PresenceScenes({
  content,
  reduceMotion,
}: {
  content: DigitalPresenceLandingContent
  reduceMotion: boolean
}) {
  const locale = content.locale

  return (
    <>
      <section className={styles.foundationSection} aria-labelledby="presence-foundation-title">
        <div className={styles.sectionInner}>
          <div className={styles.foundationLayout}>
            <motion.div
              className={styles.foundationCopy}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <p className={styles.eyebrow}>{content.foundation.eyebrow}</p>
              <h2 id="presence-foundation-title" className={styles.heading}>{content.foundation.title}</h2>
              <p className={styles.description}>{content.foundation.description}</p>
              <div className={styles.foundationLinks}>
                {content.foundation.pillars.map((pillar, index) => {
                  const service = content.services.find((item) => item.slug === pillar.slug)
                  if (!service) return null
                  return (
                    <Link key={pillar.slug} href={localePath(locale, service.href)} className={styles.foundationLink}>
                      <span>{String(index + 1).padStart(2, '0')}</span>
                      <span>
                        <strong>{pillar.label}</strong>
                        <small>{pillar.description}</small>
                      </span>
                      <ArrowUpRight aria-hidden="true" className={styles.directionalIcon} />
                    </Link>
                  )
                })}
              </div>
            </motion.div>

            <div className={styles.foundationWorkbench} aria-label={content.foundation.title}>
              <motion.div
                className={styles.workbenchWebsite}
                initial={reduceMotion ? false : { opacity: 0, x: -24, y: 16 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.75, ease: EASE }}
              >
                <div className={styles.browserBar} aria-hidden="true"><span /><span /><span /><i /></div>
                <div className={styles.websiteFrame}>
                  <Image
                    src="/images/projects/ramsdgroup.png"
                    alt=""
                    fill
                    sizes="(max-width: 900px) 86vw, 42vw"
                    className={styles.frameImage}
                  />
                </div>
              </motion.div>

              <motion.div
                className={styles.workbenchCommerce}
                initial={reduceMotion ? false : { opacity: 0, x: 26, y: 18 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
              >
                <ShoppingBag aria-hidden="true" />
                <span>{content.foundation.pillars[1]?.label}</span>
                <strong>03</strong>
                <div className={styles.commerceMeter}><i /><i /><i /></div>
              </motion.div>

              <motion.div
                className={styles.workbenchBrand}
                initial={reduceMotion ? false : { opacity: 0, y: 28 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.7, delay: 0.18, ease: EASE }}
              >
                <span className={styles.brandSwatch} /><span className={styles.brandSwatch} /><span className={styles.brandSwatch} />
                <strong>Aa</strong>
                <small>{content.foundation.pillars[2]?.label}</small>
              </motion.div>
              <div className={styles.workbenchCursor} aria-hidden="true"><Sparkles /></div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.discoverabilitySection} aria-labelledby="presence-discoverability-title" data-header-theme="dark">
        <div className={styles.sectionInner}>
          <div className={styles.discoverabilityHeader}>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <p className={styles.eyebrowInverse}>{content.discoverability.eyebrow}</p>
              <h2 id="presence-discoverability-title">{content.discoverability.title}</h2>
            </motion.div>
            <p>{content.discoverability.description}</p>
          </div>

          <div className={styles.discoveryConsole}>
            <div className={styles.discoveryChrome}>
              <span /><span /><span />
              <small>{content.discoverability.exampleLabel}</small>
            </div>
            <div className={styles.discoveryQuery}>
              <Search aria-hidden="true" />
              <span>{content.discoverability.searchPrompt}</span>
              <kbd>↵</kbd>
            </div>
            <div className={styles.discoveryAnswer}>
              <div className={styles.answerIcon}><Bot aria-hidden="true" /></div>
              <div>
                <strong>{content.discoverability.answerLabel}</strong>
                <p>{content.discoverability.answer}</p>
              </div>
            </div>
            <ul className={styles.signalList}>
              {content.discoverability.signals.map((signal, index) => (
                <motion.li
                  key={signal}
                  initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.08, ease: EASE }}
                >
                  <CheckCircle2 aria-hidden="true" />
                  <span>{signal}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          <nav className={styles.discoveryLinks} aria-label={content.discoverability.eyebrow}>
            {content.discoverability.serviceLinks.map((item, index) => {
              const service = content.services.find((candidate) => candidate.slug === item.slug)
              if (!service) return null
              return (
                <Link key={item.slug} href={localePath(locale, service.href)}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{item.label}</strong>
                  <ArrowUpRight aria-hidden="true" className={styles.directionalIcon} />
                </Link>
              )
            })}
          </nav>
        </div>
      </section>

      <section className={styles.engagementSection} aria-labelledby="presence-engagement-title" data-header-theme="dark">
        <div className={styles.engagementRail} aria-hidden="true"><span>STRATEGY</span><span>STORY</span><span>DISTRIBUTION</span><span>COMMUNITY</span></div>
        <div className={styles.sectionInner}>
          <div className={styles.engagementLayout}>
            <motion.div
              className={styles.engagementCopy}
              initial={reduceMotion ? false : { opacity: 0, y: 28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, ease: EASE }}
            >
              <p className={styles.eyebrowInverse}>{content.engagement.eyebrow}</p>
              <h2 id="presence-engagement-title">{content.engagement.title}</h2>
              <p>{content.engagement.description}</p>
              <nav className={styles.engagementLinks} aria-label={content.engagement.eyebrow}>
                {content.engagement.serviceLinks.map((item) => {
                  const service = content.services.find((candidate) => candidate.slug === item.slug)
                  if (!service) return null
                  return (
                    <Link key={item.slug} href={localePath(locale, service.href)}>
                      {item.label}<ArrowUpRight aria-hidden="true" className={styles.directionalIcon} />
                    </Link>
                  )
                })}
              </nav>
            </motion.div>

            <div className={styles.contentStudio} aria-label={content.engagement.title}>
              {content.engagement.moments.map((moment, index) => {
                const Icon = CONTENT_MOMENT_ICONS[index] || Globe2
                return (
                  <motion.article
                    key={moment.label}
                    className={styles.contentMoment}
                    initial={reduceMotion ? false : { opacity: 0, y: 22, rotate: index % 2 === 0 ? -1 : 1 }}
                    whileInView={reduceMotion ? undefined : { opacity: 1, y: 0, rotate: 0 }}
                    whileHover={reduceMotion ? undefined : { y: -6 }}
                    viewport={{ once: true, amount: 0.35 }}
                    transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
                  >
                    <div className={styles.momentTop}><Icon aria-hidden="true" /><span>{String(index + 1).padStart(2, '0')}</span></div>
                    <strong>{moment.label}</strong>
                    <p>{moment.value}</p>
                    <div className={styles.momentLines} aria-hidden="true"><i /><i /><i /></div>
                  </motion.article>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
