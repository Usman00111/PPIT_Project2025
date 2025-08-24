import { useParams } from "react-router-dom";
import products from "../data/products.json";
import { useCart } from "../context/CartContext";
import { useRef } from "react";

export default function ProductDetail() {
    const { id } = useParams();
    const product = products.find(p => p.id === id);
    const { addItem } = useCart();
    const qtyRef = useRef(null);

    if (!product) return <div><h2>Product not found</h2></div>;

    return (
        <div>
            <h2>{product.name}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <img src={product.imageUrl} alt={product.name} style={{ width: "100%", borderRadius: 4 }} />
                <div>
                    <div style={{ fontSize: 20, fontWeight: 700 }}>€{product.price.toFixed(2)}</div>
                    <div style={{ color: "#555", margin: "6px 0" }}>Stock: {product.stock}</div>
                    <div style={{ marginTop: 8 }}>
                        <label>Quantity: </label>
                        <input ref={qtyRef} defaultValue={1} style={{ width: 60, textAlign: "center" }} />
                    </div>
                    <button
                        style={{ marginTop: 12 }}
                        onClick={() => addItem(product, parseInt(qtyRef.current.value || "1", 10) || 1)}
                    >
                        Add to Cart
                    </button>
                    <hr style={{ margin: "16px 0" }} />
                    <h4>Description</h4>
                    <p>{product.description}</p>
                </div>
            </div>
        </div>
    );
}
