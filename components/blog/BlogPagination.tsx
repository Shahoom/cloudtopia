import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'

function pageHref(basePath: string, params: Record<string, string | undefined>, page: number) {
  const searchParams = new URLSearchParams()
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.set(key, value)
  })
  if (page > 1) searchParams.set('page', String(page))
  const query = searchParams.toString()
  return query ? `${basePath}?${query}` : basePath
}

export function BlogPagination({
  basePath,
  page,
  totalPages,
  params = {},
  locale = 'en',
}: {
  basePath: string
  page: number
  totalPages: number
  params?: Record<string, string | undefined>
  locale?: string
}) {
  if (totalPages <= 1) return null

  const isRTL = locale === 'ar'
  const linkClass =
    'inline-flex h-11 items-center gap-2 rounded-lg border border-[var(--ed-rule)] px-4 text-sm text-[color:var(--ed-graphite)] transition-colors hover:border-[var(--ed-accent)] hover:text-[color:var(--ed-accent-ink)]'

  return (
    <nav
      className="mt-12 flex items-center justify-center gap-4 border-t border-[var(--ed-rule)] pt-8"
      aria-label={isRTL ? 'تنقل الصفحات' : 'Articles pagination'}
    >
      {page > 1 && (
        <Link href={pageHref(basePath, params, page - 1)} className={linkClass}>
          <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" />
          {isRTL ? 'السابق' : 'Previous'}
        </Link>
      )}
      <span className="ed-meta">
        {isRTL ? `صفحة ${page} من ${totalPages}` : `Page ${page} of ${totalPages}`}
      </span>
      {page < totalPages && (
        <Link href={pageHref(basePath, params, page + 1)} className={linkClass}>
          {isRTL ? 'التالي' : 'Next'}
          <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
        </Link>
      )}
    </nav>
  )
}
