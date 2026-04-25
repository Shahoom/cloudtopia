'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { cn } from '@/lib/utils'
import {
    Brain, Sparkles, Eye, TrendingUp, Settings, RotateCcw,
    ArrowRight,
    Globe, LayoutDashboard, Workflow, Database, ChevronDown
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import dynamic from 'next/dynamic'

const RainingLetters = dynamic(
    () => import('@/components/ui/modern-animated-hero-section'),
    { ssr: false }
)

const InteractiveCardGallery = dynamic<any>(
    () => import('@/components/ui/3d-interactive-card-gallery'),
    { ssr: false }
)

const InteractiveNebulaShader = dynamic(
    () => import('@/components/ui/liquid-shader').then(mod => mod.InteractiveNebulaShader),
    { ssr: false }
)

import { GlowingEffect } from '@/components/ui/glowing-effect'
import { SeoH1 } from '@/components/seo/SeoH1'

// ─── Data ────────────────────────────────────────────────────────────────────

// ─── Local Icon Mapping for Innovation Domains ───────────────────────────────
const domainIcons = [Sparkles, Brain, Eye, TrendingUp, Settings, RotateCcw]
const domainStyles = [
    { gradient: 'from-violet-500/20 to-lavender/20', border: 'border-white/5 hover:border-white/10', iconColor: 'text-violet-400' },
    { gradient: 'from-blue-500/20 to-cyan-500/20', border: 'border-white/5 hover:border-white/10', iconColor: 'text-blue-400' },
    { gradient: 'from-emerald-500/20 to-teal-500/20', border: 'border-white/5 hover:border-white/10', iconColor: 'text-emerald-400' },
    { gradient: 'from-amber-500/20 to-orange-500/20', border: 'border-white/5 hover:border-white/10', iconColor: 'text-amber-400' },
    { gradient: 'from-rose-500/20 to-pink-500/20', border: 'border-white/5 hover:border-white/10', iconColor: 'text-rose-400' },
    { gradient: 'from-sky-500/20 to-blue-500/20', border: 'border-white/5 hover:border-white/10', iconColor: 'text-sky-400' },
]

// ─── Sub-components ──────────────────────────────────────────────────────────

function SectionHeading({ badge, title, description, gradientText, variant = 'dark' }: { badge?: string; title: string; description: string; gradientText?: string; variant?: 'dark' | 'light' }) {
    const isDark = variant === 'dark'

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className={cn("text-center mb-16 sm:mb-20 lg:mb-24")}
        >
            {badge && (
                <div className="flex justify-center mb-6">
                    <span className={cn(
                        "inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.25em] uppercase rounded-full px-5 py-2 backdrop-blur-md",
                        isDark ? "text-blue-400/80 bg-blue-500/5 border border-blue-500/10" : "text-primary-600 bg-primary-500/5 border border-primary-500/10"
                    )}>
                        <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", isDark ? "bg-blue-400" : "bg-primary-500")} />
                        {badge}
                    </span>
                </div>
            )}
            <h2 className={cn(
                "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-tight leading-[1.2] mb-6",
                isDark ? "text-white" : "text-slate-900"
            )}>
                {title}
                {gradientText && (
                    <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400">
                        {gradientText}
                    </span>
                )}
            </h2>
            <p className={cn(
                "text-sm sm:text-base lg:text-xl max-w-3xl mx-auto leading-relaxed font-light px-4",
                isDark ? "text-white/40" : "text-slate-600"
            )}>
                {description}
            </p>
        </motion.div>
    )
}

function DomainCard({ domain, index, isRTL }: { domain: any; index: number; isRTL: boolean }) {
    const [isExpanded, setIsExpanded] = useState(false)
    const Icon = domainIcons[index % domainIcons.length]
    const style = domainStyles[index % domainStyles.length]

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true }}
            className="group relative"
        >
            <div className="relative h-full rounded-2xl">
                <GlowingEffect
                    spread={40}
                    glow={true}
                    disabled={false}
                    proximity={64}
                    inactiveZone={0.01}
                    borderWidth={3}
                />

                <div
                    onClick={() => setIsExpanded(!isExpanded)}
                    className={cn(
                        "relative h-full flex flex-col rounded-2xl border bg-[#0a0a1a]/60 backdrop-blur-xl p-6 sm:p-7 lg:p-8 cursor-pointer transition-all duration-500 hover:bg-[#0c0c22]/80 overflow-hidden z-10",
                        style.border,
                        isRTL ? "text-right" : "text-left"
                    )}
                >
                    {/* Subtle inner gradient */}
                    <div className={cn("absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-10 transition-opacity duration-500", style.gradient)} />

                    <div className={cn("flex items-start justify-between mb-6", isRTL ? "flex-row-reverse" : "flex-row")}>
                        <div className={cn(
                            "w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shadow-inner transition-all duration-500 group-hover:scale-110 group-hover:bg-white/10",
                            style.iconColor
                        )}>
                            <Icon className="w-6 h-6" strokeWidth={1.5} />
                        </div>
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ChevronDown className="w-5 h-5 text-white/20 group-hover:text-white/40" />
                        </motion.div>
                    </div>

                    <h3 className="text-base sm:text-lg font-medium text-white mb-2 tracking-tight">
                        {domain.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/50 leading-relaxed font-light mb-auto">
                        {domain.description}
                    </p>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.4, ease: 'easeInOut' }}
                                className="overflow-hidden"
                            >
                                <div className="pt-6 mt-6 border-t border-white/5">
                                    <div className={cn("flex flex-wrap gap-2.5", isRTL ? "flex-row-reverse" : "flex-row")}>
                                        {domain.items.map((item: string, i: number) => (
                                            <motion.span
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ duration: 0.3, delay: i * 0.05 }}
                                                className="text-[11px] sm:text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/40 bg-white/[0.02] hover:bg-white/[0.08] hover:text-white/80 transition-all duration-300"
                                            >
                                                {item}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    )
}


