// Normalizes mislabeled restaurant QR assets in place: files with an .avif
// extension whose payload is actually WebP/PNG/JPEG are re-encoded as real
// AVIF without changing their public URLs. Only the allowlisted paths below
// may ever be touched.
import { rename } from 'node:fs/promises'
import sharp from 'sharp'

const ALLOWLIST = [
  'public/images/services/restaurant-qr-menu/4.avif',
  'public/images/services/restaurant-qr-menu/5.avif',
  'public/images/services/restaurant-qr-menu/6.avif',
]

const checkOnly = process.argv.includes('--check')

for (const target of ALLOWLIST) {
  if (!ALLOWLIST.includes(target)) throw new Error(`path not allowlisted: ${target}`)
  const metadata = await sharp(target).metadata()
  if (metadata.format === 'heif') {
    console.log(`${target}: already AVIF (${metadata.width}x${metadata.height})`)
    continue
  }
  if (checkOnly) {
    console.error(`${target}: payload is ${metadata.format}, expected AVIF`)
    process.exitCode = 1
    continue
  }
  const tmp = `${target}.tmp-normalize`
  await sharp(target).avif({ quality: 60 }).toFile(tmp)
  await rename(tmp, target)
  const after = await sharp(target).metadata()
  console.log(`${target}: ${metadata.format} -> ${after.format} (${after.width}x${after.height})`)
}
