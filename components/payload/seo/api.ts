export type RouteMeta = { title: string; description: string }
export type RouteEntry = { path: string; label: string; current: { en: RouteMeta; ar: RouteMeta } }
export type RouteGroup = { group: string; routes: RouteEntry[] }
export type Override = {
  id?: string | number
  metaTitle: string
  metaDescription: string
  canonicalUrl: string
  noIndex: boolean
  noFollow: boolean
}

const JSON_HEADERS = { 'content-type': 'application/json' }

export async function fetchManifest(): Promise<{ groups: RouteGroup[]; overrides: Record<string, Override> }> {
  const res = await fetch('/api/admin/route-manifest', { method: 'POST', credentials: 'include', headers: JSON_HEADERS, body: '{}' })
  if (!res.ok) throw new Error('Could not load routes.')
  return res.json()
}

export async function saveOverride(routePath: string, locale: 'en' | 'ar', data: Omit<Override, 'id'>, id?: string | number): Promise<Override> {
  const body = JSON.stringify({ routePath, locale, ...data })
  const url = id ? `/api/seo-overrides/${id}` : '/api/seo-overrides'
  const res = await fetch(url, { method: id ? 'PATCH' : 'POST', credentials: 'include', headers: JSON_HEADERS, body })
  const json = await res.json()
  if (!res.ok) throw new Error(json?.errors?.[0]?.message || json?.message || 'Save failed.')
  const doc = json.doc || json
  return {
    id: doc.id,
    metaTitle: doc.metaTitle || '',
    metaDescription: doc.metaDescription || '',
    canonicalUrl: doc.canonicalUrl || '',
    noIndex: !!doc.noIndex,
    noFollow: !!doc.noFollow,
  }
}

export async function deleteOverride(id: string | number): Promise<void> {
  const res = await fetch(`/api/seo-overrides/${id}`, { method: 'DELETE', credentials: 'include' })
  if (!res.ok) throw new Error('Could not reset this route.')
}
