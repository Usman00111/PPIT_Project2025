import { Link } from "react-router-dom";
import products from "../data/products.json";

export default function Products(){
  return (
    <div>
      <h2>Products</h2>
      <div className="grid">
        {products.map(p => (
          <div key={p.id} className="card">
            <Link to={`/products/${p.id}`}>
              <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 4 }} />
            </Link>
            <h3 style={{ margin: "8px 0" }}>
              <Link to={`/products/${p.id}`} style={{ color: "#222" }}>{p.name}</Link>
            </h3>
            <div style={{ fontWeight: 700 }}>€{p.price.toFixed(2)}</div>
            <div style={{ color: "#555", fontSize: 14 }}>Stock: {p.stock}</div>
            <div style={{ marginTop: 8, display: "flex", gap: 6, alignItems: "center" }}>
              <button type="button">-</button>
              <input defaultValue={1} style={{ width: 40, textAlign: "center" }} />
              <button type="button">+</button>
              <button type="button" style={{ marginLeft: "auto" }}
                onClick={() => console.log("Add to cart (later connected)", p.id)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
