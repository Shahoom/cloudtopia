import Link from 'next/link'
import { localePath } from '@/lib/i18n/url'

export type AnnouncementItem = { title: string; href: string }

/**
 * Scrolling strip of REAL, latest article links (driven by the listing data).
 * Renders nothing when there are no articles, so it never advertises content
 * that does not exist.
 */
export function AnnouncementStrip({ locale, items = [] }: { locale: string; items?: AnnouncementItem[] }) {
  const isArabic = locale === 'ar'
  if (items.length === 0) return null

  const label = isArabic ? 'أحدث المقالات' : 'Latest'
  const sequence = (
    <>
      {items.map((item, i) => (
        <Link
          key={`${item.href}-${i}`}
          href={item.href}
          className="px-4 text-xs font-bold tracking-wide text-white/85 transition hover:text-white"
        >
          {item.title}
        </Link>
      ))}
    </>
  )

  return (
    <div dir={isArabic ? 'rtl' : 'ltr'} className="relative flex h-10 w-full overflow-hidden bg-neutral-950 text-white">
      <span className="z-10 inline-flex shrink-0 items-center bg-primary-600 px-4 text-[11px] font-black uppercase tracking-widest">
        {label}
      </span>
      <div className="animate-marquee flex shrink-0 items-center whitespace-nowrap" style={{ '--duration': '40s' } as React.CSSProperties}>
        {sequence}
        <span aria-hidden="true" className="contents">{sequence}</span>
      </div>
      <div className="animate-marquee flex shrink-0 items-center whitespace-nowrap" aria-hidden="true" style={{ '--duration': '40s' } as React.CSSProperties}>
        {sequence}
        {sequence}
      </div>
      <Link
        href={localePath(locale, '/articles')}
        className="absolute end-0 top-0 z-10 inline-flex h-full shrink-0 items-center gap-1 bg-neutral-950 pe-4 ps-6 text-xs font-black text-primary-400 transition hover:text-primary-300"
      >
        {isArabic ? 'تصفّح الكل' : 'Browse all'}
        <span aria-hidden="true" className="inline-block rtl:rotate-180">→</span>
      </Link>
    </div>
  )
}
