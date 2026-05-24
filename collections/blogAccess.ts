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
