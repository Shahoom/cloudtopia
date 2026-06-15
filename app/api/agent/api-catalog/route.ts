import { NextResponse } from 'next/server'
import { BASE_URL, RESOURCES } from '@/lib/agent/site-facts'

export const runtime = 'nodejs'

/**
 * RFC 9727 API Catalog, served at /.well-known/api-catalog (via a rewrite).
 * Body is an RFC 9264 "linkset": each member has an `anchor` plus link relations
 * whose values are arrays of target objects. We catalog the two agent entry
 * points — the site itself and the MCP server — pointing at the OpenAPI
 * description (service-desc), the LLM docs (service-doc) and the health endpoint
 * (status). Content-Type MUST be application/linkset+json.
 */
export function GET() {
  const body = {
    linkset: [
      {
        anchor: `${BASE_URL}/`,
        'service-desc': [
          { href: RESOURCES.openapi, type: 'application/vnd.oai.openapi+json', title: 'CloudTopia OpenAPI description' },
        ],
        'service-doc': [
          { href: RESOURCES.llms, type: 'text/markdown', title: 'CloudTopia LLM context (llms.txt)' },
        ],
        status: [
          { href: RESOURCES.health, type: 'application/json', title: 'Service health' },
        ],
        describedby: [
          { href: RESOURCES.sitemap, type: 'application/xml', title: 'Sitemap' },
        ],
        related: [
          { href: RESOURCES.pricing, type: 'text/markdown', title: 'Pricing (machine-readable)' },
          { href: RESOURCES.mcpServerCard, type: 'application/json', title: 'MCP Server Card' },
          { href: RESOURCES.agentSkills, type: 'application/json', title: 'Agent Skills index' },
        ],
      },
      {
        anchor: RESOURCES.mcpEndpoint,
        'service-desc': [
          { href: RESOURCES.mcpServerCard, type: 'application/json', title: 'MCP Server Card (SEP-1649)' },
        ],
        'service-doc': [
          { href: RESOURCES.llms, type: 'text/markdown', title: 'CloudTopia LLM context (llms.txt)' },
        ],
        status: [
          { href: RESOURCES.health, type: 'application/json', title: 'Service health' },
        ],
      },
    ],
  }

  return new NextResponse(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/linkset+json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
