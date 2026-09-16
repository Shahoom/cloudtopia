import { createHash } from 'node:crypto'
import { APIError, type CollectionBeforeOperationHook, type CollectionConfig } from 'payload'
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

// Byte-identical re-uploads under a new name were how the same photo ended up
// on several articles. Hash the incoming bytes and refuse a file that already
// exists, naming the existing asset so the editor can pick it instead.
//
// This must run in beforeOperation, on the raw upload: by beforeChange Payload
// has already re-encoded the image (resizeOptions), so the hash would describe
// sharp's output — it would never match the CDN originals the library was
// backfilled from, nor a hash computed from the source file.
const rejectDuplicateUpload: CollectionBeforeOperationHook = async ({ args, operation, req }) => {
  if (operation !== 'create' && operation !== 'update') return args
  const bytes = req?.file?.data
  if (!bytes || !bytes.length) return args
  const contentHash = createHash('md5').update(bytes).digest('hex')
  const existing = await req.payload.find({
    collection: 'media',
    where: { contentHash: { equals: contentHash } },
    limit: 1,
    depth: 0,
    overrideAccess: true,
    req,
  })
  const match = existing.docs[0] as { id: number | string; filename?: string } | undefined
  const selfId = operation === 'update' ? (args as { id?: number | string }).id : undefined
  if (match && String(match.id) !== String(selfId)) {
    throw new APIError(
      `This image is already in the media library as "${match.filename}" (id ${match.id}). Choose the existing file instead of uploading it again.`,
      409,
    )
  }
  ;(args as { data?: Record<string, unknown> }).data = { ...((args as { data?: Record<string, unknown> }).data || {}), contentHash }
  return args
}

export const Media: CollectionConfig = {
  slug: 'media',
  lockDocuments: false,
  trash: true,
  access: {
    // Media files are served at public URLs, so read must be public.
    read: () => true,
    create: adminOnly,
    update: adminOnly,
    delete: adminOnly,
  },
  hooks: {
    beforeOperation: [useStorageSafeFilename, rejectDuplicateUpload],
  },
  upload: {
    // Local fallback for dev/CI. In production, the s3Storage plugin in
    // payload.config.ts (gated on S3_* env vars) takes over and stores files in
    // Cloudflare R2 instead — Vercel's filesystem is read-only at runtime.
    staticDir: 'public/uploads',
    // Raster images + PDF only. 'image/*' previously admitted image/svg+xml,
    // which can carry executable script; an <?xml-prefixed SVG also slips past
    // Payload's SVG sanitizer, and the media CDN serves it without a CSP. If a
    // sanitized SVG upload is ever needed, add it back with server-side scrubbing.
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'image/avif', 'application/pdf'],
    focalPoint: true,
    adminThumbnail: 'thumbnail',
    // Originals stay JPEG/PNG (social cards still read them as og:image) but
    // are capped so a 6000px camera export can't ship as a 4MB page asset.
    resizeOptions: { width: 2400, withoutEnlargement: true },
    imageSizes: [
      { name: 'thumbnail', width: 400, withoutEnlargement: true, formatOptions: { format: 'webp', options: { quality: 78 } } },
      { name: 'card', width: 900, withoutEnlargement: true, formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'hero', width: 1800, withoutEnlargement: true, formatOptions: { format: 'webp', options: { quality: 82 } } },
    ],
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
    {
      name: 'contentHash',
      type: 'text',
      index: true,
      admin: {
        readOnly: true,
        position: 'sidebar',
        disableListColumn: true,
        description: 'MD5 of the uploaded bytes — used to block duplicate uploads.',
      },
    },
  ],
}
