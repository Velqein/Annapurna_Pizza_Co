import { PIZZA_IMAGES, ADDON_IMAGES } from "../assets/pizzas/index.js";

// ── VEG PIZZAS ────────────────────────────────────────────────────────────────
export const VEG_PIZZAS = [
  { id:1,  num:"01", name:"Margarita Pizza",        badge:"BESTSELLER", desc:"Classic delight with 100% real mozzarella",         price:139, nameColor:"#4E6B2A", toppings:["#E74C3C","#2D8A3E","#F39C12","#E74C3C","#2D8A3E"], cheeseColor:"#F5D990", sauceColor:"#C0392B", crustColor:"#C8860A", isVeg:true,  img:PIZZA_IMAGES[1]  },
  { id:2,  num:"02", name:"Corn Cheese Pizza",       badge:null,         desc:"Golden corn with melted cheese blend",                price:159, nameColor:"#4E6B2A", toppings:["#F1C40F","#F5D060","#F1C40F","#27AE60","#F5D060"], cheeseColor:"#FFF5A0", sauceColor:"#E8A030", crustColor:"#C8860A", isVeg:true,  img:PIZZA_IMAGES[2]  },
  { id:3,  num:"03", name:"Mushroom Tikka",          badge:null,         desc:"Smoky tikka spiced mushroom topping",                 price:189, nameColor:"#D62828", toppings:["#7D4E1F","#9B6B3A","#7D4E1F","#F39C12","#9B6B3A"], cheeseColor:"#F5E090", sauceColor:"#C8400A", crustColor:"#B87A08", isVeg:true,  img:PIZZA_IMAGES[3]  },
  { id:4,  num:"04", name:"Classic Onion Mushroom",  badge:null,         desc:"Caramelized onions & earthy mushrooms",               price:189, nameColor:"#4E6B2A", toppings:["#8E44AD","#7D4E1F","#8E44AD","#7D4E1F","#C0A0C8"], cheeseColor:"#F5E090", sauceColor:"#A93226", crustColor:"#B87A08", isVeg:true,  img:PIZZA_IMAGES[4]  },
  { id:5,  num:"05", name:"BBQ Paneer",              badge:null,         desc:"Barbeque sauce marination with soft paneer",          price:189, nameColor:"#D62828", toppings:["#F5DEB3","#E67E22","#F5DEB3","#E74C3C","#F5DEB3"], cheeseColor:"#F5E090", sauceColor:"#7D3A00", crustColor:"#C8860A", isVeg:true,  img:PIZZA_IMAGES[5]  },
  { id:6,  num:"06", name:"Farm Fresh Pizza",        badge:null,         desc:"Exotic vegetable topping on handmade dough",          price:199, nameColor:"#4E6B2A", toppings:["#27AE60","#F39C12","#2ECC71","#8E44AD","#27AE60"], cheeseColor:"#F0D070", sauceColor:"#A93226", crustColor:"#B87A08", isVeg:true,  img:PIZZA_IMAGES[6]  },
  { id:7,  num:"07", name:"Paneer Tikka Pizza",      badge:null,         desc:"Tikka spiced paneer chunks on golden crust",          price:209, nameColor:"#D62828", toppings:["#F5DEB3","#E67E22","#F5DEB3","#F39C12","#F5DEB3"], cheeseColor:"#FFEAA0", sauceColor:"#C0450A", crustColor:"#C08010", isVeg:true,  img:PIZZA_IMAGES[7]  },
  { id:8,  num:"08", name:"Butter Paneer Pizza",     badge:null,         desc:"Makhni gravy topping with paneer tikka",              price:209, nameColor:"#4E6B2A", toppings:["#F5DEB3","#FF7F50","#F5DEB3","#FF7F50","#F5DEB3"], cheeseColor:"#FFE090", sauceColor:"#E07830", crustColor:"#D49010", isVeg:true,  img:PIZZA_IMAGES[8]  },
  { id:9,  num:"09", name:"Cottage Cheese Veg",      badge:null,         desc:"Vegetable and paneer combo delight",                  price:219, nameColor:"#D62828", toppings:["#F5DEB3","#27AE60","#F39C12","#E74C3C","#F5DEB3"], cheeseColor:"#F5E090", sauceColor:"#CB4335", crustColor:"#C08010", isVeg:true,  img:PIZZA_IMAGES[9]  },
  { id:10, num:"10", name:"Spicy Fire Pizza",        badge:"HOT 🔥",     desc:"Extra spicy with fiery chili toppings",               price:219, nameColor:"#D62828", toppings:["#E74C3C","#C0392B","#F39C12","#E74C3C","#FF6B00"], cheeseColor:"#FFE090", sauceColor:"#A01000", crustColor:"#C08010", isVeg:true,  img:PIZZA_IMAGES[10] },
  { id:11, num:"11", name:"Peri Peri Paneer",        badge:null,         desc:"Tangy peri peri sauce with soft paneer",              price:219, nameColor:"#4E6B2A", toppings:["#FF6B00","#F5DEB3","#FF6B00","#F5DEB3","#E67E22"], cheeseColor:"#F5E090", sauceColor:"#C04010", crustColor:"#C08010", isVeg:true,  img:PIZZA_IMAGES[11] },
  { id:12, num:"12", name:"Kadhai Paneer",           badge:null,         desc:"Kadhai masala spiced paneer & bell peppers",          price:219, nameColor:"#D62828", toppings:["#F5DEB3","#27AE60","#E67E22","#27AE60","#F5DEB3"], cheeseColor:"#F5E090", sauceColor:"#CB4335", crustColor:"#D49010", isVeg:true,  img:PIZZA_IMAGES[12] },
];

