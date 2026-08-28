'use client'

import { ancestors, getNode } from '@/lib/taxonomy'
import { useAtlas } from '@/lib/store'

export function Breadcrumb() {
  const { focusId, setFocus, setSelected } = useAtlas()
  const chain = focusId ? ancestors(focusId) : []
  const focusNode = getNode(focusId)

  return (
    <div className="overlay breadcrumb">
      <button
        className="crumb"
        data-current={!focusId}
        onClick={() => {
          setFocus(null)
          setSelected(null)
        }}
      >
        World
      </button>
      {chain.map((node) => (
        <span key={node.id} style={{ display: 'contents' }}>
          <span className="crumb-sep">›</span>
          <button
            className="crumb"
            data-current={node.id === focusId}
            onClick={() => {
              setFocus(node.id)
              setSelected(node.id)
            }}
          >
            {node.title}
          </button>
        </span>
      ))}
      {focusNode && (
        <span className="mono" style={{ color: 'var(--faint)', marginLeft: 6 }}>
          Z{focusNode.level + 1} · {focusNode.childIds.length} children · {focusNode.leafCount} leaves
        </span>
      )}
    </div>
  )
}
