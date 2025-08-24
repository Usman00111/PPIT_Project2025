import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Checkout(){
  const { user } = useAuth();
  const { items, total, clearCart } = useCart();

    // guest fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [eircode, setEircode] = useState("");


  return (
    <div>
      <h2>Checkout</h2>
    </div>
  );
}
