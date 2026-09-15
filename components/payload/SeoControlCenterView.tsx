import type { AdminViewServerProps } from 'payload'
import { AdminViewShell } from './AdminViewShell.tsx'
import { SeoControlCenter } from './seo/SeoControlCenter.tsx'

// Registered as the `/admin/seo` custom view. Wrapped in AdminViewShell so the
// sidebar and top bar render (custom-path views don't get Payload's template).
export function SeoControlCenterView(props: AdminViewServerProps) {
  const { req, visibleEntities } = props.initPageResult
  return (
    <AdminViewShell crumbs={[{ label: 'Workspace' }, { label: 'SEO center' }]} user={req.user as any} visibleEntities={visibleEntities}>
      <SeoControlCenter />
    </AdminViewShell>
  )
}
