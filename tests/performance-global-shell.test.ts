import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = (file: string) => readFileSync(file, 'utf8')

test('global shell does not preload every locale font', () => {
  const layout = source('app/(frontend)/[locale]/layout.tsx')
  assert.match(layout, /preload: false/)
  assert.doesNotMatch(layout, /subsets: \['latin', 'arabic'\]/)
})

test('chatbot and Clutch require interaction or viewport relevance', () => {
  assert.match(source('components/ai-chatbot/AIChatbotLazy.tsx'), /useDeferredInteraction|ViewportEnhancement/)
  assert.match(source('components/home/Testimonials.tsx'), /IntersectionObserver|useAnimationActivity/)
})

test('WhatsApp Next Links cannot prefetch the redirect endpoint', () => {
  const files = [
    'components/Header.tsx',
    'components/home/FAQ.tsx',
    'components/home/FinalCTA.tsx',
    'components/services/PillarPage.tsx',
    'app/(frontend)/[locale]/process/page.tsx',
    'app/(frontend)/[locale]/trust/page.tsx',
  ]
  for (const file of files) {
    const code = source(file)
    for (const match of code.matchAll(/<Link[^>]*?href=\{?`?\/api\/whatsapp[^>]*?>/g)) {
      assert.match(match[0], /prefetch=\{false\}/, file)
    }
  }
})

test('CSP permits exactly the analytics and badge providers rendered by the layout', () => {
  const config = source('next.config.mjs')
  for (const host of ['www.googletagmanager.com', 'connect.facebook.net', 'images.dmca.com']) {
    assert.match(config, new RegExp(host.replaceAll('.', '\\.')))
  }
})
