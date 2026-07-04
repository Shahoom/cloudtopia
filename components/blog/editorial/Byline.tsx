type Author = { name?: string | null; slug?: string | null } | null | undefined

function initials(name?: string | null): string {
  if (!name) return 'CT'
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map((p) => p[0]?.toUpperCase() || '').join('') || 'CT'
}

// Byline row: initials avatar + "{byLabel} {name} · date · reading time · views".
// All labels are passed pre-localized by the caller. `bordered` wraps it in the
// hairline rules used on the article hero.
export function Byline({
  author,
  byLabel,
  dateLabel,
  readingTimeLabel,
  viewsLabel,
  bordered = false,
  className = '',
}: {
  author?: Author
  byLabel?: string
  dateLabel?: string
  readingTimeLabel?: string
  viewsLabel?: string
  bordered?: boolean
  className?: string
}) {
  const name = author?.name || 'CloudTopia Editorial'
  const segments = [dateLabel, readingTimeLabel, viewsLabel].filter(Boolean) as string[]
  const borderedStyle = bordered
    ? { borderTop: '1px solid var(--ed-rule)', borderBottom: '1px solid var(--ed-rule)', padding: '10px 0' }
    : undefined

  return (
    <div className={`flex items-center gap-2.5 ${className}`} style={borderedStyle}>
      <span className="ed-avatar">{initials(author?.name)}</span>
      <span className="ed-meta" style={{ color: 'var(--ed-graphite)' }}>
        {byLabel ? `${byLabel} ` : ''}
        {name}
        {segments.length > 0 ? `  ·  ${segments.join('  ·  ')}` : ''}
      </span>
    </div>
  )
}
