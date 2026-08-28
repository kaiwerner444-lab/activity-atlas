import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

export const d14: NodeSpec = node(
  'd14',
  'Vehicles and mobility',
  'Workshop and roadside work on vehicles: wheels, fluids, brakes, electrics, trim and diagnosis.',
  {
    setting: 'vehicle',
    dexterity: 4,
    precision: 3,
    contact: 5,
    horizon: 'medium',
    repetition: 'batched',
    capital: 'mid',
    partner: 'site',
    skillYears: 'years',
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
    node('wheels-tyres', 'Wheels and tyres', 'The most repeated workshop job.', { repetition: 'high-takt', prev: 'ubiquitous' }, [
      node('wheel-change', 'Jack up and change a wheel', 'Lifting, removing and torquing.', { dexterity: 3, contact: 5 }, [
        leaf('jack-and-support', 'Jack and support a vehicle', 'Locate the jacking point, lift, place axle stands, verify stability.', { prim: ['inspect', 'tool'], skillYears: 'months' }),
        leaf('remove-refit-wheel', 'Remove and refit a wheel', 'Handle a heavy wheel, align the studs, torque in sequence.', { prim: ['bimanual', 'fasten'] }),
        leaf('recover-seized-nut', 'Recover: seized or rounded wheel nut', 'Escalate through methods without damaging the hub.', { fail: true, horizon: 'medium', skillYears: 'years', saturation: 'empty' }),
      ]),
      node('tyre-work', 'Fit and balance a tyre', 'Machine-assisted but hand-guided.', { capital: 'mid' }, [
        leaf('break-bead-and-demount', 'Break the bead and demount a tyre', 'Guide the machine and lever without damaging the rim.', { contact: 5, skillYears: 'months' }),
        leaf('balance-and-fit-weights', 'Balance a wheel and fit weights', 'Read the machine, place weights at the marked positions.', { prim: ['inspect', 'fasten'] }),
      ]),
    ]),
    node('service', 'Routine vehicle service', 'Fluids, filters and checks.', { prev: 'ubiquitous', saturation: 'thin' }, [
      node('fluids-filters', 'Drain, refill and change filters', 'Drain, replace, refill, check.', { dexterity: 4, contact: 4 }, [
        leaf('drain-and-refill-oil', 'Drain and refill engine oil', 'Work under a vehicle with a hot fluid and a torque spec.', { prim: ['transfer', 'tool'] }),
        leaf('change-cartridge-filter', 'Change a cartridge oil filter', 'Access a tight housing, replace the seal, torque to spec.', { dexterity: 5, precision: 4 }),
        leaf('bleed-brakes-two-person', 'Bleed brakes with a partner', 'Coordinated two-person sequence over voice.', { prim: ['language', 'tool'], horizon: 'medium', saturation: 'empty' }),
      ]),
      node('inspection-service', 'Inspect and report to a customer', 'Look, measure, report.', { prim: ['inspect', 'language'], contact: 2 }, [
        leaf('measure-pad-thickness', 'Measure brake pad thickness', 'Access, measure through the caliper, record.', { precision: 4 }),
        leaf('report-findings-to-customer', 'Explain findings to a customer', 'Translate a technical finding into a decision.', { prim: ['language'], contact: 1, saturation: 'empty' }),
      ]),
    ]),
    node('vehicle-electrics', 'Vehicle electrics and harness', 'Confined-space electrical work with the D11 skill set.', { dexterity: 5, contact: 5, skillYears: 'years', saturation: 'empty', robotNow: 'no', prev: 'common' }, [
      node('under-dash', 'Work under a dashboard', 'Working inverted with no line of sight.', { suit: 'ok' }, [
        leaf('access-under-dash', 'Get access under a dashboard', 'Remove trim in the right order and get the body into position.', { prim: ['locomote', 'grasp'], horizon: 'medium' }),
        leaf('splice-in-vehicle-harness', 'Splice into a vehicle harness', 'Identify the correct wire, splice, insulate, re-secure.', { dexterity: 5, precision: 4 }),
      ]),
      node('vehicle-diagnostics', 'Diagnose a vehicle fault', 'Reasoning about a system you cannot see.', { prim: ['inspect', 'language'], contact: 2, horizon: 'long', robotNow: 'no' }, [
        leaf('read-codes-and-hypothesise', 'Read fault codes and form a hypothesis', 'Turn codes plus symptoms into a test plan.', { skillYears: 'years' }),
        leaf('backprobe-a-connector', 'Back-probe a live connector', 'Probe without damaging the seal, read while a partner operates.', { dexterity: 5, precision: 5, prim: ['language'] }),
      ]),
    ]),
    node('trim-body', 'Trim, body and glass', 'Panels, clips and adhesives.', { dexterity: 5, contact: 5, prev: 'common', saturation: 'empty' }, [
      node('trim-removal', 'Remove and refit trim', 'Hidden clips and one-shot fasteners.', {}, [
        leaf('remove-door-card', 'Remove a door card', 'Find and release hidden clips without breaking them.', { skillYears: 'months' }),
        leaf('recover-broken-clip-trim', 'Recover: trim clip broken on removal', 'Extract the remains, source a replacement, refit securely.', { fail: true }),
      ]),
      node('body-glass', 'Bond glass and panels', 'Larger panels and adhesives.', { dexterity: 3, capital: 'mid', prev: 'uncommon' }, [
        leaf('bond-in-a-windscreen', 'Bond in a windscreen', 'Two-person placement onto a fresh bead with one attempt.', { prim: ['bimanual', 'language'], precision: 5, skillYears: 'years' }),
      ]),
    ]),
    node('road-test', 'Road test and handover', 'Verification that requires driving.', { contact: 2, dexterity: 2, prim: ['locomote', 'inspect', 'language'], prev: 'common', suit: 'poor' }, [
      node('test-drive', 'Road test to reproduce a fault', 'Judging a vehicle by feel.', { horizon: 'medium', saturation: 'thin' }, [
        leaf('road-test-for-noise', 'Road test to reproduce a noise', 'Drive the specific conditions that provoke a fault.', { skillYears: 'years', robotNow: 'no' }),
      ]),
    ]),
  ],
)
