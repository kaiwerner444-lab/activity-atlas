import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

export const d19: NodeSpec = node(
  'd19',
  'Social and assistive interaction',
  'Physical tasks with another person in the loop: handovers, co-carrying, guiding, teaching and helping.',
  {
    setting: 'household',
    dexterity: 4,
    precision: 3,
    contact: 4,
    horizon: 'short',
    repetition: 'one-shot',
    capital: 'cheap',
    partner: 'none',
    skillYears: 'none',
    suit: 'excellent',
    robotNow: 'partial',
    embodiment: ['ego', 'suit', 'video'],
    saturation: 'empty',
    ours: 'none',
    rights: 'consent-heavy',
    ethics: 'open',
    prev: 'ubiquitous',
    prim: ['bimanual', 'language', 'grasp', 'inspect'],
  },
  [
    node('handover', 'Object handover', 'The smallest unit of physical cooperation.', { horizon: 'short', prev: 'ubiquitous' }, [
      node('give-take', 'Give and take an object', 'Transferring an object between two people.', { contact: 4, dexterity: 4 }, [
        leaf('hand-over-a-tool', 'Hand over a tool safely', 'Present the handle, wait for grasp, release on load transfer.', { robotNow: 'partial', saturation: 'thin' }),
        leaf('receive-unexpected-object', 'Receive an object without warning', 'React to an offered object and take its weight.', { robotNow: 'no', saturation: 'empty' }),
        leaf('hand-over-fragile-item', 'Hand over a fragile or full container', 'Coordinate release with a partner who cannot spill it.', { precision: 4, contact: 5, prim: ['language'] }),
      ]),
      node('assisted-handover', 'Hand over to an impaired partner', 'Where timing cannot be assumed.', { ethics: 'restricted', rights: 'consent-heavy', prev: 'common' }, [
        leaf('give-item-to-seated-person', 'Give an item to a seated person', 'Approach, present at a reachable height, confirm the grasp.', { prim: ['language', 'locomote'] }),
      ]),
    ]),
    node('co-manipulation', 'Co-manipulation', 'Two bodies, one object.', { contact: 5, dexterity: 2, prev: 'common', robotNow: 'no' }, [
      node('co-carry', 'Carry an object with a partner', 'Shared load, shared plan.', { horizon: 'medium' }, [
        leaf('co-carry-furniture', 'Carry furniture with a partner', 'Negotiate direction and pace through doors and stairs by voice and force.', { prim: ['locomote', 'language', 'bimanual'], saturation: 'empty' }),
        leaf('hold-while-partner-works', 'Hold a part while a partner fastens it', 'Maintain position under changing load without being told.', { contact: 5, saturation: 'empty' }),
      ]),
      node('guided-motion', 'Guide someone hands', 'Moving someone else, or being moved.', { contact: 5, ethics: 'restricted' }, [
        leaf('guide-a-hand', 'Guide a learner hand over hand', 'Apply just enough force to steer without overriding.', { prim: ['language', 'bimanual'], skillYears: 'months', saturation: 'empty' }),
        leaf('guide-a-visually-impaired-person', 'Guide a person as a sighted guide', 'Walk connected, narrate hazards, adjust pace.', { prim: ['locomote', 'language'], ethics: 'restricted' }),
      ]),
    ]),
    node('assist-dress-care', 'Assistive daily living', 'Household care between people, outside a clinical setting.', { contact: 5, ethics: 'restricted', rights: 'consent-heavy', prev: 'common', saturation: 'empty' }, [
      node('assist-dressing-home', 'Help someone get dressed', 'Deformable garments on another body.', { dexterity: 5, robotNow: 'no' }, [
        leaf('help-with-a-coat', 'Help someone into a coat', 'Present the sleeve, follow the arm, settle the shoulders.', { prim: ['deform', 'bimanual'] }),
        leaf('fasten-buttons-for-someone', 'Fasten buttons for someone else', 'Fine bimanual work mirrored on another person.', { dexterity: 5, precision: 5 }),
      ]),
      node('assist-mobility-home', 'Steady someone as they walk', 'Steadying, walking, stairs.', { dexterity: 2, contact: 5 }, [
        leaf('steady-someone-on-stairs', 'Steady someone on stairs', 'Continuous force adjustment against another persons balance.', { robotNow: 'no' }),
      ]),
    ]),
    node('teach-demonstrate', 'Teaching and demonstration', 'Talk while doing, which is the multimodal jackpot.', { contact: 3, prim: ['language', 'inspect'], saturation: 'empty', prev: 'common' }, [
      node('demonstrate', 'Demonstrate and narrate a task', 'Doing it slowly and narrating.', { horizon: 'medium', robotNow: 'no' }, [
        leaf('narrate-while-doing', 'Narrate a task while performing it', 'Speak the intent, the cue and the check for each step.', { notes: 'The highest-value cheap capture in the whole atlas: same motion, plus aligned language.' }),
        leaf('correct-a-learner', 'Watch and correct a learner', 'Detect the error, name it, show the fix.', { prim: ['inspect', 'language'], contact: 2 }),
        leaf('answer-mid-task-question', 'Answer a question mid-task', 'Interrupt, explain, resume without losing the thread.', { prim: ['language'], contact: 2 }),
      ]),
    ]),
  ],
)
