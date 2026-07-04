import Link from 'next/link'
import type { BlogCategory } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'
import { categoryAccent } from '@/components/blog/editorial/categoryColor'

export function SidebarCategoryTags({
  categories,
  locale,
  activeCategorySlug,
}: {
  categories: BlogCategory[]
  locale: string
  activeCategorySlug?: string
}) {
  const visible = categories.filter((c) => c.showInNavigation)

  return (
    <aside className="sticky top-[100px] border-t-2 border-[var(--ed-rule-ink)] pt-4">
      <h2 className="ed-eyebrow mb-1">{locale === 'ar' ? 'الفئات' : 'Categories'}</h2>
      <ul>
        {visible.map((cat) => {
          const isActive = activeCategorySlug === cat.slug
          const accent = categoryAccent(cat)
          return (
            <li key={cat.id} className="border-b border-[var(--ed-rule)]">
              <Link
                href={localePath(locale, `/articles/category/${cat.slug}`)}
                className="group flex items-center gap-2.5 py-2.5 transition-colors"
              >
                <span
                  aria-hidden="true"
                  className="h-3.5 w-0.5 shrink-0"
                  style={{ background: accent }}
                />
                <span
                  className="ed-serif text-[15px] transition-colors group-hover:text-[color:var(--ed-accent-ink)]"
                  style={isActive ? { color: 'var(--ed-accent-ink)' } : undefined}
                >
                  {cat.name}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
