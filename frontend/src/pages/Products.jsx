import { Link } from "react-router-dom";
import products from "../data/products.json";
import { useCart } from "../context/CartContext";
import { useRef } from "react";

function QtyControls({ inputRef }) {
    return (
        <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
            <button type="button" onClick={() => {
                const v = parseInt(inputRef.current.value || "1", 10) || 1;
                inputRef.current.value = Math.max(1, v - 1);
            }}>-</button>
            <input ref={inputRef} defaultValue={1} style={{ width: 40, textAlign: "center" }} />
            <button type="button" onClick={() => {
                const v = parseInt(inputRef.current.value || "1", 10) || 1;
                inputRef.current.value = v + 1;
            }}>+</button>
        </div>
    );
}


export default function Products() {
    const { addItem } = useCart();

    return (
        <div>
            <h2>Products</h2>
            <div className="grid">
                {products.map(p => {
                    const inputRef = useRef(null);
                    return (
                        <div key={p.id} className="card">
                            <Link to={`/products/${p.id}`}>
                                <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 4 }} />
                            </Link>
                            <h3 style={{ margin: "8px 0" }}>
                                <Link to={`/products/${p.id}`} style={{ color: "#222" }}>{p.name}</Link>
                            </h3>
                            <div style={{ fontWeight: 700 }}>€{p.price.toFixed(2)}</div>
                            <div style={{ color: "#555", fontSize: 14 }}>Stock: {p.stock}</div>
                            <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                                <QtyControls inputRef={inputRef} />
                                <button
                                    type="button"
                                    style={{ marginLeft: "auto" }}
                                    onClick={() => addItem(p, parseInt(inputRef.current.value || "1", 10) || 1)}
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}