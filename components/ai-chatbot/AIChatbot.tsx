'use client'

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AIChatbotButton } from './AIChatbotButton'
import { AIChatbotWindow } from './AIChatbotWindow'
import type { ChatMessage } from './AIChatMessage'
import styles from './AIChatbot.module.css'

const sessionKey = 'cloudtopia-ai-chat-session'
const proactiveKey = 'cloudtopia-ai-chat-proactive-at'

const welcome = {
  ar: 'أهلًا 👋 أنا مساعد CloudTopia الذكي. أخبرني عن مشروعك وسأساعدك بتحديد الخدمة المناسبة.',
  en: 'Hi 👋 I’m CloudTopia’s AI assistant. Tell me about your project and I’ll help you choose the right service.',
}

const fallback = {
  ar: 'حدث خطأ مؤقت. يمكنك التواصل معنا مباشرة عبر واتساب وسنساعدك.',
  en: 'Something went wrong. You can contact us directly on WhatsApp and we’ll help you.',
}

const submitted = {
  ar: 'تم استلام طلبك. يمكنك أيضًا إرسال التفاصيل مباشرة عبر واتساب لتسريع التواصل.',
  en: 'Your request has been received. You can also send the details on WhatsApp to speed things up.',
}

const proactive = {
  ar: 'أهلًا، لاحظت أنك تتصفح الموقع. هل تحتاج مساعدة في اختيار موقع، تطبيق ويب، CRM، أو حل AI مناسب لشركتك؟',
  en: 'Hi, I noticed you’re exploring CloudTopia. Need help choosing the right website, web app, CRM, or AI solution for your business?',
}

