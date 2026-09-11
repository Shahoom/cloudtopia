import type { Access, CollectionConfig } from 'payload'

/**
 * Role-gated user management. Every other collection grants full CRUD to any
 * authenticated user (fine for content), but user management itself must be
 * admin-only — otherwise one phished editor account could create or delete
 * admins and take over the CMS with no blast-radius containment.
 *
 * Existing accounts default to `admin` (single-team history); create new
 * day-to-day accounts as `editor`.
 */

const isAdmin: Access = ({ req }) => req.user?.role === 'admin'

const isAdminOrSelf: Access = ({ req, id }) => {
  if (req.user?.role === 'admin') return true
  return Boolean(req.user && id && String(req.user.id) === String(id))
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
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
        update: ({ req }) => req.user?.role === 'admin',
      },
    },
  ],
}
