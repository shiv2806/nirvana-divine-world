// ============================================================
//  PRODUCTS DATA — Single source of truth for the entire app
//
//  HOW TO ADD A NEW PRODUCT:
//  1. Copy the last product object and paste below it
//  2. Increment the `id` (must be unique)
//  3. Fill in all fields
//  4. Set `photo` to the image filename in /public/images/
//     e.g.  photo: 'images/my-product.jpg'
//  5. Set `photos` array for the thumbnail strip in the modal
//
//  HOW TO ADD A NEW CATEGORY:
//  1. Set the `cat` field to your new category slug (e.g. 'floral')
//  2. In ShopPage.jsx, add a filter button for the new category
//     e.g. { label: 'Floral', value: 'floral' }
//
//  BADGE OPTIONS: 'Bestseller' | 'New' | 'Premium' | 'Temple Grade' | 'Gift' | ''
//  BG OPTIONS:    'bg1' through 'bg8'  (gradient fallback when no photo)
// ============================================================

export const PRODUCTS = [
  // ── Product 1 ────────────────────────────────────────────
  // 200g Products
  {
    id: 1,
    name: "Govinda — Premium Incense",
    cat: "devotional", // used for filter buttons in Shop
    price: 199,
    originalPrice: 249, // null = no strikethrough price shown
    badge: "Premium",
    desc: "Premium incense blend crafted for Lord Govinda — rich, deep and long-lasting fragrance.",
    longDesc:
      "Our Govinda Premium Incense is a luxurious blend of rare resins, sandalwood and sacred herbs specially formulated for devotional practice. Each stick burns slowly for over an hour, releasing a deep, enveloping fragrance that transforms any space into a sacred sanctuary. Offered with love and devotion.",
    photo: "images/govinda.jpeg",
    photos: ["images/govinda.jpeg", "images/govinda.jpeg"],
    emoji: "✨",
    bg: "bg5",
    sticks: "100+ sticks",
    weight: "200g",
    burn: "~60 min/stick",
    scent: "Deep · Resinous · Sacred",
    rating: "5.0",
    reviews: "142 reviews",
  },

  // ── Product 2 ────────────────────────────────────────────
  {
    id: 2,
    name: "Jagannath — Puri Temple",
    cat: "temple",
    price: 199,
    originalPrice: 249,
    badge: "Temple Grade",
    desc: "Temple-grade incense inspired by the sacred Puri Jagannath tradition. Pure and divine.",
    longDesc:
      "Inspired by the sacred incense traditions of the Jagannath Temple in Puri, this blend uses sandalwood, camphor and rare temple herbs that have been used in puja for centuries. The fragrance is clean, powerful and immediately evokes the atmosphere of a grand temple. Ideal for deep devotional practice and daily puja.",
    photo: "images/jaganath.jpeg",
    photos: ["images/jaganath.jpeg", "images/jaganath.jpeg"],
    emoji: "🛕",
    bg: "bg1",
    sticks: "100+ sticks",
    weight: "200g",
    burn: "~50 min/stick",
    scent: "Camphor · Sandalwood · Temple",
    rating: "4.9",
    reviews: "98 reviews",
  },

  // ── Product 3 ────────────────────────────────────────────
  {
    id: 3,
    name: "Radha Krishna — Kadamba",
    cat: "devotional",
    price: 199,
    originalPrice: 249,
    badge: "Bestseller",
    desc: "Kadamba flower fragrance — the sacred scent associated with Radha and Krishna.",
    longDesc:
      "Kadamba is the most beloved flower in the Vaishnava tradition, deeply associated with the divine love of Radha and Krishna. This pure kadamba incense evokes the sacred groves of Vrindavan, filling your space with a soft, sweet, devotional fragrance. Beloved by devotees across India for morning and evening puja.",
    photo: "images/krishna.jpeg",
    photos: ["images/krishna.jpeg", "images/krishna.jpeg"],
    emoji: "🌸",
    bg: "bg4",
    sticks: "100+ sticks",
    weight: "200g",
    burn: "~45 min/stick",
    scent: "Floral · Sweet · Devotional",
    rating: "4.9",
    reviews: "203 reviews",
  },

  // ── Product 4 ────────────────────────────────────────────
  {
    id: 4,
    name: "Prahlad — Strength & Devotion",
    cat: "devotional",
    price: 199,
    originalPrice: 249,
    badge: "New",
    desc: "Bold, grounding fragrance with jasmine and cedar — offered to Lord Hanuman.",
    longDesc:
      "A bold, grounding blend of jasmine, cedarwood, vetiver and sacred herbs formulated for the worship of Lord Prahlad. The fragrance is strong and Devotional — earthy yet uplifting, filling your space with a sense of divine protection and strength. Ideal for Tuesday and Saturday puja.",
    photo: "images/prahlad.jpeg",
    photos: ["images/prahlad.jpeg", "images/prahlad.jpeg"],
    emoji: "🪔",
    bg: "bg2",
    sticks: "100+ sticks",
    weight: "200g",
    burn: "~45 min/stick",
    scent: "Earthy · Jasmine · Protective",
    rating: "4.8",
    reviews: "76 reviews",
  },

  // ── ADD NEW PRODUCTS BELOW THIS LINE ─────────────────────
  // Copy the template above, increment id, fill fields.
  // 100g Products

  {
    id: 5,
    name: "Govinda — Premium Incense",
    cat: "devotional", // used for filter buttons in Shop
    price: 99,
    originalPrice: 149, // null = no strikethrough price shown
    badge: "Premium",
    desc: "Premium incense blend crafted for Lord Govinda — rich, deep and long-lasting fragrance.",
    longDesc:
      "Our Govinda Premium Incense is a luxurious blend of rare resins, sandalwood and sacred herbs specially formulated for devotional practice. Each stick burns slowly for over an hour, releasing a deep, enveloping fragrance that transforms any space into a sacred sanctuary. Offered with love and devotion.",
    photo: "images/govinda.jpeg",
    photos: ["images/govinda.jpeg", "images/govinda.jpeg"],
    emoji: "✨",
    bg: "bg5",
    sticks: "50+ sticks",
    weight: "100g",
    burn: "~60 min/stick",
    scent: "Deep · Resinous · Sacred",
    rating: "5.0",
    reviews: "142 reviews",
  },

  // ── Product 2 ────────────────────────────────────────────
  {
    id: 6,
    name: "Jagannath — Puri Temple",
    cat: "temple",
    price: 99,
    originalPrice: 149,
    badge: "Temple Grade",
    desc: "Temple-grade incense inspired by the sacred Puri Jagannath tradition. Pure and divine.",
    longDesc:
      "Inspired by the sacred incense traditions of the Jagannath Temple in Puri, this blend uses sandalwood, camphor and rare temple herbs that have been used in puja for centuries. The fragrance is clean, powerful and immediately evokes the atmosphere of a grand temple. Ideal for deep devotional practice and daily puja.",
    photo: "images/jaganath.jpeg",
    photos: ["images/jaganath.jpeg", "images/jaganath.jpeg"],
    emoji: "🛕",
    bg: "bg1",
    sticks: "50+ sticks",
    weight: "100g",
    burn: "~50 min/stick",
    scent: "Camphor · Sandalwood · Temple",
    rating: "4.4",
    reviews: "98 reviews",
  },

  // ── Product 3 ────────────────────────────────────────────
  {
    id: 7,
    name: "Radha Krishna — Kadamba",
    cat: "devotional",
    price: 99,
    originalPrice: 149,
    badge: "Bestseller",
    desc: "Kadamba flower fragrance — the sacred scent associated with Radha and Krishna.",
    longDesc:
      "Kadamba is the most beloved flower in the Vaishnava tradition, deeply associated with the divine love of Radha and Krishna. This pure kadamba incense evokes the sacred groves of Vrindavan, filling your space with a soft, sweet, devotional fragrance. Beloved by devotees across India for morning and evening puja.",
    photo: "images/krishna.jpeg",
    photos: ["images/krishna.jpeg", "images/krishna.jpeg"],
    emoji: "🌸",
    bg: "bg4",
    sticks: "50+ sticks",
    weight: "100g",
    burn: "~45 min/stick",
    scent: "Floral · Sweet · Devotional",
    rating: "4.1",
    reviews: "203 reviews",
  },

  // ── Product 4 ────────────────────────────────────────────
  {
    id: 8,
    name: "Prahlad — Strength & Devotion",
    cat: "devotional",
    price: 99,
    originalPrice: 149,
    badge: "New",
    desc: "Bold, grounding fragrance with jasmine and cedar — offered to Lord Prahlad.",
    longDesc:
      "A bold, grounding blend of jasmine, cedarwood, vetiver and sacred herbs formulated for the worship of Lord Prahlad. The fragrance is strong and Devotional — earthy yet uplifting, filling your space with a sense of divine protection and strength. Ideal for Tuesday and Saturday puja.",
    photo: "images/prahlad.jpeg",
    photos: ["images/prahlad.jpeg", "images/prahlad.jpeg"],
    emoji: "🪔",
    bg: "bg2",
    sticks: "50+ sticks",
    weight: "100g",
    burn: "~45 min/stick",
    scent: "Earthy · Jasmine · Protective",
    rating: "4.5",
    reviews: "76 reviews",
  },
];

// ── Gradient backgrounds for emoji fallback (no photo) ────────
// Used by ProductCard and ProductModal when product.photo is null
export const BG_GRADIENTS = {
  bg1: "linear-gradient(135deg, #1a0e05, #3d1a08)",
  bg2: "linear-gradient(135deg, #0a1a0a, #1a3a1a)",
  bg3: "linear-gradient(135deg, #0a0a1a, #1a1a3a)",
  bg4: "linear-gradient(135deg, #1a0a10, #3a1020)",
  bg5: "linear-gradient(135deg, #100a1a, #2a1a3a)",
  bg6: "linear-gradient(135deg, #0a1010, #1a2a2a)",
  bg7: "linear-gradient(135deg, #1a1005, #3a2a08)",
  bg8: "linear-gradient(135deg, #1a0505, #3a1010)",
};
