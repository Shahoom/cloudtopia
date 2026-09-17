import { NextRequest, NextResponse } from 'next/server'
import {
  BASE_URL,
  COMPANY,
  CONTACTS,
  INDUSTRIES,
  MCP_SERVER_NAME,
  MCP_SERVER_VERSION,
  OPERATING_MODEL,
  RESOURCES,
  SERVICES,
} from '@/lib/agent/site-facts'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Read-only Model Context Protocol (MCP) server for CloudTopia.
 *
 * Speaks JSON-RPC 2.0 over the Streamable HTTP transport (POST). It exposes a
 * small set of read-only tools backed by the canonical facts in
 * `lib/agent/site-facts.ts`, so agents can answer questions about CloudTopia
 * without scraping HTML. Discoverable via /.well-known/mcp/server-card.json.
 *
 * It is deliberately stateless and tools-only: no auth, no mutations, no
 * server-initiated SSE (GET returns 405). The only side-effect-capable action
 * agents can take (submitting an inquiry) stays behind the documented public
 * /api/contact HTTP endpoint, not an MCP tool.
 */

const PROTOCOL_VERSION = '2025-06-18'

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Mcp-Session-Id, Mcp-Protocol-Version',
}

// ── Tool definitions ────────────────────────────────────────────────────────

type Tool = {
  name: string
  description: string
  inputSchema: Record<string, unknown>
  handler: (args: Record<string, unknown>) => Promise<unknown> | unknown
}

