'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { PROTOCOLS } from '@/content/protocols/movement-battery'
import { stepCount } from '@/lib/protocol'
import { getNode } from '@/lib/taxonomy'
import { useAtlas } from '@/lib/store'

// Protocols are a separate artifact from the atlas on purpose. A session script
// has calibration, restart rules and deliberate bad trials, none of which are
// activities; putting them in the tree would have the coverage map report a
// hundred activities where there is one session.

export function ProtocolView() {
  const [openId, setOpenId] = useState<string>(PROTOCOLS[0]?.id ?? '')
  const { setFocus, setSelected } = useAtlas()
  const router = useRouter()

  const open = (nodeId: string) => {
    const node = getNode(nodeId)
    if (!node) return
    setSelected(nodeId)
    setFocus(node.childIds.length ? nodeId : node.parentId)
    router.push('/')
  }

  return (
    <div className="page">
      <div className="page-head">
        <h1>Capture protocols</h1>
        <p>
          Session scripts, not taxonomy. A protocol has calibration poses, restart rules,
          repetitions and deliberately incorrect contrast trials, none of which are activities
          anybody performs for a reason. They live here so the atlas can stay a map of what exists
          rather than a list of what we filmed.
        </p>
      </div>

      <div className="scroll" style={{ flex: 1, minHeight: 0, padding: '16px 20px' }}>
        {PROTOCOLS.map((protocol) => {
          const isOpen = openId === protocol.id
          const contrastCount = protocol.blocks.reduce(
            (n, b) => n + b.steps.filter((s) => s.contrast).length,
            0,
          )
          const restartCount = protocol.blocks.reduce(
            (n, b) => n + b.steps.filter((s) => s.restart).length,
            0,
          )
          return (
            <section
              key={protocol.id}
              style={{
                border: '1px solid var(--line)',
                borderRadius: 10,
                background: 'var(--panel)',
                padding: 16,
                marginBottom: 16,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, flexWrap: 'wrap' }}>
                <h2 style={{ margin: 0, fontSize: 16 }}>{protocol.name}</h2>
                <span className="mono" style={{ color: 'var(--faint)' }}>
                  {protocol.blocks.length} blocks · {stepCount(protocol)} steps · {restartCount}{' '}
                  restart rules · {contrastCount} contrast
                </span>
                <button
                  className="chip"
                  style={{ marginLeft: 'auto' }}
                  onClick={() => setOpenId(isOpen ? '' : protocol.id)}
                >
                  {isOpen ? 'Collapse' : 'Expand'}
                </button>
              </div>

              <p style={{ color: 'var(--dim)', marginTop: 8, maxWidth: '80ch' }}>{protocol.summary}</p>

              <dl className="kv" style={{ marginTop: 12, maxWidth: '80ch' }}>
                <dt>Why</dt>
                <dd style={{ color: 'var(--dim)' }}>{protocol.rationale}</dd>
                <dt>Duration</dt>
                <dd>{protocol.duration}</dd>
                <dt>Equipment</dt>
                <dd style={{ color: 'var(--dim)' }}>{protocol.equipment.join(' · ')}</dd>
              </dl>

              {protocol.caveat && (
                <div className="callout" data-tone="warn" style={{ marginTop: 12, maxWidth: '80ch' }}>
                  {protocol.caveat}
                </div>
              )}

              {isOpen &&
                protocol.blocks.map((block, bi) => (
                  <div key={block.id} style={{ marginTop: 20 }}>
                    <h3 style={{ fontSize: 13, margin: '0 0 2px' }}>
                      <span className="mono" style={{ color: 'var(--faint)' }}>
                        {String(bi + 1).padStart(2, '0')}
                      </span>{' '}
                      {block.title}
                    </h3>
                    <p style={{ color: 'var(--faint)', margin: '0 0 8px', maxWidth: '78ch' }}>
                      {block.purpose}
                    </p>
                    <ol style={{ margin: 0, paddingLeft: 22, display: 'grid', gap: 7 }}>
                      {block.steps.map((step, si) => (
                        <li key={si} style={{ maxWidth: '78ch' }}>
                          <span style={{ color: step.contrast ? 'var(--public)' : 'var(--text)' }}>
                            {step.text}
                          </span>
                          {step.contrast && (
                            <span className="chip" data-size="sm" data-tone="amber" data-on="true" style={{ marginLeft: 6 }}>
                              contrast trial
                            </span>
                          )}
                          {step.cue && (
                            <div style={{ color: 'var(--dim)' }}>
                              <span className="mono" style={{ color: 'var(--faint)' }}>
                                done when
                              </span>{' '}
                              {step.cue}
                            </div>
                          )}
                          {step.restart && (
                            <div style={{ color: 'var(--dim)' }}>
                              <span className="mono" style={{ color: 'var(--rose)' }}>
                                restart if
                              </span>{' '}
                              {step.restart}
                            </div>
                          )}
                          {step.exercises?.map((nodeId) => (
                            <button
                              key={nodeId}
                              className="chip"
                              data-size="sm"
                              style={{ marginTop: 3 }}
                              onClick={() => open(nodeId)}
                            >
                              → {getNode(nodeId)?.title ?? nodeId}
                            </button>
                          ))}
                        </li>
                      ))}
                    </ol>
                  </div>
                ))}
            </section>
          )
        })}
      </div>
    </div>
  )
}
