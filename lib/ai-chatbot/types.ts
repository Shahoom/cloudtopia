export type ChatLocale = 'ar' | 'en' | 'unknown'

export type AIChatRole = 'user' | 'assistant'

export type AIChatMessageInput = {
  role: AIChatRole
  content: string
}

export type AIChatRequest = {
  messages: AIChatMessageInput[]
  pageUrl?: string | null
  locale?: ChatLocale
  countryHint?: string | null
  // Set by the client once a lead has already been captured this conversation, so the
  // server disables the submit_lead tool and never creates a duplicate lead.
  leadCaptured?: boolean
}

export type AILeadSignal = {
  isPotentialLead: boolean
  confidence: number
  serviceInterest: string | null
  country: string | null
  suggestedWhatsappNumber: string | null
  whatsappUrl: string | null
}

export type AIChatResponse = {
  reply: string
  lead: AILeadSignal
  // Set when the AI agent collected enough detail and persisted a lead to the CMS
  // during this turn (via the submit_lead tool).
  leadSaved?: boolean
  whatsappUrl?: string | null
}

export type AILeadInput = {
  name: string | null
  email: string | null
  phone: string | null
  country: string | null
  businessType: string | null
  serviceNeeded: string | null
  budgetRange: string | null
  timeline: string | null
  message: string
  pageUrl: string | null
  language: ChatLocale
  source: 'ai_chatbot'
  createdAt: string
  ipAddress?: string | null
}

export type WhatsappRegion = 'oman' | 'turkey' | 'unknown'

export type WhatsappContact = {
  number: string | null
  region: WhatsappRegion
}

// How a single transcript turn was produced. `flow` = answered locally by the
// deterministic flow engine (no API), `ai` = OpenAI fallback, `user` = visitor,
// `system` = proactive/welcome/system message.
export type ChatTurnSource = 'user' | 'flow' | 'ai' | 'system'

export type ConversationTurn = {
  role: AIChatRole
  content: string
  source: ChatTurnSource
  at?: string | null
}

// Payload sent to /api/ai-chat/conversation to persist a full transcript.
export type ConversationInput = {
  sessionId: string
  language: ChatLocale
  pageUrl: string | null
  country: string | null
  startedAt: string | null
  endedAt: string | null
  messages: ConversationTurn[]
  leadCaptured: boolean
  status: 'active' | 'completed'
  source: string
  ipAddress?: string | null
}
