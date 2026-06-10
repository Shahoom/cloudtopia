import type { FlowChip, FlowLocale, FlowNode, FlowResult } from './types.ts'
import { entryChipIds, flowNodes, welcomeText } from './registry.ts'

const nodeById = new Map<string, FlowNode>(flowNodes.map((node) => [node.id, node]))

// Normalize for matching: lowercase, strip Arabic diacritics/tatweel, and unify
// the alef / ya / ta-marbuta variants so "إستشارة" matches "استشاره" etc.
export function normalizeForMatch(text: string): string {
  return text
    .toLowerCase()
    .replace(/[ً-ْـ]/g, '') // harakat + tatweel
    .replace(/[آأإ]/g, 'ا') // آ أ إ -> ا
    .replace(/ى/g, 'ي') // ى -> ي
    .replace(/ة/g, 'ه') // ة -> ه
    .replace(/\s+/g, ' ')
    .trim()
}

function resolveChips(node: FlowNode, locale: FlowLocale): FlowChip[] {
  return (node.chips ?? []).map((c) => ({ id: c.id, label: c.label[locale] }))
}

function toResult(node: FlowNode, locale: FlowLocale, score: number): FlowResult {
  return {
    nodeId: node.id,
    answer: node.answer[locale],
    chips: resolveChips(node, locale),
    action: node.action,
    score,
  }
}

// Score a single node against already-normalized text. Longer trigger phrases and
// regex hits weigh more so specific intents beat generic ones.
function scoreNode(node: FlowNode, haystack: string): { score: number; longest: number } {
  let score = 0
  let longest = 0
  const triggers = [...node.triggers.ar, ...node.triggers.en]

  for (const raw of triggers) {
    const trigger = normalizeForMatch(raw)
    if (!trigger) continue
    if (haystack.includes(trigger)) {
      score += trigger.length >= 5 ? 2 : 1
      if (trigger.length > longest) longest = trigger.length
    }
  }

  for (const pattern of node.patterns ?? []) {
    if (pattern.test(haystack)) {
      score += 3
      longest = Math.max(longest, 6)
    }
  }

  return { score, longest }
}

/**
 * Match free-typed visitor text to the best flow node. Returns null when nothing
 * clears the threshold — the caller then decides whether to use the AI fallback
 * or a graceful guided menu.
 */
export function matchFlow(text: string, locale: FlowLocale): FlowResult | null {
  const haystack = normalizeForMatch(text)
  if (!haystack) return null

  let best: { node: FlowNode; score: number; longest: number } | null = null

  for (const node of flowNodes) {
    const { score, longest } = scoreNode(node, haystack)
    if (score <= 0) continue
    if (
      !best ||
      score > best.score ||
      (score === best.score && longest > best.longest)
    ) {
      best = { node, score, longest }
    }
  }

  if (!best || best.score < 2) return null
  return toResult(best.node, locale, best.score)
}

// Deterministic lookup for chip taps / direct navigation (no scoring).
export function getFlowNode(id: string, locale: FlowLocale): FlowResult | null {
  const node = nodeById.get(id)
  if (!node) return null
  return toResult(node, locale, Number.POSITIVE_INFINITY)
}

export function getEntryChips(locale: FlowLocale): FlowChip[] {
  return entryChipIds
    .map((id) => nodeById.get(id))
    .filter((node): node is FlowNode => Boolean(node))
    .map((node) => ({ id: node.id, label: node.id === 'consultation' ? consultationLabel(locale) : nodeChipLabel(node, locale) }))
}

// Entry chips reuse a node's own short label where defined elsewhere; fall back
// to a sensible localized label keyed off the node id.
function nodeChipLabel(node: FlowNode, locale: FlowLocale): string {
  const labels: Record<string, { ar: string; en: string }> = {
    services: { ar: 'الخدمات', en: 'Services' },
    pricing: { ar: 'الأسعار', en: 'Pricing' },
    about: { ar: 'من نحن', en: 'About CloudTopia' },
  }
  return labels[node.id]?.[locale] ?? node.id
}

function consultationLabel(locale: FlowLocale): string {
  return locale === 'ar' ? 'استشارة مجانية' : 'Free consultation'
}

export function getWelcomeText(locale: FlowLocale): string {
  return welcomeText[locale]
}
