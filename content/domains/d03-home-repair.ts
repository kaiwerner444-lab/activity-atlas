import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

export const d03: NodeSpec = node(
  'd03',
  'Home utilities and repair',
  'Domestic fixing: plumbing, mounting, sealing, filters and the small appliance that stopped working.',
  {
    setting: 'household',
    dexterity: 4,
    precision: 3,
    contact: 5,
    horizon: 'medium',
    repetition: 'one-shot',
    capital: 'cheap',
    partner: 'none',
    skillYears: 'months',
    suit: 'excellent',
    robotNow: 'no',
    embodiment: ['ego', 'suit', 'video'],
    saturation: 'empty',
    ours: 'none',
    rights: 'easy',
    ethics: 'open',
    prev: 'common',
    prim: ['tool', 'fasten', 'insert', 'inspect'],
  },
  [
    node('plumbing', 'Domestic plumbing', 'Water in confined, awkward, wet places.', { contact: 5, dexterity: 4 }, [
      node('unclog', 'Clear a blocked drain', 'Getting a drain flowing again.', { horizon: 'medium', prev: 'common' }, [
        leaf('clear-p-trap', 'Remove and clear a P-trap', 'Bucket underneath, unscrew both nuts blind, clear, reseat the washers.', { dexterity: 4, contact: 5, saturation: 'empty' }),
        leaf('plunge-and-snake', 'Plunge and snake a drain', 'Seal, plunge, then feed a snake by feel until the blockage gives.', { contact: 5, robotNow: 'no' }),
      ]),
      node('fittings', 'Make up a leak-free joint', 'Making a joint that does not leak.', { precision: 4 }, [
        leaf('compression-fitting', 'Make up a compression fitting', 'Olive, nut, hand tight, then the specified extra turns.', { contact: 5, skillYears: 'months' }),
        leaf('ptfe-tape-thread', 'Wrap PTFE tape on a thread', 'Wrap in the correct direction at the correct overlap and tension.', { dexterity: 5, prim: ['deform'] }),
        leaf('recover-weeping-joint', 'Recover: joint weeping after refill', 'Dry, locate the weep, decide re-torque versus remake.', { fail: true, horizon: 'medium', prim: ['inspect', 'recover'] }),
      ]),
      node('fixture-swap', 'Replace a tap or valve', 'Swapping taps, traps, valves and cisterns.', { horizon: 'long', prev: 'common' }, [
        leaf('replace-tap', 'Replace a kitchen tap', 'Work upside down inside a cupboard with two hands and no sight line.', { dexterity: 5, contact: 5, skillYears: 'months', saturation: 'empty', suit: 'ok' }),
        leaf('service-cistern-valve', 'Service a cistern fill valve', 'Isolate, drain, strip, replace the diaphragm, reassemble, set the level.', { horizon: 'long' }),
      ]),
    ]),
    node('mounting', 'Hanging and mounting', 'Attaching things to walls that may or may not hold them.', { precision: 4, prev: 'ubiquitous' }, [
      node('wall-fixings', 'Drill and set a wall fixing', 'Choosing and setting the right anchor.', { contact: 5 }, [
        leaf('drill-and-plug', 'Drill and set a wall plug', 'Detect substrate by sound and feel, drill square, set the plug.', { prim: ['tool', 'inspect'], skillYears: 'months', saturation: 'empty' }),
        leaf('set-cavity-anchor', 'Set a cavity anchor in plasterboard', 'Set a toggle or metal anchor without spinning it in the board.', { contact: 5 }),
        leaf('recover-blown-hole', 'Recover: hole blown out oversize', 'Decide between filler and repositioning, repair, re-drill.', { fail: true, saturation: 'empty' }),
      ]),
      node('levelling', 'Level and align what you mount', 'Making it straight on a wall that is not.', { precision: 4 }, [
        leaf('hang-shelf-level', 'Hang a shelf level', 'Mark, level, drill, adjust for a wall that is out of plumb.', { prim: ['inspect', 'tool'], horizon: 'medium' }),
        leaf('mount-tv-bracket', 'Mount a TV bracket to studs', 'Find studs, hold weight, start fasteners overhead with a partner.', { prim: ['bimanual', 'language'], dexterity: 3, contact: 5 }),
      ]),
    ]),
    node('sealing', 'Sealing and finishing', 'Bead work and gap filling.', { dexterity: 5, contact: 4, skillYears: 'months', prev: 'common', saturation: 'empty' }, [
      node('caulk', 'Run and tool a silicone bead', 'Laying and tooling a bead.', {}, [
        leaf('run-silicone-bead', 'Run a silicone bead along a bath edge', 'Constant gun speed and trigger pressure along an uneven joint.', { prim: ['tool', 'transfer'], skillYears: 'months' }),
        leaf('tool-bead-finish', 'Tool a bead to a clean finish', 'Wet finger or tool, single pass, remove the excess.', { dexterity: 5, contact: 4 }),
        leaf('recover-broken-bead', 'Recover: bead broken or lumpy', 'Cut the bead out, clean the residue fully, re-run.', { fail: true, horizon: 'medium' }),
      ]),
    ]),
    node('appliance', 'Appliance maintenance and repair', 'Opening consumer products and putting them back.', { dexterity: 5, precision: 4, horizon: 'long', robotNow: 'no', saturation: 'empty', prev: 'common' }, [
      node('filters-consumables', 'Replace filters and consumables', 'The scheduled maintenance nobody documents.', { horizon: 'short', prev: 'ubiquitous' }, [
        leaf('replace-vacuum-filter', 'Replace a vacuum filter', 'Release catches, extract, clean the housing, refit the seal.', { contact: 4 }),
        leaf('descale-kettle-machine', 'Descale a machine', 'Follow a multi-step chemical routine with waiting states.', { prim: ['transfer', 'language'], horizon: 'long' }),
      ]),
      node('teardown-repair', 'Open up and repair an appliance', 'Diagnosis and disassembly of a sealed product.', { skillYears: 'years' }, [
        leaf('open-clipped-housing', 'Open a clipped plastic housing', 'Find hidden clips by feel, release without cracking the shell.', { dexterity: 5, contact: 5, saturation: 'empty', robotNow: 'no' }),
        leaf('diagnose-dead-appliance', 'Diagnose a dead appliance', 'Reason from symptom to component with a meter and a hypothesis.', { prim: ['inspect', 'language'], contact: 2, horizon: 'long' }),
        leaf('recover-broken-clip', 'Recover: clip snapped during teardown', 'Decide glue, replace or accept, and reassemble so it still holds.', { fail: true }),
      ]),
    ]),
  ],
)
