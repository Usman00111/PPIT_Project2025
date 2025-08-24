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

  function addItem(product, qty=1){
    const q = Math.max(1, parseInt(qty, 10) || 1);
    setItems(prev => {
      const idx = prev.findIndex(it => it.id === product.id);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + q };
        return copy;
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        imageUrl: product.imageUrl,
        quantity: q
      }];
    });
  }

    return (
    <CartCtx.Provider value={{ items, setItems, addItem }}>
      {children}
    </CartCtx.Provider>
  );

    function updateItem(productId, qty){
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

    return (
    <CartCtx.Provider value={{ items, addItem, updateItem }}>
      {children}
    </CartCtx.Provider>
  );

  
