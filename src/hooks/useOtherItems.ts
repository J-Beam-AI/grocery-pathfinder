import { useState, useCallback, useEffect } from 'react'
import { storageGet, storageSet } from '../lib/storage'

const STORAGE_KEY = 'other-items'

function loadOtherNames(): string[] {
  const raw = storageGet<unknown[]>(STORAGE_KEY) ?? []
  // Migrate from old format (ShoppingListItem[]) — keep only strings
  return raw.filter((item): item is string => typeof item === 'string')
}

export function useOtherItems() {
  const [otherNames, setOtherNames] = useState<string[]>(loadOtherNames)

  useEffect(() => {
    storageSet(STORAGE_KEY, otherNames)
  }, [otherNames])

  const addOtherItem = useCallback((name: string) => {
    const normalized = name.trim().toLowerCase()
    setOtherNames(prev => prev.includes(normalized) ? prev : [...prev, normalized])
  }, [])

  const removeOtherItem = useCallback((name: string) => {
    setOtherNames(prev => prev.filter(n => n !== name))
  }, [])

  return { otherNames, addOtherItem, removeOtherItem }
}
