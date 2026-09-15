'use client'

import { useId, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from 'react'

// Conversations vs leads per day, with the previous period as dashed lines.
// Rendered on the server with finished labels; hover / arrow keys reveal a day.

export type ActivityChartProps = {
  /** Tooltip label per day of the current period, e.g. "Tue, Sep 15". */
  labels: string[]
  previousLabels: string[]
  ticks: Array<{ index: number; label: string }>
  conversations: number[]
  leads: number[]
  previousConversations: number[]
  previousLeads: number[]
  rangeLabel: string
}

const W = 700
const H = 196
const AXIS = 34
const CONVERSATIONS = '#4f46e5'
const LEADS = '#10b981'

function niceMax(values: number[]): number {
  const max = Math.max(0, ...values)
  const step = Math.max(1, Math.ceil(max / 3))
  if (step <= 10) return step * 3
  const magnitude = 10 ** Math.floor(Math.log10(step))
  const nice = [1, 1.5, 2, 2.5, 3, 4, 5, 6, 8, 10].map((m) => m * magnitude).find((s) => s >= step) ?? step
  return Math.ceil(nice) * 3
}

export function ActivityChart(props: ActivityChartProps) {
  const { labels, previousLabels, ticks, conversations, leads, previousConversations, previousLeads, rangeLabel } = props
  const n = labels.length
  const box = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const fillId = `ct-dash-activity-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`

  const yMax = niceMax([...conversations, ...leads, ...previousConversations, ...previousLeads])
  const x = (i: number) => (n > 1 ? (i * W) / (n - 1) : W / 2)
  const y = (v: number) => H - (v / yMax) * H
  const path = (values: number[]) => values.map((v, i) => `${i ? 'L' : 'M'}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(' ')
  const currentLine = path(conversations)

  const select = (index: number) => setActive(Math.max(0, Math.min(n - 1, index)))

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const rect = box.current?.getBoundingClientRect()
    if (!rect || rect.width <= AXIS || n === 0) return
    const ratio = (event.clientX - rect.left - AXIS) / (rect.width - AXIS)
    select(Math.round(Math.max(0, Math.min(1, ratio)) * (n - 1)))
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const current = active ?? n - 1
    const moves: Record<string, number> = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: n - 1 }
    if (event.key in moves) {
      event.preventDefault()
      select(moves[event.key])
    } else if (event.key === 'Escape') {
      setActive(null)
    }
  }

  const fx = active === null ? 0 : n > 1 ? active / (n - 1) : 0.5
  const left = `calc(${AXIS}px + (100% - ${AXIS}px) * ${fx.toFixed(4)})`
  const convTop = active === null ? 0 : y(conversations[active] ?? 0)
  const leadTop = active === null ? 0 : y(leads[active] ?? 0)
  const tipTop = Math.max(34, Math.min(H - 34, Math.min(convTop, leadTop)))

  return (
    <>
      <div
        ref={box}
        className="ct-dash-chart"
        role="group"
        tabIndex={0}
        aria-label={`Conversations and leads per day, ${rangeLabel}. Use the left and right arrow keys to read each day.`}
        onPointerMove={onPointerMove}
        onPointerLeave={() => setActive(null)}
        onFocus={() => setActive((value) => value ?? n - 1)}
        onBlur={() => setActive(null)}
        onKeyDown={onKeyDown}
      >
        <div className="ct-dash-chart-grid" aria-hidden="true">
          {[yMax, (yMax * 2) / 3, yMax / 3, 0].map((value) => (
            <div key={value}>
              <span>{Math.round(value)}</span>
            </div>
          ))}
        </div>
        <svg className="ct-dash-chart-svg" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <defs>
            <linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor={CONVERSATIONS} stopOpacity="0.16" />
              <stop offset="1" stopColor={CONVERSATIONS} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={`${currentLine} L${W} ${H} L0 ${H}Z`} fill={`url(#${fillId})`} />
          <path d={path(previousConversations)} fill="none" stroke="#a5b4fc" strokeWidth="1.5" strokeDasharray="4 3" vectorEffect="non-scaling-stroke" />
          <path d={path(previousLeads)} fill="none" stroke="#6ee7b7" strokeWidth="1.5" strokeDasharray="4 3" vectorEffect="non-scaling-stroke" />
          <path d={path(leads)} fill="none" stroke={LEADS} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
          <path d={currentLine} fill="none" stroke={CONVERSATIONS} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
        </svg>

        {active !== null && (
          <>
            <div className="ct-dash-chart-line" style={{ left }} />
            <div className="ct-dash-chart-dot is-leads" style={{ left, top: leadTop }} />
            <div className="ct-dash-chart-dot" style={{ left, top: convTop }} />
            <div className={`ct-dash-chart-tip${fx > 0.62 ? ' is-flipped' : ''}`} style={{ left, top: tipTop } as CSSProperties}>
              <div className="ct-dash-chart-tip-day">
                {labels[active]} <span>vs {previousLabels[active]}</span>
              </div>
              <div className="ct-dash-chart-tip-row">
                <i style={{ background: CONVERSATIONS }} />
                Conversations <b>{conversations[active]}</b>
                <span>· prev. {previousConversations[active]}</span>
              </div>
              <div className="ct-dash-chart-tip-row">
                <i style={{ background: LEADS }} />
                Leads <b>{leads[active]}</b>
                <span>· prev. {previousLeads[active]}</span>
              </div>
            </div>
          </>
        )}
        <div className="ct-dash-sr" aria-live="polite">
          {active !== null ? `${labels[active]}: ${conversations[active]} conversations, ${leads[active]} leads.` : ''}
        </div>
      </div>

      <div className="ct-dash-chart-x" aria-hidden="true">
        {ticks.map((tick) => (
          <span key={tick.index} style={{ left: `${n > 1 ? (tick.index / (n - 1)) * 100 : 50}%` }}>
            {tick.label}
          </span>
        ))}
      </div>

      {/* sr-only on a wrapper: a <table> ignores height/overflow and would add scroll height. */}
      <div className="ct-dash-sr">
      <table>
        <caption>Conversations and leads per day, {rangeLabel}, with the previous period</caption>
        <thead>
          <tr>
            <th scope="col">Day</th>
            <th scope="col">Conversations</th>
            <th scope="col">Leads</th>
            <th scope="col">Previous conversations</th>
            <th scope="col">Previous leads</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((label, i) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td>{conversations[i]}</td>
              <td>{leads[i]}</td>
              <td>{previousConversations[i]}</td>
              <td>{previousLeads[i]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </>
  )
}
