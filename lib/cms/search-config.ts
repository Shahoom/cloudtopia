import type { SearchPluginConfig } from '@payloadcms/plugin-search/types'

/**
 * plugin-search options, shared by payload.config.ts and
 * scripts/reindex-search.ts (the reindex has to sync with the exact same
 * beforeSync/priorities the live hooks use).
 */
export const searchPluginConfig: SearchPluginConfig = {
  collections: ['blog-posts', 'pages', 'projects', 'contact-inquiries'],
  defaultPriorities: { 'blog-posts': 10, pages: 20, projects: 30, 'contact-inquiries': 40 },
  searchOverrides: {
    // Every CloudTopia collection runs with locking off; a plugin collection
    // that locks would make Payload create payload_locked_documents tables.
    lockDocuments: false,
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
