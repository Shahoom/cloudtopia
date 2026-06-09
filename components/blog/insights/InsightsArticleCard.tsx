import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Eye } from 'lucide-react'
import type { BlogPostSummary } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}

export function InsightsArticleCard({ post, locale }: { post: BlogPostSummary; locale: string }) {
  const href = localePath(locale, `/articles/${post.slug}`)

  return (
    <article className="group overflow-hidden rounded-xl bg-white shadow-[0_2px_8px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(0,0,0,0.12)]">
      <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-600">
        <div className="relative aspect-video overflow-hidden rounded-t-xl bg-sky-50">
          {post.coverImage?.url ? (
            <Image
              src={post.coverImage.url}
              alt={post.coverImage.alt || post.title}
              fill
              loading="lazy"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-sky-100 via-white to-indigo-100" />
          )}
          <div className="pointer-events-none absolute bottom-2 right-3 text-[10px] font-black uppercase tracking-widest text-white/40 select-none">
            CloudTopia
          </div>
        </div>
        <div className="p-5">
          <h3 className="line-clamp-2 text-[17px] font-bold leading-snug text-neutral-900 transition-colors group-hover:text-primary-700">
            {post.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-neutral-500">
            {post.shortExcerpt || post.excerpt}
          </p>
          <div className="mt-4 flex items-center justify-between text-[12px] font-bold text-neutral-400">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {formatDate(post.publishedAt, locale)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Eye className="h-3 w-3" />
              {post.viewsCount.toLocaleString()}
            </span>
          </div>
        </div>
      </Link>
    </article>
  )
}
