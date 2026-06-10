import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Linkedin, Twitter } from 'lucide-react'
import { BlogGrid } from '@/components/blog/BlogGrid'
import { Breadcrumbs } from '@/components/blog/Breadcrumbs'
import { NewsletterBox } from '@/components/blog/NewsletterBox'
import { getAuthorBlogPosts, getBlogAuthor } from '@/lib/blog/data'
import { buildHreflangMap, canonicalUrl } from '@/lib/i18n/url'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, buildOrganizationRef } from '@/lib/seo/schema'

type PageProps = {
  params: Promise<{ locale: string; slug: string }>
}

function absoluteUrl(url?: string | null) {
  if (!url) return undefined
  return url.startsWith('http') ? url : canonicalUrl('en', url)
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale = 'en', slug } = await params
  const author = await getBlogAuthor(locale, slug)
  if (!author) return { title: 'Author Not Found' }

  const title = author.seo?.metaTitle || `${author.name} | CloudTopia ${locale === 'ar' ? 'المقالات' : 'Articles'}`
  const description = author.seo?.metaDescription || author.shortBio || author.bio
  const image = absoluteUrl(author.seo?.ogImage?.url || author.image?.url)

  return {
    title,
    description,
    robots: author.seo?.noIndex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url: canonicalUrl(locale, `/articles/author/${author.slug}`),
      type: 'profile',
      images: image ? [{ url: image, alt: author.name }] : undefined,
    },
    alternates: {
      canonical: canonicalUrl(locale, `/articles/author/${author.slug}`),
      languages: buildHreflangMap(`/articles/author/${author.slug}`),
    },
  }
}

export default async function ArticleAuthorPage({ params }: PageProps) {
  const { locale = 'en', slug } = await params
  const author = await getBlogAuthor(locale, slug)
  if (!author) notFound()

  const posts = await getAuthorBlogPosts(locale, slug)

  // SD-2: Person + ProfilePage schema on the CANONICAL author route. The
  // BlogPosting author.@id in articles/[slug] references this exact #person @id.
  const profileUrl = canonicalUrl(locale, `/articles/author/${author.slug}`)
  const personId = `${profileUrl}#person`
  const description = author.bio || author.shortBio || undefined
  const image = absoluteUrl(author.image?.url)
  const sameAs = Array.from(
    new Set([...(author.sameAs ?? []), author.linkedinUrl, author.xUrl].filter((u): u is string => Boolean(u))),
  )
  const personSchema = {
    '@type': 'Person',
    '@id': personId,
    name: author.name,
    url: profileUrl,
    ...(author.role ? { jobTitle: author.role } : {}),
    ...(description ? { description } : {}),
    ...(image ? { image } : {}),
    ...(author.expertise.length > 0 ? { knowsAbout: author.expertise } : {}),
    ...(sameAs.length > 0 ? { sameAs } : {}),
    worksFor: buildOrganizationRef(),
  }
  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': `${profileUrl}#profilepage`,
    url: profileUrl,
    name: author.name,
    inLanguage: locale === 'ar' ? 'ar-SA' : 'en-US',
    mainEntity: personSchema,
  }
  const breadcrumbSchema = buildBreadcrumbSchema(locale, [
    { name: locale === 'ar' ? 'الرئيسية' : 'Home', path: '/' },
    { name: locale === 'ar' ? 'المقالات' : 'Articles', path: '/articles' },
    { name: author.name, path: `/articles/author/${author.slug}` },
  ])

  return (
    <div className="min-h-screen bg-[#f4f1f8] px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <JsonLd schema={[profilePageSchema, breadcrumbSchema]} />
      <div className="mx-auto max-w-7xl">
        <Breadcrumbs locale={locale} items={[{ label: author.name }]} />
        <header className="mb-10 rounded-[2rem] border border-white/80 bg-white p-8 shadow-xl shadow-sky-950/10 md:p-10">
          <div className="grid gap-8 md:grid-cols-[140px_1fr] md:items-center">
            <div className="relative h-32 w-32 overflow-hidden rounded-[2rem] bg-sky-50">
              {author.image?.url ? (
                <Image src={author.image.url} alt={author.image.alt || author.name} fill sizes="128px" className="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center bg-primary-600 text-3xl font-black text-white">
                  {author.name.slice(0, 2)}
                </div>
              )}
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-normal text-primary-700">{locale === 'ar' ? 'الكاتب' : 'Author'}</p>
              <h1 className="mt-3 text-4xl font-black leading-tight tracking-normal text-neutral-950 md:text-6xl">{author.name}</h1>
              {author.role && <p className="mt-2 text-lg font-bold text-neutral-500">{author.role}</p>}
              <p className="mt-5 max-w-3xl text-lg leading-8 text-neutral-600">{author.bio || author.shortBio}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {author.expertise.map((item) => (
                  <span key={item} className="rounded-full bg-[#f4f1f8] px-3 py-1 text-xs font-black text-neutral-700">
                    {item}
                  </span>
                ))}
              </div>
              <div className="mt-5 flex gap-3">
                {author.linkedinUrl && (
                  <a href={author.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${author.name} on LinkedIn`} className="text-neutral-500 hover:text-primary-700">
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {author.xUrl && (
                  <a href={author.xUrl} target="_blank" rel="noopener noreferrer" aria-label={`${author.name} on X`} className="text-neutral-500 hover:text-primary-700">
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </header>

        <div className="mb-8">
          <p className="text-sm font-black uppercase tracking-normal text-primary-700">{locale === 'ar' ? 'المقالات' : 'Articles'}</p>
          <h2 className="mt-2 text-3xl font-black tracking-normal text-neutral-950 md:text-5xl">
            {locale === 'ar' ? `مقالات بقلم ${author.name}` : `Articles by ${author.name}`}
          </h2>
        </div>
        <BlogGrid posts={posts} locale={locale} emptyTitle={locale === 'ar' ? 'لا توجد مقالات بعد' : 'No articles yet'} emptyText={locale === 'ar' ? 'ستظهر مقالات الكاتب هنا بمجرد نشرها.' : 'Published author articles will appear here.'} />
        <div className="mt-16">
          <NewsletterBox locale={locale} />
        </div>
      </div>
    </div>
  )
}
