# CLAUDE.md — Aisle Be Back (Grocery Pathfinder)

## Project Overview
A mobile-friendly PWA that takes a grocery list and generates an optimal shopping route through a specific store. Items are matched to store zones via fuzzy catalog lookup, and the route is ordered by physical zone traversal order to minimize backtracking.

**App name displayed to users:** "Aisle Be Back"

## Tech Stack
- React 18 with TypeScript (Vite 5)
- Tailwind CSS (utility-first, no component libraries)
- @dnd-kit/core + @dnd-kit/sortable for drag-to-reorder
- localStorage for all persistence (no backend)
- vite-plugin-pwa + Workbox for PWA / service worker
- Vitest for unit tests

## Architecture Principles
- **Mobile-first**: All UI designed for phone screens. Large touch targets (min 44px). No hover-dependent interactions.
- **Offline-capable**: Works fully offline after first load. All data in localStorage.
- **Catalog grows with use**: Unknown items surface an inline zone picker; user's choice is saved to catalog and localStorage for future trips.
- **Algorithm is swappable**: `src/lib/pathfinder.ts` is pure logic with no UI dependencies. Takes `ShoppingListItem[] + StoreLayout → RouteSegment[]`. Can be replaced with a graph-based algorithm later.
- **Multi-store ready**: All store/catalog ops are scoped by `storeId`. Adding a new store is a data-only operation — create a seed file, register it in `src/lib/storeRegistry.ts`, zero code changes elsewhere.

## Store Details

| Store | ID | Zones | Walking Pattern | Seed Items | Seed File | Phase |
|---|---|---|---|---|---|---|
| Walmart — 4th Plain | `walmart-4th-plain` | 33 (A1–A33) | Serpentine | ~200 | `seed-catalog.ts` | Existing |
| Walmart 192d | `walmart-192d` | 38 (A1–A38) | Serpentine | ~60 | `seed-catalog-192d.ts` | Phase 1 |
| Safeway | `safeway` | 21 (Aisle 0–20) | Serpentine | None | `seed-catalog-safeway.ts` | Phase 1 |
| WinCo | `winco` | 56 | Custom | None | `seed-catalog-winco.ts` | Phase 1B ✓ |

**Clean CSV:** `Walmart_4th_Plain-clean.csv` in project root — reference only.

All seed files are **source of truth — do NOT regenerate.**

## Data Model (`src/types/index.ts`)

```typescript
interface StoreZone {
  id: string;
  name: string;
  order: number;       // 0 = first zone from entrance (A1 = Produce)
}

interface StoreLayout {
  id: string;
  name: string;
  shortLabel?: string;
  zones: StoreZone[];
  walkingPattern?: 'serpentine' | 'custom';
}

interface StoreRegistry {
  activeStoreId: string;
}

interface CatalogItem {
  name: string;          // canonical name, lowercase
  aliases: string[];     // alternate names (e.g. "oj" → "orange juice")
  zoneId: string;
  storeId?: string;      // parent store slug; optional for backward compatibility
}

interface ShoppingListItem {
  raw: string;           // user's original text (preserved as-is)
  matched?: CatalogItem; // best catalog match, if found
  zoneId?: string;       // manually assigned zone (overrides matched.zoneId)
  checked: boolean;
}

interface RouteSegment {
  zone: StoreZone;
  items: ShoppingListItem[];
}
```

## Current File Structure

