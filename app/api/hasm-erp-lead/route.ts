import { NextRequest, NextResponse } from 'next/server'
import { getClientIp } from '@/lib/cms/client-ip.ts'
import { isPayloadConfigured } from '@/lib/cms/env.ts'
import { getPayloadClient } from '@/lib/cms/payload.ts'
import { parseHasmLeadInput, resolveHasmCorsOrigin } from '@/lib/hasm-leads/validation.ts'

export const runtime = 'nodejs'

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const RECENT_DUPLICATE_WINDOW_MS = 5 * 60 * 1000
const MAX_LEADS_PER_IP = 5
const MAX_BODY_BYTES = 20_000

function corsHeaders(origin: string): Record<string, string> {
  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
    'Cache-Control': 'no-store',
    'X-Content-Type-Options': 'nosniff',
    Vary: 'Origin',
  }
}

function deniedCorsHeaders(): Record<string, string> {
  return { 'Cache-Control': 'no-store', Vary: 'Origin' }
}

export function OPTIONS(request: NextRequest) {
  const origin = resolveHasmCorsOrigin(request.headers.get('origin'))
  if (!origin) return new NextResponse(null, { status: 403, headers: deniedCorsHeaders() })
  return new NextResponse(null, { status: 204, headers: corsHeaders(origin) })
}

export async function POST(request: NextRequest) {
  const origin = resolveHasmCorsOrigin(request.headers.get('origin'))
  if (!origin) {
    return NextResponse.json({ error: 'origin_forbidden' }, { status: 403, headers: deniedCorsHeaders() })
  }
  const cors = corsHeaders(origin)

  const contentLength = Number(request.headers.get('content-length') || 0)
  if (contentLength > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'invalid_submission' }, { status: 413, headers: cors })
  }

  let body: unknown
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid_submission' }, { status: 400, headers: cors })
  }

  const parsed = parseHasmLeadInput(body)
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400, headers: cors })
  }
  if (!isPayloadConfigured()) {
    return NextResponse.json({ error: 'service_unavailable' }, { status: 503, headers: cors })
  }

  const now = new Date()
  const ipAddress = getClientIp(request.headers) || null

  try {
    const payload = await getPayloadClient()
    const existingSubmission = await payload.find({
      collection: 'hasm-erp-leads' as never,
      where: { submissionId: { equals: parsed.data.submissionId } },
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    const prior = existingSubmission.docs[0] as { id: string | number } | undefined
    if (prior) {
      return NextResponse.json({ success: true, leadId: prior.id }, { status: 200, headers: cors })
    }

    if (ipAddress) {
      const recentFromIp = await payload.count({
        collection: 'hasm-erp-leads' as never,
        where: {
          and: [
            { ipAddress: { equals: ipAddress } },
            { createdAt: { greater_than: new Date(now.getTime() - RATE_LIMIT_WINDOW_MS).toISOString() } },
          ],
        },
        overrideAccess: true,
      })
      if (recentFromIp.totalDocs >= MAX_LEADS_PER_IP) {
        return NextResponse.json({ error: 'rate_limited' }, { status: 429, headers: cors })
      }
    }

    const recentDuplicate = await payload.find({
      collection: 'hasm-erp-leads' as never,
      where: {
        and: [
          { createdAt: { greater_than: new Date(now.getTime() - RECENT_DUPLICATE_WINDOW_MS).toISOString() } },
          {
            or: [
              { email: { equals: parsed.data.email } },
              { phone: { equals: parsed.data.phone } },
            ],
          },
        ],
      },
      sort: '-createdAt',
      limit: 1,
      depth: 0,
      overrideAccess: true,
    })
    const duplicate = recentDuplicate.docs[0] as { id: string | number } | undefined
    if (duplicate) {
      return NextResponse.json({ success: true, leadId: duplicate.id }, { status: 200, headers: cors })
    }

    const lead = await payload.create({
      collection: 'hasm-erp-leads' as never,
      data: {
        ...parsed.data,
        ipAddress: ipAddress || undefined,
        userAgent: request.headers.get('user-agent')?.slice(0, 500) || undefined,
        acceptLanguage: request.headers.get('accept-language')?.slice(0, 160) || undefined,
        consentAt: now.toISOString(),
        source: 'hasm-public-demo',
        product: 'Hasm ERP',
        status: 'new',
        createdAt: now.toISOString(),
      } as never,
      overrideAccess: true,
    })

    return NextResponse.json(
      { success: true, leadId: (lead as { id: string | number }).id },
      { status: 201, headers: cors },
    )
  } catch (error) {
    console.error('[hasm-erp-lead] Payload save failed', error)
    return NextResponse.json({ error: 'service_unavailable' }, { status: 503, headers: cors })
  }
}
