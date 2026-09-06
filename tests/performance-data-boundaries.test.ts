import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'
import { SERVICE_CATEGORY_OPTIONS } from '../lib/services/service-category-index.ts'
import { getSubserviceNavItems } from '../lib/services/subservice-nav-index.ts'

const source = (file: string) => readFileSync(file, 'utf8')

test('LanguageContext ships only its required active dictionary', () => {
  const context = source('lib/i18n/LanguageContext.tsx')
  assert.doesNotMatch(context, /from ['"]\.\/translations\/(en|ar)['"]/)
  assert.doesNotMatch(context, /Record<Locale, Translations>/)
  assert.match(context, /useMemo/)
})

test('Contact imports the compact category index, not SEO content', () => {
  const contact = source('app/(frontend)/[locale]/contact/ContactClient.tsx')
  assert.match(contact, /service-category-index/)
  assert.doesNotMatch(contact, /@\/lib\/seo\/services/)
  assert.doesNotMatch(contact, /pageT \|\| contextT/)
  assert.match(source('app/(frontend)/[locale]/contact/page.tsx'), /copy=\{dictionary\.contact\}/)
  assert.equal(SERVICE_CATEGORY_OPTIONS.length, 7)
})

test('client navigation helpers do not import full content databases', () => {
  for (const file of [
    'lib/services/pillar-subservices-localized.ts',
    'components/home/ServicesGrid.tsx',
    'components/services/DetailedServicesSection.tsx',
  ]) {
    const code = source(file)
    assert.doesNotMatch(code, /business-systems-content|digital-presence-content/)
  }
  assert.ok(getSubserviceNavItems('website-development', 'ar').length > 0)
})

test('homepage does not serialize its full dictionary twice', () => {
  assert.doesNotMatch(source('app/(frontend)/[locale]/page.tsx'), /serverDictionary=/)
  assert.doesNotMatch(source('app/(frontend)/[locale]/HomePageClient.tsx'), /serverDictionary/)
})
