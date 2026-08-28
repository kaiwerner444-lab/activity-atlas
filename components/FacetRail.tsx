'use client'

import { useState } from 'react'
import { FACETS, PRIMITIVES } from '@/lib/facets'
import { HIGHLIGHT_MODES } from '@/lib/colors'
import { EMPTY_FILTERS, filterCount } from '@/lib/filters'
import { useAtlas } from '@/lib/store'
import { COLLECTORS } from '@/content/collectors'
import { STATS } from '@/lib/taxonomy'
import type { PrimitiveId } from '@/lib/types'

export function FacetRail() {
  const { filters, setFilters, highlight, setHighlight, matches } = useAtlas()
  const [showSecondary, setShowSecondary] = useState(false)
  const active = filterCount(filters)

  const toggleFacet = (key: string, value: string) => {
    setFilters((prev) => {
      const current = prev.facets[key] ?? []
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value]
      const facets = { ...prev.facets }
      if (next.length) facets[key] = next
      else delete facets[key]
      return { ...prev, facets }
    })
  }

  const togglePrimitive = (id: PrimitiveId) => {
    setFilters((prev) => ({
      ...prev,
      primitives: prev.primitives.includes(id)
        ? prev.primitives.filter((p) => p !== id)
        : [...prev.primitives, id],
    }))
  }

  const toggleCollector = (id: string) => {
    setFilters((prev) => ({
      ...prev,
      collectors: prev.collectors.includes(id)
        ? prev.collectors.filter((c) => c !== id)
        : [...prev.collectors, id],
    }))
  }

  return (
    <aside className="rail">
      <div className="section">
        <h3>Colour by</h3>
        <select
          className="btn"
          style={{ width: '100%' }}
          value={highlight}
          onChange={(e) => setHighlight(e.target.value as typeof highlight)}
        >
          {HIGHLIGHT_MODES.map((m) => (
            <option key={m.id} value={m.id}>
              {m.label}
            </option>
          ))}
        </select>
      </div>

      <div className="section">
        <h3>Matching</h3>
        <div className="toggle" style={{ marginBottom: 8 }}>
          <button
            data-on={filters.mode === 'tint'}
            onClick={() => setFilters((p) => ({ ...p, mode: 'tint' }))}
          >
            Tint matches
          </button>
          <button
            data-on={filters.mode === 'isolate'}
            onClick={() => setFilters((p) => ({ ...p, mode: 'isolate' }))}
          >
            Isolate
          </button>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span className="mono" style={{ color: 'var(--dim)' }}>
            {active === 0
              ? `${STATS.leaves} leaves, no filter`
              : `${matches.leafCount} / ${STATS.leaves} leaves`}
          </span>
          {active > 0 && (
            <button
              className="chip"
              style={{ marginLeft: 'auto' }}
              onClick={() => setFilters(() => ({ ...EMPTY_FILTERS, facets: {} }))}
            >
              Reset {active}
            </button>
          )}
        </div>
      </div>

      <div className="scroll" style={{ flex: 1, minHeight: 0 }}>
        <div className="section">
          <h3>Failure and recovery</h3>
          <button
            className="chip"
            data-on={filters.failOnly}
            data-tone="red"
            onClick={() => setFilters((p) => ({ ...p, failOnly: !p.failOnly }))}
          >
            Only failure / rework leaves ({STATS.failLeaves})
          </button>
        </div>

        {FACETS.filter((f) => !f.secondary).map((facet) => (
          <div className="section" key={facet.key}>
            <h3 title={facet.why}>{facet.label}</h3>
            <div className="chips">
              {facet.options.map((opt) => (
                <button
                  key={opt.value}
                  className="chip"
                  data-on={(filters.facets[facet.key] ?? []).includes(opt.value)}
                  data-tone={
                    facet.key === 'saturation' && opt.value === 'heavy' ? 'amber' : undefined
                  }
                  onClick={() => toggleFacet(facet.key, opt.value)}
                  title={facet.kind === 'scale' ? `${opt.label} and above` : opt.label}
                >
                  {facet.kind === 'scale' ? `${opt.value}+` : opt.label}
                </button>
              ))}
            </div>
          </div>
        ))}

        <div className="section">
          <h3>Motor primitive</h3>
          <div className="chips">
            {PRIMITIVES.map((p) => (
              <button
                key={p.id}
                className="chip"
                data-on={filters.primitives.includes(p.id)}
                onClick={() => togglePrimitive(p.id)}
                title={p.gloss}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <div className="section">
          <h3>Highlight exact players</h3>
          <div className="chips" style={{ marginBottom: 8 }}>
            {COLLECTORS.map((c) => (
              <button
                key={c.id}
                className="chip"
                data-on={filters.collectors.includes(c.id)}
                onClick={() => toggleCollector(c.id)}
                title={c.knownBias}
                style={
                  filters.collectors.includes(c.id)
                    ? { borderColor: c.color, background: `${c.color}30`, color: '#e8ecf5' }
                    : undefined
                }
              >
                {c.name}
              </button>
            ))}
          </div>
          {filters.collectors.length > 1 && (
            <div className="toggle">
              <button
                data-on={filters.collectorMode === 'union'}
                onClick={() => setFilters((p) => ({ ...p, collectorMode: 'union' }))}
              >
                Union
              </button>
              <button
                data-on={filters.collectorMode === 'intersection'}
                onClick={() => setFilters((p) => ({ ...p, collectorMode: 'intersection' }))}
              >
                Intersection
              </button>
            </div>
          )}
        </div>

        <div className="section">
          <button className="chip" onClick={() => setShowSecondary((s) => !s)}>
            {showSecondary ? 'Hide' : 'Show'} secondary facets
          </button>
        </div>

        {showSecondary &&
          FACETS.filter((f) => f.secondary).map((facet) => (
            <div className="section" key={facet.key}>
              <h3 title={facet.why}>{facet.label}</h3>
              <div className="chips">
                {facet.options.map((opt) => (
                  <button
                    key={opt.value}
                    className="chip"
                    data-on={(filters.facets[facet.key] ?? []).includes(opt.value)}
                    data-tone={
                      facet.key === 'ethics' && opt.value === 'prohibited' ? 'red' : undefined
                    }
                    onClick={() => toggleFacet(facet.key, opt.value)}
                  >
                    {facet.kind === 'scale' ? `${opt.value}+` : opt.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
      </div>
    </aside>
  )
}
