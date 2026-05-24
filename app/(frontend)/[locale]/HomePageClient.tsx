'use client'

import { Fragment, useMemo } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
    Cloud,
    Code2,
    ArrowRight,
    ExternalLink,
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localePath } from '@/lib/i18n/url'
import dynamic from 'next/dynamic'

import CloudHero from '@/components/home/CloudHero'
import ServicesGrid from '@/components/home/ServicesGrid'
import WhyCloudTopia from '@/components/home/WhyCloudTopia'
import HowWeWork from '@/components/home/HowWeWork'
import FAQ from '@/components/home/FAQ'
import FinalCTA from '@/components/home/FinalCTA'

const StarsCanvas = dynamic(
    () => import('@/components/ui/stars-canvas').then((mod) => mod.StarsCanvas),
    { ssr: false }
)

function FloatingCard({
    children,
    className = '',
    delay = 0,
    direction = 'up',
}: {
    children?: React.ReactNode
    className?: string
    delay?: number
    direction?: 'up' | 'down' | 'left' | 'right'
}) {
    const directionMap = {
        up: { y: 30, x: 0 },
        down: { y: -30, x: 0 },
        left: { x: 30, y: 0 },
        right: { x: -30, y: 0 },
    }

    return (
        <motion.div
            initial={{ opacity: 0, ...directionMap[direction] }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

export default function HomePageClient({ serverDictionary }: { serverDictionary?: any }) {
    const { locale, t } = useLanguage()
    // Prefer server-fetched dictionary (from getPageBundle) when available,
    // falling back to context for backward compatibility.
    const dict = serverDictionary || t
    const { scrollYProgress } = useScroll()
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const isRTL = locale === 'ar'

    const featuredProjects = useMemo(
        () =>
            (dict.projects?.projectCards as Array<{
                id: string
                category: string
                type: string
                featured: boolean
                title: string
                problem: string
                solution: string
                features: string[]
                image: string
                metrics: { label: string; value: string }
                link?: string
            }>)?.filter((p) => p.featured).slice(0, 3) || [],
        [dict.projects?.projectCards]
    )

    return (
        <Fragment>
            {/* 1. Cloud Hero */}
            <CloudHero />

            {/* 2. Philosophy */}
            <section className="relative py-28 md:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden" data-header-theme="dark">
                <StarsCanvas
                    transparent={false}
                    maxStars={80}
                    hue={217}
                    brightness={0.7}
                    speedMultiplier={0.3}
                    twinkleIntensity={40}
                    position="absolute"
                    className="z-0"
                />

                <div className="absolute inset-0 z-[1] pointer-events-none">
                    <motion.div
                        style={{ y: backgroundY }}
                        className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-lavender/20 rounded-full blur-[120px]"
                    />
                    <motion.div
                        style={{ y: backgroundY }}
                        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-lavender/20 rounded-full blur-[120px]"
                    />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto text-center">
                    <FloatingCard>
                        <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender/20 border border-blue-500/30 mb-8">
                            <Cloud className="w-5 h-5 text-blue-400" />
                            <span className="text-blue-300 font-medium">{t.home?.philosophy?.badge}</span>
                        </motion.div>
                    </FloatingCard>

                    <FloatingCard delay={0.1}>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-[1.1]">
                            {(typeof t.home?.philosophy?.title === 'string' ? t.home?.philosophy?.title : 'What Does')}{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                {t.home?.philosophy?.highlight || '"The Cloud"'}
                            </span>{' '}
                            {t.home?.philosophy?.titleEnd || 'Mean?'}
                        </h2>
                    </FloatingCard>

                    <FloatingCard delay={0.2}>
                        <p className="text-xl text-white/75 leading-relaxed max-w-3xl mx-auto">
                            {t.home?.philosophy?.description}
                        </p>
                    </FloatingCard>
                </div>
            </section>

            {/* 3. Services Grid */}
            <ServicesGrid />

            {/* 4. Why CloudTopia */}
            <WhyCloudTopia />

            {/* 5. How We Work */}
            <HowWeWork />

            {/* 6. FAQ */}
            <FAQ />

            {/* 7. Featured Projects */}
            <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a1a]" data-header-theme="dark">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <FloatingCard>
                            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender/20 border border-cyan-500/30 mb-8">
                                <Code2 className="w-5 h-5 text-cyan-400" />
                                <span className="text-cyan-300 font-medium">{t.home?.featuredProjects?.badge || 'Featured Projects'}</span>
                            </motion.div>
                        </FloatingCard>

                        <FloatingCard delay={0.1}>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                {t.home?.featuredProjects?.title || 'Our Recent'}{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                                    {t.home?.featuredProjects?.titleHighlight || 'Success Stories'}
                                </span>
                            </h2>
                        </FloatingCard>

                        <FloatingCard delay={0.2}>
                            <p className="text-xl text-white/70 max-w-2xl mx-auto">
                                {t.home?.featuredProjects?.description}
                            </p>
                        </FloatingCard>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {featuredProjects.map((project: any, index: number) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                whileHover={{ y: -8 }}
                                className="group relative bg-lavender/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/10"
                            >
                                <div className="relative h-52 overflow-hidden">
                                    {project.image && (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1.5 bg-lavender/90 backdrop-blur-sm text-xs font-bold text-neutral-800 rounded-full uppercase tracking-wide">
                                            {project.type}
                                        </span>
                                    </div>

                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1.5 bg-lavender/90 backdrop-blur-sm text-xs font-bold text-white rounded-full">
                                            {project.metrics.value}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-white/70 text-sm mb-4 leading-relaxed line-clamp-2">
                                        {project.solution}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {project.features.slice(0, 3).map((feature: string) => (
                                            <span key={feature} className="px-3 py-1 rounded-full bg-lavender/10 text-white/70 text-xs font-medium">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                    {project.link && (
                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors"
                                        >
                                            {t.home?.featuredProjects?.visitProject || 'Visit Project'} <ExternalLink className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <FloatingCard delay={0.4} className="text-center mt-12">
                        <Link href={localePath(locale, '/projects')}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-lavender/10 backdrop-blur-sm text-white font-semibold rounded-2xl hover:bg-lavender/20 transition-colors border border-white/20 inline-flex items-center gap-2"
                            >
                                {t.home?.featuredProjects?.viewAll || 'View All Projects'}
                                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                            </motion.button>
                        </Link>
                    </FloatingCard>
                </div>
            </section>

            {/* 8. Final CTA */}
            <FinalCTA />
        </Fragment>
    )
}
