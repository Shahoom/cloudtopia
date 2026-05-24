import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogGrid } from '@/components/blog/BlogGrid'
import { BlogPagination } from '@/components/blog/BlogPagination'
import { BlogSearch } from '@/components/blog/BlogSearch'
import { Breadcrumbs } from '@/components/blog/Breadcrumbs'
import { getBlogIndexData, getBlogTags } from '@/lib/blog/data'
import { buildHreflangMap, canonicalUrl, localePath } from '@/lib/i18n/url'

type PageProps = {
  params: Promise<{ locale: string; slug: string }>
  searchParams: Promise<{ q?: string; page?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale = 'en', slug } = await params
  const tags = await getBlogTags(locale)
  const tag = tags.find((item) => item.slug === slug)
  if (!tag) return { title: 'Tag Not Found' }

  const title = `${tag.name} Insights`
  const description = `CloudTopia articles tagged with ${tag.name}.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl(locale, `/insights/tag/${tag.slug}`),
      type: 'website',
    },
    alternates: {
      canonical: canonicalUrl(locale, `/insights/tag/${tag.slug}`),
      languages: buildHreflangMap(`/insights/tag/${tag.slug}`),
    },
  }
}

export default async function InsightTagPage({ params, searchParams }: PageProps) {
  const { locale = 'en', slug } = await params
  const query = await searchParams
  const tags = await getBlogTags(locale)
  const tag = tags.find((item) => item.slug === slug)
  if (!tag) notFound()

  const search = typeof query.q === 'string' ? query.q : ''
  const page = Number(query.page || 1)
  const data = await getBlogIndexData({ locale, page, search, tag: slug })

  return (
    <div className="min-h-screen bg-[#f4f1f8] px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs locale={locale} items={[{ label: tag.name }]} />
        <header className="mb-10 rounded-3xl border border-white/80 bg-white p-8 shadow-xl shadow-sky-950/10 md:p-10">
          <p className="text-sm font-black uppercase tracking-normal text-primary-700">Tag</p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-normal text-neutral-950 md:text-6xl">{tag.name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
            {tag.postCount} published {tag.postCount === 1 ? 'article' : 'articles'} tagged with {tag.name}.
          </p>
          <div className="mt-8">
            <BlogSearch action={localePath(locale, `/insights/tag/${tag.slug}`)} defaultValue={search} label={`Search ${tag.name} insights`} />
          </div>
        </header>
        <BlogGrid
          posts={data.latestPosts}
          locale={locale}
          emptyTitle={`No ${tag.name} insights yet`}
          emptyText="Published articles for this tag will appear here."
        />
        <BlogPagination
          basePath={localePath(locale, `/insights/tag/${tag.slug}`)}
          page={data.pagination.page}
          totalPages={data.pagination.totalPages}
          params={{ q: search || undefined }}
        />
      </div>
    </div>
  )
}
