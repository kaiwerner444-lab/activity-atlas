# Activity Atlas

A zoomable map of human physical activity, built to answer one operational question:
**what could a robot or world model need to learn, and who already has data on it?**

"Diversity" is a vibe. This is the version you can sort.

- **Atlas** — a text mind map of every activity in the taxonomy, grouped by domain.
  Scroll to go deeper: World → domain → family → procedure. Nothing is drawn between
  the labels; a group is whatever sits together.
- **Coverage** — the Monday morning screen. Every terminal node, sorted by gap score.
- **Collect** — what a suit can walk in and record tomorrow, and what needs somebody
  else to open a door.
- **Protocols** — capture session scripts, kept deliberately separate from the
  taxonomy. A protocol has calibration poses, restart rules, repetitions and
  labelled contrast trials, none of which are activities anybody performs for a
  reason.
- **Catalog** — the whole seed, flat, with primitives and collector biases.

## The model

Two trees and a pile of facets.

- **Domain tree** (where): 20 root domains, from home kitchens to wiring plants, each
  expanding to families, procedures and concrete activities.
- **Primitive tree** (what the body does): reach, grasp, insert, fasten, separate,
  deform, transfer, tool, bimanual, locomote, inspect, language, recover. An activity
  has one primary domain and one or more primitives.
- **Facets** are filters, never extra trees: setting, dexterity, precision, contact
  richness, horizon, repetition, capital intensity, partner gate, skill years, suit
  fitness, robot attemptability, embodiment, industry saturation, our coverage, rights
  difficulty, safety and ethics.

Failure and recovery is both a cross-cutting root domain (D20) and a flag on leaves in
every other domain. Every procedure in the three dense industrial domains (D09, D10,
D11) carries at least one recovery leaf; `npm run validate` reports the ones that do
not.

## Gap score

```
gap = (1 − public saturation) × usefulness × feasibility × (1 − our coverage)
```

- **usefulness** — contact richness, robot attemptability and skill years.
- **feasibility** — partner gate × capital intensity, discounted for rights, and a hard
  zero for anything marked `prohibited`.

Blocked nodes stay on the map so nobody rediscovers them as a bright gap, and they are
excluded from the coverage table entirely. See `lib/scoring.ts`.

## Seeded content

783 nodes: 20 domains, 95 families, 193 procedures, 475 activities. 94 of the terminal
nodes are failure or rework activities. Everything is marked `seed`: it is editorial
content written to make the interface real, not a reviewed taxonomy. Gap scores inherit
that uncertainty until a human taxonomist goes through them.

Coverage rows for public datasets (Ego4D, EPIC-KITCHENS, Ego-Exo4D, Open X-Embodiment,
DROID, AgiBot World) are editorial estimates of where those corpora land in this
taxonomy, not counts pulled from the papers. They are the first thing that should be
replaced by a real dataset registry.

## Protocols are not taxonomy

An atlas leaf is a thing somebody does for a reason, with a condition that says it is
finished. A capture protocol is the ordered script for a recording session. They are
related and they are not the same document.

The distinction matters because collapsing them corrupts the map. A hundred-step
movement battery pasted into the tree would have the atlas report a hundred activities
in body skill, when what it really contains is one: run a movement battery in a suit.
The gap score would then rank the most saturated area of public motion data as a top
opportunity, purely because somebody wrote a hundred rows about it.

Protocols live in `content/protocols/` with their own model (`lib/protocol.ts`), and
carry the things a session needs and a taxonomy must not have: restart conditions,
deliberately incorrect contrast trials, calibration poses and sensor removal order.
Steps can link to atlas nodes they exercise, so the two artifacts stay connected
without being merged.

## Adding content

Content lives in `content/domains/*.ts` as nested `node()` and `leaf()` calls. A node
writes down only the facets that differ from its parent; everything else is inherited at
normalisation time.

```ts
node('terminate', 'Crimp and terminate', 'Making a gas-tight joint at the wire end.',
  { precision: 5, contact: 5, prim: ['insert', 'tool'] }, [
    leaf('crimp-ferrule-din', 'Crimp a ferrule and land it',
      'Slide a ferrule, crimp with a quad die, land it, tug test.',
      { repetition: 'high-takt', obj: ['bootlace ferrule 0.75'] }),
    leaf('recover-bad-crimp', 'Recover: crimp fails pull test',
      'Cut the terminal off, re-strip, re-crimp, re-test, log the reel.',
      { fail: true, horizon: 'medium' }),
  ])
```

Ids are stable slugs and compose into a path: `d11.terminate.crimp-ferrule-din`. Layout
is never stored; the client recomputes positions from the tree, deterministically, so a
node keeps its place across sessions and redeploys.

## Scripts

```bash
npm run dev        # local dev server
npm run build      # production build
npm run validate   # seed integrity: unknown coverage ids, duplicates, missing recovery leaves
npm run typecheck  # tsc --noEmit
```

## Deep links

State lives in the URL, so a slice survives being pasted into an email:

```
/?path=d11.formboard&facets=partner:none,contact:4&hl=gap
```

`path` is the focused node, `sel` the selected node, `facets` the filter set, `hl` the
colour mode, `t` the coverage timeline cutoff.

## Navigation

Scroll to go deeper, or click a label. Both do the same thing: enter the group. Esc or
double-click goes up, `/` searches, shift-drag lassos a set into a collection plan.

Input is handled by `d3-zoom` rather than by hand. Wheel events are the part that is
genuinely hard to get right: pixel, line and page delta modes report wildly different
magnitudes, every browser disagrees, a trackpad emits a stream of small deltas where a
mouse emits one large one, and trackpad pinch arrives as a wheel event with `ctrlKey`
set. d3 normalises all of it and registers non-passively so the page never scrolls
under the map. Two things sit on top:

- **Level crossing.** Zooming in far enough that a group would be comfortably framed
  enters it; zooming out past the current group leaves it. Thresholds are asymmetric so
  the two cannot chatter, and a cooldown stops trackpad inertia falling through three
  levels on one flick.
- **Flights use `interpolateZoom`**, d3's implementation of van Wijk and Nuij's optimal
  zoom path, where the apparent velocity of the content stays constant instead of the
  scale changing linearly. Duration comes from the path length it reports, so a hop to a
  neighbour is quick and a jump across the atlas gets the time it needs. Scrolling
  interrupts a flight, and the view settles onto the level you landed in once the wheel
  goes quiet.

The camera is stored as a centre and a half-height in world units and converted to a
zoom transform at the edge (`lib/camera.ts`). That is what keeps label sizes fixed in
screen pixels: the map renders through the viewBox rather than through a scaled group,
so text never inherits the zoom. The zoom behaviour is attached to the stage element,
not the SVG, because d3 reports the pointer in the listener's own coordinate system and
an SVG with a viewBox reports world units.

## Stack

Next.js 15 App Router, React 19, TypeScript, Tailwind v4. `d3-hierarchy` packs the
clusters, `d3-zoom` and `d3-interpolate` drive the camera. No mind-map library: they
optimise for editing trees, not for coverage colouring and semantic zoom. Content is a
TypeScript repo today and moves to Postgres when coverage events and auth arrive.
