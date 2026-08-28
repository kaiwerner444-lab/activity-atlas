import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

export const d02: NodeSpec = node(
  'd02',
  'Home living and care',
  'Keeping a home working: tidying, textiles, beds, plants, pets, and the small maintenance that never appears in a dataset.',
  {
    setting: 'household',
    dexterity: 4,
    precision: 2,
    contact: 4,
    horizon: 'medium',
    repetition: 'one-shot',
    capital: 'cheap',
    partner: 'none',
    skillYears: 'none',
    suit: 'excellent',
    robotNow: 'partial',
    embodiment: ['ego', 'video', 'suit'],
    saturation: 'thin',
    ours: 'none',
    rights: 'consent-heavy',
    ethics: 'open',
    prev: 'ubiquitous',
    prim: ['grasp', 'deform', 'locomote', 'transfer'],
  },
  [
    node('tidy', 'Tidy and organise', 'Deciding where things belong and putting them there.', { horizon: 'long', prev: 'ubiquitous' }, [
      node('declutter', 'Clear and reset a room', 'Clearing surfaces and restoring a room to a resting state.', { contact: 3, robotNow: 'no', saturation: 'thin' }, [
        leaf('clear-cluttered-table', 'Clear a cluttered table', 'Sort a heap into destinations and carry them in batches.', { prim: ['grasp', 'locomote', 'inspect'] }),
        leaf('put-away-by-category', 'Put objects away by category', 'Infer where an unfamiliar object belongs in this particular home.', { robotNow: 'no', saturation: 'empty', prim: ['inspect', 'grasp'] }),
      ]),
      node('toy-tidy', 'Gather scattered small objects', 'Gathering many small dissimilar objects.', { dexterity: 4 }, [
        leaf('collect-small-objects', 'Collect scattered small objects into a box', 'Sweep a floor area, grasp mixed shapes, deposit.', { saturation: 'thin', robotNow: 'partial' }),
      ]),
    ]),
    node('laundry', 'Laundry and textiles', 'Deformable object manipulation that the field is still bad at.', { contact: 4, dexterity: 4, robotNow: 'partial', saturation: 'thin', prev: 'ubiquitous', prim: ['deform', 'bimanual'] }, [
      node('washing', 'Load, wash and hang laundry', 'Loading, dosing, unloading.', { horizon: 'short' }, [
        leaf('load-washing-machine', 'Load a washing machine', 'Push a compliant load into a drum without jamming the door seal.', { saturation: 'thin' }),
        leaf('hang-on-airer', 'Hang washing on an airer', 'Shake out, drape and space garments so they dry.', { prim: ['deform', 'bimanual'], saturation: 'empty' }),
      ]),
      node('folding', 'Fold and pair laundry', 'Turning a pile into stacks.', { dexterity: 4 }, [
        leaf('fold-t-shirt', 'Fold a t-shirt', 'Flatten, fold in thirds, halve, square the stack.', { saturation: 'heavy', robotNow: 'partial' }),
        leaf('fold-fitted-sheet', 'Fold a fitted sheet', 'Nest the corners and square a shape with no flat state.', { dexterity: 5, contact: 4, robotNow: 'no', saturation: 'empty', skillYears: 'months' }),
        leaf('pair-socks', 'Pair socks from a mixed pile', 'Match by appearance and texture, roll or fold the pair.', { saturation: 'thin' }),
      ]),
      node('ironing', 'Iron and press garments', 'Tool-mediated deformation with heat.', { contact: 4, skillYears: 'months', prev: 'common' }, [
        leaf('iron-shirt', 'Iron a shirt', 'Work panels in order, manage the fabric with the free hand.', { prim: ['tool', 'deform', 'bimanual'], saturation: 'thin' }),
        leaf('press-collar-cuffs', 'Press a collar and cuffs', 'Fine tool work on small stiff panels.', { dexterity: 5, saturation: 'empty' }),
      ]),
    ]),
    node('beds-bath', 'Beds and bathroom', 'Large deformables and confined spaces.', { contact: 4, prev: 'ubiquitous' }, [
      node('bed-making', 'Make and change a bed', 'Whole-body work with a very large deformable.', { dexterity: 3, horizon: 'medium' }, [
        leaf('change-duvet-cover', 'Change a duvet cover', 'Invert, grab corners inside the cover, shake down.', { prim: ['bimanual', 'deform'], robotNow: 'no', saturation: 'empty', skillYears: 'months' }),
        leaf('hospital-corner', 'Make a hospital corner', 'Tuck and fold a sheet into a mitred corner under a mattress.', { dexterity: 4, contact: 4, saturation: 'empty' }),
      ]),
      node('bathroom-clean', 'Clean a bathroom', 'Awkward reaching, wet contact, chemical handling.', { dexterity: 3, contact: 4 }, [
        leaf('clean-shower-screen', 'Clean a shower screen', 'Spray, dwell, squeegee in overlapping passes.', { prim: ['transfer', 'tool'], saturation: 'thin' }),
        leaf('clean-behind-toilet', 'Clean behind and under a toilet', 'Reach into a space too small for the whole arm.', { dexterity: 4, robotNow: 'no', saturation: 'empty' }),
      ]),
    ]),
    node('plants-pets', 'Plants and animals', 'Care tasks where the object moves or is alive.', { prev: 'common', saturation: 'thin' }, [
      node('plant-care', 'Water and repot plants', 'Watering, repotting, pruning indoors.', {}, [
        leaf('repot-houseplant', 'Repot a houseplant', 'Support the root ball, transfer, backfill, firm and water.', { contact: 4, prim: ['bimanual', 'transfer'] }),
      ]),
      node('pet-care', 'Groom and handle a pet', 'Handling a compliant, unpredictable partner.', { contact: 5, robotNow: 'no', saturation: 'empty' }, [
        leaf('brush-a-dog', 'Brush a dog', 'Regulate force against an animal that moves and reacts.', { skillYears: 'months', prim: ['tool', 'inspect'] }),
        leaf('clip-pet-claws', 'Clip a pet claw', 'Restrain gently, position, cut with a hard consequence for error.', { precision: 4, contact: 5, ethics: 'restricted', prev: 'uncommon' }),
      ]),
    ]),
  ],
)
