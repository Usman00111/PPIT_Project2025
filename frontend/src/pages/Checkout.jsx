import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Checkout() {
    const { user } = useAuth();
    const { items, total, clearCart } = useCart();

    // guest fields
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [eircode, setEircode] = useState("");

    function placeOrderGuest(e) {
        e.preventDefault();
        if (items.length === 0) return alert("Your cart is empty.");
        alert(`Guest order placed for ${name || "Guest"} • Items: ${items.length} • Total: €${total.toFixed(2)}`);
        clearCart();
    }

    function placeOrderUser() {
        if (items.length === 0) return alert("Your cart is empty.");
        alert(`Order placed by ${user.name} (${user.accountNumber}) • Items: ${items.length} • Total: €${total.toFixed(2)}`);
        clearCart();
    }


    return (
        <div>
            <h2>Checkout</h2>
            
            <div style={{ marginBottom: 12 }}>
                <strong>Order Summary:</strong> {items.length} item(s) • Total €{total.toFixed(2)}
            </div>

        </div>
    );
}
