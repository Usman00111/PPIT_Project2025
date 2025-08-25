import { Link } from "react-router-dom";
import products from "../data/products.json";
import { useCart } from "../context/CartContext";
import { useRef } from "react";

// small helper component for + / - quantity controls
function QtyControls({ inputRef }) {
  return (
    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
      <button 
        type="button" 
        onClick={() => {
          const v = parseInt(inputRef.current.value || "1", 10) || 1;
          inputRef.current.value = Math.max(1, v - 1); // decrease but not below 1
        }}
      >
        -
      </button>

      <input 
        ref={inputRef} 
        defaultValue={1} 
        style={{ width: 40, textAlign: "center" }} 
      />

      <button 
        type="button" 
        onClick={() => {
          const v = parseInt(inputRef.current.value || "1", 10) || 1;
          inputRef.current.value = v + 1; // increase quantity
        }}
      >
        +
      </button>
    </div>
  );
}

export default function Products() {
  const { addItem } = useCart(); // hook to add items into cart

  return (
    <div>
      <h2>Products</h2>
      <div className="grid">
        {products.map(p => {
          const inputRef = useRef(null); // each product gets its own qty input

          return (
            <div key={p.id} className="card">
              {/*  clicking image or title goes to product detail page   */}
              <Link to={`/products/${p.id}`}>
                <img 
                  src={p.imageUrl} 
                  alt={p.name} 
                  style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 4 }} 
                />
              </Link>

              <h3 style={{ margin: "8px 0" }}>
                <Link to={`/products/${p.id}`} style={{ color: "#222" }}>
                  {p.name}
                </Link>
              </h3>

              {/*price and stock */}
              <div style={{ fontWeight: 700 }}>€{p.price.toFixed(2)}</div>
              <div style={{ color: "#555", fontSize: 14 }}>Stock: {p.stock}</div>

              {/*   quantity controls + add to cart button */}
              <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 6 }}>
                <QtyControls inputRef={inputRef} />
                <button
                  type="button"
                  style={{ marginLeft: "auto" }}
                  onClick={() => 
                    addItem(p, parseInt(inputRef.current.value || "1", 10) || 1)
                  }
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
