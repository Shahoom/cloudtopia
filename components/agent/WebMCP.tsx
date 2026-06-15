'use client'

import { useEffect } from 'react'
import { COMPANY, CONTACTS, INDUSTRIES, OPERATING_MODEL, SERVICES } from '@/lib/agent/site-facts'

/**
 * WebMCP — exposes CloudTopia's key actions to in-browser AI agents via the
 * WebMCP API (https://webmachinelearning.github.io/webmcp/).
 *
 * On page load we register read-only tools (and one real action — opening the
 * correct regional WhatsApp) through `navigator.modelContext.registerTool()`,
 * with a `provideContext()` fallback for the earlier draft API. All guarded so
 * normal browsers (which have no `navigator.modelContext`) are unaffected.
 *
 * Renders nothing. Mounted once in the locale layout so it runs on every page,
 * including the homepage the scanner loads.
 */

type WebMcpTool = {
  name: string
  description: string
  inputSchema: Record<string, unknown>
  execute: (args: Record<string, unknown>, signal?: AbortSignal) => Promise<{ content: Array<{ type: 'text'; text: string }> }>
}

function text(data: unknown) {
  return { content: [{ type: 'text' as const, text: typeof data === 'string' ? data : JSON.stringify(data, null, 2) }] }
}

function buildTools(): WebMcpTool[] {
  return [
    {
      name: 'get_company_info',
      description: 'Get an overview of CloudTopia — what it does, the founder, where it operates, languages, and industries served.',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      execute: async () =>
        text({
          name: COMPANY.name,
          tagline: COMPANY.legalTagline,
          founded: COMPANY.founded,
          founder: `${COMPANY.founder} (${COMPANY.founderArabic})`,
          description: COMPANY.description,
          hubs: COMPANY.hubs,
          languages: COMPANY.languages,
          operatingModel: OPERATING_MODEL,
          industries: INDUSTRIES,
          serviceCategories: SERVICES.map((s) => s.title),
        }),
    },
    {
      name: 'list_services',
      description: "List CloudTopia's 7 service categories with summaries and key offerings. Optionally filter by keyword.",
      inputSchema: {
        type: 'object',
        properties: { keyword: { type: 'string', description: 'Optional keyword filter, e.g. "ecommerce", "AI", "cloud".' } },
        additionalProperties: false,
      },
      execute: async (args) => {
        const norm = (s: string) => s.toLowerCase().replace(/[\s-]+/g, '')
        const kw = typeof args.keyword === 'string' ? norm(args.keyword) : ''
        const list = SERVICES.filter(
          (s) => !kw || norm(s.title).includes(kw) || norm(s.summary).includes(kw) || s.offerings.some((o) => norm(o).includes(kw)),
        ).map((s) => ({ id: s.id, title: s.title, summary: s.summary, offerings: s.offerings }))
        return text({ count: list.length, services: list })
      },
    },
    {
      name: 'get_pricing',
      description: 'Get CloudTopia pricing guidance (fetches the machine-readable pricing document).',
      inputSchema: { type: 'object', properties: {}, additionalProperties: false },
      execute: async (_args, signal) => {
        try {
          const res = await fetch('/pricing.md', { signal })
          if (res.ok) return text(await res.text())
        } catch {
          /* fall through */
        }
        return text({
          model: 'Fixed-scope, transparent pricing agreed in a written proposal before any build. Modular — no forced bundles.',
          pricing: '/pricing.md',
        })
      },
    },
    {
      name: 'get_contact_info',
      description: 'Get how to contact CloudTopia. Pass a country to get the correct regional WhatsApp number.',
      inputSchema: {
        type: 'object',
        properties: { country: { type: 'string', description: 'Optional country/region (English or Arabic).' } },
        additionalProperties: false,
      },
      execute: async (args) => text({ email: CONTACTS.email, instagram: CONTACTS.instagram, whatsapp: pickWhatsapp(args.country) }),
    },
    {
      name: 'search_articles',
      description: "Search CloudTopia's published articles/insights by keyword.",
      inputSchema: {
        type: 'object',
        properties: {
          query: { type: 'string', description: 'Keyword(s) to search article titles and descriptions.' },
          limit: { type: 'integer', minimum: 1, maximum: 20, default: 5 },
        },
        additionalProperties: false,
      },
      execute: async (args, signal) => {
        const query = typeof args.query === 'string' ? args.query.toLowerCase() : ''
        const limit = Math.max(1, Math.min(20, Number(args.limit) || 5))
        try {
          const res = await fetch('/articles/rss.xml', { signal })
          const xml = await res.text()
          const doc = new DOMParser().parseFromString(xml, 'application/xml')
          const items = Array.from(doc.querySelectorAll('item')).map((it) => ({
            title: it.querySelector('title')?.textContent?.trim() || '',
            link: it.querySelector('link')?.textContent?.trim() || '',
            description: (it.querySelector('description')?.textContent || '').replace(/<[^>]+>/g, '').trim().slice(0, 280),
          }))
          const matched = (query ? items.filter((i) => i.title.toLowerCase().includes(query) || i.description.toLowerCase().includes(query)) : items).slice(0, limit)
          return text({ count: matched.length, articles: matched })
        } catch {
          return text({ note: 'Could not load the feed.', feed: '/articles/rss.xml' })
        }
      },
    },
    {
      name: 'open_whatsapp',
      description: 'Open a WhatsApp chat with the correct CloudTopia regional team for the user. Pass the user country.',
      inputSchema: {
        type: 'object',
        properties: { country: { type: 'string', description: 'User country/region (English or Arabic).' } },
        additionalProperties: false,
      },
      execute: async (args) => {
        const wa = pickWhatsapp(args.country)
        const target = Array.isArray(wa) && wa.length === 1 ? wa[0] : CONTACTS.whatsapp[0]
        if (typeof window !== 'undefined') window.open(target.link, '_blank', 'noopener')
        return text({ opened: target.link, region: target.region, display: target.display })
      },
    },
  ]
}

