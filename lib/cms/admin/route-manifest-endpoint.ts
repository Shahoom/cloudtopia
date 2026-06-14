import type { PayloadRequest } from 'payload'
import { industrySlugs } from '../../seo/industries.ts'
import { serviceDetailSlugs } from '../../seo/services.ts'

// The structural/marketing routes whose SEO is editable from the control center.
// (Individual articles have their own SEO in the Articles workspace; redirect-only
// routes like /locations/[country] are excluded.)
const CORE_PATHS = [
  '/', 'services', 'industries', 'markets', 'pricing', 'projects', 'articles',
  'process', 'trust', 'about', 'contact', 'website-design', 'ecommerce-solutions',
  'business-systems-development', 'restaurant-qr-menu', 'content-creation',
  'social-media-marketing', 'web-applications', 'privacy', 'terms',
]

function labelFor(path: string): string {
  if (path === '/') return 'Home'
  const last = path.split('/').pop() || path
  return last.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export async function handleRouteManifestEndpoint(req: PayloadRequest): Promise<Response> {
  const { user } = await req.payload.auth({ headers: req.headers })
  if (!user) return Response.json({ error: 'Unauthorized.' }, { status: 401 })

  const groups = [
    { group: 'Core pages', routes: CORE_PATHS.map((p) => ({ path: p, label: labelFor(p) })) },
    { group: 'Industries', routes: industrySlugs.map((s: string) => ({ path: `industries/${s}`, label: labelFor(s) })) },
    { group: 'Services', routes: serviceDetailSlugs.map((s: string) => ({ path: `services/${s}`, label: labelFor(s) })) },
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
