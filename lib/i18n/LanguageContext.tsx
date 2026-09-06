'use client'

import React, { createContext, useContext, useState, useEffect, useMemo, useCallback, ReactNode } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { Locale, defaultLocale, localeDirection, locales } from './config'
import { useRouteAlternates } from './RouteAlternatesContext'
import { localePath, stripLocalePrefix } from './url'

// Type-only reference: the provider never imports the locale databases at
// runtime — the server passes the single active-locale dictionary as a prop.
type Translations = typeof import('./translations/en').en

interface LanguageContextType {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: Translations
  dir: 'ltr' | 'rtl'
  design: Record<string, unknown> | null
  navigation: Record<string, any> | null
  settings: Record<string, any> | null
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Extract locale from pathname. Unprefixed paths are English-canonical, so
// `/projects` → 'en', `/ar/projects` → 'ar'.
function getLocaleFromPathname(pathname: string): Locale {
  const segments = pathname.split('/')
  const potentialLocale = segments[1]
  if (locales.includes(potentialLocale as Locale)) {
    return potentialLocale as Locale
  }
  return defaultLocale
}

export function LanguageProvider({
  children,
  initialLocale,
  initialDictionary,
  initialDesign = null,
  initialNavigation = null,
  initialSettings = null,
}: {
  children: ReactNode
  initialLocale?: Locale
  initialDictionary: Translations
  initialDesign?: Record<string, unknown> | null
  initialNavigation?: Record<string, any> | null
  initialSettings?: Record<string, any> | null
}) {
  const pathname = usePathname()
  const router = useRouter()
  // Pages with locale-specific URL shapes (e.g. blog posts with native-script
  // slugs) publish their localized URLs via RouteAlternatesProvider. We consult
  // it here so switching languages always lands on the correct localized URL,
  // not a 404 from naive segment-swap.
  const routeAlternates = useRouteAlternates()

  // URL is authoritative for the current locale; the prop seeds SSR output.
  const locale = initialLocale || getLocaleFromPathname(pathname)
  const [dictionary, setDictionary] = useState(initialDictionary)
  const [design, setDesign] = useState<Record<string, unknown> | null>(initialDesign)
  const [navigation, setNavigation] = useState<Record<string, any> | null>(initialNavigation)
  const [settings, setSettings] = useState<Record<string, any> | null>(initialSettings)

  useEffect(() => setDictionary(initialDictionary), [initialDictionary])

  useEffect(() => {
    setDesign(initialDesign)
    setNavigation(initialNavigation)
    setSettings(initialSettings)
  }, [initialDesign, initialNavigation, initialSettings])

  useEffect(() => {
    // Update document direction and language
    document.documentElement.dir = localeDirection[locale]
    document.documentElement.lang = locale

    // Save to cookie
    document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=${60 * 60 * 24 * 365}`

    // Also save to localStorage for backward compatibility
    localStorage.setItem('cloudtopia-locale', locale)
  }, [locale])

  useEffect(() => {
    if (!design) return
    const theme = (design as { theme?: Record<string, unknown> }).theme
    if (!theme || typeof theme !== 'object') return
    const colors = (theme as { colors?: Record<string, string> }).colors
    if (colors?.primary) document.documentElement.style.setProperty('--cms-primary', colors.primary)
    if (colors?.secondary) document.documentElement.style.setProperty('--cms-secondary', colors.secondary)
    if (colors?.background) document.documentElement.style.setProperty('--cms-background', colors.background)
  }, [design])

  const setLocale = useCallback((newLocale: Locale) => {
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
      //    the target locale through localePath. Handles en→ar and ar→en.
      const basePath = stripLocalePrefix(pathname)
      newPath = localePath(newLocale, basePath)
    }

    // Navigate to new URL with new locale; the destination page's provider
    // delivers the matching dictionary.
    router.push(newPath)
  }, [locale, pathname, routeAlternates, router])

  const value = useMemo<LanguageContextType>(() => ({
    locale,
    setLocale,
    t: dictionary,
    dir: localeDirection[locale],
    design,
    navigation,
    settings,
  }), [locale, setLocale, dictionary, design, navigation, settings])

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
