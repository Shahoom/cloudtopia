import { test } from 'node:test'
import assert from 'node:assert/strict'
import { pickProjectsForService } from '../lib/services/related-projects'

const P = (id: string, rel: string[], featured = false) =>
  ({ id, relatedServiceSlugs: rel, featured, category: '', type: '', title: id, problem: '', solution: '', features: [], image: '', metrics: { label: '', value: '' } } as any)

test('exact sub-service match wins', () => {
  const all = [P('a', ['corporate-website-development']), P('b', ['ecommerce-development'])]
  const r = pickProjectsForService(all, { serviceSlug: 'corporate-website-development', pillarSlug: 'website-development', limit: 6 })
  assert.deepEqual(r.map((p) => p.id), ['a'])
})

test('falls back to pillar when no exact match', () => {
  const all = [P('a', ['website-development']), P('b', ['ecommerce-development'])]
  const r = pickProjectsForService(all, { serviceSlug: 'landing-page-development', pillarSlug: 'website-development', limit: 6 })
  assert.deepEqual(r.map((p) => p.id), ['a'])
})

test('falls back to featured (closest) when nothing matches — never empty', () => {
  const all = [P('a', ['x'], true), P('b', ['y'])]
  const r = pickProjectsForService(all, { serviceSlug: 'nope', pillarSlug: 'also-nope', limit: 6 })
  assert.ok(r.length >= 1)
  assert.equal(r[0].id, 'a')
})
