import type { CollectionBeforeOperationHook, CollectionConfig } from 'payload'
import { adminOnly } from './blogAccess.ts'

/**
 * Supabase Storage's S3 API rejects any object key containing non-ASCII bytes:
 *
 *   S3ServiceException InvalidKey (400)
 *   "Invalid key: لوحات تحكم إدارية تغنيك عن جداول البيانات"
 *
 * Cover images get named after the article, and Arabic articles have Arabic
 * titles — so uploading one failed with a bare "Something went wrong" in the
 * CMS while the real cause sat in the server logs. Local dev never caught it:
 * the disk adapter happily writes Arabic filenames, only S3 refuses them.
 *
 * Fold the filename down to the ASCII subset S3 accepts, keeping whatever
 * Latin characters, digits and separators are already there. A name that is
 * entirely non-Latin leaves nothing behind, so fall back to a timestamp rather
 * than emitting a bare extension. Payload still de-duplicates collisions.
 */
const SAFE_KEY = /[^A-Za-z0-9._-]+/g
const MAX_BASE_LENGTH = 100

export function toStorageSafeFilename(original: string, now: number = Date.now()): string {
  const lastDot = original.lastIndexOf('.')
  const hasExtension = lastDot > 0 && lastDot < original.length - 1
  const rawBase = hasExtension ? original.slice(0, lastDot) : original
  const rawExtension = hasExtension ? original.slice(lastDot + 1) : ''

  const fold = (value: string) =>
    value
      // Decompose accents (café → cafe) before dropping the combining marks,
      // so Latin-with-diacritics survives instead of turning into dashes.
      .normalize('NFKD')
      .replace(/[̀-ͯ]/g, '')
      .replace(SAFE_KEY, '-')
      .replace(/-{2,}/g, '-')
      .replace(/^[-.]+|[-.]+$/g, '')

  const base = fold(rawBase).slice(0, MAX_BASE_LENGTH) || `upload-${now}`
  const extension = fold(rawExtension).toLowerCase()

  return extension ? `${base}.${extension}` : base
}

const useStorageSafeFilename: CollectionBeforeOperationHook = ({ args, req }) => {
  const file = req?.file
  if (file?.name) {
    const safe = toStorageSafeFilename(file.name)
    if (safe !== file.name) file.name = safe
  }
  return args
}

export const Media: CollectionConfig = {
  slug: 'media',
  lockDocuments: false,
  access: {
    // Media files are served at public URLs, so read must be public.
    read: () => true,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  hooks: {
    beforeOperation: [useStorageSafeFilename],
  },
  upload: {
    // Local fallback for dev/CI. In production, the s3Storage plugin in
    // payload.config.ts (gated on S3_* env vars) takes over and stores files in
    // Supabase Storage instead — Vercel's filesystem is read-only at runtime.
    staticDir: 'public/uploads',
    mimeTypes: ['image/*', 'application/pdf'],
  },
  admin: {
    group: 'Content',
    useAsTitle: 'alt',
    // NOTE: do NOT override the list view with a custom component here. Media is
    // an upload/relationship target (article coverImage, seo.ogImage, etc.), and
    // the "Choose from existing" drawer reuses this collection's List view to
    // SELECT an item. A custom static list renders rows you can't pick, so the
    // picker shows a list but selection does nothing. The default list is
    // interactive and selectable in drawers.
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}
