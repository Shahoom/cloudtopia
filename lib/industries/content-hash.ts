import { createHash } from 'node:crypto'
import type { Locale } from '@/lib/i18n/config'
import { industryManifest } from '@/lib/industries/manifest'
import type { ReviewableIndustryContent } from '@/lib/industries/types'

export function contentHash(
  content: ReviewableIndustryContent,
): `sha256:${string}` {
  return `sha256:${createHash('sha256').update(JSON.stringify(content)).digest('hex')}`
}

export function manifestContentHash(
  locale: Locale,
  manifest: typeof industryManifest,
): `sha256:${string}` {
  const localizedPacket = Object.values(manifest).map(
    ({ slug, label, navSummary }) => ({
      slug,
      label: label[locale],
      navSummary: navSummary[locale],
    }),
  )

  return `sha256:${createHash('sha256').update(JSON.stringify(localizedPacket)).digest('hex')}`
}
