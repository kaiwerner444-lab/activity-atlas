import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// D20 is a cross-cut: `fail: true` leaves exist in every other domain and are
// gathered here as a facet-like view. It stays a root so recovery is never
// forgotten in a planning conversation.

export const d20: NodeSpec = node(
  'd20',
  'Failure, diagnosis and recovery',
  'The cross-cutting domain: things going wrong and a human putting them right. Present in every other branch as a tagged leaf, and here as a root so it is never forgotten.',
  {
    setting: 'industrial',
    dexterity: 4,
    precision: 3,
    contact: 4,
    horizon: 'medium',
    repetition: 'one-shot',
    capital: 'cheap',
    partner: 'none',
    skillYears: 'years',
    suit: 'excellent',
    robotNow: 'no',
    embodiment: ['ego', 'suit', 'video'],
    saturation: 'empty',
    ours: 'none',
    rights: 'easy',
    ethics: 'open',
    prev: 'ubiquitous',
    prim: ['recover', 'inspect', 'language'],
  },
  [
    node('jams-blockages', 'Jams and blockages', 'Something stopped moving that should be moving.', { contact: 5, prev: 'common' }, [
      node('clear-jam', 'Stop, clear a jam and restart', 'Stop, make safe, extract, restart.', { horizon: 'medium' }, [
        leaf('safe-stop-and-isolate', 'Safe stop and isolate before clearing', 'The discipline step that precedes every real recovery.', { fail: true, prim: ['language', 'inspect'] }),
        leaf('extract-jammed-material', 'Extract jammed material', 'Reach into a space designed to be closed and pull without damage.', { fail: true, dexterity: 5, contact: 5 }),
        leaf('restart-and-verify', 'Restart and verify normal operation', 'Bring it back up and watch for the fault returning.', { fail: true, prim: ['inspect'] }),
      ]),
    ]),
    node('dropped-lost', 'Dropped, lost and misplaced', 'Something is not where it should be.', { prev: 'ubiquitous' }, [
      node('retrieve', 'Find and retrieve what was dropped', 'Finding and recovering an object.', { dexterity: 5 }, [
        leaf('retrieve-from-confined-space', 'Retrieve a dropped part from a confined space', 'Locate by feel or mirror and extract with an improvised tool.', { fail: true, contact: 5, robotNow: 'no' }),
        leaf('search-for-misplaced-tool', 'Search for a misplaced tool', 'Systematic search of a workspace.', { fail: true, prim: ['inspect', 'locomote'], contact: 2 }),
      ]),
    ]),
    node('wrong-part', 'Wrong part, wrong step, wrong revision', 'The build is not what the paperwork says.', { horizon: 'long', prev: 'common' }, [
      node('detect-mismatch', 'Spot a part that does not match', 'Noticing before it ships.', { prim: ['inspect', 'language'], contact: 2 }, [
        leaf('spot-wrong-revision', 'Spot a wrong revision at assembly', 'Compare part to drawing and stop the line.', { fail: true }),
        leaf('trace-affected-batch', 'Trace the affected batch', 'Work backwards to find everything else built wrong.', { fail: true, horizon: 'long', prim: ['language'] }),
      ]),
      node('undo-redo', 'Take apart and rebuild', 'Disassembly that was never planned.', { contact: 5, dexterity: 5 }, [
        leaf('disassemble-past-a-step', 'Disassemble back past a completed step', 'Take apart work that was made to stay together.', { fail: true, robotNow: 'no' }),
        leaf('rebuild-with-new-parts', 'Rebuild with replacement parts', 'Redo the sequence with the correct components.', { fail: true, horizon: 'long' }),
      ]),
    ]),
    node('tool-failure', 'Tool and equipment failure', 'The thing you were working with broke.', { prev: 'common', contact: 4 }, [
      node('tool-swap', 'Diagnose and swap a failing tool', 'Recognise the tool is at fault, not the work.', {}, [
        leaf('recognise-blunt-worn-tool', 'Recognise a blunt or worn tool', 'Attribute a bad result to the tool rather than technique.', { fail: true, prim: ['inspect'], skillYears: 'years' }),
        leaf('improvise-a-tool', 'Improvise when the right tool is absent', 'Solve with what is on the bench without making it unsafe.', { fail: true, robotNow: 'no', skillYears: 'years' }),
      ]),
    ]),
    node('spills-contamination', 'Spills and contamination', 'Something got out that should have stayed in.', { contact: 4, prev: 'common' }, [
      node('spill-response', 'Contain, clean and report a spill', 'Contain, clean, report.', { horizon: 'medium', prim: ['transfer', 'language'] }, [
        leaf('contain-a-spill', 'Contain a spill', 'Stop the spread before cleaning anything.', { fail: true }),
        leaf('decontaminate-and-report', 'Decontaminate and report', 'Clean to a standard and document what happened.', { fail: true, prim: ['language'], partner: 'site' }),
      ]),
    ]),
    node('safety-events', 'Safety stops and near misses', 'The highest-consequence, lowest-data category there is.', { ethics: 'restricted', partner: 'site', prev: 'common' }, [
      node('emergency-response', 'Stop everything and call for help', 'What a person does in the first ten seconds.', { horizon: 'short', robotNow: 'no' }, [
        leaf('hit-emergency-stop', 'Recognise and hit an emergency stop', 'Decide to stop everything, quickly and correctly.', { fail: true, prim: ['inspect', 'locomote'] }),
        leaf('call-for-help-clearly', 'Call for help clearly', 'Communicate what happened and what is needed.', { fail: true, prim: ['language'], contact: 1 }),
      ]),
    ]),
  ],
)
