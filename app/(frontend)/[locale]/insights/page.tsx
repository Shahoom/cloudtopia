import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BlogCTA } from '@/components/blog/BlogCTA'
import { BlogFilters } from '@/components/blog/BlogFilters'
import { BlogGrid } from '@/components/blog/BlogGrid'
import { BlogPagination } from '@/components/blog/BlogPagination'
import { BusinessProblemSection } from '@/components/blog/BusinessProblemSection'
import { CaseStudyInsights } from '@/components/blog/CaseStudyInsights'
import { CategoryCard } from '@/components/blog/CategoryCard'
import { EditorsPicks } from '@/components/blog/EditorsPicks'
import { FeaturedBlogCard } from '@/components/blog/FeaturedBlogCard'
import { InsightsHero } from '@/components/blog/InsightsHero'
import { NewsletterBox } from '@/components/blog/NewsletterBox'
import { PopularGuides } from '@/components/blog/PopularGuides'
import { getBlogIndexData } from '@/lib/blog/data'
import { buildHreflangMap, canonicalUrl, localePath } from '@/lib/i18n/url'

type PageProps = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{ q?: string; page?: string; category?: string; contentType?: string; service?: string; sort?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale = 'en' } = await params
  const title = 'CloudTopia Insights'
  const description = 'Practical ideas, guides, and strategies for building better websites, smarter systems, and AI-powered digital growth.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl(locale, '/insights'),
      type: 'website',
      siteName: 'CloudTopia',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
    alternates: {
      canonical: canonicalUrl(locale, '/insights'),
      languages: buildHreflangMap('/insights'),
    },
  }
}

export default async function InsightsPage({ params, searchParams }: PageProps) {
  const { locale = 'en' } = await params
  const query = await searchParams
  const page = Number(query.page || 1)
  const search = typeof query.q === 'string' ? query.q : ''
  const data = await getBlogIndexData({
    locale,
    page,
    search,
    category: query.category,
    contentType: query.contentType,
    serviceFocus: query.service,
    sort: query.sort || 'latest',
  })
  const featured = data.featuredPosts.length > 0 ? data.featuredPosts : data.posts.slice(0, 4)
  const schemaDescription = 'Practical ideas, guides, and strategies for building better websites, smarter systems, and AI-powered digital growth.'

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'CloudTopia Insights',
    description: schemaDescription,
    url: canonicalUrl(locale, '/insights'),
    publisher: {
      '@type': 'Organization',
      name: 'CloudTopia',
      url: 'https://cloudtopia.net',
      logo: {
        '@type': 'ImageObject',
        url: 'https://cloudtopia.net/images/CloudTopia.svg',
      },
    },
  }

  return (
    <div className="min-h-screen bg-[#f4f1f8]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />

      <InsightsHero locale={locale} categories={data.categories} search={search} />

      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <BlogFilters
            categories={data.categories}
            action={localePath(locale, '/insights')}
            search={search}
            category={query.category}
            contentType={query.contentType}
            service={query.service}
            sort={query.sort}
          />
        </div>
      </section>

      {featured.length > 0 && (
        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-sm font-black uppercase tracking-normal text-primary-700">Featured insights</p>
                <h2 className="mt-2 text-3xl font-black tracking-normal text-neutral-950 md:text-5xl">What to read first</h2>
              </div>
              <Link
                href="#latest"
                className="inline-flex items-center gap-2 text-sm font-black text-primary-700 transition hover:text-primary-900"
              >
                Latest articles
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
            <div className="grid gap-6 lg:grid-cols-3">
              {featured.map((post, index) => (
                <FeaturedBlogCard key={post.id} post={post} locale={locale} large={index === 0} />
              ))}
            </div>
          </div>
        </section>
      )}

      <EditorsPicks posts={data.editorsPicks} locale={locale} />

      <section id="latest" className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <p className="text-sm font-black uppercase tracking-normal text-primary-700">Latest articles</p>
              <h2 className="mt-2 text-3xl font-black tracking-normal text-neutral-950 md:text-5xl">Guides for digital builders</h2>
            </div>
            <p className="max-w-md text-sm font-semibold leading-6 text-neutral-600">
              {data.pagination.total} published {data.pagination.total === 1 ? 'article' : 'articles'}
            </p>
          </div>
          <BlogGrid posts={data.latestPosts} locale={locale} />
          <BlogPagination
            basePath={localePath(locale, '/insights')}
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
      </section>

      {data.categories.length > 0 && (
        <section className="px-4 py-14 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8">
              <p className="text-sm font-black uppercase tracking-normal text-primary-700">Explore by topic</p>
              <h2 className="mt-2 text-3xl font-black tracking-normal text-neutral-950 md:text-5xl">Choose your next growth area</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {data.categories
                .filter((category) => category.showInNavigation)
                .map((category) => (
                  <CategoryCard key={category.id} category={category} locale={locale} />
                ))}
            </div>
          </div>
        </section>
      )}

      <PopularGuides posts={data.popularGuides} locale={locale} />
      <BusinessProblemSection locale={locale} />
      <CaseStudyInsights posts={data.caseStudies} locale={locale} />

      <section className="px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <NewsletterBox />
        </div>
      </section>

      <section className="px-4 pb-20 pt-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <BlogCTA
            locale={locale}
            title="Ready to build something smarter than a basic website?"
            text="CloudTopia helps businesses design websites, systems, dashboards, and AI-powered solutions that support real growth."
          />
        </div>
      </section>
    </div>
  )
}
