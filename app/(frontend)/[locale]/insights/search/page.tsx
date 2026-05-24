import type { Metadata } from 'next'
import { BlogFilters } from '@/components/blog/BlogFilters'
import { BlogGrid } from '@/components/blog/BlogGrid'
import { BlogPagination } from '@/components/blog/BlogPagination'
import { Breadcrumbs } from '@/components/blog/Breadcrumbs'
import { NewsletterBox } from '@/components/blog/NewsletterBox'
import { getBlogIndexData } from '@/lib/blog/data'
import { canonicalUrl, localePath } from '@/lib/i18n/url'

type PageProps = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ q?: string; page?: string; category?: string; contentType?: string; service?: string; sort?: string }>
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
  const { locale = 'en' } = await params
  const query = await searchParams
  const q = typeof query.q === 'string' ? query.q : ''
  const title = q ? `Search results for ${q}` : 'Search CloudTopia Insights'
  const description = 'Search CloudTopia articles about websites, systems, dashboards, CRM, AI, automation, and digital growth.'

  return {
    title,
    description,
    robots: { index: false, follow: true },
    alternates: {
      canonical: canonicalUrl(locale, '/insights/search'),
    },
  }
}

export default async function InsightSearchPage({ params, searchParams }: PageProps) {
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

  return (
    <div className="min-h-screen bg-[#f4f1f8] px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs locale={locale} items={[{ label: 'Search' }]} />
        <header className="mb-8 rounded-3xl border border-white/80 bg-white p-8 shadow-xl shadow-sky-950/10 md:p-10">
          <p className="text-sm font-black uppercase tracking-normal text-primary-700">Search insights</p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-normal text-neutral-950 md:text-6xl">
            {search ? `Results for "${search}"` : 'Search CloudTopia Insights'}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
            Find practical guidance across websites, business systems, dashboards, AI, automation, CRM, ERP, and cloud technology.
          </p>
        </header>
        <BlogFilters
          categories={data.categories}
          action={localePath(locale, '/insights/search')}
          search={search}
          category={query.category}
          contentType={query.contentType}
          service={query.service}
          sort={query.sort}
        />
        <div className="mt-10">
          <BlogGrid
            posts={data.latestPosts}
            locale={locale}
            emptyTitle="No articles found"
            emptyText="Try a different keyword, topic, content type, or service focus."
          />
          <BlogPagination
            basePath={localePath(locale, '/insights/search')}
            page={data.pagination.page}
            totalPages={data.pagination.totalPages}
            params={{
              q: search || undefined,
              category: query.category,
              contentType: query.contentType,
              service: query.service,
              sort: query.sort,
            }}
          />
        </div>
        <div className="mt-16">
          <NewsletterBox />
        </div>
      </div>
    </div>
  )
}
