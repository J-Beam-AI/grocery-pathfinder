// 10-color palette for visual zone scanning — cycles by zone.order
const ACCENTS = [
  '#10b981', // emerald  — Produce (A1)
  '#8b5cf6', // violet   — Desserts (A2)
  '#3b82f6', // blue     — Frozen (A3)
  '#06b6d4', // cyan     — Frozen Meals (A4)
  '#f59e0b', // amber    — Frozen Breakfast (A5)
  '#f43f5e', // rose     — Beer (A6)
  '#f97316', // orange   — Wine (A7)
  '#14b8a6', // teal     — Liquor (A8)
  '#6366f1', // indigo   — Condiments (A9)
  '#ec4899', // pink     — Pasta (A10)
] as const

export function getZoneAccent(order: number): string {
  return ACCENTS[order % ACCENTS.length]
}
