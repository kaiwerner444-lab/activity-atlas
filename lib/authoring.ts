import type { FacetPatch, NodeSpec, Prevalence, PrimitiveId } from './types'

// Content is authored as a nested tree where a node writes down only what
// differs from its parent. Everything else is inherited at normalisation time.
// This is the difference between 600 maintainable rows and 600 unmaintainable ones.

const FACET_KEYS = new Set<keyof FacetPatch>([
  'setting',
  'dexterity',
  'precision',
  'contact',
  'horizon',
  'repetition',
  'capital',
  'partner',
  'skillYears',
  'suit',
  'robotNow',
  'embodiment',
  'saturation',
  'ours',
  'rights',
  'ethics',
])

export type Opts = FacetPatch & {
  /** Motor primitives. A leaf has one primary domain and 1..N primitives. */
  prim?: PrimitiveId[]
  obj?: string[]
  tool?: string[]
  /** How you know it is done. See NodeSpec.cue. */
  cue?: string
  /** How you prove it worked. See NodeSpec.verify. */
  verify?: string
  prev?: Prevalence
  /** Failure, diagnosis or rework leaf. Implies the `recover` primitive. */
  fail?: boolean
  notes?: string
}

function split(
  opts: Opts | undefined,
): Pick<NodeSpec, 'f' | 'primitives' | 'objects' | 'tools' | 'cue' | 'verify' | 'prevalence' | 'fail' | 'notes'> {
  if (!opts) return {}
  const f: FacetPatch = {}
  for (const key of Object.keys(opts) as (keyof Opts)[]) {
    if (FACET_KEYS.has(key as keyof FacetPatch)) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(f as any)[key] = (opts as any)[key]
    }
  }
  return {
    f: Object.keys(f).length ? f : undefined,
    primitives: opts.prim,
    objects: opts.obj,
    tools: opts.tool,
    cue: opts.cue,
    verify: opts.verify,
    prevalence: opts.prev,
    fail: opts.fail,
    notes: opts.notes,
  }
}

export function node(
  id: string,
  title: string,
  def: string,
  opts?: Opts,
  children?: NodeSpec[],
): NodeSpec {
  return { id, title, def, ...split(opts), children }
}

/** Same as node(), reads better at the leaf level where there are no children. */
export function leaf(id: string, title: string, def: string, opts?: Opts): NodeSpec {
  return node(id, title, def, opts)
}
