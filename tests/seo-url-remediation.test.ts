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
