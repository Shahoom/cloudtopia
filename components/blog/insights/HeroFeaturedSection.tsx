import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Eye } from 'lucide-react'
import type { BlogPostSummary } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

function CategoryPill({ category }: { category: NonNullable<BlogPostSummary['category']> }) {
  const color = category.color || '#0284c7'
  return (
    <span
      className="inline-flex shrink-0 items-center rounded border px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wide"
      style={{ borderColor: color, color }}
    >
      {category.name}
    </span>
  )
}

function MetaRow({
  publishedAt,
  viewsCount,
  locale,
}: {
  publishedAt: string
  viewsCount: number
  locale: string
}) {
  return (
    <div className="flex items-center gap-4 text-xs font-bold text-neutral-400">
      <span className="flex items-center gap-1">
        <Calendar className="h-3.5 w-3.5" />
        <time dateTime={publishedAt}>{formatDate(publishedAt, locale)}</time>
      </span>
      <span className="flex items-center gap-1">
        <Eye className="h-3.5 w-3.5" />
        {viewsCount.toLocaleString(locale === 'ar' ? 'ar-SA' : 'en')}{' '}
        {locale === 'ar' ? 'مشاهدة' : 'views'}
      </span>
    </div>
  )
}

function FeaturedPost({ post, locale }: { post: BlogPostSummary; locale: string }) {
  const href = localePath(locale, `/articles/${post.slug}`)

  return (
    <article>
      <Link href={href} className="group block">
        <div className="relative aspect-[2/1] overflow-hidden rounded-xl">
          {post.coverImage?.url ? (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-sky-100 via-white to-indigo-100" />
          )}
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
            <span className="h-1.5 w-5 rounded-full bg-white" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
            <span className="h-1.5 w-1.5 rounded-full bg-white/50" />
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {post.category && <CategoryPill category={post.category} />}
          <MetaRow publishedAt={post.publishedAt} viewsCount={post.viewsCount} locale={locale} />
          <h2 className="line-clamp-2 text-[22px] font-bold leading-snug text-neutral-900 transition-colors group-hover:text-primary-700">
            {post.title}
          </h2>
          <p className="line-clamp-2 text-sm text-neutral-500">
            {post.shortExcerpt || post.excerpt}
          </p>
        </div>
      </Link>
    </article>
  )
}

function SidebarPost({ post, locale }: { post: BlogPostSummary; locale: string }) {
  const href = localePath(locale, `/articles/${post.slug}`)

  return (
    <article>
      <Link href={href} className="group flex gap-3">
        <div className="relative h-[105px] w-[180px] shrink-0 overflow-hidden rounded-lg">
          {post.coverImage?.url ? (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              sizes="180px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-sky-100 via-white to-indigo-100" />
          )}
        </div>
        <div className="min-w-0 flex-1 space-y-1.5 py-0.5">
          {post.category && <CategoryPill category={post.category} />}
          <MetaRow publishedAt={post.publishedAt} viewsCount={post.viewsCount} locale={locale} />
          <h3 className="line-clamp-2 text-[16px] font-semibold leading-snug text-neutral-900 transition-colors group-hover:text-primary-700">
            {post.title}
          </h3>
          <p className="line-clamp-2 text-[13px] text-neutral-500">
            {post.shortExcerpt || post.excerpt}
          </p>
          <span className="text-xs text-neutral-400 transition-colors group-hover:text-primary-600">
            {locale === 'ar' ? '← اقرأ المزيد' : 'Read More →'}
          </span>
        </div>
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
      <div className="grid gap-6 lg:grid-cols-[1.16fr_1fr]">
        <FeaturedPost post={featuredPost} locale={locale} />
        <div className="flex flex-col gap-5">
          {sidebar.map((post) => (
            <SidebarPost key={post.id} post={post} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}
