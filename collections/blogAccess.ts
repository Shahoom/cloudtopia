import type { Access, CollectionBeforeOperationHook } from 'payload'

export const adminOnly: Access = ({ req }) => Boolean(req.user)

export const publishedOrAdmin: Access = ({ req }) => {
  if (req.user) return true

  return {
    status: {
      equals: 'published',
    },
  }
}

/**
 * `req.user` is not always a team account: plugin-mcp adds an auth collection
 * of API keys, which carry no role. Only a `users` account with the admin role
 * counts as an admin.
 */
export function isAdminAccount(user: unknown): boolean {
  const account = user as { collection?: string; role?: string } | null | undefined
  return account?.collection === 'users' && account.role === 'admin'
}

/**
 * Admin ROLE only (not merely authenticated). Used by lead/system collections
 * so an `editor` account manages content but never reads leads or site-wide
 * configuration. Existing accounts were backfilled as `admin`.
 */
export const adminRoleOnly: Access = ({ req }) => isAdminAccount(req.user)

/**
 * Anonymous callers must not read draft revisions or trashed documents. Payload
 * honours a client-supplied `?draft=true` / `?trash=true` for any caller, and
 * the custom `status` publication field does not constrain the Payload version
 * `_status`, so a still-`published`-status draft revision (or a trashed row that
 * kept status=published) would otherwise be returned to the public. Force both
 * flags off when there is no authenticated user; authenticated CMS users keep
 * draft preview and trash access. Attach as a `beforeOperation` hook on any
 * collection with drafts/trash enabled (e.g. blog-posts).
 */
export const denyAnonDraftTrash: CollectionBeforeOperationHook = ({ args, operation, req }) => {
  if (!req.user && (operation === 'read' || operation === 'count')) {
    const a = args as { draft?: unknown; trash?: unknown }
    if (a.draft) a.draft = false
    if (a.trash) a.trash = false
  }
  return args
}
