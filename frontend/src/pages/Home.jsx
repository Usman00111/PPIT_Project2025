import { Link } from "react-router-dom";
import products from "../data/products.json";

export default function Home(){
  const featured = products.slice(0, 4);
  return (
    <div>
      <h1>Welcome to Ballaghaderreen Grocery</h1>
      <p>Shop fresh groceries online.</p>
      <p><Link to="/products">Browse Products →</Link></p>

      <h3>Featured</h3>
      <div className="grid">
        {featured.map(p => (
          <div key={p.id} className="card">
            <Link to={`/products/${p.id}`}>
              <img src={p.imageUrl} alt={p.name} style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 4 }} />
            </Link>
            <div style={{ fontWeight: 600, marginTop: 6 }}>{p.name}</div>
            <div>€{p.price.toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
