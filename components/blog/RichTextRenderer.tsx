import Image from 'next/image'
import Link from 'next/link'
import { slugify, type LexicalNode } from '@/lib/blog/utils'

function textFromNode(node: LexicalNode): string {
  if (typeof node.text === 'string') return node.text
  return (node.children || []).map(textFromNode).join(' ')
}

function getHeadingId(title: string, counts: Map<string, number>) {
  const base = slugify(title)
  const count = counts.get(base) || 0
  counts.set(base, count + 1)
  return count === 0 ? base : `${base}-${count + 1}`
}

// Only allow safe link schemes. A stored 'javascript:...' (or 'data:', 'vbscript:'
// etc.) URL must never become a clickable script link. Permit http(s), mailto,
// tel, and relative URLs ('/' or '#'); fall back to '#' for anything else.
function safeUrl(raw: string): string {
  const url = raw.trim()
  if (!url) return '#'
  if (/^(https?:\/\/|mailto:|tel:)/i.test(url)) return url
  if (/^[/#]/.test(url)) return url
  return '#'
}

function renderText(node: LexicalNode, key: string) {
  let content: React.ReactNode = node.text || ''
  const format = Number(node.format || 0)

  if (format & 16) content = <code>{content}</code>
  if (format & 8) content = <u>{content}</u>
  if (format & 4) content = <s>{content}</s>
  if (format & 2) content = <em>{content}</em>
  if (format & 1) content = <strong>{content}</strong>

  return <span key={key}>{content}</span>
}

function mediaFromUpload(node: LexicalNode) {
  const value = typeof node.value === 'object' && node.value ? (node.value as any) : null
  if (!value?.url) return null

  return {
    url: String(value.url),
    alt: String(value.alt || value.caption || ''),
    width: typeof value.width === 'number' ? value.width : undefined,
    height: typeof value.height === 'number' ? value.height : undefined,
  }
}

function renderNode(
  node: LexicalNode,
  index: number,
  headingCounts: Map<string, number>,
  h4Counts: Map<string, number>,
): React.ReactNode {
  const key = `${node.type || 'node'}-${index}`
  const children = (node.children || []).map((child, childIndex) =>
    renderNode(child, childIndex, headingCounts, h4Counts),
  )

  switch (node.type) {
    case 'root':
      return children
    case 'text':
      return renderText(node, key)
    case 'linebreak':
      return <br key={key} />
    case 'paragraph':
      return (
        <p key={key} className="mb-7 text-lg leading-9 text-neutral-700">
          {children}
        </p>
      )
    case 'heading': {
      const title = textFromNode(node).trim()
      const tag = node.tag === 'h3' || node.tag === 'h4' ? node.tag : 'h2'
      // Keep the h2/h3 dedup counter identical to buildTableOfContents() in
      // lib/blog/utils.ts so every TOC anchor resolves. h4 (not in the TOC)
      // uses a separate counter and never perturbs the shared h2/h3 numbering.
      const id = tag === 'h4' ? getHeadingId(title, h4Counts) : getHeadingId(title, headingCounts)
      const className =
        tag === 'h2'
          ? 'mb-5 mt-14 scroll-mt-28 text-3xl font-black leading-tight tracking-normal text-neutral-950 md:text-4xl'
          : tag === 'h3'
            ? 'mb-4 mt-10 scroll-mt-28 text-2xl font-black leading-tight tracking-normal text-neutral-950'
            : 'mb-3 mt-8 scroll-mt-28 text-xl font-black leading-tight tracking-normal text-neutral-950'

      if (tag === 'h3') {
        return (
          <h3 key={key} id={id} className={className}>
            {children}
          </h3>
        )
      }
      if (tag === 'h4') {
        return (
          <h4 key={key} id={id} className={className}>
            {children}
          </h4>
        )
      }
      return (
        <h2 key={key} id={id} className={className}>
          {children}
        </h2>
      )
    }
    case 'quote':
      return (
        <blockquote key={key} className="my-10 rounded-3xl border-l-4 border-primary-600 bg-sky-50 p-7 text-xl font-bold leading-9 text-neutral-800">
          {children}
        </blockquote>
      )
    case 'list':
      return node.tag === 'ol' || node.listType === 'number' ? (
        <ol key={key} className="mb-8 list-decimal space-y-3 pl-7 text-lg leading-8 text-neutral-700">
          {children}
        </ol>
      ) : (
        <ul key={key} className="mb-8 list-disc space-y-3 pl-7 text-lg leading-8 text-neutral-700">
          {children}
        </ul>
      )
    case 'listitem':
      return <li key={key}>{children}</li>
    case 'link': {
      const fields = typeof node.fields === 'object' && node.fields ? (node.fields as any) : {}
      const url = safeUrl(String(fields.url || node.url || '#'))
      const isExternal = /^https?:\/\//.test(url)
      if (isExternal) {
        return (
          <a key={key} href={url} target="_blank" rel="noopener noreferrer" className="font-bold text-primary-700 underline decoration-sky-200 underline-offset-4">
            {children}
          </a>
        )
      }
      return (
        <Link key={key} href={url} className="font-bold text-primary-700 underline decoration-sky-200 underline-offset-4">
          {children}
        </Link>
      )
    }
    case 'upload': {
      const media = mediaFromUpload(node)
      if (!media) return null
      return (
        <figure key={key} className="my-10">
          <div className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-sky-50 shadow-lg">
            <Image src={media.url} alt={media.alt} fill sizes="(max-width: 1024px) 100vw, 760px" className="object-cover" />
          </div>
          {media.alt && <figcaption className="mt-3 text-center text-sm font-semibold text-neutral-500">{media.alt}</figcaption>}
        </figure>
      )
    }
    case 'table':
      return (
        <div key={key} className="my-10 overflow-x-auto rounded-2xl border border-neutral-200 bg-white">
          <table className="min-w-full divide-y divide-neutral-200 text-left text-sm">{children}</table>
        </div>
      )
    case 'tablerow':
      return <tr key={key}>{children}</tr>
    case 'tablecell':
      return <td key={key} className="border-b border-neutral-100 px-4 py-3 align-top text-neutral-700">{children}</td>
    case 'block': {
      const fields = typeof node.fields === 'object' && node.fields ? (node.fields as any) : {}
      const code = String(fields.code || '')
      if (!code) return null
      return (
        <pre key={key} className="my-8 overflow-x-auto rounded-2xl bg-neutral-950 p-5 text-sm leading-7 text-sky-100">
          <code>{code}</code>
        </pre>
      )
    }
    default:
      return children
  }
}

export function RichTextRenderer({ content }: { content: unknown }) {
  const headingCounts = new Map<string, number>()
  const h4Counts = new Map<string, number>()
  const root = content && typeof content === 'object' && 'root' in content ? (content as any).root : content
  const nodes = root && typeof root === 'object' && Array.isArray((root as LexicalNode).children) ? (root as LexicalNode).children || [] : []

  return <div className="blog-article-prose">{nodes.map((node, index) => renderNode(node, index, headingCounts, h4Counts))}</div>
}
