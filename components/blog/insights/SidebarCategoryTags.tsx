import Link from 'next/link'
import type { BlogCategory } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'

export function SidebarCategoryTags({
  categories,
  locale,
  activeCategorySlug,
}: {
  categories: BlogCategory[]
  locale: string
  activeCategorySlug?: string
}) {
  return (
    <aside className="sticky top-[100px] rounded-xl border border-neutral-200 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-[18px] font-bold text-neutral-900">{locale === 'ar' ? 'الفئات' : 'Categories'}</h2>
      <div className="flex flex-wrap gap-2">
        {categories
          .filter((c) => c.showInNavigation)
          .map((cat) => {
            const isActive = activeCategorySlug === cat.slug
            const color = cat.color || '#0284c7'
            return (
              <Link
                key={cat.id}
                href={localePath(locale, `/articles/category/${cat.slug}`)}
                className="rounded-full border px-3.5 py-1.5 text-[13px] font-semibold transition-all duration-200"
                style={
                  isActive
                    ? { backgroundColor: color, borderColor: color, color: '#fff' }
                    : { borderColor: color, color: color }
                }
              >
                {cat.name}
              </Link>
            )
          })}
      </div>
    </aside>
  )
}
