/**
 * Safeway — Store Layout
 *
 * 21 aisles (Aisle 0–20), serpentine walking pattern (confirmed).
 * No product-level seed items — catalog grows via UnknownItemResolver.
 * Aisle 10 contents unknown at time of writing — update when confirmed.
 *
 * SOURCE OF TRUTH — do not regenerate.
 */

import type { StoreLayout, CatalogItem } from "../types";

export const defaultStore: StoreLayout = {
  id: "safeway",
  name: "Safeway",
  shortLabel: "Safeway",
  walkingPattern: "serpentine",
  zones: [
    { id: "aisle-0",  name: "Aisle 0 — Produce",                                                                    order: 0  },
    { id: "aisle-1",  name: "Aisle 1 — Pasta & Sauce / Rice & Beans / Hispanic / Asian Foods",                      order: 1  },
    { id: "aisle-2",  name: "Aisle 2 — Can Vegetables / Soups / Dressings / Condiments / BBQ / Gravy",              order: 2  },
    { id: "aisle-3",  name: "Aisle 3 — Spices / Cake Mixes / Food Storage / Flour & Sugar / Cups & Plates",         order: 3  },
    { id: "aisle-4",  name: "Aisle 4 — Convenient Breakfast / Cereal / Pancake Mix / Syrup / Canned Fruit",         order: 4  },
    { id: "aisle-5",  name: "Aisle 5 — Peanut Butter / Cookies / Crackers / Cocoa / Coffee",                        order: 5  },
    { id: "aisle-6",  name: "Aisle 6 — Juices / Sports Drinks / Water",                                             order: 6  },
    { id: "aisle-7",  name: "Aisle 7 — Soft Drinks / Chilled Beverages / Energy Drinks / Mixers",                   order: 7  },
    { id: "aisle-8",  name: "Aisle 8 — Snacks / Chips / Candy / Jerky / Popcorn / Nuts",                           order: 8  },
    { id: "aisle-9",  name: "Aisle 9 — Gift Cards / Seasonal / Greeting Cards / Stationery / Gift Wrap",            order: 9  },
    { id: "aisle-10", name: "Aisle 10 — (Contents TBD)",                                                            order: 10 },
    { id: "aisle-11", name: "Aisle 11 — Bar Soap / Shaving / Shampoo / Deodorant / Oral Care / Skin Care",          order: 11 },
    { id: "aisle-12", name: "Aisle 12 — Bath Tissue / Baby Toiletries / Diapers / Formula / Baby Food / Paper Towels", order: 12 },
    { id: "aisle-13", name: "Aisle 13 — Laundry / Dish Soap / Bleach / Air Fresheners / Cleaning Supplies",         order: 13 },
    { id: "aisle-14", name: "Aisle 14 — Dog Food / Cat Food / Cat Litter / Rawhide / Charcoal / Logs",              order: 14 },
    { id: "aisle-15", name: "Aisle 15 — Meat / Ice Cream / Breakfast / Vegetables / Juices / Potatoes",             order: 15 },
    { id: "aisle-16", name: "Aisle 16 — Butter / Yogurt / Dough / Pudding / Pizza / Entrees",                       order: 16 },
    { id: "aisle-17", name: "Aisle 17 — Cheese / Pasta / Sour Cream / Beer",                                        order: 17 },
    { id: "aisle-18", name: "Aisle 18 — Wine",                                                                      order: 18 },
    { id: "aisle-19", name: "Aisle 19 — Liquor",                                                                    order: 19 },
    { id: "aisle-20", name: "Aisle 20 — Bread",                                                                     order: 20 },
  ],
};

// No product-level seed items — catalog grows through user interaction.
export const seedCatalog: CatalogItem[] = [];
