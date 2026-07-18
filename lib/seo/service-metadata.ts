const EN_TITLE_OVERRIDES: Readonly<Record<string, string>> = {
  'ai-automation': 'AI Automation Solutions for Business',
  'ai-chatbots': 'AI Chatbot Development for Business',
  'cloud-migration': 'Cloud Migration Services for Business',
  'database-setup': 'Database Setup Services for Business',
  'devops-support': 'DevOps Support Services for Business',
}

export function buildServiceDocumentTitle(
  serviceName: string,
  slug: string,
  locale: string,
): string {
  if (locale === 'ar') return `${serviceName} للشركات`
  return EN_TITLE_OVERRIDES[slug] || `${serviceName} for Business`
}
