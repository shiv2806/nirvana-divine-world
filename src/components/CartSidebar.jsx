import { useCart } from "../context/CartContext";
import { useRouter } from "../context/RouterContext";
import { BG_GRADIENTS } from "../data/products";

// ============================================================
//  CART SIDEBAR — Slides in from the right
//  Props:
//    isOpen    {boolean}  whether the sidebar is visible
//    onClose   {fn}       called when user closes sidebar
// ============================================================

export default function CartSidebar({ isOpen, onClose }) {
  const { cart, removeFromCart, changeQty, cartTotal, clearCart } = useCart();
  const { navigate } = useRouter();

  function handleCheckout() {
    onClose();
    navigate("checkout");
  }

  return (
    <>
      {/* Overlay — click to close */}
      {isOpen && (
        <div onClick={onClose} style={styles.overlay} />
      )}

      {/* Sidebar panel */}
      <aside style={{ ...styles.sidebar, transform: isOpen ? "translateX(0)" : "translateX(100%)" }}>
        <div style={styles.header}>
          <h3 style={styles.title}>Your Cart</h3>
          <button onClick={onClose} style={styles.closeBtn}>✕</button>
        </div>

        {/* Empty state */}
        {cart.length === 0 ? (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🪔</div>
            <p style={styles.emptyText}>Your cart is empty</p>
            <button onClick={() => { navigate("shop"); onClose(); }} style={styles.shopBtn}>
              Browse Products
            </button>
          </div>
        ) : (
          <>
            {/* Cart items list */}
            <div style={styles.itemsList}>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            {/* Footer: total + actions */}
            <div style={styles.cartFooter}>
              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Total</span>
                <span style={styles.totalAmount}>₹{cartTotal}</span>
              </div>
              <button onClick={handleCheckout} style={styles.checkoutBtn}>
                Proceed to Checkout
              </button>
              <button onClick={clearCart} style={styles.clearBtn}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </aside>
    </>
  );
}

// ── Single cart item row ───────────────────────────────────
function CartItem({ item }) {
  const { removeFromCart, changeQty } = useCart();
  const bg = BG_GRADIENTS[item.bg] || BG_GRADIENTS.bg1;

  return (
    <div style={styles.item}>
      {/* Product thumbnail */}
      <div style={styles.thumb}>
        {item.photo ? (
          <img src={item.photo} alt={item.name} style={styles.thumbImg} />
        ) : (
          <div style={{ ...styles.thumbFallback, background: bg }}>
            <span style={{ fontSize: "1.4rem" }}>{item.emoji}</span>
          </div>
        )}
      </div>

      {/* Product info */}
      <div style={styles.itemInfo}>
        <p style={styles.itemName}>{item.name}</p>
        <p style={styles.itemPrice}>₹{item.price}</p>

        {/* Quantity controls */}
        <div style={styles.qtyRow}>
          <button onClick={() => changeQty(item.id, -1)} style={styles.qtyBtn}>−</button>
          <span style={styles.qtyNum}>{item.qty}</span>
          <button onClick={() => changeQty(item.id, +1)} style={styles.qtyBtn}>+</button>
        </div>
      </div>

      {/* Remove button */}
      <button onClick={() => removeFromCart(item.id)} style={styles.removeBtn} title="Remove">✕</button>
    </div>
  );
}

// ── Styles ───────────────────────────────────────────────────
const styles = {
  overlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)",
    zIndex: 1100, backdropFilter: "blur(2px)",
  },
  sidebar: {
    position: "fixed", top: 0, right: 0, bottom: 0,
    width: "min(420px, 95vw)", background: "var(--white)",
    zIndex: 1200, display: "flex", flexDirection: "column",
    transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
    boxShadow: "-4px 0 40px rgba(0,0,0,0.3)",
  },
  header: {
    display: "flex", justifyContent: "space-between", alignItems: "center",
    padding: "1.5rem", borderBottom: "1px solid rgba(58,37,16,0.1)",
  },
  title: {
    fontFamily: "'Cinzel Decorative', serif", color: "var(--deep)",
    fontSize: "1rem", letterSpacing: "0.05em",
  },
  closeBtn: {
    background: "none", border: "none", fontSize: "1.2rem",
    cursor: "pointer", color: "var(--muted)", padding: 4,
  },
  emptyState: {
    flex: 1, display: "flex", flexDirection: "column",
    alignItems: "center", justifyContent: "center", gap: "1rem", padding: "2rem",
  },
  emptyIcon: { fontSize: "3rem" },
  emptyText: { color: "var(--muted)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" },
  shopBtn: {
    background: "var(--deep)", color: "var(--gold)", border: "none",
    padding: "0.8rem 2rem", cursor: "pointer", fontFamily: "'Jost', sans-serif",
    fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase",
  },
  itemsList: { flex: 1, overflowY: "auto", padding: "1rem 1.5rem" },
  item: {
    display: "flex", gap: "1rem", alignItems: "flex-start",
    padding: "1rem 0", borderBottom: "1px solid rgba(58,37,16,0.08)",
  },
  thumb: { width: 70, height: 70, borderRadius: 4, overflow: "hidden", flexShrink: 0 },
  thumbImg: { width: "100%", height: "100%", objectFit: "cover" },
  thumbFallback: {
    width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center",
  },
  itemInfo: { flex: 1 },
  itemName: { fontFamily: "'Cormorant Garamond', serif", fontSize: "0.95rem", color: "var(--deep)", marginBottom: 4 },
  itemPrice: { color: "var(--gold)", fontWeight: 600, fontSize: "0.9rem", marginBottom: 8 },
  qtyRow: { display: "flex", alignItems: "center", gap: 10 },
  qtyBtn: {
    background: "rgba(58,37,16,0.08)", border: "none", width: 28, height: 28,
    cursor: "pointer", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center",
  },
  qtyNum: { fontSize: "0.9rem", fontWeight: 500, minWidth: 20, textAlign: "center" },
  removeBtn: {
    background: "none", border: "none", color: "var(--muted)", cursor: "pointer",
    fontSize: "0.8rem", padding: 4, flexShrink: 0,
  },
  cartFooter: {
    padding: "1.5rem", borderTop: "1px solid rgba(58,37,16,0.1)", background: "var(--smoke)",
  },
  totalRow: {
    display: "flex", justifyContent: "space-between", marginBottom: "1.2rem",
  },
  totalLabel: { fontFamily: "'Jost', sans-serif", fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase" },
  totalAmount: { fontFamily: "'Cinzel Decorative', serif", color: "var(--gold)", fontSize: "1.2rem" },
  checkoutBtn: {
    width: "100%", background: "var(--deep)", color: "var(--gold)", border: "none",
    padding: "1rem", cursor: "pointer", fontFamily: "'Jost', sans-serif",
    fontSize: "0.8rem", letterSpacing: "0.15em", textTransform: "uppercase",
    marginBottom: "0.8rem", transition: "all 0.3s",
  },
  clearBtn: {
    width: "100%", background: "none", color: "var(--muted)",
    border: "1px solid rgba(58,37,16,0.2)", padding: "0.7rem", cursor: "pointer",
    fontFamily: "'Jost', sans-serif", fontSize: "0.75rem", letterSpacing: "0.1em",
  },
};
