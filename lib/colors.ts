import type { AtlasNode } from './types'
import { ATLAS } from './taxonomy'

// Two colour systems, doing two different jobs.
//
// 1. Domain hue. Every root domain owns a hue, used for its boundary and its
//    edges. This is what makes twenty clusters read as twenty places rather
//    than one blur.
// 2. State colour. What is inside a node glyph answers the actual question:
//    do we hold this, does the industry hold it, or does nobody.

export type HighlightMode = 'coverage' | 'gap' | 'suit' | 'contact' | 'partner' | 'players'

// Everything here has to be readable on the map background. The quiet end of
// the scale is quiet because it is neutral, never because it is nearly
// invisible: an unreadable label carries no information at all.
//
// Exported because the legend is generated from these same constants. A key
// that is hand-written next to the code that paints is a key that goes stale.
export const NEUTRAL_BRIGHT = 'rgb(233, 238, 248)'
export const NEUTRAL = 'rgb(200, 207, 223)'
export const NEUTRAL_DIM = 'rgb(163, 172, 191)'

export const AQUA_S = 'rgb(90, 226, 212)'
export const CORAL_S = 'rgb(255, 160, 122)'
export const LIME_S = 'rgb(178, 230, 120)'
export const ROSE_S = 'rgb(244, 128, 168)'
export const HOT_S = 'rgb(255, 150, 105)'
export const IRIS_S = 'rgb(163, 156, 255)'

/** One row of the key: the colour, what it means, and the rule that produces it. */
export interface Swatch {
  fill: string
  /** Opacity the map actually paints, so the chip matches the label. */
  emphasis?: number
  means: string
  /** The literal test in nodeStyle(). Keep these in step with the switch below. */
  test: string
}


export const HIGHLIGHT_MODES: {
  id: HighlightMode
  label: string
  legend: string
  swatches: Swatch[]
}[] = [
  {
    id: 'coverage',
    label: 'Coverage',
    legend: 'Do we hold this, does the industry, or does nobody.',
    swatches: [
      { fill: AQUA_S, means: 'We hold hours here', test: 'ourHours > 0, or coverage is pilot or production' },
      { fill: CORAL_S, emphasis: 0.9, means: 'Nobody holds it', test: 'no hours of ours, and public saturation is empty' },
      { fill: NEUTRAL, emphasis: 0.6, means: 'Public data is thin', test: 'saturation is thin' },
      { fill: NEUTRAL_DIM, emphasis: 0.38, means: 'The industry already has it', test: 'saturation is heavy, the boring case' },
    ],
  },
  {
    id: 'gap',
    label: 'Gap score',
    legend: 'The score on its own, with everything else stripped out.',
    swatches: [
      { fill: CORAL_S, means: 'Worth capturing', test: 'gap at or above 0.45' },
      { fill: NEUTRAL_BRIGHT, emphasis: 0.7, means: 'Middling', test: 'gap 0.25 to 0.45' },
      { fill: NEUTRAL_DIM, emphasis: 0.38, means: 'Not worth the shift', test: 'gap below 0.25' },
    ],
  },
  {
    id: 'suit',
    label: 'Suit fitness',
    legend: 'Whether an instrumented suit is the right instrument for this.',
    swatches: [
      { fill: LIME_S, emphasis: 0.95, means: 'The suit is the right tool', test: 'suit is excellent' },
      { fill: NEUTRAL, emphasis: 0.6, means: 'Workable', test: 'suit is ok' },
      { fill: NEUTRAL_DIM, emphasis: 0.45, means: 'Poor fit', test: 'suit is poor' },
      { fill: ROSE_S, emphasis: 0.9, means: 'Wrong instrument entirely', test: 'suit is wrong-tool' },
    ],
  },
  {
    id: 'contact',
    label: 'Contact richness',
    legend: 'Where force and tactile carry information a camera cannot.',
    swatches: [
      { fill: HOT_S, means: 'Force and tactile are mandatory', test: 'contact 5' },
      { fill: HOT_S, emphasis: 0.62, means: 'Mostly tactile', test: 'contact 4' },
      { fill: NEUTRAL_DIM, emphasis: 0.38, means: 'Vision is enough', test: 'contact 3 or below' },
    ],
  },
  {
    id: 'partner',
    label: 'Partner gate',
    legend: 'Who has to open a door before you can capture any of this.',
    swatches: [
      { fill: IRIS_S, means: 'A regulator has to sign', test: 'partner is regulated' },
      { fill: IRIS_S, emphasis: 0.78, means: 'A licence holder has to be present', test: 'partner is licensed' },
      { fill: NEUTRAL, emphasis: 0.55, means: 'Site access only', test: 'partner is site' },
      { fill: NEUTRAL_DIM, emphasis: 0.35, means: 'No gate', test: 'partner is none' },
    ],
  },
  {
    id: 'players',
    label: 'Selected players',
    legend: 'Where the collectors you picked in the rail already hold data.',
    swatches: [
      { fill: AQUA_S, means: 'This collector holds data here', test: 'the selected player has a coverage event on this node' },
      { fill: NEUTRAL_DIM, emphasis: 0.3, means: 'They do not', test: 'no matching event' },
    ],
  },
]

