'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

const STAR_COUNT = 180
const STREAK_COUNT = 36

type Star = { cx: number; cy: number; r: number; dur: number; delay: number; min: number; max: number }
type Streak = { angle: number; len: number; dist: number; dur: number; delay: number; op: number }

function useStars(count: number): Star[] {
    const [stars] = useState<Star[]>(() => {
        const W = 1600
        const H = 900
        return Array.from({ length: count }, () => {
            const u = Math.random()
            const v = Math.random()
            const x = (1 - Math.pow(1 - u, 1.7)) * W
            const y = Math.pow(v, 1.7) * H * 0.8
            const big = Math.random() < 0.1
            const mid = Math.random() < 0.35
            const r = big ? 1.9 : mid ? 1.15 : 0.65
            return {
                cx: Number(x.toFixed(1)),
                cy: Number(y.toFixed(1)),
                r,
                dur: Number((2 + Math.random() * 4).toFixed(2)),
                delay: Number((Math.random() * 5).toFixed(2)),
                min: Number((0.15 + Math.random() * 0.25).toFixed(2)),
                max: Number((0.75 + Math.random() * 0.25).toFixed(2)),
            }
        })
    })
    return stars
}

function useStreaks(count: number): Streak[] {
    const [streaks] = useState<Streak[]>(() =>
        Array.from({ length: count }, () => {
            const dur = Number((1.5 + Math.random() * 2.2).toFixed(2))
            return {
                angle: Number((Math.random() * 360).toFixed(1)),
                len: Number((40 + Math.random() * 120).toFixed(0)),
                dist: Number((50 + Math.random() * 70).toFixed(0)),
                dur,
                delay: Number((-Math.random() * dur).toFixed(2)),
                op: Number((0.4 + Math.random() * 0.5).toFixed(2)),
            }
        })
    )
    return streaks
}

