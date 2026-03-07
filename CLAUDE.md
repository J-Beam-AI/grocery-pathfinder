# CLAUDE.md — Grocery Pathfinder

## Project Overview
A mobile-friendly PWA that takes a grocery list and generates an optimal shopping route through a specific store. Items are mapped to store zones/sections, and the route is ordered by physical zone traversal order to minimize backtracking.

## Tech Stack
- React 18+ with TypeScript (Vite)
- Tailwind CSS (utility-first, no component libraries)
- localStorage for all persistence (no backend)
- PWA with service worker for offline use
- Vitest for unit tests

## Architecture Principles
- **Mobile-first**: All UI must be designed for phone screens first. Large touch targets (min 44px), no hover-dependent interactions.
- **Offline-capable**: The app must work fully offline after first load. All data is in localStorage.
- **Catalog grows with use**: When a user enters an item not in the catalog, prompt them to assign it to a zone. Save it for next time.
- **Algorithm is swappable**: The route generation logic lives in `src/lib/pathfinder.ts` and takes a list of items + a store layout, returning an ordered route. This module must have no UI dependencies — it's pure logic with its own types so it can be replaced with a graph-based algorithm later.

## Store Details
- **Store:** Walmart — 4th Plain
- **Layout:** 33 aisles (A1 through A33), from Produce to Bakery/Deli
- **Walking pattern:** Serpentine — down A1, up A2, down A3, etc.
- **Seed data:** `src/data/seed-catalog.ts` contains the real store layout (33 zones) and ~200 common items pre-mapped to the correct aisles. This file is the source of truth for the default store and initial catalog. Do NOT generate a generic seed catalog — use this file as provided.
- **Clean CSV:** `Walmart_4th_Plain-clean.csv` is the cleaned reference of the original store layout data. Keep in the project root for reference.

## Data Model (TypeScript interfaces in src/types/index.ts)

```typescript
// Store layout — zones in physical walking order
interface StoreZone {
  id: string;
  name: string;
  order: number;       // 0 = first zone from entrance
}

interface StoreLayout {
  id: string;
  name: string;
  zones: StoreZone[];
}

// Item catalog — maps item names to zones
interface CatalogItem {
  name: string;          // canonical name, lowercase
  aliases: string[];     // alternate names
  zoneId: string;
}

// Shopping list
interface ShoppingListItem {
  raw: string;           // user's original text
  matched?: CatalogItem;
  zoneId?: string;
  checked: boolean;
}

// Route output
interface RouteSegment {
  zone: StoreZone;
  items: ShoppingListItem[];
}
```

## File Structure

```
src/
├── main.tsx
├── App.tsx
├── types/index.ts
├── data/seed-catalog.ts       # ~100 common grocery items with default zones
├── lib/
│   ├── pathfinder.ts          # Route algorithm (PURE LOGIC, no React)
│   ├── matcher.ts             # Fuzzy item-to-catalog matching
│   └── storage.ts             # localStorage read/write abstraction
├── hooks/
│   ├── useStore.ts
│   ├── useCatalog.ts
│   └── useShoppingList.ts
├── components/
│   ├── ListInput.tsx           # Text area + parse + recent items
│   ├── RouteView.tsx           # Ordered checklist grouped by zone
│   ├── ZoneGroup.tsx           # Single zone header + its items
│   ├── ShoppingItem.tsx        # Checkable item row (big touch target)
│   ├── StoreSetup.tsx          # Zone CRUD + drag-to-reorder
│   ├── CatalogManager.tsx      # Search + reassign zones
│   └── UnknownItemResolver.tsx # Prompt user to assign zone for unmatched items
└── styles/globals.css
```

## Build Phases

### Phase 1: Scaffold + Data Layer
- Vite + React + TS + Tailwind setup
- Define all types in src/types/index.ts
- Build storage.ts (typed localStorage wrapper with get/set/clear)
- Copy the provided seed-catalog.ts into src/data/ — it contains the real Walmart 4th Plain layout (33 aisles) and ~200 items with aliases. Do NOT regenerate this file.
- Build pathfinder.ts: takes ShoppingListItem[] + StoreLayout → RouteSegment[]
  - Sort by zone.order (A1=0 through A33=32)
  - Skip zones with no matched items (don't show empty aisles)
- Build matcher.ts: takes a raw string + CatalogItem[] → best match or null
  - Priority: exact name match → alias match → case-insensitive substring → Levenshtein distance with threshold
  - Aliases are critical — the seed catalog has extensive aliases (e.g., "oj" → "orange juice" in A22)
- Write Vitest tests for pathfinder and matcher

### Phase 2: Store Setup
- StoreSetup.tsx: list of zones with add/edit/delete
- Drag-to-reorder zones (use @dnd-kit/core for accessible drag-and-drop)
- Default zones pre-populated from seed-catalog zone names
- Save to localStorage via useStore hook

### Phase 3: Core Shopping Flow
- ListInput.tsx: large text area, one item per line, "Generate Route" button
- Parse input: split by newline, trim whitespace, ignore empty lines
- Match each item via matcher.ts
- Generate route via pathfinder.ts
- RouteView.tsx: display grouped checklist
- UnknownItemResolver: inline zone picker for unmatched items (add to catalog on resolve)
- Check-off items during shopping (tap anywhere on row)

### Phase 4: Polish
- PWA manifest.json + basic service worker (Vite PWA plugin)
- Mobile viewport meta tags
- Smooth transitions between input and route views
- Recent items chips on input screen (last 20 unique items)
- Catalog management screen

## Code Style
- Functional components only, no class components
- Custom hooks for all state management
- Named exports (not default) for components; default export for pages/routes
- No `any` types — everything must be typed
- Comments only where logic is non-obvious

## Testing
- Vitest for unit tests
- Test the pathfinder with various edge cases: empty list, all items in one zone, items with no zone match, duplicate items
- Test the matcher with exact matches, partial matches, alias matches, no matches

## UI/UX Guidelines
- Mobile-first: design for 375px width, then let it scale up
- Touch targets: minimum 44x44px for interactive elements
- Zone headers: sticky within scroll for long lists
- Color-code zones for visual scanning (use a palette of 8-10 distinct colors)
- Dark mode support via Tailwind dark: classes and prefers-color-scheme
- Loading/empty states for every screen
- The route view is THE primary screen — it should feel fast, clean, and scannable
