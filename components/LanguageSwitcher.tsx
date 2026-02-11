'use client'

import { useLanguage } from '@/lib/i18n/LanguageContext'
import { localeNames, type Locale } from '@/lib/i18n/config'

interface LanguageSwitcherProps {
  isDark?: boolean
}

export default function LanguageSwitcher({ isDark = false }: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage()

  const toggleLocale = () => {
    const newLocale: Locale = locale === 'en' ? 'ar' : 'en'
    setLocale(newLocale)
  }

  return (
    <button
      onClick={toggleLocale}
      className={`flex items-center gap-1 px-4 py-2 rounded-full transition-all duration-300 shadow-sm hover:shadow-md group ${isDark
        ? 'bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30'
        : 'bg-white/80 hover:bg-white border border-neutral-200 hover:border-primary-300'
        }`}
      aria-label="Switch language"
    >
      <span className={`text-sm font-bold transition-colors ${locale === 'en'
        ? (isDark ? 'text-blue-400' : 'text-primary-600')
        : (isDark ? 'text-zinc-500' : 'text-neutral-400')
        }`}>
        EN
      </span>
      <span className={isDark ? 'text-zinc-500 mx-1' : 'text-neutral-300 mx-1'}>|</span>
      <span className={`text-sm font-bold transition-colors ${locale === 'ar'
        ? (isDark ? 'text-blue-400' : 'text-primary-600')
        : (isDark ? 'text-zinc-500' : 'text-neutral-400')
        }`}>
        AR
      </span>
    </button>
  )
}
