import type { Facets, Prevalence } from './types'

// gap = (1 - s_public) * u_robot * f_feasible * (1 - c_us)
//
// The point of writing this down is that "untapped" stops being an opinion in a
// meeting and becomes a column you can sort. Every term below is editorial at
// seed time and is meant to be replaced by measured values later.

const PUBLIC_SATURATION: Record<Facets['saturation'], number> = {
  empty: 0.05,
  thin: 0.4,
  heavy: 0.9,
}

const ROBOT_DIFFICULTY: Record<Facets['robotNow'], number> = {
  yes: 0.2,
  partial: 0.6,
  no: 1,
}

const SKILL_WEIGHT: Record<Facets['skillYears'], number> = {
  none: 0.4,
  months: 0.7,
  years: 1,
}

const PARTNER_COST: Record<Facets['partner'], number> = {
  none: 1,
  site: 0.85,
  licensed: 0.65,
  regulated: 0.4,
}

const CAPITAL_COST: Record<Facets['capital'], number> = {
  cheap: 1,
  mid: 0.85,
  capex: 0.6,
}

const OUR_COVERAGE: Record<Facets['ours'], number> = {
  none: 0,
  pilot: 0.4,
  production: 0.85,
}

export const PREVALENCE_WEIGHT: Record<Prevalence, number> = {
  rare: 0.25,
  uncommon: 0.5,
  common: 0.8,
  ubiquitous: 1,
}

/** How much a robot programme would want this, 0..1. */
export function usefulness(f: Facets): number {
  const contact = f.contact / 5
  const cannotAttempt = ROBOT_DIFFICULTY[f.robotNow]
  const skill = SKILL_WEIGHT[f.skillYears]
  return 0.45 * contact + 0.35 * cannotAttempt + 0.2 * skill
}

/** How cheaply we could actually go and get it, 0..1. Prohibited is a hard zero. */
export function feasibility(f: Facets): number {
  if (f.ethics === 'prohibited') return 0
  let v = PARTNER_COST[f.partner] * CAPITAL_COST[f.capital]
  // Both gates high at once is worse than the product suggests.
  if (PARTNER_COST[f.partner] <= 0.65 && f.capital === 'capex') v *= 0.8
  if (f.ethics === 'restricted') v *= 0.5
  if (f.rights === 'ip-hot') v *= 0.85
  if (f.rights === 'consent-heavy') v *= 0.9
  return v
}

export function gapScore(f: Facets): number {
  const sPublic = PUBLIC_SATURATION[f.saturation]
  const cUs = OUR_COVERAGE[f.ours]
  return (1 - sPublic) * usefulness(f) * feasibility(f) * (1 - cUs)
}

/** 0..1 confidence that a body suit is the right capture tool here. */
export function suitScore(f: Facets): number {
  const base = { excellent: 1, ok: 0.65, poor: 0.3, 'wrong-tool': 0 }[f.suit]
  return base
}

export function publicSaturation(f: Facets): number {
  return PUBLIC_SATURATION[f.saturation]
}

export function ourCoverage(f: Facets): number {
  return OUR_COVERAGE[f.ours]
}

/** One sentence explaining why the score came out where it did. */
export function explainGap(f: Facets): string {
  if (f.ethics === 'prohibited') {
    return 'Blocked on safety and ethics grounds. Listed so it is not rediscovered as a bright gap, never collectable.'
  }
  const parts: string[] = []
  parts.push(
    f.saturation === 'heavy'
      ? 'Public data is already heavy here'
      : f.saturation === 'thin'
        ? 'Public data is thin'
        : 'Effectively no public data',
  )
  if (f.contact >= 4) parts.push('force and tactile are load-bearing, so video alone will not teach it')
  if (f.robotNow === 'no') parts.push('no robot can attempt it today')
  else if (f.robotNow === 'partial') parts.push('robots manage a subset in a jig')
  if (f.skillYears === 'years') parts.push('it takes years of human practice')
  if (f.partner !== 'none') {
    parts.push(
      f.partner === 'regulated'
        ? 'a regulator sits between us and the site'
        : f.partner === 'licensed'
          ? 'it needs a licensed trade to be present'
          : 'it needs site access we do not own',
    )
  }
  if (f.capital === 'capex') parts.push('the equipment is capex, not a suit in a room')
  if (f.ours !== 'none') parts.push(`we already hold ${f.ours} coverage`)
  return parts.join(', ') + '.'
}

/** Suggested capture method, derived rather than typed by hand on 600 nodes. */
export function suggestedCapture(f: Facets): string {
  if (f.ethics === 'prohibited') return 'Not collectable.'
  if (f.suit === 'wrong-tool') {
    return f.precision >= 4
      ? 'Force bench or UMI gripper with wrist cameras. Whole-body kinematics adds nothing at this scale.'
      : 'Teleop or robot replay. The interesting state is in the machine, not the body.'
  }
  if (f.suit === 'poor') return 'Ego video plus wrist cameras. Torso kinematics is mostly noise here.'
  if (f.suit === 'excellent' && f.contact >= 4) {
    return 'Body suit with instrumented gloves or tool force. This is the case the suit exists for.'
  }
  if (f.suit === 'excellent') return 'Body suit plus ego video. Whole-body kinematics transfers.'
  return 'Body suit plus ego video, with hands as the priority stream.'
}
