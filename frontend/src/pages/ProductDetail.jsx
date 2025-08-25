import { useParams } from "react-router-dom";
import products from "../data/products.json";
import { useCart } from "../context/CartContext";
import { useRef } from "react";

export default function ProductDetail() {
    //   get product ID from URL
    const { id } = useParams();

    // find the product from static JSON data
    const product = products.find(p => p.id === id);

    //  cart context for adding items
    const { addItem } = useCart();

    /// reference to quantity input box
    const qtyRef = useRef(null);

    //if no product is found
    if (!product) return <div><h2>Product not found</h2></div>;

    return (
        <div>
            <h2>{product.name}</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                {/*product image */}
                <img
                    src={product.imageUrl}
                    alt={product.name}
                    style={{ width: "100%", borderRadius: 4 }}
                />

                {/* product details   */}
                <div>
                    <div style={{ fontSize: 20, fontWeight: 700 }}>
                        €{product.price.toFixed(2)}
                    </div>
                    <div style={{ color: "#555", margin: "6px 0" }}>
                        Stock: {product.stock}
                    </div>

                    {/* quantity input*/}
                    <div style={{ marginTop: 8 }}>
                        <label>Quantity: </label>
                        <input
                            ref={qtyRef}
                            defaultValue={1}
                            style={{ width: 60, textAlign: "center" }}
                        />
                    </div>

                    {/* add to cart button */}
                    <button
                        style={{ marginTop: 12 }}
                        onClick={() =>
                            addItem(
                                product,
                                parseInt(qtyRef.current.value || "1", 10) || 1
                            )
                        }
                    >
                        Add to Cart
                    </button>

                    <hr style={{ margin: "16px 0" }} />

                    {/* product description */}
                    <h4>Description</h4>
                    <p>{product.description}</p>
                </div>
            </div>
        </div>
    );
}
