'use client'

import { useMemo } from 'react'
import { useAtlas, TIMELINE_END } from '@/lib/store'
import { COVERAGE_EVENTS } from '@/content/coverage-events'

const STOPS = [
  { label: '2026 Q1', value: '2026-03-31' },
  { label: 'Q2', value: '2026-06-30' },
  { label: 'Q3', value: '2026-09-30' },
  { label: 'now', value: TIMELINE_END },
]

export function Timeline() {
  const { asOf, setAsOf } = useAtlas()
  const index = Math.max(0, STOPS.findIndex((s) => s.value === asOf))

  const totals = useMemo(() => {
    const visible = COVERAGE_EVENTS.filter((e) => e.date <= asOf)
    return {
      ours: Math.round(visible.filter((e) => e.source === 'us').reduce((s, e) => s + e.hoursUsable, 0)),
      partner: Math.round(
        visible.filter((e) => e.source === 'partner').reduce((s, e) => s + e.hoursUsable, 0),
      ),
      publicHours: Math.round(
        visible.filter((e) => e.source === 'public').reduce((s, e) => s + e.hoursUsable, 0),
      ),
    }
  }, [asOf])

  return (
    <div className="timelinebar">
      <span className="mono" style={{ color: 'var(--faint)' }}>
        AS OF
      </span>
      <input
        type="range"
        min={0}
        max={STOPS.length - 1}
        step={1}
        value={index}
        onChange={(e) => setAsOf(STOPS[Number(e.target.value)].value)}
        style={{ width: 240, accentColor: 'var(--blue)' }}
        aria-label="Coverage as of"
      />
      <div style={{ display: 'flex', gap: 10 }}>
        {STOPS.map((s, i) => (
          <button
            key={s.value}
            className="chip"
            data-size="sm"
            data-on={i === index}
            onClick={() => setAsOf(s.value)}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="mono" style={{ marginLeft: 'auto', color: 'var(--dim)', display: 'flex', gap: 14 }}>
        <span style={{ color: 'var(--blue)' }}>ours {totals.ours}h</span>
        <span style={{ color: 'var(--dim)' }}>partner {totals.partner}h</span>
        <span style={{ color: 'var(--amber)' }}>public {totals.publicHours}h</span>
      </div>
    </div>
  )
}