/**
 * Rules that hold in every mode. The first is a hard override inside
 * nodeStyle(); the rest are applied by the map when it draws a label, and are
 * about where you are rather than what the node is.
 */
export const ALWAYS_SWATCHES: Swatch[] = [
  { fill: ROSE_S, emphasis: 0.75, means: 'Blocked on safety or ethics', test: 'ethics is prohibited, and it overrides every mode above' },
  { fill: '#ffffff', means: 'Selected, or the branch you are inside', test: 'the focus title and the node you last clicked' },
  { fill: LIME_S, means: 'Caught in the lasso', test: 'inside the current drag selection' },
]

/** Stable hue per root domain, spread around the wheel in authoring order. */
const DOMAIN_HUE = new Map<string, number>(
  ATLAS.roots.map((root, i) => {
    // Golden-angle stepping keeps neighbouring domains far apart in hue even
    // though they end up packed next to each other on the canvas.
    const hue = (i * 137.508 + 18) % 360
    return [root.id, hue]
  }),
)

export function domainOf(nodeId: string): string {
  return nodeId.split('.')[0]
}

export function domainHue(nodeId: string): number {
  return DOMAIN_HUE.get(domainOf(nodeId)) ?? 210
}

export function domainColor(nodeId: string, sat = 58, light = 62, alpha = 1): string {
  return `hsla(${domainHue(nodeId)}, ${sat}%, ${light}%, ${alpha})`
}

export interface NodeStyle {
  fill: string
  /** 0..1. Drives opacity and weight, so a highlight actually reads as one. */
  emphasis: number
}

/**
 * Colour is a highlight, not a paint job. Most labels stay neutral grey and only
 * the ones the current question is about take a hue, because a map where every
 * word is coloured says exactly as much as a map where none of them are.
 */
export function nodeStyle(node: AtlasNode, mode: HighlightMode, playerHit = false): NodeStyle {
  if (node.facets.ethics === 'prohibited') return { fill: ROSE_S, emphasis: 0.75 }

  switch (mode) {
    case 'coverage': {
      const ours = node.ourHours > 0 || node.facets.ours !== 'none'
      if (ours) return { fill: AQUA_S, emphasis: 1 }
      // Empty is the interesting colour. Heavy public coverage is the boring
      // case and is deliberately the quietest thing on the map.
      if (node.facets.saturation === 'empty') return { fill: CORAL_S, emphasis: 0.9 }
      if (node.facets.saturation === 'thin') return { fill: NEUTRAL, emphasis: 0.6 }
      return { fill: NEUTRAL_DIM, emphasis: 0.38 }
    }
    case 'gap': {
      if (node.gap >= 0.45) return { fill: CORAL_S, emphasis: 1 }
      if (node.gap >= 0.25) return { fill: NEUTRAL_BRIGHT, emphasis: 0.7 }
      return { fill: NEUTRAL_DIM, emphasis: 0.38 }
    }
    case 'suit': {
      if (node.facets.suit === 'excellent') return { fill: LIME_S, emphasis: 0.95 }
      if (node.facets.suit === 'wrong-tool') return { fill: ROSE_S, emphasis: 0.9 }
      if (node.facets.suit === 'poor') return { fill: NEUTRAL_DIM, emphasis: 0.45 }
      return { fill: NEUTRAL, emphasis: 0.6 }
    }
    case 'contact': {
      if (node.facets.contact >= 5) return { fill: HOT_S, emphasis: 1 }
      if (node.facets.contact === 4) return { fill: HOT_S, emphasis: 0.62 }
      return { fill: NEUTRAL_DIM, emphasis: 0.38 }
    }
    case 'partner': {
      if (node.facets.partner === 'regulated') return { fill: IRIS_S, emphasis: 1 }
      if (node.facets.partner === 'licensed') return { fill: IRIS_S, emphasis: 0.78 }
      if (node.facets.partner === 'site') return { fill: NEUTRAL, emphasis: 0.55 }
      return { fill: NEUTRAL_DIM, emphasis: 0.35 }
    }
    case 'players':
      return playerHit
        ? { fill: AQUA_S, emphasis: 1 }
        : { fill: NEUTRAL_DIM, emphasis: 0.3 }
  }
}

export function coverageBadge(node: AtlasNode): 'ours' | 'public' | 'empty' {
  if (node.ourHours > 0 || node.facets.ours !== 'none') return 'ours'
  if (node.facets.saturation !== 'empty') return 'public'
  return 'empty'
}
