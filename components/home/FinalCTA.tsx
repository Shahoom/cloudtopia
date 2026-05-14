'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Mail, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'

export default function FinalCTA() {
    const { t, locale } = useLanguage()
    const isRTL = locale === 'ar'

    const badge = t.home?.finalCTA?.badge || 'Ready when you are'
    const title = t.home?.finalCTA?.title || 'Tell us what you\'re building'
    const titleHighlight = t.home?.finalCTA?.titleHighlight || 'we\'ll sketch the path forward'
    const description = t.home?.finalCTA?.description
    const primaryCTA = t.home?.finalCTA?.primaryCTA || 'Start a project'
    const secondaryCTA = t.home?.finalCTA?.secondaryCTA || 'See pricing first'
    const emailLabel = t.home?.finalCTA?.emailLabel || 'Or email us directly'
    const emailAddress = t.home?.finalCTA?.emailAddress || 'info@cloudtopia.net'

    return (
        <section
            className="relative py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a1a] overflow-hidden"
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

            <div className="relative max-w-5xl mx-auto">
                <div className="relative rounded-[2rem] md:rounded-[2.5rem] border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.04] to-white/[0.02] backdrop-blur-xl p-8 md:p-16 lg:p-20 text-center overflow-hidden">
                    <div
                        className="pointer-events-none absolute inset-0 opacity-50 mix-blend-screen"
                        style={{
                            backgroundImage:
                                'conic-gradient(from 45deg at 50% 50%, transparent, rgba(14,165,233,0.25), transparent, rgba(99,102,241,0.25), transparent)',
                        }}
                    />

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative flex justify-center mb-8"
                    >
                        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/8 border border-white/15 backdrop-blur-sm text-xs font-bold uppercase tracking-widest text-white/90">
                            <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                            {badge}
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 18 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.05 }}
                        className="relative text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-[1.05] mb-5"
                    >
                        {title}
                        <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-primary-300 to-secondary-300 italic font-serif text-2xl md:text-4xl lg:text-5xl font-medium">
                            — {titleHighlight}
                        </span>
                    </motion.h2>

                    {description && (
                        <motion.p
                            initial={{ opacity: 0, y: 14 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="relative text-lg md:text-xl text-white/75 max-w-2xl mx-auto leading-relaxed mb-10"
                        >
                            {description}
                        </motion.p>
                    )}

                    <motion.div
                        initial={{ opacity: 0, y: 14 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                        className="relative flex flex-col sm:flex-row items-center justify-center gap-3 md:gap-4 mb-12"
                    >
                        <Link
                            href={localePath(locale, '/contact')}
                            className="group inline-flex items-center gap-2 px-7 md:px-8 py-4 rounded-full bg-white text-neutral-900 font-semibold hover:bg-cyan-100 transition-colors w-full sm:w-auto justify-center"
                        >
                            {primaryCTA}
                            <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                        </Link>
                        <Link
                            href={localePath(locale, '/pricing')}
                            className="group inline-flex items-center gap-2 px-7 md:px-8 py-4 rounded-full border border-white/25 hover:border-white/60 text-white font-semibold hover:bg-white/5 transition-colors w-full sm:w-auto justify-center"
                        >
                            {secondaryCTA}
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative flex items-center justify-center pt-8 border-t border-white/10"
                    >
                        <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-white/70">
                            <div className="flex items-center gap-2">
                                <Mail className="w-4 h-4 text-cyan-300 shrink-0" />
                                <span className="text-sm">{emailLabel}</span>
                            </div>
                            <a
                                href={`mailto:${emailAddress}`}
                                className="text-sm font-semibold text-white hover:text-cyan-200 transition-colors underline-offset-4 hover:underline"
                            >
                                {emailAddress}
                            </a>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
