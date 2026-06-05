import assert from 'node:assert/strict'
import test from 'node:test'

import {
  getDatabaseUrl,
  getPayloadSecret,
  isDatabaseConfigured,
  isPayloadConfigured,
} from '../lib/cms/env.ts'

const originalEnv = { ...process.env }

test.afterEach(() => {
  process.env = { ...originalEnv }
})

function setNodeEnv(value: 'development' | 'production') {
  Reflect.set(process.env, 'NODE_ENV', value)
}

test('uses a local Postgres database URL in development when DATABASE_URL is not set', () => {
  delete process.env.DATABASE_URL
  setNodeEnv('development')

  assert.equal(getDatabaseUrl(), 'postgres://127.0.0.1:5432/payload_db')
  assert.equal(isDatabaseConfigured(), true)
})

test('requires an explicit database URL in production', () => {
  delete process.env.DATABASE_URL
  setNodeEnv('production')

  assert.equal(getDatabaseUrl(), '')
  assert.equal(isDatabaseConfigured(), false)
})

test('uses a development-only Payload secret locally but not in production', () => {
  delete process.env.PAYLOAD_SECRET
  setNodeEnv('development')

  assert.equal(getPayloadSecret(), 'dev-only-change-me-before-production')
  assert.equal(isPayloadConfigured(), true)

  setNodeEnv('production')

  assert.equal(getPayloadSecret(), '')
  assert.equal(isPayloadConfigured(), false)
})
