'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

function StarField() {
    const stars = useMemo(
        () =>
            Array.from({ length: 60 }).map((_, i) => ({
                id: i,
                left: Math.random() * 100,
                top: Math.random() * 55,
                size: 0.5 + Math.random() * 1.5,
                opacity: 0.35 + Math.random() * 0.55,
                delay: Math.random() * 6,
                duration: 3 + Math.random() * 4,
            })),
        []
    )

    const sparkles = useMemo(
        () =>
            [
                { top: 18, left: 88, size: 18, delay: 0 },
                { top: 44, left: 94, size: 22, delay: 1.5 },
                { top: 12, left: 72, size: 14, delay: 3 },
                { top: 32, left: 8, size: 16, delay: 2 },
                { top: 58, left: 96, size: 20, delay: 4.5 },
            ],
        []
    )

    return (
        <div className="pointer-events-none absolute inset-0 z-[2]">
            {stars.map((s) => (
                <motion.span
                    key={s.id}
                    className="absolute rounded-full bg-white"
                    style={{
                        left: `${s.left}%`,
                        top: `${s.top}%`,
                        width: `${s.size}px`,
                        height: `${s.size}px`,
                        boxShadow: '0 0 4px rgba(255,255,255,0.6)',
                    }}
                    initial={{ opacity: s.opacity }}
                    animate={{ opacity: [s.opacity, s.opacity * 0.3, s.opacity] }}
                    transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
                />
            ))}
            {sparkles.map((sp, i) => (
                <motion.svg
                    key={`sparkle-${i}`}
                    className="absolute"
                    style={{ top: `${sp.top}%`, left: `${sp.left}%`, width: `${sp.size}px`, height: `${sp.size}px` }}
                    viewBox="0 0 24 24"
                    fill="none"
                    initial={{ opacity: 0.5, scale: 0.8 }}
                    animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.1, 0.8], rotate: [0, 45, 0] }}
                    transition={{ duration: 4, delay: sp.delay, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <path
                        d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z"
                        fill="white"
                        opacity="0.9"
                    />
                </motion.svg>
            ))}
        </div>
    )
}

