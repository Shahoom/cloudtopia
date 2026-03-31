'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localeNames, locales, type Locale } from '@/lib/i18n/config'

interface LanguageSwitcherProps {
  isDark?: boolean
}

export default function LanguageSwitcher({ isDark = false }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage()

  return (
    <div
      className={`flex items-center gap-0 px-1.5 py-1 md:gap-0.5 md:px-3 md:py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md ${isDark
        ? 'bg-lavender/10 hover:bg-lavender/20 border border-white/20 hover:border-white/30'
        : 'bg-lavender/80 hover:bg-lavender border border-neutral-200 hover:border-primary-300'
        }`}
    >
      {locales.map((loc, i) => (
        <span key={loc} className="flex items-center">
          {i > 0 && (
            <span className={isDark ? 'text-zinc-500 mx-0.5' : 'text-neutral-400 mx-0.5'}>|</span>
          )}
          <button
            onClick={() => setLocale(loc as Locale)}
            className={`text-sm font-bold transition-colors px-0.5 ${locale === loc
              ? (isDark ? 'text-blue-400' : 'text-primary-700')
              : (isDark ? 'text-zinc-400 hover:text-zinc-300' : 'text-neutral-600 hover:text-neutral-800')
              }`}
            aria-label={`Switch to ${localeNames[loc as Locale]}`}
          >
            {localeNames[loc as Locale]}
          </button>
        </span>
      ))}
    </div>
  )
}
