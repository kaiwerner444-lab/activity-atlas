import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// The only domain where what you are working on is a person.
//
// Not a bystander, as in retail, and not a colleague who shares the protocol.
// Someone who is being acted upon, who has sensation, judgement and dignity, and
// who is frequently the limiting factor in their own task. That changes the shape
// of nearly every cue:
//
//   The stop condition comes from them. Stop at resistance or pain is a
//   terminating signal received from another nervous system. Nothing else in the
//   atlas has that.
//
//   Doing too much is the failure. Let them do the work you cue. Let them finish
//   the zip if they can. A bow they can pull, not a double knot. The skill is
//   calibrating how much not to do, in order to preserve a capability.
//
//   Every cue is a two-body problem. Your feet matching theirs. Close enough to
//   catch, not so close your feet tangle. Bring them back over their feet, not
//   onto yours.
//
// The clinical versions of several of these live in D07 and score very
// differently, because a ward has a regulated partner between us and the work
// and a living room does not. The same physical act, in two settings, with
// genuinely different feasibility. That difference is the point of having both.

export const d02: NodeSpec = node(
  'd02',
  'Home living and care',
  'Keeping a home working and helping a person live in it: tidying, laundry, beds, and the transfers, personal care and support that domestic caregiving is made of.',
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
    embodiment: ['ego', 'suit', 'video'],
    saturation: 'thin',
    ours: 'none',
    rights: 'consent-heavy',
    ethics: 'open',
    prev: 'ubiquitous',
    prim: ['grasp', 'deform', 'locomote', 'transfer'],
  },
  [
    node('transfers', 'Transfers and hoisting', 'Moving a person who cannot move themselves, where the sequence is the safety case for both of you.', { contact: 5, dexterity: 3, skillYears: 'months', robotNow: 'no', saturation: 'empty', ethics: 'restricted', prev: 'common', notes: 'The clinical equivalents are in D07 with a regulated partner. Here it is often a relative, alone, in a bedroom. Far more feasible to capture and far less recorded.' }, [
      node('assisted-stand', 'Assist a stand and a sit', 'The most repeated transfer there is.', { prim: ['bimanual', 'language'] }, [
        leaf('sit-to-stand-at-the-elbow', 'Assist a sit-to-stand at the elbow', 'Support a person rising from a chair.', { cue: 'You hold at the elbow, not the wrist, and both their knees are locked before you let go.', verify: 'Wait for a steady second in standing before moving your hand.' }),
        leaf('stand-to-sit-chair-at-the-legs', 'Lower a person to sitting', 'Guide a controlled descent.', { cue: 'The chair touches the back of their legs first, and the last inches are lowered rather than dropped.' }),
        leaf('cue-stand-without-pulling-arms', 'Cue a sit-to-stand without pulling their arms', 'Prompt rather than lift.', { cue: 'The work comes from them, with the belt or the chair arms taking any assistance.', notes: 'Pulling on the arms is faster, easier and takes the capability away. Doing less is the skill.' }),
        leaf('recover-stand-that-failed-halfway', 'Recover: a stand that fails part-way up', 'Return them to sitting safely rather than completing the lift for them.', { fail: true }),
      ]),
      node('seat-to-seat', 'Transfer between surfaces', 'Bed, chair, commode, and the gap between them.', { contact: 5, prim: ['bimanual', 'language'] }, [
        leaf('bed-to-chair-on-a-count', 'Transfer bed to chair on a count', 'Move a person between two seated surfaces.', { cue: 'Hips lead toward the chair, you pause when they are over it, then they sit.' }),
        leaf('chair-to-commode-no-gap', 'Transfer chair to commode', 'Move to a fixture with an opening in it.', { cue: 'No gap is left that they could fall through at any point in the turn.' }),
        leaf('pivot-without-twisting-their-spine', 'Pivot transfer with the toes leading', 'Turn a person between surfaces.', { cue: 'Their toes point to the target before the turn, so their spine is not twisted to make it.' }),
        leaf('slide-board-guard-the-far-edge', 'Slide-board transfer', 'Bridge a gap and guard it.', { cue: 'The board is well under the hip, they slide, you guard the far edge, and the board comes out last.' }),
        leaf('recover-transfer-stalled-between-surfaces', 'Recover: transfer stalls between two surfaces', 'Bring them back to the surface they came from rather than pressing on.', { fail: true, horizon: 'short' }),
      ]),
      node('in-bed', 'Move a person in bed', 'Repositioning without dragging skin or lifting by limbs.', { dexterity: 3, contact: 5 }, [
        leaf('boost-with-a-pad-heels-clear', 'Boost up the bed with a pad or sheet', 'Move a person toward the head of the bed.', { cue: 'The head lands on the pillow and the heels are not dragged along the sheet.' }),
        leaf('log-roll-as-one-piece', 'Log-roll a person as one piece', 'Turn someone without twisting them.', { cue: 'They roll as a unit and are parked with a pillow behind so they cannot roll back onto their face.' }),
        leaf('recover-person-slid-down-the-bed', 'Recover: person slid back down the bed', 'Reboost with the pad rather than pulling under the arms.', { fail: true }),
      ]),
      node('hoisting', 'Sling and hoist', 'Machine-assisted transfer with a person in the sling.', { dexterity: 4, capital: 'mid', skillYears: 'months' }, [
        leaf('fit-sling-flat-and-in-the-loops', 'Fit a sling with every strap flat', 'Prepare a person for hoisting.', { cue: 'Straps are flat, leg pieces are in the specified colour loops, and nothing sits under a fold of skin.', verify: 'Run a hand under every strap before taking any weight.' }),
        leaf('steer-hoist-boom-first-through-a-door', 'Steer a hoist through a doorway', 'Move a loaded hoist.', { cue: 'The boom leads and you stop before the boom or the feet reach the frame.' }),
        leaf('lower-hips-back-sling-slack-then-unhook', 'Lower into a chair and unhook last', 'Complete a hoisted transfer.', { cue: 'Hips are back in the chair and the sling is slack before anything is unhooked.', notes: 'Ordering constraint with a person in it: unhooking early is the failure and it happens because it looks finished.' }),
        leaf('recover-sling-loop-in-the-wrong-position', 'Recover: sling loop found in the wrong setting', 'Lower fully and refit rather than adjusting under load.', { fail: true }),
      ]),
    ]),

    node('mobility-support', 'Walking, guarding and balance', 'Being close enough to help and far enough not to be the thing that trips them.', { contact: 4, dexterity: 3, skillYears: 'months', robotNow: 'no', saturation: 'empty', ethics: 'restricted', prev: 'common' }, [
      node('belts-and-aids', 'Fit belts and walking aids', 'Setting equipment to the person rather than to the cupboard it came from.', { precision: 3 }, [
        leaf('fit-gait-belt-two-fingers', 'Fit a gait belt low on the pelvis', 'Set a transfer belt.', { cue: 'Two fingers fit under it, and if it rides up to the ribs you reset it rather than continuing.' }),
        leaf('fit-walker-to-the-wrist-crease', 'Fit a walker to the wrist crease', 'Size a walking frame.', { cue: 'With their arms hanging, the handgrips sit at the wrist crease, and the knobs are locked.' }),
        leaf('fit-cane-and-put-it-in-the-right-hand', 'Fit a cane and place it correctly', 'Size and assign a cane.', { cue: 'Same wrist-crease height, and in the hand the assessment specified rather than the dominant one.' }),
        leaf('recover-aid-set-at-the-wrong-height', 'Recover: aid set to the wrong height', 'Reset it before the next walk rather than after the trip.', { fail: true }),
      ]),
      node('walking-with', 'Walk with a person', 'Two people moving as a pair, one of them unstable.', { prim: ['locomote', 'bimanual', 'language'], contact: 5 }, [
        leaf('ambulate-feet-matching-theirs', 'Walk with a belt, matching their pace', 'Support someone walking.', { cue: 'One hand on the belt, one ready, and your feet match theirs rather than dragging them along.' }),
        leaf('stand-by-close-enough-not-tangled', 'Stand-by assist at the right distance', 'Guard without contact.', { cue: 'Close enough to catch, not so close your feet tangle with theirs.', notes: 'A two-body distance judgement held continuously for the length of the walk.' }),
        leaf('guard-on-stairs-with-a-free-hand', 'Guard on stairs from the correct side', 'Support on a staircase.', { cue: 'You are on the side the house rule specifies, usually below on the way down, with a free hand for the rail.' }),
        leaf('turn-in-a-tight-bathroom', 'Turn a person in a tight space', 'Reposition where there is no room.', { cue: 'They are facing the fixture they need before they begin to sit.' }),
        leaf('recover-walk-abandoned-mid-corridor', 'Recover: they cannot continue mid-walk', 'Get a chair to them rather than walking them further to one.', { fail: true }),
      ]),
      node('balance-and-falls', 'Catch, block and lower', 'The seconds when the plan stops working.', { contact: 5, horizon: 'short', robotNow: 'no', saturation: 'empty' }, [
        leaf('block-a-weak-knee-until-they-lock', 'Block a weak knee in standing', 'Support a knee that may buckle.', { cue: 'The block stays until they lock, then it comes away rather than being held indefinitely.' }),
        leaf('support-weak-side-without-dragging', 'Support a weak side', 'Take load on one side.', { cue: 'You take weight without pulling them off their good foot.' }),
        leaf('catch-and-return-over-their-feet', 'Catch a loss of balance', 'Restore someone who is going over.', { cue: 'They come back over their own feet, not onto yours.' }),
        leaf('lower-a-crumple-with-your-hips', 'Lower a crumple to the floor or a chair', 'Control a fall you cannot stop.', { cue: 'The descent is taken through your hips and legs, not by catching at their arms.', notes: 'The instinctive action, grabbing an arm, dislocates shoulders. The trained action is to go down with them.' }),
        leaf('get-up-from-floor-cue-not-lift', 'Assist a get-up from the floor', 'Help someone off the ground.', { cue: 'A chair or stool is brought in and they do the work you cue.' }),
        leaf('recover-fall-that-reached-the-floor', 'Recover: they reached the floor', 'Assess before moving them at all, rather than getting them up quickly.', { fail: true, horizon: 'medium', prim: ['inspect', 'language'] }),
      ]),
      node('standing-tasks', 'Support standing activity', 'Being upright at a surface for a purpose.', { contact: 4 }, [
        leaf('sit-at-the-edge-until-steady', 'Sit at the edge and dangle until steady', 'Let someone adjust to upright.', { cue: 'They are steady before standing, and you do not stand them on the first sway.' }),
        leaf('march-in-place-with-a-hold', 'March in place with a hold on the belt', 'Run a standing exercise.', { cue: 'The specified number of steps, then stop rather than continuing while it is going well.' }),
        leaf('stand-at-a-counter-chair-behind', 'Stand at a counter with a chair behind them', 'Set up a standing activity safely.', { cue: 'A chair is behind them and your stance is off their feet.' }),
        leaf('recover-fatigue-mid-activity', 'Recover: fatigue part-way through standing work', 'Sit them before they ask rather than after the sway.', { fail: true }),
      ]),
    ]),

    node('personal-care', 'Washing, grooming and toileting', 'The most private work in the atlas, and the part that most needs doing well.', { contact: 5, dexterity: 4, ethics: 'restricted', rights: 'consent-heavy', robotNow: 'no', saturation: 'empty', skillYears: 'months', prev: 'common' }, [
      node('toileting', 'Toileting assistance', 'Positioning where both people have to be stable at once.', { prim: ['bimanual', 'language'] }, [
        leaf('toilet-assist-both-stable-first', 'Take a toilet-assist stance', 'Set up before helping with clothing.', { cue: 'You are stable and they are stable on the seat or the rail before anything else happens.' }),
        leaf('perineal-care-side-on', 'Take a perineal-care stance', 'Position for intimate care.', { cue: 'Side on, one hand on a rail or a hip, never leaning over their head.' }),
        leaf('empty-commode-without-sloshing', 'Empty and return a commode pot', 'Deal with a commode.', { cue: 'It is emptied without sloshing, rinsed to the house method, and returned under the seat.' }),
        leaf('change-pad-with-a-log-roll', 'Change a pad using a log-roll', 'Change bedding under a person.', { cue: 'They are rolled, not lifted by the arms.' }),
        leaf('fit-brief-tabs-on-the-landing-zone', 'Fit an incontinence brief', 'Fit a brief correctly.', { cue: 'The tabs land on the landing zone and the brief is not twisted anywhere.' }),
        leaf('recover-care-interrupted-mid-task', 'Recover: interrupted part-way through intimate care', 'Cover them and secure the situation before dealing with the interruption.', { fail: true }),
      ]),
      node('washing', 'Washing and bathing', 'Cleaning a person without leaving them cold or exposed.', { contact: 5, horizon: 'long' }, [
        leaf('bed-bath-in-parts', 'Give a bed bath in parts', 'Wash a person in bed.', { cue: 'One area is uncovered, washed, dried and covered before the next is started.', notes: 'The cue is about dignity and temperature, not about cleaning. Working faster by uncovering more is the failure.' }),
        leaf('carry-basin-at-midline', 'Carry a basin and set it down first', 'Move water safely.', { cue: 'It is carried at the mid-line and on a stable surface before anything is wrung out.' }),
        leaf('hair-wash-neck-supported', 'Wash hair at a basin', 'Wash hair with the head unsupported by the person.', { cue: 'The neck is supported throughout and water stays off the floor path.' }),
        leaf('recover-water-on-the-transfer-path', 'Recover: water on the floor where they will walk', 'Dry it before continuing, not after the task.', { fail: true }),
      ]),
      node('grooming', 'Grooming and mouth care', 'Fine work close to a face.', { dexterity: 5, precision: 4 }, [
        leaf('brush-assist-so-they-can-spit', 'Assist tooth brushing at the sink', 'Support oral care.', { cue: 'They can lean and spit without putting their weight onto you.' }),
        leaf('shave-assist-skin-taut-blade-parked', 'Assist a shave', 'Shave another person.', { cue: 'Skin taut, short strokes, and the blade is parked before you turn away for anything.' }),
        leaf('apply-lotion-long-strokes-then-wipe', 'Apply lotion in long strokes', 'Apply a topical product.', { cue: 'Long strokes, the bottle capped, and your hands wiped before you touch their clothes.' }),
        leaf('fit-hearing-aid-battery-and-ear', 'Fit a hearing-aid battery and place the aid', 'Handle a small device for someone.', { cue: 'The door closes on the battery and the aid goes in the specified ear.' }),
        leaf('clean-glasses-and-place-on-the-face', 'Clean glasses and put them on', 'Return eyewear to a person.', { cue: 'Temples go over the ears rather than the frame being parked on the crown of their head.' }),
        leaf('recover-nicked-skin-while-shaving', 'Recover: skin nicked during grooming', 'Stop, treat it and tell them rather than continuing and mentioning it later.', { fail: true, prim: ['language', 'recover'] }),
      ]),
    ]),

    node('dressing-assist', 'Assisted dressing', 'Deformable garments on a body that may not follow.', { dexterity: 5, contact: 5, ethics: 'restricted', rights: 'consent-heavy', robotNow: 'no', saturation: 'empty', prev: 'common' }, [
      node('upper-body', 'Dress the upper body', 'Where the weak arm decides the order.', { prim: ['deform', 'bimanual'] }, [
        leaf('dress-upper-weak-arm-first', 'Dress an upper body weak-arm first', 'Put a garment on over an affected limb.', { cue: 'The weak arm goes in first, and you stop if the elbow does not want to follow.', notes: 'Forcing the elbow is how a shoulder gets injured. The stop signal comes from their limb, not from the garment.' }),
        leaf('don-sweater-settle-collar-between', 'Don a sweater and settle the collar', 'Complete an over-the-head garment.', { cue: 'The collar is settled before the second sleeve goes on.' }),
        leaf('doff-sweater-weak-arm-last', 'Doff a sweater weak-arm last', 'Remove a garment safely.', { cue: 'The weak shoulder comes out last and is not yanked.' }),
        leaf('recover-arm-stuck-in-a-sleeve', 'Recover: arm caught in a sleeve', 'Work the garment back off rather than pulling the limb through.', { fail: true }),
      ]),
      node('lower-body', 'Dress the lower body', 'Garments that require standing at exactly one moment.', { contact: 5 }, [
        leaf('dress-lower-both-feet-before-standing', 'Dress a lower body one leg at a time', 'Fit trousers or similar.', { cue: 'Both feet are in the garment before they are stood up.' }),
        leaf('use-a-sock-aid', 'Use a sock aid', 'Fit socks without a deep bend.', { cue: 'The sock is on without them having to reach their own foot.' }),
        leaf('use-a-shoehorn-counter-intact', 'Use a shoehorn', 'Guide a heel into a shoe without collapsing the back of it.', { cue: 'The heel drops in and the shoe counter is not crushed.' }),
        leaf('fit-compression-stocking-no-roll', 'Fit a compression stocking', 'Apply graduated compression.', { cue: 'It reaches the specified height with no roll anywhere, since a roll acts as a tourniquet.', contact: 5, skillYears: 'months' }),
        leaf('fit-compression-wrap-even-tension', 'Fit a compression wrap', 'Wrap a limb.', { cue: 'Tension is even and the end is secured so it cannot unwind on the first step.' }),
        leaf('recover-stocking-rolled-at-the-knee', 'Recover: stocking rolled into a band', 'Take it fully off and refit rather than smoothing the roll.', { fail: true }),
      ]),
      node('fastenings', 'Fastenings', 'Fine work where finishing it for them is sometimes wrong.', { dexterity: 5, precision: 5 }, [
        leaf('button-from-the-bottom', 'Button from the bottom up', 'Fasten a placket.', { cue: 'Starting at the bottom keeps the placket aligned to the top.' }),
        leaf('start-a-zip-and-let-them-finish', 'Start a zip and let them finish it', 'Assist a fastening partially.', { cue: 'You start it, they finish if they can, and if you finish it you stop before catching skin.', notes: 'Two stop conditions in one act: their capability, and their skin.' }),
        leaf('tie-a-bow-they-can-pull', 'Tie a shoe with a bow they can pull', 'Fasten footwear.', { cue: 'A bow they can undo themselves, not a double knot unless they asked for one.' }),
        leaf('recover-caught-skin-in-a-fastening', 'Recover: skin caught in a zip or fastening', 'Release it slowly and check the skin rather than pulling it clear.', { fail: true }),
      ]),
    ]),

    node('eating-assist', 'Eating and drinking assistance', 'Where the pace is set entirely by the other person.', { dexterity: 4, precision: 4, contact: 3, ethics: 'restricted', rights: 'consent-heavy', robotNow: 'no', saturation: 'empty', prim: ['transfer', 'language', 'inspect'], prev: 'common' }, [
      node('feeding', 'Assist with food and drink', 'Small, slow, and entirely reactive.', { horizon: 'long' }, [
        leaf('spoon-from-below-eye-line', 'Assist feeding from below the eye line', 'Offer food to a seated person.', { cue: 'The spoon comes from below their eye line and you wait for the mouth to open.', notes: 'The whole tempo is theirs. Every timing decision is a response, not an initiation.' }),
        leaf('cue-a-chin-tuck-then-the-sip', 'Cue a swallow posture, then offer the drink', 'Support safe swallowing.', { cue: 'The chin tucks slightly, then the sip; the cup is never tipped at their face.' }),
        leaf('cut-food-to-one-bite', 'Cut food into single bites', 'Prepare a plate.', { cue: 'Each piece is one bite and the knife leaves the plate afterwards.' }),
        leaf('hand-a-drink-wait-for-the-grip', 'Hand a drink and wait for their grip', 'Transfer a cup.', { cue: 'You feel their grip take the weight before you let go.' }),
        leaf('recover-cough-or-choke-during-a-meal', 'Recover: coughing during a meal', 'Stop the meal entirely rather than pausing and continuing.', { fail: true, horizon: 'short' }),
      ]),
    ]),

    node('care-equipment', 'Wheelchairs, oxygen and aids', 'Equipment a person depends on, set up around them.', { dexterity: 4, contact: 4, ethics: 'restricted', robotNow: 'no', saturation: 'empty', skillYears: 'months', prev: 'common' }, [
      node('wheelchair', 'Wheelchair handling', 'Pushing somebody, which is not the same as pushing a cart.', { contact: 5, prim: ['locomote', 'language'] }, [
        leaf('lock-brakes-and-tug-before-transfer', 'Lock the brakes and tug the chair', 'Secure a chair before a transfer.', { cue: 'Both brakes are on and a single tug confirms the chair will not move.', verify: 'Tug the chair before any weight goes onto it.' }),
        leaf('swing-away-footrests-feet-to-floor', 'Swing away or remove footrests', 'Clear the footplates.', { cue: 'Both feet can reach the floor before a stand is attempted.' }),
        leaf('push-and-look-where-you-are-going', 'Push a wheelchair and look ahead', 'Move someone in a chair.', { cue: 'Your eyes are on the route, not the top of their head.' }),
        leaf('take-a-threshold-small-wheels-first', 'Take a threshold small wheels first', 'Cross a lip.', { cue: 'The castors come up first, then the large wheels, without pitching them forward.' }),
        leaf('down-a-curb-with-the-taught-dip', 'Go down a curb with the taught technique', 'Descend a step in a chair.', { cue: 'The dip you were taught, rather than a drop off the edge.' }),
        leaf('up-a-curb-with-the-taught-pop', 'Go up a curb with the taught technique', 'Ascend a step in a chair.', { cue: 'The pop you were taught, without yanking the handles.' }),
        leaf('recover-castor-caught-on-a-threshold', 'Recover: castor caught and the chair pitched', 'Steady them first, then back off and re-approach square.', { fail: true }),
      ]),
      node('oxygen-and-lines', 'Oxygen and tubing', 'Equipment with a lead that runs across a floor people walk on.', { dexterity: 5, precision: 4, prev: 'uncommon' }, [
        leaf('fit-cannula-prongs-correct-way', 'Fit a nasal cannula', 'Place oxygen tubing on a person.', { cue: 'The prongs curve the specified way and the tubing is not strapped tight under the chin.' }),
        leaf('coil-tubing-clear-of-wheels-and-feet', 'Coil oxygen tubing clear of the route', 'Manage a long line.', { cue: 'No wheel or foot can catch it anywhere along its run.' }),
        leaf('carry-cylinder-by-the-handle-into-the-stand', 'Carry a small cylinder and stand it', 'Move a gas cylinder.', { cue: 'Carried by the intended handle with the valve protected, and set into the stand rather than leant.' }),
        leaf('recover-tubing-pulled-off-mid-move', 'Recover: line pulled off during a transfer', 'Restore the oxygen before continuing the move.', { fail: true }),
      ]),
      node('bed-equipment', 'Bed rails, alarms and protectors', 'Fittings that hold or watch a person.', { contact: 4 }, [
        leaf('fit-bed-rail-to-up-lock-and-tug', 'Fit a bed rail to the up-lock', 'Raise and secure a rail.', { cue: 'It clicks to the up-lock and a tug confirms it.' }),
        leaf('lower-rail-with-a-hand-on-it', 'Lower a bed rail under control', 'Drop a rail.', { cue: 'Your hand stays on it until it is fully down.' }),
        leaf('lock-bed-wheels-kick-each-caster', 'Lock bed wheels and prove each one', 'Secure a bed.', { cue: 'Each caster is kicked to confirm it is locked, rather than looking at the levers.' }),
        leaf('unlock-only-to-move-the-bed', 'Unlock bed wheels only to move the bed', 'Release a bed deliberately.', { cue: 'They come off only when the bed is about to move, and go straight back on.' }),
        leaf('steer-a-bed-through-a-door', 'Steer a bed through a doorway', 'Move an occupied or empty bed.', { cue: 'Corners are led as needed and you stop before a corner reaches the frame.', dexterity: 2 }),
        leaf('fit-chair-alarm-pad-unfolded', 'Fit a chair-alarm pad', 'Place a rise alarm.', { cue: 'It sits under them unfolded and will alarm if they rise.', verify: 'Press the pad and confirm it sounds before leaving.' }),
        leaf('fit-hip-protectors-over-trochanters', 'Fit hip protectors', 'Place protective padding.', { cue: 'Both shields sit over the greater trochanters, not on the buttocks.' }),
        leaf('recover-alarm-that-did-not-sound', 'Recover: alarm pad failed a test', 'Replace or reseat it rather than leaving them without it.', { fail: true }),
      ]),
      node('range-of-motion', 'Passive range of motion', 'Moving somebody else’s joint, with their pain as the limit.', { contact: 5, precision: 4, ethics: 'restricted', skillYears: 'months', notes: 'The terminating signal is reported by another person. Nothing else in the atlas has a stop condition that arrives as speech.' }, [
        leaf('shoulder-rom-stop-at-resistance', 'Range the shoulder within the allowed range', 'Move a shoulder passively.', { cue: 'You stop at resistance or at the first report of pain, whichever comes first.' }),
        leaf('hip-rom-no-forced-rotation', 'Range the hip within the allowed range', 'Move a hip passively.', { cue: 'Rotation is never forced past the allowed range.' }),
        leaf('ankle-pumps-stop-if-it-will-not-follow', 'Assist ankle pumps', 'Move an ankle passively.', { cue: 'You stop if they report pain or if the foot will not follow.' }),
        leaf('recover-pain-reported-during-rom', 'Recover: pain reported mid-movement', 'Stop at once, return to neutral, and record it rather than easing further.', { fail: true, prim: ['language', 'recover'] }),
      ]),
    ]),

    node('beds', 'Beds and bedding', 'Making a bed, with and without somebody in it.', { dexterity: 4, contact: 4, prim: ['deform', 'bimanual'], prev: 'ubiquitous' }, [
      node('bed-making', 'Make a bed', 'Large deformables, mostly at arm span.', { saturation: 'thin', robotNow: 'no' }, [
        leaf('change-duvet-cover', 'Change a duvet cover', 'Invert, grab corners inside the cover, shake down.', { cue: 'All four corners are filled and the cover is not twisted.', skillYears: 'months' }),
        leaf('fit-sheet-all-four-corners', 'Fit a fitted sheet on all four corners', 'Fit a stretch sheet.', { cue: 'The elastic is under all four corners, not only the two you started with.' }),
        leaf('hospital-corner', 'Make a hospital corner', 'Fold and tuck a mitred corner.', { cue: 'Each corner is finished before you move to the next.' }),
        leaf('place-pillow-under-the-head', 'Place a pillow under the head', 'Position a pillow.', { cue: 'It supports the head rather than the shoulders, unless another position is specified.' }),
        leaf('recover-sheet-pulled-off-a-corner', 'Recover: sheet pulled off a corner overnight', 'Refit all four rather than tucking the loose one back.', { fail: true }),
      ]),
      node('occupied-bed', 'Bed care with a person in it', 'Changing linen around somebody.', { contact: 5, ethics: 'restricted', rights: 'consent-heavy', robotNow: 'no', saturation: 'empty', skillYears: 'months' }, [
        leaf('make-occupied-bed-never-toward-the-edge', 'Make an occupied bed', 'Change linen under a person.', { cue: 'The sheet finishes tight and they are never rolled toward the open edge of the bed.' }),
        leaf('raise-head-of-bed-to-the-mark', 'Raise or lower a manual head-of-bed crank', 'Adjust bed position.', { cue: 'It reaches the mark and the crank is locked and folded away if it has a lock.' }),
        leaf('recover-linen-change-abandoned-halfway', 'Recover: linen change stopped part-way', 'Return them to a safe, covered position before dealing with anything else.', { fail: true }),
      ]),
      node('positioning', 'Position and offload', 'Preventing harm caused by staying still.', { contact: 5, dexterity: 3, ethics: 'restricted', saturation: 'empty', prev: 'common' }, [
        leaf('reposition-left-with-enough-pillows', 'Reposition to the left and pack it', 'Turn and support a person.', { cue: 'Enough pillows that they cannot roll back onto a wound or a tube.' }),
        leaf('reposition-right-with-enough-pillows', 'Reposition to the right and pack it', 'Turn and support to the other side.', { cue: 'Same rule on the right.' }),
        leaf('heel-float-knee-not-hyperextended', 'Float the heels with a pillow', 'Offload the heels.', { cue: 'The heel is clear of the mattress and the knee is not pushed into hyperextension.' }),
        leaf('fit-wedge-and-recheck-after-a-minute', 'Fit a positioning wedge', 'Support a position with a wedge.', { cue: 'It sits at the specified angle and has not slid when you check a minute later.', verify: 'Recheck the wedge after the first minute.' }),
        leaf('recover-position-lost-within-the-hour', 'Recover: position lost soon after repositioning', 'Repack with more support rather than simply turning them again.', { fail: true }),
      ]),
    ]),

    node('alongside', 'Household tasks alongside the person', 'Ordinary domestic work, done for somebody rather than for yourself.', { contact: 3, dexterity: 4, rights: 'consent-heavy', robotNow: 'no', saturation: 'empty', prev: 'ubiquitous' }, [
      node('reaching-for', 'Fetch, reach and place', 'Where things end up matters more than that they are moved.', { prim: ['grasp', 'inspect', 'language'] }, [
        leaf('reacher-into-their-hand', 'Use a reacher and place it in their hand', 'Retrieve a dropped item.', { cue: 'It goes into their hand, not onto their lap out of their sight.' }),
        leaf('pick-off-the-floor-into-view', 'Pick an item off the floor and put it in view', 'Retrieve something for someone.', { cue: 'It ends up where they can see it.' }),
        leaf('open-a-jar-and-hand-it-back-held', 'Open a jar and hand it back', 'Do the part they cannot.', { cue: 'The lid is set aside and your hand stays on the jar until they have it.' }),
        leaf('set-a-table-inside-the-reach-arc', 'Set a table within their reach', 'Lay out a place setting.', { cue: 'Plate, cup and tools all sit inside their reach arc.' }),
        leaf('retrieve-high-item-to-counter-height', 'Retrieve a high item to counter height', 'Bring something down.', { cue: 'It is left at counter height rather than passed back over their head.' }),
        leaf('return-pitcher-where-the-hand-knows-it', 'Empty, refill and return a pitcher', 'Manage a bedside item.', { cue: 'It goes back exactly where their hand already knows to find it.', notes: 'The best formulation in this list. The success condition is somebody else’s spatial memory.' }),
        leaf('recover-item-moved-and-not-found', 'Recover: something moved and they cannot find it', 'Put it back where it was rather than telling them where it is now.', { fail: true }),
      ]),
      node('doors-and-carrying', 'Doors, trays and bags', 'Moving through the house with them and with things.', { contact: 4, dexterity: 3 }, [
        leaf('open-a-heavy-door-and-hold-it-with-your-body', 'Open a heavy door while guarding', 'Get through a door together.', { cue: 'Your body holds the door so it cannot swing closed while you guard them.' }),
        leaf('close-the-door-once-the-aid-is-clear', 'Close a door after them', 'Complete the passage.', { cue: 'The cane or walker is fully through before the door moves.' }),
        leaf('carry-a-tray-not-onto-their-lap', 'Carry a tray and set it down', 'Bring food or drink.', { cue: 'It goes on a table, and a hot tray never goes onto their lap.' }),
        leaf('bring-groceries-in-where-they-can-see', 'Carry shopping in and set it in view', 'Bring goods into the house.', { cue: 'It is set where they can see what arrived.' }),
        leaf('recover-tray-tipped-in-transit', 'Recover: tray tipped on the way', 'Deal with the hot or wet first, then the mess.', { fail: true }),
      ]),
      node('laundry-for', 'Laundry for somebody else', 'Ordinary laundry with a person’s preferences attached.', { prim: ['deform', 'bimanual'], saturation: 'thin', robotNow: 'partial' }, [
        leaf('transfer-basket-with-a-hinge', 'Transfer a laundry basket', 'Move a basket to the machine.', { cue: 'Lifted through a hinge and set on the machine rather than carried on a hip.' }),
        leaf('load-washer-to-the-drum-line', 'Load a washer to the drum line', 'Fill a machine correctly.', { cue: 'To the line and not past it, with the door closed on the gasket.' }),
        leaf('hang-shirt-shoulders-and-hem-clear', 'Hang a shirt', 'Hang a garment to dry or store.', { cue: 'Both shoulders sit and the hem is clear of the next hanger.' }),
        leaf('fold-towel-to-the-house-fold', 'Fold a towel to the house fold', 'Fold to a household standard.', { cue: 'It matches the house fold and the stack stays square.' }),
        leaf('recover-garment-shrunk-or-ruined', 'Recover: garment damaged in the wash', 'Tell them rather than quietly replacing it.', { fail: true, prim: ['language'] }),
      ]),
    ]),

    node('tidy', 'Tidy and organise', 'Deciding where things belong and putting them there.', { horizon: 'long', prev: 'ubiquitous' }, [
      node('declutter', 'Clear and reset a room', 'Clearing surfaces and restoring a room to a resting state.', { contact: 3, robotNow: 'no', saturation: 'thin' }, [
        leaf('clear-cluttered-table', 'Clear a cluttered table', 'Sort a heap into destinations and carry them in batches.', { cue: 'The surface is clear and nothing has been moved somewhere it will be lost.', prim: ['grasp', 'locomote', 'inspect'] }),
        leaf('put-away-by-category', 'Put objects away by category', 'Infer where an unfamiliar object belongs in this particular home.', { cue: 'It ends up where this household keeps that kind of thing, not where you would keep it.', robotNow: 'no', saturation: 'empty' }),
        leaf('recover-something-put-away-wrong', 'Recover: item put away where it will not be found', 'Ask rather than guess a second time.', { fail: true }),
      ]),
      node('toy-tidy', 'Gather scattered small objects', 'Collecting many small dissimilar objects.', { dexterity: 4 }, [
        leaf('collect-small-objects', 'Collect scattered small objects into a box', 'Sweep a floor area, grasp mixed shapes, deposit.', { cue: 'The floor is clear enough to walk safely.', saturation: 'thin', robotNow: 'partial' }),
      ]),
    ]),

    node('laundry', 'Laundry and textiles', 'Deformable object manipulation the field is still bad at.', { contact: 4, dexterity: 4, robotNow: 'partial', saturation: 'thin', prev: 'ubiquitous', prim: ['deform', 'bimanual'] }, [
      node('folding', 'Fold and pair laundry', 'Turning a pile into stacks.', { dexterity: 4 }, [
        leaf('fold-t-shirt', 'Fold a t-shirt', 'Flatten, fold in thirds, halve, square the stack.', { cue: 'The stack stays square when it is added to.', saturation: 'heavy', robotNow: 'partial' }),
        leaf('fold-fitted-sheet', 'Fold a fitted sheet', 'Nest the corners and square a shape with no flat state.', { cue: 'The corners are nested and it will sit flat on a shelf.', dexterity: 5, contact: 4, robotNow: 'no', saturation: 'empty', skillYears: 'months' }),
        leaf('pair-socks', 'Pair socks from a mixed pile', 'Match by appearance and texture, roll or fold the pair.', { cue: 'Every pair is matched and the odd ones are set aside rather than guessed.', saturation: 'thin' }),
      ]),
      node('ironing', 'Iron and press garments', 'Tool-mediated deformation with heat.', { contact: 4, skillYears: 'months', prev: 'common' }, [
        leaf('iron-shirt', 'Iron a shirt', 'Work panels in order, managing the fabric with the free hand.', { cue: 'Every panel is pressed and no new crease has been ironed in.', prim: ['tool', 'deform', 'bimanual'], saturation: 'thin' }),
        leaf('press-collar-cuffs', 'Press a collar and cuffs', 'Fine tool work on small stiff panels.', { cue: 'Flat and square, with no imprint of the seam on the face.', dexterity: 5, saturation: 'empty' }),
        leaf('recover-scorch-mark', 'Recover: fabric scorched by the iron', 'Stop and tell them rather than folding the mark inward.', { fail: true, prim: ['language'] }),
      ]),
    ]),

    node('plants-pets', 'Plants and animals', 'Care tasks where the object moves or is alive.', { prev: 'common', saturation: 'thin' }, [
      node('plant-care', 'Water and repot plants', 'Indoor horticulture.', {}, [
        leaf('repot-houseplant', 'Repot a houseplant', 'Support the root ball, transfer, backfill, firm and water.', { cue: 'The plant sits at the same depth it was and the pot is firm but not compacted.', contact: 4, prim: ['bimanual', 'transfer'] }),
      ]),
      node('pet-care', 'Groom and handle a pet', 'Handling a compliant, unpredictable partner.', { contact: 5, robotNow: 'no', saturation: 'empty' }, [
        leaf('brush-a-dog', 'Brush a dog', 'Regulate force against an animal that moves and reacts.', { cue: 'You adjust to the animal rather than holding it still.', skillYears: 'months', prim: ['tool', 'inspect'] }),
        leaf('clip-pet-claws', 'Clip a pet claw', 'Restrain gently, position, cut with a hard consequence for error.', { cue: 'You stop short of the quick, and stop entirely if the animal will not settle.', precision: 4, contact: 5, ethics: 'restricted', prev: 'uncommon' }),
        leaf('recover-quicked-a-claw', 'Recover: cut into the quick', 'Stop the session, treat it, and do not attempt the remaining claws.', { fail: true }),
      ]),
    ]),
  ],
)
