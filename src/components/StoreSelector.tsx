import { ALL_STORES } from '../lib/storeRegistry'

interface StoreSelectorProps {
  activeStoreId: string
  onSelect: (storeId: string) => void
}

export function StoreSelector({ activeStoreId, onSelect }: StoreSelectorProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
      {ALL_STORES.map(store => {
        const isActive = store.id === activeStoreId
        return (
          <button
            key={store.id}
            onClick={() => onSelect(store.id)}
            className={`flex-shrink-0 min-h-[44px] px-4 py-2 rounded-full text-sm font-medium
                        transition-colors whitespace-nowrap
                        ${isActive
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 active:bg-gray-200 dark:active:bg-gray-700'
                        }`}
          >
            {store.shortLabel ?? store.name}
          </button>
        )
      })}
    </div>
  )
}
