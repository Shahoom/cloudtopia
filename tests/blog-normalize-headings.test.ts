import assert from 'node:assert/strict'
import test from 'node:test'
import { normalizeHeadings } from '../lib/blog/normalize-headings.ts'

function heading(tag: string, text = 'x') {
  return { type: 'heading', tag, children: [{ type: 'text', text }] }
}
function para(text = 'p') {
  return { type: 'paragraph', children: [{ type: 'text', text }] }
}
function doc(children: unknown[]) {
  return { root: { type: 'root', children } }
}

test('demotes a single in-body H1 to H2', () => {
  const r = normalizeHeadings(doc([heading('h1', 'A'), para()]))
  assert.equal(r.demotedH1, 1)
  const tags = (r.value as any).root.children.filter((c: any) => c.type === 'heading').map((c: any) => c.tag)
  assert.deepEqual(tags, ['h2'])
})

test('demotes every in-body H1', () => {
  const r = normalizeHeadings(doc([heading('h1'), para(), heading('h1'), heading('h2')]))
  assert.equal(r.demotedH1, 2)
  const tags = (r.value as any).root.children.filter((c: any) => c.type === 'heading').map((c: any) => c.tag)
  assert.deepEqual(tags, ['h2', 'h2', 'h2'])
})

test('fixes a heading-level skip (H2 then H4 -> H2 then H3)', () => {
  const r = normalizeHeadings(doc([heading('h2'), heading('h4')]))
  assert.equal(r.fixedSkips, 1)
  const tags = (r.value as any).root.children.map((c: any) => c.tag)
  assert.deepEqual(tags, ['h2', 'h3'])
})

test('leaves a clean hierarchy untouched', () => {
  const r = normalizeHeadings(doc([heading('h2'), heading('h3'), heading('h2')]))
  assert.equal(r.demotedH1, 0)
  assert.equal(r.fixedSkips, 0)
  assert.equal(r.headingCount, 3)
})

test('does not mutate the input object', () => {
  const input = doc([heading('h1')])
  normalizeHeadings(input)
  assert.equal((input as any).root.children[0].tag, 'h1')
})

test('handles non-object input safely', () => {
  const r = normalizeHeadings(null)
  assert.equal(r.value, null)
  assert.equal(r.headingCount, 0)
})
