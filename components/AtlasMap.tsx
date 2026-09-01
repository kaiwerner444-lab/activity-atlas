'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { pointer, select } from 'd3-selection'
import { zoom as d3zoom, type D3ZoomEvent, type ZoomBehavior } from 'd3-zoom'
import 'd3-transition'
import {
  cameraFromTransform,
  flightDuration,
  transformFromCamera,
  wheelDelta,
  type Camera,
} from '@/lib/camera'
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

function worldCamera(aspect: number): Camera {
  return {
    cx: WORLD_FRAME.fx,
    cy: WORLD_FRAME.fy,
    // Labels overhang the points they belong to, so the world needs more air
    // than a tight bounding box would give it.
    h: Math.max(WORLD_FRAME.fh, WORLD_FRAME.fw / Math.max(aspect, 0.2)) * 1.24,
  }
}
/** One level change per gesture. Trackpad inertia keeps firing after your
 *  fingers lift, and without this a flick falls through three levels at once. */
const LEVEL_COOLDOWN = 280
const round2 = (v: number) => Math.round(v * 100) / 100

/**
 * Past a point, zooming in stops adding information. Labels are a fixed size in
 * screen pixels, so a tighter camera on a small group does not reveal anything,
 * it just pushes three words into the corners of an empty screen. MIN_FRAME is
 * where that stops being worth doing.
 */
const MIN_FRAME = 300

