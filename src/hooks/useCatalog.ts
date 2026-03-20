import { useState, useCallback } from 'react'
import type { CatalogItem } from '../types'
import { storageGet, storageSet } from '../lib/storage'
import { getSeedCatalog } from '../lib/storeRegistry'

function loadCatalog(storeId: string): CatalogItem[] {
  const key = `catalog:${storeId}`
  const existing = storageGet<CatalogItem[]>(key)
  if (existing) return existing
  // Write seed to localStorage on first access so it survives app close
  const seed = getSeedCatalog(storeId)
  storageSet(key, seed)
  return seed
}

export function useCatalog(storeId: string) {
  const [prevStoreId, setPrevStoreId] = useState(storeId)
  const [catalog, setCatalog] = useState<CatalogItem[]>(() => loadCatalog(storeId))

  // Synchronously reset state when storeId changes — avoids a post-paint render
  // where storeId and catalog are mismatched, which blanks the page on cold-start.
  if (prevStoreId !== storeId) {
    setPrevStoreId(storeId)
    setCatalog(loadCatalog(storeId))
  }

  const addItem = useCallback((item: CatalogItem) => {
    setCatalog(prev => {
      const updated = prev.some(c => c.name === item.name)
        ? prev.map(c => c.name === item.name ? { ...c, zoneId: item.zoneId } : c)
        : [...prev, item]
      storageSet(`catalog:${storeId}`, updated)
      return updated
    })
  }, [storeId])

  const updateItemZone = useCallback((name: string, zoneId: string) => {
    setCatalog(prev => {
      const updated = prev.map(c => c.name === name ? { ...c, zoneId } : c)
      storageSet(`catalog:${storeId}`, updated)
      return updated
    })
  }, [storeId])

  return { catalog, addItem, updateItemZone }
}
