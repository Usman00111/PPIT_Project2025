import { Link } from "react-router-dom";
import products from "../data/products.json";

const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

export default function Home(){
  // start with local JSON so page renders immediately
  const [featured, setFeatured] = useState(products.slice(0, 4));

  // try to load from backend; if it fails, keep the local JSON
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`${BASE}/products`);
        if (!res.ok) throw new Error("Failed to load products");
        const data = await res.json();
        setFeatured((data || []).slice(0, 4));
      } catch {
        // keep the initial featured from local JSON
      }
    })();
  }, []);

  return (
    <div>
      <h1>Welcome to Ballaghaderreen Grocery</h1>
      <p>Shop fresh groceries online.</p>
      <p><Link to="/products">Browse Products →</Link></p>

      <h3>Featured</h3>
      <div className="grid">
        {featured.map(p => (
          <div key={p._id || p.id} className="card">
            <Link to={`/products/${p._id || p.id}`}>
              <img
                src={p.imageUrl || "https://placehold.co/600x400?text=Product"}
                alt={p.name}
                style={{ width: "100%", height: 140, objectFit: "cover", borderRadius: 4 }}
              />
            </Link>
            <div style={{ fontWeight: 600, marginTop: 6 }}>{p.name}</div>
            <div>€{Number(p.price).toFixed(2)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
