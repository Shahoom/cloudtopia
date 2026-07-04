import type { Metadata } from 'next'
import { Search } from 'lucide-react'
import { BlogPagination } from '@/components/blog/BlogPagination'
import { Breadcrumbs } from '@/components/blog/Breadcrumbs'
import { NewsletterBox } from '@/components/blog/NewsletterBox'
import { SectionMasthead } from '@/components/blog/editorial/SectionMasthead'
import { InsightsArticleCard } from '@/components/blog/insights/InsightsArticleCard'
import { getBlogIndexData } from '@/lib/blog/data'
import { canonicalUrl, localePath } from '@/lib/i18n/url'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/seo/schema'

const CONTENT_TYPES_EN = [
  ['guide', 'Guides'],
  ['article', 'Articles'],
  ['case_study', 'Case Studies'],
  ['comparison', 'Comparisons'],
  ['checklist', 'Checklists'],
] as const
const CONTENT_TYPES_AR = [
  ['guide', 'أدلة'],
  ['article', 'مقالات'],
  ['case_study', 'دراسات الحالة'],
  ['comparison', 'مقارنات'],
  ['checklist', 'قوائم التحقق'],
] as const
const SERVICE_FOCUS_EN = [
  ['websites', 'Websites'],
  ['web_apps', 'Web Apps'],
  ['crm', 'CRM'],
  ['erp', 'ERP'],
  ['automation', 'Automation'],
  ['ai', 'AI'],
  ['business_systems', 'Business Systems'],
] as const
const SERVICE_FOCUS_AR = [
  ['websites', 'مواقع الويب'],
  ['web_apps', 'تطبيقات الويب'],
  ['crm', 'CRM'],
  ['erp', 'ERP'],
  ['automation', 'الأتمتة'],
  ['ai', 'الذكاء الاصطناعي'],
  ['business_systems', 'أنظمة الأعمال'],
] as const
const SORT_OPTIONS_EN = [
  ['latest', 'Latest'],
  ['featured', 'Featured'],
  ['popular', 'Popular'],
  ['guides', 'Guides'],
] as const
const SORT_OPTIONS_AR = [
  ['latest', 'الأحدث'],
  ['featured', 'المميزة'],
  ['popular', 'الأكثر شيوعاً'],
  ['guides', 'أدلة'],
] as const

type PageProps = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ q?: string; page?: string; category?: string; contentType?: string; service?: string; sort?: string }>
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { locale = 'en' } = await params
  const query = await searchParams
  const q = typeof query.q === 'string' ? query.q : ''
  const title = q 
    ? (locale === 'ar' ? `نتائج البحث عن ${q}` : `Search results for ${q}`)
    : (locale === 'ar' ? 'بحث المقالات | CloudTopia' : 'Search CloudTopia Articles')
  const description = locale === 'ar'
    ? 'ابحث في مقالات CloudTopia حول مواقع الويب والأنظمة ولوحات المعلومات وإدارة علاقات العملاء والذكاء الاصطناعي والأتمتة والنمو الرقمي.'
    : 'Search CloudTopia articles about websites, systems, dashboards, CRM, AI, automation, and digital growth.'

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: canonicalUrl(locale, '/articles/search'),
    },
  }
}

