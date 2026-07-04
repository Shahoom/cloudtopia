import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Search } from 'lucide-react'
import { BlogPagination } from '@/components/blog/BlogPagination'
import { Breadcrumbs } from '@/components/blog/Breadcrumbs'
import { SectionMasthead } from '@/components/blog/editorial/SectionMasthead'
import { InsightsArticleCard } from '@/components/blog/insights/InsightsArticleCard'
import { getBlogIndexData, getBlogTags } from '@/lib/blog/data'
import { buildSelfHreflangMap, canonicalUrl, localePath, stripBrandSuffix } from '@/lib/i18n/url'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema } from '@/lib/seo/schema'

type PageProps = {
  params: Promise<{ locale: string; slug: string }>
  searchParams: Promise<{ q?: string; page?: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale = 'en', slug } = await params
  const tags = await getBlogTags(locale)
  const tag = tags.find((item) => item.slug === slug)
  if (!tag) return { title: 'Tag Not Found' }

  // No hardcoded brand — the layout template adds "| CloudTopia" once (the EN
  // fallback used to bake it in, doubling the suffix).
  const title = stripBrandSuffix(locale === 'ar' ? `وسم ${tag.name} | المقالات` : `${tag.name} Articles`)
  const description = locale === 'ar'
    ? `مقالات CloudTopia الموسومة بـ ${tag.name}.`
    : `CloudTopia articles tagged with ${tag.name}.`

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: canonicalUrl(locale, `/articles/tag/${tag.slug}`),
      type: 'website',
    },
    alternates: {
      canonical: canonicalUrl(locale, `/articles/tag/${tag.slug}`),
      // Self + x-default only — no Arabic tag pages exist to alternate to.
      languages: buildSelfHreflangMap(locale, `/articles/tag/${tag.slug}`),
    },
  }
}

export default async function ArticleTagPage({ params, searchParams }: PageProps) {
  const { locale = 'en', slug } = await params
  const query = await searchParams
  const tags = await getBlogTags(locale)
  const tag = tags.find((item) => item.slug === slug)
  if (!tag) notFound()

  const search = typeof query.q === 'string' ? query.q : ''
  const page = Number(query.page || 1)
  const data = await getBlogIndexData({ locale, page, search, tag: slug })

  // SD-7: CollectionPage + BreadcrumbList + ItemList of the listed articles.
  const tagUrl = canonicalUrl(locale, `/articles/tag/${tag.slug}`)
  const collectionSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': `${tagUrl}#collectionpage`,
    name: locale === 'ar' ? `وسم ${tag.name}` : `${tag.name} Articles`,
    description:
      locale === 'ar'
        ? `مقالات CloudTopia الموسومة بـ ${tag.name}.`
        : `CloudTopia articles tagged with ${tag.name}.`,
    url: tagUrl,
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
    { name: tag.name, path: `/articles/tag/${tag.slug}` },
  ])

  const description = locale === 'ar'
    ? `تم نشر ${tag.postCount} ${tag.postCount === 1 ? 'مقالة' : 'مقالات'} موسومة بـ ${tag.name}.`
    : `${tag.postCount} published ${tag.postCount === 1 ? 'article' : 'articles'} tagged with ${tag.name}.`
  const count = data.latestPosts.length
  const metaLabel = locale === 'ar'
    ? `${count} ${count === 1 ? 'مقالة' : 'مقالات'}`
    : `${count} ${count === 1 ? 'article' : 'articles'}`
  const searchLabel = locale === 'ar' ? `البحث في مقالات ${tag.name}` : `Search ${tag.name} articles`
  const searchPlaceholder = locale === 'ar' ? 'ابحث عن المواقع، الذكاء الاصطناعي، الأتمتة...' : 'Search websites, AI, CRM, automation...'

  return (
    <div className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <JsonLd schema={[collectionSchema, breadcrumbSchema]} />
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs locale={locale} items={[{ label: tag.name }]} />
        <SectionMasthead
          className="mt-6 mb-10"
          eyebrow={locale === 'ar' ? 'الوسم' : 'Tag'}
          title={tag.name}
          description={description}
          metaLabel={metaLabel}
        >
          <form action={localePath(locale, `/articles/tag/${tag.slug}`)} className="relative mt-6 max-w-md">
            <label htmlFor="tag-search" className="sr-only">
              {searchLabel}
            </label>
            <Search className="pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ed-muted)] ltr:left-1 rtl:right-1" />
            <input
              id="tag-search"
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
              {locale === 'ar' ? `لا توجد مقالات موسومة بـ ${tag.name} بعد` : `No ${tag.name} articles yet`}
            </h2>
            <p className="mx-auto mt-3 max-w-xl" style={{ fontFamily: 'var(--ed-sans)', color: 'var(--ed-graphite)', lineHeight: 1.6 }}>
              {locale === 'ar' ? 'ستظهر المقالات المنشورة لهذا الوسم هنا.' : 'Published articles for this tag will appear here.'}
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
          basePath={localePath(locale, `/articles/tag/${tag.slug}`)}
          page={data.pagination.page}
          totalPages={data.pagination.totalPages}
          params={{ q: search || undefined }}
          locale={locale}
        />
      </div>
    </div>
  )
}
