import Image from 'next/image'
import Link from 'next/link'
import type { BlogPostSummary } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'
import { Kicker } from '@/components/blog/editorial/Kicker'
import { TypographicCover } from '@/components/blog/editorial/TypographicCover'
import { categoryAccent } from '@/components/blog/editorial/categoryColor'

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

function metaLine(post: BlogPostSummary, locale: string) {
  const isAr = locale === 'ar'
  const segments = [formatDate(post.publishedAt, locale)]
  if (post.viewsCount > 0) {
    segments.push(
      `${post.viewsCount.toLocaleString(isAr ? 'ar-EG' : 'en')} ${isAr ? 'مشاهدة' : 'views'}`,
    )
  }
  const author = post.author?.name
  const by = author ? `${isAr ? 'بقلم' : 'By'} ${author}` : undefined
  return [by, ...segments].filter(Boolean).join('  ·  ')
}

function FeaturedPost({ post, locale }: { post: BlogPostSummary; locale: string }) {
  const href = localePath(locale, `/articles/${post.slug}`)
  const isAr = locale === 'ar'
  const accent = categoryAccent(post.category)

  return (
    <article className="group">
      <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ed-accent)]">
        <div className="relative aspect-[2/1] overflow-hidden">
          {post.coverImage?.url ? (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.featuredImageAlt || post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="ed-zoom object-cover"
            />
          ) : (
            <TypographicCover title={post.title} category={post.category} size="lead" className="absolute inset-0" />
          )}
        </div>
        <div className="mt-5">
          {post.category && <Kicker color={accent}>{post.category.name}</Kicker>}
          <h2
            className="ed-serif mt-3 transition-colors group-hover:text-[color:var(--ed-accent-ink)]"
            style={{ fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)', lineHeight: 1.12 }}
          >
            {post.title}
          </h2>
          <p
            className="mt-3 max-w-2xl"
            style={{
              fontFamily: 'var(--ed-serif)',
              fontStyle: isAr ? 'normal' : 'italic',
              fontSize: '1.1rem',
              lineHeight: 1.5,
              color: 'var(--ed-graphite)',
            }}
          >
            {post.shortExcerpt || post.excerpt}
          </p>
          <div className="ed-meta mt-4">{metaLine(post, locale)}</div>
        </div>
      </Link>
    </article>
  )
}

function SecondaryPost({
  post,
  locale,
  divided,
}: {
  post: BlogPostSummary
  locale: string
  divided: boolean
}) {
  const href = localePath(locale, `/articles/${post.slug}`)
  const accent = categoryAccent(post.category)

  // Broadsheet columns: 2nd and 3rd items carry a leading vertical hairline on
  // wide screens; on narrow screens they stack with a top hairline instead.
  const dividerClass = divided
    ? 'border-t border-[var(--ed-rule)] pt-5 sm:border-t-0 sm:border-s sm:border-[var(--ed-rule)] sm:ps-5 sm:pt-0'
    : ''

  return (
    <article className={`group ${dividerClass}`}>
      <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ed-accent)]">
        {post.category && <Kicker color={accent}>{post.category.name}</Kicker>}
        <h3
          className="ed-serif mt-2 line-clamp-4 transition-colors group-hover:text-[color:var(--ed-accent-ink)]"
          style={{ fontSize: '1.1rem', lineHeight: 1.25 }}
        >
          {post.title}
        </h3>
        <div className="ed-meta mt-3">{formatDate(post.publishedAt, locale)}</div>
      </Link>
    </article>
  )
}

export function HeroFeaturedSection({
  featuredPost,
  sidebarPosts,
  locale,
}: {
  featuredPost: BlogPostSummary
  sidebarPosts: BlogPostSummary[]
  locale: string
}) {
  const sidebar = sidebarPosts.slice(0, 3)

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <FeaturedPost post={featuredPost} locale={locale} />
      {sidebar.length > 0 && (
        <div className="mt-8 grid gap-5 border-t-2 border-[var(--ed-rule-ink)] pt-6 sm:grid-cols-3 sm:gap-0">
          {sidebar.map((post, i) => (
            <SecondaryPost key={post.id} post={post} locale={locale} divided={i > 0} />
          ))}
        </div>
      )}
    </section>
  )
}
