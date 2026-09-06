'use client'

import dynamic from 'next/dynamic'
import { useDeferredInteraction } from '@/hooks/useDeferredInteraction'

// The chatbot only appears after hydration anyway, so split its bundle out of
// the initial page payload and only load it after the visitor's first real
// interaction (with a long idle fallback for non-interactive sessions). This
// keeps the chatbot chunk entirely off the critical path on every page.
const AIChatbot = dynamic(() => import('./AIChatbot').then((mod) => mod.AIChatbot), {
  ssr: false,
})

export function AIChatbotLazy() {
  const ready = useDeferredInteraction()
  if (!ready) return null
  return <AIChatbot />
}

export default AIChatbotLazy
