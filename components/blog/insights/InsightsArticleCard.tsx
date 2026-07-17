import Image from 'next/image'
import Link from 'next/link'
import type { BlogPostSummary } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'
import { Kicker } from '@/components/blog/editorial/Kicker'
import { TypographicCover } from '@/components/blog/editorial/TypographicCover'
import { categoryAccent } from '@/components/blog/editorial/categoryColor'

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}

export function InsightsArticleCard({ post, locale }: { post: BlogPostSummary; locale: string }) {
  const href = localePath(locale, `/articles/${post.slug}`)
  const accent = categoryAccent(post.category)
  const viewsLabel =
    post.viewsCount > 0
      ? `${post.viewsCount.toLocaleString(locale === 'ar' ? 'ar-EG' : 'en')} ${locale === 'ar' ? 'مشاهدة' : 'views'}`
      : undefined

  return (
    <article className="group ed-card-enter border-t border-[var(--ed-rule)] pt-5 transition-transform duration-300 hover:-translate-y-0.5">
      <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ed-accent)]">
        <div className="relative aspect-video overflow-hidden">
          {post.coverImage?.url ? (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.featuredImageAlt || post.title}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="ed-zoom object-cover"
            />
          ) : (
            <TypographicCover title={post.title} category={post.category} size="card" className="absolute inset-0" />
          )}
        </div>
        <div className="pt-4">
          {post.category && (
            <Kicker color={accent} className="mb-2">
              {post.category.name}
            </Kicker>
          )}
          <h2
            className="ed-serif line-clamp-2 transition-colors group-hover:text-[color:var(--ed-accent-ink)]"
            style={{ fontSize: '1.3rem', lineHeight: 1.22 }}
          >
            {post.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-[14px] leading-relaxed" style={{ color: 'var(--ed-graphite)' }}>
            {post.shortExcerpt || post.excerpt}
          </p>
          <div className="ed-meta mt-4 flex items-center gap-3">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
            {viewsLabel && (
              <>
                <span aria-hidden="true">·</span>
                <span>{viewsLabel}</span>
              </>
            )}
          </div>
        </div>
      </Link>
    </article>
  )
}
