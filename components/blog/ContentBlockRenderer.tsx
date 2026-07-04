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

const EDITORIAL_STYLE = {
  paper: { background: 'var(--ed-paper)' },
  paper2: { background: 'var(--ed-paper-2)' },
  ink: { color: 'var(--ed-ink)' },
  body: { color: 'var(--ed-body)' },
  graphite: { color: 'var(--ed-graphite)' },
} as const

function BlockView({ block, relatedPostLookup, locale }: { block: Record<string, any>; relatedPostLookup: BlogPostSummary[]; locale: string }) {
  switch (block.blockType) {
    case 'calloutBlock':
      return (
        <aside
          className="border border-[var(--ed-rule)] border-s-2 border-s-[var(--ed-accent)] p-6"
          style={EDITORIAL_STYLE.paper2}
        >
          <div className="mb-3 flex items-center gap-2.5" style={{ color: 'var(--ed-accent-ink)' }}>
            <Lightbulb className="h-4 w-4" />
            <span className="ed-eyebrow" style={{ color: 'var(--ed-accent-ink)' }}>
              {block.title || (locale === 'ar' ? 'ملاحظة CloudTopia' : 'CloudTopia note')}
            </span>
          </div>
          <p className="text-base leading-8" style={EDITORIAL_STYLE.body}>{block.content}</p>
        </aside>
      )
    case 'ctaInlineBlock':
    case 'servicePromoBlock':
      return (
        <aside className="rounded-xl p-7 text-white" style={{ background: 'var(--ed-ink)' }}>
          <h3 className="ed-serif text-2xl" style={{ color: 'var(--ed-paper)' }}>{block.title}</h3>
          <p className="mt-3 max-w-2xl text-base leading-7 text-white/75">{block.description}</p>
          {block.buttonUrl && (
            <Link
              href={block.buttonUrl}
              className="mt-6 inline-flex h-12 items-center gap-2 rounded-lg px-5 text-sm font-semibold transition hover:opacity-90"
              style={{ background: 'var(--ed-paper)', color: 'var(--ed-ink)' }}
            >
              {block.buttonText || (locale === 'ar' ? 'تحدث إلى CloudTopia' : 'Talk to CloudTopia')}
              <ArrowRight className="h-4 w-4 rtl:-scale-x-100" />
            </Link>
          )}
        </aside>
      )
    case 'faqBlock':
      return (
        <section className="border border-[var(--ed-rule)] p-6" style={EDITORIAL_STYLE.paper}>
          <h3 className="ed-serif text-xl">{block.question}</h3>
          <p className="mt-3 text-base leading-8" style={EDITORIAL_STYLE.body}>{block.answer}</p>
        </section>
      )
    case 'comparisonTableBlock':
      return (
        <section>
          {block.title && <h3 className="ed-serif mb-4 text-2xl">{block.title}</h3>}
          <div className="overflow-x-auto border border-[var(--ed-rule)]" style={EDITORIAL_STYLE.paper}>
            <table className="min-w-full text-start text-sm">
              <thead className="border-b-2 border-[var(--ed-rule-ink)]">
                <tr>
                  <th className="ed-eyebrow px-4 py-3 text-start" style={EDITORIAL_STYLE.ink}>{block.featureLabel || (locale === 'ar' ? 'الميزة' : 'Feature')}</th>
                  <th className="ed-eyebrow px-4 py-3 text-start" style={EDITORIAL_STYLE.ink}>{block.optionALabel || (locale === 'ar' ? 'الخيار الأول' : 'Option A')}</th>
                  <th className="ed-eyebrow px-4 py-3 text-start" style={EDITORIAL_STYLE.ink}>{block.optionBLabel || (locale === 'ar' ? 'الخيار الثاني' : 'Option B')}</th>
                  <th className="ed-eyebrow px-4 py-3 text-start" style={EDITORIAL_STYLE.ink}>{locale === 'ar' ? 'الأفضل' : 'Winner'}</th>
                </tr>
              </thead>
              <tbody>
                {(block.rows || []).map((row: any, index: number) => (
                  <tr key={row.id || index} className="border-t border-[var(--ed-rule)]">
                    <td className="px-4 py-3 font-semibold" style={EDITORIAL_STYLE.ink}>{row.feature}</td>
                    <td className="px-4 py-3" style={EDITORIAL_STYLE.body}>{row.optionA}</td>
                    <td className="px-4 py-3" style={EDITORIAL_STYLE.body}>{row.optionB}</td>
                    <td className="px-4 py-3 font-semibold" style={{ color: 'var(--ed-accent-ink)' }}>{row.winner}</td>
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
          <ListPanel title={locale === 'ar' ? 'المزايا' : 'Pros'} items={block.pros} positive />
          <ListPanel title={locale === 'ar' ? 'العيوب' : 'Cons'} items={block.cons} />
        </section>
      )
    case 'stepProcessBlock':
      return (
        <section className="border border-[var(--ed-rule)] p-6" style={EDITORIAL_STYLE.paper}>
          {block.title && <h3 className="ed-serif text-2xl">{block.title}</h3>}
          <div className="mt-5 grid gap-0">
            {(block.steps || []).map((step: any, index: number) => (
              <div
                key={step.id || index}
                className="grid gap-4 border-t border-[var(--ed-rule)] py-4 first:border-t-0 first:pt-0 sm:grid-cols-[44px_1fr]"
              >
                <span
                  className="ed-serif flex h-11 w-11 items-center justify-center border border-[var(--ed-rule)] text-lg"
                  style={{ color: 'var(--ed-accent-ink)', background: 'var(--ed-paper-2)' }}
                >
                  {index + 1}
                </span>
                <span>
                  <strong className="ed-serif block text-lg">{step.title}</strong>
                  <span className="mt-1 block text-sm leading-6" style={EDITORIAL_STYLE.graphite}>{step.description}</span>
                </span>
              </div>
            ))}
          </div>
        </section>
      )
    case 'statBlock':
      return (
        <aside className="border border-[var(--ed-rule)] p-8 text-center" style={EDITORIAL_STYLE.paper}>
          <strong className="ed-serif block text-6xl leading-none" style={{ color: 'var(--ed-ink)' }}>
            {block.statNumber}
          </strong>
          <span className="ed-eyebrow mt-3 block" style={{ color: 'var(--ed-accent-ink)' }}>{block.statLabel}</span>
          <p className="mx-auto mt-3 max-w-xl text-base leading-7" style={EDITORIAL_STYLE.graphite}>{block.description}</p>
        </aside>
      )
    case 'imageWithCaptionBlock': {
      const media = mediaValue(block.image)
      if (!media) return null
      return (
        <figure className={block.layout === 'wide' ? 'md:-mx-10' : ''}>
          <div
            className="relative aspect-[16/10] overflow-hidden rounded-[10px] border border-[var(--ed-rule)]"
            style={EDITORIAL_STYLE.paper2}
          >
            <Image src={media.url} alt={block.alt || media.alt} fill sizes="(max-width: 1024px) 100vw, 840px" className="object-cover" />
          </div>
          {block.caption && (
            <figcaption
              className="mt-3 text-center text-sm"
              style={{ fontFamily: 'var(--ed-serif)', fontStyle: locale === 'ar' ? 'normal' : 'italic', color: 'var(--ed-muted)' }}
            >
              {block.caption}
            </figcaption>
          )}
        </figure>
      )
    }
    case 'codeSnippetBlock':
      return (
        <section className="overflow-hidden rounded-[10px]" style={{ background: 'var(--ed-code-bg)', color: 'var(--ed-code-fg)' }}>
          {block.filename && (
            <div className="ed-meta border-b border-white/10 px-5 py-3 text-start" style={{ color: 'rgba(231,227,245,0.6)' }}>
              {block.filename}
            </div>
          )}
          <pre className="overflow-x-auto p-5 text-sm leading-7" style={{ color: 'var(--ed-code-fg)' }}>
            <code>{block.code}</code>
          </pre>
          {block.explanation && <p className="border-t border-white/10 px-5 py-4 text-sm leading-6 text-white/70">{block.explanation}</p>}
        </section>
      )
    case 'leadMagnetBlock':
      return (
        <aside
          className="border border-[var(--ed-rule)] border-s-2 border-s-[var(--ed-accent)] p-7"
          style={EDITORIAL_STYLE.paper2}
        >
          <h3 className="ed-serif text-2xl">{block.title}</h3>
          <p className="mt-3 text-base leading-7" style={EDITORIAL_STYLE.graphite}>{block.description}</p>
          <Link
            href="#newsletter"
            className="mt-6 inline-flex h-12 items-center rounded-lg px-5 text-sm font-semibold text-white transition hover:opacity-90"
            style={{ backgroundColor: 'var(--ed-ink)' }}
          >
            {block.buttonText || (locale === 'ar' ? 'احصل على المورد' : 'Get the resource')}
          </Link>
        </aside>
      )
    case 'relatedPostsManualBlock':
      return relatedPostLookup.length ? (
        <section className="border border-[var(--ed-rule)] p-6" style={EDITORIAL_STYLE.paper}>
          <p className="ed-eyebrow mb-4">
            {locale === 'ar' ? 'مقالات ذات صلة' : 'Related reading'}
          </p>
          <div className="grid">
            {relatedPostLookup.slice(0, 3).map((post) => (
              <Link
                key={post.id}
                href={`/articles/${post.slug}`}
                className="ed-serif border-t border-[var(--ed-rule)] py-3 text-lg transition-colors first:border-t-0 first:pt-0 hover:text-[color:var(--ed-accent-ink)]"
              >
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
    <div className="border border-[var(--ed-rule)] p-6" style={{ background: 'var(--ed-paper)' }}>
      <h3 className="ed-serif text-2xl">{title}</h3>
      <ul className="mt-4 space-y-3">
        {(items || []).map((item, index) => (
          <li key={item.id || index} className="flex gap-3 text-base leading-7" style={{ color: 'var(--ed-body)' }}>
            <Icon className={`mt-1 h-5 w-5 flex-none ${positive ? 'text-emerald-600' : 'text-rose-600'}`} />
            {item.item}
          </li>
        ))}
      </ul>
    </div>
  )
}
