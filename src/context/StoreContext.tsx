import { createContext, useContext, useState, useCallback } from 'react'
import { storageGet, storageSet } from '../lib/storage'
import { DEFAULT_STORE_ID } from '../lib/storeRegistry'
import type { StoreRegistry } from '../types'

interface StoreContextValue {
  activeStoreId: string
  setActiveStoreId: (id: string) => void
}

export const StoreContext = createContext<StoreContextValue>({
  activeStoreId: DEFAULT_STORE_ID,
  setActiveStoreId: () => {},
})

export function useStoreContext() {
  return useContext(StoreContext)
}

export function StoreContextProvider({ children }: { children: React.ReactNode }) {
  const [activeStoreId, setActiveStoreIdState] = useState<string>(
    () => storageGet<StoreRegistry>('store-registry')?.activeStoreId ?? DEFAULT_STORE_ID
  )

  const setActiveStoreId = useCallback((id: string) => {
    setActiveStoreIdState(id)
    storageSet<StoreRegistry>('store-registry', { activeStoreId: id })
  }, [])

  return (
    <StoreContext.Provider value={{ activeStoreId, setActiveStoreId }}>
      {children}
    </StoreContext.Provider>
  )
}
