import Link from 'next/link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import type { BlogPostSummary } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'

export function PreviousNextPosts({
  previous,
  next,
  locale,
}: {
  previous: BlogPostSummary | null
  next: BlogPostSummary | null
  locale: string
}) {
  if (!previous && !next) return null

  return (
    <nav className="mt-10 grid gap-4 md:grid-cols-2" aria-label={locale === 'ar' ? 'المقالات السابقة والتالية' : 'Previous and next articles'}>
      {previous ? (
        <Link
          href={localePath(locale, `/articles/${previous.slug}`)}
          className="group rounded-3xl border border-sky-100 bg-white p-5 shadow-sm transition hover:border-primary-500 hover:shadow-lg"
        >
          <span className="inline-flex items-center gap-2 text-sm font-black text-neutral-500">
            <ArrowLeft className="h-4 w-4 rtl:-scale-x-100" />
            {locale === 'ar' ? 'السابق' : 'Previous'}
          </span>
          <strong className="mt-2 block text-lg font-black leading-tight text-neutral-950 group-hover:text-primary-700">
            {previous.title}
          </strong>
        </Link>
      ) : (
        <span />
      )}
      {next && (
        <Link
          href={localePath(locale, `/articles/${next.slug}`)}
          className="group rounded-3xl border border-sky-100 bg-white p-5 text-right shadow-sm transition hover:border-primary-500 hover:shadow-lg"
        >
          <span className="inline-flex items-center gap-2 text-sm font-black text-neutral-500">
            {locale === 'ar' ? 'التالي' : 'Next'}
            <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
          </span>
          <strong className="mt-2 block text-lg font-black leading-tight text-neutral-950 group-hover:text-primary-700">
            {next.title}
          </strong>
        </Link>
      )}
    </nav>
  )
}
