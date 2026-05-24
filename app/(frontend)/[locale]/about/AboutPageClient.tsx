'use client'

import React, { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'
import { SparklesCore } from '@/components/ui/sparkles'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { cn } from '@/lib/utils'
import {
    Lightbulb,
    ArrowRight,
    Search,
    Star,
    RefreshCw,
    Code2,
    Palette,
    TrendingUp,
} from 'lucide-react'
import Link from 'next/link'


function SectionHeading({ badge, title, highlight, description, variant = 'dark' }: { badge?: string; title: string; highlight?: string; description: string; variant?: 'dark' | 'light' }) {
    const isDark = variant === 'dark'
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-center mb-16"
        >
            {badge && (
                <div className="flex justify-center mb-6">
                    <span className={cn(
                        "inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase rounded-full px-5 py-2 backdrop-blur-md",
                        isDark ? "text-blue-400 bg-blue-500/10 border border-blue-500/20" : "text-primary-600 bg-primary-500/5 border border-primary-500/10"
                    )}>
                        <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", isDark ? "bg-blue-400" : "bg-primary-500")} />
                        {badge}
                    </span>
                </div>
            )}
            <h2 className={cn(
                "text-2xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight",
                isDark ? "text-white" : "text-neutral-900"
            )}>
                {title}{' '}
                {highlight && (
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-400">
                        {highlight}
                    </span>
                )}
            </h2>
            <p className={cn(
                "text-lg md:text-xl max-w-3xl mx-auto leading-relaxed",
                isDark ? "text-white/60" : "text-neutral-600"
            )}>
                {description}
            </p>
        </motion.div>
    )
}

