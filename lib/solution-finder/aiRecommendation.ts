import type { AIRecommendationDetails, SolutionFinderLocale } from './types.ts'
import { getAnswerLabel, getBudgetLabel, getTimelineLabel } from '@/components/solution-finder/recommendationEngine.ts'

type DeterministicRecommendation = {
  packageTitle: string
  personalizedIntro: string
  recommendedServices: string[]
  keyFeatures: string[]
  deliveryApproach: string
  estimatedTimeline: string
  budgetRange: string
}

type AIRecommendationInput = {
  locale: SolutionFinderLocale
  deterministicRecommendation: DeterministicRecommendation
  answers: Record<string, unknown>
}

type LabeledAnswer = {
  id: string
  label: string
}

export async function generateAIRecommendationDetails(input: AIRecommendationInput): Promise<AIRecommendationDetails> {
  const fallback = buildFallbackAIRecommendation(input)

  if (!process.env.OPENAI_API_KEY) return fallback

  try {
    const { getOpenAIClient, getOpenAIModel } = await import('../ai-chatbot/openaiClient.ts')
    const response = await getOpenAIClient().responses.create({
      model: getOpenAIModel(),
      temperature: 0.35,
      max_output_tokens: 700,
      instructions: buildInstructions(input.locale),
      input: JSON.stringify(buildAIRecommendationRequestPayload(input)),
    })

    const parsed = parseJSON(response.output_text)
    return normalizeAIRecommendation(parsed, { ...fallback, source: 'openai' })
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[solution-finder] AI recommendation failed', error)
    }
    return fallback
  }
}

export function buildFallbackAIRecommendation(input: AIRecommendationInput): AIRecommendationDetails {
  const isAr = input.locale === 'ar'
  const country = cleanText(input.answers.country) || (isAr ? 'الدولة المستهدفة' : 'the target country')
  const base = input.deterministicRecommendation
  const requestPayload = buildAIRecommendationRequestPayload(input)
  const descriptionNeeds = requestPayload.projectDescription.detectedNeeds
  const descriptionSentence = requestPayload.projectDescription.hasDescription
    ? isAr
      ? ` تم أخذ وصف المشروع في الاعتبار، خصوصاً: ${descriptionNeeds.length ? descriptionNeeds.join('، ') : requestPayload.projectDescription.summary}.`
      : ` The project description was considered, especially: ${descriptionNeeds.length ? descriptionNeeds.join(', ') : requestPayload.projectDescription.summary}.`
    : ''

  return {
    source: 'fallback',
    summary: isAr
      ? `بناءً على إجاباتك، نوصي بحل ${base.packageTitle}. ${base.personalizedIntro}${descriptionSentence}`
      : `Based on your answers, CloudTopia recommends ${base.packageTitle}. ${base.personalizedIntro}${descriptionSentence}`,
    roadmap: isAr
      ? [
          'تحديد نطاق المشروع والأولويات الأساسية.',
          'تصميم تجربة الاستخدام وربط مسار العملاء أو الفريق.',
          'تنفيذ النسخة الأولى ثم إضافة الأتمتة والتقارير حسب الحاجة.',
        ]
      : [
          'Confirm the project scope and core priorities.',
          'Design the user flow and connect the customer or team journey.',
          'Build the first usable version, then add automation and reporting where needed.',
        ],
    nextQuestions: isAr
      ? ['ما أهم ميزة يجب أن تعمل من اليوم الأول؟', 'كم عدد المستخدمين أو العملاء المتوقعين؟', `هل المشروع يستهدف ${country} فقط أم أكثر من سوق؟`]
      : ['What is the most important feature for day one?', 'How many users or customers should the system support?', `Is this mainly for ${country}, or multiple markets?`],
    countryAdvice: isAr
      ? `سنراعي السوق في ${country} من ناحية اللغة، واتساب، طرق التواصل، وتجربة المستخدم المحلية.`
      : `For ${country}, we will account for language, WhatsApp handoff, local customer behavior, and practical UX expectations.`,
    budgetAdvice: base.budgetRange
      ? isAr
        ? `النطاق المختار (${base.budgetRange}) يساعدنا على اقتراح مرحلة أولى واضحة بدل تضخيم المشروع.`
        : `Your selected range (${base.budgetRange}) helps us suggest a clear first phase instead of bloating the project.`
      : '',
    whatsappOpening: isAr
      ? `مرحباً CloudTopia، أكملت توصية AI وأريد مناقشة ${base.packageTitle}.`
      : `Hello CloudTopia, I completed the AI recommendation and want to discuss ${base.packageTitle}.`,
  }
}

