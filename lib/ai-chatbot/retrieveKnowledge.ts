import { loadKnowledgeFiles } from './knowledgeLoader.ts'
import { buildSiteKnowledge } from './siteKnowledge.ts'

type RetrieveKnowledgeInput = {
  latestMessage: string
  pageUrl?: string | null
}

const pricingKeywords = ['price', 'pricing', 'cost', 'budget', 'package', 'تكلفة', 'السعر', 'ميزانية', 'باقة']
const leadKeywords = ['need', 'want', 'build', 'consultation', 'contact', 'quote', 'أريد', 'اريد', 'أحتاج', 'استشارة', 'تواصل']
const faqKeywords = ['do you', 'can you', 'how', 'what', 'هل', 'كيف', 'ماذا']
const objectionKeywords = ['instagram', 'template', 'cheap', 'start small', 'لا أعرف', 'قالب', 'انستغرام', 'رخيص']
const caseStudyKeywords = ['case', 'example', 'portfolio', 'مشروع', 'مثال', 'أمثلة']

export async function retrieveKnowledge({ latestMessage, pageUrl }: RetrieveKnowledgeInput) {
  const haystack = `${latestMessage} ${pageUrl ?? ''}`.toLowerCase()
  const keys = new Set<Parameters<typeof loadKnowledgeFiles>[0][number]>(['company', 'services', 'contacts'])

  if (matchesAny(haystack, pricingKeywords)) keys.add('pricing')
  if (matchesAny(haystack, leadKeywords) || matchesAny(haystack, pricingKeywords)) keys.add('leadQualification')
  if (matchesAny(haystack, faqKeywords)) keys.add('faq')
  if (matchesAny(haystack, objectionKeywords)) keys.add('objections')
  if (matchesAny(haystack, caseStudyKeywords)) keys.add('caseStudies')

  const files = await loadKnowledgeFiles(Array.from(keys))
  const siteKnowledge = buildSiteKnowledge({ latestMessage, pageUrl })

  return [...files.map((content) => content.trim()), siteKnowledge].filter(Boolean).join('\n\n---\n\n').slice(0, 18_000)
}

function matchesAny(value: string, keywords: string[]) {
  return keywords.some((keyword) => value.includes(keyword.toLowerCase()))
}
