'use client'

import { useState } from 'react'
import { CheckCircle2, Globe, Loader2, Mail, Phone, Send, ShieldCheck, User } from 'lucide-react'
import { WhatsAppButton } from '@/components/blog/editorial/WhatsAppButton'

interface InquiryFormSidebarProps {
  locale: string
  articleSlug?: string
}

export function InquiryFormSidebar({ locale, articleSlug }: InquiryFormSidebarProps) {
  const ar = locale === 'ar'

  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', message: '' })
  const [captcha, setCaptcha] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Simple honeypot-style captcha: 2 + 1 = 3
    if (captcha.trim() !== '3') {
      setErrorMsg(ar ? 'إجابة التحقق غير صحيحة.' : 'Incorrect verification answer.')
      return
    }

    if (!form.email && !form.phone) {
      setErrorMsg(ar ? 'يرجى إدخال البريد الإلكتروني أو رقم الهاتف.' : 'Enter an email or phone number.')
      return
    }

    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:    form.name    || undefined,
          email:   form.email   || undefined,
          phone:   form.phone   || undefined,
          country: form.country || undefined,
          message: form.message || (ar ? 'استفسار من المقال' : 'Inquiry from article'),
          source:  'article-sidebar',
          locale,
          pageUrl: typeof window !== 'undefined' ? window.location.href : undefined,
        }),
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error((body as { error?: string }).error || 'Request failed')
      }

      setStatus('success')
    } catch (err) {
      setStatus('error')
      setErrorMsg(
        err instanceof Error
          ? err.message
          : ar
            ? 'حدث خطأ. حاول مجدداً.'
            : 'Something went wrong. Please try again.',
      )
    }
  }

  // ── Success state ──────────────────────────────────────────────────────────
  if (status === 'success') {
    return (
      <aside className="sticky top-[100px] max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg border border-[var(--ed-rule)] bg-[var(--ed-paper)] p-5">
        <div className="flex flex-col items-center gap-3 py-4 text-center">
          <CheckCircle2 className="h-10 w-10 text-[color:var(--ed-accent)]" />
          <h2 className="ed-serif text-lg">
            {ar ? 'تم الإرسال بنجاح!' : 'Message received!'}
          </h2>
          <p className="text-[13px]" style={{ color: 'var(--ed-graphite)' }}>
            {ar
              ? 'سنرد عليك خلال يوم عمل واحد.'
              : "We'll get back to you within one business day."}
          </p>
        </div>
      </aside>
    )
  }

  // ── Form state ─────────────────────────────────────────────────────────────
  return (
    <aside
      className="sticky top-[100px] max-h-[calc(100vh-8rem)] overflow-y-auto rounded-lg border border-[var(--ed-rule)] bg-[var(--ed-paper)] p-5"
      dir={ar ? 'rtl' : 'ltr'}
    >
      <h2 className="ed-serif mb-1 text-lg">
        {ar ? 'احصل على استشارة مجانية' : 'Get a Free Consultation'}
      </h2>
      <p className="mb-4 text-[13px]" style={{ color: 'var(--ed-graphite)' }}>
        {ar
          ? 'أخبرنا عن مشروعك وسنرد عليك خلال 24 ساعة.'
          : "Tell us about your project and we'll get back to you within 24 hours."}
      </p>

      <WhatsAppButton locale={locale} fullWidth className="mb-4" />
      <div className="mb-4 flex items-center gap-3">
        <span className="h-px flex-1" style={{ background: 'var(--ed-rule)' }} />
        <span className="ed-eyebrow" style={{ color: 'var(--ed-muted)' }}>{ar ? 'أو' : 'or'}</span>
        <span className="h-px flex-1" style={{ background: 'var(--ed-rule)' }} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-3" noValidate>
        {/* Name */}
        <label className="flex items-center gap-2 overflow-hidden rounded-md border border-[var(--ed-rule)] bg-[var(--ed-paper)] px-3 py-2.5 focus-within:border-[color:var(--ed-accent)] focus-within:ring-2 focus-within:ring-[color:var(--ed-accent)]/20">
          <User className="h-4 w-4 shrink-0 text-[color:var(--ed-muted)]" />
          <input
            type="text"
            value={form.name}
            onChange={set('name')}
            placeholder={ar ? 'الاسم الكامل' : 'Full Name'}
            className="min-w-0 flex-1 bg-transparent text-sm text-[color:var(--ed-ink)] outline-none placeholder:text-[color:var(--ed-muted)]"
          />
        </label>

        {/* Email */}
        <label className="flex items-center gap-2 overflow-hidden rounded-md border border-[var(--ed-rule)] bg-[var(--ed-paper)] px-3 py-2.5 focus-within:border-[color:var(--ed-accent)] focus-within:ring-2 focus-within:ring-[color:var(--ed-accent)]/20">
          <Mail className="h-4 w-4 shrink-0 text-[color:var(--ed-muted)]" />
          <input
            type="email"
            value={form.email}
            onChange={set('email')}
            placeholder={ar ? 'البريد الإلكتروني' : 'Email Address'}
            className="min-w-0 flex-1 bg-transparent text-sm text-[color:var(--ed-ink)] outline-none placeholder:text-[color:var(--ed-muted)]"
          />
        </label>

        {/* Country */}
        <label className="flex items-center gap-2 overflow-hidden rounded-md border border-[var(--ed-rule)] bg-[var(--ed-paper)] px-3 py-2.5 focus-within:border-[color:var(--ed-accent)] focus-within:ring-2 focus-within:ring-[color:var(--ed-accent)]/20">
          <Globe className="h-4 w-4 shrink-0 text-[color:var(--ed-muted)]" />
          <select
            value={form.country}
            onChange={set('country')}
            className="min-w-0 flex-1 bg-transparent text-sm text-[color:var(--ed-body)] outline-none"
          >
            <option value="">{ar ? 'اختر الدولة' : 'Select Country'}</option>
            <option value="UAE">{ar ? 'الإمارات العربية المتحدة' : 'United Arab Emirates'}</option>
            <option value="Saudi Arabia">{ar ? 'المملكة العربية السعودية' : 'Saudi Arabia'}</option>
            <option value="Kuwait">{ar ? 'الكويت' : 'Kuwait'}</option>
            <option value="Qatar">{ar ? 'قطر' : 'Qatar'}</option>
            <option value="Bahrain">{ar ? 'البحرين' : 'Bahrain'}</option>
            <option value="Oman">{ar ? 'سلطنة عُمان' : 'Oman'}</option>
            <option value="United States">{ar ? 'الولايات المتحدة' : 'United States'}</option>
            <option value="United Kingdom">{ar ? 'المملكة المتحدة' : 'United Kingdom'}</option>
            <option value="Canada">{ar ? 'كندا' : 'Canada'}</option>
            <option value="Australia">{ar ? 'أستراليا' : 'Australia'}</option>
            <option value="Germany">{ar ? 'ألمانيا' : 'Germany'}</option>
            <option value="Other">{ar ? 'أخرى' : 'Other'}</option>
          </select>
        </label>

        {/* Phone */}
        <label className="flex items-center gap-2 overflow-hidden rounded-md border border-[var(--ed-rule)] bg-[var(--ed-paper)] px-3 py-2.5 focus-within:border-[color:var(--ed-accent)] focus-within:ring-2 focus-within:ring-[color:var(--ed-accent)]/20">
          <Phone className="h-4 w-4 shrink-0 text-[color:var(--ed-muted)]" />
          <input
            type="tel"
            value={form.phone}
            onChange={set('phone')}
            placeholder={ar ? 'رقم الهاتف' : 'Phone Number'}
            className="min-w-0 flex-1 bg-transparent text-sm text-[color:var(--ed-ink)] outline-none placeholder:text-[color:var(--ed-muted)]"
          />
        </label>

        {/* Message */}
        <textarea
          rows={3}
          value={form.message}
          onChange={set('message')}
          placeholder={ar ? 'أخبرنا عن مشروعك...' : 'Tell us about your project…'}
          className="w-full resize-none rounded-md border border-[var(--ed-rule)] bg-[var(--ed-paper)] px-3 py-2.5 text-sm text-[color:var(--ed-ink)] outline-none placeholder:text-[color:var(--ed-muted)] focus:border-[color:var(--ed-accent)] focus:ring-2 focus:ring-[color:var(--ed-accent)]/20"
        />

        {/* NDA notice */}
        <div className="flex items-start gap-2 rounded-md border border-[var(--ed-rule)] bg-[var(--ed-paper-2)] p-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-[color:var(--ed-accent)]" />
          <p className="text-[11px] leading-relaxed" style={{ color: 'var(--ed-graphite)' }}>
            {ar
              ? 'أفكارك محمية بالكامل بموجب اتفاقية سرية.'
              : 'Your ideas are fully protected under our NDA.'}
          </p>
        </div>

        {/* Captcha */}
        <div className="space-y-1.5">
          <p className="ed-eyebrow" style={{ color: 'var(--ed-graphite)' }}>
            {ar ? 'ما هو ناتج 2 + 1؟' : 'What is 2 + 1?'}
          </p>
          <input
            type="text"
            value={captcha}
            onChange={(e) => setCaptcha(e.target.value)}
            placeholder={ar ? 'إجابتك' : 'Your answer'}
            className="w-full rounded-md border border-[var(--ed-rule)] bg-[var(--ed-paper)] px-3 py-2 text-sm text-[color:var(--ed-ink)] outline-none placeholder:text-[color:var(--ed-muted)] focus:border-[color:var(--ed-accent)]"
            maxLength={2}
          />
        </div>

        {/* Error message */}
        {errorMsg && (
          <p className="text-[12px] font-semibold text-red-600">{errorMsg}</p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-[var(--ed-accent)] py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[var(--ed-accent-ink)] disabled:opacity-60"
        >
          {status === 'submitting' ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              {ar ? 'جارٍ الإرسال...' : 'Sending…'}
            </>
          ) : (
            <>
              <Send className="h-4 w-4" />
              {ar ? 'أرسل استفساري' : 'Send My Inquiry'}
            </>
          )}
        </button>
      </form>
    </aside>
  )
}