function CloudLayers() {
    return (
        <div className="pointer-events-none absolute inset-0 z-[3]">
            <svg
                className="absolute inset-0 w-full h-full"
                viewBox="0 0 1600 900"
                preserveAspectRatio="xMidYMid slice"
                aria-hidden="true"
            >
                <defs>
                    <filter id="cloudTurb" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.014" numOctaves="3" seed="7" />
                        <feDisplacementMap in="SourceGraphic" scale="95" />
                        <feGaussianBlur stdDeviation="2.5" />
                    </filter>
                    <filter id="cloudTurbSoft" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.009" numOctaves="4" seed="3" />
                        <feDisplacementMap in="SourceGraphic" scale="140" />
                        <feGaussianBlur stdDeviation="6" />
                    </filter>
                    <filter id="cloudTurbDense" x="-20%" y="-20%" width="140%" height="140%">
                        <feTurbulence type="fractalNoise" baseFrequency="0.02" numOctaves="2" seed="12" />
                        <feDisplacementMap in="SourceGraphic" scale="60" />
                        <feGaussianBlur stdDeviation="1.2" />
                    </filter>
                    <linearGradient id="cloudFillWarm" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                        <stop offset="60%" stopColor="#f0f5fb" stopOpacity="0.95" />
                        <stop offset="100%" stopColor="#cfdff5" stopOpacity="0.85" />
                    </linearGradient>
                    <linearGradient id="cloudFillCool" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
                        <stop offset="100%" stopColor="#b9cde8" stopOpacity="0.6" />
                    </linearGradient>
                </defs>

                {/* Far background cloud band — very diffuse */}
                <g filter="url(#cloudTurbSoft)" opacity="0.55">
                    <ellipse cx="400" cy="620" rx="700" ry="150" fill="url(#cloudFillCool)" />
                    <ellipse cx="1250" cy="550" rx="500" ry="120" fill="url(#cloudFillCool)" />
                </g>

                {/* Mid cloud layer */}
                <g filter="url(#cloudTurb)" opacity="0.85">
                    <ellipse cx="220" cy="720" rx="460" ry="170" fill="url(#cloudFillWarm)" />
                    <ellipse cx="540" cy="760" rx="380" ry="150" fill="url(#cloudFillWarm)" />
                    <ellipse cx="380" cy="640" rx="240" ry="140" fill="url(#cloudFillWarm)" />
                </g>

                {/* Foreground dense cumulus — top-left to evoke image 1 */}
                <g filter="url(#cloudTurbDense)" opacity="0.96">
                    <ellipse cx="180" cy="420" rx="240" ry="180" fill="url(#cloudFillWarm)" />
                    <ellipse cx="330" cy="360" rx="200" ry="140" fill="url(#cloudFillWarm)" />
                    <ellipse cx="90" cy="480" rx="160" ry="120" fill="url(#cloudFillWarm)" />
                    <ellipse cx="280" cy="500" rx="220" ry="130" fill="url(#cloudFillWarm)" />
                </g>

                {/* Additional mid-right puff */}
                <g filter="url(#cloudTurbDense)" opacity="0.8">
                    <ellipse cx="1400" cy="700" rx="280" ry="140" fill="url(#cloudFillWarm)" />
                    <ellipse cx="1500" cy="640" rx="200" ry="110" fill="url(#cloudFillWarm)" />
                </g>
            </svg>

            {/* Slow horizontal drift — very subtle */}
            <motion.div
                className="absolute inset-0 opacity-40"
                animate={{ x: [0, 40, 0] }}
                transition={{ duration: 60, repeat: Infinity, ease: 'easeInOut' }}
            >
                <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 1600 900"
                    preserveAspectRatio="xMidYMid slice"
                    aria-hidden="true"
                >
                    <g filter="url(#cloudTurbSoft)" opacity="0.4">
                        <ellipse cx="900" cy="300" rx="260" ry="70" fill="#ffffff" />
                        <ellipse cx="1200" cy="220" rx="180" ry="50" fill="#ffffff" />
                    </g>
                </svg>
            </motion.div>
        </div>
    )
}

