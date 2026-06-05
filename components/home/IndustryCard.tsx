'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'
import { localePath } from '@/lib/i18n/url'
import type { HomeIndustryLocale, HomeIndustrySlide } from './industryData'

type IndustryCardProps = {
  industry: HomeIndustrySlide
  locale: HomeIndustryLocale
  direction: number
}

export default function IndustryCard({ industry, locale, direction }: IndustryCardProps) {
  const isRTL = locale === 'ar'
  const slideX = 34 * direction * (isRTL ? -1 : 1)
  const exploreLabel = locale === 'ar'
    ? `استكشف حلول ${industry.name.ar}`
    : `Explore ${industry.name.en} Solutions`

  return (
    <motion.article
      key={industry.id}
      initial={{ opacity: 0, x: slideX, filter: 'blur(8px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, x: -slideX, filter: 'blur(8px)' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="grid min-h-[40rem] overflow-hidden text-white lg:grid-cols-[minmax(0,1.22fr)_minmax(25rem,1fr)]"
    >
      <div className="relative z-10 flex flex-col justify-center px-6 pb-24 pt-10 sm:px-8 md:px-10 lg:px-9 xl:px-10">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.18em] text-sky-300">
          {industry.visual.metric[locale]}
        </p>
        <h3 className="mb-5 text-3xl font-black leading-tight tracking-normal text-white sm:text-4xl md:text-5xl">
          {industry.name[locale]}
        </h3>
        <p className="max-w-3xl text-sm font-semibold leading-8 text-slate-200 sm:text-base">
          {industry.description[locale]}
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {industry.features.map((feature) => (
            <div key={feature.title.en} className="flex gap-3">
              <CheckCircle2 className="mt-1 h-4 w-4 flex-none text-sky-300" aria-hidden="true" />
              <div>
                <p className="text-sm font-black text-white">{feature.title[locale]}</p>
                <p className="mt-1 text-xs font-semibold leading-5 text-slate-300">{feature.description[locale]}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <Link
            href={localePath(locale, industry.exploreHref)}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-lg bg-[#0284c7] px-5 py-3 text-sm font-black text-white shadow-lg shadow-sky-950/30 transition-colors duration-200 hover:bg-[#0369a1] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
          >
            {exploreLabel}
            <ArrowRight className={`h-4 w-4 ${isRTL ? 'rotate-180' : ''}`} aria-hidden="true" />
          </Link>
          <Link
            href={localePath(locale, industry.caseStudiesHref)}
            className="inline-flex min-h-12 items-center justify-center rounded-lg border border-white/15 bg-white/5 px-5 py-3 text-sm font-black text-white transition-colors duration-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300"
          >
            {locale === 'ar' ? 'مشاهدة المشاريع' : 'View Case Studies'}
          </Link>
        </div>
      </div>

      <div className="relative min-h-[30rem] overflow-hidden lg:min-h-0">
        <IndustryVisual industry={industry} locale={locale} direction={direction} />
      </div>
    </motion.article>
  )
}

function IndustryVisual({ industry, locale, direction }: { industry: HomeIndustrySlide; locale: HomeIndustryLocale; direction: number }) {
  const isRTL = locale === 'ar'
  const visualX = 26 * direction
  const desktopObjectFit = 'object-cover'
  const mobileObjectFit = 'object-cover'

  return (
    <motion.div
      key={`${industry.id}-visual`}
      initial={{ opacity: 0, x: visualX, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -visualX, scale: 0.97 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="absolute inset-0 flex items-center justify-center px-5 pb-24 pt-4 sm:px-8 lg:px-4 xl:px-8"
      role="img"
      aria-label={industry.visual.alt[locale]}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${industry.visual.accent} opacity-[0.08]`} />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_20%,rgba(255,255,255,0.16),transparent_26%),radial-gradient(circle_at_42%_62%,rgba(2,132,199,0.16),transparent_34%)]" />
      <motion.div
        className="absolute inset-x-10 top-12 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.16 }}
      />
      <motion.div
        className="absolute bottom-20 left-12 right-12 h-px bg-gradient-to-r from-transparent via-sky-200/30 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.26 }}
      />

      <div className="relative h-[31rem] w-full max-w-[36rem]" style={{ perspective: '1400px' }}>
        <motion.div
          className={`absolute bottom-[5.9rem] z-10 w-[78%] max-w-[30rem] rounded-[1.35rem] border border-white/14 bg-[#111827] p-2 shadow-[0_35px_80px_rgba(0,0,0,0.52)] ${
            isRTL ? 'right-0' : 'left-0'
          }`}
          initial={{ opacity: 0, y: 42, rotateX: 10, rotateZ: isRTL ? 1.5 : -1.5, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, rotateX: 0, rotateZ: isRTL ? 1.5 : -1.5, scale: 1 }}
          transition={{ duration: 0.68, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative overflow-hidden rounded-[1.05rem] border border-white/10 bg-[#050816] shadow-inner shadow-black/40">
            <div className="absolute left-4 right-4 top-2 z-20 h-4 rounded-t-[0.9rem] bg-gradient-to-b from-white/10 to-transparent" />
            <div className="absolute left-1/2 top-2 z-20 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-white/35" />
            <div className="relative aspect-[16/10] overflow-hidden rounded-[0.85rem] bg-slate-900">
              <Image
                src={industry.visual.desktopImage}
                alt={industry.visual.alt[locale]}
                fill
                sizes="(max-width: 1024px) 84vw, 480px"
                className={`${desktopObjectFit} object-center`}
                priority={industry.id === 'finance'}
                quality={100}
              />
              <div className="absolute inset-0 rounded-[0.85rem] bg-[linear-gradient(108deg,rgba(255,255,255,0.14),transparent_34%),radial-gradient(circle_at_86%_12%,rgba(255,255,255,0.14),transparent_22%)]" />
              <motion.div
                className={`absolute bottom-4 rounded-2xl bg-gradient-to-r ${industry.visual.accent} px-4 py-3 text-xs font-black text-slate-950 shadow-xl shadow-black/25 ${
                  isRTL ? 'right-4' : 'left-4'
                }`}
                initial={{ opacity: 0, y: 18, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.42, delay: 0.34 }}
              >
                {industry.visual.metric[locale]}
              </motion.div>
            </div>
          </div>
          <div className="mx-auto h-3 w-10/12 rounded-b-2xl bg-gradient-to-b from-[#182033] to-[#090e19] shadow-xl shadow-black/35" />
          <div className="mx-auto h-2 w-7/12 rounded-b-full bg-gradient-to-r from-[#1d2638] via-[#3d4658] to-[#1d2638]" />
          <div className="absolute -bottom-5 left-1/2 h-5 w-10/12 -translate-x-1/2 rounded-[50%] bg-black/35 blur-xl" />
        </motion.div>

        <motion.div
          className={`absolute bottom-[3.1rem] z-20 h-[24.5rem] w-[12rem] rounded-[2.35rem] border border-white/20 bg-gradient-to-br from-[#343847] via-[#111522] to-[#070a12] p-2 shadow-[0_30px_80px_rgba(0,0,0,0.62)] ${
            isRTL ? 'left-0 sm:left-2 rotate-[-4deg]' : 'right-0 sm:right-2 rotate-[4deg]'
          }`}
          initial={{
            opacity: 0,
            x: isRTL ? -58 : 58,
            y: 28,
            rotate: isRTL ? -11 : 11,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            x: 0,
            y: 0,
            rotate: isRTL ? -4 : 4,
            scale: 1,
          }}
          transition={{ duration: 0.72, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="absolute -left-1 top-24 h-12 w-1 rounded-l bg-white/14" />
          <span className="absolute -right-1 top-28 h-16 w-1 rounded-r bg-white/14" />
          <span className="absolute -right-1 top-48 h-12 w-1 rounded-r bg-white/10" />
          <div className="relative h-full overflow-hidden rounded-[1.85rem] border border-white/10 bg-[#050816] shadow-inner shadow-black/40">
            <div className="absolute left-1/2 top-2 z-30 h-6 w-20 -translate-x-1/2 rounded-full bg-black/86 shadow-inner" />
            <Image
              src={industry.visual.mobileImage}
              alt={industry.visual.alt[locale]}
              fill
              sizes="(max-width: 640px) 210px, 230px"
              className={`${mobileObjectFit} object-center`}
              priority={industry.id === 'finance'}
              quality={100}
            />
            <div className="absolute inset-0 rounded-[1.85rem] bg-[linear-gradient(115deg,rgba(255,255,255,0.20),transparent_25%),linear-gradient(180deg,transparent_70%,rgba(2,6,23,0.32))]" />
            <div className="absolute bottom-3 left-1/2 z-30 h-1 w-16 -translate-x-1/2 rounded-full bg-white/40" />
            <motion.div
              className={`absolute top-3 rounded-full bg-gradient-to-r ${industry.visual.accent} p-2 shadow-lg shadow-black/25 ${
                isRTL ? 'right-3' : 'left-3'
              }`}
              initial={{ opacity: 0, scale: 0.7, rotate: -12 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.36, delay: 0.48 }}
            >
              <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className={`absolute top-9 max-w-[13rem] rounded-2xl border border-white/12 bg-white/12 p-4 shadow-xl backdrop-blur-md ${
            isRTL ? 'right-3' : 'left-3'
          }`}
          initial={{ opacity: 0, y: -18, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.45, delay: 0.42 }}
        >
          <p className="text-xs font-black uppercase tracking-[0.12em] text-sky-100">{industry.visual.label[locale]}</p>
          <p className="mt-2 text-2xl font-black text-white">{industry.visual.badge[locale]}</p>
        </motion.div>

      </div>
    </motion.div>
  )
}
