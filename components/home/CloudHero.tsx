'use client'

import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

function StarField() {
    const stars = useMemo(
        () =>
            Array.from({ length: 40 }).map((_, i) => ({
                id: i,
                left: Math.random() * 100,
                top: Math.random() * 50,
                size: 0.5 + Math.random() * 1.2,
                opacity: 0.25 + Math.random() * 0.45,
                delay: Math.random() * 6,
                duration: 3 + Math.random() * 4,
            })),
        []
    )

    const sparkles = useMemo(
        () => [
            { top: 14, left: 82, size: 14, delay: 0 },
            { top: 28, left: 6, size: 12, delay: 1.6 },
            { top: 8, left: 52, size: 10, delay: 3 },
            { top: 38, left: 92, size: 14, delay: 2.2 },
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
                    }}
                    initial={{ opacity: s.opacity }}
                    animate={{ opacity: [s.opacity, s.opacity * 0.25, s.opacity] }}
                    transition={{ duration: s.duration, delay: s.delay, repeat: Infinity, ease: 'easeInOut' }}
                />
            ))}
            {sparkles.map((sp, i) => (
                <motion.svg
                    key={i}
                    className="absolute hidden sm:block"
                    style={{ top: `${sp.top}%`, left: `${sp.left}%`, width: `${sp.size}px`, height: `${sp.size}px` }}
                    viewBox="0 0 24 24"
                    initial={{ opacity: 0.5, scale: 0.85 }}
                    animate={{ opacity: [0.3, 0.9, 0.3], scale: [0.85, 1.05, 0.85], rotate: [0, 45, 0] }}
                    transition={{ duration: 4.5, delay: sp.delay, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <path
                        d="M12 2 L13.3 10.7 L22 12 L13.3 13.3 L12 22 L10.7 13.3 L2 12 L10.7 10.7 Z"
                        fill="rgba(255,255,255,0.85)"
                    />
                </motion.svg>
            ))}
        </div>
    )
}

function AtmosphericLights() {
    return (
        <div className="pointer-events-none absolute inset-0 z-[3] overflow-hidden">
            {/* Upper-left warm dawn wash */}
            <div
                className="absolute -left-[15%] -top-[10%] w-[75%] h-[70%] rounded-full blur-[120px] md:blur-[150px] opacity-60"
                style={{ background: 'radial-gradient(ellipse at center, rgba(240, 200, 170, 0.35) 0%, rgba(180, 200, 240, 0.15) 40%, transparent 70%)' }}
            />

            {/* Right-side soft blue drift */}
            <div
                className="absolute -right-[20%] top-[15%] w-[70%] h-[60%] rounded-full blur-[110px] md:blur-[140px] opacity-70"
                style={{ background: 'radial-gradient(ellipse at center, rgba(180, 215, 255, 0.5) 0%, rgba(140, 180, 230, 0.2) 45%, transparent 75%)' }}
            />

            {/* Bottom-left bright cumulus mass */}
            <motion.div
                className="absolute -left-[20%] bottom-[-15%] w-[85%] h-[70%] rounded-full blur-[100px] md:blur-[130px] opacity-80"
                style={{ background: 'radial-gradient(ellipse at 55% 40%, rgba(255, 255, 255, 0.85) 0%, rgba(235, 245, 255, 0.55) 30%, rgba(200, 220, 245, 0.2) 60%, transparent 80%)' }}
                animate={{ x: [0, 12, 0], y: [0, -8, 0] }}
                transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Right cumulus mass */}
            <motion.div
                className="absolute -right-[15%] bottom-[-10%] w-[75%] h-[65%] rounded-full blur-[90px] md:blur-[120px] opacity-75"
                style={{ background: 'radial-gradient(ellipse at 40% 45%, rgba(255, 255, 255, 0.8) 0%, rgba(230, 240, 255, 0.5) 35%, rgba(195, 215, 240, 0.18) 65%, transparent 80%)' }}
                animate={{ x: [0, -10, 0], y: [0, 6, 0] }}
                transition={{ duration: 34, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Center horizon glow */}
            <div
                className="absolute left-1/2 -translate-x-1/2 bottom-[-5%] w-[120%] h-[45%] rounded-full blur-[100px] opacity-60"
                style={{ background: 'radial-gradient(ellipse at center, rgba(255, 250, 235, 0.55) 0%, rgba(235, 240, 255, 0.25) 40%, transparent 70%)' }}
            />

            {/* Upper-right subtle wisp */}
            <motion.div
                className="absolute right-[5%] top-[20%] w-[50%] h-[25%] rounded-full blur-[80px] opacity-40"
                style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.4) 0%, transparent 70%)' }}
                animate={{ x: [0, 30, 0] }}
                transition={{ duration: 42, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Mid-left faint wisp */}
            <motion.div
                className="absolute left-[-5%] top-[45%] w-[45%] h-[22%] rounded-full blur-[70px] opacity-35"
                style={{ background: 'radial-gradient(ellipse at center, rgba(255,255,255,0.45) 0%, transparent 75%)' }}
                animate={{ x: [0, -20, 0] }}
                transition={{ duration: 38, repeat: Infinity, ease: 'easeInOut' }}
            />
        </div>
    )
}

function PaperTexture() {
    return (
        <svg className="absolute inset-0 pointer-events-none z-[4] opacity-[0.12] mix-blend-overlay w-full h-full" aria-hidden="true">
            <filter id="paperNoise">
                <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
                <feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.55  0 0 0 0 0.75  0 0 0 1 0" />
            </filter>
            <rect width="100%" height="100%" filter="url(#paperNoise)" />
        </svg>
    )
}

