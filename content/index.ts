import type { NodeSpec } from '@/lib/types'
import { d01 } from './domains/d01-kitchen'
import { d02 } from './domains/d02-living'
import { d03 } from './domains/d03-home-repair'
import { d04 } from './domains/d04-apparel'
import { d05 } from './domains/d05-retail'
import { d06 } from './domains/d06-foodservice'
import { d07 } from './domains/d07-healthcare'
import { d08 } from './domains/d08-construction'
import { d09 } from './domains/d09-electrical'
import { d10 } from './domains/d10-mechanical'
import { d11 } from './domains/d11-harness'
import { d12 } from './domains/d12-process'
import { d13 } from './domains/d13-agriculture'
import { d14 } from './domains/d14-vehicles'
import { d15 } from './domains/d15-labs'
import { d16 } from './domains/d16-cleaning'
import { d17 } from './domains/d17-logistics'
import { d18 } from './domains/d18-sports'
import { d19 } from './domains/d19-social'
import { d20 } from './domains/d20-recovery'

/** Order is the stable layout order. Do not reshuffle: positions are seeded from it. */
export const DOMAINS: NodeSpec[] = [
  d01, d02, d03, d04, d05, d06, d07, d08, d09, d10,
  d11, d12, d13, d14, d15, d16, d17, d18, d19, d20,
]
