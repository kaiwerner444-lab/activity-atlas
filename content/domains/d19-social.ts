import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// Consent here is not a form signed once. It is negotiated per action, read from
// micro-signals, and revocable at any moment: wait for a nod, a word or a reach
// before you close the gap; only after they accept the contact; stop at the
// first pull-away. Nothing else in the atlas has a stop condition that can be
// withdrawn halfway through by the thing you are working with.
//
// Doing less is the skill, further here than anywhere. Do not wipe their face
// unless they ask. Do not fill the line unless they asked. Bag items the way
// they asked, not the way that is fastest for you. Almost every failure in this
// domain is competent help delivered without permission.
//
// And body position is a message rather than a safety measure. Approach on an
// angle so they see you. Walk half a step off the shoulder, not behind. Crouch
// to a seated eye line. Point, then look back at their face. The pose is the
// communication.
//
// Capture note, which the source material spotted itself: a suit records a torso
// turn and cannot record an eye flick. Several leaves here are specified as
// torso movements for exactly that reason, and the gaze half of this domain
// needs an instrument the suit does not have.

export const d19: NodeSpec = node(
  'd19',
  'Social and assistive interaction',
  'Helping another person in public and at home: approach, handover, guiding, doors, seating, errands and the waiting in between.',
  {
    setting: 'household',
    dexterity: 4,
    precision: 3,
    contact: 4,
    horizon: 'short',
    repetition: 'one-shot',
    capital: 'cheap',
    partner: 'none',
    skillYears: 'none',
    suit: 'excellent',
    robotNow: 'no',
    embodiment: ['ego', 'suit', 'video'],
    saturation: 'empty',
    ours: 'none',
    rights: 'consent-heavy',
    ethics: 'open',
    prev: 'ubiquitous',
    prim: ['bimanual', 'language', 'grasp', 'locomote'],
  },
  [
    node('approach-distance', 'Approach, distance and orientation', 'Where you put your body before anything is said, which is most of the message.', { contact: 2, dexterity: 2, prim: ['locomote', 'language', 'inspect'], prev: 'ubiquitous' }, [
      node('approaching', 'Approach a person', 'Entering somebody’s space in a way they can see coming.', { horizon: 'short' }, [
        leaf('approach-on-an-angle-not-from-behind', 'Approach on an angle, within their view', 'Come toward somebody so they register you.', { cue: 'They have seen you before you reach arm’s length, and you have not come in from behind.' }),
        leaf('stop-outside-reach-and-wait-for-a-signal', 'Stop outside arm’s reach and wait', 'Hold at a distance until invited closer.', { cue: 'A nod, a word or a reach comes before you close the gap.', notes: 'The consent gate. It is granted per approach, not per relationship, and it can be withheld silently.' }),
        leaf('crouch-to-a-seated-eye-line', 'Crouch to a seated eye line', 'Bring your face level with somebody sitting.', { cue: 'Both feet are planted so you can rise without pushing off their chair.', contact: 3 }),
        leaf('recover-approached-from-behind', 'Recover: startled somebody by approaching unseen', 'Step back into their view and start the approach again rather than apologising from where you are.', { fail: true }),
      ]),
      node('orientation', 'Orient toward a person', 'Showing attention with the parts of you that can be seen.', { contact: 1, prim: ['language', 'inspect'] }, [
        leaf('turn-the-torso-toward-the-speaker', 'Turn your torso toward whoever is speaking', 'Show attention with a whole-body movement.', { cue: 'The turn is at the torso, not only a movement of the eyes.', notes: 'Specified as a torso act because that is what a suit can record. The eye-flick version of this behaviour needs an instrument we do not have, and pretending otherwise would put uncapturable data in the plan.' }),
        leaf('point-then-look-back-at-their-face', 'Point at the thing, then look back at them', 'Direct attention and return it.', { cue: 'Your attention comes back to their face after the point, rather than staying on the object.' }),
        leaf('nod-while-still-holding-what-they-gave-you', 'Acknowledge while still holding their object', 'Respond without dropping the thread.', { cue: 'You do not set the object down mid-acknowledgement unless they asked you to.' }),
        leaf('recover-attention-drifted-mid-sentence', 'Recover: attention drifted while they were speaking', 'Return your body to them and ask them to repeat rather than guessing.', { fail: true, prim: ['language'] }),
      ]),
    ]),

    node('handover', 'Giving, taking and letting go', 'The smallest unit of physical cooperation, where release timing is the whole skill.', { dexterity: 5, contact: 4, precision: 4, robotNow: 'partial', prev: 'ubiquitous' }, [
      node('offering', 'Offer and give', 'Presenting an object so it can be taken.', {}, [
        leaf('offer-an-open-palm-and-hold-it-still', 'Offer an open palm and hold it still', 'Present a hand for contact.', { cue: 'It stays still; it is not waved or wiggled at them.' }),
        leaf('give-handle-first-hold-until-grip', 'Give an object handle-first', 'Hand something over safely.', { cue: 'The handle meets their hand and you do not release until their grip is on it.', verify: 'Feel the weight transfer before letting go.' }),
        leaf('hand-a-pen-writing-end-away-keep-the-cap', 'Hand a pen writing-end away', 'Pass a writing implement.', { cue: 'The writing end is not in their palm and you keep the cap.' }),
        leaf('hand-a-cup-handle-out-stay-on-the-base', 'Hand a cup handle-out', 'Pass a full cup.', { cue: 'You stay on the base until they have the handle.' }),
        leaf('hand-change-into-the-palm', 'Hand change or a card into their palm', 'Complete a small handover.', { cue: 'It lands in their hand, not on a counter out of their reach.' }),
        leaf('recover-object-dropped-in-a-handover', 'Recover: object dropped between two people', 'Pick it up, show it, and offer it again rather than pressing it into their hand.', { fail: true }),
      ]),
      node('receiving', 'Take and return', 'Accepting something without dropping the interaction.', { dexterity: 5 }, [
        leaf('accept-into-two-hands-finish-the-take', 'Accept an object into two hands', 'Receive something offered.', { cue: 'The take is finished before you look away.' }),
        leaf('pick-up-show-and-return-to-the-same-hand', 'Pick a dropped item and return it', 'Retrieve for somebody.', { cue: 'You show it, then return it to the hand it came from.' }),
        leaf('hand-a-tissue-and-wait', 'Hand a tissue and wait', 'Offer without acting.', { cue: 'You wait; you do not wipe their face unless they ask.', notes: 'One of several leaves where the correct action is to stop after offering.' }),
        leaf('recover-help-given-that-was-not-wanted', 'Recover: helped without being asked', 'Stop, hand it back or undo it, and ask next time rather than explaining why you helped.', { fail: true, prim: ['language', 'recover'] }),
      ]),
      node('supported-hold', 'Steady without taking over', 'Contact calibrated to what they accept.', { contact: 5, ethics: 'restricted', dexterity: 5, robotNow: 'no' }, [
        leaf('support-a-shaking-cup-at-the-base', 'Support a shaking cup at the base', 'Steady a drink without taking it.', { cue: 'Only as much support as they accept, and they do the drinking.' }),
        leaf('steady-a-shaking-hand-after-acceptance', 'Steady a shaking hand once accepted', 'Provide contact support.', { cue: 'Contact begins only after acceptance and ends the moment they pull away.' }),
        leaf('steady-while-they-sign-without-steering', 'Steady a clipboard while they sign', 'Support a writing task.', { cue: 'You hold the surface; you never steer the pen.' }),
        leaf('hold-a-sample-cup-until-both-hands-are-on', 'Hold a cup until they have both hands on it', 'Transfer a container that must not spill.', { cue: 'Both their hands are on it before you release.' }),
        leaf('recover-contact-refused-mid-task', 'Recover: they pull away from contact mid-task', 'Let go immediately and wait rather than completing the movement.', { fail: true }),
      ]),
    ]),

    node('guiding', 'Walking together and guiding', 'Two people moving as one, with one of them setting the pace.', { contact: 4, dexterity: 3, prim: ['locomote', 'language', 'bimanual'], ethics: 'restricted', prev: 'ubiquitous' }, [
      node('walking-with', 'Walk alongside', 'Position, pace and the decision to stop.', {}, [
        leaf('guide-an-elbow-not-a-wrist', 'Guide at the elbow', 'Direct somebody by contact.', { cue: 'Contact is at the elbow, never a pulled wrist or sleeve.' }),
        leaf('walk-half-a-step-off-the-shoulder', 'Walk beside them, half a step off the shoulder', 'Position yourself while walking.', { cue: 'You are beside them and slightly back, never directly behind.' }),
        leaf('match-step-length-and-stop-when-they-stop', 'Match their step and stop when they stop', 'Let them set the pace.', { cue: 'You stop when they stop, even if the light is still green.', notes: 'The failure is a correct decision made at your tempo instead of theirs.' }),
        leaf('slow-when-they-speak', 'Slow down when they start speaking', 'Stay inside a conversation while moving.', { cue: 'You are not walking away from the end of their sentence.' }),
        leaf('turn-and-check-before-the-next-corner', 'Check they are still with you before turning', 'Keep a pair together.', { cue: 'You confirm they are following before you take the corner.' }),
        leaf('recover-outpaced-them-without-noticing', 'Recover: got ahead of them', 'Stop and let them arrive rather than walking back and hurrying them.', { fail: true }),
      ]),
      node('offered-support', 'Offer an arm and take a rail', 'Support that has to be accepted rather than applied.', { contact: 5 }, [
        leaf('offer-an-arm-on-ice-let-them-take-it', 'Offer an arm on a slippery surface', 'Provide support outdoors.', { cue: 'You offer and they take it; you do not take theirs.', setting: 'outdoor' }),
        leaf('hold-a-rail-together-not-instead', 'Hold a rail together', 'Share a support.', { cue: 'They have the rail and you, rather than only you.' }),
        leaf('bus-step-one-hand-on-the-rail', 'Help on or off a step with a rail', 'Assist at a vehicle step.', { cue: 'One of their hands is on the rail, and you take the other side only if they want it.' }),
        leaf('recover-grabbed-instead-of-offering', 'Recover: took their arm without being invited', 'Release, step back, and offer properly.', { fail: true }),
      ]),
      node('announcing', 'Announce before it happens', 'Speech time-locked to a movement.', { contact: 2, prim: ['language', 'locomote'], notes: 'The clearest multimodal case in the atlas: an utterance that must land before a specific physical event, and is useless afterwards.' }, [
        leaf('announce-a-step-up-before-the-foot-lifts', 'Announce a step up before their foot leaves the ground', 'Warn of a change in level.', { cue: 'The words land before the foot moves, not as it lands.' }),
        leaf('announce-a-step-down-and-let-them-feel-it', 'Announce a step down and pause', 'Warn of a drop.', { cue: 'They have the chance to feel for the edge before committing.' }),
        leaf('pause-at-a-threshold-so-they-see-the-step', 'Pause at a threshold', 'Stop at a change of surface.', { cue: 'They see the step before either foot leaves the ground.' }),
        leaf('announce-before-you-move-or-turn-a-chair', 'Announce before moving or turning a wheelchair', 'Tell somebody what their body is about to do.', { cue: 'The announcement comes before the movement starts, every time.', contact: 4 }),
        leaf('tell-them-where-you-put-it', 'Say where you have put something', 'Close the loop after moving an object.', { cue: 'They know where it is without having to look for it.' }),
        leaf('recover-moved-them-without-warning', 'Recover: moved them before announcing', 'Stop, apologise briefly, and restate before continuing.', { fail: true }),
      ]),
      node('mobility-aids', 'Hand over aids', 'Returning the equipment somebody depends on.', { dexterity: 4, contact: 4 }, [
        leaf('untangle-a-cane-tip-on-the-ground', 'Untangle a cane and hand it over', 'Return a walking stick.', { cue: 'It goes into their hand with the tip already on the ground.' }),
        leaf('set-a-walker-in-front-brakes-on', 'Retrieve a walker and set it with brakes on', 'Return a frame.', { cue: 'It is in front of them, brakes on, with the handles where their hands will land.' }),
        leaf('park-a-walker-where-hands-will-land', 'Park a walker within reach', 'Leave equipment usable.', { cue: 'The front is oriented so their hands find it without turning it round.' }),
        leaf('recover-aid-left-out-of-reach', 'Recover: aid parked where they cannot reach it', 'Bring it to them rather than telling them where it is.', { fail: true }),
      ]),
    ]),

    node('thresholds-doors', 'Doors, lifts and crowds', 'Shared infrastructure with other people moving through it.', { contact: 3, dexterity: 3, prim: ['locomote', 'inspect'], prev: 'ubiquitous' }, [
      node('doors', 'Doors and gates', 'Holding an opening without herding somebody through it.', {}, [
        leaf('hold-a-door-without-shepherding', 'Open a door and hold it', 'Let somebody through a doorway.', { cue: 'They walk through on their own line; there is no hand on their back.' }),
        leaf('close-only-once-cane-or-coat-is-clear', 'Close a door once everything is clear', 'Complete a passage.', { cue: 'Cane, walker and coat are all clear of the jamb before it moves.' }),
        leaf('block-a-closing-door-head-clear', 'Block a closing door with your back or foot', 'Stop a door safely.', { cue: 'Your head stays out of the door edge.' }),
        leaf('hold-a-lift-and-order-the-entry', 'Hold a lift and manage the order', 'Control a lift door.', { cue: 'They enter or exit in the order that keeps them off the closing door.' }),
        leaf('open-a-gate-through-its-full-arc', 'Open a gate through its full arc', 'Clear an outdoor opening.', { cue: 'It is held through the whole swing rather than partway.', setting: 'outdoor' }),
        leaf('close-the-gate-and-tug-it', 'Close a gate until it latches', 'Secure a gate.', { cue: 'It latches and a single tug confirms it.' }),
        leaf('recover-door-swung-back-onto-them', 'Recover: door came back onto them', 'Take the weight of it and check them before continuing through.', { fail: true }),
      ]),
      node('crowds', 'Crowds and flow', 'Making space in a moving stream of strangers.', { contact: 3, robotNow: 'no', saturation: 'empty' }, [
        leaf('stand-aside-and-keep-them-out-of-the-flow', 'Stand aside for a pass', 'Let traffic through.', { cue: 'They are out of the flow rather than being squeezed through it.' }),
        leaf('form-a-lane-with-your-body-then-drop-it', 'Form a lane with your body', 'Make room in a crowd.', { cue: 'The lane exists while they walk and is dropped as soon as they are through.', notes: 'A physical act of protection that has to end promptly, or it becomes confinement.' }),
        leaf('push-a-chair-in-a-crowd-announcing', 'Push a wheelchair in a crowd', 'Move somebody through people.', { cue: 'Every move and turn is announced before it happens.', contact: 4 }),
        leaf('back-through-a-door-hitting-the-door', 'Back a chair through a door', 'Reverse through an opening.', { cue: 'You hit the door, not them, and you check the threshold behind you.' }),
        leaf('guard-a-wet-floor-without-dragging-them', 'Guard past a wet floor', 'Cross a hazard together.', { cue: 'You stop and wait rather than steering them around the cone.' }),
        leaf('recover-caught-in-a-closing-crowd', 'Recover: caught in a crowd that closed', 'Stop and hold position rather than pushing through with them.', { fail: true }),
      ]),
    ]),

    node('seating-vehicles', 'Chairs, tables and vehicles', 'Sitting down and getting in, which is where most falls happen.', { contact: 5, dexterity: 3, ethics: 'restricted', skillYears: 'none', prev: 'ubiquitous' }, [
      node('seating', 'Chairs and seats', 'Getting somebody safely onto a surface.', {}, [
        leaf('sit-beside-with-a-gap', 'Sit beside them with a gap', 'Choose where to sit.', { cue: 'A gap is left; opposite-close only if they chose that seat.', contact: 2 }),
        leaf('guide-to-a-chair-back-so-they-feel-it', 'Guide to a chair so they feel it with their legs', 'Approach a seat.', { cue: 'The back of their legs touches the chair before they begin to sit.' }),
        leaf('pull-a-chair-out-and-stop-it-rolling', 'Pull a chair out and hold it still', 'Present a chair.', { cue: 'It cannot roll or slide as they sit.' }),
        leaf('scoot-a-chair-only-as-far-as-asked', 'Scoot a chair in only as far as they ask', 'Adjust a seated position.', { cue: 'Their legs are not trapped.' }),
        leaf('bring-a-chair-nearer-and-stop-it', 'Bring a chair nearer and set it', 'Fetch a seat.', { cue: 'It is stopped and stable before they move toward it.' }),
        leaf('offer-a-seat-with-a-gesture-not-a-hand', 'Offer a seat by gesture', 'Indicate a chair.', { cue: 'A gesture at the chair, not a hand on their shoulder.', contact: 1 }),
        leaf('help-stand-at-the-elbows-or-a-belt', 'Help stand from a public chair', 'Assist rising in public.', { cue: 'At the elbows or a belt, never a pull from under the arms.' }),
        leaf('recover-chair-moved-as-they-sat', 'Recover: chair shifted as they sat', 'Steady them first, then reset the chair.', { fail: true }),
      ]),
      node('vehicles', 'Cars and vehicle seats', 'A low seat inside a frame you can hit your head on.', { contact: 5, dexterity: 4, setting: 'vehicle' }, [
        leaf('into-a-car-bottom-first-head-clear', 'Help into a car, bottom first', 'Get somebody into a vehicle seat.', { cue: 'Bottom on the seat, then legs, with their head clear of the frame throughout.' }),
        leaf('swing-legs-in-and-pause-to-adjust', 'Swing the legs in and pause', 'Complete a vehicle entry.', { cue: 'They have a moment to adjust before anything is closed.' }),
        leaf('buckle-lap-on-hips-shoulder-off-the-neck', 'Buckle a seatbelt correctly', 'Fasten somebody else’s belt.', { cue: 'Lap belt on the hips and shoulder belt on the chest, not the neck.' }),
        leaf('unbuckle-and-hold-the-belt', 'Unbuckle and control the belt', 'Release a belt.', { cue: 'The belt is held so it cannot slam the door frame or their face.' }),
        leaf('exam-table-step-sit-swing', 'Help onto an exam table', 'Get somebody onto a raised surface.', { cue: 'Step, sit, swing the legs, with their head clear of the corner.', setting: 'clinical' }),
        leaf('off-the-table-legs-then-stand-then-step', 'Help off an exam table', 'Come down from a raised surface.', { cue: 'Legs first, then standing, then the step down.', setting: 'clinical' }),
        leaf('recover-head-contact-with-a-door-frame', 'Recover: head contacted the frame', 'Stop, check them, and reposition before continuing the entry.', { fail: true }),
      ]),
    ]),

    node('personal-assist', 'Clothing, food and personal help in public', 'Intimate help in a place other people can see.', { contact: 5, dexterity: 5, ethics: 'restricted', rights: 'consent-heavy', robotNow: 'no', saturation: 'empty', prev: 'common' }, [
      node('outerwear', 'Coats, gloves and scarves', 'Garments put on somebody else, in a doorway.', { precision: 4 }, [
        leaf('fit-a-jacket-one-sleeve-then-pause', 'Fit a jacket one sleeve at a time', 'Help into outerwear.', { cue: 'You pause after the first sleeve so they can find the second.' }),
        leaf('settle-the-collar-without-turning-their-head', 'Fit the second sleeve and settle the collar', 'Complete a coat.', { cue: 'The collar is settled without turning their head for them.' }),
        leaf('start-a-zip-let-them-finish', 'Start a zip and let them finish', 'Assist a fastening partially.', { cue: 'If you do finish it, you stop before skin or a scarf is caught.' }),
        leaf('fit-a-hat-clear-of-eyes-and-ears', 'Fit a hat', 'Put on headwear.', { cue: 'It does not cover their eyes and they can still hear.' }),
        leaf('fit-gloves-one-finger-at-a-time', 'Fit gloves one finger at a time', 'Put gloves on somebody.', { cue: 'No thumb is jammed into the wrong finger.' }),
        leaf('remove-gloves-without-yanking', 'Remove gloves without yanking', 'Take gloves off somebody.', { cue: 'No thumb or ring is pulled.' }),
        leaf('fit-a-scarf-that-is-not-a-loop', 'Fit a scarf safely', 'Put on a scarf.', { cue: 'It is not left as a loop that could catch a handle or a wheel.' }),
        leaf('take-a-coat-only-if-offered', 'Take a coat if it is offered', 'Receive outerwear.', { cue: 'You take it if offered; you do not pull it off their shoulders.' }),
        leaf('hang-a-coat-where-they-can-see-it', 'Hang a coat and say where it is', 'Store somebody’s belongings.', { cue: 'It is visible to them and you tell them where it is.' }),
        leaf('recover-caught-a-finger-or-a-ring', 'Recover: caught a finger, ring or hair', 'Release it slowly and check before continuing.', { fail: true }),
      ]),
      node('eating-out', 'Food and drink in public', 'Assistance at a table where other people are present.', { dexterity: 5, contact: 4 }, [
        leaf('set-a-napkin-only-if-wanted', 'Set a napkin or bib only if wanted', 'Offer a table covering.', { cue: 'Only if they want it, and never as a tight loop at the neck.' }),
        leaf('cut-food-only-if-asked-return-the-fork', 'Cut food only if asked', 'Prepare a plate in public.', { cue: 'You cut only on request and put the fork back in their hand.' }),
        leaf('wipe-assist-stop-at-the-first-pull-away', 'Wipe-assist only if accepted', 'Help with cleaning up.', { cue: 'You stop at the first pull-away.' }),
        leaf('point-at-a-menu-item-and-wait', 'Point at a menu item and wait', 'Help with a choice.', { cue: 'You wait; you do not tap the page as if they were slow.' }),
        leaf('recover-assumed-they-wanted-help-eating', 'Recover: cut their food without being asked', 'Stop, return control of the plate, and ask first next time.', { fail: true }),
      ]),
      node('restroom-and-sink', 'Restrooms and washing', 'The line between helping and intruding.', { contact: 4, ethics: 'restricted' }, [
        leaf('guide-to-the-door-and-stop', 'Guide to a restroom door and stop', 'Take somebody to a private space.', { cue: 'You stop at the door; you do not push it open on them.' }),
        leaf('wait-without-pacing-the-door', 'Wait outside without pacing', 'Wait for somebody.', { cue: 'You are not pacing or checking the door every few seconds.', notes: 'Doing nothing, correctly, for a duration. Visible impatience is the failure.' }),
        leaf('help-at-a-sink-without-washing-for-them', 'Help at a sink so they can reach', 'Assist at a basin.', { cue: 'They can reach the tap; you do not wash their hands unless asked.' }),
        leaf('hand-a-towel-and-take-the-waste', 'Hand a towel and take the waste', 'Complete a wash.', { cue: 'You take the waste only if they offer it.' }),
        leaf('guide-back-and-let-them-sit-first', 'Guide back to their seat', 'Return somebody to where they were.', { cue: 'They are seated before you step away.' }),
        leaf('recover-opened-a-door-they-were-behind', 'Recover: opened a door on somebody', 'Close it immediately and wait rather than explaining through the gap.', { fail: true }),
      ]),
    ]),

    node('errands-together', 'Shopping, forms and errands', 'Doing a task with somebody rather than for them.', { contact: 4, dexterity: 4, setting: 'commercial', rights: 'consent-heavy', robotNow: 'no', saturation: 'empty', prev: 'common' }, [
      node('shopping', 'Shop together', 'Where the fastest way is usually the wrong way.', { prim: ['grasp', 'language', 'locomote'] }, [
        leaf('hand-over-the-cart-handle-and-hold-on', 'Transfer a cart handle into their hands', 'Give somebody control of a trolley.', { cue: 'You keep a hand on the cart until they have it.' }),
        leaf('steer-a-cart-together-taking-the-turns', 'Steer a cart together', 'Share control of a trolley.', { cue: 'You take the weight on turns and they keep a hand on the handle.' }),
        leaf('reach-a-high-shelf-and-show-them', 'Reach a high shelf and show the item', 'Retrieve from above their reach.', { cue: 'They see it, then it goes into their hand or the cart.' }),
        leaf('kneel-to-a-low-shelf-same-handoff', 'Kneel to a low shelf', 'Retrieve from below their reach.', { cue: 'A hip hinge, and the same handoff as the high shelf.' }),
        leaf('read-a-label-together', 'Read a label together', 'Share information on a pack.', { cue: 'The pack is angled so they can see it too, not turned only toward you.' }),
        leaf('place-an-item-so-they-can-lift-it-out', 'Place an item in the cart within their reach', 'Load a trolley.', { cue: 'They can still lift it out themselves.' }),
        leaf('unload-a-belt-heavy-first-cart-held', 'Unload a belt in their preferred order', 'Empty a trolley at a till.', { cue: 'Heavy first if they want to bag, with the cart held so it cannot roll.' }),
        leaf('bag-the-way-they-asked', 'Bag items the way they asked', 'Pack shopping.', { cue: 'Their order, not the fastest one.', notes: 'The thesis of the whole domain in one line: efficiency is not the objective, and substituting it is the most common failure.' }),
        leaf('load-a-trunk-hand-on-the-lid', 'Load a trunk with a hand on the lid', 'Load a vehicle.', { cue: 'The lid cannot drop while anyone is under it.', setting: 'vehicle' }),
        leaf('close-a-trunk-together-hands-clear', 'Close a trunk together', 'Finish loading.', { cue: 'Both people’s hands are clear before it comes down.' }),
        leaf('recover-bagged-it-your-own-way', 'Recover: packed it your way instead of theirs', 'Repack it as asked rather than explaining why yours is better.', { fail: true }),
      ]),
      node('forms-and-counters', 'Forms, counters and paperwork', 'Helping with a document without filling it in.', { dexterity: 5, precision: 4, contact: 2 }, [
        leaf('pass-a-clipboard-and-keep-the-pen-on', 'Pass a clipboard with the pen secure', 'Hand over paperwork.', { cue: 'The pen does not fall off the clip in transit.' }),
        leaf('point-on-a-form-and-wait', 'Point at a line on a form and wait', 'Direct attention on a document.', { cue: 'You wait; you do not fill the line unless they asked.' }),
        leaf('return-the-pen-and-leave-the-form-visible', 'Return the pen and set the form down', 'Finish with paperwork.', { cue: 'The pen goes back in the cup and the form is left where they can still see it.' }),
        leaf('set-a-bag-so-they-can-see-into-it', 'Set a bag on a counter openable', 'Present a bag.', { cue: 'They can see into it without bending.' }),
        leaf('recover-filled-in-a-form-for-them', 'Recover: completed a form they were doing', 'Stop and hand it back rather than finishing it neatly.', { fail: true }),
      ]),
    ]),

    node('teach-demonstrate', 'Teaching and demonstration', 'Talk while doing, which is the multimodal case the whole atlas keeps pointing at.', { contact: 3, dexterity: 4, prim: ['language', 'inspect', 'bimanual'], robotNow: 'no', saturation: 'empty', skillYears: 'months', rights: 'consent-heavy', prev: 'common', notes: 'Kept from the earlier seed rather than replaced. Instruction delivered inside a physical task is the single cheapest way to get aligned language and motion, and almost nobody records it.' }, [
      node('demonstrate', 'Demonstrate and narrate a task', 'Doing it slowly and saying what you are doing.', { horizon: 'medium' }, [
        leaf('narrate-while-doing', 'Narrate a task while performing it', 'Speak the intent, the cue and the check for each step as you do it.', { cue: 'Every step has its intent, its cue and its check spoken while the hands are on the work.', notes: 'The highest-value cheap capture in the atlas: the same motion, plus aligned language, for the cost of asking somebody to talk.' }),
        leaf('correct-a-learner', 'Watch and correct a learner', 'Detect the error, name it, and show the fix.', { cue: 'The error is named before the fix is shown, so they know what they are correcting.', prim: ['inspect', 'language'], contact: 2 }),
        leaf('answer-mid-task-question', 'Answer a question mid-task', 'Interrupt, explain, and resume without losing the thread.', { cue: 'You return to the same point in the task rather than restarting it.', prim: ['language'], contact: 2 }),
        leaf('guide-a-hand-hand-over-hand', 'Guide a learner hand over hand', 'Apply just enough force to steer without taking over.', { cue: 'They are still driving the movement; you are only correcting its direction.', contact: 5, ethics: 'restricted' }),
        leaf('recover-took-over-instead-of-teaching', 'Recover: finished the task instead of teaching it', 'Undo enough that they can complete it themselves rather than moving on.', { fail: true }),
      ]),
    ]),

    node('path-and-waiting', 'Clearing the path, waiting and leaving', 'The parts with no interaction in them, which are still the job.', { contact: 3, dexterity: 3, prev: 'ubiquitous' }, [
      node('clearing', 'Clear the route', 'Removing hazards without creating new ones.', { prim: ['grasp', 'locomote', 'inspect'] }, [
        leaf('move-an-obstacle-somewhere-safe', 'Move an obstacle out of the path', 'Clear a route.', { cue: 'It goes somewhere that will not become a new trip hazard.' }),
        leaf('coil-a-loose-cable-off-the-floor', 'Coil a loose cable clear of the floor', 'Remove a trailing lead.', { cue: 'No cane tip or wheel can catch it.' }),
        leaf('pick-a-trip-hazard-show-it-and-park-it', 'Pick up a trip hazard and park it', 'Remove something from a walking line.', { cue: 'You show them you have it, then park it out of the route.' }),
        leaf('two-person-carry-a-chair-out-of-the-path', 'Two-person carry a chair clear of the path', 'Move furniture with a partner.', { cue: 'Same height, set it down, then invite them through.', prim: ['bimanual', 'language'], contact: 5 }),
        leaf('recover-created-a-new-hazard', 'Recover: the thing you moved became a new hazard', 'Move it again properly rather than warning them about it.', { fail: true }),
      ]),
      node('pets', 'Animals alongside', 'A second unpredictable body in the pair.', { contact: 4, setting: 'outdoor', prev: 'common' }, [
        leaf('walk-a-dog-on-the-extra-lead', 'Take the dog so they keep a hand free', 'Manage a pet while walking with somebody.', { cue: 'They still have a rail or a cane hand, and the dog cannot pull them.' }),
        leaf('pick-up-after-a-pet-with-a-hinge', 'Pick up after a pet', 'Deal with waste on a walk.', { cue: 'A hip hinge, binned, and the bag never goes on their walker.' }),
        leaf('recover-dog-pulled-toward-them', 'Recover: the dog pulled toward them', 'Take up the lead and step the dog away before continuing.', { fail: true }),
      ]),
      node('waiting-and-leaving', 'Wait, watch and leave', 'Ending an interaction without abandoning it.', { contact: 1, horizon: 'short', prim: ['inspect', 'language'], robotNow: 'no', saturation: 'empty' }, [
        leaf('greet-at-a-door-and-step-aside', 'Greet at a door and step aside', 'Receive somebody arriving.', { cue: 'They enter on their own line rather than around you.' }),
        leaf('leave-only-once-they-have-their-own-support', 'Leave them only once they have a rail or a cane', 'Hand responsibility back at the end of a walk or a visit.', { cue: 'Their hand is on their own support before yours comes off.' }),
        leaf('watch-until-they-are-in-or-seated', 'Watch until they are inside or seated', 'Complete a handover of responsibility.', { cue: 'You do not turn away on the first step.' }),
        leaf('ready-stance-near-not-crowding', 'Take a ready stance nearby', 'Be available without hovering.', { cue: 'Both hands free, path clear, and you can still see their face without standing over them.' }),
        leaf('recover-left-before-they-were-settled', 'Recover: turned away too early', 'Go back and stay rather than watching from a distance.', { fail: true }),
      ]),
    ]),
  ],
)
