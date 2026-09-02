import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// Two hundred rows, built from both lists together, because they are two halves
// of one trade and the split is real: panel side and field side. A panel builder
// on a bench and an electrician on a tray run share a vocabulary and almost no
// working conditions, so the facets diverge sharply between the two.
//
// This is the domain where the gap between what a camera sees and what happened
// is at its widest in the whole atlas.
//
// A terminal screw at firm stop and a terminal screw that has sheared the
// ferrule are the same wrist. A lug at spec and a lug at spec plus a bounce past
// the click are the same tool on the same nut. A shield landed at one end and a
// shield landed at both are the same two motions performed in two places, and
// one of them quietly ruins the signal. A CT with the arrow toward the load and
// one reversed are the same ring on the same cable. A bond strap slack and a
// bond strap taut at full door travel differ by an inch, once, at the end of a
// swing nobody films.
//
// Which is why torque, seat, click and stop-condition run through nearly every
// leaf here, and why `verify` is dense: land, then prove. Prove the tester,
// prove dead, prove the tester again.
//
// partner sits at `site` for the domain and is lifted to `licensed` on the
// families where the work genuinely is: field containment, switchgear, hazardous
// area and everything under isolation. Panel building on a bench is not licensed
// electrical installation and pretending it is would suppress the score of the
// most capturable half of the trade.

