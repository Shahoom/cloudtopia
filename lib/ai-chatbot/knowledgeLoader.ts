import fs from 'node:fs/promises'
import path from 'node:path'

const knowledgeDir = path.join(process.cwd(), 'data', 'cloudtopia-ai')

export const knowledgeFiles = {
  company: 'cloudtopia-company.md',
  services: 'cloudtopia-services.md',
  pricing: 'cloudtopia-pricing-rules.md',
  faq: 'cloudtopia-faq.md',
  contacts: 'cloudtopia-country-contacts.md',
  objections: 'cloudtopia-sales-objections.md',
  leadQualification: 'cloudtopia-lead-qualification.md',
  caseStudies: 'cloudtopia-case-studies.md',
} as const

type KnowledgeKey = keyof typeof knowledgeFiles

const cache = new Map<KnowledgeKey, string>()

export async function loadKnowledgeFile(key: KnowledgeKey) {
  if (cache.has(key)) return cache.get(key) ?? ''
  const content = await fs.readFile(path.join(knowledgeDir, knowledgeFiles[key]), 'utf8')
  cache.set(key, content)
  return content
}

export async function loadKnowledgeFiles(keys: KnowledgeKey[]) {
  const entries = await Promise.all(keys.map(async (key) => [key, await loadKnowledgeFile(key)] as const))
  return entries.map(([, content]) => content)
}
