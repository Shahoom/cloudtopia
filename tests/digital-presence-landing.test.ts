import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import test from 'node:test'
import { digitalPresencePillars } from '../lib/services/digital-presence'

const ROOT = path.resolve(import.meta.dirname, '..')
const filePath = (file: string) => path.join(ROOT, file)
const read = (file: string) => {
  const absolute = filePath(file)
  return fs.existsSync(absolute) ? fs.readFileSync(absolute, 'utf8') : ''
}

test('digital presence landing content is complete in English and Arabic', async () => {
  const contentFile = filePath('lib/services/digital-presence-landing.ts')
  assert.ok(fs.existsSync(contentFile), 'digital presence landing content module should exist')

  const { getDigitalPresenceLanding } = await import(pathToFileURL(contentFile).href)
  for (const locale of ['en', 'ar'] as const) {
    const content = getDigitalPresenceLanding(locale)
    assert.equal(content.locale, locale)
    assert.ok(`${content.hero.title} ${content.hero.accent}`.length > 20)
    assert.ok(content.hero.description.length > 80)
    assert.equal(content.services.length, digitalPresencePillars.length)
    assert.equal(content.faqs.length, 6)
    assert.equal(content.journey.length, 4)
    assert.equal(content.outcomes.length, 6)
    assert.match(
      `${content.hero.title} ${content.hero.accent}`,
      locale === 'ar' ? /حضور رقمي/ : /digital presence/i,
    )
  }
})

test('digital presence route owns canonical metadata and structured data', () => {
  const layout = read('app/(frontend)/[locale]/services/digital-presence/layout.tsx')
  const page = read('app/(frontend)/[locale]/services/digital-presence/page.tsx')

  assert.match(layout, /\/services\/digital-presence/)
  assert.match(layout, /buildHreflangMap/)
  assert.match(layout, /canonicalUrl/)
  assert.match(layout, /\/og\/services\/\$\{ogLocale\}\.jpg/)
  for (const type of ['Service', 'WebPage', 'BreadcrumbList', 'ItemList', 'FAQPage']) {
    assert.match(layout, new RegExp(`['\"]@type['\"]:\\s*['\"]${type}`))
  }
  assert.match(page, /DigitalPresenceLanding/)
  assert.match(page, /getDigitalPresenceLanding/)
})

test('all eight canonical pillars are rendered by the landing experience', () => {
  const source = read('components/services/digital-presence/DigitalPresenceLanding.tsx')

  assert.equal(new Set(digitalPresencePillars.map((pillar) => pillar.href)).size, 8)
  assert.match(source, /content\.services\.map/)
  assert.match(source, /localePath\(locale, service\.href\)/)
  assert.match(source, /id=["']service-atlas["']/)
})

test('landing experience keeps content semantic and conversions explicit', () => {
  const source = read('components/services/digital-presence/DigitalPresenceLanding.tsx')

  assert.match(source, /<(?:motion\.)?h1/)
  assert.match(source, /<details/)
  assert.match(source, /<summary/)
  assert.match(source, /\/api\/whatsapp\?locale=\$\{locale\}/)
  assert.doesNotMatch(source, /<div[^>]+onClick=/)
})

test('navigation and discovery surfaces use the new digital presence hub', () => {
  assert.match(
    read('components/Header.tsx'),
    /id:\s*['\"]digital-presence['\"][^\n]+hub:\s*['\"]\/services\/digital-presence['\"]/
  )
  assert.match(read('app/(frontend)/[locale]/services/ServicesPageClient.tsx'), /\/services\/digital-presence/)
  assert.match(read('lib/sitemap-data.ts'), /\/services\/digital-presence/)
  assert.match(read('scripts/generate-llms.ts'), /\/services\/digital-presence/)
})

test('services page renders the digital presence gateway before its pillar cards', () => {
  const source = read('app/(frontend)/[locale]/services/ServicesPageClient.tsx')
  const hubRender = source.indexOf('<CategoryHubCard categoryId={categoryId}')
  const groupRender = source.indexOf('{groups.map((group) => (')

  assert.match(source, /data-category-hub=\{categoryId\}/)
  assert.ok(hubRender >= 0, 'digital presence category should render its main gateway')
  assert.ok(groupRender >= 0 && hubRender < groupRender, 'category gateway should render before pillar groups')
})

test('arabic landing typography uses dedicated display and card leading', () => {
  const styles = read('components/services/digital-presence/digital-presence.module.css')

  assert.match(styles, /--presence-arabic-display-leading:\s*1\.3/)
  assert.match(styles, /--presence-arabic-heading-leading:\s*1\.36/)
  assert.match(styles, /--presence-arabic-card-leading:\s*1\.65/)
  assert.match(styles, /\.page\[dir='rtl'\] \.hero h1/)
  assert.match(styles, /\.page\[dir='rtl'\] \.faqItem summary strong/)
})

test('motion remains accessible and RTL aware', () => {
  const source = read('components/services/digital-presence/DigitalPresenceLanding.tsx')
  const styles = read('components/services/digital-presence/digital-presence.module.css')

  assert.match(source, /useReducedMotion/)
  assert.match(source, /dir=\{dir\}/)
  assert.match(styles, /prefers-reduced-motion/)
  assert.match(styles, /focus-visible/)
  assert.match(styles, /min-height:\s*44px/)
})
