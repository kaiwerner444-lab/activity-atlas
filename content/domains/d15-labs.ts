import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// Two different worlds sit in this domain and they score nothing alike.
//
// Pipetting, plate handling and autosamplers are among the most automated
// manual tasks that exist. Liquid handlers have done them for decades, so the
// gap there is genuinely low and it should read low.
//
// Glassware, glove boxes, cryogenics, microscopy, gel work and NDT are none of
// those things. They are manual, skilled, unrecorded, and in several cases the
// operator is the instrument. The old flat facets could not tell these apart.
// They are separated here so the gap score inside the domain means something.
//
// The failure mode that defines the whole domain is contamination: invisible
// when it happens, invisible afterwards, and surfacing only as a result you
// cannot attribute to a step. Half the cues here exist to prevent it.

export const d15: NodeSpec = node(
  'd15',
  'Labs and inspection',
  'Bench science and metrology: containment, liquid handling, glassware, cryogenics, microscopy, culture and dimensional inspection.',
  {
    setting: 'clinical',
    dexterity: 5,
    precision: 5,
    contact: 3,
    horizon: 'medium',
    repetition: 'batched',
    capital: 'capex',
    partner: 'site',
    skillYears: 'months',
    suit: 'poor',
    robotNow: 'partial',
    embodiment: ['ego', 'video', 'umi'],
    saturation: 'thin',
    ours: 'none',
    rights: 'ip-hot',
    ethics: 'open',
    prev: 'common',
    prim: ['grasp', 'transfer', 'inspect', 'tool'],
  },
  [
    node('containment', 'PPE, hoods and containment', 'Keeping the work off you and you off the work.', { contact: 4, robotNow: 'no', saturation: 'empty', prev: 'ubiquitous' }, [
      node('donning', 'Don protective equipment', 'Getting dressed for the bench.', { dexterity: 4, horizon: 'short' }, [
        leaf('don-coat-cuffs-over-wrists', 'Don a lab coat and close the front', 'Put on a coat so nothing is exposed at the wrist.', { cue: 'The cuffs cover the wrists and the front is closed before you touch the bench.', prim: ['deform', 'fasten'] }),
        leaf('fit-eye-protection-stays-put', 'Fit eye protection and adjust it', 'Set glasses so they hold position.', { cue: 'They stay put when you look down at the bench.', verify: 'Look down once and confirm nothing slides.' }),
        leaf('fit-visor-nod-to-confirm', 'Fit a visor or face shield', 'Set a shield and check it is secure.', { cue: 'A single nod does not move it.' }),
        leaf('recover-ppe-breach-mid-task', 'Recover: PPE displaced mid-task', 'Stop, step back, correct it, and only then resume.', { fail: true }),
      ]),
      node('fume-hood', 'Work a fume hood', 'The sash is the containment, and it has one correct position at a time.', { precision: 3, prev: 'common' }, [
        leaf('raise-sash-to-marked-height', 'Raise the sash to the marked height and stop', 'Open a hood to its working position.', { cue: 'It stops at the mark rather than as high as it will travel.' }),
        leaf('lower-sash-and-leave-it', 'Lower the sash to the slot or closed', 'Return a hood to its safe state.', { cue: 'It reaches the working slot or closed, and it is left there.' }),
        leaf('recover-hood-left-open', 'Recover: hood left open after a task', 'Close it and check whether anything volatile was left out.', { fail: true }),
      ]),
      node('glovebox', 'Work in a glove box', 'Manipulation through a barrier with no direct contact.', { dexterity: 5, contact: 5, skillYears: 'years', robotNow: 'no', capital: 'capex', prev: 'uncommon' }, [
        leaf('seat-arms-in-glove-ports', 'Put both arms into the glove ports', 'Enter a sealed box and work with both hands.', { cue: 'Both arms are seated in the ports before anything inside is touched.', prim: ['bimanual'], notes: 'The suit is a poor fit here and the hands are inside a second pair of gloves. Interesting precisely because of that.' }),
        leaf('set-tongs-down-before-withdrawing', 'Set the tongs down inside before withdrawing', 'Leave the box without carrying anything out through the glove.', { cue: 'The tongs are down inside the box before either arm comes out of the port.' }),
        leaf('recover-glove-snagged-in-the-box', 'Recover: glove snagged or torn in the box', 'Withdraw safely, isolate the box and report before continuing.', { fail: true, horizon: 'medium' }),
      ]),
      node('biosafety-hygiene', 'Biosafety and bench hygiene', 'Where the direction of every wipe is the specification.', { dexterity: 4, prev: 'common' }, [
        leaf('change-gloves-dirty-off-first', 'Change biosafety gloves in order', 'Swap gloves without carrying anything across.', { cue: 'The dirty pair is off before the clean pair goes on, with nothing touched in between.', notes: 'Ordering constraint. Both actions are trivial and only the sequence keeps the work clean.' }),
        leaf('wipe-bench-in-designated-direction', 'Wipe a bench in the designated direction', 'Decontaminate a surface without spreading it.', { cue: 'The pass runs the specified way and the wipe ends in the waste, not back on the bench.' }),
        leaf('recover-suspected-cross-contamination', 'Recover: cross-contamination suspected', 'Stop, identify what is affected, discard it and repeat the run.', { fail: true, horizon: 'long', prim: ['inspect', 'language', 'recover'], notes: 'The defining failure of the domain: invisible when it happens, invisible afterwards, and detectable only as an unattributable result.' }),
      ]),
      node('spills-sharps', 'Spills, sharps and broken glass', 'Making a hazard safe without becoming part of it.', { contact: 4, ethics: 'restricted', prev: 'common' }, [
        leaf('cover-spill-outside-in', 'Cover a spill from the outside in', 'Contain a spill without spreading its edge.', { cue: 'The pad goes down from the outside in and you stand off once it is covered.' }),
        leaf('drop-sharp-hand-outside-mouth', 'Drop a sharp into the container', 'Dispose of a sharp without the hand entering the opening.', { cue: 'It goes in and your hand never enters the mouth of the container.' }),
        leaf('lift-glass-with-scoop-and-brush', 'Lift broken glass with a scoop and brush', 'Clear glass without touching it.', { cue: 'It is lifted with the scoop and brush, never with gloved fingers, and binned in the glass box.' }),
        leaf('recover-sharps-container-overfull', 'Recover: sharps container past the fill line', 'Seal it and replace it rather than pressing anything further in.', { fail: true }),
      ]),
    ]),

    node('liquid-handling', 'Liquid handling and plates', 'The most automated manual work in science, and the reason this half of the domain scores low.', { dexterity: 5, precision: 5, robotNow: 'yes', saturation: 'thin', prev: 'ubiquitous' }, [
      node('bottles-pouring', 'Carry and pour from bottles', 'Bulk liquid moved by hand.', { dexterity: 3, contact: 4, robotNow: 'no', saturation: 'empty' }, [
        leaf('two-hand-carry-set-before-opening', 'Two-hand carry a bottle and set it down', 'Move a bottle and open it only once it is down.', { cue: 'It is on the bench with the cap still on before you unscrew anything.', prim: ['locomote', 'bimanual'] }),
        leaf('pour-to-meniscus-lip-over-receiver', 'Pour to a meniscus on the mark', 'Decant to a target volume.', { cue: 'The meniscus reaches the mark and the bottle lip is still over the receiver when it stops.' }),
        leaf('recover-drip-down-the-bottle', 'Recover: liquid ran down the outside of the bottle', 'Wipe it, check the label is intact, and correct the pour angle before continuing.', { fail: true }),
      ]),
      node('pipetting', 'Pipette', 'Small volumes, high repetition, well covered by machines.', { repetition: 'high-takt', robotNow: 'yes', saturation: 'thin' }, [
        leaf('aspirate-to-mark-pause-lift', 'Aspirate to the mark, pause, then lift', 'Draw a volume and let it settle before moving.', { cue: 'The volume is at the mark and it has paused before the tip leaves the liquid.' }),
        leaf('dispense-to-wall-hold-blowout', 'Dispense to the wall and hold the blow-out', 'Deliver a volume completely.', { cue: 'It runs down the wall or into the well, and the blow-out is held if the pipette requires it.' }),
        leaf('seat-tip-straight-push-not-wipe', 'Eject a tip and seat a new one with a straight push', 'Change tips without touching the box.', { cue: 'The old tip goes in the jar and the new one seats on a straight push, not a wipe across the rack.', notes: 'A wipe brushes the outside of neighbouring tips. The contamination is invisible and turns up as an unexplained result later.', robotNow: 'no' }),
        leaf('restock-tip-box-lid-closes', 'Restock a tip box', 'Refill a rack ready for use.', { cue: 'The rack is full and the lid closes flat.' }),
        leaf('recover-tip-touched-the-rack', 'Recover: tip contacted the rack or a surface', 'Discard it and take a fresh one rather than continuing.', { fail: true }),
      ]),
      node('tubes', 'Handle tubes', 'Small vessels that must stay capped, upright and identified.', { dexterity: 5, repetition: 'high-takt' }, [
        leaf('vortex-until-meniscus-cones', 'Vortex a tube until the meniscus cones', 'Mix a tube to completion.', { cue: 'The meniscus forms a cone, then the tube goes back in the rack.' }),
        leaf('flick-tube-down-then-cap', 'Flick a tube down and cap it before walking', 'Bring liquid off the cap and secure it.', { cue: 'The liquid is down and the tube is capped before you move anywhere.' }),
        leaf('cap-one-hand-on-the-body', 'Cap or uncap with a hand on the body', 'Open a tube without losing the cap or the tube.', { cue: 'The body is held so the cap cannot roll away and the tube cannot tip.' }),
        leaf('recover-uncapped-tube-knocked-over', 'Recover: uncapped tube knocked over', 'Contain it, discard the sample and clean before restarting.', { fail: true }),
      ]),
      node('centrifuge-plates', 'Centrifuge and plates', 'Loads that must be balanced and sealed.', { precision: 4, capital: 'capex' }, [
        leaf('load-rotor-balanced-same-depth', 'Load a rotor balanced across the axis', 'Distribute a load so the rotor is true.', { cue: 'Every position is balanced across the axis and each tube is seated to the same depth.', verify: 'Check the opposite position for every tube before the lid goes down.' }),
        leaf('close-lid-latch-hands-off', 'Close the lid and keep hands off until it stops', 'Run a centrifuge safely.', { cue: 'The latch makes, and nothing is touched until the rotor has stopped on its own.' }),
        leaf('load-plate-orientation-lid-on', 'Load a plate in the correct orientation', 'Place a plate so the map is right.', { cue: 'A1 is where the protocol says it is and the lid is on.' }),
        leaf('seal-plate-burnish-and-trim', 'Seal a plate, burnish it and trim', 'Apply a film seal properly.', { cue: 'Every well is sealed, the film is burnished down, and the overhang is trimmed.' }),
        leaf('peel-seal-one-corner-no-sling', 'Peel a seal from one corner', 'Open a sealed plate without spraying it.', { cue: 'It comes back from one corner with no condensate flung across the plate.', dexterity: 5 }),
        leaf('recover-rotor-imbalance-on-spin-up', 'Recover: imbalance heard on spin-up', 'Stop immediately, rebalance, and inspect the rotor before rerunning.', { fail: true, horizon: 'medium' }),
      ]),
    ]),

    node('glassware', 'Glassware, filtration and titration', 'Skilled manual work on breakable things, and none of it automated.', { dexterity: 5, contact: 4, skillYears: 'years', robotNow: 'no', saturation: 'empty', capital: 'mid', prev: 'common' }, [
      node('breaking-glass', 'Break and finish glass deliberately', 'Controlled fracture, which is either clean or an injury.', { ethics: 'restricted', precision: 5 }, [
        leaf('snap-ampoule-shard-in-wipe', 'Snap an ampoule at the score', 'Open a sealed ampoule safely.', { cue: 'It breaks at the score with a wipe over the neck and the shard stays in the wipe.' }),
        leaf('score-and-snap-tubing', 'Score glass tubing and snap it', 'Cut tubing with a controlled bend.', { cue: 'It parts on the score with a clean square break, then the end is fire-polished or capped.', skillYears: 'years' }),
        leaf('recover-ragged-break', 'Recover: glass broke ragged or off the score', 'Bin the piece and rescore rather than working a jagged end.', { fail: true }),
      ]),
      node('filtration', 'Filter and decant', 'Separating solid from liquid without losing either.', { precision: 4 }, [
        leaf('pour-along-rod-not-down-the-side', 'Pour a filtrate along the rod', 'Decant so the liquid goes where you aim it.', { cue: 'The stream follows the rod and does not run down the outside of the flask.' }),
        leaf('fit-buchner-adapter-seals', 'Fit a Büchner funnel with a sealing adapter', 'Assemble a vacuum filtration set.', { cue: 'The adapter seals and the funnel does not rock on the flask.' }),
        leaf('seat-and-wet-filter-paper', 'Seat filter paper and wet it before the slurry', 'Prepare a filter bed.', { cue: 'The paper covers every hole and is wetted down before any slurry goes on.' }),
        leaf('recover-filter-paper-lifted', 'Recover: paper lifted and let solid through', 'Stop, refilter through fresh paper rather than accepting the pass.', { fail: true }),
      ]),
      node('stands-and-burettes', 'Clamp, fill and titrate', 'Assemblies that must not move, and a stop point you choose.', { precision: 5, contact: 3 }, [
        leaf('clamp-so-it-cannot-rotate', 'Clamp a stand and rod so it cannot rotate', 'Build a rigid support.', { cue: 'Nothing rotates when you let go and give it a light push.' }),
        leaf('fill-burette-and-zero-meniscus', 'Fill a burette and bring it to zero', 'Set a burette ready to titrate.', { cue: 'It is filled past the mark and brought down so the meniscus sits on zero.' }),
        leaf('titrate-dropwise-to-endpoint', 'Titrate dropwise and stop at the end-point', 'Add reagent until the chosen change holds.', { cue: 'You swirl between drops and stop on the end-point you chose, not one drop past it.', notes: 'The stop point is a judgement about a colour that is already changing. There is no undo.' }),
        leaf('swirl-in-the-wrist-nothing-leaves', 'Swirl a flask from the wrist', 'Mix in an open vessel without losing any.', { cue: 'The contents wet the walls and nothing comes out of the neck.' }),
        leaf('recover-overshot-endpoint', 'Recover: titration overshot the end-point', 'Discard and repeat rather than back-calculating from a ruined run.', { fail: true }),
      ]),
    ]),

    node('measurement', 'Weighing, optical and probes', 'Instruments that must settle before the number means anything.', { precision: 5, contact: 2, prev: 'common' }, [
      node('weighing', 'Weigh to a target', 'Adding material toward a number that keeps moving.', { dexterity: 5, robotNow: 'partial' }, [
        leaf('tare-and-wait-for-stable', 'Place a boat, tare it and wait for stability', 'Zero a balance properly.', { cue: 'The door is closed and the reading is stable before anything is added.', notes: 'The action is waiting. Adding before the balance settles is the standard error.' }),
        leaf('spatula-small-additions-to-target', 'Spatula solid in small additions to the target', 'Approach a weight from below without overshooting.', { cue: 'The target is reached by small additions, never by taking material back out.' }),
        leaf('close-door-wait-before-recording', 'Close the door and wait before recording', 'Take a reading you can trust.', { cue: 'The door is shut and the display has settled before the number is written down.' }),
        leaf('recover-overshot-the-weight', 'Recover: weight overshot the target', 'Start the aliquot again rather than removing material from the boat.', { fail: true }),
      ]),
      node('optical-cells', 'Handle cuvettes and optical cells', 'Surfaces that must never be touched by a finger.', { dexterity: 5, precision: 5 }, [
        leaf('handle-cuvette-by-frosted-sides', 'Handle a cuvette by the frosted sides', 'Pick up an optical cell without marking the windows.', { cue: 'Only the frosted faces are touched and it goes into the holder the same way every time.' }),
        leaf('wipe-and-look-through-before-insert', 'Wipe the optical faces and look through them', 'Check a cell before reading it.', { cue: 'Both windows are clean and clear when you look through them at the light.' }),
        leaf('seat-cuvette-path-to-beam', 'Seat a cuvette with the light path to the beam', 'Orient a cell correctly.', { cue: 'The clear faces are across the beam and the lid is closed before the read.' }),
        leaf('recover-fingerprint-on-the-window', 'Recover: fingerprint found on an optical face', 'Reclean and reread rather than accepting the value.', { fail: true }),
      ]),
      node('probes', 'Rinse, blot and calibrate probes', 'Sensors that are ruined by being cleaned the obvious way.', { dexterity: 5, contact: 4 }, [
        leaf('fit-probe-bulb-in-solution', 'Fit a probe so the bulb is in the solution', 'Position a sensor correctly in a vessel.', { cue: 'The bulb is in the liquid and is not resting on the bottom of the vessel.' }),
        leaf('rinse-probe-and-catch-the-rinse', 'Rinse a probe with the specified water', 'Wash a sensor between measurements.', { cue: 'It is rinsed with the specified water and the rinse is caught, not run into the sample.' }),
        leaf('blot-do-not-wipe-the-bulb', 'Blot a probe rather than wiping it', 'Dry a sensor without damaging it.', { cue: 'The wipe touches the body and never rubs the bulb.', notes: 'Wiping is the intuitive action and it strips the sensing layer. The right action is to do less.' }),
        leaf('stir-standard-until-stable', 'Stir a standard until the reading is stable', 'Calibrate against a known value.', { cue: 'The reading holds steady before you move to the next standard.' }),
        leaf('recover-probe-drifting-between-standards', 'Recover: probe drifting across calibration', 'Reclean, recondition or replace it rather than accepting a bad slope.', { fail: true, horizon: 'medium' }),
      ]),
    ]),

    node('thermal-cryo', 'Heat, cold and cryogenics', 'Vessels and contents at temperatures that punish a slow decision.', { contact: 4, dexterity: 3, ethics: 'restricted', robotNow: 'no', saturation: 'empty', prev: 'common' }, [
      node('heating-cooling', 'Heat and chill on the bench', 'Hot plates, baths and the handles you must not leave over them.', { skillYears: 'months' }, [
        leaf('clamp-flask-handle-off-the-heat', 'Set a flask on a hot plate and clamp the neck', 'Support a heated vessel properly.', { cue: 'The neck is clamped and no handle or lead is left lying over the heat.' }),
        leaf('sit-vessel-in-ice-bath-not-floating', 'Set a vessel in an ice bath so it sits', 'Chill a vessel evenly.', { cue: 'It sits rather than floats and the bath comes up to the neck.' }),
        leaf('recover-vessel-tipped-in-the-bath', 'Recover: vessel tipped or floated free', 'Reseat it and check whether the contents took bath water.', { fail: true }),
      ]),
      node('cryogens', 'Handle cryogens', 'Liquids that boil at room temperature.', { contact: 5, skillYears: 'months', ethics: 'restricted' }, [
        leaf('pour-dewar-slowly-no-boilover', 'Pour from a dewar slowly', 'Decant a cryogen under control.', { cue: 'It transfers without boiling over the lip.' }),
        leaf('carry-cryo-box-set-before-opening', 'Carry a cryo box and set it down before opening', 'Move frozen material safely.', { cue: 'Cryo gloves on, and the box is down on the bench before the lid comes off.' }),
        leaf('lift-ln2-lid-close-on-the-neck', 'Lift an LN2 lid and close it on the neck', 'Take material from a nitrogen vessel.', { cue: 'The lid closes back onto the neck rather than being left resting alongside.' }),
        leaf('recover-cryovial-dropped-in-the-dewar', 'Recover: vial dropped into the dewar', 'Retrieve it with the correct tool rather than reaching in.', { fail: true }),
      ]),
      node('cold-storage', 'Work a freezer', 'Where the cost of a slow search is everyone else’s samples.', { horizon: 'short', prev: 'common' }, [
        leaf('open-minus80-pull-and-close', 'Open a −80, pull the rack, close the door', 'Get material out with minimum door time.', { cue: 'The door is open only for the pull and is closed before the box is opened.', notes: 'Ordering constraint with a real cost: opening the box at the freezer warms every other sample in it.' }),
        leaf('rack-boxes-labels-out-fully-on', 'Rack boxes with labels out and fully seated', 'Return storage so the next person can find it.', { cue: 'Labels face out and the box is fully on the shelf, not resting on the lip.' }),
        leaf('close-freezer-until-latch-makes', 'Close a freezer hard until the latch makes', 'Shut cold storage properly.', { cue: 'The latch makes and no door alarm is sounding.', verify: 'Wait for the alarm to clear before walking away.' }),
        leaf('sort-vials-in-a-cold-block', 'Sort cryovials in a cold block', 'Work with frozen tubes without thawing or losing them.', { cue: 'The caps stay dry and every label is still readable when the box goes back.', dexterity: 5 }),
        leaf('recover-box-left-out-of-the-freezer', 'Recover: box left out on the bench', 'Assess thaw exposure and document it rather than quietly refreezing.', { fail: true, prim: ['language', 'recover'] }),
      ]),
      node('labelling', 'Label tubes and vials', 'Identification that has to survive frost, solvent and time.', { dexterity: 5, precision: 4, prev: 'ubiquitous' }, [
        leaf('write-label-before-tube-is-cold', 'Write a tube label before the tube is cold', 'Mark a vessel while it can still take ink.', { cue: 'The label is written and dry before the tube goes anywhere cold.' }),
        leaf('wrap-printed-label-join-at-back', 'Wrap a printed label around a tube', 'Apply a wrap label so it reads in the rack.', { cue: 'The join is at the back and the ID faces you when the tube is racked.' }),
        leaf('recover-illegible-label', 'Recover: label unreadable after storage', 'Trace the sample from the map before relabelling anything.', { fail: true, horizon: 'medium' }),
      ]),
    ]),

    node('microscopy', 'Microscopy and slides', 'Where the operator is the instrument and nothing is automated.', { dexterity: 5, precision: 5, contact: 3, skillYears: 'years', robotNow: 'no', saturation: 'empty', suit: 'wrong-tool', prev: 'common' }, [
      node('scope-operation', 'Operate a microscope', 'Two hands, three controls, and a lens you must not grab.', {}, [
        leaf('focus-coarse-then-fine-two-hands', 'Focus with both hands, coarse then fine', 'Bring a specimen into focus without crashing the objective.', { cue: 'One hand on coarse and one on the slide, then fine, without the objective touching the slide.' }),
        leaf('move-stage-and-lock-if-drifting', 'Move the stage to the field and lock it', 'Find and hold a field of view.', { cue: 'The field is centred and stays there when you take your hand off.' }),
        leaf('change-objective-by-the-turret', 'Change objective by rotating the turret', 'Swap magnification correctly.', { cue: 'It clicks into position and the lens itself was never gripped.' }),
        leaf('recover-objective-crashed-into-slide', 'Recover: objective driven into the slide', 'Stop, inspect the front element and report before further use.', { fail: true, horizon: 'medium' }),
      ]),
      node('oil-and-optics', 'Oil immersion and cleaning', 'Where the order of the wipe is the whole procedure.', { precision: 5, prev: 'uncommon' }, [
        leaf('drop-oil-then-bring-objective-in', 'Drop oil on the slide and bring the objective in', 'Set up an immersion field.', { cue: 'The oil is on the slide first and the objective comes down into the drop.' }),
        leaf('wipe-oil-lens-last', 'Wipe the oil off, lens last', 'Clean up after immersion in the correct order.', { cue: 'Slide first, objective last, with the specified paper each time.', notes: 'Reversing the order drags oil back onto the clean surface. The sequence is the specification.' }),
        leaf('recover-oil-on-a-dry-objective', 'Recover: oil found on a dry objective', 'Clean it properly rather than wiping it across and continuing.', { fail: true }),
      ]),
      node('slide-preparation', 'Prepare and stain slides', 'Making the specimen before you can look at it.', { dexterity: 5, contact: 4 }, [
        leaf('drop-coverslip-at-an-angle', 'Fit a cover slip at an angle and let it drop', 'Mount without trapping air.', { cue: 'It drops from an angle with no raft of bubbles under it.' }),
        leaf('smear-in-one-pass-dry-smear-up', 'Smear a slide in one pass', 'Make an even film.', { cue: 'One pass, then racked to dry with the smear facing up.' }),
        leaf('heat-fix-just-warm-to-the-hand', 'Heat-fix with a controlled pass', 'Fix a smear without cooking it.', { cue: 'You stop when the back of the slide is just warm to the back of the hand.' }),
        leaf('dip-stain-timed-drain-on-lip', 'Dip a slide for the timed interval', 'Stain to protocol.', { cue: 'The interval is held and the slide is drained against the jar lip.' }),
        leaf('blot-from-the-edge-not-across', 'Blot a slide from the edge', 'Dry a slide without destroying the specimen.', { cue: 'The blot touches the edge and never crosses the smear.' }),
        leaf('load-hemocytometer-and-leave-still', 'Load both sides of a hemocytometer and leave it', 'Charge a counting chamber and let it settle.', { cue: 'Both chambers are filled and it is left completely still while the cells settle.' }),
        leaf('recover-smear-washed-off-in-staining', 'Recover: smear lifted during staining', 'Remake the slide rather than counting a partial field.', { fail: true }),
      ]),
    ]),

    node('molecular', 'Gels, columns and cartridges', 'Loading small volumes into small features, mostly by hand.', { dexterity: 5, precision: 5, robotNow: 'no', saturation: 'empty', capital: 'mid', skillYears: 'months', prev: 'common' }, [
      node('gels', 'Cast and run gels', 'The classic task nobody has automated away.', { horizon: 'long' }, [
        leaf('fit-comb-plumb-at-the-mark', 'Fit a comb in the casting tray', 'Set the well former square.', { cue: 'The teeth are plumb and the comb is at the mark, not pushed to the bottom.' }),
        leaf('pour-gel-to-line-pop-bubbles', 'Pour a gel to the line and pop the bubbles', 'Cast a gel without defects.', { cue: 'It is at the line and every large bubble is popped before it sets.' }),
        leaf('seat-gel-wells-up-gasket-seals', 'Seat a gel in the tank', 'Install a cast gel to run.', { cue: 'The wells are at the top and the gasket seals with no leak past it.' }),
        leaf('load-well-tip-on-wall-slow', 'Load a well with the tip against the wall', 'Deliver sample so it layers rather than mixes.', { cue: 'The sample layers into the well and does not swirl out of it.', notes: 'A slow, steady dispense into a soft-walled feature you can puncture. Fine force control with a visible failure.' }),
        leaf('recover-well-punctured-by-the-tip', 'Recover: well punctured while loading', 'Move to a spare lane rather than loading through the tear.', { fail: true }),
      ]),
      node('bands-and-columns', 'Extract bands and run columns', 'Recovering material from a separation.', { precision: 5, ethics: 'restricted' }, [
        leaf('open-uv-box-place-gel-close-lid', 'Open a UV or blue box, place the gel, close it', 'Image a gel without exposure.', { cue: 'The lid is closed before you look at it.' }),
        leaf('cut-band-clean-blade-bin-it', 'Cut a band with a clean blade and bin the blade', 'Excise a slice and dispose of the blade.', { cue: 'The slice is in the tube and the blade is in the sharps before anything else is touched.' }),
        leaf('fit-spin-column-without-wetting-rim', 'Fit a spin column and load it', 'Charge a column cleanly.', { cue: 'The load goes in without wetting the rim of the column.' }),
        leaf('push-plunger-steady-stop-at-mark', 'Push a syringe plunger at a steady rate', 'Deliver through a syringe under control.', { cue: 'The rate stays steady and it stops at the mark.' }),
        leaf('collect-fraction-cap-the-last', 'Collect a fraction and cap the previous one', 'Run a collection in order.', { cue: 'The last tube is capped before the rack moves.' }),
        leaf('recover-fractions-out-of-order', 'Recover: fractions racked out of order', 'Reconstruct from the run log or discard rather than guessing.', { fail: true, horizon: 'medium' }),
      ]),
      node('cartridges', 'Load chips and cartridges', 'Consumables that seat once.', { dexterity: 5, capital: 'capex' }, [
        leaf('seat-cartridge-until-latch-closes', 'Load a chip or cartridge until it seats', 'Insert a consumable correctly.', { cue: 'It seats fully and the instrument latch closes without force.' }),
        leaf('recover-cartridge-seated-crooked', 'Recover: cartridge seated crooked', 'Eject and reseat rather than forcing the latch.', { fail: true }),
      ]),
    ]),

    node('sterile-culture', 'Sterilisation and culture', 'Aseptic technique, where the whole skill is what you did not touch.', { dexterity: 5, contact: 3, skillYears: 'months', robotNow: 'no', saturation: 'empty', prev: 'common' }, [
      node('autoclave', 'Load, wrap and run an autoclave', 'Steam has to reach everything, and the load is hot afterwards.', { contact: 4, capital: 'capex', ethics: 'restricted' }, [
        leaf('load-so-steam-can-move', 'Load an autoclave so steam can move', 'Pack a chamber correctly.', { cue: 'Packs are spaced and nothing is jammed against the chamber wall.' }),
        leaf('wrap-pack-indicator-visible', 'Wrap a pack with the indicator visible', 'Prepare a pack for sterilisation.', { cue: 'The indicator can be seen and the fold faces the specified way.' }),
        leaf('tape-pack-and-press-it-down', 'Tape a pack with indicator tape', 'Secure and mark a pack.', { cue: 'The tape is pressed down along its length with no lifted end.' }),
        leaf('unload-after-depressurised', 'Unload after depressurisation onto the hot surface', 'Take a load out safely.', { cue: 'The chamber is depressurised and hot packs go on the designated surface, not the bench.' }),
        leaf('recover-indicator-did-not-change', 'Recover: indicator unchanged after a cycle', 'Treat the load as unprocessed and rerun it.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
      node('culture', 'Plate, streak and incubate', 'Aseptic technique at the bench.', { dexterity: 5, precision: 4 }, [
        leaf('open-incubator-and-close-on-gasket', 'Open an incubator, plate or pull, and close it', 'Work an incubator with minimum disturbance.', { cue: 'The door closes onto the gasket and the shelf is left in order.' }),
        leaf('streak-pattern-change-loop-between', 'Streak a plate in the specified pattern', 'Dilute across a plate.', { cue: 'The pattern is followed and the loop is flamed or changed between sectors.' }),
        leaf('flame-loop-then-cool-in-air', 'Flame a loop and cool it in the air', 'Sterilise a loop without ruining the plate.', { cue: 'It goes orange, then cools in the air rather than being cooled in the agar.', notes: 'Cooling in the agar is the fast option and it kills the sample and cracks the plate.' }),
        leaf('stab-to-depth-withdraw-same-line', 'Stab a tube to depth and withdraw on the line', 'Inoculate a stab culture.', { cue: 'It goes to the specified depth and comes back out along the same track.' }),
        leaf('recover-plate-contaminated', 'Recover: plate contaminated on the streak', 'Discard and repeat rather than reading a mixed plate.', { fail: true }),
      ]),
    ]),

    node('metrology-ndt', 'Dimensional inspection and NDT', 'Measuring and testing manufactured parts, where the operator is the sensor.', { setting: 'industrial', precision: 5, contact: 4, skillYears: 'years', robotNow: 'no', saturation: 'empty', rights: 'easy', suit: 'ok', prev: 'common' }, [
      node('visual-inspection', 'Inspect by eye', 'Deciding acceptable from not, under a light you control.', { dexterity: 4, repetition: 'high-takt' }, [
        leaf('inspect-under-ring-light-all-faces', 'Inspect a part under a ring light', 'Turn a part through the light to reveal defects.', { cue: 'Every face has passed through the light with both hands on the part.' }),
        leaf('flip-on-clean-mat-same-light', 'Flip a part on a clean mat', 'Present the second face identically.', { cue: 'The second face is under the same light and the mat has not marked the first.' }),
        leaf('recover-defect-found-after-pass', 'Recover: defect found on a part already passed', 'Pull the batch back rather than correcting the single part.', { fail: true, horizon: 'medium', prim: ['language', 'recover'] }),
      ]),
      node('hand-metrology', 'Measure by hand and by feel', 'Instruments where the reading depends on how you hold them.', { precision: 5, contact: 5 }, [
        leaf('caliper-jaws-square-then-lift', 'Take a caliper reading with the jaws square', 'Measure without cocking the instrument.', { cue: 'The jaws sit on the feature square, and the reading is taken before the tool comes off.' }),
        leaf('micrometer-roll-to-feel-then-lock', 'Roll a micrometer to the specified feel', 'Measure to a repeatable contact pressure.', { cue: 'It rolls to the same feel every time and is locked before the reading.' }),
        leaf('height-gauge-sneak-up-on-contact', 'Sneak a height gauge up onto the surface', 'Approach a contact slowly.', { cue: 'The contact is found by approach, not by driving the gauge into the surface.' }),
        leaf('pull-feeler-light-drag', 'Pull a feeler through with a light drag', 'Measure a gap by feel.', { cue: 'It drags lightly; you stop if it binds or falls straight through.' }),
        leaf('recover-reading-that-will-not-repeat', 'Recover: reading that will not repeat', 'Reclean, reseat and re-measure rather than averaging the disagreement.', { fail: true }),
      ]),
      node('gauging', 'Gauge and disposition', 'Pass, fail, and where the part goes next.', { precision: 5, repetition: 'high-takt' }, [
        leaf('go-gauge-own-weight', 'Pass a go gauge on its own weight', 'Check the lower limit.', { cue: 'It enters under its own weight or at the specified feel, without being pushed.' }),
        leaf('no-go-must-not-enter', 'Reject with a no-go that does not enter', 'Check the upper limit.', { cue: 'The no-go does not start, and the part goes to the fail pose.' }),
        leaf('mark-and-nest-to-disposition', 'Mark pass or fail and nest the part', 'Record the decision physically.', { cue: 'The mark is on the specified face and the part is in the matching nest.' }),
        leaf('recover-part-in-the-wrong-nest', 'Recover: part found in the wrong nest', 'Re-gauge it rather than trusting the mark.', { fail: true }),
      ]),
      node('ndt', 'Non-destructive testing', 'Where the couplant, the pressure and the pass rate are all the operator.', { capital: 'capex', partner: 'licensed', skillYears: 'years', prev: 'uncommon' }, [
        leaf('dye-pen-one-direction-let-dry', 'Wipe a dye-pen or solvent pass in one direction', 'Apply and remove penetrant correctly.', { cue: 'Each pass runs one way and is allowed to dry before the next.' }),
        leaf('mpi-yoke-particles-while-field-on', 'Place an MPI yoke and apply particles under field', 'Run magnetic particle inspection.', { cue: 'Particles are applied while the field is on, not before or after.' }),
        leaf('ut-probe-constant-pressure-full-shoe', 'Hold a UT probe with constant pressure', 'Scan with ultrasound and keep the coupling.', { cue: 'Contact angle and pressure hold steady with a full shoe of couplant throughout the scan.', contact: 5, notes: 'Three variables held simultaneously by hand while reading a trace. The operator is the instrument.' }),
        leaf('recover-lost-couplant-mid-scan', 'Recover: couplant lost part-way through a scan', 'Recouple and rescan the section rather than reporting the partial pass.', { fail: true }),
      ]),
    ]),

    node('station-close', 'Leave the bench safe', 'The state the next person finds.', { contact: 2, dexterity: 3, ethics: 'restricted', prev: 'ubiquitous' }, [
      node('close-out', 'Close out a bench or hood', 'Putting the workspace into a known state.', { horizon: 'short' }, [
        leaf('bench-safe-state-last-vessel-capped', 'Leave the bench or hood in its safe state', 'Finish a session so nothing is left live.', { cue: 'The sash or lid is in the safe state, both hands are clear, and the last vessel is capped.' }),
        leaf('recover-something-left-uncapped', 'Recover: found an open vessel after closing out', 'Go back, secure it, and check what else was missed in the same pass.', { fail: true }),
      ]),
    ]),
  ],
)
