// Shared masthead for section pages (category / tag / author / search) and the
// index. Eyebrow + serif title + description + meta, sitting on a 2px ink rule.
export function SectionMasthead({
  eyebrow,
  title,
  description,
  metaLabel,
  as = 'h1',
  align = 'start',
  children,
  className = '',
}: {
  eyebrow?: string
  title: string
  description?: string
  metaLabel?: string
  as?: 'h1' | 'h2'
  align?: 'start' | 'center'
  children?: React.ReactNode
  className?: string
}) {
  const Heading = as
  return (
    <header
      className={className}
      style={{
        borderBottom: '2px solid var(--ed-rule-ink)',
        paddingBottom: '0.85rem',
        textAlign: align === 'center' ? 'center' : undefined,
      }}
    >
      {eyebrow && (
        <div className="ed-eyebrow" style={{ marginBottom: 6 }}>
          {eyebrow}
        </div>
      )}
      <Heading
        className="ed-serif"
        style={{ fontSize: 'clamp(1.9rem, 4vw, 2.6rem)', lineHeight: 1.12, margin: '0 0 0.5rem' }}
      >
        {title}
      </Heading>
      {description && (
        <p
          style={{
            fontFamily: 'var(--ed-sans)',
            color: 'var(--ed-graphite)',
            fontSize: '0.95rem',
            lineHeight: 1.55,
            maxWidth: '46rem',
            margin: align === 'center' ? '0 auto 0.6rem' : '0 0 0.6rem',
          }}
        >
          {description}
        </p>
      )}
      {metaLabel && <div className="ed-meta">{metaLabel}</div>}
      {children}
    </header>
  )
}
