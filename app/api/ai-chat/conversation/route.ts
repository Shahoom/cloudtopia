import { NextRequest, NextResponse } from 'next/server'
import { aiChatRateLimiter } from '@/lib/ai-chatbot/rateLimit.ts'
import { normalizeChatLocale } from '@/lib/ai-chatbot/locale.ts'
import { saveConversation } from '@/lib/ai-chatbot/conversationService.ts'
import type { ChatTurnSource, ConversationInput, ConversationTurn } from '@/lib/ai-chatbot/types.ts'

export const runtime = 'nodejs'

const MAX_TURNS = 200
const MAX_CONTENT_LENGTH = 4000
const VALID_SOURCES: ChatTurnSource[] = ['user', 'flow', 'ai', 'system']

export async function POST(request: NextRequest) {
  const rate = aiChatRateLimiter.check(`conv:${getRateLimitKey(request)}`)
  if (!rate.allowed) {
    // Never error a beacon — just acknowledge and drop.
    return NextResponse.json({ saved: false }, { status: 202 })
  }

  // sendBeacon delivers the body as a Blob, often with a text/plain content-type,
  // so read raw text and parse rather than relying on request.json().
  let body: unknown
  try {
    body = JSON.parse(await request.text())
  } catch {
    return NextResponse.json({ saved: false, error: 'Invalid request.' }, { status: 400 })
  }

  const parsed = parseConversation(body)
  if (!parsed) {
    return NextResponse.json({ saved: false, error: 'Invalid conversation.' }, { status: 400 })
  }

  const result = await saveConversation(parsed)
  return NextResponse.json(result, { status: result.saved ? 200 : 202 })
}

function parseConversation(body: unknown): ConversationInput | null {
  if (!body || typeof body !== 'object') return null
  const candidate = body as Record<string, unknown>

  const sessionId = typeof candidate.sessionId === 'string' ? candidate.sessionId.trim().slice(0, 120) : ''
  if (!sessionId) return null

  if (!Array.isArray(candidate.messages)) return null
  const messages: ConversationTurn[] = candidate.messages
    .filter((turn): turn is Record<string, unknown> => Boolean(turn) && typeof turn === 'object')
    .map((turn): ConversationTurn => {
      const role = turn.role === 'assistant' ? 'assistant' : 'user'
      const source = VALID_SOURCES.includes(turn.source as ChatTurnSource) ? (turn.source as ChatTurnSource) : role === 'user' ? 'user' : 'flow'
      return {
        role,
        source,
        content: typeof turn.content === 'string' ? turn.content.slice(0, MAX_CONTENT_LENGTH) : '',
        at: typeof turn.at === 'string' ? turn.at.slice(0, 40) : null,
      }
    })
    .filter((turn) => turn.content.trim().length > 0)
    .slice(0, MAX_TURNS)

  if (messages.length === 0) return null

  const now = new Date().toISOString()
  return {
    sessionId,
    language: normalizeChatLocale(candidate.language),
    pageUrl: typeof candidate.pageUrl === 'string' ? candidate.pageUrl.slice(0, 500) : null,
    country: typeof candidate.country === 'string' ? candidate.country.slice(0, 120) : null,
    startedAt: typeof candidate.startedAt === 'string' ? candidate.startedAt.slice(0, 40) : now,
    endedAt: typeof candidate.endedAt === 'string' ? candidate.endedAt.slice(0, 40) : now,
    messages,
    leadCaptured: candidate.leadCaptured === true,
    status: candidate.status === 'completed' ? 'completed' : 'active',
    source: typeof candidate.source === 'string' ? candidate.source.slice(0, 60) : 'ai_chatbot',
  }
}

function getRateLimitKey(request: NextRequest) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const realIp = request.headers.get('x-real-ip')?.trim()
  const session = request.headers.get('x-ai-chat-session')?.trim()
  return session || forwardedFor || realIp || 'anonymous'
}
