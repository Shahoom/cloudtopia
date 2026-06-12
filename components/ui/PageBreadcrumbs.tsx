import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { localePath } from '@/lib/i18n/url'

export type BreadcrumbCrumb = { label: string; href?: string }

/**
 * Generic, visible breadcrumb nav for any deep page (services, projects,
 * industries, country landing). Always starts at Home; the final crumb renders
 * as the current page (non-link, aria-current). Mirror the same trail in the
 * page's BreadcrumbList JSON-LD so the visible and structured hierarchies match
 * — Google derives sitelinks from this hierarchy.
 *
 * NOTE: the blog/articles section has its own Articles-anchored Breadcrumbs in
 * components/blog/Breadcrumbs.tsx; use this one everywhere else.
 */
export function PageBreadcrumbs({
  locale,
  items,
  className = '',
}: {
  locale: string
  items: BreadcrumbCrumb[]
  className?: string
}) {
  const homeLabel = locale === 'ar' ? 'الرئيسية' : 'Home'
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex flex-wrap items-center gap-2 text-sm font-semibold text-neutral-500 ${className}`}
    >
      <Link href={localePath(locale, '/')} className="hover:text-primary-600">
        {homeLabel}
      </Link>
      {items.map((item, index) => {
        const isLast = index === items.length - 1
        return (
          <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
            <ChevronRight className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
            {item.href && !isLast ? (
              <Link href={item.href} className="hover:text-primary-600">
                {item.label}
              </Link>
            ) : (
              <span className="text-neutral-700" aria-current={isLast ? 'page' : undefined}>
                {item.label}
              </span>
            )}
          </span>
        )
      })}
    </nav>
  )
}
