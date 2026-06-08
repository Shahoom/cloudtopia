import { ArrowRight, BarChart3, Bot, Cloud, Code2, Search, Sparkles } from 'lucide-react'
import Link from 'next/link'
import type { BlogCategory } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'
import { CategoryChips } from './CategoryChips'
import { AuroraBackground } from '@/components/ui/aurora-background'

const focusCards = [
  { label: 'Web Development', icon: Code2 },
  { label: 'Business Systems', icon: BarChart3 },
  { label: 'AI Automation', icon: Bot },
  { label: 'Digital Growth', icon: Cloud },
]

export function InsightsHero({
  locale,
  categories,
  search,
}: {
  locale: string
  categories: BlogCategory[]
  search?: string
}) {
  return (
    <AuroraBackground className="!h-auto !min-h-0 !bg-[#f4f1f8] py-16 px-4 sm:px-6 lg:px-8 w-full relative overflow-hidden" data-header-theme="light">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(2,132,199,0.09)_1px,transparent_1px),linear-gradient(90deg,rgba(2,132,199,0.09)_1px,transparent_1px)] bg-[size:44px_44px] opacity-30" />
      <div className="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-white/85 to-transparent" />
      <div className="absolute -right-16 top-24 h-56 w-56 rounded-full bg-sky-200/40 blur-3xl" />
      <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-cyan-100/70 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl min-w-0 gap-10 lg:grid-cols-[minmax(0,1.04fr)_minmax(420px,0.96fr)] lg:items-center z-10 w-full">
        <div className="min-w-0">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-sky-100 bg-white/90 px-4 py-2 text-sm font-black text-primary-700 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4" />
            {locale === 'ar' ? 'المقالات والمدونة' : 'CloudTopia Articles'}
          </span>
          <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-normal text-neutral-950 sm:text-5xl md:text-7xl">
            {locale === 'ar' ? (
              <>
                أفكار، أدلة ومقالات من <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">كلاود توبيا</span>
              </>
            ) : (
              <>
                Thoughts, guides & articles from <span className="bg-gradient-to-r from-sky-600 to-indigo-600 bg-clip-text text-transparent">CloudTopia</span>
              </>
            )}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-600 md:text-xl font-medium">
            {locale === 'ar' 
              ? 'أفكار عملية، أدلة، واستراتيجيات لبناء مواقع أفضل، أنظمة أذكى، ونمو رقمي مدعوم بالذكاء الاصطناعي.'
              : 'Practical ideas, guides, and strategies for building better websites, smarter systems, and AI-powered digital growth.'}
          </p>
          <form action={localePath(locale, '/articles/search')} className="mt-9 max-w-2xl">
            <label className="sr-only" htmlFor="insights-hero-search">
              {locale === 'ar' ? 'البحث في المقالات' : 'Search Articles'}
            </label>
            <div className="flex min-h-16 min-w-0 flex-col gap-3 rounded-2xl border border-white/80 bg-white/90 p-2 shadow-2xl shadow-sky-950/12 sm:flex-row sm:items-center backdrop-blur-md focus-within:border-sky-300 transition-all">
              <Search className="ml-3 mt-2 h-5 w-5 flex-none text-primary-700 sm:mt-0" />
              <input
                id="insights-hero-search"
                name="q"
                defaultValue={search}
                placeholder={locale === 'ar' ? 'ابحث عن المواقع، إدارة العملاء، لوحات القيادة، أتمتة الذكاء الاصطناعي...' : 'Search websites, CRM, dashboards, AI automation...'}
                className="min-w-0 flex-1 bg-transparent px-3 text-base font-bold text-neutral-900 outline-none placeholder:text-neutral-400 sm:px-0"
              />
              <button className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary-600 px-5 text-sm font-black text-white transition hover:bg-primary-700 sm:w-auto">
                {locale === 'ar' ? 'بحث' : 'Search'}
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </form>
          <div className="mt-8">
            <CategoryChips categories={categories.filter((category) => category.showInNavigation).slice(0, 10)} locale={locale} />
          </div>
          <div className="mt-8 grid max-w-3xl min-w-0 grid-cols-1 gap-3 min-[360px]:grid-cols-2 sm:grid-cols-4">
            {focusCards.map(({ label, icon: Icon }) => (
              <div key={label} className="min-w-0 rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm backdrop-blur transition-all duration-300 hover:shadow-md hover:border-sky-300 hover:-translate-y-0.5">
                <Icon className="mb-3 h-5 w-5 text-primary-700" />
                <p className="text-sm font-black leading-5 text-neutral-900">
                  {locale === 'ar' 
                    ? (label === 'Web Development' ? 'تطوير الويب' : 
                       label === 'Business Systems' ? 'أنظمة الأعمال' :
                       label === 'AI Automation' ? 'أتمتة الذكاء الاصطناعي' :
                       label === 'Digital Growth' ? 'النمو الرقمي' : label)
                    : label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative min-h-[480px] min-w-0 overflow-hidden">
          <div className="absolute inset-0 rounded-[2rem] border border-white/80 bg-white/70 shadow-2xl shadow-sky-950/12 backdrop-blur" />
          <div className="absolute left-8 right-8 top-8 rounded-3xl border border-sky-100 bg-white p-5 shadow-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-black uppercase tracking-normal text-primary-700">
                  {locale === 'ar' ? 'نظام التحرير' : 'Editorial system'}
                </p>
                <h2 className="mt-2 text-2xl font-black tracking-normal text-neutral-950">
                  {locale === 'ar' ? 'نشر أذكى للنمو الرقمي' : 'Smarter publishing for digital growth'}
                </h2>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">
                {locale === 'ar' ? 'مباشر' : 'Live'}
              </span>
            </div>
            <div className="mt-6 grid gap-3">
              {(locale === 'ar' 
                ? ['هياكل مدعومة بالذكاء الاصطناعي', 'مقالات جاهزة للسيو', 'كتل محتوى مخصصة', 'دعوات اتخاذ إجراء تركز على العملاء']
                : ['AI-assisted outlines', 'SEO-ready article schema', 'Custom content blocks', 'Lead-focused CTAs']
              ).map((item, index) => (
                <div key={item} className="flex items-center gap-3 rounded-2xl bg-[#f4f1f8] p-3 transition-all duration-300 hover:bg-sky-50">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary-600 text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <span className="text-sm font-black text-neutral-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-10 left-5 right-16 rounded-3xl border border-white/90 bg-neutral-950 p-5 text-white shadow-2xl transition-all duration-300 hover:shadow-sky-500/10">
            <p className="text-xs font-black uppercase tracking-normal text-sky-200">
              {locale === 'ar' ? 'رحلة القارئ' : 'Reader journey'}
            </p>
            <div className="mt-4 grid grid-cols-3 gap-3">
              {(locale === 'ar' ? ['اكتشف', 'تعلم', 'ابدأ مشروعك'] : ['Discover', 'Learn', 'Start project']).map((item) => (
                <div key={item} className="rounded-2xl bg-white/10 p-3">
                  <p className="text-sm font-black">{item}</p>
                  <div className="mt-3 h-1.5 rounded-full bg-sky-300/70" />
                </div>
              ))}
            </div>
          </div>
          <Link
            href={localePath(locale, '/contact')}
            className="absolute bottom-4 right-5 inline-flex h-14 items-center rounded-2xl bg-primary-600 px-5 text-sm font-black text-white shadow-xl shadow-sky-700/25 transition hover:-translate-y-0.5 hover:bg-primary-700"
          >
            {locale === 'ar' ? 'ابدأ مشروعك' : 'Start Your Project'}
          </Link>
        </div>
      </div>
    </AuroraBackground>
  )
}
