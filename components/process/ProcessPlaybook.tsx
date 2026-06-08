'use client'

import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, ClipboardCheck, FileText, ShieldCheck } from 'lucide-react'
import { howWeWorkData } from '@/data/howWeWorkData'
import { cn } from '@/lib/utils'

type Locale = 'en' | 'ar'

export function ProcessPlaybook({
  locale,
  featuredIds,
}: {
  locale: Locale
  featuredIds?: string[]
}) {
  const [activeTab, setActiveTab] = useState(0)
  const isRTL = locale === 'ar'
  const processTypes = useMemo(() => {
    const ids = new Set(featuredIds || howWeWorkData.processTypes.map((type) => type.id))
    return howWeWorkData.processTypes.filter((type) => ids.has(type.id))
  }, [featuredIds])
  const activeProcess = processTypes[activeTab] || processTypes[0]

  const labels = isRTL
    ? {
        eyebrow: 'منهجية العمل',
        title: 'نفس فكرة OUR PROCESS لكن بتفاصيل قرار وتنفيذ أكثر.',
        description: 'اختر نوع المشروع لترى المراحل، المخرجات، نقاط الموافقة، وما الذي يستلمه العميل في كل خطوة.',
        deliverable: 'المخرج',
        approval: 'نقطة الموافقة',
        control: 'ضابط الجودة',
        handoff: 'ملكية وتسليم',
      }
    : {
        eyebrow: 'OUR PROCESS',
        title: 'The homepage process expanded into a buyer-ready playbook.',
        description: 'Choose the project model to see stages, outputs, approval gates, and what the client receives at every step.',
        deliverable: 'Deliverable',
        approval: 'Approval gate',
        control: 'Quality control',
        handoff: 'Ownership handoff',
      }

  return (
    <section className="relative overflow-hidden bg-eerie px-4 py-20 text-white sm:px-6 lg:px-8 md:py-28" data-header-theme="dark" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="pointer-events-none absolute inset-0 opacity-[0.12]" style={{ backgroundImage: 'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)', backgroundSize: '54px 54px' }} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(34,211,238,0.18),transparent_34%),radial-gradient(circle_at_86%_20%,rgba(216,180,254,0.14),transparent_34%)]" />

      <div className="relative mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-4xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/8 px-4 py-2 text-xs font-black uppercase tracking-[0.24em] text-cyan-100">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-300" />
            {labels.eyebrow}
          </span>
          <h2 className="mt-6 text-3xl font-black leading-tight tracking-normal md:text-5xl">{labels.title}</h2>
          <p className="mx-auto mt-5 max-w-3xl text-base font-semibold leading-8 text-white/68 md:text-lg">{labels.description}</p>
        </div>

        <div className="mb-10 overflow-x-auto pb-3">
          <div className="mx-auto inline-flex min-w-max rounded-full border border-white/10 bg-white/6 p-1.5 backdrop-blur md:flex md:w-fit">
            {processTypes.map((type, index) => {
              const active = activeTab === index
              return (
                <button
                  key={type.id}
                  type="button"
                  onClick={() => setActiveTab(index)}
                  className={cn(
                    'relative rounded-full px-4 py-3 text-xs font-black uppercase tracking-[0.14em] transition-colors sm:px-6',
                    active ? 'text-eerie' : 'text-white/62 hover:text-white',
                  )}
                >
                  {active && <motion.span layoutId="process-tab" className="absolute inset-0 rounded-full bg-cyan-200" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />}
                  <span className="relative z-10">{type.label[locale]}</span>
                </button>
              )
            })}
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeProcess.id}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -18 }}
            transition={{ duration: 0.32 }}
            className="grid gap-8 lg:grid-cols-[0.36fr_1fr]"
          >
            <aside className="rounded-lg border border-white/10 bg-white/[0.06] p-6">
              <p className="text-xs font-black uppercase tracking-[0.24em] text-cyan-200">{activeProcess.label[locale]}</p>
              <p className="mt-5 text-base font-semibold leading-8 text-white/70">{activeProcess.description[locale]}</p>
              <div className="mt-8 grid gap-3">
                {[labels.deliverable, labels.approval, labels.control, labels.handoff].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-md border border-white/10 bg-white/6 px-4 py-3 text-sm font-black text-white/82">
                    <CheckCircle2 className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                    {item}
                  </div>
                ))}
              </div>
            </aside>

            <div className="grid gap-5">
              {activeProcess.steps.map((step, index) => {
                const Icon = step.icon
                const detailCards = [
                  {
                    title: labels.deliverable,
                    body: isRTL
                      ? `توثيق عملي يوضح ما تم الاتفاق عليه في مرحلة ${step.title[locale]}.`
                      : `A practical artifact that documents what was agreed during ${step.title[locale]}.`,
                    icon: FileText,
                  },
                  {
                    title: labels.approval,
                    body: isRTL
                      ? 'لا ننتقل للمرحلة التالية إلا بعد وضوح الملاحظات والقرارات المطلوبة.'
                      : 'We do not move forward until feedback and decisions are visible.',
                    icon: ClipboardCheck,
                  },
                  {
                    title: labels.control,
                    body: isRTL
                      ? 'نراجع الجودة، التجاوب، المحتوى، والتكاملات حسب طبيعة المشروع.'
                      : 'Quality, responsiveness, content, and integrations are reviewed according to scope.',
                    icon: ShieldCheck,
                  },
                ]

                return (
                  <article key={step.number} className="grid gap-5 rounded-lg border border-white/10 bg-white/[0.05] p-5 md:grid-cols-[10rem_1fr] md:p-6">
                    <div className="flex items-start gap-4 md:block">
                      <div className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-lg border border-white/15 bg-white/10">
                        <Icon className="h-7 w-7 text-cyan-200" aria-hidden="true" />
                        <span className={cn('absolute -top-2 flex h-8 w-8 items-center justify-center rounded-md bg-cyan-300 text-sm font-black text-eerie shadow-lg shadow-cyan-500/30', isRTL ? '-left-2' : '-right-2')}>
                          {step.number}
                        </span>
                      </div>
                      <div className="md:mt-5">
                        <p className="rounded-md border border-white/10 bg-white/6 px-3 py-1 text-xs font-black uppercase tracking-[0.16em] text-cyan-100">{step.duration[locale]}</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-black tracking-tight text-white">{step.title[locale]}</h3>
                      <p className="mt-3 text-base font-semibold leading-8 text-white/68">{step.description[locale]}</p>
                      <div className="mt-5 grid gap-3 lg:grid-cols-3">
                        {detailCards.map((card) => {
                          const CardIcon = card.icon
                          return (
                            <div key={card.title} className="rounded-md border border-white/10 bg-white/7 p-4">
                              <div className="mb-3 flex items-center justify-between gap-3">
                                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/50">{card.title}</p>
                                <CardIcon className="h-4 w-4 text-cyan-200" aria-hidden="true" />
                              </div>
                              <p className="text-sm font-semibold leading-6 text-white/66">{card.body}</p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mx-auto mt-12 grid max-w-5xl gap-3 rounded-lg border border-white/10 bg-white/[0.04] p-5 sm:grid-cols-2 lg:grid-cols-5">
          {howWeWorkData.trustBar.items[locale].map((item) => (
            <div key={item} className="flex items-center gap-2 text-sm font-black text-white/82">
              <ArrowRight className={cn('h-4 w-4 text-cyan-200', isRTL && 'rotate-180')} aria-hidden="true" />
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