export default function AboutPageClient({ t: pageT }: { t?: any }) {
    const { t: contextT, locale, dir } = useLanguage()
    const t = pageT || contextT
    const { scrollYProgress } = useScroll()
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
    const isRTL = locale === 'ar'


    const valueIcons = [Search, Star, RefreshCw, Lightbulb]
    const teamIcons = [Code2, Palette, TrendingUp]
    const teamKeys = ['dev', 'design', 'strategy']

    return (
        <div className="relative min-h-screen bg-[#0a0a1a] overflow-x-hidden" dir={dir}>
            {/* ━━━ Section 1: Hero with Sparkles ━━━ */}
            <section className="relative min-h-[90vh] w-full bg-black flex flex-col items-center justify-center overflow-hidden" data-header-theme="dark">
                <div className="w-full absolute inset-0 h-screen">
                    <SparklesCore
                        id="tsparticlesfullpage"
                        background="transparent"
                        minSize={0.6}
                        maxSize={1.4}
                        particleDensity={100}
                        className="w-full h-full"
                        particleColor="#FFFFFF"
                        speed={1}
                    />
                </div>

                <div className="relative z-10 container mx-auto px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8"
                    >
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                        <span className="text-xs font-bold text-blue-400 tracking-widest uppercase">
                            {t.about.hero.badge}
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="text-3xl md:text-7xl lg:text-9xl font-black text-white tracking-tighter leading-none mb-4"
                    >
                        {t.about.hero.title}{' '}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                            {t.about.hero.titleHighlight}
                        </span>
                    </motion.h1>

                    <div className="w-[40rem] h-40 relative mx-auto hidden md:block">
                        {/* Gradients */}
                        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
                        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
                        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
                        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

                        {/* Core component */}
                        <SparklesCore
                            background="transparent"
                            minSize={0.4}
                            maxSize={1}
                            particleDensity={1200}
                            className="w-full h-full"
                            particleColor="#FFFFFF"
                        />

                        {/* Radial Gradient to prevent sharp edges */}
                        <div className="absolute inset-0 w-full h-full bg-black [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
                    </div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                        className="text-lg md:text-2xl text-white/70 max-w-3xl mx-auto font-light leading-relaxed mb-12 mt-4"
                    >
                        {t.about.hero.description}
                    </motion.p>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.6 }}
                        className="text-lg text-blue-300 italic max-w-2xl mx-auto"
                    >
                        {t.about.hero.philosophy}
                    </motion.p>
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, y: [0, 10, 0] }}
                    transition={{ delay: 1.5, duration: 2, repeat: Infinity }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
                >
                    <div className="w-[1px] h-16 bg-gradient-to-b from-blue-500/50 to-transparent" />
                </motion.div>
            </section>

            {/* ━━━ Main Body: White Aurora Background ━━━ */}
            <AuroraBackground className="!h-auto !bg-lavender py-20" data-header-theme="light">
                <div className="container mx-auto relative z-10">
                    {/* ━━━ Section 3: Mission & Vision ━━━ */}
                    <section className="relative py-20 px-4 overflow-hidden">
                        <div className="container mx-auto max-w-6xl relative z-10">
                            <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                                {/* Mission */}
                                <motion.div
                                    initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="group relative p-10 rounded-[2.5rem] bg-white/60 border border-black/5 backdrop-blur-md overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative z-10">
                                        <h3 className="text-3xl font-bold text-neutral-900 mb-6">
                                            {t.about.mission.title}
                                        </h3>
                                        <p className="text-lg text-neutral-600 leading-relaxed">
                                            {t.about.mission.description}
                                        </p>
                                    </div>
                                </motion.div>

                                {/* Vision */}
                                <motion.div
                                    initial={{ opacity: 0, x: isRTL ? -50 : 50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="group relative p-10 rounded-[2.5rem] bg-white/60 border border-black/5 backdrop-blur-md overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                                >
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    <div className="relative z-10">
                                        <h3 className="text-3xl font-bold text-neutral-900 mb-6">
                                            {t.about.vision.title}
                                        </h3>
                                        <p className="text-lg text-neutral-600 leading-relaxed">
                                            {t.about.vision.description}
                                        </p>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Worldwide */}
                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1 }}
                                viewport={{ once: true }}
                                className="mt-16 group relative p-10 md:p-16 rounded-[3rem] bg-white/60 border border-black/5 backdrop-blur-md overflow-hidden text-center shadow-sm"
                            >
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div className="relative z-10">
                                    <h3 className="text-3xl md:text-4xl font-black text-neutral-900 mb-6 tracking-tight">
                                        {t.about.worldwide.title}
                                    </h3>
                                    <p className="text-xl text-neutral-600 leading-relaxed max-w-4xl mx-auto font-light">
                                        {t.about.worldwide.description}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* ━━━ Section 4: Our Values ━━━ */}
                    <section className="relative py-20">
                        <div className="container mx-auto px-4">
                            <SectionHeading
                                variant="light"
                                badge={t.about.values.title}
                                title={t.about.values.title}
                                highlight={t.about.values.subtitle}
                                description=""
                            />

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {t.about.values.items.map((item: any, index: number) => {
                                    const Icon = valueIcons[index % valueIcons.length]
                                    return (
                                        <motion.div
                                            key={item.title}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="group relative"
                                        >
                                            <div className="relative h-full rounded-3xl transition-all duration-500">
                                                <GlowingEffect
                                                    spread={40}
                                                    glow={true}
                                                    disabled={false}
                                                    proximity={64}
                                                    inactiveZone={0.01}
                                                    borderWidth={2}
                                                />
                                                <div className="relative h-full flex flex-col p-8 rounded-3xl border border-black/5 bg-white/60 backdrop-blur-xl z-10 hover:bg-white/80 transition-colors shadow-sm">
                                                    <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 text-blue-600 group-hover:scale-110 transition-transform">
                                                        <Icon className="w-6 h-6" />
                                                    </div>
                                                    <h4 className="text-xl font-bold text-neutral-900 mb-4">
                                                        {item.title}
                                                    </h4>
                                                    <p className="text-neutral-600 text-sm leading-relaxed">
                                                        {item.description}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </div>
                    </section>

                    {/* ━━━ Section 5: Our Expert Team ━━━ */}
                    <section className="relative py-20 overflow-hidden">
                        <div className="container mx-auto px-4">
                            <SectionHeading
                                variant="light"
                                badge={t.about.team.title}
                                title={t.about.team.title}
                                highlight={t.about.team.subtitle}
                                description=""
                            />

                            <div className="grid md:grid-cols-3 gap-8">
                                {teamKeys.map((key, index) => {
                                    const item = (t.about.team as any)[key]
                                    const Icon = teamIcons[index]
                                    return (
                                        <motion.div
                                            key={key}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            transition={{ duration: 0.6, delay: index * 0.1 }}
                                            viewport={{ once: true }}
                                            className="relative group p-10 rounded-[3rem] bg-white/60 border border-black/5 backdrop-blur-sm text-center hover:bg-white/80 transition-all duration-500 shadow-sm"
                                        >
                                            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-600/10 flex items-center justify-center mx-auto mb-8 border border-black/5 group-hover:scale-110 transition-transform ">
                                                <Icon className="w-10 h-10 text-blue-600 group-hover:text-cyan-600 transition-colors" />
                                            </div>
                                            <h4 className="text-2xl font-bold text-neutral-900 mb-4">
                                                {item.role}
                                            </h4>
                                            <p className="text-neutral-600 leading-relaxed font-light">
                                                {item.description}
                                            </p>
                                        </motion.div>
                                    )
                                })}
                            </div>
                        </div>
                    </section>

                    {/* ━━━ Section 6: How We're Different ━━━ */}
                    <section className="relative py-20">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto text-center">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                >
                                    <span className="text-xs font-bold tracking-[0.3em] uppercase text-blue-600 mb-6 block">
                                        {t.about.different.title}
                                    </span>
                                    <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-12 tracking-tight">
                                        {t.about.different.subtitle}
                                    </h2>
                                    <div className="grid md:grid-cols-3 gap-8">
                                        {t.about.different.items.map((item: any, i: number) => (
                                            <div key={i} className="flex flex-col items-center">
                                                <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-600 font-bold text-2xl mb-6 border border-blue-600/20 shadow-sm">
                                                    0{i + 1}
                                                </div>
                                                <div>
                                                    <h4 className="text-xl font-bold text-neutral-900 mb-3">{item.title}</h4>
                                                    <p className="text-neutral-600 leading-relaxed text-sm">{item.description}</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </section>

                    {/* ━━━ Section 7: Service Structure Progression ━━━ */}
                    <section className="py-20 px-4">
                        <div className="container mx-auto px-4 relative z-10">
                            <SectionHeading
                                variant="light"
                                badge={t.about.structure.title}
                                title={t.about.structure.title}
                                highlight=""
                                description={t.about.structure.subtitle}
                            />

                            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                                {t.about.structure.steps.map((step: any, index: number) => (
                                    <motion.div
                                        key={step.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="group relative bg-white/60 backdrop-blur-xl border border-black/5 p-10 rounded-[3rem] hover:bg-white/90 transition-all duration-500 hover:-translate-y-2 shadow-sm"
                                    >
                                        <div className="absolute -top-4 -left-4 w-12 h-12 rounded-2xl bg-zinc-950 text-white flex items-center justify-center font-black text-xl shadow-xl group-hover:scale-110 transition-transform">
                                            0{step.id}
                                        </div>
                                        <h4 className="text-xl font-bold text-neutral-900 mb-6 mt-4">
                                            {step.title}
                                        </h4>
                                        <p className="text-neutral-600 text-sm leading-relaxed mb-8">
                                            {step.description}
                                        </p>
                                        <Link
                                            href={step.link}
                                            className="inline-flex items-center gap-2 text-sm font-bold text-blue-600 group-hover:gap-3 transition-all"
                                        >
                                            {step.linkText} <ArrowRight className={cn("w-4 h-4", isRTL && "rotate-180")} />
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* ━━━ Section 8: Final CTA ━━━ */}
                    <section className="relative py-20 px-4">
                        <div className="relative z-10 container mx-auto px-4 text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="flex flex-col items-center gap-8 py-20 bg-blue-600/5 rounded-[4rem] border border-blue-600/10 backdrop-blur-sm"
                            >
                                <h2 className="text-3xl md:text-7xl font-black text-neutral-900 tracking-tight leading-tight max-w-4xl">
                                    {t.about.cta.title}
                                </h2>
                                <p className="text-xl md:text-2xl text-neutral-600 max-w-2xl font-light">
                                    {t.about.cta.description}
                                </p>
                                <Link
                                    href={localePath(locale, '/contact')}
                                    className="group relative inline-flex items-center gap-3 px-12 py-5 bg-blue-600 text-white rounded-2xl font-black text-xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(37,99,235,0.2)]"
                                >
                                    <span>{t.about.cta.button}</span>
                                    <ArrowRight className={cn("w-6 h-6 group-hover:translate-x-1 transition-transform", isRTL && "rotate-180")} />
                                </Link>
                            </motion.div>
                        </div>
                    </section>
                </div>
            </AuroraBackground>
        </div>
    )
}
