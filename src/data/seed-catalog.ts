/**
 * Walmart 4th Plain — Store Layout & Seed Catalog
 *
 * Store zones are real aisles in walking order (A1 → A33).
 * The shopper serpentines: down A1, up A2, down A3, etc.
 * For v1 (zone-based routing), aisle order alone determines the route.
 *
 * Each catalog entry maps a canonical item name + aliases to an aisle.
 * This seed covers ~200 common items. The app will learn new items
 * as the user assigns them during shopping trips.
 */

import type { StoreLayout, CatalogItem } from "../types";

export const defaultStore: StoreLayout = {
  id: "walmart-4th-plain",
  name: "Walmart — 4th Plain",
  shortLabel: "4th Plain",
  walkingPattern: "serpentine",
  zones: [
    { id: "A1", name: "A1 — Produce", order: 0 },
    { id: "A2", name: "A2 — Desserts & Ice Cream", order: 1 },
    { id: "A3", name: "A3 — Frozen Bread & Pizza", order: 2 },
    { id: "A4", name: "A4 — Frozen Meals & Vegetables", order: 3 },
    { id: "A5", name: "A5 — Frozen Breakfast", order: 4 },
    { id: "A6", name: "A6 — Cold Beer", order: 5 },
    { id: "A7", name: "A7 — Wine", order: 6 },
    { id: "A8", name: "A8 — Liquor", order: 7 },
    { id: "A9", name: "A9 — Pickles, Condiments & Dressing", order: 8 },
    { id: "A10", name: "A10 — Pasta & Sauces", order: 9 },
    { id: "A11", name: "A11 — Box Dinners & Mixes", order: 10 },
    { id: "A12", name: "A12 — Canned Goods", order: 11 },
    { id: "A13", name: "A13 — International, Rice & Beans", order: 12 },
    { id: "A14", name: "A14 — Baking & Spices", order: 13 },
    { id: "A15", name: "A15 — PB, Jelly, Oil & Sugar", order: 14 },
    { id: "A16", name: "A16 — Bread, Tea & Coffee", order: 15 },
    { id: "A17", name: "A17 — Cereal & Breakfast", order: 16 },
    { id: "A18", name: "A18 — Cookies, Crackers & Nuts", order: 17 },
    { id: "A19", name: "A19 — Candy & Snacks", order: 18 },
    { id: "A20", name: "A20 — Fruit Snacks & Bars", order: 19 },
    { id: "A21", name: "A21 — Chips & Popcorn", order: 20 },
    { id: "A22", name: "A22 — Juice", order: 21 },
    { id: "A23", name: "A23 — Water & Sports Drinks", order: 22 },
    { id: "A24", name: "A24 — Soft Drinks", order: 23 },
    { id: "A25", name: "A25 — Trash Bags & Paper Goods", order: 24 },
    { id: "A26", name: "A26 — Paper Towels", order: 25 },
    { id: "A27", name: "A27 — Air Fresheners & Dish Soap", order: 26 },
    { id: "A28", name: "A28 — Laundry", order: 27 },
    { id: "A29", name: "A29 — Cleaning Supplies", order: 28 },
    { id: "A30", name: "A30 — Eggs & Cheese", order: 29 },
    { id: "A31", name: "A31 — Dairy", order: 30 },
    { id: "A32", name: "A32 — Meat & Seafood", order: 31 },
    { id: "A33", name: "A33 — Bakery & Deli", order: 32 },
  ],
};

