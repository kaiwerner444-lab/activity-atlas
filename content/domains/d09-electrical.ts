import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

export const d09: NodeSpec = node(
  'd09',
  'Electrical and controls',
  'Panels, containment, devices and commissioning: the part of a building or machine that only works if a licensed human touched it.',
  {
    setting: 'industrial',
    dexterity: 4,
    precision: 3,
    contact: 4,
    horizon: 'medium',
    repetition: 'batched',
    capital: 'cheap',
    partner: 'licensed',
    skillYears: 'years',
    suit: 'excellent',
    robotNow: 'no',
    embodiment: ['ego', 'suit', 'video'],
    saturation: 'empty',
    ours: 'none',
    rights: 'easy',
    ethics: 'open',
    prev: 'common',
    prim: ['insert', 'fasten', 'tool', 'inspect'],
  },
  [
    node('panel-build', 'Panel and cabinet build', 'Populating and wiring a control cabinet on a bench.', { partner: 'none', horizon: 'long' }, [
      node('mount-components', 'Mount components on the backplate', 'Laying out and fixing devices to DIN rail and plate.', { precision: 3, prev: 'common' }, [
        leaf('cut-mount-din-rail', 'Cut and mount DIN rail', 'Cut rail to length, drill or use pre-tapped holes, fix square to the plate.', { prim: ['tool', 'fasten'], tool: ['rail cutter'] }),
        leaf('clip-devices-to-rail', 'Clip devices onto the rail', 'Hook and snap contactors, breakers and terminals into position and order.', { repetition: 'high-takt', robotNow: 'partial', saturation: 'thin' }),
        leaf('mount-heavy-device', 'Mount a heavy device to the plate', 'Hold a drive or transformer in place while starting fasteners.', { dexterity: 2, prim: ['bimanual', 'fasten'] }),
        leaf('recover-misplaced-device', 'Recover: device mounted in the wrong position', 'Discover a clearance clash, unmount, re-plan the layout, remount.', { fail: true, horizon: 'medium' }),
      ]),
      node('duct-wiring', 'Cut duct and dress the loom', 'Getting the internal wiring into ducts so the panel looks and stays right.', { dexterity: 4, contact: 4 }, [
        leaf('cut-fit-duct', 'Cut and fit wiring duct', 'Mitre duct, snap fingers where wires exit, fix and cap.', { prim: ['separate', 'tool', 'fasten'] }),
        leaf('lay-wires-in-duct', 'Lay and comb wires into duct', 'Route wires along the duct without crossings and press the lid on.', { prim: ['deform', 'bimanual'] }),
        leaf('dress-door-loom', 'Dress a door loom with a hinge spiral', 'Build a loom that survives a thousand door cycles.', { skillYears: 'years', contact: 5 }),
        leaf('recover-trapped-wire', 'Recover: wire trapped under a duct lid', 'Find the damage, open the run, replace the conductor, re-dress.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
      node('panel-terminations', 'Land conductors in the panel', 'Every conductor that lands inside the cabinet.', { precision: 4, contact: 5, prev: 'ubiquitous' }, [
        leaf('ferrule-and-land', 'Ferrule and land a control wire', 'Strip, ferrule, crimp, land in the terminal, torque, mark.', { repetition: 'high-takt' }),
        leaf('land-power-lug', 'Land a power cable lug on a busbar', 'Position a heavy lug, torque to spec with a calibrated wrench, insulate.', { dexterity: 3, contact: 5, tool: ['torque wrench'] }),
        leaf('terminate-shielded-drive-cable', 'Terminate a shielded drive cable at an EMC gland', 'Expose the braid, clamp it 360 degrees in the gland, land the cores.', { skillYears: 'years', precision: 4 }),
        leaf('recover-loose-terminal', 'Recover: loose terminal found on thermal survey', 'Locate the hot joint, isolate, re-torque or re-terminate, re-survey.', { fail: true, horizon: 'medium', prim: ['inspect', 'recover'] }),
      ]),
    ]),

    node('containment', 'Containment and first fix', 'Conduit, tray, trunking and the cable pulls that go in them.', { setting: 'industrial', partner: 'licensed', dexterity: 3, contact: 4, horizon: 'long' }, [
      node('conduit', 'Bend and run conduit', 'Bending, cutting and running conduit.', { skillYears: 'years', prev: 'common' }, [
        leaf('bend-emt-offset', 'Bend an EMT offset by hand', 'Mark, set the bender, bend to angle, check the offset against the run.', { prim: ['tool', 'deform', 'inspect'], skillYears: 'years', tool: ['hand bender'] }),
        leaf('thread-cut-rigid', 'Cut and thread rigid conduit', 'Cut, ream, thread and dress a rigid conduit end.', { capital: 'mid', prev: 'uncommon' }),
        leaf('assemble-conduit-run', 'Assemble a conduit run with couplers', 'Join, align and strap a run across a structure at height.', { prim: ['locomote', 'fasten'], contact: 4 }),
        leaf('recover-wrong-bend', 'Recover: bend angle wrong for the run', 'Cut off the bad bend, re-measure, re-bend, re-fit.', { fail: true }),
      ]),
      node('tray-trunking', 'Install and fill cable tray', 'Installing and populating tray systems.', { dexterity: 3, prev: 'common' }, [
        leaf('cut-tray-to-length', 'Cut and deburr cable tray', 'Cut tray on site and dress every edge that a cable could touch.', { prim: ['tool', 'separate'] }),
        leaf('install-tray-bracket', 'Install tray brackets to structure', 'Set out, drill, anchor and level brackets overhead.', { prim: ['locomote', 'tool', 'fasten'], contact: 4 }),
        leaf('lay-cables-in-tray', 'Lay and comb cables into tray', 'Lay multiple cables flat, keep them parallel, tie at pitch.', { prim: ['deform', 'bimanual'] }),
      ]),
      node('cable-pull', 'Pull cable through a route', 'Getting cable from a drum to where it needs to end.', { dexterity: 2, contact: 5, horizon: 'long', prev: 'common' }, [
        leaf('rope-and-pull', 'Rope and pull a cable through conduit', 'Fish the rope, attach the head, coordinate a two-person pull by voice.', { prim: ['locomote', 'bimanual', 'language'], skillYears: 'months' }),
        leaf('feed-from-drum', 'Feed cable from a drum stand', 'Manage drum tension and cable lay while a partner pulls.', { prim: ['bimanual', 'language'] }),
        leaf('recover-stuck-pull', 'Recover: cable jammed mid-pull', 'Stop, back off, lubricate or open an access point, resume without damaging the jacket.', { fail: true, horizon: 'long', skillYears: 'years' }),
      ]),
    ]),

    node('devices', 'Device install and second fix', 'The visible end: sockets, switches, luminaires, sensors.', { partner: 'licensed', dexterity: 4, prev: 'common' }, [
      node('accessories', 'Terminate and fit accessories', 'Terminating and fitting sockets, switches and plates.', { horizon: 'short', repetition: 'high-takt' }, [
        leaf('terminate-socket-outlet', 'Terminate and fit a socket outlet', 'Strip the cores, land three terminals in a back box, fold the wires, fit the plate flush.', { dexterity: 5, contact: 4, prev: 'ubiquitous' }),
        leaf('fit-light-switch', 'Fit a switch in a shallow back box', 'Fold stiff conductors into a box with almost no depth.', { dexterity: 5, contact: 5, skillYears: 'months' }),
        leaf('recover-cracked-plate', 'Recover: plate cracked on final tightening', 'Replace the accessory, check the box alignment that caused it.', { fail: true }),
      ]),
      node('luminaires', 'Install luminaires overhead', 'Fitting lights and their controls, usually above head height.', { dexterity: 3, contact: 4, prev: 'common' }, [
        leaf('install-linear-luminaire', 'Install a linear luminaire on a ladder', 'Hold, align and fix a long fitting overhead while managing the flex.', { prim: ['locomote', 'bimanual', 'fasten'], suit: 'excellent' }),
        leaf('connect-loop-in-ceiling-rose', 'Connect a loop-in ceiling rose', 'Land loop, switch and pendant cores correctly in a rose.', { dexterity: 5, precision: 3 }),
        leaf('recover-wrong-loop', 'Recover: switched live wired as permanent live', 'Diagnose from behaviour, re-identify cores, re-land, retest.', { fail: true, prim: ['inspect', 'recover'], horizon: 'medium' }),
      ]),
      node('field-instruments', 'Mount and wire field instruments', 'Mounting and wiring the sensing layer of a plant.', { setting: 'industrial', precision: 4, prev: 'common' }, [
        leaf('mount-proximity-sensor', 'Mount and set a proximity sensor', 'Fix the bracket, set the air gap, confirm the LED at the target position.', { prim: ['fasten', 'inspect'], precision: 4 }),
        leaf('wire-4-20ma-loop', 'Wire and verify a 4-20 mA loop', 'Land the loop, inject a signal, confirm the reading at the controller.', { prim: ['inspect', 'language'], contact: 2 }),
        leaf('recover-reversed-polarity', 'Recover: loop wired reverse polarity', 'Read the dead loop, check polarity, swap and re-verify.', { fail: true }),
      ]),
    ]),

    node('motors-drives', 'Motors, drives and rotating gear', 'The electrical side of anything that turns.', { setting: 'industrial', capital: 'mid', contact: 4, prev: 'common' }, [
      node('motor-connect', 'Connect a motor and set rotation', 'Terminating a motor and getting it to turn the right way.', {}, [
        leaf('wire-star-delta-box', 'Wire a motor terminal box star or delta', 'Set the links, land the cores, torque, close the box with the gasket seated.', { dexterity: 4, skillYears: 'months' }),
        leaf('check-rotation', 'Bump test and check rotation', 'Bump the motor, watch the fan, swap two phases if wrong.', { prim: ['inspect', 'language'], contact: 2 }),
        leaf('recover-wrong-rotation', 'Recover: driven machine ran backwards', 'Stop, isolate, swap phases, re-verify with the machine coupled.', { fail: true, horizon: 'medium' }),
      ]),
      node('drive-commissioning', 'Commission a variable speed drive', 'Parameterising and proving a variable speed drive.', { contact: 1, dexterity: 2, prim: ['inspect', 'language'], prev: 'uncommon', capital: 'mid' }, [
        leaf('enter-drive-parameters', 'Enter motor nameplate parameters', 'Read the nameplate, key the parameters, run auto-tune.', { horizon: 'medium' }),
        leaf('tune-ramp-response', 'Tune ramps against a real load', 'Watch the machine, adjust accel and current limits, iterate.', { skillYears: 'years', horizon: 'long' }),
        leaf('recover-trip-diagnosis', 'Recover: drive trips on overcurrent', 'Read the fault log, reason between mechanical bind and drive setting, resolve.', { fail: true, horizon: 'long', robotNow: 'no' }),
      ]),
    ]),

    node('commissioning', 'Testing, commissioning and safety', 'Proving an installation is safe before anyone relies on it.', { contact: 2, dexterity: 3, prim: ['inspect', 'tool', 'language'], partner: 'licensed', prev: 'common' }, [
      node('isolation', 'Isolate, lock off and prove dead', 'Making a circuit dead and proving it.', { horizon: 'medium', prev: 'ubiquitous', notes: 'High-value safety procedure data: strictly ordered, verbal, and consequential.' }, [
        leaf('lock-off-and-prove', 'Lock off, tag and prove dead', 'Isolate, apply lock and tag, prove the tester, prove dead, prove the tester again.', { prim: ['inspect', 'language', 'fasten'], skillYears: 'months' }),
        leaf('permit-handover', 'Permit to work handover', 'Walk the permit with another person, sign, confirm scope verbally.', { prim: ['language'], contact: 1, partner: 'regulated' }),
        leaf('recover-unexpected-live', 'Recover: circuit found live after isolation', 'Stop work, re-trace the supply, find the second feed, re-isolate.', { fail: true, horizon: 'long', robotNow: 'no' }),
      ]),
      node('inspection-testing', 'Run instrument tests', 'Instrument tests on a finished installation.', { capital: 'mid' }, [
        leaf('insulation-resistance-test', 'Insulation resistance test', 'Connect, select range, run the test, record and interpret the value.', { prim: ['inspect', 'tool'] }),
        leaf('loop-impedance-test', 'Earth fault loop impedance test', 'Test at the far point of a circuit and compare against the maximum.', { prim: ['inspect', 'tool'] }),
        leaf('rcd-trip-test', 'RCD trip time test', 'Run trip tests at multiples and record the times.', { prim: ['inspect', 'tool'] }),
        leaf('recover-failed-ir', 'Recover: insulation test fails on a circuit', 'Split the circuit, halve the search space, find the damaged core.', { fail: true, horizon: 'long', skillYears: 'years' }),
      ]),
      node('fault-finding', 'Find a live fault', 'Diagnosis on a system that already exists and is misbehaving.', { horizon: 'long', robotNow: 'no', skillYears: 'years', saturation: 'empty', prim: ['inspect', 'language', 'recover'], prev: 'common' }, [
        leaf('trace-intermittent-fault', 'Trace an intermittent fault', 'Form a hypothesis, provoke the fault, narrow the region, confirm.', { fail: true }),
        leaf('read-schematic-to-panel', 'Read a schematic against a real panel', 'Map drawing symbols to physical devices in a cabinet that does not match the drawing.', { contact: 1, dexterity: 2 }),
        leaf('explain-fault-to-customer', 'Explain the fault and the fix', 'Talk a non-electrician through cause, risk and options.', { prim: ['language'], contact: 1 }),
      ]),
    ]),
  ],
)
