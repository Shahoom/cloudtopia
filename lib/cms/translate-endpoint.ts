import type { PayloadRequest } from 'payload'
import { isAutoTranslationConfigured, translatePayload } from './auto-translate.ts'
import { revalidateCmsTags } from './revalidate.ts'
import fs from 'node:fs'
import path from 'node:path'

function writeDebugLog(message: string, data?: any) {
  try {
    const logDir = '/Users/shahm/Desktop/CloudTopia V2/scratch'
    if (!fs.existsSync(logDir)) {
      fs.mkdirSync(logDir, { recursive: true })
    }
    const logPath = path.join(logDir, 'translate-debug.log')
    const timestamp = new Date().toISOString()
    const logLine = `[${timestamp}] ${message} ${data ? JSON.stringify(data) : ''}\n`
    fs.appendFileSync(logPath, logLine, 'utf8')
  } catch (err) {
    console.error('Failed to write debug log:', err)
  }
}

/**
 * Handles the POST /api/translate custom endpoint.
 * Reads the English source document, translates it, and
 * creates/updates Arabic + Turkish locale variants.
 * Does NOT modify the English document.
 */
export async function handleTranslateEndpoint(req: PayloadRequest): Promise<Response> {
  writeDebugLog('handleTranslateEndpoint hit', { url: req.url, method: req.method })
  console.log('[translate] Endpoint hit, url:', req.url)

  if (!isAutoTranslationConfigured()) {
    writeDebugLog('Error: Translation not configured')
    return Response.json(
      { error: 'No OPENAI_API_KEY or GEMINI_API_KEY configured.' },
      { status: 503 },
    )
  }

  // Fetch auth
  const { user } = await req.payload.auth({ headers: req.headers })
  if (!user) {
    writeDebugLog('Error: Unauthorized request')
    console.error('[translate] Unauthorized access attempt')
    return Response.json({ error: 'Unauthorized.' }, { status: 401 })
  }

  let collection: string | undefined
  let id: string | undefined

  // Try 1: Payload's pre-parsed body (req.data)
  const data = req.data as Record<string, unknown> | undefined
  if (data && typeof data === 'object') {
    collection = data.collection as string
    id = data.id as string
    writeDebugLog('Parsed parameters from req.data', { collection, id })
  }

  // Try 2: Parse JSON body directly
  if (!collection || !id) {
    try {
      const jsonBody = await req.text?.()
      if (jsonBody) {
        const parsed = JSON.parse(jsonBody)
        collection = parsed.collection
        id = parsed.id
        writeDebugLog('Parsed parameters from JSON body', { collection, id })
      }
    } catch (err: any) {
      writeDebugLog('Failed to parse JSON body from req.text', { error: err.message })
    }
  }

  // Try 3: Payload's req.searchParams or URL search params
  if (!collection || !id) {
    const sp = req.searchParams || new URL(req.url || '', 'http://localhost').searchParams
    collection = sp.get('collection') || undefined
    id = sp.get('id') || undefined
    if (collection) {
      writeDebugLog('Parsed parameters from query parameters', { collection, id })
    }
  }

  if (!collection || !id) {
    writeDebugLog('Error: Missing collection or id')
    return Response.json(
      { error: 'Missing collection or id. Send as JSON body or query params.' },
      { status: 400 },
    )
  }

  id = decodeURIComponent(id)

  const handler = translationHandlers[collection]
  if (!handler) {
    writeDebugLog('Error: No handler for collection', { collection })
    return Response.json(
      { error: `No translation handler for "${collection}".` },
      { status: 400 },
    )
  }

  try {
    writeDebugLog(`Database query: Finding ${collection}/${id}`)
    const doc = await req.payload.findByID({
      collection: collection as any,
      id,
      depth: 0,
      overrideAccess: true,
      req,
    })

    if (!doc) {
      writeDebugLog('Error: Document not found in database')
      return Response.json({ error: 'Document not found.' }, { status: 404 })
    }

    writeDebugLog('Document found, starting translation', { title: doc.title || doc.id })
    await handler(req.payload, doc, req)
    writeDebugLog('Translation completed successfully')
    return Response.json({ success: true, message: 'Translated to Arabic & Turkish.' })
  } catch (error: any) {
    writeDebugLog('Error in handler execution', { error: error?.message || String(error) })
    console.error('[translate] Error:', error?.message || error)
    return Response.json(
      { error: error?.message || 'Translation failed.' },
      { status: 500 },
    )
  }
}

/* ── Per-collection translation logic ───────────────────────── */

type TranslationHandler = (payload: any, doc: any, req: PayloadRequest) => Promise<void>

const translationHandlers: Record<string, TranslationHandler> = {
  projects: translateProject,
  pages: translatePage,
  'service-faqs': translateServiceFAQs,
  authors: translateAuthor,
}

function cleanFeatures(features: any[]) {
  if (!Array.isArray(features)) return []
  return features.map((f) => ({
    feature: typeof f === 'object' && f !== null ? (f.feature || '') : String(f)
  }))
}

