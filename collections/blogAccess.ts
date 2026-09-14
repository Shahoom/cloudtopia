import type { Access } from 'payload'

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
