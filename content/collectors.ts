import type { Collector } from '@/lib/types'

// Highlighting a collector washes the map toward that collector's bias. That is
// the point: turning on Open X-Embodiment should visibly collapse the atlas
// toward tabletop pick-place and leave industrial recovery dark.

export const COLLECTORS: Collector[] = [
  {
    id: 'us',
    name: 'Us',
    type: 'us',
    knownBias: 'Whatever we pointed a suit at last. Currently industrial, hand-heavy, short horizon.',
    color: '#4c9be8',
  },
  {
    id: 'ego4d',
    name: 'Ego4D',
    type: 'public_set',
    knownBias: 'Unscripted daily life, ego video only. No force, no kinematics, no task labels at procedure level.',
    color: '#e8a33d',
  },
  {
    id: 'epic',
    name: 'EPIC-KITCHENS',
    type: 'public_set',
    knownBias: 'Kitchens, kitchens, kitchens. Dense narration, ego only.',
    color: '#e8683d',
  },
  {
    id: 'egoexo4d',
    name: 'Ego-Exo4D',
    type: 'public_set',
    knownBias: 'Skilled procedure with expert commentary: cooking, bike repair, music, sport. Paired ego and exo, no force.',
    color: '#c86fd6',
  },
  {
    id: 'oxe',
    name: 'Open X-Embodiment',
    type: 'public_set',
    knownBias: 'Robot tables. Parallel jaw grippers, pick and place, short horizon, single room.',
    color: '#5ecfa6',
  },
  {
    id: 'droid',
    name: 'DROID',
    type: 'public_set',
    knownBias: 'Teleoperated Franka arms in many scenes, still tabletop manipulation.',
    color: '#8fd45e',
  },
  {
    id: 'agibot',
    name: 'AgiBot World',
    type: 'public_set',
    knownBias: 'Humanoid teleop at scale, domestic and retail scenarios, scripted.',
    color: '#d6c96f',
  },
  {
    id: 'partner-loom',
    name: 'Partner: OEM loom plant',
    type: 'vendor',
    knownBias: 'One customer, one product family. IP hot, high takt, no failure cases on purpose.',
    color: '#8b8fa3',
  },
]

export const COLLECTOR_BY_ID: Record<string, Collector> = Object.fromEntries(
  COLLECTORS.map((c) => [c.id, c]),
)
