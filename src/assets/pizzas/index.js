// ── PIZZA IMAGES ──────────────────────────────────────────────────────────────
import imgMargarita         from "./pizza-margarita.png";
import imgCornCheese        from "./pizza-corn-cheese.png";
import imgMushroom          from "./pizza-mushroom.png";
import imgOnionMushroom     from "./pizza-onion-mushroom.png";
import imgBBQ               from "./pizza-bbq.png";
import imgFarmFresh         from "./pizza-farm-fresh.png";
import imgPaneerTikka       from "./pizza-paneer-tikka.png";
import imgButterPaneer      from "./pizza-butter-paneer.png";
import imgCottageCheese     from "./pizza-cottage-cheese.png";
import imgSpicyFire         from "./pizza-spicy-fire.png";
import imgPeriPeriPaneer    from "./pizza-peri-peri-paneer.png";
import imgKadhaiPaneer      from "./pizza-kadhai-paneer.png";
import imgRoastedChicken    from "./pizza-roasted-chicken.png";
import imgChickenTikka      from "./pizza-chicken-tikka.png";
import imgChickenMakhni     from "./pizza-chicken-makhni.png";
import imgChickenPepperoni  from "./pizza-chicken-pepperoni.png";
import imgMeaty             from "./pizza-meaty.png";
import imgSpicyChicken      from "./pizza-spicy-chicken.png";
import imgPaperBBQChicken   from "./pizza-paper-bbq-chicken.png";
import imgSpicyChickenOnion from "./pizza-spicy-chicken-onion.png";
import imgPeriPeriChicken   from "./pizza-peri-peri-chicken.png";
import imgKadhaiChicken     from "./pizza-kadhai-chicken.png";

// ── ADD-ON / INGREDIENT IMAGES ────────────────────────────────────────────────
import imgCheese            from "./addon-cheese.jpg";
import imgPaneer            from "./addon-paneer.jpg";
import imgJalapenos         from "./addon-jalapenos.jpg";
import imgPeriPeriSauce     from "./addon-peri-peri-sauce.jpg";
import imgOlives            from "./addon-olives.png";
import imgBread             from "./addon-bread.jpg";
import imgGarlicBread       from "./side-garlic-bread.webp";

// ── BANNERS ───────────────────────────────────────────────────────────────────
import imgBannerFeatured    from "./banner-featured.png";

// Map pizza id → image URL (ids match pizzaData.js)
export const PIZZA_IMAGES = {
  1:  imgMargarita,
  2:  imgCornCheese,
  3:  imgMushroom,
  4:  imgOnionMushroom,
  5:  imgBBQ,
  6:  imgFarmFresh,
  7:  imgPaneerTikka,
  8:  imgButterPaneer,
  9:  imgCottageCheese,
  10: imgSpicyFire,
  11: imgPeriPeriPaneer,
  12: imgKadhaiPaneer,
  13: imgRoastedChicken,
  14: imgChickenTikka,
  15: imgChickenMakhni,
  16: imgChickenPepperoni,
  17: imgMeaty,
  18: imgSpicyChicken,
  19: imgPaperBBQChicken,
  20: imgSpicyChickenOnion,
  21: imgPeriPeriChicken,
  22: imgKadhaiChicken,
};

// Add-on images keyed by add-on name (lowercase)
export const ADDON_IMAGES = {
  cheese:         imgCheese,
  paneer:         imgPaneer,
  jalapenos:      imgJalapenos,
  "peri peri sauce": imgPeriPeriSauce,
  olives:         imgOlives,
  bread:          imgBread,
  "garlic bread": imgGarlicBread,
};

export const BANNER_IMAGES = {
  featured: imgBannerFeatured,
};
