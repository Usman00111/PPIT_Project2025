import { createContext, useContext, useState, useEffect } from "react";

const CartCtx = createContext(null);

export function CartProvider({ children }){
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem("cart_items");
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });

  useEffect(() => {
    localStorage.setItem("cart_items", JSON.stringify(items));
  }, [items]);

  return (
    <CartCtx.Provider value={{ items, setItems }}>
      {children}
    </CartCtx.Provider>
  );
}