export const seedCatalog: CatalogItem[] = [
  // ── A1 — Produce ──
  { name: "apples", aliases: ["apple", "gala apples", "fuji apples", "honeycrisp"], zoneId: "A1" },
  { name: "bananas", aliases: ["banana"], zoneId: "A1" },
  { name: "oranges", aliases: ["orange", "navel oranges", "mandarins", "clementines", "tangerines"], zoneId: "A1" },
  { name: "grapes", aliases: ["grape", "red grapes", "green grapes"], zoneId: "A1" },
  { name: "strawberries", aliases: ["strawberry"], zoneId: "A1" },
  { name: "blueberries", aliases: ["blueberry"], zoneId: "A1" },
  { name: "lemons", aliases: ["lemon", "limes", "lime"], zoneId: "A1" },
  { name: "avocados", aliases: ["avocado", "avacado"], zoneId: "A1" },
  { name: "tomatoes", aliases: ["tomato", "roma tomatoes", "cherry tomatoes", "grape tomatoes"], zoneId: "A1" },
  { name: "onions", aliases: ["onion", "yellow onion", "red onion", "white onion", "green onions", "scallions"], zoneId: "A1" },
  { name: "potatoes", aliases: ["potato", "russet potatoes", "red potatoes", "yukon gold", "sweet potatoes", "yams"], zoneId: "A1" },
  { name: "carrots", aliases: ["carrot", "baby carrots"], zoneId: "A1" },
  { name: "celery", aliases: [], zoneId: "A1" },
  { name: "broccoli", aliases: ["broccoli florets", "broccoli crowns"], zoneId: "A1" },
  { name: "bell peppers", aliases: ["bell pepper", "green pepper", "red pepper", "peppers"], zoneId: "A1" },
  { name: "lettuce", aliases: ["romaine", "iceberg lettuce", "romaine lettuce", "spring mix"], zoneId: "A1" },
  { name: "spinach", aliases: ["baby spinach"], zoneId: "A1" },
  { name: "cucumbers", aliases: ["cucumber"], zoneId: "A1" },
  { name: "mushrooms", aliases: ["mushroom", "baby bella", "white mushrooms"], zoneId: "A1" },
  { name: "garlic", aliases: ["garlic cloves", "minced garlic"], zoneId: "A1" },
  { name: "ginger", aliases: ["fresh ginger"], zoneId: "A1" },
  { name: "cilantro", aliases: ["fresh cilantro"], zoneId: "A1" },
  { name: "corn", aliases: ["corn on the cob", "sweet corn"], zoneId: "A1" },
  { name: "bagged salad", aliases: ["salad kit", "salad mix", "caesar salad kit"], zoneId: "A1" },
  { name: "watermelon", aliases: [], zoneId: "A1" },

  // ── A2 — Desserts & Ice Cream ──
  { name: "ice cream", aliases: ["vanilla ice cream", "chocolate ice cream", "ice cream pint"], zoneId: "A2" },
  { name: "frozen desserts", aliases: ["popsicles", "ice cream bars", "frozen yogurt"], zoneId: "A2" },
  { name: "pie", aliases: ["frozen pie", "pie crust"], zoneId: "A2" },

  // ── A3 — Frozen Bread & Pizza ──
  { name: "frozen pizza", aliases: ["digiorno", "totinos", "pizza"], zoneId: "A3" },
  { name: "frozen bread", aliases: ["garlic bread", "frozen rolls", "texas toast", "frozen garlic bread"], zoneId: "A3" },

  // ── A4 — Frozen Meals & Vegetables ──
  { name: "frozen meals", aliases: ["tv dinners", "lean cuisine", "hungry man", "frozen dinner", "frozen entree"], zoneId: "A4" },
  { name: "frozen vegetables", aliases: ["frozen peas", "frozen corn", "frozen broccoli", "frozen mixed vegetables", "frozen green beans", "frozen spinach", "steamable vegetables"], zoneId: "A4" },
  { name: "frozen snacks", aliases: ["hot pockets", "pizza rolls", "frozen burritos", "taquitos", "mozzarella sticks", "corn dogs", "egg rolls"], zoneId: "A4" },
  { name: "frozen chicken", aliases: ["chicken nuggets", "chicken strips", "frozen tenders", "frozen wings", "chicken patties", "popcorn chicken"], zoneId: "A4" },

  // ── A5 — Frozen Breakfast ──
  { name: "frozen waffles", aliases: ["eggo", "eggos", "waffles"], zoneId: "A5" },
  { name: "frozen breakfast", aliases: ["breakfast sandwiches", "frozen pancakes", "frozen sausage", "jimmy dean", "breakfast burritos"], zoneId: "A5" },

  // ── A6–A8 — Alcohol ──
  { name: "beer", aliases: ["cold beer", "craft beer", "bud light", "coors", "modelo", "corona", "ipa"], zoneId: "A6" },
  { name: "wine", aliases: ["red wine", "white wine", "rosé", "rose", "chardonnay", "cabernet", "pinot noir", "moscato"], zoneId: "A7" },
  { name: "liquor", aliases: ["vodka", "rum", "whiskey", "tequila", "gin", "bourbon", "brandy"], zoneId: "A8" },

  // ── A9 — Pickles, Condiments & Dressing ──
  { name: "pickles", aliases: ["dill pickles", "pickle relish", "sweet pickles"], zoneId: "A9" },
  { name: "ketchup", aliases: ["catsup"], zoneId: "A9" },
  { name: "mustard", aliases: ["yellow mustard", "dijon mustard", "dijon"], zoneId: "A9" },
  { name: "mayonnaise", aliases: ["mayo", "miracle whip"], zoneId: "A9" },
  { name: "salad dressing", aliases: ["ranch dressing", "ranch", "italian dressing", "caesar dressing", "vinaigrette"], zoneId: "A9" },
  { name: "hot sauce", aliases: ["sriracha", "tabasco", "franks hot sauce", "cholula"], zoneId: "A9" },
  { name: "soy sauce", aliases: [], zoneId: "A9" },
  { name: "barbecue sauce", aliases: ["bbq sauce", "bbq"], zoneId: "A9" },

  // ── A10 — Pasta & Sauces ──
  { name: "pasta", aliases: ["spaghetti", "penne", "rigatoni", "linguine", "fettuccine", "macaroni", "elbow macaroni", "angel hair", "noodles", "egg noodles"], zoneId: "A10" },
  { name: "spaghetti sauce", aliases: ["pasta sauce", "marinara", "marinara sauce", "tomato sauce", "alfredo sauce", "alfredo", "ragu", "prego"], zoneId: "A10" },
  { name: "canned beans", aliases: ["black beans", "kidney beans", "pinto beans", "refried beans", "garbanzo beans", "chickpeas", "great northern beans", "navy beans"], zoneId: "A10" },

  // ── A11 — Box Dinners & Mixes ──
  { name: "mac and cheese", aliases: ["mac n cheese", "mac-n-cheese", "kraft dinner", "kraft mac", "velveeta"], zoneId: "A11" },
  { name: "box dinners", aliases: ["hamburger helper", "rice a roni", "rice-a-roni", "suddenly salad"], zoneId: "A11" },
  { name: "gravy mix", aliases: ["gravy", "gravy packet", "brown gravy", "turkey gravy"], zoneId: "A11" },
  { name: "sauce mix", aliases: ["taco seasoning", "seasoning mix", "chili seasoning", "fajita seasoning", "ranch packet"], zoneId: "A11" },

  // ── A12 — Canned Goods ──
  { name: "canned soup", aliases: ["soup", "campbells", "chicken noodle soup", "tomato soup", "cream of mushroom", "cream of chicken", "progresso", "broth", "chicken broth", "beef broth", "vegetable broth", "bone broth", "stock"], zoneId: "A12" },
  { name: "canned meat", aliases: ["spam", "canned chicken", "vienna sausages"], zoneId: "A12" },
  { name: "canned tuna", aliases: ["tuna", "tuna fish", "canned salmon", "salmon"], zoneId: "A12" },
  { name: "canned chili", aliases: ["chili", "hormel chili", "wolf brand chili"], zoneId: "A12" },
  { name: "canned tomatoes", aliases: ["diced tomatoes", "crushed tomatoes", "tomato paste", "stewed tomatoes", "rotel"], zoneId: "A12" },

  // ── A13 — International, Rice & Beans ──
  { name: "rice", aliases: ["white rice", "brown rice", "jasmine rice", "basmati rice", "instant rice", "minute rice", "long grain rice", "wild rice", "rice bag"], zoneId: "A13" },
  { name: "dry beans", aliases: ["dried beans", "lentils", "split peas", "dried lentils"], zoneId: "A13" },
  { name: "tortillas", aliases: ["flour tortillas", "corn tortillas", "tortilla", "wraps", "taco shells", "tostadas"], zoneId: "A13" },
  { name: "salsa", aliases: ["pico de gallo", "salsa verde", "taco sauce", "enchilada sauce"], zoneId: "A13" },
  { name: "international foods", aliases: ["soy sauce", "coconut milk", "curry paste", "nori", "ramen", "instant noodles", "rice noodles", "teriyaki sauce"], zoneId: "A13" },

  // ── A14 — Baking & Spices ──
  { name: "cake mix", aliases: ["brownie mix", "muffin mix", "betty crocker", "duncan hines"], zoneId: "A14" },
  { name: "frosting", aliases: ["icing", "cake frosting"], zoneId: "A14" },
  { name: "jello", aliases: ["gelatin", "jell-o", "pudding mix"], zoneId: "A14" },
  { name: "syrup", aliases: ["maple syrup", "pancake syrup", "mrs butterworth"], zoneId: "A14" },
  { name: "pancake mix", aliases: ["bisquick", "waffle mix"], zoneId: "A14" },
  { name: "vinegar", aliases: ["white vinegar", "apple cider vinegar", "balsamic vinegar", "red wine vinegar"], zoneId: "A14" },
  { name: "spices", aliases: ["salt", "pepper", "black pepper", "garlic powder", "onion powder", "cumin", "paprika", "chili powder", "cinnamon", "oregano", "basil", "thyme", "rosemary", "bay leaves", "italian seasoning", "cayenne", "nutmeg", "turmeric", "seasoning"], zoneId: "A14" },
  { name: "baking soda", aliases: ["baking powder", "cornstarch", "cream of tartar", "yeast"], zoneId: "A14" },
  { name: "vanilla extract", aliases: ["vanilla", "almond extract"], zoneId: "A14" },
  { name: "chocolate chips", aliases: ["baking chocolate", "cocoa powder", "cocoa"], zoneId: "A14" },

  // ── A15 — PB, Jelly, Oil & Sugar ──
  { name: "peanut butter", aliases: ["pb", "almond butter", "sunflower butter", "jif", "skippy"], zoneId: "A15" },
  { name: "jelly", aliases: ["jam", "preserves", "grape jelly", "strawberry jam", "fruit spread"], zoneId: "A15" },
  { name: "honey", aliases: ["raw honey", "honey bear"], zoneId: "A15" },
  { name: "cooking oil", aliases: ["vegetable oil", "olive oil", "canola oil", "coconut oil", "avocado oil", "oil", "cooking spray", "pam"], zoneId: "A15" },
  { name: "flour", aliases: ["all purpose flour", "all-purpose flour", "bread flour", "wheat flour", "self-rising flour"], zoneId: "A15" },
  { name: "sugar", aliases: ["white sugar", "brown sugar", "powdered sugar", "confectioners sugar", "granulated sugar"], zoneId: "A15" },

  // ── A16 — Bread, Tea & Coffee ──
  { name: "bread", aliases: ["white bread", "wheat bread", "whole wheat bread", "sourdough", "sandwich bread", "loaf"], zoneId: "A16" },
  { name: "buns", aliases: ["hamburger buns", "hot dog buns", "slider buns", "brioche buns"], zoneId: "A16" },
  { name: "tea", aliases: ["green tea", "black tea", "herbal tea", "tea bags", "iced tea", "chai"], zoneId: "A16" },
  { name: "creamer", aliases: ["coffee creamer", "half and half", "half & half", "french vanilla creamer", "international delight"], zoneId: "A16" },
  { name: "coffee", aliases: ["ground coffee", "coffee beans", "folgers", "maxwell house", "k-cups", "kcups", "instant coffee", "cold brew"], zoneId: "A16" },

  // ── A17 — Cereal & Breakfast ──
  { name: "pop-tarts", aliases: ["poptarts", "pop tarts", "toaster pastries"], zoneId: "A17" },
  { name: "cereal", aliases: ["cheerios", "frosted flakes", "lucky charms", "fruit loops", "raisin bran", "corn flakes", "granola cereal", "oatmeal", "oats", "instant oatmeal"], zoneId: "A17" },
  { name: "granola", aliases: ["granola bag", "loose granola"], zoneId: "A17" },

  // ── A18 — Cookies, Crackers & Nuts ──
  { name: "cookies", aliases: ["oreos", "chips ahoy", "nutter butters", "chocolate chip cookies", "sandwich cookies"], zoneId: "A18" },
  { name: "crackers", aliases: ["saltines", "ritz crackers", "graham crackers", "goldfish", "cheez-its", "cheez its", "wheat thins", "triscuits", "animal crackers"], zoneId: "A18" },
  { name: "nuts", aliases: ["peanuts", "almonds", "cashews", "mixed nuts", "walnuts", "pecans", "pistachios", "sunflower seeds"], zoneId: "A18" },
  { name: "trail mix", aliases: [], zoneId: "A18" },

  // ── A19 — Candy & Snacks ──
  { name: "candy", aliases: ["chocolate", "gummy bears", "sour patch", "m&ms", "skittles", "starburst", "reeses", "snickers", "twix", "kit kat"], zoneId: "A19" },
  { name: "pudding", aliases: ["pudding cups", "jello cups", "snack pack"], zoneId: "A19" },

  // ── A20 — Fruit Snacks & Bars ──
  { name: "fruit snacks", aliases: ["gushers", "welchs fruit snacks", "motts fruit snacks"], zoneId: "A20" },
  { name: "granola bars", aliases: ["nature valley", "kind bars", "clif bars", "protein bars", "fiber bars", "snack bars", "nutri-grain bars"], zoneId: "A20" },
  { name: "snack cakes", aliases: ["little debbie", "hostess", "cosmic brownies", "zebra cakes", "oatmeal creme pies", "twinkies", "ho hos"], zoneId: "A20" },

  // ── A21 — Chips & Popcorn ──
  { name: "chips", aliases: ["potato chips", "tortilla chips", "doritos", "lays", "fritos", "tostitos", "pringles", "kettle chips", "ruffles", "sun chips"], zoneId: "A21" },
  { name: "popcorn", aliases: ["microwave popcorn", "smartfood", "skinny pop"], zoneId: "A21" },
  { name: "pretzels", aliases: ["pretzel", "pretzel sticks", "pretzel twists"], zoneId: "A21" },
  { name: "dips", aliases: ["salsa con queso", "queso", "french onion dip", "hummus", "guacamole", "bean dip"], zoneId: "A21" },

  // ── A22 — Juice ──
  { name: "juice", aliases: ["orange juice", "oj", "apple juice", "grape juice", "cranberry juice", "fruit juice", "lemonade", "simply orange", "minute maid", "tropicana", "v8", "vegetable juice"], zoneId: "A22" },

  // ── A23 — Water & Sports Drinks ──
  { name: "bottled water", aliases: ["water", "water bottles", "spring water", "purified water", "dasani", "aquafina", "smartwater"], zoneId: "A23" },
  { name: "sports drinks", aliases: ["gatorade", "powerade", "body armor", "bodyarmor", "prime", "electrolytes", "pedialyte"], zoneId: "A23" },
  { name: "flavored water", aliases: ["la croix", "lacroix", "sparkling water", "seltzer", "perrier", "topo chico"], zoneId: "A23" },

  // ── A24 — Soft Drinks ──
  { name: "soft drinks", aliases: ["soda", "coke", "pepsi", "sprite", "dr pepper", "mountain dew", "7up", "root beer", "ginger ale", "diet coke", "coca cola", "fanta"], zoneId: "A24" },
  { name: "energy drinks", aliases: ["red bull", "monster", "bang", "celsius", "reign"], zoneId: "A24" },

  // ── A25 — Trash Bags & Paper Goods ──
  { name: "trash bags", aliases: ["garbage bags", "hefty", "glad bags", "kitchen bags"], zoneId: "A25" },
  { name: "paper plates", aliases: ["disposable plates", "styrofoam plates", "plastic cups", "disposable cups", "solo cups", "napkins", "plastic utensils", "plastic forks"], zoneId: "A25" },
  { name: "facial tissue", aliases: ["tissues", "kleenex", "puffs"], zoneId: "A25" },
  { name: "plastic wrap", aliases: ["aluminum foil", "foil", "parchment paper", "wax paper", "ziploc bags", "zip lock bags", "storage bags", "sandwich bags", "freezer bags"], zoneId: "A25" },

  // ── A26 — Paper Towels ──
  { name: "paper towels", aliases: ["bounty", "brawny", "viva"], zoneId: "A26" },

  // ── A27 — Air Fresheners & Dish Soap ──
  { name: "air fresheners", aliases: ["febreze", "glade", "air wick", "candle", "candles"], zoneId: "A27" },
  { name: "dish detergent", aliases: ["dish soap", "dishwasher detergent", "dishwasher pods", "dawn", "cascade", "finish", "sponges", "dish sponge"], zoneId: "A27" },
  { name: "bathroom tissue", aliases: ["toilet paper", "tp", "charmin", "cottonelle", "scott"], zoneId: "A27" },

  // ── A28 — Laundry ──
  { name: "laundry detergent", aliases: ["tide", "gain", "all detergent", "laundry soap", "tide pods", "laundry pods", "fabric softener", "dryer sheets", "bounce"], zoneId: "A28" },
  { name: "bleach", aliases: ["clorox", "oxiclean", "stain remover"], zoneId: "A28" },

  // ── A29 — Cleaning Supplies ──
  { name: "mops", aliases: ["mop", "swiffer", "broom", "dustpan", "vacuum bags"], zoneId: "A29" },
  { name: "all purpose cleaners", aliases: ["windex", "lysol", "clorox wipes", "disinfectant", "cleaning spray", "409", "mr clean", "pine sol", "pledge"], zoneId: "A29" },

  // ── A30 — Eggs & Cheese ──
  { name: "eggs", aliases: ["egg", "dozen eggs", "large eggs", "organic eggs", "cage free eggs", "egg whites"], zoneId: "A30" },
  { name: "cheese", aliases: ["shredded cheese", "cheddar", "mozzarella", "swiss cheese", "parmesan", "cream cheese", "american cheese", "pepper jack", "colby jack", "cheese slices", "string cheese", "cottage cheese", "block cheese", "velveeta cheese"], zoneId: "A30" },
  { name: "biscuits", aliases: ["pillsbury biscuits", "crescent rolls", "cinnamon rolls", "refrigerated dough", "pie crust", "cookie dough"], zoneId: "A30" },

  // ── A31 — Dairy ──
  { name: "yogurt", aliases: ["greek yogurt", "yoplait", "chobani", "dannon", "yogurt cups", "yogurt tub"], zoneId: "A31" },
  { name: "sour cream", aliases: ["french onion dip"], zoneId: "A31" },
  { name: "milk", aliases: ["whole milk", "2% milk", "skim milk", "1% milk", "gallon of milk", "half gallon milk", "organic milk", "chocolate milk"], zoneId: "A31" },
  { name: "specialty milk", aliases: ["almond milk", "oat milk", "soy milk", "coconut milk", "lactose free milk", "fairlife", "plant milk"], zoneId: "A31" },
  { name: "butter", aliases: ["salted butter", "unsalted butter", "margarine", "i cant believe its not butter", "land o lakes"], zoneId: "A31" },
  { name: "heavy cream", aliases: ["whipping cream", "heavy whipping cream", "half and half"], zoneId: "A31" },

  // ── A32 — Meat & Seafood ──
  { name: "bacon", aliases: ["turkey bacon", "thick cut bacon", "bacon bits"], zoneId: "A32" },
  { name: "sausage", aliases: ["breakfast sausage", "italian sausage", "bratwurst", "kielbasa", "jimmy dean sausage", "hot dogs", "frankfurters"], zoneId: "A32" },
  { name: "frozen seafood", aliases: ["frozen shrimp", "fish sticks", "frozen fish", "tilapia", "salmon fillets", "cod", "frozen salmon"], zoneId: "A32" },
  { name: "beef", aliases: ["ground beef", "hamburger", "steak", "roast", "chuck roast", "stew meat", "beef stew", "sirloin", "ribeye", "ground turkey"], zoneId: "A32" },
  { name: "lunch meat", aliases: ["deli meat", "ham", "turkey", "salami", "bologna", "roast beef", "pepperoni", "sliced turkey", "sliced ham"], zoneId: "A32" },
  { name: "chicken", aliases: ["chicken breast", "chicken thighs", "chicken legs", "drumsticks", "whole chicken", "rotisserie chicken", "chicken wings", "boneless skinless chicken"], zoneId: "A32" },
  { name: "pork", aliases: ["pork chops", "pork loin", "pork tenderloin", "pulled pork", "ribs", "baby back ribs", "spare ribs", "pork roast"], zoneId: "A32" },

  // ── A33 — Bakery & Deli ──
  { name: "bakery bread", aliases: ["french bread", "baguette", "artisan bread", "sourdough loaf", "ciabatta"], zoneId: "A33" },
  { name: "bakery items", aliases: ["donuts", "doughnuts", "muffins", "croissants", "danish", "cinnamon rolls", "cupcakes", "birthday cake", "sheet cake"], zoneId: "A33" },
  { name: "deli", aliases: ["deli sandwich", "rotisserie chicken", "deli salad", "fried chicken", "deli cheese", "sliced deli meat"], zoneId: "A33" },
];
