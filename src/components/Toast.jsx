// ============================================================
//  TOAST  — Bottom-left notification that auto-dismisses
//
//  Props:
//    message   {string}   text to show (empty = hidden)
// ============================================================

export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div style={styles.toast}>
      {message}
    </div>
  );
}

const styles = {
  toast: {
    position: "fixed", bottom: 30, left: 30, zIndex: 9999,
    background: "var(--deep)", color: "var(--gold)",
    padding: "0.9rem 1.5rem", fontSize: "0.82rem",
    letterSpacing: "0.05em", fontFamily: "'Jost', sans-serif",
    boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
    animation: "slideUp 0.3s ease",
    borderLeft: "3px solid var(--gold)",
  },
};
