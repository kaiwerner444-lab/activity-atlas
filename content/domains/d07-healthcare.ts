import { leaf, node } from '@/lib/authoring'
import type { NodeSpec } from '@/lib/types'

// The question in this domain is never whether the work is valuable. It is
// whether it can be recorded at all, and the answer splits cleanly in two.
//
// Patient-present work needs a person who is unwell, their consent, and a
// regulated provider between us and the ward. Feasibility is genuinely low and
// the atlas should say so rather than dangling it as an opportunity.
//
// But a large part of clinical skill is already taught and practised on
// manikins and task trainers, in simulation suites built to be observed and
// recorded, with students who consent as a condition of the course. Airway
// management, sterile technique, tracheostomy care, wound packing, spinal
// immobilisation: none of these need a patient to capture, and the sim centre is
// an instrumented room that exists for exactly this.
//
// That is the finding. The same skill scores near zero on a ward and several
// times higher in a sim suite, and the difference is rights, partner and ethics
// rather than anything about the hands. Splitting on it turns a domain that read
// as uniformly infeasible into one with a clear, ethical capture route.
//
// Note that the simulation family is seeded ethics: open. A training room with a
// manikin in it carries no ethical constraint on being recorded; the barrier is
// the cost of the equipment, not consent. Only the restraint procedure keeps a
// flag, because restraining a person is loaded even in rehearsal.
//
// The domestic equivalents of the transfer and personal-care families are in
// D02, done by relatives at home, and score higher again.

