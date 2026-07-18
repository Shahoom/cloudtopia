import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const readSource = (relativePath: string) =>
  readFileSync(path.join(process.cwd(), relativePath), 'utf8')

test('the root frontend layout does not preload homepage or editorial-only resources', () => {
  const source = readSource('app/(frontend)/layout.tsx')

  assert.doesNotMatch(source, /Fraunces|Amiri/)
  assert.doesNotMatch(source, /href="\/images\/homepage\/clouds\.webp"/)
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
