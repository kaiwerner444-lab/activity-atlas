import { leaf, node, type Opts } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// D20 is the only domain in the atlas that is a grammar rather than a place.
//
// Every other domain holds recovery leaves of its own: 412 of them, tagged
// `fail`, sitting next to the work they belong to. Those are instances. This is
// the vocabulary they are instances of. A cook stopping a toss when a piece
// leaves the pan, an electrician racking a breaker back to isolated and a
// harness tech backing out a crimp are three occurrences of the same five
// moves: freeze, isolate, undo, replace, prove.
//
// That is why it stays a root. Kept only as tags it would be invisible in a
// planning conversation, and recovery is the single emptiest thing in this
// field. Every demonstration corpus in robotics is a success corpus, because
// the collection protocol discards the takes where something went wrong. The
// takes where something went wrong are the data.
//
// Two consequences run through the whole file. Saturation is `empty` almost
// everywhere and it is not laziness: there is genuinely no public set of a
// person breaking a joint to kill false torque or proving dead on a known live.
// And a great many leaves here are ordering constraints or negative
// constraints, where the correct behaviour is a wait, a refusal, or a step
// taken before the obvious one. Those have no positive motion to imitate.

/**
 * Every leaf in this domain is a failure or rework leaf by construction, which
 * also gives them all the `recover` primitive at normalisation time.
 */
const rec = (id: string, title: string, def: string, opts: Opts = {}): NodeSpec =>
  leaf(id, title, def, { fail: true, ...opts })

