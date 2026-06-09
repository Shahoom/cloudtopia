import { SlidersHorizontal } from 'lucide-react'
import type { BlogCategory } from '@/lib/blog/data'

const contentTypesEn = [
  ['guide', 'Guides'],
  ['article', 'Articles'],
  ['case_study', 'Case Studies'],
  ['comparison', 'Comparisons'],
  ['checklist', 'Checklists'],
] as const

const contentTypesAr = [
  ['guide', 'أدلة'],
  ['article', 'مقالات'],
  ['case_study', 'دراسات الحالة'],
  ['comparison', 'مقارنات'],
  ['checklist', 'قوائم التحقق'],
] as const

const serviceFocusEn = [
  ['websites', 'Websites'],
  ['web_apps', 'Web Apps'],
  ['crm', 'CRM'],
  ['erp', 'ERP'],
  ['automation', 'Automation'],
  ['ai', 'AI'],
  ['business_systems', 'Business Systems'],
] as const

const serviceFocusAr = [
  ['websites', 'مواقع الويب'],
  ['web_apps', 'تطبيقات الويب'],
  ['crm', 'CRM'],
  ['erp', 'ERP'],
  ['automation', 'الأتمتة'],
  ['ai', 'الذكاء الاصطناعي'],
  ['business_systems', 'أنظمة الأعمال'],
] as const

const sortOptionsEn = [
  ['latest', 'Latest'],
  ['featured', 'Featured'],
  ['popular', 'Popular'],
  ['guides', 'Guides'],
] as const

const sortOptionsAr = [
  ['latest', 'الأحدث'],
  ['featured', 'المميزة'],
  ['popular', 'الأكثر شيوعاً'],
  ['guides', 'أدلة'],
] as const

export function BlogFilters({
  categories,
  action,
  search,
  category,
  contentType,
  service,
  sort,
  locale = 'en',
}: {
  categories: BlogCategory[]
  action: string
  search?: string
  category?: string
  contentType?: string
  service?: string
  sort?: string
  locale?: string
}) {
  const ar = locale === 'ar'
  const contentTypes = ar ? contentTypesAr : contentTypesEn
  const serviceFocus = ar ? serviceFocusAr : serviceFocusEn
  const sortOptions = ar ? sortOptionsAr : sortOptionsEn

  return (
    <form action={action} className="rounded-3xl border border-white/80 bg-white p-4 shadow-xl shadow-sky-950/8 md:p-5">
      <div className="mb-4 flex items-center gap-2 text-sm font-black uppercase tracking-normal text-primary-700">
        <SlidersHorizontal className="h-4 w-4" />
        {ar ? 'تصفية المقالات' : 'Refine insights'}
      </div>
      <div className="grid gap-3 md:grid-cols-[1.2fr_1fr_1fr_1fr_auto]">
        <label className="sr-only" htmlFor="insights-filter-search">
          {ar ? 'البحث في المقالات' : 'Search insights'}
        </label>
        <input
          id="insights-filter-search"
          name="q"
          defaultValue={search}
          placeholder={ar ? 'ابحث بالعنوان، المؤلف، الوسم...' : 'Search title, author, tag, service...'}
          className="h-12 rounded-2xl border border-neutral-200 px-4 text-sm font-bold outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/15"
        />
        <select
          name="category"
          defaultValue={category || ''}
          className="h-12 rounded-2xl border border-neutral-200 px-4 text-sm font-bold outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/15"
          aria-label={ar ? 'الفئة' : 'Category'}
        >
          <option value="">{ar ? 'جميع المواضيع' : 'All topics'}</option>
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
          aria-label={ar ? 'نوع المحتوى' : 'Content type'}
        >
          <option value="">{ar ? 'جميع الأشكال' : 'All formats'}</option>
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
          aria-label={ar ? 'التخصص' : 'Service focus'}
        >
          <option value="">{ar ? 'جميع الخدمات' : 'All services'}</option>
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
          aria-label={ar ? 'الترتيب' : 'Sort'}
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
        {ar ? 'تطبيق الفلاتر' : 'Apply filters'}
      </button>
    </form>
  )
}
