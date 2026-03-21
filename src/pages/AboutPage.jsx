import { useRouter } from "../context/RouterContext";
import { VALUES, PROCESS_STEPS } from "../data/siteContent";

// ============================================================
//  ABOUT PAGE  (route: #/about)
//
//  Sections:
//    1. Header banner
//    2. Our story (2-column)
//    3. Values grid
//    4. Process timeline
//    5. CTA
// ============================================================

export default function AboutPage() {
  const { navigate } = useRouter();

  return (
    <div style={styles.page}>
      {/* ── 1. HEADER ─────────────────────────────────── */}
      <div style={styles.header}>
        <p style={styles.eyebrow}>Who We Are</p>
        <h1 style={styles.title}>Our Sacred Story</h1>
        <p style={styles.subtitle}>Born from devotion, crafted with love</p>
      </div>

      {/* ── 2. OUR STORY ─────────────────────────────── */}
      <section style={styles.storySection} className="story-section">
        <div style={styles.storyVisual}>
          <div style={styles.mandalaCircle} className="mandala-circle">
            <span style={styles.mandalaSymbol}>ॐ</span>
          </div>
          <p style={styles.storyQuote}>"Every stick is a prayer"</p>
        </div>
        <div style={styles.storyText}>
          <p style={styles.eyebrowGold}>Our Journey</p>
          <h2 style={styles.sectionTitle}>Born from Faith, Crafted with Love</h2>
          <p style={styles.para}>
            NirvanaDivine World was founded with a singular vision — to bring the ancient art of
            agarbatti making back to its pure, spiritual roots. We watched as the market became
            flooded with synthetic, chemical-laden incense that bore no resemblance to the sacred
            traditions of our ancestors.
          </p>
          <p style={styles.para}>
            We set out to change that. Working directly with master artisans who have passed down
            their craft through generations, we revived the old formulations — using only the
            finest natural ingredients sourced sustainably across India.
          </p>
          <p style={styles.para}>
            Today, every NirvanaDivine stick is a bridge between the earthly and the divine.
            A fragrant prayer in your hand.
          </p>
          {/* Stats */}
          <div style={styles.statsRow} className="stats-row">
            {[["2020","Founded"],["4+","Fragrances"],["10K+","Devotees"],["100%","Natural"]].map(([num, label]) => (
              <div key={label} style={styles.stat}>
                <div style={styles.statNum}>{num}</div>
                <div style={styles.statLabel}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. VALUES GRID ─────────────────────────── */}
      <section style={styles.valuesSection}>
        <div style={styles.sectionIntro}>
          <p style={styles.eyebrowGold}>What We Stand For</p>
          <h2 style={styles.sectionTitle}>Our Values</h2>
        </div>
        <div style={styles.valuesGrid}>
          {VALUES.map((v) => (
            <div key={v.title} style={styles.valueCard}>
              <div style={styles.valueIcon}>{v.icon}</div>
              <h3 style={styles.valueTitle}>{v.title}</h3>
              <p style={styles.valueDesc}>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 4. PROCESS TIMELINE ────────────────────── */}
      <section style={styles.processSection}>
        <div style={styles.sectionIntro}>
          <p style={styles.eyebrowLight}>The Craft</p>
          <h2 style={{ ...styles.sectionTitle, color: "var(--smoke)" }}>From Earth to Your Altar</h2>
        </div>
        <div style={styles.processSteps}>
          {PROCESS_STEPS.map((step) => (
            <div key={step.num} style={styles.processStep}>
              <div style={styles.stepNum}>{step.num}</div>
              <div style={styles.stepIcon}>{step.icon}</div>
              <h3 style={styles.stepTitle}>{step.title}</h3>
              <p style={styles.stepDesc}>{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── 5. CTA ─────────────────────────────────── */}
      <div style={styles.ctaBanner}>
        <h2 style={styles.ctaTitle}>Experience the Difference</h2>
        <p style={styles.ctaSub}>Try our collection and feel the purity in every fragrance</p>
        <button onClick={() => navigate("shop")} style={styles.btnPrimary}>Shop Now</button>
      </div>
    </div>
  );
}

// ── Styles ───────────────────────────────────────────────────
const styles = {
  page: { minHeight: "100vh", paddingTop: 70 },
  header: {
    background: "linear-gradient(135deg, #1a0e05, #2d1f10)",
    padding: "5rem 5% 4rem", textAlign: "center",
  },
  eyebrow: {
    fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase",
    color: "var(--gold-light)", fontFamily: "'Jost', sans-serif", marginBottom: "1rem",
  },
  eyebrowGold: {
    fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase",
    color: "var(--gold)", fontFamily: "'Jost', sans-serif", marginBottom: "0.8rem",
  },
  eyebrowLight: {
    fontSize: "0.65rem", letterSpacing: "0.4em", textTransform: "uppercase",
    color: "var(--gold-light)", fontFamily: "'Jost', sans-serif", marginBottom: "0.8rem",
  },
  title: {
    fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1.5rem,4vw,2.5rem)",
    color: "var(--smoke)", marginBottom: "1rem",
  },
  subtitle: {
    fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
    color: "rgba(245,240,232,0.6)", fontSize: "1.1rem",
  },
  storySection: {
    display: "grid", gridTemplateColumns: "1fr 2fr",
    padding: "5rem 5%", gap: "5rem", alignItems: "center",
    background: "var(--white)",
  },
  storyVisual: { textAlign: "center" },
  mandalaCircle: {
    width: 180, height: 180, borderRadius: "50%",
    border: "1px solid rgba(201,168,76,0.3)",
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 1.5rem",
    background: "radial-gradient(circle, rgba(201,168,76,0.05), transparent)",
  },
  mandalaSymbol: { fontFamily: "'Cinzel Decorative', serif", color: "var(--gold)", fontSize: "4rem" },
  storyQuote: {
    fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
    color: "var(--gold)", fontSize: "1rem",
  },
  storyText: {},
  sectionTitle: {
    fontFamily: "'Cinzel Decorative', serif", fontSize: "clamp(1.2rem,3vw,1.8rem)",
    color: "var(--deep)", marginBottom: "1.5rem",
  },
  para: {
    fontFamily: "'Cormorant Garamond', serif", fontSize: "1.05rem",
    color: "var(--text)", lineHeight: 1.9, marginBottom: "1.2rem",
  },
  statsRow: { display: "flex", gap: "2.5rem", marginTop: "2rem", flexWrap: "wrap" },
  stat: {},
  statNum: { fontFamily: "'Cinzel Decorative', serif", color: "var(--gold)", fontSize: "1.6rem" },
  statLabel: { fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginTop: 4 },
  valuesSection: { padding: "5rem 5%", background: "var(--smoke)" },
  sectionIntro: { textAlign: "center", marginBottom: "3rem" },
  valuesGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px,1fr))", gap: "2rem",
  },
  valueCard: {
    background: "white", padding: "2.5rem", textAlign: "center",
    borderBottom: "3px solid var(--gold)",
  },
  valueIcon: { fontSize: "2.5rem", marginBottom: "1rem" },
  valueTitle: {
    fontFamily: "'Cinzel Decorative', serif", fontSize: "0.85rem",
    color: "var(--deep)", letterSpacing: "0.05em", marginBottom: "1rem",
  },
  valueDesc: { fontSize: "0.85rem", color: "var(--muted)", lineHeight: 1.7 },
  processSection: {
    background: "linear-gradient(135deg, #1a0e05, #2d1f10)",
    padding: "5rem 5%",
  },
  processSteps: {
    display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px,1fr))",
    gap: "2rem", marginTop: "3rem",
  },
  processStep: { textAlign: "center", padding: "1.5rem" },
  stepNum: {
    fontFamily: "'Cinzel Decorative', serif", color: "rgba(201,168,76,0.3)",
    fontSize: "2rem", marginBottom: "0.5rem",
  },
  stepIcon: { fontSize: "2rem", marginBottom: "1rem" },
  stepTitle: {
    fontFamily: "'Cinzel Decorative', serif", fontSize: "0.75rem",
    color: "var(--gold)", letterSpacing: "0.1em", marginBottom: "0.8rem",
  },
  stepDesc: { fontSize: "0.8rem", color: "rgba(245,240,232,0.5)", lineHeight: 1.7 },
  ctaBanner: {
    background: "var(--smoke)", padding: "5rem 5%", textAlign: "center",
    borderTop: "1px solid rgba(58,37,16,0.1)",
  },
  ctaTitle: {
    fontFamily: "'Cinzel Decorative', serif", color: "var(--deep)",
    fontSize: "clamp(1.3rem,3vw,2rem)", marginBottom: "1rem",
  },
  ctaSub: {
    fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic",
    color: "var(--muted)", fontSize: "1.1rem", marginBottom: "2.5rem",
  },
  btnPrimary: {
    background: "var(--gold)", color: "var(--deep)", border: "none",
    padding: "1rem 2.5rem", cursor: "pointer", fontFamily: "'Jost', sans-serif",
    fontSize: "0.75rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 500,
  },
};
