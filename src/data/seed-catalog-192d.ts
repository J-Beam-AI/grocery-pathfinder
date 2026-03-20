/**
 * Walmart 192d — Store Layout & Seed Catalog
 *
 * 38 aisles (A1–A38), serpentine walking pattern (confirmed).
 * Seed items are present in A1–A4, A17–A18, A26, A28–A29, A32–A38.
 * All other zones grow via UnknownItemResolver during use.
 *
 * SOURCE OF TRUTH — do not regenerate.
 */

import type { StoreLayout, CatalogItem } from "../types";

export const defaultStore: StoreLayout = {
  id: "walmart-192d",
  name: "Walmart 192d",
  shortLabel: "192d",
  walkingPattern: "serpentine",
  zones: [
    { id: "a1",  name: "A1 — Produce / Bakery / Deli",          order: 0  },
    { id: "a2",  name: "A2 — Bread",                             order: 1  },
    { id: "a3",  name: "A3 — Tea / Coffee / PB",                 order: 2  },
    { id: "a4",  name: "A4 — Pasta / Canned Tom.",               order: 3  },
    { id: "a5",  name: "A5 — Condiments / Dressings",            order: 4  },
    { id: "a6",  name: "A6 — Soup / Canned Beans / Veg",         order: 5  },
    { id: "a7",  name: "A7 — Candy",                             order: 6  },
    { id: "a8",  name: "A8 — Rice / Beans",                      order: 7  },
    { id: "a9",  name: "A9 — Tortillas / Canned Seafood",        order: 8  },
    { id: "a10", name: "A10 — Sugar / Flour / Shortening",       order: 9  },
    { id: "a11", name: "A11 — Spices / Baking",                  order: 10 },
    { id: "a12", name: "A12 — Cereal",                           order: 11 },
    { id: "a13", name: "A13 — Snack Bars / Syrup",               order: 12 },
    { id: "a14", name: "A14 — Cookies / Popcorn / Crackers",     order: 13 },
    { id: "a15", name: "A15 — Snacks",                           order: 14 },
    { id: "a16", name: "A16 — Chips",                            order: 15 },
    { id: "a17", name: "A17 — Sports Drinks / Water",            order: 16 },
    { id: "a18", name: "A18 — Juice / Drink Mixes",              order: 17 },
    { id: "a19", name: "A19 — Facial Tissue / Paper Towels",     order: 18 },
    { id: "a20", name: "A20 — Trash Bags / Paper Plates",        order: 19 },
    { id: "a21", name: "A21 — Bleach / Air Fresheners",          order: 20 },
    { id: "a22", name: "A22 — Mops / All-Purpose Cleaners",      order: 21 },
    { id: "a23", name: "A23 — Dish / Laundry Det.",              order: 22 },
    { id: "a24", name: "A24 — Soft Drinks",                      order: 23 },
    { id: "a25", name: "A25 — Wine",                             order: 24 },
    { id: "a26", name: "A26 — Beer / Mixers",                    order: 25 },
    { id: "a27", name: "A27 — Cold Beer",                        order: 26 },
    { id: "a28", name: "A28 — Waffles / Ice Cream",              order: 27 },
    { id: "a29", name: "A29 — Potatoes / Frozen Breakfast",      order: 28 },
    { id: "a30", name: "A30 — Frozen Pizza / Snacks",            order: 29 },
    { id: "a31", name: "A31 — Frozen Meals",                     order: 30 },
    { id: "a32", name: "A32 — Frozen Vegetables",                order: 31 },
    { id: "a33", name: "A33 — Dairy — Milk / Yogurt / Biscuits", order: 32 },
    { id: "a34", name: "A34 — Snack Cheese / Bagels / Butter / Eggs", order: 33 },
    { id: "a35", name: "A35 — Bacon & Sausage / Sliced Cheese",  order: 34 },
    { id: "a36", name: "A36 — Block Cheese",                     order: 35 },
    { id: "a37", name: "A37 — Bakery",                           order: 36 },
    { id: "a38", name: "A38 — Deli",                             order: 37 },
  ],
};

