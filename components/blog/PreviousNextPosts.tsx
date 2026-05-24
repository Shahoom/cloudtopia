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
    <nav className="mt-10 grid gap-4 md:grid-cols-2" aria-label="Previous and next insights">
      {previous ? (
        <Link
          href={localePath(locale, `/insights/${previous.slug}`)}
          className="group rounded-3xl border border-sky-100 bg-white p-5 shadow-sm transition hover:border-primary-500 hover:shadow-lg"
        >
          <span className="inline-flex items-center gap-2 text-sm font-black text-neutral-500">
            <ArrowLeft className="h-4 w-4" />
            Previous
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
          href={localePath(locale, `/insights/${next.slug}`)}
          className="group rounded-3xl border border-sky-100 bg-white p-5 text-right shadow-sm transition hover:border-primary-500 hover:shadow-lg"
        >
          <span className="inline-flex items-center gap-2 text-sm font-black text-neutral-500">
            Next
            <ArrowRight className="h-4 w-4" />
          </span>
          <strong className="mt-2 block text-lg font-black leading-tight text-neutral-950 group-hover:text-primary-700">
            {next.title}
          </strong>
        </Link>
      )}
    </nav>
  )
}
