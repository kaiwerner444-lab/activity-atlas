'use client'

import { useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ATLAS, getNode } from '@/lib/taxonomy'
import { suggestedCapture } from '@/lib/scoring'
import { useAtlas } from '@/lib/store'

export function CollectView() {
  const { plans, removeFromPlan, deletePlan, setFocus, setSelected } = useAtlas()
  const router = useRouter()

  // A shortlist that does not need a plan to exist: the highest-gap leaves the
  // suit can actually reach without a partner.
  const suitReady = useMemo(
    () =>
      ATLAS.leaves
        .filter(
          (n) =>
            n.facets.ethics === 'open' &&
            n.facets.partner === 'none' &&
            n.facets.capital !== 'capex' &&
            (n.facets.suit === 'excellent' || n.facets.suit === 'ok'),
        )
        .sort((a, b) => b.gap - a.gap)
        .slice(0, 12),
    [],
  )

  const partnerGated = useMemo(
    () =>
      ATLAS.leaves
        .filter((n) => n.facets.ethics !== 'prohibited' && n.facets.partner !== 'none')
        .sort((a, b) => b.gap - a.gap)
        .slice(0, 10),
    [],
  )

  const open = (id: string) => {
    const node = getNode(id)
    setSelected(id)
    setFocus(node?.parentId ?? null)
    router.push('/')
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>Collect</h1>
        <p>
          What the suits should do next, and what needs somebody else to open a door. Plans live in
          this browser for now; they move to Postgres when coverage events and auth arrive.
        </p>
      </div>

      <div className="scroll" style={{ flex: 1, minHeight: 0, padding: '16px 20px' }}>
        <section style={{ marginBottom: 26 }}>
          <h3 style={{ margin: '0 0 10px', fontSize: 13 }}>Plans ({plans.length})</h3>
          {plans.length === 0 ? (
            <div className="callout">
              No plans yet. Shift-drag a lasso on the atlas, or tick rows on the coverage table, to
              make one.
            </div>
          ) : (
            <div style={{ display: 'grid', gap: 14 }}>
              {plans.map((plan) => {
                const nodes = plan.nodeIds.map((id) => getNode(id)).filter(Boolean)
                const meanGap =
                  nodes.length > 0
                    ? nodes.reduce((s, n) => s + (n?.gap ?? 0), 0) / nodes.length
                    : 0
                return (
                  <div
                    key={plan.id}
                    style={{
                      border: '1px solid var(--line)',
                      borderRadius: 10,
                      background: 'var(--panel)',
                      padding: 14,
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'baseline', gap: 10 }}>
                      <strong>{plan.name}</strong>
                      <span className="mono" style={{ color: 'var(--faint)' }}>
                        {nodes.length} nodes · mean gap {meanGap.toFixed(2)} · {plan.status}
                      </span>
                      <button
                        className="chip"
                        style={{ marginLeft: 'auto' }}
                        onClick={() => deletePlan(plan.id)}
                      >
                        Delete
                      </button>
                    </div>
                    <table className="grid" style={{ marginTop: 10 }}>
                      <thead>
                        <tr>
                          <th>Node</th>
                          <th>Suggested capture</th>
                          <th className="num">Gap</th>
                          <th />
                        </tr>
                      </thead>
                      <tbody>
                        {nodes.map((n) => (
                          <tr key={n!.id}>
                            <td>
                              <button
                                className="chip"
                                style={{ textAlign: 'left', borderRadius: 6 }}
                                onClick={() => open(n!.id)}
                              >
                                {n!.title}
                              </button>
                              <div style={{ color: 'var(--faint)', marginTop: 2 }}>
                                {n!.path.slice(0, -1).join(' › ')}
                              </div>
                            </td>
                            <td style={{ color: 'var(--dim)' }}>{suggestedCapture(n!.facets)}</td>
                            <td className="num">{n!.gap.toFixed(3)}</td>
                            <td>
                              <button
                                className="chip"
                                onClick={() => removeFromPlan(plan.id, n!.id)}
                              >
                                Remove
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        <section style={{ marginBottom: 26 }}>
          <h3 style={{ margin: '0 0 4px', fontSize: 13 }}>Suit can walk in tomorrow</h3>
          <p style={{ color: 'var(--dim)', marginTop: 0 }}>
            Highest gap among leaves with no partner gate, no capex, and a suit that fits.
          </p>
          <table className="grid">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Path</th>
                <th>Suit</th>
                <th className="num">Gap</th>
              </tr>
            </thead>
            <tbody>
              {suitReady.map((n) => (
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
                  <td style={{ color: 'var(--faint)' }}>{n.path.slice(0, -1).join(' › ')}</td>
                  <td>{n.facets.suit}</td>
                  <td className="num">{n.gap.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section>
          <h3 style={{ margin: '0 0 4px', fontSize: 13 }}>Needs somebody else to open a door</h3>
          <p style={{ color: 'var(--dim)', marginTop: 0 }}>
            High gap, but gated on site access, a licensed trade, or a regulator. This is the
            partnership pipeline, not the collection rota.
          </p>
          <table className="grid">
            <thead>
              <tr>
                <th>Activity</th>
                <th>Path</th>
                <th>Gate</th>
                <th className="num">Gap</th>
              </tr>
            </thead>
            <tbody>
              {partnerGated.map((n) => (
                <tr key={n.id}>
                  <td>
                    <button
                      className="chip"
                      style={{ textAlign: 'left', borderRadius: 6 }}
                      onClick={() => open(n.id)}
                    >
                      {n.title}
                    </button>
                  </td>
                  <td style={{ color: 'var(--faint)' }}>{n.path.slice(0, -1).join(' › ')}</td>
                  <td>{n.facets.partner}</td>
                  <td className="num">{n.gap.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  )
}
