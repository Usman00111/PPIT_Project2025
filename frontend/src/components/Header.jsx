import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Header() {
    const navigate = useNavigate();
    const { count } = useCart();


  function onSearch(e) {
    e.preventDefault();
    const q = e.target.q.value.trim();
    if (q) navigate("/products");
  }


  return (
    <header style={{ position: "sticky", top: 0, background: "#fff", zIndex: 10, borderBottom: "1px solid #eee" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "12px", display: "flex", alignItems: "center", gap: 12 }}>
        <Link to="/" style={{ fontWeight: 700, fontSize: 18, textDecoration: "none", color: "#222" }}>
          Ballaghaderreen Grocery
        </Link>
        <form onSubmit={onSearch} style={{ flex: 1 }}>
          <input name="q" placeholder="Search…" style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: 4 }} />
        </form>
        <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart{count > 0 ? ` (${count})` : ""}</Link>
          <Link to="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}