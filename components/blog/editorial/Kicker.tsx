import Link from 'next/link'

// Small-caps, letterspaced eyebrow label. Colored with the global accent by
// default; pass `color` to use a category accent. Becomes a link when `href` set.
export function Kicker({
  children,
  color,
  href,
  className = '',
}: {
  children: React.ReactNode
  color?: string
  href?: string
  className?: string
}) {
  const style = color ? { color } : undefined
  if (href) {
    return (
      <Link href={href} className={`ed-kicker ${className}`} style={style}>
        {children}
      </Link>
    )
  }
  return (
    <span className={`ed-kicker ${className}`} style={style}>
      {children}
    </span>
  )
}
