import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Register(){
  const nav = useNavigate();
  const { registerStub } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function onSubmit(e){
    e.preventDefault();
    if (!name || !email) return;
    const u = registerStub(name, email);
    alert(`Welcome ${u.name}! Your Account Number is ${u.accountNumber}`);
    nav("/");
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8, maxWidth: 360 }}>
        <label>Name
          <input value={name} onChange={e=>setName(e.target.value)} required />
        </label>
        <label>Email
          <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required />
        </label>
        <label>Password
          <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required />
        </label>
        <button type="submit">Create Account</button>
      </form>
      <p style={{ marginTop: 8 }}>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}