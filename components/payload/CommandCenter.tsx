import './dashboard/dashboard.css'
import type { AdminViewServerProps } from 'payload'
import { parseRange, parseWeekOffset } from '../../lib/cms/admin/metrics.ts'
import { getOverviewStats } from '../../lib/cms/admin/overview.ts'
import { greetingName } from './dashboard/format.ts'
import { OverviewView } from './dashboard/OverviewView.tsx'

// Admin Overview, registered as admin.components.views.dashboard. Loads real
// data on the server and hands it to the pure OverviewView. The global top bar
// lives in Payload's app header above this view, so there is no bar here.
export async function CommandCenter(props: AdminViewServerProps) {
  const searchParams = (props.searchParams ?? {}) as Record<string, string | string[] | undefined>
  const range = parseRange(searchParams.range)
  const weekOffset = parseWeekOffset(searchParams.week)
  const now = Date.now()
  const stats = await getOverviewStats({ now, range, weekOffset })

  return (
    <OverviewView
      stats={stats}
      now={now}
      userName={greetingName(props.initPageResult?.req?.user)}
      range={range}
      weekOffset={weekOffset}
    />
  )
}
