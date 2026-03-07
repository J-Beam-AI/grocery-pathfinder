import { useState, useCallback } from 'react'
import type { StoreLayout, StoreZone } from '../types'
import { storageGet, storageSet } from '../lib/storage'
import { defaultStore } from '../data/seed-catalog'

const STORAGE_KEY = 'store-layout'

function loadStore(): StoreLayout {
  return storageGet<StoreLayout>(STORAGE_KEY) ?? defaultStore
}

export function useStore() {
  const [store, setStore] = useState<StoreLayout>(loadStore)

  const persist = useCallback((updated: StoreLayout) => {
    setStore(updated)
    storageSet(STORAGE_KEY, updated)
  }, [])

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

  // Receives the new ordered array of zones after drag
  const reorderZones = useCallback((zones: StoreZone[]) => {
    const reindexed = zones.map((z, i) => ({ ...z, order: i }))
    persist({ ...store, zones: reindexed })
  }, [store, persist])

  const resetToDefault = useCallback(() => {
    persist(defaultStore)
  }, [persist])

  return { store, addZone, updateZone, deleteZone, reorderZones, resetToDefault }
}
