# Agent Discoverability (AI / "is it agent ready")

Implementation of the agent-discovery standards surfaced by Cloudflare's
`isitagentready.com` scanner. Everything here is **honest** — every endpoint
maps to a capability CloudTopia actually has. Checks that would advertise
capabilities we don't have (OAuth/OIDC auth, payment rails) were intentionally
**not** implemented (see "Intentionally skipped").

Canonical facts for all agent surfaces live in one module:
[`lib/agent/site-facts.ts`](../lib/agent/site-facts.ts).

## What was implemented

| Check | Where it lives | Public URL |
|---|---|---|
| **Link headers** (RFC 8288) | `next.config.mjs` → `headers()` | every page response |
| **Content Signals** | `public/robots.txt` | `/robots.txt` |
| **API catalog** (RFC 9727) | `app/api/agent/api-catalog/route.ts` | `/.well-known/api-catalog` |
| **OpenAPI** (service-desc) | `app/api/agent/openapi/route.ts` | `/openapi.json` |
| **Health** (status) | `app/api/health/route.ts` | `/api/health` |
| **Agent Skills index** (v0.2.0) | `app/api/agent/skills-index/route.ts` + `public/.well-known/agent-skills/*/SKILL.md` | `/.well-known/agent-skills/index.json` |
| **MCP Server Card** (SEP-1649) | `app/api/agent/mcp-server-card/route.ts` | `/.well-known/mcp/server-card.json` |
| **MCP server** (read-only) | `app/api/mcp/route.ts` | `/api/mcp` (POST, JSON-RPC) |
| **WebMCP** | `components/agent/WebMCP.tsx` (mounted in the locale layout) | runs on every page |
| **Markdown for Agents** | `proxy.ts` (negotiation) + `app/api/markdown/route.ts` | any page with `Accept: text/markdown` |

The well-known paths are mapped to clean route handlers via `rewrites()` in
`next.config.mjs`, and `proxy.ts` lets `/.well-known/*` bypass locale routing.

### MCP server tools (read-only)

`get_company_info`, `list_services`, `get_service_details`, `get_contact_info`,
`get_pricing`, `search_articles`. Discoverable via the server card; speaks
JSON-RPC 2.0 over Streamable HTTP. No mutations, no auth. The only write action
agents can take (submitting an inquiry) stays behind the documented public
`POST /api/contact` endpoint.

## Intentionally skipped (would misrepresent the site)

OAuth/OIDC discovery, OAuth Protected Resource Metadata, `auth.md`, and the four
payment protocols (x402, MPP, UCP, ACP). CloudTopia has no protected agent API
and no agent-payment rail, so publishing these would point agents at flows that
dead-end. Add them only if/when those capabilities actually exist.

## DNS-AID — what YOU need to do in Cloudflare

DNS-AID can't be done in code; it needs DNS records + DNSSEC on `cloudtopia.net`
(DNS is hosted at Cloudflare).

### 1. Add SVCB records (Cloudflare → your domain → DNS → Records → Add record)

For each record below: **Type** = `SVCB`, **TTL** = Auto.

| Name | Priority | Target | Value (SvcParams) |
|---|---|---|---|
| `_index._agents` | `1` | `cloudtopia.net` | `alpn="a2a" port="443"` |
| `_a2a._agents` | `1` | `cloudtopia.net` | `alpn="a2a" port="443"` |
| `_mcp._agents` | `1` | `cloudtopia.net` | `alpn="mcp" port="443"` |

Zone-file equivalent (if you import or use the API):

```dns
_index._agents.cloudtopia.net. 3600 IN SVCB 1 cloudtopia.net. alpn="a2a" port=443
_a2a._agents.cloudtopia.net.   3600 IN SVCB 1 cloudtopia.net. alpn="a2a" port=443
_mcp._agents.cloudtopia.net.   3600 IN SVCB 1 cloudtopia.net. alpn="mcp" port=443
```

Notes:
- If Cloudflare's editor rejects the `a2a`/`mcp` ALPN tokens, use `h2` instead —
  the scanner checks that the SVCB records exist under `_agents`, not the exact
  ALPN value.
- You can optionally add `mandatory="alpn,port"` to the Value field.

### 2. Enable DNSSEC (Cloudflare → your domain → DNS → Settings → Enable DNSSEC)

Cloudflare shows a **DS record** (Key Tag, Algorithm, Digest Type, Digest).
- If `cloudtopia.net` is registered **with Cloudflare Registrar** → DNSSEC is
  activated automatically; nothing else to do.
- If registered **elsewhere** → copy that DS record into your registrar's DNSSEC
  settings for `cloudtopia.net`. DNSSEC goes active once the registrar publishes
  it (can take a few hours).

### 3. Verify

```bash
dig +dnssec SVCB _index._agents.cloudtopia.net
dig +dnssec SVCB _mcp._agents.cloudtopia.net
# DNSSEC active when answers carry RRSIG records and the AD flag is set.
```

## Verifying everything else (after deploying to production)

These take effect once deployed to `cloudtopia.net`:

```bash
curl -I https://cloudtopia.net/                                   # Link: ... rel="api-catalog"
curl https://cloudtopia.net/robots.txt | grep Content-Signal
curl https://cloudtopia.net/.well-known/api-catalog               # application/linkset+json
curl https://cloudtopia.net/.well-known/mcp/server-card.json
curl https://cloudtopia.net/.well-known/agent-skills/index.json
curl https://cloudtopia.net/openapi.json
curl -H 'Accept: text/markdown' https://cloudtopia.net/           # Content-Type: text/markdown
curl -X POST https://cloudtopia.net/api/mcp -H 'Content-Type: application/json' \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
```

If you edit a `SKILL.md`, regenerate its digest in the skills index:
`shasum -a 256 public/.well-known/agent-skills/<name>/SKILL.md`.
