'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
    Cloud,
    Code2,
    ArrowRight,
    Rocket,
    ExternalLink,
    Mail,
} from 'lucide-react'
import Hero from '@/components/ui/hero-button-expendable'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { AuroraBackground } from '@/components/ui/aurora-background'
import dynamic from 'next/dynamic'

const StarsCanvas = dynamic(() => import('@/components/ui/stars-canvas').then(mod => mod.StarsCanvas), { ssr: false })


// Floating card component with parallax effect
function FloatingCard({
    children,
    className = '',
    delay = 0,
    direction = 'up'
}: {
    children: React.ReactNode
    className?: string
    delay?: number
    direction?: 'up' | 'down' | 'left' | 'right'
}) {
    const directionMap = {
        up: { y: 30, x: 0 },
        down: { y: -30, x: 0 },
        left: { x: 30, y: 0 },
        right: { x: -30, y: 0 }
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


// Journey Step Component — redesigned for white section with icon images
function JourneyStep({
    iconImage,
    number,
    title,
    description,
    accent,
    href,
    index
}: {
    iconImage: string
    number: string
    title: string
    description: string
    accent: string
    href: string
    index: number
}) {
    const { t } = useLanguage()
    const [isHovered, setIsHovered] = useState(false)

    const accentStyles: Record<string, { bg: string; border: string; text: string; glow: string; badge: string }> = {
        blue: { bg: 'bg-white/40', border: 'border-blue-200/50 hover:border-blue-400', text: 'text-blue-600', glow: 'shadow-blue-200/50', badge: 'bg-blue-600' },
        purple: { bg: 'bg-white/40', border: 'border-purple-200/50 hover:border-purple-400', text: 'text-purple-600', glow: 'shadow-purple-200/50', badge: 'bg-purple-600' },
        emerald: { bg: 'bg-white/40', border: 'border-emerald-200/50 hover:border-emerald-400', text: 'text-emerald-600', glow: 'shadow-emerald-200/50', badge: 'bg-emerald-600' },
        amber: { bg: 'bg-white/40', border: 'border-amber-200/50 hover:border-amber-400', text: 'text-amber-600', glow: 'shadow-amber-200/50', badge: 'bg-amber-600' },
    }

    const s = accentStyles[accent] || accentStyles.blue

    return (
        <Link href={href}>
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.15 }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className={`group relative rounded-2xl border-2 ${s.border} bg-white/40 backdrop-blur-sm p-8 transition-all duration-500 cursor-pointer ${isHovered ? `shadow-xl ${s.glow} -translate-y-2` : 'shadow-sm'
                    }`}
            >
                {/* Step number badge */}
                <div className={`absolute -top-4 -left-2 w-10 h-10 rounded-xl ${s.badge} text-white text-sm font-bold flex items-center justify-center shadow-lg transition-transform duration-300 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
                    {number}
                </div>

                <div className="flex items-start gap-5">
                    {/* Icon image */}
                    <motion.div
                        animate={{ scale: isHovered ? 1.1 : 1, rotate: isHovered ? 5 : 0 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className={`flex-shrink-0 w-16 h-16 rounded-2xl ${s.bg} flex items-center justify-center p-3 transition-all duration-300`}
                    >
                        <Image
                            src={iconImage}
                            alt={title}
                            width={48}
                            height={48}
                            quality={50}
                            className="w-full h-full object-contain"
                        />
                    </motion.div>

                    <div className="flex-1 min-w-0">
                        <h3 className={`text-lg font-bold text-neutral-900 mb-1 transition-colors duration-300 group-hover:${s.text}`}>
                            {title}
                        </h3>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                            {description}
                        </p>

                        {/* Animated arrow indicator */}
                        <motion.div
                            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -10 }}
                            transition={{ duration: 0.3 }}
                            className={`mt-3 flex items-center gap-1.5 text-sm font-medium ${s.text}`}
                        >
                            {t.common?.learnMore || 'Learn more'} <ArrowRight className="w-4 h-4" />
                        </motion.div>
                    </div>
                </div>

                {/* Bottom accent line */}
                <motion.div
                    animate={{ scaleX: isHovered ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className={`absolute bottom-0 left-0 right-0 h-1 ${s.badge} rounded-b-2xl origin-left`}
                />
            </motion.div>
        </Link>
    )
}

// Main Homepage Component
export default function HomePage() {
    const { locale, t } = useLanguage()
    const { scrollYProgress } = useScroll()
    const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
    const isRTL = locale === 'ar'

    // Real projects from the projects page translations
    const featuredProjects = (t.projects?.projectCards as Array<{
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
    }>)?.filter(p => p.featured).slice(0, 3) || []

    // Journey steps from translations
    const journeyStepsData = t.home?.journey?.steps as Array<{
        number: string
        title: string
        description: string
    }> || []

    const journeySteps = [
        { iconImage: '/icons/services/digitalpresence.png', number: journeyStepsData[0]?.number || '01', title: journeyStepsData[0]?.title || 'Digital Presence', description: journeyStepsData[0]?.description || 'Establish your online identity with websites, social media, and digital marketing.', accent: 'blue', href: `/${locale}/services` },
        { iconImage: '/icons/services/systems.png', number: journeyStepsData[1]?.number || '02', title: journeyStepsData[1]?.title || 'Business Systems', description: journeyStepsData[1]?.description || 'Streamline operations with custom CRM, inventory, and management systems.', accent: 'purple', href: `/${locale}/services` },
        { iconImage: '/icons/services/webapps.png', number: journeyStepsData[2]?.number || '03', title: journeyStepsData[2]?.title || 'Web Applications', description: journeyStepsData[2]?.description || 'Build interactive platforms, portals, and SaaS solutions for your customers.', accent: 'emerald', href: `/${locale}/services` },
        { iconImage: '/icons/services/Analytics Dashboard.png', number: journeyStepsData[3]?.number || '04', title: journeyStepsData[3]?.title || 'Labs', description: journeyStepsData[3]?.description || 'Explore AI-powered tools and innovative experiments pushing the boundaries of technology.', accent: 'amber', href: `/${locale}/labs` }
    ]

    return (
        <div className="relative min-h-screen bg-[#0a0a1a] overflow-x-hidden" dir={isRTL ? 'rtl' : 'ltr'}>

            {/* Section 1: Hero with Aurora Flux Effect */}
            <section className="relative bg-zinc-950" data-header-theme="dark">
                <Hero />
            </section>

            {/* Section 2: Philosophy with Stars Canvas Background */}
            <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden" data-header-theme="dark">
                {/* Stars Canvas - Only for this section, optimized for performance */}
                <StarsCanvas
                    transparent={false}
                    maxStars={80}
                    hue={217}
                    brightness={0.7}
                    speedMultiplier={0.3} // Slower for less load
                    twinkleIntensity={40}
                    position="absolute"
                    className="z-0"
                />

                {/* Ambient gradient overlays */}
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
                        <motion.div
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender/20 border border-blue-500/30 mb-8"
                        >
                            <Cloud className="w-5 h-5 text-blue-400" />
                            <span className="text-blue-300 font-medium">{t.home?.philosophy?.badge}</span>
                        </motion.div>
                    </FloatingCard>

                    <FloatingCard delay={0.1}>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-8">
                            {t.home?.philosophy?.title || 'What Does'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">{t.home?.philosophy?.highlight || '"The Cloud"'}</span> {t.home?.philosophy?.titleEnd || 'Mean?'}
                        </h2>
                    </FloatingCard>

                    <FloatingCard delay={0.2}>
                        <p className="text-xl text-white/70 leading-relaxed max-w-3xl mx-auto">
                            {t.home?.philosophy?.description || 'At CloudTopia, "the cloud" means the internet itself. We help businesses move their operations, presence, and systems online — making them accessible, scalable, and connected from anywhere in the world.'}
                        </p>
                    </FloatingCard>
                </div>
            </section>

            {/* Section 3: Your Journey — Aurora Section */}
            <AuroraBackground className="!h-auto !bg-[#F4F5F5] py-28 px-4 sm:px-6 lg:px-8">
                <div className="relative z-10 max-w-7xl mx-auto w-full">
                    <div className="text-center mb-20">
                        <FloatingCard>
                            <motion.div
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-emerald-200 mb-8 shadow-sm"
                            >
                                <Rocket className="w-5 h-5 text-emerald-600" />
                                <span className="text-emerald-700 font-semibold text-sm">{t.home?.journey?.title || 'Your Cloud Journey'}</span>
                            </motion.div>
                        </FloatingCard>

                        <FloatingCard delay={0.1}>
                            <h2 className="text-2xl md:text-5xl font-bold text-neutral-900 mb-6">
                                {isRTL ? (
                                    <>{t.home?.journey?.subtitle || 'نبدأ معك من حيث أنت ونساعدك على النمو.'}</>
                                ) : (
                                    <>We Meet You <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">Where You Are</span></>
                                )}
                            </h2>
                        </FloatingCard>
                        <FloatingCard delay={0.2}>
                            <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                                {isRTL
                                    ? 'سواء كنت في بداية رحلتك الرقمية أو جاهز للتوسع، لدينا حلول لكل مرحلة.'
                                    : 'Whether you\'re just starting your digital journey or ready to scale, we have solutions for every stage.'}
                            </p>
                        </FloatingCard>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {journeySteps.map((step, index) => (
                            <JourneyStep key={index} {...step} index={index} />
                        ))}
                    </div>
                </div>
            </AuroraBackground>



            {/* Section 4: Featured Projects */}
            <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-[#0a0a1a]" data-header-theme="dark">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <FloatingCard>
                            <motion.div
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lavender/20 border border-cyan-500/30 mb-8"
                            >
                                <Code2 className="w-5 h-5 text-cyan-400" />
                                <span className="text-cyan-300 font-medium">{t.home?.featuredProjects?.badge || 'Featured Projects'}</span>
                            </motion.div>
                        </FloatingCard>

                        <FloatingCard delay={0.1}>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                                {t.home?.featuredProjects?.title || 'Our Recent'} <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{t.home?.featuredProjects?.titleHighlight || 'Success Stories'}</span>
                            </h2>
                        </FloatingCard>

                        <FloatingCard delay={0.2}>
                            <p className="text-xl text-white/70 max-w-2xl mx-auto">
                                {t.home?.featuredProjects?.description || 'Real solutions for real businesses. See how we\'ve helped companies across the Middle East succeed in the cloud.'}
                            </p>
                        </FloatingCard>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {featuredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, amount: 0.3 }}
                                transition={{ duration: 0.6, delay: index * 0.15 }}
                                whileHover={{ y: -8 }}
                                className="group relative bg-lavender/5 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden hover:border-white/20 transition-all duration-500 hover:shadow-xl hover:shadow-cyan-500/10"
                            >
                                {/* Project Image */}
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

                                    {/* Type badge */}
                                    <div className="absolute top-4 left-4">
                                        <span className="px-3 py-1.5 bg-lavender/90 backdrop-blur-sm text-xs font-bold text-neutral-800 rounded-full uppercase tracking-wide">
                                            {project.type}
                                        </span>
                                    </div>

                                    {/* Metric badge */}
                                    <div className="absolute top-4 right-4">
                                        <span className="px-3 py-1.5 bg-lavender/90 backdrop-blur-sm text-xs font-bold text-white rounded-full">
                                            {project.metrics.value}
                                        </span>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-white/70 text-sm mb-4 leading-relaxed line-clamp-2">
                                        {project.solution}
                                    </p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2 mb-5">
                                        {project.features.slice(0, 3).map((feature) => (
                                            <span
                                                key={feature}
                                                className="px-3 py-1 rounded-full bg-lavender/10 text-white/70 text-xs font-medium"
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Link */}
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

                    {/* View all projects button */}
                    <FloatingCard delay={0.4} className="text-center mt-12">
                        <Link href={`/${locale}/projects`}>
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

        </div>
    )
}
