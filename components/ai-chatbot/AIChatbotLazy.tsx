'use client'

import dynamic from 'next/dynamic'

// The chatbot only appears after hydration anyway, so split its bundle out of
// the initial page payload and load it lazily on the client. This trims the
// first-load JS on every page across the site.
const AIChatbot = dynamic(() => import('./AIChatbot').then((mod) => mod.AIChatbot), {
  ssr: false,
})

export function AIChatbotLazy() {
  return <AIChatbot />
}

export default AIChatbotLazy
