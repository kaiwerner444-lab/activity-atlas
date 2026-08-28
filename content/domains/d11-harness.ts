import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// D11 is the deepest branch in the seed on purpose: it is the domain the factory
// thesis is written against. Every C1-C10 style product family lands here as a
// family or procedure, and every procedure carries at least one happy-path leaf
// and one failure / rework leaf.

export const d11: NodeSpec = node(
  'd11',
  'Wire, cable, harness',
  'Building and repairing the nervous system of machines: cut, strip, crimp, load, route, dress, test, rework.',
  {
    setting: 'industrial',
    dexterity: 4,
    precision: 4,
    contact: 4,
    horizon: 'medium',
    repetition: 'batched',
    capital: 'cheap',
    partner: 'none',
    skillYears: 'months',
    suit: 'excellent',
    robotNow: 'no',
    embodiment: ['ego', 'suit', 'video'],
    saturation: 'empty',
    ours: 'none',
    rights: 'easy',
    ethics: 'open',
    prev: 'common',
    prim: ['grasp', 'insert', 'deform', 'tool'],
  },
  [
    node('cut-prep', 'Cut, measure and strip', 'Turning bulk reel into cut lengths with clean conductor exposed.', { dexterity: 4, precision: 4, prim: ['separate', 'tool'] }, [
      node('measure-cut', 'Measure and cut to length', 'Pull from reel against a stop or tape and cut square.', { horizon: 'short', repetition: 'high-takt', robotNow: 'yes', saturation: 'thin', contact: 3 }, [
        leaf('cut-single-core-tape', 'Cut single core to tape measure', 'Pull conductor along a bench tape, hold the mark, cut square with flush cutters.', { prev: 'ubiquitous', obj: ['FLRY-B 0.75', 'H07V-K 1.5', 'bench tape'], tool: ['flush cutters'], prim: ['separate', 'tool'] }),
        leaf('cut-multicore-jacket', 'Cut jacketed multicore', 'Cut a jacketed multicore without nicking inner cores, then square the jacket face.', { contact: 4, precision: 4, obj: ['LiYCY 4x0.34', 'CAT6A'], tool: ['cable shears'] }),
        leaf('cut-shielded-coax', 'Cut shielded coax to dimension', 'Cut coax where braid pushback tolerance is tight.', { precision: 5, dexterity: 5, prev: 'uncommon', obj: ['RG-316', 'RG-174'] }),
        leaf('recover-short-cut', 'Recover: wire cut short', 'Discover a short leg at the board, decide splice versus scrap, replace and re-label.', { fail: true, horizon: 'medium', robotNow: 'no', prev: 'common' }),
      ]),
      node('strip', 'Strip insulation without nicking', 'Remove insulation to a length without nicking strands.', { precision: 5, contact: 4, prim: ['separate', 'tool'] }, [
        leaf('strip-thermal-fine', 'Thermal strip fine-gauge wire', 'Thermal strip 28-32 AWG where a blade would sever strands.', { dexterity: 5, precision: 5, skillYears: 'years', prev: 'uncommon', tool: ['thermal stripper'] }),
        leaf('strip-blade-preset', 'Blade strip to preset stop', 'Insert to the stop on a preset stripper, rotate, pull the slug clear.', { repetition: 'high-takt', robotNow: 'partial', saturation: 'thin', prev: 'ubiquitous', tool: ['preset stripper'] }),
        leaf('strip-jacket-window', 'Window strip a jacket mid-span', 'Ring cut and open a jacket window without cutting the cores under it.', { dexterity: 5, precision: 5, skillYears: 'years', prev: 'uncommon' }),
        leaf('strip-braid-pushback', 'Push back and comb a shield braid', 'Push back braid, comb it flat, fold it over the ferrule ring.', { dexterity: 5, contact: 5, skillYears: 'years', prim: ['deform', 'bimanual'] }),
        leaf('recover-nicked-strand', 'Recover: nicked strands found at inspection', 'Spot the nick under magnification, re-strip, re-measure the remaining length.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
      node('tinning', 'Tin and pre-form a conductor end', 'Solder-tinning and pre-forming conductor ends before termination.', { prev: 'uncommon', contact: 3, skillYears: 'years' }, [
        leaf('tin-stranded-end', 'Tin a stranded end', 'Wet the strands with solder without wicking under the insulation.', { dexterity: 5, tool: ['soldering iron'], obj: ['leaded solder', 'flux'] }),
        leaf('recover-wicked-solder', 'Recover: solder wicked up the strands', 'Cut back the stiffened section, re-strip, re-tin.', { fail: true }),
      ]),
    ]),

    node('terminate', 'Crimp and terminate', 'Making a gas-tight mechanical and electrical joint at the wire end.', { precision: 5, contact: 5, prim: ['insert', 'tool', 'fasten'] }, [
      node('crimp-hand', 'Crimp by hand', 'Hand tool crimping where the operator sets position and orientation.', { dexterity: 5, skillYears: 'months' }, [
        leaf('crimp-ferrule-din', 'Crimp a ferrule and land it', 'Slide a ferrule, crimp with a quad die, land it in a DIN rail terminal, tug test.', { repetition: 'high-takt', prev: 'ubiquitous', obj: ['bootlace ferrule 0.75'], tool: ['quad crimper'] }),
        leaf('crimp-open-barrel', 'Open barrel crimp with insulation grip', 'Set conductor and insulation grips in one press so both wings roll correctly.', { dexterity: 5, precision: 5, skillYears: 'years', obj: ['Molex KK terminal'], tool: ['hand crimper']}),
        leaf('crimp-ring-lug', 'Crimp a ring lug and torque it', 'Crimp a ring lug, place over a stud, torque to spec, apply a witness mark.', { prim: ['fasten', 'tool'], prev: 'common', obj: ['M6 ring lug'], tool: ['torque driver'] }),
        leaf('crimp-coax-hex', 'Hex crimp a coax connector', 'Seat the pin, position the ferrule, hex crimp without deforming the dielectric.', { precision: 5, prev: 'uncommon' }),
        leaf('recover-bad-crimp', 'Recover: crimp fails pull test', 'Pull test fails, cut the terminal off, re-strip, re-crimp, re-test, log the reel.', { fail: true, horizon: 'medium', prim: ['recover', 'inspect'] }),
        leaf('recover-wrong-die', 'Recover: wrong die used on a batch', 'Identify the batch from the crimp height, quarantine it, re-terminate.', { fail: true, horizon: 'long', prim: ['inspect', 'recover'] }),
      ]),
      node('crimp-machine', 'Set up and run a crimp press', 'Loading, adjusting and babysitting a semi-automatic crimp press.', { capital: 'mid', robotNow: 'partial', prev: 'common' }, [
        leaf('load-terminal-reel', 'Load a terminal reel into a press', 'Thread the carrier strip, set the feed pawl, index to first station.', { dexterity: 4, prim: ['insert', 'tool'] }),
        leaf('set-crimp-height', 'Set and verify crimp height', 'Adjust the shut height, crimp samples, micrometer them, iterate to spec.', { precision: 5, skillYears: 'years', prim: ['inspect', 'tool'], tool: ['crimp micrometer'] }),
        leaf('recover-jammed-carrier', 'Recover: carrier strip jam', 'Kill the press, clear the deformed carrier, re-thread, scrap the partials.', { fail: true, prim: ['recover'] }),
      ]),
      node('screw-terminate', 'Land into screw and spring terminals', 'Landing conductors into field wiring devices.', { precision: 3, contact: 4 }, [
        leaf('land-spring-cage', 'Land into a spring cage terminal', 'Depress the lever, insert to the stop, release, tug test.', { repetition: 'high-takt', robotNow: 'partial', prev: 'ubiquitous' }),
        leaf('land-screw-clamp', 'Land into a screw clamp and torque', 'Insert, torque to the printed value, mark it.', { prim: ['fasten', 'tool'] }),
        leaf('recover-wrong-terminal', 'Recover: conductor landed in wrong terminal', 'Trace from the drawing, release the wrong pin, re-land, re-check continuity.', { fail: true, horizon: 'medium', prim: ['inspect', 'recover'] }),
      ]),
    ]),

    node('connector', 'Connector loading and sealing', 'Getting contacts into housings, in the right cavity, sealed and locked.', { dexterity: 5, precision: 5, contact: 5, prim: ['insert', 'grasp'] }, [
      node('load-contacts', 'Load contacts into a housing', 'Cavity-by-cavity insertion against a wiring schedule.', { repetition: 'batched' }, [
        leaf('seat-deutsch-dt', 'Seat contacts in a Deutsch DT housing', 'Insert stamped contacts to the click, fit the orange wedge lock, verify with a pull.', { prev: 'common', obj: ['Deutsch DT04-12P', 'size 16 socket'], tool: ['wedge pick'] }),
        leaf('seat-molex-microfit', 'Seat contacts in a Micro-Fit housing', 'Load fine-pitch contacts where the retention tang is invisible from outside.', { dexterity: 5, precision: 5, prev: 'common' }),
        leaf('seat-mil-38999', 'Load a MIL-DTL-38999 insert', 'Use the insertion tool to seat rear-release contacts to the shoulder.', { skillYears: 'years', prev: 'uncommon', partner: 'site', rights: 'ip-hot', tool: ['insertion tool'] }),
        leaf('fit-seals-blanks', 'Fit wire seals and cavity blanks', 'Slide seals up the wire before crimp, blank every unused cavity.', { prev: 'common' }),
        leaf('recover-backed-out-contact', 'Recover: contact backed out of a cavity', 'Find the loose pin by feel, extract with the correct tool, repair the tang, re-seat.', { fail: true, horizon: 'medium', skillYears: 'years', prim: ['recover', 'inspect'] }),
        leaf('recover-wrong-cavity', 'Recover: contact in the wrong cavity', 'Cross-check the schedule, extract, swap two pins, re-verify continuity.', { fail: true, horizon: 'medium', prim: ['recover'] }),
      ]),
      node('backshell', 'Close out a backshell and strain relief', 'Closing out the connector rear with clamp, boot or overmould.', { contact: 4 }, [
        leaf('fit-backshell-clamp', 'Fit a backshell and saddle clamp', 'Dress the bundle into the backshell, set the saddle so strain never reaches the pins.', { prim: ['deform', 'fasten'], skillYears: 'years' }),
        leaf('shrink-boot', 'Position and shrink a moulded boot', 'Place an adhesive-lined boot and shrink it evenly without scorching.', { prim: ['tool', 'deform'], tool: ['heat gun'] }),
        leaf('recover-scorched-boot', 'Recover: scorched or shifted boot', 'Cut the boot off without damaging the jacket, clean the adhesive, re-boot.', { fail: true }),
      ]),
    ]),

    node('formboard', 'Formboard assembly', 'Laying a full harness on a board: route, branch, tie, dress, release.', { horizon: 'long', dexterity: 4, contact: 4, skillYears: 'years', robotNow: 'no', prim: ['deform', 'bimanual', 'locomote'] }, [
      node('layout-route', 'Route branches on the board', 'Walking a harness around pegs and forks in build order.', { horizon: 'long', prev: 'common' }, [
        leaf('route-main-trunk', 'Route the main trunk', 'Lay the trunk between pegs keeping lay length even and no crossovers.', { prim: ['deform', 'locomote', 'bimanual'] }),
        leaf('route-breakout', 'Route a breakout to a fork', 'Split a branch at the marked breakout and dress it to its fork.', { dexterity: 4 }),
        leaf('follow-build-sheet', 'Follow the build sheet while routing', 'Read the sheet, speak the wire number, place it, tick it off.', { prim: ['language', 'inspect'], contact: 2 }),
        leaf('recover-crossed-branch', 'Recover: branch routed on the wrong side of a peg', 'Notice at tie-off, release ties back to the fault, re-route, re-tie.', { fail: true, horizon: 'long' }),
      ]),
      node('tie-dress', 'Tie and dress the bundle', 'Making a loose set of wires into one body with a defined shape.', { dexterity: 5, contact: 5, prev: 'common' }, [
        leaf('cable-tie-pitch', 'Cable tie at pitch and flush cut', 'Place ties at spec pitch, tension with a gun, cut flush so no edge remains.', { repetition: 'high-takt', tool: ['tie gun'] }),
        leaf('lace-spot-tie', 'Lacing cord spot tie', 'Tie a spot lacing knot one-handed while holding bundle tension.', { dexterity: 5, skillYears: 'years', prim: ['fasten', 'bimanual'], prev: 'uncommon' }),
        leaf('lace-running-lock', 'Running lock lacing along a trunk', 'Run a continuous lock stitch down a trunk at even pitch.', { dexterity: 5, skillYears: 'years', prev: 'rare' }),
        leaf('comb-out-bundle', 'Comb out a bundle before tying', 'Straighten crossovers by hand so the bundle has a clean lay.', { prim: ['deform', 'bimanual'] }),
        leaf('recover-overtight-tie', 'Recover: over-tensioned tie deforming insulation', 'Cut the tie, inspect the insulation, replace affected wire if witness marked.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
      node('release-board', 'Release and transfer the harness', 'Getting a finished harness off the board without changing its shape.', { horizon: 'medium', prev: 'common' }, [
        leaf('release-from-pegs', 'Release the harness from the pegs', 'Free branches in order so the harness keeps its form as it comes off.', { prim: ['grasp', 'locomote', 'bimanual'] }),
        leaf('transfer-to-cart', 'Transfer and hang on a cart', 'Carry a large harness two-handed and hang it without dragging connectors.', { dexterity: 2, prim: ['locomote', 'bimanual'] }),
        leaf('recover-dropped-connector', 'Recover: connector dropped on the floor during transfer', 'Inspect the shell for damage, re-clean, decide re-work versus pass.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
    ]),

    node('protect', 'Protection and over-braid', 'Everything that goes over the bundle: loom, tape, braid, shrink.', { dexterity: 4, contact: 5, prim: ['deform', 'tool'] }, [
      node('loom-conduit', 'Sleeve the bundle into loom', 'Sleeving a bundle into corrugated or split convoluted tube.', { prev: 'common' }, [
        leaf('dress-corrugated-loom', 'Dress bundle into corrugated split loom', 'Open the split, feed the bundle, close it, tape the ends and breakouts.', { dexterity: 4, prim: ['deform', 'bimanual'] }),
        leaf('fit-loom-clip', 'Fit loom clips and edge clips', 'Clip the loom to a panel edge at spec spacing.', { prim: ['fasten', 'insert'] }),
        leaf('recover-pinched-wire', 'Recover: wire pinched in the loom split', 'Find the pinch by continuity, open the loom, re-dress, re-test.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
      node('tape-wrap', 'Tape wrap a bundle', 'Half-lap and spot taping for abrasion and bundling.', { dexterity: 5, prev: 'common' }, [
        leaf('half-lap-tape', 'Half-lap tape a trunk', 'Wrap at constant tension and half overlap so the finish is smooth and even.', { skillYears: 'months', repetition: 'batched', obj: ['PVC harness tape', 'fleece tape'] }),
        leaf('tape-breakout-y', 'Tape a Y breakout', 'Build a tidy taped crotch where a branch leaves the trunk.', { dexterity: 5, skillYears: 'years' }),
        leaf('recover-loose-wrap', 'Recover: wrap unravelling after handling', 'Strip the failed section, clean adhesive residue, re-wrap.', { fail: true }),
      ]),
      node('braid-shrink', 'Braid and heat shrink', 'Expandable braid, shrink tubing and moulded transitions.', { prev: 'uncommon' }, [
        leaf('slide-expandable-braid', 'Slide expandable braid over a bundle', 'Bunch the braid, work it over connectors, distribute the lay evenly.', { dexterity: 5, prim: ['deform', 'bimanual'] }),
        leaf('shrink-transition', 'Shrink a moulded transition', 'Position a moulded shape over a breakout and shrink it symmetrically.', { tool: ['heat gun'] }),
        leaf('recover-split-braid', 'Recover: braid split at a connector shoulder', 'Trim back, re-terminate the braid end, re-shrink.', { fail: true }),
      ]),
    ]),

    node('test', 'Test and verification', 'Proving the harness before it leaves the cell.', { contact: 2, precision: 3, prim: ['inspect', 'insert'], prev: 'common' }, [
      node('continuity', 'Run a continuity test', 'Mating a harness to a test adapter and reading the result.', { robotNow: 'partial', capital: 'mid' }, [
        leaf('mate-test-adapter', 'Mate a harness to a test adapter', 'Align keyed shells, seat both halves fully, latch, start the sequence.', { prim: ['insert', 'bimanual'] }),
        leaf('read-fault-map', 'Read a fault map and locate the wire', 'Convert a fault list into a physical wire on the board.', { prim: ['inspect', 'language'], horizon: 'medium' }),
        leaf('recover-intermittent-fault', 'Recover: intermittent open under flex', 'Flex sections while watching the tester, isolate the failing joint, replace it.', { fail: true, horizon: 'long', skillYears: 'years', saturation: 'empty' }),
      ]),
      node('hipot-pull', 'Hipot and pull test', 'Destructive and semi-destructive verification.', { capital: 'mid', prev: 'uncommon' }, [
        leaf('hipot-setup', 'Set up and run a hipot test', 'Connect the leads, clear the cell, run the ramp, record the result.', { prim: ['inspect', 'tool'], partner: 'site' }),
        leaf('pull-test-sample', 'Pull test a sample crimp', 'Clamp the sample, pull to the spec force, record the break value.', { tool: ['pull tester'] }),
        leaf('recover-hipot-failure', 'Recover: hipot failure traced to a nicked jacket', 'Locate the flashover point, repair or replace the leg, retest.', { fail: true, horizon: 'long' }),
      ]),
      node('visual-inspect', 'Inspect crimps and dimensions', 'The human sensor pass before packing.', { contact: 1, prim: ['inspect'] }, [
        leaf('inspect-crimp-visual', 'Visually inspect crimps against a standard', 'Compare bell mouth, brush and insulation grip against a wall chart.', { prim: ['inspect'], skillYears: 'months' }),
        leaf('measure-branch-length', 'Measure branch lengths against the drawing', 'Tape each breakout to its fork and check tolerance.', { prim: ['inspect', 'tool'] }),
        leaf('recover-out-of-tolerance', 'Recover: branch out of tolerance', 'Decide re-dress versus rebuild, document the deviation.', { fail: true, prim: ['language', 'recover'] }),
      ]),
    ]),

    node('rework', 'Rework, ECO and field repair', 'Changing a harness that already exists, which is where the human advantage actually lives.', { horizon: 'long', dexterity: 5, contact: 5, skillYears: 'years', robotNow: 'no', saturation: 'empty', prim: ['recover', 'inspect', 'deform'], prev: 'common' }, [
      node('eco-change', 'Change a harness that is already built', 'Adding, removing or re-routing wires after the fact.', {}, [
        leaf('add-wire-to-bundle', 'Add a wire into a finished bundle', 'Open the minimum dressing, snake a new wire the full run, re-dress, re-test.', { horizon: 'long' }),
        leaf('remove-obsolete-leg', 'Remove an obsolete leg', 'Trace, cut back, cap, re-dress so no stub remains.', {}),
        leaf('re-pin-connector', 'Re-pin a connector to a new schedule', 'Extract and re-seat several contacts against a revised schedule.', { dexterity: 5 }),
      ]),
      node('field-repair', 'Repair a harness in the machine', 'Repairing a harness in the machine, not on a bench.', { partner: 'site', dexterity: 5, prev: 'common' }, [
        leaf('in-situ-splice', 'In-situ splice under a dash or panel', 'Work upside down in a confined space with one hand and a torch.', { dexterity: 5, contact: 5, skillYears: 'years', suit: 'ok' }),
        leaf('replace-damaged-section', 'Replace a chafed section in place', 'Cut out the damage, splice both ends, re-protect, re-clip.', { horizon: 'long' }),
        leaf('diagnose-chafe-point', 'Diagnose a chafe point from a symptom', 'Reason from an intermittent symptom to a physical rub point.', { prim: ['inspect', 'language'], contact: 2, robotNow: 'no' }),
      ]),
      node('injected-fault', 'Inject a fault and recover it', 'Deliberately created faults, for data rather than for production.', { repetition: 'batched', saturation: 'empty', notes: 'This is the cheapest way to buy recovery data: build it wrong on purpose, then film the fix.' }, [
        leaf('inject-wrong-pin', 'Inject a wrong-pin fault and recover it', 'Deliberately mis-pin a connector, run the test, then perform the full recovery.', { fail: true, horizon: 'medium' }),
        leaf('inject-missing-seal', 'Inject a missing seal and recover it', 'Omit a wire seal, catch it at inspection, strip back and rebuild the termination.', { fail: true }),
        leaf('inject-swapped-branch', 'Inject a swapped branch and recover it', 'Route two branches to the wrong forks, detect at test, re-route.', { fail: true, horizon: 'long' }),
      ]),
    ]),

    node('pack', 'Label, coil and pack', 'The unglamorous end of the cell that nobody films.', { dexterity: 3, contact: 3, precision: 2, skillYears: 'none', robotNow: 'partial', prev: 'common' }, [
      node('labelling', 'Label wires and harnesses', 'Putting identity on wire and harness.', { repetition: 'high-takt' }, [
        leaf('apply-wire-marker', 'Apply a printed wire marker', 'Peel, position at the spec distance from the terminal, wrap the flag.', { dexterity: 5, precision: 4, prev: 'ubiquitous' }),
        leaf('apply-harness-tag', 'Attach a harness identification tag', 'Tie or shrink a tag at the trunk so it is readable in the machine.', {}),
        leaf('recover-wrong-label', 'Recover: wrong label printed on a batch', 'Identify the batch, remove residue cleanly, relabel.', { fail: true, horizon: 'medium' }),
      ]),
      node('coil-pack', 'Coil, bag and box', 'Coiling to a spec diameter and packing without kinking.', {}, [
        leaf('coil-to-spec', 'Coil a harness to spec diameter', 'Coil with even lay, tie in three places, keep connectors outside the coil.', { prim: ['deform', 'bimanual'] }),
        leaf('bag-and-box', 'Bag, box and label the carton', 'Bag with desiccant if required, box, seal, apply the carton label.', { prim: ['grasp', 'fasten'] }),
        leaf('recover-kinked-coil', 'Recover: kinked coil found at packing', 'Uncoil, straighten by hand, inspect for jacket damage, re-coil.', { fail: true }),
      ]),
    ]),
  ],
)
