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
    <nav
      className="mt-12 grid border-t-2 border-[var(--ed-rule-ink)] md:grid-cols-2 md:divide-x md:divide-[var(--ed-rule)] rtl:md:divide-x-reverse"
      aria-label={locale === 'ar' ? 'المقالات السابقة والتالية' : 'Previous and next articles'}
    >
      {previous ? (
        <Link
          href={localePath(locale, `/articles/${previous.slug}`)}
          className="group block py-6 md:pe-8"
        >
          <span className="ed-eyebrow inline-flex items-center gap-2" style={{ color: 'var(--ed-muted)' }}>
            <ArrowLeft className="h-3.5 w-3.5 rtl:-scale-x-100" />
            {locale === 'ar' ? 'السابق' : 'Previous'}
          </span>
          <strong className="ed-serif mt-2 block text-lg leading-snug transition-colors group-hover:text-[color:var(--ed-accent-ink)]">
            {previous.title}
          </strong>
        </Link>
      ) : (
        <span className="hidden md:block" />
      )}
      {next && (
        <Link
          href={localePath(locale, `/articles/${next.slug}`)}
          className="group block border-t border-[var(--ed-rule)] py-6 text-end md:border-t-0 md:ps-8"
        >
          <span className="ed-eyebrow inline-flex items-center gap-2" style={{ color: 'var(--ed-muted)' }}>
            {locale === 'ar' ? 'التالي' : 'Next'}
            <ArrowRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
          </span>
          <strong className="ed-serif mt-2 block text-lg leading-snug transition-colors group-hover:text-[color:var(--ed-accent-ink)]">
            {next.title}
          </strong>
        </Link>
      )}
    </nav>
  )
}
