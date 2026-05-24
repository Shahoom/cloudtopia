import Link from 'next/link'
import type { BlogCategory } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'

export function CategoryChips({
  categories,
  locale,
  activeSlug,
}: {
  categories: BlogCategory[]
  locale: string
  activeSlug?: string
}) {
  return (
    <nav aria-label="Insights topics" className="flex flex-wrap justify-center gap-3">
      <Link
        href={localePath(locale, '/insights')}
        className={`rounded-full border px-4 py-2 text-sm font-black transition ${
          !activeSlug
            ? 'border-neutral-950 bg-neutral-950 text-white'
            : 'border-white/80 bg-white text-neutral-700 hover:border-primary-300 hover:text-primary-700'
        }`}
      >
        All topics
      </Link>
      {categories.slice(0, 10).map((category) => (
        <Link
          key={category.id}
          href={localePath(locale, `/insights/category/${category.slug}`)}
          className={`rounded-full border px-4 py-2 text-sm font-black transition ${
            activeSlug === category.slug
              ? 'border-primary-600 bg-primary-600 text-white'
              : 'border-white/80 bg-white text-neutral-700 hover:border-primary-300 hover:text-primary-700'
          }`}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  )
}
