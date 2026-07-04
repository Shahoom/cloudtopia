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

  const linkClass = (active: boolean) =>
    `ed-eyebrow shrink-0 whitespace-nowrap py-3.5 transition-colors ${
      active ? 'text-[color:var(--ed-accent)]' : 'hover:text-[color:var(--ed-ink)]'
    }`

  return (
    <div className="sticky top-[var(--header-height,72px)] z-30 border-y border-[var(--ed-rule)] bg-[color:var(--ed-paper)]/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <nav
          className="flex min-w-0 flex-1 items-center gap-4 overflow-x-auto sm:gap-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label={locale === 'ar' ? 'فئات المقالات' : 'Article categories'}
        >
          <Link href={localePath(locale, '/articles')} className={linkClass(!activeCategorySlug)}>
            {locale === 'ar' ? 'الكل' : 'All'}
          </Link>
          {navCategories.map((cat) => (
            <span key={cat.id} className="flex shrink-0 items-center gap-5">
              <span aria-hidden="true" className="h-3 w-px bg-[var(--ed-rule)]" />
              <Link
                href={localePath(locale, `/articles/category/${cat.slug}`)}
                className={linkClass(activeCategorySlug === cat.slug)}
              >
                {cat.name}
              </Link>
            </span>
          ))}
        </nav>
        <form
          action={localePath(locale, '/articles/search')}
          className="ms-3 flex shrink-0 items-center overflow-hidden border border-[var(--ed-rule)] bg-transparent transition-colors focus-within:border-[var(--ed-accent)] sm:ms-4"
        >
          <input
            name="q"
            defaultValue={search}
            placeholder={locale === 'ar' ? 'ابحث في المقالات...' : 'Search articles…'}
            className="h-9 w-24 bg-transparent px-3 text-sm text-[color:var(--ed-ink)] outline-none placeholder:text-[color:var(--ed-muted)] sm:w-40"
          />
          <button
            type="submit"
            className="flex h-9 w-9 shrink-0 items-center justify-center text-[color:var(--ed-graphite)] transition-colors hover:text-[color:var(--ed-accent)]"
            aria-label={locale === 'ar' ? 'بحث' : 'Search'}
          >
            <Search className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  )
}
