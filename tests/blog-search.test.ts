import assert from 'node:assert/strict'
import test from 'node:test'
import { filterAndSortBlogPosts } from '../lib/blog/search.ts'

const posts = [
  {
    id: 1,
    title: 'How CRM Systems Help Small Businesses Grow',
    excerpt: 'CRM systems keep leads, follow-ups, and sales operations visible.',
    shortExcerpt: 'CRM systems keep sales visible.',
    slug: 'crm-growth',
    author: { name: 'CloudTopia Editorial Team', slug: 'editorial-team' },
    category: { name: 'CRM & ERP', slug: 'crm-erp' },
    tags: [{ name: 'CRM', slug: 'crm' }],
    serviceFocus: ['crm', 'business_systems'],
    contentType: 'guide',
    featured: true,
    pinned: false,
    trending: true,
    viewsCount: 120,
    publishedAt: '2026-05-22T12:00:00.000Z',
  },
  {
    id: 2,
    title: 'AI Automation Ideas for Startups and Service Businesses',
    excerpt: 'Practical AI automation ideas for founders and service teams.',
    shortExcerpt: 'Practical AI automation ideas.',
    slug: 'ai-automation',
    author: { name: 'CloudTopia Editorial Team', slug: 'editorial-team' },
    category: { name: 'AI Solutions', slug: 'ai-solutions' },
    tags: [{ name: 'AI Automation', slug: 'ai-automation' }],
    serviceFocus: ['ai', 'automation'],
    contentType: 'article',
    featured: false,
    pinned: false,
    trending: false,
    viewsCount: 40,
    publishedAt: '2026-05-24T12:00:00.000Z',
  },
  {
    id: 3,
    title: 'Website vs Web Application',
    excerpt: 'A decision guide for choosing the right digital product.',
    shortExcerpt: 'A decision guide.',
    slug: 'website-vs-web-app',
    author: { name: 'CloudTopia Editorial Team', slug: 'editorial-team' },
    category: { name: 'Web Development', slug: 'web-development' },
    tags: [{ name: 'Website Strategy', slug: 'website-strategy' }],
    serviceFocus: ['websites', 'web_apps'],
    contentType: 'comparison',
    featured: false,
    pinned: true,
    trending: false,
    viewsCount: 80,
    publishedAt: '2026-05-23T12:00:00.000Z',
  },
]

test('filterAndSortBlogPosts searches title excerpt category tags author and service focus', () => {
  assert.deepEqual(filterAndSortBlogPosts(posts as any, { search: 'founders' }).map((post) => post.slug), ['ai-automation'])
  assert.deepEqual(filterAndSortBlogPosts(posts as any, { search: 'crm' }).map((post) => post.slug), ['crm-growth'])
  assert.deepEqual(filterAndSortBlogPosts(posts as any, { search: 'web_apps' }).map((post) => post.slug), ['website-vs-web-app'])
})

test('filterAndSortBlogPosts filters by category tag content type and service focus', () => {
  assert.deepEqual(filterAndSortBlogPosts(posts as any, { category: 'ai-solutions' }).map((post) => post.slug), ['ai-automation'])
  assert.deepEqual(filterAndSortBlogPosts(posts as any, { tag: 'website-strategy' }).map((post) => post.slug), ['website-vs-web-app'])
  assert.deepEqual(filterAndSortBlogPosts(posts as any, { contentType: 'guide' }).map((post) => post.slug), ['crm-growth'])
  assert.deepEqual(filterAndSortBlogPosts(posts as any, { serviceFocus: 'automation' }).map((post) => post.slug), ['ai-automation'])
})

test('filterAndSortBlogPosts supports featured popular guides and latest sorting', () => {
  assert.deepEqual(filterAndSortBlogPosts(posts as any, { sort: 'featured' }).map((post) => post.slug), ['website-vs-web-app', 'crm-growth', 'ai-automation'])
  assert.deepEqual(filterAndSortBlogPosts(posts as any, { sort: 'popular' }).map((post) => post.slug), ['crm-growth', 'website-vs-web-app', 'ai-automation'])
  assert.deepEqual(filterAndSortBlogPosts(posts as any, { sort: 'guides' }).map((post) => post.slug), ['crm-growth'])
  assert.deepEqual(filterAndSortBlogPosts(posts as any, { sort: 'latest' }).map((post) => post.slug), ['ai-automation', 'website-vs-web-app', 'crm-growth'])
})
