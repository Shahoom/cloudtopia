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
    ShieldCheck,
    CheckCircle2,
    Globe2,
    CircleDollarSign,
    FileText,
    Building2,
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
    const proofIcons = [ShieldCheck, CircleDollarSign, Globe2, CheckCircle2]
    const verificationIcons = [CircleDollarSign, FileText, Search, Building2, Globe2]
    const operatingModel = isRTL ? {
        badge: 'نموذج التشغيل',
        title: 'مبني للمشترين الذين يحتاجون وضوحاً قبل بدء الإنتاج.',
        description: 'كلاود توبيا وكالة رقمية ثنائية اللغة تساعد فرق الأعمال على تثبيت النطاق والسعر والملكية ومراحل التسليم قبل الإنتاج، ثم تبني المواقع والمتاجر والتطبيقات والأنظمة ومحتوى SEO الذي يخدم النمو.',
        pillars: [
            {
                title: 'نطاق ثابت قبل التنفيذ',
                description: 'نحول الفكرة إلى مخرجات واضحة، مراحل موافقة، ومسؤوليات محددة حتى يعرف الفريق ما سيتم تسليمه ومتى.',
            },
            {
                title: 'أسعار وقرارات قابلة للمقارنة',
                description: 'نربط الطلب بمسارات تسعير وحزم واضحة حتى يمكن مقارنة الاستثمار مع حجم المشروع ومخاطر التأخير.',
            },
            {
                title: 'تجربة عربية وإنجليزية من البداية',
                description: 'نصمم للغة العربية RTL والإنجليزية معاً، بدلاً من إضافة الترجمة في نهاية المشروع.',
            },
            {
                title: 'ملكية وتسليم قابل للتوسع',
                description: 'نجهز الكود، الحسابات، التحليلات، والتوثيق بطريقة تساعد الفريق على التشغيل بعد الإطلاق.',
            },
        ],
        verifyTitle: 'ما يستطيع المشتري التحقق منه',
        verifyDescription: 'نضع مسارات القرار أمامك قبل المكالمة: التسعير، الأعمال السابقة، خريطة الخدمات، الأسواق، ونموذج التواصل.',
        verification: [
            { label: 'التسعير الشفاف', href: '/pricing' },
            { label: 'أعمال سابقة', href: '/projects' },
            { label: 'خريطة الخدمات', href: '/services' },
            { label: 'صفحات الأسواق', href: '/locations' },
            { label: 'نموذج التواصل', href: '/contact' },
        ],
        primaryCta: 'ابدأ من نموذج التواصل',
        secondaryCta: 'قارن الأسعار',
    } : {
        badge: 'Operating model',
        title: 'Built for buyers who need clarity before production starts.',
        description: 'CloudTopia is a bilingual Arabic and English digital agency that fixes scope, pricing, ownership, and delivery milestones before production, then builds the websites, stores, apps, systems, and SEO content that support growth.',
        pillars: [
            {
                title: 'Fixed scope before build',
                description: 'We turn the idea into visible deliverables, approval stages, and decision owners so everyone knows what is shipping and when.',
            },
            {
                title: 'Pricing buyers can compare',
                description: 'We connect requests to clear package paths so teams can compare investment against complexity, risk, and timeline.',
            },
            {
                title: 'Arabic RTL and English from day one',
                description: 'We plan bilingual content, layouts, navigation, and conversion paths together instead of treating translation as a late add-on.',
            },
            {
                title: 'Owned, scalable handoff',
                description: 'We prepare code, accounts, analytics, and documentation so the business can operate confidently after launch.',
            },
        ],
        verifyTitle: 'What buyers can verify',
        verifyDescription: 'The decision paths are visible before a sales call: pricing, previous work, service map, market pages, and intake.',
        verification: [
            { label: 'Transparent pricing', href: '/pricing' },
            { label: 'Case studies', href: '/projects' },
            { label: 'Service map', href: '/services' },
            { label: 'Market pages', href: '/locations' },
            { label: 'Contact intake', href: '/contact' },
        ],
        primaryCta: 'Start the intake',
        secondaryCta: 'Compare pricing',
    }

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
            <AuroraBackground className="!h-auto !min-h-0 !bg-[#f4f1f8] py-14" data-header-theme="light">
                <div className="container mx-auto relative z-10">
                    <section className="px-4 py-12">
                        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-4">
                            {operatingModel.pillars.map((pillar, index) => {
                                const Icon = proofIcons[index % proofIcons.length]
                                return (
                                    <motion.article
                                        key={pillar.title}
                                        initial={{ opacity: 0, y: 18 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.45, delay: index * 0.06 }}
                                        viewport={{ once: true }}
                                        className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white/85 p-6 shadow-sm backdrop-blur transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-sky-200 hover:shadow-xl motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                                    >
                                        <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-slate-950 text-white">
                                            <Icon className="h-5 w-5" aria-hidden="true" />
                                        </div>
                                        <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-sky-700">
                                            {String(index + 1).padStart(2, '0')}
                                        </p>
                                        <h2 className="text-xl font-black leading-tight text-slate-950">
                                            {pillar.title}
                                        </h2>
                                        <p className="mt-4 text-sm font-semibold leading-7 text-slate-600">
                                            {pillar.description}
                                        </p>
                                    </motion.article>
                                )
                            })}
                        </div>
                    </section>

                    {/* ━━━ Section 3: Mission & Vision ━━━ */}
                    <section className="relative overflow-hidden px-4 py-14">
                        <div className="container mx-auto max-w-6xl relative z-10">
                            <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
                                {/* Mission */}
                                <motion.div
                                    initial={{ opacity: 0, x: isRTL ? 50 : -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.8 }}
                                    viewport={{ once: true }}
                                    className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white/85 p-8 shadow-sm backdrop-blur-md transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-xl"
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
                                    className="group relative overflow-hidden rounded-lg border border-slate-200 bg-white/85 p-8 shadow-sm backdrop-blur-md transition-[box-shadow,transform] duration-300 hover:-translate-y-1 hover:shadow-xl"
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
                                className="group relative mt-10 overflow-hidden rounded-lg border border-slate-200 bg-white/85 p-8 text-center shadow-sm backdrop-blur-md md:p-12"
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
                    <section className="relative py-14">
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
                                                <div className="relative z-10 flex h-full flex-col rounded-lg border border-slate-200 bg-white/85 p-7 shadow-sm backdrop-blur-xl transition-colors hover:bg-white">
                                                    <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-md bg-blue-500/10 text-blue-600 transition-transform group-hover:scale-105">
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
                    <section className="relative overflow-hidden py-14">
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
                                            className="group relative rounded-lg border border-slate-200 bg-white/85 p-8 text-center shadow-sm backdrop-blur-sm transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
                                        >
                                            <div className="mx-auto mb-8 flex h-16 w-16 items-center justify-center rounded-md border border-black/5 bg-gradient-to-br from-blue-500/10 to-purple-600/10 transition-transform group-hover:scale-105">
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
                    <section className="relative py-14">
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
                                    <div className="grid gap-6 md:grid-cols-3">
                                        {t.about.different.items.map((item: any, i: number) => (
                                            <div key={i} className="flex flex-col items-center">
                                                <div className="mb-6 flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-md border border-blue-600/20 bg-blue-600/10 text-2xl font-bold text-blue-600 shadow-sm">
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

                    {/* ━━━ Section 7: Enterprise Operating Model ━━━ */}
                    <section className="relative px-4 py-14">
                        <div className="container mx-auto max-w-7xl">
                            <motion.div
                                initial={{ opacity: 0, y: 28 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                viewport={{ once: true }}
                                className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] items-start"
                            >
                                <div className="relative overflow-hidden rounded-lg border border-neutral-200 bg-neutral-950 p-8 text-white shadow-2xl md:p-12">
                                    <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-amber-300" />
                                    <span className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.22em] uppercase text-cyan-200">
                                        <ShieldCheck className="h-4 w-4" />
                                        {operatingModel.badge}
                                    </span>
                                    <h2 className="mt-6 text-3xl md:text-5xl font-black leading-tight text-white">
                                        {operatingModel.title}
                                    </h2>
                                    <p className="mt-6 text-base md:text-lg leading-relaxed text-white/70">
                                        {operatingModel.description}
                                    </p>

                                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                                        <Link
                                            href={localePath(locale, '/contact')}
                                            className="group inline-flex items-center justify-center gap-2 rounded-md bg-white px-5 py-3 text-sm font-black text-neutral-950 transition hover:bg-cyan-100"
                                        >
                                            {operatingModel.primaryCta}
                                            <ArrowRight className={cn("h-4 w-4 transition-transform group-hover:translate-x-1", isRTL && "rotate-180 group-hover:-translate-x-1")} />
                                        </Link>
                                        <Link
                                            href={localePath(locale, '/pricing')}
                                            className="inline-flex items-center justify-center gap-2 rounded-md border border-white/20 px-5 py-3 text-sm font-black text-white transition hover:border-amber-200 hover:bg-white/10"
                                        >
                                            {operatingModel.secondaryCta}
                                        </Link>
                                    </div>
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    {operatingModel.pillars.map((pillar, index) => {
                                        const Icon = proofIcons[index % proofIcons.length]
                                        const accents = ['text-emerald-600 bg-emerald-50', 'text-amber-600 bg-amber-50', 'text-cyan-600 bg-cyan-50', 'text-rose-600 bg-rose-50']
                                        return (
                                            <motion.div
                                                key={pillar.title}
                                                initial={{ opacity: 0, y: 18 }}
                                                whileInView={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.45, delay: index * 0.08 }}
                                                viewport={{ once: true }}
                                                className="rounded-lg border border-black/5 bg-white/80 p-6 shadow-sm backdrop-blur"
                                            >
                                                <div className={cn("mb-5 flex h-11 w-11 items-center justify-center rounded-md", accents[index % accents.length])}>
                                                    <Icon className="h-5 w-5" />
                                                </div>
                                                <h3 className="text-lg font-black text-neutral-950">
                                                    {pillar.title}
                                                </h3>
                                                <p className="mt-3 text-sm leading-relaxed text-neutral-600">
                                                    {pillar.description}
                                                </p>
                                            </motion.div>
                                        )
                                    })}
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 24 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.7 }}
                                viewport={{ once: true }}
                                className="mt-8 rounded-lg border border-black/5 bg-white/70 p-6 md:p-8 shadow-sm backdrop-blur"
                            >
                                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                                    <div className="max-w-2xl">
                                        <h3 className="text-2xl md:text-3xl font-black text-neutral-950">
                                            {operatingModel.verifyTitle}
                                        </h3>
                                        <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-600">
                                            {operatingModel.verifyDescription}
                                        </p>
                                    </div>
                                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                                        {operatingModel.verification.map((item, index) => {
                                            const Icon = verificationIcons[index % verificationIcons.length]
                                            return (
                                                <Link
                                                    key={item.href}
                                                    href={localePath(locale, item.href)}
                                                    className="group flex min-h-24 flex-col justify-between rounded-md border border-neutral-200 bg-white p-4 text-sm font-black text-neutral-900 transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md"
                                                >
                                                    <Icon className="h-5 w-5 text-blue-600" />
                                                    <span className="mt-4 inline-flex items-center gap-2">
                                                        {item.label}
                                                        <ArrowRight className={cn("h-3.5 w-3.5 transition-transform group-hover:translate-x-1", isRTL && "rotate-180 group-hover:-translate-x-1")} />
                                                    </span>
                                                </Link>
                                            )
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    {/* ━━━ Section 7: Service Structure Progression ━━━ */}
                    <section className="px-4 py-14">
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
                                    className="group relative rounded-lg border border-slate-200 bg-white/85 p-8 shadow-sm backdrop-blur-xl transition-[background-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-xl"
                                    >
                                        <div className="absolute -left-3 -top-3 flex h-11 w-11 items-center justify-center rounded-md bg-zinc-950 text-lg font-black text-white shadow-xl transition-transform group-hover:scale-105">
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
                    <section className="relative px-4 py-14">
                        <div className="relative z-10 container mx-auto px-4 text-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                className="flex flex-col items-center gap-8 rounded-lg border border-blue-600/10 bg-blue-600/5 px-6 py-14 backdrop-blur-sm md:px-10"
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
