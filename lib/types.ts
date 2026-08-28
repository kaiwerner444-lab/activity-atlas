// Core data model for the Activity Atlas.
// Two trees (domain, primitive) plus flat facets. Facets are filters, never extra trees.

export type NodeKind = 'domain' | 'family' | 'procedure' | 'activity'

export type Setting =
  | 'household'
  | 'commercial'
  | 'industrial'
  | 'outdoor'
  | 'clinical'
  | 'vehicle'

export type Horizon = 'short' | 'medium' | 'long'
export type Repetition = 'one-shot' | 'batched' | 'high-takt'
export type Capital = 'cheap' | 'mid' | 'capex'
export type Partner = 'none' | 'site' | 'licensed' | 'regulated'
export type SkillYears = 'none' | 'months' | 'years'
export type SuitFit = 'poor' | 'ok' | 'excellent' | 'wrong-tool'
export type RobotNow = 'yes' | 'partial' | 'no'
export type Embodiment = 'video' | 'ego' | 'suit' | 'umi' | 'teleop' | 'robot'
export type Saturation = 'empty' | 'thin' | 'heavy'
export type OurCoverage = 'none' | 'pilot' | 'production'
export type Rights = 'easy' | 'consent-heavy' | 'ip-hot'
export type Ethics = 'open' | 'restricted' | 'prohibited'
export type Prevalence = 'rare' | 'uncommon' | 'common' | 'ubiquitous'

export type PrimitiveId =
  | 'reach'
  | 'grasp'
  | 'insert'
  | 'fasten'
  | 'separate'
  | 'deform'
  | 'transfer'
  | 'tool'
  | 'bimanual'
  | 'locomote'
  | 'inspect'
  | 'language'
  | 'recover'

/** Facets carried by every node. Leaves author them; ancestors inherit or roll up. */
export interface Facets {
  setting: Setting
  /** 1 = whole-arm gross motion, 5 = fine finger work */
  dexterity: number
  /** 1 = "good enough", 5 = sub-millimetre */
  precision: number
  /** 1 = vision suffices, 5 = force/tactile is mandatory */
  contact: number
  horizon: Horizon
  repetition: Repetition
  capital: Capital
  partner: Partner
  skillYears: SkillYears
  suit: SuitFit
  robotNow: RobotNow
  embodiment: Embodiment[]
  saturation: Saturation
  ours: OurCoverage
  rights: Rights
  ethics: Ethics
}

export type FacetPatch = Partial<Facets>

/** A node as authored in content/. Only deviations from the parent are written. */
export interface NodeSpec {
  id: string
  title: string
  def: string
  f?: FacetPatch
  primitives?: PrimitiveId[]
  objects?: string[]
  tools?: string[]
  prevalence?: Prevalence
  /** Marks a failure / diagnosis / rework leaf. Also implies the `recover` primitive. */
  fail?: boolean
  notes?: string
  children?: NodeSpec[]
}

/** A node after normalisation: absolute id, resolved facets, derived scores. */
export interface AtlasNode {
  id: string
  slug: string
  title: string
  definition: string
  kind: NodeKind
  level: 0 | 1 | 2 | 3
  parentId: string | null
  path: string[]
  childIds: string[]
  primitives: PrimitiveId[]
  facets: Facets
  objects: string[]
  tools: string[]
  prevalence: Prevalence
  fail: boolean
  notes?: string
  /** Set on every node; leaves get the authored value, ancestors a rolled-up mean. */
  gap: number
  /** gap x prevalence, used for disc area at Z0/Z1. */
  mass: number
  leafCount: number
  /** Hours we hold, summed over this node and all descendants. */
  ourHours: number
  /** Editorial seed content that has not been reviewed by a human taxonomist yet. */
  provenance: 'seed' | 'reviewed'
}

export interface CoverageEvent {
  id: string
  nodeId: string
  source: 'us' | 'public' | 'partner'
  collectorId: string
  datasetName: string
  hoursUsable: number
  modalities: ('video' | 'ego' | 'kinematics' | 'force' | 'tactile' | 'language')[]
  /** ISO date, quarter granularity is enough. */
  date: string
  rights: 'clean' | 'restricted'
  quality: 'raw' | 'curated'
}

export interface Collector {
  id: string
  name: string
  type: 'lab' | 'public_set' | 'vendor' | 'us'
  knownBias: string
  color: string
}

export interface CollectionPlan {
  id: string
  name: string
  nodeIds: string[]
  targetHours: number
  status: 'draft' | 'scheduled' | 'running' | 'done'
}
