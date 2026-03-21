import { useState } from "react";
import { FAQS } from "../data/siteContent";

// ============================================================
//  CONTACT PAGE  (route: #/contact)
//
//  Sections:
//    1. Header
//    2. Contact info cards + form
//    3. FAQ accordion
// ============================================================
const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyf1fUVzAeVJLY0sbCmm7AJV6_iZHzpz9m5XucFmENDLdYLfA1U8lVlnWEGhW4XMwGiBg/exec";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function sendToGoogleSheets() {
    fetch(GOOGLE_SCRIPT_URL, {
      method: "POST",
      body: JSON.stringify(form),
    })
      .then(() => console.log("Saved to Google Sheets"))
      .catch((err) => console.error(err));
  }

  function sendTelegramMessage() {
    const token = "8468776735:AAHQ0qjhPuilkZUvtUUCGLH-xknjm5hg6lA";
    const chatId = "7355538263";

    const message = `New Contact Form:
Name: ${form.name}
Phone: ${form.phone}
Email: ${form.email}
Message: ${form.message}`;

    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
      }),
    })
      .then(() => console.log("Telegram message sent"))
      .catch((err) => console.error(err));
  }

  //   function handleSubmit() {
  //     if (!form.name || !form.message) {
  //       alert("Please fill in your name and message.");
  //       return;
  //     }

  //     // WhatsApp message
  //     const message = `New Contact Form Submission:
  // Name: ${form.name}
  // Phone: ${form.phone}
  // Email: ${form.email}
  // Message: ${form.message}`;

  //     const whatsappNumber = "919392029620"; // <-- CHANGE TO YOUR NUMBER

  //     const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

  //     // Open WhatsApp
  //     window.open(url, "_blank");

  //     // Send to Google Sheets
  //     sendToGoogleSheets();

  //     // Show success UI
  //     setSubmitted(true);
  //   }

  function handleSubmit() {
    if (!form.name || !form.message) {
      alert("Please fill in your name and message.");
      return;
    }

    sendTelegramMessage(); // ✅ Telegram
    sendToGoogleSheets(); // ✅ Google Sheets

    setSubmitted(true);
  }

  return (
    <div style={styles.page}>
      {/* ── 1. HEADER ─────────────────────────────────── */}
      <div style={styles.header}>
        <p style={styles.eyebrow}>Get In Touch</p>
        <h1 style={styles.title}>Contact Us</h1>
        <p style={styles.subtitle}>We would love to hear from you</p>
      </div>

      {/* ── 2. CONTACT SECTION ─────────────────────── */}
      <section style={styles.contactSection} className="contact-layout">
        {/* Info cards */}
        <div style={styles.infoCol}>
          <h2 style={styles.infoTitle}>Reach Us</h2>
          <p style={styles.infoSubtitle}>
            Have questions about our products? Want to place a bulk order for
            your temple? We are here to help.
          </p>

          {[
            {
              icon: "📧",
              label: "Email",
              value:
                "info@nirvanadivineworld.com | nirvanadivineworld@gmail.com",
            },
            { icon: "📞", label: "Phone", value: "+91 93920 29620" },
            { icon: "🕐", label: "Hours", value: "Mon – Sat: 9am – 7pm IST" },
          ].map((item) => (
            <div key={item.label} style={styles.infoCard}>
              <span style={styles.infoIcon}>{item.icon}</span>
              <div>
                <div style={styles.infoLabel}>{item.label}</div>
                <div style={styles.infoValue}>{item.value}</div>
              </div>
            </div>
          ))}

          <div style={styles.noteBox}>
            <p style={styles.noteText}>
              We typically respond within 24 hours. For bulk / temple orders,
              mention your quantity and we'll provide special pricing.
            </p>
          </div>
        </div>

        {/* Contact form */}
        <div style={styles.formCol}>
          {submitted ? (
            <div style={styles.successBox}>
              <div style={styles.successIcon}>🙏</div>
              <h3 style={styles.successTitle}>Thank You!</h3>
              <p style={styles.successText}>
                Your message has been received. We will get back to you within
                24 hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", phone: "", email: "", message: "" });
                }}
                style={styles.btnOutline}
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <div style={styles.form}>
              <h3 style={styles.formTitle}>Send a Message</h3>
              {[
                {
                  name: "name",
                  label: "Full Name *",
                  type: "text",
                  placeholder: "Your name",
                },
                {
                  name: "phone",
                  label: "Phone",
                  type: "tel",
                  placeholder: "+91 XXXXX XXXXX",
                },
                {
                  name: "email",
                  label: "Email",
                  type: "email",
                  placeholder: "your@email.com",
                },
              ].map((field) => (
                <div key={field.name} style={styles.formGroup}>
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
              <div style={styles.formGroup}>
                <label style={styles.label}>Message *</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Tell us what you need…"
                  rows={5}
                  style={styles.textarea}
                />
              </div>
              <button onClick={handleSubmit} style={styles.btnPrimary}>
                Send Message
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ── 3. FAQ ──────────────────────────────────── */}
      <section style={styles.faqSection}>
        <div style={styles.sectionIntro}>
          <p style={styles.eyebrowGold}>Common Questions</p>
          <h2 style={styles.sectionTitle}>FAQ</h2>
        </div>
        <div style={styles.faqList}>
          {FAQS.map((faq, i) => (
            <div key={i} style={styles.faqItem}>
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={styles.faqQuestion}
              >
                <span>{faq.q}</span>
                <span style={styles.faqToggle}>
                  {openFaq === i ? "−" : "+"}
                </span>
              </button>
              {openFaq === i && <div style={styles.faqAnswer}>{faq.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ── Styles ───────────────────────────────────────────────────
const styles = {
  page: { minHeight: "100vh", paddingTop: 70 },
  header: {
    background: "linear-gradient(135deg, #1a0e05, #2d1f10)",
    padding: "5rem 5% 4rem",
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
  eyebrowGold: {
    fontSize: "0.65rem",
    letterSpacing: "0.4em",
    textTransform: "uppercase",
    color: "var(--gold)",
    fontFamily: "'Jost', sans-serif",
    marginBottom: "0.8rem",
  },
  title: {
    fontFamily: "'Cinzel Decorative', serif",
    fontSize: "clamp(1.5rem,4vw,2.5rem)",
    color: "var(--smoke)",
    marginBottom: "1rem",
  },
  subtitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontStyle: "italic",
    color: "rgba(245,240,232,0.6)",
    fontSize: "1.1rem",
  },
  contactSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    padding: "5rem 5%",
    gap: "4rem",
    background: "var(--white)",
  },
  infoCol: {},
  infoTitle: {
    fontFamily: "'Cinzel Decorative', serif",
    fontSize: "1.2rem",
    color: "var(--deep)",
    marginBottom: "1rem",
  },
  infoSubtitle: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1rem",
    color: "var(--muted)",
    lineHeight: 1.8,
    marginBottom: "2rem",
  },
  infoCard: {
    display: "flex",
    gap: "1rem",
    alignItems: "flex-start",
    padding: "1.2rem",
    background: "var(--smoke)",
    marginBottom: "1rem",
    borderLeft: "3px solid var(--gold)",
  },
  infoIcon: { fontSize: "1.4rem", flexShrink: 0 },
  infoLabel: {
    fontSize: "0.6rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: 4,
  },
  infoValue: { fontSize: "0.9rem", color: "var(--text)", fontWeight: 500 },
  noteBox: {
    background: "rgba(201,168,76,0.08)",
    border: "1px solid rgba(201,168,76,0.2)",
    padding: "1.2rem",
    marginTop: "1.5rem",
  },
  noteText: { fontSize: "0.82rem", color: "var(--muted)", lineHeight: 1.7 },
  formCol: {},
  form: { background: "var(--smoke)", padding: "2.5rem" },
  formTitle: {
    fontFamily: "'Cinzel Decorative', serif",
    fontSize: "1rem",
    color: "var(--deep)",
    marginBottom: "2rem",
    letterSpacing: "0.05em",
  },
  formGroup: { marginBottom: "1.5rem" },
  label: {
    display: "block",
    fontSize: "0.65rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    color: "var(--muted)",
    marginBottom: 8,
    fontFamily: "'Jost', sans-serif",
  },
  input: {
    width: "100%",
    padding: "0.9rem 1rem",
    background: "white",
    border: "1px solid rgba(58,37,16,0.15)",
    fontSize: "0.9rem",
    fontFamily: "'Jost', sans-serif",
    color: "var(--text)",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "0.9rem 1rem",
    background: "white",
    border: "1px solid rgba(58,37,16,0.15)",
    fontSize: "0.9rem",
    fontFamily: "'Jost', sans-serif",
    color: "var(--text)",
    resize: "vertical",
    boxSizing: "border-box",
  },
  btnPrimary: {
    background: "var(--deep)",
    color: "var(--gold)",
    border: "none",
    padding: "1rem 2.5rem",
    cursor: "pointer",
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.78rem",
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    transition: "all 0.3s",
    width: "100%",
  },
  btnOutline: {
    background: "transparent",
    color: "var(--gold)",
    border: "1px solid var(--gold)",
    padding: "0.8rem 2rem",
    cursor: "pointer",
    fontFamily: "'Jost', sans-serif",
    fontSize: "0.75rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase",
  },
  successBox: {
    background: "var(--smoke)",
    padding: "3rem",
    textAlign: "center",
    border: "1px solid rgba(201,168,76,0.2)",
  },
  successIcon: { fontSize: "3rem", marginBottom: "1.5rem" },
  successTitle: {
    fontFamily: "'Cinzel Decorative', serif",
    color: "var(--gold)",
    fontSize: "1.2rem",
    marginBottom: "1rem",
  },
  successText: {
    fontFamily: "'Cormorant Garamond', serif",
    color: "var(--muted)",
    fontSize: "1rem",
    lineHeight: 1.8,
    marginBottom: "2rem",
  },
  faqSection: { padding: "5rem 5%", background: "var(--smoke)" },
  sectionIntro: { textAlign: "center", marginBottom: "3rem" },
  sectionTitle: {
    fontFamily: "'Cinzel Decorative', serif",
    fontSize: "clamp(1.2rem,3vw,1.8rem)",
    color: "var(--deep)",
    marginBottom: "1rem",
  },
  faqList: { maxWidth: 750, margin: "0 auto" },
  faqItem: { borderBottom: "1px solid rgba(58,37,16,0.1)", overflow: "hidden" },
  faqQuestion: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "1.3rem 0",
    background: "none",
    border: "none",
    cursor: "pointer",
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "1.05rem",
    color: "var(--text)",
    textAlign: "left",
  },
  faqToggle: {
    color: "var(--gold)",
    fontSize: "1.3rem",
    flexShrink: 0,
    marginLeft: "1rem",
  },
  faqAnswer: {
    padding: "0 0 1.3rem",
    fontSize: "0.88rem",
    color: "var(--muted)",
    lineHeight: 1.8,
    fontFamily: "'Jost', sans-serif",
  },
};
