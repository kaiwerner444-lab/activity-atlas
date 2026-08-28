'use client'

import type { CoverageEvent } from '@/lib/types'

/** Cumulative usable hours by quarter, ours in blue and public in amber. */
export function Sparkline({
  events,
  width = 300,
  height = 44,
}: {
  events: CoverageEvent[]
  width?: number
  height?: number
}) {
  if (events.length === 0) {
    return (
      <div className="mono" style={{ color: 'var(--faint)' }}>
        No coverage events recorded.
      </div>
    )
  }

  const quarters = ['2026-01', '2026-04', '2026-07', '2026-10']
  const bucket = (date: string) => {
    const month = Number(date.slice(5, 7))
    return Math.min(3, Math.floor((month - 1) / 3))
  }

  const series = (source: (e: CoverageEvent) => boolean) => {
    const totals = [0, 0, 0, 0]
    for (const e of events) if (source(e)) totals[bucket(e.date)] += e.hoursUsable
    let running = 0
    return totals.map((t) => (running += t))
  }

  const ours = series((e) => e.source === 'us')
  const other = series((e) => e.source !== 'us')
  const max = Math.max(1, ...ours, ...other)
  const x = (i: number) => (i / (quarters.length - 1)) * (width - 4) + 2
  const y = (v: number) => height - 4 - (v / max) * (height - 10)
  const path = (vals: number[]) => vals.map((v, i) => `${i ? 'L' : 'M'}${x(i)},${y(v)}`).join(' ')

  return (
    <div>
      <svg width={width} height={height} role="img" aria-label="coverage over time">
        <line x1={2} y1={height - 4} x2={width - 2} y2={height - 4} stroke="var(--line)" />
        <path d={path(other)} fill="none" stroke="var(--amber)" strokeWidth={1.6} />
        <path d={path(ours)} fill="none" stroke="var(--blue)" strokeWidth={2} />
        {ours.map((v, i) =>
          v > 0 ? <circle key={i} cx={x(i)} cy={y(v)} r={2.2} fill="var(--blue)" /> : null,
        )}
      </svg>
      <div className="mono" style={{ color: 'var(--faint)', display: 'flex', justifyContent: 'space-between' }}>
        <span>Q1</span>
        <span>Q2</span>
        <span>Q3</span>
        <span>Q4</span>
      </div>
    </div>
  )
}