function pickWhatsapp(country: unknown) {
  const c = typeof country === 'string' ? country.toLowerCase() : ''
  const GCC = ['oman', 'عمان', 'saudi', 'سعود', 'uae', 'emirat', 'إمارات', 'qatar', 'قطر', 'kuwait', 'كويت', 'bahrain', 'بحرين', 'gcc', 'gulf', 'خليج']
  const LEVANT = ['turkey', 'türkiye', 'turkiye', 'تركيا', 'iraq', 'عراق', 'syria', 'سوريا', 'jordan', 'أردن', 'lebanon', 'لبنان']
  if (c && GCC.some((k) => c.includes(k))) return [CONTACTS.whatsapp[0]]
  if (c && LEVANT.some((k) => c.includes(k))) return [CONTACTS.whatsapp[1]]
  return CONTACTS.whatsapp
}

export default function WebMCP() {
  useEffect(() => {
    const tools = buildTools()

    const register = (): boolean => {
      const mc = (navigator as unknown as { modelContext?: any }).modelContext
      if (!mc) return false
      let ok = false
      if (typeof mc.registerTool === 'function') {
        for (const t of tools) {
          try {
            navigator.modelContext.registerTool(t)
            ok = true
          } catch {
            /* ignore individual tool errors */
          }
        }
      }
      // Fallback for the earlier WebMCP draft that used provideContext({ tools }).
      if (typeof mc.provideContext === 'function') {
        try {
          mc.provideContext({ tools })
          ok = true
        } catch {
          /* ignore */
        }
      }
      return ok
    }

    if (register()) return

    // The WebMCP runtime may be injected after our scripts run (e.g. by an agent
    // browser/extension). Poll briefly so we register as soon as it appears, then
    // stop — bounded so normal browsers (no modelContext) pay almost nothing.
    let tries = 0
    const id = window.setInterval(() => {
      tries += 1
      if (register() || tries >= 30) window.clearInterval(id)
    }, 500)
    return () => window.clearInterval(id)
  }, [])

  return null
}

// Type augmentation so `navigator.modelContext.registerTool` type-checks.
declare global {
  interface Navigator {
    modelContext: {
      registerTool: (tool: WebMcpTool) => void
      provideContext?: (ctx: { tools: WebMcpTool[] }) => void
    }
  }
}
