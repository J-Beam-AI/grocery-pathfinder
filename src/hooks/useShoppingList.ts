import { useState, useCallback } from 'react'
import type { ShoppingListItem, CatalogItem, StoreZone } from '../types'
import { storageGet, storageSet } from '../lib/storage'
import { matchItem, matchZoneLabel } from '../lib/matcher'

const STORAGE_KEY = 'shopping-list'

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingListItem[]>(
    () => storageGet<ShoppingListItem[]>(STORAGE_KEY) ?? []
  )

  const persist = useCallback((newItems: ShoppingListItem[]) => {
    setItems(newItems)
    storageSet(STORAGE_KEY, newItems)
  }, [])

  const parseList = useCallback((rawText: string, catalog: CatalogItem[], prevItems: ShoppingListItem[] = [], zones: StoreZone[] = [], saveToCatalog?: (item: CatalogItem) => void) => {
    const lines = rawText.split(/[\n,]+/).map(l => l.trim()).filter(Boolean)
    const prevChecked = new Set(
      prevItems.filter(i => i.checked).map(i => i.raw.trim().toLowerCase())
    )
    const newItems: ShoppingListItem[] = lines.map(line => {
      const matched = matchItem(line, catalog) ?? undefined
      const checked = prevChecked.has(line.trim().toLowerCase())
      if (matched) return { raw: line, matched, zoneId: matched.zoneId, checked }
      // Zone-label fallback: auto-save a new CatalogItem so it persists for future trips
      if (zones.length) {
        const labelZone = matchZoneLabel(line, zones)
        if (labelZone) {
          const newEntry: CatalogItem = { name: line.trim().toLowerCase(), aliases: [], zoneId: labelZone.id }
          saveToCatalog?.(newEntry)
          return { raw: line, matched: newEntry, zoneId: newEntry.zoneId, checked }
        }
      }
      return { raw: line, matched: undefined, zoneId: undefined, checked }
    })
    persist(newItems)
    return newItems
  }, [persist])

  const toggleItem = useCallback((index: number) => {
    setItems(prev => {
      const updated = prev.map((item, i) =>
        i === index ? { ...item, checked: !item.checked } : item
      )
      storageSet(STORAGE_KEY, updated)
      return updated
    })
  }, [])

  const assignZone = useCallback((index: number, zoneId: string) => {
    setItems(prev => {
      const updated = prev.map((item, i) =>
        i === index ? { ...item, zoneId } : item
      )
      storageSet(STORAGE_KEY, updated)
      return updated
    })
  }, [])

  const clearList = useCallback(() => persist([]), [persist])

  // Re-match existing items against a new store's catalog.
  // Preserves raw text; clears matched, zoneId, and checked (new store = fresh route).
  const rerouteItems = useCallback((catalog: CatalogItem[], zones: StoreZone[] = [], saveToCatalog?: (item: CatalogItem) => void) => {
    setItems(prev => {
      const updated: ShoppingListItem[] = prev.map(item => {
        const matched = matchItem(item.raw, catalog) ?? undefined
        if (matched) return { raw: item.raw, matched, zoneId: matched.zoneId, checked: false }
        if (zones.length) {
          const labelZone = matchZoneLabel(item.raw, zones)
          if (labelZone) {
            const newEntry: CatalogItem = { name: item.raw.trim().toLowerCase(), aliases: [], zoneId: labelZone.id }
            saveToCatalog?.(newEntry)
            return { raw: item.raw, matched: newEntry, zoneId: newEntry.zoneId, checked: false }
          }
        }
        return { raw: item.raw, matched: undefined, zoneId: undefined, checked: false }
      })
      storageSet(STORAGE_KEY, updated)
      return updated
    })
  }, [])

  return { items, parseList, toggleItem, assignZone, clearList, rerouteItems }
}
