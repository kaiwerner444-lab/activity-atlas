import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// D10 is the most rigorously specified domain in the seed. Nearly every leaf
// carries a `cue`: the condition that says the action is finished. That is the
// success predicate, and it is what a camera cannot see. "Press a bushing to
// shoulder" is a video label; "until the ram load steps up and travel stops" is
// something you can only capture with force in the loop, which is the entire
// argument for instrumented capture over more ego video.

export const d10: NodeSpec = node(
  'd10',
  'Mechanical assembly',
  'Bench and cell assembly of mechanical parts: presenting, mating, fastening, routing, adjusting and closing out.',
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
    node('fixturing', 'Fixture and present the part', 'Getting a part into a known position before anything is assembled to it.', { precision: 5, contact: 5, prim: ['insert', 'grasp', 'inspect'] }, [
      node('load-datum', 'Load and datum a part', 'Establishing where the part is, so every later step can trust it.', { saturation: 'empty', robotNow: 'partial' }, [
        leaf('load-casting-flush', 'Load a casting onto fixture pins', 'Lower a base casting onto locating pins and settle it.', { cue: 'It drops flush and does not rock when you press each corner.', prev: 'common', obj: ['base casting', 'locating pins'] }),
        leaf('clock-to-fixture-key', 'Clock a housing to the fixture key', 'Rotate a housing onto its key and push it round to the stop.', { cue: 'Rotation stops dead against the hard stop, with no further travel.', dexterity: 4 }),
        leaf('flip-and-reseat', 'Flip a part and reseat without losing datum', 'Turn a part 180 degrees and re-establish the same reference.', { cue: 'The datum face contacts and both pins re-engage before you let go.', contact: 5, skillYears: 'months', saturation: 'empty' }),
        leaf('slide-subplate-dowels', 'Slide a subplate onto dowels', 'Bring a subplate down onto two dowels at once.', { cue: 'Both dowels show through their witness holes.', prim: ['bimanual', 'insert'] }),
        leaf('align-holes-with-drift', 'Align holes with a drift', 'Bring two hole patterns together with a tapered drift, then swap it for the fastener.', { cue: 'The drift passes freely; you swap it out without the stack moving.', dexterity: 5, prim: ['tool', 'bimanual'] }),
        leaf('recover-lost-datum', 'Recover: datum lost after a reseat', 'Notice the part has shifted off its reference and re-establish it before assembling further.', { fail: true, horizon: 'medium', saturation: 'empty' }),
      ]),
      node('first-mate', 'Make the first mate', 'The moment two parts first touch, where nearly all the information is tactile.', { contact: 5, dexterity: 5, robotNow: 'no', saturation: 'empty' }, [
        leaf('drop-bushing-feel-step', 'Drop a bushing into a bore', 'Let a bushing find the bore and settle onto its step.', { cue: 'You feel the step and travel stops; it sits square without pressure.', prev: 'common' }),
        leaf('hand-start-bearing-first-land', 'Start a bearing onto a shaft by hand', 'Push a bearing onto a shaft far enough to be captured before any press.', { cue: 'It reaches the first land and stays square when you release it.' }),
        leaf('square-gasket-to-pocket', 'Square a gasket into its pocket', 'Align a gasket to the groove and press it home all round.', { cue: 'The gasket sits below the face all the way round, with no lifted section.', prim: ['deform', 'inspect'] }),
        leaf('mate-cover-on-dowels', 'Mate a cover to a case on two dowels', 'Bring a cover down on two dowels without trapping the seal.', { cue: 'Faces meet with no gap and no seal visible in the joint line.', prim: ['bimanual', 'insert'] }),
        leaf('offer-shaft-catch-far-bushing', 'Offer a shaft through and catch the far bushing', 'Feed a shaft blind through a wall and find the bearing on the other side.', { cue: 'The shaft turns freely once it is caught, with no cocked resistance.', skillYears: 'months', robotNow: 'no' }),
        leaf('stack-shim-to-feeler', 'Stack a shim pack to a feeler target', 'Build a shim stack to a measured clearance and lock it.', { cue: 'The target feeler drags evenly and the next size up will not enter.', precision: 5, prim: ['inspect', 'insert'] }),
        leaf('recover-trapped-harness', 'Recover: cover closed on a trapped harness', 'Find the pinched loom, lift the cover, re-dress it and reseat.', { fail: true, horizon: 'medium' }),
      ]),
    ]),

    node('fastening', 'Threaded and mechanical fastening', 'Everything that holds the assembly together, and the feel that says it is holding correctly.', { prev: 'ubiquitous', precision: 3 }, [
      node('start-thread', 'Start a thread without cross-threading', 'The part robots are worst at: finding the thread before applying any torque.', { dexterity: 5, contact: 5, robotNow: 'partial' }, [
        leaf('finger-start-bolt', 'Start a bolt by fingers in a blind hole', 'Back off until the thread drops in, then run it down by hand.', { cue: 'It catches two full threads and runs down with no resistance.', prev: 'ubiquitous', saturation: 'thin' }),
        leaf('cross-start-cover-bolts', 'Cross-start four cover bolts', 'Bring a lid down evenly by starting opposite corners in turn.', { cue: 'The lid stays level; no corner pulls down ahead of the others.', prim: ['bimanual', 'inspect'], saturation: 'empty' }),
        leaf('start-overhead-fastener', 'Start a fastener overhead one-handed', 'Hold the part and start the thread with the same hand above head height.', { skillYears: 'months', suit: 'excellent' }),
        leaf('start-captive-screw', 'Start a captive screw through a stack', 'Compress a stack of parts and gaskets while starting the screw.', { cue: 'The screw catches while the stack is still held compressed.', prim: ['bimanual', 'fasten'] }),
        leaf('start-under-held-weight', 'Support a heavy cover and start fasteners', 'Take the weight of a cover with one hand and start bolts with the other.', { dexterity: 3, contact: 5, prim: ['bimanual'], saturation: 'empty', robotNow: 'no' }),
        leaf('start-pipe-thread-taped', 'Start a taped pipe thread', 'Wrap a taper thread and catch it without dragging the tape into the joint.', { cue: 'It catches cleanly with the tape intact and no shredded tail.', prev: 'common' }),
        leaf('recover-cross-thread', 'Recover: cross-threaded fastener', 'Feel the wrong resistance, back it out, inspect the thread, chase or replace.', { fail: true, prim: ['recover', 'inspect'], saturation: 'empty' }),
        leaf('recover-bottomed-bolt', 'Recover: bolt bottomed in a blind hole', 'Diagnose a bolt that torqued without clamping, add the correct washer or shorter bolt.', { fail: true, horizon: 'medium', saturation: 'empty' }),
      ]),
      node('torque', 'Torque fasteners in sequence', 'Getting clamp load right, in the right order, and proving it.', { precision: 4, prev: 'common' }, [
        leaf('torque-to-spec', 'Torque a fastener to spec on a click wrench', 'Set the wrench and pull smoothly to the break.', { cue: 'You stop on the click with no second pull and no bounce.', tool: ['click torque wrench'], repetition: 'high-takt' }),
        leaf('star-pattern-torque', 'Torque a flange in star order', 'Work a bolt circle in the specified sequence over multiple passes.', { cue: 'Every bolt in the pattern breaks at the same setting on the last pass.', horizon: 'medium', prim: ['tool', 'inspect'] }),
        leaf('angle-torque', 'Angle-tighten from a painted line', 'Snug, mark, then turn a specified angle.', { cue: 'The painted line reaches the second mark exactly.', skillYears: 'months', prev: 'uncommon' }),
        leaf('backup-wrench-live-nut', 'Hold a backup wrench and turn the live nut', 'Restrain the fitting while tightening the nut so no torque reaches the line.', { cue: 'The body does not move at all while the nut turns.', prim: ['bimanual', 'tool'], contact: 5, saturation: 'empty' }),
        leaf('torque-stick-on-impact', 'Run an impact through a torque stick', 'Use a torsion-limiting extension and read the colour.', { cue: 'The gun stalls against the stick rather than against the joint.', tool: ['torque stick'], repetition: 'high-takt' }),
        leaf('hose-clamp-index', 'Tighten a hose clamp to its index', 'Close a constant-tension clamp to the marked position.', { cue: 'The index window lines up with the mark.', dexterity: 4, prev: 'common' }),
        leaf('stake-nut-center-punch', 'Stake a nut at the specified scallop', 'Lock a nut mechanically after final torque.', { cue: 'Metal is displaced into the scallop and the nut will not back off by hand.', prim: ['tool'], prev: 'uncommon' }),
        leaf('recover-missed-bolt', 'Recover: one bolt missed in a sequence', 'Detect at audit, back off the affected region, redo the sequence.', { fail: true, horizon: 'medium' }),
        leaf('recover-rounded-hex', 'Recover: rounded hex on a cap screw', 'Extract a rounded fastener without damaging the face, fit a new one, finish the torque.', { fail: true, horizon: 'medium', skillYears: 'months', saturation: 'empty' }),
      ]),
      node('non-threaded-fastening', 'Set clips, rivets and retainers', 'Fasteners that go in once and are judged by a click, a barb or a formed head.', { prev: 'common' }, [
        leaf('press-panel-clip', 'Press a panel clip home', 'Align both legs and press until it seats.', { cue: 'It clicks and the panel will not lift at the clip.', contact: 5, repetition: 'high-takt' }),
        leaf('fir-tree-clip-both-barbs', 'Push a fir-tree clip through a panel', 'Drive a barbed clip through sheet until it is captured.', { cue: 'Both barbs open behind the panel and the clip will not pull back.', prev: 'common' }),
        leaf('seat-caged-nut', 'Seat a caged nut in a square hole', 'Fold a cage nut into a square cutout and lock the cage.', { cue: 'The cage sits flat and the nut floats without falling out.', dexterity: 5 }),
        leaf('walk-trim-clip', 'Walk a trim clip along a flange', 'Slide a clip down a flange to its next locating slot.', { cue: 'It drops into the slot and stops sliding.', dexterity: 5, prev: 'uncommon' }),
        leaf('set-blind-rivet', 'Set a blind rivet', 'Hold parts tight, set the rivet, snap the mandrel.', { cue: 'The mandrel breaks flush and the head is tight with no gap.', tool: ['rivet gun'] }),
        leaf('stake-a-rivet', 'Stake a rivet and form the shop head', 'Upset a solid rivet to a specified head height.', { cue: 'The shop head reaches the gauge height without splitting.', contact: 5, skillYears: 'years', prev: 'uncommon', saturation: 'empty' }),
        leaf('peen-a-pin', 'Peen a pin so it cannot walk back', 'Spread the end of a pin to capture it.', { cue: 'The pin will not move under a tap from either side.', contact: 5, prev: 'rare', saturation: 'empty' }),
        leaf('fit-cotter-pin', 'Fit a cotter pin and bend the legs', 'Pass a split pin and form it to the specified shape.', { cue: 'Both legs are bent to the drawing shape and nothing protrudes into a rotating path.', dexterity: 5 }),
        leaf('recover-clip-wrong-hole', 'Recover: clip landed in the wrong hole', 'Open the clip without breaking it, move it, and reseat.', { fail: true, saturation: 'empty' }),
      ]),
      node('retaining-rings', 'Seat retaining rings', 'Springy parts that must end up fully in a groove and nowhere else.', { dexterity: 5, precision: 5, contact: 5, prev: 'common', saturation: 'empty' }, [
        leaf('seat-snap-ring-full-round', 'Seat a snap ring in its groove', 'Work a ring into a groove all the way round.', { cue: 'It springs full-round and will not rotate out under a screwdriver.' }),
        leaf('expand-ring-pass-shaft', 'Expand a ring, pass the shaft, release it', 'Hold a ring open, feed the shaft through and let it close into the cut.', { cue: 'The ring drops audibly into the groove and the shaft will not withdraw.', prim: ['bimanual', 'tool'] }),
        leaf('fit-circlip', 'Fit an internal circlip', 'Spread the clip with pliers and drop it into the bore groove.', { cue: 'It is seated all round with no ear standing proud.', skillYears: 'months' }),
        leaf('recover-rolled-snap-ring', 'Recover: snap ring rolled in the groove', 'Extract a ring that twisted on the way in and fit a fresh one.', { fail: true }),
        leaf('recover-launched-circlip', 'Recover: circlip launched across the bench', 'Find it, inspect for deformation, replace, refit with a shield.', { fail: true, prev: 'common' }),
      ]),
    ]),

    node('seals-gaskets', 'Gaskets, seals and sealing', 'Everything that has to keep fluid on one side.', { contact: 5, precision: 4, prev: 'common' }, [
      node('gasket-fit', 'Fit a static gasket or O-ring', 'Placing and compressing a static seal.', {}, [
        leaf('place-paper-gasket', 'Place a paper gasket on a face', 'Align holes, hold against gravity, start fasteners without shifting it.', { cue: 'Every bolt hole lines up and no edge overhangs the face.', dexterity: 4, prim: ['bimanual', 'insert'] }),
        leaf('fit-o-ring-groove', 'Fit an O-ring without roll-twist', 'Stretch a ring over a shoulder and settle it in the groove.', { cue: 'No twist anywhere round the ring, checked by running a finger along it.', dexterity: 5, precision: 5, prim: ['deform', 'inspect'] }),
        leaf('apply-rtv-bead', 'Apply a measured sealant bead and close it', 'Lay a continuous bead at constant width and assemble before it skins.', { cue: 'The bead closes on itself, the joint shuts before skin-over, and squeeze-out is wiped clear of the bolt holes.', prim: ['transfer', 'tool'], skillYears: 'months', horizon: 'short' }),
        leaf('route-foam-gasket-corner', 'Route a foam gasket around a corner', 'Lay adhesive foam round a corner without pulling the section thin.', { cue: 'The cut section keeps its width through the corner with no stretch.', prim: ['deform'], prev: 'uncommon', saturation: 'empty' }),
        leaf('recover-twisted-oring', 'Recover: twisted or pinched O-ring on leak test', 'Strip the joint, clean both faces, fit a new seal, retest.', { fail: true, horizon: 'medium' }),
        leaf('recover-relay-bead', 'Recover: clean a face and relay the bead', 'Remove cured sealant from both faces without scoring them, then re-bead.', { fail: true, horizon: 'medium', skillYears: 'months' }),
      ]),
      node('dynamic-seals', 'Fit and repack dynamic seals', 'Seals that move: lip seals, packing, rod seals.', { prev: 'uncommon', skillYears: 'years' }, [
        leaf('press-lip-seal', 'Press in a lip seal square', 'Drive a lip seal with the right sleeve so it enters square.', { cue: 'It bottoms evenly with the lip undamaged and the spring still in place.', precision: 5, tool: ['seal driver'] }),
        leaf('lube-lip-over-chamfer', 'Lubricate a lip and start it over a chamfer', 'Wet the lip and walk it over the shaft lead-in without rolling it.', { cue: 'The lip passes the chamfer facing the right way, unrolled.', dexterity: 5, contact: 5 }),
        leaf('fold-dust-boot-clamp', 'Fold a dust boot over a joint and clamp it', 'Roll a boot into its grooves at both ends and secure the small end.', { cue: 'Both beads sit in their grooves and the boot is not stretched or twisted.', prim: ['deform', 'bimanual'] }),
        leaf('repack-gland', 'Repack a gland', 'Remove old packing, cut rings, stagger joints, tension the follower.', { cue: 'Joints are staggered to spec and the follower pulls up square.', horizon: 'long', saturation: 'empty' }),
        leaf('recover-inverted-lip', 'Recover: seal lip inverted on assembly', 'Detect the leak, extract the seal, fit with the correct protector.', { fail: true }),
      ]),
    ]),

    node('shafts-bearings', 'Shafts, bearings and fits', 'Rotating assemblies where microns matter and feel is the instrument.', { precision: 5, contact: 5, skillYears: 'years', prev: 'common' }, [
      node('bearing-fit', 'Fit a bearing without damage', 'Getting a bearing on or in without passing load through the raceway.', { capital: 'mid' }, [
        leaf('press-bearing-arbor', 'Press a bearing with an arbor press', 'Support the correct race and press square to the shoulder.', { cue: 'Load steps up as it touches the shoulder and travel stops.', tool: ['arbor press'] }),
        leaf('press-bushing-to-shoulder', 'Press a bushing to shoulder with even ram travel', 'Drive a bushing home at a steady rate, watching for cocking.', { cue: 'Ram travel is even to the shoulder with no sudden change in effort.', contact: 5 }),
        leaf('induction-heat-fit', 'Induction heat and fit a bearing', 'Heat to temperature and place fast and square before it grips.', { cue: 'It reaches the shoulder before it locks, in one movement.', horizon: 'short', capital: 'capex', prev: 'uncommon' }),
        leaf('recover-bearing-short', 'Recover: bearing stopped short of the shoulder', 'Detect the gap, support correctly and repress to the shoulder.', { fail: true, saturation: 'empty' }),
        leaf('recover-brinelled-race', 'Recover: bearing brinelled through the wrong race', 'Identify the noise, strip, replace, correct the tooling.', { fail: true, horizon: 'long', saturation: 'empty' }),
      ]),
      node('press-fits', 'Press an interference fit by feel', 'Assembly by force where the load curve is the only feedback.', { contact: 5, prev: 'uncommon' }, [
        leaf('press-pin-into-bore', 'Start a pin square in a blind hole', 'Enter a dowel pin square and press it to depth.', { cue: 'It starts without cocking and the load curve stays smooth to the shoulder.', precision: 5 }),
        leaf('drive-roll-pin-flush', 'Drive a roll pin to flush', 'Set a spring pin with a punch and stop level with the face.', { cue: 'Flush with the face, not driven past it.', tool: ['pin punch'], dexterity: 5 }),
        leaf('press-pulley-to-gauge-line', 'Press a pulley onto a taper', 'Draw a pulley up a taper and stop at the reference.', { cue: 'The hub face reaches the gauge line and no further.', precision: 5 }),
        leaf('press-ball-joint-clip-groove', 'Press a ball joint until the groove shows', 'Drive a joint into its housing far enough to accept the retainer.', { cue: 'The clip groove is fully visible all the way round.', prev: 'common' }),
        leaf('recover-stuck-part', 'Recover: part stuck part-way into a bore', 'Decide between pressing through and extracting, without galling the bore.', { fail: true, skillYears: 'years' }),
      ]),
      node('keys-splines', 'Key, spline and mesh', 'Getting rotating parts into the one angular relationship that is correct.', { dexterity: 5, precision: 5, prev: 'common', saturation: 'empty' }, [
        leaf('start-woodruff-key', 'Start a woodruff key and tap it down', 'Seat a curved key into a shaft keyway.', { cue: 'The keyway is filled and the key sits level with no rock.', tool: ['soft mallet'] }),
        leaf('align-coupling-hub-to-mark', 'Align a coupling hub to a shaft mark', 'Bring a hub to its rotational mark and slide it to depth.', { cue: 'The marks line up and the hub face reaches the set depth.', prim: ['inspect', 'insert'] }),
        leaf('mesh-gears-to-paint-mark', 'Mesh two gears to a marked tooth', 'Bring two gears together on their timing marks and hold backlash.', { cue: 'Marked teeth engage together and backlash measures inside the window.', contact: 5, skillYears: 'years', robotNow: 'no' }),
        leaf('insert-spline-witness-hole', 'Insert a spline to its witness hole', 'Feed a splined shaft in and rotate until it drops through.', { cue: 'The witness hole lines up and the shaft seats fully.', prim: ['insert', 'inspect'] }),
        leaf('recover-mis-timed-mesh', 'Recover: gears meshed one tooth out', 'Detect the timing error, separate far enough to re-clock, remesh.', { fail: true, horizon: 'medium' }),
      ]),
      node('alignment', 'Align a coupling with shims', 'Making two rotating things agree about where the centreline is.', { horizon: 'long', skillYears: 'years', capital: 'mid', saturation: 'empty' }, [
        leaf('dial-indicator-align', 'Align a coupling with dial indicators', 'Sweep, read four positions, calculate, shim, repeat.', { cue: 'Readings fall inside tolerance at all four positions on a confirming sweep.', prim: ['inspect', 'tool'], robotNow: 'no' }),
        leaf('laser-align-coupling', 'Laser align a coupling', 'Mount the heads, sweep, then shim and move to the live readout.', { cue: 'Both offset and angularity read green on a confirming sweep.', capital: 'capex' }),
        leaf('cut-shims', 'Cut and fit alignment shims', 'Cut shim stock, deburr, stack to a calculated height.', { cue: 'The stack measures the calculated height with no burr holding it apart.', dexterity: 4, precision: 5 }),
        leaf('shim-motor-foot-straightedge', 'Shim a motor foot flat', 'Build a foot up until it sits without rocking.', { cue: 'A straightedge sits flat across all feet with no daylight.', prim: ['inspect'] }),
        leaf('recover-soft-foot', 'Recover: soft foot discovered mid-alignment', 'Detect the moving foot, diagnose the cause, correct before continuing.', { fail: true, horizon: 'long' }),
      ]),
    ]),

    node('routing', 'Dress and route on a machine', 'Belts, chains and flexible lines: long compliant things that have to end up on a defined path.', { dexterity: 4, contact: 5, horizon: 'medium', robotNow: 'no', saturation: 'empty', prim: ['deform', 'bimanual', 'tool'], prev: 'common' }, [
      node('belts-chains', 'Fit belts and chains', 'Getting drive elements onto their wheels without damage.', {}, [
        leaf('feed-belt-first-pulley', 'Feed a belt onto the first pulley', 'Seat a belt in the first groove and gather the slack.', { cue: 'The belt sits in the groove with the slack held on the free side.', prim: ['bimanual'] }),
        leaf('walk-belt-second-pulley', 'Walk a belt onto the second pulley', 'Rotate the drive and lead the belt over the rim.', { cue: 'It rolls fully into the groove without the edge folding under.', dexterity: 5, skillYears: 'months' }),
        leaf('tension-belt-to-deflection', 'Tension a belt to a deflection mark', 'Move the adjuster until the span deflects the specified amount, then lock.', { cue: 'The span deflects to the gauge mark under thumb load and holds after locking.', precision: 4, prim: ['inspect', 'tool'] }),
        leaf('lay-chain-join-master-link', 'Lay a chain over sprockets and join it', 'Route a chain and close the master link.', { cue: 'The clip faces the correct way and the joint articulates like the rest of the chain.', dexterity: 5 }),
        leaf('clock-cam-to-tdc', 'Clock a cam to TDC on two pulleys at once', 'Hold two timing marks together while the belt goes on.', { cue: 'Both marks stay on their pointers after two full turns by hand.', skillYears: 'years', contact: 4, prim: ['bimanual', 'inspect'] }),
        leaf('recover-chain-one-pitch-long', 'Recover: chain assembled one pitch long', 'Split the chain, remove a link, rejoin and re-tension.', { fail: true, horizon: 'medium' }),
      ]),
      node('flexible-lines', 'Route flexible lines', 'Hoses, tubes and cables that must be led without kinking or chafing.', { prev: 'common' }, [
        leaf('lead-flex-shaft-through-grommet', 'Lead a flexible shaft through a grommet', 'Feed a flexible drive through a bulkhead without a kink.', { cue: 'It passes with the grommet seated and no tight radius at the entry.' }),
        leaf('coil-service-loop', 'Coil a service loop to a set diameter', 'Leave slack coiled to a specified size so the line can be worked on later.', { cue: 'The loop measures the specified diameter and lies flat.', precision: 3 }),
        leaf('tie-cable-to-drag-chain', 'Tie a moving cable into a drag chain', 'Lay cables into a moving carrier in the correct order and secure them.', { cue: 'Each line is in its assigned shelf and none is tensioned across the bend.', horizon: 'long', skillYears: 'months' }),
        leaf('dress-pneumatic-tube-ladder', 'Dress pneumatic tube into a clip ladder', 'Run tubing down a run of clips in order.', { cue: 'Every clip is closed and the tube runs straight between them.', repetition: 'batched' }),
        leaf('hold-bend-radius-hydraulic-hose', 'Hold minimum bend radius on a hose at a corner', 'Route a stiff hose around a corner without going below its rated radius.', { cue: 'The radius stays above the marked minimum and the hose is not twisted along its axis.', contact: 5, skillYears: 'years' }),
        leaf('recover-kinked-line', 'Recover: line kinked during routing', 'Find the kink, judge whether the line is scrap, re-route or replace.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
    ]),

    node('adjust-set', 'Adjust, time and set', 'Closed-loop human control: move something until a measurement says stop, then lock it there without losing it.', { precision: 5, contact: 4, skillYears: 'years', robotNow: 'no', saturation: 'empty', prim: ['inspect', 'tool'], prev: 'common', notes: 'The hardest cluster in the domain. The operator is a controller reading a gauge, and the lock-off step usually disturbs the value they just set.' }, [
      node('to-a-gauge', 'Set against a gauge', 'Adjust until an instrument reads the target.', {}, [
        leaf('set-valve-lash-feeler', 'Set valve lash to a feeler', 'Adjust the clearance and lock the jam nut.', { cue: 'The target feeler drags and the next size will not enter, still true after locking.', dexterity: 5 }),
        leaf('zero-pointer-lock-collar', 'Zero a pointer on a scale and lock it', 'Bring an indicator to zero and lock without moving it.', { cue: 'The pointer still reads zero after the collar is locked.', precision: 5 }),
        leaf('set-end-play-dial', 'Set end-play with a dial indicator', 'Adjust a bearing nut until axial float reads in range.', { cue: 'The dial shows float inside the window and repeats over three checks.', skillYears: 'years' }),
        leaf('centre-coupling-gap-feeler', 'Centre a coupling gap all round', 'Set axial gap equal at every position.', { cue: 'The same feeler drags at all four positions.', prim: ['inspect'] }),
        leaf('recover-setting-lost-on-lock', 'Recover: setting moved while locking it', 'Detect the shift caused by the lock-off, back out and reset with the lock accounted for.', { fail: true, horizon: 'medium' }),
      ]),
      node('to-a-window', 'Set until it just trips', 'Adjust to the edge of a behaviour rather than to a number.', {}, [
        leaf('adjust-limit-switch-just-trips', 'Adjust a limit switch to the trip point', 'Move a switch until the actuator only just operates.', { cue: 'It trips at the target position and resets before the mechanical stop.', precision: 4 }),
        leaf('set-belt-tracking-on-crown', 'Set belt tracking so it stays on the crown', 'Adjust roller angle and watch the belt migrate.', { cue: 'The belt holds centre over several full revolutions without creeping.', horizon: 'medium', skillYears: 'years' }),
        leaf('adjust-cable-free-play-window', 'Adjust a cable to its free-play window', 'Take up or release a cable until slack is in range.', { cue: 'Free play measures inside the window at the lever.' }),
        leaf('set-spring-preload-coil-count', 'Set spring preload to a coil count', 'Wind preload to a marked number of coils or turns.', { cue: 'The painted coil count matches the spec at rest.', contact: 5 }),
        leaf('recover-overshot-adjustment', 'Recover: adjustment overshot the window', 'Come back onto the target from the correct direction to take out backlash.', { fail: true }),
      ]),
      node('timing-clearance', 'Time and clear', 'Setting angular relationships and physical gaps by eye and by mark.', { prev: 'common' }, [
        leaf('time-sprocket-to-chain-mark', 'Time a sprocket to a chain mark', 'Align the marked link to the marked tooth and clamp.', { cue: 'The marks stay aligned after the clamp is pinched and the assembly is turned by hand.' }),
        leaf('align-fan-to-shroud-daylight', 'Align a fan to a shroud gap', 'Set a rotating part concentric within its housing by eye.', { cue: 'Equal daylight all the way round, checked at four positions.', prim: ['inspect'], precision: 4 }),
        leaf('wind-torsion-spring-to-index', 'Wind a torsion spring to its index and pin it', 'Preload a clock or torsion spring and capture it.', { cue: 'The index lines up and the pin drops in without forcing.', contact: 5, skillYears: 'years', prev: 'uncommon' }),
        leaf('recover-mis-timed-sprocket', 'Recover: sprocket timed one tooth out', 'Detect from the mark, release, re-time and re-clamp.', { fail: true }),
      ]),
    ]),

    node('subassembly', 'Subassembly and kitting', 'The flow work around the assembly itself.', { dexterity: 3, precision: 2, contact: 3, skillYears: 'none', robotNow: 'yes', saturation: 'heavy', prev: 'ubiquitous' }, [
      node('kitting', 'Kit and present parts', 'Getting the right parts to the bench in the right order.', { repetition: 'high-takt' }, [
        leaf('pick-to-kit-tray', 'Pick parts into a kit tray', 'Read the list, pick from bins, place in tray cells, confirm.', { cue: 'Every cell is filled and the list is fully ticked.', saturation: 'heavy', robotNow: 'yes' }),
        leaf('deburr-and-clean-part', 'Deburr and clean an incoming part', 'Inspect edges, deburr, wipe, present ready for assembly.', { cue: 'No edge catches a fingernail and no swarf remains in the bore.', prim: ['inspect', 'tool', 'transfer'], contact: 4 }),
        leaf('recover-wrong-part-in-kit', 'Recover: wrong part number in the kit', 'Notice at fit-up, stop, source the correct part, log the miskit.', { fail: true, saturation: 'empty', prim: ['inspect', 'language', 'recover'] }),
        leaf('recover-dropped-fastener', 'Recover: fastener dropped into the assembly', 'Retrieve a dropped washer or bolt with a magnet or scope before it becomes debris.', { fail: true, dexterity: 5, contact: 4, tool: ['magnetic wand'], saturation: 'empty' }),
      ]),
      node('build-sequence', 'Follow and teach a build sequence', 'Following, departing from, and passing on a documented sequence.', { horizon: 'long', prev: 'common' }, [
        leaf('follow-work-instruction', 'Follow an illustrated work instruction', 'Read a step, act, confirm, advance, with the screen at the bench.', { prim: ['language', 'inspect'], saturation: 'thin' }),
        leaf('build-from-drawing', 'Build a subassembly from a drawing only', 'Infer the sequence from a 2D drawing without a written procedure.', { skillYears: 'years', robotNow: 'no', saturation: 'empty' }),
        leaf('train-a-colleague', 'Show a colleague how to do the step', 'Demonstrate, narrate, correct their hands, hand the tool over.', { prim: ['language', 'bimanual'], saturation: 'empty', notes: 'Instruction-while-doing is exactly the multimodal data a VLA wants and nobody records.' }),
      ]),
    ]),

    node('closeout', 'Close out and release', 'The last pass: locking, witnessing and getting the finished unit off the fixture in one piece.', { dexterity: 4, contact: 4, prev: 'common', saturation: 'empty' }, [
      node('lock-and-witness', 'Lock and witness the work', 'Making the assembly tamper-evident and provably finished.', { precision: 4 }, [
        leaf('safety-wire-two-heads', 'Safety-wire two bolt heads', 'Twist lockwire between fasteners so neither can loosen.', { cue: 'The wrap pulls each head in the tightening direction, with the twist rate and tail length to spec.', dexterity: 5, skillYears: 'years', prev: 'uncommon', partner: 'licensed', robotNow: 'no' }),
        leaf('paint-stripe-torque-pattern', 'Paint-stripe a torque pattern', 'Mark every fastener after the final pass so a missed one is visible.', { cue: 'Every head in the pattern carries an unbroken stripe onto the part.', prim: ['tool', 'inspect'], repetition: 'high-takt' }),
        leaf('install-lock-tab-bend-flat', 'Install a lock tab and bend it', 'Fold a tab washer against a flat of the fastener.', { cue: 'The tab lies flat against a flat, not a corner, and the fastener cannot rotate.', contact: 5 }),
        leaf('fit-cap-over-stud', 'Fit a protective cap over a stud', 'Push a cap on until it holds.', { cue: 'It seats fully and does not spin off under a light pull.', dexterity: 4, repetition: 'high-takt' }),
        leaf('close-guard-quarter-turns', 'Close a guard and lock both fasteners', 'Shut a guard and turn both quarter-turn fasteners home.', { cue: 'Both slots are vertical and the guard has no movement at the edge.', partner: 'site' }),
        leaf('insert-hitch-pin-click-retainer', 'Insert a hitch pin and click the retainer', 'Pass a pin through a clevis and close its keeper.', { cue: 'The retainer clicks over and the pin cannot be withdrawn by hand.' }),
        leaf('shrink-collar-to-mark', 'Heat a shrink collar and slide it to the mark', 'Warm a collar and position it before it grips.', { cue: 'It reaches the mark before it bites and holds there when it cools.', tool: ['heat gun'], horizon: 'short', skillYears: 'months' }),
        leaf('recover-wire-wrapped-wrong-way', 'Recover: lockwire wrapped in the loosening direction', 'Cut the wire out without scoring the part and rewire correctly.', { fail: true, skillYears: 'years' }),
      ]),
      node('release-transfer', 'Release and transfer the unit', 'Getting a finished assembly off the fixture and into transport without disturbing it.', { dexterity: 2, contact: 5, prim: ['bimanual', 'locomote', 'grasp'] }, [
        leaf('lower-unit-off-fixture-pins', 'Lower a completed unit off its fixture pins', 'Lift a finished assembly straight off its locators as one piece.', { cue: 'It comes off all pins together, with nothing catching or hinging.' }),
        leaf('transfer-to-dunnage-nest', 'Transfer an assembly onto a dunnage nest', 'Place a unit into its shaped transport nest.', { cue: 'It settles into every contact point of the nest without a shock landing.', precision: 4 }),
        leaf('pack-grease-to-relief', 'Pack a grease cavity to the relief', 'Fill a cavity and stop at the correct point.', { cue: 'Grease appears at the relief hole and you stop there rather than continuing.', prim: ['transfer', 'tool'], contact: 4 }),
        leaf('recover-shock-on-transfer', 'Recover: unit knocked during transfer', 'Assess a dropped or knocked assembly, decide inspection or rebuild, document it.', { fail: true, prim: ['inspect', 'language', 'recover'], horizon: 'medium' }),
      ]),
    ]),

    node('verification', 'Fit, function and verification', 'Proving the assembly before it moves on.', { contact: 3, dexterity: 3, prim: ['inspect', 'tool'], prev: 'common' }, [
      node('functional-check', 'Turn it, run it, listen to it', 'Judging a finished assembly by hand and ear.', {}, [
        leaf('rotate-and-feel', 'Hand-spin a shaft and feel for rub', 'Turn a finished assembly by hand and judge it.', { cue: 'It spins free with no notch, drag or rub, and you stop rather than forcing it.', contact: 5, skillYears: 'years', robotNow: 'no', saturation: 'empty' }),
        leaf('tug-quick-coupler-sleeve', 'Mate a quick-coupler and tug to confirm', 'Push a coupler home and prove the sleeve has locked.', { cue: 'The sleeve springs forward and the coupler will not separate under a firm pull.', dexterity: 4, prev: 'common' }),
        leaf('bleed-cylinder-until-firm', 'Bleed a small cylinder until the rod is firm', 'Purge air until the actuator stops feeling spongy.', { cue: 'The rod moves without sponginess and the return is immediate.', horizon: 'medium', prim: ['tool', 'inspect'] }),
        leaf('leak-test-assembly', 'Pressure and leak test an assembly', 'Connect, pressurise, hold, watch the gauge, find the leak with soap.', { cue: 'Pressure holds for the specified time with no bubbles at any joint.', capital: 'mid' }),
        leaf('recover-noisy-assembly', 'Recover: assembly noisy on first run', 'Localise the noise, strip only as far as needed, correct, re-run.', { fail: true, horizon: 'long', skillYears: 'years' }),
      ]),
      node('dimensional-check', 'Measure against the drawing', 'Measuring the built thing against what was specified.', { precision: 5, prev: 'common' }, [
        leaf('caliper-measure', 'Measure a feature with calipers', 'Seat the jaws square, read, decide inside tolerance.', { cue: 'The jaws rock to a minimum reading and the value repeats.', prim: ['inspect', 'tool'], repetition: 'high-takt' }),
        leaf('gauge-go-nogo', 'Check with go / no-go gauges', 'Try both gauges with the correct feel.', { cue: 'Go enters under its own weight and no-go does not start.', contact: 4 }),
        leaf('recover-out-of-spec', 'Recover: feature out of spec after assembly', 'Decide rework, shim or reject, and document the disposition.', { fail: true, prim: ['language', 'recover'], horizon: 'medium' }),
      ]),
    ]),
  ],
)
