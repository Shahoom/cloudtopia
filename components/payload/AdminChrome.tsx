import Link from 'next/link'
import type { CSSProperties } from 'react'
import {
  Bot,
  Brush,
  FileText,
  FolderKanban,
  Globe2,
  HelpCircle,
  Image,
  Inbox,
  LayoutDashboard,
  LogOut,
  Mail,
  Newspaper,
  Search,
  Send,
  Tags,
  Users,
} from 'lucide-react'

const CYAN = '#0ea5e9'

type NavLink = { href: string; label: string; icon: typeof LayoutDashboard }
type NavGroup = { title: string; items: NavLink[] }

const navGroups: NavGroup[] = [
  {
    title: 'Cockpit',
    items: [{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    title: 'Content',
    items: [
      { href: '/admin/articles', label: 'Articles', icon: Newspaper },
      { href: '/admin/collections/pages', label: 'Pages', icon: FileText },
      { href: '/admin/collections/authors', label: 'Authors', icon: Users },
      { href: '/admin/collections/blog-categories', label: 'Categories', icon: Tags },
      { href: '/admin/collections/blog-tags', label: 'Tags', icon: Tags },
      { href: '/admin/collections/projects', label: 'Projects', icon: FolderKanban },
      { href: '/admin/collections/service-faqs', label: 'Service FAQs', icon: HelpCircle },
      { href: '/admin/collections/media', label: 'Media', icon: Image },
    ],
  },
  {
    title: 'CRM / Inbox',
    items: [
      { href: '/admin/collections/solution-finder-leads', label: 'Solution finder', icon: Send },
      { href: '/admin/collections/ai-chat-leads', label: 'Chatbot leads', icon: Send },
      { href: '/admin/collections/contact-inquiries', label: 'Contact inquiries', icon: Mail },
      { href: '/admin/collections/newsletter-subscribers', label: 'Newsletter', icon: Inbox },
    ],
  },
  {
    title: 'AI & Activity',
    items: [
      { href: '/admin/collections/ai-chat-conversations', label: 'Conversations', icon: Bot },
      { href: '/admin/collections/blog-ai-generation-logs', label: 'AI logs', icon: Bot },
    ],
  },
  {
    title: 'Settings',
    items: [
      { href: '/admin/seo', label: 'SEO control center', icon: Search },
      { href: '/admin/collections/site-content', label: 'Locales / dictionary', icon: Globe2 },
      { href: '/admin/collections/site-design', label: 'Design', icon: Brush },
      { href: '/admin/collections/users', label: 'Users', icon: Users },
    ],
  },
]

export function CloudTopiaAdminNav() {
  return (
    <nav className="ct-admin-nav" style={styles.nav} aria-label="CloudTopia CMS navigation">
      <style>{chromeStyles}</style>
      <Link className="ct-admin-nav__brand" href="/admin" style={styles.brand} aria-label="CloudTopia CMS dashboard">
        <CloudTopiaMark />
        <span style={styles.brandCopy}>
          <strong style={styles.brandName}>CloudTopia</strong>
          <span style={styles.brandMeta}>Control center</span>
        </span>
      </Link>

      <div className="ct-admin-nav__links" style={styles.links}>
        {navGroups.map((group) => (
          <div key={group.title} className="ct-admin-nav__group" style={styles.group}>
            <p className="ct-admin-nav__group-title" style={styles.groupTitle}>
              {group.title}
            </p>
            {group.items.map((item) => {
              const Icon = item.icon
              return (
                <Link className="ct-admin-nav__link" key={item.href} href={item.href} style={styles.link}>
                  <Icon size={16} strokeWidth={2} />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </div>
        ))}
      </div>

      <div className="ct-admin-nav__actions" style={styles.actions}>
        <Link className="ct-admin-nav__site-link" href="/" style={styles.siteLink}>
          View site
        </Link>
        <Link className="ct-admin-nav__logout" href="/admin/logout" style={styles.logout} aria-label="Log out">
          <LogOut size={17} strokeWidth={2} />
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
    gap: 14,
    alignItems: 'stretch',
    width: '100%',
    minHeight: '100vh',
    height: '100vh',
    padding: 14,
    borderRight: '1px solid var(--theme-elevation-150)',
    background: 'var(--theme-elevation-0)',
    fontFamily: 'var(--font-cairo), ui-sans-serif, system-ui, sans-serif',
  },
  brand: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    minWidth: 0,
    padding: '6px 6px',
    borderRadius: 10,
    color: 'var(--theme-text)',
    textDecoration: 'none',
  },
  brandCopy: {
    display: 'grid',
    gap: 1,
  },
  brandName: {
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: 0,
    lineHeight: 1.1,
  },
  brandMeta: {
    color: CYAN,
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.02em',
    lineHeight: 1.2,
  },
  links: {
    display: 'grid',
    gap: 2,
    minWidth: 0,
    overflowX: 'hidden',
    overflowY: 'auto',
    scrollbarWidth: 'none',
  },
  group: {
    marginBottom: 10,
  },
  groupTitle: {
    margin: '0 0 4px 10px',
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: '0.04em',
    color: 'var(--theme-elevation-400)',
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 9,
    width: '100%',
    minHeight: 36,
    padding: '0 10px',
    borderRadius: 8,
    color: 'var(--theme-elevation-700)',
    textDecoration: 'none',
    fontSize: 13,
    fontWeight: 500,
    whiteSpace: 'nowrap',
    transition: 'background 0.15s ease, color 0.15s ease',
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
    minHeight: 38,
    padding: '0 14px',
    borderRadius: 8,
    background: CYAN,
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: 13,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    transition: 'opacity 0.15s ease',
  },
  logout: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 38,
    borderRadius: 8,
    border: '1px solid var(--theme-elevation-150)',
    background: 'var(--theme-elevation-50)',
    color: 'var(--theme-elevation-700)',
    textDecoration: 'none',
    transition: 'background 0.15s ease',
  },
  logo: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    color: 'var(--theme-text)',
    fontWeight: 700,
    fontFamily: 'var(--font-cairo), ui-sans-serif, system-ui, sans-serif',
  },
  mark: {
    flex: '0 0 auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 36,
    height: 36,
    borderRadius: 9,
    background: CYAN,
    color: '#ffffff',
    fontSize: 13,
    fontWeight: 700,
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
    grid-template-columns: minmax(232px, 264px) minmax(0, 1fr) !important;
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

  .ct-admin-nav__link:hover {
    background: rgba(14, 165, 233, 0.12) !important;
    color: ${CYAN} !important;
  }

  .ct-admin-nav__site-link:hover {
    opacity: 0.92 !important;
  }

  .ct-admin-nav__logout:hover {
    background: var(--theme-elevation-100) !important;
  }

  .template-default input:focus,
  .template-default textarea:focus,
  .template-default select:focus {
    outline: 3px solid rgba(14, 165, 233, 0.22) !important;
  }

  .template-default .btn--style-primary {
    background: ${CYAN} !important;
    border-color: ${CYAN} !important;
    color: #ffffff !important;
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
      border-bottom: 1px solid var(--theme-elevation-150) !important;
    }
  }
`
