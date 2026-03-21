import { createContext, useContext, useState, useEffect, useCallback } from "react";

// ============================================================
//  ROUTER CONTEXT  (hash-based, no external library needed)
//
//  Routes map to URL hash: #/ → home, #/shop → shop, etc.
//  This keeps the app as a single-page application without
//  needing react-router-dom or any build configuration.
//
//  Usage in any component:
//    const { page, navigate } = useRouter();
//    navigate('shop');
// ============================================================

// Map of hash paths → page names
// To add a new page: add an entry here and create a page component
const ROUTES = {
  "":         "home",
  "/":        "home",
  "/shop":    "shop",
  "/about":   "about",
  "/contact": "contact",
  "/checkout":"checkout",
};

const RouterContext = createContext(null);

function getPageFromHash() {
  const hash = window.location.hash.replace("#", "");
  return ROUTES[hash] || "home";
}

export function RouterProvider({ children }) {
  const [page, setPage] = useState(getPageFromHash);

  // Listen for browser back/forward navigation
  useEffect(() => {
    const onHashChange = () => setPage(getPageFromHash());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  // Navigate programmatically
  const navigate = useCallback((pageName) => {
    const hash = pageName === "home" ? "#/" : `#/${pageName}`;
    window.location.hash = hash;
    window.scrollTo({ top: 0, behavior: "smooth" });
    setPage(pageName);
  }, []);

  return (
    <RouterContext.Provider value={{ page, navigate }}>
      {children}
    </RouterContext.Provider>
  );
}

export function useRouter() {
  const ctx = useContext(RouterContext);
  if (!ctx) throw new Error("useRouter must be used inside <RouterProvider>");
  return ctx;
}
