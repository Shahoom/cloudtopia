import Link from 'next/link'
import { localePath } from '@/lib/i18n/url'

export function KeyTakeawaysBox({
  title,
  summary,
  items,
  locale,
}: {
  title?: string
  summary?: string
  items: string[]
  locale: string
}) {
  if (items.length === 0) return null

  return (
    <aside
      className="mb-8 border border-[var(--ed-rule)] border-s-2 border-s-[var(--ed-accent)] px-6 py-5"
      style={{ background: 'var(--ed-paper-2)' }}
    >
      <p className="ed-eyebrow mb-2.5" style={{ color: 'var(--ed-accent)' }}>
        {title || (locale === 'ar' ? 'النقاط الرئيسية' : 'Key Takeaways')}
      </p>
      {summary && (
        <p className="mb-3 text-sm leading-relaxed" style={{ color: 'var(--ed-body)' }}>
          {summary}
        </p>
      )}
      <ul className="space-y-2">
        {items.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-2.5 text-[15px] leading-relaxed"
            style={{ color: 'var(--ed-body)' }}
          >
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
              style={{ backgroundColor: 'var(--ed-accent)' }}
            />
            {item}
          </li>
        ))}
      </ul>
      <Link
        href={`/api/whatsapp?locale=${locale}`}
        className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg px-4 text-sm font-semibold text-white transition hover:opacity-90"
        style={{ backgroundColor: 'var(--ed-ink)' }}
      >
        {locale === 'ar' ? 'احجز مكالمة استراتيجية مجانية' : 'Book a Free Strategy Call'}
      </Link>
    </aside>
  )
}
