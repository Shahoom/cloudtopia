import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { localePath } from '@/lib/i18n/url'
import { WhatsAppButton } from './editorial/WhatsAppButton'

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
  primaryHref = '/api/whatsapp',
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

  // Compact = quieter paper-2 band (used inline in articles); full = bold ink band.
  const onInk = !compact

  return (
    <section
      className="relative overflow-hidden"
      style={{
        background: onInk ? 'var(--ed-ink)' : 'var(--ed-paper-2)',
        border: onInk ? 'none' : '0.5px solid var(--ed-rule)',
        borderTop: '2px solid var(--ed-rule-ink)',
        padding: compact ? '1.75rem' : '2.75rem',
      }}
      data-header-theme={onInk ? 'dark' : 'light'}
    >
      <div className="relative">
        <span
          className="ed-eyebrow"
          style={{ color: onInk ? 'var(--ed-muted)' : 'var(--ed-accent)' }}
        >
          {ar ? 'بناء مع كلاود توبيا' : 'Build with CloudTopia'}
        </span>
        <h2
          className="ed-serif"
          style={{
            marginTop: '0.6rem',
            fontSize: compact ? '1.5rem' : 'clamp(1.7rem, 3.5vw, 2.4rem)',
            lineHeight: 1.16,
            color: onInk ? 'var(--ed-paper)' : 'var(--ed-ink)',
          }}
        >
          {resolvedTitle}
        </h2>
        <p
          style={{
            marginTop: compact ? '0.7rem' : '1rem',
            maxWidth: '46rem',
            fontFamily: 'var(--ed-sans)',
            fontSize: compact ? '0.95rem' : '1.05rem',
            lineHeight: 1.6,
            color: onInk ? 'var(--ed-muted)' : 'var(--ed-graphite)',
          }}
        >
          {resolvedText}
        </p>
        <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3">
          <Link
            href={localePath(locale, primaryHref)}
            className="ed-eyebrow inline-flex h-11 items-center gap-2 px-5 transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
            style={{ background: 'var(--ed-accent)', color: '#ffffff', letterSpacing: '0.12em' }}
          >
            {resolvedPrimaryLabel}
            <ArrowIcon className="h-4 w-4" />
          </Link>
          <Link
            href={localePath(locale, secondaryHref)}
            className="ed-eyebrow inline-flex items-center gap-2 pb-0.5 transition-colors focus:outline-none focus-visible:ring-2"
            style={{
              color: onInk ? 'var(--ed-paper)' : 'var(--ed-ink)',
              borderBottom: `1px solid ${onInk ? 'var(--ed-muted)' : 'var(--ed-rule-ink)'}`,
              letterSpacing: '0.12em',
            }}
          >
            {resolvedSecondaryLabel}
            <ArrowIcon className="h-3.5 w-3.5 rtl:-scale-x-100" />
          </Link>
          <WhatsAppButton locale={locale} />
        </div>
      </div>
    </section>
  )
}
