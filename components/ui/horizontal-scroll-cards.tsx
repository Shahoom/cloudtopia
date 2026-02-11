'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { GlowingEffect } from './glowing-effect'
import { cn } from '@/lib/utils'

export interface ScrollCardItem {
    name: string
    tagline?: string
    icon: React.ReactNode
    description: string
    features: string[]
    gradient: string
    glowColor: string
}

interface HorizontalScrollCardsProps {
    cards: ScrollCardItem[]
    title?: string
    subtitle?: string
    whatsIncludedLabel?: string
    moreText?: string
    isRTL?: boolean
    variant?: 'light' | 'dark'
}

export function HorizontalScrollCards({
    cards,
    title,
    subtitle,
    whatsIncludedLabel = "What's Included:",
    moreText = 'more',
    isRTL = false,
    variant = 'light'
}: HorizontalScrollCardsProps) {

    return (
        <section className={cn(
            "py-10 md:py-16 relative overflow-hidden",
            variant === 'dark'
                ? "bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
                : "bg-white"
        )}>
            {/* Subtle background pattern for light mode */}
            {variant === 'light' && (
                <div className="absolute inset-0 pointer-events-none opacity-30">
                    <div className="absolute top-0 left-1/4 w-64 h-64 bg-purple-200 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-200 rounded-full blur-3xl" />
                </div>
            )}

            <div className="relative z-10">
                {/* Section Header */}
                {(title || subtitle) && (
                    <div className="max-w-7xl mx-auto px-4 md:px-6 mb-6 md:mb-10">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-center"
                        >
                            {title && (
                                <h2 className={cn(
                                    "text-xl md:text-2xl lg:text-3xl font-bold mb-2",
                                    variant === 'dark' ? "text-white" : "text-slate-900"
                                )}>
                                    {title}
                                </h2>
                            )}
                            {subtitle && (
                                <p className={cn(
                                    "text-sm md:text-base max-w-2xl mx-auto",
                                    variant === 'dark' ? "text-slate-300" : "text-slate-600"
                                )}>
                                    {subtitle}
                                </p>
                            )}
                        </motion.div>
                    </div>
                )}

                {/* Horizontal Scrolling Cards */}
                <div className="relative">
                    {/* Gradient fade edges */}
                    <div className={cn(
                        "absolute left-0 top-0 bottom-0 w-8 md:w-16 z-10 pointer-events-none",
                        variant === 'dark'
                            ? "bg-gradient-to-r from-slate-900 to-transparent"
                            : "bg-gradient-to-r from-white to-transparent"
                    )} />
                    <div className={cn(
                        "absolute right-0 top-0 bottom-0 w-8 md:w-16 z-10 pointer-events-none",
                        variant === 'dark'
                            ? "bg-gradient-to-l from-slate-900 to-transparent"
                            : "bg-gradient-to-l from-white to-transparent"
                    )} />

                    {/* Scrollable container - Fixed scrolling */}
                    <div
                        className="flex gap-4 md:gap-5 overflow-x-auto px-4 md:px-8 lg:px-16 py-3 cursor-grab active:cursor-grabbing"
                        style={{
                            scrollbarWidth: 'none',
                            msOverflowStyle: 'none',
                            WebkitOverflowScrolling: 'touch',
                            overflowX: 'scroll',
                        }}
                        dir={isRTL ? 'rtl' : 'ltr'}
                    >
                        {cards.map((card, index) => (
                            <motion.div
                                key={card.name}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.05 }}
                                className="flex-shrink-0 w-[240px] md:w-[260px] group"
                            >
                                {/* Card with Glowing Effect */}
                                <div className="relative h-full rounded-xl transition-all duration-300 hover:-translate-y-1">
                                    <GlowingEffect
                                        spread={35}
                                        glow={true}
                                        disabled={false}
                                        proximity={60}
                                        inactiveZone={0.01}
                                        borderWidth={2}
                                    />

                                    {/* Card Content - Compact */}
                                    <div className={cn(
                                        "relative h-full flex flex-col p-4 rounded-[0.9rem] border overflow-hidden z-10 transition-all duration-300",
                                        variant === 'dark'
                                            ? "bg-slate-900/80 backdrop-blur-xl border-white/10 hover:border-white/20"
                                            : "bg-white border-slate-200 hover:border-purple-300 shadow-md hover:shadow-lg"
                                    )}>
                                        {/* Icon & Name */}
                                        <div className="flex items-center gap-3 mb-3">
                                            <div className={cn(
                                                "w-10 h-10 flex items-center justify-center flex-shrink-0 rounded-lg transition-all duration-300",
                                                "group-hover:scale-105",
                                                variant === 'dark' ? "bg-white/5" : "bg-purple-50"
                                            )}>
                                                <div className="flex items-center justify-center w-7 h-7">
                                                    {card.icon}
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className={cn(
                                                    "text-sm font-bold leading-tight",
                                                    variant === 'dark' ? "text-white" : "text-slate-900"
                                                )}>
                                                    {card.name}
                                                </h3>
                                                {card.tagline && (
                                                    <p className={cn(
                                                        "text-[10px] font-medium mt-0.5",
                                                        variant === 'dark' ? "text-purple-400" : "text-purple-600"
                                                    )}>
                                                        {card.tagline}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className={cn(
                                            "text-xs mb-3 leading-relaxed",
                                            variant === 'dark' ? "text-slate-300" : "text-slate-600"
                                        )}>
                                            {card.description}
                                        </p>

                                        {/* Features */}
                                        <div className="flex-grow">
                                            <h4 className={cn(
                                                "text-[9px] font-bold uppercase tracking-widest mb-2",
                                                variant === 'dark' ? "text-slate-500" : "text-slate-400"
                                            )}>
                                                {whatsIncludedLabel}
                                            </h4>
                                            <ul className="space-y-1.5">
                                                {(Array.isArray(card.features) ? card.features : []).map((feature, idx) => (
                                                    <li key={idx} className="flex items-start gap-1.5">
                                                        <span className={cn(
                                                            "w-1 h-1 rounded-full mt-1.5 flex-shrink-0",
                                                            variant === 'dark' ? "bg-purple-400" : "bg-purple-500"
                                                        )} />
                                                        <span className={cn(
                                                            "text-xs leading-snug",
                                                            variant === 'dark' ? "text-slate-300" : "text-slate-600"
                                                        )}>
                                                            {feature}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Custom styles */}
            <style jsx global>{`
                @keyframes bounceX {
                    0%, 100% { transform: translateX(0); }
                    50% { transform: translateX(4px); }
                }
            `}</style>
        </section>
    )
}
