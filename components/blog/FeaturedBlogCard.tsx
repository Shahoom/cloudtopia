import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Clock, Pin, User } from 'lucide-react'
import type { BlogPostSummary } from '@/lib/blog/data'
import { localizeContentType } from '@/lib/blog/taxonomy-i18n'
import { localePath } from '@/lib/i18n/url'

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function FeaturedBlogCard({
  post,
  locale,
  large = false,
}: {
  post: BlogPostSummary
  locale: string
  large?: boolean
}) {
  const href = localePath(locale, `/articles/${post.slug}`)

  return (
    <article
      className={`group overflow-hidden rounded-3xl border border-white/70 bg-white shadow-xl shadow-sky-950/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-sky-950/15 ${
        large ? 'lg:col-span-2 lg:row-span-2' : ''
      }`}
    >
      <Link href={href} className="grid h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600">
        <div className={`relative overflow-hidden bg-sky-50 ${large ? 'min-h-[340px] lg:min-h-[460px]' : 'min-h-[220px]'}`}>
          {post.coverImage?.url ? (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.featuredImageAlt || post.title}
              fill
              priority={large}
              sizes={large ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 1024px) 100vw, 33vw'}
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-sky-100 via-white to-indigo-100" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-neutral-950/15 to-transparent" />
          <div className="absolute left-5 top-5 flex flex-wrap gap-2">
            {post.category && (
              <span className="rounded-full bg-white px-3 py-1 text-xs font-black uppercase tracking-normal text-primary-700">
                {post.category.name}
              </span>
            )}
            {post.pinned && (
              <span className="inline-flex items-center gap-1 rounded-full bg-neutral-950 px-3 py-1 text-xs font-black uppercase tracking-normal text-white">
                <Pin className="h-3 w-3" />
                {locale === 'ar' ? 'مهم' : 'Pinned'}
              </span>
            )}
            {post.contentType && (
              <span className="rounded-full bg-sky-600 px-3 py-1 text-xs font-black uppercase tracking-normal text-white">
                {localizeContentType(post.contentType, locale)}
              </span>
            )}
          </div>
          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
            <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-normal text-white/80">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {locale === 'ar' ? `${post.readingTime} دقائق` : `${post.readingTime} min read`}
              </span>
              {post.author?.name && (
                <span className="inline-flex items-center gap-1">
                  <User className="h-3.5 w-3.5" />
                  {post.author.name}
                </span>
              )}
            </div>
            <h3 className={`font-black leading-tight tracking-normal text-white ${large ? 'text-3xl md:text-5xl' : 'text-2xl'}`}>
              {post.title}
            </h3>
            <p className={`mt-3 max-w-2xl text-white/82 ${large ? 'text-lg leading-8' : 'line-clamp-2 text-sm leading-6'}`}>
              {post.shortExcerpt || post.excerpt}
            </p>
            <span className="mt-5 inline-flex items-center gap-2 text-sm font-black text-sky-200">
              {locale === 'ar' ? 'اقرأ المزيد' : 'Read more'}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
