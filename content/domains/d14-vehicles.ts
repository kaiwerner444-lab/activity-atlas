import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// The domain where the workpiece stores energy.
//
// Elsewhere the material is inert until you act on it. Here the hood wants to
// spring, the tensioner wants to snap back, the wiper arm wants to fall on the
// glass, the caliper piston pushes, and the vehicle itself is several tonnes
// held up by something you placed. A large share of the cues are about
// controlling a release rather than producing a motion, and most of the rest
// are about which order two supports change hands in.
//
// The second distinctive thing is state preconditions. Breaking and torquing
// lug nuts are the same motion; done with the wheel off the ground they are
// useless and dangerous. The world has to be in a particular configuration
// before the action means anything.

export const d14: NodeSpec = node(
  'd14',
  'Vehicles and mobility',
  'Workshop and driveway work on vehicles: access and support, service, wheels and brakes, engine bay, chassis, trim, restraints and towing.',
  {
    setting: 'vehicle',
    dexterity: 4,
    precision: 3,
    contact: 5,
    horizon: 'medium',
    repetition: 'batched',
    capital: 'mid',
    partner: 'site',
    skillYears: 'years',
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
    node('access-support', 'Access, lifting and working under', 'Getting to the work, and holding several tonnes off yourself while you do it.', { contact: 5, ethics: 'restricted', notes: 'Seeded restricted rather than open. Every leaf in this family has a failure mode that is fatal rather than merely expensive.' }, [
      node('open-and-prop', 'Open and prop panels', 'Panels held by springs, struts and a prop you have to trust.', { dexterity: 4, horizon: 'short', prev: 'ubiquitous' }, [
        leaf('open-hood-catch-before-it-springs', 'Open a hood through both latches and catch it', 'Release a bonnet in two stages and control the rise.', { cue: 'You have hold of it before the spring or strut takes over.' }),
        leaf('seat-prop-and-tug-it', 'Seat the hood prop and tug it', 'Set a mechanical prop in its hole.', { cue: 'It is in the designated hole and a firm tug will not pop it out.', verify: 'Tug the prop before any part of you goes under the panel.' }),
        leaf('recover-panel-dropped-on-the-prop', 'Recover: panel came down on a prop that let go', 'Reset it properly and check the prop and its socket for wear before continuing.', { fail: true }),
      ]),
      node('jack-and-stand', 'Jack, stand and lower', 'Two supports, and the order in which the load moves between them.', { dexterity: 3, skillYears: 'months', robotNow: 'no' }, [
        leaf('jack-to-loaded-not-hanging', 'Jack on the specified point until the pad is loaded', 'Raise a vehicle under control.', { cue: 'The pad is loaded and the suspension is taking weight, not the vehicle hanging at full droop.' }),
        leaf('lower-onto-stand-jack-slack', 'Set a stand and lower onto it until the jack is slack', 'Transfer the load from jack to stand.', { cue: 'The stand is carrying it and the jack is visibly slack before anything goes underneath.', notes: 'The whole safety case is in the handover between two supports. Both actions are trivial and only the sequence keeps you alive.', verify: 'Push the vehicle sideways at the sill and confirm it is stable on the stands.' }),
        leaf('recover-vehicle-shifted-on-the-stand', 'Recover: vehicle shifted or a stand leaned', 'Get clear first, then re-jack and reset the stands from a safe position.', { fail: true, horizon: 'medium' }),
      ]),
      node('chock-and-move', 'Chock, push and steer', 'Keeping a vehicle where you put it, and moving it deliberately.', { dexterity: 2, prim: ['locomote', 'language'] }, [
        leaf('chock-against-tread-cannot-kick', 'Chock a wheel against the tread', 'Place a chock that will hold.', { cue: 'It is against the tread and cannot kick out under load.' }),
        leaf('unchock-only-once-held', 'Unchock only once it is held', 'Remove a chock in the right order.', { cue: 'The brake or the hitch is holding it before the chock comes out.' }),
        leaf('push-in-neutral-with-a-driver', 'Push a vehicle in neutral with someone at the wheel', 'Move a vehicle by hand safely.', { cue: 'There is a person at the wheel and it stops on the chock, not on somebody.', prim: ['language', 'locomote'] }),
        leaf('steer-dolly-so-wheels-track', 'Steer a dolly so both wheels track', 'Move a vehicle on dollies without it walking off.', { cue: 'Both wheels track and the vehicle stays on the pads.' }),
        leaf('recover-vehicle-rolled-off-a-chock', 'Recover: vehicle moved off its chock', 'Stop everyone, secure it again from outside the path of travel.', { fail: true }),
      ]),
      node('under-vehicle', 'Work under a vehicle', 'Supine work with both hands up and gravity against you.', { dexterity: 5, contact: 5, suit: 'excellent', saturation: 'empty' }, [
        leaf('creeper-work-overhead-both-hands', 'Lie on a creeper and work overhead', 'Work above your face with both hands occupied.', { cue: 'The work is done with both hands and nothing is left where it can fall onto your face.', notes: 'Almost no capture exists of supine two-handed overhead work. The suit fits it well and nothing else does.' }),
        leaf('roll-out-before-sitting-up', 'Roll the creeper out before sitting up', 'Leave from under a vehicle safely.', { cue: 'Your head is clear of the sill before you begin to sit up.' }),
        leaf('sit-up-and-stand-hip-hinge', 'Sit up from a creeper and stand controlled', 'Get off the floor with a controlled movement.', { cue: 'You rise through a hip hinge rather than twisting up off the shoulder.', prim: ['locomote'] }),
        leaf('kneel-at-sill-stand-off-something-solid', 'Kneel at a sill and stand using something solid', 'Get up beside a vehicle without pulling on trim.', { cue: 'You push off a structural point, not a bumper lip or a panel edge that will fold.' }),
        leaf('reset-stance-after-a-lift', 'Reset your stance on the ground after a lift', 'Come back to standing work deliberately.', { cue: 'Both feet are set and clear before the next tool comes in.' }),
        leaf('recover-tool-dropped-while-supine', 'Recover: tool dropped while working overhead', 'Move your head clear first, then retrieve it.', { fail: true }),
      ]),
    ]),

    node('service-fluids', 'Routine service: fluids, filters and ignition', 'The scheduled work, done more times than anything else in the domain.', { dexterity: 4, prev: 'ubiquitous', saturation: 'thin' }, [
      node('fluids', 'Check and change fluids', 'Levels read correctly and containers closed before they move.', { contact: 4 }, [
        leaf('dipstick-wipe-reseat-then-read', 'Pull, wipe, reseat and read a dipstick', 'Take a level reading you can trust.', { cue: 'The first pull is discarded and the reading comes off a fully reseated stick.', notes: 'The first pull is always wrong. The skill is knowing the first attempt does not count.' }),
        leaf('pour-quart-cap-before-setting-down', 'Pour a quart out fully and cap it', 'Empty and close a container in one handling.', { cue: 'The last of it has left the bottle and the cap is back on before the bottle goes down.' }),
        leaf('catch-fluid-and-cap-before-walking', 'Catch waste fluid and cap it', 'Contain drained fluid.', { cue: 'It is in the bottle and capped before you move anywhere with it.' }),
        leaf('burp-coolant-to-the-mark', 'Burp a cooling system and top to the mark', 'Fill and vent a closed system.', { cue: 'Air is out by the specified method and the level holds at the mark when cold.', horizon: 'long', verify: 'Recheck the level after a full heat cycle.' }),
        leaf('recover-overfilled-sump', 'Recover: overfilled after a change', 'Drain back to the mark rather than leaving it and hoping.', { fail: true }),
      ]),
      node('filters-and-plugs', 'Filters, drain plugs and sealing faces', 'Threads and gaskets that seal by a turn count rather than a torque figure.', { precision: 4 }, [
        leaf('spin-filter-to-gasket-then-turn', 'Spin on a filter to the gasket, then the extra turn', 'Fit a spin-on filter to its specified tightness.', { cue: 'You feel the gasket touch, then turn the specified amount and stop.', notes: 'Torqued to a procedure rather than a number. There is no wrench setting that finds this.' }),
        leaf('fit-drain-plug-new-washer', 'Fit a drain plug with a new washer', 'Reseal a sump plug.', { cue: 'A new washer is on, it is started by fingers, and then torqued.' }),
        leaf('fit-air-element-seal-in-groove', 'Fit an air filter element', 'Seat a filter so it seals.', { cue: 'The seal is in the groove all the way round and the lid latches without force.' }),
        leaf('fit-cabin-filter-airflow-direction', 'Fit a cabin filter in the airflow direction', 'Install a filter the right way round.', { cue: 'The arrow on the element matches the airflow stamped on the housing.' }),
        leaf('recover-double-gasket', 'Recover: old filter gasket left on the mount', 'Find it before running, remove it and refit properly.', { fail: true, notes: 'A double gasket looks correct and blows out under pressure. Invisible unless you check the old filter face.' }),
      ]),
      node('ignition-and-connectors', 'Plugs, coils and connectors', 'Fine threads into aluminium, and latches you must pull correctly.', { dexterity: 5, precision: 5 }, [
        leaf('thread-plug-by-fingers-then-seat', 'Thread a spark plug by fingers, then seat it', 'Start a plug without cross-threading the head.', { cue: 'It catches and runs down by fingers alone before any tool touches it.', notes: 'Cross-threading an aluminium head turns a service job into a machining job.' }),
        leaf('torque-plug-stop-on-click', 'Torque a plug to spec', 'Tighten a plug to the correct clamp.', { cue: 'You stop on the click, with no second pull.' }),
        leaf('seat-coil-boot-onto-ceramic', 'Fit a coil pack or boot fully onto the ceramic', 'Seat an ignition boot.', { cue: 'It is fully down on the ceramic and you feel it click on the terminal.' }),
        leaf('land-connector-tug-the-latch', 'Land a connector and tug the latch', 'Prove a connector is home.', { cue: 'The latch clicks and the tug is on the latch or the body, never on the wires.', verify: 'Pull on the housing after every connector.' }),
        leaf('recover-misfire-from-a-half-seated-coil', 'Recover: misfire traced to a half-seated boot', 'Reseat it and confirm the click rather than swapping parts.', { fail: true, horizon: 'medium' }),
      ]),
    ]),

    node('wheels-brakes', 'Wheels, tyres and brakes', 'The most repeated job in the workshop, and the one with the clearest state preconditions.', { contact: 5, prev: 'ubiquitous' }, [
      node('wheel-off-and-on', 'Remove and refit a wheel', 'Where the vehicle being up or down changes what the action means.', { dexterity: 3, repetition: 'high-takt' }, [
        leaf('break-lugs-on-the-ground', 'Break lug nuts with the wheel on the ground', 'Loosen wheel fasteners before lifting.', { cue: 'They are cracked loose while the tyre is still carrying weight.', notes: 'A state precondition rather than an ordering rule: off the ground the wheel simply turns and the effort goes nowhere.' }),
        leaf('pull-wheel-set-on-tread', 'Pull a wheel off the studs and set it on its tread', 'Remove and put down a wheel without damaging it.', { cue: 'It comes straight off the studs and rests on the tread, never on the face.', prim: ['bimanual', 'locomote'] }),
        leaf('hang-wheel-start-all-then-snug', 'Hang a wheel and start every nut before snugging', 'Refit a wheel so it centres.', { cue: 'Every nut is finger-started before any is snugged, and the snug goes in a star.' }),
        leaf('torque-lugs-star-on-the-ground', 'Torque lugs in a star with the vehicle down', 'Complete the torque in the correct state.', { cue: 'The wheel is on the ground, the pattern is a star, and each stops on the click.', verify: 'Recheck the torque after a short drive.' }),
        leaf('recover-wheel-torqued-in-the-air', 'Recover: lugs torqued with the wheel off the ground', 'Lower it and redo the pattern properly.', { fail: true }),
      ]),
      node('tyres', 'Tyre handling and pressures', 'Heavy, awkward and easy to damage on the face.', { dexterity: 3, contact: 5 }, [
        leaf('carry-tyre-against-body-set-on-tread', 'Carry a tyre against the body and set it on its tread', 'Move a wheel and put it down.', { cue: 'It is carried close to the body and lands on the tread.' }),
        leaf('fill-to-spec-and-cap-the-valve', 'Fill at the chuck to spec and cap the valve', 'Set a pressure and close it up.', { cue: 'The gauge reads spec with the chuck off, and the cap is back on.' }),
        leaf('fit-tpms-orientation-and-torque', 'Fit a TPMS sensor in the specified orientation', 'Install a sensor correctly.', { cue: 'It is oriented as specified and the nut or valve is torqued, not just nipped.', precision: 4 }),
        leaf('fit-chain-or-sock-even-on-tread', 'Fit a snow chain or textile sock', 'Fit traction devices evenly.', { cue: 'The fasteners face the specified way and the chain sits even across the tread.', setting: 'outdoor', prev: 'uncommon' }),
        leaf('tension-chain-after-a-short-roll', 'Tension a chain after a short roll and tuck the tail', 'Retension traction devices once settled.', { cue: 'It is retensioned after moving and no loose tail is left to flail.' }),
        leaf('recover-chain-thrown-in-service', 'Recover: chain thrown or loose in use', 'Stop, check for panel or brake-line damage before refitting.', { fail: true }),
      ]),
      node('brakes', 'Brake work', 'Where a piston pushes back and the fluid path must never take air.', { precision: 4, contact: 5, skillYears: 'months', ethics: 'restricted' }, [
        leaf('seat-rotor-against-hub', 'Fit a rotor and seat it against the hub', 'Mount a disc flat before caliper work.', { cue: 'It is flat to the hub face with no debris or rust behind it.' }),
        leaf('compress-piston-square-not-cocked', 'Compress a caliper piston square', 'Push a piston back without damaging it.', { cue: 'It goes back square, not cocked, until the new pad stack fits.', notes: 'The piston resists and can be driven in at an angle, which ruins the seal without looking any different.' }),
        leaf('fit-pads-indicators-correct-side', 'Fit pads with indicators and shims on the right sides', 'Install pads the right way round.', { cue: 'Wear indicators and shims are on the specified sides, checked against both wheels.' }),
        leaf('bleed-close-before-return', 'Bleed: crack the nipple and close it before return', 'Purge a line without drawing air back in.', { cue: 'The nipple is closed before the pedal or the pump comes back.', prim: ['language', 'bimanual'], notes: 'Two-person timing where the failure is silent: closing late pulls air straight back into the caliper.' }),
        leaf('recover-spongy-pedal-after-bleeding', 'Recover: pedal still spongy after a bleed', 'Rebleed systematically from the furthest corner rather than repeating the same one.', { fail: true, horizon: 'medium' }),
      ]),
    ]),

    node('engine-bay', 'Engine bay: electrical, belts and hoses', 'Stored energy at close quarters.', { dexterity: 4, contact: 5, prev: 'common' }, [
      node('battery-and-jump', 'Battery and jump packs', 'The one place in the bay that is always live.', { ethics: 'restricted', precision: 3 }, [
        leaf('fit-hold-down-cannot-rock', 'Fit a battery hold-down', 'Secure a battery.', { cue: 'The battery cannot rock or slide when pushed by hand.' }),
        leaf('land-terminals-wrench-off-the-other-post', 'Land battery terminals cleanly', 'Fit and torque terminals safely.', { cue: 'Faces are clean, the clamp is seated, and the wrench never bridges to the other post.' }),
        leaf('clamp-jump-pack-ground-last', 'Clamp a jump pack with the ground last', 'Connect a booster in the correct order.', { cue: 'The ground goes on last, on a clean point away from the battery if the book says so.' }),
        leaf('recover-jump-clamps-in-reverse-and-cap', 'Remove jump clamps in reverse order and cap them', 'Disconnect a booster safely.', { cue: 'They come off in reverse order and are capped before you walk away with the pack.' }),
        leaf('recover-clamp-touched-a-ground', 'Recover: live clamp contacted a ground', 'Disconnect, inspect for arc damage and check fusing before retrying.', { fail: true }),
      ]),
      node('belts-and-tensioners', 'Belts and tensioners', 'A spring that will take a finger if you let it go.', { dexterity: 5, contact: 5, robotNow: 'no', saturation: 'empty' }, [
        leaf('lay-belt-ribs-in-grooves-except-tensioner', 'Lay a serpentine belt on every pulley but the tensioner', 'Route a belt fully before the last pulley.', { cue: 'Every rib is in its groove on every pulley except the one you will slip it onto last.', prim: ['inspect', 'deform'] }),
        leaf('swing-tensioner-and-release-slowly', 'Swing the tensioner, slip the belt, release slowly', 'Complete a belt fit under spring load.', { cue: 'The belt goes on the last pulley and the tensioner is walked back rather than let go.', notes: 'The single most stored-energy moment in routine service.' }),
        leaf('recover-belt-one-rib-off', 'Recover: belt running one rib off a pulley', 'Stop before it is run, release the tensioner and reseat it.', { fail: true }),
      ]),
      node('hoses-and-thermostats', 'Hoses, clamps and thermostats', 'Joints that must sit past a bead and seal cold and hot.', { precision: 4 }, [
        leaf('fit-hose-to-the-stop', 'Fit a hose over the neck to the stop', 'Push a hose fully home.', { cue: 'It is up against the stop, past the bead, all the way round.' }),
        leaf('clamp-on-the-mark-not-the-bead', 'Fit a clamp on the mark, not on the bead', 'Position and tighten a hose clamp.', { cue: 'The clamp sits behind the bead and the hose cannot be twisted by hand.' }),
        leaf('fit-thermostat-orientation-new-seal', 'Fit a thermostat in the correct orientation', 'Install a thermostat and its housing.', { cue: 'The jiggle pin or bleed is where specified and the new seal is seated before the housing lands.' }),
        leaf('recover-hose-blown-off-on-warm-up', 'Recover: hose came off on warm-up', 'Find whether it was the stop or the clamp position and correct that, not just retighten.', { fail: true }),
      ]),
    ]),

    node('chassis', 'Suspension, steering, exhaust and underbody', 'Heavy fasteners, tapers and the things bolted to the bottom of the car.', { contact: 5, skillYears: 'years', prev: 'common' }, [
      node('suspension', 'Suspension and steering', 'Assemblies that must be torqued in a particular state and to a particular method.', { precision: 4, ethics: 'restricted' }, [
        leaf('fit-axle-nut-specified-method', 'Fit a CV axle nut by the specified method', 'Secure a hub nut so it cannot back off.', { cue: 'Torqued to spec and then staked, pinned or left prevailing exactly as the book requires.' }),
        leaf('separate-ball-joint-without-tearing-boot', 'Separate a ball joint with the specified tool', 'Break a taper without destroying the part.', { cue: 'The taper releases and the boot is intact, using the tool the job actually allows.' }),
        leaf('press-bushing-to-flange-seated', 'Press a bushing to the shoulder or mark', 'Set a bushing to depth.', { cue: 'The flange is seated or the mark is reached, and you stop there.' }),
        leaf('fit-strut-land-everything-before-torque', 'Fit a strut and land everything before torquing', 'Assemble a strut so it can find its position.', { cue: 'Both top studs and the fork or knuckle are landed before any fastener is torqued.' }),
        leaf('torque-strut-hat-square', 'Torque strut nuts in sequence', 'Pull a top mount down evenly.', { cue: 'The hat sits square and no stud is pulled ahead of the others.' }),
        leaf('set-camber-bolt-lock-against-cam', 'Turn a camber bolt to the mark and lock it', 'Set and hold an alignment adjuster.', { cue: 'It is on the mark and the nut locks against the cam, not against painted metal that will settle.' }),
        leaf('fit-tie-rod-land-the-taper', 'Fit a tie-rod end and land the taper', 'Seat and secure a steering joint.', { cue: 'The taper is pulled home before the castle nut or lock is torqued.' }),
        leaf('fit-end-link-bushings-seated', 'Fit an end-link with both bushings seated', 'Install an anti-roll link.', { cue: 'Both bushings are seated and the nut is on the specified side.' }),
        leaf('recover-suspension-torqued-at-full-droop', 'Recover: bushings torqued at full droop', 'Lower to ride height and retorque before it is driven.', { fail: true, horizon: 'medium', notes: 'Another state precondition. Torqued hanging, the bushing is preloaded wrong and tears out in months.' }),
      ]),
      node('exhaust-underbody', 'Exhaust and underbody panels', 'Rusted fasteners and panels held by a dozen clips.', { dexterity: 3, contact: 5 }, [
        leaf('fit-exhaust-flange-cross-tighten', 'Fit an exhaust flange and cross-tighten it', 'Pull a flange joint down evenly.', { cue: 'A new gasket is in and the studs come up in a cross so no corner leaks.' }),
        leaf('hang-isolator-not-resting-on-tunnel', 'Hang an exhaust isolator', 'Support an exhaust on its mounts.', { cue: 'The system hangs in the isolators and touches nothing else.', verify: 'Push the system by hand and confirm it moves freely without contact.' }),
        leaf('start-o2-sensor-by-fingers', 'Start an O2 sensor by fingers', 'Thread a sensor into a hot-side boss.', { cue: 'It catches and runs down by fingers, with anti-seize only where specified and never on the tip.' }),
        leaf('fit-heat-shield-every-fastener-back', 'Fit a heat shield so it cannot buzz', 'Refit a shield completely.', { cue: 'Every clip or nut is back and the shield does not rattle when tapped.' }),
        leaf('start-every-fastener-before-tightening-panel', 'Fit a belly pan and start every fastener first', 'Hang a large panel that must find its holes.', { cue: 'Every fastener is started before any is tightened.' }),
        leaf('recover-panel-hole-that-will-not-line-up', 'Recover: last fastener will not line up', 'Slacken the rest and re-find the position rather than forcing the last one.', { fail: true }),
      ]),
    ]),

    node('trim-lighting', 'Trim, panels and lighting', 'One-shot clips and panels that show every mistake.', { dexterity: 5, precision: 4, prev: 'common' }, [
      node('clips-and-pins', 'Clips and push pins', 'Fasteners designed to be fitted once.', { contact: 5 }, [
        leaf('remove-push-pin-body-and-centre', 'Remove a push pin whole', 'Extract a two-part fastener without losing half of it.', { cue: 'The centre and the body both come out, not just the centre.' }),
        leaf('install-push-pin-body-then-centre', 'Install a push pin body first, centre last', 'Fit a two-part pin correctly.', { cue: 'Both parts finish flush with the panel.' }),
        leaf('seat-trim-clip-into-hole', 'Fit a trim clip and push it into the hole', 'Locate and seat a clip.', { cue: 'It goes into the hole and the panel will not lift at that point.' }),
        leaf('push-splash-shield-pins-flush', 'Fit a splash shield and push every pin flush', 'Refit an underbody shield.', { cue: 'Every pin head is flush and none is left proud.' }),
        leaf('recover-clip-broken-on-removal', 'Recover: clip snapped on removal', 'Extract the remains from the hole and fit a new clip rather than leaving the panel loose.', { fail: true }),
      ]),
      node('panels-and-cards', 'Door cards and body panels', 'Panels that let go all at once.', { dexterity: 5, contact: 5 }, [
        leaf('pry-door-card-at-the-clip-line', 'Pry a door card at the clip line and catch it', 'Release a trim panel without marking the skin.', { cue: 'The tool works the clip line, not the skin, and the card is caught as the last clip releases.' }),
        leaf('refit-card-top-hook-then-clips', 'Refit a door card from the top hook down', 'Rehang a trim panel in order.', { cue: 'The top hooks engage first, then the clips tap home one by one.' }),
        leaf('land-switch-connector-tug-latch', 'Land a switch connector and tug the latch', 'Reconnect trim electrics.', { cue: 'The latch clicks and the tug is on the latch.' }),
        leaf('recover-card-clip-line-cracked', 'Recover: card cracked at the clip line', 'Repair or replace the card rather than refitting a cracked mount.', { fail: true }),
      ]),
      node('lighting-and-bumpers', 'Lighting and bumper assemblies', 'Large parts where the gaps are the visible result.', { precision: 5, dexterity: 3 }, [
        leaf('fit-headlamp-tabs-then-connector', 'Fit a headlamp so the tabs and adjusters sit', 'Locate a lamp unit.', { cue: 'Every tab and adjuster is seated before the connector is landed.' }),
        leaf('aim-headlamp-to-wall-mark', 'Aim a headlamp to the wall mark', 'Set beam alignment.', { cue: 'The cut-off sits on the mark at the specified distance.', verify: 'Check both lamps against the same mark before finishing.' }),
        leaf('fit-bumper-beam-start-all-bolts', 'Fit a bumper beam and start every bolt', 'Hang a structural beam.', { cue: 'Every bolt is started before any is torqued.' }),
        leaf('fit-bumper-cover-gaps-even', 'Fit a bumper cover and seat every clip', 'Fit a large cosmetic panel.', { cue: 'Every clip and screw is home and the gaps are even to both wings.' }),
        leaf('fit-tow-eye-seated-fully', 'Fit a tow hook or eye into its thread', 'Install a recovery point.', { cue: 'It runs down to the stop in the specified thread.' }),
        leaf('recover-uneven-panel-gap', 'Recover: panel gap uneven after fitting', 'Slacken and re-find the position rather than pulling it over with the fasteners.', { fail: true }),
      ]),
    ]),

    node('interior-restraints', 'Interior, seats and restraints', 'Safety-critical fastenings in a cabin, several of them done by owners.', { precision: 4, contact: 4, ethics: 'restricted', prev: 'common' }, [
      node('seats-and-belts', 'Seats and belt anchors', 'Fasteners that hold a person in a crash.', { skillYears: 'months' }, [
        leaf('torque-seat-track-on-its-marks', 'Torque a seat track bolt on its marks', 'Refit a seat to specification.', { cue: 'The seat is on its marks and each bolt is torqued, not run down on a rattle gun.' }),
        leaf('torque-belt-anchor-belt-not-twisted', 'Torque a belt anchor and check for twist', 'Refit a seatbelt anchor.', { cue: 'The webbing is flat with no twist anywhere along it before the anchor is torqued.', verify: 'Run the belt fully out and back before finishing.' }),
        leaf('recover-belt-twisted-at-the-anchor', 'Recover: belt found twisted at the anchor', 'Remove the anchor and clear the twist rather than working it out through the reel.', { fail: true }),
      ]),
      node('child-restraints', 'Child restraints', 'High consequence, procedure-driven, and mostly done by non-professionals.', { dexterity: 4, contact: 5, skillYears: 'none', saturation: 'empty', robotNow: 'no', notes: 'Fitted by parents in car parks far more often than by technicians. Almost no capture exists and the failure is severe.' }, [
        leaf('route-latch-or-belt-correct-path', 'Route LATCH or the belt through the correct path', 'Thread a restraint through the designed path.', { cue: 'The webbing runs the marked path and all slack is pulled through.' }),
        leaf('fit-base-within-allowed-movement', 'Fit a base until movement is within the allowed limit', 'Tension a base correctly.', { cue: 'It does not move more than the allowed amount when pulled at the belt path.', verify: 'Pull hard at the belt path in both directions before fitting the seat.' }),
        leaf('click-seat-into-base-and-tug', 'Click the seat into the base and tug it', 'Prove the seat is latched.', { cue: 'It clicks and a tug up and forward will not release it.' }),
        leaf('recover-base-loose-after-fitting', 'Recover: base loose when rechecked', 'Remove it and refit from the start rather than adding tension to a bad route.', { fail: true }),
      ]),
    ]),

    node('towing-load', 'Towing and load carrying', 'Attaching things to a vehicle that must not come off at speed.', { dexterity: 3, contact: 5, ethics: 'restricted', prev: 'common' }, [
      node('hitching', 'Hitch and uncouple', 'A sequence where every step has a checkable end state.', { skillYears: 'months', saturation: 'empty' }, [
        leaf('crank-jack-coupler-above-ball', 'Crank a trailer jack until the coupler clears the ball', 'Raise a tongue ready to couple.', { cue: 'The coupler is clearly above the ball before the vehicle is reversed under it.' }),
        leaf('lower-onto-ball-watch-the-latch', 'Lower the tongue onto the ball in one motion', 'Drop a coupler onto a ball.', { cue: 'You watch the latch rather than the crank, and it seats in one movement.' }),
        leaf('couple-latch-down-handle-locked', 'Couple: coupler over the ball, latch down, handle locked', 'Complete a coupling.', { cue: 'The latch is down and the handle is in its locked position.', verify: 'Raise the jack until the tongue lifts the back of the tow vehicle slightly and confirm it does not separate.' }),
        leaf('pin-the-coupler', 'Pin the coupler so the latch cannot open', 'Secure a latch mechanically.', { cue: 'The pin is through and the latch cannot lift.' }),
        leaf('cross-chains-hook-back-on-themselves', 'Cross the safety chains under the tongue', 'Rig chains so a dropped tongue is caught.', { cue: 'They cross under the tongue and hook back on themselves, with no chain dragging.' }),
        leaf('breakaway-to-the-vehicle-not-the-ball', 'Fit the breakaway cable to the tow vehicle', 'Attach the emergency brake cable correctly.', { cue: 'It is on the vehicle structure, never on the hitch ball or the chains.', notes: 'On the ball it separates with the trailer and does nothing at all. The failure only appears in the one event it exists for.' }),
        leaf('raise-tongue-and-stow-the-jack', 'Raise the tongue off the jack and stow it', 'Finish coupling and clear the jack.', { cue: 'The foot is up and stowed, clear of the road.' }),
        leaf('recover-coupler-not-fully-seated', 'Recover: coupler sitting on top of the ball', 'Uncouple completely and redo it rather than pinning it as found.', { fail: true }),
      ]),
      node('racks-and-loads', 'Roof bars, racks and tie-downs', 'Loads carried above and behind.', { dexterity: 4, precision: 3 }, [
        leaf('torque-roof-feet-so-bar-cannot-slide', 'Torque roof-bar feet to spec', 'Fit bars that will not move.', { cue: 'The bar cannot be slid or rotated by hand once torqued.' }),
        leaf('fit-roof-box-clamps-to-window', 'Fit a roof box and torque the clamps', 'Mount a box to bars.', { cue: 'Every clamp is inside the specified torque window.', verify: 'Push and pull the box in all directions before driving.' }),
        leaf('load-bike-hold-until-clamped', 'Load a bike and hold it until the clamp is on', 'Mount a bike to a carrier.', { cue: 'You keep hold of it until the clamp is on the specified frame point.' }),
        leaf('clamp-bike-straps-seated', 'Clamp a bike so it cannot rock', 'Secure a carried bike.', { cue: 'It will not rock and both wheel straps are seated.' }),
        leaf('ratchet-strap-firm-hook-in-slot', 'Ratchet a tie-down and seat the hook', 'Tension a strap.', { cue: 'The strap is firm and the hook is fully in its slot, not hooked on an edge.' }),
        leaf('fit-cargo-net-to-designed-points', 'Fit a cargo net or shelf to its designed points', 'Restrain a load inside a vehicle.', { cue: 'Every hook is in a designed anchorage, not on trim.' }),
        leaf('fit-wheel-stop-square-to-tyre', 'Fit a wheel stop or parking block', 'Place a stop the tyre will meet squarely.', { cue: 'The tyre will contact it square rather than riding up one side.' }),
        leaf('recover-load-shifted-on-the-first-stop', 'Recover: load shifted at the first braking', 'Pull over, re-rig properly rather than adding another strap over a bad rig.', { fail: true }),
      ]),
      node('trailer-electrics', 'Trailer electrics', 'The connection that is checked least and matters at night.', { dexterity: 5, precision: 4, prev: 'uncommon' }, [
        leaf('land-trailer-plug-pins-strain-relieved', 'Fit a trailer plug and strain-relieve the cable', 'Wire and secure a trailer connector.', { cue: 'Every pin is landed to the standard and the cable is strain-relieved at the housing.', verify: 'Run every lighting function with a second person watching the trailer.' }),
        leaf('recover-trailer-lights-dead-on-one-function', 'Recover: one trailer function dead', 'Work from the plug pin outward rather than replacing bulbs.', { fail: true, horizon: 'medium' }),
      ]),
    ]),

    node('close-out', 'Road-ready close out', 'Putting the vehicle back into a state a person will drive away.', { dexterity: 3, contact: 4, prev: 'ubiquitous' }, [
      node('secure-and-check', 'Secure and check before release', 'The last pass, where a missed step leaves in a moving vehicle.', { horizon: 'short', ethics: 'restricted' }, [
        leaf('close-hood-both-latches-tug-up', 'Close the hood and feel both latches make', 'Shut and prove a bonnet.', { cue: 'Both latches are felt and a firm tug up on the leading edge does not lift it.', notes: 'The one close-out failure that arrives at speed and blinds the driver.' }),
        leaf('cabin-check-return-to-park', 'Do the cabin check and return to park', 'Operate the specified controls and leave them safe.', { cue: 'The pedal or shifter check is completed and the selector is back in park.' }),
        leaf('set-park-brake-confirm-no-roll', 'Set the park brake and confirm no roll', 'Prove the vehicle is held.', { cue: 'It does not roll on a slight grade with the brake set.' }),
        leaf('close-door-square-if-it-did-not-latch', 'Close the door square rather than slamming again', 'Shut a door properly.', { cue: 'If it did not latch, it is reopened and closed square instead of slammed harder.' }),
        leaf('bench-clear-stands-clear-wheels-down', 'Leave the bay clear with the vehicle down', 'Finish a job so nothing is left in the path.', { cue: 'Tools are off the bumper, stands are clear, and every wheel is on the ground.' }),
        leaf('recover-tool-left-in-the-engine-bay', 'Recover: tool left in the engine bay', 'Account for every tool before the hood closes rather than after the road test.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
    ]),
  ],
)
