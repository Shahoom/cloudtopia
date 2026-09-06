import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import test from 'node:test'
import { INDUSTRY_SLUGS } from '../lib/industries/slugs.ts'

const bespoke = INDUSTRY_SLUGS.filter((slug) => slug !== 'retail')

test('each bespoke industry owns a static route entry', () => {
  for (const slug of bespoke) {
    const file = `app/(frontend)/[locale]/industries/${slug}/page.tsx`
    assert.equal(existsSync(file), true, file)
    const code = readFileSync(file, 'utf8')
    assert.match(code, new RegExp(`components/industry/${slug}`))
  }
})

test('the fallback dynamic route imports no bespoke world', () => {
  const code = readFileSync('app/(frontend)/[locale]/industries/[industry]/page.tsx', 'utf8')
  assert.doesNotMatch(code, /WORLD_COMPONENTS/)
  assert.doesNotMatch(code, /components\/industry\/(healthcare|fintech|construction|education)/)
})
