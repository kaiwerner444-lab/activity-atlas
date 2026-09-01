import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// Two things set this domain apart.
//
// The failure mode is drift, not breakage. A load does not snap, it walks:
// under braking, under vibration, over a threshold. Almost every cue here is
// about a state that has to hold for hours of movement rather than for the
// moment you let go of it.
//
// And you are inside the hazard rather than beside it. The mitigation for a
// snapping band, a pouring gaylord, a turning wrap table or a reversing truck is
// where your body is, not how well you perform the motion. Stand off appears
// again and again, and it is the whole technique.
//
// As with the labs, this domain contains both the most and the least automated
// work in the building. Pick, pack and induct have had a decade of capital
// spent on them; strapping a floor-loaded trailer and shoring cargo have had
// none. They are separated so the gap score inside the domain means something.

export const d17: NodeSpec = node(
  'd17',
  'Logistics and yards',
  'Docks, trailers, pallets and yards: powered handling, wrapping and securing, loading, picking and the human traffic around all of it.',
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
    node('powered-handling', 'Pallet jacks and trucks', 'Moving weight with a machine you are standing on or walking behind.', { dexterity: 3, contact: 5, ethics: 'restricted', capital: 'mid', notes: 'Seeded restricted. Powered handling equipment causes most serious warehouse injuries and wants a site with its own regime.' }, [
      node('pallet-jack', 'Work a pallet jack', 'The most common load-moving act in the building.', { prev: 'ubiquitous', repetition: 'high-takt' }, [
        leaf('pump-until-wheels-free', 'Pump a jack until the wheels are free', 'Raise a pallet just clear of the floor.', { cue: 'The forks have lifted the pallet and the load wheels turn freely, without raising it further.' }),
        leaf('pull-straight-so-pallet-tracks', 'Pull a jack straight so the pallet tracks', 'Move a load in a line.', { cue: 'The pallet follows without a corner dragging or scuffing.' }),
        leaf('turn-ninety-load-level', 'Turn a jack 90 degrees with the load level', 'Change direction under load.', { cue: 'The handle stays down, the load stays level, and nothing shifts on the deck.' }),
        leaf('enter-pallet-forks-centred', 'Enter a pallet with both forks fully in', 'Pick up a pallet correctly.', { cue: 'Both forks are fully in and centred in the pockets before any lift.', verify: 'Look down both sides before pumping.' }),
        leaf('recover-pallet-picked-off-centre', 'Recover: pallet picked up off centre', 'Set it down and re-enter rather than correcting under load.', { fail: true }),
      ]),
      node('fork-truck', 'Work a fork truck', 'Placing a load at height where you cannot see both sides at once.', { precision: 4, skillYears: 'months', partner: 'licensed' }, [
        leaf('enter-at-slot-height-stop-before-heel', 'Enter a rack or trailer at slot height', 'Approach a slot without striking the beam.', { cue: 'Forks are at slot height and you stop before the heel reaches the beam.' }),
        leaf('lift-in-one-raise-look-both-sides', 'Lift to the slot in one raise and look', 'Raise a load and check it.', { cue: 'One smooth raise, then a look down both sides before anything moves forward.' }),
        leaf('inch-in-until-both-beams-take-it', 'Inch in so the pallet lands on both beams', 'Place a load evenly on rack beams.', { cue: 'Both beams take it with the same overhang front and back.' }),
        leaf('set-down-until-forks-slack-then-pause', 'Set down until the forks go slack, then pause', 'Transfer the load off the forks.', { cue: 'The forks are visibly slack and you pause before withdrawing.', notes: 'Same handover pattern as a jack and a stand: the load changes hands and the pause is where you find out if it is wrong.' }),
        leaf('back-out-straight-until-tips-clear', 'Back out straight until the tips are clear', 'Withdraw without catching the pallet.', { cue: 'The truck reverses square until the fork tips are fully out of the pockets.' }),
        leaf('side-shift-to-centreline-before-travel', 'Side-shift the load to the centreline', 'Balance a load before moving.', { cue: 'The load is on the centreline before the truck travels anywhere.' }),
        leaf('tilt-back-to-travel-forward-to-set', 'Tilt back for travel, forward only to set', 'Use mast tilt correctly.', { cue: 'The mast is back whenever the truck is moving and forward only at the moment of placing.' }),
        leaf('recover-load-caught-on-a-beam', 'Recover: pallet caught on a beam on withdrawal', 'Stop, re-lift and re-enter rather than pulling it free.', { fail: true, horizon: 'medium' }),
      ]),
      node('mount-dismount', 'Mount and dismount', 'Getting on and off the machine, where a surprising share of injuries happen.', { prim: ['locomote'], prev: 'ubiquitous' }, [
        leaf('climb-three-points-sit-before-controls', 'Climb the step with three points of contact', 'Get onto a truck safely.', { cue: 'Three points of contact throughout, and you are seated before reaching for any control.' }),
        leaf('descend-facing-the-machine', 'Descend facing the machine', 'Get off a truck without stepping into space.', { cue: 'You face the machine and both feet find the step rather than jumping down.' }),
        leaf('recover-slipped-on-a-wet-step', 'Recover: slipped on a wet or oily step', 'Stop, clean or report the step before the next mount.', { fail: true }),
      ]),
      node('tugs-and-bulk', 'Tugs, gaylords and bulk bags', 'The awkward units that do not sit on a standard pallet.', { dexterity: 2, prev: 'common' }, [
        leaf('pull-gaylord-stop-on-the-mark', 'Pull a full gaylord and stop it on the mark', 'Move a bulk container under control.', { cue: 'It stops on the mark rather than against a door frame or a rack leg.' }),
        leaf('roll-gaylord-on-its-path', 'Roll a gaylord along its specified path', 'Move a container by hand along a route.', { cue: 'It follows the marked path and is stopped clear of the frame.' }),
        leaf('seat-bulk-bag-loops-all-four-even', 'Seat bulk-bag loops on the forks', 'Pick up a bulk bag correctly.', { cue: 'All four loops are on and even, with none twisted or trailing on the floor.' }),
        leaf('move-bulk-bag-never-dragging-a-loop', 'Move a bulk bag on the loops or the hook', 'Transport a flexible container.', { cue: 'It hangs from the loops and no loop drags on the floor.' }),
        leaf('open-gate-only-once-under-the-spout', 'Open a hopper or gate only once it is under the spout', 'Discharge into a container.', { cue: 'The bag or tote is under the spout before any gate moves.', notes: 'Ordering constraint with an immediate and messy failure.' }),
        leaf('recover-bag-loop-failed-on-the-lift', 'Recover: a loop tore or slipped on the lift', 'Lower it immediately and rerig rather than continuing on three loops.', { fail: true }),
      ]),
    ]),

    node('wrap-and-band', 'Wrapping, banding and strapping', 'Turning a stack into one object that will survive a journey.', { dexterity: 4, contact: 5, prev: 'ubiquitous' }, [
      node('stretch-wrap', 'Stretch wrap by hand and by machine', 'Walking a roll around a load at tension.', { repetition: 'high-takt', saturation: 'empty', robotNow: 'partial' }, [
        leaf('throw-tail-and-hold-until-it-takes', 'Throw the wrap tail and hold it until it takes', 'Start a wrap.', { cue: 'The tail is held by a foot or a hand until the first pass traps it.' }),
        leaf('walk-the-pallet-overlapping-passes', 'Walk the pallet, overlapping each pass', 'Apply film evenly around a load.', { cue: 'Each pass overlaps the last and the roll stays against your body at constant tension.', prim: ['locomote', 'deform'] }),
        leaf('cut-and-smear-the-tail', 'Cut the wrap and smear the tail down', 'Finish a wrap so it cannot unpeel.', { cue: 'The tail is smeared onto the film and does not lift when you run a hand over it.' }),
        leaf('load-wrap-machine-and-stand-off', 'Load a wrap machine, start it and stand off', 'Run a turntable safely.', { cue: 'The cycle is started and you are clear of the turntable before it moves.', capital: 'mid', ethics: 'restricted' }),
        leaf('unload-machine-after-it-stops', 'Unload a wrap machine after it stops', 'Take a wrapped pallet away.', { cue: 'The table has stopped and the pallet comes away square.' }),
        leaf('recover-wrap-peeling-off-a-corner', 'Recover: wrap peeling from a corner', 'Rewrap that section rather than adding a band over failing film.', { fail: true }),
      ]),
      node('banding-strapping', 'Band and strap', 'Stored energy in tension, released toward your face.', { precision: 3, ethics: 'restricted' }, [
        leaf('band-in-the-specified-path', 'Band a carton or pallet in the specified path', 'Place a band where it will hold and not cut.', { cue: 'The band sits in the specified path rather than across an edge that will cut it.' }),
        leaf('tension-band-until-pack-cannot-walk', 'Tension a band until the pack is firm', 'Tighten a band to hold a load.', { cue: 'The pack cannot walk when pushed at the top corner.' }),
        leaf('crimp-seal-and-tug-once', 'Crimp or weld the seal and tug it', 'Close and prove a band.', { cue: 'The seal holds a single firm tug.', verify: 'Tug every seal once before the pallet moves.' }),
        leaf('fit-corner-boards-hold-until-caught', 'Fit corner boards and hold them until caught', 'Protect corners before the strap takes.', { cue: 'All four are held in place until the wrap or the strap catches them.', prim: ['bimanual'] }),
        leaf('fit-top-cap-square', 'Fit a top cap squarely', 'Place a protective cap over the top layer of a built pallet.', { cue: 'It covers the top layer and does not hang off one side.' }),
        leaf('ratchet-strap-hook-seated', 'Ratchet a strap and seat the hook', 'Secure with webbing.', { cue: 'The webbing is firm and the hook is fully in the slot or rail, not caught on an edge.' }),
        leaf('release-strap-so-handle-cannot-whip', 'Release a strap under control', 'Let tension out of a ratchet safely.', { cue: 'The handle is controlled through the release and cannot whip back.', notes: 'The moment of stored-energy release. Body position is the mitigation, not grip.' }),
        leaf('cut-band-away-from-the-body', 'Cut a band away from your body', 'Sever a tensioned band.', { cue: 'The cutter points away and the band is held so it cannot snap toward your face.' }),
        leaf('recover-band-snapped-under-tension', 'Recover: band failed while being tensioned', 'Stand clear, assess the stack, and rebuild before rebanding.', { fail: true }),
      ]),
    ]),

    node('pallet-building', 'Build and break pallets', 'Spatial planning executed by hand, and the thing pick-and-place still cannot generalise.', { dexterity: 3, precision: 3, contact: 5, robotNow: 'partial', saturation: 'thin', prev: 'ubiquitous' }, [
      node('build-a-stack', 'Build a stable stack', 'Choosing a pattern that will hold before any wrap goes on.', { skillYears: 'months', robotNow: 'no', saturation: 'empty' }, [
        leaf('build-layer-flat-to-pattern', 'Build a layer to the pattern and keep it flat', 'Lay a course of cartons.', { cue: 'Every carton is in the pattern and the layer is flat enough to build on.' }),
        leaf('pinwheel-so-joints-do-not-stack', 'Pinwheel a layer so joints do not align', 'Interlock successive layers.', { cue: 'No joint sits directly above the joint below it.', notes: 'A planning decision made by hand, per layer, from a heterogeneous set. This is the part automation still struggles with.' }),
        leaf('count-back-to-a-stable-pyramid', 'Count back a stack to a stable shape', 'Remove units and leave what remains sound.', { cue: 'What is left is still a stable pyramid, not a column with a hole in it.' }),
        leaf('recover-lean-restack-plumb', 'Recover: stack leaning before wrap', 'Restack it plumb rather than wrapping the lean in.', { fail: true }),
        leaf('recover-crushed-corner', 'Recover: crushed corner found on a built pallet', 'Rebuild with a new board or carton and re-wrap rather than patching over.', { fail: true }),
      ]),
      node('break-down', 'Break down and handle empties', 'Taking a pallet apart and dealing with what is left.', { dexterity: 2, prev: 'common' }, [
        leaf('break-down-a-layer-at-a-time', 'Break down one layer at a time', 'Deplete a pallet without collapsing it.', { cue: 'The stack you are building stays plumb and the one you are taking from stays stable.' }),
        leaf('stack-empties-square-and-liftable', 'Stack empty pallets square', 'Build a pallet stack you can still work with.', { cue: 'The stack is square and the top one can still be lifted off.' }),
        leaf('carry-empty-pallet-set-down-flat', 'Carry an empty pallet and set it down flat', 'Move a single pallet.', { cue: 'It is carried at the side or on the shoulder and lands flat, not dropped on a corner.' }),
        leaf('flip-pallet-good-deck-up', 'Flip a pallet so the good deck is up', 'Orient a pallet for use.', { cue: 'The sound deck is up and the stringers run the way the jack needs.' }),
        leaf('recover-pallet-with-a-broken-board', 'Recover: broken board found in a pallet', 'Pull it from service rather than loading over the break.', { fail: true }),
      ]),
    ]),

    node('dock', 'Dock and trailer interface', 'The gap between the building and the vehicle, and everything that stops it moving.', { contact: 5, ethics: 'restricted', prev: 'common' }, [
      node('dock-plate-and-chocks', 'Plate, chock and secure', 'Making the gap safe before anything crosses it.', { dexterity: 3 }, [
        leaf('drop-dock-plate-both-lips-seated', 'Drop a dock plate so both lips sit', 'Bridge to a trailer.', { cue: 'Both lips are seated and the plate cannot kick up when a wheel crosses it.' }),
        leaf('pull-plate-back-and-park-it', 'Pull the plate back and park it', 'Retrieve and stow a bridge.', { cue: 'It is back on the dock and in its holder rather than left on the edge.' }),
        leaf('chock-trailer-against-tread', 'Chock a trailer wheel against the tread', 'Stop a trailer creeping off the dock.', { cue: 'The chock is against the tread and the trailer cannot creep.', notes: 'Trailer creep is slow, silent, and the reason people fall into the gap.' }),
        leaf('sweep-plate-and-threshold', 'Sweep the plate and the threshold', 'Clear debris from the crossing.', { cue: 'The next wheel will not ride on debris at the joint.' }),
        leaf('recover-trailer-crept-off-the-plate', 'Recover: trailer crept away from the dock', 'Stop all traffic across the gap before anything else.', { fail: true, horizon: 'medium' }),
      ]),
      node('trailer-doors-and-gear', 'Doors, glad-hands and landing gear', 'The trailer connections a yard person makes by hand.', { dexterity: 4, contact: 5 }, [
        leaf('open-doors-lock-against-the-sides', 'Open trailer doors and lock them back', 'Secure doors so they cannot swing.', { cue: 'Both doors are locked against the sides and cannot catch the wind.' }),
        leaf('close-doors-latch-both-rods', 'Close trailer doors and latch both rods', 'Shut and secure a trailer.', { cue: 'Both cam rods are latched and it is locked or sealed as required.' }),
        leaf('couple-gladhands-faces-clean', 'Couple glad-hands with clean faces', 'Connect trailer air lines.', { cue: 'Both faces are clean, mated, and the handles are over centre.' }),
        leaf('crank-landing-gear-to-state', 'Crank landing gear to the correct state', 'Raise or lower the trailer legs.', { cue: 'Feet are off the ground after hookup, or down and on the pad after a drop.', contact: 5 }),
        leaf('couple-fifth-wheel-pull-test-and-look', 'Couple a fifth wheel and prove it', 'Make and verify a tractor coupling.', { cue: 'It locks, holds a pull-test, and the jaws are visually confirmed closed around the pin.', verify: 'All three: lock, pull-test, and a look at the jaws. Not two of them.', partner: 'licensed' }),
        leaf('pull-pin-only-once-on-the-gear', 'Pull the fifth-wheel pin only once it is on the gear', 'Release a trailer safely.', { cue: 'The trailer is fully on its landing gear before the release is pulled.' }),
        leaf('spot-trailer-square-to-the-dock', 'Spot a trailer square to the dock', 'Place a trailer for loading.', { cue: 'The rear is square to the dock and the landing gear will sit on the pad.' }),
        leaf('recover-trailer-dropped-on-soft-ground', 'Recover: landing gear sinking on soft ground', 'Recouple and reposition onto a pad rather than adding timber under a sinking leg.', { fail: true, horizon: 'medium' }),
      ]),
      node('container-access', 'Container access and lighting', 'Boxes that are opened outdoors with the weather in them.', { dexterity: 4, prev: 'common' }, [
        leaf('unlock-and-swing-lock-clear', 'Unlock a container lock and swing it clear', 'Release a container security device.', { cue: 'The lock is clear of the door swing before the cams are turned.' }),
        leaf('open-container-doors-lock-back', 'Open container doors and lock them back', 'Open a box outdoors.', { cue: 'Both doors are locked back so the wind cannot catch them.' }),
        leaf('climb-in-on-the-designated-step', 'Climb into a container on the designated step', 'Enter a container safely.', { cue: 'You use the step or ramp, never the lock rods.' }),
        leaf('hang-dock-light-lead-clear', 'Swing a dock light in and clear the lead', 'Light a trailer interior.', { cue: 'The floor is lit and the lead is not lying across the walking route.' }),
        leaf('recover-door-caught-by-wind', 'Recover: container door caught by the wind', 'Get clear, then re-approach from the hinge side.', { fail: true }),
      ]),
    ]),

    node('trailer-loading', 'Load and secure a trailer', 'Building a load that has to hold for a whole journey.', { dexterity: 3, contact: 5, horizon: 'long', robotNow: 'no', saturation: 'empty', prev: 'common' }, [
      node('floor-loading', 'Floor-load a trailer', 'Filling a box so nothing can move forward.', { skillYears: 'months' }, [
        leaf('load-snug-to-the-nose-square', 'Load snug to the nose with the first row square', 'Start a load correctly.', { cue: 'The first row is square to the walls and tight to the nose.' }),
        leaf('floor-load-every-row-tight', 'Floor-load so every row is tight to the last', 'Fill without gaps.', { cue: 'No row has a gap in front of it that would let the load walk forward under braking.' }),
        leaf('load-last-row-doors-close-and-blocked', 'Load the last row so the doors close and it is blocked', 'Finish a load.', { cue: 'The doors close and the last row is still restrained rather than leaning on them.' }),
        leaf('walk-the-load-from-the-nose-out', 'Walk the load from the nose out and check', 'Verify a finished load.', { cue: 'Every row is still tight when checked from the nose outward.', verify: 'Walk it before the doors close, not from the dock afterwards.' }),
        leaf('recover-gap-found-mid-load', 'Recover: gap found part-way down the load', 'Fill or block it rather than tightening at the door end.', { fail: true }),
      ]),
      node('securing', 'Shore, block and restrain', 'Everything that stops a load moving once you have left it.', { contact: 5, prev: 'common' }, [
        leaf('strap-to-etrack-fitting-fully-in', 'Strap to E-track with the fitting fully in', 'Anchor to a track system.', { cue: 'The fitting is fully in the slot and the strap does not cross a sharp corner.' }),
        leaf('set-decking-beam-both-tracks-locked', 'Set a decking beam into both tracks', 'Fit a load bar.', { cue: 'Both ends are at the same height and locked.' }),
        leaf('shore-with-timber-or-airbag', 'Shore cargo with timber or an airbag', 'Fill a void so the load cannot travel.', { cue: 'The void is filled and the load cannot walk in any direction.' }),
        leaf('cut-dunnage-and-place-clear-of-wheels', 'Cut dunnage and set it under the load', 'Prepare and place timber.', { cue: 'It is under the load and clear of any wheel path.' }),
        leaf('hammer-wedge-so-it-cannot-kick', 'Hammer a wedge so it stays', 'Set a wedge that holds under movement.', { cue: 'It will not kick out when the truck moves and settles.' }),
        leaf('inflate-dunnage-bag-to-feel', 'Inflate a dunnage bag to the specified feel', 'Fill a void bag.', { cue: 'It reaches the specified firmness and the valve is closed.' }),
        leaf('walk-a-trailer-floor-avoiding-soft-spots', 'Walk a trailer floor clear of soft spots', 'Move inside a trailer safely.', { cue: 'You stay off soft flooring and open decking holes.' }),
        leaf('recover-load-shifted-in-transit', 'Recover: load shifted in transit', 'Open carefully from the hinge side, assess, restack and re-secure.', { fail: true, horizon: 'long' }),
      ]),
    ]),

    node('manual-handling', 'Carrying, carts and totes', 'Where the lift height is the variable and the technique changes with it.', { dexterity: 3, contact: 5, ethics: 'restricted', prev: 'ubiquitous', notes: 'The high-slot and low-slot pulls are separate leaves rather than posture variants of one: the injury mechanism and the technique genuinely differ with height.' }, [
      node('carrying', 'Carry by hand', 'Loads at the body, and loads that need two people.', { repetition: 'high-takt' }, [
        leaf('carry-carton-at-body-set-not-toss', 'Carry a carton at the body and set it down', 'Move a carton and place it.', { cue: 'It is carried close and set on the stack rather than tossed onto it.' }),
        leaf('carry-two-only-if-you-can-see-over', 'Carry two cartons only if you can see over them', 'Decide whether a double carry is safe.', { cue: 'You can see your route over the load, and both are set down under control.' }),
        leaf('shoulder-carry-long-good-set-together', 'Shoulder-carry a long good and set both ends', 'Move a long item alone.', { cue: 'Both ends come down together rather than one end dropping first.' }),
        leaf('two-person-carry-on-the-count', 'Two-person carry a long pack on the count', 'Move a load with a partner.', { cue: 'Same height, walking on the spoken count, and set down on blocking.', prim: ['language', 'bimanual'] }),
        leaf('recover-load-slipping-mid-carry', 'Recover: load slipping mid-carry', 'Set it down deliberately rather than adjusting grip while walking.', { fail: true }),
      ]),
      node('totes-and-slots', 'Totes at height and at floor level', 'The same object, two entirely different lifts.', { dexterity: 4, precision: 3 }, [
        leaf('put-tote-fully-on-beam-label-out', 'Put a tote on a shelf fully on the beam', 'Place a tote in a slot.', { cue: 'It is fully on the beam and the label faces the aisle.' }),
        leaf('pull-high-tote-to-chest-before-turning', 'Pull a tote from a high slot to your chest', 'Take a load down from above shoulder height.', { cue: 'Both hands are on it and it is at your chest before you turn.', contact: 5 }),
        leaf('pull-low-tote-hip-hinge-stand-first', 'Pull a tote from a low slot with a hip hinge', 'Take a load from below knee height.', { cue: 'The lift is a hip hinge, and you are standing before you walk.' }),
        leaf('recover-tote-pulled-with-a-round-back', 'Recover: caught yourself lifting with a round back', 'Set it down and reset the lift rather than finishing it.', { fail: true }),
      ]),
      node('carts', 'Load and move carts', 'Wheels, thresholds and what happens at a turn.', { dexterity: 3 }, [
        leaf('pack-cart-heavy-low', 'Pack out to a cart with the heavy low', 'Load a cart so it will not tip.', { cue: 'The heavy items are low and the cart will not tip when pushed.' }),
        leaf('push-cart-both-hands-see-a-wheel', 'Push a loaded cart with both hands', 'Move a cart under control.', { cue: 'Both hands are on the handle and you can see at least one wheel.' }),
        leaf('steer-cart-through-a-turn', 'Steer a cart through a 90 degree turn', 'Turn a loaded cart in an aisle.', { cue: 'It comes round without clipping the rack leg.' }),
        leaf('take-cart-over-threshold-together', 'Take a cart over a threshold', 'Cross a plate or a lip.', { cue: 'Both wheels come up and down together rather than one at a time.' }),
        leaf('recover-cart-tipped-at-a-threshold', 'Recover: cart tipped or shed a load at a lip', 'Clear the aisle first, then rebuild the cart lower.', { fail: true }),
      ]),
    ]),

    node('pick-pack', 'Picking, packing and induction', 'The half of the domain a decade of capital has already been spent on.', { dexterity: 4, precision: 3, contact: 3, robotNow: 'yes', saturation: 'heavy', capital: 'capex', prev: 'ubiquitous' }, [
      node('pick-face', 'Work a pick face', 'Stock presentation and rotation.', { robotNow: 'partial', saturation: 'thin' }, [
        leaf('slot-to-the-face-rule', 'Slot stock to the face rule', 'Replenish a pick face in the correct order.', { cue: 'New stock goes behind or beside the old exactly as the face rule specifies.' }),
        leaf('face-the-bay-nothing-hidden', 'Face a bay so everything is pullable', 'Present a bay for picking.', { cue: 'Every unit can be pulled from the aisle and nothing is hidden behind a gap.' }),
        leaf('reach-and-return-scan-gun', 'Draw a scan gun and return it to the holster', 'The reach and return around every pick.', { cue: 'The gun returns to the holster before the next reach begins.', notes: 'Captured for the reach and the return, not for the scan. The barcode is not the interesting part.', repetition: 'high-takt' }),
        leaf('recover-stock-slotted-in-front-of-old', 'Recover: new stock slotted in front of old', 'Pull the face and reslot rather than picking the new first.', { fail: true }),
      ]),
      node('case-and-label', 'Break cases and label', 'Opening product without damaging it.', { dexterity: 5, precision: 4 }, [
        leaf('break-case-without-scoring-product', 'Break a case so the units stay in order', 'Open a case cleanly.', { cue: 'The blade does not reach the product and the inners stay in sequence.', notes: 'A partial-depth cut, same class as the apparel notching: the boundary is the product and there is no stop.' }),
        leaf('apply-label-and-burnish-it', 'Slap a label on the specified face and burnish it', 'Apply a label that will survive the belt.', { cue: 'It is on the specified face and burnished so it cannot peel.' }),
        leaf('print-and-apply-reach-cycle', 'Print, take, apply and return to the pack', 'Run a print-and-apply cycle.', { cue: 'The label is applied and you are back at the pack without breaking the rhythm.', repetition: 'high-takt' }),
        leaf('recover-label-applied-to-the-wrong-face', 'Recover: label on the wrong face', 'Remove it fully and relabel rather than applying a second one.', { fail: true }),
      ]),
      node('pack-and-induct', 'Pack and induct', 'Building a parcel and getting it onto the system.', { repetition: 'high-takt', robotNow: 'yes', saturation: 'heavy' }, [
        leaf('build-parcel-product-cannot-shift', 'Build a parcel so the product cannot shift', 'Pack a carton.', { cue: 'The flaps meet and nothing moves when the box is shaken.' }),
        leaf('tape-centre-seam-and-both-ends', 'Run a tape gun down the seam and over the ends', 'Seal a carton.', { cue: 'The tape is on board along its whole length, not bridging air at the ends.' }),
        leaf('add-void-fill-then-close', 'Add void fill until nothing rattles', 'Fill a parcel.', { cue: 'Nothing rattles and the flaps still close without bulging.' }),
        leaf('close-flaps-in-order-press-tape', 'Close the flaps in order and press the tape', 'Finish a carton.', { cue: 'The specified flap order is followed and the tape is pressed down.' }),
        leaf('induct-square-and-label-up', 'Induct a parcel square to the belt, label up', 'Place a parcel onto a conveyor.', { cue: 'It is square to the belt with the label facing up.' }),
        leaf('pull-from-belt-with-the-flow', 'Pull from a belt with the flow', 'Take a parcel off a moving conveyor.', { cue: 'You take it with the flow and turn only once it is in your hands.', contact: 4 }),
        leaf('sort-into-the-correct-mouth', 'Sort to a chute or bin', 'Place a parcel at its destination.', { cue: 'It is in the correct mouth and not stacked over the lip.' }),
        leaf('throw-to-the-mouth-not-the-rim', 'Throw to a chute only if that is the method', 'Send a parcel to a container by throwing.', { cue: 'It goes in the mouth rather than off the rim, and only where throwing is the accepted method.' }),
        leaf('recover-parcel-jammed-at-a-chute', 'Recover: parcel jammed at a chute mouth', 'Stop the flow before reaching in.', { fail: true, ethics: 'restricted' }),
      ]),
    ]),

    node('yard-site', 'Yard, spills and directing traffic', 'Sharing a floor with moving machines.', { contact: 3, dexterity: 3, ethics: 'restricted', prev: 'common' }, [
      node('spills-and-housekeeping', 'Spills and floor', 'Making a floor safe to walk and drive on.', { dexterity: 3 }, [
        leaf('absorbent-outside-in-stand-off', 'Put absorbent down from the outside in', 'Contain a spill on a floor.', { cue: 'It goes down from the outside in and you stand off the wet once it is covered.' }),
        leaf('sweep-into-one-pile-aisle-walkable', 'Sweep a floor into one pile', 'Clear a working area.', { cue: 'The debris is in one place and the aisle is walkable.' }),
        leaf('cone-off-a-bay-or-a-spill', 'Cone off a bay or a spill', 'Exclude traffic from a hazard.', { cue: 'A truck cannot enter the bay without moving the cone.' }),
        leaf('move-a-cone-to-where-it-is-seen', 'Move a cone and set it where it will be seen', 'Reposition a marker.', { cue: 'It sits where the next person will see it before they need to stop.' }),
        leaf('dump-only-if-it-is-meant-to-dump', 'Dump a tote only if that is the method', 'Discharge a container by tipping.', { cue: 'The container is designed to dump and you are standing off the pour.' }),
        leaf('shovel-residual-into-the-next-container', 'Shovel residual out of a tote or off the floor', 'Recover the last of a bulk material.', { cue: 'The last of it is in the next container rather than swept to the floor.' }),
        leaf('recover-spill-spread-by-a-wheel', 'Recover: spill spread by a truck driving through it', 'Stop traffic in the aisle before cleaning any of it.', { fail: true }),
      ]),
      node('signalling', 'Direct traffic by hand', 'Codified gesture between two people, one of them in a cab.', { prim: ['language', 'inspect'], contact: 1, robotNow: 'no', saturation: 'empty', skillYears: 'months', notes: 'Non-verbal human protocol where each pose has exactly one agreed meaning. Rare in the atlas and directly useful for multimodal capture.' }, [
        leaf('direct-a-truck-one-meaning-per-pose', 'Direct a truck with arm signals', 'Guide a driver you cannot speak to.', { cue: 'Each pose has a single meaning and the driver acts on it without asking.', verify: 'Confirm eye contact before the first signal and stop the moment you lose it.' }),
        leaf('recover-driver-lost-sight-of-the-banksman', 'Recover: driver lost sight of you mid-manoeuvre', 'Stop the vehicle immediately rather than continuing to signal.', { fail: true }),
      ]),
    ]),

    node('close-out', 'Leave the area safe', 'The state the next shift walks into.', { contact: 2, dexterity: 2, prev: 'ubiquitous' }, [
      node('close-down', 'Close down a door or a bay', 'Putting equipment and yourself into a known state.', { horizon: 'short', ethics: 'restricted' }, [
        leaf('jack-down-forks-down-lane-clear', 'Leave the door or rack in its safe state', 'Finish at a bay.', { cue: 'The jack or forks are down, your body is off the travel lane, and the last strap or wrap is complete.' }),
        leaf('recover-equipment-left-in-a-travel-lane', 'Recover: equipment left in a travel lane', 'Move it and check what else was left from the same job.', { fail: true }),
      ]),
    ]),
  ],
)
