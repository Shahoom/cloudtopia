import { NextRequest, NextResponse } from 'next/server'
import {
  BASE_URL,
  COMPANY,
  CONTACTS,
  INDUSTRIES,
  OPERATING_MODEL,
  RESOURCES,
  SERVICES,
} from '@/lib/agent/site-facts'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * "Markdown for Agents" content negotiation handler.
 *
 * `proxy.ts` rewrites any non-asset request carrying `Accept: text/markdown`
 * here, passing the original path in `x-md-path`. We return a markdown view of
 * the page with `Content-Type: text/markdown`. HTML stays the default for
 * browsers, which never send that Accept header.
 */
export function GET(request: NextRequest) {
  const rawPath = request.headers.get('x-md-path') || '/'
  const locale: 'en' | 'ar' = rawPath === '/ar' || rawPath.startsWith('/ar/') ? 'ar' : 'en'
  const normalized = stripLocale(rawPath)
  const isHome = normalized === '/' || normalized === ''

  const markdown = isHome ? homepageMarkdown() : pageMarkdown(normalized, rawPath)
  const canonical = `${BASE_URL}${rawPath === '/en' ? '/' : rawPath}`

  return new NextResponse(markdown, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      'Vary': 'Accept',
      'x-markdown-tokens': String(Math.ceil(markdown.length / 4)),
      'Link': `<${canonical}>; rel="canonical"`,
      'Cache-Control': 'public, max-age=300, s-maxage=3600',
      'Access-Control-Allow-Origin': '*',
    },
  })
}

function stripLocale(path: string): string {
  if (path === '/en' || path === '/ar') return '/'
  if (path.startsWith('/en/')) return path.slice(3)
  if (path.startsWith('/ar/')) return path.slice(3)
  return path
}

function homepageMarkdown(): string {
  const services = SERVICES.map(
    (s) => `### ${s.title} (${s.titleArabic})\n${s.summary}\n\n${s.offerings.map((o) => `- ${o}`).join('\n')}`,
  ).join('\n\n')

  const whatsapp = CONTACTS.whatsapp.map((w) => `- **${w.region}** (${w.covers}): ${w.display} — ${w.link}`).join('\n')

  return `# ${COMPANY.name} — ${COMPANY.legalTagline}

> ${COMPANY.description}

*${COMPANY.philosophy}*

- **Founded:** ${COMPANY.founded}
- **Founder:** ${COMPANY.founder} (${COMPANY.founderArabic}) — ${COMPANY.founderRole}
- **Languages:** ${COMPANY.languages.join(', ')}
- **Website:** ${BASE_URL}

## Where CloudTopia operates

${COMPANY.hubs.map((h) => `- **${h.name}** — ${h.covers}`).join('\n')}
- Also serves ${COMPANY.alsoServes}.

## Services

CloudTopia organizes its work into 7 modular service categories (clients pick what they need — no forced bundles).

${services}

## How we work

${OPERATING_MODEL.map((m) => `- ${m}`).join('\n')}

## Industries served

${INDUSTRIES.map((i) => `- ${i}`).join('\n')}

## Contact

- **Email:** ${CONTACTS.email}
- **Instagram:** ${CONTACTS.instagram}
${whatsapp}

## Machine-readable resources for agents

- LLM context: ${RESOURCES.llms}
- Pricing: ${RESOURCES.pricing} (Arabic: ${RESOURCES.pricingArabic})
- API catalog: ${RESOURCES.apiCatalog}
- OpenAPI: ${RESOURCES.openapi}
- MCP server card: ${RESOURCES.mcpServerCard} (endpoint: ${RESOURCES.mcpEndpoint})
- Agent skills: ${RESOURCES.agentSkills}
- Sitemap: ${RESOURCES.sitemap}
`
}

function pageMarkdown(normalized: string, rawPath: string): string {
  const title = titleFromPath(normalized)
  const canonical = `${BASE_URL}${rawPath}`
  return `# ${title} — ${COMPANY.name}

${COMPANY.description}

- **Canonical HTML page:** ${canonical}
- **Full machine-readable context:** ${RESOURCES.llms}
- **Services overview:** ${SERVICES.map((s) => s.title).join(', ')}

## Contact

- Email: ${CONTACTS.email}
- Website: ${BASE_URL}
- WhatsApp: ${CONTACTS.whatsapp.map((w) => `${w.region} ${w.display}`).join(' · ')}

> This is a markdown rendering for AI agents. For the full page, request it as HTML (the default) at ${canonical}.
`
}

function titleFromPath(path: string): string {
  const seg = path.replace(/^\/+|\/+$/g, '').split('/').pop() || 'Home'
  return seg
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}
