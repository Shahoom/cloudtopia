import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Linkedin, Twitter } from 'lucide-react'
import { Breadcrumbs } from '@/components/blog/Breadcrumbs'
import { NewsletterBox } from '@/components/blog/NewsletterBox'
import { SectionMasthead } from '@/components/blog/editorial/SectionMasthead'
import { InsightsArticleCard } from '@/components/blog/insights/InsightsArticleCard'
import { getAuthorBlogPosts, getBlogAuthor } from '@/lib/blog/data'
import { buildHreflangMap, canonicalUrl, stripBrandSuffix } from '@/lib/i18n/url'
import { JsonLd } from '@/components/seo/JsonLd'
import { buildBreadcrumbSchema, buildOrganizationRef } from '@/lib/seo/schema'
import { ogImagesFor } from '@/lib/og/og-image'

type PageProps = {
  params: Promise<{ locale: string; slug: string }>
}

function absoluteUrl(url?: string | null) {
  if (!url) return undefined
  return url.startsWith('http') ? url : canonicalUrl('en', url)
}

/**
 * TM-10: the full author bio can run well past the ~160-char snippet budget.
 * Cap the fallback description near `max`, preferring a sentence boundary and
 * falling back to a word boundary + ellipsis.
 */
function truncateDescription(text: string, max = 160): string {
  if (text.length <= max + 5) return text
  const slice = text.slice(0, max)
  const sentenceEnd = Math.max(
    slice.lastIndexOf('. '),
    slice.lastIndexOf('! '),
    slice.lastIndexOf('? '),
    slice.lastIndexOf('؟ '),
  )
  if (sentenceEnd > 60) return slice.slice(0, sentenceEnd + 1)
  const wordEnd = slice.lastIndexOf(' ')
  return `${slice.slice(0, wordEnd > 0 ? wordEnd : max)}…`
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale = 'en', slug } = await params
  const author = await getBlogAuthor(locale, slug)
  if (!author) return { title: 'Author Not Found' }

  // TM-10: no hardcoded brand in the fallback — the layout's `%s | CloudTopia`
  // template adds the brand once (the old fallback stacked
  // "X | CloudTopia Articles | CloudTopia").
  const title = stripBrandSuffix(author.seo?.metaTitle || author.name)
  const description = author.seo?.metaDescription
    || truncateDescription(author.shortBio || author.bio || '')
    || undefined
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
      // Page-level openGraph shallow-merges over the layout's, dropping its
      // og:locale — restate it here.
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      alternateLocale: locale === 'ar' ? 'en_US' : 'ar_SA',
      images: image ? [{ url: image, alt: author.name }] : ogImagesFor({ page: 'articles', locale }),
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

  const count = posts.length
  const articlesMeta = locale === 'ar'
    ? `${count} ${count === 1 ? 'مقالة' : 'مقالات'}`
    : `${count} ${count === 1 ? 'article' : 'articles'}`

  return (
    <div className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
      <JsonLd schema={[profilePageSchema, breadcrumbSchema]} />
      <div className="mx-auto max-w-6xl">
        <Breadcrumbs locale={locale} items={[{ label: author.name }]} />
        <header className="mt-6 mb-12 grid gap-6 border-b-2 border-[var(--ed-rule-ink)] pb-8 md:grid-cols-[112px_1fr] md:items-start md:gap-8">
          <div className="relative h-28 w-28 overflow-hidden rounded-full border border-[var(--ed-rule)]" style={{ background: 'var(--ed-paper-2)' }}>
            {author.image?.url ? (
              <Image src={author.image.url} alt={author.image.alt || author.name} fill sizes="112px" className="object-cover" />
            ) : (
              <div
                className="ed-serif flex h-full w-full items-center justify-center"
                style={{ background: 'var(--ed-paper-2)', color: 'var(--ed-accent-ink)', fontSize: '1.75rem' }}
              >
                {author.name.slice(0, 2)}
              </div>
            )}
          </div>
          <div className="min-w-0">
            <div className="ed-eyebrow" style={{ marginBottom: 6 }}>{locale === 'ar' ? 'الكاتب' : 'Author'}</div>
            <h1 className="ed-serif" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', lineHeight: 1.12, margin: '0 0 0.35rem' }}>
              {author.name}
            </h1>
            {author.role && (
              <p className="ed-meta" style={{ marginBottom: '0.75rem' }}>{author.role}</p>
            )}
            {(author.bio || author.shortBio) && (
              <p style={{ fontFamily: 'var(--ed-sans)', color: 'var(--ed-graphite)', fontSize: '0.95rem', lineHeight: 1.6, maxWidth: '46rem' }}>
                {author.bio || author.shortBio}
              </p>
            )}
            {author.expertise.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-2">
                {author.expertise.map((item) => (
                  <span key={item} className="ed-meta rounded-full border border-[var(--ed-rule)] px-3 py-1">
                    {item}
                  </span>
                ))}
              </div>
            )}
            {(author.linkedinUrl || author.xUrl) && (
              <div className="mt-5 flex gap-4">
                {author.linkedinUrl && (
                  <a
                    href={author.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${author.name} on LinkedIn`}
                    className="text-[var(--ed-graphite)] transition-colors hover:text-[var(--ed-accent)]"
                  >
                    <Linkedin className="h-5 w-5" />
                  </a>
                )}
                {author.xUrl && (
                  <a
                    href={author.xUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${author.name} on X`}
                    className="text-[var(--ed-graphite)] transition-colors hover:text-[var(--ed-accent)]"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                )}
              </div>
            )}
          </div>
        </header>

        <SectionMasthead
          className="mb-10"
          as="h2"
          eyebrow={locale === 'ar' ? 'المقالات' : 'Articles'}
          title={locale === 'ar' ? `مقالات بقلم ${author.name}` : `Articles by ${author.name}`}
          metaLabel={articlesMeta}
        />

        {posts.length === 0 ? (
          <div className="border-t border-[var(--ed-rule)] py-16 text-center">
            <h2 className="ed-serif" style={{ fontSize: '1.5rem' }}>
              {locale === 'ar' ? 'لا توجد مقالات بعد' : 'No articles yet'}
            </h2>
            <p className="mx-auto mt-3 max-w-xl" style={{ fontFamily: 'var(--ed-sans)', color: 'var(--ed-graphite)', lineHeight: 1.6 }}>
              {locale === 'ar' ? 'ستظهر مقالات الكاتب هنا بمجرد نشرها.' : 'Published author articles will appear here.'}
            </p>
          </div>
        ) : (
          <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post.id} className="ed-card-enter">
                <InsightsArticleCard post={post} locale={locale} />
              </div>
            ))}
          </div>
        )}

        <div className="mt-16">
          <NewsletterBox locale={locale} />
        </div>
      </div>
    </div>
  )
}
