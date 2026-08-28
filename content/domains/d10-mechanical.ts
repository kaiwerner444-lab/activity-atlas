import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

export const d10: NodeSpec = node(
  'd10',
  'Mechanical assembly',
  'Bench and cell assembly of mechanical parts: fasteners, seals, bearings, fits and the alignment work that decides whether any of it lasts.',
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
    node('fastening', 'Threaded fastening', 'The single most common industrial contact task, and still not solved outside a jig.', { prev: 'ubiquitous', precision: 3 }, [
      node('start-thread', 'Start a thread without cross-threading', 'The part robots are worst at: finding the thread without cross-threading.', { dexterity: 5, contact: 5, robotNow: 'partial' }, [
        leaf('finger-start-bolt', 'Finger start a bolt in a blind hole', 'Feel for seat, back off until the thread drops in, run down by hand.', { dexterity: 5, contact: 5, prev: 'ubiquitous', saturation: 'thin' }),
        leaf('start-overhead-fastener', 'Start a fastener overhead one-handed', 'Hold the part and start the thread with the same hand above head height.', { dexterity: 5, contact: 5, skillYears: 'months', suit: 'excellent' }),
        leaf('start-captive-screw', 'Start a captive screw through a stack', 'Compress a stack of parts and gaskets while starting the screw.', { prim: ['bimanual', 'fasten'] }),
        leaf('recover-cross-thread', 'Recover: cross-threaded fastener', 'Feel the wrong resistance, back it out, inspect the thread, chase or replace.', { fail: true, prim: ['recover', 'inspect'], saturation: 'empty' }),
      ]),
      node('torque', 'Torque fasteners in sequence', 'Getting clamp load right and in the right order.', { precision: 4, prev: 'common' }, [
        leaf('torque-to-spec', 'Torque a fastener to spec', 'Set the wrench, pull smoothly to the click, mark it.', { tool: ['torque wrench'], repetition: 'high-takt' }),
        leaf('star-pattern-torque', 'Torque a flange in star pattern', 'Work a bolt circle in the specified sequence over multiple passes.', { horizon: 'medium', prim: ['tool', 'inspect'] }),
        leaf('angle-torque', 'Torque plus angle on a stretch bolt', 'Snug, then turn a specified angle, tracking rotation by feel and marker.', { skillYears: 'months', prev: 'uncommon' }),
        leaf('recover-missed-bolt', 'Recover: one bolt missed in a sequence', 'Detect at audit, back off the affected region, redo the sequence.', { fail: true, horizon: 'medium' }),
      ]),
      node('non-threaded-fastening', 'Set clips, rivets and circlips', 'Fasteners that go in once.', { prev: 'common' }, [
        leaf('press-panel-clip', 'Press a panel clip home', 'Align both legs and press until the click, without marking the panel.', { contact: 5, repetition: 'high-takt' }),
        leaf('set-blind-rivet', 'Set a blind rivet', 'Hold parts tight, set the rivet, snap the mandrel, check the head.', { tool: ['rivet gun'] }),
        leaf('fit-circlip', 'Fit an internal circlip', 'Spread the clip with pliers and drop it into the groove without launching it.', { dexterity: 5, skillYears: 'months' }),
        leaf('recover-launched-circlip', 'Recover: circlip launched across the bench', 'Find it, inspect for deformation, replace, re-fit with a shield.', { fail: true, prev: 'common' }),
      ]),
    ]),

    node('seals-gaskets', 'Gaskets, seals and sealing', 'Everything that has to keep fluid on one side.', { contact: 5, precision: 4, prev: 'common' }, [
      node('gasket-fit', 'Fit a static gasket or O-ring', 'Placing and compressing a static seal.', {}, [
        leaf('place-paper-gasket', 'Place a paper gasket on a face', 'Align holes, hold against gravity, start fasteners without shifting it.', { dexterity: 4, prim: ['bimanual', 'insert'] }),
        leaf('fit-o-ring-groove', 'Fit an O-ring into a groove', 'Stretch, seat around the groove, check it is not twisted anywhere.', { dexterity: 5, precision: 5, prim: ['deform', 'inspect'] }),
        leaf('apply-rtv-bead', 'Apply an RTV sealant bead', 'Lay a continuous bead at constant width around a face and its bolt holes.', { prim: ['transfer', 'tool'], skillYears: 'months' }),
        leaf('recover-twisted-oring', 'Recover: twisted O-ring found on leak test', 'Strip the joint, clean both faces, fit a new seal, retest.', { fail: true, horizon: 'medium' }),
      ]),
      node('dynamic-seals', 'Fit and repack dynamic seals', 'Seals that move: lip seals, packing, rod seals.', { prev: 'uncommon', skillYears: 'years' }, [
        leaf('press-lip-seal', 'Press in a lip seal square', 'Drive a lip seal with the right sleeve so it goes in square and undamaged.', { precision: 5, tool: ['seal driver'] }),
        leaf('repack-gland', 'Repack a gland', 'Remove old packing, cut rings, stagger joints, tension the follower.', { horizon: 'long', skillYears: 'years', saturation: 'empty' }),
        leaf('recover-inverted-lip', 'Recover: seal lip inverted on assembly', 'Detect the leak, extract the seal, fit with the correct protector.', { fail: true }),
      ]),
    ]),

    node('shafts-bearings', 'Shafts, bearings and fits', 'Rotating assemblies where microns matter.', { precision: 5, contact: 5, skillYears: 'years', prev: 'common' }, [
      node('bearing-fit', 'Fit a bearing without damage', 'Getting a bearing on or in without damaging the raceway.', { capital: 'mid' }, [
        leaf('press-bearing-arbor', 'Press a bearing with an arbor press', 'Support the correct race, press square, feel for the shoulder.', { contact: 5, tool: ['arbor press'] }),
        leaf('induction-heat-fit', 'Induction heat and fit a bearing', 'Heat to temperature, place fast and square before it grips.', { horizon: 'short', capital: 'capex', skillYears: 'years', prev: 'uncommon' }),
        leaf('recover-brinelled-race', 'Recover: bearing brinelled by pressing on the wrong race', 'Identify the noise, strip, replace, correct the tooling.', { fail: true, horizon: 'long', saturation: 'empty' }),
      ]),
      node('alignment', 'Align a coupling with shims', 'Making two rotating things agree about where the centreline is.', { precision: 5, horizon: 'long', skillYears: 'years', capital: 'mid', prev: 'common', saturation: 'empty' }, [
        leaf('dial-indicator-align', 'Align a coupling with dial indicators', 'Sweep, read four positions, calculate, shim, repeat until in tolerance.', { prim: ['inspect', 'tool'], robotNow: 'no' }),
        leaf('laser-align-coupling', 'Laser align a coupling', 'Mount the heads, sweep, follow the live readout, shim and move.', { capital: 'capex', prim: ['inspect', 'tool'] }),
        leaf('cut-shims', 'Cut and fit alignment shims', 'Cut shim stock, deburr, stack to a calculated height under a foot.', { dexterity: 4, precision: 5 }),
        leaf('recover-soft-foot', 'Recover: soft foot discovered mid-alignment', 'Detect the moving foot, diagnose the cause, correct before continuing.', { fail: true, horizon: 'long', skillYears: 'years' }),
      ]),
      node('press-fits', 'Press an interference fit by feel', 'Assembly by force where feel is the only feedback.', { contact: 5, prev: 'uncommon' }, [
        leaf('press-pin-into-bore', 'Press a dowel pin into a bore', 'Start square, feel the load curve, stop at the shoulder.', { precision: 5, contact: 5 }),
        leaf('recover-stuck-part', 'Recover: part stuck part-way into a bore', 'Decide between pressing through and extracting, avoid galling the bore.', { fail: true, skillYears: 'years' }),
      ]),
    ]),

    node('subassembly', 'Subassembly and kitting', 'The flow work around the assembly itself.', { dexterity: 3, precision: 2, contact: 3, skillYears: 'none', robotNow: 'yes', saturation: 'heavy', prev: 'ubiquitous' }, [
      node('kitting', 'Kit and present parts', 'Getting the right parts to the bench in the right order.', { repetition: 'high-takt' }, [
        leaf('pick-to-kit-tray', 'Pick parts into a kit tray', 'Read the list, pick from bins, place in tray cells, confirm.', { saturation: 'heavy', robotNow: 'yes' }),
        leaf('deburr-and-clean-part', 'Deburr and clean an incoming part', 'Inspect edges, deburr, wipe, place ready for assembly.', { prim: ['inspect', 'tool', 'transfer'], contact: 4 }),
        leaf('recover-wrong-part-in-kit', 'Recover: wrong part number in the kit', 'Notice at fit-up, stop, source the correct part, log the miskit.', { fail: true, saturation: 'empty', prim: ['inspect', 'language', 'recover'] }),
      ]),
      node('build-sequence', 'Follow and teach a build sequence', 'Following, and departing from, a documented sequence.', { horizon: 'long', prev: 'common' }, [
        leaf('follow-work-instruction', 'Follow an illustrated work instruction', 'Read a step, act, confirm, advance, with the screen at the bench.', { prim: ['language', 'inspect'], saturation: 'thin' }),
        leaf('build-from-drawing', 'Build a subassembly from a drawing only', 'Infer the sequence from a 2D drawing without a written procedure.', { skillYears: 'years', robotNow: 'no', saturation: 'empty' }),
        leaf('train-a-colleague', 'Show a colleague how to do the step', 'Demonstrate, narrate, correct their hands, hand the tool over.', { prim: ['language', 'bimanual'], saturation: 'empty', notes: 'Instruction-while-doing is exactly the multimodal data a VLA wants and nobody records.' }),
      ]),
    ]),

    node('verification', 'Fit, function and verification', 'Proving the assembly before it moves on.', { contact: 3, dexterity: 3, prim: ['inspect', 'tool'], prev: 'common' }, [
      node('functional-check', 'Turn it, run it, listen to it', 'Turning it, running it, listening to it.', {}, [
        leaf('rotate-and-feel', 'Rotate an assembly and judge it by feel', 'Turn by hand, feel for notchiness, drag or runout.', { contact: 5, skillYears: 'years', robotNow: 'no', saturation: 'empty' }),
        leaf('leak-test-assembly', 'Pressure and leak test an assembly', 'Connect, pressurise, hold, watch the gauge, find the leak with soap.', { capital: 'mid', horizon: 'medium' }),
        leaf('recover-noisy-assembly', 'Recover: assembly noisy on first run', 'Localise the noise, strip only as far as needed, correct, re-run.', { fail: true, horizon: 'long', skillYears: 'years' }),
      ]),
      node('dimensional-check', 'Measure against the drawing', 'Measuring the built thing against the drawing.', { precision: 5, prev: 'common' }, [
        leaf('caliper-measure', 'Measure a feature with calipers', 'Seat the jaws square, read, decide inside tolerance.', { prim: ['inspect', 'tool'], repetition: 'high-takt' }),
        leaf('gauge-go-nogo', 'Check with go / no-go gauges', 'Try both gauges with correct feel and record the result.', { contact: 4 }),
        leaf('recover-out-of-spec', 'Recover: feature out of spec after assembly', 'Decide rework, shim or reject, document the disposition.', { fail: true, prim: ['language', 'recover'], horizon: 'medium' }),
      ]),
    ]),
  ],
)
