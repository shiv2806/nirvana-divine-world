import { createContext, useContext, useState, useEffect, useCallback } from "react";

// ============================================================
//  CART CONTEXT
//  Provides cart state to every component in the app.
//  Cart is persisted in sessionStorage so it survives page refreshes
//  but clears when the browser tab is closed.
//
//  Usage in any component:
//    const { cart, addToCart, removeFromCart, cartCount, cartTotal } = useCart();
// ============================================================

const CartContext = createContext(null);

// Key used to read/write cart in sessionStorage
const STORAGE_KEY = "ndCart";

function loadCartFromStorage() {
  try {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || "[]");
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCartFromStorage);

  // Persist cart to sessionStorage whenever it changes
  useEffect(() => {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  }, [cart]);

  // Add a product to cart (or increase qty if already in cart)
  const addToCart = useCallback((product, qty = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + qty } : item
        );
      }
      return [...prev, { ...product, qty }];
    });
  }, []);

  // Remove a product completely from cart
  const removeFromCart = useCallback((productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  }, []);

  // Change quantity of an item (+1 or -1); removes if qty reaches 0
  const changeQty = useCallback((productId, delta) => {
    setCart((prev) => {
      const item = prev.find((i) => i.id === productId);
      if (!item) return prev;
      if (item.qty + delta <= 0) return prev.filter((i) => i.id !== productId);
      return prev.map((i) =>
        i.id === productId ? { ...i, qty: i.qty + delta } : i
      );
    });
  }, []);

  // Clear entire cart (used after successful order submission)
  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  // Derived values — computed from cart state
  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, changeQty, clearCart, cartCount, cartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook — throws a helpful error if used outside CartProvider
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
