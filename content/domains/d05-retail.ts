import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// The first domain in the atlas with a bystander in it.
//
// Everywhere else the workspace contains nobody, or a colleague who shares the
// protocol. Here it contains members of the public who have not agreed to the
// task, do not know what is about to happen, and move unpredictably through it.
// A large share of the cues are about a third party: so it cannot fall on a
// customer, so the door cannot swing into a passer-by, so they do not have to
// reach across the till.
//
// That same person is why the domain is hard to record. Filming a shop floor
// films the public, so every customer-present family is marked consent-heavy.
// The thing that makes the work interesting is the thing that gates capture.
//
// Two other properties are unusual. Success is often judged from a viewpoint you
// are not standing in: a facing is right when it looks right from the aisle. And
// the work is maintenance of an equilibrium rather than a transformation, because
// customers continuously undo it.

export const d05: NodeSpec = node(
  'd05',
  'Retail and warehouse',
  'Shop floor and stockroom: facing and rotation, presentation, fresh, checkout, carts and back of house, all of it with the public present.',
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
    embodiment: ['ego', 'suit', 'video'],
    saturation: 'heavy',
    ours: 'none',
    rights: 'easy',
    ethics: 'open',
    prev: 'ubiquitous',
    prim: ['grasp', 'locomote', 'inspect'],
  },
  [
    node('shelf-work', 'Facing, rotation and replenishment', 'Maintaining a state that customers continuously undo.', { dexterity: 4, robotNow: 'no', saturation: 'empty', notes: 'Not a transformation but an equilibrium. The shelf is degraded by every shopper and the job is to keep returning it, which is a different problem shape from building something that stays built.' }, [
      node('facing', 'Face a shelf', 'Judged from the aisle rather than from where you stand.', { precision: 3, prev: 'ubiquitous' }, [
        leaf('face-row-to-a-straight-line', 'Face a shelf to a straight line', 'Slide every unit forward to the lip.', { cue: 'The front edges form one straight line, not a sawtooth.', verify: 'Step into the aisle and look along the row before you move on.', notes: 'Success is defined from a viewpoint you are not occupying while you work.' }),
        leaf('slot-case-nothing-into-the-aisle', 'Slot a case so nothing protrudes', 'Place a case on a shelf.', { cue: 'Both bottom corners are on the shelf and nothing hangs far enough out to catch a cart.' }),
        leaf('fit-divider-so-nothing-slides-under', 'Fit a divider that stands on its own', 'Install a shelf divider.', { cue: 'It stands unsupported and a facing cannot slide underneath it.' }),
        leaf('fit-pusher-front-unit-at-the-lip', 'Fit a pusher and load it from the back', 'Install and charge a spring pusher.', { cue: 'The front unit sits at the lip with spring travel still left.' }),
        leaf('load-pusher-only-to-max', 'Load a pusher only to the stated maximum', 'Fill a pusher without jamming it.', { cue: 'The last unit still comes forward when the front one is taken.' }),
        leaf('recover-pusher-jammed-solid', 'Recover: pusher jammed by overloading', 'Unload it back to the stated count rather than forcing the front unit.', { fail: true }),
      ]),
      node('rotation', 'Rotate dated stock', 'Arranging for a stranger’s blind reach.', { precision: 3, prim: ['inspect', 'grasp'], prev: 'ubiquitous' }, [
        leaf('rotate-early-date-stays-first', 'Rotate stock so the earliest date stays first', 'Put new stock behind old.', { cue: 'The earliest date is still the first unit a hand will take.', notes: 'The success condition is about what somebody else will encounter later, without looking.' }),
        leaf('pull-gapped-facing-without-crossing-dates', 'Pull a gapped facing forward without crossing dates', 'Close a gap without disturbing rotation.', { cue: 'No two dates pass each other while the row is brought forward.', dexterity: 5 }),
        leaf('lift-out-slide-behind-set-back', 'Lift the early units out, slide new behind, set back', 'Perform a full rotation on a facing.', { cue: 'New stock is behind and the early units are back on the lip in order.' }),
        leaf('recover-stock-rotated-the-wrong-way', 'Recover: new stock found in front of old', 'Strip the facing and rotate it properly rather than picking the new units first.', { fail: true }),
      ]),
      node('case-work', 'Open and handle cases', 'Getting product out of packaging without cutting into it.', { contact: 4, dexterity: 4, robotNow: 'partial', saturation: 'thin' }, [
        leaf('cut-case-shallow-of-the-inners', 'Cut a case along the tape line', 'Open a case without scoring the product.', { cue: 'The blade stays shallow enough that the inner packs are untouched.', notes: 'The same partial-depth cut as the apparel notching: a boundary with no mechanical stop.' }),
        leaf('lift-case-hinge-land-far-corner', 'Lift a case and land it on the beam', 'Move a case onto a shelf.', { cue: 'Hip hinge, chest to the load, and the far corner is on the beam before you let go.', contact: 5 }),
        leaf('place-backstock-label-to-aisle', 'Put back-stock on the shelf fully on the beam', 'Return stock to the stockroom.', { cue: 'The case is fully on the beam and the label faces the aisle.' }),
        leaf('get-backstock-chest-then-turn', 'Get back-stock with two hands and turn after', 'Take a case from a low slot.', { cue: 'It is at your chest before you turn, with no twist at the slot.', contact: 5 }),
        leaf('recover-product-scored-by-the-blade', 'Recover: inner packs scored on opening', 'Pull the damaged units rather than shelving them face-in.', { fail: true }),
      ]),
      node('shelving-hardware', 'Fit and move shelving', 'The fixture itself, adjusted around live product.', { dexterity: 4, contact: 5, prev: 'common' }, [
        leaf('fit-shelf-clip-both-hooks-in', 'Fit a shelf clip in the marked slot', 'Locate a shelf support.', { cue: 'Both hooks are fully into the upright.' }),
        leaf('add-shelf-both-ends-on-clips', 'Add a shelf onto both clips', 'Install a shelf.', { cue: 'A downward tug at either end will not drop it.', verify: 'Tug both ends down before any product goes on.' }),
        leaf('remove-shelf-carry-on-edge', 'Remove a shelf and park it on edge', 'Take a shelf out of a bay.', { cue: 'It is carried on edge and parked where it cannot trip anyone in the aisle.' }),
        leaf('hang-peg-hook-and-tug-down', 'Hang a peg hook and tug it', 'Fit a hook to slat or perforation.', { cue: 'A downward tug will not drop it when the first pack comes off.' }),
        leaf('load-hook-to-count-change-if-bent', 'Load a hook to the stated count', 'Fill a peg hook.', { cue: 'It carries the stated count without deflecting; if it bends, the hook is changed rather than reloaded.' }),
        leaf('recover-hook-dropped-its-load', 'Recover: hook dropped its load into the aisle', 'Clear the aisle first, then refit a correct hook.', { fail: true }),
      ]),
      node('labelling', 'Price and tag', 'Marks that must stay on and not damage the face.', { dexterity: 5, precision: 4, repetition: 'high-takt' }, [
        leaf('price-gun-flat-will-not-peel', 'Price-gun the specified corner', 'Apply a price label.', { cue: 'It is on the specified corner, flat, and will not peel on the next touch.' }),
        leaf('peel-wrong-sticker-back-on-itself', 'Peel a wrong sticker back on itself', 'Remove a label without tearing the pack.', { cue: 'It comes back on itself and the pack face is not torn.' }),
        leaf('draw-and-holster-scan-gun', 'Draw a scan gun, aim from a still stance, holster it', 'The reach and return around every scan.', { cue: 'The gun is back in the holster before the next case is lifted.', notes: 'Captured for the reach and the return. The barcode is not the interesting part.' }),
        leaf('recover-label-applied-over-a-barcode', 'Recover: label covering a barcode', 'Remove and reapply rather than adding a second label.', { fail: true }),
      ]),
    ]),

    node('at-height', 'Top stock and ladder work', 'Reaching above the fixtures, with a shop floor underneath.', { dexterity: 3, contact: 5, ethics: 'restricted', robotNow: 'no', saturation: 'empty', prev: 'common', notes: 'Seeded restricted. A fall here lands in a public aisle.' }, [
      node('ladder-work', 'Set and climb a ladder', 'A support you place yourself, on a floor other people walk.', { skillYears: 'none' }, [
        leaf('set-ladder-four-feet-lock-on', 'Set a ladder so all four feet sit', 'Place a ladder on a shop floor.', { cue: 'All four feet are down, the spread lock is on, and no cart route runs into it.' }),
        leaf('climb-three-rungs-hands-free', 'Climb with one hand on the rail', 'Ascend safely with something to carry.', { cue: 'One hand stays on the rail and tools are in a belt or a free hand, never in your teeth.' }),
        leaf('stop-below-the-top-cap', 'Stop below the top cap', 'Position yourself on a ladder.', { cue: 'You work from below the top cap rather than standing on it.' }),
        leaf('never-stand-on-a-shelf', 'Reach top stock only from the ladder', 'Get to a high shelf.', { cue: 'No foot goes on a shelf edge or a standard, whatever the reach.' }),
        leaf('recover-ladder-shifted-underfoot', 'Recover: ladder moved while you were on it', 'Come down before repositioning it, rather than stepping it round.', { fail: true }),
      ]),
      node('handing-down', 'Hand down from height', 'A handover to somebody who may be new.', { prim: ['language', 'bimanual'], contact: 4 }, [
        leaf('hand-down-only-on-two-raised-hands', 'Hand down only when both their hands are up', 'Pass an item to a floor person.', { cue: 'They have both hands up and are looking at you before it leaves your hand.', notes: 'The partner is often untrained, unlike the construction equivalent where both people know the protocol.' }),
        leaf('keep-a-hand-on-the-ladder-throughout', 'Keep your other hand on the ladder', 'Stay attached while passing.', { cue: 'One hand is on the ladder the whole time the other is passing.' }),
        leaf('recover-item-dropped-into-empty-hands', 'Recover: released before they were ready', 'Stop the pass, clear the area below, and restart the count.', { fail: true }),
      ]),
    ]),

    node('soft-lines', 'Garment presentation and fitting rooms', 'Where the whole output is how it looks to a stranger.', { dexterity: 5, precision: 4, contact: 4, robotNow: 'no', saturation: 'empty', rights: 'consent-heavy', prev: 'common' }, [
      node('folding-and-stacks', 'Fold and restack', 'Restoring a table after every customer.', { repetition: 'high-takt' }, [
        leaf('fold-to-the-house-fold', 'Fold a table item to the house fold', 'Fold to a specified standard.', { cue: 'It matches the house fold and the stack stays square when it is added.' }),
        leaf('refold-back-into-the-same-facing', 'Refold after a customer touch', 'Return a disturbed item.', { cue: 'It goes back into the same facing and the same size, not on top of a different one.' }),
        leaf('recover-stack-collapsed-into-mixed-sizes', 'Recover: stack collapsed and sizes mixed', 'Break it down and rebuild by size rather than tidying the top.', { fail: true }),
      ]),
      node('hanging-and-rails', 'Hang and rail', 'Presentation judged from the aisle.', { dexterity: 4 }, [
        leaf('hang-shoulder-seams-on-the-bar', 'Hang a garment with both seams on the bar', 'Put a garment on a hanger.', { cue: 'Both shoulder seams sit on the bar and the hem hangs even.' }),
        leaf('slide-size-hooks-all-one-way', 'Slide a size along and keep hooks one way', 'Order a rail.', { cue: 'Every hook faces the same way so the next hand does not fight the rack.' }),
        leaf('face-zippers-sliders-up', 'Face zippers so every slider is up', 'Present fastenings consistently.', { cue: 'Every slider is up and visible from the aisle.' }),
        leaf('face-buttons-placket-forward', 'Face buttons so the placket is forward', 'Present a buttoned front.', { cue: 'The placket faces the aisle and the hanger is not twisted.' }),
        leaf('steam-hovering-not-parked', 'Steam a garment on the hanger', 'Relax a garment without marking it.', { cue: 'The head hovers and is never parked on the fabric.', contact: 3 }),
        leaf('hang-return-as-if-it-never-left', 'Hang a garment return and face it', 'Reinstate a returned item.', { cue: 'It is on the correct size and faced as if it had never left.' }),
        leaf('recover-rail-with-mixed-hook-directions', 'Recover: rail with hooks facing both ways', 'Reverse the whole run rather than only the ones you notice.', { fail: true }),
      ]),
      node('security-tags', 'Security and pin tags', 'Fasteners through a garment that must not mark it.', { dexterity: 5, precision: 5 }, [
        leaf('fit-tag-through-label-or-seam', 'Fit a security tag through the label or seam', 'Attach a tag without damage.', { cue: 'The pin goes through a label or a seam allowance, never a printed face, and it clicks closed.', notes: 'Same rule as the apparel tag gun. The hole is small, permanent, and found by the customer.' }),
        leaf('detach-tag-over-the-cup', 'Remove a tag with the detacher over the cup', 'Take a tag off cleanly.', { cue: 'The tag drops into the cup rather than onto the floor.' }),
        leaf('pin-tag-through-label-close-fully', 'Pin-tag through the label and close the pin', 'Attach a pin ticket.', { cue: 'It is through a label or seam and the pin is fully closed.' }),
        leaf('recover-tag-pulled-through-the-face', 'Recover: tag torn through the garment face', 'Pull the garment from sale rather than re-tagging over the hole.', { fail: true }),
      ]),
      node('fitting-rooms', 'Reset a fitting room', 'Restoring a private space between customers.', { rights: 'consent-heavy', ethics: 'restricted', prev: 'common' }, [
        leaf('reset-room-hang-pin-clear-door', 'Reset a fitting room to the store rule', 'Turn a room around.', { cue: 'Everything is hung and pinned, the floor is clear, and the door is left as the rule says.' }),
        leaf('recover-item-left-in-a-room', 'Recover: item left behind in a room', 'Return it to its facing rather than to the nearest rail.', { fail: true }),
      ]),
    ]),

    node('display', 'Fixtures, displays and signage', 'Structures built on a floor full of people.', { dexterity: 3, contact: 5, robotNow: 'no', saturation: 'empty', rights: 'consent-heavy', prev: 'common' }, [
      node('displays', 'Build displays', 'Stacks that stay stable as they are taken apart by strangers.', { precision: 3 }, [
        leaf('build-endcap-base-up-cannot-rock', 'Build an end-cap from the base up', 'Construct a promotional display.', { cue: 'The bottom layer is full and it does not rock when the front unit is taken.', notes: 'Built to be dismantled by people who will take from the front. Stability has to survive being consumed.' }),
        leaf('build-dump-bin-reachable-and-still', 'Build a dump-bin with its base insert', 'Set up a bulk bin.', { cue: 'A customer can reach the bottom without the bin walking across the floor.' }),
        leaf('recover-display-leaning-after-a-day', 'Recover: display leaning after being shopped', 'Rebuild from the base rather than restacking the top.', { fail: true }),
      ]),
      node('mannequins', 'Dress and set mannequins', 'Presentation on a form, in public.', { dexterity: 5, precision: 5, skillYears: 'months' }, [
        leaf('dress-torso-seams-plumb', 'Dress a torso so the side seams hang plumb', 'Fit a garment to a form.', { cue: 'Side seams are plumb and the hem is even to the stand.' }),
        leaf('fit-mannequin-arm-until-it-seats', 'Fit a mannequin arm until the joint seats', 'Assemble a display form.', { cue: 'The arm cannot drop when someone brushes past it.', verify: 'Push the arm gently before you leave it.' }),
        leaf('set-window-piece-check-from-the-aisle', 'Set a window piece and step back to check', 'Place a display item.', { cue: 'It is on the mark and it reads correctly when viewed from the aisle.' }),
        leaf('recover-mannequin-arm-dropped', 'Recover: mannequin arm came off in public', 'Clear the area, refit the joint properly, and check the others.', { fail: true }),
      ]),
      node('fixtures-and-signs', 'Move fixtures and change signage', 'Heavy things on castors, and things above head height.', { contact: 5, dexterity: 2, ethics: 'restricted' }, [
        leaf('two-person-fixture-carry-on-a-count', 'Carry a fixture with a partner on a count', 'Move a fixture with two people.', { cue: 'Same height, one caller, and it lands on its feet rather than on a caster locked the wrong way.', prim: ['language', 'bimanual'] }),
        leaf('level-fixture-no-roll-no-rock', 'Level a fixture', 'Set a fixture so it is stable and usable.', { cue: 'A bottle on the shelf does not roll and the uprights do not rock.' }),
        leaf('clip-sign-both-sides-and-tug', 'Clip a sign into both sides and tug it', 'Fit signage overhead.', { cue: 'It is in both sides of the holder and a tug will not bring it down onto a customer.' }),
        leaf('change-letter-board-to-the-track-bottom', 'Change a letter board one character at a time', 'Update a manual sign.', { cue: 'Each character is pressed to the bottom of its track.' }),
        leaf('recover-sign-fallen-in-the-aisle', 'Recover: sign came down in a public aisle', 'Clear it, check the holder, and refit rather than rehanging on a failed clip.', { fail: true }),
      ]),
    ]),

    node('fresh', 'Fresh, produce and dairy', 'Wet, cold, perishable, and rotated by hand every day.', { dexterity: 4, contact: 5, robotNow: 'no', saturation: 'empty', prev: 'common' }, [
      node('chilled', 'Dairy and chilled', 'Rotation with a wet floor underneath.', { repetition: 'high-takt' }, [
        leaf('lift-milk-crate-to-stack', 'Lift a milk crate by the handholds', 'Move a crate onto a cart.', { cue: 'It sits so the next crate can stack on it.' }),
        leaf('rotate-dairy-and-wipe-the-drip', 'Rotate dairy and wipe before you leave', 'Rotate chilled stock.', { cue: 'Early dates are forward, new behind, and the drip is wiped off the shelf.' }),
        leaf('stock-soda-from-the-back', 'Stock a cold aisle from the back of the shelf', 'Replenish without pushing cold stock back.', { cue: 'The cold front units are still at the front when you finish.' }),
        leaf('recover-wet-shelf-left-behind', 'Recover: shelf left wet after rotation', 'Go back and dry it before it reaches the floor.', { fail: true }),
      ]),
      node('produce', 'Produce and floristry', 'Culling, misting and handling live goods.', { dexterity: 5, contact: 4 }, [
        leaf('fill-and-level-ice-product-on-top', 'Fill an ice bed and set product on it', 'Build an iced display.', { cue: 'The bed is level and product sits on the ice, not buried under it.' }),
        leaf('kneel-cull-into-a-bag-stand-with-hinge', 'Kneel to cull and stand with a hinge', 'Remove spoiled product at low level.', { cue: 'The bad unit is bagged and you stand through a hip hinge before carrying it.' }),
        leaf('keep-the-blade-sheathed-between-cuts', 'Sheathe the knife between cuts', 'Work with a blade around the public.', { cue: 'The knife or scissors are in the sheath whenever you are not cutting.', ethics: 'restricted' }),
        leaf('mist-onto-product-not-the-tile', 'Mist or water so the spray hits product', 'Water a display.', { cue: 'The spray lands on product and not on tile that people will walk on.', notes: 'Creating a slip hazard for a stranger is the failure, not wasting water.' }),
        leaf('bag-produce-and-set-upright', 'Bag produce and set it in the cart upright', 'Weigh and bag loose goods.', { cue: 'The bag is twisted closed and stands upright in the cart.' }),
        leaf('tie-a-bunch-so-it-lifts-as-one', 'Tie a bouquet or bunch', 'Bind a handful of stems into a single unit that can be picked up.', { cue: 'The stems stay as one piece when it is lifted by the wrap.' }),
        leaf('carry-water-bucket-set-before-pouring', 'Carry a water bucket and set it down first', 'Move and pour water.', { cue: 'It is on the floor before you pour, with a free hand kept for a door.' }),
        leaf('recover-slip-hazard-created-by-misting', 'Recover: water on the walking surface', 'Cone it and dry it before continuing the task.', { fail: true }),
      ]),
    ]),

    node('checkout', 'Checkout, bagging and handover', 'A fixed stance, a repeated reach, and a handover to a stranger.', { dexterity: 4, contact: 3, repetition: 'high-takt', rights: 'consent-heavy', robotNow: 'partial', saturation: 'thin', prev: 'ubiquitous' }, [
      node('till-stance', 'Work the till', 'A whole shift inside one reach envelope.', { precision: 2, saturation: 'empty', notes: 'Highly repetitive fixed-station work with a strong reach pattern. Good suit data and almost none of it exists, because the camera would also be pointed at customers.' }, [
        leaf('stance-weight-even-bag-in-reach', 'Stand a register stance with the bag in reach', 'Set up at a till.', { cue: 'Weight is even and the bag well is inside your reach, so you are not leaning across the belt.' }),
        leaf('reach-keypad-and-return-to-the-well', 'Reach the keypad and bring the hand back', 'Cycle between screen and product.', { cue: 'The hand returns to the well before the next item comes.' }),
        leaf('bag-from-the-well-not-across-the-belt', 'Bag from the well', 'Pack without over-reaching.', { cue: 'Everything is packed from the well, and scanners and pens stay out of the bag.' }),
        leaf('recover-reaching-across-the-belt-all-shift', 'Recover: caught yourself reaching across the belt', 'Reset the station layout rather than continuing to reach.', { fail: true }),
      ]),
      node('bagging', 'Bag and carry out', 'Packing for someone else to carry.', { dexterity: 4, contact: 4 }, [
        leaf('bag-heavy-on-bottom-test-handles', 'Bag heavy on the bottom and test the handles', 'Pack a bag that will survive being carried.', { cue: 'Cans and bottles first, then boxes, then bread, and the handles are tested before it is handed over.', verify: 'Lift the packed bag by the handles once before releasing it.' }),
        leaf('fold-paper-bag-to-stand-open', 'Fold a paper bag so it stands open', 'Prepare a bag.', { cue: 'It stands open on its own without being held.' }),
        leaf('double-bag-and-lift-once', 'Double-bag a heavy set and lift it once', 'Reinforce a heavy load.', { cue: 'It is lifted by the handles once before being handed off.' }),
        leaf('lift-bags-against-the-trunk-wall', 'Lift bags into a trunk against the back wall', 'Load a customer vehicle.', { cue: 'They sit against the back wall and cannot roll onto the bumper when the lid closes.' }),
        leaf('carry-out-only-with-hands-and-path-free', 'Carry to a car only if hands and path are free', 'Decide whether a carry-out is safe.', { cue: 'Both hands and the route are clear before you start, and the lid closes after the bags are set.' }),
        leaf('recover-bag-failed-on-the-handover', 'Recover: bag failed as it was handed over', 'Repack rather than double-bagging over a split.', { fail: true }),
      ]),
      node('handover', 'Hand to a customer', 'Passing an object to someone whose timing you do not control.', { prim: ['language', 'grasp'], contact: 3, robotNow: 'no', saturation: 'empty' }, [
        leaf('hand-so-they-do-not-reach-over', 'Hand a receipt or bag within their reach', 'Complete a handover.', { cue: 'They can take it without reaching over the till.' }),
        leaf('pass-terminal-wait-then-retrieve', 'Pass a card terminal, wait, then take it back', 'Hand over and recover a device.', { cue: 'You wait until they are finished, then return it to the cradle.' }),
        leaf('recover-item-dropped-in-a-handover', 'Recover: item dropped between two people', 'Retrieve it and restart the handover rather than reaching into their space.', { fail: true }),
      ]),
    ]),

    node('carts-floor', 'Carts, spills and floor safety', 'Wheeled traffic and hazards on a floor shared with the public.', { dexterity: 3, contact: 4, rights: 'consent-heavy', prev: 'ubiquitous' }, [
      node('carts', 'Handle carts', 'Nesting, steering and trains.', { robotNow: 'no', saturation: 'empty' }, [
        leaf('lift-basket-both-hands-on-the-rim', 'Lift a basket from the nest', 'Take a basket and place it.', { cue: 'Both hands on the rim, and it lands on the counter rather than on a stack of bags.' }),
        leaf('pull-one-cart-straight-from-a-nest', 'Pull one cart out of a nest', 'Separate a single cart.', { cue: 'One comes free and the rest of the row stays where it is.' }),
        leaf('un-nest-and-square-in-the-corral', 'Un-nest two carts and square the empty one', 'Handle carts in a corral.', { cue: 'The empty one is square and the tongues are not crossed.' }),
        leaf('push-cart-eyes-on-the-near-wheel', 'Push a loaded cart with eyes on the near wheel', 'Move a cart around people.', { cue: 'Both hands on the handle and the near wheel is visible at every corner.' }),
        leaf('return-a-steerable-train', 'Return carts in a train you can still steer', 'Collect carts from a lot.', { cue: 'The train is short enough to steer and to stop before the door.', setting: 'outdoor', ethics: 'restricted' }),
        leaf('pull-train-only-through-a-held-door', 'Pull a train through only when the door is held', 'Bring carts inside.', { cue: 'The door is held and the threshold is clear before the train moves.' }),
        leaf('corral-square-tongues-lined-up', 'Corral carts square with tongues aligned', 'Park a cart row.', { cue: 'The nest is square and every tongue lines up.' }),
        leaf('chain-the-row-so-nothing-rolls', 'Chain or lock the row', 'Secure carts outdoors.', { cue: 'The last cart cannot roll into the lane.' }),
        leaf('recover-cart-train-that-got-away', 'Recover: train ran away on a slope', 'Stop it from the side rather than the front, and shorten the train.', { fail: true, ethics: 'restricted' }),
      ]),
      node('spills-and-hazards', 'Spills and hazards', 'Making a floor safe while strangers keep walking on it.', { contact: 3 }, [
        leaf('sweep-a-break-into-one-pile-and-lift-it', 'Sweep a break into one pile and pick it up', 'Clear breakage.', { cue: 'It goes into one pile and is lifted, not swept into a hidden corner.' }),
        leaf('absorbent-outside-in-stand-off', 'Deploy absorbent from the outside in', 'Contain a spill.', { cue: 'It goes down from the outside in and you stand off the wet until the cone is up.' }),
        leaf('cone-where-the-next-cart-will-see-it', 'Set a wet-floor cone where it will be seen', 'Warn approaching traffic.', { cue: 'The next cart sees it before they reach the shine.', notes: 'Placed for a stranger’s stopping distance, not for the edge of the spill.' }),
        leaf('recover-customer-walked-into-a-wet-area', 'Recover: someone entered the wet area', 'Attend to them first and reposition the cone before continuing.', { fail: true }),
      ]),
    ]),

    node('back-of-house', 'Back stock, returns, pallets and waste', 'The half of the floor the public does not see.', { dexterity: 3, contact: 5, rights: 'easy', prev: 'common' }, [
      node('floor-pallets', 'Pallets on the sales floor', 'Bringing bulk onto a public floor.', { ethics: 'restricted', robotNow: 'partial', saturation: 'thin' }, [
        leaf('jack-pallet-to-the-mark-and-lower', 'Move a pallet to the mark and lower the jack', 'Place a pallet on the floor.', { cue: 'It sits on the mark and the jack is lowered until the pallet takes its own weight.' }),
        leaf('cut-floor-wrap-away-from-product', 'Cut floor wrap away from the product', 'Open a wrapped pallet.', { cue: 'The blade points away and the wrap is held so it cannot snap into your face.' }),
        leaf('break-pallet-by-building-a-plumb-stack', 'Break a pallet by building a plumb stack', 'Deplete a pallet on the floor.', { cue: 'The new stack stays plumb; the old one is never left leaning.' }),
        leaf('nightfill-no-open-case-in-the-walkway', 'Night-fill at speed with the path clear', 'Work fast without leaving hazards.', { cue: 'No open case is left in the walk path and empty cardboard goes on the cart as you go.' }),
        leaf('recover-pallet-left-part-broken-in-the-aisle', 'Recover: part-broken pallet left in an aisle', 'Finish it or move it rather than leaving it for the next shift.', { fail: true }),
      ]),
      node('returns', 'Process returns', 'Unstructured input and a judgement per item.', { dexterity: 4, precision: 3, robotNow: 'no', saturation: 'empty', skillYears: 'months' }, [
        leaf('flip-every-side-then-decide', 'Inspect a return by flipping every side', 'Grade a returned item.', { cue: 'Every face has been turned to the light before restock, salvage or reject is decided.', prim: ['inspect'] }),
        leaf('repack-return-nothing-rattles', 'Repack a return so nothing shifts', 'Prepare a return for onward travel.', { cue: 'The flaps meet and the product does not rattle.' }),
        leaf('polybag-return-ticket-readable', 'Polybag a return and seal it', 'Bag a return.', { cue: 'The air is out and the ticket is still readable through the bag.' }),
        leaf('recover-return-restocked-that-should-not-be', 'Recover: damaged item put back on the shelf', 'Pull it and re-grade rather than leaving it for a customer to find.', { fail: true }),
      ]),
      node('waste', 'Bale, compact and dispose', 'Powered plant in the back room.', { contact: 5, ethics: 'restricted', capital: 'mid' }, [
        leaf('build-bale-to-the-press-marks', 'Build a cardboard bale to the press marks', 'Charge a baler.', { cue: 'It is filled to the marks so the press door will close.' }),
        leaf('tie-bale-and-set-it-on-the-pallet', 'Tie a bale, pull it, and set it down', 'Eject and stage a bale.', { cue: 'It is tied, pulled clear, and set on a pallet rather than in the aisle.' }),
        leaf('land-waste-inside-the-compactor-mouth', 'Land waste inside the compactor mouth', 'Load a compactor.', { cue: 'It goes inside the mouth and your head stays out of the door arc.' }),
        leaf('stand-off-the-compactor-cycle', 'Stand off the compactor cycle', 'Run a compactor safely.', { cue: 'You are clear before it starts and it has stopped before the door opens again.' }),
        leaf('move-hamper-over-a-sill', 'Move a hamper over a sill', 'Get a wheeled container across a threshold.', { cue: 'The wheels come up and over together rather than catching and tipping it.' }),
        leaf('recover-baler-jammed-mid-cycle', 'Recover: baler or compactor jammed', 'Isolate it before opening anything, and call it rather than clearing it live.', { fail: true, partner: 'licensed' }),
      ]),
    ]),

    node('customers', 'Working with the public present', 'The bystander who makes the domain interesting and hard to record.', { dexterity: 3, contact: 2, prim: ['locomote', 'language', 'inspect'], rights: 'consent-heavy', robotNow: 'no', saturation: 'empty', prev: 'ubiquitous' }, [
      node('moving-among-people', 'Move among people', 'Navigating a floor where the obstacles have their own intentions.', { horizon: 'short' }, [
        leaf('walk-a-crowd-stop-rather-than-thread', 'Walk a crowd with a cart at walking speed', 'Move equipment through people.', { cue: 'You stop the cart rather than threading a gap that is about to close.', notes: 'The obstacle is a person who may change direction. No other domain in the atlas has that.' }),
        leaf('hold-a-case-door-so-it-cannot-swing', 'Hold a case door while reaching in', 'Open a fixture in public.', { cue: 'One hand holds the door so it cannot swing into a passer-by.' }),
        leaf('greet-with-the-opening-clear', 'Greet at the door with the opening clear', 'Stand at an entrance.', { cue: 'The opening stays clear and both your hands are free.' }),
        leaf('recover-near-miss-with-a-customer', 'Recover: near miss with a member of the public', 'Stop, check on them, and change the route rather than repeating it more carefully.', { fail: true }),
      ]),
      node('securing-fixtures', 'Secure gates and cases', 'Locking up around people who are still in the building.', { dexterity: 4, contact: 4 }, [
        leaf('open-roll-gate-head-out-of-the-arc', 'Open a roll-gate to the up-lock', 'Raise a security gate.', { cue: 'It reaches the up-lock and your head stays out from under the slats while it travels.' }),
        leaf('close-gate-and-prove-the-lock', 'Close a gate until the lock seats', 'Secure a gate.', { cue: 'The lock seats and a single upward pull proves it.', verify: 'Pull up on the gate once after locking.' }),
        leaf('lock-case-and-pull-to-prove', 'Lock a glass case and pull the door', 'Secure a display case.', { cue: 'The door does not open when pulled; if it does, it is locked again before you walk.' }),
        leaf('recover-fixture-left-unlocked', 'Recover: fixture found unlocked after close', 'Check the whole run rather than only the one you noticed.', { fail: true }),
      ]),
      node('counting-and-close', 'Count and close down', 'The last pass of the day.', { precision: 3 }, [
        leaf('cycle-count-by-touching-each-facing', 'Cycle-count by touching each facing', 'Count stock by hand.', { cue: 'Each facing is touched along the row, so the count is a hand motion rather than a glance from the aisle.', notes: 'The specification is deliberately a physical act, because the visual shortcut is what produces bad counts.' }),
        leaf('crouch-low-bay-chest-then-turn', 'Crouch a low bay and stand before turning', 'Pick from a bottom shelf.', { cue: 'Hip hinge, unit to the chest, and you are standing before you turn to the cart.', contact: 5 }),
        leaf('stand-mid-bay-land-on-the-base', 'Land a mid-bay pick on its base', 'Pick at standing height.', { cue: 'The unit lands in the cart on its base and the brake is on if it has one.' }),
        leaf('close-down-last-cart-cone-and-case', 'Close down: last cart nested, cone up, case off the floor', 'Leave the floor for the next shift.', { cue: 'The last cart is nested, the last cone is up, the last case is off the floor, and both hands are clear.' }),
        leaf('recover-count-that-does-not-match', 'Recover: count does not match the system', 'Recount by touch rather than adjusting the system to the glance.', { fail: true }),
      ]),
    ]),
  ],
)
