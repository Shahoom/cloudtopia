'use client'

import { motion, AnimatePresence } from 'framer-motion'
import {
  Sparkles, Calendar, DollarSign, Code2, Zap,
  CheckCircle2, ArrowRight, MessageCircle, Cpu, Check
} from 'lucide-react'
import type { Recommendation } from './recommendationEngine'
import type { WizardAnswers } from './recommendationEngine'
import type { SFTextShape } from './sfTranslations'
import { buildWhatsAppUrl } from './whatsappMessageBuilder'

type Props = {
  recommendation: Recommendation
  answers: WizardAnswers
  isComplete: boolean
  locale: 'en' | 'ar'
  t: SFTextShape
  onCtaClick?: () => void
}

export default function RecommendationCard({ recommendation, answers, isComplete, locale, t, onCtaClick }: Props) {
  const isPopulated = !!answers.projectType
  const waUrl = isComplete
    ? buildWhatsAppUrl(answers, recommendation, locale)
    : '#'

  return (
    <div className="h-full flex flex-col rounded-3xl bg-[#1B1B23] border border-cyan-200/15 overflow-hidden relative shadow-xl shadow-[rgba(15,23,42,0.10)] min-h-[390px]">
      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 -end-24 w-72 h-72 rounded-full bg-cyan-300/10 blur-3xl" />
        <div className="absolute -bottom-24 -start-24 w-72 h-72 rounded-full bg-emerald-300/8 blur-3xl" />
      </div>

      {/* Floating Microchip Icon at top-right */}
      <div className="absolute top-6 end-6 w-10 h-10 rounded-xl bg-cyan-300/10 border border-cyan-200/25 flex items-center justify-center shadow-lg shadow-cyan-400/10">
        <Cpu className="w-5 h-5 text-cyan-200" />
      </div>

      {/* Header */}
      <div className="relative px-5 pt-5 pb-4 border-b border-white/8">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="text-xs font-bold text-cyan-200 uppercase tracking-widest">
            {t.card.title}
          </span>
        </div>

        <AnimatePresence mode="wait">
          {isPopulated ? (
            <motion.div
              key="populated-header"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
            >
              <div className="flex items-center gap-2 mt-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  {t.card.bestMatch}
                </span>
                <span className="text-cyan-50/60 text-xs">{recommendation.matchScore}% {t.card.aligned}</span>
              </div>
              <h3 className="text-lg font-bold text-cyan-50 mt-2 leading-snug">
                {recommendation.packageTitle}
              </h3>
              <p className="text-xs text-cyan-50/55 mt-1 leading-snug">{recommendation.packageSubtitle}</p>
            </motion.div>
          ) : (
            <motion.div key="placeholder-header" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h3 className="text-[17px] font-bold text-cyan-50 mt-3 leading-snug max-w-[210px]">
                {locale === 'ar' ? 'حلّك التقني المخصص' : 'Your Personalized Tech Solution'}
              </h3>
              <p className="text-xs text-cyan-50/45 mt-1.5 max-w-[210px] leading-relaxed">
                {locale === 'ar' ? 'أكمل الخطوات على اليسار لعرض التوصية المناسبة لمشروعك.' : 'Complete the steps on the left to see a tailored recommendation.'}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Body */}
      <div className="relative flex-1 px-5 py-4 space-y-4 overflow-y-auto">
        <AnimatePresence mode="wait">
          {isPopulated ? (
            <motion.div
              key="populated"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.28 }}
              className="space-y-4"
            >
              {/* Intro */}
              <p className="text-[13px] sm:text-[14px] text-cyan-50/90 leading-relaxed font-semibold">
                {recommendation.personalizedIntro}
              </p>

              {/* Meta rows */}
              <div className="space-y-2.5 pt-1.5">
                <MetaRow icon={<Calendar className="w-4 h-4 text-cyan-200" />} label={t.card.timeline} value={recommendation.estimatedTimeline} />
                <MetaRow icon={<DollarSign className="w-4 h-4 text-emerald-400" />} label={t.card.budget} value={recommendation.budgetRange} />
                <MetaRow icon={<Code2 className="w-4 h-4 text-sky-300" />} label={t.card.tech} value={recommendation.techStack.slice(0, 3).join(', ')} />
              </div>

              {/* Key features (top 4) */}
              <div className="pt-1.5">
                <p className="text-xs font-bold text-cyan-200 uppercase tracking-widest mb-2">{t.card.features}</p>
                <ul className="space-y-1.5">
                  {recommendation.keyFeatures.slice(0, 4).map((f) => (
                    <li key={f} className="flex items-start gap-2 text-[13px] sm:text-[14px] text-cyan-50/90 font-medium leading-tight">
                      <CheckCircle2 className="w-4 h-4 text-cyan-200 flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services tags */}
              <div className="pt-1.5">
                <p className="text-xs font-bold text-cyan-200 uppercase tracking-widest mb-1.5">{t.card.services}</p>
                <div className="flex flex-wrap gap-1.5">
                  {recommendation.recommendedServices.slice(0, 4).map((s) => (
                    <span key={s} className="px-2.5 py-1 rounded-lg bg-cyan-50/10 border border-cyan-100/15 text-cyan-50/90 text-xs font-semibold leading-none">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {isComplete && recommendation.aiRecommendation ? (
                <div className="pt-2">
                  <p className="text-xs font-bold text-cyan-200 uppercase tracking-widest mb-2">
                    {locale === 'ar' ? 'رؤية AI' : 'AI Insight'}
                  </p>
                  <div className="rounded-2xl border border-cyan-100/15 bg-cyan-50/8 p-3">
                    <p className="text-[13px] text-cyan-50/90 leading-relaxed font-medium">
                      {recommendation.aiRecommendation.countryAdvice}
                    </p>
                  </div>
                </div>
              ) : null}
            </motion.div>
          ) : (
            <motion.div key="placeholder" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3.5">
              {[
                { icon: <Calendar className="w-4 h-4 text-cyan-200/70" />, label: t.card.timeline, value: '—' },
                { icon: <DollarSign className="w-4 h-4 text-emerald-400/60" />, label: t.card.budget, value: '—' },
                { icon: <Code2 className="w-4 h-4 text-sky-300/70" />, label: t.card.tech, value: locale === 'ar' ? 'بناءً على قطاع عملك' : 'Based on your industry' },
                { icon: <Zap className="w-4 h-4 text-amber-400/60" />, label: t.card.features, value: locale === 'ar' ? 'تُحدد مع كل اختيار' : 'Selected as you choose options' },
              ].map((row) => (
                <MetaRow key={row.label} icon={row.icon} label={row.label} value={row.value} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* CTA footer */}
      <div className="relative px-5 pb-5 pt-3.5 border-t border-white/8 space-y-2.5">
        {isComplete ? (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2.5 w-full px-4 py-3.5 rounded-xl bg-[#25D366] hover:bg-[#1ebe5d] text-white text-sm font-bold transition-all duration-200 hover:shadow-lg hover:shadow-[#25D366]/30 group"
            >
              <MessageCircle className="w-4.5 h-4.5" />
              {t.card.continueWhatsapp}
              <ArrowRight className={`w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform ${locale === 'ar' ? 'rotate-180' : ''}`} />
            </a>
          </motion.div>
        ) : (
          <button
            type="button"
            onClick={onCtaClick}
            className="flex items-center justify-center gap-2.5 w-full px-4 py-3.5 rounded-xl bg-white hover:bg-neutral-100 text-[#0b0f19] text-sm font-bold transition-all duration-200 shadow-md group"
          >
            <span>{t.card.bookConsultation}</span>
            <ArrowRight className={`w-4 h-4 group-hover:translate-x-0.5 transition-transform ${locale === 'ar' ? 'rotate-180' : ''}`} />
          </button>
        )}
        <div className="flex items-center justify-center gap-1.5 text-[11px] text-white/40">
          <Check className="w-3.5 h-3.5 text-emerald-400" />
          <span>{locale === 'ar' ? 'بدون التزام · مجاني 100%' : 'No obligation · 100% Free'}</span>
        </div>
      </div>
    </div>
  )
}

function MetaRow({ icon, label, value }: {
  icon: React.ReactNode; label: string; value: string
}) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="flex-shrink-0 mt-0.5">{icon}</span>
      <div className="min-w-0 flex-1">
        <span className="text-xs text-white/50 font-medium">{label}: </span>
        <span className="text-[13px] sm:text-[14px] text-white/95 font-bold leading-normal">{value}</span>
      </div>
    </div>
  )
}
