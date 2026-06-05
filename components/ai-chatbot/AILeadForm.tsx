'use client'

import { FormEvent, useState } from 'react'
import { Send } from 'lucide-react'
import styles from './AIChatbot.module.css'

type LeadFormState = {
  name: string
  phone: string
  country: string
  businessType: string
  serviceNeeded: string
  budgetRange: string
  timeline: string
}

const labels = {
  ar: {
    name: 'الاسم',
    phone: 'رقم واتساب',
    country: 'الدولة',
    businessType: 'نوع المشروع',
    budgetRange: 'الميزانية التقريبية',
    timeline: 'متى تريد البدء؟',
    submit: 'إرسال الطلب',
  },
  en: {
    name: 'Name',
    phone: 'WhatsApp number',
    country: 'Country',
    businessType: 'Project type',
    budgetRange: 'Estimated budget',
    timeline: 'When do you want to start?',
    submit: 'Send request',
  },
}

export function AILeadForm({
  locale,
  pageUrl,
  latestSummary,
  onSubmitted,
}: {
  locale: 'ar' | 'en'
  pageUrl: string | null
  latestSummary: string
  onSubmitted: (whatsappUrl: string | null) => void
}) {
  const [form, setForm] = useState<LeadFormState>({
    name: '',
    phone: '',
    country: '',
    businessType: '',
    serviceNeeded: '',
    budgetRange: '',
    timeline: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const L = labels[locale]

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return

    setSubmitting(true)
    try {
      const response = await fetch('/api/ai-leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          serviceNeeded: form.serviceNeeded || form.businessType,
          message: latestSummary || form.serviceNeeded || form.businessType || 'AI chatbot lead',
          pageUrl,
          language: locale,
          source: 'ai_chatbot',
        }),
      })
      const data = (await response.json().catch(() => ({}))) as { whatsappUrl?: string }
      onSubmitted(data.whatsappUrl ?? null)
    } finally {
      setSubmitting(false)
    }
  }

  function update(key: keyof LeadFormState, value: string) {
    setForm((current) => ({ ...current, [key]: value }))
  }

  return (
    <form className={styles.leadForm} onSubmit={handleSubmit} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <div className={styles.formGrid}>
        <label>
          <span>{L.name}</span>
          <input value={form.name} onChange={(event) => update('name', event.target.value)} autoComplete="name" />
        </label>
        <label>
          <span>{L.phone}</span>
          <input value={form.phone} onChange={(event) => update('phone', event.target.value)} autoComplete="tel" />
        </label>
        <label>
          <span>{L.country}</span>
          <input value={form.country} onChange={(event) => update('country', event.target.value)} autoComplete="country-name" />
        </label>
        <label>
          <span>{L.businessType}</span>
          <input value={form.businessType} onChange={(event) => update('businessType', event.target.value)} />
        </label>
        <label>
          <span>{L.budgetRange}</span>
          <input value={form.budgetRange} onChange={(event) => update('budgetRange', event.target.value)} />
        </label>
        <label>
          <span>{L.timeline}</span>
          <input value={form.timeline} onChange={(event) => update('timeline', event.target.value)} />
        </label>
      </div>
      <button className={styles.submitLeadButton} type="submit" disabled={submitting}>
        <Send size={16} aria-hidden="true" />
        <span>{L.submit}</span>
      </button>
    </form>
  )
}
