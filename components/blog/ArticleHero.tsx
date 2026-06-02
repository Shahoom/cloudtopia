import Image from 'next/image'
import { Clock, User, Layers } from 'lucide-react'
import type { BlogPost } from '@/lib/blog/data'
import { Breadcrumbs } from './Breadcrumbs'

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function ArticleHero({ post, locale }: { post: BlogPost; locale: string }) {
  return (
    <section className="relative overflow-hidden bg-[#f4f1f8] px-4 pb-12 pt-28 sm:px-6 lg:px-8" data-header-theme="light">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(2,132,199,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(2,132,199,0.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/75 to-transparent" />
      <div className="relative mx-auto max-w-6xl">
        <Breadcrumbs locale={locale} items={[{ label: post.title }]} />
        <div className="grid gap-10 lg:grid-cols-[1fr_0.88fr] lg:items-end">
          <div>
            <div className="mb-5 flex flex-wrap gap-2">
              {post.category && (
                <span className="inline-flex rounded-full bg-white px-4 py-2 text-xs font-black uppercase tracking-normal text-primary-700 shadow-sm">
                  {post.category.name}
                </span>
              )}
              {post.contentType && (
                <span className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-4 py-2 text-xs font-black uppercase tracking-normal text-white shadow-sm">
                  <Layers className="h-3.5 w-3.5" />
                  {post.contentType.replace(/_/g, ' ')}
                </span>
              )}
            </div>
            <h1 className="max-w-4xl text-4xl font-black leading-tight tracking-normal text-neutral-950 md:text-6xl">
              {post.title}
            </h1>
            {post.subtitle && <p className="mt-4 max-w-3xl text-xl font-bold leading-8 text-neutral-800">{post.subtitle}</p>}
            <p className="mt-6 max-w-3xl text-lg leading-8 text-neutral-600 md:text-xl">{post.excerpt}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4 text-sm font-bold text-neutral-600">
              <span className="inline-flex items-center gap-2">
                <User className="h-4 w-4 text-primary-700" />
                {post.author?.name || 'CloudTopia'}
              </span>
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt, locale)}</time>
              {post.updatedAt && post.updatedAt !== post.publishedAt && <span>Updated {formatDate(post.updatedAt, locale)}</span>}
              <span className="inline-flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary-700" />
                {post.readingTime} min read
              </span>
            </div>
          </div>
          <div className="relative aspect-[16/11] overflow-hidden rounded-3xl border border-white/80 bg-sky-50 shadow-2xl shadow-sky-950/15">
            {post.coverImage?.url ? (
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt || post.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-sky-100 via-white to-indigo-100" />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
