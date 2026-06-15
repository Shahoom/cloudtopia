import { NextResponse } from 'next/server'
import { BASE_URL, COMPANY, MCP_SERVER_NAME, MCP_SERVER_VERSION, RESOURCES } from '@/lib/agent/site-facts'

export const runtime = 'nodejs'

/**
 * MCP Server Card (SEP-1649) served at /.well-known/mcp/server-card.json (via a
 * rewrite). Advertises the live read-only MCP server at /api/mcp so agents can
 * discover and connect to it. `capabilities` lists the supported MCP feature
 * types — this server exposes tools only (no resources/prompts yet). Real
 * capability negotiation happens in the `initialize` handshake at the endpoint.
 */
export function GET() {
  const card = {
    serverInfo: {
      name: MCP_SERVER_NAME,
      title: COMPANY.name,
      version: MCP_SERVER_VERSION,
    },
    transport: {
      type: 'streamable-http',
      endpoint: RESOURCES.mcpEndpoint,
    },
    capabilities: ['tools'],
    description:
      'Read-only MCP server for CloudTopia — query the company overview, the 7 service ' +
      'categories, pricing, contact/WhatsApp routing, and search published articles.',
    documentationUrl: RESOURCES.llms,
    websiteUrl: BASE_URL,
  }

  return new NextResponse(JSON.stringify(card, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
