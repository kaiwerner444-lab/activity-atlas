import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

export const d16: NodeSpec = node(
  'd16',
  'Cleaning and facilities',
  'Commercial cleaning and building services: floors, surfaces, glass, waste and the machines that help.',
  {
    setting: 'commercial',
    dexterity: 3,
    precision: 2,
    contact: 4,
    horizon: 'long',
    repetition: 'high-takt',
    capital: 'cheap',
    partner: 'site',
    skillYears: 'none',
    suit: 'excellent',
    robotNow: 'partial',
    embodiment: ['ego', 'suit', 'video'],
    saturation: 'thin',
    ours: 'none',
    rights: 'easy',
    ethics: 'open',
    prev: 'ubiquitous',
    prim: ['tool', 'locomote', 'transfer'],
  },
  [
    node('floor-care', 'Floor cleaning', 'The largest single area of cleaning labour.', { prev: 'ubiquitous' }, [
      node('manual-floor', 'Mop and spot clean a floor', 'Mop, sweep, spot clean.', { contact: 4 }, [
        leaf('wet-mop-figure-eight', 'Wet mop in a figure of eight', 'Cover an area evenly without leaving streaks or missing edges.', { prim: ['tool', 'locomote'], saturation: 'thin' }),
        leaf('spot-clean-spill', 'Spot clean a spill', 'Assess, contain, clean, sign the area.', { fail: true, prim: ['inspect', 'transfer'] }),
        leaf('mop-around-obstacles', 'Mop around furniture and obstacles', 'Move, clean under, replace.', { robotNow: 'no', saturation: 'empty' }),
      ]),
      node('machine-floor', 'Drive a scrubber drier', 'Scrubbers and burnishers.', { capital: 'mid', dexterity: 2, robotNow: 'yes', saturation: 'thin' }, [
        leaf('operate-scrubber-drier', 'Operate a scrubber drier', 'Drive overlapping passes, manage the edges by hand.', { prim: ['locomote', 'tool'] }),
        leaf('service-scrubber-tanks', 'Empty and service scrubber tanks', 'Drain, rinse, clean the squeegee and filters.', { contact: 4, prim: ['transfer'] }),
      ]),
    ]),
    node('surfaces', 'Surfaces and washrooms', 'Detail work with chemicals.', { dexterity: 4, contact: 4, prev: 'ubiquitous' }, [
      node('washroom', 'Clean and restock a washroom', 'High-standard detail cleaning in tight spaces.', { saturation: 'empty' }, [
        leaf('clean-and-restock-washroom', 'Clean and restock a washroom', 'Fixed sequence, chemical dwell times, restocking, sign off.', { horizon: 'long', prim: ['transfer', 'inspect'] }),
        leaf('descale-a-fitting', 'Descale a fitting', 'Apply, dwell, agitate, rinse, verify.', { contact: 5 }),
      ]),
      node('desk-surfaces', 'Clean around other people belongings', 'Cleaning around other people property.', { contact: 3 }, [
        leaf('clean-around-personal-items', 'Clean a desk around personal items', 'Decide what may be moved and what may not.', { prim: ['inspect', 'grasp'], robotNow: 'no', saturation: 'empty' }),
      ]),
    ]),
    node('high-work', 'High level and glass work', 'Above head height and on the outside.', { dexterity: 3, contact: 4, prev: 'common' }, [
      node('high-dusting', 'Dust above head height', 'Reach poles and ladders.', { saturation: 'empty' }, [
        leaf('pole-dust-high-surface', 'High dust with a pole tool', 'Control a long compliant tool at the far end.', { prim: ['tool'], skillYears: 'months' }),
      ]),
      node('glass', 'Squeegee glass', 'Squeegee technique.', { dexterity: 5, skillYears: 'months' }, [
        leaf('squeegee-a-window', 'Squeegee a window', 'Continuous overlapping strokes with a clean turn at each end.', { prim: ['tool'], saturation: 'thin' }),
        leaf('clean-frame-and-detail', 'Detail a frame and sill', 'Finish the edges the squeegee cannot reach.', { dexterity: 5 }),
      ]),
    ]),
    node('waste', 'Waste and consumables', 'Bins, segregation and replenishment.', { dexterity: 3, prev: 'ubiquitous', saturation: 'thin' }, [
      node('bin-rounds', 'Empty and reline bins', 'Emptying and relining at rate.', { repetition: 'high-takt' }, [
        leaf('empty-and-reline-bin', 'Empty and reline a bin', 'Lift the liner, tie, replace and open a new one.', { prim: ['deform', 'grasp'], robotNow: 'partial' }),
        leaf('segregate-mixed-waste', 'Segregate mixed waste', 'Classify items into streams quickly.', { prim: ['inspect'], robotNow: 'partial', saturation: 'thin' }),
      ]),
    ]),
  ],
)