const TOOLS: Tool[] = [
  {
    name: 'get_company_info',
    description:
      'Get an overview of CloudTopia: what it is, the founder, where it operates, languages, operating model, and industries served.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    handler: () => ({
      name: COMPANY.name,
      nameArabic: COMPANY.nameArabic,
      tagline: COMPANY.legalTagline,
      founded: COMPANY.founded,
      founder: `${COMPANY.founder} (${COMPANY.founderArabic})`,
      founderRole: COMPANY.founderRole,
      description: COMPANY.description,
      philosophy: COMPANY.philosophy,
      hubs: COMPANY.hubs,
      alsoServes: COMPANY.alsoServes,
      languages: COMPANY.languages,
      operatingModel: OPERATING_MODEL,
      industries: INDUSTRIES,
      serviceCategories: SERVICES.map((s) => s.title),
      website: BASE_URL,
    }),
  },
  {
    name: 'list_services',
    description:
      'List CloudTopia\'s 6 service categories with a summary and key offerings for each. Optionally filter by a keyword.',
    inputSchema: {
      type: 'object',
      properties: {
        keyword: { type: 'string', description: 'Optional keyword to filter categories/offerings (e.g. "ecommerce", "AI", "cloud").' },
      },
      additionalProperties: false,
    },
    handler: (args) => {
      const keyword = typeof args.keyword === 'string' ? args.keyword.trim() : ''
      const list = SERVICES.map((s) => ({
        id: s.id,
        title: s.title,
        titleArabic: s.titleArabic,
        summary: s.summary,
        offerings: s.offerings,
      }))
      if (!keyword) return { count: list.length, services: list }
      // Match hyphen/space-insensitively so "ecommerce" finds "E-commerce".
      const norm = (s: string) => s.toLowerCase().replace(/[\s-]+/g, '')
      const nk = norm(keyword)
      const filtered = list.filter(
        (s) =>
          norm(s.title).includes(nk) ||
          norm(s.summary).includes(nk) ||
          s.offerings.some((o) => norm(o).includes(nk)),
      )
      return { count: filtered.length, keyword, services: filtered }
    },
  },
  {
    name: 'get_service_details',
    description: 'Get the full details (summary + offerings) for one CloudTopia service category by its id.',
    inputSchema: {
      type: 'object',
      properties: {
        id: {
          type: 'string',
          description: 'Service category id.',
          enum: SERVICES.map((s) => s.id),
        },
      },
      required: ['id'],
      additionalProperties: false,
    },
    handler: (args) => {
      const id = String(args.id || '').trim().toLowerCase()
      const svc = SERVICES.find((s) => s.id === id || s.title.toLowerCase() === id)
      if (!svc) {
        return { error: `Unknown service id "${id}". Valid ids: ${SERVICES.map((s) => s.id).join(', ')}.` }
      }
      return svc
    },
  },
  {
    name: 'get_contact_info',
    description:
      'Get how to contact CloudTopia. Optionally pass a country to get the correct regional WhatsApp number (Oman/GCC vs Türkiye/Levant).',
    inputSchema: {
      type: 'object',
      properties: {
        country: { type: 'string', description: 'Optional country or region name (English or Arabic).' },
      },
      additionalProperties: false,
    },
    handler: (args) => {
      const country = typeof args.country === 'string' ? args.country.trim().toLowerCase() : ''
      const GCC = ['oman', 'عمان', 'saudi', 'سعود', 'uae', 'emirat', 'إمارات', 'الامارات', 'qatar', 'قطر', 'kuwait', 'كويت', 'bahrain', 'بحرين', 'gcc', 'gulf', 'خليج']
      const LEVANT = ['turkey', 'türkiye', 'turkiye', 'تركيا', 'iraq', 'عراق', 'syria', 'سوريا', 'jordan', 'أردن', 'الاردن', 'lebanon', 'لبنان', 'levant']
      let whatsapp: typeof CONTACTS.whatsapp | typeof CONTACTS.whatsapp[number][] = CONTACTS.whatsapp
      if (country) {
        if (GCC.some((k) => country.includes(k))) whatsapp = [CONTACTS.whatsapp[0]]
        else if (LEVANT.some((k) => country.includes(k))) whatsapp = [CONTACTS.whatsapp[1]]
      }
      return {
        email: CONTACTS.email,
        website: CONTACTS.website,
        instagram: CONTACTS.instagram,
        whatsapp,
        note: country ? undefined : 'Pass a country to get the single best WhatsApp number; otherwise both are returned.',
      }
    },
  },
  {
    name: 'get_pricing',
    description:
      'Get CloudTopia pricing guidance. Returns the machine-readable pricing document content when reachable, plus the canonical pricing URLs.',
    inputSchema: { type: 'object', properties: {}, additionalProperties: false },
    handler: async () => {
      const fallback = {
        model:
          'Fixed-scope, transparent pricing agreed in a written proposal before any build. Services are modular — clients pick only what they need, with no forced bundles.',
        pricingUrl: RESOURCES.pricing,
        pricingUrlArabic: RESOURCES.pricingArabic,
      }
      try {
        const text = await fetchText(RESOURCES.pricing, 4000)
        if (text) return { ...fallback, pricingMarkdown: text }
      } catch {
        /* fall through to fallback */
      }
      return fallback
    },
  },
  {
    name: 'search_articles',
    description:
      'Search CloudTopia\'s published articles/insights by keyword. Returns matching titles, links and short descriptions.',
    inputSchema: {
      type: 'object',
      properties: {
        query: { type: 'string', description: 'Keyword(s) to search for in article titles and descriptions.' },
        limit: { type: 'integer', minimum: 1, maximum: 20, default: 5 },
        locale: { type: 'string', enum: ['en', 'ar'], default: 'en' },
      },
      additionalProperties: false,
    },
    handler: async (args) => {
      const query = typeof args.query === 'string' ? args.query.trim().toLowerCase() : ''
      const limit = clampInt(args.limit, 1, 20, 5)
      const locale = args.locale === 'ar' ? 'ar' : 'en'
      const feedUrl = locale === 'ar' ? RESOURCES.rssArabic : RESOURCES.rss
      try {
        const xml = await fetchText(feedUrl, 6000)
        const items = parseRssItems(xml)
        const matched = (query
          ? items.filter((it) => it.title.toLowerCase().includes(query) || it.description.toLowerCase().includes(query))
          : items
        ).slice(0, limit)
        return { query: query || null, locale, count: matched.length, articles: matched, feed: feedUrl }
      } catch {
        return {
          query: query || null,
          locale,
          note: 'Could not fetch the feed; browse articles directly.',
          feed: feedUrl,
          sitemap: RESOURCES.sitemap,
        }
      }
    },
  },
]

// ── JSON-RPC plumbing ───────────────────────────────────────────────────────

type JsonRpcRequest = { jsonrpc?: string; id?: unknown; method?: string; params?: Record<string, unknown> }

function rpcResult(id: unknown, result: unknown) {
  return { jsonrpc: '2.0', id: id ?? null, result }
}
function rpcError(id: unknown, code: number, message: string) {
  return { jsonrpc: '2.0', id: id ?? null, error: { code, message } }
}

