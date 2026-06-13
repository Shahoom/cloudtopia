'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Mail, Sparkles, MessageCircle, Check, Clock } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'

const WHATSAPP_HREF =
    "https://wa.me/96895886393?text=Hi%20CloudTopia,%20I'd%20like%20to%20talk%20about%20a%20project."

export default function FinalCTA() {
    const { t, locale } = useLanguage()
    const isRTL = locale === 'ar'

    const badge = t.home?.finalCTA?.badge || 'Ready when you are'
    const title = t.home?.finalCTA?.title || 'Tell us about your project'
    const titleHighlight = t.home?.finalCTA?.titleHighlight || 'we reply the same day'
    const description = t.home?.finalCTA?.description
    const primaryCTA = t.home?.finalCTA?.primaryCTA || 'Start a project'
    const secondaryCTA = t.home?.finalCTA?.secondaryCTA || 'See pricing first'
    const emailLabel = t.home?.finalCTA?.emailLabel || 'Or email us directly'
    const emailAddress = t.home?.finalCTA?.emailAddress || 'info@cloudtopia.net'

    const copy = isRTL
        ? {
              trust: [
                  'رد من شخص حقيقي خلال يوم عمل واحد',
                  'عرض سعر مكتوب وثابت قبل أي بدء',
                  'تملك 100% من كل ما نبنيه',
              ],
              stats: [
                  { value: '+2000', label: 'مشروع مُسلَّم' },
                  { value: '+50', label: 'دولة' },
                  { value: '7', label: 'مجالات خدمة' },
              ],
              panelTitle: 'لنبدأ المحادثة',
              panelNote: 'رد خلال يوم عمل واحد — شخص حقيقي، لا روبوت.',
              whatsapp: 'تواصل عبر واتساب',
          }
        : {
              trust: [
                  'A real person replies within one business day',
                  'A fixed, written proposal before anything starts',
                  'You own 100% of everything we build',
              ],
              stats: [
                  { value: '2,000+', label: 'Projects shipped' },
                  { value: '50+', label: 'Countries' },
                  { value: '7', label: 'Service areas' },
              ],
              panelTitle: 'Start the conversation',
              panelNote: 'Replies within one business day — a real person, not a bot.',
              whatsapp: 'Chat on WhatsApp',
          }

    return (
        <section
            className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-eerie overflow-hidden"
            data-header-theme="dark"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    backgroundImage:
                        'radial-gradient(ellipse 90% 70% at 50% 50%, rgba(14,165,233,0.16), transparent 60%), radial-gradient(ellipse 60% 50% at 20% 30%, rgba(99,102,241,0.18), transparent 60%), radial-gradient(ellipse 60% 50% at 80% 70%, rgba(6,182,212,0.14), transparent 60%)',
                }}
            />

            <div
                className="pointer-events-none absolute inset-0 opacity-[0.06]"
                style={{
                    backgroundImage:
                        'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
                    backgroundSize: '80px 80px',
                    maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 75%)',
                }}
            />

            <div className="relative max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative grid overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.02] backdrop-blur-xl lg:grid-cols-[1.1fr_0.9fr]"
                >
                    <div
                        className="pointer-events-none absolute inset-0 opacity-50 mix-blend-screen"
                        style={{
                            backgroundImage:
                                'conic-gradient(from 45deg at 50% 50%, transparent, rgba(14,165,233,0.22), transparent, rgba(99,102,241,0.22), transparent)',
                        }}
                    />

                    {/* Left: message + trust + stats */}
                    <div className="relative p-8 md:p-12 lg:p-14">
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/8 border border-white/15 backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-white/90">
                            <Sparkles className="w-3.5 h-3.5 text-cyan-300" aria-hidden="true" />
                            {badge}
                        </span>

                        <h2 className="mt-6 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-[1.08]">
                            {title}
                            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-primary-300 to-secondary-300 italic font-serif text-xl md:text-2xl lg:text-3xl font-medium">
                                — {titleHighlight}
                            </span>
                        </h2>

                        {description && (
                            <p className="mt-5 text-base md:text-lg text-white/75 leading-relaxed max-w-xl">
                                {description}
                            </p>
                        )}

                        <ul className="mt-8 space-y-3">
                            {copy.trust.map((item) => (
                                <li key={item} className="flex items-start gap-3 text-sm md:text-base text-white/85">
                                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-400/20 text-cyan-300">
                                        <Check className="h-3 w-3" aria-hidden="true" />
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-9 grid grid-cols-3 gap-3 max-w-md">
                            {copy.stats.map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-2xl border border-white/10 bg-white/[0.04] px-3 py-4 text-center"
                                >
                                    <div className="text-xl md:text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="mt-1 text-[11px] font-medium leading-tight text-white/55">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Right: contact panel */}
                    <div className="relative border-t border-white/10 bg-white/[0.04] p-8 md:p-12 lg:border-t-0 lg:border-s lg:p-14">
                        <p className="text-xs font-bold uppercase tracking-widest text-cyan-300/90">{copy.panelTitle}</p>

                        <div className="mt-6 flex flex-col gap-3">
                            <Link
                                href={localePath(locale, '/contact')}
                                className="group inline-flex items-center justify-between gap-2 px-6 py-4 rounded-2xl bg-white text-eerie font-semibold hover:bg-cyan-100 transition-colors"
                            >
                                {primaryCTA}
                                <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} aria-hidden="true" />
                            </Link>

                            <a
                                href={WHATSAPP_HREF}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group inline-flex items-center justify-between gap-2 px-6 py-4 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/40 text-white font-semibold hover:bg-[#25D366]/25 transition-colors"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <MessageCircle className="w-4 h-4 text-[#25D366]" aria-hidden="true" />
                                    {copy.whatsapp}
                                </span>
                                <ArrowRight className={`w-4 h-4 opacity-60 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} aria-hidden="true" />
                            </a>

                            <a
                                href={`mailto:${emailAddress}`}
                                className="group inline-flex items-center justify-between gap-2 px-6 py-4 rounded-2xl border border-white/20 text-white font-semibold hover:border-white/50 hover:bg-white/5 transition-colors"
                            >
                                <span className="inline-flex items-center gap-2 min-w-0">
                                    <Mail className="w-4 h-4 text-cyan-300 shrink-0" aria-hidden="true" />
                                    <span className="truncate">{emailAddress}</span>
                                </span>
                            </a>
                        </div>

                        <div className="mt-6 flex items-center gap-2 text-xs text-white/55">
                            <Clock className="w-3.5 h-3.5 text-cyan-300/80 shrink-0" aria-hidden="true" />
                            <span>{copy.panelNote}</span>
                        </div>

                        <div className="mt-6 pt-6 border-t border-white/10">
                            <Link
                                href={localePath(locale, '/pricing')}
                                className="group inline-flex items-center gap-1.5 text-sm font-semibold text-white/70 hover:text-white transition-colors"
                            >
                                {secondaryCTA}
                                <ArrowRight className={`w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 ${isRTL ? 'rotate-180 group-hover:-translate-x-0.5' : ''}`} aria-hidden="true" />
                            </Link>
                            <span className="mx-3 text-white/20">·</span>
                            <span className="text-sm text-white/55">{emailLabel}</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}
