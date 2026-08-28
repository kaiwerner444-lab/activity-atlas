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

## Stack

Next.js 15 App Router, React 19, TypeScript, Tailwind v4, `d3-hierarchy` for cluster
packing. No mind-map library: they optimise for editing trees, not for coverage
colouring and semantic zoom. Content is a TypeScript repo today and moves to Postgres
when coverage events and auth arrive.
