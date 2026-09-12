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

// Cinematic filmstrip card: cover fills the card, dark gradient overlay,
// category chip pinned top, white serif title + date sitting on the image.
function StripCard({ post, locale, index }: { post: BlogPostSummary; locale: string; index: number }) {
  const href = localePath(locale, `/articles/${post.slug}`)
  const accent = categoryAccent(post.category)
  return (
    <article className="ct-strip-card group" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <Link href={href} tabIndex={index < 0 ? -1 : undefined} className="relative block h-full w-full overflow-hidden rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ed-accent)]">
        {post.coverImage?.url ? (
          <Image
            src={post.coverImage.url}
            alt={post.coverImage.alt || post.title}
            fill
            sizes="360px"
            quality={60}
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <TypographicCover title={post.title} category={post.category} size="card" className="absolute inset-0" />
        )}
        <span className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/5" aria-hidden="true" />
        {post.category && (
          <span
            className="absolute top-3 rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-white"
            style={{ insetInlineStart: 12, background: accent }}
          >
            {post.category.name}
          </span>
        )}
        <span className="absolute inset-x-0 bottom-0 p-4">
          <span className="ed-serif block text-[1.05rem] leading-snug text-white [text-wrap:balance] line-clamp-3">
            {post.title}
          </span>
          <span className="mt-2 block text-[11px] font-medium tracking-wide text-white/70">
            {formatDate(post.publishedAt, locale)}
          </span>
        </span>
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
  const strip = sidebarPosts
  const loop = strip.length >= 4 ? strip : [...strip, ...strip]
  const duration = Math.max(28, loop.length * 6)

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <FeaturedPost post={featuredPost} locale={locale} />
      {loop.length > 0 && (
        <div className="mt-8 border-t-2 border-[var(--ed-rule-ink)] pt-6">
          <style>{`
            .ct-strip-viewport { overflow: hidden; }
            .ct-strip-track {
              display: flex;
              gap: 16px;
              width: max-content;
              animation: ct-strip-scroll ${duration}s linear infinite;
            }
            .ct-strip-viewport:hover .ct-strip-track,
            .ct-strip-viewport:focus-within .ct-strip-track { animation-play-state: paused; }
            .ct-strip-card { width: 340px; height: 210px; flex-shrink: 0; position: relative; }
            /* Reverse direction vs the article-page marquee for variety. */
            @keyframes ct-strip-scroll {
              from { transform: translateX(-50%); }
              to { transform: translateX(0); }
            }
            @media (prefers-reduced-motion: reduce) {
              .ct-strip-track { animation: none; }
              .ct-strip-viewport { overflow-x: auto; }
            }
            @media (max-width: 640px) {
              .ct-strip-card { width: 260px; height: 170px; }
              .ct-strip-track { gap: 12px; }
            }
          `}</style>
          <div className="ct-strip-viewport" dir="ltr">
            <div className="ct-strip-track">
              {loop.map((post, i) => (
                <StripCard key={`${post.id}-a-${i}`} post={post} locale={locale} index={i} />
              ))}
              {loop.map((post, i) => (
                <StripCard key={`${post.id}-b-${i}`} post={post} locale={locale} index={-1} />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