// ── NON-VEG PIZZAS ────────────────────────────────────────────────────────────
export const NON_VEG_PIZZAS = [
  { id:13, num:"01", name:"Roasted Chicken Pizza",   badge:null,         desc:"Sautéed chicken pizza with smoky flavor",             price:219, nameColor:"#D62828", toppings:["#8B4513","#A0522D","#8B4513","#E74C3C","#A0522D"], cheeseColor:"#F5D990", sauceColor:"#A93226", crustColor:"#C8860A", isVeg:false, img:PIZZA_IMAGES[13] },
  { id:14, num:"02", name:"Chicken Tikka Pizza",     badge:"POPULAR",    desc:"Classic tikka spiced chicken topping",                price:239, nameColor:"#D62828", toppings:["#D2691E","#FF8C00","#D2691E","#F39C12","#D2691E"], cheeseColor:"#F5E090", sauceColor:"#C0450A", crustColor:"#C08010", isVeg:false, img:PIZZA_IMAGES[14] },
  { id:15, num:"03", name:"Chicken Makhni Pizza",    badge:null,         desc:"Rich makhni gravy with tender chicken",               price:239, nameColor:"#D62828", toppings:["#D2691E","#FF7F50","#D2691E","#FF7F50","#D2691E"], cheeseColor:"#FFE090", sauceColor:"#E07830", crustColor:"#D49010", isVeg:false, img:PIZZA_IMAGES[15] },
  { id:16, num:"04", name:"Chicken Pepperoni",       badge:null,         desc:"Loaded with pepperoni & chicken chunks",              price:239, nameColor:"#D62828", toppings:["#8B0000","#A00000","#8B0000","#D2691E","#8B0000"], cheeseColor:"#F5D990", sauceColor:"#8B0000", crustColor:"#C8860A", isVeg:false, img:PIZZA_IMAGES[16] },
  { id:17, num:"05", name:"Meaty Pizza",             badge:null,         desc:"Sautéed chicken + pepperoni loaded combo",            price:239, nameColor:"#D62828", toppings:["#8B4513","#8B0000","#A0522D","#8B0000","#D2691E"], cheeseColor:"#F5D990", sauceColor:"#8B1A1A", crustColor:"#C8860A", isVeg:false, img:PIZZA_IMAGES[17] },
  { id:18, num:"06", name:"Spicy Chicken Pizza",     badge:null,         desc:"Chicken marinated in spicy sauce",                    price:239, nameColor:"#D62828", toppings:["#D2691E","#E74C3C","#D2691E","#C0392B","#D2691E"], cheeseColor:"#FFE090", sauceColor:"#A01000", crustColor:"#C08010", isVeg:false, img:PIZZA_IMAGES[18] },
  { id:19, num:"07", name:"Paper Barbecue Chicken",  badge:null,         desc:"Rich BBQ marinated chicken on crispy crust",          price:249, nameColor:"#D62828", toppings:["#5C2A00","#8B4513","#5C2A00","#A0522D","#5C2A00"], cheeseColor:"#F5D990", sauceColor:"#3A1A00", crustColor:"#C8860A", isVeg:false, img:PIZZA_IMAGES[19] },
  { id:20, num:"08", name:"Spicy Chicken & Onion",   badge:null,         desc:"Fiery chicken with caramelized onions",               price:249, nameColor:"#D62828", toppings:["#D2691E","#8E44AD","#D2691E","#E74C3C","#8E44AD"], cheeseColor:"#F5E090", sauceColor:"#A01000", crustColor:"#C08010", isVeg:false, img:PIZZA_IMAGES[20] },
  { id:21, num:"09", name:"Peri Peri Chicken",       badge:null,         desc:"Tangy peri peri sauce with juicy chicken",            price:249, nameColor:"#D62828", toppings:["#D2691E","#FF6B00","#D2691E","#FF6B00","#D2691E"], cheeseColor:"#F5E090", sauceColor:"#C04010", crustColor:"#C08010", isVeg:false, img:PIZZA_IMAGES[21] },
  { id:22, num:"10", name:"Kadhai Chicken",          badge:null,         desc:"Kadhai masala spiced chicken delight",                price:249, nameColor:"#D62828", toppings:["#D2691E","#27AE60","#E67E22","#27AE60","#D2691E"], cheeseColor:"#F5E090", sauceColor:"#CB4335", crustColor:"#D49010", isVeg:false, img:PIZZA_IMAGES[22] },
];

