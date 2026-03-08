import { useState, useEffect } from 'react'
import type { ShoppingListItem, StoreLayout, StoreZone } from '../types'

import { ZoneGroup } from './ZoneGroup'
import { UnknownItemResolver } from './UnknownItemResolver'

// Route segments built locally to preserve original item indices
type IndexedEntry = { item: ShoppingListItem; originalIndex: number }
type IndexedSegment = { zone: StoreZone; entries: IndexedEntry[] }

function buildIndexedSegments(items: ShoppingListItem[], layout: StoreLayout): IndexedSegment[] {
  const zoneMap = new Map(layout.zones.map(z => [z.id, z]))
  const grouped = new Map<string, IndexedEntry[]>()

  items.forEach((item, originalIndex) => {
    const zid = item.zoneId ?? item.matched?.zoneId
    if (!zid) return
    if (!grouped.has(zid)) grouped.set(zid, [])
    grouped.get(zid)!.push({ item, originalIndex })
  })

  const segments: IndexedSegment[] = []
  for (const [zid, entries] of grouped) {
    const zone = zoneMap.get(zid)
    if (zone) segments.push({ zone, entries })
  }
  return segments.sort((a, b) => a.zone.order - b.zone.order)
}

interface RouteViewProps {
  items: ShoppingListItem[]
  otherNames: string[]
  store: StoreLayout
  onToggle: (index: number) => void
  onAssignZone: (index: number, zoneId: string) => void
  onReassign: (index: number, zoneId: string) => void
  onSkipToOther: (index: number) => void
  onEditList: () => void
  onNewList: () => void
  onSaveToCatalog: (name: string, zoneId: string) => void
}

export function RouteView({
  items,
  otherNames,
  store,
  onToggle,
  onAssignZone,
  onReassign,
  onSkipToOther,
  onEditList,
  onNewList,
  onSaveToCatalog,
}: RouteViewProps) {
  const [showReview, setShowReview] = useState(false)

  const otherSet = new Set(otherNames)

  const segments = buildIndexedSegments(items, store)

  const unknowns = items
    .map((item, originalIndex) => ({ item, originalIndex }))
    .filter(({ item }) =>
      !otherSet.has(item.raw.trim().toLowerCase()) &&
      !item.zoneId &&
      !item.matched?.zoneId
    )

  const routeItems = items.filter(item => item.zoneId ?? item.matched?.zoneId)
  const checkedCount = routeItems.filter(i => i.checked).length
  const totalCount = routeItems.length
  const allDone = totalCount > 0 && checkedCount === totalCount

  // Reset showReview whenever items become not-all-done (e.g. user unchecks something)
  useEffect(() => {
    if (!allDone) setShowReview(false)
  }, [allDone])

  function handleAssign(originalIndex: number, zoneId: string) {
    onAssignZone(originalIndex, zoneId)
    onSaveToCatalog(items[originalIndex].raw.trim().toLowerCase(), zoneId)
  }

  // All-done celebration
  if (allDone && !showReview) {
    return (
      <div className="max-w-lg mx-auto px-4 flex flex-col items-center justify-center min-h-[60vh] text-center gap-4">
        <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center">
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">All done!</h2>
        <p className="text-gray-500 dark:text-gray-400">You&rsquo;re all set to checkout.</p>
        <div className="flex gap-3 mt-2">
          <button
            onClick={() => setShowReview(true)}
            className="px-5 py-3 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 rounded-xl font-medium text-sm"
          >
            Review List
          </button>
          <button
            onClick={onNewList}
            className="px-5 py-3 bg-blue-500 text-white rounded-xl font-medium text-sm"
          >
            New List
          </button>
        </div>
      </div>
    )
  }

  // Empty state
  if (items.length === 0) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <p className="text-gray-400 dark:text-gray-500 mb-4">No items in your list.</p>
        <button onClick={onEditList} className="text-blue-500 dark:text-blue-400 text-sm underline">
          Add items
        </button>
      </div>
    )
  }

  return (
    <div>
      {/* Sticky progress header — sits directly below the app nav (top-14 = 56px) */}
      <div className="sticky top-14 z-20 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-lg mx-auto px-4 pt-3 pb-2">
          <div className="flex items-center justify-between mb-2">
            <button
              onClick={onEditList}
              className="flex items-center gap-1 text-sm text-blue-500 dark:text-blue-400 min-h-[44px]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              Edit list
            </button>
            <span className="text-sm text-gray-500 dark:text-gray-400 tabular-nums">
              {checkedCount} / {totalCount} checked
            </span>
          </div>
          <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-green-500 rounded-full transition-all duration-300"
              style={{ width: totalCount > 0 ? `${(checkedCount / totalCount) * 100}%` : '0%' }}
            />
          </div>
        </div>
      </div>

      {/* Unknown item resolver */}
      {unknowns.length > 0 && (
        <div className="max-w-lg mx-auto">
          <UnknownItemResolver
            unknowns={unknowns}
            zones={store.zones}
            onAssign={handleAssign}
            onSkip={onSkipToOther}
          />
        </div>
      )}

      {/* Route segments */}
      <div className="max-w-lg mx-auto">
        {segments.length === 0 && unknowns.length === 0 && (
          <p className="text-center text-gray-400 dark:text-gray-500 py-12 text-sm">
            No items matched any zone. Try assigning zones above.
          </p>
        )}
        {segments.map(({ zone, entries }) => (
          <ZoneGroup
            key={zone.id}
            zone={zone}
            entries={entries}
            zones={store.zones}
            onToggle={onToggle}
            onReassign={onReassign}
          />
        ))}
      </div>

    </div>
  )
}
