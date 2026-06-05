import { NextRequest, NextResponse } from 'next/server'
import { aiChatRateLimiter } from '@/lib/ai-chatbot/rateLimit.ts'
import { saveAIChatLead } from '@/lib/ai-chatbot/leadService.ts'
import { buildWhatsappHandoff } from '@/lib/ai-chatbot/whatsapp.ts'
import type { AILeadInput, ChatLocale } from '@/lib/ai-chatbot/types.ts'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  const rate = aiChatRateLimiter.check(`lead:${getRateLimitKey(request)}`)
  if (!rate.allowed) {
    return NextResponse.json({ error: 'Too many requests.' }, { status: 429 })
  }

  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const parsed = parseLeadRequest(body)
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  const saveResult = await saveAIChatLead(parsed.data)
  const handoff = buildWhatsappHandoff({
    language: parsed.data.language,
    country: parsed.data.country,
    businessType: parsed.data.businessType,
    serviceNeeded: parsed.data.serviceNeeded,
    budgetRange: parsed.data.budgetRange,
    timeline: parsed.data.timeline,
    summary: parsed.data.message,
    pageUrl: parsed.data.pageUrl,
  })

  return NextResponse.json({
    saved: saveResult.saved,
    whatsappUrl: handoff.url,
  })
}

function parseLeadRequest(body: unknown):
  | {
      ok: true
      data: AILeadInput
    }
  | {
      ok: false
      error: string
    } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request body.' }
  }

  const candidate = body as Partial<AILeadInput>
  const message = clean(candidate.message, 2000)

  if (!message) {
    return { ok: false, error: 'Message is required.' }
  }

  return {
    ok: true,
    data: {
      name: clean(candidate.name, 120),
      email: clean(candidate.email, 160),
      phone: clean(candidate.phone, 80),
      country: clean(candidate.country, 120),
      businessType: clean(candidate.businessType, 180),
      serviceNeeded: clean(candidate.serviceNeeded, 180),
      budgetRange: clean(candidate.budgetRange, 120),
      timeline: clean(candidate.timeline, 120),
      message,
      pageUrl: clean(candidate.pageUrl, 500),
      language: normalizeLocale(candidate.language),
      source: 'ai_chatbot',
      createdAt: new Date().toISOString(),
    },
  }
}

function clean(value: unknown, maxLength: number) {
  return typeof value === 'string' && value.trim() ? value.trim().slice(0, maxLength) : null
}

function normalizeLocale(locale: unknown): ChatLocale {
  return locale === 'ar' || locale === 'en' ? locale : 'unknown'
}

function getRateLimitKey(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const realIp = request.headers.get('x-real-ip')?.trim()
  const session = request.headers.get('x-ai-chat-session')?.trim()

  return session || forwardedFor || realIp || 'anonymous'
}
