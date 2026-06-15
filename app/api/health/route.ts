import { NextResponse } from 'next/server'
import { BASE_URL, COMPANY, MCP_SERVER_VERSION, RESOURCES } from '@/lib/agent/site-facts'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * Liveness/status endpoint advertised as the `status` relation in the RFC 9727
 * API catalog. Agents can poll this to confirm the service is reachable before
 * calling the MCP server or other endpoints.
 */
export function GET() {
  return NextResponse.json(
    {
      status: 'ok',
      service: COMPANY.name,
      version: MCP_SERVER_VERSION,
      time: new Date().toISOString(),
      endpoints: {
        mcp: RESOURCES.mcpEndpoint,
        apiCatalog: RESOURCES.apiCatalog,
        openapi: RESOURCES.openapi,
        llms: RESOURCES.llms,
        website: BASE_URL,
      },
    },
    {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
        'Access-Control-Allow-Origin': '*',
      },
    },
  )
}
