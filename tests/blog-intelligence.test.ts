import assert from 'node:assert/strict'
import test from 'node:test'
import {
  calculateBlogContentScores,
  extractFAQSchemaItems,
  summarizeContentBlocks,
} from '../lib/blog/intelligence.ts'

const lexicalContent = {
  root: {
    children: [
      { type: 'heading', tag: 'h2', children: [{ type: 'text', text: 'Strategy first' }] },
      {
        type: 'paragraph',
        children: [{ type: 'text', text: Array.from({ length: 420 }, (_, index) => `word${index}`).join(' ') }],
      },
    ],
  },
}

const blocks = [
  {
    blockType: 'faqBlock',
    question: 'How long does a business dashboard take?',
    answer: 'Most focused dashboards can launch in four to eight weeks.',
    includeInSchema: true,
  },
  {
    blockType: 'ctaInlineBlock',
    title: 'Need a dashboard?',
    buttonText: 'Talk to CloudTopia',
  },
  {
    blockType: 'calloutBlock',
    type: 'cloudtopia-note',
    title: 'CloudTopia note',
  },
]

test('calculateBlogContentScores rewards complete editorial posts', () => {
  const result = calculateBlogContentScores({
    title: 'How Business Dashboards Help Founders Make Better Decisions',
    excerpt: 'Dashboards help founders see sales, operations, and support signals in one place.',
    focusKeyword: 'business dashboards',
    metaTitle: 'Business Dashboards for Founders | CloudTopia',
    metaDescription: 'Learn how business dashboards help founders make better decisions with real-time operational data.',
    coverImageAlt: 'Founder reviewing a business dashboard',
    category: 'Business Systems',
    author: 'CloudTopia Editorial Team',
    publishedAt: '2026-05-24T12:00:00.000Z',
    showCTA: true,
    content: lexicalContent,
    contentBlocks: blocks,
    tags: ['Dashboards', 'Business Systems'],
    internalLinks: ['/services', '/services/business-systems-development'],
  })

  assert.equal(result.wordCount, 422)
  assert.equal(result.hasFAQ, true)
  assert.equal(result.missing.length, 0)
  assert.ok(result.contentScore >= 90)
  assert.ok(result.seoScore >= 90)
  assert.ok(result.readabilityScore >= 70)
})

test('calculateBlogContentScores reports actionable missing items', () => {
  const result = calculateBlogContentScores({
    title: 'Short',
    excerpt: '',
    content: { root: { children: [{ type: 'paragraph', children: [{ type: 'text', text: 'Too short.' }] }] } },
    contentBlocks: [],
  })

  assert.ok(result.missing.includes('metaDescription'))
  assert.ok(result.missing.includes('coverImageAlt'))
  assert.ok(result.missing.includes('category'))
  assert.ok(result.missing.includes('author'))
  assert.ok(result.missing.includes('cta'))
  assert.ok(result.missing.includes('faq'))
  assert.ok(result.contentScore < 60)
})

test('summarizeContentBlocks counts schema-ready editorial blocks', () => {
  assert.deepEqual(summarizeContentBlocks(blocks), {
    callouts: 1,
    ctas: 1,
    faqs: 1,
    leadMagnets: 0,
    stats: 0,
  })
})

test('extractFAQSchemaItems returns only schema-enabled FAQs', () => {
  assert.deepEqual(extractFAQSchemaItems(blocks), [
    {
      question: 'How long does a business dashboard take?',
      answer: 'Most focused dashboards can launch in four to eight weeks.',
    },
  ])
})
