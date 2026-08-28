import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// The most photographed domain on earth. Seeded densely enough that the atlas
// does not look like a cable catalogue, and tagged honestly as saturated so it
// does not light up as an opportunity.

export const d01: NodeSpec = node(
  'd01',
  'Home kitchen and food',
  'Domestic food preparation from reaching into a fridge to putting the last plate away.',
  {
    setting: 'household',
    dexterity: 4,
    precision: 2,
    contact: 3,
    horizon: 'medium',
    repetition: 'one-shot',
    capital: 'cheap',
    partner: 'none',
    skillYears: 'none',
    suit: 'excellent',
    robotNow: 'partial',
    embodiment: ['ego', 'video', 'suit', 'umi'],
    saturation: 'heavy',
    ours: 'none',
    rights: 'consent-heavy',
    ethics: 'open',
    prev: 'ubiquitous',
    prim: ['grasp', 'transfer', 'tool', 'separate'],
  },
  [
    node('prep', 'Food preparation', 'Everything between the fridge and the pan.', { prev: 'ubiquitous' }, [
      node('knife-work', 'Cut food with a knife', 'Cutting food to a shape with a blade.', { dexterity: 5, precision: 3, contact: 4 }, [
        leaf('julienne-onion', 'Julienne an onion', 'Halve, claw grip, cut even matchsticks against the board.', { skillYears: 'months', saturation: 'heavy' }),
        leaf('debone-chicken-thigh', 'Debone a chicken thigh', 'Feel the bone through flesh and follow it with the tip.', { contact: 5, skillYears: 'years', saturation: 'thin', robotNow: 'no' }),
        leaf('fillet-round-fish', 'Fillet a round fish', 'Run the blade along the spine by feel, keeping yield high.', { contact: 5, skillYears: 'years', saturation: 'empty', robotNow: 'no', prev: 'uncommon' }),
        leaf('recover-blunt-knife', 'Recover: blade too blunt mid-task', 'Notice the crush rather than cut, stop, steel or swap the knife, resume.', { fail: true, saturation: 'empty' }),
      ]),
      node('peel-trim', 'Peel and trim food', 'Removing skin, stalk and waste.', { dexterity: 5, contact: 4 }, [
        leaf('peel-potato', 'Peel a potato', 'Rotate in hand against a peeler with even pressure.', { saturation: 'heavy', robotNow: 'partial' }),
        leaf('segment-citrus', 'Segment a citrus fruit', 'Cut between membranes by feel without losing juice.', { dexterity: 5, skillYears: 'months', saturation: 'thin' }),
      ]),
      node('measure-mix', 'Measure and mix ingredients', 'Getting quantities and combining them.', { contact: 3 }, [
        leaf('pour-to-line', 'Pour liquid to a measuring line', 'Pour, slow, stop at the line by eye.', { prim: ['transfer', 'inspect'], saturation: 'heavy' }),
        leaf('fold-batter', 'Fold a batter without knocking out air', 'Judge by resistance and appearance when to stop.', { contact: 4, skillYears: 'months', saturation: 'thin' }),
      ]),
    ]),
    node('cooking', 'Cooking at the hob and oven', 'Applying heat and reacting to it.', { contact: 3, horizon: 'medium', prev: 'ubiquitous' }, [
      node('pan-work', 'Cook in a pan on the hob', 'Sauté, sear, toss, deglaze.', {}, [
        leaf('toss-in-pan', 'Toss food in a pan', 'Whole-arm flick that keeps food airborne and in the pan.', { dexterity: 3, contact: 4, skillYears: 'months', saturation: 'thin', suit: 'excellent' }),
        leaf('judge-doneness-by-sound', 'Judge doneness by sound and smell', 'Decide to act from non-visual cues.', { prim: ['inspect'], contact: 1, robotNow: 'no', saturation: 'empty' }),
      ]),
      node('oven-work', 'Load and unload a hot oven', 'Loading, turning and unloading hot things.', { contact: 4 }, [
        leaf('load-hot-tray', 'Load and retrieve a hot tray', 'Two-hand a wobbling tray through a narrow hot opening.', { prim: ['bimanual', 'locomote'], saturation: 'thin' }),
        leaf('recover-spilled-tray', 'Recover: tray tipped on removal', 'Set it down safely, clear the spill, salvage or bin the food.', { fail: true, saturation: 'empty' }),
      ]),
    ]),
    node('cleanup', 'Dishwashing and cleanup', 'The half of kitchen work nobody films.', { dexterity: 3, contact: 4, saturation: 'thin', prev: 'ubiquitous' }, [
      node('hand-wash', 'Wash dishes by hand', 'Wet, scrub, rinse, rack.', {}, [
        leaf('scrub-baked-on-pan', 'Scrub a baked-on pan', 'Apply force where the residue is, check by touch, repeat.', { contact: 5, robotNow: 'no', saturation: 'empty' }),
        leaf('rack-fragile-glass', 'Rack fragile glassware', 'Place wet glass into a crowded rack without chipping it.', { dexterity: 5, precision: 4, saturation: 'thin' }),
      ]),
      node('surface-clean', 'Wipe down surfaces and appliances', 'Wiping down and resetting the room.', {}, [
        leaf('wipe-counter-around-objects', 'Wipe a counter around objects', 'Lift, wipe under, replace, in a single flow.', { prim: ['transfer', 'grasp'], saturation: 'thin' }),
      ]),
    ]),
    node('storage', 'Storage and preservation', 'Putting food away so it survives.', { prev: 'common', saturation: 'thin' }, [
      node('container-work', 'Seal food into containers', 'Sealing food into things.', { dexterity: 4 }, [
        leaf('seal-snap-lid', 'Seal a snap-lid container', 'Align and press all four edges until each clicks.', { contact: 4, robotNow: 'partial' }),
        leaf('wrap-with-cling-film', 'Wrap a bowl with cling film', 'Handle a self-adhering flexible sheet with two hands.', { prim: ['deform', 'bimanual'], contact: 4, robotNow: 'no', saturation: 'empty' }),
      ]),
      node('fridge-organise', 'Organise and rotate the fridge', 'Deciding where things go and rotating stock.', { horizon: 'medium', contact: 2 }, [
        leaf('rotate-stock', 'Rotate stock by date', 'Read dates, reorder shelves, discard what has gone.', { prim: ['inspect', 'grasp'], saturation: 'empty' }),
      ]),
    ]),
    node('beverages', 'Making drinks', 'Drinks made by hand.', { prev: 'common', horizon: 'short' }, [
      node('hot-drinks', 'Make hot drinks', 'Kettle, cafetiere, espresso.', {}, [
        leaf('tamp-espresso', 'Dose and tamp espresso', 'Level the dose and tamp flat at consistent pressure.', { contact: 5, precision: 4, skillYears: 'months', saturation: 'thin' }),
        leaf('pour-latte-art', 'Pour latte art', 'Coordinate jug height, flow and cup tilt.', { dexterity: 5, skillYears: 'years', saturation: 'thin', prev: 'uncommon' }),
      ]),
    ]),
  ],
)
