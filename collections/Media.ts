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
    components: {
      views: {
        list: {
          Component: '@/components/payload/FastCollectionLists#FastMediaListView',
        },
      },
    },
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
