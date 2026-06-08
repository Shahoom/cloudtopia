import Image from 'next/image'
import Link from 'next/link'
import { Linkedin, Twitter } from 'lucide-react'
import type { BlogAuthor } from '@/lib/blog/data'
import { localePath } from '@/lib/i18n/url'

export function AuthorBox({ author, locale }: { author: BlogAuthor | null; locale: string }) {
  if (!author) return null

  return (
    <section className="mt-12 rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
      <div className="grid gap-5 sm:grid-cols-[88px_1fr]">
        <div className="relative h-[88px] w-[88px] overflow-hidden rounded-3xl bg-sky-50">
          {author.image?.url ? (
            <Image src={author.image.url} alt={author.image.alt || author.name} fill sizes="88px" className="object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-primary-600 text-xl font-black text-white">
              {author.name.slice(0, 2)}
            </div>
          )}
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-normal text-primary-700">{locale === 'ar' ? 'كُتب بواسطة' : 'Written by'}</p>
          <h2 className="mt-1 text-2xl font-black tracking-normal text-neutral-950">{author.name}</h2>
          {author.role && <p className="mt-1 text-sm font-bold text-neutral-500">{author.role}</p>}
          <p className="mt-3 text-base leading-7 text-neutral-600">{author.shortBio || author.bio}</p>
          <div className="mt-4 flex flex-wrap items-center gap-3">
            <Link href={localePath(locale, `/articles/author/${author.slug}`)} className="text-sm font-black text-primary-700 hover:text-primary-900">
              {locale === 'ar' ? 'عرض جميع المقالات' : 'View all posts'}
            </Link>
            {author.linkedinUrl && (
              <a href={author.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${author.name} on LinkedIn`} className="text-neutral-500 hover:text-primary-700">
                <Linkedin className="h-4 w-4" />
              </a>
            )}
            {author.xUrl && (
              <a href={author.xUrl} target="_blank" rel="noopener noreferrer" aria-label={`${author.name} on X`} className="text-neutral-500 hover:text-primary-700">
                <Twitter className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
