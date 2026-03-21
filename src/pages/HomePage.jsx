import { useState } from "react";
import { useRouter } from "../context/RouterContext";
import { PRODUCTS } from "../data/products";
import { FEATURES, TESTIMONIALS } from "../data/siteContent";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";

// ============================================================
//  HOME PAGE  (route: #/)
//
//  Sections:
//    1. Hero
//    2. Feature cards (100% Natural, Vedic, Eco, Delivery)
//    3. Featured products grid (all products from PRODUCTS array)
//    4. About strip
//    5. Testimonials
//    6. CTA banner
// ============================================================

export default function HomePage() {
  const { navigate } = useRouter();
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────── */}
      <section style={styles.hero}>
        <div style={styles.smokeOverlay} />
        <div style={styles.heroContent}>
          <p style={styles.eyebrow}>Handcrafted in India · Since 2026</p>
          <h1 style={styles.heroTitle}>
            Awaken the <span style={styles.heroTitleGold}>Divine</span>
            <br />
            Within
          </h1>
          <p style={styles.heroSubtitle}>
            Pure, natural agarbatti for your sacred spaces
          </p>
          <div style={styles.heroDivider} />
          <div style={styles.heroCta} className="hero-cta">
            <button onClick={() => navigate("shop")} style={styles.btnPrimary}>
              Explore Collection
            </button>
            <button onClick={() => navigate("about")} style={styles.btnOutline}>
              Our Story
            </button>
          </div>
        </div>
        <div style={styles.scrollIndicator}>Scroll</div>
      </section>

      {/* ── 2. FEATURE CARDS ─────────────────────────────── */}
      <section style={styles.features}>
        {FEATURES.map((f) => (
          <div key={f.title} style={styles.featureCard}>
            <div style={styles.featureIcon}>{f.icon}</div>
            <h3 style={styles.featureTitle}>{f.title}</h3>
            <p style={styles.featureDesc}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* ── 3. FEATURED PRODUCTS ─────────────────────────── */}
      <section style={styles.productsSection}>
        <div style={styles.sectionIntro}>
          <p style={styles.eyebrowGold}>Our Products</p>
          <h2 style={styles.sectionTitle}>Sacred Fragrances</h2>
          <p style={styles.sectionSubtitle}>
            Discover our handcrafted collection, born from devotion
          </p>
        </div>
        <div style={styles.productsGrid}>
          {PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onViewDetails={setSelectedProduct}
            />
          ))}
        </div>
        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <button onClick={() => navigate("shop")} style={styles.btnPrimary}>
            View All Products
          </button>
        </div>
      </section>

      {/* ── 4. ABOUT STRIP ───────────────────────────────── */}
      <div style={styles.aboutSection} className="about-section">
        <div style={styles.aboutVisual}>
          <div style={styles.mandala}>✦</div>
          <span style={styles.aboutLabel}>NirvanaDivine World</span>
        </div>
        <div style={styles.aboutText}>
          <p style={styles.eyebrowGold}>Our Journey</p>
          <h2 style={styles.sectionTitle}>
            Born from Faith, Crafted with Love
          </h2>
          <p style={styles.aboutPara}>
            NirvanaDivine World was founded with a singular vision — to bring
            the ancient art of agarbatti making back to its pure, spiritual
            roots. Every stick is a prayer, every fragrance a bridge between the
            earthly and the divine.
          </p>
          <p style={styles.aboutPara}>
            We work with master artisans who have passed down their craft
            through generations, using only the finest natural ingredients
            sourced sustainably across India.
          </p>
          <div style={styles.statsRow} className="stats-row">
            {[
              ["4+", "Fragrances"],
              ["10K+", "Happy Devotees"],
              ["100%", "Natural"],
            ].map(([num, label]) => (
              <div key={label} style={styles.stat}>
                <div style={styles.statNum}>{num}</div>
                <div style={styles.statLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── 5. TESTIMONIALS ─────────────────────────────── */}
      <section style={styles.testimonialsSection}>
        <div style={styles.sectionIntro}>
          <p style={styles.eyebrowGold}>Devotees Speak</p>
          <h2 style={styles.sectionTitle}>What Our Community Says</h2>
          <p style={styles.sectionSubtitle}>
            Voices of devotion from across India
          </p>
        </div>
        <div style={styles.testimonialsGrid}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} style={styles.tCard}>
              <div style={styles.tStars}>{"★".repeat(t.stars)}</div>
              <p style={styles.tText}>"{t.text}"</p>
              <span style={styles.tName}>— {t.author}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── 6. CTA BANNER ───────────────────────────────── */}
      <div style={styles.ctaBanner}>
        <h2 style={styles.ctaTitle}>Begin Your Sacred Journey</h2>
        <p style={styles.ctaSub}>
          Transform your home into a temple of peace and positivity
        </p>
        <button onClick={() => navigate("shop")} style={styles.btnPrimary}>
          Shop Now
        </button>
      </div>

      {/* Product detail modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}

// ── Styles ───────────────────────────────────────────────────
const styles = {
  hero: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #1a0e05 0%, #2d1f10 40%, #1a0e05 100%)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    textAlign: "center",
  },
  smokeOverlay: {
    position: "absolute",
    inset: 0,
    opacity: 0.04,
    backgroundImage:
      "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
    backgroundSize: "40px 40px",
  },
  heroContent: { position: "relative", zIndex: 1, padding: "0 5%" },
  eyebrow: {
    fontSize: "0.65rem",
    letterSpacing: "0.4em",
    textTransform: "uppercase",
    color: "var(--gold-light)",
    fontFamily: "'Jost', sans-serif",
    marginBottom: "1.5rem",
  },
  eyebrowGold: {
    fontSize: "0.65rem",
    letterSpacing: "0.4em",
    textTransform: "uppercase",
    color: "var(--gold)",
    fontFamily: "'Jost', sans-serif",
    marginBottom: "0.8rem",
  },
  heroTitle: {
    fontFamily: "'Cinzel Decorative', serif",
    fontSize: "clamp(2.5rem,6vw,4.5rem)",
    color: "var(--smoke)",
    lineHeight: 1.15,
    marginBottom: "1.5rem",
  },
  heroTitleGold: { color: "var(--gold)" },
  heroSubtitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    fontSize: "1.3rem",
    color: "rgba(245,240,232,0.7)",
    marginBottom: "2rem",
  },
  heroDivider: {
    width: 60,
    height: 1,
    background: "var(--gold)",
    margin: "0 auto 2.5rem",
  },
  heroCta: {
    display: "flex",
    gap: "1.5rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  btnPrimary: {
    background: "var(--gold)",
    color: "var(--deep)",
    border: "none",
    padding: "1rem 2.5rem",
    cursor: "pointer",
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontWeight: 500,
    transition: "all 0.3s",
  },
  btnOutline: {
    background: "transparent",
    color: "var(--gold)",
    border: "1px solid var(--gold)",
    padding: "1rem 2.5rem",
    cursor: "pointer",
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.75rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
  },
  scrollIndicator: {
    position: "absolute",
    bottom: 30,
    left: "50%",
    transform: "translateX(-50%)",
    fontSize: "0.6rem",
    letterSpacing: "0.4em",
    textTransform: "uppercase",
    color: "rgba(201,168,76,0.5)",
  },
  features: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
    background: "var(--smoke)",
    padding: "4rem 5%",
    gap: "2rem",
  },
  featureCard: { textAlign: "center", padding: "2rem 1rem" },
  featureIcon: { fontSize: "2.5rem", marginBottom: "1rem" },
  featureTitle: {
    fontFamily: "'Cinzel Decorative', serif",
    fontSize: "0.85rem",
    color: "var(--deep)",
    letterSpacing: "0.05em",
    marginBottom: "1rem",
  },
  featureDesc: { fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7 },
  productsSection: { padding: "5rem 5%", background: "white" },
  sectionIntro: { textAlign: "center", marginBottom: "3rem" },
  sectionTitle: {
    fontFamily: "'Cinzel Decorative', serif",
    fontSize: "clamp(1.3rem,3vw,2rem)",
    color: "var(--deep)",
    marginBottom: "1rem",
  },
  sectionSubtitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    fontSize: "1.1rem",
    color: "var(--muted)",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))",
    gap: "2rem",
  },
  aboutSection: {
    display: "grid",
    gridTemplateColumns: "1fr 2fr",
    background: "var(--deep)",
    padding: "5rem 5%",
    gap: "5rem",
    alignItems: "center",
  },
  aboutVisual: { textAlign: "center" },
  mandala: {
    fontSize: "8rem",
    color: "var(--gold)",
    opacity: 0.3,
    lineHeight: 1,
    display: "block",
    marginBottom: "1rem",
  },
  aboutLabel: {
    fontFamily: "'Cinzel Decorative', serif",
    color: "var(--gold)",
    fontSize: "0.7rem",
    letterSpacing: "0.15em",
    display: "block",
  },
  aboutText: {},
  aboutPara: {
    fontFamily: "'Cormorant Garamond', serif",
    color: "rgba(245,240,232,0.7)",
    fontSize: "1.05rem",
    lineHeight: 1.9,
    marginBottom: "1.2rem",
  },
  statsRow: { display: "flex", gap: "3rem", marginTop: "2rem" },
  stat: {},
  statNum: {
    fontFamily: "'Cinzel Decorative', serif",
    color: "var(--gold)",
    fontSize: "1.8rem",
  },
  statLabel: {
    fontSize: "0.7rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "rgba(245,240,232,0.4)",
    marginTop: 4,
  },
  testimonialsSection: { padding: "5rem 5%", background: "var(--smoke)" },
  testimonialsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px,1fr))",
    gap: "2rem",
    marginTop: "3rem",
  },
  tCard: {
    background: "white",
    padding: "2.5rem",
    borderTop: "3px solid var(--gold)",
    boxShadow: "0 4px 30px rgba(58,37,16,0.06)",
  },
  tStars: {
    color: "var(--gold)",
    fontSize: "1.1rem",
    marginBottom: "1rem",
    letterSpacing: 2,
  },
  tText: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    fontSize: "1rem",
    color: "var(--text)",
    lineHeight: 1.8,
    marginBottom: "1.5rem",
  },
  tName: { fontSize: "0.75rem", letterSpacing: "0.1em", color: "var(--muted)" },
  ctaBanner: {
    background: "linear-gradient(135deg, #1a0e05, #2d1f10)",
    padding: "5rem 5%",
    textAlign: "center",
    borderTop: "1px solid rgba(201,168,76,0.2)",
  },
  ctaTitle: {
    fontFamily: "'Cinzel Decorative', serif",
    color: "var(--smoke)",
    fontSize: "clamp(1.3rem,3vw,2rem)",
    marginBottom: "1rem",
  },
  ctaSub: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    color: "rgba(245,240,232,0.6)",
    fontSize: "1.1rem",
    marginBottom: "2.5rem",
  },
};
