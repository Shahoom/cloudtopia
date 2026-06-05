'use client'

import { motion } from 'framer-motion'
import {
  Sparkles, ArrowRight, MessageCircle, ExternalLink,
  CheckCircle2, Code2, Calendar, DollarSign, RefreshCw,
  Zap, RotateCcw
} from 'lucide-react'
import type { Recommendation } from './recommendationEngine'
import type { WizardAnswers } from './recommendationEngine'
import type { SFTextShape } from './sfTranslations'
import { buildWhatsAppUrl } from './whatsappMessageBuilder'

type Props = {
  recommendation: Recommendation
  answers: WizardAnswers
  onReset: () => void
  onEdit: () => void
  locale: 'en' | 'ar'
  t: SFTextShape
}

export default function ResultScreen({ recommendation, answers, onReset, onEdit, locale, t }: Props) {
  const r = t.result
  const waUrl = buildWhatsAppUrl(answers, recommendation, locale)

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="space-y-4"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Success header */}
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.1 }}
          className="w-12 h-12 rounded-xl bg-[#0284c7]/10 border border-[#0284c7]/20 flex items-center justify-center mx-auto mb-2.5"
        >
          <Sparkles className="w-6 h-6 text-[#0284c7]" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-bold mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {r.readyBadge}
          </span>
          <h3 className="text-xl md:text-2xl font-bold text-neutral-900 leading-tight mt-0.5">
            {recommendation.packageTitle}
          </h3>
          <p className="text-xs text-neutral-500 mt-0.5">{recommendation.packageSubtitle}</p>
        </motion.div>
      </div>

      {/* Personalized intro */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
        className="p-3 py-2.5 rounded-xl bg-[#0284c7]/4 border border-[#0284c7]/12"
      >
        <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed">
          {recommendation.personalizedIntro}
        </p>
      </motion.div>

      {/* Meta grid */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-2"
      >
        <MetaCard icon={<Calendar className="w-4 h-4 text-[#0284c7]" />} label={r.metaTimeline} value={recommendation.estimatedTimeline} color="blue" />
        <MetaCard icon={<DollarSign className="w-4 h-4 text-emerald-600" />} label={r.metaBudget} value={recommendation.budgetRange} color="emerald" />
        <MetaCard icon={<Code2 className="w-4 h-4 text-violet-600" />} label={r.metaTech} value={recommendation.techStack.slice(0, 2).join(' + ')} color="violet" className="col-span-2 md:col-span-1" />
      </motion.div>

      {/* Key features */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-2">{r.featuresLabel}</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {recommendation.keyFeatures.map((feature, i) => (
            <motion.div
              key={feature}
              initial={{ opacity: 0, x: locale === 'ar' ? 8 : -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.04 }}
              className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-neutral-800"
            >
              <CheckCircle2 className="w-4 h-4 text-[#0284c7] flex-shrink-0" />
              {feature}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Delivery approach */}
      {recommendation.deliveryApproach && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.32 }}>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5">{r.deliveryLabel}</p>
          <div className="flex items-start gap-2 p-2.5 rounded-xl bg-amber-50 border border-amber-200">
            <Zap className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-amber-800 leading-relaxed">{recommendation.deliveryApproach}</p>
          </div>
        </motion.div>
      )}

      {recommendation.aiRecommendation ? (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.34 }}>
          <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5">
            {locale === 'ar' ? 'خطة AI المقترحة' : 'AI Suggested Roadmap'}
          </p>
          <div className="rounded-xl bg-indigo-50 border border-indigo-100 p-3 space-y-2">
            <p className="text-xs sm:text-sm text-indigo-950 leading-relaxed font-semibold">
              {recommendation.aiRecommendation.summary}
            </p>
            <div className="grid gap-1.5">
              {recommendation.aiRecommendation.roadmap.slice(0, 3).map((step, index) => (
                <div key={step} className="flex items-start gap-2 text-xs text-indigo-900">
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-[10px] font-black text-white">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      ) : null}

      {/* Services tags */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <p className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1.5">{r.servicesLabel}</p>
        <div className="flex flex-wrap gap-1.5">
          {recommendation.recommendedServices.map((s) => (
            <span key={s} className="px-2.5 py-1 rounded-lg bg-neutral-100 border border-neutral-200 text-[11px] font-bold text-neutral-700">
              {s}
            </span>
          ))}
        </div>
      </motion.div>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        className="space-y-2 pt-1"
      >
        {/* WhatsApp CTA - primary */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 w-full px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[#25D366]/30 group"
        >
          <MessageCircle className="w-5 h-5" />
          {r.primaryCta}
          <ArrowRight className={`w-4 h-4 group-hover:translate-x-0.5 transition-transform ${locale === 'ar' ? 'rotate-180' : ''}`} />
        </a>

        {/* WhatsApp message hint */}
        <p className="text-center text-[10px] sm:text-xs text-neutral-400 leading-snug px-4">
          {r.whatsappNote}
        </p>

        {/* Secondary row */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-neutral-100 border border-neutral-200 text-neutral-700 hover:bg-neutral-200 font-semibold text-xs sm:text-sm transition-all duration-200"
          >
            <RotateCcw className="w-4 h-4" />
            {r.editAnswers}
          </button>
          <a
            href={recommendation.route}
            className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-[#0284c7]/8 border border-[#0284c7]/20 text-[#0284c7] hover:bg-[#0284c7]/14 font-semibold text-xs sm:text-sm transition-all duration-200"
          >
            <ExternalLink className="w-4 h-4" />
            {r.viewService}
          </a>
        </div>

        <button
          type="button"
          onClick={onReset}
          className="flex items-center justify-center gap-2 w-full py-1.5 text-xs text-neutral-400 hover:text-neutral-600 transition-colors duration-200"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          {r.startOver}
        </button>
      </motion.div>

      {/* Confirmation note */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
        className="text-center py-2 px-3 rounded-xl bg-neutral-50 border border-neutral-200"
      >
        <p className="text-xs text-neutral-500 leading-relaxed">{r.confirmationNote}</p>
      </motion.div>
    </motion.div>
  )
}

function MetaCard({ icon, label, value, color, className = '' }: {
  icon: React.ReactNode; label: string; value: string
  color: 'blue' | 'emerald' | 'violet'; className?: string
}) {
  const colorMap = {
    blue:    'bg-blue-50 border-blue-100',
    emerald: 'bg-emerald-50 border-emerald-100',
    violet:  'bg-violet-50 border-violet-100',
  }
  return (
    <div className={`p-3 rounded-xl border ${colorMap[color]} ${className}`}>
      <div className="flex items-center gap-1.5 mb-1.5">{icon}<span className="text-xs text-neutral-500 font-medium">{label}</span></div>
      <p className="text-sm font-bold text-neutral-800 leading-snug">{value}</p>
    </div>
  )
}
