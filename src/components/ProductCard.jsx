import { useState } from "react";
import { BG_GRADIENTS } from "../data/products";
import { useCart } from "../context/CartContext";

// ============================================================
//  PRODUCT CARD  — Grid card shown in Shop and Home pages
//
//  Props:
//    product   {object}   product from PRODUCTS array
//    onViewDetails {fn}   called when "View Details" is clicked
//                         receives the product object
// ============================================================

// Badge color map — add new badge types here if needed
const BADGE_COLORS = {
  "Bestseller":   { bg: "#c9a84c", text: "#1a0e05" },
  "New":          { bg: "#2d5a27", text: "#d4f7c0" },
  "Premium":      { bg: "#5c1a1a", text: "#f7d4d4" },
  "Temple Grade": { bg: "#1a305c", text: "#d4e4f7" },
  "Gift":         { bg: "#5c1a5a", text: "#f7d4f5" },
};

export default function ProductCard({ product, onViewDetails }) {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const bg = BG_GRADIENTS[product.bg] || BG_GRADIENTS.bg1;
  const badgeStyle = BADGE_COLORS[product.badge];

  function handleAddToCart(e) {
    e.stopPropagation(); // don't trigger card click
    addToCart(product, 1);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div style={styles.card} onClick={() => onViewDetails(product)}>
      {/* Product image or gradient+emoji fallback */}
      <div style={styles.imageWrap}>
        {product.photo ? (
          <img src={product.photo} alt={product.name} style={styles.image} />
        ) : (
          <div style={{ ...styles.imageFallback, background: bg }}>
            <span style={styles.emoji}>{product.emoji}</span>
          </div>
        )}

        {/* Badge overlay */}
        {product.badge && badgeStyle && (
          <span style={{ ...styles.badge, background: badgeStyle.bg, color: badgeStyle.text }}>
            {product.badge}
          </span>
        )}
      </div>

      {/* Card body */}
      <div style={styles.body}>
        <p style={styles.scent}>{product.scent}</p>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.desc}>{product.desc}</p>

        {/* Rating */}
        <div style={styles.ratingRow}>
          <span style={styles.stars}>{"★".repeat(Math.round(parseFloat(product.rating)))}{"☆".repeat(5 - Math.round(parseFloat(product.rating)))}</span>
          <span style={styles.ratingText}>{product.rating} ({product.reviews})</span>
        </div>

        {/* Specs row */}
        <div style={styles.specs}>
          <span style={styles.spec}>{product.sticks}</span>
          <span style={styles.specDivider}>·</span>
          <span style={styles.spec}>{product.weight}</span>
          <span style={styles.specDivider}>·</span>
          <span style={styles.spec}>{product.burn}</span>
        </div>

        {/* Price + Add to Cart */}
        <div style={styles.priceRow}>
          <div>
            <span style={styles.price}>₹{product.price}</span>
            {product.originalPrice && (
              <span style={styles.originalPrice}>₹{product.originalPrice}</span>
            )}
          </div>
          <button
            onClick={handleAddToCart}
            style={{ ...styles.addBtn, ...(added ? styles.addBtnAdded : {}) }}
          >
            {added ? "✓ Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Styles ───────────────────────────────────────────────────
const styles = {
  card: {
    background: "white", cursor: "pointer",
    transition: "transform 0.3s, box-shadow 0.3s",
    boxShadow: "0 2px 20px rgba(58,37,16,0.08)",
    display: "flex", flexDirection: "column",
  },
  imageWrap: { position: "relative", height: 240, overflow: "hidden" },
  image: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s" },
  imageFallback: {
    width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
  },
  emoji: { fontSize: "4rem" },
  badge: {
    position: "absolute", top: 12, left: 12,
    padding: "3px 10px", fontSize: "0.6rem", letterSpacing: "0.15em",
    textTransform: "uppercase", fontWeight: 500,
  },
  body: { padding: "1.5rem", flex: 1, display: "flex", flexDirection: "column", gap: "0.5rem" },
  scent: {
    fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase",
    color: "var(--gold)", fontFamily: "'Jost', sans-serif",
  },
  name: {
    fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem",
    fontWeight: 600, color: "var(--deep)",
  },
  desc: { fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.6, flex: 1 },
  ratingRow: { display: "flex", alignItems: "center", gap: "0.5rem" },
  stars: { color: "var(--gold)", fontSize: "0.75rem" },
  ratingText: { fontSize: "0.72rem", color: "var(--muted)" },
  specs: {
    display: "flex", gap: "0.4rem", fontSize: "0.7rem",
    color: "var(--muted)", flexWrap: "wrap",
  },
  spec: {},
  specDivider: { color: "rgba(138,112,96,0.4)" },
  priceRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "0.5rem" },
  price: {
    fontFamily: "'Cinzel Decorative', serif", color: "var(--gold)", fontSize: "1.1rem",
  },
  originalPrice: {
    fontSize: "0.8rem", color: "var(--muted)", textDecoration: "line-through", marginLeft: 6,
  },
  addBtn: {
    background: "var(--deep)", color: "var(--gold)", border: "none",
    padding: "0.6rem 1.2rem", cursor: "pointer", fontFamily: "'Jost', sans-serif",
    fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase",
    transition: "all 0.3s",
  },
  addBtnAdded: { background: "var(--maroon)" },
};
