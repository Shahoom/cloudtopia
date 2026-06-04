'use client'

import { motion } from 'framer-motion'
import type { OptionItem } from './solutionFinderData'
import type { SFTextShape } from './sfTranslations'

type Props = {
  option: OptionItem
  selected: boolean
  onSelect: (id: string) => void
  locale: 'en' | 'ar'
  t: SFTextShape
}

export default function OptionCard({ option, selected, onSelect, locale }: Props) {
  return (
    <motion.button
      onClick={() => onSelect(option.id)}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      className={`
        relative w-full flex flex-col items-center justify-center text-center rounded-2xl border-2 py-2.5 px-2 sm:py-3.5 sm:px-3 transition-all duration-200 group
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#6366f1] focus-visible:ring-offset-2
        ${selected
          ? 'border-[#6366f1] bg-[#6366f1]/5 shadow-md shadow-[#6366f1]/10'
          : 'border-[rgba(15,23,42,0.08)] bg-white hover:border-[#6366f1]/35 hover:bg-[#6366f1]/2 hover:shadow-sm'
        }
      `}
      aria-pressed={selected}
    >
      {/* Selected checkmark at top right */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute top-2 end-2 w-4.5 h-4.5 rounded-full bg-[#6366f1] flex items-center justify-center shadow-sm shadow-[#6366f1]/30"
        >
          <svg className="w-2 h-2 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}

      <div className="flex flex-col items-center justify-center gap-1.5 font-sans">
        {/* Icon */}
        <span
          className="text-3xl w-11 h-11 flex items-center justify-center transition-transform duration-200 group-hover:scale-108"
          aria-hidden="true"
        >
          {option.icon}
        </span>

        {/* Label */}
        <p className={`text-[14px] sm:text-[15px] font-extrabold leading-snug transition-colors duration-200 font-sans max-w-[95%] ${
          selected ? 'text-[#6366f1]' : 'text-neutral-800 group-hover:text-[#0f172a]'
        }`}>
          {option.label[locale]}
        </p>
      </div>
    </motion.button>
  )
}