function SpeckleSplatter() {
    const dots = useMemo(
        () =>
            Array.from({ length: 45 }).map(() => ({
                left: Math.random() * 100,
                top: 20 + Math.random() * 70,
                size: 1 + Math.random() * 2.5,
                opacity: 0.15 + Math.random() * 0.35,
            })),
        []
    )

    return (
        <div className="pointer-events-none absolute inset-0 z-[5]">
            {dots.map((d, i) => (
                <span
                    key={i}
                    className="absolute rounded-full"
                    style={{
                        left: `${d.left}%`,
                        top: `${d.top}%`,
                        width: `${d.size}px`,
                        height: `${d.size}px`,
                        backgroundColor: `rgba(70, 100, 150, ${d.opacity})`,
                    }}
                />
            ))}
        </div>
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
            className="relative min-h-[92vh] sm:min-h-[95vh] md:min-h-screen w-full overflow-hidden isolate flex items-center justify-center"
            data-header-theme="dark"
            dir={isRTL ? 'rtl' : 'ltr'}
        >
            {/* Base painterly sky gradient */}
            <div
                className="absolute inset-0 z-0"
                style={{
                    background:
                        'linear-gradient(175deg, #0c1d3e 0%, #1f3870 22%, #466fa8 48%, #87b1da 72%, #c9ddf0 90%, #eaf2fa 100%)',
                }}
            />

            {/* Atmospheric depth - darker top corners, warm center-low glow */}
            <div
                className="absolute inset-0 z-[1]"
                style={{
                    background:
                        'radial-gradient(100% 80% at 10% 10%, rgba(8, 18, 42, 0.45) 0%, transparent 55%), radial-gradient(100% 70% at 90% 5%, rgba(8, 18, 42, 0.4) 0%, transparent 55%), radial-gradient(140% 60% at 50% 110%, rgba(255, 245, 225, 0.4) 0%, transparent 50%)',
                }}
            />

            {/* Stars */}
            <StarField />

            {/* Atmospheric cloud washes (the main cloud feeling) */}
            <AtmosphericLights />

            {/* Paper grain */}
            <PaperTexture />

            {/* Watercolor speckles */}
            <SpeckleSplatter />

            {/* Vignette */}
            <div
                className="absolute inset-0 z-[6] pointer-events-none"
                style={{ boxShadow: 'inset 0 -120px 180px -40px rgba(234, 242, 250, 0.55), inset 0 80px 180px -40px rgba(12, 29, 62, 0.3)' }}
            />

            {/* Bottom soft fade to next section */}
            <div className="absolute inset-x-0 bottom-0 h-24 sm:h-32 md:h-40 z-[7] pointer-events-none bg-gradient-to-b from-transparent via-[#eaf2fa]/60 to-[#FAFAFA]" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 md:pb-28 text-center">
                <motion.div
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-1.5 rounded-full bg-white/12 border border-white/25 backdrop-blur-md text-white/95 text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide mb-6 sm:mb-8 shadow-[0_4px_24px_rgba(0,0,0,0.12)]"
                >
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-200" />
                    <span className="uppercase tracking-[0.15em]">{tagline}</span>
                </motion.div>

                <motion.h1
                    initial={false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className="font-bold tracking-tight text-white leading-[1.08] mb-5 sm:mb-6 md:mb-7"
                    style={{
                        fontSize: 'clamp(2.25rem, 7vw, 5.25rem)',
                        textShadow: '0 2px 12px rgba(8,18,42,0.35), 0 6px 42px rgba(8,18,42,0.3)',
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
                                    className="inline-block italic font-serif text-[#e8f4ff]"
                                    style={{ textShadow: '0 2px 6px rgba(8,18,42,0.75), 0 4px 28px rgba(8,18,42,0.55), 0 0 48px rgba(160,210,255,0.4)' }}
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
                    className="max-w-xl md:max-w-2xl mx-auto text-sm sm:text-base md:text-lg text-white leading-relaxed mb-8 sm:mb-10 font-light px-2"
                    style={{ textShadow: '0 1px 3px rgba(8,18,42,0.6), 0 2px 14px rgba(8,18,42,0.45)' }}
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
                        className="group inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-white text-[#0c1d3e] font-semibold text-sm sm:text-base shadow-[0_10px_40px_rgba(255,255,255,0.2)] hover:bg-cyan-50 hover:shadow-[0_14px_50px_rgba(255,255,255,0.3)] transition-all duration-300"
                    >
                        {getStarted}
                        <ArrowRight className={`w-4 h-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} />
                    </Link>
                    <Link
                        href={l('/services')}
                        className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full border-2 border-white/70 hover:border-white text-white font-semibold text-sm sm:text-base backdrop-blur-md bg-[#0c1d3e]/25 hover:bg-[#0c1d3e]/45 transition-all duration-300"
                    >
                        {viewServices}
                    </Link>
                </motion.div>

                <motion.div
                    initial={false}
                    animate={{ opacity: 0.8, y: 0 }}
                    transition={{ duration: 1, delay: 0.6 }}
                    className="mt-12 sm:mt-14 md:mt-16 flex items-center justify-center gap-3 text-white/65 text-[10px] sm:text-xs tracking-[0.3em] uppercase"
                >
                    <span className="h-px w-6 sm:w-8 bg-white/30" />
                    <span>Istanbul · Riyadh · Dubai</span>
                    <span className="h-px w-6 sm:w-8 bg-white/30" />
                </motion.div>
            </div>
        </section>
    )
}
