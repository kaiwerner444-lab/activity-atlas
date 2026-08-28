'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { LAYOUT, WORLD_FRAME, WORLD_RADIUS, frameHeight, type NodePoint } from '@/lib/layout'
import { ATLAS, ancestors, getNode, kinNodes } from '@/lib/taxonomy'
import { nodeStyle, domainColor, HIGHLIGHT_MODES } from '@/lib/colors'
import { collectorsOn } from '@/lib/filters'
import { useAtlas } from '@/lib/store'
import { COLLECTOR_BY_ID } from '@/content/collectors'
import type { AtlasNode } from '@/lib/types'

// Semantic zoom over a mind map. Scrolling in far enough that a group would fill
// the frame enters that group, so one continuous gesture walks World -> domain
// -> family -> procedure without a single click.

interface Camera {
  cx: number
  cy: number
  /** Half-height of the visible world region. */
  h: number
}

function worldCamera(aspect: number): Camera {
  return {
    cx: WORLD_FRAME.fx,
    cy: WORLD_FRAME.fy,
    // Labels overhang the points they belong to, so the world needs more air
    // than a tight bounding box would give it.
    h: Math.max(WORLD_FRAME.fh, WORLD_FRAME.fw / Math.max(aspect, 0.2)) * 1.24,
  }
}
const EASE = (t: number) => 1 - Math.pow(1 - t, 3)
const DURATION = 420
const round2 = (v: number) => Math.round(v * 100) / 100

function cameraFor(point: NodePoint | undefined, aspect: number): Camera {
  if (!point) return worldCamera(aspect)
  return { cx: point.fx, cy: point.fy, h: Math.max(frameHeight(point, aspect), 100) }
}

interface Drawn {
  node: AtlasNode
  point: NodePoint
  relDepth: number
}

interface Label {
  id: string
  node: AtlasNode
  /** 0 = the level you are choosing between, 1 = one level deeper, 2 = context. */
  tier: 0 | 1 | 2
  x: number
  y: number
  font: number
  lines: string[]
  sub: string | null
}

function wrapLabel(title: string, maxChars: number): string[] {
  const words = title.split(' ')
  const out: string[] = []
  let current = ''
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word
    if (candidate.length <= maxChars) current = candidate
    else {
      if (current) out.push(current)
      current = word
    }
  }
  if (current) out.push(current)
  return out.slice(0, 3)
}

/**
 * Greedy label placement on a coarse grid. There are no dots or lines here, so
 * the text is the map: two words on top of each other is not a cosmetic problem,
 * it is a hole in the data. Anything that cannot find clear space after a few
 * nudges is dropped rather than drawn over its neighbour.
 */
function placeLabels(items: Label[], upp: number): Label[] {
  const CELL = 1
  const taken: { x0: number; x1: number; y0: number; y1: number }[] = []
  const grid = new Map<string, number[]>()
  const out: Label[] = []

  const cellSize = upp * 90
  const key = (cx: number, cy: number) => `${cx}|${cy}`

  const collides = (x0: number, x1: number, y0: number, y1: number) => {
    const cx0 = Math.floor(x0 / cellSize)
    const cx1 = Math.floor(x1 / cellSize)
    const cy0 = Math.floor(y0 / cellSize)
    const cy1 = Math.floor(y1 / cellSize)
    for (let cx = cx0 - CELL; cx <= cx1 + CELL; cx++) {
      for (let cy = cy0 - CELL; cy <= cy1 + CELL; cy++) {
        for (const idx of grid.get(key(cx, cy)) ?? []) {
          const b = taken[idx]
          if (x0 < b.x1 && x1 > b.x0 && y0 < b.y1 && y1 > b.y0) return true
        }
      }
    }
    return false
  }

  const insert = (x0: number, x1: number, y0: number, y1: number) => {
    const idx = taken.push({ x0, x1, y0, y1 }) - 1
    for (let cx = Math.floor(x0 / cellSize); cx <= Math.floor(x1 / cellSize); cx++) {
      for (let cy = Math.floor(y0 / cellSize); cy <= Math.floor(y1 / cellSize); cy++) {
        const k = key(cx, cy)
        const list = grid.get(k)
        if (list) list.push(idx)
        else grid.set(k, [idx])
      }
    }
  }

  for (const item of items) {
    const widest = Math.max(...item.lines.map((l) => l.length), item.sub ? item.sub.length * 0.8 : 0)
    // Domain names are set in bold letter-spaced caps, which are far wider per
    // character than the body text; measuring them as body text is what lets two
    // of them end up on the same pixels.
    const perChar = item.node.level === 0 ? 0.68 : 0.55
    const w = upp * widest * item.font * perChar + upp * 10
    const h = upp * ((item.lines.length + (item.sub ? 0.9 : 0)) * item.font * 1.2 + 10)
    let placed = false
    // Search outward in a small spiral rather than straight up and down: two
    // long domain names side by side can only be separated sideways.
    const offsets: [number, number][] = [[0, 0]]
    for (let step = 1; step <= 6; step++) {
      for (const [ox, oy] of [
        [0, -1],
        [0, 1],
        [-1, 0],
        [1, 0],
        [-1, -1],
        [1, -1],
        [-1, 1],
        [1, 1],
      ] as [number, number][]) {
        offsets.push([ox * step * w * 0.6, oy * step * h * 0.78])
      }
    }
    for (const [dx, dy] of offsets) {
      const x = item.x + dx
      const y = item.y + dy
      const x0 = x - w / 2
      const x1 = x + w / 2
      const y0 = y - h / 2
      const y1 = y + h / 2
      if (collides(x0, x1, y0, y1)) continue
      insert(x0, x1, y0, y1)
      out.push({ ...item, x, y })
      placed = true
      break
    }
    // Tier 0 is the level the user is actually choosing between, so it is drawn
    // even if it has to sit tight against a neighbour.
    if (!placed && item.tier === 0) out.push(item)
  }
  return out
}


