import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'
import test from 'node:test'

const source = (file: string) => readFileSync(file, 'utf8')

test('website hero uses optimized images and defers rotating LCP text', () => {
  const page = source('app/(frontend)/[locale]/services/website-development/WebsiteDesignClient.tsx')
  assert.match(page, /import Image from ['"]next\/image['"]/)
  assert.match(page, /motion\.create\(Image\)/)
  assert.doesNotMatch(page, /<motion\.img/)
  assert.match(page, /useDeferredInteraction/)
  assert.match(page, /active=\{enhancementsActive\}/)
})

test('QR hero has a stable optimized first image and no desktop-first state', () => {
  const client = source('app/(frontend)/[locale]/restaurant-qr-menu/RestaurantQRMenuClient.tsx')
  const gallery = source('app/(frontend)/[locale]/restaurant-qr-menu/RestaurantQRHeroGallery.tsx')
  assert.doesNotMatch(client, /useState<boolean>\(false\)/)
  assert.doesNotMatch(client, /<motion\.img/)
  assert.match(gallery, /import Image from ['"]next\/image['"]/)
  assert.match(gallery, /useDeferredInteraction/)
  assert.match(gallery, /matchMedia\(['"]\(max-width: 767px\)['"]\)/)
  assert.match(gallery, /document\.visibilityState/)
})

test('QR files use the image format declared by their extension', async () => {
  const sharp = (await import('sharp')).default
  for (const file of ['4.avif', '5.avif', '6.avif']) {
    const metadata = await sharp(`public/images/services/restaurant-qr-menu/${file}`).metadata()
    assert.equal(metadata.format, 'heif', file)
  }
})

test('TextRotate does not schedule rotation while inactive', () => {
  const rotate = source('components/ui/text-rotate.tsx')
  assert.match(rotate, /active\?: boolean/)
  assert.match(rotate, /if \(!auto \|\| !active\) return/)
})
