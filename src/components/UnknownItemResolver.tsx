import { useState } from 'react'
import type { StoreZone, ShoppingListItem } from '../types'
import { getZoneAccent } from '../lib/zoneColors'

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

interface ZonePickerSheetProps {
  itemName: string
  zones: StoreZone[]
  selectedZoneId: string
  onSelect: (zoneId: string) => void
  onClose: () => void
}

function ZonePickerSheet({ itemName, zones, selectedZoneId, onSelect, onClose }: ZonePickerSheetProps) {
  return (
    /* Backdrop */
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/50"
      onClick={onClose}
    >
      {/* Sheet — stop propagation so tapping inside doesn't dismiss */}
      <div
        className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-t-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: '80vh' }}
        onClick={e => e.stopPropagation()}
      >
        {/* Sticky pinned item name header */}
        <div className="flex-shrink-0 px-4 pt-4 pb-3 border-b border-gray-200 dark:border-gray-700 bg-amber-50 dark:bg-amber-950/50">
          {/* Drag handle */}
          <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full mx-auto mb-3" />
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-1">
                Assign zone for
              </p>
              <p className="text-xl font-bold text-gray-900 dark:text-gray-50 leading-tight truncate">
                &ldquo;{itemName}&rdquo;
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400"
              aria-label="Cancel"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable zone list */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {zones.map(zone => {
            const accent = getZoneAccent(zone.order)
            const isSelected = zone.id === selectedZoneId
            return (
              <button
                key={zone.id}
                onClick={() => onSelect(zone.id)}
                className={[
                  'w-full flex items-center gap-3 px-4 py-3 text-left border-b border-gray-100 dark:border-gray-800 last:border-0',
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/40'
                    : 'active:bg-gray-50 dark:active:bg-gray-800/50',
                ].join(' ')}
              >
                {/* Color swatch */}
                <span
                  className="flex-shrink-0 w-3 h-3 rounded-full"
                  style={{ backgroundColor: accent }}
                />
                <span className={[
                  'flex-1 text-sm',
                  isSelected
                    ? 'font-semibold text-blue-700 dark:text-blue-300'
                    : 'text-gray-800 dark:text-gray-200',
                ].join(' ')}>
                  {zone.name}
                </span>
                {isSelected && (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export function UnknownItemResolver({ unknowns, zones, onAssign, onSkip }: UnknownItemResolverProps) {
  const sortedZones = [...zones].sort((a, b) => a.order - b.order)
  const defaultZoneId = sortedZones[0]?.id ?? ''

  const [selections, setSelections] = useState<Record<number, string>>(() =>
    Object.fromEntries(unknowns.map(u => [u.originalIndex, defaultZoneId]))
  )

  // Which item's zone picker sheet is open (originalIndex), or null
  const [openPickerFor, setOpenPickerFor] = useState<number | null>(null)

  if (unknowns.length === 0) return null

  function getSelection(idx: number): string {
    return selections[idx] ?? defaultZoneId
  }

  function getZoneName(zoneId: string): string {
    return sortedZones.find(z => z.id === zoneId)?.name ?? zoneId
  }

  return (
    <>
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
        {unknowns.map(({ item, originalIndex }) => {
          const selectedZoneId = getSelection(originalIndex)
          const selectedAccent = getZoneAccent(
            sortedZones.find(z => z.id === selectedZoneId)?.order ?? 0
          )
          return (
            <div
              key={originalIndex}
              className="px-4 py-3 border-b border-amber-200 dark:border-amber-800 last:border-0"
            >
              <p className="text-sm font-medium text-gray-800 dark:text-gray-100 mb-2">
                &ldquo;{item.raw}&rdquo;
              </p>
              <div className="flex gap-2">
                {/* Zone picker trigger */}
                <button
                  onClick={() => setOpenPickerFor(originalIndex)}
                  className="flex-1 min-w-0 flex items-center gap-2 text-sm bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-700 rounded-lg px-3 min-h-[44px] text-left"
                >
                  <span
                    className="flex-shrink-0 w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: selectedAccent }}
                  />
                  <span className="flex-1 truncate text-gray-800 dark:text-gray-100">
                    {getZoneName(selectedZoneId)}
                  </span>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-gray-400">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>
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
          )
        })}
      </div>

      {/* Bottom sheet zone picker */}
      {openPickerFor !== null && (
        <ZonePickerSheet
          itemName={unknowns.find(u => u.originalIndex === openPickerFor)?.item.raw ?? ''}
          zones={sortedZones}
          selectedZoneId={getSelection(openPickerFor)}
          onSelect={zoneId => {
            setSelections(prev => ({ ...prev, [openPickerFor!]: zoneId }))
            setOpenPickerFor(null)
          }}
          onClose={() => setOpenPickerFor(null)}
        />
      )}
    </>
  )
}
