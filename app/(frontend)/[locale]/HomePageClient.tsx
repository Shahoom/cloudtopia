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
import { ViewportEnhancement } from '@/components/performance/ViewportEnhancement'
import { ServicesGridStatic } from '@/components/home/ServicesGridStatic'
import { AiDigitalServicesStatic } from '@/components/home/AiDigitalServicesStatic'
import { AuroraBackground } from '@/components/ui/aurora-background'
import { type TeaserPost } from '@/components/home/ArticlesTeaser'

// Everything below the hero is code-split. ssr stays on (next/dynamic default)
// so every section's markup is still server-rendered for SEO and CLS stays at
// zero — the win is that the initial homepage chunk is small and the browser
// parses the rest as several short tasks instead of one long blocking one
// (addresses "reduce unused JavaScript" + "avoid long main-thread tasks").
const ServicesGrid = dynamic(() => import('@/components/home/ServicesGrid'))
const AiDigitalServices = dynamic(() => import('@/components/home/AiDigitalServices'))
const IndustriesPreview = dynamic(() => import('@/components/home/IndustriesPreview'))
const SolutionFinder = dynamic(() => import('@/components/solution-finder/SolutionFinder'))
const EnterpriseGrowthCTA = dynamic(() => import('@/components/home/EnterpriseGrowthCTA'))
const WorkWithSection = dynamic(() => import('@/components/home/WorkWithSection'))
const TechnologyStackSection = dynamic(() => import('@/components/home/TechnologyStackSection'))
const WhyCloudTopia = dynamic(() => import('@/components/home/WhyCloudTopia'))
const HowWeWork = dynamic(() => import('@/components/home/HowWeWork'))
const FAQ = dynamic(() => import('@/components/home/FAQ'))
const FinalCTA = dynamic(() => import('@/components/home/FinalCTA'))
const ArticlesTeaser = dynamic(() => import('@/components/home/ArticlesTeaser'))
const Testimonials = dynamic(() => import('@/components/home/Testimonials'))

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