export const d09: NodeSpec = node(
  'd09',
  'Electrical and controls',
  'Panel side and field side: land, dress, seat, torque, bond, isolate and prove. Done means the conductor is captured, the cover is on, or the circuit is proven dead.',
  {
    setting: 'industrial',
    dexterity: 5,
    precision: 5,
    contact: 3,
    horizon: 'medium',
    repetition: 'batched',
    capital: 'mid',
    partner: 'site',
    skillYears: 'years',
    suit: 'excellent',
    robotNow: 'no',
    embodiment: ['ego', 'suit', 'umi'],
    saturation: 'empty',
    ours: 'none',
    rights: 'easy',
    ethics: 'open',
    prev: 'common',
    prim: ['fasten', 'insert', 'tool', 'inspect'],
  },
  [
    node('enclosure', 'Enclosure, doors and access', 'The box itself, and reaching into it without standing on the work.', { dexterity: 3, contact: 4, prev: 'common' }, [
      node('doors', 'Doors and dead-fronts', 'Large hinged steel with a bond strap on it.', { prim: ['grasp', 'inspect'] }, [
        leaf('open-a-door-to-its-detent', 'Open a panel door to its detent', 'Swing a door and let it stay.', { cue: 'It rests at the detent without drifting closed on you.' }),
        leaf('swing-full-arc-strap-slack', 'Swing a door through its full arc', 'Check the door through its whole travel.', { cue: 'At full arc the bond strap is slack, never taut.', verify: 'You take it all the way rather than stopping where you need it.', notes: 'A strap that goes taut at full travel fails months later. The difference is an inch, once, at the end of a swing nobody watches.' }),
        leaf('support-a-door-and-start-a-hinge-screw', 'Support a heavy door and start a hinge screw', 'Rehang or shim a door single-handed.', { cue: 'The door is held with one hand while the other starts the screw by fingers.', contact: 5, prim: ['bimanual'] }),
        leaf('torque-door-hardware-without-bow', 'Torque door hardware', 'Bring door fixings up.', { cue: 'The door does not bow when the last one comes up.' }),
        leaf('latch-a-panel-every-latch-made', 'Close and latch a panel', 'Shut an enclosure.', { cue: 'Every latch is made, counted round the door.' }),
        leaf('recover-a-door-that-will-not-close-square', 'Recover: the door will not close square', 'Slack the hardware and rehang rather than forcing the last latch.', { fail: true }),
      ]),
      node('barriers', 'Dead-fronts and barriers', 'What stands between a hand and a bus.', { contact: 3, partner: 'licensed' }, [
        leaf('seat-an-arc-flash-shroud-both-clips', 'Fit an arc-flash shroud or phase barrier', 'Install a temporary barrier.', { cue: 'Both clips seat; a shroud held by one clip is not fitted.' }),
        leaf('fit-a-dead-front-no-live-parts-showing', 'Fit the dead-front', 'Restore the barrier over live parts.', { cue: 'No live part shows through any opening.', verify: 'You look through every opening rather than judging the panel as a whole.' }),
        leaf('fit-a-filler-plate-to-close-an-opening', 'Fit a filler plate', 'Close an unused breaker position.', { cue: 'No opening remains anywhere in the dead-front.' }),
        leaf('clip-an-arc-flash-blanket-clear-of-the-work', 'Fit an arc-flash blanket or barrier', 'Screen adjacent live parts.', { cue: 'It is clipped so it cannot fall into the work you are about to do.', notes: 'A barrier that falls into the gap it was protecting turns a screen into the fault.' }),
        leaf('recover-a-barrier-that-fell-into-the-work', 'Recover: a barrier fell into the work', 'Stop, isolate, and refit it from outside the gap rather than fishing it out live.', { fail: true }),
      ]),
      node('reach', 'Reaching into a panel', 'Working in a box with live parts in it.', { dexterity: 4, contact: 2, prim: ['reach', 'locomote'] }, [
        leaf('kneel-land-two-ferrules-and-stand-clear', 'Kneel at a low terminal row and stand clear', 'Work the bottom of a panel.', { cue: 'You stand without pulling on the wires you just landed.', notes: 'Using the loom as a handrail on the way up undoes the work you just did, invisibly.' }),
        leaf('reach-a-top-row-without-standing-on-the-sill', 'Reach a top-row terminal', 'Work the top of a panel.', { cue: 'Neither foot goes on the sill or the wiring.' }),
        leaf('draw-a-torque-wrench-and-return-it', 'Draw a torque wrench, use it and return it', 'Cycle a torque tool through a job.', { cue: 'It goes back in the holster, not down inside the enclosure.', prim: ['tool'], notes: 'A tool left in a panel is a fault waiting for the door to close on it.' }),
        leaf('ready-state-at-the-panel', 'Leave a ready state at the panel or motor box', 'Declare the work finished.', { cue: 'The last isolator is in the state you chose, the last cover is on, and both hands are clear.', verify: 'All three are checked rather than assumed.', horizon: 'short' }),
        leaf('recover-a-tool-left-inside-a-panel', 'Recover: a tool was left inside a panel', 'Reopen and account for every tool before the door is closed on it.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
    ]),

    node('rail', 'DIN rail, terminals and ferrules', 'The densest fine-motor work in the atlas, repeated hundreds of times per panel.', { dexterity: 5, precision: 5, contact: 3, repetition: 'high-takt', prev: 'common' }, [
      node('rail-and-mounting', 'Rail and module mounting', 'The substrate everything else clips to.', { dexterity: 4 }, [
        leaf('cut-din-rail-and-deburr-both-ends', 'Cut a DIN rail to length and deburr it', 'Prepare a length of rail.', { cue: 'A module will slide on from either end without catching.' }),
        leaf('snap-a-rail-on-both-end-clips', 'Snap a rail into the panel', 'Mount rail into an enclosure.', { cue: 'Both end-clips are engaged.', verify: 'It cannot rock when you push a corner.' }),
        leaf('snap-a-breaker-to-the-marked-pitch', 'Snap a breaker onto the rail at pitch', 'Mount a rail device.', { cue: 'It sits on the marked pitch, not wherever it landed.' }),
        leaf('fit-din-end-stops', 'Fit DIN end-stops', 'Retain a terminal stack.', { cue: 'The stack cannot slide along the rail.' }),
        leaf('recover-a-rail-that-rocks-under-load', 'Recover: the rail rocks once modules are on it', 'Strip the run back and reseat the rail rather than shimming the modules.', { fail: true }),
      ]),
      node('ferrules', 'Ferrules and terminals', 'Where the conductor meets the panel.', { precision: 5, dexterity: 5 }, [
        leaf('land-a-ferrule-until-the-conductor-vanishes', 'Land a ferrule in a terminal', 'Insert a ferruled conductor.', { cue: 'No copper is visible and the insulation stops at the mouth.', notes: 'Insulation inside the clamp and copper outside it are both failures, and both look like a landed wire from any distance.' }),
        leaf('screw-to-firm-stop-without-shearing', 'Screw a terminal to firm stop', 'Clamp a conductor.', { cue: 'Firm stop, without shearing the ferrule.', contact: 4, notes: 'The correct stop and the sheared one are the same wrist through most of the travel. This is the single clearest force-only cue in the domain.' }),
        leaf('twin-ferrules-only-where-rated', 'Twin two ferrules in one terminal', 'Land two conductors in one clamp.', { cue: 'Only where the block is rated for two; otherwise it takes a bridge.' }),
        leaf('seat-a-jumper-bar-fully', 'Fit a jumper bar across terminals', 'Bridge adjacent terminals.', { cue: 'It is fully seated along its whole length.' }),
        leaf('seat-a-comb-on-every-tooth', 'Fit a terminal bridge or comb', 'Install a multi-way bridge.', { cue: 'Every tooth is seated, not just the ends.', verify: 'You run a finger down the comb rather than eyeing it.' }),
        leaf('recover-a-sheared-ferrule', 'Recover: the ferrule sheared in the clamp', 'Cut back, re-strip and re-ferrule rather than leaving a partial.', { fail: true }),
      ]),
      node('disconnect-terminals', 'Disconnect and test terminals', 'Terminals that are meant to be opened.', { dexterity: 4, precision: 4 }, [
        leaf('open-a-test-disconnect-and-close-it', 'Open a test-disconnect terminal', 'Use a test link.', { cue: 'It reaches the test position, and it goes back closed before you leave.' }),
        leaf('open-a-knife-disconnect-with-its-tool', 'Open a knife-disconnect terminal', 'Break a disconnect link.', { cue: 'With the specified tool, never levered with a screwdriver.', notes: 'Prying with a screwdriver cracks the block, and the crack is inside where nobody sees it.' }),
        leaf('recover-a-test-link-left-open', 'Recover: a test link was left open', 'Close it and re-prove the circuit before the panel is handed back.', { fail: true, notes: 'A link left open is a circuit that reads healthy and does nothing.' }),
      ]),
      node('io-mapping', 'Landing to a map', 'Getting the right wire on the right number.', { precision: 5, prim: ['inspect', 'insert'] }, [
        leaf('land-plc-inputs-by-position-not-memory', 'Land discrete PLC inputs to the map', 'Terminate field wiring to an I/O card.', { cue: 'Each ferrule matches the map by position, read off the drawing rather than remembered.', notes: 'Memory is the failure mode. Two adjacent inputs swapped produce a machine that works until one specific condition.' }),
        leaf('land-a-marshalling-pair-to-the-field-map', 'Land a marshalling pair', 'Cross-connect field to system.', { cue: 'The inner pair map matches the field pair and the shield is handled as drawn.' }),
        leaf('recover-two-inputs-landed-swapped', 'Recover: two adjacent inputs were landed swapped', 'Reland from the drawing at both ends rather than correcting it in software.', { fail: true, notes: 'Fixing a wiring error in code leaves the next person a machine that does not match its own drawing.' }),
      ]),
    ]),

    node('dressing', 'Dressing, duct and separation', 'Making a panel readable by the next person who opens it.', { dexterity: 4, precision: 4, contact: 2, prev: 'common' }, [
      node('duct', 'Wire duct', 'Getting conductors to lie down.', { prim: ['deform', 'transfer'] }, [
        leaf('dress-a-feeder-flat-in-the-duct', 'Dress a feeder into wire duct', 'Lay a heavy conductor into duct.', { cue: 'It lies flat and does not climb the sidewall.', contact: 4 }),
        leaf('close-a-duct-cover-every-latch-down', 'Close a duct cover', 'Fit a duct lid.', { cue: 'Every latch is down along the length.' }),
        leaf('straighten-a-dog-leg-so-the-lid-closes', 'Straighten a dog-leg in duct', 'Correct a conductor that fights the lid.', { cue: 'The lid closes without pinching anything.', fail: true }),
        leaf('fit-a-wireway-cover-no-conductor-in-the-joint', 'Fit a wireway or gutter cover', 'Close a large raceway.', { cue: 'Every screw is in and no conductor is caught in the cover joint.' }),
      ]),
      node('separation', 'Separation and twist', 'Keeping signals out of power.', { precision: 5, prim: ['inspect'] }, [
        leaf('keep-the-twist-to-the-last-twenty', 'Route a twisted analog pair together', 'Run a signal pair.', { cue: 'The twist is held to within the last 20 mm of the terminal.', notes: 'Untwisting early is invisible under a cover and shows up as noise that gets blamed on the transmitter.' }),
        leaf('hold-the-power-signal-gap-with-ties', 'Separate power from signal by the gap', 'Maintain segregation along a run.', { cue: 'The specified gap is held for the whole run, not only where it is easy.' }),
        leaf('re-tie-a-mixed-bundle-to-its-sides', 'Separate a mixed power and signal bundle', 'Correct a bundle that was run together.', { cue: 'Each goes back on its specified side of the divider.', fail: true }),
        leaf('dress-patch-slack-into-the-manager', 'Patch a copper jumper and dress the slack', 'Make a patch-panel connection.', { cue: 'The slack is in the manager, not hanging in front of the panel.' }),
      ]),
    ]),

    node('glands', 'Glands, shields and bonding', 'Where a cable enters a box, and where the screen goes.', { dexterity: 5, precision: 5, contact: 4, prev: 'common' }, [
      node('gland-plate', 'Holes and gland plates', 'Making the entry before making the cable off.', { prim: ['tool', 'separate'] }, [
        leaf('punch-a-hole-on-the-marked-centre', 'Punch a hole in a gland plate', 'Make a cable entry.', { cue: 'It lands on the marked centre.' }),
        leaf('deburr-a-hole-so-the-gland-seats-flat', 'Deburr a punched hole', 'Prepare a hole for a gland.', { cue: 'Inside and out, so the gland sits flat against the plate.' }),
        leaf('tighten-a-locknut-against-the-plate', 'Fit and tighten the gland locknut', 'Secure a gland to a plate.', { cue: 'It pulls up against the plate with no rock.' }),
        leaf('recover-a-hole-punched-off-centre', 'Recover: a hole was punched off centre', 'Fit a larger plate or a new one; an oversized hole is not sealed by a bigger gland.', { fail: true }),
      ]),
      node('making-off', 'Making a cable off', 'Capturing armour and controlling the screen.', { precision: 5, dexterity: 5 }, [
        leaf('make-off-a-gland-armour-captured', 'Make off a cable gland', 'Terminate an armoured cable into a gland.', { cue: 'The armour or braid is captured and the inner sheath shows the specified length.' }),
        leaf('tighten-a-gland-until-the-cable-cannot-twist', 'Tighten the gland nut', 'Bring a gland seal up.', { cue: 'The seal bites.', verify: 'The cable cannot be twisted by hand.' }),
        leaf('seat-a-liquidtight-ferrule-and-gland', 'Fit liquidtight to a box', 'Terminate flexible conduit.', { cue: 'The ferrule is seated and the hose cannot twist in the gland.' }),
        leaf('capture-armor-under-an-mc-connector', 'Land MC or AC cable in its connector', 'Terminate interlocked or armoured cable.', { cue: 'The armour is captured under the fitting, not merely passing through it.' }),
        leaf('fit-an-ex-gland-to-the-certificate', 'Fit a hazardous-area gland', 'Terminate into an Ex enclosure.', { cue: 'The specified Ex washer is fitted and the armour is clamped as the certificate requires.', partner: 'licensed', skillYears: 'years', capital: 'mid', notes: 'The certificate, not the drawing, is the authority. A correct-looking gland outside its certification is not compliant and is not visibly different.' }),
        leaf('replace-a-damaged-gland-and-tug-it', 'Replace a damaged gland', 'Renew a failed entry.', { cue: 'Locknut off, made off again, tightened.', verify: 'You tug the cable before you close the box.', fail: true }),
      ]),
      node('screens', 'Shields and screens', 'The half of EMC that is a hand decision.', { precision: 5, prim: ['inspect', 'fasten'] }, [
        leaf('land-a-shield-at-one-end-only', 'Land a cable shield at one end only', 'Terminate a screen to the drawing.', { cue: 'One end landed, the other isolated and insulated.', notes: 'Both ends landed is a ground loop. It is two identical motions performed in two places and only one of them is correct.' }),
        leaf('contact-an-emc-clamp-all-around', 'Fit an EMC spring or 360 degree clamp', 'Make a full-circumference screen contact.', { cue: 'It contacts all the way round the braid, with no flat spot.' }),
        leaf('land-a-vfd-shield-on-bare-metal', 'Land a motor cable shield on the drive clamp', 'Terminate a drive cable screen.', { cue: 'On the clamp, never on a paint-covered stud.', verify: 'You check the contact is on bare metal rather than assuming the stud is clean.' }),
        leaf('land-a-servo-shield-on-one-clamp-only', 'Land a servo or encoder lead shield', 'Terminate a feedback cable screen.', { cue: 'On the specified clamp only.' }),
        leaf('recover-a-shield-landed-at-both-ends', 'Recover: a shield was landed at both ends', 'Lift one end and insulate it rather than leaving the loop and filtering the symptom.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
      node('earthing', 'PE and bonding', 'The conductor that has to be continuous everywhere.', { precision: 4, partner: 'licensed' }, [
        leaf('land-pe-under-its-own-stud', 'Land the PE conductor on the earth bar', 'Terminate protective earth.', { cue: 'Under its own stud, never sharing.' }),
        leaf('daisy-chain-pe-to-every-door-and-plate', 'Daisy-chain PE jumpers', 'Bond every removable part.', { cue: 'Each door and gland plate has a continuous path back to the bar.' }),
        leaf('land-a-bond-strap-on-a-door-stud', 'Fit an earth stud on the door and land the strap', 'Bond a hinged door.', { cue: 'The strap lands on a dedicated stud.' }),
        leaf('bond-a-door-and-tug-the-stud', 'Bond a door and prove it', 'Complete a door bond.', { cue: 'The strap is landed.', verify: 'A continuity tug at the stud is solid before the door closes.' }),
        leaf('bond-a-tray-to-conduit-transition', 'Bond a tray-to-conduit fitting', 'Maintain continuity across a containment change.', { cue: 'The fitting is bonded to the tray, not merely mechanically joined to it.', notes: 'Mechanical continuity and electrical continuity look identical and are not the same thing.' }),
        leaf('recover-a-bond-landed-on-paint', 'Recover: a bond was found landed on paint', 'Clean back to bare metal, reland and tug it.', { fail: true, notes: 'The install was mechanically perfect and electrically absent.' }),
      ]),
    ]),

    node('tray', 'Tray, conduit and pulling', 'Field containment, and getting conductors through it.', { setting: 'industrial', contact: 5, dexterity: 4, partner: 'licensed', horizon: 'long', prev: 'common', capital: 'mid' }, [
      node('cable-tray', 'Cable tray', 'Open containment, where the jacket is the only protection.', { prim: ['fasten', 'transfer'] }, [
        leaf('fit-a-dropout-so-the-edge-cannot-cut', 'Fit a cable-tray dropout', 'Take cables out of a tray.', { cue: 'The radius is the specified bend and the tray edge cannot reach the jacket.' }),
        leaf('land-a-tray-cover-every-fastener', 'Land a tray cover', 'Close a run of tray.', { cue: 'Every fastener is in, so the cover cannot slide when somebody walks the tray.' }),
        leaf('fit-a-divider-and-hold-the-sides', 'Fit a tray divider', 'Segregate a tray run.', { cue: 'Power and signal stay on their specified sides for the whole run.' }),
        leaf('cleat-a-cable-so-it-cannot-walk', 'Cleat a cable to the tray', 'Restrain a cable at spacing.', { cue: 'At the specified spacing, torqued so the cable cannot walk under thermal cycling.' }),
        leaf('brace-tray-or-conduit-at-spacing', 'Fit seismic bracing at the specified spacing', 'Restrain containment against movement.', { cue: 'At spacing, with the hardware locked.' }),
        leaf('recover-a-cable-that-walked-out-of-its-cleats', 'Recover: a cable walked out of its cleats', 'Re-lay it to radius and re-cleat rather than pulling it back and retightening.', { fail: true, contact: 5 }),
      ]),
      node('conduit', 'Conduit', 'Steel tube that has to be cut, bent and threaded correctly or it eats the cable.', { precision: 5, contact: 5, skillYears: 'years' }, [
        leaf('cut-square-ream-and-check-the-mouth', 'Cut conduit square and ream it', 'Prepare a conduit end.', { cue: 'Square, reamed inside and out.', verify: 'A finger round the mouth finds no burr, because the burr is what strips the jacket on the pull.' }),
        leaf('bend-to-the-mark-not-close', 'Bend conduit to the mark', 'Form an offset or kick.', { cue: 'The offset lands on the layout, not near it.', dexterity: 3, contact: 5 }),
        leaf('thread-conduit-and-start-by-fingers', 'Thread conduit to length', 'Cut a conduit thread.', { cue: 'The specified thread length, and the fitting starts by fingers.' }),
        leaf('make-up-a-body-so-the-gasket-seats', 'Make up a conduit body', 'Install an LB, LL or LR.', { cue: 'The cover gasket will seat and the conductors can still be pulled through.' }),
        leaf('pour-a-sealing-fitting-to-the-mark', 'Fit and pour a sealing fitting', 'Install a poured seal.', { cue: 'Packed with the specified compound and poured to the mark.', partner: 'licensed', notes: 'A seal poured short is a seal in name only, and once it has set nobody can tell from outside.' }),
        leaf('make-an-ex-union-to-thread-engagement', 'Fit an explosion-proof union or boundary seal', 'Make a hazardous-area boundary.', { cue: 'The threads reach the specified engagement, counted rather than felt.', skillYears: 'years' }),
        leaf('bush-a-gutter-nipple', 'Land a gutter nipple and bush it', 'Join enclosures with a nipple.', { cue: 'Bushed, so a pull cannot burn a jacket on the thread.' }),
        leaf('walk-a-run-hand-on-every-doubtful-fitting', 'Trace a conduit or tray run on foot', 'Verify a route physically.', { cue: 'You walk the whole run and put a hand on every fitting that is in doubt.', prim: ['locomote', 'inspect'], contact: 3 }),
        leaf('recover-a-burr-found-after-the-pull', 'Recover: a burr was found after conductors were pulled', 'Withdraw, ream and repull; a jacket cut inside a conduit cannot be repaired in place.', { fail: true }),
      ]),
      node('pulling', 'Pulling conductors', 'The one genuinely two-person act in the domain.', { contact: 5, prim: ['bimanual', 'language', 'transfer'], skillYears: 'months' }, [
        leaf('push-fish-tape-without-kinking-at-the-sheave', 'Push fish tape to the far box', 'Run a fish tape through a conduit.', { cue: 'It reaches the far box with no kink at the sheave.' }),
        leaf('pull-a-mule-tape-and-cap-both-ends', 'Pull a mule tape after the fish', 'Install a pulling line.', { cue: 'Both ends are capped or tied so it cannot fall back into the run.' }),
        leaf('pull-with-a-partner-on-the-count', 'Pull conductors with a partner', 'Two-person conductor pull.', { cue: 'One feeds without letting the jacket twist, one pulls on the count.', notes: 'Force shared between two people through a compliant medium, coordinated verbally. There is nothing like it in any public set.' }),
        leaf('leave-slack-as-a-loop-not-a-coil', 'Leave the specified slack in the box', 'Terminate a pull.', { cue: 'A loop, not a coil that fills the box and fights the cover.' }),
        leaf('phase-tape-both-ends-before-landing', 'Phase-tape conductors at both ends', 'Identify conductors after a pull.', { cue: 'Both ends taped to the colour map before anything is landed.', verify: 'The map is read at both ends, not carried in your head between them.' }),
        leaf('recover-a-jacket-damaged-on-the-pull', 'Recover: the jacket was damaged on the pull', 'Pull it back out and replace the length rather than taping it in the box.', { fail: true }),
      ]),
    ]),

    node('lugs', 'Lugs, crimps and bus joints', 'Big copper, where the torque figure is printed on the part.', { contact: 5, precision: 5, dexterity: 4, partner: 'licensed', prev: 'common' }, [
      node('rings-and-studs', 'Rings and studs', 'Stacking order on a stud is a rule, not a preference.', { dexterity: 5 }, [
        leaf('land-a-ring-washer-nut-in-order', 'Land a single ring terminal on a stud', 'Terminate to a stud.', { cue: 'Washer and nut in the correct order, brought to finger-tight first.' }),
        leaf('stack-two-rings-larger-on-the-bottom', 'Land two rings on one stud', 'Stack two terminals.', { cue: 'The larger ring goes on the bottom, then finger-tight.' }),
        leaf('torque-to-the-click-and-stop', 'Torque a lug to the click', 'Bring a terminal up to spec.', { cue: 'You stop on the click, with no bounce past it.', notes: 'The click and the click-plus-a-nudge are the same sound and the same footage. Only the wrist knows.' }),
        leaf('recover-a-lug-torqued-past-the-click', 'Recover: a lug went past the click', 'Back it off and retorque from slack rather than accepting it.', { fail: true, notes: 'Overtorque creeps and loosens later. Nothing about the joint looks different today.' }),
      ]),
      node('crimping', 'Crimps and shrink', 'A joint you cannot inspect once it is made.', { contact: 5, precision: 5, capital: 'mid' }, [
        leaf('hydraulic-crimp-until-the-die-completes', 'Hydraulic-crimp a lug', 'Compress a lug onto a conductor.', { cue: 'The die completes its cycle.', verify: 'The crimp carries the specified witness mark, which is the only external evidence the joint is sound.' }),
        leaf('shrink-a-lug-until-the-adhesive-wets', 'Heat-shrink a lug', 'Insulate a crimped termination.', { cue: 'No copper remains exposed and the adhesive has wet the jacket.' }),
        leaf('land-a-lug-to-the-printed-spec', 'Land a lug on bus or breaker', 'Terminate to a device.', { cue: 'Torqued to the spec printed on the device, read off the label rather than remembered.' }),
        leaf('two-person-land-holding-the-radius', 'Two-person land of a large cable', 'Terminate a heavy cable with help.', { cue: 'One holds the bend radius while the other lands and torques.', prim: ['bimanual', 'language'], notes: 'One person is doing nothing visible and is doing the harder half.' }),
        leaf('recover-a-crimp-with-no-witness-mark', 'Recover: a crimp shows no witness mark', 'Cut it off and recrimp; an uncertified crimp is not made good by a second squeeze.', { fail: true }),
      ]),
      node('bus-joints', 'Bus joints', 'Flat copper on flat copper.', { precision: 5, contact: 5 }, [
        leaf('clean-the-faces-and-torque-the-pattern', 'Fit a busbar joint', 'Make a bolted bus connection.', { cue: 'Faces cleaned, then torqued in the specified pattern.' }),
        leaf('recover-shrink-over-a-bus-joint', 'Recover heat-shrink over a bus joint', 'Insulate a completed bus joint.', { cue: 'No copper remains exposed anywhere around the joint.' }),
        leaf('seat-phase-barriers-to-the-stop', 'Fit phase barriers between poles', 'Install inter-phase barriers.', { cue: 'Each barrier is home against its stop.' }),
        leaf('torque-a-bus-plug-to-the-engagement-marks', 'Torque a bus plug onto busway', 'Install a tap box.', { cue: 'The phase engagement marks line up before the fixings come up.', verify: 'The marks are read after torque, because torque can pull it off engagement.' }),
        leaf('recover-a-bus-joint-that-did-not-clean-up', 'Recover: a bus face would not clean up', 'Stop and have the bar assessed rather than torquing onto pitted copper.', { fail: true, partner: 'regulated' }),
      ]),
    ]),

    node('motors', 'Motors, drives and feedback', 'The connection between the panel and something that turns.', { contact: 4, precision: 5, dexterity: 4, prev: 'common', skillYears: 'years' }, [
      node('motor-box', 'The motor terminal box', 'A small box on a hot machine.', { contact: 5, partner: 'licensed' }, [
        leaf('land-u-v-w-on-the-terminal-board', 'Land U-V-W in a motor box', 'Terminate a motor cable.', { cue: 'The gland is made off, the armour or braid landed, and the phases on the marked terminals.' }),
        leaf('close-a-motor-box-with-no-lead-pinched', 'Bond and close the motor box lid', 'Shut a terminal box.', { cue: 'The gasket sits even and no lead is caught in the joint.', verify: 'You look round the whole gasket line before the last screw.' }),
        leaf('bump-for-rotation-coupling-off', 'Bump a motor for rotation', 'Check direction before coupling.', { cue: 'The coupling is disconnected and hands are clear before it is bumped.', notes: 'Checking rotation coupled is how a driven machine gets destroyed in a quarter turn.' }),
        leaf('land-a-motor-space-heater', 'Fit a motor space heater', 'Terminate an anti-condensation heater.', { cue: 'On the specified terminals, which are not the ones next to them.' }),
        leaf('fit-a-brake-coil-and-tug-the-connector', 'Fit a brake coil or module', 'Terminate a motor brake.', { cue: 'Landed.', verify: 'You tug the connector before the cover goes on.' }),
        leaf('re-terminate-a-cooked-motor-lead', 'Re-terminate a cooked motor lead', 'Repair a heat-damaged termination.', { cue: 'Cut back to clean copper, re-lugged, re-shrunk and re-torqued.', fail: true }),
      ]),
      node('drives', 'Drives and starters', 'The panel end of a motor circuit.', { precision: 5, dexterity: 4 }, [
        leaf('land-vfd-leads-u-v-w-in-order', 'Land VFD motor leads in order', 'Terminate drive output.', { cue: 'U-V-W in order, lugs torqued.' }),
        leaf('fit-a-line-reactor-line-and-load', 'Fit a line reactor or DC choke', 'Install a drive reactor.', { cue: 'Line and load the correct way round, read off the marking.', notes: 'Reversed, it works. It just does not do the thing it was fitted for.' }),
        leaf('land-a-braking-resistor-with-relief', 'Fit a braking resistor', 'Install a dynamic braking resistor.', { cue: 'Both leads landed with strain relief at the resistor end.' }),
        leaf('land-a-soft-starter-line-and-load', 'Land a soft-starter line and load', 'Terminate a soft starter.', { cue: 'The correct way round, with the lugs torqued to spec.' }),
        leaf('interlock-a-bypass-contactor', 'Fit a bypass contactor interlock', 'Prevent simultaneous closure.', { cue: 'Starter and bypass cannot close together.', verify: 'You operate each and confirm the other is blocked.' }),
        leaf('recover-a-drive-that-ran-the-wrong-way', 'Recover: the drive ran the wrong rotation', 'Isolate and swap two phases at the drive rather than reversing it in a parameter.', { fail: true, notes: 'Correcting it in a parameter leaves the terminals disagreeing with the label for the life of the machine.' }),
      ]),
      node('feedback', 'Encoders and feedback', 'Small precise things on a rotating shaft.', { precision: 5, dexterity: 5, contact: 4 }, [
        leaf('fit-an-encoder-coupling-with-no-side-load', 'Fit an encoder coupling to the gap', 'Mount a feedback coupling.', { cue: 'The specified gap, with no side load on the shaft.' }),
        leaf('align-encoder-marks-before-clamping', 'Align an encoder before tightening', 'Set encoder orientation.', { cue: 'The shaft marks line up before the clamp goes tight.' }),
        leaf('set-a-resolver-gap-and-lock-it', 'Fit a resolver on the motor', 'Mount and set a resolver.', { cue: 'The gap is set and the clamp locked.' }),
        leaf('route-a-festoon-so-it-cannot-pinch', 'Route a festoon or trailing cable', 'Install a moving cable run.', { cue: 'The loop cannot pinch anywhere across the full travel.', verify: 'You run the machine through its travel and watch the loop.', contact: 3 }),
        leaf('recover-a-festoon-that-pinched-on-travel', 'Recover: the festoon pinched at full travel', 'Re-route the loop and run the travel again before it is handed over.', { fail: true }),
      ]),
    ]),

    node('controls', 'Starters, pilot devices and stations', 'The parts an operator touches.', { dexterity: 5, precision: 4, contact: 3, prev: 'common' }, [
      node('starters', 'Starters and protection', 'Contactors and the things that clip onto them.', { precision: 4 }, [
        leaf('pull-a-fuse-with-the-element-visible', 'Pull a fuse with a puller', 'Remove a fuse for inspection.', { cue: 'Held so the element is visible without touching either cap.', partner: 'licensed' }),
        leaf('insert-a-fuse-until-both-clips-grab', 'Insert a replacement fuse', 'Seat a fuse into both clips of a holder.', { cue: 'Both clips grab; one-clip contact is a hot joint waiting.', verify: 'The rating is read off the body against the chart.' }),
        leaf('set-an-overload-to-the-motor-fla', 'Clip on an overload and set the dial', 'Fit and set thermal protection.', { cue: 'Set to the motor nameplate FLA, read off the motor rather than the drawing.' }),
        leaf('latch-an-auxiliary-contact-block', 'Fit an auxiliary contact block', 'Add contacts to a starter.', { cue: 'It latches onto the body with no gap at the seam.' }),
        leaf('interlock-two-contactors-mechanically', 'Fit a mechanical interlock between contactors', 'Prevent both coils pulling in.', { cue: 'Neither can close while the other is closed.', verify: 'You push each armature by hand and confirm the block.' }),
        leaf('recover-a-fuse-of-the-wrong-rating', 'Recover: a fuse of the wrong rating was found fitted', 'Pull it and fit the rated part; the circuit is treated as having been unprotected.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
      node('pilot-devices', 'Pilot devices and stations', 'Handles, lamps and buttons.', { dexterity: 5 }, [
        leaf('align-a-selector-to-the-engraved-position', 'Fit a selector-switch cam and operator', 'Assemble a rotary selector.', { cue: 'The handle points at the engraved position in every detent.', notes: 'A selector one position out reads correctly to the operator and is wrong. Nothing about the assembly looks different.' }),
        leaf('land-an-illuminated-head-lamp-module', 'Fit an illuminated head and lamp module', 'Assemble an indicator.', { cue: 'The module seats and the head locks.' }),
        leaf('land-and-close-a-start-stop-station', 'Wire a start-stop station', 'Build out a local station.', { cue: 'Landed, dressed and the enclosure closed.' }),
        leaf('try-every-button-before-you-hang-it', 'Land a pendant station', 'Terminate and hang a pendant.', { cue: 'The cable is strain-relieved at the pendant.', verify: 'Every button is tried before it is hung, because it is much harder to reach afterwards.', contact: 4 }),
        leaf('land-a-foot-switch-so-it-cannot-slide', 'Fit a foot switch', 'Install a floor-operated switch.', { cue: 'The pedal cannot slide on the floor under a foot.' }),
        leaf('land-a-stack-light-to-the-colour-map', 'Fit a stack light', 'Install and terminate a tower light.', { cue: 'On the specified post, colours landed to the map.' }),
        leaf('aim-a-beacon-at-the-operator-stance', 'Fit and aim a horn or beacon', 'Install an audible or visible alarm.', { cue: 'It is visible or audible from where the operator actually stands.', notes: 'Aimed at the room instead of at the person is the standard error and it is only detectable by going and standing there.' }),
        leaf('land-a-hoa-at-the-engraved-position', 'Land a lighting contactor and its hand-off-auto', 'Install a lighting control.', { cue: 'The handle points at the engraved position.' }),
        leaf('aim-a-photocell-away-from-its-fixture', 'Fit and aim a photocell', 'Install a daylight sensor.', { cue: 'Aimed away from the fixture it switches.', notes: 'Aimed at its own lamp it oscillates all night. The wiring is perfect.' }),
        leaf('recover-a-selector-one-position-out', 'Recover: a selector reads one position out', 'Strip the operator and reclock the cam rather than re-engraving the plate.', { fail: true }),
      ]),
      node('field-devices', 'Field devices', 'Things bolted to a machine.', { precision: 5, dexterity: 4, contact: 4 }, [
        leaf('seat-a-solenoid-coil-and-snug-the-nut', 'Push a solenoid coil onto its stem', 'Fit a valve coil.', { cue: 'It seats fully and the nut is snug, not tight.' }),
        leaf('land-a-pneumatic-pilot-and-tug-the-tube', 'Land a pneumatic pilot', 'Connect a pilot line.', { cue: 'Landed.', verify: 'The tube is tugged before pressure goes on.' }),
        leaf('adjust-a-limit-dog-to-the-marked-travel', 'Fit a limit switch and adjust the dog', 'Set a travel limit.', { cue: 'It trips at the marked travel, not before it.', precision: 5 }),
        leaf('cam-adjust-a-rotary-limit-and-lock-it', 'Cam-adjust a rotary limit', 'Set a rotary limit switch.', { cue: 'Each cam is set and its screw locked.' }),
        leaf('zero-a-transmitter-at-the-housing-and-cap-it', 'Physically zero a field transmitter', 'Zero an instrument at the device.', { cue: 'Zeroed at the housing and the cover capped afterwards.' }),
        leaf('recover-a-limit-that-trips-early', 'Recover: a limit trips before the marked travel', 'Reset the dog to the mark rather than moving the mark to the dog.', { fail: true }),
      ]),
    ]),

    node('safety', 'Safety circuits and interlocks', 'Circuits whose whole purpose is to fail in one direction.', { precision: 5, dexterity: 4, contact: 3, partner: 'licensed', skillYears: 'years', prev: 'common' }, [
      node('stops-and-doors', 'Stops and door interlocks', 'The first line.', {}, [
        leaf('press-an-e-stop-and-reset-it', 'Press an e-stop and reset it', 'Prove a stop device.', { cue: 'It latches on press.', verify: 'It resets only with the required twist, never by pressing again.' }),
        leaf('adjust-an-actuator-so-it-just-makes', 'Fit and adjust a door-switch actuator', 'Set a door interlock.', { cue: 'The switch just makes as the door closes, with no over-travel.' }),
        leaf('try-a-door-interlock-against-a-start', 'Try the door interlock', 'Prove an interlock does its job.', { cue: 'Door open, and a start is prevented.', verify: 'You attempt the start rather than trusting the wiring.', notes: 'Wiring an interlock and proving an interlock are entirely different acts and produce identical footage.' }),
        leaf('fit-a-captured-hasp-so-the-door-cannot-close', 'Fit an interlock key or captured hasp', 'Physically prevent closure.', { cue: 'The door cannot close without the key or hasp in place.' }),
        leaf('recover-an-e-stop-that-reset-by-pressing', 'Recover: an e-stop reset without the twist', 'Replace the head; a stop that self-resets is not a stop.', { fail: true, partner: 'licensed' }),
      ]),
      node('trapped-key', 'Trapped key and sequence', 'Safety enforced by geometry.', { precision: 5 }, [
        leaf('fit-a-trapped-key-tied-to-the-isolator', 'Fit a trapped-key or Kirk interlock', 'Install a key interlock.', { cue: 'The key will not come out until the isolator is off.' }),
        leaf('try-a-key-exchange-in-the-wrong-order', 'Try a Castell key exchange sequence', 'Prove an interlock sequence.', { cue: 'The correct order works.', verify: 'The wrong order is attempted and must block. Proving the failure path is the test.', notes: 'You have to deliberately try to do it wrong. Almost nothing in a demonstration corpus contains an intentional wrong attempt.' }),
        leaf('recover-a-key-that-came-out-live', 'Recover: the key released with the isolator still on', 'Take the machine out of service until the interlock is corrected.', { fail: true, notes: 'The whole safety case rests on the key being trapped. If it releases early there is no partial mitigation.' }),
      ]),
      node('presence-sensing', 'Presence sensing', 'Fields and mats.', { precision: 5, contact: 2, prim: ['inspect'] }, [
        leaf('square-a-light-curtain-pair', 'Square a light-curtain pair', 'Align an optical guard.', { cue: 'Both brackets plumb and the beams facing each other.' }),
        leaf('align-a-scanner-to-the-marked-field', 'Align an area scanner or safety camera', 'Set a sensing field.', { cue: 'On the marked field, with the bracket locked afterwards.' }),
        leaf('land-a-mat-so-a-break-shows-as-a-trip', 'Fit a safety mat or bumper', 'Install a pressure-sensitive device.', { cue: 'The series circuit is landed so a break shows up as a trip, not as a silence.', notes: 'Fail-to-danger and fail-to-safe are the same install with two conductors swapped.' }),
        leaf('string-a-pull-cord-and-prove-both-ends', 'String a pull-cord along a conveyor', 'Install an emergency pull-wire.', { cue: 'Tensioned to spec.', verify: 'Both ends are pulled and both must trip.' }),
        leaf('recover-a-mat-wired-fail-to-danger', 'Recover: a mat circuit was wired so a break reads healthy', 'Reland the series circuit and prove it by breaking it deliberately.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
      node('control-devices', 'Two-hand, enabling and relays', 'Devices that must not be defeatable.', { precision: 5 }, [
        leaf('fit-two-hand-control-at-the-centres', 'Fit a two-hand control station', 'Install a two-hand device.', { cue: 'At the specified centres and height, so it cannot be operated one-handed.' }),
        leaf('confirm-an-enabling-switch-does-not-latch', 'Fit an enabling or hold-to-run switch', 'Install a hold-to-run device.', { cue: 'Fitted and landed.', verify: 'You confirm it does not latch, which is the one property that matters.' }),
        leaf('land-a-safety-relay-feedback-loops', 'Land a safety relay', 'Terminate a safety monitoring relay.', { cue: 'Every feedback loop is on its specified terminal.' }),
        leaf('recover-an-enabling-switch-that-latched', 'Recover: an enabling switch latched', 'Replace it; a hold-to-run that holds itself defeats the function entirely.', { fail: true }),
      ]),
    ]),

    node('signal', 'Signal, I/O, fibre and comms', 'Low energy, high consequence, and mostly invisible when wrong.', { dexterity: 5, precision: 5, contact: 2, partner: 'site', prev: 'common' }, [
      node('loops', 'Analog loops', 'Four to twenty milliamps.', { precision: 5 }, [
        leaf('land-a-4-20-pair-with-a-service-loop', 'Land a 4-20 mA loop at both ends', 'Terminate an analog loop.', { cue: 'Both ends landed and a service loop left at the transmitter.' }),
        leaf('land-an-isolator-so-the-loop-cannot-reverse', 'Fit an analog isolator', 'Install a loop isolator.', { cue: 'In and out landed so the loop cannot be connected reversed.' }),
        leaf('recover-a-loop-reading-at-the-rail', 'Recover: a loop reads hard over or dead', 'Check the polarity and the isolator direction before suspecting the transmitter.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
      node('io-hardware', 'I/O hardware', 'Modules that clip and latch.', { dexterity: 5, capital: 'mid' }, [
        leaf('seat-every-module-until-the-latch-holds', 'Fit a remote I/O rack', 'Install a distributed I/O node.', { cue: 'Bus and power landed, and every module seated until its latch holds.' }),
        leaf('swap-a-plc-module-and-close-the-latch', 'Swap a PLC module', 'Replace a module in service.', { cue: 'Power handled as specified, old out, new in, latch closed.', fail: true }),
        leaf('lock-both-ejectors-on-an-idc-header', 'Seat a ribbon or IDC header', 'Mate a board-level connector.', { cue: 'Both ejector latches lock.', notes: 'A header seated on one latch works on the bench and drops out on the machine.' }),
      ]),
      node('copper-comms', 'Copper comms', 'Structured cabling in an industrial box.', { precision: 5, dexterity: 5 }, [
        leaf('punch-a-keystone-and-tug-each-conductor', 'Punch down a keystone to 568B', 'Terminate a data jack.', { cue: 'To the 568B map.', verify: 'Each conductor is tugged individually after punching.' }),
        leaf('ring-a-pair-after-landing-the-clip', 'Ring a pair with a toner', 'Identify a pair.', { cue: 'The clip is landed on the specified pair before the tone goes on.', prim: ['inspect', 'tool'] }),
        leaf('recover-a-pair-punched-to-the-wrong-map', 'Recover: a jack was punched to the wrong colour map', 'Repunch to the specified map at both ends, not one.', { fail: true }),
      ]),
      node('fibre', 'Fibre', 'Glass with a minimum radius and no tolerance for a fingerprint.', { precision: 5, dexterity: 5, contact: 1, capital: 'mid' }, [
        leaf('hold-the-bend-radius-at-every-corner', 'Land fibre in the tray', 'Route fibre through a tray.', { cue: 'The minimum bend radius is held at every corner, including the ones behind the tray.' }),
        leaf('clean-an-lc-ferrule-and-mate-to-the-click', 'Clean an LC ferrule and mate it', 'Make a fibre connection.', { cue: 'Cleaned, mated to the click, and the unused side capped.', notes: 'A fingerprint on a ferrule is a link that works at short range and fails at length. Cleaning is invisible and mandatory.' }),
        leaf('coil-a-fibre-loop-so-it-cannot-spring', 'Coil a fibre service loop', 'Store fibre slack.', { cue: 'To the marked diameter, tied so it cannot spring out of the tray.' }),
        leaf('close-a-splice-tray-with-no-fibre-pinched', 'Land a fibre splice tray', 'Complete a splice enclosure.', { cue: 'The specified loops coiled and the tray closed with nothing pinched in the lid.' }),
        leaf('mate-a-patch-fibre-and-cap-the-adapter', 'Mate fibre on a patch panel', 'Patch a fibre link.', { cue: 'Clicked home, with the unused adapter capped.' }),
        leaf('recover-a-fibre-pinched-in-a-tray-lid', 'Recover: a fibre was pinched closing a tray', 'Treat the span as broken and respice; a pinched fibre passes light until it does not.', { fail: true, notes: 'It tests good on the day and fails months later with no event to point at.' }),
      ]),
    ]),

    node('distribution', 'Panelboards, breakers and bus', 'Where the building gets its power divided up.', { contact: 4, precision: 4, partner: 'licensed', skillYears: 'years', capital: 'mid', prev: 'common' }, [
      node('branch-circuits', 'Branch circuits', 'Getting the right conductor on the right bar.', { precision: 5, dexterity: 4 }, [
        leaf('seat-a-stab-on-the-correct-phase', 'Land a panelboard branch breaker', 'Fit a plug-in breaker.', { cue: 'On the correct phase, with the stab fully seated.', verify: 'You confirm the phase from the bus layout rather than the position count.' }),
        leaf('land-a-neutral-under-its-own-screw', 'Land a neutral on the bar', 'Terminate a neutral.', { cue: 'Under its own screw, unless the bar is rated for two.', notes: 'Two neutrals under one screw is the most common panel defect there is, and it looks entirely normal.' }),
        leaf('land-an-isolated-ground-on-its-own-bar', 'Land an isolated-ground conductor', 'Terminate an isolated earth.', { cue: 'On the isolated bar only, never on the common bar next to it.' }),
        leaf('torque-a-bolt-on-breaker-to-spec', 'Fit a bolt-on breaker', 'Install a bolted breaker.', { cue: 'The bus bolts torqued to the printed spec.' }),
        leaf('recover-two-neutrals-under-one-screw', 'Recover: two neutrals were found under one screw', 'Separate them onto their own screws or fit a rated bar.', { fail: true }),
      ]),
      node('protection', 'Surge, transformers and capacitors', 'Devices that sit across the supply.', { precision: 4 }, [
        leaf('land-pe-first-on-an-spd', 'Fit an SPD or surge module', 'Install surge protection.', { cue: 'PE is landed first, before any phase.', notes: 'The order is the whole safety content and the finished install looks identical either way.' }),
        leaf('land-a-cpt-with-its-primary-fuses', 'Land a PT or control-power transformer', 'Install a control transformer.', { cue: 'Primary and secondary on their marked terminals, with the specified primary fuses fitted.' }),
        leaf('land-pe-before-phases-on-a-capacitor-bank', 'Fit a capacitor bank or filter module', 'Install power factor equipment.', { cue: 'PE before phases, every time.' }),
        leaf('fit-a-surge-module-on-the-incoming', 'Fit a surge or filter module on the incoming', 'Install input protection.', { cue: 'On the incoming terminals as drawn.' }),
        leaf('recover-an-spd-landed-phases-first', 'Recover: an SPD went in with PE last', 'Strip it back and reland PE first rather than leaving the order wrong.', { fail: true, partner: 'licensed' }),
      ]),
    ]),

    node('switchgear', 'Switchgear, batteries and metering', 'The heaviest and most procedural end of the trade.', { contact: 5, precision: 4, partner: 'regulated', skillYears: 'years', capital: 'capex', prev: 'uncommon' }, [
      node('racking', 'Racking and shutters', 'Moving a device between defined positions.', { dexterity: 3 }, [
        leaf('rack-to-the-first-mechanical-stop', 'Rack a withdrawable bucket to the first stop', 'Begin withdrawing a bucket.', { cue: 'It reaches the first mechanical stop and is held there.' }),
        leaf('rack-out-until-the-indicator-shows-isolated', 'Rack a bucket out to isolated', 'Withdraw a bucket fully.', { cue: 'The indicator reads isolated.', verify: 'The indicator is the confirmation, never the feel of the handle.' }),
        leaf('rack-a-ground-and-test-after-indications-match', 'Rack a ground-and-test device', 'Insert an earthing truck.', { cue: 'Only after shutters and indications match the intended state.' }),
        leaf('fit-shutters-that-cannot-be-pushed-off', 'Fit switchgear shutters in service position', 'Restore shutter guarding.', { cue: 'In the service position.', verify: 'You confirm they cannot be pushed off by hand.' }),
        leaf('padlock-a-shutter-and-try-the-handle', 'Padlock a shutter or racking socket', 'Secure a racking point.', { cue: 'The padlock is on.', verify: 'You try the racking handle and it must not engage.' }),
        leaf('recover-a-bucket-that-will-not-rack-out', 'Recover: a bucket will not rack to isolated', 'Stop and have the mechanism looked at; a bucket forced past a stop is not isolated.', { fail: true, contact: 5 }),
      ]),
      node('metering', 'CTs and metering', 'Where an open circuit is the dangerous one.', { precision: 5, dexterity: 4 }, [
        leaf('fit-a-ct-arrow-toward-the-load', 'Fit a CT on the correct phase', 'Install a current transformer.', { cue: 'On the correct phase with the direction arrow toward the load.', notes: 'Reversed, every reading is plausible and every sign is wrong.' }),
        leaf('short-a-ct-before-you-open-the-circuit', 'Short a CT with its shorting link', 'Make a CT safe before breaking the loop.', { cue: 'The link is in before the circuit is opened, never after.', notes: 'An open CT secondary on a live primary generates lethal voltage. The correct order is unremarkable and the wrong order is unrecoverable.' }),
        leaf('remove-a-shorting-link-only-after-restoring', 'Remove a CT shorting link', 'Return a CT to service.', { cue: 'Only after the meter or relay is back in the circuit.' }),
        leaf('recover-a-ct-found-open', 'Recover: a CT secondary was found open on a live primary', 'Clear the area and isolate the primary before anyone goes near the terminals.', { fail: true, partner: 'regulated', notes: 'The correct first action is to move people away, not to close the link.' }),
      ]),
      node('batteries', 'Battery systems', 'Stored energy that cannot be switched off.', { contact: 5, precision: 4 }, [
        leaf('slide-a-ups-tray-until-the-connector-mates', 'Slide a UPS battery tray home', 'Install a battery tray.', { cue: 'It goes home until the connector mates positively.' }),
        leaf('torque-battery-interconnects-with-the-wrench-clear', 'Land battery interconnects', 'Bolt up a battery string.', { cue: 'Correct polarity, torqued, with the wrench kept off the opposite polarity throughout.', notes: 'A wrench bridging two posts is the failure. Where the tool is not is the content of the leaf.' }),
        leaf('fit-a-spill-tray-before-the-last-jumper', 'Fit a battery spill tray or isolation wrap', 'Prepare containment before energising.', { cue: 'It is in place before the last jumper goes on, not afterwards.' }),
        leaf('recover-a-wrench-bridged-across-posts', 'Recover: a tool bridged two battery posts', 'Let it go, clear back, and isolate the string before anything is retrieved.', { fail: true, contact: 5 }),
      ]),
      node('generation', 'Generators and transfer', 'Second sources.', { precision: 4 }, [
        leaf('land-an-ats-engine-start-pair', 'Fit an ATS auxiliary and land engine-start', 'Terminate transfer switch controls.', { cue: 'The engine-start pair on its specified terminals.' }),
        leaf('phase-tape-generator-lugs-to-the-house', 'Land generator lugs on the bus', 'Terminate a generator feed.', { cue: 'Phase tape matches the house convention, checked against the existing bus rather than the drawing alone.' }),
        leaf('recover-generator-phasing-that-disagrees', 'Recover: generator phasing disagrees with the house', 'Stop and prove rotation physically before any transfer is attempted.', { fail: true, partner: 'regulated' }),
      ]),
    ]),

    node('loto', 'Isolation, LOTO and physical test', 'Proving a state rather than assuming one.', { partner: 'licensed', skillYears: 'years', contact: 2, precision: 3, prev: 'common' }, [
      node('isolation', 'Isolate and lock', 'Making a circuit dead and keeping it dead.', { dexterity: 3 }, [
        leaf('isolate-then-try-the-handle-again', 'Isolate a circuit physically', 'Open, rack or pull to isolate.', { cue: 'Isolated by a physical means.', verify: 'You try the handle again after isolating, because the first operation is not the proof.' }),
        leaf('fit-a-hasp-and-snap-a-lock-on-it', 'Fit a padlock hasp on the isolator', 'Apply a lock point.', { cue: 'The hasp is on and your lock is snapped through it.' }),
        leaf('apply-loto-and-fail-the-try-start', 'Apply LOTO', 'Complete a lock-out.', { cue: 'Isolator off, lock on.', verify: 'The try-start fails. Without the try-start this is not a lock-out, it is a lock hanging on a switch.' }),
        leaf('remove-loto-in-reverse-order', 'Remove LOTO in reverse order', 'Restore a circuit.', { cue: 'Reverse order, with the lock returned to the board rather than pocketed.' }),
        leaf('recover-a-lock-found-on-a-live-isolator', 'Recover: a lock was found on an isolator that was still live', 'Treat the whole isolation as invalid and start it again from the top.', { fail: true, prim: ['language', 'recover'] }),
      ]),
      node('proving', 'Proving dead', 'The canonical verification in the trade.', { precision: 4, prim: ['inspect', 'tool'] }, [
        leaf('live-dead-live-at-the-test-point', 'Hold a live-dead-live stance', 'Prove a circuit dead.', { cue: 'Prove the tester, prove dead, prove the tester again.', verify: 'The instrument is proven after the reading as well as before it, which is the half people drop.', notes: 'A failed tester reads dead on a live circuit. Only the second proving catches it.' }),
        leaf('two-hand-probe-then-put-the-probes-away', 'Two-hand probe a dead circuit', 'Take a reading after isolation.', { cue: 'Both hands on the probes, and the probes put away before anything else starts.' }),
        leaf('cap-test-plugs-after-use', 'Fit test plugs or probe ports and cap them', 'Use permanent test points.', { cue: 'Capped after use, so the port is not an open path.' }),
        leaf('recover-a-tester-that-failed-the-second-prove', 'Recover: the tester failed the second proving', 'Discard the reading entirely and re-prove with a known-good instrument.', { fail: true, notes: 'The dead reading was meaningless. This is the only failure the live-dead-live sequence exists to catch.' }),
      ]),
      node('instrument-test', 'Instrument testing', 'Tests with their own setup and their own undo.', { precision: 5, capital: 'mid' }, [
        leaf('megger-prep-then-hands-off', 'Prepare for an insulation test', 'Set up a megger test.', { cue: 'Isolated, shorted or open as the procedure says, leads landed, then both hands off before the test runs.' }),
        leaf('restore-the-pre-test-state-after-meggering', 'Remove megger leads and restore', 'Finish an insulation test.', { cue: 'The circuit is back in its pre-test state before you leave the panel.', notes: 'A test leaves the circuit in a configuration nobody expects. The undo is the part that gets forgotten and it strands the plant.' }),
        leaf('loop-check-jumper-then-remove-it', 'Loop-check a circuit physically', 'Prove a signal path end to end.', { cue: 'Jumper the field end, watch the other end.', verify: 'The jumper comes out again, checked rather than assumed.' }),
        leaf('recover-a-jumper-left-in-after-a-loop-check', 'Recover: a test jumper was left in', 'Remove it and re-check the loop, because the signal it proved was your own jumper.', { fail: true }),
      ]),
    ]),

    node('environment', 'Panel climate, sealing and labelling', 'Everything that decides whether the panel is still working in five years.', { dexterity: 4, precision: 3, contact: 2, prev: 'common' }, [
      node('climate', 'Heat, damp and airflow', 'A sealed steel box in a plant.', { dexterity: 3 }, [
        leaf('fit-an-anti-condensation-heater', 'Fit an anti-condensation heater', 'Install a panel heater.', { cue: 'On the marked standoffs, clear of wiring.' }),
        leaf('land-a-thermostat-or-hygrostat', 'Fit a thermostat or hygrostat', 'Install a climate control.', { cue: 'Landed and set.' }),
        leaf('fit-a-filter-fan-the-right-way-round', 'Fit a filter fan in the airflow direction', 'Install forced ventilation.', { cue: 'In the correct airflow direction, read off the housing arrow.', notes: 'Backwards it runs, moves air and heats the panel. Nothing looks wrong.' }),
        leaf('fit-an-exhaust-grill-and-pad', 'Fit the exhaust grill and filter pad', 'Complete a ventilation path.', { cue: 'Grill and pad both fitted; a grill with no pad is an entry.' }),
        leaf('fit-a-panel-light-aimed-at-the-terminals', 'Fit a panel light', 'Install internal lighting.', { cue: 'Aimed at the terminal field, not at the door.' }),
        leaf('fit-a-document-pocket', 'Fit a document pocket on the door interior', 'Provide for drawings.', { cue: 'On the door interior, clear of the gasket line.' }),
        leaf('recover-a-fan-fitted-backwards', 'Recover: a filter fan was fitted backwards', 'Turn it round; a panel that runs hot with working ventilation gets misdiagnosed for years.', { fail: true }),
      ]),
      node('sealing', 'Water, fire and penetrations', 'Keeping things out of and inside boundaries.', { contact: 3, partner: 'licensed' }, [
        leaf('fit-a-drip-loop-at-a-gland', 'Fit a drip loop at a gland or field box', 'Prevent water tracking into an enclosure.', { cue: 'Water runs to the low point and drips off, never into the gland.' }),
        leaf('fit-a-rain-hood-over-an-outdoor-plate', 'Fit a rain hood or drip shield', 'Protect an outdoor gland plate.', { cue: 'It covers the plate and sheds clear of the entries.' }),
        leaf('fire-stop-a-penetration-and-tool-it-flush', 'Fire-stop a penetration', 'Seal a fire-rated barrier.', { cue: 'The specified system, tooled flush at the face.', verify: 'The face is tooled rather than left proud, because the depth is the rating.' }),
        leaf('recover-water-found-inside-an-enclosure', 'Recover: water was found inside an enclosure', 'Isolate, dry and find the entry path before it is closed up again.', { fail: true, partner: 'licensed' }),
      ]),
      node('heat-trace', 'Heat trace', 'A circuit wrapped round a pipe.', { dexterity: 4, contact: 4 }, [
        leaf('land-a-cold-lead-and-label-the-circuit', 'Land heat-trace cold-lead', 'Terminate trace heating.', { cue: 'In the specified box, with the warning label on the circuit.' }),
        leaf('wrap-heat-trace-so-it-cannot-sag', 'Wrap heat-trace on the pipe', 'Install trace heating on a line.', { cue: 'At the specified pitch, taped so it cannot sag off the bottom of the pipe.' }),
        leaf('recover-heat-trace-sagged-off-the-pipe', 'Recover: heat-trace sagged off the bottom of the pipe', 'Strip the tape back and rewrap to pitch rather than adding tape over the sag.', { fail: true }),
      ]),
      node('labelling', 'Markers and legends', 'What the next person reads.', { precision: 4, dexterity: 5, prim: ['inspect'] }, [
        leaf('slide-a-marker-sleeve-to-the-offset', 'Slide a wire-marker sleeve to its offset', 'Mark a conductor.', { cue: 'At the specified offset from the terminal, all markers reading the same way.' }),
        leaf('recover-a-shrink-marker-so-it-cannot-slide', 'Recover a heat-shrink wire marker', 'Fix a marker in place.', { cue: 'Shrunk down so it cannot slide along the conductor.' }),
        leaf('burnish-a-self-laminating-marker', 'Wrap a self-laminating marker', 'Apply a wrap-around label.', { cue: 'Burnished down.', verify: 'The edge is rubbed so oil cannot lift it, which is what fails first.' }),
        leaf('fit-a-legend-plate-clear-of-live-space', 'Fit a nameplate or engraved legend plate', 'Label a panel exterior.', { cue: 'The fixing screws do not enter a live space behind the plate.', notes: 'A label screw into a bus chamber is a fault created by the act of labelling.' }),
        leaf('close-every-terminal-cover-and-boot', 'Close every terminal cover and finger-safe boot', 'Restore touch protection on a row.', { cue: 'Every cover and boot on the row, counted rather than glanced at.' }),
        leaf('recover-a-panel-nobody-can-read', 'Recover: markers were found lifted or missing', 'Remark from the drawing before the panel is handed over, not after somebody needs it.', { fail: true, prim: ['inspect', 'language'] }),
      ]),
    ]),

    node('rework', 'Rework and re-termination', 'Correcting work that is already in, which is most of what a maintenance electrician does.', { dexterity: 5, precision: 5, contact: 3, horizon: 'medium', prev: 'common', skillYears: 'years' }, [
      node('found-faults', 'Faults found under a cover', 'What is revealed when you open something.', {}, [
        leaf('re-route-a-pinched-conductor', 'Find and re-route a pinched conductor', 'Correct a conductor trapped by a cover.', { cue: 'The cover closes with the conductor clear, rather than the conductor pushed aside.', fail: true }),
        leaf('reland-a-swapped-pair-and-restore-the-twist', 'Reland a swapped pair', 'Correct a crossed pair.', { cue: 'Landed correctly with the twist restored to the terminal.', fail: true }),
        leaf('reseat-a-half-home-plug-to-the-click', 'Reseat a plug that was only half-home', 'Correct a partial mate.', { cue: 'The latch clicks, unmistakably.', fail: true }),
      ]),
      node('re-terminate', 'Re-terminate', 'Cutting back and doing it again.', { precision: 5 }, [
        leaf('cut-a-cooked-ferrule-and-re-ferrule', 'Cut off a cooked ferrule and remake it', 'Renew a heat-damaged termination.', { cue: 'Cut back past the discolouration, re-stripped to length and re-ferruled.', fail: true, notes: 'Stopping the cut-back too early leaves annealed copper that will cook again. The judgement is where the damage ends, and it is a colour.' }),
      ]),
    ]),
  ],
)
