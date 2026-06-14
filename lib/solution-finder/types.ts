export type SolutionFinderLocale = 'en' | 'ar'

export type SolutionFinderPayload = {
  name?: string
  phone?: string
  email?: string
  company?: string
  country?: string
  industry?: string
  projectType?: string
  businessGoal?: string
  budget?: string
  timeline?: string
  description?: string
  contactMethod?: string
  wantContact?: boolean
  recommendedPackage?: string
  recommendedRoute?: string
  baseRecommendation?: {
    packageTitle?: string
    personalizedIntro?: string
    recommendedServices?: string[]
    keyFeatures?: string[]
    deliveryApproach?: string
    estimatedTimeline?: string
    budgetRange?: string
  }
  pageUrl?: string
  locale?: SolutionFinderLocale
  source?: string
  createdAt?: string
}

export type SolutionFinderLead = {
  name: string
  phone: string
  email: string
  company: string
  country: string
  industry: string
  projectType: string
  businessGoal: string
  budget: string
  timeline: string
  description: string
  contactMethod: string
  wantContact: boolean
  recommendedPackage: string
  recommendedRoute: string
  selectedAnswerSummary: string
  aiSource: 'openai' | 'fallback' | ''
  aiSummary: string
  aiCountryAdvice: string
  aiBudgetAdvice: string
  aiWhatsappOpening: string
  aiRoadmap: Array<{ step: string }>
  aiNextQuestions: Array<{ question: string }>
  locale: SolutionFinderLocale
  status: 'new'
  source: 'solution-finder'
  createdAt: string
  ipAddress?: string
}

export type AIRecommendationDetails = {
  source: 'openai' | 'fallback'
  summary: string
  roadmap: string[]
  nextQuestions: string[]
  countryAdvice: string
  budgetAdvice: string
  whatsappOpening: string
}
