import type { Pool } from 'pg'
import type { AIRecommendationDetails, SolutionFinderLead, SolutionFinderPayload } from './types.ts'
import { getAnswerLabel, getBudgetLabel, getTimelineLabel } from '@/components/solution-finder/recommendationEngine.ts'

export type SolutionFinderLeadSaveResult =
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

export function buildSolutionFinderLead(
  payload: SolutionFinderPayload,
  aiRecommendation?: AIRecommendationDetails,
): SolutionFinderLead {
  return {
    name: clean(payload.name, 160) || 'Unknown',
    phone: clean(payload.phone, 100),
    email: clean(payload.email, 180).toLowerCase(),
    company: clean(payload.company, 180),
    country: clean(payload.country, 120),
    industry: clean(payload.industry, 120),
    projectType: clean(payload.projectType, 120),
    businessGoal: clean(payload.businessGoal, 120),
    budget: clean(payload.budget, 120),
    timeline: clean(payload.timeline, 120),
    description: clean(payload.description, 2000),
    contactMethod: clean(payload.contactMethod, 80) || 'whatsapp',
    wantContact: payload.wantContact ?? true,
    recommendedPackage: clean(payload.recommendedPackage, 220),
    recommendedRoute: clean(payload.recommendedRoute, 500),
    selectedAnswerSummary: buildSelectedAnswerSummary(payload),
    aiSource: aiRecommendation?.source || '',
    aiSummary: clean(aiRecommendation?.summary, 2000),
    aiCountryAdvice: clean(aiRecommendation?.countryAdvice, 1200),
    aiBudgetAdvice: clean(aiRecommendation?.budgetAdvice, 1200),
    aiWhatsappOpening: clean(aiRecommendation?.whatsappOpening, 500),
    aiRoadmap: (aiRecommendation?.roadmap ?? []).map((step) => ({ step: clean(step, 500) })).filter((item) => item.step),
    aiNextQuestions: (aiRecommendation?.nextQuestions ?? []).map((question) => ({ question: clean(question, 500) })).filter((item) => item.question),
    locale: payload.locale === 'ar' ? 'ar' : 'en',
    status: 'new',
    source: 'solution-finder',
    createdAt: payload.createdAt || new Date().toISOString(),
  }
}

export async function saveSolutionFinderLead(lead: SolutionFinderLead): Promise<SolutionFinderLeadSaveResult> {
  const { getDatabaseUrl, isPayloadConfigured } = await import('@/lib/cms/env.ts')
  const { getPayloadClient } = await import('@/lib/cms/payload.ts')

  if (!isPayloadConfigured()) {
    const fallback = await saveLeadToPostgresFallback(lead)
    if (fallback) return fallback

    return {
      saved: false,
      destination: 'fallback',
      reason: 'Payload is not configured. Connect solution finder leads to CRM when ready.',
    }
  }

  try {
    const payload = await getPayloadClient()
    const saved = await payload.create({
      collection: 'solution-finder-leads' as never,
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
      console.error('[solution-finder] Failed to save lead', error)
    }

    const fallback = await saveLeadToPostgresFallback(lead)
    if (fallback) return fallback

    return {
      saved: false,
      destination: 'fallback',
      reason: 'Lead persistence failed. Check Payload migrations or CRM database connection.',
    }
  }
}

async function saveLeadToPostgresFallback(lead: SolutionFinderLead): Promise<SolutionFinderLeadSaveResult | null> {
  const { getDatabaseUrl } = await import('@/lib/cms/env.ts')
  const databaseUrl = getDatabaseUrl()
  if (!databaseUrl) return null

  try {
    const pool = await getFallbackPool(databaseUrl)
    await pool.query(`
      create table if not exists solution_finder_leads (
        id bigserial primary key,
        name text not null,
        phone text not null,
        email text,
        company text,
        country text,
        industry text,
        project_type text,
        business_goal text,
        budget text,
        timeline text,
        description text,
        contact_method text,
        want_contact boolean not null default true,
        recommended_package text,
        recommended_route text,
        selected_answer_summary text,
        ai_source text,
        ai_summary text,
        ai_country_advice text,
        ai_budget_advice text,
        ai_whatsapp_opening text,
        ai_roadmap jsonb not null default '[]'::jsonb,
        ai_next_questions jsonb not null default '[]'::jsonb,
        locale text not null default 'en',
        status text not null default 'new',
        source text not null default 'solution-finder',
        created_at timestamptz not null default now()
      )
    `)

    await pool.query(`
      alter table solution_finder_leads
        add column if not exists selected_answer_summary text,
        add column if not exists ai_source text,
        add column if not exists ai_country_advice text,
        add column if not exists ai_budget_advice text,
        add column if not exists ai_whatsapp_opening text
    `)

    const result = await pool.query<{ id: string }>(
      `
        insert into solution_finder_leads (
          name,
          phone,
          email,
          company,
          country,
          industry,
          project_type,
          business_goal,
          budget,
          timeline,
          description,
          contact_method,
          want_contact,
          recommended_package,
          recommended_route,
          selected_answer_summary,
          ai_source,
          ai_summary,
          ai_country_advice,
          ai_budget_advice,
          ai_whatsapp_opening,
          ai_roadmap,
          ai_next_questions,
          locale,
          status,
          source,
          created_at
        )
        values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27)
        returning id
      `,
      [
        lead.name,
        lead.phone,
        lead.email,
        lead.company,
        lead.country,
        lead.industry,
        lead.projectType,
        lead.businessGoal,
        lead.budget,
        lead.timeline,
        lead.description,
        lead.contactMethod,
        lead.wantContact,
        lead.recommendedPackage,
        lead.recommendedRoute,
        lead.selectedAnswerSummary,
        lead.aiSource,
        lead.aiSummary,
        lead.aiCountryAdvice,
        lead.aiBudgetAdvice,
        lead.aiWhatsappOpening,
        JSON.stringify(lead.aiRoadmap),
        JSON.stringify(lead.aiNextQuestions),
        lead.locale,
        lead.status,
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
      console.error('[solution-finder] Failed to save lead to Postgres fallback', error)
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

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' && value.trim() ? value.trim().slice(0, maxLength) : ''
}

function buildSelectedAnswerSummary(payload: SolutionFinderPayload) {
  const locale = payload.locale === 'ar' ? 'ar' : 'en'
  const parts = [
    payload.industry ? `industry=${getAnswerLabel('industry', payload.industry, locale)} (${payload.industry})` : '',
    payload.projectType ? `projectType=${getAnswerLabel('project-type', payload.projectType, locale)} (${payload.projectType})` : '',
    payload.businessGoal ? `businessGoal=${getAnswerLabel('business-goal', payload.businessGoal, locale)} (${payload.businessGoal})` : '',
    payload.budget ? `budget=${getBudgetLabel(payload.budget, locale)} (${payload.budget})` : '',
    payload.timeline ? `timeline=${getTimelineLabel(payload.timeline, locale)} (${payload.timeline})` : '',
    payload.country ? `country=${payload.country}` : '',
  ].filter(Boolean)

  return clean(parts.join(' | '), 1200)
}
