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
}

export type WhatsappRegion = 'oman' | 'turkey' | 'unknown'

export type WhatsappContact = {
  number: string | null
  region: WhatsappRegion
}