```
src/
├── main.tsx
├── App.tsx                      # Root — StoreContextProvider wrapper + screen router
├── types/index.ts
├── context/
│   └── StoreContext.tsx         # activeStoreId + setActiveStoreId; persists to 'store-registry'
├── data/
│   ├── seed-catalog.ts          # Walmart 4th Plain: 33 zones + ~200 items. SOURCE OF TRUTH.
│   ├── seed-catalog-192d.ts     # Walmart 192d: 38 zones + ~60 items. SOURCE OF TRUTH.
│   ├── seed-catalog-safeway.ts  # Safeway: 21 zones, no seed items. SOURCE OF TRUTH.
│   └── seed-catalog-winco.ts    # WinCo: 56 zones, no seed items. SOURCE OF TRUTH.
├── lib/
│   ├── pathfinder.ts            # buildRoute() — pure logic, no React
│   ├── pathfinder.test.ts       # Vitest — 10 test cases
│   ├── matcher.ts               # matchItem() — fuzzy catalog matching
│   ├── matcher.test.ts          # Vitest — 12 test cases
│   ├── storage.ts               # storageGet/storageSet typed localStorage wrappers
│   ├── storeRegistry.ts         # ALL_STORES list; getDefaultStore/getSeedCatalog by storeId
│   ├── migrateStorage.ts        # One-time v1→v2 localStorage key migration
│   └── zoneColors.ts            # getZoneAccent(order) — 10-color cycling palette
├── hooks/
│   ├── useStore.ts              # Store layout CRUD + reorder + reset; param: storeId
│   ├── useCatalog.ts            # Catalog read/add/updateZone; param: storeId
│   ├── useShoppingList.ts       # parseList, toggleItem, assignZone, clearList, rerouteItems
│   └── useOtherItems.ts         # Permanently skipped item names; persisted to 'other-items'
├── components/
│   ├── ListInput.tsx            # StoreSelector + textarea + Generate Route button
│   ├── StoreSelector.tsx        # Horizontal pill tabs for store selection
│   ├── RouteView.tsx            # Sticky progress bar + UnknownItemResolver + ZoneGroups + all-done
│   ├── ZoneGroup.tsx            # Sticky zone header (color-coded) + ShoppingItem rows
│   ├── ShoppingItem.tsx         # Checkable row; tap zone badge → inline dropdown reassign
│   ├── StoreSetup.tsx           # Zone list with drag-to-reorder, add, inline-edit, delete, reset
│   ├── UnknownItemResolver.tsx  # Amber card listing unmatched items; zone select + Add/Skip per item
│   └── OtherItemsScreen.tsx     # Manage permanently-skipped items (view + delete)
└── styles/globals.css

public/
└── icon.svg                     # PWA icon (SVG only — no PNG fallbacks yet)
```

**Not yet built:**
- `CatalogManager.tsx` — browse, search, and bulk-reassign catalog items
- `seed-catalog-winco.ts` — Phase 1B complete. 56 zones, custom pattern, no seed items.

## Adding a New Store (Phase 1B and beyond)
1. Create `src/data/seed-catalog-{storeId}.ts` — export `defaultStore: StoreLayout` and `seedCatalog: CatalogItem[]`
2. In `src/lib/storeRegistry.ts` — import the new exports and add to `ALL_STORES`, `SEED_CATALOGS`, `DEFAULT_STORES`
3. Zero other code changes required

## Key Behaviors

### Input Screen (`ListInput`)
- Store selector (pill tabs) at top — tapping a different store re-routes the current list
- Parses input by newlines **and** commas (`/[\n,]+/`)
- Draft auto-saved to `localStorage['list-draft']` on every keystroke
- When returning from route view to edit, previously-checked items stay checked (`preserveChecked` ref in App.tsx)

### Store Switch
- Preserves all `raw` item text; clears `matched`, `zoneId`, `checked`
- Re-runs matcher against the new store's catalog
- Shows a toast: "Switched to [Store Name]. Route updated."
- Active store ID persisted to `store-registry` localStorage key

### Route View (`RouteView`)
- Sticky progress bar (checked/total) sits below the app nav at `top-14`
- Sticky zone headers sit at `top-[136px]` (below nav 56px + progress bar ~80px)
- Unknown items surface in an amber `UnknownItemResolver` card at the top
  - "Add" assigns the item to the selected zone and saves to the active store's catalog
  - "Skip" moves the item permanently to "Other Items" (auto-skipped on all future trips)
- Zone items show a tappable zone badge that opens an inline `<select>` to reassign; reassignment also updates the catalog
- All items checked → celebration screen with "Review List" and "New List" buttons

### Other Items (`useOtherItems` / `OtherItemsScreen`)
- Stores a flat `string[]` of lowercased item names in `localStorage['other-items']`
- Globally store-agnostic — skipped items are excluded across all stores
- Accessible via clipboard icon in nav header; badge shows count
- User can delete items to re-enable the resolver for them

### Store Setup (`StoreSetup`)
- Scoped to the currently active store (reads `activeStoreId` from `StoreContext`)
- @dnd-kit drag-to-reorder with `PointerSensor` + `TouchSensor` (200ms delay)
- Inline name edit on tap; Escape to cancel, Enter/blur to commit
- "Reset" button restores the active store's `defaultStore` (with confirmation dialog)
- New zones get `id: 'custom-{Date.now()}'` and are appended at the end

