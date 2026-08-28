import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

export const d04: NodeSpec = node(
  'd04',
  'Apparel and soft goods',
  'Cutting, sewing and finishing flexible materials: the deformable-object domain with a real industry behind it.',
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
    node('pattern-cut', 'Pattern and cutting', 'Turning flat cloth into shaped panels.', { horizon: 'long' }, [
      node('layout-marking', 'Lay up and mark the pattern', 'Placing pattern on grain and marking it.', { precision: 4 }, [
        leaf('lay-fabric-on-grain', 'Lay fabric on grain', 'Align warp, smooth out bias distortion across a table.', { prim: ['deform', 'bimanual'], skillYears: 'years' }),
        leaf('pin-pattern-piece', 'Pin a pattern piece to cloth', 'Place pins through paper and two cloth layers without shifting them.', { dexterity: 5, precision: 4 }),
      ]),
      node('cutting', 'Cut cloth to the pattern', 'Shears, rotary and band knife.', { contact: 4 }, [
        leaf('cut-with-shears', 'Cut a curve with shears', 'Long smooth cuts, cloth flat, hand advancing ahead of the blade.', { dexterity: 5, skillYears: 'months' }),
        leaf('rotary-cut-multi-ply', 'Rotary cut a multi-ply lay', 'Keep the blade vertical through a stack so every ply matches.', { precision: 5, capital: 'mid' }),
        leaf('recover-mis-cut-panel', 'Recover: panel cut off grain', 'Detect the distortion, re-cut from remnant, re-plan the lay.', { fail: true, horizon: 'long' }),
      ]),
    ]),
    node('machine-sewing', 'Machine sewing', 'Feeding fabric through a powered needle.', { dexterity: 5, contact: 5, skillYears: 'years', prev: 'common' }, [
      node('straight-seams', 'Sew straight seams and edges', 'The bread and butter of the machine.', { repetition: 'high-takt' }, [
        leaf('sew-straight-seam', 'Sew a straight seam at constant allowance', 'Guide two plies at constant offset while the feed dogs pull.', { saturation: 'empty', robotNow: 'no' }),
        leaf('sew-topstitch-edge', 'Topstitch a folded edge', 'Fold ahead of the needle with the left hand while stitching.', { prim: ['bimanual', 'deform'] }),
      ]),
      node('curved-3d', 'Sew curved and shaped seams', 'Where sewing stops being planar.', { dexterity: 5, precision: 5, skillYears: 'years' }, [
        leaf('set-in-sleeve', 'Set in a sleeve', 'Ease a curved head into an armhole without puckering.', { contact: 5, robotNow: 'no', saturation: 'empty' }),
        leaf('sew-zip-into-placket', 'Sew a zip into a placket', 'Manage a rigid component inside a compliant one.', { prim: ['insert', 'deform'] }),
        leaf('recover-puckered-seam', 'Recover: seam puckered', 'Unpick, press flat, restitch with adjusted tension.', { fail: true, horizon: 'medium' }),
      ]),
      node('machine-setup', 'Thread and tune the machine', 'Getting the machine ready and keeping it running.', { horizon: 'short', prev: 'common' }, [
        leaf('thread-machine', 'Thread a machine and wind a bobbin', 'Follow a fixed path through guides and tension discs.', { dexterity: 5, precision: 4 }),
        leaf('set-tension-test-scrap', 'Set tension on a test scrap', 'Stitch, inspect both sides, adjust, repeat.', { prim: ['inspect', 'tool'] }),
        leaf('recover-birds-nest', 'Recover: thread nest under the plate', 'Stop, cut clear, remove the plate, clear the hook, re-thread.', { fail: true, saturation: 'empty' }),
      ]),
    ]),
    node('hand-sewing', 'Hand sewing and finishing', 'Where the hand still beats the machine.', { dexterity: 5, contact: 5, skillYears: 'years', prev: 'uncommon', saturation: 'empty' }, [
      node('hand-stitches', 'Stitch by hand', 'Needle work without a machine.', {}, [
        leaf('slip-stitch-hem', 'Slip stitch a hem', 'Catch a single thread of the face cloth so nothing shows.', { precision: 5, dexterity: 5 }),
        leaf('sew-on-button', 'Sew on a button with a shank', 'Build a shank of the right height and whip it.', { prev: 'common' }),
      ]),
      node('repair-alter', 'Alter and repair a garment', 'Changing a garment that already exists.', { horizon: 'long', robotNow: 'no' }, [
        leaf('take-in-side-seam', 'Take in a side seam', 'Unpick, re-mark on the body, restitch, press.', { skillYears: 'years' }),
        leaf('darn-a-hole', 'Darn a hole', 'Weave new structure into a damaged area by hand.', { dexterity: 5, saturation: 'empty' }),
      ]),
    ]),
    node('pressing', 'Pressing and finishing', 'Heat, steam and shape.', { contact: 4, prev: 'common' }, [
      node('press-work', 'Press seams and shapes', 'Shaping cloth with an iron and a form.', { skillYears: 'months' }, [
        leaf('press-open-seam', 'Press a seam open', 'Run the iron along the seam with the other hand opening it ahead.', { prim: ['tool', 'bimanual'] }),
        leaf('press-with-ham', 'Press a curve over a tailors ham', 'Shape a three-dimensional curve with steam and pressure.', { skillYears: 'years', saturation: 'empty' }),
      ]),
    ]),
    node('leather-shoe', 'Leather and footwear', 'Heavier soft goods with different failure modes.', { contact: 5, skillYears: 'years', prev: 'rare', saturation: 'empty' }, [
      node('leather-work', 'Cut and stitch leather', 'Cutting, skiving, stitching hide.', {}, [
        leaf('skive-an-edge', 'Skive a leather edge', 'Thin an edge to a taper with a blade held at a constant angle.', { dexterity: 5, precision: 5 }),
        leaf('saddle-stitch', 'Saddle stitch a seam', 'Two needles, one hole, consistent tension both sides.', { prim: ['bimanual', 'fasten'] }),
      ]),
      node('shoe-making', 'Last and repair footwear', 'Lasting, sole attach, heel work.', { capital: 'mid' }, [
        leaf('last-an-upper', 'Last an upper', 'Pull an upper over a last with pincers and tack it in place.', { contact: 5, skillYears: 'years' }),
        leaf('replace-heel-tip', 'Replace a heel tip', 'Extract the old tip, fit and trim a new one flush.', { prev: 'uncommon' }),
      ]),
    ]),
  ],
)
