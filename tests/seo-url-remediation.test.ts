import assert from 'node:assert/strict'
import test from 'node:test'
import { NextRequest } from 'next/server'
import nextConfig from '../next.config.mjs'
import { proxy } from '../proxy.ts'

test('Next delegates trailing-slash normalization to the proxy', () => {
  assert.equal(nextConfig.skipTrailingSlashRedirect, true)
})

test('legacy client portal URLs redirect directly to the nested canonical pillar', () => {
  const response = proxy(
    new NextRequest('https://cloudtopia.net/web-applications/client-portals', {
      headers: { host: 'cloudtopia.net' },
    }),
  )

  assert.equal(response.status, 301)
  assert.equal(
    response.headers.get('location'),
    'https://cloudtopia.net/services/web-applications/interactive-portals-dashboards',
  )
})

test('combined www, English prefix, trailing slash, and legacy service slug collapse in one redirect', () => {
  const response = proxy(
    new NextRequest('https://www.cloudtopia.net/en/website-design/', {
      headers: { host: 'www.cloudtopia.net' },
    }),
  )

  assert.equal(response.status, 301)
  assert.equal(
    response.headers.get('location'),
    'https://cloudtopia.net/services/website-development',
  )
})

test('Arabic legacy aliases retain the Arabic canonical prefix', () => {
  const response = proxy(
    new NextRequest('https://www.cloudtopia.net/ar/web-applications/client-portals/', {
      headers: { host: 'www.cloudtopia.net' },
    }),
  )

  assert.equal(response.status, 301)
  assert.equal(
    response.headers.get('location'),
    'https://cloudtopia.net/ar/services/web-applications/interactive-portals-dashboards',
  )
})

test('canonical paths with a trailing slash normalize directly to the slashless URL', () => {
  const response = proxy(
    new NextRequest('https://www.cloudtopia.net/services/website-development/?ref=partner', {
      headers: { host: 'www.cloudtopia.net' },
    }),
  )

  assert.equal(response.status, 301)
  assert.equal(
    response.headers.get('location'),
    'https://cloudtopia.net/services/website-development?ref=partner',
  )
})

test('locale-prefixed trailing slashes normalize without an intermediate hop', () => {
  const scenarios = [
    {
      source: 'https://www.cloudtopia.net/en/about/',
      expected: 'https://cloudtopia.net/about',
    },
    {
      source: 'https://www.cloudtopia.net/ar/about/',
      expected: 'https://cloudtopia.net/ar/about',
    },
  ]

  for (const scenario of scenarios) {
    const response = proxy(
      new NextRequest(scenario.source, {
        headers: { host: 'www.cloudtopia.net' },
      }),
    )

    assert.equal(response.status, 301)
    assert.equal(response.headers.get('location'), scenario.expected)
  }
})

test('legacy country URLs combine host, locale, and slash cleanup in one redirect', () => {
  const response = proxy(
    new NextRequest('https://www.cloudtopia.net/en/locations/united-arab-emirates/?ref=regional', {
      headers: { host: 'www.cloudtopia.net' },
    }),
  )

  assert.equal(response.status, 301)
  assert.equal(
    response.headers.get('location'),
    'https://cloudtopia.net/united-arab-emirates?ref=regional',
  )
})

test('nested app-development canonicals clean host, locale, and trailing slash before rewriting', () => {
  const scenarios = [
    {
      source: 'https://www.cloudtopia.net/services/app-development/ios-app-development/?ref=apps',
      expected: 'https://cloudtopia.net/services/app-development/ios-app-development?ref=apps',
    },
    {
      source: 'https://cloudtopia.net/en/services/app-development/android-app-development/',
      expected: 'https://cloudtopia.net/services/app-development/android-app-development',
    },
    {
      source: 'https://www.cloudtopia.net/ar/services/app-development/cross-platform-app-development/',
      expected: 'https://cloudtopia.net/ar/services/app-development/cross-platform-app-development',
    },
  ]

  for (const scenario of scenarios) {
    const response = proxy(
      new NextRequest(scenario.source, {
        headers: { host: new URL(scenario.source).host },
      }),
    )

    assert.equal(response.status, 301)
    assert.equal(response.headers.get('location'), scenario.expected)
  }
})

test('native-script article slugs resolve to a 404 instead of crashing the ISR route', () => {
  // Next puts the resolved pathname in the `x-next-cache-tags` response header
  // of every cached route. Non-ASCII bytes are illegal there, so an Arabic slug
  // made /articles/[slug] throw ERR_INVALID_CHAR and return 500 once the route
  // became ISR. Production hit this on legacy indexed URLs (6 errors, 3 users).
  const arabicSlug = encodeURIComponent('برمجيات-مخصصة-مقابل-جاهزة')

  for (const [source, expectedRewrite] of [
    [`https://cloudtopia.net/ar/articles/${arabicSlug}`, '/ar/articles/_missing'],
    [`https://cloudtopia.net/articles/${arabicSlug}`, '/en/articles/_missing'],
  ] as const) {
    const response = proxy(new NextRequest(source, { headers: { host: 'cloudtopia.net' } }))
    assert.equal(
      response.headers.get('x-middleware-rewrite'),
      `https://cloudtopia.net${expectedRewrite}`,
      `${source} should rewrite to the ASCII sentinel`,
    )
  }
})

test('ASCII article slugs and multi-segment article routes are left alone', () => {
  // The sentinel rewrite must not swallow real posts, nor taxonomy routes —
  // those are dynamic (searchParams), emit no cache tags, and may legitimately
  // carry native-script slugs.
  const untouched = [
    'https://cloudtopia.net/articles/how-to-build-a-bilingual-arabic-english-website',
    'https://cloudtopia.net/ar/articles/how-to-build-a-bilingual-arabic-english-website',
    `https://cloudtopia.net/ar/articles/tag/${encodeURIComponent('تطوير')}`,
    `https://cloudtopia.net/ar/articles/category/${encodeURIComponent('تقنية')}`,
  ]

  for (const source of untouched) {
    const response = proxy(new NextRequest(source, { headers: { host: 'cloudtopia.net' } }))
    const rewrite = response.headers.get('x-middleware-rewrite')
    assert.ok(
      !rewrite || !rewrite.includes('_missing'),
      `${source} must not be rewritten to the not-found sentinel (got ${rewrite})`,
    )
  }
})
