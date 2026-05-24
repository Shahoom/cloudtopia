import Link from 'next/link'
import type { CSSProperties } from 'react'
import {
  Brush,
  Bot,
  FileText,
  FolderKanban,
  Globe2,
  HelpCircle,
  Image,
  Newspaper,
  Send,
  Tags,
  LayoutDashboard,
  LogOut,
  Users,
} from 'lucide-react'

const navItems = [
  { href: '/admin', label: 'Command', icon: LayoutDashboard },
  { href: '/admin/collections/blog-posts', label: 'Insights', icon: Newspaper },
  { href: '/admin/collections/blog-categories', label: 'Topics', icon: Tags },
  { href: '/admin/collections/authors', label: 'Authors', icon: Users },
  { href: '/admin/collections/newsletter-subscribers', label: 'Subscribers', icon: Send },
  { href: '/admin/collections/blog-ai-generation-logs', label: 'AI Logs', icon: Bot },
  { href: '/admin/collections/pages', label: 'Pages', icon: FileText },
  { href: '/admin/collections/site-design', label: 'Design', icon: Brush },
  { href: '/admin/collections/site-content', label: 'Locales', icon: Globe2 },
  { href: '/admin/collections/projects', label: 'Projects', icon: FolderKanban },
  { href: '/admin/collections/service-faqs', label: 'FAQs', icon: HelpCircle },
  { href: '/admin/collections/media', label: 'Media', icon: Image },
  { href: '/admin/collections/users', label: 'Users', icon: Users },
]

export function CloudTopiaAdminNav() {
  return (
    <nav className="ct-admin-nav" style={styles.nav} aria-label="CloudTopia CMS navigation">
      <style>{chromeStyles}</style>
      <Link className="ct-admin-nav__brand" href="/admin" style={styles.brand} aria-label="CloudTopia CMS dashboard">
        <CloudTopiaMark />
        <span style={styles.brandCopy}>
          <strong style={styles.brandName}>CloudTopia</strong>
          <span style={styles.brandMeta}>CMS Command</span>
        </span>
      </Link>

      <div className="ct-admin-nav__links" style={styles.links}>
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <Link className="ct-admin-nav__link" key={item.href} href={item.href} style={styles.link}>
              <Icon size={16} strokeWidth={2.4} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>

      <div className="ct-admin-nav__actions" style={styles.actions}>
        <Link className="ct-admin-nav__site-link" href="/" style={styles.siteLink}>
          View Site
        </Link>
        <Link className="ct-admin-nav__logout" href="/admin/logout" style={styles.logout} aria-label="Log out">
          <LogOut size={17} strokeWidth={2.4} />
        </Link>
      </div>
    </nav>
  )
}

export function CloudTopiaLogo() {
  return (
    <span style={styles.logo}>
      <CloudTopiaMark />
      <span>CloudTopia CMS</span>
    </span>
  )
}

export function CloudTopiaIcon() {
  return <CloudTopiaMark />
}

function CloudTopiaMark() {
  return (
    <span style={styles.mark} aria-hidden="true">
      CT
    </span>
  )
}

const styles: Record<string, CSSProperties> = {
  nav: {
    position: 'sticky',
    top: 0,
    zIndex: 60,
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    alignItems: 'stretch',
    width: '100%',
    minHeight: '100vh',
    height: '100vh',
    padding: 14,
    borderRight: '1px solid rgba(216, 184, 110, 0.22)',
    background: 'linear-gradient(180deg, #171411 0%, #242018 60%, #101412 100%)',
    boxShadow: '18px 0 50px rgba(50, 38, 20, 0.14)',
    backdropFilter: 'blur(20px)',
    fontFamily: 'var(--font-cairo), ui-sans-serif, system-ui, sans-serif',
  },
  brand: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    minWidth: 0,
    padding: '8px 7px',
    borderRadius: 8,
    color: '#ffffff',
    textDecoration: 'none',
  },
  brandCopy: {
    display: 'grid',
    gap: 1,
  },
  brandName: {
    fontSize: 15,
    fontWeight: 950,
    letterSpacing: 0,
    lineHeight: 1,
  },
  brandMeta: {
    color: '#d8b86e',
    fontSize: 11,
    fontWeight: 900,
    letterSpacing: 0,
    lineHeight: 1.25,
    textTransform: 'uppercase',
  },
  links: {
    display: 'grid',
    gap: 6,
    minWidth: 0,
    overflowX: 'hidden',
    overflowY: 'auto',
    scrollbarWidth: 'none',
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: 7,
    width: '100%',
    minHeight: 42,
    padding: '0 12px',
    borderRadius: 8,
    color: '#cfc3ad',
    textDecoration: 'none',
    fontSize: 13,
    fontWeight: 900,
    whiteSpace: 'nowrap',
    transition: 'all 0.2s ease',
  },
  actions: {
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'stretch',
    gap: 8,
    marginTop: 'auto',
  },
  siteLink: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: 42,
    padding: '0 14px',
    borderRadius: 8,
    background: '#d8b86e',
    color: '#171411',
    textDecoration: 'none',
    fontSize: 13,
    fontWeight: 950,
    whiteSpace: 'nowrap',
    boxShadow: '0 16px 32px rgba(216, 184, 110, 0.18)',
    transition: 'all 0.2s ease',
  },
  logout: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 42,
    borderRadius: 8,
    border: '1px solid rgba(255, 248, 234, 0.14)',
    background: 'rgba(255, 248, 234, 0.06)',
    color: '#fff8ea',
    textDecoration: 'none',
    transition: 'all 0.2s ease',
  },
  logo: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    color: '#fff8ea',
    fontWeight: 950,
    fontFamily: 'var(--font-cairo), ui-sans-serif, system-ui, sans-serif',
  },
  mark: {
    flex: '0 0 auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 38,
    height: 38,
    borderRadius: 8,
    background: '#fff8ea',
    color: '#171411',
    boxShadow: 'inset 0 0 0 1px rgba(216, 184, 110, 0.35), 0 12px 28px rgba(216, 184, 110, 0.12)',
    fontSize: 12,
    fontWeight: 950,
    letterSpacing: 0,
  },
}

