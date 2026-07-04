import Link from 'next/link'
import type { BlogCategory } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'
import { categoryAccent, categoryGlyph } from '@/components/blog/editorial/categoryColor'

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
      <h2 className="ed-eyebrow mb-4 border-b-2 border-[var(--ed-rule-ink)] pb-3">
        {locale === 'ar' ? 'الفئات' : 'Categories'}
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {visible.map((cat) => {
          const accent = categoryAccent(cat)
          const Glyph = categoryGlyph(cat)
          return (
            <Link
              key={cat.id}
              href={localePath(locale, `/articles/category/${cat.slug}`)}
              className="group relative flex min-h-[112px] flex-col justify-between overflow-hidden border border-[var(--ed-rule)] bg-[color:var(--ed-paper-2)] p-4 transition-colors hover:border-[color:var(--ed-accent)]"
            >
              <span aria-hidden="true" className="absolute inset-x-0 top-0 h-[3px]" style={{ background: accent }} />
              <Glyph
                className="pointer-events-none absolute -bottom-3 -end-2"
                size={64}
                style={{ color: accent, opacity: 0.1 }}
                aria-hidden="true"
              />
              <span className="ed-kicker" style={{ color: accent }}>
                {locale === 'ar' ? 'قسم' : 'Section'}
              </span>
              <span className="ed-serif relative z-10 text-[16px] leading-tight transition-colors group-hover:text-[color:var(--ed-accent-ink)]">
                {cat.name}
              </span>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