function cameraFor(point: NodePoint | undefined, aspect: number): Camera {
  if (!point) return worldCamera(aspect)
  return { cx: point.fx, cy: point.fy, h: Math.max(frameHeight(point, aspect), MIN_FRAME) }
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
  /** 0..1 magnitude among the siblings on screen. Drives size and weight. */
  weight: number
  lines: string[]
  sub: string | null
  /** Measured box in world units, used as the click and hover target. */
  w: number
  h: number
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
    const box = { w, h }
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
      out.push({ ...item, x, y, ...box })
      placed = true
      break
    }
    // Tier 0 is the level the user is actually choosing between, so it is drawn
    // even if it has to sit tight against a neighbour.
    if (!placed && item.tier === 0) out.push({ ...item, ...box })
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
  const [hover, setHover] = useState<{ node: AtlasNode; x: number; y: number } | null>(null)
  const [panning, setPanning] = useState(false)
  const [lassoIds, setLassoIds] = useState<string[]>([])
  const [lasso, setLasso] = useState<{ x0: number; y0: number; x1: number; y1: number } | null>(null)
  const [legendOpen, setLegendOpen] = useState(false)
  const cameraRef = useRef(camera)
  cameraRef.current = camera
  const sizeRef = useRef(size)
  sizeRef.current = size

  // Measure the stage. Everything downstream (viewBox, label sizing, the zoom
  // transform) is derived from this, so it has to be real pixels rather than the
  // placeholder the component starts with.
  useEffect(() => {
    const host = svgRef.current?.parentElement
    if (!host) return
    // Read the same box d3 reads. Any gap between this and the box the zoom
    // behaviour measures shows up as the camera and the pointer anchor
    // disagreeing about where the cursor is, which drifts a little further with
    // every notch and eventually enters the wrong branch entirely.
    const measure = () => {
      const { width, height } = host.getBoundingClientRect()
      if (width > 0 && height > 0) {
        setSize((prev) => (prev.w === width && prev.h === height ? prev : { w: width, h: height }))
      }
    }
    // Measure now rather than waiting to be told. A ResizeObserver's first
    // callback is asynchronous at best and, in some embedded browsers, never
    // arrives at all; until it does the map is rendering against a placeholder
    // viewport that nothing else agrees with.
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(host)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const zoomRef = useRef<ZoomBehavior<HTMLElement, unknown> | null>(null)
  /**
   * Crossing a level flies the camera into the group rather than leaving it
   * wherever the cursor happened to be. d3 cancels a running transition the
   * moment a new gesture starts, so this stays interruptible: keep scrolling and
   * you keep going, stop and you land squarely inside the thing you entered.
   */
  const gestureFocusRef = useRef(false)
  const lastLevelChange = useRef(0)
  const lastSource = useRef<string | null>(null)
  /** Whether the current gesture crossed a level, which is the only case the settle exists for. */
  const levelChanged = useRef(false)
  const focusRef = useRef(focusId)
  focusRef.current = focusId

  /**
   * True while the camera is being moved by us rather than by the user.
   *
   * This cannot be inferred from the zoom event. d3 keeps a wheel gesture alive
   * for 150ms after the last notch, and a transition started inside that window
   * reuses the same gesture object, inheriting its sourceEvent. The flight that
   * follows a level change therefore reads back as user input, re-runs the level
   * check, and drops straight back into the group it just left.
   */
  const flying = useRef(false)

  /** Move the camera by driving the zoom behaviour, so d3 stays the source of truth. */
  const applyCamera = useCallback((target: Camera, animate: boolean) => {
    const host = svgRef.current?.parentElement
    const z = zoomRef.current
    if (!host || !z) return
    const view = sizeRef.current
    const sel = select(host)
    const transform = transformFromCamera(target, view)
    flying.current = true
    if (animate) {
      sel
        .transition()
        .duration(flightDuration(cameraRef.current, target, view))
        .call(z.transform, transform)
        // A transition superseded before it starts fires "cancel", not
        // "interrupt". Missing that leaves the flag stuck on and every gesture
        // after it is silently treated as our own camera move.
        .on('end.flight interrupt.flight cancel.flight', () => {
          flying.current = false
        })
    } else {
      sel.call(z.transform, transform)
      flying.current = false
    }
  }, [])


  const focusNode = getNode(focusId)

  const drawn = useMemo<Drawn[]>(() => {
    const out: Drawn[] = []
    const push = (node: AtlasNode, relDepth: number) => {
      const point = LAYOUT.get(node.id)
      if (point) out.push({ node, point, relDepth })
    }

    // One level at a time. Drawing a node's children and grandchildren together
    // interleaves two ranks with nothing to tell them apart, which makes the
    // whole question "is this inside that?" unanswerable. Entering a group shows
    // exactly what is in it.
    const shown = new Set<string>()
    if (focusNode) {
      push(focusNode, 0)
      shown.add(focusNode.id)
      for (const childId of focusNode.childIds) {
        push(ATLAS.nodes.get(childId)!, 1)
        shown.add(childId)
      }
    } else {
      for (const root of ATLAS.roots) {
        push(root, 1)
        shown.add(root.id)
      }
    }

    // Siblings and the wider world stay as dim context so the map does not
    // vanish around you. Ancestors do not: the level you came through is named
    // in the breadcrumb, and repeating it on the map is what made a parent look
    // like one more option next to its own children.
    if (focusNode) {
      const ancestorIds = new Set(ancestors(focusNode.id).map((a) => a.id))
      for (const node of ATLAS.all) {
        if (shown.has(node.id) || ancestorIds.has(node.id)) continue
        if (node.level > focusNode.level) continue
        push(node, -1)
      }
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

  // The map is made of words, so the words have to carry the magnitudes. A
  // label's size is how much is in that field and how open it is: activities
  // underneath it, weighted by gap. Sizes are normalised against the siblings
  // actually on screen, so the contrast stays readable at every level instead of
  // collapsing once you are three levels deep and everything is small.
  const labels = useMemo(() => {
    const BASE = [15, 13.5, 12.5, 12]
    const magnitude = (node: AtlasNode) =>
      Math.sqrt(Math.max(1, node.leafCount)) * (0.45 + Math.min(1, node.gap))

    // Size is a ratio to the largest sibling, never a stretch across the range
    // of whatever happens to be on screen. Min-max normalisation makes the
    // smallest thing tiny and the largest huge no matter how close they really
    // are: two procedures with 2 leaves each and gaps of 0.31 and 0.33 came out
    // at twice the size of one another, which is a lie about the data.
    const primary = drawn.filter((d) => d.relDepth === 1)
    const hi = primary.length ? Math.max(...primary.map((d) => magnitude(d.node))) : 1

    const items: Label[] = []
    for (const { node, point, relDepth } of drawn) {
      let tier: 0 | 1 | 2
      if (relDepth === 1) tier = 0
      else if (relDepth < 0) tier = 2
      else continue

      const norm = tier === 0 ? magnitude(node) / (hi || 1) : 0
      const font = tier === 0 ? BASE[node.level] * (0.72 + norm * 0.58) : 10.5

      items.push({
        id: node.id,
        node,
        tier,
        weight: norm,
        x: point.x,
        y: point.y,
        font,
        lines: wrapLabel(node.title, node.level === 0 ? 14 : tier === 0 ? 24 : 20),
        sub:
          tier === 0
            ? `${node.leafCount} · gap ${node.gap.toFixed(2)}` +
              (node.ourHours > 0 ? ` · ${Math.round(node.ourHours)}h` : '') +
              (node.facets.partner !== 'none' ? ' · partner' : '') +
              (node.facets.capital === 'capex' ? ' · capex' : '')
            : null,
        w: 0,
        h: 0,
      })
    }
    // Place the heaviest first: if anything has to be nudged, it should be the
    // thing that matters least.
    items.sort((a, b) => a.tier - b.tier || b.weight - a.weight)
    return placeLabels(items, upp)
  }, [drawn, upp])

  // ---- interaction --------------------------------------------------------

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
      // Nearest wins outright, with no proximity test at all. Any bound strands
      // you somewhere: aim into the gap between two groups and nothing happens,
      // aim at the centre of a level and every child is equidistant and outside
      // its own extent. Zooming in is a request to go one level down, and the
      // only question worth answering is which one.
      const d = Math.hypot(point.fx - cx, point.fy - cy)
      if (!best || d < best.d) best = { node, point, d }
    }
    return best
  }, [])

  /**
   * Semantic level follows the scale. Zooming in far enough that a group would
   * be comfortably framed enters it; zooming back out past the current group
   * leaves it. The thresholds are asymmetric so the two cannot chatter against
   * each other, and a cooldown stops trackpad inertia falling through levels.
   */
  /**
   * Where the pointer is, in world units, asked of d3 rather than recomputed.
   *
   * Deriving this from the camera and a separately measured rect means two
   * sources of truth for the same number, and they drift: d3 anchors on the
   * host's own pixel box while the camera is derived from an observed content
   * box. Inverting d3's transform through d3's pointer cannot disagree with the
   * zoom that is actually being applied.
   */
  const pointerWorld = useCallback(
    (event: D3ZoomEvent<HTMLElement, unknown>, cam: Camera) => {
      const host = svgRef.current?.parentElement as HTMLElement | null
      const source = event.sourceEvent as { clientX?: number } | null
      if (!host || !source || source.clientX === undefined) return { x: cam.cx, y: cam.cy }
      const [x, y] = event.transform.invert(pointer(event.sourceEvent, host))
      return { x, y }
    },
    [],
  )

  const crossLevels = useCallback(
    (cam: Camera, zoomingIn: boolean, aim: { x: number; y: number }) => {
      const now = performance.now()
      if (now - lastLevelChange.current < LEVEL_COOLDOWN) return
      const aspect = aspectRef.current
      const currentId = focusRef.current
      const current = currentId ? getNode(currentId) : null

      // Direction decides which crossing is even considered. Exit and entry are
      // measured against different nodes, so a sibling with a larger frame can
      // satisfy the entry test the instant you leave its neighbour: scrolling
      // out then bounces in and out forever. Scrolling out can only ever leave.
      if (!zoomingIn && current) {
        const self = LAYOUT.get(current.id)
        if (self && cam.h > frameHeight(self, aspect) * 3.6) {
          lastLevelChange.current = now
          levelChanged.current = true
          focusRef.current = current.parentId
          setFocus(current.parentId)
          return
        }
      }

      if (!zoomingIn) return
      // Query from the pointer, not the viewport centre. Zoom is anchored on the
      // cursor, so the centre lags behind it and only converges after several
      // notches: aiming at one domain and being dropped into its neighbour was
      // the centre answering a question the user asked with the cursor.
      // Query from the pointer, not the viewport centre. Zoom is anchored on the
      // cursor, so the centre lags behind it and only converges after several
      // notches: aiming at one domain and being dropped into its neighbour was
      // the centre answering a question the user asked with the cursor.
      const entering = nearestGroup(aim.x, aim.y)
      // Enter well before the group fills the screen. The flight that follows
      // does the rest of the work, so the gesture stays short and the landing is
      // exact; waiting for a perfect fit is what made this take five notches.
      if (entering && cam.h < frameHeight(entering.point, aspect) * 2.8) {
        lastLevelChange.current = now
        levelChanged.current = true
        focusRef.current = entering.node.id
        setFocus(entering.node.id)
        setSelected(entering.node.id)
      }
    },
    [nearestGroup, setFocus, setSelected],
  )

  // d3-zoom owns wheel, drag and touch. Its wheel handling is the part worth
  // borrowing: delta modes, per-browser magnitudes and trackpad pinch (a wheel
  // event with ctrlKey) are all normalised, and it registers non-passively so
  // the page never scrolls underneath the map.
  useEffect(() => {
    // The behaviour listens on the stage element, not the svg. d3 reports the
    // pointer in the listener's own coordinate system, and an svg with a viewBox
    // reports world units while this camera works in pixels; mixing the two makes
    // the anchor drift a little further off with every notch until the view is
    // somewhere in deep space.
    const host = svgRef.current?.parentElement as HTMLElement | null
    if (!host) return
    const sel = select<HTMLElement, unknown>(host)
    const behavior = d3zoom<HTMLElement, unknown>()
      .wheelDelta(wheelDelta)
      .filter((event: MouseEvent | WheelEvent | TouchEvent) => {
        // Shift-drag is the lasso, so the zoom behaviour must not claim it.
        if ((event as MouseEvent).shiftKey && event.type !== 'wheel') return false
        return (!(event as MouseEvent).ctrlKey || event.type === 'wheel') && !(event as MouseEvent).button
      })
      .on('start', (event: D3ZoomEvent<HTMLElement, unknown>) => {
        setPanning(true)
        levelChanged.current = false
        // A real gesture means the user has taken the camera back, whatever we
        // thought we were doing with it.
        if (event.sourceEvent) flying.current = false
      })
      .on('end', () => {
        setPanning(false)
        // Settle, but only after a gesture that actually crossed a level.
        // Scrolling cancels the flight a crossing starts, which is right while
        // the gesture runs and wrong the moment it stops, leaving the view half
        // way between two levels. Zooming that stays within one level is left
        // alone: correcting it would be taking the map back off someone who
        // deliberately moved it.
        if (lastSource.current !== 'wheel' || !levelChanged.current) return
        levelChanged.current = false
        lastSource.current = null
        const point = focusRef.current ? LAYOUT.get(focusRef.current) : undefined
        applyCamera(cameraFor(point, aspectRef.current), true)
      })
      .on('zoom', (event: D3ZoomEvent<HTMLElement, unknown>) => {
        const fromUser = Boolean(event.sourceEvent) && !flying.current
        if (fromUser) lastSource.current = event.sourceEvent.type
        const previousH = cameraRef.current.h
        const cam = cameraFromTransform(event.transform, sizeRef.current)
        cameraRef.current = cam
        setCamera(cam)
        // Only a real gesture crosses levels. Programmatic flights must not, or
        // flying into a node would immediately drill past it.
        if (fromUser) crossLevels(cam, cam.h < previousH, pointerWorld(event, cam))
      })

    zoomRef.current = behavior
    sel.call(behavior)
    // Double click is "up one level" here, not d3's zoom-in.
    sel.on('dblclick.zoom', null)
    sel.call(behavior.transform, transformFromCamera(cameraRef.current, sizeRef.current))

    return () => {
      sel.on('.zoom', null)
      zoomRef.current = null
    }
  }, [crossLevels, applyCamera, pointerWorld])

  // Keep the scale bounded to something the atlas can actually show, and re-frame
  // on resize. The behaviour is installed before the first measurement, so its
  // seed transform is based on a guessed viewport; and the same camera needs a
  // different transform once the stage has a different size.
  useEffect(() => {
    const host = svgRef.current?.parentElement as HTMLElement | null
    const z = zoomRef.current
    if (!host || !z) return
    const world = worldCamera(size.w / size.h)
    z.scaleExtent([size.h / (2 * world.h * 1.15), size.h / (2 * MIN_FRAME * 0.7)])
    const framed = cameraFor(focusRef.current ? LAYOUT.get(focusRef.current) : undefined, size.w / size.h)
    select(host).call(z.transform, transformFromCamera(framed, size))
  }, [size])

  // A focus change from the wheel is already where the camera is; anything else
  // (click, breadcrumb, search, keyboard) gets flown to.
  useEffect(() => {
    if (gestureFocusRef.current) {
      gestureFocusRef.current = false
      return
    }
    applyCamera(cameraFor(focusId ? LAYOUT.get(focusId) : undefined, aspectRef.current), true)
  }, [focusId, applyCamera])

  // ---- lasso and click/drag discrimination --------------------------------
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

  // How far the pointer travelled during the current press. A click fires after
  // pointerup, so testing React state here would read whatever the last render
  // saw; a ref is the only thing up to date at the moment it matters.
  const dragDist = useRef(0)
  const pressOrigin = useRef<{ x: number; y: number } | null>(null)

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0) return
    dragDist.current = 0
    pressOrigin.current = { x: e.clientX, y: e.clientY }
    if (e.shiftKey) {
      const p = toWorld(e.clientX, e.clientY)
      setLasso({ x0: p.x, y0: p.y, x1: p.x, y1: p.y })
    }
  }

  const onPointerMove = (e: React.PointerEvent) => {
    const origin = pressOrigin.current
    if (origin) dragDist.current = Math.hypot(e.clientX - origin.x, e.clientY - origin.y)
    if (!lasso) return
    const p = toWorld(e.clientX, e.clientY)
    setLasso((l) => (l ? { ...l, x1: p.x, y1: p.y } : l))
  }

  const onPointerUp = () => {
    pressOrigin.current = null
    if (!lasso) return
    const minX = Math.min(lasso.x0, lasso.x1)
    const maxX = Math.max(lasso.x0, lasso.x1)
    const minY = Math.min(lasso.y0, lasso.y1)
    const maxY = Math.max(lasso.y0, lasso.y1)
    const picked = drawn
      .filter((d) => d.relDepth >= 0)
      .filter((d) => d.point.x >= minX && d.point.x <= maxX && d.point.y >= minY && d.point.y <= maxY)
      .map((d) => d.node.id)
    setLassoIds(Array.from(new Set(picked)))
    setLasso(null)
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


  const enter = (node: AtlasNode) => {
    if (dragDist.current > 5) return
    setSelected(node.id)
    setFocus(node.childIds.length > 0 ? node.id : node.parentId)
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
            const hovered = hover?.node.id === node.id

            // Two voices, so a group you can enter never reads like a landmark
            // you are standing next to. Choices are sentence case, coloured by
            // state, and carry their numbers. Context is small letter-spaced
            // caps in plain grey with nothing under it: territory, not options.
            const context = tier === 2
            const caps = context || node.level === 0

            let fill: string
            if (selected) fill = '#ffffff'
            else if (inLasso) fill = 'var(--lime)'
            else if (context) fill = 'var(--faint)'
            else if (node.level === 0) fill = domainColor(node.id, 60, 74)
            else fill = style.fill

            // Emphasis is carried by hue and weight, not by fading text out.
            // Every label that is drawn stays legible; only filtered-out ones
            // are allowed to recede.
            const fontWeight = context
              ? 500
              : node.level === 0
                ? 650
                : 420 + Math.round(label.weight * 180) + (style.emphasis >= 0.85 ? 40 : 0)
            let opacity = context ? 0.5 : 0.88 + style.emphasis * 0.12
            if (selected) opacity = 1
            if (filtersOn && !isMatch) opacity *= 0.28

            const lh = upp * label.font * 1.2
            const top = label.y - ((label.lines.length - 1) / 2) * lh

            return (
              <g
                key={label.id}
                opacity={hovered ? Math.min(1, opacity + 0.35) : opacity}
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
                  enter(node)
                }}
              >
                {/* The glyphs themselves are a terrible hit target: only the
                    painted strokes respond, so a click between two letters
                    misses. This rect is the actual target. */}
                <rect
                  x={label.x - label.w / 2}
                  y={label.y - label.h / 2}
                  width={label.w}
                  height={label.h}
                  rx={upp * 5}
                  fill={hovered ? 'rgba(255,255,255,0.05)' : 'transparent'}
                  pointerEvents="all"
                />
                {label.lines.map((line, i) => (
                  <text
                    key={i}
                    className="node-label"
                    x={label.x}
                    y={top + i * lh}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize={upp * label.font}
                    fontWeight={fontWeight}
                    letterSpacing={caps ? upp * 0.9 : undefined}
                    fill={fill}
                  >
                    {node.fail && i === 0 ? '↺ ' : ''}
                    {caps ? line.toUpperCase() : line}
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
            <div style={{ color: 'var(--faint)', marginTop: 6, lineHeight: 1.5 }}>
              <strong style={{ color: 'var(--dim)' }}>Sentence case with numbers</strong> is what is
              inside the level you are in. <strong style={{ color: 'var(--dim)' }}>SMALL CAPS</strong>{' '}
              in grey is a neighbouring branch one step out, shown for bearings only.
              <br />
              Size is how much is in a field: activities underneath it, weighted by gap, relative to
              its siblings. ↺ marks a failure or rework activity. Nothing is drawn between labels, so
              a group is whatever sits together. Click a label or scroll into it to go deeper.
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
