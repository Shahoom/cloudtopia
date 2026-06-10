import assert from 'node:assert/strict'
import test from 'node:test'
import {
  getEntryChips,
  getFlowNode,
  matchFlow,
  normalizeForMatch,
} from '../lib/ai-chatbot/flows/index.ts'

test('normalizeForMatch unifies Arabic variants and diacritics', () => {
  assert.equal(normalizeForMatch('إستشارة'), normalizeForMatch('استشاره'))
  assert.equal(normalizeForMatch('  Hello   World '), 'hello world')
})

test('matches English website intent without the AI', () => {
  const result = matchFlow('I need a website for my company', 'en')
  assert.ok(result)
  assert.equal(result?.nodeId, 'digital-presence')
  assert.ok(result!.answer.length > 0)
  assert.ok(result!.chips.length > 0)
})

test('matches Arabic CRM intent', () => {
  const result = matchFlow('أحتاج نظام CRM لشركتي', 'ar')
  assert.ok(result)
  assert.equal(result?.nodeId, 'business-systems-development')
})

test('routes the real service categories (no "Labs")', () => {
  assert.equal(matchFlow('I want an online store with Mada', 'en')?.nodeId, 'ecommerce')
  assert.equal(matchFlow('do you build mobile apps for iOS?', 'en')?.nodeId, 'mobile-app-development')
  assert.equal(matchFlow('I need an AI chatbot', 'en')?.nodeId, 'ai-powered-solutions')
  assert.equal(matchFlow('help me with SEO and social media', 'en')?.nodeId, 'digital-growth-support')
  assert.equal(matchFlow('أريد قائمة QR لمطعمي', 'ar')?.nodeId, 'restaurant-qr-menu')
  // The old fake "CloudTopia Labs" node must no longer exist.
  assert.equal(getFlowNode('service-labs', 'en'), null)
})

test('routes pricing questions in both languages', () => {
  assert.equal(matchFlow('how much does it cost?', 'en')?.nodeId, 'pricing')
  assert.equal(matchFlow('كم التكلفة؟', 'ar')?.nodeId, 'pricing')
})

test('surfaces the founder and vision', () => {
  assert.equal(matchFlow('who founded CloudTopia?', 'en')?.nodeId, 'founder')
  assert.equal(matchFlow('من هو المؤسس؟', 'ar')?.nodeId, 'founder')
  assert.equal(matchFlow('what is your vision?', 'en')?.nodeId, 'vision')
})

test('consultation and whatsapp carry UI actions', () => {
  assert.equal(matchFlow('I want a free consultation', 'en')?.action, 'lead-form')
  assert.equal(getFlowNode('whatsapp', 'en')?.action, 'whatsapp')
})

test('returns null for unmatched free text (AI fallback territory)', () => {
  assert.equal(matchFlow('what is the capital of France', 'en'), null)
  assert.equal(matchFlow('xyzzy qwerty', 'en'), null)
})

test('chip lookup is deterministic and localized', () => {
  const ar = getFlowNode('services', 'ar')
  const en = getFlowNode('services', 'en')
  assert.ok(ar && en)
  assert.notEqual(ar!.answer, en!.answer)
  assert.equal(getFlowNode('does-not-exist', 'en'), null)
})

test('entry chips resolve for the welcome turn', () => {
  const chips = getEntryChips('en')
  assert.deepEqual(
    chips.map((c) => c.id),
    ['services', 'pricing', 'about', 'consultation'],
  )
})
