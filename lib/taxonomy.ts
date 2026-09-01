import { DOMAINS } from '@/content'
import { COVERAGE_EVENTS } from '@/content/coverage-events'
import { gapScore, PREVALENCE_WEIGHT } from './scoring'
import type {
  AtlasNode,
  CoverageEvent,
  Facets,
  NodeKind,
  NodeSpec,
  Prevalence,
  PrimitiveId,
} from './types'

const KIND_BY_LEVEL: NodeKind[] = ['domain', 'family', 'procedure', 'activity']

const ROOT_FACETS: Facets = {
  setting: 'household',
  dexterity: 3,
  precision: 3,
  contact: 3,
  horizon: 'medium',
  repetition: 'batched',
  capital: 'cheap',
  partner: 'none',
  skillYears: 'none',
  suit: 'ok',
  robotNow: 'partial',
  embodiment: ['ego', 'video'],
  saturation: 'thin',
  ours: 'none',
  rights: 'easy',
  ethics: 'open',
}

export interface Atlas {
  nodes: Map<string, AtlasNode>
  roots: AtlasNode[]
  /** Every node in a stable depth-first order. */
  all: AtlasNode[]
  eventsByNode: Map<string, CoverageEvent[]>
  /** Descendant ids including self, for "does any child match" filtering. */
  subtree: Map<string, string[]>
  /** Terminal nodes only, the scoring unit. */
  leaves: AtlasNode[]
  byPrimitive: Map<PrimitiveId, string[]>
  unmatchedEventNodeIds: string[]
}

function build(): Atlas {
  const nodes = new Map<string, AtlasNode>()
  const all: AtlasNode[] = []
  const roots: AtlasNode[] = []

  const walk = (
    spec: NodeSpec,
    parent: AtlasNode | null,
    level: 0 | 1 | 2 | 3,
  ): AtlasNode => {
    const id = parent ? `${parent.id}.${spec.id}` : spec.id
    const inherited: Facets = parent ? parent.facets : ROOT_FACETS
    const facets: Facets = { ...inherited, ...(spec.f ?? {}) }

    const fail = spec.fail ?? false
    const primitives = Array.from(
      new Set<PrimitiveId>([
        ...(spec.primitives ?? (parent ? parent.primitives : [])),
        ...(fail ? (['recover'] as PrimitiveId[]) : []),
      ]),
    )

    const prevalence: Prevalence = spec.prevalence ?? (parent ? parent.prevalence : 'common')

    const node: AtlasNode = {
      id,
      slug: spec.id,
      title: spec.title,
      definition: spec.def,
      kind: KIND_BY_LEVEL[level],
      level,
      parentId: parent ? parent.id : null,
      path: parent ? [...parent.path, spec.title] : [spec.title],
      childIds: [],
      primitives,
      facets,
      objects: spec.objects ?? [],
      tools: spec.tools ?? [],
      cue: spec.cue,
      verify: spec.verify,
      prevalence,
      fail,
      notes: spec.notes,
      gap: 0,
      mass: 0,
      leafCount: 0,
      ourHours: 0,
      provenance: 'seed',
    }

    nodes.set(id, node)
    all.push(node)
    if (parent) parent.childIds.push(id)
    else roots.push(node)

    for (const child of spec.children ?? []) {
      walk(child, node, Math.min(level + 1, 3) as 0 | 1 | 2 | 3)
    }
    return node
  }

  for (const spec of DOMAINS) walk(spec, null, 0)

  // Roll up: terminal nodes score from their own facets, ancestors take a
  // prevalence-weighted mean of their descendants. A domain full of blocked or
  // saturated leaves should read dim even if the domain row itself looks juicy.
  const subtree = new Map<string, string[]>()
  const leaves: AtlasNode[] = []

  const rollup = (node: AtlasNode): { weighted: number; weight: number; ids: string[]; leafCount: number; } => {
    if (node.childIds.length === 0) {
      node.gap = gapScore(node.facets)
      node.leafCount = 1
      const w = PREVALENCE_WEIGHT[node.prevalence]
      node.mass = node.gap * w
      subtree.set(node.id, [node.id])
      leaves.push(node)
      return { weighted: node.gap * w, weight: w, ids: [node.id], leafCount: 1 }
    }
    let weighted = 0
    let weight = 0
    let leafCount = 0
    const ids: string[] = [node.id]
    for (const childId of node.childIds) {
      const r = rollup(nodes.get(childId)!)
      weighted += r.weighted
      weight += r.weight
      leafCount += r.leafCount
      ids.push(...r.ids)
    }
    node.gap = weight > 0 ? weighted / weight : 0
    node.leafCount = leafCount
    node.mass = node.gap * PREVALENCE_WEIGHT[node.prevalence]
    subtree.set(node.id, ids)
    return { weighted, weight, ids, leafCount }
  }

  for (const root of roots) rollup(root)

  // Coverage events attach to a node and propagate hours up the ancestor chain.
  const eventsByNode = new Map<string, CoverageEvent[]>()
  const unmatchedEventNodeIds: string[] = []
  for (const event of COVERAGE_EVENTS) {
    const node = nodes.get(event.nodeId)
    if (!node) {
      unmatchedEventNodeIds.push(event.nodeId)
      continue
    }
    const list = eventsByNode.get(event.nodeId)
    if (list) list.push(event)
    else eventsByNode.set(event.nodeId, [event])

    if (event.source === 'us') {
      let cursor: AtlasNode | undefined = node
      while (cursor) {
        cursor.ourHours += event.hoursUsable
        cursor = cursor.parentId ? nodes.get(cursor.parentId) : undefined
      }
    }
  }

  const byPrimitive = new Map<PrimitiveId, string[]>()
  for (const node of all) {
    for (const p of node.primitives) {
      const list = byPrimitive.get(p)
      if (list) list.push(node.id)
      else byPrimitive.set(p, [node.id])
    }
  }

  return { nodes, roots, all, eventsByNode, subtree, leaves, byPrimitive, unmatchedEventNodeIds }
}

