import type { TopicCount } from './types.ts'

const TOPIC_KEYWORDS: Record<string, string[]> = {
  'E-commerce': ['ecommerce', 'e-commerce', 'online store', 'store', 'shop', 'متجر', 'تسوق', 'متاجر'],
  'CRM / ERP': ['crm', 'erp', 'نظام إدارة', 'إدارة العملاء'],
  'Websites': ['website', 'web site', 'landing page', 'موقع', 'مواقع'],
  'Web apps': ['web app', 'web application', 'dashboard', 'portal', 'تطبيق ويب', 'لوحة تحكم'],
  'Automation': ['automation', 'automate', 'workflow', 'أتمتة', 'سير عمل'],
  'AI': ['chatbot', 'ai ', 'artificial intelligence', 'ذكاء اصطناعي', 'روبوت'],
  'Cloud': ['cloud', 'hosting', 'server', 'استضافة', 'سحاب', 'خادم'],
  'Pricing': ['price', 'pricing', 'cost', 'budget', 'سعر', 'تكلفة', 'ميزانية', 'كم'],
}

// Deterministic, no-AI bucketing of conversation transcripts into CloudTopia's
// service categories. One transcript can match multiple categories (each counted
// once per category). Sorted by count desc for direct rendering.
export function bucketTopics(transcripts: string[]): TopicCount[] {
  const counts = new Map<string, number>()
  for (const raw of transcripts) {
    const text = (raw || '').toLowerCase()
    if (!text.trim()) continue
    for (const [category, keywords] of Object.entries(TOPIC_KEYWORDS)) {
      if (keywords.some((k) => text.includes(k))) {
        counts.set(category, (counts.get(category) || 0) + 1)
      }
    }
  }
  return [...counts.entries()]
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count)
}
