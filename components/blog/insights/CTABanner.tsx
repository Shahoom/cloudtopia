import { ArrowRight } from 'lucide-react'
import { localePath } from '@/lib/i18n/url'

export function CTABanner({
  locale,
  title,
  subtitle,
}: {
  locale: string
  title?: string
  subtitle?: string
}) {
  const isAr = locale === 'ar'
  const defaultTitle = isAr
    ? 'هل أنت مستعد للانتقال إلى السحابة؟'
    : 'Ready to move your business to the cloud?'
  const defaultSubtitle = isAr
    ? 'كلاود توبيا تصمم وتبني البنية التحتية السحابية وتطبيقات الويب والأنظمة المدعومة بالذكاء الاصطناعي للشركات.'
    : 'CloudTopia designs and builds cloud infrastructure, web applications, and AI-powered systems for growth-focused businesses.'
  const buttonText = isAr ? 'ابدأ الآن' : 'Start Now'

  return (
    <section className="border-y-2 border-[var(--ed-rule-ink)] bg-[color:var(--ed-paper-2)]">
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-6 px-6 py-10 sm:flex-row sm:items-center sm:justify-between sm:py-12">
        <div className="min-w-0 flex-1">
          <h2 className="ed-serif" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: 1.15 }}>
            {title ?? defaultTitle}
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7" style={{ color: 'var(--ed-graphite)' }}>
            {subtitle ?? defaultSubtitle}
          </p>
        </div>
        <a
          href={`/api/whatsapp?locale=${locale}`}
          className="ed-eyebrow inline-flex h-11 shrink-0 items-center gap-2 bg-[color:var(--ed-accent)] px-6 text-white transition-colors hover:bg-[color:var(--ed-accent-ink)]"
        >
          {buttonText}
          <ArrowRight className="h-4 w-4 rtl:rotate-180" />
        </a>
      </div>
    </section>
  )
}
