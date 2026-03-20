import { useState } from 'react'
import type { StoreZone, ShoppingListItem } from '../types'

interface UnknownEntry {
  item: ShoppingListItem
  originalIndex: number
}

interface UnknownItemResolverProps {
  unknowns: UnknownEntry[]
  zones: StoreZone[]
  onAssign: (originalIndex: number, zoneId: string) => void
  onSkip: (originalIndex: number) => void
}

export function UnknownItemResolver({ unknowns, zones, onAssign, onSkip }: UnknownItemResolverProps) {
  const sortedZones = [...zones].sort((a, b) => a.order - b.order)
  const defaultZoneId = sortedZones[0]?.id ?? ''

  // Track zone selection per item
  const [selections, setSelections] = useState<Record<number, string>>(() =>
    Object.fromEntries(unknowns.map(u => [u.originalIndex, defaultZoneId]))
  )

  if (unknowns.length === 0) return null

  function getSelection(idx: number): string {
    return selections[idx] ?? defaultZoneId
  }

  return (
    <div className="mx-4 my-3 rounded-xl border border-amber-300 dark:border-amber-700 bg-amber-50 dark:bg-amber-950/40 overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b border-amber-200 dark:border-amber-800">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5">
          <circle cx="12" cy="12" r="10" />
          <line x1="12" y1="8" x2="12" y2="12" />
          <line x1="12" y1="16" x2="12.01" y2="16" />
        </svg>
        <span className="text-sm font-semibold text-amber-800 dark:text-amber-200">
          {unknowns.length} item{unknowns.length !== 1 ? 's' : ''} need a location
        </span>
      </div>

      {/* One row per unknown item */}
      {unknowns.map(({ item, originalIndex }) => (
        <div
          key={originalIndex}
          className="px-4 py-3 border-b border-amber-200 dark:border-amber-800 last:border-0"
        >
          <p className="text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
            &ldquo;{item.raw}&rdquo;
          </p>
          <div className="flex gap-2">
            <select
              value={getSelection(originalIndex)}
              onChange={e =>
                setSelections(prev => ({ ...prev, [originalIndex]: e.target.value }))
              }
              className="flex-1 min-w-0 text-sm bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-700 rounded-lg px-3 py-2 min-h-[44px] outline-none"
            >
              {/* optgroup label stays visible inside the native picker on mobile
                  so the user can see which item they're assigning while scrolling zones */}
              <optgroup label={`"${item.raw}"`}>
                {sortedZones.map(z => (
                  <option key={z.id} value={z.id}>
                    {z.name}
                  </option>
                ))}
              </optgroup>
            </select>
            <button
              onClick={() => onAssign(originalIndex, getSelection(originalIndex))}
              className="px-4 min-h-[44px] bg-amber-500 text-white text-sm font-medium rounded-lg flex-shrink-0"
            >
              Add
            </button>
            <button
              onClick={() => onSkip(originalIndex)}
              className="px-3 min-h-[44px] text-gray-500 dark:text-gray-400 text-sm rounded-lg flex-shrink-0"
            >
              Skip
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
