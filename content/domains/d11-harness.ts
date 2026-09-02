import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// D11 is the deepest branch in the seed on purpose: it is the domain the factory
// thesis is written against, and it is the only one where we hold real hours.
//
// The formboard family is now built from the board process end to end rather
// than from a list of names, and what that surfaces is how much of harness work
// happens before a single wire is picked up. Twenty-two of the hundred rows here
// are setup and part selection: seating a fixture until it cannot rock, tugging
// a retainer, wiping a chip off the route, hanging a dispenser so the tail
// cannot wrap a caster, keeping the kit bag on the table so parts cannot roll
// under the board. None of that is in any dataset, and all of it decides whether
// the next two hours work.
//
// The second thing the process view surfaces is the body. Seven rows are about
// where the operator stands: walk the board end instead of leaning across a
// finished run, crouch and then stand before you carry a tool, shoulder-turn and
// walk the trunk instead of twisting a finished node. A formboard is roughly two
// metres of reach and the whole build is a sequence of decisions about which
// side of it you are on. Ego video from a head-mounted camera is exactly the
// wrong instrument for that, which is a useful argument for the suit.
//
// Node ids that carry coverage events are load-bearing. Eleven of them are
// referenced from content/coverage-events.ts and hold 516 of our hours plus 145
// partner hours, so they survive rebuilds unchanged even where the surrounding
// structure moves.

