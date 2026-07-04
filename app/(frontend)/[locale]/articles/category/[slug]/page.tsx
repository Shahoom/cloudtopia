import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Search } from 'lucide-react'
import { BlogPagination } from '@/components/blog/BlogPagination'
import { Breadcrumbs } from '@/components/blog/Breadcrumbs'
import { NewsletterBox } from '@/components/blog/NewsletterBox'
import { SectionMasthead } from '@/components/blog/editorial/SectionMasthead'
import { InsightsArticleCard } from '@/components/blog/insights/InsightsArticleCard'
import { getBlogCategories, getBlogIndexData } from '@/lib/blog/data'
import { buildSelfHreflangMap, canonicalUrl, localePath, stripBrandSuffix } from '@/lib/i18n/url'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/seo/schema'

type PageProps = {
  params: Promise<{ locale: string; slug: string }>
  searchParams: Promise<{ q?: string; page?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale = 'en', slug } = await params
  const categories = await getBlogCategories(locale)
  const category = categories.find((item) => item.slug === slug)
  if (!category) return { title: 'Category Not Found' }

  // No hardcoded brand in the fallback — the layout's `%s | CloudTopia`
  // template adds it once; stripBrandSuffix guards a CMS metaTitle that already
  // includes the brand. (Was producing "… | CloudTopia Articles | CloudTopia".)
  const title = stripBrandSuffix(category.seo?.metaTitle || `${category.name} ${locale === 'ar' ? 'المقالات' : 'Articles'}`)
  const description = category.seo?.metaDescription || category.description

  return {
    title,
    description,
    robots: category.seo?.noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      title,
      description,
      url: canonicalUrl(locale, `/articles/category/${category.slug}`),
      type: 'website',
    },
    alternates: {
      canonical: category.seo?.canonicalUrl || canonicalUrl(locale, `/articles/category/${category.slug}`),
      // Self + x-default only — Arabic article taxonomy pages don't exist, so an
      // `ar` alternate would 404.
      languages: buildSelfHreflangMap(locale, `/articles/category/${category.slug}`),
    },
  }
}

export default async function ArticleCategoryPage({ params, searchParams }: PageProps) {
  const { locale = 'en', slug } = await params
  const query = await searchParams
  const categories = await getBlogCategories(locale)
  const category = categories.find((item) => item.slug === slug)
  if (!category) notFound()

  const search = typeof query.q === 'string' ? query.q : ''
  const page = Number(query.page || 1)
  const data = await getBlogIndexData({ locale, page, search, category: slug })

  // SD-7: CollectionPage + BreadcrumbList + ItemList of the listed articles.
  const categoryUrl = canonicalUrl(locale, `/articles/category/${category.slug}`)
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${categoryUrl}#collectionpage`,
    name: category.name,
    ...(category.description ? { description: category.description } : {}),
    url: categoryUrl,
    inLanguage: locale === 'ar' ? 'ar-SA' : 'en-US',
    isPartOf: { '@type': 'Blog', '@id': `${canonicalUrl(locale, '/articles')}#blog` },
    ...(data.latestPosts.length > 0
      ? {
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: data.latestPosts.map((post, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: canonicalUrl(locale, `/articles/${post.slug}`),
              name: post.title,
            })),
          },
        }
      : {}),
  }
  const breadcrumbSchema = buildBreadcrumbSchema(locale, [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', path: '/' },
    { name: locale === 'ar' ? 'المقالات' : 'Articles', path: '/articles' },
    { name: category.name, path: `/articles/category/${category.slug}` },
  ])

  const count = data.latestPosts.length
  const metaLabel = locale === 'ar'
    ? `${count} ${count === 1 ? 'مقالة' : 'مقالات'}`
    : `${count} ${count === 1 ? 'article' : 'articles'}`
  const searchLabel = locale === 'ar' ? `البحث في مقالات ${category.name}` : `Search ${category.name} articles`
  const searchPlaceholder = locale === 'ar' ? 'ابحث عن المواقع، الذكاء الاصطناعي، الأتمتة...' : 'Search websites, AI, CRM, automation...'

  return (
    <div className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <JsonLd schema={[collectionSchema, breadcrumbSchema]} />
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs locale={locale} items={[{ label: category.name }]} />
        <SectionMasthead
          className="mt-6 mb-10"
          eyebrow={locale === 'ar' ? 'التصنيف' : 'Category'}
          title={category.name}
          description={category.description}
          metaLabel={metaLabel}
        >
          <form action={localePath(locale, `/articles/category/${category.slug}`)} className="relative mt-6 max-w-md">
            <label htmlFor="category-search" className="sr-only">
              {searchLabel}
            </label>
            <Search className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ed-muted)] ltr:left-1 rtl:right-1" />
            <input
              id="category-search"
              name="q"
              type="search"
              defaultValue={search}
              placeholder={searchPlaceholder}
              className="h-11 w-full border-0 border-b border-[var(--ed-rule)] bg-transparent text-sm text-[var(--ed-ink)] outline-none transition-colors placeholder:text-[var(--ed-muted)] focus:border-[var(--ed-accent)] ltr:pl-7 rtl:pr-7"
            />
          </form>
        </SectionMasthead>

        {data.latestPosts.length === 0 ? (
          <div className="border-t border-[var(--ed-rule)] py-16 text-center">
            <h2 className="ed-serif" style={{ fontSize: '1.5rem' }}>
              {locale === 'ar' ? `لا توجد مقالات في ${category.name} بعد` : `No ${category.name} articles yet`}
            </h2>
            <p className="mx-auto mt-3 max-w-xl" style={{ fontFamily: 'var(--ed-sans)', color: 'var(--ed-graphite)', lineHeight: 1.6 }}>
              {locale === 'ar' ? 'ستظهر المقالات المنشورة لهذا التصنيف هنا.' : 'Published articles for this category will appear here.'}
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
          basePath={localePath(locale, `/articles/category/${category.slug}`)}
          page={data.pagination.page}
          totalPages={data.pagination.totalPages}
          params={{ q: search || undefined }}
          locale={locale}
        />
        <div className="mt-16">
          <NewsletterBox locale={locale} />
        </div>
      </div>
    </div>
  )
}
