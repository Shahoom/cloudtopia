'use client'

import { FormEvent, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import { AIChatbotButton } from './AIChatbotButton'
import { AIChatbotWindow } from './AIChatbotWindow'
import type { ChatChip, ChatMessage } from './AIChatMessage'
import { getEntryChips, getFlowNode, getWelcomeText, matchFlow, type FlowResult } from '@/lib/ai-chatbot/flows/index.ts'
import { buildWhatsappHandoff } from '@/lib/ai-chatbot/whatsapp.ts'
import type { ConversationTurn } from '@/lib/ai-chatbot/types.ts'
import styles from './AIChatbot.module.css'

const sessionKey = 'cloudtopia-ai-chat-session'
// Rotating id for the CURRENT conversation. Distinct from sessionKey (a stable
// per-visitor id used only for rate limiting): this rotates after each session
// ends so a returning visitor's new conversation becomes a NEW CMS row instead
// of overwriting the previous transcript.
const conversationKey = 'cloudtopia-ai-chat-conversation-id'
const proactiveKey = 'cloudtopia-ai-chat-proactive-at'

// Flows answer the common questions with zero API. The OpenAI fallback only runs
// for free-typed questions no flow matches — and can be switched off entirely with
// NEXT_PUBLIC_AI_CHAT_FALLBACK=false, making the bot 100% flow-driven.
const aiFallbackEnabled = process.env.NEXT_PUBLIC_AI_CHAT_FALLBACK !== 'false'
const INACTIVITY_MS = 3 * 60 * 1000

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

const guidedMenu = {
  ar: 'لم ألتقط ذلك تمامًا، لكن يمكنني مساعدتك في أحد هذه المواضيع، أو توصيلك بفريقنا مباشرة:',
  en: 'I didn’t quite catch that, but I can help with one of these — or connect you with our team directly:',
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
  const [leadCaptured, setLeadCaptured] = useState(false)
  const [latestWhatsappUrl, setLatestWhatsappUrl] = useState<string | null>(null)
  const [attention, setAttention] = useState(false)
  const inputRef = useRef<HTMLInputElement | null>(null)

  // Refs mirror state so window/unload event handlers always flush the latest
  // transcript rather than a stale closure.
  const messagesRef = useRef<ChatMessage[]>([])
  const localeRef = useRef<'ar' | 'en'>('en')
  const leadCapturedRef = useRef(false)
  const lastSigRef = useRef('')
  const inactivityRef = useRef<number | null>(null)
  // Set after a session-end flush so the next user turn starts a fresh conversation id.
  const pendingRotateRef = useRef(false)

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
    messagesRef.current = messages
  }, [messages])
  useEffect(() => {
    localeRef.current = locale
  }, [locale])
  useEffect(() => {
    leadCapturedRef.current = leadCaptured
  }, [leadCaptured])

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

  // Flush the transcript to the CMS at session end: when the tab is hidden or
  // closed (via sendBeacon so it survives unload) and after a long idle gap.
  useEffect(() => {
    if (!mounted || shouldHide) return

    function onVisibility() {
      if (document.visibilityState === 'hidden') flushConversation({ status: 'completed', useBeacon: true })
    }
    function onPageHide() {
      flushConversation({ status: 'completed', useBeacon: true })
    }

    document.addEventListener('visibilitychange', onVisibility)
    window.addEventListener('pagehide', onPageHide)

    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      window.removeEventListener('pagehide', onPageHide)
      if (inactivityRef.current) window.clearTimeout(inactivityRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mounted, shouldHide])

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
        return [...current, createMessage('assistant', proactive[nextLocale], { source: 'system', options: getEntryChips(nextLocale) })].slice(-20)
      })
      localStorage.setItem(proactiveKey, new Date().toISOString())
    }, 60_000)

    return () => {
      window.clearTimeout(ringTimer)
      window.clearTimeout(openTimer)
    }
  }, [mounted, shouldHide])

  if (!mounted || shouldHide) return null

  function bumpInactivity() {
    if (inactivityRef.current) window.clearTimeout(inactivityRef.current)
    inactivityRef.current = window.setTimeout(() => {
      flushConversation({ status: 'completed' })
    }, INACTIVITY_MS)
  }

  function buildConversationBody(status: 'active' | 'completed', leadOverride?: boolean) {
    const msgs = messagesRef.current
    const turns: ConversationTurn[] = msgs.map((m) => ({
      role: m.role,
      content: m.content,
      source: m.source ?? (m.role === 'user' ? 'user' : 'flow'),
      at: m.createdAt,
    }))

    return {
      sessionId: ensureConversationId(),
      language: localeRef.current,
      pageUrl: window.location.href,
      country: null,
      startedAt: msgs[0]?.createdAt ?? null,
      endedAt: new Date().toISOString(),
      messages: turns,
      leadCaptured: leadOverride ?? leadCapturedRef.current,
      status,
      source: 'ai_chatbot',
    }
  }

  function flushConversation({
    status,
    useBeacon = false,
    leadCaptured: leadOverride,
  }: {
    status: 'active' | 'completed'
    useBeacon?: boolean
    leadCaptured?: boolean
  }) {
    if (typeof window === 'undefined') return
    const msgs = messagesRef.current
    if (!msgs.some((m) => m.role === 'user')) return // nothing real to log yet

    const body = buildConversationBody(status, leadOverride)
    const payload = JSON.stringify(body)
    const signature = `${status}:${body.messages.length}:${msgs[msgs.length - 1]?.id ?? ''}:${body.leadCaptured}`
    // Always allow the final "completed" save through; dedupe interim saves.
    if (status !== 'completed' && signature === lastSigRef.current) return
    lastSigRef.current = signature

    try {
      if (useBeacon && typeof navigator !== 'undefined' && navigator.sendBeacon) {
        navigator.sendBeacon('/api/ai-chat/conversation', new Blob([payload], { type: 'application/json' }))
      } else {
        void fetch('/api/ai-chat/conversation', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-ai-chat-session': ensureSessionId() },
          body: payload,
          keepalive: true,
        }).catch(() => {})
      }
    } catch {
      // Logging must never break the chat experience.
    }

    // After a session-end save, the next message should open a new conversation.
    if (status === 'completed') pendingRotateRef.current = true
  }

  function maybeRotateConversation() {
    if (!pendingRotateRef.current) return
    rotateConversationId()
    pendingRotateRef.current = false
    lastSigRef.current = ''
  }

  function applyFlowResult(flow: FlowResult, summaryText: string) {
    let whatsappUrl: string | undefined
    if (flow.action === 'whatsapp') {
      const handoff = buildWhatsappHandoff({
        language: locale,
        country: null,
        businessType: null,
        serviceNeeded: null,
        budgetRange: null,
        timeline: null,
        summary: summaryText || ' ',
        pageUrl: window.location.href,
      })
      whatsappUrl = handoff.url
      setLatestWhatsappUrl(handoff.url)
    }
    if (flow.action === 'lead-form') setShowLeadForm(true)

    setMessages((current) => [
      ...current,
      createMessage('assistant', flow.answer, { source: 'flow', options: flow.chips, whatsappUrl }),
    ])
  }

  function pushGuidedMenu() {
    const handoff = buildWhatsappHandoff({
      language: locale,
      country: null,
      businessType: null,
      serviceNeeded: null,
      budgetRange: null,
      timeline: null,
      summary: ' ',
      pageUrl: window.location.href,
    })
    setLatestWhatsappUrl(handoff.url)
    const chips: ChatChip[] = [...getEntryChips(locale), { id: 'whatsapp', label: locale === 'ar' ? 'واتساب' : 'WhatsApp' }]
    setMessages((current) => [
      ...current,
      createMessage('assistant', guidedMenu[locale], { source: 'system', options: chips, whatsappUrl: handoff.url }),
    ])
  }

  async function submitMessage(content: string) {
    const trimmed = content.trim()
    if (!trimmed || loading) return

    maybeRotateConversation()
    const userMessage = createMessage('user', trimmed, { source: 'user' })
    const next = [...messages, userMessage]
    setMessages(next)
    setInput('')
    setAttention(false)
    localStorage.setItem(proactiveKey, new Date().toISOString())
    bumpInactivity()

    // 1) Try the deterministic flow engine — instant, no API.
    const flow = matchFlow(trimmed, locale)
    if (flow) {
      applyFlowResult(flow, trimmed)
      return
    }

    // 2) No flow matched. Either use the AI fallback or a graceful guided menu.
    if (!aiFallbackEnabled) {
      pushGuidedMenu()
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-ai-chat-session': ensureSessionId(),
        },
        body: JSON.stringify({
          messages: next.map(({ role, content }) => ({ role, content })),
          pageUrl: window.location.href,
          locale,
        }),
      })
      const data = (await response.json().catch(() => ({}))) as {
        reply?: string
        lead?: { confidence?: number; whatsappUrl?: string | null; isPotentialLead?: boolean }
      }
      const whatsappUrl = data.lead?.whatsappUrl ?? null

      if (whatsappUrl) setLatestWhatsappUrl(whatsappUrl)
      if ((data.lead?.confidence ?? 0) >= 0.65 || data.lead?.isPotentialLead) setShowLeadForm(true)

      setMessages((current) => [
        ...current,
        createMessage('assistant', data.reply || fallback[locale], {
          source: 'ai',
          whatsappUrl: whatsappUrl || undefined,
          options: getEntryChips(locale),
        }),
      ])
    } catch {
      setMessages((current) => [...current, createMessage('assistant', fallback[locale], { source: 'system' })])
    } finally {
      setLoading(false)
    }
  }

  function handleChip(chip: ChatChip) {
    if (loading) return

    maybeRotateConversation()
    const userMessage = createMessage('user', chip.label, { source: 'user' })
    setMessages((current) => [...current, userMessage])
    setAttention(false)
    bumpInactivity()

    const flow = getFlowNode(chip.id, locale)
    if (flow) {
      applyFlowResult(flow, chip.label)
    } else {
      void submitMessage(chip.label)
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    void submitMessage(input)
  }

  function clearChat() {
    const reset = [welcomeMessage(locale)]
    setMessages(reset)
    setLatestWhatsappUrl(null)
    setShowLeadForm(false)
    setLeadCaptured(false)
    rotateConversationId()
    pendingRotateRef.current = false
    lastSigRef.current = ''
    localStorage.setItem(storageKeyForLocale(locale), JSON.stringify(reset))
  }

  function handleClose() {
    setOpen(false)
    flushConversation({ status: 'active' })
  }

  function handleLeadSubmitted(whatsappUrl: string | null) {
    if (whatsappUrl) setLatestWhatsappUrl(whatsappUrl)
    setLeadCaptured(true)
    setMessages((current) => [
      ...current,
      createMessage('assistant', submitted[locale], { source: 'system', whatsappUrl: whatsappUrl || undefined }),
    ])
    flushConversation({ status: 'active', leadCaptured: true })
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
          onChip={handleChip}
          onClear={clearChat}
          onClose={handleClose}
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

function welcomeMessage(locale: 'ar' | 'en'): ChatMessage {
  return createMessage('assistant', getWelcomeText(locale), { source: 'system', options: getEntryChips(locale) })
}

function readStoredMessages(locale: 'ar' | 'en') {
  try {
    const stored = JSON.parse(localStorage.getItem(storageKeyForLocale(locale)) || '[]') as ChatMessage[]
    if (Array.isArray(stored) && stored.length > 0) return stored.slice(-20)
  } catch {
    localStorage.removeItem(storageKeyForLocale(locale))
  }

  return [welcomeMessage(locale)]
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

type CreateMessageOptions = {
  whatsappUrl?: string
  options?: ChatChip[]
  source?: ChatMessage['source']
}

function createMessage(role: ChatMessage['role'], content: string, opts: CreateMessageOptions = {}): ChatMessage {
  return {
    id: typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,
    role,
    content,
    createdAt: new Date().toISOString(),
    whatsappUrl: opts.whatsappUrl,
    options: opts.options,
    source: opts.source,
  }
}

function ensureSessionId() {
  const existing = localStorage.getItem(sessionKey)
  if (existing) return existing
  const created = newId()
  localStorage.setItem(sessionKey, created)
  return created
}

function ensureConversationId() {
  const existing = localStorage.getItem(conversationKey)
  if (existing) return existing
  return rotateConversationId()
}

function rotateConversationId() {
  const created = newId()
  localStorage.setItem(conversationKey, created)
  return created
}

function newId() {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`
}