function WatercolorGrain() {
    return (
        <>
            <svg className="absolute inset-0 pointer-events-none z-[4] opacity-[0.18] mix-blend-overlay w-full h-full" aria-hidden="true">
                <filter id="paperGrain">
                    <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" stitchTiles="stitch" />
                    <feColorMatrix values="0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 0 0.5  0 0 0 1 0" />
                </filter>
                <rect width="100%" height="100%" filter="url(#paperGrain)" />
            </svg>
            <svg className="absolute inset-0 pointer-events-none z-[4] opacity-[0.35] w-full h-full" aria-hidden="true">
                <filter id="splatter">
                    <feTurbulence type="turbulence" baseFrequency="0.04" numOctaves="2" seed="5" />
                    <feColorMatrix values="0 0 0 0 0.55  0 0 0 0 0.65  0 0 0 0 0.85  0 0 0 0.12 0" />
                    <feComposite in2="SourceGraphic" operator="in" />
                </filter>
                <rect width="100%" height="100%" filter="url(#splatter)" opacity="0.5" />
            </svg>
        </>
    )
}

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
            className="relative min-h-screen w-full overflow-hidden isolate flex items-start justify-center"
            data-header-theme="dark"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            {/* Layer 0 — Sky gradient base: deep cosmic blue at top → sky blue → cream */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        'linear-gradient(180deg, #0b1e3f 0%, #1e3a72 18%, #3b6fc4 44%, #7ea9dd 64%, #cfe0f3 85%, #f0f5fb 100%)',
                }}
            />

            {/* Layer 1 — Atmospheric depth wash (darker top corners, warm glow center) */}
            <div
                className="absolute inset-0 z-[1]"
                style={{
                    background:
                        'radial-gradient(120% 80% at 50% 100%, rgba(255,255,255,0.55) 0%, transparent 55%), radial-gradient(100% 70% at 15% 25%, rgba(12,24,52,0.55) 0%, transparent 55%), radial-gradient(80% 50% at 90% 15%, rgba(12,24,52,0.35) 0%, transparent 50%)',
                }}
            />

            {/* Layer 2 — Starfield */}
            <StarField />

            {/* Layer 3 — Watercolor clouds */}
            <CloudLayers />

            {/* Layer 4 — Paper grain + watercolor splatter */}
            <WatercolorGrain />

            {/* Layer 5 — Subtle vignette */}
            <div className="absolute inset-0 z-[5] pointer-events-none" style={{ boxShadow: 'inset 0 0 200px 40px rgba(11,30,63,0.3)' }} />

            {/* Bottom soft fade to next section */}
            <div className="absolute inset-x-0 bottom-0 h-40 z-[6] pointer-events-none bg-gradient-to-b from-transparent via-[#f0f5fb]/50 to-[#FAFAFA]" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 md:pt-40 pb-32 text-center">
                <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 border border-white/25 backdrop-blur-md text-white/95 text-xs sm:text-sm font-semibold tracking-wide mb-8 shadow-[0_4px_24px_rgba(0,0,0,0.15)]"
                >
                    <Sparkles className="w-3.5 h-3.5 text-cyan-200" />
                    {tagline}
                </motion.div>

                <motion.h1
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="text-[clamp(2.25rem,6vw,5.5rem)] font-bold tracking-tight text-white leading-[1.05] mb-6 drop-shadow-[0_2px_20px_rgba(11,30,63,0.4)]"
                >
                    {title}
                    <br className="hidden sm:block" />
                    <span className="inline-flex items-baseline gap-x-3 flex-wrap justify-center mt-1 sm:mt-2">
                        {intoThe && <span>{intoThe}</span>}
                        <span className="relative inline-block overflow-hidden align-baseline" style={{ minWidth: '4ch' }}>
                            <AnimatePresence mode="wait">
                                <motion.span
                                    key={cyclingWords[wordIndex]}
                                    initial={{ opacity: 0, y: 28, filter: 'blur(8px)' }}
                                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                                    exit={{ opacity: 0, y: -28, filter: 'blur(8px)' }}
                                    transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                                    className="inline-block italic font-serif text-[#e0f2ff]"
                                    style={{ textShadow: '0 2px 4px rgba(11,30,63,0.7), 0 4px 24px rgba(11,30,63,0.55), 0 0 48px rgba(162,210,255,0.5)' }}
                                >
                                    {cyclingWords[wordIndex]}
                                </motion.span>
                            </AnimatePresence>
                        </span>
                        {titleSuffix && <span>{titleSuffix}</span>}
                    </span>
                </motion.h1>

                <motion.p
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="max-w-2xl mx-auto text-base sm:text-lg md:text-xl text-white leading-relaxed mb-10 font-light"
                    style={{ textShadow: '0 1px 2px rgba(11,30,63,0.6), 0 2px 18px rgba(11,30,63,0.55), 0 0 40px rgba(11,30,63,0.35)' }}
                >
                    {description}
                </motion.p>

                <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
                >
                    <Link
                        href={l('/contact')}
                        className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-white text-[#0b1e3f] font-semibold shadow-[0_10px_40px_rgba(255,255,255,0.25)] hover:bg-cyan-50 hover:shadow-[0_14px_50px_rgba(255,255,255,0.35)] transition-all duration-300 w-full sm:w-auto"
                    >
                        {getStarted}
                        <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                    </Link>
                    <Link
                        href={l('/services')}
                        className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full border-2 border-white/80 hover:border-white text-white font-semibold backdrop-blur-md bg-[#0b1e3f]/30 hover:bg-[#0b1e3f]/50 transition-all duration-300 w-full sm:w-auto shadow-[0_6px_24px_rgba(11,30,63,0.35)]"
                    >
                        {viewServices}
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.75 }}
                    transition={{ duration: 1.2, delay: 0.8 }}
                    className="mt-16 flex items-center justify-center gap-3 text-white/60 text-xs sm:text-sm tracking-[0.25em] uppercase"
                >
                    <span className="h-px w-8 bg-white/30" />
                    <span>Istanbul · Riyadh · Dubai</span>
                    <span className="h-px w-8 bg-white/30" />
                </motion.div>
            </div>
        </section>
    )
}