// ─── Main Page ───────────────────────────────────────────────────────────────

export default function LabsPage() {
    const { t, locale } = useLanguage()

    const l = (path: string) => `/${locale}${path === '/' ? '' : path}`

    return (
        <div className="bg-[#060611]">
            {/* SSR-rendered h1 for SEO. The visible hero (RainingLetters)
                is loaded with ssr:false because it uses canvas/DOM
                measurement, so without this the page would have zero h1
                in server-rendered HTML. */}
            <SeoH1>{t.labs.hero.scramblePhrases?.[0] || 'Applied AI, Engineered for Impact'} — CloudTopia Labs</SeoH1>

            {/* ━━━ Section 1: Raining Letters Hero ━━━ */}
            <div style={{ marginTop: '-80px' }}>
                <RainingLetters
                    phrases={t.labs.hero.scramblePhrases}
                    subtitle={t.labs.hero.scrambleSubtitle}
                />
            </div>

            {/* ━━━ Section 2: AI Innovation Domains ━━━ */}
            <section className="relative py-24 sm:py-32 lg:py-40 px-4 sm:px-6 overflow-hidden bg-[#03030a]">
                {/* Visual enhancements for premium feel */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.05),transparent_50%)]" />
                <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[140px] translate-y-1/2 -translate-x-1/2" />

                <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 relative z-10">
                    <SectionHeading
                        badge={t.labs.innovationDomains.badge}
                        title={t.labs.innovationDomains.title}
                        gradientText={t.labs.innovationDomains.gradientText}
                        description={t.labs.innovationDomains.description}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                        {t.labs.innovationDomains.domains.map((domain: any, index: number) => (
                            <div key={index}>
                                <DomainCard domain={domain} index={index} isRTL={locale === 'ar'} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Section Transition Mask */}
                <div className="absolute bottom-0 inset-x-0 h-64 bg-gradient-to-t from-lavender via-transparent to-transparent pointer-events-none" />
                <div
                    className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0] transform rotate-180"
                    style={{ zIndex: 20 }}
                >
                    <svg
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        className="relative block w-[calc(100%+1.3px)] h-[100px] text-lavender fill-current"
                    >
                        <path d="M1200 120L0 16.48V0h1200v120z" />
                    </svg>
                </div>
            </section>

            {/* ━━━ Section 3: Experimental Prototypes (Interactive Gallery) ━━━ */}
            <section className="relative py-20 sm:py-24 lg:py-32 px-4 sm:px-6 overflow-hidden bg-lavender">
                {/* Clean background for Section 3 */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_0%,rgba(255,255,255,0.4),transparent_50%)]" />

                <div className="w-full px-4 sm:px-8 md:px-12 lg:px-16 relative z-10">
                    <SectionHeading
                        variant="light"
                        badge={t.labs.prototypes.badge}
                        title={t.labs.prototypes.title}
                        gradientText={t.labs.prototypes.gradientText}
                        description={t.labs.prototypes.description}
                    />

                    <InteractiveCardGallery
                        cards={t.labs.prototypes.cards}
                        ui={t.labs.prototypes.ui}
                        isRTL={locale === 'ar'}
                        ctaLink={l('/contact')}
                    />
                </div>

                {/* Transition back to dark */}
                <div className="absolute bottom-[-1px] left-0 w-full overflow-hidden leading-[0]" style={{ zIndex: 20 }}>
                    <svg
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        className="relative block w-[calc(100%+1.3px)] h-[80px] text-[#060611] fill-current"
                    >
                        <path d="M1200 120L0 16.48V0h1200v120z" />
                    </svg>
                </div>
            </section>

            {/* ━━━ Section 4: The CloudTopia Philosophy ━━━ */}
            <section className="relative py-32 sm:py-48 lg:py-64 px-4 sm:px-6 overflow-hidden">
                {/* Nebula Shader Background */}
                <div className="absolute inset-0 z-0">
                    <InteractiveNebulaShader isAbsolute={true} disableCenterDimming={true} />
                    <div className="absolute inset-0 bg-[#060611]/80 backdrop-blur-[2px]" />
                </div>

                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] sm:w-[40%] h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent z-10" />

                {/* Ambient Depth Glows */}
                <div className="absolute -top-24 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-purple-500/5 rounded-full blur-[100px] pointer-events-none" />

                <div className="w-full max-w-7xl mx-auto relative z-10 flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        viewport={{ once: true }}
                        className="text-center w-full"
                    >
                        <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-[10px] sm:text-xs font-bold tracking-[0.5em] uppercase text-rose-400 mb-16 sm:mb-24 block"
                        >
                            {t.labs.philosophy.badge}
                        </motion.span>

                        <div className="space-y-6 sm:space-y-12 mb-28 sm:mb-40">
                            <div className="overflow-hidden">
                                <motion.h2
                                    initial={{ y: "100%" }}
                                    whileInView={{ y: 0 }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                                    viewport={{ once: true }}
                                    className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight"
                                >
                                    <span className="text-rose-400/40">{t.labs.philosophy.notFluff}</span>
                                    <span className="text-white drop-shadow-[0_0_30px_rgba(244,63,94,0.4)]">{t.labs.philosophy.experimentalFluff}</span>
                                </motion.h2>
                            </div>
                            <div className="overflow-hidden">
                                <motion.h2
                                    initial={{ y: "100%" }}
                                    whileInView={{ y: 0 }}
                                    transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                                    viewport={{ once: true }}
                                    className="text-3xl sm:text-5xl md:text-7xl lg:text-9xl font-medium tracking-tighter leading-tight"
                                >
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-red-500 to-orange-500">
                                        {t.labs.philosophy.itIs}
                                    </span>
                                </motion.h2>
                            </div>
                            <div className="overflow-hidden">
                                <motion.h3
                                    initial={{ y: "100%" }}
                                    whileInView={{ y: 0 }}
                                    transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                                    viewport={{ once: true }}
                                    className="text-xl sm:text-3xl md:text-4xl lg:text-6xl font-extralight text-white/80 tracking-tight"
                                >
                                    {t.labs.philosophy.appliedDirectly} <span className="text-white">{t.labs.philosophy.productionSystems}</span>
                                </motion.h3>
                            </div>
                        </div>

                        {/* Staggered text block */}
                        <div className={cn("flex flex-col md:flex-row justify-center items-center gap-8 md:gap-24 lg:gap-32 mb-32 sm:mb-48", locale === 'ar' && "flex-row-reverse")}>
                            {t.labs.philosophy.staggered.map((text: string, i: number) => (
                                <motion.div
                                    key={text}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.8 + (i * 0.2) }}
                                    viewport={{ once: true }}
                                    className="flex flex-col items-center gap-4"
                                >
                                    <span className="text-xl sm:text-2xl lg:text-3xl font-extralight text-rose-200/40 tracking-wide italic">
                                        {text}
                                    </span>
                                    <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-rose-400/20 to-transparent" />
                                </motion.div>
                            ))}
                        </div>

                        {/* Built badges */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 w-full max-w-6xl">
                            {[
                                { ...t.labs.philosophy.cloudNative, gradient: 'from-orange-400 to-rose-400', glow: 'shadow-rose-500/10' },
                                { ...t.labs.philosophy.scalable, gradient: 'from-rose-400 to-red-500', glow: 'shadow-red-500/10' },
                                { ...t.labs.philosophy.intelligent, gradient: 'from-red-500 to-orange-500', glow: 'shadow-orange-500/10' }
                            ].map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1.2, delay: 1.4 + (i * 0.2), ease: [0.16, 1, 0.3, 1] }}
                                    viewport={{ once: true }}
                                    className={cn(
                                        "group relative p-10 sm:p-14 rounded-[3rem] border border-white/5 bg-white/[0.01] backdrop-blur-3xl hover:bg-white/[0.03] transition-all duration-700 hover:-translate-y-2",
                                        item.glow
                                    )}
                                >
                                    <div className="flex flex-col items-center gap-6 text-center">
                                        <span className={cn("text-xl sm:text-2xl font-light tracking-tight text-transparent bg-clip-text bg-gradient-to-r", item.gradient)}>
                                            {item.label}
                                        </span>
                                        <p className="text-sm text-white/40 leading-relaxed max-w-[200px]">
                                            {item.description}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Final CTA link */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 2.2 }}
                            viewport={{ once: true }}
                            className="mt-32 sm:mt-48"
                        >
                            <a
                                href={l('/contact')}
                                className="inline-flex flex-col items-center gap-6 group"
                            >
                                <span className="text-[10px] sm:text-xs font-bold tracking-[0.4em] uppercase text-white/20 group-hover:text-white/60 transition-colors duration-500">
                                    {t.labs.philosophy.ctaBadge}
                                </span>
                                <div className={cn("w-12 h-12 rounded-full border border-white/10 flex items-center justify-center group-hover:border-rose-400/50 transition-colors duration-500", locale === 'ar' && "rotate-180")}>
                                    <ArrowRight className="w-5 h-5 text-white/20 group-hover:text-rose-400 transition-all duration-500 group-hover:translate-x-1" strokeWidth={1} />
                                </div>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}
