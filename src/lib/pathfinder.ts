import type { ShoppingListItem, StoreLayout, RouteSegment } from '../types'

/**
 * Builds an ordered shopping route from a list of items and a store layout.
 * Items are grouped by zone and sorted by zone.order (A1 first, A33 last).
 * Zones with no matched items are omitted.
 * This module has no UI dependencies — pure logic only.
 */
export function buildRoute(
  items: ShoppingListItem[],
  layout: StoreLayout,
): RouteSegment[] {
  const zoneMap = new Map(layout.zones.map((z) => [z.id, z]))

  // Group items by their resolved zoneId
  const grouped = new Map<string, ShoppingListItem[]>()
  for (const item of items) {
    const zid = item.zoneId ?? item.matched?.zoneId
    if (!zid) continue
    if (!grouped.has(zid)) grouped.set(zid, [])
    grouped.get(zid)!.push(item)
  }

  // Build segments and sort by zone.order
  const segments: RouteSegment[] = []
  for (const [zid, zoneItems] of grouped) {
    const zone = zoneMap.get(zid)
    if (!zone) continue
    segments.push({ zone, items: zoneItems })
  }

  segments.sort((a, b) => a.zone.order - b.zone.order)
  return segments
}
