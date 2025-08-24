import { createContext, useContext, useState, useEffect } from "react";

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  // state
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cart_items");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  //persist
  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(items));
  }, [items]);

  //helpers
  function addItem(product, qty = 1) {
    const q = Math.max(1, parseInt(qty, 10) || 1);
    setItems(prev => {
      const idx = prev.findIndex(it => it.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + q };
        return copy;
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          imageUrl: product.imageUrl,
          quantity: q,
        },
      ];
    });
  }

  function updateItem(productId, qty) {
    const q = Math.max(0, parseInt(qty, 10) || 0);
    setItems(prev => {
      const idx = prev.findIndex(it => it.id === productId);
      if (idx === -1) return prev;
      if (q === 0) return prev.filter(it => it.id !== productId);
      const copy = [...prev];
      copy[idx] = { ...copy[idx], quantity: q };
      return copy;
    });
  }

  function removeItem(productId) {
    setItems(prev => prev.filter(it => it.id !== productId));
  }

  function clearCart() {
    setItems([]);
  }

  //derived
  const count = items.reduce((n, it) => n + it.quantity, 0);
  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  //single return
  return (
    <CartCtx.Provider
      value={{ items, addItem, updateItem, removeItem, clearCart, count, total }}
    >
      {children}
    </CartCtx.Provider>
  );
}

//hook
export const useCart = () => useContext(CartCtx);
