'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Locale, defaultLocale, localeDirection, locales } from './config'
import { en } from './translations/en'
import { ar } from './translations/ar'
import { tr } from './translations/tr'
import { useRouteAlternates } from './RouteAlternatesContext'
import { localePath, stripLocalePrefix } from './url'

type Translations = typeof en

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translations
  dir: 'ltr' | 'rtl'
}

const translations: Record<Locale, Translations> = {
  en,
  ar,
  tr: tr as unknown as Translations,
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Extract locale from pathname. Unprefixed paths are English-canonical, so
// `/projects` → 'en', `/ar/projects` → 'ar', `/tr/projects` → 'tr'.
function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/')
  const potentialLocale = segments[1]
  if (locales.includes(potentialLocale as Locale)) {
    return potentialLocale as Locale
  }
  return defaultLocale
}

// Helper to get locale from cookie
function getLocaleFromCookie(): Locale | null {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/NEXT_LOCALE=([^;]+)/)
  if (match && locales.includes(match[1] as Locale)) {
    return match[1] as Locale
  }
  return null
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const router = useRouter()
  // Pages with locale-specific URL shapes (e.g. blog posts with native-script
  // slugs) publish their localized URLs via RouteAlternatesProvider. We consult
  // it here so switching languages always lands on the correct localized URL,
  // not a 404 from naive segment-swap.
  const routeAlternates = useRouteAlternates()

  // Get initial locale from URL (cookie is fallback for the SSR-hydrate
  // transition; URL is authoritative)
  const initialLocale = getLocaleFromPathname(pathname) || getLocaleFromCookie() || defaultLocale
  const [locale, setLocaleState] = useState<Locale>(initialLocale)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // On mount, sync locale from URL
    const urlLocale = getLocaleFromPathname(pathname)
    if (urlLocale !== locale) {
      setLocaleState(urlLocale)
    }
    setMounted(true)
  }, [pathname])

  useEffect(() => {
    if (mounted) {
      // Update document direction and language
      document.documentElement.dir = localeDirection[locale]
      document.documentElement.lang = locale

      // Save to cookie
      document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=${60 * 60 * 24 * 365}`

      // Also save to localStorage for backward compatibility
      localStorage.setItem('cloudtopia-locale', locale)
    }
  }, [locale, mounted])

  const setLocale = (newLocale: Locale) => {
    if (newLocale === locale) return

    let newPath: string

    // 1) If the current page published an explicit alternate URL for the
    //    target locale (e.g. blog posts with native-script slugs), use it.
    //    This is the only correct path for routes whose URL shape depends
    //    on locale.
    const explicitAlt = routeAlternates?.[newLocale]
    if (explicitAlt) {
      newPath = explicitAlt
    } else {
      // 2) Fallback: strip the current locale prefix (if any) and re-apply
      //    the target locale through localePath. Handles all three cases:
      //    en→ar (no prefix → /ar/...), ar→en (/ar/... → /...), ar→tr.
      const basePath = stripLocalePrefix(pathname)
      newPath = localePath(newLocale, basePath)
    }

    // Update state first for immediate UI update
    setLocaleState(newLocale)

    // Navigate to new URL with new locale
    router.push(newPath)
  }

  const value: LanguageContextType = {
    locale,
    setLocale,
    t: translations[locale],
    dir: localeDirection[locale],
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export function useTranslations() {
  const { t } = useLanguage()
  return t
}
