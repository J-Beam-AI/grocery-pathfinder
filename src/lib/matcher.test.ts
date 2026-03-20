import { describe, it, expect } from 'vitest'
import { matchItem, matchZoneLabel } from './matcher'
import type { CatalogItem, StoreZone } from '../types'

const catalog: CatalogItem[] = [
  { name: 'apples', aliases: ['apple', 'fuji apples', 'honeycrisp'], zoneId: 'A1' },
  { name: 'orange juice', aliases: ['oj', 'simply orange', 'tropicana'], zoneId: 'A22' },
  { name: 'milk', aliases: ['whole milk', '2% milk', 'gallon of milk'], zoneId: 'A31' },
  { name: 'eggs', aliases: ['dozen eggs', 'large eggs', 'egg'], zoneId: 'A30' },
  { name: 'bread', aliases: ['white bread', 'wheat bread', 'sandwich bread'], zoneId: 'A16' },
  { name: 'peanut butter', aliases: ['pb', 'jif', 'skippy'], zoneId: 'A15' },
]

describe('matchItem', () => {
  it('returns null for empty string', () => {
    expect(matchItem('', catalog)).toBeNull()
    expect(matchItem('   ', catalog)).toBeNull()
  })

  it('returns null when no match found', () => {
    expect(matchItem('zzzzxxxxxyyy', catalog)).toBeNull()
  })

  it('exact name match', () => {
    expect(matchItem('apples', catalog)?.name).toBe('apples')
    expect(matchItem('milk', catalog)?.name).toBe('milk')
  })

  it('exact name match is case-insensitive via normalization', () => {
    // matchItem lowercases the query, catalog names are already lowercase
    expect(matchItem('Apples', catalog)?.name).toBe('apples')
    expect(matchItem('MILK', catalog)?.name).toBe('milk')
  })

  it('exact alias match', () => {
    expect(matchItem('oj', catalog)?.name).toBe('orange juice')
    expect(matchItem('pb', catalog)?.name).toBe('peanut butter')
    expect(matchItem('egg', catalog)?.name).toBe('eggs')
  })

  it('substring match — query contained in alias', () => {
    expect(matchItem('fuji', catalog)?.name).toBe('apples')
  })

  it('substring match — alias contained in query', () => {
    expect(matchItem('a gallon of milk please', catalog)?.name).toBe('milk')
  })

  it('alias match takes priority over partial substring', () => {
    // 'oj' is an exact alias so it should return orange juice, not apples
    const result = matchItem('oj', catalog)
    expect(result?.name).toBe('orange juice')
  })

  it('levenshtein match for typos', () => {
    // 'appls' → 'apples' (1 edit)
    expect(matchItem('appls', catalog)?.name).toBe('apples')
    // 'bead' → 'bread' (1 edit)
    expect(matchItem('bead', catalog)?.name).toBe('bread')
  })

  it('no match for completely unrelated string', () => {
    expect(matchItem('television', catalog)).toBeNull()
  })

  it('matches multi-word aliases', () => {
    expect(matchItem('wheat bread', catalog)?.name).toBe('bread')
    expect(matchItem('whole milk', catalog)?.name).toBe('milk')
  })

  it('partial query matching via reverse substring', () => {
    // "white bread loaf" contains "white bread" alias
    expect(matchItem('white bread loaf', catalog)?.name).toBe('bread')
  })
})

describe('matchZoneLabel', () => {
  const zones: StoreZone[] = [
    { id: 'north-wall',   name: 'North Wall — Fresh Produce',                                              order: 1  },
    { id: '1a-w',         name: '1A West — Potato Chips / Corn Chips / Tortilla Chips / Pretzels',         order: 3  },
    { id: '5a-w',         name: '5A West — Feminine Hygiene / Dental / Cough & Cold / Vitamins',           order: 11 },
    { id: 'east-wall',    name: 'East Wall — BBQ / Deli / Fresh Seafood / Fresh Meats / Beer',             order: 25 },
    { id: '14b-e',        name: '14B East — Milk / Eggs / Butter',                                        order: 26 },
    { id: 'south-wall',   name: 'South Wall — Ice Cream / Frozen Novelties',                               order: 32 },
    { id: '9a-e',         name: '9A East — Kitchenware / Oils & Spices / Jello / Cake Mix',                order: 20 },
  ]

  it('returns null for empty string', () => {
    expect(matchZoneLabel('', zones)).toBeNull()
    expect(matchZoneLabel('   ', zones)).toBeNull()
  })

  it('returns null when no zone matches', () => {
    expect(matchZoneLabel('television', zones)).toBeNull()
  })

  it('exact term match', () => {
    expect(matchZoneLabel('pretzels', zones)?.id).toBe('1a-w')
    expect(matchZoneLabel('butter', zones)?.id).toBe('14b-e')
  })

  it('term contains query (substring)', () => {
    // "potato chips".includes("chips") → true
    expect(matchZoneLabel('chips', zones)?.id).toBe('1a-w')
    // "fresh produce".includes("produce") → true
    expect(matchZoneLabel('produce', zones)?.id).toBe('north-wall')
    // "vitamins".includes("vitamins") → true
    expect(matchZoneLabel('vitamins', zones)?.id).toBe('5a-w')
  })

  it('query contains term (reverse substring)', () => {
    // "ice cream novelties".includes("ice cream") → true
    expect(matchZoneLabel('ice cream novelties', zones)?.id).toBe('south-wall')
  })

  it('case-insensitive matching', () => {
    expect(matchZoneLabel('Chips', zones)?.id).toBe('1a-w')
    expect(matchZoneLabel('MILK', zones)?.id).toBe('14b-e')
  })

  it('matches multi-word query against multi-word term', () => {
    expect(matchZoneLabel('potato chips', zones)?.id).toBe('1a-w')
    expect(matchZoneLabel('ice cream', zones)?.id).toBe('south-wall')
  })

  it('returns null for empty zones array', () => {
    expect(matchZoneLabel('chips', [])).toBeNull()
  })
})
