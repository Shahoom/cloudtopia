// The CloudTopia chatbot flow engine is deterministic and runs entirely on the
// client. It answers the common questions (services, pricing, identity, founder,
// locations, contact, process) from templates — no OpenAI call — and only hands
// off to the AI fallback when nothing matches. Keeping these as pure data + pure
// functions means the whole thing is unit-testable and free to run.

export type FlowLocale = 'ar' | 'en'

export type LocalizedText = { ar: string; en: string }

// A UI action the assistant can trigger when a node is reached.
export type FlowActionType = 'lead-form' | 'whatsapp'

// A follow-up suggestion chip. `id` points at another node in the registry, so
// tapping a chip deterministically navigates the flow (no matching required).
export type FlowChipDef = {
  id: string
  label: LocalizedText
}

export type FlowNode = {
  id: string
  // Trigger phrases for free-typed text, per language. Matching is
  // accent/diacritic-insensitive and checks both languages, since visitors mix
  // Arabic and English freely.
  triggers: { ar: string[]; en: string[] }
  // Optional shared regex triggers (e.g. greetings) that add matching weight.
  patterns?: RegExp[]
  answer: LocalizedText
  chips?: FlowChipDef[]
  action?: FlowActionType
}

// Localized, client-ready shapes returned by the engine.
export type FlowChip = { id: string; label: string }

export type FlowResult = {
  nodeId: string
  answer: string
  chips: FlowChip[]
  action?: FlowActionType
  // Higher = stronger match. Chip taps / direct lookups return Infinity.
  score: number
}
