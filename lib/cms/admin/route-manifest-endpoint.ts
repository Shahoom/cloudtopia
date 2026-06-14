import type { PayloadRequest } from 'payload'

// NOTE: the metadata + seo modules are imported LAZILY inside the handler, not at
// the top level. payload.config imports this endpoint, and the vercel-build
// migrate step loads payload.config in plain Node (no bundler) — a top-level
// `import '../metadata.ts'` drags in lib/i18n/url.ts whose extensionless
// `./config` import only resolves under the bundler, crashing the migrate step.

// The structural/marketing routes whose SEO is editable from the control center.
// (Individual articles have their own SEO in the Articles workspace; redirect-only
// routes like /locations/[country] are excluded.)
const CORE_PATHS = [
  '/', 'services', 'industries', 'pricing', 'projects', 'articles',
  'process', 'trust', 'about', 'contact', 'website-design', 'ecommerce-solutions',
  'business-systems-development', 'restaurant-qr-menu', 'content-creation',
  'social-media-marketing', 'web-applications', 'privacy', 'terms',
]

const LOCALES = ['en', 'ar'] as const
type Loc = (typeof LOCALES)[number]
type Meta = { title: string; description: string }
type RouteCurrent = { en: Meta; ar: Meta }

function labelFor(path: string): string {
  if (path === '/') return 'Home'
  const last = path.split('/').pop() || path
  return last.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

// Core routes are read by fetching the live rendered page — the only reliable
// source, since routes compute <title> in different ways (getCMSMetadata +
// per-route fallbacks, static metadata, etc.).
const SITE = (process.env.NEXT_PUBLIC_SITE_URL || 'https://cloudtopia.net').replace(/\/$/, '')

function decodeEntities(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&#x27;|&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x2F;|&#47;/g, '/')
}

async function fetchLiveTitle(loc: Loc, path: string): Promise<Meta> {
  const seg = path === '/' ? '' : path
  const url = (loc === 'en' ? `${SITE}/${seg}` : `${SITE}/${loc}/${seg}`).replace(/\/+$/, '') || SITE
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(8000) })
    const html = await res.text()
    const rawT = (html.match(/<title>([^<]*)<\/title>/i)?.[1] || '').trim()
    const rawD = (html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1] || '').trim()
    return {
      title: decodeEntities(rawT).replace(/\s*\|\s*CloudTopia\s*$/i, '').trim(),
      description: decodeEntities(rawD),
    }
  } catch {
    return { title: '', description: '' }
  }
}

export async function handleRouteManifestEndpoint(req: PayloadRequest): Promise<Response> {
  const { user } = await req.payload.auth({ headers: req.headers })
  if (!user) return Response.json({ error: 'Unauthorized.' }, { status: 401 })

  // Lazy imports — keep these out of payload.config's plain-Node module graph.
  const [industries, services] = await Promise.all([
    import('../../seo/industries.ts'),
    import('../../seo/services.ts'),
  ])
  const { getIndustry, industrySlugs, localizedValue } = industries as any
  const { getService, serviceDetailSlugs, localizedServiceValue } = services as any

  // One pass over Pages so programmatic routes can honor a CMS row (slug like
  // "industries/<slug>") before falling back to the route's formula.
  const pagesMap: Record<Loc, Record<string, any>> = { en: {}, ar: {} }
  try {
    const pages = await req.payload.find({ collection: 'pages' as any, limit: 1000, depth: 0, overrideAccess: true, req })
    for (const p of pages.docs || []) {
      const loc: Loc = p.locale === 'ar' ? 'ar' : 'en'
      pagesMap[loc][String(p.slug)] = p
    }
  } catch {
    /* pages table may be unavailable */
  }

  async function coreCurrent(path: string): Promise<RouteCurrent> {
    const out = { en: { title: '', description: '' }, ar: { title: '', description: '' } } as RouteCurrent
    await Promise.all(
      LOCALES.map(async (loc) => {
        try {
          out[loc] = await fetchLiveTitle(loc, path)
        } catch {
          out[loc] = { title: '', description: '' }
        }
      }),
    )
    return out
  }

  function industryCurrent(slug: string): RouteCurrent {
    const ind = getIndustry(slug)
    const build = (loc: Loc): Meta => {
      const page = pagesMap[loc][`industries/${slug}`]
      const name = ind ? localizedValue(ind.name, loc) : slug
      return {
        title: page?.seo?.title || (loc === 'ar' ? `حلول ${name} الرقمية` : `${name} Digital Solutions`),
        description: page?.seo?.description || (ind ? localizedValue(ind.description, loc) : ''),
      }
    }
    return { en: build('en'), ar: build('ar') }
  }

  function serviceCurrent(slug: string): RouteCurrent {
    const svc = getService(slug)
    const build = (loc: Loc): Meta => {
      const page = pagesMap[loc][`services/${slug}`]
      const name = svc ? localizedServiceValue(svc.name, loc) : slug
      return {
        title: page?.seo?.title || (loc === 'ar' ? `${name} للشركات` : `${name} for Business`),
        description: page?.seo?.description || (svc ? localizedServiceValue(svc.description, loc) : ''),
      }
    }
    return { en: build('en'), ar: build('ar') }
  }

  const coreRoutes = await Promise.all(
    CORE_PATHS.map(async (p) => ({ path: p, label: labelFor(p), current: await coreCurrent(p) })),
  )

  const groups = [
    { group: 'Core pages', routes: coreRoutes },
    { group: 'Industries', routes: (industrySlugs as string[]).map((s) => ({ path: `industries/${s}`, label: labelFor(s), current: industryCurrent(s) })) },
    { group: 'Services', routes: (serviceDetailSlugs as string[]).map((s) => ({ path: `services/${s}`, label: labelFor(s), current: serviceCurrent(s) })) },
  ]

  const overrides: Record<string, any> = {}
  try {
    const res = await req.payload.find({ collection: 'seo-overrides' as any, limit: 1000, depth: 0, overrideAccess: true, req })
    for (const d of res.docs || []) {
      overrides[`${d.routePath}|${d.locale}`] = {
        id: d.id,
        metaTitle: d.metaTitle || '',
        metaDescription: d.metaDescription || '',
        canonicalUrl: d.canonicalUrl || '',
        noIndex: !!d.noIndex,
        noFollow: !!d.noFollow,
      }
    }
  } catch {
    /* seo_overrides table may not exist yet */
  }

  return Response.json({ groups, overrides })
}
