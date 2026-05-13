'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { ArrowRight, Globe, Layers, Code2, Shield, Rocket } from 'lucide-react'
import dynamic from 'next/dynamic'

const DotGlobeHero = dynamic(() => import('@/components/ui/globe-hero').then(mod => mod.DotGlobeHero), { ssr: false })
const HorizontalScrollCards = dynamic(() => import('@/components/ui/horizontal-scroll-cards').then(mod => mod.HorizontalScrollCards), { ssr: false })
import type { ScrollCardItem } from '@/components/ui/horizontal-scroll-cards'
import { SeoH1 } from '@/components/seo/SeoH1'
const WebAppFeatures = dynamic(() => import('@/components/ui/features-8').then(mod => mod.WebAppFeatures), { ssr: false })
const StickyFeatureSection = dynamic(() => import('@/components/ui/sticky-scroll-cards-section').then(mod => mod.StickyFeatureSection), { ssr: false })



export default function WebApplicationsPage() {
    const { dir, locale, t } = useLanguage()
    const p = t.services?.webApplicationsPage

    const currentContent = {
        badge: p?.hero?.badge || 'WEB APPLICATIONS',
        title: p?.hero?.title || 'Build Powerful',
        titleHighlight: p?.hero?.titleHighlight || 'Web Applications',
        description: p?.hero?.description || 'From SaaS platforms to enterprise portals, we create scalable web applications that power your business growth with cutting-edge technology.',
        ctaExplore: p?.hero?.ctaExplore || 'Start Your Project',
        ctaDemo: p?.hero?.ctaDemo || 'View Live Demo',
    }

    const s = t.serviceCards?.webApps

    // Web Applications Cards with icons matching the services
    const webAppsCards: ScrollCardItem[] = [
        {
            name: s?.portal?.name || 'Customer & Partner Portals',
            tagline: s?.portal?.tagline || 'Transparent 24/7 self-service for your clients',
            icon: <img src="/icons/services/Customer Portal.png" alt="Portal" width={40} height={40} className="w-10 h-10" />,
            description: s?.portal?.description || 'Secure self-service platforms for account access, documents, and support.',
            gradient: "bg-gradient-to-br from-indigo-500 to-indigo-600",
            glowColor: "bg-lavender/50",
            features: s?.portal?.features?.slice(0, 4) || [],
        },
        {
            name: s?.bookingPlatform?.name || 'Booking & Reservation Systems',
            tagline: s?.bookingPlatform?.tagline || 'Accept appointments and manage capacity 24/7',
            icon: <img src="/icons/services/Booking Platform.png" alt="Booking" width={40} height={40} className="w-10 h-10" />,
            description: s?.bookingPlatform?.description || 'Professional booking platforms with integrated payments and scheduling.',
            gradient: "bg-gradient-to-br from-blue-500 to-blue-600",
            glowColor: "bg-lavender/50",
            features: s?.bookingPlatform?.features?.slice(0, 4) || [],
        },
        {
            name: s?.dashboard?.name || 'Admin & Management Dashboards',
            tagline: s?.dashboard?.tagline || 'Centralized operational control and real-time insights',
            icon: <img src="/icons/services/Admin Dashboard.png" alt="Dashboard" width={40} height={40} className="w-10 h-10" />,
            description: s?.dashboard?.description || 'Powerful control panels to manage processes, users, and data from one place.',
            gradient: "bg-gradient-to-br from-purple-500 to-purple-600",
            glowColor: "bg-lavender/50",
            features: s?.dashboard?.features?.slice(0, 4) || [],
        },
        {
            name: s?.chat?.name || 'Real-time Messaging & Support',
            tagline: s?.chat?.tagline || 'Instant communication for teams or customers',
            icon: <img src="/icons/services/Real-time Chat.png" alt="Chat" width={40} height={40} className="w-10 h-10" />,
            description: s?.chat?.description || 'Secure, fast, and scalable messaging platforms for community and support.',
            gradient: "bg-gradient-to-br from-cyan-500 to-cyan-600",
            glowColor: "bg-lavender/50",
            features: s?.chat?.features?.slice(0, 4) || [],
        },
        {
            name: s?.payment?.name || 'Payment & Financial Integrations',
            tagline: s?.payment?.tagline || 'Global and local payment gateways for secure sales',
            icon: <img src="/icons/services/Payment Integration.png" alt="Payments" width={40} height={40} className="w-10 h-10" />,
            description: s?.payment?.description || 'Seamless integration of card payments, subscriptions, and financial tools.',
            gradient: "bg-gradient-to-br from-gray-500 to-gray-600",
            glowColor: "bg-lavender/50",
            features: s?.payment?.features?.slice(0, 4) || [],
        },
        {
            name: s?.mobile?.name || 'Mobile & PWA Applications',
            tagline: s?.mobile?.tagline || 'High-performance applications in your pocket',
            icon: <img src="/icons/services/Mobile Apps.png" alt="Mobile" width={40} height={40} className="w-10 h-10" />,
            description: s?.mobile?.description || 'Advanced mobile-first solutions and cross-platform PWA development.',
            gradient: "bg-gradient-to-br from-orange-500 to-orange-600",
            glowColor: "bg-lavender/50",
            features: s?.mobile?.features?.slice(0, 4) || [],
        },
    ]

    return (
        <div className="min-h-screen bg-lavender" dir={dir}>
            {/* SSR-rendered h1 for SEO — DotGlobeHero is dynamic with ssr:false. */}
            <SeoH1>{currentContent.title} {currentContent.titleHighlight} — CloudTopia</SeoH1>

            {/* Section 1: Globe Hero */}
            <DotGlobeHero
                rotationSpeed={0.004}
                className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 relative overflow-hidden"
            >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-transparent to-slate-900/30" />
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-lavender/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-lavender/10 rounded-full blur-3xl animate-pulse" />

                <div className="relative z-10 text-center space-y-12 max-w-5xl mx-auto px-6 py-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8"
                    >
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-lavender/20 via-lavender/10 to-lavender/20 border border-emerald-400/30 backdrop-blur-xl shadow-2xl"
                        >
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-lavender/10 via-transparent to-lavender/10 animate-pulse" />
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" />
                            <span className="relative z-10 text-sm font-bold text-emerald-400 tracking-wider uppercase">{currentContent.badge}</span>
                            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-ping" style={{ animationDelay: '500ms' }} />
                        </motion.div>

                        <div className="space-y-6">
                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, delay: 0.3 }}
                                className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.85] select-none"
                                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                            >
                                <span className="block font-light text-white/70 mb-3 text-4xl md:text-6xl lg:text-7xl">
                                    {currentContent.title}
                                </span>
                                <span className="block relative">
                                    <span className="bg-gradient-to-br from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent font-black relative z-10">
                                        {currentContent.titleHighlight}
                                    </span>
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 via-cyan-400 to-teal-400 bg-clip-text text-transparent font-black blur-2xl opacity-50 scale-105"
                                        style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                                        {currentContent.titleHighlight}
                                    </div>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: "100%" }}
                                        transition={{ duration: 1.5, delay: 1.2, ease: "easeOut" }}
                                        className="absolute -bottom-6 left-0 h-3 bg-gradient-to-r from-emerald-400 via-cyan-400/80 to-transparent rounded-full shadow-lg shadow-emerald-500/50"
                                    />
                                </span>
                            </motion.h1>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.8 }}
                            className="max-w-3xl mx-auto space-y-4"
                        >
                            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed font-medium"
                                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                                {currentContent.description}
                            </p>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1 }}
                        className="flex justify-center items-center pt-4"
                    >
                        <motion.button
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 20px 40px rgba(0,0,0,0.2), 0 0 25px rgba(16, 185, 129, 0.3)",
                                y: -2
                            }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => window.location.href = '/contact'}
                            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-600 text-white rounded-xl font-semibold text-lg shadow-xl hover:shadow-emerald-500/30 transition-all duration-500 overflow-hidden border border-emerald-400/20"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-lavender/20 via-lavender/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-lavender/30 to-transparent"
                                initial={{ x: "-100%" }}
                                whileHover={{ x: "100%" }}
                                transition={{ duration: 0.8 }}
                            />
                            <span className="relative z-10 tracking-wide">{currentContent.ctaExplore}</span>
                            <ArrowRight className="relative z-10 w-5 h-5 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform duration-300 rtl:rotate-180" />
                        </motion.button>
                    </motion.div>
                </div>
            </DotGlobeHero>

            {/* Section 2: Horizontal Scrolling Service Cards */}
            <HorizontalScrollCards
                cards={webAppsCards}
                title={p?.solutionsTitle || 'Web Application Solutions'}
                subtitle={p?.solutionsSubtitle || 'Explore our comprehensive web application solutions designed to bring your ideas to life'}
                whatsIncludedLabel={p?.whatsIncluded || "What's Included:"}
                moreText={p?.more || 'more'}
                isRTL={locale === 'ar'}
                variant="light"
            />

            {/* Section 3: Features */}
            <WebAppFeatures locale={locale} />

            {/* Section 4: Sticky Scroll Cards */}
            <StickyFeatureSection locale={locale} />

            {/* Final CTA Section */}
            <section className="py-20 md:py-28 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 relative overflow-hidden">
                <div className="absolute inset-0 opacity-20">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(16, 185, 129, 0.3) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)',
                    }} />
                </div>

                <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                        {p?.cta?.title || 'Ready to Build Your Web Application?'}
                    </h2>
                    <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto">
                        {p?.cta?.description || "Let's transform your idea into a powerful web application that drives your business growth."}
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href={`/${locale}/contact`}
                            className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-slate-900 bg-lavender rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
                        >
                            {p?.cta?.button || 'Start Your Project Today'}
                            <svg className="w-5 h-5 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            href={`/${locale}/services`}
                            className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-full hover:bg-lavender/10 transition-all duration-300"
                        >
                            {p?.cta?.explore || 'Explore All Services'}
                        </Link>
                    </div>

                    <div className="mt-16 pt-10 border-t border-white/10">
                        <p className="text-slate-400 text-sm uppercase tracking-wider mb-6">
                            {p?.whyChoose?.title || 'Why Choose Us'}
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10">
                            {(p?.whyChoose?.items || [
                                { label: 'Global Scale Apps' },
                                { label: 'Advanced Security' },
                                { label: 'High Performance' },
                                { label: 'Clean Code' },
                            ]).map((item: any) => (
                                <div key={item.label} className="flex items-center gap-2 text-center">
                                    <span className="text-emerald-400"><Rocket className="w-5 h-5" /></span>
                                    <span className="text-sm text-slate-300">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
