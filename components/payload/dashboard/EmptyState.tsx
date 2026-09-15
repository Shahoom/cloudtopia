import { AlertCircle } from 'lucide-react'
import type { ReactNode } from 'react'

/** Intentional empty / failed state for a dashboard card. */
export function EmptyState({ icon, title, hint, error = false }: { icon?: ReactNode; title: string; hint?: string; error?: boolean }) {
  return (
    <div className={`ct-dash-empty${error ? ' is-error' : ''}`} role={error ? 'status' : undefined}>
      {error ? <AlertCircle size={16} strokeWidth={2} aria-hidden="true" /> : icon}
      <div className="ct-dash-empty-title">{title}</div>
      {hint && <div className="ct-dash-empty-hint">{hint}</div>}
    </div>
  )
}
