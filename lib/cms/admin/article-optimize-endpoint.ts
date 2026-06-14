import type { PayloadRequest } from 'payload'
import { runOptimize } from '../blog-ai-endpoint.ts'
import { lexicalToPlainText } from '../../blog/lexical-text.ts'

// POST /api/admin/article-optimize  { id }
// Runs the same one-click SEO optimizer used in the editor, but for a single
// article from the workspace: fetch → optimize → partial patch. Never clobbers
// author-written excerpt/short excerpt (only fills when empty).
async function parseBody(req: PayloadRequest): Promise<{ id?: string | number }> {
  if (req.data && typeof req.data === 'object') return req.data as any
  try {
    const t = await req.text?.()
    if (t) return JSON.parse(t)
  } catch {
    /* ignore */
  }
  return {}
}

export async function handleArticleOptimizeEndpoint(req: PayloadRequest): Promise<Response> {
  const { user } = await req.payload.auth({ headers: req.headers })
  if (!user) return Response.json({ error: 'Unauthorized.' }, { status: 401 })

  const { id } = await parseBody(req)
  if (!id) return Response.json({ error: 'Missing article id.' }, { status: 400 })

  const doc: any = await req.payload
    .findByID({ collection: 'blog-posts' as any, id, depth: 0, draft: true, overrideAccess: true, req })
    .catch(() => null)
  if (!doc) return Response.json({ error: 'Article not found.' }, { status: 404 })

  let out: any
  try {
    out = await runOptimize({
      title: doc.title || '',
      excerpt: doc.excerpt || '',
      focusKeyword: doc.seo?.focusKeyword || '',
      locale: doc.locale || 'en',
      contentPlain: lexicalToPlainText(doc.content),
    })
  } catch (e: any) {
    return Response.json({ error: e?.message || 'Optimization failed.' }, { status: 503 })
  }

  const applied: string[] = []
  const data: Record<string, any> = { seo: { ...(doc.seo || {}) } }
  const setSeo = (k: string, v: any, label: string) => {
    if (v) {
      data.seo[k] = v
      applied.push(label)
    }
  }
  setSeo('metaTitle', out.metaTitle, 'Meta title')
  setSeo('metaDescription', out.metaDescription, 'Meta description')
  setSeo('focusKeyword', out.focusKeyword, 'Focus keyword')
  if (!doc.excerpt && out.excerpt) {
    data.excerpt = out.excerpt
    applied.push('Excerpt')
  }
  if (!doc.shortExcerpt && out.shortExcerpt) {
    data.shortExcerpt = out.shortExcerpt
    applied.push('Short excerpt')
  }

  try {
    await req.payload.update({
      collection: 'blog-posts' as any,
      id,
      data,
      draft: doc.status !== 'published',
      overrideAccess: true,
      req,
      context: { skipAutoTranslate: true },
    })
  } catch (e: any) {
    return Response.json({ error: e?.message || 'Could not save optimization.' }, { status: 500 })
  }

  return Response.json({ ok: true, applied, warnings: Array.isArray(out.warnings) ? out.warnings : [] })
}
