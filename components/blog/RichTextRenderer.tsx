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
      return <p key={key}>{children}</p>
    case 'heading': {
      const title = textFromNode(node).trim()
      const tag = node.tag === 'h3' || node.tag === 'h4' ? node.tag : 'h2'
      // Keep the h2/h3 dedup counter identical to buildTableOfContents() in
      // lib/blog/utils.ts so every TOC anchor resolves. h4 (not in the TOC)
      // uses a separate counter and never perturbs the shared h2/h3 numbering.
      const id = tag === 'h4' ? getHeadingId(title, h4Counts) : getHeadingId(title, headingCounts)

      if (tag === 'h3') {
        return (
          <h3 key={key} id={id} className="scroll-mt-28">
            {children}
          </h3>
        )
      }
      if (tag === 'h4') {
        return (
          <h4 key={key} id={id} className="scroll-mt-28">
            {children}
          </h4>
        )
      }
      return (
        <h2 key={key} id={id} className="scroll-mt-28">
          {children}
        </h2>
      )
    }
    case 'quote':
      return <blockquote key={key}>{children}</blockquote>
    case 'list':
      return node.tag === 'ol' || node.listType === 'number' ? (
        <ol key={key}>{children}</ol>
      ) : (
        <ul key={key}>{children}</ul>
      )
    case 'listitem':
      return <li key={key}>{children}</li>
    case 'link': {
      const fields = typeof node.fields === 'object' && node.fields ? (node.fields as any) : {}
      const url = safeUrl(String(fields.url || node.url || '#'))
      const isExternal = /^https?:\/\//.test(url)
      if (isExternal) {
        return (
          <a key={key} href={url} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        )
      }
      return (
        <Link key={key} href={url}>
          {children}
        </Link>
      )
    }
    case 'upload': {
      const media = mediaFromUpload(node)
      if (!media) return null
      return (
        <figure key={key}>
          <div className="relative aspect-[16/10] overflow-hidden rounded-[10px]">
            <Image src={media.url} alt={media.alt} fill sizes="(max-width: 1024px) 100vw, 720px" className="object-cover" />
          </div>
          {media.alt && <figcaption>{media.alt}</figcaption>}
        </figure>
      )
    }
    case 'table':
      return (
        <div key={key} className="my-8 overflow-x-auto">
          <table>{children}</table>
        </div>
      )
    case 'tablerow':
      return <tr key={key}>{children}</tr>
    case 'tablecell':
      return <td key={key}>{children}</td>
    case 'block': {
      const fields = typeof node.fields === 'object' && node.fields ? (node.fields as any) : {}
      const code = String(fields.code || '')
      if (!code) return null
      return (
        <pre key={key}>
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

  return <div className="article-prose">{nodes.map((node, index) => renderNode(node, index, headingCounts, h4Counts))}</div>
}
