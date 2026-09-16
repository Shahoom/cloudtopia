import type { Access, CollectionConfig } from 'payload'
import { isAdminAccount } from './blogAccess.ts'

/**
 * Role-gated user management. Every other collection grants full CRUD to any
 * authenticated user (fine for content), but user management itself must be
 * admin-only — otherwise one phished editor account could create or delete
 * admins and take over the CMS with no blast-radius containment.
 *
 * Existing accounts default to `admin` (single-team history); create new
 * day-to-day accounts as `editor`.
 */

const isAdmin: Access = ({ req }) => isAdminAccount(req.user)

const isAdminOrSelf: Access = ({ req, id }) => {
  if (isAdminAccount(req.user)) return true
  // An MCP API key's numeric id can collide with a user id; "self" only means
  // a signed-in team account reading its own record.
  return Boolean(req.user?.collection === 'users' && id && String(req.user.id) === String(id))
}

export const Users: CollectionConfig = {
  slug: 'users',
  // Send the session cookie with Secure in production so it is never
  // transmitted over plaintext HTTP (Payload's default is secure:false).
  // Gated on NODE_ENV so local http dev still receives the cookie.
  auth: {
    cookies: { secure: process.env.NODE_ENV === 'production' },
  },
  lockDocuments: false,
  access: {
    read: isAdminOrSelf,
    create: isAdmin,
    update: isAdminOrSelf,
    delete: isAdmin,
    unlock: isAdmin,
  },
  admin: {
    group: 'System',
    useAsTitle: 'email',
  },
  hooks: {
    // Flag when a password is being set so the afterChange hook can react.
    beforeChange: [
      ({ data, operation, req }) => {
        if (operation === 'update' && typeof data?.password === 'string' && data.password.length > 0) {
          req.context = req.context || {}
          ;(req.context as Record<string, unknown>).ctPasswordChanged = true
        }
        return data
      },
    ],
    // When an admin resets ANOTHER user's password (the compromise-recovery
    // path), revoke that user's server-side sessions so a stolen/old token
    // stops working. A self password change keeps the current session (no
    // forced logout). The nested update carries no password, so it does not
    // re-trigger this hook, and the ctSkipSessionClear guard is belt-and-braces.
    afterChange: [
      async ({ doc, operation, req }) => {
        const ctx = (req.context as Record<string, unknown>) || {}
        if (operation === 'update' && ctx.ctPasswordChanged && !ctx.ctSkipSessionClear) {
          const actorId = req.user && req.user.collection === 'users' ? String(req.user.id) : null
          if (actorId && actorId !== String(doc.id)) {
            await req.payload.update({
              collection: 'users',
              id: doc.id,
              data: { sessions: [] },
              overrideAccess: true,
              context: { ctSkipSessionClear: true },
            })
          }
        }
        return doc
      },
    ],
  },
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'admin',
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        // Only admins may change roles — an editor must not promote itself.
        update: ({ req }) => isAdminAccount(req.user),
      },
    },
  ],
}
