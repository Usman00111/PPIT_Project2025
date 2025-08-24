import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
    const { items, updateItem, removeItem, total, clearCart } = useCart();
    const nav = useNavigate();

    function inc(id, current) {
        const q = (parseInt(current, 10) || 1) + 1;
        updateItem(id, q);
    }
    function dec(id, current) {
        const q = Math.max(1, (parseInt(current, 10) || 1) - 1);
        updateItem(id, q);
    }

    if (items.length === 0) {
        return (
            <div>
                <h2>Cart</h2>
                <p>Your cart is empty.</p>
                <Link to="/products">Go to Products →</Link>
            </div>
        );
    }
    
    return (
        <div>
            <h2>Cart</h2>
            <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <thead>
                        <tr style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map(it => (
                            <tr key={it.id} style={{ borderBottom: "1px solid #f3f3f3" }}>
                                <td style={{ padding: "8px 4px", display: "flex", gap: 8, alignItems: "center" }}>
                                    <img src={it.imageUrl} alt={it.name} style={{ width: 56, height: 40, objectFit: "cover", borderRadius: 4 }} />
                                    <span>{it.name}</span>
                                </td>
                                <td>
                                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                        <button onClick={() => dec(it.id, it.quantity)}>-</button>
                                        <input
                                            value={it.quantity}
                                            onChange={(e) => updateItem(it.id, e.target.value)}
                                            style={{ width: 44, textAlign: "center" }}
                                        />
                                        <button onClick={() => inc(it.id, it.quantity)}>+</button>
                                    </div>
                                </td>
                                <td>€{it.price.toFixed(2)}</td>
                                <td>€{(it.price * it.quantity).toFixed(2)}</td>
                                <td><button onClick={() => removeItem(it.id)}>Remove</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div style={{ marginTop: 12, color: "#666" }}>Reserved: 30:00</div>
            <div style={{ marginTop: 12, fontWeight: 700 }}>Total: €{total.toFixed(2)}</div>

            <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
                <button onClick={() => nav("/checkout")}>Checkout</button>
                <Link to="/products"><button>Continue Shopping</button></Link>
                <button onClick={clearCart}>Clear Cart</button>
            </div>
        </div>
    );
}

