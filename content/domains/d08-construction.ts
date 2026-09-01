import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// Construction has two things the other domains mostly do not.
//
// Materials with a working window: thinset skins, mortar goes off, concrete
// passes through the trowelling window, caulk forms a skin. The deadline is
// invisible and missing it is usually irreversible.
//
// Ordering constraints where the sequence is the skill rather than the motion:
// brace before you let go, clip on before you step off, unhook only once it is
// stable. Those are recorded here in the cue, because doing the right actions in
// the wrong order is the failure mode, not doing them badly.

export const d08: NodeSpec = node(
  'd08',
  'Construction and trades',
  'Site work from groundwork to finish: masonry, framing, envelope, first fix, boarding, tiling, carpentry and the access and handling that surrounds all of it.',
  {
    setting: 'industrial',
    dexterity: 4,
    precision: 3,
    contact: 5,
    horizon: 'long',
    repetition: 'batched',
    capital: 'mid',
    partner: 'site',
    skillYears: 'years',
    suit: 'excellent',
    robotNow: 'no',
    embodiment: ['ego', 'suit', 'video'],
    saturation: 'empty',
    ours: 'none',
    rights: 'easy',
    ethics: 'open',
    prev: 'common',
    prim: ['tool', 'locomote', 'fasten', 'deform'],
  },
  [
    node('masonry-concrete', 'Masonry, concrete and groundwork', 'Wet trades and the ground they sit on, where the material sets whether you are ready or not.', { dexterity: 4, contact: 5 }, [
      node('lay-to-line', 'Lay to a line', 'Blockwork and brickwork judged against a string.', { repetition: 'high-takt', prev: 'common' }, [
        leaf('lift-block-to-course', 'Lift a block and set it in the string', 'Take a block off the stack and place it on the course.', { cue: 'The face is in the string, not touching it and not behind it.', dexterity: 2, prim: ['locomote', 'grasp'] }),
        leaf('butter-set-and-tap-down', 'Butter, set and tap a block down', 'Spread mortar, place, and beat the unit to height.', { cue: 'The joint height matches the course and the block stops moving.', skillYears: 'years' }),
        leaf('strike-joint-full-profile', 'Strike a joint to a full profile', 'Iron a joint to a consistent shape along the course.', { cue: 'The tool leaves a full, even profile with no voids at the perpends.', dexterity: 5 }),
        leaf('cut-block-and-set-cut-face-in', 'Cut a block and set the cut face in', 'Saw a unit and place it so the cut is hidden.', { cue: 'The cut face is turned inward and the exposed face is factory.', prim: ['separate', 'tool'] }),
        leaf('recover-block-out-of-line', 'Recover: block set out of line after the mortar has grabbed', 'Decide whether to lift and re-bed or cut it out, before the course goes higher.', { fail: true, horizon: 'medium' }),
      ]),
      node('set-out', 'Set out and plumb', 'Establishing the lines everything else is judged against.', { precision: 5, prim: ['inspect', 'tool'] }, [
        leaf('hang-string-line-no-sag', 'Hang a string line between corners', 'Pull a line tight across a span.', { cue: 'It does not sag mid-span when you sight along it.', verify: 'Sight the full run from one end before laying to it.' }),
        leaf('plumb-corner-both-faces', 'Plumb a corner on both faces', 'Bring a corner true in two planes and hold it.', { cue: 'The level reads plumb on both faces at once and stays there until the brace is on.', contact: 4 }),
        leaf('snap-chalk-line-no-drift', 'Snap a chalk line on a deck', 'Lay down a line without moving it as you snap.', { cue: 'The line lands on both marks and does not drift when you lift the string.', dexterity: 5 }),
        leaf('recover-line-set-out-wrong', 'Recover: set-out line found wrong after work started', 'Stop, re-establish from the datum, and decide what has to come back.', { fail: true, horizon: 'long' }),
      ]),
      node('place-and-finish', 'Place and finish concrete', 'A material that gives you one pass and a closing window.', { horizon: 'long', capital: 'capex', skillYears: 'years', notes: 'The trowelling window is invisible and closes on its own. Over-working a slab burns it and there is no recovery.' }, [
        leaf('screed-slab-to-grade', 'Screed a slab to the forms', 'Strike a slab off to the finished level.', { cue: 'The surface is at grade against the forms or the pipes with no low spots.', prim: ['bimanual', 'locomote'], dexterity: 2 }),
        leaf('bull-float-cream-up', 'Bull-float so the cream comes up', 'Float a slab to bring paste to the surface.', { cue: 'Cream comes up and the aggregate stays down.', contact: 4 }),
        leaf('edge-slab-full-radius', 'Edge a slab to a full radius', 'Run an edger so the perimeter is dense.', { cue: 'The edge is dense with a full radius and no torn arris.' }),
        leaf('trowel-and-stop-before-burning', 'Trowel to finish and stop before burning it', 'Take a slab to its specified finish and no further.', { cue: 'It reaches the specified finish and you stop, rather than working it until it darkens.', robotNow: 'no', saturation: 'empty' }),
        leaf('recover-slab-set-too-fast', 'Recover: slab going off faster than the crew can finish', 'Re-sequence the pour, add labour or accept a lesser finish deliberately.', { fail: true, horizon: 'medium', prim: ['language', 'recover'] }),
      ]),
      node('reinforcement', 'Place reinforcement', 'Steel that must end up at the right depth in the pour.', { dexterity: 4, prev: 'common' }, [
        leaf('tie-rebar-ends-bent-in', 'Tie rebar at the intersection', 'Wire two bars together at a mark.', { cue: 'The tie is tight and the cut ends are bent inward, away from the cover face.', repetition: 'high-takt' }),
        leaf('set-chair-to-cover', 'Set a chair or dobie to hold cover', 'Support steel at the specified depth.', { cue: 'The steel sits at cover and does not deflect to the ground when stepped near.' }),
        leaf('place-mesh-laps-off-grade', 'Place mesh with correct laps', 'Lay sheet reinforcement and lap it.', { cue: 'Laps meet the spec and the mesh is held off the grade all over.' }),
        leaf('recover-steel-trodden-to-grade', 'Recover: steel trodden down before the pour', 'Lift and re-chair the affected area before concrete arrives.', { fail: true }),
      ]),
      node('groundwork', 'Groundwork and surfacing', 'Breaking, moving and compacting material.', { dexterity: 2, contact: 5, capital: 'mid' }, [
        leaf('run-breaker-let-tool-work', 'Run a breaker into pavement', 'Operate a heavy breaker without fighting it.', { cue: 'The tool does the work and you guide it, rather than prying with your back.', prim: ['tool', 'locomote'], skillYears: 'months' }),
        leaf('shovel-spoil-clear-of-face', 'Shovel spoil to a pile or a barrow', 'Move material without contaminating finished work.', { cue: 'Spoil lands in the pile, not on the finished face.', repetition: 'high-takt' }),
        leaf('run-loaded-barrow-on-plank', 'Run a loaded barrow on a plank', 'Move a heavy barrow along a narrow run and set it down.', { cue: 'It stays on the plank the whole run and is set down rather than dropped.', prim: ['locomote', 'bimanual'] }),
        leaf('set-post-plumb-both-ways', 'Set a post and brace it before the mix', 'Plumb a post in two planes and hold it.', { cue: 'It is plumb both ways and braced before any concrete goes in.', prim: ['inspect', 'bimanual'] }),
        leaf('strike-grade-to-string', 'Strike grade with a shovel or lute', 'Bring loose material to a plane.', { cue: 'The plane matches the string across the full width.' }),
        leaf('compact-overlapping-passes', 'Compact with a plate in overlapping passes', 'Run a compactor evenly across an area.', { cue: 'Passes overlap and the machine never stalls in one spot.', capital: 'mid' }),
        leaf('rake-base-even-depth', 'Rake base or asphalt to even depth', 'Spread material ahead of the roller.', { cue: 'Depth is even ahead of the compaction with no thin patches.', skillYears: 'months' }),
        leaf('shovel-hot-mix-with-roll', 'Shovel hot mix and leave the rake marks with the roll', 'Place hot material so the finish rolls out.', { cue: 'Rake marks run in the direction of the roll, not across it.', contact: 5, prev: 'uncommon' }),
        leaf('recover-soft-spot-under-compaction', 'Recover: soft spot appearing under the plate', 'Dig out, replace and recompact rather than rolling over it.', { fail: true, horizon: 'medium' }),
      ]),
      node('mixing', 'Mix by hand', 'Getting a consistent material out of a bag.', { contact: 5, prev: 'ubiquitous' }, [
        leaf('mix-bag-no-dry-pocket', 'Mix a bag in a bucket or barrow', 'Bring a mix to consistency.', { cue: 'The colour is even and no dry pocket remains in the corners.', prim: ['tool', 'inspect'] }),
        leaf('trowel-on-and-strike-off', 'Trowel mix onto the work and strike it off', 'Apply and level a hand-mixed material.', { cue: 'It is struck off flush with no ridge left at the edge of the pass.' }),
        leaf('recover-mix-gone-off-in-the-bucket', 'Recover: mix stiffened before it was used', 'Discard rather than re-temper, and re-mix a smaller batch.', { fail: true }),
      ]),
    ]),

    node('framing-structure', 'Framing and structure', 'The skeleton, in timber and in steel.', { dexterity: 3, contact: 5, prev: 'common' }, [
      node('walls', 'Frame and stand walls', 'Making a wall on the deck and getting it upright.', { skillYears: 'months' }, [
        leaf('cut-stud-square-both-ends', 'Cut a stud and stand it square to the plate', 'Cut to a mark and place it true.', { cue: 'Both ends are square and sit flat on the plates with no gap.', prim: ['separate', 'tool'] }),
        leaf('toenail-stud-on-layout', 'Toenail a stud so it stays on layout', 'Fix a stud at an angle without driving it off the mark.', { cue: 'It finishes on the layout mark and the plate has not walked.', dexterity: 5, skillYears: 'years', saturation: 'empty' }),
        leaf('stand-wall-brace-before-release', 'Stand a wall and brace before letting go', 'Raise a framed wall, plumb it and secure it.', { cue: 'The brace is nailed off before anyone lets go of the wall.', prim: ['bimanual', 'locomote', 'language'], contact: 5, notes: 'Ordering constraint: every action here is ordinary, and doing them in the wrong order is what hurts somebody.' }),
        leaf('recover-wall-out-of-plumb-after-bracing', 'Recover: wall out of plumb once braced', 'Release, re-plumb and re-brace before anything is fixed to it.', { fail: true }),
      ]),
      node('joists', 'Hang and set joists', 'Load-bearing connections that are judged by what is inside them.', { precision: 4 }, [
        leaf('hang-hanger-nails-in-flues', 'Hang a joist hanger and fill the flues', 'Fix a hanger flush and nail it properly.', { cue: 'Every specified flue has a nail, not just the face holes.', notes: 'A hidden-consequence cue: face-nailing looks identical and fails under load years later.', skillYears: 'months' }),
        leaf('set-joist-seated-crown-up', 'Set a joist into hangers, crown up', 'Drop a member into place the right way round.', { cue: 'The bottom flange is seated in the hanger and the crown is up.', dexterity: 2, prim: ['bimanual'] }),
        leaf('recover-joist-set-crown-down', 'Recover: joist set crown down', 'Lift it back out and turn it before the deck goes on.', { fail: true }),
      ]),
      node('metal-stud', 'Metal stud and grid', 'Light gauge framing and suspended ceilings.', { dexterity: 4, contact: 4, prev: 'common' }, [
        leaf('cut-and-crimp-metal-stud', 'Cut a metal stud and crimp it into track', 'Fix light gauge so it cannot move.', { cue: 'The crimp holds it and the stud will not rotate in the track by hand.', tool: ['crimper'] }),
        leaf('hang-grid-tee-square', 'Hang a grid tee and square it to the room', 'Suspend a ceiling grid on wires and true it.', { cue: 'The tee is level and square to the room, checked on the diagonal.', precision: 5, prim: ['inspect'] }),
        leaf('pop-ceiling-tile-without-crushing', 'Pop a tile into the grid', 'Place a fragile tile into a grid overhead.', { cue: 'It drops in with the edge intact and no crushed corner.', dexterity: 5, contact: 4 }),
        leaf('recover-grid-out-of-square', 'Recover: grid out of square at the last row', 'Adjust the run rather than cutting a tapered tile at the wall.', { fail: true, horizon: 'medium' }),
      ]),
    ]),

    node('envelope', 'Envelope and openings', 'Keeping water out, which is mostly about which way things lap.', { contact: 4, prev: 'common' }, [
      node('roofing', 'Roof covering', 'Working on a slope with a shedding direction.', { dexterity: 4, contact: 5, ethics: 'restricted', notes: 'Roof work is height work. Seeded restricted rather than open.' }, [
        leaf('roll-membrane-shed-direction', 'Roll out membrane in the shedding direction', 'Lay underlay so laps run the right way.', { cue: 'Every lap sheds water down the slope, not into it.', prim: ['deform', 'locomote'] }),
        leaf('nail-shingle-course-to-line', 'Nail a shingle course to the line', 'Fix a course with even exposure and correct nail placement.', { cue: 'Exposure is even along the course and every nail is inside the zone.', repetition: 'high-takt', skillYears: 'months' }),
        leaf('cut-valley-no-gap-at-flashing', 'Cut a valley or rake and set the piece', 'Fit a cut unit against a flashing.', { cue: 'No gap at the flashing and the cut edge is not exposed to the weather.', precision: 4 }),
        leaf('recover-lap-run-backwards', 'Recover: a lap found running the wrong way', 'Strip back to the error rather than patching over it.', { fail: true, horizon: 'medium' }),
      ]),
      node('flashing-seals', 'Flashing and penetrations', 'Details where water is forced out rather than merely covered.', { precision: 4, skillYears: 'years' }, [
        leaf('fit-flashing-fasten-hidden', 'Fit flashing so water is forced out', 'Install a flashing and fix it where the fixings are protected.', { cue: 'Water is directed out, and every fastener is in the hidden zone.', notes: 'Another hidden-consequence cue: an exposed fixing looks fine and leaks in three years.' }),
        leaf('seal-penetration-to-collar', 'Seal a penetration to the specified collar', 'Close the gap round a pipe or duct.', { cue: 'The gap is fully closed all round with the specified collar or sealant.' }),
        leaf('recover-reverse-lapped-flashing', 'Recover: flashing lapped so it collects water', 'Take it apart and re-lap rather than sealing over the fault.', { fail: true }),
      ]),
      node('windows', 'Set windows', 'Getting an opening unit square, level and dry.', { dexterity: 3, precision: 5, prim: ['bimanual', 'inspect'] }, [
        leaf('set-window-shim-check-reveal', 'Set a window on the pan and shim it', 'Place a unit and true it before fixing.', { cue: 'The reveal is even all round and the sash operates before any fastener goes in.', verify: 'Operate the sash fully before fixing, not after.' }),
        leaf('foam-window-without-bowing', 'Foam around a window without bowing the jamb', 'Fill the gap with expanding foam under control.', { cue: 'The gap is filled and the jamb stays straight when checked with the level.', contact: 4 }),
        leaf('recover-bowed-jamb-from-foam', 'Recover: jamb bowed by expanding foam', 'Cut the foam back, re-shim and re-check the sash.', { fail: true, horizon: 'medium' }),
      ]),
    ]),

    node('first-fix', 'First fix services', 'Everything that gets buried before the finish goes on.', { dexterity: 4, precision: 4, prev: 'common' }, [
      node('electrical-rough', 'Rough-in electrical', 'Cable, boxes and devices before the board.', { partner: 'licensed' }, [
        leaf('drill-plate-pull-cable', 'Drill on layout and pull cable through', 'Make a path and get cable through it undamaged.', { cue: 'The cable pulls through with the jacket intact and no stripping at the hole.', prim: ['tool', 'bimanual'] }),
        leaf('staple-nm-at-setback', 'Staple cable at the required setback', 'Fix cable far enough back from the face.', { cue: 'Every staple is at the setback so a later screw cannot reach the cable.', notes: 'The consequence lands on whoever hangs a picture in five years.' }),
        leaf('make-up-outlet-fold-square', 'Make up an outlet and square the device', 'Land, fold and set a device to the finished face.', { cue: 'Nothing is pinched and the yoke sits square to where the board will be.' }),
        leaf('set-plate-flat-on-finish', 'Set a device and plate flat on the finish', 'Bring a device to the finished surface.', { cue: 'The plate sits flat on the finish with no rock and no gap at a corner.' }),
        leaf('recover-cable-nicked-at-a-hole', 'Recover: cable jacket stripped at a drilled hole', 'Cut back, re-pull and protect the hole before boarding.', { fail: true }),
      ]),
      node('plumbing-rough', 'Rough-in plumbing', 'Pipework and fittings that will be covered.', { contact: 5, skillYears: 'months' }, [
        leaf('sweat-joint-then-leave-still', 'Sweat a joint and then leave it still', 'Solder a joint and do not disturb it.', { cue: 'Solder shows the full circumference, then nothing moves until it is cool.', precision: 4, robotNow: 'no', saturation: 'empty' }),
        leaf('press-fitting-witness-correct', 'Press a fitting and check the witness', 'Make a press joint and confirm the tool completed.', { cue: 'The tool completes its cycle and the witness mark is correct.', capital: 'mid', verify: 'Check the witness on every joint before the wall closes.' }),
        leaf('glue-pvc-push-to-stop-and-hold', 'Glue a PVC joint, push to stop and hold', 'Make a solvent joint that cannot back out.', { cue: 'It is home to the stop and held until it cannot push back.', horizon: 'short' }),
        leaf('hang-fixture-land-without-spinning', 'Hang a fixture and land the supply', 'Fit and connect without rotating the body.', { cue: 'The supply is landed and the fixture body has not turned.', prim: ['bimanual'] }),
        leaf('set-toilet-on-wax-alternate-bolts', 'Set a toilet on a new wax', 'Drop a pan onto both bolts and seat it.', { cue: 'Both bolts come through first time and the base stops rocking as the nuts come up alternately.', dexterity: 2 }),
        leaf('recover-joint-leaking-before-close-up', 'Recover: joint weeping at pressure test', 'Find it, cut it out and remake it before anything is covered.', { fail: true, horizon: 'medium' }),
      ]),
      node('supports', 'Supports, strut and pipe', 'Hanging services off the structure.', { dexterity: 3, contact: 5 }, [
        leaf('fit-strut-square-land-hardware', 'Fit strut square and land the hardware', 'Install channel and its fittings true.', { cue: 'The strut is square to the structure and every fitting is seated in the channel.' }),
        leaf('hang-trapeze-rods-plumb', 'Hang a trapeze with both rods plumb', 'Suspend a cross member level.', { cue: 'Both rods are plumb and the cross-piece is level under load.', precision: 4 }),
        leaf('shoulder-carry-pipe-set-on-rack', 'Shoulder-carry pipe and set it on the rack', 'Move long stock and put it down without damage.', { cue: 'It lands on the rack, not on its threads.', prim: ['locomote', 'bimanual'] }),
        leaf('cut-ream-and-thread-pipe', 'Cut, ream and thread pipe to the mark', 'Prepare a threaded pipe end.', { cue: 'The cut is square, the inside is reamed, and the thread runs to the mark.', capital: 'mid', skillYears: 'months' }),
        leaf('make-up-threaded-joint-to-alignment', 'Make up a threaded joint and stop at alignment', 'Tighten a taper thread to the position you need.', { cue: 'Dope or tape on the male thread, and you stop when the fitting points where it must.', notes: 'You cannot back a taper thread off to align it, so the stopping point has to be reached going forwards.' }),
        leaf('recover-fitting-past-alignment', 'Recover: threaded fitting turned past alignment', 'Remake the joint rather than backing it off to line up.', { fail: true }),
      ]),
    ]),

    node('boarding-finish', 'Boarding, taping and painting', 'Turning structure into a surface.', { dexterity: 5, contact: 4, prev: 'ubiquitous' }, [
      node('hang-board', 'Hang board', 'Getting sheets up and fixed.', { dexterity: 2, contact: 5 }, [
        leaf('lift-sheet-hold-on-layout', 'Lift a sheet and hold it on layout', 'Get a board up with a lift or a partner and keep it placed.', { cue: 'It stays on layout while the first screws go in.', prim: ['bimanual', 'language'] }),
        leaf('screw-to-pattern-dimple-not-break', 'Screw a sheet to the pattern', 'Fix a board at the right depth.', { cue: 'Every head dimples the paper without breaking it.', repetition: 'high-takt', precision: 4, robotNow: 'partial' }),
        leaf('recover-screws-broken-through-paper', 'Recover: screws driven through the paper', 'Back them out, refix alongside, and fill.', { fail: true }),
      ]),
      node('tape-and-sand', 'Tape and sand', 'Making joints disappear.', { skillYears: 'years', saturation: 'empty' }, [
        leaf('mud-butt-thin-and-wide', 'Mud a butt joint thin and wide', 'Spread compound so the joint can be feathered.', { cue: 'The knife leaves a thin, wide pass with no ridge at either edge.' }),
        leaf('tape-inside-corner-no-bubbles', 'Tape an inside corner and bed it', 'Set tape into a corner without trapping air.', { cue: 'The tape is bedded with no bubbles when you run the knife back over it.', dexterity: 5 }),
        leaf('sand-until-no-catch', 'Sand a pole or head joint until it disappears', 'Feather a joint by feel.', { cue: 'Your hand runs across it without catching an edge.', prim: ['inspect', 'tool'] }),
        leaf('recover-joint-shows-in-raking-light', 'Recover: joint showing under raking light', 'Widen the pass rather than adding thickness over it.', { fail: true, horizon: 'medium' }),
      ]),
      node('painting', 'Paint and caulk', 'Coatings and the joints under them.', { dexterity: 5, skillYears: 'months' }, [
        leaf('roll-primer-cover-cut-edges', 'Roll primer evenly and cover the cut edges', 'Prime a surface completely.', { cue: 'The coat is even and every cut edge is covered.' }),
        leaf('cut-in-to-the-line-then-stop', 'Cut in to the line, then stop', 'Brush a straight edge freehand and leave it.', { cue: 'The line is straight and you stop rather than going back over drying paint.', precision: 5, robotNow: 'no' }),
        leaf('roll-field-and-back-roll', 'Roll the field and back-roll for even sheen', 'Lay a coat so it reads evenly.', { cue: 'No lap marks and the sheen is even across the wall in raking light.', prim: ['tool', 'locomote'] }),
        leaf('spray-and-backroll-no-holidays', 'Spray and back-roll without holidays', 'Apply by spray and work it in.', { cue: 'No missed patches at edges or corners.', capital: 'mid' }),
        leaf('caulk-tooled-one-pass', 'Caulk a joint and tool it in one pass', 'Run and finish a bead in a single movement.', { cue: 'Bonded on both sides and tooled in one pass with no restarts.' }),
        leaf('recover-lap-marks-in-a-dried-coat', 'Recover: lap marks visible once dry', 'Recoat the whole plane rather than patching the marks.', { fail: true, horizon: 'medium' }),
      ]),
    ]),

    node('tiling', 'Tiling', 'Rigid modules on an imperfect substrate, with a closing window.', { dexterity: 4, precision: 5, contact: 5, skillYears: 'years', prev: 'common', saturation: 'empty' }, [
      node('set-tile', 'Spread and set tile', 'Getting full coverage before the adhesive skins.', { horizon: 'long' }, [
        leaf('spread-thinset-ridges-standing', 'Spread thinset with the specified notch', 'Comb adhesive to the right profile.', { cue: 'The ridges are standing and have not slumped before the tile goes on.' }),
        leaf('set-tile-twist-and-beat-in', 'Set a tile with a twist and beat it in', 'Place and bed a tile for full contact.', { cue: 'Coverage is full when a tile is lifted and checked.', verify: 'Lift one tile early in the run and check the back for full coverage.' }),
        leaf('space-and-level-before-skin', 'Space and level tile before the adhesive skins', 'True a tile to its neighbours inside the working time.', { cue: 'Faces are level with the neighbours and it is done before the thinset skins.', notes: 'The deadline is invisible: once it skins, moving the tile breaks the bond without looking different.' }),
        leaf('cut-tile-and-dress-the-edge', 'Cut a tile and dress the edge', 'Saw a tile and prepare it for the field.', { cue: 'The cut edge is dressed before it goes in, not after.', capital: 'mid' }),
        leaf('recover-lippage-before-set', 'Recover: lippage found before the adhesive sets', 'Lift, adjust the bed and relay within the open time.', { fail: true, horizon: 'short' }),
      ]),
      node('grout-finish', 'Grout and finish', 'Closing the joints and cleaning the face.', { dexterity: 4 }, [
        leaf('grout-and-tool-consistent-profile', 'Grout and tool to a consistent profile', 'Fill and shape the joints.', { cue: 'The profile is consistent along the run and the haze is on the face, not sitting in the joint.' }),
        leaf('recover-grout-hazed-hard', 'Recover: grout haze left until it hardened', 'Remove it with the correct product rather than scouring the face.', { fail: true }),
      ]),
    ]),

    node('carpentry', 'Second fix carpentry', 'Doors, hardware and trim, judged by the reveal.', { dexterity: 5, precision: 5, skillYears: 'years', prev: 'common', saturation: 'empty' }, [
      node('doors-hardware', 'Hang doors and fit hardware', 'The most-adjusted moving part in a building.', {}, [
        leaf('hang-door-even-reveal', 'Hang a door and plane the high edge', 'Fit a door to an out-of-square opening.', { cue: 'An even reveal all round and the door stays where you leave it.', horizon: 'long' }),
        leaf('mortise-hinge-flush-knuckles-straight', 'Mortise a hinge flush', 'Cut a hinge recess by hand.', { cue: 'The leaf sits flush with the face and the knuckle line is straight down the jamb.', precision: 5 }),
        leaf('set-strike-latch-centred', 'Set a strike so the latch centres', 'Position a strike plate.', { cue: 'The latch hits the centre of the hole and the door does not rattle.', verify: 'Close it repeatedly and confirm it catches every time without a push.' }),
        leaf('set-lockset-full-throw', 'Set a lockset with a full throw', 'Fit a lock so it operates completely.', { cue: 'The latch throws fully and the rose is square to the door.' }),
        leaf('recover-door-binding-at-the-head', 'Recover: door binding after the frame moved', 'Find where it touches and take material from the correct edge.', { fail: true }),
      ]),
      node('trim', 'Fit trim', 'Where every gap is visible forever.', { dexterity: 5 }, [
        leaf('fit-baseboard-tight-at-scribes', 'Fit baseboard tight to floor and wall', 'Scribe and fit skirting.', { cue: 'Tight at the scribes with no light showing along the floor.' }),
        leaf('cope-inside-corner-closed', 'Cope an inside corner', 'Cut a profile that closes on its neighbour.', { cue: 'The profile closes with no gap when pushed together.', precision: 5, skillYears: 'years' }),
        leaf('nail-off-trim-set-not-proud', 'Nail off trim and set the heads', 'Fix trim and sink the fixings.', { cue: 'The wood is tight and every nail is set below the surface, none proud.' }),
        leaf('recover-open-cope', 'Recover: cope open at the top of the profile', 'Recut rather than filling the gap.', { fail: true }),
      ]),
    ]),

    node('access-handling', 'Access, handling and site discipline', 'Getting to the work and moving material, which is where most of the harm on a site happens.', { dexterity: 2, contact: 5, ethics: 'restricted', prev: 'ubiquitous', notes: 'Seeded restricted rather than open: height and lifting work carries real injury risk and should be captured on a site with its own safety regime, not improvised.' }, [
      node('height', 'Work at height', 'Ladders, scaffold and the order in which you attach yourself to things.', { prim: ['locomote', 'inspect'] }, [
        leaf('climb-scaffold-hands-on-rungs', 'Climb a scaffold via the ladder bay', 'Ascend with tools carried properly.', { cue: 'Both hands on the rungs the whole climb, with tools on a belt or a line.' }),
        leaf('clip-lanyard-before-stepping-off', 'Clip on before stepping onto the plank', 'Attach to the anchor before leaving the ladder.', { cue: 'The lanyard is on the designated anchor before either foot leaves the ladder.', notes: 'Ordering constraint. Both actions are trivial; only the sequence matters.' }),
        leaf('land-plank-full-bearing', 'Land a plank with full bearing', 'Place a board across brackets.', { cue: 'Both ends have full bearing on the brackets with no overhang short of the support.' }),
        leaf('lock-walk-board-before-loading', 'Raise a pump-jack and lock before loading', 'Set a moving platform and secure it.', { cue: 'The board is locked before anyone or anything is loaded onto it.' }),
        leaf('set-ladder-four-to-one', 'Set an extension ladder at 4:1', 'Pitch a ladder correctly and secure the base.', { cue: 'The angle is about four up to one out and the feet are firm before anyone climbs.', verify: 'Have it footed or tied before the climb if the base is not secure.' }),
        leaf('work-off-rungs-not-the-top', 'Climb and work off the rungs', 'Position yourself on a ladder to work.', { cue: 'You are working off the rungs with the top left free, not standing on the last one.' }),
        leaf('walk-designated-path-on-a-deck', 'Walk a roof or deck on the designated path', 'Move across a partially complete structure.', { cue: 'You stay on the marked path and off any span not yet fixed.' }),
        leaf('recover-anchor-point-unavailable', 'Recover: planned anchor point turns out unusable', 'Stop, find or install an alternative rather than working unattached.', { fail: true, horizon: 'medium', prim: ['language', 'recover'] }),
      ]),
      node('lifting', 'Lift, pass and land material', 'Two-person work where the handoff is the risky part.', { prim: ['bimanual', 'locomote', 'language'] }, [
        leaf('carry-sheet-solo-on-edge', 'Carry a sheet solo on edge', 'Move a large board alone and set it down.', { cue: 'It is carried on edge and set down on edge, never dropped flat.' }),
        leaf('two-person-carry-on-the-count', 'Two-person carry a sheet on the count', 'Move a board with a partner.', { cue: 'Same end height, and both people move on the spoken count.', notes: 'Verbal coordination inside a physical task, which almost no dataset captures.' }),
        leaf('pass-material-up-receiver-has-it', 'Pass material up to a receiver', 'Hand material to someone above.', { cue: 'The receiver has hold of it before you let go.' }),
        leaf('throw-to-a-set-partner', 'Throw a bundle to a partner who is set', 'Send material up to someone ready for it.', { cue: 'The partner is set and looking before it leaves your hands, never to an empty roof.' }),
        leaf('tie-off-load-that-will-not-slip', 'Tie off a load for a hoist', 'Secure a load so it cannot shift under lift.', { cue: 'The knot or hitch holds without slipping when the line takes the weight.', verify: 'Take the weight slowly and watch the hitch before lifting clear.' }),
        leaf('land-load-on-blocking-unhook-after', 'Land a load on blocking and unhook after', 'Set down a hoisted load safely.', { cue: 'It lands on blocking rather than a finished edge, and the hook comes off only once it is stable.' }),
        leaf('recover-load-swinging-on-the-lift', 'Recover: load swinging or shifting on the lift', 'Set it back down and re-rig rather than steadying it by hand.', { fail: true }),
      ]),
      node('demo-and-debris', 'Demolition and debris', 'Taking things apart without damaging what stays.', { contact: 5, prev: 'common' }, [
        leaf('pry-so-the-framing-stays', 'Demo with a pry bar so the framing stays', 'Remove finish selectively.', { cue: 'The finish comes off and anything designated to stay is undamaged.' }),
        leaf('demo-drop-into-the-pile', 'Demo with a hammer and drop into the pile', 'Break out material and control where it lands.', { cue: 'Debris goes into the pile, not onto a finished floor.' }),
        leaf('bag-or-chute-debris', 'Bag or chute debris clear of the route', 'Remove waste so the area stays workable.', { cue: 'The next person can walk the route without stepping over anything.' }),
        leaf('recover-damage-to-work-that-was-staying', 'Recover: damaged something that was meant to stay', 'Stop, assess and report before it is covered up.', { fail: true, prim: ['language', 'recover'] }),
      ]),
      node('power-tools', 'Cutting, drilling and anchors', 'Powered tools where the exit from the cut matters as much as the entry.', { dexterity: 4, contact: 5, prev: 'ubiquitous' }, [
        leaf('circular-saw-offcut-supported', 'Cut with a circular saw on the line', 'Make a cut with the waste supported.', { cue: 'The line is followed, both hands are on the saw, and the offcut is supported so it cannot pinch the blade.' }),
        leaf('grinder-let-wheel-exit-first', 'Cut with a grinder and let the wheel stop', 'Finish a cut and put the tool down safely.', { cue: 'The wheel is clear of the cut and has stopped before the tool is set down.', notes: 'The dangerous moment is after the cut, not during it.' }),
        leaf('drill-concrete-without-walking', 'Drill concrete and clear the hole', 'Bore and prepare a hole in masonry.', { cue: 'The bit starts without walking and the hole is blown or vacuumed clear.', capital: 'mid' }),
        leaf('set-anchor-to-embedment-mark', 'Set an anchor to the embedment mark', 'Install an anchor to the correct depth.', { cue: 'It reaches the embedment mark and is set with the specified tool.', precision: 4 }),
        leaf('torque-anchor-fixture-tight', 'Torque an anchor and check the fixture', 'Tighten an anchor and confirm the result.', { cue: 'It torques to spec and the fixture is tight to the surface with no gap.', verify: 'Try to move the fixture by hand after torquing.' }),
        leaf('core-drill-plumb-catch-the-slug', 'Core-drill plumb and catch the slug', 'Run a core rig and control the offcut.', { cue: 'The rig stays plumb through the cut and the slug is caught rather than dropped.', capital: 'capex', skillYears: 'months' }),
        leaf('recover-bit-bound-in-the-hole', 'Recover: bit or core bound in the hole', 'Release safely without wrenching the tool or the fixture.', { fail: true }),
      ]),
      node('body-and-stance', 'Body position on site', 'Getting up, down and around the work without putting yourself in the wrong place.', { prim: ['locomote'], prev: 'ubiquitous' }, [
        leaf('kneel-to-stand-with-a-tool', 'Kneel to stand on a deck holding a tool', 'Get up from working low with one hand occupied.', { cue: 'You rise with a free hand on a stable point rather than pushing off the work.' }),
        leaf('stance-clear-of-the-line-of-a-drop', 'Take a stance clear of the line of a drop', 'Position yourself relative to what could fall.', { cue: 'Your body is out of the line of anything that could come down, and the last brace or guard is in place before you settle.' }),
        leaf('recover-caught-in-a-bad-position', 'Recover: found yourself under a suspended load', 'Move clear first and re-plan the sequence rather than working quickly.', { fail: true, prim: ['recover', 'language'] }),
      ]),
    ]),
  ],
)
