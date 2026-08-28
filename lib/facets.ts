import type { Facets, PrimitiveId } from './types'

export type FacetKey = keyof Facets

export interface FacetOption {
  value: string
  label: string
  /** Short glyph used on dense chips. */
  hint?: string
}

export interface FacetDef {
  key: FacetKey
  label: string
  why: string
  kind: 'enum' | 'scale' | 'multi'
  options: FacetOption[]
  /** Facets shown collapsed by default in the rail. */
  secondary?: boolean
}

const scale = (labels: [string, string, string, string, string]): FacetOption[] =>
  labels.map((label, i) => ({ value: String(i + 1), label: `${i + 1} - ${label}` }))

export const FACETS: FacetDef[] = [
  {
    key: 'setting',
    label: 'Setting',
    why: 'Household versus industry, the first cut anyone asks for.',
    kind: 'enum',
    options: [
      { value: 'household', label: 'Household' },
      { value: 'commercial', label: 'Commercial' },
      { value: 'industrial', label: 'Industrial' },
      { value: 'outdoor', label: 'Outdoor' },
      { value: 'clinical', label: 'Clinical' },
      { value: 'vehicle', label: 'Vehicle' },
    ],
  },
  {
    key: 'saturation',
    label: 'Industry saturation',
    why: 'Kitchens and tabletop pick-place are drowning in data. Most of the economy is not.',
    kind: 'enum',
    options: [
      { value: 'empty', label: 'Empty' },
      { value: 'thin', label: 'Thin' },
      { value: 'heavy', label: 'Heavy' },
    ],
  },
  {
    key: 'ours',
    label: 'Our coverage',
    why: 'What we actually hold today. Time-varying.',
    kind: 'enum',
    options: [
      { value: 'none', label: 'None' },
      { value: 'pilot', label: 'Pilot' },
      { value: 'production', label: 'Production' },
    ],
  },
  {
    key: 'contact',
    label: 'Contact richness',
    why: 'Vision-only versus force and tactile being mandatory.',
    kind: 'scale',
    options: scale(['vision only', 'light contact', 'contact matters', 'force needed', 'tactile critical']),
  },
  {
    key: 'dexterity',
    label: 'Dexterity',
    why: 'Whole-body gross motion versus finger work.',
    kind: 'scale',
    options: scale(['gross body', 'arm level', 'two-hand', 'finger level', 'fingertip']),
  },
  {
    key: 'precision',
    label: 'Precision',
    why: 'Millimetres versus good enough.',
    kind: 'scale',
    options: scale(['loose', 'approximate', 'careful', 'tight', 'sub-mm']),
  },
  {
    key: 'horizon',
    label: 'Horizon',
    why: 'Seconds versus a multi-hour cell.',
    kind: 'enum',
    options: [
      { value: 'short', label: 'Short (< 1 min)' },
      { value: 'medium', label: 'Medium (minutes)' },
      { value: 'long', label: 'Long (hours)' },
    ],
  },
  {
    key: 'partner',
    label: 'Partner required',
    why: 'Can a suit walk in, or do we need someone else to open a door?',
    kind: 'enum',
    options: [
      { value: 'none', label: 'None' },
      { value: 'site', label: 'Site access' },
      { value: 'licensed', label: 'Licensed trade' },
      { value: 'regulated', label: 'Regulated' },
    ],
  },
  {
    key: 'suit',
    label: 'Body suit fit',
    why: 'The suit is one capture method, not the whole atlas.',
    kind: 'enum',
    options: [
      { value: 'excellent', label: 'Excellent' },
      { value: 'ok', label: 'OK' },
      { value: 'poor', label: 'Poor' },
      { value: 'wrong-tool', label: 'Wrong tool' },
    ],
  },
  {
    key: 'robotNow',
    label: 'Robot attemptable now',
    why: 'The "cannot yet attempt" clause, made queryable.',
    kind: 'enum',
    options: [
      { value: 'yes', label: 'Yes' },
      { value: 'partial', label: 'Partial' },
      { value: 'no', label: 'No' },
    ],
  },
  {
    key: 'repetition',
    label: 'Repetition',
    why: 'Diversity versus factory yield.',
    kind: 'enum',
    secondary: true,
    options: [
      { value: 'one-shot', label: 'One-shot' },
      { value: 'batched', label: 'Batched' },
      { value: 'high-takt', label: 'High takt' },
    ],
  },
  {
    key: 'capital',
    label: 'Capital intensity',
    why: 'Suit in a kitchen versus a CNC cell.',
    kind: 'enum',
    secondary: true,
    options: [
      { value: 'cheap', label: 'Cheap' },
      { value: 'mid', label: 'Mid' },
      { value: 'capex', label: 'Capex' },
    ],
  },
  {
    key: 'skillYears',
    label: 'Skill years',
    why: 'A plasterer is not a bagger.',
    kind: 'enum',
    secondary: true,
    options: [
      { value: 'none', label: 'None' },
      { value: 'months', label: 'Months' },
      { value: 'years', label: 'Years' },
    ],
  },
  {
    key: 'rights',
    label: 'Rights difficulty',
    why: 'A customer harness is not a generic board.',
    kind: 'enum',
    secondary: true,
    options: [
      { value: 'easy', label: 'Easy' },
      { value: 'consent-heavy', label: 'Consent heavy' },
      { value: 'ip-hot', label: 'IP hot' },
    ],
  },
  {
    key: 'ethics',
    label: 'Safety / ethics',
    why: 'Blocked nodes stay listed so nobody rediscovers them as a bright gap.',
    kind: 'enum',
    secondary: true,
    options: [
      { value: 'open', label: 'Open' },
      { value: 'restricted', label: 'Restricted' },
      { value: 'prohibited', label: 'Prohibited' },
    ],
  },
  {
    key: 'embodiment',
    label: 'Embodiment',
    why: 'Which capture layer can even reach this.',
    kind: 'multi',
    secondary: true,
    options: [
      { value: 'video', label: 'Human video' },
      { value: 'ego', label: 'Ego video' },
      { value: 'suit', label: 'Body suit' },
      { value: 'umi', label: 'UMI' },
      { value: 'teleop', label: 'Teleop' },
      { value: 'robot', label: 'Real robot' },
    ],
  },
]

