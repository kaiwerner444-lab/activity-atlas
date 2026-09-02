import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// Commercial kitchens are filmed constantly and recorded almost not at all.
//
// There is an enormous amount of public video of the photogenic six percent of
// this domain: the wok toss, the pizza stretch, the latte pour, the plate going
// down under a ring light. There is essentially nothing on the other ninety four
// percent, which is where the hook goes, where the scraper rests, which way the
// edge faces in the rack, whether the bin lid shut, whether the gasket was clear
// when the door closed, and whether the early date ended up in front.
//
// So saturation is set per leaf here, not per domain. The motions stay thin or
// heavy. The terminations, the parking, the pit and the storage are empty.
//
// Two structural things separate this from the home kitchen domain. First,
// everything is on a takt: the cue is often a timer or a ticket rather than the
// state of the food, and pulling on the timer rather than on a shout is itself
// the skill. Second, the space is shared and moving, so a large share of the
// leaves have a spatial constraint about somebody else's body, somebody else's
// pan, or a walk path that has to stay open.
//
// The heat and the edge are ambient rather than located, exactly as in d01, and
// again that means most cues are about where a thing is allowed to come to rest.

export const d06: NodeSpec = node(
  'd06',
  'Food service and commercial kitchen',
  'Line, pass, bar, pit and store at takt, in a shared moving space where every action has a parking place.',
  {
    setting: 'commercial',
    dexterity: 4,
    precision: 3,
    contact: 4,
    horizon: 'short',
    repetition: 'high-takt',
    capital: 'mid',
    partner: 'site',
    skillYears: 'months',
    suit: 'excellent',
    robotNow: 'no',
    embodiment: ['ego', 'suit', 'video'],
    saturation: 'thin',
    ours: 'none',
    rights: 'consent-heavy',
    ethics: 'open',
    prev: 'common',
    prim: ['tool', 'transfer', 'locomote', 'language'],
  },
  [
    node('fry', 'Fryer, flat-top and plancha', 'Standing hot metal, where the whole skill is which way the splash and the scraper go.', { contact: 5, dexterity: 4, prev: 'common' }, [
      node('basket', 'Drop, drain and hang a basket', 'A basket is only ever in three places and two of them are wrong.', { horizon: 'short', saturation: 'empty', robotNow: 'no' }, [
        leaf('drop-a-basket-and-stand-off', 'Drop a fry basket on the ticket time', 'Lower a loaded basket into hot oil.', { cue: 'The basket is down and your body is off the pot, so the splash line hits steel and not you.', contact: 5, prim: ['transfer', 'locomote'], notes: 'The stand-off is the entire content of this leaf and it is nowhere in public video, which frames from behind the cook.' }),
        leaf('shake-a-basket-over-the-pot', 'Shake a basket and hang it to drain', 'Shed oil back into the vat.', { cue: 'It hangs on the drain hook and stays there; you do not carry a dripping basket across the line.', prim: ['tool', 'transfer'] }),
        leaf('hang-an-empty-basket-on-the-hook', 'Hang an empty basket on its hook', 'Park a basket you are done with.', { cue: 'It is on the designated hook, not on a pan handle that can swing when the next person passes.', dexterity: 3, saturation: 'empty' }),
        leaf('recover-oil-on-the-floor-from-a-basket', 'Recover: a basket dripped across the line', 'Stop, mark the floor and clean it before anyone walks it.', { fail: true }),
      ]),
      node('griddle', 'Flat-top, smash and plancha', 'Working a flat steel surface and leaving it fit for the next cook.', { dexterity: 4, contact: 5, repetition: 'high-takt' }, [
        leaf('flip-a-smash-and-scrape-the-plate', 'Flip a smash and scrape the steel', 'Turn a patty and clear the surface behind it.', { cue: 'The next smash lands on clean plate, not on the carbon the last one left.', saturation: 'thin' }),
        leaf('scrape-to-the-grease-channel', 'Scrape a flat-top to the channel', 'Push residue off the working surface.', { cue: 'The debris is in the channel and the scraper is on its rest, not left on the hot steel.', saturation: 'empty', prim: ['tool'] }),
        leaf('turn-an-egg-without-breaking-it', 'Turn an egg on a plancha', 'Flip a soft item on a flat surface.', { cue: 'The yolk is intact unless the ticket asked otherwise.', dexterity: 5, precision: 4, saturation: 'thin' }),
        leaf('recover-a-broken-yolk-replate', 'Recover: the yolk broke', 'Plate it as the ticket now requires rather than sending it as ordered.', { fail: true, saturation: 'empty', prim: ['language', 'recover'] }),
      ]),
    ]),

    node('range', 'Range, wok and the window', 'Pans in motion, and the handoff at the end of every one of them.', { dexterity: 5, contact: 4 }, [
      node('pan-motion', 'Move food by moving the pan', 'Toss, blanch and time.', { repetition: 'high-takt', horizon: 'short' }, [
        leaf('wok-toss-keep-it-in-the-pan', 'Wok-toss and keep it in the pan', 'Turn a load by pan motion over a high flame.', { cue: 'Nothing leaves the rim; if a piece does, you stop tossing.', skillYears: 'years', saturation: 'heavy', notes: 'The single most filmed motion in the domain. Kept thin only on the stop condition.' }),
        leaf('recover-a-piece-out-of-the-wok', 'Recover: a piece left the wok', 'Recover it with a tool rather than a hand near the flame.', { fail: true, saturation: 'empty', prim: ['tool', 'recover'] }),
        leaf('blanch-basket-on-the-timer', 'Drop and pull a blanch basket on the timer', 'Time a pasta or vegetable blanch.', { cue: 'It comes out on the timer, not when somebody shouts past you.', prim: ['transfer', 'inspect'], saturation: 'empty', notes: 'A cue that is explicitly not the state of the food. Almost every capture protocol assumes the opposite.' }),
      ]),
      node('to-the-window', 'Send a pan to the window', 'The handoff at the end of a cook.', { prim: ['transfer', 'language'], saturation: 'empty' }, [
        leaf('land-a-saute-on-the-mark', 'Pass a sauté to the window', 'Hand a finished pan across to expo.', { cue: 'It lands on the mark, so expo does not have to slide it before plating.', precision: 4 }),
        leaf('fire-and-plate-a-six-pan', 'Fire and plate a six-pan', 'Run six components to one drop time.', { cue: 'No ticket is under a plate and no spoon is left in a pan.', horizon: 'medium', skillYears: 'years', dexterity: 4 }),
        leaf('recover-a-pan-fired-for-the-wrong-ticket', 'Recover: a pan was fired for the wrong ticket', 'Call it, hold the pass and re-sequence rather than sending it.', { fail: true, prim: ['language', 'recover'] }),
      ]),
      node('overhead-and-steam', 'Overhead reach and the steam table', 'Loads coming down, and lids coming off.', { contact: 4, saturation: 'empty' }, [
        leaf('bring-a-pan-down-from-the-gantry', 'Bring a pan down from an overhead', 'Retrieve a pan from a gantry or high shelf.', { cue: 'Both handles are under control before it clears the rail.', prim: ['reach', 'bimanual'], contact: 5 }),
        leaf('lift-a-steam-table-lid-and-park-it', 'Take a steam-table lid off and park it', 'Open a hot well.', { cue: 'The lid is set where its condensate cannot run into a plate or onto the pass.', dexterity: 3, notes: 'A pure disposal-of-the-thing-in-your-hand leaf, which is the class this domain is full of and no dataset holds.' }),
        leaf('recover-lid-condensate-on-the-pass', 'Recover: lid condensate ran onto the pass', 'Pull the plates under it and wipe before anything else lands.', { fail: true }),
      ]),
    ]),

    node('portion', 'Portion and serve to a line', 'Repeated volume to a tolerance, with the tool parked between each one.', { dexterity: 3, precision: 4, repetition: 'high-takt', prev: 'common' }, [
      node('scoop', 'Scoop and level', 'Volume by tool, not by eye.', { saturation: 'thin' }, [
        leaf('scoop-and-level-to-the-line', 'Scoop to the portion line and level it', 'Fill a scoop to a defined mark.', { cue: 'It is level at the line; you do not heap it and guess.', verify: 'A spot check on the scale matches the target within house tolerance.', precision: 4 }),
        leaf('park-the-scoop-in-its-well', 'Park the scoop in its well', 'Set a wet serving tool down between portions.', { cue: 'The scoop is in the specified well, not standing in the product.', saturation: 'empty', dexterity: 2 }),
        leaf('recover-portions-drifting-off-weight', 'Recover: portions drifted off weight', 'Reweigh, recalibrate the scoop and correct the ones already out.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
      node('wet-service', 'Ladle, toss and wipe', 'Serving liquid and dressed food to a rim tolerance.', { contact: 3 }, [
        leaf('ladle-and-wipe-the-rim', 'Ladle soup and wipe the rim', 'Portion a liquid into a cup.', { cue: 'The drip went back into the insert and the rim is clean before it moves.', prim: ['transfer', 'tool'], saturation: 'empty' }),
        leaf('toss-a-bowl-and-rest-the-tongs', 'Toss in a service bowl and rest the tongs', 'Dress and turn a salad to order.', { cue: 'The rim is wiped and the tongs are on the rest, not in the bowl.', dexterity: 4, saturation: 'thin' }),
        leaf('recover-a-rim-that-went-out-dirty', 'Recover: a dirty rim left the pass', 'Intercept it on the floor rather than letting the table see it.', { fail: true, prim: ['language', 'recover'] }),
      ]),
    ]),

    node('bar', 'Bar, espresso and ice', 'Fast repeatable liquid work where the reset between drinks is the real cycle.', { dexterity: 5, precision: 4, horizon: 'short', prev: 'common' }, [
      node('cocktail', 'Shake, strain and reset the tin', 'Build a drink and clear the tools.', { skillYears: 'months' }, [
        leaf('shake-a-tin-and-break-it', 'Shake a tin and break the seal', 'Chill and dilute in a sealed tin.', { cue: 'The seal breaks under control and the cap does not fly.', prim: ['bimanual'], contact: 4, saturation: 'thin' }),
        leaf('strain-and-park-the-strainer', 'Strain and park the strainer', 'Pour off and clear the tools.', { cue: 'The tin is in the wash and the strainer is on its rest, not on the bar top.', saturation: 'empty' }),
        leaf('recover-a-tin-that-will-not-break', 'Recover: the tin seal froze shut', 'Warm and strike the seam rather than forcing it over a full bar.', { fail: true, contact: 5 }),
      ]),
      node('espresso', 'Pull, judge and reset the group', 'Two shots at once and a group that has to be fit for the next one.', { precision: 4, repetition: 'high-takt' }, [
        leaf('pull-a-two-group-and-judge-both', 'Pull a two-group and watch both shots', 'Extract two shots simultaneously and judge them live.', { cue: 'Both shots ran to the house window and you saw both, not one.', prim: ['inspect', 'tool'], saturation: 'thin' }),
        leaf('recover-dump-a-short-or-blond-shot', 'Recover: a shot ran short or blond', 'Dump it and repull rather than serving it.', { fail: true, saturation: 'empty', prim: ['recover', 'inspect'] }),
        leaf('wipe-the-group-and-lock-in', 'Wipe the group and lock the next portafilter', 'Reset the head between drinks.', { cue: 'No dirty basket goes into the group.', verify: 'The next lock-in seats without grinding on old puck.', saturation: 'empty' }),
        leaf('knock-the-puck-and-close-the-bin', 'Knock the puck and close the bin', 'Dispose of spent grounds.', { cue: 'The puck is in the box, the bin lid is shut, and there is no walking pile on the mat.', dexterity: 3, saturation: 'empty' }),
      ]),
      node('milk', 'Steam milk and park a pitcher', 'Texture, then the two things that happen after texture.', { contact: 3 }, [
        leaf('steam-to-texture-and-shut-the-wand', 'Steam to stretch, then to texture', 'Aerate then emulsify a pitcher of milk.', { cue: 'The wand is shut before the pitcher leaves it, not after you start walking.', skillYears: 'months', saturation: 'heavy' }),
        leaf('wipe-the-spout-and-set-it-down', 'Wipe the pitcher spout and set it on the pad', 'Clear and park a used pitcher.', { cue: 'The spout is wiped and the pitcher is on its pad.', saturation: 'empty', dexterity: 3 }),
        leaf('recover-over-stretched-milk', 'Recover: the milk over-stretched', 'Split or dump it rather than pouring foam over a shot.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
      node('bar-stock', 'Cups and ice', 'Restocking a station without stopping service.', { dexterity: 3, saturation: 'empty' }, [
        leaf('restock-cups-from-an-overhead', 'Restock cups from an overhead', 'Bring down a sleeve of cups.', { cue: 'The sleeve is set down before it is torn, so nothing drops.', prim: ['reach', 'transfer'] }),
        leaf('ice-scoop-with-the-designated-scoop', 'Scoop ice with the designated scoop', 'Move ice into a bin.', { cue: 'The scoop is the scoop, never a glass, and the lid is shut afterwards.', notes: 'Scooping with a glass is the classic health violation and is invisible to a camera that only sees ice moving.' }),
        leaf('recover-glass-in-the-ice-bin', 'Recover: glass went into the ice bin', 'Dump the whole bin and sanitise it; the ice is never picked over.', { fail: true, notes: 'A total-loss rule with no partial remedy. A policy shaped for efficiency learns exactly the wrong thing here.' }),
      ]),
    ]),

    node('dough', 'Flour, dough, peel and box', 'Weight, deformation and a launch that only works in one motion.', { dexterity: 5, contact: 4, skillYears: 'months' }, [
      node('flour-and-portion', 'Bag, weigh and ball', 'Bulk in, portions out.', { repetition: 'batched', horizon: 'medium' }, [
        leaf('carry-a-flour-bag-and-set-it-down', 'Carry a flour bag and set it before cutting', 'Move a 20 kg bag to the bench.', { cue: 'The bag is on the bench before it is cut, never cut in the arms.', prim: ['locomote', 'bimanual'], contact: 5, saturation: 'empty' }),
        leaf('portion-dough-balls-to-weight', 'Portion dough balls to weight', 'Divide bulk dough to a target mass.', { cue: 'Each ball is on the tray at weight; the scale platter does not become a stack.', precision: 4, prim: ['deform', 'separate'], saturation: 'thin' }),
        leaf('recover-a-ball-under-weight', 'Recover: a dough ball came out under weight', 'Rescale and reball rather than stretching a short one.', { fail: true }),
      ]),
      node('stretch-and-launch', 'Stretch and get it into the oven', 'The part that fails if it is slow.', { dexterity: 5, saturation: 'thin' }, [
        leaf('stretch-an-even-rim', 'Stretch a pizza to an even rim', 'Open a dough ball by hand.', { cue: 'The rim is even and the centre is not thin enough to hole on the peel.', skillYears: 'years', prim: ['deform', 'bimanual'], saturation: 'heavy' }),
        leaf('launch-off-the-peel-in-one-motion', 'Launch off a peel in one motion', 'Transfer a dressed pizza into the oven.', { cue: 'It lands flat in the oven on the first motion.', prim: ['tool', 'transfer'], precision: 4 }),
        leaf('recover-a-folded-launch', 'Recover: the launch folded', 'Pull it and relaunch rather than baking a folded pie.', { fail: true, saturation: 'empty' }),
        leaf('turn-in-the-oven-and-close-it', 'Turn in the oven and close the door', 'Rotate a bake mid-cook.', { cue: 'The turning peel goes back on its rest and the door is closed.', contact: 4, saturation: 'empty' }),
      ]),
      node('out-and-box', 'Land, cut and box', 'Everything after the bake.', { dexterity: 4, saturation: 'empty' }, [
        leaf('land-on-the-board-and-rest-the-peel', 'Land on the board and rest the peel', 'Bring a bake out and park the tool.', { cue: 'The pizza is on the board and the peel is on its rest, not leaning on the oven.' }),
        leaf('cut-a-wheel-and-park-the-rocker', 'Cut a wheel and park the rocker', 'Portion a round to a slice count.', { cue: 'The cut count matches the spec and the rocker is parked, blade away.', precision: 3, prim: ['tool', 'separate'] }),
        leaf('box-close-and-set-on-the-landing', 'Box, close and set it on the landing', 'Package and stage for pickup.', { cue: 'The lid is closed and the box is on the landing, not on a wet pass.' }),
        leaf('recover-a-box-set-on-a-wet-pass', 'Recover: a box went down on a wet pass', 'Rebox before it goes out with a soft bottom.', { fail: true }),
      ]),
    ]),

    node('pass', 'The pass, running and the floor', 'Shared space with hot fragile things in it, coordinated by voice.', { prim: ['locomote', 'language', 'transfer'], contact: 3, saturation: 'empty', robotNow: 'no' }, [
      node('expo', 'Wipe, read and send', 'The last hands before a plate leaves.', { dexterity: 3, horizon: 'short' }, [
        leaf('wipe-a-rim-and-send', 'Expo-wipe a rim and send', 'Final clean of a plate edge.', { cue: 'The towel that touches the rim is not the towel that just hit the floor.', prim: ['inspect', 'tool'] }),
        leaf('park-a-ticket-on-the-rail', 'Read a ticket and park it on the board', 'Take and place an order slip.', { cue: 'The ticket is on the board and cannot blow into a pan.', prim: ['reach', 'language'] }),
        leaf('slide-a-plate-and-stop-it', 'Slide a plate down the pass and stop it', 'Move a plate along a board to a mark.', { cue: 'It stops on the mark rather than at the far end.', precision: 4 }),
        leaf('recover-a-plate-sent-to-the-wrong-table', 'Recover: a plate went to the wrong table', 'Retrieve it, refire and tell the pass rather than reusing it.', { fail: true, prim: ['language', 'recover'] }),
      ]),
      node('running', 'Carry to the floor', 'Multiple fragile items and a floor you have to keep seeing.', { contact: 4, prev: 'common' }, [
        leaf('carry-four-plates-and-see-the-floor', 'Carry four plates and see the floor', 'Multi-plate carry with an occluded sightline.', { cue: 'They are down on the table before you turn to talk.', dexterity: 5, prim: ['bimanual', 'locomote'], skillYears: 'months' }),
        leaf('carry-a-tray-high-and-turn-with-it', 'Carry a tray high and turn with it', 'Overhead tray carry through a room.', { cue: 'You turn with the tray, never against it.', dexterity: 5, contact: 5, skillYears: 'months' }),
        leaf('recover-a-glass-walking-on-a-tray', 'Recover: a glass started to walk', 'Stop and settle the tray rather than continuing the turn.', { fail: true }),
        leaf('lift-a-bus-tub-without-swinging-it', 'Lift a bus tub and set it on the pit', 'Move a loaded tub of dirties.', { cue: 'It goes to the pit without swinging through the pass.', contact: 5, prim: ['locomote', 'bimanual'] }),
      ]),
      node('traffic', 'Move through occupied space', 'The verbal protocol that keeps a narrow kitchen working.', { prim: ['language', 'locomote'], skillYears: 'months' }, [
        leaf('call-behind-and-sidestep', 'Call behind and sidestep', 'Pass another body in a narrow line.', { cue: 'The call lands before your body enters their space.', notes: 'A spoken precondition on a movement. Nothing in the ego-video corpora aligns speech to a locomotion constraint like this.' }),
        leaf('pivot-and-clear-the-pass', 'Pivot and clear the pass', 'Yield so the next body can get through.', { cue: 'You are out of the pass; plating happens off it.' }),
        leaf('recover-two-bodies-in-one-gap', 'Recover: two people entered the same gap', 'One stops fully; you do not both edge through.', { fail: true, prim: ['language', 'locomote'] }),
      ]),
      node('banquet', 'Banquet tray and chafing fuel', 'Off-site and function work with open flame.', { setting: 'commercial', horizon: 'medium', repetition: 'batched' }, [
        leaf('load-a-banquet-tray-balanced', 'Load a banquet tray balanced', 'Build a heavy tray that has to travel.', { cue: 'The load is balanced and no glass can walk.', contact: 5, prev: 'uncommon' }),
        leaf('set-a-chafing-can-upright', 'Set a chafing fuel can in its cup', 'Place fuel under a chafer.', { cue: 'The can is upright and seated in the cup.', prev: 'uncommon' }),
        leaf('light-off-the-can-and-set-the-lid', 'Light a chafer off the can', 'Ignite fuel and cap it.', { cue: 'You face off the can, light, then set the lid; a lit can is never carried.', contact: 3, prev: 'uncommon', notes: 'Carrying a lit fuel can is the actual injury mode here and is a pure negative constraint, which no imitation dataset represents.' }),
        leaf('recover-a-chafer-flare-or-a-tipped-can', 'Recover: a chafer flared or a can tipped', 'Cover it and cut the fuel; nothing is carried while it is lit.', { fail: true, contact: 3 }),
      ]),
    ]),

    node('pans', 'Pans, wrap, label and rotation', 'The storage discipline that decides whether tomorrow works.', { dexterity: 3, precision: 3, horizon: 'medium', repetition: 'batched', saturation: 'empty', robotNow: 'no', prev: 'ubiquitous' }, [
      node('pan-handling', 'Rails, Cambros and lexan', 'Moving vessels without wearing them.', { contact: 4 }, [
        leaf('open-and-close-a-lowboy', 'Open and close a lowboy', 'Work an under-counter cooler with hands full.', { cue: 'The gasket is clear of towels when it closes.', dexterity: 2, prim: ['reach'] }),
        leaf('six-pan-in-and-out-of-a-rail', 'Drop a six-pan into a rail', 'Seat and lift an insert.', { cue: 'It seats without spilling; if it drips, the rail is wiped before the next pan.' }),
        leaf('lift-a-cambro-onto-a-stand', 'Lift a Cambro onto a stand', 'Move a large storage vessel.', { cue: 'It is on a stand, never on a burner grate.', contact: 5, prim: ['bimanual'] }),
        leaf('pour-a-cambro-with-a-second-person', 'Pour a full Cambro with help', 'Decant a large liquid volume.', { cue: 'Two people or a dump table; a full 22 quart is never free-poured over a shoulder.', contact: 5, prim: ['bimanual', 'language'], notes: 'A two-person force-shared task with a verbal count. Genuinely absent from every public corpus.' }),
        leaf('stack-lexan-so-it-cannot-walk', 'Stack lexan so it cannot walk', 'Build a stable stack of containers.', { cue: 'Lids are on and the stack cannot slide off the table edge.' }),
        leaf('recover-a-cambro-slipping-mid-pour', 'Recover: a Cambro slipped mid-pour', 'Set it down and restart the pour rather than chasing it.', { fail: true, contact: 5 }),
      ]),
      node('wrap-and-label', 'Wrap, label, date and rotate', 'The part that is entirely about the next shift.', { dexterity: 4, precision: 3 }, [
        leaf('wrap-a-hotel-pan-to-the-rim', 'Wrap a hotel pan to the rim', 'Seal a pan with film.', { cue: 'The film is pressed to the rim all the way round, with no lifted corner.', prim: ['deform', 'bimanual'] }),
        leaf('label-and-burnish-the-corner', 'Label the corner and burnish it', 'Apply a date label that has to survive.', { cue: 'The label is on the specified corner.', verify: 'It is still readable and stuck after the walk-in.', prim: ['tool'] }),
        leaf('date-dot-and-place-in-fifo', 'Date-dot and place in FIFO order', 'Put new stock away correctly.', { cue: 'The early date is in front, so the next hand takes it first.', prim: ['inspect', 'transfer'] }),
        leaf('fifo-rotate-and-wipe-the-drip', 'Rotate stock and wipe the drip', 'Reorder existing stock on a shelf.', { cue: 'Order is corrected and the shelf is wiped where the pan sat.' }),
        leaf('recover-an-unlabelled-pan-in-the-walk-in', 'Recover: an unlabelled pan turned up in the walk-in', 'It is discarded, not guessed at and relabelled.', { fail: true, prim: ['inspect', 'recover'], notes: 'The correct action is to throw away good food. No reward-shaped objective produces this on its own.' }),
      ]),
    ]),

    node('coldstore', 'Walk-in, racks and receiving', 'Cold, wet, heavy, and full of doors that have to close.', { contact: 5, horizon: 'medium', repetition: 'batched', saturation: 'empty', prev: 'common' }, [
      node('racks', 'Speed racks and rolling', 'Loads that move on wheels.', { prim: ['transfer', 'locomote'] }, [
        leaf('load-a-speed-rack-so-pans-hold', 'Load a speed rack so pans cannot slide', 'Fill a rolling rack.', { cue: 'Nothing can slide out when the rack moves.', precision: 3 }),
        leaf('roll-and-lock-a-rack', 'Roll a rack and lock the wheels', 'Move and secure a rolling rack.', { cue: 'The wheels are locked at the destination.', verify: 'The door will close with the rack where you left it.' }),
        leaf('recover-a-rack-that-rolled', 'Recover: a rack rolled with the wheels unlocked', 'Stop it at the frame, not at the pans.', { fail: true, contact: 5 }),
      ]),
      node('shelves', 'Walk-in shelves and floor', 'Reaching high and lifting low in a cold box.', { contact: 5, prim: ['reach', 'bimanual'] }, [
        leaf('reach-a-high-shelf-and-turn', 'Reach a high shelf and turn with the pan', 'Retrieve from above shoulder height.', { cue: 'The pan is at your chest before you turn; you do not twist at the high slot.', notes: 'A loaded-turn constraint. The injury is a back, and the difference between the safe and unsafe version is invisible in RGB.' }),
        leaf('crouch-and-hinge-lift-from-the-floor', 'Crouch and hinge-lift from the floor', 'Take a load off a walk-in floor.', { cue: 'You are standing before you walk, not walking as you stand.', dexterity: 2 }),
        leaf('recover-a-pan-off-a-high-shelf', 'Recover: a pan came off a high shelf', 'Step out from under it rather than catching it.', { fail: true, notes: 'The trained instinct is to catch. The correct action is to move away, which is the opposite of what a demonstration would show.' }),
      ]),
      node('receiving', 'Deliveries in', 'The dock end of the cold chain.', { horizon: 'long', prim: ['locomote', 'inspect'] }, [
        leaf('pallet-jack-past-a-cooler-gasket', 'Pallet-jack into a cooler', 'Bring a pallet through a cold-room door.', { cue: 'You stop before the gasket; the fork never tears it.', capital: 'mid', contact: 4 }),
        leaf('receive-a-case-onto-a-beam', 'Receive a case onto a shelf', 'Put an incoming case away.', { cue: 'The case sits fully on the beam, nothing overhanging.', verify: 'The date faces out and reads from the aisle.' }),
        leaf('break-a-case-on-the-prep-table', 'Break a case on the prep table', 'Open and distribute an incoming case.', { cue: 'It is broken down on the table, never on the floor in a walk path.' }),
        leaf('recover-a-cold-chain-break-on-receipt', 'Recover: a delivery arrived out of temperature', 'Reject it at the door rather than putting it away and hoping.', { fail: true, prim: ['inspect', 'language'] }),
      ]),
    ]),

    node('pit', 'Dish pit and glassware', 'Wet, hot, fast, and completely unrecorded.', { dexterity: 3, contact: 5, saturation: 'empty', repetition: 'high-takt', prev: 'ubiquitous', robotNow: 'no' }, [
      node('rack-and-run', 'Scrape, rack and send', 'The dirty side.', { horizon: 'short' }, [
        leaf('scrape-into-the-catch', 'Scrape a plate into the catch', 'Clear food waste before racking.', { cue: 'It goes into the catch, not onto the floor.', prim: ['tool', 'separate'] }),
        leaf('rack-glasses-so-the-lip-washes', 'Rack glasses so the lip washes', 'Load glassware in the correct orientation.', { cue: 'Every lip faces the way the machine can reach it.', precision: 3, prim: ['inspect'] }),
        leaf('rack-plates-below-the-pegs', 'Rack plates below the pegs', 'Load plate racks so the machine will accept them.', { cue: 'Nothing stands above the pegs, so the rack will pass.' }),
        leaf('send-a-rack-and-keep-off-the-hot-side', 'Send a rack and stay off the hot side', 'Push a rack into the machine.', { cue: 'Your hands stay off the clean side until it lands.', contact: 5 }),
        leaf('recover-a-glass-broken-in-the-sink', 'Recover: a glass broke in the pre-rinse sink', 'Drain and clear the sink by sight before any hand goes back in.', { fail: true, contact: 5, notes: 'A hand into opaque water is the classic dish-pit injury. The rule is to make the water clear first, which reads as pure delay on video.' }),
      ]),
      node('clean-side', 'Catch, unrack and stack', 'The hot clean side.', { contact: 5 }, [
        leaf('catch-a-hot-rack-and-cool-it', 'Catch a hot rack and set it to cool', 'Receive a rack out of the machine.', { cue: 'It is on the clean table with the specified grip, not carried across the pit.' }),
        leaf('unrack-and-stack-to-house-height', 'Unrack and stack to house height', 'Put clean ware away.', { cue: 'The stack is at house height, not past it.', prim: ['transfer'] }),
        leaf('pre-rinse-and-keep-the-spray-in', 'Pre-rinse with the gun', 'Spray down before racking.', { cue: 'The spray stays in the sink; the pit floor is not hosed into a walk path.', prim: ['tool'] }),
        leaf('recover-ware-that-came-out-dirty', 'Recover: ware came off the clean side still dirty', 'Rerack and rerun it rather than hand-wiping it onto the shelf.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
      node('front-goods', 'Silver and glassware finishing', 'Slow careful work in a fast wet room.', { dexterity: 5, precision: 4, contact: 3, repetition: 'high-takt' }, [
        leaf('roll-silver-to-the-house-fold', 'Roll silver to the house fold', 'Wrap flatware in a napkin.', { cue: 'The roll matches the house fold and goes in the bin.', prim: ['deform', 'bimanual'], saturation: 'thin' }),
        leaf('polish-a-glass-and-check-the-light', 'Polish a glass and check it to the light', 'Finish glassware to a visual standard.', { cue: 'It passes at the light before it goes on the shelf.', verify: 'Held to the light, no water mark or lint remains.', prim: ['inspect', 'bimanual'] }),
        leaf('set-a-flatware-bin-so-it-sits', 'Drop a flatware bin so it sits', 'Place a heavy loose-load bin on a station.', { cue: 'It sits square, so it cannot tip and spill.', dexterity: 2 }),
        leaf('recover-a-chipped-glass-found-at-polish', 'Recover: a chip turned up at polishing', 'It is pulled and broken out, not returned to the shelf edge-down.', { fail: true, prim: ['inspect'] }),
      ]),
    ]),

    node('sanitation', 'Waste, floor, hot equipment and close', 'The end of the night, and the hottest and dirtiest hour in the building.', { contact: 5, horizon: 'long', repetition: 'one-shot', saturation: 'empty', robotNow: 'no', prev: 'common' }, [
      node('waste', 'Trash and recycling', 'Heavy, wet and awkward.', { prim: ['locomote', 'bimanual'] }, [
        leaf('pull-tie-and-lift-a-heavy-bag', 'Pull, tie and lift a heavy bag', 'Change out a full bin.', { cue: 'It is tied before it lifts and held off your legs on the walk.', contact: 5 }),
        leaf('break-down-recycling-to-the-bin', 'Break down recycling to the right bin', 'Sort and flatten waste streams.', { cue: 'Cardboard is flat and stacked to the bundle height, and each stream is in its own bin.', prim: ['deform', 'separate'] }),
        leaf('recover-a-bag-that-split-on-the-walk', 'Recover: a bag split on the way out', 'Contain it where it stands rather than carrying it further.', { fail: true, contact: 4 }),
      ]),
      node('floor', 'Mop and squeegee', 'Wet floor work in a room you still have to leave.', { prim: ['tool', 'locomote'], dexterity: 2 }, [
        leaf('mop-a-path-that-leaves-an-exit', 'Mop on a path that leaves an exit', 'Wet-clean a kitchen floor.', { cue: 'You never mop yourself into a corner, least of all by the fryer.', notes: 'A path-planning constraint stated as a negative. Robots get this wrong constantly and no demonstration set encodes it.' }),
        leaf('squeegee-to-the-drain', 'Squeegee to the drain', 'Push standing water off a floor.', { cue: 'The last puddle is picked up, not left to find.' }),
        leaf('recover-a-spill-in-a-walk-path', 'Recover: a spill landed in a walk path', 'Stand it up, call it and cone it before you go for a mop.', { fail: true, prim: ['language', 'locomote'], notes: 'Guarding the spill precedes cleaning it. The demonstration a camera captures is the mopping, which is the second half.' }),
      ]),
      node('hot-equipment', 'Grease, fryer and hood', 'Hot oil and heavy greasy metal.', { contact: 5, capital: 'mid' }, [
        leaf('two-person-lift-a-grease-pan', 'Two-person lift a grease pan', 'Move a full grease pan or trap insert.', { cue: 'It is set down before anyone scrapes it.', prim: ['bimanual', 'language'] }),
        leaf('filter-a-fryer-standing-off-the-drain', 'Filter a fryer', 'Drain, filter and refill hot oil.', { cue: 'You stand off the drain and never walk through the oil line.', skillYears: 'months' }),
        leaf('stir-a-boil-out-face-out', 'Stir a boil-out', 'Run a caustic boil-out in a fryer or kettle.', { cue: 'Your face stays out of the steam and the paddle is parked when you stop.', ethics: 'open' }),
        leaf('pull-a-hood-filter-and-soak-it', 'Pull a hood filter and soak it', 'Remove and start cleaning an extraction filter.', { cue: 'It is carried on edge and left in the sink for the specified soak.', prim: ['reach', 'transfer'] }),
        leaf('recover-hot-oil-on-the-floor', 'Recover: hot oil reached the floor', 'Stop the line, absorb it and keep bodies off it until it is dry.', { fail: true, contact: 5, prim: ['language', 'recover'] }),
      ]),
      node('close', 'Sanitiser, boards and reset', 'Leaving the room fit for the next shift.', { dexterity: 3, contact: 3 }, [
        leaf('wring-a-bucket-and-set-it-on-the-mark', 'Wring a sanitiser bucket and set it on the mark', 'Maintain a sanitiser station.', { cue: 'It is on the mark, and it is changed when it is dirty rather than when you remember.', prim: ['deform', 'tool'] }),
        leaf('flip-and-sanitise-both-faces', 'Flip a board and sanitise both faces', 'Sanitise a cutting board.', { cue: 'Both faces are wet.', verify: 'The full contact time elapses before the board goes back into service.', notes: 'The dwell time is the whole point and it is a wait, which is exactly what no imitation policy learns from video.' }),
        leaf('reset-a-station-to-its-tape-marks', 'Reset a station mise', 'Return a station to its start state.', { cue: 'Every pan is on its tape mark, knives are parked, towels are off the floor and both hands are clear.', verify: 'The next cook can start without moving anything first.', horizon: 'long', prim: ['transfer', 'inspect'], notes: 'The single best summary leaf in the domain: a fully specified goal state with no single motion attached to it.' }),
        leaf('recover-a-station-handed-over-unreset', 'Recover: a station was handed over unreset', 'Reset it before starting, rather than working around what is out of place.', { fail: true, horizon: 'medium' }),
      ]),
    ]),

    node('knife', 'Knife discipline and butchery', 'Edges, and where they are allowed to be when you are not using them.', { dexterity: 5, precision: 4, contact: 4, skillYears: 'years', prev: 'common' }, [
      node('knife-discipline', 'Park, steel and rack', 'The half of knife work with no cutting in it.', { saturation: 'empty', dexterity: 3 }, [
        leaf('rack-a-knife-edge-correctly', 'Rack a knife with the edge placed right', 'Put a knife away.', { cue: 'The edge faces the specified direction and the knife is never left in a sink.', notes: 'A knife in a sink is how dish pits lose fingers. Purely a placement rule and entirely unrecorded.' }),
        leaf('steel-a-knife-and-park-it', 'Steel a knife and park it', 'Realign an edge mid-service.', { cue: 'It ends on the board or in the rack, not on the counter edge.', prim: ['tool', 'bimanual'], saturation: 'thin' }),
        leaf('recover-a-knife-found-in-a-sink', 'Recover: a knife turned up in a sink', 'Drain the sink and lift it by the spine, not by feel.', { fail: true, contact: 5 }),
      ]),
      node('cuts', 'Shaped and repeated cuts', 'Tolerance held over hundreds of repetitions.', { repetition: 'high-takt', saturation: 'thin' }, [
        leaf('tourne-to-shape-and-bin-the-trim', 'Tourne a vegetable to shape', 'Cut a defined faceted shape.', { cue: 'The shape matches spec and the trim is in the specified bowl, not on the board.', precision: 5, skillYears: 'years' }),
        leaf('brunoise-with-a-claw-grip', 'Brunoise to size with a claw grip', 'Fine dice at rate.', { cue: 'The claw holds throughout and the knife is parked when you stop.', precision: 5, saturation: 'heavy' }),
        leaf('recover-a-cut-hand-mid-service', 'Recover: you cut yourself mid-service', 'Stop, cover, glove and pull the affected food rather than finishing the pan.', { fail: true, prim: ['language', 'recover'], notes: 'The food-safety half is the part people skip and the part no dataset holds.' }),
      ]),
      node('butchery', 'Break down protein', 'Following anatomy, and the cross-contamination rule that follows it.', { contact: 5, saturation: 'thin', rights: 'consent-heavy' }, [
        leaf('scale-a-fish-into-a-container', 'Scale a fish into a container', 'Descale without spreading it across the room.', { cue: 'Scales are in the container and the board is rinsed as the house requires.', prim: ['tool', 'separate'] }),
        leaf('break-down-a-chicken-and-change-the-board', 'Break down a chicken', 'Portion a whole bird by joint.', { cue: 'Waste is binned and the board is changed or sanitised before anything ready-to-eat touches it.', verify: 'The board that follows raw protein is not the board that preceded it.', skillYears: 'years' }),
        leaf('tie-a-roast-and-park-the-string', 'Tie a roast and park the string', 'Truss with butcher twine.', { cue: 'The ends are tucked and the string is parked, not trailing off the bench.', dexterity: 5, prim: ['fasten', 'bimanual'], saturation: 'empty' }),
        leaf('bone-out-with-the-hand-clear', 'Bone out with the hand out of the line', 'Separate meat from bone with the knife on the bone.', { cue: 'Your other hand is never in the line of the edge.', contact: 5, skillYears: 'years' }),
        leaf('recover-a-board-used-across-raw-and-ready', 'Recover: one board crossed raw and ready-to-eat', 'The ready-to-eat side is discarded and the board is stripped.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
    ]),

    node('machines', 'Powered machines, bagging and chilling', 'The things in a kitchen that keep moving after you let go.', { capital: 'mid', contact: 4, precision: 3, saturation: 'empty', robotNow: 'no', prev: 'common' }, [
      node('blades', 'Wait for the blade', 'Every one of these is a rule about a delay.', { contact: 4, skillYears: 'months' }, [
        leaf('two-hand-a-blender-lid-and-wait', 'Two-hand a blender lid and wait', 'Run and open a blender.', { cue: 'The lid is held before it starts and the blade has stopped before it comes off.', prim: ['bimanual'] }),
        leaf('pulse-a-robot-coupe-and-wait', 'Pulse a robot-coupe and wait to open', 'Process in a bowl cutter.', { cue: 'The blade is stationary before the lid moves.', notes: 'A mandatory wait state with no visual change during it. This is the exact class of behaviour video pretraining cannot supply.' }),
        leaf('run-a-slicer-with-guard-and-holder', 'Run a slicer carriage', 'Slice with a rotary slicer.', { cue: 'The guard is on and the last-piece holder is used; the last slice is never caught by hand.', verify: 'The guard is back in place before you walk away.', precision: 4, skillYears: 'months' }),
        leaf('feed-a-meat-saw-with-a-push-stick', 'Feed a meat saw with a push stick', 'Cut bone on a band saw.', { cue: 'The push stick does the feeding and the offcut is clear of the blade path.', contact: 5, skillYears: 'years', prev: 'uncommon' }),
        leaf('recover-a-machine-that-jammed-under-load', 'Recover: a blade jammed under load', 'It is isolated at the switch before anything reaches in.', { fail: true, contact: 4, notes: 'Isolate then clear. Reaching into a stalled machine that is still live is the injury, and the two look identical in RGB.' }),
      ]),
      node('bag-and-bath', 'Seal, chill and hold', 'Cold chain by machine and by water.', { horizon: 'medium', repetition: 'batched' }, [
        leaf('drop-an-ice-bath-to-the-neck', 'Drop a pan into an ice bath', 'Chill a hot product down.', { cue: 'The bath comes to the neck of the pan; the pan is not floating.', prim: ['transfer', 'inspect'] }),
        leaf('vacuum-bag-and-check-the-seal', 'Vacuum-bag and check the seal', 'Seal product for sous vide or storage.', { cue: 'The sealer lid is parked when you are done.', verify: 'The seal has no channel and the bag is tight to the product.', precision: 4 }),
        leaf('close-a-chamber-lid-and-wait', 'Close a chamber lid and wait for the cycle', 'Run a chamber vacuum cycle.', { cue: 'The cycle completes on its own; nobody leans on the lid.' }),
        leaf('dunk-a-cryovac-and-rack-it', 'Dunk a cryovac bag and rack it', 'Shrink or temper a bagged product.', { cue: 'It goes in for the specified time and comes out onto the rack.' }),
        leaf('recover-a-bag-that-lost-its-seal', 'Recover: a bag lost its seal in the bath', 'It comes out and is rebagged or discarded, not pushed back under.', { fail: true, prim: ['inspect', 'recover'] }),
      ]),
    ]),
  ],
)
