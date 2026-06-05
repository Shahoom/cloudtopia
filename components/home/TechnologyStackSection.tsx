'use client'

/**
 * TechnologyStackSection – CloudTopia homepage section
 * ─────────────────────────────────────────────────────
 * Layout mirrors the Dev Technosys reference:
 *   • Full-width black section (edge-to-edge, no card rounding)
 *   • Two-column header: title (left) + description (right)
 *   • Two-column body:   vertical tab list (left) | icon grid (right)
 *
 * ── How to update content ──────────────────────────────────────────────────
 * All data lives in `./technologyData.ts`.
 * • New category  → add to SERVICE_CATEGORIES + matching TECH_GROUPS entry.
 * • New technology → push to the correct subcategory's items[].
 * ────────────────────────────────────────────────────────────────────────────
 */

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import {
  Globe,
  Layout,
  Building2,
  Cloud,
  Bot,
  TrendingUp,
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import {
  SERVICE_CATEGORIES,
  TECH_GROUPS,
  type ServiceCategory,
  type TechGroup,
  type TechItem,
} from './technologyData'

// ─────────────────────────────────────────────────────────────────────────────
// Icon map
// ─────────────────────────────────────────────────────────────────────────────

type IconComponent = React.ComponentType<{ className?: string }>

const ICON_MAP: Record<string, IconComponent> = {
  Globe,
  Layout,
  Building2,
  Cloud,
  Bot,
  TrendingUp,
}

// ─────────────────────────────────────────────────────────────────────────────
// TechCard — dark icon tile matching reference photo
// ─────────────────────────────────────────────────────────────────────────────

function TechCard({ item }: { item: TechItem }) {
  return (
    <div className="group flex flex-row items-center justify-start gap-4 p-3 sm:p-4 rounded-xl bg-[#1a1f2e] hover:bg-[#1e2538] border border-white/[0.06] hover:border-[#0284c7]/40 transition-all duration-300 cursor-default select-none min-h-[72px] overflow-hidden">
      <div className="w-12 h-12 relative flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.icon}
          alt={item.name}
          loading="lazy"
          width={48}
          height={48}
          className="w-full h-full object-contain drop-shadow-sm"
          onError={(e) => {
            const target = e.currentTarget
            target.style.display = 'none'
            const fallback = target.nextElementSibling as HTMLElement | null
            if (fallback) fallback.style.display = 'flex'
          }}
        />
        {/* Initials fallback */}
        <span
          style={{ display: 'none' }}
          className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-[#0284c7] bg-[#0284c7]/10 rounded-lg"
        >
          {item.name.slice(0, 2).toUpperCase()}
        </span>
      </div>
      <span className="text-xs sm:text-sm text-start font-semibold text-slate-300 group-hover:text-white transition-colors duration-300 leading-tight flex-1 break-words pr-2">
        {item.name}
      </span>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Component
// ─────────────────────────────────────────────────────────────────────────────

export default function TechnologyStackSection() {
  const { locale } = useLanguage()
  const isRTL = locale === 'ar'

  const [activeId, setActiveId] = useState<string>(SERVICE_CATEGORIES[0].id)

  const activeCategoryIndex = SERVICE_CATEGORIES.findIndex((c) => c.id === activeId)
  const activeGroup: TechGroup | undefined = TECH_GROUPS.find(
    (g) => g.categoryId === activeId,
  )

  // Flatten all tech items from active group for the icon grid
  const allItems: TechItem[] = activeGroup?.subcategories.flatMap((s) => s.items) ?? []

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, index: number) => {
      const total = SERVICE_CATEGORIES.length
      let next = index
      if (e.key === 'ArrowDown') {
        next = (index + 1) % total
      } else if (e.key === 'ArrowUp') {
        next = (index - 1 + total) % total
      } else if (e.key === 'Home') {
        next = 0
      } else if (e.key === 'End') {
        next = total - 1
      } else {
        return
      }
      e.preventDefault()
      setActiveId(SERVICE_CATEGORIES[next].id)
    },
    [],
  )

  const copy = {
    title: isRTL ? 'التقنيات التي نستخدمها' : 'Our Technology Stack',
    subtitle: isRTL
      ? 'نختار تقنياتنا بناءً على ثبات الإنتاج، وقدرة التوسع، والكفاءة المثبتة عبر مئات المشاريع في المواقع، المنصات، أنظمة الأعمال، الحلول السحابية، الذكاء الاصطناعي والتسويق الرقمي.'
      : 'We select our technology stack based on proven production stability, global adoption, and certified expertise across hundreds of projects — spanning websites, web platforms, business systems, cloud, AI, and digital marketing.',
  }

  return (
    <section
      id="technology-stack-section"
      dir={isRTL ? 'rtl' : 'ltr'}
      className="relative w-full bg-[#07090f] overflow-hidden"
    >


      {/* ── Subtle top border to separate from previous section ── */}
      <div className="relative z-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="relative z-10 w-full px-4 sm:px-6 lg:px-12 py-8 md:py-12">

        {/* ── Two-column Header ─────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 mb-8 md:mb-10 items-start">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-tight"
          >
            {copy.title}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.08 }}
            className="text-slate-400 text-base md:text-lg leading-relaxed lg:pt-2"
          >
            {copy.subtitle}
          </motion.p>
        </div>

        {/* ── Main Two-column Body ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          className="flex flex-col lg:flex-row gap-0 rounded-2xl overflow-hidden border border-white/[0.07]"
        >

          {/* ── Left: Vertical Tab List ──────────────────────────────────── */}
          <div
            role="tablist"
            aria-label={isRTL ? 'فئات التقنيات' : 'Technology categories'}
            aria-orientation="vertical"
            className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible lg:w-72 xl:w-80 shrink-0 bg-[#0d1017] border-b lg:border-b-0 lg:border-e border-white/[0.07] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {SERVICE_CATEGORIES.map((cat: ServiceCategory, idx: number) => {
              const isActive = cat.id === activeId
              const Icon: IconComponent = ICON_MAP[cat.iconName] ?? Globe

              return (
                <button
                  key={cat.id}
                  id={`tab-${cat.id}`}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${cat.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveId(cat.id)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  className={`
                    relative flex items-center gap-3 px-6 py-5 text-base font-semibold
                    text-start whitespace-nowrap lg:whitespace-normal
                    transition-all duration-200 shrink-0
                    focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0284c7] focus-visible:outline-offset-[-2px]
                    ${isActive
                      ? 'bg-[#0284c7] text-white'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-white/[0.04]'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span>{locale === 'ar' ? cat.label.ar : cat.label.en}</span>

                  {/* Right-edge active indicator (desktop only) */}
                  {isActive && (
                    <motion.span
                      layoutId="tabActiveBar"
                      className="hidden lg:block absolute end-0 top-0 h-full w-[3px] bg-white/40 rounded-full"
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.45 }}
                    />
                  )}
                </button>
              )
            })}
          </div>

          {/* ── Right: Icon Grid ─────────────────────────────────────────── */}
          <div
            id={`panel-${activeId}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeId}`}
            className="flex-1 bg-[#111827] p-5 sm:p-6 min-h-[280px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeId}
                initial={{ opacity: 0, x: isRTL ? -16 : 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: isRTL ? 16 : -16 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                {/* Subcategory groups */}
                {activeGroup?.subcategories.map((sub, subIdx) => (
                  <div key={sub.label.en} className={subIdx > 0 ? 'mt-8' : ''}>
                    {/* Subcategory label – shown only if more than 1 subcategory */}
                    {(activeGroup.subcategories.length > 1) && (
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-xs font-bold uppercase tracking-[0.15em] text-[#0284c7]">
                          {locale === 'ar' ? sub.label.ar : sub.label.en}
                        </span>
                        <span className="flex-1 h-px bg-white/[0.06]" />
                      </div>
                    )}

                    {/* Icon grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-3 sm:gap-4">
                      {sub.items.map((tech, techIdx) => (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0.92 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.25, delay: techIdx * 0.04 }}
                        >
                          <TechCard item={tech} />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

        </motion.div>
      </div>

      {/* ── Subtle bottom border ── */}
      <div className="relative z-10 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  )
}