export const d11: NodeSpec = node(
  'd11',
  'Wire, cable, harness',
  'Building and repairing the nervous system of machines: set the board, pick, route, branch, tie, terminate, test and rework.',
  {
    setting: 'industrial',
    dexterity: 4,
    precision: 4,
    contact: 4,
    horizon: 'medium',
    repetition: 'batched',
    capital: 'cheap',
    partner: 'none',
    skillYears: 'months',
    suit: 'excellent',
    robotNow: 'no',
    embodiment: ['ego', 'suit', 'video'],
    saturation: 'empty',
    ours: 'none',
    rights: 'easy',
    ethics: 'open',
    prev: 'common',
    prim: ['grasp', 'insert', 'deform', 'tool'],
  },
  [
    node('cut-prep', 'Cut, measure and strip', 'Turning bulk reel into cut lengths with clean conductor exposed.', { dexterity: 4, precision: 4, prim: ['separate', 'tool'] }, [
      node('measure-cut', 'Measure and cut to length', 'Pull from reel against a stop or a tape and cut square.', { horizon: 'short', repetition: 'high-takt', robotNow: 'yes', saturation: 'thin', contact: 3 }, [
        leaf('zero-a-tape-against-the-datum', 'Zero a tape against the board datum', 'Set a measuring reference.', { cue: 'The next length is taken from that mark, never from a guessed edge.', notes: 'Every downstream length inherits this one decision, and an error here is invisible until the harness will not reach.' }),
        leaf('measure-a-branch-tape-on-the-mark', 'Measure a branch to the datum', 'Take a length off the board.', { cue: 'The tape sits on the board mark, not held in the air across the run.' }),
        leaf('pull-to-the-length-mark-without-stretching', 'Pull a lead to the length mark', 'Draw a lead out to length.', { cue: 'The jacket is not stretched.', verify: 'If the printed legend distorts, you pulled too far and the lead is scrap.', notes: 'The print is the strain gauge. That is a genuinely clever cue and it is nowhere in any spec.' }),
        leaf('cut-square-against-the-stop', 'Cut square against the stop', 'Cut a lead to length.', { cue: 'Square, so the strip that follows sits concentric.' }),
        leaf('recover-a-lead-cut-short', 'Recover: a lead came out short', 'Cut a new one; a short lead is never made up by stealing slack elsewhere.', { fail: true }),
      ]),
      node('strip', 'Strip insulation without nicking', 'Remove insulation to a length without nicking strands.', { precision: 5, contact: 4, prim: ['separate', 'tool'] }, [
        leaf('strip-blade-preset', 'Preset a strip blade and prove it on a scrap', 'Set blade depth for a gauge and insulation type.', { cue: 'The setting is proven on a scrap before any kit wire goes in.', verify: 'The scrap strips clean with no bright marks on the strands.', notes: 'Holds 26 hours of our pilot data. The blade setting is the entire skill and it is set by feel against a material.' }),
        leaf('strip-to-length-no-strand-bright', 'Strip to the specified length', 'Remove insulation to a dimension.', { cue: 'Full length exposed with no strand showing a bright nick.', precision: 5 }),
        leaf('recover-a-nicked-strand', 'Recover: a strand was nicked', 'Cut back and re-strip; a nicked strand is a fatigue crack with a delay on it.', { fail: true, notes: 'It crimps fine, tests fine and fails in service. Nothing at the time of the mistake tells you.' }),
      ]),
      node('tinning', 'Tin and pre-form a conductor end', 'Solder-tinning and pre-forming conductor ends before termination.', { prev: 'uncommon', contact: 3, skillYears: 'years' }, [
        leaf('tin-without-wicking-under-the-jacket', 'Tin a conductor end', 'Pre-tin stranded conductor.', { cue: 'The solder stops before the jacket; wicking under it makes a stiff point that will break.' }),
        leaf('pre-form-an-end-to-the-terminal', 'Pre-form a conductor end', 'Shape an end for its termination.', { cue: 'It enters the terminal without being persuaded.' }),
        leaf('recover-a-tinned-end-gone-stiff', 'Recover: solder wicked up the conductor', 'Cut it off behind the wick and start again.', { fail: true }),
      ]),
    ]),

    node('terminate', 'Crimp and terminate', 'Making a gas-tight mechanical and electrical joint at the wire end.', { precision: 5, contact: 5, prim: ['insert', 'tool', 'fasten'] }, [
      node('crimp-hand', 'Crimp by hand', 'Hand tool crimping where the operator sets position and orientation.', { dexterity: 5, skillYears: 'months' }, [
        leaf('crimp-ferrule-din', 'Crimp a ferrule to DIN with a hand tool', 'Compress a ferrule with a hand crimper.', { cue: 'The tool ratchets through and releases on its own; you do not release it early.', verify: 'The crimp carries the die witness and the conductor cannot be pulled out by hand.', notes: 'Our largest single holding at 159 hours. Position, orientation and the ratchet release are all wrist-only.' }),
        leaf('set-the-insulation-crimp-on-the-jacket', 'Set the insulation crimp on the jacket', 'Position a two-stage crimp.', { cue: 'The insulation wings close on jacket and the conductor wings on bare strand, with the transition visible in the window.' }),
        leaf('orient-a-contact-in-the-die', 'Orient a contact in the die', 'Present a contact to a crimper correctly.', { cue: 'The seam faces the specified way before the handles move.' }),
        leaf('recover-a-crimp-with-no-witness', 'Recover: the crimp shows no die witness', 'Cut it off and recrimp; a second squeeze does not certify the first.', { fail: true }),
      ]),
      node('crimp-machine', 'Set up and run a crimp press', 'Loading, adjusting and babysitting a semi-automatic crimp press.', { capital: 'mid', robotNow: 'partial', prev: 'common' }, [
        leaf('load-a-reel-and-thread-the-track', 'Load a contact reel and thread the track', 'Set a press up with a new reel.', { cue: 'The carrier strip tracks without riding the guide.' }),
        leaf('set-crimp-height-and-prove-it', 'Set crimp height and prove it', 'Adjust a press to a target.', { cue: 'Set to the target.', verify: 'A sample is measured and pull-tested before the batch runs.' }),
        leaf('recover-a-press-that-drifted-mid-batch', 'Recover: crimp height drifted mid-batch', 'Stop, quarantine back to the last good sample, and reset.', { fail: true, notes: 'The quarantine boundary is the judgement. Everything since the last proven sample is suspect.' }),
      ]),
      node('screw-terminate', 'Land into screw and spring terminals', 'Landing conductors into field wiring devices.', { precision: 3, contact: 4 }, [
        leaf('land-into-a-screw-terminal-to-firm-stop', 'Land into a screw terminal', 'Clamp a conductor under a screw.', { cue: 'Firm stop, with no strand outside the clamp.' }),
        leaf('open-a-spring-terminal-and-let-it-close', 'Land into a spring terminal', 'Insert into a cage clamp.', { cue: 'The lever is released and the cage closes on its own.', verify: 'A tug does not move the conductor.' }),
        leaf('recover-a-strand-outside-the-clamp', 'Recover: a strand escaped the clamp', 'Withdraw, re-twist and reland rather than pushing the stray back with a tool.', { fail: true }),
      ]),
    ]),

    node('connector', 'Connector loading and sealing', 'Getting contacts into housings, in the right cavity, sealed and locked.', { dexterity: 5, precision: 5, contact: 5, prim: ['insert', 'grasp'] }, [
      node('load-contacts', 'Load contacts into a housing', 'Cavity-by-cavity insertion against a wiring schedule.', { repetition: 'batched' }, [
        leaf('seat-deutsch-dt', 'Seat a contact in a Deutsch DT housing', 'Insert and lock a contact in a sealed housing.', { cue: 'It goes past the lock and stays there when the tool comes away.', verify: 'A tug on the wire does not move it.', notes: 'Holds 120 hours across pilot and production. The lock is felt through a rubber seal, which is why this is a force channel and not a vision one.' }),
        leaf('keep-the-cavity-map-in-sight', 'Keep the cavity map in sight while you fan', 'Work to a wiring schedule.', { cue: 'The map stays visible; the sequence is never carried from memory.', prim: ['inspect'], notes: 'The whole failure mode of this family is confidence. A wrong cavity inserts exactly as well as a right one.' }),
        leaf('fan-leads-no-two-tails-crossed', 'Fan leads at the connector face', 'Prepare leads for insertion.', { cue: 'Every ID is readable and no two tails cross.' }),
        leaf('insert-to-the-first-click-and-stop', 'Insert a contact to the first click', 'Begin seating a contact.', { cue: 'You stop at the first click.', verify: 'No click means you pull it out and look at the cavity rather than pushing harder.', notes: 'The instruction to stop and look instead of pressing is the single most valuable line in this family.' }),
        leaf('push-to-the-second-lock-shoulder-home', 'Push a contact to the second lock', 'Complete a two-stage insertion.', { cue: 'The shoulder is home; you stop there.' }),
        leaf('tug-test-that-one-cavity', 'Tug-test that one cavity', 'Prove a single insertion.', { cue: 'One cavity, tested as you go.', verify: 'If it comes out you extract and start over; you never push harder on a contact that has already failed once.' }),
        leaf('extract-protecting-the-cavity-latch', 'Extract a mis-seated contact', 'Remove a contact from a housing.', { cue: 'With the specified tool, and the cavity latch survives.', fail: true, notes: 'Wrecking the latch turns a wrong contact into a scrap housing.' }),
        leaf('cap-an-unused-cavity', 'Cap an unused cavity', 'Seal an unpopulated position.', { cue: 'Nothing can fall in and the seal stays intact.' }),
        leaf('support-a-large-connector-while-inserting', 'Support a large connector while inserting', 'Insert into a heavy housing.', { cue: 'One hand holds it so the housing cannot tilt in the fixture while the other inserts.', prim: ['bimanual'] }),
        leaf('draw-the-insertion-tool-and-return-it', 'Draw the insertion tool, use it, return it', 'Cycle an insertion tool.', { cue: 'It is back in the holster before the next contact is picked up.', prim: ['tool'] }),
      ]),
      node('backshell', 'Close out a backshell and strain relief', 'Closing out the connector rear with clamp, boot or overmould.', { contact: 4 }, [
        leaf('seat-a-tpa-until-it-is-flush', 'Seat a TPA, CPA or wedge', 'Fit a secondary lock.', { cue: 'Flush.', verify: 'It cannot be lifted with a fingernail, which is the only check that distinguishes seated from resting.' }),
        leaf('thread-the-boot-before-you-dress', 'Thread a boot or backshell onto the run first', 'Pre-position rear hardware.', { cue: 'It is on the run before the connector is dressed, where the book requires that order.', notes: 'Forgetting this means cutting the harness apart to fit a part that costs nothing.' }),
        leaf('clock-the-backshell-and-hold-it', 'Clock a backshell to the fixture mark', 'Set backshell orientation.', { cue: 'The clock is held while the hardware starts, not corrected afterwards.' }),
        leaf('tighten-until-the-relief-bites', 'Tighten backshell hardware to the stop', 'Close out a backshell.', { cue: 'To the specified stop.', verify: 'The strain relief visibly bites the jacket rather than closing on air.' }),
        leaf('visual-check-clocking-before-you-pull-it', 'Check clocking before leaving the fixture', 'Verify orientation while it is still held.', { cue: 'Checked against the fixture key before the connector leaves the fixture.', prim: ['inspect'], notes: 'Once it is off the fixture there is no reference left to check against.' }),
        leaf('reseat-and-reclock-a-connector', 'Reseat a connector that came out of the fixture', 'Recover a displaced connector.', { cue: 'Reseated and re-clocked before the next contact goes in.', fail: true }),
      ]),
    ]),

    node('formboard', 'Formboard assembly', 'Laying a full harness on a board: set up, pick, route, branch, tie, dress, release.', { horizon: 'long', dexterity: 4, contact: 4, skillYears: 'years', robotNow: 'no', prim: ['deform', 'bimanual', 'locomote'] }, [
      node('board-setup', 'Set the board up', 'Everything that happens before a wire is picked up.', { horizon: 'medium', dexterity: 3, precision: 4, saturation: 'empty', prev: 'common' }, [
        leaf('confirm-the-rev-and-park-the-traveler', 'Confirm the board rev and park the traveler', 'Check you are on the right build.', { cue: 'Long enough to confirm the rev, then the paper goes where it cannot blow onto the wires.', prim: ['inspect'], notes: 'A time limit on reading and a placement rule for the document. Both halves are real and neither is recorded anywhere.' }),
        leaf('seat-the-first-end-fixture-on-the-datum', 'Seat the first-end fixture on the datum', 'Mount an end fixture.', { cue: 'Pushed until it cannot rock.' }),
        leaf('seat-the-second-end-and-check-the-clock', 'Seat the second-end fixture', 'Mount the opposite end fixture.', { cue: 'Seated the same way.', verify: 'Both fixtures still match the drawn clock after the second one goes on.' }),
        leaf('clock-a-fixture-to-the-backshell-mark', 'Clock a fixture to the backshell-angle mark', 'Set fixture orientation.', { cue: 'Locked before the first wire goes on, because it cannot be corrected afterwards.' }),
        leaf('snap-and-tug-an-intermediate-retainer', 'Snap in an intermediate retainer', 'Fit a mid-board retainer.', { cue: 'In the specified hole.', verify: 'A tug confirms it cannot pop when a wire drops into it.' }),
        leaf('replace-a-peg-to-neighbour-height', 'Replace a missing peg or nail', 'Restore a board feature.', { cue: 'The head sits at the same height as its neighbours, so the bundle does not step over it.' }),
        leaf('tension-an-elastic-retainer-to-hold', 'Tension an elastic retainer', 'Set a retainer so it works.', { cue: 'It will actually hold a lead, not merely look like a clip.', notes: 'A slack retainer looks identical to a working one in every photograph of the board.' }),
        leaf('wipe-the-route-clear-of-chips', 'Wipe the route before the first lay', 'Clean the board surface.', { cue: 'No chip or tape scrap can sit under the first lay.' }),
        leaf('stage-consumables-labels-out', 'Stage tape, ties and sleeves in the reach zone', 'Lay out consumables.', { cue: 'In the zone you will actually use, labels facing out.', prim: ['transfer'] }),
        leaf('hang-a-tie-dispenser-clear-of-the-floor', 'Hang a tie dispenser', 'Position a dispenser.', { cue: 'The tail cannot drag on the floor or wrap a caster.' }),
        leaf('park-the-heat-gun-off-the-board-paper', 'Park a heat gun or hot-knife', 'Stow a hot tool.', { cue: 'In the holster with the tip clear of the board paper.', contact: 3, notes: 'A hot tip on paper is how a formboard becomes a fire. The rule is where it rests, not how it is used.' }),
        leaf('keep-the-kit-bag-on-the-table', 'Open the kit and keep the bag on the table', 'Manage the kit.', { cue: 'Parts cannot roll off and under the board.' }),
        leaf('recover-a-board-set-to-the-wrong-rev', 'Recover: the board was set to the wrong rev', 'Strip the fixtures and start again rather than adapting a build to a board it does not match.', { fail: true, notes: 'Discovered three wires in, the cheap-feeling option is to carry on and correct later. There is no correcting later.' }),
      ]),
      node('pick', 'Pick the right part', 'Selection, which is most of the error budget on a harness.', { dexterity: 5, precision: 5, repetition: 'high-takt', prim: ['grasp', 'inspect'], saturation: 'empty' }, [
        leaf('match-a-wire-card-then-pick', 'Match a wire card and pick that lead', 'Select a lead against a card.', { cue: 'Colour, gauge and ID all match before your hand moves.' }),
        leaf('pick-a-lead-without-pulling-its-neighbour', 'Pick a pre-cut lead off the rack', 'Take one lead from a rack.', { cue: 'The next lead stays on its hook.' }),
        leaf('keep-contacts-in-a-dish', 'Pick a contact by cavity spec', 'Select a contact.', { cue: 'It goes in a dish, never loose in a palm you are about to lean on.', notes: 'Contacts crushed under a hand are found later inside the bundle.' }),
        leaf('set-a-housing-in-the-fixture-face-up', 'Pick a housing by part number', 'Select and place a connector housing.', { cue: 'In the fixture, the correct face up.' }),
        leaf('park-a-backshell-on-the-run', 'Pick a backshell and park it on the run', 'Pre-stage rear hardware.', { cue: 'It is on the run now, so it cannot be forgotten later.' }),
        leaf('set-a-clip-on-its-mark-not-near', 'Pick a clip or P-clamp by callout', 'Select and place a clamp.', { cue: 'On the clip mark, not near it.' }),
        leaf('keep-solder-sleeves-dry', 'Pick a splice or solder-sleeve kit', 'Select a splice kit.', { cue: 'The sleeves stay dry until they go on the joint.' }),
        leaf('expand-a-braid-mouth-before-forcing', 'Pick pre-cut braid or conduit', 'Select and prepare a sleeve.', { cue: 'The mouth is expanded before any wire is pushed into it.' }),
        leaf('return-an-unused-part-before-the-next-pick', 'Return an unused part to its bin', 'Close out a wrong pick.', { cue: 'It is back in the correct bin before the next pick starts.', notes: 'Deferring the return is how a wrong part ends up in the next harness.' }),
        leaf('recover-a-wrong-part-already-fitted', 'Recover: a wrong part was already fitted', 'Remove it and return it to its bin before the correct one is picked.', { fail: true }),
      ]),
      node('layout-route', 'Route branches on the board', 'Walking a harness around pegs and forks in build order.', { horizon: 'long', prev: 'common' }, [
        leaf('route-main-trunk', 'Route the main trunk around the board', 'Lay the primary run.', { cue: 'The trunk follows the drawn centreline into every stanchion throat along its length.', notes: 'Our single most-recorded leaf: 95 of our hours plus 76 partner hours. Long-horizon, whole-body, and the thing an arm cannot do.' }),
        leaf('dress-the-first-lead-and-hook-it', 'Dress the first lead to the first peg', 'Start a run.', { cue: 'Hooked so it cannot spring off while you reach the next peg.' }),
        leaf('clip-the-slack-loop-so-it-stays-a-loop', 'Add the specified slack loop at a node', 'Build service slack in.', { cue: 'Clipped so the loop stays a loop rather than pulling flat.' }),
        leaf('park-tails-in-the-holding-comb', 'Park unused tails in the holding comb', 'Manage leads not yet dressed.', { cue: 'They cannot knot under the trunk.' }),
        leaf('walk-the-centreline-into-each-throat', 'Walk a wire along the trunk centreline', 'Add a wire to the main run.', { cue: 'It drops into each stanchion throat as you pass, rather than being pushed in afterwards.', prim: ['locomote'] }),
        leaf('drop-into-the-throat-not-the-lip', 'Drop a wire into a stanchion', 'Seat a wire in a board feature.', { cue: 'It sits in the throat, not on the lip.', verify: 'You look down the run rather than at the one you just placed.' }),
        leaf('hold-radius-at-a-corner-peg', 'Hold radius at a corner peg', 'Take a bundle round a corner.', { cue: 'It follows the drawn curve and does not kink against the peg.', dexterity: 5 }),
        leaf('smooth-a-kink-onto-the-form-line', 'Smooth a kink against the form line', 'Correct a bundle that left the line.', { cue: 'The jacket sits back down on the line.', fail: true }),
        leaf('under-pass-before-you-tape', 'Under-pass at a layer change', 'Sequence a layer transition.', { cue: 'The specified wires are already in the lower layer before any tape goes on.', notes: 'An ordering constraint that becomes irreversible the moment the tape starts.' }),
        leaf('over-cross-at-the-index-peg', 'Over-cross at the index peg', 'Place a crossing.', { cue: 'At the index peg, never a hand-span early.' }),
        leaf('split-a-pair-around-a-nail', 'Split a pair around a nail', 'Take a pair past an obstruction.', { cue: 'Both wires stay paired and neither hops the nail.' }),
        leaf('maintain-twist-through-a-straight-run', 'Maintain twist through a straight run', 'Preserve a twisted pair.', { cue: 'The pair does not open into two parallels anywhere along the straight.', precision: 5, notes: 'Losing the twist mid-run is invisible under tape and shows up as noise that gets blamed on the device.' }),
        leaf('count-the-trunk-against-the-callout', 'Count remaining wires in the trunk', 'Check population mid-build.', { cue: 'You stop if the count does not match the callout.', prim: ['inspect'] }),
        leaf('transfer-hand-to-hand-at-mid-board', 'Transfer a wire hand-to-hand at mid-board', 'Pass a lead across your own reach.', { cue: 'It does not spring off the last peg during the handover.', prim: ['bimanual'] }),
        leaf('two-hand-dress-a-round-trunk', 'Two-hand dress a trunk round', 'Consolidate a bundle.', { cue: 'The bundle is round and the form line is visible along it.', dexterity: 5, contact: 5 }),
        leaf('hold-a-breakout-off-zero', 'Hold a breakout while you comb the trunk', 'Work a branch and a trunk at once.', { cue: 'The breakout never flops to zero degrees while the other hand combs.', prim: ['bimanual'] }),
        leaf('recover-a-jumped-wire', 'Recover: a wire jumped its peg', 'Put it back before the next lead goes on top of it.', { fail: true, notes: 'Left one lead too long, it is buried and the fix becomes a strip-back.' }),
      ]),
      node('breakouts', 'Branch and break out', 'Where the harness stops being one thing.', { dexterity: 5, precision: 5, contact: 5, saturation: 'empty', prev: 'common' }, [
        leaf('separate-only-the-nominated-wires', 'Separate only the nominated wires', 'Pull a branch out of the trunk.', { cue: 'Everything not nominated stays in the trunk.' }),
        leaf('count-the-breakout-before-you-tape', 'Count the breakout population', 'Check a branch before committing.', { cue: 'The count matches.', verify: 'If it is wrong the extra wire goes back before any tape, not after.' }),
        leaf('hold-the-breakout-to-the-board-angle', 'Orient the breakout to the board angle', 'Set a branch angle.', { cue: 'Held at the drawn angle, usually ninety degrees, while it is fixed.' }),
        leaf('cinch-distal-to-the-node', 'Temporary-cinch distal to the node', 'Hold a branch while you work it.', { cue: 'The cinch sits where a future boot will not land on it.', notes: 'A temporary decision made against a part that is not there yet.' }),
        leaf('wrap-the-node-to-the-turn-count', 'Wrap the node for the specified turns', 'Fix a breakout.', { cue: 'The specified turns, torn at the end mark.' }),
        leaf('change-twist-inside-the-taped-zone', 'Change twist direction at the node', 'Reverse lay at a branch.', { cue: 'The change happens inside the taped zone, never a metre down the branch.' }),
        leaf('form-a-strain-relief-teardrop', 'Form a strain-relief teardrop', 'Build strain relief into a branch.', { cue: 'A tug lands on the wrap rather than on the contact.', verify: 'You pull the branch and feel where the load goes.' }),
        leaf('comb-sub-groups-toward-their-fixtures', 'Comb the breakout into sub-groups', 'Sort a branch by destination.', { cue: 'Each group parked toward its own fixture.' }),
        leaf('check-breakout-length-without-stealing', 'Check breakout length to the next fixture', 'Verify a branch reaches.', { cue: 'If it is short you do not steal length from the trunk by stretching.', notes: 'Stealing length is the fix that feels free and damages two things at once.' }),
        leaf('move-a-temporary-tie-off-the-boot-zone', 'Move a temporary tie off the boot zone', 'Clear the way for close-out.', { cue: 'It is off the zone before the boot goes anywhere near it.' }),
        leaf('recover-an-escaped-strand', 'Recover: a strand escaped the group', 'Re-collect it and tape the node again if it opened.', { fail: true }),
      ]),
      node('tie-dress', 'Tie and dress the bundle', 'Making a loose set of wires into one body with a defined shape.', { dexterity: 5, contact: 5, prev: 'common' }, [
        leaf('cable-tie-pitch', 'Tie a bundle at the specified pitch', 'Place ties along a run.', { cue: 'Every tie lands on its pitch mark and the heads all face the same way.', notes: 'Holds 62 hours. Pitch and head orientation are both callouts and both get eyeballed under time pressure.' }),
        leaf('gun-a-tie-and-stop-before-necking', 'Gun a cable-tie to tension', 'Tension a tie with a gun.', { cue: 'To the specified tension, then stop.', verify: 'If the jacket necks, that tie is too tight and comes off.', notes: 'The tool has a setting and the jacket has the truth. Overtension is a slow insulation failure.' }),
        leaf('flush-cut-the-tie-tail', 'Flush-cut the tie tail', 'Cut a tensioned tie flush at the head.', { cue: 'No spike is left for a hand or a boot to find.' }),
        leaf('start-a-lace-with-even-stitch-spacing', 'Start a lace or lock-stitch at the mark', 'Begin a laced run.', { cue: 'From the mark, with even stitch spacing.', dexterity: 5, skillYears: 'years' }),
        leaf('lock-a-lace-and-trim-the-stub', 'Finish and lock a lace', 'Complete a laced run.', { cue: 'Locked, with the tail trimmed to the specified stub.' }),
        leaf('recover-a-tie-that-necked-the-jacket', 'Recover: a tie necked the jacket', 'Cut it off, inspect the jacket, and retie at tension.', { fail: true }),
      ]),
      node('body', 'Work the board with your body', 'Two metres of reach, and a sequence of decisions about which side of it you are on.', { contact: 3, dexterity: 3, prim: ['locomote', 'reach'], saturation: 'empty', robotNow: 'no' }, [
        leaf('cross-body-reach-and-come-back-over', 'Cross-body reach to the far rail', 'Reach across the board.', { cue: 'You hook the peg and bring your shoulders back over the board rather than working extended.' }),
        leaf('walk-the-board-end-not-across-the-run', 'Walk around the board end', 'Get to the far side.', { cue: 'You go round rather than leaning across a finished run.', notes: 'A whole-body routing decision made to protect work that is already done. A head camera sees the destination and not the choice.' }),
        leaf('crouch-hook-then-stand-before-you-carry', 'Crouch to a low datum, then stand', 'Work the bottom of the board.', { cue: 'You are standing before you carry a tool anywhere.' }),
        leaf('two-person-pass-of-a-long-run', 'Two-person pass of a long run', 'Lay a run longer than one reach.', { cue: 'One holds the far end on the pegs while the other dresses the near trunk.', prim: ['bimanual', 'language'], notes: 'The person holding is doing nothing visible and is the reason the run keeps its shape.' }),
        leaf('kneel-only-for-the-low-datum', 'Kneel only for the low datum', 'Limit time at floor level.', { cue: 'You stand again; a whole branch is never built from a kneel.' }),
        leaf('stand-to-reach-without-the-frame', 'Stand to reach a high rail', 'Work the top of the board.', { cue: 'The peg is hooked without standing on the board frame.' }),
        leaf('shoulder-turn-and-walk-the-trunk', 'Shoulder-turn while dressing', 'Move along a run while working it.', { cue: 'You walk the trunk rather than twisting a finished node to reach.' }),
        leaf('recover-a-node-disturbed-by-a-reach', 'Recover: a finished node was disturbed by a reach across it', 'Re-dress it to the form line before carrying on, rather than at the end.', { fail: true, notes: 'The damage is done by the shortcut that saved the walk, and it compounds if it is left until later.' }),
      ]),
      node('release-board', 'Release and transfer the harness', 'Getting a finished harness off the board without changing its shape.', { horizon: 'medium', prev: 'common' }, [
        leaf('release-retainers-only-after-tie', 'Release retainers only after tying', 'Free the harness from the board.', { cue: 'The run is tied or taped first, so the bundle cannot explode off the pegs.', notes: 'The single most expensive ordering error on a formboard, and it is one decision.' }),
        leaf('lift-the-harness-as-one-piece', 'Lift the finished harness off the pegs', 'Take a harness off the board.', { cue: 'As one piece, with no branch taking the whole weight.', contact: 5, prim: ['bimanual'] }),
        leaf('ready-state-at-the-board', 'Leave a ready state at the board', 'Close out the build.', { cue: 'Heat gun parked, last tie cut, the last connector in or out of its fixture as intended, both hands clear.', verify: 'All of it is checked rather than assumed, because the next build starts from what you left.', horizon: 'short' }),
        leaf('recover-a-bundle-that-sprang-off-the-pegs', 'Recover: the bundle sprang off the pegs', 'Re-lay it to the form line rather than tying it where it landed.', { fail: true }),
      ]),
    ]),

    node('protect', 'Protection and over-braid', 'Everything that goes over the bundle: loom, tape, braid, shrink, clamps.', { dexterity: 4, contact: 5, prim: ['deform', 'tool'] }, [
      node('loom-conduit', 'Sleeve the bundle into loom', 'Sleeving a bundle into corrugated or split convoluted tube.', { prev: 'common' }, [
        leaf('dress-corrugated-loom', 'Dress a bundle into corrugated loom', 'Sleeve a run into split convolute.', { cue: 'The split faces the specified way and the bundle sits fully inside along the whole length.', notes: 'Holds 48 partner hours from the OEM loom line.' }),
        leaf('work-conduit-to-the-panel-exit-mark', 'Work conduit to the panel-exit mark', 'Bring a sleeve to its termination.', { cue: 'The end seats in the specified fitting, at the mark.' }),
        leaf('seat-a-grommet-at-the-panel-exit', 'Install a grommet at the panel exit', 'Protect a bundle at a bulkhead.', { cue: 'The edge cannot reach the bundle anywhere around the hole.' }),
        leaf('open-a-clamp-and-latch-it-on-the-bundle', 'Seat a bundle in a clamp saddle', 'Close a cushioned clamp.', { cue: 'The bundle is in the saddle and the latch clicks.' }),
        leaf('close-a-p-clip-on-the-bundle-not-a-stray', 'Close a P-clip on the bundle', 'Fit a P-clamp.', { cue: 'On the whole bundle, never pinching a single stray against the clip.', verify: 'You run a finger round the clip before the fastener goes in.' }),
        leaf('recover-a-wire-pinched-in-a-clamp', 'Recover: a wire was pinched in a clamp', 'Open it, re-seat the bundle and inspect the jacket before reclosing.', { fail: true }),
      ]),
      node('tape-wrap', 'Tape wrap a bundle', 'Half-lap and spot taping for abrasion and bundling.', { dexterity: 5, prev: 'common' }, [
        leaf('start-a-wrap-at-the-mark-to-pitch', 'Start a tape wrap at the mark', 'Begin a wrap.', { cue: 'From the start mark, overlapping at the specified pitch.' }),
        leaf('tear-at-the-end-mark-and-wipe-it-down', 'Tear tape at the end mark', 'Finish a wrap.', { cue: 'At the end mark, with the last edge wiped down so it cannot lift.' }),
        leaf('recover-a-wrap-that-drifted-off-pitch', 'Recover: a wrap drifted off pitch', 'Strip it back to the mark and rewrap rather than correcting the pitch mid-run.', { fail: true }),
      ]),
      node('braid-shrink', 'Braid, shield and heat shrink', 'Expandable braid, shielding and moulded transitions.', { prev: 'uncommon', precision: 5 }, [
        leaf('align-a-drain-at-the-shield-term-mark', 'Align a drain at the shield-term mark', 'Terminate a shield.', { cue: 'At the mark, with the drain kept off the signal pair.' }),
        leaf('work-a-braid-to-the-transition', 'Work a braid to the transition', 'Bring braid to its termination.', { cue: 'It reaches the transition without the end fraying out.' }),
        leaf('seal-a-braid-end-against-unravelling', 'Seal a braid end', 'Fix a cut braid end.', { cue: 'Hot-knifed or sealed so it cannot unravel on the next pull.', contact: 4 }),
        leaf('sit-a-solder-ring-on-the-conductors', 'Position a solder sleeve over a splice', 'Place a solder sleeve.', { cue: 'The solder ring sits on the conductors, not on insulation.', precision: 5, notes: 'Half a millimetre decides whether the joint is a joint. It is invisible once the sleeve recovers.' }),
        leaf('recover-a-sleeve-then-take-the-heat-off', 'Recover a solder sleeve with heat', 'Complete a sleeved splice.', { cue: 'The solder flows and the adhesive wets both jackets.', verify: 'Then the heat comes off. Holding it longer degrades the joint you just made.' }),
        leaf('recover-a-sleeve-that-did-not-flow', 'Recover: the solder ring did not flow', 'Cut the sleeve off and start again; reheating a part-flowed ring will not finish it.', { fail: true }),
      ]),
    ]),

    node('test', 'Test and verification', 'Proving the harness before it leaves the cell.', { contact: 2, precision: 3, prim: ['inspect', 'insert'], prev: 'common' }, [
      node('continuity', 'Run a continuity test', 'Mating a harness to a test adapter and reading the result.', { robotNow: 'partial', capital: 'mid' }, [
        leaf('mate-test-adapter', 'Mate a harness to a test adapter', 'Connect a harness to a test rig.', { cue: 'Fully mated at both ends before the test is started.', verify: 'A failed test is checked at the adapter before it is believed about the harness.', notes: 'Holds 24 hours. Most first-run test failures are the adapter.' }),
        leaf('probe-a-pair-at-both-ends-then-move-on', 'Continuity-probe a pair at both ends', 'Verify one circuit.', { cue: 'Both ends done before you move to the next pair.', notes: 'Finishing each pair before starting the next is what stops a half-checked harness from looking checked.' }),
        leaf('recover-a-fail-that-was-the-adapter', 'Recover: the fail was the adapter', 'Reseat and retest before anyone opens the harness.', { fail: true }),
      ]),
      node('hipot-pull', 'Hipot and pull test', 'Destructive and semi-destructive verification.', { capital: 'mid', prev: 'uncommon' }, [
        leaf('set-up-a-hipot-and-stand-clear', 'Set up a hipot and stand clear', 'Run an insulation test on a harness.', { cue: 'Leads landed, then both hands off before the test runs.', partner: 'site' }),
        leaf('pull-test-a-sample-crimp', 'Pull-test a sample crimp', 'Destructively verify a crimp.', { cue: 'It reaches the specified force before anything moves.', contact: 5 }),
        leaf('recover-a-pull-test-below-spec', 'Recover: a sample pulled below spec', 'Quarantine back to the last good sample rather than retesting until one passes.', { fail: true, notes: 'Retesting until it passes is the failure. The correct action is to widen the suspicion.' }),
      ]),
      node('visual-inspect', 'Inspect crimps and dimensions', 'The human sensor pass before packing.', { contact: 1, prim: ['inspect'] }, [
        leaf('verify-stripe-sequence-before-covering', 'Verify colour or stripe sequence', 'Check a multi-core before it is hidden.', { cue: 'Checked before the jacket is covered, which is the last moment it can be seen.' }),
        leaf('inspect-a-crimp-window', 'Inspect a crimp through the window', 'Visually verify a termination.', { cue: 'Conductor visible in the window with the jacket stopping where it should.' }),
        leaf('recover-a-harness-that-failed-inspection', 'Recover: inspection found a defect', 'Route it to rework with the defect marked, rather than fixing it on the pack bench.', { fail: true }),
      ]),
    ]),

    node('rework', 'Rework, ECO and field repair', 'Changing a harness that already exists, which is where the human advantage actually lives.', { horizon: 'long', dexterity: 5, contact: 5, skillYears: 'years', robotNow: 'no', saturation: 'empty', prim: ['recover', 'inspect', 'deform'], prev: 'common' }, [
      node('eco-change', 'Change a harness that is already built', 'Adding, removing or re-routing wires after the fact.', {}, [
        leaf('rewrap-from-the-mark-not-over-a-mess', 'Rewrap a short or dirty tape job', 'Redo a wrap.', { cue: 'Stripped back to the mark and rewrapped, never three extra turns over a mess.', fail: true }),
        leaf('swap-a-nicked-lead-all-the-way-out', 'Swap a nicked lead from the kit', 'Replace a damaged conductor.', { cue: 'The damaged one comes all the way out of the bundle, not cut off and left in.', fail: true, notes: 'A dead conductor left inside the loom is weight, bulk and a future diagnostic dead end.' }),
        leaf('add-a-wire-to-a-closed-bundle', 'Add a wire to a closed bundle', 'Route a new conductor into finished work.', { cue: 'The bundle is opened to the node and reclosed, rather than the wire being taped along the outside.', fail: true }),
      ]),
      node('field-repair', 'Repair a harness in the machine', 'Repairing a harness in the machine, not on a bench.', { partner: 'site', dexterity: 5, prev: 'common' }, [
        leaf('repair-in-place-without-a-fixture', 'Repair a termination in place', 'Work a connector inside a machine.', { cue: 'Done without a fixture, in the position the machine allows.', contact: 5, notes: 'Every fixture assumption in the whole domain disappears here. This is the hardest thing in d11 and the least recorded.' }),
        leaf('support-a-harness-you-cannot-see', 'Support a harness you cannot see', 'Work by feel behind a panel.', { cue: 'Held so the joint is not taking the weight while you work it.' }),
        leaf('recover-a-repair-that-will-not-reach', 'Recover: the repair will not reach', 'Splice in a section rather than pulling the run tight to make it meet.', { fail: true }),
      ]),
      node('injected-fault', 'Inject a fault and recover it', 'Deliberately created faults, for data rather than for production.', { repetition: 'batched', saturation: 'empty', notes: 'This is the cheapest way to buy recovery data: build it wrong on purpose, then film the fix.' }, [
        leaf('inject-wrong-pin', 'Inject a wrong-pin fault and recover it', 'Build a known cavity error, then find and fix it.', { cue: 'The wrong contact is extracted and relanded with the cavity latch intact.', fail: true, notes: 'Holds 19 hours. Manufactured recovery data, which is the only kind anybody has.' }),
        leaf('inject-missing-seal', 'Inject a missing-seal fault and recover it', 'Build a known seal omission, then find and fix it.', { cue: 'The seal is fitted and the contact reseated to its lock.', fail: true, notes: 'Holds 11 hours.' }),
        leaf('inject-a-swapped-pair', 'Inject a swapped pair and recover it', 'Build a known crossed pair, then find and fix it.', { cue: 'Found at test, traced to the cavity, and relanded with the twist restored.', fail: true }),
      ]),
    ]),

    node('pack', 'Label, coil and pack', 'The unglamorous end of the cell that nobody films.', { dexterity: 3, contact: 3, precision: 2, skillYears: 'none', robotNow: 'partial', prev: 'common' }, [
      node('labelling', 'Label wires and harnesses', 'Putting identity on wire and harness.', { repetition: 'high-takt' }, [
        leaf('apply-wire-marker', 'Apply a wire marker', 'Fit an identity marker to a conductor.', { cue: 'At the specified offset, reading the same way as its neighbours.', notes: 'Holds 21 partner hours.' }),
        leaf('flag-a-wire-id-at-the-offset', 'Flag a wire ID at the specified offset', 'Mark a lead during build.', { cue: 'At the offset from the face, so it is still readable after the boot goes on.' }),
        leaf('burnish-a-wrap-label-at-the-offset', 'Apply and burnish a wrap label', 'Fit a wrap-around label.', { cue: 'At the specified distance from the connector face.', verify: 'Burnished down, because the edge is what lifts in oil.' }),
        leaf('seat-a-flag-so-it-cannot-slide', 'Seat a printed flag', 'Fit a flag tag.', { cue: 'It cannot slide under a tie and disappear.' }),
        leaf('recover-a-marker-that-lifted', 'Recover: a marker lifted or went missing', 'Remark from the drawing before it ships, not after somebody needs it.', { fail: true }),
      ]),
      node('coil-pack', 'Coil, bag and box', 'Coiling to a spec diameter and packing without kinking.', {}, [
        leaf('coil-to-diameter-and-tie-the-coil', 'Coil the harness to the specified diameter', 'Coil a finished harness.', { cue: 'To diameter, tied so the coil cannot spring.' }),
        leaf('bag-tag-and-nest-it', 'Bag, tag and nest the finished harness', 'Pack a completed build.', { cue: 'Bagged, tagged, and set in the nest rather than on a pile of pegs.' }),
        leaf('recover-a-coil-that-kinked', 'Recover: the harness kinked in the coil', 'Uncoil, work the kink out and recoil to diameter.', { fail: true }),
      ]),
    ]),
  ],
)
