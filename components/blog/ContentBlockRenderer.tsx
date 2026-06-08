import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Check, Lightbulb, X } from 'lucide-react'
import type { BlogPostSummary } from '@/lib/blog/data'

function blocksArray(blocks: unknown): Array<Record<string, any>> {
  return Array.isArray(blocks) ? blocks.filter((block) => block && typeof block === 'object') : []
}

function mediaValue(value: unknown) {
  if (!value || typeof value !== 'object') return null
  const media = value as any
  if (!media.url) return null
  return {
    url: String(media.url),
    alt: String(media.alt || ''),
  }
}

export function ContentBlockRenderer({
  blocks,
  relatedPostLookup = [],
  locale = 'en',
}: {
  blocks: unknown
  relatedPostLookup?: BlogPostSummary[]
  locale?: string
}) {
  const items = blocksArray(blocks)
  if (items.length === 0) return null

  return (
    <div className="mt-12 grid gap-8">
      {items.map((block, index) => (
        <BlockView key={block.id || `${block.blockType}-${index}`} block={block} relatedPostLookup={relatedPostLookup} locale={locale} />
      ))}
    </div>
  )
}

function BlockView({ block, relatedPostLookup, locale }: { block: Record<string, any>; relatedPostLookup: BlogPostSummary[]; locale: string }) {
  switch (block.blockType) {
    case 'calloutBlock':
      return (
        <aside className="rounded-3xl border border-sky-100 bg-sky-50 p-6">
          <div className="mb-3 flex items-center gap-3 text-primary-700">
            <Lightbulb className="h-5 w-5" />
            <strong className="text-sm font-black uppercase tracking-normal">{block.title || 'CloudTopia note'}</strong>
          </div>
          <p className="text-base leading-8 text-neutral-700">{block.content}</p>
        </aside>
      )
    case 'ctaInlineBlock':
    case 'servicePromoBlock':
      return (
        <aside className="rounded-3xl bg-neutral-950 p-7 text-white shadow-xl shadow-sky-950/15">
          <h3 className="text-2xl font-black tracking-normal">{block.title}</h3>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/75">{block.description}</p>
          {block.buttonUrl && (
            <Link
              href={block.buttonUrl}
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-xl bg-white px-5 text-sm font-black text-neutral-950 transition hover:bg-sky-100"
            >
              {block.buttonText || 'Talk to CloudTopia'}
              <ArrowRight className="h-4 w-4" />
            </Link>
          )}
        </aside>
      )
    case 'faqBlock':
      return (
        <section className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
          <h3 className="text-xl font-black tracking-normal text-neutral-950">{block.question}</h3>
          <p className="mt-3 text-base leading-8 text-neutral-700">{block.answer}</p>
        </section>
      )
    case 'comparisonTableBlock':
      return (
        <section>
          {block.title && <h3 className="mb-4 text-2xl font-black tracking-normal text-neutral-950">{block.title}</h3>}
          <div className="overflow-x-auto rounded-3xl border border-sky-100 bg-white">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-[#f4f1f8] text-neutral-950">
                <tr>
                  <th className="px-4 py-3 font-black">Feature</th>
                  <th className="px-4 py-3 font-black">Option A</th>
                  <th className="px-4 py-3 font-black">Option B</th>
                  <th className="px-4 py-3 font-black">Winner</th>
                </tr>
              </thead>
              <tbody>
                {(block.rows || []).map((row: any, index: number) => (
                  <tr key={row.id || index} className="border-t border-sky-50">
                    <td className="px-4 py-3 font-bold text-neutral-900">{row.feature}</td>
                    <td className="px-4 py-3 text-neutral-700">{row.optionA}</td>
                    <td className="px-4 py-3 text-neutral-700">{row.optionB}</td>
                    <td className="px-4 py-3 font-black text-primary-700">{row.winner}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )
    case 'prosConsBlock':
      return (
        <section className="grid gap-5 md:grid-cols-2">
          <ListPanel title="Pros" items={block.pros} positive />
          <ListPanel title="Cons" items={block.cons} />
        </section>
      )
    case 'stepProcessBlock':
      return (
        <section className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
          {block.title && <h3 className="text-2xl font-black tracking-normal text-neutral-950">{block.title}</h3>}
          <div className="mt-5 grid gap-4">
            {(block.steps || []).map((step: any, index: number) => (
              <div key={step.id || index} className="grid gap-3 rounded-2xl bg-[#f4f1f8] p-4 sm:grid-cols-[44px_1fr]">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-600 text-sm font-black text-white">
                  {index + 1}
                </span>
                <span>
                  <strong className="block text-lg font-black text-neutral-950">{step.title}</strong>
                  <span className="mt-1 block text-sm leading-6 text-neutral-600">{step.description}</span>
                </span>
              </div>
            ))}
          </div>
        </section>
      )
    case 'statBlock':
      return (
        <aside className="rounded-3xl border border-sky-100 bg-white p-8 text-center shadow-sm">
          <strong className="block text-5xl font-black text-primary-700">{block.statNumber}</strong>
          <span className="mt-2 block text-lg font-black text-neutral-950">{block.statLabel}</span>
          <p className="mx-auto mt-3 max-w-xl text-base leading-7 text-neutral-600">{block.description}</p>
        </aside>
      )
    case 'imageWithCaptionBlock': {
      const media = mediaValue(block.image)
      if (!media) return null
      return (
        <figure className={block.layout === 'wide' ? 'md:-mx-10' : ''}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-sky-50 shadow-lg">
            <Image src={media.url} alt={block.alt || media.alt} fill sizes="(max-width: 1024px) 100vw, 840px" className="object-cover" />
          </div>
          {block.caption && <figcaption className="mt-3 text-center text-sm font-semibold text-neutral-500">{block.caption}</figcaption>}
        </figure>
      )
    }
    case 'codeSnippetBlock':
      return (
        <section className="overflow-hidden rounded-3xl bg-neutral-950 shadow-xl">
          {block.filename && <div className="border-b border-white/10 px-5 py-3 text-sm font-black text-sky-200">{block.filename}</div>}
          <pre className="overflow-x-auto p-5 text-sm leading-7 text-sky-100">
            <code>{block.code}</code>
          </pre>
          {block.explanation && <p className="border-t border-white/10 px-5 py-4 text-sm leading-6 text-white/70">{block.explanation}</p>}
        </section>
      )
    case 'leadMagnetBlock':
      return (
        <aside className="rounded-3xl border border-primary-200 bg-gradient-to-br from-sky-50 to-white p-7">
          <h3 className="text-2xl font-black tracking-normal text-neutral-950">{block.title}</h3>
          <p className="mt-3 text-base leading-7 text-neutral-600">{block.description}</p>
          <Link href="#newsletter" className="mt-6 inline-flex h-12 items-center rounded-xl bg-primary-600 px-5 text-sm font-black text-white">
            {block.buttonText || 'Get the resource'}
          </Link>
        </aside>
      )
    case 'relatedPostsManualBlock':
      return relatedPostLookup.length ? (
        <section className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
          <h3 className="text-2xl font-black tracking-normal text-neutral-950">
            {locale === 'ar' ? 'مقالات ذات صلة' : 'Related reading'}
          </h3>
          <div className="mt-5 grid gap-3">
            {relatedPostLookup.slice(0, 3).map((post) => (
              <Link key={post.id} href={`/articles/${post.slug}`} className="font-black text-primary-700 hover:text-primary-900">
                {post.title}
              </Link>
            ))}
          </div>
        </section>
      ) : null
    default:
      return null
  }
}

function ListPanel({ title, items, positive = false }: { title: string; items: any[]; positive?: boolean }) {
  const Icon = positive ? Check : X
  return (
    <div className="rounded-3xl border border-sky-100 bg-white p-6 shadow-sm">
      <h3 className="text-2xl font-black tracking-normal text-neutral-950">{title}</h3>
      <ul className="mt-4 space-y-3">
        {(items || []).map((item, index) => (
          <li key={item.id || index} className="flex gap-3 text-base leading-7 text-neutral-700">
            <Icon className={`mt-1 h-5 w-5 flex-none ${positive ? 'text-emerald-600' : 'text-rose-600'}`} />
            {item.item}
          </li>
        ))}
      </ul>
    </div>
  )
}
