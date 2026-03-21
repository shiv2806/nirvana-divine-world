import { useState } from "react";
import { CartProvider } from "./context/CartContext";
import { RouterProvider, useRouter } from "./context/RouterContext";
import { useToast } from "./hooks/useToast";
import Navbar from "./components/Navbar";
import CartSidebar from "./components/CartSidebar";
import Footer from "./components/Footer";
import Toast from "./components/Toast";
import HomePage from "./pages/HomePage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import CheckoutPage from "./pages/CheckoutPage";

// ============================================================
//  APP  — Root component
//
//  Structure:
//    RouterProvider  → manages hash-based page routing
//    CartProvider    → manages cart state (persisted in sessionStorage)
//      Layout        → Navbar, page content, Footer
//
//  TO ADD A NEW PAGE:
//    1. Create src/pages/YourPage.jsx
//    2. Import it here
//    3. Add a case in the <PageRenderer> switch below
//    4. Add a route in src/context/RouterContext.jsx
//    5. Add a nav link in src/components/Navbar.jsx
// ============================================================

export default function App() {
  return (
    <RouterProvider>
      <CartProvider>
        <Layout />
      </CartProvider>
    </RouterProvider>
  );
}

// ── Layout — wraps every page with Navbar + Cart + Footer ───
function Layout() {
  const [cartOpen, setCartOpen] = useState(false);
  const { toast, showToast } = useToast();

  return (
    <>
      {/* Google Fonts + CSS variables */}
      <style>{GLOBAL_CSS}</style>

      {/* Fixed navbar */}
      <Navbar onCartOpen={() => setCartOpen(true)} />

      {/* Sliding cart sidebar */}
      <CartSidebar isOpen={cartOpen} onClose={() => setCartOpen(false)} />

      {/* Current page content */}
      <main>
        <PageRenderer />
      </main>

      {/* Footer (not on checkout to keep it clean) */}
      <FooterRenderer />

      {/* Toast notification */}
      <Toast message={toast} />
    </>
  );
}

// ── Renders the active page based on current route ──────────
function PageRenderer() {
  const { page } = useRouter();

  switch (page) {
    case "home":
      return <HomePage />;
    case "shop":
      return <ShopPage />;
    case "about":
      return <AboutPage />;
    case "contact":
      return <ContactPage />;
    case "checkout":
      return <CheckoutPage />;
    default:
      return <HomePage />;
  }
}

// ── Footer is hidden on checkout page ────────────────────────
function FooterRenderer() {
  const { page } = useRouter();
  if (page === "checkout") return null;
  return <Footer />;
}

// ── Global CSS: variables, fonts, resets ─────────────────────
// These are the CSS variables used by all components.
// Change colors here to retheme the entire site.
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Jost:wght@300;400;500&display=swap');

  :root {
    /* ── Brand Colors ── change here to retheme the site */
    --gold:       #c9a84c;
    --gold-light: #e8cb7a;
    --deep:       #1a0e05;   /* dark brown — used for backgrounds */
    --maroon:     #5c1a1a;
    --smoke:      #f5f0e8;   /* warm off-white — light backgrounds */
    --ash:        #2d1f10;
    --text:       #3a2510;
    --muted:      #8a7060;
    --white:      #fdfaf4;   /* body background */
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  html { scroll-behavior: smooth; }

  body {
    font-family: 'Jost', sans-serif;
    background: var(--white);
    color: var(--text);
    overflow-x: hidden;
  }

  /* Keyframe for toast slide-up */
  @keyframes slideUp {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* Product card hover lift effect */
  .product-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(58,37,16,0.15) !important;
  }

  /* Scrollbar styling */
  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--smoke); }
  ::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.4); }

  /* ── Mobile Responsiveness ── */
  @media (max-width: 768px) {

    /* ─ Navbar: reorganize for mobile ─ */
    nav {
      justify-content: flex-start !important;
      gap: 0.5rem !important;
    }

    /* Cart button on the left */
    .cart-btn {
      order: 1;
      padding: 6px 10px !important;
      font-size: 0.65rem !important;
      margin-right: auto;
    }

    /* Logo in the center */
    nav > button:nth-of-type(2) {
      order: 2;
      flex: 1;
      text-align: center;
    }

    /* Hamburger on the right */
    .hamburger-btn {
      order: 3;
      margin-left: auto;
    }

    /* ─ Navbar: hide desktop nav links ─ */
    .nav-links-desktop { display: none !important; }

    /* ─ All major 2-column page grids → 1 column ─ */
    .about-section,
    .story-section,
    .checkout-layout,
    .contact-layout {
      grid-template-columns: 1fr !important;
      gap: 2rem !important;
      padding: 3rem 5% !important;
    }

    /* ─ Footer 3-col → 1-col ─ */
    .footer-grid {
      grid-template-columns: 1fr !important;
      gap: 2rem !important;
    }

    /* ─ Footer bottom row: stack ─ */
    .footer-bottom {
      flex-direction: column !important;
      gap: 0.5rem !important;
    }

    /* ─ Checkout form: 2-col → 1-col ─ */
    .form-grid-2col {
      grid-template-columns: 1fr !important;
    }

    /* ─ Order summary: remove sticky ─ */
    .order-summary {
      position: static !important;
    }

    /* ─ Product modal layout: stack vertically ─ */
    .modal-layout {
      grid-template-columns: 1fr !important;
    }

    /* ─ Stats row: wrap on mobile ─ */
    .stats-row {
      gap: 1.5rem !important;
      flex-wrap: wrap !important;
    }

    /* ─ Hero CTA: stack buttons vertically ─ */
    .hero-cta {
      flex-direction: column !important;
      align-items: center !important;
      gap: 1rem !important;
    }

    /* ─ Mandala circle: smaller on mobile ─ */
    .mandala-circle {
      width: 120px !important;
      height: 120px !important;
    }
  }

  @media (max-width: 480px) {
    .about-section,
    .story-section,
    .contact-layout {
      padding-top: 2rem !important;
      padding-bottom: 2rem !important;
    }

    .form-grid-2col {
      grid-template-columns: 1fr !important;
    }
  }
`;