### Matcher (`matcher.ts`)
Priority chain (first match wins):
1. Exact name match
2. Exact alias match
3. Catalog name/alias **contains** query (substring)
4. Query **contains** catalog name/alias (reverse substring)
5. Levenshtein distance ≤ `max(2, floor(queryLength * 0.3))`

### Pathfinder (`pathfinder.ts`)
- `buildRoute(items, layout)` → `RouteSegment[]` sorted by `zone.order`
- Skips items with no resolved zone; skips zones with no items
- `item.zoneId` takes precedence over `item.matched?.zoneId`
- `walkingPattern` is informational — serpentine traversal is encoded in `zone.order` values of each seed file
- **Note:** `RouteView` has its own `buildIndexedSegments()` helper that preserves original array indices for correct toggle/reassign callbacks. `buildRoute` is used in tests but not called by the UI directly.

## localStorage Keys
| Key | Type | Contents |
|-----|------|----------|
| `store-registry` | `StoreRegistry` | Active store ID |
| `store-layout:{storeId}` | `StoreLayout` | User's zone edits for one store (falls back to `defaultStore`) |
| `catalog:{storeId}` | `CatalogItem[]` | Per-store catalog (falls back to `seedCatalog`) |
| `shopping-list` | `ShoppingListItem[]` | Active list (always for current store; survives app close) |
| `list-draft` | `string` | Raw textarea text (cleared on "New List") |
| `other-items` | `string[]` | Permanently-skipped item names (global, all stores) |
| `v2-storage-migrated` | `string` | Migration flag — set after one-time v1→v2 migration |

**v1 keys** (`catalog`, `store-layout`) — copied to namespaced versions and deleted on first v2 launch.

## Code Style
- Functional components only, no class components
- Custom hooks for all state management
- Named exports for components; default export for App
- No `any` types — everything typed
- Comments only where logic is non-obvious

## Testing
Run with: `npm test` (Vitest in run mode)

**`pathfinder.test.ts`** — 10 cases covering: empty list, no zones, grouping, sort order, single-zone, skipping empty zones, unknown zone IDs, `matched.zoneId` fallback, `item.zoneId` override precedence, duplicate items.

**`matcher.test.ts`** — 12 cases covering: empty input, no match, exact name, case-insensitive name, exact alias, substring alias, reverse substring, alias priority, Levenshtein typos, multi-word aliases, reverse substring with extra words.

## PWA
- `vite-plugin-pwa` with `registerType: 'autoUpdate'`
- Manifest: name "Grocery Pathfinder", short_name "Pathfinder", theme `#3b82f6`, standalone display
- Workbox caches all JS/CSS/HTML/SVG; network-first for all HTTP requests
- Icon: `public/icon.svg` only — **no PNG fallbacks** (iOS home screen install may show generic icon)

## UI/UX Guidelines
- Mobile-first: 375px baseline, scales up via `max-w-lg mx-auto`
- Touch targets: minimum 44×44px for all interactive elements
- Zone color palette: 10 colors cycling by `zone.order` (emerald, violet, blue, cyan, amber, rose, orange, teal, indigo, pink)
- Dark mode: Tailwind `dark:` classes throughout, responds to `prefers-color-scheme`
- Empty and loading states on every screen
- The route view is THE primary screen — fast, clean, scannable

## Known Issues / Future Work
- **`CatalogManager` not built**: No way to browse the full catalog, search it, or bulk-reassign items.
- **No recent-items chips on ListInput**: Phase 4 plan mentioned "recent items chips (last 20 unique items)" — not implemented.
- **`buildRoute` / `buildIndexedSegments` duplication**: `pathfinder.ts` exports `buildRoute` (tested, pure), but `RouteView` uses its own parallel `buildIndexedSegments` to preserve original item indices. These should be unified.
- **PWA icon**: Only an SVG. iOS requires PNG icons for proper home-screen appearance.
- **No catalog reset**: Users can reset the store layout to defaults but cannot reset the catalog back to `seedCatalog` without clearing localStorage manually.
- **Comma parsing edge cases**: Input split on commas may surprise users who write quantities like "butter, 2 sticks".
- **Phase 1B — WinCo**: Complete. 56 zones, custom walking pattern, no seed items (catalog grows via use). 14A zones included as inactive.
- **Phase 2 — Manual Store Builder**: User creates stores in-app. 10-store soft cap. Seed stores read-only.
- **Phase 3 — Photo Capture**: Camera/OCR to read aisle signs. Requires backend service.
