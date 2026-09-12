import Image from 'next/image'
import Link from 'next/link'
import type { BlogPostSummary } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'
import { Kicker } from './editorial/Kicker'
import { TypographicCover } from './editorial/TypographicCover'
import { categoryAccent } from './editorial/categoryColor'

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

/**
 * Related-articles marquee: a continuously scrolling strip of cover cards.
 * The track is duplicated once so the CSS translateX(-50%) loop is seamless;
 * hover (or reduced-motion preference) pauses it, and the track is forced LTR
 * so the animation math is identical on Arabic pages.
 */
export function RelatedPosts({ posts, locale }: { posts: BlogPostSummary[]; locale: string }) {
  if (posts.length === 0) return null

  // A seamless loop needs enough cards to overflow the viewport.
  const loop = posts.length >= 4 ? posts : [...posts, ...posts]
  const duration = Math.max(30, loop.length * 7)

  const card = (post: BlogPostSummary, i: number) => {
    const href = localePath(locale, `/articles/${post.slug}`)
    const accent = categoryAccent(post.category)
    return (
      <article key={`${post.id}-${i}`} className="ct-mq-card group" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
        <Link href={href} tabIndex={i >= loop.length ? -1 : undefined} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ed-accent)]">
          <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
            {post.coverImage?.url ? (
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt || post.featuredImageAlt || post.title}
                fill
                sizes="300px"
                quality={60}
                className="ed-zoom object-cover"
              />
            ) : (
              <TypographicCover title={post.title} category={post.category} size="card" className="absolute inset-0" />
            )}
          </div>
        </Link>
        {post.category && (
          <div className="mt-3">
            <Kicker color={accent} href={localePath(locale, `/articles/category/${post.category.slug}`)}>
              {post.category.name}
            </Kicker>
          </div>
        )}
        <h3 className="mt-1.5">
          <Link href={href} className="ed-serif text-lg leading-snug transition-colors group-hover:text-[color:var(--ed-accent-ink)]">
            {post.title}
          </Link>
        </h3>
        <p className="ed-meta mt-2" style={{ color: 'var(--ed-muted)' }}>
          {formatDate(post.publishedAt, locale)}
        </p>
      </article>
    )
  }

  return (
    <section className="py-16">
      <style>{`
        .ct-mq-viewport { overflow: hidden; }
        .ct-mq-track {
          display: flex;
          gap: 28px;
          width: max-content;
          animation: ct-mq-scroll ${duration}s linear infinite;
        }
        .ct-mq-viewport:hover .ct-mq-track,
        .ct-mq-viewport:focus-within .ct-mq-track { animation-play-state: paused; }
        .ct-mq-card { width: 300px; flex-shrink: 0; }
        @keyframes ct-mq-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .ct-mq-track { animation: none; }
          .ct-mq-viewport { overflow-x: auto; }
        }
        @media (max-width: 640px) {
          .ct-mq-card { width: 240px; }
          .ct-mq-track { gap: 18px; }
        }
      `}</style>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 border-t-2 border-[var(--ed-rule-ink)] pt-4">
          <p className="ed-eyebrow">{locale === 'ar' ? 'تابع الاستكشاف' : 'Keep exploring'}</p>
          <h2 className="ed-serif mt-2" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', lineHeight: 1.15 }}>
            {locale === 'ar' ? 'مقالات ذات صلة' : 'Related articles'}
          </h2>
        </div>
      </div>
      <div className="ct-mq-viewport" dir="ltr">
        <div className="ct-mq-track">
          {loop.map(card)}
          {loop.map((p, i) => card(p, i + loop.length))}
        </div>
      </div>
    </section>
  )
}
