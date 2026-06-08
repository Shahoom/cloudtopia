'use client'

import { useState } from 'react'
import { Globe, Mail, Phone, Send, ShieldCheck, User } from 'lucide-react'
import Link from 'next/link'
import { localePath } from '@/lib/i18n/url'

export function InquiryFormSidebar({ locale }: { locale: string }) {
  const [captchaAnswer, setCaptchaAnswer] = useState('')

  return (
    <aside className="sticky top-[100px] max-h-[calc(100vh-8rem)] overflow-y-auto rounded-[15px] bg-neutral-50 p-5 shadow-sm">
      <h2 className="mb-1 text-[17px] font-black text-neutral-900">Get a Free Consultation</h2>
      <p className="mb-5 text-[13px] text-neutral-500">
        Tell us about your project and we'll get back to you within 24 hours.
      </p>

      <div className="space-y-3">
        <div className="flex items-center gap-2 overflow-hidden rounded-lg border border-neutral-200 bg-white px-3 py-2.5 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-400/20">
          <User className="h-4 w-4 shrink-0 text-primary-600" />
          <input
            type="text"
            placeholder="Full Name"
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-neutral-900 outline-none placeholder:text-neutral-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-hidden rounded-lg border border-neutral-200 bg-white px-3 py-2.5 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-400/20">
          <Mail className="h-4 w-4 shrink-0 text-primary-600" />
          <input
            type="email"
            placeholder="Email Address"
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-neutral-900 outline-none placeholder:text-neutral-400"
          />
        </div>

        <div className="flex items-center gap-2 overflow-hidden rounded-lg border border-neutral-200 bg-white px-3 py-2.5 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-400/20">
          <Globe className="h-4 w-4 shrink-0 text-primary-600" />
          <select className="min-w-0 flex-1 bg-transparent text-sm font-medium text-neutral-600 outline-none">
            <option value="">Select Country</option>
            <option>United States</option>
            <option>United Arab Emirates</option>
            <option>Saudi Arabia</option>
            <option>United Kingdom</option>
            <option>Canada</option>
            <option>Australia</option>
            <option>Germany</option>
            <option>Other</option>
          </select>
        </div>

        <div className="flex items-center gap-2 overflow-hidden rounded-lg border border-neutral-200 bg-white px-3 py-2.5 focus-within:border-primary-400 focus-within:ring-2 focus-within:ring-primary-400/20">
          <Phone className="h-4 w-4 shrink-0 text-primary-600" />
          <input
            type="tel"
            placeholder="Phone Number"
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-neutral-900 outline-none placeholder:text-neutral-400"
          />
        </div>

        <textarea
          rows={3}
          placeholder="Tell us about your project…"
          className="w-full resize-none rounded-lg border border-neutral-200 bg-white px-3 py-2.5 text-sm font-medium text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
        />

        <div className="flex items-start gap-2 rounded-lg bg-sky-50 p-3">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-primary-600" />
          <p className="text-[11px] leading-relaxed text-neutral-600">
            Your ideas are fully protected under our NDA.
          </p>
        </div>

        <div className="space-y-1.5">
          <p className="text-[12px] font-bold text-neutral-600">What is 2 + 1?</p>
          <input
            type="text"
            value={captchaAnswer}
            onChange={(e) => setCaptchaAnswer(e.target.value)}
            placeholder="Your answer"
            className="w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm font-medium text-neutral-900 outline-none placeholder:text-neutral-400 focus:border-primary-400"
            maxLength={2}
          />
        </div>

        <Link
          href={localePath(locale, '/contact')}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary-600 py-3 text-sm font-black uppercase tracking-wide text-white transition hover:bg-primary-700"
        >
          <Send className="h-4 w-4" />
          Send My Inquiry
        </Link>
      </div>
    </aside>
  )
}
