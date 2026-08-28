'use client'

import { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import { ATLAS, STATS, getNode } from '@/lib/taxonomy'
import { PRIMITIVES } from '@/lib/facets'
import { COLLECTORS } from '@/content/collectors'
import { useAtlas } from '@/lib/store'

export function CatalogView() {
  const [query, setQuery] = useState('')
  const [level, setLevel] = useState<number | null>(null)
  const { setFocus, setSelected } = useAtlas()
  const router = useRouter()

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ATLAS.all.filter((n) => {
      if (level !== null && n.level !== level) return false
      if (!q) return true
      return (
        n.title.toLowerCase().includes(q) ||
        n.id.toLowerCase().includes(q) ||
        n.definition.toLowerCase().includes(q)
      )
    })
  }, [query, level])

  const open = (id: string) => {
    const node = getNode(id)
    setSelected(id)
    setFocus(node?.childIds.length ? id : (node?.parentId ?? null))
    router.push('/')
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>Catalog</h1>
        <p>
          Every node in the seed, flat. {STATS.domains} domains, {STATS.families} families,{' '}
          {STATS.procedures} procedures, {STATS.activities} activities, {STATS.leaves} of which are
          terminal and therefore scored. All of it is marked <span className="mono">seed</span>: no
          human taxonomist has reviewed a single row yet, and gap scores inherit that uncertainty.
        </p>
        <div style={{ display: 'flex', gap: 8, marginTop: 10, flexWrap: 'wrap' }}>
          <input
            className="btn"
            style={{ minWidth: 260 }}
            placeholder="Filter by title, id or definition"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="toggle">
            {[null, 0, 1, 2, 3].map((l) => (
              <button key={String(l)} data-on={level === l} onClick={() => setLevel(l)}>
                {l === null ? 'All' : `Z${l}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="scroll" style={{ flex: 1, minHeight: 0 }}>
        <table className="grid">
          <thead>
            <tr>
              <th>Title</th>
              <th>Id</th>
              <th>Kind</th>
              <th>Primitives</th>
              <th>Definition</th>
              <th className="num">Gap</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((n) => (
              <tr key={n.id}>
                <td>
                  <button
                    className="chip"
                    style={{ textAlign: 'left', borderRadius: 6 }}
                    onClick={() => open(n.id)}
                  >
                    {n.fail ? '↺ ' : ''}
                    {n.title}
                  </button>
                </td>
                <td className="mono" style={{ color: 'var(--faint)' }}>
                  {n.id}
                </td>
                <td>{n.kind}</td>
                <td style={{ color: 'var(--faint)' }}>{n.primitives.join(', ')}</td>
                <td style={{ color: 'var(--dim)', maxWidth: 460 }}>{n.definition}</td>
                <td className="num">{n.gap.toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 && <div className="empty">Nothing matches.</div>}

        <div style={{ padding: '20px', borderTop: '1px solid var(--line)' }}>
          <h3 style={{ fontSize: 13, margin: '0 0 8px' }}>Motor primitives</h3>
          <table className="grid" style={{ marginBottom: 22 }}>
            <thead>
              <tr>
                <th>Primitive</th>
                <th>Gloss</th>
                <th className="num">Nodes</th>
              </tr>
            </thead>
            <tbody>
              {PRIMITIVES.map((p) => (
                <tr key={p.id}>
                  <td>{p.label}</td>
                  <td style={{ color: 'var(--dim)' }}>{p.gloss}</td>
                  <td className="num">{ATLAS.byPrimitive.get(p.id)?.length ?? 0}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h3 style={{ fontSize: 13, margin: '0 0 8px' }}>Collectors and their known bias</h3>
          <table className="grid">
            <thead>
              <tr>
                <th>Collector</th>
                <th>Type</th>
                <th>Known bias</th>
              </tr>
            </thead>
            <tbody>
              {COLLECTORS.map((c) => (
                <tr key={c.id}>
                  <td>
                    <span className="dot" style={{ background: c.color }} />
                    {c.name}
                  </td>
                  <td>{c.type}</td>
                  <td style={{ color: 'var(--dim)' }}>{c.knownBias}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
