import Image from 'next/image'
import Link from 'next/link'
import { Linkedin, Twitter } from 'lucide-react'
import type { BlogAuthor } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'

export function AuthorBox({ author, locale }: { author: BlogAuthor | null; locale: string }) {
  if (!author) return null

  return (
    <section className="mt-12 border-t border-[var(--ed-rule)] pt-8">
      <div className="grid gap-5 sm:grid-cols-[72px_1fr]">
        <div className="relative h-[72px] w-[72px] overflow-hidden rounded-full border border-[var(--ed-rule)]">
          {author.image?.url ? (
            <Image src={author.image.url} alt={author.image.alt || author.name} fill sizes="72px" className="object-cover" />
          ) : (
            <span
              className="ed-avatar flex h-full w-full items-center justify-center"
              style={{ fontSize: '1.35rem' }}
            >
              {author.name.slice(0, 2)}
            </span>
          )}
        </div>
        <div>
          <p className="ed-eyebrow">{locale === 'ar' ? 'كُتب بواسطة' : 'Written by'}</p>
          <h2 className="ed-serif mt-1.5" style={{ fontSize: '1.5rem', lineHeight: 1.2 }}>
            {author.name}
          </h2>
          {author.role && (
            <p className="ed-meta mt-1" style={{ color: 'var(--ed-muted)' }}>
              {author.role}
            </p>
          )}
          <p className="mt-3 text-[0.95rem] leading-7" style={{ color: 'var(--ed-graphite)' }}>
            {author.shortBio || author.bio}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-4">
            <Link
              href={localePath(locale, `/articles/author/${author.slug}`)}
              className="ed-eyebrow transition-colors hover:text-[color:var(--ed-accent)]"
              style={{ color: 'var(--ed-accent-ink)' }}
            >
              {locale === 'ar' ? 'عرض جميع المقالات' : 'View all posts'}
            </Link>
            {author.linkedinUrl && (
              <a
                href={author.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${author.name} on LinkedIn`}
                className="text-[color:var(--ed-muted)] transition-colors hover:text-[color:var(--ed-accent)]"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {author.xUrl && (
              <a
                href={author.xUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${author.name} on X`}
                className="text-[color:var(--ed-muted)] transition-colors hover:text-[color:var(--ed-accent)]"
              >
                <Twitter className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
