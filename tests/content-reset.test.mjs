import assert from 'node:assert/strict'
import { existsSync, readdirSync, statSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'

const root = process.cwd()

function listFiles(dir) {
  if (!existsSync(dir)) return []
  return readdirSync(dir).flatMap((entry) => {
    const fullPath = path.join(dir, entry)
    return statSync(fullPath).isDirectory() ? listFiles(fullPath) : [fullPath]
  })
}

test('insights system replaces the old MDX blog surface', () => {
  const mdxPosts = listFiles(path.join(root, 'blog-posts')).filter((file) => file.endsWith('.mdx'))

  assert.deepEqual(mdxPosts, [])
  assert.equal(existsSync(path.join(root, 'app/(frontend)/[locale]/blog/[slug]/page.tsx')), true)
  assert.equal(existsSync(path.join(root, 'app/(frontend)/[locale]/insights/page.tsx')), true)
  assert.equal(existsSync(path.join(root, 'app/(frontend)/[locale]/insights/[slug]/page.tsx')), true)
  assert.equal(existsSync(path.join(root, 'collections/BlogPosts.ts')), true)
  assert.equal(existsSync(path.join(root, 'app/(frontend)/[locale]/blog/feed.xml/route.ts')), false)
})

test('Payload CMS integration files are present', () => {
  assert.equal(existsSync(path.join(root, 'payload.config.ts')), true)
  assert.equal(existsSync(path.join(root, 'app/(payload)/admin/[[...segments]]/page.tsx')), true)
  assert.equal(existsSync(path.join(root, 'app/(payload)/api/[[...slug]]/route.ts')), true)
  assert.equal(existsSync(path.join(root, 'components/payload/EditorialDashboard.tsx')), true)
})
