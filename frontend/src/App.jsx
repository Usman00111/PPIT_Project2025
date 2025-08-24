import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Returns from "./pages/Returns";
import MyOrders from "./pages/MyOrders";
import Profile from "./pages/Profile"; 


export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main style={{ maxWidth: 1000, margin: "16px auto", padding: "0 12px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/returns" element={<Returns />} />
          <Route path="*" element={<div>Not Found</div>} />
          <Route path="/my-orders" element={<MyOrders />} />
          <Route path="/profile" element={<Profile />} />


        </Routes>
      </main>
      <footer style={{ textAlign: "center", padding: 16, borderTop: "1px solid #eee" }}>
        <Link to="/about">About</Link> · <Link to="/privacy">Privacy</Link> · <Link to="/terms">Terms</Link> · <Link to="/returns">Returns</Link> · <Link to="/contact">Contact</Link>
      </footer>
    </BrowserRouter>
  );
}