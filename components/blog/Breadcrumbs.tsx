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
    <nav aria-label="Breadcrumb" className="mb-8 flex flex-wrap items-center gap-2 text-sm font-bold text-neutral-500">
      <Link href={localePath(locale, '/')} className="hover:text-primary-700">
        {locale === 'ar' ? 'الرئيسية' : 'Home'}
      </Link>
      <ChevronRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
      <Link href={localePath(locale, '/articles')} className="hover:text-primary-700">
        {locale === 'ar' ? 'المقالات' : 'Articles'}
      </Link>
      {items.map((item) => (
        <span key={item.label} className="inline-flex items-center gap-2">
          <ChevronRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
          {item.href ? (
            <Link href={item.href} className="hover:text-primary-700">
              {item.label}
            </Link>
          ) : (
            <span className="text-neutral-700">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
