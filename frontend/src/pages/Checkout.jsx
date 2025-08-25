import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

export default function Checkout() {
    // get current user (null if guest)
    const { user } = useAuth();

    //get cart details + helper to clear cart
    const { items, total, clearCart } = useCart();

    //form fields for guest checkout
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [eircode, setEircode] = useState("");

    // place order as guest (simple alert for now)
    function placeOrderGuest(e) {
        e.preventDefault();
        if (items.length === 0) return alert("Your cart is empty.");
        alert(`Guest order placed for ${name || "Guest"} • Items: ${items.length} • Total: €${total.toFixed(2)}`);
        clearCart();
    }

    // place order as logged-in user
    function placeOrderUser() {
        if (items.length === 0) return alert("Your cart is empty.");
        alert(`Order placed by ${user.name} (${user.accountNumber}) • Items: ${items.length} • Total: €${total.toFixed(2)}`);
        clearCart();
    }

    return (
        <div>
            <h2>Checkout</h2>

            {/* order summary always shown */}
            <div style={{ marginBottom: 12 }}>
                <strong>Order Summary:</strong> {items.length} item(s) • Total €{total.toFixed(2)}
            </div>

            {/*Guest checkout form (if not logged in) */}
            {!user && (
                <div style={{ border: "1px solid #eee", padding: 12, borderRadius: 6, marginBottom: 16 }}>
                    <h3>Guest Checkout</h3>
                    <form
                        onSubmit={placeOrderGuest}
                        style={{ display: "grid", gap: 8, maxWidth: 480 }}
                    >
                        <label>Name <input value={name} onChange={e => setName(e.target.value)} required /></label>
                        <label>Email <input type="email" value={email} onChange={e => setEmail(e.target.value)} required /></label>
                        <label>Phone <input value={phone} onChange={e => setPhone(e.target.value)} required /></label>
                        <label>Address <input value={address} onChange={e => setAddress(e.target.value)} required /></label>
                        <label>Eircode <input value={eircode} onChange={e => setEircode(e.target.value)} required /></label>
                        <button type="submit">Place Order (Guest)</button>
                    </form>
                </div>
            )}

            {/*Logged-in checkout summary (uses saved user info) */}
            {user && (
                <div style={{ border: "1px solid #eee", padding: 12, borderRadius: 6 }}>
                    <h3>Logged-in Checkout</h3>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    <p><strong>Account Number:</strong> {user.accountNumber}</p>
                    <button onClick={placeOrderUser}>Place Order</button>
                </div>
            )}
        </div>
    );
}
