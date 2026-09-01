import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// The Ego-Exo4D shaped domain: skilled whole-body activity with an expert /
// novice gradient. Suit fitness is excellent almost everywhere here.

export const d18: NodeSpec = node(
  'd18',
  'Sports, performance and body skill',
  'Whole-body skilled activity: climbing, throwing, instruments, dance, board sports, martial arts.',
  {
    setting: 'commercial',
    dexterity: 4,
    precision: 4,
    contact: 4,
    horizon: 'short',
    repetition: 'batched',
    capital: 'cheap',
    partner: 'none',
    skillYears: 'years',
    suit: 'excellent',
    robotNow: 'no',
    embodiment: ['ego', 'suit', 'video'],
    saturation: 'thin',
    ours: 'none',
    rights: 'consent-heavy',
    ethics: 'open',
    prev: 'common',
    prim: ['locomote', 'grasp', 'bimanual', 'inspect'],
  },
  [
    node('climbing', 'Climbing', 'Whole-body force control against a fixed structure.', { contact: 5, dexterity: 4, saturation: 'thin' }, [
      node('climb-movement', 'Read and climb a route', 'Reading and executing a sequence.', { skillYears: 'years' }, [
        leaf('read-and-climb-boulder', 'Read and climb a boulder problem', 'Plan a sequence from the ground, then execute it.', { prim: ['inspect', 'locomote'], horizon: 'short' }),
        leaf('place-a-heel-hook', 'Place a heel hook', 'Precise foot placement carrying body load.', { precision: 5, contact: 5 }),
        leaf('recover-a-slip', 'Recover from a foot slip mid-move', 'Rebalance under load without falling.', { fail: true, saturation: 'empty' }),
      ]),
      node('climb-systems', 'Tie in and check a partner', 'Knots, belaying and checks.', { dexterity: 5, prev: 'common' }, [
        leaf('tie-figure-eight', 'Tie a figure of eight follow-through', 'Rope handling with a checkable end state.', { prim: ['deform', 'fasten'], precision: 4 }),
        leaf('partner-check', 'Perform a partner check', 'Verbal and physical mutual verification.', { prim: ['language', 'inspect'], contact: 2, saturation: 'empty' }),
      ]),
    ]),
    node('throwing-striking', 'Throwing and striking', 'Ballistic whole-body chains.', { dexterity: 3, contact: 3, horizon: 'short', prev: 'common' }, [
      node('throwing', 'Throw and catch', 'Sequenced energy transfer to an object.', { saturation: 'thin' }, [
        leaf('overarm-throw-accuracy', 'Overarm throw for accuracy', 'Repeatable kinematic chain to a target.', { precision: 4, skillYears: 'years' }),
        leaf('two-hand-catch', 'Catch a fast moving object', 'Predict, intercept and absorb.', { prim: ['grasp', 'bimanual'], contact: 4 }),
      ]),
      node('racket-bat', 'Strike with a racket or bat', 'Tool-mediated striking.', { prim: ['tool'], skillYears: 'years' }, [
        leaf('tennis-forehand', 'Hit a forehand to a target zone', 'Whole-body timing with a compliant implement.', { saturation: 'thin' }),
      ]),
    ]),
    node('instruments', 'Musical instruments', 'The finest bimanual work humans do.', { dexterity: 5, precision: 5, contact: 4, skillYears: 'years', saturation: 'thin', prev: 'common' }, [
      node('keyboard-strings', 'Play keyboard and strings', 'Independent bimanual control at speed.', {}, [
        leaf('play-two-hand-piano', 'Play a two-handed piano passage', 'Independent hands, force control per finger.', { prim: ['bimanual'], robotNow: 'partial' }),
        leaf('bow-a-string-instrument', 'Bow a string instrument', 'Continuous force and speed control against pitch feedback.', { contact: 5, robotNow: 'no', saturation: 'empty' }),
        leaf('tune-by-ear', 'Tune an instrument by ear', 'Adjust against an auditory error signal.', { prim: ['inspect', 'tool'], contact: 3 }),
      ]),
      node('percussion-wind', 'Play percussion and wind', 'Timing and breath control.', { prev: 'common' }, [
        leaf('play-drum-pattern', 'Play a four-limb drum pattern', 'Four independent limbs on a shared clock.', { dexterity: 4, prim: ['bimanual', 'locomote'] }),
      ]),
    ]),
    node('dance-gym', 'Dance and gymnastics', 'Whole-body form with an external standard.', { dexterity: 2, contact: 3, skillYears: 'years', suit: 'excellent', prev: 'common', saturation: 'thin' }, [
      node('learn-movement', 'Learn and correct a movement', 'The instruction loop, which is the interesting part.', { prim: ['language', 'inspect'] }, [
        leaf('follow-choreography', 'Follow and reproduce choreography', 'Watch, encode and reproduce a sequence.', { horizon: 'medium', robotNow: 'no' }),
        leaf('correct-from-feedback', 'Correct form from verbal feedback', 'Change a movement in response to a spoken correction.', { prim: ['language'], saturation: 'empty', notes: 'Language-conditioned motor correction is exactly what a VLA needs and almost nobody captures.' }),
      ]),
      node('tumbling', 'Balance and tumble', 'High-consequence whole-body control.', { contact: 5, ethics: 'restricted' }, [
        leaf('handstand-hold', 'Hold and correct a handstand', 'Continuous balance correction through the hands.', { skillYears: 'years' }),
      ]),
    ]),
    node('loaded-carry', 'Loaded and asymmetric carrying', 'Walking under a load that is not balanced, which is common in real work and thin in public motion data.', { dexterity: 2, contact: 5, horizon: 'medium', skillYears: 'months', robotNow: 'no', saturation: 'empty', suit: 'excellent', prev: 'ubiquitous', prim: ['locomote', 'bimanual'], notes: 'Public motion capture is dense on gait, squats and balance and thin on gait under an asymmetric load. This family is the part of a movement battery that is actually uncovered.' }, [
      node('carries', 'Carry under load', 'Gait with the load distribution changed.', {}, [
        leaf('suitcase-carry-no-lean', 'Carry a load on one side without leaning', 'Walk with weight in one hand only.', { cue: 'The spine stays vertical and you do not lean away from the load.', contact: 5 }),
        leaf('farmer-carry-set-down-on-a-count', 'Carry a load in both hands and set both down together', 'Walk with balanced weight and land it.', { cue: 'Both loads reach the floor on a count rather than being dropped.' }),
        leaf('front-rack-carry-elbows-up', 'Carry a load at the chest with the elbows up', 'Walk with the load in front of the body.', { cue: 'The elbows stay up and the ribs stay down for the full distance.' }),
        leaf('overhead-carry-ribs-down', 'Carry a light load overhead', 'Walk with a load above the head.', { cue: 'Arms stay locked, ribs stay down, and it is lowered on a count.', dexterity: 3 }),
        leaf('walk-loaded-without-shoulder-hike', 'Walk a distance with a load in one hand', 'Cover ground with an asymmetric load.', { cue: 'The opposite shoulder does not hike through the whole distance.' }),
        leaf('recover-load-shifted-mid-carry', 'Recover: load slipping part-way through a carry', 'Set it down deliberately rather than regripping while walking.', { fail: true }),
      ]),
      node('drags-and-pushes', 'Push and drag a resisted load', 'Sustained horizontal force against a load that does not lift.', { contact: 5, dexterity: 2, prev: 'common' }, [
        leaf('push-sled-constant-lean', 'Push a resisted load at a constant lean', 'Drive a sled or a heavy object forward.', { cue: 'The lean angle holds for the whole distance without a sprint finish.' }),
        leaf('drag-strap-off-the-legs', 'Drag a resisted load on a strap', 'Pull a load behind you.', { cue: 'The strap stays clear of the backs of the legs the whole way.' }),
        leaf('recover-sled-stalled-mid-push', 'Recover: load stalled part-way through a push', 'Reset the lean and restart rather than jerking it into motion.', { fail: true }),
      ]),
    ]),

    node('reaction', 'Externally cued movement', 'Moving on somebody else’s signal rather than your own timing.', { dexterity: 3, contact: 3, horizon: 'short', skillYears: 'months', robotNow: 'no', saturation: 'empty', prim: ['locomote', 'inspect', 'language'], prev: 'common', notes: 'Self-paced movement is well covered by public data. Movement initiated by an external cue, where the reaction is the measured thing, is not.' }, [
      node('cued-response', 'Respond to a cue', 'The gap between the signal and the first committed step.', {}, [
        leaf('change-direction-on-a-signal', 'Change direction on an external signal', 'React to a whistle or a call and commit.', { cue: 'The first step is the intended line, not a stutter step while you decide.' }),
        leaf('catch-and-absorb-ready-again', 'Catch a moving object and absorb it', 'Receive and control a thrown object.', { cue: 'You could throw again without resetting the feet twice.', contact: 4 }),
        leaf('recover-false-start-on-a-cue', 'Recover: moved before the signal', 'Reset to the start position rather than carrying the early movement through.', { fail: true }),
      ]),
      node('contrast-trials', 'Deliberately incorrect trials', 'Performing a known-bad pattern on purpose, as a labelled negative example.', { ethics: 'restricted', saturation: 'empty', robotNow: 'no', notes: 'Negative examples are rare and valuable, and they are also the one place a capture protocol asks somebody to do the wrong thing on purpose. Kept restricted so a load and a supervisor are always specified.' }, [
        leaf('perform-a-labelled-bad-pattern', 'Perform a known-bad movement as a labelled trial', 'Demonstrate the incorrect version of a pattern deliberately, once.', { cue: 'One repetition, clearly labelled, and it stops there rather than becoming the working pattern.', contact: 5 }),
        leaf('recover-contrast-trial-drifting-into-habit', 'Recover: contrast pattern appearing in working trials', 'Stop the session and re-establish the correct pattern before continuing.', { fail: true }),
      ]),
    ]),

    node('board-cycle', 'Board and cycle sports', 'Balance on a moving platform.', { dexterity: 2, contact: 4, prev: 'common', suit: 'excellent', saturation: 'thin' }, [
      node('bike-skills', 'Ride and fix a bike', 'Riding plus the mechanical side.', {}, [
        leaf('track-stand', 'Hold a track stand', 'Continuous micro-correction at zero speed.', { skillYears: 'months' }),
        leaf('fix-a-puncture', 'Fix a puncture roadside', 'Full teardown and rebuild with hand tools.', { dexterity: 5, contact: 5, prim: ['tool', 'deform'], setting: 'outdoor', saturation: 'thin' }),
      ]),
    ]),
  ],
)
