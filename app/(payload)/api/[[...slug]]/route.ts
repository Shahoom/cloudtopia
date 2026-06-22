import config from '@payload-config'
import {
  REST_DELETE,
  REST_GET,
  REST_OPTIONS,
  REST_PATCH,
  REST_POST,
  REST_PUT,
} from '@payloadcms/next/routes'

export const GET = REST_GET(config)
export const POST = REST_POST(config)
export const DELETE = REST_DELETE(config)
export const PUT = REST_PUT(config)
export const OPTIONS = REST_OPTIONS(config)

// Wrap PATCH with error logging so Vercel logs capture the full error body on 4xx/5xx
const _PATCH = REST_PATCH(config)
export const PATCH: typeof _PATCH = async (req, ctx) => {
  const res = await _PATCH(req, ctx)
  if (!res.ok) {
    try {
      const body = await res.clone().text()
      console.error(`[PATCH ${res.status}] ${req.url}\n${body}`)
    } catch {}
  }
  return res
}