// Combined for legacy use
export const PIZZAS = [...VEG_PIZZAS, ...NON_VEG_PIZZAS];

// ── ADD-ONS ───────────────────────────────────────────────────────────────────
export const ADDONS = [
  { name:"Cheese",       price:30, emoji:"🧀", img:ADDON_IMAGES["cheese"],         bg:"linear-gradient(135deg,#FFFBF0,#FFF3CC)", isVeg:true  },
  { name:"Veggies",      price:30, emoji:"🥦", img:null,                            bg:"linear-gradient(135deg,#F2FFF2,#E0F5E0)", isVeg:true  },
  { name:"Paneer",       price:30, emoji:"🫙",  img:ADDON_IMAGES["paneer"],          bg:"linear-gradient(135deg,#FFFFF0,#FFF8CC)", isVeg:true  },
  { name:"Jalapeños",    price:30, emoji:"🌶️", img:ADDON_IMAGES["jalapenos"],       bg:"linear-gradient(135deg,#F2FFF2,#DCFFE0)", isVeg:true  },
  { name:"Olives",       price:30, emoji:"🫒", img:ADDON_IMAGES["olives"],          bg:"linear-gradient(135deg,#F0F8E8,#E4F4D8)", isVeg:true  },
  { name:"Chicken",      price:50, emoji:"🍗",  img:null,                            bg:"linear-gradient(135deg,#FFF5F0,#FFE8D0)", isVeg:false },
  { name:"Cheese Burst", price:70, emoji:"🫧",  img:null,                            bg:"linear-gradient(135deg,#FFFBF0,#FFF0D0)", isVeg:true  },
  { name:"Peri Sauce",   price:20, emoji:"🌶️", img:ADDON_IMAGES["peri peri sauce"], bg:"linear-gradient(135deg,#FFF0F0,#FFE0D0)", isVeg:true  },
];

// ── SIDES ─────────────────────────────────────────────────────────────────────
export const SIDES = [
  { id:1, name:"Garlic Bread", price:170, emoji:"🥖", img:ADDON_IMAGES["garlic bread"] },
];

// ── COMBOS ────────────────────────────────────────────────────────────────────
export const COMBOS = [
  { id:1, name:"4 in 1 Veg Combo",     price:249, isVeg:true,  emoji:"🟢", items:["Corn Cheese","Farm Fresh","Paneer Tikka","Onion Mushroom"]   },
  { id:2, name:"4 in 1 Non-Veg Combo", price:299, isVeg:false, emoji:"🔴", items:["Roasted Chicken","Chicken Tikka","Peri Peri Chicken","Pepperoni"] },
];

export const SPECIALS = [];
