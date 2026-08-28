'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { HighlightMode } from './colors'
import {
  EMPTY_FILTERS,
  computeMatches,
  parseFilters,
  serialiseFilters,
  type FilterState,
  type MatchResult,
} from './filters'
import type { CollectionPlan } from './types'

// URL is the state. A slice of the atlas has to survive being pasted into an
// email to a lab, so focus, filters, highlight and the timeline all round-trip.

interface AtlasState {
  focusId: string | null
  selectedId: string | null
  filters: FilterState
  highlight: HighlightMode
  /** ISO date cutoff for the coverage timeline. */
  asOf: string
  showKin: boolean
  plans: CollectionPlan[]
  matches: MatchResult
  hydrated: boolean
  setFocus: (id: string | null) => void
  setSelected: (id: string | null) => void
  setFilters: (updater: (prev: FilterState) => FilterState) => void
  setHighlight: (mode: HighlightMode) => void
  setAsOf: (date: string) => void
  setShowKin: (on: boolean) => void
  addToPlan: (planId: string, nodeIds: string[]) => void
  createPlan: (name: string, nodeIds: string[]) => string
  removeFromPlan: (planId: string, nodeId: string) => void
  deletePlan: (planId: string) => void
}

const Ctx = createContext<AtlasState | null>(null)

export const TIMELINE_END = '2026-12-31'
const PLANS_KEY = 'atlas.plans.v1'

export function AtlasProvider({ children }: { children: ReactNode }) {
  const [focusId, setFocusId] = useState<string | null>(null)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [filters, setFiltersState] = useState<FilterState>(EMPTY_FILTERS)
  const [highlight, setHighlight] = useState<HighlightMode>('coverage')
  const [asOf, setAsOf] = useState<string>(TIMELINE_END)
  const [showKin, setShowKin] = useState(false)
  const [plans, setPlans] = useState<CollectionPlan[]>([])
  const [hydrated, setHydrated] = useState(false)

  // Read deep-link state once on mount. Server and first client render agree on
  // the defaults, so there is no hydration mismatch to paper over.
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const path = params.get('path')
    if (path) setFocusId(path)
    const sel = params.get('sel')
    if (sel) setSelectedId(sel)
    const f = params.get('facets')
    if (f) setFiltersState(parseFilters(f))
    const hl = params.get('hl')
    if (hl) setHighlight(hl as HighlightMode)
    const t = params.get('t')
    if (t) setAsOf(t)
    if (params.get('kin') === '1') setShowKin(true)
    try {
      const stored = window.localStorage.getItem(PLANS_KEY)
      if (stored) setPlans(JSON.parse(stored) as CollectionPlan[])
    } catch {
      // A corrupt plan list should never stop the map from loading.
    }
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (!hydrated) return
    const params = new URLSearchParams()
    if (focusId) params.set('path', focusId)
    if (selectedId) params.set('sel', selectedId)
    const f = serialiseFilters(filters)
    if (f) params.set('facets', f)
    if (highlight !== 'coverage') params.set('hl', highlight)
    if (asOf !== TIMELINE_END) params.set('t', asOf)
    if (showKin) params.set('kin', '1')
    const qs = params.toString()
    const url = `${window.location.pathname}${qs ? `?${qs}` : ''}`
    window.history.replaceState(null, '', url)
  }, [focusId, selectedId, filters, highlight, asOf, showKin, hydrated])

  useEffect(() => {
    if (!hydrated) return
    try {
      window.localStorage.setItem(PLANS_KEY, JSON.stringify(plans))
    } catch {
      // Private browsing, quota, whatever. Plans are convenience, not truth.
    }
  }, [plans, hydrated])

  const matches = useMemo(() => computeMatches(filters), [filters])

  const setFilters = useCallback((updater: (prev: FilterState) => FilterState) => {
    setFiltersState((prev) => updater(prev))
  }, [])

  const createPlan = useCallback((name: string, nodeIds: string[]) => {
    const id = `plan-${Math.random().toString(36).slice(2, 8)}`
    setPlans((prev) => [
      ...prev,
      { id, name, nodeIds: Array.from(new Set(nodeIds)), targetHours: 0, status: 'draft' },
    ])
    return id
  }, [])

  const addToPlan = useCallback((planId: string, nodeIds: string[]) => {
    setPlans((prev) =>
      prev.map((p) =>
        p.id === planId ? { ...p, nodeIds: Array.from(new Set([...p.nodeIds, ...nodeIds])) } : p,
      ),
    )
  }, [])

  const removeFromPlan = useCallback((planId: string, nodeId: string) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === planId ? { ...p, nodeIds: p.nodeIds.filter((n) => n !== nodeId) } : p)),
    )
  }, [])

  const deletePlan = useCallback((planId: string) => {
    setPlans((prev) => prev.filter((p) => p.id !== planId))
  }, [])

  const value: AtlasState = {
    focusId,
    selectedId,
    filters,
    highlight,
    asOf,
    showKin,
    plans,
    matches,
    hydrated,
    setFocus: setFocusId,
    setSelected: setSelectedId,
    setFilters,
    setHighlight,
    setAsOf,
    setShowKin,
    addToPlan,
    createPlan,
    removeFromPlan,
    deletePlan,
  }

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useAtlas(): AtlasState {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useAtlas must be used inside AtlasProvider')
  return ctx
}
