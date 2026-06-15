import { NextResponse } from 'next/server'
import { BASE_URL, COMPANY, MCP_SERVER_VERSION, RESOURCES, SERVICES } from '@/lib/agent/site-facts'

export const runtime = 'nodejs'

/**
 * OpenAPI 3.1 description served at /openapi.json (via a rewrite) and referenced
 * as `service-desc` in the API catalog. It documents only the genuinely public,
 * agent-safe HTTP endpoints: the health check and the existing public contact
 * intake (already callable from the site's own forms). Read-only data access for
 * agents is provided through the MCP server (see externalDocs).
 */
export function GET() {
  const serviceEnum = SERVICES.map((s) => s.title)

  const spec = {
    openapi: '3.1.0',
    info: {
      title: `${COMPANY.name} Public API`,
      version: MCP_SERVER_VERSION,
      description:
        `${COMPANY.description}\n\nThis document describes the public HTTP endpoints agents may call. ` +
        `Richer read-only access (services, pricing, contact routing, article search) is available ` +
        `through the Model Context Protocol server at ${RESOURCES.mcpEndpoint} — see the MCP Server Card.`,
      contact: { name: `${COMPANY.name}`, email: 'info@cloudtopia.net', url: BASE_URL },
    },
    servers: [{ url: BASE_URL }],
    externalDocs: { description: 'LLM context (llms.txt) and MCP Server Card', url: RESOURCES.llms },
    paths: {
      '/api/health': {
        get: {
          operationId: 'getHealth',
          summary: 'Service health / liveness check',
          responses: {
            '200': {
              description: 'Service is reachable',
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    properties: {
                      status: { type: 'string', example: 'ok' },
                      service: { type: 'string' },
                      version: { type: 'string' },
                      time: { type: 'string', format: 'date-time' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      '/api/contact': {
        post: {
          operationId: 'submitContactInquiry',
          summary: 'Submit a sales/contact inquiry to CloudTopia',
          description:
            'Sends a business inquiry to the CloudTopia team. Either an email or a phone number is required, ' +
            'and a message is required. Agents may use this to request a quote or contact on a user\'s behalf.',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  required: ['message'],
                  properties: {
                    name: { type: 'string', maxLength: 160 },
                    email: { type: 'string', format: 'email', maxLength: 180 },
                    phone: { type: 'string', maxLength: 80 },
                    company: { type: 'string', maxLength: 180 },
                    country: { type: 'string', maxLength: 120 },
                    service: { type: 'string', maxLength: 180, enum: serviceEnum },
                    budget: { type: 'string', maxLength: 120 },
                    timeline: { type: 'string', maxLength: 120 },
                    message: { type: 'string', maxLength: 3000 },
                    locale: { type: 'string', enum: ['en', 'ar'], default: 'en' },
                  },
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Inquiry captured',
              content: { 'application/json': { schema: { type: 'object', properties: { ok: { type: 'boolean' } } } } },
            },
            '400': { description: 'Validation error' },
            '503': { description: 'Inquiry could not be stored — retry or contact info@cloudtopia.net' },
          },
        },
      },
    },
  }

  return new NextResponse(JSON.stringify(spec, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
