import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "../context/RouterContext";
import { BG_GRADIENTS } from "../data/products";

// ============================================================
//  CHECKOUT PAGE  (route: #/checkout)
//
//  Reads cart from CartContext.
//  On submit: clears cart and shows confirmation.
//
//  TODO: Connect to real order backend / payment gateway.
// ============================================================

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbzo016YgQ3Lnc2cQwQNULsktHJ4HKQLFXazCc3uUa-N86lzIFrr_aHVMtXLPAqqe1ndDg/exec";

export default function CheckoutPage() {
  const { cart, cartTotal, clearCart } = useCart();
  const { navigate } = useRouter();
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  // Redirect to shop if cart is empty
  if (cart.length === 0 && !submitted) {
    return (
      <div style={styles.emptyPage}>
        <div style={styles.emptyContent}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>🪔</div>
          <h2 style={styles.emptyTitle}>Your cart is empty</h2>
          <p style={styles.emptyText}>Add some products before checking out.</p>
          <button onClick={() => navigate("shop")} style={styles.btnPrimary}>
            Browse Products
          </button>
        </div>
      </div>
    );
  }

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  //CheckOut Google Sheet and Telegram

  function sendTelegramOrder() {
    const token = "8671629262:AAHnimNVmCM6ThFYYReUvnptL9FlJZ2eSZo";
    const chatId = "7355538263";

    const itemsFormatted = cart
      .map(
        (item) =>
          `• ${item.name}\n   Size: ${item.weight} | Qty: ${item.qty} × ₹${item.price} = ₹${item.price * item.qty}`,
      )
      .join("\n");

    const message = `🛒 New Order Received!

👤 Name: ${form.name}
📞 Phone: ${form.phone}
📧 Email: ${form.email}

🏠 Address:
${form.address}, ${form.city} - ${form.pincode}

🧾 Items:
${itemsFormatted}

💰 Total: ₹${cartTotal}

📝 Notes: ${form.notes || "None"}`;

    fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    })
      .then(() => console.log("Telegram order sent"))
      .catch((err) => console.error(err));
  }

  function sendOrderToGoogleSheets() {
    const items = cart
      .map((item) => `${item.name} (${item.weight}, Qty: ${item.qty})`)
      .join(" | ");

    const data = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      address: form.address,
      city: form.city,
      pincode: form.pincode,
      notes: form.notes,
      items: items,
      total: cartTotal,
    };

    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(data),
    })
      .then(() => console.log("Saved to Google Sheets"))
      .catch((err) => console.error(err));
  }

  function handleSubmit() {
    if (
      !form.name ||
      !form.phone ||
      !form.address ||
      !form.city ||
      !form.pincode
    ) {
      alert("Please fill all required fields.");
      return;
    }

    sendOrderToGoogleSheets(); // ✅ Google Sheet
    sendTelegramOrder(); // ✅ Telegram (ADD THIS)

    clearCart();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Order confirmation screen
  if (submitted) {
    return (
      <div style={styles.emptyPage}>
        <div style={styles.successBox}>
          <div style={{ fontSize: "4rem", marginBottom: "1.5rem" }}>🙏</div>
          <h2 style={styles.successTitle}>Order Received!</h2>
          <p style={styles.successText}>
            Thank you for your order, {form.name}. We will confirm your order on{" "}
            <strong>{form.phone}</strong> within 24 hours and share payment
            details.
          </p>
          <div style={styles.successActions}>
            <button onClick={() => navigate("shop")} style={styles.btnPrimary}>
              Continue Shopping
            </button>
            <button onClick={() => navigate("home")} style={styles.btnOutline}>
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  const shipping = cartTotal >= 499 ? 0 : 49;

  return (
    <div style={styles.page}>
      {/* Header */}
      <div style={styles.header}>
        <p style={styles.eyebrow}>Almost there</p>
        <h1 style={styles.title}>Checkout</h1>
      </div>

      <div style={styles.layout} className="checkout-layout">
        {/* ── LEFT: Delivery form ──────────────────── */}
        <div style={styles.formSection}>
          <h2 style={styles.sectionTitle}>Delivery Details</h2>
          <div style={styles.formGrid} className="form-grid-2col">
            {[
              {
                name: "name",
                label: "Full Name *",
                type: "text",
                placeholder: "Your full name",
                full: true,
              },
              {
                name: "phone",
                label: "Phone Number *",
                type: "tel",
                placeholder: "+91 XXXXX XXXXX",
                full: false,
              },
              {
                name: "email",
                label: "Email",
                type: "email",
                placeholder: "your@email.com",
                full: false,
              },
              {
                name: "address",
                label: "Street Address *",
                type: "text",
                placeholder: "House / flat, street",
                full: true,
              },
              {
                name: "city",
                label: "City *",
                type: "text",
                placeholder: "Your city",
                full: false,
              },
              {
                name: "pincode",
                label: "PIN Code *",
                type: "text",
                placeholder: "6-digit PIN",
                full: false,
              },
            ].map((field) => (
              <div
                key={field.name}
                style={{ gridColumn: field.full ? "1 / -1" : "auto" }}
              >
                <label style={styles.label}>{field.label}</label>
                <input
                  type={field.type}
                  name={field.name}
                  value={form[field.name]}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                  style={styles.input}
                />
              </div>
            ))}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={styles.label}>Order Notes (optional)</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                placeholder="Special instructions, preferred delivery time…"
                rows={3}
                style={styles.textarea}
              />
            </div>
          </div>

          {/* Payment notice */}
          <div style={styles.paymentNotice}>
            <p style={styles.paymentTitle}>Payment Information</p>
            <p style={styles.paymentText}>
              This is an enquiry-based checkout. Our team will confirm your
              order and share UPI / bank transfer details within 24 hours on
              your phone number.
            </p>
          </div>
        </div>

        {/* ── RIGHT: Order summary ──────────────────── */}
        <div style={styles.summarySection} className="order-summary">
          <h2 style={styles.sectionTitle}>Order Summary</h2>

          {cart.map((item) => {
            const bg = BG_GRADIENTS[item.bg] || BG_GRADIENTS.bg1;
            return (
              <div key={item.id} style={styles.orderItem}>
                <div style={styles.orderThumb}>
                  {item.photo ? (
                    <img
                      src={item.photo}
                      alt={item.name}
                      style={styles.orderImg}
                    />
                  ) : (
                    <div style={{ ...styles.orderImgFallback, background: bg }}>
                      <span>{item.emoji}</span>
                    </div>
                  )}
                </div>
                <div style={styles.orderInfo}>
                  <p style={styles.orderName}>{item.name}</p>
                  <p style={styles.orderMeta}>
                    Qty: {item.qty} · {item.sticks}
                  </p>
                </div>
                <p style={styles.orderPrice}>₹{item.price * item.qty}</p>
              </div>
            );
          })}

          <div style={styles.divider} />

          {/* Totals */}
          {[
            ["Subtotal", `₹${cartTotal}`],
            ["Shipping", shipping === 0 ? "Free" : `₹${shipping}`],
          ].map(([label, value]) => (
            <div key={label} style={styles.totalRow}>
              <span style={styles.totalLabel}>{label}</span>
              <span style={styles.totalValue}>{value}</span>
            </div>
          ))}
          <div
            style={{
              ...styles.totalRow,
              marginTop: "0.5rem",
              paddingTop: "0.8rem",
              borderTop: "1px solid rgba(58,37,16,0.1)",
            }}
          >
            <span
              style={{
                ...styles.totalLabel,
                color: "var(--deep)",
                fontWeight: 600,
              }}
            >
              Total
            </span>
            <span style={styles.grandTotal}>₹{cartTotal + shipping}</span>
          </div>

          {shipping > 0 && (
            <p style={styles.freeShippingNote}>
              Add ₹{499 - cartTotal} more for free shipping
            </p>
          )}

          <button onClick={handleSubmit} style={styles.submitBtn}>
            Place Order
          </button>

          <button onClick={() => navigate("shop")} style={styles.backBtn}>
            ← Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Styles ───────────────────────────────────────────────────
const styles = {
  page: { minHeight: "100vh", paddingTop: 70, background: "var(--white)" },
  emptyPage: {
    minHeight: "100vh",
    paddingTop: 70,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "var(--smoke)",
  },
  emptyContent: {
    textAlign: "center",
    padding: "3rem",
  },
  header: {
    background: "linear-gradient(135deg, #1a0e05, #2d1f10)",
    padding: "4rem 5% 3rem",
    textAlign: "center",
  },
  eyebrow: {
    fontSize: "0.65rem",
    letterSpacing: "0.4em",
    textTransform: "uppercase",
    color: "var(--gold-light)",
    fontFamily: "'Jost', sans-serif",
    marginBottom: "1rem",
  },
  title: {
    fontFamily: "'Cinzel Decorative', serif",
    fontSize: "2rem",
    color: "var(--smoke)",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1.5fr 1fr",
    gap: "3rem",
    padding: "3rem 5%",
    alignItems: "start",
  },
  formSection: {},
  sectionTitle: {
    fontFamily: "'Cinzel Decorative', serif",
    fontSize: "0.95rem",
    color: "var(--deep)",
    letterSpacing: "0.05em",
    marginBottom: "1.5rem",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1.2rem",
  },
  label: {
    display: "block",
    fontSize: "0.62rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: 6,
    fontFamily: "'Jost', sans-serif",
  },
  input: {
    width: "100%",
    padding: "0.85rem 1rem",
    background: "var(--smoke)",
    border: "1px solid rgba(58,37,16,0.15)",
    fontSize: "0.9rem",
    fontFamily: "'Jost', sans-serif",
    color: "var(--text)",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "0.85rem 1rem",
    background: "var(--smoke)",
    border: "1px solid rgba(58,37,16,0.15)",
    fontSize: "0.9rem",
    fontFamily: "'Jost', sans-serif",
    color: "var(--text)",
    resize: "vertical",
    boxSizing: "border-box",
  },
  paymentNotice: {
    marginTop: "2rem",
    background: "rgba(201,168,76,0.08)",
    border: "1px solid rgba(201,168,76,0.2)",
    padding: "1.2rem",
  },
  paymentTitle: {
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.7rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--gold)",
    marginBottom: 8,
  },
  paymentText: { fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.7 },
  summarySection: {
    background: "var(--smoke)",
    padding: "2rem",
    position: "sticky",
    top: 90,
  },
  orderItem: {
    display: "flex",
    gap: "1rem",
    alignItems: "center",
    padding: "0.8rem 0",
    borderBottom: "1px solid rgba(58,37,16,0.07)",
  },
  orderThumb: { width: 55, height: 55, overflow: "hidden", flexShrink: 0 },
  orderImg: { width: "100%", height: "100%", objectFit: "cover" },
  orderImgFallback: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  orderInfo: { flex: 1 },
  orderName: {
    fontSize: "0.85rem",
    color: "var(--deep)",
    marginBottom: 4,
    fontFamily: "'Cormorant Garamond', serif",
  },
  orderMeta: { fontSize: "0.72rem", color: "var(--muted)" },
  orderPrice: { fontWeight: 600, color: "var(--gold)", fontSize: "0.9rem" },
  divider: { borderTop: "1px solid rgba(58,37,16,0.1)", margin: "1rem 0" },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.6rem",
  },
  totalLabel: {
    fontSize: "0.8rem",
    color: "var(--muted)",
    fontFamily: "'Jost', sans-serif",
  },
  totalValue: { fontSize: "0.85rem", color: "var(--text)" },
  grandTotal: {
    fontFamily: "'Cinzel Decorative', serif",
    color: "var(--gold)",
    fontSize: "1.2rem",
  },
  freeShippingNote: {
    fontSize: "0.72rem",
    color: "var(--gold)",
    textAlign: "center",
    margin: "0.5rem 0 1rem",
    fontFamily: "'Jost', sans-serif",
  },
  submitBtn: {
    width: "100%",
    background: "var(--deep)",
    color: "var(--gold)",
    border: "none",
    padding: "1.1rem",
    cursor: "pointer",
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.8rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    marginTop: "1rem",
    transition: "all 0.3s",
  },
  backBtn: {
    width: "100%",
    background: "transparent",
    color: "var(--muted)",
    border: "1px solid rgba(58,37,16,0.15)",
    padding: "0.7rem",
    cursor: "pointer",
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.72rem",
    letterSpacing: "0.1em",
    marginTop: "0.8rem",
  },
  emptyTitle: {
    fontFamily: "'Cinzel Decorative', serif",
    color: "var(--deep)",
    fontSize: "1.2rem",
    marginBottom: "1rem",
  },
  emptyText: { color: "var(--muted)", marginBottom: "2rem" },
  successBox: {
    textAlign: "center",
    background: "white",
    padding: "4rem 3rem",
    maxWidth: 500,
    boxShadow: "0 4px 40px rgba(0,0,0,0.1)",
  },
  successTitle: {
    fontFamily: "'Cinzel Decorative', serif",
    color: "var(--gold)",
    fontSize: "1.5rem",
    marginBottom: "1.5rem",
  },
  successText: {
    fontFamily: "'Cormorant Garamond', serif",
    color: "var(--text)",
    fontSize: "1.05rem",
    lineHeight: 1.8,
    marginBottom: "2rem",
  },
  successActions: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  btnPrimary: {
    background: "var(--gold)",
    color: "var(--deep)",
    border: "none",
    padding: "0.9rem 2rem",
    cursor: "pointer",
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
  },
  btnOutline: {
    background: "transparent",
    color: "var(--gold)",
    border: "1px solid var(--gold)",
    padding: "0.9rem 2rem",
    cursor: "pointer",
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.75rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
  },
};