async function translateProject(payload: any, doc: any, req: PayloadRequest) {
  const publicId = extractPublicId(doc)
  const source = {
    category: doc.category,
    type: doc.type,
    title: doc.title,
    problem: doc.problem,
    solution: doc.solution,
    features: doc.features || [],
    metrics: { label: doc.metrics?.label || '' },
  }

  await Promise.all(
    (['ar', 'tr'] as const).map(async (locale) => {
      const translated = await translatePayload(source, locale)
      const targetId = `${locale}:${publicId}`
      const data = {
        id: targetId,
        locale,
        cmsKey: targetId,
        category: (translated as any).category || doc.category,
        type: (translated as any).type || doc.type,
        featured: doc.featured,
        title: (translated as any).title || doc.title,
        problem: (translated as any).problem || doc.problem,
        solution: (translated as any).solution || doc.solution,
        features: cleanFeatures((translated as any).features || doc.features || []),
        image: doc.image,
        imageMedia: typeof doc.imageMedia === 'object' ? doc.imageMedia?.id : doc.imageMedia,
        metrics: {
          label: (translated as any).metrics?.label || doc.metrics?.label || '',
          value: doc.metrics?.value || '',
        },
        link: doc.link || '',
      }

      const existing = await payload.find({
        collection: 'projects',
        depth: 0,
        limit: 1,
        overrideAccess: true,
        req,
        where: { cmsKey: { equals: targetId } },
      })

      if (existing.docs[0]?.id) {
        const { id: _, ...updateData } = data
        await payload.update({
          collection: 'projects',
          id: existing.docs[0].id,
          data: updateData,
          overrideAccess: true,
          req,
          context: { skipAutoTranslate: true },
        })
      } else {
        await payload.create({
          collection: 'projects',
          data,
          overrideAccess: true,
          req,
          context: { skipAutoTranslate: true },
        })
      }
    }),
  )

  await revalidateCmsTags(['cms-projects'])
}

async function translatePage(payload: any, doc: any, req: PayloadRequest) {
  const source: Record<string, unknown> = {}
  if (doc.title) source.title = doc.title
  if (doc.hero) source.hero = doc.hero
  if (doc.cta) source.cta = doc.cta
  if (doc.seo) source.seo = doc.seo
  if (doc.sections) source.sections = doc.sections

  await Promise.all(
    (['ar', 'tr'] as const).map(async (locale) => {
      const translated = await translatePayload(source, locale)
      const targetSlug = doc.slug
      const targetPublicPath = doc.publicPath
        ? doc.publicPath.replace(/^\/(en|ar|tr)\//, `/${locale}/`)
        : undefined

      const data: Record<string, unknown> = {
        locale,
        slug: targetSlug,
        status: doc.status || 'published',
        template: doc.template,
        ...(targetPublicPath ? { publicPath: targetPublicPath } : {}),
        title: (translated as any).title || doc.title,
        hero: (translated as any).hero || doc.hero || {},
        cta: (translated as any).cta || doc.cta || {},
        seo: (translated as any).seo || doc.seo || {},
        sections: (translated as any).sections || doc.sections || {},
        design: doc.design || {},
      }

      const existing = await payload.find({
        collection: 'pages',
        depth: 0,
        limit: 1,
        overrideAccess: true,
        req,
        where: {
          and: [
            { locale: { equals: locale } },
            { slug: { equals: targetSlug } },
          ],
        },
      })

      if (existing.docs[0]?.id) {
        await payload.update({
          collection: 'pages',
          id: existing.docs[0].id,
          data,
          overrideAccess: true,
          req,
          context: { skipAutoTranslate: true },
        })
      } else {
        await payload.create({
          collection: 'pages',
          data,
          overrideAccess: true,
          req,
          context: { skipAutoTranslate: true },
        })
      }
    }),
  )

  await revalidateCmsTags(['cms-pages', 'cms-dictionary'])
}

async function translateServiceFAQs(payload: any, doc: any, req: PayloadRequest) {
  if (!Array.isArray(doc?.faqs?.en) || doc.faqs.en.length === 0) return

  const [ar, tr] = await Promise.all([
    translatePayload(doc.faqs.en, 'ar'),
    translatePayload(doc.faqs.en, 'tr'),
  ])

  await payload.update({
    collection: 'service-faqs',
    id: doc.id,
    data: {
      faqs: { en: doc.faqs.en, ar, tr },
    },
    overrideAccess: true,
    req,
    context: { skipAutoTranslate: true },
  })

  await revalidateCmsTags(['cms-service-faqs'])
}

async function translateAuthor(payload: any, doc: any, req: PayloadRequest) {
  const roleEn = doc?.role?.en
  const bioEn = doc?.bio?.en
  if (!roleEn && !bioEn) return

  const source: Record<string, string> = {}
  if (roleEn) source.role = roleEn
  if (bioEn) source.bio = bioEn

  const [ar, tr] = await Promise.all([
    translatePayload(source, 'ar'),
    translatePayload(source, 'tr'),
  ])

  await payload.update({
    collection: 'authors',
    id: doc.id,
    data: {
      role: {
        en: roleEn || '',
        ar: (ar as any).role || doc?.role?.ar || '',
        tr: (tr as any).role || doc?.role?.tr || '',
      },
      bio: {
        en: bioEn || '',
        ar: (ar as any).bio || doc?.bio?.ar || '',
        tr: (tr as any).bio || doc?.bio?.tr || '',
      },
    },
    overrideAccess: true,
    req,
    context: { skipAutoTranslate: true },
  })

  await revalidateCmsTags(['cms-dictionary'])
}

function extractPublicId(doc: any) {
  const cmsKey = typeof doc.cmsKey === 'string' ? doc.cmsKey : ''
  const id = typeof doc.id === 'string' ? doc.id : ''
  if (cmsKey.includes(':')) return cmsKey.split(':').slice(1).join(':')
  if (id.includes(':')) return id.split(':').slice(1).join(':')
  return id
}
