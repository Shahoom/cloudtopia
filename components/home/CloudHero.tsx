'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export default function CloudHero() {
    const { t, locale } = useLanguage()
    const isRTL = locale === 'ar'

    const cyclingWords = (t.home?.hero?.titleHighlights as string[]) || ['Cloud', 'Internet', 'Web']
    const [wordIndex, setWordIndex] = useState(0)

    useEffect(() => {
        const id = setInterval(() => setWordIndex((i) => (i + 1) % cyclingWords.length), 3000)
        return () => clearInterval(id)
    }, [cyclingWords.length])

    const title = t.home?.hero?.title || 'Elevate Your Business'
    const intoThe = t.home?.hero?.intoThe || 'Into the'
    const titleSuffix = t.home?.hero?.titleSuffix || ''
    const description = t.home?.hero?.description || ''
    const tagline = t.header?.tagline || 'Digital & Cloud Technologies'
    const getStarted = t.home?.hero?.getStarted || 'Get Started'
    const viewServices = t.home?.hero?.viewServices || 'View Services'
    const l = (p: string) => `/${locale}${p === '/' ? '' : p}`

    return (
        <section
            className="relative min-h-[92vh] sm:min-h-[95vh] md:min-h-screen w-full overflow-hidden isolate flex items-center justify-center"
            data-header-theme="dark"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            {/* Photo background — mobile shows cloud mass left of center; desktop shows full frame */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/homepage/cloud.jpg"
                    alt=""
                    role="presentation"
                    fill
                    priority
                    quality={100}
                    sizes="100vw"
                    unoptimized
                    className="object-cover object-[28%_50%] sm:object-[35%_50%] md:object-center"
                    style={{ imageRendering: 'crisp-edges' }}
                />
            </div>

            {/* Layer 2 — Minimal darken behind content only (keeps photo vivid) */}
            <div
                className="absolute inset-0 z-[2] pointer-events-none"
                style={{
                    background:
                        'radial-gradient(ellipse 75% 55% at 50% 58%, rgba(7,15,38,0.42) 0%, rgba(7,15,38,0.18) 45%, transparent 75%)',
                }}
            />

            {/* Layer 3 — Very light top fade so the header reads */}
            <div
                className="absolute inset-x-0 top-0 h-32 sm:h-40 z-[3] pointer-events-none"
                style={{ background: 'linear-gradient(180deg, rgba(7,15,38,0.35) 0%, rgba(7,15,38,0.08) 60%, transparent 100%)' }}
            />

            {/* Layer 4 — Extra sparkle accent (matches the existing one in the photo bottom-right) */}
            <motion.svg
                className="absolute z-[4] pointer-events-none hidden sm:block"
                style={{ top: '22%', left: '8%', width: '18px', height: '18px' }}
                viewBox="0 0 24 24"
                initial={{ opacity: 0.5, scale: 0.9 }}
                animate={{ opacity: [0.4, 1, 0.4], scale: [0.9, 1.15, 0.9], rotate: [0, 45, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <path d="M12 2 L13.3 10.7 L22 12 L13.3 13.3 L12 22 L10.7 13.3 L2 12 L10.7 10.7 Z" fill="rgba(255,255,255,0.9)" />
            </motion.svg>

            <motion.svg
                className="absolute z-[4] pointer-events-none hidden sm:block"
                style={{ top: '42%', right: '6%', width: '14px', height: '14px' }}
                viewBox="0 0 24 24"
                initial={{ opacity: 0.4, scale: 0.9 }}
                animate={{ opacity: [0.3, 0.85, 0.3], scale: [0.9, 1.1, 0.9], rotate: [0, 45, 0] }}
                transition={{ duration: 4.5, delay: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
                <path d="M12 2 L13.3 10.7 L22 12 L13.3 13.3 L12 22 L10.7 13.3 L2 12 L10.7 10.7 Z" fill="rgba(255,255,255,0.85)" />
            </motion.svg>

            {/* Layer 5 — Very subtle vignette */}
            <div
                className="absolute inset-0 z-[5] pointer-events-none"
                style={{ boxShadow: 'inset 0 0 200px 40px rgba(7,15,38,0.22)' }}
            />

            {/* Bottom fade into next section */}
            <div className="absolute inset-x-0 bottom-0 h-28 sm:h-36 md:h-44 z-[6] pointer-events-none bg-gradient-to-b from-transparent via-[#d9e5f2]/30 to-[#FAFAFA]" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 md:pb-28 text-center">
                <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/12 border border-white/30 backdrop-blur-md text-white/95 text-[11px] sm:text-xs md:text-sm font-semibold mb-6 sm:mb-8 shadow-[0_4px_28px_rgba(0,0,0,0.3)]"
                >
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-200" />
                    <span className="uppercase tracking-[0.18em]">{tagline}</span>
                </motion.div>

                <motion.h1
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="font-bold tracking-tight text-white leading-[1.08] mb-5 sm:mb-6 md:mb-7"
                    style={{
                        fontSize: 'clamp(2.25rem, 7vw, 5.25rem)',
                        textShadow:
                            '0 2px 6px rgba(7,15,38,0.75), 0 4px 24px rgba(7,15,38,0.55), 0 0 48px rgba(7,15,38,0.35)',
                    }}
                >
                    {title}
                    <br className="hidden sm:block" />
                    <span className="inline-flex items-baseline gap-x-2 sm:gap-x-3 flex-wrap justify-center mt-1.5 sm:mt-2">
                        {intoThe && <span className="font-semibold">{intoThe}</span>}
                        <span className="relative inline-block align-baseline" style={{ minWidth: '3.5ch' }}>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={cyclingWords[wordIndex]}
                                    initial={{ opacity: 0, y: 22, filter: 'blur(6px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, y: -22, filter: 'blur(6px)' }}
                                    transition={{ duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    className="inline-block italic font-serif text-[#eaf6ff]"
                                    style={{
                                        textShadow:
                                            '0 2px 8px rgba(7,15,38,0.85), 0 6px 32px rgba(7,15,38,0.65), 0 0 56px rgba(170,215,255,0.45)',
                                    }}
                                >
                                    {cyclingWords[wordIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                        {titleSuffix && <span className="font-semibold">{titleSuffix}</span>}
                    </span>
                </motion.h1>

                <motion.p
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="max-w-xl md:max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white/95 leading-relaxed mb-8 sm:mb-10 font-light px-2"
                    style={{
                        textShadow:
                            '0 1px 4px rgba(7,15,38,0.75), 0 3px 18px rgba(7,15,38,0.6), 0 0 42px rgba(7,15,38,0.4)',
                    }}
                >
                    {description}
                </motion.p>

                <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4"
                >
                    <Link
                        href={l('/contact')}
                        className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-[#0c1d3e] font-semibold text-sm sm:text-base shadow-[0_12px_44px_rgba(0,0,0,0.35)] hover:bg-cyan-50 hover:shadow-[0_18px_56px_rgba(0,0,0,0.45)] transition-all duration-300"
                    >
                        {getStarted}
                        <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                    </Link>
                    <Link
                        href={l('/services')}
                        className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border-2 border-white/80 hover:border-white text-white font-semibold text-sm sm:text-base backdrop-blur-md bg-[#0c1d3e]/30 hover:bg-[#0c1d3e]/50 transition-all duration-300 shadow-[0_8px_30px_rgba(0,0,0,0.3)]"
                    >
                        {viewServices}
                    </Link>
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{ opacity: 0.85, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-12 sm:mt-14 md:mt-16 flex items-center justify-center gap-3 text-white text-[10px] sm:text-xs tracking-[0.32em] uppercase"
                    style={{ textShadow: '0 2px 12px rgba(7,15,38,0.8)' }}
                >
                    <span className="h-px w-6 sm:w-8 bg-white/40" />
                    <span>Istanbul · Riyadh · Dubai</span>
                    <span className="h-px w-6 sm:w-8 bg-white/40" />
                </motion.div>
            </div>
        </section>
    )
}
