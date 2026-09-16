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
