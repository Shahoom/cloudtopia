import { Search } from 'lucide-react'

export function BlogSearch({
  action,
  defaultValue = '',
  category,
  tag,
  label,
  locale = 'en',
}: {
  action: string
  defaultValue?: string
  category?: string
  tag?: string
  label?: string
  locale?: string
}) {
  const searchLabel = label || (locale === 'ar' ? 'البحث في المقالات' : 'Search articles')
  const placeholderText = locale === 'ar' ? 'ابحث عن المواقع، الذكاء الاصطناعي، الأتمتة...' : 'Search websites, AI, CRM, automation...'
  const buttonText = locale === 'ar' ? 'بحث' : 'Search'

  return (
    <form action={action} className="relative mx-auto w-full max-w-3xl">
      <label htmlFor="insights-search" className="sr-only">
        {searchLabel}
      </label>
      {category && <input type="hidden" name="category" value={category} />}
      {tag && <input type="hidden" name="tag" value={tag} />}
      <Search className="pointer-events-none absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-neutral-400" />
      <input
        id="insights-search"
        name="q"
        type="search"
        defaultValue={defaultValue}
        placeholder={placeholderText}
        className="h-16 w-full rounded-2xl border border-white/80 bg-white pl-14 pr-32 text-base font-semibold text-neutral-900 shadow-xl shadow-sky-950/10 outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/15"
      />
      <button
        type="submit"
        className="absolute right-2 top-2 inline-flex h-12 items-center justify-center rounded-xl bg-neutral-950 px-5 text-sm font-black text-white transition hover:bg-primary-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600"
      >
        {buttonText}
      </button>
    </form>
  )
}
