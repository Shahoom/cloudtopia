"use client"

import React, { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { GlowingEffect } from './glowing-effect'
import { Sparkles, CheckCircle2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface CardData {
    id: number
    title: string
    description: string
    image: string
    gradient: string
    category: string
    features: string[]
    status: string
}

interface InteractiveCardGalleryProps {
    cards?: CardData[]
    heading?: string
    subheading?: string
    ui?: {
        successScore: string
        response: string
        cta: string
        limited: string
    }
    isRTL?: boolean
    ctaLink?: string
}

const defaultCards: CardData[] = [
    {
        id: 1,
        title: "AI Booking Optimizer",
        description: "Intelligent scheduling that maximizes occupancy, minimizes conflict, and adapts in real-time to changing logistics.",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=90",
        gradient: "from-blue-500 via-indigo-500 to-violet-500",
        category: "Scheduling",
        features: ["Dynamic Traffic Modeling", "Real-time Conflict Resolution", "Occupancy Forecasting"],
        status: "Beta"
    }
]

const InteractiveCardGallery: React.FC<InteractiveCardGalleryProps> = ({
    cards = defaultCards,
    heading,
    subheading,
    ui = {
        successScore: "Success Score",
        response: "Response",
        cta: "Request Lab Access",
        limited: "Inquiry Required • Limited Availability"
    },
    isRTL = false,
    ctaLink = "/contact"
}) => {
    const [activeIndex, setActiveIndex] = useState(0)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const galleryRef = useRef<HTMLDivElement>(null)
    const [isHovering, setIsHovering] = useState(false)
    const [windowWidth, setWindowWidth] = useState(0)

    useEffect(() => {
        setWindowWidth(window.innerWidth)
        const handleResize = () => setWindowWidth(window.innerWidth)
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!galleryRef.current) return
        const rect = galleryRef.current.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width - 0.5
        const y = (e.clientY - rect.top) / rect.height - 0.5
        setMousePosition({ x, y })
    }

    const nextCard = () => setActiveIndex((prev) => (prev + 1) % cards.length)
    const prevCard = () => setActiveIndex((prev) => (prev - 1 + cards.length) % cards.length)
    const handleCardClick = (index: number) => setActiveIndex(index)

    const calculateCardStyles = (index: number) => {
        const diff = index - activeIndex
        const absDiff = Math.abs(diff)

        if (windowWidth < 768) {
            return {
                zIndex: cards.length - absDiff,
                transform: diff === 0
                    ? 'translateX(0) scale(1)'
                    : `translateX(${diff * 100}%) scale(0.9)`,
                opacity: diff === 0 ? 1 : 0,
                pointerEvents: (diff === 0 ? 'auto' : 'none') as any,
            }
        }

        const multiplier = isRTL ? -1 : 1
        return {
            zIndex: cards.length - absDiff,
            transform: diff === 0
                ? 'translateX(0) scale(1) translateZ(0)'
                : `translateX(${diff * 80 * multiplier}%) scale(${1 - absDiff * 0.2}) rotateY(${diff * -20 * multiplier}deg)`,
            opacity: 1 - absDiff * 0.5,
            filter: diff === 0 ? 'blur(0px)' : 'blur(8px)',
            pointerEvents: (diff === 0 ? 'auto' : 'none') as any,
        }
    }

    return (
        <div className="relative w-full overflow-hidden">
            {/* Background gradient that follows mouse */}
            <div
                className="absolute inset-0 opacity-100 z-0"
                style={{
                    backgroundImage: `radial-gradient(circle at ${(mousePosition.x + 0.5) * 100}% ${(mousePosition.y + 0.5) * 100}%, rgba(99, 102, 241, 0.1), transparent 50%)`,
                }}
            />

            {/* Floating particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(15)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-primary-500 opacity-[0.1]"
                        style={{
                            width: `${Math.random() * 6 + 2}px`,
                            height: `${Math.random() * 6 + 2}px`,
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            animation: `gallery-float ${Math.random() * 10 + 20}s linear infinite`,
                            animationDelay: `${Math.random() * 20}s`,
                        }}
                    />
                ))}
            </div>

            {/* Main container */}
            <div
                ref={galleryRef}
                className="relative w-full flex flex-col items-center justify-center z-10 px-4 sm:px-6 py-12 md:py-24"
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {/* Cards container */}
                <div className="relative w-full h-[580px] sm:h-[650px] md:h-[680px] lg:h-[720px] flex items-center justify-center">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.id || index}
                            className="absolute w-full sm:w-[90%] md:w-[85%] max-w-4xl rounded-[2.5rem] cursor-pointer pointer-events-auto origin-center"
                            style={{
                                ...calculateCardStyles(index),
                                transition: "all 0.8s cubic-bezier(0.23, 1, 0.32, 1)",
                            }}
                            whileHover={{
                                scale: index === activeIndex ? 1.01 : 1,
                                transition: { duration: 0.3 }
                            }}
                            onClick={() => handleCardClick(index)}
                        >
                            <div className="relative h-full rounded-[2.5rem]">
                                {index === activeIndex && (
                                    <GlowingEffect
                                        spread={70}
                                        glow={true}
                                        disabled={false}
                                        proximity={100}
                                        inactiveZone={0.01}
                                        borderWidth={4}
                                    />
                                )}

                                <div
                                    className={cn(
                                        "relative w-full h-full overflow-hidden rounded-[2.5rem] border border-white/[0.12] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] bg-[#050510]/90 backdrop-blur-3xl",
                                        isRTL ? "text-right" : "text-left"
                                    )}
                                    style={{
                                        transform: index === activeIndex && isHovering ? `perspective(2000px) rotateY(${mousePosition.x * 4}deg) rotateX(${-mousePosition.y * 4}deg)` : 'none',
                                        transition: "transform 0.4s ease-out",
                                    }}
                                >
                                    {/* Card image container */}
                                    <div className="relative aspect-[3/2] sm:aspect-[16/7] md:aspect-[21/8] w-full overflow-hidden group">
                                        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#050510] z-10" />
                                        <div className={cn("absolute inset-0 bg-gradient-to-br opacity-30 mix-blend-overlay z-10", card.gradient)} />
                                        <motion.img
                                            src={card.image}
                                            alt={card.title}
                                            className="absolute inset-0 w-full h-full object-cover z-0"
                                            animate={{ scale: index === activeIndex && isHovering ? 1.08 : 1 }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            loading="lazy"
                                        />

                                        {/* Badges Overlay */}
                                        <div className={cn("absolute top-3 sm:top-6 left-3 sm:left-6 right-3 sm:right-6 flex items-center justify-between z-20", isRTL && "flex-row-reverse")}>
                                            <div className="flex items-center gap-1.5 px-2.5 sm:px-4 py-1 sm:py-1.5 bg-black/60 backdrop-blur-md rounded-full border border-white/20">
                                                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                                <span className="text-[8px] sm:text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-white/90">
                                                    {card.status}
                                                </span>
                                            </div>
                                            <div className="px-2.5 sm:px-4 py-1 sm:py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10">
                                                <span className="text-[8px] sm:text-[10px] md:text-xs font-semibold text-white/70 tracking-widest uppercase">
                                                    {card.category}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card content */}
                                    <div className={cn(
                                        "relative p-5 sm:p-10 md:p-14 lg:p-16 flex flex-col md:flex-row items-center md:items-start md:justify-between gap-6 sm:gap-10",
                                        isRTL && "md:flex-row-reverse"
                                    )}>
                                        <div className="flex-1 text-center md:text-left">
                                            <div className={cn("flex items-center justify-center md:justify-start gap-4 mb-3 sm:mb-5", isRTL && "md:justify-end md:flex-row-reverse")}>
                                                <h3 className="text-xl sm:text-4xl md:text-5xl lg:text-6xl font-extralight text-white tracking-tight leading-none">
                                                    {card.title}
                                                </h3>
                                                {index === activeIndex && (
                                                    <motion.div
                                                        initial={{ opacity: 0, scale: 0 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        className="hidden sm:block"
                                                    >
                                                        <Sparkles className="w-5 h-5 sm:w-8 sm:h-8 text-amber-300 drop-shadow-[0_0_15px_rgba(252,211,77,0.4)]" />
                                                    </motion.div>
                                                )}
                                            </div>
                                            <p className={cn(
                                                "text-xs sm:text-base md:text-lg text-white/50 mb-6 sm:mb-10 leading-relaxed font-light max-w-2xl mx-auto md:mx-0",
                                                isRTL ? "md:mr-auto md:ml-0" : "md:ml-auto md:mr-0"
                                            )}>
                                                {card.description}
                                            </p>

                                            {/* Feature list - hidden on mobile for better space */}
                                            <div className={cn("hidden sm:flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-4", isRTL && "md:justify-end md:flex-row-reverse")}>
                                                {card.features.map((feature, fIdx) => (
                                                    <div key={fIdx} className={cn("flex items-center gap-2.5 group/feat", isRTL && "flex-row-reverse")}>
                                                        <div className={cn("w-5 h-5 rounded-full bg-gradient-to-r p-[1px] shadow-lg shadow-white/5 group-hover/feat:scale-110 transition-transform", card.gradient)}>
                                                            <div className="w-full h-full rounded-full bg-[#050510] flex items-center justify-center">
                                                                <CheckCircle2 className="w-3 h-3 text-white/80" />
                                                            </div>
                                                        </div>
                                                        <span className="text-xs sm:text-sm font-medium text-white/30 group-hover/feat:text-white/60 transition-colors uppercase tracking-widest leading-none">
                                                            {feature}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Status / Metric for Active Card */}
                                        <div className={cn(
                                            `shrink-0 flex flex-col items-center md:items-end gap-6 sm:gap-8 transition-all duration-700 ${index === activeIndex ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}`,
                                            isRTL ? "md:items-start" : "md:items-end"
                                        )}>
                                            {/* Metrics - hidden on mobile */}
                                            <div className={cn("hidden sm:flex gap-8 md:flex-col items-center", isRTL ? "md:items-start" : "md:items-end")}>
                                                <div className={isRTL ? "text-right" : "text-right"}>
                                                    <div className="text-4xl md:text-6xl lg:text-7xl font-black text-white leading-none tracking-tighter mb-2">98%</div>
                                                    <div className="text-[10px] md:text-xs font-semibold text-white/30 uppercase tracking-[0.4em]">{ui.successScore}</div>
                                                </div>
                                                <div className="w-px md:w-20 h-10 md:h-px bg-gradient-to-b md:bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                                                <div className={isRTL ? "text-right" : "text-right"}>
                                                    <div className="text-2xl md:text-3xl font-bold text-white/70 leading-none mb-1">0.4s</div>
                                                    <div className="text-[10px] text-white/30 uppercase tracking-[0.4em]">{ui.response}</div>
                                                </div>
                                            </div>

                                            <div className={cn("flex flex-col items-center gap-3", isRTL ? "md:items-start" : "md:items-end")}>
                                                <button
                                                    className={`relative group/btn overflow-hidden px-8 sm:px-12 py-3.5 sm:py-5 rounded-xl sm:rounded-2xl bg-white text-[#050510] text-[10px] sm:text-xs font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] shadow-[0_15px_40px_rgba(255,255,255,0.15)] hover:shadow-[0_25px_70px_rgba(255,255,255,0.3)] transition-all duration-500 hover:-translate-y-1 sm:hover:-translate-y-2`}
                                                    onClick={() => window.location.href = ctaLink}
                                                >
                                                    <div className={cn("absolute inset-0 bg-gradient-to-r opacity-0 group-hover/btn:opacity-15 transition-opacity", card.gradient)} />
                                                    {ui.cta}
                                                </button>
                                                <span className="text-[9px] sm:text-[10px] text-white/20 uppercase tracking-[0.2em] font-medium">{ui.limited}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Navigation */}
                <div className={cn("mt-14 sm:mt-20 flex items-center justify-center gap-4 sm:gap-8 z-20", isRTL && "flex-row-reverse")}>
                    <button
                        onClick={prevCard}
                        className="p-4 sm:p-5 rounded-full bg-[#050510] border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:scale-110 transition-all duration-300 group active:scale-95"
                        aria-label="Previous card"
                    >
                        <svg className={cn(
                            "w-6 h-6 text-white transition-transform",
                            isRTL ? "rotate-180 group-hover:translate-x-0.5" : "group-hover:-translate-x-0.5"
                        )} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </button>

                    <div className="flex items-center space-x-3 sm:space-x-5 px-6 py-4 rounded-full bg-white/60 backdrop-blur-xl border border-white/40 shadow-xl">
                        {cards.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => handleCardClick(index)}
                                className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 ${index === activeIndex
                                    ? 'bg-[#050510] w-8 sm:w-12 shadow-[0_0_15px_rgba(0,0,0,0.2)]'
                                    : 'bg-black/10 hover:bg-black/20 w-1.5 sm:w-2'
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>

                    <button
                        onClick={nextCard}
                        className="p-4 sm:p-5 rounded-full bg-[#050510] border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:scale-110 transition-all duration-300 group active:scale-95"
                        aria-label="Next card"
                    >
                        <svg className={cn(
                            "w-6 h-6 text-white transition-transform",
                            isRTL ? "rotate-180 group-hover:-translate-x-0.5" : "group-hover:translate-x-0.5"
                        )} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                </div>
            </div>

            <style jsx>{`
                @keyframes gallery-float {
                    0% { transform: translateY(0) translateX(0); }
                    50% { transform: translateY(-100px) translateX(80px); }
                    100% { transform: translateY(-200px) translateX(0); opacity: 0; }
                }
            `}</style>
        </div>
    )
}

export default InteractiveCardGallery
