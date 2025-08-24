import { createContext, useContext, useState } from "react";
const CartCtx = createContext(null);
export function CartProvider({ children }) {
    const [items, setItems] = useState([]);
    return <CartCtx.Provider value={{ items, setItems }}>{children}</CartCtx.Provider>;
}
export const useCart = () => useContext(CartCtx);
