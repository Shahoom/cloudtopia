import { AdminViewShell } from './AdminViewShell.tsx'
import { SeoControlCenter } from './seo/SeoControlCenter.tsx'

// Registered as the `/admin/seo` custom view. Wrapped in AdminViewShell so the
// sidebar renders (custom-path views don't get Payload's template).
export function SeoControlCenterView() {
  return (
    <AdminViewShell>
      <SeoControlCenter />
    </AdminViewShell>
  )
}
