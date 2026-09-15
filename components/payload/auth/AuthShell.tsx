import { CalendarClock, Cloud, Inbox, KeyRound, Languages, Lock, Sparkles } from 'lucide-react'
import type { ReactNode } from 'react'

// Chrome around Payload's sign-in / first-run forms (design E, mockup screen A).
// Styles live in ./auth.css, imported by AuthViews.tsx.
//
// Deliberately absent from the mockup: the "next scheduled post" preview (this
// page is public — unpublished titles must not leak before sign-in), and the
// "keep me signed in" checkbox / show-password toggle (Payload's form has neither).

function environment(): { tone: 'production' | 'preview' | 'development'; label: string } {
  switch (process.env.VERCEL_ENV) {
    case 'production':
      return { tone: 'production', label: 'Production · cloudtopia.net' }
    case 'preview':
      return { tone: 'preview', label: 'Preview deployment' }
    default:
      return { tone: 'development', label: 'Local development' }
  }
}

const CAPABILITIES: Array<{ Icon: typeof Cloud; title: string; text: string }> = [
  { Icon: Languages, title: 'EN ⇄ AR pairs', text: 'stay linked — missing translations are flagged before you publish.' },
  { Icon: CalendarClock, title: 'Schedule & drip-publish', text: 'articles — the daily publishing run takes them live on time.' },
  { Icon: Inbox, title: 'One leads inbox', text: 'for contact forms, Solution finder, the chatbot, ClinicTopia and Hasm ERP.' },
  { Icon: Sparkles, title: 'SEO scores & AI assists', text: 'for meta, internal links and translation.' },
]

export function AuthShell({ children, title, intro, showSso = false }: { children: ReactNode; title: string; intro?: string; showSso?: boolean }) {
  const env = environment()
  return (
    <div className="ct-auth-shell">
      <aside className="ct-auth-brand" aria-label="About CloudTopia Admin">
        <BrandPattern />
        <div className="ct-auth-logo">
          <span className="ct-auth-logo-mark" aria-hidden="true">
            <Cloud size={16} strokeWidth={2} />
          </span>
          CloudTopia
        </div>
        <div className="ct-auth-hero">
          <p className="ct-auth-headline">One workspace for bilingual content, media and leads.</p>
          <p className="ct-auth-lede">The CloudTopia admin runs cloudtopia.net — every article, page and inquiry, in English and Arabic.</p>
          <ul className="ct-auth-list">
            {CAPABILITIES.map(({ Icon, title: itemTitle, text }) => (
              <li key={itemTitle}>
                <span className="ct-auth-list-icon" aria-hidden="true">
                  <Icon size={12} strokeWidth={2} />
                </span>
                <span>
                  <b>{itemTitle}</b> {text}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="ct-auth-foot">
          <span>cloudtopia.net</span>
          <span>Muscat, Sultanate of Oman</span>
        </div>
      </aside>

      <section className="ct-auth-main" aria-label={title}>
        <div className="ct-auth-card-wrap">
          <div className="ct-auth-card">
            <span className="ct-auth-card-mark" aria-hidden="true">
              <Cloud size={16} strokeWidth={2} />
            </span>
            <h1 className="ct-auth-title">{title}</h1>
            <p className="ct-auth-env">
              <span className={`ct-auth-env-dot is-${env.tone}`} aria-hidden="true" />
              {env.label}
            </p>
            {intro && <p className="ct-auth-intro">{intro}</p>}

            <div className="ct-auth-form">{children}</div>

            {showSso && (
              <>
                <div className="ct-auth-divider" aria-hidden="true">
                  or
                </div>
                <button type="button" className="ct-auth-sso" disabled>
                  <KeyRound size={15} strokeWidth={2} aria-hidden="true" />
                  Continue with SSO
                  <span className="ct-auth-soon">Coming soon</span>
                </button>
              </>
            )}

            <p className="ct-auth-footnote">
              <Lock size={14} strokeWidth={2} aria-hidden="true" />
              Access is limited to CloudTopia team members.
            </p>
          </div>
          <div className="ct-auth-meta">
            <span>Payload CMS</span>
            <a href="/en/privacy">Privacy</a>
          </div>
        </div>
      </section>
    </div>
  )
}

function BrandPattern() {
  return (
    <svg className="ct-auth-pattern" viewBox="0 0 800 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <defs>
        <pattern id="ct-auth-dots" width="28" height="28" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1.1" fill="#fff" fillOpacity=".18" />
        </pattern>
        <linearGradient id="ct-auth-fade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity=".9" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <mask id="ct-auth-mask">
          <rect width="800" height="900" fill="url(#ct-auth-fade)" />
        </mask>
      </defs>
      <rect width="800" height="900" fill="url(#ct-auth-dots)" mask="url(#ct-auth-mask)" />
      <g fill="none" stroke="#fff" strokeOpacity=".14">
        <circle cx="690" cy="120" r="120" />
        <circle cx="690" cy="120" r="200" />
        <circle cx="690" cy="120" r="290" />
        <circle cx="690" cy="120" r="390" />
      </g>
      <g fill="none" stroke="#c7d2fe" strokeOpacity=".22">
        <rect x="560" y="-10" width="140" height="140" rx="22" transform="rotate(45 630 60)" />
        <rect x="610" y="40" width="40" height="40" rx="8" transform="rotate(45 630 60)" fill="#fff" fillOpacity=".08" />
      </g>
      <path d="M0 780 L260 640 L420 720 L800 520" stroke="#a5b4fc" strokeOpacity=".3" fill="none" strokeWidth="1.5" />
      <circle cx="260" cy="640" r="4" fill="#fff" fillOpacity=".6" />
      <circle cx="420" cy="720" r="4" fill="#fff" fillOpacity=".6" />
    </svg>
  )
}
