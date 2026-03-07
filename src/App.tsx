import { useState, useRef } from 'react'
import { StoreSetup } from './components/StoreSetup'
import { ListInput } from './components/ListInput'
import { RouteView } from './components/RouteView'
import { useStore } from './hooks/useStore'
import { useCatalog } from './hooks/useCatalog'
import { useShoppingList } from './hooks/useShoppingList'
import { storageGet } from './lib/storage'
import type { ShoppingListItem } from './types'

type Screen = 'input' | 'route' | 'store-setup'

function initialScreen(): Screen {
  // Resume shopping if there's a saved list with items
  const saved = storageGet<ShoppingListItem[]>('shopping-list')
  return saved && saved.length > 0 ? 'route' : 'input'
}

export default function App() {
  const [screen, setScreen] = useState<Screen>(initialScreen)
  const { store } = useStore()
  const { catalog, addItem } = useCatalog()
  const { items, parseList, toggleItem, assignZone, clearList } = useShoppingList()

  // True only when the user explicitly came back via "Edit list".
  // Reset to false on generate, on explicit clear, and on "New List".
  const preserveChecked = useRef(false)

  function handleGenerate(rawText: string) {
    const prevItems = preserveChecked.current ? items : []
    preserveChecked.current = false
    parseList(rawText, catalog, prevItems)
    setScreen('route')
  }

  function handleAddToCatalog(raw: string, zoneId: string) {
    addItem({ name: raw.trim().toLowerCase(), aliases: [], zoneId })
  }

  // "Edit list" — go back to input without clearing; preserve checked state on next generate
  function handleEditList() {
    preserveChecked.current = true
    setScreen('input')
  }

  // Called when the user explicitly clears the textarea — a fresh list is intended
  function handleClearDraft() {
    preserveChecked.current = false
  }

  // "New List" — clear everything and start fresh
  function handleNewList() {
    preserveChecked.current = false
    clearList()
    try { localStorage.removeItem('list-draft') } catch { /* ignore */ }
    setScreen('input')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Top nav */}
      <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => setScreen('input')}
            className="text-lg font-bold tracking-tight"
          >
            Grocery Pathfinder
          </button>
          <button
            onClick={() => setScreen(screen === 'store-setup' ? 'input' : 'store-setup')}
            aria-label="Store setup"
            className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg px-2 transition-colors ${
              screen === 'store-setup'
                ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.07 4.93A10 10 0 0 0 4.93 19.07M4.93 4.93A10 10 0 0 1 19.07 19.07" />
              <path d="M12 2v2M12 20v2M2 12h2M20 12h2" />
            </svg>
          </button>
        </div>
      </header>

      <main>
        {screen === 'input' && (
          <ListInput onGenerate={handleGenerate} onClear={handleClearDraft} />
        )}

        {screen === 'route' && (
          <RouteView
            items={items}
            store={store}
            onToggle={toggleItem}
            onAssignZone={assignZone}
            onEditList={handleEditList}
            onNewList={handleNewList}
            onAddToCatalog={handleAddToCatalog}
          />
        )}

        {screen === 'store-setup' && <StoreSetup onBack={() => setScreen('input')} />}
      </main>
    </div>
  )
}