export const d07: NodeSpec = node(
  'd07',
  'Healthcare and caregiving',
  'Clinical care: PPE, monitoring, lines, moving patients, rehab support, wounds and the skills that are taught on manikins before they are done on people.',
  {
    setting: 'clinical',
    dexterity: 4,
    precision: 4,
    contact: 5,
    horizon: 'medium',
    repetition: 'batched',
    capital: 'mid',
    partner: 'regulated',
    skillYears: 'years',
    suit: 'excellent',
    robotNow: 'no',
    embodiment: ['ego', 'suit'],
    saturation: 'empty',
    ours: 'none',
    rights: 'consent-heavy',
    ethics: 'restricted',
    prev: 'common',
    prim: ['bimanual', 'language', 'inspect', 'grasp'],
  },
  [
    node('ppe-hygiene', 'PPE and hand hygiene', 'The most repeated sequence in a hospital, and one of the few here with no patient in it at all.', { dexterity: 4, contact: 3, partner: 'site', rights: 'easy', ethics: 'open', horizon: 'short', repetition: 'high-takt', skillYears: 'months', prev: 'ubiquitous', notes: 'No patient, no consent problem, done thousands of times a day, and essentially unrecorded. The cheapest real capture in the whole domain.' }, [
      node('donning', 'Don protective equipment', 'Getting dressed in an order that keeps the outside outside.', {}, [
        leaf('don-gloves-cuffs-over-wrists', 'Don gloves with the cuffs over the suit wrists', 'Put on gloves completely.', { cue: 'Both cuffs cover the wrist and there is no hole at the thumb.' }),
        leaf('don-gown-tie-back-closed', 'Don a gown and tie it closed', 'Put on a gown.', { cue: 'The back is closed and the cuffs sit over or under the gloves as the precaution requires.' }),
        leaf('fit-face-shield-brim-to-chin', 'Fit a face shield', 'Place a shield correctly.', { cue: 'The brim sits on the forehead and the lower edge is below the chin.' }),
        leaf('recover-ppe-gap-noticed-at-the-door', 'Recover: gap in PPE found at the door', 'Step back and redo the sequence rather than adjusting at the bedside.', { fail: true }),
      ]),
      node('doffing', 'Doff protective equipment', 'Where every failure is a contamination you cannot see.', { dexterity: 5, precision: 5 }, [
        leaf('doff-gloves-inside-out-to-waste', 'Doff gloves inside-out into the waste', 'Remove gloves without touching the outside.', { cue: 'The dirty face finishes inside and they go in the waste, not on the rail.' }),
        leaf('doff-gown-rolled-front-untouched', 'Doff a gown inside-out and roll it', 'Remove a gown safely.', { cue: 'The front never touches you and it is rolled before it is binned.' }),
        leaf('hand-hygiene-full-time-all-surfaces', 'Run hand hygiene for the full time', 'Decontaminate hands.', { cue: 'The full specified duration, every surface, and only then do you touch the next device.', notes: 'The failure is stopping early, which looks identical to doing it properly.' }),
        leaf('recover-self-contaminated-during-doffing', 'Recover: contaminated yourself while doffing', 'Stop, repeat hand hygiene and restart the sequence rather than carrying on.', { fail: true }),
      ]),
    ]),

    node('bed-and-space', 'Bed, space and set-up', 'Preparing the room and the furniture before anything is done to a person.', { dexterity: 3, contact: 4, partner: 'site', rights: 'consent-heavy', prev: 'ubiquitous' }, [
      node('space', 'Set up the space', 'Making room to work in.', { horizon: 'short' }, [
        leaf('draw-curtain-leave-a-walk-gap', 'Draw a curtain and leave a walk gap', 'Create privacy without trapping yourself.', { cue: 'There is still a gap to work through on the next transfer.' }),
        leaf('raise-bed-before-you-lean', 'Raise the bed to working height first', 'Set the bed before the task.', { cue: 'It is at your height before you lean, not after your back is bent.', notes: 'The whole musculoskeletal case for the profession is in doing this first rather than second.' }),
        leaf('lower-bed-to-exit-height', 'Lower the bed to a safe exit height', 'Return the bed for the patient.', { cue: 'Their feet will reach the floor before they stand.' }),
        leaf('lock-bed-kick-each-caster', 'Lock the bed and prove each caster', 'Secure a bed.', { cue: 'Each caster is kicked to confirm, rather than the levers being looked at.', verify: 'Push the bed once before any procedure begins.' }),
        leaf('position-exposed-and-still-covered', 'Position for a procedure', 'Expose only what is needed.', { cue: 'The target surface is accessible and the rest of them is supported and covered.', ethics: 'restricted' }),
        leaf('recover-worked-at-the-wrong-bed-height', 'Recover: caught yourself working bent over', 'Stop and raise the bed rather than finishing the task first.', { fail: true }),
      ]),
    ]),

    node('monitoring', 'Non-invasive monitoring and oxygen', 'Devices placed on the outside of a person.', { dexterity: 5, precision: 5, contact: 4, partner: 'regulated', prev: 'ubiquitous' }, [
      node('vitals', 'Fit monitoring devices', 'Placement decides whether the number means anything.', {}, [
        leaf('fit-bp-cuff-marker-over-artery', 'Fit a BP cuff on the specified arm', 'Place a cuff correctly.', { cue: 'The marker is over the artery and it is clear of any IV or fistula.' }),
        leaf('fit-pulse-ox-emitter-to-detector', 'Fit a pulse oximeter', 'Place a probe.', { cue: 'Emitter and detector face each other and the cable cannot form a noose.' }),
        leaf('fit-3-lead-colours-to-sites', 'Fit a 3-lead to the specified sites', 'Place monitoring electrodes.', { cue: 'Each colour is on its site and every tab is pressed until it sticks.' }),
        leaf('fit-12-lead-v-leads-in-order', 'Fit a 12-lead in the map', 'Place a diagnostic electrode set.', { cue: 'V leads in order, every tab pressed hard enough to survive a sit-up.', precision: 5 }),
        leaf('recover-trace-lost-from-a-lifted-tab', 'Recover: trace lost from a lifted electrode', 'Reprep the skin and replace the tab rather than pressing the old one back down.', { fail: true }),
      ]),
      node('oxygen-delivery', 'Deliver oxygen non-invasively', 'Interfaces that sit on a face for hours.', { dexterity: 5, contact: 4 }, [
        leaf('fit-cannula-tubing-behind-the-ears', 'Fit a nasal cannula', 'Place nasal prongs.', { cue: 'Prongs curve the specified way and the tubing runs behind the ears, not strapped under the chin.' }),
        leaf('fit-mask-form-nose-wire-strap-clear-of-eyes', 'Fit a simple mask', 'Place an oxygen mask.', { cue: 'The nose wire is formed and the strap sits behind the head rather than across the eyes.' }),
        leaf('recover-pressure-mark-from-an-interface', 'Recover: pressure mark from tubing or a strap', 'Reposition and pad it rather than loosening and continuing.', { fail: true }),
      ]),
    ]),

    node('lines-pumps', 'Lines, bags and pumps', 'Equipment work, much of which happens off the patient entirely.', { dexterity: 5, precision: 5, contact: 3, prev: 'common' }, [
      node('off-patient-setup', 'Prepare lines and bags', 'Done at the pole and the trolley, before anything is connected.', { partner: 'site', rights: 'easy', ethics: 'open', notes: 'Priming, spiking and hanging are equipment tasks with no patient contact. They can be captured in a clinical skills room without a ward.' }, [
        leaf('prime-tubing-free-of-air', 'Prime tubing until the line is clear', 'Fill a giving set.', { cue: 'The chamber and the line are free of the specified air before it is capped or connected.' }),
        leaf('spike-a-bag-without-touching-the-face', 'Spike a bag cleanly', 'Connect a set to a bag.', { cue: 'The spike face is never touched and the bag is hung before the roller is opened.' }),
        leaf('hang-bag-at-the-right-height', 'Hang a bag at the specified height', 'Position a bag on a pole.', { cue: 'High enough for the drip and low enough that the line still reaches.' }),
        leaf('prime-feeding-set-wet-to-the-end', 'Prime a feeding set', 'Fill an enteral set.', { cue: 'The line is wet to the end and free of the specified air.' }),
        leaf('seat-set-in-the-pump-shoe', 'Seat a set in the pump and close the door', 'Load a pump.', { cue: 'It sits in the shoe and the door latches without force.' }),
        leaf('recover-air-found-in-a-primed-line', 'Recover: air found in a primed line', 'Reprime rather than tapping the bubble along the tubing.', { fail: true }),
      ]),
      node('at-the-patient', 'Manage lines at the patient', 'Where a taut line is the hazard.', { partner: 'regulated', ethics: 'restricted', contact: 4 }, [
        leaf('roll-pole-with-the-bed-no-line-taut', 'Roll a pole with the bed or chair', 'Move a patient and their lines together.', { cue: 'No line goes taut at any point in the move.' }),
        leaf('ambulate-pole-on-the-line-side', 'Ambulate with the pole on the line side', 'Walk a patient with an infusion.', { cue: 'The line never crosses in front of their feet.' }),
        leaf('toilet-with-a-pole-line-clear', 'Toilet with a pole', 'Manage lines at a fixture.', { cue: 'The line is not across the seat or the lid.' }),
        leaf('move-lines-then-body-then-check', 'Chair to bed with lines', 'Transfer a patient who is connected.', { cue: 'Lines are moved first, then the body, then everything is checked for tension.', notes: 'Ordering constraint. Moving the body first is faster and is how lines get pulled.' }),
        leaf('recover-line-pulled-during-a-move', 'Recover: line pulled during a transfer', 'Stop the move, assess the site, and escalate rather than reconnecting quietly.', { fail: true, prim: ['language', 'recover'] }),
      ]),
    ]),

    node('moving-patients', 'Turning, sliding and team transfers', 'Multi-person moves where nobody may let go early.', { dexterity: 3, contact: 5, partner: 'regulated', skillYears: 'months', prim: ['bimanual', 'language'], prev: 'common', notes: 'The domestic single-handed versions are in D02 and score far higher, because a living room has no regulated partner in front of it.' }, [
      node('turning', 'Turn and position', 'Preventing harm caused by stillness.', {}, [
        leaf('turn-q2-left-packed-off-lines', 'Turn to the left and pack the position', 'Reposition a patient.', { cue: 'Enough pillows that they cannot roll back onto a line or a wound.' }),
        leaf('turn-q2-right-packed-off-lines', 'Turn to the right and pack the position', 'Reposition to the other side.', { cue: 'Same rule on the right.' }),
        leaf('fit-pressure-cushion-fully-under', 'Fit a pressure or waffle cushion', 'Offload a pressure area.', { cue: 'Fully under the seat or the heels, never folded under a sacrum.' }),
        leaf('fit-abductor-pillow-strapped', 'Fit an abductor pillow', 'Maintain limb position.', { cue: 'Strapped so it cannot walk out of position on the first turn.' }),
        leaf('recover-pressure-area-found-on-a-turn', 'Recover: pressure damage found during a turn', 'Offload it, report it and document rather than repositioning over it.', { fail: true, prim: ['inspect', 'language'] }),
      ]),
      node('team-moves', 'Team slides and log-rolls', 'Where a count is the only thing coordinating four people.', { contact: 5, dexterity: 2 }, [
        leaf('log-roll-team-nobody-lets-go-early', 'Log-roll with a team on a count', 'Turn a patient as one piece.', { cue: 'The spine stays one piece and nobody releases before the call.' }),
        leaf('slide-sheet-boost-sheet-out-after', 'Slide-sheet boost up the bed', 'Move a patient toward the head of the bed.', { cue: 'The head lands on the pillow and the sheet comes out after the boost, not during it.' }),
        leaf('pat-slide-board-stays-until-across', 'Pat-slide a lateral transfer', 'Move a patient between surfaces.', { cue: 'Enough hands on both sides, and the board stays until they are fully on the target surface.' }),
        leaf('cot-to-bed-lines-and-rails-first', 'Cot-to-bed transfer on a count', 'Transfer from a trolley.', { cue: 'Lines and rails are managed before the slide begins.' }),
        leaf('board-slide-for-imaging', 'Board-slide for imaging', 'Move a patient onto an imaging surface.', { cue: 'Enough hands on both surfaces and one voice calling it.' }),
        leaf('recover-team-move-with-a-hand-short', 'Recover: a team move starting a hand short', 'Stop and wait for the person rather than compensating.', { fail: true }),
      ]),
      node('stretchers', 'Stretchers and cots', 'Carrying a person on equipment.', { contact: 5, dexterity: 2, setting: 'clinical' }, [
        leaf('carry-stretcher-foot-match-the-head', 'Carry a stretcher at the foot', 'Take the foot end of a carry.', { cue: 'Your height matches the head person for the whole carry.' }),
        leaf('carry-stretcher-head-and-call-stops', 'Carry a stretcher at the head', 'Lead a carry.', { cue: 'You call the stops and the foot end follows them.', prim: ['language'] }),
        leaf('lower-stretcher-and-lock', 'Lower a stretcher and lock it', 'Set a stretcher height.', { cue: 'It reaches the specified height and locks before hands come off.' }),
        leaf('raise-stretcher-and-lock', 'Raise a stretcher and lock it', 'Raise a stretcher.', { cue: 'It locks at the specified height.' }),
        leaf('recover-stretcher-dropped-a-height', 'Recover: stretcher dropped a height setting', 'Steady the patient first, then reset and lock.', { fail: true }),
      ]),
    ]),

    node('mobility-rehab', 'Ambulation, aids and rehab support', 'Getting somebody upright and moving again.', { dexterity: 3, contact: 5, partner: 'regulated', skillYears: 'months', prev: 'common' }, [
      node('early-mobility', 'Early mobilisation', 'The first time upright after being in bed.', { horizon: 'medium' }, [
        leaf('gait-belt-over-a-gown-off-the-abdomen', 'Fit a gait belt over a gown', 'Fit a transfer belt in a clinical setting.', { cue: 'It sits on the pelvis, clear of the abdomen and any fresh incision.' }),
        leaf('dangle-until-the-sway-stops', 'Sit on the edge and dangle', 'Let a patient adjust to upright.', { cue: 'You wait until the sway stops rather than standing them on the first tilt.' }),
        leaf('strap-tilt-table-before-any-tilt', 'Strap a tilt table', 'Secure a patient before tilting.', { cue: 'Every belt is on before the table moves at all.' }),
        leaf('recover-syncope-on-first-standing', 'Recover: they go grey on first standing', 'Sit them immediately and stay with them rather than completing the transfer.', { fail: true, horizon: 'short' }),
      ]),
      node('aids-and-braces', 'Fit aids, braces and supports', 'Equipment sized to a body.', { precision: 5, dexterity: 4 }, [
        leaf('fit-crutches-two-fingers-below-axilla', 'Fit crutches to the patient', 'Size crutches.', { cue: 'The pad is two fingers below the axilla and the handgrip is at the wrist crease.' }),
        leaf('demo-crutch-gait-then-guard-weak-side', 'Demonstrate a crutch gait, then guard', 'Teach and supervise a gait pattern.', { cue: 'You demonstrate, then guard their first pass from the weak side unless the rule says otherwise.', prim: ['language', 'locomote'] }),
        leaf('fit-abdominal-binder-still-a-full-breath', 'Fit an abdominal binder', 'Apply a binder.', { cue: 'Even all round, and they can still take a full breath.' }),
        leaf('fit-brace-straps-in-order', 'Fit a brace on the marks', 'Apply an orthosis.', { cue: 'On the marks with every strap closed in the specified order.' }),
        leaf('fit-cervical-collar-chin-visible', 'Fit a cervical collar', 'Apply a collar.', { cue: 'Correct size, velcro locked, and the chin position still visible to check.', ethics: 'restricted' }),
        leaf('recover-brace-fitted-in-the-wrong-order', 'Recover: brace straps closed out of order', 'Release and refit rather than adjusting the tension of the last one.', { fail: true }),
      ]),
      node('respiratory-rehab', 'Respiratory support and coaching', 'Physical assistance with breathing effort.', { contact: 5, prim: ['language', 'tool'] }, [
        leaf('chest-physio-specified-lobes-and-time', 'Chest physiotherapy on the specified lobes', 'Perform percussion.', { cue: 'Only the specified lobes, for the specified time, and you stop if they cannot tolerate it.' }),
        leaf('coach-spirometry-hold-the-device-still', 'Coach incentive spirometry', 'Support a breathing exercise.', { cue: 'You hold the device still while they pull, and coach rather than doing it for them.' }),
        leaf('abdominal-pillow-held-for-the-cough', 'Fit an abdominal pillow and hold it', 'Splint an incision for coughing.', { cue: 'It is held firmly against them through the cough, not simply handed over.' }),
        leaf('log-roll-with-incision-guard', 'Log-roll with an incision guard', 'Turn a post-operative patient.', { cue: 'They hug the pillow first, then the roll begins.' }),
        leaf('recover-cough-splint-not-effective', 'Recover: splinting is not controlling the pain', 'Stop and escalate for analgesia rather than pushing through the set.', { fail: true }),
      ]),
    ]),

    node('hygiene-output', 'Washing, output and stoma care', 'The unglamorous majority of ward work.', { contact: 5, dexterity: 4, ethics: 'restricted', rights: 'consent-heavy', prev: 'ubiquitous' }, [
      node('washing-and-mouth', 'Washing and mouth care', 'Cleaning a person in a clinical bed.', { horizon: 'long' }, [
        leaf('oral-swab-per-quadrant-head-up', 'Swab each quadrant and leave the head up', 'Perform oral care.', { cue: 'Each quadrant gets a fresh swab and the bed is left where they can swallow or spit.' }),
        leaf('shower-chair-lock-before-you-let-go', 'Transfer to a shower chair', 'Move a patient to a shower.', { cue: 'The chair is locked before either hand comes off them.' }),
        leaf('wash-in-chair-water-off-the-exit-path', 'Wash in a shower chair', 'Bathe a seated patient.', { cue: 'Water stays off the floor path you will walk on the way out.' }),
        leaf('dry-and-dress-before-the-next-surface', 'Dry and dress before moving on', 'Complete post-shower care.', { cue: 'They are dry and dressed before any transfer to the next surface.' }),
        leaf('wheelchair-to-commode-brakes-footrests', 'Wheelchair to commode', 'Transfer to a commode.', { cue: 'Brakes on and footrests away before the transfer starts.' }),
        leaf('recover-patient-cold-and-wet-mid-wash', 'Recover: patient cold part-way through washing', 'Cover and warm them before continuing rather than working faster.', { fail: true }),
      ]),
      node('output', 'Manage output', 'Measurement and disposal without contamination.', { precision: 4, dexterity: 4 }, [
        leaf('empty-foley-spout-not-touching', 'Empty a catheter bag into a container', 'Drain a urinary bag.', { cue: 'The spout never touches the container rim.' }),
        leaf('pour-to-measure-and-hang-below-bladder', 'Measure output and rehang the bag', 'Record and restore.', { cue: 'It is measured, capped, and rehung below bladder level.' }),
        leaf('empty-ostomy-wipe-and-clip', 'Empty an ostomy pouch', 'Drain a stoma bag.', { cue: 'The tail is wiped and the clip is closed.' }),
        leaf('recover-bag-hung-above-bladder-level', 'Recover: drainage bag found above bladder level', 'Rehang it and check whether reflux has occurred.', { fail: true }),
      ]),
      node('stoma', 'Stoma and pouch care', 'Skin work around an opening.', { dexterity: 5, precision: 5, skillYears: 'months' }, [
        leaf('change-pouch-measure-cut-seat-hold', 'Change an ostomy pouch', 'Replace an appliance.', { cue: 'Removed, cleaned, dried, measured, cut to size, seated and held for the specified time.', verify: 'Hold the flange for the full adhesion time rather than releasing when it looks stuck.' }),
        leaf('stoma-care-clean-dry-dress', 'Perform stoma care', 'Clean and dress a stoma site.', { cue: 'Clean, dry, dressed, and the ties or dressing left exactly as specified.' }),
        leaf('recover-pouch-leaked-within-the-hour', 'Recover: pouch leaked soon after a change', 'Strip and refit with a fresh measure rather than taping over the leak.', { fail: true }),
      ]),
    ]),

    node('wounds-supports', 'Dressings, wraps and compression', 'Applied to the outside, with tension as the variable.', { dexterity: 5, precision: 5, contact: 4, prev: 'common' }, [
      node('dressings', 'Apply dressings', 'Covering a site so the cover stays on.', { ethics: 'restricted' }, [
        leaf('apply-dressing-pad-covers-tape-on-dry-skin', 'Apply a dressing', 'Dress a wound site.', { cue: 'The pad covers the site and every piece of tape is on dry skin.' }),
        leaf('tear-tape-and-park-the-roll', 'Tear tape and park the roll', 'Manage tape at the bedside.', { cue: 'The roll is parked and no strip is left hanging off a rail.' }),
        leaf('recover-dressing-lifted-at-an-edge', 'Recover: dressing lifting at an edge', 'Replace it rather than taping over the lifted edge.', { fail: true }),
      ]),
      node('compression', 'Compression and sequential devices', 'Even pressure, or a tourniquet.', { contact: 5 }, [
        leaf('fit-scd-sleeves-no-kink', 'Fit SCD sleeves', 'Apply sequential compression.', { cue: 'The tubing is not kinked and the velcro is even along the leg.' }),
        leaf('start-pump-only-once-the-sleeve-is-on', 'Start a sequential pump after the sleeve is on', 'Sequence device and patient.', { cue: 'The sleeve is fully on before the pump starts.' }),
        leaf('fit-teds-to-height-smooth-the-roll', 'Fit TED stockings to the specified height', 'Apply graduated compression.', { cue: 'To height, with any roll at the top smoothed out.' }),
        leaf('wrap-figure-eight-even-pressure', 'Wrap a figure-of-eight', 'Bandage a joint.', { cue: 'Pressure is even and no turn tourniquets the limb.' }),
        leaf('wrap-spiral-and-secure-the-end', 'Wrap a spiral', 'Bandage a limb.', { cue: 'Even along the limb and the end is secured so it cannot unwind.' }),
        leaf('recover-limb-cool-below-a-wrap', 'Recover: limb cool or dusky below a wrap', 'Remove it immediately and reassess rather than loosening it.', { fail: true, horizon: 'short' }),
      ]),
      node('slings-and-packs', 'Slings, ice and heat', 'Supports and thermal therapy with a clock on them.', { dexterity: 4 }, [
        leaf('fit-limb-sling-strap-off-the-neck', 'Fit a sling for a limb', 'Support an arm.', { cue: 'The elbow is in and the strap rests on the shoulder, not on the neck.' }),
        leaf('fit-ice-pack-covered-and-timed', 'Fit an ice pack with a cover', 'Apply cold therapy.', { cue: 'Covered, and left only for the specified time.' }),
        leaf('fit-heat-pack-covered-and-timed', 'Fit a heat pack with a cover', 'Apply heat therapy.', { cue: 'Covered, and the same time rule as cold.' }),
        leaf('recover-skin-reaction-under-a-pack', 'Recover: skin reaction under a thermal pack', 'Remove it, document it, and do not reapply to that site.', { fail: true }),
      ]),
    ]),

    node('simulation', 'Skills captured on manikins and task trainers', 'The route that makes most of this domain recordable at all.', { partner: 'site', rights: 'easy', ethics: 'open', capital: 'capex', skillYears: 'years', robotNow: 'no', saturation: 'empty', contact: 5, dexterity: 5, precision: 5, prev: 'common', notes: 'Every leaf in this family is performed on a manikin or a task trainer, never on a patient. Simulation suites are instrumented rooms built to be observed, with learners who consent as a condition of the course. That removes the patient, the consent problem and the regulated partner in one move, and it is why these score far higher than the same act on a ward. Nothing here should be captured on a person.' }, [
      node('airway', 'Airway management on a manikin', 'The highest-consequence motor skill in the domain.', { horizon: 'short' }, [
        leaf('two-hand-bvm-seal-and-squeeze', 'Two-hand bag-mask seal and squeeze', 'Ventilate a manikin with a bag valve mask.', { cue: 'No leak at the sides and the squeeze comes on the count.', prim: ['bimanual', 'language'], notes: 'A two-person skill where one holds the seal and cannot see the chest they are ventilating.' }),
        leaf('oral-suction-pass-on-the-line', 'Pass oral suction on the specified line', 'Suction an airway on a trainer.', { cue: 'Inserted and withdrawn on the same line, and the Yankauer is parked in its holder.' }),
        leaf('yankauer-sweep-clear-the-tip', 'Sweep with a Yankauer and clear the tip', 'Clear an airway on a trainer.', { cue: 'The tip is cleared before the next pass.' }),
        leaf('recover-lost-seal-mid-ventilation', 'Recover: seal lost part-way through ventilation', 'Reseat the mask rather than squeezing harder.', { fail: true }),
      ]),
      node('tracheostomy', 'Tracheostomy care on a trainer', 'A protected airway that must not be dislodged.', { precision: 5 }, [
        leaf('fit-trach-ties-one-finger', 'Fit tracheostomy ties', 'Secure a trach tube on a trainer.', { cue: 'One finger fits under the ties and the tube cannot ride up or down.' }),
        leaf('swap-inner-cannula-and-lock', 'Swap an inner cannula and lock it', 'Change an inner cannula on a trainer.', { cue: 'It locks and cannot pull out under a simulated cough.', verify: 'Tug the cannula after locking.' }),
        leaf('trach-suction-on-withdrawal-only', 'Suction a tracheostomy on a trainer', 'Suction a protected airway.', { cue: 'Inserted to the specified depth, suction applied only on withdrawal, then oxygen or rest as ordered.' }),
        leaf('fit-speaking-valve-watch-first-breaths', 'Fit a speaking valve', 'Place a valve on a trainer.', { cue: 'You stay and watch the first breaths rather than walking away.' }),
        leaf('recover-tube-displaced-during-care', 'Recover: tube displaced during care', 'Call for help and follow the emergency algorithm rather than attempting to replace it.', { fail: true, horizon: 'short' }),
      ]),
      node('sterile-field', 'Sterile technique on a field', 'Where the whole skill is what you did not touch.', { dexterity: 5, precision: 5 }, [
        leaf('open-pack-without-reaching-over', 'Open a sterile pack', 'Present a sterile field.', { cue: 'Your hand never passes over the field at any point.' }),
        leaf('drop-item-from-height-or-treat-unsterile', 'Drop a sterile item onto the field', 'Add to a field.', { cue: 'Dropped from the specified height; if it lands short it is treated as unsterile, not repositioned.', notes: 'The recovery is discarding it. Adjusting a near-miss is the failure.' }),
        leaf('hold-limb-out-of-the-paint-line', 'Hold a limb for prep', 'Support a limb during skin preparation.', { cue: 'Your hand stays out of the painted area throughout.' }),
        leaf('hold-a-stance-you-can-keep', 'Hold a retractor or limb in a sustainable stance', 'Maintain a static hold.', { cue: 'A stance you can keep; if you begin to shake you ask for relief rather than adjusting.', contact: 5, horizon: 'long' }),
        leaf('pass-instrument-handle-first', 'Pass an instrument handle first', 'Hand over a sharp or an instrument.', { cue: 'The handle meets the receiving hand, never the point.' }),
        leaf('suture-cut-to-tail-length-park-scissors', 'Cut a suture to the specified tail', 'Trim a suture on a trainer.', { cue: 'The tail is the specified length and the scissors are parked immediately after.' }),
        leaf('recover-field-contaminated', 'Recover: field contaminated', 'Declare it and restart rather than working around the contaminated area.', { fail: true, prim: ['language', 'recover'] }),
      ]),
      node('procedural-assist', 'Assisting procedures on a trainer', 'Supporting rather than performing.', { dexterity: 5, contact: 5 }, [
        leaf('hold-arm-for-venipuncture-out-of-the-line', 'Hold an arm for venipuncture', 'Stabilise a limb for a needle procedure on a trainer.', { cue: 'The vein is still and your fingers are out of the stick line.' }),
        leaf('pack-a-wound-to-the-ordered-depth', 'Pack a wound to the ordered depth', 'Pack a wound model.', { cue: 'To the ordered depth and no further, with the count recorded.' }),
        leaf('flush-a-line-clamp-and-keep-the-end-clear', 'Flush a line and clamp it', 'Flush a line on a trainer.', { cue: 'The specified push, clamped after, and the end never touches the bed.' }),
        leaf('feed-via-syringe-stop-on-resistance', 'Feed via syringe at the specified rate', 'Deliver a bolus on a trainer.', { cue: 'You stop if the resistance is wrong or if a simulated cough occurs.' }),
        leaf('flush-g-tube-clamp-as-specified', 'Flush a gastrostomy tube', 'Flush an enteral tube on a trainer.', { cue: 'The clamp is left in the specified state afterwards.' }),
        leaf('vent-g-tube-into-the-container', 'Vent a gastrostomy tube', 'Decompress an enteral tube on a trainer.', { cue: 'Output is caught in the specified container.' }),
        leaf('recover-resistance-met-on-a-flush', 'Recover: resistance met while flushing', 'Stop and escalate rather than applying more pressure.', { fail: true }),
      ]),
      node('immobilisation', 'Spinal immobilisation and restraint', 'Holding a person still, practised on a manikin.', { contact: 5, dexterity: 3, ethics: 'restricted', notes: 'The only part of the simulation family that keeps an ethics flag. Restraining a person is ethically loaded even when the person is a manikin, and it should never be seeded as a neutral motor task.' }, [
        leaf('hold-c-spine-until-relieved', 'Hold cervical spine immobilisation', 'Maintain manual in-line stabilisation on a manikin.', { cue: 'Your hands do not leave until the collar or the board is on and somebody says so.', prim: ['bimanual', 'language'] }),
        leaf('fit-backboard-straps-in-order-and-tug', 'Fit backboard straps in the specified order', 'Secure a manikin to a board.', { cue: 'The specified order, and every strap is tugged after it is closed.' }),
        leaf('fit-soft-restraints-two-fingers', 'Fit soft restraints to the frame', 'Apply ordered restraints on a manikin.', { cue: 'To the specified frame points, with two fingers under each, and quick-release accessible.', notes: 'Seeded because applying ordered restraints badly causes real injury, and because the skill is taught on manikins. Never captured on a person, and never seeded as anything but a trained, ordered act.' }),
        leaf('remove-restraints-restore-a-supported-pose', 'Remove restraints and restore the limb', 'Release restraints on a manikin.', { cue: 'The limb finishes in a supported position rather than dropped.' }),
        leaf('recover-restraint-too-tight-on-a-check', 'Recover: restraint too tight at a check', 'Release it immediately and refit rather than loosening a notch.', { fail: true }),
      ]),
    ]),

    node('turnover', 'Bed strip and terminal clean', 'Turning a room around between patients, with no patient in it.', { partner: 'site', rights: 'easy', ethics: 'open', contact: 4, dexterity: 3, skillYears: 'none', prev: 'ubiquitous', notes: 'No patient present, so this is as capturable as any commercial cleaning task, and it has a strict directional discipline that most cleaning does not.' }, [
      node('turnover-tasks', 'Strip, clean and restock', 'A fixed order that runs clean to dirty and high to low.', { repetition: 'high-takt' }, [
        leaf('strip-bed-linen-into-the-bag', 'Strip a bed into the linen bag', 'Remove used linen.', { cue: 'Linen goes into the bag rather than onto the floor, and the mattress is left clear.' }),
        leaf('terminal-clean-high-to-low-clean-to-dirty', 'Terminal-clean in the specified pattern', 'Decontaminate a room.', { cue: 'High to low and clean to dirty, with the dirtiest surface done last.' }),
        leaf('draw-crash-cart-drawer-and-close-it', 'Draw a crash-cart drawer and close it', 'Access a resuscitation trolley.', { cue: 'Held so it cannot fall, and closed before the cart is moved.' }),
        leaf('make-surgical-bed-pulls-out-in-one', 'Make a surgical bed', 'Prepare a bed for a transfer in.', { cue: 'The top sheet will pull out in one motion after the patient is across.' }),
        leaf('recover-sharps-found-in-the-linen', 'Recover: sharp found in the linen', 'Stop, secure it in a sharps container and report before continuing the strip.', { fail: true, ethics: 'restricted' }),
      ]),
    ]),
  ],
)
