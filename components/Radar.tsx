'use client'

import type { Facets } from '@/lib/types'

// Five axes, chosen because they are the five things that decide whether we can
// go and get a thing: how hard it is, how tight, how physical, who has to let us
// in, and what it costs to stand there.

const AXES: { label: string; value: (f: Facets) => number }[] = [
  { label: 'dex', value: (f) => f.dexterity / 5 },
  { label: 'contact', value: (f) => f.contact / 5 },
  { label: 'horizon', value: (f) => ({ short: 0.33, medium: 0.66, long: 1 })[f.horizon] },
  { label: 'partner', value: (f) => ({ none: 0.1, site: 0.45, licensed: 0.75, regulated: 1 })[f.partner] },
  { label: 'capex', value: (f) => ({ cheap: 0.15, mid: 0.55, capex: 1 })[f.capital] },
]

export function Radar({ facets, size = 132 }: { facets: Facets; size?: number }) {
  const c = size / 2
  const r = size / 2 - 20
  const points = AXES.map((axis, i) => {
    const angle = (i / AXES.length) * Math.PI * 2 - Math.PI / 2
    const v = axis.value(facets)
    return {
      x: c + Math.cos(angle) * r * v,
      y: c + Math.sin(angle) * r * v,
      ax: c + Math.cos(angle) * r,
      ay: c + Math.sin(angle) * r,
      lx: c + Math.cos(angle) * (r + 12),
      ly: c + Math.sin(angle) * (r + 12),
      label: axis.label,
    }
  })

  return (
    <svg width={size} height={size} role="img" aria-label="facet radar">
      {[0.33, 0.66, 1].map((ring) => (
        <circle key={ring} cx={c} cy={c} r={r * ring} fill="none" stroke="var(--line)" />
      ))}
      {points.map((p) => (
        <line key={p.label} x1={c} y1={c} x2={p.ax} y2={p.ay} stroke="var(--line)" />
      ))}
      <polygon
        points={points.map((p) => `${p.x},${p.y}`).join(' ')}
        fill="rgba(76,155,232,0.28)"
        stroke="var(--blue)"
        strokeWidth={1.5}
      />
      {points.map((p) => (
        <text
          key={`l-${p.label}`}
          x={p.lx}
          y={p.ly}
          fontSize={9}
          fill="var(--faint)"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {p.label}
        </text>
      ))}
    </svg>
  )
}
