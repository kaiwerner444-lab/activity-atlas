'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { search } from '@/lib/search'
import { useAtlas } from '@/lib/store'
import { coverageBadge } from '@/lib/colors'
import type { AtlasNode } from '@/lib/types'

// Search is a teleport, not a filter of the current camera. Picking a result
// moves the map to that node rather than hiding everything else.

const BADGE_COLOR = { ours: 'var(--blue)', public: 'var(--amber)', empty: 'var(--faint)' } as const

export function SearchPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const { setFocus, setSelected } = useAtlas()
  const router = useRouter()

  useEffect(() => {
    const openHandler = () => setOpen(true)
    window.addEventListener('atlas:search', openHandler)
    const keyHandler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      const typing =
        target &&
        (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)
      if (!typing && e.key === '/') {
        e.preventDefault()
        setOpen(true)
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', keyHandler)
    return () => {
      window.removeEventListener('atlas:search', openHandler)
      window.removeEventListener('keydown', keyHandler)
    }
  }, [])

  useEffect(() => {
    if (open) {
      setActive(0)
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }, [open])

  const hits = useMemo(() => search(query, 30), [query])

  const grouped = useMemo(() => {
    const byDomain = new Map<string, AtlasNode[]>()
    for (const h of hits) {
      const domain = h.node.path[0]
      const list = byDomain.get(domain)
      if (list) list.push(h.node)
      else byDomain.set(domain, [h.node])
    }
    return Array.from(byDomain.entries())
  }, [hits])

  const flat = useMemo(() => grouped.flatMap(([, nodes]) => nodes), [grouped])

  const go = (node: AtlasNode) => {
    // Focus the parent so the target is visible in context, then select it.
    setFocus(node.childIds.length > 0 ? node.id : node.parentId)
    setSelected(node.id)
    setOpen(false)
    setQuery('')
    router.push('/')
  }

  if (!open) return null

  return (
    <div className="palette-backdrop" onMouseDown={() => setOpen(false)}>
      <div className="palette" onMouseDown={(e) => e.stopPropagation()}>
        <input
          ref={inputRef}
          value={query}
          placeholder="Search activities, objects, tools, primitives"
          onChange={(e) => {
            setQuery(e.target.value)
            setActive(0)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setOpen(false)
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setActive((a) => Math.min(a + 1, flat.length - 1))
            }
            if (e.key === 'ArrowUp') {
              e.preventDefault()
              setActive((a) => Math.max(a - 1, 0))
            }
            if (e.key === 'Enter' && flat[active]) go(flat[active])
          }}
        />
        <div className="scroll" style={{ minHeight: 0 }}>
          {query.length < 2 ? (
            <div className="empty">
              Type at least two characters. Try &ldquo;crimp&rdquo;, &ldquo;fold&rdquo;,
              &ldquo;recover&rdquo; or &ldquo;Deutsch&rdquo;.
            </div>
          ) : flat.length === 0 ? (
            <div className="empty">Nothing in the seed matches that yet.</div>
          ) : (
            grouped.map(([domain, nodes]) => (
              <div key={domain}>
                <div
                  className="mono"
                  style={{
                    padding: '7px 15px 3px',
                    color: 'var(--faint)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                  }}
                >
                  {domain}
                </div>
                {nodes.map((node) => {
                  const idx = flat.indexOf(node)
                  return (
                    <div
                      key={node.id}
                      className="palette-row"
                      data-active={idx === active}
                      onMouseEnter={() => setActive(idx)}
                      onClick={() => go(node)}
                    >
                      <span
                        className="dot"
                        style={{ background: BADGE_COLOR[coverageBadge(node)] }}
                        title={coverageBadge(node)}
                      />
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <div>{node.title}</div>
                        <div className="palette-path">{node.path.slice(0, -1).join(' › ')}</div>
                      </div>
                      <span className="mono" style={{ color: 'var(--faint)' }}>
                        gap {node.gap.toFixed(2)}
                      </span>
                    </div>
                  )
                })}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