export const seedCatalog: CatalogItem[] = [
  // ── A1 — Produce / Bakery / Deli ──
  { name: "apples",       aliases: ["apple", "gala apples", "fuji apples", "honeycrisp"],                         zoneId: "a1", storeId: "walmart-192d" },
  { name: "bananas",      aliases: ["banana"],                                                                     zoneId: "a1", storeId: "walmart-192d" },
  { name: "oranges",      aliases: ["orange", "navel oranges", "mandarins", "clementines", "tangerines"],          zoneId: "a1", storeId: "walmart-192d" },
  { name: "grapes",       aliases: ["grape", "red grapes", "green grapes"],                                        zoneId: "a1", storeId: "walmart-192d" },
  { name: "strawberries", aliases: ["strawberry"],                                                                 zoneId: "a1", storeId: "walmart-192d" },
  { name: "lettuce",      aliases: ["romaine", "iceberg lettuce", "salad mix", "spring mix"],                      zoneId: "a1", storeId: "walmart-192d" },
  { name: "broccoli",     aliases: ["broccoli florets"],                                                           zoneId: "a1", storeId: "walmart-192d" },
  { name: "carrots",      aliases: ["carrot", "baby carrots"],                                                     zoneId: "a1", storeId: "walmart-192d" },
  { name: "tomatoes",     aliases: ["tomato", "roma tomatoes", "cherry tomatoes", "grape tomatoes"],               zoneId: "a1", storeId: "walmart-192d" },
  { name: "potatoes",     aliases: ["potato", "russet potatoes", "red potatoes", "gold potatoes", "yukon gold"],   zoneId: "a1", storeId: "walmart-192d" },
  { name: "onions",       aliases: ["onion", "yellow onion", "white onion", "red onion"],                          zoneId: "a1", storeId: "walmart-192d" },
  { name: "garlic",       aliases: ["garlic cloves", "garlic bulb", "minced garlic"],                              zoneId: "a1", storeId: "walmart-192d" },
  { name: "avocados",     aliases: ["avocado", "hass avocado"],                                                    zoneId: "a1", storeId: "walmart-192d" },
  { name: "spinach",      aliases: ["baby spinach", "spinach leaves"],                                             zoneId: "a1", storeId: "walmart-192d" },

  // ── A2 — Bread ──
  { name: "bread",        aliases: ["white bread", "wheat bread", "sandwich bread", "whole wheat bread"],          zoneId: "a2", storeId: "walmart-192d" },
  { name: "rolls",        aliases: ["dinner rolls", "hamburger buns", "hot dog buns", "buns"],                     zoneId: "a2", storeId: "walmart-192d" },

  // ── A3 — Tea / Coffee / PB ──
  { name: "coffee",       aliases: ["ground coffee", "coffee beans", "instant coffee", "folgers", "maxwell house"], zoneId: "a3", storeId: "walmart-192d" },
  { name: "tea",          aliases: ["tea bags", "green tea", "black tea", "herbal tea", "lipton"],                  zoneId: "a3", storeId: "walmart-192d" },
  { name: "peanut butter",aliases: ["pb", "jif", "skippy", "natural peanut butter"],                               zoneId: "a3", storeId: "walmart-192d" },
  { name: "jelly",        aliases: ["jam", "grape jelly", "strawberry jam", "preserves"],                          zoneId: "a3", storeId: "walmart-192d" },
  { name: "honey",        aliases: ["agave", "maple syrup"],                                                       zoneId: "a3", storeId: "walmart-192d" },

  // ── A4 — Pasta / Canned Tomatoes ──
  { name: "pasta",        aliases: ["spaghetti", "penne", "rotini", "fettuccine", "linguine", "noodles"],           zoneId: "a4", storeId: "walmart-192d" },
  { name: "pasta sauce",  aliases: ["marinara", "tomato sauce", "spaghetti sauce", "ragu", "prego"],                zoneId: "a4", storeId: "walmart-192d" },
  { name: "canned tomatoes", aliases: ["diced tomatoes", "crushed tomatoes", "tomato paste", "tomato puree"],       zoneId: "a4", storeId: "walmart-192d" },

  // ── A17 — Sports Drinks / Water ──
  { name: "water",        aliases: ["bottled water", "drinking water", "purified water", "dasani", "aquafina"],     zoneId: "a17", storeId: "walmart-192d" },
  { name: "sports drinks",aliases: ["gatorade", "powerade", "electrolyte drink", "pedialyte"],                      zoneId: "a17", storeId: "walmart-192d" },
  { name: "sparkling water", aliases: ["seltzer", "sparkling", "perrier", "lacroix", "bubbly"],                    zoneId: "a17", storeId: "walmart-192d" },

  // ── A18 — Juice / Drink Mixes ──
  { name: "orange juice", aliases: ["oj", "tropicana", "simply orange", "minute maid oj"],                         zoneId: "a18", storeId: "walmart-192d" },
  { name: "apple juice",  aliases: ["apple cider"],                                                                 zoneId: "a18", storeId: "walmart-192d" },
  { name: "grape juice",  aliases: ["welchs"],                                                                      zoneId: "a18", storeId: "walmart-192d" },
  { name: "lemonade",     aliases: ["minute maid lemonade", "country time"],                                        zoneId: "a18", storeId: "walmart-192d" },

  // ── A26 — Beer / Mixers ──
  { name: "beer",         aliases: ["six pack", "12 pack", "case of beer", "craft beer", "ipa", "lager", "ale"],    zoneId: "a26", storeId: "walmart-192d" },
  { name: "hard seltzer", aliases: ["white claw", "truly", "high noon"],                                            zoneId: "a26", storeId: "walmart-192d" },
  { name: "mixers",       aliases: ["tonic water", "club soda", "soda water", "ginger beer", "grenadine"],          zoneId: "a26", storeId: "walmart-192d" },

  // ── A28 — Waffles / Ice Cream ──
  { name: "waffles",      aliases: ["frozen waffles", "eggo waffles", "eggo"],                                      zoneId: "a28", storeId: "walmart-192d" },
  { name: "ice cream",    aliases: ["ice cream tub", "häagen-dazs", "ben & jerrys", "breyers", "ice cream pint"],   zoneId: "a28", storeId: "walmart-192d" },
  { name: "popsicles",    aliases: ["ice pops", "paletas", "creamsicles", "fudge bars", "drumstick"],                zoneId: "a28", storeId: "walmart-192d" },

  // ── A29 — Potatoes / Frozen Breakfast ──
  { name: "hash browns",  aliases: ["frozen hash browns", "tater tots", "frozen potatoes", "potato wedges"],        zoneId: "a29", storeId: "walmart-192d" },
  { name: "frozen breakfast", aliases: ["breakfast burritos", "jimmy dean", "hot pockets", "frozen pancakes", "sausage biscuit"], zoneId: "a29", storeId: "walmart-192d" },

  // ── A32 — Frozen Vegetables ──
  { name: "frozen peas",  aliases: ["frozen green peas"],                                                           zoneId: "a32", storeId: "walmart-192d" },
  { name: "frozen corn",  aliases: ["frozen corn kernels"],                                                         zoneId: "a32", storeId: "walmart-192d" },
  { name: "frozen broccoli", aliases: ["frozen broccoli florets"],                                                  zoneId: "a32", storeId: "walmart-192d" },
  { name: "frozen vegetables", aliases: ["mixed vegetables", "veggie mix", "stir fry vegetables", "edamame"],       zoneId: "a32", storeId: "walmart-192d" },

  // ── A33 — Dairy — Milk / Yogurt / Biscuits ──
  { name: "milk",         aliases: ["whole milk", "2% milk", "skim milk", "gallon of milk", "oat milk", "almond milk"], zoneId: "a33", storeId: "walmart-192d" },
  { name: "yogurt",       aliases: ["greek yogurt", "chobani", "yoplait", "activia", "oikos"],                      zoneId: "a33", storeId: "walmart-192d" },
  { name: "biscuits",     aliases: ["pillsbury biscuits", "grands biscuits", "crescent rolls", "refrigerated biscuits"], zoneId: "a33", storeId: "walmart-192d" },

  // ── A34 — Snack Cheese / Bagels / Butter / Eggs ──
  { name: "eggs",         aliases: ["dozen eggs", "large eggs", "egg carton", "cage free eggs"],                    zoneId: "a34", storeId: "walmart-192d" },
  { name: "butter",       aliases: ["salted butter", "unsalted butter", "land o lakes", "kerrygold", "margarine"],   zoneId: "a34", storeId: "walmart-192d" },
  { name: "cream cheese", aliases: ["philadelphia cream cheese", "neufchatel"],                                      zoneId: "a34", storeId: "walmart-192d" },
  { name: "bagels",       aliases: ["english muffins", "bagel thins"],                                              zoneId: "a34", storeId: "walmart-192d" },
  { name: "string cheese",aliases: ["cheese sticks", "snack cheese", "babybel"],                                     zoneId: "a34", storeId: "walmart-192d" },

  // ── A35 — Bacon & Sausage / Sliced Cheese ──
  { name: "bacon",        aliases: ["turkey bacon", "thick cut bacon", "oscar mayer bacon"],                        zoneId: "a35", storeId: "walmart-192d" },
  { name: "sausage",      aliases: ["breakfast sausage", "italian sausage", "jimmy dean sausage", "bratwurst"],      zoneId: "a35", storeId: "walmart-192d" },
  { name: "sliced cheese",aliases: ["american cheese", "cheddar slices", "swiss slices", "provolone slices"],        zoneId: "a35", storeId: "walmart-192d" },

  // ── A36 — Block Cheese ──
  { name: "cheddar cheese", aliases: ["sharp cheddar", "mild cheddar", "colby jack", "block cheddar"],              zoneId: "a36", storeId: "walmart-192d" },
  { name: "mozzarella",   aliases: ["mozzarella block", "fresh mozzarella", "shredded mozzarella"],                  zoneId: "a36", storeId: "walmart-192d" },
  { name: "parmesan",     aliases: ["parmigiano", "grated parmesan", "parmesan block"],                              zoneId: "a36", storeId: "walmart-192d" },
  { name: "pepper jack",  aliases: ["monterey jack", "pepper jack block"],                                           zoneId: "a36", storeId: "walmart-192d" },

  // ── A37 — Bakery ──
  { name: "bakery bread", aliases: ["french bread", "baguette", "artisan bread", "sourdough loaf", "ciabatta"],     zoneId: "a37", storeId: "walmart-192d" },
  { name: "bakery items", aliases: ["donuts", "doughnuts", "muffins", "croissants", "danish", "cinnamon rolls"],     zoneId: "a37", storeId: "walmart-192d" },

  // ── A38 — Deli ──
  { name: "deli meat",    aliases: ["lunch meat", "turkey slices", "ham slices", "salami", "bologna", "pepperoni"],  zoneId: "a38", storeId: "walmart-192d" },
  { name: "rotisserie chicken", aliases: ["deli chicken", "hot chicken"],                                            zoneId: "a38", storeId: "walmart-192d" },
  { name: "deli cheese",  aliases: ["deli provolone", "deli swiss", "deli american"],                                zoneId: "a38", storeId: "walmart-192d" },
];
