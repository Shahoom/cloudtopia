// ─────────────────────────────────────────────────────────────────────────────
// CloudTopia Solution Finder — Recommendation Engine
// Scores all templates against the user's answers and returns the best match,
// then applies budget + timeline personalization on top.
// ─────────────────────────────────────────────────────────────────────────────

import { RECOMMENDATION_TEMPLATES, type RecommendationTemplate } from './recommendationTemplates'
import { lookupOptionLabel } from './solutionFinderData'

export type Locale = 'en' | 'ar'

export type WizardAnswers = {
  industry?: string
  projectType?: string
  businessGoal?: string
  budget?: string
  timeline?: string
  name?: string
  phone?: string
  email?: string
  company?: string
  country?: string
  description?: string
  contactMethod?: string
  wantContact?: boolean
}

export type Recommendation = {
  templateId: string
  packageTitle: string
  packageSubtitle: string
  personalizedIntro: string
  recommendedServices: string[]
  keyFeatures: string[]
  techStack: string[]
  deliveryApproach: string
  estimatedTimeline: string
  budgetRange: string
  budgetAdvice: string
  route: string
  matchScore: number
}

// ─── Lookup tables ────────────────────────────────────────────────────────────

const BUDGET_LABELS: Record<string, { en: string; ar: string }> = {
  'under-500':  { en: 'Under $500',          ar: 'أقل من 500 دولار' },
  '500-1000':   { en: '$500 – $1,000',        ar: 'من 500 إلى 1,000 دولار' },
  '1000-3000':  { en: '$1,000 – $3,000',      ar: 'من 1,000 إلى 3,000 دولار' },
  '3000-7000':  { en: '$3,000 – $7,000',      ar: 'من 3,000 إلى 7,000 دولار' },
  '7000-plus':  { en: '$7,000+',              ar: 'أكثر من 7,000 دولار' },
  'not-sure':   { en: 'To be discussed',      ar: 'يُناقش لاحقاً' },
}

const TIMELINE_LABELS: Record<string, { en: string; ar: string }> = {
  'asap':          { en: 'As soon as possible', ar: 'في أقرب وقت ممكن' },
  '2-weeks':       { en: 'Within 2 weeks',       ar: 'خلال أسبوعين' },
  '1-month':       { en: 'Within 1 month',        ar: 'خلال شهر' },
  '1-3-months':    { en: '1 – 3 months',          ar: 'من شهر إلى 3 أشهر' },
  '3-plus-months': { en: '3+ months',              ar: 'أكثر من 3 أشهر' },
  'flexible':      { en: 'Flexible',               ar: 'مرن' },
}

const BUDGET_ADVICE: Record<string, { en: string; ar: string }> = {
  'under-500': {
    en: 'Best suited for a landing page, minor improvements, or a consultation session to plan next steps.',
    ar: 'مناسب لصفحة هبوط، تحسينات بسيطة، أو جلسة استشارة لتخطيط الخطوات التالية.',
  },
  '500-1000': {
    en: 'Covers a starter website, simple landing page, basic CMS setup, or a lightweight automation.',
    ar: 'يغطي موقعاً أساسياً، صفحة هبوط بسيطة، إعداد CMS مبدئي، أو أتمتة خفيفة.',
  },
  '1000-3000': {
    en: 'Covers a professional website, CRM starter, simple app MVP, or a business dashboard.',
    ar: 'يغطي موقعاً احترافياً، CRM مبدئي، نموذج MVP بسيط لتطبيق، أو لوحة أعمال.',
  },
  '3000-7000': {
    en: 'Suitable for an advanced platform, full CRM, business system, or app with admin dashboard.',
    ar: 'مناسب لمنصة متقدمة، CRM متكامل، نظام أعمال، أو تطبيق مع لوحة إدارة.',
  },
  '7000-plus': {
    en: 'Covers a full custom system, mobile app, CRM, AI automation, or cloud infrastructure.',
    ar: 'يغطي نظاماً مخصصاً متكاملاً، تطبيق موبايل، CRM، أتمتة ذكاء اصطناعي، أو بنية سحابية.',
  },
  'not-sure': {
    en: 'CloudTopia can provide a detailed quote after a free discovery call.',
    ar: 'يمكن لـ CloudTopia تقديم عرض سعر مفصل بعد مكالمة اكتشاف مجانية.',
  },
}

// ─── Scoring helper ───────────────────────────────────────────────────────────

function matchesField(templateVal: string | string[] | undefined, answerVal: string | undefined): boolean {
  if (!templateVal || !answerVal) return false
  if (Array.isArray(templateVal)) return templateVal.includes(answerVal)
  return templateVal === answerVal
}

function scoreTemplate(template: RecommendationTemplate, answers: WizardAnswers): number {
  const { industry, projectType, goal } = template.match
  let score = template.priority

  const industryMatch = matchesField(industry, answers.industry)
  const projectMatch  = matchesField(projectType, answers.projectType)
  const goalMatch     = matchesField(goal, answers.businessGoal)

  // Perfect triple match
  if (industryMatch && projectMatch && goalMatch) score += 300
  // Two-field matches
  else if (industryMatch && projectMatch) score += 200
  else if (projectMatch && goalMatch)     score += 150
  else if (industryMatch && goalMatch)    score += 100
  // Single-field matches
  else if (projectMatch)  score += 60
  else if (industryMatch) score += 30
  else if (goalMatch)     score += 20
  // No match fields defined = catch-all
  else if (!industry && !projectType && !goal) score += 0 // keeps its own priority

  return score
}

// ─── Main engine ──────────────────────────────────────────────────────────────

export function generateRecommendation(answers: WizardAnswers, locale: Locale = 'en'): Recommendation {
  // Score all templates
  const scored = RECOMMENDATION_TEMPLATES.map((t) => ({ template: t, score: scoreTemplate(t, answers) }))
  scored.sort((a, b) => b.score - a.score)

  const best = scored[0].template
  const matchScore = Math.min(scored[0].score, 100)

  const budgetLabel   = BUDGET_LABELS[answers.budget   || '']?.[locale] ?? (locale === 'ar' ? 'يُناقش لاحقاً' : 'To be discussed')
  const timelineLabel = TIMELINE_LABELS[answers.timeline || '']?.[locale] ?? (locale === 'ar' ? 'يُحدد لاحقاً' : 'To be scoped')
  const budgetAdvice  = BUDGET_ADVICE[answers.budget   || '']?.[locale]  ?? ''

  return {
    templateId:         best.id,
    packageTitle:       best.package[locale],
    packageSubtitle:    best.packageSubtitle[locale],
    personalizedIntro:  best.personalizedIntro[locale],
    recommendedServices: best.recommendedServices[locale],
    keyFeatures:        best.keyFeatures[locale],
    techStack:          best.techStack,
    deliveryApproach:   best.deliveryApproach[locale],
    estimatedTimeline:  timelineLabel,
    budgetRange:        budgetLabel,
    budgetAdvice,
    route:              best.route,
    matchScore:         Math.max(matchScore, 72),
  }
}

// ─── Label helpers (used by WhatsApp builder) ─────────────────────────────────

export function getAnswerLabel(stepId: string, optionId: string, locale: Locale): string {
  return lookupOptionLabel(stepId, optionId, locale)
}

export function getBudgetLabel(id: string, locale: Locale): string {
  return BUDGET_LABELS[id]?.[locale] ?? id
}

export function getTimelineLabel(id: string, locale: Locale): string {
  return TIMELINE_LABELS[id]?.[locale] ?? id
}
