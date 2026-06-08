import Link from 'next/link'
import { ArrowRight, BookOpen, Clock } from 'lucide-react'
import type { BlogPostSummary } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'

export function PopularGuides({ posts, locale }: { posts: BlogPostSummary[]; locale: string }) {
  if (posts.length === 0) return null

  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <div className="rounded-3xl bg-neutral-950 p-8 text-white shadow-2xl shadow-sky-950/20">
          <BookOpen className="h-8 w-8 text-sky-200" />
          <h2 className="mt-5 text-3xl font-black leading-tight tracking-normal md:text-5xl">
            {locale === 'ar' ? 'أدلة شائعة للأعمال النامية' : 'Popular Guides for Growing Businesses'}
          </h2>
          <p className="mt-4 text-base leading-7 text-white/72">
            {locale === 'ar'
              ? 'قراءات عملية للمؤسسين الذين يقررون ما يجب بناؤه أو أتمتته أو تحسينه بعد ذلك.'
              : 'Practical reads for founders deciding what to build, automate, or improve next.'}
          </p>
        </div>
        <div className="grid gap-4">
          {posts.slice(0, 5).map((post, index) => (
            <Link
              key={post.id}
              href={localePath(locale, `/articles/${post.slug}`)}
              className="group grid gap-4 rounded-3xl border border-sky-100 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-primary-500 hover:shadow-xl hover:shadow-sky-950/10 sm:grid-cols-[64px_1fr_auto]"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#f4f1f8] text-xl font-black text-primary-700">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span>
                <span className="text-xs font-black uppercase tracking-normal text-primary-700">{post.category?.name || (locale === 'ar' ? 'مقالة' : 'Article')}</span>
                <strong className="mt-1 block text-xl font-black leading-tight text-neutral-950 transition group-hover:text-primary-700">
                  {post.title}
                </strong>
                <span className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-neutral-500">
                  <Clock className="h-4 w-4" />
                  {locale === 'ar' ? `${post.readingTime} دقائق` : `${post.readingTime} min read`}
                </span>
              </span>
              <ArrowRight className="hidden h-5 w-5 self-center text-primary-700 transition group-hover:translate-x-1 sm:block" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
