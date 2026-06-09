import Link from 'next/link'
import { Search } from 'lucide-react'
import type { BlogCategory } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'

export function CategoryNavBar({
  categories,
  locale,
  activeCategorySlug,
  search,
}: {
  categories: BlogCategory[]
  locale: string
  activeCategorySlug?: string
  search?: string
}) {
  const navCategories = categories.filter((c) => c.showInNavigation).slice(0, 7)

  return (
    <div className="sticky top-[var(--header-height,72px)] z-30 border-b border-neutral-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center gap-0 px-4 sm:px-6 lg:px-8">
        <nav className="flex min-w-0 flex-1 items-center overflow-x-auto" aria-label={locale === 'ar' ? 'فئات المقالات' : 'Article categories'}>
          <Link
            href={localePath(locale, '/articles')}
            className={`shrink-0 border-b-2 px-4 py-3.5 text-sm font-bold transition whitespace-nowrap ${
              !activeCategorySlug
                ? 'border-primary-600 text-primary-700'
                : 'border-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
            }`}
          >
            {locale === 'ar' ? 'الكل' : 'All'}
          </Link>
          {navCategories.map((cat) => (
            <Link
              key={cat.id}
              href={localePath(locale, `/articles/category/${cat.slug}`)}
              className={`shrink-0 border-b-2 px-4 py-3.5 text-sm font-bold whitespace-nowrap transition ${
                activeCategorySlug === cat.slug
                  ? 'border-primary-600 text-primary-700'
                  : 'border-transparent text-neutral-600 hover:border-neutral-300 hover:text-neutral-900'
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </nav>
        <form
          action={localePath(locale, '/articles/search')}
          className="ms-4 flex shrink-0 items-center overflow-hidden rounded-lg border border-neutral-200 bg-white"
        >
          <input
            name="q"
            defaultValue={search}
            placeholder={locale === 'ar' ? 'ابحث في المقالات...' : 'Search articles…'}
            className="h-9 w-40 bg-transparent px-3 text-sm font-medium text-neutral-900 outline-none placeholder:text-neutral-400"
          />
          <button
            type="submit"
            className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary-600 text-white transition hover:bg-primary-700"
            aria-label={locale === 'ar' ? 'بحث' : 'Search'}
          >
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
