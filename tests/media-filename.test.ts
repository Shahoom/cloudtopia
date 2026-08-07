import assert from 'node:assert/strict'
import test from 'node:test'
import { toStorageSafeFilename } from '../collections/Media.ts'

const FIXED_NOW = 1786125462074

// Supabase Storage's S3 API returns InvalidKey (400) for any key with non-ASCII
// bytes, so whatever comes out of here must be pure ASCII.
const ASCII_KEY = /^[A-Za-z0-9._-]+$/

test('folds an all-Arabic filename to a timestamped ASCII name', () => {
  // The exact filename that 500'd in production.
  const out = toStorageSafeFilename('لوحات تحكم إدارية تغنيك عن جداول البيانات.png', FIXED_NOW)
  assert.match(out, ASCII_KEY)
  assert.equal(out, `upload-${FIXED_NOW}.png`)
})

test('keeps the extension when the base is entirely non-Latin', () => {
  const out = toStorageSafeFilename('صورة.jpeg', FIXED_NOW)
  assert.match(out, ASCII_KEY)
  assert.ok(out.endsWith('.jpeg'), `expected a .jpeg extension, got ${out}`)
})

test('preserves readable Latin names, collapsing only what S3 rejects', () => {
  assert.equal(
    toStorageSafeFilename('Gemini_Generated_Image_m1a3y1 (1).png', FIXED_NOW),
    'Gemini_Generated_Image_m1a3y1-1.png',
  )
})

test('strips diacritics instead of destroying the word', () => {
  assert.equal(toStorageSafeFilename('café-señor.PNG', FIXED_NOW), 'cafe-senor.png')
})

test('handles a filename with no extension', () => {
  const out = toStorageSafeFilename('CRM Systems for Gulf Businesses (2026)', FIXED_NOW)
  assert.match(out, ASCII_KEY)
  assert.equal(out, 'CRM-Systems-for-Gulf-Businesses-2026')
})

test('mixed Arabic and Latin keeps the Latin part', () => {
  const out = toStorageSafeFilename('تقرير-2026-report.png', FIXED_NOW)
  assert.match(out, ASCII_KEY)
  assert.equal(out, '2026-report.png')
})

test('caps very long names so the key stays within limits', () => {
  const out = toStorageSafeFilename(`${'a'.repeat(400)}.png`, FIXED_NOW)
  assert.match(out, ASCII_KEY)
  assert.equal(out, `${'a'.repeat(100)}.png`)
})

test('leaves an already-safe filename untouched', () => {
  assert.equal(toStorageSafeFilename('cover-image.webp', FIXED_NOW), 'cover-image.webp')
})
