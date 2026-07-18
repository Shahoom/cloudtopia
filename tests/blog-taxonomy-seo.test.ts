import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import {
  buildCategoryTaxonomyCopy,
  buildTagTaxonomyCopy,
} from '../lib/blog/taxonomy-seo'

test('e-commerce category and tag target different search intents', () => {
  const category = buildCategoryTaxonomyCopy({
    locale: 'en',
    slug: 'e-commerce',
    name: 'E-Commerce',
  })
  const tag = buildTagTaxonomyCopy({
    locale: 'en',
    slug: 'e-commerce',
    name: 'E-Commerce',
    postCount: 2,
  })

  assert.notEqual(category.title, tag.title)
  assert.notEqual(category.description, tag.description)
  assert.match(category.title, /Strategy/)
  assert.match(tag.title, /Guides/)
})

test('taxonomy fallbacks provide useful bilingual landing-page introductions', () => {
  const en = buildTagTaxonomyCopy({
    locale: 'en',
    slug: 'shopify',
    name: 'Shopify',
    postCount: 1,
  })
  const ar = buildTagTaxonomyCopy({
    locale: 'ar',
    slug: 'shopify',
    name: 'شوبيفاي',
    postCount: 1,
  })

  assert.ok(en.intro.length >= 120)
  assert.ok(ar.intro.length >= 100)
  assert.match(en.intro, /Shopify/)
  assert.match(ar.intro, /شوبيفاي/)
})

test('category copy preserves authored descriptions while using an intent-specific title', () => {
  const copy = buildCategoryTaxonomyCopy({
    locale: 'en',
    slug: 'cloud-technology',
    name: 'Cloud Technology',
    description: 'Authored cloud category description.',
    metaTitle: 'Cloud Infrastructure Insights',
    metaDescription: 'Authored cloud search description.',
  })

  assert.equal(copy.title, 'Cloud Infrastructure Insights')
  assert.equal(copy.description, 'Authored cloud search description.')
  assert.equal(copy.intro, 'Authored cloud category description.')
})

test('category pages stay indexable regardless of optional CMS taxonomy flags', () => {
  const categoryPage = readFileSync(
    path.join(process.cwd(), 'app/(frontend)/[locale]/articles/category/[slug]/page.tsx'),
    'utf8',
  )

  assert.doesNotMatch(categoryPage, /category\.seo\?\.noIndex/)
})
