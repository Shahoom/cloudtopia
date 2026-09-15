import type { AdminViewServerProps } from 'payload'
import { AdminViewShell } from './AdminViewShell.tsx'
import { ArticlesWorkspace } from './articles/ArticlesWorkspace.tsx'

// Registered as the `/admin/articles` custom view. Wrapped in AdminViewShell so
// the sidebar and top bar render (custom-path views don't get Payload's template).
export function ArticlesWorkspaceView(props: AdminViewServerProps) {
  const { req, visibleEntities } = props.initPageResult
  return (
    <AdminViewShell crumbs={[{ label: 'Content' }, { label: 'Articles' }]} user={req.user as any} visibleEntities={visibleEntities}>
      <ArticlesWorkspace />
    </AdminViewShell>
  )
}
