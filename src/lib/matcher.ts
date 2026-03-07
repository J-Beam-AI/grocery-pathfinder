import type { CatalogItem } from '../types'

function levenshtein(a: string, b: string): number {
  const m = a.length
  const n = b.length
  // dp[i][j] = edit distance between a[0..i-1] and b[0..j-1]
  const dp: number[][] = Array.from({ length: m + 1 }, (_, i) =>
    Array.from({ length: n + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0)),
  )
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1])
    }
  }
  return dp[m][n]
}

/**
 * Match a raw input string to the best CatalogItem.
 * Priority:
 *   1. Exact name match
 *   2. Exact alias match
 *   3. Catalog name/alias contains query (substring)
 *   4. Query contains catalog name/alias (reverse substring)
 *   5. Levenshtein distance within threshold
 * Returns null if no match meets the threshold.
 */
export function matchItem(
  raw: string,
  catalog: CatalogItem[],
): CatalogItem | null {
  const query = raw.trim().toLowerCase()
  if (!query) return null

  // 1. Exact name
  const exact = catalog.find((c) => c.name === query)
  if (exact) return exact

  // 2. Exact alias
  const aliasExact = catalog.find((c) => c.aliases.includes(query))
  if (aliasExact) return aliasExact

  // 3. Substring: name or alias contains the query
  const sub = catalog.find(
    (c) => c.name.includes(query) || c.aliases.some((a) => a.includes(query)),
  )
  if (sub) return sub

  // 4. Reverse substring: query contains name or alias
  const revSub = catalog.find(
    (c) => query.includes(c.name) || c.aliases.some((a) => query.includes(a)),
  )
  if (revSub) return revSub

  // 5. Levenshtein — threshold scales with query length
  const THRESHOLD = Math.max(2, Math.floor(query.length * 0.3))
  let best: CatalogItem | null = null
  let bestDist = Infinity

  for (const item of catalog) {
    for (const cand of [item.name, ...item.aliases]) {
      const dist = levenshtein(query, cand)
      if (dist < bestDist) {
        bestDist = dist
        best = item
      }
    }
  }

  return bestDist <= THRESHOLD ? best : null
}
