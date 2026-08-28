import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

export const d13: NodeSpec = node(
  'd13',
  'Agriculture and outdoor land',
  'Growing, harvesting and land work: unstructured environments, biological variation, weather.',
  {
    setting: 'outdoor',
    dexterity: 4,
    precision: 3,
    contact: 4,
    horizon: 'long',
    repetition: 'high-takt',
    capital: 'mid',
    partner: 'site',
    skillYears: 'months',
    suit: 'excellent',
    robotNow: 'partial',
    embodiment: ['ego', 'suit', 'video'],
    saturation: 'thin',
    ours: 'none',
    rights: 'easy',
    ethics: 'open',
    prev: 'common',
    prim: ['grasp', 'separate', 'locomote', 'inspect'],
  },
  [
    node('crop-work', 'Hands on crops', 'Hands on plants.', { dexterity: 5, contact: 4 }, [
      node('harvesting', 'Harvest by hand', 'Selective picking of biological objects.', { repetition: 'high-takt', prev: 'ubiquitous' }, [
        leaf('pick-soft-fruit', 'Pick soft fruit', 'Judge ripeness and detach without bruising, hundreds per hour.', { dexterity: 5, contact: 5, robotNow: 'partial', saturation: 'thin' }),
        leaf('cut-stem-harvest', 'Cut-stem harvest a vegetable', 'Locate the cut point under leaves and cut cleanly.', { prim: ['separate', 'inspect'], contact: 4 }),
        leaf('grade-in-field', 'Grade produce in the field', 'Accept, reject or second-grade in under a second.', { prim: ['inspect'], robotNow: 'partial' }),
      ]),
      node('pruning', 'Prune and tie in', 'Deciding what to remove from a plant.', { skillYears: 'years', robotNow: 'no', saturation: 'empty', horizon: 'long' }, [
        leaf('prune-vine-winter', 'Winter prune a vine', 'Choose the canes to keep from a tangle, then cut.', { prim: ['inspect', 'separate'], skillYears: 'years' }),
        leaf('tie-in-a-cane', 'Tie in a cane to a wire', 'Bend a woody stem without snapping it and tie it.', { contact: 5, prim: ['deform', 'fasten'] }),
      ]),
      node('planting', 'Plant and transplant', 'Putting things in the ground.', { dexterity: 3, prev: 'common' }, [
        leaf('transplant-plug', 'Transplant a plug', 'Extract, place at depth, firm the soil, repeat at rate.', { repetition: 'high-takt', robotNow: 'partial' }),
        leaf('plant-bare-root-tree', 'Plant a bare root tree', 'Dig, position, backfill, stake and firm.', { contact: 5, horizon: 'medium' }),
      ]),
    ]),
    node('machinery', 'Machinery and implements', 'Human work around agricultural machines.', { dexterity: 2, contact: 5, capital: 'capex', prev: 'common' }, [
      node('hitching', 'Hitch and connect an implement', 'Attaching implements to tractors.', { saturation: 'empty' }, [
        leaf('hitch-three-point', 'Hitch a three-point implement', 'Align by eye, fit link arms, pin, connect PTO and hydraulics.', { prim: ['insert', 'fasten', 'language'], horizon: 'medium' }),
        leaf('connect-hydraulic-couplers', 'Connect hydraulic quick couplers', 'Relieve pressure, connect under residual load, verify.', { contact: 5 }),
        leaf('recover-mismatched-coupler', 'Recover: coupler will not seat', 'Diagnose trapped pressure, relieve it, reconnect.', { fail: true }),
      ]),
      node('field-maintenance', 'Fix machinery in the field', 'Fixing machinery where it broke.', { horizon: 'long', skillYears: 'years', saturation: 'empty', robotNow: 'no' }, [
        leaf('replace-shear-bolt', 'Replace a shear bolt in the field', 'Clear the blockage, align, fit a new bolt with limited tools.', { fail: true, contact: 5 }),
        leaf('grease-round-and-inspect', 'Grease round and inspect a machine', 'Walk a fixed route of grease points and look for damage.', { prim: ['tool', 'inspect', 'locomote'] }),
      ]),
    ]),
    node('livestock', 'Livestock handling', 'Working with animals that have their own plans.', { contact: 5, robotNow: 'no', saturation: 'empty', ethics: 'restricted', prev: 'common' }, [
      node('handling', 'Moving and restraining animals', 'Physical negotiation with a large animal.', { prim: ['locomote', 'language', 'bimanual'] }, [
        leaf('move-stock-through-race', 'Move stock through a race', 'Position, pressure and release to direct a herd.', { skillYears: 'years' }),
        leaf('restrain-for-treatment', 'Restrain an animal for treatment', 'Hold safely for both parties while another person works.', { contact: 5 }),
      ]),
      node('animal-husbandry', 'Trim, dose and check animals', 'Feet, dosing, checks.', { skillYears: 'years' }, [
        leaf('trim-a-hoof', 'Trim a hoof', 'High force cutting on a moving limb with a hard consequence for error.', { dexterity: 4, contact: 5 }),
      ]),
    ]),
    node('groundwork', 'Grounds and land maintenance', 'Everything that keeps land in a state.', { prev: 'ubiquitous', saturation: 'thin' }, [
      node('vegetation', 'Mow, strim and cut hedges', 'Mowing, strimming, hedge work.', { dexterity: 3, contact: 4 }, [
        leaf('strim-around-obstacle', 'Strim around obstacles', 'Sustained tool control near things that must not be cut.', { precision: 4, prim: ['tool', 'locomote'] }),
        leaf('cut-a-hedge-to-line', 'Cut a hedge to a line', 'Hold a heavy tool steady along an imagined plane.', { dexterity: 3, skillYears: 'months' }),
      ]),
      node('irrigation-fencing', 'Repair irrigation and fencing', 'Linear infrastructure across land.', { horizon: 'long' }, [
        leaf('repair-drip-line', 'Repair a drip irrigation line', 'Find the leak, cut out, fit a coupler, test.', { fail: true, prim: ['inspect', 'insert'] }),
        leaf('strain-a-fence-wire', 'Strain a fence wire', 'Tension, tie off and check along a run.', { contact: 5, prim: ['deform', 'tool'] }),
      ]),
    ]),
  ],
)
