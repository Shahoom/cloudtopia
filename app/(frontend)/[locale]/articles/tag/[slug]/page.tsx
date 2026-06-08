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

  const title = locale === 'ar' ? `وسم ${tag.name} | المقالات` : `${tag.name} Articles | CloudTopia`
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
      languages: buildHreflangMap(`/articles/tag/${tag.slug}`),
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

  return (
    <div className="min-h-screen bg-[#f4f1f8] px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs locale={locale} items={[{ label: tag.name }]} />
        <header className="mb-10 rounded-3xl border border-white/80 bg-white p-8 shadow-xl shadow-sky-950/10 md:p-10">
          <p className="text-sm font-black uppercase tracking-normal text-primary-700">
            {locale === 'ar' ? 'الوسم' : 'Tag'}
          </p>
          <h1 className="mt-3 text-4xl font-black leading-tight tracking-normal text-neutral-950 md:text-6xl">{tag.name}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">
            {locale === 'ar'
              ? `تم نشر ${tag.postCount} ${tag.postCount === 1 ? 'مقالة' : 'مقالات'} موسومة بـ ${tag.name}.`
              : `${tag.postCount} published ${tag.postCount === 1 ? 'article' : 'articles'} tagged with ${tag.name}.`}
          </p>
          <div className="mt-8">
            <BlogSearch action={localePath(locale, `/articles/tag/${tag.slug}`)} defaultValue={search} label={locale === 'ar' ? `البحث في مقالات ${tag.name}` : `Search ${tag.name} articles`} locale={locale} />
          </div>
        </header>
        <BlogGrid
          posts={data.latestPosts}
          locale={locale}
          emptyTitle={locale === 'ar' ? `لا توجد مقالات موسومة بـ ${tag.name} بعد` : `No ${tag.name} articles yet`}
          emptyText={locale === 'ar' ? 'ستظهر المقالات المنشورة لهذا الوسم هنا.' : 'Published articles for this tag will appear here.'}
        />
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
