import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

export const d08: NodeSpec = node(
  'd08',
  'Construction and trades',
  'Site work from first fix to finish: framing, boarding, plastering, tiling, painting, carpentry and masonry.',
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
    node('framing', 'Framing and first fix', 'Structure and everything hidden behind the finish.', { dexterity: 3, contact: 5 }, [
      node('stud-work', 'Set out and fix stud partitions', 'Building the skeleton of a wall.', { prev: 'common' }, [
        leaf('set-out-partition', 'Set out a partition line', 'Transfer a line from a drawing to a floor and up to the ceiling.', { prim: ['inspect', 'tool'], precision: 4 }),
        leaf('fix-stud-to-track', 'Fix studs into track', 'Hold, plumb and screw a stud one-handed.', { prim: ['fasten', 'bimanual'] }),
        leaf('cut-notch-for-services', 'Notch a stud for services', 'Cut to a permitted depth in the permitted zone.', { skillYears: 'years' }),
      ]),
      node('boarding', 'Lift and fix plasterboard', 'Fixing sheet material to structure.', { dexterity: 2, contact: 5, prev: 'common' }, [
        leaf('lift-and-fix-board', 'Lift and fix a plasterboard sheet', 'Two-person lift, position, hold and screw a heavy sheet overhead.', { prim: ['bimanual', 'locomote', 'language'], saturation: 'empty' }),
        leaf('scribe-and-cut-board', 'Scribe and cut board to a shape', 'Measure an irregular opening, transfer and cut.', { precision: 4, prim: ['inspect', 'separate'] }),
        leaf('recover-mis-measured-board', 'Recover: board cut short', 'Decide patch versus new sheet, and hide the joint.', { fail: true }),
      ]),
    ]),
    node('plaster', 'Plastering and rendering', 'The classic hard-to-automate trowel skill.', { dexterity: 5, contact: 5, skillYears: 'years', robotNow: 'no', saturation: 'empty', prev: 'common', prim: ['deform', 'tool'] }, [
      node('skim', 'Skim a wall flat', 'A flat, polished surface produced by feel.', { horizon: 'long' }, [
        leaf('apply-first-coat', 'Apply a first skim coat', 'Load the trowel, lay on at angle, cover evenly at thickness.', { skillYears: 'years' }),
        leaf('flatten-and-trowel-up', 'Flatten and trowel up at the right time', 'Judge the set state by sound and drag, then polish.', { prim: ['inspect', 'deform'], skillYears: 'years', robotNow: 'no' }),
        leaf('recover-blown-patch', 'Recover: patch drying too fast', 'Rewet, re-work the section, blend the joint invisibly.', { fail: true }),
      ]),
      node('patch-repair', 'Patch and make good a surface', 'Repairing an existing surface to match.', { horizon: 'medium', prev: 'ubiquitous' }, [
        leaf('fill-and-sand-patch', 'Fill, sand and feather a patch', 'Build up in coats and feather so the repair disappears.', { dexterity: 5, prim: ['deform', 'tool'] }),
        leaf('match-existing-texture', 'Match an existing wall texture', 'Reproduce a texture by hand until it reads as continuous.', { skillYears: 'years', saturation: 'empty' }),
      ]),
    ]),
    node('tiling', 'Tiling walls and floors', 'Rigid modules on an imperfect substrate.', { dexterity: 4, precision: 4, contact: 5, skillYears: 'years', prev: 'common', saturation: 'empty' }, [
      node('setting-out-tiles', 'Set out and lay tiles', 'Deciding where the cuts fall before anything sticks.', { horizon: 'long' }, [
        leaf('set-out-tile-layout', 'Set out a tile layout', 'Plan cuts so the room reads symmetrical.', { prim: ['inspect', 'language'], contact: 2 }),
        leaf('notch-adhesive-and-lay', 'Comb adhesive and lay a tile', 'Comb at a constant angle, place, press and beat in.', { contact: 5, repetition: 'high-takt' }),
        leaf('cut-tile-around-obstacle', 'Cut a tile around an obstacle', 'Mark, cut a complex outline, dry fit, adjust.', { precision: 5, skillYears: 'years' }),
        leaf('recover-lippage', 'Recover: lippage found before set', 'Lift the tile, adjust the bed, relay within the open time.', { fail: true, horizon: 'short' }),
      ]),
      node('grout-seal', 'Grout and seal the joints', 'Finishing the joints.', { dexterity: 4 }, [
        leaf('grout-and-sponge', 'Grout and sponge off', 'Work grout in diagonally, then clean the face at the right moment.', { prim: ['transfer', 'tool'] }),
        leaf('silicone-internal-corner', 'Silicone an internal corner', 'Continuous bead in a corner and tool it clean.', { dexterity: 5 }),
      ]),
    ]),
    node('paint-finish', 'Painting and finishing', 'Coatings applied by hand.', { dexterity: 4, contact: 3, skillYears: 'months', prev: 'ubiquitous', saturation: 'thin' }, [
      node('prep-surfaces', 'Prepare and mask a surface', 'The part that decides the result.', { horizon: 'long' }, [
        leaf('sand-and-dust-off', 'Sand and dust off a surface', 'Even abrasion by feel and a full dust removal pass.', { contact: 4, prim: ['tool', 'transfer'] }),
        leaf('mask-edges', 'Mask edges and fittings', 'Apply tape in a continuous accurate line.', { precision: 4, dexterity: 5 }),
      ]),
      node('apply-coating', 'Brush, roll and cut in paint', 'Brush, roller and spray.', {}, [
        leaf('cut-in-edge', 'Cut in an edge freehand', 'A straight line at a ceiling junction with a loaded brush.', { dexterity: 5, precision: 5, skillYears: 'years', robotNow: 'no', saturation: 'empty' }),
        leaf('roller-wall-even', 'Roller a wall to an even finish', 'Overlapping passes that leave no lap marks.', { prim: ['tool', 'locomote'] }),
        leaf('recover-drip-run', 'Recover: run in a wet coat', 'Spot it in raking light, lay it off before it sets.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
    ]),
    node('carpentry', 'Carpentry and joinery', 'Second fix and fitted work.', { dexterity: 4, precision: 5, skillYears: 'years', prev: 'common', saturation: 'empty' }, [
      node('second-fix', 'Hang doors and fit trim', 'Doors, skirting, architrave, ironmongery.', {}, [
        leaf('hang-a-door', 'Hang a door', 'Plane to fit, mark and chisel hinges, adjust for a racked frame.', { horizon: 'long', skillYears: 'years' }),
        leaf('scribe-skirting', 'Scribe skirting to an uneven floor', 'Transfer a floor profile onto a board and cut to it.', { precision: 5, prim: ['inspect', 'separate'] }),
        leaf('fit-mortice-lock', 'Fit a mortice lock', 'Drill, chisel and align a lock and its keep.', { precision: 5 }),
      ]),
      node('bench-joinery', 'Cut joints at the bench', 'Cutting joints and making components.', { capital: 'mid', prev: 'uncommon' }, [
        leaf('cut-mortice-tenon', 'Cut a mortice and tenon by hand', 'Saw to a line, pare to fit, test the joint dry.', { dexterity: 5, precision: 5, skillYears: 'years' }),
        leaf('recover-loose-joint', 'Recover: joint cut loose', 'Shim, glue or re-cut, keeping the assembly square.', { fail: true }),
      ]),
    ]),
    node('concrete-masonry', 'Concrete and masonry', 'Heavy wet trades.', { dexterity: 3, contact: 5, capital: 'mid', prev: 'common', saturation: 'empty' }, [
      node('bricklaying', 'Lay bricks to a line', 'Repetitive, judged by line and level.', { repetition: 'high-takt', skillYears: 'years' }, [
        leaf('lay-brick-to-line', 'Lay a brick to the line', 'Spread, furrow, place, tap down to line and level in one motion.', { dexterity: 5, robotNow: 'partial' }),
        leaf('point-a-joint', 'Point a mortar joint', 'Iron a joint to a consistent profile along a course.', { dexterity: 5 }),
      ]),
      node('concrete-work', 'Place and finish concrete', 'Pour, screed, float, trowel.', { horizon: 'long', capital: 'capex' }, [
        leaf('screed-a-slab', 'Screed a slab to level', 'Two-person sawing motion along rails.', { prim: ['bimanual', 'language', 'locomote'], dexterity: 2 }),
        leaf('power-float-slab', 'Power float a slab', 'Operate a float machine and judge the set window.', { capital: 'capex', skillYears: 'years', suit: 'ok' }),
      ]),
    ]),
  ],
)
