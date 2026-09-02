import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// The domain with the most public data and the least useful public data.
//
// Open X-Embodiment and every bench-manipulation set in the field are here: pick
// a thing, move it, put it down. That is why `subassembly` sits at `heavy`
// saturation and scores near the floor. It is genuinely solved and it is
// genuinely uninteresting.
//
// Everything else in this file is the opposite, and the reason is a single
// recurring pattern: almost every stop condition in mechanical assembly is a
// force or a hard stop, and the motion up to that stop looks identical whether
// you overshoot it or not. Stop on the click. Stop at the gauge line. Stop at
// flush, because past-flush is a new problem. Stop when the flange seats. Stop
// when clean grease shows. Drive a roll pin one thousandth too far and the video
// is the same video.
//
// The second pattern is ordering. Start by fingers before the gun. Support the
// cover before it rests on the seal. Remove the pry bar before torque. Capture
// the spring with the cover before you let go. Line the holes with a drift, then
// swap the drift for the bolt while they are still lined up. Every one of those
// is a sequence whose wrong version reaches the same end state and fails later.
//
// Three node ids carry coverage events and are preserved across rebuilds:
// kitting.pick-to-kit-tray holds the 260 public OXE hours, and the two bench
// pilot holdings sit on fastening.start-thread and fastening.torque.