export function AIChatbot() {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  const [open, setOpen] = useState(false)
  const [locale, setLocale] = useState<'ar' | 'en'>('en')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [latestWhatsappUrl, setLatestWhatsappUrl] = useState<string | null>(null)
  const [attention, setAttention] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  const shouldHide = useMemo(() => {
    if (!mounted) return false
    return /\/(admin|cms|dashboard|login|crm)(\/|$)/i.test(pathname || window.location.pathname)
  }, [mounted, pathname])

  useEffect(() => {
    const detectedLocale = detectPageLocale()
    setLocale(detectedLocale)
    setMessages(readStoredMessages(detectedLocale))
    ensureSessionId()
    setMounted(true)
  }, [])

  useEffect(() => {
    if (!mounted) return

    function syncLocaleFromPage() {
      const nextLocale = detectPageLocale()
      setLocale((currentLocale) => {
        if (currentLocale === nextLocale) return currentLocale
        setMessages(readStoredMessages(nextLocale))
        setInput('')
        setShowLeadForm(false)
        setLatestWhatsappUrl(null)
        return nextLocale
      })
    }

    syncLocaleFromPage()

    const observer = new MutationObserver(syncLocaleFromPage)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['lang', 'dir'] })
    window.addEventListener('popstate', syncLocaleFromPage)

    return () => {
      observer.disconnect()
      window.removeEventListener('popstate', syncLocaleFromPage)
    }
  }, [mounted, pathname])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem(storageKeyForLocale(locale), JSON.stringify(messages.slice(-20)))
  }, [messages, mounted, locale])

  useEffect(() => {
    if (!open) return
    const timer = window.setTimeout(() => inputRef.current?.focus(), 160)
    return () => window.clearTimeout(timer)
  }, [open])

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') setOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  useEffect(() => {
    if (!mounted || shouldHide) return
    if (!shouldShowProactivePrompt()) return

    const ringTimer = window.setTimeout(() => setAttention(true), 55_000)
    const openTimer = window.setTimeout(() => {
      const nextLocale = detectPageLocale()
      setLocale(nextLocale)
      setOpen(true)
      setAttention(false)
      setMessages((current) => {
        if (current.some((message) => message.content === proactive[nextLocale])) return current
        return [...current, createMessage('assistant', proactive[nextLocale])].slice(-20)
      })
      localStorage.setItem(proactiveKey, new Date().toISOString())
    }, 60_000)

    return () => {
      window.clearTimeout(ringTimer)
      window.clearTimeout(openTimer)
    }
  }, [mounted, shouldHide])

  if (!mounted || shouldHide) return null

  async function submitMessage(content: string) {
    const trimmed = content.trim()
    if (!trimmed || loading) return

    const userMessage = createMessage('user', trimmed)
    const nextMessages = [...messages, userMessage]
    setMessages(nextMessages)
    setInput('')
    setLoading(true)
    setAttention(false)
    localStorage.setItem(proactiveKey, new Date().toISOString())

    if (/استشارة|consultation|contact|تواصل/i.test(trimmed)) {
      setShowLeadForm(true)
    }

    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-ai-chat-session': ensureSessionId(),
        },
        body: JSON.stringify({
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
          pageUrl: window.location.href,
          locale,
        }),
      })
      const data = (await response.json().catch(() => ({}))) as {
        reply?: string
        lead?: {
          confidence?: number
          whatsappUrl?: string | null
          isPotentialLead?: boolean
        }
      }
      const whatsappUrl = data.lead?.whatsappUrl ?? null

      if (whatsappUrl) setLatestWhatsappUrl(whatsappUrl)
      if ((data.lead?.confidence ?? 0) >= 0.65 || data.lead?.isPotentialLead) setShowLeadForm(true)

      setMessages((current) => [...current, createMessage('assistant', data.reply || fallback[locale], whatsappUrl || undefined)])
    } catch {
      setMessages((current) => [...current, createMessage('assistant', fallback[locale])])
    } finally {
      setLoading(false)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void submitMessage(input)
  }

  function clearChat() {
    const reset = [createMessage('assistant', welcome[locale])]
    setMessages(reset)
    setLatestWhatsappUrl(null)
    setShowLeadForm(false)
    localStorage.setItem(storageKeyForLocale(locale), JSON.stringify(reset))
  }

  function handleLeadSubmitted(whatsappUrl: string | null) {
    if (whatsappUrl) setLatestWhatsappUrl(whatsappUrl)
    setMessages((current) => [...current, createMessage('assistant', submitted[locale], whatsappUrl || undefined)])
  }

  return (
    <div className={`${styles.root} ${locale === 'ar' ? styles.rootRtl : ''}`}>
      {open ? (
        <AIChatbotWindow
          locale={locale}
          messages={messages}
          input={input}
          loading={loading}
          showLeadForm={showLeadForm}
          latestWhatsappUrl={latestWhatsappUrl}
          inputRef={inputRef}
          onInputChange={setInput}
          onSubmit={handleSubmit}
          onQuickAction={(value) => void submitMessage(value)}
          onClear={clearChat}
          onClose={() => setOpen(false)}
          onLeadSubmitted={handleLeadSubmitted}
        />
      ) : null}
      <AIChatbotButton
        locale={locale}
        open={open}
        attention={attention}
        onClick={() => {
          setAttention(false)
          localStorage.setItem(proactiveKey, new Date().toISOString())
          setOpen((value) => !value)
        }}
      />
    </div>
  )
}

function detectPageLocale(): 'ar' | 'en' {
  if (document.documentElement.lang === 'ar' || document.documentElement.dir === 'rtl') return 'ar'
  if (window.location.pathname.startsWith('/ar')) return 'ar'
  return 'en'
}

function readStoredMessages(locale: 'ar' | 'en') {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKeyForLocale(locale)) || '[]') as ChatMessage[]
    if (Array.isArray(stored) && stored.length > 0) return stored.slice(-20)
  } catch {
    localStorage.removeItem(storageKeyForLocale(locale))
  }

  return [createMessage('assistant', welcome[locale])]
}

function storageKeyForLocale(locale: 'ar' | 'en') {
  return `cloudtopia-ai-chat-${locale}`
}

function shouldShowProactivePrompt() {
  try {
    const stored = localStorage.getItem(proactiveKey)
    if (!stored) return true
    const lastShown = new Date(stored).getTime()
    if (!Number.isFinite(lastShown)) return true
    return Date.now() - lastShown > 24 * 60 * 60 * 1000
  } catch {
    return false
  }
}

function createMessage(role: ChatMessage['role'], content: string, whatsappUrl?: string): ChatMessage {
  return {
    id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    role,
    content,
    createdAt: new Date().toISOString(),
    whatsappUrl,
  }
}

function ensureSessionId() {
  const existing = localStorage.getItem(sessionKey)
  if (existing) return existing
  const created = typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`
  localStorage.setItem(sessionKey, created)
  return created
}
