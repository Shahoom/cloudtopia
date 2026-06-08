import type { BlogPostSummary } from '@/lib/blog/data'
import { BlogCard } from './BlogCard'

export function RelatedPosts({ posts, locale }: { posts: BlogPostSummary[]; locale: string }) {
  if (posts.length === 0) return null

  return (
    <section className="bg-[#f4f1f8] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-black uppercase tracking-normal text-primary-700">
              {locale === 'ar' ? 'تابع الاستكشاف' : 'Keep exploring'}
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-normal text-neutral-950 md:text-4xl">
              {locale === 'ar' ? 'مقالات ذات صلة' : 'Related articles'}
            </h2>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}
