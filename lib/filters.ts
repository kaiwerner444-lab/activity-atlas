import { FACET_BY_KEY } from './facets'
import { ATLAS } from './taxonomy'
import type { AtlasNode, PrimitiveId } from './types'
import { eventsFor } from './taxonomy'

export interface FilterState {
  /** facet key -> selected values. Scale facets treat the lowest selection as a minimum. */
  facets: Record<string, string[]>
  primitives: PrimitiveId[]
  collectors: string[]
  collectorMode: 'union' | 'intersection'
  /** Tint keeps non-matching nodes visible as ghosts. Isolate hides them. */
  mode: 'tint' | 'isolate'
  failOnly: boolean
}

export const EMPTY_FILTERS: FilterState = {
  facets: {},
  primitives: [],
  collectors: [],
  collectorMode: 'union',
  mode: 'tint',
  failOnly: false,
}

export function filterCount(f: FilterState): number {
  return (
    Object.values(f.facets).reduce((n, v) => n + v.length, 0) +
    f.primitives.length +
    f.collectors.length +
    (f.failOnly ? 1 : 0)
  )
}

function facetMatches(node: AtlasNode, key: string, values: string[]): boolean {
  if (values.length === 0) return true
  const def = FACET_BY_KEY[key]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const actual = (node.facets as any)[key]
  if (!def) return true
  if (def.kind === 'scale') {
    const threshold = Math.min(...values.map(Number))
    return Number(actual) >= threshold
  }
  if (def.kind === 'multi') {
    return (actual as string[]).some((v) => values.includes(v))
  }
  return values.includes(String(actual))
}

/** Collector ids with any coverage on this node or below it. */
const collectorCache = new Map<string, Set<string>>()
export function collectorsOn(nodeId: string): Set<string> {
  const hit = collectorCache.get(nodeId)
  if (hit) return hit
  const set = new Set(eventsFor(nodeId, true).map((e) => e.collectorId))
  collectorCache.set(nodeId, set)
  return set
}

function ownMatch(node: AtlasNode, f: FilterState): boolean {
  if (f.failOnly && !node.fail) return false
  for (const [key, values] of Object.entries(f.facets)) {
    if (!facetMatches(node, key, values)) return false
  }
  if (f.primitives.length && !f.primitives.some((p) => node.primitives.includes(p))) return false
  if (f.collectors.length) {
    const on = collectorsOn(node.id)
    const hits = f.collectors.filter((c) => on.has(c))
    if (f.collectorMode === 'intersection') {
      if (hits.length !== f.collectors.length) return false
    } else if (hits.length === 0) return false
  }
  return true
}

export interface MatchResult {
  /** Terminal nodes that match on their own facets. */
  leaves: Set<string>
  /** Any node with at least one matching terminal node underneath it. */
  nodes: Set<string>
  leafCount: number
}

export function computeMatches(f: FilterState): MatchResult {
  const leaves = new Set<string>()
  for (const leafNode of ATLAS.leaves) {
    if (ownMatch(leafNode, f)) leaves.add(leafNode.id)
  }
  const nodes = new Set<string>(leaves)
  for (const id of leaves) {
    let cursor = ATLAS.nodes.get(id)!.parentId
    while (cursor) {
      if (nodes.has(cursor)) break
      nodes.add(cursor)
      cursor = ATLAS.nodes.get(cursor)!.parentId
    }
  }
  return { leaves, nodes, leafCount: leaves.size }
}

export function serialiseFilters(f: FilterState): string {
  const parts: string[] = []
  for (const [key, values] of Object.entries(f.facets)) {
    if (values.length) parts.push(`${key}:${values.join('|')}`)
  }
  if (f.primitives.length) parts.push(`prim:${f.primitives.join('|')}`)
  if (f.collectors.length) parts.push(`who:${f.collectors.join('|')}`)
  if (f.collectorMode === 'intersection') parts.push('whomode:and')
  if (f.mode === 'isolate') parts.push('view:isolate')
  if (f.failOnly) parts.push('fail:1')
  return parts.join(',')
}

export function parseFilters(raw: string | null): FilterState {
  const state: FilterState = { ...EMPTY_FILTERS, facets: {} }
  if (!raw) return state
  for (const part of raw.split(',')) {
    const [key, value] = part.split(':')
    if (!key || !value) continue
    if (key === 'prim') state.primitives = value.split('|') as PrimitiveId[]
    else if (key === 'who') state.collectors = value.split('|')
    else if (key === 'whomode') state.collectorMode = value === 'and' ? 'intersection' : 'union'
    else if (key === 'view') state.mode = value === 'isolate' ? 'isolate' : 'tint'
    else if (key === 'fail') state.failOnly = value === '1'
    else if (FACET_BY_KEY[key]) state.facets[key] = value.split('|')
  }
  return state
}
