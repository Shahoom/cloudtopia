import assert from 'node:assert/strict'
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import test from 'node:test'
import { createElement } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

const shellFiles = [
  'components/home/ServicesGridStatic.tsx',
  'components/home/AiDigitalServicesStatic.tsx',
]

test('homepage static shells render localized semantic first frames without a client runtime', async () => {
  for (const file of shellFiles) {
    assert.equal(existsSync(path.join(process.cwd(), file)), true, `${file} must exist`)
    const source = readFileSync(path.join(process.cwd(), file), 'utf8')
    assert.doesNotMatch(
      source,
      /['"]use client['"]|framer-motion|useLanguage|\buse(?:State|Effect|Memo|Ref|Callback)\b/,
      `${file} must remain server-capable`,
    )
  }

  const [{ ServicesGridStatic }, { AiDigitalServicesStatic }] = await Promise.all([
    import('../components/home/ServicesGridStatic'),
    import('../components/home/AiDigitalServicesStatic'),
  ])

  const servicesEn = renderToStaticMarkup(createElement(ServicesGridStatic, { locale: 'en' }))
  const servicesAr = renderToStaticMarkup(createElement(ServicesGridStatic, { locale: 'ar' }))
  assert.match(servicesEn, /dir="ltr"/)
  assert.match(servicesEn, /What We Deliver/)
  assert.match(servicesEn, /Next-Gen IT Services Designed for/)
  assert.match(servicesEn, /Digital Presence/)
  assert.match(servicesEn, /Website Development/)
  assert.match(servicesEn, /href="\/services\/website-development"/)
  assert.match(servicesEn, /href="\/services"/)
  assert.match(servicesAr, /dir="rtl"/)
  assert.match(servicesAr, /خدمات تقنية متكاملة مصممة/)
  assert.match(servicesAr, /تطوير المواقع/)
  assert.match(servicesAr, /href="\/ar\/services\/website-development"/)
  assert.match(servicesAr, /href="\/ar\/services"/)

  const aiEn = renderToStaticMarkup(createElement(AiDigitalServicesStatic, { locale: 'en' }))
  const aiAr = renderToStaticMarkup(createElement(AiDigitalServicesStatic, { locale: 'ar' }))
  assert.match(aiEn, /dir="ltr"/)
  assert.match(aiEn, /Our Complete AI Development Services/)
  assert.match(aiEn, /AI Consulting &amp; Strategy/)
  assert.match(aiEn, /Conduct comprehensive workflow audits/)
  assert.match(aiEn, /AI Automation &amp; RPA/)
  assert.match(aiAr, /dir="rtl"/)
  assert.match(aiAr, /خدماتنا الكاملة لتطوير الذكاء الاصطناعي/)
  assert.match(aiAr, /استشارات واستراتيجيات الذكاء الاصطناعي/)
  assert.match(aiAr, /إجراء عمليات تدقيق شاملة لسير العمل/)
})

test('below-fold service imagery does not claim first-frame preload priority', () => {
  for (const file of [
    ...shellFiles,
    'components/home/ServicesGrid.tsx',
    'components/home/AiDigitalServices.tsx',
  ]) {
    if (!existsSync(path.join(process.cwd(), file))) continue
    assert.doesNotMatch(readFileSync(path.join(process.cwd(), file), 'utf8'), /\bpriority\b/, file)
  }
})
