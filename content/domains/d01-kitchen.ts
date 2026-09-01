import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// The most photographed domain on earth, and this list deliberately avoids the
// photographed part.
//
// EPIC-KITCHENS and Ego4D label the verb: cut onion, stir pan, open fridge. What
// they do not label is where the knife went afterwards, whether the door
// latched, whether the towel could fall into a burner, whether the pot was set
// down before the last of it was shaken out. Park the knife. Set the grater
// down. Cap the carton before it goes down. Shut the bin before you walk. Close
// the cabinet so nothing sits on the edge.
//
// That is the back half of every kitchen action and it is essentially unlabelled
// anywhere. So the saturation facet is set per leaf rather than per domain: the
// action half stays heavy, and the termination and disposal half is empty.
//
// Two other things run through it. Hot and sharp are ambient rather than
// located, so a large share of the cues are about where a thing is allowed to
// rest. And a great deal of kitchen locomotion happens with both hands
// committed, which is a constraint almost nothing else in the atlas has.

export const d01: NodeSpec = node(
  'd01',
  'Home kitchen and food',
  'Domestic cooking, carrying, cutting and cleaning, including the half of every action that happens after the food is done.',
  {
    setting: 'household',
    dexterity: 4,
    precision: 3,
    contact: 4,
    horizon: 'medium',
    repetition: 'one-shot',
    capital: 'cheap',
    partner: 'none',
    skillYears: 'none',
    suit: 'excellent',
    robotNow: 'partial',
    embodiment: ['ego', 'video', 'suit', 'umi'],
    saturation: 'thin',
    ours: 'none',
    rights: 'consent-heavy',
    ethics: 'open',
    prev: 'ubiquitous',
    prim: ['grasp', 'transfer', 'tool', 'separate'],
  },
  [
    node('stove', 'Pots, pans and the stove', 'Heat, weight and steam, with both hands usually committed.', { contact: 5, dexterity: 4, prev: 'ubiquitous' }, [
      node('filling-and-carrying', 'Fill and carry a pot', 'Moving water and weight across a kitchen.', { dexterity: 3, saturation: 'empty', robotNow: 'no', notes: 'Two-handed locomotion with a heavy liquid load. Almost nothing else in the atlas commits both hands while walking.' }, [
        leaf('fill-to-mark-and-shut-the-tap', 'Fill a pot to the mark and shut the tap', 'Fill at the sink before lifting.', { cue: 'The tap is off before the pot leaves the sink, so you are never carrying a still-filling pot.', notes: 'Ordering constraint with an obvious failure that people make constantly.' }),
        leaf('carry-two-handed-set-before-releasing', 'Carry a pot two-handed to the stove', 'Move a full pot.', { cue: 'It is on the grate before either hand comes off a handle.', contact: 5, prim: ['locomote', 'bimanual'] }),
        leaf('centre-pot-flame-under-the-base', 'Centre a pot on the burner', 'Position a pot over heat.', { cue: 'The flame or coil is under the base, never under a handle.' }),
        leaf('recover-pot-carried-still-filling', 'Recover: carried a pot that was still filling', 'Set it down and shut the tap rather than finishing the walk.', { fail: true }),
      ]),
      node('cooking-motions', 'Stir, flip and toss', 'The photographed half of the kitchen.', { dexterity: 5, saturation: 'heavy', robotNow: 'partial', repetition: 'high-takt' }, [
        leaf('stir-a-high-pot-face-out-of-the-steam', 'Stir a high pot with a long spoon', 'Mix in a deep vessel.', { cue: 'Your face stays out of the steam column throughout.', contact: 5, saturation: 'thin' }),
        leaf('stir-a-low-pan-in-contact', 'Stir a low pan keeping contact', 'Mix in a shallow pan.', { cue: 'The spatula stays on the surface and food does not pile to one side.' }),
        leaf('flip-and-catch-in-the-pan', 'Flip with a spatula and catch it', 'Turn a piece of food.', { cue: 'It lands in the pan; if it folds, it is flattened before the next flip.' }),
        leaf('toss-and-keep-it-in-the-pan', 'Toss in a skillet', 'Move food by pan motion.', { cue: 'Everything stays in the pan; you stop if a piece leaves the rim.', skillYears: 'months', saturation: 'thin' }),
        leaf('recover-food-out-of-the-pan', 'Recover: food left the pan', 'Stop tossing and turn to a spatula rather than continuing.', { fail: true, saturation: 'empty' }),
      ]),
      node('oven', 'Oven work', 'A hot box you have to reach inside.', { contact: 5, dexterity: 3, saturation: 'empty', robotNow: 'no' }, [
        leaf('open-and-stand-aside-from-the-blast', 'Open an oven door and stand aside', 'Open a hot oven.', { cue: 'The heat blast passes before you reach in.' }),
        leaf('pull-the-rack-to-the-stop-first', 'Pull an oven rack to its stop before lifting', 'Bring the work out to you.', { cue: 'The rack is at its stop so you are not reaching into the box.' }),
        leaf('transfer-with-a-mitt-on-each-hand', 'Transfer a pan into the oven', 'Move a hot pan.', { cue: 'A mitt on each hand and both handles under control before it moves.', prim: ['bimanual'] }),
        leaf('baste-and-seat-before-closing', 'Baste and return the pan to the rack', 'Return a pan mid-cook.', { cue: 'The pan is fully on the rack before the door moves.' }),
        leaf('close-the-door-and-check-the-towel', 'Close the oven door until it latches', 'Shut an oven.', { cue: 'It latches, and it is not resting on a towel or a mitt.' }),
        leaf('recover-door-not-latched', 'Recover: oven door not fully closed', 'Clear whatever is in the seal rather than pushing it harder.', { fail: true }),
      ]),
      node('heat-transfers', 'Pour and strain hot things', 'Moving boiling liquid between vessels.', { contact: 5, dexterity: 3, ethics: 'restricted', saturation: 'empty', robotNow: 'no', notes: 'Seeded restricted. Scald injuries in domestic kitchens are common and this is the moment they happen.' }, [
        leaf('pour-heavy-pot-set-down-before-shaking', 'Pour from a heavy pot', 'Decant from a large hot vessel.', { cue: 'A towel on the handle, a lid as a shield if that is the method, and it is set down before the last is shaken out.' }),
        leaf('strain-into-the-colander-in-the-sink', 'Strain pasta into a colander in the sink', 'Drain a hot pot.', { cue: 'The pour happens over the sink, never across a dry counter.' }),
        leaf('shake-and-drip-before-walking', 'Shake a colander and let it drip', 'Finish draining.', { cue: 'It has stopped dripping before you walk anywhere with it.' }),
        leaf('recover-scalded-hand-or-arm', 'Recover: contact with steam or boiling liquid', 'Cool it under running water immediately and abandon the task.', { fail: true, horizon: 'short' }),
      ]),
    ]),

    node('knife', 'Knife and board', 'Where the parking matters more than the cutting.', { dexterity: 5, precision: 4, contact: 4, ethics: 'restricted', prev: 'ubiquitous', notes: 'A parked knife is the single most repeated safety act in a kitchen and appears in no dataset label.' }, [
      node('cutting', 'Cut on the board', 'Blade work with a claw grip.', { saturation: 'heavy', robotNow: 'partial', repetition: 'high-takt' }, [
        leaf('chef-knife-claw-grip-tip-down', 'Cut with a chef knife in a claw grip', 'Make controlled cuts.', { cue: 'Claw grip, tip down, and the knife goes on the board whenever you stop.' }),
        leaf('rock-chop-and-gather-with-the-face', 'Rock-chop herbs and gather them', 'Chop and collect.', { cue: 'Gathered with the flat of the blade, then the knife is parked.', saturation: 'thin' }),
        leaf('slice-finishing-each-cut-on-the-board', 'Slice with each cut finishing on the board', 'Cut cleanly.', { cue: 'Every cut finishes on the board; nothing is sawn in mid-air.' }),
        leaf('julienne-last-piece-on-a-holder', 'Julienne to even sticks', 'Cut fine even pieces.', { cue: 'The food is stable against the board and the last piece goes on a holder, not your palm.', precision: 5, skillYears: 'months' }),
        leaf('carve-against-the-grain-then-park', 'Carve a roast against the grain', 'Slice cooked meat.', { cue: 'The slice is finished and the knife is parked before you plate.', skillYears: 'months', saturation: 'thin' }),
        leaf('slice-bread-on-the-board', 'Slice bread on the board', 'Cut a loaf into slices on a stable surface.', { cue: 'On the board, and the knife is parked; nothing is cut in the air toward a hand.' }),
        leaf('recover-cut-finger', 'Recover: cut yourself', 'Stop, put the knife down first, then deal with the injury.', { fail: true, saturation: 'empty' }),
      ]),
      node('parking', 'Park the blade', 'The half of knife work that nothing records.', { saturation: 'empty', robotNow: 'no', dexterity: 4, repetition: 'high-takt' }, [
        leaf('park-the-knife-on-the-board-when-you-stop', 'Park a knife on the board whenever you stop', 'Set a blade down between actions.', { cue: 'It is on the board, edge in, before your hand does anything else.', notes: 'Done dozens of times a meal, labelled nowhere.' }),
        leaf('set-a-knife-on-the-plate-or-rest', 'Set a butter or table knife on a rest', 'Park a small blade.', { cue: 'On the plate or the rest, not on the counter or in the sink water.' }),
        leaf('build-a-sandwich-cut-then-park', 'Build a sandwich, cut it and park the knife', 'Assemble and divide.', { cue: 'The knife is parked before the plate is picked up.' }),
        leaf('recover-knife-left-in-the-sink', 'Recover: knife found in the washing-up water', 'Retrieve it before anything else goes in the sink.', { fail: true }),
      ]),
    ]),

    node('prep', 'Prep, peel, grate and open', 'Getting ingredients to a usable state.', { dexterity: 5, contact: 4, prev: 'ubiquitous' }, [
      node('peel-and-grate', 'Peel, grate and press', 'Tools that remove your skin as readily as the food.', { ethics: 'restricted', dexterity: 5, precision: 4 }, [
        leaf('peel-toward-the-thumb-not-the-palm', 'Peel toward the thumb', 'Remove skin with a peeler.', { cue: 'The stroke runs toward a braced thumb, never toward an open palm, and peel goes in the compost bowl.', saturation: 'thin' }),
        leaf('grate-with-the-last-piece-on-a-holder', 'Grate with a holder for the last piece', 'Grate down to the end.', { cue: 'The last piece goes on a holder, and the grater is set down before it is scraped.', saturation: 'empty' }),
        leaf('press-lift-and-park-so-it-cannot-drip', 'Press juice and park the press', 'Extract juice.', { cue: 'The press is parked where it cannot drip onto the floor path.' }),
        leaf('recover-grazed-a-knuckle-on-a-grater', 'Recover: caught a knuckle on the grater', 'Stop, set the grater down, and deal with it before returning.', { fail: true }),
      ]),
      node('opening', 'Open containers', 'Lids, cans and cartons, and where the lid goes.', { dexterity: 5, saturation: 'empty', robotNow: 'no' }, [
        leaf('open-a-jar-and-set-the-lid-beside-it', 'Open a jar two-handed', 'Break a vacuum seal.', { cue: 'One hand on the lid, one on the base, and the lid goes beside the jar, not behind the stove.' }),
        leaf('can-opener-lift-the-lid-with-a-tool', 'Open a can and remove the lid safely', 'Cut open a tin and get the lid out without handling the edge.', { cue: 'The lid is lifted with a tool and dropped in the specified bin, never fished out by hand.', ethics: 'restricted' }),
        leaf('pour-from-a-carton-and-cap-it-first', 'Pour from a carton and cap it', 'Decant from a carton.', { cue: 'It is capped before it goes back down.' }),
        leaf('recover-lid-lost-behind-the-hob', 'Recover: lid dropped somewhere hot or unreachable', 'Deal with it before it is forgotten rather than at the end of the cook.', { fail: true }),
      ]),
      node('mixing-and-eggs', 'Crack, whisk and mix', 'Bowl work, where the bowl itself has to be stopped from moving.', { dexterity: 5, saturation: 'heavy', robotNow: 'partial' }, [
        leaf('crack-an-egg-on-a-flat-edge', 'Crack an egg on a flat edge', 'Open an egg cleanly.', { cue: 'It opens over the bowl and the shell goes in the specified bowl, not the sink.' }),
        leaf('whisk-with-the-bowl-on-a-towel', 'Whisk in a bowl set on a towel', 'Mix by hand.', { cue: 'The bowl cannot spin, and you stop when the mix is even.', saturation: 'thin' }),
        leaf('recover-shell-in-the-bowl', 'Recover: shell in the mix', 'Fish it with a half shell rather than a finger, before anything else goes in.', { fail: true }),
      ]),
    ]),

    node('baking', 'Baking and pastry', 'Where a stopping point is defined by the state of the mixture.', { dexterity: 5, precision: 5, contact: 4, skillYears: 'months', saturation: 'thin', prev: 'common' }, [
      node('dough', 'Dough and pastry', 'Deformable, sticky, and with a window.', { contact: 5, robotNow: 'no', saturation: 'empty' }, [
        leaf('knead-to-the-window-then-cover', 'Knead dough to the specified window', 'Develop a dough.', { cue: 'It reaches the window test, then goes in the bowl covered.' }),
        leaf('roll-with-the-pin-on-the-board', 'Roll dough to the marked thickness', 'Sheet a dough.', { cue: 'Even to the mark, with the pin staying on the board rather than overhanging the counter.' }),
        leaf('fold-until-the-last-dry-streak-is-gone', 'Fold a batter without knocking out air', 'Combine gently.', { cue: 'You stop the moment the last streak of dry disappears.', skillYears: 'months' }),
        leaf('recover-dough-over-kneaded', 'Recover: dough worked past the window', 'Rest it rather than adding flour and continuing.', { fail: true }),
      ]),
      node('portion-and-finish', 'Portion, pipe and finish', 'Fine hand work with a tool that must be parked.', { dexterity: 5, precision: 5, saturation: 'empty' }, [
        leaf('sift-and-set-the-sifter-in-the-sink', 'Sift into a bowl and park the sifter', 'Aerate a dry ingredient.', { cue: 'The last is tapped through and the sifter goes in the sink, not back on the flour.' }),
        leaf('scoop-portions-and-rest-the-scoop', 'Scoop portions to size', 'Divide a mixture.', { cue: 'Even to the specified size, and the scoop goes in its rest.' }),
        leaf('pipe-with-even-pressure-twist-closed', 'Pipe with even pressure', 'Apply a mixture through a bag.', { cue: 'Even pressure and a still tip, then the bag is twisted closed before it is set down.' }),
        leaf('spread-frosting-to-the-edge-and-park', 'Spread frosting to the edge', 'Finish a surface.', { cue: 'You stop at the edge and park the offset spatula.' }),
        leaf('scrape-a-bowl-until-the-sides-are-clean', 'Scrape a bowl clean', 'Recover a mixture.', { cue: 'The sides are clean and the spatula is on the rest.' }),
        leaf('line-a-sheet-onto-a-cool-counter', 'Line a sheet and set it down cool', 'Prepare a baking tray.', { cue: 'It lands on a cool counter, never on a still-hot burner.' }),
        leaf('recover-tray-set-on-a-hot-ring', 'Recover: tray set on a hot burner', 'Move it and check what has melted before continuing.', { fail: true }),
      ]),
    ]),

    node('machines', 'Small machines', 'Domestic equipment with interlocks and a spinning blade.', { dexterity: 4, contact: 4, ethics: 'restricted', capital: 'cheap', robotNow: 'no', saturation: 'empty', prev: 'common', notes: 'The lock-then-run and stop-then-open sequences here are ordinary and skipped constantly, and the injury is immediate.' }, [
      node('blades', 'Blenders and processors', 'Machines you must not open early.', { precision: 3 }, [
        leaf('blend-two-hands-on-the-lid', 'Blend with two hands on the lid', 'Run a blender.', { cue: 'Both hands hold the lid and you wait for the blade to stop before opening it.' }),
        leaf('lock-the-processor-lid-or-do-not-run-it', 'Fit a processor lid until it locks', 'Assemble a food processor.', { cue: 'It locks; if it will not lock, it does not run.' }),
        leaf('pulse-wait-then-open', 'Pulse, wait for the blade, then open', 'Operate in bursts.', { cue: 'The blade has fully stopped before the lid moves.' }),
        leaf('recover-opened-before-the-blade-stopped', 'Recover: opened while still spinning', 'Stop, step back, and reset the habit rather than being quicker next time.', { fail: true }),
      ]),
      node('mixers-and-mills', 'Mixers, mills and grinders', 'Attachments, guards and lids.', { dexterity: 5 }, [
        leaf('lock-the-mixer-bowl-before-the-attachment', 'Fit and lock a mixer bowl', 'Assemble a stand mixer.', { cue: 'The bowl locks to the base before the attachment goes on.' }),
        leaf('run-a-mixer-with-hands-out', 'Run a stand mixer with the guard on', 'Operate a mixer.', { cue: 'The guard is on if it has one and hands stay out while it runs.' }),
        leaf('change-attachment-and-park-the-last', 'Change a mixer attachment', 'Swap a tool.', { cue: 'The old attachment goes on its rest, not in the bowl or the sink.' }),
        leaf('grind-pepper-over-the-pan-then-set-down', 'Grind pepper over the pan', 'Season from a mill.', { cue: 'Over the pan rather than the floor, and the mill goes down after.' }),
        leaf('twist-a-salt-mill-and-cap-it', 'Use a salt mill and cap it', 'Season from a mill.', { cue: 'Capped if it has a cap, and set down.' }),
        leaf('grind-beans-and-close-the-hopper', 'Grind beans into the vessel', 'Run a grinder.', { cue: 'Into the specified vessel, with the hopper or lid closed after.' }),
        leaf('recover-attachment-left-in-the-bowl', 'Recover: attachment left in the bowl', 'Remove it before the next addition rather than mixing around it.', { fail: true }),
      ]),
    ]),

    node('plating-service', 'Plating, carrying and serving', 'Getting food to a table without both hands free.', { dexterity: 4, precision: 4, contact: 4, prev: 'ubiquitous' }, [
      node('plating', 'Plate and finish', 'Presentation and the tool rest.', { saturation: 'thin', dexterity: 5 }, [
        leaf('season-a-pinch-from-a-bowl', 'Season with a pinch from a bowl', 'Apply seasoning.', { cue: 'The rest stays in the bowl rather than in a palm you will wipe on a towel.' }),
        leaf('toss-a-salad-with-the-bowl-on-the-counter', 'Toss a salad', 'Coat and mix in a bowl.', { cue: 'The dressing coats and the bowl stays on the counter throughout.' }),
        leaf('plate-with-tongs-and-rest-the-tool', 'Plate with tongs or tweezers', 'Place food on a plate.', { cue: 'The tool goes on its rest, never on the clean rim of a plate.', saturation: 'empty' }),
        leaf('wipe-a-rim-with-a-clean-cloth', 'Wipe a plate rim and present it', 'Finish a plate.', { cue: 'Wiped with a clean cloth, not the one that just hit the floor.' }),
        leaf('recover-thumb-print-on-a-plated-rim', 'Recover: marked a finished plate', 'Wipe and re-present rather than serving it as is.', { fail: true }),
      ]),
      node('carrying-food', 'Carry plates and trays', 'Locomotion with no free hand.', { dexterity: 3, contact: 5, saturation: 'empty', robotNow: 'no', prim: ['locomote', 'bimanual'] }, [
        leaf('carry-two-plates-and-see-the-floor', 'Carry two plates', 'Move plated food.', { cue: 'You can see the floor ahead, and they are set down before you turn to speak to anyone.' }),
        leaf('carry-a-tray-to-a-clear-surface', 'Carry a tray and land it', 'Move a loaded tray.', { cue: 'It lands on a stand or a clear counter, never on a burner grate.' }),
        leaf('recover-plate-slipping-mid-carry', 'Recover: a plate starting to slide', 'Set both down at the nearest surface rather than adjusting while walking.', { fail: true }),
      ]),
      node('table-service', 'Set and serve at a table', 'Reaching around people and finished settings.', { dexterity: 4, contact: 3, saturation: 'empty' }, [
        leaf('set-the-far-side-first', 'Set a table starting at the far side', 'Lay a table.', { cue: 'You never reach over a finished setting.', notes: 'A work-order decision with no visible trace in the result, which is why nothing labels it.' }),
        leaf('fold-a-napkin-to-the-house-fold', 'Fold a napkin to the house fold', 'Present a napkin.', { cue: 'It matches the house fold and goes where the house puts it.' }),
        leaf('fill-glasses-and-put-the-pitcher-down', 'Fill glasses to the mark', 'Pour at a table.', { cue: 'The pitcher is down before any glass is moved.' }),
        leaf('open-wine-and-park-the-corkscrew', 'Open a bottle with a corkscrew', 'Draw a cork.', { cue: 'The cork is out and the corkscrew is parked before the pour.' }),
        leaf('pour-wine-and-twist-over-the-bottle', 'Pour wine and catch the drip', 'Serve from a bottle.', { cue: 'The twist happens over the bottle, not over the cloth or the table.' }),
        leaf('recover-spill-at-the-table', 'Recover: spilled at the table', 'Blot rather than wipe, and deal with the floor before the cloth.', { fail: true }),
      ]),
    ]),

    node('dishes-cleaning', 'Dishes, floors and waste', 'The half of the kitchen nobody films.', { dexterity: 3, contact: 5, saturation: 'empty', robotNow: 'no', prev: 'ubiquitous', notes: 'EPIC-KITCHENS and Ego4D are dense on cooking and thin on the clean-down. This family is almost entirely uncovered and is at least half the labour.' }, [
      node('dishwasher', 'Load and unload a dishwasher', 'Spatial packing with a spray arm to respect.', { precision: 3, dexterity: 4 }, [
        leaf('load-lower-rack-clear-of-the-spray-arm', 'Load the lower rack', 'Pack the bottom of a machine.', { cue: 'Nothing blocks the spray arm and knives point the way the house rule says.' }),
        leaf('lock-plastics-on-the-upper-pins', 'Load the upper rack with plastics locked', 'Pack the top of a machine.', { cue: 'Plastics are on the pins so they cannot flip onto the element.' }),
        leaf('place-glasses-so-they-cannot-knock', 'Place glasses upside-down on the pins', 'Load glassware.', { cue: 'They sit on the pins and cannot knock together during the cycle.' }),
        leaf('unload-high-with-two-hands', 'Unload to a high shelf', 'Put crockery away above shoulder height.', { cue: 'Two hands on the stack, and you never walk with a tower you cannot see over.' }),
        leaf('unload-low-and-close-before-turning', 'Unload to a low drawer', 'Put things away below the counter.', { cue: 'A hip hinge, and the drawer is shut before you turn.' }),
        leaf('recover-glass-broken-in-the-rack', 'Recover: glass broken in the machine', 'Find every piece before the next load rather than running it through.', { fail: true, ethics: 'restricted' }),
      ]),
      node('washing-up', 'Wash, dry and put away', 'The sink and the rack.', { contact: 5, repetition: 'high-takt' }, [
        leaf('scrub-a-pan-and-rack-it', 'Scrub a pan until the face is clean', 'Wash a pan by hand.', { cue: 'Clean by touch as well as sight, then set in the rack to dry.' }),
        leaf('rinse-and-stack-so-it-cannot-slide', 'Rinse and stack on the board', 'Build a drying stack.', { cue: 'The stack cannot slide off the board.' }),
        leaf('dry-and-hang-the-towel-fully', 'Dry and hang the towel', 'Finish with a cloth.', { cue: 'Both ends are on the bar and it cannot drop into a burner.' }),
        leaf('wipe-a-counter-to-the-sink-and-wring', 'Wipe a counter to the sink', 'Clear a surface.', { cue: 'Crumbs go to the sink, the cloth is wrung and hung, and no puddle is left in the walk path.' }),
        leaf('recover-wet-floor-in-the-walk-path', 'Recover: water left where people walk', 'Dry it before continuing rather than at the end.', { fail: true }),
      ]),
      node('floors-and-bins', 'Floors, bins and compost', 'The end of the evening.', { dexterity: 3, contact: 5 }, [
        leaf('lift-a-liner-without-dragging-the-rim', 'Lift a bin liner out', 'Remove rubbish.', { cue: 'The liner comes free of the rim before it is dragged over it.' }),
        leaf('tie-and-carry-away-from-your-legs', 'Tie and carry the rubbish out', 'Take waste outside.', { cue: 'A straight back, held away from your legs, and the outside bin lid is closed after.' }),
        leaf('sweep-to-one-pile-off-the-wet', 'Sweep to a single pile', 'Clear a floor.', { cue: 'One pile, kept out of any wet area.' }),
        leaf('crouch-to-a-dustpan-and-bin-it', 'Crouch to a dustpan and empty it', 'Collect and dispose.', { cue: 'A hinge to the pan and the pile goes straight in the bin.' }),
        leaf('mop-leaving-a-dry-exit', 'Mop in a figure of eight', 'Wash a floor.', { cue: 'You leave a dry exit behind you and never mop yourself into a corner.' }),
        leaf('wring-a-mop-so-it-does-not-trail', 'Wring a mop until it does not drip', 'Prepare a mop.', { cue: 'No trail is left from the bucket to the starting point.' }),
        leaf('empty-and-rinse-the-compost-caddy', 'Empty and rinse the compost caddy', 'Deal with food waste.', { cue: 'Rinsed and returned under the board.' }),
        leaf('recover-mopped-into-a-corner', 'Recover: mopped yourself into a corner', 'Wait rather than walking back across it.', { fail: true }),
      ]),
    ]),

    node('storage', 'Wrapping, the fridge and putting away', 'Where food goes when the cooking stops.', { dexterity: 4, contact: 4, saturation: 'empty', robotNow: 'no', prev: 'ubiquitous' }, [
      node('wrapping', 'Wrap and seal leftovers', 'Containers that have to actually close.', { dexterity: 5, precision: 3 }, [
        leaf('wrap-leftovers-sealed-and-labelled', 'Wrap leftovers and label them', 'Store cooked food.', { cue: 'The seal is closed and any label is readable in the position it will sit.' }),
        leaf('press-a-lid-until-it-snaps-all-round', 'Press a lid on a box', 'Close a container.', { cue: 'It snaps on all four sides, checked by lifting the box by the lid.', verify: 'Lift the box by the lid before it goes in the fridge.' }),
        leaf('recover-container-that-leaked-in-the-fridge', 'Recover: container leaked in storage', 'Clean the shelf and the packs around it, not only the container.', { fail: true }),
      ]),
      node('cold-storage', 'Fridge and freezer', 'Loading a cold box so the door can shut.', { contact: 4, dexterity: 3 }, [
        leaf('load-a-fridge-old-stock-in-front', 'Load a fridge reach-in', 'Put food away cold.', { cue: 'Older stock stays in front and the door closes on the gasket.' }),
        leaf('load-a-freezer-with-a-hinge', 'Load a freezer', 'Put food away frozen.', { cue: 'A hip hinge at the drawer, and the door is closed before the next trip.' }),
        leaf('rotate-and-wipe-the-drip', 'Rotate older stock forward', 'Manage stock in a fridge.', { cue: 'Older forward, and the drip the old pack left is wiped.' }),
        leaf('crack-an-ice-tray-and-refill-it', 'Crack an ice tray and refill it', 'Deal with ice.', { cue: 'The tray goes back to refill rather than into the sink.' }),
        leaf('recover-door-left-ajar', 'Recover: fridge or freezer left ajar', 'Check what has thawed before simply closing it.', { fail: true }),
      ]),
      node('putting-away', 'Put shopping away', 'Unloading a crate into a kitchen.', { dexterity: 3, contact: 4, prim: ['locomote', 'grasp'] }, [
        leaf('carry-a-crate-in-and-set-it-down', 'Carry a grocery crate in', 'Bring shopping inside.', { cue: 'It is on the counter before anything is unpacked.' }),
        leaf('unpack-in-groups-cold-first', 'Unpack onto the counter in groups', 'Sort shopping.', { cue: 'Cold goes to cold first, before anything ambient is handled.' }),
        leaf('put-away-overhead-and-close-the-cabinet', 'Put away overhead two-handed', 'Store above shoulder height.', { cue: 'Two hands, and the cabinet closes with nothing sitting on the edge.' }),
        leaf('put-away-low-and-shut-the-door', 'Put away at floor level', 'Store below the counter.', { cue: 'A hip hinge, the fridge or cupboard shut, and both hands free before you step away.' }),
        leaf('recover-cold-item-left-out', 'Recover: chilled item left on the counter', 'Judge the time out and discard or chill rather than assuming it is fine.', { fail: true }),
      ]),
    ]),

    node('drinks', 'Kettle, coffee and ice', 'Hot water and small machines, several times a day.', { dexterity: 5, precision: 4, contact: 4, prev: 'ubiquitous' }, [
      node('kettle', 'Boil and pour', 'The most repeated hot-liquid task in a house.', { contact: 5, ethics: 'restricted', saturation: 'empty' }, [
        leaf('fill-to-the-mark-and-seat-before-switching', 'Fill a kettle and seat it before switching on', 'Fill and start a kettle in the order that keeps it off a live element.', { cue: 'It is on the base or the burner before it is switched on.' }),
        leaf('pour-and-return-the-kettle-to-the-base', 'Pour a kettle and set it back', 'Serve boiling water.', { cue: 'It goes back on the base, never left on a counter edge.' }),
        leaf('recover-kettle-left-on-the-edge', 'Recover: kettle left near an edge', 'Move it back before pouring anything.', { fail: true }),
      ]),
      node('coffee', 'Coffee and espresso', 'Fine tolerances and a hot wand.', { dexterity: 5, precision: 5, skillYears: 'months', capital: 'mid', saturation: 'thin' }, [
        leaf('tamp-level-wipe-and-lock', 'Tamp espresso level and lock the portafilter', 'Prepare a shot.', { cue: 'Level, the rim wiped, and the portafilter locked before the pull.' }),
        leaf('steam-then-shut-the-wand-and-set-down', 'Steam a pitcher and shut the wand', 'Texture milk.', { cue: 'The texture is reached, the wand is shut, and the pitcher is set down.' }),
        leaf('wipe-and-purge-the-wand', 'Wipe and purge the steam wand', 'Clean a wand immediately.', { cue: 'Wiped and purged before the milk can dry on it.', saturation: 'empty' }),
        leaf('scoop-level-and-lid-the-tin', 'Scoop and level coffee, then lid the tin', 'Measure grounds.', { cue: 'Levelled, and the lid is back on the tin.' }),
        leaf('depress-a-press-straight-down', 'Depress a French press straight down', 'Plunge a press.', { cue: 'Straight down without tilting, and the press goes on a rest rather than a bare surface it could mark.' }),
        leaf('pour-a-press-and-park-the-kettle', 'Pour a French press', 'Serve from a press.', { cue: 'The kettle goes back on its base first.' }),
        leaf('recover-milk-dried-on-the-wand', 'Recover: milk dried on the wand', 'Soak and clean it properly rather than steaming it off into the next jug.', { fail: true }),
      ]),
      node('ice', 'Ice', 'A bin that must be shut.', { dexterity: 3, contact: 4, saturation: 'empty' }, [
        leaf('fill-an-ice-bin-and-latch-it', 'Fill an ice bin and close the door', 'Restock ice.', { cue: 'The door latches.' }),
        leaf('scoop-ice-and-shut-before-walking', 'Scoop ice into the vessel', 'Take ice from a bin into a glass or a container.', { cue: 'The bin is shut before you walk away with the glass.' }),
        leaf('recover-scoop-left-in-the-ice', 'Recover: scoop left buried in the ice', 'Retrieve it and store it outside the bin.', { fail: true }),
      ]),
    ]),
  ],
)
