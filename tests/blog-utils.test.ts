import assert from 'node:assert/strict'
import test from 'node:test'
import {
  buildTableOfContents,
  calculateReadingTime,
  extractLexicalPlainText,
  normalizeMediaUrl,
  slugify,
} from '../lib/blog/utils.ts'

const lexicalContent = {
  root: {
    type: 'root',
    children: [
      {
        type: 'heading',
        tag: 'h2',
        children: [{ type: 'text', text: 'Why systems matter' }],
      },
      {
        type: 'paragraph',
        children: [
          { type: 'text', text: 'A good CRM keeps every follow-up visible.' },
          { type: 'linebreak' },
          { type: 'text', text: 'Automation turns repeated steps into workflows.' },
        ],
      },
      {
        type: 'heading',
        tag: 'h3',
        children: [{ type: 'text', text: 'AI support' }],
      },
    ],
  },
}

test('slugify creates stable lowercase URL slugs', () => {
  assert.equal(slugify(' Website vs Web Application: What Should Your Company Build? '), 'website-vs-web-application-what-should-your-company-build')
  assert.equal(slugify('CRM & ERP for Small Businesses'), 'crm-erp-for-small-businesses')
  assert.equal(slugify(''), 'untitled')
})

test('extractLexicalPlainText walks nested lexical nodes', () => {
  assert.equal(
    extractLexicalPlainText(lexicalContent),
    'Why systems matter A good CRM keeps every follow-up visible. Automation turns repeated steps into workflows. AI support',
  )
})

test('calculateReadingTime returns at least one minute', () => {
  assert.equal(calculateReadingTime('Short article.'), 1)
  assert.equal(calculateReadingTime(Array.from({ length: 430 }, (_, index) => `word${index}`).join(' ')), 2)
})

test('normalizeMediaUrl rewrites Payload API media URLs for public rendering', () => {
  assert.equal(normalizeMediaUrl('/api/media/file/cloud cover.avif'), '/uploads/cloud%20cover.avif')
  assert.equal(normalizeMediaUrl('/uploads/already-public.avif'), '/uploads/already-public.avif')
  assert.equal(normalizeMediaUrl(null), '')
})

test('buildTableOfContents extracts h2 and h3 headings with stable ids', () => {
  assert.deepEqual(buildTableOfContents(lexicalContent), [
    { id: 'why-systems-matter', title: 'Why systems matter', level: 2 },
    { id: 'ai-support', title: 'AI support', level: 3 },
  ])
})
