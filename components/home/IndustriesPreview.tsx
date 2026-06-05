'use client'

import { KeyboardEvent, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  Banknote,
  Building2,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  GraduationCap,
  HeartPulse,
  Plane,
  Rocket,
  ShoppingBag,
  Truck,
  Utensils,
  type LucideIcon,
} from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import IndustryCard from './IndustryCard'
import { homeIndustrySlides, type HomeIndustryLocale, type HomeIndustrySlide } from './industryData'

const iconMap: Record<HomeIndustrySlide['icon'], LucideIcon> = {
  finance: Banknote,
  healthcare: HeartPulse,
  education: GraduationCap,
  logistics: Truck,
  travel: Plane,
  'real-estate': Building2,
  entertainment: Clapperboard,
  ecommerce: ShoppingBag,
  restaurants: Utensils,
  startups: Rocket,
}

export default function IndustriesPreview() {
  const { locale } = useLanguage()
  const sectionLocale = (locale === 'ar' ? 'ar' : 'en') as HomeIndustryLocale
  const isRTL = sectionLocale === 'ar'
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])
  const activeIndustry = homeIndustrySlides[activeIndex]

  function selectIndex(nextIndex: number) {
    const normalized = (nextIndex + homeIndustrySlides.length) % homeIndustrySlides.length
    setDirection(normalized >= activeIndex ? 1 : -1)
    setActiveIndex(normalized)
    window.setTimeout(() => tabRefs.current[normalized]?.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' }), 0)
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return
    event.preventDefault()

    if (event.key === 'Home') return selectIndex(0)
    if (event.key === 'End') return selectIndex(homeIndustrySlides.length - 1)

    const visualNext = event.key === 'ArrowRight' ? 1 : -1
    selectIndex(activeIndex + (isRTL ? -visualNext : visualNext))
  }

  function goPrevious() {
    selectIndex(activeIndex - 1)
  }

  function goNext() {
    selectIndex(activeIndex + 1)
  }

  return (
    <section
      id="industries"
      className="relative overflow-hidden bg-[#f4f1f8] px-4 py-20 sm:px-6 lg:px-8 md:py-28"
      data-header-theme="light"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_10%,rgba(2,132,199,0.16),transparent_30%),radial-gradient(circle_at_88%_18%,rgba(15,23,42,0.07),transparent_30%)]" />
      <div className="relative mx-auto max-w-[92rem]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-10 max-w-5xl text-center"
        >
          <h2 className="text-3xl font-black tracking-normal text-[#0f172a] sm:text-4xl md:text-5xl">
            {sectionLocale === 'ar' ? 'حلول مبتكرة لكل قطاع' : 'Innovative Solutions for Every Industry'}
          </h2>
          <p className="mx-auto mt-5 max-w-4xl text-sm font-semibold leading-7 text-slate-600 sm:text-base">
            {sectionLocale === 'ar'
              ? 'نبني مواقع وتطبيقات وأنظمة CRM ومنصات مدعومة بالذكاء الاصطناعي لمساعدة الشركات في كل قطاع على التحول الرقمي.'
              : 'We build custom websites, applications, CRM systems, and AI-powered platforms to help companies in every industry transform digitally.'}
          </p>
        </motion.div>

        <div className="relative mx-auto max-w-[78rem] overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#080d1a] shadow-2xl shadow-slate-950/16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(2,132,199,0.24),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(124,58,237,0.18),transparent_28%),linear-gradient(180deg,rgba(15,23,42,0.88),rgba(2,6,23,0.96))]" />

          <div
            role="tablist"
            aria-label={sectionLocale === 'ar' ? 'قطاعات CloudTopia' : 'CloudTopia industries'}
            onKeyDown={handleTabKeyDown}
            className="relative z-20 flex gap-3 overflow-x-auto px-5 pb-3 pt-6 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden"
          >
            {homeIndustrySlides.map((industry, index) => {
              const Icon = iconMap[industry.icon]
              const isActive = index === activeIndex
              return (
                <button
                  key={industry.id}
                  ref={(node) => {
                    tabRefs.current[index] = node
                  }}
                  id={`industry-tab-${industry.id}`}
                  role="tab"
                  type="button"
                  aria-selected={isActive}
                  aria-controls={`industry-panel-${industry.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => selectIndex(index)}
                  className={`inline-flex min-h-12 flex-none items-center justify-center gap-2 rounded-full border px-5 text-sm font-black transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0284c7] ${
                    isActive
                      ? 'border-sky-300/70 bg-[#0284c7] text-white shadow-[0_0_30px_rgba(2,132,199,0.34)] ring-4 ring-sky-300/15'
                      : 'border-white/14 bg-white/8 text-white hover:border-sky-300/50 hover:bg-white/12'
                  }`}
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                  <span>{industry.name[sectionLocale]}</span>
                </button>
              )
            })}
          </div>

          <div
            id={`industry-panel-${activeIndustry.id}`}
            role="tabpanel"
            aria-labelledby={`industry-tab-${activeIndustry.id}`}
            className="relative z-10"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <IndustryCard key={activeIndustry.id} industry={activeIndustry} locale={sectionLocale} direction={direction} />
            </AnimatePresence>

            <div className={`absolute bottom-5 z-20 flex gap-3 ${isRTL ? 'left-5' : 'right-5'}`}>
              <button
                type="button"
                onClick={goPrevious}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white shadow-lg backdrop-blur-md transition-colors duration-200 hover:bg-white/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                aria-label={sectionLocale === 'ar' ? 'القطاع السابق' : 'Previous industry'}
              >
                {isRTL ? <ChevronRight className="h-4 w-4" aria-hidden="true" /> : <ChevronLeft className="h-4 w-4" aria-hidden="true" />}
              </button>
              <button
                type="button"
                onClick={goNext}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/10 text-white shadow-lg backdrop-blur-md transition-colors duration-200 hover:bg-white/18 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
                aria-label={sectionLocale === 'ar' ? 'القطاع التالي' : 'Next industry'}
              >
                {isRTL ? <ChevronLeft className="h-4 w-4" aria-hidden="true" /> : <ChevronRight className="h-4 w-4" aria-hidden="true" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
