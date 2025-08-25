import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const { count } = useCart(); // gives total items in cart
  const { user, logout } = useAuth(); // gives logged-in user + logout function

  // handle search bar submission
  function onSearch(e) {
    e.preventDefault();
    const q = e.target.q.value.trim();
    if (q) navigate("/products"); // right now it just sends to products page
  }

  return (
    // sticky header at top with border
    <header style={{ position: "sticky", top: 0, background: "#fff", zIndex: 10, borderBottom: "1px solid #eee" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "12px", display: "flex", alignItems: "center", gap: 12 }}>
        
        {/* Logo / Home link */}
        <Link to="/" style={{ fontWeight: 700, fontSize: 18, textDecoration: "none", color: "#222" }}>
          Ballaghaderreen Grocery
        </Link>

        {/* Search box */}
        <form onSubmit={onSearch} style={{ flex: 1 }}>
          <input 
            name="q" 
            placeholder="Search…" 
            style={{ width: "100%", padding: "8px", border: "1px solid #ccc", borderRadius: 4 }} 
          />
        </form>

        {/* Navigation links */}
        <nav style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <Link to="/products">Products</Link>
          {/* Cart shows item count if > 0 */}
          <Link to="/cart">Cart{count > 0 ? ` (${count})` : ""}</Link>

          {/* If logged in, show extra links */}
          {user && <Link to="/my-orders">My Orders</Link>}
          
          {/* If not logged in, show login/register */}
          {!user && <Link to="/login">Login</Link>}
          {!user && <Link to="/register">Register</Link>}

          {/* If logged in, show greeting + logout + profile */}
          {user && <span title={`Account ${user.accountNumber}`}>Hi, {user.name}</span>}
          {user && <button onClick={logout}>Logout</button>}
          {user && <Link to="/profile">Account</Link>}
        </nav>
      </div>
    </header>
  );
}
