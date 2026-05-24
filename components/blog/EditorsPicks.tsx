import { Star } from 'lucide-react'
import type { BlogPostSummary } from '@/lib/blog/data'
import { BlogCard } from './BlogCard'

export function EditorsPicks({ posts, locale }: { posts: BlogPostSummary[]; locale: string }) {
  if (posts.length === 0) return null

  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-normal text-primary-700">
              <Star className="h-4 w-4" />
              Editor's picks
            </p>
            <h2 className="mt-2 text-3xl font-black tracking-normal text-neutral-950 md:text-5xl">Curated by CloudTopia</h2>
          </div>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {posts.slice(0, 3).map((post) => (
            <BlogCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}
