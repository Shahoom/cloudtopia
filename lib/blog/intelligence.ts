import { extractLexicalPlainText } from './utils.ts'

export type BlogScoreInput = {
  title?: string | null
  excerpt?: string | null
  focusKeyword?: string | null
  metaTitle?: string | null
  metaDescription?: string | null
  coverImageAlt?: string | null
  category?: string | null
  author?: string | null
  publishedAt?: string | null
  showCTA?: boolean | null
  content?: unknown
  contentBlocks?: unknown
  tags?: unknown
  internalLinks?: unknown
}

export type BlogContentBlockSummary = {
  callouts: number
  ctas: number
  faqs: number
  leadMagnets: number
  stats: number
}

export type BlogContentScores = {
  contentScore: number
  seoScore: number
  readabilityScore: number
  wordCount: number
  hasFAQ: boolean
  hasCTA: boolean
  hasInternalLinks: boolean
  missing: string[]
  summary: BlogContentBlockSummary
}

export type FAQSchemaItem = {
  question: string
  answer: string
}

const BLOCK_TYPE_ALIASES: Record<string, keyof BlogContentBlockSummary> = {
  calloutBlock: 'callouts',
  callout: 'callouts',
  ctaInlineBlock: 'ctas',
  cta: 'ctas',
  servicePromoBlock: 'ctas',
  faqBlock: 'faqs',
  faq: 'faqs',
  leadMagnetBlock: 'leadMagnets',
  leadMagnet: 'leadMagnets',
  statBlock: 'stats',
  stat: 'stats',
}

function clampScore(value: number) {
  return Math.max(0, Math.min(100, Math.round(value)))
}

function asText(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

function normalizeBlocks(blocks: unknown): Array<Record<string, any>> {
  if (!Array.isArray(blocks)) return []
  return blocks.filter((block): block is Record<string, any> => Boolean(block) && typeof block === 'object')
}

function hasArrayItems(value: unknown) {
  return Array.isArray(value) && value.length > 0
}

function countWords(value: unknown) {
  const text = typeof value === 'string' ? value : extractLexicalPlainText(value)
  return text.split(/\s+/).filter(Boolean).length
}

export function summarizeContentBlocks(blocks: unknown): BlogContentBlockSummary {
  const summary: BlogContentBlockSummary = {
    callouts: 0,
    ctas: 0,
    faqs: 0,
    leadMagnets: 0,
    stats: 0,
  }

  for (const block of normalizeBlocks(blocks)) {
    const blockType = String(block.blockType || block.type || '')
    const key = BLOCK_TYPE_ALIASES[blockType]
    if (key) summary[key] += 1
  }

  return summary
}

export function extractFAQSchemaItems(blocks: unknown): FAQSchemaItem[] {
  return normalizeBlocks(blocks)
    .filter((block) => String(block.blockType || block.type || '') === 'faqBlock')
    .filter((block) => block.includeInSchema !== false)
    .map((block) => ({
      question: asText(block.question),
      answer: asText(block.answer),
    }))
    .filter((item) => item.question && item.answer)
}

export function calculateBlogContentScores(input: BlogScoreInput): BlogContentScores {
  const wordCount = countWords(input.content)
  const summary = summarizeContentBlocks(input.contentBlocks)
  const hasFAQ = summary.faqs > 0
  const hasCTA = Boolean(input.showCTA) || summary.ctas > 0
  const hasInternalLinks = hasArrayItems(input.internalLinks)
  const tags = Array.isArray(input.tags) ? input.tags : []

  const missing: string[] = []
  if (!asText(input.title) || asText(input.title).length < 12) missing.push('strongTitle')
  if (!asText(input.excerpt)) missing.push('excerpt')
  if (!asText(input.metaDescription)) missing.push('metaDescription')
  if (!asText(input.focusKeyword)) missing.push('focusKeyword')
  if (!asText(input.coverImageAlt)) missing.push('coverImageAlt')
  if (!asText(input.category)) missing.push('category')
  if (!asText(input.author)) missing.push('author')
  if (!asText(input.publishedAt)) missing.push('publishedAt')
  if (!hasCTA) missing.push('cta')
  if (!hasFAQ) missing.push('faq')
  if (!hasInternalLinks) missing.push('internalLinks')
  if (tags.length === 0) missing.push('tags')
  if (wordCount < 300) missing.push('tooShort')

  const completeness = Math.max(0, 100 - missing.length * 7)
  const depthBonus = wordCount >= 1200 ? 15 : wordCount >= 700 ? 10 : wordCount >= 400 ? 6 : 0
  const blockBonus = Math.min(10, summary.callouts * 2 + summary.faqs * 3 + summary.ctas * 2 + summary.stats * 2)
  const contentScore = clampScore(completeness + depthBonus + blockBonus)

  const metaDescriptionLength = asText(input.metaDescription).length
  const metaTitleLength = asText(input.metaTitle).length
  const seoChecks = [
    asText(input.metaTitle).length > 0,
    metaTitleLength === 0 || (metaTitleLength >= 35 && metaTitleLength <= 70),
    metaDescriptionLength >= 80 && metaDescriptionLength <= 180,
    asText(input.focusKeyword).length > 0,
    asText(input.coverImageAlt).length > 0,
    asText(input.category).length > 0,
    tags.length > 0,
    hasInternalLinks,
  ]
  const seoScore = clampScore((seoChecks.filter(Boolean).length / seoChecks.length) * 100)

  const sentenceCount = Math.max(1, extractLexicalPlainText(input.content).split(/[.!?]+/).filter((part) => part.trim()).length)
  const averageSentenceWords = wordCount / sentenceCount
  const readabilityPenalty = averageSentenceWords > 28 ? 18 : averageSentenceWords > 22 ? 10 : 0
  const readabilityBonus = hasFAQ ? 4 : 0
  const readabilityScore = clampScore(88 - readabilityPenalty + readabilityBonus)

  return {
    contentScore,
    seoScore,
    readabilityScore,
    wordCount,
    hasFAQ,
    hasCTA,
    hasInternalLinks,
    missing,
    summary,
  }
}
