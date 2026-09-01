import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

export const d17: NodeSpec = node(
  'd17',
  'Logistics and yards',
  'The human side of docks, trailers and yards: securing loads, checks, and everything a forklift cannot do.',
  {
    setting: 'outdoor',
    dexterity: 3,
    precision: 2,
    contact: 5,
    horizon: 'medium',
    repetition: 'batched',
    capital: 'mid',
    partner: 'site',
    skillYears: 'months',
    suit: 'excellent',
    robotNow: 'no',
    embodiment: ['ego', 'suit'],
    saturation: 'empty',
    ours: 'none',
    rights: 'easy',
    ethics: 'open',
    prev: 'common',
    prim: ['locomote', 'bimanual', 'fasten', 'inspect'],
  },
  [
    node('load-secure', 'Load securing', 'Making sure nothing moves in transit.', { contact: 5, prev: 'ubiquitous' }, [
      node('strapping', 'Throw and tension a strap', 'Tensioning a load by hand.', {}, [
        leaf('throw-and-tension-strap', 'Throw and tension a ratchet strap', 'Throw over a load, hook, ratchet to tension, secure the tail.', { prim: ['locomote', 'bimanual'], skillYears: 'months' }),
        leaf('fit-corner-protectors', 'Fit corner protectors and dunnage', 'Place protection where the strap would cut the load.', { prim: ['inspect', 'grasp'] }),
        leaf('strap-unit-to-nest', 'Strap a unit into its transport nest', 'Secure a finished assembly to its dunnage so it cannot move.', { cue: 'The unit will not walk in the nest under a firm shove from any direction.', prim: ['fasten', 'inspect'], prev: 'common' }),
        leaf('recover-shifted-load', 'Recover: load shifted in transit', 'Open safely, assess, restack and re-secure.', { fail: true, horizon: 'long' }),
      ]),
      node('wrapping', 'Wrap and band a load', 'Film and steel or plastic band.', { dexterity: 4 }, [
        leaf('machine-wrap-pallet', 'Machine wrap a pallet', 'Load, set the programme, finish the tail by hand.', { capital: 'mid', robotNow: 'yes', saturation: 'thin' }),
        leaf('apply-steel-banding', 'Apply and crimp steel banding', 'Tension, seal and cut a band under high stored energy.', { contact: 5, skillYears: 'months' }),
      ]),
    ]),
    node('dock-ops', 'Dock operations', 'Loading and unloading at the door.', { horizon: 'long', prev: 'common' }, [
      node('trailer-loading', 'Load a trailer by hand', 'Filling a trailer by hand and machine.', { dexterity: 2, contact: 5 }, [
        leaf('hand-ball-a-trailer', 'Hand ball loose cartons in a trailer', 'Sustained lifting and stacking in a confined hot space.', { repetition: 'high-takt', robotNow: 'no', saturation: 'empty' }),
        leaf('position-dock-plate', 'Position a dock plate and check the seal', 'Set the bridge and confirm the trailer is chocked.', { prim: ['inspect', 'tool'] }),
      ]),
      node('checks', 'Check seals and walk around', 'Verification with a clipboard or a scanner.', { contact: 2, prim: ['inspect', 'language'] }, [
        leaf('seal-check-and-record', 'Check and record a seal number', 'Read, compare, document, escalate a mismatch.', { horizon: 'short' }),
        leaf('walk-around-trailer-check', 'Walk around a trailer check', 'Fixed inspection route with defect judgement.', { prim: ['locomote', 'inspect'] }),
      ]),
    ]),
    node('containers-yard', 'Containers and yard work', 'Outside, in weather, with heavy hardware.', { contact: 5, prev: 'common', saturation: 'empty' }, [
      node('container-handling', 'Open and stuff a container', 'Doors, twistlocks, stuffing.', {}, [
        leaf('open-container-doors', 'Open container doors safely', 'Release the cams expecting a load against the door.', { contact: 5, skillYears: 'months' }),
        leaf('stuff-a-container', 'Stuff a container by hand', 'Plan and build a stable wall of cargo to the doors.', { horizon: 'long', robotNow: 'no' }),
      ]),
      node('couple-uncouple', 'Couple and uncouple a trailer', 'Tractor and trailer connection.', { dexterity: 3 }, [
        leaf('connect-susies', 'Connect air and electrical lines', 'Couple lines by feel behind a cab, verify the connection.', { prim: ['insert', 'inspect'] }),
        leaf('wind-down-landing-legs', 'Wind down landing legs', 'High-force repetitive cranking with a body position choice.', { contact: 5 }),
      ]),
    ]),
    node('hazmat', 'Hazardous and regulated goods', 'Where the paperwork is the task.', { partner: 'regulated', ethics: 'restricted', prim: ['inspect', 'language'], contact: 2, prev: 'uncommon' }, [
      node('labelling-hazmat', 'Label and segregate hazardous goods', 'Getting the classification right.', {}, [
        leaf('apply-hazard-labels', 'Apply hazard labels and placards', 'Select and place the correct labels for a consignment.', { precision: 3 }),
        leaf('segregate-incompatible', 'Segregate incompatible goods', 'Apply a segregation table to a real pallet layout.', { prim: ['language', 'inspect'], robotNow: 'no' }),
      ]),
    ]),
  ],
)
