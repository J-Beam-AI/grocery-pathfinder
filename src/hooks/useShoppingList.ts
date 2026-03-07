import { useState, useCallback } from 'react'
import type { ShoppingListItem, CatalogItem } from '../types'
import { storageGet, storageSet } from '../lib/storage'
import { matchItem } from '../lib/matcher'

const STORAGE_KEY = 'shopping-list'

export function useShoppingList() {
  const [items, setItems] = useState<ShoppingListItem[]>(
    () => storageGet<ShoppingListItem[]>(STORAGE_KEY) ?? []
  )

  const persist = useCallback((newItems: ShoppingListItem[]) => {
    setItems(newItems)
    storageSet(STORAGE_KEY, newItems)
  }, [])

  const parseList = useCallback((rawText: string, catalog: CatalogItem[], prevItems: ShoppingListItem[] = []) => {
    const lines = rawText.split(/[\n,]+/).map(l => l.trim()).filter(Boolean)
    // Carry over checked state for items that appear in the updated list
    const prevChecked = new Set(
      prevItems.filter(i => i.checked).map(i => i.raw.trim().toLowerCase())
    )
    const newItems: ShoppingListItem[] = lines.map(line => {
      const matched = matchItem(line, catalog) ?? undefined
      const checked = prevChecked.has(line.trim().toLowerCase())
      return { raw: line, matched, zoneId: matched?.zoneId, checked }
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

  return { items, parseList, toggleItem, assignZone, clearList }
}