export function AtlasMap() {
  const {
    focusId,
    selectedId,
    setFocus,
    setSelected,
    filters,
    matches,
    highlight,
    showKin,
    createPlan,
    addToPlan,
    plans,
  } = useAtlas()

  const svgRef = useRef<SVGSVGElement>(null)
  const [size, setSize] = useState({ w: 1200, h: 800 })
  const aspectRef = useRef(1.5)
  const [camera, setCamera] = useState<Camera>(() => worldCamera(1.5))
  const cameraRef = useRef(camera)
  cameraRef.current = camera
  const animRef = useRef<number | null>(null)

  const [hover, setHover] = useState<{ node: AtlasNode; x: number; y: number } | null>(null)
  const [panning, setPanning] = useState(false)
  const [lassoIds, setLassoIds] = useState<string[]>([])
  const [lasso, setLasso] = useState<{ x0: number; y0: number; x1: number; y1: number } | null>(null)
  const [legendOpen, setLegendOpen] = useState(false)

  useEffect(() => {
    const el = svgRef.current?.parentElement
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      if (width > 0 && height > 0) setSize({ w: width, h: height })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const flyTo = useCallback((target: Camera) => {
    if (animRef.current) cancelAnimationFrame(animRef.current)
    const from = cameraRef.current
    const start = performance.now()
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / DURATION)
      const e = EASE(t)
      const next = {
        cx: from.cx + (target.cx - from.cx) * e,
        cy: from.cy + (target.cy - from.cy) * e,
        h: from.h + (target.h - from.h) * e,
      }
      cameraRef.current = next
      setCamera(next)
      if (t < 1) animRef.current = requestAnimationFrame(step)
    }
    animRef.current = requestAnimationFrame(step)
  }, [])

  // A focus change that came from the wheel is already where the camera is.
  // Flying to it would fight the gesture, so only animate the other sources.
  const wheelFocusRef = useRef(false)
  useEffect(() => {
    if (wheelFocusRef.current) {
      wheelFocusRef.current = false
      return
    }
    flyTo(cameraFor(focusId ? LAYOUT.get(focusId) : undefined, aspectRef.current))
  }, [focusId, flyTo])

  const focusNode = getNode(focusId)

  const drawn = useMemo<Drawn[]>(() => {
    const out: Drawn[] = []
    const push = (node: AtlasNode, relDepth: number) => {
      const point = LAYOUT.get(node.id)
      if (point) out.push({ node, point, relDepth })
    }

    // Detail inside what you are looking at.
    const inFocus = new Set<string>()
    const walk = (node: AtlasNode, relDepth: number) => {
      inFocus.add(node.id)
      push(node, relDepth)
      if (relDepth >= 2) return
      for (const childId of node.childIds) walk(ATLAS.nodes.get(childId)!, relDepth + 1)
    }
    if (focusNode) walk(focusNode, 0)
    else for (const root of ATLAS.roots) walk(root, 0)

    // Context everywhere else. Going into one cluster must not delete the rest
    // of the map: the neighbours stay, dimmed, with their shape intact, so you
    // can see what you are next to and scroll straight back out into it.
    const contextLevel = focusNode ? Math.min(focusNode.level + 1, 3) : 2
    for (const node of ATLAS.all) {
      if (inFocus.has(node.id)) continue
      if (node.level > contextLevel) continue
      push(node, -1)
    }
    return out
  }, [focusNode])

  const kin = useMemo(() => {
    if (!showKin || !selectedId) return []
    return kinNodes(selectedId, 10)
  }, [showKin, selectedId])

  const aspect = size.w / size.h
  aspectRef.current = aspect
  const upp = (camera.h * 2) / size.h
  const viewBox = [
    round2(camera.cx - camera.h * aspect),
    round2(camera.cy - camera.h),
    round2(camera.h * 2 * aspect),
    round2(camera.h * 2),
  ].join(' ')

  const filtersOn =
    Object.values(filters.facets).some((v) => v.length) ||
    filters.primitives.length > 0 ||
    filters.collectors.length > 0 ||
    filters.failOnly

  // The map is made of words. Tier decides size and weight; placement decides
  // whether a word survives at this zoom at all.
  const labels = useMemo(() => {
    const FONT = [15, 13, 11.5, 10.5]
    const items: Label[] = []
    for (const { node, point, relDepth } of drawn) {
      let tier: 0 | 1 | 2
      if (focusNode) {
        if (relDepth === 1) tier = 0
        else if (relDepth === 2) tier = 1
        else if (relDepth < 0) tier = 2
        else continue
      } else {
        if (node.level === 0) tier = 0
        else if (node.level === 1) tier = 1
        else continue
      }
      const font = tier === 0 ? FONT[node.level] : tier === 1 ? 10.5 : 9.5
      // Domain names sit on their hub. The hubs are what the packing spaced
      // apart, so that is the one place a title is guaranteed room; pushing it
      // to the top of the cluster walks it straight into the neighbour above.
      items.push({
        id: node.id,
        node,
        tier,
        x: point.x,
        y: point.y,
        font,
        lines: wrapLabel(node.title, node.level === 0 ? 14 : tier === 0 ? 24 : 20),
        sub:
          tier === 0 && node.level > 0
            ? `${node.leafCount} · gap ${node.gap.toFixed(2)}` +
              (node.ourHours > 0 ? ` · ${Math.round(node.ourHours)}h` : '') +
              (node.facets.partner !== 'none' ? ' · partner' : '') +
              (node.facets.capital === 'capex' ? ' · capex' : '')
            : null,
      })
    }
    items.sort((a, b) => a.tier - b.tier || b.node.gap - a.node.gap)
    return placeLabels(items, upp)
  }, [drawn, upp, focusNode])


  // ---- interaction --------------------------------------------------------
  const focusRef = useRef(focusId)
  focusRef.current = focusId

  /** Nearest group at the current level whose frame contains the camera. */
  const nearestGroup = useCallback((cx: number, cy: number) => {
    const current = focusRef.current ? getNode(focusRef.current) : null
    const candidates = (
      current ? current.childIds.map((id) => ATLAS.nodes.get(id)!) : ATLAS.roots
    ).filter((n) => n.childIds.length > 0)
    let best: { node: AtlasNode; point: NodePoint; d: number } | null = null
    for (const node of candidates) {
      const point = LAYOUT.get(node.id)
      if (!point) continue
      const d = Math.hypot(point.fx - cx, point.fy - cy)
      if (d > point.fit) continue
      if (!best || d < best.d) best = { node, point, d }
    }
    return best
  }, [])

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return
    const handler = (e: WheelEvent) => {
      e.preventDefault()
      const cam = cameraRef.current
      // Normalise line and page scroll modes so a wheel and a trackpad travel a
      // comparable distance per gesture.
      const raw = e.deltaMode === 1 ? e.deltaY * 18 : e.deltaMode === 2 ? e.deltaY * 400 : e.deltaY
      const factor = Math.exp(Math.max(-150, Math.min(150, raw)) * 0.0065)
      const zoomingIn = factor < 1

      // Floor the zoom against the current context: once a group fills the
      // frame there is nothing further in, and depth is the drill's job.
      const currentId = focusRef.current
      const currentPoint = currentId ? LAYOUT.get(currentId) : undefined
      const contextH = currentPoint ? frameHeight(currentPoint, aspectRef.current) : 0
      const floor = Math.max(60, contextH * 0.38)
      const h = Math.max(floor, Math.min(WORLD_RADIUS * 1.35, cam.h * factor))

      const rect = svg.getBoundingClientRect()
      const scale = (cam.h * 2) / rect.height
      const ax = cam.cx + (e.clientX - rect.left - rect.width / 2) * scale
      const ay = cam.cy + (e.clientY - rect.top - rect.height / 2) * scale
      const ratio = h / cam.h
      let cx = ax + (cam.cx - ax) * ratio
      let cy = ay + (cam.cy - ay) * ratio

      // Zooming in is a request to go into something, not to fall between two
      // things. Ease the centre toward the group being entered so the gesture
      // lands on content instead of on the gap next to it.
      const target = zoomingIn ? nearestGroup(cx, cy) : currentId ? LAYOUT.get(currentId) : null
      if (target) {
        const tx = 'point' in target ? target.point.fx : target.fx
        const ty = 'point' in target ? target.point.fy : target.fy
        const pull = zoomingIn ? 0.22 : 0.1
        cx += (tx - cx) * pull
        cy += (ty - cy) * pull
      }

      const next: Camera = { h, cx, cy }
      if (animRef.current) cancelAnimationFrame(animRef.current)
      cameraRef.current = next
      setCamera(next)

      // Level crossing.
      const current = currentId ? getNode(currentId) : null
      if (current) {
        const self = LAYOUT.get(current.id)
        if (self && h > frameHeight(self, aspectRef.current) * 1.8) {
          wheelFocusRef.current = true
          focusRef.current = current.parentId
          setFocus(current.parentId)
          return
        }
      }
      const entering = zoomingIn ? nearestGroup(cx, cy) : null
      if (entering && h < frameHeight(entering.point, aspectRef.current) * 1.06) {
        wheelFocusRef.current = true
        focusRef.current = entering.node.id
        setFocus(entering.node.id)
        setSelected(entering.node.id)
      }
    }
    svg.addEventListener('wheel', handler, { passive: false })
    return () => svg.removeEventListener('wheel', handler)
  }, [nearestGroup, setFocus, setSelected])

  const toWorld = useCallback(
    (clientX: number, clientY: number) => {
      const rect = svgRef.current!.getBoundingClientRect()
      const scale = (camera.h * 2) / rect.height
      return {
        x: camera.cx + (clientX - rect.left - rect.width / 2) * scale,
        y: camera.cy + (clientY - rect.top - rect.height / 2) * scale,
      }
    },
    [camera],
  )

  const dragState = useRef<{ x: number; y: number; cx: number; cy: number } | null>(null)

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    if (e.shiftKey) {
      const p = toWorld(e.clientX, e.clientY)
      setLasso({ x0: p.x, y0: p.y, x1: p.x, y1: p.y })
      return
    }
    dragState.current = { x: e.clientX, y: e.clientY, cx: camera.cx, cy: camera.cy }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    if (lasso) {
      const p = toWorld(e.clientX, e.clientY)
      setLasso((l) => (l ? { ...l, x1: p.x, y1: p.y } : l))
      return
    }
    const d = dragState.current
    if (!d) return
    const rect = svgRef.current!.getBoundingClientRect()
    const scale = (camera.h * 2) / rect.height
    if (!panning && Math.hypot(e.clientX - d.x, e.clientY - d.y) > 3) setPanning(true)
    if (animRef.current) cancelAnimationFrame(animRef.current)
    const next = {
      ...camera,
      cx: d.cx - (e.clientX - d.x) * scale,
      cy: d.cy - (e.clientY - d.y) * scale,
    }
    cameraRef.current = next
    setCamera(next)
  }

  const onPointerUp = () => {
    if (lasso) {
      const minX = Math.min(lasso.x0, lasso.x1)
      const maxX = Math.max(lasso.x0, lasso.x1)
      const minY = Math.min(lasso.y0, lasso.y1)
      const maxY = Math.max(lasso.y0, lasso.y1)
      const picked = drawn
        .filter((d) => d.relDepth >= 0)
        .filter(
          (d) => d.point.x >= minX && d.point.x <= maxX && d.point.y >= minY && d.point.y <= maxY,
        )
        .map((d) => d.node.id)
      setLassoIds(Array.from(new Set(picked)))
      setLasso(null)
    }
    dragState.current = null
    // Let the click that follows this release read a settled panning flag.
    requestAnimationFrame(() => setPanning(false))
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return
      if (e.key === 'Escape') {
        if (lassoIds.length) {
          setLassoIds([])
          return
        }
        setFocus(getNode(focusId)?.parentId ?? null)
      }
      if (e.key === 'f' || e.key === 'F') {
        const node = getNode(selectedId)
        if (node) setFocus(node.childIds.length ? node.id : node.parentId)
      }
      if (e.key === '0') setFocus(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [focusId, selectedId, setFocus, lassoIds.length])

  const enter = (node: AtlasNode, relDepth: number) => {
    if (panning || relDepth < 0) return
    setSelected(node.id)
    if (node.childIds.length > 0 && relDepth >= 1) setFocus(node.id)
  }

  const activeMode = HIGHLIGHT_MODES.find((m) => m.id === highlight)!

  return (
    <>
      <svg
        ref={svgRef}
        className="mapsvg"
        viewBox={viewBox}
        data-panning={panning}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        onDoubleClick={() => setFocus(getNode(focusId)?.parentId ?? null)}
      >
        {kin.length > 0 && selectedId && LAYOUT.get(selectedId) && (
          <g>
            {kin.map((k) => {
              const b = LAYOUT.get(k.id)
              if (!b) return null
              return (
                <text
                  key={`k-${k.id}`}
                  x={b.x}
                  y={b.y}
                  textAnchor="middle"
                  className="node-label"
                  fontSize={upp * 11}
                  fill="var(--iris)"
                  pointerEvents="none"
                >
                  {k.title}
                </text>
              )
            })}
          </g>
        )}

        {/* The map is only words. Grouping is proximity and colour: no lines,
            no dots, no boxes drawn between anything. */}
        <g>
          {labels.map((label) => {
            const { node, tier } = label
            const isMatch = !filtersOn || matches.nodes.has(node.id)
            if (filtersOn && filters.mode === 'isolate' && !isMatch) return null

            const playerHit =
              highlight === 'players' && filters.collectors.some((c) => collectorsOn(node.id).has(c))
            const style = nodeStyle(node, highlight, playerHit)
            const selected = selectedId === node.id
            const inLasso = lassoIds.includes(node.id)

            let fill: string
            if (selected) fill = '#ffffff'
            else if (inLasso) fill = 'var(--lime)'
            else if (node.level === 0) fill = domainColor(node.id, 60, 74)
            else fill = style.fill

            // Emphasis is carried by hue and weight, not by fading text out.
            // Every label that is drawn stays legible; only filtered-out ones
            // are allowed to recede.
            const weight = node.level === 0 ? 650 : style.emphasis >= 0.85 ? 600 : tier === 0 ? 500 : 400
            let opacity = (tier === 0 ? 1 : tier === 1 ? 0.94 : 0.76) * (0.88 + style.emphasis * 0.12)
            if (node.level === 0 || selected) opacity = 1
            if (filtersOn && !isMatch) opacity *= 0.28

            const lh = upp * label.font * 1.2
            const top = label.y - ((label.lines.length - 1) / 2) * lh

            return (
              <g
                key={label.id}
                opacity={opacity}
                style={{ cursor: 'pointer' }}
                onPointerEnter={(e) => setHover({ node, x: e.clientX, y: e.clientY })}
                onPointerMove={(e) => setHover({ node, x: e.clientX, y: e.clientY })}
                onPointerLeave={() => setHover(null)}
                onClick={(e) => {
                  e.stopPropagation()
                  if (e.shiftKey) {
                    setLassoIds((prev) =>
                      prev.includes(node.id) ? prev.filter((i) => i !== node.id) : [...prev, node.id],
                    )
                    return
                  }
                  enter(node, tier === 2 ? -1 : 1)
                }}
              >
                {label.lines.map((line, i) => (
                  <text
                    key={i}
                    className="node-label"
                    x={label.x}
                    y={top + i * lh}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={upp * label.font}
                    fontWeight={weight}
                    letterSpacing={node.level === 0 ? upp * 0.9 : undefined}
                    fill={fill}
                  >
                    {node.fail && i === 0 ? '↺ ' : ''}
                    {node.level === 0 ? line.toUpperCase() : line}
                  </text>
                ))}
                {label.sub && (
                  <text
                    className="node-sub"
                    x={label.x}
                    y={top + label.lines.length * lh + upp * 1.5}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={upp * 9}
                  >
                    {label.sub}
                  </text>
                )}
              </g>
            )
          })}
        </g>


        {lasso && (
          <rect
            x={Math.min(lasso.x0, lasso.x1)}
            y={Math.min(lasso.y0, lasso.y1)}
            width={Math.abs(lasso.x1 - lasso.x0)}
            height={Math.abs(lasso.y1 - lasso.y0)}
            fill="rgba(163,219,106,0.08)"
            stroke="rgb(163,219,106)"
            strokeWidth={upp}
          />
        )}
      </svg>

      {hover && <HoverCard node={hover.node} x={hover.x} y={hover.y} />}

      <div className="overlay legend">
        <button className="legend-toggle" onClick={() => setLegendOpen((v) => !v)}>
          {legendOpen ? 'Hide key' : 'Key'}
        </button>
        {legendOpen && (
          <div style={{ marginTop: 8 }}>
            <div style={{ color: 'var(--dim)', marginBottom: 5 }}>{activeMode.legend}</div>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <span className="legend-row">
                <i className="swatch" style={{ background: 'var(--ours)' }} /> ours
              </span>
              <span className="legend-row">
                <i className="swatch" style={{ background: 'var(--public)' }} /> public
              </span>
              <span className="legend-row">
                <i className="swatch" style={{ background: 'rgb(200, 207, 223)' }} /> covered
                elsewhere
              </span>
            </div>
            <div style={{ color: 'var(--faint)', marginTop: 4 }}>
              ↺ marks a failure or rework activity. Domain names carry their own colour, everything
              else is coloured by state. Nothing is drawn between labels, so a group is whatever sits
              together.
            </div>
          </div>
        )}
      </div>

      <div className="overlay hint">
        scroll to go deeper · drag pan · click enter · esc up · shift-drag lasso · / search
      </div>

      {lassoIds.length > 0 && (
        <LassoBar
          ids={lassoIds}
          plans={plans}
          onClear={() => setLassoIds([])}
          onCreate={(name) => {
            createPlan(name, lassoIds)
            setLassoIds([])
          }}
          onAdd={(planId) => {
            addToPlan(planId, lassoIds)
            setLassoIds([])
          }}
        />
      )}
    </>
  )
}

