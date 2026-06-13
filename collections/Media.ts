import type { CollectionConfig } from 'payload'
import { adminOnly } from './blogAccess.ts'

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
