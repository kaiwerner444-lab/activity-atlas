// Capture protocols are not taxonomy and the atlas should not pretend otherwise.
//
// An atlas leaf is a thing somebody does for a reason, with a condition that
// says it is finished. A protocol is the ordered script for a recording session:
// calibration, blocks, repetitions, restart rules, deliberate contrast trials and
// the order in which the suit comes off. The two are related and they are not
// the same document, and collapsing one into the other would make the coverage
// map report a hundred activities where there is really one session.

export interface ProtocolStep {
  /** The instruction as given to the person being recorded. */
  text: string
  /** What a good repetition looks like. */
  cue?: string
  /** A condition that invalidates the trial and requires it to be repeated. */
  restart?: string
  /** Marks a trial that is deliberately not the working pattern. */
  contrast?: boolean
  /** Atlas nodes this step exercises, where a real one exists. */
  exercises?: string[]
}

export interface ProtocolBlock {
  id: string
  title: string
  purpose: string
  steps: ProtocolStep[]
}

export interface Protocol {
  id: string
  name: string
  summary: string
  /** Why this session exists, in the collection lead's terms. */
  rationale: string
  duration: string
  equipment: string[]
  /** Honest note on what this session is and is not worth. */
  caveat?: string
  blocks: ProtocolBlock[]
}

export function stepCount(protocol: Protocol): number {
  return protocol.blocks.reduce((n, b) => n + b.steps.length, 0)
}
