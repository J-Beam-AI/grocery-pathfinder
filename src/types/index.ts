// Store layout — zones in physical walking order
export interface StoreZone {
  id: string;
  name: string;
  order: number; // 0 = first zone from entrance
}

export interface StoreLayout {
  id: string;
  name: string;
  shortLabel?: string;
  zones: StoreZone[];
  walkingPattern?: 'serpentine' | 'custom';
}

export interface StoreRegistry {
  activeStoreId: string;
}

// Item catalog — maps item names to zones
export interface CatalogItem {
  name: string;      // canonical name, lowercase
  aliases: string[]; // alternate names
  zoneId: string;
  storeId?: string;  // parent store slug; optional for backward compatibility
}

// Shopping list
export interface ShoppingListItem {
  raw: string;         // user's original text
  matched?: CatalogItem;
  zoneId?: string;
  checked: boolean;
}

// Route output
export interface RouteSegment {
  zone: StoreZone;
  items: ShoppingListItem[];
}
