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

  return (
    <nav className="mt-12 flex items-center justify-center gap-3" aria-label={isRTL ? 'تنقل الصفحات' : 'Articles pagination'}>
      {page > 1 && (
        <Link
          href={pageHref(basePath, params, page - 1)}
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-sm font-black text-neutral-700 transition hover:border-primary-300 hover:text-primary-700"
        >
          <ArrowLeft className="h-4 w-4" />
          {isRTL ? 'السابق' : 'Previous'}
        </Link>
      )}
      <span className="rounded-xl bg-white px-4 py-3 text-sm font-black text-neutral-600 shadow-sm">
        {isRTL ? `صفحة ${page} من ${totalPages}` : `Page ${page} of ${totalPages}`}
      </span>
      {page < totalPages && (
        <Link
          href={pageHref(basePath, params, page + 1)}
          className="inline-flex h-11 items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 text-sm font-black text-neutral-700 transition hover:border-primary-300 hover:text-primary-700"
        >
          {isRTL ? 'التالي' : 'Next'}
          <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </nav>
  )
}
