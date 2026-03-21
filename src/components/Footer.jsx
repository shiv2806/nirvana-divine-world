import { useRouter } from "../context/RouterContext";

// ============================================================
//  FOOTER  — Shared footer on every page
// ============================================================

export default function Footer() {
  const { navigate } = useRouter();

  return (
    <footer style={styles.footer}>
      <div style={styles.grid} className="footer-grid">
        {/* Brand column */}
        <div>
          <div style={styles.brandName}>NirvanaDivine World</div>
          <div style={styles.tagline}>Where Fragrance Meets the Divine</div>
          <p style={styles.brandDesc}>
            Premium natural agarbatti and spiritual products, handcrafted with
            love and rooted in Vedic traditions.
          </p>
        </div>

        {/* Navigate column */}
        <div>
          <h4 style={styles.colHeading}>Navigate</h4>
          <ul style={styles.list}>
            {["home","shop","about","contact"].map((p) => (
              <li key={p}>
                <button onClick={() => navigate(p)} style={styles.listLink}>
                  {p.charAt(0).toUpperCase() + p.slice(1)}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Collections column — update as you add categories */}
        <div>
          <h4 style={styles.colHeading}>Collections</h4>
          <ul style={styles.list}>
            <li><button onClick={() => navigate("shop")} style={styles.listLink}>Devotional</button></li>
            <li><button onClick={() => navigate("shop")} style={styles.listLink}>Temple Grade</button></li>
            {/* Add new collection links here */}
          </ul>
        </div>
      </div>

      <div style={styles.bottom} className="footer-bottom">
        <p style={styles.copyright}>© 2025 NirvanaDivine World. All rights reserved.</p>
        <p style={styles.copyright}>nirvanadivineworld.com</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    background: "var(--deep)", padding: "4rem 5% 2rem",
    borderTop: "1px solid rgba(201,168,76,0.15)",
  },
  grid: {
    display: "grid", gridTemplateColumns: "2fr 1fr 1fr",
    gap: "3rem", marginBottom: "3rem",
  },
  brandName: {
    fontFamily: "'Cinzel Decorative', serif", fontSize: "1rem",
    color: "var(--gold)", marginBottom: "0.5rem",
  },
  tagline: {
    fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
    color: "rgba(245,240,232,0.5)", fontSize: "0.95rem", marginBottom: "1rem",
  },
  brandDesc: {
    fontSize: "0.82rem", color: "rgba(245,240,232,0.4)", lineHeight: 1.7,
  },
  colHeading: {
    fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase",
    color: "var(--gold)", marginBottom: "1.2rem",
  },
  list: { listStyle: "none" },
  listLink: {
    background: "none", border: "none", cursor: "pointer",
    fontSize: "0.85rem", color: "rgba(245,240,232,0.5)",
    textDecoration: "none", transition: "color 0.2s",
    fontFamily: "'Jost', sans-serif", padding: "0.35rem 0", display: "block",
  },
  bottom: {
    borderTop: "1px solid rgba(245,240,232,0.08)", paddingTop: "2rem",
    display: "flex", justifyContent: "space-between",
    flexWrap: "wrap", gap: "1rem",
  },
  copyright: { fontSize: "0.78rem", color: "rgba(245,240,232,0.3)" },
};
