import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { GlowingEffect } from './glowing-effect'
import { cn } from '@/lib/utils'
import { useLanguage } from '@/lib/i18n/LanguageContext'

export interface ScrollCardItem {
    name: string
    tagline?: string
    icon: React.ReactNode
    description: string
    features: string[]
    gradient: string
    glowColor: string
    /** When set, the whole card becomes a link to this URL (locale-resolved by the caller). */
    href?: string
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

function CardContent({
    card,
    variant,
    isRTL,
    whatsIncludedLabel,
    isDragging = false
}: {
    card: ScrollCardItem
    variant: 'light' | 'dark'
    isRTL: boolean
    whatsIncludedLabel: string
    isDragging?: boolean
}) {
    return (
        <div className={cn(
            "relative h-full rounded-2xl transition-all duration-500 group overflow-hidden",
            isDragging ? "pointer-events-none" : "pointer-events-auto"
        )}>
            <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={84}
                inactiveZone={0.01}
                borderWidth={2}
            />

            <div className={cn(
                "relative h-full flex flex-col p-6 rounded-2xl border transition-all duration-500 z-10",
                variant === 'dark'
                    ? "bg-zinc-900/50 backdrop-blur-xl border-white/5 group-hover:bg-zinc-900/80 group-hover:border-white/10"
                    : "bg-lavender/40 backdrop-blur-xl border-slate-200 group-hover:bg-lavender/60 group-hover:border-purple-200 group-hover:shadow-2xl shadow-xl shadow-slate-200/50"
            )}>
                <div className={cn(
                    "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500",
                    card.gradient
                )} />

                <div className="flex items-start gap-4 mb-6 relative z-10">
                    <div className={cn(
                        "w-12 h-12 flex items-center justify-center rounded-xl transition-all duration-500",
                        variant === 'dark' ? "bg-transparent group-hover:bg-lavender/10" : "bg-transparent group-hover:bg-lavender/10"
                    )}>
                        {card.icon}
                    </div>
                    <div className="flex-1">
                        <h3 className={cn(
                            "text-lg font-bold leading-tight mb-1",
                            variant === 'dark' ? "text-white" : "text-slate-900"
                        )}>
                            {card.name}
                        </h3>
                        {card.tagline && (
                            <p className={cn(
                                "text-xs font-bold bg-clip-text text-transparent",
                                card.gradient
                            )}>
                                {card.tagline}
                            </p>
                        )}
                    </div>
                </div>

                <p className={cn(
                    "text-sm mb-6 leading-relaxed relative z-10",
                    variant === 'dark' ? "text-slate-400" : "text-slate-600"
                )}>
                    {card.description}
                </p>

                <div className="mt-auto space-y-3 relative z-10">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                        {whatsIncludedLabel}
                    </h4>
                    <ul className="space-y-2">
                        {card.features.map((feature, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-xs font-medium text-slate-500">
                                <div className={cn(
                                    "w-1.5 h-1.5 rounded-full mt-1 flex-shrink-0",
                                    card.gradient
                                )} />
                                {feature}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export function HorizontalScrollCards({
    cards,
    title,
    subtitle,
    whatsIncludedLabel,
    moreText = 'more',
    isRTL = false,
    variant = 'light'
}: HorizontalScrollCardsProps) {
    const { dir, locale } = useLanguage()
    const defaultWhatsIncluded = locale === 'ar' ? 'ما يتضمنه:' : (false ? 'Neler Dahil:' : "What's Included:")
    const effectiveWhatsIncluded = whatsIncludedLabel || defaultWhatsIncluded
    const scrollRef = useRef<HTMLDivElement>(null)
    const [constraints, setConstraints] = useState(0)
    const [isDragging, setIsDragging] = useState(false)
    // True only when the last interaction was a drag, so a card link doesn't
    // navigate when the user was really dragging the strip. Reset on each new
    // pointer-down (a fresh potential click).
    const wasDraggingRef = useRef(false)

    const renderCard = (card: ScrollCardItem) => {
        const inner = (
            <CardContent card={card} variant={variant} isRTL={isRTL} whatsIncludedLabel={effectiveWhatsIncluded} />
        )
        if (!card.href) return inner
        return (
            <Link
                href={card.href}
                draggable={false}
                onClick={(e) => { if (wasDraggingRef.current) e.preventDefault() }}
                className="block h-full"
            >
                {inner}
            </Link>
        )
    }

    useEffect(() => {
        const updateConstraints = () => {
            if (scrollRef.current) {
                const scrollWidth = scrollRef.current.scrollWidth
                const clientWidth = scrollRef.current.offsetWidth
                setConstraints(clientWidth - scrollWidth)
            }
        }

        updateConstraints()
        window.addEventListener('resize', updateConstraints)
        return () => window.removeEventListener('resize', updateConstraints)
    }, [cards])

    return (
        <section className={cn(
            "py-10 md:py-20 relative overflow-hidden select-none",
            variant === 'dark'
                ? "bg-slate-950"
                : "bg-lavender"
        )}>
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                <div className={cn(
                    "absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 bg-gradient-to-br",
                    variant === 'dark' ? "from-lavender/30 to-lavender/30" : "from-purple-200 to-blue-100"
                )} />
            </div>

            <div className="relative z-10">
                {/* Section Header */}
                {(title || subtitle) && (
                    <div className="max-w-7xl mx-auto px-4 md:px-6 mb-8 md:mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className={isRTL ? "text-right" : "text-left"}
                        >
                            {title && (
                                <h2 className={cn(
                                    "text-2xl md:text-4xl font-black mb-3 tracking-tight",
                                    variant === 'dark' ? "text-white" : "text-slate-900"
                                )}>
                                    {title}
                                </h2>
                            )}
                            {subtitle && (
                                <p className={cn(
                                    "text-base md:text-lg max-w-2xl",
                                    variant === 'dark' ? "text-slate-400" : "text-slate-500"
                                )}>
                                    {subtitle}
                                </p>
                            )}
                        </motion.div>
                    </div>
                )}

                {/* Desktop Draggable Container */}
                <div className="hidden md:block relative">
                    <motion.div
                        ref={scrollRef}
                        drag="x"
                        dragConstraints={{
                            right: isRTL ? -constraints : 0,
                            left: isRTL ? 0 : constraints
                        }}
                        onPointerDownCapture={() => { wasDraggingRef.current = false }}
                        onDragStart={() => { setIsDragging(true); wasDraggingRef.current = true }}
                        onDragEnd={() => setIsDragging(false)}
                        className={cn(
                            "flex gap-6 cursor-grab active:cursor-grabbing py-4",
                            isRTL ? "pr-4 md:pr-8 lg:pr-16" : "pl-4 md:pl-8 lg:pl-16"
                        )}
                        style={{ x: 0 }}
                    >
                        {cards.map((card, index) => (
                            <motion.div
                                key={card.name}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="flex-shrink-0 w-[420px]"
                            >
                                {renderCard(card)}
                            </motion.div>
                        ))}
                        <div className="flex-shrink-0 w-32 h-1" />
                    </motion.div>
                </div>

                {/* Mobile Vertical Stack */}
                <div className="md:hidden px-4 space-y-6">
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            {renderCard(card)}
                        </motion.div>
                    ))}
                </div>

                {/* Visual indicator for dragging */}
                <div className="max-w-7xl mx-auto px-4 md:px-6 mt-8 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                            {dir === 'rtl'
                                ? 'اسحب للاستكشاف' : 'Drag to explore'}
                        </span>
                        <div className="w-12 h-[1px] bg-slate-200" />
                    </div>
                </div>
            </div>
        </section >
    )
}
