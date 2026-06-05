import { NextRequest, NextResponse } from 'next/server'
import { extractLeadSignals } from '@/lib/ai-chatbot/leadExtractor.ts'
import { normalizeChatLocale, resolveChatLocale } from '@/lib/ai-chatbot/locale.ts'
import { aiChatRateLimiter } from '@/lib/ai-chatbot/rateLimit.ts'
import { getOpenAIClient, getOpenAIModel } from '@/lib/ai-chatbot/openaiClient.ts'
import { retrieveKnowledge } from '@/lib/ai-chatbot/retrieveKnowledge.ts'
import { buildCloudTopiaSystemPrompt } from '@/lib/ai-chatbot/systemPrompt.ts'
import type { AIChatMessageInput, AIChatRequest, ChatLocale } from '@/lib/ai-chatbot/types.ts'

export const runtime = 'nodejs'

const MAX_MESSAGES = 12
const MAX_INPUT_LENGTH = 2000
const MAX_REPLY_LENGTH = 1800

export async function POST(request: NextRequest) {
  let body: unknown

  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 })
  }

  const parsed = parseChatRequest(body)
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 })
  }

  const latestUserMessage = [...parsed.data.messages].reverse().find((message) => message.role === 'user')
  if (!latestUserMessage) {
    return NextResponse.json({ error: 'A user message is required.' }, { status: 400 })
  }

  const language = resolveChatLocale({
    siteLocale: parsed.data.locale ?? 'unknown',
    latestMessage: latestUserMessage.content,
  })
  const rate = aiChatRateLimiter.check(getRateLimitKey(request))
  if (!rate.allowed) {
    return NextResponse.json(
      {
        reply:
          language === 'ar'
            ? 'تم إرسال عدد كبير من الرسائل خلال وقت قصير. حاول بعد قليل أو تواصل معنا عبر واتساب.'
            : 'Too many messages in a short time. Please try again shortly or contact us on WhatsApp.',
        lead: extractLeadSignals(latestUserMessage.content, language, parsed.data.pageUrl),
      },
      { status: 429, headers: { 'Retry-After': String(rate.retryAfterSeconds) } },
    )
  }

  if (!process.env.OPENAI_API_KEY) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ai-chatbot] OPENAI_API_KEY is missing.')
    }

    return NextResponse.json(
      {
        reply:
          language === 'ar'
            ? 'حدث خطأ مؤقت. يمكنك التواصل معنا مباشرة عبر واتساب وسنساعدك.'
            : 'Something went wrong. You can contact us directly on WhatsApp and we’ll help you.',
        lead: extractLeadSignals(latestUserMessage.content, language, parsed.data.pageUrl),
      },
      { status: 500 },
    )
  }

  try {
    const messages = limitMessages(parsed.data.messages)
    const knowledge = await retrieveKnowledge({
      latestMessage: latestUserMessage.content,
      pageUrl: parsed.data.pageUrl,
    })
    const instructions = buildCloudTopiaSystemPrompt({
      locale: language,
      pageUrl: parsed.data.pageUrl,
      knowledge,
      countryHint: parsed.data.countryHint,
    })

    const response = await getOpenAIClient().responses.create({
      model: getOpenAIModel(),
      instructions,
      input: messages.map((message) => ({
        role: message.role,
        content: message.content,
      })),
      temperature: 0.4,
      max_output_tokens: 650,
    })

    const reply = cleanReply(response.output_text) || fallbackReply(language)
    const lead = extractLeadSignals(latestUserMessage.content, language, parsed.data.pageUrl)

    return NextResponse.json({
      reply,
      lead,
    })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ai-chatbot] OpenAI request failed', error)
    }

    return NextResponse.json(
      {
        reply: fallbackReply(language),
        lead: extractLeadSignals(latestUserMessage.content, language, parsed.data.pageUrl),
      },
      { status: 500 },
    )
  }
}

function parseChatRequest(body: unknown):
  | {
      ok: true
      data: AIChatRequest
    }
  | {
      ok: false
      error: string
    } {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request body.' }
  }

  const candidate = body as Partial<AIChatRequest>
  if (!Array.isArray(candidate.messages)) {
    return { ok: false, error: 'Messages must be an array.' }
  }

  const messages = candidate.messages
    .filter((message): message is AIChatMessageInput => {
      return (
        Boolean(message) &&
        (message.role === 'user' || message.role === 'assistant') &&
        typeof message.content === 'string' &&
        message.content.trim().length > 0
      )
    })
    .map((message) => ({
      role: message.role,
      content: message.content.trim().slice(0, MAX_INPUT_LENGTH),
    }))

  if (messages.length === 0) {
    return { ok: false, error: 'At least one valid message is required.' }
  }

  return {
    ok: true,
    data: {
      messages,
      pageUrl: typeof candidate.pageUrl === 'string' ? candidate.pageUrl.slice(0, 500) : null,
      locale: normalizeLocale(candidate.locale),
      countryHint: typeof candidate.countryHint === 'string' ? candidate.countryHint.slice(0, 120) : null,
    },
  }
}

function normalizeLocale(locale: unknown): ChatLocale {
  return normalizeChatLocale(locale)
}

function limitMessages(messages: AIChatMessageInput[]) {
  return messages.slice(-MAX_MESSAGES).map((message) => ({
    role: message.role,
    content: message.content.slice(0, MAX_INPUT_LENGTH),
  }))
}

function cleanReply(reply: string | undefined) {
  return reply?.trim().slice(0, MAX_REPLY_LENGTH)
}

function fallbackReply(locale: ChatLocale) {
  return locale === 'ar'
    ? 'حدث خطأ مؤقت. يمكنك التواصل معنا مباشرة عبر واتساب وسنساعدك.'
    : 'Something went wrong. You can contact us directly on WhatsApp and we’ll help you.'
}

function getRateLimitKey(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const realIp = request.headers.get('x-real-ip')?.trim()
  const session = request.headers.get('x-ai-chat-session')?.trim()

  return session || forwardedFor || realIp || 'anonymous'
}
