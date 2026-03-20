/**
 * Central registry of all available stores.
 *
 * To add a new store (e.g. WinCo — Phase 1B):
 *   1. Create src/data/seed-catalog-winco.ts
 *   2. Import and add its defaultStore to ALL_STORES
 *   3. Add its seedCatalog to SEED_CATALOGS
 *   No other code changes required.
 */

import type { StoreLayout, CatalogItem } from '../types'
import { defaultStore as store4thPlain, seedCatalog as catalog4thPlain } from '../data/seed-catalog'
import { defaultStore as store192d, seedCatalog as catalog192d } from '../data/seed-catalog-192d'
import { defaultStore as storeSafeway, seedCatalog as catalogSafeway } from '../data/seed-catalog-safeway'
import { defaultStore as storeWinco, seedCatalog as catalogWinco } from '../data/seed-catalog-winco'

export const DEFAULT_STORE_ID = 'walmart-4th-plain'

// Ordered list of all stores shown in the selector
export const ALL_STORES: StoreLayout[] = [
  store4thPlain,
  store192d,
  storeSafeway,
  storeWinco,
]

const SEED_CATALOGS: Record<string, CatalogItem[]> = {
  'walmart-4th-plain': catalog4thPlain,
  'walmart-192d':      catalog192d,
  'safeway':           catalogSafeway,
  'winco':             catalogWinco,
}

const DEFAULT_STORES: Record<string, StoreLayout> = {
  'walmart-4th-plain': store4thPlain,
  'walmart-192d':      store192d,
  'safeway':           storeSafeway,
  'winco':             storeWinco,
}

export function getDefaultStore(storeId: string): StoreLayout {
  return DEFAULT_STORES[storeId] ?? ALL_STORES[0]
}

export function getSeedCatalog(storeId: string): CatalogItem[] {
  return SEED_CATALOGS[storeId] ?? []
}
