import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'
import { CloudTopiaNav } from './admin/Nav.tsx'
import { TopBarActions } from './admin/TopBarActions.tsx'

type Crumb = { label: string; href?: string }

// Custom Payload admin views registered with their own `path` (e.g. /admin/articles,
// /admin/seo) are NOT wrapped in Payload's DefaultTemplate, so they render without
// the sidebar or app header. This shell re-creates both with the same classes the
// native screens use, so the global admin theme applies unchanged.
export function AdminViewShell({
  children,
  crumbs = [],
  user,
  visibleEntities,
}: {
  children: ReactNode
  crumbs?: Crumb[]
  user?: { email?: string; name?: string | null; role?: string | null } | null
  visibleEntities?: { collections?: string[]; globals?: string[] }
}) {
  return (
    <div className="template-default">
      <CloudTopiaNav user={user} visibleEntities={visibleEntities} />
      <div className="template-default__wrap" style={{ minWidth: 0 }}>
        <header className="app-header">
          <div className="app-header__content">
            <div className="app-header__wrapper">
              <div className="app-header__controls-wrapper">
                <div className="app-header__step-nav-wrapper">
                  <nav className="ct-shell-crumbs" aria-label="Breadcrumb">
                    <Link href="/admin" prefetch={false}>
                      Dashboard
                    </Link>
                    {crumbs.map((crumb, i) => (
                      <Fragment key={`${crumb.label}-${i}`}>
                        <span className="ct-shell-crumbs__sep" aria-hidden>
                          /
                        </span>
                        {crumb.href && i < crumbs.length - 1 ? (
                          <Link href={crumb.href} prefetch={false}>
                            {crumb.label}
                          </Link>
                        ) : (
                          <span
                            className={i === crumbs.length - 1 ? 'ct-shell-crumbs__current' : undefined}
                            aria-current={i === crumbs.length - 1 ? 'page' : undefined}
                          >
                            {crumb.label}
                          </span>
                        )}
                      </Fragment>
                    ))}
                  </nav>
                </div>
                <div className="app-header__actions-wrapper">
                  <div className="app-header__actions">
                    <TopBarActions />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        {children}
      </div>
    </div>
  )
}
