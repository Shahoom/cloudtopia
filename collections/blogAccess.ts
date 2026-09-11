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
 * Admin ROLE only (not merely authenticated). Used by lead/system collections
 * so an `editor` account manages content but never reads leads or site-wide
 * configuration. Existing accounts were backfilled as `admin`.
 */
export const adminRoleOnly: Access = ({ req }) => req.user?.role === 'admin'