export const d20: NodeSpec = node(
  'd20',
  'Failure, diagnosis and recovery',
  'The grammar of things going wrong: freeze, isolate, undo, replace, prove. Present in every other branch as a tagged leaf, and here as a root so it is never forgotten.',
  {
    setting: 'industrial',
    dexterity: 4,
    precision: 4,
    contact: 5,
    horizon: 'medium',
    repetition: 'one-shot',
    capital: 'cheap',
    partner: 'site',
    skillYears: 'years',
    suit: 'excellent',
    robotNow: 'no',
    embodiment: ['ego', 'suit', 'video'],
    saturation: 'empty',
    ours: 'none',
    rights: 'easy',
    ethics: 'open',
    prev: 'ubiquitous',
    prim: ['recover', 'inspect', 'tool', 'bimanual'],
  },
  [
    node('freeze', 'Freeze and read the fault', 'The first few seconds, which decide whether there is anything left to diagnose.', { horizon: 'short', contact: 2, prev: 'ubiquitous' }, [
      node('first-seconds', 'The first three seconds', 'Stop moving before you do anything else.', { dexterity: 2 }, [
        rec('freeze-both-hands-on-the-fault', 'Freeze both hands where they are', 'Stop mid-motion the instant a fault shows.', { cue: 'Neither hand has moved and neither has advanced into a worse place.', notes: 'The instinct is to react. The correct act is to stop, because the next movement usually destroys the state that would have explained the fault.' }),
        rec('set-the-live-tool-down-in-sight', 'Set the live tool down in sight', 'Park whatever is running or energised.', { cue: 'It is on a known surface where you can see it, not in a pocket and not on the part.', prim: ['transfer'] }),
        rec('point-at-the-locus-one-handed', 'Point at the fault locus one-handed', 'Indicate where it went wrong without touching it.', { cue: 'One finger indicates; the other hand stays off the machine.', prim: ['language', 'inspect'], contact: 1 }),
      ]),
      node('trace', 'Trace it to a locus', 'Narrow the fault to a place before you touch anything.', { prim: ['inspect'], contact: 2 }, [
        rec('trace-last-good-to-first-bad', 'Trace from last-good to first-bad', 'Walk a run with a finger until the state changes.', { cue: 'You stop at the first bad point rather than continuing to the end.', notes: 'A bisection search performed with a fingertip. The stopping rule is the content and it is not a motion.' }),
        rec('listen-stance-hands-off', 'Take a listening stance', 'Locate a fault by sound.', { cue: 'Head turned to the source, hands off, and two seconds of stillness before you move.', dexterity: 1, contact: 1, notes: 'A deliberate two-second null action. Nothing visible happens, which is exactly why no video corpus contains it.' }),
        rec('heat-pass-back-of-the-hand', 'Heat-pass with the back of the hand', 'Check a joint for heat without committing a grip.', { cue: 'Back of the hand only, near the joint, never on a rotating face or a live bus.', contact: 3, skillYears: 'months' }),
      ]),
      node('provoke', 'Provoke it, once', 'Make it happen again on purpose, under control.', { contact: 4, dexterity: 3 }, [
        rec('wiggle-test-watching-the-joint', 'Wiggle-test while watching that joint', 'Disturb a connection and observe locally.', { cue: 'Your eyes are on the joint you are moving, not on the far end of the machine.', notes: 'Watching the wrong end is the classic error and the two versions are motorically identical.' }),
        rec('tug-test-axial-then-let-it-sit', 'Tug-test one circuit axially', 'Load a single connection along its axis.', { cue: 'One circuit, straight pull, then you let it sit.', verify: 'Nothing creeps back out in the seconds after you release it.' }),
        rec('shake-once-then-stop-and-look', 'Shake to recreate, once', 'Apply one controlled disturbance.', { cue: 'One disturbance, then you stop and look before considering a second.', notes: 'The rule is a rate limit on your own experiment. Repeating it immediately destroys the observation.' }),
      ]),
    ]),

    node('isolate', 'Put the energy in a known state', 'The step that has to happen before every real repair, and the one people skip.', { contact: 3, horizon: 'short', partner: 'site', prev: 'common' }, [
      node('break-the-path', 'Break the path', 'Remove the energy at the nearest point.', { dexterity: 3 }, [
        rec('unplug-and-cap-the-plug', 'Isolate at the nearest connector', 'Unplug and secure the loose end.', { cue: 'The plug is parked or capped so it cannot fall back in behind you.', prim: ['separate', 'grasp'] }),
        rec('close-the-valve-handle-visible', 'Isolate at the nearest valve', 'Shut off a fluid or gas path.', { cue: 'The handle is left where its position can be read from where you will be working.' }),
        rec('block-or-crib-the-load', 'Block the load so it cannot move', 'Remove stored mechanical energy.', { cue: 'It cannot move while you walk away for a part.', contact: 5, notes: 'Gravity is the energy source people forget to isolate.' }),
        rec('cap-an-open-port-before-leaving', 'Cap an open port or conductor', 'Close what you opened before you leave it.', { cue: 'Nothing can enter it while you are away from the machine.' }),
      ]),
      node('lock-and-prove', 'Lock out and prove dead', 'The canonical verify step in the whole atlas.', { partner: 'licensed', skillYears: 'years', ethics: 'open' }, [
        rec('lock-out-and-try-start', 'Lock out the isolator', 'Isolate, lock and attempt a start.', { cue: 'Isolator off, your lock on.', verify: 'The try-start is dead. Isolating and isolating-then-confirming are the same motion to a camera and are not the same act.', notes: 'The single clearest argument in the atlas for capturing the proof step as data.' }),
        rec('prove-isolation-live-dead-live', 'Prove dead on a known live', 'Test the tester either side of the circuit.', { cue: 'Tester on a known live, on the circuit, then on the known live again.', verify: 'The instrument is proven working after the reading, not only before it.', precision: 3 }),
        rec('fit-a-temporary-bond-and-tug-it', 'Fit a temporary earth or bond', 'Apply a temporary bond to a frame or panel.', { cue: 'It is on the intended point.', verify: 'You tug it before you leave the panel.' }),
      ]),
      node('racking', 'Rack and reset switchgear', 'Moving a device between defined electrical positions.', { partner: 'licensed', skillYears: 'years', capital: 'capex', dexterity: 3, precision: 3 }, [
        rec('reset-a-trip-hands-clear', 'Reset a trip physically', 'Clear a trip at the handle, button or rack.', { cue: 'Hands are clear of the machine for the first cycle after the reset.' }),
        rec('rack-to-isolated-confirm-indicator', 'Rack to isolated', 'Move a breaker or bucket to the isolated position.', { cue: 'It reaches the detent.', verify: 'The position indicator reads isolated; the handle feel is not the confirmation.' }),
        rec('rack-to-test-then-back-to-isolated', 'Rack to test, check, rack back', 'Use the test position for a local check.', { cue: 'It ends back at isolated, not left at test.', notes: 'A deliberate return to the safe state after a diagnostic excursion. The excursion is easy to record and the return is the part that is skipped.' }),
        rec('rack-to-connect-last', 'Rack to connect', 'Return the device to service.', { cue: 'This happens only after every recovery step above is finished.', verify: 'The indicator reads connected and nobody is inside the enclosure.' }),
      ]),
    ]),

    node('undo', 'Undo the last thing you did', 'Reversal, which is not the forward sequence played backwards.', { contact: 4, dexterity: 4, horizon: 'medium', prev: 'ubiquitous' }, [
      node('back-out', 'Back out the last step', 'Return to the last state that was known good.', { precision: 4 }, [
        rec('restore-the-last-good-configuration', 'Restore the last-good configuration', 'Put the known-good part or setting back before trying anything new.', { cue: 'The machine is back at a state that worked before you invent a different one.', notes: 'An ordering constraint over the whole diagnostic. Stacking a new theory on an unreverted change is how faults become permanent.' }),
        rec('back-out-a-fastener-counting-turns', 'Back out the last fastener, counting', 'Reverse a fastener you just ran.', { cue: 'You know the turn count, so you know it came out of that hole.', prim: ['fasten', 'tool'] }),
        rec('undo-a-wrap-scrap-in-hand', 'Undo the last wrap or tie', 'Remove a wrap you just made.', { cue: 'The scrap stays in your hand until it is in the bin, never on the floor or in the machine.', prim: ['deform', 'separate'] }),
        rec('extract-with-the-proper-tool', 'Extract the last insertion properly', 'Remove a seated part.', { cue: 'The extraction tool does the work; the lead or the hose is never the handle.', prim: ['tool'], notes: 'Pulling the wire to free the pin is the single most common way a repair becomes two repairs.' }),
        rec('open-the-joint-and-look-at-the-face', 'Open the joint you just closed', 'Reopen a closed joint to inspect it.', { cue: 'You have looked at the face before it closes again.', prim: ['inspect', 'separate'] }),
        rec('hold-still-for-a-second-look', 'Hold still for a second pair of eyes', 'Stop work so somebody else can see the state.', { cue: 'You stay stopped through the look rather than working under it.', contact: 1, dexterity: 1, prim: ['language'], notes: 'Continuing to work while somebody inspects is the failure mode. The correct behaviour is to do nothing, visibly.' }),
      ]),
      node('free-and-relay', 'Free a trapped or crossed run', 'Lines that ended up somewhere they cannot stay.', { dexterity: 5, prim: ['deform', 'bimanual'] }, [
        rec('lift-a-cover-that-trapped-a-line', 'Lift a cover that trapped a line', 'Release something pinched by an assembly step.', { cue: 'You hold the cover until the line is clear, rather than letting it drop back on it.', contact: 5 }),
        rec('untangle-and-relay-in-order', 'Untangle two crossed lines', 'Separate and re-lay two runs.', { cue: 'They go back in the original order before anything clips them.', precision: 4 }),
        rec('un-kink-and-re-clip-the-path', 'Un-kink and re-clip a run', 'Straighten a hose or loom and restore its route.', { cue: 'It is back through the clip path and cannot saw on an edge.', verify: 'A hand run along the route finds no contact with a sharp edge.' }),
        rec('add-slack-at-a-tight-node', 'Add slack at a tight node', 'Relieve tension at a connection.', { cue: 'The next mate is not made under tension.' }),
        rec('take-slack-at-a-loose-node', 'Take slack at a loose node', 'Remove excess at a connection.', { cue: 'The run cannot whip or rub anywhere along its length.' }),
      ]),
      node('reassemble-in-order', 'Put it back in the order it came apart', 'Sequence memory, held outside your head.', { precision: 4, horizon: 'medium' }, [
        rec('rebuild-an-exploded-clip', 'Rebuild an exploded clip or retainer', 'Reassemble something that came apart under spring.', { cue: 'The pieces go back in the order they left.', dexterity: 5 }),
        rec('rethread-from-the-last-good-stitch', 'Rethread from the last good stitch', 'Restart a lace or wire run from a known point.', { cue: 'You start from the last good stitch, never a fresh wrap over a mess.' }),
        rec('rewrap-from-the-mark-to-the-mark', 'Rewrap a bad tape job from the mark', 'Redo a wrap between two marks.', { cue: 'The overlap runs from the start mark to the end mark.' }),
        rec('count-and-row-in-removal-order', 'Count the pieces and lay them in a row', 'Externalise the disassembly sequence.', { cue: 'Every piece that came out is in the row, in the order it came out.', verify: 'The count on the bench matches the count you took out.', notes: 'A working-memory offload with no manipulation content. It is what separates a recoverable teardown from a scrap part.' }),
        rec('reverse-the-row-back-in', 'Reverse the row back into the assembly', 'Rebuild from the laid-out sequence.', { cue: 'The row is empty at the end, with nothing skipped and nothing left over.', verify: 'No piece remains on the bench.' }),
      ]),
    ]),

    node('swap', 'Swap, reseat and replace', 'The substitution family: prove it is the part, then change the part.', { dexterity: 5, precision: 4, horizon: 'medium', prev: 'common' }, [
      node('compare-and-swap', 'Compare, swap, park the suspect', 'Bisection at the component level.', {}, [
        rec('compare-known-good-in-two-hands', 'Compare known-good against the suspect', 'Hold both and read the difference.', { cue: 'You have compared seats, marks and damage on both before either goes anywhere.', prim: ['inspect', 'bimanual'], contact: 3 }),
        rec('swap-in-known-good-and-land-it', 'Swap in a known-good module', 'Substitute a part believed good.', { cue: 'It is fully landed, latch, shoulder or torque, before any test runs.', notes: 'Testing a half-seated substitution produces a false negative and sends the whole diagnosis backwards.' }),
        rec('park-the-suspect-in-a-reject-pose', 'Park the suspected-bad part', 'Segregate a part under suspicion.', { cue: 'It is in a reject position, never back in the kit.', prim: ['transfer'], notes: 'A suspect part returned to stock is a fault that will be fitted again by somebody else.' }),
      ]),
      node('reseat', 'Reseat and retry once', 'The cheapest repair, and the rule that stops it becoming a habit.', { dexterity: 5, contact: 5 }, [
        rec('reseat-until-the-latch-is-unmistakable', 'Reseat a half-home part', 'Push a part fully home.', { cue: 'The latch or shoulder is unmistakable, not merely probable.', verify: 'A tug on the part does not move it.' }),
        rec('clean-dry-and-retry-once', 'Clean the contact and retry once', 'Clean a face and remate it.', { cue: 'Clean, dry, one retry of that same mate.', notes: 'The limit of one is the content. Repeated remating of a dirty contact polishes the fault into something intermittent.' }),
        rec('add-the-missed-part-restart-by-hand', 'Add the missed washer, pin or clip', 'Fit the item that was left out.', { cue: 'The fastener restarts from fingers, never from the gun.', prim: ['fasten'] }),
      ]),
      node('damaged-parts', 'Replace what is damaged', 'Parts that cannot be reseated because they are no longer parts.', { precision: 5, skillYears: 'years' }, [
        rec('cut-back-a-nicked-lead-and-relanded', 'Cut out a nicked lead', 'Remove damaged conductor and reland.', { cue: 'You cut back to sound insulation and the replacement is the same length class.' }),
        rec('replace-a-rolled-o-ring-without-twist', 'Replace a rolled O-ring or snap ring', 'Extract and reseat a sealing or retaining ring.', { cue: 'The old one is binned and the new one seats without twist.', dexterity: 5 }),
        rec('bin-a-rounded-fastener', 'Replace a rounded fastener', 'Remove and discard a damaged fastener.', { cue: 'The ruined one goes in the bin, never back in to hold something temporarily.', notes: 'Discarding a part that still functions is a rule no efficiency objective produces on its own.' }),
        rec('chase-a-thread-and-clear-the-chips', 'Chase a damaged thread', 'Repair a thread with a tap or die.', { cue: 'The chips are wiped or blown out of the hole afterwards.', verify: 'The hole is clear, so the next bolt bottoms on thread and not on swarf.', prim: ['tool'] }),
        rec('fit-a-thread-insert-and-finger-test', 'Fit a thread insert', 'Install a helical or solid insert.', { cue: 'The full physical sequence for that insert type is completed.', verify: 'The next bolt starts by fingers.' }),
      ]),
      node('line-replaceable', 'Line-replaceable items', 'The parts a plant expects to change under fault.', { skillYears: 'months', capital: 'mid' }, [
        rec('replace-a-fuse-matching-the-rating', 'Replace a fuse with a puller', 'Change a fuse correctly.', { cue: 'The puller is used and both ends are seated.', verify: 'The rating on the body matches the rating on the chart, read off the part rather than remembered.', partner: 'licensed' }),
        rec('replace-an-overload-to-nameplate', 'Replace a breaker or overload', 'Change a protective device and set it.', { cue: 'The dial is set from the nameplate, not from where the old one happened to be.', partner: 'licensed', precision: 4 }),
        rec('replace-a-shear-pin-same-grade', 'Replace a shear pin', 'Change a mechanical fuse.', { cue: 'Same grade as specified, never a bolt off the floor.', notes: 'Substituting a stronger pin removes the protection the pin exists to provide. The wrong action looks more competent than the right one.' }),
        rec('refit-a-thrown-belt-then-tension', 'Re-fit a thrown belt', 'Return a belt to its pulleys.', { cue: 'It is on both pulleys with no rolled edge, then tensioned.', contact: 5 }),
        rec('refit-a-chain-and-close-the-link', 'Re-fit a thrown chain', 'Return a chain to its sprockets.', { cue: 'Over both sprockets, with the master link closed the correct way round.', verify: 'The clip trails the direction of travel.' }),
        rec('refit-every-guard-and-latch', 'Re-fit every guard you removed', 'Restore all guarding before handing back.', { cue: 'Every guard is on and every latch has been physically hit.', verify: 'You counted the guards off and counted them back on.', notes: 'The last guard is the one that gets left off, because by then the repair feels finished.' }),
      ]),
    ]),

    node('readjust', 'Reset an adjustment', 'Nothing is broken; something moved off its reference.', { precision: 5, dexterity: 4, skillYears: 'years', horizon: 'medium', prev: 'common' }, [
      node('datum', 'Back to the datum', 'Restore a geometric reference.', { contact: 4 }, [
        rec('re-clock-to-the-key', 'Re-clock a part to its key', 'Restore angular position.', { cue: 'The marks meet before any torque goes on.' }),
        rec('re-square-to-the-pins', 'Re-square a part to its datum', 'Return a part to its locating features.', { cue: 'It is against the pins or the edge, not merely close to them.' }),
        rec('re-level-until-the-gap-is-even', 'Re-level a base', 'Restore a level reference.', { cue: 'The bubble is centred or the witness gap is even all the way round.', verify: 'The gap reads the same at every corner, not only where you checked first.' }),
        rec('re-shim-to-the-measured-stack', 'Re-shim to the measured stack', 'Restore a clearance with shims.', { cue: 'The stack matches the height you measured, never an added guess.', precision: 5, notes: 'The failure is qualitative substitution for a quantity that was actually measured.' }),
      ]),
      node('motion', 'Back to the motion spec', 'Restore a dynamic relationship between two parts.', { contact: 5 }, [
        rec('re-time-two-marks-then-lock', 'Re-time two marks', 'Restore a timing relationship.', { cue: 'Both marks meet at the same instant and the lock goes on before you let go.' }),
        rec('re-mesh-and-hold-backlash', 'Re-mesh teeth to the paint mark', 'Restore a gear mesh.', { cue: 'Backlash is held while the fasteners come up.', prim: ['bimanual'] }),
        rec('re-tension-to-the-window', 'Re-tension to the mark', 'Restore tension and lock it.', { cue: 'It reads inside the window, then the adjuster is locked.' }),
        rec('re-track-for-a-full-hand-turn', 'Re-track a belt or chain', 'Restore running position.', { cue: 'It rides on the crown or in the groove.', verify: 'It stays there for a full hand-turn, not for the first few degrees.' }),
      ]),
      node('fluid-and-torque', 'Fluid, grease and torque', 'Restoring things that are not geometry.', { contact: 4 }, [
        rec('re-bleed-until-firm-and-clear', 'Re-bleed a small circuit', 'Remove air from a hydraulic or brake circuit.', { cue: 'The motion is firm and the fluid runs clear of air.', prim: ['tool', 'inspect'] }),
        rec('re-pack-until-clean-grease-shows', 'Re-pack a grease cavity', 'Refill a bearing or cavity.', { cue: 'You stop when clean grease shows at the relief, rather than when the gun is empty.', notes: 'The stop condition is a state change in the material, which is the exact class of cue a camera reads badly and a hand reads instantly.' }),
        rec('re-torque-the-pattern-from-bolt-one', 'Re-torque a pattern in sequence', 'Retighten a bolt pattern correctly.', { cue: 'You start at the first bolt in the specified sequence, not the bolt nearest your hand.' }),
        rec('break-a-joint-to-kill-false-torque', 'Break a joint and retighten to spec', 'Remove false torque from a made joint.', { cue: 'The joint is broken loose first, then brought up to spec.', notes: 'Loosening a correctly-tight bolt on purpose. Almost every learned policy would treat this as undoing progress.' }),
      ]),
    ]),

    node('persuade', 'Force, support and extraction', 'When it will not move, or when it is about to move on its own.', { contact: 5, dexterity: 3, skillYears: 'years', prev: 'common' }, [
      node('stuck', 'Get it to move', 'Controlled force against a stuck part.', { precision: 3 }, [
        rec('heat-a-seized-fastener-break-on-heat', 'Heat a seized fastener', 'Apply heat to free a seized thread.', { cue: 'You break it while it is hot, not with a jerk once it has cooled.', notes: 'A timing constraint on a force application, cued by a temperature you cannot see.' }),
        rec('cool-a-fit-and-seat-before-it-returns', 'Cool a fit and seat it', 'Use thermal contraction to start an interference fit.', { cue: 'It is seated before the temperature comes back.', horizon: 'short' }),
        rec('dead-blow-on-the-correct-boss', 'Persuade with a dead-blow', 'Strike a part to move it.', { cue: 'The blow lands on the intended boss, never on a flange face or a housing ear.', prim: ['tool'] }),
        rec('pull-until-it-walks-off-square', 'Pull with a puller on the feature', 'Extract with a puller.', { cue: 'The part walks off square rather than cocking.', prim: ['tool', 'bimanual'] }),
        rec('slide-hammer-on-a-threaded-boss', 'Use a slide hammer, then catch it', 'Extract with a slide hammer.', { cue: 'Only on a boss meant for it, and you catch the part when it releases.', notes: 'The catch is the half that gets left out and the half that decides whether the part survives.' }),
      ]),
      node('support', 'Hold the load first', 'The step that precedes releasing anything heavy.', { contact: 5, prim: ['bimanual', 'language'] }, [
        rec('support-before-the-last-fastener', 'Support a hanging load first', 'Take the weight before the last fastener comes out.', { cue: 'A jack, a block or a second person is holding it before the fastener moves.', notes: 'A strict ordering constraint where the wrong order is indistinguishable from the right one until it is too late.' }),
        rec('catch-a-cover-and-set-it-on-edge', 'Catch a falling cover and set it down', 'Control a cover as it releases.', { cue: 'It goes down on its edge, not on its gasket face.' }),
        rec('two-person-lift-count-lift-land', 'Two-person recovery lift', 'Move a load with a partner under fault conditions.', { cue: 'Count, lift, land, and only then does either person let go.', prim: ['language', 'bimanual'] }),
        rec('lower-onto-the-nest-not-the-floor', 'Lower with control onto the nest', 'Set a part down into its location.', { cue: 'It meets the nest or the pins, never the floor.' }),
        rec('crib-so-the-blocks-cannot-kick', 'Crib a load with stacked blocks', 'Build a stable block stack under a load.', { cue: 'The stack cannot kick out.', verify: 'You take the jack off and the crib holds before you go underneath.' }),
      ]),
      node('dropped', 'Recover what fell', 'Finding it is the job; knowing when to stop is the skill.', { dexterity: 5, contact: 4 }, [
        rec('recover-a-dropped-fastener-and-inspect', 'Recover a dropped fastener', 'Retrieve and assess a dropped part.', { cue: 'The thread is inspected before it is considered for reuse.', prim: ['tool', 'inspect'] }),
        rec('sweep-until-you-know-where-it-is', 'Sweep the floor or pit for a missing pin', 'Search systematically for a lost item.', { cue: 'You stop when the pin is in your hand, or when you know it is not in the area.', verify: 'Either outcome is a definite answer; an unaccounted pin is not a completed search.', prim: ['locomote', 'inspect'], notes: 'Foreign object debris. The terminating condition is knowledge, not effort, and it is the whole content of the leaf.' }),
      ]),
      node('jams', 'Unjam', 'Reaching into a space designed to be closed.', { contact: 5, dexterity: 5 }, [
        rec('unjam-reverse-of-feed-hands-outside', 'Unjam against the feed direction', 'Clear a jam by hand.', { cue: 'You work in reverse of the feed, with hands outside the pinch throughout.' }),
        rec('reverse-out-with-power-only-when-safe', 'Reverse a jam out under power', 'Use the machine to clear itself.', { cue: 'Power is used only after the pinch is guarded or the energy is off.', notes: 'A precondition on an action that is otherwise faster and easier without it.' }),
        rec('clear-a-choke-standing-off-the-drop', 'Clear a choke or hopper', 'Free a blocked feed.', { cue: 'The proper tool does it and you stand off the drop line.', prim: ['tool', 'locomote'] }),
      ]),
    ]),

    node('temporary', 'Temporary repair', 'Getting it running, without the temporary quietly becoming permanent.', { horizon: 'short', dexterity: 4, contact: 4, prev: 'common', skillYears: 'months' }, [
      node('cut-and-splice', 'Cut back and splice in', 'Remove bad material and bridge the gap.', { precision: 4 }, [
        rec('cut-back-to-clean-material-both-sides', 'Cut out a bad section', 'Remove damaged hose, loom or bead.', { cue: 'Both cut faces are in clean sound material.', prim: ['separate', 'tool'] }),
        rec('splice-at-the-same-length-and-clocking', 'Splice in a replacement section', 'Fit a new section in place of the old.', { cue: 'Same length and same clocking as the piece you took out.', verify: 'The run sits in its original clips without being pulled to reach them.' }),
        rec('slide-a-boot-to-the-marks', 'Slide a boot or sleeve over the repair', 'Cover a completed splice.', { cue: 'The joint is covered to the marks at both ends.' }),
      ]),
      node('hold-it-together', 'Temporary restraint', 'Things that must not survive to the next shift.', { precision: 3 }, [
        rec('a-tie-down-that-will-not-become-the-route', 'Fit a temporary tie-down', 'Restrain a run provisionally.', { cue: 'It is visibly temporary, so it cannot quietly become the permanent route.', notes: 'The requirement is that the fix look wrong. Nothing else in the atlas asks for that.' }),
        rec('temporary-brace-so-it-cannot-sag', 'Fit a temporary brace or crib', 'Support a structure while you fetch the real part.', { cue: 'It cannot sag while you are away from it.', contact: 5 }),
      ]),
    ]),

    node('prove', 'Reproduce, mark and prove', 'Evidence: before you move it, and after you fixed it.', { prim: ['inspect'], precision: 4, contact: 3, prev: 'common' }, [
      node('mark-first', 'Mark before you move', 'Make the change visible before you make it.', { dexterity: 4 }, [
        rec('witness-line-across-two-parts', 'Mark a witness line across two parts', 'Scribe or mark across a joint before disturbing it.', { cue: 'The line crosses both parts, so any slip afterwards is visible.', notes: 'Creating the measurement instrument before taking the measurement. It costs a second and it is skipped constantly.' }),
        rec('paint-mark-a-fastener-before-turning', 'Paint-mark a fastener before you turn it', 'Mark a fastener to record movement.', { cue: 'The mark is on before the tool goes on.', verify: 'Afterwards you can tell from across the machine whether it moved.' }),
      ]),
      node('reproduce', 'Reproduce it deliberately', 'Making it fail again, slowly, on purpose.', { horizon: 'medium', dexterity: 3 }, [
        rec('walk-the-path-at-walking-speed', 'Walk the failure path', 'Follow the energy from source to symptom on foot.', { cue: 'You walk it end to end at walking speed rather than jumping to the symptom.', prim: ['locomote', 'inspect'], contact: 1 }),
        rec('reproduce-at-hand-speed-and-stop', 'Reproduce at hand speed', 'Drive the mechanism slowly by hand.', { cue: 'You stop at the first wrong motion instead of completing the cycle.' }),
        rec('reproduce-under-load-only-when-guarded', 'Reproduce under load', 'Recreate the fault at working load.', { cue: 'Guards are back and pinch points are covered before load goes on.' }),
        rec('stop-at-the-first-noise-and-mark-it', 'Stop at the first noise or smell', 'Halt on a sensory signal and record where.', { cue: 'That station is marked before you carry on looking.', notes: 'Smell and sound as primary evidence. Neither is in any dataset in this field, and both are routinely the first symptom.' }),
      ]),
      node('function-check', 'Prove the repair', 'The half of the work that shows it actually worked.', { contact: 4 }, [
        rec('hand-check-through-full-motion', 'Function-check by hand', 'Move the mechanism by hand through its full travel.', { cue: 'The full motion is covered, not the first part of it.', verify: 'Nothing binds anywhere in the travel.' }),
        rec('one-powered-cycle-hands-clear', 'Function-check by one powered cycle', 'Run one cycle under power.', { cue: 'One cycle, with hands clear throughout.' }),
        rec('tug-listen-then-look', 'Tug, listen, then look at the joint', 'Three-sense check on a finished repair.', { cue: 'All three happen, in that order, before you call it good.', verify: 'The joint has been physically loaded, heard and seen.', notes: 'Sequential multi-modal verification. Video captures the third of these and nothing else.' }),
      ]),
    ]),

    node('closeout', 'Close out the recovery', 'Handing the machine and the station back in a state somebody else can read.', { horizon: 'short', contact: 2, dexterity: 2, prev: 'common' }, [
      node('restart', 'Restart from a stable state', 'Where you resume from, and when you stop trying.', { prim: ['language', 'inspect'] }, [
        rec('restart-from-the-last-stable-state', 'Restart from the last stable state', 'Resume the sequence from a known point.', { cue: 'You resume from a stable state, never from the middle of the failed sequence.' }),
        rec('one-retry-then-back-to-isolate', 'Stop after one failed retry', 'Limit the number of attempts before re-isolating.', { cue: 'If the first retry fails you go back to isolate rather than trying a second fix on a live fault.', notes: 'A hard stop on your own persistence. Every incentive in the moment points the other way, which is why it has to be a rule.' }),
      ]),
      node('hand-back', 'Hand the station back', 'The terminal state, defined so the next person can read it.', { prim: ['transfer', 'inspect'] }, [
        rec('bag-the-failed-part-face-up', 'Bag the failed part, failed face up', 'Preserve the evidence for the next person.', { cue: 'The failed face is visible through the bag without anybody handling it.', notes: 'Preserving evidence for a person who is not present. There is no immediate reward signal for this at all.' }),
        rec('return-borrowed-tools-before-you-walk', 'Return borrowed tools before you walk away', 'Clear tools from an open machine.', { cue: 'Every borrowed tool is back in the holster before you leave an open machine.', verify: 'Tool count out matches tool count back, so nothing is left inside.' }),
        rec('sign-off-the-station', 'Sign off the station', 'Declare the recovery finished.', { cue: 'Tools down, guards on, and the isolator in the state you intend to leave it in.', verify: 'All three are true at once, checked rather than assumed.' }),
        rec('ready-state-after-recovery', 'Leave a ready state', 'The final body and machine state.', { cue: 'Both hands clear, your body off the line of fire, and the last isolator in the state you chose.', notes: 'Line of fire is a spatial concept about where energy would go if it released. It governs where a body stands and is not visible in any single frame.' }),
      ]),
    ]),
  ],
)
