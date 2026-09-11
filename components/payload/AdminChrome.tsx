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
  Library,
  LayoutDashboard,
  LogOut,
  Mail,
  Newspaper,
  Search,
  Send,
  Tags,
  Users,
} from 'lucide-react'


type NavLink = { href: string; label: string; icon: typeof LayoutDashboard }
type NavGroup = { title: string; items: NavLink[] }

const navGroups: NavGroup[] = [
  {
    title: 'Cockpit',
    items: [{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard }],
  },
  {
    title: 'Blog',
    items: [
      { href: '/admin/articles', label: 'Articles', icon: Newspaper },
      { href: '/admin/collections/authors', label: 'Authors', icon: Users },
      { href: '/admin/collections/blog-categories', label: 'Categories', icon: Tags },
      { href: '/admin/collections/blog-tags', label: 'Tags', icon: Tags },
      { href: '/admin/collections/blog-series', label: 'Series', icon: Library },
    ],
  },
  {
    title: 'Content',
    items: [
      { href: '/admin/collections/pages', label: 'Pages', icon: FileText },
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
      { href: '/admin/collections/clinictopia-leads', label: 'ClinicTopia leads', icon: Send },
      { href: '/admin/collections/hasm-erp-leads', label: 'Hasm ERP leads', icon: Send },
      { href: '/admin/collections/newsletter-subscribers', label: 'Newsletter', icon: Inbox },
    ],
  },
  {
    title: 'AI & Activity',
    items: [
      { href: '/admin/collections/ai-chat-conversations', label: 'Chatbot conversations', icon: Bot },
      { href: '/admin/collections/blog-ai-generation-logs', label: 'Editor AI log', icon: Bot },
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
        {/* prefetch={false}: Next prefetches every in-viewport Link, so the
            default would fetch /admin/logout on every admin page load (visible
            as a GET /admin/logout in the runtime logs right after each login). */}
        <Link className="ct-admin-nav__logout" href="/admin/logout" prefetch={false} style={styles.logout} aria-label="Log out">
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

// Soft-premium palette shared with the command center.
const INK = '#37352f'
const INK_SOFT = '#57534e'
const INK_FAINT = '#a8a29e'

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
    padding: '16px 12px',
    borderRight: '1px solid rgba(55, 53, 47, 0.09)',
    background: '#f4f2ec',
    fontFamily: 'var(--font-cairo), ui-sans-serif, system-ui, sans-serif',
  },
  brand: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    width: '100%',
    minWidth: 0,
    padding: '6px 8px',
    borderRadius: 10,
    color: INK,
    textDecoration: 'none',
  },
  brandCopy: {
    display: 'grid',
    gap: 1,
  },
  brandName: {
    fontSize: 15,
    fontWeight: 700,
    letterSpacing: '-0.01em',
    lineHeight: 1.1,
    color: INK,
  },
  brandMeta: {
    color: INK_FAINT,
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: '0.02em',
    lineHeight: 1.2,
  },
  links: {
    display: 'grid',
    gap: 1,
    minWidth: 0,
    overflowX: 'hidden',
    overflowY: 'auto',
    scrollbarWidth: 'none',
  },
  group: {
    marginBottom: 14,
  },
  groupTitle: {
    margin: '0 0 4px 10px',
    fontSize: 10,
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: INK_FAINT,
  },
  link: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 9,
    width: '100%',
    minHeight: 32,
    padding: '0 10px',
    borderRadius: 8,
    color: INK_SOFT,
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
    borderRadius: 10,
    background: '#1a1a1a',
    border: '1px solid #1a1a1a',
    color: '#ffffff',
    textDecoration: 'none',
    fontSize: 13,
    fontWeight: 500,
    whiteSpace: 'nowrap',
    boxShadow: '0 2px 8px rgba(15, 15, 15, 0.18)',
    transition: 'opacity 0.15s ease',
  },
  logout: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 36,
    borderRadius: 10,
    border: '1px solid rgba(55, 53, 47, 0.12)',
    background: '#ffffff',
    color: INK_SOFT,
    textDecoration: 'none',
    boxShadow: '0 1px 2px rgba(15, 15, 15, 0.04)',
    transition: 'background 0.15s ease',
  },
  logo: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    color: INK,
    fontWeight: 700,
    fontFamily: 'var(--font-cairo), ui-sans-serif, system-ui, sans-serif',
  },
  mark: {
    flex: '0 0 auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 9,
    background: '#1a1a1a',
    color: '#f4f2ec',
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: '0.02em',
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
    background: #faf9f6 !important;
  }

  .template-default {
    background: #faf9f6 !important;
  }

  .ct-admin-nav__link:hover {
    background: rgba(55, 53, 47, 0.07) !important;
    color: #1f1f1f !important;
  }

  .ct-admin-nav__site-link:hover {
    opacity: 0.88 !important;
  }

  .ct-admin-nav__logout:hover {
    background: #f1efe9 !important;
    color: #1f1f1f !important;
  }

  .template-default input:focus,
  .template-default textarea:focus,
  .template-default select:focus {
    outline: 3px solid rgba(13, 148, 136, 0.2) !important;
  }

  .template-default .btn--style-primary {
    background: #1a1a1a !important;
    border-color: #1a1a1a !important;
    color: #ffffff !important;
    border-radius: 10px !important;
  }

  .template-default .table {
    background: #ffffff;
    border-radius: 14px;
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
