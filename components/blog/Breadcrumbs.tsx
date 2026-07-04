import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { localePath } from '@/lib/i18n/url'

export function Breadcrumbs({
  locale,
  items,
}: {
  locale: string
  items: Array<{ label: string; href?: string }>
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="ed-meta mb-8 flex flex-wrap items-center gap-1.5"
      style={{ color: 'var(--ed-muted)' }}
    >
      <Link
        href={localePath(locale, '/')}
        className="transition-colors hover:text-[color:var(--ed-accent)]"
      >
        {locale === 'ar' ? 'الرئيسية' : 'Home'}
      </Link>
      <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
      <Link
        href={localePath(locale, '/articles')}
        className="transition-colors hover:text-[color:var(--ed-accent)]"
      >
        {locale === 'ar' ? 'المقالات' : 'Articles'}
      </Link>
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" aria-hidden="true" />
          {item.href ? (
            <Link
              href={item.href}
              className="transition-colors hover:text-[color:var(--ed-accent)]"
            >
              {item.label}
            </Link>
          ) : (
            <span style={{ color: 'var(--ed-graphite)' }}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
