import { useState } from "react";
import { BG_GRADIENTS } from "../data/products";
import { useCart } from "../context/CartContext";

// ============================================================
//  PRODUCT MODAL  — Detail popup shown when you click a product
//
//  Props:
//    product   {object|null}   product to show (null = hidden)
//    onClose   {fn}            called to close the modal
// ============================================================

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart();
  const [qty, setQty] = useState(1);
  const [activePhoto, setActivePhoto] = useState(0);
  const [added, setAdded] = useState(false);
  const [selectedSizeIdx, setSelectedSizeIdx] = useState(0); // Default to first size (100g)

  if (!product) return null;

  const bg = BG_GRADIENTS[product.bg] || BG_GRADIENTS.bg1;
  const allPhotos =
    product.photos?.length > 0 ? product.photos : [product.photo];
  const selectedSize = product.sizes?.[selectedSizeIdx] || product.sizes?.[0];

  function handleAdd() {
    if (selectedSize) {
      addToCart({ ...product, ...selectedSize }, qty);
      setAdded(true);
      setTimeout(() => setAdded(false), 1500);
    }
  }

  return (
    <>
      {/* Overlay */}
      <div onClick={onClose} style={styles.overlay} />

      {/* Modal box */}
      <div style={styles.modal}>
        <button onClick={onClose} style={styles.closeBtn}>
          ✕
        </button>

        <div style={styles.layout} className="modal-layout">
          {/* Left: image + thumbnails */}
          <div style={styles.imageSection}>
            <div style={styles.mainImageWrap}>
              {product.photo ? (
                <img
                  src={allPhotos[activePhoto] || product.photo}
                  alt={product.name}
                  style={styles.mainImage}
                />
              ) : (
                <div style={{ ...styles.imageFallback, background: bg }}>
                  <span style={{ fontSize: "5rem" }}>{product.emoji}</span>
                </div>
              )}
            </div>

            {/* Thumbnail strip — only show if multiple photos */}
            {allPhotos.length > 1 && (
              <div style={styles.thumbs}>
                {allPhotos.map((ph, i) => (
                  <button
                    key={i}
                    onClick={() => setActivePhoto(i)}
                    style={{
                      ...styles.thumbBtn,
                      outline:
                        activePhoto === i ? "2px solid var(--gold)" : "none",
                    }}
                  >
                    <img src={ph} alt="" style={styles.thumbImg} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: product info */}
          <div style={styles.infoSection}>
            <p style={styles.scent}>{product.scent}</p>
            <h2 style={styles.name}>{product.name}</h2>

            {/* Size toggle */}
            <div style={styles.sizeToggleGroup}>
              <label style={styles.sizeLabel}>Size</label>
              <div style={styles.sizeToggle}>
                {product.sizes?.map((size, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedSizeIdx(idx)}
                    style={{
                      ...styles.sizeBtn,
                      ...(selectedSizeIdx === idx
                        ? styles.sizeBtnActive
                        : styles.sizeBtnInactive),
                    }}
                  >
                    {size.weight}
                  </button>
                ))}
              </div>
            </div>

            {/* Price */}
            <div style={styles.priceRow}>
              <span style={styles.price}>₹{selectedSize?.price}</span>
              {selectedSize?.originalPrice && (
                <span style={styles.originalPrice}>
                  ₹{selectedSize?.originalPrice}
                </span>
              )}
            </div>

            <p style={styles.longDesc}>{product.longDesc || product.desc}</p>

            {/* Specs grid */}
            <div style={styles.specsGrid}>
              {[
                { label: "Contents", value: selectedSize?.sticks },
                { label: "Weight", value: selectedSize?.weight },
                { label: "Burn Time", value: selectedSize?.burn },
                {
                  label: "Rating",
                  value: `${product.rating} — ${product.reviews}`,
                },
              ].map(({ label, value }) => (
                <div key={label} style={styles.specItem}>
                  <span style={styles.specLabel}>{label}</span>
                  <span style={styles.specValue}>{value}</span>
                </div>
              ))}
            </div>

            {/* Quantity selector + add to cart */}
            <div style={styles.actions}>
              <div style={styles.qtyRow}>
                <button
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  style={styles.qtyBtn}
                >
                  −
                </button>
                <span style={styles.qtyNum}>{qty}</span>
                <button
                  onClick={() => setQty((q) => q + 1)}
                  style={styles.qtyBtn}
                >
                  +
                </button>
              </div>
              <button
                onClick={handleAdd}
                style={{
                  ...styles.addBtn,
                  ...(added ? styles.addBtnAdded : {}),
                }}
              >
                {added ? "✓ Added to Cart" : "Add to Cart"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

// ── Styles ───────────────────────────────────────────────────
const styles = {
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.65)",
    zIndex: 1300,
    backdropFilter: "blur(4px)",
  },
  modal: {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
    background: "var(--white)",
    zIndex: 1400,
    width: "min(900px, 95vw)",
    maxHeight: "90vh",
    overflowY: "auto",
    boxShadow: "0 25px 80px rgba(0,0,0,0.5)",
  },
  closeBtn: {
    position: "absolute",
    top: 15,
    right: 20,
    background: "none",
    border: "none",
    fontSize: "1.3rem",
    cursor: "pointer",
    color: "var(--muted)",
    zIndex: 1,
  },
  layout: { display: "grid", gridTemplateColumns: "1fr 1fr" },
  imageSection: { background: "var(--smoke)" },
  mainImageWrap: { height: 380, overflow: "hidden" },
  mainImage: { width: "100%", height: "100%", objectFit: "cover" },
  imageFallback: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  thumbs: { display: "flex", gap: 6, padding: "10px 15px" },
  thumbBtn: {
    border: "none",
    cursor: "pointer",
    padding: 0,
    borderRadius: 2,
    overflow: "hidden",
  },
  thumbImg: { width: 52, height: 52, objectFit: "cover", display: "block" },
  infoSection: {
    padding: "2.5rem",
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  scent: {
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--gold)",
    fontFamily: "'Jost', sans-serif",
  },
  name: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.5rem",
    fontWeight: 600,
    color: "var(--deep)",
    lineHeight: 1.3,
  },
  sizeToggleGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.75rem",
  },
  sizeLabel: {
    fontSize: "0.7rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "var(--muted)",
    fontWeight: 600,
  },
  sizeToggle: {
    display: "flex",
    gap: "0.8rem",
  },
  sizeBtn: {
    flex: 1,
    padding: "0.85rem 1rem",
    fontSize: "0.8rem",
    fontFamily: "'Jost', sans-serif",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    fontWeight: 600,
    border: "2px solid",
    cursor: "pointer",
    transition: "all 0.3s ease",
    borderRadius: "6px",
  },
  sizeBtnActive: {
    background: "var(--deep)",
    color: "var(--gold)",
    borderColor: "var(--deep)",
    boxShadow: "0 2px 8px rgba(58,37,16,0.2)",
  },
  sizeBtnInactive: {
    background: "rgba(58,37,16,0.05)",
    color: "var(--deep)",
    borderColor: "var(--deep)",
    opacity: 0.7,
  },
  priceRow: { display: "flex", alignItems: "baseline", gap: "0.8rem" },
  price: {
    fontFamily: "'Cinzel Decorative', serif",
    color: "var(--gold)",
    fontSize: "1.4rem",
  },
  originalPrice: {
    color: "var(--muted)",
    textDecoration: "line-through",
    fontSize: "0.95rem",
  },
  longDesc: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1rem",
    color: "var(--text)",
    lineHeight: 1.8,
    fontStyle: "italic",
  },
  specsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "0.8rem",
    padding: "1rem",
    background: "var(--smoke)",
  },
  specItem: { display: "flex", flexDirection: "column", gap: 2 },
  specLabel: {
    fontSize: "0.6rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--muted)",
  },
  specValue: { fontSize: "0.85rem", color: "var(--text)", fontWeight: 500 },
  actions: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    marginTop: "0.5rem",
  },
  qtyRow: { display: "flex", alignItems: "center", gap: 8 },
  qtyBtn: {
    background: "rgba(58,37,16,0.1)",
    border: "none",
    width: 32,
    height: 32,
    cursor: "pointer",
    fontSize: "1.1rem",
  },
  qtyNum: {
    fontSize: "1rem",
    fontWeight: 500,
    minWidth: 24,
    textAlign: "center",
  },
  addBtn: {
    flex: 1,
    background: "var(--deep)",
    color: "var(--gold)",
    border: "none",
    padding: "1rem 1.5rem",
    cursor: "pointer",
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.8rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    transition: "all 0.3s",
  },
  addBtnAdded: { background: "var(--maroon)" },
};
