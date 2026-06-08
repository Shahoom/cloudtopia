import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock, User } from 'lucide-react'
import type { BlogPostSummary } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function BlogCard({ post, locale }: { post: BlogPostSummary; locale: string }) {
  const href = localePath(locale, `/articles/${post.slug}`)

  return (
    <article className="group h-full overflow-hidden rounded-3xl border border-sky-100/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary-500/70 hover:shadow-xl hover:shadow-sky-900/10">
      <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600">
        <div className="relative aspect-[16/10] overflow-hidden bg-sky-50">
          {post.coverImage?.url ? (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-sky-100 via-white to-indigo-100" />
          )}
          {post.category && (
            <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-black uppercase tracking-normal text-primary-700 shadow-sm">
              {post.category.name}
            </span>
          )}
          {post.contentType && (
            <span className="absolute bottom-4 left-4 rounded-full bg-neutral-950/85 px-3 py-1 text-xs font-black uppercase tracking-normal text-white backdrop-blur">
              {post.contentType.replace(/_/g, ' ')}
            </span>
          )}
        </div>
        <div className="flex min-h-[260px] flex-col p-6">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-normal text-neutral-500">
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {locale === 'ar' ? `${post.readingTime} دقائق` : `${post.readingTime} min read`}
            </span>
            {post.author?.name && (
              <span className="inline-flex items-center gap-1 normal-case">
                <User className="h-3.5 w-3.5" />
                {post.author.name}
              </span>
            )}
          </div>
          <h3 className="text-2xl font-black leading-tight tracking-normal text-neutral-950 transition-colors group-hover:text-primary-700">
            {post.title}
          </h3>
          <p className="mt-4 line-clamp-3 text-base leading-7 text-neutral-600">{post.shortExcerpt || post.excerpt}</p>
          {post.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag.id} className="rounded-full bg-[#f4f1f8] px-3 py-1 text-xs font-black text-neutral-600">
                  {tag.name}
                </span>
              ))}
            </div>
          )}
          <span className="mt-auto inline-flex items-center gap-2 pt-6 text-sm font-black text-primary-700">
            {locale === 'ar' ? 'اقرأ المقال' : 'Read article'}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </span>
        </div>
      </Link>
    </article>
  )
}
