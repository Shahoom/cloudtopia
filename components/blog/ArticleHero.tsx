import Image from 'next/image'
import type { BlogPost } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'
import { Breadcrumbs } from './Breadcrumbs'
import { Byline } from './editorial/Byline'
import { Kicker } from './editorial/Kicker'
import { TypographicCover } from './editorial/TypographicCover'
import { categoryAccent } from './editorial/categoryColor'

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function ArticleHero({ post, locale }: { post: BlogPost; locale: string }) {
  const isAr = locale === 'ar'
  const displayDate = post.updatedAt && post.updatedAt !== post.publishedAt ? post.updatedAt : post.publishedAt
  const accent = categoryAccent(post.category)

  const readingTimeLabel = isAr
    ? post.readingTime === 1
      ? 'دقيقة واحدة'
      : `${post.readingTime} دقائق`
    : `${post.readingTime} min read`
  const viewsLabel =
    post.viewsCount > 0
      ? `${post.viewsCount.toLocaleString(isAr ? 'ar-EG' : 'en')} ${isAr ? 'مشاهدة' : 'views'}`
      : undefined

  return (
    <section className="relative px-4 pb-10 pt-28 sm:px-6 lg:px-8" data-header-theme="light">
      <div className="mx-auto max-w-[96rem]">
        <div className="max-w-4xl">
          <Breadcrumbs locale={locale} items={[{ label: post.title }]} />

          {post.category && (
            <div className="mt-5">
              <Kicker color={accent} href={localePath(locale, `/articles/category/${post.category.slug}`)}>
                {post.category.name}
              </Kicker>
            </div>
          )}

          <h1 className="ed-serif mt-3" style={{ fontSize: 'clamp(2rem, 5.5vw, 3.4rem)', lineHeight: 1.07 }}>
            {post.title}
          </h1>

          {(post.subtitle || post.excerpt) && (
            <p
              className="mt-4"
              style={{
                fontFamily: 'var(--ed-serif)',
                fontStyle: isAr ? 'normal' : 'italic',
                fontSize: '1.25rem',
                lineHeight: 1.5,
                color: 'var(--ed-graphite)',
                maxWidth: '46rem',
              }}
            >
              {post.subtitle || post.excerpt}
            </p>
          )}

          <Byline
            author={post.author}
            byLabel={isAr ? 'بقلم' : 'By'}
            dateLabel={formatDate(displayDate, locale)}
            readingTimeLabel={readingTimeLabel}
            viewsLabel={viewsLabel}
            bordered
            className="mt-6"
          />
        </div>

        <figure className="mt-9">
          <div className="relative aspect-[16/10] overflow-hidden rounded-xl sm:aspect-[21/9]">
            {post.coverImage?.url ? (
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt || post.featuredImageAlt || post.title}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            ) : (
              <TypographicCover title={post.title} category={post.category} size="hero" className="absolute inset-0" />
            )}
          </div>
          {post.coverImage?.url && post.coverImage?.alt && (
            <figcaption
              className="mt-3"
              style={{ fontFamily: 'var(--ed-serif)', fontStyle: isAr ? 'normal' : 'italic', fontSize: '0.9rem', color: 'var(--ed-muted)' }}
            >
              {post.coverImage.alt}
            </figcaption>
          )}
        </figure>
      </div>
    </section>
  )
}
