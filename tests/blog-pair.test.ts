import assert from 'node:assert/strict'
import test from 'node:test'
import { BlogPosts } from '../collections/BlogPosts.ts'
import { handleBlogPairEndpoint } from '../lib/cms/blog-pair-endpoint.ts'

test('saving an English draft automatically creates its missing Arabic counterpart', async () => {
  const created: Array<Record<string, any>> = []
  const source = {
    id: 42,
    locale: 'en',
    slug: 'shared-draft-slug',
    status: 'draft',
    _status: 'draft',
    title: 'English draft',
    coverImage: 7,
    featuredImageAlt: 'Shared cover',
    author: 3,
    category: 5,
  }
  const req = {
    payload: {
      find: async () => ({ docs: [] }),
      create: async ({ data }: { data: Record<string, any> }) => {
        created.push(data)
        return { id: 84, ...data, _status: 'draft' }
      },
    },
  }

  for (const hook of BlogPosts.hooks?.afterChange || []) {
    await hook({
      collection: BlogPosts,
      context: {},
      doc: source,
      operation: 'create',
      previousDoc: source,
      req,
    } as any)
  }

  assert.equal(created.length, 1)
  assert.equal(created[0]?.locale, 'ar')
  assert.equal(created[0]?.slug, source.slug)
  assert.equal(created[0]?.status, 'draft')
})

test('the pair endpoint returns a readable JSON error when Arabic draft creation fails', async () => {
  const req = {
    data: { id: 42 },
    headers: new Headers(),
    payload: {
      auth: async () => ({ user: { id: 1 } }),
      findByID: async () => ({
        id: 42,
        locale: 'en',
        slug: 'shared-draft-slug',
        status: 'draft',
      }),
      find: async () => ({ docs: [] }),
      create: async () => {
        throw new Error('database insert failed')
      },
    },
  }

  const originalConsoleError = console.error
  const logged: unknown[][] = []
  console.error = (...args: unknown[]) => logged.push(args)

  let response: Response
  try {
    response = await handleBlogPairEndpoint(req as any)
  } finally {
    console.error = originalConsoleError
  }
  const body = await response.json()

  assert.equal(response.status, 500)
  assert.match(body.error, /Arabic draft/i)
  assert.match(body.error, /database insert failed/i)
  assert.equal(logged.length, 1)
})
