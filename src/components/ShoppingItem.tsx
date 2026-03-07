import type { ShoppingListItem } from '../types'

interface ShoppingItemProps {
  item: ShoppingListItem
  onToggle: () => void
}

export function ShoppingItem({ item, onToggle }: ShoppingItemProps) {
  return (
    <button
      onClick={onToggle}
      className="w-full flex items-center gap-3 px-4 min-h-[52px] py-3 text-left
                 border-b border-gray-100 dark:border-gray-800
                 bg-white dark:bg-gray-950
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
        className={`text-base transition-colors ${
          item.checked
            ? 'line-through text-gray-400 dark:text-gray-500'
            : 'text-gray-900 dark:text-gray-100'
        }`}
      >
        {item.raw}
      </span>
    </button>
  )
}