export function buildAIRecommendationRequestPayload(input: AIRecommendationInput) {
  const locale = input.locale
  const answers = input.answers
  const description = cleanText(answers.description, 1800)
  const detectedNeeds = detectDescriptionNeeds(description)

  return {
    locale,
    market: {
      country: cleanText(answers.country, 120),
      pageUrl: cleanText(answers.pageUrl, 500),
    },
    selectedAnswers: {
      industry: labeledAnswer('industry', cleanText(answers.industry, 120), locale),
      projectType: labeledAnswer('project-type', cleanText(answers.projectType, 120), locale),
      businessGoal: labeledAnswer('business-goal', cleanText(answers.businessGoal, 120), locale),
      budget: {
        id: cleanText(answers.budget, 120),
        label: cleanText(answers.budget, 120) ? getBudgetLabel(cleanText(answers.budget, 120), locale) : '',
      },
      timeline: {
        id: cleanText(answers.timeline, 120),
        label: cleanText(answers.timeline, 120) ? getTimelineLabel(cleanText(answers.timeline, 120), locale) : '',
      },
    },
    projectDescription: {
      hasDescription: Boolean(description),
      summary: description,
      detectedNeeds,
    },
    contact: {
      company: cleanText(answers.company, 180),
      preferredMethod: cleanText(answers.contactMethod, 80),
      wantsContact: answers.wantContact !== false,
    },
    baseRecommendation: input.deterministicRecommendation,
  }
}

export function normalizeAIRecommendation(value: unknown, fallback: AIRecommendationDetails): AIRecommendationDetails {
  const candidate = value && typeof value === 'object' ? (value as Partial<AIRecommendationDetails>) : {}

  return {
    source: fallback.source,
    summary: cleanText(candidate.summary) || fallback.summary,
    roadmap: normalizeStringList(candidate.roadmap, fallback.roadmap, 3),
    nextQuestions: normalizeStringList(candidate.nextQuestions, fallback.nextQuestions, 3),
    countryAdvice: cleanText(candidate.countryAdvice) || fallback.countryAdvice,
    budgetAdvice: cleanText(candidate.budgetAdvice) || fallback.budgetAdvice,
    whatsappOpening: cleanText(candidate.whatsappOpening) || fallback.whatsappOpening,
  }
}

function buildInstructions(locale: SolutionFinderLocale) {
  const language = locale === 'ar' ? 'Arabic' : 'English'

  return `You are CloudTopia's AI project consultant.
Return ONLY valid JSON with this exact shape:
{
  "summary": "short personalized recommendation",
  "roadmap": ["step 1", "step 2", "step 3"],
  "nextQuestions": ["question 1", "question 2", "question 3"],
  "countryAdvice": "country-specific implementation advice",
  "budgetAdvice": "budget/timeline scope advice",
  "whatsappOpening": "short WhatsApp opening message"
}

Rules:
- Reply in ${language}.
- Do not invent exact fixed prices.
- Keep roadmap practical and implementation-oriented.
- Use the provided deterministic recommendation as the source of truth.
- If projectDescription.hasDescription is true, adapt the roadmap and next questions to the user's written requirements.
- Use selectedAnswers labels for readable business context instead of exposing raw ids.
- Make countryAdvice specific to market.country when present.`
}

function parseJSON(value: string | undefined) {
  if (!value) return null
  try {
    return JSON.parse(value)
  } catch {
    return null
  }
}

function normalizeStringList(value: unknown, fallback: string[], min: number) {
  const list = Array.isArray(value)
    ? value.map((item) => cleanText(item)).filter(Boolean).slice(0, 5)
    : []

  if (list.length >= min) return list
  return Array.from(new Set([...list, ...fallback])).slice(0, Math.max(min, fallback.length))
}

function labeledAnswer(stepId: string, id: string, locale: SolutionFinderLocale): LabeledAnswer {
  return {
    id,
    label: id ? getAnswerLabel(stepId, id, locale) : '',
  }
}

function detectDescriptionNeeds(description: string) {
  if (!description) return []
  const lower = description.toLowerCase()
  const checks: Array<[string, RegExp]> = [
    ['booking', /\b(book|booking|appointment|schedule|reservation|حجز|موعد)\b/i],
    ['reminders', /\b(reminder|reminders|notification|notifications|follow[- ]?up|تذكير|إشعار|متابعة)\b/i],
    ['dashboard', /\b(dashboard|admin|portal|crm|لوحة|بوابة|إدارة)\b/i],
    ['payments', /\b(payment|checkout|invoice|subscription|دفع|فاتورة|اشتراك)\b/i],
    ['automation', /\b(automation|automate|workflow|ai|أتمتة|ذكاء)\b/i],
    ['mobile experience', /\b(mobile|ios|android|app|تطبيق|موبايل)\b/i],
    ['integrations', /\b(integration|api|whatsapp|insurance|تكامل|واتساب|تأمين)\b/i],
  ]

  return checks.filter(([, pattern]) => pattern.test(lower)).map(([label]) => label).slice(0, 6)
}

function cleanText(value: unknown, maxLength = 1200) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : ''
}
