import Image from 'next/image'
import Link from 'next/link'
import type { BlogPostSummary } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'
import { Kicker } from './editorial/Kicker'
import { TypographicCover } from './editorial/TypographicCover'
import { categoryAccent } from './editorial/categoryColor'

function formatDate(value: string, locale: string) {
  return new Intl.DateTimeFormat(locale === 'ar' ? 'ar' : 'en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(value))
}

export function RelatedPosts({ posts, locale }: { posts: BlogPostSummary[]; locale: string }) {
  if (posts.length === 0) return null

  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 border-t-2 border-[var(--ed-rule-ink)] pt-4">
          <p className="ed-eyebrow">{locale === 'ar' ? 'تابع الاستكشاف' : 'Keep exploring'}</p>
          <h2 className="ed-serif mt-2" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', lineHeight: 1.15 }}>
            {locale === 'ar' ? 'مقالات ذات صلة' : 'Related articles'}
          </h2>
        </div>
        <div className="grid gap-x-8 gap-y-10 md:grid-cols-3 md:divide-x md:divide-[var(--ed-rule)] rtl:md:divide-x-reverse">
          {posts.map((post) => {
            const href = localePath(locale, `/articles/${post.slug}`)
            const accent = categoryAccent(post.category)
            return (
              <article key={post.id} className="group flex flex-col md:px-4 md:first:ps-0 md:last:pe-0">
                <Link href={href} className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--ed-accent)]">
                  <div className="relative aspect-[16/10] overflow-hidden rounded-lg">
                    {post.coverImage?.url ? (
                      <Image
                        src={post.coverImage.url}
                        alt={post.coverImage.alt || post.featuredImageAlt || post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="ed-zoom object-cover"
                      />
                    ) : (
                      <TypographicCover title={post.title} category={post.category} size="card" className="absolute inset-0" />
                    )}
                  </div>
                </Link>
                {post.category && (
                  <div className="mt-4">
                    <Kicker color={accent} href={localePath(locale, `/articles/category/${post.category.slug}`)}>
                      {post.category.name}
                    </Kicker>
                  </div>
                )}
                <h3 className="mt-2">
                  <Link
                    href={href}
                    className="ed-serif text-xl leading-snug transition-colors group-hover:text-[color:var(--ed-accent-ink)]"
                  >
                    {post.title}
                  </Link>
                </h3>
                <p className="ed-meta mt-3" style={{ color: 'var(--ed-muted)' }}>
                  {post.author?.name ? `${post.author.name}  ·  ` : ''}
                  {formatDate(post.publishedAt, locale)}
                </p>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
