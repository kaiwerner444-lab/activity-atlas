'use client'

import { useMemo, useState } from 'react'
import { Radar } from './Radar'
import { Sparkline } from './Sparkline'
import { ancestors, children, eventsFor, getNode, kinNodes, STATS } from '@/lib/taxonomy'
import { explainGap, suggestedCapture, usefulness, feasibility } from '@/lib/scoring'
import { PRIMITIVE_BY_ID } from '@/lib/facets'
import { COLLECTOR_BY_ID } from '@/content/collectors'
import { useAtlas } from '@/lib/store'

export function Inspector() {
  const { selectedId, setSelected, setFocus, plans, createPlan, addToPlan, showKin, setShowKin, asOf } =
    useAtlas()
  const node = getNode(selectedId)
  const [planName, setPlanName] = useState('')

  const events = useMemo(
    () => (node ? eventsFor(node.id, true).filter((e) => e.date <= asOf) : []),
    [node, asOf],
  )
  const kin = useMemo(() => (node ? kinNodes(node.id, 6) : []), [node])

  if (!node) {
    return (
      <aside className="inspector">
        <div className="section">
          <h3>Inspector</h3>
          <p style={{ color: 'var(--dim)', margin: 0 }}>
            Nothing selected. Click a disc to open it, or press <span className="kbd">/</span> to
            search.
          </p>
        </div>
        <div className="section">
          <h3>Seed contents</h3>
          <dl className="kv">
            <dt>Domains</dt>
            <dd>{STATS.domains}</dd>
            <dt>Families</dt>
            <dd>{STATS.families}</dd>
            <dt>Procedures</dt>
            <dd>{STATS.procedures}</dd>
            <dt>Activities</dt>
            <dd>{STATS.activities}</dd>
            <dt>Scoring leaves</dt>
            <dd>{STATS.leaves}</dd>
            <dt>Failure leaves</dt>
            <dd>{STATS.failLeaves}</dd>
            <dt>Our hours</dt>
            <dd>{Math.round(STATS.ourHours)}</dd>
          </dl>
        </div>
        <div className="section">
          <div className="callout" data-tone="warn">
            Every leaf in this build is editorial seed content. Gap scores are only as good as the
            facets a human has reviewed, and none of them have been yet.
          </div>
        </div>
      </aside>
    )
  }

  const chain = ancestors(node.id)
  const kids = children(node.id)
  const blocked = node.facets.ethics === 'prohibited'
  const ourHours = events.filter((e) => e.source === 'us').reduce((s, e) => s + e.hoursUsable, 0)

  return (
    <aside className="inspector">
      <div className="scroll" style={{ flex: 1, minHeight: 0 }}>
        <div className="section">
          <div className="mono" style={{ color: 'var(--faint)', marginBottom: 6 }}>
            {chain.slice(0, -1).map((a) => (
              <span key={a.id}>
                <button
                  className="chip"
                  data-size="sm"
                  onClick={() => {
                    setFocus(a.id)
                    setSelected(a.id)
                  }}
                >
                  {a.title}
                </button>{' '}
              </span>
            ))}
          </div>
          <h2 className="insp-title">{node.title}</h2>
          <p className="insp-def">{node.definition}</p>
          <div className="mono" style={{ color: 'var(--faint)' }}>
            {node.id}
          </div>
        </div>

        {blocked && (
          <div className="section">
            <div className="callout" data-tone="block">
              Blocked on safety and ethics grounds. It stays on the map so nobody rediscovers it as
              an untapped opportunity, and it scores zero feasibility so it can never surface in the
              gap table.
            </div>
          </div>
        )}

        <div className="section">
          <h3>Scores</h3>
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            <Radar facets={node.facets} />
            <div style={{ flex: 1, display: 'grid', gap: 8 }}>
              <ScoreBar label="Gap" value={node.gap} />
              <ScoreBar label="Usefulness" value={usefulness(node.facets)} />
              <ScoreBar label="Feasibility" value={feasibility(node.facets)} />
            </div>
          </div>
        </div>

        {(node.cue || node.verify) && (
          <div className="section">
            {node.cue && (
              <>
                <h3>How you know it is done</h3>
                <div className="callout">{node.cue}</div>
              </>
            )}
            {node.verify && (
              <>
                <h3 style={{ marginTop: node.cue ? 12 : 0 }}>How you prove it worked</h3>
                <div className="callout">{node.verify}</div>
              </>
            )}
            <p style={{ color: 'var(--faint)', margin: '8px 0 0' }}>
              The stop condition and the proof step: the two halves a camera cannot separate from
              the motion. This is what force, tactile and a close witness mark are for.
            </p>
          </div>
        )}

        <div className="section">
          <h3>Why this scores where it does</h3>
          <p style={{ margin: 0, color: 'var(--dim)' }}>{explainGap(node.facets)}</p>
        </div>

        <div className="section">
          <h3>Facets</h3>
          <dl className="kv">
            <dt>Setting</dt>
            <dd>{node.facets.setting}</dd>
            <dt>Dexterity</dt>
            <dd>{node.facets.dexterity} / 5</dd>
            <dt>Precision</dt>
            <dd>{node.facets.precision} / 5</dd>
            <dt>Contact</dt>
            <dd>{node.facets.contact} / 5</dd>
            <dt>Horizon</dt>
            <dd>{node.facets.horizon}</dd>
            <dt>Repetition</dt>
            <dd>{node.facets.repetition}</dd>
            <dt>Partner</dt>
            <dd>{node.facets.partner}</dd>
            <dt>Capital</dt>
            <dd>{node.facets.capital}</dd>
            <dt>Skill</dt>
            <dd>{node.facets.skillYears}</dd>
            <dt>Suit fit</dt>
            <dd>{node.facets.suit}</dd>
            <dt>Robot now</dt>
            <dd>{node.facets.robotNow}</dd>
            <dt>Saturation</dt>
            <dd>{node.facets.saturation}</dd>
            <dt>Rights</dt>
            <dd>{node.facets.rights}</dd>
            <dt>Ethics</dt>
            <dd>{node.facets.ethics}</dd>
            <dt>Prevalence</dt>
            <dd>{node.prevalence}</dd>
          </dl>
        </div>

        <div className="section">
          <h3>Primitives</h3>
          <div className="chips">
            {node.primitives.map((p) => (
              <span key={p} className="chip" data-size="sm" title={PRIMITIVE_BY_ID[p]?.gloss}>
                {PRIMITIVE_BY_ID[p]?.label ?? p}
              </span>
            ))}
          </div>
          {(node.objects.length > 0 || node.tools.length > 0) && (
            <dl className="kv" style={{ marginTop: 8 }}>
              {node.objects.length > 0 && (
                <>
                  <dt>Objects</dt>
                  <dd>{node.objects.join(', ')}</dd>
                </>
              )}
              {node.tools.length > 0 && (
                <>
                  <dt>Tools</dt>
                  <dd>{node.tools.join(', ')}</dd>
                </>
              )}
            </dl>
          )}
        </div>

        <div className="section">
          <h3>Coverage</h3>
          <Sparkline events={events} />
          <dl className="kv" style={{ marginTop: 8 }}>
            <dt>Our hours</dt>
            <dd>{Math.round(ourHours)}</dd>
            <dt>Events</dt>
            <dd>{events.length}</dd>
          </dl>
          {events.length > 0 && (
            <div style={{ marginTop: 8, display: 'grid', gap: 5 }}>
              {events.slice(0, 8).map((e) => (
                <div key={e.id} style={{ display: 'flex', gap: 8, alignItems: 'baseline' }}>
                  <span
                    className="dot"
                    style={{ background: COLLECTOR_BY_ID[e.collectorId]?.color ?? 'var(--faint)' }}
                  />
                  <span style={{ flex: 1, minWidth: 0 }}>{e.datasetName}</span>
                  <span className="mono" style={{ color: 'var(--faint)' }}>
                    {Math.round(e.hoursUsable)}h · {e.date.slice(0, 7)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="section">
          <h3>Suggested capture</h3>
          <p style={{ margin: '0 0 8px', color: 'var(--dim)' }}>{suggestedCapture(node.facets)}</p>
          <div className="chips">
            {node.facets.embodiment.map((e) => (
              <span key={e} className="chip" data-size="sm">
                {e}
              </span>
            ))}
          </div>
        </div>

        <div className="section">
          <h3>Why a lab cannot cheaply do this itself</h3>
          <p style={{ margin: 0, color: 'var(--dim)' }}>{labReason(node.facets)}</p>
        </div>

        {node.notes && (
          <div className="section">
            <h3>Note</h3>
            <div className="callout">{node.notes}</div>
          </div>
        )}

        {kids.length > 0 && (
          <div className="section">
            <h3>Children ({kids.length})</h3>
            <div style={{ display: 'grid', gap: 3 }}>
              {kids.map((k) => (
                <button
                  key={k.id}
                  className="chip"
                  style={{ textAlign: 'left', borderRadius: 7 }}
                  onClick={() => {
                    setSelected(k.id)
                    if (k.childIds.length) setFocus(k.id)
                  }}
                >
                  {k.fail ? '↺ ' : ''}
                  {k.title}
                  <span className="mono" style={{ color: 'var(--faint)' }}>
                    {' '}
                    gap {k.gap.toFixed(2)}
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}

        {kin.length > 0 && (
          <div className="section">
            <h3>Looks like this elsewhere</h3>
            <p style={{ color: 'var(--faint)', margin: '0 0 8px' }}>
              Same primitives, different domain. This is how transfer gets explained to a lab.
            </p>
            <div style={{ display: 'grid', gap: 3 }}>
              {kin.map((k) => (
                <button
                  key={k.id}
                  className="chip"
                  style={{ textAlign: 'left', borderRadius: 7 }}
                  onClick={() => {
                    setSelected(k.id)
                    setFocus(k.parentId)
                  }}
                >
                  {k.title}
                  <span className="mono" style={{ color: 'var(--faint)' }}>
                    {' '}
                    {k.path[0]}
                  </span>
                </button>
              ))}
            </div>
            <button
              className="btn"
              style={{ marginTop: 8 }}
              onClick={() => {
                setShowKin(!showKin)
                if (!showKin) setFocus(null)
              }}
            >
              {showKin ? 'Hide' : 'Draw'} kin edges on the map
            </button>
          </div>
        )}

        <div className="section">
          <h3>Collection plan</h3>
          <div style={{ display: 'grid', gap: 6 }}>
            {plans.map((p) => (
              <button key={p.id} className="btn" onClick={() => addToPlan(p.id, [node.id])}>
                Add to {p.name}
              </button>
            ))}
            <div style={{ display: 'flex', gap: 6 }}>
              <input
                className="btn"
                style={{ flex: 1 }}
                placeholder="New plan"
                value={planName}
                onChange={(e) => setPlanName(e.target.value)}
              />
              <button
                className="btn"
                data-variant="primary"
                disabled={!planName.trim()}
                onClick={() => {
                  createPlan(planName.trim(), [node.id])
                  setPlanName('')
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

function ScoreBar({ label, value }: { label: string; value: number }) {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
        <span style={{ color: 'var(--faint)' }}>{label}</span>
        <span className="mono">{value.toFixed(2)}</span>
      </div>
      <div className="meter">
        <i style={{ width: `${Math.min(100, value * 100)}%` }} />
      </div>
    </div>
  )
}

function labReason(f: ReturnType<typeof getNode> extends undefined ? never : NonNullable<ReturnType<typeof getNode>>['facets']): string {
  if (f.ethics === 'prohibited') return 'It is blocked. Nobody should be doing this, including us.'
  const reasons: string[] = []
  if (f.partner === 'licensed' || f.partner === 'regulated') {
    reasons.push('the work is gated behind a trade or a regulator, not behind money')
  } else if (f.partner === 'site') {
    reasons.push('it happens inside somebody else building')
  }
  if (f.capital === 'capex') reasons.push('the equipment is not something you put in a lab room')
  if (f.skillYears === 'years') reasons.push('the operator took years to become worth filming')
  if (f.contact >= 4) reasons.push('the signal that matters is force, which a camera does not see')
  if (f.saturation === 'heavy') {
    return 'Honestly, they can. This is already well covered by public data, and our version would be marginal.'
  }
  if (reasons.length === 0) {
    return 'Nothing structural stops a lab here. If we want it, we win on volume and consistency rather than on access.'
  }
  return `Because ${reasons.join(', and ')}.`
}
