import Image from 'next/image'
import { Calendar, Clock, Eye, Layers, User } from 'lucide-react'
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
  const displayDate = post.updatedAt && post.updatedAt !== post.publishedAt
    ? post.updatedAt
    : post.publishedAt

  return (
    <section
      className="relative overflow-hidden bg-[#f4f1f8] px-4 pb-12 pt-28 sm:px-6 lg:px-8"
      data-header-theme="light"
    >
      <div className="absolute inset-0 bg-[linear-gradient(rgba(2,132,199,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(2,132,199,0.08)_1px,transparent_1px)] bg-[size:42px_42px]" />
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-white/75 to-transparent" />

      <div className="relative mx-auto max-w-6xl">
        <Breadcrumbs locale={locale} items={[{ label: post.title }]} />

        {/* Title block */}
        <div className="mb-6 max-w-3xl">
          <div className="mb-4 flex flex-wrap gap-2">
            {post.category && (
              <span className="inline-flex rounded-full bg-white px-4 py-1.5 text-xs font-black uppercase tracking-wide text-primary-700 shadow-sm">
                {post.category.name}
              </span>
            )}
            {post.contentType && (
              <span className="inline-flex items-center gap-2 rounded-full bg-neutral-950 px-4 py-1.5 text-xs font-black uppercase tracking-wide text-white shadow-sm">
                <Layers className="h-3.5 w-3.5" />
                {post.contentType.replace(/_/g, ' ')}
              </span>
            )}
          </div>
          <h1 className="text-4xl font-black leading-tight tracking-normal text-neutral-950 md:text-6xl">
            {post.title}
          </h1>
          {post.subtitle && (
            <p className="mt-4 text-xl font-bold leading-8 text-neutral-800">{post.subtitle}</p>
          )}
          <p className="mt-4 text-lg leading-8 text-neutral-600">{post.excerpt}</p>
        </div>

        {/* 4-cell meta bar */}
        <div className="mb-8 flex flex-wrap items-stretch divide-x divide-neutral-200 overflow-hidden rounded-[14px] border border-neutral-200 bg-white shadow-sm">
          <div className="flex items-center gap-3 px-5 py-3">
            <Calendar className="h-5 w-5 shrink-0 text-primary-600" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                {locale === 'ar' ? 'آخر تحديث' : 'Last updated'}
              </p>
              <p className="text-[13px] font-bold text-neutral-900">{formatDate(displayDate, locale)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3">
            <Clock className="h-5 w-5 shrink-0 text-primary-600" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                {locale === 'ar' ? 'وقت القراءة' : 'Reading time'}
              </p>
              <p className="text-[13px] font-bold text-neutral-900">
                {locale === 'ar' ? `${post.readingTime} دقائق` : `${post.readingTime} min read`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3">
            <Eye className="h-5 w-5 shrink-0 text-primary-600" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                {locale === 'ar' ? 'المشاهدات' : 'Views'}
              </p>
              <p className="text-[13px] font-bold text-neutral-900">{post.viewsCount.toLocaleString()}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 px-5 py-3">
            <User className="h-5 w-5 shrink-0 text-primary-600" />
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-neutral-400">
                {locale === 'ar' ? 'كتبه' : 'Written by'}
              </p>
              <p className="text-[13px] font-bold text-primary-700">{post.author?.name || 'CloudTopia'}</p>
            </div>
          </div>
        </div>

        {/* Full-width featured image */}
        <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-white/80 bg-sky-50 shadow-2xl shadow-sky-950/15">
          {post.coverImage?.url ? (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 900px"
              className="object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-sky-100 via-white to-indigo-100" />
          )}
        </div>
      </div>
    </section>
  )
}
