import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const readSource = (relativePath: string) =>
  readFileSync(path.join(process.cwd(), relativePath), 'utf8')

test('the root frontend layout does not preload homepage or editorial-only resources', () => {
  // The root layout moved from app/(frontend)/layout.tsx down into the [locale]
  // segment so it could read the locale from params instead of a request header
  // (a dynamic API in a root layout opts the whole site out of static rendering).
  const source = readSource('app/(frontend)/[locale]/layout.tsx')

  assert.doesNotMatch(source, /Fraunces|Amiri/)
  assert.doesNotMatch(source, /href="\/images\/homepage\/clouds\.webp"/)
})

test('no layout reads request headers — that would make every route dynamic', () => {
  for (const layout of [
    'app/(frontend)/[locale]/layout.tsx',
    'app/(country-landing)/[locale]/layout.tsx',
  ]) {
    assert.doesNotMatch(readSource(layout), /next\/headers/, `${layout} must not import next/headers`)
  }
})

test('the localized homepage owns its hero image preload', () => {
  const source = readSource('app/(frontend)/[locale]/page.tsx')

  assert.match(source, /rel="preload"/)
  assert.match(source, /href="\/images\/homepage\/clouds\.webp"/)
  assert.match(source, /fetchPriority="high"/)
})

test('the articles layout owns and applies both editorial display fonts', () => {
  const source = readSource('app/(frontend)/[locale]/articles/layout.tsx')

  assert.match(source, /import \{ Fraunces, Amiri \} from 'next\/font\/google'/)
  assert.match(source, /--font-fraunces/)
  assert.match(source, /--font-amiri/)
  assert.match(source, /className=\{`blog-editorial \$\{fraunces\.variable\} \$\{amiri\.variable\}`\}/)
})
