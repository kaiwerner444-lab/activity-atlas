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

export const HIGHLIGHT_MODES: { id: HighlightMode; label: string; legend: string }[] = [
  {
    id: 'coverage',
    label: 'Coverage',
    legend: 'Aqua: we hold hours. Coral: nobody does. Grey: the industry already has it.',
  },
  { id: 'gap', label: 'Gap score', legend: 'Coral: gap above 0.45. Everything else stays quiet.' },
  { id: 'suit', label: 'Suit fitness', legend: 'Lime: the suit is the right tool. Rose: it is not.' },
  { id: 'contact', label: 'Contact richness', legend: 'Hot: force and tactile are mandatory.' },
  { id: 'partner', label: 'Partner gate', legend: 'Iris: somebody else has to open the door.' },
  { id: 'players', label: 'Selected players', legend: 'Aqua: this collector holds data here.' },
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

// Everything here has to be readable on the map background. The quiet end of
// the scale is quiet because it is neutral, never because it is nearly
// invisible: an unreadable label carries no information at all.
const NEUTRAL_BRIGHT = 'rgb(233, 238, 248)'
const NEUTRAL = 'rgb(200, 207, 223)'
const NEUTRAL_DIM = 'rgb(163, 172, 191)'

const AQUA_S = 'rgb(90, 226, 212)'
const CORAL_S = 'rgb(255, 160, 122)'
const LIME_S = 'rgb(178, 230, 120)'
const ROSE_S = 'rgb(244, 128, 168)'
const HOT_S = 'rgb(255, 150, 105)'
const IRIS_S = 'rgb(163, 156, 255)'

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
