// Dependency-free plain-text extraction from a Lexical editor state. Shared by
// server endpoints that need the article body as text (e.g. SEO optimization).
export function lexicalToPlainText(content: unknown): string {
  const acc: string[] = []
  const walk = (node: any) => {
    if (!node || typeof node !== 'object') return
    if (typeof node.text === 'string') acc.push(node.text)
    if (Array.isArray(node.children)) for (const c of node.children) walk(c)
  }
  walk((content as any)?.root)
  return acc.join(' ').replace(/\s+/g, ' ').trim()
}
