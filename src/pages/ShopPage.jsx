import { useState, useMemo } from "react";
import { PRODUCTS } from "../data/products";
import { SHOP_FILTERS } from "../data/siteContent";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

// ============================================================
//  SHOP PAGE  (route: #/shop)
//
//  Features:
//    - Filter by category (buttons from SHOP_FILTERS in siteContent.js)
//    - Sort by price or rating
//    - Product detail modal on click
//
//  TO ADD A NEW CATEGORY FILTER:
//    1. Add to SHOP_FILTERS in src/data/siteContent.js
//    2. Add products with matching `cat` value in products.js
// ============================================================

// Sort options — add more here if needed
const SORT_OPTIONS = [
  { label: "Featured",    value: "default" },
  { label: "Price: Low → High", value: "price-asc" },
  { label: "Price: High → Low", value: "price-desc" },
  { label: "Top Rated",   value: "rating" },
];

export default function ShopPage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("default");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Filter + sort the products whenever inputs change
  const displayedProducts = useMemo(() => {
    let list = activeFilter === "all"
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.cat === activeFilter);

    if (sortBy === "price-asc")  list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "rating")     list = [...list].sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));

    return list;
  }, [activeFilter, sortBy]);

  return (
    <div style={styles.page}>
      {/* Page header */}
      <div style={styles.header}>
        <p style={styles.eyebrow}>Our Collection</p>
        <h1 style={styles.title}>Sacred Fragrances</h1>
        <p style={styles.subtitle}>Pure, handcrafted agarbatti — born from devotion</p>
      </div>

      {/* Filter bar */}
      <div style={styles.filterBar}>
        <div style={styles.filterBtns}>
          {SHOP_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              style={{
                ...styles.filterBtn,
                ...(activeFilter === f.value ? styles.filterBtnActive : {}),
              }}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Sort dropdown */}
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={styles.sortSelect}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Product count */}
      <p style={styles.count}>{displayedProducts.length} product{displayedProducts.length !== 1 ? "s" : ""}</p>

      {/* Products grid */}
      {displayedProducts.length > 0 ? (
        <div style={styles.grid}>
          {displayedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={setSelectedProduct}
            />
          ))}
        </div>
      ) : (
        <div style={styles.empty}>
          <p>No products found in this category.</p>
        </div>
      )}

      {/* Product detail modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}

// ── Styles ───────────────────────────────────────────────────
const styles = {
  page: { minHeight: "100vh", paddingTop: 70, background: "var(--white)" },
  header: {
    background: "linear-gradient(135deg, #1a0e05, #2d1f10)",
    padding: "5rem 5% 4rem", textAlign: "center",
  },
  eyebrow: {
    fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase",
    color: "var(--gold-light)", fontFamily: "'Jost', sans-serif", marginBottom: "1rem",
  },
  title: {
    fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1.5rem,4vw,2.5rem)",
    color: "var(--smoke)", marginBottom: "1rem",
  },
  subtitle: {
    fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
    color: "rgba(245,240,232,0.6)", fontSize: "1.1rem",
  },
  filterBar: {
    padding: "1.5rem 5%", background: "var(--smoke)",
    display: "flex", justifyContent: "space-between",
    alignItems: "center", flexWrap: "wrap", gap: "1rem",
    borderBottom: "1px solid rgba(58,37,16,0.1)",
  },
  filterBtns: { display: "flex", gap: "0.8rem", flexWrap: "wrap" },
  filterBtn: {
    background: "transparent", border: "1px solid rgba(58,37,16,0.2)",
    padding: "0.5rem 1.2rem", cursor: "pointer",
    fontFamily: "'Jost', sans-serif", fontSize: "0.75rem",
    letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--muted)",
    transition: "all 0.25s",
  },
  filterBtnActive: {
    background: "var(--deep)", color: "var(--gold)",
    border: "1px solid var(--deep)",
  },
  sortSelect: {
    background: "white", border: "1px solid rgba(58,37,16,0.2)",
    padding: "0.5rem 1rem", fontFamily: "'Jost', sans-serif",
    fontSize: "0.8rem", color: "var(--text)", cursor: "pointer",
  },
  count: {
    padding: "1rem 5%", fontSize: "0.78rem", letterSpacing: "0.12em",
    textTransform: "uppercase", color: "var(--muted)",
    fontFamily: "'Jost', sans-serif",
  },
  grid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))",
    gap: "2rem", padding: "0 5% 5rem",
  },
  empty: {
    textAlign: "center", padding: "5rem", color: "var(--muted)",
    fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "1.1rem",
  },
};
