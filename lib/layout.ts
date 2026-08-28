import { packSiblings } from 'd3-hierarchy'
import { ATLAS } from './taxonomy'
import type { AtlasNode } from './types'

// Layout is a mind map made of words. Each domain is laid out as its own radial
// graph around a hub and the twenty hubs are then spaced apart. Nothing is drawn
// between the labels: grouping is proximity and colour, so the spacing here is
// the only thing holding a category together.
//
// It is deterministic: same content order in, same positions out. Positions are
// never stored as art, only recomputed, so the mental map survives a redeploy.

export interface NodePoint {
  id: string
  x: number
  y: number
  /** Drawn glyph radius in world units. */
  r: number
  /** Direction the node points away from its parent, for label placement. */
  angle: number
  level: 0 | 1 | 2 | 3
  parentId: string | null
  /** Centre of the box that frames this node plus its whole subtree. */
  fx: number
  fy: number
  /** Half width and half height of that box. */
  fw: number
  fh: number
  /** Containment radius, used for hit tests rather than for framing. */
  fit: number
  /** Direct child count, which decides how much air the frame needs. */
  kids: number
}

const RING = [0, 210, 400, 560]
const GLYPH = [26, 15, 10, 7]
const CLUSTER_GAP = 215

function glyphRadius(node: AtlasNode): number {
  return GLYPH[node.level] * (0.72 + Math.min(1, node.gap * 1.6) * 0.5)
}

/** Radial tree inside one domain, centred on the hub at the origin. */
function layoutCluster(root: AtlasNode, scale: number): Map<string, NodePoint> {
  const out = new Map<string, NodePoint>()
  out.set(root.id, {
    id: root.id,
    x: 0,
    y: 0,
    r: glyphRadius(root),
    angle: -Math.PI / 2,
    level: 0,
    parentId: null,
    fx: 0,
    fy: 0,
    fw: 0,
    fh: 0,
    fit: 0,
    kids: root.childIds.length,
  })

  const place = (node: AtlasNode, centreAngle: number, span: number) => {
    const kids = node.childIds.map((id) => ATLAS.nodes.get(id)!)
    if (kids.length === 0) return
    const totalWeight = kids.reduce((s, k) => s + Math.max(1, k.leafCount), 0)
    // Leave a little air between sibling wedges so boundaries do not collide.
    const usable = span * (node.level === 0 ? 1 : 0.86)
    let cursor = centreAngle - usable / 2
    for (const kid of kids) {
      const weight = Math.max(1, kid.leafCount) / totalWeight
      const wedge = usable * weight
      const angle = cursor + wedge / 2
      cursor += wedge
      const radius = RING[kid.level] * scale
      out.set(kid.id, {
        id: kid.id,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius,
        r: glyphRadius(kid),
        angle,
        level: kid.level,
        parentId: node.id,
        fx: 0,
        fy: 0,
        fw: 0,
        fh: 0,
        fit: 0,
        kids: kid.childIds.length,
      })
      place(kid, angle, wedge)
    }
  }

  // Start the fan at -90 degrees so the first family reads at the top.
  place(root, -Math.PI / 2, Math.PI * 2)
  return out
}

function buildLayout(): Map<string, NodePoint> {
  const clusters = ATLAS.roots.map((root) => {
    // Bigger branches need more room, purely so labels fit. Cluster size is not
    // a signal: gap and coverage live in colour and glyph size, never in area.
    const scale = Math.min(1.55, Math.max(0.62, Math.sqrt(root.leafCount / 22)))
    const points = layoutCluster(root, scale)
    let radius = 0
    for (const p of points.values()) radius = Math.max(radius, Math.hypot(p.x, p.y) + p.r)
    return { root, points, radius: radius + CLUSTER_GAP }
  })

  const circles = clusters.map((c) => ({ r: c.radius, x: 0, y: 0, ref: c }))
  packSiblings(circles)

  // Round on the way out. Trigonometry lands on a different last bit under Node
  // than under V8 in the browser, which is enough to make every SVG path string
  // differ and trip React's hydration check.
  const round = (v: number) => Math.round(v * 100) / 100
  const out = new Map<string, NodePoint>()
  for (const circle of circles) {
    for (const point of circle.ref.points.values()) {
      out.set(point.id, {
        ...point,
        x: round(point.x + circle.x),
        y: round(point.y + circle.y),
        r: round(point.r),
        angle: round(point.angle * 1000) / 1000,
      })
    }
  }

  // Framing circle per node. A radial layout puts children further out from the
  // hub rather than around their parent, so centring the camera on the node
  // itself leaves the subtree half off screen. Frame the content instead.
  for (const node of ATLAS.all) {
    const self = out.get(node.id)
    if (!self) continue
    // Frame the node and its direct children, nothing deeper. The map only ever
    // draws one level below the focus, so framing the whole subtree would zoom
    // out to fit rows that are not on screen.
    const members = [node.id, ...node.childIds]
    let minX = Infinity
    let maxX = -Infinity
    let minY = Infinity
    let maxY = -Infinity
    for (const id of members) {
      const p = out.get(id)
      if (!p) continue
      minX = Math.min(minX, p.x - p.r)
      maxX = Math.max(maxX, p.x + p.r)
      minY = Math.min(minY, p.y - p.r)
      maxY = Math.max(maxY, p.y + p.r)
    }
    if (!Number.isFinite(minX)) {
      minX = self.x
      maxX = self.x
      minY = self.y
      maxY = self.y
    }
    self.fx = round((minX + maxX) / 2)
    self.fy = round((minY + maxY) / 2)
    self.fw = round(Math.max((maxX - minX) / 2, 70))
    self.fh = round(Math.max((maxY - minY) / 2, 70))
    self.fit = round(Math.max(Math.hypot(self.fw, self.fh), 90))
  }

  return out
}

export const LAYOUT: Map<string, NodePoint> = buildLayout()

export const WORLD_RADIUS = (() => {
  let r = 0
  for (const p of LAYOUT.values()) r = Math.max(r, Math.hypot(p.x, p.y) + p.r)
  return r
})()

/** Bounding box of everything, so the world view frames content, not a circle. */
export const WORLD_FRAME = (() => {
  let minX = Infinity
  let maxX = -Infinity
  let minY = Infinity
  let maxY = -Infinity
  for (const p of LAYOUT.values()) {
    minX = Math.min(minX, p.x)
    maxX = Math.max(maxX, p.x)
    minY = Math.min(minY, p.y)
    maxY = Math.max(maxY, p.y)
  }
  return {
    fx: (minX + maxX) / 2,
    fy: (minY + maxY) / 2,
    fw: (maxX - minX) / 2,
    fh: (maxY - minY) / 2,
  }
})()

export function pointFor(id: string): NodePoint | undefined {
  return LAYOUT.get(id)
}

/**
 * Half-height the camera needs to frame a node's children at a given aspect.
 *
 * Padding scales with how many children there are. Label size is fixed in screen
 * pixels, so framing tightly on the bounding box of two labels throws them into
 * opposite corners with nothing in between: the fewer things there are to show,
 * the further out the camera has to sit for them to read as a group.
 */
export function frameHeight(point: NodePoint, aspect: number): number {
  const pad = Math.min(2.6, 1.35 + 2.2 / Math.max(point.kids, 1))
  return Math.max(point.fh, point.fw / Math.max(aspect, 0.2)) * pad
}

// Development affordance: the layout is the thing you always want to poke at
// from the console when the camera does something surprising.
if (process.env.NODE_ENV !== 'production' && typeof window !== 'undefined') {
  ;(window as unknown as { __atlasLayout?: unknown }).__atlasLayout = LAYOUT
}
