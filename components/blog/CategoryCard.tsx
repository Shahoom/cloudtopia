import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { BlogCategory } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'

export function CategoryCard({ category, locale }: { category: BlogCategory; locale: string }) {
  return (
    <Link
      href={localePath(locale, `/insights/category/${category.slug}`)}
      className="group rounded-3xl border border-sky-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-500 hover:shadow-xl hover:shadow-sky-950/10"
    >
      <span
        className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl text-sm font-black uppercase text-white"
        style={{ backgroundColor: category.color || '#0284c7' }}
      >
        {category.name.slice(0, 2)}
      </span>
      <span className="flex items-start justify-between gap-4">
        <span>
          <h3 className="text-xl font-black tracking-normal text-neutral-950">{category.name}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-neutral-600">
            {category.shortDescription || category.description}
          </p>
        </span>
        <ArrowUpRight className="mt-1 h-5 w-5 shrink-0 text-neutral-400 transition group-hover:text-primary-700" />
      </span>
      <span className="mt-5 inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-black text-primary-700">
        {category.postCount} {category.postCount === 1 ? 'post' : 'posts'}
      </span>
    </Link>
  )
}
