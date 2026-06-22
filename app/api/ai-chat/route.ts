import { NextRequest, NextResponse } from 'next/server'
import type OpenAI from 'openai'
import { extractLeadSignals } from '@/lib/ai-chatbot/leadExtractor.ts'
import { normalizeChatLocale, resolveChatLocale } from '@/lib/ai-chatbot/locale.ts'
import { aiChatRateLimiter } from '@/lib/ai-chatbot/rateLimit.ts'
import { getOpenAIClient, getOpenAIModel } from '@/lib/ai-chatbot/openaiClient.ts'
import { retrieveKnowledge } from '@/lib/ai-chatbot/retrieveKnowledge.ts'
import { buildCloudTopiaSystemPrompt } from '@/lib/ai-chatbot/systemPrompt.ts'
import { saveAIChatLead } from '@/lib/ai-chatbot/leadService.ts'
import { buildWhatsappHandoff } from '@/lib/ai-chatbot/whatsapp.ts'
import type { AIChatMessageInput, AIChatRequest, AILeadInput, ChatLocale } from '@/lib/ai-chatbot/types.ts'

export const runtime = 'nodejs'

const MAX_MESSAGES = 12
const MAX_INPUT_LENGTH = 2000
const MAX_REPLY_LENGTH = 1800

type ResponseInputItem = OpenAI.Responses.ResponseInputItem
type FunctionCallItem = OpenAI.Responses.ResponseFunctionToolCall

// The agent calls this when it has gathered enough to register a sales/support lead.
// Every field is optional except `summary` — the model organizes what it learned (and
// reasonably infers) into `summary`, and fills any fields it knows.
const LEAD_TOOLS: OpenAI.Responses.Tool[] = [
  {
    type: 'function',
    name: 'submit_lead',
    description:
      'Register an interested visitor as a CloudTopia sales lead. Call this once, after collecting their details in conversation (ideally name, email, and what kind of project they want). Fill any fields you know and infer the rest from the conversation.',
    strict: false,
    parameters: {
      type: 'object',
      additionalProperties: false,
      properties: {
        name: { type: 'string', description: "Visitor's name, if given." },
        email: { type: 'string', description: "Visitor's email, if given." },
        phone: { type: 'string', description: 'Phone / WhatsApp number, if given.' },
        country: { type: 'string', description: 'Country or city, if known.' },
        projectType: {
          type: 'string',
          description: 'What the visitor wants to build (e.g. e-commerce store, CRM, mobile app, AI chatbot).',
        },
        businessType: { type: 'string', description: "The visitor's business or industry, if known." },
        budgetRange: { type: 'string', description: 'Budget range, if mentioned.' },
        timeline: { type: 'string', description: 'When they want to start / deadline, if mentioned.' },
        summary: {
          type: 'string',
          description:
            'A short, organized description of who the visitor is and what they want, written by you from the whole conversation. Always provide this.',
        },
      },
      required: ['summary'],
    },
  },
]

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

    const client = getOpenAIClient()
    const model = getOpenAIModel()
    const input: ResponseInputItem[] = messages.map((message) => ({
      role: message.role,
      content: message.content,
    }))

    // Offer the lead tool unless a lead was already captured this conversation. When the
    // visitor just shared contact info, require the tool so capture is deterministic.
    const alreadyCaptured = parsed.data.leadCaptured === true
    const forceLead = !alreadyCaptured && hasContactInfo(latestUserMessage.content)
    const toolChoice: OpenAI.Responses.ResponseCreateParamsNonStreaming['tool_choice'] = forceLead
      ? { type: 'function', name: 'submit_lead' }
      : 'auto'

    const response = await client.responses.create({
      model,
      instructions,
      input,
      ...(alreadyCaptured ? {} : { tools: LEAD_TOOLS, tool_choice: toolChoice }),
      temperature: 0.4,
      max_output_tokens: 650,
    })

    const lead = extractLeadSignals(latestUserMessage.content, language, parsed.data.pageUrl)

    // Did the agent decide it has enough to capture a lead? Run the tool, persist to
    // the CMS, then let the model write a natural confirmation.
    const leadCall = (response.output ?? []).find(
      (item): item is FunctionCallItem => item.type === 'function_call' && item.name === 'submit_lead',
    )

    if (leadCall) {
      const args = parseLeadArgs(leadCall.arguments)
      const leadInput = buildLeadInput(args, {
        language,
        pageUrl: parsed.data.pageUrl,
        ipAddress: getClientIp(request),
      })
      const saveResult = await saveAIChatLead(leadInput)
      const handoff = buildWhatsappHandoff({
        language,
        country: leadInput.country,
        businessType: leadInput.businessType,
        serviceNeeded: leadInput.serviceNeeded,
        budgetRange: leadInput.budgetRange,
        timeline: leadInput.timeline,
        summary: leadInput.message,
        pageUrl: parsed.data.pageUrl,
      })

      const reply = await composeLeadConfirmation({
        client,
        model,
        instructions,
        input,
        leadCall,
        saved: saveResult.saved,
        language,
      })

      return NextResponse.json({
        reply,
        lead: { ...lead, isPotentialLead: true, whatsappUrl: handoff.url },
        leadSaved: saveResult.saved,
        whatsappUrl: handoff.url,
      })
    }

    const reply = cleanReply(response.output_text) || fallbackReply(language)

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
      leadCaptured: candidate.leadCaptured === true,
    },
  }
}

