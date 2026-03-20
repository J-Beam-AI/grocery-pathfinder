/**
 * One-time migration from v1 (single-store) to v2 (multi-store) localStorage schema.
 *
 * v1 keys:  'catalog', 'store-layout'
 * v2 keys:  'catalog:walmart-4th-plain', 'store-layout:walmart-4th-plain'
 *
 * Runs once at App mount; subsequent launches skip via migration flag.
 */

const MIGRATED_KEY = 'v2-storage-migrated'

export function migrateStorage(): void {
  try {
    if (localStorage.getItem(MIGRATED_KEY)) return

    const oldCatalog = localStorage.getItem('catalog')
    if (oldCatalog) {
      // Only copy if the namespaced key doesn't already exist
      if (!localStorage.getItem('catalog:walmart-4th-plain')) {
        localStorage.setItem('catalog:walmart-4th-plain', oldCatalog)
      }
      localStorage.removeItem('catalog')
    }

    const oldStore = localStorage.getItem('store-layout')
    if (oldStore) {
      if (!localStorage.getItem('store-layout:walmart-4th-plain')) {
        localStorage.setItem('store-layout:walmart-4th-plain', oldStore)
      }
      localStorage.removeItem('store-layout')
    }

    localStorage.setItem(MIGRATED_KEY, '1')
  } catch {
    // localStorage unavailable — skip migration silently
  }
}
