import type { CoverageEvent } from '@/lib/types'

// Seed coverage. Public rows are editorial estimates of where a dataset actually
// lands in this taxonomy, not counts pulled from the papers. They exist so the
// bivariate colouring and the timeline have something honest-shaped to show, and
// they are the first thing that should be replaced by a real dataset registry.

let seq = 0
const ev = (
  nodeId: string,
  collectorId: string,
  datasetName: string,
  hoursUsable: number,
  date: string,
  source: CoverageEvent['source'],
  modalities: CoverageEvent['modalities'],
  rights: CoverageEvent['rights'] = 'clean',
  quality: CoverageEvent['quality'] = 'curated',
): CoverageEvent => ({
  id: `ce-${++seq}`,
  nodeId,
  collectorId,
  datasetName,
  hoursUsable,
  modalities,
  date,
  rights,
  quality,
  source,
})

export const COVERAGE_EVENTS: CoverageEvent[] = [
  // --- public: the saturated middle of the map -----------------------------
  ev('d01.prep.knife-work', 'epic', 'EPIC-KITCHENS-100', 1400, '2026-01-01', 'public', ['ego', 'video', 'language']),
  ev('d01.prep.knife-work.julienne-onion', 'epic', 'EPIC-KITCHENS-100', 210, '2026-01-01', 'public', ['ego', 'video']),
  ev('d01.cooking.pan-work', 'epic', 'EPIC-KITCHENS-100', 980, '2026-01-01', 'public', ['ego', 'video', 'language']),
  ev('d01.cleanup.hand-wash', 'epic', 'EPIC-KITCHENS-100', 320, '2026-01-01', 'public', ['ego', 'video']),
  ev('d01.prep', 'ego4d', 'Ego4D', 2200, '2026-01-01', 'public', ['ego', 'video', 'language']),
  ev('d02.tidy', 'ego4d', 'Ego4D', 1600, '2026-01-01', 'public', ['ego', 'video']),
  ev('d02.laundry.folding.fold-t-shirt', 'oxe', 'Open X-Embodiment', 140, '2026-01-01', 'public', ['video', 'kinematics']),
  ev('d18.instruments', 'egoexo4d', 'Ego-Exo4D', 260, '2026-02-01', 'public', ['ego', 'video', 'language']),
  ev('d18.board-cycle.bike-skills.fix-a-puncture', 'egoexo4d', 'Ego-Exo4D', 90, '2026-02-01', 'public', ['ego', 'video', 'language']),
  ev('d18.climbing.climb-movement', 'egoexo4d', 'Ego-Exo4D', 120, '2026-02-01', 'public', ['ego', 'video']),
  ev('d01.prep.knife-work', 'egoexo4d', 'Ego-Exo4D', 180, '2026-02-01', 'public', ['ego', 'video', 'language']),
  ev('d05.picking.each-pick.pick-from-tote', 'oxe', 'Open X-Embodiment', 900, '2026-01-01', 'public', ['video', 'kinematics']),
  ev('d05.picking.each-pick', 'droid', 'DROID', 420, '2026-01-01', 'public', ['video', 'kinematics']),
  ev('d10.subassembly.kitting.pick-to-kit-tray', 'oxe', 'Open X-Embodiment', 260, '2026-01-01', 'public', ['video', 'kinematics']),
  ev('d05.shopfloor.replenish', 'agibot', 'AgiBot World', 310, '2026-03-01', 'public', ['video', 'kinematics']),
  ev('d02.laundry.washing', 'agibot', 'AgiBot World', 180, '2026-03-01', 'public', ['video', 'kinematics']),
  ev('d16.floor-care.machine-floor', 'agibot', 'AgiBot World', 95, '2026-03-01', 'public', ['video', 'kinematics']),

  // --- ours: small, deliberate, industrial ---------------------------------
  ev('d11.cut-prep.strip.strip-blade-preset', 'us', 'Cell A pilot', 26, '2026-02-14', 'us', ['ego', 'kinematics', 'video']),
  ev('d11.terminate.crimp-hand.crimp-ferrule-din', 'us', 'Cell A pilot', 41, '2026-02-14', 'us', ['ego', 'kinematics', 'force', 'video']),
  ev('d11.terminate.crimp-hand.crimp-ferrule-din', 'us', 'Cell A production', 118, '2026-05-20', 'us', ['ego', 'kinematics', 'force', 'video']),
  ev('d11.connector.load-contacts.seat-deutsch-dt', 'us', 'Cell A pilot', 33, '2026-04-02', 'us', ['ego', 'kinematics', 'force', 'tactile', 'video']),
  ev('d11.connector.load-contacts.seat-deutsch-dt', 'us', 'Cell A production', 87, '2026-07-08', 'us', ['ego', 'kinematics', 'force', 'tactile', 'video']),
  ev('d11.formboard.tie-dress.cable-tie-pitch', 'us', 'Formboard batch 1', 62, '2026-05-20', 'us', ['ego', 'kinematics', 'video']),
  ev('d11.formboard.layout-route.route-main-trunk', 'us', 'Formboard batch 1', 44, '2026-05-20', 'us', ['ego', 'kinematics', 'video']),
  ev('d11.formboard.layout-route.route-main-trunk', 'us', 'Formboard batch 2', 51, '2026-07-30', 'us', ['ego', 'kinematics', 'video', 'language']),
  ev('d11.rework.injected-fault.inject-wrong-pin', 'us', 'Fault injection week 1', 19, '2026-07-08', 'us', ['ego', 'kinematics', 'force', 'video', 'language']),
  ev('d11.rework.injected-fault.inject-missing-seal', 'us', 'Fault injection week 1', 11, '2026-07-08', 'us', ['ego', 'kinematics', 'force', 'video', 'language']),
  ev('d11.test.continuity.mate-test-adapter', 'us', 'Cell A production', 24, '2026-07-30', 'us', ['ego', 'video']),
  ev('d10.fastening.start-thread.finger-start-bolt', 'us', 'Bench pilot', 37, '2026-04-02', 'us', ['ego', 'kinematics', 'force', 'tactile', 'video']),
  ev('d10.fastening.torque.torque-to-spec', 'us', 'Bench pilot', 22, '2026-04-02', 'us', ['ego', 'kinematics', 'force', 'video']),
  ev('d09.panel-build.panel-terminations.ferrule-and-land', 'us', 'Panel shop pilot', 29, '2026-08-12', 'us', ['ego', 'kinematics', 'force', 'video']),
  ev('d19.teach-demonstrate.demonstrate.narrate-while-doing', 'us', 'Narration pass', 14, '2026-08-12', 'us', ['ego', 'video', 'language']),

  // --- partner: one plant, one product family, IP hot -----------------------
  ev('d11.formboard.layout-route', 'partner-loom', 'OEM loom line A', 76, '2026-06-15', 'partner', ['ego', 'video'], 'restricted', 'raw'),
  ev('d11.protect.loom-conduit.dress-corrugated-loom', 'partner-loom', 'OEM loom line A', 48, '2026-06-15', 'partner', ['ego', 'video'], 'restricted', 'raw'),
  ev('d11.pack.labelling.apply-wire-marker', 'partner-loom', 'OEM loom line A', 21, '2026-06-15', 'partner', ['ego', 'video'], 'restricted', 'raw'),
]
