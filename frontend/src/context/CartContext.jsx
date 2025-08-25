import { createContext, useContext, useState, useEffect } from "react";

const CartCtx = createContext(null);

export function CartProvider({ children }) {
  //state: cart items, load from localStorage on startup
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cart_items");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  // persist cart changes to localStorage
  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(items));
  }, [items]);

  // add product to cart (or increase quantity if it already exists)
  function addItem(product, qty = 1) {
    const q = Math.max(1, parseInt(qty, 10) || 1);
    setItems(prev => {
      const idx = prev.findIndex(it => it.id === product.id);
      if (idx >= 0) {
        // already in cart → update quantity
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + q };
        return copy;
      }
      // not in cart → add new entry
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

  // update the quantity of a specific product
  function updateItem(productId, qty) {
    const q = Math.max(0, parseInt(qty, 10) || 0);
    setItems(prev => {
      const idx = prev.findIndex(it => it.id === productId);
      if (idx === -1) return prev; // product not found → no change
      if (q === 0) return prev.filter(it => it.id !== productId); // qty=0 → remove
      const copy = [...prev];
      copy[idx] = { ...copy[idx], quantity: q };
      return copy;
    });
  }

  // remove a product entirely from the cart
  function removeItem(productId) {
    setItems(prev => prev.filter(it => it.id !== productId));
  }

  // clear the whole cart
  function clearCart() {
    setItems([]);
  }

  // derived values: total item count + total cost
  const count = items.reduce((n, it) => n + it.quantity, 0);
  const total = items.reduce((sum, it) => sum + it.price * it.quantity, 0);

  // provide all cart values + helpers to children
  return (
    <CartCtx.Provider
      value={{ items, addItem, updateItem, removeItem, clearCart, count, total }}
    >
      {children}
    </CartCtx.Provider>
  );
}

// custom hook for easy access in components
export const useCart = () => useContext(CartCtx);
