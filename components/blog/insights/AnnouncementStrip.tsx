import Link from 'next/link'
import { localePath } from '@/lib/i18n/url'

export type AnnouncementItem = { title: string; href: string }

/**
 * Scrolling ticker of REAL, latest article links (driven by the listing data).
 *
 * The links animate in a seamless marquee (content duplicated, translateX -50%).
 * The "Recent" label and "Browse all" are absolutely positioned with an OPAQUE
 * background so the scrolling text passes cleanly BEHIND them — the original bug
 * was a transparent label that let the moving text bleed through it. Pauses on
 * hover so a moving link can actually be clicked, and respects reduced-motion.
 * Renders nothing when there are no articles.
 */
export function AnnouncementStrip({ locale, items = [] }: { locale: string; items?: AnnouncementItem[] }) {
  const isArabic = locale === 'ar'
  if (items.length === 0) return null

  const label = isArabic ? 'الأحدث' : 'Recent'
  const browseAll = isArabic ? 'تصفّح الكل' : 'Browse all'

  const links = items.map((item, i) => (
    <Link
      key={`${item.href}-${i}`}
      href={item.href}
      className="ed-meta whitespace-nowrap transition-colors hover:text-[color:var(--ed-accent-ink)]"
      style={{ color: 'var(--ed-graphite)' }}
    >
      {item.title}
    </Link>
  ))

  return (
    <div
      dir={isArabic ? 'rtl' : 'ltr'}
      className="group relative flex h-11 w-full overflow-hidden border-b border-[var(--ed-rule)] bg-[color:var(--ed-paper)]"
    >
      {/* Seamless marquee: two identical copies, animation shifts by one copy. */}
      <div
        className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused] motion-reduce:animate-none"
        style={{ '--duration': '55s' } as React.CSSProperties}
      >
        <div className="flex shrink-0 items-center gap-10 pe-10">{links}</div>
        <div className="flex shrink-0 items-center gap-10 pe-10" aria-hidden="true">
          {links}
        </div>
      </div>

      {/* Opaque fixed label — text scrolls behind it. */}
      <span className="ed-eyebrow absolute inset-y-0 start-0 z-10 flex items-center gap-2 border-e border-[var(--ed-rule)] bg-[color:var(--ed-paper)] pe-3 ps-4 text-[color:var(--ed-accent)] sm:pe-4">
        <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 animate-pulse rounded-full bg-[color:var(--ed-accent)]" />
        {label}
      </span>

      {/* Opaque fixed "Browse all". */}
      <Link
        href={localePath(locale, '/articles')}
        className="ed-eyebrow absolute inset-y-0 end-0 z-10 flex items-center gap-1 border-s border-[var(--ed-rule)] bg-[color:var(--ed-paper)] pe-4 ps-3 text-[color:var(--ed-accent)] transition-colors hover:text-[color:var(--ed-accent-ink)] sm:ps-4"
      >
        <span className="hidden sm:inline">{browseAll}</span>
        <span aria-hidden="true" className="inline-block rtl:rotate-180">→</span>
      </Link>
    </div>
  )
}
