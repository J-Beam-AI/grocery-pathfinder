import { useState, useCallback, useEffect } from 'react'
import type { CatalogItem } from '../types'
import { storageGet, storageSet } from '../lib/storage'
import { seedCatalog } from '../data/seed-catalog'

const STORAGE_KEY = 'catalog'

function loadCatalog(): CatalogItem[] {
  return storageGet<CatalogItem[]>(STORAGE_KEY) ?? seedCatalog
}

export function useCatalog() {
  const [catalog, setCatalog] = useState<CatalogItem[]>(loadCatalog)

  // Guarantee every state change — including the initial seed — is written to localStorage.
  // This ensures the catalog survives a full app close/reopen even before any user edits.
  useEffect(() => {
    storageSet(STORAGE_KEY, catalog)
  }, [catalog])

  const addItem = useCallback((item: CatalogItem) => {
    setCatalog(prev => {
      // If name already exists, update its zone instead of duplicating
      if (prev.some(c => c.name === item.name)) {
        return prev.map(c => c.name === item.name ? { ...c, zoneId: item.zoneId } : c)
      }
      return [...prev, item]
    })
  }, [])

  const updateItemZone = useCallback((name: string, zoneId: string) => {
    setCatalog(prev => prev.map(c => c.name === name ? { ...c, zoneId } : c))
  }, [])

  return { catalog, addItem, updateItemZone }
}