export default function HomePageClient({ articlePosts }: { articlePosts?: TeaserPost[] }) {
    const { locale, t } = useLanguage()
    // The layout's LanguageProvider already carries the merged CMS dictionary;
    // reading it from context avoids serializing the whole dictionary twice.
    const dict = t as any
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
            }>)?.filter((p) => p.featured).slice(0, 6) || [],
        [dict.projects?.projectCards]
    )

    return (
        <Fragment>
            {/* 1. Cloud Hero */}
            <CloudHero />

            {/* 3. Philosophy */}
            <section className="relative overflow-hidden px-4 py-16 sm:px-6 md:py-20 lg:px-8" data-header-theme="dark">
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
                        className="absolute top-0 left-1/4 h-[360px] w-[360px] rounded-full bg-lavender/20 blur-[100px]"
                    />
                    <motion.div
                        style={{ y: backgroundY }}
                        className="absolute bottom-0 right-1/4 h-[300px] w-[300px] rounded-full bg-lavender/20 blur-[100px]"
                    />
                </div>

                <div className="relative z-10 mx-auto max-w-4xl text-center">
                    <FloatingCard>
                        <motion.div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-lavender/20 px-4 py-2">
                            <Cloud className="h-4 w-4 text-blue-400" />
                            <span className="text-sm font-medium text-blue-300">{t.home?.philosophy?.badge}</span>
                        </motion.div>
                    </FloatingCard>

                    <FloatingCard delay={0.1}>
                        <h2 className="mb-5 text-3xl font-bold leading-[1.1] text-white md:text-4xl lg:text-5xl">
                            {(typeof t.home?.philosophy?.title === 'string' ? t.home?.philosophy?.title : 'What Does')}{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                                {t.home?.philosophy?.highlight || '"The Cloud"'}
                            </span>{' '}
                            {t.home?.philosophy?.titleEnd || 'Mean?'}
                        </h2>
                    </FloatingCard>

                    <FloatingCard delay={0.2}>
                        <p className="mx-auto max-w-3xl text-base font-medium leading-7 text-white/75 md:text-lg md:leading-8">
                            {t.home?.philosophy?.description}
                        </p>
                    </FloatingCard>
                </div>
            </section>

            {/* 4. Services Grid — static localized shell first; the interactive
                grid (and its chunk) swaps in near the viewport */}
            <ViewportEnhancement fallback={<ServicesGridStatic locale={isRTL ? 'ar' : 'en'} />} minHeight={900}>
                <ServicesGrid />
            </ViewportEnhancement>

            {/* AI & Digital Systems Services */}
            <ViewportEnhancement fallback={<AiDigitalServicesStatic locale={isRTL ? 'ar' : 'en'} />} minHeight={900}>
                <AiDigitalServices />
            </ViewportEnhancement>

            {/* 5. Industries */}
            <IndustriesPreview />

            {/* 6. Solution Finder — replaces EnterpriseProof */}
            <SolutionFinder />

            {/* Premium Enterprise CTA Banner */}
            <EnterpriseGrowthCTA />

            {/* "We Work With" Business Types Section */}
            <div className="cv-auto">
                <WorkWithSection />
            </div>

            {/* Technology Stack – after "We Work With" */}
            <div className="cv-auto">
                <TechnologyStackSection />
            </div>

            {/* 7. Why CloudTopia */}
            <div className="cv-auto">
                <WhyCloudTopia />
            </div>

            {/* 8. Testimonials */}
            <Testimonials />

            {/* 9. How We Work */}
            <div className="cv-auto">
                <HowWeWork />
            </div>

            {/* 9. FAQ */}
            <div className="cv-auto">
                <FAQ />
            </div>

            {/* 10. Featured Projects */}
            <AuroraBackground className="py-8 md:py-10 px-4 sm:px-6 lg:px-8 min-h-0 w-full" data-header-theme="light">
                <div className="max-w-[1400px] mx-auto w-full">
                    <div className="text-center mb-10">
                        <FloatingCard>
                            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-primary-500/20 mb-8">
                                <Code2 className="w-5 h-5 text-primary-600" />
                                <span className="text-primary-800 font-medium">{t.home?.featuredProjects?.badge || 'Featured Projects'}</span>
                            </motion.div>
                        </FloatingCard>

                        <FloatingCard delay={0.1}>
                            <h2 className="text-3xl md:text-5xl font-bold text-neutral-900 mb-6">
                                {t.home?.featuredProjects?.title || 'Our Recent'}{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-400">
                                    {t.home?.featuredProjects?.titleHighlight || 'Success Stories'}
                                </span>
                            </h2>
                        </FloatingCard>

                        <FloatingCard delay={0.2}>
                            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                                {t.home?.featuredProjects?.description}
                            </p>
                        </FloatingCard>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredProjects.map((project: any, index: number) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.2 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ y: -6 }}
                                className="group relative bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 overflow-hidden hover:border-white/80 transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 flex flex-col"
                            >
                                <div className="relative h-48 overflow-hidden shrink-0">
                                    {project.image && (
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            fill
                                            sizes="(max-width: 768px) 100vw, 33vw"
                                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                                        />
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm text-xs font-bold text-primary-800 rounded-full uppercase tracking-wide">
                                            {project.type}
                                        </span>
                                    </div>

                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1.5 bg-primary-600 backdrop-blur-sm text-xs font-bold text-white rounded-full shadow-sm">
                                            {project.metrics.value}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 flex flex-col flex-1">
                                    <h3 className="text-lg font-bold text-neutral-900 mb-2 group-hover:text-primary-600 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-neutral-600 text-sm mb-4 leading-relaxed line-clamp-2">
                                        {project.solution}
                                    </p>

                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {project.features.slice(0, 3).map((feature: string) => (
                                            <span key={feature} className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-600 text-xs font-medium">
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="mt-auto pt-4 border-t border-neutral-100">
                                        {project.link && (
                                            <a
                                                href={project.link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors"
                                            >
                                                {t.home?.featuredProjects?.visitProject || 'Visit Project'} <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <FloatingCard delay={0.4} className="text-center mt-12">
                        <Link href={localePath(locale, '/projects')}>
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-8 py-4 bg-primary-600 text-white font-semibold rounded-2xl hover:bg-primary-700 transition-colors shadow-lg shadow-primary-500/20 inline-flex items-center gap-2"
                            >
                                {t.home?.featuredProjects?.viewAll || 'View All Projects'}
                                <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
                            </motion.button>
                        </Link>
                    </FloatingCard>
                </div>
            </AuroraBackground>

            {/* 10. Insights */}
            <ArticlesTeaser posts={articlePosts} />

            {/* 12. Final CTA */}
            <FinalCTA />
        </Fragment>
    )
}
