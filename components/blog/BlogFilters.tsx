import { SlidersHorizontal } from 'lucide-react'
import type { BlogCategory } from '@/lib/blog/data'

const contentTypes = [
  ['guide', 'Guides'],
  ['article', 'Articles'],
  ['case_study', 'Case Studies'],
  ['comparison', 'Comparisons'],
  ['checklist', 'Checklists'],
]

const serviceFocus = [
  ['websites', 'Websites'],
  ['web_apps', 'Web Apps'],
  ['crm', 'CRM'],
  ['erp', 'ERP'],
  ['automation', 'Automation'],
  ['ai', 'AI'],
  ['business_systems', 'Business Systems'],
]

const sortOptions = [
  ['latest', 'Latest'],
  ['featured', 'Featured'],
  ['popular', 'Popular'],
  ['guides', 'Guides'],
]

export function BlogFilters({
  categories,
  action,
  search,
  category,
  contentType,
  service,
  sort,
}: {
  categories: BlogCategory[]
  action: string
  search?: string
  category?: string
  contentType?: string
  service?: string
  sort?: string
}) {
  return (
    <form action={action} className="rounded-3xl border border-white/80 bg-white p-4 shadow-xl shadow-sky-950/8 md:p-5">
      <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-normal text-primary-700">
        <SlidersHorizontal className="h-4 w-4" />
        Refine insights
      </div>
      <div className="grid gap-3 md:grid-cols-[1.2fr_1fr_1fr_1fr_auto]">
        <label className="sr-only" htmlFor="insights-filter-search">
          Search insights
        </label>
        <input
          id="insights-filter-search"
          name="q"
          defaultValue={search}
          placeholder="Search title, author, tag, service..."
          className="h-12 rounded-2xl border border-neutral-200 px-4 text-sm font-bold outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/15"
        />
        <select
          name="category"
          defaultValue={category || ''}
          className="h-12 rounded-2xl border border-neutral-200 px-4 text-sm font-bold outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/15"
          aria-label="Category"
        >
          <option value="">All topics</option>
          {categories.map((item) => (
            <option key={item.id} value={item.slug}>
              {item.name}
            </option>
          ))}
        </select>
        <select
          name="contentType"
          defaultValue={contentType || ''}
          className="h-12 rounded-2xl border border-neutral-200 px-4 text-sm font-bold outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/15"
          aria-label="Content type"
        >
          <option value="">All formats</option>
          {contentTypes.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          name="service"
          defaultValue={service || ''}
          className="h-12 rounded-2xl border border-neutral-200 px-4 text-sm font-bold outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/15"
          aria-label="Service focus"
        >
          <option value="">All services</option>
          {serviceFocus.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
        <select
          name="sort"
          defaultValue={sort || 'latest'}
          className="h-12 rounded-2xl border border-neutral-200 px-4 text-sm font-bold outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/15"
          aria-label="Sort"
        >
          {sortOptions.map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="mt-3 inline-flex h-11 items-center rounded-xl bg-primary-600 px-5 text-sm font-black text-white transition hover:bg-primary-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary-500/25"
      >
        Apply filters
      </button>
    </form>
  )
}
