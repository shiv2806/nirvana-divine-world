import { useState } from "react";
import { useRouter } from "../context/RouterContext";
import { useCart } from "../context/CartContext";

// ============================================================
//  NAVBAR  — Fixed top navigation bar
//  Appears on every page. Shows cart item count badge.
// ============================================================

// Nav links config — add new pages here if you expand the site
const NAV_LINKS = [
  { label: "Home", page: "home" },
  { label: "Shop", page: "shop" },
  { label: "About Us", page: "about" },
  { label: "Contact", page: "contact" },
];

export default function Navbar({ onCartOpen }) {
  const { page, navigate } = useRouter();
  const { cartCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav style={styles.nav}>
      {/* Cart button - positioned first for mobile */}
      <button onClick={onCartOpen} style={styles.cartBtn} className="cart-btn">
        🛒 Cart
        {cartCount > 0 && <span style={styles.cartBadge}>{cartCount}</span>}
      </button>

      {/* Brand logo */}
      <button onClick={() => navigate("home")} style={styles.logo}>
        NirvanaDivine
        <span style={styles.logoSub}>World — Premium Agarbatti</span>
      </button>

      {/* Desktop navigation links */}
      <ul style={styles.navLinks} className="nav-links-desktop">
        {NAV_LINKS.map((link) => (
          <li key={link.page}>
            <button
              onClick={() => navigate(link.page)}
              style={{
                ...styles.navLink,
                color:
                  page === link.page ? "var(--gold)" : "rgba(245,240,232,0.8)",
              }}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen((v) => !v)}
        style={styles.hamburger}
        aria-label="Toggle menu"
        className="hamburger-btn"
      >
        <span style={styles.bar} />
        <span style={styles.bar} />
        <span style={styles.bar} />
      </button>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <ul style={styles.mobileMenu}>
          {NAV_LINKS.map((link) => (
            <li key={link.page}>
              <button
                onClick={() => {
                  navigate(link.page);
                  setMenuOpen(false);
                }}
                style={styles.mobileLink}
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

// ── Styles ───────────────────────────────────────────────────
const styles = {
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    background: "rgba(26,14,5,0.96)",
    backdropFilter: "blur(12px)",
    borderBottom: "1px solid rgba(201,168,76,0.2)",
    padding: "0 5%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: 70,
    flexWrap: "wrap",
  },
  logo: {
    fontFamily: "'Cinzel Decorative', serif",
    color: "var(--gold)",
    fontSize: "1.1rem",
    letterSpacing: "0.05em",
    background: "none",
    border: "none",
    cursor: "pointer",
    lineHeight: 1.2,
    textAlign: "left",
  },
  logoSub: {
    display: "block",
    fontSize: "0.55rem",
    color: "var(--gold-light)",
    letterSpacing: "0.3em",
    fontFamily: "'Jost', sans-serif",
    fontWeight: 300,
    textTransform: "uppercase",
  },
  navLinks: {
    display: "flex",
    gap: "2rem",
    listStyle: "none",
    // Hide on mobile via media (handled by hamburger)
  },
  navLink: {
    background: "none",
    border: "none",
    cursor: "pointer",
    fontSize: "0.8rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    fontWeight: 400,
    transition: "color 0.3s",
    fontFamily: "'Jost', sans-serif",
  },
  cartBtn: {
    background: "none",
    border: "1px solid var(--gold)",
    color: "var(--gold)",
    padding: "8px 18px",
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.75rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    cursor: "pointer",
    transition: "all 0.3s",
    position: "relative",
    display: "flex",
    alignItems: "center",
  },
  cartBadge: {
    position: "absolute",
    top: -8,
    right: -8,
    background: "var(--maroon)",
    color: "white",
    width: 18,
    height: 18,
    borderRadius: "50%",
    fontSize: "0.65rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  hamburger: {
    display: "flex",
    flexDirection: "column",
    gap: 5,
    cursor: "pointer",
    background: "none",
    border: "none",
    padding: 5,
  },
  bar: {
    width: 22,
    height: 1.5,
    background: "var(--smoke)",
    display: "block",
  },
  mobileMenu: {
    position: "fixed",
    top: 70,
    left: 0,
    right: 0,
    background: "var(--deep)",
    flexDirection: "column",
    padding: "2rem",
    gap: "1.5rem",
    borderTop: "1px solid rgba(201,168,76,0.2)",
    listStyle: "none",
    display: "flex",
  },
  mobileLink: {
    background: "none",
    border: "none",
    color: "rgba(245,240,232,0.8)",
    fontSize: "0.9rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
    cursor: "pointer",
    fontFamily: "'Jost', sans-serif",
  },
};
