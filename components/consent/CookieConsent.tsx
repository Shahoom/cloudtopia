'use client'

/**
 * Cookie consent manager.
 *
 * Google Analytics and the Meta Pixel set tracking cookies (_ga*, _fbp), which
 * under the GCC data-protection laws (Oman PDPL — Royal Decree 6/2022, Saudi
 * PDPL, UAE PDPL) and the EU GDPR/ePrivacy rules for European visitors require
 * prior opt-in consent. This component:
 *
 *   1. Shows an accessible, bilingual banner until the visitor chooses.
 *   2. Loads GA + Meta Pixel ONLY after "Accept" — nothing tracking-related
 *      touches the browser before that.
 *   3. Stores the choice in a first-party cookie (`ct-consent`, 12 months) —
 *      itself strictly necessary and exempt from consent.
 *
 * Strictly-necessary storage that works without consent: NEXT_LOCALE (language
 * choice) and this consent cookie.
 */

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { localePath } from '@/lib/i18n/url'

const CONSENT_COOKIE = 'ct-consent'
const CONSENT_MAX_AGE = 60 * 60 * 24 * 365
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-2T6MHVTJ5F'
const PIXEL_ID = '1641077453704969'

type ConsentValue = 'granted' | 'denied' | null

function readConsent(): ConsentValue {
  if (typeof document === 'undefined') return null
  const match = document.cookie.match(/(?:^|;\s*)ct-consent=(granted|denied)/)
  return (match?.[1] as ConsentValue) ?? null
}

function writeConsent(value: Exclude<ConsentValue, null>) {
  document.cookie = `${CONSENT_COOKIE}=${value};path=/;max-age=${CONSENT_MAX_AGE};SameSite=Lax`
}

let analyticsLoaded = false

function loadAnalytics() {
  if (analyticsLoaded) return
  analyticsLoaded = true

  // Google Analytics 4 (gtag.js)
  if (GA_MEASUREMENT_ID && !document.querySelector('script[src*="googletagmanager.com/gtag"]')) {
    const ga = document.createElement('script')
    ga.async = true
    ga.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`
    document.head.appendChild(ga)
    const w = window as unknown as { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void }
    w.dataLayer = w.dataLayer || []
    w.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      w.dataLayer!.push(arguments)
    }
    w.gtag('js', new Date())
    w.gtag('config', GA_MEASUREMENT_ID)
  }

  // Meta Pixel
  const fw = window as unknown as { fbq?: any; _fbq?: any }
  if (!fw.fbq) {
    const n: any = (fw.fbq = function () {
      // eslint-disable-next-line prefer-rest-params
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments)
    })
    if (!fw._fbq) fw._fbq = n
    n.push = n
    n.loaded = true
    n.version = '2.0'
    n.queue = []
    const t = document.createElement('script')
    t.async = true
    t.src = 'https://connect.facebook.net/en_US/fbevents.js'
    document.head.appendChild(t)
  }
  fw.fbq('init', PIXEL_ID)
  fw.fbq('track', 'PageView')
}

const COPY = {
  en: {
    message:
      'We use cookies for analytics (Google Analytics, Meta Pixel) to understand how visitors use our site. We only set them if you agree.',
    accept: 'Accept analytics',
    decline: 'Necessary only',
    policy: 'Cookie Policy',
    ariaLabel: 'Cookie consent',
  },
  ar: {
    message:
      'نستخدم ملفات تعريف الارتباط للتحليلات (Google Analytics وMeta Pixel) لفهم كيفية استخدام الزوار لموقعنا، ولا نفعّلها إلا بموافقتك.',
    accept: 'قبول التحليلات',
    decline: 'الضروري فقط',
    policy: 'سياسة ملفات تعريف الارتباط',
    ariaLabel: 'الموافقة على ملفات تعريف الارتباط',
  },
} as const

export function CookieConsent({ locale }: { locale: string }) {
  const [visible, setVisible] = useState(false)
  const lang: 'en' | 'ar' = locale === 'ar' ? 'ar' : 'en'
  const copy = COPY[lang]

  useEffect(() => {
    const stored = readConsent()
    if (stored === 'granted') {
      loadAnalytics()
    } else if (stored === null) {
      setVisible(true)
    }
  }, [])

  if (!visible) return null

  const choose = (value: 'granted' | 'denied') => {
    writeConsent(value)
    setVisible(false)
    if (value === 'granted') loadAnalytics()
  }

  return (
    <div
      role="dialog"
      aria-label={copy.ariaLabel}
      aria-live="polite"
      dir={lang === 'ar' ? 'rtl' : 'ltr'}
      className="fixed bottom-0 inset-x-0 z-[9999] border-t border-neutral-200 bg-white/95 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:gap-6 sm:px-6">
        <p className="flex-1 text-sm leading-6 text-neutral-700">
          {copy.message}{' '}
          <Link
            href={localePath(lang, '/cookies')}
            className="font-semibold text-primary-700 underline underline-offset-2 hover:text-primary-800"
          >
            {copy.policy}
          </Link>
        </p>
        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            onClick={() => choose('denied')}
            className="rounded-xl border border-neutral-300 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-700 transition-colors hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
            {copy.decline}
          </button>
          <button
            type="button"
            onClick={() => choose('granted')}
            className="rounded-xl bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2"
          >
            {copy.accept}
          </button>
        </div>
      </div>
    </div>
  )
}

export default CookieConsent
