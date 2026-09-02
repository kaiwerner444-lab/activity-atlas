import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// The domain where almost every success condition is a state you cannot see.
//
// A valve half open and a valve fully open present the same handle to a camera.
// A blind fitted the right way round and the wrong way round are the same disc
// on the same flange. A lock hung on a valve and a lock hung on a valve that was
// then tried are the same photograph. This plant runs on positions, orientations
// and proofs, and the proof is almost always a pull: tug the gate, tug the clip,
// tug the hose, tug the bond, try the handle, try the jog.
//
// So this file carries the highest tug-and-try density in the atlas. That is not
// stylistic. It is the observation that in a process plant the verification step
// is a distinct physical act with its own force signature, and it is exactly the
// act that gets cut when somebody is behind on a batch.
//
// Prevalence sits at `uncommon` for the domain, which is honest rather than
// dismissive: there are far fewer batch operators than cooks. The universal
// parts, stairs and valves and hoses and drums, are lifted back to `common`
// because they are the same motions across all of heavy industry.
//
// Rights are `ip-hot` throughout. The recipe, the charge sequence and the P&ID
// are the asset, which makes this one of the hardest domains in the atlas to get
// a camera into and one of the emptiest as a result.

export const d12: NodeSpec = node(
  'd12',
  'Process and batch plant',
  'Climb, valve, flange, charge, sample and lock. Done means the valve is in a known state, the lock is on, or the load is landed.',
  {
    setting: 'industrial',
    dexterity: 3,
    precision: 3,
    contact: 4,
    horizon: 'medium',
    repetition: 'batched',
    capital: 'capex',
    partner: 'site',
    skillYears: 'months',
    suit: 'excellent',
    robotNow: 'no',
    embodiment: ['ego', 'suit'],
    saturation: 'empty',
    ours: 'none',
    rights: 'ip-hot',
    ethics: 'open',
    prev: 'uncommon',
    prim: ['tool', 'locomote', 'inspect', 'fasten'],
  },
  [
    node('access', 'Climb, grating and openings', 'Getting to the work, on structures that are mostly holes.', { contact: 3, dexterity: 2, prim: ['locomote', 'grasp'], prev: 'common' }, [
      node('stairs', 'Towers and stairs', 'Vertical movement with your hands committed.', { horizon: 'short' }, [
        leaf('climb-with-a-hand-on-the-rail', 'Climb tower stairs with a hand on the rail', 'Ascend with tools.', { cue: 'One hand stays on the rail; tools ride in a bag or the free hand, never a sample bottle in a climbing hand.', notes: 'A hand-allocation constraint over a locomotion task. What is in which hand is the whole content and it is invisible from behind.' }),
        leaf('descend-facing-the-treads', 'Descend facing the treads', 'Come down a plant stair.', { cue: 'You keep the rail until both feet are on the landing.' }),
        leaf('carry-a-cylinder-up-with-the-valve-protected', 'Carry a keg or small cylinder up stairs', 'Move a pressure vessel by hand.', { cue: 'One hand on the rail and the valve protected the whole way.', contact: 5, prev: 'uncommon' }),
        leaf('recover-a-hand-committed-on-a-stair', 'Recover: both hands ended up full on a stair', 'Set the load down on the landing and re-split it rather than finishing the flight.', { fail: true }),
      ]),
      node('walkways', 'Gates, grating and openings', 'Moving across a surface that is not continuous.', { prim: ['locomote', 'inspect'] }, [
        leaf('latch-a-handrail-gate-and-tug-it', 'Open, pass and latch a handrail gate', 'Work a self-closing gate.', { cue: 'It is closed.', verify: 'You tug it once and it holds.' }),
        leaf('harness-buckles-seated-clip-tugged', 'Fit a harness and clip the lanyard', 'Rig for fall arrest.', { cue: 'Every buckle is seated and the lanyard is on the specified anchor.', verify: 'You tug the clip before you commit weight to it.', dexterity: 4, contact: 4, partner: 'licensed', skillYears: 'months' }),
        leaf('walk-the-designated-grating-path', 'Walk grating on the designated path', 'Cross a perforated deck.', { cue: 'You stay off unmarked openings and loose panels.', notes: 'The hazard is a panel that looks identical to every other panel and is not fixed down.' }),
        leaf('recover-a-grating-panel-that-moved', 'Recover: a grating panel moved underfoot', 'Step back onto solid deck and mark the panel before anyone else crosses it.', { fail: true, prim: ['locomote', 'language'] }),
      ]),
      node('openings', 'Manways and floor openings', 'Things you take off and have to put somewhere.', { contact: 5, dexterity: 3 }, [
        leaf('open-a-manway-and-park-the-cover', 'Open a manway and park the cover', 'Take a vessel cover off.', { cue: 'The cover is set where it cannot fall in or roll off the platform.', prim: ['transfer', 'bimanual'] }),
        leaf('pull-a-grate-and-set-it-clear', 'Pull a grate and set it clear of the pit', 'Lift a floor grating panel.', { cue: 'It is set where it cannot drop into the pit it came out of.' }),
        leaf('recover-a-cover-that-started-to-roll', 'Recover: a cover started to roll', 'Let it go and step clear rather than reaching after it.', { fail: true, notes: 'The instinct is to catch a heavy disc on edge. The correct action is to move.' }),
      ]),
    ]),

    node('joints', 'Flanges, blinds and spools', 'Breaking and remaking pressure joints, and the discs that decide what is connected to what.', { precision: 4, contact: 5, dexterity: 4, prev: 'uncommon', skillYears: 'months' }, [
      node('blinds', 'Blinds and spectacles', 'A position that is the difference between isolated and not.', { prim: ['inspect', 'transfer'] }, [
        leaf('fit-a-blind-so-the-tab-reads-right', 'Fit a blind so the tab shows its face', 'Install a blanking disc.', { cue: 'The handle or tab shows the specified face and cannot be read as the opposite from the walkway.', notes: 'The disc is symmetric and the consequence is not. Orientation is the entire safety function and is unreadable in most camera angles.' }),
        leaf('pull-a-blind-and-rack-it', 'Pull a blind and park it', 'Remove a blanking disc.', { cue: 'It is on the specified hook or rack, never left on the grating as a trip.' }),
        leaf('swing-a-spectacle-to-the-intended-face', 'Swing a spectacle to the specified face', 'Rotate a spectacle blind.', { cue: 'It is at the detent.', verify: 'You confirm the open or the blank showing is the one you wanted, read off the plate rather than remembered.' }),
        leaf('recover-a-blind-fitted-the-wrong-way', 'Recover: a blind went in the wrong way round', 'Break the joint and refit it; a blind that reads wrong is not corrected with a note.', { fail: true, notes: 'The cheap fix is to document it. The only fix is to strip the joint.' }),
      ]),
      node('gasketry', 'Gaskets and torque', 'Making a joint that will hold.', { precision: 5 }, [
        leaf('centre-a-gasket-dry-faced', 'Fit a gasket centred on the flange', 'Set a gasket before closing a joint.', { cue: 'It is centred and dry-faced as specified.', verify: 'If it folds anywhere on the circumference it is replaced, not straightened.' }),
        leaf('star-torque-through-the-passes', 'Star-torque a flange through the passes', 'Bring a bolted joint up to specification.', { cue: 'You stop on the spec, not on tight.', notes: 'Snugging one bolt fully first cocks the gasket and is the most common way a joint that was assembled correctly still leaks.' }),
        leaf('close-a-manway-even-across-the-cover', 'Close a manway in a star pattern', 'Refit a vessel cover.', { cue: 'The cover pulls down even; no bolt goes home before the others are started.', contact: 5 }),
        leaf('recover-a-joint-that-leaked-on-test', 'Recover: the joint leaked on test', 'Depressurise, strip the gasket and remake rather than adding torque.', { fail: true, notes: 'Tightening a leaking flange under pressure is the wrong action that feels like the obvious one.' }),
      ]),
      node('spools', 'Spools and rigging', 'Getting a piece of pipe into position.', { contact: 5, prim: ['bimanual', 'language'], capital: 'mid' }, [
        leaf('land-a-spool-and-start-nuts-by-fingers', 'Fit a spool with a partner', 'Install a pipe section between two flanges.', { cue: 'Both flanges are on the studs and every nut starts by fingers before any torque.' }),
        leaf('rig-a-chain-fall-slack-out', 'Rig a chain fall and take the slack out', 'Set up a manual hoist.', { cue: 'The hook is on the intended point and the slack is out before any load comes on.', prim: ['tool'] }),
        leaf('inch-off-the-deck-and-check-the-rig', 'Inch a load off the deck and stop', 'Take first weight on a rig.', { cue: 'It comes up just clear, then stops.', verify: 'The rig is checked at that height before it goes any higher.', notes: 'A deliberate pause a few millimetres into a lift. It reads as hesitation and it is the check.' }),
        leaf('land-a-spool-on-blocking', 'Land a spool on blocking', 'Set a pipe section down.', { cue: 'Both flanges are supported and the chain fall is slack before anyone lets go.' }),
        leaf('recover-flanges-that-will-not-meet', 'Recover: the flange faces will not pull together', 'Set it back on blocking and re-rig rather than drawing it up on the studs.', { fail: true, contact: 5, notes: 'Pulling misalignment out with the bolts loads the joint permanently and it will leak later, somewhere else.' }),
      ]),
    ]),

    node('valves', 'Valves and isolation', 'Putting a flow path into a state somebody else can read from the walkway.', { dexterity: 3, contact: 4, precision: 3, prev: 'common' }, [
      node('operating', 'Operate a valve', 'Opening and closing, which is not the same as turning a handle.', { horizon: 'short' }, [
        leaf('crack-and-watch-downstream', 'Crack a valve and watch downstream', 'Begin opening a valve.', { cue: 'You have watched the downstream before opening any further.', prim: ['inspect'], notes: 'The rate limit on your own hand is set by an observation somewhere else. That coupling is not visible in the manipulation.' }),
        leaf('open-full-then-back-off-handle-visible', 'Open a valve full and back off', 'Set a valve to fully open.', { cue: 'Backed off the specified turn if that is the house rule, with the handle left where its position can be read.' }),
        leaf('close-a-valve-and-feel-the-seat', 'Close a valve and feel the seat', 'Shut a valve.', { cue: 'The seat is felt, not assumed.', verify: 'If it will not seat you stop and isolate rather than leaning on the wheel.', contact: 5, notes: 'Force applied past the point of information is how a valve becomes unrepairable. The stop condition is tactile and has no visual signature.' }),
        leaf('recover-a-valve-that-will-not-seat', 'Recover: a valve will not seat', 'Back off and isolate upstream rather than forcing the wheel.', { fail: true }),
      ]),
      node('leverage', 'Leverage and remote operators', 'Valves you cannot turn by hand.', { contact: 5, dexterity: 2 }, [
        leaf('handle-extension-face-off-the-stem', 'Fit a handle extension and turn it', 'Increase leverage on a stiff valve.', { cue: 'Your face stays off the line of the stem throughout.', notes: 'A body-position constraint that only matters in the failure case, which is why it decays.' }),
        leaf('chain-wheel-to-the-indicator', 'Pull a chain wheel to the indicated state', 'Operate a high valve from the deck.', { cue: 'You stop when the indicator matches the intended state, not when the chain gets heavy.', prim: ['tool', 'inspect'] }),
        leaf('recover-an-extension-that-slipped', 'Recover: the handle extension slipped off', 'Refit it and shorten the reach rather than adding more bar.', { fail: true, contact: 5 }),
      ]),
      node('locking', 'Lock and prove', 'Making a state that cannot change behind you.', { partner: 'licensed', skillYears: 'years' }, [
        leaf('lock-a-valve-and-try-the-handle', 'Fit a lock on a valve', 'Secure a valve position.', { cue: 'The lock is on.', verify: 'You try the handle and confirm it cannot move. Hanging a lock and hanging a lock then trying it are the same photograph.' }),
        leaf('block-and-bleed-then-prove-dead', 'Block, bleed and prove the cavity', 'Isolate a section before breaking into it.', { cue: 'Both blocks are shut and the bleed is open.', verify: 'The cavity is proven dead before the joint is broken.', contact: 3, prim: ['inspect'] }),
        leaf('blow-down-off-the-plume-line', 'Take a blow-down stance and open', 'Vent a pressurised line.', { cue: 'You are faced off the vent before it opens; nobody stands in the plume.', prim: ['locomote'] }),
        leaf('recover-a-lock-on-the-wrong-position', 'Recover: the lock went on with the valve in the wrong position', 'Remove it, reposition, relock and try the handle again from the start.', { fail: true, prim: ['recover', 'inspect'] }),
      ]),
    ]),

    node('sampling', 'Sampling', 'Small careful work at a tap that is usually hot, cold or aggressive.', { dexterity: 5, precision: 4, contact: 3, horizon: 'short', prev: 'uncommon', prim: ['grasp', 'transfer', 'inspect'] }, [
      node('take-a-sample', 'Take the sample', 'Flush, catch, cap.', {}, [
        leaf('flush-the-line-to-waste-first', 'Flush the sample line to waste', 'Clear stagnant material before sampling.', { cue: 'The flush goes to the specified waste and finishes before the bottle comes in.', notes: 'Sampling the dead leg instead of the process is a silent failure. The two acts look identical and one of them is worthless.' }),
        leaf('bottle-below-the-tap', 'Sample from a tap into the bottle', 'Fill a sample bottle.', { cue: 'The bottle stays below the tap throughout.' }),
        leaf('catch-without-overflow-cap-in-hand', 'Catch the sample without overflowing', 'Fill to level and stop.', { cue: 'The cap stays in your other hand the whole time, so it is never set down on the deck.', dexterity: 5 }),
        leaf('recover-a-sample-that-overflowed', 'Recover: the sample overflowed', 'Bin it, flush and retake rather than decanting to level.', { fail: true }),
      ]),
      node('handle-a-sample', 'Cap, carry and hood', 'Getting it to the lab in the state it left the tap.', { contact: 2 }, [
        leaf('cap-wipe-and-cage-it', 'Cap the sample, wipe it and cage it', 'Secure a filled bottle.', { cue: 'Capped, the outside wiped, and standing in the cage.' }),
        leaf('carry-a-cage-and-set-it-down-first', 'Carry a sample cage on the designated path', 'Move samples through a plant.', { cue: 'The cage is down on a surface before any bottle is opened.', prim: ['locomote'] }),
        leaf('sample-in-the-hood-until-capped', 'Pull a sample inside a hood', 'Sample under local extraction.', { cue: 'The bottle stays inside the hood until it is capped.', partner: 'licensed' }),
        leaf('close-a-hood-on-its-gasket', 'Close the hood on its gasket', 'Shut a sample hood.', { cue: 'It closes onto the gasket.', verify: 'You confirm it is not being held open by a hose running under the sash.', notes: 'A hose across a gasket face is the classic reason a closed hood is not a closed hood.' }),
        leaf('recover-an-uncapped-bottle-in-the-cage', 'Recover: a bottle was found uncapped in the cage', 'Discard it and retake; a compromised sample reported as good is worse than no sample.', { fail: true, notes: 'The result is still a number, which is what makes this failure mode dangerous rather than merely wasteful.' }),
      ]),
    ]),

    node('charging', 'Charging and additives', 'Putting material into a vessel, which is where the batch is won or lost.', { contact: 4, dexterity: 4, horizon: 'medium', repetition: 'batched', prev: 'uncommon' }, [
      node('bulk-charge', 'Bags, drums and totes', 'Bulk material in.', { contact: 5, prim: ['transfer', 'bimanual'] }, [
        leaf('charge-a-bag-and-close-the-hatch', 'Charge a bag into a hatch', 'Empty a bag into a vessel.', { cue: 'The last of it is shaken out and the hatch is closed before you walk.' }),
        leaf('charge-a-drum-holding-the-lance', 'Charge a drum with a lance', 'Transfer from a drum by suction lance.', { cue: 'The lance is held in the drum so it cannot whip out.', notes: 'A whipping lance sprays the contents of the drum across the operator. Holding it is a continuous low-effort act with no discrete moment to record.' }),
        leaf('couple-a-tote-and-tug-the-hose', 'Couple a tote', 'Connect a tote for transfer.', { cue: 'Both camlock arms are closed.', verify: 'You tug the hose before opening anything.' }),
        leaf('uncouple-over-containment-and-cap', 'Uncouple a tote over containment', 'Disconnect after transfer.', { cue: 'You are over containment, the drip is caught, and both ends are capped.' }),
        leaf('fit-a-dip-pipe-and-lock-the-depth', 'Fit a dip pipe to depth', 'Set an immersion pipe.', { cue: 'It is at the specified depth and locked so it cannot ride up under flow.', precision: 4 }),
        leaf('recover-a-coupling-that-let-go', 'Recover: a coupling let go under transfer', 'Shut the source valve first, then deal with what is on the floor.', { fail: true, contact: 4, prim: ['locomote', 'recover'], notes: 'The instinct is to go to the spill. The order that matters is source first.' }),
      ]),
      node('additives', 'Additives and sacks', 'Small quantities that decide the batch.', { precision: 5, dexterity: 5 }, [
        leaf('scoop-an-additive-and-cap-the-container', 'Scoop an additive to weight', 'Weigh out a minor ingredient.', { cue: 'On weight, and the source container is capped before you move.', prim: ['inspect'] }),
        leaf('dump-a-sack-face-out-of-the-puff', 'Dump a sack into a hatch', 'Empty a sack into a vessel.', { cue: 'Your face is out of the line of the dust puff as it goes in.', contact: 4 }),
        leaf('cut-shake-and-fold-a-sack', 'Cut a sack, shake it out and fold it', 'Finish with an emptied sack.', { cue: 'The empty is folded so it cannot blow across the plant.', prim: ['separate', 'deform'] }),
        leaf('recover-an-additive-over-weight', 'Recover: an additive went in over weight', 'Stop the charge and hold the batch rather than correcting it by eye.', { fail: true, prim: ['language'] }),
      ]),
      node('liners', 'Liners', 'A bag inside a container, which has two ways to end up inside it.', { dexterity: 4 }, [
        leaf('fit-a-liner-into-the-chime', 'Fit a liner in a drum or tote', 'Install a disposable liner.', { cue: 'The liner is in the chime and cannot fall in.' }),
        leaf('tie-a-liner-leaving-a-tail', 'Tie a liner leaving a tail', 'Secure a liner for filling.', { cue: 'Enough tail is left to close it after the fill.', notes: 'A requirement about a future step, decided now. Tying it short is unrecoverable once the container is full.' }),
        leaf('recover-a-liner-that-fell-in', 'Recover: the liner slipped into the container', 'Stop the fill; a liner in the product is a contamination event, not a retrieval job.', { fail: true }),
      ]),
    ]),

    node('vessel', 'Vessel internals and closures', 'The things inside the pot and the things that hold it shut.', { contact: 5, dexterity: 4, precision: 4, prev: 'uncommon', skillYears: 'months' }, [
      node('agitation', 'Mixers and impellers', 'Rotating mass in a confined space.', { partner: 'licensed' }, [
        leaf('lower-a-mixer-with-the-lift-locked', 'Lower a mixer into the batch', 'Bring an agitator down into a vessel.', { cue: 'The lift is locked before anyone releases it, and it is never jogged with a hand on the shaft.', contact: 5 }),
        leaf('raise-and-lock-a-mixer-out', 'Raise a mixer and lock it out', 'Bring an agitator clear.', { cue: 'It is locked in the out position before anybody leans over the batch.' }),
        leaf('fit-an-impeller-on-the-key', 'Fit an impeller on its key', 'Mount an impeller to a shaft.', { cue: 'It is on the specified key and tight.', verify: 'You confirm it cannot spin on the shaft before power goes anywhere near it.' }),
        leaf('recover-a-jog-with-a-hand-on-the-shaft', 'Recover: an agitator was jogged with a hand on the shaft', 'Stop, isolate, and account for every person before anything moves again.', { fail: true, prim: ['language', 'recover'], partner: 'licensed' }),
      ]),
      node('closures', 'Clamps and relief', 'What keeps the pressure in, and what lets it out.', { precision: 5, prim: ['fasten'] }, [
        leaf('dog-down-every-lid-clamp', 'Fit a lid clamp and dog it down', 'Close a clamped vessel lid.', { cue: 'Every clamp is on, not three of four.', verify: 'You count them round the lid rather than judging it by eye.', notes: 'The count is the whole content. A lid with one clamp missing looks closed from every angle.' }),
        leaf('fit-a-burst-disc-the-right-way-up', 'Fit a burst disc in orientation', 'Install a rupture disc.', { cue: 'The specified orientation, with the holder torqued to spec.', partner: 'licensed', notes: 'Reversed, it holds until it does not. There is no feedback at the time of the mistake.' }),
        leaf('recover-a-disc-fitted-reversed', 'Recover: a burst disc went in reversed', 'Strip and replace it; a reversed disc is scrap, not something to turn over.', { fail: true }),
      ]),
    ]),

    node('hoses', 'Hoses, couplings and instruments', 'Temporary connections, and the small threaded things that read the plant.', { dexterity: 4, contact: 4, precision: 4, prev: 'common' }, [
      node('couplings', 'Camlocks and routing', 'A connection made by hand that holds pressure.', { prim: ['fasten', 'bimanual'] }, [
        leaf('fit-a-hose-and-inspect-the-gasket', 'Fit a hose with camlocks', 'Connect a flexible hose.', { cue: 'The gasket is inspected before the arms go over.' }),
        leaf('close-camlock-arms-until-they-lie-flat', 'Close both camlock arms flat', 'Secure a camlock connection.', { cue: 'Both arms lie flat.', verify: 'An arm that will not lie means the gasket is reset, not that the arm is forced.', notes: 'A proud arm is the visible symptom of a rolled gasket, and forcing it is what turns a leak into a release.' }),
        leaf('tug-the-hose-then-drip-loop-it', 'Tug the hose and route a drip loop', 'Prove and route a connection.', { cue: 'It cannot pop.', verify: 'The loop is routed so liquid runs to the low point rather than into the coupling.' }),
        leaf('drip-loop-clear-of-the-motor', 'Drip-loop clear of equipment', 'Route a hose so leakage lands safely.', { cue: 'Nothing can run into the coupling or onto a motor.' }),
        leaf('coil-a-hose-so-it-cannot-spring', 'Coil a hose on the rack', 'Stow a hose.', { cue: 'The coil cannot spring out into a walk path.', prim: ['deform'] }),
        leaf('recover-a-camlock-that-popped', 'Recover: a camlock arm popped under pressure', 'Isolate at the source before anyone approaches the hose end.', { fail: true, contact: 4 }),
      ]),
      node('instruments', 'Small instruments', 'Threaded and clamped things that have to be right.', { precision: 5, dexterity: 5 }, [
        leaf('seat-a-clamp-on-meter-both-halves', 'Fit a clamp-on meter', 'Install a strap-on instrument.', { cue: 'It is on the specified run and both halves are latched.' }),
        leaf('land-a-sensor-in-the-well', 'Fit a thermowell and land the sensor', 'Install a temperature element.', { cue: 'The sensor bottoms in the well, not on the thread.', notes: 'A sensor resting on the thread reads the pipe wall and looks entirely normal. Silent, plausible, wrong.' }),
        leaf('start-a-gauge-thread-by-fingers', 'Fit a pressure gauge', 'Install a threaded gauge.', { cue: 'Sealant on the male thread only, and the thread starts by fingers before any wrench.' }),
        leaf('purge-to-the-specified-setting', 'Fit a nitrogen purge and open it', 'Establish an inert purge.', { cue: 'Open to the specified feel or the specified regulator setting, not to a guess.', partner: 'licensed' }),
        leaf('recover-an-instrument-reading-that-drifted', 'Recover: an instrument disagreed with the sample', 'Suspect the sensor seat before you suspect the process.', { fail: true, prim: ['inspect', 'recover'], notes: 'Chasing a process problem that is actually a sensor sitting on a thread costs days.' }),
      ]),
    ]),

    node('solids', 'Chutes, bins and gates', 'Material that will not flow, and the ways people persuade it.', { contact: 5, dexterity: 3, prev: 'uncommon', skillYears: 'months' }, [
      node('unblocking', 'Persuade solids to move', 'Every one of these has a stand-off in it.', { prim: ['tool', 'locomote'] }, [
        leaf('rod-a-chute-standing-off-the-drop', 'Rod a chute from the specified door', 'Clear a blocked chute.', { cue: 'You are off the drop line when it lets go.', notes: 'A hung bed of solids releases all at once. Where the body is standing is the only thing that matters and nothing about the rodding motion shows it.' }),
        leaf('hammer-rap-only-on-the-pad', 'Hammer-rap a line on its pad', 'Free material by percussion.', { cue: 'The blow lands on the specified pad, never on a weld or a valve body.' }),
        leaf('vibrate-a-bin-off-the-dust', 'Vibrate a bin with the specified tool', 'Apply a vibrator to a hopper.', { cue: 'You stand off the dust when it breaks free.' }),
        leaf('recover-a-hung-bed-that-let-go', 'Recover: a hung bed released all at once', 'Step clear and let it run; nothing reaches in to slow it.', { fail: true, contact: 5, prim: ['locomote'] }),
      ]),
      node('gates', 'Gates and socks', 'Controlling a flow of solids.', { dexterity: 4 }, [
        leaf('open-a-slide-gate-and-watch-the-flow', 'Open a slide gate and watch it', 'Start a solids flow.', { cue: 'You stop if the flow is not the one you intended.', prim: ['inspect'] }),
        leaf('close-a-slide-gate-and-pin-it', 'Close a slide gate and pin it', 'Shut and secure a gate.', { cue: 'The pin is in, so it cannot drift open behind you.' }),
        leaf('clamp-a-sock-on-a-fill', 'Fit and clamp a sock on a fill', 'Connect a flexible fill sleeve.', { cue: 'The clamp is on so dust cannot blow at the connection.' }),
        leaf('tie-a-sock-so-it-cannot-slip', 'Tie the sock', 'Secure a fill sleeve.', { cue: 'It is tied.', verify: 'You check the tie cannot slip once the fill starts and the sleeve goes taut.' }),
        leaf('recover-a-gate-that-drifted-open', 'Recover: a pinned gate was found drifting open', 'Close it, find why the pin did not hold, and fix that rather than repinning it.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
    ]),

    node('drums', 'Drums, totes and bonding', 'Containers on a floor, and the static that comes with moving them.', { contact: 5, dexterity: 3, prev: 'common' }, [
      node('drum-handling', 'Move and open a drum', 'Two hundred kilograms on a rim.', { prim: ['locomote', 'bimanual'], skillYears: 'months' }, [
        leaf('drum-truck-and-set-the-chime-down', 'Drum-truck a drum and set it down', 'Move a drum on a truck.', { cue: 'The chime lands under control; the drum never walks off the truck.' }),
        leaf('upend-a-drum-feet-clear-of-the-chime', 'Upend a drum', 'Tip a drum onto its base.', { cue: 'The specified tilt, with your feet out from under the chime.' }),
        leaf('open-a-bung-without-dropping-it', 'Open a bung with the specified wrench', 'Remove a drum closure.', { cue: 'The bung does not fall into the drum.', dexterity: 5, notes: 'Retrieving a bung from a full drum is a job that did not need to exist.' }),
        leaf('recover-a-drum-that-walked-off-the-truck', 'Recover: a drum walked off the truck', 'Let it go and clear your feet; nothing is worth catching two hundred kilograms on a rim.', { fail: true, contact: 5, notes: 'The right action is to lose the drum. Every instinct and every efficiency measure says otherwise.' }),
      ]),
      node('pumps-and-valves', 'Pumps and IBC valves', 'Getting liquid back out.', { dexterity: 4, precision: 4 }, [
        leaf('lower-a-pump-tube-to-height', 'Fit a pump tube to the inlet height', 'Set a drum pump.', { cue: 'The inlet sits at the specified height off the bottom.' }),
        leaf('lower-a-pump-and-tug-the-lock', 'Lower a pump onto its seat and lock it', 'Secure a pump in a container.', { cue: 'It sits.', verify: 'You tug the lock before it takes any hose load.' }),
        leaf('open-an-ibc-valve-over-containment', 'Open an IBC valve over containment', 'Start a gravity discharge.', { cue: 'You are over containment and you watch the first liquid before opening further.' }),
        leaf('land-a-pallet-tank-valve-side-out', 'Land a pallet tank on the mark', 'Place an IBC.', { cue: 'All four corners sit and the valve faces the specified side.', prim: ['transfer'] }),
        leaf('recover-a-pump-that-ran-dry', 'Recover: a drum pump ran dry', 'Stop it and reset the inlet height rather than tilting the drum to keep it going.', { fail: true, prim: ['recover'] }),
      ]),
      node('bonding', 'Earthing and splash protection', 'Static, which is the reason this family exists.', { precision: 3, partner: 'licensed', prim: ['inspect', 'fasten'] }, [
        leaf('clip-a-ground-on-bare-metal-and-tug', 'Clip a ground clamp on bare metal', 'Earth a container.', { cue: 'On bare metal.', verify: 'You tug it; a clamp sitting on paint is moved, not accepted.', notes: 'A clamp on paint is mechanically perfect and electrically nothing. The two are the same image.' }),
        leaf('bond-between-vessels-and-tug-both', 'Clip a bond between two vessels', 'Bond two containers before transfer.', { cue: 'Both ends are on bare metal.', verify: 'Both ends are tugged, not just the one you fitted last.' }),
        leaf('fit-a-splash-shield-before-opening', 'Fit a splash shield before you open', 'Set a shield ahead of a transfer.', { cue: 'It is in place.', verify: 'You confirm it would catch the first surge, not merely that it is mounted.' }),
        leaf('recover-a-bond-found-on-paint', 'Recover: a bond was found clamped to paint', 'Stop the transfer, move the clamp to bare metal and tug it before restarting.', { fail: true, partner: 'licensed', notes: 'The transfer was running with no bond at all. Nothing about the previous minutes looked wrong.' }),
      ]),
    ]),

    node('rotating', 'Rotating equipment and lube', 'Pumps, seals, couplings and the oil that keeps them.', { contact: 4, precision: 5, dexterity: 4, skillYears: 'years', prev: 'uncommon' }, [
      node('packing', 'Packing and seals', 'A leak you are aiming for, not one you are stopping.', { dexterity: 5 }, [
        leaf('adjust-a-gland-to-the-specified-drip', 'Adjust a packing gland to its drip', 'Set gland tension.', { cue: 'The specified drip: not dry and not a stream.', notes: 'The target is a controlled leak. Every intuition, and every reward a naive objective would give, says drive it to zero, which burns the packing and the shaft.' }),
        leaf('repack-in-the-specified-ring-order', 'Repack a valve in ring order', 'Renew gland packing.', { cue: 'The rings go in the specified order and the gland is left with take-up remaining.' }),
        leaf('grease-a-stem-then-wipe-it', 'Grease a stem until clean grease shows', 'Lubricate a valve stem.', { cue: 'Clean grease shows.', verify: 'The stem is wiped afterwards so grit cannot ride in on the next stroke.' }),
        leaf('recover-a-gland-driven-dry', 'Recover: a gland was driven dry', 'Back it off to the specified drip and check the stem for scoring before it runs again.', { fail: true, dexterity: 5 }),
      ]),
      node('machine-safety', 'Pin, jog and guard', 'The sequence before anybody reaches in.', { partner: 'licensed', contact: 3 }, [
        leaf('pin-an-agitator-and-try-the-jog', 'Fit a lock-pin on an agitator', 'Mechanically restrain a rotating element.', { cue: 'The pin is in before anyone leans into the space.', verify: 'The local jog is tried after the pin is in and it does not move. This is the clearest verify in the domain.', notes: 'Fitting a pin and fitting a pin then testing it against power are indistinguishable on video and are not the same act.' }),
        leaf('jog-locally-hands-clear-of-the-coupling', 'Jog a motor locally', 'Bump a motor from the local station.', { cue: 'The specified button, with both hands clear of the coupling.' }),
        leaf('fit-a-coupling-guard-and-hit-every-bolt', 'Fit a coupling guard', 'Restore guarding on rotating equipment.', { cue: 'Every fastener is in and hit.', verify: 'You count them; a missing bolt is not close enough.' }),
        leaf('align-a-coupling-then-lock-the-feet', 'Align a coupling and lock the feet', 'Set shaft alignment.', { cue: 'The feet are locked before alignment is declared.', verify: 'The reading is retaken after lock-down, because bolting it up moves it.', precision: 5 }),
        leaf('recover-a-guard-bolt-left-out', 'Recover: a guard went back a bolt short', 'Stop the machine and fit it; the count is redone from zero rather than resumed.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
      node('lube', 'Oil and levels', 'Small quantities read off a glass.', { precision: 4, dexterity: 3 }, [
        leaf('fill-to-the-sight-mark-and-cap', 'Fill an oil mist or sump to the mark', 'Top up lubricant.', { cue: 'To the sight mark, and the fill is capped before you leave.' }),
        leaf('read-a-sight-glass-from-square-on', 'Read a sight-glass level square on', 'Take an oil level reading.', { cue: 'Your eye is level with the glass, never above it.', prim: ['inspect'], contact: 1, notes: 'Parallax turns a low level into a correct one. The wrong reading is taken with total confidence.' }),
        leaf('drain-cap-and-label-waste-oil', 'Drain oil, cap it and label it', 'Remove and contain used lubricant.', { cue: 'Contained, capped and labelled as the house requires before it leaves the machine.' }),
        leaf('recover-a-level-read-from-above', 'Recover: a level was read from above and acted on', 'Retake it square on before adding or draining anything further.', { fail: true, contact: 1, prim: ['inspect'] }),
      ]),
    ]),

    node('filters', 'Filters, strainers and glasses', 'Things you open regularly that are full of what you were trying to remove.', { contact: 4, dexterity: 4, prev: 'uncommon', repetition: 'batched' }, [
      node('strainers', 'Strainers and cartridges', 'Change-outs.', { precision: 3 }, [
        leaf('drain-before-you-lift-a-basket', 'Change a strainer basket after draining', 'Replace a strainer element.', { cue: 'It is drained first, and the basket lifts so the dirt stays in it.', notes: 'Lifting a full basket tips the collected solids back into the line you just cleaned.' }),
        leaf('clean-inspect-and-seat-the-gasket', 'Clean a basket and refit it', 'Return a strainer to service.', { cue: 'The screen is inspected and the gasket seats on refit.', prim: ['inspect'] }),
        leaf('fit-a-cartridge-in-direction', 'Fit a filter cartridge in direction', 'Install a filter element.', { cue: 'The specified flow direction, with the cap or bowl seated.', notes: 'Backwards, it filters until the media collapses into the clean side.' }),
        leaf('recover-a-basket-tipped-back-into-the-line', 'Recover: a strainer basket tipped on the way out', 'Isolate and flush the line rather than closing it up on the debris.', { fail: true, contact: 4 }),
      ]),
      node('vent-and-drain', 'Vent and drain', 'Getting air out and liquid into a container.', { prim: ['tool', 'inspect'] }, [
        leaf('vent-a-filter-until-liquid-shows', 'Vent a filter until liquid shows', 'Purge air from a filter housing.', { cue: 'Liquid shows at the vent, then the vent closes.' }),
        leaf('drain-a-filter-and-cap-the-drain', 'Drain a filter into a container', 'Empty a housing.', { cue: 'Into a container, and the drain is capped afterwards.' }),
        leaf('drain-a-low-point-and-cap-it', 'Drain a low point and cap the container', 'Clear a low-point drain.', { cue: 'The container is capped before you walk away from it.' }),
        leaf('recover-a-drain-left-open', 'Recover: a drain was left open', 'Close and cap it, then find what came out of it while it was open.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
      node('glasses', 'Sight glasses', 'The plant reading itself.', { precision: 4, prim: ['inspect'] }, [
        leaf('reject-a-glass-etched-past-the-limit', 'Fit a sight glass and check the gasket', 'Install or refit a sight glass.', { cue: 'The gasket is checked.', verify: 'A glass etched past the house limit is not reused, however serviceable it looks.', notes: 'An etched glass fails under pressure without warning. The rejection criterion is a written limit, not a judgement.' }),
        leaf('wipe-a-glass-so-it-reads-from-the-walkway', 'Wipe a sight glass', 'Restore visibility of a level.', { cue: 'The level is visible from the walkway, which is where it will be read from.' }),
        leaf('recover-a-glass-that-crazed-in-service', 'Recover: a sight glass crazed in service', 'Isolate the vessel before anyone stands in front of it to look closer.', { fail: true, notes: 'The natural response to a damaged glass is to walk up and inspect it, which is exactly the wrong place to stand.' }),
      ]),
    ]),

    node('finish', 'Wash-down, lagging and hand-back', 'Leaving the plant in a state the next shift can read.', { horizon: 'medium', contact: 3, dexterity: 3, prev: 'uncommon' }, [
      node('washdown', 'Wash-down and drains', 'Water in a place full of electricity.', { prim: ['tool', 'locomote'], contact: 4 }, [
        leaf('wash-down-keeping-the-spray-in-the-bay', 'Wash down with a gun', 'Clean a process bay.', { cue: 'The spray stays in the bay; no open motor and no open panel is ever hosed.', notes: 'A negative constraint over a continuous action, with a consequence that arrives days later as a bearing or a board failure.' }),
        leaf('squeegee-a-pad-to-the-drain', 'Squeegee a pad to the drain', 'Clear standing water.', { cue: 'The last puddle is picked up rather than left to find its own way.' }),
        leaf('refit-a-drain-cover-after-the-wash', 'Refit the drain cover after the wash', 'Close an opened drain.', { cue: 'It is back in before the next tyre or foot arrives at it.' }),
        leaf('recover-a-panel-that-took-water', 'Recover: a panel or motor took spray', 'Isolate it and have it dried and checked rather than letting it run and see.', { fail: true, partner: 'licensed', prim: ['language', 'recover'] }),
      ]),
      node('lagging', 'Trace and insulation', 'Wrapping a line so it stays wrapped.', { dexterity: 4, precision: 3, prim: ['deform', 'fasten'] }, [
        leaf('fit-heat-trace-with-the-lead-relieved', 'Fit heat-trace wrap on a run', 'Install trace heating.', { cue: 'The tape sits flat on the specified run and the lead is strain-relieved.' }),
        leaf('fit-insulation-so-the-jacket-closes', 'Fit insulation with tight joints', 'Lag a line or vessel.', { cue: 'The joints are tight and the jacket will close over them.' }),
        leaf('strap-insulation-and-tuck-the-tail', 'Strap insulation and tuck the tail', 'Secure lagging.', { cue: 'The tail is tucked so it cannot catch or unwind.' }),
        leaf('fit-a-jacket-and-close-every-latch', 'Fit a jacket and close every latch', 'Install a removable insulation jacket.', { cue: 'Every latch is closed, counted round the jacket.' }),
        leaf('recover-lagging-that-hides-a-leak', 'Recover: a leak was found under lagging', 'Strip the section back to sound pipe; wet lagging is a corrosion site, not a cosmetic problem.', { fail: true, notes: 'Corrosion under insulation is invisible by construction. The failure is that the evidence was covered on purpose.' }),
      ]),
      node('handback', 'Hand the board back', 'The terminal state, declared.', { contact: 1, dexterity: 1, prim: ['inspect', 'language'] }, [
        leaf('leave-a-known-state-at-the-board', 'Leave a known state at the board', 'Declare the shift or task finished.', { cue: 'The last valve is in the state you intend, the last lock is on or off as you chose, and both hands are clear.', verify: 'All three are checked rather than assumed, because the next person will read the plant and not your memory.', notes: 'The whole domain reduces to this: a state somebody else can read without asking you.' }),
        leaf('recover-a-state-nobody-can-read', 'Recover: the plant was handed over in an unreadable state', 'Walk it back to a known configuration before starting, rather than working around what you find.', { fail: true, horizon: 'long', prim: ['inspect', 'language'] }),
      ]),
    ]),
  ],
)
