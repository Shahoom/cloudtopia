import Link from 'next/link'
import { ArrowLeft, ArrowRight, Sparkles } from 'lucide-react'
import { localePath } from '@/lib/i18n/url'

type BlogCTAProps = {
  locale: string
  compact?: boolean
  title?: string
  text?: string
  primaryLabel?: string
  secondaryLabel?: string
  primaryHref?: string
  secondaryHref?: string
}

export function BlogCTA({
  locale,
  compact = false,
  title,
  text,
  primaryLabel,
  secondaryLabel,
  primaryHref = '/contact',
  secondaryHref = '/services',
}: BlogCTAProps) {
  const ar = locale === 'ar'
  const resolvedTitle = title ?? (ar
    ? 'هل لديك فكرة لموقع ويب، نظام، أو منصة مدعومة بالذكاء الاصطناعي؟'
    : 'Have an idea for a website, system, or AI-powered platform?')
  const resolvedText = text ?? (ar
    ? 'كلاود توبيا تساعد الشركات في تحويل أفكارها الرقمية إلى حلول ويب قابلة للتوسع.'
    : 'CloudTopia helps businesses turn digital ideas into scalable web solutions.')
  const resolvedPrimaryLabel = primaryLabel ?? (ar ? 'ابدأ مشروعك' : 'Start Your Project')
  const resolvedSecondaryLabel = secondaryLabel ?? (ar ? 'عرض الخدمات' : 'View Services')
  const ArrowIcon = ar ? ArrowLeft : ArrowRight

  return (
    <section
      className={`relative overflow-hidden rounded-3xl bg-neutral-950 text-white shadow-2xl shadow-sky-950/20 ${
        compact ? 'p-6' : 'p-8 md:p-12'
      }`}
      data-header-theme="dark"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(14,165,233,0.28),transparent_46%),linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] bg-[size:auto,36px_36px,36px_36px]" />
      <div className="relative">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-normal text-sky-200">
          <Sparkles className="h-3.5 w-3.5" />
          {ar ? 'بناء مع كلاود توبيا' : 'Build with CloudTopia'}
        </span>
        <h2 className={`${compact ? 'text-2xl' : 'text-3xl md:text-5xl'} font-black leading-tight tracking-normal text-white`}>
          {resolvedTitle}
        </h2>
        <p className={`${compact ? 'mt-3 text-sm leading-6' : 'mt-5 max-w-3xl text-lg leading-8'} text-white/75`}>
          {resolvedText}
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={localePath(locale, primaryHref)}
            className="inline-flex h-12 items-center gap-2 rounded-xl bg-white px-5 text-sm font-black text-neutral-950 transition hover:bg-sky-100"
          >
            {resolvedPrimaryLabel}
            <ArrowIcon className="h-4 w-4" />
          </Link>
          <Link
            href={localePath(locale, secondaryHref)}
            className="inline-flex h-12 items-center rounded-xl border border-white/15 px-5 text-sm font-black text-white transition hover:bg-white/10"
          >
            {resolvedSecondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
