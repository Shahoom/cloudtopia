import { NextResponse } from 'next/server'
import { BASE_URL } from '@/lib/agent/site-facts'

export const runtime = 'nodejs'

/**
 * Agent Skills discovery index (Agent Skills Discovery RFC v0.2.0), served at
 * /.well-known/agent-skills/index.json (via a rewrite).
 *
 * Each entry's `digest` is the SHA-256 of the served SKILL.md file (static under
 * public/.well-known/agent-skills/<name>/SKILL.md). The files are static, so the
 * digests are precomputed. If you edit a SKILL.md, regenerate its digest with:
 *   shasum -a 256 public/.well-known/agent-skills/<name>/SKILL.md
 */

const SKILLS: Array<{ name: string; description: string; sha256: string }> = [
  {
    name: 'company-overview',
    description: 'Understand what CloudTopia is, who runs it, where it operates, and where to get authoritative machine-readable context.',
    sha256: 'e3001e18f4463b020d1fbcc0e9238cc59fe7c04760af6f12b6e6071898d6f9e5',
  },
  {
    name: 'browse-services',
    description: "Explore CloudTopia's 7 service categories and their offerings to match a client need to the right service.",
    sha256: 'ab5f4b71432264f4fd6ae02a6a7764f00b8dcd38cccda01da6cffb4f0b9e5f4e',
  },
  {
    name: 'get-pricing',
    description: "Retrieve CloudTopia's pricing model and the machine-readable pricing documents.",
    sha256: 'c5cf052462c6ab72e5fc5da0be135a8eb1a2391ce986471be996f6fbc5d68984',
  },
  {
    name: 'contact-cloudtopia',
    description: 'Contact CloudTopia or submit a project inquiry, routed to the correct regional team.',
    sha256: '3ca3cc3961523118764913d805db36feaf6285752dcbc2c06da84dfb07f23983',
  },
]

export function GET() {
  const body = {
    $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
    skills: SKILLS.map((s) => ({
      name: s.name,
      type: 'skill-md',
      description: s.description,
      url: `${BASE_URL}/.well-known/agent-skills/${s.name}/SKILL.md`,
      digest: `sha256:${s.sha256}`,
    })),
  }

  return new NextResponse(JSON.stringify(body, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  })
}
