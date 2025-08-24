import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Checkout(){
  const { user } = useAuth();
  const { items, total, clearCart } = useCart();

  return (
    <div>
      <h2>Checkout</h2>
    </div>
  );
}
