import { useState, useCallback } from 'react'
import type { CatalogItem } from '../types'
import { storageGet, storageSet } from '../lib/storage'
import { seedCatalog } from '../data/seed-catalog'

const STORAGE_KEY = 'catalog'

function loadCatalog(): CatalogItem[] {
  return storageGet<CatalogItem[]>(STORAGE_KEY) ?? seedCatalog
}

export function useCatalog() {
  const [catalog, setCatalog] = useState<CatalogItem[]>(loadCatalog)

  const addItem = useCallback((item: CatalogItem) => {
    setCatalog(prev => {
      // If name already exists, update its zone instead of duplicating
      if (prev.some(c => c.name === item.name)) {
        const updated = prev.map(c => c.name === item.name ? { ...c, zoneId: item.zoneId } : c)
        storageSet(STORAGE_KEY, updated)
        return updated
      }
      const updated = [...prev, item]
      storageSet(STORAGE_KEY, updated)
      return updated
    })
  }, [])

  const updateItemZone = useCallback((name: string, zoneId: string) => {
    setCatalog(prev => {
      const updated = prev.map(c => c.name === name ? { ...c, zoneId } : c)
      storageSet(STORAGE_KEY, updated)
      return updated
    })
  }, [])

  return { catalog, addItem, updateItemZone }
}
