'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ATLAS } from '@/lib/taxonomy'
import { feasibility, usefulness, publicSaturation } from '@/lib/scoring'
import { useAtlas } from '@/lib/store'
import { filterCount } from '@/lib/filters'
import type { AtlasNode } from '@/lib/types'

// This is the Monday morning screen. Not a map: a sorted list of holes with a
// number next to each one, so the argument is about the inputs rather than
// about whose intuition is louder.

type SortKey = 'gap' | 'usefulness' | 'feasibility' | 'saturation' | 'hours' | 'contact' | 'title'

const COLUMNS: { key: SortKey | null; label: string; num?: boolean }[] = [
  { key: 'title', label: 'Activity' },
  { key: null, label: 'Path' },
  { key: 'contact', label: 'Contact', num: true },
  { key: null, label: 'Partner' },
  { key: 'saturation', label: 'Public', num: true },
  { key: 'hours', label: 'Our h', num: true },
  { key: 'usefulness', label: 'Useful', num: true },
  { key: 'feasibility', label: 'Feasible', num: true },
  { key: 'gap', label: 'Gap', num: true },
]

export function CoverageTable() {
  const { filters, matches, setFocus, setSelected, plans, createPlan, addToPlan } = useAtlas()
  const [sort, setSort] = useState<SortKey>('gap')
  const [desc, setDesc] = useState(true)
  const [picked, setPicked] = useState<string[]>([])
  const [planName, setPlanName] = useState('')
  const router = useRouter()

  const filtersOn = filterCount(filters) > 0

  const rows = useMemo(() => {
    const base = ATLAS.leaves.filter(
      (n) => n.facets.ethics !== 'prohibited' && (!filtersOn || matches.leaves.has(n.id)),
    )
    const value = (n: AtlasNode): number | string => {
      switch (sort) {
        case 'gap':
          return n.gap
        case 'usefulness':
          return usefulness(n.facets)
        case 'feasibility':
          return feasibility(n.facets)
        case 'saturation':
          return publicSaturation(n.facets)
        case 'hours':
          return n.ourHours
        case 'contact':
          return n.facets.contact
        case 'title':
          return n.title
      }
    }
    return [...base].sort((a, b) => {
      const va = value(a)
      const vb = value(b)
      const cmp = typeof va === 'string' ? String(va).localeCompare(String(vb)) : Number(vb) - Number(va)
      return desc ? cmp : -cmp
    })
  }, [sort, desc, filtersOn, matches])

  const exportCsv = () => {
    const header = [
      'id',
      'title',
      'path',
      'setting',
      'contact',
      'partner',
      'capital',
      'saturation',
      'our_hours',
      'usefulness',
      'feasibility',
      'gap',
    ]
    const lines = rows.map((n) =>
      [
        n.id,
        n.title,
        n.path.join(' > '),
        n.facets.setting,
        n.facets.contact,
        n.facets.partner,
        n.facets.capital,
        n.facets.saturation,
        Math.round(n.ourHours),
        usefulness(n.facets).toFixed(3),
        feasibility(n.facets).toFixed(3),
        n.gap.toFixed(4),
      ]
        .map((v) => `"${String(v).replace(/"/g, '""')}"`)
        .join(','),
    )
    const blob = new Blob([[header.join(','), ...lines].join('\n')], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'activity-atlas-gaps.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>Coverage and gaps</h1>
        <p>
          Every terminal node, sorted by gap = (1 − public saturation) × usefulness × feasibility ×
          (1 − our coverage). Blocked nodes are excluded from this table on purpose; they are visible
          on the map and can never be a target here.{' '}
          {filtersOn ? `Filters from the atlas rail are applied: ${rows.length} rows.` : `${rows.length} rows.`}
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap', alignItems: 'center' }}>
          <button className="btn" onClick={exportCsv}>
            Export CSV of this slice
          </button>
          {picked.length > 0 && (
            <>
              <span className="mono" style={{ color: 'var(--dim)' }}>
                {picked.length} picked
              </span>
              {plans.map((p) => (
                <button
                  key={p.id}
                  className="btn"
                  onClick={() => {
                    addToPlan(p.id, picked)
                    setPicked([])
                  }}
                >
                  Add to {p.name}
                </button>
              ))}
              <input
                className="btn"
                placeholder="New plan name"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
              />
              <button
                className="btn"
                data-variant="primary"
                disabled={!planName.trim()}
                onClick={() => {
                  createPlan(planName.trim(), picked)
                  setPlanName('')
                  setPicked([])
                }}
              >
                Create plan
              </button>
            </>
          )}
        </div>
      </div>

      <div className="scroll" style={{ flex: 1, minHeight: 0 }}>
        <table className="grid">
          <colgroup>
            <col className="c-pick" />
            <col className="c-title" />
            <col className="c-path" />
            <col className="c-num" />
            <col className="c-short" />
            <col className="c-num" />
            <col className="c-num" />
            <col className="c-num" />
            <col className="c-num" />
            <col className="c-num" />
          </colgroup>
          <thead>
            <tr>
              <th data-sortable="false" />
              {COLUMNS.map((c) => (
                <th
                  key={c.label}
                  data-sortable={c.key ? 'true' : 'false'}
                  className={c.num ? 'num' : undefined}
                  onClick={() => {
                    if (!c.key) return
                    if (sort === c.key) setDesc((d) => !d)
                    else {
                      setSort(c.key)
                      setDesc(true)
                    }
                  }}
                >
                  {c.label}
                  {sort === c.key ? (desc ? ' ↓' : ' ↑') : ''}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((n) => (
              <tr key={n.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={picked.includes(n.id)}
                    onChange={(e) =>
                      setPicked((prev) =>
                        e.target.checked ? [...prev, n.id] : prev.filter((p) => p !== n.id),
                      )
                    }
                  />
                </td>
                <td>
                  <button
                    className="chip"
                    style={{ textAlign: 'left', borderRadius: 6 }}
                    onClick={() => {
                      setSelected(n.id)
                      setFocus(n.parentId)
                      router.push('/')
                    }}
                  >
                    {n.fail ? '↺ ' : ''}
                    {n.title}
                  </button>
                </td>
                <td style={{ color: 'var(--faint)' }}>{n.path.slice(0, -1).join(' › ')}</td>
                <td className="num">{n.facets.contact}</td>
                <td>{n.facets.partner}</td>
                <td className="num">{publicSaturation(n.facets).toFixed(2)}</td>
                <td className="num">{n.ourHours ? Math.round(n.ourHours) : '—'}</td>
                <td className="num">{usefulness(n.facets).toFixed(2)}</td>
                <td className="num">{feasibility(n.facets).toFixed(2)}</td>
                <td className="num" style={{ color: n.gap > 0.35 ? 'var(--blue)' : undefined }}>
                  {n.gap.toFixed(3)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <div className="empty">No leaves match the current filters.</div>}
      </div>
    </div>
  )
}
