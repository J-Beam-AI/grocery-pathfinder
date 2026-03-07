import { describe, it, expect } from 'vitest'
import { matchItem } from './matcher'
import type { CatalogItem } from '../types'

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
