import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

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
    // Create unique key: combine id and weight for proper size distinction
    const uniqueKey = product.weight
      ? `${product.id}-${product.weight}`
      : product.id;

    setCart((prev) => {
      const existing = prev.find((item) => {
        const itemKey = item.weight ? `${item.id}-${item.weight}` : item.id;
        return itemKey === uniqueKey;
      });

      if (existing) {
        return prev.map((item) => {
          const itemKey = item.weight ? `${item.id}-${item.weight}` : item.id;
          return itemKey === uniqueKey
            ? { ...item, qty: item.qty + qty }
            : item;
        });
      }
      return [...prev, { ...product, qty }];
    });
  }, []);

  // Remove a product completely from cart
  const removeFromCart = useCallback((productId, weight = null) => {
    setCart((prev) => {
      if (weight) {
        // If weight is provided, remove specific size variant
        return prev.filter(
          (item) => !(item.id === productId && item.weight === weight),
        );
      }
      // Fallback to ID-only match for backward compatibility
      return prev.filter((item) => item.id !== productId);
    });
  }, []);

  // Change quantity of an item (+1 or -1); removes if qty reaches 0
  const changeQty = useCallback((productId, delta, weight = null) => {
    setCart((prev) => {
      const item = weight
        ? prev.find((i) => i.id === productId && i.weight === weight)
        : prev.find((i) => i.id === productId);

      if (!item) return prev;

      if (item.qty + delta <= 0) {
        return weight
          ? prev.filter((i) => !(i.id === productId && i.weight === weight))
          : prev.filter((i) => i.id !== productId);
      }

      return prev.map((i) => {
        if (weight) {
          return i.id === productId && i.weight === weight
            ? { ...i, qty: i.qty + delta }
            : i;
        }
        return i.id === productId ? { ...i, qty: i.qty + delta } : i;
      });
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
      value={{
        cart,
        addToCart,
        removeFromCart,
        changeQty,
        clearCart,
        cartCount,
        cartTotal,
      }}
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
