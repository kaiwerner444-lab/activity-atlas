import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// The deformable domain, and the physics is not the physics of the rest of the
// atlas. Three things recur here and almost nowhere else.
//
// The workpiece has no rest state. Cloth does not stay where you put it, so a
// large share of the cues are about the material not moving while you work on
// it, rather than about the work itself.
//
// Cuts that must go exactly part-way. Notch to the seam line but not past it,
// clip to the stitch but not through it, rip between the stitches and not
// through the fabric. Force control toward a boundary with no mechanical stop,
// where one more millimetre is unrecoverable.
//
// Success defined by something not being visible. A blind hem is right when the
// face shows almost nothing; an under-stitch is right when the seam stays hidden
// and stays hidden. A negative criterion is hard to see and harder to score.

export const d04: NodeSpec = node(
  'd04',
  'Apparel and soft goods',
  'Cutting, sewing, pressing and finishing flexible materials: the deformable-object domain with a real industry behind it and almost no robot data in it.',
  {
    setting: 'commercial',
    dexterity: 5,
    precision: 4,
    contact: 5,
    horizon: 'medium',
    repetition: 'batched',
    capital: 'mid',
    partner: 'site',
    skillYears: 'years',
    suit: 'ok',
    robotNow: 'no',
    embodiment: ['ego', 'suit', 'video'],
    saturation: 'empty',
    ours: 'none',
    rights: 'easy',
    ethics: 'open',
    prev: 'common',
    prim: ['deform', 'bimanual', 'tool', 'separate'],
  },
  [
    node('cutting-room', 'Cutting room', 'Turning flat goods into shaped pieces, where every cue is about the cloth not moving.', { precision: 5, horizon: 'long' }, [
      node('ply-handling', 'Handle plies without disturbing the lay', 'Separating and placing single layers off a stack.', { dexterity: 5, contact: 5, robotNow: 'no' }, [
        leaf('pick-single-ply', 'Pick a single ply off the table', 'Lift one layer clear without dragging the one beneath.', { cue: 'The layer under it has not shifted when you look back at the lay.', prev: 'ubiquitous', notes: 'The canonical deformable-object problem: separating one compliant layer from an identical one beneath it.' }),
        leaf('align-ply-to-grain', 'Align a ply to the grain line', 'Set a piece square to the weave and hold it there.', { cue: 'It sits on the grain line and is still there once the weight is on.', prim: ['inspect', 'deform'] }),
        leaf('weight-ply-at-corners', 'Weight a ply so it cannot creep', 'Anchor a layer before cutting into it.', { cue: 'Two corners are weighted and the piece will not creep under the blade.' }),
        leaf('recover-ply-shifted-mid-cut', 'Recover: ply shifted part-way through the cut', 'Stop, re-align to the grain, and decide whether the piece is still good.', { fail: true, horizon: 'medium' }),
      ]),
      node('cutting', 'Cut to the line', 'Blade work where the material yields ahead of the cut.', { dexterity: 5, contact: 4 }, [
        leaf('cut-with-shears-long-strokes', 'Cut with shears on the line', 'Take long strokes along a marked line.', { cue: 'The line is followed and the offcut is held so it cannot fold under the blade.', skillYears: 'months' }),
        leaf('rotary-cut-against-ruler', 'Rotary cut against a ruler', 'Run a wheel along a straight edge.', { cue: 'The ruler does not walk and the cut stays on the line for the full length.', precision: 5 }),
        leaf('follow-band-knife-path', 'Follow a band-knife on the marked path', 'Feed material through a standing blade.', { cue: 'The path is followed and both hands stay outside the line of the blade.', capital: 'mid', ethics: 'restricted', skillYears: 'years' }),
        leaf('recover-cut-inside-the-line', 'Recover: cut fell inside the line', 'Judge whether the piece can still be used at a smaller allowance or must be recut.', { fail: true }),
      ]),
      node('marking', 'Notch, drill and mark', 'Reference marks that must be visible but must not become damage.', { precision: 5, contact: 4 }, [
        leaf('notch-to-but-not-past-seam-line', 'Notch the edge at the mark', 'Cut a locating notch to a controlled depth.', { cue: 'The notch is visible from both faces and does not cut past the seam line.', notes: 'A partial-depth cut toward a boundary with no stop. One millimetre further and the piece is scrap.', robotNow: 'no' }),
        leaf('drill-mark-through-ply-stack', 'Drill or awl a mark through the stack', 'Put a locating mark through several plies at once.', { cue: 'The hole lands on the punch mark on the bottom ply as well as the top.', verify: 'Lift the bottom ply and check the mark landed before cutting the bundle loose.' }),
        leaf('recover-notch-cut-past-the-line', 'Recover: notch cut past the seam line', 'Decide between a patch, a smaller allowance and a recut before it reaches the machine.', { fail: true }),
      ]),
      node('bundling', 'Bundle and move work', 'Keeping a cut set together and in order.', { dexterity: 3, prev: 'common' }, [
        leaf('bundle-ticket-out-notches-matched', 'Bundle cut pieces with the ticket out', 'Gather a set so it can be worked in order.', { cue: 'The ticket faces out and every notch in the stack lines up.' }),
        leaf('carry-bundle-without-telescoping', 'Carry a bundle without letting it telescope', 'Move a loose stack across the floor.', { cue: 'The stack arrives in the same order it left, with no layer slid out.', prim: ['locomote', 'bimanual'] }),
        leaf('recover-bundle-out-of-order', 'Recover: bundle shuffled out of order', 'Re-sort against the notches and the ticket before sewing.', { fail: true }),
      ]),
    ]),

    node('machine', 'Machine setup and running', 'The operator, the machine and the first two stitches.', { dexterity: 5, precision: 4, prev: 'ubiquitous' }, [
      node('operator-position', 'Sit and present the work', 'Where the body is relative to the needle.', { contact: 3, skillYears: 'months' }, [
        leaf('bring-work-to-the-needle', 'Bring the work to the needle', 'Set up so the machine is the fixed reference, not your body.', { cue: 'Both feet are in the treadle zone and the work comes to the needle rather than your shoulder going to the work.', notes: 'A genuine skill and a common novice failure: leaning in loses the feed and the seam wanders.', suit: 'excellent' }),
        leaf('recover-posture-drifted-seam-wanders', 'Recover: seam wandering because the operator has leaned in', 'Reset the posture and the reference rather than steering harder.', { fail: true }),
      ]),
      node('threading', 'Thread and needle', 'Setting the machine up so it will actually form a stitch.', { dexterity: 5, precision: 5 }, [
        leaf('load-bobbin-even-lay', 'Load a bobbin so the thread lays evenly', 'Wind and seat a bobbin.', { cue: 'The lay is even across the bobbin and the case seats with a click.' }),
        leaf('thread-needle-tails-to-back', 'Thread up and pull both tails to the back', 'Complete the thread path and clear the tails.', { cue: 'Both threads run under the presser to the back before the first stitch.' }),
        leaf('change-needle-scarf-to-back', 'Change a needle and seat it against the stop', 'Fit a new needle the right way round.', { cue: 'It is up against the stop with the scarf to the back and the point is undamaged.', verify: 'Stitch a test scrap and check both faces before running the work.', prev: 'common' }),
        leaf('recover-skipped-stitches-from-needle', 'Recover: skipped stitches traced to the needle', 'Diagnose between needle, thread and tension and change the right one.', { fail: true, skillYears: 'months' }),
      ]),
      node('start-stop', 'Start, stop and chain', 'The beginnings and ends of every seam.', { repetition: 'high-takt' }, [
        leaf('bury-work-lower-presser-flat', 'Bury the work and lower the presser flat', 'Place the work so the foot sits properly.', { cue: 'The foot sits flat on the work with no toe riding on a seam bulk.' }),
        leaf('start-on-the-mark-two-stitches', 'Start on the mark, two stitches before speed', 'Begin a seam under control.', { cue: 'The first two stitches are on the mark before any speed goes on.' }),
        leaf('back-tack-stop-needle-down', 'Back-tack and stop with the needle down', 'Secure the end and hold position for a pivot.', { cue: 'The tack is the specified length and the needle finishes down if the next move is a pivot.' }),
        leaf('chain-to-next-piece', 'Chain to the next piece', 'Run work continuously without cutting between.', { cue: 'The tail is short and the pieces stay in order down the chain.', repetition: 'high-takt' }),
        leaf('trim-tail-at-the-mark', 'Trim the thread tail at the mark', 'Cut a tail without cutting the seam.', { cue: 'The cut is at the mark, not into the stitching.', dexterity: 5 }),
        leaf('recover-seam-started-off-the-mark', 'Recover: seam started off the mark', 'Unpick the run-in and restart rather than easing it back on line.', { fail: true }),
      ]),
    ]),

    node('seaming', 'Seaming and shaping', 'Joining cloth, and making flat material into a three-dimensional shape.', { dexterity: 5, contact: 5, skillYears: 'years', robotNow: 'no' }, [
      node('three-dimensional', 'Sew curved and shaped seams', 'Where sewing stops being planar.', { precision: 5, horizon: 'medium' }, [
        leaf('turn-through-small-opening', 'Turn a garment through a small opening', 'Bring the right side out without disturbing the seam.', { cue: 'It comes through without the seam allowance rolling to the face.', prim: ['deform', 'bimanual'] }),
        leaf('ease-stitch-and-draw-the-cap', 'Ease-stitch and draw a sleeve cap in', 'Prepare a curved head to fit a smaller opening.', { cue: 'The cap matches the armhole and the ease is distributed, not gathered into pleats.', skillYears: 'years', notes: 'Fitting a longer curve into a shorter one with no visible fullness. One of the hardest things in the trade.' }),
        leaf('set-sleeve-match-notches', 'Set a sleeve, matching notches', 'Sew a drawn cap into an armhole.', { cue: 'Every notch meets and there are no tucks on the inside of the seam.', verify: 'Turn it out and check the cap from the face before the next operation.' }),
        leaf('set-collar-points-equal', 'Set a collar with equal points', 'Attach a collar and stand to a neckline.', { cue: 'Both points measure the same and the stand is seated in the neckline all round.', precision: 5 }),
        leaf('fit-lining-ease-hidden', 'Fit a lining to a shell', 'Join two layers that must not fight each other.', { cue: 'Notches match and the lining ease does not show through on the face.' }),
        leaf('bag-out-and-press-before-closing', 'Bag out a garment and press before closing', 'Turn through the specified opening and prepare the closing edge.', { cue: 'The opening edge is pressed before it is closed, not after.', notes: 'Ordering constraint: pressing after closing sets the wrong edge and cannot be undone cleanly.' }),
        leaf('recover-puckered-set-in-seam', 'Recover: sleeve or collar puckered on setting', 'Unpick, redistribute the ease, and restitch rather than pressing the pucker out.', { fail: true, horizon: 'medium' }),
      ]),
      node('topstitch-edge', 'Topstitch and edge work', 'Visible stitching where the gauge is the whole job.', { precision: 5, repetition: 'high-takt' }, [
        leaf('topstitch-constant-gauge-through-curve', 'Topstitch at gauge through a curve', 'Hold an edge distance while the direction changes.', { cue: 'The edge distance stays constant all the way round the curve.', robotNow: 'no', saturation: 'empty' }),
        leaf('edge-stitch-without-rolling-fold', 'Edge-stitch close to a fold', 'Stitch near an edge without disturbing it.', { cue: 'The fold stays flat and does not roll under the foot.' }),
        leaf('under-stitch-so-seam-stays-in', 'Under-stitch a facing', 'Make a seam roll to the inside and stay there.', { cue: 'The seam rolls inside and stays inside when the garment is handled.', notes: 'Success is defined by something remaining invisible, which is a criterion you cannot see directly.' }),
        leaf('blind-hem-tiny-bite', 'Blind-hem with a tiny bite', 'Catch the face with the minimum possible thread.', { cue: 'The face shows a tiny bite, not a visible dimple line.', dexterity: 5, skillYears: 'years' }),
        leaf('recover-topstitch-wandered-off-gauge', 'Recover: topstitch wandered off gauge', 'Unpick the visible run rather than stitching a second line beside it.', { fail: true }),
      ]),
      node('overlock-cover', 'Overlock, coverstitch and binding', 'Edge treatments on machines that cut as they sew.', { contact: 5, capital: 'mid' }, [
        leaf('coverstitch-and-chain-off', 'Run a coverstitch and chain off', 'Finish a coverstitched line so it holds.', { cue: 'You chain off so the looper thread cannot pull back out of the stitch.' }),
        leaf('overlock-trim-specified-allowance', 'Overlock and let the knife trim to allowance', 'Serge an edge at the right width.', { cue: 'The knife removes only the specified allowance, no more.', precision: 5 }),
        leaf('serge-and-tape-a-shoulder', 'Serge and tape a shoulder', 'Stabilise a seam as it is overlocked.', { cue: 'The tape is centred on the seam and is not twisted anywhere along it.' }),
        leaf('bind-edge-fill-the-fold', 'Bind an edge so the binding fills the fold', 'Apply a binding cleanly.', { cue: 'The binding fills the fold with no empty channel, and the join lands where specified.', skillYears: 'years' }),
        leaf('recover-knife-cut-into-the-panel', 'Recover: overlock knife cut into the panel', 'Stop immediately, assess the depth, and repair or recut the panel.', { fail: true, horizon: 'medium' }),
      ]),
      node('bulk-and-curves', 'Grade, clip and turn', 'Removing bulk so a shape will actually turn.', { dexterity: 5, precision: 5, contact: 4 }, [
        leaf('grade-allowance-stepped', 'Grade a seam allowance so bulk steps down', 'Trim layers to different widths.', { cue: 'The layers step down toward the edge with no single hard ridge.' }),
        leaf('clip-curve-to-not-through', 'Clip a curve to the stitch, not through it', 'Relieve a concave curve.', { cue: 'Each clip stops at the stitch line and none goes through it.', robotNow: 'no', notes: 'Another partial-depth cut with no stop. Through the stitch and the seam opens in wear.' }),
        leaf('notch-convex-curve-no-overlap', 'Notch a convex curve', 'Remove wedges so allowances can spread.', { cue: 'The allowances lie flat with no overlapping lumps when turned.' }),
        leaf('trim-corner-before-turning', 'Trim bulk from a corner before turning', 'Cut a corner back so it will point.', { cue: 'Enough is removed that the corner turns, with enough left that it cannot fray through.' }),
        leaf('turn-corner-full-not-punched', 'Turn a corner with a point turner', 'Push a corner out to a point and stop.', { cue: 'You stop when the point is full, not when the tool has pushed through the stitching.' }),
        leaf('recover-corner-punched-through', 'Recover: point turner pushed through the corner', 'Repair the corner or recut the piece before it is pressed.', { fail: true }),
      ]),
    ]),

    node('closures', 'Closures, hardware and fill', 'Everything that fastens, and everything that goes inside.', { dexterity: 5, precision: 5, prev: 'common' }, [
      node('buttons-holes', 'Buttonholes and buttons', 'Openings and the things that pass through them.', { skillYears: 'months' }, [
        leaf('set-buttonhole-and-open-it', 'Set a buttonhole on the mark and open it', 'Sew and cut a hole to size.', { cue: 'The chisel or ripper stops inside the bar tacks at both ends.', verify: 'Pass the actual button through before moving on.' }),
        leaf('sew-button-with-stand-and-shank', 'Sew a button with a stand and wrap the shank', 'Attach a button so it can close over thickness.', { cue: 'The stand matches the layers it must close over and the stem is wrapped.' }),
        leaf('recover-buttonhole-cut-through-the-bar', 'Recover: buttonhole cut through the end bar', 'Re-tack the end or remake the hole rather than leaving it to run.', { fail: true }),
      ]),
      node('snaps-rivets', 'Snaps, rivets and eyelets', 'Hardware set by force, where the setting is one attempt.', { contact: 5, capital: 'mid' }, [
        leaf('attach-snap-halves-meet', 'Attach a snap so both halves meet', 'Set a two-part fastener in register.', { cue: 'The halves meet cleanly and the fabric around them is not puckered.', verify: 'Close and open it several times before it leaves the bench.' }),
        leaf('hammer-snap-cap-closed-not-crushed', 'Hammer a snap or rivet on the anvil', 'Set hardware to the right amount.', { cue: 'The cap is closed and the face is not crushed or dished.', notes: 'A single-attempt force decision: too little and it pulls off, too much and the visible face is ruined.' }),
        leaf('set-rivet-post-peened', 'Set a rivet through all layers', 'Drive a rivet and form it properly.', { cue: 'The post is peened over, not merely bent to one side.', verify: 'Try to rotate the rivet by hand after setting.' }),
        leaf('set-eyelet-washer-tight', 'Set an eyelet or grommet', 'Fit a reinforced hole.', { cue: 'The washer is tight and the hole is clean with no frayed collar.' }),
        leaf('recover-hardware-set-crooked', 'Recover: hardware set crooked or crushed', 'Remove it without tearing the panel, patch if needed, and reset.', { fail: true, horizon: 'medium' }),
      ]),
      node('tacks-loops-bands', 'Tacks, loops and waistbands', 'Stress points and structural bands.', { precision: 4 }, [
        leaf('bar-tack-at-stress-point', 'Bar-tack at the stress point', 'Reinforce where a garment will be pulled.', { cue: 'The tack is at the specified length and density, on the stress point rather than beside it.' }),
        leaf('attach-belt-loop-ends-buried', 'Attach a belt loop at both ends', 'Fix a loop so it stands and finishes cleanly.', { cue: 'The loop stands away from the band and both raw ends are buried.' }),
        leaf('attach-waistband-no-twist', 'Attach a waistband and close the end', 'Fit a band around a body opening.', { cue: 'Notches match all round and the band is not twisted when the end is closed.', skillYears: 'years' }),
        leaf('recover-twisted-waistband', 'Recover: waistband closed with a twist', 'Unpick the closure, untwist and remake rather than easing it.', { fail: true }),
      ]),
      node('zips-elastic', 'Zips and elastic', 'Components that must stay straight inside a channel.', { dexterity: 5 }, [
        leaf('insert-zip-teeth-centred', 'Baste and insert a zip from the bottom', 'Fit a zip so it runs straight.', { cue: 'The teeth stay centred in the opening for the full length.', verify: 'Run the slider fully up and down before removing the basting.' }),
        leaf('feed-elastic-with-bodkin', 'Feed elastic into a casing with a bodkin', 'Thread elastic through a tunnel without losing it.', { cue: 'The elastic does not turn over at any point in the casing.', prim: ['insert', 'deform'] }),
        leaf('clear-casing-elastic-flat', 'Clear the casing so the elastic lies flat', 'Distribute and settle elastic in its channel.', { cue: 'It lies flat all round and the join sits at the side, not the front.' }),
        leaf('turn-strap-with-loop-turner', 'Turn a strap and push the corner to a point', 'Bring a narrow tube right side out.', { cue: 'The corner is pushed to a full point without bursting the seam.' }),
        leaf('recover-elastic-twisted-in-casing', 'Recover: elastic twisted inside the casing', 'Draw it back out and re-feed rather than working the twist along.', { fail: true }),
      ]),
      node('fill-and-stuff', 'Fill and close', 'Soft goods with something inside them.', { dexterity: 4, contact: 5, prev: 'common' }, [
        leaf('stuff-corners-filled-opening-closable', 'Stuff so the corners fill and the opening still closes', 'Fill a soft item to shape.', { cue: 'The corners are full and there is still room to close the opening.' }),
        leaf('insert-pad-seat-corners-first', 'Insert a cushion pad and seat the corners', 'Get a pad into a cover.', { cue: 'All four corners are seated before the zip is closed.', prim: ['deform', 'bimanual'] }),
        leaf('ladder-stitch-invisible-close', 'Stuff and ladder-stitch an opening closed', 'Close a filled item by hand.', { cue: 'The stitch is invisible from the face and the fill cannot work out through it.', dexterity: 5, skillYears: 'months' }),
        leaf('recover-lumpy-fill', 'Recover: fill settled lumpy after closing', 'Open the closure, redistribute and re-close rather than working it from outside.', { fail: true }),
      ]),
    ]),

    node('pressing', 'Pressing and forming', 'Heat, steam and time: waiting for a state change rather than racing one.', { contact: 4, dexterity: 4, skillYears: 'years', prev: 'common', prim: ['tool', 'deform'] }, [
      node('seam-pressing', 'Press seams', 'Setting a seam so it stays where it is put.', {}, [
        leaf('press-seam-open-over-ham', 'Press a seam open over a ham or board', 'Open a seam on a shaped form.', { cue: 'Both allowances lie flat with no imprint showing on the face.' }),
        leaf('press-seam-to-one-side-hold', 'Press a seam to one side and hold', 'Set a seam in the specified direction.', { cue: 'It goes the specified way and you hold it until the steam drops.' }),
        leaf('clapper-set-without-shine', 'Use a clapper so the crease sets without shine', 'Set a crease with pressure rather than more heat.', { cue: 'The crease is sharp and the face has no shine.', notes: 'The failure is irreversible: shine cannot be pressed out of most fabrics.' }),
        leaf('recover-seam-imprint-on-the-face', 'Recover: allowance imprint showing through', 'Re-press over a form or with a strip under the allowance.', { fail: true }),
      ]),
      node('shaped-pressing', 'Press shaped and delicate work', 'Pressing where the tool must not touch the face.', { precision: 5, dexterity: 5 }, [
        leaf('hover-steam-pile-not-crushed', 'Hover-steam a wool or a pile', 'Relax a fabric without contact.', { cue: 'The fabric relaxes and the pile is not crushed by the sole plate.' }),
        leaf('point-press-collar-square', 'Point-press a collar or cuff', 'Press a small shaped part on a point.', { cue: 'The point is square and the seam has not been pressed onto the face.' }),
        leaf('sleeve-board-no-cap-crease', 'Press a sleeve seam on a sleeve board', 'Press inside a tube without flattening it.', { cue: 'The seam is pressed and there is no crease across the sleeve cap.' }),
        leaf('fuse-heat-pressure-time-then-cool', 'Fuse interfacing and let it cool under weight', 'Bond an interlining properly.', { cue: 'Glue side down, held for the specified time, then left to cool under weight before it is moved.', notes: 'A three-variable process where the last step is waiting. Moving it warm is the usual failure.' }),
        leaf('peel-paper-without-lifting-garment', 'Peel the paper off a fusible', 'Remove a backing without disturbing the bond.', { cue: 'The paper comes away and the garment stays flat on the table.' }),
        leaf('turn-hem-to-mark-and-press', 'Turn a hem to the mark and press it', 'Set a hem before stitching it.', { cue: 'The fold is on the mark all round and pressed before any stitch goes in.' }),
        leaf('recover-fusible-bubbled', 'Recover: fusible bubbled or lifted', 'Re-press or strip and refuse rather than stitching over a lifted panel.', { fail: true, horizon: 'medium' }),
      ]),
    ]),

    node('fitting', 'Fitting, marking and hand work', 'Working on the body or the dummy, and the stitches done without a machine.', { dexterity: 5, precision: 5, skillYears: 'years', saturation: 'empty', prev: 'uncommon' }, [
      node('on-the-form', 'Work on a form or a body', 'Fitting in three dimensions with the garment hanging.', { contact: 4, rights: 'consent-heavy' }, [
        leaf('form-garment-grain-plumb', 'Form a garment on a dummy and pin', 'Set a garment on a form so it hangs true.', { cue: 'The grain hangs plumb front and back before any pin goes in.' }),
        leaf('pin-perpendicular-no-shift', 'Pin a drape or hem without shifting the underlayer', 'Place pins that hold two layers in register.', { cue: 'Pins are perpendicular to the edge and the underlayer has not moved.' }),
        leaf('fit-on-body-mark-the-pin-line', 'Fit on a body and mark the pin line', 'Adjust on a person and record the change.', { cue: 'The adjustment is marked before the garment comes off, not reconstructed after.', prim: ['language', 'inspect'], ethics: 'restricted' }),
        leaf('kneel-to-pin-hem-eye-at-height', 'Kneel to pin a hem at eye height', 'Get the eye level with the work to judge it.', { cue: 'Your eye is at hem height and the hem is even to the floor all the way round.', prim: ['locomote'], suit: 'excellent' }),
        leaf('recover-hem-uneven-once-hung', 'Recover: hem uneven once the garment hangs', 'Re-mark from the floor rather than adjusting from the previous mark.', { fail: true }),
      ]),
      node('measure-and-mark', 'Measure and mark', 'Numbers taken off a body and marks that must disappear.', { precision: 5, prim: ['inspect', 'language'] }, [
        leaf('measure-length-record-on-ticket', 'Measure an inseam or back length and record it', 'Take a measurement and write it where it belongs.', { cue: 'The number goes on the ticket, never on the face of the cloth.' }),
        leaf('measure-girth-tape-level', 'Measure a chest or bust with the tape level', 'Take a girth measurement correctly.', { cue: 'The tape is level all the way round at the specified line.' }),
        leaf('chalk-on-wrong-side-brush-later', 'Mark with chalk on the wrong side', 'Leave a mark that will not survive to the finished garment.', { cue: 'It is on the wrong side, and it is brushed off only once the seam is in.' }),
        leaf('recover-mark-made-on-the-face', 'Recover: mark made on the face side', 'Remove it by the correct method for that cloth before pressing sets it.', { fail: true }),
      ]),
      node('hand-stitch-and-unpick', 'Hand stitch and unpick', 'Needle work and its exact opposite.', { dexterity: 5, contact: 5 }, [
        leaf('baste-then-pull-after-permanent', 'Baste a line, then pull it after the permanent stitch', 'Hold work temporarily and release it in the right order.', { cue: 'The basting comes out only after the permanent stitch is in.' }),
        leaf('pick-stitch-even-knot-buried', 'Hand-sew a pick or fell stitch', 'Sew by hand with an invisible finish.', { cue: 'Spacing is even and the knot is buried inside the layers.' }),
        leaf('whip-edge-without-rolling-it', 'Whip a raw edge', 'Wrap an edge by hand without distorting it.', { cue: 'The stitches wrap the edge and do not draw it into a roll.' }),
        leaf('rip-between-stitches-not-fabric', 'Rip a seam between the stitches', 'Take a seam out without damaging the cloth.', { cue: 'The ripper passes between stitches and never through the fabric.', robotNow: 'no', notes: 'The third partial-depth cut in this domain, and the one with the least margin.' }),
        leaf('pick-out-and-brush-puncture-line', 'Pick out the remains and brush the line', 'Clean up after unpicking, before resewing.', { cue: 'No thread remains and the puncture line is brushed closed before the new seam.' }),
        leaf('recover-fabric-cut-while-unpicking', 'Recover: fabric cut while unpicking', 'Assess whether it is in the allowance or the panel, and patch or recut.', { fail: true, horizon: 'medium' }),
      ]),
    ]),

    node('decoration', 'Fusing, transfer and embroidery', 'Applied decoration, where registration and heat both have to be right.', { precision: 5, capital: 'mid', prev: 'common' }, [
      node('transfer-and-press', 'Vinyl, transfer and heat press', 'Applied graphics on a machine with a cycle.', { dexterity: 5 }, [
        leaf('lay-transfer-on-grain-and-tape', 'Lay a transfer on the grain and tape it', 'Register a graphic before pressing.', { cue: 'It is square to the grain and taped so it cannot shift when the platen closes.' }),
        leaf('close-press-hold-cycle-open-clean', 'Close a heat press and open it without dragging', 'Run a press cycle.', { cue: 'Held for the full cycle and opened without dragging the transfer sideways.' }),
        leaf('weed-vinyl-bridges-intact', 'Weed vinyl so the fine bridges stay', 'Remove waste from a cut graphic.', { cue: 'The waste comes off in one pull where it can, and every fine bridge is still attached.', contact: 4 }),
        leaf('weed-detail-pinch-not-yank', 'Weed a small detail with a pinch and a hook', 'Remove a tiny piece of waste.', { cue: 'It lifts with a pinch and a hook rather than a yank that takes the detail with it.', dexterity: 5, robotNow: 'no' }),
        leaf('recover-transfer-shifted-in-the-press', 'Recover: transfer shifted or ghosted', 'Judge whether the garment is recoverable and strip or scrap it before it ships.', { fail: true }),
      ]),
      node('embroidery', 'Hooping and embroidery', 'Holding cloth drum-tight without catching what is behind it.', { dexterity: 4, contact: 5 }, [
        leaf('drum-hoop-square-to-grain', 'Drum an embroidery hoop tight and square', 'Tension fabric in a hoop.', { cue: 'The fabric is drum-tight and the grain is square in the hoop.' }),
        leaf('hoop-without-catching-second-layer', 'Hoop a garment without catching another layer', 'Isolate one layer of a made-up garment.', { cue: 'No pocket bag or lining is caught in the hoop.', verify: 'Reach inside and sweep the hoop area before the frame goes on the machine.', notes: 'Stitching through a pocket bag is only discovered after the design is finished.' }),
        leaf('load-frame-arms-seated', 'Load the frame until the arms seat', 'Mount a hoop on the machine.', { cue: 'Both arms are seated and the clamps close without force.' }),
        leaf('unload-and-support-the-stitches', 'Unload, unhoop and support the garment', 'Get finished work off the machine undamaged.', { cue: 'The garment is supported so the finished stitching is not crushed or dragged.' }),
        leaf('clip-jumps-close-not-into-lock', 'Clip jump threads close to the stitch', 'Trim connecting threads without cutting the design.', { cue: 'The jump is cut close and the lock stitch is untouched.', dexterity: 5 }),
        leaf('recover-design-stitched-through-pocket', 'Recover: design stitched through a pocket bag', 'Unpick from the back and assess whether the garment survives.', { fail: true, horizon: 'long' }),
      ]),
      node('applique', 'Applique and patches', 'Placing and fixing a separate piece.', { precision: 4 }, [
        leaf('place-applique-baste-before-stitch', 'Place an applique on the marks and fix it', 'Register a patch and hold it.', { cue: 'It is on the marks and basted or fused before any permanent stitch goes in.' }),
        leaf('recover-applique-crept-under-the-foot', 'Recover: applique crept while being stitched', 'Unpick, re-register and re-fix rather than stitching it back into line.', { fail: true }),
      ]),
    ]),

    node('finishing', 'Finishing, packing and material handling', 'The end of the line, plus the rolls that feed the start of it.', { dexterity: 4, precision: 3, contact: 3, skillYears: 'months', prev: 'ubiquitous' }, [
      node('fold-and-present', 'Fold and present', 'Making a garment look like it does in the shop.', { repetition: 'high-takt', robotNow: 'no', saturation: 'empty' }, [
        leaf('fold-branded-face-shown', 'Fold a garment so the branded face shows', 'Fold to present the right side.', { cue: 'The branded face is showing and the bulk is centred in the fold.' }),
        leaf('board-shirt-in-order', 'Board a shirt in the correct order', 'Fold a shirt to a retail presentation.', { cue: 'Collar, yoke, sleeves, body, in that order, with every fold crisp.', dexterity: 5, skillYears: 'months' }),
        leaf('fold-to-size-and-band', 'Fold to the retail size and band it', 'Fix a fold so it survives handling.', { cue: 'It matches the size template and the band or clip stops the fold opening.' }),
        leaf('hang-shoulders-sit-hem-even', 'Hang on a hanger so the shoulders sit', 'Present a garment on a hanger.', { cue: 'The shoulders sit on the hanger and the hem hangs even.' }),
        leaf('recover-fold-opened-in-the-carton', 'Recover: folds opened in transit', 'Refold and change the banding rather than repacking as found.', { fail: true }),
      ]),
      node('label-and-bag', 'Label, bag and pack', 'Getting the garment into its packaging without marking it.', { precision: 4 }, [
        leaf('apply-size-sticker-no-wrinkle', 'Apply a size sticker at the specified point', 'Place a label on the garment.', { cue: 'It is on the specified point and the face is not wrinkled under it.' }),
        leaf('tag-gun-through-seam-not-face', 'Tag-gun through the label or seam allowance', 'Attach a swing ticket without damaging the garment.', { cue: 'The barb goes through the label or the allowance, never through the face.', notes: 'A hidden-consequence failure: the hole is small, permanent, and found by the customer.' }),
        leaf('polybag-expel-air-flat', 'Polybag the piece and expel the air', 'Bag a garment so it packs flat.', { cue: 'The bag lies flat with the air out.' }),
        leaf('heat-seal-and-trim-tail', 'Heat-seal a bag and trim the tail', 'Close a polybag.', { cue: 'The seal is continuous across the mouth and the tail is trimmed.' }),
        leaf('pack-carton-orientation-no-crush', 'Pack cartons in the specified orientation', 'Load a carton so nothing is damaged.', { cue: 'Hangers and folds are not crushed and the orientation matches the pack spec.' }),
        leaf('recover-face-marked-in-packing', 'Recover: garment marked during packing', 'Pull it from the pack rather than shipping it, and identify what marked it.', { fail: true, prim: ['inspect', 'language'] }),
      ]),
      node('roll-handling', 'Roll and material handling', 'Feeding the cutting room.', { dexterity: 2, contact: 5, prim: ['locomote', 'bimanual'], prev: 'common' }, [
        leaf('carry-roll-set-without-telescoping', 'Carry a roll and set it on the bar', 'Move bulk goods without disturbing the wind.', { cue: 'It goes on the bar without telescoping out of one end.' }),
        leaf('load-roll-and-lock-the-core', 'Load a roll on the let-off bar and lock the core', 'Mount a roll for spreading.', { cue: 'The core is locked and the roll turns without slipping on the bar.' }),
        leaf('let-off-edge-on-the-guide', 'Let off cloth and keep the edge on the guide', 'Spread cloth onto a table.', { cue: 'The selvedge tracks the guide for the full length of the lay.', repetition: 'high-takt' }),
        leaf('rewind-partial-roll-even-tension', 'Rewind a partial roll', 'Put remaining goods back onto a core.', { cue: 'The edge is even and the tension is firm all the way in.' }),
        leaf('recover-roll-telescoped', 'Recover: roll telescoped on the bar', 'Rewind it rather than spreading from a stepped roll.', { fail: true }),
      ]),
      node('station-order', 'Keep the station in order', 'The housekeeping that stops the last operation ruining the work.', { contact: 3, prev: 'ubiquitous' }, [
        leaf('sweep-offcuts-clear-of-finished-work', 'Sweep threads and offcuts to the bin', 'Clear waste without dragging it across finished goods.', { cue: 'Waste reaches the bin without crossing any finished work.' }),
        leaf('park-iron-and-clear-the-bundle', 'Park the iron and stage the next bundle', 'Leave a station safe and ready.', { cue: 'The presser is up or the iron is parked, both hands are clear, and the next bundle is in reach and not on the heat.', ethics: 'restricted' }),
        leaf('recover-scorch-from-a-parked-iron', 'Recover: work scorched by a parked iron', 'Remove the piece, assess the damage and address why it was in the heat path.', { fail: true }),
      ]),
    ]),
  ],
)
