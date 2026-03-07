// Store layout — zones in physical walking order
export interface StoreZone {
  id: string;
  name: string;
  order: number; // 0 = first zone from entrance
}

export interface StoreLayout {
  id: string;
  name: string;
  zones: StoreZone[];
}

// Item catalog — maps item names to zones
export interface CatalogItem {
  name: string;      // canonical name, lowercase
  aliases: string[]; // alternate names
  zoneId: string;
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