async function handleOne(req: JsonRpcRequest): Promise<object | null> {
  const { id, method } = req
  const isNotification = id === undefined || id === null

  switch (method) {
    case 'initialize':
      return rpcResult(id, {
        protocolVersion: PROTOCOL_VERSION,
        capabilities: { tools: { listChanged: false } },
        serverInfo: { name: MCP_SERVER_NAME, title: COMPANY.name, version: MCP_SERVER_VERSION },
        instructions:
          'Read-only CloudTopia server. Use list_services / get_service_details / get_company_info / get_pricing / get_contact_info / search_articles.',
      })

    case 'ping':
      return rpcResult(id, {})

    case 'tools/list':
      return rpcResult(id, {
        tools: TOOLS.map((t) => ({ name: t.name, description: t.description, inputSchema: t.inputSchema })),
      })

    case 'tools/call': {
      const name = req.params?.name as string | undefined
      const args = (req.params?.arguments as Record<string, unknown>) || {}
      const tool = TOOLS.find((t) => t.name === name)
      if (!tool) return rpcError(id, -32602, `Unknown tool: ${name}`)
      try {
        const data = await tool.handler(args)
        return rpcResult(id, {
          content: [{ type: 'text', text: JSON.stringify(data, null, 2) }],
          structuredContent: data,
          isError: false,
        })
      } catch (err) {
        return rpcResult(id, {
          content: [{ type: 'text', text: `Error running ${name}: ${(err as Error).message}` }],
          isError: true,
        })
      }
    }

    default:
      // Notifications (e.g. notifications/initialized) get no response.
      if (isNotification) return null
      return rpcError(id, -32601, `Method not found: ${method}`)
  }
}

export async function POST(request: NextRequest) {
  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json(rpcError(null, -32700, 'Parse error'), { status: 400, headers: CORS_HEADERS })
  }

  const batch = Array.isArray(payload)
  const requests = (batch ? payload : [payload]) as JsonRpcRequest[]
  const responses = (await Promise.all(requests.map(handleOne))).filter((r): r is object => r !== null)

  // Only notifications → 202 Accepted with no body (Streamable HTTP).
  if (responses.length === 0) {
    return new NextResponse(null, { status: 202, headers: CORS_HEADERS })
  }

  return NextResponse.json(batch ? responses : responses[0], {
    status: 200,
    headers: { ...CORS_HEADERS, 'Cache-Control': 'no-store' },
  })
}

export function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS })
}

export function GET() {
  // This server does not support server-initiated SSE; clients must POST.
  return NextResponse.json(
    rpcError(null, -32000, 'This MCP endpoint uses Streamable HTTP. Send JSON-RPC requests via POST.'),
    { status: 405, headers: { ...CORS_HEADERS, Allow: 'POST, OPTIONS' } },
  )
}

// ── helpers ─────────────────────────────────────────────────────────────────

async function fetchText(url: string, timeoutMs: number): Promise<string> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  try {
    const res = await fetch(url, { signal: controller.signal, headers: { 'User-Agent': 'CloudTopia-MCP/1.0' } })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.text()
  } finally {
    clearTimeout(timer)
  }
}

function clampInt(value: unknown, min: number, max: number, fallback: number): number {
  const n = typeof value === 'number' ? value : parseInt(String(value), 10)
  if (!Number.isFinite(n)) return fallback
  return Math.max(min, Math.min(max, Math.trunc(n)))
}

function parseRssItems(xml: string): Array<{ title: string; link: string; description: string }> {
  const items: Array<{ title: string; link: string; description: string }> = []
  const itemRe = /<item\b[^>]*>([\s\S]*?)<\/item>/gi
  let m: RegExpExecArray | null
  while ((m = itemRe.exec(xml)) !== null) {
    const block = m[1]
    items.push({
      title: decodeXml(pick(block, 'title')),
      link: decodeXml(pick(block, 'link')),
      description: decodeXml(pick(block, 'description')).replace(/<[^>]+>/g, '').trim().slice(0, 280),
    })
  }
  return items
}

function pick(block: string, tag: string): string {
  const re = new RegExp(`<${tag}\\b[^>]*>([\\s\\S]*?)<\\/${tag}>`, 'i')
  const m = re.exec(block)
  if (!m) return ''
  return m[1].replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1').trim()
}

function decodeXml(s: string): string {
  return s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
}
