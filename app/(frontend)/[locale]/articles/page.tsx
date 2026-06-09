import './insights.css'
import type { Metadata } from 'next'
import { AnnouncementStrip } from '@/components/blog/insights/AnnouncementStrip'
import { CategoryNavBar } from '@/components/blog/insights/CategoryNavBar'
import { CategoriesGrid } from '@/components/blog/insights/CategoriesGrid'
import { CTABanner } from '@/components/blog/insights/CTABanner'
import { HeroFeaturedSection } from '@/components/blog/insights/HeroFeaturedSection'
import { InsightsArticleCard } from '@/components/blog/insights/InsightsArticleCard'
import { LoadMoreButton } from '@/components/blog/insights/LoadMoreButton'
import { SidebarCategoryTags } from '@/components/blog/insights/SidebarCategoryTags'
import { BlogCTA } from '@/components/blog/BlogCTA'
import { getBlogIndexData } from '@/lib/blog/data'
import { getCMSMetadata } from '@/lib/cms/metadata'
import { canonicalUrl, localePath } from '@/lib/i18n/url'

type PageProps = {
  params: Promise<{ locale: string }>
  searchParams: Promise<{
    q?: string
    page?: string
    category?: string
    contentType?: string
    service?: string
    sort?: string
  }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale = 'en' } = await params
  return getCMSMetadata(locale, '/articles', 'articles')
}

export default async function ArticlesPage({ params, searchParams }: PageProps) {
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

  const featuredPost = data.featuredPosts[0] || data.posts[0]
  const sidebarPosts = data.featuredPosts.length > 1
    ? data.featuredPosts.slice(1, 4)
    : data.posts.slice(1, 4)
  const gridPosts = data.latestPosts

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: locale === 'ar' ? 'مقالات كلاود توبيا' : 'CloudTopia Articles',
    description: 'Practical cloud computing guides, infrastructure insights, and DevOps strategies.',
    url: canonicalUrl(locale, '/articles'),
    publisher: {
      '@type': 'Organization',
      name: 'CloudTopia',
      url: 'https://cloudtopia.net',
      logo: { '@type': 'ImageObject', url: 'https://cloudtopia.net/images/CloudTopia.svg' },
    },
  }

  return (
    <div className="min-h-screen bg-[#f4f1f8]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />

      <AnnouncementStrip locale={locale} />

      <div className="bg-white">
        <CategoryNavBar
          categories={data.categories}
          locale={locale}
          activeCategorySlug={query.category}
          search={search}
        />
      </div>

      {featuredPost && (
        <HeroFeaturedSection
          featuredPost={featuredPost}
          sidebarPosts={sidebarPosts}
          locale={locale}
        />
      )}

      {data.categories.length > 0 && (
        <div className="bg-white py-2">
          <CategoriesGrid categories={data.categories} locale={locale} />
        </div>
      )}

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <div>
            <h2 className="mb-6 text-2xl font-black text-neutral-950">
              {search ? `Results for "${search}"` : locale === 'ar' ? 'أحدث المقالات' : 'Latest Articles'}
            </h2>
            {gridPosts.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-sky-200 bg-white/70 p-10 text-center">
                <p className="text-base font-bold text-neutral-600">
                  {locale === 'ar' ? 'لا توجد مقالات. جرب مرشح مختلف.' : 'No articles found. Try a different filter.'}
                </p>
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2">
                {gridPosts.map((post) => (
                  <InsightsArticleCard key={post.id} post={post} locale={locale} />
                ))}
              </div>
            )}
            <LoadMoreButton
              locale={locale}
              currentPage={data.pagination.page}
              totalPages={data.pagination.totalPages}
              href={localePath(
                locale,
                `/articles?page=${data.pagination.page + 1}${query.category ? `&category=${query.category}` : ''}${search ? `&q=${search}` : ''}`,
              )}
            />
          </div>
          <SidebarCategoryTags
            categories={data.categories}
            locale={locale}
            activeCategorySlug={query.category}
          />
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <CTABanner locale={locale} />
      </div>

      <section className="mx-auto max-w-7xl px-4 py-10 pb-20 sm:px-6 lg:px-8">
        <BlogCTA
          locale={locale}
          title={locale === 'ar' ? 'هل أنت مستعد لبناء شيء أذكى؟' : 'Ready to build something smarter than a basic website?'}
          text={locale === 'ar'
            ? 'كلاود توبيا تساعد الشركات على تصميم وبناء الحلول الرقمية.'
            : 'CloudTopia helps businesses design websites, systems, and AI-powered solutions that support real growth.'}
        />
      </section>
    </div>
  )
}
