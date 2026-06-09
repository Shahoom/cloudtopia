import 'server-only'

import type { AILeadInput } from './types.ts'
import type { Pool } from 'pg'
import { getDatabaseUrl, isPayloadConfigured } from '@/lib/cms/env.ts'
import { getPayloadClient } from '@/lib/cms/payload.ts'

export type LeadSaveResult =
  | {
      saved: true
      id: string
      destination: 'payload' | 'postgres-fallback'
    }
  | {
      saved: false
      destination: 'fallback'
      reason: string
    }

let fallbackPool: Pool | null = null

export async function saveAIChatLead(lead: AILeadInput): Promise<LeadSaveResult> {
  if (!isPayloadConfigured()) {
    const fallback = await saveLeadToPostgresFallback(lead)
    if (fallback) return fallback

    return {
      saved: false,
      destination: 'fallback',
      reason: 'Payload is not configured. Connect this service to your CRM or database when ready.',
    }
  }

  try {
    const payload = await getPayloadClient()
    const saved = await payload.create({
      collection: 'ai-chat-leads' as never,
      data: lead as never,
      overrideAccess: true,
    })

    return {
      saved: true,
      id: String((saved as { id?: string | number }).id ?? ''),
      destination: 'payload',
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ai-chatbot] Failed to save lead', error)
    }

    const fallback = await saveLeadToPostgresFallback(lead)
    if (fallback) return fallback

    return {
      saved: false,
      destination: 'fallback',
      reason:
        'Lead persistence is available through saveAIChatLead. If Payload migrations are not applied yet, connect this abstraction to the active CRM/table.',
    }
  }
}

async function saveLeadToPostgresFallback(lead: AILeadInput): Promise<LeadSaveResult | null> {
  const databaseUrl = getDatabaseUrl()
  if (!databaseUrl) return null

  try {
    const pool = await getFallbackPool(databaseUrl)
    await pool.query(`
      create table if not exists ai_chatbot_leads (
        id bigserial primary key,
        name text,
        email text,
        phone text,
        country text,
        business_type text,
        service_needed text,
        budget_range text,
        timeline text,
        message text not null,
        page_url text,
        language text not null default 'unknown',
        source text not null default 'ai_chatbot',
        created_at timestamptz not null default now()
      )
    `)

    const result = await pool.query<{ id: string }>(
      `
        insert into ai_chatbot_leads (
          name,
          email,
          phone,
          country,
          business_type,
          service_needed,
          budget_range,
          timeline,
          message,
          page_url,
          language,
          source,
          created_at
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
        returning id
      `,
      [
        lead.name,
        lead.email,
        lead.phone,
        lead.country,
        lead.businessType,
        lead.serviceNeeded,
        lead.budgetRange,
        lead.timeline,
        lead.message,
        lead.pageUrl,
        lead.language,
        lead.source,
        lead.createdAt,
      ],
    )

    return {
      saved: true,
      id: String(result.rows[0]?.id ?? ''),
      destination: 'postgres-fallback',
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ai-chatbot] Failed to save lead to Postgres fallback', error)
    }
    return null
  }
}

async function getFallbackPool(databaseUrl: string) {
  if (fallbackPool) return fallbackPool
  const { Pool } = await import('pg')
  fallbackPool = new Pool({
    connectionString: databaseUrl,
    max: 1,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 10_000,
  })
  return fallbackPool
}
