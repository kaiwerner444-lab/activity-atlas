import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

export const d15: NodeSpec = node(
  'd15',
  'Labs and inspection',
  'Bench science and metrology: liquid handling, sample prep, microscopy, measurement and calibration.',
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
    node('liquid-handling', 'Handling small liquid volumes', 'Small volumes moved accurately.', { precision: 5, dexterity: 5, prev: 'ubiquitous' }, [
      node('pipetting', 'Pipette small volumes', 'The signature lab motion.', { repetition: 'high-takt', robotNow: 'yes', saturation: 'thin' }, [
        leaf('pipette-to-plate', 'Pipette a series into a plate', 'Aspirate, dispense, tip change, in a sustained rhythm.', { precision: 5, suit: 'poor' }),
        leaf('pipette-viscous-liquid', 'Pipette a viscous or foaming liquid', 'Adjust technique for a liquid that does not behave.', { skillYears: 'months', robotNow: 'partial', saturation: 'empty' }),
        leaf('recover-cross-contamination', 'Recover: suspected cross-contamination', 'Stop, identify affected wells, discard and repeat the run.', { fail: true, horizon: 'long' }),
      ]),
      node('sample-prep', 'Weigh, filter and prepare a sample', 'Getting a sample into a measurable state.', { horizon: 'long' }, [
        leaf('weigh-out-reagent', 'Weigh out a reagent to tolerance', 'Tare, add slowly, approach the target without overshoot.', { precision: 5, prim: ['transfer', 'inspect'] }),
        leaf('filter-and-transfer', 'Filter and transfer a sample', 'Multi-step handling without loss or contamination.', { dexterity: 5 }),
      ]),
    ]),
    node('instruments', 'Instruments and microscopy', 'Operating the equipment.', { contact: 2, dexterity: 4, prev: 'common' }, [
      node('microscopy', 'Focus and count under a microscope', 'Fine adjustment against a visual target.', { precision: 5, suit: 'wrong-tool' }, [
        leaf('mount-and-focus-slide', 'Mount a slide and focus', 'Place, coarse focus, fine focus, adjust illumination.', { prim: ['inspect', 'tool'] }),
        leaf('locate-feature-and-count', 'Locate features and count', 'Systematic scan and a judgement call per field.', { prim: ['inspect'], horizon: 'long', robotNow: 'partial' }),
      ]),
      node('instrument-ops', 'Load, run and calibrate an instrument', 'Loading, running and interpreting.', { capital: 'capex' }, [
        leaf('load-autosampler', 'Load an autosampler tray', 'Place vials in a mapped order and confirm the sequence.', { precision: 4, robotNow: 'yes', saturation: 'thin' }),
        leaf('calibrate-instrument', 'Calibrate an instrument against standards', 'Run standards, check the curve, accept or repeat.', { prim: ['inspect', 'language'], skillYears: 'months' }),
        leaf('recover-drifting-baseline', 'Recover: baseline drift mid-run', 'Diagnose between column, sample and instrument, act.', { fail: true, horizon: 'long', robotNow: 'no', saturation: 'empty' }),
      ]),
    ]),
    node('metrology', 'Dimensional metrology', 'Measuring manufactured parts.', { setting: 'industrial', precision: 5, contact: 4, prev: 'common' }, [
      node('hand-metrology', 'Measure with hand instruments', 'Micrometers, calipers, gauges, height stands.', { dexterity: 5, skillYears: 'months' }, [
        leaf('micrometer-measure', 'Measure with a micrometer', 'Ratchet to consistent feel and read to the graduation.', { contact: 5, saturation: 'empty' }),
        leaf('set-up-height-gauge', 'Set up and use a height gauge', 'Datum, zero and measure a stack of features.', { horizon: 'medium' }),
      ]),
      node('cmm', 'Fixture and probe on a CMM', 'Fixturing and probing.', { capital: 'capex', prev: 'uncommon' }, [
        leaf('fixture-part-for-cmm', 'Fixture a part for CMM inspection', 'Constrain a part repeatably without distorting it.', { dexterity: 4, precision: 5, skillYears: 'years' }),
        leaf('probe-datum-alignment', 'Probe a datum alignment', 'Touch off datums and confirm the coordinate system.', { prim: ['inspect', 'tool'], robotNow: 'yes' }),
      ]),
    ]),
    node('visual-inspection', 'Visual and NDT inspection', 'Human sensing as the instrument.', { contact: 2, dexterity: 3, prim: ['inspect'], skillYears: 'years', prev: 'common', saturation: 'empty' }, [
      node('surface-inspection', 'Judge a surface defect by eye', 'Deciding acceptable from not.', { repetition: 'high-takt', robotNow: 'partial' }, [
        leaf('inspect-under-raking-light', 'Inspect a surface under raking light', 'Move the part and the light to reveal defects.', { prim: ['inspect', 'grasp'] }),
        leaf('classify-borderline-defect', 'Classify a borderline defect', 'Apply a boundary consistently across a shift.', { prim: ['inspect', 'language'], robotNow: 'no' }),
      ]),
      node('ndt', 'Scan with NDT methods', 'Ultrasonic, dye penetrant, magnetic particle.', { capital: 'capex', skillYears: 'years', partner: 'licensed', prev: 'uncommon' }, [
        leaf('couple-and-scan-ut', 'Couple and scan with an ultrasonic probe', 'Maintain couplant and contact angle while reading the trace.', { contact: 5, prim: ['tool', 'inspect'] }),
        leaf('dye-penetrant-sequence', 'Run a dye penetrant sequence', 'Clean, apply, dwell, remove, develop, interpret.', { horizon: 'long' }),
      ]),
    ]),
  ],
)