const chromeStyles = `
  nav[aria-label="CloudTopia CMS navigation"],
  nav[aria-label="CloudTopia CMS navigation"] * {
    box-sizing: border-box;
  }

  .template-default__nav-toggler-wrapper,
  .template-default__nav-toggler-container,
  .template-default__nav-toggler,
  .app-header {
    display: none !important;
  }

  .template-default {
    min-height: 100vh !important;
    display: grid !important;
    grid-template-columns: minmax(236px, 275px) minmax(0, 1fr) !important;
    background: #f6f1e8 !important;
    color: #1b1712 !important;
  }

  .template-default > nav[aria-label="CloudTopia CMS navigation"] {
    width: 100% !important;
    min-width: 0 !important;
  }

  .template-default__wrap {
    width: 100% !important;
    max-width: none !important;
    min-width: 0 !important;
  }

  .template-default main,
  .template-default .gutter {
    background: transparent !important;
  }

  .template-default .doc-header,
  .template-default .collection-list__wrap,
  .template-default .render-fields,
  .template-default .form-submit,
  .template-default .list-controls,
  .template-default .before-list,
  .template-default .after-list {
    border-radius: 12px !important;
  }

  .template-default .doc-header,
  .template-default .collection-list__wrap,
  .template-default .render-fields {
    border: 1px solid rgba(54, 45, 33, 0.1) !important;
    background: #fffaf1 !important;
    box-shadow: 0 22px 60px rgba(50, 38, 20, 0.08) !important;
  }

  .template-default .doc-header {
    margin-bottom: 14px !important;
    padding: 16px 20px !important;
  }

  .template-default .render-fields {
    padding: clamp(16px, 3vw, 28px) !important;
  }

  .template-default label,
  .template-default .field-label {
    color: #9b7337 !important;
    font-weight: 900 !important;
    letter-spacing: 0.02em !important;
    text-transform: uppercase !important;
    font-size: 11px !important;
  }

  .template-default input,
  .template-default textarea,
  .template-default select {
    border-radius: 8px !important;
    border-color: rgba(54, 45, 33, 0.16) !important;
    background: #fffdf8 !important;
    color: #1b1712 !important;
  }

  .template-default input:focus,
  .template-default textarea:focus,
  .template-default select:focus {
    border-color: #d8b86e !important;
    outline: 3px solid rgba(216, 184, 110, 0.24) !important;
  }

  .template-default .btn,
  .template-default button {
    border-radius: 8px !important;
    font-weight: 900 !important;
  }

  .template-default .btn--style-primary {
    background: #1b1712 !important;
    border: none !important;
    color: #fff8ea !important;
    box-shadow: 0 16px 34px rgba(50, 38, 20, 0.14) !important;
  }

  .template-default .tabs-field__tabs,
  .template-default .collapsible__toggle-wrap {
    border-radius: 8px !important;
    background: #f8f1e4 !important;
    border: 1px solid rgba(54, 45, 33, 0.08) !important;
  }

  nav[aria-label="CloudTopia CMS navigation"] a:hover {
    background: rgba(216, 184, 110, 0.1) !important;
    color: #d8b86e !important;
  }

  @media (max-width: 760px) {
    .template-default {
      display: block !important;
    }

    nav[aria-label="CloudTopia CMS navigation"] {
      position: relative !important;
      min-height: auto !important;
      height: auto !important;
      border-right: 0 !important;
      border-bottom: 1px solid rgba(216, 184, 110, 0.22) !important;
    }

    nav[aria-label="CloudTopia CMS navigation"] > div {
      grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
    }
  }

  @media (max-width: 640px) {
    nav[aria-label="CloudTopia CMS navigation"] {
      min-height: auto !important;
    }
  }
`
