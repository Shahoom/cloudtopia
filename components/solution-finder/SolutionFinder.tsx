'use client'

import { useState, useCallback, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, SkipForward, Sparkles, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/lib/i18n/LanguageContext'

import { SOLUTION_FINDER_STEPS } from './solutionFinderData'
import type { WizardAnswers } from './recommendationEngine'
import { generateRecommendation } from './recommendationEngine'
import { SF_TEXT } from './sfTranslations'

import StepSidebar from './StepSidebar'
import OptionCard from './OptionCard'
import RecommendationCard from './RecommendationCard'
import ContactDetailsStep from './ContactDetailsStep'
import ResultScreen from './ResultScreen'

// ─── Answer key per step ──────────────────────────────────────────────────────
const STEP_ANSWER_KEY: Record<string, keyof WizardAnswers> = {
  'industry':      'industry',
  'project-type':  'projectType',
  'business-goal': 'businessGoal',
}

// ─── Mobile progress dots ─────────────────────────────────────────────────────
function MobileProgress({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 lg:hidden mb-4">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1.5 rounded-full transition-all duration-300 ${
            i === current
              ? 'w-6 bg-[#0284c7]'
              : i < current
                ? 'w-2.5 bg-[#0284c7]/50'
                : 'w-2.5 bg-neutral-300'
          }`}
        />
      ))}
    </div>
  )
}

export default function SolutionFinder() {
  const { locale } = useLanguage()
  const sfLocale = (locale === 'ar' ? 'ar' : 'en') as 'en' | 'ar'
  const t = SF_TEXT[sfLocale]
  const isRtl = sfLocale === 'ar'

  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<WizardAnswers>({})
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [validationMsg, setValidationMsg] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward')

  const step = SOLUTION_FINDER_STEPS[currentStep]
  const recommendation = useMemo(() => generateRecommendation(answers, sfLocale), [answers, sfLocale])

  // ─── Answer helpers ─────────────────────────────────────────────────────────
  const updateAnswer = useCallback((updates: Partial<WizardAnswers>) => {
    setAnswers((prev) => ({ ...prev, ...updates }))
    setValidationMsg('')
  }, [])

  function getStepAnswer(stepId: string): string | undefined {
    if (stepId === 'budget-timeline') return answers.budget
    const key = STEP_ANSWER_KEY[stepId]
    return key ? (answers[key] as string | undefined) : undefined
  }

  function isStepAnswered(stepId: string): boolean {
    if (stepId === 'budget-timeline') return !!answers.budget && !!answers.timeline
    return !!getStepAnswer(stepId)
  }

  // ─── Navigation ─────────────────────────────────────────────────────────────
  function goToStep(index: number) {
    setDirection(index > currentStep ? 'forward' : 'backward')
    setCurrentStep(index)
    setValidationMsg('')
  }

  function handleNext() {
    const stepId = step.id
    if (stepId === 'requirements') return

    if (!isStepAnswered(stepId)) {
      setValidationMsg(t.pleaseSelect)
      return
    }

    const newCompleted = new Set(completedSteps).add(currentStep)
    setCompletedSteps(newCompleted)

    if (currentStep < SOLUTION_FINDER_STEPS.length - 1) {
      setDirection('forward')
      setCurrentStep(currentStep + 1)
      setValidationMsg('')
    }
  }

  function handleBack() {
    if (currentStep > 0) {
      setDirection('backward')
      setCurrentStep(currentStep - 1)
      setValidationMsg('')
    }
  }

  function handleSkip() {
    if (currentStep < SOLUTION_FINDER_STEPS.length - 1) {
      setDirection('forward')
      setCurrentStep(currentStep + 1)
      setValidationMsg('')
    }
  }

  // Edit answers from result screen — go back to step 0
  function handleEdit() {
    setIsComplete(false)
    setDirection('backward')
    setCurrentStep(0)
    setValidationMsg('')
  }

  // ─── Submit ─────────────────────────────────────────────────────────────────
  async function handleSubmit() {
    setIsSubmitting(true)
    setSubmitError('')

    try {
      const payload = {
        ...answers,
        locale: sfLocale,
        recommendedPackage: recommendation.packageTitle,
        recommendedRoute: recommendation.route,
        source: 'solution-finder',
        createdAt: new Date().toISOString(),
      }

      const res = await fetch('/api/solution-finder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || 'Submission failed')
      }

      const newCompleted = new Set(completedSteps).add(currentStep)
      setCompletedSteps(newCompleted)
      setIsComplete(true)
    } catch (err: any) {
      setSubmitError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleReset() {
    setCurrentStep(0)
    setAnswers({})
    setCompletedSteps(new Set())
    setIsComplete(false)
    setSubmitError('')
    setValidationMsg('')
    setDirection('forward')
  }

  // ─── Slide variants (RTL-aware) ──────────────────────────────────────────────
  const slideVariants = {
    enter: (dir: string) => ({
      x: (dir === 'forward' ? 28 : -28) * (isRtl ? -1 : 1),
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: string) => ({
      x: (dir === 'forward' ? -28 : 28) * (isRtl ? -1 : 1),
      opacity: 0,
    }),
  }

  // ─── Render step content ────────────────────────────────────────────────────
  function renderStepContent() {
    if (isComplete) {
      return (
        <ResultScreen
          recommendation={recommendation}
          answers={answers}
          onReset={handleReset}
          onEdit={handleEdit}
          locale={sfLocale}
          t={t}
        />
      )
    }

    if (step.type === 'form') {
      return (
        <ContactDetailsStep
          answers={answers}
          onChange={updateAnswer}
          onSubmit={handleSubmit}
          isLoading={isSubmitting}
          locale={sfLocale}
          t={t}
        />
      )
    }

    if (step.type === 'dual-choice') {
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5" dir={isRtl ? 'rtl' : 'ltr'}>
          {/* Budget */}
          <div>
            <p className="text-xs font-bold text-[#6366f1] uppercase tracking-widest mb-2 font-sans">{t.budgetLabel}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-2">
              {step.budgetOptions?.map((opt) => (
                <OptionCard
                  key={opt.id}
                  option={opt}
                  selected={answers.budget === opt.id}
                  onSelect={(id) => updateAnswer({ budget: id })}
                  locale={sfLocale}
                  t={t}
                />
              ))}
            </div>
          </div>

          {/* Timeline */}
          <div>
            <p className="text-xs font-bold text-[#6366f1] uppercase tracking-widest mb-2 font-sans">{t.timelineLabel}</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 xl:grid-cols-3 gap-2">
              {step.timelineOptions?.map((opt) => (
                <OptionCard
                  key={opt.id}
                  option={opt}
                  selected={answers.timeline === opt.id}
                  onSelect={(id) => updateAnswer({ timeline: id })}
                  locale={sfLocale}
                  t={t}
                />
              ))}
            </div>
          </div>
        </div>
      )
    }

    // Single-choice
    const answerKey = STEP_ANSWER_KEY[step.id]
    const selectedValue = answerKey ? (answers[answerKey] as string) : undefined

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-2.5" dir={isRtl ? 'rtl' : 'ltr'}>
        {step.options?.map((opt) => (
          <OptionCard
            key={opt.id}
            option={opt}
            selected={selectedValue === opt.id}
            onSelect={(id) => {
              if (answerKey) updateAnswer({ [answerKey]: id })
            }}
            locale={sfLocale}
            t={t}
          />
        ))}
      </div>
    )
  }

  const stepInfo = t.steps[
    (['industry', 'projectType', 'businessGoal', 'budgetTimeline', 'requirements'] as const)[currentStep]
  ]

  return (
    <section
      id="solution-finder"
      className="relative py-10 md:py-14 px-4 sm:px-6 lg:px-8 bg-[#f4f1f8] overflow-hidden font-sans"
      data-header-theme="light"
      dir={isRtl ? 'rtl' : 'ltr'}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.09] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, #0284c7 1px, transparent 1px), linear-gradient(to bottom, #0284c7 1px, transparent 1px)',
          backgroundSize: '56px 56px',
          maskImage: 'radial-gradient(ellipse 90% 70% at 50% 50%, black 0%, transparent 80%)',
        }}
      />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute top-0 start-1/4 w-[500px] h-[400px] rounded-full bg-[#0284c7]/6 blur-[120px]" />
        <div className="absolute bottom-0 end-1/4 w-[400px] h-[300px] rounded-full bg-indigo-400/6 blur-[100px]" />
      </div>

      <div className="relative max-w-[1520px] mx-auto font-sans">

        {/* ── Section header ─────────────────────────────────────────────────── */}
        <div className="text-center mb-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#6366f1]/10 border border-[#6366f1]/20 shadow-sm text-[11px] font-bold uppercase tracking-widest text-[#6366f1] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              {t.badge}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="text-2xl md:text-4xl lg:text-[2.25rem] font-bold tracking-tight text-[#0f172a] leading-[1.15] mb-2.5 font-sans"
          >
            {locale === 'ar' ? 'اكتشف حلّك التقني المثالي' : 'Find Your Perfect Tech Solution'}{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-violet-600 font-sans">
              {locale === 'ar' ? 'خلال 60 ثانية' : 'in 60 Seconds'}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-sm md:text-base text-neutral-600 max-w-xl mx-auto leading-relaxed font-sans"
          >
            {t.subheadline}
          </motion.p>
        </div>

        {/* ── Main layout: Sidebar/Questions on Left, separate Recommendation Card on Right ────────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch justify-center font-sans">

          {/* Left Block: White Card for Sidebar & Questions */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1 bg-white rounded-3xl border border-[rgba(15,23,42,0.08)] shadow-xl shadow-[rgba(15,23,42,0.04)] overflow-hidden flex flex-col lg:flex-row"
          >
            {/* Left: Step sidebar */}
            <div className="w-full lg:w-[200px] p-5 lg:p-6 border-b lg:border-b-0 lg:border-e border-[rgba(15,23,42,0.07)] bg-neutral-50/50 flex-shrink-0">
              {/* Desktop sidebar */}
              <div className="hidden lg:block">
                <StepSidebar
                  steps={SOLUTION_FINDER_STEPS}
                  currentStep={currentStep}
                  completedSteps={completedSteps}
                  onStepClick={goToStep}
                  locale={sfLocale}
                  t={t}
                />
              </div>

              {/* Mobile: progress + step label */}
              <div className="lg:hidden">
                <MobileProgress total={SOLUTION_FINDER_STEPS.length} current={currentStep} />
                <p className="text-center text-sm font-bold text-[#6366f1]">
                  {t.stepOf(currentStep + 1, SOLUTION_FINDER_STEPS.length)} · {stepInfo.title}
                </p>
                <p className="text-center text-xs text-neutral-400 mt-0.5">{stepInfo.subtitle}</p>
              </div>
            </div>

            {/* Middle: Question area */}
            <div className="flex-1 p-4 lg:p-6 flex flex-col justify-between min-h-[350px]">
              <div>
                {/* Step header */}
                {!isComplete && (
                  <div className="mb-4">
                    <p className="text-[11px] font-bold text-[#6366f1] uppercase tracking-widest mb-1 font-sans">
                      {t.stepOf(currentStep + 1, SOLUTION_FINDER_STEPS.length)}
                    </p>
                    <h3 className="text-lg md:text-xl lg:text-[21px] font-extrabold text-neutral-900 leading-snug mb-1 font-sans">
                      {t.questions[(['industry', 'projectType', 'businessGoal', 'budgetTimeline', 'requirements'] as const)[currentStep]]}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-500 leading-relaxed font-sans">
                      {t.questions[(['industryHelper', 'projectTypeHelper', 'businessGoalHelper', 'budgetTimelineHelper', 'requirementsHelper'] as const)[currentStep]]}
                    </p>
                  </div>
                )}

                {/* Animated step content */}
                <div className="overflow-hidden">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={isComplete ? 'result' : step.id}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.26, ease: [0.25, 0.46, 0.45, 0.94] }}
                    >
                      {renderStepContent()}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              {/* Validation message */}
              <AnimatePresence>
                {validationMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    className="flex items-center gap-2 mt-4 text-amber-600 text-sm font-medium font-sans"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {validationMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit error */}
              <AnimatePresence>
                {submitError && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 mt-4 text-red-600 text-sm font-medium bg-red-50 border border-red-200 px-4 py-3 rounded-xl font-sans"
                  >
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    {submitError}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation footer */}
              {!isComplete && step.type !== 'form' && (
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-[rgba(15,23,42,0.07)] font-sans">
                  {/* Back */}
                  <button
                    type="button"
                    onClick={handleBack}
                    disabled={currentStep === 0}
                    className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-semibold text-neutral-500 hover:text-neutral-800 hover:bg-neutral-100 disabled:opacity-30 disabled:cursor-not-allowed transition-all duration-200 font-sans"
                  >
                    {isRtl
                      ? <ChevronRight className="w-4 h-4" />
                      : <ChevronLeft className="w-4 h-4" />
                    }
                    {t.back}
                  </button>

                  {/* Counter + Skip */}
                  <div className="flex items-center gap-3 font-sans">
                    <span className="text-xs text-neutral-400 font-medium font-sans">
                      {currentStep + 1} / {SOLUTION_FINDER_STEPS.length}
                    </span>
                    <button
                      type="button"
                      onClick={handleSkip}
                      className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs font-semibold text-neutral-400 hover:text-neutral-600 hover:bg-neutral-100 transition-all duration-200 font-sans"
                    >
                      <SkipForward className="w-3.5 h-3.5" />
                      {t.skip}
                    </button>
                  </div>

                  {/* Next */}
                  <button
                    type="button"
                    onClick={handleNext}
                    className="flex items-center gap-1.5 px-6 py-3 rounded-xl bg-[#6366f1] hover:bg-[#4f46e5] text-white text-sm font-bold transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[#6366f1]/25 group font-sans"
                  >
                    {currentStep === SOLUTION_FINDER_STEPS.length - 2 ? t.continue : t.next}
                    {isRtl
                      ? <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                      : <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    }
                  </button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Block: Live recommendation card (Separate card floating) */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="w-full lg:w-[350px] flex-shrink-0 font-sans"
          >
            <RecommendationCard
              recommendation={recommendation}
              answers={answers}
              isComplete={isComplete}
              locale={sfLocale}
              t={t}
              onCtaClick={() => {
                if (!isComplete) {
                  goToStep(SOLUTION_FINDER_STEPS.length - 1)
                }
              }}
            />
          </motion.div>

        </div>
      </div>
    </section>
  )
}

