import type { BlogPostSummary } from '@/lib/blog/data'
import { BlogCard } from './BlogCard'

export function BlogGrid({
  posts,
  locale,
  emptyTitle = 'No insights found',
  emptyText = 'Try a different search or topic filter.',
}: {
  posts: BlogPostSummary[]
  locale: string
  emptyTitle?: string
  emptyText?: string
}) {
  if (posts.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-sky-200 bg-white/70 p-10 text-center">
        <h2 className="text-2xl font-black tracking-normal text-neutral-950">{emptyTitle}</h2>
        <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-neutral-600">{emptyText}</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} locale={locale} />
      ))}
    </div>
  )
}
