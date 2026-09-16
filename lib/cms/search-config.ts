import type { SearchPluginConfig } from '@payloadcms/plugin-search/types'
import { adminOnly, adminRoleOnly } from '../../collections/blogAccess.ts'

/**
 * plugin-search options, shared by payload.config.ts and
 * scripts/reindex-search.ts (the reindex has to sync with the exact same
 * beforeSync/priorities the live hooks use).
 *
 * `contact-inquiries` is deliberately NOT indexed: it is an admin-only lead
 * collection, and copying name/email/company into the search index (whose read
 * the plugin defaults to public) leaked that PII. Only public content types are
 * indexed, and the collection's read access is pinned below so the index is
 * never anonymously readable. After deploying this change, run
 * `scripts/reindex-search.ts` to purge any contact-inquiry rows already synced.
 */
export const searchPluginConfig: SearchPluginConfig = {
  collections: ['blog-posts', 'pages', 'projects'],
  defaultPriorities: { 'blog-posts': 10, pages: 20, projects: 30 },
  searchOverrides: {
    // Every CloudTopia collection runs with locking off; a plugin collection
    // that locks would make Payload create payload_locked_documents tables.
    lockDocuments: false,
    // The plugin defaults the search collection's read to public. Restrict it:
    // the only consumer is the admin command palette (authenticated), and the
    // index can hold unpublished blog/page metadata (the sync gates on Payload
    // `_status`, not the custom `status` publication field). Reindex/mutation
    // stays admin-role only.
    access: {
      read: adminOnly,
      update: adminRoleOnly,
      delete: adminRoleOnly,
    },
    admin: { group: 'Workspace' },
    fields: ({ defaultFields }) => [
      ...defaultFields,
      { name: 'locale', type: 'text', index: true, admin: { readOnly: true } },
      { name: 'status', type: 'text', index: true, admin: { readOnly: true } },
      { name: 'subtitle', type: 'text', admin: { readOnly: true } },
    ],
  },
  beforeSync: ({ originalDoc, searchDoc }) => ({
    ...searchDoc,
    title: originalDoc?.title || originalDoc?.name || originalDoc?.fullName || originalDoc?.email || searchDoc.title,
    locale: originalDoc?.locale ?? null,
    status: originalDoc?.status ?? null,
    subtitle: originalDoc?.slug || originalDoc?.email || originalDoc?.company || null,
  }),
}
