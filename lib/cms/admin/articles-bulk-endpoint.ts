import type { PayloadRequest } from 'payload'

// POST /api/admin/articles-bulk  { action, ids, value? }
// Multi-document operations for the articles workspace. Every write goes through
// the Payload local API (overrideAccess) so collection hooks (score recompute,
// revalidation) still run. Each id is wrapped independently so one failure does
// not abort the batch.
type Action = 'publish' | 'status' | 'category' | 'translate' | 'delete' | 'export'

async function parseBody(req: PayloadRequest): Promise<{ action?: Action; ids?: any[]; value?: string }> {
  if (req.data && typeof req.data === 'object') return req.data as any
  try {
    const t = await req.text?.()
    if (t) return JSON.parse(t)
  } catch {
    /* ignore */
  }
  return {}
}

const relId = (v: any) => (v && typeof v === 'object' ? v.id ?? v : v)

async function ensureSibling(req: PayloadRequest, id: any): Promise<void> {
  const src: any = await req.payload.findByID({ collection: 'blog-posts' as any, id, depth: 0, draft: true, overrideAccess: true, req })
  if (!src?.slug) throw new Error('Save the article first (needs a slug).')
  const other: 'en' | 'ar' = src.locale === 'ar' ? 'en' : 'ar'
  const existing = await req.payload.find({
    collection: 'blog-posts' as any,
    depth: 0,
    limit: 1,
    draft: true,
    overrideAccess: true,
    req,
    where: { and: [{ slug: { equals: src.slug } }, { locale: { equals: other } }] },
  })
  if (existing.docs[0]?.id) return
  await req.payload.create({
    collection: 'blog-posts' as any,
    draft: true,
    overrideAccess: true,
    req,
    context: { skipAutoTranslate: true },
    data: {
      locale: other,
      slug: src.slug,
      status: 'draft',
      title: '',
      excerpt: '',
      content: {
        root: { type: 'root', format: '', indent: 0, version: 1, direction: 'ltr', children: [{ type: 'paragraph', format: '', indent: 0, version: 1, direction: 'ltr', children: [] }] },
      },
      author: relId(src.author),
      category: relId(src.category),
      coverImage: relId(src.coverImage),
      contentType: src.contentType,
      difficulty: src.difficulty,
    },
  })
}

export async function handleArticlesBulkEndpoint(req: PayloadRequest): Promise<Response> {
  const { user } = await req.payload.auth({ headers: req.headers })
  if (!user) return Response.json({ error: 'Unauthorized.' }, { status: 401 })

  const { action, ids, value } = await parseBody(req)
  if (!action || !Array.isArray(ids) || ids.length === 0) {
    return Response.json({ error: 'action and ids are required.' }, { status: 400 })
  }

  if (action === 'export') {
    const docs = await req.payload.find({ collection: 'blog-posts' as any, depth: 0, limit: ids.length, overrideAccess: true, req, where: { id: { in: ids } } })
    return Response.json({ ok: true, data: docs.docs })
  }

  const results: Array<{ id: any; ok: boolean; error?: string }> = []
  for (const id of ids) {
    try {
      if (action === 'delete') {
        await req.payload.delete({ collection: 'blog-posts' as any, id, overrideAccess: true, req })
      } else if (action === 'publish') {
        await req.payload.update({ collection: 'blog-posts' as any, id, data: { status: 'published' }, overrideAccess: true, req, context: { skipAutoTranslate: true } })
      } else if (action === 'status') {
        if (!value) throw new Error('Missing status value.')
        await req.payload.update({ collection: 'blog-posts' as any, id, data: { status: value }, overrideAccess: true, req, context: { skipAutoTranslate: true } })
      } else if (action === 'category') {
        if (!value) throw new Error('Missing category value.')
        await req.payload.update({ collection: 'blog-posts' as any, id, data: { category: value }, overrideAccess: true, req, context: { skipAutoTranslate: true } })
      } else if (action === 'translate') {
        await ensureSibling(req, id)
      } else {
        throw new Error('Unsupported action.')
      }
      results.push({ id, ok: true })
    } catch (e: any) {
      results.push({ id, ok: false, error: e?.message || 'failed' })
    }
  }
  return Response.json({ ok: true, results })
}
