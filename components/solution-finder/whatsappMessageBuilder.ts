// ─────────────────────────────────────────────────────────────────────────────
// CloudTopia Solution Finder — WhatsApp Message Builder
// Generates a clean, structured, bilingual WhatsApp message from wizard answers.
// ─────────────────────────────────────────────────────────────────────────────

import type { WizardAnswers, Locale, Recommendation } from './recommendationEngine'
import { getBudgetLabel, getTimelineLabel, getAnswerLabel } from './recommendationEngine'

// ─── WhatsApp number constant ─────────────────────────────────────────────────
// Change this in one place to update the number everywhere.
export const CLOUDTOPIA_WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '96895886393'

export function buildWhatsAppUrl(answers: WizardAnswers, recommendation: Recommendation, locale: Locale): string {
  const message = buildWhatsAppMessage(answers, recommendation, locale)
  return `https://wa.me/${CLOUDTOPIA_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}

function line(label: string, value: string | undefined): string {
  if (!value?.trim()) return ''
  return `${label} ${value}`
}

function notProvided(locale: Locale): string {
  return locale === 'ar' ? 'غير مذكور' : 'Not provided'
}

function val(v: string | undefined, fallback: string): string {
  return v?.trim() || fallback
}

export function buildWhatsAppMessage(
  answers: WizardAnswers,
  recommendation: Recommendation,
  locale: Locale
): string {
  const np = notProvided(locale)

  const industry  = answers.industry  ? getAnswerLabel('industry',       answers.industry,      locale) : np
  const projType  = answers.projectType ? getAnswerLabel('project-type', answers.projectType,   locale) : np
  const goal      = answers.businessGoal ? getAnswerLabel('business-goal', answers.businessGoal, locale) : np
  const budget    = answers.budget    ? getBudgetLabel(answers.budget,     locale) : np
  const timeline  = answers.timeline  ? getTimelineLabel(answers.timeline, locale) : np

  const name       = val(answers.name,        np)
  const phone      = val(answers.phone,        np)
  const company    = val(answers.company,      '')
  const country    = val(answers.country,      '')
  const description = val(answers.description, '')

  const services = recommendation.recommendedServices.slice(0, 4).join(', ')
  const features = recommendation.keyFeatures.slice(0, 4).join(', ')
  const tech     = recommendation.techStack.join(', ')
  const delivery = recommendation.deliveryApproach

  if (locale === 'ar') {
    const parts = [
      `مرحبًا CloudTopia،`,
      ``,
      `أكملت أداة اختيار الحل الرقمي وأرغب بالحصول على استشارة مجانية.`,
      ``,
      `*ملخص المشروع:*`,
      `1. القطاع: ${industry}`,
      `2. نوع المشروع: ${projType}`,
      `3. الهدف الأساسي: ${goal}`,
      `4. الميزانية المتوقعة: ${budget}`,
      `5. المدة المطلوبة: ${timeline}`,
      country  ? `6. الدولة: ${country}`        : '',
      company  ? `7. اسم الشركة: ${company}`    : '',
      `8. الاسم: ${name}`,
      `9. رقم الهاتف: ${phone}`,
      ``,
      `*الحل المقترح:*`,
      `- الباقة: ${recommendation.packageTitle}`,
      `- الخدمات المقترحة: ${services}`,
      `- الميزات الأساسية: ${features}`,
      `- التقنيات المقترحة: ${tech}`,
      `- طريقة التنفيذ المقترحة: ${delivery}`,
      description ? `\n*تفاصيل إضافية:*\n${description}` : '',
      ``,
      `يرجى مراجعة إجاباتي وإخباري بالخطوة الأنسب للبدء.`,
    ]
    return parts.filter((p) => p !== '').join('\n')
  }

  const parts = [
    `Hello CloudTopia 👋`,
    ``,
    `I completed the Solution Finder and would like a free consultation.`,
    ``,
    `*Project Summary:*`,
    `1. Industry: ${industry}`,
    `2. Project Type: ${projType}`,
    `3. Main Goal: ${goal}`,
    `4. Budget Range: ${budget}`,
    `5. Timeline: ${timeline}`,
    country  ? `6. Country: ${country}`       : '',
    company  ? `7. Company: ${company}`       : '',
    `8. Name: ${name}`,
    `9. Phone: ${phone}`,
    ``,
    `*Recommended Solution:*`,
    `- Package: ${recommendation.packageTitle}`,
    `- Suggested Services: ${services}`,
    `- Key Features: ${features}`,
    `- Suggested Tech Stack: ${tech}`,
    `- Suggested Delivery Approach: ${delivery}`,
    description ? `\n*Project Details:*\n${description}` : '',
    ``,
    `Please review my answers and let me know the best next step.`,
  ]
  return parts.filter((p) => p !== '').join('\n')
}
