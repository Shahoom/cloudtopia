'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'

const STAR_COUNT = 40

type Star = { cx: number; cy: number; r: number; dur: number; delay: number; min: number; max: number }

function useStars(count: number): Star[] {
    const [stars] = useState<Star[]>(() => {
        const W = 1600
        const H = 900
        return Array.from({ length: count }, () => {
            const u = Math.random()
            const v = Math.random()
            const x = (1 - Math.pow(1 - u, 1.7)) * W
            const y = Math.pow(v, 1.7) * H * 0.8
            const big = Math.random() < 0.08
            const mid = Math.random() < 0.32
            const r = big ? 1.7 : mid ? 1.05 : 0.55
            return {
                cx: Number(x.toFixed(1)),
                cy: Number(y.toFixed(1)),
                r,
                dur: Number((2 + Math.random() * 4).toFixed(2)),
                delay: Number((Math.random() * 5).toFixed(2)),
                min: Number((0.15 + Math.random() * 0.25).toFixed(2)),
                max: Number((0.7 + Math.random() * 0.25).toFixed(2)),
            }
        })
    })
    return stars
}

export default function CloudHero() {
    const { t, locale } = useLanguage()
    const isRTL = locale === 'ar'

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    const heroCopy = locale === 'ar'
        ? {
            title: 'شركة برمجيات وسحابة تبني حلولاً رقمية واضحة',
            description:
                'كلاود توبيا تطور مواقع شركات، متاجر إلكترونية، تطبيقات ويب وجوال، أنظمة CRM وERP، ترحيل سحابي، نقل بيانات، وأتمتة بالذكاء الاصطناعي للشركات التي تريد نتيجة قابلة للقياس.',
            proof: ['استشارة مجانية', 'معاينة ديمو مجانية', 'نطاق وسعر واضحان'],
        }
        : {
            title: 'Software and cloud solutions built with business clarity',
            description:
                'CloudTopia builds company websites, e-commerce stores, web and mobile apps, CRM and ERP systems, cloud migration, data migration, and AI automation for businesses that need measurable results.',
            proof: ['Free consultation', 'Free custom demo preview', 'Clear scope and pricing'],
        }
    const title = heroCopy.title
    const description = heroCopy.description
    const tagline = t.header?.tagline || 'Digital & Cloud Technologies'
    const freeConsultation = t.home?.hero?.freeConsultation || 'Free Consultation'
    const viewServices = t.home?.hero?.viewServices || 'View Services'
    const whatsappUrl = `https://wa.me/905011511116?text=${encodeURIComponent(
        locale === 'ar'
            ? 'مرحباً كلاود توبيا، أود استشارة مجانية.'
            : false
                ? 'Merhaba CloudTopia, ücretsiz danışmak istiyorum.'
                : 'Hi CloudTopia, I\'d like a free consultation.'
    )}`
    const l = (p: string) => localePath(locale, p)

    const stars = useStars(STAR_COUNT)

    // Pointer-move parallax — 5 depth values per scene's 5 layers
    const heroRef = useRef<HTMLElement>(null)
    const rafRef = useRef<number | null>(null)
    const targetRef = useRef({ x: 0, y: 0 })
    const currentRef = useRef({ x: 0, y: 0 })
    const DEPTHS = [6, 14]

    const applyTranslates = () => {
        const hero = heroRef.current
        if (!hero) return
        const stages = hero.querySelectorAll<HTMLDivElement>('.sky-stage')
        stages.forEach((stage) => {
            const layers = stage.querySelectorAll<HTMLDivElement>('.layer')
            layers.forEach((layer, i) => {
                const depth = DEPTHS[i] || 5
                layer.style.translate = `${(currentRef.current.x * depth).toFixed(2)}px ${(currentRef.current.y * depth).toFixed(2)}px`
            })
        })
    }

    const tick = () => {
        currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.05
        currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.05
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
                    /* Bright sky fallback — never dark, matches the cloud photo palette
                       so there's no dark flash while WebPs load or between scenes. */
                    background:
                        radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255, 255, 255, 0.35), transparent 60%),
                        radial-gradient(ellipse 120% 70% at 50% 110%, rgba(186, 230, 253, 0.55), transparent 55%),
                        linear-gradient(180deg, #93c5fd 0%, #bae6fd 40%, #e0f2fe 75%, #f0f9ff 100%);
                    isolation: isolate;
                }
                .camera {
                    position: absolute;
                    inset: 0;
                    transform-style: preserve-3d;
                    will-change: transform, opacity;
                }
                /* Camera cycle — opacity + very subtle scale only (GPU-composited).
                   Dropped animated blur/brightness filters (huge perf win). */
                .camera.a { animation: cam-a 45s ease-in-out infinite; }
                @keyframes cam-a {
                    0%   { transform: scale(1);    opacity: 1; }
                    30%  { transform: scale(1.12); opacity: 1; }
                    40%  { transform: scale(1.22); opacity: 0; }
                    96%  { transform: scale(1.22); opacity: 0; }
                    100% { transform: scale(1);    opacity: 1; }
                }
                .camera.b { opacity: 0; animation: cam-b 45s ease-in-out infinite; }
                @keyframes cam-b {
                    0%, 32% { opacity: 0; transform: scale(1.22); }
                    40%     { opacity: 1; transform: scale(1.12); }
                    55%     { opacity: 1; transform: scale(1.04); }
                    68%     { opacity: 1; transform: scale(1.12); }
                    72%     { opacity: 0; transform: scale(1.22); }
                    100%    { opacity: 0; }
                }
                .camera.b :global(.layer) { background-image: url('/images/homepage/clouds-b.webp'); }
                .camera.c { opacity: 0; animation: cam-c 45s ease-in-out infinite; }
                @keyframes cam-c {
                    0%, 66% { opacity: 0; transform: scale(1.22); }
                    72%     { opacity: 1; transform: scale(1.12); }
                    85%     { opacity: 1; transform: scale(1.04); }
                    96%     { opacity: 1; transform: scale(1.12); }
                    100%    { opacity: 0; transform: scale(1.22); }
                }
                .camera.c :global(.layer) { background-image: url('/images/homepage/clouds-c.webp'); }

                .sky-stage {
                    position: absolute;
                    inset: 0;
                    /* Bright sky fallback behind the cloud image while it loads */
                    background: linear-gradient(180deg, #93c5fd 0%, #bae6fd 50%, #e0f2fe 100%);
                }
                .layer {
                    position: absolute;
                    inset: -10%;
                    background-image: url('/images/homepage/clouds.webp');
                    background-size: cover;
                    background-position: center 55%;
                    transform: translateZ(0);
                    backface-visibility: hidden;
                }
                .layer.base {
                    animation: base-drift 80s ease-in-out infinite alternate;
                    filter: saturate(1.05) contrast(1.02);
                }
                @keyframes base-drift {
                    0% { transform: scale(1.08) translate3d(-1%, 0, 0); }
                    100% { transform: scale(1.12) translate3d(1.5%, -1%, 0); }
                }
                /* drift-l / drift-r / churn / haze merged into a single cheap tint pass */
                .layer.tint {
                    mix-blend-mode: soft-light;
                    opacity: 0.4;
                    animation: tint-drift 70s linear infinite;
                }
                @keyframes tint-drift {
                    0% { transform: scale(1.25) translate3d(-4%, 0, 0); }
                    100% { transform: scale(1.25) translate3d(4%, -1%, 0); }
                }

                .grade {
                    position: absolute; inset: 0; z-index: 4;
                    background:
                        radial-gradient(60% 40% at 22% 18%, rgba(255, 236, 205, 0.18), transparent 65%),
                        radial-gradient(80% 60% at 80% 0%, rgba(140, 185, 255, 0.16), transparent 60%),
                        radial-gradient(120% 80% at 50% 110%, rgba(8, 18, 40, 0.32), transparent 60%);
                    mix-blend-mode: screen;
                    pointer-events: none;
                }

                .rays {
                    position: absolute; inset: 0; z-index: 5;
                    pointer-events: none; opacity: 0.4; mix-blend-mode: screen;
                }
                .ray {
                    position: absolute; top: -20%; left: 0;
                    width: 140%; height: 160%;
                    background: linear-gradient(100deg, transparent 40%, rgba(255, 240, 210, 0.14) 48%, rgba(255, 240, 210, 0.2) 50%, rgba(255, 240, 210, 0.14) 52%, transparent 60%);
                    transform-origin: 18% 0%;
                    animation: ray-sweep 22s ease-in-out infinite alternate;
                    filter: blur(8px);
                }
                .ray.r2 {
                    animation-duration: 30s;
                    animation-delay: -6s;
                    opacity: 0.5;
                    background: linear-gradient(105deg, transparent 42%, rgba(220, 235, 255, 0.12) 50%, transparent 58%);
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

                .sparkle {
                    position: absolute; z-index: 8; pointer-events: none;
                    animation: sparkle-pulse 4.2s ease-in-out infinite;
                    filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.65));
                }
                .sparkle.s1 { right: 4%; bottom: 10%; width: 26px; height: 26px; animation-delay: 0s; }
                .sparkle.s2 { right: 9%; bottom: 22%; width: 12px; height: 12px; animation-delay: 1.6s; }
                .sparkle.s3 { left: 12%; top: 36%; width: 16px; height: 16px; animation-delay: 2.4s; opacity: 0.6; }
                .sparkle.s4 { right: 22%; top: 18%; width: 10px; height: 10px; animation-delay: 0.8s; opacity: 0.65; }
                @keyframes sparkle-pulse {
                    0%, 100% { opacity: 0.25; transform: scale(0.85) rotate(0deg); }
                    50% { opacity: 0.95; transform: scale(1.1) rotate(90deg); }
                }

                .vignette {
                    position: absolute; inset: 0; z-index: 9;
                    background: radial-gradient(130% 100% at 50% 50%, transparent 58%, rgba(4, 10, 22, 0.45) 100%);
                    pointer-events: none;
                }

                .bottom-fade {
                    position: absolute; inset-inline: 0; bottom: 0;
                    height: 6rem;
                    z-index: 10; pointer-events: none;
                    background: linear-gradient(to bottom, transparent, rgba(250, 250, 250, 0.35) 55%, #fafafa 100%);
                }
                @media (min-width: 640px) { .bottom-fade { height: 9rem; } }
                @media (min-width: 768px) { .bottom-fade { height: 11rem; } }

                @media (prefers-reduced-motion: reduce) {
                    .camera,
                    .layer,
                    .star-pulse,
                    .sparkle,
                    .ray {
                        animation: none !important;
                    }
                }
            `}</style>

            <section
                ref={heroRef}
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                className="hero relative min-h-[92vh] sm:min-h-[95vh] md:min-h-screen w-full overflow-hidden isolate flex items-center justify-center"
                data-header-theme="dark"
                dir={isRTL ? 'rtl' : 'ltr'}
                style={{
                    /* Inline fallback so the sky color is in SSR HTML
                       before styled-jsx / cloud WebPs load. */
                    background:
                        'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.35), transparent 60%), radial-gradient(ellipse 120% 70% at 50% 110%, rgba(186,230,253,0.55), transparent 55%), linear-gradient(180deg, #93c5fd 0%, #bae6fd 40%, #e0f2fe 75%, #f0f9ff 100%)',
                }}
            >
                {/* Scene A */}
                <div className="camera a">
                    <div className="sky-stage">
                        <div className="layer base" />
                        <div className="layer tint" />
                    </div>
                </div>

                {/* Scene B */}
                <div className="camera b">
                    <div className="sky-stage">
                        <div className="layer base" />
                        <div className="layer tint" />
                    </div>
                </div>

                {/* Scene C */}
                <div className="camera c">
                    <div className="sky-stage">
                        <div className="layer base" />
                        <div className="layer tint" />
                    </div>
                </div>

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

                {/* Sparkles */}
                {['s1', 's2', 's3', 's4'].map((cls) => (
                    <svg key={cls} className={`sparkle ${cls}`} viewBox="0 0 24 24" width={24} height={24} aria-hidden="true">
                        <path d="M12 0 L13.5 10.5 L24 12 L13.5 13.5 L12 24 L10.5 13.5 L0 12 L10.5 10.5 Z" fill="#fff" />
                    </svg>
                ))}

                <div className="vignette" />
                <div className="bottom-fade" />

                {/* Content overlay */}
                <div className="relative z-[11] w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 pt-28 sm:pt-32 md:pt-36 pb-20 sm:pb-24 md:pb-28">
                    <div className="grid gap-8 lg:grid-cols-[1.05fr_0.75fr] lg:items-end">
                        <div className={isRTL ? 'text-right' : 'text-left'}>
                            <motion.div
                                initial={false}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="mb-6 inline-flex items-center gap-2 rounded-md bg-white/92 px-4 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0284c7] shadow-[0_6px_28px_rgba(2,132,199,0.25)] backdrop-blur-md"
                            >
                                <Sparkles className="h-3.5 w-3.5 text-[#0284c7]" aria-hidden="true" />
                                <span>{tagline}</span>
                            </motion.div>

                            <motion.h1
                                initial={false}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="max-w-5xl font-bold tracking-tight leading-[1.05]"
                                style={{
                                    fontSize: 'clamp(2.35rem, 6vw, 5.1rem)',
                                    color: '#ffffff',
                                    textShadow:
                                        '0 2px 10px rgba(7,15,38,0.65), 0 5px 28px rgba(7,15,38,0.5), 0 0 56px rgba(7,15,38,0.36)',
                                    textWrap: 'balance',
                                } as React.CSSProperties}
                            >
                                {title}
                            </motion.h1>

                            <motion.p
                                initial={false}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="mt-6 max-w-3xl text-base font-semibold leading-8 text-slate-900 sm:text-lg md:text-xl"
                                style={{ textShadow: '0 1px 2px rgba(255,255,255,0.72)' }}
                            >
                                {description}
                            </motion.p>

                            <motion.div
                                initial={false}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, delay: 0.32, ease: [0.25, 0.46, 0.45, 0.94] }}
                                className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
                            >
                                <a
                                    href={whatsappUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-6 py-3.5 text-sm font-bold text-[#0c1d3e] shadow-[0_12px_44px_rgba(0,0,0,0.28)] transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:bg-cyan-50 hover:shadow-[0_18px_56px_rgba(0,0,0,0.36)] sm:text-base"
                                >
                                    {freeConsultation}
                                    <ArrowRight className={`h-4 w-4 transition-transform group-hover:translate-x-1 ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''}`} aria-hidden="true" />
                                </a>
                                <Link
                                    href={l('/services')}
                                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/85 bg-[#0c1d3e]/34 px-6 py-3.5 text-sm font-bold text-white shadow-[0_8px_30px_rgba(0,0,0,0.24)] backdrop-blur-md transition-[background-color,border-color] duration-300 hover:border-white hover:bg-[#0c1d3e]/52 sm:text-base"
                                >
                                    {viewServices}
                                </Link>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 22 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.22 }}
                            className="grid gap-px bg-white/30 text-slate-950 shadow-2xl shadow-slate-950/16 backdrop-blur-md sm:grid-cols-3 lg:grid-cols-1"
                        >
                            {heroCopy.proof.map((item, index) => (
                                <div key={item} className="bg-white/82 p-5">
                                    <p className="text-[11px] font-black uppercase tracking-[0.2em] text-sky-700">{String(index + 1).padStart(2, '0')}</p>
                                    <p className="mt-2 text-base font-black">{item}</p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    )
}
