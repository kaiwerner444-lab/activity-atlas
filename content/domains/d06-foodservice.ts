import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

export const d06: NodeSpec = node(
  'd06',
  'Food service and commercial kitchen',
  'Kitchen work at takt: prep, line, pass, bar and dish pit, under time pressure and verbal coordination.',
  {
    setting: 'commercial',
    dexterity: 4,
    precision: 3,
    contact: 4,
    horizon: 'medium',
    repetition: 'high-takt',
    capital: 'mid',
    partner: 'site',
    skillYears: 'months',
    suit: 'excellent',
    robotNow: 'no',
    embodiment: ['ego', 'suit', 'video'],
    saturation: 'thin',
    ours: 'none',
    rights: 'consent-heavy',
    ethics: 'open',
    prev: 'common',
    prim: ['tool', 'transfer', 'locomote', 'language'],
  },
  [
    node('prep-kitchen', 'Prep kitchen work', 'Volume preparation before service.', { horizon: 'long', repetition: 'batched' }, [
      node('volume-cutting', 'Cut at volume', 'The same cut, hundreds of times.', { dexterity: 5, contact: 4 }, [
        leaf('batch-dice-vegetables', 'Batch dice vegetables', 'Sustain a rate and a size tolerance for an hour.', { repetition: 'high-takt', saturation: 'thin' }),
        leaf('break-down-primal', 'Break down a meat primal', 'Follow seams by feel and yield the right cuts.', { contact: 5, skillYears: 'years', robotNow: 'no', saturation: 'empty' }),
      ]),
      node('batch-cooking', 'Cook and portion in batches', 'Large volumes into portions.', { dexterity: 3 }, [
        leaf('portion-to-weight', 'Portion to a target weight', 'Scoop, weigh, adjust, in a rhythm.', { prim: ['transfer', 'inspect'], repetition: 'high-takt' }),
        leaf('transfer-hot-stock', 'Transfer a hot stock pot', 'Move a heavy hot liquid load safely across a wet floor.', { contact: 5, prim: ['locomote', 'bimanual'], saturation: 'empty' }),
      ]),
    ]),
    node('line', 'The line during service', 'Parallel tasks under time pressure with verbal coordination.', { horizon: 'short', repetition: 'high-takt', saturation: 'empty', robotNow: 'no' }, [
      node('station-work', 'Run a station through a rush', 'Running a station through a rush.', { skillYears: 'years' }, [
        leaf('run-saute-station', 'Run a sauté station through a rush', 'Hold four pans in different states in your head and hands.', { prim: ['tool', 'language', 'inspect'], horizon: 'medium' }),
        leaf('grill-to-temperature', 'Grill to a requested temperature', 'Judge doneness by touch and timing, not a probe.', { contact: 5, skillYears: 'years' }),
        leaf('recover-dropped-ticket', 'Recover: ticket missed during a rush', 'Detect the gap, re-sequence the pass, communicate the delay.', { fail: true, prim: ['language', 'recover'] }),
      ]),
      node('expedite', 'Plate and call the pass', 'Assembly and handoff under a clock.', { dexterity: 5, precision: 4 }, [
        leaf('plate-to-spec', 'Plate a dish to spec', 'Place components in a defined arrangement quickly and identically.', { precision: 4, repetition: 'high-takt', saturation: 'empty' }),
        leaf('call-and-hand-off', 'Call the pass and hand off', 'Verbal coordination and physical handover of hot plates.', { prim: ['language', 'bimanual'], contact: 3 }),
      ]),
    ]),
    node('bar', 'Bar and beverage service', 'Fast pouring, mixing and glassware handling.', { dexterity: 5, horizon: 'short', prev: 'common', saturation: 'thin' }, [
      node('drink-build', 'Build and mix drinks', 'Free pour, shake, stir, garnish.', {}, [
        leaf('free-pour-to-count', 'Free pour a measure to count', 'Calibrated wrist motion producing a repeatable volume.', { precision: 4, skillYears: 'months', saturation: 'empty' }),
        leaf('shake-and-double-strain', 'Shake and double strain', 'Seal a shaker, shake, break the seal, strain with two hands.', { prim: ['bimanual', 'tool'], contact: 4 }),
      ]),
      node('draught', 'Pour draught and carry glassware', 'Beer, glass handling and line care.', {}, [
        leaf('pour-draught-head', 'Pour a draught beer with the right head', 'Angle, straighten, top, judging foam live.', { prim: ['transfer', 'inspect'] }),
        leaf('carry-multiple-glasses', 'Carry multiple glasses one-handed', 'Distributed grip on fragile objects while walking.', { dexterity: 5, contact: 5, prim: ['locomote', 'grasp'], saturation: 'empty' }),
      ]),
    ]),
    node('dishpit', 'Dish pit and kitchen reset', 'Wet, hot, fast, and completely unrecorded.', { dexterity: 3, contact: 5, saturation: 'empty', repetition: 'high-takt', prev: 'ubiquitous' }, [
      node('dish-flow', 'Run dishes through the pit', 'Scrape, rack, run, put away.', {}, [
        leaf('rack-and-run', 'Rack and run a dishwasher cycle', 'Sort mixed items into a rack pattern and cycle it.', { horizon: 'short' }),
        leaf('scrub-burnt-pan-commercial', 'Scrub a burnt commercial pan', 'Sustained high force with a chemical and abrasive.', { contact: 5, robotNow: 'no' }),
      ]),
      node('close-down', 'Break down and clean the kitchen', 'End of service reset.', { horizon: 'long' }, [
        leaf('break-down-station', 'Break down and clean a station', 'Strip, wrap, label, wipe, sanitise, restock.', { prim: ['transfer', 'grasp'], horizon: 'long' }),
        leaf('clean-grease-filters', 'Clean extraction grease filters', 'Remove overhead filters and degrease them.', { contact: 5, dexterity: 3 }),
      ]),
    ]),
  ],
)
