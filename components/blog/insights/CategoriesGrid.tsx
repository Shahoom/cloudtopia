import Link from 'next/link'
import type { BlogCategory } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'

const FALLBACK_COLORS = [
  ['#0ea5e9', '#0369a1'],
  ['#6366f1', '#4338ca'],
  ['#10b981', '#047857'],
  ['#f59e0b', '#b45309'],
  ['#ec4899', '#be185d'],
]

function getCategoryGradient(index: number, color?: string) {
  const pair = FALLBACK_COLORS[index % FALLBACK_COLORS.length]
  if (color && color.startsWith('#')) {
    return `linear-gradient(135deg, ${color}dd, ${color}88)`
  }
  return `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`
}

export function CategoriesGrid({
  categories,
  locale,
}: {
  categories: BlogCategory[]
  locale: string
}) {
  const visible = categories.filter((c) => c.showInNavigation).slice(0, 5)
  if (visible.length === 0) return null

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <h2 className="mb-6 font-heading text-[32px] italic text-primary-600">{locale === 'ar' ? 'الفئات' : 'Categories'}</h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {visible.map((cat, index) => (
          <Link
            key={cat.id}
            href={localePath(locale, `/articles/category/${cat.slug}`)}
            className="group flex flex-col overflow-hidden rounded-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              className="flex h-[140px] w-full items-center justify-center"
              style={{ background: getCategoryGradient(index, cat.color) }}
            >
              <span className="text-5xl font-black text-white/30 select-none">
                {cat.name.slice(0, 1)}
              </span>
            </div>
            <div className="bg-white px-3 py-3 text-center">
              <span className="text-[15px] font-semibold text-neutral-800 transition-colors group-hover:text-primary-700">
                {cat.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
