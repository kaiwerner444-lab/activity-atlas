import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// Ethics-gated throughout. Prohibited nodes are listed so nobody rediscovers
// them as a bright gap; they score zero feasibility and cannot be collected.

export const d07: NodeSpec = node(
  'd07',
  'Healthcare and caregiving',
  'Physical care of people: mobility, hygiene, wound care, monitoring. Consent and regulation gate almost every leaf.',
  {
    setting: 'clinical',
    dexterity: 4,
    precision: 3,
    contact: 5,
    horizon: 'medium',
    repetition: 'batched',
    capital: 'mid',
    partner: 'regulated',
    skillYears: 'years',
    suit: 'ok',
    robotNow: 'no',
    embodiment: ['ego', 'suit'],
    saturation: 'empty',
    ours: 'none',
    rights: 'consent-heavy',
    ethics: 'restricted',
    prev: 'common',
    prim: ['bimanual', 'language', 'inspect', 'grasp'],
  },
  [
    node('mobility', 'Mobility and transfer', 'Moving a person who cannot move themselves.', { contact: 5, dexterity: 2, prev: 'common' }, [
      node('transfers', 'Transfer a person', 'Bed to chair, chair to toilet, floor recovery.', { skillYears: 'years' }, [
        leaf('assist-sit-to-stand', 'Assist a sit to stand', 'Coordinate with the person verbally and physically, share the load.', { prim: ['bimanual', 'language'], contact: 5 }),
        leaf('hoist-transfer', 'Transfer with a hoist and sling', 'Position a sling under a person, attach, operate, land safely.', { capital: 'mid', horizon: 'medium' }),
        leaf('recover-slipping-transfer', 'Recover: transfer starting to fail', 'Recognise the slip, lower controllably, call for help.', { fail: true, robotNow: 'no' }),
      ]),
      node('repositioning', 'Reposition a person in bed', 'Preventing harm from stillness.', {}, [
        leaf('reposition-in-bed', 'Reposition a person in bed', 'Slide sheet technique with a second carer, coordinated by voice.', { prim: ['bimanual', 'language'], contact: 5 }),
      ]),
    ]),
    node('personal-care', 'Personal care', 'Hygiene and dressing with dignity.', { contact: 5, rights: 'consent-heavy', ethics: 'restricted', prev: 'common' }, [
      node('dressing', 'Dress another person', 'Deformable garments on a compliant, sometimes resistant body.', { dexterity: 5, robotNow: 'no' }, [
        leaf('put-on-shirt-assist', 'Assist putting on a shirt', 'Guide a limb through a sleeve while managing balance.', { prim: ['deform', 'bimanual', 'language'] }),
        leaf('fit-compression-stocking', 'Fit a compression stocking', 'High force on a deformable over a fragile limb.', { contact: 5, skillYears: 'months' }),
      ]),
      node('hygiene', 'Wash and groom another person', 'Bed baths, oral care, grooming.', {}, [
        leaf('bed-bath', 'Give a bed bath', 'Long-horizon sequence with continuous consent checking.', { horizon: 'long', prim: ['transfer', 'language'] }),
      ]),
    ]),
    node('clinical-tasks', 'Clinical procedures', 'Where regulation is the binding constraint, not capability.', { partner: 'regulated', ethics: 'restricted', prev: 'common' }, [
      node('wound-care', 'Dress and assess a wound', 'Dressing changes and assessment.', { dexterity: 5, precision: 4 }, [
        leaf('change-simple-dressing', 'Change a simple dressing', 'Aseptic sequence with sterile field discipline.', { skillYears: 'months', horizon: 'medium' }),
        leaf('assess-wound-visually', 'Assess a wound and document it', 'Observation and structured description.', { prim: ['inspect', 'language'], contact: 2 }),
      ]),
      node('monitoring', 'Take and record vitals', 'Instrumented observation of a person.', { contact: 3, dexterity: 4 }, [
        leaf('take-manual-bp', 'Take a manual blood pressure', 'Cuff placement, inflation, auscultation, reading.', { prim: ['tool', 'inspect'] }),
        leaf('place-ecg-electrodes', 'Place ECG electrodes', 'Locate anatomical landmarks by palpation and place accurately.', { precision: 4, contact: 4 }),
      ]),
      node('invasive', 'Invasive procedures (blocked)', 'Listed as blocked. Not collectable at any coverage level.', { ethics: 'prohibited', partner: 'regulated', robotNow: 'no', notes: 'Blocked node. Present so it is never rediscovered as a bright gap.' }, [
        leaf('cannulation', 'Peripheral cannulation', 'Blocked: invasive procedure on a person.', { ethics: 'prohibited' }),
        leaf('surgical-assist', 'Surgical assisting', 'Blocked: invasive procedure on a person.', { ethics: 'prohibited' }),
      ]),
    ]),
    node('equipment', 'Clinical equipment handling', 'The non-patient half of care work.', { ethics: 'open', partner: 'site', contact: 4, skillYears: 'months', prev: 'common' }, [
      node('bed-equipment', 'Set up beds and mobility equipment', 'Setting up and maintaining the hardware.', {}, [
        leaf('make-occupied-bed', 'Make an occupied bed', 'Change linen with a person still in it.', { dexterity: 4, contact: 5, prim: ['deform', 'bimanual'], saturation: 'empty' }),
        leaf('set-up-wheelchair', 'Set up and adjust a wheelchair', 'Fit footplates, set brakes, adjust for the person.', { prim: ['fasten', 'inspect'] }),
      ]),
      node('sterile-supply', 'Assemble sterile supplies', 'Packs, trays and consumables.', { repetition: 'high-takt', ethics: 'open' }, [
        leaf('assemble-procedure-tray', 'Assemble a procedure tray', 'Pick a defined set into a tray in a defined layout.', { prim: ['grasp', 'inspect'], robotNow: 'partial', saturation: 'thin' }),
      ]),
    ]),
  ],
)
