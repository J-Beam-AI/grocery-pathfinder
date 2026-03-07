import { describe, it, expect } from 'vitest'
import { buildRoute } from './pathfinder'
import type { ShoppingListItem, StoreLayout } from '../types'

const layout: StoreLayout = {
  id: 'test-store',
  name: 'Test Store',
  zones: [
    { id: 'Z1', name: 'Zone 1 — Produce', order: 0 },
    { id: 'Z2', name: 'Zone 2 — Dairy', order: 1 },
    { id: 'Z3', name: 'Zone 3 — Meat', order: 2 },
  ],
}

function item(
  raw: string,
  zoneId?: string,
  checked = false,
): ShoppingListItem {
  return { raw, zoneId, checked }
}

describe('buildRoute', () => {
  it('returns empty array for empty list', () => {
    expect(buildRoute([], layout)).toEqual([])
  })

  it('returns empty array when no items have a zone', () => {
    const items = [item('mystery item')]
    expect(buildRoute(items, layout)).toEqual([])
  })

  it('groups items into the correct zone', () => {
    const items = [item('apples', 'Z1'), item('bananas', 'Z1')]
    const route = buildRoute(items, layout)
    expect(route).toHaveLength(1)
    expect(route[0].zone.id).toBe('Z1')
    expect(route[0].items).toHaveLength(2)
  })

  it('sorts zones by order', () => {
    const items = [
      item('steak', 'Z3'),
      item('milk', 'Z2'),
      item('apples', 'Z1'),
    ]
    const route = buildRoute(items, layout)
    expect(route.map((r) => r.zone.id)).toEqual(['Z1', 'Z2', 'Z3'])
  })

  it('all items in one zone produces one segment', () => {
    const items = [item('a', 'Z2'), item('b', 'Z2'), item('c', 'Z2')]
    const route = buildRoute(items, layout)
    expect(route).toHaveLength(1)
    expect(route[0].zone.id).toBe('Z2')
    expect(route[0].items).toHaveLength(3)
  })

  it('skips empty zones (no items assigned)', () => {
    const items = [item('apples', 'Z1'), item('steak', 'Z3')]
    const route = buildRoute(items, layout)
    expect(route).toHaveLength(2)
    expect(route.map((r) => r.zone.id)).toEqual(['Z1', 'Z3'])
  })

  it('skips items whose zoneId is not in the layout', () => {
    const items = [item('alien food', 'Z99'), item('apples', 'Z1')]
    const route = buildRoute(items, layout)
    expect(route).toHaveLength(1)
    expect(route[0].zone.id).toBe('Z1')
  })

  it('uses matched.zoneId when item.zoneId is absent', () => {
    const items: ShoppingListItem[] = [
      {
        raw: 'oranges',
        matched: { name: 'oranges', aliases: [], zoneId: 'Z1' },
        checked: false,
      },
    ]
    const route = buildRoute(items, layout)
    expect(route).toHaveLength(1)
    expect(route[0].zone.id).toBe('Z1')
  })

  it('item.zoneId takes precedence over matched.zoneId', () => {
    const items: ShoppingListItem[] = [
      {
        raw: 'cheese',
        matched: { name: 'cheese', aliases: [], zoneId: 'Z2' },
        zoneId: 'Z3', // manually overridden
        checked: false,
      },
    ]
    const route = buildRoute(items, layout)
    expect(route).toHaveLength(1)
    expect(route[0].zone.id).toBe('Z3')
  })

  it('handles duplicate items in the same zone', () => {
    const items = [item('milk', 'Z2'), item('milk', 'Z2')]
    const route = buildRoute(items, layout)
    expect(route[0].items).toHaveLength(2)
  })
})
