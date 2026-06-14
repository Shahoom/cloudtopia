import { test } from 'node:test'
import assert from 'node:assert/strict'
import { bucketTopics } from '../lib/cms/admin/topics.ts'
import { computeDelta, countMissingArSiblings } from '../lib/cms/admin/metrics.ts'

test('bucketTopics counts service categories across EN/AR transcripts', () => {
  const result = bucketTopics([
    'Do you build an online store? I need ecommerce',
    'هل تبنون متجر إلكتروني؟',
    'I want a CRM system for my team',
    'what is the price and budget?',
  ])
  const map = Object.fromEntries(result.map((r) => [r.category, r.count]))
  assert.equal(map['E-commerce'], 2)
  assert.equal(map['CRM / ERP'], 1)
  assert.equal(map['Pricing'], 1)
})

test('bucketTopics returns categories sorted by count desc', () => {
  const result = bucketTopics(['store', 'store', 'crm'])
  assert.equal(result[0].category, 'E-commerce')
  assert.ok(result[0].count >= result[result.length - 1].count)
})

test('bucketTopics ignores empty input', () => {
  assert.deepEqual(bucketTopics([]), [])
})

test('computeDelta reports direction and rounded percent', () => {
  assert.deepEqual(computeDelta(13, 10), { pct: 30, direction: 'up' })
  assert.deepEqual(computeDelta(8, 10), { pct: 20, direction: 'down' })
  assert.deepEqual(computeDelta(10, 10), { pct: 0, direction: 'flat' })
})

test('computeDelta handles zero previous (new activity) as up 100', () => {
  assert.deepEqual(computeDelta(5, 0), { pct: 100, direction: 'up' })
  assert.deepEqual(computeDelta(0, 0), { pct: 0, direction: 'flat' })
})

test('countMissingArSiblings counts EN posts with no AR sibling by slug', () => {
  const posts = [
    { slug: 'a', locale: 'en' },
    { slug: 'a', locale: 'ar' },
    { slug: 'b', locale: 'en' },
    { slug: 'c', locale: 'en' },
    { slug: 'c', locale: 'ar' },
  ]
  assert.equal(countMissingArSiblings(posts), 1)
})
