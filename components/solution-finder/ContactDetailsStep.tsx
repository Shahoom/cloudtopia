'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { User, Phone, Mail, Building2, FileText, MessageCircle, Mail as MailIcon, PhoneCall } from 'lucide-react'
import type { WizardAnswers } from './recommendationEngine'
import type { SFTextShape } from './sfTranslations'

type Props = {
  answers: WizardAnswers
  onChange: (updates: Partial<WizardAnswers>) => void
  onSubmit: () => void
  isLoading: boolean
  locale: 'en' | 'ar'
  t: SFTextShape
}

export default function ContactDetailsStep({ answers, onChange, onSubmit, isLoading, locale, t }: Props) {
  const [errors, setErrors] = useState<Record<string, string>>({})
  const f = t.form

  function validate() {
    const errs: Record<string, string> = {}
    if (!answers.name?.trim())  errs.name  = f.nameRequired
    if (!answers.phone?.trim()) errs.phone = f.phoneRequired
    // Email is optional but validated if provided
    if (answers.email?.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email))
      errs.email = f.emailInvalid
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  function handleSubmit() {
    if (validate()) onSubmit()
  }

  const contactMethods = [
    { id: 'whatsapp', label: f.contactMethods.whatsapp, Icon: MessageCircle },
    { id: 'email',    label: f.contactMethods.email,    Icon: MailIcon },
    { id: 'call',     label: f.contactMethods.call,     Icon: PhoneCall },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-4"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Two-column grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
        <Field
          id="sf-name" label={f.fullName} icon={<User className="w-4 h-4" />}
          required value={answers.name || ''} placeholder={f.fullNamePlaceholder}
          error={errors.name} onChange={(v) => onChange({ name: v })}
        />
        <Field
          id="sf-phone" label={f.phone} icon={<Phone className="w-4 h-4" />}
          required value={answers.phone || ''} placeholder={f.phonePlaceholder}
          error={errors.phone} onChange={(v) => onChange({ phone: v })} type="tel"
        />
        <Field
          id="sf-email" label={f.email} icon={<Mail className="w-4 h-4" />}
          value={answers.email || ''} placeholder={f.emailPlaceholder}
          error={errors.email} onChange={(v) => onChange({ email: v })} type="email"
        />
        <Field
          id="sf-company" label={f.company} icon={<Building2 className="w-4 h-4" />}
          value={answers.company || ''} placeholder={f.companyPlaceholder}
          onChange={(v) => onChange({ company: v })}
        />
      </div>

      {/* Description */}
      <div>
        <label htmlFor="sf-description" className="block text-xs font-bold text-neutral-700 mb-1">
          <span className="flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-[#0284c7]" />
            {f.description}
          </span>
        </label>
        <textarea
          id="sf-description"
          rows={2}
          value={answers.description || ''}
          onChange={(e) => onChange({ description: e.target.value })}
          placeholder={f.descriptionPlaceholder}
          className="w-full px-3.5 py-2 rounded-xl border-2 border-[rgba(15,23,42,0.10)] bg-white text-sm text-neutral-800 placeholder:text-neutral-400 focus:outline-none focus:border-[#0284c7]/50 focus:ring-2 focus:ring-[#0284c7]/10 transition-all duration-200 resize-none"
        />
      </div>

      {/* Contact method preference */}
      <div>
        <p className="text-xs font-bold text-neutral-700 mb-1.5">{f.contactMethod}</p>
        <div className="flex flex-wrap gap-2">
          {contactMethods.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => onChange({ contactMethod: id })}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-xl border-2 text-xs font-semibold transition-all duration-200
                ${answers.contactMethod === id
                  ? 'border-[#0284c7] bg-[#0284c7]/8 text-[#0284c7]'
                  : 'border-[rgba(15,23,42,0.10)] bg-white text-neutral-600 hover:border-[#0284c7]/30 hover:text-[#0284c7]'
                }
              `}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Consent */}
      <label className="flex items-start gap-2.5 cursor-pointer group">
        <input
          id="sf-consent"
          type="checkbox"
          checked={answers.wantContact ?? true}
          onChange={(e) => onChange({ wantContact: e.target.checked })}
          className="mt-0.5 w-4 h-4 rounded border-neutral-300 accent-[#0284c7] cursor-pointer"
        />
        <span className="text-xs text-neutral-600 leading-snug group-hover:text-neutral-800 transition-colors">
          {f.consent}
        </span>
      </label>

      {/* Submit */}
      <motion.button
        type="button"
        onClick={handleSubmit}
        disabled={isLoading}
        whileHover={{ scale: isLoading ? 1 : 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="w-full flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0284c7] hover:bg-[#0369a1] disabled:bg-neutral-300 disabled:cursor-not-allowed text-white font-bold text-sm transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-[#0284c7]/25"
      >
        {isLoading ? (
          <>
            <span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" />
            {f.submitting}
          </>
        ) : (
          <>✨ {f.submit}</>
        )}
      </motion.button>

      {/* Privacy note */}
      <p className="text-[10px] sm:text-[11px] text-neutral-400 text-center leading-relaxed max-w-md mx-auto pt-1">
        🔒 {f.privacy}
      </p>
    </motion.div>
  )
}

function Field({
  id, label, icon, required, value, placeholder, error, onChange, type = 'text'
}: {
  id: string; label: string; icon: React.ReactNode; required?: boolean
  value: string; placeholder: string; error?: string; onChange: (v: string) => void; type?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="block text-xs font-bold text-neutral-700 mb-1">
        <span className="flex items-center gap-1.5 text-[#0284c7]">
          {icon}
          <span className="text-neutral-700">
            {label}{required && <span className="text-red-500 ms-0.5">*</span>}
          </span>
        </span>
      </label>
      <input
        id={id} type={type} value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`
          w-full px-3.5 py-2 rounded-xl border-2 bg-white text-sm text-neutral-800 placeholder:text-neutral-400
          focus:outline-none focus:ring-2 focus:ring-[#0284c7]/10 transition-all duration-200
          ${error ? 'border-red-400 focus:border-red-400' : 'border-[rgba(15,23,42,0.10)] focus:border-[#0284c7]/50'}
        `}
      />
      {error && <p className="mt-1 text-xs text-red-500 font-medium">{error}</p>}
    </div>
  )
}
