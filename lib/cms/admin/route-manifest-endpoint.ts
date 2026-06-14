import type { PayloadRequest } from 'payload'
import { getIndustry, industrySlugs, localizedValue } from '../../seo/industries.ts'
import { getService, serviceDetailSlugs, localizedServiceValue } from '../../seo/services.ts'
import { getCMSMetadata } from '../metadata.ts'

// The structural/marketing routes whose SEO is editable from the control center.
// (Individual articles have their own SEO in the Articles workspace; redirect-only
// routes like /locations/[country] are excluded.)
const CORE_PATHS = [
  '/', 'services', 'industries', 'markets', 'pricing', 'projects', 'articles',
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

function titleStr(m: any): string {
  const t = m?.title
  if (typeof t === 'string') return t
  if (t && typeof t === 'object' && 'absolute' in t) return String(t.absolute || '')
  return ''
}

export async function handleRouteManifestEndpoint(req: PayloadRequest): Promise<Response> {
  const { user } = await req.payload.auth({ headers: req.headers })
  if (!user) return Response.json({ error: 'Unauthorized.' }, { status: 401 })

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

  // Core pages: the real effective metadata (dictionary + CMS + any override).
  async function coreCurrent(path: string): Promise<RouteCurrent> {
    const out = { en: { title: '', description: '' }, ar: { title: '', description: '' } } as RouteCurrent
    await Promise.all(
      LOCALES.map(async (loc) => {
        try {
          const m = await getCMSMetadata(loc, path)
          out[loc] = { title: titleStr(m), description: typeof m.description === 'string' ? m.description : '' }
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
    { group: 'Industries', routes: industrySlugs.map((s: string) => ({ path: `industries/${s}`, label: labelFor(s), current: industryCurrent(s) })) },
    { group: 'Services', routes: serviceDetailSlugs.map((s: string) => ({ path: `services/${s}`, label: labelFor(s), current: serviceCurrent(s) })) },
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
