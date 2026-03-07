import type { StoreZone, ShoppingListItem } from '../types'
import { ShoppingItem } from './ShoppingItem'
import { getZoneAccent } from '../lib/zoneColors'

interface ZoneGroupProps {
  zone: StoreZone
  entries: { item: ShoppingListItem; originalIndex: number }[]
  onToggle: (originalIndex: number) => void
}

export function ZoneGroup({ zone, entries, onToggle }: ZoneGroupProps) {
  const checked = entries.filter(e => e.item.checked).length
  const total = entries.length
  const accent = getZoneAccent(zone.order)

  return (
    <div>
      {/* Sticky zone header */}
      <div
        className="sticky top-14 z-10 flex items-center gap-2 px-4 py-2
                   bg-gray-50 dark:bg-gray-900
                   border-b border-gray-200 dark:border-gray-700"
        style={{ borderLeft: `4px solid ${accent}` }}
      >
        <span className="flex-1 text-sm font-semibold text-gray-700 dark:text-gray-200 truncate">
          {zone.name}
        </span>
        <span className="text-xs font-medium tabular-nums" style={{ color: accent }}>
          {checked}/{total}
        </span>
      </div>

      {/* Items */}
      {entries.map(({ item, originalIndex }) => (
        <ShoppingItem
          key={originalIndex}
          item={item}
          onToggle={() => onToggle(originalIndex)}
        />
      ))}
    </div>
  )
}