export const ATLAS: Atlas = build()

export function getNode(id: string | null | undefined): AtlasNode | undefined {
  if (!id) return undefined
  return ATLAS.nodes.get(id)
}

export function ancestors(id: string): AtlasNode[] {
  const chain: AtlasNode[] = []
  let cursor = getNode(id)
  while (cursor) {
    chain.unshift(cursor)
    cursor = cursor.parentId ? getNode(cursor.parentId) : undefined
  }
  return chain
}

export function children(id: string): AtlasNode[] {
  const node = getNode(id)
  if (!node) return []
  return node.childIds.map((c) => ATLAS.nodes.get(c)!)
}

export function descendants(id: string): AtlasNode[] {
  return (ATLAS.subtree.get(id) ?? []).map((n) => ATLAS.nodes.get(n)!)
}

export function eventsFor(id: string, includeDescendants = true): CoverageEvent[] {
  const ids = includeDescendants ? (ATLAS.subtree.get(id) ?? [id]) : [id]
  const out: CoverageEvent[] = []
  for (const nodeId of ids) {
    const list = ATLAS.eventsByNode.get(nodeId)
    if (list) out.push(...list)
  }
  return out
}

/** Same-primitive nodes in other domains. This is how transfer gets explained. */
export function kinNodes(id: string, limit = 12): AtlasNode[] {
  const node = getNode(id)
  if (!node) return []
  const rootDomain = node.id.split('.')[0]
  const scored: { node: AtlasNode; score: number }[] = []
  for (const other of ATLAS.leaves) {
    if (other.id === node.id) continue
    if (other.id.split('.')[0] === rootDomain) continue
    const shared = other.primitives.filter((p) => node.primitives.includes(p)).length
    if (shared === 0) continue
    const facetCloseness =
      1 -
      (Math.abs(other.facets.contact - node.facets.contact) +
        Math.abs(other.facets.dexterity - node.facets.dexterity) +
        Math.abs(other.facets.precision - node.facets.precision)) /
        12
    scored.push({ node: other, score: shared * 2 + facetCloseness * 3 })
  }
  scored.sort((a, b) => b.score - a.score)
  return scored.slice(0, limit).map((s) => s.node)
}

export const STATS = {
  nodes: ATLAS.all.length,
  domains: ATLAS.roots.length,
  families: ATLAS.all.filter((n) => n.level === 1).length,
  procedures: ATLAS.all.filter((n) => n.level === 2).length,
  activities: ATLAS.all.filter((n) => n.level === 3).length,
  leaves: ATLAS.leaves.length,
  failLeaves: ATLAS.leaves.filter((n) => n.fail).length,
  ourHours: ATLAS.roots.reduce((sum, r) => sum + r.ourHours, 0),
}
