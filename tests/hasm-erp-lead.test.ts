import assert from 'node:assert/strict'
import test from 'node:test'

import { parseHasmLeadInput, resolveHasmCorsOrigin } from '../lib/hasm-leads/validation.ts'

const validInput = {
  name: '  أحمد بن سالم  ',
  email: 'AHMED@EXAMPLE.COM',
  phone: '+968 9912 3456',
  consent: true,
  consentVersion: '2026-07-15',
  submissionId: '0f387c74-a2a0-4f71-a006-6e8b81b5d1dc',
  language: 'ar',
  timezone: 'Asia/Muscat',
  screen: '1440x900',
  pageUrl: 'https://legal.cloudtopia.net/login?utm_source=launch',
  referrer: 'https://cloudtopia.net/',
  utmSource: 'launch',
  website: '',
}

test('allows only the production demo, local development, and exact configured origins', () => {
  assert.equal(resolveHasmCorsOrigin('https://legal.cloudtopia.net'), 'https://legal.cloudtopia.net')
  assert.equal(resolveHasmCorsOrigin('http://localhost:3000'), 'http://localhost:3000')
  assert.equal(
    resolveHasmCorsOrigin('https://hasm-preview.example.com', 'https://hasm-preview.example.com'),
    'https://hasm-preview.example.com',
  )
  assert.equal(resolveHasmCorsOrigin('https://attacker.vercel.app'), null)
  assert.equal(resolveHasmCorsOrigin('https://legal.cloudtopia.net.attacker.test'), null)
  assert.equal(resolveHasmCorsOrigin(null), null)
})

test('normalizes a consented Hasm lead without accepting request-owned metadata', () => {
  const parsed = parseHasmLeadInput({
    ...validInput,
    ipAddress: '1.2.3.4',
    userAgent: 'forged',
    acceptLanguage: 'forged',
  })

  assert.equal(parsed.ok, true)
  if (!parsed.ok) return
  assert.equal(parsed.data.name, 'أحمد بن سالم')
  assert.equal(parsed.data.email, 'ahmed@example.com')
  assert.equal(parsed.data.phone, '+968 9912 3456')
  assert.equal('ipAddress' in parsed.data, false)
  assert.equal('userAgent' in parsed.data, false)
  assert.equal('acceptLanguage' in parsed.data, false)
})

test('requires explicit current-version consent and a valid UUID submission id', () => {
  assert.deepEqual(parseHasmLeadInput({ ...validInput, consent: false }), {
    ok: false,
    error: 'consent_required',
  })
  assert.deepEqual(parseHasmLeadInput({ ...validInput, consentVersion: 'old' }), {
    ok: false,
    error: 'consent_required',
  })
  assert.deepEqual(parseHasmLeadInput({ ...validInput, submissionId: 'predictable-id' }), {
    ok: false,
    error: 'invalid_submission',
  })
})

test('rejects honeypot submissions and Arabic-Indic phone digits', () => {
  assert.deepEqual(parseHasmLeadInput({ ...validInput, website: 'spam.example' }), {
    ok: false,
    error: 'invalid_submission',
  })
  assert.deepEqual(parseHasmLeadInput({ ...validInput, phone: '+٩٦٨ ٩٩١٢ ٣٤٥٦' }), {
    ok: false,
    error: 'invalid_phone',
  })
})

test('requires name, email, and phone for the public demo gate', () => {
  assert.deepEqual(parseHasmLeadInput({ ...validInput, name: '' }), {
    ok: false,
    error: 'invalid_name',
  })
  assert.deepEqual(parseHasmLeadInput({ ...validInput, email: 'bad-email' }), {
    ok: false,
    error: 'invalid_email',
  })
  assert.deepEqual(parseHasmLeadInput({ ...validInput, phone: '' }), {
    ok: false,
    error: 'invalid_phone',
  })
})
