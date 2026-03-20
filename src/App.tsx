import { useState, useRef, useEffect } from 'react'
import { StoreContextProvider, useStoreContext } from './context/StoreContext'
import { StoreSetup } from './components/StoreSetup'
import { ListInput } from './components/ListInput'
import { RouteView } from './components/RouteView'
import { OtherItemsScreen } from './components/OtherItemsScreen'
import { useStore } from './hooks/useStore'
import { useCatalog } from './hooks/useCatalog'
import { useShoppingList } from './hooks/useShoppingList'
import { useOtherItems } from './hooks/useOtherItems'
import { migrateStorage } from './lib/migrateStorage'
import { storageGet, storageSet } from './lib/storage'
import { getSeedCatalog, getDefaultStore, ALL_STORES } from './lib/storeRegistry'
import type { ShoppingListItem, StoreLayout } from './types'

type Screen = 'input' | 'route' | 'store-setup' | 'other-items'

function initialScreen(): Screen {
  const saved = storageGet<ShoppingListItem[]>('shopping-list')
  return saved && saved.length > 0 ? 'route' : 'input'
}

// Run migration once before any component mounts
migrateStorage()

function AppInner() {
  const { activeStoreId, setActiveStoreId } = useStoreContext()
  const [screen, setScreen] = useState<Screen>(initialScreen)
  const [toast, setToast] = useState<string | null>(null)

  const { store } = useStore(activeStoreId)
  const { catalog, addItem, updateItemZone } = useCatalog(activeStoreId)
  const { items, parseList, toggleItem, assignZone, clearList, rerouteItems } = useShoppingList()
  const { otherNames, addOtherItem, removeOtherItem } = useOtherItems()

  const preserveChecked = useRef(false)
  const prevScreenOtherItems = useRef<Screen>('input')
  const prevScreenSetup = useRef<Screen>('input')

  // On app init, re-route persisted list against the active store in case the store
  // changed since last session (e.g. after a crash mid-switch). Fixes stale progress
  // bar and empty aisle list on hard refresh.
  useEffect(() => {
    if (items.length > 0) {
      rerouteItems(catalog, store.zones, addItem)
    }
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  // Dismiss toast after 3 seconds
  useEffect(() => {
    if (!toast) return
    const id = setTimeout(() => setToast(null), 3000)
    return () => clearTimeout(id)
  }, [toast])

  function handleStoreSwitch(newStoreId: string) {
    if (newStoreId === activeStoreId) return
    setActiveStoreId(newStoreId)
    // Re-route items against the new store's catalog synchronously from localStorage
    const newCatalog = storageGet<typeof catalog>(`catalog:${newStoreId}`) ?? getSeedCatalog(newStoreId)
    const newLayout = storageGet<StoreLayout>(`store-layout:${newStoreId}`) ?? getDefaultStore(newStoreId)
    // addItem is still bound to the old store here; write directly to the new store's catalog key
    function saveToNewStore(item: typeof catalog[0]) {
      const key = `catalog:${newStoreId}`
      const existing = storageGet<typeof catalog>(key) ?? newCatalog
      if (!existing.some(c => c.name === item.name)) {
        storageSet(key, [...existing, item])
      }
    }
    rerouteItems(newCatalog, newLayout.zones, saveToNewStore)
    const found = ALL_STORES.find(s => s.id === newStoreId)
    setToast(`Switched to ${found?.name ?? newStoreId}.`)
  }

  function openOtherItems() {
    prevScreenOtherItems.current = screen
    setScreen('other-items')
  }

  function closeOtherItems() {
    setScreen(prevScreenOtherItems.current)
  }

  function openStoreSetup() {
    prevScreenSetup.current = screen
    setScreen('store-setup')
  }

  function closeStoreSetup() {
    setScreen(prevScreenSetup.current)
  }

  function handleGenerate(rawText: string) {
    const prevItems = preserveChecked.current ? items : []
    preserveChecked.current = false
    parseList(rawText, catalog, prevItems, store.zones, addItem)
    setScreen('route')
  }

  function handleSaveToCatalog(name: string, zoneId: string) {
    addItem({ name, aliases: [], zoneId })
  }

  function handleReassign(index: number, zoneId: string) {
    assignZone(index, zoneId)
    const item = items[index]
    if (item) {
      const catalogName = item.matched?.name ?? item.raw.trim().toLowerCase()
      updateItemZone(catalogName, zoneId)
    }
  }

  function handleSkipToOther(index: number) {
    const item = items[index]
    if (item) addOtherItem(item.raw)
  }

  function handleEditList() {
    preserveChecked.current = true
    setScreen('input')
  }

  function handleClearDraft() {
    preserveChecked.current = false
  }

  function handleNewList() {
    preserveChecked.current = false
    clearList()
    try { localStorage.removeItem('list-draft') } catch { /* ignore */ }
    setScreen('input')
  }

  const isOtherScreen = screen === 'other-items'
  const isSetupScreen = screen === 'store-setup'

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
      {/* Top nav */}
      <header className="sticky top-0 z-30 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm">
        <div className="max-w-lg mx-auto px-4 h-14 flex items-center justify-between">
          <button
            onClick={() => setScreen('input')}
            className="flex flex-col items-start leading-tight"
          >
            <span className="text-lg font-bold tracking-tight">Aisle Be Back</span>
            <span className="text-xs text-blue-500 dark:text-blue-400 font-medium -mt-0.5">
              {store.shortLabel ?? store.name}
            </span>
          </button>

          <div className="flex items-center gap-1">
            {/* Other Items screen toggle */}
            <button
              onClick={() => isOtherScreen ? closeOtherItems() : openOtherItems()}
              aria-label="Other items"
              className={`relative min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg px-2 transition-colors ${
                isOtherScreen
                  ? 'bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300'
                  : 'text-gray-500 dark:text-gray-400'
              }`}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
                <rect x="9" y="3" width="6" height="4" rx="1" />
                <line x1="9" y1="12" x2="15" y2="12" />
                <line x1="9" y1="16" x2="13" y2="16" />
              </svg>
              {otherNames.length > 0 && (
                <span className="absolute top-1.5 right-1.5 min-w-[16px] h-4 px-1 rounded-full
                                 bg-purple-500 text-white text-[10px] font-bold leading-4 text-center">
                  {otherNames.length}
                </span>
              )}
            </button>

            {/* Store setup toggle */}
            <button
              onClick={() => isSetupScreen ? closeStoreSetup() : openStoreSetup()}
              aria-label="Store setup"
              className={`min-w-[44px] min-h-[44px] flex items-center justify-center rounded-lg px-2 transition-colors ${
                isSetupScreen
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
        </div>
      </header>

      {/* Store-switch toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50
                        bg-gray-800 dark:bg-gray-700 text-white text-sm font-medium
                        px-4 py-2 rounded-xl shadow-lg max-w-[90vw] text-center">
          {toast}
        </div>
      )}

      <main>
        {screen === 'input' && (
          <ListInput
            activeStoreId={activeStoreId}
            onSwitchStore={handleStoreSwitch}
            onGenerate={handleGenerate}
            onClear={handleClearDraft}
          />
        )}

        {screen === 'route' && (
          <RouteView
            items={items}
            otherNames={otherNames}
            store={store}
            onToggle={toggleItem}
            onAssignZone={assignZone}
            onReassign={handleReassign}
            onSkipToOther={handleSkipToOther}
            onEditList={handleEditList}
            onNewList={handleNewList}
            onSaveToCatalog={handleSaveToCatalog}
          />
        )}

        {screen === 'store-setup' && <StoreSetup onBack={closeStoreSetup} />}

        {screen === 'other-items' && (
          <OtherItemsScreen
            otherNames={otherNames}
            onRemove={removeOtherItem}
            onBack={closeOtherItems}
          />
        )}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <StoreContextProvider>
      <AppInner />
    </StoreContextProvider>
  )
}
