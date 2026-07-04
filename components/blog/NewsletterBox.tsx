'use client'

import { FormEvent, useState } from 'react'
import { Mail } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function NewsletterBox({ locale = 'en' }: { locale?: string }) {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const ar = locale === 'ar'

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const email = String(formData.get('email') || '').trim()
    const name = String(formData.get('name') || '').trim()
    const interest = String(formData.get('interest') || '').trim()

    if (!email.includes('@')) {
      setStatus('error')
      setMessage(ar ? 'أدخل عنوان بريد إلكتروني صحيح.' : 'Enter a valid email address.')
      return
    }

    setStatus('loading')
    setMessage('')

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, interest, source: 'insights', consent: true }),
      })
      const body = await response.json()

      if (!response.ok) {
        throw new Error(body?.error || (ar ? 'تعذّر الاشتراك.' : 'Could not subscribe.'))
      }

      form.reset()
      setStatus('success')
      setMessage(ar
        ? 'تم اشتراكك بنجاح. سنرسل لك فقط رسائل مفيدة عن النمو الرقمي.'
        : 'You are subscribed. We will send only useful digital growth notes.')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : (ar ? 'تعذّر الاشتراك الآن.' : 'Could not subscribe right now.'))
    }
  }

  const fieldClass =
    'h-12 border-0 border-b border-[var(--ed-rule)] bg-transparent px-1 text-sm text-[var(--ed-ink)] outline-none transition-colors placeholder:text-[var(--ed-muted)] focus:border-[var(--ed-accent)]'

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'var(--ed-paper)', borderTop: '2px solid var(--ed-rule-ink)', paddingTop: '2rem' }}
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.25fr] lg:items-start">
        <div>
          <span className="ed-eyebrow inline-flex items-center gap-2" style={{ color: 'var(--ed-accent)' }}>
            <Mail className="h-4 w-4" />
            {ar ? 'النشرة البريدية' : 'Newsletter'}
          </span>
          <h2 className="ed-serif mt-3" style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', lineHeight: 1.16 }}>
            {ar
              ? 'احصل على رؤى النمو الرقمي في صندوق الوارد'
              : 'Get digital growth insights in your inbox'}
          </h2>
          <p
            className="mt-3"
            style={{ fontFamily: 'var(--ed-sans)', fontSize: '0.95rem', lineHeight: 1.6, color: 'var(--ed-graphite)', maxWidth: '32rem' }}
          >
            {ar
              ? 'استقبل رؤى عملية حول مواقع الويب، الأتمتة، CRM، الذكاء الاصطناعي، والأنظمة الرقمية القابلة للتوسع.'
              : 'Receive practical insights about websites, automation, CRM, AI, and scalable digital systems.'}
          </p>
        </div>
        <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-[1fr_1.2fr] lg:grid-cols-[1fr_1.15fr_auto]">
          <label className="sr-only" htmlFor="newsletter-name">
            {ar ? 'الاسم' : 'Name'}
          </label>
          <input
            id="newsletter-name"
            name="name"
            type="text"
            placeholder={ar ? 'الاسم' : 'Name'}
            className={fieldClass}
          />
          <label className="sr-only" htmlFor="newsletter-email">
            {ar ? 'البريد الإلكتروني' : 'Email address'}
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className={fieldClass}
          />
          <label className="sr-only" htmlFor="newsletter-interest">
            {ar ? 'الاهتمام' : 'Interest'}
          </label>
          <select
            id="newsletter-interest"
            name="interest"
            className={`${fieldClass} sm:col-span-2 lg:col-span-1`}
          >
            <option value="">{ar ? 'اختر اهتمامك' : 'Choose interest'}</option>
            <option value="Web Development">{ar ? 'تطوير الويب' : 'Web Development'}</option>
            <option value="Business Systems">{ar ? 'أنظمة الأعمال' : 'Business Systems'}</option>
            <option value="AI Solutions">{ar ? 'حلول الذكاء الاصطناعي' : 'AI Solutions'}</option>
            <option value="Automation">{ar ? 'الأتمتة' : 'Automation'}</option>
            <option value="CRM & ERP">{ar ? 'CRM & ERP' : 'CRM & ERP'}</option>
          </select>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="ed-eyebrow h-12 px-6 text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 sm:col-span-2 lg:col-span-1"
            style={{ background: 'var(--ed-accent)', letterSpacing: '0.12em' }}
          >
            {status === 'loading'
              ? (ar ? 'جارٍ الاشتراك...' : 'Subscribing...')
              : (ar ? 'اشترك' : 'Subscribe')}
          </button>
          {message && (
            <p
              className="sm:col-span-2 lg:col-span-3 text-sm"
              style={{ fontFamily: 'var(--ed-sans)', color: status === 'success' ? 'var(--ed-accent-ink)' : '#b91c1c' }}
              role="status"
            >
              {message}
            </p>
          )}
          <p className="ed-meta sm:col-span-2 lg:col-span-3" style={{ textTransform: 'none', letterSpacing: '0.02em' }}>
            {ar ? 'بدون بريد مزعج. رؤى نمو رقمي مفيدة فقط.' : 'No spam. Only useful digital growth insights.'}
          </p>
        </form>
      </div>
    </section>
  )
}