function HoverCard({ node, x, y }: { node: AtlasNode; x: number; y: number }) {
  const collectors = Array.from(collectorsOn(node.id))
  return (
    <div
      className="tooltip"
      style={{
        left: Math.min(x + 14, window.innerWidth - 320),
        top: Math.min(y + 14, window.innerHeight - 180),
      }}
    >
      <div style={{ fontWeight: 600, marginBottom: 3 }}>{node.title}</div>
      <div className="mono" style={{ color: 'var(--faint)', marginBottom: 6 }}>
        {node.path.slice(0, -1).join(' › ') || 'root domain'}
      </div>
      <div className="chips" style={{ marginBottom: 6 }}>
        <span className="chip" data-size="sm">
          {node.facets.setting}
        </span>
        <span className="chip" data-size="sm">
          contact {node.facets.contact}
        </span>
        <span className="chip" data-size="sm">
          {node.facets.saturation === 'empty' ? 'no public data' : `public ${node.facets.saturation}`}
        </span>
      </div>
      <div style={{ color: 'var(--dim)' }}>
        gap {node.gap.toFixed(2)} · {node.leafCount} leaves ·{' '}
        {node.ourHours > 0 ? `${Math.round(node.ourHours)}h ours` : 'no hours yet'}
      </div>
      {collectors.length > 0 && (
        <div style={{ color: 'var(--faint)', marginTop: 4 }}>
          {collectors.map((c) => COLLECTOR_BY_ID[c]?.name ?? c).join(', ')}
        </div>
      )}
    </div>
  )
}

function LassoBar({
  ids,
  plans,
  onClear,
  onCreate,
  onAdd,
}: {
  ids: string[]
  plans: { id: string; name: string }[]
  onClear: () => void
  onCreate: (name: string) => void
  onAdd: (planId: string) => void
}) {
  const [name, setName] = useState('')
  return (
    <div className="overlay lassobar">
      <strong>{ids.length} selected</strong>
      {plans.length > 0 && (
        <select className="btn" defaultValue="" onChange={(e) => e.target.value && onAdd(e.target.value)}>
          <option value="">Add to plan…</option>
          {plans.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>
      )}
      <input
        className="btn"
        placeholder="New plan name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && name.trim()) onCreate(name.trim())
        }}
      />
      <button className="btn" data-variant="primary" disabled={!name.trim()} onClick={() => onCreate(name.trim())}>
        Create plan
      </button>
      <button className="btn" onClick={onClear}>
        Clear
      </button>
    </div>
  )
}
