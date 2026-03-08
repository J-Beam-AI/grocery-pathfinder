import { useState } from 'react'
import type { ShoppingListItem, StoreZone } from '../types'

interface ShoppingItemProps {
  item: ShoppingListItem
  onToggle: () => void
  currentZone?: StoreZone
  zones?: StoreZone[]
  onReassign?: (zoneId: string) => void
}

export function ShoppingItem({ item, onToggle, currentZone, zones, onReassign }: ShoppingItemProps) {
  const [reassigning, setReassigning] = useState(false)

  function handleZoneTap(e: React.MouseEvent) {
    e.stopPropagation()
    setReassigning(true)
  }

  function handleZoneChange(e: React.ChangeEvent<HTMLSelectElement>) {
    e.stopPropagation()
    onReassign?.(e.target.value)
    setReassigning(false)
  }

  function handleZoneBlur() {
    setReassigning(false)
  }

  return (
    <div
      className="w-full flex items-center gap-3 px-4 min-h-[52px] py-3
                 border-b border-gray-100 dark:border-gray-800
                 bg-white dark:bg-gray-950"
    >
      {/* Checkbox + item name — main tap target */}
      <button
        onClick={onToggle}
        className="flex items-center gap-3 flex-1 min-w-0 text-left
                   active:bg-gray-50 dark:active:bg-gray-800/60 transition-colors"
      >
        {/* Circle checkbox */}
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
            item.checked
              ? 'bg-green-500 border-green-500'
              : 'border-gray-300 dark:border-gray-600'
          }`}
        >
          {item.checked && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6l3 3 5-5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </span>

        {/* Item name */}
        <span
          className={`text-base transition-colors truncate ${
            item.checked
              ? 'line-through text-gray-400 dark:text-gray-500'
              : 'text-gray-900 dark:text-gray-100'
          }`}
        >
          {item.raw}
        </span>
      </button>

      {/* Zone badge — tap to reassign */}
      {currentZone && zones && onReassign && (
        reassigning ? (
          <select
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            defaultValue={currentZone.id}
            onChange={handleZoneChange}
            onBlur={handleZoneBlur}
            onClick={e => e.stopPropagation()}
            className="text-xs bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600
                       rounded-lg px-2 py-1 min-h-[36px] outline-none max-w-[140px]
                       text-gray-700 dark:text-gray-200"
          >
            {[...zones].sort((a, b) => a.order - b.order).map(z => (
              <option key={z.id} value={z.id}>{z.name}</option>
            ))}
          </select>
        ) : (
          <button
            onClick={handleZoneTap}
            className="flex-shrink-0 flex items-center gap-1 px-2 py-1 rounded-lg
                       bg-gray-100 dark:bg-gray-800 text-xs font-medium
                       text-gray-500 dark:text-gray-400
                       active:bg-gray-200 dark:active:bg-gray-700 transition-colors min-h-[36px]"
            aria-label={`Reassign aisle — currently ${currentZone.name}`}
          >
            <span>{currentZone.id}</span>
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        )
      )}
    </div>
  )
}
