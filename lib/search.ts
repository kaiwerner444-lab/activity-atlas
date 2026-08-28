import { ATLAS } from './taxonomy'
import type { AtlasNode } from './types'

// The corpus is a few hundred rows, so a hand-rolled index beats pulling in a
// search library. Swap for Postgres tsvector when content moves to a database.

interface IndexRow {
  id: string
  haystack: string
  title: string
}

const INDEX: IndexRow[] = ATLAS.all.map((n) => ({
  id: n.id,
  title: n.title.toLowerCase(),
  haystack: [
    n.title,
    n.definition,
    n.path.join(' '),
    n.objects.join(' '),
    n.tools.join(' '),
    n.primitives.join(' '),
    n.facets.setting,
  ]
    .join(' ')
    .toLowerCase(),
}))

export interface SearchHit {
  node: AtlasNode
  score: number
}

export function search(query: string, limit = 40): SearchHit[] {
  const q = query.trim().toLowerCase()
  if (q.length < 2) return []
  const terms = q.split(/\s+/)
  const hits: SearchHit[] = []
  for (const row of INDEX) {
    let score = 0
    let all = true
    for (const term of terms) {
      if (row.title.startsWith(term)) score += 6
      else if (row.title.includes(term)) score += 4
      else if (row.haystack.includes(term)) score += 1
      else {
        all = false
        break
      }
    }
    if (!all) continue
    const node = ATLAS.nodes.get(row.id)!
    // Prefer specific nodes when scores tie: a leaf is a more useful answer.
    score += node.level * 0.4
    hits.push({ node, score })
  }
  hits.sort((a, b) => b.score - a.score)
  return hits.slice(0, limit)
}
