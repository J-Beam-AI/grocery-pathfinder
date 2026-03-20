/**
 * WinCo — Store Layout & Seed Catalog
 *
 * 56 zones, custom walking pattern.
 * No seed items — catalog grows via UnknownItemResolver during use.
 *
 * Zone order follows physical traversal: north wall → east aisles → east wall →
 * frozen/dairy → south wall → west aisles → checkstands → bakery.
 * Zones 51–56 are empty / not in use and are placed last.
 *
 * SOURCE OF TRUTH — do not regenerate.
 */

import type { StoreLayout, CatalogItem } from "../types";

export const defaultStore: StoreLayout = {
  id: "winco",
  name: "WinCo",
  shortLabel: "WinCo",
  walkingPattern: "custom",
  zones: [
    { id: "north-wall",       name: "North Wall — Fresh Produce",                                          order: 1  },
    { id: "northeast-corner", name: "Northeast Corner — Bulk Candy / Bulk Foods",                          order: 2  },
    { id: "1a-w",             name: "1A West — Potato Chips / Corn Chips / Tortilla Chips / Pretzels",     order: 3  },
    { id: "1a-e",             name: "1A East — Candy / Popcorn / Rice Cakes / Fruit Snacks",               order: 4  },
    { id: "2a-w",             name: "2A West — Cookies / Grahams / Gourmet Crackers",                      order: 5  },
    { id: "2a-e",             name: "2A East — Candles / Ribbon / Promotional / Wrapping Paper",           order: 6  },
    { id: "3a-w",             name: "3A West — Greeting Cards / Birthday Cards",                           order: 7  },
    { id: "3a-e",             name: "3A East — Gift Wrap / Special Buys",                                  order: 8  },
    { id: "4a-w",             name: "4A West — Promotional / Special Cards",                               order: 9  },
    { id: "4a-e",             name: "4A East — Seasonal / Holiday Items",                                  order: 10 },
    { id: "5a-w",             name: "5A West — Feminine Hygiene / Dental / Cough & Cold / Vitamins",       order: 11 },
    { id: "5a-e",             name: "5A East — Bar Soap / Hair Care / Cosmetics / Shaving Supplies",       order: 12 },
    { id: "6a-w",             name: "6A West — Condiments / Salad Dressing / Pickles & Olives / Canned Fruit", order: 13 },
    { id: "6a-e",             name: "6A East — Boxed Juice / Can Vegetables / Can Juice / Bottled Juice",  order: 14 },
    { id: "7a-w",             name: "7A West — Salsa / Masa/Hominy / Tortillas / Hispanic Foods",          order: 15 },
    { id: "7a-e",             name: "7A East — Asian Foods / Ramen Noodles / Soup / Broth",                order: 16 },
    { id: "8a-w",             name: "8A West — Spaghetti Sauce / Foil & Spices / Can Beans & Chili / Can Meat & Tuna", order: 17 },
    { id: "8a-e",             name: "8A East — Pasta / Box Dinners / Stuffing & Potato / Beans & Rice",   order: 18 },
    { id: "9a-w",             name: "9A West — Peanut Butter / Jelly / Pancake & Syrup / Flour & Sugar / Canned Milk", order: 19 },
    { id: "9a-e",             name: "9A East — Kitchenware / Oils & Spices / Jello / Cake Mix",            order: 20 },
    { id: "10a-w",            name: "10A West — Breakfast Bars",                                           order: 21 },
    { id: "10a-e",            name: "10A East — Cereal",                                                   order: 22 },
    { id: "11a-w",            name: "11A West — Dips & Cheese / Lunchmeat",                                order: 23 },
    { id: "11a-e",            name: "11A East — Meat / Floor Coolers",                                     order: 24 },
    { id: "east-wall",        name: "East Wall — BBQ / Deli / Fresh Seafood / Fresh Meats / Beer",         order: 25 },
    { id: "14b-e",            name: "14B East — Milk / Eggs / Butter",                                     order: 26 },
    { id: "14b-w",            name: "14B West — Yogurt",                                                   order: 27 },
    { id: "13b-e",            name: "13B East — Waffles / Breakfast Sausage / Frozen Juice / Pizza",       order: 28 },
    { id: "13b-w",            name: "13B West — Fruits & Desserts / Whipped Toppings / Frozen Breads & Rolls / French Fries", order: 29 },
    { id: "12b-e",            name: "12B East — Frozen Vegetables / Appetizers",                           order: 30 },
    { id: "12b-w",            name: "12B West — Meatless Items / Fish Sticks",                             order: 31 },
    { id: "south-wall",       name: "South Wall — Ice Cream / Frozen Novelties",                           order: 32 },
    { id: "11b-e",            name: "11B East — Household Cleaners / Mops & Brooms / Sponges / Air Fresheners", order: 33 },
    { id: "11b-w",            name: "11B West — Dish Soap / Dish Detergent / Laundry Detergent / Bleach & Softeners", order: 34 },
    { id: "10b-e",            name: "10B East — Canned Cat Food / Pet Supplies / Bird Seed / Pet Snacks",  order: 35 },
    { id: "10b-w",            name: "10B West — Dry Cat Food / Cat Litter / Dry Dog Food",                 order: 36 },
    { id: "9b-e",             name: "9B East — Baby Needs / Diapers / Baby Food / Pedialyte",              order: 37 },
    { id: "9b-w",             name: "9B West — Office Supplies",                                           order: 38 },
    { id: "8b-e",             name: "8B East — Books & Magazines / Bar Supplies / Mixers / Wine",          order: 39 },
    { id: "8b-w",             name: "8B West — Charcoal/Logs / Canning Supplies / Small Plastics / Bags & Wraps", order: 40 },
    { id: "7b-e",             name: "7B East — Paper Products",                                            order: 41 },
    { id: "7b-w",             name: "7B West — Firewood / Toilet Paper / Paper Towels",                    order: 42 },
    { id: "6b-e",             name: "6B East — Straws / Toothpicks / Matches",                             order: 43 },
    { id: "6b-w",             name: "6B West — Facial Tissue / Napkins / Paper Plates / Styrofoam Cups",   order: 44 },
    { id: "5b-e",             name: "5B East — Sodas",                                                     order: 45 },
    { id: "5b-w",             name: "5B West — Sports Drinks / Bottled Water",                             order: 46 },
    { id: "4b-e",             name: "4B East — Bread / Donuts",                                            order: 47 },
    { id: "4b-w",             name: "4B West — Cash Registers",                                            order: 48 },
    { id: "3b",               name: "3B — Bread / Lil Debbie / English Muffins / Hostess / Dinner Rolls",  order: 49 },
    { id: "southwest-corner", name: "Southwest Corner — Bakery",                                           order: 50 },
    { id: "12a-w",            name: "12A West — (empty)",                                                  order: 51 },
    { id: "12a-e",            name: "12A East — (empty)",                                                  order: 52 },
    { id: "13a-w",            name: "13A West — (empty)",                                                  order: 53 },
    { id: "13a-e",            name: "13A East — (empty)",                                                  order: 54 },
    { id: "14a-w",            name: "14A West — N/A (Not in Use)",                                         order: 55 },
    { id: "14a-e",            name: "14A East — N/A (Not in Use)",                                         order: 56 },
  ],
};

export const seedCatalog: CatalogItem[] = [];