export const FACET_BY_KEY: Record<string, FacetDef> = Object.fromEntries(
  FACETS.map((f) => [f.key, f]),
)

export interface PrimitiveDef {
  id: PrimitiveId
  label: string
  gloss: string
}

export const PRIMITIVES: PrimitiveDef[] = [
  { id: 'reach', label: 'Reach / approach', gloss: 'Move a hand or the body to a target without contact yet.' },
  { id: 'grasp', label: 'Grasp / pinch / wrap', gloss: 'Acquire and hold an object with a stable contact set.' },
  { id: 'insert', label: 'Insert / mate / seat', gloss: 'Bring two parts into a constrained fit.' },
  { id: 'fasten', label: 'Fasten', gloss: 'Screw, clip, tie, tape, stitch, latch.' },
  { id: 'separate', label: 'Separate / cut / strip', gloss: 'Divide material or remove a layer.' },
  { id: 'deform', label: 'Deform', gloss: 'Fold, bend, squeeze, smear, route a flexible body.' },
  { id: 'transfer', label: 'Pour / scoop / wipe', gloss: 'Move a substance across a surface or container.' },
  { id: 'tool', label: 'Tool-mediated', gloss: 'The action is defined by the tool, not the hand.' },
  { id: 'bimanual', label: 'Bimanual / handover', gloss: 'Two hands, or two agents, holding tension together.' },
  { id: 'locomote', label: 'Locomote / carry', gloss: 'Walk, climb, kneel, crawl, carry a load.' },
  { id: 'inspect', label: 'Align / measure / inspect', gloss: 'Decide from sensing rather than acting.' },
  { id: 'language', label: 'Talk while doing', gloss: 'Follow or give instruction inside the task.' },
  { id: 'recover', label: 'Recover / rework', gloss: 'Undo, unjam, fix the wrong thing that happened.' },
]

export const PRIMITIVE_BY_ID: Record<string, PrimitiveDef> = Object.fromEntries(
  PRIMITIVES.map((p) => [p.id, p]),
)
