import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

export const d05: NodeSpec = node(
  'd05',
  'Retail and warehouse',
  'Goods moving through a building: receive, put away, pick, pack, replenish, return.',
  {
    setting: 'commercial',
    dexterity: 3,
    precision: 2,
    contact: 3,
    horizon: 'short',
    repetition: 'high-takt',
    capital: 'mid',
    partner: 'site',
    skillYears: 'none',
    suit: 'excellent',
    robotNow: 'partial',
    embodiment: ['ego', 'suit', 'video', 'robot'],
    saturation: 'heavy',
    ours: 'none',
    rights: 'easy',
    ethics: 'open',
    prev: 'ubiquitous',
    prim: ['grasp', 'locomote', 'inspect'],
  },
  [
    node('receiving', 'Receiving and put-away', 'Getting stock from a lorry onto a shelf.', { horizon: 'medium' }, [
      node('unload-check', 'Unload and check in a delivery', 'Comparing what arrived to what was expected.', {}, [
        leaf('scan-and-book-in', 'Scan and book in a pallet', 'Scan labels, compare to the manifest, resolve short shipments.', { prim: ['inspect', 'language'], saturation: 'thin' }),
        leaf('debag-and-decant', 'Debag and decant into totes', 'Open packaging and transfer mixed goods without damage.', { dexterity: 4, contact: 4 }),
        leaf('recover-damaged-carton', 'Recover: carton damaged in transit', 'Assess, photograph, segregate, raise the claim.', { fail: true, prim: ['inspect', 'language'], saturation: 'empty' }),
      ]),
      node('put-away', 'Put stock away to location', 'Placing stock where the system says.', { prim: ['locomote', 'grasp'] }, [
        leaf('place-to-shelf-location', 'Place stock to a scanned location', 'Walk, scan, place, confirm.', { saturation: 'heavy', robotNow: 'yes' }),
        leaf('place-high-bay-manual', 'Place stock on a high shelf from steps', 'Lift above shoulder height on unstable footing.', { dexterity: 2, contact: 4, saturation: 'thin' }),
      ]),
    ]),
    node('picking', 'Order picking', 'The most robot-attempted task in the world.', { saturation: 'heavy', robotNow: 'yes', prev: 'ubiquitous' }, [
      node('each-pick', 'Pick single items', 'Single items from bins or shelves.', { dexterity: 4 }, [
        leaf('pick-from-tote', 'Pick a single item from a tote', 'Reach, grasp a known SKU, transfer to a carton.', { saturation: 'heavy', robotNow: 'yes', notes: 'Present so the atlas shows what heavy really looks like next to an empty branch.' }),
        leaf('pick-deformable-item', 'Pick a bagged or deformable item', 'Grasp something with no rigid shape from a cluttered bin.', { contact: 4, robotNow: 'partial', saturation: 'thin' }),
        leaf('recover-mispick', 'Recover: wrong item picked', 'Catch at pack, return to location, re-pick, correct the count.', { fail: true, saturation: 'empty' }),
      ]),
      node('case-pick', 'Pick cases and build pallets', 'Heavier units, whole-body work.', { dexterity: 2, contact: 4, horizon: 'medium' }, [
        leaf('build-mixed-pallet', 'Build a mixed pallet by hand', 'Plan a stable stack from heterogeneous cases as you go.', { robotNow: 'no', saturation: 'thin', skillYears: 'months' }),
        leaf('lift-awkward-case', 'Lift an awkward or shifting case', 'Handle a load whose centre of mass moves.', { contact: 5, saturation: 'empty' }),
      ]),
    ]),
    node('packing', 'Packing and dispatch', 'Making a shipment out of picked goods.', { dexterity: 4, prev: 'ubiquitous' }, [
      node('pack-station', 'Pack a carton at a station', 'Carton selection, void fill, seal, label.', { repetition: 'high-takt' }, [
        leaf('assemble-carton', 'Assemble a flat carton', 'Fold flaps in sequence and tape the base.', { prim: ['deform', 'fasten'], saturation: 'thin' }),
        leaf('void-fill-and-seal', 'Void fill and seal a carton', 'Judge the fill needed, add it, tape the top square.', { saturation: 'thin' }),
        leaf('wrap-fragile-item', 'Wrap a fragile item', 'Wrap a rigid object in a compliant sheet with two hands.', { dexterity: 5, contact: 4, robotNow: 'no', saturation: 'empty' }),
      ]),
      node('palletise', 'Stack and wrap a pallet', 'Making a pallet stable enough to travel.', { dexterity: 2, contact: 4 }, [
        leaf('stack-pallet-interlock', 'Stack a pallet with interlocked layers', 'Choose a pattern that holds without wrap.', { skillYears: 'months', robotNow: 'partial' }),
        leaf('hand-wrap-pallet', 'Hand wrap a pallet', 'Walk the roll around the load at constant tension and overlap.', { prim: ['locomote', 'deform'], saturation: 'thin' }),
      ]),
    ]),
    node('shopfloor', 'Shop floor and merchandising', 'The retail half: shelves, faces and customers.', { setting: 'commercial', horizon: 'medium', prev: 'ubiquitous' }, [
      node('replenish', 'Replenish and face a shelf', 'Keeping a shelf looking full.', { dexterity: 4, saturation: 'thin' }, [
        leaf('face-up-shelf', 'Face up a shelf', 'Pull stock forward and align faces without knocking over neighbours.', { precision: 3, robotNow: 'partial' }),
        leaf('rotate-date-coded-stock', 'Rotate date-coded stock', 'Pull old forward, load new behind, check dates.', { prim: ['inspect', 'grasp'] }),
      ]),
      node('customer-interaction', 'Serve a customer face to face', 'Physical work with a person in the loop.', { prim: ['language', 'grasp'], contact: 2, saturation: 'empty' }, [
        leaf('hand-item-to-customer', 'Hand an item to a customer', 'Offer, release on their grasp, confirm verbally.', { prev: 'ubiquitous', robotNow: 'partial' }),
        leaf('find-item-for-customer', 'Find an item for a customer', 'Interpret a vague description and walk to it.', { prim: ['language', 'locomote', 'inspect'], robotNow: 'no' }),
      ]),
    ]),
    node('returns', 'Returns and reverse logistics', 'Unstructured input, human judgement, no dataset.', { saturation: 'empty', robotNow: 'no', horizon: 'medium', prev: 'common' }, [
      node('inspect-returns', 'Inspect and grade a return', 'Deciding what a used item is worth.', { prim: ['inspect', 'grasp'] }, [
        leaf('grade-returned-item', 'Grade a returned item', 'Inspect for wear and completeness, assign a grade.', { skillYears: 'months' }),
        leaf('repack-for-resale', 'Repack an item for resale', 'Restore packaging to a saleable state.', { dexterity: 5, contact: 4 }),
      ]),
    ]),
  ],
)
