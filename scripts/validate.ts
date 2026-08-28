/**
 * Seed integrity check. Run with `npm run validate`.
 *
 * Catches the two mistakes that actually happen while authoring content:
 * a coverage event pointing at a node id that does not exist, and a procedure
 * with happy-path leaves but no failure leaf, which is how the recovery thesis
 * quietly falls out of the taxonomy.
 */
import { ATLAS, STATS } from '../lib/taxonomy'

let failures = 0

if (ATLAS.unmatchedEventNodeIds.length > 0) {
  failures++
  console.error('Coverage events pointing at unknown nodes:')
  for (const id of ATLAS.unmatchedEventNodeIds) console.error(`  ${id}`)
}

const duplicateIds = new Set<string>()
const seen = new Set<string>()
for (const node of ATLAS.all) {
  if (seen.has(node.id)) duplicateIds.add(node.id)
  seen.add(node.id)
}
if (duplicateIds.size > 0) {
  failures++
  console.error('Duplicate node ids:', Array.from(duplicateIds).join(', '))
}

const proceduresWithoutRecovery = ATLAS.all.filter(
  (n) =>
    n.level === 2 &&
    n.childIds.length > 0 &&
    !n.childIds.some((c) => ATLAS.nodes.get(c)!.fail) &&
    n.facets.ethics !== 'prohibited',
)

const emptyDefinitions = ATLAS.all.filter((n) => n.definition.trim().length < 12)
if (emptyDefinitions.length > 0) {
  failures++
  console.error('Nodes with a missing or trivial definition:')
  for (const n of emptyDefinitions) console.error(`  ${n.id}`)
}

console.log('Activity Atlas seed')
console.log(`  nodes        ${STATS.nodes}`)
console.log(`  domains      ${STATS.domains}`)
console.log(`  families     ${STATS.families}`)
console.log(`  procedures   ${STATS.procedures}`)
console.log(`  activities   ${STATS.activities}`)
console.log(`  scored leaves ${STATS.leaves} (${STATS.failLeaves} failure / rework)`)
console.log(`  our hours    ${Math.round(STATS.ourHours)}`)
console.log(
  `  procedures with Z3 children but no recovery leaf: ${proceduresWithoutRecovery.length}`,
)
for (const n of proceduresWithoutRecovery.slice(0, 20)) console.log(`    ${n.id}`)

if (failures > 0) {
  console.error(`\n${failures} integrity problem(s).`)
  process.exit(1)
}
console.log('\nSeed OK.')
