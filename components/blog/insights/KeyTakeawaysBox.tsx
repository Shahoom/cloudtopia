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
    <aside className="mb-8 rounded-xl border-l-4 border-neutral-900 bg-neutral-100 px-6 py-5">
      <h3 className="mb-2 text-[17px] font-black text-neutral-900">
        {title || (locale === 'ar' ? 'النقاط الرئيسية:' : 'Key Takeaways:')}
      </h3>
      {summary && (
        <p className="mb-3 text-sm leading-relaxed text-neutral-700">{summary}</p>
      )}
      <ul className="space-y-1.5">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm leading-relaxed text-neutral-700">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary-600" />
            {item}
          </li>
        ))}
      </ul>
      <Link
        href={localePath(locale, '/contact')}
        className="mt-5 inline-flex h-9 items-center rounded-lg bg-primary-600 px-4 text-sm font-black text-white transition hover:bg-primary-700"
      >
        {locale === 'ar' ? 'احجز مكالمة استراتيجية مجانية' : 'Book a Free Strategy Call'}
      </Link>
    </aside>
  )
}
