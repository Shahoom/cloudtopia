import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BlogGrid } from '@/components/blog/BlogGrid'
import { BlogPagination } from '@/components/blog/BlogPagination'
import { BlogSearch } from '@/components/blog/BlogSearch'
import { Breadcrumbs } from '@/components/blog/Breadcrumbs'
import { NewsletterBox } from '@/components/blog/NewsletterBox'
import { getBlogCategories, getBlogIndexData } from '@/lib/blog/data'
import { buildHreflangMap, canonicalUrl, localePath } from '@/lib/i18n/url'
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

  const title = category.seo?.metaTitle || `${category.name} | CloudTopia ${locale === 'ar' ? 'المقالات' : 'Articles'}`
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
      languages: buildHreflangMap(`/articles/category/${category.slug}`),
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

  return (
    <div className="min-h-screen bg-[#f4f1f8] px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <JsonLd schema={[collectionSchema, breadcrumbSchema]} />
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs locale={locale} items={[{ label: category.name }]} />
        <header className="mb-10 rounded-3xl border border-white/80 bg-white p-8 shadow-xl shadow-sky-950/10 md:p-10">
          <p className="text-sm font-black uppercase tracking-normal text-primary-700">
            {locale === 'ar' ? 'التصنيف' : 'Category'}
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-normal text-neutral-950 md:text-6xl">{category.name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">{category.description}</p>
          <div className="mt-8">
            <BlogSearch
              action={localePath(locale, `/articles/category/${category.slug}`)}
              defaultValue={search}
              label={locale === 'ar' ? `البحث في مقالات ${category.name}` : `Search ${category.name} articles`}
              locale={locale}
            />
          </div>
        </header>
        <BlogGrid
          posts={data.latestPosts}
          locale={locale}
          emptyTitle={locale === 'ar' ? `لا توجد مقالات في ${category.name} بعد` : `No ${category.name} articles yet`}
          emptyText={locale === 'ar' ? 'ستظهر المقالات المنشورة لهذا التصنيف هنا.' : 'Published articles for this category will appear here.'}
        />
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
