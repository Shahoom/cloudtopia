'use client'

import { FormEvent, useState } from 'react'
import { Mail } from 'lucide-react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export function NewsletterBox() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const email = String(formData.get('email') || '').trim()
    const name = String(formData.get('name') || '').trim()
    const interest = String(formData.get('interest') || '').trim()

    if (!email.includes('@')) {
      setStatus('error')
      setMessage('Enter a valid email address.')
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
        throw new Error(body?.error || 'Could not subscribe.')
      }

      form.reset()
      setStatus('success')
      setMessage('You are subscribed. We will send only useful digital growth notes.')
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Could not subscribe right now.')
    }
  }

  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-sky-100 bg-white p-6 shadow-xl shadow-sky-950/10 md:p-8">
      <div className="absolute inset-y-0 right-0 hidden w-1/3 bg-[linear-gradient(rgba(2,132,199,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(2,132,199,0.08)_1px,transparent_1px)] bg-[size:32px_32px] lg:block" />
      <div className="relative grid gap-6 lg:grid-cols-[1fr_1.25fr] lg:items-center">
        <div>
          <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-primary-700">
            <Mail className="h-5 w-5" />
          </span>
          <h2 className="text-3xl font-black leading-tight tracking-normal text-neutral-950">
            Get digital growth insights in your inbox
          </h2>
          <p className="mt-3 text-base leading-7 text-neutral-600">
            Receive practical insights about websites, automation, CRM, AI, and scalable digital systems.
          </p>
        </div>
        <form onSubmit={onSubmit} className="grid gap-3 sm:grid-cols-[1fr_1.2fr] lg:grid-cols-[1fr_1.15fr_auto]">
          <label className="sr-only" htmlFor="newsletter-name">
            Name
          </label>
          <input
            id="newsletter-name"
            name="name"
            type="text"
            placeholder="Name"
            className="h-12 rounded-xl border border-neutral-200 px-4 text-sm font-semibold outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/15"
          />
          <label className="sr-only" htmlFor="newsletter-email">
            Email address
          </label>
          <input
            id="newsletter-email"
            name="email"
            type="email"
            required
            placeholder="you@company.com"
            className="h-12 rounded-xl border border-neutral-200 px-4 text-sm font-semibold outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/15"
          />
          <label className="sr-only" htmlFor="newsletter-interest">
            Interest
          </label>
          <select
            id="newsletter-interest"
            name="interest"
            className="h-12 rounded-xl border border-neutral-200 px-4 text-sm font-semibold outline-none transition focus:border-primary-500 focus:ring-4 focus:ring-primary-500/15 sm:col-span-2 lg:col-span-1"
          >
            <option value="">Choose interest</option>
            <option value="Web Development">Web Development</option>
            <option value="Business Systems">Business Systems</option>
            <option value="AI Solutions">AI Solutions</option>
            <option value="Automation">Automation</option>
            <option value="CRM & ERP">CRM & ERP</option>
          </select>
          <button
            type="submit"
            disabled={status === 'loading'}
            className="h-12 rounded-xl bg-primary-600 px-5 text-sm font-black text-white transition hover:bg-primary-700 disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2 lg:col-span-1"
          >
            {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
          </button>
          {message && (
            <p
              className={`sm:col-span-2 lg:col-span-3 text-sm font-bold ${
                status === 'success' ? 'text-emerald-700' : 'text-red-600'
              }`}
              role="status"
            >
              {message}
            </p>
          )}
          <p className="text-xs font-bold text-neutral-500 sm:col-span-2 lg:col-span-3">
            No spam. Only useful digital growth insights.
          </p>
        </form>
      </div>
    </section>
  )
}
