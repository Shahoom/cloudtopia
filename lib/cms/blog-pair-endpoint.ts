import type { PayloadRequest } from 'payload'

/**
 * POST /api/blog-pair
 *
 * Find-or-create the sibling-language version of a blog post. Articles are
 * stored as two separate documents that share one `slug` across locales
 * (composite unique index on `slug + locale`). This endpoint powers the
 * EN ⇄ AR language toggle in the editor:
 *
 *   • If the other-locale sibling already exists → return its id.
 *   • If it does not → create a BLANK DRAFT in the other locale, copying only
 *     structural / language-neutral fields, and return the new id.
 *
 * No translation happens here — the author writes the other-language text.
 */

// Structural, language-neutral fields copied to a freshly created counterpart.
// Everything text/content (title, excerpt, content, blocks, SEO copy …) is left
// empty for the author to write.
function buildCounterpartData(doc: any, otherLocale: 'en' | 'ar') {
  const relId = (v: any) => (v && typeof v === 'object' ? v.id ?? v : v)
  const relIds = (v: any) => (Array.isArray(v) ? v.map(relId).filter((x) => x != null) : undefined)

  const data: Record<string, unknown> = {
    locale: otherLocale,
    slug: doc.slug, // the shared pairing key
    status: 'draft',
    // structural selects
    contentType: doc.contentType,
    targetAudience: doc.targetAudience,
    serviceFocus: doc.serviceFocus,
    difficulty: doc.difficulty,
    // editorial flags
    featured: doc.featured ?? false,
    pinned: doc.pinned ?? false,
    editorPick: doc.editorPick ?? false,
    trending: doc.trending ?? false,
    // conversion (structural only)
    showCTA: doc.showCTA ?? true,
    ctaButtonUrl: doc.ctaButtonUrl,
    // relationships
    author: relId(doc.author),
    coAuthors: relIds(doc.coAuthors),
    category: relId(doc.category),
    tags: relIds(doc.tags),
    series: relId(doc.series),
    relatedPosts: relIds(doc.relatedPosts),
    coverImage: relId(doc.coverImage),
    // seo: only the language-neutral toggles
    seo: {
      noIndex: doc.seo?.noIndex ?? false,
      noFollow: doc.seo?.noFollow ?? false,
    },
  }

  // Drop undefined keys so Payload defaults apply cleanly.
  for (const k of Object.keys(data)) {
    if (data[k] === undefined) delete data[k]
  }
  return data
}

async function parseId(req: PayloadRequest): Promise<string | undefined> {
  const data = req.data as Record<string, unknown> | undefined
  if (data && typeof data.id !== 'undefined') return String(data.id)
  try {
    const text = await req.text?.()
    if (text) {
      const parsed = JSON.parse(text)
      if (typeof parsed?.id !== 'undefined') return String(parsed.id)
    }
  } catch {
    // fall through to query params
  }
  const sp = req.searchParams || new URL(req.url || '', 'http://localhost').searchParams
  return sp.get('id') || undefined
}

export async function handleBlogPairEndpoint(req: PayloadRequest): Promise<Response> {
  const { user } = await req.payload.auth({ headers: req.headers })
  if (!user) {
    return Response.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  const rawId = await parseId(req)
  if (!rawId) {
    return Response.json({ error: 'Missing post id.' }, { status: 400 })
  }
  const id = decodeURIComponent(rawId)

  let source: any
  try {
    source = await req.payload.findByID({
      collection: 'blog-posts' as any,
      id,
      depth: 0,
      draft: true,
      overrideAccess: true,
      req,
    })
  } catch {
    source = null
  }
  if (!source) {
    return Response.json({ error: 'Source post not found.' }, { status: 404 })
  }
  if (!source.slug) {
    return Response.json({ error: 'Save the article first (it needs a slug) before adding the other language.' }, { status: 400 })
  }

  const otherLocale: 'en' | 'ar' = source.locale === 'ar' ? 'en' : 'ar'

  // 1) Does the sibling already exist?
  const existing = await req.payload.find({
    collection: 'blog-posts' as any,
    depth: 0,
    limit: 1,
    draft: true,
    overrideAccess: true,
    req,
    where: {
      and: [{ slug: { equals: source.slug } }, { locale: { equals: otherLocale } }],
    },
  })

  if (existing.docs[0]?.id) {
    return Response.json({ id: existing.docs[0].id, locale: otherLocale, created: false })
  }

  // 2) Create a blank draft counterpart. draft:true lets required text fields
  //    stay empty until the author fills them in.
  const created = await req.payload.create({
    collection: 'blog-posts' as any,
    data: buildCounterpartData(source, otherLocale),
    draft: true,
    overrideAccess: true,
    req,
    context: { skipAutoTranslate: true },
  })

  return Response.json({ id: created.id, locale: otherLocale, created: true })
}
