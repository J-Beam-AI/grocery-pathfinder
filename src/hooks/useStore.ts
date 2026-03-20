import { useState, useCallback } from 'react'
import type { StoreLayout, StoreZone } from '../types'
import { storageGet, storageSet } from '../lib/storage'
import { getDefaultStore } from '../lib/storeRegistry'

function loadStore(storeId: string): StoreLayout {
  return storageGet<StoreLayout>(`store-layout:${storeId}`) ?? getDefaultStore(storeId)
}

export function useStore(storeId: string) {
  const storageKey = `store-layout:${storeId}`

  const [prevStoreId, setPrevStoreId] = useState(storeId)
  const [store, setStore] = useState<StoreLayout>(() => loadStore(storeId))

  // Synchronously reset state when storeId changes — avoids a post-paint render
  // where storeId and store are mismatched, which blanks the page on cold-start.
  if (prevStoreId !== storeId) {
    setPrevStoreId(storeId)
    setStore(loadStore(storeId))
  }

  const persist = useCallback((updated: StoreLayout) => {
    setStore(updated)
    storageSet(storageKey, updated)
  }, [storageKey])

  const addZone = useCallback((name: string) => {
    const id = `custom-${Date.now()}`
    const order = store.zones.length
    const zone: StoreZone = { id, name, order }
    persist({ ...store, zones: [...store.zones, zone] })
  }, [store, persist])

  const updateZone = useCallback((id: string, name: string) => {
    const zones = store.zones.map(z => z.id === id ? { ...z, name } : z)
    persist({ ...store, zones })
  }, [store, persist])

  const deleteZone = useCallback((id: string) => {
    const zones = store.zones
      .filter(z => z.id !== id)
      .map((z, i) => ({ ...z, order: i }))
    persist({ ...store, zones })
  }, [store, persist])

  const reorderZones = useCallback((zones: StoreZone[]) => {
    const reindexed = zones.map((z, i) => ({ ...z, order: i }))
    persist({ ...store, zones: reindexed })
  }, [store, persist])

  const resetToDefault = useCallback(() => {
    persist(getDefaultStore(storeId))
  }, [storeId, persist])

  return { store, addZone, updateZone, deleteZone, reorderZones, resetToDefault }
}
