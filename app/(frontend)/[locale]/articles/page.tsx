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
  const meta = await getCMSMetadata(locale, '/articles', 'articles', {
    title:
      locale === 'ar'
        ? 'مقالات كلاود توبيا | أدلة الويب والأنظمة والذكاء الاصطناعي'
        : 'CloudTopia Articles | Web, Systems & AI Guides',
    description:
      locale === 'ar'
        ? 'رؤى وأدلة عملية من كلاود توبيا حول تصميم المواقع، التجارة الإلكترونية، الأنظمة المخصصة، الأتمتة، والذكاء الاصطناعي للشركات.'
        : 'Practical insights and guides from CloudTopia on web design, e-commerce, custom systems, automation, and AI for growing businesses.',
  })
  // Make the RSS feed discoverable from the articles index (rel=alternate).
  return {
    ...meta,
    alternates: {
      ...meta.alternates,
      types: {
        'application/rss+xml': [{ url: canonicalUrl(locale, '/articles/rss.xml'), title: 'CloudTopia Articles' }],
      },
    },
  }
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
  // Don't repeat the hero/sidebar articles in the grid below.
  const heroIds = new Set(
    [featuredPost, ...sidebarPosts].filter(Boolean).map((p) => (p as { id: number | string }).id),
  )
  const gridPosts = data.latestPosts.filter((post) => !heroIds.has(post.id))

  // SD-6: build a deduplicated blogPost ItemList from the rendered posts so the
  // Blog node lists the actual articles on the page.
  const listedPosts = Array.from(
    new Map(
      [featuredPost, ...sidebarPosts, ...gridPosts]
        .filter((post): post is NonNullable<typeof post> => Boolean(post))
        .map((post) => [post.id, post]),
    ).values(),
  )

  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${canonicalUrl(locale, '/articles')}#blog`,
    name: locale === 'ar' ? 'مقالات كلاود توبيا' : 'CloudTopia Articles',
    // Describe the blog's ACTUAL topical focus (matches generateMetadata) — the
    // previous "cloud computing / DevOps" copy advertised services CloudTopia
    // doesn't offer and contradicted the page's own meta description.
    description:
      locale === 'ar'
        ? 'أدلة عملية حول تصميم المواقع، التجارة الإلكترونية، أنظمة الأعمال المخصصة، تطبيقات الويب، والأتمتة بالذكاء الاصطناعي للشركات في الخليج والشرق الأوسط.'
        : 'Practical guides on web design, e-commerce, custom business systems, web applications, and AI automation for businesses across the Gulf and Middle East.',
    url: canonicalUrl(locale, '/articles'),
    inLanguage: locale === 'ar' ? 'ar-SA' : 'en-US',
    publisher: {
      '@type': 'Organization',
      '@id': 'https://cloudtopia.net/#organization',
      name: 'CloudTopia',
      url: 'https://cloudtopia.net',
      logo: { '@type': 'ImageObject', url: 'https://cloudtopia.net/images/CloudTopia.svg' },
    },
    ...(listedPosts.length > 0
      ? {
          blogPost: listedPosts.map((post) => ({
            '@type': 'BlogPosting',
            '@id': `${canonicalUrl(locale, `/articles/${post.slug}`)}#article`,
            headline: post.title,
            ...(post.excerpt ? { description: post.excerpt } : {}),
            url: canonicalUrl(locale, `/articles/${post.slug}`),
            datePublished: post.publishedAt,
            dateModified: post.updatedAt,
          })),
        }
      : {}),
  }

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: locale === 'ar' ? 'الرئيسية' : 'Home', item: canonicalUrl(locale, '/') },
      { '@type': 'ListItem', position: 2, name: locale === 'ar' ? 'المقالات' : 'Articles', item: canonicalUrl(locale, '/articles') },
    ],
  }

  const pageTitle = locale === 'ar' ? 'مقالات كلاود توبيا' : 'CloudTopia Articles'
  const pageTagline =
    locale === 'ar'
      ? 'رؤى وأدلة عملية حول الويب والأنظمة والذكاء الاصطناعي للشركات النامية.'
      : 'Practical insights and guides on web, systems, and AI for growing businesses.'

  const announcementItems = listedPosts.slice(0, 6).map((post) => ({
    title: post.title,
    href: localePath(locale, `/articles/${post.slug}`),
  }))

  return (
    <div className="min-h-screen bg-[#f4f1f8]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <AnnouncementStrip locale={locale} items={announcementItems} />

      <div className="bg-white">
        <CategoryNavBar
          categories={data.categories}
          locale={locale}
          activeCategorySlug={query.category}
          search={search}
        />
      </div>

      <header className="mx-auto max-w-7xl px-4 pt-10 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-black tracking-tight text-neutral-950 sm:text-4xl">{pageTitle}</h1>
        <p className="mt-2 max-w-2xl text-base text-neutral-600">{pageTagline}</p>
      </header>

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
              {search ? (locale === 'ar' ? `نتائج "${search}"` : `Results for "${search}"`) : locale === 'ar' ? 'أحدث المقالات' : 'Latest Articles'}
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
