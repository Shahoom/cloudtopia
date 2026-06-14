import type { ReactNode } from 'react'
import { CloudTopiaAdminNav } from './AdminChrome.tsx'

// Custom Payload admin views registered with their own `path` (e.g. /admin/articles,
// /admin/seo) are NOT wrapped in Payload's DefaultTemplate, so they render without
// the sidebar. This shell re-creates the same grid + nav the native screens use
// (the chromeStyles in AdminChrome target `.template-default` / `.template-default__wrap`).
export function AdminViewShell({ children }: { children: ReactNode }) {
  return (
    <div className="template-default">
      <CloudTopiaAdminNav />
      <div className="template-default__wrap" style={{ minWidth: 0 }}>
        {children}
      </div>
    </div>
  )
}
