/**
 * Deterministic heading normalizer for a Payload Lexical rich-text value.
 *
 * The article page renders the post TITLE as the only <h1> (see ArticleHero),
 * so the body must not contain an H1. This pure function:
 *   1. Demotes any in-body H1 → H2.
 *   2. Fixes heading-level skips so depth never jumps by more than one
 *      (baseline level 1 = the page title). e.g. H2 then H4 → H2 then H3.
 *
 * Pure + JSON-serializable in/out so it runs in the admin client AND in tests.
 */

export type HeadingNormalizeResult = {
  value: unknown
  demotedH1: number
  fixedSkips: number
  headingCount: number
}

type LexNode = { type?: string; tag?: string; children?: unknown }

function collectHeadings(node: unknown, out: LexNode[]): void {
  if (!node || typeof node !== 'object') return
  const n = node as LexNode
  if (n.type === 'heading' && typeof n.tag === 'string') out.push(n)
  if (Array.isArray(n.children)) {
    for (const child of n.children) collectHeadings(child, out)
  }
}

export function normalizeHeadings(input: unknown): HeadingNormalizeResult {
  if (!input || typeof input !== 'object') {
    return { value: input, demotedH1: 0, fixedSkips: 0, headingCount: 0 }
  }

  const value = JSON.parse(JSON.stringify(input)) as { root?: unknown }
  const headings: LexNode[] = []
  if (value.root) collectHeadings(value.root, headings)

  let demotedH1 = 0
  let fixedSkips = 0

  // Pass 1 — demote every in-body H1 to H2.
  for (const h of headings) {
    if (h.tag === 'h1') {
      h.tag = 'h2'
      demotedH1++
    }
  }

  // Pass 2 — no level skips. Title is level 1; first body heading may be H2.
  let prev = 1
  for (const h of headings) {
    const lvl = Number.parseInt(String(h.tag).slice(1), 10)
    if (!Number.isFinite(lvl)) continue
    const maxAllowed = prev + 1
    if (lvl > maxAllowed) {
      const fixed = `h${maxAllowed}`
      if (h.tag !== fixed) {
        h.tag = fixed
        fixedSkips++
      }
      prev = maxAllowed
    } else {
      prev = lvl
    }
  }

  return { value, demotedH1, fixedSkips, headingCount: headings.length }
}