export default function CloudHero() {
    const { t, locale } = useLanguage()
    const isRTL = locale === 'ar'

    const cyclingWords = (t.home?.hero?.titleHighlights as string[]) || ['Cloud', 'Internet', 'Web']
    const [wordIndex, setWordIndex] = useState(0)
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

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

    const stars = useStars(STAR_COUNT)
    const streaks = useStreaks(STREAK_COUNT)

    // Pointer-move parallax — 5 depth values per scene's 5 layers
    const heroRef = useRef<HTMLElement>(null)
    const rafRef = useRef<number | null>(null)
    const targetRef = useRef({ x: 0, y: 0 })
    const currentRef = useRef({ x: 0, y: 0 })
    const DEPTHS = [6, 10, 16, 22, 28]

    const applyTranslates = () => {
        const hero = heroRef.current
        if (!hero) return
        const stages = hero.querySelectorAll<HTMLDivElement>('.sky-stage')
        stages.forEach((stage) => {
            const layers = stage.querySelectorAll<HTMLDivElement>('.layer')
            layers.forEach((layer, i) => {
                const depth = DEPTHS[i] || 6
                layer.style.translate = `${(currentRef.current.x * depth).toFixed(2)}px ${(currentRef.current.y * depth).toFixed(2)}px`
            })
        })
    }

    const tick = () => {
        currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.06
        currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.06
        applyTranslates()
        if (
            Math.abs(targetRef.current.x - currentRef.current.x) > 0.001 ||
            Math.abs(targetRef.current.y - currentRef.current.y) > 0.001
        ) {
            rafRef.current = requestAnimationFrame(tick)
        } else {
            rafRef.current = null
        }
    }

    const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
        const hero = heroRef.current
        if (!hero) return
        const r = hero.getBoundingClientRect()
        targetRef.current.x = ((e.clientX - r.left) / r.width - 0.5) * 2
        targetRef.current.y = ((e.clientY - r.top) / r.height - 0.5) * 2
        if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick)
    }

    const handlePointerLeave = () => {
        targetRef.current.x = 0
        targetRef.current.y = 0
        if (rafRef.current == null) rafRef.current = requestAnimationFrame(tick)
    }

    useEffect(() => {
        return () => {
            if (rafRef.current != null) {
                cancelAnimationFrame(rafRef.current)
                rafRef.current = null
            }
        }
    }, [])

    return (
        <>
            <style jsx>{`
                .hero {
                    perspective: 1400px;
                    perspective-origin: 50% 55%;
                    background: #0a1930;
                    isolation: isolate;
                }
                .camera {
                    position: absolute;
                    inset: 0;
                    transform-style: preserve-3d;
                    will-change: transform, filter, opacity;
                }
                .camera.a {
                    animation: cam-a 36s ease-in-out infinite;
                }
                @keyframes cam-a {
                    0% { transform: scale(1) translateZ(0); filter: blur(0) brightness(1); opacity: 1; }
                    25% { transform: scale(1.22) translateZ(70px); filter: blur(1px) brightness(1.03); opacity: 1; }
                    33% { transform: scale(1.45) translateZ(140px); filter: blur(3px) brightness(1.06); opacity: 0.5; }
                    40% { transform: scale(1.6) translateZ(200px); filter: blur(5px) brightness(1.08); opacity: 0; }
                    96% { transform: scale(1.6) translateZ(200px); filter: blur(5px) brightness(1.08); opacity: 0; }
                    100% { transform: scale(1) translateZ(0); filter: blur(0) brightness(1); opacity: 1; }
                }
                .camera.b {
                    opacity: 0;
                    animation: cam-b 36s ease-in-out infinite;
                }
                @keyframes cam-b {
                    0%, 26% { opacity: 0; transform: scale(1.6) translateZ(-200px); filter: blur(5px) brightness(1.08); }
                    33% { opacity: 0.5; transform: scale(1.45) translateZ(-140px); filter: blur(3px) brightness(1.06); }
                    40% { opacity: 1; transform: scale(1.3) translateZ(-80px); filter: blur(2px) brightness(1.03); }
                    50% { opacity: 1; transform: scale(1.1) translateZ(-20px); filter: blur(0.5px) brightness(1.01); }
                    60% { opacity: 1; transform: scale(1.3) translateZ(80px); filter: blur(2px) brightness(1.03); }
                    66% { opacity: 0.5; transform: scale(1.45) translateZ(140px); filter: blur(3px) brightness(1.06); }
                    73% { opacity: 0; transform: scale(1.6) translateZ(200px); filter: blur(5px) brightness(1.08); }
                    100% { opacity: 0; }
                }
                .camera.b :global(.layer) { background-image: url('/images/homepage/clouds-b.webp'); }
                .camera.c {
                    opacity: 0;
                    animation: cam-c 36s ease-in-out infinite;
                }
                @keyframes cam-c {
                    0%, 60% { opacity: 0; transform: scale(1.6) translateZ(-200px); filter: blur(5px) brightness(1.08); }
                    66% { opacity: 0.5; transform: scale(1.45) translateZ(-140px); filter: blur(3px) brightness(1.06); }
                    73% { opacity: 1; transform: scale(1.3) translateZ(-80px); filter: blur(2px) brightness(1.03); }
                    83% { opacity: 1; transform: scale(1.1) translateZ(-20px); filter: blur(0.5px) brightness(1.01); }
                    93% { opacity: 1; transform: scale(1.3) translateZ(80px); filter: blur(2px) brightness(1.03); }
                    99% { opacity: 0.5; transform: scale(1.45) translateZ(140px); filter: blur(3px) brightness(1.06); }
                    100% { opacity: 0; transform: scale(1.6) translateZ(200px); filter: blur(5px) brightness(1.08); }
                }
                .camera.c :global(.layer) { background-image: url('/images/homepage/clouds-c.webp'); }

                .sky-stage { position: absolute; inset: 0; }
                .layer {
                    position: absolute;
                    inset: -15%;
                    background-image: url('/images/homepage/clouds.webp');
                    background-size: cover;
                    background-position: center 55%;
                    will-change: transform;
                    transform: translateZ(0);
                    backface-visibility: hidden;
                }
                .layer.base {
                    animation: base-drift 55s ease-in-out infinite alternate;
                    filter: saturate(1.1) contrast(1.05) brightness(1.02);
                }
                @keyframes base-drift {
                    0% { transform: scale(1.08) translate3d(-1%, 0, 0); }
                    100% { transform: scale(1.14) translate3d(1.5%, -1%, 0); }
                }
                .layer.drift-r {
                    mix-blend-mode: screen;
                    opacity: 0.4;
                    filter: blur(3px) brightness(1.2) contrast(1.1);
                    animation: drift-right 35s linear infinite;
                }
                @keyframes drift-right {
                    0% { transform: scale(1.3) translate3d(-8%, 1%, 0); }
                    100% { transform: scale(1.3) translate3d(8%, -2%, 0); }
                }
                .layer.drift-l {
                    mix-blend-mode: soft-light;
                    opacity: 0.6;
                    filter: blur(12px) brightness(1.1);
                    animation: drift-left 50s linear infinite;
                }
                @keyframes drift-left {
                    0% { transform: scale(1.35) translate3d(7%, 1%, 0); }
                    100% { transform: scale(1.35) translate3d(-7%, -2%, 0); }
                }
                .layer.churn {
                    mix-blend-mode: screen;
                    opacity: 0.35;
                    filter: url(#cloudTurbFilter) blur(1px) brightness(1.1);
                    animation: churn-drift 30s ease-in-out infinite alternate;
                }
                @keyframes churn-drift {
                    0% { transform: scale(1.25) translate3d(-2%, 0, 0); }
                    100% { transform: scale(1.3) translate3d(2%, -1.5%, 0); }
                }
                .layer.haze {
                    mix-blend-mode: soft-light;
                    opacity: 0.55;
                    filter: blur(24px);
                    animation: haze 26s ease-in-out infinite alternate;
                }
                @keyframes haze {
                    0% { transform: scale(1.35) translate3d(-1%, 2%, 0); }
                    100% { transform: scale(1.42) translate3d(2%, -1%, 0); }
                }

                .chroma {
                    position: absolute; inset: 0; z-index: 3;
                    pointer-events: none; opacity: 0;
                    background:
                        radial-gradient(100% 100% at 50% 50%, transparent 50%, rgba(140, 180, 255, 0.08) 65%, transparent 80%),
                        radial-gradient(100% 100% at 50% 50%, transparent 55%, rgba(255, 180, 140, 0.08) 70%, transparent 85%);
                    mix-blend-mode: screen;
                    animation: chroma-pulse 30s linear infinite;
                }
                @keyframes chroma-pulse {
                    0%, 25%, 40%, 55%, 70%, 85%, 100% { opacity: 0; }
                    30%, 62%, 92% { opacity: 1; }
                }

                .grade {
                    position: absolute; inset: 0; z-index: 4;
                    background:
                        radial-gradient(60% 40% at 22% 18%, rgba(255, 236, 205, 0.2), transparent 65%),
                        radial-gradient(80% 60% at 80% 0%, rgba(140, 185, 255, 0.18), transparent 60%),
                        radial-gradient(120% 80% at 50% 110%, rgba(8, 18, 40, 0.4), transparent 60%);
                    mix-blend-mode: screen;
                    pointer-events: none;
                }

                .rays {
                    position: absolute; inset: 0; z-index: 5;
                    pointer-events: none; opacity: 0.5; mix-blend-mode: screen;
                }
                .ray {
                    position: absolute; top: -20%; left: 0;
                    width: 140%; height: 160%;
                    background: linear-gradient(100deg, transparent 40%, rgba(255, 240, 210, 0.16) 48%, rgba(255, 240, 210, 0.24) 50%, rgba(255, 240, 210, 0.16) 52%, transparent 60%);
                    transform-origin: 18% 0%;
                    animation: ray-sweep 18s ease-in-out infinite alternate;
                    filter: blur(8px);
                }
                .ray.r2 {
                    animation-duration: 26s;
                    animation-delay: -6s;
                    opacity: 0.6;
                    background: linear-gradient(105deg, transparent 42%, rgba(220, 235, 255, 0.14) 50%, transparent 58%);
                }
                @keyframes ray-sweep {
                    0% { transform: rotate(-2deg) translateX(-4%); }
                    100% { transform: rotate(3deg) translateX(4%); }
                }

                .stars-wrap { position: absolute; inset: 0; z-index: 6; pointer-events: none; }
                .stars-wrap :global(svg) { width: 100%; height: 100%; display: block; }
                .star { fill: #fff; transform-box: fill-box; transform-origin: center; }
                .star-pulse { animation: twinkle var(--dur, 3.2s) ease-in-out infinite; animation-delay: var(--delay, 0s); }
                @keyframes twinkle {
                    0%, 100% { opacity: var(--min, 0.25); transform: scale(0.85); }
                    50% { opacity: var(--max, 1); transform: scale(1.25); }
                }

                .streaks { position: absolute; inset: 0; z-index: 7; pointer-events: none; overflow: hidden; }
                .streak {
                    position: absolute; width: 2px; height: var(--len, 60px);
                    top: 50%; left: 50%;
                    border-radius: 2px;
                    background: linear-gradient(180deg, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0));
                    transform-origin: center top;
                    opacity: 0;
                    animation: streak var(--dur, 2s) linear infinite;
                    animation-delay: var(--delay, 0s);
                    filter: blur(0.5px);
                }
                @keyframes streak {
                    0% { transform: rotate(var(--angle, 0deg)) translate(0, 0) scale(0.5); opacity: 0; }
                    20% { opacity: var(--op, 0.7); }
                    80% { opacity: var(--op, 0.7); }
                    100% { transform: rotate(var(--angle, 0deg)) translate(0, var(--dist, 70vh)) scale(1.4); opacity: 0; }
                }

                .sparkle {
                    position: absolute; z-index: 8; pointer-events: none;
                    animation: sparkle-pulse 3.8s ease-in-out infinite;
                    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.7));
                }
                .sparkle.s1 { right: 3.5%; bottom: 9%; width: 30px; height: 30px; animation-delay: 0s; }
                .sparkle.s2 { right: 9%; bottom: 20%; width: 14px; height: 14px; animation-delay: 1.4s; }
                .sparkle.s3 { left: 12%; top: 34%; width: 18px; height: 18px; animation-delay: 2.2s; opacity: 0.65; }
                .sparkle.s4 { right: 22%; top: 16%; width: 12px; height: 12px; animation-delay: 0.6s; opacity: 0.75; }
                @keyframes sparkle-pulse {
                    0%, 100% { opacity: 0.25; transform: scale(0.8) rotate(0deg); }
                    50% { opacity: 1; transform: scale(1.15) rotate(90deg); }
                }

                .vignette {
                    position: absolute; inset: 0; z-index: 9;
                    background: radial-gradient(130% 100% at 50% 50%, transparent 58%, rgba(4, 10, 22, 0.55) 100%);
                    pointer-events: none;
                }

                .bottom-fade {
                    position: absolute; inset-inline: 0; bottom: 0;
                    height: 6rem;
                    z-index: 10; pointer-events: none;
                    background: linear-gradient(to bottom, transparent, rgba(250, 250, 250, 0.4) 55%, #fafafa 100%);
                }
                @media (min-width: 640px) { .bottom-fade { height: 9rem; } }
                @media (min-width: 768px) { .bottom-fade { height: 11rem; } }

                @media (prefers-reduced-motion: reduce) {
                    .camera,
                    .layer,
                    .star-pulse,
                    .sparkle,
                    .ray,
                    .streak,
                    .chroma {
                        animation: none !important;
                    }
                }
            `}</style>

            {/* SVG turbulence filter for the .churn layer */}
            <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
                <defs>
                    <filter id="cloudTurbFilter">
                        <feTurbulence type="fractalNoise" baseFrequency="0.008 0.014" numOctaves={2} seed={5}>
                            <animate attributeName="baseFrequency" dur="22s" values="0.008 0.014; 0.014 0.008; 0.008 0.014" repeatCount="indefinite" />
                            <animate attributeName="seed" dur="40s" values="5;25;5" repeatCount="indefinite" />
                        </feTurbulence>
                        <feDisplacementMap in="SourceGraphic" scale={55}>
                            <animate attributeName="scale" dur="18s" values="35;75;35" repeatCount="indefinite" />
                        </feDisplacementMap>
                    </filter>
                </defs>
            </svg>

            <section
                ref={heroRef}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                className="hero relative min-h-[92vh] sm:min-h-[95vh] md:min-h-screen w-full overflow-hidden isolate flex items-center justify-center"
                data-header-theme="dark"
                dir={isRTL ? 'rtl' : 'ltr'}
            >
                {/* Scene A */}
                <div className="camera a">
                    <div className="sky-stage">
                        <div className="layer base" />
                        <div className="layer drift-l" />
                        <div className="layer drift-r" />
                        <div className="layer churn" />
                        <div className="layer haze" />
                    </div>
                </div>

                {/* Scene B */}
                <div className="camera b">
                    <div className="sky-stage">
                        <div className="layer base" />
                        <div className="layer drift-l" />
                        <div className="layer drift-r" />
                        <div className="layer churn" />
                        <div className="layer haze" />
                    </div>
                </div>

                {/* Scene C */}
                <div className="camera c">
                    <div className="sky-stage">
                        <div className="layer base" />
                        <div className="layer drift-l" />
                        <div className="layer drift-r" />
                        <div className="layer churn" />
                        <div className="layer haze" />
                    </div>
                </div>

                <div className="chroma" />
                <div className="grade" />

                <div className="rays">
                    <div className="ray" />
                    <div className="ray r2" />
                </div>

                {/* Stars (client-only to avoid hydration mismatch from Math.random) */}
                <div className="stars-wrap">
                    <svg viewBox="0 0 1600 900" preserveAspectRatio="none">
                        {mounted &&
                            stars.map((s, i) => (
                                <circle
                                    key={i}
                                    className="star star-pulse"
                                    cx={s.cx}
                                    cy={s.cy}
                                    r={s.r}
                                    style={{
                                        ['--dur' as any]: `${s.dur}s`,
                                        ['--delay' as any]: `${s.delay}s`,
                                        ['--min' as any]: String(s.min),
                                        ['--max' as any]: String(s.max),
                                    }}
                                />
                            ))}
                    </svg>
                </div>

                {/* Speed streaks (client-only) */}
                <div className="streaks">
                    {mounted &&
                        streaks.map((st, i) => (
                            <span
                                key={i}
                                className="streak"
                                style={{
                                    ['--angle' as any]: `${st.angle}deg`,
                                    ['--len' as any]: `${st.len}px`,
                                    ['--dist' as any]: `${st.dist}vh`,
                                    ['--dur' as any]: `${st.dur}s`,
                                    ['--op' as any]: String(st.op),
                                    animationDelay: `${st.delay}s`,
                                }}
                            />
                        ))}
                </div>

                {/* Sparkles */}
                {['s1', 's2', 's3', 's4'].map((cls) => (
                    <svg key={cls} className={`sparkle ${cls}`} viewBox="0 0 24 24">
                        <path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="#fff" />
                    </svg>
                ))}

                <div className="vignette" />
                <div className="bottom-fade" />

                {/* Content overlay */}
                <div className="relative z-[11] w-full max-w-5xl mx-auto px-5 sm:px-8 lg:px-10 pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 md:pb-28 text-center">
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
        </>
    )
}
