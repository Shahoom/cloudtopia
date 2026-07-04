// Editorial pull quote — serif italic on a thin accent rule. Shares .ed-pullquote
// with the prose blockquote so both read identically.
export function PullQuote({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <blockquote className={`ed-pullquote ${className}`}>{children}</blockquote>
}
