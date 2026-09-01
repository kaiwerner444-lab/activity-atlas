import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// The highest-gap domain in the atlas. Almost nobody records domestic repair:
// it happens in private homes, one job at a time, by a person who is not being
// filmed. Nearly every leaf here carries a stop condition, and many carry a
// negative one that names the specific way to get it wrong, which is the part a
// demonstration teaches and a label does not.

export const d03: NodeSpec = node(
  'd03',
  'Home utilities and repair',
  'Domestic fixing: electrics, drains, supply, appliances, heating and the fabric of the house.',
  {
    setting: 'household',
    dexterity: 4,
    precision: 3,
    contact: 5,
    horizon: 'medium',
    repetition: 'one-shot',
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
    prim: ['tool', 'fasten', 'insert', 'inspect'],
  },
  [
    node('electrics', 'Domestic electrical fittings', 'Devices, fixtures and controls on a circuit you made dead yourself.', { precision: 4, dexterity: 5, prev: 'ubiquitous' }, [
      node('isolate-open', 'Isolate and open up', 'Making the circuit dead and getting to the work without damaging what is behind it.', { horizon: 'short', prim: ['inspect', 'language'] }, [
        leaf('identify-and-throw-breaker', 'Identify the right breaker and throw it', 'Open the dead-front, find the correct way, and put a finger on it before operating.', { cue: 'Your finger is on the labelled breaker before the handle moves.', verify: 'Tug the handle after throwing it to confirm it stayed off, then check the load is dead.', prim: ['inspect'] }),
        leaf('remove-plate-park-screws', 'Remove a cover plate without dropping it', 'Take a plate off and keep both screws in the same hand.', { cue: 'The plate comes away without falling and both screws are still in your hand.', dexterity: 5, prev: 'ubiquitous' }),
        leaf('pull-device-from-box', 'Pull a device out of the box', 'Bring a receptacle far enough out to see every landing without straining the cable.', { cue: 'Every terminal is visible and the cable is not pulled at the clamp.', contact: 4 }),
        leaf('recover-nicked-conductor', 'Recover: conductor nicked while opening up', 'Spot damaged insulation behind a device, cut back and re-land on clean copper.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
      node('devices', 'Swap wiring devices', 'Receptacles, switches and GFCIs: land, fold, square, plate.', { dexterity: 5, contact: 4, prev: 'ubiquitous' }, [
        leaf('reland-device-terminals', 'Reland conductors on a new device', 'Put line, load and ground on the correct screws with the insulation at the stop.', { cue: 'No copper shows below the screw head and the insulation stops at the terminal mouth.', precision: 4 }),
        leaf('fold-device-into-box', 'Fold a device back into the box', 'Concertina the conductors so nothing is trapped as the yoke goes home.', { cue: 'The yoke sits on the box ears with no conductor pinched under it.', contact: 5, skillYears: 'months', saturation: 'empty' }),
        leaf('square-device-to-wall', 'Square a device and run the yoke screws', 'Bring a device plumb and tighten until the plate will sit flat.', { cue: 'A plate offered up sits flat on the wall with no rock.', prim: ['inspect', 'fasten'] }),
        leaf('fit-plate-snug-not-dished', 'Fit a cover plate snug, not dished', 'Tighten a plate to contact and stop.', { cue: 'The plate touches the wall all round and the centre is not bowed.' }),
        leaf('fit-gfci-line-load', 'Fit a GFCI on the stamped terminals', 'Land line and load the right way round and fold it in.', { cue: 'Line and load match the stamping, not the convenient screw.', verify: 'Press test and reset and feel both clicks, then confirm downstream outlets follow.', prev: 'common' }),
        leaf('recover-device-wrong-terminals', 'Recover: device landed line-load reversed', 'Diagnose from the behaviour, re-land, refold and retest.', { fail: true, horizon: 'medium' }),
      ]),
      node('fixtures-fans', 'Hang fixtures and fans overhead', 'Work above head height where the part must be supported and landed at once.', { dexterity: 3, contact: 5, prim: ['bimanual', 'locomote'], prev: 'common' }, [
        leaf('support-fixture-land-connectors', 'Support a fixture and land its connectors', 'Take the weight on a hook or one hand while the other makes the connections.', { cue: 'Connections are made without the fixture hanging on its conductors.', robotNow: 'no', saturation: 'empty' }),
        leaf('raise-fixture-start-two-screws', 'Raise a fixture and start two screws', 'Lift to the box and get two fixings started before letting go.', { cue: 'Two screws are engaged before the hand comes away.', prim: ['bimanual'] }),
        leaf('fit-under-cabinet-light', 'Fit an under-cabinet light and land the whip', 'Mount to marked centres and connect in a confined space.', { cue: 'The body sits on both centres and the whip is not trapped by the fixing.', dexterity: 5 }),
        leaf('mount-bath-fan-to-joists', 'Mount a bath fan housing to the joists', 'Hold a housing overhead, land the cable and fix it to timber.', { cue: 'The housing is fixed to joists, not to board, and sits at the ceiling line.', contact: 5 }),
        leaf('snap-fan-grille-springs', 'Snap a fan grille into its slots', 'Compress both springs and locate them blind.', { cue: 'Both springs are in their slots and the grille sits flat.', dexterity: 5 }),
        leaf('recover-fixture-hanging-on-wires', 'Recover: fixture left hanging on its conductors', 'Take the weight, re-make the connections and support it properly.', { fail: true }),
      ]),
      node('controls', 'Fit controls and detectors', 'Thermostats, alarms and the small wall-mounted things.', { dexterity: 4, precision: 4, prev: 'common' }, [
        leaf('transfer-thermostat-letters', 'Land a new thermostat on the same letters', 'Photograph or note the old landings and reproduce them.', { cue: 'Every conductor lands on the same letter it came off.', prim: ['inspect'] }),
        leaf('level-and-snap-thermostat', 'Level a thermostat and snap the body on', 'Set the base plumb and clip the head to it.', { cue: 'The bubble is centred and the body clicks onto every catch.', verify: 'Call for heat and confirm the system responds.' }),
        leaf('fit-co-alarm-at-height', 'Fit a CO alarm at the specified height', 'Mount a detector where the instructions require.', { cue: 'It sits at the stated height from floor or ceiling, clear of vents.', verify: 'Press test and hear the tone.' }),
        leaf('fit-smoke-alarm-twist-base', 'Fit a smoke alarm and twist it onto its base', 'Fix the base and lock the head.', { cue: 'It twists home to the stop and cannot be pulled off.', verify: 'Press test and hear the tone.' }),
        leaf('recover-alarm-nuisance-position', 'Recover: alarm sited where it nuisance-trips', 'Diagnose from the trip pattern, move it clear of the source and refit.', { fail: true, horizon: 'medium' }),
      ]),
    ]),

    node('drains', 'Drains, traps and drainage', 'Water that has to leave, and the pipework that stops it.', { contact: 5, dexterity: 4, prev: 'common' }, [
      node('clear-blockage', 'Clear a blockage', 'Getting a drain flowing again by force or by tool.', { horizon: 'medium' }, [
        leaf('feed-snake-to-catch', 'Feed a snake and crank to the catch', 'Run a drain snake in until it stops or bites.', { cue: 'You feel the stop or the catch and stop feeding rather than forcing.', contact: 5, robotNow: 'no', saturation: 'empty' }),
        leaf('plunge-with-full-seal', 'Plunge with a full seal', 'Seal the outlet, block the overflow, and work three hard strokes.', { cue: 'The seal holds through the strokes and you lift straight off rather than sideways.', prim: ['transfer'] }),
        leaf('rod-floor-drain', 'Rod a floor drain', 'Clear a floor gully until it runs.', { cue: 'The rod moves freely and the standing water drops.', verify: 'Run water and watch it clear without backing up.' }),
        leaf('recover-snake-stuck-in-trap', 'Recover: snake jammed in the trap', 'Free a stuck snake without collapsing the trap or the pipe.', { fail: true, skillYears: 'months' }),
      ]),
      node('trap-work', 'Take down and refit a trap', 'The joint that has to come apart and go back watertight.', { dexterity: 4 }, [
        leaf('drop-trap-without-spilling', 'Back off the slip nuts and drop the trap', 'Get a full trap out over a bucket.', { cue: 'The trap comes down into the bucket and the water does not run down your sleeve.', prim: ['bimanual'], contact: 5 }),
        leaf('clean-and-refit-trap', 'Clean a trap and refit it', 'Clear the trap, check the washers, and remake both joints.', { cue: 'Both nuts are hand-tight plus a snug, with the washers seated square.', verify: 'Fill the basin and release it, then run a dry hand round both joints.' }),
        leaf('recover-weeping-trap', 'Recover: trap weeping after refill', 'Find the weep, decide re-seat or new washer, remake and retest.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
      node('sump', 'Sump and pit', 'The pump of last resort, and proving it works.', { dexterity: 3, contact: 5, prev: 'uncommon' }, [
        leaf('lift-and-set-sump-pump', 'Lift a sump pump and set the new one', 'Change a pump and place it clear of its own pipework.', { cue: 'The pump sits flat on the pit floor and not on the discharge hose.', contact: 5 }),
        leaf('land-check-valve-direction', 'Land the check valve the right way round', 'Fit a non-return valve and support the pipe.', { cue: 'The arrow points away from the pump and the pump is not carrying the pipe weight.' }),
        leaf('prove-sump-by-bucket', 'Prove a sump by pouring a bucket', 'Test the whole loop by hand.', { cue: 'The float lifts, the pump runs, and it shuts off by itself.', verify: 'Watch a full cycle: start, discharge, and clean shut-off with no short-cycling.', prim: ['inspect'] }),
        leaf('recover-sump-short-cycling', 'Recover: pump short-cycling after a swap', 'Diagnose float travel or a stuck check valve and correct it.', { fail: true, horizon: 'medium' }),
      ]),
    ]),

    node('supply', 'Supply, stops and joints', 'Water under pressure, and every joint that has to hold it.', { precision: 4, contact: 5, prev: 'common' }, [
      node('stops-valves', 'Change stops and outside taps', 'Isolating valves and the pipework behind them.', { skillYears: 'months' }, [
        leaf('swap-angle-stop', 'Shut, break and swap an angle stop', 'Change an isolating valve on a live supply.', { cue: 'The new stop is on and the joint is dry before you leave it.', verify: 'Open slowly and watch the joint rather than the handle.' }),
        leaf('swap-hose-bibb-support-stub', 'Swap a hose bibb without twisting the stub-out', 'Change an outside tap while restraining the pipe in the wall.', { cue: 'The stub-out does not rotate at any point during the change.', prim: ['bimanual', 'tool'], contact: 5, saturation: 'empty' }),
        leaf('fit-vacuum-breaker', 'Fit a vacuum breaker on a hose thread', 'Add a backflow device and seat it.', { cue: 'The skirt seats and the device will not spin off by hand.' }),
        leaf('winterize-sillcock', 'Winterize a sillcock', 'Shut inside, open outside, and drain the run.', { cue: 'Water stops and the outside opening runs dry.', horizon: 'short' }),
        leaf('thread-expansion-tank', 'Thread an expansion tank on without cross-threading', 'Carry an awkward vessel into place and start its thread square.', { cue: 'It catches square and runs down with no resistance.', dexterity: 3, contact: 5 }),
        leaf('recover-cross-threaded-fitting', 'Recover: fitting cross-threaded on a supply', 'Back out, inspect the thread, chase or replace the fitting.', { fail: true }),
      ]),
      node('fixture-valves', 'Fixture valves and cartridges', 'The working parts inside taps and outlets.', { dexterity: 5, precision: 5 }, [
        leaf('swap-faucet-cartridge', 'Pull and square a faucet cartridge', 'Replace a cartridge and reseat it on its keyways.', { cue: 'The keyways line up and the cartridge drops fully home without forcing.', skillYears: 'months' }),
        leaf('tighten-faucet-base-from-below', 'Tighten a faucet base from below', 'Work blind under a basin to stop the spout rotating.', { cue: 'The spout will not spin when turned by hand.', contact: 5, dexterity: 5, suit: 'ok', saturation: 'empty' }),
        leaf('swap-showerhead-hold-arm', 'Swap a showerhead while holding the arm', 'Change a head without unscrewing the arm from the wall.', { cue: 'The arm does not move while the head comes off and goes on.', prim: ['bimanual', 'tool'] }),
        leaf('reseat-tub-spout-set-screw', 'Reseat a tub spout on its dimple', 'Set a spout so the grub screw bites where it should.', { cue: 'The set screw bites the dimple, not the pipe wall.', precision: 5 }),
        leaf('clean-aerator-screen', 'Clean an aerator screen and refit it', 'Strip, clear and rebuild a flow restrictor.', { cue: 'The flow is even across the pattern with no spray.', prev: 'ubiquitous' }),
        leaf('recover-spinning-spout', 'Recover: spout still spinning after tightening', 'Get back under, find the missing or misfitted washer, and remake it.', { fail: true, dexterity: 5 }),
      ]),
      node('pipe-joints', 'Cut and make pipe joints', 'Turning a bad section into a good one.', { skillYears: 'months', contact: 5 }, [
        leaf('cut-and-square-copper', 'Cut out a section and square both ends', 'Remove damaged pipe with a tubing cutter.', { cue: 'Both ends are square and round, not oval from over-tightening the cutter.', tool: ['tubing cutter'] }),
        leaf('deburr-and-dry-fit', 'Deburr inside and out, then dry-fit', 'Prepare both ends and check the fit before committing.', { cue: 'No burr inside or out, and the coupling slides fully home dry.', prim: ['inspect', 'tool'] }),
        leaf('sweat-joint-full-circumference', 'Sweat a joint until it flashes all round', 'Heat and feed a soldered joint, then leave it alone.', { cue: 'Solder flashes the full circumference, then you stop and let it sit still.', precision: 4, skillYears: 'years', robotNow: 'no', saturation: 'empty' }),
        leaf('press-fitting-to-jaw', 'Press a fitting with the correct jaw', 'Make a press joint on a marked, fully inserted fitting.', { cue: 'The insertion mark is covered and the tool completes its cycle.', capital: 'mid' }),
        leaf('nip-and-watch-not-crank', 'Nip a weeping nut a fraction and watch', 'Take up a small leak without escalating force.', { cue: 'You tighten a fraction, wipe it dry, and watch instead of cranking.', notes: 'The hardest thing on this list to teach a policy: stop and observe rather than escalate force. Almost every failure here is somebody continuing to turn.', contact: 5, skillYears: 'years', robotNow: 'no', saturation: 'empty' }),
        leaf('recover-split-joint', 'Recover: joint split from over-tightening', 'Cut the failed fitting out, prepare fresh ends, remake it.', { fail: true, horizon: 'medium' }),
      ]),
    ]),

    node('toilets', 'Toilets and cisterns', 'Heavy, awkward, and unforgiving of a bad seal.', { dexterity: 4, contact: 5, horizon: 'long', prev: 'common', saturation: 'empty' }, [
      node('cistern-internals', 'Change cistern internals', 'The valves and seals inside the tank.', { dexterity: 5 }, [
        leaf('swap-fill-valve-to-line', 'Swap a fill valve and set the waterline', 'Change a fill valve and adjust it to the mark.', { cue: 'The water stops at the marked line, below the overflow.', verify: 'Flush and watch a full refill cycle shut off cleanly.' }),
        leaf('hook-refill-into-overflow', 'Hook the refill tube into the overflow', 'Clip the small tube so it discharges into, not down, the overflow.', { cue: 'The tube ends inside the overflow rim, not below the water line.', notes: 'One word apart from the failure and a completely different outcome: down the overflow siphons the tank continuously.' }),
        leaf('swap-flapper-chain-slack', 'Swap a flapper with the right chain slack', 'Fit a new seal and set the linkage.', { cue: 'A little slack at rest and the seal drops square into the seat.', verify: 'Flush twice and confirm it seals with no run-on.' }),
        leaf('recover-running-cistern', 'Recover: cistern running on after a swap', 'Diagnose between chain, flapper and fill height and correct it.', { fail: true }),
      ]),
      node('set-a-pan', 'Lift and set a toilet', 'The one job in the house where a bad seal is invisible until it is not.', { dexterity: 2, contact: 5, skillYears: 'months' }, [
        leaf('rock-pan-off-wax-and-lift', 'Unbolt, rock off the wax and lift', 'Break a pan free and get it clear in one controlled lift.', { cue: 'It comes free of the wax and lifts straight up, with the load taken through the legs.', prim: ['bimanual', 'locomote'] }),
        leaf('set-wax-and-lower-on-bolts', 'Set a new wax and lower onto both bolts', 'Drop a pan onto two studs blind, in one movement.', { cue: 'Both closet bolts come through their holes on the first attempt, with no shuffling on the wax.', precision: 4, robotNow: 'no', saturation: 'empty' }),
        leaf('seat-pan-and-alternate-bolts', 'Seat by body weight and alternate the bolts', 'Compress the seal evenly without cracking the china.', { cue: 'The base stops rocking and the nuts come up alternately, snug rather than tight.' }),
        leaf('recover-broken-wax-seal', 'Recover: wax seal broken by shuffling the pan', 'Lift again, scrape both faces, fit a fresh wax and reset.', { fail: true, horizon: 'long' }),
      ]),
    ]),

    node('appliances', 'Appliance swap and service', 'Heavy boxes in tight alcoves with a service connection at the back.', { dexterity: 4, contact: 5, prev: 'ubiquitous' }, [
      node('kitchen-appliances', 'Kitchen appliances', 'Disposers, dishwashers and fridges.', {}, [
        leaf('twist-lock-disposer-off', 'Twist-lock a disposer off while holding it', 'Release a mounting ring while carrying the weight overhead in a cupboard.', { cue: 'The ring releases and the unit is still fully supported by your other arm.', contact: 5, dexterity: 3, suit: 'ok' }),
        leaf('hang-disposer-and-land-drain', 'Hang a disposer and land its drain', 'Fit the new unit and connect the drain and dishwasher nipple.', { cue: 'It locks to the ring and both connections are square with no strain.', verify: 'Run water and check every joint dry before running the motor.' }),
        leaf('reset-jammed-disposer', 'Reset a jammed disposer with the hex key', 'Free a seized rotor from underneath.', { cue: 'It turns freely both ways before power is restored.', fail: true }),
        leaf('pull-dishwasher-land-supply', 'Pull a dishwasher and land the supply', 'Bring a machine out far enough to work and connect it.', { cue: 'The supply is landed and the drain is looped high before it goes back.' }),
        leaf('level-dishwasher-door-half-open', 'Level a dishwasher on its feet', 'Set the machine so the door behaves.', { cue: 'The door stays put at half-open rather than falling or rising.', prim: ['inspect'] }),
        leaf('change-fridge-filter-to-click', 'Change a fridge water filter', 'Swap a cartridge and seat it.', { cue: 'It clicks and the cap seats flush.', verify: 'Run several litres through and check for a leak at the head.', prev: 'ubiquitous' }),
        leaf('pull-fridge-vacuum-coils', 'Pull a fridge and vacuum the coils', 'Move a heavy appliance out, clean behind it, and return it.', { cue: 'It rolls back without kinking or trapping the water line.', dexterity: 2 }),
        leaf('relevel-fridge-self-close', 'Re-level a fridge so the door self-closes', 'Adjust the feet until the door behaves.', { cue: 'The door swings shut on its own from 45 degrees.' }),
        leaf('land-icemaker-line-with-loop', 'Land an ice-maker line with a service loop', 'Connect a small-bore line so the appliance can move.', { cue: 'Enough loop that the fridge can roll out without shearing the fitting.' }),
        leaf('recover-appliance-leak-on-refill', 'Recover: appliance leaking on first fill', 'Shut off, find the joint, remake it and refill under watch.', { fail: true, horizon: 'medium' }),
      ]),
      node('laundry-appliances', 'Laundry appliances and ducting', 'Washers, dryers and the lint path nobody looks at.', { prev: 'common' }, [
        leaf('inspect-dryer-duct-at-elbow', 'Pull a dryer and inspect the duct', 'Disconnect the vent and look for a packed elbow.', { cue: 'You can see through the duct at the first elbow.', prim: ['inspect'] }),
        leaf('refit-dryer-vent-taut', 'Refit a dryer vent so the path is taut', 'Reconnect ducting without slack loops that collect lint.', { cue: 'The run is taut, joints taped metal to metal, and the hood flap moves freely.', verify: 'Run the dryer and feel airflow at the outside hood.' }),
        leaf('brush-lint-path-to-ribbing', 'Brush the lint path clear', 'Clean inside the machine housing.', { cue: 'The ribbing of the duct is visible again.' }),
        leaf('swap-washer-inlet-hoses', 'Swap washer inlet hoses', 'Change both hoses and check the seals.', { cue: 'Rubber washers present in both ends, hand-tight plus a quarter.', verify: 'Open the valves and run a dry hand round all four joints.' }),
        leaf('level-washer-coin-test', 'Level a washer so it does not walk', 'Set the feet and lock them.', { cue: 'A coin on the corner does not move during a spin.', verify: 'Run a spin cycle and watch the machine stay put.' }),
        leaf('recover-walking-washer', 'Recover: washer walking on spin', 'Re-level, check the feet locks and the load distribution.', { fail: true }),
      ]),
    ]),

    node('heating', 'Heating, air and condensate', 'The plant that keeps the house warm and the water that comes off it.', { contact: 4, skillYears: 'months', prev: 'common' }, [
      node('furnace-air', 'Furnace and air path', 'Filters, burner boxes and the airflow direction stamped on everything.', { partner: 'licensed', notes: 'Gas appliance work is a licensed trade in most jurisdictions. Seeded as licensed rather than open.' }, [
        leaf('slide-filter-airflow-direction', 'Change a filter in the airflow direction', 'Swap a filter the way the frame is stamped.', { cue: 'The arrow on the new filter points the same way the old one did.', prim: ['inspect'], prev: 'ubiquitous' }),
        leaf('vacuum-burner-box-power-off', 'Vacuum a burner box with the power off', 'Open up, clean, and close so the interlock makes.', { cue: 'The door reseats and the interlock makes when it closes.', horizon: 'medium' }),
        leaf('seat-humidifier-pad-on-gasket', 'Swap a humidifier pad and close on the gasket', 'Fit a new pad and seal the door.', { cue: 'The pad sits in its frame and the door closes on the gasket, not on the pad.' }),
        leaf('recover-interlock-not-made', 'Recover: interlock not making after service', 'Find the misseated panel or switch and reseat it.', { fail: true }),
      ]),
      node('condensate', 'Condensate and pumps', 'Water that must run away from a place it was never meant to collect.', { dexterity: 4, prev: 'common' }, [
        leaf('clear-condensate-line', 'Clear a condensate line', 'Suck or blow a blocked drain line until it runs.', { cue: 'You hear the line open and water runs freely to the drain.' }),
        leaf('swap-condensate-pump', 'Swap a condensate pump', 'Change a pump without reversing its connections.', { cue: 'Inlet and outlet are on the same sides as the old unit.', verify: 'Pour water into the tank and watch it lift and shut off.' }),
        leaf('fit-float-switch-free-paddle', 'Fit a float switch in the pan', 'Mount a safety switch so it can actually move.', { cue: 'The paddle swings freely and the wiring leaves in a drip loop.' }),
        leaf('recover-pan-overflow', 'Recover: pan overflowed after a blocked line', 'Clear the line, dry the pan, and prove the float cuts out.', { fail: true, horizon: 'medium' }),
      ]),
      node('wet-system', 'Wet system and emitters', 'Pumps, valves and radiators on a filled loop.', { contact: 5, skillYears: 'months' }, [
        leaf('isolate-and-lift-circulator', 'Isolate a circulator and lift it out', 'Break the unions without emptying the system onto the floor.', { cue: 'The pump comes out with the loop still contained.', prim: ['bimanual'] }),
        leaf('fit-circulator-flow-arrow', 'Fit a circulator with the flow arrow right', 'Install a pump the correct way round with new gaskets.', { cue: 'The arrow points along the flow and both unions pull up square.', verify: 'Refill, vent, and confirm the pipe warms downstream.' }),
        leaf('bleed-radiator-until-water', 'Bleed a radiator until you get water', 'Vent air from an emitter and close at the right moment.', { cue: 'Air stops, water starts, and you close immediately.', prev: 'ubiquitous' }),
        leaf('push-trv-head-to-collar', 'Push a TRV head onto its collar', 'Fit a thermostatic head so it engages the pin.', { cue: 'It clicks onto the collar and the head turns through its full range.' }),
        leaf('seat-zone-valve-head-on-pin', 'Seat a zone-valve head on the pin', 'Change an actuator without bending the spindle.', { cue: 'The head drops fully onto the pin with no gap at the body.', verify: 'Call the zone and confirm the valve drives and the end switch makes.' }),
        leaf('recover-airlocked-loop', 'Recover: loop airlocked after a pump change', 'Vent in order until circulation returns.', { fail: true, horizon: 'long' }),
      ]),
      node('water-heater', 'Water heater service', 'Stored hot water and the fittings that keep it safe.', { partner: 'licensed', contact: 5, prev: 'common' }, [
        leaf('fit-cold-side-shutoff', 'Fit a shutoff on the cold side', 'Add an isolating valve and leave it correctly set.', { cue: 'The joint is proven and the valve is left open.' }),
        leaf('drain-heater-to-bucket', 'Drain a heater a bucket at a time', 'Take water off through the boiler drain in controlled amounts.', { cue: 'You shut it when the bucket is heavy, not when it overflows.', dexterity: 3 }),
        leaf('swap-tp-valve-seal-on-male', 'Swap a T&P valve', 'Change a safety valve with the thread sealed correctly.', { cue: 'Thread seal on the male thread, not packed into the port.', verify: 'Refill and lift the lever briefly to confirm it discharges and reseats.' }),
        leaf('break-anode-rod-loose', 'Break an anode rod loose and change it', 'Free a seized rod with a long bar and fit a new one.', { cue: 'It breaks free without twisting the tank, and the new rod runs down to the hex.', contact: 5, skillYears: 'years', saturation: 'empty' }),
        leaf('recover-weeping-tp-discharge', 'Recover: T&P weeping after a swap', 'Determine whether it is debris or pressure, correct and retest.', { fail: true, horizon: 'medium' }),
      ]),
    ]),

    node('fabric', 'Doors, windows, cabinets and finish', 'The moving and visible parts of the house.', { dexterity: 4, precision: 4, prev: 'ubiquitous' }, [
      node('patch-and-seal', 'Patch and seal', 'Making a repair disappear.', { contact: 4, skillYears: 'months' }, [
        leaf('square-hole-and-patch', 'Square a hole and patch it flush', 'Turn a ragged hole into a repairable one and fill it.', { cue: 'The patch sits flush and the mud is pressed out to nothing at the edges.' }),
        leaf('sand-patch-until-no-catch', 'Sand a patch until the edge disappears', 'Feather a repair by feel.', { cue: 'Your hand runs across it without catching the edge.', prim: ['inspect', 'tool'] }),
        leaf('recaulk-tub-one-pass', 'Recaulk a tub in one tooled pass', 'Strip, dry and re-bead a wet joint.', { cue: 'Old bead fully out, joint dry, and the new bead tooled in a single pass with no restarts.', dexterity: 5, skillYears: 'months', saturation: 'empty' }),
        leaf('recaulk-sink-deck', 'Recaulk a sink at the deck', 'Re-seal where a sink meets the worktop.', { cue: 'A continuous bead tooled in one pass, with no gaps at the corners.' }),
        leaf('recover-broken-caulk-bead', 'Recover: bead broke or skinned mid-run', 'Cut the failed section out, clean fully, and re-run it.', { fail: true }),
      ]),
      node('cabinets-drawers', 'Cabinets and drawers', 'Adjustable hardware that has to end up looking deliberate.', { precision: 5 }, [
        leaf('adjust-euro-hinge-three-screws', 'Rehang a door and adjust the euro-hinges', 'Set a cabinet door true on three axes.', { cue: 'The reveal is even down both sides and across the top.', skillYears: 'months' }),
        leaf('swap-drawer-slide-rear-first', 'Swap a drawer slide, rear screws first', 'Change a runner while supporting the drawer.', { cue: 'The drawer runs full travel without binding or dropping at the front.' }),
        leaf('reseat-closet-rod', 'Reseat a closet rod in both sockets', 'Set a rod so it cannot walk out.', { cue: 'Both ends are captured and the rod will not lift out of either socket.' }),
        leaf('recover-uneven-cabinet-reveal', 'Recover: reveal uneven after adjustment', 'Work the three screws in the right order to bring it back true.', { fail: true }),
      ]),
      node('doors', 'Doors and their hardware', 'Hinges, latches, seals and the reveal.', { contact: 5, skillYears: 'months' }, [
        leaf('fit-door-stop-where-handle-lands', 'Fit a door stop where the handle would hit', 'Place and drive a stop.', { cue: 'The handle contacts the stop before it contacts the wall.' }),
        leaf('plane-sticking-door-even-reveal', 'Plane a sticking door on the high spot', 'Take material off exactly where it binds.', { cue: 'It clears the jamb with an even reveal all the way round.', precision: 5, robotNow: 'no', saturation: 'empty' }),
        leaf('replace-weatherstrip-compression', 'Replace weatherstrip to the right compression', 'Fit a seal that closes without slamming.', { cue: 'The door compresses the seal and latches without being pushed.' }),
        leaf('shim-strike-to-latch-centre', 'Bend or shim a strike to centre the latch', 'Adjust a strike plate so the latch lands right.', { cue: 'The latch hits the centre of the hole and the door does not rattle.', verify: 'Close it a dozen times and confirm it catches every time without a push.' }),
        leaf('recover-door-latching-only-on-push', 'Recover: door only latches when pushed', 'Diagnose between strike, hinges and seal, and correct the right one.', { fail: true, horizon: 'medium' }),
      ]),
      node('windows-sliders', 'Windows and sliders', 'Sashes, cranks and rollers.', { dexterity: 4, prev: 'common' }, [
        leaf('fit-sash-lock-into-solid', 'Fit a sash lock into solid timber', 'Drive fixings into structure rather than cladding.', { cue: 'The screws bite solid timber, not just the cladding skin.' }),
        leaf('swap-window-crank-full-travel', 'Swap a window crank', 'Change an operator and prove it.', { cue: 'The window runs the full open and close without binding.', verify: 'Cycle it fully open and fully shut once before leaving.' }),
        leaf('reseat-slider-roller-height', 'Reseat a sliding-door roller and set the height', 'Lift a panel back onto its track and adjust it.', { cue: 'It rolls the full run without scraping at either end.', dexterity: 3, contact: 5, skillYears: 'months' }),
        leaf('recover-slider-jumped-track', 'Recover: slider jumped the track again', 'Find the worn roller or bent track and address the cause.', { fail: true }),
      ]),
      node('garage', 'Garage door and operator', 'The heaviest moving thing in a house.', { dexterity: 3, contact: 5, prev: 'common', ethics: 'restricted', notes: 'Spring work is excluded: torsion springs on a domestic door are a recognised serious-injury hazard and are not a seeded activity.' }, [
        leaf('lube-track-and-run-by-hand', 'Wipe and lube a track, then run it by hand', 'Service the track and feel the door through its travel.', { cue: 'It runs the full travel by hand with no binding or grabbing.' }),
        leaf('aim-safety-eyes-steady', 'Aim the safety eyes at each other', 'Align a photo-eye pair.', { cue: 'Both indicator lights go steady rather than flashing.', verify: 'Break the beam with a foot and confirm the door reverses.', precision: 4 }),
        leaf('pull-release-and-walk-door', 'Pull the release and walk the door through', 'Disconnect the operator and move the door manually.', { cue: 'The door stays where you leave it at any point in the travel.' }),
        leaf('reset-operator-limits', 'Reset operator limits at the physical stops', 'Set open and close limits to the real end positions.', { cue: 'It stops at the floor without pressing, and at the top without straining.', verify: 'Run a full cycle in both directions and watch both ends.' }),
        leaf('recover-door-reverses-on-close', 'Recover: door reverses part-way down', 'Work through eyes, limits and track to find which one is doing it.', { fail: true, horizon: 'medium', skillYears: 'months' }),
      ]),
    ]),
  ],
)
