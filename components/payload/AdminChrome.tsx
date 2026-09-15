import type { CSSProperties } from 'react'

// Payload `admin.components.graphics` (login screen, loading states, favicon
// slot). The sidebar itself lives in components/payload/admin/Nav.tsx.

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
  logo: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 10,
    color: '#111827',
    fontWeight: 650,
    fontFamily: 'var(--font-inter), var(--font-plex-arabic), ui-sans-serif, system-ui, sans-serif',
  },
  mark: {
    flex: '0 0 auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 28,
    height: 28,
    borderRadius: 8,
    background: 'linear-gradient(140deg, #6366f1 0%, #4f46e5 50%, #7c3aed 100%)',
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 800,
    letterSpacing: '0.02em',
  },
}
