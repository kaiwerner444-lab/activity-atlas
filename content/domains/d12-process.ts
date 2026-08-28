import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

export const d12: NodeSpec = node(
  'd12',
  'Process and batch plant',
  'Chemical, pharma and food plant operations: valves, sampling, hoses, cleaning and changeover.',
  {
    setting: 'industrial',
    dexterity: 3,
    precision: 3,
    contact: 4,
    horizon: 'long',
    repetition: 'batched',
    capital: 'capex',
    partner: 'site',
    skillYears: 'months',
    suit: 'excellent',
    robotNow: 'no',
    embodiment: ['ego', 'suit'],
    saturation: 'empty',
    ours: 'none',
    rights: 'ip-hot',
    ethics: 'open',
    prev: 'common',
    prim: ['tool', 'locomote', 'inspect', 'fasten'],
  },
  [
    node('line-ops', 'Line and valve operations', 'Making a flow path exist and proving it.', { horizon: 'medium' }, [
      node('valve-work', 'Line up valves from a drawing', 'Physically configuring a plant.', { prev: 'common' }, [
        leaf('line-up-valve-sequence', 'Line up a valve sequence from a P&ID', 'Walk the line, operate valves in order, tick them off against the drawing.', { prim: ['locomote', 'language', 'inspect'], horizon: 'long' }),
        leaf('operate-stiff-valve', 'Operate a stiff manual valve', 'High force, whole-body, in an awkward position.', { contact: 5, dexterity: 2 }),
        leaf('recover-wrong-valve', 'Recover: wrong valve operated', 'Detect from a pressure or level response, correct and report.', { fail: true, horizon: 'medium' }),
      ]),
      node('hose-couplings', 'Change hoses and couplings', 'Temporary flow paths made by hand.', { contact: 5, dexterity: 4 }, [
        leaf('change-flexible-hose', 'Change a flexible transfer hose', 'Drain, break the coupling, swap, reseat the gasket, torque the clamp.', { prim: ['insert', 'fasten'] }),
        leaf('connect-tri-clamp', 'Connect a tri-clamp fitting', 'Seat the gasket, align both ferrules, close the clamp evenly.', { precision: 4, repetition: 'high-takt' }),
        leaf('recover-leaking-clamp', 'Recover: clamp leaking on pressure-up', 'Depressurise, strip, inspect the gasket seat, remake.', { fail: true }),
      ]),
    ]),
    node('sampling', 'Sampling and dosing', 'Taking material out and putting material in.', { precision: 4, dexterity: 4, prev: 'common' }, [
      node('take-sample', 'Draw a process sample', 'Aseptic or hazardous liquid handling from a live line.', { horizon: 'short' }, [
        leaf('draw-line-sample', 'Draw a sample from a sample point', 'Purge, fill, cap and label without contaminating anything.', { prim: ['transfer', 'inspect'] }),
        leaf('aseptic-sample', 'Take an aseptic sample', 'Sterile technique on a live vessel in gowned conditions.', { skillYears: 'years', ethics: 'restricted', rights: 'ip-hot' }),
      ]),
      node('charging', 'Charge and dose a vessel', 'Adding raw material to a vessel.', { contact: 5, dexterity: 3 }, [
        leaf('charge-bag-to-vessel', 'Charge a sack into a vessel', 'Lift, slit and empty a heavy sack into a hopper with dust control.', { prim: ['separate', 'transfer', 'bimanual'] }),
        leaf('weigh-and-dispense', 'Weigh and dispense a minor ingredient', 'Scoop to a tight tolerance and record the weight.', { precision: 5, prim: ['transfer', 'inspect'] }),
      ]),
    ]),
    node('cleaning-changeover', 'Cleaning and changeover', 'The majority of plant labour and none of the data.', { horizon: 'long', contact: 5, saturation: 'empty', prev: 'common' }, [
      node('cip-sip', 'Set up and verify a CIP circuit', 'Clean and steam in place routines.', { prim: ['language', 'inspect'] }, [
        leaf('set-up-cip-circuit', 'Set up a CIP circuit', 'Fit jumpers, line up valves, start the sequence, verify returns.', { horizon: 'long' }),
        leaf('verify-cleanliness', 'Verify cleanliness and swab', 'Inspect, swab defined points, document the result.', { prim: ['inspect'], precision: 4 }),
      ]),
      node('strip-clean', 'Strip, clean and rebuild parts', 'Manual disassembly and cleaning of product-contact parts.', { dexterity: 4, contact: 5 }, [
        leaf('strip-and-clean-filler', 'Strip and clean a filling head', 'Disassemble small precise parts, clean, reassemble with new seals.', { precision: 5, skillYears: 'months' }),
        leaf('replace-filter-cartridge', 'Replace a filter cartridge', 'Bleed, open the housing, swap the element, reseal, integrity test.', { horizon: 'medium' }),
        leaf('recover-missing-seal', 'Recover: seal missing after reassembly', 'Find the leftover part, strip back, fit correctly, re-verify.', { fail: true, horizon: 'medium' }),
      ]),
    ]),
    node('containers', 'Drums, IBCs and containers', 'Moving bulk containers by hand and by truck.', { dexterity: 2, contact: 5, prev: 'common' }, [
      node('drum-handling', 'Handle and open drums', 'Physical work with heavy sealed containers.', {}, [
        leaf('roll-and-upend-drum', 'Roll and upend a drum', 'Whole-body control of a heavy shifting mass.', { prim: ['locomote', 'bimanual'], saturation: 'empty' }),
        leaf('open-drum-bung', 'Open a drum bung safely', 'Vent, break the seal, control any pressure release.', { prim: ['tool', 'inspect'] }),
      ]),
    ]),
  ],
)