export const d10: NodeSpec = node(
  'd10',
  'Mechanical assembly',
  'Present, mate, retain, fasten, route, adjust and close out. Done means it is seated, on the mark, or stopped on the click.',
  {
    setting: 'industrial',
    dexterity: 4,
    precision: 4,
    contact: 5,
    horizon: 'medium',
    repetition: 'batched',
    capital: 'mid',
    partner: 'none',
    skillYears: 'months',
    suit: 'excellent',
    robotNow: 'partial',
    embodiment: ['ego', 'suit', 'video', 'umi'],
    saturation: 'thin',
    ours: 'none',
    rights: 'easy',
    ethics: 'open',
    prev: 'common',
    prim: ['insert', 'fasten', 'tool', 'bimanual'],
  },
  [
    node('subassembly', 'Subassembly and kitting', 'The flow work around the assembly itself, and the part of this domain the field has already solved.', { dexterity: 3, precision: 2, contact: 3, skillYears: 'none', robotNow: 'yes', saturation: 'heavy', prev: 'ubiquitous' }, [
      node('kitting', 'Kit and present parts', 'Getting the right parts to the bench in the right order.', { repetition: 'high-takt' }, [
        leaf('pick-to-kit-tray', 'Pick parts into a kit tray', 'Read the list, pick from bins, place in tray cells, confirm.', { cue: 'Every cell is filled and the list is fully ticked.', saturation: 'heavy', robotNow: 'yes', notes: 'Holds the 260 public OXE hours. This is the shape of nearly all existing manipulation data and it is the least valuable node in the domain.' }),
        leaf('deburr-and-clean-part', 'Deburr and clean an incoming part', 'Inspect edges, deburr, wipe, present ready for assembly.', { cue: 'No edge catches a fingernail and no swarf remains in the bore.', prim: ['inspect', 'tool', 'transfer'], contact: 4 }),
        leaf('recover-wrong-part-in-kit', 'Recover: wrong part number in the kit', 'Notice at fit-up, stop, source the correct part, log the miskit.', { fail: true, saturation: 'empty', prim: ['inspect', 'language', 'recover'] }),
        leaf('recover-dropped-fastener', 'Recover: fastener dropped into the assembly', 'Retrieve a dropped washer or bolt with a magnet or scope, and inspect the thread and face before it is refitted.', { fail: true, dexterity: 5, contact: 4, tool: ['magnetic wand'], saturation: 'empty' }),
      ]),
      node('build-sequence', 'Follow and teach a build sequence', 'Following, departing from, and passing on a documented sequence.', { horizon: 'long', prev: 'common' }, [
        leaf('follow-work-instruction', 'Follow an illustrated work instruction', 'Read a step, act, confirm, advance, with the screen at the bench.', { prim: ['language', 'inspect'], saturation: 'thin' }),
        leaf('build-from-drawing', 'Build a subassembly from a drawing only', 'Infer the sequence from a 2D drawing without a written procedure.', { skillYears: 'years', robotNow: 'no', saturation: 'empty' }),
        leaf('train-a-colleague', 'Show a colleague how to do the step', 'Demonstrate, narrate, correct their hands, hand the tool over.', { prim: ['language', 'bimanual'], saturation: 'empty', notes: 'Instruction-while-doing is exactly the multimodal data a VLA wants and nobody records.' }),
        leaf('recover-a-step-done-out-of-order', 'Recover: a step was done out of order', 'Back out to the missed step rather than carrying on and correcting at the end.', { fail: true, saturation: 'empty' }),
      ]),
    ]),

    node('fixture', 'Fixture, presentation and transfer', 'Getting the part onto the bench square, and off it intact.', { dexterity: 3, contact: 5, precision: 4, saturation: 'empty', prev: 'common' }, [
      node('load', 'Load onto the fixture', 'Datum, pins and hard stops.', { prim: ['transfer', 'bimanual'] }, [
        leaf('lower-a-casting-onto-pins-until-flush', 'Lift a base casting onto the fixture pins', 'Load a heavy part.', { cue: 'It drops flush and cannot rock.', verify: 'You push a corner before you let go.' }),
        leaf('clock-to-the-key-and-push-to-the-stop', 'Clock a housing to the fixture key', 'Orient a part in a fixture.', { cue: 'Against the hard stop before any fastener starts.' }),
        leaf('flip-with-the-datum-off-the-bench', 'Flip a part 180 degrees and reseat it', 'Turn a part over between operations.', { cue: 'Two hands, the datum face never touches the bench, and it goes back on the pins.', contact: 5, notes: 'A datum face set down on swarf is a scrapped part with no visible cause.' }),
        leaf('slide-a-subplate-until-the-pins-show', 'Slide a subplate onto both dowels', 'Locate a plate on dowels.', { cue: 'Both pins show through and the plate sits flat.' }),
        leaf('recover-a-part-that-rocks-on-the-pins', 'Recover: the part rocks on the pins', 'Lift it off and clear the pad rather than clamping the rock out.', { fail: true, notes: 'Clamping it flat hides a chip under the datum and passes every check.' }),
      ]),
      node('transfer-out', 'Transfer the finished unit', 'Off the fixture without undoing the work.', { contact: 5, horizon: 'short' }, [
        leaf('lift-off-the-pins-as-one-piece', 'Lift the completed unit off the pins', 'Unload a finished assembly.', { cue: 'As one piece, and it stays clear of the pins until it is over the nest.' }),
        leaf('land-on-dunnage-without-shocking-a-shaft', 'Transfer the assembly onto a dunnage nest', 'Set a finished unit down.', { cue: 'No shaft or seal takes a shock on landing.', prim: ['bimanual'] }),
        leaf('strap-a-unit-so-it-cannot-walk', 'Strap the unit to the nest', 'Secure a unit for movement.', { cue: 'It cannot walk when the nest is moved.' }),
        leaf('recover-a-unit-set-down-on-a-shaft', 'Recover: the unit was set down on a shaft end', 'Lift it, check run-out before it ships rather than assuming it survived.', { fail: true }),
      ]),
    ]),

    node('bores', 'Bores, bushings and presses', 'Interference fits, where the stop is a shoulder you cannot see.', { precision: 5, contact: 5, dexterity: 4, capital: 'mid', saturation: 'thin', prev: 'common' }, [
      node('by-hand', 'Start it by hand', 'Everything that happens before the press.', { dexterity: 5 }, [
        leaf('feel-the-step-and-dress-the-burr', 'Drop a bushing into the bore and feel the step', 'Offer a bushing to a bore.', { cue: 'It reaches the step.', verify: 'If it hangs on a burr you stop and dress the bore rather than pressing through it.', notes: 'Pressing past a burr galls the bore. The press does not know and the part looks assembled.' }),
        leaf('start-a-bearing-square-to-the-first-land', 'Start a bearing onto the shaft by hand', 'Begin a bearing fit.', { cue: 'Square and to the first land, before any press touches it.' }),
        leaf('recover-a-bearing-started-cocked', 'Recover: a bearing started cocked on the shaft', 'Back it off and restart square; a cocked start is never corrected by the press.', { fail: true }),
      ]),
      node('pressing', 'Press to the shoulder', 'Ram travel with a stop condition at the end of it.', { contact: 5, precision: 5 }, [
        leaf('press-a-bushing-to-the-flange', 'Press a bushing to the shoulder', 'Seat a bushing under load.', { cue: 'Even ram travel, stopping when the flange seats.' }),
        leaf('press-a-pulley-to-the-gauge-line', 'Press a pulley onto a taper', 'Seat a taper fit.', { cue: 'Stop at the gauge line; buried past the line it cannot be recovered.' }),
        leaf('press-a-ball-joint-until-the-groove-shows', 'Press a ball joint and fit the clip', 'Seat a ball joint.', { cue: 'The clip groove shows all the way round before the clip goes on.' }),
        leaf('recover-a-bearing-that-stopped-short', 'Recover: a bearing stopped short of the shoulder', 'Unseat it and repress rather than running the machine on a partial fit.', { fail: true }),
      ]),
    ]),

    node('seals', 'Seals, gaskets and sealant', 'Soft parts that only work if they are still where you put them.', { dexterity: 5, precision: 5, contact: 4, saturation: 'thin', prev: 'common' }, [
      node('elastomer', 'O-rings, lips and boots', 'Rubber, which rolls.', { dexterity: 5 }, [
        leaf('seat-an-o-ring-without-roll-twist', 'Install an O-ring without roll-twist', 'Fit an O-ring to a groove.', { cue: 'Seated all the way round with no twist along its length.', notes: 'A twisted O-ring seals on the bench and leaks in service. It is invisible once the cover is on.' }),
        leaf('start-a-seal-lip-over-a-chamfer', 'Lube a seal lip and start it over a chamfer', 'Fit a shaft seal.', { cue: 'The lip rides the chamfer.', verify: 'If it lips under you pull it and start again; a folded lip is never worked back out.' }),
        leaf('clamp-a-boot-on-the-groove', 'Fold a dust boot and clamp the small end', 'Fit a flexible boot.', { cue: 'The clamp lands on the groove, not on the taper next to it.' }),
        leaf('recover-a-pinched-o-ring', 'Recover: an O-ring was pinched', 'Pull it, clean the groove and seat a new one; a pinched ring is never reused.', { fail: true }),
      ]),
      node('gaskets', 'Gaskets and covers', 'Flat seals and the covers that land on them.', { precision: 4, contact: 4 }, [
        leaf('press-a-gasket-into-the-pocket', 'Square a gasket to the groove', 'Fit a gasket before closing.', { cue: 'Pressed into the pocket so it cannot roll out when the cover comes down.' }),
        leaf('mate-a-cover-on-dowels-watching-the-seal', 'Mate a cover to the case on two dowels', 'Close a gasketed joint.', { cue: 'Down on both dowels with the seal watched the whole way so nothing pinches.', prim: ['bimanual', 'inspect'] }),
        leaf('route-a-foam-gasket-without-stretching', 'Route a foam gasket around a corner', 'Lay a compressible gasket.', { cue: 'The cut does not stretch past the mark, because a stretched foam gasket shrinks back and opens the corner.' }),
        leaf('recover-a-cover-that-trapped-a-harness', 'Recover: a cover trapped a harness', 'Lift it, free the harness and reseat on the dowels.', { fail: true }),
      ]),
      node('sealant', 'Applied sealant', 'A bead with a clock on it.', { horizon: 'short', precision: 4 }, [
        leaf('close-the-joint-before-the-bead-skins', 'Apply a measured bead and close the joint', 'Seal a joint with applied compound.', { cue: 'The joint closes before the bead skins.', notes: 'A working time you cannot see, on a material that looks the same either side of it.' }),
        leaf('wipe-squeeze-out-off-the-faces-you-need', 'Wipe squeeze-out', 'Clean up after closing a sealed joint.', { cue: 'None of it is smeared into a bolt hole or onto a sealing face you have not used yet.' }),
        leaf('clean-a-face-before-you-relay-a-bead', 'Clean a face and relay the bead', 'Redo a sealed joint.', { cue: 'Back to clean metal; a new bead never goes on top of an old one.', fail: true }),
      ]),
    ]),

    node('retainers', 'Pins, rings, keys and staking', 'Small parts whose whole job is to not come back out.', { dexterity: 5, precision: 5, contact: 5, saturation: 'thin', prev: 'common' }, [
      node('pins', 'Pins and drifts', 'Driven fits.', { contact: 5 }, [
        leaf('start-a-pin-square-before-you-tap', 'Start a pin in a blind hole square', 'Begin a driven pin.', { cue: 'It has caught before any hammer touches it.' }),
        leaf('drive-a-roll-pin-to-flush-and-stop', 'Drive a roll pin to flush', 'Seat a roll pin.', { cue: 'Flush, then stop. Past-flush is a new problem, not a tighter fit.', notes: 'The classic irreversible overshoot. One extra tap and the part goes in the bin.' }),
        leaf('peen-a-pin-off-the-working-face', 'Peen a pin so it cannot walk', 'Deform a pin to retain it.', { cue: 'The peen lands away from any working face.' }),
        leaf('stake-a-rivet-to-the-shop-head-height', 'Stake a rivet and form the shop head', 'Set a solid rivet.', { cue: 'The shop head reaches the specified height, measured rather than judged.' }),
        leaf('recover-a-roll-pin-driven-past-flush', 'Recover: a roll pin went past flush', 'Drive it through and fit a new one; there is no pulling it back.', { fail: true }),
      ]),
      node('rings', 'Snap rings and circlips', 'Spring steel that takes a set.', { dexterity: 5 }, [
        leaf('seat-a-snap-ring-full-round', 'Seat a snap ring in its groove', 'Fit a retaining ring.', { cue: 'It springs full-round in the groove.', verify: 'It will not turn out with a fingernail.' }),
        leaf('expand-a-ring-and-release-it-into-the-cut', 'Expand a snap ring and release it', 'Fit a ring over a shaft.', { cue: 'It drops into the cut.', verify: 'If it does not sit, that ring is binned and a new one used.', notes: 'An over-expanded ring has taken a permanent set. Reusing it is the tempting, wrong, undetectable move.' }),
        leaf('recover-a-rolled-snap-ring', 'Recover: a snap ring rolled in the groove', 'Extract it, bin it and fit a new one.', { fail: true }),
      ]),
      node('keys-and-splines', 'Keys, splines and staking', 'Torque paths that depend on a small part sitting right.', { precision: 5 }, [
        leaf('tap-a-woodruff-key-not-proud', 'Start a woodruff key and tap it home', 'Fit a half-moon key.', { cue: 'The keyway is filled and the key is not proud of the shaft diameter.' }),
        leaf('insert-a-spline-to-the-witness-hole', 'Insert a spline to the witness hole', 'Engage a splined joint.', { cue: 'The witness hole lines up and the faces sit.', verify: 'You look through the hole rather than judging it by depth.' }),
        leaf('stake-a-nut-into-the-metal', 'Stake a nut at the specified scallop', 'Lock a nut by deformation.', { cue: 'The stake goes into metal, not into the air beside the scallop.', notes: 'A stake that missed looks like a stake from every angle except straight on.' }),
        leaf('bend-a-cotter-pin-to-shape', 'Fit a cotter pin and bend both legs', 'Fit a split pin.', { cue: 'Both legs bent to the specified shape.', verify: 'It cannot walk out when you pull on it.' }),
        leaf('recover-a-key-standing-proud', 'Recover: a key stands proud of the diameter', 'Remove it and fit the correct key rather than dressing it down to fit.', { fail: true }),
      ]),
    ]),

    node('shafts', 'Shafts, gears and timing', 'Parts that have to agree with each other about where they are.', { precision: 5, contact: 5, dexterity: 4, skillYears: 'years', saturation: 'empty', prev: 'common' }, [
      node('assembly', 'Get the shaft in', 'Long parts through blind features.', { contact: 5, prim: ['bimanual'] }, [
        leaf('catch-the-far-bushing-before-you-let-go', 'Offer a shaft through a wall', 'Install a shaft through a housing.', { cue: 'The far bushing is caught before the shaft is released, so it never hangs on one bearing.' }),
        leaf('stack-a-shim-pack-in-order', 'Stack a shim pack to the measured height', 'Build a shim stack.', { cue: 'To the height you measured, and the pack stays in order.', precision: 5 }),
        leaf('slide-a-coupling-hub-to-the-depth-line', 'Align a coupling hub to the shaft mark', 'Position a hub.', { cue: 'At the depth line before anything is tightened.' }),
        leaf('recover-a-shaft-hanging-on-one-bearing', 'Recover: the shaft hung on one bearing', 'Support it and re-enter the far bushing before anything is tightened.', { fail: true }),
      ]),
      node('timing', 'Timing and mesh', 'Two marks that have to meet.', { precision: 5, skillYears: 'years' }, [
        leaf('mesh-to-the-paint-mark-holding-backlash', 'Mesh two gears to the paint mark', 'Set a gear mesh.', { cue: 'Backlash is held while the first fastener snugs.', prim: ['bimanual'] }),
        leaf('clock-a-cam-to-tdc-on-two-pulleys', 'Clock a cam to TDC marks', 'Time a valve train.', { cue: 'Both marks aligned at once and the clamp pinched before anything else rotates.', notes: 'The two-marks-at-once constraint is why this is bimanual and why a single-arm demonstration of it is meaningless.' }),
        leaf('time-a-sprocket-to-the-chain-mark', 'Time a sprocket to a chain mark', 'Set chain timing.', { cue: 'On the mark, then pinched.' }),
        leaf('recover-a-timing-mark-that-moved', 'Recover: a timing mark slipped before the clamp', 'Back off and re-time from the marks rather than correcting at the adjuster.', { fail: true }),
      ]),
      node('clearance', 'Clearance and run-out', 'Setting the space between two things.', { precision: 5, contact: 4 }, [
        leaf('set-end-play-with-a-dial-then-lock', 'Set end-play with a dial indicator', 'Adjust axial clearance.', { cue: 'Inside the window, then the bearing nut locks.' }),
        leaf('centre-a-coupling-gap-all-around', 'Centre a coupling gap to a feeler', 'Set a coupling gap.', { cue: 'Equal all the way round, checked at four points rather than one.' }),
        leaf('hand-spin-and-stop-if-it-rubs', 'Hand-spin the finished shaft', 'Final check on a rotating assembly.', { cue: 'You feel for rub through a full turn and stop if it rubs.', verify: 'Then tools down, guard on, both hands clear.', notes: 'The last honest check before power. A rub found here is a fix; found after power it is a rebuild.' }),
        leaf('recover-a-rub-found-on-the-hand-spin', 'Recover: it rubs on the hand-spin', 'Strip back to find it rather than running it in under power.', { fail: true, notes: 'Running a rub in is the fastest way to turn a ten-minute fix into a rebuild.' }),
      ]),
    ]),

    node('fastening', 'Threaded fastening and torque', 'The most repeated act in the domain, and the one with the narrowest stop condition.', { precision: 5, contact: 5, dexterity: 4, repetition: 'high-takt', saturation: 'thin', prev: 'ubiquitous' }, [
      node('start-thread', 'Start the thread', 'Everything before a tool touches it.', { dexterity: 5 }, [
        leaf('finger-start-bolt', 'Start a bolt by fingers', 'Engage a thread by hand.', { cue: 'It catches two threads under finger pressure alone.', verify: 'If it will not start you back out and look at the hole rather than adding force.', notes: 'Holds 37 hours of bench pilot. The refusal to force it is the skill and it is a non-action.' }),
        leaf('check-the-washer-is-the-right-way-up', 'Run a nut to finger-tight on a lock washer', 'Fit a nut and washer.', { cue: 'Finger-tight, with the washer confirmed the correct way up before the tool goes on.' }),
        leaf('catch-a-pipe-thread-square', 'Start a pipe thread with tape or dope', 'Begin a tapered thread.', { cue: 'Sealant on the male only, caught square, and stopped at alignment rather than at tight.', notes: 'A tapered thread has no hard stop. You stop where the fitting points the right way, which is a judgement.' }),
        leaf('order-two-banjo-washers-correctly', 'Fit a banjo bolt with two washers', 'Assemble a banjo fitting.', { cue: 'Both washers in the correct order, tightened until the faces seat.' }),
        leaf('swap-a-drift-for-the-bolt', 'Align holes with a drift, then swap for the bolt', 'Line up a bolted joint.', { cue: 'The bolt goes in while the holes are still lined up, not after the drift comes out.', notes: 'A hand-over between two objects in one location, where releasing early loses the alignment.' }),
        leaf('recover-a-bolt-that-will-not-start', 'Recover: a bolt will not start by fingers', 'Back out and inspect the hole; force at this point is always the wrong answer.', { fail: true }),
      ]),
      node('torque', 'Torque and angle', 'Where the stop is a click or a mark.', { precision: 5, contact: 5 }, [
        leaf('torque-to-spec', 'Torque a pattern to spec in star order', 'Bring a bolt pattern up.', { cue: 'In star order, stopping on the click at the first spec.', notes: 'Holds 22 hours of bench pilot. Star order and stop-on-click are both invisible in the finished joint.' }),
        leaf('angle-tighten-to-the-second-mark', 'Angle-tighten from a painted line', 'Complete a torque-angle sequence.', { cue: 'From the line to the second mark, then stop on the mark.' }),
        leaf('set-a-click-wrench-and-not-bounce', 'Set a click wrench and pull to the click', 'Use a torque wrench.', { cue: 'One click, no bounce past it.', notes: 'The click and the click-plus-a-nudge sound identical and read identical on video. Only the wrist knows.' }),
        leaf('read-the-mark-after-a-torque-stick', 'Use a torque stick and read the mark', 'Impact-torque to a limit.', { cue: 'The paint or the mark is read after the pass, not assumed from the stick.' }),
        leaf('recover-a-wrench-that-bounced-past-the-click', 'Recover: the wrench bounced past the click', 'Back the fastener off and retorque from slack.', { fail: true }),
      ]),
      node('wrenching', 'Wrenching technique', 'How the force is applied and reacted.', { contact: 5, dexterity: 4 }, [
        leaf('cross-start-so-the-lid-stays-level', 'Cross-start four cover bolts', 'Bring a cover down evenly.', { cue: 'All four started before any is snugged, so the lid stays level.' }),
        leaf('backup-wrench-on-the-dead-nut', 'Hold a backup wrench on the dead nut', 'Tighten without loading the fitting.', { cue: 'Only the live nut turns; the dead nut does not move at all.', prim: ['bimanual'] }),
        leaf('tighten-a-clamp-to-the-index-window', 'Tighten a hose clamp to the index window', 'Set a hose clamp.', { cue: 'To the window.', verify: 'The hose cannot be twisted by hand.' }),
        leaf('hold-a-hex-key-so-it-cannot-cam-out', 'Hold a hex key in the cap screw', 'Drive a socket cap screw.', { cue: 'One hand keeps the key seated while the other turns, so it cannot cam out and round the socket.', prim: ['bimanual'] }),
        leaf('recover-a-lid-pulled-down-crooked', 'Recover: a lid came down crooked', 'Slack every fastener and restart the pattern rather than pulling the high side down.', { fail: true }),
      ]),
      node('thread-rework', 'Thread rework', 'The three ways a thread goes wrong.', { fail: true, saturation: 'empty', dexterity: 5 }, [
        leaf('back-out-a-cross-thread-and-recatch', 'Back out a cross-threaded bolt', 'Recover a crossed thread.', { cue: 'Out, hole inspected or chased, and recaught by fingers.', fail: true }),
        leaf('add-the-washer-and-restart-by-fingers', 'Remove a bolt that bottomed in a blind hole', 'Recover a bottomed fastener.', { cue: 'The missed washer goes in and the fastener restarts from fingers.', fail: true }),
        leaf('throw-a-rounded-hex', 'Replace a rounded hex and finish the torque', 'Recover a damaged fastener head.', { cue: 'The new cap takes the final torque and the rounded one goes in the bin.', fail: true }),
      ]),
    ]),

    node('clips', 'Clips, panels and latches', 'Fasteners with no thread, where the stop condition is a click you have to trust.', { dexterity: 5, precision: 4, contact: 4, saturation: 'thin', skillYears: 'none', prev: 'ubiquitous' }, [
      node('push-fit', 'Push-fit clips', 'One motion, one confirmation.', { dexterity: 5 }, [
        leaf('open-both-barbs-on-the-far-side', 'Push a fir-tree clip through a panel', 'Fit a push clip.', { cue: 'Both barbs open on the far side.', verify: 'You check the far side rather than trusting the feel through the panel.', notes: 'One barb open feels the same from the front and holds for a week.' }),
        leaf('lock-a-caged-nut-so-it-cannot-spin', 'Seat a caged nut in a square hole', 'Fit a cage nut.', { cue: 'The cage locks and the nut cannot spin when a bolt starts.' }),
        leaf('walk-a-trim-clip-to-the-next-slot', 'Walk a trim clip down a flange', 'Fit trim to a flange.', { cue: 'Into the next slot and pushed home, not left between slots.' }),
        leaf('seat-a-cap-so-it-cannot-fall-in', 'Fit a plastic cap over a stud', 'Cap a protruding fastener.', { cue: 'Seated, so it cannot fall into the assembly on the next move.' }),
        leaf('recover-a-clip-with-one-barb-open', 'Recover: only one barb opened', 'Pull the clip, inspect the panel hole and fit a new one.', { fail: true }),
      ]),
      node('latching', 'Latches and pins', 'Things that click.', { precision: 4 }, [
        leaf('snap-a-connector-and-tug-it', 'Snap a connector onto a sensor body', 'Mate a sensor connector.', { cue: 'The latch clicks.', verify: 'You tug it; a click without a tug is a connector that will come off with vibration.' }),
        leaf('click-a-hitch-pin-retainer', 'Insert a hitch pin through a clevis', 'Fit a quick pin.', { cue: 'Through both ears with the retainer clicked over.' }),
        leaf('close-a-p-clip-on-the-whole-loom', 'Tuck a loom into a P-clip and close it', 'Restrain a bundle.', { cue: 'On the loom, never pinching a single stray against the clip.' }),
        leaf('recover-a-clip-in-the-wrong-hole', 'Recover: a clip landed in the wrong hole', 'Open it, move it to the mark and close it.', { fail: true }),
      ]),
    ]),

    node('drives', 'Belts, chains and flexible runs', 'Things that move, and things that have to survive things that move.', { contact: 5, dexterity: 4, precision: 4, saturation: 'thin', prev: 'common' }, [
      node('belts', 'Belts', 'Getting it on without rolling the edge.', { contact: 5, prim: ['bimanual'] }, [
        leaf('hold-slack-off-the-far-edge', 'Feed a belt onto the first pulley', 'Begin fitting a belt.', { cue: 'The slack is held so the belt cannot roll off the far edge.' }),
        leaf('walk-a-belt-on-filling-every-groove', 'Walk a belt onto the second pulley', 'Complete a belt fit.', { cue: 'No rolled edge.', verify: 'Every groove is filled, counted rather than glanced at.' }),
        leaf('tension-to-the-deflection-mark', 'Tension a belt to the deflection mark', 'Set belt tension.', { cue: 'To the mark, then the adjuster locks.' }),
        leaf('track-a-belt-for-a-full-hand-turn', 'Set belt tracking', 'Adjust belt running position.', { cue: 'It stays on the crown.', verify: 'For a full hand-turn, not the first few degrees.' }),
        leaf('recover-a-belt-with-a-rolled-edge', 'Recover: the belt edge rolled going on', 'Take it off and inspect it; a rolled edge is a delaminated belt.', { fail: true }),
      ]),
      node('chains', 'Chains', 'Discrete links and a joining piece with an orientation.', { precision: 4 }, [
        leaf('close-a-master-link-the-right-way', 'Lay a chain over both sprockets and join it', 'Fit and join a chain.', { cue: 'The master link closes with the closed face the specified way, which is the direction of travel.' }),
        leaf('recover-a-chain-one-pitch-long', 'Recover: the chain is one pitch long', 'Split it, remove the extra link and rejoin rather than taking it up on the adjuster.', { fail: true }),
      ]),
      node('flexible-runs', 'Hoses, tubes and moving cable', 'Runs that have to keep working while something travels.', { dexterity: 5, precision: 4 }, [
        leaf('lead-a-flexible-shaft-without-kinking', 'Lead a flexible shaft through a grommet', 'Route a flexible drive.', { cue: 'No kink anywhere along it, and the grommet seats.' }),
        leaf('coil-a-service-loop-and-clip-it', 'Coil excess line into a service loop', 'Store slack in a run.', { cue: 'To the set diameter, clipped so it holds the loop.' }),
        leaf('tie-a-drag-chain-shelf-in-order', 'Tie moving cable to a drag-chain shelf', 'Load a cable carrier.', { cue: 'In the specified order, so nothing crosses on travel.', notes: 'Crossed cables in a drag chain saw through each other over months. The install looks tidy.' }),
        leaf('seat-every-clip-in-a-tube-ladder', 'Dress a pneumatic tube into a clip ladder', 'Route pneumatic tubing.', { cue: 'Each clip pushed until it seats, none left resting.' }),
        leaf('hold-minimum-bend-at-a-corner', 'Keep a hydraulic hose at minimum bend', 'Route a pressure hose.', { cue: 'At or above minimum bend at the corner, clamped on the mark.', contact: 4 }),
        leaf('recover-a-hose-below-minimum-bend', 'Recover: a hose is below minimum bend', 'Re-route it or fit an elbow; clamping it tighter makes it worse.', { fail: true }),
      ]),
    ]),

    node('adjust', 'Setting and adjustment', 'Nothing is being assembled; something is being brought to a number.', { precision: 5, dexterity: 4, contact: 4, skillYears: 'years', saturation: 'empty', prev: 'common' }, [
      node('to-a-gauge', 'Set to a gauge', 'A feeler, a straightedge or a dial decides.', { precision: 5 }, [
        leaf('set-lash-without-moving-the-adjuster', 'Set valve lash to a feeler', 'Adjust valve clearance.', { cue: 'The jam nut locks without the adjuster moving.', notes: 'The adjuster creeping as the jam nut goes on is the entire difficulty, and it is a two-hand force problem.' }),
        leaf('shim-a-foot-until-a-straightedge-sits-flat', 'Shim a motor foot', 'Correct soft foot.', { cue: 'A straightedge sits flat across all the feet.' }),
        leaf('set-a-fan-to-equal-daylight', 'Align a fan to a shroud gap', 'Centre a fan in a shroud.', { cue: 'Equal daylight all the way round before the fasteners lock.' }),
        leaf('recover-an-adjuster-that-moved-on-lock', 'Recover: the adjuster moved as the jam nut went on', 'Reset from the gauge; the reading before the lock is not the setting.', { fail: true }),
      ]),
      node('to-a-window', 'Set to a window', 'A range rather than a point.', { precision: 4 }, [
        leaf('zero-a-pointer-and-lock-the-collar', 'Zero a pointer on a scale', 'Set an indicator to zero.', { cue: 'On zero, then the collar locks without disturbing it.' }),
        leaf('trip-a-limit-at-the-marked-travel', 'Adjust a limit switch', 'Set a travel limit.', { cue: 'It just trips at the marked travel, then locks.' }),
        leaf('set-free-play-into-the-window', 'Adjust a cable to the free-play window', 'Set cable adjustment.', { cue: 'Inside the window, then the adjuster locks.' }),
        leaf('preload-to-the-painted-coil-count', 'Set spring preload to the coil count', 'Set a spring preload.', { cue: 'To the painted coil-count, then the collar locks.' }),
        leaf('recover-a-setting-locked-outside-the-window', 'Recover: it locked outside the window', 'Unlock, reset and relock rather than accepting the near miss.', { fail: true }),
      ]),
    ]),

    node('assist', 'Handling, assist and stored energy', 'Two-hand problems, and parts that push back.', { contact: 5, dexterity: 4, saturation: 'empty', prim: ['bimanual'], prev: 'common' }, [
      node('holding', 'Hold it while you fix it', 'One hand doing nothing visible.', { contact: 5 }, [
        leaf('support-a-cover-off-the-seal', 'Support a heavy cover and start fasteners', 'Fit a heavy cover.', { cue: 'Fasteners are started before the cover is allowed to rest on the seal.', notes: 'A cover resting on its own gasket while you find a bolt has already crushed it.' }),
        leaf('remove-the-pry-bar-before-torque', 'Use a pry bar as a hinge assist', 'Lever a part into position.', { cue: 'Fasteners started, then the bar comes out before any torque goes on.', notes: 'Torquing against a lever locks the misalignment in permanently.' }),
        leaf('hold-a-shrink-collar-until-it-bites', 'Heat a shrink collar and slide it to the mark', 'Fit a shrink-fit collar.', { cue: 'Held at the mark until it bites; it cannot be moved afterwards.', horizon: 'short' }),
        leaf('recover-a-collar-that-bit-off-the-mark', 'Recover: a shrink collar bit off the mark', 'Cut it off and fit a new one; it will not move once it has gripped.', { fail: true }),
      ]),
      node('stored-energy', 'Parts that push back', 'Springs, and things under pressure.', { contact: 5, dexterity: 5 }, [
        leaf('capture-a-spring-before-you-let-go', 'Install a spring in a pocket', 'Fit a compression spring.', { cue: 'The cover captures it before either hand releases.', notes: 'The failure launches a spring across the shop and the correct version is a hand staying still.' }),
        leaf('wind-a-torsion-spring-and-pin-it', 'Wind a clock-spring or torsion spring', 'Preload a torsion spring.', { cue: 'To the index, then pinned before it is released.' }),
        leaf('tug-a-quick-coupler-to-confirm-the-sleeve', 'Mate a quick-coupler', 'Connect a quick-release fitting.', { cue: 'Mated.', verify: 'A tug confirms the sleeve locked, which is the only difference between connected and held together.' }),
        leaf('bleed-until-the-rod-is-firm', 'Bleed a small cylinder', 'Purge air from an actuator.', { cue: 'The rod moves without sponginess, then the bleed is capped.' }),
        leaf('pack-grease-until-clean-grease-shows', 'Pack a grease cavity to the relief', 'Fill a bearing cavity.', { cue: 'You stop when clean grease shows at the relief hole, not when the gun is empty.' }),
        leaf('recover-a-spring-that-got-away', 'Recover: a spring escaped the pocket', 'Search until it is in your hand or you know it is not in the assembly.', { fail: true, notes: 'A spring loose inside a machine is foreign object debris with a delay on it.' }),
      ]),
    ]),

    node('lock', 'Locking, marking and hand-back', 'Making the assembly stay assembled, and leaving evidence that it was done.', { precision: 4, dexterity: 5, contact: 3, saturation: 'empty', prev: 'common' }, [
      node('locking', 'Mechanical locking', 'Preventing rotation with metal rather than friction.', { dexterity: 5, skillYears: 'months' }, [
        leaf('safety-wire-in-the-correct-direction', 'Safety-wire two heads', 'Lockwire a pair of fasteners.', { cue: 'The wrap direction pulls both heads tight, and the tail is tucked.', notes: 'Wired the wrong way it looks identical and does the opposite. Very few things in engineering are that binary.' }),
        leaf('bend-a-lock-tab-against-the-flat', 'Install a lock-tab', 'Fit a tab washer.', { cue: 'Bent against the flat so the fastener cannot rotate back.' }),
        leaf('recover-safety-wire-wrapped-the-wrong-way', 'Recover: safety wire runs the wrong way', 'Cut it out and rewire; wire that can loosen the fastener is worse than none.', { fail: true }),
      ]),
      node('hand-back', 'Mark and close out', 'Evidence for the next person.', { precision: 3, prim: ['inspect'] }, [
        leaf('paint-stripe-a-torque-pattern', 'Paint-stripe a torque pattern', 'Mark completed torque.', { cue: 'After the final pass, so a later turn is visible from across the machine.' }),
        leaf('close-a-guard-and-hit-every-latch', 'Close a guard and secure it', 'Restore guarding.', { cue: 'Both quarter-turns or every latch.', verify: 'Counted; a missing latch is not done.' }),
        leaf('tag-out-and-try-the-handle', 'Fold a tag-out hasp and lock it', 'Apply a lock-out.', { cue: 'The lock body snaps shut.', verify: 'You try the handle afterwards.' }),
        leaf('recover-a-guard-left-a-latch-short', 'Recover: a guard went back a latch short', 'Recount from zero rather than resuming the count where you think you left it.', { fail: true }),
      ]),
    ]),
  ],
)
