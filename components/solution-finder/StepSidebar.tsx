'use client'

import { CheckCircle2 } from 'lucide-react'
import type { StepDefinition } from './solutionFinderData'
import type { SFTextShape } from './sfTranslations'

type Props = {
  steps: StepDefinition[]
  currentStep: number
  completedSteps: Set<number>
  onStepClick: (index: number) => void
  locale: 'en' | 'ar'
  t: SFTextShape
}

const STEP_KEYS: Array<keyof SFTextShape['steps']> = [
  'industry', 'projectType', 'businessGoal', 'budgetTimeline', 'requirements'
]

export default function StepSidebar({ steps, currentStep, completedSteps, onStepClick, locale, t }: Props) {
  return (
    <div className="space-y-1">
      {steps.map((step, index) => {
        const isCompleted = completedSteps.has(index)
        const isCurrent   = index === currentStep
        const isPast      = index < currentStep
        const isClickable = isPast || isCompleted

        const stepInfo = t.steps[STEP_KEYS[index]]

        return (
          <button
            key={step.id}
            type="button"
            onClick={() => isClickable && onStepClick(index)}
            disabled={!isClickable}
            className={`
              w-full text-start flex items-center gap-2 px-2.5 py-2 rounded-xl transition-all duration-200
              ${isCurrent
                ? 'bg-[#0284c7]/8 border border-[#0284c7]/20'
                : isClickable
                  ? 'hover:bg-neutral-100 cursor-pointer border border-transparent'
                  : 'border border-transparent cursor-default opacity-50'
              }
            `}
          >
            {/* Step number / check */}
            <div
              className={`
                flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200
                ${isCompleted
                  ? 'bg-[#0284c7] text-white'
                  : isCurrent
                    ? 'bg-[#0284c7] text-white shadow-md shadow-[#0284c7]/25'
                    : 'bg-neutral-100 text-neutral-400'
                }
              `}
            >
              {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <span>{index + 1}</span>}
            </div>

            {/* Label */}
            <div className="min-w-0">
              <p className={`text-[13px] sm:text-xs font-bold leading-tight transition-colors duration-200 ${
                isCurrent ? 'text-[#0284c7]' : isClickable ? 'text-neutral-700' : 'text-neutral-400'
              }`}>
                {stepInfo.title}
              </p>
              <p className="text-[11px] sm:text-[10px] text-neutral-500 leading-tight mt-0.5 truncate">
                {stepInfo.subtitle}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