export default async function ArticleSearchPage({ params, searchParams }: PageProps) {
  const { locale = 'en' } = await params
  const query = await searchParams
  const search = typeof query.q === 'string' ? query.q : ''
  const page = Number(query.page || 1)
  const data = await getBlogIndexData({
    locale,
    page,
    search,
    category: query.category,
    contentType: query.contentType,
    serviceFocus: query.service,
    sort: query.sort || 'latest',
  })

  // SD-7: SearchResultsPage + BreadcrumbList (the page itself stays noindex).
  const searchUrl = canonicalUrl(locale, '/articles/search')
  const searchSchema = {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    '@id': `${searchUrl}#searchresultspage`,
    name: search
      ? locale === 'ar'
        ? `نتائج البحث عن "${search}"`
        : `Results for "${search}"`
      : locale === 'ar'
        ? 'البحث في مقالات CloudTopia'
        : 'Search CloudTopia Articles',
    url: searchUrl,
    inLanguage: locale === 'ar' ? 'ar-SA' : 'en-US',
    isPartOf: { '@type': 'Blog', '@id': `${canonicalUrl(locale, '/articles')}#blog` },
  }
  const breadcrumbSchema = buildBreadcrumbSchema(locale, [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', path: '/' },
    { name: locale === 'ar' ? 'المقالات' : 'Articles', path: '/articles' },
    { name: locale === 'ar' ? 'البحث' : 'Search', path: '/articles/search' },
  ])

  const ar = locale === 'ar'
  const contentTypes = ar ? CONTENT_TYPES_AR : CONTENT_TYPES_EN
  const serviceFocus = ar ? SERVICE_FOCUS_AR : SERVICE_FOCUS_EN
  const sortOptions = ar ? SORT_OPTIONS_AR : SORT_OPTIONS_EN
  const count = data.latestPosts.length
  const resultsMeta = search
    ? ar
      ? `${count} ${count === 1 ? 'نتيجة' : 'نتائج'} عن "${search}"`
      : `${count} ${count === 1 ? 'result' : 'results'} for "${search}"`
    : ar
      ? `${count} ${count === 1 ? 'مقالة' : 'مقالات'}`
      : `${count} ${count === 1 ? 'article' : 'articles'}`
  const selectClass =
    'h-11 border-0 border-b border-[var(--ed-rule)] bg-transparent text-sm text-[var(--ed-ink)] outline-none transition-colors focus:border-[var(--ed-accent)]'

  return (
    <div className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <JsonLd schema={[searchSchema, breadcrumbSchema]} />
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs locale={locale} items={[{ label: ar ? 'البحث' : 'Search' }]} />
        <SectionMasthead
          className="mt-6 mb-8"
          eyebrow={ar ? 'البحث' : 'Search'}
          title={
            search
              ? ar ? `نتائج البحث عن "${search}"` : `Results for "${search}"`
              : ar ? 'البحث في مقالات CloudTopia' : 'Search CloudTopia Articles'
          }
          description={
            ar
              ? 'اعثر على إرشادات عملية في مجالات مواقع الويب، وأنظمة الأعمال، ولوحات البيانات، والذكاء الاصطناعي، والأتمتة، وإدارة علاقات العملاء، وتكنولوجيا السحابة.'
              : 'Find practical guidance across websites, business systems, dashboards, AI, automation, CRM, ERP, and cloud technology.'
          }
          metaLabel={resultsMeta}
        />

        <form action={localePath(locale, '/articles/search')} className="mb-4">
          <div className="relative">
            <label htmlFor="insights-filter-search" className="sr-only">
              {ar ? 'البحث في المقالات' : 'Search insights'}
            </label>
            <Search className="pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--ed-muted)] ltr:left-1 rtl:right-1" />
            <input
              id="insights-filter-search"
              name="q"
              type="search"
              defaultValue={search}
              placeholder={ar ? 'ابحث بالعنوان، المؤلف، الوسم...' : 'Search title, author, tag, service...'}
              className="ed-serif h-14 w-full border-0 border-b-2 border-[var(--ed-rule-ink)] bg-transparent text-xl text-[var(--ed-ink)] outline-none transition-colors placeholder:font-normal placeholder:text-[var(--ed-muted)] focus:border-[var(--ed-accent)] ltr:pl-9 rtl:pr-9"
            />
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-[1fr_1fr_1fr_auto] md:items-end">
            <select name="category" defaultValue={query.category || ''} className={selectClass} aria-label={ar ? 'الفئة' : 'Category'}>
              <option value="">{ar ? 'جميع المواضيع' : 'All topics'}</option>
              {data.categories.map((item) => (
                <option key={item.id} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
            <select name="contentType" defaultValue={query.contentType || ''} className={selectClass} aria-label={ar ? 'نوع المحتوى' : 'Content type'}>
              <option value="">{ar ? 'جميع الأشكال' : 'All formats'}</option>
              {contentTypes.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <select name="service" defaultValue={query.service || ''} className={selectClass} aria-label={ar ? 'التخصص' : 'Service focus'}>
              <option value="">{ar ? 'جميع الخدمات' : 'All services'}</option>
              {serviceFocus.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            <button
              type="submit"
              className="ed-eyebrow inline-flex h-11 items-center px-6 text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{ background: 'var(--ed-accent)', letterSpacing: '0.12em' }}
            >
              {ar ? 'تطبيق الفلاتر' : 'Apply filters'}
            </button>
          </div>
          <div className="mt-4">
            <select name="sort" defaultValue={query.sort || 'latest'} className={`${selectClass} w-full md:w-48`} aria-label={ar ? 'الترتيب' : 'Sort'}>
              {sortOptions.map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </form>

        <div className="mt-10">
          {data.latestPosts.length === 0 ? (
            <div className="border-t border-[var(--ed-rule)] py-16 text-center">
              <h2 className="ed-serif" style={{ fontSize: '1.5rem' }}>
                {ar ? 'لم يتم العثور على مقالات' : 'No articles found'}
              </h2>
              <p className="mx-auto mt-3 max-w-xl" style={{ fontFamily: 'var(--ed-sans)', color: 'var(--ed-graphite)', lineHeight: 1.6 }}>
                {ar ? 'جرب كلمة رئيسية أو موضوعًا أو نوع محتوى أو تركيز خدمة آخر.' : 'Try a different keyword, topic, content type, or service focus.'}
              </p>
            </div>
          ) : (
            <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
              {data.latestPosts.map((post) => (
                <div key={post.id} className="ed-card-enter">
                  <InsightsArticleCard post={post} locale={locale} />
                </div>
              ))}
            </div>
          )}
          <BlogPagination
            basePath={localePath(locale, '/articles/search')}
            page={data.pagination.page}
            totalPages={data.pagination.totalPages}
            params={{
              q: search || undefined,
              category: query.category,
              contentType: query.contentType,
              service: query.service,
              sort: query.sort,
            }}
            locale={locale}
          />
        </div>
        <div className="mt-16">
          <NewsletterBox locale={locale} />
        </div>
      </div>
    </div>
  )
}