// True when the visitor's message contains an email or a long phone-like digit run — a
// strong signal to capture the lead now rather than risk the model asking another question.
function hasContactInfo(text: string) {
  if (/[^\s@]+@[^\s@]+\.[^\s@]+/.test(text)) return true
  const digits = text.replace(/[^\d]/g, '')
  return digits.length >= 8
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

function getClientIp(request: NextRequest) {
  return (
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip')?.trim() ||
    null
  )
}

function parseLeadArgs(raw: string | null | undefined): Record<string, unknown> {
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? (parsed as Record<string, unknown>) : {}
  } catch {
    return {}
  }
}

function leadString(value: unknown): string | null {
  if (typeof value !== 'string') return null
  const trimmed = value.trim()
  return trimmed ? trimmed.slice(0, 500) : null
}

function buildLeadInput(
  args: Record<string, unknown>,
  ctx: { language: ChatLocale; pageUrl: string | null; ipAddress: string | null },
): AILeadInput {
  const projectType = leadString(args.projectType) ?? leadString(args.serviceNeeded)
  const summary = leadString(args.summary)
  const message = summary || projectType || 'AI chatbot lead'

  return {
    name: leadString(args.name),
    email: leadString(args.email),
    phone: leadString(args.phone),
    country: leadString(args.country),
    businessType: leadString(args.businessType),
    serviceNeeded: projectType,
    budgetRange: leadString(args.budgetRange),
    timeline: leadString(args.timeline),
    message,
    pageUrl: ctx.pageUrl,
    language: ctx.language,
    source: 'ai_chatbot',
    createdAt: new Date().toISOString(),
    ipAddress: ctx.ipAddress,
  }
}

// After the lead is persisted, let the model write a natural confirmation. Falls back to
// a deterministic bilingual message if the second call fails.
async function composeLeadConfirmation({
  client,
  model,
  instructions,
  input,
  leadCall,
  saved,
  language,
}: {
  client: OpenAI
  model: string
  instructions: string
  input: ResponseInputItem[]
  leadCall: FunctionCallItem
  saved: boolean
  language: ChatLocale
}) {
  try {
    const followInput: ResponseInputItem[] = [
      ...input,
      leadCall,
      {
        type: 'function_call_output',
        call_id: leadCall.call_id,
        output: JSON.stringify({ status: saved ? 'saved' : 'not_saved' }),
      },
    ]

    const second = await client.responses.create({
      model,
      instructions,
      input: followInput,
      tools: LEAD_TOOLS,
      tool_choice: 'none',
      temperature: 0.4,
      max_output_tokens: 300,
    })

    const text = cleanReply(second.output_text)
    if (text) return text
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[ai-chatbot] lead confirmation request failed', error)
    }
  }

  return leadSavedReply(language, saved)
}

function leadSavedReply(locale: ChatLocale, saved: boolean) {
  if (!saved) {
    return locale === 'ar'
      ? 'سجّلت تفاصيلك وسأبلّغ فريق CloudTopia. يمكنك أيضًا التواصل مباشرة عبر واتساب.'
      : 'I’ve noted your details and will pass them to the CloudTopia team. You can also reach us directly on WhatsApp.'
  }

  return locale === 'ar'
    ? 'تم استلام طلبك ✅ سيتواصل معك فريق CloudTopia قريبًا. يمكنك أيضًا متابعة الحديث عبر واتساب.'
    : 'Got it — your request is in ✅ The CloudTopia team will reach out soon. You can also continue with us on WhatsApp.'
}
