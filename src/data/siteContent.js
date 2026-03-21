// ============================================================
//  SITE CONTENT DATA
//  Static content used across pages (features, testimonials, FAQs…)
//  Easy to edit without touching component code.
// ============================================================

// ── Home page: feature cards (under hero) ─────────────────
export const FEATURES = [
  {
    icon: "🌿",
    title: "100% Natural",
    desc: "Crafted from pure herbs, resins and flowers. No synthetic fragrances or harmful chemicals.",
  },
  {
    icon: "🙏",
    title: "Vedic Traditions",
    desc: "Rooted in ancient Indian rituals, each blend is designed to uplift spirit and purify space.",
  },
  {
    icon: "♻️",
    title: "Eco Conscious",
    desc: "Sustainable sourcing, biodegradable packaging and support for rural artisan communities.",
  },
  {
    icon: "✈️",
    title: "Pan India Delivery",
    desc: "Delivered to your doorstep, carefully packed to preserve the divine fragrance.",
  },
];

// ── Home page: testimonials ────────────────────────────────
export const TESTIMONIALS = [
  {
    stars: 5,
    text: "The Govinda Premium is exactly like the temple agarbatti from my childhood. Pure, divine — takes me straight to God.",
    author: "Lakshmi R., Chennai",
  },
  {
    stars: 5,
    text: "I have tried many agarbattis but NirvanaDivine is different. You can feel the purity. My morning puja is now complete.",
    author: "Rajesh K., Varanasi",
  },
  {
    stars: 5,
    text: "Gifted the Jagannath incense to my mother. She was moved to tears by the fragrance. It truly smells like the temple.",
    author: "Priya M., Mumbai",
  },
];

// ── About page: values ─────────────────────────────────────
export const VALUES = [
  {
    icon: "🙏",
    title: "Devotion",
    desc: "Every product is crafted as an offering — infused with intention and reverence for the sacred.",
  },
  {
    icon: "🌿",
    title: "Purity",
    desc: "No chemicals, no synthetics. Only what nature provides in its purest, most sacred form.",
  },
  {
    icon: "🌍",
    title: "Sustainability",
    desc: "We protect the planet that provides us with these sacred gifts — sustainable sourcing always.",
  },
  {
    icon: "💝",
    title: "Community",
    desc: "Supporting artisan families and their livelihoods — preserving ancient craft for generations.",
  },
];

// ── About page: process steps ──────────────────────────────
export const PROCESS_STEPS = [
  { icon: "🌿", num: "01", title: "Sourcing", desc: "Sustainably harvested herbs, resins and flowers from across India's forests and farms." },
  { icon: "⚗️", num: "02", title: "Blending", desc: "Master blenders follow ancient Vedic formulations — tested, refined and perfected." },
  { icon: "🤲", num: "03", title: "Hand Rolling", desc: "Skilled artisans hand-roll each stick with care and devotional intention." },
  { icon: "☀️", num: "04", title: "Natural Drying", desc: "Air-dried naturally — no artificial heat or chemicals that compromise purity." },
  { icon: "📦", num: "05", title: "To Your Door", desc: "Carefully packed in eco-friendly materials and delivered across India." },
];

// ── Contact page: FAQ ──────────────────────────────────────
export const FAQS = [
  {
    q: "Are your agarbattis truly 100% natural?",
    a: "Yes, absolutely. We use zero synthetic fragrances or chemical binders. Every ingredient is naturally sourced — herbs, resins and essential oils only. We never compromise on this.",
  },
  {
    q: "Do you ship across all of India?",
    a: "Yes! We ship pan-India. Orders above ₹499 receive free shipping. Standard delivery takes 3–7 business days depending on your location.",
  },
  {
    q: "Can I order in bulk for a temple or event?",
    a: "Absolutely. We supply temples, ashrams, yoga centres and events. Contact us directly for bulk pricing on orders above ₹2,000.",
  },
  {
    q: "How do I place an order?",
    a: "Browse our Shop, add products to your cart and submit your enquiry. Our team will confirm within 24 hours and share payment and delivery details.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept UPI, bank transfer and all major payment methods. Our checkout is an enquiry form — our team will share payment details when confirming your order.",
  },
];

// ── Shop page: category filter options ────────────────────
// To add a new category: add an entry here AND add products
// with matching `cat` value in products.js
export const SHOP_FILTERS = [
  { label: "All Products", value: "all" },
  { label: "Devotional",   value: "devotional" },
  { label: "Temple",       value: "temple" },
  // Add more categories here as you expand the catalogue:
  // { label: 'Floral', value: 'floral' },
  // { label: 'Gift Sets', value: 'gift' },
];
