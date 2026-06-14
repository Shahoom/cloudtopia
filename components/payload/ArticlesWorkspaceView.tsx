import { AdminViewShell } from './AdminViewShell.tsx'
import { ArticlesWorkspace } from './articles/ArticlesWorkspace.tsx'

// Registered as the `/admin/articles` custom view. Wrapped in AdminViewShell so
// the sidebar renders (custom-path views don't get Payload's template).
export function ArticlesWorkspaceView() {
  return (
    <AdminViewShell>
      <ArticlesWorkspace />
    </AdminViewShell>
  )
}
