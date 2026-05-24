import type { BlogPostSummary } from '@/lib/blog/data'
import { BlogCard } from './BlogCard'

export function CaseStudyInsights({ posts, locale }: { posts: BlogPostSummary[]; locale: string }) {
  if (posts.length === 0) return null

  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="text-sm font-black uppercase tracking-normal text-primary-700">Project intelligence</p>
          <h2 className="mt-2 text-3xl font-black tracking-normal text-neutral-950 md:text-5xl">
            Project Insights & Case Studies
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-7 text-neutral-600">
            See the business challenge, system thinking, and digital solution behind selected CloudTopia work.
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}
